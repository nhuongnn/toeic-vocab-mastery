import { OnboardingState } from './onboarding';
import { CharacterConfig, RoleplayScenario, RoleplayConversation } from './roleplay';
import { AiTutorConversation } from '@/lib/ai/types';
import { CustomVocabItem } from './custom-vocab';

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
  speechRate: number;           // 0.75 to 1.25 (default 0.9 for clarity)
  speechAccent: 'en-US' | 'en-GB' | 'en-AU';
  theme: 'light' | 'dark' | 'system';
  language?: 'vi' | 'en';
  preferredDictionary?: 'cambridge' | 'oxford';
}

export interface RoleplayPreferences {
  character?: CharacterConfig;
  scenarioId?: string;
  customScenarios?: RoleplayScenario[];
  userAvatar?: string;
  userName?: string;
  updatedAt?: string;
  chatHistory?: RoleplayConversation[];
}

export interface UserProgressData {
  version: number;
  cards: Record<string, SRSCard>;
  stats: UserStats;
  history: ExerciseSessionResult[];
  preferences: UserPreferences;
  bookmarkedWordIds: string[];
  onboarding?: OnboardingState;
  roleplay?: RoleplayPreferences;
  aiTutorHistory?: AiTutorConversation[];
  customItems?: CustomVocabItem[];
  deletedCustomItemIds?: string[];
}
