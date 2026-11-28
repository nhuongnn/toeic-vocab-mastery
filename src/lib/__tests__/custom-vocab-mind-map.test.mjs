import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  isEligibleForVocabMindMap,
  normalizeCustomMindMapData,
} from '../mind-map/customVocabMindMap.ts';
import { buildCustomVocabGraph } from '../mind-map/graphBuilder.ts';
import { mergeUserProgress } from '../sync.ts';

describe('Notebook AI Vocab Mind Map', () => {
  it('allows mind map generation only for vocabulary items, strictly excluding patterns', () => {
    assert.strictEqual(
      isEligibleForVocabMindMap({ type: 'vocabulary', text: 'mitigate' }),
      true
    );
    assert.strictEqual(
      isEligibleForVocabMindMap({ type: 'pattern', text: 'in accordance with' }),
      false
    );
    assert.strictEqual(
      isEligibleForVocabMindMap({ type: 'vocabulary', text: '   ' }),
      false
    );
  });

  it('normalizes AI mind map payloads by removing placeholders, duplicates, and center self-links', () => {
    const normalized = normalizeCustomMindMapData(
      {
        coreConcept: 'Làm giảm nhẹ mức độ nghiêm trọng của rủi ro hoặc thiệt hại.',
        ipa: '/ˈmɪtɪɡeɪt/',
        partOfSpeech: 'verb (động từ)',
        synonyms: ['mitigate', 'alleviate', 'reduce', 'Alleviate', 'N/A', 'lessen'],
        antonyms: ['aggravate', 'none', 'worsen'],
        wordFamily: {
          noun: 'mitigation / mitigant',
          verb: 'mitigate',
          adjective: 'mitigating, N/A',
        },
        collocations: ['mitigate risk', 'mitigate the impact', 'mitigate risk'],
        relatedWords: ['risk management', 'contingency', '-'],
        nodeNotes: {
          ' Alleviate ': 'làm dịu bớt, giảm nhẹ',
          'aggravate': 'làm trầm trọng thêm',
          'empty': 'N/A',
        },
      },
      {
        centerWord: 'mitigate',
        provider: 'gemini',
        model: 'gemini-flash-lite-latest',
      }
    );

    assert.deepStrictEqual(normalized.synonyms, ['alleviate', 'reduce', 'lessen']);
    assert.deepStrictEqual(normalized.antonyms, ['aggravate', 'worsen']);
    assert.deepStrictEqual(normalized.wordFamily, {
      noun: 'mitigation / mitigant',
      adjective: 'mitigating',
    });
    assert.deepStrictEqual(normalized.collocations, ['mitigate risk', 'mitigate the impact']);
    assert.deepStrictEqual(normalized.relatedWords, ['risk management', 'contingency']);
    assert.deepStrictEqual(normalized.nodeNotes, {
      alleviate: 'làm dịu bớt, giảm nhẹ',
      aggravate: 'làm trầm trọng thêm',
    });
    assert.strictEqual(normalized.provider, 'gemini');
  });

  it('builds a custom mind map graph for vocabulary items and returns center-only for patterns', () => {
    const vocabItem = {
      id: 'cst_1',
      type: 'vocabulary',
      text: 'mitigate',
      explanation: 'giảm nhẹ rủi ro',
      context: 'We must mitigate financial risks.',
      ipa: '/ˈmɪtɪɡeɪt/',
      partOfSpeech: 'verb',
      createdAt: '2026-11-28T10:00:00.000Z',
      updatedAt: '2026-11-28T10:00:00.000Z',
      mindMap: {
        coreConcept: 'Làm giảm nhẹ rủi ro hoặc hậu quả.',
        synonyms: ['alleviate', 'reduce'],
        antonyms: ['aggravate'],
        wordFamily: { noun: 'mitigation' },
        collocations: ['mitigate risk'],
        relatedWords: ['contingency'],
        nodeNotes: { alleviate: 'làm dịu bớt' },
        generatedAt: '2026-11-28T10:05:00.000Z',
        provider: 'gemini',
      },
    };

    const graph = buildCustomVocabGraph(vocabItem, [], {});
    assert.strictEqual(graph.centerNodeId, 'custom:cst_1');
    assert.strictEqual(graph.nodes.length, 7); // center + 2 syn + 1 ant + 1 fam + 1 coll + 1 rel
    assert.strictEqual(graph.edges.length, 6);
    const synNode = graph.nodes.find((n) => n.label === 'alleviate');
    assert.ok(synNode);
    assert.strictEqual(synNode.meta?.coreConcept, 'làm dịu bớt');

    const patternItem = {
      ...vocabItem,
      id: 'cst_pat',
      type: 'pattern',
      text: 'in accordance with',
    };
    const patternGraph = buildCustomVocabGraph(patternItem, [], {});
    assert.strictEqual(patternGraph.nodes.length, 1);
    assert.strictEqual(patternGraph.edges.length, 0);
  });

  it('preserves saved mindMap data during cloud sync merge', () => {
    const local = {
      version: 1,
      cards: {},
      stats: {},
      history: [],
      preferences: {},
      bookmarkedWordIds: [],
      customItems: [
        {
          id: 'cst_sync_1',
          type: 'vocabulary',
          text: 'feasibility',
          explanation: 'tính khả thi',
          context: 'Conduct a feasibility study.',
          createdAt: '2026-11-28T10:00:00.000Z',
          updatedAt: '2026-11-28T11:00:00.000Z',
          mindMap: {
            coreConcept: 'Khả năng thực hiện thành công.',
            synonyms: ['viability', 'practicality'],
            antonyms: ['impossibility'],
            wordFamily: { adjective: 'feasible' },
            collocations: ['feasibility study'],
            relatedWords: ['assessment'],
            generatedAt: '2026-11-28T11:00:00.000Z',
            provider: 'gemini',
          },
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
    assert.deepStrictEqual(merged.customItems[0].mindMap?.synonyms, ['viability', 'practicality']);
  });
});
