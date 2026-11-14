'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import { VocabularyWord } from '@/types/vocabulary';
import { useProgress } from '@/contexts/ProgressContext';
import { allVocabularyWords, getRandomWords } from '@/data/vocabulary';

interface QuizQuestion {
  word: VocabularyWord;
  prompt: string;
  options: VocabularyWord[];
  correctAnswerId: string;
}

export function QuizExercise() {
  const { recordReview, recordExerciseSession } = useProgress();

  const generateQuestions = (): QuizQuestion[] => {
    const selectedWords = getRandomWords(5);
    return selectedWords.map((word) => {
      // Create a prompt from business examples by blanking out the word
      const rawExample =
        word.examples.business[0] || word.examples.daily[0] || 'The team decided to _____ on the project.';
      const regex = new RegExp(`\\b${word.word}[a-z]*\\b`, 'gi');
      const prompt = rawExample.replace(regex, '_______');

      const distractors = getRandomWords(3, word.id);
      const options = [word, ...distractors].sort(() => Math.random() - 0.5);

      return {
        word,
        prompt,
        options,
        correctAnswerId: word.id,
      };
    });
  };

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  React.useEffect(() => {
    setQuestions(generateQuestions());
  }, []);

  if (questions.length === 0) {
    return <div className="text-center py-12 text-slate-500 text-sm">Loading quiz question pool...</div>;
  }

  const currentQ = questions[currentIndex];

  const handleSelect = (optionId: string) => {
    if (selectedId !== null) return; // already answered
    setSelectedId(optionId);

    const isCorrect = optionId === currentQ.correctAnswerId;
    if (isCorrect) {
      setScore((s) => s + 1);
      recordReview(currentQ.word.id, 5);
    } else {
      recordReview(currentQ.word.id, 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedId(null);
    } else {
      setIsFinished(true);
      recordExerciseSession({
        date: new Date().toISOString(),
        type: 'quiz',
        totalQuestions: questions.length,
        correctAnswers: score + (selectedId === currentQ.correctAnswerId ? 1 : 0),
        scorePercentage: Math.round(((score + (selectedId === currentQ.correctAnswerId ? 1 : 0)) / questions.length) * 100),
        wordsPracticed: questions.map((q) => q.word.id),
      });
    }
  };

  const restart = () => {
    setQuestions(generateQuestions());
    setCurrentIndex(0);
    setSelectedId(null);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="text-center py-16 px-4 max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-6">
          <Trophy className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black text-white mb-2">Quiz Completed!</h2>
        <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 my-4">
          {percentage}%
        </div>
        <p className="text-sm text-slate-300 mb-6">
          You scored {score} out of {questions.length} questions correctly.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={restart}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 text-sm font-bold transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Another Quiz</span>
          </button>
          <Link
            href="/categories"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-colors"
          >
            <span>Learn More Words</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* Header and counter */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
        <span>Question {currentIndex + 1} of {questions.length}</span>
        <div className="flex items-center gap-2">
          <span>Score: <strong className="text-indigo-400">{score}</strong></span>
          <div className="w-24 h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-indigo-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
            TOEIC Contextual Fit
          </span>
          <p className="text-lg sm:text-xl font-medium text-slate-100 leading-relaxed font-mono">
            {currentQ.prompt}
          </p>
        </div>

        {/* Options Grid */}
        <div className="space-y-3">
          {currentQ.options.map((option) => {
            const isSelected = selectedId === option.id;
            const isCorrect = option.id === currentQ.correctAnswerId;

            let buttonStyle = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700';

            if (selectedId !== null) {
              if (isCorrect) {
                buttonStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-300 shadow-sm';
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
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-4 ${buttonStyle}`}
              >
                <div>
                  <span className="text-base font-bold uppercase tracking-tight block">
                    {option.word}
                  </span>
                  <span className="text-xs text-slate-400 line-clamp-1">
                    {option.deepMeaning.coreConcept}
                  </span>
                </div>

                {selectedId !== null && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                )}
                {selectedId !== null && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback / Explanation on answer */}
        {selectedId !== null && (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 animate-fadeIn">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Native Mindset Context:
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentQ.word.nativeMindset.howNativesThink}
            </p>
            <div className="pt-2 text-right">
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors"
              >
                <span>{currentIndex + 1 < questions.length ? 'Next Question' : 'See Results'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
