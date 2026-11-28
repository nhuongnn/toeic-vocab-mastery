'use client';

import { useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/contexts/ProgressContext';
import { TranslationProvider } from '@/types/progress';
import { getGuestId } from '@/lib/ai/guest-id';
import {
  fetchTranslation,
  TranslateClientResponse,
} from '@/lib/translate-client';
import {
  DEFAULT_TRANSLATION_GEMINI_MODEL,
  DEFAULT_TRANSLATION_CLOUDFLARE_MODEL,
} from '@/lib/translate-models';

export function useTranslate() {
  const { user } = useAuth();
  const { progress, updatePreferences } = useProgress();

  const translationProvider: TranslationProvider =
    progress.preferences.translationProvider || 'mymemory';

  const geminiModel: string =
    progress.preferences.translationGeminiModel ||
    DEFAULT_TRANSLATION_GEMINI_MODEL;

  const cloudflareModel: string =
    progress.preferences.translationCloudflareModel ||
    DEFAULT_TRANSLATION_CLOUDFLARE_MODEL;

  const setTranslationProvider = useCallback(
    (provider: TranslationProvider) => {
      updatePreferences({ translationProvider: provider });
    },
    [updatePreferences]
  );

  const setGeminiModel = useCallback(
    (model: string) => {
      updatePreferences({ translationGeminiModel: model });
    },
    [updatePreferences]
  );

  const setCloudflareModel = useCallback(
    (model: string) => {
      updatePreferences({ translationCloudflareModel: model });
    },
    [updatePreferences]
  );

  const translate = useCallback(
    async (
      text: string,
      options?: {
        from?: string;
        to?: string;
        provider?: TranslationProvider;
        geminiModel?: string;
        cloudflareModel?: string;
        skipCache?: boolean;
        maxRetries?: number;
        signal?: AbortSignal;
      }
    ): Promise<TranslateClientResponse> => {
      const guestId = !user ? getGuestId() : undefined;
      return fetchTranslation({
        text,
        from: options?.from || 'en',
        to: options?.to || 'vi',
        provider: options?.provider || translationProvider,
        geminiModel: options?.geminiModel || geminiModel,
        cloudflareModel: options?.cloudflareModel || cloudflareModel,
        skipCache: options?.skipCache,
        maxRetries: options?.maxRetries,
        userId: user?.id,
        userEmail: user?.email || undefined,
        guestId,
        signal: options?.signal,
      });
    },
    [user, translationProvider, geminiModel, cloudflareModel]
  );

  return {
    translate,
    translationProvider,
    setTranslationProvider,
    geminiModel,
    setGeminiModel,
    cloudflareModel,
    setCloudflareModel,
  };
}
