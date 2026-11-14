import { PronunciationTopic } from '@/types/pronunciation';

export const rhythmStressTopics: PronunciationTopic[] = [
  {
    id: 'rhythm-content-vs-function',
    categoryId: 'rhythm-stress',
    title: 'Content vs. Function Words: The Musical Beats of English',
    titleVi: 'Từ mang nghĩa vs. Từ chức năng: Bản nhạc nhịp điệu của tiếng Anh',
    subtitle: 'Tại sao người bản xứ nói câu dài 10 từ mà bạn chỉ nghe rõ đúng 3 từ?',
    tag: 'Nhịp điệu câu',
    frequency: '★★★★★',
    difficulty: 'Cốt lõi',

    nativeIntuition: {
      coreMindset:
        'Tiếng Việt là ngôn ngữ đơn âm đều nhịp (Syllable-timed) — mỗi từ phát ra chiếm một khoảng thời gian bằng nhau (1 - 2 - 3 - 4). Nhưng tiếng Anh là ngôn ngữ NHỊP ĐIỆU TRỌNG ÂM (Stress-timed) — khoảng cách giữa các âm nhấn luôn đều nhau bất kể ở giữa có bao nhiêu từ phụ!\nNgười bản xứ chỉ nhấn TO, DÀI và RÕ vào các **Từ mang thông tin chính (Content Words)**: Danh từ, Động từ chính, Tính từ, Trạng từ. Còn các **Từ chức năng (Function Words)**: a, an, the, to, for, and, of, can, was bị ép lại, nuốt nhỏ xíu như tiếng thì thầm lướt qua.',
      physicalFeeling:
        'Giống như nhịp đập của quả tim hoặc nhịp trống: Bùm ... Bùm ... Bùm! Bạn chỉ nghe thấy tiếng trống đập ở các từ khóa, các từ phụ chỉ là tiếng chớp mắt xen kẽ.',
      whyVietnameseStruggle:
        'Người Việt cố gắng nghe và phát âm 100% các từ trong câu to và rõ như nhau ("I ... WANT ... TO ... GO ... TO ... THE ... STORE"). Khi nghe người Tây nói, não người Việt đợi nghe chữ "to, the" nhưng người Tây lướt qua quá nhanh làm ta bị hụt hơi và bỏ lỡ từ khóa.',
    },

    rules: [
      {
        ruleTitle: 'Phân biệt 2 nhóm từ trong mọi câu tiếng Anh',
        description:
          '- **CONTENT WORDS (Nhấn to, ngân dài):** Noun (dog, car), Main Verb (go, buy), Adjective (big, fast), Adverb (quickly, never).\n- **FUNCTION WORDS (Đọc nhẹ, lướt siêu nhanh):** Pronouns (he, she), Prepositions (in, on, at, to), Articles (a, an, the), Conjunctions (and, but), Auxiliary verbs (is, was, can, have).',
        simpleFormula: 'Chỉ nhấn: AI? LÀM GÌ? NHƯ THẾ NÀO? | Các từ nối còn lại đọc lướt',
        mouthShapeTip: 'Mở rộng khẩu hình ở từ khóa. Thu hẹp khẩu hình và hạ giọng ở từ phụ.',
      },
    ],

    comparisonPairs: [
      {
        label: 'Tôi muốn đi tới cửa hàng',
        slowText: 'I want to go to the store',
        fastConnectedText: 'I WANT to GO to the STORE',
        phoneticSpelling: 'ai WANT t-GO t-th-STORE',
        vi: 'Tôi muốn đi đến cửa hàng',
        explanation: 'Chỉ có 3 từ được nhấn to: WANT, GO, STORE. Cụm "to go to the" lướt qua chỉ trong 0.3 giây!',
      },
      {
        label: 'Chúng tôi có thể gặp nhau lúc 2 giờ',
        slowText: 'We can meet at two',
        fastConnectedText: 'We can MEET at TWO',
        phoneticSpelling: 'w-kn MEET ət TWO',
        vi: 'Chúng ta có thể gặp nhau lúc 2 giờ',
        explanation: '"can" bị ép thành "kən", "at" thành "ət". Tai chỉ nghe rõ "MEET" và "TWO".',
      },
      {
        label: 'Cô ấy đang tìm một công việc mới',
        slowText: 'She is looking for a new job',
        fastConnectedText: 'She is LOOKING for a NEW JOB',
        phoneticSpelling: 'sh-z LOOK-ing f-r-ə NEW JOB',
        vi: 'Cô ấy đang tìm một công việc mới',
        explanation: '"looking", "new", "job" được bật to rõ. "for a" biến thành "f-r-ə".',
      },
    ],

    dailyDialogue: [
      {
        speaker: 'Boss',
        en: 'Did you SEND the EMAIL to the CLIENT?',
        connectedPhonetic: 'Did-jə SEND th-EMAIL t-th-CLIENT?',
        vi: 'Bạn đã gửi email cho khách hàng chưa?',
      },
      {
        speaker: 'Staff',
        en: 'Yes, I SENT it an HOUR ago.',
        connectedPhonetic: 'Yes, I SENT-it ən-HOUR ə-go.',
        vi: 'Dạ rồi, tôi đã gửi cách đây một tiếng rồi.',
      },
    ],

    listeningHacks: {
      hackTitle: 'Chiến thuật "Bỏ qua từ rác, chỉ tóm từ khóa"',
      hackContent:
        'Khi nghe tiếng Anh ngoài đời hoặc trong TOEIC Listening Part 3 & 4: TUYỆT ĐỐI KHÔNG CỐ DỊCH TỪNG CHỮ a, an, the, to, at, for. Chỉ cần tóm được 3-4 từ được nhấn to nhất trong câu là bạn đã hiểu 95% ý nghĩa người nói muốn truyền tải!',
      howToCatchIt: 'Hãy tập trung tai vào những âm thanh to nhất, dài nhất và có cao độ cao nhất trong câu.',
      toeicApplication: 'Trong câu hỏi Part 2: "When will the report be finalized?" &rarr; Tai chỉ cần bắt: "When ... report ... finalized".',
    },

    quiz: [
      {
        audioPrompt: 'The manager will call you back as soon as possible.',
        question: 'Trong câu trên, những từ nào sau đây mang trọng âm và được người bản xứ nói to, rõ nhất?',
        options: ['manager, call, back, possible', 'the, will, you, as', 'will, you, back, as', 'the, call, as, soon'],
        correctAnswer: 0,
        explanation: 'Đây là các Content Words (manager - danh từ, call - động từ, back - trạng từ, possible - tính từ) mang thông điệp cốt lõi.',
        listeningTip: 'Nắm được Content Words là chìa khóa nghe hiểu 90% tiếng Anh giao tiếp.',
      },
    ],
  },
  {
    id: 'rhythm-schwa-sound',
    categoryId: 'rhythm-stress',
    title: 'The Magic of Schwa /ə/: The Laziest and Most Common Sound',
    titleVi: 'Phép màu của âm Schwa /ə/: Âm lười biếng và quyền lực nhất tiếng Anh',
    subtitle: 'Chiếm hơn 30% tổng số nguyên âm trong tiếng Anh giao tiếp hàng ngày!',
    tag: 'Âm lười Schwa',
    frequency: '★★★★★',
    difficulty: 'Cốt lõi',

    nativeIntuition: {
      coreMindset:
        'Tại sao từ "About" không đọc là "A-bao", "Police" không đọc là "Pô-lít", "Computer" không đọc là "Com-piu-tơ"?\nBởi vì âm tiết không mang trọng âm trong tiếng Anh luôn bị người bản xứ ép xẹp xuống thành âm **SCHWA /ə/** (âm "ơ" siêu ngắn và thả lỏng hoàn toàn). Đây là biểu tượng tối thượng của việc tiết kiệm năng lượng cơ miệng.',
      physicalFeeling:
        'Bạn không cần làm gì cả! Thả lỏng toàn bộ cơ mặt, mở họng hờ hững, phát ra một âm thanh nhẹ như tiếng thở dài ngắn "ơ". Không căng môi, không nhếch mép, không gồng lưỡi.',
      whyVietnameseStruggle:
        'Người Việt nhìn mặt chữ tiếng Anh có chữ gì là đọc y hệt chữ đó: thấy "O" đọc là "ô", thấy "A" đọc là "a". Kết quả là phát âm từ nào cũng cứng đơ, sai trọng âm và nghe rất mệt mỏi.',
    },

    rules: [
      {
        ruleTitle: 'Bất kỳ nguyên âm nào (a, e, i, o, u) đều có thể biến thành Schwa /ə/',
        description:
          'Khi một nguyên âm nằm ở âm tiết KHÔNG MANG TRỌNG ÂM, 85% khả năng nó sẽ biến thành âm /ə/ nhẹ nhàng.',
        simpleFormula:
          '- "About" ➔ /əˈbaʊt/ (không đọc a-baut)\n- "Police" ➔ /pəˈliːs/ (không đọc pô-lít)\n- "Support" ➔ /səˈpɔːrt/ (không đọc súp-pót)\n- "Banana" ➔ /bəˈnæn.ə/ (chỉ nhấn ở nán)',
        mouthShapeTip: 'Giữ miệng ở trạng thái trung tính hoàn toàn, như lúc bạn đang buồn ngủ.',
      },
    ],

    comparisonPairs: [
      {
        label: 'Cảnh sát',
        slowText: 'Police',
        fastConnectedText: 'Police (Natural)',
        phoneticSpelling: 'pə - LEES',
        vi: 'Cảnh sát',
        explanation: 'Âm "po" không có trọng âm nên biến thành "pə" lướt nhẹ, trọng âm dồn vào "LEES".',
      },
      {
        label: 'Về điều gì đó',
        slowText: 'About',
        fastConnectedText: 'About (Natural)',
        phoneticSpelling: 'ə - BOUT',
        vi: 'Về / Khoảng',
        explanation: 'Chữ "A" đầu tiên chỉ là âm schwa /ə/ cực ngắn.',
      },
      {
        label: 'Hôm nay',
        slowText: 'Today',
        fastConnectedText: 'Today (Natural)',
        phoneticSpelling: 'tə - DAY',
        vi: 'Hôm nay',
        explanation: 'Người bản xứ không đọc "tu-đây", họ đọc "tə-DAY".',
      },
    ],

    dailyDialogue: [
      {
        speaker: 'Colleague',
        en: 'Can you support the new manager today?',
        connectedPhonetic: 'Kən ya sə-PORT th-new MAN-ə-dzer tə-DAY?',
        vi: 'Bạn có thể hỗ trợ vị quản lý mới hôm nay không?',
      },
      {
        speaker: 'You',
        en: 'Sure, I will discuss it with the director.',
        connectedPhonetic: 'Sure, I will d-SKUSS it with th-də-REK-ter.',
        vi: 'Được chứ, tôi sẽ thảo luận việc đó với giám đốc.',
      },
    ],

    listeningHacks: {
      hackTitle: 'Cách nhận diện Schwa trong đề thi TOEIC',
      hackContent:
        'Trong Part 1 (Mô tả tranh) và Part 2 (Hỏi đáp), các từ như "pedestrian", "appliance", "container", "umbrella" đều có âm đầu là Schwa /ə/. Đừng chờ nghe thấy âm rõ rệt, hãy nhận diện âm bật chính sau Schwa.',
      howToCatchIt: 'Âm Schwa chỉ lướt qua dưới 0.1 giây để lấy đà nhảy sang âm tiết chính có trọng âm.',
      toeicApplication: 'Nghe "pə-DES-tree-ən" biết ngay là "pedestrian" (người đi bộ).',
    },

    quiz: [
      {
        audioPrompt: 'The company will provide support for the project.',
        question: 'Trong câu trên, từ "support" được phát âm chuẩn tự nhiên như thế nào?',
        options: ['sə-PORT', 'SOOP-port', 'sah-port', 'sew-port'],
        correctAnswer: 0,
        explanation: 'Âm "su" không mang trọng âm nên biến thành schwa "sə", trọng âm rơi vào "PORT".',
        listeningTip: 'Schwa là linh hồn của sự tự nhiên và thư thái trong phát âm tiếng Anh.',
      },
    ],
  },
];
