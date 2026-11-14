export type PronunciationCategoryId =
  | 'linking-sounds'
  | 'rhythm-stress'
  | 'reductions'
  | 'vietnamese-pitfalls'
  | 'intonation';

export interface AudioComparisonPair {
  label: string; // e.g. "Đọc từng từ rời rạc" vs "Người bản xứ nói tự nhiên"
  slowText: string;
  fastConnectedText: string;
  phoneticSpelling: string; // e.g. "pi-ki-tup" (phiên âm trực quan dễ đọc, không dùng IPA khó hiểu)
  vi: string;
  explanation: string;
}

export interface DialogueLine {
  speaker: string;
  en: string;
  connectedPhonetic: string; // phiên âm nối âm trực giác
  vi: string;
}

export interface PronunciationQuiz {
  audioPrompt: string; // Câu audio sẽ phát
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  listeningTip: string;
}

export interface PronunciationTopic {
  id: string;
  categoryId: PronunciationCategoryId;
  title: string;
  titleVi: string;
  subtitle: string;
  tag: string;
  frequency: '★★★★★' | '★★★★☆';
  difficulty: 'Cốt lõi' | 'Phổ biến' | 'Nâng cao';

  // 1. Tư duy phát âm trực giác bản xứ (Tại sao người bản xứ nói thế này?)
  nativeIntuition: {
    coreMindset: string; // Cơ chế miệng & thói quen sinh học (Lưỡi lười, tiết kiệm năng lượng)
    physicalFeeling: string; // Cảm giác vật lý ở cơ miệng/lưỡi/họng
    whyVietnameseStruggle: string; // Tại sao người Việt thấy khó nghe/khó nói
  };

  // 2. Quy tắc cốt lõi thực chiến (Dễ nhớ, không lý thuyết học thuật)
  rules: {
    ruleTitle: string;
    description: string;
    simpleFormula?: string;
    mouthShapeTip: string; // Mẹo đặt lưỡi/môi cực kỳ dễ hình dung
  }[];

  // 3. Cặp âm đối chiếu tương tác (So sánh đọc từng từ vs Đọc nối chuẩn bản xứ)
  comparisonPairs: AudioComparisonPair[];

  // 4. Hội thoại giao tiếp hàng ngày
  dailyDialogue: DialogueLine[];

  // 5. Mẹo luyện nghe phản xạ khi người bản xứ nói nhanh
  listeningHacks: {
    hackTitle: string;
    hackContent: string;
    howToCatchIt: string; // Cách nhận biết bằng tai
    toeicApplication: string; // Ứng dụng trong TOEIC Listening Part 1-4
  };

  // 6. Trắc nghiệm kiểm tra tai nghe
  quiz: PronunciationQuiz[];
}

export interface PronunciationCategoryInfo {
  id: PronunciationCategoryId;
  title: string;
  titleVi: string;
  description: string;
  iconName: string;
  badge: string;
}
