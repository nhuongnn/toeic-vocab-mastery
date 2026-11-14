import { GrammarLesson } from '@/types/grammar';

export const tensesLessons: GrammarLesson[] = [
  {
    id: 'tense-present-perfect-vs-past-simple',
    categoryId: 'tenses',
    title: 'Present Perfect vs. Past Simple: The Bridge vs. The Closed Chapter',
    titleVi: 'Hiện tại hoàn thành vs. Quá khứ đơn: Cầu nối hiện tại hay Chuyện đã khép lại',
    subtitle: 'Nắm vững 2 thì chiếm hơn 70% các câu hỏi về thời gian trong TOEIC và email công sở.',
    difficulty: 'Core TOEIC',
    frequency: '★★★★★',
    tag: 'Thời gian thực chiến',

    nativeMindset: {
      coreIntuition:
        'Người bản xứ không bao giờ ngồi nhẩm "hành động xảy ra trong quá khứ kéo dài đến hiện tại...". Trực giác của họ rất đơn giản: Nếu sự việc ĐÃ ĐÓNG NẮP và chỉ gắn với một mốc giờ/ngày cụ thể trong quá khứ (yesterday, in 2023, last week), họ dùng Past Simple. Nếu sự việc đó tạo ra một HỆ QUẢ hoặc KINH NGHIỆM vẫn đang tác động trực tiếp tới giây phút họ đang nói (I have lost my key -> giờ chưa vào được nhà), họ dùng Present Perfect.',
      mentalImage:
        'Past Simple giống như một bức ảnh chụp kỷ yếu đã đóng khung treo trên tường (chuyện đã xong). Present Perfect giống như một sợi dây thừng nối từ quá khứ kéo thẳng đến bàn làm việc hiện tại của bạn.',
      whyNativesSayThis:
        'Khi nói với sếp "I sent the report" (Em gửi rồi lúc 2h chiều), bạn chỉ báo cáo hành động. Khi nói "I have already sent the report" (Em đã gửi báo cáo rồi sếp nhé, sếp kiểm tra hộp thư đi), bạn nhấn mạnh kết quả công việc đã hoàn thành sẵn sàng cho sếp xem.',
      vietnameseMistakeWarning:
        'Người Việt dịch từ "đã" trong tiếng Việt cho mọi hành động quá khứ. Cứ thấy "đã" là vội chia Past Simple hoặc Present Perfect bừa bãi. Nhớ rằng: Tiếng Anh không quan tâm chữ "đã", họ quan tâm hành động đó CÓ CÒN ẢNH HƯỞNG ĐẾN HIỆN TẠI KHÔNG.',
    },

    rules: [
      {
        ruleTitle: 'Quá khứ đơn (Past Simple): Sự việc đã khép lại ở quá khứ',
        formula: 'S + V-ed / V2 + mốc thời gian quá khứ (yesterday, ago, last..., in 2020)',
        description:
          'Dùng khi bạn muốn kể lại một sự việc, hành động độc lập đã kết thúc hoàn toàn trong quá khứ.',
        whenToUse: 'Báo cáo sự việc cụ thể, có mốc thời gian rõ ràng (The shipment arrived yesterday).',
        whenToAvoid: 'Không dùng khi muốn khoe thành tích, kinh nghiệm hoặc tình trạng hiện tại.',
      },
      {
        ruleTitle: 'Hiện tại hoàn thành (Present Perfect): Kết quả & Trải nghiệm tới nay',
        formula: 'S + have / has + V3/P.P + (since / for / already / yet / recently)',
        description:
          'Dùng khi kết quả hành động quan trọng hơn thời điểm xảy ra, hoặc hành động bắt đầu từ quá khứ vẫn tiếp diễn đến giờ.',
        whenToUse:
          'Báo cáo tiến độ (We have achieved our sales target), kinh nghiệm (I have worked here for 5 years), sự thay đổi gần đây (Prices have risen).',
        whenToAvoid: 'Tuyệt đối KHÔNG đi kèm mốc thời gian đã chết như "yesterday", "last year", "2 hours ago".',
      },
    ],

    examples: [
      {
        en: 'The marketing team launched the campaign last Friday.',
        vi: 'Đội ngũ tiếp thị đã khởi chạy chiến dịch vào thứ Sáu tuần trước.',
        context: 'workplace',
        note: 'Có "last Friday" (thời điểm cụ thể đã qua) -> bắt buộc dùng Past Simple.',
        highlightWords: ['launched', 'last Friday'],
      },
      {
        en: 'We have already launched three successful campaigns this quarter.',
        vi: 'Chúng tôi đã triển khai thành công ba chiến dịch trong quý này.',
        context: 'workplace',
        note: '"this quarter" vẫn chưa kết thúc, nhấn mạnh kết quả đạt được tới thời điểm hiện tại.',
        highlightWords: ['have already launched', 'this quarter'],
      },
      {
        en: 'I lost my badge, so I need a temporary pass.',
        vi: 'Tôi đánh mất thẻ đeo rồi, nên tôi cần một thẻ tạm.',
        context: 'daily',
        note: 'Trong giao tiếp thường ngày kiểu Mỹ, họ có thể dùng "I lost" hoặc "I have lost" linh hoạt khi ngữ cảnh rõ ràng.',
        highlightWords: ['lost', 'temporary pass'],
      },
      {
        en: 'Mr. Henderson has served as our Chief Financial Officer since 2018.',
        vi: 'Ông Henderson đã giữ cương vị Giám đốc Tài chính từ năm 2018 đến nay.',
        context: 'toeic',
        note: 'Cụm "since 2018" báo hiệu hành động bắt đầu từ 2018 và hiện vẫn đang tiếp diễn.',
        highlightWords: ['has served', 'since 2018'],
      },
    ],

    commonTraps: [
      {
        wrong: 'I have received the contract yesterday afternoon.',
        correct: 'I received the contract yesterday afternoon.',
        nativeReason:
          'Có từ chỉ thời gian quá khứ xác định ("yesterday afternoon") thì tuyệt đối không được dùng Present Perfect.',
        vietnameseTrap: 'Người Việt nghĩ: "Đã nhận" thì dùng thì hoàn thành cho sang, dẫn đến sai ngữ pháp cơ bản.',
      },
      {
        wrong: 'Over the past decade, our company expanded into five new markets.',
        correct: 'Over the past decade, our company has expanded into five new markets.',
        nativeReason:
          '"Over the past / In the last + khoảng thời gian" nghĩa là xuyên suốt từ quá khứ kéo dài đến tận ngày hôm nay, đòi hỏi Present Perfect.',
        vietnameseTrap: 'Thấy chữ "past / last" tưởng là thì quá khứ đơn.',
      },
    ],

    toeicHacks: {
      targetParts: 'TOEIC Part 5 & Part 6',
      hackTitle: 'Mẹo "Soi mốc thời gian" bắt gọn đáp án trong 3 giây',
      hackContent:
        'Nhìn lướt câu hỏi: Nếu thấy "yesterday, ago, last month, previously, initially" -> Chọn ngay V-ed/V2. Nếu thấy "since + mốc, for + khoảng, recently, lately, over the past/last X years, already, yet" -> 99% chọn Have/Has + V3.',
      quickSignalWords: [
        'since',
        'for + duration',
        'over the past...',
        'in recent months',
        'already',
        'yet',
        'yesterday',
        'ago',
      ],
      ruleOfThumb: 'Thời điểm chết = Quá khứ đơn; Cầu nối kéo dài đến nay = Hiện tại hoàn thành.',
    },

    quiz: [
      {
        question:
          'Ms. Jenkins _____ as the regional marketing director for over eight years before transferring to the Tokyo branch last month.',
        options: ['has served', 'served', 'serves', 'serving'],
        correctAnswer: 1,
        explanation:
          'Dù có "for over eight years", nhưng hành động này đã kết thúc hoàn toàn trước khi chuyển sang Tokyo "last month" -> Sự việc đã khép lại trong quá khứ -> Dùng "served".',
        toeicTip: 'Cảnh giác: Không phải cứ thấy "for + khoảng thời gian" là auto chọn have/has + V3, hãy xem hành động còn kéo dài đến nay không!',
      },
      {
        question:
          'Over the last three quarters, Apex Logistics _____ operating costs by approximately 14 percent.',
        options: ['reduce', 'reduced', 'has reduced', 'was reducing'],
        correctAnswer: 2,
        explanation:
          'Cụm "Over the last three quarters" (xuyên suốt 3 quý vừa qua cho đến nay) là dấu hiệu vàng của thì Hiện tại hoàn thành -> "has reduced".',
        toeicTip: 'Gặp "Over/In/During the past/last + khoảng thời gian" -> Khoanh ngay Have/Has + V3.',
      },
    ],
  },
  {
    id: 'tense-present-continuous-future',
    categoryId: 'tenses',
    title: 'Present Continuous for Definite Plans: The Calendar Mindset',
    titleVi: 'Hiện tại tiếp diễn chỉ Kế hoạch Tương lai: Tư duy Lịch hẹn đã chốt',
    subtitle: 'Tại sao người bản xứ thích dùng "I am meeting" hơn là "I will meet" trong công việc?',
    difficulty: 'Foundation',
    frequency: '★★★★★',
    tag: 'Giao tiếp công sở',

    nativeMindset: {
      coreIntuition:
        'Trong sách giáo khoa, Hiện tại tiếp diễn (Be + V-ing) thường chỉ được dạy là "đang làm gì ngay lúc này". Nhưng trong đời sống thực tế và công sở của người bản xứ, hơn 50% thời lượng thì này được dùng để nói về TƯƠNG LAI CÓ LỊCH HẸN TRƯỚC (Arranged Future).',
      mentalImage:
        'Hãy tưởng tượng bạn đã mở ứng dụng Google Calendar ra, điền tên khách hàng, chốt phòng họp lúc 3h chiều mai. Cuộc hẹn đó ĐÃ ĐƯỢC LÊN KHUÔN trong hiện tại, nên người bản xứ nói "I am meeting the client tomorrow at 3 PM".',
      whyNativesSayThis:
        '"I will meet" nghe như một quyết định vừa nảy ra tại chỗ hoặc lời hứa chung chung. Nhưng "I am meeting" truyền tải thông điệp: "Mọi việc đã thu xếp xong xuôi, chỉ việc thực hiện thôi".',
      vietnameseMistakeWarning:
        'Người Việt hễ thấy "ngày mai, tuần tới" là auto dùng "will". Điều này khiến câu nói trong công việc nghe thiếu sự chuẩn bị và kém chuyên nghiệp.',
    },

    rules: [
      {
        ruleTitle: 'Hiện tại tiếp diễn cho Lịch trình đã thu xếp (Arrangements)',
        formula: 'S + am / is / are + V-ing + thời gian tương lai',
        description: 'Dùng khi hành động trong tương lai đã có sự chuẩn bị hoặc xác nhận của hai bên.',
        whenToUse: 'Các cuộc họp, chuyến bay, sự kiện công ty có giờ giấc đã thống nhất.',
        whenToAvoid: 'Không dùng cho những dự đoán thời tiết hoặc dự cảm tương lai (với dự đoán, dùng will / be going to).',
      },
      {
        ruleTitle: 'So sánh 3 cách nói tương lai',
        formula: 'Will (Tức thời/Hứa hẹn) vs Be going to (Dự định) vs Be V-ing (Đã chốt lịch)',
        description:
          '- "I will help you" (Tôi sẽ giúp bạn - quyết định tức thì)\n- "I am going to buy a car" (Tôi dự định mua xe - ý định trong đầu)\n- "I am flying to Singapore tomorrow" (Mai tôi bay đi Singapore - vé đã mua trong tay).',
        whenToUse: 'Dùng Be V-ing khi có ngày giờ, vé tàu xe, hoặc lịch hẹn cụ thể.',
      },
    ],

    examples: [
      {
        en: 'The CEO is visiting our branch office next Wednesday.',
        vi: 'Tổng giám đốc sẽ tới thăm chi nhánh của chúng ta vào thứ Tư tới.',
        context: 'workplace',
        note: 'Chuyến thăm đã được lên lịch trình trong lịch công tác của ban lãnh đạo.',
        highlightWords: ['is visiting', 'next Wednesday'],
      },
      {
        en: 'We are launching the new mobile app next month.',
        vi: 'Chúng tôi sẽ ra mắt ứng dụng di động mới vào tháng tới.',
        context: 'workplace',
        note: 'Kế hoạch phát hành đã qua giai đoạn chuẩn bị, lịch ra mắt đã ấn định.',
        highlightWords: ['are launching', 'next month'],
      },
      {
        en: 'Are you doing anything special this weekend?',
        vi: 'Cuối tuần này bạn có kế hoạch gì đặc biệt chưa?',
        context: 'daily',
        note: 'Câu hỏi cửa miệng khi người bản xứ muốn rủ ai đó đi chơi hoặc hỏi lịch trình.',
        highlightWords: ['Are you doing', 'this weekend'],
      },
    ],

    commonTraps: [
      {
        wrong: 'Look at the calendar, we will sign the merger contract on Friday.',
        correct: 'Look at the calendar, we are signing the merger contract on Friday.',
        nativeReason:
          'Khi đã có lịch hẹn rõ ràng trên calendar, người bản xứ luôn dùng "are signing" để thể hiện tính chắc chắn và chuẩn bị.',
        vietnameseTrap: 'Thói quen lạm dụng "will" cho mọi kế hoạch tương lai.',
      },
    ],

    toeicHacks: {
      targetParts: 'TOEIC Part 3, 4 & Part 7',
      hackTitle: 'Bắt mạch lịch trình trong hội thoại Part 3 & 4',
      hackContent:
        'Trong Part 3 (Hội thoại) và Part 4 (Độc thoại thông báo), khi người nói dùng "I am leaving early today" hoặc "The auditor is arriving at 10:00", câu hỏi thường hỏi "What will the speaker do next?". Đáp án đúng chính là hành động được chia ở thì hiện tại tiếp diễn đó.',
      quickSignalWords: ['am/is/are + V-ing', 'tomorrow at [time]', 'next week', 'this afternoon'],
      ruleOfThumb: 'Be + V-ing + thời gian tương lai = Kế hoạch 100% đã chốt.',
    },

    quiz: [
      {
        question:
          'According to the conference schedule, Dr. Patel _____ the keynote address tomorrow at 9:00 AM.',
        options: ['delivers', 'is delivering', 'delivered', 'has delivered'],
        correctAnswer: 1,
        explanation:
          'Sự kiện diễn ra vào "tomorrow at 9:00 AM" đã có trong lịch trình hội nghị -> dùng thì Hiện tại tiếp diễn "is delivering" mang nghĩa tương lai đã thu xếp.',
        toeicTip: 'Trong TOEIC, Present Continuous thường xuyên xuất hiện ở các thông báo lịch làm việc.',
      },
    ],
  },
  {
    id: 'tense-past-perfect-anchor',
    categoryId: 'tenses',
    title: 'Past Perfect: The Timeline Anchor (Before Another Past Action)',
    titleVi: 'Quá khứ hoàn thành: Mỏ neo thời gian trước một mốc quá khứ',
    subtitle: 'Chỉ dùng thì này khi có ÍT NHẤT HAI mốc quá khứ cần so sánh thứ tự trước - sau.',
    difficulty: 'Core TOEIC',
    frequency: '★★★★☆',
    tag: 'Tư duy mốc thời gian',

    nativeMindset: {
      coreIntuition:
        'Nhiều bạn học cảm thấy thì Quá khứ hoàn thành (Had + V3) rất khó nhớ. Nhưng với người bản xứ, thì này CHỈ CÓ DUY NHẤT MỘT NHIỆM VỤ: Làm cọc tiêu chỉ ra hành động nào XẢY RA TRƯỚC một hành động khác trong quá khứ. Nếu trong câu chỉ có một hành động quá khứ đơn lẻ, người bản xứ KHÔNG BAO GIỜ dùng Had + V3.',
      mentalImage:
        'Tưởng tượng một cuộn phim quá khứ. Bạn đang xem cảnh lúc 9h sáng (Past Simple). Bỗng nhiên nhân vật nhớ lại hoặc kể về chuyện đã xảy ra lúc 8h sáng (Past Perfect) -> Had + V3 chính là đoạn "Flashback" (hồi tưởng lùi lại một bước).',
      whyNativesSayThis:
        'Khi nói "By the time I arrived at the station, the train had left", người nghe lập tức hiểu: Tàu chạy trước, rồi tôi mới tới (kết quả là lỡ tàu).',
      vietnameseMistakeWarning:
        'Cứ nghĩ "quá khứ của quá khứ" là cái gì đó rất xa xôi từ nhiều năm trước. Không phải! Chuyện xảy ra cách đây 5 phút vẫn dùng Past Perfect nếu nó xảy ra trước một chuyện cách đây 2 phút.',
    },

    rules: [
      {
        ruleTitle: 'Cấu trúc mỏ neo "By the time / Before / When"',
        formula: 'By the time + S + V-past, S + HAD + V3/P.P',
        description: 'Hành động xảy ra trước dùng Had + V3, hành động xảy ra sau dùng Past Simple.',
        whenToUse: 'Dùng khi muốn làm rõ thứ tự trình tự sự việc trong báo cáo sự cố hoặc biên bản công việc.',
      },
    ],

    examples: [
      {
        en: 'By the time the technician arrived, the staff had already solved the server issue.',
        vi: 'Vào lúc kỹ thuật viên đến nơi, nhân viên đã tự giải quyết xong sự cố máy chủ rồi.',
        context: 'workplace',
        note: 'Sự cố được giải quyết xong trước (had already solved) rồi kỹ thuật viên mới đến sau (arrived).',
        highlightWords: ['arrived', 'had already solved'],
      },
      {
        en: 'She had reviewed all the financial statements before the meeting started.',
        vi: 'Cô ấy đã xem xét toàn bộ báo cáo tài chính trước khi cuộc họp bắt đầu.',
        context: 'workplace',
        note: 'Xem xét báo cáo (had reviewed) trước, cuộc họp bắt đầu (started) sau.',
        highlightWords: ['had reviewed', 'before', 'started'],
      },
    ],

    commonTraps: [
      {
        wrong: 'In 2015, our company had opened its first overseas branch.',
        correct: 'In 2015, our company opened its first overseas branch.',
        nativeReason:
          'Chỉ có một mốc thời gian quá khứ độc lập ("In 2015") thì chỉ dùng Quá khứ đơn, không được dùng Quá khứ hoàn thành.',
        vietnameseTrap: 'Nghĩ rằng năm 2015 là quá khứ rất xa nên chia Had + V3.',
      },
    ],

    toeicHacks: {
      targetParts: 'TOEIC Part 5',
      hackTitle: 'Mẹo "By the time" 100% ra đáp án',
      hackContent:
        'Trong đề thi TOEIC Part 5, hễ thấy cấu trúc "By the time + S + V-ed" ở vế này, thì vế còn lại 99% bắt buộc phải là "HAD + V3". Ngược lại, nếu "By the time + S + V-s/es" (hiện tại), vế kia sẽ là "WILL HAVE + V3" (tương lai hoàn thành).',
      quickSignalWords: ['By the time + Past', 'had already + V3', 'before + Past Simple'],
      ruleOfThumb: 'By the time quá khứ -> chọn Had + V3; By the time hiện tại -> chọn Will have + V3.',
    },

    quiz: [
      {
        question:
          'By the time the board of directors convened for the annual summit, the legal team _____ the draft agreement.',
        options: ['finalizes', 'had finalized', 'is finalizing', 'has finalized'],
        correctAnswer: 1,
        explanation:
          'Có vế "By the time the board convened (quá khứ đơn)" -> vế còn lại biểu thị hành động xảy ra trước đó -> chọn "had finalized".',
        toeicTip: 'Cặp đôi vàng TOEIC: By the time + V2/ed, vế kia Had + V3.',
      },
    ],
  },
];
