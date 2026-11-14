import { WritingCategoryInfo, WritingLesson, WritingCategoryId } from '@/types/writing';
import { emailArchitectureLesson } from './email-architecture';
import { diplomacySofteningLesson } from './diplomacy-softening';
import { inquiriesFollowupsLesson } from './inquiries-followups';
import { complaintsApologiesLesson } from './complaints-apologies';
import { reportsProposalsLesson } from './reports-proposals';

export const writingCategories: WritingCategoryInfo[] = [
  {
    id: 'email-architecture',
    title: 'Business Email Architecture',
    titleVi: 'Khung Email Chuẩn Quốc Tế 4 Bước',
    description: 'Nắm vững nguyên tắc BLUF (Bottom Line Up Front), gãy gọn, dứt khoát không lan man.',
    iconName: 'Mail',
    color: 'from-indigo-500 to-purple-600',
    badge: 'Kỹ Năng Cốt Lõi',
  },
  {
    id: 'diplomacy-softening',
    title: 'Diplomacy & Softening Negative News',
    titleVi: 'Ngoại Giao Công Sở & Từ Chối Khéo',
    description: 'Cách nói "Không" và báo lỗi tinh tế mà đối tác vẫn vui vẻ, giữ gìn quan hệ bền vững.',
    iconName: 'PenTool',
    color: 'from-amber-500 to-rose-600',
    badge: 'Ngoại Giao Khéo Léo',
  },
  {
    id: 'inquiries-followups',
    title: 'Action Inquiries & Polite Follow-ups',
    titleVi: 'Hỏi Thông Tin & Nhắc Việc Tinh Tế',
    description: 'Kỹ thuật "Gentle Nudge" nhắc deadline mà không gây áp lực hay biến thành kẻ phiền hà.',
    iconName: 'Send',
    color: 'from-sky-500 to-cyan-600',
    badge: 'Nhắc Deadline Tinh Tế',
  },
  {
    id: 'complaints-apologies',
    title: 'Client Complaints & Professional Apologies',
    titleVi: 'Xử Lý Khiếu Nại & Thư Xin Lỗi Quốc Tế',
    description: 'Quy tắc AAA (Acknowledge - Apologize - Action) biến khách hàng giận dữ thành khách ruột.',
    iconName: 'Edit3',
    color: 'from-rose-500 to-pink-600',
    badge: 'Xử Lý Khủng Hoảng',
  },
  {
    id: 'reports-proposals',
    title: 'Business Reports & Executive Proposals',
    titleVi: 'Báo Cáo Tiến Độ & Đề Xuất Dự Án',
    description: 'Lượng hóa số liệu (Data-driven), trình bày gạch đầu dòng thuyết phục ban giám đốc.',
    iconName: 'FileSignature',
    color: 'from-emerald-500 to-teal-600',
    badge: 'Soạn Thảo Cấp Cao',
  },
];

export const allWritingLessons: WritingLesson[] = [
  emailArchitectureLesson,
  diplomacySofteningLesson,
  inquiriesFollowupsLesson,
  complaintsApologiesLesson,
  reportsProposalsLesson,
];

export function getWritingLessonById(id: string): WritingLesson | undefined {
  return allWritingLessons.find((l) => l.id === id);
}

export function getLessonsByWritingCategory(categoryId: WritingCategoryId): WritingLesson[] {
  return allWritingLessons.filter((l) => l.categoryId === categoryId);
}
