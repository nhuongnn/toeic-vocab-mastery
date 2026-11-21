'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Volume2,
  RotateCw,
  Sparkles,
  ArrowRight,
  Brain,
  History,
  CheckCircle2,
  Trophy,
} from 'lucide-react';
import { VocabularyWord } from '@/types/vocabulary';
import { useProgress } from '@/contexts/ProgressContext';
import { useSpeech } from '@/hooks/useSpeech';
import { useSwipe } from '@/lib/gestures/useSwipe';
import { DictionaryLinks } from '@/components/word/DictionaryLinks';

interface FlashcardDeckProps {
  words: VocabularyWord[];
}

export function FlashcardDeck({ words }: FlashcardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completed, setCompleted] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { recordReview } = useProgress();
  const { speak } = useSpeech();

  const currentWord = words[currentIndex];

  useEffect(() => {
    setIsFlipped(false);
  }, [currentIndex]);

  const handleRate = (quality: number) => {
    if (!currentWord) return;
    recordReview(currentWord.id, quality);

    if (currentIndex + 1 < words.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  // Touch Swipe gestures
  useSwipe(cardRef, {
    onSwipeLeft: () => setIsFlipped((f) => !f),
    onSwipeRight: () => setIsFlipped((f) => !f),
    onSwipeUp: () => {
      if (isFlipped) handleRate(5);
    },
    onSwipeDown: () => {
      if (isFlipped) handleRate(1);
    },
    threshold: 40,
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (completed) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((f) => !f);
      } else if (isFlipped) {
        if (e.key === '1') handleRate(1);
        if (e.key === '2') handleRate(3);
        if (e.key === '3') handleRate(4);
        if (e.key === '4') handleRate(5);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, completed, currentIndex]);

  if (words.length === 0) {
    return (
      <div className="text-center py-20 px-4 max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto mb-4 border border-indigo-500/20">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Review Queue Is Clean!</h2>
        <p className="text-sm text-slate-400 mb-6">
          You have completed all pending spaced repetition flashcards for today. Browse words to add more to your queue.
        </p>
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all"
        >
          <span>Explore Categories</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="text-center py-20 px-4 max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-6 animate-bounce">
          <Trophy className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black text-white mb-2">Session Complete!</h2>
        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          You reviewed <strong className="text-indigo-400">{words.length}</strong> words with SM-2 Spaced Repetition. Your daily streak has been refreshed.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              setCurrentIndex(0);
              setCompleted(false);
              setIsFlipped(false);
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-sm font-bold hover:bg-slate-800 transition-colors"
          >
            Review Again
          </button>
          <Link
            href="/quiz"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-colors text-center"
          >
            Take Practice Quiz
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* Progress Counter */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
        <span>
          Card {currentIndex + 1} of {words.length}
        </span>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-slate-500">Hint: Phím Space để lật, 1-4 để chấm điểm</span>
          <span className="sm:hidden text-slate-500">Vuốt ngang để lật thẻ</span>
          <div className="w-24 sm:w-32 h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Flip Card Container */}
      <div
        ref={cardRef}
        onClick={() => setIsFlipped(!isFlipped)}
        className="cursor-pointer min-h-[380px] rounded-3xl bg-slate-900/90 border-2 border-slate-800 hover:border-indigo-500/50 p-8 flex flex-col justify-between transition-all duration-300 shadow-2xl relative overflow-hidden group select-none touch-pan-y"
      >
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-400 px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-800 flex items-center gap-1">
            <RotateCw className="w-3 h-3 text-indigo-400 group-hover:rotate-180 transition-transform duration-500" />
            <span>Click to flip</span>
          </span>
        </div>

        {!isFlipped ? (
          /* FRONT SIDE */
          <div className="my-auto text-center space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              {currentWord.category.replace('-', ' ')}
            </span>

            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
              {currentWord.word}
            </h2>

            <div className="flex items-center justify-center gap-3">
              <span className="font-mono text-xl text-slate-400">
                {currentWord.pronunciation.ipa}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speak(currentWord.word);
                }}
                className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-indigo-400 hover:bg-slate-700 transition-colors"
                title="Pronounce"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Stress pattern: <strong className="text-indigo-400">{currentWord.pronunciation.stressPattern}</strong> • {currentWord.pronunciation.syllableBreakdown}
            </p>
          </div>
        ) : (
          /* BACK SIDE */
          <div className="space-y-4 my-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-2xl font-black text-indigo-400 uppercase">
                  {currentWord.word}
                </h3>
                <span className="text-xs font-mono text-slate-400">{currentWord.partOfSpeech.join(', ')}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speak(currentWord.word);
                }}
                className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-indigo-400"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Core concept */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
              <div className="text-[11px] font-bold uppercase tracking-wider text-purple-400 mb-1 flex items-center gap-1">
                <Brain className="w-3.5 h-3.5" />
                <span>Deep Mindset Concept</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {currentWord.deepMeaning.coreConcept}
              </p>
            </div>

            {/* Etymology */}
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/60 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Root: </span>
              {currentWord.etymology.origin} "{currentWord.etymology.rootWord}" ({currentWord.etymology.rootMeaning})
            </div>

            {/* Business Example */}
            <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-900/30 text-xs text-indigo-200 italic">
              "{currentWord.examples.business[0]}"
            </div>

            {/* Dictionary Quick Links */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-800/60">
              <span className="text-[11px] text-slate-400">Tra từ điển chuyên sâu:</span>
              <DictionaryLinks word={currentWord.word} variant="buttons" />
            </div>
          </div>
        )}

        <div className="text-center text-[11px] text-slate-500 pt-4">
          Press Spacebar to flip card
        </div>
      </div>

      {/* SRS Rating Buttons (Show when flipped) */}
      {isFlipped && (
        <div className="space-y-2 animate-fadeIn">
          <div className="text-center text-xs font-semibold text-slate-400">
            Rate your recall difficulty:
          </div>
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => handleRate(1)}
              className="py-3 px-2 rounded-xl bg-rose-950/40 border border-rose-500/40 hover:bg-rose-900/60 text-rose-300 text-xs font-bold transition-all text-center flex flex-col items-center"
            >
              <span>Again (1)</span>
              <span className="text-[10px] text-slate-400 font-normal">1d</span>
            </button>
            <button
              onClick={() => handleRate(3)}
              className="py-3 px-2 rounded-xl bg-amber-950/40 border border-amber-500/40 hover:bg-amber-900/60 text-amber-300 text-xs font-bold transition-all text-center flex flex-col items-center"
            >
              <span>Hard (2)</span>
              <span className="text-[10px] text-slate-400 font-normal">Effort</span>
            </button>
            <button
              onClick={() => handleRate(4)}
              className="py-3 px-2 rounded-xl bg-indigo-950/40 border border-indigo-500/40 hover:bg-indigo-900/60 text-indigo-300 text-xs font-bold transition-all text-center flex flex-col items-center"
            >
              <span>Good (3)</span>
              <span className="text-[10px] text-slate-400 font-normal">Standard</span>
            </button>
            <button
              onClick={() => handleRate(5)}
              className="py-3 px-2 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:bg-emerald-900/60 text-emerald-300 text-xs font-bold transition-all text-center flex flex-col items-center"
            >
              <span>Easy (4)</span>
              <span className="text-[10px] text-slate-400 font-normal">Instant</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
