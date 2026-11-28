import { LearningPath, LearningPhase } from '@/types/onboarding';
import { RecentVocabEntry, SRSCard, VocabStudyLevelMode, VocabStudyState } from '@/types/progress';
import { CategoryId, VocabularyWord, WordSortOption } from '@/types/vocabulary';
import { sortVocabularyWords } from './vocabulary-helpers';

export const MAX_RECENT_VOCAB_HISTORY = 30;
export const STUDY_NAVIGATION_LEVEL_KEY = 'toeic_study_navigation_level';

function toTimestamp(iso?: string): number {
  if (!iso) return 0;
  const parsed = new Date(iso).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
}

/**
 * Inserts or updates a vocabulary study entry, keeping unique wordIds ordered newest-first
 * and preserving the newest timestamp if an older record arrives.
 */
export function upsertRecentVocabEntry(
  history: RecentVocabEntry[] | undefined,
  entry: RecentVocabEntry
): RecentVocabEntry[] {
  const map = new Map<string, RecentVocabEntry>();

  for (const item of history || []) {
    if (!item?.wordId) continue;
    const existing = map.get(item.wordId);
    if (!existing || toTimestamp(item.viewedAt) >= toTimestamp(existing.viewedAt)) {
      map.set(item.wordId, item);
    }
  }

  const prev = map.get(entry.wordId);
  if (!prev || toTimestamp(entry.viewedAt) >= toTimestamp(prev.viewedAt)) {
    map.set(entry.wordId, entry);
  }

  return Array.from(map.values())
    .sort((a, b) => toTimestamp(b.viewedAt) - toTimestamp(a.viewedAt))
    .slice(0, MAX_RECENT_VOCAB_HISTORY);
}

/**
 * Merges recent vocabulary study histories from local and remote devices without data loss.
 */
export function mergeRecentVocabHistory(
  local?: RecentVocabEntry[],
  remote?: RecentVocabEntry[]
): RecentVocabEntry[] {
  const map = new Map<string, RecentVocabEntry>();

  for (const item of [...(local || []), ...(remote || [])]) {
    if (!item?.wordId) continue;
    const existing = map.get(item.wordId);
    if (!existing || toTimestamp(item.viewedAt) >= toTimestamp(existing.viewedAt)) {
      map.set(item.wordId, item);
    }
  }

  return Array.from(map.values())
    .sort((a, b) => toTimestamp(b.viewedAt) - toTimestamp(a.viewedAt))
    .slice(0, MAX_RECENT_VOCAB_HISTORY);
}

/**
 * Merges the active vocabulary study mode / resume cursor across devices using updatedAt.
 */
export function mergeVocabStudyState(
  local?: VocabStudyState,
  remote?: VocabStudyState
): VocabStudyState | undefined {
  if (!local && !remote) return undefined;
  if (!local) return remote;
  if (!remote) return local;

  const localTime = Math.max(toTimestamp(local.updatedAt), toTimestamp(local.lastStudiedAt));
  const remoteTime = Math.max(toTimestamp(remote.updatedAt), toTimestamp(remote.lastStudiedAt));

  const winner = remoteTime > localTime ? remote : local;
  const fallback = winner === remote ? local : remote;

  const lastWordFromWinner = Boolean(winner.lastWordId);
  return {
    ...fallback,
    ...winner,
    lastWordId: winner.lastWordId || fallback.lastWordId,
    lastStudiedAt: lastWordFromWinner
      ? winner.lastStudiedAt || fallback.lastStudiedAt
      : fallback.lastStudiedAt,
    updatedAt:
      toTimestamp(winner.updatedAt) >= toTimestamp(fallback.updatedAt)
        ? winner.updatedAt
        : fallback.updatedAt,
  };
}

/**
 * Returns all vocabulary words belonging to a LearningPhase (matching categoryIds and wordLevel).
 */
export function getWordsForLearningPhase(
  words: VocabularyWord[],
  phase: LearningPhase
): VocabularyWord[] {
  const categorySet = new Set(phase.categoryIds);
  return words.filter((w) => categorySet.has(w.category) && w.level === phase.wordLevel);
}

/**
 * Computes learned & mastered counts within a specific LearningPhase.
 */
export function getPhaseProgress(
  words: VocabularyWord[],
  phase: LearningPhase,
  cards: Record<string, SRSCard>
): {
  totalWords: number;
  learnedCount: number;
  masteredCount: number;
  percentage: number;
} {
  const phaseWords = getWordsForLearningPhase(words, phase);
  let learnedCount = 0;
  let masteredCount = 0;

  for (const w of phaseWords) {
    const card = cards[w.id];
    if (card) {
      learnedCount++;
      if (card.interval >= 14) {
        masteredCount++;
      }
    }
  }

  const totalWords = phaseWords.length;
  const percentage = totalWords > 0 ? Math.round((learnedCount / totalWords) * 100) : 0;

  return { totalWords, learnedCount, masteredCount, percentage };
}

/**
 * Resolves the user's active LearningPhase, or falls back to the first phase in learningPath.
 */
export function resolveActivePhase(
  learningPath: LearningPath | null | undefined,
  preferredPhaseId?: string | null
): LearningPhase | null {
  if (!learningPath || !Array.isArray(learningPath.phases) || learningPath.phases.length === 0) {
    return null;
  }
  if (preferredPhaseId) {
    const matched = learningPath.phases.find((p) => p.id === preferredPhaseId);
    if (matched) return matched;
  }
  return learningPath.phases[0] || null;
}

/**
 * Filters and sorts vocabulary words for a given study context (phase, level mode, category lock).
 */
export function getWordsForStudyContext(
  words: VocabularyWord[],
  options: {
    studyModeLevel?: VocabStudyLevelMode;
    categoryLocked?: boolean;
    lockedCategoryId?: CategoryId | 'all';
    activePhase?: LearningPhase | null;
    sortBy?: WordSortOption;
  }
): VocabularyWord[] {
  const {
    studyModeLevel = 'all',
    categoryLocked = false,
    lockedCategoryId,
    activePhase = null,
    sortBy = 'default',
  } = options;

  let filtered: VocabularyWord[];

  if (activePhase) {
    const phaseCats = new Set(activePhase.categoryIds);
    filtered = words.filter((w) => {
      if (!phaseCats.has(w.category)) return false;
      if (w.level !== activePhase.wordLevel) return false;
      if (categoryLocked && lockedCategoryId && lockedCategoryId !== 'all') {
        return w.category === lockedCategoryId;
      }
      return true;
    });
  } else {
    filtered = words.filter((w) => {
      if (studyModeLevel !== 'all' && w.level !== studyModeLevel) return false;
      if (categoryLocked && lockedCategoryId && lockedCategoryId !== 'all') {
        return w.category === lockedCategoryId;
      }
      return true;
    });
  }

  return sortVocabularyWords(filtered, sortBy);
}

/**
 * Builds a /word/[id] URL preserving study mode, category lock, and learning path phase.
 */
export function buildWordStudyUrl(
  wordId: string,
  options?: {
    level?: VocabStudyLevelMode;
    category?: CategoryId | 'all';
    phaseId?: string | null;
  }
): string {
  const params = new URLSearchParams();
  if (options?.level && options.level !== 'all') {
    params.set('level', options.level);
  }
  if (options?.category && options.category !== 'all') {
    params.set('category', options.category);
  }
  if (options?.phaseId) {
    params.set('phase', options.phaseId);
  }
  const qs = params.toString();
  return `/word/${wordId}${qs ? `?${qs}` : ''}`;
}

export type RecentVocabFilterScope = 'all' | 'study-mode' | 'learning-path';

/**
 * Filters recent vocabulary entries by All, current Study Mode, or user's Learning Path.
 */
export function filterRecentVocabEntries(
  entries: RecentVocabEntry[] | undefined,
  wordsById: Record<string, VocabularyWord>,
  scope: RecentVocabFilterScope,
  options: {
    studyModeLevel?: VocabStudyLevelMode;
    categoryLocked?: boolean;
    lockedCategoryId?: CategoryId | 'all';
    learningPath?: LearningPath | null;
    phaseId?: string | 'all' | null;
  } = {}
): RecentVocabEntry[] {
  const validEntries = (entries || []).filter((e) => Boolean(e?.wordId && wordsById[e.wordId]));

  if (scope === 'all') {
    return validEntries;
  }

  if (scope === 'study-mode') {
    const modeLevel = options.studyModeLevel || 'all';
    return validEntries.filter((entry) => {
      const word = wordsById[entry.wordId];
      if (!word) return false;
      if (modeLevel !== 'all' && word.level !== modeLevel) {
        return false;
      }
      if (
        options.categoryLocked &&
        options.lockedCategoryId &&
        options.lockedCategoryId !== 'all' &&
        word.category !== options.lockedCategoryId
      ) {
        return false;
      }
      return true;
    });
  }

  // scope === 'learning-path'
  const path = options.learningPath;
  if (!path || !Array.isArray(path.phases) || path.phases.length === 0) {
    return [];
  }

  const targetPhases =
    options.phaseId && options.phaseId !== 'all'
      ? path.phases.filter((p) => p.id === options.phaseId)
      : path.phases;

  if (targetPhases.length === 0) {
    return [];
  }

  return validEntries.filter((entry) => {
    const word = wordsById[entry.wordId];
    if (!word) return false;
    return targetPhases.some(
      (phase) => phase.categoryIds.includes(word.category) && word.level === phase.wordLevel
    );
  });
}

export interface VocabResumeRecommendation {
  lastEntry: RecentVocabEntry | null;
  lastWord: VocabularyWord | null;
  nextWord: VocabularyWord | null;
  activePhase: LearningPhase | null;
  effectiveModeLevel: VocabStudyLevelMode;
  effectiveCategory: CategoryId | undefined;
  isLearningPathContext: boolean;
  contextWordsCount: number;
  learnedInContext: number;
  currentPosition: number | null; // 1-based position of lastWord in contextWords
  lastWordUrl: string | null;
  nextWordUrl: string | null;
}

/**
 * Computes the best "Continue Learning" / "Resume" recommendation based on
 * recent study history, active study mode, and the user's personalized learning path.
 */
export function getResumeRecommendation(params: {
  words: VocabularyWord[];
  wordsById: Record<string, VocabularyWord>;
  cards: Record<string, SRSCard>;
  recentHistory?: RecentVocabEntry[];
  studyState?: VocabStudyState;
  learningPath?: LearningPath | null;
  preferredPhaseId?: string | null;
  preferLearningPath?: boolean;
}): VocabResumeRecommendation {
  const {
    words,
    wordsById,
    cards,
    recentHistory = [],
    studyState,
    learningPath,
    preferredPhaseId,
    preferLearningPath = false,
  } = params;

  const sortedRecent = [...recentHistory]
    .filter((e) => Boolean(e?.wordId && wordsById[e.wordId]))
    .sort((a, b) => toTimestamp(b.viewedAt) - toTimestamp(a.viewedAt));

  let lastEntry: RecentVocabEntry | null = sortedRecent[0] || null;
  if (!lastEntry && studyState?.lastWordId && wordsById[studyState.lastWordId]) {
    lastEntry = {
      wordId: studyState.lastWordId,
      viewedAt: studyState.lastStudiedAt || studyState.updatedAt,
      studyModeLevel: studyState.studyModeLevel || 'all',
      categoryId: studyState.lockedCategoryId,
      categoryLocked: studyState.categoryLocked,
      phaseId: studyState.activePhaseId,
    };
  }

  const lastWord = lastEntry ? wordsById[lastEntry.wordId] || null : null;

  const requestedPhaseId =
    preferredPhaseId !== undefined
      ? preferredPhaseId
      : studyState?.activePhaseId || lastEntry?.phaseId || null;

  const activePhase =
    preferLearningPath || Boolean(requestedPhaseId)
      ? resolveActivePhase(learningPath, requestedPhaseId)
      : null;

  const effectiveModeLevel: VocabStudyLevelMode = activePhase
    ? activePhase.wordLevel
    : studyState?.studyModeLevel ||
      lastEntry?.studyModeLevel ||
      learningPath?.currentLevel ||
      'essential';

  const effectiveCategoryLocked = Boolean(
    studyState?.categoryLocked ?? lastEntry?.categoryLocked
  );
  const effectiveCategory: CategoryId | undefined = effectiveCategoryLocked
    ? studyState?.lockedCategoryId ||
      (lastEntry?.categoryId && lastEntry.categoryId !== 'all'
        ? lastEntry.categoryId
        : undefined)
    : undefined;

  const contextWords = getWordsForStudyContext(words, {
    studyModeLevel: effectiveModeLevel,
    categoryLocked: effectiveCategoryLocked,
    lockedCategoryId: effectiveCategory,
    activePhase,
    sortBy: studyState?.sortBy || 'default',
  });

  const learnedInContext = contextWords.filter((w) => Boolean(cards[w.id])).length;
  const lastIndex = lastWord ? contextWords.findIndex((w) => w.id === lastWord.id) : -1;
  const currentPosition = lastIndex >= 0 ? lastIndex + 1 : null;

  let nextWord: VocabularyWord | null = null;
  if (contextWords.length > 0) {
    if (lastIndex >= 0) {
      // Look forward for next unlearned word first
      const forwardUnlearned = contextWords.slice(lastIndex + 1).find((w) => !cards[w.id]);
      if (forwardUnlearned) {
        nextWord = forwardUnlearned;
      } else if (lastIndex + 1 < contextWords.length) {
        nextWord = contextWords[lastIndex + 1];
      } else {
        // Reached end of list: wrap to first unlearned or restart
        nextWord = contextWords.find((w) => !cards[w.id]) || contextWords[0];
      }
    } else {
      // Not in current context: start from first unlearned word in context
      nextWord = contextWords.find((w) => !cards[w.id]) || contextWords[0];
    }
  }

  const lastWordUrl = lastWord
    ? buildWordStudyUrl(lastWord.id, {
        level: lastEntry?.studyModeLevel || effectiveModeLevel,
        category:
          lastEntry?.categoryLocked && lastEntry.categoryId && lastEntry.categoryId !== 'all'
            ? lastEntry.categoryId
            : undefined,
        phaseId: lastEntry?.phaseId || activePhase?.id || undefined,
      })
    : null;

  const nextWordUrl = nextWord
    ? buildWordStudyUrl(nextWord.id, {
        level: effectiveModeLevel,
        category: effectiveCategory,
        phaseId: activePhase?.id || undefined,
      })
    : null;

  return {
    lastEntry,
    lastWord,
    nextWord,
    activePhase,
    effectiveModeLevel,
    effectiveCategory,
    isLearningPathContext: Boolean(activePhase),
    contextWordsCount: contextWords.length,
    learnedInContext,
    currentPosition,
    lastWordUrl,
    nextWordUrl,
  };
}

/**
 * Formats an ISO timestamp as a concise Vietnamese relative time label.
 */
export function formatRelativeTimeVi(iso?: string, nowMs = Date.now()): string {
  const ts = toTimestamp(iso);
  if (!ts) return 'Gần đây';
  const diffSec = Math.max(0, Math.floor((nowMs - ts) / 1000));
  if (diffSec < 60) return 'Vừa xong';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} phút trước`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours} giờ trước`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'Hôm qua';
  if (diffDays < 7) return `${diffDays} ngày trước`;
  return new Date(ts).toLocaleDateString('vi-VN');
}
