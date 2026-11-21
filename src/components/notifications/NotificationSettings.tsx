'use client';

import React, { useState, useEffect } from 'react';
import {
  Bell,
  Clock,
  Flame,
  Calendar,
  Check,
  Send,
  Plus,
  Trash2,
  Sparkles,
  Info,
  AlertCircle,
  X,
  Volume2,
} from 'lucide-react';
import {
  NotificationPreferences,
  DEFAULT_NOTIFICATION_PREFERENCES,
  REMINDER_PRESETS,
  getTimePeriodMeta,
  sortReminderTimes,
  loadNotificationPreferences,
  saveNotificationPreferences,
} from '@/lib/notifications/notificationScheduler';
import {
  isNotificationSupported,
  getNotificationPermission,
  requestNotificationPermission,
  subscribeToPush,
  getCurrentPushSubscription,
  showLocalNotification,
  playNotificationTone,
} from '@/lib/notifications/pushManager';
import { getDailyReminderContent } from '@/lib/notifications/notificationTemplates';
import { useAuth } from '@/contexts/AuthContext';

const MAX_REMINDER_SLOTS = 8;

export function NotificationSettings() {
  const { user } = useAuth();
  const [prefs, setPrefs] = useState<NotificationPreferences>(DEFAULT_NOTIFICATION_PREFERENCES);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [testing, setTesting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'info' | 'error' | 'success'>('info');
  const [customTime, setCustomTime] = useState<string>('07:00');
  const [previewNotification, setPreviewNotification] = useState<{
    title: string;
    body: string;
    time?: string;
  } | null>(null);

  // Load preferences from local storage and sync with server if user is logged in
  useEffect(() => {
    const localPrefs = loadNotificationPreferences();
    setPrefs(localPrefs);

    if (isNotificationSupported()) {
      setPermission(getNotificationPermission());
    }

    if (user?.id) {
      fetch(`/api/notifications/preferences?userId=${user.id}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((serverPrefs) => {
          if (serverPrefs && serverPrefs.dailyReminderTimes) {
            setPrefs(serverPrefs);
            saveNotificationPreferences(serverPrefs);
          }
        })
        .catch(() => {
          // ignore network errors
        });
    }
  }, [user?.id]);

  const showFeedback = (msg: string, type: 'info' | 'error' | 'success' = 'info', duration = 4000) => {
    setMessage(msg);
    setMessageType(type);
    if (duration > 0) {
      setTimeout(() => setMessage(null), duration);
    }
  };

  const syncToServer = async (updated: NotificationPreferences) => {
    if (!user?.id) return;
    try {
      await fetch('/api/notifications/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, preferences: updated }),
      });
    } catch (err) {
      console.warn('Failed to sync notification preferences to server:', err);
    }
  };

  const updatePreferences = (updated: NotificationPreferences) => {
    setPrefs(updated);
    saveNotificationPreferences(updated);
    syncToServer(updated);
  };

  const handleToggle = (key: keyof NotificationPreferences) => {
    const updated = { ...prefs, [key]: !prefs[key] };
    updatePreferences(updated);
  };

  const handleStreakTimeChange = (val: string) => {
    const updated = { ...prefs, streakWarningTime: val };
    updatePreferences(updated);
  };

  // Add a reminder time slot
  const handleAddTimeSlot = (timeToAdd: string) => {
    if (!timeToAdd) return;
    const currentTimes = prefs.dailyReminderTimes || [];

    if (currentTimes.includes(timeToAdd)) {
      showFeedback(`Khung giờ ${timeToAdd} đã có trong danh sách.`, 'info');
      return;
    }

    if (currentTimes.length >= MAX_REMINDER_SLOTS) {
      showFeedback(`Bạn chỉ có thể đặt tối đa ${MAX_REMINDER_SLOTS} khung giờ nhắc nhở mỗi ngày.`, 'error');
      return;
    }

    const updatedTimes = sortReminderTimes([...currentTimes, timeToAdd]);
    const updated: NotificationPreferences = {
      ...prefs,
      dailyReminderTimes: updatedTimes,
      dailyReminderTime: updatedTimes[0] || '08:00',
      dailyReminderEnabled: true,
    };
    updatePreferences(updated);
    showFeedback(`Đã thêm lịch nhắc nhở lúc ${timeToAdd}!`, 'success');
  };

  // Edit an existing reminder slot
  const handleUpdateTimeSlot = (index: number, newTime: string) => {
    if (!newTime) return;
    const currentTimes = [...(prefs.dailyReminderTimes || [])];
    currentTimes[index] = newTime;
    const updatedTimes = sortReminderTimes(currentTimes);

    const updated: NotificationPreferences = {
      ...prefs,
      dailyReminderTimes: updatedTimes,
      dailyReminderTime: updatedTimes[0] || '08:00',
    };
    updatePreferences(updated);
  };

  // Remove a reminder slot
  const handleRemoveTimeSlot = (timeToRemove: string) => {
    const currentTimes = prefs.dailyReminderTimes || [];
    const updatedTimes = currentTimes.filter((t) => t !== timeToRemove);

    if (updatedTimes.length === 0) {
      // If user deletes all slots, disable reminder
      const updated: NotificationPreferences = {
        ...prefs,
        dailyReminderTimes: ['08:00'],
        dailyReminderTime: '08:00',
        dailyReminderEnabled: false,
      };
      updatePreferences(updated);
      showFeedback('Đã xóa tất cả khung giờ và tạm tắt nhắc nhở hàng ngày.', 'info');
    } else {
      const updated: NotificationPreferences = {
        ...prefs,
        dailyReminderTimes: updatedTimes,
        dailyReminderTime: updatedTimes[0] || '08:00',
      };
      updatePreferences(updated);
      showFeedback(`Đã xóa khung giờ ${timeToRemove}.`, 'info');
    }
  };

  const handleEnableNotifications = async () => {
    const sub = await subscribeToPush(user?.id);
    const currPerm = getNotificationPermission();
    setPermission(currPerm);

    if (currPerm === 'granted') {
      showFeedback(
        sub ? 'Đã kết nối Web Push thành công!' : 'Đã bật quyền thông báo trên trình duyệt!',
        'success'
      );
    } else if (currPerm === 'denied') {
      showFeedback(
        'Quyền thông báo đang bị chặn. Vui lòng bấm vào biểu tượng 🔒 cạnh thanh địa chỉ trình duyệt để Cho phép (Allow).',
        'error',
        6000
      );
    }
  };

  // Send a test notification for a specific time slot
  const handleTestSlotNotification = async (slotTime: string) => {
    setTesting(true);
    try {
      let currentPerm = getNotificationPermission();
      if (currentPerm === 'default') {
        currentPerm = await requestNotificationPermission();
        setPermission(currentPerm);
      }

      const payload = getDailyReminderContent(slotTime);
      playNotificationTone();
      setPreviewNotification({ title: payload.title, body: payload.body, time: slotTime });

      if (currentPerm === 'denied') {
        showFeedback(
          'Quyền thông báo bị chặn trên trình duyệt. Vui lòng bấm 🔒 bên cạnh thanh địa chỉ để bật lại.',
          'error',
          6000
        );
        return;
      }

      const success = await showLocalNotification(payload);
      if (success) {
        showFeedback(`Đã gửi thông báo mẫu cho khung giờ ${slotTime}!`, 'success');
      } else {
        showFeedback(
          'Đã hiển thị bản xem trước thông báo bên dưới.',
          'info'
        );
      }
    } catch (err) {
      console.warn('Test slot error:', err);
      showFeedback('Lỗi khi kích hoạt thông báo thử nghiệm.', 'error');
    } finally {
      setTesting(false);
    }
  };

  const handleSendTestNotification = async () => {
    setTesting(true);
    try {
      let currentPerm = getNotificationPermission();

      // Automatically request permission if not asked yet
      if (currentPerm === 'default') {
        currentPerm = await requestNotificationPermission();
        setPermission(currentPerm);
      }

      if (currentPerm === 'denied') {
        showFeedback(
          'Quyền thông báo đang bị chặn trên trình duyệt. Vui lòng nhấp vào biểu tượng 🔒 cạnh thanh địa chỉ để Cho phép (Allow) nhận thông báo.',
          'error',
          7000
        );
        // Still show preview in-app
        const slotTime = prefs.dailyReminderTimes?.[0] || '08:00';
        const payload = getDailyReminderContent(slotTime);
        playNotificationTone();
        setPreviewNotification({ title: payload.title, body: payload.body, time: slotTime });
        return;
      }

      const slotTime = prefs.dailyReminderTimes?.[0] || '08:00';
      const payload = getDailyReminderContent(slotTime);

      // 1. Play chime & show in-app preview
      playNotificationTone();
      setPreviewNotification({ title: payload.title, body: payload.body, time: slotTime });

      // 2. Deliver via browser notification (Service Worker or Notification constructor)
      const localDelivered = await showLocalNotification(payload);

      // 3. Attempt Web Push as well if available
      let pushDelivered = false;
      try {
        let sub = await getCurrentPushSubscription();
        if (!sub && currentPerm === 'granted') {
          sub = await subscribeToPush(user?.id);
        }

        if (sub) {
          const res = await fetch('/api/notifications/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              subscription: sub.toJSON(),
              payload: {
                title: payload.title,
                body: `${payload.body} (Khung giờ: ${prefs.dailyReminderTimes?.join(', ') || '08:00'})`,
                url: payload.url || '/',
              },
            }),
          });
          if (res.ok) {
            pushDelivered = true;
          }
        }
      } catch (pushErr) {
        console.warn('Web push test notice:', pushErr);
      }

      if (localDelivered || pushDelivered) {
        showFeedback(
          pushDelivered
            ? 'Đã gửi thông báo thử nghiệm thành công tới thiết bị của bạn!'
            : 'Đã hiển thị thông báo thử nghiệm trên trình duyệt!',
          'success'
        );
      } else {
        showFeedback(
          'Đã hiển thị bản xem trước thông báo bên dưới. Nếu chưa thấy popup hệ thống, vui lòng kiểm tra chế độ Không làm phiền (Do Not Disturb) của máy tính.',
          'info',
          6000
        );
      }
    } catch (err) {
      console.warn('Send test notification error:', err);
      showFeedback('Lỗi khi gửi thông báo thử nghiệm.', 'error');
    } finally {
      setTesting(false);
    }
  };

  const activeTimes = prefs.dailyReminderTimes || [];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-100">Cài đặt Thông báo & Nhắc nhở</h3>
            <p className="text-xs text-slate-400">
              Cài đặt nhiều khung giờ nhắc ôn tập trong ngày để hình thành phản xạ tự nhiên
            </p>
          </div>
        </div>

        <div>
          {permission !== 'granted' ? (
            <button
              onClick={handleEnableNotifications}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Bật quyền Thông báo</span>
            </button>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
              <Check className="w-3.5 h-3.5" />
              Đã cho phép thông báo
            </span>
          )}
        </div>
      </div>

      {/* Permission Warning Banner if Denied */}
      {permission === 'denied' && (
        <div className="p-3.5 bg-rose-950/50 border border-rose-500/30 rounded-xl text-xs text-rose-200 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block text-rose-100">Quyền gửi thông báo đang bị chặn</span>
            <span>
              Trình duyệt của bạn đang chặn thông báo từ trang này. Để nhận lời nhắc hàng ngày, bạn hãy bấm vào biểu tượng <strong>🔒 ổ khóa</strong> (hoặc Cài đặt trang) trên thanh địa chỉ và chọn <strong>&quot;Cho phép&quot; (Allow)</strong> cho Thông báo.
            </span>
          </div>
        </div>
      )}

      {/* Status feedback message */}
      {message && (
        <div
          className={`p-3 rounded-xl text-xs flex items-center gap-2 animate-in fade-in ${
            messageType === 'error'
              ? 'bg-rose-950/60 border border-rose-500/30 text-rose-200'
              : messageType === 'success'
              ? 'bg-emerald-950/60 border border-emerald-500/30 text-emerald-200'
              : 'bg-indigo-950/60 border border-indigo-500/30 text-indigo-200'
          }`}
        >
          {messageType === 'error' ? (
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          ) : messageType === 'success' ? (
            <Check className="w-4 h-4 shrink-0 text-emerald-400" />
          ) : (
            <Info className="w-4 h-4 shrink-0 text-indigo-400" />
          )}
          <span className="flex-1">{message}</span>
          <button
            onClick={() => setMessage(null)}
            className="p-1 hover:opacity-70 text-slate-400"
            title="Đóng thông báo"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* In-app Notification Preview Card */}
      {previewNotification && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-indigo-950/60 border border-indigo-500/40 shadow-xl space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between text-[11px] text-indigo-300 font-semibold uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Xem trước thông báo hiển thị trên thiết bị</span>
            </span>
            {previewNotification.time && (
              <span className="font-mono bg-indigo-500/20 px-2 py-0.5 rounded-md border border-indigo-500/30">
                Khung giờ: {previewNotification.time}
              </span>
            )}
          </div>
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 flex items-start gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/notification-icon-192.png"
              alt="TOEIC Logo"
              className="w-10 h-10 rounded-xl object-contain shadow-md shrink-0 border border-indigo-500/30"
            />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold text-white">{previewNotification.title}</div>
              <div className="text-xs text-slate-300 mt-0.5 leading-relaxed">{previewNotification.body}</div>
            </div>
            <button
              onClick={() => setPreviewNotification(null)}
              className="text-slate-500 hover:text-slate-300 p-1"
              title="Đóng xem trước"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Settings Sections */}
      <div className="space-y-5">
        {/* MULTI-TIME DAILY REMINDERS */}
        <div className="rounded-2xl bg-slate-800/40 border border-slate-800 p-4 sm:p-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-100">
                    Nhắc nhở học hàng ngày ở nhiều thời điểm
                  </span>
                  {prefs.dailyReminderEnabled && (
                    <span className="text-[11px] font-bold text-indigo-400 bg-indigo-500/15 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                      {activeTimes.length} khung giờ
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Gửi thông báo nhắc nhở vào các thời điểm bạn chọn trong ngày (sáng, trưa, tối...) để duy trì nhịp học đều đặn
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={prefs.dailyReminderEnabled}
                onChange={() => handleToggle('dailyReminderEnabled')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* Expanded multi-time slots configuration */}
          {prefs.dailyReminderEnabled && (
            <div className="pt-3 border-t border-slate-800/80 space-y-4 animate-in fade-in duration-200">
              {/* Active Slots Grid */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-medium text-slate-300">
                    Các khung giờ đang kích hoạt ({activeTimes.length}/{MAX_REMINDER_SLOTS}):
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Tự động lưu và đồng bộ
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {activeTimes.map((slot, index) => {
                    const meta = getTimePeriodMeta(slot);
                    return (
                      <div
                        key={`${slot}-${index}`}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-750 hover:border-slate-700 transition-all group"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-base select-none" role="img" aria-label={meta.label}>
                            {meta.icon}
                          </span>
                          <div>
                            <span className="text-[11px] font-medium text-slate-400 block leading-tight">
                              {meta.label}
                            </span>
                            <input
                              type="time"
                              value={slot}
                              onChange={(e) => handleUpdateTimeSlot(index, e.target.value)}
                              className="bg-transparent text-sm font-bold text-white font-mono focus:outline-none focus:text-indigo-400 cursor-pointer"
                              title="Nhấp để sửa thời gian"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleTestSlotNotification(slot)}
                            disabled={testing}
                            title="Nghe & xem thử thông báo cho giờ này"
                            className="p-1.5 text-slate-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded-lg transition-colors text-xs flex items-center gap-1"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveTimeSlot(slot)}
                            title="Xóa khung giờ này"
                            className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Presets & Add New Time */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Gợi ý các khung giờ học lý tưởng:</span>
                  <span className="text-[11px] text-slate-400 font-normal">
                    Nhấp để thêm nhanh
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {REMINDER_PRESETS.map((preset) => {
                    const isAdded = activeTimes.includes(preset.time);
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleAddTimeSlot(preset.time)}
                        disabled={isAdded || activeTimes.length >= MAX_REMINDER_SLOTS}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                          isAdded
                            ? 'bg-slate-800/80 text-slate-500 border border-slate-700/50 cursor-default'
                            : 'bg-slate-800 text-slate-200 border border-slate-700 hover:bg-indigo-600/20 hover:border-indigo-500 hover:text-white'
                        }`}
                        title={preset.description}
                      >
                        <span>{preset.icon}</span>
                        <span className="font-semibold">{preset.label}</span>
                        <span className="font-mono text-[11px] text-indigo-400">({preset.time})</span>
                        {isAdded && <Check className="w-3 h-3 text-emerald-400 ml-0.5" />}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Time Selector */}
                <div className="pt-2 border-t border-slate-800/60 flex flex-wrap items-center gap-2.5">
                  <span className="text-xs text-slate-400">Hoặc chọn giờ tùy chỉnh:</span>
                  <input
                    type="time"
                    value={customTime}
                    onChange={(e) => setCustomTime(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddTimeSlot(customTime)}
                    disabled={activeTimes.length >= MAX_REMINDER_SLOTS}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-xs font-medium transition-colors shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm khung giờ</span>
                  </button>
                </div>
              </div>

              {/* Status summary banner */}
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/40 px-3 py-2 rounded-xl border border-slate-800/50">
                <Bell className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>
                  Hệ thống sẽ nhắc nhở vào: <strong className="text-indigo-300">{activeTimes.join(', ')}</strong> mỗi ngày (theo múi giờ thiết bị).
                </span>
              </div>
            </div>
          )}
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
              onChange={(e) => handleStreakTimeChange(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
            />
            <input
              type="checkbox"
              checked={prefs.streakWarningEnabled}
              onChange={() => handleToggle('streakWarningEnabled')}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900 cursor-pointer"
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
            className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900 cursor-pointer"
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
            className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900 cursor-pointer"
          />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-xs text-slate-500">
          {permission === 'granted'
            ? 'Web Push đã sẵn sàng nhận thông báo trên trình duyệt này'
            : permission === 'denied'
            ? 'Quyền thông báo đang bị chặn trong trình duyệt của bạn'
            : 'Hãy cấp quyền thông báo để nhận lời nhắc đúng giờ'}
        </span>

        <button
          onClick={handleSendTestNotification}
          disabled={testing}
          className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold shadow-md transition-all shrink-0 cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>{testing ? 'Đang gửi thông báo...' : 'Gửi thông báo thử nghiệm'}</span>
        </button>
      </div>
    </div>
  );
}
