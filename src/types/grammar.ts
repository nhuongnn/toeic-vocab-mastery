export type GrammarCategoryId =
  | 'tenses'
  | 'passive-voice'
  | 'reduced-clauses'
  | 'conditionals'
  | 'communication-patterns';

export interface GrammarExample {
  en: string;
  vi: string;
  context: 'daily' | 'workplace' | 'toeic';
  note?: string;
  highlightWords?: string[];
}

export interface GrammarTrap {
  wrong: string;
  correct: string;
  nativeReason: string;
  vietnameseTrap: string;
}

export interface GrammarQuiz {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  toeicTip?: string;
}

export interface GrammarRule {
  ruleTitle: string;
  formula?: string;
  description: string;
  whenToUse: string;
  whenToAvoid?: string;
}

export interface GrammarLesson {
  id: string;
  categoryId: GrammarCategoryId;
  title: string;
  titleVi: string;
  subtitle: string;
  difficulty: 'Foundation' | 'Core TOEIC' | 'Advanced Mastery';
  frequency: '★★★★★' | '★★★★☆';
  tag: string;

  // 1. Tư duy bản xứ tự nhiên (Không lý thuyết suông)
  nativeMindset: {
    coreIntuition: string; // Bản chất người bản xứ cảm nhận
    mentalImage: string; // Hình ảnh trực quan trong đầu
    whyNativesSayThis: string; // Tại sao họ nói thế này mà không nói kiểu khác
    vietnameseMistakeWarning: string; // Thói quen dịch từ-sang-từ sai lầm của người Việt
  };

  // 2. Quy tắc thực chiến rút gọn
  rules: GrammarRule[];

  // 3. Ví dụ thực tế hàng ngày & công sở
  examples: GrammarExample[];

  // 4. Bẫy hay gặp và cách người bản xứ sửa
  commonTraps: GrammarTrap[];

  // 5. Tuyệt chiêu giải đề TOEIC Part 5 & 6 (Nhìn 3 giây ra đáp án)
  toeicHacks: {
    targetParts: string; // Ví dụ: 'Part 5 & Part 6'
    hackTitle: string;
    hackContent: string;
    quickSignalWords: string[]; // Từ khóa nhận diện phản xạ
    ruleOfThumb: string; // Quy tắc bỏ túi
  };

  // 6. Trắc nghiệm thực hành củng cố phản xạ
  quiz: GrammarQuiz[];
}

export interface GrammarCategoryInfo {
  id: GrammarCategoryId;
  title: string;
  titleVi: string;
  description: string;
  iconName: string;
  color: string;
  badge: string;
}
