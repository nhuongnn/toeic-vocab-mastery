'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Bot,
  X,
  Send,
  Trash2,
  Copy,
  Check,
  Square,
  Zap,
  BookOpen,
  ChevronDown,
  RefreshCw,
  History,
  Plus,
  ArrowLeft,
  ArrowRight,
  Clock,
  Lock,
  AlertCircle,
  MessageSquare,
  Maximize2,
  Minimize2,
  Scaling,
  RotateCcw,
} from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatConversationTime } from '@/lib/ai/history';
import { MarkdownMessage } from './MarkdownMessage';

const DEFAULT_WIDTH = 420;
const DEFAULT_HEIGHT = 580;
const EXPANDED_WIDTH = 680;
const EXPANDED_HEIGHT = 700;
const MIN_WIDTH = 340;
const MIN_HEIGHT = 380;
const MAX_WIDTH = 1200;
const MAX_HEIGHT = 960;
const STORAGE_KEY = 'toeic_ai_tutor_widget_size';

interface WidgetSizeState {
  width: number;
  height: number;
}

export function ChatBotWidget() {
  const { user, openAuthModal } = useAuth();
  const {
    isOpen,
    setIsOpen,
    messages,
    isLoading,
    activeWordContext,
    setWordContext,
    selectedModel,
    setSelectedModel,
    sendMessage,
    clearMessages,
    stopGeneration,
    currentConversationId,
    history,
    startNewConversation,
    loadConversation,
    deleteConversation,
    clearAllHistory,
    quotaExceededInfo,
    userQuota,
    clearQuotaError,
  } = useChat();

  const [activeTab, setActiveTab] = useState<'chat' | 'history'>('chat');
  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [modelMenuOpen, setModelMenuOpen] = useState(false);
  const [sizeMenuOpen, setSizeMenuOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [showClearAllConfirm, setShowClearAllConfirm] = useState(false);
  const [showClearCurrentConfirm, setShowClearCurrentConfirm] = useState(false);

  // Window size & maximized states (lazy initialized from localStorage)
  const [size, setSize] = useState<WidgetSizeState>(() => {
    if (typeof window === 'undefined') {
      return { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT };
    }
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.width === 'number' && typeof parsed.height === 'number') {
          const maxW = Math.min(MAX_WIDTH, window.innerWidth - 32);
          const maxH = Math.min(MAX_HEIGHT, window.innerHeight - 48);
          const clampedW = Math.max(MIN_WIDTH, Math.min(parsed.width, maxW));
          const clampedH = Math.max(MIN_HEIGHT, Math.min(parsed.height, maxH));
          return { width: clampedW, height: clampedH };
        }
      }
    } catch {
      // Ignore localStorage errors (e.g. private mode)
    }
    return { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT };
  });

  const [isMaximized, setIsMaximized] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.isMaximized === 'boolean') {
          return parsed.isMaximized;
        }
      }
    } catch {
      // Ignore localStorage errors
    }
    return false;
  });

  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const sizeMenuRef = useRef<HTMLDivElement | null>(null);

  const dragRef = useRef<{
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    direction: 'top' | 'left' | 'top-left';
  } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const modelMenuRef = useRef<HTMLDivElement | null>(null);

  const saveSizeState = (newState: { width: number; height: number; isMaximized: boolean }) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch {
      // Ignore
    }
  };

  const toggleMaximize = () => {
    setIsMaximized((prev) => {
      const next = !prev;
      saveSizeState({
        width: size.width,
        height: size.height,
        isMaximized: next,
      });
      return next;
    });
  };

  const applyPreset = (w: number, h: number) => {
    const maxW = Math.min(MAX_WIDTH, window.innerWidth - 32);
    const maxH = Math.min(MAX_HEIGHT, window.innerHeight - 48);
    const targetW = Math.min(w, maxW);
    const targetH = Math.min(h, maxH);
    setSize({ width: targetW, height: targetH });
    setIsMaximized(false);
    saveSizeState({ width: targetW, height: targetH, isMaximized: false });
  };

  const isCustomSize =
    (size.width !== DEFAULT_WIDTH || size.height !== DEFAULT_HEIGHT) &&
    (size.width !== EXPANDED_WIDTH || size.height !== EXPANDED_HEIGHT);

  // Keep widget dimensions clamped within viewport upon screen resize
  useEffect(() => {
    const handleWindowResize = () => {
      setSize((prev) => {
        const maxW = Math.min(MAX_WIDTH, window.innerWidth - 32);
        const maxH = Math.min(MAX_HEIGHT, window.innerHeight - 48);
        const newW = Math.min(prev.width, maxW);
        const newH = Math.min(prev.height, maxH);
        if (newW !== prev.width || newH !== prev.height) {
          return {
            width: Math.max(MIN_WIDTH, newW),
            height: Math.max(MIN_HEIGHT, newH),
          };
        }
        return prev;
      });
    };
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  // Drag-to-resize handlers
  const startResize = (e: React.PointerEvent, dir: 'top' | 'left' | 'top-left') => {
    e.preventDefault();
    e.stopPropagation();

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: rect.width,
      startHeight: rect.height,
      direction: dir,
    };

    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (!dragRef.current) return;
      const { startX, startY, startWidth, startHeight, direction } = dragRef.current;

      const deltaX = startX - e.clientX;
      const deltaY = startY - e.clientY;

      let newWidth = startWidth;
      let newHeight = startHeight;

      if (direction === 'left' || direction === 'top-left') {
        newWidth = startWidth + deltaX;
      }
      if (direction === 'top' || direction === 'top-left') {
        newHeight = startHeight + deltaY;
      }

      const minW = Math.min(MIN_WIDTH, window.innerWidth - 24);
      const maxW = Math.min(MAX_WIDTH, window.innerWidth - 32);
      const minH = MIN_HEIGHT;
      const maxH = Math.min(MAX_HEIGHT, window.innerHeight - 60);

      const clampedW = Math.round(Math.max(minW, Math.min(newWidth, maxW)));
      const clampedH = Math.round(Math.max(minH, Math.min(newHeight, maxH)));

      setSize({ width: clampedW, height: clampedH });
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      dragRef.current = null;
      setSize((latestSize) => {
        saveSizeState({
          width: latestSize.width,
          height: latestSize.height,
          isMaximized: false,
        });
        return latestSize;
      });
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    const prevUserSelect = document.body.style.userSelect;
    document.body.style.userSelect = 'none';

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      document.body.style.userSelect = prevUserSelect;
    };
  }, [isDragging]);

  const handleHeaderDoubleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest('button') ||
      target.closest('input') ||
      target.closest('textarea') ||
      target.closest('[role="button"]')
    ) {
      return;
    }
    toggleMaximize();
  };

  // Close model & size menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modelMenuRef.current && !modelMenuRef.current.contains(e.target as Node)) {
        setModelMenuOpen(false);
      }
      if (sizeMenuRef.current && !sizeMenuRef.current.contains(e.target as Node)) {
        setSizeMenuOpen(false);
      }
    };
    if (modelMenuOpen || sizeMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modelMenuOpen, sizeMenuOpen]);

  // Auto-scroll to bottom of chat when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      scrollToBottom();
    }
  }, [messages, isOpen, activeTab]);

  // Focus textarea when chat is opened
  useEffect(() => {
    if (isOpen && activeTab === 'chat' && textareaRef.current) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 150);
    }
  }, [isOpen, activeTab]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    const text = input;
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    sendMessage(text);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 110)}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Trên điện thoại / cảm ứng: Enter xuống dòng, gửi bằng icon mũi tên
    const isMobileOrTouch =
      typeof window !== 'undefined' &&
      (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);

    if (isMobileOrTouch) {
      return;
    }

    // Trên máy tính: Enter gửi luôn, Shift+Enter xuống dòng
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const wordSuggestionChips =
    activeWordContext?.selectedText && activeWordContext.selectedText.length > 25
      ? [
          '💡 Giải thích ngữ pháp & cấu trúc câu của đoạn này',
          '🔍 Phân tích các từ vựng và cụm collocation quan trọng',
          '📝 Dịch chuẩn và viết lại theo phong cách email công sở',
          '🎯 Tạo 1 câu hỏi trắc nghiệm TOEIC dựa trên câu này',
        ]
      : activeWordContext
      ? [
          `💡 Bẫy Part 5 & lưu ý khi dùng từ "${activeWordContext.word}"`,
          `📧 3 câu ví dụ email công việc với "${activeWordContext.word}"`,
          `🔄 Phân biệt "${activeWordContext.word}" với từ đồng nghĩa`,
          `🎯 Tạo 1 câu hỏi trắc nghiệm TOEIC với "${activeWordContext.word}"`,
        ]
      : [
          '📝 Mẹo phân biệt thì HTHT và QKĐ trong TOEIC',
          '⚡ Cách xử lý nhanh Part 5 ngữ pháp dưới 30 giây',
          '💼 Mẫu câu email xin dời lịch hẹn bằng tiếng Anh chuyên nghiệp',
          '🧩 Giải thích cách dùng mệnh đề quan hệ rút gọn',
        ];

  const handleSelectHistoryItem = (id: string) => {
    loadConversation(id);
    setActiveTab('chat');
  };

  const handleConfirmDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteConversation(id);
    setConfirmDeleteId(null);
  };

  const handleConfirmClearAll = () => {
    clearAllHistory();
    setShowClearAllConfirm(false);
  };

  const handleConfirmClearCurrent = () => {
    clearMessages();
    setShowClearCurrentConfirm(false);
  };

  return (
    <>
      {/* Dark backdrop overlay when maximized */}
      {isOpen && isMaximized && (
        <div
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 transition-opacity animate-in fade-in duration-200"
          onClick={toggleMaximize}
          title="Bấm ra ngoài để thu nhỏ lại"
        />
      )}

      <div
        data-chat-widget="true"
        className={`fixed z-50 transition-all duration-200 ${
          isOpen && isMaximized
            ? 'inset-2 sm:inset-6 flex flex-col'
            : 'bottom-20 md:bottom-6 right-4 sm:right-6'
        }`}
      >
        {/* Floating Trigger Button */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 text-white shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-indigo-400/30"
            aria-label="Open TOEIC AI Tutor"
          >
            <div className="relative">
              <Sparkles className="w-5 h-5 text-indigo-100 animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-950 animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-950" />
            </div>

            <span className="text-xs font-bold tracking-wide">
              {activeWordContext?.selectedText && activeWordContext.selectedText.length > 25
                ? 'Hỏi AI: Đoạn văn đã chọn'
                : activeWordContext
                ? `Hỏi AI: ${activeWordContext.word}`
                : 'Hỏi AI Tutor'}
            </span>

            {activeWordContext && (
              <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-semibold uppercase">
                {activeWordContext.level || 'TOEIC'}
              </span>
            )}

            {!user && userQuota && (
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                  userQuota.remaining <= 0
                    ? 'bg-rose-500/30 text-rose-200 border-rose-400/50'
                    : 'bg-indigo-900/60 text-indigo-200 border-indigo-400/30'
                }`}
              >
                {userQuota.remaining <= 0 ? 'Hết lượt khách' : `${userQuota.remaining}/${userQuota.limit} lượt`}
              </span>
            )}

            {user && history.length > 0 && (
              <span
                className="ml-0.5 px-1.5 py-0.2 rounded-full bg-indigo-900/80 border border-indigo-400/40 text-[10px] font-bold text-indigo-200"
                title={`${history.length} cuộc hội thoại được lưu`}
              >
                {history.length}
              </span>
            )}
          </button>
        )}

        {/* Floating Chat / History Window */}
        {isOpen && (
          <div
            ref={containerRef}
            style={
              !isMaximized
                ? ({
                    '--widget-w': `${size.width}px`,
                    '--widget-h': `${size.height}px`,
                  } as React.CSSProperties)
                : undefined
            }
            className={`flex flex-col rounded-3xl bg-slate-900/95 backdrop-blur-xl border border-slate-800 shadow-2xl shadow-black/80 overflow-hidden relative duration-200 animate-in fade-in slide-in-from-bottom-5 ${
              isMaximized
                ? 'w-full h-full'
                : 'w-[94vw] sm:w-[var(--widget-w,420px)] h-[580px] max-h-[82vh] sm:max-h-[calc(100vh-80px)] sm:h-[var(--widget-h,580px)]'
            } ${isDragging ? 'ring-2 ring-indigo-500/60 shadow-indigo-500/20 select-none' : ''}`}
          >
            {/* Active Resize Dimension Badge (Visible during dragging) */}
            {isDragging && (
              <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 px-3 py-1 rounded-full bg-indigo-600/95 text-white font-mono text-xs font-semibold shadow-xl shadow-black/50 border border-indigo-400/40 pointer-events-none flex items-center gap-1.5 animate-in fade-in duration-100">
                <Scaling className="w-3.5 h-3.5 text-indigo-200" />
                <span>
                  {size.width} × {size.height} px
                </span>
              </div>
            )}

            {/* Interactive Drag-to-Resize Handles (Hidden when maximized) */}
            {!isMaximized && (
              <>
                {/* Top-Left Corner Drag Handle */}
                <div
                  onPointerDown={(e) => startResize(e, 'top-left')}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    toggleMaximize();
                  }}
                  className="hidden sm:flex absolute -top-1 -left-1 w-6 h-6 cursor-nwse-resize z-40 items-center justify-center group"
                  title="Kéo góc để chỉnh kích thước ngang & dọc (Bấm đúp để phóng to/thu nhỏ)"
                >
                  <div className="w-3 h-3 border-t-2 border-l-2 border-slate-500 group-hover:border-indigo-400 group-hover:w-3.5 group-hover:h-3.5 rounded-tl transition-all shadow-sm" />
                </div>

                {/* Top Edge Drag Handle */}
                <div
                  onPointerDown={(e) => startResize(e, 'top')}
                  className="hidden sm:flex absolute top-0 left-6 right-6 h-2 -translate-y-1 cursor-ns-resize z-30 items-center justify-center group"
                  title="Kéo lên/xuống để chỉnh chiều cao"
                >
                  <div className="w-12 h-1 rounded-full bg-slate-700/60 group-hover:bg-indigo-400/80 transition-colors" />
                </div>

                {/* Left Edge Drag Handle */}
                <div
                  onPointerDown={(e) => startResize(e, 'left')}
                  className="hidden sm:flex absolute top-6 bottom-6 left-0 w-2 -translate-x-1 cursor-ew-resize z-30 items-center justify-center group"
                  title="Kéo sang trái/phải để chỉnh chiều rộng"
                >
                  <div className="h-12 w-1 rounded-full bg-slate-700/60 group-hover:bg-indigo-400/80 transition-colors" />
                </div>
              </>
            )}

            {/* Header */}
            <div
              onDoubleClick={handleHeaderDoubleClick}
              className="relative border-b border-slate-800 bg-slate-950/90 shrink-0 select-none cursor-default"
              title="Bấm đúp vào thanh tiêu đề để phóng to / thu nhỏ"
            >
              {/* Top Row: Title & Action Buttons */}
              <div className="flex items-center justify-between px-4 py-2.5">
                {activeTab === 'chat' ? (
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-slate-100 truncate">
                        TOEIC AI Tutor
                      </h3>
                    </div>
                  </div>
                ) : (
                  /* History Header */
                  <div className="flex items-center gap-2.5 min-w-0">
                    <button
                      type="button"
                      onClick={() => setActiveTab('chat')}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      title="Quay lại đoạn chat"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-100">Lịch Sử Hội Thoại</h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
                        {user ? `${history.length}/5 gần nhất` : 'Yêu cầu đăng nhập'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div
                  className="flex items-center gap-1 shrink-0"
                  onDoubleClick={(e) => e.stopPropagation()}
                >
                  {/* New Conversation Button */}
                  <button
                    type="button"
                    onClick={() => {
                      startNewConversation();
                      setActiveTab('chat');
                    }}
                    title="Bắt đầu cuộc trò chuyện mới"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>

                  {/* Toggle History / Chat Button */}
                  {activeTab === 'chat' ? (
                    <button
                      type="button"
                      onClick={() => setActiveTab('history')}
                      title="Xem lịch sử 5 cuộc hội thoại gần nhất"
                      className="relative p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                    >
                      <History className="w-4 h-4" />
                      {user && history.length > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-slate-900" />
                      )}
                    </button>
                  ) : null}

                  {/* Trash Button in Chat View */}
                  {activeTab === 'chat' && (
                    <button
                      type="button"
                      onClick={() => setShowClearCurrentConfirm(true)}
                      title="Xóa cuộc trò chuyện này"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}

                  {/* Size Preset Menu Button */}
                  <div ref={sizeMenuRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setSizeMenuOpen(!sizeMenuOpen)}
                      title="Tùy chọn kích thước khung chat"
                      className={`p-1.5 rounded-lg transition-colors ${
                        sizeMenuOpen
                          ? 'text-indigo-300 bg-slate-800'
                          : 'text-slate-400 hover:text-indigo-300 hover:bg-slate-800'
                      }`}
                    >
                      <Scaling className="w-4 h-4" />
                    </button>

                    {/* Size Presets Dropdown */}
                    {sizeMenuOpen && (
                      <div className="absolute top-full right-0 mt-2 w-64 rounded-2xl bg-slate-900/98 border border-slate-700 shadow-2xl p-2 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                        <div className="px-2.5 py-1 mb-1 border-b border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                          <span>Kích thước khung chat</span>
                          <span className="font-mono text-[9px] text-indigo-400">
                            {isMaximized ? 'Toàn màn hình' : `${size.width}×${size.height}`}
                          </span>
                        </div>

                        <div className="space-y-1">
                          {/* Default Preset (420 x 580) */}
                          <button
                            type="button"
                            onClick={() => {
                              applyPreset(DEFAULT_WIDTH, DEFAULT_HEIGHT);
                              setSizeMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left text-xs transition-all ${
                              !isMaximized && size.width === DEFAULT_WIDTH && size.height === DEFAULT_HEIGHT
                                ? 'bg-indigo-500/15 border border-indigo-500/30 text-white font-semibold'
                                : 'hover:bg-slate-800/80 text-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-base">📱</span>
                              <div>
                                <div className="font-bold text-slate-200">Tiêu chuẩn</div>
                                <div className="text-[10px] text-slate-400">420 × 580 px (Gọn gàng)</div>
                              </div>
                            </div>
                            {!isMaximized && size.width === DEFAULT_WIDTH && size.height === DEFAULT_HEIGHT && (
                              <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                            )}
                          </button>

                          {/* Expanded Preset (680 x 700) */}
                          <button
                            type="button"
                            onClick={() => {
                              applyPreset(EXPANDED_WIDTH, EXPANDED_HEIGHT);
                              setSizeMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left text-xs transition-all ${
                              !isMaximized && size.width === EXPANDED_WIDTH && size.height === EXPANDED_HEIGHT
                                ? 'bg-indigo-500/15 border border-indigo-500/30 text-white font-semibold'
                                : 'hover:bg-slate-800/80 text-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-base">🖥️</span>
                              <div>
                                <div className="font-bold text-slate-200">Mở rộng</div>
                                <div className="text-[10px] text-slate-400">680 × 700 px (Dễ đọc câu dài)</div>
                              </div>
                            </div>
                            {!isMaximized && size.width === EXPANDED_WIDTH && size.height === EXPANDED_HEIGHT && (
                              <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                            )}
                          </button>

                          {/* Maximized Preset */}
                          <button
                            type="button"
                            onClick={() => {
                              setIsMaximized(true);
                              saveSizeState({ ...size, isMaximized: true });
                              setSizeMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left text-xs transition-all ${
                              isMaximized
                                ? 'bg-indigo-500/15 border border-indigo-500/30 text-white font-semibold'
                                : 'hover:bg-slate-800/80 text-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-base">🔲</span>
                              <div>
                                <div className="font-bold text-slate-200">Cực đại</div>
                                <div className="text-[10px] text-slate-400">Toàn màn hình học tập</div>
                              </div>
                            </div>
                            {isMaximized && (
                              <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                            )}
                          </button>

                          {/* Reset Custom Size if applicable */}
                          {isCustomSize && !isMaximized && (
                            <div className="pt-1 mt-1 border-t border-slate-800">
                              <button
                                type="button"
                                onClick={() => {
                                  applyPreset(DEFAULT_WIDTH, DEFAULT_HEIGHT);
                                  setSizeMenuOpen(false);
                                }}
                                className="w-full flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-slate-800/60 text-[11px] transition-colors"
                              >
                                <RotateCcw className="w-3 h-3" />
                                <span>Đặt lại kích thước mặc định</span>
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="mt-2 pt-1.5 border-t border-slate-800/60 px-2 text-[10px] text-slate-500 text-center">
                          💡 Kéo góc trên hoặc mép trái để tùy chỉnh tự do
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Maximize / Restore Button */}
                  <button
                    type="button"
                    onClick={toggleMaximize}
                    title={
                      isMaximized
                        ? 'Thu nhỏ về kích thước cũ (hoặc bấm đúp tiêu đề)'
                        : 'Phóng cực đại toàn màn hình (hoặc bấm đúp tiêu đề)'
                    }
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                  >
                    {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>

                  {/* Minimize / Close Window */}
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    title="Thu nhỏ khung chat"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sub-Bar: AI Model Combobox & Quota Status (Only in Chat view) */}
              {activeTab === 'chat' && (
                <div
                  className="flex items-center justify-between px-4 py-1.5 text-xs border-t border-slate-800/50 bg-slate-950/40"
                  onDoubleClick={(e) => e.stopPropagation()}
                >
                  {/* Interactive Model Switcher Button & Dropdown */}
                  <div ref={modelMenuRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setModelMenuOpen(!modelMenuOpen)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-all hover:opacity-90 active:scale-95 cursor-pointer shadow-sm border border-slate-700/60 bg-slate-900/80 hover:bg-slate-800/80"
                      title="Bấm để đổi mô hình AI phản hồi"
                    >
                      <span className="text-[10px] text-slate-400">Mô hình:</span>
                      {selectedModel === 'auto' ? (
                        <span className="flex items-center gap-1 text-indigo-300 font-semibold">
                          <RefreshCw className="w-2.5 h-2.5 text-indigo-400" />
                          <span>Tự động (Hybrid)</span>
                          <ChevronDown className="w-2.5 h-2.5 text-indigo-400 ml-0.5" />
                        </span>
                      ) : selectedModel === 'gemini' ? (
                        <span className="flex items-center gap-1 text-emerald-300 font-semibold">
                          <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                          <span>Gemini Flash</span>
                          <ChevronDown className="w-2.5 h-2.5 text-emerald-400 ml-0.5" />
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-amber-300 font-semibold">
                          <Zap className="w-2.5 h-2.5 text-amber-400" />
                          <span>Cloudflare Llama</span>
                          <ChevronDown className="w-2.5 h-2.5 text-amber-400 ml-0.5" />
                        </span>
                      )}
                    </button>

                    {/* Model Dropdown Menu */}
                    {modelMenuOpen && (
                      <div className="absolute top-full left-0 mt-1.5 w-72 sm:w-80 rounded-2xl bg-slate-900/98 border border-slate-700 shadow-2xl p-2.5 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                        <div className="flex items-center justify-between px-2.5 py-1 mb-1 border-b border-slate-800/80 pb-1.5">
                          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                            Chọn Mô Hình AI Phản Hồi
                          </span>
                          <button
                            type="button"
                            onClick={() => setModelMenuOpen(false)}
                            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            title="Đóng menu"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="space-y-1.5 mt-1">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedModel('auto');
                              setModelMenuOpen(false);
                            }}
                            className={`w-full flex items-start gap-2.5 p-2 rounded-xl text-left transition-all ${
                              selectedModel === 'auto'
                                ? 'bg-indigo-500/15 border border-indigo-500/40 text-white'
                                : 'hover:bg-slate-800 text-slate-300'
                            }`}
                          >
                            <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 shrink-0 mt-0.5">
                              <RefreshCw className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-100">
                                  Tự động (Hybrid)
                                </span>
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300">
                                  Khuyên dùng
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                                Ưu tiên Gemini Flash, tự động đổi Cloudflare nếu lỗi
                              </p>
                            </div>
                            {selectedModel === 'auto' && (
                              <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-1" />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedModel('gemini');
                              setModelMenuOpen(false);
                            }}
                            className={`w-full flex items-start gap-2.5 p-2 rounded-xl text-left transition-all ${
                              selectedModel === 'gemini'
                                ? 'bg-emerald-500/15 border border-emerald-500/40 text-white'
                                : 'hover:bg-slate-800 text-slate-300'
                            }`}
                          >
                            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                              <Sparkles className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-100">
                                  Google Gemini Flash
                                </span>
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                                  Chất lượng cao
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                                Tiếng Việt chuẩn xác nhất, giải thích ngữ pháp sâu
                              </p>
                            </div>
                            {selectedModel === 'gemini' && (
                              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-1" />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedModel('cloudflare');
                              setModelMenuOpen(false);
                            }}
                            className={`w-full flex items-start gap-2.5 p-2 rounded-xl text-left transition-all ${
                              selectedModel === 'cloudflare'
                                ? 'bg-amber-500/15 border border-amber-500/40 text-white'
                                : 'hover:bg-slate-800 text-slate-300'
                            }`}
                          >
                            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                              <Zap className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-100">
                                  Cloudflare Llama 3.1
                                </span>
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">
                                  Siêu tốc
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                                Inference cực nhanh trên hạ tầng Edge toàn cầu
                              </p>
                            </div>
                            {selectedModel === 'cloudflare' && (
                              <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-1" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right side of Sub-Bar: Guest Quota or Subtitle */}
                  {!user && userQuota ? (
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border shrink-0 ${
                        userQuota.remaining <= 0
                          ? 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                          : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                      title={`Hạn mức khách chưa đăng nhập: còn ${userQuota.remaining}/${userQuota.limit} lượt hôm nay`}
                    >
                      <span>Khách: {userQuota.remaining}/{userQuota.limit}</span>
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 truncate max-w-[200px] text-right">
                      {activeWordContext
                        ? `Từ: "${activeWordContext.word}"`
                        : 'Trợ lý TOEIC & Công sở'}
                    </span>
                  )}
                </div>
              )}
            </div>

          {/* Clear Current Chat Confirmation Banner */}
          {showClearCurrentConfirm && (
            <div className="px-4 py-2 bg-rose-500/10 border-b border-rose-500/30 flex items-center justify-between gap-2 text-xs text-rose-300 animate-in fade-in duration-150 shrink-0">
              <span className="truncate">Xóa nội dung cuộc trò chuyện này?</span>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handleConfirmClearCurrent}
                  className="px-2 py-0.5 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px]"
                >
                  Xóa
                </button>
                <button
                  type="button"
                  onClick={() => setShowClearCurrentConfirm(false)}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
                >
                  Hủy
                </button>
              </div>
            </div>
          )}

          {/* MAIN BODY: HISTORY VIEW */}
          {activeTab === 'history' ? (
            <div className="flex-1 flex flex-col overflow-hidden bg-slate-950/40">
              {/* Clear All Confirmation Bar */}
              {showClearAllConfirm && (
                <div className="px-4 py-2.5 bg-rose-500/15 border-b border-rose-500/30 flex items-center justify-between gap-2 text-xs text-rose-300 shrink-0 animate-in fade-in duration-150">
                  <div className="flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Xóa toàn bộ 5 cuộc hội thoại?</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={handleConfirmClearAll}
                      className="px-2 py-0.5 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px]"
                    >
                      Xóa hết
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowClearAllConfirm(false)}
                      className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              )}

              {/* Body Content */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5">
                {/* Case 1: User is NOT logged in */}
                {!user ? (
                  <div className="py-10 px-4 text-center space-y-3.5">
                    <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                      <Lock className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-100">
                        Chưa đăng nhập tài khoản
                      </h4>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                        Hệ thống chỉ tự động lưu <strong>5 cuộc hội thoại gần nhất</strong> khi bạn đã đăng nhập tài khoản nhằm bảo mật thông tin và đồng bộ khi học trên nhiều thiết bị.
                      </p>
                    </div>
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={openAuthModal}
                        className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold shadow-md shadow-indigo-600/25 transition-all"
                      >
                        Đăng nhập ngay
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('chat')}
                        className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                      >
                        Quay lại chat
                      </button>
                    </div>
                  </div>
                ) : history.length === 0 ? (
                  /* Case 2: User is logged in but history is empty */
                  <div className="py-12 px-4 text-center space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-200">
                        Chưa có cuộc hội thoại nào
                      </h4>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                        Khi bạn đặt câu hỏi với AI Tutor, 5 cuộc hội thoại gần nhất sẽ tự động được lưu lại tại đây theo tài khoản của bạn.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        startNewConversation();
                        setActiveTab('chat');
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-500/20"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Bắt đầu trò chuyện ngay</span>
                    </button>
                  </div>
                ) : (
                  /* Case 3: User is logged in and has conversations */
                  history.map((conv) => {
                    const isActive = conv.id === currentConversationId;
                    const isConfirmingDelete = confirmDeleteId === conv.id;

                    return (
                      <div
                        key={conv.id}
                        onClick={() => handleSelectHistoryItem(conv.id)}
                        className={`group relative rounded-2xl border p-3 cursor-pointer transition-all ${
                          isActive
                            ? 'bg-slate-800/95 border-indigo-500/60 shadow-md shadow-indigo-500/10'
                            : 'bg-slate-900/80 hover:bg-slate-800/60 border-slate-800/80 hover:border-slate-700'
                        }`}
                      >
                        {/* Top row: Title + Time */}
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div className="min-w-0 flex items-center gap-1.5">
                            <span className="text-xs font-bold text-white truncate">
                              {conv.title}
                            </span>
                            {isActive && (
                              <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shrink-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                <span>Đang mở</span>
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-slate-400 shrink-0">
                            <Clock className="w-3 h-3 text-slate-500" />
                            <span>{formatConversationTime(conv.updatedAt)}</span>
                          </div>
                        </div>

                        {/* Word Context Tag if present */}
                        {conv.wordContext && (
                          <div className="mb-1.5 flex items-center gap-1 text-[10px] text-indigo-300 bg-indigo-950/50 border border-indigo-500/20 rounded-md px-2 py-0.5 w-fit max-w-full truncate">
                            <BookOpen className="w-2.5 h-2.5 shrink-0" />
                            <span className="truncate">
                              {conv.wordContext.selectedText
                                ? `Đoạn trích: "${conv.wordContext.selectedText.slice(0, 30)}..."`
                                : `Từ vựng: ${conv.wordContext.word}`}
                            </span>
                          </div>
                        )}

                        {/* Snippet */}
                        {conv.lastMessageSnippet && (
                          <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed bg-slate-950/50 rounded-lg p-2 border border-slate-800/60 italic mb-2">
                            &ldquo;{conv.lastMessageSnippet}&rdquo;
                          </p>
                        )}

                        {/* Bottom Row: Message count + Delete Action */}
                        <div className="flex items-center justify-between pt-1 border-t border-slate-800/50 text-[11px] text-slate-400">
                          <span className="inline-flex items-center gap-1">
                            <MessageSquare className="w-3 h-3 text-slate-500" />
                            <span>{conv.messageCount} câu hỏi</span>
                          </span>

                          <div className="flex items-center gap-1.5">
                            {isConfirmingDelete ? (
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 bg-rose-500/20 border border-rose-500/40 rounded-lg px-2 py-0.5 text-[10px]"
                              >
                                <span className="text-rose-300">Xác nhận xóa?</span>
                                <button
                                  type="button"
                                  onClick={(e) => handleConfirmDelete(conv.id, e)}
                                  className="px-1.5 py-0.2 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold"
                                >
                                  Xóa
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setConfirmDeleteId(null);
                                  }}
                                  className="px-1 py-0.2 text-slate-400 hover:text-white"
                                >
                                  Hủy
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setConfirmDeleteId(conv.id);
                                }}
                                title="Xóa cuộc hội thoại này"
                                className="p-1 rounded-md text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}

                            <span className="inline-flex items-center gap-1 text-[10px] text-indigo-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                              <span>Xem lại</span>
                              <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* History Footer */}
              {user && history.length > 0 && (
                <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-800 bg-slate-950/80 text-xs shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowClearAllConfirm(true)}
                    disabled={showClearAllConfirm}
                    className="text-slate-400 hover:text-rose-400 transition-colors inline-flex items-center gap-1.5 text-[11px]"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Xóa toàn bộ lịch sử</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('chat')}
                    className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                  >
                    Quay lại chat
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* MAIN BODY: CHAT VIEW */
            <>
              {/* Active Context Banner */}
              {activeWordContext && (
                <div className="flex items-center justify-between px-4 py-2 bg-indigo-950/40 border-b border-indigo-500/20 text-xs text-indigo-200 shrink-0">
                  <div className="flex items-center gap-2 truncate">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="truncate">
                      Ngữ cảnh:{' '}
                      <strong className="font-bold text-white">
                        {activeWordContext.selectedText
                          ? activeWordContext.selectedText.length > 36
                            ? `"${activeWordContext.selectedText.slice(0, 36)}..."`
                            : `"${activeWordContext.selectedText}"`
                          : activeWordContext.word.toUpperCase()}
                      </strong>
                      {activeWordContext.ipa && ` /${activeWordContext.ipa}/`}
                    </span>
                  </div>
                  <button
                    onClick={() => setWordContext(null)}
                    className="text-[10px] text-indigo-300/70 hover:text-indigo-200 underline shrink-0 ml-2"
                    title="Bỏ ngữ cảnh này để hỏi câu hỏi chung"
                  >
                    Bỏ chọn
                  </button>
                </div>
              )}

              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => {
                  const isUser = msg.role === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-sm ${
                          isUser
                            ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-br-sm shadow-md'
                            : 'bg-slate-800/80 border border-slate-700/60 text-slate-200 rounded-bl-sm shadow-sm'
                        }`}
                      >
                        {isUser ? (
                          <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                        ) : (
                          <div>
                            {msg.content ? (
                              <MarkdownMessage content={msg.content} />
                            ) : (
                              <div className="flex items-center gap-1.5 py-1 text-slate-400 text-xs">
                                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse delay-75" />
                                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse delay-150" />
                                <span className="ml-1 text-[11px] text-slate-400">
                                  Đang suy nghĩ...
                                </span>
                              </div>
                            )}

                            {/* Assistant Footer Info & Copy */}
                            {msg.content && (
                              <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-700/40 text-[10px] text-slate-400">
                                <span className="flex items-center gap-1">
                                  {msg.provider === 'cloudflare' || msg.isFallback ? (
                                    <span className="text-amber-400/90 font-medium inline-flex items-center gap-1">
                                      <Zap className="w-2.5 h-2.5" />
                                      <span>
                                        Cloudflare Llama{msg.isFallback ? ' (Dự phòng)' : ''}
                                      </span>
                                    </span>
                                  ) : (
                                    <span className="text-emerald-400/90 font-medium inline-flex items-center gap-1">
                                      <Sparkles className="w-2.5 h-2.5" />
                                      <span>Gemini Flash</span>
                                    </span>
                                  )}
                                </span>
                                <button
                                  onClick={() => handleCopy(msg.id, msg.content)}
                                  className="flex items-center gap-1 hover:text-slate-200 transition-colors"
                                >
                                  {copiedId === msg.id ? (
                                    <>
                                      <Check className="w-3 h-3 text-emerald-400" />
                                      <span className="text-emerald-400">Đã sao chép</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      <span>Sao chép</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                <div ref={messagesEndRef} />
              </div>

              {/* Guest Limit Reached Notification Banner */}
              {((quotaExceededInfo && quotaExceededInfo.isGuest) || (!user && userQuota && userQuota.remaining <= 0)) && (
                <div className="p-3.5 mx-3 my-2 rounded-2xl bg-gradient-to-r from-amber-950/50 via-purple-950/40 to-indigo-950/50 border border-amber-500/40 text-slate-200 space-y-2.5 animate-in fade-in duration-200 shrink-0 shadow-xl shadow-black/50">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/30">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-amber-300">Đã Hết Lượt Dùng AI Dành Cho Khách</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-200 border border-amber-500/30 font-semibold">
                          {userQuota?.guestLimit || 5} lượt/ngày
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        Bạn đã đạt giới hạn hạn mức AI hôm nay cho khách chưa đăng nhập. Vui lòng đăng nhập tài khoản để được nâng hạn mức sử dụng lên <strong>{userQuota?.userLimit || 50} lượt/ngày</strong> và lưu trữ lịch sử học tập!
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/80">
                    <span className="text-[10px] text-emerald-400 font-semibold">✓ Đăng ký & Sử dụng miễn phí</span>
                    <button
                      type="button"
                      onClick={openAuthModal}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Đăng nhập ngay để nâng hạn mức</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Logged-in User Limit Reached Banner */}
              {quotaExceededInfo && !quotaExceededInfo.isGuest && (
                <div className="p-3 mx-3 my-2 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-xs flex items-center justify-between gap-2 shrink-0 animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span className="leading-snug">{quotaExceededInfo.message || 'Bạn đã đạt giới hạn hạn mức AI hôm nay.'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={clearQuotaError}
                    className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white shrink-0"
                    title="Đóng thông báo"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Suggested Quick Chips */}
              <div className="px-3 py-2 bg-slate-950/60 border-t border-slate-800/80 shrink-0">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {wordSuggestionChips.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => sendMessage(chip)}
                      disabled={isLoading || Boolean(!user && userQuota && userQuota.remaining <= 0)}
                      className="shrink-0 text-[11px] px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-indigo-950/30 text-slate-300 hover:text-indigo-200 transition-all disabled:opacity-40"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Box */}
              <div className="p-3 border-t border-slate-800 bg-slate-950/90 shrink-0">
                <div className="relative flex items-end gap-2 bg-slate-900 border border-slate-800 rounded-2xl p-1.5 focus-within:border-indigo-500/80 transition-colors">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={
                      !user && userQuota && userQuota.remaining <= 0
                        ? 'Đã hết lượt hỏi cho khách. Đăng nhập để tiếp tục...'
                        : activeWordContext?.selectedText && activeWordContext.selectedText.length > 25
                        ? 'Đặt câu hỏi về đoạn văn bản vừa chọn...'
                        : activeWordContext
                        ? `Hỏi bất kỳ điều gì về từ "${activeWordContext.word}"...`
                        : 'Đặt câu hỏi ngữ pháp, bài tập TOEIC hoặc từ vựng...'
                    }
                    rows={1}
                    disabled={isLoading || Boolean(!user && userQuota && userQuota.remaining <= 0)}
                    className="flex-1 bg-transparent border-0 resize-none text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-0 max-h-28 px-2 py-1 leading-relaxed disabled:opacity-50"
                  />

                  {isLoading ? (
                    <button
                      onClick={stopGeneration}
                      title="Dừng phản hồi"
                      className="p-2 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 hover:bg-rose-500/30 transition-all shrink-0"
                    >
                      <Square className="w-3.5 h-3.5 fill-rose-300" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSend}
                      disabled={!input.trim() || Boolean(!user && userQuota && userQuota.remaining <= 0)}
                      title="Gửi câu hỏi"
                      className="p-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-30 disabled:hover:bg-indigo-600 transition-all shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="mt-1 px-1 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="hidden sm:inline">Enter gửi • Shift+Enter xuống dòng</span>
                  <span className="sm:hidden">Enter xuống dòng • Bấm nút gửi</span>
                  {!user && (
                    <button
                      type="button"
                      onClick={openAuthModal}
                      className="text-indigo-400 hover:underline inline-flex items-center gap-1"
                    >
                      <Lock className="w-2.5 h-2.5" />
                      <span>Đăng nhập để lưu 5 hội thoại</span>
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
    </>
  );
}
