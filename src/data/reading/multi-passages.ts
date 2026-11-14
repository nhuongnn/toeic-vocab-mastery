import { ReadingLesson } from '@/types/reading';

export const multiPassageLesson: ReadingLesson = {
  id: 'reading-multi-passages',
  categoryId: 'multi-passages',
  title: 'Cross-Referencing in Multi-Passages',
  titleVi: 'Kỹ Thuật Nối Dữ Liệu Bài Đọc Kép & Ba Đoạn',
  subtitle: 'Tuyệt chiêu xử lý 2 câu hỏi suy luận chéo (Cross-text questions) không bao giờ có đáp án ở một đoạn duy nhất.',
  difficulty: 'Advanced Mastery',
  frequency: '★★★★★',
  tag: 'TOEIC Part 7 Chinh Phục 700-900',
  estimatedTime: '4 phút đọc hiểu',

  nativeMindset: {
    coreIntuition:
      'Trong đề thi TOEIC Part 7, từ câu 176 đến 200 luôn là bài đọc kép (Double passages) hoặc ba đoạn (Triple passages). Quy luật thép: 1 đoạn văn bản chỉ là "Đề bài" (Lịch trình, Bảng giá, Quy định), còn đoạn văn thứ hai là "Thực tế diễn ra" (Email phản hồi, Hóa đơn thực tế, Đánh giá của khách hàng). Câu hỏi suy luận chéo luôn yêu cầu bạn BẮC CẦU giữa 2 dữ kiện.',
    readingSpeedSecret:
      'Đừng cố đọc hết cả 2 đoạn văn rồi mới làm bài! Hãy đọc câu hỏi trước. Nếu câu hỏi nhắc đến tên người hoặc chi tiết ở văn bản 2 nhưng hỏi về giá trị ở văn bản 1, bạn biết ngay đó là câu hỏi nối dữ liệu (Cross-reference question). Hãy dùng từ khóa ở đoạn 2 làm mồi câu quay lại đoạn 1 dò tìm.',
    vietnameseMistakeWarning:
      'Nhiều bạn chỉ tìm thông tin trong 1 đoạn văn rồi vội vã kết luận "Đề thi không cho dữ liệu này". Thực chất, bạn phải ghép Mảnh ghép A (Đoạn 1) với Mảnh ghép B (Đoạn 2) mới ra được bức tranh hoàn chỉnh.',
  },

  attackStrategy: {
    step1: 'Xác định quan hệ giữa 2 văn bản: Văn bản 1 (Lịch trình sự kiện) & Văn bản 2 (Email gửi sau sự kiện phản ánh ý kiến).',
    step2: 'Xác định từ khóa neo (Anchor Keyword): Tìm Tên diễn giả, Mã phòng, Số hiệu chuyến bay hoặc Tên món đồ được nhắc đến ở email văn bản 2.',
    step3: 'Chiếu ngược về bảng biểu ở văn bản 1: Tìm dòng tương ứng với từ khóa neo để suy ra phòng họp nào, giá tiền bao nhiêu, hoặc ngày nào.',
    proTip: 'Dấu hiệu nhận biết câu hỏi chéo: Câu hỏi thường có dạng "In the email, which presentation did Mr. Davis likely attend?" hoặc "What discount was applied to Ms. Lee\'s invoice?".',
  },

  goldenParaphrases: [
    {
      original: 'accommodate the overflow crowd',
      paraphrased: 'provide enough seats for unexpected attendees',
      contextVi: 'Sắp xếp đủ chỗ cho lượng người tham gia vượt dự kiến',
    },
    {
      original: 'session was moved / relocated',
      paraphrased: 'room assignment was changed',
      contextVi: 'Phòng hội thảo bị thay đổi sang phòng khác',
    },
    {
      original: 'feedback / critique / evaluation',
      paraphrased: 'attendee review / appraisal / comments',
      contextVi: 'Đánh giá, nhận xét đóng góp sau buổi thuyết trình',
    },
    {
      original: 'modify / alter / amend',
      paraphrased: 'make adjustments / update the schedule',
      contextVi: 'Điều chỉnh hoặc sửa đổi lịch trình',
    },
    {
      original: 'complimentary refreshment voucher',
      paraphrased: 'coupon for free snacks and drinks',
      contextVi: 'Phiếu quà tặng nước uống và bánh ngọt miễn phí',
    },
  ],

  primaryPassage: {
    type: 'Program Schedule',
    title: 'VĂN BẢN 1: Lịch Trình Hội Thảo Đổi Mới Công Nghệ FinTech 2024',
    header: {
      from: 'FinTech Innovators Alliance - Metro Convention Center',
      date: 'Friday, September 20',
      subject: 'Afternoon Breakout Sessions Schedule',
    },
    content: `METRO CONVENTION CENTER — AFTERNOON BREAKOUT SCHEDULE
Session Times: 2:00 PM – 3:30 PM

Track A: Room 101 (Seating Capacity: 60)
Topic: "Decentralized Ledger Architecture for Retail Banking"
Speaker: Dr. Aris Thorne (Chief Cryptographer, BlockStream Security)

Track B: Room 104 (Seating Capacity: 80)
Topic: "Automated Fraud Detection via Deep Learning Models"
Speaker: Sandra Lin (VP of Data Analytics, CyberGuard AI)

Track C: Grand Ballroom West (Seating Capacity: 250)
Topic: "Next-Gen Cross-Border Payments: Compliance & Speed"
Speaker: Tariq Mansoor (Director of Regulatory Affairs, GlobalPay Network)

Track D: Executive Suite 2 (Seating Capacity: 40)
Topic: "Venture Capital Fundraising for FinTech Founders"
Speaker: Beatrice Dupont (Managing Partner, BlueHarbor Ventures)

* Notice: Due to an audio wiring failure in Room 104 this morning, all sessions originally scheduled for that room will be reassigned to Hall C across the courtyard.`,
    vietnameseTranslation: `TRUNG TÂM HỘI NGHỊ METRO — LỊCH TRÌNH CÁC PHIÊN THẢO LUẬN BUỔI CHIỀU
Thời gian phiên họp: 2:00 PM – 3:30 PM

Chuyên đề A: Phòng 101 (Sức chứa: 60 người)
Chủ đề: "Kiến trúc Sổ cái Phi tập trung cho Ngân hàng Bán lẻ"
Diễn giả: Tiến sĩ Aris Thorne (Chuyên gia Mật mã trưởng, BlockStream Security)

Chuyên đề B: Phòng 104 (Sức chứa: 80 người)
Chủ đề: "Tự động Phát hiện Gian lận qua Mô hình Học sâu"
Diễn giả: Sandra Lin (Phó Chủ tịch Phân tích Dữ liệu, CyberGuard AI)

Chuyên đề C: Đại sảnh Grand Ballroom West (Sức chứa: 250 người)
Chủ đề: "Thanh toán Xuyên biên giới Thế hệ mới: Tuân thủ & Tốc độ"
Diễn giả: Tariq Mansoor (Giám đốc Pháp chế, GlobalPay Network)

Chuyên đề D: Phòng Điều hành Executive Suite 2 (Sức chứa: 40 người)
Chủ đề: "Gọi vốn Đầu tư Mạo hiểm cho Nhà sáng lập FinTech"
Diễn giả: Beatrice Dupont (Giám đốc Điều hành, BlueHarbor Ventures)

* Lưu ý: Do sự cố dây âm thanh tại Phòng 104 sáng nay, tất cả các phiên ban đầu dự kiến tại phòng này sẽ được chuyển sang Hall C phía bên kia sân trong.`,
    keyHighlights: [
      {
        text: 'Sandra Lin ... Room 104',
        type: 'signal',
        note: 'Sandra Lin ban đầu được xếp ở Phòng 104.',
      },
      {
        text: 'Room 104 ... reassigned to Hall C across the courtyard',
        type: 'paraphrase',
        note: 'Ghi chú mấu chốt: Phòng 104 bị đổi địa điểm sang Hall C do hỏng loa đài.',
      },
      {
        text: 'Tariq Mansoor ... Grand Ballroom West (Capacity: 250)',
        type: 'purpose',
        note: 'Phòng họp có sức chứa lớn nhất (250 người) do Tariq Mansoor diễn thuyết.',
      },
    ],
  },

  secondaryPassage: {
    type: 'Email',
    title: 'VĂN BẢN 2: Email Phản Hồi Của Người Tham Dự Hội Thảo',
    header: {
      from: 'Kenji Takahashi <k.takahashi@tokyobancorp.jp>',
      to: 'Conference Secretariat <helpdesk@fintechinnovators.org>',
      date: 'Saturday, September 21, 10:14 AM',
      subject: 'Feedback regarding Friday afternoon session and lost laptop charger',
    },
    content: `Dear Organizing Committee,

I attended the FinTech 2024 conference yesterday and found the event immensely productive. In particular, the presentation delivered by Sandra Lin regarding cybersecurity and fraudulent transaction identification was exceptional.

However, I would like to suggest improving directional signage for venue modifications. Because her talk had to be relocated to a different hall across the courtyard, many international attendees including myself initially waited outside the locked door of our original room, causing us to miss the opening fifteen minutes of her presentation.

On a separate note, I inadvertently left my black Lenovo laptop charger under my seat in Hall C when the session adjourned. Could you please check with the facility housekeeping team to see if it was turned in to the lost-and-found desk?

Sincerely,
Kenji Takahashi
Senior Systems Architect, Tokyo Bancorp`,
    vietnameseTranslation: `Kính gửi Ban Tổ Chức,

Tôi đã tham dự hội nghị FinTech 2024 ngày hôm qua và nhận thấy sự kiện này vô cùng hữu ích. Đặc biệt, bài thuyết trình của cô Sandra Lin về an ninh mạng và nhận diện giao dịch gian lận rất xuất sắc.

Tuy nhiên, tôi muốn góp ý về việc cải thiện biển chỉ dẫn khi có sự thay đổi địa điểm. Bởi vì buổi nói chuyện của cô ấy phải chuyển sang một hội trường khác bên kia sân trong, nhiều người tham dự quốc tế bao gồm cả tôi ban đầu đã phải đứng chờ bên ngoài cánh cửa khóa của căn phòng ban đầu, khiến chúng tôi bỏ lỡ 15 phút mở đầu bài thuyết trình.

Ở một vấn đề khác, tôi đã vô tình để quên cục sạc máy tính xách tay Lenovo màu đen dưới ghế của mình tại Hall C khi phiên họp kết thúc. Các bạn có thể kiểm tra giúp tôi với đội ngũ tạp vụ của tòa nhà xem món đồ có được nộp vào bàn đồ thất lạc hay không?

Trân trọng,
Kenji Takahashi
Kiến trúc sư Hệ thống Cao cấp, Tokyo Bancorp`,
    keyHighlights: [
      {
        text: 'presentation delivered by Sandra Lin regarding cybersecurity',
        type: 'signal',
        note: 'Từ khóa neo: Kenji Takahashi nghe bài thuyết trình của Sandra Lin.',
      },
      {
        text: 'waited outside the locked door of our original room',
        type: 'purpose',
        note: 'Bằng chứng nối: Kenji bị đứng chờ ở phòng ban đầu (tức Phòng 104 ở Văn bản 1).',
      },
      {
        text: 'left my black Lenovo laptop charger ... in Hall C',
        type: 'action',
        note: 'Địa điểm bỏ quên đồ: Hall C (nơi chuyển đến của Phòng 104).',
      },
    ],
  },

  commonTraps: [
    {
      trapName: 'Bẫy Câu hỏi chéo 2 văn bản (Cross-text Location Trap)',
      trapDescription: 'Đề hỏi: "In which room was Mr. Takahashi initially waiting before the session started?". Văn bản 2 không nhắc trực tiếp tên phòng mà chỉ nói "outside the locked door of our original room".',
      howToAvoid: 'Bắc cầu: Kenji nghe Sandra Lin -> Tìm Sandra Lin ở Văn bản 1 -> Phòng 104.',
      examplePassageSnippet: 'Sandra Lin ... Room 104 (Passage 1) + presentation delivered by Sandra Lin ... original room (Passage 2)',
      distractorOption: 'Hall C',
      correctOption: 'Room 104',
    },
    {
      trapName: 'Bẫy Lý do đổi phòng (Cause of Relocation)',
      trapDescription: 'Đề hỏi lý do dời địa điểm hội thảo. Bẫy đưa ra: quá đông người tham dự, phòng 104 quá bé, diễn giả đến muộn.',
      howToAvoid: 'Đọc kỹ dòng ghi chú chân trang của Văn bản 1: "wiring failure" = sự cố kỹ thuật về âm thanh / điện.',
      examplePassageSnippet: 'Due to an audio wiring failure in Room 104',
      distractorOption: 'Because the session had too many attendees for the space',
      correctOption: 'Because of sound equipment issues',
    },
  ],

  quiz: [
    {
      question: 'Which topic was Mr. Takahashi most interested in at the conference?',
      questionType: 'inference',
      options: [
        'Venture capital fundraising for startup founders',
        'Cross-border payment compliance standards',
        'Artificial intelligence in fraudulent transaction detection',
        'Decentralized ledger retail banking protocols',
      ],
      correctAnswer: 2,
      explanation: 'Trong Email (Văn bản 2), Kenji Takahashi khen ngợi: "the presentation delivered by Sandra Lin regarding cybersecurity and fraudulent transaction identification was exceptional". Đối chiếu với Văn bản 1, chủ đề của Sandra Lin là "Automated Fraud Detection via Deep Learning Models".',
      clueSnippet: 'Sandra Lin regarding cybersecurity and fraudulent transaction identification',
      paraphraseUsed: 'Fraudulent transaction identification = Fraud detection via deep learning',
    },
    {
      question: 'Where was Mr. Takahashi’s session actually held?',
      questionType: 'detail',
      options: [
        'Room 101',
        'Grand Ballroom West',
        'Executive Suite 2',
        'Hall C',
      ],
      correctAnswer: 3,
      explanation: 'Theo ghi chú của Văn bản 1, phiên họp của Phòng 104 được dời sang Hall C do hỏng dây âm thanh. Trong Email (Văn bản 2), Kenji cũng xác nhận đã nghe tại "Hall C" nơi ông để quên sạc máy tính.',
      clueSnippet: 'all sessions originally scheduled for that room will be reassigned to Hall C',
      paraphraseUsed: 'reassigned to Hall C = actually held in Hall C',
    },
    {
      question: 'Why did Mr. Takahashi miss the first 15 minutes of the lecture?',
      questionType: 'detail',
      options: [
        'His flight from Tokyo arrived behind schedule',
        'He was waiting at the original venue due to insufficient signage',
        'He lost his conference identification badge in the courtyard',
        'The speaker started earlier than the published program time',
      ],
      correctAnswer: 1,
      explanation: 'Đoạn 2 của Email chỉ rõ: Kenji góp ý cải thiện biển chỉ dẫn vì "relocated to a different hall across the courtyard, many international attendees including myself initially waited outside the locked door of our original room, causing us to miss the opening fifteen minutes".',
      clueSnippet: 'initially waited outside the locked door of our original room, causing us to miss the opening fifteen minutes',
      paraphraseUsed: 'waited outside original room due to lack of signage = waiting at original venue due to insufficient signage',
    },
  ],
};
