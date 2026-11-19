export interface NotificationPreferences {
  dailyReminderEnabled: boolean;
  dailyReminderTime: string; // e.g. "08:00"
  streakWarningEnabled: boolean;
  streakWarningTime: string; // e.g. "20:00"
  weeklySummaryEnabled: boolean;
  srsDueReminderEnabled: boolean;
  milestoneEnabled: boolean;
  timezone: string;
}

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  dailyReminderEnabled: true,
  dailyReminderTime: '08:00',
  streakWarningEnabled: true,
  streakWarningTime: '20:00',
  weeklySummaryEnabled: true,
  srsDueReminderEnabled: true,
  milestoneEnabled: true,
  timezone: 'Asia/Ho_Chi_Minh',
};

const STORAGE_KEY = 'toeic_notification_preferences';

export function loadNotificationPreferences(): NotificationPreferences {
  if (typeof window === 'undefined') return DEFAULT_NOTIFICATION_PREFERENCES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_NOTIFICATION_PREFERENCES;
    return { ...DEFAULT_NOTIFICATION_PREFERENCES, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_NOTIFICATION_PREFERENCES;
  }
}

export function saveNotificationPreferences(prefs: NotificationPreferences): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch (err) {
    console.error('Failed to save notification preferences:', err);
  }
}
