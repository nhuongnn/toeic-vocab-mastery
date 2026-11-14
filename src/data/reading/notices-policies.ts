import { ReadingLesson } from '@/types/reading';

export const noticePolicyLesson: ReadingLesson = {
  id: 'reading-notices-policies',
  categoryId: 'notices-policies',
  title: 'Notices, Policies & Facility Updates',
  titleVi: 'Thông Báo Quy Chế & Cập Nhật Cơ Sở Vật Chất',
  subtitle: 'Kỹ thuật săn Điều kiện ngoại lệ (Exceptions), Đối tượng áp dụng và Mốc thời gian hiệu lực.',
  difficulty: 'Foundation',
  frequency: '★★★★★',
  tag: 'TOEIC Part 7 Bẫy Thường Gặp',
  estimatedTime: '3 phút đọc hiểu',

  nativeMindset: {
    coreIntuition:
      'Thông báo nội bộ hoặc thông báo công cộng (Notices/Policies) được thiết kế để truyền đạt quy định và thay đổi đột xuất. Người bản xứ đọc loại văn bản này bằng cách tìm ngay 3 "Cọc mấu chốt": [Ai bị ảnh hưởng?], [Điều gì bị cấm / thay đổi?], và [Trường hợp nào được miễn trừ?].',
    readingSpeedSecret:
      'Tập trung vào các từ nối mang tính điều kiện và ngoại lệ: "unless", "except for", "provided that", "failure to comply will result in...". Các câu hỏi NOT/TRUE hoặc bẫy điểm cao luôn xoay quanh những từ này.',
    vietnameseMistakeWarning:
      'Thí sinh thường lướt qua phần ghi chú nhỏ (asterisk * hoặc câu nằm dưới cùng "Note: ..."). Đây chính là nơi tác giả đề thi cài bẫy suy luận hoặc trường hợp đặc biệt.',
  },

  attackStrategy: {
    step1: 'Xác định nhanh Tiêu đề in đậm (Bold Header): Nắm ngay loại sự vụ (Sửa chữa đường dây, đổi giờ làm, chính sách đỗ xe, ngày nghỉ lễ).',
    step2: 'Quét mốc thời gian: "Effective immediately" (Có hiệu lực ngay) hay "Starting next Monday" (Bắt đầu từ thứ Hai tuần sau). Phân biệt ngày thông báo và ngày bắt đầu thi hành.',
    step3: 'Đối chiếu các trường hợp ngoại lệ: Tìm chữ "Except", "Exempt", "Only applicable to".',
    proTip: 'Khi gặp câu hỏi dạng "What is NOT mentioned?", hãy dùng phương pháp loại trừ 3 phương án xuất hiện rõ trong bài, phương án còn lại là đáp án đúng.',
  },

  goldenParaphrases: [
    {
      original: 'effective [date]',
      paraphrased: 'take effect / begin operating on [date]',
      contextVi: 'Chính thức có hiệu lực từ ngày...',
    },
    {
      original: 'prohibited / forbidden',
      paraphrased: 'not allowed / barred / banned',
      contextVi: 'Bị nghiêm cấm (không được hút thuốc, không đỗ xe qua đêm)',
    },
    {
      original: 'in observance of [holiday]',
      paraphrased: 'to honor / celebrate / closed for [holiday]',
      contextVi: 'Đóng cửa văn phòng nhân dịp nghỉ lễ tưởng niệm',
    },
    {
      original: 'eligible for',
      paraphrased: 'entitled to / qualified for',
      contextVi: 'Đủ điều kiện nhận trợ cấp hoặc chế độ đãi ngộ',
    },
    {
      original: 'mandatory compliance',
      paraphrased: 'strict adherence / must obey the rules',
      contextVi: 'Bắt buộc tuân thủ quy định',
    },
  ],

  primaryPassage: {
    type: 'Notice',
    title: 'Thông báo Ban Quản Lý Tòa Nhà TTT Plaza',
    header: {
      from: 'Property Operations Management - Metro Tower',
      date: 'Wednesday, May 8',
      subject: 'Scheduled Parking Garage Resurfacing & Commuter Subsidy',
    },
    content: `ATTENTION ALL BUILDING TENANTS AND EMPLOYEES:

Please be advised that levels B2 and B3 of the underground parking garage will be temporarily closed for asphalt resurfacing and line repainting starting Monday, May 13 through Friday, May 17. Normal garage operations will resume on Saturday, May 18 at 6:00 AM.

During this five-day maintenance period:
1. Level B1 parking spaces will be exclusively reserved for building service vehicles, emergency personnel, and visitors with disabilities displaying valid accessibility permits. Unauthorized vehicles parked on B1 will be towed at the owner's expense.
2. Regular tenant permit holders are instructed to utilize the public municipal parking structure located two blocks east on Elm Street. Building management has arranged a discounted flat rate of $8 per day upon presentation of your Metro Tower company badge.
3. As an eco-friendly alternative, the building management office will provide a 100% public transit subsidy for subway and bus commuters during the closure week. To claim transit ticket compensation, bring your transit receipts to Suite 402 by May 24.

We apologize for the temporary inconvenience and thank you for your cooperation in maintaining our facility standards.

Property Operations Management
Metro Tower Suites`,
    vietnameseTranslation: `CHÚ Ý TOÀN THỂ KHÁCH THUÊ VÀ NHÂN VIÊN TÒA NHÀ:

Xin lưu ý rằng tầng B2 và B3 của bãi đỗ xe ngầm sẽ tạm thời đóng cửa để trải lại nhựa đường và sơn lại vạch kẻ bắt đầu từ Thứ Hai, ngày 13 tháng 5 đến hết Thứ Sáu, ngày 17 tháng 5. Bãi đỗ xe sẽ hoạt động bình thường trở lại vào Thứ Bảy, ngày 18 tháng 5 lúc 6:00 sáng.

Trong khoảng thời gian bảo trì 5 ngày này:
1. Các chỗ đỗ xe tại Tầng B1 sẽ chỉ dành riêng cho xe dịch vụ của tòa nhà, nhân viên cứu hộ khẩn cấp và khách khuyết tật có giấy phép hợp lệ. Phương tiện không được phép đỗ tại B1 sẽ bị cẩu đi và chủ xe phải chịu toàn bộ chi phí.
2. Những người có vé tháng thông thường được hướng dẫn sử dụng bãi đỗ xe công cộng của thành phố cách hai dãy nhà về phía đông trên Đường Elm. Ban quản lý tòa nhà đã thu xếp mức giá ưu đãi đồng giá 8 USD/ngày khi bạn xuất trình thẻ nhân viên của Metro Tower.
3. Như một phương án thay thế thân thiện với môi trường, văn phòng ban quản lý tòa nhà sẽ trợ cấp 100% chi phí phương tiện công cộng cho những người đi tàu điện ngầm và xe buýt trong tuần đóng cửa. Để nhận bồi hoàn vé xe, hãy mang biên lai đến Phòng 402 trước ngày 24 tháng 5.

Chúng tôi xin lỗi vì sự bất tiện tạm thời và cảm ơn sự hợp tác của các bạn trong việc duy trì tiêu chuẩn cơ sở vật chất.

Ban Quản Lý Vận Hành Tòa Nhà
Metro Tower Suites`,
    keyHighlights: [
      {
        text: 'temporarily closed ... May 13 through Friday, May 17',
        type: 'signal',
        note: 'Thời gian bảo trì 5 ngày. Hoạt động lại vào ngày 18/5.',
      },
      {
        text: 'exclusively reserved for ... displaying valid accessibility permits',
        type: 'purpose',
        note: 'Tầng B1 chỉ dành cho xe ưu tiên và người khuyết tật có thẻ.',
      },
      {
        text: 'towed at the owner’s expense',
        type: 'action',
        note: 'Hậu quả nếu đỗ xe trái phép: bị cẩu đi và phải tự trả tiền.',
      },
      {
        text: '100% public transit subsidy',
        type: 'paraphrase',
        note: 'Được đài thọ toàn bộ tiền xe buýt/tàu điện (= fully reimbursed for commuting cost).',
      },
    ],
  },

  commonTraps: [
    {
      trapName: 'Bẫy Ai được đỗ ở Tầng B1 (Exemption Trap)',
      trapDescription: 'Đề hỏi: "Who is allowed to park on Level B1 during the maintenance?". Đề đưa ra các bẫy như: người có vé tháng (tenant permit holders), người trả $8, nhân viên bất kỳ.',
      howToAvoid: 'Chú ý từ "exclusively reserved for". Chỉ có xe dịch vụ, xe khẩn cấp và người có giấy phép tiếp cận người khuyết tật mới được đỗ.',
      examplePassageSnippet: 'Level B1 parking spaces will be exclusively reserved for building service vehicles...',
      distractorOption: 'All tenants with a monthly parking pass',
      correctOption: 'Drivers with official accessibility permits',
    },
    {
      trapName: 'Bẫy Địa điểm bãi đỗ thay thế (Location Trap)',
      trapDescription: 'Đề hỏi nơi gửi xe thay thế. Nhầm lẫn giữa Tầng B1 và bãi công cộng trên đường Elm Street.',
      howToAvoid: 'Đọc kỹ hướng dẫn số 2: Regular tenants -> municipal parking structure on Elm Street.',
      examplePassageSnippet: 'utilize the public municipal parking structure located two blocks east on Elm Street',
      distractorOption: 'Any street corner outside Metro Tower',
      correctOption: 'A city parking facility on Elm Street',
    },
  ],

  quiz: [
    {
      question: 'What is the main topic of the announcement?',
      questionType: 'main-idea',
      options: [
        'An increase in monthly parking rates for building tenants',
        'Temporary parking changes due to maintenance work',
        'The permanent closure of the Metro Tower underground garage',
        'New green energy regulations for tenant commuter vehicles',
      ],
      correctAnswer: 1,
      explanation: 'Thông báo nêu rõ bãi xe B2 và B3 sẽ tạm thời đóng cửa để trải lại nhựa đường (resurfacing), kèm theo các phương án thay thế. Đây là sự thay đổi tạm thời do công tác bảo dưỡng.',
      clueSnippet: 'levels B2 and B3 ... will be temporarily closed for asphalt resurfacing',
      paraphraseUsed: 'temporarily closed for resurfacing = temporary parking changes due to maintenance',
    },
    {
      question: 'How can tenants receive a reduced rate at the Elm Street garage?',
      questionType: 'detail',
      options: [
        'By paying in cash before 8:00 AM',
        'By showing their Metro Tower identification badge',
        'By purchasing a weekly parking voucher at Suite 402',
        'By arriving in a carpool with at least three coworkers',
      ],
      correctAnswer: 1,
      explanation: 'Khoản số 2 nêu: "...arranged a discounted flat rate of $8 per day upon presentation of your Metro Tower company badge". Từ "presentation" đồng nghĩa với "showing".',
      clueSnippet: 'upon presentation of your Metro Tower company badge',
      paraphraseUsed: 'presentation of badge = showing identification badge',
    },
    {
      question: 'What will happen to unauthorized cars left on Level B1?',
      questionType: 'detail',
      options: [
        'They will be clamped and fined $50',
        'They will be towed at the vehicle owner’s cost',
        'They will be inspected by security for hazardous items',
        'They will lose parking privileges for the rest of the year',
      ],
      correctAnswer: 1,
      explanation: 'Khoản 1 nêu rõ: "Unauthorized vehicles parked on B1 will be towed at the owner\'s expense".',
      clueSnippet: 'will be towed at the owner\'s expense',
      paraphraseUsed: 'at owner\'s expense = at the vehicle owner\'s cost',
    },
  ],
};
