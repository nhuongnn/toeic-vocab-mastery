import { CharacterRole } from './roleplay';

export const MIN_INTERVAL_MINUTES = 10;
export const MAX_INTERVAL_MINUTES = 1440;
export const DEFAULT_INTERVAL_MINUTES = 30;

export interface AutoChatSettings {
  enabled: boolean;
  pushEnabled: boolean;
  startTime: string; // "HH:mm" (e.g. "08:00")
  endTime: string; // "HH:mm" (e.g. "22:00")
  intervalMinutes: number; // >= 10 && <= 1440 (presets or custom integer minutes)
  characterRole: CharacterRole | 'random';
  scenarioId: string | 'random';
  timezone: string;
  lastSentAt?: string | null;
}

/**
 * Normalize an untrusted interval value to an integer within [MIN_INTERVAL_MINUTES, MAX_INTERVAL_MINUTES].
 */
export function normalizeIntervalMinutes(
  value: unknown,
  fallback: number = DEFAULT_INTERVAL_MINUTES
): number {
  const num = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(num)) return fallback;
  const rounded = Math.round(num);
  if (rounded < MIN_INTERVAL_MINUTES) return fallback;
  return Math.min(MAX_INTERVAL_MINUTES, rounded);
}

/**
 * Validate raw user text input for custom message interval in minutes.
 */
export function parseCustomIntervalMinutes(raw: string): {
  valid: boolean;
  value?: number;
  error?: string;
} {
  const trimmed = raw.trim();
  if (!trimmed) {
    return {
      valid: false,
      error: `Vui lòng nhập số phút (từ ${MIN_INTERVAL_MINUTES} đến ${MAX_INTERVAL_MINUTES} phút).`,
    };
  }
  if (!/^\d+$/.test(trimmed)) {
    return {
      valid: false,
      error: 'Vui lòng nhập số nguyên hợp lệ (ví dụ: 25, 90).',
    };
  }
  const parsed = Number.parseInt(trimmed, 10);
  if (!Number.isFinite(parsed) || parsed < MIN_INTERVAL_MINUTES) {
    return {
      valid: false,
      error: `Khoảng thời gian tối thiểu là ${MIN_INTERVAL_MINUTES} phút.`,
    };
  }
  if (parsed > MAX_INTERVAL_MINUTES) {
    return {
      valid: false,
      error: `Khoảng thời gian tối đa là ${MAX_INTERVAL_MINUTES} phút (24 giờ).`,
    };
  }
  return { valid: true, value: parsed };
}

/**
 * Format minute count into a concise Vietnamese duration label.
 */
export function formatIntervalDuration(minutes: number): string {
  const safe = normalizeIntervalMinutes(minutes);
  if (safe < 60) {
    return `${safe} phút`;
  }
  const hours = Math.floor(safe / 60);
  const mins = safe % 60;
  return mins > 0 ? `${hours} giờ ${mins} phút` : `${hours} giờ`;
}

export const DEFAULT_AUTO_CHAT_SETTINGS: AutoChatSettings = {
  enabled: false,
  pushEnabled: true,
  startTime: '08:00',
  endTime: '22:00',
  intervalMinutes: DEFAULT_INTERVAL_MINUTES,
  characterRole: 'random',
  scenarioId: 'random',
  timezone:
    typeof Intl !== 'undefined'
      ? Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Ho_Chi_Minh'
      : 'Asia/Ho_Chi_Minh',
};

export const INTERVAL_OPTIONS = [
  { value: 10, label: '10 phút' },
  { value: 15, label: '15 phút' },
  { value: 20, label: '20 phút' },
  { value: 30, label: '30 phút' },
  { value: 45, label: '45 phút' },
  { value: 60, label: '1 tiếng' },
  { value: 120, label: '2 tiếng' },
];

export const CHARACTER_ROLE_OPTIONS: Array<{
  id: CharacterRole | 'random';
  label: string;
  subtitle: string;
}> = [
  { id: 'random', label: 'Ngẫu nhiên', subtitle: 'Đa dạng nhân vật' },
  { id: 'friend', label: 'Bạn Bè', subtitle: 'Giải trí & Đời sống' },
  { id: 'family', label: 'Người Thân', subtitle: 'Tâm sự & Gia đình' },
  { id: 'lover', label: 'Người Yêu', subtitle: 'Hẹn hò & Động viên' },
  { id: 'colleague', label: 'Đồng Nghiệp', subtitle: 'Công sở ngang hàng' },
  { id: 'boss', label: 'Người Sếp', subtitle: 'Manager / Cấp trên' },
  { id: 'staff', label: 'Nhân Viên', subtitle: 'Hỗ trợ & Vận hành' },
  { id: 'interviewer', label: 'Phỏng Vấn IT', subtitle: 'Kỹ thuật & Agile' },
  { id: 'stranger', label: 'Người Bản Địa', subtitle: 'Du lịch & Chỉ đường' },
];

export interface AutoChatBubbleState {
  isOpen: boolean;
  unreadCount: number;
  currentConversationId: string | null;
  lastSentTimestamp: number | null;
  isSchedulerActive: boolean;
}
