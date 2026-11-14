'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { FillBlankExercise } from '@/components/practice/FillBlankExercise';

export default function FillBlankPage() {
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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
          <span>Active Retrieval Drill</span>
        </div>
      </div>

      <div className="text-center max-w-lg mx-auto space-y-2">
        <h1 className="text-3xl font-black text-white tracking-tight">
          Fill In The Missing Word
        </h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          Type the target English word directly from memory. Active production triggers 3x higher synaptic retention than passive multiple choice.
        </p>
      </div>

      <FillBlankExercise />
    </div>
  );
}
