'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Languages, Volume2, Copy, Check, X, Loader2, Bot } from 'lucide-react';
import { useSpeech } from '@/hooks/useSpeech';
import { useChat } from '@/contexts/ChatContext';

interface SelectionState {
  originalText: string;
  translatedText: string | null;
  loading: boolean;
  error: string | null;
  x: number;
  y: number;
  isAbove: boolean;
  visible: boolean;
  mode: 'menu' | 'translation';
}

export function SelectionTranslator() {
  const { addSnippetContext } = useChat();
  const { speak } = useSpeech();

  const [state, setState] = useState<SelectionState>({
    originalText: '',
    translatedText: null,
    loading: false,
    error: null,
    x: 0,
    y: 0,
    isAbove: true,
    visible: false,
    mode: 'menu',
  });

  const [copied, setCopied] = useState(false);
  const [isEnabled, setIsEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('selection_translate_enabled');
      return saved !== null ? saved === 'true' : true;
    }
    return true;
  });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

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

    // Do not trigger inside input, textarea or contenteditable elements
    const activeElement = document.activeElement;
    if (
      activeElement &&
      (activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        (activeElement as HTMLElement).isContentEditable)
    ) {
      return;
    }

    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      return;
    }

    const rawText = selection.toString().trim();
    // Only trigger for meaningful text (2 to 500 characters)
    if (!rawText || rawText.length < 2 || rawText.length > 500) {
      return;
    }

    // Do not trigger if selection is inside our own popup or inside the AI chat widget
    const anchor = selection.anchorNode;
    if (
      anchor &&
      ((tooltipRef.current && tooltipRef.current.contains(anchor)) ||
        (anchor as HTMLElement).closest?.('[data-chat-widget]') ||
        anchor.parentElement?.closest?.('[data-chat-widget]'))
    ) {
      return;
    }

    try {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      if (rect.width === 0 || rect.height === 0) return;

      // Calculate position
      const menuWidth = 280;
      const padding = 12;
      let x = rect.left + rect.width / 2;
      // Bound horizontally to window
      x = Math.max(menuWidth / 2 + padding, Math.min(window.innerWidth - menuWidth / 2 - padding, x));

      // Place above if space permits, else below
      let isAbove = true;
      let y = rect.top - 10;
      if (y < 120) {
        y = rect.bottom + 10;
        isAbove = false;
      }

      setState({
        originalText: rawText,
        translatedText: null,
        loading: false,
        error: null,
        x,
        y,
        isAbove,
        visible: true,
        mode: 'menu',
      });
    } catch {
      // Ignore selection range errors
    }
  }, [isEnabled]);

  // Click outside and key listeners
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

    const handleTouchEnd = (e: TouchEvent) => {
      if (tooltipRef.current && tooltipRef.current.contains(e.target as Node)) {
        return;
      }
      setTimeout(handleSelection, 50);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setState((prev) => ({ ...prev, visible: false }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleSelection]);

  const handleQuickTranslate = () => {
    setState((prev) => ({
      ...prev,
      mode: 'translation',
      loading: true,
    }));
    translateText(state.originalText);
  };

  const handleAddToAiTutor = () => {
    addSnippetContext(state.originalText);
    setState((prev) => ({ ...prev, visible: false }));
    window.getSelection()?.removeAllRanges();
  };

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
        transform: state.isAbove ? 'translate(-50%, -100%)' : 'translate(-50%, 0)',
      }}
      className={`fixed z-50 transition-all duration-150 animate-in fade-in zoom-in-95 ${
        state.mode === 'menu'
          ? 'flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/95 border border-indigo-500/40 shadow-2xl backdrop-blur-xl'
          : 'w-80 max-w-[92vw] rounded-2xl bg-slate-900/95 border border-indigo-500/40 p-4 shadow-2xl backdrop-blur-xl'
      }`}
    >
      {state.mode === 'menu' ? (
        /* Floating Selection Menu */
        <>
          <button
            type="button"
            onClick={handleQuickTranslate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 hover:text-white text-xs font-semibold transition-all shadow-sm"
            title="Dịch nhanh đoạn này sang tiếng Việt"
          >
            <Languages className="w-3.5 h-3.5 text-indigo-400" />
            <span>Dịch nhanh</span>
          </button>

          <div className="w-px h-4 bg-slate-700/80" />

          <button
            type="button"
            onClick={handleAddToAiTutor}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600/20 hover:bg-violet-600/40 text-violet-300 hover:text-white text-xs font-semibold transition-all shadow-sm"
            title="Thêm đoạn này làm ngữ cảnh vào AI Tutor"
          >
            <Bot className="w-3.5 h-3.5 text-violet-400" />
            <span>Hỏi AI Tutor</span>
          </button>

          <div className="w-px h-4 bg-slate-700/80" />

          <button
            type="button"
            onClick={() => setState((prev) => ({ ...prev, visible: false }))}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Đóng menu"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </>
      ) : (
        /* Translation Details Card */
        <>
          {/* Header */}
          <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-800/80">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 uppercase tracking-wider">
              <Languages className="w-3.5 h-3.5 text-indigo-400" />
              <span>Dịch Nhanh Tiếng Việt</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => speak(state.originalText)}
                className="p-1 rounded-md text-slate-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors"
                title="Nghe phát âm tiếng Anh"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
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
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 mb-2.5">
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
                    type="button"
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

          {/* Action: Open in AI Tutor from Translation View */}
          <button
            type="button"
            onClick={handleAddToAiTutor}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-indigo-600/30 to-violet-600/30 hover:from-indigo-600/50 hover:to-violet-600/50 border border-indigo-500/30 text-indigo-200 hover:text-white text-xs font-semibold transition-all mb-2 shadow-sm"
          >
            <Bot className="w-3.5 h-3.5 text-indigo-400" />
            <span>Thêm vào AI Tutor hỏi ngữ pháp & bẫy thi</span>
          </button>

          {/* Micro footer hint */}
          <div className="text-[10px] text-slate-500 text-center flex items-center justify-between">
            <span>Bôi đen bất kỳ đoạn nào để tra cứu</span>
            <button
              type="button"
              onClick={() => {
                const next = !isEnabled;
                setIsEnabled(next);
                localStorage.setItem('selection_translate_enabled', String(next));
                if (!next) setState((prev) => ({ ...prev, visible: false }));
              }}
              className="text-slate-400 hover:text-indigo-400 transition-colors underline"
            >
              {isEnabled ? 'Tắt menu nhanh' : 'Bật menu nhanh'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
