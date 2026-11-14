import { ReadingCategoryInfo, ReadingLesson, ReadingCategoryId } from '@/types/reading';
import { emailMemoLesson } from './emails-memos';
import { noticePolicyLesson } from './notices-policies';
import { invoiceOrderLesson } from './invoices-orders';
import { pressArticleLesson } from './press-articles';
import { multiPassageLesson } from './multi-passages';

export const readingCategories: ReadingCategoryInfo[] = [
  {
    id: 'emails-memos',
    title: 'Emails & Corporate Memos',
    titleVi: 'Thư Điện Tử & Thông Báo Nội Bộ',
    description: 'Bắt trọn Mục đích (BLUF), Hạn chót (Deadline) và Yêu cầu hành động trong 20s.',
    iconName: 'Mail',
    color: 'from-indigo-500 to-blue-600',
    badge: 'Part 7 Trọng Tâm',
  },
  {
    id: 'notices-policies',
    title: 'Notices, Policies & Schedule Updates',
    titleVi: 'Quy Chế, Thông Báo & Cập Nhật Tòa Nhà',
    description: 'Săn các điều kiện ngoại lệ (Exceptions), đối tượng miễn trừ và ngày bắt đầu áp dụng.',
    iconName: 'FileText',
    color: 'from-amber-500 to-orange-600',
    badge: 'Bẫy NOT / TRUE',
  },
  {
    id: 'invoices-orders',
    title: 'Invoices, Receipts & Order Forms',
    titleVi: 'Hóa Đơn, Biên Lai & Tra Cứu Chi Phí',
    description: 'Kỹ năng quét bảng số liệu siêu tốc, phát hiện mã giảm giá và phí vận chuyển hỏa tốc.',
    iconName: 'CheckSquare',
    color: 'from-emerald-500 to-teal-600',
    badge: 'Quét Bảng Số Liệu',
  },
  {
    id: 'press-articles',
    title: 'Press Releases & Business News',
    titleVi: 'Thông Cáo Báo Chí & Tin Tức M&A',
    description: 'Chiến thuật Kim tự tháp ngược (Inverted Pyramid): Bắt tin thâu tóm và bổ nhiệm lãnh đạo.',
    iconName: 'Newspaper',
    color: 'from-purple-500 to-pink-600',
    badge: 'Đoạn Văn Dài',
  },
  {
    id: 'multi-passages',
    title: 'Cross-Referencing Multi-Passages',
    titleVi: 'Đọc Kép & Ba Đoạn - Nối Dữ Liệu',
    description: 'Tuyệt chiêu xử lý 2 câu hỏi suy luận chéo không bao giờ nằm ở một đoạn duy nhất.',
    iconName: 'BookOpenCheck',
    color: 'from-rose-500 to-red-600',
    badge: 'Chinh Phục 700+',
  },
];

export const allReadingLessons: ReadingLesson[] = [
  emailMemoLesson,
  noticePolicyLesson,
  invoiceOrderLesson,
  pressArticleLesson,
  multiPassageLesson,
];

export function getReadingLessonById(id: string): ReadingLesson | undefined {
  return allReadingLessons.find((l) => l.id === id);
}

export function getLessonsByReadingCategory(categoryId: ReadingCategoryId): ReadingLesson[] {
  return allReadingLessons.filter((l) => l.categoryId === categoryId);
}
