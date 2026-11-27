import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';
import {
  AUTO_CHAT_HISTORY_WINDOW,
  buildAutoChatTurnPrompt,
} from '../roleplay/ai-prompt.ts';
import { generateFallbackRoleplayReply } from '../roleplay/router.ts';
import { DEFAULT_CHARACTERS, PRESET_SCENARIOS } from '../roleplay/scenarios.ts';
import {
  buildDailyAutoConversation,
  clearTodayAutoBubbleConversationId,
  doesConversationMatchSettings,
  findTodayAutoChatConversation,
  getDailyAutoConversationId,
  getDateKeyInTimezone,
  getLastUserInteractionAt,
  getOrCreateTodayConversation,
  getTodayAutoBubbleConversation,
  pickCharacter,
  pickScenario,
  TODAY_CONV_KEY,
} from '../auto-chat/conversation-manager.ts';
import { saveChatRoomConversation } from '../roleplay/history.ts';
import { DEFAULT_AUTO_CHAT_SETTINGS } from '../../types/auto-chat.ts';
import { formatMessageFullTime, formatMessageTime } from '../utils.ts';

class MockLocalStorage {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return Object.prototype.hasOwnProperty.call(this.store, key)
      ? this.store[key]
      : null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

const mockStorage = new MockLocalStorage();
globalThis.localStorage = mockStorage;
globalThis.window = {
  dispatchEvent: () => true,
};
globalThis.CustomEvent = class CustomEvent {
  constructor(type, init) {
    this.type = type;
    this.detail = init?.detail;
  }
};

describe('Auto-Chat Prompt & Conversation Context', () => {
  const bossChar = DEFAULT_CHARACTERS.boss;
  const bossScenario = PRESET_SCENARIOS.find((s) => s.role === 'boss');
  const friendScenario = PRESET_SCENARIOS.find((s) => s.role === 'friend');

  beforeEach(() => {
    mockStorage.clear();
  });

  it('builds opening directive anchored to character and scenario when history is empty', () => {
    const prompt = buildAutoChatTurnPrompt(bossChar, bossScenario, [], 'Minh');
    assert.ok(prompt.includes(bossChar.name));
    assert.ok(prompt.includes(bossChar.department));
    assert.ok(prompt.includes(bossScenario.objective));
    assert.ok(prompt.includes('Minh'));
    assert.ok(prompt.includes('OPENING message'));
  });

  it('explicitly forbids answering own unanswered question when learner has not replied', () => {
    const prompt = buildAutoChatTurnPrompt(
      bossChar,
      bossScenario,
      [
        {
          role: 'assistant',
          content: 'Have you finished the quarterly marketing analysis report yet?',
        },
      ],
      'Minh'
    );

    assert.ok(prompt.includes('PROACTIVE FOLLOW-UP DIRECTIVE'));
    assert.ok(prompt.includes(`${bossChar.name} (YOU): "Have you finished the quarterly marketing analysis report yet?"`));
    assert.ok(prompt.includes('has NOT replied to your previous message(s) yet'));
    assert.ok(prompt.includes('DO NOT answer your own previous question(s)'));
    assert.ok(prompt.includes('DO NOT pretend Minh replied'));
  });

  it('filters out error messages, caps history window, and handles learner replies', () => {
    const longHistory = [];
    for (let i = 1; i <= 20; i++) {
      longHistory.push({
        role: i % 2 === 1 ? 'assistant' : 'user',
        content: `Turn ${i}`,
      });
    }
    longHistory.push({
      role: 'assistant',
      content: 'Network failed',
      isError: true,
    });

    const prompt = buildAutoChatTurnPrompt(bossChar, bossScenario, longHistory, 'Minh');
    assert.ok(prompt.includes('PROACTIVE CONTINUATION DIRECTIVE'));
    assert.ok(!prompt.includes('Network failed'));
    assert.ok(!prompt.includes('"Turn 1"'));
    assert.ok(prompt.includes(`"Turn ${20}"`));
    assert.ok(prompt.includes(`"Turn ${20 - AUTO_CHAT_HISTORY_WINDOW + 1}"`));
  });

  it('uses proactive fallback reply without thanking user when isAutoProactive is true', () => {
    const reply = generateFallbackRoleplayReply(
      bossChar,
      bossScenario,
      [{ role: 'user', content: '[PROACTIVE FOLLOW-UP DIRECTIVE]' }],
      true
    );
    assert.ok(!reply.includes('Thank you for following up'));
    assert.ok(reply.toLowerCase().includes('checking in'));
  });

  it('reuses existing conversation created today (including chat-room) and ignores previous days', () => {
    const now = Date.now();
    const yesterday = now - 24 * 60 * 60 * 1000;

    saveChatRoomConversation({
      id: 'conv_yesterday',
      title: 'Yesterday Bubble',
      character: DEFAULT_CHARACTERS.boss,
      scenario: bossScenario,
      messages: [],
      createdAt: yesterday,
      updatedAt: yesterday,
      messageCount: 0,
      isAutoBubble: true,
    });

    assert.strictEqual(getTodayAutoBubbleConversation(), null);

    saveChatRoomConversation({
      id: 'conv_today_chatroom',
      title: 'Today Chat Room',
      character: DEFAULT_CHARACTERS.stranger,
      scenario: PRESET_SCENARIOS.find((s) => s.role === 'stranger'),
      messages: [
        {
          id: 'm1',
          role: 'assistant',
          content: 'Excuse me, where are you heading?',
          timestamp: now,
        },
      ],
      createdAt: now,
      updatedAt: now,
      messageCount: 1,
      isAutoBubble: false,
    });

    const foundLocal = getTodayAutoBubbleConversation();
    assert.ok(foundLocal);
    assert.strictEqual(foundLocal.id, 'conv_today_chatroom');

    const foundServer = findTodayAutoChatConversation(
      [foundLocal],
      { characterRole: 'random', scenarioId: 'random' },
      new Date(now),
      'Asia/Ho_Chi_Minh'
    );
    assert.ok(foundServer);
    assert.strictEqual(foundServer.id, 'conv_today_chatroom');
    assert.strictEqual(foundServer.messages.length, 1);
  });

  it('creates at most one auto conversation per day even when characterRole or scenarioId changes', () => {
    const initialSettings = {
      ...DEFAULT_AUTO_CHAT_SETTINGS,
      characterRole: 'boss',
      scenarioId: bossScenario.id,
    };
    const todayKey = getDateKeyInTimezone(Date.now(), initialSettings.timezone);
    const first = getOrCreateTodayConversation(initialSettings, 'shiba-intern', 'Minh');
    assert.strictEqual(first.id, getDailyAutoConversationId(todayKey));
    assert.strictEqual(first.character.role, 'boss');
    assert.strictEqual(first.scenario.id, bossScenario.id);
    assert.strictEqual(localStorage.getItem(TODAY_CONV_KEY), first.id);

    // Server cron helper uses the exact same deterministic daily ID
    const serverBuilt = buildDailyAutoConversation(
      bossChar,
      bossScenario,
      'shiba-intern',
      'Minh',
      new Date(),
      initialSettings.timezone
    );
    assert.strictEqual(serverBuilt.id, first.id);

    // Changing settings on the same day must NOT create a second conversation
    const updatedSettings = {
      ...DEFAULT_AUTO_CHAT_SETTINGS,
      characterRole: 'friend',
      scenarioId: friendScenario.id,
    };
    assert.strictEqual(doesConversationMatchSettings(first, updatedSettings), false);

    const second = getOrCreateTodayConversation(updatedSettings, 'shiba-intern', 'Minh');
    assert.strictEqual(second.id, first.id);
    assert.strictEqual(second.character.role, 'boss');

    clearTodayAutoBubbleConversationId();
    assert.strictEqual(localStorage.getItem(TODAY_CONV_KEY), null);
  });

  it('tracks the most recently user-interacted conversation (switching from A to B and back)', () => {
    const now = Date.now();
    const yesterday = now - 24 * 60 * 60 * 1000;
    const tz = 'Asia/Ho_Chi_Minh';

    // 1. System auto-creates conversation A today
    const convA = getOrCreateTodayConversation(
      {
        ...DEFAULT_AUTO_CHAT_SETTINGS,
        characterRole: 'boss',
        scenarioId: bossScenario.id,
        timezone: tz,
      },
      'shiba-intern',
      'Minh'
    );
    // AI sends opening message in A; user has not replied yet
    convA.messages.push({
      id: 'auto-1',
      role: 'assistant',
      content: 'Hi Minh, how is the report?',
      timestamp: now - 60000,
    });
    convA.updatedAt = now - 60000;
    saveChatRoomConversation(convA);

    assert.strictEqual(getLastUserInteractionAt(convA), 0);
    assert.strictEqual(getTodayAutoBubbleConversation(tz)?.id, convA.id);

    // 2. User replies in A -> AI continues in A
    convA.messages.push({
      id: 'user-1',
      role: 'user',
      content: 'Almost done!',
      timestamp: now - 50000,
    });
    convA.updatedAt = now - 50000;
    saveChatRoomConversation(convA);

    assert.strictEqual(getTodayAutoBubbleConversation(tz)?.id, convA.id);
    assert.strictEqual(
      findTodayAutoChatConversation([convA], undefined, new Date(now), tz)?.id,
      convA.id
    );

    // 3. User replies in a different conversation B (even if B was created yesterday and is not isAutoBubble)
    const convB = {
      id: 'conv_chatroom_B',
      title: 'Friend Chat B',
      character: DEFAULT_CHARACTERS.friend,
      scenario: friendScenario,
      messages: [
        {
          id: 'b-init',
          role: 'assistant',
          content: 'Hey, free tonight?',
          timestamp: yesterday,
        },
        {
          id: 'b-user-1',
          role: 'user',
          content: 'Yes! Let us grab coffee.',
          timestamp: now - 20000,
        },
      ],
      createdAt: yesterday,
      updatedAt: now - 20000,
      messageCount: 2,
      isAutoBubble: false,
    };
    saveChatRoomConversation(convB);

    // Even if A receives an AI follow-up timestamp newer than B's user message, B must still win
    // because user's latest interaction was in B (now - 20000 > now - 50000)
    convA.messages.push({
      id: 'auto-2',
      role: 'assistant',
      content: 'Great, send it by 5 PM.',
      timestamp: now - 10000,
    });
    convA.updatedAt = now - 10000;
    saveChatRoomConversation(convA);

    assert.strictEqual(getTodayAutoBubbleConversation(tz)?.id, convB.id);
    assert.strictEqual(
      findTodayAutoChatConversation([convA, convB], undefined, new Date(now), tz)?.id,
      convB.id
    );

    // AI auto-replies in B -> B stays active
    convB.messages.push({
      id: 'auto-3',
      role: 'assistant',
      content: 'Awesome, how about 7 PM?',
      timestamp: now - 5000,
    });
    convB.updatedAt = now - 5000;
    saveChatRoomConversation(convB);
    assert.strictEqual(getTodayAutoBubbleConversation(tz)?.id, convB.id);

    // 4. User later replies in A again -> A becomes active again
    convA.messages.push({
      id: 'user-2',
      role: 'user',
      content: 'Sent the report just now!',
      timestamp: now,
    });
    convA.updatedAt = now;
    saveChatRoomConversation(convA);

    assert.strictEqual(getTodayAutoBubbleConversation(tz)?.id, convA.id);
    assert.strictEqual(
      findTodayAutoChatConversation([convA, convB], undefined, new Date(now), tz)?.id,
      convA.id
    );
  });

  it('aligns character role with explicit scenarioId when characterRole is random', () => {
    const settings = {
      ...DEFAULT_AUTO_CHAT_SETTINGS,
      characterRole: 'random',
      scenarioId: friendScenario.id,
    };
    const pickedChar = pickCharacter(settings);
    const pickedScen = pickScenario(settings, pickedChar.role);
    assert.strictEqual(pickedChar.role, friendScenario.role);
    assert.strictEqual(pickedScen.id, friendScenario.id);
  });

  it('formats message timestamps cleanly for today, same year, and invalid values', () => {
    assert.strictEqual(formatMessageTime(0), '');
    assert.strictEqual(formatMessageTime(undefined), '');
    assert.strictEqual(formatMessageFullTime(0), '');

    const today = new Date();
    today.setHours(9, 5, 30, 0);
    assert.strictEqual(formatMessageTime(today.getTime()), '09:05');
    assert.ok(formatMessageFullTime(today.getTime()).startsWith('09:05:30 '));

    const earlierYear = new Date(2024, 2, 7, 14, 22, 9); // 07/03/2024 14:22:09
    assert.strictEqual(formatMessageTime(earlierYear.getTime()), '14:22 07/03/2024');
    assert.strictEqual(formatMessageFullTime(earlierYear.getTime()), '14:22:09 07/03/2024');
  });
});
