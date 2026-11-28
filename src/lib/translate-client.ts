import { TranslationProvider } from '@/types/progress';
import { getGuestId } from '@/lib/ai/guest-id';
import {
  DEFAULT_TRANSLATION_GEMINI_MODEL,
  DEFAULT_TRANSLATION_CLOUDFLARE_MODEL,
} from '@/lib/translate-models';

export interface TranslateClientOptions {
  text: string;
  from?: string;
  to?: string;
  provider?: TranslationProvider;
  geminiModel?: string;
  cloudflareModel?: string;
  skipCache?: boolean;
  maxRetries?: number;
  userId?: string;
  userEmail?: string;
  guestId?: string;
  signal?: AbortSignal;
}

export interface TranslateClientResponse {
  originalText: string;
  translatedText: string;
  provider: 'mymemory' | 'gemini' | 'cloudflare';
  requestedProvider: TranslationProvider;
  overriddenByAdmin?: boolean;
  model?: string;
  attempts?: number;
  cached?: boolean;
  fallback?: boolean;
  fallbackReason?: string;
}

export const TRANSLATION_PROVIDER_LABELS: Record<
  TranslationProvider | 'mymemory' | 'gemini' | 'cloudflare',
  string
> = {
  mymemory: 'MyMemory',
  gemini: 'Gemini AI',
  cloudflare: 'Cloudflare AI',
  auto: 'Tự động (AI → MyMemory)',
};

function readStoredPreferences(): {
  translationProvider: TranslationProvider;
  translationGeminiModel: string;
  translationCloudflareModel: string;
} {
  const defaults = {
    translationProvider: 'mymemory' as TranslationProvider,
    translationGeminiModel: DEFAULT_TRANSLATION_GEMINI_MODEL,
    translationCloudflareModel: DEFAULT_TRANSLATION_CLOUDFLARE_MODEL,
  };

  if (typeof window === 'undefined') return defaults;
  try {
    const raw = localStorage.getItem('toeic_vocab_mastery_v1');
    if (raw) {
      const parsed = JSON.parse(raw);
      const prefs = parsed?.preferences;
      const p = prefs?.translationProvider;
      return {
        translationProvider:
          p === 'mymemory' || p === 'gemini' || p === 'cloudflare' || p === 'auto'
            ? p
            : defaults.translationProvider,
        translationGeminiModel:
          typeof prefs?.translationGeminiModel === 'string' &&
          prefs.translationGeminiModel.trim()
            ? prefs.translationGeminiModel.trim()
            : defaults.translationGeminiModel,
        translationCloudflareModel:
          typeof prefs?.translationCloudflareModel === 'string' &&
          prefs.translationCloudflareModel.trim()
            ? prefs.translationCloudflareModel.trim()
            : defaults.translationCloudflareModel,
      };
    }
  } catch {
    // ignore storage read errors
  }
  return defaults;
}

export function readStoredTranslationProvider(): TranslationProvider {
  return readStoredPreferences().translationProvider;
}

export async function fetchTranslation(
  options: TranslateClientOptions
): Promise<TranslateClientResponse> {
  const stored = readStoredPreferences();
  const {
    text,
    from = 'en',
    to = 'vi',
    provider = stored.translationProvider,
    geminiModel = stored.translationGeminiModel,
    cloudflareModel = stored.translationCloudflareModel,
    skipCache = false,
    maxRetries = 1,
    userId,
    userEmail,
    guestId = !userId ? getGuestId() : undefined,
    signal,
  } = options;

  const params = new URLSearchParams({
    text,
    from,
    to,
    provider,
  });
  if (geminiModel) params.set('geminiModel', geminiModel);
  if (cloudflareModel) params.set('cloudflareModel', cloudflareModel);
  if (skipCache) params.set('skipCache', '1');

  const headers: Record<string, string> = {
    'x-translation-provider': provider,
  };
  if (geminiModel) headers['x-translation-gemini-model'] = geminiModel;
  if (cloudflareModel) headers['x-translation-cloudflare-model'] = cloudflareModel;
  if (userId) headers['x-user-id'] = userId;
  if (userEmail) headers['x-user-email'] = userEmail;
  if (guestId) headers['x-guest-id'] = guestId;

  const totalAttempts = Math.max(1, maxRetries + 1);
  const usePost = text.length > 800;
  let lastError: unknown;

  for (let attempt = 1; attempt <= totalAttempts; attempt++) {
    if (signal?.aborted) {
      throw new DOMException('Aborted', 'AbortError');
    }

    try {
      const res = usePost
        ? await fetch('/api/translate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...headers,
            },
            body: JSON.stringify({
              text,
              from,
              to,
              provider,
              geminiModel: geminiModel || undefined,
              cloudflareModel: cloudflareModel || undefined,
              skipCache,
              userId,
              userEmail,
              guestId,
            }),
            signal,
          })
        : await fetch(`/api/translate?${params.toString()}`, {
            headers,
            signal,
          });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        const err = new Error(errBody?.error || 'Không thể dịch nội dung');
        if (res.status >= 400 && res.status < 500) {
          throw err;
        }
        lastError = err;
      } else {
        return (await res.json()) as TranslateClientResponse;
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        throw err;
      }
      lastError = err;
    }

    if (attempt < totalAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 300 * attempt));
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error('Không thể dịch nội dung');
}
