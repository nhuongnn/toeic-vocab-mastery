'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { MatchingGame } from '@/components/practice/MatchingGame';

export default function MatchingPage() {
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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Associative Memory Game</span>
        </div>
      </div>

      <div className="text-center max-w-lg mx-auto space-y-2">
        <h1 className="text-3xl font-black text-white tracking-tight">
          Concept Matching Matrix
        </h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          Match each word card with its corresponding core concept to forge instant mental associations.
        </p>
      </div>

      <MatchingGame />
    </div>
  );
}
