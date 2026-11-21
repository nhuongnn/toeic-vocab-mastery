'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/contexts/ProgressContext';
import {
  Cloud,
  CloudCheck,
  CloudUpload,
  CloudAlert,
  LogIn,
  LogOut,
  RefreshCw,
  X,
  User as UserIcon,
  CheckCircle2,
} from 'lucide-react';

export function AuthButton() {
  const { user, isConfigured, isLoading, signInWithGoogle, signInWithEmail, signOut } = useAuth();
  const { syncStatus, lastSyncedAt, forceSync } = useProgress();

  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleGoogleLogin = async () => {
    try {
      setErrorMsg(null);
      await signInWithGoogle();
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to initialize Google login');
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setEmailLoading(true);
    setErrorMsg(null);
    const { error } = await signInWithEmail(email);
    setEmailLoading(false);
    if (error) {
      setErrorMsg(error);
    } else {
      setEmailSent(true);
    }
  };

  const handleForceSync = async () => {
    await forceSync();
  };

  if (!mounted || isLoading) {
    return (
      <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 animate-pulse" />
    );
  }

  return (
    <>
      {user ? (
        // Logged In User Pill
        <div className="relative group shrink-0">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 text-slate-200 transition-all text-xs font-semibold shrink-0 whitespace-nowrap"
            title={user.user_metadata?.full_name || user.email || 'Tài khoản của bạn'}
          >
            {user.user_metadata?.avatar_url ? (
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
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600/20 to-purple-600/20 hover:from-indigo-600/30 hover:to-purple-600/30 border border-indigo-500/30 text-indigo-300 hover:text-white text-xs font-bold transition-all shadow-sm"
        >
          <Cloud className="w-3.5 h-3.5 text-indigo-400" />
          <span>Sync</span>
        </button>
      )}

      {/* Modal Dialog */}
      {isOpen && mounted && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200 whitespace-normal"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto whitespace-normal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-indigo-400 min-w-0">
                <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 shrink-0">
                  <CloudUpload className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-white truncate">
                    {user ? 'Trạng Thái Tài Khoản & Đồng Bộ' : 'Đồng Bộ Đa Thiết Bị'}
                  </h3>
                  <p className="text-[11px] text-slate-400 truncate">
                    {user ? 'Quản lý trạng thái đồng bộ Cloud' : 'Lưu trữ tiến độ học giữa các thiết bị'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
                title="Đóng (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* If Logged In View */}
            {user ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-3">
                    {user.user_metadata?.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white shrink-0">
                        {user.email ? user.email[0].toUpperCase() : 'U'}
                      </div>
                    )}
                    <div className="overflow-hidden min-w-0 flex-1">
                      <div className="text-sm font-bold text-white truncate">
                        {user.user_metadata?.full_name || 'Học viên TOEIC'}
                      </div>
                      <div className="text-xs text-slate-400 truncate">{user.email}</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Trạng thái đồng bộ:</span>
                    <span className="font-semibold flex items-center gap-1">
                      {syncStatus === 'syncing' && (
                        <span className="text-indigo-400 flex items-center gap-1">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Đang đồng bộ...
                        </span>
                      )}
                      {syncStatus === 'synced' && (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Đã cập nhật
                        </span>
                      )}
                      {syncStatus === 'error' && (
                        <span className="text-rose-400 flex items-center gap-1">
                          <CloudAlert className="w-3.5 h-3.5" /> Lỗi kết nối
                        </span>
                      )}
                      {syncStatus === 'idle' && (
                        <span className="text-slate-400">Sẵn sàng</span>
                      )}
                    </span>
                  </div>

                  {lastSyncedAt && (
                    <div className="text-[11px] text-slate-500">
                      Lần đồng bộ gần nhất: {lastSyncedAt.toLocaleTimeString()}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleForceSync}
                    disabled={syncStatus === 'syncing'}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
                    <span>Đồng bộ ngay</span>
                  </button>

                  <button
                    onClick={async () => {
                      await signOut();
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold transition-all"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              </div>
            ) : (
              // If Logged Out View
              <div className="space-y-4">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Đăng nhập để tự động đồng bộ từ vựng đã học, chuỗi ngày học (streaks), bài tập và
                  thẻ nhớ (flashcards) giữa điện thoại và máy tính.
                </p>

                {!isConfigured ? (
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 space-y-1">
                    <div className="font-bold">⚠️ Chưa cấu hình biến môi trường Supabase</div>
                    <div className="text-[11px] text-amber-300/80 leading-relaxed">
                      Hãy thêm <code className="bg-slate-900 px-1 py-0.5 rounded text-amber-200">NEXT_PUBLIC_SUPABASE_URL</code> và{' '}
                      <code className="bg-slate-900 px-1 py-0.5 rounded text-amber-200">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> vào file{' '}
                      <code className="bg-slate-900 px-1 py-0.5 rounded text-amber-200">.env.local</code> hoặc trên Vercel Project Settings.
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Google OAuth Button */}
                    <button
                      onClick={handleGoogleLogin}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold transition-all shadow-md active:scale-[0.99] cursor-pointer"
                    >
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <span>Tiếp tục với Google</span>
                    </button>

                    <div className="relative flex items-center justify-center my-4">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-slate-800" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-slate-900 px-3 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                          Hoặc tiếp tục với email
                        </span>
                      </div>
                    </div>

                    {/* Email Magic Link Form */}
                    {emailSent ? (
                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-1.5">
                        <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                        <div className="text-xs font-bold text-emerald-300">
                          Đã gửi liên kết đăng nhập!
                        </div>
                        <div className="text-[11px] text-slate-400 leading-relaxed">
                          Vui lòng kiểm tra hộp thư <b className="text-white break-all">{email}</b> để xác nhận đăng nhập.
                        </div>
                        <button
                          type="button"
                          onClick={() => setEmailSent(false)}
                          className="text-[11px] text-indigo-400 hover:text-indigo-300 underline mt-2 block mx-auto cursor-pointer"
                        >
                          Gửi lại hoặc đổi email khác
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleEmailSubmit} className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-300 block">
                            Email của bạn
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="Nhập địa chỉ email của bạn..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={emailLoading || !email.trim()}
                          className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all disabled:opacity-50 disabled:hover:bg-indigo-600 flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 cursor-pointer"
                        >
                          {emailLoading ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>Đang gửi liên kết...</span>
                            </>
                          ) : (
                            <>
                              <LogIn className="w-3.5 h-3.5" />
                              <span>Gửi liên kết đăng nhập</span>
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </>
                )}

                {errorMsg && (
                  <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 text-center leading-relaxed">
                    {errorMsg}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
