'use client';

import React, { useState } from 'react';
import { Brain, Eye, CheckCircle2, XCircle, Globe2, Languages, Loader2 } from 'lucide-react';
import { VocabularyWord } from '@/types/vocabulary';

interface NativeMindsetProps {
  nativeMindset: VocabularyWord['nativeMindset'];
  deepMeaning: VocabularyWord['deepMeaning'];
}

export function NativeMindset({ nativeMindset, deepMeaning }: NativeMindsetProps) {
  const [showTranslations, setShowTranslations] = useState(false);
  const [loading, setLoading] = useState(false);
  const [translations, setTranslations] = useState<Record<string, string>>({});

  const toggleAllTranslations = async () => {
    if (showTranslations) {
      setShowTranslations(false);
      return;
    }

    setShowTranslations(true);

    // If already translated, no need to re-fetch
    if (Object.keys(translations).length > 0) return;

    setLoading(true);
    const textsToTranslate = {
      coreConcept: deepMeaning.coreConcept,
      mentalImage: nativeMindset.mentalImage,
      spatial: deepMeaning.spatialContext,
      temporal: deepMeaning.temporalContext,
      howNativesThink: nativeMindset.howNativesThink,
      whenToUse: nativeMindset.whenToUse,
      whenNotToUse: nativeMindset.whenNotToUse,
    };

    const results: Record<string, string> = {};
    const entries = Object.entries(textsToTranslate);

    await Promise.all(
      entries.map(async ([key, text]) => {
        if (!text) return;
        try {
          const res = await fetch(`/api/translate?text=${encodeURIComponent(text)}&from=en&to=vi`);
          if (res.ok) {
            const data = await res.json();
            results[key] = data.translatedText;
          }
        } catch (err) {
          console.error(`Failed to translate ${key}:`, err);
        }
      })
    );

    setTranslations(results);
    setLoading(false);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-900/40 border border-slate-800 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-purple-400">
          <Brain className="w-5 h-5" />
          <h3 className="text-base font-bold uppercase tracking-wider text-slate-200">
            Native Speaker Mindset & Spatial Perception
          </h3>
        </div>

        <button
          onClick={toggleAllTranslations}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all self-start sm:self-auto border ${
            showTranslations
              ? 'bg-purple-950/60 border-purple-500/50 text-purple-300 shadow-sm'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
          title="Bật/Tắt hiển thị bản dịch tiếng Việt cho toàn bộ mục tư duy bản xứ"
        >
          {loading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />
              <span>Đang dịch tiếng Việt...</span>
            </>
          ) : (
            <>
              <Languages className="w-3.5 h-3.5 text-purple-400" />
              <span>{showTranslations ? 'Ẩn dịch tiếng Việt' : '🇻🇳 Dịch tiếng Việt'}</span>
            </>
          )}
        </button>
      </div>

      {/* Core Concept Banner */}
      <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-800/30 space-y-2">
        <div className="text-xs uppercase tracking-wider text-purple-300 font-semibold">
          The Underlying Concept
        </div>
        <p className="text-base text-slate-100 font-medium leading-relaxed">
          {deepMeaning.coreConcept}
        </p>
        {showTranslations && translations.coreConcept && (
          <p className="text-sm text-emerald-300 font-normal pt-1 border-t border-purple-900/40 leading-relaxed">
            🇻🇳 {translations.coreConcept}
          </p>
        )}
      </div>

      {/* Mental Picture */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 flex-shrink-0 mt-0.5">
          <Eye className="w-5 h-5" />
        </div>
        <div className="space-y-1.5 flex-1">
          <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
            Mental Picture in Native Minds
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {nativeMindset.mentalImage}
          </p>
          {showTranslations && translations.mentalImage && (
            <p className="text-xs text-emerald-300/90 pt-1 border-t border-slate-800/80 leading-relaxed">
              🇻🇳 {translations.mentalImage}
            </p>
          )}
        </div>
      </div>

      {/* Spatial & Temporal Context */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/60 space-y-1.5">
          <div className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">
            🌐 In Space / Physical Dimension
          </div>
          <p className="text-xs leading-relaxed text-slate-300">
            {deepMeaning.spatialContext}
          </p>
          {showTranslations && translations.spatial && (
            <p className="text-xs text-emerald-300/90 pt-1 border-t border-slate-800/60 leading-relaxed">
              🇻🇳 {translations.spatial}
            </p>
          )}
        </div>

        <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/60 space-y-1.5">
          <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
            ⏳ In Time / Duration
          </div>
          <p className="text-xs leading-relaxed text-slate-300">
            {deepMeaning.temporalContext}
          </p>
          {showTranslations && translations.temporal && (
            <p className="text-xs text-emerald-300/90 pt-1 border-t border-slate-800/60 leading-relaxed">
              🇻🇳 {translations.temporal}
            </p>
          )}
        </div>
      </div>

      {/* How Natives Think */}
      <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
        <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
          How A Native Thinks When Selecting This Word
        </div>
        <p className="text-sm text-slate-200 leading-relaxed italic">
          &ldquo;{nativeMindset.howNativesThink}&rdquo;
        </p>
        {showTranslations && translations.howNativesThink && (
          <p className="text-xs text-emerald-300/90 pt-1.5 border-t border-slate-800/80 leading-relaxed">
            🇻🇳 {translations.howNativesThink}
          </p>
        )}
      </div>

      {/* When To Use vs When Not To Use */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/30 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-emerald-400 font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>When To Use Naturally</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {nativeMindset.whenToUse}
          </p>
          {showTranslations && translations.whenToUse && (
            <p className="text-xs text-emerald-300/90 pt-1 border-t border-emerald-900/30 leading-relaxed">
              🇻🇳 {translations.whenToUse}
            </p>
          )}
        </div>

        <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/30 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-rose-400 font-bold">
            <XCircle className="w-4 h-4" />
            <span>Common Pitfalls & When NOT To Use</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {nativeMindset.whenNotToUse}
          </p>
          {showTranslations && translations.whenNotToUse && (
            <p className="text-xs text-emerald-300/90 pt-1 border-t border-rose-900/30 leading-relaxed">
              🇻🇳 {translations.whenNotToUse}
            </p>
          )}
        </div>
      </div>

      {/* Cultural Nuance */}
      {nativeMindset.culturalContext && (
        <div className="flex items-start gap-2.5 text-xs text-slate-400 p-3 rounded-lg bg-slate-950/40 border border-slate-800/50">
          <Globe2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
          <span>
            <strong className="text-slate-300">Cultural Workplace Context: </strong>
            {nativeMindset.culturalContext}
          </span>
        </div>
      )}
    </div>
  );
}
