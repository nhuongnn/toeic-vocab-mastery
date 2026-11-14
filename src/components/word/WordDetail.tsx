'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CheckCircle,
  Share2,
  Sparkles,
  Zap,
} from 'lucide-react';
import { VocabularyWord } from '@/types/vocabulary';
import { useProgress } from '@/contexts/ProgressContext';
import { PronunciationPlayer } from './PronunciationPlayer';
import { EtymologySection } from './EtymologySection';
import { NativeMindset } from './NativeMindset';
import { SentenceExamples } from './SentenceExamples';
import { VisualAssociation } from './VisualAssociation';
import { WordFamilySection } from './WordFamilySection';
import { ToeicTipsSection } from './ToeicTipsSection';
import { VideoSection } from './VideoSection';

interface WordDetailProps {
  word: VocabularyWord;
  previousWordId?: string;
  nextWordId?: string;
}

export function WordDetail({ word, previousWordId, nextWordId }: WordDetailProps) {
  const { recordReview, toggleBookmark, isBookmarked, getCard } = useProgress();
  const [ratedQuality, setRatedQuality] = useState<number | null>(null);

  const bookmarked = isBookmarked(word.id);
  const currentCard = getCard(word.id);

  const handleRate = (quality: number) => {
    recordReview(word.id, quality);
    setRatedQuality(quality);
    setTimeout(() => setRatedQuality(null), 3000);
  };

  return (
    <article className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/categories"
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Categories</span>
        </Link>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleBookmark(word.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              bookmarked
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-amber-400' : ''}`} />
            <span>{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <header className="rounded-3xl bg-gradient-to-br from-indigo-950/60 via-slate-900/90 to-purple-950/40 border border-slate-800 p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {word.category.replace('-', ' ')}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-400">
                {word.level}
              </span>
              {currentCard && currentCard.repetitions > 0 && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>SRS Streak: {currentCard.repetitions}</span>
                </span>
              )}
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
              {word.word}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              {word.deepMeaning.coreConcept}
            </p>
          </div>

          {/* Quick parts of speech tag */}
          <div className="flex flex-wrap gap-1.5 self-start md:self-end">
            {word.partOfSpeech.map((pos) => (
              <span
                key={pos}
                className="px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-700/80 text-xs font-mono font-bold text-indigo-300"
              >
                {pos}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* 1. Pronunciation Player */}
      <PronunciationPlayer
        word={word.word}
        ipa={word.pronunciation.ipa}
        syllables={word.pronunciation.syllableBreakdown}
        stressPattern={word.pronunciation.stressPattern}
        commonMistakes={word.pronunciation.commonMistakes}
        audioUrl={word.pronunciation.audioUrl}
      />

      {/* 2. Etymology & Origins */}
      <EtymologySection etymology={word.etymology} />

      {/* 3. Native Speaker Mindset & Perception */}
      <NativeMindset nativeMindset={word.nativeMindset} deepMeaning={word.deepMeaning} />

      {/* 4. Visual Anchor */}
      <VisualAssociation visual={word.visual} word={word.word} wordId={word.id} />

      {/* 5. Real-World Sentences */}
      <SentenceExamples examples={word.examples} word={word.word} />

      {/* 6. Word Family & Forms (Part 5) */}
      <WordFamilySection
        wordFamily={word.wordFamily}
        synonyms={word.synonyms}
        antonyms={word.antonyms}
        currentWord={word.word}
      />

      {/* 7. TOEIC Intelligence Tips */}
      <ToeicTipsSection toeicContext={word.toeicContext} frequency={word.toeicFrequency} />

      {/* 8. Video & Multimedia Immersion */}
      <VideoSection key={word.id} video={word.video} word={word.word} category={word.category} />

      {/* SRS Recall Self-Check Bar */}
      <section className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400">
            <Zap className="w-5 h-5" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100">
              Spaced Repetition Memory Rating
            </h3>
          </div>
          {ratedQuality !== null && (
            <span className="text-xs text-emerald-400 font-semibold animate-pulse">
              ✓ Review logged in SRS engine!
            </span>
          )}
        </div>
        <p className="text-xs text-slate-400">
          How confident are you using this word naturally? Rate your active recall to schedule the next optimal review interval:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => handleRate(1)}
            className="p-3 rounded-xl bg-slate-950 border border-rose-500/30 hover:border-rose-500 hover:bg-rose-950/20 text-rose-300 text-xs font-semibold transition-all text-center"
          >
            <div className="text-sm font-bold block mb-0.5">Again</div>
            <div className="text-[10px] text-slate-400">1 day review</div>
          </button>
          <button
            onClick={() => handleRate(3)}
            className="p-3 rounded-xl bg-slate-950 border border-amber-500/30 hover:border-amber-500 hover:bg-amber-950/20 text-amber-300 text-xs font-semibold transition-all text-center"
          >
            <div className="text-sm font-bold block mb-0.5">Hard</div>
            <div className="text-[10px] text-slate-400">Recalled with effort</div>
          </button>
          <button
            onClick={() => handleRate(4)}
            className="p-3 rounded-xl bg-slate-950 border border-indigo-500/30 hover:border-indigo-500 hover:bg-indigo-950/20 text-indigo-300 text-xs font-semibold transition-all text-center"
          >
            <div className="text-sm font-bold block mb-0.5">Good</div>
            <div className="text-[10px] text-slate-400">Hesitated slightly</div>
          </button>
          <button
            onClick={() => handleRate(5)}
            className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-950/20 text-emerald-300 text-xs font-semibold transition-all text-center"
          >
            <div className="text-sm font-bold block mb-0.5">Easy</div>
            <div className="text-[10px] text-slate-400">Instant recall</div>
          </button>
        </div>
      </section>

      {/* Prev / Next Footer Controls */}
      <footer className="flex items-center justify-between pt-6 border-t border-slate-800">
        {previousWordId ? (
          <Link
            href={`/word/${previousWordId}`}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Word</span>
          </Link>
        ) : (
          <div />
        )}

        {nextWordId ? (
          <Link
            href={`/word/${nextWordId}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30"
          >
            <span>Next Word</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <div />
        )}
      </footer>
    </article>
  );
}
