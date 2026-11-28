import { TranslationProvider } from '@/types/progress';
import {
  isGeminiConfigured,
  getGeminiModel,
  generateContentGemini,
} from '@/lib/ai/gemini-provider';
import {
  isCloudflareChatConfigured,
  getCloudflareChatModel,
  generateContentCloudflare,
} from '@/lib/ai/cloudflare-provider';
import {
  getSystemAISettingsAsync,
  canUseProvider,
  checkUserAIQuota,
  recordUserAIUsage,
  getUserTranslationProviderOverride,
} from '@/lib/ai/system-ai-settings';

export type ConcreteTranslationProvider = 'mymemory' | 'gemini' | 'cloudflare';

export interface ServerTranslateParams {
  text: string;
  from?: string;
  to?: string;
  provider?: string | null;
  userId?: string | null;
  userEmail?: string | null;
  guestId?: string | null;
}

export interface ServerTranslateResult {
  originalText: string;
  translatedText: string;
  provider: ConcreteTranslationProvider;
  requestedProvider: TranslationProvider;
  overriddenByAdmin?: boolean;
  model?: string;
  cached: boolean;
  fallback: boolean;
  fallbackReason?: string;
}

const VALID_PROVIDERS = new Set<TranslationProvider>([
  'mymemory',
  'gemini',
  'cloudflare',
  'auto',
]);

const LANGUAGE_NAMES: Record<string, string> = {
  vi: 'Vietnamese',
  en: 'English',
};

// In-memory cache keyed by `${provider}:${from}:${to}:${text.toLowerCase()}`
const translationCache = new Map<string, string>();
const MAX_CACHE_ENTRIES = 2000;

export function normalizeTranslationProvider(
  value?: string | null
): TranslationProvider {
  if (!value) return 'mymemory';
  const normalized = value.trim().toLowerCase() as TranslationProvider;
  return VALID_PROVIDERS.has(normalized) ? normalized : 'mymemory';
}

function getLanguageLabel(code: string): string {
  return LANGUAGE_NAMES[code.toLowerCase()] || code;
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function cleanAiTranslationOutput(raw: string, originalText: string): string {
  let cleaned = raw
    .trim()
    .replace(/^```(?:\w+)?\s*/i, '')
    .replace(/\s*```$/, '')
    .trim();

  const originalHasOuterQuotes =
    (originalText.startsWith('"') && originalText.endsWith('"')) ||
    (originalText.startsWith("'") && originalText.endsWith("'"));

  if (!originalHasOuterQuotes) {
    cleaned = cleaned.replace(/^["'“”‘’]+|["'“”‘’]+$/g, '').trim();
  }

  return cleaned;
}

function buildTranslationPrompt(
  text: string,
  from: string,
  to: string
): { systemInstruction: string; userPrompt: string } {
  const fromLabel = getLanguageLabel(from);
  const toLabel = getLanguageLabel(to);

  const systemInstruction = `You are a professional ${fromLabel}-to-${toLabel} translator specialized in TOEIC, business English, and everyday communication.
Rules:
- Translate the user's text accurately and naturally into ${toLabel}.
- Preserve technical/business nuance and tone.
- Output ONLY the translated ${toLabel} text. Do NOT add explanations, notes, alternatives, quotes, or markdown.`;

  const userPrompt = `Translate from ${fromLabel} to ${toLabel}:\n${text}`;
  return { systemInstruction, userPrompt };
}

export async function translateViaMyMemory(
  text: string,
  from = 'en',
  to = 'vi'
): Promise<string> {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
    text
  )}&langpair=${encodeURIComponent(from)}|${encodeURIComponent(to)}`;

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; ToeicVocabMastery/1.0)',
    },
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    throw new Error(`MyMemory API returned status: ${res.status}`);
  }

  const data = await res.json();
  let translated = data?.responseData?.translatedText;

  if (!translated || data.responseStatus !== 200) {
    if (Array.isArray(data?.matches) && data.matches.length > 0) {
      translated = data.matches[0].translation;
    }
  }

  if (!translated || typeof translated !== 'string') {
    throw new Error('MyMemory translation not available');
  }

  return decodeHtmlEntities(translated).trim();
}

async function translateViaGemini(
  text: string,
  from: string,
  to: string
): Promise<{ translatedText: string; model: string }> {
  const { systemInstruction, userPrompt } = buildTranslationPrompt(text, from, to);
  const raw = await generateContentGemini({
    contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
    config: {
      systemInstruction,
      temperature: 0.1,
    },
  });

  const translatedText = cleanAiTranslationOutput(raw, text);
  if (!translatedText) {
    throw new Error('Gemini returned empty translation');
  }
  return { translatedText, model: getGeminiModel() };
}

async function translateViaCloudflare(
  text: string,
  from: string,
  to: string
): Promise<{ translatedText: string; model: string }> {
  const { systemInstruction, userPrompt } = buildTranslationPrompt(text, from, to);
  const raw = await generateContentCloudflare(
    [{ role: 'user', content: userPrompt }],
    systemInstruction,
    { maxTokens: 800, timeoutMs: 25000 }
  );

  const translatedText = cleanAiTranslationOutput(raw, text);
  if (!translatedText) {
    throw new Error('Cloudflare Workers AI returned empty translation');
  }
  return { translatedText, model: getCloudflareChatModel() };
}

function getCandidateChain(
  provider: TranslationProvider
): ConcreteTranslationProvider[] {
  switch (provider) {
    case 'gemini':
      return ['gemini', 'cloudflare', 'mymemory'];
    case 'cloudflare':
      return ['cloudflare', 'gemini', 'mymemory'];
    case 'auto':
      return ['gemini', 'cloudflare', 'mymemory'];
    case 'mymemory':
    default:
      return ['mymemory'];
  }
}

function storeInCache(cacheKey: string, value: string): void {
  if (translationCache.size >= MAX_CACHE_ENTRIES) {
    const firstKey = translationCache.keys().next().value;
    if (firstKey) translationCache.delete(firstKey);
  }
  translationCache.set(cacheKey, value);
}

/**
 * Translate text using the requested (or Admin-overridden) provider with caching,
 * AI quota checks, and automatic fallback.
 */
export async function translateTextServer(
  params: ServerTranslateParams
): Promise<ServerTranslateResult> {
  const text = params.text.trim().slice(0, 1500);
  const from = (params.from || 'en').trim();
  const to = (params.to || 'vi').trim();
  const { userId, userEmail, guestId } = params;

  const adminOverride = await getUserTranslationProviderOverride({
    userId,
    userEmail,
  });

  const requestedProvider = adminOverride || normalizeTranslationProvider(params.provider);
  const overriddenByAdmin = Boolean(adminOverride);
  const candidates = getCandidateChain(requestedProvider);
  const primaryCandidate = candidates[0];

  // Ensure system AI settings cache is hydrated from Supabase before checking providers
  if (candidates.some((c) => c === 'gemini' || c === 'cloudflare')) {
    await getSystemAISettingsAsync();
  }

  let fallbackReason: string | undefined;
  let lastError: unknown = null;

  for (const candidate of candidates) {
    const isFallbackAttempt = candidate !== primaryCandidate;
    const cacheKey = `${candidate}:${from}:${to}:${text.toLowerCase()}`;

    if (candidate === 'gemini' || candidate === 'cloudflare') {
      const configured =
        candidate === 'gemini' ? isGeminiConfigured() : isCloudflareChatConfigured();
      if (!configured) {
        if (!fallbackReason) {
          fallbackReason = `${candidate === 'gemini' ? 'Gemini' : 'Cloudflare AI'} chưa được cấu hình API key.`;
        }
        continue;
      }

      if (!canUseProvider(candidate)) {
        if (!fallbackReason) {
          fallbackReason = `${candidate === 'gemini' ? 'Gemini' : 'Cloudflare AI'} đang tạm tắt trong cấu hình hệ thống.`;
        }
        continue;
      }

      const cachedVal = translationCache.get(cacheKey);
      if (cachedVal) {
        return {
          originalText: text,
          translatedText: cachedVal,
          provider: candidate,
          requestedProvider,
          overriddenByAdmin,
          model: candidate === 'gemini' ? getGeminiModel() : getCloudflareChatModel(),
          cached: true,
          fallback: isFallbackAttempt,
          fallbackReason: isFallbackAttempt ? fallbackReason : undefined,
        };
      }

      const quotaCheck = await checkUserAIQuota({ userId, userEmail, guestId });
      if (!quotaCheck.allowed) {
        if (!fallbackReason) {
          fallbackReason = quotaCheck.reason || 'Hạn mức AI hôm nay đã hết.';
        }
        continue;
      }

      try {
        const result =
          candidate === 'gemini'
            ? await translateViaGemini(text, from, to)
            : await translateViaCloudflare(text, from, to);

        recordUserAIUsage({ userId, userEmail, guestId, provider: candidate });
        storeInCache(cacheKey, result.translatedText);

        return {
          originalText: text,
          translatedText: result.translatedText,
          provider: candidate,
          requestedProvider,
          overriddenByAdmin,
          model: result.model,
          cached: false,
          fallback: isFallbackAttempt,
          fallbackReason: isFallbackAttempt ? fallbackReason : undefined,
        };
      } catch (err: unknown) {
        lastError = err;
        const msg = err instanceof Error ? err.message : String(err);
        console.warn(`[Translate] ${candidate} failed:`, msg);
        if (!fallbackReason) {
          fallbackReason = `${candidate === 'gemini' ? 'Gemini' : 'Cloudflare AI'} gặp lỗi, đã chuyển dự phòng.`;
        }
        continue;
      }
    }

    // MyMemory candidate
    const cachedMyMemory = translationCache.get(cacheKey);
    if (cachedMyMemory) {
      return {
        originalText: text,
        translatedText: cachedMyMemory,
        provider: 'mymemory',
        requestedProvider,
        overriddenByAdmin,
        cached: true,
        fallback: isFallbackAttempt,
        fallbackReason: isFallbackAttempt ? fallbackReason : undefined,
      };
    }

    try {
      const translatedText = await translateViaMyMemory(text, from, to);
      storeInCache(cacheKey, translatedText);

      return {
        originalText: text,
        translatedText,
        provider: 'mymemory',
        requestedProvider,
        overriddenByAdmin,
        cached: false,
        fallback: isFallbackAttempt,
        fallbackReason: isFallbackAttempt ? fallbackReason : undefined,
      };
    } catch (err: unknown) {
      lastError = err;
      console.warn('[Translate] mymemory failed:', err);
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error('Failed to translate content across all providers');
}
