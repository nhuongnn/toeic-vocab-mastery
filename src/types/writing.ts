export type WritingCategoryId =
  | 'email-architecture'
  | 'diplomacy-softening'
  | 'inquiries-followups'
  | 'complaints-apologies'
  | 'reports-proposals';

export interface BeforeAfterExample {
  scenarioVi: string; // Tình huống giao tiếp
  awkwardVersion: string; // Câu dịch kiểu thô/Viet-English
  awkwardFlaw: string; // Lý do người bản xứ thấy kỳ quặc hoặc mất lịch sự
  nativeVersion: string; // Câu viết chuẩn bản xứ gãy gọn
  nativeWhy: string; // Tại sao bản xứ dùng cách này
}

export interface WritingFormula {
  purpose: string; // Mục đích viết
  pattern: string; // Công thức khung câu
  examples: string[]; // Các câu ví dụ mẫu
  tone: 'Formal' | 'Professional' | 'Friendly';
}

export interface WritingExercise {
  instruction: string;
  scenarioVi: string;
  type: 'multiple-choice' | 'error-fix' | 'phrase-fill';
  options: string[];
  correctAnswer: number;
  explanation: string;
  nativeWritingTip: string;
}

export interface WritingLesson {
  id: string;
  categoryId: WritingCategoryId;
  title: string;
  titleVi: string;
  subtitle: string;
  difficulty: 'Foundation' | 'Core TOEIC' | 'Advanced Mastery';
  frequency: '★★★★★' | '★★★★☆';
  tag: string;

  // 1. Tư duy viết bản xứ
  nativeMindset: {
    coreIntuition: string; // BLUF (Bottom Line Up Front) hoặc K.I.S.S
    brevitySecret: string; // Bí quyết viết ngắn gọn súc tích
    vietnameseMistakeWarning: string; // Lỗi viết dài dòng, lan man, dịch chay
  };

  // 2. Bộ khung công thức mẫu câu ăn điểm
  formulas: WritingFormula[];

  // 3. So sánh Before vs After (Thô vs Bản xứ)
  beforeAfter: BeforeAfterExample[];

  // 4. Cụm từ quyền lực (Power Phrases)
  powerPhrases: {
    category: string;
    phrases: {
      en: string;
      vi: string;
      usageTip?: string;
    }[];
  }[];

  // 5. Bẫy lỗi diễn đạt phổ biến
  commonTraps: {
    trapTitle: string;
    wrongSnippet: string;
    rightSnippet: string;
    explanation: string;
  }[];

  // 6. Thực hành viết & Phản xạ câu
  exercises: WritingExercise[];
}

export interface WritingCategoryInfo {
  id: WritingCategoryId;
  title: string;
  titleVi: string;
  description: string;
  iconName: string;
  color: string;
  badge: string;
}
