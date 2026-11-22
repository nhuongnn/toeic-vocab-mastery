'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import {
  UserProgressData,
  SRSCard,
  ExerciseSessionResult,
  UserPreferences,
  RoleplayPreferences,
} from '@/types/progress';
import { CharacterConfig, RoleplayConversation } from '@/types/roleplay';
import { DEFAULT_PROGRESS, loadUserProgress, saveUserProgress, updateStreak } from '@/lib/storage';
import { calculateSM2, createNewCard, calculateEstimatedScore } from '@/lib/srs';
import { useAuth } from './AuthContext';
import { supabase } from '@/lib/supabase';
import { mergeUserProgress } from '@/lib/sync';

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error';

interface ProgressContextType {
  progress: UserProgressData;
  isLoaded: boolean;
  recordReview: (wordId: string, quality: number) => void;
  recordExerciseSession: (session: ExerciseSessionResult) => void;
  toggleBookmark: (wordId: string) => void;
  isBookmarked: (wordId: string) => boolean;
  getCard: (wordId: string) => SRSCard | undefined;
  updateDailyGoal: (goal: number) => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  resetProgress: () => void;
  importProgress: (data: UserProgressData) => boolean;
  dueCount: number;
  dueWordIds: string[];
  syncStatus: SyncStatus;
  lastSyncedAt: Date | null;
  forceSync: () => Promise<void>;
  saveRoleplaySettings: (
    character: CharacterConfig,
    scenarioId?: string,
    userAvatar?: string,
    userName?: string
  ) => void;
  syncChatRoomHistory: (history: RoleplayConversation[]) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgressData>(DEFAULT_PROGRESS);
  const [isLoaded, setIsLoaded] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);

  const syncTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load from localStorage on mount & listen for sync events
  useEffect(() => {
    const loaded = loadUserProgress();
    setProgress(loaded);
    setIsLoaded(true);

    const handleRoleplaySync = () => {
      const reloaded = loadUserProgress();
      if (reloaded.roleplay) {
        setProgress((prev) => ({
          ...prev,
          roleplay: reloaded.roleplay,
        }));
      }
    };

    window.addEventListener('roleplay-synced', handleRoleplaySync);
    window.addEventListener('storage', handleRoleplaySync);
    return () => {
      window.removeEventListener('roleplay-synced', handleRoleplaySync);
      window.removeEventListener('storage', handleRoleplaySync);
    };
  }, []);

  // Schedule background debounced sync to Supabase
  const scheduleCloudSync = useCallback(
    (updatedData: UserProgressData) => {
      if (!user || !supabase) return;

      setSyncStatus('syncing');
      if (syncTimerRef.current) {
        clearTimeout(syncTimerRef.current);
      }

      syncTimerRef.current = setTimeout(async () => {
        if (!supabase || !user) return;
        try {
          const { error } = await supabase
            .from('user_progress')
            .upsert({
              user_id: user.id,
              data: updatedData,
              updated_at: new Date().toISOString(),
            });

          if (error) {
            console.error('Cloud sync error:', error);
            setSyncStatus('error');
          } else {
            setSyncStatus('synced');
            setLastSyncedAt(new Date());
          }
        } catch (err) {
          console.error('Failed to sync to cloud:', err);
          setSyncStatus('error');
        }
      }, 1500);
    },
    [user]
  );

  // Initial sync & merge when user logs in
  useEffect(() => {
    if (!user || !supabase) {
      setSyncStatus('idle');
      return;
    }

    let isMounted = true;

    async function syncOnLogin() {
      setSyncStatus('syncing');
      try {
        const { data, error } = await supabase!
          .from('user_progress')
          .select('data')
          .eq('user_id', user!.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching remote progress:', error);
          if (isMounted) setSyncStatus('error');
          return;
        }

        const localData = loadUserProgress();
        if (data && data.data) {
          const merged = mergeUserProgress(localData, data.data as UserProgressData);
          saveUserProgress(merged);
          if (merged.onboarding) {
            try {
              localStorage.setItem('onboarding_state_v1', JSON.stringify(merged.onboarding));
              window.dispatchEvent(new Event('onboarding-synced'));
            } catch {}
          }
          if (merged.roleplay) {
            try {
              localStorage.setItem('roleplay_settings_v1', JSON.stringify(merged.roleplay));
              window.dispatchEvent(new Event('roleplay-synced'));
            } catch {}
          }
          if (isMounted) {
            setProgress(merged);
            setSyncStatus('synced');
            setLastSyncedAt(new Date());
          }
          await supabase!
            .from('user_progress')
            .upsert({
              user_id: user!.id,
              data: merged,
              updated_at: new Date().toISOString(),
            });
        } else {
          // First time user: save existing local progress to cloud
          await supabase!
            .from('user_progress')
            .upsert({
              user_id: user!.id,
              data: localData,
              updated_at: new Date().toISOString(),
            });
          if (isMounted) {
            setSyncStatus('synced');
            setLastSyncedAt(new Date());
          }
        }
      } catch (err) {
        console.error('Sync failed:', err);
        if (isMounted) setSyncStatus('error');
      }
    }

    syncOnLogin();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Force manual sync on demand
  const forceSync = useCallback(async () => {
    if (!user || !supabase) return;
    setSyncStatus('syncing');
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('data')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        setSyncStatus('error');
        return;
      }

      const localData = loadUserProgress();
      let finalData = localData;

      if (data && data.data) {
        finalData = mergeUserProgress(localData, data.data as UserProgressData);
      }

      saveUserProgress(finalData);
      if (finalData.onboarding) {
        try {
          localStorage.setItem('onboarding_state_v1', JSON.stringify(finalData.onboarding));
          window.dispatchEvent(new Event('onboarding-synced'));
        } catch {}
      }
      if (finalData.roleplay) {
        try {
          localStorage.setItem('roleplay_settings_v1', JSON.stringify(finalData.roleplay));
          window.dispatchEvent(new Event('roleplay-synced'));
        } catch {}
      }
      setProgress(finalData);

      await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          data: finalData,
          updated_at: new Date().toISOString(),
        });

      setSyncStatus('synced');
      setLastSyncedAt(new Date());
    } catch {
      setSyncStatus('error');
    }
  }, [user]);

  const recordReview = useCallback(
    (wordId: string, quality: number) => {
      setProgress((prev) => {
        const existingCard = prev.cards[wordId] || createNewCard(wordId);
        const updatedCard = calculateSM2(existingCard, quality);

        const isNewWord = !prev.cards[wordId];
        const newTotalLearned = isNewWord
          ? prev.stats.totalWordsLearned + 1
          : prev.stats.totalWordsLearned;

        const { newStreak, newLongest, todayStr } = updateStreak(
          prev.stats.currentStreak,
          prev.stats.longestStreak,
          prev.stats.lastStudyDate
        );

        const cardList = Object.values({ ...prev.cards, [wordId]: updatedCard });
        const masteredCount = cardList.filter((c) => c.interval >= 14).length;
        const masteryRate = cardList.length > 0 ? masteredCount / cardList.length : 0;
        const newScore = calculateEstimatedScore(newTotalLearned, masteryRate);

        const updated: UserProgressData = {
          ...prev,
          cards: {
            ...prev.cards,
            [wordId]: updatedCard,
          },
          stats: {
            ...prev.stats,
            totalWordsLearned: newTotalLearned,
            totalReviews: prev.stats.totalReviews + 1,
            currentStreak: newStreak,
            longestStreak: newLongest,
            lastStudyDate: todayStr,
            estimatedToeicScore: newScore,
          },
        };

        saveUserProgress(updated);
        scheduleCloudSync(updated);
        return updated;
      });
    },
    [scheduleCloudSync]
  );

  const recordExerciseSession = useCallback(
    (session: ExerciseSessionResult) => {
      setProgress((prev) => {
        const { newStreak, newLongest, todayStr } = updateStreak(
          prev.stats.currentStreak,
          prev.stats.longestStreak,
          prev.stats.lastStudyDate
        );

        const updated: UserProgressData = {
          ...prev,
          history: [session, ...prev.history].slice(0, 50),
          stats: {
            ...prev.stats,
            currentStreak: newStreak,
            longestStreak: newLongest,
            lastStudyDate: todayStr,
          },
        };

        saveUserProgress(updated);
        scheduleCloudSync(updated);
        return updated;
      });
    },
    [scheduleCloudSync]
  );

  const toggleBookmark = useCallback(
    (wordId: string) => {
      setProgress((prev) => {
        const exists = prev.bookmarkedWordIds.includes(wordId);
        const updatedBookmarks = exists
          ? prev.bookmarkedWordIds.filter((id) => id !== wordId)
          : [...prev.bookmarkedWordIds, wordId];

        const updated = {
          ...prev,
          bookmarkedWordIds: updatedBookmarks,
        };

        saveUserProgress(updated);
        scheduleCloudSync(updated);
        return updated;
      });
    },
    [scheduleCloudSync]
  );

  const isBookmarked = useCallback(
    (wordId: string) => progress.bookmarkedWordIds.includes(wordId),
    [progress.bookmarkedWordIds]
  );

  const getCard = useCallback(
    (wordId: string) => progress.cards[wordId],
    [progress.cards]
  );

  const updateDailyGoal = useCallback(
    (goal: number) => {
      setProgress((prev) => {
        const updated: UserProgressData = {
          ...prev,
          stats: { ...prev.stats, dailyGoal: goal },
          preferences: { ...prev.preferences, dailyGoal: goal },
        };
        saveUserProgress(updated);
        scheduleCloudSync(updated);
        return updated;
      });
    },
    [scheduleCloudSync]
  );

  const updatePreferences = useCallback(
    (newPrefs: Partial<UserPreferences>) => {
      setProgress((prev) => {
        const updatedPrefs = { ...prev.preferences, ...newPrefs };
        const updated: UserProgressData = {
          ...prev,
          preferences: updatedPrefs,
          stats: {
            ...prev.stats,
            dailyGoal: newPrefs.dailyGoal ?? prev.stats.dailyGoal,
          },
        };
        saveUserProgress(updated);
        scheduleCloudSync(updated);
        return updated;
      });
    },
    [scheduleCloudSync]
  );

  const saveRoleplaySettings = useCallback(
    (
      character: CharacterConfig,
      scenarioId?: string,
      userAvatar?: string,
      userName?: string
    ) => {
      setProgress((prev) => {
        const updatedRoleplay: RoleplayPreferences = {
          ...(prev.roleplay || {}),
          character,
          scenarioId: scenarioId || prev.roleplay?.scenarioId,
          userAvatar: userAvatar !== undefined ? userAvatar : prev.roleplay?.userAvatar,
          userName: userName !== undefined ? userName : prev.roleplay?.userName,
          updatedAt: new Date().toISOString(),
        };
        const updated: UserProgressData = {
          ...prev,
          roleplay: updatedRoleplay,
        };
        saveUserProgress(updated);
        scheduleCloudSync(updated);
        return updated;
      });
    },
    [scheduleCloudSync]
  );

  const syncChatRoomHistory = useCallback(
    (history: RoleplayConversation[]) => {
      setProgress((prev) => {
        const updatedRoleplay: RoleplayPreferences = {
          ...(prev.roleplay || {}),
          chatHistory: history.slice(0, 10),
          updatedAt: new Date().toISOString(),
        };
        const updated: UserProgressData = {
          ...prev,
          roleplay: updatedRoleplay,
        };
        saveUserProgress(updated);
        scheduleCloudSync(updated);
        return updated;
      });
    },
    [scheduleCloudSync]
  );

  const resetProgress = useCallback(() => {
    saveUserProgress(DEFAULT_PROGRESS);
    setProgress(DEFAULT_PROGRESS);
    scheduleCloudSync(DEFAULT_PROGRESS);
  }, [scheduleCloudSync]);

  const importProgress = useCallback(
    (data: UserProgressData): boolean => {
      try {
        if (!data || typeof data !== 'object') return false;
        const validated: UserProgressData = {
          ...DEFAULT_PROGRESS,
          ...data,
          stats: { ...DEFAULT_PROGRESS.stats, ...(data.stats || {}) },
          preferences: { ...DEFAULT_PROGRESS.preferences, ...(data.preferences || {}) },
          cards: data.cards || {},
          history: Array.isArray(data.history) ? data.history : [],
          bookmarkedWordIds: Array.isArray(data.bookmarkedWordIds) ? data.bookmarkedWordIds : [],
        };
        saveUserProgress(validated);
        setProgress(validated);
        scheduleCloudSync(validated);
        return true;
      } catch (e) {
        console.error('Failed to import progress data:', e);
        return false;
      }
    },
    [scheduleCloudSync]
  );

  const [dueWordIds, setDueWordIds] = useState<string[]>([]);

  useEffect(() => {
    const now = new Date();
    const ids = Object.values(progress.cards)
      .filter((card) => new Date(card.nextReview) <= now)
      .map((c) => c.wordId);
    setDueWordIds(ids);
  }, [progress.cards]);

  return (
    <ProgressContext.Provider
      value={{
        progress,
        isLoaded,
        recordReview,
        recordExerciseSession,
        toggleBookmark,
        isBookmarked,
        getCard,
        updateDailyGoal,
        updatePreferences,
        resetProgress,
        importProgress,
        dueCount: dueWordIds.length,
        dueWordIds,
        syncStatus,
        lastSyncedAt,
        forceSync,
        saveRoleplaySettings,
        syncChatRoomHistory,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
