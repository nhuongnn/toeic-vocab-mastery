'use client';

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import {
  ChatMessage,
  WordContext,
  AIProvider,
  StreamEvent,
} from '@/lib/ai/types';

interface ChatContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  openChat: (initialPrompt?: string, wordContext?: WordContext) => void;
  closeChat: () => void;
  messages: ChatMessage[];
  isLoading: boolean;
  activeWordContext: WordContext | null;
  setWordContext: (context: WordContext | null) => void;
  activeProvider: AIProvider | null;
  activeModel: string | null;
  isFallbackActive: boolean;
  fallbackReason: string | null;
  sendMessage: (content: string, overrideWordContext?: WordContext) => Promise<void>;
  clearMessages: () => void;
  stopGeneration: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const INITIAL_WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome-msg',
  role: 'assistant',
  content:
    'Chào bạn! Mình là **TOEIC AI Tutor** 🤖. Bạn có thể hỏi mình về nghĩa từ vựng chuyên sâu, cách dùng trong bài thi TOEIC (Part 5, 6, 7), bẫy ngữ pháp, hoặc tạo câu ví dụ trong ngữ cảnh công sở. Hãy chọn một câu hỏi gợi ý bên dưới hoặc gõ câu hỏi của bạn nhé!',
  timestamp: 0,
  provider: 'gemini',
};

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeWordContext, setActiveWordContext] = useState<WordContext | null>(null);
  const [activeProvider, setActiveProvider] = useState<AIProvider | null>(null);
  const [activeModel, setActiveModel] = useState<string | null>(null);
  const [isFallbackActive, setIsFallbackActive] = useState(false);
  const [fallbackReason, setFallbackReason] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  // Check providers status on mount
  useEffect(() => {
    async function checkStatus() {
      try {
        const res = await fetch('/api/chat');
        if (res.ok) {
          const data = await res.json();
          if (data.providers?.gemini?.available) {
            setActiveProvider('gemini');
            setActiveModel(data.providers.gemini.model);
          } else if (data.providers?.cloudflare?.available) {
            setActiveProvider('cloudflare');
            setActiveModel(data.providers.cloudflare.model);
            setIsFallbackActive(true);
            setFallbackReason('Using Cloudflare Workers AI');
          }
        }
      } catch {
        // ignore background status check failure
      }
    }
    checkStatus();
  }, []);

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
  };

  const clearMessages = () => {
    stopGeneration();
    setMessages([
      {
        ...INITIAL_WELCOME_MESSAGE,
        timestamp: Date.now(),
      },
    ]);
  };

  const openChat = (initialPrompt?: string, wordContext?: WordContext) => {
    if (wordContext) {
      setActiveWordContext(wordContext);
    }
    setIsOpen(true);
    if (initialPrompt && initialPrompt.trim()) {
      // Trigger prompt after opening
      setTimeout(() => {
        sendMessage(initialPrompt, wordContext);
      }, 100);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const sendMessage = async (
    content: string,
    overrideWordContext?: WordContext
  ) => {
    const trimmed = content.trim();
    if (!trimmed || isLoading) return;

    const currentContext = overrideWordContext || activeWordContext;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: Date.now(),
    };

    const assistantMsgId = `assistant-${Date.now()}`;
    const initialAssistantMessage: ChatMessage = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      provider: activeProvider || 'gemini',
    };

    const nextMessages = [...messages, userMessage];
    setMessages([...nextMessages, initialAssistantMessage]);
    setIsLoading(true);

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          wordContext: currentContext || undefined,
          providerPreference: 'auto',
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        let errDesc = 'Failed to connect to AI server';
        try {
          const errData = await response.json();
          errDesc = errData.error || errDesc;
        } catch {
          // ignore
        }
        throw new Error(errDesc);
      }

      if (!response.body) {
        throw new Error('No response stream received');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let accumulatedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine || !trimmedLine.startsWith('data:')) continue;

          const dataStr = trimmedLine.slice(5).trim();
          if (dataStr === '[DONE]') break;

          try {
            const event: StreamEvent = JSON.parse(dataStr);

            if (event.type === 'meta') {
              setActiveProvider(event.provider);
              setActiveModel(event.model);
              setIsFallbackActive(event.fallback);
              if (event.reason) {
                setFallbackReason(event.reason);
              }
              // Update assistant message with current provider metadata
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantMsgId
                    ? {
                        ...msg,
                        provider: event.provider,
                        isFallback: event.fallback,
                      }
                    : msg
                )
              );
            } else if (event.type === 'content') {
              accumulatedContent += event.text;
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantMsgId
                    ? { ...msg, content: accumulatedContent }
                    : msg
                )
              );
            } else if (event.type === 'error') {
              accumulatedContent += `\n\n> ⚠️ *Lỗi: ${event.message}*`;
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantMsgId
                    ? { ...msg, content: accumulatedContent }
                    : msg
                )
              );
            }
          } catch {
            // ignore JSON parse on incomplete chunks
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        // Stopped by user
        return;
      }
      const errMsg = err instanceof Error ? err.message : String(err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? {
                ...msg,
                content:
                  msg.content ||
                  `⚠️ Không thể kết nối tới AI. Chi tiết: ${errMsg}`,
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        setIsOpen,
        openChat,
        closeChat,
        messages,
        isLoading,
        activeWordContext,
        setWordContext: setActiveWordContext,
        activeProvider,
        activeModel,
        isFallbackActive,
        fallbackReason,
        sendMessage,
        clearMessages,
        stopGeneration,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
