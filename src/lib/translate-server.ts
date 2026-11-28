import { TranslationProvider } from '@/types/progress';
import { MAX_TRANSLATE_TEXT_LENGTH } from '@/lib/translate-models';
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
  geminiModel?: string | null;
  cloudflareModel?: string | null;
  skipCache?: boolean;
  retries?: number;
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
  attempts?: number;
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

// In-memory cache keyed by `${provider}:${model}:${from}:${to}:${text.toLowerCase()}`
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

async function withRetry<T>(
  fn: () => Promise<T>,
  maxAttempts: number,
  delayMs = 250
): Promise<{ result: T; attempts: number }> {
  let lastErr: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await fn();
      return { result, attempts: attempt };
    } catch (err) {
      lastErr = err;
      if (attempt < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, delayMs * attempt));
      }
    }
  }
  throw lastErr;
}

const MYMEMORY_MAX_CHUNK_CHARS = 450;

/**
 * Splits a long text into <= maxLen chunks along sentence, clause, or word boundaries.
 */
function splitTextForMyMemory(text: string, maxLen = MYMEMORY_MAX_CHUNK_CHARS): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  if (trimmed.length <= maxLen) return [trimmed];

  const sentences = trimmed.match(/[^.!?]+[.!?]+(?=\s|$)|[^.!?]+$/g) || [trimmed];
  const chunks: string[] = [];
  let current = '';

  const pushPiece = (piece: string) => {
    const p = piece.trim();
    if (!p) return;
    if (current && current.length + 1 + p.length <= maxLen) {
      current = `${current} ${p}`;
    } else {
      if (current) chunks.push(current);
      if (p.length <= maxLen) {
        current = p;
      } else {
        // Split oversized sentence by words (or hard slice for single giant token)
        const words = p.split(/\s+/);
        let sub = '';
        for (const w of words) {
          if (w.length > maxLen) {
            if (sub) {
              chunks.push(sub);
              sub = '';
            }
            for (let i = 0; i < w.length; i += maxLen) {
              chunks.push(w.slice(i, i + maxLen));
            }
          } else if (sub && sub.length + 1 + w.length <= maxLen) {
            sub = `${sub} ${w}`;
          } else {
            if (sub) chunks.push(sub);
            sub = w;
          }
        }
        current = sub;
      }
    }
  };

  for (const sentence of sentences) {
    const s = sentence.trim();
    if (!s) continue;
    if (s.length <= maxLen) {
      pushPiece(s);
    } else {
      // Try splitting long sentences at clause punctuation first
      const clauses = s.match(/[^,;:]+[,;:]+(?=\s|$)|[^,;:]+$/g) || [s];
      for (const clause of clauses) {
        pushPiece(clause);
      }
    }
  }

  if (current) chunks.push(current);
  return chunks.length > 0 ? chunks : [trimmed.slice(0, maxLen)];
}

async function fetchMyMemoryChunk(
  chunk: string,
  from: string,
  to: string,
  skipCache: boolean
): Promise<string> {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
    chunk
  )}&langpair=${encodeURIComponent(from)}|${encodeURIComponent(to)}`;

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; ToeicVocabMastery/1.0)',
    },
    ...(skipCache ? { cache: 'no-store' as const } : { next: { revalidate: 86400 } }),
  });

  if (!res.ok) {
    throw new Error(`MyMemory API returned status: ${res.status}`);
  }

  const data = await res.json();
  const status = Number(data?.responseStatus);
  let translated = status === 200 ? data?.responseData?.translatedText : undefined;

  if (!translated && status === 200 && Array.isArray(data?.matches) && data.matches.length > 0) {
    translated = data.matches[0].translation;
  }

  if (!translated || typeof translated !== 'string') {
    const detail =
      data?.responseDetails ||
      (status !== 200 && typeof data?.responseData?.translatedText === 'string'
        ? data.responseData.translatedText
        : 'MyMemory translation not available');
    throw new Error(detail);
  }

  return decodeHtmlEntities(translated).trim();
}

export async function translateViaMyMemory(
  text: string,
  from = 'en',
  to = 'vi',
  skipCache = false
): Promise<string> {
  const paragraphs = text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) return '';

  const translatedParagraphs: string[] = [];
  for (const paragraph of paragraphs) {
    const chunks = splitTextForMyMemory(paragraph, MYMEMORY_MAX_CHUNK_CHARS);
    const translatedChunks: string[] = [];
    for (const chunk of chunks) {
      translatedChunks.push(await fetchMyMemoryChunk(chunk, from, to, skipCache));
    }
    translatedParagraphs.push(translatedChunks.join(' '));
  }

  return translatedParagraphs.join('\n');
}

async function translateViaGemini(
  text: string,
  from: string,
  to: string,
  preferredModel?: string | null
): Promise<{ translatedText: string; model: string }> {
  const { systemInstruction, userPrompt } = buildTranslationPrompt(text, from, to);
  const modelToUse = preferredModel?.trim() || getGeminiModel();
  const raw = await generateContentGemini({
    contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
    config: {
      systemInstruction,
      temperature: 0.1,
    },
    model: modelToUse,
  });

  const translatedText = cleanAiTranslationOutput(raw, text);
  if (!translatedText) {
    throw new Error('Gemini returned empty translation');
  }
  return { translatedText, model: modelToUse };
}

async function translateViaCloudflare(
  text: string,
  from: string,
  to: string,
  preferredModel?: string | null
): Promise<{ translatedText: string; model: string }> {
  const { systemInstruction, userPrompt } = buildTranslationPrompt(text, from, to);
  const modelToUse = preferredModel?.trim() || getCloudflareChatModel();
  const maxTokens = Math.min(4096, Math.max(800, Math.ceil(text.length * 0.9)));
  const timeoutMs = text.length > 1500 ? 40000 : 25000;
  const raw = await generateContentCloudflare(
    [{ role: 'user', content: userPrompt }],
    systemInstruction,
    { maxTokens, timeoutMs, model: modelToUse }
  );

  const translatedText = cleanAiTranslationOutput(raw, text);
  if (!translatedText) {
    throw new Error('Cloudflare Workers AI returned empty translation');
  }
  return { translatedText, model: modelToUse };
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
 * AI model selection, retry support, AI quota checks, and automatic fallback.
 */
export async function translateTextServer(
  params: ServerTranslateParams
): Promise<ServerTranslateResult> {
  const text = params.text.trim().slice(0, MAX_TRANSLATE_TEXT_LENGTH);
  const from = (params.from || 'en').trim();
  const to = (params.to || 'vi').trim();
  const skipCache = Boolean(params.skipCache);
  const maxAttempts = Math.min(3, Math.max(1, params.retries ?? 2));
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
  let totalAttempts = 0;

  for (const candidate of candidates) {
    const isFallbackAttempt = candidate !== primaryCandidate;

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

      const effectiveModel =
        candidate === 'gemini'
          ? params.geminiModel?.trim() || getGeminiModel()
          : params.cloudflareModel?.trim() || getCloudflareChatModel();
      const cacheKey = `${candidate}:${effectiveModel}:${from}:${to}:${text.toLowerCase()}`;

      if (!skipCache) {
        const cachedVal = translationCache.get(cacheKey);
        if (cachedVal) {
          return {
            originalText: text,
            translatedText: cachedVal,
            provider: candidate,
            requestedProvider,
            overriddenByAdmin,
            model: effectiveModel,
            attempts: totalAttempts,
            cached: true,
            fallback: isFallbackAttempt,
            fallbackReason: isFallbackAttempt ? fallbackReason : undefined,
          };
        }
      }

      const quotaCheck = await checkUserAIQuota({ userId, userEmail, guestId });
      if (!quotaCheck.allowed) {
        if (!fallbackReason) {
          fallbackReason = quotaCheck.reason || 'Hạn mức AI hôm nay đã hết.';
        }
        continue;
      }

      try {
        const { result, attempts } = await withRetry(
          () =>
            candidate === 'gemini'
              ? translateViaGemini(text, from, to, effectiveModel)
              : translateViaCloudflare(text, from, to, effectiveModel),
          maxAttempts
        );
        totalAttempts += attempts;

        recordUserAIUsage({ userId, userEmail, guestId, provider: candidate });
        storeInCache(cacheKey, result.translatedText);

        return {
          originalText: text,
          translatedText: result.translatedText,
          provider: candidate,
          requestedProvider,
          overriddenByAdmin,
          model: result.model,
          attempts: totalAttempts,
          cached: false,
          fallback: isFallbackAttempt,
          fallbackReason: isFallbackAttempt ? fallbackReason : undefined,
        };
      } catch (err: unknown) {
        totalAttempts += maxAttempts;
        lastError = err;
        const msg = err instanceof Error ? err.message : String(err);
        console.warn(`[Translate] ${candidate} failed after ${maxAttempts} attempts:`, msg);
        if (!fallbackReason) {
          fallbackReason = `${candidate === 'gemini' ? 'Gemini' : 'Cloudflare AI'} gặp lỗi, đã chuyển dự phòng.`;
        }
        continue;
      }
    }

    // MyMemory candidate
    const cacheKey = `mymemory:default:${from}:${to}:${text.toLowerCase()}`;
    if (!skipCache) {
      const cachedMyMemory = translationCache.get(cacheKey);
      if (cachedMyMemory) {
        return {
          originalText: text,
          translatedText: cachedMyMemory,
          provider: 'mymemory',
          requestedProvider,
          overriddenByAdmin,
          attempts: totalAttempts,
          cached: true,
          fallback: isFallbackAttempt,
          fallbackReason: isFallbackAttempt ? fallbackReason : undefined,
        };
      }
    }

    try {
      const { result: translatedText, attempts } = await withRetry(
        () => translateViaMyMemory(text, from, to, skipCache),
        maxAttempts
      );
      totalAttempts += attempts;
      storeInCache(cacheKey, translatedText);

      return {
        originalText: text,
        translatedText,
        provider: 'mymemory',
        requestedProvider,
        overriddenByAdmin,
        attempts: totalAttempts,
        cached: false,
        fallback: isFallbackAttempt,
        fallbackReason: isFallbackAttempt ? fallbackReason : undefined,
      };
    } catch (err: unknown) {
      totalAttempts += maxAttempts;
      lastError = err;
      console.warn(`[Translate] mymemory failed after ${maxAttempts} attempts:`, err);
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error('Failed to translate content across all providers');
}
