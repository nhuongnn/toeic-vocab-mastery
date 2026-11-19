export type NotificationType =
  | 'srs_due'
  | 'daily_reminder'
  | 'streak_warning'
  | 'streak_lost'
  | 'weekly_summary'
  | 'milestone';

export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  url: string;
}

export function getNotificationContent(
  type: NotificationType,
  context: {
    dueCount?: number;
    streakDays?: number;
    wordsLearned?: number;
    weeklyCount?: number;
    accuracy?: number;
  } = {}
): NotificationPayload {
  switch (type) {
    case 'srs_due': {
      const count = context.dueCount || 10;
      return {
        title: '🧠 Đến giờ ôn từ vựng!',
        body: `Bạn có ${count} từ cần ôn tập hôm nay. Ôn ngay để không bị quên nhé!`,
        tag: 'srs-due',
        url: '/flashcards',
      };
    }

    case 'daily_reminder':
      return {
        title: '📚 Mục tiêu TOEIC mỗi ngày',
        body: 'Dành 10-15 phút ôn từ hôm nay để củng cố phản xạ tự nhiên.',
        tag: 'daily-reminder',
        url: '/quiz',
      };

    case 'streak_warning': {
      const streak = context.streakDays || 1;
      return {
        title: '🔥 Giữ vững ngọn lửa Streak!',
        body: `Chuỗi ${streak} ngày học của bạn sắp mất! Hoàn thành 1 bài ngắn trước 24:00.`,
        tag: 'streak-warning',
        url: '/flashcards',
      };
    }

    case 'streak_lost':
      return {
        title: '😢 Streak đã bị reset',
        body: 'Đừng nản lòng! Bắt đầu lại một chuỗi ngày mới ngay hôm nay nhé.',
        tag: 'streak-lost',
        url: '/',
      };

    case 'weekly_summary': {
      const count = context.weeklyCount || 35;
      const accuracy = context.accuracy || 85;
      return {
        title: '📊 Tổng kết tuần vừa qua',
        body: `Bạn đã học thêm ${count} từ mới với độ chính xác ${accuracy}%. Tuyệt vời!`,
        tag: 'weekly-summary',
        url: '/dashboard',
      };
    }

    case 'milestone': {
      const total = context.wordsLearned || 100;
      return {
        title: '🎉 Chúc mừng cột mốc mới!',
        body: `Xuất sắc! Bạn đã chinh phục thành công mốc ${total} từ vựng TOEIC!`,
        tag: 'milestone',
        url: '/dashboard',
      };
    }

    default:
      return {
        title: 'TOEIC Mastery',
        body: 'Hãy tiếp tục rèn luyện mỗi ngày để đạt mục tiêu 700+!',
        url: '/',
      };
  }
}
