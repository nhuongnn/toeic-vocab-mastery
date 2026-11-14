import React from 'react';
import { History, BookOpen, Compass, Share2 } from 'lucide-react';
import { VocabularyWord } from '@/types/vocabulary';

interface EtymologySectionProps {
  etymology: VocabularyWord['etymology'];
}

export function EtymologySection({ etymology }: EtymologySectionProps) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-900/40 border border-slate-800 p-6 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center gap-2 mb-4 text-indigo-400">
        <History className="w-5 h-5" />
        <h3 className="text-base font-bold uppercase tracking-wider text-slate-200">
          Etymology & Historical Roots
        </h3>
      </div>

      {/* Root Word Pill Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
            Language of Origin
          </div>
          <div className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span>{etymology.origin}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              Root: {etymology.rootWord}
            </span>
          </div>
          <div className="text-sm text-slate-300 mt-2 font-mono bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-800">
            {etymology.rootMeaning}
          </div>
        </div>

        {etymology.firstRecordedUse && (
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                First Recorded In English
              </div>
              <div className="text-lg font-bold text-slate-100">
                {etymology.firstRecordedUse}
              </div>
            </div>
            {etymology.relatedLanguages && etymology.relatedLanguages.length > 0 && (
              <div className="mt-2 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Cognates: </span>
                {etymology.relatedLanguages.join(' • ')}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Evolution Story */}
      <div>
        <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
          <span>How The Word Evolved</span>
        </div>
        <p className="text-sm leading-relaxed text-slate-300 bg-slate-950/40 p-4 rounded-xl border border-slate-800/60">
          {etymology.evolution}
        </p>
      </div>
    </div>
  );
}
