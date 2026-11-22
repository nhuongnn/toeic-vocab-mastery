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
import { StreamEvent } from '@/lib/ai/types';

interface RoleplayChatRoomProps {
  userContext: Partial<UserLearningContext>;
}

export function RoleplayChatRoom({ userContext }: RoleplayChatRoomProps) {
  const { progress, saveRoleplaySettings, syncChatRoomHistory } = useProgress();
  const mounted = useMounted();

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

  // Sync state if progress.roleplay updates from cloud or another tab
  useEffect(() => {
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
  }, [progress.roleplay]);

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

  // Modals & Panels
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [summaryData, setSummaryData] = useState<RoleplaySessionSummary | null>(null);
  const [showObjective, setShowObjective] = useState(true);
  const [isOpeningLoading, setIsOpeningLoading] = useState(false);

  // History State (Max 10 conversations)
  const [activeSessionId, setActiveSessionId] = useState<string>('');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historyList, setHistoryList] = useState<RoleplayConversation[]>([]);
  const sessionCreatedAtRef = useRef<number>(0);
  const isSelectingConversationRef = useRef<boolean>(false);

  // Speech Recognition (Voice Input)
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Audio TTS
  const { speak, stop, isPlaying } = useSpeech();
  const [activeSpeakingId, setActiveSpeakingId] = useState<string | null>(null);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const sessionStartTimeRef = useRef<number>(0);

  // Load conversation history on mount & subscribe to cross-tab/component updates
  useEffect(() => {
    setActiveSessionId((prev) => prev || generateConversationId());
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
      setIsOpeningLoading(true);
      sessionStartTimeRef.current = Date.now();

      try {
        const res = await fetch('/api/roleplay/opening', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            character,
            scenario,
            userContext,
            userName,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.english) {
            const dynamicMsgId = `initial-${Date.now()}`;
            const dynamicMsg: RoleplayMessage = {
              id: dynamicMsgId,
              role: 'assistant',
              content: data.english,
              translation: data.vietnamese,
              timestamp: Date.now(),
            };
            setMessages([dynamicMsg]);
            if (data.vietnamese) {
              setTranslations((prev) => ({ ...prev, [dynamicMsgId]: data.vietnamese }));
            }
            setIsOpeningLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('[Roleplay Dynamic Opening] API request failed:', err);
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
      };
      setMessages([fallbackMsg]);
      if (variation.vietnamese) {
        setTranslations((prev) => ({ ...prev, [fallbackMsgId]: variation.vietnamese }));
      }
      setIsOpeningLoading(false);
    },
    [character, scenario, userContext, userName]
  );

  // Initialize dynamic opening on mount or when scenario/character changes
  useEffect(() => {
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
  }, [scenario.id, character.role, character.name]);

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
      const res = await fetch('/api/roleplay/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          character,
          scenario,
          chatHistory: messages.map((m) => ({ role: m.role, content: m.content })),
          targetScore: userContext.targetScore || 650,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.suggestions && Array.isArray(data.suggestions)) {
          setSuggestions(data.suggestions);
        }
      }
    } catch (err) {
      console.error('Failed to load suggestions:', err);
    } finally {
      setIsSuggestionsLoading(false);
    }
  };

  // Send message
  const handleSendMessage = async (textToSend?: string) => {
    const content = (textToSend || input).trim();
    if (!content || isLoading) return;

    setInput('');
    setShowSuggestions(false); // Close suggestions drawer upon sending

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
    setIsLoading(true);

    abortControllerRef.current = new AbortController();

    try {
      const res = await fetch('/api/roleplay/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          character,
          scenario,
          userContext,
          providerPreference: 'auto',
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!res.ok) {
        throw new Error('Không thể kết nối đến máy chủ AI');
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
            if (event.type === 'content') {
              accumulatedContent += event.text;
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantMsgId ? { ...msg, content: accumulatedContent } : msg
                )
              );
            } else if (event.type === 'error') {
              accumulatedContent += `\n\n*(Lỗi kết nối AI: ${event.message})*`;
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantMsgId ? { ...msg, content: accumulatedContent } : msg
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
            ? { ...m, content: m.content || `⚠️ Không thể phản hồi: ${msg}` }
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
    const newId = generateConversationId();
    setActiveSessionId(newId);
    sessionCreatedAtRef.current = Date.now();
    setInput('');
    setShowSuggestions(false);
    setSummaryData(null);
    setIsSummaryOpen(false);
    handleGenerateDynamicOpening(true);
  }, [handleGenerateDynamicOpening]);

  // Select and load a saved conversation from history
  const handleSelectConversation = useCallback((conv: RoleplayConversation) => {
    isSelectingConversationRef.current = true;
    setActiveSessionId(conv.id);
    sessionCreatedAtRef.current = conv.createdAt || Date.now();
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
      <Shield className="w-4 h-4 text-purple-400" />
    ) : character.role === 'colleague' ? (
      <Users className="w-4 h-4 text-indigo-400" />
    ) : (
      <Briefcase className="w-4 h-4 text-emerald-400" />
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
      <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800 bg-slate-950/80">
        <div className="flex items-center gap-3 min-w-0">
          {/* Avatar */}
          <div className="relative">
            <CharacterAvatar avatarId={character.avatar} size="md" />
            <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
          </div>

          {/* Details */}
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-white truncate">{character.name}</h3>
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.2 rounded-full border ${roleBadge}`}
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
              <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                • {character.age} tuổi • {character.gender === 'male' ? 'Nam' : character.gender === 'female' ? 'Nữ' : 'Khác'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate">
              {character.department} • <strong className="text-slate-300">{scenario.title}</strong>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Conversation History Button */}
          <button
            onClick={() => setIsHistoryOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700/80 hover:border-indigo-500/50"
            title="Lịch sử các cuộc hội thoại (tối đa 10 cuộc trò chuyện gần nhất)"
          >
            <History className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Lịch sử</span>
            {historyList.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-indigo-500/25 border border-indigo-500/40 text-indigo-300 font-bold text-[10px]">
                {historyList.length}
              </span>
            )}
          </button>

          {/* New Conversation Button */}
          <button
            onClick={handleStartNewConversation}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700/80 hover:border-indigo-500/50"
            title="Bắt đầu cuộc trò chuyện mới"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mới</span>
          </button>

          {/* User Avatar Button */}
          <button
            onClick={() => {
              setSetupInitialTab('user');
              setIsSetupOpen(true);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-xs font-semibold transition-all border border-slate-700/80 hover:border-indigo-500/50"
            title="Đổi avatar & tên hiển thị của bạn"
          >
            <CharacterAvatar avatarId={userAvatar} size="xs" />
            <span className="hidden md:inline text-slate-300 font-medium">{userName}</span>
            <span className="text-[10px] text-indigo-400 font-bold hidden sm:inline">Avatar bạn</span>
          </button>

          <button
            onClick={() => {
              setSetupInitialTab('character');
              setIsSetupOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700"
            title="Đổi nhân vật hoặc tình huống"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tùy biến</span>
          </button>

          <button
            onClick={handleResetConversation}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Bắt đầu lại"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleEndSession}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-500/20"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Kết thúc</span>
          </button>
        </div>
      </div>

      {/* 2. Collapsible Scenario Objective Banner */}
      <div className="px-4 sm:px-6 py-2 bg-indigo-950/40 border-b border-indigo-500/20 text-xs">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate min-w-0">
            <Target className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="text-indigo-200 truncate">
              <strong>Mục tiêu:</strong> {scenario.objective}
            </span>
            {historyList.some((c) => c.id === activeSessionId) && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/35 text-indigo-300 shrink-0">
                <History className="w-3 h-3 text-indigo-400" />
                <span>Đang xem lại</span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {messages.length <= 1 && (
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
                "{kp.phrase}"
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

                  {/* Character Message Actions (Audio, Translation) */}
                  {!isUser && msg.content && (
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-700/50 text-[11px] text-slate-400">
                      {/* Audio Button */}
                      <button
                        onClick={() => handlePlayAudio(msg.id, msg.content)}
                        className={`inline-flex items-center gap-1 hover:text-white transition-colors ${
                          isSpeakingThis ? 'text-indigo-400 font-bold' : ''
                        }`}
                        title="Nghe phát âm tự nhiên"
                      >
                        {isSpeakingThis ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 animate-pulse" />
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
                        className="inline-flex items-center gap-1 hover:text-white transition-colors"
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

                      {/* Reroll Opening button - Available on opening message when conversation has just started */}
                      {idx === 0 && messages.length === 1 && (
                        <>
                          <span>•</span>
                          <button
                            type="button"
                            onClick={() => handleGenerateDynamicOpening(true)}
                            disabled={isOpeningLoading}
                            className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors disabled:opacity-50"
                            title="Tạo câu mở đầu ngẫu nhiên khác từ AI cho tình huống này"
                          >
                            <Dice5 className={`w-3.5 h-3.5 ${isOpeningLoading ? 'animate-spin' : ''}`} />
                            <span>{isOpeningLoading ? 'Đang đổi...' : 'Đổi câu mở đầu'}</span>
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  {/* Inline Translation Display */}
                  {!isUser && showTranslations[msg.id] && translations[msg.id] && (
                    <div className="mt-2 p-2 rounded-xl bg-slate-900/80 border border-slate-700/60 text-xs text-indigo-200 italic leading-snug animate-in fade-in duration-150">
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
      <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-950/95 space-y-2">
        {/* Helper Hint Trigger Bar */}
        <div className="flex items-center justify-between px-1">
          <button
            type="button"
            onClick={showSuggestions ? () => setShowSuggestions(false) : handleFetchSuggestions}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
              showSuggestions
                ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                : 'bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-300 hover:text-amber-300'
            }`}
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
            disabled={isLoading}
            placeholder={`Nói chuyện bằng tiếng Anh với ${character.name}...`}
            rows={1}
            className="flex-1 bg-transparent border-0 resize-none text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-0 max-h-28 px-2 py-1 leading-relaxed"
          />

          {/* Voice Input Toggle Button */}
          <button
            type="button"
            onClick={toggleVoiceInput}
            className={`p-2 rounded-xl transition-all shrink-0 ${
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
              disabled={!input.trim()}
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
          setCharacter(newChar);
          setScenario(newScen);
          setUserAvatar(newUserAvatar);
          setUserName(newUserName);
          saveRoleplaySettings(newChar, newScen.id, newUserAvatar, newUserName);
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
