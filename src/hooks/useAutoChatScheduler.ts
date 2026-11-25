'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/contexts/ProgressContext';
import {
  AutoChatSettings,
  AutoChatBubbleState,
  DEFAULT_AUTO_CHAT_SETTINGS,
} from '@/types/auto-chat';
import { RoleplayMessage, RoleplayConversation } from '@/types/roleplay';
import {
  AUTO_CHAT_SETTINGS_EVENT,
  fetchAutoChatSettings,
  getLocalAutoChatSettings,
  updateAutoChatSettings,
} from '@/lib/auto-chat/settings';
import {
  getOrCreateTodayConversation,
  getTodayAutoBubbleConversation,
} from '@/lib/auto-chat/conversation-manager';
import {
  getChatRoomHistory,
  saveChatRoomConversation,
} from '@/lib/roleplay/history';

const LAST_SENT_KEY = 'toeic_auto_chat_last_sent';
const UNREAD_KEY = 'toeic_chat_bubble_unread';
const QUOTA_RETRY_COOLDOWN_MS = 5 * 60 * 1000;

export interface NewMessagePreview {
  id: string;
  content: string;
  characterName: string;
  timestamp: number;
}

export function useAutoChatScheduler() {
  const { user } = useAuth();
  const { progress, syncChatRoomHistory } = useProgress();

  const [settings, setSettings] = useState<AutoChatSettings>(() =>
    getLocalAutoChatSettings()
  );
  const [bubbleState, setBubbleState] = useState<AutoChatBubbleState>({
    isOpen: false,
    unreadCount: 0,
    currentConversationId: null,
    lastSentTimestamp: null,
    isSchedulerActive: false,
  });
  const [conversation, setConversation] = useState<RoleplayConversation | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [errorToast, setErrorToast] = useState<string | null>(null);
  const [newMessagePreview, setNewMessagePreview] =
    useState<NewMessagePreview | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const settingsRef = useRef<AutoChatSettings>(settings);
  const isSendingRef = useRef(false);
  const isOpenRef = useRef(bubbleState.isOpen);
  const quotaCooldownUntilRef = useRef<number>(0);

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  useEffect(() => {
    isOpenRef.current = bubbleState.isOpen;
  }, [bubbleState.isOpen]);

  // Load settings khi user đăng nhập
  useEffect(() => {
    if (!user?.id) {
      return;
    }

    let cancelled = false;
    fetchAutoChatSettings(user.id, user.email ?? undefined).then((loaded) => {
      if (!cancelled) setSettings(loaded);
    });

    const timer = setTimeout(() => {
      if (cancelled) return;
      const existingConv = getTodayAutoBubbleConversation();
      if (existingConv) {
        setConversation(existingConv);
      }
      try {
        const storedUnread = localStorage.getItem(UNREAD_KEY);
        const storedLastSent = localStorage.getItem(LAST_SENT_KEY);
        setBubbleState((prev) => ({
          ...prev,
          currentConversationId: existingConv?.id ?? prev.currentConversationId,
          unreadCount: storedUnread ? parseInt(storedUnread, 10) || 0 : 0,
          lastSentTimestamp: storedLastSent ? parseInt(storedLastSent, 10) || null : null,
        }));
      } catch {}
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [user?.id, user?.email]);

  // Lắng nghe thay đổi settings & history từ tab khác hoặc Settings page / Chat Room
  useEffect(() => {
    const handleSettingsUpdated = (e: Event) => {
      const custom = e as CustomEvent<AutoChatSettings>;
      if (custom.detail) {
        setSettings(custom.detail);
      } else {
        setSettings(getLocalAutoChatSettings());
      }
    };

    const handleHistoryUpdated = () => {
      const latest = getTodayAutoBubbleConversation();
      if (latest) {
        setConversation(latest);
      }
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'toeic_auto_chat_settings') {
        setSettings(getLocalAutoChatSettings());
      } else if (e.key === UNREAD_KEY) {
        setBubbleState((prev) => ({
          ...prev,
          unreadCount: e.newValue ? parseInt(e.newValue, 10) || 0 : 0,
        }));
      } else if (e.key === LAST_SENT_KEY) {
        setBubbleState((prev) => ({
          ...prev,
          lastSentTimestamp: e.newValue ? parseInt(e.newValue, 10) || null : null,
        }));
      }
    };

    window.addEventListener(AUTO_CHAT_SETTINGS_EVENT, handleSettingsUpdated);
    window.addEventListener('chat-room-history-updated', handleHistoryUpdated);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener(AUTO_CHAT_SETTINGS_EVENT, handleSettingsUpdated);
      window.removeEventListener('chat-room-history-updated', handleHistoryUpdated);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  /** Kiểm tra thời gian hiện tại có nằm trong khoảng cho phép gửi */
  const isWithinSendWindow = useCallback((): boolean => {
    const s = settingsRef.current;
    if (!s.enabled) return false;

    const now = new Date();
    const [startH, startM] = s.startTime.split(':').map(Number);
    const [endH, endM] = s.endTime.split(':').map(Number);
    if ([startH, startM, endH, endM].some((v) => Number.isNaN(v))) return false;

    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    if (startMinutes <= endMinutes) {
      return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
    }
    return currentMinutes >= startMinutes || currentMinutes <= endMinutes;
  }, []);

  /** Gửi tin nhắn tự động từ AI */
  const sendAutoMessage = useCallback(async () => {
    if (!user?.id || isSendingRef.current) return;
    if (!isWithinSendWindow()) return;
    if (Date.now() < quotaCooldownUntilRef.current) return;

    const s = settingsRef.current;
    if (!s.enabled) return;

    // Kiểm tra interval
    try {
      const lastSent = localStorage.getItem(LAST_SENT_KEY);
      if (lastSent) {
        const elapsed = Date.now() - parseInt(lastSent, 10);
        if (elapsed < s.intervalMinutes * 60 * 1000) return;
      }
    } catch {}

    isSendingRef.current = true;
    setIsSending(true);

    try {
      const userAvatar = progress.roleplay?.userAvatar || 'shiba-intern';
      const userName = progress.roleplay?.userName || 'Bạn';
      const conv = getOrCreateTodayConversation(s, userAvatar, userName);

      const res = await fetch('/api/auto-chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id,
          ...(user.email ? { 'x-user-email': user.email } : {}),
        },
        body: JSON.stringify({
          character: conv.character,
          scenario: conv.scenario,
          chatHistory: conv.messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          userContext: {
            targetScore: 650,
            totalWordsLearned: Object.keys(progress.cards || {}).length,
          },
          userId: user.id,
          userEmail: user.email,
        }),
      });

      if (res.status === 429) {
        const errData = await res.json().catch(() => ({}));
        quotaCooldownUntilRef.current = Date.now() + QUOTA_RETRY_COOLDOWN_MS;
        setErrorToast(
          errData.error || 'Đã đạt giới hạn AI hôm nay. Tạm dừng gửi tự động trong 5 phút.'
        );
        return;
      }

      if (res.ok) {
        const data = await res.json();
        if (!data.content) return;

        const now = Date.now();
        const newMsg: RoleplayMessage = {
          id: `auto-${now}`,
          role: 'assistant',
          content: data.content,
          timestamp: now,
          provider: data.provider as 'gemini' | 'cloudflare',
        };

        const updatedConv: RoleplayConversation = {
          ...conv,
          messages: [...conv.messages, newMsg],
          updatedAt: now,
          messageCount: conv.messages.length + 1,
          lastMessageSnippet: data.content.slice(0, 120),
          isAutoBubble: true,
        };

        const updatedHistory = saveChatRoomConversation(updatedConv);
        syncChatRoomHistory(updatedHistory.length ? updatedHistory : getChatRoomHistory());
        setConversation(updatedConv);

        try {
          localStorage.setItem(LAST_SENT_KEY, String(now));
        } catch {}

        setBubbleState((prev) => {
          const nextUnread = isOpenRef.current ? 0 : prev.unreadCount + 1;
          try {
            localStorage.setItem(UNREAD_KEY, String(nextUnread));
          } catch {}
          return {
            ...prev,
            unreadCount: nextUnread,
            currentConversationId: updatedConv.id,
            lastSentTimestamp: now,
            isSchedulerActive: true,
          };
        });

        if (!isOpenRef.current) {
          setNewMessagePreview({
            id: newMsg.id,
            content: data.content,
            characterName: updatedConv.character.name,
            timestamp: now,
          });
        }
      }
    } catch (err) {
      console.warn('Auto-chat send failed:', err);
    } finally {
      isSendingRef.current = false;
      setIsSending(false);
    }
  }, [user, isWithinSendWindow, progress.roleplay, progress.cards, syncChatRoomHistory]);

  // Khởi động / dừng scheduler
  useEffect(() => {
    if (!user?.id || !settings.enabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Check ngay lần đầu và kiểm tra mỗi 60 giây
    const initialTimer = setTimeout(() => {
      const existingConv = getTodayAutoBubbleConversation();
      if (existingConv) setConversation(existingConv);
      sendAutoMessage();
    }, 0);

    intervalRef.current = setInterval(() => {
      sendAutoMessage();
    }, 60 * 1000);

    return () => {
      clearTimeout(initialTimer);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [user?.id, settings.enabled, sendAutoMessage]);

  const updateSettings = useCallback(
    async (partial: Partial<AutoChatSettings>) => {
      if (!user?.id) return DEFAULT_AUTO_CHAT_SETTINGS;
      const updated = await updateAutoChatSettings(
        user.id,
        user.email ?? undefined,
        partial
      );
      setSettings(updated);
      return updated;
    },
    [user]
  );

  // Mở bubble → đánh dấu đã đọc
  const openBubble = useCallback(() => {
    setBubbleState((prev) => ({ ...prev, isOpen: true, unreadCount: 0 }));
    setNewMessagePreview(null);
    try {
      localStorage.setItem(UNREAD_KEY, '0');
    } catch {}
    const userAvatar = progress.roleplay?.userAvatar || 'shiba-intern';
    const userName = progress.roleplay?.userName || 'Bạn';
    const conv = getOrCreateTodayConversation(
      settingsRef.current,
      userAvatar,
      userName
    );
    setConversation(conv);
  }, [progress.roleplay]);

  const closeBubble = useCallback(() => {
    setBubbleState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const dismissPreview = useCallback(() => {
    setNewMessagePreview(null);
  }, []);

  const clearErrorToast = useCallback(() => {
    setErrorToast(null);
  }, []);

  const effectiveBubbleState: AutoChatBubbleState = user?.id
    ? {
        ...bubbleState,
        isSchedulerActive: Boolean(settings.enabled),
      }
    : {
        isOpen: false,
        unreadCount: 0,
        currentConversationId: null,
        lastSentTimestamp: null,
        isSchedulerActive: false,
      };

  return {
    settings,
    setSettings,
    updateSettings,
    bubbleState: effectiveBubbleState,
    conversation: user?.id ? conversation : null,
    setConversation,
    isSending,
    errorToast: user?.id ? errorToast : null,
    clearErrorToast,
    newMessagePreview: user?.id ? newMessagePreview : null,
    dismissPreview,
    openBubble,
    closeBubble,
    sendAutoMessage,
  };
}
