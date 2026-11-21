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

export function getDailyReminderContent(time?: string): NotificationPayload {
  const hour = time ? parseInt(time.split(':')[0], 10) : new Date().getHours();
  const timeTag = time ? `daily-reminder-${time.replace(':', '-')}` : 'daily-reminder';

  if (hour >= 5 && hour < 11) {
    return {
      title: '☀️ Khởi động ngày mới cùng TOEIC',
      body: 'Dành 5-10 phút nạp từ vựng sáng nay để giữ nhịp phản xạ tự nhiên!',
      tag: timeTag,
      url: '/flashcards',
    };
  } else if (hour >= 11 && hour < 14) {
    return {
      title: '🥪 Nghỉ trưa ôn nhẹ từ vựng',
      body: 'Tranh thủ giờ nghỉ trưa ôn 5-10 thẻ Flashcard để củng cố trí nhớ!',
      tag: timeTag,
      url: '/flashcards',
    };
  } else if (hour >= 14 && hour < 18) {
    return {
      title: '☕ Nạp năng lượng chiều cùng TOEIC',
      body: 'Thử thách nhanh 1 bài Quiz 3 phút để thư giãn và nâng cao phản xạ!',
      tag: timeTag,
      url: '/quiz',
    };
  } else if (hour >= 18 && hour < 22) {
    return {
      title: '🌙 Giờ vàng ôn luyện buổi tối',
      body: 'Buổi tối là thời điểm tuyệt vời để hoàn thành mục tiêu từ vựng trong ngày.',
      tag: timeTag,
      url: '/quiz',
    };
  } else {
    return {
      title: '✨ Ôn từ trước khi đi ngủ',
      body: '5 phút ôn tập trước khi ngủ giúp não bộ ghi nhớ từ vựng sâu hơn vào ngày mai.',
      tag: timeTag,
      url: '/flashcards',
    };
  }
}

export function getNotificationContent(
  type: NotificationType,
  context: {
    dueCount?: number;
    streakDays?: number;
    wordsLearned?: number;
    weeklyCount?: number;
    accuracy?: number;
    time?: string;
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
      return getDailyReminderContent(context.time);

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
