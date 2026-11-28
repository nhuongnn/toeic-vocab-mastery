import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  MAX_RECENT_VOCAB_HISTORY,
  upsertRecentVocabEntry,
  mergeRecentVocabHistory,
  mergeVocabStudyState,
  getWordsForLearningPhase,
  getPhaseProgress,
  filterRecentVocabEntries,
  getResumeRecommendation,
  buildWordStudyUrl,
} from '../vocab-study.ts';
import { mergeUserProgress } from '../sync.ts';

const sampleWords = [
  {
    id: 'w-office-1',
    word: 'agenda',
    partOfSpeech: ['noun'],
    category: 'office-admin',
    level: 'essential',
    toeicFrequency: 9,
    deepMeaning: { coreConcept: 'meeting plan' },
    pronunciation: { ipa: '/əˈdʒendə/' },
    etymology: { rootWord: 'agere' },
  },
  {
    id: 'w-office-2',
    word: 'memorandum',
    partOfSpeech: ['noun'],
    category: 'office-admin',
    level: 'essential',
    toeicFrequency: 8,
    deepMeaning: { coreConcept: 'internal note' },
    pronunciation: { ipa: '/ˌmeməˈrændəm/' },
    etymology: { rootWord: 'memor' },
  },
  {
    id: 'w-dining-1',
    word: 'beverage',
    partOfSpeech: ['noun'],
    category: 'dining',
    level: 'essential',
    toeicFrequency: 8,
    deepMeaning: { coreConcept: 'drink' },
    pronunciation: { ipa: '/ˈbevərɪdʒ/' },
    etymology: { rootWord: 'bibere' },
  },
  {
    id: 'w-finance-1',
    word: 'reimburse',
    partOfSpeech: ['verb'],
    category: 'finance',
    level: 'intermediate',
    toeicFrequency: 9,
    deepMeaning: { coreConcept: 'pay back expenses' },
    pronunciation: { ipa: '/ˌriːɪmˈbɜːrs/' },
    etymology: { rootWord: 'bursa' },
  },
  {
    id: 'w-legal-1',
    word: 'arbitration',
    partOfSpeech: ['noun'],
    category: 'legal',
    level: 'advanced',
    toeicFrequency: 7,
    deepMeaning: { coreConcept: 'dispute settlement' },
    pronunciation: { ipa: '/ˌɑːrbɪˈtreɪʃən/' },
    etymology: { rootWord: 'arbitrari' },
  },
];

const sampleWordsById = Object.fromEntries(sampleWords.map((w) => [w.id, w]));

const sampleLearningPath = {
  targetScore: 650,
  currentLevel: 'essential',
  dailyGoal: 20,
  estimatedCompletionDate: '2027-01-01',
  recommendedCategory: 'office-admin',
  phases: [
    {
      id: 'phase-1-foundation',
      title: 'Giai đoạn 1: Nền tảng',
      description: 'Core workplace words',
      categoryIds: ['office-admin', 'dining'],
      wordLevel: 'essential',
      targetWords: 600,
      estimatedDays: 40,
      milestones: [],
    },
    {
      id: 'phase-2-target',
      title: 'Giai đoạn 2: Tăng tốc',
      description: 'Intermediate business words',
      categoryIds: ['finance'],
      wordLevel: 'intermediate',
      targetWords: 1000,
      estimatedDays: 60,
      milestones: [],
    },
  ],
};

describe('Recent Vocabulary History, Learning Path Resume & Cross-Device Sync', () => {
  it('deduplicates, orders newest-first, and caps recent history at MAX_RECENT_VOCAB_HISTORY', () => {
    let history = [];
    for (let i = 0; i < MAX_RECENT_VOCAB_HISTORY + 10; i++) {
      history = upsertRecentVocabEntry(history, {
        wordId: `word-${i}`,
        viewedAt: new Date(1700000000000 + i * 1000).toISOString(),
        studyModeLevel: 'essential',
      });
    }

    assert.strictEqual(history.length, MAX_RECENT_VOCAB_HISTORY);
    assert.strictEqual(history[0].wordId, `word-${MAX_RECENT_VOCAB_HISTORY + 9}`);

    // Upserting an older timestamp for the newest word must NOT overwrite the newer timestamp
    const olderUpdate = upsertRecentVocabEntry(history, {
      wordId: `word-${MAX_RECENT_VOCAB_HISTORY + 9}`,
      viewedAt: new Date(1600000000000).toISOString(),
      studyModeLevel: 'advanced',
    });
    assert.strictEqual(olderUpdate[0].studyModeLevel, 'essential');
  });

  it('merges recentVocabHistory and vocabStudyState across devices in mergeUserProgress', () => {
    const local = {
      version: 1,
      cards: {},
      stats: {},
      history: [],
      preferences: {},
      bookmarkedWordIds: [],
      recentVocabHistory: [
        {
          wordId: 'w-office-1',
          viewedAt: '2026-11-28T10:00:00.000Z',
          studyModeLevel: 'essential',
          source: 'word-detail',
        },
        {
          wordId: 'w-dining-1',
          viewedAt: '2026-11-28T09:00:00.000Z',
          studyModeLevel: 'essential',
          source: 'word-detail',
        },
      ],
      vocabStudyState: {
        lastWordId: 'w-office-1',
        lastStudiedAt: '2026-11-28T10:00:00.000Z',
        studyModeLevel: 'essential',
        updatedAt: '2026-11-28T10:00:00.000Z',
      },
    };

    const remote = {
      version: 1,
      cards: {},
      stats: {},
      history: [],
      preferences: {},
      bookmarkedWordIds: [],
      recentVocabHistory: [
        {
          wordId: 'w-finance-1',
          viewedAt: '2026-11-28T11:30:00.000Z',
          studyModeLevel: 'intermediate',
          phaseId: 'phase-2-target',
          source: 'learning-path',
        },
        {
          wordId: 'w-office-1',
          viewedAt: '2026-11-28T08:00:00.000Z', // older than local
          studyModeLevel: 'all',
          source: 'flashcard',
        },
      ],
      vocabStudyState: {
        lastWordId: 'w-finance-1',
        lastStudiedAt: '2026-11-28T11:30:00.000Z',
        studyModeLevel: 'intermediate',
        activePhaseId: 'phase-2-target',
        updatedAt: '2026-11-28T11:30:00.000Z',
      },
    };

    const merged = mergeUserProgress(local, remote);
    assert.strictEqual(merged.recentVocabHistory.length, 3);
    assert.strictEqual(merged.recentVocabHistory[0].wordId, 'w-finance-1');
    assert.strictEqual(merged.recentVocabHistory[1].wordId, 'w-office-1');
    assert.strictEqual(merged.recentVocabHistory[1].viewedAt, '2026-11-28T10:00:00.000Z');
    assert.strictEqual(merged.recentVocabHistory[2].wordId, 'w-dining-1');

    assert.strictEqual(merged.vocabStudyState.lastWordId, 'w-finance-1');
    assert.strictEqual(merged.vocabStudyState.studyModeLevel, 'intermediate');
    assert.strictEqual(merged.vocabStudyState.activePhaseId, 'phase-2-target');
  });

  it('preserves fallback lastWordId when a newer device only changes study mode', () => {
    const mergedState = mergeVocabStudyState(
      {
        lastWordId: 'w-office-2',
        lastStudiedAt: '2026-11-28T09:00:00.000Z',
        studyModeLevel: 'essential',
        updatedAt: '2026-11-28T09:00:00.000Z',
      },
      {
        studyModeLevel: 'advanced',
        updatedAt: '2026-11-28T10:00:00.000Z',
      }
    );

    assert.strictEqual(mergedState.studyModeLevel, 'advanced');
    assert.strictEqual(mergedState.lastWordId, 'w-office-2');
  });

  it('filters recent vocabulary by study mode and by learning path phases', () => {
    const recent = [
      { wordId: 'w-office-1', viewedAt: '2026-11-28T10:00:00.000Z', studyModeLevel: 'essential' },
      { wordId: 'w-dining-1', viewedAt: '2026-11-28T09:30:00.000Z', studyModeLevel: 'essential' },
      { wordId: 'w-finance-1', viewedAt: '2026-11-28T09:00:00.000Z', studyModeLevel: 'intermediate' },
      { wordId: 'w-legal-1', viewedAt: '2026-11-28T08:00:00.000Z', studyModeLevel: 'advanced' },
    ];

    const byEssential = filterRecentVocabEntries(recent, sampleWordsById, 'study-mode', {
      studyModeLevel: 'essential',
    });
    assert.deepStrictEqual(
      byEssential.map((e) => e.wordId),
      ['w-office-1', 'w-dining-1']
    );

    const byCategoryLock = filterRecentVocabEntries(recent, sampleWordsById, 'study-mode', {
      studyModeLevel: 'essential',
      categoryLocked: true,
      lockedCategoryId: 'dining',
    });
    assert.deepStrictEqual(
      byCategoryLock.map((e) => e.wordId),
      ['w-dining-1']
    );

    const byAllPhases = filterRecentVocabEntries(recent, sampleWordsById, 'learning-path', {
      learningPath: sampleLearningPath,
      phaseId: 'all',
    });
    assert.deepStrictEqual(
      byAllPhases.map((e) => e.wordId),
      ['w-office-1', 'w-dining-1', 'w-finance-1']
    );

    const byPhase1 = filterRecentVocabEntries(recent, sampleWordsById, 'learning-path', {
      learningPath: sampleLearningPath,
      phaseId: 'phase-1-foundation',
    });
    assert.deepStrictEqual(
      byPhase1.map((e) => e.wordId),
      ['w-office-1', 'w-dining-1']
    );
  });

  it('computes phase progress and recommends the next unlearned word along the learning path', () => {
    const cards = {
      'w-office-1': { wordId: 'w-office-1', repetitions: 1, interval: 1, easinessFactor: 2.5, nextReview: '2026-11-29T00:00:00.000Z' },
      'w-office-2': { wordId: 'w-office-2', repetitions: 5, interval: 21, easinessFactor: 2.6, nextReview: '2026-12-19T00:00:00.000Z' },
    };

    const phase1Words = getWordsForLearningPhase(sampleWords, sampleLearningPath.phases[0]);
    assert.strictEqual(phase1Words.length, 3);

    const progress = getPhaseProgress(sampleWords, sampleLearningPath.phases[0], cards);
    assert.strictEqual(progress.totalWords, 3);
    assert.strictEqual(progress.learnedCount, 2);
    assert.strictEqual(progress.masteredCount, 1);
    assert.strictEqual(progress.percentage, 67);

    const resume = getResumeRecommendation({
      words: sampleWords,
      wordsById: sampleWordsById,
      cards,
      recentHistory: [
        {
          wordId: 'w-office-1',
          viewedAt: '2026-11-28T10:00:00.000Z',
          studyModeLevel: 'essential',
          phaseId: 'phase-1-foundation',
        },
      ],
      studyState: {
        lastWordId: 'w-office-1',
        lastStudiedAt: '2026-11-28T10:00:00.000Z',
        studyModeLevel: 'essential',
        activePhaseId: 'phase-1-foundation',
        updatedAt: '2026-11-28T10:00:00.000Z',
      },
      learningPath: sampleLearningPath,
    });

    assert.strictEqual(resume.lastWord?.id, 'w-office-1');
    // w-office-2 is already learned, so next unlearned in phase 1 is w-dining-1!
    assert.strictEqual(resume.nextWord?.id, 'w-dining-1');
    assert.strictEqual(resume.currentPosition, 1);
    assert.strictEqual(resume.contextWordsCount, 3);
    assert.strictEqual(
      resume.nextWordUrl,
      buildWordStudyUrl('w-dining-1', { level: 'essential', phaseId: 'phase-1-foundation' })
    );
  });
});
