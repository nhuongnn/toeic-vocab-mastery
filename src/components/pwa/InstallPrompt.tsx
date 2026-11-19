'use client';

import React, { useState, useEffect } from 'react';
import { Download, X, Sparkles } from 'lucide-react';
import { BeforeInstallPromptEvent, isDismissedRecently, dismissInstallPrompt } from '@/lib/pwa/installPrompt';

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isDismissedRecently()) return;

    // Check if already in standalone mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
      ('standalone' in window.navigator && (window.navigator as unknown as { standalone: boolean }).standalone);
    if (isStandalone) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    dismissInstallPrompt(7);
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50 bg-slate-900 border border-indigo-500/30 rounded-2xl p-4 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom duration-300">
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 text-slate-400 hover:text-slate-200 transition-colors"
        aria-label="Đóng"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-500/20">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="pr-4">
          <h4 className="text-sm font-semibold text-slate-100">Cài đặt TOEIC Mastery</h4>
          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
            Học offline mượt mà, ôn tập toàn diện và nhận lời nhắc ôn từ đúng hạn.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-3.5 pt-2 border-t border-slate-800">
        <button
          onClick={handleInstall}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-medium transition-colors shadow-sm"
        >
          <Download className="w-3.5 h-3.5" />
          Cài đặt App
        </button>
        <button
          onClick={handleDismiss}
          className="py-2 px-3 text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors"
        >
          Để sau
        </button>
      </div>
    </div>
  );
}
