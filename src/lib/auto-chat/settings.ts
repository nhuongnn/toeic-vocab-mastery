import { AutoChatSettings, DEFAULT_AUTO_CHAT_SETTINGS } from '@/types/auto-chat';

const STORAGE_KEY = 'toeic_auto_chat_settings';
export const AUTO_CHAT_SETTINGS_EVENT = 'auto-chat-settings-updated';

function sanitizeSettings(raw: Partial<AutoChatSettings>): AutoChatSettings {
  const merged = { ...DEFAULT_AUTO_CHAT_SETTINGS, ...raw };
  const interval = Number(merged.intervalMinutes);
  return {
    ...merged,
    enabled: Boolean(merged.enabled),
    intervalMinutes: Number.isFinite(interval) && interval >= 10 ? interval : 30,
  };
}

/** Đọc cài đặt từ localStorage (cache ưu tiên) */
export function getLocalAutoChatSettings(): AutoChatSettings {
  if (typeof window === 'undefined') return DEFAULT_AUTO_CHAT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return sanitizeSettings(JSON.parse(raw));
  } catch {}
  return DEFAULT_AUTO_CHAT_SETTINGS;
}

/** Lưu cài đặt vào localStorage và thông báo cho các component khác */
export function saveLocalAutoChatSettings(settings: AutoChatSettings): void {
  if (typeof window === 'undefined') return;
  try {
    const sanitized = sanitizeSettings(settings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
    window.dispatchEvent(
      new CustomEvent(AUTO_CHAT_SETTINGS_EVENT, { detail: sanitized })
    );
  } catch {}
}

/** Fetch cài đặt từ server (Supabase), merge vào local */
export async function fetchAutoChatSettings(
  userId: string,
  userEmail?: string
): Promise<AutoChatSettings> {
  try {
    const res = await fetch('/api/auto-chat/settings', {
      headers: {
        'x-user-id': userId,
        ...(userEmail ? { 'x-user-email': userEmail } : {}),
      },
    });
    if (res.ok) {
      const data = await res.json();
      const merged = sanitizeSettings(data);
      saveLocalAutoChatSettings(merged);
      return merged;
    }
  } catch {}
  return getLocalAutoChatSettings();
}

/** Cập nhật cài đặt lên server + local */
export async function updateAutoChatSettings(
  userId: string,
  userEmail: string | undefined,
  settings: Partial<AutoChatSettings>
): Promise<AutoChatSettings> {
  const current = getLocalAutoChatSettings();
  const updated = sanitizeSettings({ ...current, ...settings });
  saveLocalAutoChatSettings(updated);

  try {
    await fetch('/api/auto-chat/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': userId,
        ...(userEmail ? { 'x-user-email': userEmail } : {}),
      },
      body: JSON.stringify(updated),
    });
  } catch (err) {
    console.warn('Failed to sync auto-chat settings to server:', err);
  }

  return updated;
}
