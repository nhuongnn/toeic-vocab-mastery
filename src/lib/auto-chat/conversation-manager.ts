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

/** Lọc conversations của chat-room được tạo hôm nay, ưu tiên conversation đã cache hoặc isAutoBubble */
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

  const autoBubbleConv = todayConvs.find((c) => c.isAutoBubble);
  const fallbackConv = autoBubbleConv || todayConvs[0] || null;
  if (fallbackConv) {
    try {
      localStorage.setItem(TODAY_CONV_KEY, fallbackConv.id);
    } catch {}
  }

  return fallbackConv;
}

/** Chọn character dựa trên settings */
export function pickCharacter(settings: AutoChatSettings): CharacterConfig {
  if (
    settings.characterRole !== 'random' &&
    DEFAULT_CHARACTERS[settings.characterRole as CharacterRole]
  ) {
    return DEFAULT_CHARACTERS[settings.characterRole as CharacterRole];
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
    if (found) return found;
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
 * - Nếu đã có conversation hôm nay → trả về conversation đó
 * - Nếu chưa có → tạo mới với character/scenario theo settings
 */
export function getOrCreateTodayConversation(
  settings: AutoChatSettings,
  userAvatar: string,
  userName: string
): RoleplayConversation {
  const existing = getTodayAutoBubbleConversation();
  if (existing) return existing;

  const character = pickCharacter(settings);
  const scenario = pickScenario(settings, character.role);
  return createTodayAutoBubbleConversation(character, scenario, userAvatar, userName);
}
