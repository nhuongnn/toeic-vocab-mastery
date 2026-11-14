import { GrammarCategoryInfo, GrammarLesson, GrammarCategoryId } from '@/types/grammar';
import { tensesLessons } from './tenses';
import { passiveVoiceLessons } from './passive-voice';
import { reducedClausesLessons } from './reduced-clauses';
import { conditionalsLessons } from './conditionals';
import { patternsLessons } from './patterns';

export const grammarCategories: GrammarCategoryInfo[] = [
  {
    id: 'tenses',
    title: 'High-Frequency Tenses',
    titleVi: 'Các thì thực chiến hàng ngày & TOEIC',
    description:
      'Tập trung vào 4 thì cốt lõi chiếm hơn 80% thời lượng trong công việc và đề thi TOEIC. Tư duy mốc thời gian tự nhiên, không học vẹt 12 thì.',
    iconName: 'Clock',
    color: 'from-amber-500 to-orange-600',
    badge: 'Cốt lõi thời gian',
  },
  {
    id: 'passive-voice',
    title: 'Active vs. Passive Voice',
    titleVi: 'Chủ động & Bị động khách quan',
    description:
      'Nghệ thuật ngoại giao công sở: Tránh chỉ tay đổ lỗi, tập trung vào kết quả công việc và thể nhờ vả / ủy thác Have/Get something done.',
    iconName: 'ShieldCheck',
    color: 'from-indigo-500 to-blue-600',
    badge: 'Ngoại giao công sở',
  },
  {
    id: 'reduced-clauses',
    title: 'Reduced Relative Clauses & Participles',
    titleVi: 'Mệnh đề quan hệ rút gọn & Phân từ',
    description:
      'Bản năng nói ngắn gọn, súc tích của người bản xứ (V-ing & V-ed). Bí kíp ăn điểm 100% các câu hỏi phân từ trong TOEIC Part 5 & 6.',
    iconName: 'Scissors',
    color: 'from-rose-500 to-pink-600',
    badge: 'Ăn điểm Part 5',
  },
  {
    id: 'conditionals',
    title: 'Conditionals & Business Inversions',
    titleVi: 'Điều kiện kinh doanh & Đảo ngữ "Should"',
    description:
      'Cam kết chính sách với loại 1, ngoại lệ dứt khoát với "Unless", và đảo ngữ "Should you need assistance" cực kỳ trang trọng trong email.',
    iconName: 'GitFork',
    color: 'from-purple-500 to-violet-600',
    badge: 'Email chuyên nghiệp',
  },
  {
    id: 'communication-patterns',
    title: 'High-Impact Sentence Patterns',
    titleVi: 'Mẫu câu giao tiếp & Cấu trúc liên từ',
    description:
      'Mẫu câu nhờ vả lịch sự "Would you mind", theo dõi tiến độ, "Look forward to + V-ing", và mẹo 3 giây bẻ khóa liên từ (Due to vs Because, Despite vs Although).',
    iconName: 'MessageSquareShare',
    color: 'from-emerald-500 to-teal-600',
    badge: 'Giao tiếp thực tế',
  },
];

export const allGrammarLessons: GrammarLesson[] = [
  ...tensesLessons,
  ...passiveVoiceLessons,
  ...reducedClausesLessons,
  ...conditionalsLessons,
  ...patternsLessons,
];

export function getLessonsByCategory(categoryId: GrammarCategoryId): GrammarLesson[] {
  return allGrammarLessons.filter((lesson) => lesson.categoryId === categoryId);
}

export function getLessonById(id: string): GrammarLesson | undefined {
  return allGrammarLessons.find((lesson) => lesson.id === id);
}
