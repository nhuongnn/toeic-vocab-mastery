import { WritingLesson } from '@/types/writing';

export const complaintsApologiesLesson: WritingLesson = {
  id: 'writing-complaints-apologies',
  categoryId: 'complaints-apologies',
  title: 'Client Complaints & Professional Apologies',
  titleVi: 'Xử Lý Khiếu Nại & Thư Xin Lỗi Chuẩn Quốc Tế',
  subtitle: 'Quy tắc AAA (Acknowledge - Apologize - Action): Biến khách hàng đang giận dữ thành đối tác trung thành.',
  difficulty: 'Core TOEIC',
  frequency: '★★★★★',
  tag: 'Dịch Vụ Khách Hàng Quốc Tế',

  nativeMindset: {
    coreIntuition:
      'Khi khách hàng khiếu nại (Complaints), phản xạ tệ nhất của người nghiệp dư là cố thanh minh, đổ lỗi cho đơn vị vận chuyển hoặc tranh cãi ai đúng ai sai. Người bản xứ xử lý theo quy tắc 3 bước AAA: [Acknowledge] Ghi nhận cảm xúc và vấn đề ngay lập tức -> [Apologize] Xin lỗi chân thành vì sự bất tiện/gián đoạn công việc -> [Action] Đưa ra phương án khắc phục cụ thể kèm thời gian hoàn thành.',
    brevitySecret:
      'Đừng phân bua lý do nội bộ dài dòng ("Do nhân viên A bị ốm, máy chủ B bị sập..."). Khách hàng không quan tâm sự cố của bạn; họ chỉ quan tâm khi nào vấn đề của họ được giải quyết xong.',
    vietnameseMistakeWarning:
      'Nhiều bạn dùng câu "Sorry for that" hoặc "It is not our mistake". Trong giao tiếp kinh doanh quốc tế, "Sorry for that" nghe quá hời hợt, còn "It is not our mistake" ngay lập tức đẩy mâu thuẫn lên đỉnh điểm.',
  },

  formulas: [
    {
      purpose: 'Ghi nhận khiếu nại & Cảm ơn đã phản hồi (Acknowledging the Issue)',
      pattern: 'Thank you for bringing this matter to our [immediate] attention regarding [Issue].',
      examples: [
        'Thank you for bringing this matter to our immediate attention regarding the delayed shipment.',
        'We truly appreciate your candid feedback concerning the billing discrepancy.',
      ],
      tone: 'Professional',
    },
    {
      purpose: 'Lời xin lỗi chính thống của doanh nghiệp (Corporate Apology)',
      pattern: 'Please accept our sincere apologies for the [inconvenience / disruption] caused to your [operations / schedule].',
      examples: [
        'Please accept our sincere apologies for the disruption caused to your office workflow.',
        'We deeply regret any frustration this technical glitch may have created.',
      ],
      tone: 'Formal',
    },
    {
      purpose: 'Cam kết hành động khắc phục tức thì (Immediate Remedial Action)',
      pattern: 'We have already [Action Taken] and [Follow-up Action] at no additional charge.',
      examples: [
        'We have already dispatched a replacement unit via priority air courier at no additional charge.',
        'Our technical engineering team has rolled back the update, and system functionality is now fully restored.',
      ],
      tone: 'Professional',
    },
    {
      purpose: 'Biện pháp ngăn ngừa tái diễn (Preventative Reassurance)',
      pattern: 'To ensure this does not recur, we have [Preventative Measure Implemented].',
      examples: [
        'To ensure this does not recur, we have introduced a secondary quality inspection checkpoint at our warehouse.',
        'We are auditing our automated billing scripts to prevent future duplicate invoicing.',
      ],
      tone: 'Professional',
    },
  ],

  beforeAfter: [
    {
      scenarioVi: 'Khách hàng nhận được lô hàng bị móp méo và giao trễ 2 ngày',
      awkwardVersion:
        'Hello customer. We received your angry email. It was not our fault that the boxes are broken because the FedEx delivery man drove carelessly. But we are sorry about that. If you want new boxes, send the broken ones back to us first.',
      awkwardFlaw:
        'Đổ lỗi cho đơn vị giao hàng ("FedEx drove carelessly"), dùng chữ "angry email", xin lỗi hời hợt "sorry about that" và bắt khách hàng phải gửi đồ hỏng về trước mới giải quyết.',
      nativeVersion:
        'Dear Ms. Gable,\n\nThank you for notifying us regarding the condition of your delivery for Order #8821.\n\nPlease accept our sincere apologies for the damaged packaging and the delay in arrival. We understand how critical these promotional brochures are for your upcoming trade show.\n\nTo resolve this immediately, we have reprinted your entire order and dispatched it via overnight priority freight at no additional charge, scheduled to arrive by 10:00 AM tomorrow. You do not need to return the damaged shipment.\n\nWe appreciate your patience and look forward to ensuring your event is a success.\n\nSincerely,\nDavid Park\nHead of Client Relations',
      nativeWhy:
        'Ghi nhận khiếu nại chuyên nghiệp, thấu hiểu tầm quan trọng của sự kiện ("trade show"), đưa ra giải pháp in lại và giao hỏa tốc miễn phí, không làm phiền khách trả hàng hỏng.',
    },
  ],

  powerPhrases: [
    {
      category: 'Lời xin lỗi chuyên nghiệp (Apology Phrases)',
      phrases: [
        { en: 'Please accept our sincerest apologies for...', vi: 'Xin vui lòng chấp nhận lời xin lỗi chân thành nhất của chúng tôi về...' },
        { en: 'We take full responsibility for...', vi: 'Chúng tôi xin chịu hoàn toàn trách nhiệm về...' },
        { en: 'We deeply regret the inconvenience caused...', vi: 'Chúng tôi vô cùng lấy làm tiếc về sự bất tiện đã gây ra...' },
      ],
    },
    {
      category: 'Hành động đền bù & Khắc phục (Resolution & Compensation)',
      phrases: [
        { en: 'As a gesture of goodwill, we would like to offer...', vi: 'Như một cử chỉ thiện chí, chúng tôi xin gửi tặng...' },
        { en: 'A full refund has been credited to your account', vi: 'Toàn bộ số tiền hoàn lại đã được cộng vào tài khoản của bạn' },
        { en: 'We have expedited your replacement order', vi: 'Chúng tôi đã ưu tiên giao hỏa tốc đơn hàng thay thế của bạn' },
      ],
    },
  ],

  commonTraps: [
    {
      trapTitle: 'Bẫy nói "It\'s not my department\'s fault"',
      wrongSnippet: 'The logistics department made an error, not my sales team.',
      rightSnippet: 'There was an internal breakdown in our fulfillment process, which we have now addressed.',
      explanation: 'Trước mặt khách hàng, toàn thể công ty là một thể thống nhất. Việc đổ lỗi cho phòng ban khác chỉ làm công ty trông thiếu tổ chức và thiếu trách nhiệm.',
    },
    {
      trapTitle: 'Bẫy hứa hẹn vượt quá thẩm quyền',
      wrongSnippet: 'I guarantee this will never happen ever again in your life.',
      rightSnippet: 'We have taken concrete steps to significantly minimize the likelihood of any future recurrence.',
      explanation: 'Tránh dùng từ ngữ tuyệt đối hóa phi thực tế ("never ever happen"). Hãy dùng cách diễn đạt chắc chắn nhưng chuẩn mực ("taken concrete steps to prevent recurrence").',
    },
  ],

  exercises: [
    {
      instruction: 'Chọn câu mở đầu thư phản hồi khiếu nại khách hàng đúng chuẩn quốc tế nhất:',
      scenarioVi: 'Khách hàng gửi thư phàn nàn về việc dịch vụ internet bị gián đoạn 3 tiếng.',
      type: 'multiple-choice',
      options: [
        'Why are you complaining so loudly? Internet broke everywhere today.',
        'Thank you for bringing this service interruption to our immediate attention.',
        'We got your message and we know the internet was dead.',
        'Do not worry, internet dies all the time in bad weather.',
      ],
      correctAnswer: 1,
      explanation: '"Thank you for bringing this service interruption to our immediate attention" thể hiện tính chuyên nghiệp cao độ và sự trân trọng ý kiến khách hàng.',
      nativeWritingTip: 'Luôn biến lời phàn nàn thành cơ hội bằng cách cảm ơn họ đã báo tin ("Thank you for bringing this to our attention").',
    },
    {
      instruction: 'Chọn câu đề nghị bồi thường thiện chí chuyên nghiệp nhất:',
      scenarioVi: 'Khách hàng bị giao nhầm món ăn trong buổi tiệc trưa công ty.',
      type: 'multiple-choice',
      options: [
        'Take this $10 voucher and stop sending emails to us.',
        'As a gesture of goodwill for the mix-up, we have waived today\'s catering fee and applied a 20% credit to your next event.',
        'Eat the wrong food anyway, it tastes good too.',
        'The cook was sleepy so here is a small coupon for you.',
      ],
      correctAnswer: 1,
      explanation: '"As a gesture of goodwill for the mix-up, we have waived today\'s catering fee..." thể hiện sự bồi thường xứng đáng và thái độ lịch thiệp.',
      nativeWritingTip: 'Cụm từ "As a gesture of goodwill" (Như một cử chỉ thiện chí) là cụm từ vàng trong xử lý sự cố dịch vụ khách hàng.',
    },
    {
      instruction: 'Chọn câu trấn an khách hàng về biện pháp ngăn ngừa tái diễn sự cố:',
      scenarioVi: 'Khách hàng lo ngại hệ thống thanh toán tự động tiếp tục trừ tiền sai.',
      type: 'multiple-choice',
      options: [
        'We fired the intern who touched the computer, so relax.',
        'To ensure this billing issue does not recur, we have deployed an automated verification check on all recurring invoices.',
        'Nothing ever goes wrong twice in this company, trust us.',
        'Our computer promised not to make this mistake anymore.',
      ],
      correctAnswer: 1,
      explanation: '"To ensure this billing issue does not recur, we have deployed an automated verification check..." đưa ra giải pháp kỹ thuật cụ thể và đáng tin cậy.',
      nativeWritingTip: 'Công thức "To ensure [Issue] does not recur, we have [Action Taken]" chứng minh doanh nghiệp học hỏi và nâng cấp từ sai lầm.',
    },
  ],
};
