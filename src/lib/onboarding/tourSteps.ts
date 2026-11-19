import { TourStep } from '@/types/onboarding';

export const TOUR_STEPS: TourStep[] = [
  {
    target: '[data-tour="dashboard-score"]',
    title: '📊 Điểm TOEIC ước tính',
    description: 'Điểm này sẽ liên tục cập nhật dựa trên số lượng từ vựng bạn nhớ và kết quả làm Mock Test.',
    position: 'bottom',
    highlight: true,
  },
  {
    target: '[data-tour="vocabulary-link"]',
    title: '📚 Kho 3,675 Từ Vựng',
    description: 'Khám phá 13 chủ đề với hình ảnh minh họa, bản đồ tư duy bản xứ, collocations và nguồn gốc từ.',
    position: 'bottom',
    highlight: true,
  },
  {
    target: '[data-tour="mock-test-link"]',
    title: '🎯 Thi thử Mock Test',
    description: 'Luyện đề thi chuẩn format ETS: Mini Test 30 phút hoặc Full Test 75 phút để đo lường thực lực.',
    position: 'bottom',
    highlight: true,
  },
  {
    target: '[data-tour="streak-display"]',
    title: '🔥 Giữ ngọn lửa Streak',
    description: 'Học đều đặn mỗi ngày để duy trì thói quen. Thuật toán SRS sẽ tính toán thời điểm vàng để nhắc bạn ôn tập!',
    position: 'bottom',
    highlight: true,
  },
  {
    target: '[data-tour="daily-words"]',
    title: '📝 Nhiệm Vụ Hôm Nay',
    description: 'Danh sách các từ đến hạn ôn tập và bài tập rèn luyện được tối ưu riêng cho bạn hôm nay.',
    position: 'top',
    highlight: true,
  },
];
