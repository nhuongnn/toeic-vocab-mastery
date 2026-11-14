'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, RotateCcw, Lightbulb, Trophy, CheckCircle2 } from 'lucide-react';
import { VocabularyWord } from '@/types/vocabulary';
import { useProgress } from '@/contexts/ProgressContext';
import { getRandomWords } from '@/data/vocabulary';

export function FillBlankExercise() {
  const { recordReview, recordExerciseSession } = useProgress();

  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  React.useEffect(() => {
    setWords(getRandomWords(5));
  }, []);

  if (words.length === 0) {
    return <div className="text-center py-12 text-slate-500 text-sm">Loading active recall cards...</div>;
  }

  const currentWord = words[currentIndex];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitted || !inputVal.trim()) return;

    const correct = inputVal.trim().toLowerCase() === currentWord.word.toLowerCase();
    setIsCorrect(correct);
    setSubmitted(true);

    if (correct) {
      setScore((s) => s + 1);
      recordReview(currentWord.id, 5);
    } else {
      recordReview(currentWord.id, 2);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < words.length) {
      setCurrentIndex((i) => i + 1);
      setInputVal('');
      setShowHint(false);
      setSubmitted(false);
      setIsCorrect(false);
    } else {
      setIsFinished(true);
      recordExerciseSession({
        date: new Date().toISOString(),
        type: 'fill-blank',
        totalQuestions: words.length,
        correctAnswers: score + (isCorrect ? 1 : 0),
        scorePercentage: Math.round(((score + (isCorrect ? 1 : 0)) / words.length) * 100),
        wordsPracticed: words.map((w) => w.id),
      });
    }
  };

  const restart = () => {
    setWords(getRandomWords(5));
    setCurrentIndex(0);
    setInputVal('');
    setShowHint(false);
    setSubmitted(false);
    setIsCorrect(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="text-center py-16 px-4 max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6">
          <Trophy className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black text-white mb-2">Recall Drill Completed!</h2>
        <div className="text-5xl font-black text-emerald-400 my-4">
          {Math.round((score / words.length) * 100)}%
        </div>
        <p className="text-sm text-slate-300 mb-6">
          You recalled {score} of {words.length} words correctly through active memory retrieval.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={restart}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-sm font-bold hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Practice Another Set</span>
          </button>
          <Link
            href="/categories"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-colors"
          >
            <span>Back to Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const promptSentence = (currentWord.examples.business[0] || currentWord.examples.daily[0]).replace(
    new RegExp(`\\b${currentWord.word}[a-z]*\\b`, 'gi'),
    '____________'
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
        <span>Word {currentIndex + 1} of {words.length}</span>
        <div className="flex items-center gap-2">
          <span>Score: <strong className="text-emerald-400">{score}</strong></span>
          <div className="w-24 h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            Active Recall Challenge
          </span>
          <p className="text-lg sm:text-xl font-medium text-slate-100 leading-relaxed font-mono">
            {promptSentence}
          </p>
        </div>

        {/* Clue/Concept box */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 space-y-1">
          <span className="font-bold text-slate-400 uppercase tracking-wider block">
            Concept Clue:
          </span>
          <p>{currentWord.deepMeaning.coreConcept}</p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              autoFocus
              disabled={submitted}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type the exact English word..."
              className="flex-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-base text-white placeholder:text-slate-600 font-mono transition-colors"
            />
            {!submitted ? (
              <button
                type="submit"
                disabled={!inputVal.trim()}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-sm font-bold transition-all shadow-md"
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-all flex items-center gap-1.5"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>

        {/* Hint button */}
        {!submitted && (
          <div className="flex items-center justify-between text-xs pt-2">
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{showHint ? 'Hide Etymology Clue' : 'Need a Clue?'}</span>
            </button>
            <span className="text-slate-500">
              Starts with: <strong className="text-slate-300 font-mono">{currentWord.word.slice(0, 2)}...</strong>
            </span>
          </div>
        )}

        {showHint && !submitted && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
            <strong>Root Clue: </strong>
            From {currentWord.etymology.origin} "{currentWord.etymology.rootWord}" meaning {currentWord.etymology.rootMeaning}.
          </div>
        )}

        {/* Feedback Display */}
        {submitted && (
          <div
            className={`p-4 rounded-xl border text-sm space-y-2 animate-fadeIn ${
              isCorrect
                ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                : 'bg-rose-950/30 border-rose-500/50 text-rose-200'
            }`}
          >
            <div className="flex items-center gap-2 font-bold">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Spot on! Excellent active recall.</span>
                </>
              ) : (
                <>
                  <span className="text-rose-400">Correct Word:</span>
                  <span className="uppercase tracking-wider font-mono font-black text-white text-base">
                    {currentWord.word}
                  </span>
                </>
              )}
            </div>
            <p className="text-xs text-slate-300">
              Pronunciation: <span className="font-mono">{currentWord.pronunciation.ipa}</span> ({currentWord.pronunciation.syllableBreakdown})
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
