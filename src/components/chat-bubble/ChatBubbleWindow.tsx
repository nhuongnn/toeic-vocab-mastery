'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Settings,
  Send,
  Volume2,
  Languages,
  Loader2,
  Sparkles,
  Lightbulb,
  RefreshCw,
  CornerDownLeft,
} from 'lucide-react';
import {
  RoleplayConversation,
  RoleplayMessage,
  RoleplaySuggestion,
} from '@/types/roleplay';
import { CharacterAvatar } from '@/components/roleplay/CharacterAvatar';
import { MarkdownMessage } from '@/components/chat/MarkdownMessage';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/contexts/ProgressContext';
import { useSpeech } from '@/hooks/useSpeech';
import {
  getChatRoomHistory,
  saveChatRoomConversation,
} from '@/lib/roleplay/history';
import { formatMessageFullTime, formatMessageTime } from '@/lib/utils';

interface ChatBubbleWindowProps {
  conversation: RoleplayConversation | null;
  onUpdateConversation: (conv: RoleplayConversation) => void;
  onClose: () => void;
  onOpenSettings: () => void;
  anchorStyle?: React.CSSProperties;
  positionClassName?: string;
}

const getNow = () => Date.now();

export function ChatBubbleWindow({
  conversation,
  onUpdateConversation,
  onClose,
  onOpenSettings,
  anchorStyle,
  positionClassName = 'bottom-20 left-4 sm:left-6',
}: ChatBubbleWindowProps) {
  const { user } = useAuth();
  const { progress, syncChatRoomHistory } = useProgress();
  const { speak, stop, isPlaying } = useSpeech();

  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [translatingIds, setTranslatingIds] = useState<Record<string, boolean>>({});
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<RoleplaySuggestion[]>([]);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages.length, isStreaming]);

  const activeSpeakingId = isPlaying ? speakingId : null;

  if (!conversation) return null;

  const translations = conversation.translations || {};

  const handleSpeak = (id: string, text: string) => {
    if (speakingId === id && isPlaying) {
      stop();
      setSpeakingId(null);
      return;
    }
    setSpeakingId(id);
    speak(text, 'en-US', 0.9);
  };

  const handleTranslate = async (id: string, text: string) => {
    if (translations[id] || translatingIds[id]) return;

    setTranslatingIds((prev) => ({ ...prev, [id]: true }));
    try {
      const res = await fetch(
        `/api/translate?text=${encodeURIComponent(text)}&from=en&to=vi`
      );
      if (res.ok) {
        const data = await res.json();
        if (data.translatedText) {
          const updatedConv: RoleplayConversation = {
            ...conversation,
            translations: {
              ...translations,
              [id]: data.translatedText,
            },
          };
          const updatedHistory = saveChatRoomConversation(updatedConv);
          syncChatRoomHistory(
            updatedHistory.length ? updatedHistory : getChatRoomHistory()
          );
          onUpdateConversation(updatedConv);
        }
      }
    } catch (err) {
      console.warn('Bubble translate failed:', err);
    } finally {
      setTranslatingIds((prev) => ({ ...prev, [id]: false }));
    }
  };

  const sendTextMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isStreaming || !user?.id) return;

    setShowSuggestions(false);
    const now = getNow();
    const userMsg: RoleplayMessage = {
      id: `user-${now}`,
      role: 'user',
      content: trimmed,
      timestamp: now,
    };

    const assistantId = `assistant-${now + 1}`;
    const placeholderAssistant: RoleplayMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: now + 1,
    };

    const withUserMsgs = [...conversation.messages, userMsg];
    const optimisticConv: RoleplayConversation = {
      ...conversation,
      messages: [...withUserMsgs, placeholderAssistant],
      updatedAt: now,
      messageCount: withUserMsgs.length,
      lastMessageSnippet: trimmed.slice(0, 120),
    };

    onUpdateConversation(optimisticConv);
    setInput('');
    setIsStreaming(true);

    let fullContent = '';
    let provider: 'gemini' | 'cloudflare' = 'gemini';

    try {
      const res = await fetch('/api/roleplay/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id,
          ...(user.email ? { 'x-user-email': user.email } : {}),
        },
        body: JSON.stringify({
          messages: withUserMsgs.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          character: conversation.character,
          scenario: conversation.scenario,
          userContext: {
            targetScore: 650,
            totalWordsLearned: Object.keys(progress.cards || {}).length,
          },
          providerPreference: 'auto',
          userId: user.id,
          userEmail: user.email,
        }),
      });

      if (!res.ok || !res.body) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Không thể gửi tin nhắn.');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine.startsWith('data:')) continue;
          const jsonStr = trimmedLine.replace(/^data:\s*/, '');
          try {
            const event = JSON.parse(jsonStr);
            if (event.type === 'content' && event.text) {
              fullContent += event.text;
              onUpdateConversation({
                ...optimisticConv,
                messages: [
                  ...withUserMsgs,
                  {
                    ...placeholderAssistant,
                    content: fullContent,
                    provider,
                  },
                ],
              });
            } else if (event.type === 'meta' && event.provider) {
              provider = event.provider;
            } else if (event.type === 'error') {
              throw new Error(event.message || 'Lỗi từ AI');
            }
          } catch {
            // Ignore partial JSON chunk
          }
        }
      }

      const finalMessages: RoleplayMessage[] = [
        ...withUserMsgs,
        {
          ...placeholderAssistant,
          content: fullContent || 'Sorry, I missed that. Could you say it again?',
          provider,
        },
      ];

      const finalConv: RoleplayConversation = {
        ...conversation,
        messages: finalMessages,
        updatedAt: getNow(),
        messageCount: finalMessages.length,
        lastMessageSnippet: (fullContent || trimmed).slice(0, 120),
        isAutoBubble: true,
      };

      const updatedHistory = saveChatRoomConversation(finalConv);
      syncChatRoomHistory(
        updatedHistory.length ? updatedHistory : getChatRoomHistory()
      );
      onUpdateConversation(finalConv);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Lỗi kết nối AI';
      const failedConv: RoleplayConversation = {
        ...conversation,
        messages: [
          ...withUserMsgs,
          {
            ...placeholderAssistant,
            content: errMsg,
            isError: true,
            errorMessage: errMsg,
          },
        ],
        updatedAt: getNow(),
        messageCount: withUserMsgs.length + 1,
      };
      onUpdateConversation(failedConv);
    } finally {
      setIsStreaming(false);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    sendTextMessage(input);
  };

  const handleFetchSuggestions = async () => {
    if (!user?.id) return;
    setShowSuggestions(true);
    setIsSuggestionsLoading(true);
    try {
      const res = await fetch('/api/roleplay/suggest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id,
          ...(user.email ? { 'x-user-email': user.email } : {}),
        },
        body: JSON.stringify({
          character: conversation.character,
          scenario: conversation.scenario,
          chatHistory: conversation.messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          targetScore: 650,
          providerPreference: 'auto',
          userId: user.id,
          userEmail: user.email,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setSuggestions(Array.isArray(data.suggestions) ? data.suggestions : []);
      }
    } catch (err) {
      console.warn('Bubble fetch suggestions failed:', err);
    } finally {
      setIsSuggestionsLoading(false);
    }
  };

  const handleSelectSuggestion = (text: string, autoSend = false) => {
    if (autoSend) {
      sendTextMessage(text);
    } else {
      setInput(text);
      setShowSuggestions(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div
      style={anchorStyle}
      className={`fixed ${positionClassName} z-50 w-[94vw] sm:w-[360px] h-[70vh] sm:h-[480px] max-h-[calc(100vh-6rem)] flex flex-col rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl shadow-black/60 overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-200`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/90 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <CharacterAvatar avatarId={conversation.character.avatar} size="sm" />
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-white truncate">
              {conversation.character.name}
            </h4>
            <p className="text-[10px] text-indigo-400 truncate">
              {conversation.scenario.vietnameseTitle || conversation.scenario.title}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={onOpenSettings}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Cài đặt Chat Bubble"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Thu nhỏ"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-slate-900/60">
        {conversation.messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4 space-y-2.5">
            <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-slate-200">
              Bắt đầu trò chuyện cùng {conversation.character.name}
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Nhắn tin bằng tiếng Anh bên dưới hoặc bật tự động gửi tin trong phần cài đặt.
            </p>
          </div>
        ) : (
          conversation.messages.map((msg) => {
            const isUser = msg.role === 'user';
            const translation = translations[msg.id];
            const isTranslating = translatingIds[msg.id];
            const isSpeaking = activeSpeakingId === msg.id;
            const timeLabel = formatMessageTime(msg.timestamp);
            const fullTimeLabel = formatMessageFullTime(msg.timestamp);

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    isUser
                      ? 'bg-indigo-600 text-white rounded-br-sm'
                      : msg.isError
                      ? 'bg-rose-500/15 border border-rose-500/30 text-rose-200 rounded-bl-sm'
                      : 'bg-slate-800 text-slate-100 border border-slate-700/70 rounded-bl-sm'
                  }`}
                >
                  {isUser ? (
                    <span className="whitespace-pre-wrap">{msg.content}</span>
                  ) : msg.content ? (
                    <MarkdownMessage content={msg.content} />
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-slate-400">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Đang nhập...</span>
                    </span>
                  )}

                  {translation && (
                    <div className="mt-2 pt-2 border-t border-slate-700/60 text-[11px] text-indigo-200/90 italic">
                      {translation}
                    </div>
                  )}
                </div>

                {!isUser && msg.content && !msg.isError ? (
                  <div className="flex items-center gap-2 mt-1 px-1">
                    <button
                      type="button"
                      onClick={() => handleSpeak(msg.id, msg.content)}
                      className={`inline-flex items-center gap-1 text-[10px] font-medium transition-colors ${
                        isSpeaking
                          ? 'text-indigo-400'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="Nghe phát âm"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>{isSpeaking ? 'Dừng' : 'Nghe'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTranslate(msg.id, msg.content)}
                      disabled={isTranslating}
                      className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-400 hover:text-slate-200 transition-colors disabled:opacity-50"
                      title="Dịch tiếng Việt"
                    >
                      <Languages className="w-3 h-3" />
                      <span>
                        {isTranslating
                          ? 'Đang dịch...'
                          : translation
                          ? 'Đã dịch'
                          : 'Dịch'}
                      </span>
                    </button>
                    {timeLabel && (
                      <span
                        className="text-[10px] text-slate-500 tabular-nums"
                        title={fullTimeLabel}
                      >
                        • {timeLabel}
                      </span>
                    )}
                  </div>
                ) : (
                  timeLabel && (
                    <span
                      className="mt-1 px-1 text-[10px] text-slate-500 tabular-nums"
                      title={fullTimeLabel}
                    >
                      {timeLabel}
                    </span>
                  )
                )}
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* AI Suggestions Panel */}
      {showSuggestions && (
        <div className="border-t border-indigo-500/30 bg-slate-950/95 p-3 max-h-[210px] flex flex-col gap-2 shrink-0 animate-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-300">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Gợi ý câu trả lời AI</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleFetchSuggestions}
                disabled={isSuggestionsLoading}
                className="p-1 rounded-md text-slate-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors disabled:opacity-40"
                title="Tạo gợi ý khác"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${isSuggestionsLoading ? 'animate-spin text-indigo-400' : ''}`}
                />
              </button>
              <button
                type="button"
                onClick={() => setShowSuggestions(false)}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Đóng gợi ý"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {isSuggestionsLoading ? (
            <div className="py-4 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
              <span>Đang tạo gợi ý theo ngữ cảnh...</span>
            </div>
          ) : suggestions.length === 0 ? (
            <p className="py-3 text-center text-[11px] text-slate-400">
              Chưa có gợi ý. Bấm làm mới để thử lại.
            </p>
          ) : (
            <div className="flex-1 min-h-0 overflow-y-auto space-y-2 pr-1">
              {suggestions.map((sug) => (
                <div
                  key={sug.id}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                      {sug.label}
                    </span>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-100 leading-snug">
                    &ldquo;{sug.english}&rdquo;
                  </p>
                  <p className="text-[10px] text-slate-400 italic leading-snug">
                    {sug.vietnamese}
                  </p>
                  <div className="flex items-center gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => handleSelectSuggestion(sug.english, false)}
                      className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-medium transition-colors"
                    >
                      <CornerDownLeft className="w-3 h-3 text-indigo-400" />
                      <span>Dùng câu này</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectSuggestion(sug.english, true)}
                      disabled={isStreaming}
                      className="inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-semibold transition-colors disabled:opacity-50"
                    >
                      <Send className="w-2.5 h-2.5" />
                      <span>Gửi luôn</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <form
        onSubmit={handleSend}
        className="p-3 bg-slate-950/90 border-t border-slate-800 flex items-center gap-2 shrink-0"
      >
        <button
          type="button"
          onClick={() => {
            if (showSuggestions) {
              setShowSuggestions(false);
            } else {
              handleFetchSuggestions();
            }
          }}
          disabled={isStreaming}
          className={`p-2 rounded-xl border transition-colors shrink-0 disabled:opacity-50 ${
            showSuggestions
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
              : 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800'
          }`}
          title="Gợi ý câu trả lời từ AI"
          aria-label="Gợi ý câu trả lời từ AI"
        >
          <Lightbulb className="w-4 h-4" />
        </button>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập tin nhắn tiếng Anh..."
          disabled={isStreaming}
          className="flex-1 min-w-0 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={!input.trim() || isStreaming}
          className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors disabled:opacity-50 shrink-0"
          aria-label="Gửi tin nhắn"
        >
          {isStreaming ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </form>
    </div>
  );
}
