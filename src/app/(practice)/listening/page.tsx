'use client';

import React from 'react';
import Link from 'next/link';
import { Volume2, ArrowLeft, Headphones, Sparkles, ArrowRight } from 'lucide-react';
import { ListeningExercise } from '@/components/practice/ListeningExercise';

export default function ListeningPage() {
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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-semibold">
          <Volume2 className="w-3.5 h-3.5 text-sky-400" />
          <span>TOEIC Listening Parts 1-4 Lab</span>
        </div>
      </div>

      <div className="text-center max-w-lg mx-auto space-y-2">
        <h1 className="text-3xl font-black text-white tracking-tight">
          Auditory Perception Lab
        </h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          Listen to genuine pronunciations and identify the corresponding term. Fast-tracks your reflexes for TOEIC audio sections.
        </p>
      </div>

      {/* Link to Native Pronunciation & Listening Theory */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-950/40 via-slate-900 to-indigo-950/40 border border-sky-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Bí quyết nghe hiểu người bản xứ nói nhanh</span>
              <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-sky-500/20 text-sky-300">
                Mới
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Khám phá cơ chế nối âm (Pick it up), nuốt âm H (Tell-im), âm T vỗ (Water) và nhịp điệu Schwa /ə/.
            </p>
          </div>
        </div>
        <Link
          href="/pronunciation"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-sm transition-colors flex-shrink-0"
        >
          <span>Học Tư duy Phát âm</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <ListeningExercise />
    </div>
  );
}
