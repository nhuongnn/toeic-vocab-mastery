import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';
import {
  AUTO_CHAT_HISTORY_WINDOW,
  buildAutoChatTurnPrompt,
} from '../roleplay/ai-prompt.ts';
import { generateFallbackRoleplayReply } from '../roleplay/router.ts';
import { DEFAULT_CHARACTERS, PRESET_SCENARIOS } from '../roleplay/scenarios.ts';
import {
  clearTodayAutoBubbleConversationId,
  doesConversationMatchSettings,
  getOrCreateTodayConversation,
  getTodayAutoBubbleConversation,
  pickCharacter,
  pickScenario,
  TODAY_CONV_KEY,
} from '../auto-chat/conversation-manager.ts';
import { saveChatRoomConversation } from '../roleplay/history.ts';
import { DEFAULT_AUTO_CHAT_SETTINGS } from '../../types/auto-chat.ts';

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

  it('does not hijack non-auto-bubble chat-room conversations', () => {
    const now = Date.now();
    saveChatRoomConversation({
      id: 'conv_regular_chatroom',
      title: 'Regular Chat Room',
      character: DEFAULT_CHARACTERS.stranger,
      scenario: PRESET_SCENARIOS.find((s) => s.role === 'stranger'),
      messages: [],
      createdAt: now,
      updatedAt: now,
      messageCount: 0,
      isAutoBubble: false,
    });

    assert.strictEqual(getTodayAutoBubbleConversation(), null);
  });

  it('re-creates today conversation when characterRole or scenarioId changes in settings', () => {
    const initialSettings = {
      ...DEFAULT_AUTO_CHAT_SETTINGS,
      characterRole: 'boss',
      scenarioId: bossScenario.id,
    };
    const first = getOrCreateTodayConversation(initialSettings, 'shiba-intern', 'Minh');
    assert.strictEqual(first.character.role, 'boss');
    assert.strictEqual(first.scenario.id, bossScenario.id);
    assert.strictEqual(localStorage.getItem(TODAY_CONV_KEY), first.id);

    const updatedSettings = {
      ...DEFAULT_AUTO_CHAT_SETTINGS,
      characterRole: 'friend',
      scenarioId: friendScenario.id,
    };
    assert.strictEqual(doesConversationMatchSettings(first, updatedSettings), false);

    const second = getOrCreateTodayConversation(updatedSettings, 'shiba-intern', 'Minh');
    assert.notStrictEqual(second.id, first.id);
    assert.strictEqual(second.character.role, 'friend');
    assert.strictEqual(second.scenario.id, friendScenario.id);

    clearTodayAutoBubbleConversationId();
    assert.strictEqual(localStorage.getItem(TODAY_CONV_KEY), null);
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
});
