export type CustomItemType = 'vocabulary' | 'pattern';

export interface CustomVocabMindMapRootInfo {
  root: string;
  meaning: string;
  origin?: string;
}

export interface CustomVocabMindMapData {
  coreConcept: string;
  ipa?: string;
  partOfSpeech?: string;
  rootInfo?: CustomVocabMindMapRootInfo;
  synonyms: string[];
  antonyms: string[];
  wordFamily: {
    noun?: string;
    verb?: string;
    adjective?: string;
    adverb?: string;
  };
  collocations: string[];
  relatedWords: string[];
  /** Concise Vietnamese gloss keyed by lowercased branch term */
  nodeNotes?: Record<string, string>;
  generatedAt: string;
  provider?: 'gemini' | 'cloudflare' | 'fallback';
  model?: string;
}

export interface CustomVocabItem {
  id: string;
  type: CustomItemType; // 5. Phân loại là từ vựng hoặc mẫu câu
  text: string;         // 1. Từ vựng hoặc mẫu câu
  explanation: string;  // 2. Phần giải thích (user tự nhập hoặc có hỗ trợ AI)
  notes?: string;       // 3. Ghi chú do người dùng tự nhập
  context: string;      // 4. Context hoặc ví dụ thực tế (user tự nhập hoặc hỗ trợ AI tạo)
  ipa?: string;         // Phiên âm IPA (do AI tự tạo)
  partOfSpeech?: string;// Loại từ (danh từ, động từ, tính từ, cụm từ... do AI tự tạo)
  mindMap?: CustomVocabMindMapData; // Mind map từ vựng do AI tạo (chỉ áp dụng cho loại 'vocabulary')
  createdAt: string;    // ISO string
  updatedAt: string;    // ISO string
  tags?: string[];
}

export interface CustomVocabFormInput {
  type: CustomItemType;
  text: string;
  explanation: string;
  notes?: string;
  context: string;
  ipa?: string;
  partOfSpeech?: string;
  tags?: string[];
}
