import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';
import {
  generateConversationId,
  getChatRoomHistory,
  getChatRoomConversationById,
  saveChatRoomConversation,
  deleteChatRoomConversation,
  clearAllChatRoomHistory,
  formatConversationTime,
  CHAT_ROOM_HISTORY_KEY,
  MAX_CHAT_ROOM_CONVERSATIONS,
} from '../roleplay/history.ts';
import { mergeUserProgress } from '../sync.ts';
import { loadUserProgress, saveUserProgress, DEFAULT_PROGRESS } from '../storage.ts';

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

const createDummyConversation = (id, updatedAt) => ({
  id,
  title: `Test Conversation ${id}`,
  character: {
    name: 'Alex Miller',
    role: 'boss',
    gender: 'male',
    age: 38,
    department: 'Quản lý Dự án',
    avatar: 'cat-boss',
    personality: 'Thẳng thắn, quyết đoán',
  },
  scenario: {
    id: 'test-scenario',
    title: 'Báo cáo tiến độ',
    vietnameseTitle: 'Báo cáo tiến độ',
    description: 'Thảo luận tiến độ công việc',
    role: 'boss',
    level: 'intermediate',
    targetScoreRange: '650 - 750',
    department: 'Management',
    objective: 'Báo cáo đúng hạn',
    initialMessage: 'Can we discuss the schedule?',
    initialTranslation: 'Chúng ta có thể thảo luận tiến độ không?',
    suggestedVocabulary: ['deadline', 'milestone'],
    keyPhrases: [],
  },
  messages: [
    {
      id: `msg-1-${id}`,
      role: 'assistant',
      content: 'Can we discuss the schedule?',
      timestamp: updatedAt - 1000,
    },
    {
      id: `msg-2-${id}`,
      role: 'user',
      content: 'Yes, I am ready to present.',
      timestamp: updatedAt,
    },
  ],
  createdAt: updatedAt - 5000,
  updatedAt,
  messageCount: 2,
  lastMessageSnippet: 'Yes, I am ready to present.',
});

describe('Chat Room Conversation History Manager', () => {
  beforeEach(() => {
    mockStorage.clear();
  });

  it('generates unique conversation IDs', () => {
    const id1 = generateConversationId();
    const id2 = generateConversationId();
    assert.ok(id1.startsWith('conv_'));
    assert.ok(id2.startsWith('conv_'));
    assert.notStrictEqual(id1, id2);
  });

  it('returns empty array when history is empty', () => {
    const history = getChatRoomHistory();
    assert.deepStrictEqual(history, []);
  });

  it('saves and retrieves a conversation correctly', () => {
    const conv = createDummyConversation('conv_1', 1000);
    const updatedList = saveChatRoomConversation(conv);

    assert.strictEqual(updatedList.length, 1);
    assert.strictEqual(updatedList[0].id, 'conv_1');

    const loaded = getChatRoomHistory();
    assert.strictEqual(loaded.length, 1);
    assert.strictEqual(loaded[0].id, 'conv_1');
    assert.strictEqual(loaded[0].title, conv.title);
  });

  it('updates an existing conversation with same ID without creating duplicates', () => {
    const conv1 = createDummyConversation('conv_1', 1000);
    saveChatRoomConversation(conv1);

    const conv1Updated = {
      ...conv1,
      updatedAt: 5000,
      lastMessageSnippet: 'Updated message content',
    };
    const updatedList = saveChatRoomConversation(conv1Updated);

    assert.strictEqual(updatedList.length, 1);
    assert.strictEqual(updatedList[0].id, 'conv_1');
    assert.strictEqual(updatedList[0].updatedAt, 5000);
    assert.strictEqual(updatedList[0].lastMessageSnippet, 'Updated message content');
  });

  it('strictly limits history to MAX_CHAT_ROOM_CONVERSATIONS (10) and orders by updatedAt descending', () => {
    assert.strictEqual(MAX_CHAT_ROOM_CONVERSATIONS, 10);

    // Save 15 conversations with ascending timestamps
    for (let i = 1; i <= 15; i++) {
      const conv = createDummyConversation(`conv_${i}`, i * 1000);
      saveChatRoomConversation(conv);
    }

    const history = getChatRoomHistory();
    assert.strictEqual(history.length, 10);

    // Most recent should be conv_15 at index 0, down to conv_6 at index 9
    assert.strictEqual(history[0].id, 'conv_15');
    assert.strictEqual(history[9].id, 'conv_6');

    // The oldest 5 (conv_1 to conv_5) should have been pruned
    const hasOld = history.some((c) => ['conv_1', 'conv_2', 'conv_3', 'conv_4', 'conv_5'].includes(c.id));
    assert.strictEqual(hasOld, false);
  });

  it('finds conversation by ID correctly', () => {
    const convA = createDummyConversation('conv_A', 1000);
    const convB = createDummyConversation('conv_B', 2000);
    saveChatRoomConversation(convA);
    saveChatRoomConversation(convB);

    const found = getChatRoomConversationById('conv_A');
    assert.ok(found);
    assert.strictEqual(found.id, 'conv_A');

    const notFound = getChatRoomConversationById('non_existent');
    assert.strictEqual(notFound, null);
  });

  it('deletes conversation by ID', () => {
    const conv1 = createDummyConversation('conv_1', 1000);
    const conv2 = createDummyConversation('conv_2', 2000);
    saveChatRoomConversation(conv1);
    saveChatRoomConversation(conv2);

    const afterDelete = deleteChatRoomConversation('conv_1');
    assert.strictEqual(afterDelete.length, 1);
    assert.strictEqual(afterDelete[0].id, 'conv_2');

    const reloaded = getChatRoomHistory();
    assert.strictEqual(reloaded.length, 1);
    assert.strictEqual(reloaded[0].id, 'conv_2');
  });

  it('clears all conversation history', () => {
    saveChatRoomConversation(createDummyConversation('conv_1', 1000));
    saveChatRoomConversation(createDummyConversation('conv_2', 2000));

    clearAllChatRoomHistory();
    assert.deepStrictEqual(getChatRoomHistory(), []);
  });

  it('formats conversation time properly into human readable strings', () => {
    const now = Date.now();
    assert.strictEqual(formatConversationTime(now - 10000), 'Vừa xong');
    assert.strictEqual(formatConversationTime(now - 3 * 60 * 1000), '3 phút trước');
    assert.strictEqual(formatConversationTime(now - 2 * 3600 * 1000), '2 giờ trước');
    assert.strictEqual(formatConversationTime(now - 2 * 24 * 3600 * 1000), '2 ngày trước');
  });

  it('correctly merges cross-device chat histories when syncing (mergeUserProgress)', () => {
    const convA1 = createDummyConversation('conv_A1', 1000);
    const convA2 = createDummyConversation('conv_Shared', 2000);
    const convB1 = createDummyConversation('conv_B1', 3000);
    const convBSharedUpdated = {
      ...convA2,
      updatedAt: 4000,
      lastMessageSnippet: 'Updated on device B',
    };

    const localProgress = {
      ...DEFAULT_PROGRESS,
      roleplay: {
        chatHistory: [convA2, convA1],
        updatedAt: new Date(2000).toISOString(),
      },
    };

    const remoteProgress = {
      ...DEFAULT_PROGRESS,
      roleplay: {
        chatHistory: [convBSharedUpdated, convB1],
        updatedAt: new Date(4000).toISOString(),
      },
    };

    const merged = mergeUserProgress(localProgress, remoteProgress);
    assert.ok(merged.roleplay);
    assert.ok(merged.roleplay.chatHistory);
    assert.strictEqual(merged.roleplay.chatHistory.length, 3);

    // Most recent is conv_Shared (updated at 4000), then conv_B1 (3000), then conv_A1 (1000)
    assert.strictEqual(merged.roleplay.chatHistory[0].id, 'conv_Shared');
    assert.strictEqual(merged.roleplay.chatHistory[0].lastMessageSnippet, 'Updated on device B');
    assert.strictEqual(merged.roleplay.chatHistory[1].id, 'conv_B1');
    assert.strictEqual(merged.roleplay.chatHistory[2].id, 'conv_A1');
  });

  it('automatically syncs chatHistory between localStorage and UserProgressData', () => {
    const conv = createDummyConversation('conv_sync_1', 5000);
    saveChatRoomConversation(conv);

    const loaded = loadUserProgress();
    assert.ok(loaded.roleplay?.chatHistory);
    assert.strictEqual(loaded.roleplay.chatHistory.length, 1);
    assert.strictEqual(loaded.roleplay.chatHistory[0].id, 'conv_sync_1');
  });
});
