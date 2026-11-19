'use client';

import React from 'react';
import { FlattenedQuestion } from '@/types/mockTest';

interface Part5QuestionProps {
  question: FlattenedQuestion;
  selectedAnswer: number | null;
  onSelectOption: (optionIndex: number) => void;
}

export function Part5Question({
  question,
  selectedAnswer,
  onSelectOption,
}: Part5QuestionProps) {
  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full uppercase">
            Part 5 — Incomplete Sentence
          </span>
          {question.skillTested && (
            <span className="text-[11px] font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full capitalize">
              {question.skillTested}
            </span>
          )}
        </div>

        <p className="text-base sm:text-xl font-medium text-slate-100 leading-relaxed">
          {question.prompt}
        </p>
      </div>

      <div className="space-y-3">
        {question.options.map((option, idx) => {
          const isSelected = selectedAnswer === idx;

          return (
            <button
              key={idx}
              onClick={() => onSelectOption(idx)}
              className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border transition-all flex items-center justify-between group ${
                isSelected
                  ? 'bg-indigo-600/20 border-indigo-500 text-indigo-100 ring-2 ring-indigo-500/20 shadow-md'
                  : 'bg-slate-900/70 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <span
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs transition-colors shrink-0 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                  }`}
                >
                  {optionLabels[idx]}
                </span>
                <span className="text-sm sm:text-base font-medium">{option}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
