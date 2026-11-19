'use client';

import React from 'react';
import { FlattenedQuestion, Part6Question as IPart6Question } from '@/types/mockTest';

interface Part6QuestionProps {
  question: FlattenedQuestion;
  selectedAnswer: number | null;
  onSelectOption: (optionIndex: number) => void;
}

export function Part6Question({
  question,
  selectedAnswer,
  onSelectOption,
}: Part6QuestionProps) {
  const parent = question.parentQuestion as IPart6Question;
  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Passage Display */}
      <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl max-h-[68vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
          <span className="text-[11px] font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full uppercase">
            Part 6 — Text Completion ({parent.passageType})
          </span>
          <span className="text-xs text-slate-400">Questions 131 - 146 format</span>
        </div>

        <div className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans whitespace-pre-line space-y-4">
          {parent.passage}
        </div>
      </div>

      {/* Question & Options */}
      <div className="lg:col-span-5 space-y-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <span className="text-xs font-semibold text-indigo-400 block mb-1">
            Câu hỏi số {question.questionNumber}
          </span>
          <p className="text-sm sm:text-base font-semibold text-slate-100">
            {question.prompt}
          </p>
        </div>

        <div className="space-y-2.5">
          {question.options.map((option, idx) => {
            const isSelected = selectedAnswer === idx;

            return (
              <button
                key={idx}
                onClick={() => onSelectOption(idx)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-100 ring-2 ring-indigo-500/20 shadow-md'
                    : 'bg-slate-900/70 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs transition-colors shrink-0 ${
                      isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    {optionLabels[idx]}
                  </span>
                  <span className="text-xs sm:text-sm font-medium">{option}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
