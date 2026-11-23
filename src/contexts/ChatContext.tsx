'use client';

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import {
  ChatMessage,
  WordContext,
  AIProvider,
  AIModelPreference,
  StreamEvent,
  AiTutorConversation,
} from '@/lib/ai/types';
import {
  getAiTutorHistory,
  saveAiTutorConversation,
  deleteAiTutorConversation,
  clearAllAiTutorHistory,
  generateTutorConversationId,
} from '@/lib/ai/history';
import { getGuestId } from '@/lib/ai/guest-id';
import { useAuth } from './AuthContext';
import { useProgress } from './ProgressContext';

export interface QuotaExceededInfo {
  code: string;
  message: string;
  limit: number;
  usedToday: number;
  isGuest: boolean;
}

export interface UserQuotaStatus {
  limit: number;
  usedToday: number;
  remaining: number;
  isGuest: boolean;
  guestLimit: number;
  userLimit: number;
}

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
  selectedModel: AIModelPreference;
  setSelectedModel: (model: AIModelPreference) => void;
  isFallbackActive: boolean;
  fallbackReason: string | null;
  sendMessage: (content: string, overrideWordContext?: WordContext) => Promise<void>;
  clearMessages: () => void;
  stopGeneration: () => void;

  // Quota tracking & Guest login prompt
  quotaExceededInfo: QuotaExceededInfo | null;
  clearQuotaError: () => void;
  userQuota: UserQuotaStatus | null;
  refreshUserQuota: () => Promise<void>;

  // Multi-conversation & History features
  currentConversationId: string | null;
  history: AiTutorConversation[];
  startNewConversation: (wordContext?: WordContext) => void;
  loadConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  clearAllHistory: () => void;
  addSnippetContext: (snippet: string, initialPrompt?: string) => void;
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
  const { user } = useAuth();
  const { syncAiTutorHistory } = useProgress();

  const [isOpen, setIsOpen] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [history, setHistory] = useState<AiTutorConversation[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeWordContext, setActiveWordContext] = useState<WordContext | null>(null);
  const [activeProvider, setActiveProvider] = useState<AIProvider | null>(null);
  const [activeModel, setActiveModel] = useState<string | null>(null);
  const [selectedModel, setSelectedModelState] = useState<AIModelPreference>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('toeic_ai_model_preference') as AIModelPreference;
        if (saved && (saved === 'auto' || saved === 'gemini' || saved === 'cloudflare')) {
          return saved;
        }
      } catch {
        // ignore
      }
    }
    return 'auto';
  });
  const [isFallbackActive, setIsFallbackActive] = useState(false);
  const [fallbackReason, setFallbackReason] = useState<string | null>(null);

  // Quota & Guest limits state
  const [quotaExceededInfo, setQuotaExceededInfo] = useState<QuotaExceededInfo | null>(null);
  const [userQuota, setUserQuota] = useState<UserQuotaStatus | null>(null);

  const clearQuotaError = useCallback(() => {
    setQuotaExceededInfo(null);
  }, []);

  const refreshUserQuota = useCallback(async () => {
    try {
      const guestId = !user ? getGuestId() : '';
      const params = new URLSearchParams();
      if (guestId) params.set('guestId', guestId);
      if (user?.id) params.set('userId', user.id);
      if (user?.email) params.set('email', user.email);

      const res = await fetch(`/api/chat?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.userQuota) {
          setUserQuota(data.userQuota);
        }
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
      // ignore
    }
  }, [user]);

  useEffect(() => {
    refreshUserQuota();
  }, [refreshUserQuota]);

  const abortControllerRef = useRef<AbortController | null>(null);
  const currentConversationIdRef = useRef<string | null>(null);
  const historyRef = useRef<AiTutorConversation[]>(history);
  const activeWordContextRef = useRef<WordContext | null>(activeWordContext);

  useEffect(() => {
    currentConversationIdRef.current = currentConversationId;
  }, [currentConversationId]);

  useEffect(() => {
    historyRef.current = history;
  }, [history]);

  useEffect(() => {
    activeWordContextRef.current = activeWordContext;
  }, [activeWordContext]);

  const setSelectedModel = (model: AIModelPreference) => {
    setSelectedModelState(model);
    try {
      localStorage.setItem('toeic_ai_model_preference', model);
    } catch {
      // ignore
    }
  };

  // Sync user state on mount and auth changes:
  // Strictly isolate history per user; if user is not logged in, history is empty and nothing is saved
  useEffect(() => {
    if (user?.id) {
      const savedHistory = getAiTutorHistory(user.id);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHistory(savedHistory);
    } else {
      // Logged out or guest: clear history & reset current conversation
      setHistory([]);
      setCurrentConversationId(null);
      currentConversationIdRef.current = null;
      setMessages([INITIAL_WELCOME_MESSAGE]);
      setActiveWordContext(null);
    }
  }, [user]);

  // Listen for storage/sync update events across tabs / cloud sync
  useEffect(() => {
    const handleHistoryUpdated = (e: Event) => {
      const customEvent = e as CustomEvent<{ userId: string; history: AiTutorConversation[] }>;
      if (customEvent.detail && customEvent.detail.userId === user?.id) {
        setHistory(customEvent.detail.history || []);
      }
    };

    window.addEventListener('ai-tutor-history-updated', handleHistoryUpdated);
    return () => {
      window.removeEventListener('ai-tutor-history-updated', handleHistoryUpdated);
    };
  }, [user?.id]);

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

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
  }, []);

  const startNewConversation = useCallback((wordContext?: WordContext) => {
    stopGeneration();
    setCurrentConversationId(null);
    currentConversationIdRef.current = null;
    setMessages([
      {
        ...INITIAL_WELCOME_MESSAGE,
        timestamp: Date.now(),
      },
    ]);
    setActiveWordContext(wordContext || null);
  }, [stopGeneration]);

  const loadConversation = useCallback((id: string) => {
    stopGeneration();
    const conv =
      historyRef.current.find((c) => c.id === id) ||
      getAiTutorHistory(user?.id).find((c) => c.id === id);

    if (conv) {
      setCurrentConversationId(conv.id);
      currentConversationIdRef.current = conv.id;
      setMessages(conv.messages.length > 0 ? conv.messages : [INITIAL_WELCOME_MESSAGE]);
      setActiveWordContext(conv.wordContext || null);
    }
  }, [stopGeneration, user]);

  const deleteConversation = useCallback((id: string) => {
    if (!user?.id) return;
    const updated = deleteAiTutorConversation(user.id, id);
    setHistory(updated);
    syncAiTutorHistory(updated);

    if (currentConversationIdRef.current === id) {
      startNewConversation();
    }
  }, [user, syncAiTutorHistory, startNewConversation]);

  const clearAllHistory = useCallback(() => {
    if (!user?.id) return;
    clearAllAiTutorHistory(user.id);
    setHistory([]);
    syncAiTutorHistory([]);
    startNewConversation();
  }, [user, syncAiTutorHistory, startNewConversation]);

  const clearMessages = useCallback(() => {
    if (currentConversationIdRef.current && user?.id) {
      deleteConversation(currentConversationIdRef.current);
    } else {
      startNewConversation();
    }
  }, [user, deleteConversation, startNewConversation]);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const sendMessage = useCallback(
    async (content: string, overrideWordContext?: WordContext) => {
      const trimmed = content.trim();
      if (!trimmed || isLoading) return;

      const currentContext = overrideWordContext || activeWordContextRef.current;

      // Assign or create conversation ID
      let convId = currentConversationIdRef.current;
      if (!convId) {
        convId = generateTutorConversationId();
        currentConversationIdRef.current = convId;
        setCurrentConversationId(convId);
      }

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
      setQuotaExceededInfo(null);

      abortControllerRef.current = new AbortController();

      let accumulatedContent = '';
      let streamProvider: AIProvider = activeProvider || 'gemini';
      let streamFallback = false;

      const guestId = !user ? getGuestId() : undefined;

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(user?.id ? { 'x-user-id': user.id } : {}),
            ...(user?.email ? { 'x-user-email': user.email } : {}),
            ...(guestId ? { 'x-guest-id': guestId } : {}),
          },
          body: JSON.stringify({
            messages: nextMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
            wordContext: currentContext || undefined,
            providerPreference: selectedModel,
            userId: user?.id,
            userEmail: user?.email,
            guestId,
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          let errDesc = 'Failed to connect to AI server';
          let errCode: string | undefined;
          let limit = 0;
          let usedToday = 0;
          let isGuest = !user;

          try {
            const errData = await response.json();
            errDesc = errData.error || errDesc;
            errCode = errData.code;
            limit = errData.limit || 0;
            usedToday = errData.usedToday || 0;
            if (typeof errData.isGuest === 'boolean') {
              isGuest = errData.isGuest;
            }
          } catch {
            // ignore
          }

          if (errCode === 'GUEST_LIMIT_REACHED' || errCode === 'USER_LIMIT_REACHED' || response.status === 429) {
            setQuotaExceededInfo({
              code: errCode || (isGuest ? 'GUEST_LIMIT_REACHED' : 'USER_LIMIT_REACHED'),
              message: errDesc,
              limit,
              usedToday,
              isGuest,
            });
          }

          throw new Error(errDesc);
        }

        if (!response.body) {
          throw new Error('No response stream received');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

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
                streamProvider = event.provider;
                streamFallback = event.fallback;
                setActiveProvider(event.provider);
                setActiveModel(event.model);
                setIsFallbackActive(event.fallback);
                if (event.reason) {
                  setFallbackReason(event.reason);
                }
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
                if (event.code === 'GUEST_LIMIT_REACHED' || event.code === 'USER_LIMIT_REACHED') {
                  setQuotaExceededInfo({
                    code: event.code,
                    message: event.message,
                    limit: event.limit || 0,
                    usedToday: event.usedToday || 0,
                    isGuest: Boolean(event.isGuest ?? !user),
                  });
                }
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
        accumulatedContent =
          accumulatedContent || `⚠️ Không thể kết nối tới AI. Chi tiết: ${errMsg}`;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId
              ? {
                  ...msg,
                  content: accumulatedContent,
                }
              : msg
          )
        );
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
        refreshUserQuota();

        // STRICT REQUIREMENT: Only save conversation if user is logged in!
        // Do NOT save if user is not authenticated.
        if (user?.id) {
          const finalAssistantMsg: ChatMessage = {
            id: assistantMsgId,
            role: 'assistant',
            content: accumulatedContent,
            timestamp: Date.now(),
            provider: streamProvider,
            isFallback: streamFallback,
          };

          const finalMessages = [...nextMessages, finalAssistantMsg];

          const existingConv = historyRef.current.find((c) => c.id === convId);
          const autoTitle = currentContext?.selectedText
            ? `Đoạn trích: "${currentContext.selectedText.slice(0, 30)}..."`
            : currentContext?.word
            ? `Từ vựng: ${currentContext.word}`
            : trimmed.length > 40
            ? `${trimmed.slice(0, 40)}...`
            : trimmed;

          const convToSave: AiTutorConversation = {
            id: convId,
            title: existingConv?.title || autoTitle,
            messages: finalMessages,
            wordContext: currentContext || null,
            createdAt: existingConv?.createdAt || Date.now(),
            updatedAt: Date.now(),
            messageCount: finalMessages.filter((m) => m.role === 'user').length,
            lastMessageSnippet:
              (accumulatedContent || trimmed).slice(0, 90).replace(/[*#`_]/g, '') ||
              trimmed.slice(0, 90),
          };

          const updated = saveAiTutorConversation(user.id, convToSave);
          setHistory(updated);
          syncAiTutorHistory(updated);
        }
      }
    },
    [
      isLoading,
      messages,
      activeProvider,
      selectedModel,
      user,
      syncAiTutorHistory,
    ]
  );

  const openChat = useCallback(
    (initialPrompt?: string, wordContext?: WordContext) => {
      if (wordContext) {
        // If switching to a different word or if existing conversation has user messages, start fresh
        if (
          (activeWordContextRef.current &&
            activeWordContextRef.current.word !== wordContext.word) ||
          messages.some((m) => m.role === 'user')
        ) {
          startNewConversation(wordContext);
        } else {
          setActiveWordContext(wordContext);
        }
      }
      setIsOpen(true);
      if (initialPrompt && initialPrompt.trim()) {
        setTimeout(() => {
          sendMessage(initialPrompt, wordContext);
        }, 100);
      }
    },
    [messages, startNewConversation, sendMessage]
  );

  const addSnippetContext = useCallback(
    (snippet: string, initialPrompt?: string) => {
      const trimmed = snippet.trim();
      if (!trimmed) return;

      const snippetContext: WordContext = {
        word: trimmed.length > 40 ? `${trimmed.slice(0, 40)}...` : trimmed,
        selectedText: trimmed,
      };

      startNewConversation(snippetContext);
      setIsOpen(true);

      if (initialPrompt && initialPrompt.trim()) {
        setTimeout(() => {
          sendMessage(initialPrompt, snippetContext);
        }, 100);
      }
    },
    [startNewConversation, sendMessage]
  );

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
        selectedModel,
        setSelectedModel,
        isFallbackActive,
        fallbackReason,
        sendMessage,
        clearMessages,
        stopGeneration,
        currentConversationId,
        history,
        startNewConversation,
        loadConversation,
        deleteConversation,
        clearAllHistory,
        addSnippetContext,
        quotaExceededInfo,
        clearQuotaError,
        userQuota,
        refreshUserQuota,
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
