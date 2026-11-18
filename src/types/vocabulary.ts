export type WordLevel = 'essential' | 'intermediate' | 'advanced';

export type WordSortOption =
  | 'default'
  | 'popularity-desc'
  | 'popularity-asc'
  | 'daily-desc'
  | 'daily-asc'
  | 'alpha-asc'
  | 'alpha-desc';

export interface VocabularyWord {
  // Identity
  id: string;
  word: string;
  partOfSpeech: string[];
  category: CategoryId;
  level: WordLevel;
  toeicFrequency: number;
  dailyFrequency?: number;

  // 🔤 Pronunciation
  pronunciation: {
    ipa: string;
    audioUrl?: string;
    syllableBreakdown: string;
    stressPattern: string;
    commonMistakes?: string;
  };

  // 📜 Etymology & Origin
  etymology: {
    origin: string;
    rootWord: string;
    rootMeaning: string;
    evolution: string;
    relatedLanguages?: string[];
    firstRecordedUse?: string;
  };

  // 🧠 Deep Meaning (NOT Vietnamese translation)
  deepMeaning: {
    coreConcept: string;
    spatialContext: string;
    temporalContext: string;
    emotionalTone: string;
    formalityLevel: 'formal' | 'neutral' | 'informal';
    connotation: 'positive' | 'neutral' | 'negative';
  };

  // 🗣️ Native Speaker Mindset
  nativeMindset: {
    howNativesThink: string;
    mentalImage: string;
    whenToUse: string;
    whenNotToUse: string;
    culturalContext?: string;
  };

  // 📝 Real-World Examples
  examples: {
    daily: string[];
    business: string[];
    conversation: string[];
    collocations: string[];
  };

  // 🔗 Word Family
  wordFamily: {
    noun?: string;
    verb?: string;
    adjective?: string;
    adverb?: string;
  };

  // 🖼️ Visual Association
  visual: {
    imageKeyword: string;
    imageDescription: string;
    mnemonic?: string;
    imageUrl?: string;
  };

  // 🎬 Video
  video?: {
    youtubeId?: string;
    timestamp?: number;
    description: string;
  };

  // 📚 TOEIC Context
  toeicContext: {
    commonParts: number[];
    exampleQuestion?: string;
    tips?: string;
  };

  // Related words
  synonyms: string[];
  antonyms: string[];
  relatedWords: string[];
}

export type CategoryId =
  | 'office-admin'
  | 'Office & Administration'
  | 'hr-personnel'
  | 'Personnel & HR'
  | 'finance'
  | 'Finance & Budgeting'
  | 'purchasing'
  | 'Purchasing & Contracts'
  | 'travel'
  | 'Travel & Transport'
  | 'marketing'
  | 'Marketing & Sales'
  | 'technology'
  | 'manufacturing'
  | 'health'
  | 'dining'
  | 'real-estate'
  | 'communications'
  | 'legal'
  | (string & {});

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  icon: string;
  wordCount: number;
  color: string;
}
