import { toBaseForm, cleanWordForOxford, getBaseFormInfo, isBaseForm, isSingleWord } from '@/lib/lemmatizer';

export type DictionaryProvider = 'cambridge' | 'oxford';

export interface DictionaryOption {
  id: DictionaryProvider;
  name: string;
  shortName: string;
  tagline: string;
  badge: string;
  description: string;
  baseUrl: string;
  accentColor: string;
}

export const DICTIONARY_OPTIONS: Record<DictionaryProvider, DictionaryOption> = {
  cambridge: {
    id: 'cambridge',
    name: 'Cambridge Dictionary',
    shortName: 'Cambridge',
    tagline: 'Cambridge Advanced Learner’s Dictionary',
    badge: 'Cambridge',
    description: 'Định nghĩa rõ ràng, câu ví dụ thực tế và giải thích ngữ nghĩa Anh - Anh chuẩn xác.',
    baseUrl: 'https://dictionary.cambridge.org/dictionary/english/',
    accentColor: '#f59e0b',
  },
  oxford: {
    id: 'oxford',
    name: "Oxford Learner's Dictionaries",
    shortName: 'Oxford',
    tagline: 'Oxford Advanced Learner’s Dictionary (OALD)',
    badge: 'Oxford OALD',
    description: 'Phân tích cấp độ từ (A1-C2), collocations, mẫu câu và phát âm chuẩn Oxford.',
    baseUrl: 'https://www.oxfordlearnersdictionaries.com/definition/english/',
    accentColor: '#0284c7',
  },
};

/**
 * Normalizes a word or phrase for dictionary lookup URLs.
 * Replaces spaces with hyphens (e.g. "raw material" -> "raw-material").
 */
export function cleanWordForDictionary(word: string): string {
  return word
    .trim()
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/\s+/g, '-');
}

/**
 * Generates Cambridge English Dictionary URL for the word.
 */
export function getCambridgeUrl(word: string): string {
  const clean = cleanWordForDictionary(word);
  return `https://dictionary.cambridge.org/dictionary/english/${encodeURIComponent(clean)}`;
}

/**
 * Generates Oxford Learner's Dictionaries URL for the word.
 * Automatically converts inflected word forms to their uninflected base lemma (nguyên mẫu)
 * ONLY when a single word is selected.
 * If user selected an entire passage or multiple words, preserves original text and searches on Oxford.
 */
export function getOxfordUrl(word: string): string {
  if (!word || !word.trim()) {
    return 'https://www.oxfordlearnersdictionaries.com/';
  }

  const trimmed = word.trim();

  // If user selected multiple words / a whole passage: do NOT convert to base form!
  // Route to Oxford's search URL with the original text intact.
  if (!isSingleWord(trimmed)) {
    const cleanPassage = trimmed.replace(/\s+/g, ' ');
    return `https://www.oxfordlearnersdictionaries.com/search/english/?q=${encodeURIComponent(cleanPassage)}`;
  }

  // Single word: convert to base form (lemma)
  const lemma = toBaseForm(trimmed);
  const clean = lemma
    .toLowerCase()
    .replace(/['’]/g, '');

  return `https://www.oxfordlearnersdictionaries.com/definition/english/${encodeURIComponent(clean)}`;
}

/**
 * Generates dictionary URL based on the specified provider.
 */
export function getDictionaryUrl(
  word: string,
  provider: DictionaryProvider = 'cambridge'
): string {
  return provider === 'oxford' ? getOxfordUrl(word) : getCambridgeUrl(word);
}

// Re-export lemmatizer helpers for components
export { toBaseForm, cleanWordForOxford, getBaseFormInfo, isBaseForm, isSingleWord };

