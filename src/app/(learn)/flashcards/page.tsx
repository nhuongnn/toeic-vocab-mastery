'use client';

import React, { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { FlashcardDeck } from '@/components/flashcard/FlashcardDeck';
import { allVocabularyWords, wordsById } from '@/data/vocabulary';
import { categories } from '@/data/categories';
import { CategoryId } from '@/types/vocabulary';
import { getWordsForLearningPhase, resolveActivePhase } from '@/lib/vocab-study';

type DeckFilter = 'due' | 'recent' | 'learning-path' | 'unlearned' | CategoryId | 'all';

function FlashcardsContent() {
  const searchParams = useSearchParams();
  const { dueWordIds, progress, recentVocabHistory, vocabStudyState } = useProgress();
  const { state: onboardingState } = useOnboarding();

  const modeParam = searchParams.get('mode');
  const phaseParam = searchParams.get('phase');

  const initialDeck: DeckFilter = useMemo(() => {
    if (modeParam === 'recent') return 'recent';
    if (modeParam === 'learning-path' || phaseParam) return 'learning-path';
    if (modeParam === 'unlearned') return 'unlearned';
    if (modeParam === 'all') return 'all';
    return 'due';
  }, [modeParam, phaseParam]);

  const [deckOverride, setDeckOverride] = useState<{
    base: DeckFilter;
    value: DeckFilter;
  } | null>(null);

  const deckFilter: DeckFilter =
    deckOverride && deckOverride.base === initialDeck ? deckOverride.value : initialDeck;

  const unlearnedWords = useMemo(() => {
    return allVocabularyWords.filter((w) => !progress.cards[w.id]);
  }, [progress.cards]);

  const recentWords = useMemo(() => {
    return recentVocabHistory
      .map((entry) => wordsById[entry.wordId])
      .filter(Boolean);
  }, [recentVocabHistory]);

  const activePhase = useMemo(
    () =>
      resolveActivePhase(
        onboardingState.learningPath,
        phaseParam || vocabStudyState?.activePhaseId
      ),
    [onboardingState.learningPath, phaseParam, vocabStudyState?.activePhaseId]
  );

  const learningPathWords = useMemo(() => {
    if (!activePhase) return [];
    return getWordsForLearningPhase(allVocabularyWords, activePhase);
  }, [activePhase]);

  // Determine which words to present in the deck
  let deckWords = allVocabularyWords;

  if (deckFilter === 'due') {
    const dueList = dueWordIds.map((id) => wordsById[id]).filter(Boolean);
    deckWords = dueList.length > 0 ? dueList : allVocabularyWords.slice(0, 10);
  } else if (deckFilter === 'recent') {
    deckWords = recentWords.length > 0 ? recentWords : allVocabularyWords.slice(0, 10);
  } else if (deckFilter === 'learning-path') {
    const unlearnedInPath = learningPathWords.filter((w) => !progress.cards[w.id]);
    deckWords =
      unlearnedInPath.length > 0
        ? unlearnedInPath
        : learningPathWords.length > 0
        ? learningPathWords
        : allVocabularyWords.slice(0, 10);
  } else if (deckFilter === 'unlearned') {
    deckWords = unlearnedWords.length > 0 ? unlearnedWords : allVocabularyWords.slice(0, 10);
  } else if (deckFilter !== 'all') {
    deckWords = allVocabularyWords.filter((w) => w.category === deckFilter);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Spaced Repetition Flashcards</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Active Memory Recall Deck
          </h1>
        </div>

        {/* Deck Filter Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold">Deck:</span>
          <select
            value={deckFilter}
            onChange={(e) =>
              setDeckOverride({
                base: initialDeck,
                value: e.target.value as DeckFilter,
              })
            }
            className="bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
          >
            <option value="due">Cần ôn tập ngay ({dueWordIds.length})</option>
            <option value="recent">Từ học gần nhất ({recentWords.length})</option>
            {activePhase && (
              <option value="learning-path">
                Theo lộ trình: {activePhase.title.split(':')[0]} ({learningPathWords.length})
              </option>
            )}
            <option value="unlearned">Học từ mới — Chưa học ({unlearnedWords.length})</option>
            <option value="all">Tất cả từ vựng ({allVocabularyWords.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Flashcard Component */}
      <FlashcardDeck words={deckWords} />
    </div>
  );
}

export default function FlashcardsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-96 rounded-3xl bg-slate-900/70 border border-slate-800 animate-pulse" />
        </div>
      }
    >
      <FlashcardsContent />
    </Suspense>
  );
}
