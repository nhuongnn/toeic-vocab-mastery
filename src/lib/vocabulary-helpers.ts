import { VocabularyWord, WordLevel, WordSortOption, CategoryId } from '@/types/vocabulary';

/**
 * Normalizes TOEIC popularity to a 0-100 percentage integer.
 * Supports datasets where toeicFrequency is 1-10 or 0-100.
 */
export function getWordPopularity(word: VocabularyWord): number {
  if (typeof word.toeicFrequency !== 'number' || isNaN(word.toeicFrequency)) {
    return 70;
  }
  const val = word.toeicFrequency;
  const normalized = val <= 10 ? val * 10 : val;
  return Math.min(100, Math.max(10, Math.round(normalized)));
}

/**
 * Returns TOEIC popularity as a 0-10 score (e.g., 9.2).
 */
export function getWordPopularityScore(word: VocabularyWord): number {
  const pop = getWordPopularity(word);
  return Math.round((pop / 10) * 10) / 10;
}

/**
 * Calculates frequency in daily communication on a 0-100 scale.
 * Prioritizes explicit dailyFrequency if present.
 * Otherwise computes a reliable score based on:
 * - Word level (essential > intermediate > advanced)
 * - Formality level (informal > neutral > formal)
 * - Presence of daily & conversational real-world examples
 * - Blended with general popularity
 */
export function getDailyCommunicationFrequency(word: VocabularyWord): number {
  if (typeof word.dailyFrequency === 'number' && !isNaN(word.dailyFrequency) && word.dailyFrequency > 0) {
    const df = word.dailyFrequency;
    return Math.min(100, Math.max(10, Math.round(df <= 10 ? df * 10 : df)));
  }

  // Base tier from vocabulary mastery level
  let base = 65;
  if (word.level === 'essential') {
    base = 86;
  } else if (word.level === 'intermediate') {
    base = 66;
  } else if (word.level === 'advanced') {
    base = 46;
  }

  // Spoken formality modifier
  const formality = word.deepMeaning?.formalityLevel;
  if (formality === 'informal') {
    base += 10;
  } else if (formality === 'neutral') {
    base += 3;
  } else if (formality === 'formal') {
    base -= 12;
  }

  // Presence of daily & conversation examples
  const dailyCount = word.examples?.daily?.length || 0;
  const convCount = word.examples?.conversation?.length || 0;
  if (dailyCount >= 2) base += 4;
  if (convCount >= 2) base += 4;

  // Blend with general popularity (15% weight)
  const popularity = getWordPopularity(word);
  const blended = Math.round(base * 0.85 + popularity * 0.15);

  return Math.min(100, Math.max(15, blended));
}

/**
 * Returns daily communication frequency as a 0-10 score (e.g., 8.5).
 */
export function getDailyCommunicationScore(word: VocabularyWord): number {
  const df = getDailyCommunicationFrequency(word);
  return Math.round((df / 10) * 10) / 10;
}

/**
 * Sorts an array of VocabularyWord based on the selected option.
 */
export function sortVocabularyWords(
  words: VocabularyWord[],
  sortBy: WordSortOption
): VocabularyWord[] {
  const copy = [...words];

  switch (sortBy) {
    case 'popularity-desc':
      return copy.sort((a, b) => getWordPopularity(b) - getWordPopularity(a));

    case 'popularity-asc':
      return copy.sort((a, b) => getWordPopularity(a) - getWordPopularity(b));

    case 'daily-desc':
      return copy.sort((a, b) => getDailyCommunicationFrequency(b) - getDailyCommunicationFrequency(a));

    case 'daily-asc':
      return copy.sort((a, b) => getDailyCommunicationFrequency(a) - getDailyCommunicationFrequency(b));

    case 'alpha-asc':
      return copy.sort((a, b) => a.word.localeCompare(b.word));

    case 'alpha-desc':
      return copy.sort((a, b) => b.word.localeCompare(a.word));

    case 'default':
    default:
      return copy;
  }
}

/**
 * Filters vocabulary words by category, level, and search term.
 */
export function filterVocabularyWords(
  words: VocabularyWord[],
  filters: {
    category?: CategoryId | 'all';
    level?: WordLevel | 'all';
    search?: string;
  }
): VocabularyWord[] {
  const { category = 'all', level = 'all', search = '' } = filters;
  const cleanSearch = search.trim().toLowerCase();

  return words.filter((w) => {
    // Category check
    if (category !== 'all' && w.category !== category) {
      const normW = w.category.toLowerCase().replace(/[^a-z0-9]/g, '');
      const normFilter = category.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (normW !== normFilter) {
        return false;
      }
    }

    // Level check
    if (level !== 'all' && w.level !== level) {
      return false;
    }

    // Search query check
    if (cleanSearch) {
      const matchWord = w.word.toLowerCase().includes(cleanSearch);
      const matchConcept = w.deepMeaning?.coreConcept?.toLowerCase().includes(cleanSearch);
      const matchRoot = w.etymology?.rootWord?.toLowerCase().includes(cleanSearch);
      const matchPos = w.partOfSpeech?.some((p) => p.toLowerCase().includes(cleanSearch));
      const matchSynonyms = w.synonyms?.some((s) => s.toLowerCase().includes(cleanSearch));

      if (!matchWord && !matchConcept && !matchRoot && !matchPos && !matchSynonyms) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Visual styling and metadata configuration for levels.
 */
export const LEVEL_CONFIG: Record<
  WordLevel,
  {
    label: string;
    shortLabel: string;
    badgeClass: string;
    activeBgClass: string;
    pillBorderClass: string;
    dotColor: string;
    description: string;
  }
> = {
  essential: {
    label: 'Essential (Căn bản)',
    shortLabel: 'Essential',
    badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    activeBgClass: 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-500/20',
    pillBorderClass: 'border-emerald-500/30 hover:border-emerald-500/60',
    dotColor: 'bg-emerald-400',
    description: 'Từ vựng cốt lõi, thường gặp nhất trong đời sống & đề thi',
  },
  intermediate: {
    label: 'Intermediate (Trung cấp)',
    shortLabel: 'Intermediate',
    badgeClass: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    activeBgClass: 'bg-sky-600 text-white border-sky-500 shadow-lg shadow-sky-500/20',
    pillBorderClass: 'border-sky-500/30 hover:border-sky-500/60',
    dotColor: 'bg-sky-400',
    description: 'Từ vựng công sở chuẩn mực, họp hành và thương thảo',
  },
  advanced: {
    label: 'Advanced (Nâng cao)',
    shortLabel: 'Advanced',
    badgeClass: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    activeBgClass: 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/20',
    pillBorderClass: 'border-purple-500/30 hover:border-purple-500/60',
    dotColor: 'bg-purple-400',
    description: 'Thuật ngữ chuyên sâu, báo cáo điều hành và văn phong học thuật',
  },
};

/**
 * Sort options definition with display labels and grouping.
 */
export const SORT_OPTIONS: {
  id: WordSortOption;
  label: string;
  shortLabel: string;
  category: 'default' | 'popularity' | 'daily' | 'alphabetical';
}[] = [
  {
    id: 'default',
    label: 'Mặc định (Thứ tự ban đầu)',
    shortLabel: 'Mặc định',
    category: 'default',
  },
  {
    id: 'popularity-desc',
    label: 'Độ phổ biến: Cao nhất (TOEIC Frequency ↓)',
    shortLabel: 'Độ phổ biến ↓',
    category: 'popularity',
  },
  {
    id: 'popularity-asc',
    label: 'Độ phổ biến: Thấp nhất (TOEIC Frequency ↑)',
    shortLabel: 'Độ phổ biến ↑',
    category: 'popularity',
  },
  {
    id: 'daily-desc',
    label: 'Giao tiếp hàng ngày: Hay dùng nhất (Daily Spoken ↓)',
    shortLabel: 'Giao tiếp hàng ngày ↓',
    category: 'daily',
  },
  {
    id: 'daily-asc',
    label: 'Giao tiếp hàng ngày: Ít gặp hơn (Daily Spoken ↑)',
    shortLabel: 'Giao tiếp hàng ngày ↑',
    category: 'daily',
  },
  {
    id: 'alpha-asc',
    label: 'Bảng chữ cái: A → Z',
    shortLabel: 'A → Z',
    category: 'alphabetical',
  },
  {
    id: 'alpha-desc',
    label: 'Bảng chữ cái: Z → A',
    shortLabel: 'Z → A',
    category: 'alphabetical',
  },
];
