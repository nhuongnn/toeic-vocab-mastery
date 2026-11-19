'use client';

import React from 'react';
import { PartNumber } from '@/types/mockTest';

interface PartNavigationProps {
  parts: PartNumber[];
  currentPart: PartNumber;
  onSelectPart: (part: PartNumber) => void;
  answeredByPart: Record<PartNumber, { answered: number; total: number }>;
}

export function PartNavigation({
  parts,
  currentPart,
  onSelectPart,
  answeredByPart,
}: PartNavigationProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
      {parts.map((p) => {
        const isActive = currentPart === p;
        const stats = answeredByPart[p] || { answered: 0, total: 0 };
        const isCompleted = stats.total > 0 && stats.answered === stats.total;

        return (
          <button
            key={p}
            onClick={() => onSelectPart(p)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              isActive
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <span>Part {p}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                isActive
                  ? 'bg-indigo-700 text-indigo-100'
                  : isCompleted
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {stats.answered}/{stats.total}
            </span>
          </button>
        );
      })}
    </div>
  );
}
