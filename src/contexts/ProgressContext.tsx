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
  RecentVocabEntry,
  VocabStudyLevelMode,
  VocabStudySource,
  VocabStudyState,
} from '@/types/progress';
import { CategoryId } from '@/types/vocabulary';
import { CustomVocabItem } from '@/types/custom-vocab';
import { CharacterConfig, RoleplayConversation } from '@/types/roleplay';
import { AiTutorConversation } from '@/lib/ai/types';
import { MAX_AI_TUTOR_CONVERSATIONS, getAiTutorHistoryKey } from '@/lib/ai/history';
import { DEFAULT_PROGRESS, loadUserProgress, saveUserProgress, updateStreak } from '@/lib/storage';
import { calculateSM2, createNewCard, calculateEstimatedScore } from '@/lib/srs';
import { upsertRecentVocabEntry } from '@/lib/vocab-study';
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
  isInitialCloudSyncDone: boolean;
  lastSyncedAt: Date | null;
  forceSync: () => Promise<void>;
  saveRoleplaySettings: (
    character: CharacterConfig,
    scenarioId?: string,
    userAvatar?: string,
    userName?: string
  ) => void;
  syncChatRoomHistory: (history: RoleplayConversation[]) => void;
  syncAiTutorHistory: (history: AiTutorConversation[]) => void;
  customItems: CustomVocabItem[];
  addCustomItem: (item: Omit<CustomVocabItem, 'id' | 'createdAt' | 'updatedAt'>) => Promise<CustomVocabItem>;
  updateCustomItem: (id: string, updates: Partial<Omit<CustomVocabItem, 'id' | 'createdAt'>>) => Promise<void>;
  deleteCustomItem: (id: string) => Promise<void>;
  recentVocabHistory: RecentVocabEntry[];
  vocabStudyState?: VocabStudyState;
  recordVocabStudy: (params: {
    wordId: string;
    studyModeLevel: VocabStudyLevelMode;
    categoryId?: CategoryId | 'all';
    categoryLocked?: boolean;
    phaseId?: string;
    source?: VocabStudySource;
    preserveStudyState?: boolean;
  }) => void;
  updateVocabStudyState: (
    updates: Partial<Omit<VocabStudyState, 'updatedAt'>>
  ) => void;
  clearRecentVocabHistory: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgressData>(DEFAULT_PROGRESS);
  const [isLoaded, setIsLoaded] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [syncedUserId, setSyncedUserId] = useState<string | null>(null);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);

  const isInitialCloudSyncDone = !user || !supabase || syncedUserId === user.id;

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

    const handleCustomVocabSync = () => {
      const reloaded = loadUserProgress();
      if (reloaded.customItems) {
        setProgress((prev) => ({
          ...prev,
          customItems: reloaded.customItems,
          deletedCustomItemIds: reloaded.deletedCustomItemIds,
        }));
      }
    };

    const handleStorageSync = (e: StorageEvent) => {
      if (e.key === 'toeic_vocab_mastery_v1') {
        const reloaded = loadUserProgress();
        setProgress(reloaded);
      } else {
        handleRoleplaySync();
        handleCustomVocabSync();
      }
    };

    window.addEventListener('roleplay-synced', handleRoleplaySync);
    window.addEventListener('custom-vocab-synced', handleCustomVocabSync);
    window.addEventListener('storage', handleStorageSync);
    return () => {
      window.removeEventListener('roleplay-synced', handleRoleplaySync);
      window.removeEventListener('custom-vocab-synced', handleCustomVocabSync);
      window.removeEventListener('storage', handleStorageSync);
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
          if (merged.aiTutorHistory && user?.id) {
            try {
              localStorage.setItem(
                getAiTutorHistoryKey(user.id),
                JSON.stringify(merged.aiTutorHistory)
              );
              window.dispatchEvent(
                new CustomEvent('ai-tutor-history-updated', {
                  detail: { userId: user.id, history: merged.aiTutorHistory },
                })
              );
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
      } finally {
        if (isMounted && user?.id) {
          setSyncedUserId(user.id);
        }
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

  const syncAiTutorHistory = useCallback(
    (history: AiTutorConversation[]) => {
      if (!user) return; // STRICT: only save and sync for authenticated users
      setProgress((prev) => {
        const updated: UserProgressData = {
          ...prev,
          aiTutorHistory: history.slice(0, MAX_AI_TUTOR_CONVERSATIONS),
        };
        saveUserProgress(updated);
        scheduleCloudSync(updated);
        return updated;
      });
    },
    [user, scheduleCloudSync]
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
          recentVocabHistory: Array.isArray(data.recentVocabHistory) ? data.recentVocabHistory : [],
          vocabStudyState: data.vocabStudyState,
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

  const addCustomItem = useCallback(
    async (item: Omit<CustomVocabItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<CustomVocabItem> => {
      const newItem: CustomVocabItem = {
        ...item,
        id: `cst_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setProgress((prev) => {
        const existing = prev.customItems || [];
        const updatedList = [newItem, ...existing.filter((i) => i.id !== newItem.id)];
        const nextProgress: UserProgressData = {
          ...prev,
          customItems: updatedList,
        };
        saveUserProgress(nextProgress);
        scheduleCloudSync(nextProgress);
        return nextProgress;
      });

      return newItem;
    },
    [scheduleCloudSync]
  );

  const updateCustomItem = useCallback(
    async (id: string, updates: Partial<Omit<CustomVocabItem, 'id' | 'createdAt'>>): Promise<void> => {
      setProgress((prev) => {
        const existing = prev.customItems || [];
        const index = existing.findIndex((i) => i.id === id);
        if (index === -1) return prev;

        const updatedItem: CustomVocabItem = {
          ...existing[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        };

        const updatedList = [...existing];
        updatedList[index] = updatedItem;

        const nextProgress: UserProgressData = {
          ...prev,
          customItems: updatedList,
        };
        saveUserProgress(nextProgress);
        scheduleCloudSync(nextProgress);
        return nextProgress;
      });
    },
    [scheduleCloudSync]
  );

  const deleteCustomItem = useCallback(
    async (id: string): Promise<void> => {
      setProgress((prev) => {
        const existing = prev.customItems || [];
        const updatedList = existing.filter((i) => i.id !== id);
        const updatedDeletedIds = Array.from(new Set([...(prev.deletedCustomItemIds || []), id]));

        const nextProgress: UserProgressData = {
          ...prev,
          customItems: updatedList,
          deletedCustomItemIds: updatedDeletedIds,
        };
        saveUserProgress(nextProgress);
        scheduleCloudSync(nextProgress);
        return nextProgress;
      });
    },
    [scheduleCloudSync]
  );

  const recordVocabStudy = useCallback(
    (params: {
      wordId: string;
      studyModeLevel: VocabStudyLevelMode;
      categoryId?: CategoryId | 'all';
      categoryLocked?: boolean;
      phaseId?: string;
      source?: VocabStudySource;
      preserveStudyState?: boolean;
    }) => {
      if (!params.wordId) return;
      const nowIso = new Date().toISOString();

      setProgress((prev) => {
        const entry: RecentVocabEntry = {
          wordId: params.wordId,
          viewedAt: nowIso,
          studyModeLevel: params.studyModeLevel,
          categoryId: params.categoryId,
          categoryLocked: params.categoryLocked,
          phaseId: params.phaseId,
          source: params.source || 'word-detail',
        };

        const updatedHistory = upsertRecentVocabEntry(prev.recentVocabHistory, entry);

        const nextStudyState: VocabStudyState = params.preserveStudyState
          ? {
              studyModeLevel: prev.vocabStudyState?.studyModeLevel || params.studyModeLevel,
              ...(prev.vocabStudyState || {}),
              lastWordId: params.wordId,
              lastStudiedAt: nowIso,
              updatedAt: nowIso,
            }
          : {
              ...(prev.vocabStudyState || {}),
              lastWordId: params.wordId,
              lastStudiedAt: nowIso,
              studyModeLevel: params.studyModeLevel,
              categoryLocked: Boolean(params.categoryLocked),
              lockedCategoryId:
                params.categoryLocked && params.categoryId && params.categoryId !== 'all'
                  ? params.categoryId
                  : undefined,
              activePhaseId: params.phaseId || undefined,
              updatedAt: nowIso,
            };

        const nextProgress: UserProgressData = {
          ...prev,
          recentVocabHistory: updatedHistory,
          vocabStudyState: nextStudyState,
        };

        saveUserProgress(nextProgress);
        scheduleCloudSync(nextProgress);
        return nextProgress;
      });
    },
    [scheduleCloudSync]
  );

  const updateVocabStudyState = useCallback(
    (updates: Partial<Omit<VocabStudyState, 'updatedAt'>>) => {
      const nowIso = new Date().toISOString();
      setProgress((prev) => {
        const nextStudyState: VocabStudyState = {
          studyModeLevel: prev.vocabStudyState?.studyModeLevel || 'essential',
          ...(prev.vocabStudyState || {}),
          ...updates,
          updatedAt: nowIso,
        };

        const nextProgress: UserProgressData = {
          ...prev,
          vocabStudyState: nextStudyState,
        };

        saveUserProgress(nextProgress);
        scheduleCloudSync(nextProgress);
        return nextProgress;
      });
    },
    [scheduleCloudSync]
  );

  const clearRecentVocabHistory = useCallback(() => {
    const nowIso = new Date().toISOString();
    setProgress((prev) => {
      const nextProgress: UserProgressData = {
        ...prev,
        recentVocabHistory: [],
        vocabStudyState: prev.vocabStudyState
          ? {
              ...prev.vocabStudyState,
              lastWordId: undefined,
              lastStudiedAt: undefined,
              updatedAt: nowIso,
            }
          : undefined,
      };
      saveUserProgress(nextProgress);
      scheduleCloudSync(nextProgress);
      return nextProgress;
    });
  }, [scheduleCloudSync]);

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
        isInitialCloudSyncDone,
        lastSyncedAt,
        forceSync,
        saveRoleplaySettings,
        syncChatRoomHistory,
        syncAiTutorHistory,
        customItems: progress.customItems || [],
        addCustomItem,
        updateCustomItem,
        deleteCustomItem,
        recentVocabHistory: progress.recentVocabHistory || [],
        vocabStudyState: progress.vocabStudyState,
        recordVocabStudy,
        updateVocabStudyState,
        clearRecentVocabHistory,
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
