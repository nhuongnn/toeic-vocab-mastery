export type ReadingCategoryId =
  | 'emails-memos'
  | 'notices-policies'
  | 'invoices-orders'
  | 'press-articles'
  | 'multi-passages';

export interface ParaphrasePair {
  original: string; // Từ/cụm từ trong bài đọc
  paraphrased: string; // Từ/cụm từ đồng nghĩa trong câu hỏi hoặc đáp án
  contextVi: string; // Giải thích ngữ cảnh thực tế
}

export interface ReadingTrap {
  trapName: string;
  trapDescription: string;
  howToAvoid: string;
  examplePassageSnippet: string;
  distractorOption: string;
  correctOption: string;
}

export interface ReadingQuestion {
  question: string;
  questionType: 'main-idea' | 'detail' | 'negative-not' | 'inference' | 'synonym';
  options: string[];
  correctAnswer: number;
  explanation: string;
  clueSnippet: string; // Đoạn trích chứng minh đáp án
  paraphraseUsed?: string; // Cặp paraphrase tạo nên đáp án
}

export interface ReadingPassage {
  type: string; // 'Email', 'Memo', 'Notice', 'Invoice', 'Press Release', v.v.
  title?: string;
  header?: {
    from?: string;
    to?: string;
    date?: string;
    subject?: string;
    refNumber?: string;
  };
  content: string; // Nội dung đoạn văn
  vietnameseTranslation?: string; // Bản dịch tham khảo
  keyHighlights?: {
    text: string;
    type: 'purpose' | 'signal' | 'paraphrase' | 'action';
    note: string;
  }[];
}

export interface ReadingLesson {
  id: string;
  categoryId: ReadingCategoryId;
  title: string;
  titleVi: string;
  subtitle: string;
  difficulty: 'Foundation' | 'Core TOEIC' | 'Advanced Mastery';
  frequency: '★★★★★' | '★★★★☆';
  tag: string;
  estimatedTime: string; // e.g. "3 phút đọc hiểu"

  // 1. Tư duy đọc bản xứ (Native Reader Mindset)
  nativeMindset: {
    coreIntuition: string; // Tư duy xử lý thông tin dạng khối thay vì dịch từng từ
    readingSpeedSecret: string; // Bí quyết tăng tốc độ đọc
    vietnameseMistakeWarning: string; // Thói quen đọc chậm, dịch ngược của người Việt
  };

  // 2. Chiến thuật giải nhanh 30s (Concise Attack Framework)
  attackStrategy: {
    step1: string;
    step2: string;
    step3: string;
    proTip: string;
  };

  // 3. Cặp Paraphrase vàng kinh điển
  goldenParaphrases: ParaphrasePair[];

  // 4. Bài đọc thực chiến chuẩn Part 7
  primaryPassage: ReadingPassage;
  secondaryPassage?: ReadingPassage; // Dành cho bài đọc kép (Multi-passages)

  // 5. Bẫy đề thi hay gặp & cách bẻ gãy bẫy
  commonTraps: ReadingTrap[];

  // 6. Trắc nghiệm phản xạ đọc hiểu
  quiz: ReadingQuestion[];
}

export interface ReadingCategoryInfo {
  id: ReadingCategoryId;
  title: string;
  titleVi: string;
  description: string;
  iconName: string;
  color: string;
  badge: string;
}
