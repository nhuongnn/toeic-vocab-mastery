'use client';

import React from 'react';
import Link from 'next/link';
import {
  Trophy,
  Flame,
  CheckCircle2,
  Clock,
  Bookmark,
  Zap,
  Target,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { allVocabularyWords, wordsById } from '@/data/vocabulary';

export default function ProgressDashboardPage() {
  const { progress, dueCount } = useProgress();

  const cardsList = Object.values(progress.cards);
  const masteredCards = cardsList.filter((c) => c.interval >= 14);
  const reviewingCards = cardsList.filter((c) => c.interval > 1 && c.interval < 14);
  const learningCards = cardsList.filter((c) => c.interval <= 1);

  const bookmarkedWords = progress.bookmarkedWordIds
    .map((id) => wordsById[id])
    .filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Trophy className="w-3.5 h-3.5 text-indigo-400" />
          <span>Performance Analytics</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Learning Progress & Target Velocity
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Track your progress toward 700+ TOEIC mastery powered by quantitative spaced repetition analytics.
        </p>
      </div>

      {/* Target Meter Card */}
      <section className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/70 to-purple-950/50 border border-slate-800 p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-1">
              Estimated TOEIC English Proficiency
            </span>
            <div className="text-4xl sm:text-5xl font-black text-white">
              {progress.stats.estimatedToeicScore}{' '}
              <span className="text-lg font-bold text-slate-400 font-normal">/ 990</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold flex items-center gap-1.5">
              <Target className="w-4 h-4" />
              <span>Target: 700+ TOEIC</span>
            </span>
          </div>
        </div>

        {/* Progress Bar towards 700 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Baseline (400)</span>
            <span className="text-indigo-400 font-bold">Goal (700)</span>
            <span>Mastery (990)</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-950 border border-slate-800 overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500"
              style={{
                width: `${Math.min(
                  100,
                  Math.max(0, ((progress.stats.estimatedToeicScore - 400) / (700 - 400)) * 100)
                )}%`,
              }}
            />
          </div>
        </div>
      </section>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Total Explored</span>
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-black text-white">
            {progress.stats.totalWordsLearned}
          </div>
          <div className="text-[11px] text-slate-500">
            Across {allVocabularyWords.length} available vocabulary
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Daily Streak</span>
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400">
            {progress.stats.currentStreak} Days
          </div>
          <div className="text-[11px] text-slate-500">
            Longest recorded: {progress.stats.longestStreak} days
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Mastered (14d+ Interval)</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400">
            {masteredCards.length}
          </div>
          <div className="text-[11px] text-slate-500">
            Stored in permanent long-term memory
          </div>
        </div>

        <Link
          href="/review"
          className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-pink-500/50 space-y-2 transition-all block group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Due for Review</span>
            <Zap className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-black text-pink-400">
            {dueCount}
          </div>
          <div className="text-[11px] text-pink-400/80 font-semibold flex items-center gap-1">
            <span>Open Review Queue</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </Link>
      </div>

      {/* Bookmarked Words Table */}
      {bookmarkedWords.length > 0 && (
        <section className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center gap-2 text-amber-400">
            <Bookmark className="w-5 h-5 fill-amber-400" />
            <h2 className="text-base font-bold uppercase tracking-wider text-white">
              Bookmarked Vocabulary Focus List ({bookmarkedWords.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {bookmarkedWords.map((word) => (
              <Link
                key={word.id}
                href={`/word/${word.id}`}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-white uppercase text-sm">{word.word}</div>
                  <div className="text-xs text-slate-400 font-mono">{word.pronunciation.ipa}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Recent Exercise History */}
      {progress.history.length > 0 && (
        <section className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 space-y-4">
          <h2 className="text-base font-bold uppercase tracking-wider text-white">
            Recent Practice Sessions
          </h2>
          <div className="space-y-2">
            {progress.history.slice(0, 5).map((session, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-indigo-300">
                    {session.type}
                  </span>
                  <span className="text-slate-400">
                    {new Date(session.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="font-semibold text-slate-200">
                  {session.correctAnswers} / {session.totalQuestions} ({session.scorePercentage}%)
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
