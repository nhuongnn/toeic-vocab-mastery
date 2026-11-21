import { LearningPath, LearningPhase } from '@/types/onboarding';
import { WordLevel, CategoryId } from '@/types/vocabulary';

export function generateLearningPath(
  targetScore: number,
  currentLevel: WordLevel,
  dailyMinutes: number
): LearningPath {
  // Approximate words learned per day based on study minutes
  // 10 min ~ 8 words/day; 20 min ~ 16 words/day; 30 min ~ 25 words/day
  const wordsPerDay = Math.max(5, Math.round((dailyMinutes / 20) * 15));

  const phases: LearningPhase[] = [];

  if (targetScore <= 550) {
    phases.push({
      id: 'phase-1-foundation',
      title: 'Giai đoạn 1: Nền tảng cốt lõi (Essential 500)',
      description: 'Làm chủ các từ vựng công sở, hành chính văn phòng và lịch trình thường gặp nhất.',
      categoryIds: ['office-admin', 'dining', 'travel'] as CategoryId[],
      wordLevel: 'essential',
      targetWords: 600,
      estimatedDays: Math.ceil(600 / wordsPerDay),
      milestones: [
        {
          wordsLearned: 150,
          description: 'Hoàn thành 150 từ vựng văn phòng cơ bản',
          reward: '🏅 Khởi đầu vững chắc',
        },
        {
          wordsLearned: 300,
          description: 'Tự tin với 300 từ vựng tình huống công sở',
          reward: '🥈 Bứt phá phản xạ',
        },
        {
          wordsLearned: 600,
          description: 'Hoàn thiện trọn bộ nền tảng 500+',
          reward: '🥇 Chinh phục mốc 500 TOEIC',
        },
      ],
    });
  } else if (targetScore <= 650) {
    phases.push(
      {
        id: 'phase-1-foundation-review',
        title: 'Giai đoạn 1: Củng cố từ vựng cốt lõi & giao tiếp công sở',
        description: 'Bao quát các chủ đề hành chính, ăn uống công tác và nhân sự cơ bản.',
        categoryIds: ['office-admin', 'dining', 'travel'] as CategoryId[],
        wordLevel: currentLevel === 'essential' ? 'essential' : 'intermediate',
        targetWords: 600,
        estimatedDays: Math.ceil(600 / wordsPerDay),
        milestones: [
          {
            wordsLearned: 200,
            description: 'Nắm vững 200 từ vựng công sở thiết yếu',
            reward: '📋 Workplace Fluency',
          },
          {
            wordsLearned: 600,
            description: 'Làm chủ 600 từ vựng nền tảng công sở',
            reward: '🎖️ Nền Tảng Vững Vàng',
          },
        ],
      },
      {
        id: 'phase-2-target650',
        title: 'Giai đoạn 2: Tăng tốc 650+ TOEIC',
        description: 'Tập trung từ vựng nhân sự, mua sắm giao thương và tiếp thị để chạm ngưỡng 650+.',
        categoryIds: ['hr-personnel', 'purchasing', 'marketing'] as CategoryId[],
        wordLevel: 'intermediate',
        targetWords: 1000,
        estimatedDays: Math.ceil(1000 / wordsPerDay),
        milestones: [
          {
            wordsLearned: 500,
            description: 'Tự tin đọc hiểu email và hợp đồng đơn giản',
            reward: '💼 Business Ready',
          },
          {
            wordsLearned: 1000,
            description: 'Hoàn thành toàn diện lộ trình 650+',
            reward: '🏆 Chinh phục mục tiêu 650+ TOEIC',
          },
        ],
      }
    );
  } else if (targetScore <= 750) {
    phases.push(
      {
        id: 'phase-1-essential',
        title: 'Giai đoạn 1: Củng cố từ vựng cơ bản & trung cấp',
        description: 'Bao quát các chủ đề giao thương, tài chính cơ bản và nhân sự công ty.',
        categoryIds: ['office-admin', 'hr-personnel', 'purchasing'] as CategoryId[],
        wordLevel: currentLevel === 'essential' ? 'essential' : 'intermediate',
        targetWords: 800,
        estimatedDays: Math.ceil(800 / wordsPerDay),
        milestones: [
          {
            wordsLearned: 250,
            description: 'Nắm vững 250 từ vựng Nhân sự & Quản trị',
            reward: '📋 Workplace Fluency',
          },
          {
            wordsLearned: 800,
            description: 'Đạt 800 từ trung cấp, sẵn sàng cho đề thi thật',
            reward: '🎖️ Master Trung Cấp',
          },
        ],
      },
      {
        id: 'phase-2-target750',
        title: 'Giai đoạn 2: Tăng tốc 750+ TOEIC',
        description: 'Tập trung từ vựng hợp đồng pháp lý, tài chính chuyên sâu và phân tích tiếp thị.',
        categoryIds: ['finance', 'marketing', 'legal'] as CategoryId[],
        wordLevel: 'intermediate',
        targetWords: 1200,
        estimatedDays: Math.ceil(1200 / wordsPerDay),
        milestones: [
          {
            wordsLearned: 600,
            description: 'Làm chủ ngữ cảnh hợp đồng & tài chính',
            reward: '💼 Business Specialist',
          },
          {
            wordsLearned: 1200,
            description: 'Hoàn thành toàn diện lộ trình 750+',
            reward: '🏆 Chinh phục mục tiêu 750+ TOEIC',
          },
        ],
      }
    );
  } else {
    // 800 - 990
    phases.push(
      {
        id: 'phase-1-intermediate-mastery',
        title: 'Giai đoạn 1: Chuẩn hóa toàn bộ từ vựng trung cấp',
        description: 'Loại bỏ hoàn toàn các lỗ hổng từ vựng trong 13 chủ đề then chốt.',
        categoryIds: ['marketing', 'finance', 'manufacturing', 'technology'] as CategoryId[],
        wordLevel: 'intermediate',
        targetWords: 1200,
        estimatedDays: Math.ceil(1200 / wordsPerDay),
        milestones: [
          {
            wordsLearned: 600,
            description: 'Hoàn thành 600 từ vựng kinh doanh công nghệ',
            reward: '⚡ Tech & Commerce Pro',
          },
        ],
      },
      {
        id: 'phase-2-advanced-mastery',
        title: 'Giai đoạn 2: Bứt phá đỉnh cao 850 - 990',
        description: 'Học từ vựng nâng cao, sắc thái ngữ cảnh hiếm gặp và tư duy bản xứ thuần thục.',
        categoryIds: ['legal', 'communications', 'real-estate', 'health'] as CategoryId[],
        wordLevel: 'advanced',
        targetWords: 1500,
        estimatedDays: Math.ceil(1500 / wordsPerDay),
        milestones: [
          {
            wordsLearned: 750,
            description: 'Làm chủ sắc thái từ vựng cao cấp Part 7',
            reward: '🌟 Reading Virtuoso',
          },
          {
            wordsLearned: 1500,
            description: 'Đạt đỉnh cao 3,675 từ vựng toàn thư viện',
            reward: '👑 TOEIC Master 900+',
          },
        ],
      }
    );
  }

  const totalEstimatedDays = phases.reduce((acc, p) => acc + p.estimatedDays, 0);
  const completionDate = new Date();
  completionDate.setDate(completionDate.getDate() + totalEstimatedDays);

  return {
    targetScore,
    currentLevel,
    dailyGoal: dailyMinutes,
    phases,
    estimatedCompletionDate: completionDate.toISOString().split('T')[0],
    recommendedCategory: phases[0].categoryIds[0] || 'office-admin',
  };
}
