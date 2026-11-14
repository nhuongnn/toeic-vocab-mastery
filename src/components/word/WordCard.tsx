'use client';

import React from 'react';
import Link from 'next/link';
import { Volume2, Bookmark, CheckCircle2 } from 'lucide-react';
import { VocabularyWord } from '@/types/vocabulary';
import { useProgress } from '@/contexts/ProgressContext';
import { useSpeech } from '@/hooks/useSpeech';

interface WordCardProps {
  word: VocabularyWord;
}

export function WordCard({ word }: WordCardProps) {
  const { toggleBookmark, isBookmarked, getCard } = useProgress();
  const { speak } = useSpeech();

  const bookmarked = isBookmarked(word.id);
  const cardData = getCard(word.id);
  const isMastered = cardData && cardData.interval >= 14;

  return (
    <div className="group relative rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-indigo-500/50 p-5 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 flex flex-col justify-between">
      <div>
        {/* Top bar with category and bookmark */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">
              {word.partOfSpeech[0]}
            </span>
            {isMastered && (
              <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="w-3 h-3" />
                <span>Mastered</span>
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleBookmark(word.id);
            }}
            className="text-slate-500 hover:text-amber-400 p-1 transition-colors"
            title="Bookmark word"
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>
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
