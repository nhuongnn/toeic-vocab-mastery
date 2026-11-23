'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useMounted } from '@/hooks/useMounted';
import {
  Send,
  Volume2,
  VolumeX,
  Lightbulb,
  Sparkles,
  RefreshCw,
  Settings,
  Target,
  ChevronDown,
  ChevronUp,
  Languages,
  Square,
  Bot,
  User,
  CheckCircle2,
  Trophy,
  ArrowRight,
  Shield,
  Users,
  Briefcase,
  Mic,
  MicOff,
  Dice5,
  History,
  Plus,
  MoreVertical,
  Zap,
  Check,
  X,
  AlertTriangle,
  Lock,
} from 'lucide-react';
import {
  CharacterConfig,
  RoleplayScenario,
  RoleplayMessage,
  RoleplaySuggestion,
  UserLearningContext,
  RoleplaySessionSummary,
  RoleplayConversation,
} from '@/types/roleplay';
import { DEFAULT_CHARACTERS, PRESET_SCENARIOS, getRandomOpeningVariation } from '@/lib/roleplay/scenarios';
import { SuggestionDrawer } from './SuggestionDrawer';
import { RoleplaySetupModal } from './RoleplaySetupModal';
import { CharacterAvatar } from './CharacterAvatar';
import { ChatRoomHistoryModal } from './ChatRoomHistoryModal';
import {
  getChatRoomHistory,
  saveChatRoomConversation,
  deleteChatRoomConversation,
  clearAllChatRoomHistory,
  generateConversationId,
} from '@/lib/roleplay/history';
import { useSpeech } from '@/hooks/useSpeech';
import { useProgress } from '@/contexts/ProgressContext';
import { useAuth } from '@/contexts/AuthContext';
import { getGuestId } from '@/lib/ai/guest-id';
import { StreamEvent, AIModelPreference } from '@/lib/ai/types';

interface RoleplayChatRoomProps {
  userContext: Partial<UserLearningContext>;
}

export function RoleplayChatRoom({ userContext }: RoleplayChatRoomProps) {
  const { progress, saveRoleplaySettings, syncChatRoomHistory } = useProgress();
  const { user, openAuthModal } = useAuth();
  const mounted = useMounted();

  const [guestLimitInfo, setGuestLimitInfo] = useState<{
    limit: number;
    usedToday: number;
    message?: string;
  } | null>(null);

  // 1. Initial State from user progress / sync / defaults
  const [character, setCharacter] = useState<CharacterConfig>(() => {
    return progress.roleplay?.character || DEFAULT_CHARACTERS.boss;
  });
  const [scenario, setScenario] = useState<RoleplayScenario>(() => {
    if (progress.roleplay?.scenarioId) {
      const found = PRESET_SCENARIOS.find((s) => s.id === progress.roleplay?.scenarioId);
      if (found) return found;
    }
    return PRESET_SCENARIOS[0];
  });
  const [userAvatar, setUserAvatar] = useState<string>(() => {
    return progress.roleplay?.userAvatar || 'shiba-intern';
  });
  const [userName, setUserName] = useState<string>(() => {
    return progress.roleplay?.userName || 'Bạn';
  });
  const [setupInitialTab, setSetupInitialTab] = useState<'character' | 'user' | 'scenario'>('character');

  // History State (Max 10 conversations)
  const [activeSessionId, setActiveSessionId] = useState<string>('');
  const activeSessionIdRef = useRef<string>('');
  const [isReviewingHistory, setIsReviewingHistory] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historyList, setHistoryList] = useState<RoleplayConversation[]>([]);
  const sessionCreatedAtRef = useRef<number>(0);
  const isSelectingConversationRef = useRef<boolean>(false);
  const openingAbortControllerRef = useRef<AbortController | null>(null);

  // Sync state if progress.roleplay updates from cloud or another tab
  useEffect(() => {
    // If user is currently reviewing a historical conversation, don't overwrite its character/scenario
    if (isReviewingHistory) {
      return;
    }

    if (progress.roleplay?.character) {
      setCharacter(progress.roleplay.character);
      if (progress.roleplay.scenarioId) {
        const found = PRESET_SCENARIOS.find((s) => s.id === progress.roleplay?.scenarioId);
        if (found) setScenario(found);
      }
      if (progress.roleplay.userAvatar) {
        setUserAvatar(progress.roleplay.userAvatar);
      }
      if (progress.roleplay.userName) {
        setUserName(progress.roleplay.userName);
      }
    }
  }, [progress.roleplay, isReviewingHistory]);

  // Messages
  const [messages, setMessages] = useState<RoleplayMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTranslatingId, setIsTranslatingId] = useState<string | null>(null);
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [showTranslations, setShowTranslations] = useState<Record<string, boolean>>({});

  // Suggestion State (Hidden by default, strictly on demand!)
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<RoleplaySuggestion[]>([]);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const [suggestionMeta, setSuggestionMeta] = useState<{
    provider?: 'gemini' | 'cloudflare' | 'fallback';
    model?: string;
    isFallback?: boolean;
    fallbackReason?: string;
  }>({});

  // Modals & Panels
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [summaryData, setSummaryData] = useState<RoleplaySessionSummary | null>(null);
  const [showObjective, setShowObjective] = useState(true);
  const [isOpeningLoading, setIsOpeningLoading] = useState(false);

  // AI Model Preference (auto, gemini, cloudflare)
  const [selectedModel, setSelectedModel] = useState<AIModelPreference>(() => {
    if (typeof window !== 'undefined') {
      const saved =
        localStorage.getItem('toeic_roleplay_model_preference') ||
        localStorage.getItem('toeic_ai_model_preference');
      if (saved === 'auto' || saved === 'gemini' || saved === 'cloudflare') {
        return saved as AIModelPreference;
      }
    }
    return 'auto';
  });
  const [modelMenuOpen, setModelMenuOpen] = useState(false);
  const modelMenuRef = useRef<HTMLDivElement | null>(null);

  const handleSelectModel = (model: AIModelPreference) => {
    setSelectedModel(model);
    setModelMenuOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('toeic_roleplay_model_preference', model);
      localStorage.setItem('toeic_ai_model_preference', model);
    }
  };

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

  // Mobile More Actions Dropdown
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  // Close mobile actions menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Speech Recognition (Voice Input)
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Audio TTS
  const { speak, stop, isPlaying } = useSpeech();
  const [activeSpeakingId, setActiveSpeakingId] = useState<string | null>(null);

  // Reset active speaking id when audio playback finishes
  useEffect(() => {
    if (!isPlaying) {
      setActiveSpeakingId(null);
    }
  }, [isPlaying]);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const sessionStartTimeRef = useRef<number>(0);

  // Load conversation history on mount & subscribe to cross-tab/component updates
  useEffect(() => {
    setActiveSessionId((prev) => {
      const id = prev || generateConversationId();
      activeSessionIdRef.current = id;
      return id;
    });
    if (!sessionCreatedAtRef.current) {
      sessionCreatedAtRef.current = Date.now();
    }
    setHistoryList(getChatRoomHistory());

    const handleHistoryUpdate = (e: any) => {
      if (e?.detail && Array.isArray(e.detail)) {
        setHistoryList(e.detail);
      } else {
        setHistoryList(getChatRoomHistory());
      }
    };

    window.addEventListener('chat-room-history-updated', handleHistoryUpdate);
    window.addEventListener('storage', handleHistoryUpdate);
    return () => {
      window.removeEventListener('chat-room-history-updated', handleHistoryUpdate);
      window.removeEventListener('storage', handleHistoryUpdate);
    };
  }, []);

  // Cleanup abort controllers on unmount
  useEffect(() => {
    return () => {
      if (openingAbortControllerRef.current) {
        openingAbortControllerRef.current.abort();
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Helper to auto-save current conversation state into localStorage (max 10)
  const autoSaveConversation = useCallback(
    (
      msgs: RoleplayMessage[],
      customSummary?: RoleplaySessionSummary,
      customTranslations?: Record<string, string>,
      customChar = character,
      customScen = scenario,
      customAvatar = userAvatar,
      customName = userName
    ) => {
      // Only save if user has sent at least one message
      const hasUserMsg = msgs.some((m) => m.role === 'user');
      if (!hasUserMsg) return;

      const targetSessionId = activeSessionId || generateConversationId();
      if (!activeSessionId) {
        setActiveSessionId(targetSessionId);
        activeSessionIdRef.current = targetSessionId;
      }
      const createdAt = sessionCreatedAtRef.current || Date.now();
      if (!sessionCreatedAtRef.current) {
        sessionCreatedAtRef.current = createdAt;
      }

      const lastMsg = msgs[msgs.length - 1];
      const snippet = lastMsg?.content ? lastMsg.content.slice(0, 120) : '';

      const conv: RoleplayConversation = {
        id: targetSessionId,
        title: `${customScen.title} - ${customChar.name}`,
        character: customChar,
        scenario: customScen,
        userAvatar: customAvatar,
        userName: customName,
        messages: msgs,
        translations: customTranslations || translations,
        createdAt,
        updatedAt: Date.now(),
        messageCount: msgs.length,
        lastMessageSnippet: snippet,
        summary: customSummary || summaryData || undefined,
      };

      const updated = saveChatRoomConversation(conv);
      setHistoryList(updated);
      syncChatRoomHistory(updated);
    },
    [activeSessionId, character, scenario, userAvatar, userName, translations, summaryData, syncChatRoomHistory]
  );

  // Generate dynamic, spontaneous opening sentence from AI or smart variation
  const handleGenerateDynamicOpening = useCallback(
    async (forceFresh = false) => {
      // If user is currently reviewing a conversation from history, NEVER auto-generate opening!
      if (isReviewingHistory) {
        setIsOpeningLoading(false);
        return;
      }

      // Abort any prior in-flight opening fetch
      if (openingAbortControllerRef.current) {
        openingAbortControllerRef.current.abort();
        openingAbortControllerRef.current = null;
      }

      const controller = new AbortController();
      openingAbortControllerRef.current = controller;
      const targetSessionId = activeSessionIdRef.current;

      setIsOpeningLoading(true);
      sessionStartTimeRef.current = Date.now();

      try {
        const guestId = !user ? getGuestId() : undefined;
        const res = await fetch('/api/roleplay/opening', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(user?.id ? { 'x-user-id': user.id } : {}),
            ...(user?.email ? { 'x-user-email': user.email } : {}),
            ...(guestId ? { 'x-guest-id': guestId } : {}),
          },
          body: JSON.stringify({
            character,
            scenario,
            userContext,
            userName,
            providerPreference: selectedModel,
            userId: user?.id,
            userEmail: user?.email,
            guestId,
          }),
          signal: controller.signal,
        });

        if (
          controller.signal.aborted ||
          isReviewingHistory ||
          (targetSessionId && activeSessionIdRef.current !== targetSessionId)
        ) {
          setIsOpeningLoading(false);
          return;
        }

        if (res.ok) {
          const data = await res.json();
          if (
            controller.signal.aborted ||
            isReviewingHistory ||
            (targetSessionId && activeSessionIdRef.current !== targetSessionId)
          ) {
            setIsOpeningLoading(false);
            return;
          }

          if (data && data.english) {
            const isCf = data.source === 'cloudflare';
            const isFb = data.source === 'fallback';
            const isFallback = isFb || (isCf && selectedModel === 'gemini');

            const dynamicMsgId = `initial-${Date.now()}`;
            const dynamicMsg: RoleplayMessage = {
              id: dynamicMsgId,
              role: 'assistant',
              content: data.english,
              translation: data.vietnamese,
              timestamp: Date.now(),
              provider: isCf ? 'cloudflare' : 'gemini',
              isFallback,
              fallbackReason: isFb
                ? 'Không thể kết nối đến máy chủ AI, sử dụng kịch bản dự phòng.'
                : isCf && selectedModel !== 'cloudflare'
                ? 'Mô hình Gemini tạm thời không khả dụng, hệ thống đã chuyển sang Cloudflare Llama dự phòng.'
                : undefined,
            };
            setMessages([dynamicMsg]);
            if (data.vietnamese) {
              setTranslations((prev) => ({ ...prev, [dynamicMsgId]: data.vietnamese }));
            }
            setIsOpeningLoading(false);
            return;
          }
        }
      } catch (err: any) {
        if (err?.name === 'AbortError' || controller.signal.aborted) {
          setIsOpeningLoading(false);
          return;
        }
        console.warn('[Roleplay Dynamic Opening] API request failed:', err);
      }

      if (
        controller.signal.aborted ||
        isReviewingHistory ||
        (targetSessionId && activeSessionIdRef.current !== targetSessionId)
      ) {
        setIsOpeningLoading(false);
        return;
      }

      // Fallback: Pick a spontaneous opening variation from preset pool
      const variation = getRandomOpeningVariation(character, scenario, userName);
      const fallbackMsgId = `initial-${Date.now()}`;
      const fallbackMsg: RoleplayMessage = {
        id: fallbackMsgId,
        role: 'assistant',
        content: variation.english,
        translation: variation.vietnamese,
        timestamp: Date.now(),
        provider: 'gemini',
        isFallback: true,
        fallbackReason: 'Không thể kết nối đến máy chủ AI, sử dụng kịch bản dự phòng.',
      };
      setMessages([fallbackMsg]);
      if (variation.vietnamese) {
        setTranslations((prev) => ({ ...prev, [fallbackMsgId]: variation.vietnamese }));
      }
      setIsOpeningLoading(false);
    },
    [character, scenario, userContext, userName, selectedModel, isReviewingHistory]
  );

  // Initialize dynamic opening on mount or when scenario/character changes
  useEffect(() => {
    // If we are currently reviewing a conversation from history, skip auto-generating opening
    if (isReviewingHistory) {
      return;
    }

    // If we just loaded a conversation from history, skip auto-generating opening
    if (isSelectingConversationRef.current) {
      isSelectingConversationRef.current = false;
      return;
    }

    // Immediate instant variation to ensure 0ms render
    const instantVariation = getRandomOpeningVariation(character, scenario, userName);
    const initialMsgId = `initial-${Date.now()}`;
    const initialMsg: RoleplayMessage = {
      id: initialMsgId,
      role: 'assistant',
      content: instantVariation.english,
      translation: instantVariation.vietnamese,
      timestamp: Date.now(),
    };
    setMessages([initialMsg]);
    if (instantVariation.vietnamese) {
      setTranslations((prev) => ({ ...prev, [initialMsgId]: instantVariation.vietnamese }));
    }

    // Then quietly request fresh AI generation in background
    handleGenerateDynamicOpening(true);
  }, [scenario.id, character.role, character.name, isReviewingHistory]);

  // Auto-scroll
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, showSuggestions, scrollToBottom]);

  // Speech Recognition Setup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Trình duyệt của bạn chưa hỗ trợ nhận diện giọng nói (Web Speech API).');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    }
  };

  // Play audio for a character message
  const handlePlayAudio = (id: string, text: string) => {
    if (activeSpeakingId === id && isPlaying) {
      stop();
      setActiveSpeakingId(null);
    } else {
      setActiveSpeakingId(id);
      speak(text, 'en-US', 0.9);
    }
  };

  // Toggle Vietnamese Translation
  const handleToggleTranslation = async (id: string, text: string) => {
    if (showTranslations[id]) {
      setShowTranslations((prev) => ({ ...prev, [id]: false }));
      return;
    }

    if (translations[id]) {
      setShowTranslations((prev) => ({ ...prev, [id]: true }));
      return;
    }

    // Fetch translation from /api/translate
    setIsTranslatingId(id);
    try {
      const res = await fetch(`/api/translate?text=${encodeURIComponent(text)}&from=en&to=vi`);
      if (res.ok) {
        const data = await res.json();
        if (data.translatedText) {
          const nextTranslations = { ...translations, [id]: data.translatedText };
          setTranslations(nextTranslations);
          setShowTranslations((prev) => ({ ...prev, [id]: true }));
          autoSaveConversation(messages, undefined, nextTranslations);
        }
      }
    } catch (e) {
      console.warn('Failed to translate:', e);
    } finally {
      setIsTranslatingId(null);
    }
  };

  // FETCH SUGGESTIONS (Triggered ONLY when user explicitly asks for hints!)
  const handleFetchSuggestions = async () => {
    setShowSuggestions(true);
    setIsSuggestionsLoading(true);

    try {
      const guestId = !user ? getGuestId() : undefined;
      const res = await fetch('/api/roleplay/suggest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user?.id ? { 'x-user-id': user.id } : {}),
          ...(user?.email ? { 'x-user-email': user.email } : {}),
          ...(guestId ? { 'x-guest-id': guestId } : {}),
        },
        body: JSON.stringify({
          character,
          scenario,
          chatHistory: messages.map((m) => ({ role: m.role, content: m.content })),
          targetScore: userContext.targetScore || 650,
          providerPreference: selectedModel,
          userId: user?.id,
          userEmail: user?.email,
          guestId,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.suggestions && Array.isArray(data.suggestions)) {
          setSuggestions(data.suggestions);
          setSuggestionMeta({
            provider: data.provider,
            model: data.model,
            isFallback: data.isFallback,
            fallbackReason: data.fallbackReason,
          });
        }
      }
    } catch (err) {
      console.error('Failed to load suggestions:', err);
    } finally {
      setIsSuggestionsLoading(false);
    }
  };

  // Execute chat streaming logic (shared between Send and Retry)
  const executeChatStream = async (
    contextMessages: RoleplayMessage[],
    assistantMsgId: string,
    modelPref: AIModelPreference = selectedModel
  ) => {
    setIsLoading(true);
    abortControllerRef.current = new AbortController();

    try {
      const guestId = !user ? getGuestId() : undefined;
      const res = await fetch('/api/roleplay/chat', {
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
          character,
          scenario,
          userContext,
          providerPreference: modelPref,
          userId: user?.id,
          userEmail: user?.email,
          guestId,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!res.ok) {
        let errDesc = 'Không thể kết nối đến máy chủ AI';
        try {
          const errData = await res.json();
          errDesc = errData.error || errDesc;
          if (errData.code === 'GUEST_LIMIT_REACHED' || (res.status === 429 && !user)) {
            setGuestLimitInfo({
              limit: errData.limit || 5,
              usedToday: errData.usedToday || 5,
              message: errDesc,
            });
          }
        } catch {
          // ignore
        }
        throw new Error(errDesc);
      }

      if (!res.body) {
        throw new Error('Dữ liệu stream không tồn tại');
      }

      const reader = res.body.getReader();
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
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data:')) continue;

          const dataStr = trimmed.slice(5).trim();
          if (dataStr === '[DONE]') break;

          try {
            const event: StreamEvent = JSON.parse(dataStr);
            if (event.type === 'meta') {
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
              if (event.code === 'GUEST_LIMIT_REACHED') {
                setGuestLimitInfo({
                  limit: event.limit || 5,
                  usedToday: event.usedToday || 5,
                  message: event.message,
                });
              }
              accumulatedContent += `\n\n*(Lỗi kết nối AI: ${event.message})*`;
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
            // ignore partial json
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      const msg = err instanceof Error ? err.message : String(err);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsgId
            ? {
                ...m,
                content: m.content || `⚠️ Không thể phản hồi: ${msg}`,
                isError: true,
                errorMessage: msg,
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
      // Auto-save the conversation after sending & receiving response
      setMessages((current) => {
        autoSaveConversation(current);
        return current;
      });
    }
  };

  // Send message
  const handleSendMessage = async (textToSend?: string) => {
    const content = (textToSend || input).trim();
    if (!content || isLoading) return;

    setInput('');
    setShowSuggestions(false); // Close suggestions drawer upon sending
    setSuggestions([]); // Reset stale suggestions so old responses are not displayed
    setSuggestionMeta({});

    const userMessage: RoleplayMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    const assistantMsgId = `assistant-${Date.now()}`;
    const assistantMessage: RoleplayMessage = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages([...updatedMessages, assistantMessage]);

    await executeChatStream(updatedMessages, assistantMsgId, selectedModel);
  };

  // Retry generating an assistant response (can retry with current or alternative model)
  const handleRetryMessage = async (failedAssistantMsgId?: string, overrideModel?: AIModelPreference) => {
    if (isLoading) return;

    const modelToUse = overrideModel || selectedModel;
    if (overrideModel && overrideModel !== selectedModel) {
      handleSelectModel(overrideModel);
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

    // If there is no preceding user message (e.g. initial greeting), reroll opening
    const hasPrecedingUserMsg = contextMessages.some((m) => m.role === 'user');
    if (!hasPrecedingUserMsg) {
      handleGenerateDynamicOpening(true);
      return;
    }

    const newAssistantMsgId = `assistant-${Date.now()}`;
    const newAssistantMessage: RoleplayMessage = {
      id: newAssistantMsgId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      provider: modelToUse === 'cloudflare' ? 'cloudflare' : 'gemini',
    };

    // Replace the failed assistant message with the new loading message
    setMessages([...contextMessages, newAssistantMessage]);

    await executeChatStream(contextMessages, newAssistantMsgId, modelToUse);
  };

  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
    setMessages((current) => {
      autoSaveConversation(current);
      return current;
    });
  };

  // Start a fresh, clean conversation session
  const handleStartNewConversation = useCallback(() => {
    // Abort any pending opening fetch
    if (openingAbortControllerRef.current) {
      openingAbortControllerRef.current.abort();
      openingAbortControllerRef.current = null;
    }
    setIsOpeningLoading(false);

    setIsReviewingHistory(false);
    isSelectingConversationRef.current = false;

    const newId = generateConversationId();
    activeSessionIdRef.current = newId;
    setActiveSessionId(newId);
    sessionCreatedAtRef.current = Date.now();
    setInput('');
    setShowSuggestions(false);
    setSummaryData(null);
    setIsSummaryOpen(false);

    // Immediate instant variation to ensure 0ms render
    const instantVariation = getRandomOpeningVariation(character, scenario, userName);
    const initialMsgId = `initial-${Date.now()}`;
    const initialMsg: RoleplayMessage = {
      id: initialMsgId,
      role: 'assistant',
      content: instantVariation.english,
      translation: instantVariation.vietnamese,
      timestamp: Date.now(),
    };
    setMessages([initialMsg]);
    if (instantVariation.vietnamese) {
      setTranslations({ [initialMsgId]: instantVariation.vietnamese });
    } else {
      setTranslations({});
    }
    setShowTranslations({});

    handleGenerateDynamicOpening(true);
  }, [character, scenario, userName, handleGenerateDynamicOpening]);

  // Select and load a saved conversation from history
  const handleSelectConversation = useCallback((conv: RoleplayConversation) => {
    // 1. Abort any pending background opening generation immediately
    if (openingAbortControllerRef.current) {
      openingAbortControllerRef.current.abort();
      openingAbortControllerRef.current = null;
    }
    setIsOpeningLoading(false);

    // 2. Set review state flags
    setIsReviewingHistory(true);
    isSelectingConversationRef.current = true;

    // 3. Set active session ID to this conversation's ID
    activeSessionIdRef.current = conv.id;
    setActiveSessionId(conv.id);
    sessionCreatedAtRef.current = conv.createdAt || Date.now();

    // 4. Load the conversation's settings and content
    setCharacter(conv.character);
    setScenario(conv.scenario);
    if (conv.userAvatar) setUserAvatar(conv.userAvatar);
    if (conv.userName) setUserName(conv.userName);
    setMessages(conv.messages);
    setTranslations(conv.translations || {});
    setShowTranslations({});
    setSummaryData(conv.summary || null);
    setInput('');
    setShowSuggestions(false);
  }, []);

  // Delete a saved conversation
  const handleDeleteConversation = useCallback(
    (id: string) => {
      const updated = deleteChatRoomConversation(id);
      setHistoryList(updated);
      syncChatRoomHistory(updated);
      if (id === activeSessionId) {
        handleStartNewConversation();
      }
    },
    [activeSessionId, handleStartNewConversation, syncChatRoomHistory]
  );

  // Clear all saved conversations
  const handleClearAllHistory = useCallback(() => {
    clearAllChatRoomHistory();
    setHistoryList([]);
    syncChatRoomHistory([]);
    handleStartNewConversation();
  }, [handleStartNewConversation, syncChatRoomHistory]);

  const handleResetConversation = () => {
    if (confirm('Bạn có chắc muốn bắt đầu lại cuộc hội thoại từ đầu không?')) {
      handleStartNewConversation();
    }
  };

  const handleEndSession = () => {
    const now = Date.now();
    const startTime = sessionStartTimeRef.current || now;
    const duration = Math.round((now - startTime) / 1000);
    const userMsgCount = messages.filter((m) => m.role === 'user').length;

    const baseScore = userContext.targetScore || 650;
    const bonus = Math.min(userMsgCount * 15, 80);
    const estimatedScore = Math.min(baseScore + bonus, 950);

    const summary: RoleplaySessionSummary = {
      scenarioTitle: scenario.title,
      characterName: character.name,
      characterRole: character.role,
      messageCount: messages.length,
      durationSeconds: duration,
      targetScore: baseScore,
      feedbackOverall:
        userMsgCount >= 4
          ? 'Tuyệt vời! Bạn đã duy trì cuộc đối thoại chủ động và tự tin với nhân vật.'
          : 'Khá tốt! Hãy cố gắng đặt thêm câu hỏi hoặc kéo dài cuộc hội thoại hơn trong lần sau nhé.',
      scoreEstimate: estimatedScore,
      vocabularyUsed: scenario.suggestedVocabulary || [],
      completedAt: new Date().toISOString(),
    };

    setSummaryData(summary);
    setIsSummaryOpen(true);
    autoSaveConversation(messages, summary);
  };

  // Keyboard shortcut
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const isMobile =
      typeof window !== 'undefined' &&
      (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);

    if (isMobile) return;

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const roleIcon =
    character.role === 'boss' ? (
      <Shield className="w-3.5 h-3.5 text-purple-400 shrink-0" />
    ) : character.role === 'colleague' ? (
      <Users className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
    ) : (
      <Briefcase className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
    );

  const roleBadge =
    character.role === 'boss'
      ? 'bg-purple-500/15 border-purple-500/30 text-purple-300'
      : character.role === 'colleague'
      ? 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300'
      : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300';

  return (
    <div className="flex flex-col h-[78vh] sm:h-[82vh] max-w-5xl mx-auto rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
      {/* 1. Header Bar */}
      <div className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3.5 border-b border-slate-800 bg-slate-950/80 gap-2">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 mr-1 sm:mr-2">
          {/* Avatar (Clickable to switch character) */}
          <button
            type="button"
            onClick={() => {
              setSetupInitialTab('character');
              setIsSetupOpen(true);
            }}
            className="relative shrink-0 text-left focus:outline-none group"
            title="Nhấn để đổi nhân vật hoặc tình huống"
          >
            <CharacterAvatar avatarId={character.avatar} size="md" />
            <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
          </button>

          {/* Details */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-wrap">
              <h3 className="text-xs sm:text-sm font-bold text-white truncate shrink min-w-0">
                {character.name}
              </h3>
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full border shrink-0 ${roleBadge}`}
              >
                {roleIcon}
                <span>
                  {character.role === 'boss'
                    ? 'Sếp'
                    : character.role === 'colleague'
                    ? 'Đồng nghiệp'
                    : 'Nhân viên'}
                </span>
              </span>

              {/* Model Switcher Button & Dropdown */}
              <div className="relative shrink-0" ref={modelMenuRef}>
                <button
                  type="button"
                  onClick={() => setModelMenuOpen(!modelMenuOpen)}
                  className="inline-flex items-center gap-1 text-[10px] font-semibold transition-all hover:opacity-90 active:scale-95 cursor-pointer shadow-sm"
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
                  <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-slate-900/98 border border-slate-700 shadow-2xl p-2.5 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between px-2.5 py-1 mb-1 border-b border-slate-800/80 pb-1.5">
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                        Chọn Mô Hình AI Đóng Vai
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
                      {/* Option 1: Auto Hybrid */}
                      <button
                        type="button"
                        onClick={() => handleSelectModel('auto')}
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
                            <span className="text-xs font-bold text-slate-100">Tự động (Hybrid)</span>
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

                      {/* Option 2: Gemini Flash */}
                      <button
                        type="button"
                        onClick={() => handleSelectModel('gemini')}
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
                            <span className="text-xs font-bold text-slate-100">Google Gemini Flash</span>
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                              Chất lượng cao
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                            Đóng vai tự nhiên, ngữ điệu và phản xạ tiếng Anh chuẩn
                          </p>
                        </div>
                        {selectedModel === 'gemini' && (
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-1" />
                        )}
                      </button>

                      {/* Option 3: Cloudflare Llama */}
                      <button
                        type="button"
                        onClick={() => handleSelectModel('cloudflare')}
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
                            <span className="text-xs font-bold text-slate-100">Cloudflare Llama 3.1</span>
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

              <span className="text-[10px] text-slate-400 font-medium hidden md:inline shrink-0">
                • {character.age} tuổi • {character.gender === 'male' ? 'Nam' : character.gender === 'female' ? 'Nữ' : 'Khác'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate">
              {character.department} • <strong className="text-slate-300">{scenario.title}</strong>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Conversation History Button */}
          <button
            onClick={() => setIsHistoryOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700/80 hover:border-indigo-500/50 shrink-0"
            title="Lịch sử các cuộc hội thoại (tối đa 10 cuộc trò chuyện gần nhất)"
          >
            <History className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="hidden sm:inline">Lịch sử</span>
            {historyList.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-indigo-500/25 border border-indigo-500/40 text-indigo-300 font-bold text-[10px]">
                {historyList.length}
              </span>
            )}
          </button>

          {/* New Conversation Button (Desktop) */}
          <button
            onClick={handleStartNewConversation}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700/80 hover:border-indigo-500/50 shrink-0"
            title="Bắt đầu cuộc trò chuyện mới"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Mới</span>
          </button>

          {/* User Avatar Button (Desktop) */}
          <button
            onClick={() => {
              setSetupInitialTab('user');
              setIsSetupOpen(true);
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-xs font-semibold transition-all border border-slate-700/80 hover:border-indigo-500/50 shrink-0"
            title="Đổi avatar & tên hiển thị của bạn"
          >
            <CharacterAvatar avatarId={userAvatar} size="xs" />
            <span className="hidden md:inline text-slate-300 font-medium">{userName}</span>
            <span className="text-[10px] text-indigo-400 font-bold">Avatar bạn</span>
          </button>

          {/* Customize Character / Scenario Button */}
          <button
            onClick={() => {
              setSetupInitialTab('character');
              setIsSetupOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700 shrink-0"
            title="Đổi nhân vật hoặc tình huống"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tùy biến</span>
          </button>

          {/* Reset Conversation Button (Desktop) */}
          <button
            onClick={handleResetConversation}
            className="hidden sm:inline-flex p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
            title="Bắt đầu lại"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          {/* Mobile More Options Dropdown */}
          <div className="relative sm:hidden" ref={mobileMenuRef}>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className={`p-1.5 rounded-xl text-slate-300 hover:text-white transition-colors border ${
                isMobileMenuOpen
                  ? 'bg-slate-700 border-indigo-500/50 text-white'
                  : 'bg-slate-800/80 hover:bg-slate-700 border-slate-700/80'
              }`}
              title="Tùy chọn khác"
              aria-label="Tùy chọn khác"
            >
              <MoreVertical className="w-3.5 h-3.5" />
            </button>

            {isMobileMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-slate-900 border border-slate-700/90 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1.5 border-b border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Mô hình: {selectedModel === 'auto' ? 'Hybrid' : selectedModel === 'gemini' ? 'Gemini' : 'Cloudflare'}
                </div>
                <div className="flex gap-1 p-1.5 border-b border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      handleSelectModel('auto');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex-1 py-1 text-[10px] font-semibold rounded-lg text-center transition-colors ${
                      selectedModel === 'auto' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    Auto
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleSelectModel('gemini');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex-1 py-1 text-[10px] font-semibold rounded-lg text-center transition-colors ${
                      selectedModel === 'gemini' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    Gemini
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleSelectModel('cloudflare');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex-1 py-1 text-[10px] font-semibold rounded-lg text-center transition-colors ${
                      selectedModel === 'cloudflare' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    Llama
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleStartNewConversation();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition-colors text-left"
                >
                  <Plus className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Đoạn chat mới</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleResetConversation();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition-colors text-left"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Bắt đầu lại</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setSetupInitialTab('user');
                    setIsSetupOpen(true);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition-colors text-left"
                >
                  <CharacterAvatar avatarId={userAvatar} size="xs" />
                  <span className="truncate">Avatar bạn ({userName})</span>
                </button>
              </div>
            )}
          </div>

          {/* End Session Button */}
          <button
            onClick={handleEndSession}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-500/20 shrink-0"
            title="Kết thúc và xem đánh giá"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Kết thúc</span>
          </button>
        </div>
      </div>

      {/* 2. Collapsible Scenario Objective Banner */}
      <div className="px-3 sm:px-6 py-2 bg-indigo-950/40 border-b border-indigo-500/20 text-xs">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate min-w-0">
            <Target className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="text-indigo-200 truncate">
              <strong>Mục tiêu:</strong> {scenario.objective}
            </span>
            {(isReviewingHistory || historyList.some((c) => c.id === activeSessionId)) && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/35 text-amber-300 shrink-0">
                <History className="w-3 h-3 text-amber-400" />
                <span>Đang xem lại</span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {isReviewingHistory && (
              <button
                type="button"
                onClick={handleStartNewConversation}
                className="text-[10px] px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-1 transition-all shadow-sm"
                title="Bắt đầu cuộc trò chuyện mới"
              >
                <Plus className="w-3 h-3" />
                <span>Tạo hội thoại mới</span>
              </button>
            )}
            {!isReviewingHistory && messages.length <= 1 && (
              <button
                type="button"
                onClick={() => handleGenerateDynamicOpening(true)}
                disabled={isOpeningLoading}
                className="text-[10px] px-2 py-0.5 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/30 text-indigo-300 font-semibold flex items-center gap-1 transition-all disabled:opacity-50"
                title="Tạo một câu mở đầu ngẫu nhiên mới từ AI cho tình huống này"
              >
                <Dice5 className={`w-3 h-3 ${isOpeningLoading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Đổi câu mở đầu</span>
              </button>
            )}
            <button
              onClick={() => setShowObjective(!showObjective)}
              className="text-[10px] text-indigo-400 hover:text-indigo-200 flex items-center gap-0.5"
            >
              <span>{showObjective ? 'Thu gọn' : 'Xem chi tiết'}</span>
              {showObjective ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {showObjective && scenario.keyPhrases?.length > 0 && (
          <div className="mt-2 pt-2 border-t border-indigo-500/20 flex flex-wrap gap-2 animate-in fade-in duration-150">
            <span className="text-[10px] text-indigo-300 font-semibold self-center">
              Mẫu câu tham khảo:
            </span>
            {scenario.keyPhrases.slice(0, 3).map((kp, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2 py-0.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-200"
                title={kp.meaning}
              >
                &ldquo;{kp.phrase}&rdquo;
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 3. Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg, idx) => {
          const isUser = msg.role === 'user';
          const isSpeakingThis = activeSpeakingId === msg.id && isPlaying;

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar Icon */}
              {isUser ? (
                <button
                  type="button"
                  onClick={() => {
                    setSetupInitialTab('user');
                    setIsSetupOpen(true);
                  }}
                  title="Bấm để đổi avatar của bạn"
                  className="shrink-0 mt-1 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <CharacterAvatar avatarId={userAvatar} size="sm" />
                </button>
              ) : (
                <CharacterAvatar avatarId={character.avatar} size="sm" className="mt-1" />
              )}

              {/* Message Bubble Container */}
              <div className={`max-w-[85%] sm:max-w-[75%] space-y-1.5 ${isUser ? 'items-end' : 'items-start'}`}>
                {/* Bubble */}
                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    isUser
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-tr-sm shadow-md'
                      : 'bg-slate-800/90 border border-slate-700/70 text-slate-100 rounded-tl-sm shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content || '...'}</p>

                  {/* Message Actions (Audio, Translation) */}
                  {msg.content && (
                    <div
                      className={`flex items-center gap-2 mt-2 pt-2 text-[11px] ${
                        isUser
                          ? 'border-t border-white/20 text-indigo-100/80'
                          : 'border-t border-slate-700/50 text-slate-400'
                      }`}
                    >
                      {/* Audio Button */}
                      <button
                        onClick={() => handlePlayAudio(msg.id, msg.content)}
                        className={`inline-flex items-center gap-1 transition-colors ${
                          isUser
                            ? isSpeakingThis
                              ? 'text-amber-300 font-bold'
                              : 'hover:text-white text-indigo-100/90'
                            : isSpeakingThis
                            ? 'text-indigo-400 font-bold'
                            : 'hover:text-white'
                        }`}
                        title={isUser ? 'Nghe phát âm tin nhắn của bạn' : 'Nghe phát âm tự nhiên'}
                      >
                        {isSpeakingThis ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 animate-pulse text-amber-300" />
                            <span>Dừng nghe</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Nghe đọc</span>
                          </>
                        )}
                      </button>

                      <span>•</span>

                      {/* Translation Toggle */}
                      <button
                        onClick={() => handleToggleTranslation(msg.id, msg.content)}
                        disabled={isTranslatingId === msg.id}
                        className={`inline-flex items-center gap-1 transition-colors disabled:opacity-50 ${
                          isUser ? 'hover:text-white text-indigo-100/90' : 'hover:text-white'
                        }`}
                        title="Dịch nghĩa tiếng Việt"
                      >
                        <Languages className="w-3.5 h-3.5" />
                        <span>
                          {isTranslatingId === msg.id
                            ? 'Đang dịch...'
                            : showTranslations[msg.id]
                            ? 'Ẩn bản dịch'
                            : 'Xem bản dịch'}
                        </span>
                      </button>

                      {/* AI Provider Info Badge for Assistant */}
                      {!isUser && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            {msg.provider === 'cloudflare' || msg.isFallback ? (
                              <span className="text-amber-400 font-medium inline-flex items-center gap-1">
                                <Zap className="w-3 h-3 text-amber-400" />
                                <span>Cloudflare Llama{msg.isFallback ? ' (Dự phòng)' : ''}</span>
                              </span>
                            ) : (
                              <span className="text-emerald-400 font-medium inline-flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-emerald-400" />
                                <span>Gemini Flash</span>
                              </span>
                            )}
                          </span>
                        </>
                      )}

                      {/* Reroll Opening button - Available on opening message when conversation has just started (not when reviewing history) */}
                      {!isReviewingHistory && !isUser && idx === 0 && messages.length === 1 && (
                        <>
                          <span>•</span>
                          <button
                            type="button"
                            onClick={() => handleGenerateDynamicOpening(true)}
                            disabled={isOpeningLoading}
                            className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                            title="Tạo câu mở đầu ngẫu nhiên khác từ AI cho tình huống này"
                          >
                            <Dice5 className={`w-3.5 h-3.5 ${isOpeningLoading ? 'animate-spin' : ''}`} />
                            <span>{isOpeningLoading ? 'Đang đổi...' : 'Đổi câu mở đầu'}</span>
                          </button>
                        </>
                      )}

                      {/* Regenerate / Retry response button for the latest assistant message */}
                      {!isReviewingHistory && !isUser && idx === messages.length - 1 && idx > 0 && !msg.isError && !msg.content?.startsWith('⚠️ Không thể phản hồi') && (
                        <>
                          <span>•</span>
                          <button
                            type="button"
                            onClick={() => handleRetryMessage(msg.id)}
                            disabled={isLoading}
                            className="inline-flex items-center gap-1 text-slate-400 hover:text-indigo-300 font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                            title="Yêu cầu AI tạo lại câu trả lời này"
                          >
                            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                            <span>Tạo lại</span>
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  {/* Fallback Notification Banner */}
                  {!isUser && msg.isFallback && (
                    <div className="mt-2.5 p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-200 flex items-start gap-1.5 animate-in fade-in duration-150">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1 leading-snug">
                        <span className="font-semibold text-amber-300">Chế độ dự phòng tự động:</span>{' '}
                        {msg.fallbackReason ||
                          'Mô hình chính gặp sự cố hoặc vượt giới hạn, hệ thống đã tự động chuyển sang Cloudflare Llama để đảm bảo cuộc hội thoại không bị gián đoạn.'}
                      </div>
                    </div>
                  )}

                  {/* Error Recovery Card with Manual Retry Buttons */}
                  {!isUser && (msg.isError || msg.content?.startsWith('⚠️ Không thể phản hồi') || msg.content?.includes('Lỗi kết nối AI')) && (
                    <div className="mt-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 space-y-2 animate-in fade-in duration-150">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-rose-300">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>Không thể nhận phản hồi từ máy chủ AI</span>
                      </div>
                      <p className="text-[11px] text-rose-300/80 leading-snug">
                        {msg.errorMessage || 'Mô hình AI hiện tại có thể đang bị quá tải hoặc gặp sự cố kết nối. Bạn hãy chọn thử lại bên dưới.'}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-rose-500/20">
                        {/* Retry with current model */}
                        <button
                          type="button"
                          onClick={() => handleRetryMessage(msg.id)}
                          disabled={isLoading}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-sm transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                          <span>Thử lại ngay</span>
                        </button>

                        {/* Alternative model buttons */}
                        {selectedModel === 'gemini' ? (
                          <button
                            type="button"
                            onClick={() => handleRetryMessage(msg.id, 'cloudflare')}
                            disabled={isLoading}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/40 text-amber-200 text-xs font-medium transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                          >
                            <Zap className="w-3.5 h-3.5 text-amber-400" />
                            <span>Đổi sang Cloudflare Llama và thử lại</span>
                          </button>
                        ) : selectedModel === 'cloudflare' ? (
                          <button
                            type="button"
                            onClick={() => handleRetryMessage(msg.id, 'gemini')}
                            disabled={isLoading}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-200 text-xs font-medium transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Đổi sang Gemini Flash và thử lại</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleRetryMessage(msg.id, 'cloudflare')}
                            disabled={isLoading}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/40 text-amber-200 text-xs font-medium transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                          >
                            <Zap className="w-3.5 h-3.5 text-amber-400" />
                            <span>Thử lại với Cloudflare Llama</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Inline Translation Display */}
                  {showTranslations[msg.id] && translations[msg.id] && (
                    <div
                      className={`mt-2 p-2 rounded-xl text-xs italic leading-snug animate-in fade-in duration-150 ${
                        isUser
                          ? 'bg-black/25 border border-white/20 text-indigo-100'
                          : 'bg-slate-900/80 border border-slate-700/60 text-indigo-200'
                      }`}
                    >
                      💡 {translations[msg.id]}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center gap-3">
            <CharacterAvatar avatarId={character.avatar} size="sm" />
            <div className="p-3 rounded-2xl bg-slate-800/90 border border-slate-700/70 text-slate-400 text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse delay-75" />
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse delay-150" />
              <span>{character.name} đang soạn câu trả lời...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 4. Suggestion Drawer (Strictly on demand: Only shown when user clicks button) */}
      <div className="px-4 sm:px-6">
        <SuggestionDrawer
          isOpen={showSuggestions}
          onClose={() => setShowSuggestions(false)}
          suggestions={suggestions}
          isLoading={isSuggestionsLoading}
          provider={suggestionMeta.provider}
          model={suggestionMeta.model}
          isFallback={suggestionMeta.isFallback}
          fallbackReason={suggestionMeta.fallbackReason}
          onRefresh={handleFetchSuggestions}
          onSelectSuggestion={(text, autoSend) => {
            if (autoSend) {
              handleSendMessage(text);
            } else {
              setInput(text);
              setShowSuggestions(false);
              textareaRef.current?.focus();
            }
          }}
        />
      </div>

      {/* 5. Input Control Area */}
      {guestLimitInfo && !user && (
        <div className="mx-4 sm:mx-6 mb-3 p-4 rounded-3xl bg-gradient-to-r from-amber-950/40 via-purple-950/40 to-indigo-950/40 border border-amber-500/40 text-slate-200 shadow-xl shadow-black/50 animate-in fade-in space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-sm font-bold text-amber-300">Đã Hết Hạn Mức Thực Chiến Dành Cho Khách</h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-200 border border-amber-500/30 font-semibold">
                  {guestLimitInfo.limit} lượt/ngày
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {guestLimitInfo.message || 'Bạn đã sử dụng hết lượt AI miễn phí hôm nay dành cho khách chưa đăng nhập. Hãy đăng nhập tài khoản để được nâng hạn mức sử dụng và tiếp tục thực chiến!'}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
            <span className="text-xs text-emerald-400 font-semibold">✓ Đăng nhập nhanh bằng Google chỉ 3 giây</span>
            <button
              type="button"
              onClick={openAuthModal}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Đăng nhập ngay để nâng hạn mức</span>
            </button>
          </div>
        </div>
      )}

      <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-950/95 space-y-2">
        {/* Helper Hint Trigger Bar */}
        <div className="flex items-center justify-between px-1">
          <button
            type="button"
            onClick={showSuggestions ? () => setShowSuggestions(false) : handleFetchSuggestions}
            disabled={Boolean(guestLimitInfo && !user)}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
              showSuggestions
                ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                : 'bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-300 hover:text-amber-300'
            } disabled:opacity-40`}
            title="Nhận gợi ý câu trả lời hoặc câu hỏi tiếp theo"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>{showSuggestions ? 'Đóng gợi ý câu giao tiếp' : '💡 Bạn chưa biết nói gì? Nhận gợi ý'}</span>
          </button>

          <span className="text-[10px] text-slate-500 hidden sm:inline">
            Enter để gửi • Shift+Enter xuống dòng
          </span>
        </div>

        {/* Textarea & Send Button */}
        <div className="relative flex items-end gap-2 bg-slate-900 border border-slate-800 rounded-2xl p-2 focus-within:border-indigo-500 transition-colors">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading || Boolean(guestLimitInfo && !user)}
            placeholder={
              guestLimitInfo && !user
                ? 'Đã hết hạn mức AI cho khách. Vui lòng đăng nhập để tiếp tục...'
                : `Nói chuyện bằng tiếng Anh với ${character.name}...`
            }
            rows={1}
            className="flex-1 bg-transparent border-0 resize-none text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-0 max-h-28 px-2 py-1 leading-relaxed disabled:opacity-50"
          />

          {/* Voice Input Toggle Button */}
          <button
            type="button"
            onClick={toggleVoiceInput}
            disabled={Boolean(guestLimitInfo && !user)}
            className={`p-2 rounded-xl transition-all shrink-0 disabled:opacity-30 ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
            title={isListening ? 'Đang nghe... bấm để dừng' : 'Bật mic nói tiếng Anh'}
          >
            {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>

          {/* Send / Stop Button */}
          {isLoading ? (
            <button
              onClick={handleStopGeneration}
              title="Dừng phản hồi"
              className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-500/30 transition-all shrink-0"
            >
              <Square className="w-4 h-4 fill-rose-300" />
            </button>
          ) : (
            <button
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || Boolean(guestLimitInfo && !user)}
              title="Gửi câu trả lời"
              className="p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-30 disabled:hover:bg-indigo-600 transition-all shrink-0 shadow-md shadow-indigo-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 6. Setup Modal */}
      <RoleplaySetupModal
        isOpen={isSetupOpen}
        onClose={() => setIsSetupOpen(false)}
        currentCharacter={character}
        currentScenario={scenario}
        userContext={userContext}
        currentUserAvatar={userAvatar}
        currentUserName={userName}
        initialTab={setupInitialTab}
        onApply={(newChar, newScen, newUserAvatar, newUserName) => {
          // If user was reviewing history and chooses new setup, exit review mode and start new conversation
          if (openingAbortControllerRef.current) {
            openingAbortControllerRef.current.abort();
            openingAbortControllerRef.current = null;
          }
          setIsOpeningLoading(false);

          setIsReviewingHistory(false);
          isSelectingConversationRef.current = false;

          const newId = generateConversationId();
          activeSessionIdRef.current = newId;
          setActiveSessionId(newId);
          sessionCreatedAtRef.current = Date.now();

          const hasCharOrScenChanged =
            newScen.id !== scenario.id ||
            newChar.role !== character.role ||
            newChar.name !== character.name;

          setCharacter(newChar);
          setScenario(newScen);
          setUserAvatar(newUserAvatar);
          setUserName(newUserName);
          saveRoleplaySettings(newChar, newScen.id, newUserAvatar, newUserName);

          // If scenario/character didn't change, useEffect([scenario.id, ...]) won't trigger,
          // so manually initiate the opening message
          if (!hasCharOrScenChanged) {
            const instantVariation = getRandomOpeningVariation(newChar, newScen, newUserName);
            const initialMsgId = `initial-${Date.now()}`;
            const initialMsg: RoleplayMessage = {
              id: initialMsgId,
              role: 'assistant',
              content: instantVariation.english,
              translation: instantVariation.vietnamese,
              timestamp: Date.now(),
            };
            setMessages([initialMsg]);
            if (instantVariation.vietnamese) {
              setTranslations({ [initialMsgId]: instantVariation.vietnamese });
            } else {
              setTranslations({});
            }
            setShowTranslations({});
            handleGenerateDynamicOpening(true);
          }
        }}
      />

      {/* 7. Summary & Evaluation Modal */}
      {isSummaryOpen && summaryData && mounted && createPortal(
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-3">
                <CharacterAvatar avatarId={character.avatar} size="lg" />
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <Trophy className="w-7 h-7" />
                </div>
              </div>
              <h3 className="text-xl font-black text-white">Hoàn Thành Buổi Luyện Giao Tiếp!</h3>
              <p className="text-xs text-slate-400">
                Đối thoại cùng {character.name} • {summaryData.scenarioTitle}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
              <div>
                <div className="text-lg font-black text-white">{summaryData.messageCount}</div>
                <div className="text-[10px] text-slate-400">Lượt thoại</div>
              </div>
              <div>
                <div className="text-lg font-black text-amber-400">{summaryData.durationSeconds}s</div>
                <div className="text-[10px] text-slate-400">Thời gian</div>
              </div>
              <div>
                <div className="text-lg font-black text-indigo-400">{summaryData.scoreEstimate}</div>
                <div className="text-[10px] text-slate-400">Điểm ước lượng</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-1">
              <div className="text-xs font-bold text-indigo-300">Nhận xét tổng quan:</div>
              <p className="text-xs text-slate-300 leading-relaxed">{summaryData.feedbackOverall}</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  setIsSummaryOpen(false);
                  handleResetConversation();
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all"
              >
                Luyện tập lại
              </button>
              <button
                onClick={() => setIsSummaryOpen(false)}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-500/20"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* 8. Conversation History Modal */}
      <ChatRoomHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={historyList}
        activeConversationId={activeSessionId}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleStartNewConversation}
        onDeleteConversation={handleDeleteConversation}
        onClearAll={handleClearAllHistory}
      />
    </div>
  );
}
