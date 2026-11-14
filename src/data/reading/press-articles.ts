import { ReadingLesson } from '@/types/reading';

export const pressArticleLesson: ReadingLesson = {
  id: 'reading-press-articles',
  categoryId: 'press-articles',
  title: 'Press Releases & Business Articles',
  titleVi: 'Bắt Trọn Tin Doanh Nghiệp & Thông Cáo Báo Chí',
  subtitle: 'Kỹ thuật Kim tự tháp ngược (Inverted Pyramid): Bắt tin M&A, bổ nhiệm nhân sự và kết quả kinh doanh.',
  difficulty: 'Advanced Mastery',
  frequency: '★★★★☆',
  tag: 'TOEIC Part 7 Đoạn Đọc Khó',
  estimatedTime: '4 phút đọc hiểu',

  nativeMindset: {
    coreIntuition:
      'Bài báo kinh tế hoặc thông cáo báo chí (Press Release) luôn tuân thủ nguyên tắc "Kim tự tháp ngược" (Inverted Pyramid) của ngành truyền thông: Thông tin giá trị nhất, tin chấn động nhất nằm ngay ở ĐOẠN 1 (Lead Paragraph). Các đoạn sau chỉ là lời trích dẫn (Quotes) xã giao của Tổng giám đốc và thông tin nền lịch sử công ty.',
    readingSpeedSecret:
      'Đọc tiêu đề (Headline) + Đoạn 1 để trả lời ngay câu hỏi "What is the article mainly about?" hoặc "What did the company announce?". Khi gặp tên người lạ hoặc chức danh, chỉ cần đọc lướt qua xem người đó là Sếp cũ (Predecessor) hay Sếp mới (Successor).',
    vietnameseMistakeWarning:
      'Thí sinh thường bị choáng ngợp bởi từ vựng tài chính cao cấp (acquisition, conglomerate, lucrative, fiscal quarter). Đừng sợ! Hãy tập trung vào các động từ quen thuộc: buy, merge, launch, appoint, expand.',
  },

  attackStrategy: {
    step1: 'Nghiền ngẫm Dòng tít (Headline): Dòng tít là phiên bản tóm tắt cực ngắn của toàn bài.',
    step2: 'Đoạn 1 (The Lead): Tìm công thức 5W1H (Who - Doanh nghiệp nào? What - Mua lại hay ra mắt gì? When - Khi nào công bố? Why - Mục tiêu chiến lược là gì?).',
    step3: 'Đối chiếu các trích dẫn (Direct Quotes): Thường chứa câu hỏi suy luận "What does Mr. X imply when he says...?" hoặc dự báo tương lai của ban lãnh đạo.',
    proTip: 'Cảnh giác với mốc thời gian so sánh: Doanh thu của "fiscal year 2023" (năm ngoái) khác hoàn toàn với mục tiêu "projected forecast for 2025" (tương lai)!',
  },

  goldenParaphrases: [
    {
      original: 'step down / resign',
      paraphrased: 'vacate the position / leave the post',
      contextVi: 'Từ chức hoặc rời khỏi vị trí lãnh đạo',
    },
    {
      original: 'succeed [someone]',
      paraphrased: 'take over from / replace / become the successor',
      contextVi: 'Kế nhiệm hoặc thay thế người tiền nhiệm',
    },
    {
      original: 'unveil / roll out',
      paraphrased: 'introduce / launch / make public',
      contextVi: 'Trình làng sản phẩm mới hoặc dịch vụ công nghệ mới',
    },
    {
      original: 'acquire / take over',
      paraphrased: 'buy out / purchase / absorb',
      contextVi: 'Mua lại hoặc sáp nhập một công ty khác',
    },
    {
      original: 'unprecedented growth',
      paraphrased: 'record-breaking increase / historic expansion',
      contextVi: 'Sự tăng trưởng kỷ lục chưa từng có trong lịch sử công ty',
    },
  ],

  primaryPassage: {
    type: 'Press Release',
    title: 'Thông cáo báo chí Tập đoàn Công nghệ NexaTech',
    header: {
      from: 'NexaTech Innovations Inc., Media Relations Department',
      date: 'FOR IMMEDIATE RELEASE - November 12, Austin, TX',
      subject: 'NexaTech Finalizes Acquisition of GreenVolt Energy and Names New VP',
    },
    content: `AUSTIN, TX — NexaTech Innovations Inc., a global leader in commercial cloud computing and automation software, announced today the successful acquisition of GreenVolt Energy, a pioneering renewable battery startup based in Denver, for an estimated $340 million in an all-cash transaction.

The strategic acquisition enables NexaTech to integrate GreenVolt's proprietary high-density solid-state battery technology into its next-generation modular data centers, drastically slashing power consumption and carbon emissions by up to 35% across its server hubs.

In conjunction with the deal, NexaTech's Board of Directors announced that Dr. Elena Rostova, formerly Chief Technology Officer at GreenVolt, will assume the newly established role of Vice President of Sustainable Infrastructure at NexaTech. Dr. Rostova succeeds Julian Thorne, who is retiring after twenty-two years of distinguished service at NexaTech.

"Integrating GreenVolt's cutting-edge energy storage systems directly into our cloud architecture represents a massive leap toward our goal of achieving net-zero emissions by 2030," stated Marcus Sterling, CEO of NexaTech. "Dr. Rostova's profound expertise in solid-state chemistry will be instrumental in scaling our eco-friendly enterprise operations."

NexaTech's shares rose 4.2% on the New York Stock Exchange following the morning announcement. The company plans to host an investor conference call on Thursday at 2:00 PM Eastern Time to discuss fourth-quarter financial projections.`,
    vietnameseTranslation: `AUSTIN, TX — NexaTech Innovations Inc., tập đoàn hàng đầu thế giới về phần mềm tự động hóa và điện toán đám mây thương mại, hôm nay đã công bố việc mua lại thành công GreenVolt Energy, một công ty khởi nghiệp tiên phong về pin năng lượng tái tạo có trụ sở tại Denver, với giá trị ước tính 340 triệu USD trong một giao dịch hoàn toàn bằng tiền mặt.

Thương vụ thâu tóm chiến lược này cho phép NexaTech tích hợp công nghệ pin thể rắn mật độ cao độc quyền của GreenVolt vào các trung tâm dữ liệu mô-đun thế hệ mới, giúp cắt giảm mạnh mẽ mức tiêu thụ năng lượng và lượng khí thải carbon lên tới 35% trên toàn bộ các cụm máy chủ của tập đoàn.

Cùng với thương vụ này, Hội đồng Quản trị của NexaTech thông báo rằng Tiến sĩ Elena Rostova, cựu Giám đốc Công nghệ tại GreenVolt, sẽ đảm nhận vị trí mới được thành lập: Phó Chủ tịch Cơ sở Hạ tầng Bền vững tại NexaTech. Tiến sĩ Rostova sẽ kế nhiệm ông Julian Thorne, người sắp nghỉ hưu sau 22 năm cống hiến xuất sắc tại NexaTech.

"Việc tích hợp các hệ thống lưu trữ năng lượng tiên tiến của GreenVolt trực tiếp vào kiến trúc đám mây của chúng tôi thể hiện một bước nhảy vọt hướng tới mục tiêu đạt mức phát thải ròng bằng 0 vào năm 2030," Marcus Sterling, Tổng Giám đốc của NexaTech tuyên bố. "Chuyên môn sâu rộng của Tiến sĩ Rostova về hóa học thể rắn sẽ đóng vai trò then chốt trong việc mở rộng các hoạt động doanh nghiệp thân thiện với môi trường của chúng tôi."

Cổ phiếu của NexaTech đã tăng 4,2% trên Sàn Giao dịch Chứng khoán New York sau thông báo sáng nay. Công ty dự kiến tổ chức một cuộc gọi hội nghị cho các nhà đầu tư vào Thứ Năm lúc 2:00 chiều theo Giờ Miền Đông để thảo luận về các dự báo tài chính quý 4.`,
    keyHighlights: [
      {
        text: 'successful acquisition of GreenVolt Energy ... for $340 million',
        type: 'purpose',
        note: 'Tin chính: Mua lại GreenVolt Energy với giá 340 triệu USD tiền mặt.',
      },
      {
        text: 'slashing power consumption and carbon emissions by up to 35%',
        type: 'signal',
        note: 'Mục đích mua: cắt giảm 35% điện năng và khí thải.',
      },
      {
        text: 'Dr. Elena Rostova ... succeeds Julian Thorne, who is retiring',
        type: 'paraphrase',
        note: 'Tiến sĩ Rostova kế nhiệm Julian Thorne (ông Thorne nghỉ hưu).',
      },
      {
        text: 'host an investor conference call on Thursday at 2:00 PM',
        type: 'action',
        note: 'Sự kiện tiếp theo: Cuộc họp với nhà đầu tư vào thứ Năm.',
      },
    ],
  },

  commonTraps: [
    {
      trapName: 'Bẫy Người kế nhiệm vs Người tiền nhiệm (Successor Trap)',
      trapDescription: 'Đề hỏi: "Who will assume the role of Vice President?". Bẫy đưa ra Julian Thorne (người về hưu) hoặc Marcus Sterling (CEO).',
      howToAvoid: 'Nhìn chữ "succeeds". Người đứng trước "succeeds" là người mới nhận chức: "Dr. Elena Rostova succeeds Julian Thorne".',
      examplePassageSnippet: 'Dr. Elena Rostova ... succeeds Julian Thorne, who is retiring',
      distractorOption: 'Julian Thorne',
      correctOption: 'Dr. Elena Rostova',
    },
    {
      trapName: 'Bẫy Số liệu cổ phiếu vs Tỷ lệ cắt giảm phát thải',
      trapDescription: 'Đề hỏi: "By how much does NexaTech expect to reduce power consumption?". Bẫy đưa ra số 4.2% (tỷ lệ tăng giá cổ phiếu).',
      howToAvoid: 'Đọc kỹ danh từ đi kèm: 4.2% = stock rise; 35% = energy and emissions reduction.',
      examplePassageSnippet: 'slashing power consumption and carbon emissions by up to 35%',
      distractorOption: '4.2 percent',
      correctOption: 'Up to 35 percent',
    },
  ],

  quiz: [
    {
      question: 'What is the main subject of the press release?',
      questionType: 'main-idea',
      options: [
        'A corporate acquisition and executive leadership appointment',
        'A dispute between two rival battery manufacturing companies',
        'The opening of a new cloud software headquarters in Denver',
        'Julian Thorne’s nomination for an international technology award',
      ],
      correctAnswer: 0,
      explanation: 'Đoạn đầu bài và tiêu đề nêu bật 2 sự kiện: mua lại GreenVolt Energy (corporate acquisition) và bổ nhiệm Dr. Elena Rostova làm Phó Chủ tịch mới (executive leadership appointment).',
      clueSnippet: 'Finalizes Acquisition of GreenVolt Energy and Names New VP',
      paraphraseUsed: 'Acquisition and names VP = corporate acquisition and executive leadership appointment',
    },
    {
      question: 'Why did NexaTech purchase GreenVolt Energy?',
      questionType: 'detail',
      options: [
        'To relocate its corporate headquarters to Colorado',
        'To lower power usage and emissions across its data centers',
        'To launch consumer mobile smartphones by next month',
        'To settle an intellectual property lawsuit out of court',
      ],
      correctAnswer: 1,
      explanation: 'Đoạn 2 nêu rõ thương vụ giúp: "drastically slashing power consumption and carbon emissions by up to 35% across its server hubs". "Slashing" đồng nghĩa với "lowering / reducing".',
      clueSnippet: 'slashing power consumption and carbon emissions by up to 35%',
      paraphraseUsed: 'slashing power consumption = lower power usage',
    },
    {
      question: 'What is stated about Julian Thorne?',
      questionType: 'detail',
      options: [
        'He previously served as Chief Technology Officer at GreenVolt',
        'He is stepping down from his role after over two decades of service',
        'He will host Thursday’s investor conference call',
        'He invested $340 million of personal funds into NexaTech',
      ],
      correctAnswer: 1,
      explanation: 'Đoạn 3 viết: "Julian Thorne, who is retiring after twenty-two years of distinguished service at NexaTech". 22 năm = "over two decades", và "retiring" = "stepping down".',
      clueSnippet: 'Julian Thorne, who is retiring after twenty-two years of distinguished service',
      paraphraseUsed: 'retiring after 22 years = stepping down after over two decades',
    },
  ],
};
