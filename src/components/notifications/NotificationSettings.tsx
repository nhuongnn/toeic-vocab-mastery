'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Clock, Flame, Calendar, Check, Send } from 'lucide-react';
import {
  NotificationPreferences,
  loadNotificationPreferences,
  saveNotificationPreferences,
} from '@/lib/notifications/notificationScheduler';
import {
  isNotificationSupported,
  getNotificationPermission,
  subscribeToPush,
  getCurrentPushSubscription,
} from '@/lib/notifications/pushManager';
import { useAuth } from '@/contexts/AuthContext';

export function NotificationSettings() {
  const { user } = useAuth();
  const [prefs, setPrefs] = useState<NotificationPreferences>(loadNotificationPreferences());
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setPrefs(loadNotificationPreferences());
    if (isNotificationSupported()) {
      setPermission(getNotificationPermission());
    }
  }, []);

  const handleToggle = (key: keyof NotificationPreferences) => {
    const updated = { ...prefs, [key]: !prefs[key] };
    setPrefs(updated);
    saveNotificationPreferences(updated);
  };

  const handleTimeChange = (key: 'dailyReminderTime' | 'streakWarningTime', val: string) => {
    const updated = { ...prefs, [key]: val };
    setPrefs(updated);
    saveNotificationPreferences(updated);
  };

  const handleEnableNotifications = async () => {
    const sub = await subscribeToPush(user?.id);
    if (sub) {
      setPermission('granted');
      setMessage('Đã kết nối Web Push thành công!');
      setTimeout(() => setMessage(null), 3000);
    } else {
      setPermission(getNotificationPermission());
    }
  };

  const handleSendTestNotification = async () => {
    setTesting(true);
    try {
      const sub = await getCurrentPushSubscription();
      if (!sub) {
        setMessage('Vui lòng cấp quyền thông báo trước');
        return;
      }

      const res = await fetch('/api/notifications/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscription: sub.toJSON(),
          payload: {
            title: '🔔 Thử nghiệm thông báo TOEIC',
            body: 'Hệ thống thông báo đã sẵn sàng nhắc bạn học tập mỗi ngày!',
            url: '/',
          },
        }),
      });

      if (res.ok) {
        setMessage('Đã gửi thông báo thử nghiệm tới thiết bị của bạn!');
      } else {
        setMessage('Không thể gửi thông báo thử nghiệm.');
      }
    } catch {
      setMessage('Lỗi khi gửi thông báo thử nghiệm.');
    } finally {
      setTesting(false);
      setTimeout(() => setMessage(null), 4000);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-100">Cài đặt Thông báo & Nhắc nhở</h3>
            <p className="text-xs text-slate-400">Tùy biến lịch nhắc ôn từ để duy trì thói quen học tập</p>
          </div>
        </div>

        {permission !== 'granted' ? (
          <button
            onClick={handleEnableNotifications}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors"
          >
            Bật quyền Web Push
          </button>
        ) : (
          <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
            <Check className="w-3.5 h-3.5" />
            Đã bật Push
          </span>
        )}
      </div>

      {message && (
        <div className="mt-4 p-3 bg-indigo-950/60 border border-indigo-500/30 rounded-xl text-xs text-indigo-200">
          {message}
        </div>
      )}

      <div className="mt-5 space-y-4">
        {/* Daily Reminder */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-blue-400 shrink-0" />
            <div>
              <p className="text-sm font-medium text-slate-200">Nhắc nhở học hàng ngày</p>
              <p className="text-xs text-slate-400">Thông báo vào thời gian bạn chọn nếu chưa học</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="time"
              value={prefs.dailyReminderTime}
              onChange={(e) => handleTimeChange('dailyReminderTime', e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
            <input
              type="checkbox"
              checked={prefs.dailyReminderEnabled}
              onChange={() => handleToggle('dailyReminderEnabled')}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
            />
          </div>
        </div>

        {/* Streak Warning */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
          <div className="flex items-center gap-3">
            <Flame className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <p className="text-sm font-medium text-slate-200">Cảnh báo sắp mất Streak</p>
              <p className="text-xs text-slate-400">Nhắc nhở vào buổi tối nếu chưa có bài học nào trong ngày</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="time"
              value={prefs.streakWarningTime}
              onChange={(e) => handleTimeChange('streakWarningTime', e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
            <input
              type="checkbox"
              checked={prefs.streakWarningEnabled}
              onChange={() => handleToggle('streakWarningEnabled')}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
            />
          </div>
        </div>

        {/* SRS Due Cards */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4 text-indigo-400 shrink-0" />
            <div>
              <p className="text-sm font-medium text-slate-200">Nhắc thẻ SRS đến hạn ôn</p>
              <p className="text-xs text-slate-400">Báo khi có từ cần ôn tập để ghi nhớ lâu dài</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={prefs.srsDueReminderEnabled}
            onChange={() => handleToggle('srsDueReminderEnabled')}
            className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
          />
        </div>

        {/* Weekly Summary */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <p className="text-sm font-medium text-slate-200">Báo cáo tổng kết tuần</p>
              <p className="text-xs text-slate-400">Nhận báo cáo tiến độ và độ chính xác vào sáng Chủ Nhật</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={prefs.weeklySummaryEnabled}
            onChange={() => handleToggle('weeklySummaryEnabled')}
            className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
          />
        </div>
      </div>

      {permission === 'granted' && (
        <div className="mt-5 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={handleSendTestNotification}
            disabled={testing}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            {testing ? 'Đang gửi...' : 'Gửi thông báo thử nghiệm'}
          </button>
        </div>
      )}
    </div>
  );
}
