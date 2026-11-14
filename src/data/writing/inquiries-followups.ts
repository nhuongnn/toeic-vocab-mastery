import { WritingLesson } from '@/types/writing';

export const inquiriesFollowupsLesson: WritingLesson = {
  id: 'writing-inquiries-followups',
  categoryId: 'inquiries-followups',
  title: 'Action Inquiries & Polite Follow-ups',
  titleVi: 'Hỏi Thông Tin & Thúc Giục Tiến Độ Tinh Tế',
  subtitle: 'Kỹ thuật "Gentle Nudge" (cú hích nhẹ nhàng) nhắc deadline mà không biến thành kẻ phiền toái hay hống hách.',
  difficulty: 'Core TOEIC',
  frequency: '★★★★★',
  tag: 'Kỹ Năng Theo Dõi Tiến Độ',

  nativeMindset: {
    coreIntuition:
      'Trong môi trường công sở bận rộn, email của bạn rất dễ bị trôi vào quên lãng. Khi nhắc lại một việc chưa được hồi đáp, người bản xứ không bao giờ dùng giọng điệu hờn dỗi ("As I mentioned in my previous email...") hay đe dọa ("Why haven\'t you replied?"). Họ dùng kỹ thuật "Gentle Nudge": Đưa ra giả định tích cực rằng đối tác bận rộn, nhắc lại bối cảnh và đưa ra hạn chót mới một cách ân cần.',
    brevitySecret:
      'Chỉ cần 2-3 câu ngắn: [Lời chào ấm áp] + [Lý do liên hệ lại: "Just following up on..."] + [Thời hạn mong đợi]. Đừng sao chép lại toàn bộ bức thư cũ; chỉ cần tóm tắt 1 dòng mấu chốt.',
    vietnameseMistakeWarning:
      'Người Việt hay viết "Reply to me as soon as possible" (ASAP) hoặc "I am waiting for your answer". Những câu này trong tiếng Anh mang sắc thái thiếu kiên nhẫn và thiếu tôn trọng thời gian của người khác.',
  },

  formulas: [
    {
      purpose: 'Thúc giục tiến độ một cách lịch sự (Polite Follow-up Opener)',
      pattern: 'I am just following up to check if you have had an opportunity to [Review/Examine] [Document/Matter].',
      examples: [
        'I am just following up to check if you have had an opportunity to review the revised contract draft.',
        'I am writing to follow up on our phone conversation yesterday regarding the software license renewal.',
      ],
      tone: 'Professional',
    },
    {
      purpose: 'Hỏi tiến độ hoặc cập nhật tình hình (Status Request)',
      pattern: 'Could you kindly provide an update on the status of [Deliverable/Project]?',
      examples: [
        'Could you kindly provide an update on the status of the vendor background checks?',
        'I would appreciate an update on when we might expect the preliminary design mockups.',
      ],
      tone: 'Professional',
    },
    {
      purpose: 'Gắn thời hạn phản hồi khéo léo (Attaching a Diplomatic Deadline)',
      pattern: 'As we are aiming to [Milestone Goal] by [Date], your input by [Time/Day] would be greatly appreciated.',
      examples: [
        'As we are aiming to finalize printer procurement by Friday, your approval by Thursday afternoon would be greatly appreciated.',
        'To ensure our team can meet the launch schedule, could you confirm your feedback by 12:00 PM tomorrow?',
      ],
      tone: 'Professional',
    },
  ],

  beforeAfter: [
    {
      scenarioVi: 'Nhắc khách hàng đã 4 ngày chưa trả lời về bản thảo hợp đồng',
      awkwardVersion:
        'Hi Mr. Robert. Why did you not reply to my contract email sent 4 days ago? We are waiting for you so long. Please answer me quickly today.',
      awkwardFlaw:
        'Dùng câu hỏi "Why did you not reply" thể hiện sự trách cứ và mất bình tĩnh, biến quan hệ làm ăn thành cuộc tranh cãi.',
      nativeVersion:
        'Dear Mr. Robert,\n\nI hope you are having a productive week.\n\nI am just following up to check if you have had a chance to review the revised agreement sent on Monday. As we are hoping to finalize vendor onboarding before the end of the month, your feedback by tomorrow afternoon would be greatly appreciated.\n\nPlease let me know if you have any questions or require any adjustments.\n\nBest regards,\nLinh Tran',
      nativeWhy:
        'Mở đầu bằng "I hope you are having a productive week", dùng "just following up to check if you have had a chance", giải thích lý do cần gấp ("to finalize vendor onboarding").',
    },
  ],

  powerPhrases: [
    {
      category: 'Mở đầu nhắc việc thân thiện (Gentle Reminders)',
      phrases: [
        { en: 'Just a gentle reminder regarding...', vi: 'Chỉ xin được nhắc nhẹ về...' },
        { en: 'I wanted to touch base regarding...', vi: 'Tôi muốn liên hệ để nắm tình hình về...' },
        { en: 'To keep you in the loop...', vi: 'Để bạn nắm được diễn biến cập nhật...' },
      ],
    },
    {
      category: 'Thời hạn phản hồi linh hoạt (Flexible Deadlines)',
      phrases: [
        { en: 'At your earliest convenience', vi: 'Vào lúc thuận tiện sớm nhất cho bạn' },
        { en: 'No rush, whenever you get a moment', vi: 'Không vội, bất cứ khi nào bạn có thời gian rảnh' },
        { en: 'Your prompt attention to this matter is appreciated', vi: 'Rất cảm ơn sự lưu tâm nhanh chóng của bạn' },
      ],
    },
  ],

  commonTraps: [
    {
      trapTitle: 'Bẫy dùng "As per my previous email..." với vẻ giận dữ',
      wrongSnippet: 'As per my previous email, you need to sign page 3.',
      rightSnippet: 'Just to reiterate, please ensure page 3 is signed and initialed.',
      explanation: '"As per my previous email" trong văn hóa công sở hiện đại thường mang hàm ý mỉa mai ("Tôi đã nói rồi mà bạn không chịu đọc"). Hãy dùng "Just to reiterate..." hoặc "For convenience, I\'ve highlighted...".',
    },
    {
      trapTitle: 'Bẫy dùng "Waiting for your reply" cụt ngủn',
      wrongSnippet: 'Waiting for your reply.',
      rightSnippet: 'I look forward to hearing your thoughts on this.',
      explanation: 'Viết cụt ngủn thiếu chủ ngữ thể hiện sự cẩu thả. Hãy viết câu hoàn chỉnh "I look forward to hearing from you".',
    },
  ],

  exercises: [
    {
      instruction: 'Chọn câu nhắc việc khéo léo nhất khi đối tác chưa phản hồi về lịch họp:',
      scenarioVi: 'Bạn đã gửi lời mời họp 2 ngày trước nhưng đối tác chưa xác nhận tham gia.',
      type: 'multiple-choice',
      options: [
        'Did you see my meeting invitation? Why no answer?',
        'I am just following up to see if the proposed time of 3:00 PM on Thursday works for your schedule.',
        'You forgot to click accept on my calendar invite. Do it now.',
        'I am waiting here for you to tell me if you come or not.',
      ],
      correctAnswer: 1,
      explanation: '"I am just following up to see if the proposed time ... works for your schedule" hỏi han lịch thiệp, tôn trọng thời gian của đối tác.',
      nativeWritingTip: 'Mẫu câu "Does [Time] work for your schedule?" là câu hỏi giờ họp tự nhiên nhất của người bản xứ.',
    },
    {
      instruction: 'Chọn cách diễn đạt hạn chót khéo léo để nộp báo cáo chi tiêu:',
      scenarioVi: 'Phòng kế toán cần nhân viên nộp hóa đơn trước 12h trưa Thứ Sáu để kịp kỳ lương.',
      type: 'multiple-choice',
      options: [
        'Give all bills before Friday 12 PM or no salary for you.',
        'To ensure payroll processing is completed on time, please submit all expense receipts by Friday at 12:00 PM.',
        'Everyone must drop their papers on my desk before Friday noon immediately.',
        'Why are you keeping your receipts? Send them before Friday midday.',
      ],
      correctAnswer: 1,
      explanation: '"To ensure payroll processing is completed on time, please submit all expense receipts by Friday at 12:00 PM" giải thích rõ lý do vì lợi ích chung, tạo động lực tuân thủ.',
      nativeWritingTip: 'Bắt đầu bằng mục đích chung ("To ensure [Goal]...") khiến người nhận cảm thấy deadline là hợp lý chứ không phải sự áp đặt.',
    },
    {
      instruction: 'Chọn câu đề nghị đối tác cung cấp số liệu bán hàng mới nhất:',
      scenarioVi: 'Bạn cần bảng số liệu doanh số tháng 10 từ chi nhánh Đà Nẵng.',
      type: 'multiple-choice',
      options: [
        'Could you kindly share the latest October sales figures when you have a moment?',
        'Give me October sales numbers now.',
        'Where are the October sales? I need them right this second.',
        'You have October numbers, right? Put them in my email box.',
      ],
      correctAnswer: 0,
      explanation: '"Could you kindly share the latest October sales figures when you have a moment?" vừa chuyên nghiệp, vừa ấm áp và lịch thiệp.',
      nativeWritingTip: 'Thêm đuôi "when you have a moment" giúp giảm áp lực cho người nhận nhưng vẫn đảm bảo công việc được ưu tiên.',
    },
  ],
};
