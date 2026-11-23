export type Role = 'user' | 'assistant' | 'system';

export type AIProvider = 'gemini' | 'cloudflare';

export type AIModelPreference = 'auto' | 'gemini' | 'cloudflare';

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
  provider?: AIProvider;
  isFallback?: boolean;
  fallbackReason?: string;
  isError?: boolean;
  errorMessage?: string;
}

export interface WordContext {
  word: string;
  selectedText?: string;
  category?: string;
  level?: string;
  meaning?: string;
  ipa?: string;
  partOfSpeech?: string[];
  examples?: Array<{ english: string; vietnamese: string }>;
  etymology?: {
    origin?: string;
    evolution?: string;
    rootBreakdown?: Array<{ prefix?: string; root?: string; suffix?: string; meaning?: string }>;
  };
  toeicTips?: {
    part5Traps?: string[];
    collocations?: string[];
    frequencyScore?: number;
  };
  synonyms?: string[];
  antonyms?: string[];
}

export interface ChatRequestPayload {
  messages: Array<{
    role: Role;
    content: string;
  }>;
  wordContext?: WordContext;
  providerPreference?: AIModelPreference;
  userId?: string;
  userEmail?: string;
  guestId?: string;
}

export interface StreamMetaEvent {
  type: 'meta';
  provider: AIProvider;
  model: string;
  fallback: boolean;
  reason?: string;
}

export interface StreamContentEvent {
  type: 'content';
  text: string;
}

export interface StreamErrorEvent {
  type: 'error';
  message: string;
  provider?: AIProvider;
  code?: 'GUEST_LIMIT_REACHED' | 'USER_LIMIT_REACHED' | 'SYSTEM_LIMIT_REACHED' | 'AI_DISABLED';
  limit?: number;
  usedToday?: number;
  isGuest?: boolean;
}

export interface StreamDoneEvent {
  type: 'done';
}

export type StreamEvent =
  | StreamMetaEvent
  | StreamContentEvent
  | StreamErrorEvent
  | StreamDoneEvent;

export interface AiTutorConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  wordContext?: WordContext | null;
  createdAt: number;
  updatedAt: number;
  messageCount: number;
  lastMessageSnippet?: string;
}
