'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Volume2, CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, Headphones } from 'lucide-react';
import { VocabularyWord } from '@/types/vocabulary';
import { useProgress } from '@/contexts/ProgressContext';
import { useSpeech } from '@/hooks/useSpeech';
import { getRandomWords } from '@/data/vocabulary';

export function ListeningExercise() {
  const { recordReview, recordExerciseSession } = useProgress();
  const { speak } = useSpeech();

  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [options, setOptions] = useState<VocabularyWord[]>([]);

  React.useEffect(() => {
    const list = getRandomWords(5);
    setWords(list);
    if (list.length > 0) {
      const first = list[0];
      const dist = getRandomWords(3, first.id);
      setOptions([first, ...dist].sort(() => Math.random() - 0.5));
    }
  }, []);

  if (words.length === 0) {
    return <div className="text-center py-12 text-slate-500 text-sm">Loading listening lab audio...</div>;
  }

  const currentWord = words[currentIndex];

  const playAudio = (wordText: string) => {
    if (currentWord?.pronunciation?.audioUrl) {
      const audio = new Audio(currentWord.pronunciation.audioUrl);
      audio.play().catch(() => speak(wordText, 'en-US', 0.85));
    } else {
      speak(wordText, 'en-US', 0.85);
    }
  };

  const handleSelect = (optionId: string) => {
    if (selectedId !== null) return;
    setSelectedId(optionId);

    const isCorrect = optionId === currentWord.id;
    if (isCorrect) {
      setScore((s) => s + 1);
      recordReview(currentWord.id, 5);
    } else {
      recordReview(currentWord.id, 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < words.length) {
      const nextWord = words[currentIndex + 1];
      const nextDistractors = getRandomWords(3, nextWord.id);
      setOptions([nextWord, ...nextDistractors].sort(() => Math.random() - 0.5));
      setCurrentIndex((i) => i + 1);
      setSelectedId(null);
    } else {
      setIsFinished(true);
      recordExerciseSession({
        date: new Date().toISOString(),
        type: 'listening',
        totalQuestions: words.length,
        correctAnswers: score + (selectedId === currentWord.id ? 1 : 0),
        scorePercentage: Math.round(((score + (selectedId === currentWord.id ? 1 : 0)) / words.length) * 100),
        wordsPracticed: words.map((w) => w.id),
      });
    }
  };

  const restart = () => {
    const newWords = getRandomWords(5);
    setWords(newWords);
    const firstWord = newWords[0];
    const newDist = getRandomWords(3, firstWord.id);
    setOptions([firstWord, ...newDist].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setSelectedId(null);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="text-center py-16 px-4 max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mx-auto mb-6">
          <Trophy className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black text-white mb-2">Audio Mastery Complete!</h2>
        <div className="text-5xl font-black text-sky-400 my-4">
          {Math.round((score / words.length) * 100)}%
        </div>
        <p className="text-sm text-slate-300 mb-6">
          You correctly recognized {score} of {words.length} auditory prompts.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={restart}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-sm font-bold hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Practice Another Audio Set</span>
          </button>
          <Link
            href="/categories"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-colors"
          >
            <span>Explore Words</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
        <span>Audio {currentIndex + 1} of {words.length}</span>
        <div className="flex items-center gap-2">
          <span>Score: <strong className="text-sky-400">{score}</strong></span>
          <div className="w-24 h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-sky-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-8 text-center space-y-6 shadow-xl">
        <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 block">
          TOEIC Listening Drill (Ear Training)
        </span>

        {/* Big Audio Play Button */}
        <button
          onClick={() => playAudio(currentWord.word)}
          className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white mx-auto flex flex-col items-center justify-center gap-1 shadow-xl shadow-sky-600/30 hover:scale-105 transition-all group"
          title="Click to play sound"
        >
          <Headphones className="w-9 h-9 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Play Audio</span>
        </button>

        <p className="text-xs text-slate-400">
          Listen carefully to the pronunciation, stress accent, and syllable count, then select the matching word:
        </p>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {options.map((option) => {
            const isSelected = selectedId === option.id;
            const isCorrect = option.id === currentWord.id;

            let buttonStyle = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700';

            if (selectedId !== null) {
              if (isCorrect) {
                buttonStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-300';
              } else if (isSelected && !isCorrect) {
                buttonStyle = 'bg-rose-950/40 border-rose-500 text-rose-300';
              } else {
                buttonStyle = 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-50';
              }
            }

            return (
              <button
                key={option.id}
                disabled={selectedId !== null}
                onClick={() => handleSelect(option.id)}
                className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${buttonStyle}`}
              >
                <div>
                  <div className="font-bold uppercase tracking-tight text-base">
                    {option.word}
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    {option.pronunciation.ipa}
                  </div>
                </div>

                {selectedId !== null && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                )}
                {selectedId !== null && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-400" />
                )}
              </button>
            );
          })}
        </div>

        {selectedId !== null && (
          <div className="pt-4 border-t border-slate-800 text-right">
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors"
            >
              <span>{currentIndex + 1 < words.length ? 'Next Word' : 'See Score'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
