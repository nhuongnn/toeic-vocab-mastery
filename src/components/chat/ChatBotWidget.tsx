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
} from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';
import { MarkdownMessage } from './MarkdownMessage';

export function ChatBotWidget() {
  const {
    isOpen,
    setIsOpen,
    messages,
    isLoading,
    activeWordContext,
    setWordContext,
    activeProvider,
    activeModel,
    isFallbackActive,
    fallbackReason,
    sendMessage,
    clearMessages,
    stopGeneration,
  } = useChat();

  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Focus textarea when opened
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    const text = input;
    setInput('');
    sendMessage(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="w-[94vw] sm:w-[420px] max-h-[82vh] sm:max-h-[620px] h-[580px] flex flex-col rounded-3xl bg-slate-900/95 backdrop-blur-xl border border-slate-800 shadow-2xl shadow-black/80 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-800 bg-slate-950/80">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-100">TOEIC AI Tutor</h3>
                  {/* Provider Status Pill */}
                  {isFallbackActive ? (
                    <span
                      title={fallbackReason || `Chạy qua Cloudflare Workers AI (${activeModel || 'Llama 3.1'})`}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-[10px] font-semibold text-amber-300"
                    >
                      <Zap className="w-2.5 h-2.5 text-amber-400" />
                      <span>Cloudflare (Fallback)</span>
                    </span>
                  ) : activeProvider === 'gemini' ? (
                    <span
                      title={`Chạy qua Google Gemini (${activeModel || '2.0 Flash'})`}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-semibold text-emerald-300"
                    >
                      <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                      <span>Gemini 2.0 Flash</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-[10px] font-semibold text-indigo-300">
                      <span>Hybrid AI</span>
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400">
                  {activeWordContext
                    ? `Hỗ trợ học từ: "${activeWordContext.word}"`
                    : 'Trợ lý luyện thi 700+ & tiếng Anh công sở'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={clearMessages}
                title="Xóa lịch sử chat"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Thu nhỏ"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Context Banner */}
          {activeWordContext && (
            <div className="flex items-center justify-between px-4 py-2 bg-indigo-950/40 border-b border-indigo-500/20 text-xs text-indigo-200">
              <div className="flex items-center gap-2 truncate">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="truncate">
                  Ngữ cảnh: <strong className="font-bold text-white uppercase">{activeWordContext.word}</strong>
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
                            <span className="ml-1 text-[11px] text-slate-400">Đang suy nghĩ...</span>
                          </div>
                        )}

                        {/* Assistant Footer Info & Copy */}
                        {msg.content && (
                          <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-700/40 text-[10px] text-slate-400">
                            <span className="flex items-center gap-1">
                              {msg.provider === 'cloudflare' || msg.isFallback ? (
                                <span className="text-amber-400/90 font-medium">Cloudflare Llama</span>
                              ) : (
                                <span className="text-emerald-400/90 font-medium">Gemini Flash</span>
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
          <div className="px-3 py-2 bg-slate-950/60 border-t border-slate-800/80">
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
          <div className="p-3 border-t border-slate-800 bg-slate-950/90">
            <div className="relative flex items-end gap-2 bg-slate-900 border border-slate-800 rounded-2xl p-1.5 focus-within:border-indigo-500/80 transition-colors">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  activeWordContext
                    ? `Hỏi bất kỳ điều gì về từ "${activeWordContext.word}"...`
                    : 'Đặt câu hỏi ngữ pháp, bài tập TOEIC hoặc từ vựng...'
                }
                rows={1}
                disabled={isLoading}
                className="flex-1 bg-transparent border-0 resize-none text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-0 max-h-24 px-2 py-1 leading-relaxed"
              />

              {isLoading ? (
                <button
                  onClick={stopGeneration}
                  title="Dừng phản hồi"
                  className="p-2 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 hover:bg-rose-500/30 transition-all"
                >
                  <Square className="w-3.5 h-3.5 fill-rose-300" />
                </button>
              ) : (
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  title="Gửi câu hỏi"
                  className="p-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-30 disabled:hover:bg-indigo-600 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center justify-between mt-1 px-1 text-[10px] text-slate-500">
              <span>Enter để gửi • Shift+Enter để xuống dòng</span>
              <span>Hybrid failover ⚡</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
