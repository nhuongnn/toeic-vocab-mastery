'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Languages, Volume2, Copy, Check, X, Loader2 } from 'lucide-react';
import { useSpeech } from '@/hooks/useSpeech';

interface TranslationState {
  originalText: string;
  translatedText: string | null;
  loading: boolean;
  error: string | null;
  x: number;
  y: number;
  visible: boolean;
}

export function SelectionTranslator() {
  const [state, setState] = useState<TranslationState>({
    originalText: '',
    translatedText: null,
    loading: false,
    error: null,
    x: 0,
    y: 0,
    visible: false,
  });

  const [copied, setCopied] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const { speak } = useSpeech();

  // Load preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('selection_translate_enabled');
    if (saved !== null) {
      setIsEnabled(saved === 'true');
    }
  }, []);

  const translateText = useCallback(async (text: string) => {
    if (!text || text.length < 2) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
      translatedText: null,
    }));

    try {
      const res = await fetch(`/api/translate?text=${encodeURIComponent(text)}&from=en&to=vi`, {
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new Error('Không thể dịch nội dung');
      }

      const data = await res.json();
      setState((prev) => ({
        ...prev,
        loading: false,
        translatedText: data.translatedText || 'Không có bản dịch',
      }));
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setState((prev) => ({
        ...prev,
        loading: false,
        error: 'Lỗi kết nối dịch tự động',
      }));
    }
  }, []);

  const handleSelection = useCallback(() => {
    if (!isEnabled) return;

    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      return;
    }

    const rawText = selection.toString().trim();
    // Only trigger for meaningful text (2 to 500 characters)
    if (!rawText || rawText.length < 2 || rawText.length > 500) {
      return;
    }

    // Do not trigger if selection is inside our own popup
    if (tooltipRef.current && selection.anchorNode && tooltipRef.current.contains(selection.anchorNode)) {
      return;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    if (rect.width === 0 || rect.height === 0) return;

    // Calculate position: above selection, centered horizontally
    const tooltipWidth = 320;
    const padding = 12;
    let x = rect.left + rect.width / 2;
    // Bound horizontally to window
    x = Math.max(tooltipWidth / 2 + padding, Math.min(window.innerWidth - tooltipWidth / 2 - padding, x));

    // Place above if space permits, else below
    let y = rect.top - 10;
    if (y < 180) {
      y = rect.bottom + 12; // place below
    }

    setState({
      originalText: rawText,
      translatedText: null,
      loading: true,
      error: null,
      x,
      y,
      visible: true,
    });

    translateText(rawText);
  }, [isEnabled, translateText]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        setState((prev) => ({ ...prev, visible: false }));
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      // Don't trigger if clicked inside existing tooltip
      if (tooltipRef.current && tooltipRef.current.contains(e.target as Node)) {
        return;
      }
      setTimeout(handleSelection, 20);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setState((prev) => ({ ...prev, visible: false }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleSelection]);

  const copyTranslation = () => {
    if (state.translatedText) {
      navigator.clipboard.writeText(state.translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!state.visible) return null;

  return (
    <div
      ref={tooltipRef}
      style={{
        top: `${state.y}px`,
        left: `${state.x}px`,
        transform: state.y > 180 ? 'translate(-50%, -100%)' : 'translate(-50%, 0)',
      }}
      className="fixed z-50 w-80 max-w-[92vw] rounded-2xl bg-slate-900/95 border border-indigo-500/40 p-4 shadow-2xl backdrop-blur-xl transition-all duration-150 animate-in fade-in zoom-in-95"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-800/80">
        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 uppercase tracking-wider">
          <Languages className="w-3.5 h-3.5 text-indigo-400" />
          <span>Tự Động Dịch Tiếng Việt</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => speak(state.originalText)}
            className="p-1 rounded-md text-slate-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors"
            title="Nghe phát âm tiếng Anh"
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setState((prev) => ({ ...prev, visible: false }))}
            className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title="Đóng cửa sổ dịch"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Selected English text snippet */}
      <div className="mb-2.5">
        <p className="text-xs text-slate-400 italic line-clamp-2 leading-relaxed">
          &ldquo;{state.originalText}&rdquo;
        </p>
      </div>

      {/* Translated Vietnamese result */}
      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
        {state.loading ? (
          <div className="flex items-center gap-2 py-1 text-xs text-indigo-300">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
            <span>Đang dịch tự động sang tiếng Việt...</span>
          </div>
        ) : state.error ? (
          <p className="text-xs text-rose-400">{state.error}</p>
        ) : (
          <div className="space-y-2">
            <p className="text-sm font-medium text-emerald-300 leading-relaxed selection:bg-emerald-500/30">
              {state.translatedText}
            </p>
            <div className="flex items-center justify-end pt-1">
              <button
                onClick={copyTranslation}
                className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-slate-200 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Đã sao chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Sao chép bản dịch</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Micro footer hint */}
      <div className="mt-2 text-[10px] text-slate-500 text-center flex items-center justify-between">
        <span>Bôi đen bất kỳ từ hoặc câu nào để dịch</span>
        <button
          onClick={() => {
            const next = !isEnabled;
            setIsEnabled(next);
            localStorage.setItem('selection_translate_enabled', String(next));
            if (!next) setState((prev) => ({ ...prev, visible: false }));
          }}
          className="text-slate-400 hover:text-indigo-400 transition-colors underline"
        >
          {isEnabled ? 'Tắt dịch nhanh' : 'Bật dịch nhanh'}
        </button>
      </div>
    </div>
  );
}
