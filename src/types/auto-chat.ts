import { CharacterRole } from './roleplay';

export interface AutoChatSettings {
  enabled: boolean;
  pushEnabled: boolean;
  startTime: string; // "HH:mm" (e.g. "08:00")
  endTime: string; // "HH:mm" (e.g. "22:00")
  intervalMinutes: number; // >= 10 (10 | 15 | 20 | 30 | 45 | 60 | 120)
  characterRole: CharacterRole | 'random';
  scenarioId: string | 'random';
  timezone: string;
  lastSentAt?: string | null;
}

export const DEFAULT_AUTO_CHAT_SETTINGS: AutoChatSettings = {
  enabled: false,
  pushEnabled: true,
  startTime: '08:00',
  endTime: '22:00',
  intervalMinutes: 30,
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
