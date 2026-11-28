'use client';

import React, { useState } from 'react';
import { Briefcase, MessageSquare, Coffee, Bookmark, Volume2, Languages, Loader2, RefreshCw } from 'lucide-react';
import { VocabularyWord } from '@/types/vocabulary';
import { useSpeech } from '@/hooks/useSpeech';
import { useTranslate } from '@/hooks/useTranslate';

interface SentenceExamplesProps {
  examples: VocabularyWord['examples'];
  word: string;
}

export function SentenceExamples({ examples, word }: SentenceExamplesProps) {
  const [activeTab, setActiveTab] = useState<'business' | 'daily' | 'conversation'>('business');
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [translationErrors, setTranslationErrors] = useState<Record<string, boolean>>({});
  const { speak } = useSpeech();
  const { translate } = useTranslate();

  const highlightWord = (sentence: string) => {
    const regex = new RegExp(`(${word}[a-z]*)`, 'gi');
    const parts = sentence.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="text-indigo-400 font-bold bg-indigo-500/10 px-1 py-0.5 rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const runTranslate = async (sentence: string, skipCache = false) => {
    setTranslationErrors((prev) => {
      const next = { ...prev };
      delete next[sentence];
      return next;
    });
    setTranslations((prev) => ({ ...prev, [sentence]: 'loading' }));

    try {
      const cleanSentence = sentence.replace(/^["']|["']$/g, '');
      const data = await translate(cleanSentence, {
        from: 'en',
        to: 'vi',
        skipCache,
      });
      setTranslations((prev) => ({
        ...prev,
        [sentence]: data.translatedText || 'Không có bản dịch',
      }));
    } catch {
      setTranslations((prev) => {
        const next = { ...prev };
        delete next[sentence];
        return next;
      });
      setTranslationErrors((prev) => ({ ...prev, [sentence]: true }));
    }
  };

  const toggleTranslate = async (sentence: string) => {
    if (translations[sentence] || translationErrors[sentence]) {
      setTranslations((prev) => {
        const next = { ...prev };
        delete next[sentence];
        return next;
      });
      setTranslationErrors((prev) => {
        const next = { ...prev };
        delete next[sentence];
        return next;
      });
      return;
    }

    await runTranslate(sentence, false);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-900/40 border border-slate-800 p-6 space-y-6">
      {/* Header and Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-base font-bold uppercase tracking-wider text-slate-200">
          Native Real-World Sentences
        </h3>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('business')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'business'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Business / TOEIC</span>
          </button>
          <button
            onClick={() => setActiveTab('daily')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'daily'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>Daily Routine</span>
          </button>
          <button
            onClick={() => setActiveTab('conversation')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'conversation'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Dialogue</span>
          </button>
        </div>
      </div>

      {/* Sentence Cards */}
      <div className="space-y-3">
        {examples[activeTab].map((sentence, index) => {
          const translationText = translations[sentence];
          const hasError = !!translationErrors[sentence];
          const isTranslated = !!translationText || hasError;

          return (
            <div
              key={index}
              className="group flex flex-col gap-2 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-slate-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 border border-slate-800">
                    {index + 1}
                  </span>
                  <p className="text-sm text-slate-200 leading-relaxed font-normal">
                    {highlightWord(sentence)}
                  </p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => toggleTranslate(sentence)}
                    className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs ${
                      isTranslated
                        ? 'text-indigo-300 bg-indigo-950/70 border border-indigo-500/40'
                        : 'text-slate-400 hover:text-indigo-300 hover:bg-slate-800 opacity-80 group-hover:opacity-100'
                    }`}
                    title={isTranslated ? 'Ẩn bản dịch tiếng Việt' : 'Dịch câu này sang tiếng Việt'}
                  >
                    <Languages className="w-4 h-4" />
                    <span className="text-[11px] font-medium hidden sm:inline">Dịch</span>
                  </button>
                  <button
                    onClick={() => speak(sentence)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-400 hover:bg-slate-800 transition-colors opacity-80 group-hover:opacity-100"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Inline Translation Display */}
              {isTranslated && (
                <div className="ml-9 p-3 rounded-xl bg-indigo-950/25 border border-indigo-900/40 text-xs leading-relaxed animate-in fade-in">
                  {translationText === 'loading' ? (
                    <div className="flex items-center gap-2 text-indigo-300">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                      <span>Đang tự động dịch sang tiếng Việt...</span>
                    </div>
                  ) : hasError ? (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-rose-400 font-medium">Lỗi tải bản dịch tiếng Việt</span>
                      <button
                        type="button"
                        onClick={() => runTranslate(sentence, true)}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-200 text-[11px] font-semibold transition-colors"
                        title="Thử dịch lại câu này"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Thử lại</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold text-[10px] uppercase tracking-wider flex-shrink-0 mt-0.5">
                          🇻🇳 Tiếng Việt
                        </span>
                        <p className="text-emerald-300 font-medium text-sm leading-relaxed">
                          {translationText}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => runTranslate(sentence, true)}
                        className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-indigo-300 transition-colors shrink-0 mt-0.5"
                        title="Dịch lại câu này (bỏ qua cache)"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span className="hidden sm:inline">Dịch lại</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Collocations Tag Cloud */}
      {examples.collocations && examples.collocations.length > 0 && (
        <div className="pt-4 border-t border-slate-800/60">
          <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2 flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5 text-indigo-400" />
            <span>High-Frequency Collocations (TOEIC Pairings)</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {examples.collocations.map((item, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-950 border border-slate-800 text-slate-300 hover:border-indigo-500/50 transition-colors cursor-default"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
