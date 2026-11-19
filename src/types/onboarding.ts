import { WordLevel, CategoryId } from './vocabulary';

export interface PlacementQuestion {
  id: string;
  word: string;
  wordId: string;
  level: WordLevel;
  difficulty: number; // 1 - 10
  type: 'meaning' | 'usage' | 'fill-blank';
  question: string;
  options: string[];
  correctAnswer: number; // 0 - 3
  explanation: string;
}

export interface PlacementAnswer {
  questionId: string;
  difficulty: number;
  level: WordLevel;
  selectedAnswer: number;
  isCorrect: boolean;
  timeTaken: number;
}

export interface PlacementResult {
  level: WordLevel;
  score: number;
  questionsAnswered: number;
  correctAnswers: number;
  accuracy: number;
  testedQuestions: PlacementAnswer[];
}

export interface LearningPhase {
  id: string;
  title: string;
  description: string;
  categoryIds: CategoryId[];
  wordLevel: WordLevel;
  targetWords: number;
  estimatedDays: number;
  milestones: {
    wordsLearned: number;
    description: string;
    reward: string;
  }[];
}

export interface LearningPath {
  userId?: string;
  targetScore: number;
  currentLevel: WordLevel;
  dailyGoal: number; // minutes per day
  phases: LearningPhase[];
  estimatedCompletionDate: string;
  recommendedCategory: CategoryId;
}

export interface TourStep {
  target: string; // CSS selector e.g. '[data-tour="dashboard-score"]'
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  highlight?: boolean;
}

export type OnboardingStep =
  | 'welcome'
  | 'goal'
  | 'schedule'
  | 'experience'
  | 'placement'
  | 'result';

export interface OnboardingState {
  isCompleted: boolean;
  currentStep: OnboardingStep;
  targetScore: number | null;
  dailyMinutes: number | null;
  experienceLevel: 'beginner' | 'intermediate' | 'experienced' | null;
  placementResult: PlacementResult | null;
  learningPath: LearningPath | null;
  tourCompleted: boolean;
  completedAt?: string;
}
