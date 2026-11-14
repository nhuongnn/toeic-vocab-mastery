import { SRSCard } from '@/types/progress';

/**
 * SuperMemo 2 (SM-2) Spaced Repetition Algorithm
 *
 * Quality ratings:
 * 5 - Perfect recall, effortless and instant
 * 4 - Correct response after slight hesitation
 * 3 - Correct response with significant recall effort
 * 2 - Incorrect response, but upon seeing the answer it felt obvious
 * 1 - Incorrect response, remembered the word vaguely
 * 0 - Complete blackout, no recollection
 */
export function calculateSM2(card: SRSCard, quality: number): SRSCard {
  const q = Math.max(0, Math.min(5, Math.round(quality)));

  // 1. Calculate new Easiness Factor (EF)
  // Formula: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  let newEF = card.easinessFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (newEF < 1.3) {
    newEF = 1.3;
  }

  let newRepetitions = card.repetitions;
  let newInterval = card.interval;

  // 2. Adjust Repetitions & Interval
  if (q < 3) {
    // Failed recall: reset repetitions, interval becomes 1 day
    newRepetitions = 0;
    newInterval = 1;
  } else {
    // Successful recall
    if (newRepetitions === 0) {
      newInterval = 1;
    } else if (newRepetitions === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(newInterval * newEF);
    }
    newRepetitions += 1;
  }

  // 3. Compute target date
  const now = new Date();
  const nextDate = new Date(now.getTime() + newInterval * 24 * 60 * 60 * 1000);

  const historyEntry = {
    date: now.toISOString(),
    quality: q,
  };

  const existingHistory = card.history || [];

  return {
    wordId: card.wordId,
    repetitions: newRepetitions,
    interval: newInterval,
    easinessFactor: Number(newEF.toFixed(2)),
    nextReview: nextDate.toISOString(),
    lastReview: now.toISOString(),
    history: [...existingHistory, historyEntry],
  };
}

export function createNewCard(wordId: string): SRSCard {
  return {
    wordId,
    repetitions: 0,
    interval: 0,
    easinessFactor: 2.5,
    nextReview: new Date().toISOString(),
    history: [],
  };
}

export function isCardDue(card: SRSCard, currentDate: Date = new Date()): boolean {
  return new Date(card.nextReview) <= currentDate;
}

export function getDueWordIds(cards: Record<string, SRSCard>): string[] {
  const now = new Date();
  return Object.values(cards)
    .filter((card) => isCardDue(card, now))
    .map((card) => card.wordId);
}

export function calculateEstimatedScore(totalLearned: number, reviewMasteryRate: number): number {
  // Base TOEIC score starts around 400
  // With 100 words mastered: ~550
  // With 250 words mastered: ~650
  // With 500+ words mastered + high retention: ~750 - 850
  const baseline = 400;
  const wordWeight = Math.min(totalLearned * 0.7, 350);
  const masteryBonus = reviewMasteryRate * 100;
  return Math.min(990, Math.round(baseline + wordWeight + masteryBonus));
}
