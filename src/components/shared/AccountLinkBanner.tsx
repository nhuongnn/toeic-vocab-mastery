'use client';

import React, { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useMounted } from '@/hooks/useMounted';
import {
  Sparkles,
  Cloud,
  ShieldCheck,
  TrendingUp,
  X,
  ArrowRight,
  UserCheck,
} from 'lucide-react';

const DISMISS_KEY = 'toeic_dismiss_account_banner';

function subscribeToStorage(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getDismissedSnapshot(): boolean {
  try {
    return localStorage.getItem(DISMISS_KEY) === 'true';
  } catch {
    return false;
  }
}

export function AccountLinkBanner() {
  const { user, isLoading, openAuthModal } = useAuth();
  const pathname = usePathname();
  const mounted = useMounted();
  const [dismissedLocally, setDismissedLocally] = useState(false);

  const isDismissedInStorage = useSyncExternalStore(
    subscribeToStorage,
    getDismissedSnapshot,
    () => false
  );

  const isDismissed = dismissedLocally || isDismissedInStorage;

  const handleDismiss = () => {
    setDismissedLocally(true);
    try {
      localStorage.setItem(DISMISS_KEY, 'true');
    } catch {
      // ignore
    }
  };

  // Do not show while hydrating, while checking session, if already logged in, or if dismissed
  if (!mounted || isLoading || user || isDismissed) {
    return null;
  }

  // Do not show on onboarding flow
  if (pathname === '/onboarding') {
    return null;
  }

  return (
    <aside
      aria-label="Thông báo liên kết tài khoản"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 w-full animate-in fade-in slide-in-from-top-2 duration-300"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950/70 via-slate-900 to-amber-950/40 border border-indigo-500/30 p-4 sm:p-5 shadow-lg shadow-indigo-950/30 backdrop-blur-md">
        {/* Glow ambient background effect */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top-right close button */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
          aria-label="Tắt thông báo liên kết tài khoản"
          title="Tắt thông báo này"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pr-6 sm:pr-8">
          {/* Left: Icon & Content */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-amber-500 p-[1px] shrink-0 mt-0.5 shadow-md shadow-indigo-500/20">
              <div className="w-full h-full rounded-[11px] bg-slate-950 flex items-center justify-center text-amber-400">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
            </div>

            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  Chế độ Khách (Local Storage)
                </span>
                <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
                  Liên kết tài khoản để sử dụng các tính năng nâng cao
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                Tiến độ của bạn hiện chỉ lưu trên trình duyệt này. Hãy liên kết tài khoản để mở khóa toàn diện:
              </p>

              {/* Feature Perks Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/70 border border-slate-800 text-[11px] text-slate-300">
                  <Cloud className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Đồng bộ đa thiết bị (Web & Mobile)</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/70 border border-slate-800 text-[11px] text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Bảo toàn thẻ nhớ SRS & chuỗi Streaks</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/70 border border-slate-800 text-[11px] text-slate-300">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Phân tích điểm TOEIC 700+ & Trợ lý AI</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 shrink-0 self-start md:self-center pt-2 md:pt-0">
            <button
              type="button"
              onClick={openAuthModal}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Liên kết ngay</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </button>

            <Link
              href="/settings"
              className="hidden sm:inline-flex items-center justify-center px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white font-medium text-xs transition-colors whitespace-nowrap"
            >
              Cài đặt
            </Link>

            <button
              type="button"
              onClick={handleDismiss}
              className="inline-flex items-center justify-center px-3 py-2 rounded-xl text-slate-400 hover:text-slate-200 font-medium text-xs transition-colors cursor-pointer whitespace-nowrap"
            >
              Để sau
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
