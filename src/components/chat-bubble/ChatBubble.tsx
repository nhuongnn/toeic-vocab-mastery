'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useAutoChatScheduler } from '@/hooks/useAutoChatScheduler';
import { CharacterAvatar } from '@/components/roleplay/CharacterAvatar';
import { DEFAULT_CHARACTERS } from '@/lib/roleplay/scenarios';
import { CharacterRole } from '@/types/roleplay';
import { ChatBubbleWindow } from './ChatBubbleWindow';
import { ChatBubbleSettingsModal } from './ChatBubbleSettingsModal';
import { ChatBubbleNotification } from './ChatBubbleNotification';

export function ChatBubble() {
  const { user } = useAuth();
  const {
    settings,
    updateSettings,
    bubbleState,
    conversation,
    setConversation,
    errorToast,
    clearErrorToast,
    newMessagePreview,
    dismissPreview,
    openBubble,
    closeBubble,
  } = useAutoChatScheduler();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Auto-hide error toast after 5s
  useEffect(() => {
    if (!errorToast) return;
    const timer = setTimeout(clearErrorToast, 5000);
    return () => clearTimeout(timer);
  }, [errorToast, clearErrorToast]);

  // Chỉ hiển thị khi người dùng đã đăng nhập
  if (!user) {
    return null;
  }

  const displayCharacter =
    conversation?.character ||
    (settings.characterRole !== 'random' &&
    DEFAULT_CHARACTERS[settings.characterRole as CharacterRole]
      ? DEFAULT_CHARACTERS[settings.characterRole as CharacterRole]
      : DEFAULT_CHARACTERS.friend);

  const shortName = displayCharacter.name.split(' ')[0];

  return (
    <>
      {/* Error Toast */}
      {errorToast && (
        <div className="fixed bottom-36 md:bottom-24 left-4 sm:left-6 z-50 max-w-xs p-3 rounded-2xl bg-rose-950/95 border border-rose-500/40 text-rose-100 shadow-2xl flex items-start gap-2.5 text-xs animate-in fade-in slide-in-from-bottom-2">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <span className="flex-1 leading-relaxed">{errorToast}</span>
          <button
            type="button"
            onClick={clearErrorToast}
            className="text-rose-300 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* New message preview tooltip */}
      {!bubbleState.isOpen && (
        <ChatBubbleNotification
          preview={newMessagePreview}
          onDismiss={dismissPreview}
          onOpenBubble={openBubble}
        />
      )}

      {/* Lazy-mounted Mini Chat Window */}
      {bubbleState.isOpen && (
        <ChatBubbleWindow
          conversation={conversation}
          onUpdateConversation={setConversation}
          onClose={closeBubble}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
      )}

      {/* Floating Chat Bubble Button */}
      {!bubbleState.isOpen && (
        <div className="fixed bottom-20 md:bottom-6 left-4 sm:left-6 z-50 flex flex-col items-center gap-1">
          <button
            type="button"
            onClick={openBubble}
            className={`relative w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-indigo-600 to-pink-500 shadow-xl shadow-indigo-950/50 hover:scale-105 active:scale-95 transition-transform focus:outline-none ${
              newMessagePreview ? 'animate-bubble-shake' : ''
            }`}
            aria-label={`Mở chat cùng ${displayCharacter.name}`}
            title={`Chat cùng ${displayCharacter.name}`}
          >
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
              <CharacterAvatar
                avatarId={displayCharacter.avatar}
                size="md"
                showBadge={false}
              />
            </div>

            {/* Active indicator dot when auto-chat is enabled */}
            {settings.enabled && (
              <span
                className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950"
                title="Tự động gửi tin đang bật"
              />
            )}

            {/* Unread badge */}
            {bubbleState.unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center border-2 border-slate-950 shadow-md">
                {bubbleState.unreadCount > 99 ? '99+' : bubbleState.unreadCount}
              </span>
            )}
          </button>
          <span className="text-[10px] font-bold text-slate-300 bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-slate-800/80 shadow-sm pointer-events-none">
            {shortName}
          </span>
        </div>
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <ChatBubbleSettingsModal
          isOpen={isSettingsOpen}
          settings={settings}
          onClose={() => setIsSettingsOpen(false)}
          onSave={async (updated) => {
            await updateSettings(updated);
          }}
        />
      )}
    </>
  );
}
