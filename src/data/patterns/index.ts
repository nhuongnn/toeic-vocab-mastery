import { sentencePatterns } from './sentence-patterns';
import { collocations } from './collocations';
import { idioms } from './idioms';
import { practiceQuizzes } from './quizzes';
import {
  SentencePattern,
  Collocation,
  Idiom,
  PracticeQuizItem,
  PatternCategory,
  CollocationType,
  CollocationCategory,
  IdiomCategory,
} from '@/types/patterns';

export * from './sentence-patterns';
export * from './collocations';
export * from './idioms';
export * from './quizzes';

// Aggregated Stats
export const patternsStats = {
  totalSentencePatterns: sentencePatterns.length,
  totalCollocations: collocations.length,
  totalIdioms: idioms.length,
  totalQuizzes: practiceQuizzes.length,
};

// Filter Helpers
export function getPatternsByCategory(category: PatternCategory): SentencePattern[] {
  return sentencePatterns.filter((p) => p.category === category);
}

export function getCollocationsByType(type: CollocationType): Collocation[] {
  return collocations.filter((c) => c.type === type);
}

export function getCollocationsByCategory(category: CollocationCategory): Collocation[] {
  return collocations.filter((c) => c.category === category);
}

export function getIdiomsByCategory(category: IdiomCategory): Idiom[] {
  return idioms.filter((i) => i.category === category);
}

// Random Generator for Practice / Daily Spotlight
export function getRandomSentencePattern(): SentencePattern {
  return sentencePatterns[Math.floor(Math.random() * sentencePatterns.length)] || sentencePatterns[0];
}

export function getRandomCollocation(): Collocation {
  return collocations[Math.floor(Math.random() * collocations.length)] || collocations[0];
}

export function getRandomIdiom(): Idiom {
  return idioms[Math.floor(Math.random() * idioms.length)] || idioms[0];
}
