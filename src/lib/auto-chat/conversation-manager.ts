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

/** Kiểm tra conversation hiện tại có khớp với cài đặt characterRole / scenarioId hay không */
export function doesConversationMatchSettings(
  conv: RoleplayConversation,
  settings: AutoChatSettings
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

/** Lọc conversations của chat-room được tạo hôm nay, chỉ lấy conversation của auto-bubble */
export function getTodayAutoBubbleConversation(): RoleplayConversation | null {
  if (typeof window === 'undefined') return null;
  const todayConvs = getTodayConversations().filter((c) => c.isAutoBubble);

  try {
    const cachedId = localStorage.getItem(TODAY_CONV_KEY);
    if (cachedId) {
      const cached = todayConvs.find((c) => c.id === cachedId);
      if (cached) return cached;
      // Stale ID from previous day, deleted conversation, or non-bubble conversation
      localStorage.removeItem(TODAY_CONV_KEY);
    }
  } catch {}

  const autoBubbleConv = todayConvs[0] || null;
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
