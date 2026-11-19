'use client';

import React from 'react';
import { FlattenedQuestion } from '@/types/mockTest';
import { Flag } from 'lucide-react';

interface QuestionNavigatorProps {
  questions: FlattenedQuestion[];
  currentIndex: number;
  answers: Record<string, number | null>;
  flaggedQuestions: string[];
  onSelectIndex: (index: number) => void;
}

export function QuestionNavigator({
  questions,
  currentIndex,
  answers,
  flaggedQuestions,
  onSelectIndex,
}: QuestionNavigatorProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
      <div className="flex items-center justify-between mb-3 text-xs text-slate-400 font-medium">
        <span>Bảng câu hỏi ({questions.length})</span>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" />
            Đã làm
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
            Đánh dấu
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
            Chưa làm
          </span>
        </div>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 max-h-56 overflow-y-auto p-1 pr-2">
        {questions.map((q, idx) => {
          const isCurrent = idx === currentIndex;
          const isAnswered = answers[q.id] !== null && answers[q.id] !== undefined;
          const isFlagged = flaggedQuestions.includes(q.id);

          return (
            <button
              key={q.id}
              onClick={() => onSelectIndex(idx)}
              className={`relative h-9 rounded-lg font-mono text-xs font-semibold flex items-center justify-center transition-all ${
                isCurrent
                  ? 'ring-2 ring-indigo-400 font-bold bg-indigo-600 text-white shadow-md'
                  : isAnswered
                  ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-900/60'
                  : 'bg-slate-800/80 text-slate-400 border border-slate-700/60 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              <span>{q.questionNumber}</span>
              {isFlagged && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-slate-900" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
