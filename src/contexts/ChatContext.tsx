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
  renameAiTutorConversation,
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
  openChat: (
    initialPrompt?: string,
    wordContext?: WordContext | WordContext[],
    options?: { append?: boolean }
  ) => void;
  closeChat: () => void;
  messages: ChatMessage[];
  isLoading: boolean;
  activeWordContext: WordContext | null;
  activeWordContexts: WordContext[];
  setWordContext: (context: WordContext | null) => void;
  setWordContexts: (contexts: WordContext[]) => void;
  addWordContext: (context: WordContext, autoOpen?: boolean) => void;
  removeWordContext: (idOrWord: string) => void;
  clearWordContexts: () => void;
  activeProvider: AIProvider | null;
  activeModel: string | null;
  selectedModel: AIModelPreference;
  setSelectedModel: (model: AIModelPreference) => void;
  isFallbackActive: boolean;
  fallbackReason: string | null;
  sendMessage: (content: string, overrideWordContexts?: WordContext[]) => Promise<void>;
  retryMessage: (failedAssistantMsgId?: string, overrideModel?: AIModelPreference) => Promise<void>;
  clearMessages: () => void;
  stopGeneration: () => void;

  // Quota tracking & Guest login prompt
  quotaExceededInfo: QuotaExceededInfo | null;
  clearQuotaError: () => void;
  userQuota: UserQuotaStatus | null;
  refreshUserQuota: () => Promise<void>;

  // Multi-conversation & History features
  currentConversationId: string | null;
  currentConversationTitle: string | null;
  history: AiTutorConversation[];
  startNewConversation: (wordContext?: WordContext | WordContext[]) => void;
  loadConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  renameConversation: (id: string, newTitle: string) => void;
  clearAllHistory: () => void;
  addSnippetContext: (snippet: string, initialPrompt?: string, append?: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const INITIAL_WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome-msg',
  role: 'assistant',
  content:
    'Chào bạn! Mình là **TOEIC AI Tutor** 🤖. Bạn có thể hỏi mình về nghĩa từ vựng chuyên sâu, cách dùng trong bài thi TOEIC (Part 5, 6, 7), bẫy ngữ pháp, hoặc tạo câu ví dụ trong ngữ cảnh công sở. Bạn có thể thêm **nhiều ngữ cảnh (từ vựng, đoạn trích)** để so sánh hoặc học kết hợp nhé!',
  timestamp: 0,
  provider: 'gemini',
};

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { syncAiTutorHistory } = useProgress();

  const [isOpen, setIsOpen] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [currentConversationTitle, setCurrentConversationTitle] = useState<string | null>(null);
  const [history, setHistory] = useState<AiTutorConversation[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeWordContexts, setActiveWordContexts] = useState<WordContext[]>([]);
  const activeWordContext = activeWordContexts.length > 0 ? activeWordContexts[0] : null;

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
  const currentConversationTitleRef = useRef<string | null>(null);
  const historyRef = useRef<AiTutorConversation[]>(history);
  const activeWordContextsRef = useRef<WordContext[]>(activeWordContexts);

  useEffect(() => {
    currentConversationIdRef.current = currentConversationId;
  }, [currentConversationId]);

  useEffect(() => {
    currentConversationTitleRef.current = currentConversationTitle;
  }, [currentConversationTitle]);

  useEffect(() => {
    historyRef.current = history;
  }, [history]);

  useEffect(() => {
    activeWordContextsRef.current = activeWordContexts;
  }, [activeWordContexts]);

  const setSelectedModel = (model: AIModelPreference) => {
    setSelectedModelState(model);
    try {
      localStorage.setItem('toeic_ai_model_preference', model);
    } catch {
      // ignore
    }
  };

  const addWordContext = useCallback((context: WordContext, autoOpen = true) => {
    setActiveWordContexts((prev) => {
      const isSnippet = Boolean(context.selectedText);
      const targetKey = isSnippet
        ? (context.selectedText || '').trim()
        : context.word.trim().toLowerCase();

      const exists = prev.some((c) => {
        const cKey = c.selectedText
          ? (c.selectedText || '').trim()
          : c.word.trim().toLowerCase();
        return cKey === targetKey;
      });

      if (exists) {
        return prev.map((c) => {
          const cKey = c.selectedText
            ? (c.selectedText || '').trim()
            : c.word.trim().toLowerCase();
          return cKey === targetKey ? { ...c, ...context } : c;
        });
      }

      const newId =
        context.id || `ctx-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      return [...prev, { ...context, id: newId }];
    });

    if (autoOpen) {
      setIsOpen(true);
    }
  }, []);

  const removeWordContext = useCallback((idOrWord: string) => {
    const target = idOrWord.trim().toLowerCase();
    setActiveWordContexts((prev) =>
      prev.filter(
        (c) =>
          c.id !== idOrWord &&
          c.word.trim().toLowerCase() !== target &&
          (c.selectedText ? c.selectedText.trim() !== idOrWord.trim() : true)
      )
    );
  }, []);

  const clearWordContexts = useCallback(() => {
    setActiveWordContexts([]);
  }, []);

  const setWordContext = useCallback((context: WordContext | null) => {
    if (!context) {
      setActiveWordContexts([]);
    } else {
      const newId = context.id || `ctx-${Date.now()}`;
      setActiveWordContexts([{ ...context, id: newId }]);
    }
  }, []);

  const setWordContexts = useCallback((contexts: WordContext[]) => {
    setActiveWordContexts(
      contexts.map((c, idx) => ({
        ...c,
        id: c.id || `ctx-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
      }))
    );
  }, []);

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
      setCurrentConversationTitle(null);
      currentConversationTitleRef.current = null;
      setMessages([INITIAL_WELCOME_MESSAGE]);
      setActiveWordContexts([]);
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

  const startNewConversation = useCallback(
    (wordContext?: WordContext | WordContext[]) => {
      stopGeneration();
      setCurrentConversationId(null);
      currentConversationIdRef.current = null;
      setCurrentConversationTitle(null);
      currentConversationTitleRef.current = null;
      setMessages([
        {
          ...INITIAL_WELCOME_MESSAGE,
          timestamp: Date.now(),
        },
      ]);
      if (Array.isArray(wordContext)) {
        setWordContexts(wordContext);
      } else if (wordContext) {
        setWordContexts([wordContext]);
      } else {
        setActiveWordContexts([]);
      }
    },
    [stopGeneration, setWordContexts]
  );

  const loadConversation = useCallback((id: string) => {
    stopGeneration();
    const conv =
      historyRef.current.find((c) => c.id === id) ||
      getAiTutorHistory(user?.id).find((c) => c.id === id);

    if (conv) {
      setCurrentConversationId(conv.id);
      currentConversationIdRef.current = conv.id;
      setCurrentConversationTitle(conv.title || null);
      currentConversationTitleRef.current = conv.title || null;
      setMessages(conv.messages.length > 0 ? conv.messages : [INITIAL_WELCOME_MESSAGE]);
      const restored =
        conv.wordContexts && conv.wordContexts.length > 0
          ? conv.wordContexts
          : conv.wordContext
          ? [conv.wordContext]
          : [];
      setActiveWordContexts(restored);
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

  const renameConversation = useCallback(
    (id: string, newTitle: string) => {
      const trimmed = newTitle.trim();
      if (!trimmed) return;

      if (currentConversationIdRef.current === id) {
        setCurrentConversationTitle(trimmed);
        currentConversationTitleRef.current = trimmed;
      }

      if (user?.id) {
        const updated = renameAiTutorConversation(user.id, id, trimmed);
        setHistory(updated);
        syncAiTutorHistory(updated);
      }
    },
    [user, syncAiTutorHistory]
  );

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

  const executeChatStream = useCallback(
    async (
      contextMessages: ChatMessage[],
      assistantMsgId: string,
      modelPreference: AIModelPreference,
      currentContexts: WordContext[],
      convId: string,
      lastUserPrompt?: string
    ) => {
      setIsLoading(true);
      setQuotaExceededInfo(null);

      abortControllerRef.current = new AbortController();

      let accumulatedContent = '';
      let streamProvider: AIProvider =
        modelPreference === 'cloudflare'
          ? 'cloudflare'
          : activeProvider || 'gemini';
      let streamFallback = false;
      let streamFallbackReason: string | undefined = undefined;
      let hasError = false;
      let lastErrorMessage = '';

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
            messages: contextMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
            wordContext: currentContexts[0] || undefined,
            wordContexts: currentContexts.length > 0 ? currentContexts : undefined,
            providerPreference: modelPreference,
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

          if (
            errCode === 'GUEST_LIMIT_REACHED' ||
            errCode === 'USER_LIMIT_REACHED' ||
            response.status === 429
          ) {
            setQuotaExceededInfo({
              code: errCode || (isGuest ? 'GUEST_LIMIT_REACHED' : 'USER_LIMIT_REACHED'),
              message: errDesc,
              limit,
              usedToday,
              isGuest,
            });
          }

          hasError = true;
          lastErrorMessage = errDesc;
          throw new Error(errDesc);
        }

        if (!response.body) {
          hasError = true;
          lastErrorMessage = 'No response stream received';
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
                streamFallbackReason = event.reason;
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
                          fallbackReason: event.reason,
                        }
                      : msg
                  )
                );
              } else if (event.type === 'content') {
                accumulatedContent += event.text;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMsgId
                      ? { ...msg, content: accumulatedContent, isError: false, errorMessage: undefined }
                      : msg
                  )
                );
              } else if (event.type === 'error') {
                hasError = true;
                lastErrorMessage = event.message;
                if (
                  event.code === 'GUEST_LIMIT_REACHED' ||
                  event.code === 'USER_LIMIT_REACHED'
                ) {
                  setQuotaExceededInfo({
                    code: event.code,
                    message: event.message,
                    limit: event.limit || 0,
                    usedToday: event.usedToday || 0,
                    isGuest: Boolean(event.isGuest ?? !user),
                  });
                }
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMsgId
                      ? {
                          ...msg,
                          content: accumulatedContent,
                          isError: true,
                          errorMessage: event.message,
                        }
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
        hasError = true;
        lastErrorMessage = errMsg;
        accumulatedContent =
          accumulatedContent || `⚠️ Không thể kết nối tới AI. Chi tiết: ${errMsg}`;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId
              ? {
                  ...msg,
                  content: accumulatedContent,
                  isError: true,
                  errorMessage: errMsg,
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
            fallbackReason: streamFallbackReason,
            isError: hasError,
            errorMessage: hasError ? lastErrorMessage : undefined,
          };

          const finalMessages = [...contextMessages, finalAssistantMsg];

          const existingConv = historyRef.current.find((c) => c.id === convId);
          const promptSnippet =
            lastUserPrompt ||
            contextMessages.filter((m) => m.role === 'user').slice(-1)[0]?.content ||
            '';

          let autoTitle = 'Hội thoại AI Tutor';
          if (currentContexts.length > 1) {
            const names = currentContexts.map((c) =>
              c.selectedText
                ? `"${c.selectedText.slice(0, 16)}..."`
                : c.word
            );
            autoTitle =
              names.slice(0, 2).join(' + ') +
              (currentContexts.length > 2 ? ` (+${currentContexts.length - 2})` : '');
          } else if (currentContexts.length === 1) {
            const single = currentContexts[0];
            autoTitle = single.selectedText
              ? `Đoạn trích: "${single.selectedText.slice(0, 30)}..."`
              : `Từ vựng: ${single.word}`;
          } else if (promptSnippet) {
            autoTitle =
              promptSnippet.length > 40
                ? `${promptSnippet.slice(0, 40)}...`
                : promptSnippet;
          }

          const convToSave: AiTutorConversation = {
            id: convId,
            title: currentConversationTitleRef.current || existingConv?.title || autoTitle,
            messages: finalMessages,
            wordContext: currentContexts[0] || null,
            wordContexts: currentContexts,
            createdAt: existingConv?.createdAt || Date.now(),
            updatedAt: Date.now(),
            messageCount: finalMessages.filter((m) => m.role === 'user').length,
            lastMessageSnippet:
              (accumulatedContent || promptSnippet).slice(0, 90).replace(/[*#`_]/g, '') ||
              promptSnippet.slice(0, 90),
          };

          const updated = saveAiTutorConversation(user.id, convToSave);
          setHistory(updated);
          syncAiTutorHistory(updated);
        }
      }
    },
    [user, activeProvider, refreshUserQuota, syncAiTutorHistory]
  );

  const sendMessage = useCallback(
    async (content: string, overrideWordContexts?: WordContext[]) => {
      const trimmed = content.trim();
      if (!trimmed || isLoading) return;

      const currentContexts = overrideWordContexts || activeWordContextsRef.current;

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

      await executeChatStream(
        nextMessages,
        assistantMsgId,
        selectedModel,
        currentContexts,
        convId,
        trimmed
      );
    },
    [isLoading, messages, activeProvider, selectedModel, executeChatStream]
  );

  const retryMessage = useCallback(
    async (failedAssistantMsgId?: string, overrideModel?: AIModelPreference) => {
      if (isLoading) return;

      const modelToUse = overrideModel || selectedModel;
      if (overrideModel && overrideModel !== selectedModel) {
        setSelectedModel(overrideModel);
      }

      // Find the assistant message index
      let assistantIndex = -1;
      if (failedAssistantMsgId) {
        assistantIndex = messages.findIndex((m) => m.id === failedAssistantMsgId);
      } else {
        for (let i = messages.length - 1; i >= 0; i--) {
          if (messages[i].role === 'assistant') {
            assistantIndex = i;
            break;
          }
        }
      }

      if (assistantIndex === -1) return;

      // Messages up to the assistant message
      const contextMessages = messages.slice(0, assistantIndex);

      // Must have at least one preceding user message
      const hasUserMsg = contextMessages.some((m) => m.role === 'user');
      if (!hasUserMsg) return;

      let convId = currentConversationIdRef.current;
      if (!convId) {
        convId = generateTutorConversationId();
        currentConversationIdRef.current = convId;
        setCurrentConversationId(convId);
      }

      const newAssistantMsgId = `assistant-${Date.now()}`;
      const newAssistantMessage: ChatMessage = {
        id: newAssistantMsgId,
        role: 'assistant',
        content: '',
        timestamp: Date.now(),
        provider: modelToUse === 'cloudflare' ? 'cloudflare' : 'gemini',
      };

      // Replace the assistant message with the new assistant message
      setMessages([...contextMessages, newAssistantMessage]);

      const lastUserMsg = contextMessages.filter((m) => m.role === 'user').slice(-1)[0];

      await executeChatStream(
        contextMessages,
        newAssistantMsgId,
        modelToUse,
        activeWordContextsRef.current,
        convId,
        lastUserMsg?.content
      );
    },
    [isLoading, messages, selectedModel, executeChatStream]
  );

  const openChat = useCallback(
    (
      initialPrompt?: string,
      wordContext?: WordContext | WordContext[],
      options?: { append?: boolean }
    ) => {
      if (wordContext) {
        const incoming = Array.isArray(wordContext) ? wordContext : [wordContext];
        const hasUserMessages = messages.some((m) => m.role === 'user');

        if (options?.append || hasUserMessages) {
          incoming.forEach((ctx) => addWordContext(ctx, false));
        } else {
          setWordContexts(incoming);
        }
      }
      setIsOpen(true);
      if (initialPrompt && initialPrompt.trim()) {
        setTimeout(() => {
          sendMessage(initialPrompt);
        }, 100);
      }
    },
    [messages, addWordContext, setWordContexts, sendMessage]
  );

  const addSnippetContext = useCallback(
    (snippet: string, initialPrompt?: string, append = true) => {
      const trimmed = snippet.trim();
      if (!trimmed) return;

      const snippetContext: WordContext = {
        id: `snippet-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        type: 'snippet',
        word: trimmed.length > 40 ? `${trimmed.slice(0, 40)}...` : trimmed,
        selectedText: trimmed,
      };

      if (append) {
        addWordContext(snippetContext, true);
      } else {
        startNewConversation(snippetContext);
      }
      setIsOpen(true);

      if (initialPrompt && initialPrompt.trim()) {
        setTimeout(() => {
          sendMessage(initialPrompt);
        }, 100);
      }
    },
    [addWordContext, startNewConversation, sendMessage]
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
        activeWordContexts,
        setWordContext,
        setWordContexts,
        addWordContext,
        removeWordContext,
        clearWordContexts,
        activeProvider,
        activeModel,
        selectedModel,
        setSelectedModel,
        isFallbackActive,
        fallbackReason,
        sendMessage,
        retryMessage,
        clearMessages,
        stopGeneration,
        currentConversationId,
        currentConversationTitle,
        history,
        startNewConversation,
        loadConversation,
        deleteConversation,
        renameConversation,
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
