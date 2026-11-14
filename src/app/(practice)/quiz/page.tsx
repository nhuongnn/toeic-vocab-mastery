'use client';

import React from 'react';
import Link from 'next/link';
import { Dumbbell, ArrowLeft } from 'lucide-react';
import { QuizExercise } from '@/components/practice/QuizExercise';

export default function QuizPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Dashboard</span>
        </Link>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Dumbbell className="w-3.5 h-3.5 text-indigo-400" />
          <span>Part 5 Contextual Training</span>
        </div>
      </div>

      <div className="text-center max-w-lg mx-auto space-y-2">
        <h1 className="text-3xl font-black text-white tracking-tight">
          TOEIC Multiple Choice Quiz
        </h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          Select the word that accurately completes the business correspondence. Detailed native mindset explanations will appear after each question.
        </p>
      </div>

      <QuizExercise />
    </div>
  );
}
