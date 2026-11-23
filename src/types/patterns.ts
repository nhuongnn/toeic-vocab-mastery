export type PatternCategory =
  | 'daily'
  | 'toeic-workplace'
  | 'meetings'
  | 'email-diplomacy'
  | 'socializing';

export interface PatternExample {
  en: string;
  vi: string;
  context: 'daily' | 'workplace' | 'toeic';
  speaker?: string;
  note?: string;
}

export interface PatternCommonMistake {
  wrong: string;
  correct: string;
  explanation: string;
}

export interface SentencePattern {
  id: string;
  title: string;
  titleVi: string;
  category: PatternCategory;
  categoryVi: string;
  frequency: '★★★★★' | '★★★★☆';
  patternFormula: string;
  nativeMindset: string;
  whenToUse: string;
  examples: PatternExample[];
  commonMistakes: PatternCommonMistake[];
  toeicContext: {
    parts: string[];
    tip: string;
  };
}

export type CollocationType =
  | 'verb-noun'
  | 'adjective-noun'
  | 'verb-preposition'
  | 'adverb-adjective'
  | 'noun-noun';

export type CollocationCategory =
  | 'business-work'
  | 'daily-social'
  | 'contracts-law'
  | 'marketing-sales'
  | 'finance-budget';

export interface Collocation {
  id: string;
  phrase: string;
  phraseVi: string;
  type: CollocationType;
  typeVi: string;
  category: CollocationCategory;
  categoryVi: string;
  level: 'essential' | 'intermediate' | 'advanced';
  definition: string;
  commonMistake: {
    wrong: string;
    correct: string;
    tip: string;
  };
  examples: {
    en: string;
    vi: string;
    context: 'daily' | 'toeic' | 'workplace';
  }[];
  toeicTip: string;
}

export type IdiomCategory =
  | 'workplace'
  | 'daily'
  | 'strategy'
  | 'relationships';

export type IdiomFormality = 'casual' | 'neutral' | 'workplace-friendly';

export interface Idiom {
  id: string;
  idiom: string;
  idiomVi: string;
  literalMeaning: string;
  figurativeMeaning: string;
  originMentalImage: string;
  formality: IdiomFormality;
  category: IdiomCategory;
  categoryVi: string;
  dialogue: {
    speakerA: string;
    speakerB: string;
    context: string;
  };
  examples: {
    en: string;
    vi: string;
    context: 'daily' | 'workplace' | 'toeic';
  }[];
  toeicContext: {
    parts: string[];
    tip: string;
  };
}

export interface PracticeQuizItem {
  id: string;
  type: 'pattern' | 'collocation' | 'idiom';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  tag: string;
}
