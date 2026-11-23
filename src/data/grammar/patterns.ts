import { GrammarLesson } from '@/types/grammar';

export const patternsLessons: GrammarLesson[] = [
  {
    id: 'pattern-polite-requests-diplomacy',
    categoryId: 'communication-patterns',
    title: 'Polite Workplace Requests & Diplomatic Follow-ups',
    titleVi: 'Mẫu câu Nhờ vả lịch sự, Đàm phán tế nhị & Theo dõi tiến độ',
    subtitle: 'Nói và viết email để đối tác và đồng nghiệp quốc tế luôn muốn giúp đỡ bạn.',
    difficulty: 'Core TOEIC',
    frequency: '★★★★★',
    tag: 'Giao tiếp & Email công sở',

    nativeMindset: {
      coreIntuition:
        'Trong văn hóa Anh - Mỹ, yêu cầu ai đó làm gì theo kiểu trực tiếp như "Do this", "Send me the file" hay thậm chí "Please send me the file" đôi khi vẫn bị coi là hơi hách dịch (demanding) hoặc thiếu tinh tế giữa đồng nghiệp ngang hàng. Người bản xứ dùng "KHOẢNG CÁCH TÂM LÝ" (Psychological distance) bằng cách lùi thì (I was wondering...), dùng trợ động từ giả định (Would you mind...), hoặc hỏi xem việc đó có làm phiền đối phương không.',
      mentalImage:
        'Tưởng tượng bạn bước vào phòng làm việc của ai đó: Bạn không đạp cửa xông vào (mệnh lệnh), mà bạn gõ cửa nhẹ nhàng 2 tiếng, đứng ở cửa và hỏi xem họ có đang bận không trước khi nhờ vả.',
      whyNativesSayThis:
        '- Cấu trúc "Would you mind + V-ING": Bản chất câu hỏi là "Bạn có PHIỀN KHÔNG nếu làm việc này?". Nếu đồng nghiệp vui vẻ giúp, họ sẽ trả lời "Not at all!" hoặc "Sure, no problem!" (Không phiền chút nào cả!).\n- Cấu trúc "I look forward to + V-ING": Chữ "to" ở đây là GIỚI TỪ chỉ hướng đến đối tượng, nên bắt buộc đi với V-ing (danh động từ), không phải to-V.',
      vietnameseMistakeWarning:
        '1. Khi được hỏi "Would you mind closing the window?", người Việt hay quen miệng đáp "Yes" (với ý là "Vâng, tôi đóng ngay"). Nhưng trong tiếng Anh, "Yes" = "Có, tôi thấy rất phiền đấy, đừng làm phiền tôi!". Hãy nhớ: Muốn giúp, phải trả lời "No, not at all!" hoặc "Of course!".\n2. Viết email hay ghi "I look forward to hear from you" (sai to-V kinh điển).',
    },

    rules: [
      {
        ruleTitle: 'Cấu trúc nhờ vả lịch sự đỉnh cao: Would you mind + V-ing',
        formula: 'Would you mind + V-ING ...? / Would you mind IF I + V-past ...?',
        description: 'Hỏi xem đối phương có cảm thấy phiền hà hay bất tiện không.',
        whenToUse:
          'Would you mind reviewing this proposal before 3 PM?\nWould you mind if I left the meeting five minutes early?',
      },
      {
        ruleTitle: 'Cấu trúc ướm lời tinh tế: I was wondering if you could...',
        formula: 'I was wondering if you could + V(bare) ...',
        description: 'Lùi về thì quá khứ tiếp diễn để tạo sự mềm mỏng, lịch sự tối đa trong email.',
        whenToUse: 'I was wondering if you could send me the updated attendee list.',
      },
      {
        ruleTitle: 'Cấu trúc kết thư & mong đợi: Look forward to + V-ing',
        formula: 'Look forward to + V-ING / Noun',
        description: '"To" là giới từ, sau giới từ là danh từ hoặc V-ing.',
        whenToUse: 'We look forward to collaborating with your company on future ventures.',
      },
    ],

    examples: [
      {
        en: 'Would you mind sending me the spreadsheet once you finish updating it?',
        vi: 'Bạn có phiền gửi giúp tôi bảng tính sau khi cập nhật xong không?',
        context: 'workplace',
        note: 'Cực kỳ phổ biến khi trao đổi giữa đồng nghiệp qua Slack/Teams/Email.',
        highlightWords: ['Would you mind sending'],
      },
      {
        en: 'I was wondering if you might have a few minutes to discuss the Q3 roadmap.',
        vi: 'Tôi tự hỏi liệu bạn có thể dành ra ít phút để cùng trao đổi về lộ trình quý 3 được không.',
        context: 'workplace',
        note: 'Cách đặt lịch hẹn ngắn với cấp trên hoặc đồng nghiệp bận rộn.',
        highlightWords: ['I was wondering if you might have'],
      },
      {
        en: 'I am following up on the quotation we submitted last Thursday.',
        vi: 'Tôi gửi email này để theo dõi tiến độ bản báo giá chúng tôi đã gửi vào thứ Năm tuần trước.',
        context: 'workplace',
        note: '"Follow up on" là cụm từ vàng trong email bán hàng và điều phối dự án.',
        highlightWords: ['following up on the quotation'],
      },
      {
        en: 'Our management team looks forward to welcoming you to the Singapore symposium.',
        vi: 'Ban lãnh đạo chúng tôi rất mong chờ được chào đón quý vị tại hội nghị chuyên đề ở Singapore.',
        context: 'toeic',
        note: 'Looks forward to + welcoming (V-ing) -> câu chốt kinh điển trong thư mời TOEIC.',
        highlightWords: ['looks forward to welcoming'],
      },
    ],

    commonTraps: [
      {
        wrong: 'I look forward to meet you at the exhibition.',
        correct: 'I look forward to meeting you at the exhibition.',
        nativeReason: 'Trong thành ngữ "look forward to", "to" là một GIỚI TỪ, theo sau bắt buộc là V-ing.',
        vietnameseTrap: 'Thấy chữ "to" tưởng là động từ nguyên mẫu có to (to-infinitive) nên chia "meet".',
      },
      {
        wrong: 'A: Would you mind sending the file? - B: Yes, I will send it now.',
        correct: 'A: Would you mind sending the file? - B: Not at all, I will send it right away.',
        nativeReason:
          '"Would you mind" = Bạn có thấy phiền không? Trả lời "Yes" nghĩa là "Tôi thấy rất phiền". Phải trả lời "Not at all / Sure / Happy to help".',
        vietnameseTrap: 'Thói quen trả lời "Yes" như dịch từ "Vâng" trong tiếng Việt.',
      },
    ],

    toeicHacks: {
      targetParts: 'TOEIC Part 5 & Part 7',
      hackTitle: 'Mẹo "Look forward to + V-ing" và các giới từ trá hình',
      hackContent:
        'Trong TOEIC, có một số cụm từ có chữ "TO" nhưng "TO" đó lại là GIỚI TỪ, đi kèm V-ing:\n1. Look forward to + V-ing (Mong đợi)\n2. Be committed to / dedicated to + V-ing (Cam kết, cống hiến)\n3. In addition to + V-ing / Noun (Bên cạnh việc...)\n4. Object to + V-ing (Phản đối việc...)',
      quickSignalWords: [
        'look forward to + V-ing',
        'be committed to + V-ing',
        'dedicated to + V-ing',
        'prior to + V-ing',
      ],
      ruleOfThumb: 'Gặp "look forward to / committed to" -> Khoanh ngay V-ING.',
    },

    quiz: [
      {
        question:
          'The entire executive committee is genuinely looking forward to _____ your marketing proposal this afternoon.',
        options: ['review', 'reviewed', 'reviewing', 'reviews'],
        correctAnswer: 2,
        explanation:
          'Sau cụm từ "looking forward to", động từ bắt buộc chia ở dạng danh động từ (V-ing): "reviewing".',
        toeicTip: 'Câu hỏi quen thuộc kiểm tra dạng của động từ sau "look forward to".',
      },
      {
        question:
          'A: "Would you mind holding the elevator for a second?" — B: "_____, hop on in!"',
        options: ['Yes, certainly', 'Not at all', 'I would mind', 'Never'],
        correctAnswer: 1,
        explanation:
          'Để đồng ý giữ thang máy giúp người khác khi được hỏi "Would you mind...", câu trả lời tự nhiên và chính xác là "Not at all" (Không phiền chút nào cả, mời bạn vào!).',
        toeicTip: 'Ngữ pháp giao tiếp Part 2 TOEIC: Would you mind -> trả lời No/Not at all.',
      },
    ],
  },
  {
    id: 'pattern-cause-effect-contrast-connectors',
    categoryId: 'communication-patterns',
    title: 'Cause, Effect & Contrast: Due to vs. Because, Despite vs. Although',
    titleVi: 'Nguyên nhân & Nhượng bộ: Phân biệt Cụm danh từ vs Mệnh đề',
    subtitle: 'Mẹo 3 giây giải quyết 100% các câu hỏi về liên từ và giới từ trong TOEIC Part 5.',
    difficulty: 'Core TOEIC',
    frequency: '★★★★★',
    tag: 'Bí kíp liên từ Part 5',

    nativeMindset: {
      coreIntuition:
        'Người bản xứ phân loại cách nối ý thành 2 nhóm hoàn toàn tách bạch:\n1. **Nhóm Giới từ (Prepositions)**: Chỉ được phép bắt tay với một Danh từ hoặc Cụm danh từ (Noun / Noun Phrase). Nó như một cái nhãn dán dán lên một món đồ: "Due to heavy rain" (Vì cơn mưa lớn).\n2. **Nhóm Liên từ (Conjunctions)**: Đứng ra làm cây cầu nối giữa hai MỆNH ĐỀ có đầy đủ Chủ ngữ và Vị ngữ: "Because it rained heavily" (Bởi vì trời mưa to).',
      mentalImage:
        'Liên từ (Because / Although) giống như ổ cắm điện đôi (cần cắm 2 vế hoàn chỉnh S+V). Giới từ (Due to / Despite) giống như chiếc móc treo đơn (chỉ treo được một vật là Noun).',
      whyNativesSayThis:
        'Văn bản thương mại và báo cáo trang trọng rất chuộng nhóm Giới từ (Due to, Owing to, Despite) kết hợp với Danh từ hóa (Nominalization) vì nó ngắn gọn và súc tích hơn việc dùng cả một câu dài lê thê.',
      vietnameseMistakeWarning:
        'Người Việt dịch nghĩa cả "Because" và "Because of" là "Bởi vì", cả "Although" và "Despite" là "Mặc dù", nên khi làm bài hay bị chọn sai theo cảm tính mà không để ý phía sau là một Câu hay một Cụm từ.',
    },

    rules: [
      {
        ruleTitle: 'Cặp đôi Nguyên nhân (Cause & Reason)',
        formula:
          '- GIỚI TỪ: Due to / Because of / Owing to + NOUN / V-ING\n- LIÊN TỪ: Because / Since / As / Now that + S + V (Clause)',
        description: 'Diễn giải lý do của sự việc.',
        whenToUse:
          '- Due to inclement weather, flights are grounded.\n- Because the weather was inclement, flights were grounded.',
      },
      {
        ruleTitle: 'Cặp đôi Nhượng bộ & Đối lập (Concession & Contrast)',
        formula:
          '- GIỚI TỪ: Despite / In spite of + NOUN / V-ING\n- LIÊN TỪ: Although / Even though / Though / While + S + V (Clause)',
        description: 'Diễn giải sự tương phản giữa hai ý.',
        whenToUse:
          '- Despite economic headwinds, our quarterly revenue rose by 8%.\n- Although economic headwinds persisted, our quarterly revenue rose by 8%.',
      },
    ],

    examples: [
      {
        en: 'The flight to Frankfurt was canceled due to heavy snowfall.',
        vi: 'Chuyến bay đến Frankfurt đã bị hủy do tuyết rơi dày đặc.',
        context: 'daily',
        note: '"heavy snowfall" là cụm danh từ -> dùng giới từ "due to".',
        highlightWords: ['due to heavy snowfall'],
      },
      {
        en: 'Because our inventory tracking system was outdated, errors were frequent.',
        vi: 'Bởi vì hệ thống theo dõi kho hàng của chúng tôi đã lỗi thời, các sai sót xảy ra thường xuyên.',
        context: 'workplace',
        note: '"our inventory tracking system was outdated" là một mệnh đề (S + V) -> dùng liên từ "Because".',
        highlightWords: ['Because our inventory tracking system was outdated'],
      },
      {
        en: 'Despite unexpected supply chain disruptions, the team met the client deadline.',
        vi: 'Bất chấp sự gián đoạn chuỗi cung ứng ngoài dự kiến, cả đội vẫn hoàn thành đúng hạn của khách hàng.',
        context: 'workplace',
        note: '"unexpected supply chain disruptions" là một cụm danh từ -> dùng "Despite".',
        highlightWords: ['Despite unexpected supply chain disruptions'],
      },
      {
        en: 'Although the conference venue was small, the turnout was impressive.',
        vi: 'Mặc dù địa điểm tổ chức hội nghị khá nhỏ, số lượng người tham dự lại rất ấn tượng.',
        context: 'toeic',
        note: '"the conference venue was small" có S + to be (was) -> bắt buộc dùng liên từ "Although".',
        highlightWords: ['Although the conference venue was small'],
      },
    ],

    commonTraps: [
      {
        wrong: 'Despite it was raining heavily, we went to the site visit.',
        correct: 'Although it was raining heavily, we went to the site visit.',
        nativeReason:
          '"It was raining heavily" có chủ ngữ "it" và động từ "was raining" (mệnh đề) -> phải dùng liên từ "Although", không được dùng giới từ "Despite".',
        vietnameseTrap: 'Dùng "Despite" trước một mệnh đề S + V.',
      },
      {
        wrong: 'Because of the company was founded in 2010, it had modern systems.',
        correct: 'Because the company was founded in 2010, it had modern systems.',
        nativeReason: 'Phía sau là mệnh đề "the company was founded" -> bỏ "of", chỉ dùng "Because".',
        vietnameseTrap: 'Nhầm lẫn giữa "Because" và "Because of".',
      },
    ],

    toeicHacks: {
      targetParts: 'TOEIC Part 5 & Part 6',
      hackTitle: 'Mẹo 3 bước "Bẻ khóa" liên từ - giới từ trong 3 giây',
      hackContent:
        'Khi gặp 4 đáp án vừa có liên từ vừa có giới từ (Ví dụ: A. Although  B. Despite  C. Because  D. Due to):\n1. Nhìn ngay VẾ SAU CHỖ TRỐNG xem có ĐỘNG TỪ CHIA THÌ hay không.\n2. Nếu CÓ động từ chia thì (S + V) -> LOẠI NGAY B và D (chỉ còn Although / Because).\n3. Nếu KHÔNG có động từ chia thì (chỉ có Cụm danh từ / V-ing) -> LOẠI NGAY A và C (chỉ còn Despite / Due to).\n4. Dịch nhẹ nghĩa: Nguyên nhân (Because / Due to) hay Tương phản (Although / Despite).',
      quickSignalWords: [
        'Due to / Because of + Noun Phrase',
        'Despite / In spite of + Noun Phrase',
        'Although / Even though + S + V',
        'Because / Since + S + V',
      ],
      ruleOfThumb: 'Có S+V -> Chọn Liên từ (Because, Although); Chỉ có Cụm Noun -> Chọn Giới từ (Due to, Despite).',
    },

    quiz: [
      {
        question:
          '_____ severe weather conditions disrupted train services across the region, the symposium started on time.',
        options: ['Despite', 'Although', 'Because of', 'In spite of'],
        correctAnswer: 1,
        explanation:
          'Phía sau là mệnh đề có chủ ngữ "severe weather conditions" và động từ "disrupted". Nghĩa tương phản (thời tiết xấu nhưng hội nghị vẫn đúng giờ) -> chọn liên từ "Although".',
        toeicTip: 'Có động từ "disrupted" -> loại ngay Despite và In spite of.',
      },
      {
        question:
          'The construction project was completed two weeks ahead of schedule _____ the dedication of the civil engineering crew.',
        options: ['because', 'owing to', 'even though', 'whereas'],
        correctAnswer: 1,
        explanation:
          'Phía sau là cụm danh từ "the dedication of the civil engineering crew" (không có động từ chia thì). Thể hiện nguyên nhân -> chọn giới từ "owing to" (= due to / because of).',
        toeicTip: 'Sau chỗ trống là cụm Noun -> loại because, even though, whereas.',
      },
    ],
  },
  {
    id: 'pattern-diplomatic-disagreement-negotiation',
    categoryId: 'communication-patterns',
    title: 'Diplomatic Disagreement & Constructive Counter-Proposals',
    titleVi: 'Phản biện tế nhị, Đàm phán nhượng bộ & Giữ hòa khí công sở',
    subtitle: 'Nói "Không" mà đối tác vẫn vui vẻ và nể trọng sự chuyên nghiệp của bạn.',
    difficulty: 'Core TOEIC',
    frequency: '★★★★★',
    tag: 'Đàm phán & Phản biện',

    nativeMindset: {
      coreIntuition:
        'Trong văn hóa doanh nghiệp quốc tế, trực tiếp nói "I disagree" hay "You are wrong" là điều tối kỵ vì nó biến cuộc thảo luận thành xung đột cá nhân. Người bản xứ áp dụng nguyên tắc "Ghi nhận trước - Nêu vướng mắc sau": Bắt đầu bằng việc công nhận mặt tích cực của ý kiến đối phương (I see your point / While that is an innovative idea), sau đó dùng liên từ chuyển ý nhẹ nhàng (however / on the other hand) và chuyển trách nhiệm sang một yếu tố khách quan (budget constraints / timeline).',
      mentalImage:
        'Tưởng tượng môn võ Aikido: Bạn không đấm trực diện vào đối phương (gây thương tích), mà bạn mượn lực của đối phương, xoay người đón nhận rồi nhẹ nhàng chuyển hướng dòng năng lượng sang một phương án phụ khả thi hơn.',
      whyNativesSayThis:
        '- Cụm "I see your point, but...": Khẳng định tôi đã lắng nghe và hiểu thấu đáo lý lẽ của bạn.\n- Dùng tính từ giảm nhẹ: "I have some reservations" (Tôi có chút băn khoăn) thay vì "I hate this idea" (Tôi ghét ý tưởng này).',
      vietnameseMistakeWarning:
        'Người Việt khi họp với sếp Tây hay có 2 thái cực: (1) Quá rụt rè không dám nói gì dẫn đến bị coi là thụ động, hoặc (2) Phản biện quá thẳng thắn bằng từ ngữ mang tính công kích như "Your plan is impossible / wrong". Hãy làm quen với cấu trúc "I wonder if we could also consider..." (Liệu chúng ta có thể cân nhắc thêm phương án...).',
    },

    rules: [
      {
        ruleTitle: 'Ghi nhận góc nhìn rồi mới nêu trở ngại: I see your point, but...',
        formula: 'I see your point, but [Clause nêu lý do khách quan]',
        description: 'Xác nhận đã hiểu ý kiến nhưng chỉ ra rào cản về chi phí hoặc thời gian.',
        whenToUse: 'I see your point, but expanding our sales team now might strain our cash flow.',
      },
      {
        ruleTitle: 'Cấu trúc nhượng bộ tinh tế: While I agree that..., I am concerned about...',
        formula: 'While I agree that [Ý kiến A], I am concerned about / have reservations about [Vấn đề B]',
        description: 'Đồng thuận về mặt nguyên tắc nhưng đặt câu hỏi về tính thực thi.',
        whenToUse: 'While I agree that the design is modern, I am concerned about its mobile usability.',
      },
      {
        ruleTitle: 'Đưa ra giải pháp thay thế xây dựng: How about we explore... instead?',
        formula: 'How about we explore / look into [Alternative Solution] instead?',
        description: 'Chuyển hướng cuộc trò chuyện sang hướng hành động tích cực.',
        whenToUse: 'How about we pilot the software with one small department first?',
      },
    ],

    examples: [
      {
        en: 'I see your point, but accelerating the launch date might compromise product quality.',
        vi: 'Tôi hiểu quan điểm của anh, nhưng đẩy sớm ngày ra mắt có thể ảnh hưởng tiêu cực đến chất lượng sản phẩm.',
        context: 'workplace',
        note: 'Cách nói từ chối đẩy nhanh tiến độ mà vẫn giữ vững lập trường về chất lượng.',
        highlightWords: ['I see your point, but'],
      },
      {
        en: 'While I agree in principle, I have some reservations regarding the proposed marketing budget.',
        vi: 'Mặc dù về mặt nguyên tắc tôi đồng thuận, tôi vẫn có đôi chút băn khoăn về ngân sách tiếp thị được đề xuất.',
        context: 'workplace',
        note: '"I have some reservations" là cách nói nhã nhặn bậc nhất trong đàm phán.',
        highlightWords: ['I have some reservations regarding'],
      },
      {
        en: 'That is certainly a creative approach; however, we might want to check the legal compliance first.',
        vi: 'Đó chắc chắn là một cách tiếp cận sáng tạo; tuy nhiên, có lẽ chúng ta nên kiểm tra tính tuân thủ pháp lý trước đã.',
        context: 'toeic',
        note: 'Khen ngợi sáng kiến trước rồi mới nhắc nhở về rủi ro pháp lý.',
        highlightWords: ['That is certainly a creative approach; however'],
      },
    ],

    commonTraps: [
      {
        wrong: 'Your idea cannot work because it is too expensive.',
        correct: 'Given our current budgetary constraints, that approach might not be feasible at this stage.',
        nativeReason:
          'Chuyển từ công kích cá nhân ("Your idea cannot work") sang lý do khách quan của hoàn cảnh ("Given our current budgetary constraints").',
        vietnameseTrap: 'Dùng từ mang tính phán xét tiêu cực (impossible, cannot work).',
      },
    ],

    toeicHacks: {
      targetParts: 'TOEIC Part 3 & Part 7',
      hackTitle: 'Bắt bài câu hỏi băn khoăn / lo ngại trong hội thoại Part 3',
      hackContent:
        'Khi câu hỏi hỏi: "What is the speaker concerned about?" hoặc "Why does the woman hesitate?":\n1. Chú ý lắng nghe ngay sau các từ chuyển ý: "but", "however", "my only concern is", "the problem is".\n2. Ý chính phản biện luôn nằm sau các liên từ đối lập này, đừng để bị đánh lừa bởi phần khen ngợi xã giao ở vế trước.',
      quickSignalWords: [
        'I see your point, but...',
        'My main concern is...',
        'I have some reservations about...',
        'That sounds great, however...',
      ],
      ruleOfThumb: 'Đáp án câu hỏi lo ngại luôn nằm ngay sau "but / however / concern".',
    },

    quiz: [
      {
        question:
          'A: "We should revamp the entire website layout by next Monday." — B: "_____ our developer capacity, that timeline might be too aggressive."',
        options: ['Regarding', 'Given', 'Although', 'Despite of'],
        correctAnswer: 1,
        explanation:
          '"Given [Noun Phrase]" là liên từ/giới từ mang nghĩa "Xét đến hoàn cảnh / Căn cứ vào...". Trong ngữ cảnh này: "Căn cứ vào năng lực của đội ngũ lập trình, tiến độ đó có vẻ hơi quá sức".',
        toeicTip: 'Giới từ "Given" (+ cụm danh từ) rất hay xuất hiện trong Part 5 với nghĩa xét đến điều kiện thực tế.',
      },
    ],
  },
  {
    id: 'pattern-inversion-emphasis-prohibitions',
    categoryId: 'communication-patterns',
    title: 'Inversions for Strict Policies & Corporate Directives',
    titleVi: 'Đảo ngữ quy chuẩn & Nghiêm cấm vi phạm bảo mật',
    subtitle: 'Chinh phục các câu hỏi điểm 850+ trong TOEIC Part 5 và văn bản pháp quy.',
    difficulty: 'Advanced Mastery',
    frequency: '★★★★☆',
    tag: 'Đảo ngữ đỉnh cao Part 5',

    nativeMindset: {
      coreIntuition:
        'Trong các thông báo quy chế an toàn, bảo mật dữ liệu khách hàng hoặc điều lệ ngân hàng, người bản xứ đưa các trạng từ phủ định lên đầu câu (Under no circumstances, Seldom, Rarely, Never) để tạo sức nặng răn đe tuyệt đối. Khi đưa trạng từ phủ định lên đầu câu, trật tự câu buộc phải ĐẢO TRỢ ĐỘNG TỪ lên trước chủ ngữ giống hệt như một câu hỏi nghi vấn.',
      mentalImage:
        'Một tấm biển cảnh báo màu đỏ chói với chữ "CẤM TUYỆT ĐỐI" được treo ở nơi cao nhất ngay trước cổng vào nhà máy để bất kỳ ai cũng phải nhìn thấy đầu tiên.',
      whyNativesSayThis:
        'Câu thông thường: "Employees should not disclose passwords under any circumstances" (bình thường, thiếu điểm nhấn). Khi đảo ngữ: "Under no circumstances should employees disclose passwords" (nghiêm trang, răn đe và chuẩn mực hành chính).',
      vietnameseMistakeWarning:
        'Người Việt hay quên đảo trợ động từ, viết thành: "Under no circumstances employees should..." (SAI). Hãy nhớ công thức: Cụm phủ định + Trợ động từ (Should/Can/Do/Did) + Chủ ngữ + V-bare.',
    },

    rules: [
      {
        ruleTitle: 'Cụm nghiêm cấm tuyệt đối: Under no circumstances + Trợ động từ + S + V',
        formula: 'Under no circumstances + should / can / may + S + V(bare) ...',
        description: 'Nghiêm cấm trong mọi tình huống, không có ngoại lệ.',
        whenToUse: 'Under no circumstances should visitors enter the laboratory without safety goggles.',
      },
      {
        ruleTitle: 'Cụm điều kiện thời gian: Only after / Only when + Clause + Trợ động từ + S + V',
        formula: 'Only after / Only when + S + V, + will / did / can + S + V(bare)',
        description: 'Chỉ sau khi điều kiện thứ nhất hoàn tất thì hành động thứ hai mới được thực hiện.',
        whenToUse: 'Only after the inspection is complete will the facility be certified for production.',
      },
    ],

    examples: [
      {
        en: 'Under no circumstances should confidential financial records be stored on unencrypted USB drives.',
        vi: 'Trong bất kỳ hoàn cảnh nào cũng không được phép lưu trữ các hồ sơ tài chính mật trên các ổ USB không được mã hóa.',
        context: 'toeic',
        note: '"Under no circumstances" đứng đầu -> đảo "should" lên trước "confidential financial records".',
        highlightWords: ['Under no circumstances should'],
      },
      {
        en: 'Only after submitting the official travel expense voucher will employees receive reimbursement.',
        vi: 'Chỉ sau khi nộp chứng từ chi tiêu công tác chính thức thì nhân viên mới nhận được tiền hoàn trả.',
        context: 'toeic',
        note: '"Only after..." đứng đầu -> vế sau đảo trợ động từ "will" lên trước "employees".',
        highlightWords: ['will employees receive reimbursement'],
      },
      {
        en: 'Seldom has our retail chain experienced such overwhelming demand during the holiday season.',
        vi: 'Hiếm khi nào chuỗi bán lẻ của chúng ta lại chứng kiến nhu cầu khách hàng bùng nổ mạnh mẽ như trong mùa lễ hội này.',
        context: 'workplace',
        note: '"Seldom" đứng đầu -> đảo thì hiện tại hoàn thành: "has our retail chain experienced".',
        highlightWords: ['Seldom has our retail chain experienced'],
      },
    ],

    commonTraps: [
      {
        wrong: 'Under no circumstances staff members are permitted to leave the building during an emergency.',
        correct: 'Under no circumstances are staff members permitted to leave the building during an emergency.',
        nativeReason: 'Phải đảo to-be "are" lên trước chủ ngữ "staff members".',
        vietnameseTrap: 'Giữ nguyên trật tự câu thông thường sau cụm từ phủ định.',
      },
    ],

    toeicHacks: {
      targetParts: 'TOEIC Part 5 & Part 6',
      hackTitle: 'Tuyệt chiêu nhận diện Đảo ngữ trong 3 giây',
      hackContent:
        '1. Nếu thấy đầu câu có cụm: "Under no circumstances", "On no account", "Seldom", "Rarely", "Hardly", "Only after / Only when".\n2. Nhìn ngay vào vị trí sau đó: BẮT BUỘC phải là TRỢ ĐỘNG TỪ (should, can, will, do, does, did, has, have, is, are).\n3. Nếu chỗ trống nằm ở ĐỘNG TỪ chính -> Chọn ĐỘNG TỪ NGUYÊN THỂ (V-bare).',
      quickSignalWords: [
        'Under no circumstances + should + S + V-bare',
        'Only after... + will + S + V-bare',
        'Seldom / Rarely + has / have + S + V3/ed',
      ],
      ruleOfThumb: 'Thấy Phủ định đứng đầu câu -> Tìm phương án có Trợ động từ đứng trước Chủ ngữ.',
    },

    quiz: [
      {
        question:
          'Under no circumstances _____ the building manager grant access to the rooftop without prior safety clearance.',
        options: ['will', 'he will', 'is', 'that'],
        correctAnswer: 0,
        explanation:
          'Cấu trúc đảo ngữ với "Under no circumstances": Cần trợ động từ "will" đứng trước chủ ngữ "the building manager". Động từ chính là "grant" (nguyên thể).',
        toeicTip: 'Cấu trúc: Under no circumstances + will + S + V-bare.',
      },
    ],
  },
];
