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
} from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatConversationTime } from '@/lib/ai/history';
import { MarkdownMessage } from './MarkdownMessage';

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
  } = useChat();

  const [activeTab, setActiveTab] = useState<'chat' | 'history'>('chat');
  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [modelMenuOpen, setModelMenuOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [showClearAllConfirm, setShowClearAllConfirm] = useState(false);
  const [showClearCurrentConfirm, setShowClearCurrentConfirm] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const modelMenuRef = useRef<HTMLDivElement | null>(null);

  // Close model menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modelMenuRef.current && !modelMenuRef.current.contains(e.target as Node)) {
        setModelMenuOpen(false);
      }
    };
    if (modelMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modelMenuOpen]);

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

  const wordSuggestionChips = activeWordContext
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
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50">
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
            {activeWordContext ? `Hỏi AI: ${activeWordContext.word}` : 'Hỏi AI Tutor'}
          </span>

          {activeWordContext && (
            <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-semibold uppercase">
              {activeWordContext.level || 'TOEIC'}
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
        <div className="w-[94vw] sm:w-[420px] max-h-[82vh] sm:max-h-[620px] h-[580px] flex flex-col rounded-3xl bg-slate-900/95 backdrop-blur-xl border border-slate-800 shadow-2xl shadow-black/80 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="relative flex items-center justify-between px-4 py-3.5 border-b border-slate-800 bg-slate-950/80 shrink-0">
            {activeTab === 'chat' ? (
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                    <h3 className="text-sm font-bold text-slate-100 shrink-0">TOEIC AI Tutor</h3>

                    {/* Interactive Model Switcher Button & Dropdown */}
                    <div ref={modelMenuRef}>
                      <button
                        type="button"
                        onClick={() => setModelMenuOpen(!modelMenuOpen)}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all hover:opacity-90 active:scale-95 cursor-pointer shadow-sm"
                        title="Bấm để đổi mô hình AI"
                      >
                        {selectedModel === 'auto' ? (
                          <span className="flex items-center gap-1 text-indigo-300 bg-indigo-500/15 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                            <RefreshCw className="w-2.5 h-2.5 text-indigo-400" />
                            <span>Tự động (Hybrid)</span>
                            <ChevronDown className="w-2.5 h-2.5 text-indigo-400 ml-0.5" />
                          </span>
                        ) : selectedModel === 'gemini' ? (
                          <span className="flex items-center gap-1 text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                            <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                            <span>Gemini Flash</span>
                            <ChevronDown className="w-2.5 h-2.5 text-emerald-400 ml-0.5" />
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full">
                            <Zap className="w-2.5 h-2.5 text-amber-400" />
                            <span>Cloudflare Llama</span>
                            <ChevronDown className="w-2.5 h-2.5 text-amber-400 ml-0.5" />
                          </span>
                        )}
                      </button>

                      {/* Model Dropdown Menu */}
                      {modelMenuOpen && (
                        <div className="absolute top-full left-3 right-3 sm:left-4 sm:right-4 mt-2 rounded-2xl bg-slate-900/98 border border-slate-700 shadow-2xl p-2.5 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
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
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">
                    {activeWordContext
                      ? `Hỗ trợ học từ: "${activeWordContext.word}"`
                      : 'Trợ lý luyện thi & tiếng Anh công sở'}
                  </p>
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
            <div className="flex items-center gap-1 shrink-0">
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

              {/* Minimize / Close Window */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Thu nhỏ"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
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
                          <div className="mb-1.5 flex items-center gap-1 text-[10px] text-indigo-300 bg-indigo-950/50 border border-indigo-500/20 rounded-md px-2 py-0.5 w-fit">
                            <BookOpen className="w-2.5 h-2.5" />
                            <span>Từ vựng: {conv.wordContext.word}</span>
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
                      <strong className="font-bold text-white uppercase">
                        {activeWordContext.word}
                      </strong>
                      {activeWordContext.ipa && ` /${activeWordContext.ipa}/`}
                    </span>
                  </div>
                  <button
                    onClick={() => setWordContext(null)}
                    className="text-[10px] text-indigo-300/70 hover:text-indigo-200 underline shrink-0 ml-2"
                    title="Bỏ ngữ cảnh từ này để hỏi câu hỏi chung"
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

              {/* Suggested Quick Chips */}
              <div className="px-3 py-2 bg-slate-950/60 border-t border-slate-800/80 shrink-0">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {wordSuggestionChips.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => sendMessage(chip)}
                      disabled={isLoading}
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
                      activeWordContext
                        ? `Hỏi bất kỳ điều gì về từ "${activeWordContext.word}"...`
                        : 'Đặt câu hỏi ngữ pháp, bài tập TOEIC hoặc từ vựng...'
                    }
                    rows={1}
                    disabled={isLoading}
                    className="flex-1 bg-transparent border-0 resize-none text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-0 max-h-28 px-2 py-1 leading-relaxed"
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
                      disabled={!input.trim()}
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
  );
}
