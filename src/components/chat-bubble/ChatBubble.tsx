'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useAutoChatScheduler } from '@/hooks/useAutoChatScheduler';
import { CharacterAvatar } from '@/components/roleplay/CharacterAvatar';
import { DEFAULT_CHARACTERS } from '@/lib/roleplay/scenarios';
import { CharacterRole } from '@/types/roleplay';
import { ChatBubbleWindow } from './ChatBubbleWindow';
import { ChatBubbleSettingsModal } from './ChatBubbleSettingsModal';
import { ChatBubbleNotification } from './ChatBubbleNotification';

const BUBBLE_POS_STORAGE_KEY = 'toeic_chat_bubble_pos';
const EDGE_PADDING = 8;
const DRAG_THRESHOLD_PX = 5;
const FALLBACK_BUBBLE_WIDTH = 64;
const FALLBACK_BUBBLE_HEIGHT = 76;

interface BubblePosition {
  x: number;
  y: number;
}

function clampPosition(
  x: number,
  y: number,
  width: number,
  height: number,
  viewportW: number,
  viewportH: number
): BubblePosition {
  const maxX = Math.max(EDGE_PADDING, viewportW - width - EDGE_PADDING);
  const maxY = Math.max(EDGE_PADDING, viewportH - height - EDGE_PADDING);
  return {
    x: Math.round(Math.max(EDGE_PADDING, Math.min(x, maxX))),
    y: Math.round(Math.max(EDGE_PADDING, Math.min(y, maxY))),
  };
}

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
  const [bubblePos, setBubblePos] = useState<BubblePosition | null>(null);
  const [viewport, setViewport] = useState<{ width: number; height: number } | null>(null);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const bubbleContainerRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    width: number;
    height: number;
    hasMoved: boolean;
  } | null>(null);
  const suppressClickRef = useRef(false);
  const latestPosRef = useRef<BubblePosition | null>(null);

  useEffect(() => {
    latestPosRef.current = bubblePos;
  }, [bubblePos]);

  // Load saved position and keep clamped inside viewport on resize
  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setViewport({ width: vw, height: vh });
      try {
        const raw = localStorage.getItem(BUBBLE_POS_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (typeof parsed?.x === 'number' && typeof parsed?.y === 'number') {
            setBubblePos(
              clampPosition(
                parsed.x,
                parsed.y,
                FALLBACK_BUBBLE_WIDTH,
                FALLBACK_BUBBLE_HEIGHT,
                vw,
                vh
              )
            );
          }
        }
      } catch {}
    });

    const handleResize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setViewport({ width: vw, height: vh });
      setBubblePos((prev) => {
        if (!prev) return prev;
        const rect = bubbleContainerRef.current?.getBoundingClientRect();
        const w = rect?.width || FALLBACK_BUBBLE_WIDTH;
        const h = rect?.height || FALLBACK_BUBBLE_HEIGHT;
        return clampPosition(prev.x, prev.y, w, h, vw, vh);
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Pointer drag listeners
  useEffect(() => {
    if (!isPointerDown) return;

    const handlePointerMove = (e: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) return;

      const dx = e.clientX - drag.startX;
      const dy = e.clientY - drag.startY;

      if (!drag.hasMoved) {
        if (Math.hypot(dx, dy) <= DRAG_THRESHOLD_PX) return;
        drag.hasMoved = true;
        suppressClickRef.current = true;
        setIsDragging(true);
      }

      const nextPos = clampPosition(
        drag.originX + dx,
        drag.originY + dy,
        drag.width,
        drag.height,
        window.innerWidth,
        window.innerHeight
      );
      latestPosRef.current = nextPos;
      setBubblePos(nextPos);
    };

    const handlePointerUp = () => {
      const moved = dragRef.current?.hasMoved;
      if (moved && latestPosRef.current) {
        try {
          localStorage.setItem(
            BUBBLE_POS_STORAGE_KEY,
            JSON.stringify(latestPosRef.current)
          );
        } catch {}
        setTimeout(() => {
          suppressClickRef.current = false;
        }, 60);
      } else {
        suppressClickRef.current = false;
      }

      dragRef.current = null;
      setIsPointerDown(false);
      setIsDragging(false);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [isPointerDown]);

  const handleBubblePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const rect = bubbleContainerRef.current?.getBoundingClientRect();
    if (!rect) return;

    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: rect.left,
      originY: rect.top,
      width: rect.width,
      height: rect.height,
      hasMoved: false,
    };
    suppressClickRef.current = false;
    setIsPointerDown(true);
  };

  const handleBubbleClick = () => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    openBubble();
  };

  const anchoredOverlayStyle = useMemo<React.CSSProperties | undefined>(() => {
    if (!bubblePos || !viewport) return undefined;
    const overlayW = Math.min(300, viewport.width - EDGE_PADDING * 2);
    const isLeftHalf = bubblePos.x + FALLBACK_BUBBLE_WIDTH / 2 < viewport.width / 2;
    const rawLeft = isLeftHalf
      ? bubblePos.x
      : bubblePos.x + FALLBACK_BUBBLE_WIDTH - overlayW;
    const left = Math.max(
      EDGE_PADDING,
      Math.min(rawLeft, viewport.width - overlayW - EDGE_PADDING)
    );

    if (bubblePos.y >= 150) {
      return {
        left: `${Math.round(left)}px`,
        bottom: `${Math.round(viewport.height - bubblePos.y + 10)}px`,
      };
    }
    return {
      left: `${Math.round(left)}px`,
      top: `${Math.round(bubblePos.y + FALLBACK_BUBBLE_HEIGHT + 10)}px`,
    };
  }, [bubblePos, viewport]);

  const anchoredWindowStyle = useMemo<React.CSSProperties | undefined>(() => {
    if (!bubblePos || !viewport) return undefined;
    const isMobile = viewport.width < 640;
    const winW = isMobile ? Math.round(viewport.width * 0.94) : 360;
    const winH = isMobile
      ? Math.min(Math.round(viewport.height * 0.7), viewport.height - 96)
      : Math.min(480, viewport.height - 96);

    const isLeftHalf = bubblePos.x + FALLBACK_BUBBLE_WIDTH / 2 < viewport.width / 2;
    const rawLeft = isLeftHalf
      ? bubblePos.x
      : bubblePos.x + FALLBACK_BUBBLE_WIDTH - winW;
    const left = Math.max(
      EDGE_PADDING,
      Math.min(rawLeft, viewport.width - winW - EDGE_PADDING)
    );
    const rawTop = bubblePos.y + FALLBACK_BUBBLE_HEIGHT - winH;
    const top = Math.max(
      EDGE_PADDING,
      Math.min(rawTop, viewport.height - winH - EDGE_PADDING)
    );

    return {
      left: `${Math.round(left)}px`,
      top: `${Math.round(top)}px`,
    };
  }, [bubblePos, viewport]);

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
        <div
          style={anchoredOverlayStyle}
          className={`fixed ${
            anchoredOverlayStyle ? '' : 'bottom-36 md:bottom-24 left-4 sm:left-6'
          } z-50 max-w-xs p-3 rounded-2xl bg-rose-950/95 border border-rose-500/40 text-rose-100 shadow-2xl flex items-start gap-2.5 text-xs animate-in fade-in slide-in-from-bottom-2`}
        >
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
          style={anchoredOverlayStyle}
          positionClassName={
            anchoredOverlayStyle ? '' : 'bottom-36 md:bottom-24 left-4 sm:left-6'
          }
        />
      )}

      {/* Lazy-mounted Mini Chat Window */}
      {bubbleState.isOpen && (
        <ChatBubbleWindow
          conversation={conversation}
          onUpdateConversation={setConversation}
          onClose={closeBubble}
          onOpenSettings={() => setIsSettingsOpen(true)}
          anchorStyle={anchoredWindowStyle}
          positionClassName={anchoredWindowStyle ? '' : 'bottom-20 left-4 sm:left-6'}
        />
      )}

      {/* Floating Chat Bubble Button (Draggable) */}
      {!bubbleState.isOpen && (
        <div
          ref={bubbleContainerRef}
          onPointerDown={handleBubblePointerDown}
          style={
            bubblePos
              ? {
                  left: `${bubblePos.x}px`,
                  top: `${bubblePos.y}px`,
                  touchAction: 'none',
                }
              : { touchAction: 'none' }
          }
          className={`fixed ${
            bubblePos ? '' : 'bottom-20 md:bottom-6 left-4 sm:left-6'
          } z-50 flex flex-col items-center gap-1 select-none ${
            isDragging ? 'cursor-grabbing scale-105' : 'cursor-grab'
          } transition-transform duration-100`}
        >
          <button
            type="button"
            onClick={handleBubbleClick}
            className={`relative w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-indigo-600 to-pink-500 shadow-xl shadow-indigo-950/50 hover:scale-105 active:scale-95 transition-transform focus:outline-none ${
              isDragging ? 'cursor-grabbing ring-2 ring-indigo-300/60' : 'cursor-grab'
            } ${newMessagePreview && !isDragging ? 'animate-bubble-shake' : ''}`}
            aria-label={`Mở chat cùng ${displayCharacter.name}`}
            title={`Chat cùng ${displayCharacter.name} (Kéo để di chuyển)`}
          >
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden pointer-events-none">
              <CharacterAvatar
                avatarId={displayCharacter.avatar}
                size="md"
                showBadge={false}
              />
            </div>

            {/* Active indicator dot when auto-chat is enabled */}
            {settings.enabled && (
              <span
                className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 pointer-events-none"
                title="Tự động gửi tin đang bật"
              />
            )}

            {/* Unread badge */}
            {bubbleState.unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center border-2 border-slate-950 shadow-md pointer-events-none">
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
