'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Languages,
  Volume2,
  Copy,
  Check,
  X,
  Loader2,
  Bot,
  BookOpen,
  ExternalLink,
  BookmarkPlus,
  MessageSquare,
  MessageSquarePlus,
  ChevronDown,
} from 'lucide-react';
import { useSpeech } from '@/hooks/useSpeech';
import { useTranslate } from '@/hooks/useTranslate';
import { useChat } from '@/contexts/ChatContext';
import { getCambridgeUrl, getOxfordUrl, getBaseFormInfo } from '@/lib/dictionary';
import { TranslationProvider } from '@/types/progress';
import { TRANSLATION_PROVIDER_LABELS } from '@/lib/translate-client';

interface SelectionState {
  originalText: string;
  translatedText: string | null;
  providerUsed: 'mymemory' | 'gemini' | 'cloudflare' | null;
  fallback: boolean;
  fallbackReason: string | null;
  loading: boolean;
  error: string | null;
  x: number;
  y: number;
  isAbove: boolean;
  visible: boolean;
  mode: 'menu' | 'translation';
}

const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch {
    return false;
  }
};

export function SelectionTranslator() {
  const { addSnippetContext } = useChat();
  const { speak } = useSpeech();
  const { translate, translationProvider, setTranslationProvider } = useTranslate();

  const [state, setState] = useState<SelectionState>({
    originalText: '',
    translatedText: null,
    providerUsed: null,
    fallback: false,
    fallbackReason: null,
    loading: false,
    error: null,
    x: 0,
    y: 0,
    isAbove: true,
    visible: false,
    mode: 'menu',
  });

  const [copiedOriginal, setCopiedOriginal] = useState(false);
  const [copiedTranslation, setCopiedTranslation] = useState(false);
  const [aiMenuOpen, setAiMenuOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('selection_translate_enabled');
      return saved !== null ? saved === 'true' : true;
    }
    return true;
  });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const translateText = useCallback(
    async (text: string, overrideProvider?: TranslationProvider) => {
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
        providerUsed: null,
        fallback: false,
        fallbackReason: null,
      }));

      try {
        const data = await translate(text, {
          from: 'en',
          to: 'vi',
          provider: overrideProvider,
          signal: controller.signal,
        });

        setState((prev) => ({
          ...prev,
          loading: false,
          translatedText: data.translatedText || 'Không có bản dịch',
          providerUsed: data.provider || null,
          fallback: Boolean(data.fallback),
          fallbackReason: data.fallbackReason || null,
        }));
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;
        setState((prev) => ({
          ...prev,
          loading: false,
          error: 'Lỗi kết nối dịch tự động',
        }));
      }
    },
    [translate]
  );

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
      const menuWidth = Math.min(720, typeof window !== 'undefined' ? window.innerWidth - 24 : 720);
      const padding = 12;
      let x = rect.left + rect.width / 2;
      // Bound horizontally to window
      x = Math.max(menuWidth / 2 + padding, Math.min(window.innerWidth - menuWidth / 2 - padding, x));

      // Place above if space permits, else below
      let isAbove = true;
      let y = rect.top - 10;
      if (y < 130) {
        y = rect.bottom + 10;
        isAbove = false;
      }

      setState({
        originalText: rawText,
        translatedText: null,
        providerUsed: null,
        fallback: false,
        fallbackReason: null,
        loading: false,
        error: null,
        x,
        y,
        isAbove,
        visible: true,
        mode: 'menu',
      });
      setCopiedOriginal(false);
      setCopiedTranslation(false);
      setAiMenuOpen(false);
    } catch {
      // Ignore selection range errors
    }
  }, [isEnabled]);

  // Click outside and key listeners
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        setState((prev) => ({ ...prev, visible: false }));
        setAiMenuOpen(false);
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
        setAiMenuOpen(false);
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

  const handleQuickTranslate = useCallback(() => {
    setState((prev) => ({
      ...prev,
      mode: 'translation',
      loading: true,
    }));
    setAiMenuOpen(false);
    translateText(state.originalText);
  }, [state.originalText, translateText]);

  const handleAddToAiTutor = useCallback(
    (append = true) => {
      addSnippetContext(state.originalText, undefined, append);
      setState((prev) => ({ ...prev, visible: false }));
      setAiMenuOpen(false);
      window.getSelection()?.removeAllRanges();
    },
    [addSnippetContext, state.originalText]
  );

  const handleAddToNotebook = useCallback(() => {
    window.dispatchEvent(
      new CustomEvent('open-custom-vocab-modal', {
        detail: {
          text: state.originalText,
          explanation: state.translatedText || '',
        },
      })
    );
    setState((prev) => ({ ...prev, visible: false }));
    setAiMenuOpen(false);
    window.getSelection()?.removeAllRanges();
  }, [state.originalText, state.translatedText]);

  const handleCopyOriginal = useCallback(async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!state.originalText) return;
    const ok = await copyToClipboard(state.originalText);
    if (ok) {
      setCopiedOriginal(true);
      setTimeout(() => setCopiedOriginal(false), 2000);
    }
  }, [state.originalText]);

  const handleCopyTranslation = useCallback(async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!state.translatedText) return;
    const ok = await copyToClipboard(state.translatedText);
    if (ok) {
      setCopiedTranslation(true);
      setTimeout(() => setCopiedTranslation(false), 2000);
    }
  }, [state.translatedText]);

  const handleSpeak = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!state.originalText) return;
    speak(state.originalText);
  }, [speak, state.originalText]);

  const cambridgeUrl = state.originalText ? getCambridgeUrl(state.originalText) : '';
  const oxfordUrl = state.originalText ? getOxfordUrl(state.originalText) : '';
  const oxfordInfo = state.originalText ? getBaseFormInfo(state.originalText) : null;

  // Shortcut keys 1 through 7 handler
  useEffect(() => {
    if (!state.visible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not trigger if any modifier key is pressed (avoids browser shortcut conflicts like Ctrl+1..7 / Cmd+1..7)
      if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) {
        return;
      }

      // Do not trigger if user is typing in an input, textarea or contenteditable element
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          (activeEl as HTMLElement).isContentEditable)
      ) {
        return;
      }

      // If AI Tutor sub-menu popover is open
      if (aiMenuOpen) {
        if (e.key === '1' || e.code === 'Digit1' || e.code === 'Numpad1') {
          e.preventDefault();
          handleAddToAiTutor(true); // Chat hiện tại
          return;
        }
        if (e.key === '2' || e.code === 'Digit2' || e.code === 'Numpad2') {
          e.preventDefault();
          handleAddToAiTutor(false); // Chat mới
          return;
        }
        if (e.key === 'Escape') {
          e.preventDefault();
          setAiMenuOpen(false);
          return;
        }
        if (e.key === '6' || e.key === 'Enter') {
          e.preventDefault();
          handleAddToAiTutor(true); // Mặc định chat hiện tại
          return;
        }
      }

      let digit: number | null = null;
      if (e.key >= '1' && e.key <= '7') {
        digit = parseInt(e.key, 10);
      } else if (/^Digit([1-7])$/.test(e.code)) {
        digit = parseInt(e.code.replace('Digit', ''), 10);
      } else if (/^Numpad([1-7])$/.test(e.code)) {
        digit = parseInt(e.code.replace('Numpad', ''), 10);
      }

      if (!digit) return;

      e.preventDefault();

      if (state.mode === 'menu') {
        switch (digit) {
          case 1: // Copy original text
            handleCopyOriginal();
            break;
          case 2: // Cambridge Dictionary
            window.open(cambridgeUrl, '_blank', 'noopener,noreferrer');
            break;
          case 3: // Oxford Dictionary
            window.open(oxfordUrl, '_blank', 'noopener,noreferrer');
            break;
          case 4: // Quick translate
            handleQuickTranslate();
            break;
          case 5: // Pronounce
            handleSpeak();
            break;
          case 6: // Ask AI Tutor: toggle options popover
            setAiMenuOpen((prev) => !prev);
            break;
          case 7: // Save to Notebook
            handleAddToNotebook();
            break;
        }
      } else {
        // Translation Details View
        switch (digit) {
          case 1: // Copy original text
            handleCopyOriginal();
            break;
          case 2: // Cambridge Dictionary
            window.open(cambridgeUrl, '_blank', 'noopener,noreferrer');
            break;
          case 3: // Oxford Dictionary
            window.open(oxfordUrl, '_blank', 'noopener,noreferrer');
            break;
          case 4: // Copy translated text
            handleCopyTranslation();
            break;
          case 5: // Pronounce
            handleSpeak();
            break;
          case 6: // Ask AI Tutor (thêm vào chat hiện tại)
            handleAddToAiTutor(true);
            break;
          case 7: // Save to Notebook
            handleAddToNotebook();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    state.visible,
    state.mode,
    aiMenuOpen,
    cambridgeUrl,
    oxfordUrl,
    handleCopyOriginal,
    handleCopyTranslation,
    handleQuickTranslate,
    handleSpeak,
    handleAddToAiTutor,
    handleAddToNotebook,
  ]);

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
          ? 'flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 p-1.5 rounded-2xl bg-slate-900/95 border border-indigo-500/40 shadow-2xl backdrop-blur-xl max-w-[calc(100vw-24px)]'
          : 'w-88 sm:w-96 max-w-[94vw] rounded-2xl bg-slate-900/95 border border-indigo-500/40 p-4 shadow-2xl backdrop-blur-xl'
      }`}
    >
      {state.mode === 'menu' ? (
        /* Floating Selection Menu */
        <>
          {/* 1. Copy original text */}
          <button
            type="button"
            onClick={handleCopyOriginal}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm whitespace-nowrap ${
              copiedOriginal
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 hover:text-white border border-slate-700/60'
            }`}
            title="Sao chép đoạn văn bản đã chọn (Phím 1)"
          >
            {copiedOriginal ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Đã chép</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-300" />
                <span>Sao chép</span>
              </>
            )}
            <kbd className="hidden sm:inline-flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-mono font-medium rounded bg-slate-700/50 text-slate-300 border border-slate-600/50 ml-0.5">
              1
            </kbd>
          </button>

          {/* 2. Cambridge Dictionary link */}
          <a
            href={cambridgeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/35 text-amber-300 hover:text-amber-200 text-xs font-semibold transition-all shadow-sm group whitespace-nowrap"
            title="Tra từ điển Cambridge (Phím 2)"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>Cambridge</span>
            <ExternalLink className="w-3 h-3 text-amber-400/70 group-hover:text-amber-300" />
            <kbd className="hidden sm:inline-flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-mono font-medium rounded bg-amber-900/40 text-amber-300/80 border border-amber-700/40 ml-0.5">
              2
            </kbd>
          </a>

          {/* 3. Oxford Dictionary link */}
          <a
            href={oxfordUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/35 text-sky-300 hover:text-sky-200 text-xs font-semibold transition-all shadow-sm group whitespace-nowrap"
            title={
              oxfordInfo?.isConverted
                ? `Tra từ điển Oxford (Tự động chuyển về nguyên mẫu: "${oxfordInfo.baseForm}") (Phím 3)`
                : 'Tra từ điển Oxford (Phím 3)'
            }
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-400 group-hover:scale-110 transition-transform" />
            <span>Oxford</span>
            {oxfordInfo?.isConverted && (
              <span className="text-[10px] text-sky-400/80 font-normal">
                ({oxfordInfo.baseForm})
              </span>
            )}
            <ExternalLink className="w-3 h-3 text-sky-400/70 group-hover:text-sky-300" />
            <kbd className="hidden sm:inline-flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-mono font-medium rounded bg-sky-900/40 text-sky-300/80 border border-sky-700/40 ml-0.5">
              3
            </kbd>
          </a>

          <div className="w-px h-4 bg-slate-700/80 hidden sm:block" />

          {/* 4. Quick Translate button */}
          <button
            type="button"
            onClick={handleQuickTranslate}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/35 border border-indigo-500/30 text-indigo-300 hover:text-white text-xs font-semibold transition-all shadow-sm whitespace-nowrap"
            title="Dịch nhanh đoạn này sang tiếng Việt (Phím 4)"
          >
            <Languages className="w-3.5 h-3.5 text-indigo-400" />
            <span>Dịch nhanh</span>
            <kbd className="hidden sm:inline-flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-mono font-medium rounded bg-indigo-900/40 text-indigo-300/80 border border-indigo-700/40 ml-0.5">
              4
            </kbd>
          </button>

          {/* 5. Pronounce original text */}
          <button
            type="button"
            onClick={handleSpeak}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/35 border border-blue-500/30 text-blue-300 hover:text-white text-xs font-semibold transition-all shadow-sm whitespace-nowrap"
            title="Nghe phát âm tiếng Anh (Phím 5)"
          >
            <Volume2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Phát âm</span>
            <kbd className="hidden sm:inline-flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-mono font-medium rounded bg-blue-900/40 text-blue-300/80 border border-blue-700/40 ml-0.5">
              5
            </kbd>
          </button>

          <div className="w-px h-4 bg-slate-700/80 hidden sm:block" />

          {/* 6. Ask AI Tutor with dropdown: Chat hiện tại hoặc Chat mới */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setAiMenuOpen((prev) => !prev)}
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all shadow-sm whitespace-nowrap ${
                aiMenuOpen
                  ? 'bg-violet-600/40 border-violet-400 text-white shadow-violet-500/20'
                  : 'bg-violet-600/20 hover:bg-violet-600/35 border-violet-500/30 text-violet-300 hover:text-white'
              }`}
              title="Hỏi AI Tutor: Thêm vào chat hiện tại hoặc tạo chat mới (Phím 6)"
            >
              <Bot className="w-3.5 h-3.5 text-violet-400" />
              <span>Hỏi AI</span>
              <ChevronDown
                className={`w-3 h-3 text-violet-300/70 transition-transform duration-150 ${
                  aiMenuOpen ? 'rotate-180' : ''
                }`}
              />
              <kbd className="hidden sm:inline-flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-mono font-medium rounded bg-violet-900/40 text-violet-300/80 border border-violet-700/40 ml-0.5">
                6
              </kbd>
            </button>

            {/* Sub-menu popover: Chat hiện tại vs Chat mới */}
            {aiMenuOpen && (
              <div
                className={`absolute z-60 ${
                  state.isAbove ? 'top-full mt-2' : 'bottom-full mb-2'
                } left-1/2 -translate-x-1/2 w-56 p-1.5 rounded-2xl bg-slate-900/98 border border-violet-500/40 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95`}
              >
                <div className="px-2.5 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800/80 mb-1 flex items-center justify-between">
                  <span>Hỏi AI Tutor</span>
                  <span className="text-[9px] text-violet-400 lowercase font-normal">chọn ngữ cảnh</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddToAiTutor(true)}
                  className="w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-xs font-medium text-slate-200 hover:text-white hover:bg-indigo-600/30 transition-colors text-left group"
                  title="Thêm ngữ cảnh vào cuộc trò chuyện đang có"
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
                    <span>Chat hiện tại</span>
                  </span>
                  <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    1
                  </kbd>
                </button>
                <button
                  type="button"
                  onClick={() => handleAddToAiTutor(false)}
                  className="w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-xs font-medium text-slate-200 hover:text-white hover:bg-violet-600/30 transition-colors text-left group"
                  title="Mở cuộc trò chuyện mới tinh chỉ với ngữ cảnh này"
                >
                  <span className="flex items-center gap-2">
                    <MessageSquarePlus className="w-3.5 h-3.5 text-violet-400 group-hover:scale-110 transition-transform" />
                    <span>Tạo chat mới</span>
                  </span>
                  <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    2
                  </kbd>
                </button>
              </div>
            )}
          </div>

          {/* 7. Add to Notebook */}
          <button
            type="button"
            onClick={handleAddToNotebook}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/35 border border-emerald-500/35 text-emerald-300 hover:text-white text-xs font-semibold transition-all shadow-sm whitespace-nowrap"
            title="Lưu vào Sổ tay cá nhân (Phím 7)"
          >
            <BookmarkPlus className="w-3.5 h-3.5 text-emerald-400" />
            <span>Lưu Sổ tay</span>
            <kbd className="hidden sm:inline-flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-mono font-medium rounded bg-emerald-900/40 text-emerald-300/80 border border-emerald-700/40 ml-0.5">
              7
            </kbd>
          </button>

          <div className="w-px h-4 bg-slate-700/80 hidden sm:block" />

          {/* Close menu (No shortcut number 9, dismissable by click or Escape) */}
          <button
            type="button"
            onClick={() => {
              setState((prev) => ({ ...prev, visible: false }));
              setAiMenuOpen(false);
            }}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Đóng menu (Esc)"
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
              {/* 5. Pronounce in header */}
              <button
                type="button"
                onClick={handleSpeak}
                className="flex items-center gap-1 p-1.5 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors"
                title="Nghe phát âm tiếng Anh (Phím 5)"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <kbd className="hidden sm:inline-flex items-center justify-center min-w-3.5 h-3.5 px-0.5 text-[9px] font-mono font-medium rounded bg-slate-800 text-slate-400 border border-slate-700">
                  5
                </kbd>
              </button>

              {/* 1. Copy original text in header */}
              <button
                type="button"
                onClick={handleCopyOriginal}
                className="flex items-center gap-1 p-1.5 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors"
                title={copiedOriginal ? 'Đã sao chép đoạn tiếng Anh' : 'Sao chép đoạn tiếng Anh (Phím 1)'}
              >
                {copiedOriginal ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <kbd className="hidden sm:inline-flex items-center justify-center min-w-3.5 h-3.5 px-0.5 text-[9px] font-mono font-medium rounded bg-slate-800 text-slate-400 border border-slate-700">
                  1
                </kbd>
              </button>

              {/* Close in header (No shortcut number 9, dismissable by click or Escape) */}
              <button
                type="button"
                onClick={() => {
                  setState((prev) => ({ ...prev, visible: false }));
                  setAiMenuOpen(false);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                title="Đóng cửa sổ dịch (Esc)"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Selected English text snippet */}
          <div className="mb-2.5">
            <p className="text-xs text-slate-300 italic line-clamp-3 leading-relaxed bg-slate-950/40 p-2 rounded-lg border border-slate-800/50">
              &ldquo;{state.originalText}&rdquo;
            </p>

            {/* Quick Dictionary lookup buttons inside translation card */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="text-[11px] text-slate-400 font-medium">Tra từ điển:</span>
              {/* 2. Cambridge */}
              <a
                href={cambridgeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-semibold bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 transition-all group"
                title="Mở Cambridge Advanced Learner's Dictionary (Phím 2)"
              >
                <BookOpen className="w-3 h-3 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>Cambridge</span>
                <ExternalLink className="w-2.5 h-2.5 text-amber-400/70" />
                <kbd className="hidden sm:inline-flex items-center justify-center min-w-3.5 h-3.5 px-0.5 text-[9px] font-mono font-medium rounded bg-amber-950/60 text-amber-300 border border-amber-700/50">
                  2
                </kbd>
              </a>

              {/* 3. Oxford */}
              <a
                href={oxfordUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-semibold bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border border-sky-500/30 transition-all group"
                title={
                  oxfordInfo?.isConverted
                    ? `Mở Oxford Learner's Dictionaries (Tự động chuyển về nguyên mẫu: "${oxfordInfo.baseForm}") (Phím 3)`
                    : "Mở Oxford Learner's Dictionaries (OALD) (Phím 3)"
                }
              >
                <BookOpen className="w-3 h-3 text-sky-400 group-hover:scale-110 transition-transform" />
                <span>Oxford</span>
                {oxfordInfo?.isConverted && (
                  <span className="text-[10px] text-sky-400/80 font-normal">
                    ({oxfordInfo.baseForm})
                  </span>
                )}
                <ExternalLink className="w-2.5 h-2.5 text-sky-400/70" />
                <kbd className="hidden sm:inline-flex items-center justify-center min-w-3.5 h-3.5 px-0.5 text-[9px] font-mono font-medium rounded bg-sky-950/60 text-sky-300 border border-sky-700/50">
                  3
                </kbd>
              </a>
            </div>
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
                <div className="flex items-center justify-between gap-2 pt-1 flex-wrap">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {state.providerUsed && (
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md border ${
                          state.providerUsed === 'gemini'
                            ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                            : state.providerUsed === 'cloudflare'
                            ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                            : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                        title={state.fallbackReason || `Dịch bởi ${TRANSLATION_PROVIDER_LABELS[state.providerUsed]}`}
                      >
                        {TRANSLATION_PROVIDER_LABELS[state.providerUsed]}
                        {state.fallback ? ' (dự phòng)' : ''}
                      </span>
                    )}
                    <select
                      value={translationProvider}
                      onChange={(e) => {
                        const next = e.target.value as TranslationProvider;
                        setTranslationProvider(next);
                        translateText(state.originalText, next);
                      }}
                      aria-label="Chọn nhà cung cấp dịch"
                      className="bg-slate-900 border border-slate-700/80 rounded-md px-1.5 py-0.5 text-[10px] text-slate-300 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="mymemory">MyMemory</option>
                      <option value="gemini">Gemini AI</option>
                      <option value="cloudflare">Cloudflare AI</option>
                      <option value="auto">Tự động</option>
                    </select>
                  </div>
                  {/* 4. Copy translation in details card */}
                  <button
                    type="button"
                    onClick={handleCopyTranslation}
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-slate-200 transition-colors"
                    title="Sao chép bản dịch tiếng Việt (Phím 4)"
                  >
                    {copiedTranslation ? (
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
                    <kbd className="hidden sm:inline-flex items-center justify-center min-w-3.5 h-3.5 px-1 text-[9px] font-mono font-medium rounded bg-slate-800 text-slate-400 border border-slate-700">
                      4
                    </kbd>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 6. Action: Hỏi AI Tutor (Chat hiện tại hoặc Chat mới) */}
          <div className="space-y-1.5 mb-2.5">
            <div className="flex items-center justify-between px-0.5">
              <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                <Bot className="w-3.5 h-3.5 text-indigo-400" />
                <span>Hỏi AI Tutor về đoạn này:</span>
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleAddToAiTutor(true)}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/35 border border-indigo-500/30 text-indigo-200 hover:text-white text-xs font-semibold transition-all shadow-sm group"
                title="Thêm ngữ cảnh vào cuộc trò chuyện đang có (Phím 6)"
              >
                <MessageSquare className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
                <span>Chat hiện tại</span>
                <kbd className="hidden sm:inline-flex items-center justify-center min-w-4 h-4 px-1 text-[9px] font-mono font-medium rounded bg-indigo-900/40 text-indigo-300 border border-indigo-700/40">
                  6
                </kbd>
              </button>
              <button
                type="button"
                onClick={() => handleAddToAiTutor(false)}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-violet-600/20 hover:bg-violet-600/35 border border-violet-500/30 text-violet-200 hover:text-white text-xs font-semibold transition-all shadow-sm group"
                title="Bắt đầu cuộc trò chuyện AI mới tinh với đoạn văn bản này"
              >
                <MessageSquarePlus className="w-3.5 h-3.5 text-violet-400 group-hover:scale-110 transition-transform" />
                <span>Tạo chat mới</span>
              </button>
            </div>
          </div>

          {/* 7. Action: Save to Personal Notebook */}
          <button
            type="button"
            onClick={handleAddToNotebook}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600/25 hover:bg-emerald-600/40 border border-emerald-500/35 text-emerald-200 hover:text-white text-xs font-semibold transition-all mb-2 shadow-sm"
            title="Lưu vào Sổ tay cá nhân (Phím 7)"
          >
            <BookmarkPlus className="w-3.5 h-3.5 text-emerald-400" />
            <span>Lưu vào Sổ tay cá nhân</span>
            <kbd className="hidden sm:inline-flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-mono font-medium rounded bg-emerald-900/50 text-emerald-300 border border-emerald-700/50 ml-1">
              7
            </kbd>
          </button>

          {/* Micro footer hint with shortcut key map */}
          <div className="pt-1 border-t border-slate-800/60">
            <div className="text-[10px] text-slate-500 text-center flex items-center justify-between mb-1">
              <span>Bôi đen bất kỳ đoạn nào để tra cứu</span>
              <button
                type="button"
                onClick={() => {
                  const next = !isEnabled;
                  setIsEnabled(next);
                  localStorage.setItem('selection_translate_enabled', String(next));
                  if (!next) {
                    setState((prev) => ({ ...prev, visible: false }));
                    setAiMenuOpen(false);
                  }
                }}
                className="text-slate-400 hover:text-indigo-400 transition-colors underline"
              >
                {isEnabled ? 'Tắt menu nhanh' : 'Bật menu nhanh'}
              </button>
            </div>
            <p className="text-[10px] text-slate-500 text-center font-mono">
              Phím tắt: [1] Chép • [2] Cambridge • [3] Oxford • [4] Dịch/Chép • [5] Loa • [6] AI • [7] Sổ tay • [Esc] Đóng
            </p>
          </div>
        </>
      )}
    </div>
  );
}
