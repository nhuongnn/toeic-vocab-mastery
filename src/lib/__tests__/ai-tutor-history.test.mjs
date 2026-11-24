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
  renameAiTutorConversation,
  MAX_AI_TUTOR_CONVERSATIONS,
} from '../ai/history.ts';
import { buildSystemPrompt } from '../ai/system-prompt.ts';
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

describe('AI Tutor 10-Conversation History Manager (User-Scoped)', () => {
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

  it('strictly caps history at MAX_AI_TUTOR_CONVERSATIONS (10) and prunes older ones', () => {
    assert.strictEqual(MAX_AI_TUTOR_CONVERSATIONS, 10);
    const userId = 'user_quota_test';

    // Save 14 conversations with increasing timestamps
    for (let i = 1; i <= 14; i++) {
      const conv = createDummyTutorConversation(`conv_${i}`, i * 1000, `Hội thoại ${i}`);
      saveAiTutorConversation(userId, conv);
    }

    const history = getAiTutorHistory(userId);
    assert.strictEqual(history.length, 10);

    // Most recent is conv_14 down to conv_5
    assert.strictEqual(history[0].id, 'conv_14');
    assert.strictEqual(history[1].id, 'conv_13');
    assert.strictEqual(history[2].id, 'conv_12');
    assert.strictEqual(history[3].id, 'conv_11');
    assert.strictEqual(history[4].id, 'conv_10');
    assert.strictEqual(history[5].id, 'conv_9');
    assert.strictEqual(history[6].id, 'conv_8');
    assert.strictEqual(history[7].id, 'conv_7');
    assert.strictEqual(history[8].id, 'conv_6');
    assert.strictEqual(history[9].id, 'conv_5');

    // The oldest 4 (conv_1, conv_2, conv_3, conv_4) must be pruned
    const hasOld = history.some((c) => ['conv_1', 'conv_2', 'conv_3', 'conv_4'].includes(c.id));
    assert.strictEqual(hasOld, false);
  });

  it('allows user to rename an existing conversation', () => {
    const userId = 'user_rename';
    const conv = createDummyTutorConversation('conv_ren_1', 1000, 'Tên cũ');
    saveAiTutorConversation(userId, conv);

    const updated = renameAiTutorConversation(userId, 'conv_ren_1', 'Tên mới tùy chỉnh');
    assert.strictEqual(updated.length, 1);
    assert.strictEqual(updated[0].title, 'Tên mới tùy chỉnh');

    const loaded = getAiTutorConversationById(userId, 'conv_ren_1');
    assert.strictEqual(loaded?.title, 'Tên mới tùy chỉnh');

    // Blank name should be ignored
    const unchanged = renameAiTutorConversation(userId, 'conv_ren_1', '   ');
    assert.strictEqual(unchanged[0].title, 'Tên mới tùy chỉnh');
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

  it('merges cross-device AI tutor history in mergeUserProgress and strictly caps at 10', () => {
    // Create 12 conversations
    const localConvs = [];
    const remoteConvs = [];

    for (let i = 1; i <= 6; i++) {
      localConvs.push(createDummyTutorConversation(`conv_${i}`, i * 1000));
    }
    for (let i = 7; i <= 12; i++) {
      remoteConvs.push(createDummyTutorConversation(`conv_${i}`, i * 1000));
    }

    const localProgress = {
      ...DEFAULT_PROGRESS,
      aiTutorHistory: localConvs,
    };

    const remoteProgress = {
      ...DEFAULT_PROGRESS,
      aiTutorHistory: remoteConvs,
    };

    const merged = mergeUserProgress(localProgress, remoteProgress);
    assert.ok(merged.aiTutorHistory);
    // 12 unique conversations merged is strictly capped at 10!
    assert.strictEqual(merged.aiTutorHistory.length, 10);

    // Most recent is conv_12 down to conv_3
    assert.strictEqual(merged.aiTutorHistory[0].id, 'conv_12');
    assert.strictEqual(merged.aiTutorHistory[9].id, 'conv_3');

    // conv_1 and conv_2 should be pruned
    assert.strictEqual(merged.aiTutorHistory.some((c) => c.id === 'conv_1'), false);
    assert.strictEqual(merged.aiTutorHistory.some((c) => c.id === 'conv_2'), false);
  });

  it('saves and restores conversations with multiple wordContexts', () => {
    const userId = 'user_multi_context';
    const multiContextConv = {
      ...createDummyTutorConversation('conv_multi', 2000, 'evaluate + assess'),
      wordContext: { word: 'evaluate', level: 'intermediate' },
      wordContexts: [
        { id: 'ctx_1', word: 'evaluate', meaning: 'đánh giá định lượng' },
        { id: 'ctx_2', word: 'assess', meaning: 'đánh giá tổng thể' },
        { id: 'ctx_3', word: 'Đoạn trích', selectedText: 'The board evaluated the annual proposal.' },
      ],
    };

    saveAiTutorConversation(userId, multiContextConv);
    const loaded = getAiTutorHistory(userId);
    assert.strictEqual(loaded.length, 1);
    assert.strictEqual(loaded[0].wordContexts?.length, 3);
    assert.strictEqual(loaded[0].wordContexts[0].word, 'evaluate');
    assert.strictEqual(loaded[0].wordContexts[1].word, 'assess');
    assert.strictEqual(loaded[0].wordContexts[2].selectedText, 'The board evaluated the annual proposal.');
    assert.strictEqual(loaded[0].wordContext?.word, 'evaluate');
  });

  it('buildSystemPrompt formats single and multiple contexts properly', () => {
    // 1. Single context
    const singleWord = { word: 'evaluate', meaning: 'đánh giá', ipa: 'ɪˈvæl.ju.eɪt' };
    const promptSingle = buildSystemPrompt(singleWord);
    assert.ok(promptSingle.includes('NGỮ CẢNH TỪ VỰNG NGƯỜI DÙNG ĐANG HỌC'));
    assert.ok(promptSingle.includes('"EVALUATE"'));
    assert.ok(promptSingle.includes('đánh giá'));

    // 2. Multiple contexts (2 words + 1 snippet)
    const contexts = [
      { id: '1', word: 'evaluate', meaning: 'đánh giá' },
      { id: '2', word: 'assess', meaning: 'định giá' },
      { id: '3', word: 'snippet', selectedText: 'Quarterly review report' },
    ];
    const promptMulti = buildSystemPrompt(contexts);
    assert.ok(promptMulti.includes('DANH SÁCH CÁC NGỮ CẢNH ĐỒNG THỜI NGƯỜI HỌC ĐANG CUNG CẤP (3 NGỮ CẢNH)'));
    assert.ok(promptMulti.includes('Ngữ cảnh #1'));
    assert.ok(promptMulti.includes('Ngữ cảnh #2'));
    assert.ok(promptMulti.includes('Ngữ cảnh #3'));
    assert.ok(promptMulti.includes('HƯỚNG DẪN XỬ LÝ NHIỀU NGỮ CẢNH KHI TRẢ LỜI'));
    assert.ok(promptMulti.includes('So sánh & Phân biệt') || promptMulti.includes('so sánh hoặc phân biệt'));
  });
});
