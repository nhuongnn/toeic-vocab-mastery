import { WritingLesson } from '@/types/writing';

export const emailArchitectureLesson: WritingLesson = {
  id: 'writing-email-architecture',
  categoryId: 'email-architecture',
  title: 'Business Email Architecture: The 4-Part Formula',
  titleVi: 'Khung Email Chuẩn Quốc Tế 4 Bước',
  subtitle: 'Kỹ thuật viết email ngắn gọn, gãy gọn theo nguyên tắc BLUF (Bottom Line Up Front) được mọi tập đoàn sử dụng.',
  difficulty: 'Foundation',
  frequency: '★★★★★',
  tag: 'Kỹ Năng Viết Cốt Lõi',

  nativeMindset: {
    coreIntuition:
      'Trong môi trường kinh doanh quốc tế, người đọc chỉ dành trung bình 11 giây cho một email. Nguyên tắc vàng là BLUF (Bottom Line Up Front): Mục đích chính phải nằm ngay ở câu đầu tiên! Đừng rào đón lan man về thời tiết, sức khỏe hay kể lể dài dòng.',
    brevitySecret:
      'Cắt bỏ toàn bộ các từ thừa (filler words). Thay vì viết "I am writing this email because I want to ask you whether you could...", người bản xứ viết: "I am writing to inquire about...". Ngắn hơn 50%, uy lực tăng gấp đôi.',
    vietnameseMistakeWarning:
      'Người Việt hay mở đầu bằng "Dear Mr. John, how are you? I am very happy to email you today...". Đây là lỗi viết nghiệp dư! Hãy đi thẳng vào mục đích công việc với thái độ chuyên nghiệp, tôn trọng thời gian của đối tác.',
  },

  formulas: [
    {
      purpose: 'Nêu mục đích ngay câu mở đầu (Purpose Statement)',
      pattern: 'I am writing to [inquire about / confirm / follow up on / update you on] [Topic].',
      examples: [
        'I am writing to inquire about the delivery schedule for invoice #4401.',
        'I am writing to confirm our strategy meeting scheduled for tomorrow at 2:00 PM.',
        'I am writing to update you on the status of the quarterly budget audit.',
      ],
      tone: 'Professional',
    },
    {
      purpose: 'Dẫn dắt tài liệu đính kèm (Referencing Attachments)',
      pattern: 'Please find attached [Document] for your [review / records / approval].',
      examples: [
        'Please find attached the revised vendor agreement for your review.',
        'Attached is the project timeline for your records.',
      ],
      tone: 'Professional',
    },
    {
      purpose: 'Kêu gọi hành động & Đặt hạn chót (Call to Action with Deadline)',
      pattern: 'Could you please [Action] by [Day, Date / Time]?',
      examples: [
        'Could you please review the attached draft and provide your feedback by Friday at 3:00 PM?',
        'Please confirm your attendance by replying to this email by end of day Wednesday.',
      ],
      tone: 'Professional',
    },
    {
      purpose: 'Lời kết lịch thiệp & Sẵn sàng hỗ trợ (Polite Closing)',
      pattern: 'Please let me know if you have any questions or require further assistance.',
      examples: [
        'Please feel free to reach out if you need any additional information.',
        'Thank you for your time and assistance. I look forward to your reply.',
      ],
      tone: 'Friendly',
    },
  ],

  beforeAfter: [
    {
      scenarioVi: 'Hỏi nhà cung cấp báo giá 50 chiếc ghế văn phòng và xin chiết khấu',
      awkwardVersion:
        'Hello Mr. Smith. My name is Thao from ABC company. I want to buy 50 office chairs for my staff. So can you tell me how much they cost and do you give me a big discount? Please reply to me soon.',
      awkwardFlaw:
        'Dịch chay từ tiếng Việt, dùng từ "want to buy" và "big discount" nghe thiếu chuyên nghiệp và đòi hỏi thô thiển.',
      nativeVersion:
        'Dear Mr. Smith,\n\nI am writing to request a price quotation for 50 units of the Ergonomic Mesh Office Chair (Model PT-410). \n\nCould you please provide volume pricing options as well as the estimated delivery timeline to our Seattle office? \n\nThank you for your assistance, and I look forward to your response.\n\nBest regards,\nThao Nguyen',
      nativeWhy:
        'Mở đầu bằng "request a price quotation", dùng "volume pricing" thay cho "big discount", cấu trúc 3 đoạn rõ ràng, lịch thiệp.',
    },
  ],

  powerPhrases: [
    {
      category: 'Mở đầu nêu mục đích (Opening)',
      phrases: [
        { en: 'I am writing to follow up on...', vi: 'Tôi viết thư này để theo dõi tiến độ về...' },
        { en: 'I am reaching out regarding...', vi: 'Tôi liên hệ với bạn liên quan đến...' },
        { en: 'As discussed in our meeting...', vi: 'Như đã trao đổi trong cuộc họp...' },
      ],
    },
    {
      category: 'Đính kèm tệp tin (Attachments)',
      phrases: [
        { en: 'Please find attached...', vi: 'Xin vui lòng xem tệp đính kèm...' },
        { en: 'For your reference, I have attached...', vi: 'Để bạn tiện tham khảo, tôi đã đính kèm...' },
      ],
    },
    {
      category: 'Kết thư chuyên nghiệp (Sign-offs)',
      phrases: [
        { en: 'Best regards,', vi: 'Trân trọng (tiêu chuẩn phổ biến nhất trong công sở)' },
        { en: 'Sincerely,', vi: 'Kính thư (trang trọng, dùng cho đối tác mới hoặc thư xin việc)' },
        { en: 'Thank you for your cooperation,', vi: 'Cảm ơn sự hợp tác của bạn' },
      ],
    },
  ],

  commonTraps: [
    {
      trapTitle: 'Bẫy dùng "I write this email to tell you..."',
      wrongSnippet: 'I write this email to tell you that the contract is ready.',
      rightSnippet: 'I am writing to inform you that the contract is now ready for your review.',
      explanation: 'Dùng thì Hiện tại Tiếp diễn "I am writing to [verb]" thay vì Hiện tại Đơn, và dùng "inform you" thay vì "tell you".',
    },
    {
      trapTitle: 'Bẫy giục đối tác "Please reply ASAP"',
      wrongSnippet: 'Please reply ASAP because we need it urgent.',
      rightSnippet: 'I would appreciate your feedback by tomorrow at 2:00 PM if possible.',
      explanation: '"ASAP" viết tắt trong email đối tác thường tạo cảm giác hách dịch, ra lệnh. Hãy đưa ra mốc thời gian cụ thể (by tomorrow at 2:00 PM) kèm lời đề nghị lịch thiệp.',
    },
  ],

  exercises: [
    {
      instruction: 'Chọn câu mở đầu chuẩn bản xứ nhất để xác nhận cuộc hẹn phỏng vấn ứng viên:',
      scenarioVi: 'Bạn muốn gửi email xác nhận buổi phỏng vấn ngày mai lúc 10h sáng.',
      type: 'multiple-choice',
      options: [
        'I write this message because I want to say you have an interview tomorrow at 10 AM.',
        'I am writing to confirm our interview appointment scheduled for tomorrow at 10:00 AM.',
        'Hello candidate, remember to come to our office tomorrow at 10:00 AM for the test.',
        'I am emailing you to see if you can come tomorrow at 10 AM or not.',
      ],
      correctAnswer: 1,
      explanation: '"I am writing to confirm our interview appointment scheduled for tomorrow at 10:00 AM" là cấu trúc trang trọng, súc tích và chuẩn mực doanh nghiệp.',
      nativeWritingTip: 'Công thức "I am writing to confirm [Event] scheduled for [Time]" là câu cửa miệng trong giao tiếp nhân sự quốc tế.',
    },
    {
      instruction: 'Chọn câu dẫn dắt tệp đính kèm chuyên nghiệp nhất:',
      scenarioVi: 'Bạn gửi kèm báo cáo tài chính quý 3 cho sếp xem duyệt.',
      type: 'multiple-choice',
      options: [
        'Look at my file below to see Q3 numbers.',
        'I put the Q3 financial report file here, please see.',
        'Please find attached the Q3 financial report for your review.',
        'You can open the report attached in this computer email.',
      ],
      correctAnswer: 2,
      explanation: '"Please find attached [Document] for your review" là mẫu câu chuẩn xác 100% trong mọi email gửi tệp.',
      nativeWritingTip: 'Luôn thêm mục đích "for your review" (để bạn xem duyệt) hoặc "for your records" (để bạn lưu trữ hồ sơ).',
    },
    {
      instruction: 'Chọn câu kêu gọi hành động kèm hạn chót lịch thiệp nhất:',
      scenarioVi: 'Nhắc đồng nghiệp phản hồi ý kiến về bản hợp đồng trước 5 giờ chiều Thứ Sáu.',
      type: 'multiple-choice',
      options: [
        'Send me your ideas fast before Friday 5 PM or we fail.',
        'Could you please review the contract and share your feedback by Friday at 5:00 PM?',
        'You have to finish checking this contract before 5 PM on Friday.',
        'Hurry up to look at the contract by Friday 5 PM.',
      ],
      correctAnswer: 1,
      explanation: '"Could you please [Action] and share your feedback by [Time]?" thể hiện sự tôn trọng, chuyên nghiệp và rõ ràng về thời hạn.',
      nativeWritingTip: 'Dùng câu hỏi gián tiếp "Could you please..." thay vì câu mệnh lệnh "You must..." hay "Send me...".',
    },
  ],
};
