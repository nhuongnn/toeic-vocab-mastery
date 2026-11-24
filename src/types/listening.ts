export type ListeningPart = 1 | 2 | 3 | 4;
export type ListeningAccent = 'en-US' | 'en-GB' | 'en-AU';

export interface Part1Option {
  label: 'A' | 'B' | 'C' | 'D';
  text: string;
  ipa?: string;
  translationVi: string;
}

export interface Part1Question {
  id: string;
  part: 1;
  title: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  sceneDescriptionVi: string;
  options: Part1Option[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanationVi: string;
  trapType: 'wrong-action' | 'wrong-subject' | 'distractor-sound' | 'state-vs-action' | 'over-generalization';
  trapExplanationVi: string;
  keyVocabulary: {
    word: string;
    meaning: string;
    phonetic: string;
  }[];
  accent: ListeningAccent;
}

export interface Part2Option {
  label: 'A' | 'B' | 'C';
  text: string;
  translationVi: string;
}

export interface Part2Question {
  id: string;
  part: 2;
  promptQuestion: string;
  promptQuestionVi: string;
  promptType:
    | 'Wh-Question (Indirect Response)'
    | 'Wh-Question (Direct Answer)'
    | 'Yes/No Question'
    | 'Tag Question (Câu hỏi đuôi)'
    | 'Suggestion / Offer'
    | 'Statement (Phát biểu tình huống)'
    | 'Choice Question (A or B)';
  options: Part2Option[];
  correctAnswer: 'A' | 'B' | 'C';
  explanationVi: string;
  trapAnalysis: {
    trapName: string;
    distractors: {
      label: 'A' | 'B' | 'C';
      reason: string;
    }[];
  };
  keyVocabulary: {
    word: string;
    meaning: string;
  }[];
  accent: ListeningAccent;
  context: string;
}

export interface Part3SubQuestion {
  id: string;
  questionNumber: number;
  questionEn: string;
  questionVi: string;
  options: string[];
  correctAnswer: number; // 0 - 3
  explanationVi: string;
  questionType: 'main-idea' | 'detail' | 'inference-intent' | 'graphic' | 'next-action';
}

export interface DialogueTurn {
  speaker: string;
  speakerRole?: string;
  text: string;
  textVi: string;
  accent?: ListeningAccent;
}

export interface Part3Conversation {
  id: string;
  part: 3;
  topic: string;
  contextVi: string;
  isThreeWay?: boolean;
  speakers: {
    name: string;
    role: string;
    accent: ListeningAccent;
  }[];
  dialogue: DialogueTurn[];
  fullAudioText: string;
  graphicInfo?: {
    title: string;
    headers: string[];
    rows: string[][];
    note?: string;
  };
  questions: Part3SubQuestion[];
  keyVocabulary: {
    word: string;
    meaning: string;
    phonetic: string;
  }[];
  practicalListeningTip: string;
}

export interface Part4SubQuestion {
  id: string;
  questionNumber: number;
  questionEn: string;
  questionVi: string;
  options: string[];
  correctAnswer: number; // 0 - 3
  explanationVi: string;
  questionType: 'purpose' | 'detail' | 'speaker-intent' | 'next-step';
}

export interface Part4ShortTalk {
  id: string;
  part: 4;
  talkType:
    | 'airport-announcement'
    | 'voicemail'
    | 'corporate-keynote'
    | 'radio-broadcast'
    | 'tour-guide'
    | 'facility-briefing';
  topic: string;
  contextVi: string;
  speaker: {
    name: string;
    title: string;
    accent: ListeningAccent;
  };
  script: string;
  scriptVi: string;
  questions: Part4SubQuestion[];
  keyVocabulary: {
    word: string;
    meaning: string;
    phonetic: string;
  }[];
  practicalListeningTip: string;
}

export interface VideoDictationTask {
  id: string;
  segmentTitle: string;
  audioTimestamp: number;
  contextLeadIn: string;
  blankText: string;
  contextFollowUp: string;
  hint: string;
  ipa: string;
  speechTipVi: string;
}

export interface VideoTranscriptLine {
  time: string;
  speaker: string;
  en: string;
  vi: string;
}

export interface VideoListeningExercise {
  id: string;
  title: string;
  titleVi: string;
  category: string;
  categoryId?: string;
  level: 'Intermediate' | 'Upper-Intermediate' | 'Advanced';
  youtubeId: string;
  startTimestamp: number;
  endTimestamp: number;
  durationSeconds: number;
  scenarioDescriptionVi: string;
  realWorldContext: string;
  nativeSpeechHacks: {
    hackTitle: string;
    pattern: string;
    realWorldUsage: string;
    listeningSecret: string;
  }[];
  comprehensionQuestions: {
    id: string;
    questionEn: string;
    questionVi: string;
    options: string[];
    correctAnswer: number;
    explanationVi: string;
  }[];
  dictationTasks: VideoDictationTask[];
  fullTranscript: VideoTranscriptLine[];
}

export type ListeningSessionMode = 'full-simulation' | 'part1' | 'part2' | 'part3' | 'part4' | 'video-lab';
