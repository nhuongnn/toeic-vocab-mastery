import { GrammarLesson } from '@/types/grammar';

export const passiveVoiceLessons: GrammarLesson[] = [
  {
    id: 'passive-corporate-diplomacy',
    categoryId: 'passive-voice',
    title: 'Passive Voice: Corporate Diplomacy & Focus on Results',
    titleVi: 'Câu bị động: Ngoại giao công sở & Nghệ thuật tập trung vào kết quả',
    subtitle: 'Người bản xứ không dùng bị động để làm khó ngữ pháp, họ dùng để giao tiếp văn minh và tinh tế.',
    difficulty: 'Core TOEIC',
    frequency: '★★★★★',
    tag: 'Ngoại giao công sở',

    nativeMindset: {
      coreIntuition:
        'Trong giao tiếp công sở phương Tây, văn hóa "chỉ tay quy trách nhiệm" (finger-pointing) là điều tối kỵ. Khi có lỗi phát sinh hoặc hoá đơn chưa thanh toán, thay vì nói thô lỗ "You did not send the payment" (Anh chưa gửi tiền - nghe như kết tội), người bản xứ sẽ dùng câu bị động: "Payment has not yet been received" (Khoản thanh toán hiện vẫn chưa được tiếp nhận). Bị động chuyển trọng tâm từ "CON NGƯỜI LÀM SAI" sang "TRẠNG THÁI CỦA CÔNG VIỆC".',
      mentalImage:
        'Chủ động giống như bạn dí ngón tay vào mặt ai đó. Bị động giống như bạn chỉ vào tờ giấy báo cáo trên bàn: Mọi người cùng nhìn vào sự việc một cách khách quan, chuyên nghiệp và bình tĩnh.',
      whyNativesSayThis:
        'Ngoài sự lịch sự, bị động còn dùng khi AI LÀM KHÔNG QUAN TRỌNG, mà KẾT QUẢ MỚI QUAN TRỌNG. Ví dụ: "The new airport will be completed next year" (Sân bay sẽ được hoàn thành năm sau) -> Người đọc chỉ quan tâm sân bay, không cần biết tên 5.000 công nhân xây dựng.',
      vietnameseMistakeWarning:
        'Người Việt hay dịch máy móc chữ "bị" (tiêu cực) và "được" (tích cực). Trong tiếng Anh, Passive Voice hoàn toàn trung tính, mang tính khách quan và khoa học.',
    },

    rules: [
      {
        ruleTitle: 'Công thức bị động cốt lõi',
        formula: 'S + BE (chia theo thì) + V3/P.P + (by O - thường lược bỏ)',
        description:
          'Chủ ngữ chịu tác động của hành động. Động từ "to be" gánh toàn bộ thì (is/are, was/were, will be, has been, being).',
        whenToUse:
          '1. Khi người thực hiện hành động không rõ hoặc không quan trọng.\n2. Khi viết thông báo chính sách, email nhắc nợ, biên bản kỹ thuật.\n3. Khi muốn lịch sự, tránh đụng chạm cá nhân.',
        whenToAvoid: 'Khi muốn viết lời kêu gọi hành động (Call to Action) mạnh mẽ hoặc kể chuyện cá nhân sinh động.',
      },
      {
        ruleTitle: 'Bị động với Động từ khuyết thiếu (Modal Verbs)',
        formula: 'S + can / should / must / may + BE + V3/P.P',
        description: 'Cực kỳ phổ biến trong quy định an toàn, hướng dẫn văn phòng và bài thi TOEIC.',
        whenToUse: 'All safety helmets must be worn at all times on the construction site.',
      },
    ],

    examples: [
      {
        en: 'The quarterly financial report was approved by the executive board.',
        vi: 'Báo cáo tài chính quý đã được ban điều hành phê duyệt.',
        context: 'workplace',
        note: 'Trọng tâm đặt vào bản báo cáo (chủ ngữ), làm nổi bật trạng thái đã được thông qua.',
        highlightWords: ['was approved by'],
      },
      {
        en: 'A slight administrative error was made on invoice #4029.',
        vi: 'Đã có một sơ suất hành chính nhỏ xuất hiện trên hóa đơn số 4029.',
        context: 'workplace',
        note: 'Cách nói tinh tế trong email hỗ trợ khách hàng để xoa dịu tình hình thay vì đổ lỗi cho nhân viên cụ thể.',
        highlightWords: ['error was made'],
      },
      {
        en: 'All mobile phones must be silenced during the orientation seminar.',
        vi: 'Tất cả điện thoại di động phải được để chế độ im lặng trong suốt buổi hội thảo định hướng.',
        context: 'toeic',
        note: 'Cấu trúc "must be silenced" thường xuyên xuất hiện ở các biển báo và thông báo TOEIC Part 7.',
        highlightWords: ['must be silenced'],
      },
      {
        en: 'We were told that the flight has been delayed due to severe weather.',
        vi: 'Chúng tôi được thông báo rằng chuyến bay đã bị hoãn do thời tiết xấu.',
        context: 'daily',
        note: '"We were told" là cách diễn đạt tự nhiên hàng ngày thay vì "The airline told us".',
        highlightWords: ['were told', 'has been delayed'],
      },
    ],

    commonTraps: [
      {
        wrong: 'The package was arrived this morning.',
        correct: 'The package arrived this morning.',
        nativeReason:
          'Các nội động từ (Intransitive verbs) như "arrive, happen, occur, exist, remain" KHÔNG BAO GIỜ có dạng bị động vì chúng không có tân ngữ phía sau.',
        vietnameseTrap: 'Người Việt nghĩ: Gói hàng "được tới" nên chia bị động "was arrived".',
      },
      {
        wrong: 'Our company is established in 1995.',
        correct: 'Our company was established in 1995.',
        nativeReason: 'Thành lập từ năm 1995 là sự việc quá khứ, to be phải lùi về "was", không thể dùng "is".',
        vietnameseTrap: 'Quên chia thì quá khứ cho to be trong câu bị động.',
      },
    ],

    toeicHacks: {
      targetParts: 'TOEIC Part 5 & Part 6',
      hackTitle: 'Mẹo "Nhìn sau chỗ trống" bắt bài Chủ động / Bị động trong 3 giây',
      hackContent:
        'Khi gặp câu hỏi chia động từ ở Part 5: Hãy nhìn ngay từ ĐỨNG NGAY SAU chỗ trống. Nếu ngay sau chỗ trống là GIỚI TỪ (by, in, at, to, for) hoặc DẤU CHẤM CÂU (tức không có tân ngữ nhận tác động) -> 90% chọn dạng BỊ ĐỘNG (Be + V3/P.P). Nếu sau chỗ trống có một Cụm danh từ làm tân ngữ (a, an, the, our + Noun) -> Chọn CHỦ ĐỘNG.',
      quickSignalWords: ['be + V-ed + preposition', 'must be + V-ed', 'is being + V-ed'],
      ruleOfThumb: 'Sau chỗ trống có Giới từ / Trạng từ -> Bị động (Be + V3); có Tân ngữ danh từ -> Chủ động.',
    },

    quiz: [
      {
        question:
          'The updated corporate security policy will be _____ to all departmental staff members by Friday morning.',
        options: ['distribute', 'distributed', 'distributing', 'distribution'],
        correctAnswer: 1,
        explanation:
          'Sau cấu trúc "will be" và phía sau là giới từ "to all staff" (không có tân ngữ trực tiếp) -> cần thể bị động: "distributed".',
        toeicTip: 'Cấu trúc "will be + V3" cực kỳ phổ biến trong TOEIC.',
      },
      {
        question:
          'Unexpected delays in the shipping schedule _____ because of the international port strike.',
        options: ['occurred', 'were occurred', 'have been occurred', 'occurring'],
        correctAnswer: 0,
        explanation:
          '"Occur" là nội động từ (không bao giờ chia bị động). Chủ ngữ "delays" tự xảy ra do đình công -> dùng chủ động thì quá khứ: "occurred".',
        toeicTip: 'Nhớ kỹ các từ cấm chia bị động: occur, happen, arrive, remain, die.',
      },
    ],
  },
  {
    id: 'passive-causative-have-get',
    categoryId: 'passive-voice',
    title: 'Causative Passive: Have / Get Something Done in the Workplace',
    titleVi: 'Thể nhờ vả bị động: Have / Get Something Done trong công sở',
    subtitle: 'Nói chuẩn như người bản xứ khi bạn không tự tay làm mà thuê, nhờ hoặc yêu cầu ai đó làm.',
    difficulty: 'Advanced Mastery',
    frequency: '★★★★☆',
    tag: 'Giao tiếp lãnh đạo & Ủy quyền',

    nativeMindset: {
      coreIntuition:
        'Trong đời sống và công việc, hiếm khi bạn tự tay sửa xe, tự lập trình toàn bộ phần mềm hay tự ký giấy hải quan. Bạn THUÊ thợ, NHỜ đồng nghiệp hoặc YÊU CẦU phòng ban khác làm việc đó. Người bản xứ có một cấu trúc riêng biệt cho việc này: "Have / Get + vật + V3/P.P".',
      mentalImage:
        'Bạn không cầm cờ-lê sửa xe, bạn chỉ cầm hóa đơn đưa cho thợ. Xe được thợ sửa cho bạn -> "I had my car repaired". Bạn là người chỉ đạo kết quả, thợ là người thực hiện.',
      whyNativesSayThis:
        'Nếu bạn nói "I cut my hair", người bản xứ sẽ tưởng bạn tự cầm kéo đứng trước gương tự cắt tóc mình! Để nói đúng là thợ cắt cho bạn, phải nói: "I got my hair cut".',
      vietnameseMistakeWarning:
        'Người Việt thường dùng "I ask someone to do something" khá dài dòng. Cấu trúc "Have/Get + something + done" vừa gọn gàng vừa chuẩn văn phong công sở chuyên nghiệp.',
    },

    rules: [
      {
        ruleTitle: 'Cấu trúc nhờ vả / ủy thác công việc',
        formula: 'S + have / get + Something (Vật/Công việc) + V3/P.P',
        description: 'Nhấn mạnh việc bạn thu xếp để công việc đó được hoàn thành bởi một bên thứ ba.',
        whenToUse:
          'I need to have this contract reviewed by the legal department before signing.\nWe are getting the office repainted this weekend.',
      },
    ],

    examples: [
      {
        en: 'The project manager needs to have the blueprints verified before construction begins.',
        vi: 'Quản lý dự án cần cho kiểm tra xác thực bản thiết kế trước khi việc thi công bắt đầu.',
        context: 'workplace',
        note: 'Have + the blueprints (vật) + verified (V3) -> Giao cho chuyên gia thẩm định.',
        highlightWords: ['have the blueprints verified'],
      },
      {
        en: 'We should get the broken printer fixed as soon as possible.',
        vi: 'Chúng ta nên cho người sửa cái máy in bị hỏng càng sớm càng tốt.',
        context: 'daily',
        note: 'Get + the printer (vật) + fixed (V3) -> Gọi thợ kỹ thuật vào bảo trì.',
        highlightWords: ['get the broken printer fixed'],
      },
    ],

    commonTraps: [
      {
        wrong: 'I will repair my laptop at the service center.',
        correct: 'I will have my laptop repaired at the service center.',
        nativeReason:
          'Nếu đem ra trung tâm dịch vụ thì thợ sửa chứ không phải bạn tự sửa, phải dùng thể nhờ vả bị động "have my laptop repaired".',
        vietnameseTrap: 'Dịch "Tôi sẽ sửa laptop ở tiệm" thành "I will repair...".',
      },
    ],

    toeicHacks: {
      targetParts: 'TOEIC Part 5 & Part 6',
      hackTitle: 'Nhận diện cấu trúc "Have/Get something done"',
      hackContent:
        'Khi thấy động từ Have hoặc Get đứng trước một danh từ chỉ vật/tài liệu (contract, proposal, machine, document), chỗ trống phía sau 95% là một Phân từ hai (V3/P.P) mang nghĩa bị động.',
      quickSignalWords: ['have + Noun + V3', 'get + Noun + V3', 'to have the [report] reviewed'],
      ruleOfThumb: 'Have/Get + Vật -> Chọn V3/P.P.',
    },

    quiz: [
      {
        question:
          'Before submitting the quarterly budget to the board, Ms. Vance had the financial spreadsheets _____ by an independent accountant.',
        options: ['audit', 'audited', 'auditing', 'to audit'],
        correctAnswer: 1,
        explanation:
          'Cấu trúc nhờ vả bị động: "had + the financial spreadsheets (vật) + AUDITED (V3)". Nghĩa là bà Vance thuê/nhờ kế toán viên độc lập kiểm toán bảng tính.',
        toeicTip: 'Have + Something + V3/ed là bẫy ngữ pháp Part 5 ăn điểm cao.',
      },
    ],
  },
];
