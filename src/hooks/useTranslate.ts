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

export function useTranslate() {
  const { user } = useAuth();
  const { progress, updatePreferences } = useProgress();

  const translationProvider: TranslationProvider =
    progress.preferences.translationProvider || 'mymemory';

  const setTranslationProvider = useCallback(
    (provider: TranslationProvider) => {
      updatePreferences({ translationProvider: provider });
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
        signal?: AbortSignal;
      }
    ): Promise<TranslateClientResponse> => {
      const guestId = !user ? getGuestId() : undefined;
      return fetchTranslation({
        text,
        from: options?.from || 'en',
        to: options?.to || 'vi',
        provider: options?.provider || translationProvider,
        userId: user?.id,
        userEmail: user?.email || undefined,
        guestId,
        signal: options?.signal,
      });
    },
    [user, translationProvider]
  );

  return {
    translate,
    translationProvider,
    setTranslationProvider,
  };
}
