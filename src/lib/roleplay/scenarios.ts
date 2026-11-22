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
];

export const PRESET_SCENARIOS: RoleplayScenario[] = [
  // ================= BOSS SCENARIOS =================
  {
    id: 'boss-deadline-extension',
    title: 'Xin gia hạn Deadline dự án',
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

  const bossOpenings = [
    {
      english: `Good morning, ${nameGreeting}do you have a brief moment to sync? I was going over the requirements for "${scenario.title}" and want to make sure we're on track. Where do things stand?`,
      vietnamese: `Chào buổi sáng! Bạn có chút thời gian để trao đổi nhanh không? Tôi vừa xem qua các yêu cầu cho "${scenario.vietnameseTitle}" và muốn chắc chắn chúng ta đang đúng tiến độ. Tình hình thế nào rồi?`,
    },
    {
      english: `Hi ${nameGreeting}please have a seat. Regarding our "${scenario.title}" agenda, I have a few specific questions before our executive briefing. Are you ready to walk me through the key updates?`,
      vietnamese: `Chào bạn, mời ngồi. Liên quan đến "${scenario.vietnameseTitle}", tôi có vài câu hỏi cụ thể trước cuộc họp ban giám đốc. Bạn đã sẵn sàng trình bày những điểm cập nhật chính chưa?`,
    },
    {
      english: `Hello ${nameGreeting}I'm following up on our ${character.department || scenario.department} schedule today. We need to align on our priority deliverables for "${scenario.title}". How is your progress coming along?`,
      vietnamese: `Chào bạn, tôi muốn theo dõi tiến độ hôm nay của phòng ${character.department || scenario.department}. Chúng ta cần thống nhất các đầu việc ưu tiên cho "${scenario.vietnameseTitle}". Tiến độ của bạn đến đâu rồi?`,
    },
    {
      english: `Morning ${nameGreeting}thanks for stopping by. We have some important decisions to make regarding "${scenario.title}" before noon. Can you give me a status report?`,
      vietnamese: `Chào bạn, cảm ơn đã ghé qua. Chúng ta có một vài quyết định quan trọng cần đưa ra cho "${scenario.vietnameseTitle}" trước trưa nay. Bạn có thể báo cáo nhanh tình hình được không?`,
    },
  ];

  const colleagueOpenings = [
    {
      english: `Hey ${nameGreeting}got a quick second? I was just reviewing our tasks for "${scenario.title}", and I'd love to coordinate with you on the next steps. What are your thoughts?`,
      vietnamese: `Chào bạn! Có rảnh một phút không? Mình vừa xem lại phần công việc cho "${scenario.vietnameseTitle}" và muốn cùng bạn phối hợp các bước tiếp theo. Bạn thấy thế nào?`,
    },
    {
      english: `Morning ${nameGreeting}hope your day is going smoothly! I saw the latest update on "${scenario.title}" and thought we should quickly align before the deadline. Do you have a minute to brainstorm?`,
      vietnamese: `Chào buổi sáng! Chúc một ngày làm việc thuận lợi nhé. Mình thấy cập nhật mới nhất về "${scenario.vietnameseTitle}" và nghĩ chúng mình nên trao đổi nhanh trước hạn chót. Bạn có vài phút để thảo luận không?`,
    },
    {
      english: `Hi ${nameGreeting}hope I'm not interrupting anything urgent. We need to finalize our approach for "${scenario.title}" this week. Could we bounce a couple of ideas off each other?`,
      vietnamese: `Chào bạn, hy vọng mình không làm gián đoạn việc gấp của bạn. Tuần này chúng mình cần chốt phương án cho "${scenario.vietnameseTitle}". Chúng ta cùng trao đổi nhanh vài ý tưởng nhé?`,
    },
    {
      english: `Hey there! Just grabbing some coffee. Did you get a chance to look at "${scenario.title}" yet? Let's figure out how we should split the workload.`,
      vietnamese: `Chào cậu! Mình đang tranh thủ lấy cốc cà phê. Cậu đã kịp xem qua "${scenario.vietnameseTitle}" chưa? Chúng mình cùng bàn xem nên phân chia công việc thế nào nhé.`,
    },
  ];

  const staffOpenings = [
    {
      english: `Good morning, ${nameGreeting}excuse me for checking in. I've prepared the initial materials for "${scenario.title}" and wanted to confirm if you'd like me to focus on the summary or detailed metrics first?`,
      vietnamese: `Chào buổi sáng! Xin lỗi vì đã làm phiền. Em/tôi đã chuẩn bị tài liệu ban đầu cho "${scenario.vietnameseTitle}" và muốn xin ý kiến xem nên ưu tiên phần tóm tắt hay số liệu chi tiết trước ạ?`,
    },
    {
      english: `Hi ${nameGreeting}I've completed the first draft regarding "${scenario.title}". Whenever you have a free moment, could you please review it and give me some guidance on our next steps?`,
      vietnamese: `Chào bạn/anh/chị, em/tôi đã hoàn thành bản thảo đầu tiên về "${scenario.vietnameseTitle}". Khi nào rảnh, xin nhờ anh/chị xem qua và cho em xin hướng dẫn các bước tiếp theo với ạ?`,
    },
    {
      english: `Good day, ${nameGreeting}I wanted to give you a quick status update on our ${character.department || scenario.department} assignment. Everything is moving forward, but I have a couple of points I'd appreciate your confirmation on. May I run them by you?`,
      vietnamese: `Chào bạn/anh/chị, em muốn báo cáo nhanh tiến độ công việc tại phòng ${character.department || scenario.department}. Mọi thứ đang tiến triển tốt, nhưng em có vài điểm muốn xin xác nhận. Em có thể trình bày nhanh được không ạ?`,
    },
  ];

  const pool = role === 'boss' ? bossOpenings : role === 'colleague' ? colleagueOpenings : staffOpenings;
  const picked = pool[Math.floor(Math.random() * pool.length)];

  return picked || { english: scenario.initialMessage, vietnamese: scenario.initialTranslation };
}
