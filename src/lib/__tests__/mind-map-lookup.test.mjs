import { describe, it } from 'node:test';
import assert from 'node:assert';
import { extractMindMapLookupTerms, isLexicalNodeType } from '../mind-map/lookup.ts';
import { getCambridgeUrl, getOxfordUrl } from '../dictionary.ts';

describe('extractMindMapLookupTerms', () => {
  it('identifies lexical vs structural node types', () => {
    assert.strictEqual(isLexicalNodeType('synonym'), true);
    assert.strictEqual(isLexicalNodeType('antonym'), true);
    assert.strictEqual(isLexicalNodeType('family'), true);
    assert.strictEqual(isLexicalNodeType('collocation'), true);
    assert.strictEqual(isLexicalNodeType('related'), true);
    assert.strictEqual(isLexicalNodeType('root-group'), true);

    assert.strictEqual(isLexicalNodeType('center'), false);
    assert.strictEqual(isLexicalNodeType('category-group'), false);
    assert.strictEqual(isLexicalNodeType('progress-group'), false);
  });

  it('returns empty array for structural nodes', () => {
    assert.deepStrictEqual(extractMindMapLookupTerms('Essential (12)', 'category-group'), []);
    assert.deepStrictEqual(extractMindMapLookupTerms('Mastered (5)', 'progress-group'), []);
    assert.deepStrictEqual(extractMindMapLookupTerms('port-', 'center'), []);
    assert.deepStrictEqual(extractMindMapLookupTerms('My Vocabulary', 'center'), []);
  });

  it('extracts clean lookup terms for synonyms, antonyms, collocations, and related words', () => {
    assert.deepStrictEqual(extractMindMapLookupTerms('declaration', 'synonym'), ['declaration']);
    assert.deepStrictEqual(
      extractMindMapLookupTerms('field reporter (distinction in role)', 'synonym'),
      ['field reporter']
    );
    assert.deepStrictEqual(
      extractMindMapLookupTerms('collaborate closely with', 'collocation'),
      ['collaborate closely with']
    );
    assert.deepStrictEqual(
      extractMindMapLookupTerms('cookie (British biscuit equivalent)', 'related'),
      ['cookie']
    );
  });

  it('splits comma/slash-separated word-family forms and ignores placeholders', () => {
    assert.deepStrictEqual(
      extractMindMapLookupTerms('announcement, announcer', 'family'),
      ['announcement', 'announcer']
    );
    assert.deepStrictEqual(
      extractMindMapLookupTerms('broadcast (past: broadcast or broadcasted)', 'family'),
      ['broadcast']
    );
    assert.deepStrictEqual(
      extractMindMapLookupTerms('on-air (broadcasting status/segment), airtime, broadcast', 'family'),
      ['on-air', 'airtime', 'broadcast']
    );
    assert.deepStrictEqual(extractMindMapLookupTerms('N/A', 'family'), []);
  });

  it('produces valid Cambridge and Oxford lookup URLs from extracted terms', () => {
    const [single] = extractMindMapLookupTerms('announced', 'family');
    assert.strictEqual(
      getCambridgeUrl(single),
      'https://dictionary.cambridge.org/dictionary/english/announced'
    );
    assert.strictEqual(
      getOxfordUrl(single),
      'https://www.oxfordlearnersdictionaries.com/definition/english/announce'
    );

    const [colloc] = extractMindMapLookupTerms('collaborate closely with', 'collocation');
    assert.strictEqual(
      getCambridgeUrl(colloc),
      'https://dictionary.cambridge.org/dictionary/english/collaborate-closely-with'
    );
    assert.strictEqual(
      getOxfordUrl(colloc),
      'https://www.oxfordlearnersdictionaries.com/search/english/?q=collaborate%20closely%20with'
    );
  });
});
