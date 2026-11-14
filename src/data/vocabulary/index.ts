import { VocabularyWord, CategoryId } from '@/types/vocabulary';
import { officeAdminWords } from './office-admin';
import { financeWords } from './finance';
import { marketingWords } from './marketing';
import { hrPersonnelWords } from './hr-personnel';
import { travelWords } from './travel';
import { purchasingWords } from './purchasing';
import { technologyWords } from './technology';
import { manufacturingWords } from './manufacturing';
import { realEstateWords } from './real-estate';
import { diningWords } from './dining';
import { healthWords } from './health';
import { communicationsWords } from './communications';
import { legalWords } from './legal';

export const allVocabularyWords: VocabularyWord[] = [
  ...officeAdminWords,
  ...financeWords,
  ...marketingWords,
  ...hrPersonnelWords,
  ...travelWords,
  ...purchasingWords,
  ...technologyWords,
  ...manufacturingWords,
  ...realEstateWords,
  ...diningWords,
  ...healthWords,
  ...communicationsWords,
  ...legalWords,
];

export const wordsById: Record<string, VocabularyWord> = allVocabularyWords.reduce(
  (acc, word) => {
    acc[word.id.toLowerCase()] = word;
    return acc;
  },
  {} as Record<string, VocabularyWord>
);

export function getWordById(id: string): VocabularyWord | undefined {
  return wordsById[id.toLowerCase()];
}

export function getWordsByCategory(category: CategoryId): VocabularyWord[] {
  return allVocabularyWords.filter((w) => w.category === category);
}

export function getRandomWords(count: number, excludeId?: string): VocabularyWord[] {
  const pool = excludeId
    ? allVocabularyWords.filter((w) => w.id !== excludeId)
    : [...allVocabularyWords];

  // Fisher-Yates shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, count);
}

export function getWordOfTheDay(): VocabularyWord {
  // Deterministic word based on day of the year
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  const index = dayOfYear % allVocabularyWords.length;
  return allVocabularyWords[index] || allVocabularyWords[0];
}

// Category exports for selective usage
export {
  officeAdminWords,
  financeWords,
  marketingWords,
  hrPersonnelWords,
  travelWords,
  purchasingWords,
  technologyWords,
  manufacturingWords,
  realEstateWords,
  diningWords,
  healthWords,
  communicationsWords,
  legalWords,
};
