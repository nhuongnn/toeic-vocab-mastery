import React from 'react';
import { Target, HelpCircle, Award } from 'lucide-react';
import { VocabularyWord } from '@/types/vocabulary';

interface ToeicTipsSectionProps {
  toeicContext: VocabularyWord['toeicContext'];
  frequency: number;
}

export function ToeicTipsSection({ toeicContext, frequency }: ToeicTipsSectionProps) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-900/60 border border-indigo-500/20 p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-400">
          <Target className="w-5 h-5" />
          <h3 className="text-base font-bold uppercase tracking-wider text-slate-100">
            TOEIC Exam Intelligence (700+ Strategy)
          </h3>
        </div>

        {/* Frequency Meter */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-semibold text-indigo-300">
          <Award className="w-3.5 h-3.5 text-indigo-400" />
          <span>TOEIC Frequency: {frequency}/10</span>
        </div>
      </div>

      {/* Common Parts Badge */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <span className="font-semibold text-slate-300">Frequently Appears In:</span>
        <div className="flex items-center gap-1.5">
          {toeicContext.commonParts.map((part) => (
            <span
              key={part}
              className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-indigo-300 font-mono text-xs font-bold"
            >
              Part {part}
            </span>
          ))}
        </div>
      </div>

      {/* Example TOEIC Question Simulation */}
      {toeicContext.exampleQuestion && (
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
            <span>Sample Exam Question</span>
          </div>
          <p className="text-sm text-slate-200 font-medium leading-relaxed font-mono">
            {toeicContext.exampleQuestion}
          </p>
        </div>
      )}

      {/* Exam Strategy Tip */}
      {toeicContext.tips && (
        <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-200 leading-relaxed">
          <span className="font-bold text-indigo-300 block mb-1">💡 Test Strategy Tip:</span>
          {toeicContext.tips}
        </div>
      )}
    </div>
  );
}
