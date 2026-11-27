import {
  getChatRoomHistory,
  saveChatRoomConversation,
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

/** Tạo ID cố định theo ngày cho cuộc hội thoại tự động của bong bóng chat (tối đa 1 cuộc/ngày) */
export function getDailyAutoConversationId(dateKey: string): string {
  return `auto_${dateKey}`;
}

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

/**
 * Lấy timestamp tương tác gần nhất của người dùng trong cuộc hội thoại.
 * Chỉ tính các tin nhắn do người dùng gửi (không tính tin nhắn AI tự động gửi).
 */
export function getLastUserInteractionAt(
  conv: RoleplayConversation | null | undefined
): number {
  if (!conv) return 0;
  let latest =
    typeof conv.lastUserInteractionAt === 'number' && conv.lastUserInteractionAt > 0
      ? conv.lastUserInteractionAt
      : 0;

  if (Array.isArray(conv.messages)) {
    for (const msg of conv.messages) {
      if (msg && msg.role === 'user' && !msg.isError) {
        const ts =
          typeof msg.timestamp === 'number' && msg.timestamp > 0
            ? msg.timestamp
            : conv.updatedAt || conv.createdAt || 0;
        if (ts > latest) {
          latest = ts;
        }
      }
    }
  }
  return latest;
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
 * Tìm cuộc hội thoại mục tiêu cho bong bóng chat / thông báo tự động trong ngày:
 * 1. Nếu người dùng đã tương tác (gửi tin nhắn) với một hoặc nhiều cuộc hội thoại trong hôm nay
 *    (kể cả hội thoại tạo từ trước đó) → chọn cuộc hội thoại người dùng tương tác gần nhất.
 * 2. Nếu hôm nay người dùng chưa tương tác cuộc hội thoại nào → tìm cuộc hội thoại tự động
 *    đã được tạo trong hôm nay (id `auto_YYYY-MM-DD` hoặc `isAutoBubble` tạo hôm nay).
 * 3. Fallback: cuộc hội thoại khác đã được tạo hôm nay (nếu có) để không tạo thêm cuộc hội thoại mới.
 */
export function findTodayAutoChatConversation(
  chatHistory: RoleplayConversation[],
  _settings?: Pick<AutoChatSettings, 'characterRole' | 'scenarioId'>,
  now: Date = new Date(),
  timezone?: string
): RoleplayConversation | null {
  if (!Array.isArray(chatHistory) || chatHistory.length === 0) return null;
  const todayKey = getDateKeyInTimezone(now.getTime(), timezone);

  let mostRecentUserConv: RoleplayConversation | null = null;
  let mostRecentUserTs = 0;

  for (const conv of chatHistory) {
    if (!conv?.id) continue;
    const lastUserTs = getLastUserInteractionAt(conv);
    if (lastUserTs > 0 && getDateKeyInTimezone(lastUserTs, timezone) === todayKey) {
      if (
        lastUserTs > mostRecentUserTs ||
        (lastUserTs === mostRecentUserTs &&
          (conv.updatedAt || 0) > (mostRecentUserConv?.updatedAt || 0))
      ) {
        mostRecentUserTs = lastUserTs;
        mostRecentUserConv = conv;
      }
    }
  }

  if (mostRecentUserConv) {
    return mostRecentUserConv;
  }

  const dailyAutoId = getDailyAutoConversationId(todayKey);
  const todayAutoConvs = chatHistory.filter(
    (c) =>
      Boolean(c?.id) &&
      (c.id === dailyAutoId ||
        (Boolean(c.isAutoBubble) &&
          typeof c.createdAt === 'number' &&
          getDateKeyInTimezone(c.createdAt, timezone) === todayKey))
  );
  if (todayAutoConvs.length > 0) {
    return [...todayAutoConvs].sort(
      (a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)
    )[0];
  }

  const anyTodayConvs = chatHistory.filter(
    (c) =>
      Boolean(c?.id) &&
      typeof c.createdAt === 'number' &&
      getDateKeyInTimezone(c.createdAt, timezone) === todayKey
  );
  if (anyTodayConvs.length > 0) {
    return [...anyTodayConvs].sort(
      (a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)
    )[0];
  }

  return null;
}

/** Lấy cuộc hội thoại mục tiêu hôm nay từ lịch sử localStorage */
export function getTodayAutoBubbleConversation(
  timezone?: string
): RoleplayConversation | null {
  if (typeof window === 'undefined') return null;
  const history = getChatRoomHistory();
  const activeConv = findTodayAutoChatConversation(
    history,
    undefined,
    new Date(),
    timezone
  );

  try {
    if (activeConv) {
      localStorage.setItem(TODAY_CONV_KEY, activeConv.id);
    } else {
      localStorage.removeItem(TODAY_CONV_KEY);
    }
  } catch {}

  return activeConv;
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

/** Khởi tạo object conversation mới cho ngày (dùng chung cho cả client và server cron) */
export function buildDailyAutoConversation(
  character: CharacterConfig,
  scenario: RoleplayScenario,
  userAvatar: string,
  userName: string,
  now: Date = new Date(),
  timezone?: string
): RoleplayConversation {
  const nowMs = now.getTime();
  const todayKey = getDateKeyInTimezone(nowMs, timezone);
  const id = getDailyAutoConversationId(todayKey);

  return {
    id,
    title: `🫧 ${scenario.vietnameseTitle || scenario.title} - ${character.name}`,
    character,
    scenario,
    userAvatar,
    userName,
    messages: [],
    translations: {},
    createdAt: nowMs,
    updatedAt: nowMs,
    messageCount: 0,
    lastMessageSnippet: '',
    isAutoBubble: true,
  };
}

/** Tạo conversation mới cho auto-chat hôm nay (tối đa 1 cuộc/ngày) */
export function createTodayAutoBubbleConversation(
  character: CharacterConfig,
  scenario: RoleplayScenario,
  userAvatar: string,
  userName: string,
  timezone?: string
): RoleplayConversation {
  const conv = buildDailyAutoConversation(
    character,
    scenario,
    userAvatar,
    userName,
    new Date(),
    timezone
  );

  const existing = getChatRoomHistory().find((c) => c.id === conv.id);
  if (existing) {
    try {
      localStorage.setItem(TODAY_CONV_KEY, existing.id);
    } catch {}
    return existing;
  }

  saveChatRoomConversation(conv);
  try {
    localStorage.setItem(TODAY_CONV_KEY, conv.id);
  } catch {}
  return conv;
}

/**
 * Lấy hoặc tạo conversation hôm nay cho auto-chat bubble.
 * - Nếu đã có cuộc hội thoại người dùng tương tác hôm nay hoặc hội thoại tự động của hôm nay → trả về ngay
 * - Chỉ tạo tối đa 1 cuộc hội thoại mới trong ngày khi chưa có cuộc hội thoại nào phù hợp
 */
export function getOrCreateTodayConversation(
  settings: AutoChatSettings,
  userAvatar: string,
  userName: string
): RoleplayConversation {
  const existing = getTodayAutoBubbleConversation(settings.timezone);
  if (existing) {
    return existing;
  }

  const character = pickCharacter(settings);
  const scenario = pickScenario(settings, character.role);
  return createTodayAutoBubbleConversation(
    character,
    scenario,
    userAvatar,
    userName,
    settings.timezone
  );
}
