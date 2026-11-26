import {
  getTodayConversations,
  saveChatRoomConversation,
  generateConversationId,
} from '@/lib/roleplay/history';
import { DEFAULT_CHARACTERS, PRESET_SCENARIOS } from '@/lib/roleplay/scenarios';
import {
  CharacterRole,
  RoleplayConversation,
  CharacterConfig,
  RoleplayScenario,
} from '@/types/roleplay';
import { AutoChatSettings } from '@/types/auto-chat';

export const TODAY_CONV_KEY = 'toeic_auto_chat_today_conv_id';

/** Xóa cache conversation hôm nay (khi sang ngày mới hoặc reset) */
export function clearTodayAutoBubbleConversationId(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(TODAY_CONV_KEY);
  } catch {}
}

/** Lấy chuỗi ngày YYYY-MM-DD theo timezone để so sánh cùng ngày chính xác */
export function getDateKeyInTimezone(
  timestampMs: number,
  timezone?: string
): string {
  const date = new Date(timestampMs);
  if (timezone) {
    try {
      return new Intl.DateTimeFormat('en-CA', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(date);
    } catch {}
  }
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Kiểm tra conversation hiện tại có khớp với cài đặt characterRole / scenarioId hay không */
export function doesConversationMatchSettings(
  conv: RoleplayConversation,
  settings: Pick<AutoChatSettings, 'characterRole' | 'scenarioId'>
): boolean {
  if (
    settings.characterRole !== 'random' &&
    conv.character?.role !== settings.characterRole
  ) {
    return false;
  }
  if (
    settings.scenarioId !== 'random' &&
    conv.scenario?.id !== settings.scenarioId
  ) {
    return false;
  }
  if (
    settings.scenarioId === 'random' &&
    settings.characterRole !== 'random' &&
    conv.scenario?.role !== settings.characterRole
  ) {
    return false;
  }
  return true;
}

/**
 * Tìm cuộc hội thoại đã tạo trong ngày từ danh sách chatHistory (dùng chung cho cả client và cron server).
 * Ưu tiên conversation có isAutoBubble, nếu chưa có thì lấy conversation mới nhất tạo trong ngày.
 */
export function findTodayAutoChatConversation(
  chatHistory: RoleplayConversation[],
  settings: Pick<AutoChatSettings, 'characterRole' | 'scenarioId'>,
  now: Date = new Date(),
  timezone?: string
): RoleplayConversation | null {
  if (!Array.isArray(chatHistory) || chatHistory.length === 0) return null;
  const todayKey = getDateKeyInTimezone(now.getTime(), timezone);
  const todayConvs = chatHistory.filter(
    (c) =>
      Boolean(c?.id) &&
      typeof c.createdAt === 'number' &&
      getDateKeyInTimezone(c.createdAt, timezone) === todayKey
  );
  if (todayConvs.length === 0) return null;

  const autoBubbleMatch = todayConvs.find(
    (c) => c.isAutoBubble && doesConversationMatchSettings(c, settings)
  );
  if (autoBubbleMatch) return autoBubbleMatch;

  const anyTodayMatch = todayConvs.find((c) =>
    doesConversationMatchSettings(c, settings)
  );
  return anyTodayMatch || null;
}

/** Lọc conversations của chat-room được tạo hôm nay, ưu tiên isAutoBubble hoặc hội thoại đã tạo hôm nay */
export function getTodayAutoBubbleConversation(): RoleplayConversation | null {
  if (typeof window === 'undefined') return null;
  const todayConvs = getTodayConversations();

  try {
    const cachedId = localStorage.getItem(TODAY_CONV_KEY);
    if (cachedId) {
      const cached = todayConvs.find((c) => c.id === cachedId);
      if (cached) return cached;
      // Stale ID from previous day or deleted conversation
      localStorage.removeItem(TODAY_CONV_KEY);
    }
  } catch {}

  const autoBubbleConv = todayConvs.find((c) => c.isAutoBubble) || todayConvs[0] || null;
  if (autoBubbleConv) {
    try {
      localStorage.setItem(TODAY_CONV_KEY, autoBubbleConv.id);
    } catch {}
  }

  return autoBubbleConv;
}

/** Chọn character dựa trên settings (đồng bộ với scenarioId nếu scenario được chỉ định) */
export function pickCharacter(settings: AutoChatSettings): CharacterConfig {
  if (
    settings.characterRole !== 'random' &&
    DEFAULT_CHARACTERS[settings.characterRole as CharacterRole]
  ) {
    return DEFAULT_CHARACTERS[settings.characterRole as CharacterRole];
  }
  if (settings.scenarioId !== 'random') {
    const matchedScenario = PRESET_SCENARIOS.find(
      (s) => s.id === settings.scenarioId
    );
    if (matchedScenario && DEFAULT_CHARACTERS[matchedScenario.role]) {
      return DEFAULT_CHARACTERS[matchedScenario.role];
    }
  }
  const roles = Object.keys(DEFAULT_CHARACTERS) as CharacterRole[];
  const randomRole = roles[Math.floor(Math.random() * roles.length)];
  return DEFAULT_CHARACTERS[randomRole];
}

/** Chọn scenario dựa trên settings và character role */
export function pickScenario(
  settings: AutoChatSettings,
  characterRole: CharacterRole
): RoleplayScenario {
  if (settings.scenarioId !== 'random') {
    const found = PRESET_SCENARIOS.find((s) => s.id === settings.scenarioId);
    if (
      found &&
      (settings.characterRole === 'random' || found.role === characterRole)
    ) {
      return found;
    }
  }
  const matching = PRESET_SCENARIOS.filter((s) => s.role === characterRole);
  if (matching.length > 0) {
    return matching[Math.floor(Math.random() * matching.length)];
  }
  return PRESET_SCENARIOS[Math.floor(Math.random() * PRESET_SCENARIOS.length)];
}

/** Tạo conversation mới cho auto-chat hôm nay */
export function createTodayAutoBubbleConversation(
  character: CharacterConfig,
  scenario: RoleplayScenario,
  userAvatar: string,
  userName: string
): RoleplayConversation {
  const id = generateConversationId();
  const now = Date.now();

  const conv: RoleplayConversation = {
    id,
    title: `🫧 ${scenario.vietnameseTitle || scenario.title} - ${character.name}`,
    character,
    scenario,
    userAvatar,
    userName,
    messages: [],
    translations: {},
    createdAt: now,
    updatedAt: now,
    messageCount: 0,
    lastMessageSnippet: '',
    isAutoBubble: true,
  };

  saveChatRoomConversation(conv);
  try {
    localStorage.setItem(TODAY_CONV_KEY, id);
  } catch {}
  return conv;
}

/**
 * Lấy hoặc tạo conversation hôm nay cho auto-chat bubble.
 * - Nếu đã có conversation hôm nay VÀ khớp settings → trả về conversation đó
 * - Nếu chưa có hoặc không khớp settings → tạo mới với character/scenario theo settings
 */
export function getOrCreateTodayConversation(
  settings: AutoChatSettings,
  userAvatar: string,
  userName: string
): RoleplayConversation {
  const existing = getTodayAutoBubbleConversation();
  if (existing && doesConversationMatchSettings(existing, settings)) {
    return existing;
  }

  const character = pickCharacter(settings);
  const scenario = pickScenario(settings, character.role);
  return createTodayAutoBubbleConversation(character, scenario, userAvatar, userName);
}
