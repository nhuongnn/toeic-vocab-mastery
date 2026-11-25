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
} from 'lucide-react';
import { RoleplayConversation, RoleplayMessage } from '@/types/roleplay';
import { CharacterAvatar } from '@/components/roleplay/CharacterAvatar';
import { MarkdownMessage } from '@/components/chat/MarkdownMessage';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/contexts/ProgressContext';
import { useSpeech } from '@/hooks/useSpeech';
import {
  getChatRoomHistory,
  saveChatRoomConversation,
} from '@/lib/roleplay/history';

interface ChatBubbleWindowProps {
  conversation: RoleplayConversation | null;
  onUpdateConversation: (conv: RoleplayConversation) => void;
  onClose: () => void;
  onOpenSettings: () => void;
}

export function ChatBubbleWindow({
  conversation,
  onUpdateConversation,
  onClose,
  onOpenSettings,
}: ChatBubbleWindowProps) {
  const { user } = useAuth();
  const { progress, syncChatRoomHistory } = useProgress();
  const { speak, stop, isPlaying } = useSpeech();

  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [translatingIds, setTranslatingIds] = useState<Record<string, boolean>>({});
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isStreaming || !user?.id) return;

    const now = Date.now();
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
        updatedAt: Date.now(),
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
        updatedAt: Date.now(),
        messageCount: withUserMsgs.length + 1,
      };
      onUpdateConversation(failedConv);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="fixed bottom-20 left-4 sm:left-6 z-50 w-[94vw] sm:w-[360px] h-[70vh] sm:h-[480px] max-h-[calc(100vh-6rem)] flex flex-col rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl shadow-black/60 overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-200">
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

                {!isUser && msg.content && !msg.isError && (
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
                  </div>
                )}
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer */}
      <form
        onSubmit={handleSend}
        className="p-3 bg-slate-950/90 border-t border-slate-800 flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập tin nhắn tiếng Anh..."
          disabled={isStreaming}
          className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 disabled:opacity-60"
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
