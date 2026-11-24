import { describe, it } from 'node:test';
import assert from 'node:assert';
import { mergeUserProgress } from '../sync.ts';

describe('Custom Vocab & Patterns Cloud Synchronization', () => {
  it('merges new custom items created on local and remote without loss', () => {
    const local = {
      version: 1,
      cards: {},
      stats: {},
      history: [],
      preferences: {},
      bookmarkedWordIds: [],
      customItems: [
        {
          id: 'item-1',
          type: 'vocabulary',
          text: 'feasibility',
          explanation: 'tính khả thi',
          context: 'Conduct a feasibility study.',
          createdAt: '2026-11-20T10:00:00.000Z',
          updatedAt: '2026-11-20T10:00:00.000Z',
        },
      ],
    };

    const remote = {
      version: 1,
      cards: {},
      stats: {},
      history: [],
      preferences: {},
      bookmarkedWordIds: [],
      customItems: [
        {
          id: 'item-2',
          type: 'pattern',
          text: 'in accordance with',
          explanation: 'tuân theo',
          context: 'In accordance with company policy.',
          createdAt: '2026-11-21T10:00:00.000Z',
          updatedAt: '2026-11-21T10:00:00.000Z',
        },
      ],
    };

    const merged = mergeUserProgress(local, remote);
    assert.strictEqual(merged.customItems.length, 2);
    const ids = merged.customItems.map((i) => i.id);
    assert.ok(ids.includes('item-1'));
    assert.ok(ids.includes('item-2'));
  });

  it('preserves the latest updated version when an item was edited on another device', () => {
    const local = {
      version: 1,
      cards: {},
      stats: {},
      history: [],
      preferences: {},
      bookmarkedWordIds: [],
      customItems: [
        {
          id: 'item-1',
          type: 'vocabulary',
          text: 'mitigate',
          explanation: 'giảm nhẹ (cũ)',
          context: 'Mitigate risk.',
          createdAt: '2026-11-20T10:00:00.000Z',
          updatedAt: '2026-11-20T10:00:00.000Z',
        },
      ],
    };

    const remote = {
      version: 1,
      cards: {},
      stats: {},
      history: [],
      preferences: {},
      bookmarkedWordIds: [],
      customItems: [
        {
          id: 'item-1',
          type: 'vocabulary',
          text: 'mitigate',
          explanation: 'làm giảm nhẹ thiệt hại hoặc rủi ro tài chính (mới)',
          context: 'Mitigate market risks promptly.',
          createdAt: '2026-11-20T10:00:00.000Z',
          updatedAt: '2026-11-22T15:30:00.000Z', // newer
        },
      ],
    };

    const merged = mergeUserProgress(local, remote);
    assert.strictEqual(merged.customItems.length, 1);
    assert.strictEqual(
      merged.customItems[0].explanation,
      'làm giảm nhẹ thiệt hại hoặc rủi ro tài chính (mới)'
    );
  });

  it('respects deletedCustomItemIds tombstone to prevent resurrection of deleted items', () => {
    const local = {
      version: 1,
      cards: {},
      stats: {},
      history: [],
      preferences: {},
      bookmarkedWordIds: [],
      customItems: [],
      deletedCustomItemIds: ['item-deleted'],
    };

    const remote = {
      version: 1,
      cards: {},
      stats: {},
      history: [],
      preferences: {},
      bookmarkedWordIds: [],
      customItems: [
        {
          id: 'item-deleted',
          type: 'vocabulary',
          text: 'old word',
          explanation: 'từ cũ đã xoá trên thiết bị khác',
          context: 'Example',
          createdAt: '2026-11-18T10:00:00.000Z',
          updatedAt: '2026-11-18T10:00:00.000Z',
        },
        {
          id: 'item-active',
          type: 'pattern',
          text: 'active pattern',
          explanation: 'mẫu câu đang dùng',
          context: 'Example',
          createdAt: '2026-11-23T10:00:00.000Z',
          updatedAt: '2026-11-23T10:00:00.000Z',
        },
      ],
      deletedCustomItemIds: [],
    };

    const merged = mergeUserProgress(local, remote);
    assert.strictEqual(merged.customItems.length, 1);
    assert.strictEqual(merged.customItems[0].id, 'item-active');
    assert.ok(merged.deletedCustomItemIds.includes('item-deleted'));
  });

  it('correctly syncs and preserves IPA pronunciation and part of speech', () => {
    const local = {
      version: 1,
      cards: {},
      stats: {},
      history: [],
      preferences: {},
      bookmarkedWordIds: [],
      customItems: [
        {
          id: 'item-ipa',
          type: 'vocabulary',
          text: 'feasibility',
          ipa: '/ˌfiːzəˈbɪləti/',
          partOfSpeech: 'noun (danh từ)',
          explanation: 'tính khả thi',
          context: 'A feasibility study is needed.',
          createdAt: '2026-11-20T10:00:00.000Z',
          updatedAt: '2026-11-20T10:00:00.000Z',
        },
      ],
    };

    const remote = {
      version: 1,
      cards: {},
      stats: {},
      history: [],
      preferences: {},
      bookmarkedWordIds: [],
      customItems: [],
    };

    const merged = mergeUserProgress(local, remote);
    assert.strictEqual(merged.customItems.length, 1);
    assert.strictEqual(merged.customItems[0].ipa, '/ˌfiːzəˈbɪləti/');
    assert.strictEqual(merged.customItems[0].partOfSpeech, 'noun (danh từ)');
  });
});
