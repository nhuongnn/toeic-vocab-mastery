'use client';

import React, { useState, useEffect } from 'react';
import { Bell, X, Check } from 'lucide-react';
import {
  isNotificationSupported,
  getNotificationPermission,
  subscribeToPush,
} from '@/lib/notifications/pushManager';
import { useAuth } from '@/contexts/AuthContext';

const SNOOZE_KEY = 'notification_prompt_snoozed_until';

export function NotificationPermission() {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (!isNotificationSupported()) return;

    const currentPermission = getNotificationPermission();
    if (currentPermission === 'granted' || currentPermission === 'denied') {
      return;
    }

    // Check if snooze is still active
    const snoozedUntil = localStorage.getItem(SNOOZE_KEY);
    if (snoozedUntil && Date.now() < parseInt(snoozedUntil, 10)) {
      return;
    }

    // Check practice count: show after user completed at least 1 session
    const practiceHistory = localStorage.getItem('toeic_vocab_mastery_v1');
    if (practiceHistory) {
      try {
        const parsed = JSON.parse(practiceHistory);
        if (parsed.stats?.totalReviews > 0 || parsed.history?.length > 0) {
          setVisible(true);
        }
      } catch {
        // ignore
      }
    }
  }, []);

  const handleSubscribe = async () => {
    setSubscribing(true);
    try {
      const sub = await subscribeToPush(user?.id);
      if (sub) {
        setSubscribed(true);
        setTimeout(() => setVisible(false), 2000);
      } else {
        setVisible(false);
      }
    } finally {
      setSubscribing(false);
    }
  };

  const handleDismiss = () => {
    // Snooze for 3 days
    const expiry = Date.now() + 3 * 24 * 60 * 60 * 1000;
    localStorage.setItem(SNOOZE_KEY, expiry.toString());
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-40 bg-slate-900 border border-slate-700/80 rounded-2xl p-4 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom duration-300">
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 text-slate-400 hover:text-slate-200"
        aria-label="Đóng"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
          <Bell className="w-5 h-5" />
        </div>
        <div className="pr-4">
          <h4 className="text-sm font-semibold text-slate-100">
            Nhận lời nhắc ôn từ đúng lúc?
          </h4>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Hệ thống SRS sẽ nhắc bạn khi từ vựng chuẩn bị quên và cảnh báo bảo vệ streak học tập.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-800">
        {subscribed ? (
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium py-1">
            <Check className="w-4 h-4" />
            Đã bật thông báo thành công!
          </div>
        ) : (
          <>
            <button
              onClick={handleSubscribe}
              disabled={subscribing}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-medium transition-colors"
            >
              <Bell className="w-3.5 h-3.5" />
              {subscribing ? 'Đang kích hoạt...' : 'Bật thông báo'}
            </button>
            <button
              onClick={handleDismiss}
              className="py-2 px-3 text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors"
            >
              Để sau
            </button>
          </>
        )}
      </div>
    </div>
  );
}
