import { WordLevel } from '@/types/vocabulary';

export interface LevelDescription {
  level: WordLevel;
  title: string;
  badge: string;
  description: string;
  recommendedStartingCategory: string;
}

export function getLevelDescription(level: WordLevel): LevelDescription {
  switch (level) {
    case 'essential':
      return {
        level: 'essential',
        title: 'Nền tảng Cốt lõi (Mục tiêu 450 - 600)',
        badge: '🟢 Essential',
        description:
          'Bạn đang xây dựng vốn từ nền tảng. Hãy tập trung vào các từ vựng hành chính, lịch trình, ăn uống và du lịch.',
        recommendedStartingCategory: 'office-admin',
      };
    case 'intermediate':
      return {
        level: 'intermediate',
        title: 'Trung cấp Thực chiến (Mục tiêu 600 - 780)',
        badge: '🟡 Intermediate',
        description:
          'Vốn từ của bạn đã khá ổn định. Bước tiếp theo là làm chủ các từ vựng hợp đồng, tài chính, tiếp thị và nhân sự để bứt phá điểm số.',
        recommendedStartingCategory: 'hr-personnel',
      };
    case 'advanced':
      return {
        level: 'advanced',
        title: 'Bản xứ Nâng cao (Mục tiêu 800 - 990)',
        badge: '🟣 Advanced',
        description:
          'Khả năng tiếng Anh của bạn rất tốt! Hãy tập trung vào các sắc thái ngữ nghĩa tinh tế, thành ngữ và cụm từ chuyên sâu để đạt điểm tối đa.',
        recommendedStartingCategory: 'legal',
      };
  }
}
