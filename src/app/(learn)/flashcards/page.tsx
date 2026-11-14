'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Layers, ArrowLeft } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { FlashcardDeck } from '@/components/flashcard/FlashcardDeck';
import { allVocabularyWords, wordsById } from '@/data/vocabulary';
import { categories } from '@/data/categories';
import { CategoryId } from '@/types/vocabulary';

export default function FlashcardsPage() {
  const { dueWordIds } = useProgress();
  const [deckFilter, setDeckFilter] = useState<'due' | CategoryId | 'all'>('due');

  // Determine which words to present in the deck
  let deckWords = allVocabularyWords;

  if (deckFilter === 'due') {
    const dueList = dueWordIds.map((id) => wordsById[id]).filter(Boolean);
    deckWords = dueList.length > 0 ? dueList : allVocabularyWords.slice(0, 10);
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
            onChange={(e) => setDeckFilter(e.target.value as any)}
            className="bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
          >
            <option value="due">Due For Review ({dueWordIds.length})</option>
            <option value="all">All Words ({allVocabularyWords.length})</option>
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
