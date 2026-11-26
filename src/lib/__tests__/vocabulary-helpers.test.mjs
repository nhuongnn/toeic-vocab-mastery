import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  getWordPopularity,
  getWordPopularityScore,
  getDailyCommunicationFrequency,
  getDailyCommunicationScore,
  sortVocabularyWords,
  filterVocabularyWords,
  getWordMindMapUrl,
  getSafeReturnPath,
} from '../vocabulary-helpers.ts';

// Sample mock words
const mockWords = [
  {
    id: 'w1',
    word: 'apple',
    partOfSpeech: ['noun'],
    category: 'dining',
    level: 'essential',
    toeicFrequency: 10,
    deepMeaning: {
      coreConcept: 'a round fruit',
      spatialContext: 'everywhere',
      temporalContext: 'daily',
      emotionalTone: 'neutral',
      formalityLevel: 'neutral',
      connotation: 'positive',
    },
    examples: {
      daily: ['I eat an apple daily.', 'Fresh apples from the market.'],
      conversation: ['Do you want an apple?', 'Sure, thanks!'],
      business: [],
      collocations: ['fresh apple'],
    },
    etymology: { origin: 'Old English', rootWord: 'æppel', rootMeaning: 'fruit', evolution: '' },
    synonyms: ['fruit'],
    antonyms: [],
    relatedWords: [],
  },
  {
    id: 'w2',
    word: 'negotiate',
    partOfSpeech: ['verb'],
    category: 'purchasing',
    level: 'intermediate',
    toeicFrequency: 85, // 0-100 scale
    deepMeaning: {
      coreConcept: 'to discuss terms to reach an agreement',
      spatialContext: 'meeting room',
      temporalContext: 'contract renewal',
      emotionalTone: 'neutral',
      formalityLevel: 'neutral',
      connotation: 'neutral',
    },
    examples: {
      daily: ['We negotiated the price.'],
      conversation: ['Can we negotiate?', 'Yes.'],
      business: ['Negotiate contract terms.'],
      collocations: ['negotiate a deal'],
    },
    etymology: { origin: 'Latin', rootWord: 'negotiari', rootMeaning: 'do business', evolution: '' },
    synonyms: ['bargain', 'confer'],
    antonyms: [],
    relatedWords: [],
  },
  {
    id: 'w3',
    word: 'arbitration',
    partOfSpeech: ['noun'],
    category: 'legal',
    level: 'advanced',
    toeicFrequency: 7, // 0-10 scale
    deepMeaning: {
      coreConcept: 'legal dispute resolution by third party',
      spatialContext: 'courtroom',
      temporalContext: 'dispute settlement',
      emotionalTone: 'formal',
      formalityLevel: 'formal',
      connotation: 'neutral',
    },
    examples: {
      daily: [],
      conversation: [],
      business: ['Submitted to binding arbitration.'],
      collocations: ['binding arbitration'],
    },
    etymology: { origin: 'Latin', rootWord: 'arbitrari', rootMeaning: 'to judge', evolution: '' },
    synonyms: ['mediation', 'adjudication'],
    antonyms: [],
    relatedWords: [],
  },
];

describe('Vocabulary Helpers - Popularity & Daily Communication', () => {
  it('normalizes popularity to 0-100 percentage and 0-10 score', () => {
    // 10/10 -> 100%, 10/10
    assert.strictEqual(getWordPopularity(mockWords[0]), 100);
    assert.strictEqual(getWordPopularityScore(mockWords[0]), 10);

    // 85/100 -> 85%, 8.5/10
    assert.strictEqual(getWordPopularity(mockWords[1]), 85);
    assert.strictEqual(getWordPopularityScore(mockWords[1]), 8.5);

    // 7/10 -> 70%, 7.0/10
    assert.strictEqual(getWordPopularity(mockWords[2]), 70);
    assert.strictEqual(getWordPopularityScore(mockWords[2]), 7.0);
  });

  it('calculates daily communication frequency with level and formality adjustments', () => {
    const dailyApple = getDailyCommunicationFrequency(mockWords[0]);
    const dailyNegotiate = getDailyCommunicationFrequency(mockWords[1]);
    const dailyArbitration = getDailyCommunicationFrequency(mockWords[2]);

    assert.ok(getDailyCommunicationScore(mockWords[0]) >= 8.5);
    assert.ok(getDailyCommunicationScore(mockWords[2]) <= 6.0);

    // Essential everyday word should rank higher than intermediate, which ranks higher than formal advanced word
    assert.ok(dailyApple > dailyNegotiate, `Expected apple (${dailyApple}) > negotiate (${dailyNegotiate})`);
    assert.ok(dailyNegotiate > dailyArbitration, `Expected negotiate (${dailyNegotiate}) > arbitration (${dailyArbitration})`);
  });

  it('sorts words by popularity descending and ascending', () => {
    const sortedDesc = sortVocabularyWords(mockWords, 'popularity-desc');
    assert.strictEqual(sortedDesc[0].word, 'apple'); // 100
    assert.strictEqual(sortedDesc[1].word, 'negotiate'); // 85
    assert.strictEqual(sortedDesc[2].word, 'arbitration'); // 70

    const sortedAsc = sortVocabularyWords(mockWords, 'popularity-asc');
    assert.strictEqual(sortedAsc[0].word, 'arbitration'); // 70
    assert.strictEqual(sortedAsc[1].word, 'negotiate'); // 85
    assert.strictEqual(sortedAsc[2].word, 'apple'); // 100
  });

  it('sorts words by daily communication descending and ascending', () => {
    const sortedDesc = sortVocabularyWords(mockWords, 'daily-desc');
    assert.strictEqual(sortedDesc[0].word, 'apple');
    assert.strictEqual(sortedDesc[2].word, 'arbitration');

    const sortedAsc = sortVocabularyWords(mockWords, 'daily-asc');
    assert.strictEqual(sortedAsc[0].word, 'arbitration');
    assert.strictEqual(sortedAsc[2].word, 'apple');
  });

  it('sorts words alphabetically A-Z and Z-A', () => {
    const sortedAZ = sortVocabularyWords(mockWords, 'alpha-asc');
    assert.strictEqual(sortedAZ[0].word, 'apple');
    assert.strictEqual(sortedAZ[1].word, 'arbitration');
    assert.strictEqual(sortedAZ[2].word, 'negotiate');

    const sortedZA = sortVocabularyWords(mockWords, 'alpha-desc');
    assert.strictEqual(sortedZA[0].word, 'negotiate');
    assert.strictEqual(sortedZA[1].word, 'arbitration');
    assert.strictEqual(sortedZA[2].word, 'apple');
  });

  it('filters words by level', () => {
    const essentialOnly = filterVocabularyWords(mockWords, { level: 'essential' });
    assert.strictEqual(essentialOnly.length, 1);
    assert.strictEqual(essentialOnly[0].word, 'apple');

    const advancedOnly = filterVocabularyWords(mockWords, { level: 'advanced' });
    assert.strictEqual(advancedOnly.length, 1);
    assert.strictEqual(advancedOnly[0].word, 'arbitration');

    const allLevels = filterVocabularyWords(mockWords, { level: 'all' });
    assert.strictEqual(allLevels.length, 3);
  });

  it('filters words by category and search keyword', () => {
    const diningWords = filterVocabularyWords(mockWords, { category: 'dining' });
    assert.strictEqual(diningWords.length, 1);
    assert.strictEqual(diningWords[0].word, 'apple');

    const searched = filterVocabularyWords(mockWords, { search: 'dispute' });
    assert.strictEqual(searched.length, 1);
    assert.strictEqual(searched[0].word, 'arbitration');
  });

  it('builds safe mind map URLs and validates return paths', () => {
    assert.strictEqual(getWordMindMapUrl('collaborate'), '/mind-map?word=collaborate');
    assert.strictEqual(
      getWordMindMapUrl('collaborate', '/word/collaborate?level=essential'),
      '/mind-map?word=collaborate&from=%2Fword%2Fcollaborate%3Flevel%3Dessential'
    );
    // Rejects external or protocol-relative return paths
    assert.strictEqual(
      getWordMindMapUrl('collaborate', 'https://evil.example'),
      '/mind-map?word=collaborate'
    );
    assert.strictEqual(
      getWordMindMapUrl('collaborate', '//evil.example'),
      '/mind-map?word=collaborate'
    );

    assert.strictEqual(getSafeReturnPath('/word/collaborate'), '/word/collaborate');
    assert.strictEqual(getSafeReturnPath('/flashcards'), '/flashcards');
    assert.strictEqual(getSafeReturnPath('https://evil.example'), '/categories');
    assert.strictEqual(getSafeReturnPath('//evil.example', '/'), '/');
    assert.strictEqual(getSafeReturnPath(null), '/categories');
  });
});
