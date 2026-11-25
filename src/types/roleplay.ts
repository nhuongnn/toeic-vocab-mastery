export type CharacterRole =
  | 'colleague'
  | 'boss'
  | 'staff'
  | 'friend'
  | 'family'
  | 'lover'
  | 'interviewer'
  | 'stranger';

export type CharacterGender = 'male' | 'female' | 'other';

export interface CharacterConfig {
  name: string;
  role: CharacterRole;
  gender: CharacterGender;
  age: number;
  department: string;
  avatar: string;
  personality: string;
}

export type ScenarioLevel = 'essential' | 'intermediate' | 'advanced';

export interface KeyPhrase {
  phrase: string;
  meaning: string;
  usageTip?: string;
}

export interface RoleplayScenario {
  id: string;
  title: string;
  englishTitle?: string;
  vietnameseTitle: string;
  description: string;
  role: CharacterRole;
  level: ScenarioLevel;
  targetScoreRange: string; // e.g. "450 - 600", "650 - 750", "800+"
  department: string;
  category?: string;
  objective: string; // Mục tiêu cần đạt được trong cuộc hội thoại
  initialMessage: string;
  initialTranslation: string;
  suggestedVocabulary: string[];
  keyPhrases: KeyPhrase[];
  isCustom?: boolean;
}

export interface RoleplayMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  translation?: string;
  timestamp: number;
  provider?: 'gemini' | 'cloudflare';
  isFallback?: boolean;
  fallbackReason?: string;
  isError?: boolean;
  errorMessage?: string;
  feedback?: {
    correction?: string;
    betterPhrasing?: string;
    explanation?: string;
  };
}

export interface RoleplaySuggestion {
  id: string;
  type: 'formal' | 'casual' | 'clarifying';
  label: string; // e.g., "Trang trọng & Lịch sự", "Tự nhiên & Thân mật", "Hỏi để làm rõ"
  english: string;
  vietnamese: string;
  explanation: string;
  keyVocabulary?: string[];
}

export interface UserLearningContext {
  targetScore: number;
  currentLevel: string;
  dailyMinutes: number;
  totalWordsLearned: number;
  estimatedToeicScore: number;
  recentWords: string[];
  focusCategories: string[];
}

export interface RoleplaySessionSummary {
  scenarioTitle: string;
  characterName: string;
  characterRole: CharacterRole;
  messageCount: number;
  durationSeconds: number;
  targetScore: number;
  feedbackOverall: string;
  scoreEstimate: number;
  vocabularyUsed: string[];
  completedAt: string;
}

export interface RoleplayConversation {
  id: string;
  title: string;
  character: CharacterConfig;
  scenario: RoleplayScenario;
  userAvatar?: string;
  userName?: string;
  messages: RoleplayMessage[];
  translations?: Record<string, string>;
  createdAt: number;
  updatedAt: number;
  messageCount: number;
  lastMessageSnippet?: string;
  summary?: RoleplaySessionSummary;
  isAutoBubble?: boolean;
}

