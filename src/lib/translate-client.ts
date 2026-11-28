import { TranslationProvider } from '@/types/progress';
import { getGuestId } from '@/lib/ai/guest-id';

export interface TranslateClientOptions {
  text: string;
  from?: string;
  to?: string;
  provider?: TranslationProvider;
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

export function readStoredTranslationProvider(): TranslationProvider {
  if (typeof window === 'undefined') return 'mymemory';
  try {
    const raw = localStorage.getItem('toeic_vocab_mastery_v1');
    if (raw) {
      const parsed = JSON.parse(raw);
      const p = parsed?.preferences?.translationProvider;
      if (p === 'mymemory' || p === 'gemini' || p === 'cloudflare' || p === 'auto') {
        return p;
      }
    }
  } catch {
    // ignore storage read errors
  }
  return 'mymemory';
}

export async function fetchTranslation(
  options: TranslateClientOptions
): Promise<TranslateClientResponse> {
  const {
    text,
    from = 'en',
    to = 'vi',
    provider = readStoredTranslationProvider(),
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

  const headers: Record<string, string> = {
    'x-translation-provider': provider,
  };
  if (userId) headers['x-user-id'] = userId;
  if (userEmail) headers['x-user-email'] = userEmail;
  if (guestId) headers['x-guest-id'] = guestId;

  const res = await fetch(`/api/translate?${params.toString()}`, {
    headers,
    signal,
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody?.error || 'Không thể dịch nội dung');
  }

  return (await res.json()) as TranslateClientResponse;
}
