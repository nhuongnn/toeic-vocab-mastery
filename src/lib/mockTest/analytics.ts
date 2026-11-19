import { MockTestResult } from '@/types/mockTest';

export interface WeakAreaItem {
  name: string;
  type: 'part' | 'skill';
  accuracy: number;
  message: string;
  actionText: string;
  actionHref: string;
}

export interface StudyRecommendation {
  id: string;
  title: string;
  description: string;
  tag: string;
  href: string;
}

export function analyzeWeakAreas(result: MockTestResult): WeakAreaItem[] {
  const weakAreas: WeakAreaItem[] = [];

  // Check Part scores
  for (const p of result.partScores) {
    if (p.percentage < 65) {
      let message = '';
      let actionText = '';
      let actionHref = '';

      if (p.part === 5) {
        message = 'Cần củng cố ngữ pháp câu đơn và vốn từ vựng hành chính - thương mại.';
        actionText = 'Luyện Flashcard & Ngữ pháp';
        actionHref = '/grammar';
      } else if (p.part === 6) {
        message = 'Chú ý sự liên kết mạch văn và chọn câu chèn phù hợp trong đoạn văn bản.';
        actionText = 'Luyện đọc đoạn văn';
        actionHref = '/reading';
      } else {
        message = 'Cần rèn luyện kỹ thuật Skimming/Scanning để nắm nhanh thông tin bài đọc dài.';
        actionText = 'Luyện chiến thuật Part 7';
        actionHref = '/reading';
      }

      weakAreas.push({
        name: `Part ${p.part}`,
        type: 'part',
        accuracy: p.percentage,
        message,
        actionText,
        actionHref,
      });
    }
  }

  // Check Skills
  for (const s of result.skillBreakdown) {
    if (s.percentage < 60) {
      weakAreas.push({
        name: s.skill,
        type: 'skill',
        accuracy: s.percentage,
        message: `Độ chính xác kỹ năng ${s.skill} còn thấp (${s.percentage}%).`,
        actionText: 'Ôn tập ngay',
        actionHref: '/categories',
      });
    }
  }

  return weakAreas;
}

export function compareWithHistory(
  current: MockTestResult,
  history: MockTestResult[]
): { scoreDiff: number; accuracyDiff: number; trend: 'up' | 'down' | 'same' } {
  const previous = history.find((h) => h.sessionId !== current.sessionId && h.type === current.type);
  if (!previous) {
    return { scoreDiff: 0, accuracyDiff: 0, trend: 'same' };
  }

  const scoreDiff = current.totalScore - previous.totalScore;
  const accuracyDiff = current.accuracy - previous.accuracy;
  const trend = scoreDiff > 0 ? 'up' : scoreDiff < 0 ? 'down' : 'same';

  return { scoreDiff, accuracyDiff, trend };
}

export function generateRecommendations(result: MockTestResult): StudyRecommendation[] {
  const recs: StudyRecommendation[] = [];

  const lowestPart = [...result.partScores].sort((a, b) => a.percentage - b.percentage)[0];

  if (!lowestPart || lowestPart.percentage >= 80) {
    recs.push({
      id: 'rec-full-test',
      title: 'Thử sức với Full Reading Test 75 phút',
      description: 'Phong độ của bạn rất tốt! Hãy thử thách với đề thi 100 câu hoàn chỉnh để rèn luyện sức bền.',
      tag: 'Thi thử',
      href: '/mock-test',
    });
  } else if (lowestPart.part === 5) {
    recs.push({
      id: 'rec-vocab-review',
      title: 'Tăng cường ôn tập Flashcards',
      description: 'Ôn lại các từ vựng cốt lõi thường gặp nhất trong Part 5 với phương pháp Spaced Repetition.',
      tag: 'Từ vựng',
      href: '/flashcards',
    });
    recs.push({
      id: 'rec-grammar-patterns',
      title: 'Bổ trợ 5 Dạng Ngữ Pháp Hay Bẫy Nhất',
      description: 'Rà soát cấu trúc câu đảo ngữ, giả định thức và thể bị động để không mất điểm oan.',
      tag: 'Ngữ pháp',
      href: '/grammar',
    });
  } else {
    recs.push({
      id: 'rec-reading-tactics',
      title: 'Chiến thuật giải nhanh Part 7 BLUF',
      description: 'Học cách bắt trọn mục đích và hạn chót trong 20 giây mà không cần dịch thầm.',
      tag: 'Đọc hiểu',
      href: '/reading',
    });
  }

  return recs;
}
