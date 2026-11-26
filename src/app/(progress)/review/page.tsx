'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Clock,
  Zap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowLeft,
  Flame,
  Award,
  Brain,
} from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { allVocabularyWords, wordsById } from '@/data/vocabulary';
import { SRSCard } from '@/types/progress';
import { getWordMindMapUrl } from '@/lib/vocabulary-helpers';

export default function ReviewQueuePage() {
  const { progress, dueCount, dueWordIds } = useProgress();
  const [activeTab, setActiveTab] = useState<'due' | 'all' | 'mature'>('due');
  const [mountedTime, setMountedTime] = useState<number>(0);

  useEffect(() => {
    setMountedTime(Date.now());
  }, []);

  const srsCards = progress.cards;
  const now = mountedTime > 0 ? new Date(mountedTime) : new Date(0);

  // Categorize cards
  const allCardsList = Object.values(srsCards).map((card: SRSCard) => {
    const word = wordsById[card.wordId] || {
      id: card.wordId,
      word: card.wordId,
      pronunciation: { ipa: '' },
      category: 'office-admin',
      deepMeaning: { coreConcept: 'Active vocabulary card' },
    };
    const nextDate = new Date(card.nextReview);
    const isDue = nextDate <= now;
    const diffHours = Math.round((nextDate.getTime() - now.getTime()) / (1000 * 60 * 60));

    return {
      ...card,
      wordObj: word,
      isDue,
      diffHours,
    };
  });

  const dueList = allCardsList.filter((c) => c.isDue);
  const matureList = allCardsList.filter((c) => c.repetitions >= 4);

  const displayList =
    activeTab === 'due' ? dueList : activeTab === 'mature' ? matureList : allCardsList;

  // Calculate average EF
  const avgEF =
    allCardsList.length > 0
      ? (
          allCardsList.reduce((acc, c) => acc + c.easinessFactor, 0) /
          allCardsList.length
        ).toFixed(2)
      : '2.50';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Learning Dashboard</span>
          </Link>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Spaced Repetition Review Queue
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            SuperMemo 2 (SM-2) memory schedule optimized for long-term workplace retention.
          </p>
        </div>

        <Link
          href="/flashcards"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-pink-500/25 flex-shrink-0"
        >
          <Zap className="w-4 h-4" />
          <span>Launch Flashcard Review</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs font-semibold text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-4 h-4" />
            <span>Cards Due Now</span>
          </div>
          <div className="text-3xl font-black text-white">{dueList.length}</div>
          <div className="text-[11px] text-slate-400">Ready for instant recall check</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>Active Memory Cards</span>
          </div>
          <div className="text-3xl font-black text-white">{allCardsList.length}</div>
          <div className="text-[11px] text-slate-400">Scheduled in SM-2 engine</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            <span>Mature (4+ Streaks)</span>
          </div>
          <div className="text-3xl font-black text-white">{matureList.length}</div>
          <div className="text-[11px] text-slate-400">Firmly internalized concepts</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Flame className="w-4 h-4" />
            <span>Avg Easiness Factor</span>
          </div>
          <div className="text-3xl font-black text-white">{avgEF}</div>
          <div className="text-[11px] text-slate-400">Baseline 2.50 difficulty</div>
        </div>
      </div>

      {/* Tabs Filter */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('due')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'due'
              ? 'bg-pink-600/20 text-pink-300 border border-pink-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Due Now ({dueList.length})
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'all'
              ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          All Active Cards ({allCardsList.length})
        </button>
        <button
          onClick={() => setActiveTab('mature')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'mature'
              ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Mature Lexicon ({matureList.length})
        </button>
      </div>

      {/* Card Queue Display */}
      {displayList.length === 0 ? (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">All Caught Up!</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            No words due in this view right now. You have reviewed all scheduled items. Keep your momentum going by exploring a new category or challenging yourself in the practice drills.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/categories"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
            >
              Browse Categories
            </Link>
            <Link
              href="/quiz"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors"
            >
              Practice Drills
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayList.map((card) => {
            const word = card.wordObj;
            return (
              <div
                key={card.wordId}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md bg-slate-800 text-indigo-400">
                      {word.category}
                    </span>
                    {card.isDue ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30">
                        Due Now
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400">
                        in {Math.max(1, Math.round(card.diffHours / 24))}d
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-black text-white uppercase tracking-tight">
                    {word.word}
                  </h3>
                  <div className="text-xs font-mono text-slate-500 mb-2">
                    {word.pronunciation?.ipa}
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {word.deepMeaning?.coreConcept}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 space-y-3">
                  <div className="grid grid-cols-3 text-center text-[10px] bg-slate-950/60 p-2 rounded-xl border border-slate-800/50">
                    <div>
                      <div className="text-slate-400">Repetitions</div>
                      <div className="font-bold text-white text-xs mt-0.5">
                        {card.repetitions}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400">Interval</div>
                      <div className="font-bold text-white text-xs mt-0.5">
                        {card.interval}d
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400">Easiness</div>
                      <div className="font-bold text-indigo-400 text-xs mt-0.5">
                        {card.easinessFactor.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/word/${word.id}`}
                      className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Inspect Deep Meaning</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    {wordsById[card.wordId] && (
                      <Link
                        href={getWordMindMapUrl(word.id, '/review')}
                        className="px-3 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:text-purple-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                        title={`Xem Vocabulary Mind Map của "${word.word}"`}
                      >
                        <Brain className="w-3.5 h-3.5 text-purple-400" />
                        <span>Mind Map</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
