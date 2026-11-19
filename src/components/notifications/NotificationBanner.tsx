'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bell, ArrowRight, X } from 'lucide-react';

interface NotificationBannerProps {
  title: string;
  message: string;
  actionText?: string;
  actionHref?: string;
  onDismiss?: () => void;
}

export function NotificationBanner({
  title,
  message,
  actionText = 'Học ngay',
  actionHref = '/flashcards',
  onDismiss,
}: NotificationBannerProps) {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  const handleClose = () => {
    setClosed(true);
    if (onDismiss) onDismiss();
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900/60 via-purple-900/50 to-slate-900/80 border border-indigo-500/30 p-4 shadow-xl backdrop-blur-md">
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 text-slate-400 hover:text-slate-200"
        aria-label="Đóng"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 shrink-0">
          <Bell className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0 pr-6">
          <h4 className="text-sm font-semibold text-slate-100">{title}</h4>
          <p className="text-xs text-slate-300 mt-0.5">{message}</p>
        </div>
        {actionHref && (
          <Link
            href={actionHref}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors shrink-0 shadow-sm"
          >
            <span>{actionText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
