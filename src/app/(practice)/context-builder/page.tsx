'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { ContextBuilder } from '@/components/practice/ContextBuilder';

export default function ContextBuilderPage() {
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
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Syntax & Collocation Rebuilder</span>
        </div>
      </div>

      <div className="text-center max-w-lg mx-auto space-y-2">
        <h1 className="text-3xl font-black text-white tracking-tight">
          Context Sentence Builder
        </h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          Reconstruct real-world business English sentences word by word. Internalize natural word order, prepositions, and corporate collocations without mental translation.
        </p>
      </div>

      <ContextBuilder />
    </div>
  );
}
