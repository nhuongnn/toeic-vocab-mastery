import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';
import {
  generateTutorConversationId,
  getAiTutorHistoryKey,
  getAiTutorHistory,
  getAiTutorConversationById,
  saveAiTutorConversation,
  deleteAiTutorConversation,
  clearAllAiTutorHistory,
  formatConversationTime,
  MAX_AI_TUTOR_CONVERSATIONS,
} from '../ai/history.ts';
import { mergeUserProgress } from '../sync.ts';
import { DEFAULT_PROGRESS } from '../storage.ts';

// Setup Mock Browser environment for localStorage & window events
class MockLocalStorage {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
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

const createDummyTutorConversation = (id, updatedAt, title) => ({
  id,
  title: title || `Tutor Chat ${id}`,
  wordContext: {
    word: 'evaluate',
    level: 'intermediate',
  },
  messages: [
    {
      id: `user-msg-${id}`,
      role: 'user',
      content: `Question in ${id}`,
      timestamp: updatedAt - 1000,
    },
    {
      id: `ai-msg-${id}`,
      role: 'assistant',
      content: `Explanation in ${id}`,
      timestamp: updatedAt,
      provider: 'gemini',
    },
  ],
  createdAt: updatedAt - 5000,
  updatedAt,
  messageCount: 1,
  lastMessageSnippet: `Explanation in ${id}`,
});

describe('AI Tutor 5-Conversation History Manager (User-Scoped)', () => {
  beforeEach(() => {
    mockStorage.clear();
  });

  it('generates unique conversation IDs with tutor_conv_ prefix', () => {
    const id1 = generateTutorConversationId();
    const id2 = generateTutorConversationId();
    assert.ok(id1.startsWith('tutor_conv_'));
    assert.ok(id2.startsWith('tutor_conv_'));
    assert.notStrictEqual(id1, id2);
  });

  it('generates user-isolated localStorage keys', () => {
    assert.strictEqual(getAiTutorHistoryKey('user-123'), 'toeic_ai_tutor_history_user-123');
    assert.strictEqual(getAiTutorHistoryKey('user-456'), 'toeic_ai_tutor_history_user-456');
  });

  it('strictly returns empty array if user is not logged in (!userId)', () => {
    assert.deepStrictEqual(getAiTutorHistory(null), []);
    assert.deepStrictEqual(getAiTutorHistory(undefined), []);
    assert.deepStrictEqual(getAiTutorHistory(''), []);
  });

  it('strictly does NOT save if user is not logged in (!userId)', () => {
    const conv = createDummyTutorConversation('conv_guest', 1000);
    const resultNull = saveAiTutorConversation(null, conv);
    const resultUndef = saveAiTutorConversation(undefined, conv);
    const resultEmpty = saveAiTutorConversation('', conv);

    assert.deepStrictEqual(resultNull, []);
    assert.deepStrictEqual(resultUndef, []);
    assert.deepStrictEqual(resultEmpty, []);
    assert.strictEqual(Object.keys(mockStorage.store).length, 0);
  });

  it('saves and retrieves conversations for an authenticated user', () => {
    const userId = 'user_abc_1';
    const conv = createDummyTutorConversation('conv_1', 1000, 'Từ vựng: innovate');
    const updatedList = saveAiTutorConversation(userId, conv);

    assert.strictEqual(updatedList.length, 1);
    assert.strictEqual(updatedList[0].id, 'conv_1');
    assert.strictEqual(updatedList[0].title, 'Từ vựng: innovate');

    const loaded = getAiTutorHistory(userId);
    assert.strictEqual(loaded.length, 1);
    assert.strictEqual(loaded[0].id, 'conv_1');
    assert.strictEqual(loaded[0].wordContext?.word, 'evaluate');
  });

  it('updates an existing conversation with same ID without creating duplicates', () => {
    const userId = 'user_abc_1';
    const conv = createDummyTutorConversation('conv_1', 1000, 'Từ vựng: contract');
    saveAiTutorConversation(userId, conv);

    const convUpdated = {
      ...conv,
      updatedAt: 5000,
      lastMessageSnippet: 'Updated assistant reply',
    };
    const updatedList = saveAiTutorConversation(userId, convUpdated);

    assert.strictEqual(updatedList.length, 1);
    assert.strictEqual(updatedList[0].id, 'conv_1');
    assert.strictEqual(updatedList[0].updatedAt, 5000);
    assert.strictEqual(updatedList[0].lastMessageSnippet, 'Updated assistant reply');
  });

  it('strictly caps history at MAX_AI_TUTOR_CONVERSATIONS (5) and prunes older ones', () => {
    assert.strictEqual(MAX_AI_TUTOR_CONVERSATIONS, 5);
    const userId = 'user_quota_test';

    // Save 8 conversations with increasing timestamps
    for (let i = 1; i <= 8; i++) {
      const conv = createDummyTutorConversation(`conv_${i}`, i * 1000, `Hội thoại ${i}`);
      saveAiTutorConversation(userId, conv);
    }

    const history = getAiTutorHistory(userId);
    assert.strictEqual(history.length, 5);

    // Most recent is conv_8 down to conv_4
    assert.strictEqual(history[0].id, 'conv_8');
    assert.strictEqual(history[1].id, 'conv_7');
    assert.strictEqual(history[2].id, 'conv_6');
    assert.strictEqual(history[3].id, 'conv_5');
    assert.strictEqual(history[4].id, 'conv_4');

    // The oldest 3 (conv_1, conv_2, conv_3) must be pruned
    const hasOld = history.some((c) => ['conv_1', 'conv_2', 'conv_3'].includes(c.id));
    assert.strictEqual(hasOld, false);
  });

  it('strictly isolates history between different users', () => {
    const userA = 'user_alice';
    const userB = 'user_bob';

    const convAlice = createDummyTutorConversation('conv_alice_1', 1000, 'Hỏi về Alice');
    const convBob = createDummyTutorConversation('conv_bob_1', 2000, 'Hỏi về Bob');

    saveAiTutorConversation(userA, convAlice);
    saveAiTutorConversation(userB, convBob);

    const historyA = getAiTutorHistory(userA);
    const historyB = getAiTutorHistory(userB);

    assert.strictEqual(historyA.length, 1);
    assert.strictEqual(historyA[0].id, 'conv_alice_1');

    assert.strictEqual(historyB.length, 1);
    assert.strictEqual(historyB[0].id, 'conv_bob_1');

    // Guest cannot see either
    assert.deepStrictEqual(getAiTutorHistory(null), []);
  });

  it('finds conversation by ID for a user', () => {
    const userId = 'user_find';
    const conv = createDummyTutorConversation('conv_find_1', 1000);
    saveAiTutorConversation(userId, conv);

    const found = getAiTutorConversationById(userId, 'conv_find_1');
    assert.ok(found);
    assert.strictEqual(found.id, 'conv_find_1');

    const notFound = getAiTutorConversationById(userId, 'conv_non_existent');
    assert.strictEqual(notFound, null);

    const notFoundNullUser = getAiTutorConversationById(null, 'conv_find_1');
    assert.strictEqual(notFoundNullUser, null);
  });

  it('allows user to delete a specific conversation from history', () => {
    const userId = 'user_delete';
    const conv1 = createDummyTutorConversation('conv_del_1', 1000);
    const conv2 = createDummyTutorConversation('conv_del_2', 2000);
    saveAiTutorConversation(userId, conv1);
    saveAiTutorConversation(userId, conv2);

    const remaining = deleteAiTutorConversation(userId, 'conv_del_1');
    assert.strictEqual(remaining.length, 1);
    assert.strictEqual(remaining[0].id, 'conv_del_2');

    const reloaded = getAiTutorHistory(userId);
    assert.strictEqual(reloaded.length, 1);
    assert.strictEqual(reloaded[0].id, 'conv_del_2');
  });

  it('clears all AI tutor history for a user', () => {
    const userId = 'user_clear';
    saveAiTutorConversation(userId, createDummyTutorConversation('c1', 1000));
    saveAiTutorConversation(userId, createDummyTutorConversation('c2', 2000));

    clearAllAiTutorHistory(userId);
    assert.deepStrictEqual(getAiTutorHistory(userId), []);
  });

  it('formats conversation time into friendly Vietnamese strings', () => {
    const now = Date.now();
    assert.strictEqual(formatConversationTime(now - 15000), 'Vừa xong');
    assert.strictEqual(formatConversationTime(now - 4 * 60 * 1000), '4 phút trước');
    assert.strictEqual(formatConversationTime(now - 3 * 3600 * 1000), '3 giờ trước');
    assert.strictEqual(formatConversationTime(now - 2 * 24 * 3600 * 1000), '2 ngày trước');
  });

  it('merges cross-device AI tutor history in mergeUserProgress and strictly caps at 5', () => {
    const conv1 = createDummyTutorConversation('conv_1', 1000);
    const conv2 = createDummyTutorConversation('conv_shared', 2000);
    const conv3 = createDummyTutorConversation('conv_3', 3000);
    const convSharedUpdated = {
      ...conv2,
      updatedAt: 4000,
      lastMessageSnippet: 'Updated on phone',
    };
    const conv4 = createDummyTutorConversation('conv_4', 5000);
    const conv5 = createDummyTutorConversation('conv_5', 6000);
    const conv6 = createDummyTutorConversation('conv_6', 7000);

    const localProgress = {
      ...DEFAULT_PROGRESS,
      aiTutorHistory: [conv2, conv1],
    };

    const remoteProgress = {
      ...DEFAULT_PROGRESS,
      aiTutorHistory: [conv6, conv5, conv4, conv3, convSharedUpdated],
    };

    const merged = mergeUserProgress(localProgress, remoteProgress);
    assert.ok(merged.aiTutorHistory);
    // Even though there are 6 unique conversations (conv_1, shared, 3, 4, 5, 6), merged is strictly capped at 5!
    assert.strictEqual(merged.aiTutorHistory.length, 5);

    // Most recent is conv_6 (7000), then conv_5 (6000), then conv_4 (5000), then conv_shared (4000), then conv_3 (3000)
    assert.strictEqual(merged.aiTutorHistory[0].id, 'conv_6');
    assert.strictEqual(merged.aiTutorHistory[1].id, 'conv_5');
    assert.strictEqual(merged.aiTutorHistory[2].id, 'conv_4');
    assert.strictEqual(merged.aiTutorHistory[3].id, 'conv_shared');
    assert.strictEqual(merged.aiTutorHistory[3].lastMessageSnippet, 'Updated on phone');
    assert.strictEqual(merged.aiTutorHistory[4].id, 'conv_3');

    // conv_1 (1000) should be pruned as the 6th
    const hasConv1 = merged.aiTutorHistory.some((c) => c.id === 'conv_1');
    assert.strictEqual(hasConv1, false);
  });
});
