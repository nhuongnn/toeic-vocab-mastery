import { FlattenedQuestion } from '@/types/mockTest';
import { calculateSM2, createNewCard } from '@/lib/srs';
import { loadUserProgress, saveUserProgress, updateStreak } from '@/lib/storage';

/**
 * Automatically feeds questions with relatedWordIds into the user's SRS progress
 */
export function syncMockTestWithSRS(
  questions: FlattenedQuestion[],
  answers: Record<string, number | null>
): { updatedCount: number } {
  if (typeof window === 'undefined') return { updatedCount: 0 };

  try {
    const progress = loadUserProgress();
    let updatedCount = 0;

    for (const q of questions) {
      if (!q.relatedWordIds || q.relatedWordIds.length === 0) continue;

      const userAns = answers[q.id];
      const isCorrect = userAns !== null && userAns === q.correctAnswer;
      // Quality rating: 4 for correct, 1 for incorrect
      const quality = isCorrect ? 4 : 1;

      for (const wordId of q.relatedWordIds) {
        const existingCard = progress.cards[wordId] || createNewCard(wordId);
        const updatedCard = calculateSM2(existingCard, quality);
        progress.cards[wordId] = updatedCard;
        updatedCount++;
      }
    }

    if (updatedCount > 0) {
      progress.stats.totalReviews += updatedCount;
      const { newStreak, newLongest, todayStr } = updateStreak(
        progress.stats.currentStreak,
        progress.stats.longestStreak,
        progress.stats.lastStudyDate
      );
      progress.stats.currentStreak = newStreak;
      progress.stats.longestStreak = newLongest;
      progress.stats.lastStudyDate = todayStr;
      saveUserProgress(progress);
    }

    return { updatedCount };
  } catch (err) {
    console.error('Failed to sync mock test with SRS:', err);
    return { updatedCount: 0 };
  }
}
