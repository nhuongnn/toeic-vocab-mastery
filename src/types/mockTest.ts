export type TestType = 'mini-reading' | 'full-reading' | 'mini-listening' | 'full-mock';
export type PartNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface PartConfig {
  part: PartNumber;
  questionCount: number;
  instructions: string;
  timeRecommendation: number; // in seconds
}

export interface MockTestConfig {
  id: string;
  type: TestType;
  title: string;
  description: string;
  timeLimit: number; // in seconds
  parts: PartConfig[];
  totalQuestions: number;
}

// Part 5: Incomplete Sentences
export interface Part5Question {
  id: string;
  part: 5;
  passage: string; // sentence with ____
  blankPosition?: number;
  options: string[]; // 4 choices (A, B, C, D)
  correctAnswer: number; // 0 - 3
  explanation: string;
  skillTested: 'vocabulary' | 'grammar' | 'collocation';
  relatedWordIds: string[]; // link to vocabulary database
  difficulty: 'easy' | 'medium' | 'hard';
}

// Part 6: Text Completion
export interface Part6QuestionItem {
  id: string;
  blankNumber: number; // [1], [2], [3], [4]
  options: string[];
  correctAnswer: number;
  explanation: string;
  type: 'vocabulary' | 'grammar' | 'sentence-insertion';
  relatedWordIds?: string[];
}

export interface Part6Question {
  id: string;
  part: 6;
  passageType: string; // 'email', 'letter', 'article', 'notice', 'memo'
  passage: string; // text with numbered blanks [1], [2], [3], [4]
  questions: Part6QuestionItem[];
}

// Part 7: Reading Comprehension
export interface Part7SubQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  questionType: 'main-idea' | 'detail' | 'inference' | 'vocabulary' | 'intent';
  relatedWordIds?: string[];
}

export interface Part7Passage {
  type: string; // 'email', 'advertisement', 'article', 'schedule', 'memo'
  content: string;
}

export interface Part7Question {
  id: string;
  part: 7;
  passageType: 'single' | 'double' | 'triple';
  passages: Part7Passage[];
  questions: Part7SubQuestion[];
}

export type MockTestQuestion = Part5Question | Part6Question | Part7Question;

// Flattened item for the test runner
export interface FlattenedQuestion {
  id: string;
  part: PartNumber;
  questionNumber: number; // Global question number (1..total)
  subIndex?: number; // For part 6 or 7
  parentQuestion: MockTestQuestion;
  prompt: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  skillTested?: string;
  relatedWordIds?: string[];
}

// Test Session State
export interface MockTestSession {
  testId: string;
  config: MockTestConfig;
  startedAt: string;
  answers: Record<string, number | null>; // questionId -> selectedOption
  currentPart: PartNumber;
  currentQuestionIndex: number;
  timeRemaining: number;
  isCompleted: boolean;
  isPaused: boolean;
  flaggedQuestions: string[]; // questionIds marked for review
}

// Test Result
export interface PartScore {
  part: PartNumber;
  correct: number;
  total: number;
  percentage: number;
}

export interface SkillBreakdown {
  skill: string;
  correct: number;
  total: number;
  percentage: number;
}

export interface WrongAnswerItem {
  questionId: string;
  part: PartNumber;
  questionText: string;
  options: string[];
  yourAnswer: number | null;
  correctAnswer: number;
  explanation: string;
  relatedWordIds?: string[];
}

export interface MockTestResult {
  testId: string;
  sessionId: string;
  title: string;
  type: TestType;
  completedAt: string;
  timeTaken: number; // in seconds
  totalScore: number; // estimated TOEIC Reading score (5 - 495)
  totalCorrect: number;
  totalQuestions: number;
  accuracy: number;
  partScores: PartScore[];
  skillBreakdown: SkillBreakdown[];
  wrongAnswers: WrongAnswerItem[];
}
