'use client';

import React from 'react';
import Link from 'next/link';
import { Volume2, Bookmark, CheckCircle2, TrendingUp, MessageCircle } from 'lucide-react';
import { VocabularyWord } from '@/types/vocabulary';
import { useProgress } from '@/contexts/ProgressContext';
import { useSpeech } from '@/hooks/useSpeech';
import {
  LEVEL_CONFIG,
  getWordPopularityScore,
  getDailyCommunicationScore,
  getWordPopularity,
  getDailyCommunicationFrequency,
} from '@/lib/vocabulary-helpers';
import { DictionaryLinks } from './DictionaryLinks';

interface WordCardProps {
  word: VocabularyWord;
}

export function WordCard({ word }: WordCardProps) {
  const { toggleBookmark, isBookmarked, getCard } = useProgress();
  const { speak } = useSpeech();

  const bookmarked = isBookmarked(word.id);
  const cardData = getCard(word.id);
  const isMastered = cardData && cardData.interval >= 14;

  const levelConfig = LEVEL_CONFIG[word.level] || LEVEL_CONFIG.intermediate;
  const popularityScore = getWordPopularityScore(word);
  const popularityPercent = getWordPopularity(word);
  const dailyScore = getDailyCommunicationScore(word);
  const dailyPercent = getDailyCommunicationFrequency(word);

  return (
    <div className="group relative rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-indigo-500/50 p-5 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 flex flex-col justify-between">
      <div>
        {/* Top bar with part of speech, level, mastered tag, and bookmark */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">
              {word.partOfSpeech[0]}
            </span>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${levelConfig.badgeClass}`}
              title={levelConfig.description}
            >
              {levelConfig.shortLabel}
            </span>
            {isMastered && (
              <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="w-3 h-3" />
                <span>Mastered</span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <DictionaryLinks word={word.word} variant="compact" />
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleBookmark(word.id);
              }}
              className="text-slate-500 hover:text-amber-400 p-1 transition-colors flex-shrink-0"
              title="Bookmark word"
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Word Title and IPA */}
        <div className="flex items-baseline justify-between gap-2 mb-2">
          <Link
            href={`/word/${word.id}`}
            className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight"
          >
            {word.word}
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              speak(word.word);
            }}
            className="text-slate-500 hover:text-indigo-400 transition-colors p-1"
            title="Pronounce"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        <div className="text-xs font-mono text-slate-400 mb-3">
          {word.pronunciation.ipa}
        </div>

        {/* Core Concept Brief */}
        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
          {word.deepMeaning.coreConcept}
        </p>

        {/* Frequency & Popularity Indicators */}
        <div className="flex items-center justify-between gap-2 py-2 px-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 mb-3 text-[11px]">
          <div
            className="flex items-center gap-1.5"
            title={`Độ phổ biến trong TOEIC: ${popularityScore}/10 (${popularityPercent}%)`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-400">TOEIC:</span>
            <span className="font-semibold text-indigo-300 font-mono">{popularityScore}/10</span>
          </div>
          <div className="w-[1px] h-3 bg-slate-800" />
          <div
            className="flex items-center gap-1.5"
            title={`Tần suất giao tiếp hàng ngày: ${dailyScore}/10 (${dailyPercent}%)`}
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">Giao tiếp:</span>
            <span className="font-semibold text-emerald-300 font-mono">{dailyScore}/10</span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
        <span className="truncate max-w-[150px]">
          Root: <strong className="text-slate-300">{word.etymology.rootWord}</strong>
        </span>
        <Link
          href={`/word/${word.id}`}
          className="text-indigo-400 font-semibold group-hover:underline flex items-center gap-1"
        >
          <span>Explore</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
