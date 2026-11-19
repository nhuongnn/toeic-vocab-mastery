'use client';

import React from 'react';
import { TourStep as ITourStep } from '@/types/onboarding';
import { ArrowRight, Check } from 'lucide-react';

interface TourStepProps {
  step: ITourStep;
  stepIndex: number;
  totalSteps: number;
  position: { top: number; left: number };
  onNext: () => void;
  onSkip: () => void;
}

export function TourStep({
  step,
  stepIndex,
  totalSteps,
  position,
  onNext,
  onSkip,
}: TourStepProps) {
  const isLast = stepIndex === totalSteps - 1;

  return (
    <div
      style={{
        top: `${Math.max(20, position.top)}px`,
        left: `${Math.max(16, position.left)}px`,
      }}
      className="fixed z-50 w-80 max-w-[calc(100vw-32px)] bg-slate-900 border border-indigo-500/40 rounded-2xl p-4 shadow-2xl backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">
          Bước {stepIndex + 1} / {totalSteps}
        </span>
        <button
          onClick={onSkip}
          className="text-xs text-slate-400 hover:text-slate-200"
        >
          Bỏ qua hướng dẫn
        </button>
      </div>

      <h4 className="text-sm font-bold text-slate-100 mb-1">{step.title}</h4>
      <p className="text-xs text-slate-300 leading-relaxed mb-4">{step.description}</p>

      <div className="flex items-center justify-end gap-2">
        <button
          onClick={onNext}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm"
        >
          <span>{isLast ? 'Hoàn thành' : 'Tiếp theo'}</span>
          {isLast ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}
