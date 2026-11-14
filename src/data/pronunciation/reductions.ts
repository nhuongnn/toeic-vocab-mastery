import { PronunciationTopic } from '@/types/pronunciation';

export const reductionsTopics: PronunciationTopic[] = [
  {
    id: 'reductions-gonna-wanna-gotta',
    categoryId: 'reductions',
    title: 'Everyday Speech Reductions: Gonna, Wanna, Gotta, Lemme',
    titleVi: 'Rút gọn cửa miệng đời thường: Gonna, Wanna, Gotta, Lemme, Kinda',
    subtitle: 'Hơn 90% các cuộc hội thoại đời thường của người bản xứ không dùng dạng nguyên bản đầy đủ.',
    tag: 'Rút gọn cửa miệng',
    frequency: '★★★★★',
    difficulty: 'Cốt lõi',

    nativeIntuition: {
      coreMindset:
        'Người bản xứ KHÔNG cố tình "nói tiếng lóng" để làm khó người nước ngoài. Việc nói "going to" thành "gonna" hay "want to" thành "wanna" là một hiện tượng tiến hóa ngôn ngữ tự nhiên: khi các cụm từ này được lặp đi lặp lại hàng triệu lần mỗi ngày, các cơ quan phát âm tự động cắt ngắn các rào cản âm thanh để luồng hơi đi nhanh nhất có thể.',
      physicalFeeling:
        'Cảm giác âm thanh bật ra từ vòm họng một cách trơn tru, không có sự khựng lại giữa "to" và động từ chính.',
      whyVietnameseStruggle:
        'Sách giáo khoa truyền thống thường chỉ dạy "going to", "want to". Khi ra đời thực nghe người Tây nói "I gotta go" hoặc "Lemme see", người học bị đơ mất vài giây để suy nghĩ xem đó là từ gì.',
    },

    rules: [
      {
        ruleTitle: 'Bảng rút gọn 5 cụm từ quyền lực nhất hàng ngày',
        description:
          '- **Going to + V** ➔ **Gonna** (I am gonna call you)\n- **Want to + V** ➔ **Wanna** (I wanna ask something)\n- **Got to / Have got to + V** ➔ **Gotta** (I gotta go now)\n- **Let me + V** ➔ **Lemme** (Lemme know if you need help)\n- **Kind of + Adj/V** ➔ **Kinda** (It is kinda late)\n- **Out of + N** ➔ **Outta** (We are outta coffee)',
        simpleFormula: 'Going to ➔ Gonna | Want to ➔ Wanna | Got to ➔ Gotta | Let me ➔ Lemme',
        mouthShapeTip: 'Đừng ngập ngừng! Phát âm như một từ duy nhất có trọng âm rơi vào âm tiết đầu.',
      },
    ],

    comparisonPairs: [
      {
        label: 'Tôi sẽ làm việc đó ngay bây giờ',
        slowText: 'I am going to do it now',
        fastConnectedText: 'I am gonna do it now',
        phoneticSpelling: 'Im GUN-nə do-it now',
        vi: 'Tôi sẽ làm việc đó ngay bây giờ',
        explanation: '"going to" biến thành "gonna" /' + 'ɡən.ə/.',
      },
      {
        label: 'Bạn có muốn tham gia cùng chúng tôi không?',
        slowText: 'Do you want to join us?',
        fastConnectedText: 'Do you wanna join us?',
        phoneticSpelling: 'D-ya WAN-nə joy-nəs?',
        vi: 'Bạn có muốn đi cùng bọn tôi không?',
        explanation: '"want to" biến thành "wanna" /' + 'wɑːn.ə/.',
      },
      {
        label: 'Tôi phải đi bây giờ',
        slowText: 'I have got to go now',
        fastConnectedText: 'I gotta go now',
        phoneticSpelling: 'I GAH-də go now',
        vi: 'Tôi phải đi ngay đây',
        explanation: '"got to" biến thành "gotta" /' + 'ɡɑː.t̬ə/ (âm t biến thành flap t).',
      },
      {
        label: 'Để tôi kiểm tra lại',
        slowText: 'Let me check that for you',
        fastConnectedText: 'Lemme check that for you',
        phoneticSpelling: 'LEM-mee check thæt f-ya',
        vi: 'Để tôi kiểm tra giúp bạn nhé',
        explanation: 'Âm /t/ ở "let" rụng mất, nối thẳng thành "lemme".',
      },
    ],

    dailyDialogue: [
      {
        speaker: 'Mark',
        en: 'Hey, I am gonna grab some lunch. Wanna come?',
        connectedPhonetic: 'Hey, Im GUN-nə grab some lunch. WAN-nə come?',
        vi: 'Này, tôi chuẩn bị đi ăn trưa đây. Đi cùng không?',
      },
      {
        speaker: 'Jenny',
        en: 'I gotta finish this report first. Lemme meet you there in ten minutes.',
        connectedPhonetic: 'I GAH-də finish this report first. LEM-mee mee-cha there in ten minutes.',
        vi: 'Tôi phải xong cái báo cáo này trước đã. Để tôi gặp bạn ở đó sau 10 phút nhé.',
      },
    ],

    listeningHacks: {
      hackTitle: 'Phân biệt "Gonna" khi nào ĐƯỢC DÙNG và khi nào KHÔNG',
      hackContent:
        'LƯU Ý QUAN TRỌNG: "Going to" CHỈ biến thành "gonna" khi đằng sau nó là MỘT ĐỘNG TỪ (Ví dụ: going to BUY ➔ gonna buy). Nếu đằng sau là MỘT ĐỊA DANH / NƠI CHỐN (Ví dụ: I am going to the office), người bản xứ KHÔNG BAO GIỜ nói "I am gonna the office"!',
      howToCatchIt: 'Chỉ nghe thấy Gonna khi sau nó là hành động làm gì đó.',
      toeicApplication: 'Trong TOEIC Listening Part 3: Người nói thường dùng Gonna/Wanna trong các câu thoại thân mật ở văn phòng.',
    },

    quiz: [
      {
        audioPrompt: 'I wanna show you our new product demo.',
        question: 'Cụm từ "I wanna show you" trong câu trên bắt nguồn từ dạng viết đầy đủ nào?',
        options: ['I want to show you', 'I won\'t show you', 'I wanted to show you', 'I went to show you'],
        correctAnswer: 0,
        explanation: '"Wanna" là dạng rút gọn tự nhiên của "Want to".',
        listeningTip: 'Wanna xuất hiện với tần suất cực lớn trong các bộ phim và giao tiếp thường ngày.',
      },
    ],
  },
  {
    id: 'reductions-modals-past',
    categoryId: 'reductions',
    title: 'Modal Reductions in the Past: Coulda, Shoulda, Woulda',
    titleVi: 'Rút gọn Động từ khuyết thiếu: Coulda, Shoulda, Woulda, Whaddya',
    subtitle: 'Bí kíp nghe hiểu các câu hối tiếc và câu hỏi Wh- khi người bản xứ nói nhanh như gió.',
    tag: 'Rút gọn nâng cao',
    frequency: '★★★★☆',
    difficulty: 'Phổ biến',

    nativeIntuition: {
      coreMindset:
        'Cấu trúc "Could have + V3" (lẽ ra có thể), "Should have + V3" (lẽ ra nên), "Would have + V3" (lẽ ra sẽ) rất dài dòng. Từ "have" bị ép chỉ còn đúng âm Schwa "ə". Kết quả là:\n- Could have ➔ "Coulda"\n- Should have ➔ "Shoulda"\n- Would have ➔ "Woulda"\n- Must have ➔ "Musta"',
      physicalFeeling:
        'Bạn chỉ phát âm một từ 2 âm tiết duy nhất có đuôi "-đờ" hoặc "-đə" nhẹ tênh.',
      whyVietnameseStruggle:
        'Người Việt chờ đợi nghe thấy từ "have", nhưng từ "have" đã biến mất hoàn toàn và dính vào từ đi trước thành "coulda". Khi không nghe thấy "have", người học không nhận ra đây là cấu trúc quá khứ!',
    },

    rules: [
      {
        ruleTitle: 'Công thức rút gọn Modal Verbs + Have',
        description:
          '- **Could have** ➔ **Coulda** /ˈkʊd.ə/\n- **Should have** ➔ **Shoulda** /ˈʃʊd.ə/\n- **Would have** ➔ **Woulda** /ˈwʊd.ə/\n- **Must have** ➔ **Musta** /ˈmʌs.tə/',
        simpleFormula: 'Modal + have ➔ Đọc đuôi "-a" (/ə/)',
        mouthShapeTip: 'Phát âm dứt khoát như một từ 2 âm tiết bình thường.',
      },
      {
        ruleTitle: 'Công thức rút gọn câu hỏi Wh-: What do you ➔ Whaddya',
        description:
          '- **What do you** ➔ **Whaddya** /ˈwʌd.jə/ (Whaddya think?)\n- **What did you** ➔ **Whadjə** (Whadjə do yesterday?)\n- **What are you** ➔ **Whatcha** (Whatcha doing?)',
        simpleFormula: 'What do you ➔ Whaddya | What are you ➔ Whatcha',
        mouthShapeTip: 'Âm T của what kết hợp với âm Y của you tạo thành âm /dʒ/ hoặc /tʃ/.',
      },
    ],

    comparisonPairs: [
      {
        label: 'Lẽ ra bạn nên gọi cho tôi',
        slowText: 'You should have called me',
        fastConnectedText: 'You shoulda called me',
        phoneticSpelling: 'You SHOUL-də call-me',
        vi: 'Lẽ ra bạn nên gọi cho tôi chứ',
        explanation: '"should have" đọc thành "shoulda" /ˈʃʊd.ə/.',
      },
      {
        label: 'Tôi lẽ ra đã giúp bạn rồi',
        slowText: 'I would have helped you',
        fastConnectedText: 'I woulda helped you',
        phoneticSpelling: 'I WOUL-də help-cha',
        vi: 'Tôi lẽ ra đã giúp bạn rồi (nếu tôi biết)',
        explanation: '"would have" đọc thành "woulda" /ˈwʊd.ə/.',
      },
      {
        label: 'Bạn nghĩ sao về việc này?',
        slowText: 'What do you think about this?',
        fastConnectedText: 'Whaddya think about this?',
        phoneticSpelling: 'WHAD-yə think ə-bout this?',
        vi: 'Bạn thấy việc này thế nào?',
        explanation: '"What do you" rút gọn thành "Whaddya".',
      },
    ],

    dailyDialogue: [
      {
        speaker: 'Colleague',
        en: 'Whaddya think about the new office policy?',
        connectedPhonetic: 'WHAD-yə think ə-bout th-new office policy?',
        vi: 'Bạn nghĩ thế nào về quy định văn phòng mới?',
      },
      {
        speaker: 'You',
        en: 'Management shoulda consulted the staff first.',
        connectedPhonetic: 'Management SHOUL-də consulted th-staff first.',
        vi: 'Ban quản lý lẽ ra nên tham khảo ý kiến nhân viên trước.',
      },
    ],

    listeningHacks: {
      hackTitle: 'Bắt mạch câu hỏi "Whaddya" trong giao tiếp',
      hackContent:
        'Khi nghe người bản xứ mở đầu câu bằng "Whaddya say?", "Whaddya want?", "Whaddya think?", hãy nhận diện ngay đó là câu hỏi thân mật "What do you...".',
      howToCatchIt: 'Âm "Whad-dya" vang lên ở đầu câu hỏi là dấu hiệu của What do you.',
      toeicApplication: 'Part 3 & 4 thường có câu hỏi: "What does the speaker think?" &rarr; Trong audio nhân vật nói "Whaddya think?".',
    },

    quiz: [
      {
        audioPrompt: 'We coulda finished early if the server had not crashed.',
        question: 'Từ "coulda" trong câu trên có nghĩa là gì?',
        options: ['Could have', 'Could not', 'Could always', 'Could also'],
        correctAnswer: 0,
        explanation: '"Coulda" là dạng rút gọn tự nhiên của "Could have".',
        listeningTip: 'Cụm thành ngữ tiếng Anh nổi tiếng: "Coulda, woulda, shoulda" dùng để chỉ sự tiếc nuối vô ích.',
      },
    ],
  },
];
