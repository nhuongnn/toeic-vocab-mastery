import React from 'react';
import { Network, ArrowRightLeft } from 'lucide-react';
import { VocabularyWord } from '@/types/vocabulary';

interface WordFamilySectionProps {
  wordFamily: VocabularyWord['wordFamily'];
  synonyms: string[];
  antonyms: string[];
  currentWord: string;
}

export function WordFamilySection({
  wordFamily,
  synonyms,
  antonyms,
  currentWord,
}: WordFamilySectionProps) {
  const forms = [
    { label: 'Verb', value: wordFamily.verb, badge: 'v.' },
    { label: 'Noun', value: wordFamily.noun, badge: 'n.' },
    { label: 'Adjective', value: wordFamily.adjective, badge: 'adj.' },
    { label: 'Adverb', value: wordFamily.adverb, badge: 'adv.' },
  ].filter((item) => Boolean(item.value));

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-900/40 border border-slate-800 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 text-emerald-400">
        <Network className="w-5 h-5" />
        <h3 className="text-base font-bold uppercase tracking-wider text-slate-200">
          Word Family & Grammatical Forms (TOEIC Part 5 Focus)
        </h3>
      </div>

      {/* Grid of Parts of Speech */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {forms.map((item) => {
          const isCurrent = item.value?.toLowerCase().includes(currentWord.toLowerCase());
          return (
            <div
              key={item.label}
              className={`p-3.5 rounded-xl border transition-all ${
                isCurrent
                  ? 'bg-emerald-950/30 border-emerald-500/40 shadow-sm'
                  : 'bg-slate-950/60 border-slate-800/80'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                  {item.label}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                  {item.badge}
                </span>
              </div>
              <div
                className={`text-sm font-semibold truncate ${
                  isCurrent ? 'text-emerald-300' : 'text-slate-100'
                }`}
              >
                {item.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Synonyms and Antonyms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Synonyms */}
        <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/60">
          <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
            Synonyms (Natural Paraphrases)
          </div>
          <div className="flex flex-wrap gap-1.5">
            {synonyms.map((syn, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md text-xs bg-slate-900 text-slate-300 border border-slate-800"
              >
                {syn}
              </span>
            ))}
          </div>
        </div>

        {/* Antonyms */}
        <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/60">
          <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
            Antonyms (Opposite Meanings)
          </div>
          <div className="flex flex-wrap gap-1.5">
            {antonyms.map((ant, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md text-xs bg-slate-900 text-slate-400 border border-slate-800"
              >
                {ant}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
