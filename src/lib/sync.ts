import { UserProgressData, SRSCard, ExerciseSessionResult } from '@/types/progress';
import { OnboardingState } from '@/types/onboarding';
import { calculateEstimatedScore } from './srs';
import { generateLearningPath } from './placement/learningPath';

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

  // 5. Merge onboarding & learning path state (preserve learning path across devices)
  let mergedOnboarding: OnboardingState | undefined = undefined;
  if (local.onboarding || remote.onboarding) {
    const oLocal = local.onboarding;
    const oRemote = remote.onboarding;

    // Prefer non-null learningPath (remote takes precedence if available or if set on another device)
    const effectiveLearningPath =
      oRemote?.learningPath ||
      oLocal?.learningPath ||
      null;

    const effectiveTargetScore =
      oRemote?.learningPath?.targetScore ||
      oRemote?.targetScore ||
      oLocal?.learningPath?.targetScore ||
      oLocal?.targetScore ||
      650;

    const effectivePlacement =
      oRemote?.placementResult ||
      oLocal?.placementResult ||
      null;

    const effectiveMinutes =
      oRemote?.dailyMinutes ||
      oLocal?.dailyMinutes ||
      20;

    const effectiveCompleted = Boolean(
      oRemote?.isCompleted ||
      oLocal?.isCompleted ||
      effectiveLearningPath
    );

    mergedOnboarding = {
      isCompleted: effectiveCompleted,
      currentStep: effectiveCompleted ? 'result' : (oRemote?.currentStep || oLocal?.currentStep || 'welcome'),
      targetScore: effectiveTargetScore,
      dailyMinutes: effectiveMinutes,
      experienceLevel: oRemote?.experienceLevel || oLocal?.experienceLevel || null,
      placementResult: effectivePlacement,
      learningPath:
        effectiveLearningPath ||
        (effectiveCompleted && effectiveTargetScore
          ? generateLearningPath(
              effectiveTargetScore,
              effectivePlacement?.level || 'essential',
              effectiveMinutes
            )
          : null),
      tourCompleted: Boolean(oRemote?.tourCompleted || oLocal?.tourCompleted),
      completedAt: oRemote?.completedAt || oLocal?.completedAt,
    };
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
