export function calculateSM2(card, quality) {
  const q = Math.max(0, Math.min(5, Math.round(quality)));

  let newEF = card.easinessFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (newEF < 1.3) {
    newEF = 1.3;
  }

  let newRepetitions = card.repetitions;
  let newInterval = card.interval;

  if (q < 3) {
    newRepetitions = 0;
    newInterval = 1;
  } else {
    if (newRepetitions === 0) {
      newInterval = 1;
    } else if (newRepetitions === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(newInterval * newEF);
    }
    newRepetitions += 1;
  }

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

export function createNewCard(wordId) {
  return {
    wordId,
    repetitions: 0,
    interval: 0,
    easinessFactor: 2.5,
    nextReview: new Date().toISOString(),
    history: [],
  };
}

export function isCardDue(card, currentDate = new Date()) {
  return new Date(card.nextReview) <= currentDate;
}

export function calculateEstimatedScore(totalLearned, reviewMasteryRate) {
  const baseline = 400;
  const wordWeight = Math.min(totalLearned * 0.7, 350);
  const masteryBonus = reviewMasteryRate * 100;
  return Math.min(990, Math.round(baseline + wordWeight + masteryBonus));
}
