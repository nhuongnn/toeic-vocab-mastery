import { CategoryId } from './vocabulary';

export interface SRSCard {
  wordId: string;
  repetitions: number;      // Consecutive successful reviews
  interval: number;         // Days until next review
  easinessFactor: number;   // EF: difficulty score (default: 2.5, min: 1.3)
  nextReview: string;       // ISO date string
  lastReview?: string;      // ISO date string
  history?: {
    date: string;
    quality: number;
  }[];
}

export interface UserStats {
  totalWordsLearned: number;
  totalReviews: number;
  currentStreak: number;        // consecutive days studied
  longestStreak: number;
  lastStudyDate: string;        // YYYY-MM-DD
  dailyGoal: number;            // words per day target (e.g., 10)
  estimatedToeicScore: number;  // dynamic estimate (400 - 850+)
}

export interface ExerciseSessionResult {
  date: string;
  type: 'quiz' | 'fill-blank' | 'listening' | 'matching' | 'context-builder';
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  wordsPracticed: string[];
}

export interface UserPreferences {
  dailyGoal: number;
  immersiveOnly: boolean;       // strictly no translation
  autoPlayPronunciation: boolean;
  speechRate: number;           // 0.8 to 1.0 (default 0.9 for clarity)
  speechAccent: 'en-US' | 'en-GB';
  theme: 'light' | 'dark' | 'system';
}

export interface UserProgressData {
  version: number;
  cards: Record<string, SRSCard>;
  stats: UserStats;
  history: ExerciseSessionResult[];
  preferences: UserPreferences;
  bookmarkedWordIds: string[];
}
