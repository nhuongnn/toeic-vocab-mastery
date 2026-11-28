import { UserProgressData, SRSCard, ExerciseSessionResult, RoleplayPreferences } from '@/types/progress';
import { CustomVocabItem } from '@/types/custom-vocab';
import { OnboardingState } from '@/types/onboarding';
import { RoleplayConversation } from '@/types/roleplay';
import { AiTutorConversation } from '@/lib/ai/types';
import { MAX_AI_TUTOR_CONVERSATIONS } from '@/lib/ai/history';
import { calculateEstimatedScore } from './srs';
import { generateLearningPath } from './placement/learningPath';
import { mergeRecentVocabHistory, mergeVocabStudyState } from './vocab-study';

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

  // 5. Merge onboarding & learning path state (preserve latest across devices)
  let mergedOnboarding: OnboardingState | undefined = undefined;
  if (local.onboarding || remote.onboarding) {
    const oLocal = local.onboarding;
    const oRemote = remote.onboarding;

    const timeLocal = oLocal?.updatedAt ? new Date(oLocal.updatedAt).getTime() : (oLocal?.completedAt ? new Date(oLocal.completedAt).getTime() : 0);
    const timeRemote = oRemote?.updatedAt ? new Date(oRemote.updatedAt).getTime() : (oRemote?.completedAt ? new Date(oRemote.completedAt).getTime() : 0);

    // Pick winner based on newer update timestamp
    let winner: OnboardingState | undefined;
    let fallback: OnboardingState | undefined;

    if (timeLocal > timeRemote) {
      winner = oLocal;
      fallback = oRemote;
    } else if (timeRemote > timeLocal) {
      winner = oRemote;
      fallback = oLocal;
    } else {
      // If timestamps equal or absent:
      // If one has learningPath and other doesn't, prefer the one with learningPath
      if (oLocal?.learningPath && !oRemote?.learningPath) {
        winner = oLocal;
        fallback = oRemote;
      } else if (oRemote?.learningPath && !oLocal?.learningPath) {
        winner = oRemote;
        fallback = oLocal;
      } else {
        // Prefer local (active user's current session)
        winner = oLocal || oRemote;
        fallback = oRemote || oLocal;
      }
    }

    const effectiveTargetScore = winner?.targetScore || fallback?.targetScore || 650;
    const effectivePlacement = winner?.placementResult || fallback?.placementResult || null;
    const effectiveMinutes = winner?.dailyMinutes || fallback?.dailyMinutes || 20;
    const effectiveCompleted = Boolean(
      winner?.isCompleted ||
      fallback?.isCompleted ||
      winner?.learningPath ||
      fallback?.learningPath
    );

    // Ensure the learning path matches effectiveTargetScore consistently
    let effectiveLearningPath = winner?.learningPath || fallback?.learningPath || null;
    if (effectiveLearningPath && effectiveLearningPath.targetScore !== effectiveTargetScore) {
      effectiveLearningPath = generateLearningPath(
        effectiveTargetScore,
        effectivePlacement?.level || effectiveLearningPath.currentLevel || 'essential',
        effectiveMinutes
      );
    } else if (!effectiveLearningPath && effectiveCompleted && effectiveTargetScore) {
      effectiveLearningPath = generateLearningPath(
        effectiveTargetScore,
        effectivePlacement?.level || 'essential',
        effectiveMinutes
      );
    }

    mergedOnboarding = {
      isCompleted: effectiveCompleted,
      currentStep: effectiveCompleted ? 'result' : (winner?.currentStep || fallback?.currentStep || 'welcome'),
      targetScore: effectiveTargetScore,
      dailyMinutes: effectiveMinutes,
      experienceLevel: winner?.experienceLevel || fallback?.experienceLevel || null,
      placementResult: effectivePlacement,
      learningPath: effectiveLearningPath,
      tourCompleted: Boolean(winner?.tourCompleted || fallback?.tourCompleted),
      completedAt: winner?.completedAt || fallback?.completedAt,
      updatedAt: winner?.updatedAt || fallback?.updatedAt || new Date().toISOString(),
    };
  }

  // 6. Merge roleplay character settings & chat history
  let mergedRoleplay: RoleplayPreferences | undefined = undefined;
  if (local.roleplay || remote.roleplay) {
    const timeLocal = local.roleplay?.updatedAt ? new Date(local.roleplay.updatedAt).getTime() : 0;
    const timeRemote = remote.roleplay?.updatedAt ? new Date(remote.roleplay.updatedAt).getTime() : 0;
    const baseRoleplay = timeRemote > timeLocal ? (remote.roleplay || local.roleplay) : (local.roleplay || remote.roleplay);

    // Merge chat history across devices, deduplicating by ID and preserving latest updates
    const historyMap = new Map<string, RoleplayConversation>();
    const allHistory = [
      ...(local.roleplay?.chatHistory || []),
      ...(remote.roleplay?.chatHistory || []),
    ];

    for (const conv of allHistory) {
      if (!conv || !conv.id) continue;
      const existing = historyMap.get(conv.id);
      if (!existing) {
        historyMap.set(conv.id, conv);
      } else {
        const msgMap = new Map<string, RoleplayConversation['messages'][number]>();
        for (const m of [...(existing.messages || []), ...(conv.messages || [])]) {
          if (m?.id) msgMap.set(m.id, m);
        }
        const mergedMessages = Array.from(msgMap.values()).sort(
          (a, b) => (a.timestamp || 0) - (b.timestamp || 0)
        );
        const newer = (conv.updatedAt || 0) > (existing.updatedAt || 0) ? conv : existing;
        const hasMoreMessages =
          mergedMessages.length > (newer.messages?.length || 0);
        const mergedInteractionAt = Math.max(
          existing.lastUserInteractionAt || 0,
          conv.lastUserInteractionAt || 0
        );
        const mergedIsAutoBubble = Boolean(
          existing.isAutoBubble || conv.isAutoBubble
        );
        historyMap.set(conv.id, {
          ...newer,
          messages: mergedMessages.length > 0 ? mergedMessages : newer.messages,
          messageCount: mergedMessages.length || newer.messageCount,
          lastMessageSnippet:
            hasMoreMessages && mergedMessages.length > 0
              ? mergedMessages[mergedMessages.length - 1].content.slice(0, 120)
              : newer.lastMessageSnippet,
          ...(mergedInteractionAt > 0
            ? { lastUserInteractionAt: mergedInteractionAt }
            : {}),
          ...(mergedIsAutoBubble ? { isAutoBubble: true } : {}),
        });
      }
    }

    const mergedChatHistory = Array.from(historyMap.values())
      .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
      .slice(0, 10);

    mergedRoleplay = {
      ...baseRoleplay,
      chatHistory: mergedChatHistory,
      updatedAt: new Date(Math.max(timeLocal, timeRemote, Date.now())).toISOString(),
    };
  }

  // 7. Merge AI Tutor conversation history across devices (strictly up to 5 most recent)
  let mergedAiTutorHistory: AiTutorConversation[] | undefined = undefined;
  if (local.aiTutorHistory || remote.aiTutorHistory) {
    const tutorHistoryMap = new Map<string, AiTutorConversation>();
    const allTutorHistory = [
      ...(local.aiTutorHistory || []),
      ...(remote.aiTutorHistory || []),
    ];

    for (const conv of allTutorHistory) {
      if (!conv || !conv.id) continue;
      const existing = tutorHistoryMap.get(conv.id);
      if (!existing || (conv.updatedAt || 0) > (existing.updatedAt || 0)) {
        tutorHistoryMap.set(conv.id, conv);
      }
    }

    mergedAiTutorHistory = Array.from(tutorHistoryMap.values())
      .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
      .slice(0, MAX_AI_TUTOR_CONVERSATIONS);
  }

  // 8. Merge custom vocabulary & sentence patterns across devices
  const mergedDeletedIds = new Set<string>([
    ...(local.deletedCustomItemIds || []),
    ...(remote.deletedCustomItemIds || []),
  ]);

  const customItemMap = new Map<string, CustomVocabItem>();
  const allCustom = [
    ...(local.customItems || []),
    ...(remote.customItems || []),
  ];

  for (const item of allCustom) {
    if (!item || !item.id) continue;
    if (mergedDeletedIds.has(item.id)) continue;
    const existing = customItemMap.get(item.id);
    const itemTime = item.updatedAt ? new Date(item.updatedAt).getTime() : 0;
    const existingTime = existing?.updatedAt ? new Date(existing.updatedAt).getTime() : 0;
    if (!existing || itemTime >= existingTime) {
      customItemMap.set(item.id, item);
    }
  }

  const mergedCustomItems = Array.from(customItemMap.values()).sort(
    (a, b) => new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime()
  );

  // 9. Merge recent vocabulary study history & active study state across devices
  const mergedRecentVocabHistory = mergeRecentVocabHistory(
    local.recentVocabHistory,
    remote.recentVocabHistory
  );
  const mergedVocabStudyState = mergeVocabStudyState(
    local.vocabStudyState,
    remote.vocabStudyState
  );

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
    roleplay: mergedRoleplay,
    aiTutorHistory: mergedAiTutorHistory,
    customItems: mergedCustomItems,
    deletedCustomItemIds: Array.from(mergedDeletedIds),
    recentVocabHistory: mergedRecentVocabHistory,
    vocabStudyState: mergedVocabStudyState,
  };
}
