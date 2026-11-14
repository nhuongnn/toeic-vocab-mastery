import { WritingLesson } from '@/types/writing';

export const diplomacySofteningLesson: WritingLesson = {
  id: 'writing-diplomacy-softening',
  categoryId: 'diplomacy-softening',
  title: 'Diplomatic Tone & Softening Negative News',
  titleVi: 'Ngoại Giao Công Sở: Mềm Mỏng Hóa & Từ Chối Khéo',
  subtitle: 'Nghệ thuật nói "Không" và thông báo tin xấu mà đối tác vẫn tôn trọng và sẵn sàng hợp tác lâu dài.',
  difficulty: 'Core TOEIC',
  frequency: '★★★★★',
  tag: 'Giao Tiếp Ngoại Giao',

  nativeMindset: {
    coreIntuition:
      'Trong văn hóa doanh nghiệp phương Tây, việc từ chối thẳng thừng ("No, we cannot do that", "Your price is wrong", "You made a mistake") bị coi là thô lỗ, thiếu chuyên nghiệp và có thể hủy hoại mối quan hệ đối tác. Người bản xứ luôn dùng "Kỹ thuật đệm" (Buffering): Cảm ơn -> Nêu lý do khách quan (ngân sách, chính sách) -> Đưa ra giải pháp thay thế.',
    brevitySecret:
      'Sử dụng các trợ động từ khiếm khuyết (modals) như "would", "could", "might" và trạng từ làm dịu như "unfortunately", "temporarily", "it appears that". Chúng biến một mệnh lệnh gay gắt thành một lời gợi ý tinh tế.',
    vietnameseMistakeWarning:
      'Người Việt khi viết tiếng Anh hay dùng từ ngữ mang tính chỉ trích cá nhân: "You forgot to attach the file" hay "You did not pay the invoice". Hãy chuyển trọng tâm từ con người sang sự vật: "It appears the attachment was not included" hoặc "Our records indicate the invoice remains outstanding".',
  },

  formulas: [
    {
      purpose: 'Từ chối đề xuất một cách lịch thiệp (Diplomatic Refusal)',
      pattern: 'While we appreciate [Offer/Proposal], we are unfortunately unable to [Action] at this time due to [Reason].',
      examples: [
        'While we appreciate your detailed proposal, we are unfortunately unable to accept the terms at this time due to current budget constraints.',
        'Although we value our partnership, we are unable to extend the payment deadline beyond thirty days.',
      ],
      tone: 'Formal',
    },
    {
      purpose: 'Báo lỗi hoặc sai sót một cách gián tiếp (Softly Reporting an Issue)',
      pattern: 'It appears there might be a minor discrepancy regarding [Item/Topic].',
      examples: [
        'It appears there might be a minor discrepancy between the invoiced amount and our agreed purchase order.',
        'It seems the signed signature page was inadvertently omitted from the package.',
      ],
      tone: 'Professional',
    },
    {
      purpose: 'Đề xuất phương án thay thế thiện chí (Counter-Proposal)',
      pattern: 'Would it be possible to [Alternative Solution] instead?',
      examples: [
        'Would it be possible to schedule our kickoff meeting for next Tuesday instead?',
        'Alternatively, we would be delighted to offer a 5% discount on your subsequent order.',
      ],
      tone: 'Professional',
    },
  ],

  beforeAfter: [
    {
      scenarioVi: 'Từ chối báo giá của nhà cung cấp vì vượt quá ngân sách',
      awkwardVersion:
        'Your price is too expensive for our company. We do not have money for this high price, so we cannot buy from you. Please reduce the price or we will find another supplier.',
      awkwardFlaw:
        'Dùng câu chữ chỉ trích "too expensive", "we do not have money", và đe dọa "we will find another supplier" gây cảm giác thù địch.',
      nativeVersion:
        'Thank you for providing the comprehensive proposal. Unfortunately, the proposed total exceeds our allocated quarterly budget. While we are unable to move forward with this package at present, we would welcome the opportunity to review a revised quote should you have options with scaled-down specifications.',
      nativeWhy:
        'Mở đầu bằng lời cảm ơn ("Thank you for providing..."), dùng "exceeds our allocated budget" thay vì "too expensive", và mở ra cơ hội hợp tác ("scaled-down specifications").',
    },
    {
      scenarioVi: 'Nhắc khách hàng quên đính kèm tệp tin tài liệu',
      awkwardVersion:
        'You forgot to attach the PDF file in your email. I cannot see anything. Send it again now.',
      awkwardFlaw:
        'Dùng chữ "You forgot" (Bạn đã quên) khiến người nhận cảm thấy bị trách móc và mất mặt.',
      nativeVersion:
        'Thank you for the update. It appears that the PDF attachment was not included with your previous message. Could you please resend the document at your earliest convenience?',
      nativeWhy:
        'Dùng thể bị động khách quan "the attachment was not included" để không quy lỗi cho cá nhân.',
    },
  ],

  powerPhrases: [
    {
      category: 'Cụm từ làm mềm lời từ chối (Softening Openers)',
      phrases: [
        { en: 'Unfortunately, due to unforeseen circumstances...', vi: 'Thật không may, do những tình huống bất khả kháng...' },
        { en: 'While we would love to collaborate...', vi: 'Mặc dù chúng tôi rất muốn hợp tác...' },
        { en: 'Regrettably, we are not in a position to...', vi: 'Rất tiếc, chúng tôi hiện chưa thể...' },
      ],
    },
    {
      category: 'Nêu sai sót không chỉ tay đổ lỗi (Diplomatic Phrasing)',
      phrases: [
        { en: 'It appears there has been an oversight regarding...', vi: 'Có vẻ như đã có một sự sơ suất nhỏ liên quan đến...' },
        { en: 'According to our internal records...', vi: 'Theo hồ sơ lưu trữ nội bộ của chúng tôi...' },
        { en: 'Could we kindly double-check...', vi: 'Liệu chúng ta có thể vui lòng đối soát lại...' },
      ],
    },
  ],

  commonTraps: [
    {
      trapTitle: 'Bẫy dùng "You must..." với đối tác bên ngoài',
      wrongSnippet: 'You must send the payment before Friday.',
      rightSnippet: 'We kindly request that payment be settled by Friday.',
      explanation: '"You must" chỉ dùng khi sếp ra lệnh cấp dưới hoặc trong luật pháp. Với đối tác, luôn dùng "We kindly request that..." hoặc "Could you please confirm that...".',
    },
    {
      trapTitle: 'Bẫy nói "I don\'t like your idea"',
      wrongSnippet: 'I don\'t like your design idea for the website.',
      rightSnippet: 'I have some reservations regarding the proposed design and would appreciate exploring alternative layouts.',
      explanation: 'Thay vì chê bai cảm tính, người bản xứ dùng "I have some reservations regarding..." (Tôi còn chút băn khoăn về...) và đề xuất giải pháp thay thế.',
    },
  ],

  exercises: [
    {
      instruction: 'Chọn câu thông báo hóa đơn bị tính thừa tiền khéo léo nhất:',
      scenarioVi: 'Bạn phát hiện hóa đơn của khách sạn tính thừa 1 đêm tiền phòng.',
      type: 'multiple-choice',
      options: [
        'You made a big mistake and cheated me on one extra night. Fix it now.',
        'Why did you charge me for 4 nights when I only slept 3 nights? You must refund me.',
        'Upon reviewing the final statement, it appears there might be a discrepancy regarding an extra night’s stay.',
        'Your accountant did not know how to count nights and charged me wrong.',
      ],
      correctAnswer: 2,
      explanation: '"Upon reviewing the final statement, it appears there might be a discrepancy..." là cách diễn đạt chuyên nghiệp, lịch thiệp và giữ thể diện cho đối tác.',
      nativeWritingTip: 'Từ "discrepancy" (sự chênh lệch) luôn được người bản xứ dùng thay cho từ "mistake" hay "error" khi nói về tiền bạc.',
    },
    {
      instruction: 'Chọn câu từ chối lời mời tham dự sự kiện vì bận lịch:',
      scenarioVi: 'Bạn nhận được thư mời dự hội thảo nhưng trùng lịch công tác nước ngoài.',
      type: 'multiple-choice',
      options: [
        'I cannot go to your conference because I have another trip on that day.',
        'Thank you for the kind invitation. Regrettably, I am unable to attend due to a prior overseas commitment.',
        'No, I am too busy with other work so I will skip your event.',
        'Your conference sounds okay but I have a flight so do not wait for me.',
      ],
      correctAnswer: 1,
      explanation: '"Thank you for the kind invitation. Regrettably, I am unable to attend due to a prior overseas commitment" vừa thể hiện sự biết ơn, vừa đưa ra lý do chính đáng và tôn trọng người mời.',
      nativeWritingTip: 'Dùng "prior commitment" (lịch hẹn đã có từ trước) là cách từ chối lịch thiệp chuẩn mực nhất.',
    },
    {
      instruction: 'Chọn câu yêu cầu khách hàng thanh toán hóa đơn quá hạn một cách chuyên nghiệp:',
      scenarioVi: 'Hóa đơn đã quá hạn thanh toán 7 ngày, bạn cần nhắc nhở khách hàng.',
      type: 'multiple-choice',
      options: [
        'You did not pay the money for 7 days. Pay immediately or we sue you.',
        'Our records indicate that invoice #1094 remains outstanding. Could you please check on the status of this payment?',
        'Why are you so slow in giving us our cash? Check your bank account.',
        'Payment is late. You broke the contract rule.',
      ],
      correctAnswer: 1,
      explanation: '"Our records indicate that invoice #1094 remains outstanding. Could you please check on the status of this payment?" nhắc việc nhẹ nhàng mà dứt khoát, không mang tính công kích.',
      nativeWritingTip: 'Từ "outstanding" mang nghĩa là khoản nợ chưa thanh toán, nghe chuyên nghiệp hơn nhiều so với "unpaid" hay "late".',
    },
  ],
};
