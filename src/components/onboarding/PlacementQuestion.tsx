'use client';

import React, { useState } from 'react';
import { PlacementQuestion as IPlacementQuestion } from '@/types/onboarding';
import { CheckCircle2, XCircle } from 'lucide-react';

interface PlacementQuestionProps {
  question: IPlacementQuestion;
  onSelectOption: (optionIndex: number) => void;
  isSubmitting?: boolean;
}

export function PlacementQuestion({
  question,
  onSelectOption,
  isSubmitting,
}: PlacementQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleChoose = (idx: number) => {
    if (selected !== null || isSubmitting) return;
    setSelected(idx);
    onSelectOption(idx);
  };

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="mb-6">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 uppercase tracking-wider">
          {question.type === 'fill-blank' ? 'Điền từ vào chỗ trống' : 'Nhận biết nghĩa cốt lõi'}
        </span>
        <h3 className="text-lg sm:text-xl font-medium text-slate-100 mt-3 leading-relaxed">
          {question.question}
        </h3>
      </div>

      <div className="space-y-3">
        {question.options.map((option, idx) => {
          const isSelected = selected === idx;

          return (
            <button
              key={idx}
              onClick={() => handleChoose(idx)}
              disabled={selected !== null || isSubmitting}
              className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${
                isSelected
                  ? 'bg-indigo-600/20 border-indigo-500 text-indigo-100 ring-2 ring-indigo-500/20'
                  : 'bg-slate-800/40 border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs transition-colors ${
                    isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                  }`}
                >
                  {optionLabels[idx]}
                </span>
                <span className="text-sm sm:text-base font-normal">{option}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
