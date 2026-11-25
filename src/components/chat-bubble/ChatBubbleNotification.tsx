'use client';

import React, { useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { NewMessagePreview } from '@/hooks/useAutoChatScheduler';

interface ChatBubbleNotificationProps {
  preview: NewMessagePreview | null;
  onDismiss: () => void;
  onOpenBubble: () => void;
}

function playSoftNotificationChime() {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.26);
    setTimeout(() => {
      ctx.close().catch(() => {});
    }, 350);
  } catch {
    // Ignore audio context restrictions
  }
}

export function ChatBubbleNotification({
  preview,
  onDismiss,
  onOpenBubble,
}: ChatBubbleNotificationProps) {
  useEffect(() => {
    if (!preview) return;
    playSoftNotificationChime();

    const timer = setTimeout(() => {
      onDismiss();
    }, 4000);

    return () => clearTimeout(timer);
  }, [preview, onDismiss]);

  if (!preview) return null;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpenBubble}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onOpenBubble();
      }}
      className="fixed bottom-36 md:bottom-24 left-4 sm:left-6 z-50 max-w-[270px] sm:max-w-[300px] p-3.5 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-indigo-500/40 shadow-2xl shadow-indigo-950/50 cursor-pointer animate-in fade-in slide-in-from-bottom-3 duration-200 group"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-400">
          <MessageCircle className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{preview.characterName}</span>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          className="text-slate-500 hover:text-slate-300 p-0.5 rounded-md transition-colors"
          aria-label="Đóng thông báo"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <p className="mt-1 text-xs text-slate-200 line-clamp-2 leading-relaxed">
        {preview.content}
      </p>
      <span className="mt-1.5 block text-[10px] text-slate-400 group-hover:text-indigo-300 transition-colors">
        Nhấn để mở hội thoại →
      </span>
    </div>
  );
}
