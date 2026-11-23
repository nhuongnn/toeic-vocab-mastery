import { RoleplayScenario, CharacterRole, CharacterConfig, ScenarioLevel, UserLearningContext } from '@/types/roleplay';

export const DEFAULT_CHARACTERS: Record<CharacterRole, CharacterConfig> = {
  boss: {
    name: 'David Miller',
    role: 'boss',
    gender: 'male',
    age: 45,
    department: 'Marketing & Strategy',
    avatar: 'cat-boss',
    personality: 'Chuyên nghiệp, thẳng thắn, coi trọng kết quả và quản lý thời gian hiệu quả.',
  },
  colleague: {
    name: 'Sarah Jenkins',
    role: 'colleague',
    gender: 'female',
    age: 29,
    department: 'Product & Design',
    avatar: 'coffee-zombie',
    personality: 'Nhiệt tình, thân thiện, thích làm việc nhóm và chia sẻ kinh nghiệm công sở.',
  },
  staff: {
    name: 'Alex Chen',
    role: 'staff',
    gender: 'male',
    age: 24,
    department: 'Operations & Admin',
    avatar: 'shiba-intern',
    personality: 'Chăm chỉ, lễ phép, ham học hỏi và luôn chủ động cập nhật công việc.',
  },
  friend: {
    name: 'Lucas Miller',
    role: 'friend',
    gender: 'male',
    age: 26,
    department: 'Bạn Bè & Đời Sống (Friends & Lifestyle)',
    avatar: 'chibi-corgi-friend',
    personality: 'Hóm hỉnh, năng động, cởi mở, thích xem phim, chơi game, dạo phố cà phê và luôn sẵn lòng lắng nghe bạn.',
  },
  family: {
    name: 'Helen Miller (Mẹ)',
    role: 'family',
    gender: 'female',
    age: 52,
    department: 'Gia Đình & Tâm Sự (Family & Heart-to-Heart)',
    avatar: 'chibi-mom-cook',
    personality: 'Ân cần, ấm áp, giàu tình thương, luôn hỏi han sức khỏe, lắng nghe những áp lực cuộc sống và dành cho con lời khuyên sâu sắc.',
  },
  lover: {
    name: 'Chloe Adams',
    role: 'lover',
    gender: 'female',
    age: 25,
    department: 'Hẹn Hò & Tình Yêu (Romantic Partner)',
    avatar: 'chibi-bunny-love',
    personality: 'Ngọt ngào, tinh tế, chu đáo, thích cùng nhau lên kế hoạch hẹn hò, chia sẻ niềm vui nỗi buồn và luôn động viên bạn mỗi ngày.',
  },
  interviewer: {
    name: 'Ethan Bradley',
    role: 'interviewer',
    gender: 'male',
    age: 38,
    department: 'Tuyển Dụng & Phỏng Vấn IT (Tech & Software)',
    avatar: 'tech-lead-interviewer',
    personality: 'Chuyên nghiệp, sắc bén, đánh giá cao tư duy logic, kiến trúc hệ thống thực tế và văn hóa làm việc nhóm Agile.',
  },
  stranger: {
    name: 'Oliver Wright',
    role: 'stranger',
    gender: 'male',
    age: 30,
    department: 'Người Bản Địa & Du Khách (Friendly Local / Transit)',
    avatar: 'friendly-local-guide',
    personality: 'Thân thiện, cởi mở, nhiệt tình chỉ đường, hướng dẫn xe bus, tàu điện, thủ tục sân bay và hào hứng chia sẻ đặc sản địa phương.',
  },
};

export const PRESET_NAMES = {
  male: [
    'David Miller',
    'Michael Chen',
    'Robert Vance',
    'Alex Taylor',
    'James Wilson',
    'Kenji Sato',
    'Daniel Evans',
    'Brian Thompson',
  ],
  female: [
    'Sarah Jenkins',
    'Emily Watson',
    'Jessica Parker',
    'Rachel Green',
    'Grace Kim',
    'Olivia Clark',
    'Laura Martinez',
    'Sophia Carter',
  ],
  other: [
    'Jordan Lee',
    'Morgan Rivera',
    'Taylor Brooks',
    'Alex Morgan',
    'Cameron Diaz',
    'Chris Nolan',
  ],
};

export const DEPARTMENTS = [
  'Marketing & Communications',
  'Human Resources & Recruitment',
  'Sales & Business Development',
  'Finance & Accounting',
  'Information Technology & Software',
  'Operations & Administration',
  'Customer Success & Support',
  'Product Management & Logistics',
  'Bạn Bè & Đời Sống (Friends & Lifestyle)',
  'Gia Đình & Tâm Sự (Family & Heart-to-Heart)',
  'Hẹn Hò & Tình Yêu (Romantic Partner)',
  'Du Lịch & Khám Phá (Travel & Adventure)',
  'Ẩm Thực & Nấu Ăn (Culinary & Cooking)',
  'Giao Thông & Di Chuyển (Transit & Directions)',
  'Văn Hóa & Đặc Sản Địa Phương (Local Heritage & Food)',
  'Podcast & Quan Điểm Sống (Podcast & Mindset)',
  'Tuyển Dụng & Phỏng Vấn IT (IT Technical Interview)',
];

export const PRESET_SCENARIOS: RoleplayScenario[] = [
  // ================= BOSS SCENARIOS =================
  {
    id: 'boss-deadline-extension',
    title: 'Xin gia hạn Deadline dự án',
    englishTitle: 'the project deadline extension',
    vietnameseTitle: 'Báo cáo khó khăn & Xin dời lịch hoàn thành báo cáo',
    description: 'Báo cáo tiến độ hiện tại với sếp, giải thích nguyên nhân chậm trễ và đàm phán xin lùi deadline thêm 2 ngày một cách chuyên nghiệp.',
    role: 'boss',
    level: 'intermediate',
    targetScoreRange: '650 - 750',
    department: 'Marketing & Strategy',
    objective: 'Trình bày tiến độ 70%, giải thích nguyên nhân dữ liệu đối tác gửi trễ và đề xuất nộp báo cáo hoàn chỉnh vào thứ Sáu.',
    initialMessage: 'Good morning! I wanted to check in on the quarterly marketing analysis report. It was due by end of day tomorrow. How is everything coming along?',
    initialTranslation: 'Chào buổi sáng! Tôi muốn kiểm tra tiến độ báo cáo phân tích marketing quý. Theo lịch là phải nộp vào cuối ngày mai. Mọi thứ đang tiến triển thế nào rồi?',
    suggestedVocabulary: ['postpone', 'delay', 'deliverable', 'workload', 'thorough', 'timeline'],
    keyPhrases: [
      {
        phrase: 'I would like to request an extension',
        meaning: 'Tôi muốn xin gia hạn thêm thời gian',
        usageTip: 'Cách diễn đạt trang trọng khi xin lùi hạn chót với cấp trên.',
      },
      {
        phrase: 'Due to unforeseen circumstances',
        meaning: 'Do một số tình huống phát sinh ngoài dự kiến',
        usageTip: 'Cụm từ chuẩn mực để giải thích nguyên nhân khách quan.',
      },
      {
        phrase: 'I can deliver a preliminary draft by...',
        meaning: 'Tôi có thể gửi bản thảo sơ bộ trước vào...',
        usageTip: 'Thể hiện thiện chí và trách nhiệm trong công việc.',
      },
    ],
  },
  {
    id: 'boss-daily-task-clarification',
    title: 'Làm rõ yêu cầu công việc mới',
    englishTitle: 'the daily task priorities',
    vietnameseTitle: 'Nhận chỉ đạo công việc & Xác nhận thứ tự ưu tiên',
    description: 'Sếp giao cho bạn 2 đầu việc gấp. Hãy hỏi lại để làm rõ thứ tự ưu tiên và phạm vi công việc cần xử lý trước.',
    role: 'boss',
    level: 'essential',
    targetScoreRange: '450 - 600',
    department: 'Operations & Admin',
    objective: 'Xác nhận xem việc chuẩn bị hợp đồng hay việc gửi email cho khách hàng là ưu tiên số 1 của ngày hôm nay.',
    initialMessage: 'Hi there, we have a busy day ahead. I need the revised client contracts prepared, and we also need to respond to yesterday’s vendor inquiries before noon.',
    initialTranslation: 'Chào bạn, hôm nay chúng ta có khá nhiều việc bận rộn đấy. Tôi cần chuẩn bị lại các hợp đồng khách hàng đã sửa đổi, đồng thời phải phản hồi thắc mắc của nhà cung cấp trước 12h trưa.',
    suggestedVocabulary: ['priority', 'clarify', 'urgent', 'inquiry', 'schedule', 'task'],
    keyPhrases: [
      {
        phrase: 'Which task should I prioritize first?',
        meaning: 'Tôi nên ưu tiên hoàn thành việc nào trước?',
        usageTip: 'Hỏi rõ ràng giúp tránh hiểu lầm trong thứ tự ưu tiên.',
      },
      {
        phrase: 'Could you please confirm the deadline for...?',
        meaning: 'Sếp có thể xác nhận lại hạn chót cho... được không?',
        usageTip: 'Lịch sự và chuyên nghiệp khi hỏi lại thời hạn.',
      },
    ],
  },
  {
    id: 'boss-budget-review',
    title: 'Bảo vệ Đề xuất Ngân sách Quý tới',
    englishTitle: 'the quarterly budget proposal',
    vietnameseTitle: 'Trình bày và thuyết phục sếp duyệt chi phí đầu tư công nghệ',
    description: 'Sếp đang băn khoăn về chi phí phần mềm mới vượt dự toán 15%. Bạn cần giải thích tỷ suất hoàn vốn (ROI) và lợi ích dài hạn.',
    role: 'boss',
    level: 'advanced',
    targetScoreRange: '800+',
    department: 'Finance & Accounting',
    objective: 'Thuyết phục sếp rằng khoản đầu tư phần mềm 15% tăng thêm sẽ giúp tự động hóa và tiết kiệm 30 giờ làm việc mỗi tháng.',
    initialMessage: 'I reviewed your proposed software upgrade proposal. The overall expenditure is roughly 15% above our initial budget forecast. Can you justify why this investment is essential right now?',
    initialTranslation: 'Tôi đã xem qua đề xuất nâng cấp phần mềm của bạn. Tổng chi phí cao hơn khoảng 15% so với dự toán ban đầu. Bạn có thể giải thích tại sao khoản đầu tư này lại cần thiết ngay lúc này không?',
    suggestedVocabulary: ['expenditure', 'allocation', 'ROI', 'streamline', 'cost-effective', 'feasibility'],
    keyPhrases: [
      {
        phrase: 'The projected return on investment outweighs the initial cost',
        meaning: 'Lợi nhuận dự kiến sẽ vượt trội so với chi phí ban đầu',
        usageTip: 'Dùng trong các buổi thuyết trình và đàm phán tài chính cao cấp.',
      },
      {
        phrase: 'In the long run, this will significantly reduce operational overhead',
        meaning: 'Về lâu dài, điều này sẽ giảm đáng kể chi phí vận hành',
        usageTip: 'Nhấn mạnh giá trị chiến lược dài hạn.',
      },
    ],
  },
  {
    id: 'boss-performance-review',
    title: 'Đánh giá Hiệu suất & Thăng tiến',
    englishTitle: 'the quarterly performance review',
    vietnameseTitle: 'Buổi họp 1-on-1 định kỳ với cấp trên về kết quả công việc',
    description: 'Trò chuyện trong buổi đánh giá quý (Performance Review), tổng kết thành tích đạt được và thảo luận về cơ hội phát triển sự nghiệp.',
    role: 'boss',
    level: 'intermediate',
    targetScoreRange: '650 - 750',
    department: 'Human Resources & Recruitment',
    objective: 'Báo cáo việc vượt chỉ tiêu 120% KPI quý vừa rồi và bày tỏ nguyện vọng đảm nhận vị trí Team Lead.',
    initialMessage: 'Thanks for coming in for our quarterly 1-on-1. You’ve done remarkable work on the onboarding project. How do you feel about your achievements over the past six months?',
    initialTranslation: 'Cảm ơn bạn đã đến buổi họp 1-on-1 định kỳ này. Bạn đã làm việc rất ấn tượng trong dự án đón nhân viên mới. Bạn cảm thấy thế nào về những thành quả của mình trong 6 tháng qua?',
    suggestedVocabulary: ['exceed', 'milestone', 'leadership', 'initiative', 'contribution', 'career path'],
    keyPhrases: [
      {
        phrase: 'I am proud to say that our team exceeded the quarterly targets',
        meaning: 'Tôi tự hào chia sẻ rằng đội nhóm chúng tôi đã vượt chỉ tiêu quý',
        usageTip: 'Báo cáo thành tích tự tin và chuyên nghiệp.',
      },
      {
        phrase: 'I am eager to take on more leadership responsibilities',
        meaning: 'Tôi rất sẵn lòng đảm nhận thêm các trọng trách lãnh đạo',
        usageTip: 'Cách lịch sự và khéo léo để đề xuất thăng tiến.',
      },
    ],
  },

  // ================= COLLEAGUE SCENARIOS =================
  {
    id: 'colleague-coffee-chit-chat',
    title: 'Trò chuyện Giờ Giải lao & Kế hoạch Cuối tuần',
    englishTitle: 'weekend plans and work small talk',
    vietnameseTitle: 'Giao tiếp hàng ngày, Small Talk thân thiện tại khu vực Pantry',
    description: 'Gặp đồng nghiệp tại quầy cà phê công ty. Hỏi thăm công việc tuần qua và chia sẻ kế hoạch nghỉ ngơi cuối tuần.',
    role: 'colleague',
    level: 'essential',
    targetScoreRange: '450 - 600',
    department: 'Marketing & Communications',
    objective: 'Hỏi thăm đồng nghiệp về dự án tuần này và rủ nhau đi ăn trưa tại quán mới mở gần công ty.',
    initialMessage: 'Hey! Good to see you. Grabbing another coffee to survive this Monday? How was your weekend?',
    initialTranslation: 'Chào bạn! Vui quá gặp bạn ở đây. Đang lấy thêm tách cà phê để sống sót qua ngày thứ Hai à? Cuối tuần của bạn thế nào?',
    suggestedVocabulary: ['unwind', 'weekend', 'pantry', 'workload', 'recommend', 'lunch'],
    keyPhrases: [
      {
        phrase: 'It was pretty relaxing, thanks for asking!',
        meaning: 'Cuối tuần khá thư giãn, cảm ơn bạn đã hỏi nhé!',
        usageTip: 'Phản xạ giao tiếp tự nhiên và lịch sự trong small talk.',
      },
      {
        phrase: 'Are you free to grab lunch together later today?',
        meaning: 'Trưa nay bạn có rảnh đi ăn cùng không?',
        usageTip: 'Lời mời ăn trưa thân thiện giữa đồng nghiệp.',
      },
    ],
  },
  {
    id: 'colleague-presentation-prep',
    title: 'Phối hợp Soạn Slide Thuyết trình',
    englishTitle: 'the presentation slide deck',
    vietnameseTitle: 'Cùng phân chia công việc chuẩn bị cho buổi họp với đối tác',
    description: 'Cùng đồng nghiệp rà soát lại bài thuyết trình cho khách hàng vào ngày mai. Phân chia ai phụ trách phần dữ liệu tài chính và ai nói phần giải pháp.',
    role: 'colleague',
    level: 'intermediate',
    targetScoreRange: '650 - 750',
    department: 'Product Management & Logistics',
    objective: 'Thống nhất phân chia người trình bày 5 slide đầu và nhờ đồng nghiệp kiểm tra lại số liệu bảng thống kê.',
    initialMessage: 'Hey! Do you have a quick 10 minutes? I just finished reviewing our slide deck for tomorrow’s client presentation. I think we need to tweak the financial charts a bit.',
    initialTranslation: 'Chào bạn! Bạn có rảnh khoảng 10 phút không? Tôi vừa xem lại bộ slide cho buổi thuyết trình khách hàng ngày mai. Tôi nghĩ chúng ta cần chỉnh sửa lại biểu đồ tài chính một chút.',
    suggestedVocabulary: ['deck', 'rehearse', 'highlight', 'visuals', 'collaborate', 'feedback'],
    keyPhrases: [
      {
        phrase: 'How about we divide the presentation into two sections?',
        meaning: 'Hay là chúng ta chia bài thuyết trình thành hai phần nhé?',
        usageTip: 'Đề xuất phân chia công việc công bằng và hợp lý.',
      },
      {
        phrase: 'I can handle the product demo if you cover the metrics',
        meaning: 'Tôi có thể phụ trách demo sản phẩm nếu bạn nói về phần số liệu',
        usageTip: 'Phân công nhiệm vụ rõ ràng.',
      },
    ],
  },
  {
    id: 'colleague-brainstorm-campaign',
    title: 'Động não Ý tưởng Chiến dịch Mới',
    englishTitle: 'the new marketing campaign',
    vietnameseTitle: 'Thảo luận ý tưởng truyền thông thu hút tệp khách hàng trẻ',
    description: 'Hai đồng nghiệp cùng ngồi brainstorm giải pháp quảng bá sản phẩm mới trên mạng xã hội với ngân sách tối ưu.',
    role: 'colleague',
    level: 'advanced',
    targetScoreRange: '800+',
    department: 'Sales & Business Development',
    objective: 'Đề xuất ý tưởng hợp tác với micro-influencer và lắng nghe phản biện của đồng nghiệp.',
    initialMessage: 'Thanks for jumping into this brainstorming session! Our target demographic this quarter is young professionals aged 22 to 30. What innovative angles should we consider for the launch?',
    initialTranslation: 'Cảm ơn bạn đã tham gia buổi brainstorm này! Nhóm khách hàng mục tiêu quý này là giới trẻ văn phòng từ 22 đến 30 tuổi. Chúng ta nên cân nhắc góc tiếp cận đột phá nào cho đợt ra mắt nhỉ?',
    suggestedVocabulary: ['demographic', 'engagement', 'influencer', 'viral', 'traction', 'synergy'],
    keyPhrases: [
      {
        phrase: 'What if we leveraged short-form video content on TikTok?',
        meaning: 'Nếu chúng ta tận dụng video ngắn trên TikTok thì sao nhỉ?',
        usageTip: 'Cách mở đầu đưa ra ý kiến đóng góp sáng tạo.',
      },
      {
        phrase: 'That sounds promising, but we should also factor in the budget constraint',
        meaning: 'Nghe rất triển vọng, nhưng chúng ta cũng nên tính đến giới hạn ngân sách',
        usageTip: 'Phản biện lịch sự, xây dựng.',
      },
    ],
  },
  {
    id: 'colleague-urgent-support',
    title: 'Nhờ Đồng nghiệp Hỗ trợ Tài liệu Gấp',
    englishTitle: 'the urgent sales report backup',
    vietnameseTitle: 'Hỏi xin file dữ liệu bán hàng tháng trước khi hệ thống bị chậm',
    description: 'Hệ thống ERP nội bộ đang bảo trì, bạn cần đồng nghiệp gửi gấp bản sao lưu dữ liệu doanh số để kịp nộp khách hàng.',
    role: 'colleague',
    level: 'essential',
    targetScoreRange: '450 - 600',
    department: 'Sales & Business Development',
    objective: 'Nhờ đồng nghiệp gửi file Excel doanh thu qua email hoặc Slack trong vòng 15 phút tới.',
    initialMessage: 'Hey! I noticed you are working on the sales summary. Did you manage to access the central database this morning, or is it down on your end too?',
    initialTranslation: 'Chào bạn! Mình thấy bạn đang làm báo cáo tổng kết doanh số. Sáng nay bạn có vào được cơ sở dữ liệu trung tâm không, hay bên bạn cũng bị sập vậy?',
    suggestedVocabulary: ['backup', 'spreadsheet', 'urgent', 'attachment', 'access', 'assist'],
    keyPhrases: [
      {
        phrase: 'Could you do me a quick favor and email me your local copy?',
        meaning: 'Bạn có thể giúp mình gửi bản lưu máy tính qua email được không?',
        usageTip: 'Nhờ vả thân thiện nhưng lịch sự trong môi trường công sở.',
      },
      {
        phrase: 'I really appreciate your help with this!',
        meaning: 'Mình rất cảm ơn sự hỗ trợ kịp thời của bạn!',
        usageTip: 'Bày tỏ lòng biết ơn tự nhiên.',
      },
    ],
  },

  // ================= OFFICE STAFF / JUNIOR SCENARIOS =================
  {
    id: 'staff-onboarding-guidance',
    title: 'Nhân viên Mới Xin Hướng dẫn Quy trình',
    englishTitle: 'the expense reimbursement procedure',
    vietnameseTitle: 'Cấp dưới hỏi về quy định gửi hóa đơn và thanh toán chi phí',
    description: 'Một nhân viên cấp dưới mới vào làm hỏi bạn về quy trình kê khai hóa đơn taxi công tác và hoàn ứng.',
    role: 'staff',
    level: 'essential',
    targetScoreRange: '450 - 600',
    department: 'Human Resources & Recruitment',
    objective: 'Hướng dẫn nhân viên mới điền mẫu hoàn ứng Expense Claim Form và nộp trước ngày 25 hàng tháng.',
    initialMessage: 'Excuse me! I am really sorry to interrupt, but since it is my first month here, could you show me how to submit travel reimbursement receipts properly?',
    initialTranslation: 'Xin lỗi vì đã làm phiền bạn một chút, vì đây là tháng đầu tiên em làm việc tại công ty, anh/chị có thể hướng dẫn em cách nộp hóa đơn hoàn ứng chi phí đi lại đúng quy định được không ạ?',
    suggestedVocabulary: ['reimbursement', 'receipt', 'protocol', 'guideline', 'finance', 'attach'],
    keyPhrases: [
      {
        phrase: 'No problem at all, I would be happy to walk you through it',
        meaning: 'Không có chi, tôi rất sẵn lòng hướng dẫn bạn từng bước',
        usageTip: 'Cách trả lời thân thiện, hỗ trợ nhiệt tình của tiền bối/đồng nghiệp.',
      },
      {
        phrase: 'Make sure to keep all original VAT invoices and submit before the 25th',
        meaning: 'Nhớ giữ lại toàn bộ hóa đơn VAT gốc và nộp trước ngày 25 nhé',
        usageTip: 'Chỉ dẫn công việc rõ ràng, rành mạch.',
      },
    ],
  },
  {
    id: 'staff-leave-request',
    title: 'Nhân viên Bàn giao Công việc để Nghỉ phép',
    englishTitle: 'the annual leave handover plan',
    vietnameseTitle: 'Nhân viên xin nghỉ phép 3 ngày và bàn giao đầu mối xử lý việc',
    description: 'Nhân viên văn phòng đến trao đổi về việc xin nghỉ phép năm và chủ động bàn giao các đầu việc đang dang dở.',
    role: 'staff',
    level: 'essential',
    targetScoreRange: '450 - 600',
    department: 'Operations & Administration',
    objective: 'Lắng nghe kế hoạch bàn giao của nhân viên và nhắc nhở họ bật chế độ tự động trả lời email Out-of-Office.',
    initialMessage: 'Good afternoon! I have submitted my formal annual leave request in the HR portal for next Thursday and Friday. I wanted to review my task handover list with you.',
    initialTranslation: 'Chào buổi chiều anh/chị! Em đã nộp đơn xin nghỉ phép năm chính thức trên cổng thông tin HR cho thứ Năm và thứ Sáu tuần tới. Em muốn rà soát danh sách bàn giao công việc với anh/chị ạ.',
    suggestedVocabulary: ['annual leave', 'handover', 'out-of-office', 'coverage', 'emergency', 'delegate'],
    keyPhrases: [
      {
        phrase: 'Who will be your primary point of contact while you are away?',
        meaning: 'Ai sẽ là người phụ trách đầu mối liên lạc chính khi bạn vắng mặt?',
        usageTip: 'Hỏi để đảm bảo tính liên tục của công việc.',
      },
      {
        phrase: 'Don’t forget to set up your auto-responder email',
        meaning: 'Đừng quên cài đặt email tự động trả lời vắng mặt nhé',
        usageTip: 'Lưu ý cần thiết trong văn hóa công sở hiện đại.',
      },
    ],
  },
  {
    id: 'staff-survey-results',
    title: 'Nhân viên Báo cáo Khảo sát Khách hàng',
    englishTitle: 'the customer satisfaction survey findings',
    vietnameseTitle: 'Nhân viên phòng ban trình bày các phản hồi nổi bật từ khách hàng',
    description: 'Nhân viên báo cáo kết quả khảo sát mức độ hài lòng khách hàng (CSAT) tháng qua và chỉ ra các điểm cần khắc phục.',
    role: 'staff',
    level: 'intermediate',
    targetScoreRange: '650 - 750',
    department: 'Customer Success & Support',
    objective: 'Nhân viên trình bày tỷ lệ hài lòng 88% và thảo luận nguyên nhân 12% phàn nàn về thời gian giao hàng.',
    initialMessage: 'Hello! I have finalized the summary of our monthly customer satisfaction survey. Overall, 88% of respondents rated our service as satisfactory, but there are a few recurring complaints regarding delivery delays.',
    initialTranslation: 'Chào anh/chị! Em đã hoàn thành bản tổng hợp khảo sát mức độ hài lòng khách hàng tháng này. Nhìn chung 88% khách hàng đánh giá hài lòng, tuy nhiên có một số phản ánh lặp lại về việc giao hàng chậm trễ.',
    suggestedVocabulary: ['satisfaction', 'recurring', 'bottleneck', 'feedback', 'resolution', 'benchmark'],
    keyPhrases: [
      {
        phrase: 'What actions do you propose to address the delivery issue?',
        meaning: 'Bạn đề xuất những hành động gì để xử lý vấn đề giao hàng?',
        usageTip: 'Khuyến khích nhân viên chủ động tư duy giải pháp.',
      },
      {
        phrase: 'Let’s coordinate with the logistics vendor to shorten transit times',
        meaning: 'Hãy cùng phối hợp với đối tác vận chuyển để rút ngắn thời gian giao hàng',
        usageTip: 'Đưa ra định hướng giải quyết vấn đề cụ thể.',
      },
    ],
  },

  // ================= BẠN BÈ: GIẢI TRÍ, DU LỊCH, NẤU ĂN, PODCAST & ĐẶC SẢN =================
  {
    id: 'friend-movie-night',
    title: 'Rủ Đi Xem Phim Rạp & Chọn Phim Cuối Tuần',
    englishTitle: 'weekend cinema and movie selection',
    vietnameseTitle: 'Rủ bạn thân đi xem phim bom tấn rạp & bàn luận suất chiếu',
    description: 'Rủ bạn thân đi xem phim vào tối thứ Bảy, tranh luận giữa phim bom tấn hành động sci-fi hay phim tâm lý, chọn suất chiếu và chỗ ngồi phù hợp.',
    role: 'friend',
    level: 'essential',
    targetScoreRange: '450 - 600',
    department: 'Bạn Bè & Đời Sống (Friends & Lifestyle)',
    category: 'entertainment',
    objective: 'Thống nhất xem suất chiếu 7h tối thứ Bảy, chọn thể loại bom tấn hành động và hẹn gặp nhau ở sảnh rạp chiếu phim trước 15 phút.',
    initialMessage: "Hey! Are you free this Saturday evening? A massive sci-fi blockbuster just hit the theaters, and I'd love to go see it together. What do you think?",
    initialTranslation: 'Chào bạn! Tối thứ Bảy này bạn có rảnh không? Một bộ phim bom tấn khoa học viễn tưởng vừa mới ra rạp, mình rất muốn rủ bạn đi xem cùng. Bạn thấy thế nào?',
    suggestedVocabulary: ['blockbuster', 'genre', 'showtime', 'cinema', 'premiere', 'ticket counter'],
    keyPhrases: [
      {
        phrase: 'Are you in the mood for a movie tonight?',
        meaning: 'Tối nay bạn có hứng đi xem phim không?',
        usageTip: 'Cách rủ bạn bè đi xem phim thân mật, tự nhiên.',
      },
      {
        phrase: "I've heard great reviews about this film",
        meaning: 'Mình nghe nói bộ phim này nhận được nhiều đánh giá rất tốt',
        usageTip: 'Thuyết phục bạn cùng xem bằng đánh giá tích cực.',
      },
      {
        phrase: 'Let us book the tickets online to get the best seats',
        meaning: 'Chúng mình nên đặt vé trực tuyến trước để chọn được chỗ ngồi đẹp nhất',
        usageTip: 'Đề xuất giải pháp nhanh gọn.',
      },
    ],
  },
  {
    id: 'friend-weekend-hangout',
    title: 'Lên Kế Hoạch Tụ Tập Bạn Bè & Dạo Phố',
    englishTitle: 'weekend hangout and city walk',
    vietnameseTitle: 'Tụ tập nhóm bạn, ghé quán cà phê phong cách & dạo phố',
    description: 'Lên lịch rủ nhóm bạn thân gặp gỡ cuối tuần tại quán cà phê retro, bàn lịch trình đi dạo bờ hồ, chụp ảnh và thư giãn sau tuần làm việc.',
    role: 'friend',
    level: 'intermediate',
    targetScoreRange: '650 - 750',
    department: 'Bạn Bè & Đời Sống (Friends & Lifestyle)',
    category: 'entertainment',
    objective: 'Chốt thời gian gặp gỡ lúc 3h chiều Chủ nhật tại quán cà phê phố cổ, thống nhất các hoạt động chụp ảnh và dạo phố giải trí.',
    initialMessage: "Hey there! We haven't caught up in ages. The weather is going to be gorgeous this weekend—how about we gather at that new vintage cafe downtown and go for a stroll?",
    initialTranslation: 'Chào bạn! Lâu lắm rồi tụi mình chưa gặp nhau hàn huyên. Cuối tuần này thời tiết sẽ rất đẹp đấy—hay là chúng mình tụ tập ở quán cà phê phong cách vintage mới ở trung tâm rồi đi dạo nhé?',
    suggestedVocabulary: ['catch up', 'hangout', 'vintage', 'stroll', 'unwind', 'itinerary'],
    keyPhrases: [
      {
        phrase: 'It has been far too long since we last met',
        meaning: 'Đã lâu lắm rồi tụi mình chưa gặp nhau',
        usageTip: 'Mở đầu cuộc hẹn ấm áp và thân tình.',
      },
      {
        phrase: 'How about grabbing an iced coffee and taking a walk?',
        meaning: 'Hay là tụi mình làm cốc cà phê đá rồi đi dạo một vòng nhé?',
        usageTip: 'Lời đề nghị giải trí nhẹ nhàng, thoải mái.',
      },
      {
        phrase: 'It will definitely help us unwind after a busy week',
        meaning: 'Chắc chắn sẽ giúp chúng mình xả stress sau một tuần bận rộn',
        usageTip: 'Nhấn mạnh giá trị thư giãn.',
      },
    ],
  },
  {
    id: 'friend-gaming-night',
    title: 'Rủ Chơi Game Co-op & Bàn Chiến Thuật',
    englishTitle: 'online co-op gaming night',
    vietnameseTitle: 'Rủ bạn chiến game co-op, chia sẻ kinh nghiệm leo rank',
    description: 'Rủ bạn cùng lập đội chiến game trực tuyến co-op nhiều người chơi tối nay, phân chia vị trí và lên chiến thuật phối hợp vượt màn leo rank.',
    role: 'friend',
    level: 'intermediate',
    targetScoreRange: '650 - 750',
    department: 'Bạn Bè & Đời Sống (Friends & Lifestyle)',
    category: 'entertainment',
    objective: 'Chọn tựa game chiến thuật co-op, phân công vai trò trong team (support / attack) và thống nhất thời gian online lúc 9h tối.',
    initialMessage: 'Yo! A new co-op update just dropped for our favorite game, and there are exclusive weekend raid rewards. Are you down for a gaming session tonight?',
    initialTranslation: 'Ê bồ! Tựa game yêu thích của tụi mình vừa có bản cập nhật co-op mới với nhiều phần thưởng sự kiện cuối tuần đấy. Tối nay có sẵn sàng làm vài trận cùng nhau không?',
    suggestedVocabulary: ['co-op', 'multiplayer', 'strategy', 'raid', 'level up', 'teamwork'],
    keyPhrases: [
      {
        phrase: 'Are you down for a few matches tonight?',
        meaning: 'Tối nay bạn có hứng làm vài ván game không?',
        usageTip: 'Thành ngữ Gen Z thân mật "be down for something".',
      },
      {
        phrase: 'Let us coordinate our roles to maximize synergy',
        meaning: 'Hãy cùng phối hợp các vai trò để tối ưu hiệu quả cả đội nhé',
        usageTip: 'Bàn bạc chiến thuật trò chơi.',
      },
      {
        phrase: 'I will watch your back while you push ahead',
        meaning: 'Mình sẽ bọc lót phía sau trong khi bạn xông lên phía trước',
        usageTip: 'Giao tiếp gắn kết trong trò chơi.',
      },
    ],
  },
  {
    id: 'friend-travel-planning',
    title: 'Lên Kế Hoạch Chuyến Du Lịch Biển Đảo',
    englishTitle: 'vacation itinerary and travel booking',
    vietnameseTitle: 'Cùng bạn lên lịch trình du lịch, săn vé máy bay & đặt phòng',
    description: 'Bàn bạc cùng bạn thân lên kế hoạch du lịch 4 ngày 3 đêm: chọn điểm đến biển đảo, so sánh giá vé máy bay và đặt khách sạn có tầm nhìn đẹp.',
    role: 'friend',
    level: 'intermediate',
    targetScoreRange: '650 - 750',
    department: 'Du Lịch & Khám Phá (Travel & Adventure)',
    category: 'travel',
    objective: 'Thống nhất điểm đến kỳ nghỉ, chốt khoảng ngân sách và phân chia ai chịu trách nhiệm đặt vé bay, ai đặt phòng khách sạn.',
    initialMessage: 'Summer is just around the corner! I was browsing through some island travel packages and found incredible deals. Shall we plan our getaway for next month?',
    initialTranslation: 'Mùa hè sắp đến rồi đấy! Mình vừa lướt xem vài gói du lịch biển đảo và thấy có khuyến mãi siêu hời. Chúng mình cùng lên kế hoạch cho chuyến đi vào tháng sau nhé?',
    suggestedVocabulary: ['destination', 'itinerary', 'accommodation', 'getaway', 'budget', 'round-trip'],
    keyPhrases: [
      {
        phrase: 'We should lock in our flight tickets before prices surge',
        meaning: 'Chúng mình nên chốt vé máy bay sớm trước khi giá tăng vọt',
        usageTip: 'Nhắc nhở săn vé giá tốt.',
      },
      {
        phrase: 'What kind of accommodation do you have in mind?',
        meaning: 'Bạn đang nhắm tới kiểu chỗ nghỉ nào vậy?',
        usageTip: 'Hỏi ý kiến bạn đồng hành về khách sạn/resort.',
      },
      {
        phrase: 'Splitting the costs will keep this trip well within our budget',
        meaning: 'Chia đều chi phí sẽ giúp chuyến đi nằm gọn trong ngân sách dự kiến',
        usageTip: 'Bàn về tài chính du lịch.',
      },
    ],
  },
  {
    id: 'friend-backpacking-adventure',
    title: 'Kinh Nghiệm Du Lịch Bụi & Khám Phá Bản Địa',
    englishTitle: 'backpacking adventure and cultural tips',
    vietnameseTitle: 'Chia sẻ kinh nghiệm phượt tự túc & trải nghiệm phong tục',
    description: 'Trao đổi với bạn về chuyến du lịch phượt tự túc qua các vùng đất mới, cách chuẩn bị balo gọn nhẹ, giao tiếp với người bản xứ và xử lý sự cố khi đi xa.',
    role: 'friend',
    level: 'advanced',
    targetScoreRange: '800+',
    department: 'Du Lịch & Khám Phá (Travel & Adventure)',
    category: 'travel',
    objective: 'Chia sẻ 2 mẹo du lịch an toàn, kể về trải nghiệm văn hóa đáng nhớ và thống nhất nguyên tắc tôn trọng tập quán bản địa.',
    initialMessage: 'I just got back from an off-the-beaten-path backpacking trip through the highlands! The local hospitality was truly heartwarming. Have you ever considered traveling self-guided like that?',
    initialTranslation: 'Mình vừa trở về từ chuyến đi phượt khám phá những cung đường vùng cao tuyệt đẹp! Sự hiếu khách của người dân bản địa thực sự làm mình xúc động. Bạn đã bao giờ nghĩ đến việc đi du lịch tự túc trải nghiệm như vậy chưa?',
    suggestedVocabulary: ['backpacking', 'off-the-beaten-path', 'hospitality', 'immersion', 'scenic', 'resilience'],
    keyPhrases: [
      {
        phrase: 'Traveling light gives you immense flexibility on the road',
        meaning: 'Hành lý gọn nhẹ mang lại cho bạn sự linh hoạt tối đa trên đường đi',
        usageTip: 'Mẹo du lịch phượt cao cấp.',
      },
      {
        phrase: 'Interacting with locals offers genuine cultural insights',
        meaning: 'Giao lưu với người bản địa mang lại những hiểu biết văn hóa chân thực nhất',
        usageTip: 'Nhấn mạnh giá trị trải nghiệm.',
      },
      {
        phrase: 'Always keep an emergency kit and offline maps handy',
        meaning: 'Luôn giữ sẵn bộ sơ cứu khẩn cấp và bản đồ tải sẵn ngoại tuyến nhé',
        usageTip: 'Lời khuyên an toàn du lịch.',
      },
    ],
  },
  {
    id: 'friend-healthy-cooking',
    title: 'Chia Sẻ Mẹo Nấu Ăn Eat-Clean & Lối Sống Lành Mạnh',
    englishTitle: 'healthy cooking and meal prep habits',
    vietnameseTitle: 'Trao đổi công thức nấu ăn lành mạnh, cân bằng dinh dưỡng',
    description: 'Cùng bạn thảo luận về xu hướng tự nấu ăn tại nhà eat-clean, cách cân bằng calo, chuẩn bị trước thực đơn cả tuần (meal prep) và dùng nguyên liệu tươi sạch.',
    role: 'friend',
    level: 'intermediate',
    targetScoreRange: '650 - 750',
    department: 'Ẩm Thực & Nấu Ăn (Culinary & Cooking)',
    category: 'cooking',
    objective: 'Chia sẻ 3 bí quyết chế biến món ăn giữ nguyên vitamin (áp chảo, hấp, sốt giấm táo) và thống nhất cùng nhau duy trì thói quen ăn uống healthy.',
    initialMessage: "Hey! I've been experimenting with meal prep and healthy recipes lately, and it honestly gave me so much more energy during workdays. Do you cook your own meals often?",
    initialTranslation: 'Chào bạn! Dạo này mình đang thử nghiệm việc chuẩn bị đồ ăn sẵn và nấu các món lành mạnh, công nhận là giúp mình tràn đầy năng lượng hơn hẳn khi làm việc. Bạn có hay tự nấu ăn ở nhà không?',
    suggestedVocabulary: ['meal prep', 'nutritious', 'organic', 'wholesome', 'balanced diet', 'antioxidants'],
    keyPhrases: [
      {
        phrase: 'Preparing meals in batches saves both money and time',
        meaning: 'Nấu đồ ăn theo từng mẻ lớn giúp tiết kiệm cả tiền bạc lẫn thời gian',
        usageTip: 'Bàn về mẹo meal prep tiện lợi.',
      },
      {
        phrase: 'Using fresh herbs enhances the taste without extra sodium',
        meaning: 'Sử dụng rau thơm tươi giúp tăng hương vị mà không cần thêm muối',
        usageTip: 'Mẹo nêm nếm lành mạnh.',
      },
      {
        phrase: 'A colorful plate usually guarantees a balanced nutrient profile',
        meaning: 'Một đĩa ăn đa sắc màu thường đảm bảo đầy đủ các nhóm chất dinh dưỡng',
        usageTip: 'Nguyên tắc ăn uống khoa học.',
      },
    ],
  },
  {
    id: 'friend-local-specialties',
    title: 'Khám Phá Đặc Sản Địa Phương & Ẩm Thực Đường Phố',
    englishTitle: 'local food specialties and street gastronomy',
    vietnameseTitle: 'Dẫn bạn khám phá thiên đường ẩm thực & món ngon gia truyền',
    description: 'Đóng vai người bạn dẫn một người bạn thân đi khám phá các quán ăn gia truyền, giải thích nét độc đáo của phở bò, bún chả và cà phê trứng truyền thống.',
    role: 'friend',
    level: 'advanced',
    targetScoreRange: '800+',
    department: 'Văn Hóa & Đặc Sản Địa Phương (Local Heritage & Food)',
    category: 'local-culture',
    objective: 'Giải thích bí quyết nấu nước dùng gia truyền, hướng dẫn cách kết hợp gia vị ăn kèm và chia sẻ về văn hóa ẩm thực đường phố độc đáo.',
    initialMessage: 'Welcome to my hometown! You simply cannot leave without trying our authentic street food specialties. Are your taste buds ready for a mouthwatering culinary tour?',
    initialTranslation: 'Chào mừng bạn đến với quê hương mình! Bạn nhất định không thể rời đi mà chưa nếm thử những món đặc sản đường phố trứ danh ở đây đâu. Vị giác của bạn đã sẵn sàng cho một chuyến food tour thơm ngon nức mũi chưa?',
    suggestedVocabulary: ['delicacy', 'authentic flavor', 'simmered broth', 'aromatic', 'culinary heritage', 'mouthwatering'],
    keyPhrases: [
      {
        phrase: 'The broth has been slow-simmered with cinnamon and star anise',
        meaning: 'Nước dùng được ninh nhừ nhiều giờ cùng quế và hoa hồi thơm nức',
        usageTip: 'Miêu tả ẩm thực tinh tế, giàu hình ảnh.',
      },
      {
        phrase: 'Pairing it with fresh herbs brings out a symphony of flavors',
        meaning: 'Ăn kèm rau thơm tươi sẽ tạo nên một bản hòa tấu hương vị tuyệt vời',
        usageTip: 'Diễn đạt sành điệu về cách thưởng thức món ăn.',
      },
      {
        phrase: 'This hidden eatery has been passing down its recipe for three generations',
        meaning: 'Quán ăn nhỏ ẩn mình này đã truyền giữ bí quyết nấu nướng qua 3 thế hệ',
        usageTip: 'Kể câu chuyện văn hóa phía sau món ăn.',
      },
    ],
  },
  {
    id: 'friend-podcast-work-life-balance',
    title: 'Podcast: Cân Bằng Cuộc Sống & Tránh Kiệt Sức',
    englishTitle: 'podcast discussion on work-life harmony and beating burnout',
    vietnameseTitle: 'Chia sẻ góc nhìn sống qua Podcast: Cân bằng & Nuôi dưỡng tâm hồn',
    description: 'Tham gia trò chuyện cùng host podcast về cách người trẻ vượt qua tình trạng kiệt sức (burnout), học cách thiết lập ranh giới công việc và tìm kiếm bình yên nội tại.',
    role: 'friend',
    level: 'advanced',
    targetScoreRange: '800+',
    department: 'Podcast & Quan Điểm Sống (Podcast & Mindset)',
    category: 'podcast',
    objective: 'Trình bày quan điểm về việc ngắt kết nối công nghệ sau giờ làm (digital detox), ưu tiên giấc ngủ và xây dựng thói quen chăm sóc sức khỏe tinh thần bền vững.',
    initialMessage: "Welcome to today's podcast recording! Our topic today is 'Navigating the Pressure Cooker: Finding Genuine Work-Life Harmony'. How do you personally protect your peace in such a fast-paced environment?",
    initialTranslation: "Chào mừng bạn đến với buổi thu âm podcast hôm nay! Chủ đề của chúng ta là 'Vượt qua áp lực: Tìm kiếm sự cân bằng cuộc sống đích thực'. Cá nhân bạn làm thế nào để giữ gìn sự bình yên trong nhịp sống hối hả hiện đại này?",
    suggestedVocabulary: ['burnout', 'harmony', 'digital detox', 'mental clarity', 'hyper-connected', 'mindfulness'],
    keyPhrases: [
      {
        phrase: 'Setting firm boundaries around after-hours communication is vital',
        meaning: 'Thiết lập ranh giới nghiêm túc với các tin nhắn công việc ngoài giờ là điều sống còn',
        usageTip: 'Lập luận sắc bén trong phỏng vấn/podcast.',
      },
      {
        phrase: 'Rest is not a reward for productivity; it is an absolute requirement',
        meaning: 'Nghỉ ngơi không phải là phần thưởng cho năng suất, mà là một nhu cầu thiết yếu',
        usageTip: 'Thông điệp truyền cảm hứng sâu sắc.',
      },
      {
        phrase: 'Practicing mindfulness helps us stay grounded amidst daily chaos',
        meaning: 'Thực hành tỉnh thức giúp chúng ta giữ vững tâm thế giữa những bộn bề hàng ngày',
        usageTip: 'Diễn đạt triết lý sống thanh lịch.',
      },
    ],
  },
  {
    id: 'friend-podcast-growth-mindset',
    title: 'Podcast: Tư Duy Phát Triển & Tự Định Nghĩa Thành Công',
    englishTitle: 'podcast episode on growth mindset and redefining personal success',
    vietnameseTitle: 'Bàn luận trên Podcast: Vượt áp lực đồng trang lứa & Định nghĩa thành công',
    description: 'Cùng host podcast thảo luận về tư duy phát triển (growth mindset), cách biến thất bại thành bài học kinh nghiệm và tự tin đi trên con đường riêng mà không so sánh với người khác.',
    role: 'friend',
    level: 'advanced',
    targetScoreRange: '800+',
    department: 'Podcast & Quan Điểm Sống (Podcast & Mindset)',
    category: 'podcast',
    objective: 'Chia sẻ câu chuyện vượt qua sự nghi ngờ bản thân, cách đối diện với áp lực đồng trang lứa và đúc kết bài học về việc kiên định với giá trị sống cốt lõi.',
    initialMessage: "Hey listeners and welcome back! Today we are diving into 'Growth Mindset: Defining Success on Your Own Terms'. To kick things off, what does achieving true success look like to you?",
    initialTranslation: "Xin chào quý thính giả và mừng bạn quay trở lại! Hôm nay chúng ta sẽ đào sâu vào chủ đề 'Tư duy phát triển: Tự định nghĩa thành công theo cách của bạn'. Để bắt đầu, đối với bạn thì việc đạt được thành công đích thực mang ý nghĩa gì?",
    suggestedVocabulary: ['growth mindset', 'resilience', 'peer pressure', 'fulfillment', 'stepping stone', 'self-actualization'],
    keyPhrases: [
      {
        phrase: 'Comparing our chapter one to someone else’s chapter twenty is misleading',
        meaning: 'So sánh chương đầu tiên của mình với chương thứ hai mươi của người khác là điều khập khiễng',
        usageTip: 'Phát biểu ẩn dụ ấn tượng trên podcast.',
      },
      {
        phrase: 'Viewing setbacks as constructive feedback accelerates self-growth',
        meaning: 'Coi trở ngại như những phản hồi mang tính xây dựng sẽ đẩy nhanh sự hoàn thiện bản thân',
        usageTip: 'Tư duy tích cực chuyên nghiệp.',
      },
      {
        phrase: 'Authentic fulfillment comes from living in alignment with your core values',
        meaning: 'Sự thỏa nguyện đích thực đến từ việc sống hòa hợp với các giá trị cốt lõi của chính bạn',
        usageTip: 'Kết luận sâu sắc.',
      },
    ],
  },

  // ================= GIA ĐÌNH: TÂM SỰ, SỨC KHỎE & ÁP LỰC CUỘC SỐNG =================
  {
    id: 'family-mom-health-check',
    title: 'Tâm Sự Với Mẹ & Hỏi Thăm Sức Khỏe Gia Đình',
    englishTitle: 'calling mom: family wellness and health check-in',
    vietnameseTitle: 'Nhận cuộc gọi từ mẹ: Tâm sự cuộc sống, hỏi thăm sức khỏe & dặn dò',
    description: 'Mẹ gọi điện hỏi thăm tình hình ăn uống, sức khỏe và công việc của bạn khi sống xa nhà. Lắng nghe những dặn dò ân cần và chia sẻ tình cảm ấm áp với mẹ.',
    role: 'family',
    level: 'essential',
    targetScoreRange: '450 - 600',
    department: 'Gia Đình & Tâm Sự (Family & Heart-to-Heart)',
    category: 'family',
    objective: 'Trấn an mẹ rằng bạn đang ăn ngủ tốt và giữ gìn sức khỏe, hỏi thăm tình hình bố mẹ ở nhà và hẹn ngày cuối tháng về sum họp cùng gia đình.',
    initialMessage: "Hello my sweetheart! I was thinking about you all day and wanted to hear your voice. Are you eating well and getting enough sleep? How are things going over there?",
    initialTranslation: 'Alo con yêu! Cả ngày hôm nay mẹ cứ nhớ đến con nên muốn gọi điện nghe giọng con. Dạo này con có ăn uống đầy đủ và ngủ đủ giấc không? Mọi việc bên đó thế nào rồi con?',
    suggestedVocabulary: ['well-being', 'homesick', 'nourishing', 'reassure', 'family reunion', 'affectionate'],
    keyPhrases: [
      {
        phrase: "Please don't worry about me, Mom, I'm eating nutritious meals every day",
        meaning: 'Mẹ đừng lo cho con quá nhé, con vẫn ăn uống đầy đủ dinh dưỡng mỗi ngày mà',
        usageTip: 'Trấn an cha mẹ ấm áp.',
      },
      {
        phrase: 'How has your and Dad’s health been lately?',
        meaning: 'Dạo này sức khỏe của bố và mẹ thế nào rồi ạ?',
        usageTip: 'Hỏi thăm sức khỏe người thân trong gia đình.',
      },
      {
        phrase: 'I miss your home-cooked dishes so much and will visit soon',
        meaning: 'Con nhớ những món cơm nhà mẹ nấu lắm, con sẽ sớm sắp xếp về thăm nhà ạ',
        usageTip: 'Gắn kết tình cảm gia đình.',
      },
    ],
  },
  {
    id: 'family-dad-life-advice',
    title: 'Tâm Sự Áp Lực Cuộc Sống & Lời Khuyên Từ Bố',
    englishTitle: 'fatherly advice: navigating career pressures and life balance',
    vietnameseTitle: 'Chia sẻ với bố về áp lực công việc, tìm lại điểm tựa tinh thần',
    description: 'Tâm sự chân thành cùng bố về những mệt mỏi trong công việc và định hướng tương lai. Lắng nghe những lời khuyên giàu trải nghiệm và sự động viên vững chắc từ bố.',
    role: 'family',
    level: 'intermediate',
    targetScoreRange: '650 - 750',
    department: 'Gia Đình & Tâm Sự (Family & Heart-to-Heart)',
    category: 'family',
    objective: 'Bày tỏ cảm xúc áp lực khi đối diện khối lượng công việc lớn, tiếp nhận lời khuyên của bố về sự kiên định và cảm nhận tình yêu thương của gia đình.',
    initialMessage: "Hey kiddo, you sounded a bit weary in your last text. Remember, no matter how busy the world gets, you can always confide in me. What's been on your mind lately?",
    initialTranslation: 'Chào con, trong tin nhắn lần trước nghe giọng con có vẻ hơi mệt mỏi. Hãy nhớ rằng dù ngoài kia có bộn bề đến đâu, con luôn có thể tâm sự với bố. Dạo này có chuyện gì khiến con bận lòng à?',
    suggestedVocabulary: ['confide', 'overwhelmed', 'resilience', 'perspective', 'unconditional', 'guidance'],
    keyPhrases: [
      {
        phrase: 'I have been under quite a bit of strain with work deadlines',
        meaning: 'Dạo gần đây con gặp khá nhiều áp lực vì hạn chót công việc',
        usageTip: 'Bày tỏ cảm xúc chân thật với người thân.',
      },
      {
        phrase: 'Your advice always helps me regain clarity and composure',
        meaning: 'Những lời khuyên của bố luôn giúp con lấy lại sự sáng suốt và bình tâm',
        usageTip: 'Bày tỏ lòng biết ơn đối với cha mẹ.',
      },
      {
        phrase: 'Knowing the family always stands by me gives me immense strength',
        meaning: 'Biết rằng gia đình luôn ở bên cạnh là nguồn động lực to lớn nhất của con',
        usageTip: 'Gắn kết tình cảm thiêng liêng.',
      },
    ],
  },

  // ================= NGƯỜI YÊU: HẸN HÒ, NẤU ĂN & ĐỒNG HÀNH TƯƠNG LAI =================
  {
    id: 'lover-romantic-date',
    title: 'Hẹn Hò Cuối Tuần Lãng Mạn & Cùng Đi Dạo',
    englishTitle: 'planning a romantic weekend date and cozy dinner',
    vietnameseTitle: 'Cùng người yêu lên kế hoạch hẹn hò, chọn quán ăn ấm cúng & dạo phố',
    description: 'Trò chuyện cùng người yêu lên lịch hẹn hò cuối tuần, chọn quán bistro nhỏ có nến lung linh, món mì Ý thơm ngon và cùng đi dạo dưới bầu trời đêm lãng mạn.',
    role: 'lover',
    level: 'essential',
    targetScoreRange: '450 - 600',
    department: 'Hẹn Hò & Tình Yêu (Romantic Partner)',
    category: 'entertainment',
    objective: 'Chọn địa điểm hẹn hò tối thứ Bảy, thống nhất quán ăn ven hồ và bày tỏ tình cảm yêu thương sau những ngày làm việc bận rộn.',
    initialMessage: "Hi my love! I've been counting down the days until the weekend so we can spend some quiet time together. Have you thought about where we should go for our date night?",
    initialTranslation: 'Chào anh/em yêu! Cả tuần nay em/anh cứ đếm từng ngày đến cuối tuần để chúng mình được ở bên nhau. Anh/em đã nghĩ xem tối nay chúng mình sẽ hẹn hò ở đâu chưa?',
    suggestedVocabulary: ['romantic', 'date night', 'candlelit', 'cherish', 'bistro', 'sweetheart'],
    keyPhrases: [
      {
        phrase: "I've missed you so much throughout this hectic week",
        meaning: 'Cả tuần bận rộn vừa rồi anh/em nhớ em/anh nhiều lắm',
        usageTip: 'Bày tỏ tình cảm ngọt ngào, ấm áp.',
      },
      {
        phrase: 'How about a cozy candlelit dinner by the riverside?',
        meaning: 'Hay là chúng mình cùng ăn bữa tối ấm cúng dưới ánh nến ven sông nhé?',
        usageTip: 'Đề xuất địa điểm hẹn hò lãng mạn.',
      },
      {
        phrase: 'Just walking beside you and holding hands makes me so happy',
        meaning: 'Chỉ cần được đi dạo bên cạnh và nắm tay anh/em là em/anh thấy hạnh phúc lắm rồi',
        usageTip: 'Câu thổ lộ ngọt ngào đời thường.',
      },
    ],
  },
  {
    id: 'lover-cooking-dinner',
    title: 'Cùng Nấu Bữa Tối Lãng Mạn & Chia Sẻ Công Thức',
    englishTitle: 'cooking dinner together and sharing secret recipes',
    vietnameseTitle: 'Cùng người yêu chuẩn bị bữa tối ấm áp tại nhà, nêm nếm gia vị',
    description: 'Bàn bạc cùng người yêu chuẩn bị bữa tối tại nhà: chọn món mì Ý sốt kem nấm hoặc bò bít-tết, chuẩn bị nguyên liệu và cùng nhau vào bếp chia sẻ tình cảm.',
    role: 'lover',
    level: 'essential',
    targetScoreRange: '450 - 600',
    department: 'Ẩm Thực & Nấu Ăn (Culinary & Cooking)',
    category: 'cooking',
    objective: 'Thống nhất thực đơn bữa tối gồm món khai vị và món chính, phân công người mua nguyên liệu và người chuẩn bị gia vị.',
    initialMessage: "Hey darling! What do you say we skip dining out tonight and cook something special together at home? I'm craving homemade pasta with creamy sauce!",
    initialTranslation: 'Chào anh/em yêu! Em/anh thấy sao nếu tối nay mình không ra ngoài ăn nữa mà cùng nhau nấu món gì đó thật ngon ở nhà? Em/anh đang thèm món mì Ý sốt kem tự làm quá!',
    suggestedVocabulary: ['recipe', 'ingredient', 'simmer', 'seasoning', 'homemade', 'appetizer'],
    keyPhrases: [
      {
        phrase: 'What dish should we whip up for dinner tonight?',
        meaning: 'Tối nay chúng mình nên trổ tài nấu món gì đây em/anh?',
        usageTip: 'Hỏi ý kiến bạn đời về bữa ăn gia đình.',
      },
      {
        phrase: 'Do we have all the fresh ingredients in the pantry?',
        meaning: 'Trong bếp của chúng ta đã có đủ các nguyên liệu tươi chưa?',
        usageTip: 'Kiểm tra nguyên liệu nấu ăn.',
      },
      {
        phrase: 'A pinch of garlic and black pepper will elevate the flavor',
        meaning: 'Một chút tỏi và tiêu đen sẽ làm món ăn dậy mùi thơm đậm đà hơn đấy',
        usageTip: 'Mẹo nêm nếm món ăn.',
      },
    ],
  },
  {
    id: 'lover-future-plans',
    title: 'Tâm Sự Tương Lai & Động Viên Nhau Cùng Cố Gắng',
    englishTitle: 'supporting each other and planning a shared future',
    vietnameseTitle: 'Cùng người yêu tâm sự về ước mơ tương lai, đồng hành vượt khó khăn',
    description: 'Cùng người yêu ngồi lại tâm sự về định hướng sự nghiệp, ước mơ về một tổ ấm nhỏ trong tương lai và khẳng định sự tin tưởng, đồng hành bền chặt bên nhau.',
    role: 'lover',
    level: 'intermediate',
    targetScoreRange: '650 - 750',
    department: 'Hẹn Hò & Tình Yêu (Romantic Partner)',
    category: 'family',
    objective: 'Chia sẻ mục tiêu nghề nghiệp và kế hoạch tiết kiệm chung, trao nhau sự động viên và cam kết luôn thấu hiểu, tôn trọng ước mơ của đối phương.',
    initialMessage: "Looking at where we are today makes me so grateful to have you by my side. Let's talk about our dreams and where we envision ourselves a couple of years down the road.",
    initialTranslation: 'Nhìn lại chặng đường chúng mình đã đi qua, anh/em thấy thật may mắn khi có em/anh ở bên. Chúng mình cùng chia sẻ về những ước mơ và hình dung của cả hai trong vài năm tới nhé.',
    suggestedVocabulary: ['shared future', 'aspiration', 'companionship', 'milestone', 'unwavering', 'mutual support'],
    keyPhrases: [
      {
        phrase: 'I promise to support your career aspirations wholeheartedly',
        meaning: 'Anh/em hứa sẽ luôn hết lòng ủng hộ những ước mơ sự nghiệp của em/anh',
        usageTip: 'Lời hứa chân thành, sâu sắc.',
      },
      {
        phrase: 'Building our future step by step together is my greatest joy',
        meaning: 'Cùng nhau từng bước xây đắp tương lai là niềm hạnh phúc lớn nhất của anh/em',
        usageTip: 'Gắn kết bền chặt trong tình yêu.',
      },
      {
        phrase: 'Whenever you feel exhausted, remember you can always lean on me',
        meaning: 'Bất cứ khi nào mệt mỏi, hãy nhớ rằng anh/em luôn là chỗ dựa vững chắc cho em/anh',
        usageTip: 'Lời động viên ấm áp.',
      },
    ],
  },

  // ================= NGƯỜI LẠ: HỎI ĐƯỜNG, XE BUS, TÀU ĐIỆN, MÁY BAY & ĐỊA DANH =================
  {
    id: 'stranger-ask-directions',
    title: 'Hỏi Đường Trên Phố Khi Bị Lạc Ở Nước Ngoài',
    englishTitle: 'asking a friendly stranger for street directions',
    vietnameseTitle: 'Hỏi người đi đường cách đến Bảo tàng Nghệ thuật / Trung tâm mua sắm',
    description: 'Bạn đang đi bộ ở trung tâm một thành phố nước ngoài và không tìm thấy đường. Hãy nhờ một người đi đường bản địa lịch thiệp chỉ hướng tới điểm đến.',
    role: 'stranger',
    level: 'essential',
    targetScoreRange: '450 - 600',
    department: 'Giao Thông & Di Chuyển (Transit & Directions)',
    category: 'transit',
    objective: 'Hỏi rõ hướng đi (rẽ trái/phải, qua mấy ngã tư), xác nhận xem có thể đi bộ được không và cảm ơn sự giúp đỡ nhiệt tình của người lạ.',
    initialMessage: "Excuse me! You look a bit puzzled with your map. Can I help you find what you're looking for?",
    initialTranslation: 'Xin lỗi bạn! Thấy bạn đang bối rối nhìn tấm bản đồ, tôi có thể giúp bạn tìm đường đến nơi bạn cần được không?',
    suggestedVocabulary: ['intersection', 'crossroad', 'landmark', 'pedestrian', 'walking distance', 'straight ahead'],
    keyPhrases: [
      {
        phrase: 'Could you please point me in the direction of the City Art Museum?',
        meaning: 'Bạn có thể chỉ giúp tôi hướng đi đến Bảo tàng Nghệ thuật Thành phố được không?',
        usageTip: 'Cách hỏi đường lịch sự chuẩn quốc tế.',
      },
      {
        phrase: 'Is it within easy walking distance from here?',
        meaning: 'Từ đây đi bộ đến đó có gần và dễ tìm không ạ?',
        usageTip: 'Xác nhận khoảng cách đi bộ.',
      },
      {
        phrase: 'Thank you so much for your kind assistance!',
        meaning: 'Cảm ơn sự giúp đỡ tận tình của bạn rất nhiều!',
        usageTip: 'Lời cảm ơn nhã nhặn sau khi được chỉ đường.',
      },
    ],
  },
  {
    id: 'stranger-transit-bus-subway',
    title: 'Hướng Dẫn Bắt Xe Bus & Đổi Tuyến Tàu Điện Ngầm',
    englishTitle: 'navigating public transit: bus routes and subway lines',
    vietnameseTitle: 'Hỏi nhân viên ga tàu cách mua thẻ quẹt, bắt xe bus & đổi tuyến metro',
    description: 'Hỏi người bản địa hoặc nhân viên phòng vé cách mua vé quẹt thẻ, tìm đúng cửa ke ga tàu điện ngầm và trạm trung chuyển để đến khu phố cổ.',
    role: 'stranger',
    level: 'essential',
    targetScoreRange: '450 - 600',
    department: 'Giao Thông & Di Chuyển (Transit & Directions)',
    category: 'transit',
    objective: 'Xác định đúng số tuyến xe bus cần đi, biết ke ga metro cần chuyển tuyến và nắm được cách nạp tiền vào thẻ giao thông công cộng.',
    initialMessage: 'Hello! Welcome to Central Transit Station. Are you trying to catch the local express bus or taking the underground metro line?',
    initialTranslation: 'Xin chào! Chào mừng bạn đến Nhà ga Trung tâm. Bạn đang muốn bắt xe bus nhanh hay đi tuyến tàu điện ngầm vậy?',
    suggestedVocabulary: ['transit card', 'subway line', 'transfer station', 'platform', 'fare', 'turnstile'],
    keyPhrases: [
      {
        phrase: 'Which platform do I need for Line 2 towards Old Town?',
        meaning: 'Tôi cần đứng ở ke ga nào để bắt Tuyến số 2 về hướng Phố Cổ?',
        usageTip: 'Hỏi thông tin ke ga tàu điện ngầm.',
      },
      {
        phrase: 'Do I have to switch trains at the Central interchange?',
        meaning: 'Tôi có phải đổi tàu tại trạm trung chuyển Trung tâm không?',
        usageTip: 'Làm rõ điểm chuyển tiếp.',
      },
      {
        phrase: 'How do I top up my rechargeable transit card?',
        meaning: 'Làm thế nào để tôi nạp thêm tiền vào thẻ giao thông này?',
        usageTip: 'Hỏi thủ tục nạp tiền đi lại.',
      },
    ],
  },
  {
    id: 'stranger-airport-flight-boarding',
    title: 'Thủ Tục Sân Bay, An Ninh & Hướng Dẫn Lên Máy Bay',
    englishTitle: 'airport check-in, security screening and gate boarding',
    vietnameseTitle: 'Trao đổi với nhân viên dịch vụ mặt đất về hành lý, an ninh & cổng bay',
    description: 'Trao đổi với nhân viên hàng không tại sân bay quốc tế về thủ tục gửi hành lý ký gửi, kiểm tra an ninh và tìm cổng lên máy bay (gate) trước giờ khởi hành.',
    role: 'stranger',
    level: 'intermediate',
    targetScoreRange: '650 - 750',
    department: 'Giao Thông & Di Chuyển (Transit & Directions)',
    category: 'transit',
    objective: 'Xác nhận số cổng khởi hành, nắm rõ giờ đóng cổng (gate closure), tiêu chuẩn hành lý xách tay và hoàn tất kiểm tra an ninh suôn sẻ.',
    initialMessage: 'Good day! May I assist you with your flight details today? Please have your passport and booking reference ready for check-in.',
    initialTranslation: 'Xin chào quý khách! Tôi có thể hỗ trợ gì cho chuyến bay của bạn hôm nay ạ? Vui lòng chuẩn bị sẵn hộ chiếu và mã đặt chỗ để làm thủ tục check-in nhé.',
    suggestedVocabulary: ['boarding pass', 'departure gate', 'carry-on baggage', 'security screening', 'terminal', 'allowance'],
    keyPhrases: [
      {
        phrase: 'Could you please verify my departure gate and boarding time?',
        meaning: 'Nhờ bạn kiểm tra giúp cổng khởi hành và giờ lên máy bay của tôi được không?',
        usageTip: 'Xác nhận thông tin chuyến bay tại quầy.',
      },
      {
        phrase: 'Does this piece of luggage exceed the carry-on weight allowance?',
        meaning: 'Kiện hành lý này có bị vượt quá trọng lượng xách tay cho phép không?',
        usageTip: 'Kiểm tra quy định hành lý.',
      },
      {
        phrase: 'Where is the designated security checkpoint for international flights?',
        meaning: 'Khu vực kiểm tra an ninh cho các chuyến bay quốc tế nằm ở đâu ạ?',
        usageTip: 'Hỏi hướng di chuyển tại sân bay.',
      },
    ],
  },
  {
    id: 'stranger-local-landmarks',
    title: 'Giới Thiệu Danh Lam Thắng Cảnh & Di Tích Lịch Sử',
    englishTitle: 'local guide: presenting famous landmarks and historical heritage',
    vietnameseTitle: 'Người bản địa giới thiệu di tích lịch sử & thắng cảnh nổi tiếng',
    description: 'Đóng vai người hướng dẫn bản địa thân thiện, giải thích cho du khách quốc tế về lịch sử ngàn năm của các di tích danh thắng và những câu chuyện văn hóa hấp dẫn.',
    role: 'stranger',
    level: 'intermediate',
    targetScoreRange: '650 - 750',
    department: 'Văn Hóa & Đặc Sản Địa Phương (Local Heritage & Food)',
    category: 'local-culture',
    objective: 'Giới thiệu 2 danh lam tiêu biểu của địa phương, giải thích ý nghĩa kiến trúc cổ truyền và gợi ý thời điểm vàng để chụp ảnh ngắm cảnh đẹp nhất.',
    initialMessage: "Welcome! As a lifelong resident here, I'm delighted to show you around our historic quarter. Have you heard about the legendary temple in the middle of the lake?",
    initialTranslation: 'Chào mừng bạn! Là một người sinh ra và lớn lên ở đây, tôi rất vinh hạnh được dẫn bạn tham quan khu phố cổ lịch sử này. Bạn đã từng nghe qua câu chuyện huyền thoại về ngôi đền cổ giữa lòng hồ chưa?',
    suggestedVocabulary: ['heritage', 'landmark', 'panoramic view', 'architecture', 'legendary', 'preservation'],
    keyPhrases: [
      {
        phrase: 'This historic complex has stood resiliently for over five centuries',
        meaning: 'Quần thể di tích lịch sử này đã đứng vững kiên cường qua hơn 5 thế kỷ',
        usageTip: 'Giới thiệu chiều sâu văn hóa lịch sử.',
      },
      {
        phrase: 'The architectural details reflect a remarkable blend of East and West',
        meaning: 'Các chi tiết kiến trúc thể hiện sự giao thoa hài hòa đặc sắc giữa phương Đông và phương Tây',
        usageTip: 'Thuyết minh kiến trúc ấn tượng.',
      },
      {
        phrase: 'The optimal time to witness the panoramic view is during sunrise',
        meaning: 'Thời điểm lý tưởng nhất để ngắm toàn cảnh chính là lúc bình minh ló rạng',
        usageTip: 'Gợi ý trải nghiệm du lịch đắt giá.',
      },
    ],
  },

  // ================= NGƯỜI PHỎNG VẤN IT: KỸ THUẬT, KIẾN TRÚC & HÀNH VI =================
  {
    id: 'interviewer-it-technical-architecture',
    title: 'Phỏng Vấn Kỹ Thuật IT: Kiến Trúc Hệ Thống & Tối Ưu Tải',
    englishTitle: 'IT technical interview: system design, architecture, and scalability',
    vietnameseTitle: 'Phỏng vấn Tech Lead: Kiến trúc phần mềm, xử lý đồng thời & Clean Code',
    description: 'Buổi phỏng vấn kỹ thuật chuyên sâu với Giám đốc Kỹ thuật / Tech Lead. Trình bày về kiến trúc microservices/serverless, tối ưu hóa database queries, caching Redis và thiết kế API chuẩn REST/GraphQL.',
    role: 'interviewer',
    level: 'advanced',
    targetScoreRange: '800+',
    department: 'Tuyển Dụng & Phỏng Vấn IT (Tech & Software)',
    category: 'it-interview',
    objective: 'Trình bày giải pháp thiết kế hệ thống chịu tải cao (high concurrency), giải thích lý do lựa chọn công nghệ và cách đo lường hiệu năng (latency, throughput).',
    initialMessage: 'Welcome to our technical interview round. We reviewed your portfolio and were impressed with your engineering background. To start, could you walk us through the system architecture of your most demanding project and explain how you handled scalability bottlenecks?',
    initialTranslation: 'Chào mừng bạn đến với vòng phỏng vấn kỹ thuật của chúng tôi. Chúng tôi đã xem qua hồ sơ dự án của bạn và rất ấn tượng với năng lực kỹ thuật của bạn. Để bắt đầu, bạn có thể giải thích kiến trúc hệ thống của dự án phức tạp nhất bạn từng làm và cách bạn xử lý điểm nghẽn hiệu năng khi tải tăng cao được không?',
    suggestedVocabulary: ['scalability', 'concurrency', 'latency', 'caching strategy', 'throughput', 'microservices'],
    keyPhrases: [
      {
        phrase: 'We partitioned our services and implemented Redis caching to minimize query latency',
        meaning: 'Chúng tôi phân tách dịch vụ và áp dụng bộ đệm Redis để giảm thiểu tối đa độ trễ truy vấn',
        usageTip: 'Trả lời phỏng vấn kỹ thuật IT chuẩn mực.',
      },
      {
        phrase: 'By decoupling background jobs with message queues, system resilience improved significantly',
        meaning: 'Bằng việc tách rời các tác vụ chạy ngầm qua hàng đợi tin nhắn, khả năng phục hồi của hệ thống được nâng cao rõ rệt',
        usageTip: 'Trình bày kiến trúc phần mềm cao cấp.',
      },
      {
        phrase: 'We conducted rigorous load testing to identify bottlenecks prior to deployment',
        meaning: 'Chúng tôi đã tiến hành kiểm thử tải nghiêm ngặt để phát hiện các điểm nghẽn trước khi triển khai thực tế',
        usageTip: 'Chứng minh tư duy kỹ thuật chỉn chu.',
      },
    ],
  },
  {
    id: 'interviewer-it-behavioral-agile',
    title: 'Phỏng Vấn Hành Vi IT: Văn Hóa Agile, Xử Lý Bug & Đội Nhóm',
    englishTitle: 'IT behavioral interview: Agile teamwork, incident post-mortem, and culture fit',
    vietnameseTitle: 'Phỏng vấn HR & Engineering Manager: Xử lý sự cố, quy trình Agile & văn hóa',
    description: 'Buổi phỏng vấn đánh giá sự phù hợp về văn hóa (Culture Fit) và kỹ năng mềm với Quản lý Kỹ thuật. Trả lời về cách ứng phó khi gặp sự cố production nghiêm trọng, giải quyết bất đồng kỹ thuật trong team và đón nhận code review.',
    role: 'interviewer',
    level: 'intermediate',
    targetScoreRange: '650 - 750',
    department: 'Tuyển Dụng & Phỏng Vấn IT (Tech & Software)',
    category: 'it-interview',
    objective: 'Kể về trải nghiệm xử lý một con bug phức tạp trên production, cách phối hợp với đồng nghiệp trong Scrum sprint và thể hiện tinh thần ham học hỏi liên tục.',
    initialMessage: 'Thanks for meeting with us today. Beyond technical skills, we place tremendous value on communication and cross-functional collaboration. Can you describe a situation where a major bug occurred in production, and how you worked with your team to diagnose and resolve it?',
    initialTranslation: 'Cảm ơn bạn đã tham gia buổi trao đổi hôm nay. Bên cạnh kỹ năng kỹ thuật, chúng tôi đặc biệt coi trọng khả năng giao tiếp và làm việc nhóm liên chức năng. Bạn có thể chia sẻ về một tình huống khi xảy ra lỗi nghiêm trọng trên production, và cách bạn cùng đồng đội tìm nguyên nhân cũng như khắc phục nó không?',
    suggestedVocabulary: ['agile sprint', 'cross-functional', 'troubleshooting', 'incident response', 'post-mortem', 'collaborative'],
    keyPhrases: [
      {
        phrase: 'Our priority was containing the impact, followed by a thorough blameless post-mortem',
        meaning: 'Ưu tiên hàng đầu của chúng tôi là khoanh vùng thiệt hại, sau đó tổ chức buổi rút kinh nghiệm nghiêm túc không đổ lỗi',
        usageTip: 'Thể hiện phong thái kỹ sư chuyên nghiệp chuẩn quốc tế.',
      },
      {
        phrase: 'I view constructive peer code reviews as an invaluable mechanism for collective code quality',
        meaning: 'Tôi coi việc đồng nghiệp review code mang tính xây dựng là cơ chế vô giá để nâng cao chất lượng mã nguồn chung',
        usageTip: 'Khẳng định tinh thần làm việc nhóm cởi mở.',
      },
      {
        phrase: 'Active listening and empathy are crucial when resolving architectural disagreements',
        meaning: 'Lắng nghe tích cực và sự thấu cảm là điều cốt lõi khi giải quyết các bất đồng về kiến trúc kỹ thuật',
        usageTip: 'Trả lời xuất sắc câu hỏi hành vi.',
      },
    ],
  },
];

/**
 * Filter scenarios matching user's roadmap target score and current level
 */
export function getRecommendedScenarios(
  context: Partial<UserLearningContext>,
  role?: CharacterRole
): RoleplayScenario[] {
  let list = PRESET_SCENARIOS;

  if (role) {
    list = list.filter((s) => s.role === role);
  }

  const targetScore = context.targetScore || 650;

  // Score match logic
  return list.sort((a, b) => {
    const aMatch = isScenarioMatchingScore(a.level, targetScore);
    const bMatch = isScenarioMatchingScore(b.level, targetScore);
    if (aMatch && !bMatch) return -1;
    if (!aMatch && bMatch) return 1;
    return 0;
  });
}

export function isScenarioMatchingScore(level: ScenarioLevel, targetScore: number): boolean {
  if (targetScore <= 600) return level === 'essential';
  if (targetScore <= 780) return level === 'intermediate';
  return level === 'advanced';
}

/**
 * Returns a spontaneous opening sentence variation based on role, character, and scenario.
 * Ensures initial greetings are never static or repetitive.
 */
export function getRandomOpeningVariation(
  character: CharacterConfig,
  scenario: RoleplayScenario,
  userName?: string
): { english: string; vietnamese: string } {
  const nameGreeting = userName && userName !== 'Bạn' ? `${userName}, ` : '';
  const role = character.role;
  const topic = scenario.englishTitle || 'the current workplace deliverables';

  const bossOpenings = [
    {
      english: `Good morning, ${nameGreeting}do you have a brief moment to sync? I was going over the requirements for ${topic} and want to make sure we're on track. Where do things stand?`,
      vietnamese: `Chào buổi sáng! Bạn có chút thời gian để trao đổi nhanh không? Tôi vừa xem qua các yêu cầu cho "${scenario.vietnameseTitle}" và muốn chắc chắn chúng ta đang đúng tiến độ. Tình hình thế nào rồi?`,
    },
    {
      english: `Hi ${nameGreeting}please have a seat. Regarding our agenda for ${topic}, I have a few specific questions before our executive briefing. Are you ready to walk me through the key updates?`,
      vietnamese: `Chào bạn, mời ngồi. Liên quan đến "${scenario.vietnameseTitle}", tôi có vài câu hỏi cụ thể trước cuộc họp ban giám đốc. Bạn đã sẵn sàng trình bày những điểm cập nhật chính chưa?`,
    },
    {
      english: `Hello ${nameGreeting}I'm following up on our ${character.department || scenario.department} schedule today. We need to align on ${topic}. How is your progress coming along?`,
      vietnamese: `Chào bạn, tôi muốn theo dõi tiến độ hôm nay của phòng ${character.department || scenario.department}. Chúng ta cần thống nhất các đầu việc ưu tiên cho "${scenario.vietnameseTitle}". Tiến độ của bạn đến đâu rồi?`,
    },
    {
      english: `Morning ${nameGreeting}thanks for stopping by. We have some important decisions to make regarding ${topic} before noon. Can you give me a status report?`,
      vietnamese: `Chào bạn, cảm ơn đã ghé qua. Chúng ta có một vài quyết định quan trọng cần đưa ra cho "${scenario.vietnameseTitle}" trước trưa nay. Bạn có thể báo cáo nhanh tình hình được không?`,
    },
  ];

  const colleagueOpenings = [
    {
      english: `Hey ${nameGreeting}got a quick second? I was just reviewing our tasks for ${topic}, and I'd love to coordinate with you on the next steps. What are your thoughts?`,
      vietnamese: `Chào bạn! Có rảnh một phút không? Mình vừa xem lại phần công việc cho "${scenario.vietnameseTitle}" và muốn cùng bạn phối hợp các bước tiếp theo. Bạn thấy thế nào?`,
    },
    {
      english: `Morning ${nameGreeting}hope your day is going smoothly! I saw the latest update on ${topic} and thought we should quickly align before the deadline. Do you have a minute to brainstorm?`,
      vietnamese: `Chào buổi sáng! Chúc một ngày làm việc thuận lợi nhé. Mình thấy cập nhật mới nhất về "${scenario.vietnameseTitle}" và nghĩ chúng mình nên trao đổi nhanh trước hạn chót. Bạn có vài phút để thảo luận không?`,
    },
    {
      english: `Hi ${nameGreeting}hope I'm not interrupting anything urgent. We need to finalize our approach for ${topic} this week. Could we bounce a couple of ideas off each other?`,
      vietnamese: `Chào bạn, hy vọng mình không làm gián đoạn việc gấp của bạn. Tuần này chúng mình cần chốt phương án cho "${scenario.vietnameseTitle}". Chúng ta cùng trao đổi nhanh vài ý tưởng nhé?`,
    },
    {
      english: `Hey there! Just grabbing some coffee. Did you get a chance to look over ${topic} yet? Let's figure out how we should split the workload.`,
      vietnamese: `Chào cậu! Mình đang tranh thủ lấy cốc cà phê. Cậu đã kịp xem qua "${scenario.vietnameseTitle}" chưa? Chúng mình cùng bàn xem nên phân chia công việc thế nào nhé.`,
    },
  ];

  const staffOpenings = [
    {
      english: `Good morning, ${nameGreeting}excuse me for checking in. I've prepared the initial materials for ${topic} and wanted to confirm if you'd like me to focus on the summary or detailed metrics first?`,
      vietnamese: `Chào buổi sáng! Xin lỗi vì đã làm phiền. Em/tôi đã chuẩn bị tài liệu ban đầu cho "${scenario.vietnameseTitle}" và muốn xin ý kiến xem nên ưu tiên phần tóm tắt hay số liệu chi tiết trước ạ?`,
    },
    {
      english: `Hi ${nameGreeting}I've completed the first draft regarding ${topic}. Whenever you have a free moment, could you please review it and give me some guidance on our next steps?`,
      vietnamese: `Chào bạn/anh/chị, em/tôi đã hoàn thành bản thảo đầu tiên về "${scenario.vietnameseTitle}". Khi nào rảnh, xin nhờ anh/chị xem qua và cho em xin hướng dẫn các bước tiếp theo với ạ?`,
    },
    {
      english: `Good day, ${nameGreeting}I wanted to give you a quick status update on our ${character.department || scenario.department} assignment. Everything is moving forward, but I have a couple of points regarding ${topic} I'd appreciate your confirmation on. May I run them by you?`,
      vietnamese: `Chào bạn/anh/chị, em muốn báo cáo nhanh tiến độ công việc tại phòng ${character.department || scenario.department}. Mọi thứ đang tiến triển tốt, nhưng em có vài điểm muốn xin xác nhận. Em có thể trình bày nhanh được không ạ?`,
    },
  ];

  const friendOpenings = [
    {
      english: `Hey ${nameGreeting}how is your week going? I was thinking about our plans for ${topic} and couldn't wait to check in with you. What are your thoughts?`,
      vietnamese: `Chào bạn! Dạo này tuần này thế nào rồi? Mình vừa nghĩ về kế hoạch cho "${scenario.vietnameseTitle}" và háo hức muốn hỏi ý kiến bạn ngay. Bạn thấy sao?`,
    },
    {
      english: `Yo ${nameGreeting}got a minute to chat? I came across something really cool regarding ${topic} and immediately thought of you. Are you free to catch up?`,
      vietnamese: `Ê bồ! Có rảnh một phút không? Mình vừa thấy điều này hay lắm liên quan đến "${scenario.vietnameseTitle}" và nghĩ ngay đến bạn. Bạn có rảnh nói chuyện chút không?`,
    },
    {
      english: `Hey there! It feels like ages since we properly hung out. Let's make time for ${topic} soon. What does your schedule look like?`,
      vietnamese: `Chào bạn! Cảm giác như lâu lắm rồi tụi mình chưa tụ tập đàng hoàng. Sớm thu xếp thời gian cho "${scenario.vietnameseTitle}" nhé. Lịch của bạn dạo này thế nào?`,
    },
  ];

  const familyOpenings = [
    {
      english: `Hello ${nameGreeting}my dear! I was just thinking about you and wanted to hear how you are doing with ${topic}. Have you been eating well and staying healthy?`,
      vietnamese: `Alo con yêu! Bố/mẹ vừa nghĩ đến con và muốn nghe xem dạo này con thế nào với "${scenario.vietnameseTitle}". Con có ăn uống đầy đủ và giữ gìn sức khỏe không?`,
    },
    {
      english: `Hi ${nameGreeting}sweetheart, I hope I'm not calling at a bad time. The whole family was asking about you. How are things going with ${topic}?`,
      vietnamese: `Chào con yêu, hy vọng bố/mẹ không gọi vào lúc con đang bận. Cả nhà ở quê cứ nhắc đến con mãi. Tình hình "${scenario.vietnameseTitle}" dạo này tiến triển thế nào rồi con?`,
    },
    {
      english: `Hello my dear! Remember that no matter how hectic life gets, your family is always right here supporting you. Tell me, how is ${topic} coming along?`,
      vietnamese: `Chào con yêu! Hãy luôn nhớ rằng dù cuộc sống ngoài kia có bận rộn thế nào, gia đình luôn ở bên cạnh ủng hộ con. Kể cho bố/mẹ nghe "${scenario.vietnameseTitle}" dạo này thế nào rồi?`,
    },
  ];

  const loverOpenings = [
    {
      english: `Hi my love, ${nameGreeting}I've missed you all day! I've been looking forward to our time together to talk about ${topic}. How was your day?`,
      vietnamese: `Chào anh/em yêu! Cả ngày hôm nay em/anh nhớ anh/em nhiều lắm! Em/anh cứ mong đến lúc hai đứa mình được trò chuyện về "${scenario.vietnameseTitle}". Hôm nay của anh/em thế nào?`,
    },
    {
      english: `Hey sweetheart! Seeing your name pop up always brightens my mood. I was daydreaming about ${topic} for us. What do you think we should do?`,
      vietnamese: `Chào tình yêu của em/anh! Thấy tin nhắn của anh/em là tâm trạng em/anh lại vui lên ngay. Em/anh vừa mơ màng nghĩ về "${scenario.vietnameseTitle}" của hai đứa mình. Anh/em thấy thế nào?`,
    },
    {
      english: `Hi darling! Just wanted to send you some love and ask about ${topic}. Whenever you're ready, let's chat and plan it out together!`,
      vietnamese: `Chào em/anh yêu! Em/anh muốn gửi chút yêu thương và hỏi xem "${scenario.vietnameseTitle}" thế nào rồi. Khi nào rảnh, chúng mình cùng nhau trò chuyện và lên kế hoạch nhé!`,
    },
  ];

  const interviewerOpenings = [
    {
      english: `Good day, ${nameGreeting}thank you for joining our interview today. We are eager to explore your expertise regarding ${topic}. Could you start by introducing yourself and sharing your relevant background?`,
      vietnamese: `Xin chào! Cảm ơn bạn đã tham gia buổi phỏng vấn hôm nay. Chúng tôi rất mong được tìm hiểu chuyên môn của bạn liên quan đến "${scenario.vietnameseTitle}". Bạn có thể bắt đầu bằng việc giới thiệu bản thân và kinh nghiệm của mình được không?`,
    },
    {
      english: `Hello ${nameGreeting}welcome to our tech panel. We have a focused discussion prepared today on ${topic}. To kick things off, what attracted you to this role and how have your past experiences prepared you?`,
      vietnamese: `Xin chào, chào mừng bạn đến với hội đồng phỏng vấn kỹ thuật của chúng tôi. Hôm nay chúng ta sẽ thảo luận trọng tâm về "${scenario.vietnameseTitle}". Để bắt đầu, điều gì đã thu hút bạn ứng tuyển vị trí này?`,
    },
    {
      english: `Welcome ${nameGreeting}we appreciate your time. Our team is particularly interested in your problem-solving approach to ${topic}. Could you walk us through a recent challenge you navigated successfully?`,
      vietnamese: `Chào mừng bạn, cảm ơn bạn đã dành thời gian. Đội ngũ chúng tôi rất quan tâm đến phương pháp giải quyết vấn đề của bạn trong "${scenario.vietnameseTitle}". Bạn có thể chia sẻ về một thử thách gần đây mà bạn đã vượt qua thành công không?`,
    },
  ];

  const strangerOpenings = [
    {
      english: `Excuse me ${nameGreeting}pardon the interruption! I noticed you might need assistance with ${topic}. Are you looking for directions or information?`,
      vietnamese: `Xin lỗi bạn vì đã làm phiền! Tôi thấy có vẻ bạn đang cần hỗ trợ về "${scenario.vietnameseTitle}". Bạn có đang tìm đường hoặc thông tin gì không?`,
    },
    {
      english: `Hello there! Welcome to our area. If you're wondering about ${topic}, I'd be happy to share some local recommendations or guide you in the right direction!`,
      vietnamese: `Xin chào bạn! Chào mừng bạn đến với khu vực của chúng tôi. Nếu bạn đang thắc mắc về "${scenario.vietnameseTitle}", tôi rất sẵn lòng chia sẻ vài lời khuyên của người bản địa hoặc chỉ đường cho bạn!`,
    },
    {
      english: `Good day! You seem to be checking the schedule for ${topic}. Can I help guide you so you don't miss your transit or landmark?`,
      vietnamese: `Chào bạn! Thấy bạn đang kiểm tra lịch trình cho "${scenario.vietnameseTitle}". Tôi có thể giúp gì để bạn không bị lỡ chuyến đi hoặc địa danh tham quan không?`,
    },
  ];

  const poolMap: Record<CharacterRole, Array<{ english: string; vietnamese: string }>> = {
    boss: bossOpenings,
    colleague: colleagueOpenings,
    staff: staffOpenings,
    friend: friendOpenings,
    family: familyOpenings,
    lover: loverOpenings,
    interviewer: interviewerOpenings,
    stranger: strangerOpenings,
  };

  const pool = poolMap[role] || colleagueOpenings;
  const picked = pool[Math.floor(Math.random() * pool.length)];

  return picked || { english: scenario.initialMessage, vietnamese: scenario.initialTranslation };
}
