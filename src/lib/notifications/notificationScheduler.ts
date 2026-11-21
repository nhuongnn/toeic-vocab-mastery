import { showLocalNotification } from './pushManager';
import { getDailyReminderContent, getNotificationContent } from './notificationTemplates';

export interface NotificationPreferences {
  dailyReminderEnabled: boolean;
  dailyReminderTime?: string; // Legacy single-time backward compatibility
  dailyReminderTimes: string[]; // Multi-time slots e.g. ["08:00", "12:30", "20:00"]
  streakWarningEnabled: boolean;
  streakWarningTime: string; // e.g. "20:00"
  weeklySummaryEnabled: boolean;
  srsDueReminderEnabled: boolean;
  milestoneEnabled: boolean;
  timezone: string;
}

export interface ReminderPreset {
  id: string;
  time: string;
  label: string;
  icon: string;
  period: 'morning' | 'noon' | 'afternoon' | 'evening' | 'night';
  description: string;
}

export const REMINDER_PRESETS: ReminderPreset[] = [
  {
    id: 'morning',
    time: '08:00',
    label: 'Buổi sáng',
    icon: '☀️',
    period: 'morning',
    description: 'Khởi đầu ngày mới với 5-10 từ vựng',
  },
  {
    id: 'noon',
    time: '12:30',
    label: 'Nghỉ trưa',
    icon: '🥪',
    period: 'noon',
    description: 'Ôn nhẹ 5 thẻ từ giữa giờ nghỉ trưa',
  },
  {
    id: 'afternoon',
    time: '17:30',
    label: 'Tan làm / Chiều',
    icon: '☕',
    period: 'afternoon',
    description: 'Tranh thủ luyện phản xạ trên đường về',
  },
  {
    id: 'evening',
    time: '20:00',
    label: 'Buổi tối',
    icon: '🌙',
    period: 'evening',
    description: 'Thời gian vàng củng cố và làm Quiz ngắn',
  },
  {
    id: 'night',
    time: '22:00',
    label: 'Trước khi ngủ',
    icon: '🛌',
    period: 'night',
    description: 'Ôn tập nhẹ giúp khắc sâu trí nhớ dài hạn',
  },
];

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  dailyReminderEnabled: true,
  dailyReminderTime: '08:00',
  dailyReminderTimes: ['08:00', '12:30', '20:00'],
  streakWarningEnabled: true,
  streakWarningTime: '20:00',
  weeklySummaryEnabled: true,
  srsDueReminderEnabled: true,
  milestoneEnabled: true,
  timezone: 'Asia/Ho_Chi_Minh',
};

const STORAGE_KEY = 'toeic_notification_preferences';
const DISPATCH_LOG_KEY = 'toeic_reminders_dispatched_v1';

export function getTimePeriodMeta(time: string): { label: string; icon: string } {
  if (!time) return { label: 'Lời nhắc', icon: '⏰' };
  const hour = parseInt(time.split(':')[0], 10);
  if (isNaN(hour)) return { label: 'Lời nhắc', icon: '⏰' };

  if (hour >= 5 && hour < 11) {
    return { label: 'Buổi sáng', icon: '☀️' };
  } else if (hour >= 11 && hour < 14) {
    return { label: 'Nghỉ trưa', icon: '🥪' };
  } else if (hour >= 14 && hour < 18) {
    return { label: 'Buổi chiều', icon: '☕' };
  } else if (hour >= 18 && hour < 22) {
    return { label: 'Buổi tối', icon: '🌙' };
  } else {
    return { label: 'Đêm muộn', icon: '🛌' };
  }
}

export function sortReminderTimes(times: string[]): string[] {
  const unique = Array.from(new Set(times.filter(Boolean)));
  return unique.sort((a, b) => {
    const [hA, mA] = a.split(':').map((v) => parseInt(v, 10) || 0);
    const [hB, mB] = b.split(':').map((v) => parseInt(v, 10) || 0);
    if (hA !== hB) return hA - hB;
    return mA - mB;
  });
}

export function loadNotificationPreferences(): NotificationPreferences {
  if (typeof window === 'undefined') return DEFAULT_NOTIFICATION_PREFERENCES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_NOTIFICATION_PREFERENCES;

    const parsed = JSON.parse(raw);
    const result: NotificationPreferences = {
      ...DEFAULT_NOTIFICATION_PREFERENCES,
      ...parsed,
    };

    // Backward compatibility & array normalization
    let times = Array.isArray(parsed.dailyReminderTimes) && parsed.dailyReminderTimes.length > 0
      ? parsed.dailyReminderTimes
      : null;

    if (!times && typeof parsed.dailyReminderTime === 'string' && parsed.dailyReminderTime.trim()) {
      times = [parsed.dailyReminderTime.trim()];
    }

    if (!times || times.length === 0) {
      times = [...DEFAULT_NOTIFICATION_PREFERENCES.dailyReminderTimes];
    }

    result.dailyReminderTimes = sortReminderTimes(times);
    result.dailyReminderTime = result.dailyReminderTimes[0] || '08:00';

    return result;
  } catch {
    return DEFAULT_NOTIFICATION_PREFERENCES;
  }
}

export function saveNotificationPreferences(prefs: NotificationPreferences): void {
  if (typeof window === 'undefined') return;
  try {
    const sortedTimes = sortReminderTimes(
      Array.isArray(prefs.dailyReminderTimes) && prefs.dailyReminderTimes.length > 0
        ? prefs.dailyReminderTimes
        : [prefs.dailyReminderTime || '08:00']
    );

    const payload: NotificationPreferences = {
      ...prefs,
      dailyReminderTimes: sortedTimes,
      dailyReminderTime: sortedTimes[0] || '08:00',
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));

    // Notify listeners across app
    window.dispatchEvent(
      new CustomEvent('toeic_notification_preferences_changed', { detail: payload })
    );
  } catch (err) {
    console.error('Failed to save notification preferences:', err);
  }
}

interface DispatchLog {
  date: string; // YYYY-MM-DD
  dispatchedTimes: string[];
  streakWarningSent?: boolean;
}

function getTodayString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function loadDispatchLog(): DispatchLog {
  const today = getTodayString();
  try {
    const raw = localStorage.getItem(DISPATCH_LOG_KEY);
    if (raw) {
      const parsed: DispatchLog = JSON.parse(raw);
      if (parsed.date === today) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  return { date: today, dispatchedTimes: [] };
}

function saveDispatchLog(log: DispatchLog): void {
  try {
    localStorage.setItem(DISPATCH_LOG_KEY, JSON.stringify(log));
  } catch {
    // ignore
  }
}

export async function checkAndTriggerScheduledReminders(): Promise<void> {
  if (typeof window === 'undefined') return;

  const prefs = loadNotificationPreferences();
  if (!prefs.dailyReminderEnabled && !prefs.streakWarningEnabled) return;

  const now = new Date();
  const currHour = now.getHours();
  const currMin = now.getMinutes();
  const currentTotalMinutes = currHour * 60 + currMin;

  const log = loadDispatchLog();
  let logChanged = false;

  // 1. Check Multi-Time Daily Reminders
  if (prefs.dailyReminderEnabled && Array.isArray(prefs.dailyReminderTimes)) {
    for (const timeStr of prefs.dailyReminderTimes) {
      if (log.dispatchedTimes.includes(timeStr)) continue;

      const [hStr, mStr] = timeStr.split(':');
      const targetHour = parseInt(hStr, 10);
      const targetMin = parseInt(mStr, 10);
      if (isNaN(targetHour) || isNaN(targetMin)) continue;

      const targetTotalMinutes = targetHour * 60 + targetMin;
      const diff = currentTotalMinutes - targetTotalMinutes;

      // Trigger if current time is within [target, target + 15 minutes]
      if (diff >= 0 && diff <= 15) {
        const payload = getDailyReminderContent(timeStr);
        const success = await showLocalNotification(payload);
        if (success) {
          log.dispatchedTimes.push(timeStr);
          logChanged = true;
        }
      }
    }
  }

  // 2. Check Streak Warning
  if (prefs.streakWarningEnabled && !log.streakWarningSent && prefs.streakWarningTime) {
    const [sHour, sMin] = prefs.streakWarningTime.split(':').map((v) => parseInt(v, 10));
    if (!isNaN(sHour) && !isNaN(sMin)) {
      const streakTargetMinutes = sHour * 60 + sMin;
      const diff = currentTotalMinutes - streakTargetMinutes;

      if (diff >= 0 && diff <= 30) {
        // Check if user has already studied today
        let studiedToday = false;
        try {
          const rawProgress = localStorage.getItem('toeic_vocab_mastery_v1');
          if (rawProgress) {
            const p = JSON.parse(rawProgress);
            const lastStudyDate = p?.stats?.lastStudyDate;
            if (lastStudyDate === getTodayString()) {
              studiedToday = true;
            }
          }
        } catch {
          // ignore
        }

        if (!studiedToday) {
          const payload = getNotificationContent('streak_warning');
          const success = await showLocalNotification(payload);
          if (success) {
            log.streakWarningSent = true;
            logChanged = true;
          }
        }
      }
    }
  }

  if (logChanged) {
    saveDispatchLog(log);
  }
}

/**
 * Initializes the background scheduler that periodically checks whether
 * any reminder slot should be delivered to the user.
 */
export function initClientNotificationScheduler(): () => void {
  if (typeof window === 'undefined') return () => {};

  // Run initial check
  checkAndTriggerScheduledReminders();

  // Run periodically every 45 seconds
  const intervalId = window.setInterval(() => {
    checkAndTriggerScheduledReminders();
  }, 45000);

  // Also check whenever tab becomes visible / focused
  const onVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      checkAndTriggerScheduledReminders();
    }
  };

  document.addEventListener('visibilitychange', onVisibilityChange);
  window.addEventListener('focus', onVisibilityChange);

  return () => {
    window.clearInterval(intervalId);
    document.removeEventListener('visibilitychange', onVisibilityChange);
    window.removeEventListener('focus', onVisibilityChange);
  };
}
