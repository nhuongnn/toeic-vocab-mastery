'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, FileText, ArrowRight, Zap, Trophy } from 'lucide-react';
import { TestType } from '@/types/mockTest';

interface TestCardProps {
  id: string;
  type: TestType;
  title: string;
  description: string;
  timeMinutes: number;
  questionCount: number;
  partsLabel: string;
  badge?: string;
  isPopular?: boolean;
}

export function TestCard({
  id,
  title,
  description,
  timeMinutes,
  questionCount,
  partsLabel,
  badge,
  isPopular,
}: TestCardProps) {
  return (
    <div
      className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all border ${
        isPopular
          ? 'bg-gradient-to-b from-slate-900 to-indigo-950/40 border-indigo-500/50 ring-1 ring-indigo-500/30 shadow-2xl'
          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 shadow-xl'
      }`}
    >
      {badge && (
        <div className="absolute -top-3 left-6">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-pink-500 to-indigo-600 text-white shadow-md">
            {badge}
          </span>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            {timeMinutes <= 30 ? <Zap className="w-6 h-6" /> : <Trophy className="w-6 h-6" />}
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              {timeMinutes} phút
            </span>
            <span className="flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-pink-400" />
              {questionCount} câu
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-100">{title}</h3>
        <p className="text-xs font-semibold text-indigo-400 mt-1">{partsLabel}</p>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800/80">
        <Link
          href={`/mock-test/${id}`}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/25 group"
        >
          <span>Bắt đầu thi thử</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
