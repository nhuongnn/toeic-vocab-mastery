import { PracticeQuizItem } from '@/types/patterns';

export const practiceQuizzes: PracticeQuizItem[] = [
  {
    id: 'quiz-col-1',
    type: 'collocation',
    question:
      'All candidates must submit their application portfolios before 5:00 PM on Friday to _____ the deadline.',
    options: ['catch', 'meet', 'keep', 'hold'],
    correctAnswer: 1,
    explanation:
      'Collocation chuẩn mực trong công sở và TOEIC là "meet the deadline" (kịp thời hạn). Không dùng "catch the deadline" hay "keep the deadline".',
    tag: 'Collocation: Động từ + Danh từ',
  },
  {
    id: 'quiz-col-2',
    type: 'collocation',
    question:
      'Due to _____ weather conditions over the Pacific, flight QA-402 has been diverted to Honolulu.',
    options: ['heavy', 'inclement', 'storming', 'hard'],
    correctAnswer: 1,
    explanation:
      '"Inclement weather" là cụm từ cố định chuẩn hàng không và văn phong trang trọng chỉ thời tiết xấu, giông bão khắc nghiệt.',
    tag: 'Collocation: Tính từ + Danh từ',
  },
  {
    id: 'quiz-col-3',
    type: 'collocation',
    question:
      'The renovation project must be completed in accordance _____ local environmental building codes.',
    options: ['to', 'with', 'for', 'about'],
    correctAnswer: 1,
    explanation:
      'Cấu trúc cố định: "in accordance with" (phù hợp với / tuân theo đúng với quy định).',
    tag: 'Collocation: Giới từ',
  },
  {
    id: 'quiz-col-4',
    type: 'collocation',
    question:
      'Customer service representatives are _____ available 24 hours a day to assist with billing inquiries.',
    options: ['readily', 'heavily', 'strictly', 'barely'],
    correctAnswer: 0,
    explanation:
      '"Readily available" là collocation cực phổ biến mang nghĩa "luôn có sẵn / sẵn sàng phục vụ ngay lập tức".',
    tag: 'Collocation: Phó từ + Tính từ',
  },
  {
    id: 'quiz-col-5',
    type: 'collocation',
    question:
      'The board of directors commended Ms. Evans for taking the _____ to overhaul our client onboarding system.',
    options: ['initiative', 'invitation', 'initial', 'initiation'],
    correctAnswer: 0,
    explanation:
      'Collocation: "take the initiative" (chủ động tiên phong hành động). Lưu ý "initiative" là danh từ!',
    tag: 'Collocation: Động từ + Danh từ',
  },
  {
    id: 'quiz-idiom-1',
    type: 'idiom',
    question:
      'A: "Are we on the same page regarding the delivery date?" — B: "Definitely, we agreed on next Wednesday."',
    options: [
      'Chúng ta có đang đọc cùng một cuốn sách không?',
      'Chúng ta đã thống nhất chung quan điểm và hiểu ý nhau chưa?',
      'Chúng ta có thể in hợp đồng ra cùng một trang giấy không?',
      'Chúng ta có nên dời hạn chót sang tuần sau không?',
    ],
    correctAnswer: 1,
    explanation:
      'Thành ngữ "on the same page" có nghĩa là cùng chung nhận thức, thống nhất quan điểm và hiểu ý nhau.',
    tag: 'Idiom: Công sở & Hợp tác',
  },
  {
    id: 'quiz-idiom-2',
    type: 'idiom',
    question:
      'When the CEO asked if they could launch the product without comprehensive beta testing, the lead engineer refused to "cut corners". What does "cut corners" mean?',
    options: [
      'Làm việc thâu đêm suốt sáng',
      'Cắt gọt các góc nhọn của sản phẩm vật lý',
      'Làm ẩu, bớt xén quy trình an toàn/chất lượng để tiết kiệm thời gian hoặc chi phí',
      'Đàm phán để giảm giá linh kiện',
    ],
    correctAnswer: 2,
    explanation:
      '"Cut corners" nghĩa là làm tắt, bớt xén tiêu chuẩn kỹ thuật hoặc quy trình để giảm chi phí, thường gây rủi ro chất lượng.',
    tag: 'Idiom: Chiến lược & Chất lượng',
  },
  {
    id: 'quiz-idiom-3',
    type: 'idiom',
    question:
      'A: "It’s already past 7:30 PM and we’re all exhausted." — B: "You’re right. Let’s _____ and head home."',
    options: [
      'hit the ground running',
      'call it a day',
      'bite the bullet',
      'burn the midnight oil',
    ],
    correctAnswer: 1,
    explanation:
      '"Call it a day" là câu nói bản xứ phổ biến nhất để tuyên bố dừng công việc hôm nay lại và nghỉ ngơi.',
    tag: 'Idiom: Đời sống & Giao tiếp',
  },
  {
    id: 'quiz-idiom-4',
    type: 'idiom',
    question:
      'Everyone in the boardroom knew sales were dropping sharply, but nobody wanted to bring up the "elephant in the room". What does "the elephant in the room" refer to?',
    options: [
      'Một món quà lưu niệm đắt tiền',
      'Vấn đề nhức nhối rõ ràng nhưng mọi người đều e ngại né tránh nhắc đến',
      'Người quản lý mới rất khó tính',
      'Một cơ hội đầu tư khổng lồ',
    ],
    correctAnswer: 1,
    explanation:
      '"The elephant in the room" chỉ một sự thật hoặc vấn đề nghiêm trọng hiển hiện trước mắt nhưng không ai dám chủ động đề cập vì nhạy cảm.',
    tag: 'Idiom: Mối quan hệ & Xã giao',
  },
  {
    id: 'quiz-pat-1',
    type: 'pattern',
    question:
      'Which of the following is the most diplomatic and professional way to ask a busy coworker for information via email?',
    options: [
      'Tell me if the budget is finalized.',
      'I was wondering if you might have a few moments to clarify the budget status.',
      'Why haven’t you updated the budget yet?',
      'Give me the budget numbers as soon as possible.',
    ],
    correctAnswer: 1,
    explanation:
      'Cấu trúc "I was wondering if you might have a few moments to..." lùi thì quá khứ tiếp diễn để tạo khoảng cách tâm lý tôn trọng, lịch thiệp và chuẩn mực nhất.',
    tag: 'Mẫu câu: Email & Thư từ công vụ',
  },
  {
    id: 'quiz-pat-2',
    type: 'pattern',
    question:
      'A: "Would you mind reviewing this five-page summary before the client call?" — B: "_____! Send it right over."',
    options: [
      'Yes, absolutely',
      'Not at all',
      'I would mind',
      'Never mind',
    ],
    correctAnswer: 1,
    explanation:
      'Câu hỏi "Would you mind..." hỏi "Bạn có thấy phiền không?". Muốn đồng ý giúp đỡ vui vẻ, câu trả lời bản xứ chuẩn mực là "Not at all!" (Không phiền chút nào cả!).',
    tag: 'Mẫu câu: Giao tiếp & TOEIC Part 2',
  },
  {
    id: 'quiz-pat-3',
    type: 'pattern',
    question:
      'Under no circumstances _____ confidential patient records to unauthorized personnel.',
    options: [
      'you should disclose',
      'should you disclose',
      'you disclose',
      'disclosing',
    ],
    correctAnswer: 1,
    explanation:
      'Cấu trúc đảo ngữ TOEIC Part 5: Sau cụm phủ định đứng đầu câu "Under no circumstances", bắt buộc phải đảo trợ động từ lên trước chủ ngữ ("should you disclose").',
    tag: 'Mẫu câu: Đảo ngữ TOEIC Part 5',
  },
];
