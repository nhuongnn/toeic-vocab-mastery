'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/contexts/ProgressContext';
import { useMounted } from '@/hooks/useMounted';
import {
  Cloud,
  CloudCheck,
  CloudAlert,
  RefreshCw,
} from 'lucide-react';

export function AuthButton() {
  const { user, isLoading, openAuthModal } = useAuth();
  const { syncStatus } = useProgress();
  const mounted = useMounted();

  if (!mounted || isLoading) {
    return (
      <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 animate-pulse" />
    );
  }

  return user ? (
    // Logged In User Pill
    <div className="relative group shrink-0">
      <button
        onClick={openAuthModal}
        className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 text-slate-200 transition-all text-xs font-semibold shrink-0 whitespace-nowrap cursor-pointer"
        title={user.user_metadata?.full_name || user.email || 'Tài khoản của bạn'}
      >
        {user.user_metadata?.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.user_metadata.avatar_url}
            alt="Avatar"
            className="w-5 h-5 rounded-full object-cover shrink-0"
          />
        ) : (
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] text-white font-bold shrink-0">
            {user.email ? user.email[0].toUpperCase() : 'U'}
          </div>
        )}

        <div className="flex items-center gap-1 shrink-0">
          {syncStatus === 'syncing' ? (
            <RefreshCw className="w-3.5 h-3.5 text-indigo-400 animate-spin shrink-0" />
          ) : syncStatus === 'error' ? (
            <CloudAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          ) : (
            <CloudCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          )}
          <span className="hidden xl:inline max-w-[85px] truncate text-slate-300">
            {user.user_metadata?.full_name || user.email?.split('@')[0]}
          </span>
        </div>
      </button>
    </div>
  ) : (
    // Not Logged In Button
    <button
      onClick={openAuthModal}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600/20 to-purple-600/20 hover:from-indigo-600/30 hover:to-purple-600/30 border border-indigo-500/30 text-indigo-300 hover:text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
    >
      <Cloud className="w-3.5 h-3.5 text-indigo-400" />
      <span>Sync</span>
    </button>
  );
}
