import { UserProgressData, SRSCard, ExerciseSessionResult } from '@/types/progress';
import { calculateEstimatedScore } from './srs';

/**
 * Merge two SRSCards for the same word.
 * Chooses the card that has been reviewed more recently or has higher repetitions.
 */
function mergeCard(cardA: SRSCard, cardB: SRSCard): SRSCard {
  const dateA = cardA.lastReview ? new Date(cardA.lastReview).getTime() : 0;
  const dateB = cardB.lastReview ? new Date(cardB.lastReview).getTime() : 0;

  if (dateA !== dateB) {
    return dateA > dateB ? cardA : cardB;
  }
  return cardA.repetitions >= cardB.repetitions ? cardA : cardB;
}

/**
 * Cleanly merges local progress data with remote cloud progress data.
 * Guarantees zero data loss when logging in from a new device or after studying offline.
 */
export function mergeUserProgress(
  local: UserProgressData,
  remote: UserProgressData
): UserProgressData {
  // 1. Merge cards
  const mergedCards: Record<string, SRSCard> = { ...local.cards };

  for (const [wordId, remoteCard] of Object.entries(remote.cards || {})) {
    if (!mergedCards[wordId]) {
      mergedCards[wordId] = remoteCard;
    } else {
      mergedCards[wordId] = mergeCard(mergedCards[wordId], remoteCard);
    }
  }

  // 2. Merge bookmarks (Set Union)
  const bookmarkedSet = new Set<string>([
    ...(local.bookmarkedWordIds || []),
    ...(remote.bookmarkedWordIds || []),
  ]);
  const mergedBookmarks = Array.from(bookmarkedSet);

  // 3. Merge exercise history (deduplicate by date + type)
  const allHistory = [...(local.history || []), ...(remote.history || [])];
  const historyMap = new Map<string, ExerciseSessionResult>();
  for (const item of allHistory) {
    const key = `${item.date}_${item.type}_${item.scorePercentage}`;
    if (!historyMap.has(key)) {
      historyMap.set(key, item);
    }
  }
  const mergedHistory = Array.from(historyMap.values())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 50);

  // 4. Merge stats
  const totalCards = Object.values(mergedCards);
  const totalLearned = totalCards.length;
  const masteredCount = totalCards.filter((c) => c.interval >= 14).length;
  const masteryRate = totalCards.length > 0 ? masteredCount / totalCards.length : 0;

  const longestStreak = Math.max(
    local.stats?.longestStreak || 0,
    remote.stats?.longestStreak || 0
  );

  const localLastStudy = local.stats?.lastStudyDate || '';
  const remoteLastStudy = remote.stats?.lastStudyDate || '';
  const latestStudyDate = localLastStudy > remoteLastStudy ? localLastStudy : remoteLastStudy;

  const currentStreak =
    latestStudyDate === localLastStudy
      ? Math.max(local.stats?.currentStreak || 0, remote.stats?.currentStreak || 0)
      : (remote.stats?.currentStreak || 0);

  const estimatedScore = calculateEstimatedScore(totalLearned, masteryRate);

  // 5. Merge onboarding & learning path state
  let mergedOnboarding = local.onboarding || remote.onboarding;
  if (local.onboarding && remote.onboarding) {
    const localCompleted = local.onboarding.isCompleted;
    const remoteCompleted = remote.onboarding.isCompleted;
    if (remoteCompleted && !localCompleted) {
      mergedOnboarding = remote.onboarding;
    } else if (localCompleted && !remoteCompleted) {
      mergedOnboarding = local.onboarding;
    } else if (remote.onboarding.learningPath && !local.onboarding.learningPath) {
      mergedOnboarding = remote.onboarding;
    } else if (local.onboarding.learningPath && !remote.onboarding.learningPath) {
      mergedOnboarding = local.onboarding;
    } else {
      mergedOnboarding = local.onboarding;
    }
  }

  return {
    version: Math.max(local.version || 1, remote.version || 1),
    cards: mergedCards,
    bookmarkedWordIds: mergedBookmarks,
    history: mergedHistory,
    preferences: {
      ...(local.preferences || {}),
      ...(remote.preferences || {}),
    },
    stats: {
      totalWordsLearned: totalLearned,
      totalReviews: Math.max(local.stats?.totalReviews || 0, remote.stats?.totalReviews || 0),
      currentStreak,
      longestStreak,
      lastStudyDate: latestStudyDate,
      dailyGoal: remote.stats?.dailyGoal || local.stats?.dailyGoal || 10,
      estimatedToeicScore: estimatedScore,
    },
    onboarding: mergedOnboarding,
  };
}
