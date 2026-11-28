import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  buildSelectionVocabIndex,
  expandMindMapFieldTerms,
  findSystemVocabMatchesForSelection,
  getSystemWordDetailUrl,
  getTokenLemmaCandidates,
  searchSelectionInVocabIndex,
} from '../selection-vocab-search.ts';

function makeWord(overrides) {
  return {
    id: overrides.id,
    word: overrides.word,
    partOfSpeech: overrides.partOfSpeech || ['verb'],
    category: overrides.category || 'office-admin',
    level: overrides.level || 'intermediate',
    toeicFrequency: overrides.toeicFrequency ?? 80,
    pronunciation: {
      ipa: overrides.ipa || '/test/',
      syllableBreakdown: overrides.word,
      stressPattern: 'first',
    },
    etymology: {
      origin: 'Latin',
      rootWord: overrides.word,
      rootMeaning: 'test',
      evolution: 'test',
    },
    deepMeaning: {
      coreConcept: overrides.coreConcept || `Core concept of ${overrides.word}`,
      spatialContext: '',
      temporalContext: '',
      emotionalTone: 'neutral',
      formalityLevel: 'neutral',
      connotation: 'neutral',
    },
    nativeMindset: {
      howNativesThink: '',
      mentalImage: '',
      whenToUse: '',
      whenNotToUse: '',
    },
    examples: {
      daily: [],
      business: [],
      conversation: [],
      collocations: overrides.collocations || [],
    },
    wordFamily: overrides.wordFamily || {},
    visual: {
      imageKeyword: overrides.word,
      imageDescription: '',
    },
    toeicContext: {
      commonParts: [5],
    },
    synonyms: overrides.synonyms || [],
    antonyms: overrides.antonyms || [],
    relatedWords: overrides.relatedWords || [],
  };
}

const sampleWords = [
  makeWord({
    id: 'office-admin-001',
    word: 'collaborate',
    toeicFrequency: 85,
    wordFamily: {
      noun: 'collaboration / collaborator',
      verb: 'collaborate',
      adjective: 'collaborative',
      adverb: 'collaboratively',
    },
    synonyms: ['cooperate', 'partner', 'team up', 'join forces'],
    antonyms: ['compete', 'oppose'],
    relatedWords: ['teamwork', 'synergy', 'field reporter (distinction in role)'],
    collocations: ['collaborate closely', 'collaborate on a project', 'collaborate with colleagues'],
  }),
  makeWord({
    id: 'finance-010',
    word: 'audit',
    partOfSpeech: ['verb', 'noun'],
    category: 'finance',
    level: 'advanced',
    toeicFrequency: 90,
    wordFamily: {
      noun: 'audit, auditor',
      verb: 'audit',
    },
    synonyms: ['inspect', 'review'],
    antonyms: ['ignore'],
    relatedWords: ['compliance', 'electronic funds transfer (EFT)'],
    collocations: ['conduct an audit', 'allocate funds / budget'],
  }),
  makeWord({
    id: 'office-admin-015',
    word: 'cancel',
    toeicFrequency: 88,
    wordFamily: {
      noun: 'cancellation',
      verb: 'cancel',
    },
    synonyms: ['call off', 'terminate'],
    antonyms: ['schedule', 'confirm'],
    relatedWords: ['postponement'],
    collocations: ['cancel a reservation', 'send/issue a memo'],
  }),
  makeWord({
    id: 'purchasing-002',
    word: 'negotiate',
    toeicFrequency: 92,
    wordFamily: {
      noun: 'negotiation',
      adjective: 'negotiable',
    },
    synonyms: ['bargain', 'confer'],
    antonyms: ['refuse'],
    relatedWords: ['agreement', 'cooperate'],
    collocations: ['negotiate a contract', 'slim / narrow margin'],
  }),
  makeWord({
    id: 'comm-003',
    word: 'broadcast',
    toeicFrequency: 78,
    wordFamily: {
      noun: 'broadcast, broadcaster, broadcasting',
      verb: 'broadcast (past: broadcast or broadcasted)',
    },
    synonyms: ['transmit', 'web broadcast (webcast)'],
    antonyms: ['withhold'],
    relatedWords: ['newsman/newswoman'],
    collocations: ['broadcast the news'],
  }),
  makeWord({
    id: 'hr-004',
    word: 'go',
    toeicFrequency: 70,
    synonyms: ['proceed'],
    antonyms: ['stay'],
    relatedWords: ['departure'],
    collocations: ['go on leave'],
  }),
  makeWord({
    id: 'office-admin-020',
    word: 'cooperate',
    toeicFrequency: 82,
    synonyms: ['collaborate'],
    antonyms: ['compete'],
    relatedWords: ['coordination'],
    collocations: ['cooperate fully'],
  }),
];

describe('Smart Selection Vocabulary Search', () => {
  it('expands mind-map field entries with parens, commas, slashes, and acronyms', () => {
    assert.deepStrictEqual(
      expandMindMapFieldTerms('field reporter (distinction in role)', 'related'),
      ['field reporter']
    );
    assert.deepStrictEqual(
      expandMindMapFieldTerms('electronic funds transfer (EFT)', 'related'),
      ['electronic funds transfer', 'EFT']
    );
    assert.deepStrictEqual(
      expandMindMapFieldTerms('allocate funds / budget', 'collocation'),
      ['allocate funds', 'allocate budget']
    );
    assert.deepStrictEqual(
      expandMindMapFieldTerms('send/issue a memo', 'collocation'),
      ['send a memo', 'issue a memo']
    );
    assert.deepStrictEqual(
      expandMindMapFieldTerms('slim / narrow margin', 'collocation'),
      ['slim margin', 'narrow margin']
    );
    assert.deepStrictEqual(
      expandMindMapFieldTerms('announcement, announcer', 'word-family'),
      ['announcement', 'announcer']
    );
    assert.deepStrictEqual(expandMindMapFieldTerms('N/A', 'synonym'), []);
  });

  it('generates morphological lemma candidates including tricky -ed/-ing/-ly edge cases', () => {
    assert.ok(getTokenLemmaCandidates('collaborated').includes('collaborate'));
    assert.ok(getTokenLemmaCandidates('audited').includes('audit'));
    assert.ok(getTokenLemmaCandidates('cancelled').includes('cancel'));
    assert.ok(getTokenLemmaCandidates('went').includes('go'));
    assert.ok(getTokenLemmaCandidates('effectively').includes('effective'));
    assert.deepStrictEqual(getTokenLemmaCandidates('constructor'), ['constructor']);
  });

  it('matches exact and inflected single headwords (including punctuation and possessives)', () => {
    const index = buildSelectionVocabIndex(sampleWords);

    const exact = searchSelectionInVocabIndex('Collaborate', index);
    assert.strictEqual(exact.matches[0].word.id, 'office-admin-001');
    assert.strictEqual(exact.matches[0].matchType, 'headword');
    assert.strictEqual(exact.matches[0].isSmartMatch, false);

    for (const inflected of ['collaborated', 'collaborating', 'collaborates', '"collaborated,"', "collaborator's"]) {
      const res = searchSelectionInVocabIndex(inflected, index);
      assert.ok(res.matches.length >= 1, `Expected match for ${inflected}`);
      assert.strictEqual(res.matches[0].word.id, 'office-admin-001', `Failed on ${inflected}`);
      assert.strictEqual(res.matches[0].isSmartMatch, true);
    }

    // Tricky -ed words where naive stemmer produces "audite" / "cancell"
    assert.strictEqual(searchSelectionInVocabIndex('audited', index).matches[0].word.id, 'finance-010');
    assert.strictEqual(searchSelectionInVocabIndex('auditing', index).matches[0].word.id, 'finance-010');
    assert.strictEqual(searchSelectionInVocabIndex('cancelled', index).matches[0].word.id, 'office-admin-015');
    assert.strictEqual(searchSelectionInVocabIndex('cancelling', index).matches[0].word.id, 'office-admin-015');

    // Irregular verbs
    assert.strictEqual(searchSelectionInVocabIndex('went', index).matches[0].word.id, 'hr-004');
  });

  it('searches across the full Vocab Mind Map scope (wordFamily, synonyms, antonyms, related, collocations)', () => {
    const index = buildSelectionVocabIndex(sampleWords);

    // Word family (inflected plural "collaborations" -> "collaboration", "cancellations" -> "cancellation")
    const famRes = searchSelectionInVocabIndex('collaborations', index);
    assert.strictEqual(famRes.matches[0].word.id, 'office-admin-001');
    assert.strictEqual(famRes.matches[0].matchType, 'word-family');

    const cancelFam = searchSelectionInVocabIndex('cancellations', index);
    assert.strictEqual(cancelFam.matches[0].word.id, 'office-admin-015');
    assert.strictEqual(cancelFam.matches[0].matchType, 'word-family');

    // Synonyms (inflected single & phrasal synonyms)
    const synRes = searchSelectionInVocabIndex('teamed up', index);
    assert.strictEqual(synRes.matches[0].word.id, 'office-admin-001');
    assert.strictEqual(synRes.matches[0].matchType, 'synonym');

    const synJoined = searchSelectionInVocabIndex('joined forces', index);
    assert.strictEqual(synJoined.matches[0].word.id, 'office-admin-001');
    assert.strictEqual(synJoined.matches[0].matchType, 'synonym');

    // Antonyms (inflected)
    const antRes = searchSelectionInVocabIndex('withheld', index);
    assert.strictEqual(antRes.matches[0].word.id, 'comm-003');
    assert.strictEqual(antRes.matches[0].matchType, 'antonym');

    // Related words (inflected, slashed, acronyms)
    const relRes = searchSelectionInVocabIndex('synergies', index);
    assert.strictEqual(relRes.matches[0].word.id, 'office-admin-001');
    assert.strictEqual(relRes.matches[0].matchType, 'related');

    const slashRel = searchSelectionInVocabIndex('newswomen', index);
    assert.strictEqual(slashRel.matches[0].word.id, 'comm-003');
    assert.strictEqual(slashRel.matches[0].matchType, 'related');

    const eftRes = searchSelectionInVocabIndex('EFT', index);
    assert.strictEqual(eftRes.matches[0].word.id, 'finance-010');
    assert.strictEqual(eftRes.matches[0].matchType, 'related');

    // Collocations (inflected, slashed, article-insensitive, sub-phrase)
    const coll1 = searchSelectionInVocabIndex('collaborated closely', index);
    assert.strictEqual(coll1.matches[0].word.id, 'office-admin-001');
    assert.strictEqual(coll1.matches[0].matchType, 'collocation');

    const coll2 = searchSelectionInVocabIndex('allocated budget', index);
    assert.strictEqual(coll2.matches[0].word.id, 'finance-010');
    assert.strictEqual(coll2.matches[0].matchType, 'collocation');

    const coll3 = searchSelectionInVocabIndex('issued a memo', index);
    assert.strictEqual(coll3.matches[0].word.id, 'office-admin-015');
    assert.strictEqual(coll3.matches[0].matchType, 'collocation');

    const coll4 = searchSelectionInVocabIndex('negotiating the contracts', index);
    assert.strictEqual(coll4.matches[0].word.id, 'purchasing-002');
    assert.strictEqual(coll4.matches[0].matchType, 'collocation');

    const collSub = searchSelectionInVocabIndex('will collaborate closely with', index);
    assert.strictEqual(collSub.matches[0].word.id, 'office-admin-001');
    assert.strictEqual(collSub.matches[0].matchType, 'collocation');
  });

  it('deduplicates by word ID and prioritizes headword > word-family > synonym > antonym > related > collocation', () => {
    const res = findSystemVocabMatchesForSelection('cooperated', sampleWords);
    const ids = res.matches.map((m) => m.word.id);

    // cooperate (headword) must come first, then collaborate (synonym) and negotiate (related)
    assert.strictEqual(ids[0], 'office-admin-020');
    assert.strictEqual(res.matches[0].matchType, 'headword');
    assert.ok(ids.includes('office-admin-001'));
    assert.ok(ids.includes('purchasing-002'));
    // No duplicate word IDs
    assert.strictEqual(new Set(ids).size, ids.length);
  });

  it('avoids noisy single-word matches inside multi-word collocations and ignores long passages', () => {
    const index = buildSelectionVocabIndex(sampleWords);

    // "closely" is only inside "collaborate closely" (2 words), should not match as single word
    const singleCollocToken = searchSelectionInVocabIndex('closely', index);
    assert.strictEqual(singleCollocToken.matches.length, 0);

    // Long paragraph should return no matches
    const longPassage = searchSelectionInVocabIndex(
      'The company collaborated closely with external auditors to review financial statements and ensure full compliance across all departments.',
      index
    );
    assert.strictEqual(longPassage.matches.length, 0);
  });

  it('builds valid system word detail URLs', () => {
    assert.strictEqual(getSystemWordDetailUrl('office-admin-001'), '/word/office-admin-001');
  });
});
