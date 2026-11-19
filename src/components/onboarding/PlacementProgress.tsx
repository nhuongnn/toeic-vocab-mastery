'use client';

import React from 'react';

interface PlacementProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  currentDifficulty: number;
}

export function PlacementProgress({
  currentQuestion,
  totalQuestions,
  currentDifficulty,
}: PlacementProgressProps) {
  const percent = Math.min(100, Math.round((currentQuestion / totalQuestions) * 100));

  const getDiffLabel = (diff: number) => {
    if (diff <= 3.5) return { label: 'Độ khó: Cơ bản', color: 'text-emerald-400 bg-emerald-500/10' };
    if (diff <= 7.0) return { label: 'Độ khó: Trung cấp', color: 'text-indigo-400 bg-indigo-500/10' };
    return { label: 'Độ khó: Nâng cao', color: 'text-purple-400 bg-purple-500/10' };
  };

  const diffBadge = getDiffLabel(currentDifficulty);

  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
        <span>
          Câu hỏi <span className="text-slate-100 font-bold">{currentQuestion}</span> / {totalQuestions}
        </span>
        <span className={`px-2.5 py-0.5 rounded-full border border-slate-700/60 font-semibold ${diffBadge.color}`}>
          {diffBadge.label} ({currentDifficulty.toFixed(1)}/10)
        </span>
      </div>

      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-indigo-500 to-pink-500 h-full rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
