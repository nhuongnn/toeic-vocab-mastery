'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserProgressData, SRSCard, ExerciseSessionResult } from '@/types/progress';
import { DEFAULT_PROGRESS, loadUserProgress, saveUserProgress, updateStreak } from '@/lib/storage';
import { calculateSM2, createNewCard, calculateEstimatedScore } from '@/lib/srs';

interface ProgressContextType {
  progress: UserProgressData;
  recordReview: (wordId: string, quality: number) => void;
  recordExerciseSession: (session: ExerciseSessionResult) => void;
  toggleBookmark: (wordId: string) => void;
  isBookmarked: (wordId: string) => boolean;
  getCard: (wordId: string) => SRSCard | undefined;
  dueCount: number;
  dueWordIds: string[];
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<UserProgressData>(DEFAULT_PROGRESS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loaded = loadUserProgress();
    setProgress(loaded);
    setIsLoaded(true);
  }, []);

  const save = useCallback((updated: UserProgressData) => {
    setProgress(updated);
    saveUserProgress(updated);
  }, []);

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

        // Calculate mastery estimate
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
        return updated;
      });
    },
    []
  );

  const recordExerciseSession = useCallback((session: ExerciseSessionResult) => {
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
      return updated;
    });
  }, []);

  const toggleBookmark = useCallback((wordId: string) => {
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
      return updated;
    });
  }, []);

  const isBookmarked = useCallback(
    (wordId: string) => progress.bookmarkedWordIds.includes(wordId),
    [progress.bookmarkedWordIds]
  );

  const getCard = useCallback(
    (wordId: string) => progress.cards[wordId],
    [progress.cards]
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
        recordReview,
        recordExerciseSession,
        toggleBookmark,
        isBookmarked,
        getCard,
        dueCount: dueWordIds.length,
        dueWordIds,
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
