'use client';

import React, { useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  RefreshCw,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { useSpeech } from '@/hooks/useSpeech';
import { useTranslate } from '@/hooks/useTranslate';
import { useChat } from '@/contexts/ChatContext';
import { getCambridgeUrl, getOxfordUrl, getBaseFormInfo } from '@/lib/dictionary';
import { TranslationProvider } from '@/types/progress';
import { TRANSLATION_PROVIDER_LABELS } from '@/lib/translate-client';
import {
  TRANSLATION_GEMINI_MODELS,
  TRANSLATION_CLOUDFLARE_MODELS,
  MAX_TRANSLATE_TEXT_LENGTH,
  formatShortModelName,
} from '@/lib/translate-models';
import { allVocabularyWords } from '@/data/vocabulary';
import {
  findSystemVocabMatchesForSelection,
  getLevelBadgeColor,
  getSystemWordDetailUrl,
  MATCH_TYPE_LABELS,
  VocabMatchType,
} from '@/lib/selection-vocab-search';

interface SelectionRect {
  top: number;
  bottom: number;
  left: number;
  width: number;
}

interface SelectionState {
  originalText: string;
  translatedText: string | null;
  providerUsed: 'mymemory' | 'gemini' | 'cloudflare' | null;
  modelUsed: string | null;
  fallback: boolean;
  fallbackReason: string | null;
  loading: boolean;
  error: string | null;
  selectionRect: SelectionRect | null;
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

const MATCH_TYPE_BADGE_CLASS: Record<VocabMatchType, string> = {
  headword: 'bg-teal-500/20 text-teal-200 border-teal-400/40',
  'word-family': 'bg-violet-500/20 text-violet-200 border-violet-400/40',
  synonym: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40',
  antonym: 'bg-rose-500/20 text-rose-200 border-rose-400/40',
  related: 'bg-amber-500/20 text-amber-200 border-amber-400/40',
  collocation: 'bg-sky-500/20 text-sky-200 border-sky-400/40',
};

export function SelectionTranslator() {
  const router = useRouter();
  const { addSnippetContext } = useChat();
  const { speak } = useSpeech();
  const {
    translate,
    translationProvider,
    setTranslationProvider,
    geminiModel,
    setGeminiModel,
    cloudflareModel,
    setCloudflareModel,
  } = useTranslate();

  const [state, setState] = useState<SelectionState>({
    originalText: '',
    translatedText: null,
    providerUsed: null,
    modelUsed: null,
    fallback: false,
    fallbackReason: null,
    loading: false,
    error: null,
    selectionRect: null,
    visible: false,
    mode: 'menu',
  });

  const [copiedOriginal, setCopiedOriginal] = useState(false);
  const [copiedTranslation, setCopiedTranslation] = useState(false);
  const [aiMenuOpen, setAiMenuOpen] = useState(false);
  const [vocabMenuOpen, setVocabMenuOpen] = useState(false);
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
    async (
      text: string,
      options?: {
        provider?: TranslationProvider;
        geminiModel?: string;
        cloudflareModel?: string;
        skipCache?: boolean;
      }
    ) => {
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
        modelUsed: null,
        fallback: false,
        fallbackReason: null,
      }));

      try {
        const data = await translate(text, {
          from: 'en',
          to: 'vi',
          provider: options?.provider,
          geminiModel: options?.geminiModel,
          cloudflareModel: options?.cloudflareModel,
          skipCache: options?.skipCache,
          signal: controller.signal,
        });

        setState((prev) => ({
          ...prev,
          loading: false,
          translatedText: data.translatedText || 'Không có bản dịch',
          providerUsed: data.provider || null,
          modelUsed: data.model || null,
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
    // Only trigger for meaningful text (2 to MAX_TRANSLATE_TEXT_LENGTH characters)
    if (!rawText || rawText.length < 2 || rawText.length > MAX_TRANSLATE_TEXT_LENGTH) {
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

      setState({
        originalText: rawText,
        translatedText: null,
        providerUsed: null,
        modelUsed: null,
        fallback: false,
        fallbackReason: null,
        loading: false,
        error: null,
        selectionRect: {
          top: rect.top,
          bottom: rect.bottom,
          left: rect.left,
          width: rect.width,
        },
        visible: true,
        mode: 'menu',
      });
      setCopiedOriginal(false);
      setCopiedTranslation(false);
      setAiMenuOpen(false);
      setVocabMenuOpen(false);
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
        setVocabMenuOpen(false);
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
        setVocabMenuOpen(false);
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

  const handleCloseAfterNavigate = useCallback(() => {
    setState((prev) => ({ ...prev, visible: false }));
    setAiMenuOpen(false);
    setVocabMenuOpen(false);
    window.getSelection()?.removeAllRanges();
  }, []);

  const handleQuickTranslate = useCallback(() => {
    setState((prev) => ({
      ...prev,
      mode: 'translation',
      loading: true,
    }));
    setAiMenuOpen(false);
    setVocabMenuOpen(false);
    translateText(state.originalText);
  }, [state.originalText, translateText]);

  const handleAddToAiTutor = useCallback(
    (append = true) => {
      addSnippetContext(state.originalText, undefined, append);
      setState((prev) => ({ ...prev, visible: false }));
      setAiMenuOpen(false);
      setVocabMenuOpen(false);
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
    setVocabMenuOpen(false);
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

  const vocabSearch = useMemo(() => {
    if (!state.visible || !state.originalText) return null;
    return findSystemVocabMatchesForSelection(state.originalText, allVocabularyWords, {
      maxResults: 12,
    });
  }, [state.visible, state.originalText]);

  const vocabMatches = useMemo(() => vocabSearch?.matches ?? [], [vocabSearch]);
  const totalVocabMatches = vocabSearch?.totalMatches ?? 0;

  // Shortcut keys 1 through 8 handler
  useEffect(() => {
    if (!state.visible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not trigger if any modifier key is pressed (avoids browser shortcut conflicts like Ctrl+1..8 / Cmd+1..8)
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

      // If System Vocab matches drawer is open
      if (vocabMenuOpen) {
        if (e.key === 'Escape') {
          e.preventDefault();
          setVocabMenuOpen(false);
          return;
        }
        if (e.key === '8' || e.code === 'Digit8' || e.code === 'Numpad8') {
          e.preventDefault();
          setVocabMenuOpen(false);
          return;
        }
        const navMatch = e.key >= '1' && e.key <= '9' ? parseInt(e.key, 10) : null;
        if (navMatch && navMatch <= vocabMatches.length) {
          e.preventDefault();
          const chosen = vocabMatches[navMatch - 1];
          handleCloseAfterNavigate();
          router.push(getSystemWordDetailUrl(chosen.word.id));
          return;
        }
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
      if (e.key >= '1' && e.key <= '8') {
        digit = parseInt(e.key, 10);
      } else if (/^Digit([1-8])$/.test(e.code)) {
        digit = parseInt(e.code.replace('Digit', ''), 10);
      } else if (/^Numpad([1-8])$/.test(e.code)) {
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
            setVocabMenuOpen(false);
            setAiMenuOpen((prev) => !prev);
            break;
          case 7: // Save to Notebook
            handleAddToNotebook();
            break;
          case 8: // System Vocabulary detail link
            if (vocabMatches.length === 1) {
              const target = vocabMatches[0];
              handleCloseAfterNavigate();
              router.push(getSystemWordDetailUrl(target.word.id));
            } else if (vocabMatches.length > 1) {
              setAiMenuOpen(false);
              setVocabMenuOpen((prev) => !prev);
            }
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
          case 8: // Open primary matched system vocab word
            if (vocabMatches.length > 0) {
              const target = vocabMatches[0];
              handleCloseAfterNavigate();
              router.push(getSystemWordDetailUrl(target.word.id));
            }
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
    vocabMenuOpen,
    vocabMatches,
    cambridgeUrl,
    oxfordUrl,
    router,
    handleCopyOriginal,
    handleCopyTranslation,
    handleQuickTranslate,
    handleSpeak,
    handleAddToAiTutor,
    handleAddToNotebook,
    handleCloseAfterNavigate,
  ]);

  const positionTooltip = useCallback(() => {
    const el = tooltipRef.current;
    const rect = state.selectionRect;
    if (!state.visible || !el || !rect) return;

    const padding = 12;
    const gap = 10;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const { width: popupWidth, height: popupHeight } = el.getBoundingClientRect();

    const maxLeft = Math.max(padding, vw - popupWidth - padding);
    const rawLeft = rect.left + rect.width / 2 - popupWidth / 2;
    const left = Math.min(maxLeft, Math.max(padding, rawLeft));

    // Reserve sticky navbar height (~64px) when deciding whether to prefer placing above
    const stickyHeaderEl = document.querySelector('header');
    const headerBottom = stickyHeaderEl
      ? Math.max(0, stickyHeaderEl.getBoundingClientRect().bottom)
      : 0;
    const preferredTopBound = Math.max(padding, headerBottom + 8);

    const spaceAbovePreferred = rect.top - preferredTopBound;
    const spaceBelow = vh - rect.bottom - padding;

    let rawTop: number;
    if (spaceAbovePreferred >= popupHeight + gap) {
      rawTop = rect.top - popupHeight - gap;
    } else if (spaceBelow >= popupHeight + gap) {
      rawTop = rect.bottom + gap;
    } else if (spaceBelow >= rect.top - padding) {
      rawTop = rect.bottom + gap;
    } else {
      rawTop = rect.top - popupHeight - gap;
    }

    // Clamp strictly inside the viewport so the popup is never cut off on any edge
    const maxTop = Math.max(padding, vh - popupHeight - padding);
    const top = Math.min(maxTop, Math.max(padding, rawTop));

    el.style.top = `${Math.round(top)}px`;
    el.style.left = `${Math.round(left)}px`;
  }, [state.visible, state.selectionRect]);

  useLayoutEffect(() => {
    if (!state.visible) return;
    positionTooltip();

    const el = tooltipRef.current;
    const observer =
      el && typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => positionTooltip())
        : null;
    if (el && observer) {
      observer.observe(el);
    }

    window.addEventListener('resize', positionTooltip);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', positionTooltip);
    };
  }, [
    state.visible,
    state.mode,
    state.loading,
    state.translatedText,
    state.error,
    state.originalText,
    state.selectionRect,
    vocabMenuOpen,
    vocabMatches.length,
    positionTooltip,
  ]);

  if (!state.visible) return null;

  const openAiBelow = state.selectionRect ? state.selectionRect.top < 220 : true;
  const primaryMatch = vocabMatches[0];
  const hasMultipleMatches = vocabMatches.length > 1;
  const showNormalizedHint = Boolean(
    vocabSearch &&
      vocabSearch.normalizedBase &&
      vocabSearch.cleanedSelection &&
      vocabSearch.normalizedBase.toLowerCase() !== vocabSearch.cleanedSelection.toLowerCase()
  );

  const renderSystemVocabMatchesList = (showShortcutDigits: boolean) => (
    <div className="space-y-1.5 max-h-56 overflow-y-auto pr-0.5">
      {vocabMatches.map((m, idx) => (
        <Link
          key={m.word.id}
          href={getSystemWordDetailUrl(m.word.id)}
          onClick={handleCloseAfterNavigate}
          className="flex items-start justify-between gap-2 p-2 rounded-xl bg-slate-950/75 hover:bg-teal-950/40 border border-slate-800/80 hover:border-teal-500/40 transition-all group"
        >
          <div className="min-w-0 flex-1 space-y-0.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-white group-hover:text-teal-200 transition-colors">
                {m.word.word}
              </span>
              {m.word.pronunciation?.ipa && (
                <span className="text-[10px] font-mono text-indigo-300/80">
                  {m.word.pronunciation.ipa}
                </span>
              )}
              <span
                className={`text-[9px] font-semibold px-1.5 py-0.2 rounded-full border ${getLevelBadgeColor(m.word.level)}`}
              >
                {m.word.level}
              </span>
              <span
                className={`text-[9px] font-semibold px-1.5 py-0.2 rounded-full border ${MATCH_TYPE_BADGE_CLASS[m.matchType]}`}
              >
                {MATCH_TYPE_LABELS[m.matchType]}
                {m.familyPos ? ` (${m.familyPos})` : ''}
              </span>
            </div>
            {m.matchType !== 'headword' && (
              <p className="text-[10px] text-teal-300/85 truncate">
                Khớp {MATCH_TYPE_LABELS[m.matchType].toLowerCase()}: &ldquo;{m.matchedTerm}&rdquo;
              </p>
            )}
            {m.word.deepMeaning?.coreConcept && (
              <p className="text-[11px] text-slate-400 line-clamp-1">
                {m.word.deepMeaning.coreConcept}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0 pt-0.5">
            {showShortcutDigits && idx < 9 && (
              <kbd className="hidden sm:inline-flex items-center justify-center min-w-4 h-4 px-1 text-[9px] font-mono font-medium rounded bg-slate-800 text-slate-400 border border-slate-700">
                {idx + 1}
              </kbd>
            )}
            <ArrowUpRight className="w-3.5 h-3.5 text-teal-400/80 group-hover:text-teal-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <div
      ref={tooltipRef}
      className={`fixed z-[70] animate-in fade-in duration-150 ${
        state.mode === 'menu'
          ? vocabMenuOpen
            ? 'flex flex-col gap-2 p-2 rounded-2xl bg-slate-900/95 border border-indigo-500/40 shadow-2xl backdrop-blur-xl w-[min(24rem,calc(100vw-24px))] max-w-[calc(100vw-24px)]'
            : 'flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 p-1.5 rounded-2xl bg-slate-900/95 border border-indigo-500/40 shadow-2xl backdrop-blur-xl max-w-[calc(100vw-24px)]'
          : `${
              state.originalText.length > 250 ? 'w-88 sm:w-[28rem]' : 'w-88 sm:w-96'
            } max-w-[calc(100vw-24px)] max-h-[calc(100vh-24px)] overflow-y-auto rounded-2xl bg-slate-900/95 border border-indigo-500/40 p-4 shadow-2xl backdrop-blur-xl`
      }`}
    >
      {state.mode === 'menu' ? (
        /* Floating Selection Menu */
        <>
          <div className={vocabMenuOpen ? 'flex flex-wrap items-center justify-center gap-1 sm:gap-1.5' : 'contents'}>
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
              onClick={() => {
                setVocabMenuOpen(false);
                setAiMenuOpen((prev) => !prev);
              }}
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
                  openAiBelow ? 'top-full mt-2' : 'bottom-full mb-2'
                } left-1/2 -translate-x-1/2 w-56 max-w-[calc(100vw-24px)] p-1.5 rounded-2xl bg-slate-900/98 border border-violet-500/40 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95`}
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

          {/* 8. Link to System Vocabulary detail (if matched directly or via Mind Map) */}
          {primaryMatch && (
            hasMultipleMatches ? (
              <button
                type="button"
                onClick={() => {
                  setAiMenuOpen(false);
                  setVocabMenuOpen((prev) => !prev);
                }}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all shadow-sm whitespace-nowrap ${
                  vocabMenuOpen
                    ? 'bg-teal-500/35 border-teal-400 text-white shadow-teal-500/20'
                    : 'bg-teal-500/20 hover:bg-teal-500/30 border-teal-400/40 text-teal-200 hover:text-white'
                }`}
                title={`Tìm thấy ${totalVocabMatches} từ vựng liên quan trong hệ thống (Phím 8)`}
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-300" />
                <span>{primaryMatch.word.word}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-teal-950/70 text-teal-300 border border-teal-500/30">
                  +{totalVocabMatches - 1}
                </span>
                <ChevronDown
                  className={`w-3 h-3 text-teal-300/80 transition-transform duration-150 ${
                    vocabMenuOpen ? 'rotate-180' : ''
                  }`}
                />
                <kbd className="hidden sm:inline-flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-mono font-medium rounded bg-teal-900/50 text-teal-200 border border-teal-600/40 ml-0.5">
                  8
                </kbd>
              </button>
            ) : (
              <Link
                href={getSystemWordDetailUrl(primaryMatch.word.id)}
                onClick={handleCloseAfterNavigate}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/35 border border-teal-400/45 text-teal-200 hover:text-white text-xs font-semibold transition-all shadow-sm group whitespace-nowrap"
                title={`Mở chi tiết từ "${primaryMatch.word.word}" (${MATCH_TYPE_LABELS[primaryMatch.matchType]}: "${primaryMatch.matchedTerm}") (Phím 8)`}
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-300 group-hover:scale-110 transition-transform" />
                <span>{primaryMatch.word.word}</span>
                {primaryMatch.matchType !== 'headword' && (
                  <span className="text-[10px] text-teal-300/85 font-normal">
                    ({MATCH_TYPE_LABELS[primaryMatch.matchType]})
                  </span>
                )}
                <ArrowUpRight className="w-3 h-3 text-teal-300/80 group-hover:text-teal-200" />
                <kbd className="hidden sm:inline-flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-mono font-medium rounded bg-teal-900/50 text-teal-200 border border-teal-600/40 ml-0.5">
                  8
                </kbd>
              </Link>
            )
          )}

          <div className="w-px h-4 bg-slate-700/80 hidden sm:block" />

          {/* Close menu (No shortcut number 9, dismissable by click or Escape) */}
          <button
            type="button"
            onClick={() => {
              setState((prev) => ({ ...prev, visible: false }));
              setAiMenuOpen(false);
              setVocabMenuOpen(false);
            }}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Đóng menu (Esc)"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          </div>

          {/* Expandable System Vocabulary Matches Panel inside floating menu */}
          {vocabMenuOpen && vocabMatches.length > 0 && (
            <div className="pt-2 border-t border-slate-800/90 space-y-2 animate-in fade-in duration-150">
              <div className="flex items-center justify-between gap-2 px-1">
                <span className="text-[11px] font-bold text-teal-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  <span>Từ vựng hệ thống ({totalVocabMatches})</span>
                </span>
                {showNormalizedHint && vocabSearch && (
                  <span className="text-[10px] text-slate-400 font-mono truncate">
                    nguyên mẫu: &ldquo;{vocabSearch.normalizedBase}&rdquo;
                  </span>
                )}
              </div>
              {renderSystemVocabMatchesList(true)}
            </div>
          )}
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
                  setVocabMenuOpen(false);
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
            <p className="text-xs text-slate-300 italic max-h-24 overflow-y-auto leading-relaxed bg-slate-950/40 p-2 rounded-lg border border-slate-800/50">
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

          {/* System Vocabulary Matches (including Mind Map scope) */}
          {vocabMatches.length > 0 && (
            <div className="p-2.5 rounded-xl bg-teal-950/20 border border-teal-500/30 mb-2.5 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-teal-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  <span>Từ vựng hệ thống ({totalVocabMatches})</span>
                </span>
                {showNormalizedHint && vocabSearch && (
                  <span className="text-[10px] text-teal-300/80 font-mono truncate">
                    nguyên mẫu: &ldquo;{vocabSearch.normalizedBase}&rdquo;
                  </span>
                )}
              </div>
              {renderSystemVocabMatchesList(false)}
            </div>
          )}

          {/* Translated Vietnamese result */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 mb-2.5">
            {state.loading ? (
              <div className="flex items-center gap-2 py-1 text-xs text-indigo-300">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                <span>Đang dịch tự động sang tiếng Việt...</span>
              </div>
            ) : state.error ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-rose-400">{state.error}</p>
                  <button
                    type="button"
                    onClick={() => translateText(state.originalText, { skipCache: true })}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-200 text-[11px] font-semibold transition-colors shrink-0"
                    title="Thử dịch lại"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Thử lại</span>
                  </button>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-slate-800/60">
                  <select
                    value={translationProvider}
                    onChange={(e) => {
                      const next = e.target.value as TranslationProvider;
                      setTranslationProvider(next);
                      translateText(state.originalText, { provider: next, skipCache: true });
                    }}
                    aria-label="Chọn nhà cung cấp dịch"
                    className="bg-slate-900 border border-slate-700/80 rounded-md px-1.5 py-0.5 text-[10px] text-slate-300 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="mymemory">MyMemory</option>
                    <option value="gemini">Gemini AI</option>
                    <option value="cloudflare">Cloudflare AI</option>
                    <option value="auto">Tự động</option>
                  </select>
                  {(translationProvider === 'gemini' || translationProvider === 'auto') && (
                    <select
                      value={geminiModel}
                      onChange={(e) => {
                        const nextModel = e.target.value;
                        setGeminiModel(nextModel);
                        translateText(state.originalText, {
                          provider: translationProvider,
                          geminiModel: nextModel,
                          skipCache: true,
                        });
                      }}
                      aria-label="Chọn AI model Gemini"
                      className="bg-slate-900 border border-emerald-500/40 rounded-md px-1.5 py-0.5 text-[10px] text-emerald-300 focus:outline-none focus:border-emerald-400 max-w-[140px]"
                    >
                      {TRANSLATION_GEMINI_MODELS.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.id}
                        </option>
                      ))}
                    </select>
                  )}
                  {translationProvider === 'cloudflare' && (
                    <select
                      value={cloudflareModel}
                      onChange={(e) => {
                        const nextModel = e.target.value;
                        setCloudflareModel(nextModel);
                        translateText(state.originalText, {
                          provider: 'cloudflare',
                          cloudflareModel: nextModel,
                          skipCache: true,
                        });
                      }}
                      aria-label="Chọn AI model Cloudflare"
                      className="bg-slate-900 border border-amber-500/40 rounded-md px-1.5 py-0.5 text-[10px] text-amber-300 focus:outline-none focus:border-amber-400 max-w-[140px]"
                    >
                      {TRANSLATION_CLOUDFLARE_MODELS.map((m) => (
                        <option key={m.id} value={m.id}>
                          {formatShortModelName(m.id)}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm font-medium text-emerald-300 leading-relaxed selection:bg-emerald-500/30">
                  {state.translatedText}
                </p>
                <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-slate-800/60 flex-wrap">
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
                        title={
                          state.fallbackReason ||
                          `Dịch bởi ${TRANSLATION_PROVIDER_LABELS[state.providerUsed]}${
                            state.modelUsed ? ` (${state.modelUsed})` : ''
                          }`
                        }
                      >
                        {TRANSLATION_PROVIDER_LABELS[state.providerUsed]}
                        {state.modelUsed ? ` · ${formatShortModelName(state.modelUsed)}` : ''}
                        {state.fallback ? ' (dự phòng)' : ''}
                      </span>
                    )}
                    <select
                      value={translationProvider}
                      onChange={(e) => {
                        const next = e.target.value as TranslationProvider;
                        setTranslationProvider(next);
                        translateText(state.originalText, {
                          provider: next,
                          skipCache: true,
                        });
                      }}
                      aria-label="Chọn nhà cung cấp dịch"
                      className="bg-slate-900 border border-slate-700/80 rounded-md px-1.5 py-0.5 text-[10px] text-slate-300 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="mymemory">MyMemory</option>
                      <option value="gemini">Gemini AI</option>
                      <option value="cloudflare">Cloudflare AI</option>
                      <option value="auto">Tự động</option>
                    </select>
                    {(translationProvider === 'gemini' || translationProvider === 'auto') && (
                      <select
                        value={geminiModel}
                        onChange={(e) => {
                          const nextModel = e.target.value;
                          setGeminiModel(nextModel);
                          translateText(state.originalText, {
                            provider: translationProvider,
                            geminiModel: nextModel,
                            skipCache: true,
                          });
                        }}
                        aria-label="Chọn AI model Gemini"
                        title="Chọn model Gemini để dịch"
                        className="bg-slate-900 border border-emerald-500/40 rounded-md px-1.5 py-0.5 text-[10px] text-emerald-300 focus:outline-none focus:border-emerald-400 max-w-[140px]"
                      >
                        {TRANSLATION_GEMINI_MODELS.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.id}
                          </option>
                        ))}
                      </select>
                    )}
                    {translationProvider === 'cloudflare' && (
                      <select
                        value={cloudflareModel}
                        onChange={(e) => {
                          const nextModel = e.target.value;
                          setCloudflareModel(nextModel);
                          translateText(state.originalText, {
                            provider: 'cloudflare',
                            cloudflareModel: nextModel,
                            skipCache: true,
                          });
                        }}
                        aria-label="Chọn AI model Cloudflare"
                        title="Chọn model Cloudflare AI để dịch"
                        className="bg-slate-900 border border-amber-500/40 rounded-md px-1.5 py-0.5 text-[10px] text-amber-300 focus:outline-none focus:border-amber-400 max-w-[140px]"
                      >
                        {TRANSLATION_CLOUDFLARE_MODELS.map((m) => (
                          <option key={m.id} value={m.id}>
                            {formatShortModelName(m.id)}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                  <div className="flex items-center gap-2.5 ml-auto">
                    <button
                      type="button"
                      onClick={() =>
                        translateText(state.originalText, { skipCache: true })
                      }
                      className="flex items-center gap-1 text-[11px] font-semibold text-indigo-300 hover:text-indigo-200 transition-colors"
                      title="Dịch lại (bỏ qua cache)"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Dịch lại</span>
                    </button>
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
                    setVocabMenuOpen(false);
                  }
                }}
                className="text-slate-400 hover:text-indigo-400 transition-colors underline"
              >
                {isEnabled ? 'Tắt menu nhanh' : 'Bật menu nhanh'}
              </button>
            </div>
            <p className="text-[10px] text-slate-500 text-center font-mono">
              Phím tắt: [1] Chép • [2] Cambridge • [3] Oxford • [4] Dịch/Chép • [5] Loa • [6] AI • [7] Sổ tay{vocabMatches.length > 0 ? ' • [8] Chi tiết' : ''} • [Esc] Đóng
            </p>
          </div>
        </>
      )}
    </div>
  );
}
