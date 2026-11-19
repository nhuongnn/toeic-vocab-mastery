'use client';

import React, { useState } from 'react';
import { FlattenedQuestion, Part7Question as IPart7Question } from '@/types/mockTest';

interface Part7QuestionProps {
  question: FlattenedQuestion;
  selectedAnswer: number | null;
  onSelectOption: (optionIndex: number) => void;
}

export function Part7Question({
  question,
  selectedAnswer,
  onSelectOption,
}: Part7QuestionProps) {
  const parent = question.parentQuestion as IPart7Question;
  const [activePassageIndex, setActivePassageIndex] = useState(0);

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Passage Area */}
      <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl max-h-[70vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-pink-400 bg-pink-500/10 border border-pink-500/20 px-2.5 py-0.5 rounded-full uppercase">
              Part 7 — {parent.passageType} Passage
            </span>
          </div>

          {/* If multi-passages, provide tabs */}
          {parent.passages.length > 1 && (
            <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl">
              {parent.passages.map((p, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => setActivePassageIndex(pIdx)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${
                    activePassageIndex === pIdx
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {p.type || `Đoạn ${pIdx + 1}`}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Display all passages or active tab passage */}
        <div className="space-y-6">
          {parent.passages.map((passage, pIdx) => {
            const isVisible = parent.passages.length === 1 || activePassageIndex === pIdx;
            if (!isVisible) return null;

            return (
              <div key={pIdx} className="space-y-3">
                {parent.passages.length > 1 && (
                  <div className="inline-block text-xs font-bold px-2.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                    {passage.type}
                  </div>
                )}
                <div className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans whitespace-pre-line bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
                  {passage.content}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Question & Options Area */}
      <div className="lg:col-span-5 space-y-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <span className="text-xs font-semibold text-pink-400 block mb-1">
            Câu {question.questionNumber}
          </span>
          <p className="text-sm sm:text-base font-semibold text-slate-100 leading-snug">
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
