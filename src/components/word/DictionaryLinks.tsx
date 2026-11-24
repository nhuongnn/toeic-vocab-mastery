'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  BookOpen,
  ExternalLink,
  ChevronDown,
  Check,
} from 'lucide-react';
import {
  DictionaryProvider,
  DICTIONARY_OPTIONS,
  getCambridgeUrl,
  getOxfordUrl,
  getDictionaryUrl,
  getBaseFormInfo,
} from '@/lib/dictionary';
import { useProgress } from '@/contexts/ProgressContext';

interface DictionaryLinksProps {
  word: string;
  variant?: 'buttons' | 'dropdown' | 'compact' | 'inline';
  className?: string;
  showLabel?: boolean;
}

export function DictionaryLinks({
  word,
  variant = 'dropdown',
  className = '',
  showLabel = true,
}: DictionaryLinksProps) {
  const { progress, updatePreferences } = useProgress();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const preferredDict: DictionaryProvider =
    progress?.preferences?.preferredDictionary || 'cambridge';

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSetDefault = (
    provider: DictionaryProvider,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();
    updatePreferences({ preferredDictionary: provider });
  };

  const cambridgeUrl = getCambridgeUrl(word);
  const oxfordUrl = getOxfordUrl(word);
  const oxfordInfo = getBaseFormInfo(word);

  // 1. Buttons Variant: Side-by-side clear action buttons
  if (variant === 'buttons') {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        {/* Cambridge Button */}
        <a
          href={cambridgeUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:border-amber-500/60 transition-all shadow-sm group"
          title="Tra cứu từ này trên Cambridge Advanced Learner's Dictionary"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
          <span>Cambridge</span>
          {preferredDict === 'cambridge' && (
            <span
              className="w-1.5 h-1.5 rounded-full bg-amber-400"
              title="Từ điển mặc định của bạn"
            />
          )}
          <ExternalLink className="w-3 h-3 text-amber-400/70 group-hover:text-amber-300" />
        </a>

        {/* Oxford Button */}
        <a
          href={oxfordUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 hover:border-sky-500/60 transition-all shadow-sm group"
          title={
            oxfordInfo.isConverted
              ? `Tra cứu từ này trên Oxford Advanced Learner's Dictionary (Nguyên mẫu: "${oxfordInfo.baseForm}")`
              : "Tra cứu từ này trên Oxford Advanced Learner's Dictionary (OALD)"
          }
        >
          <BookOpen className="w-3.5 h-3.5 text-sky-400 group-hover:scale-110 transition-transform" />
          <span>Oxford</span>
          {oxfordInfo.isConverted && (
            <span className="text-[10px] text-sky-400/80 font-normal">
              ({oxfordInfo.baseForm})
            </span>
          )}
          {preferredDict === 'oxford' && (
            <span
              className="w-1.5 h-1.5 rounded-full bg-sky-400"
              title="Từ điển mặc định của bạn"
            />
          )}
          <ExternalLink className="w-3 h-3 text-sky-400/70 group-hover:text-sky-300" />
        </a>
      </div>
    );
  }

  // 2. Inline Variant: Minimalist clickable links
  if (variant === 'inline') {
    return (
      <div
        className={`inline-flex items-center gap-2 text-xs ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {showLabel && <span className="text-slate-400">Từ điển:</span>}
        <a
          href={cambridgeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 hover:underline transition-colors font-medium"
        >
          <span>Cambridge</span>
          <ExternalLink className="w-3 h-3" />
        </a>
        <span className="text-slate-700">•</span>
        <a
          href={oxfordUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 hover:underline transition-colors font-medium"
        >
          <span>Oxford</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    );
  }

  // 3. Compact Variant: Icon button with popover (Great for cards & flashcards)
  if (variant === 'compact') {
    return (
      <div className={`relative inline-block ${className}`} ref={dropdownRef}>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className={`p-1.5 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors ${
            isOpen ? 'bg-slate-800 text-indigo-300' : ''
          }`}
          title="Mở từ điển Cambridge hoặc Oxford"
          aria-label="Chọn từ điển Cambridge hoặc Oxford"
        >
          <BookOpen className="w-4 h-4" />
        </button>

        {isOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-full mt-1.5 w-52 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800/80 mb-1">
              Tra từ điển
            </div>

            <a
              href={cambridgeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-amber-300 hover:bg-amber-500/10 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold">Cambridge</span>
                {preferredDict === 'cambridge' && (
                  <span className="text-[10px] px-1 py-0.2 bg-amber-500/20 text-amber-400 rounded">
                    Mặc định
                  </span>
                )}
              </div>
              <ExternalLink className="w-3 h-3 text-amber-400/70 group-hover:text-amber-300" />
            </a>

            <a
              href={oxfordUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-sky-300 hover:bg-sky-500/10 transition-colors group"
              title={
                oxfordInfo.isConverted
                  ? `Mở trên Oxford Learner's Dictionaries (Nguyên mẫu: "${oxfordInfo.baseForm}")`
                  : undefined
              }
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold">Oxford (OALD)</span>
                {oxfordInfo.isConverted && (
                  <span className="text-[10px] text-sky-400/80 font-normal">
                    ({oxfordInfo.baseForm})
                  </span>
                )}
                {preferredDict === 'oxford' && (
                  <span className="text-[10px] px-1 py-0.2 bg-sky-500/20 text-sky-400 rounded">
                    Mặc định
                  </span>
                )}
              </div>
              <ExternalLink className="w-3 h-3 text-sky-400/70 group-hover:text-sky-300" />
            </a>
          </div>
        )}
      </div>
    );
  }

  // 4. Dropdown Variant (Default, used in top bars / headers)
  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <div className="inline-flex rounded-xl border border-slate-800 bg-slate-900 shadow-sm">
        {/* Main button: Click opens the user's preferred dictionary directly */}
        <a
          href={getDictionaryUrl(word, preferredDict)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-l-xl transition-all"
          title={`Mở nhanh từ điển ${DICTIONARY_OPTIONS[preferredDict].shortName} (Mặc định)`}
        >
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
          <span>Từ điển</span>
          <span
            className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
              preferredDict === 'oxford'
                ? 'bg-sky-500/20 text-sky-300'
                : 'bg-amber-500/20 text-amber-300'
            }`}
          >
            {DICTIONARY_OPTIONS[preferredDict].shortName}
          </span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </a>

        {/* Chevron Button: Click toggles dropdown to switch or select between Cambridge & Oxford */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className={`px-2 py-1.5 border-l border-slate-800 hover:bg-slate-800 rounded-r-xl transition-colors text-slate-400 hover:text-slate-200 ${
            isOpen ? 'bg-slate-800 text-slate-200' : ''
          }`}
          title="Chọn giữa từ điển Cambridge hoặc Oxford"
          aria-label="Chọn từ điển"
        >
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 top-full mt-2 w-72 rounded-2xl bg-slate-900/95 border border-slate-800 backdrop-blur-md shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800/80 mb-1 flex items-center justify-between">
            <span>Chọn từ điển tra cứu</span>
            <span className="text-[10px] text-slate-500 font-normal">Anh - Anh chuẩn</span>
          </div>

          <div className="space-y-1">
            {/* Cambridge Option */}
            <div className="p-2 rounded-xl hover:bg-slate-800/80 transition-colors">
              <div className="flex items-center justify-between">
                <a
                  href={cambridgeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-amber-400 hover:text-amber-300 text-xs font-bold group"
                >
                  <span>Cambridge Dictionary</span>
                  <ExternalLink className="w-3 h-3 text-amber-400/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <button
                  type="button"
                  onClick={(e) => handleSetDefault('cambridge', e)}
                  className={`text-[10px] px-2 py-0.5 rounded-md font-semibold transition-all flex items-center gap-1 ${
                    preferredDict === 'cambridge'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'text-slate-500 hover:text-slate-300 hover:bg-slate-700/50'
                  }`}
                  title="Đặt Cambridge làm từ điển mặc định"
                >
                  {preferredDict === 'cambridge' ? (
                    <>
                      <Check className="w-2.5 h-2.5" />
                      <span>Mặc định</span>
                    </>
                  ) : (
                    <span>Đặt mặc định</span>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 pl-0.5 leading-relaxed">
                {DICTIONARY_OPTIONS.cambridge.description}
              </p>
            </div>

            {/* Oxford Option */}
            <div className="p-2 rounded-xl hover:bg-slate-800/80 transition-colors">
              <div className="flex items-center justify-between">
                <a
                  href={oxfordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-sky-400 hover:text-sky-300 text-xs font-bold group"
                >
                  <span>Oxford Learner&apos;s (OALD)</span>
                  <ExternalLink className="w-3 h-3 text-sky-400/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <button
                  type="button"
                  onClick={(e) => handleSetDefault('oxford', e)}
                  className={`text-[10px] px-2 py-0.5 rounded-md font-semibold transition-all flex items-center gap-1 ${
                    preferredDict === 'oxford'
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                      : 'text-slate-500 hover:text-slate-300 hover:bg-slate-700/50'
                  }`}
                  title="Đặt Oxford làm từ điển mặc định"
                >
                  {preferredDict === 'oxford' ? (
                    <>
                      <Check className="w-2.5 h-2.5" />
                      <span>Mặc định</span>
                    </>
                  ) : (
                    <span>Đặt mặc định</span>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 pl-0.5 leading-relaxed">
                {DICTIONARY_OPTIONS.oxford.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
