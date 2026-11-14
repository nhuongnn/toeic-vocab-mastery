import { PronunciationTopic } from '@/types/pronunciation';

export const linkingSoundsTopics: PronunciationTopic[] = [
  {
    id: 'linking-consonant-to-vowel',
    categoryId: 'linking-sounds',
    title: 'Consonant-to-Vowel Linking: The Secret to Smooth Speech',
    titleVi: 'Nối Phụ âm sang Nguyên âm: Chìa khóa vàng để hiểu người bản xứ nói nhanh',
    subtitle: 'Tại sao bạn nghe thành 1 từ lạ hoắc trong khi thực ra họ đang nói 3 từ cực kỳ quen thuộc?',
    tag: 'Nối âm cốt lõi',
    frequency: '★★★★★',
    difficulty: 'Cốt lõi',

    nativeIntuition: {
      coreMindset:
        'Cơ miệng của con người có xu hướng sinh học tự nhiên là "tiết kiệm năng lượng" (lazy tongue). Khi nói, việc dừng hơi lại giữa mỗi từ sẽ làm tốn rất nhiều sức của thanh quản và cơ hoành. Vì vậy, khi một từ kết thúc bằng một Phụ âm và từ tiếp theo bắt đầu bằng một Nguyên âm, người bản xứ xem nguyên âm phía sau như một "nam châm" hút phụ âm phía trước qua luôn!',
      physicalFeeling:
        'Bạn không bao giờ cảm thấy có khe hở hay khoảng nghỉ ở giữa. Cảm giác như bạn đang lướt một ván trượt tuyết liền mạch từ từ này sang từ khác.',
      whyVietnameseStruggle:
        'Tiếng Việt là ngôn ngữ đơn âm tiết độc lập (mỗi tiếng phát ra là một khối vuông vức, tách rời: "Tôi - đi - làm"). Người Việt quen thói quen ngắt hơi sau từng từ tiếng Anh. Khi nghe người bản xứ trượt âm phụ âm sang nguyên âm, não bộ người Việt cố tìm từ vựng theo kiểu "từng chữ rời", dẫn đến việc nghe như tiếng người ngoài hành tinh!',
    },

    rules: [
      {
        ruleTitle: 'Quy tắc "Nam châm hút âm" (Phụ âm cuối + Nguyên âm đầu)',
        description:
          'Khi từ 1 kết thúc bằng Phụ âm (t, k, p, d, s, m, n, l, v...) và từ 2 bắt đầu bằng Nguyên âm (a, e, i, o, u), hãy ghép phụ âm cuối làm PHỤ ÂM ĐẦU của từ tiếp theo.',
        simpleFormula: '[Từ 1 kết thúc bằng Phụ âm] + [Từ 2 bắt đầu bằng Nguyên âm] ➔ Đọc dính liền',
        mouthShapeTip:
          'Đừng dừng hơi! Giữ khẩu hình của phụ âm cuối và đẩy thẳng luồng hơi vào nguyên âm tiếp theo mà không khép họng lại.',
      },
    ],

    comparisonPairs: [
      {
        label: 'Nhấc điện thoại lên',
        slowText: 'Pick it up',
        fastConnectedText: 'Pick it up',
        phoneticSpelling: 'pi - ki - tup',
        vi: 'Nhặt nó lên / Nhấc máy lên',
        explanation: 'Âm /k/ ở "pick" nối sang "it" thành "ki". Âm /t/ ở "it" nối sang "up" thành "tup".',
      },
      {
        label: 'Giữ máy một chút',
        slowText: 'Hold on a second',
        fastConnectedText: 'Hold on a second',
        phoneticSpelling: 'hol - do - nơ - second',
        vi: 'Chờ một chút nhé',
        explanation: 'Âm /d/ ở "hold" nối sang "on" thành "don". Âm /n/ ở "on" nối sang "a" thành "nơ".',
      },
      {
        label: 'Làm thủ tục nhận phòng',
        slowText: 'Check in at eight',
        fastConnectedText: 'Check in at eight',
        phoneticSpelling: 'che - ki - nơ - teight',
        vi: 'Nhận phòng lúc 8 giờ',
        explanation: 'Âm /k/ ở "check" dính vào "in", âm /n/ ở "in" dính vào "at", âm /t/ ở "at" dính vào "eight".',
      },
      {
        label: 'Tắt đèn đi',
        slowText: 'Turn it off',
        fastConnectedText: 'Turn it off',
        phoneticSpelling: 'tur - ni - toff',
        vi: 'Tắt nó đi',
        explanation: 'Âm /n/ dính vào "it", âm /t/ dính vào "off".',
      },
    ],

    dailyDialogue: [
      {
        speaker: 'Alex',
        en: 'Can I have an apple and an orange?',
        connectedPhonetic: 'Cai - nai - hæ - vən - næp-pl - ən - dən - nor-ange?',
        vi: 'Cho tôi một quả táo và một quả cam được không?',
      },
      {
        speaker: 'Clerk',
        en: 'Sure, take it all for five dollars.',
        connectedPhonetic: 'Sure, tay - ki - tall for five dollars.',
        vi: 'Được chứ, lấy tất cả giá 5 đô nhé.',
      },
    ],

    listeningHacks: {
      hackTitle: 'Cách nghe lùi để bắt đúng từ (Reverse Parsing)',
      hackContent:
        'Khi nghe thấy một từ lạ tai bắt đầu bằng phụ âm bất thường (ví dụ bạn nghe thấy "nơ" hoặc "tup"), hãy TÁCH PHỤ ÂM ĐẦU ĐÓ TRẢ LẠI cho từ đứng trước nó! \nVí dụ: Nghe thấy "kee-pi-tin" ➔ Trả /t/ về trước thành "in", trả /p/ về trước thành "keep" ➔ "Keep it in"!',
      howToCatchIt: 'Đừng hoảng khi nghe thấy từ lạ. Hãy tìm xem phụ âm đầu của nó có phải là phụ âm cuối của từ đằng trước trượt qua không.',
      toeicApplication: 'Part 2 & Part 3 TOEIC xuất hiện liên tục: "take it over", "sign in at the desk", "fill it out".',
    },

    quiz: [
      {
        audioPrompt: 'Could you fill it out for me?',
        question: 'Khi người bản xứ nói nhanh câu "Fill it out", âm thanh thực tế tai bạn nghe thấy giống nhất với cụm nào?',
        options: ['fil - lit - tout', 'fill ... it ... out', 'fee - li - tao', 'fil - it - out'],
        correctAnswer: 0,
        explanation: 'Âm /l/ ở "fill" nối sang "it" thành "lit", âm /t/ ở "it" nối sang "out" thành "tout" ➔ "fil-lit-tout".',
        listeningTip: 'Người bản xứ luôn nối liên tiếp 3 từ này thành một chuỗi âm thanh duy nhất.',
      },
    ],
  },
  {
    id: 'linking-american-flap-t',
    categoryId: 'linking-sounds',
    title: 'The American Flap T: Why "Water" Sounds Like "Wah-der"',
    titleVi: 'Âm T vỗ kiểu Mỹ: Tại sao người bản xứ biến chữ T thành D nhẹ?',
    subtitle: 'Hiện tượng phổ biến nhất trong tiếng Anh giao tiếp chuẩn Mỹ và đề thi TOEIC giọng Mỹ.',
    tag: 'Tiếng Anh Mỹ thực tế',
    frequency: '★★★★★',
    difficulty: 'Cốt lõi',

    nativeIntuition: {
      coreMindset:
        'Để phát âm một chữ /t/ chuẩn xác kiểu Anh-Anh cổ điển (True T), đầu lưỡi bạn phải chặn đứng luồng khí lại ở vòm họng trên rồi bật mạnh ra (tốn nhiều lực). Người Mỹ thấy việc này quá mệt mỏi khi đang nói trôi chảy. Vì thế, khi chữ T đứng kẹp GIỮA HAI NGUYÊN ÂM, họ chỉ "vỗ nhẹ" đầu lưỡi lên vòm họng một phần trăm giây rồi buông ra ngay (Flap T), khiến âm T nghe lướt nhẹ như một âm /d/ mềm mại.',
      physicalFeeling:
        'Cảm giác như đầu lưỡi bạn chỉ khẽ chạm vào vòm miệng một cái tích tắc như cánh quạt quét nhẹ, không nén khí, không bật hơi mạnh.',
      whyVietnameseStruggle:
        'Người Việt thường đọc chữ T rất cứng hoặc nhầm lẫn sang âm "đ" tiếng Việt nặng nề. Khi nghe người Mỹ nói "city" thành "ci-dy", "better" thành "beh-der", tai người Việt không nhận diện được chữ T.',
    },

    rules: [
      {
        ruleTitle: 'Công thức Flap T (T đứng giữa 2 nguyên âm)',
        description:
          'Khi âm /t/ hoặc /tt/ đứng giữa 2 nguyên âm (và không nằm trong âm tiết mang trọng âm chính), nó tự động biến thành âm /d/ vỗ nhẹ (Fast /d/).',
        simpleFormula: '[Nguyên âm] + T / TT + [Nguyên âm] ➔ Biến thành D lướt nhẹ',
        mouthShapeTip:
          'Đầu lưỡi chỉ chạm phớt qua gờ nướu răng cửa trên một tích tắc rồi thả lỏng ngay, không chặn hơi quá 0.1 giây.',
      },
      {
        ruleTitle: 'Flap T khi nối giữa 2 từ trong câu',
        description: 'Khi từ trước kết thúc bằng T và từ sau bắt đầu bằng Nguyên âm, chữ T đó cũng bị biến thành D nhẹ!',
        simpleFormula: 'Get it ➔ "geh-dit" | Put it on ➔ "pud-id-on" | Not at all ➔ "nah-dah-tall"',
        mouthShapeTip: 'Nói liền mạch như thể đó là một từ duy nhất.',
      },
    ],

    comparisonPairs: [
      {
        label: 'Nước uống',
        slowText: 'Water',
        fastConnectedText: 'Water (American)',
        phoneticSpelling: 'wah - der',
        vi: 'Nước uống',
        explanation: 'Chữ T đứng giữa 2 nguyên âm biến thành /d/ lướt nhẹ.',
      },
      {
        label: 'Tốt hơn',
        slowText: 'Better',
        fastConnectedText: 'Better (American)',
        phoneticSpelling: 'beh - der',
        vi: 'Tốt hơn',
        explanation: 'Người Mỹ nói "beh-der", trong khi người Anh giữ nguyên "beh-tuh".',
      },
      {
        label: 'Gặp gỡ một khách hàng',
        slowText: 'Meet a client',
        fastConnectedText: 'Meet a client',
        phoneticSpelling: 'mee - da client',
        vi: 'Gặp một khách hàng',
        explanation: 'Âm /t/ cuối từ "meet" gặp nguyên âm "a" &rarr; biến thành "mee-da".',
      },
      {
        label: 'Không có gì đâu',
        slowText: 'Not at all',
        fastConnectedText: 'Not at all',
        phoneticSpelling: 'nah - dah - tall',
        vi: 'Không có gì đâu / Không phiền chút nào',
        explanation: 'Cả hai chữ T đều biến thành D vỗ nhẹ nối sang từ kế tiếp!',
      },
    ],

    dailyDialogue: [
      {
        speaker: 'Sarah',
        en: 'Could I get a little bottle of water?',
        connectedPhonetic: 'Could I ge-da li-ddle bah-ddle of wah-der?',
        vi: 'Cho tôi xin một chai nước nhỏ được không?',
      },
      {
        speaker: 'Waiter',
        en: 'Sure, I will put it on your table right away.',
        connectedPhonetic: 'Sure, I will pu-dit on your table right away.',
        vi: 'Vâng, tôi sẽ mang để lên bàn bạn ngay ạ.',
      },
    ],

    listeningHacks: {
      hackTitle: 'Nhận diện Flap T trong bài nghe TOEIC',
      hackContent:
        'Trong bài thi TOEIC Listening giọng Bắc Mỹ (chiếm hơn 50% đề thi), các từ như "waiting" sẽ nghe thành "wading", "meeting" nghe thành "meeding", "total" nghe thành "todal", "matter" nghe thành "madder". Hãy tập phản xạ đổi âm /d/ nhẹ trong tai thành chữ T trên mặt chữ.',
      howToCatchIt: 'Khi nghe thấy âm /d/ lướt giữa câu, 80% trường hợp mặt chữ là ký tự T!',
      toeicApplication: '"The meeting is scheduled at..." &rarr; người nói phát âm "The meeding is..."',
    },

    quiz: [
      {
        audioPrompt: 'I have a meeting at four.',
        question: 'Trong câu nói trên của người Mỹ, từ "meeting at" được phát âm tự nhiên như thế nào?',
        options: ['mee-ding-ngæt', 'meet...ing...at', 'mee-ting-get', 'mee-ti-nat'],
        correctAnswer: 0,
        explanation: 'Chữ T trong "meeting" biến thành d nhẹ, và âm /ŋ/ nối sang "at" &rarr; "mee-ding-ngæt".',
        listeningTip: 'Flap T là đặc trưng lớn nhất giúp bạn nhận diện tiếng Anh giao tiếp giọng Mỹ.',
      },
    ],
  },
  {
    id: 'linking-dropping-h-pronouns',
    categoryId: 'linking-sounds',
    title: 'Dropping the H in Pronouns: Why "Tell him" Sounds Like "Tell-im"',
    titleVi: 'Nuốt âm H trong Đại từ: Tại sao "Tell him" nghe như "Tell-im"?',
    subtitle: 'Giải mã hiện tượng các đại từ he, him, his, her, have hoàn toàn biến mất âm H khi nói nhanh.',
    tag: 'Nuốt âm đời thường',
    frequency: '★★★★★',
    difficulty: 'Phổ biến',

    nativeIntuition: {
      coreMindset:
        'Trong các câu giao tiếp hàng ngày, các đại từ như "him, her, his, have, has" là các TỪ PHỤ (Function words) chứ không mang thông tin chính. Âm /h/ là một âm thở không có thanh đới, đòi hỏi đẩy một luồng khí từ phổi lên miệng. Khi nói nhanh, não bộ người bản xứ cắt bỏ luôn âm /h/ này để tiết kiệm thời gian, biến "him" thành "im", "her" thành "er", "his" thành "iz"!',
      physicalFeeling:
        'Từ đi trước trượt thẳng vào nguyên âm của đại từ phía sau, âm H bị xóa sổ hoàn toàn như chưa từng tồn tại.',
      whyVietnameseStruggle:
        'Người Việt được dạy trong trường là phải phát âm từng chữ rõ ràng "Tell... him". Khi ra ngoài đời nghe người Tây nói "Tell-im", "Ask-er", người Việt tưởng đó là một từ mới lạ.',
    },

    rules: [
      {
        ruleTitle: 'Quy tắc nuốt âm H trong đại từ xưng hô',
        description: 'Khi các từ him, her, his, have, has không đứng đầu câu, âm /h/ thường bị lược bỏ.',
        simpleFormula:
          '- Tell him ➔ "tell-im"\n- Ask her ➔ "ask-er"\n- Call his office ➔ "call-iz office"\n- Would have ➔ "would-əv"',
        mouthShapeTip: 'Bỏ qua việc thở ra chữ H, nối trực tiếp phụ âm của từ trước vào phần còn lại.',
      },
    ],

    comparisonPairs: [
      {
        label: 'Nói với anh ấy',
        slowText: 'Tell him',
        fastConnectedText: 'Tell him (Natural)',
        phoneticSpelling: 'tell - im',
        vi: 'Nói với anh ấy',
        explanation: 'Âm /h/ biến mất, âm /l/ của "tell" dính thẳng vào "im".',
      },
      {
        label: 'Hỏi cô ấy thử xem',
        slowText: 'Ask her',
        fastConnectedText: 'Ask her (Natural)',
        phoneticSpelling: 'ask - er',
        vi: 'Hỏi cô ấy xem sao',
        explanation: 'Âm /k/ ở "ask" nối thẳng vào "er" &rarr; "ask-er".',
      },
      {
        label: 'Tôi yêu anh ấy',
        slowText: 'I love him',
        fastConnectedText: 'I love him (Natural)',
        phoneticSpelling: 'I luv - im',
        vi: 'Tôi yêu anh ấy',
        explanation: 'Âm /v/ ở "love" nối thẳng sang "im" &rarr; "luv-im".',
      },
    ],

    dailyDialogue: [
      {
        speaker: 'Manager',
        en: 'Did you tell him about the budget cut?',
        connectedPhonetic: 'Did ya tell-im about the budget cut?',
        vi: 'Bạn đã báo cho anh ấy biết về việc cắt giảm ngân sách chưa?',
      },
      {
        speaker: 'Employee',
        en: 'I called his assistant and left her a message.',
        connectedPhonetic: 'I call-diz assistant and lef-ter a message.',
        vi: 'Tôi đã gọi cho trợ lý của anh ấy và để lại lời nhắn cho cô ấy rồi.',
      },
    ],

    listeningHacks: {
      hackTitle: 'Cách bắt kịp đại từ bị nuốt H',
      hackContent:
        'Khi nghe thấy âm đuôi "-im", "-er", "-iz" dính vào sau một động từ (như "give-im", "send-er", "take-iz"), hãy hiểu ngay đó chính là him / her / his!',
      howToCatchIt: 'Đừng đợi nghe thấy âm "Hờ". 90% giao tiếp đời thường người ta nuốt mất âm H.',
      toeicApplication: 'Trong hội thoại Part 3: "I already told him" &rarr; đọc dính là "tol-dim".',
    },

    quiz: [
      {
        audioPrompt: 'Could you give him this document?',
        question: 'Trong câu trên, cụm từ "give him" được người bản xứ nói tự nhiên thành:',
        options: ['gi-vim', 'give ... him', 'gee-hem', 'gi-ver'],
        correctAnswer: 0,
        explanation: 'Âm /h/ bị nuốt, âm /v/ nối sang "im" &rarr; "gi-vim".',
        listeningTip: 'Nuốt H là thói quen tự nhiên của người bản xứ trong hơn 90% cuộc đàm thoại.',
      },
    ],
  },
];
