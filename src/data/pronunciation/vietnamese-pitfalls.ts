import { PronunciationTopic } from '@/types/pronunciation';

export const vietnamesePitfallsTopics: PronunciationTopic[] = [
  {
    id: 'pitfalls-ending-sounds',
    categoryId: 'vietnamese-pitfalls',
    title: 'The Critical Ending Sounds: /s/, /z/, /t/, /d/',
    titleVi: 'Các âm đuôi chí mạng: /s/, /z/, /t/, /d/ (Bỏ tật nuốt đuôi của người Việt)',
    subtitle: 'Âm đuôi trong tiếng Anh quyết định 80% việc người bản xứ có hiểu bạn hay không!',
    tag: 'Âm đuôi sống còn',
    frequency: '★★★★★',
    difficulty: 'Cốt lõi',

    nativeIntuition: {
      coreMindset:
        'Trong tiếng Việt, âm cuối thường là âm câm hoặc khép môi/họng lại (ví dụ: "hát", "bát", "mắt" — âm /t/ bị giữ lại trong họng chứ không bật ra gió). Nhưng trong tiếng Anh, ÂM ĐUÔI (Final Consonants) chính là cái chìa khóa phân biệt giữa từ này với từ khác!\nNếu bạn bỏ âm đuôi, người bản xứ sẽ nghe từ của bạn thành một từ hoàn toàn khác:\n- Bỏ âm đuôi của "Life, Like, Light, Line, Lie" &rarr; Người Tây chỉ nghe thấy mỗi âm "Lai" và không thể đoán nổi bạn đang nói cái gì!',
      physicalFeeling:
        'Hãy cảm nhận luồng hơi bật nhẹ hoặc tiếng xì gió ở đầu răng/lưỡi vào đúng tích tắc cuối cùng khi bạn phát âm xong một từ.',
      whyVietnameseStruggle:
        'Do cơ chế nói tiếng Việt không có phụ âm bật đuôi, não người Việt tự động "cắt gọt" âm đuôi của tiếng Anh để nói cho nhanh. Hậu quả là người bản xứ nghe thấy tiếng Anh của ta giống như bị cụt đuôi và phải hỏi lại liên tục: "Pardon me?".',
    },

    rules: [
      {
        ruleTitle: 'Quy tắc "Không bỏ rơi âm cuối"',
        description:
          '- Âm /s/ và /z/: Luôn phải có tiếng xì gió nhẹ ở kẽ răng (Books, Places, Always, Because).\n- Âm /t/ và /d/: Đầu lưỡi chạm nướu răng trên rồi bật nhẹ luồng khí ra (Wait, Need, Right, Start).',
        simpleFormula: 'Nói xong thân từ ➔ Bật dứt khoát âm đuôi (Đặc biệt là /s/, /z/, /t/, /d/)',
        mouthShapeTip: 'Giữ môi và răng mở nhẹ cho đến khi âm đuôi thoát ra ngoài hoàn toàn.',
      },
    ],

    comparisonPairs: [
      {
        label: 'Cặp từ dễ nhầm: Cuộc sống vs Thích',
        slowText: 'Life vs Like',
        fastConnectedText: 'Life /laɪf/ vs Like /laɪk/',
        phoneticSpelling: 'Lai-ffff vs Lai-kkkk',
        vi: 'Cuộc sống (âm f) vs Thích (âm k)',
        explanation: 'Khác nhau duy nhất ở âm đuôi: răng trên cắn môi dưới (/f/) vs cuống lưỡi bật hơi (/k/).',
      },
      {
        label: 'Cặp từ dễ nhầm: Ánh sáng vs Đường thẳng',
        slowText: 'Light vs Line',
        fastConnectedText: 'Light /laɪt/ vs Line /laɪn/',
        phoneticSpelling: 'Lai-tttt vs Lai-nnnn',
        vi: 'Ánh sáng (âm t) vs Đường thẳng (âm n)',
        explanation: 'Âm /t/ đầu lưỡi chạm nướu bật hơi, âm /n/ ngân giọng qua mũi.',
      },
      {
        label: 'Số nhiều và Sở hữu cách',
        slowText: 'He works at Apex',
        fastConnectedText: 'He works at Apex',
        phoneticSpelling: 'He work-ssss at Apex',
        vi: 'Anh ấy làm việc ở Apex',
        explanation: 'Nếu quên âm /s/ ở "works", người bản xứ sẽ thấy ngữ pháp của bạn bị gãy.',
      },
    ],

    dailyDialogue: [
      {
        speaker: 'You',
        en: 'I would like a slice of pizza, please.',
        connectedPhonetic: 'I would lai-kkk a sli-sss of pizza, please.',
        vi: 'Cho tôi xin một miếng pizza nhé.',
      },
      {
        speaker: 'Server',
        en: 'Sure, that will be five dollars.',
        connectedPhonetic: 'Sure, tha-ttt will be five dollar-zzz.',
        vi: 'Vâng, của bạn hết 5 đô la ạ.',
      },
    ],

    listeningHacks: {
      hackTitle: 'Cách nghe âm đuôi trong bài thi TOEIC Listening',
      hackContent:
        'Trong Part 1 và Part 2 TOEIC, âm đuôi giúp bạn phân biệt Thì hiện tại vs Quá khứ: "work" vs "worked" (/t/), "close" vs "closed" (/d/). Khi nghe câu hỏi, hãy chú ý tai nghe âm /t/ hoặc /d/ bật cực nhẹ ở cuối động từ.',
      howToCatchIt: 'Âm /t/ nghe như tiếng gõ nhẹ của đầu bút bi; âm /d/ nghe trầm và rung cổ họng hơn.',
      toeicApplication: '"The door is closed" &rarr; nghe âm /zd/ dính vào "closed".',
    },

    quiz: [
      {
        audioPrompt: 'I need to check the flight schedule.',
        question: 'Trong câu trên, từ "flight" bắt buộc phải có âm đuôi nào để không bị nhầm thành từ "fly"?',
        options: ['Âm bật hơi /t/', 'Âm xì hơi /s/', 'Âm rung /z/', 'Âm gió /f/'],
        correctAnswer: 0,
        explanation: 'Từ "flight" kết thúc bằng phụ âm /t/. Nếu không bật âm /t/, người nghe sẽ tưởng bạn nói "fly" (bay).',
        listeningTip: 'Luôn kiểm tra âm đuôi để đảm bảo từ vựng được nhận diện chính xác.',
      },
    ],
  },
  {
    id: 'pitfalls-long-vs-short-vowels',
    categoryId: 'vietnamese-pitfalls',
    title: 'Long /i:/ vs. Short /ɪ/: Leave vs. Live, Sheet vs. Shit',
    titleVi: 'Nguyên âm Dài /i:/ vs. Ngắn /ɪ/: Tránh các bẫy phát âm gây hiểu lầm tai hại',
    subtitle: 'Cặp âm "nhạy cảm" nhất tiếng Anh mà người Việt thường xuyên phát âm nhầm lẫn.',
    tag: 'Cặp âm nhạy cảm',
    frequency: '★★★★★',
    difficulty: 'Phổ biến',

    nativeIntuition: {
      coreMindset:
        'Người Việt thường nghĩ /i:/ và /ɪ/ chỉ khác nhau ở độ "dài - ngắn" của thời gian phát âm. ĐÂY LÀ HIỂU LẦM TAI HẠI!\nSự khác biệt thực sự nằm ở **ĐỘ CĂNG CƠ MIỆNG (Tense vs. Lax)**:\n- **/i:/ dài:** Cơ miệng CĂNG, khóe môi kéo bẹt sang 2 bên như đang mỉm cười chụp ảnh (Smile!). Lưỡi đẩy cao lên gần vòm họng.\n- **/ɪ/ ngắn:** Cơ miệng THẢ LỎNG hoàn toàn, hàm dưới hơi trễ xuống, âm thanh phát ra lai giữa âm "i" và âm "ê" trong tiếng Việt (giống như "i-ê" rất nhanh).',
      physicalFeeling:
        '- /i:/: Cảm nhận hai má và mép căng ra rõ rệt (Feel the smile!).\n- /ɪ/: Miệng thả lỏng thư thái, phát âm dứt khoát trong tích tắc.',
      whyVietnameseStruggle:
        'Tiếng Việt chỉ có một âm "i" duy nhất (như trong "đi, thi, gì"). Người Việt đem âm "i" tiếng Việt áp dụng cho cả hai âm này. Kết quả: Thay vì nói "a sheet of paper" (một tờ giấy), ta lại vô tình nói thành từ bậy "a shit of paper"! Thay vì "beach" (bãi biển), ta lại nói thành "bitch"!',
    },

    rules: [
      {
        ruleTitle: 'Bí kíp phát âm âm /i:/ căng mép mỉm cười',
        description: 'Mép kéo sang hai bên, lưỡi đưa lên cao, âm thanh trong trẻo và ngân dài.',
        simpleFormula: 'Cười tươi + Ngân "iii" ➔ /i:/ (Leave, Sheet, Beach, Peace, Seat)',
        mouthShapeTip: 'Tưởng tượng ai đó đang chụp ảnh bảo bạn nói "Cheese!".',
      },
      {
        ruleTitle: 'Bí kíp phát âm âm /ɪ/ thả lỏng lai âm ê',
        description: 'Hạ hàm dưới xuống 1 chút, phát ra âm thanh cực nhanh lai giữa "i" và "ê".',
        simpleFormula: 'Thả lỏng hàm + Nói "i" ngả sang "ê" ➔ /ɪ/ (Live, Shit, Bitch, Piss, Sit)',
        mouthShapeTip: 'Đừng kéo mép! Giữ cơ môi thư giãn hoàn toàn.',
      },
    ],

    comparisonPairs: [
      {
        label: 'Tờ giấy vs Từ chửi bậy',
        slowText: 'Sheet vs Shit',
        fastConnectedText: 'Sheet /ʃiːt/ vs Shit /ʃɪt/',
        phoneticSpelling: 'Sheee-t (Căng mép) vs Sh-ɪ-t (Thả lỏng)',
        vi: 'Tờ giấy (Sheet) vs Phân / Từ chửi thề (Shit)',
        explanation: '"Sheet" phải kéo dài mép cười tươi. "Shit" thả lỏng cơ miệng phát âm ngắn.',
      },
      {
        label: 'Bãi biển vs Chó cái / Từ lăng mạ',
        slowText: 'Beach vs Bitch',
        fastConnectedText: 'Beach /biːtʃ/ vs Bitch /bɪtʃ/',
        phoneticSpelling: 'Beee-ch (Cười) vs B-ɪ-ch (Thả lỏng)',
        vi: 'Bãi biển (Beach) vs Từ thô tục (Bitch)',
        explanation: 'Muốn rủ bạn đi biển "go to the beach", bắt buộc phải cười tươi kéo dài âm /i:/.',
      },
      {
        label: 'Rời đi vs Sống',
        slowText: 'Leave vs Live',
        fastConnectedText: 'Leave /liːv/ vs Live /lɪv/',
        phoneticSpelling: 'Leee-v vs L-ɪ-v',
        vi: 'Rời đi (Leave) vs Sống / Cư trú (Live)',
        explanation: '"I am leaving" (Tôi chuẩn bị đi) vs "I am living" (Tôi đang sinh sống).',
      },
    ],

    dailyDialogue: [
      {
        speaker: 'Tourist',
        en: 'I love going to the beach in the summer.',
        connectedPhonetic: 'I love going to the BEE-ch in the summer.',
        vi: 'Tôi rất thích đi ra bãi biển vào mùa hè.',
      },
      {
        speaker: 'Local',
        en: 'Where do you live currently?',
        connectedPhonetic: 'Where do you L-IH-V currently?',
        vi: 'Hiện tại bạn đang sống ở đâu vậy?',
      },
    ],

    listeningHacks: {
      hackTitle: 'Cách nghe nhận diện /i:/ và /ɪ/',
      hackContent:
        'Khi nghe người bản xứ: Âm /i:/ luôn nghe thấy độ ngân trong trẻo và cao hơn. Âm /ɪ/ nghe trầm hơn, đục hơn và ngả nhẹ về âm "ê" (Ví dụ từ "sit down" nghe hơi giống "sết đao").',
      howToCatchIt: 'Nếu nghe thấy âm thanh hơi ngả "ê" thì đó là âm /ɪ/ ngắn!',
      toeicApplication: 'TOEIC Part 1 thường miêu tả người đang "sitting" (/ˈsɪt.ɪŋ/) hoặc "leaving" (/ˈliːv.ɪŋ/).',
    },

    quiz: [
      {
        audioPrompt: 'Could you give me a sheet of paper?',
        question: 'Để nói câu "Cho tôi xin một tờ giấy" mà không bị nhầm sang từ tục tĩu, bạn cần phát âm từ "sheet" như thế nào?',
        options: [
          'Kéo căng khóe mép mỉm cười, ngân dài âm /i:/',
          'Thả lỏng cơ miệng đọc âm ngắn dứt khoát',
          'Đọc giống âm "chét" tiếng Việt',
          'Đọc không cần âm đuôi',
        ],
        correctAnswer: 0,
        explanation: 'Từ "sheet" chứa nguyên âm dài /i:/ đòi hỏi căng mép mỉm cười để phân biệt với từ ngắn /ɪ/.',
        listeningTip: 'Luôn mỉm cười khi phát âm các từ có đuôi "-ee-", "-ea-" như sheet, beach, meet, seat.',
      },
    ],
  },
  {
    id: 'pitfalls-th-sound',
    categoryId: 'vietnamese-pitfalls',
    title: 'The "TH" Sound (/θ/ vs. /ð/): Think vs. Sink, This vs. Dis',
    titleVi: 'Âm "TH" (/θ/ và /ð/): Đặt lưỡi kẹp nhẹ giữa hai hàm răng',
    subtitle: 'Âm đặc trưng số 1 của tiếng Anh không hề tồn tại trong tiếng Việt.',
    tag: 'Âm kẹp lưỡi TH',
    frequency: '★★★★★',
    difficulty: 'Phổ biến',

    nativeIntuition: {
      coreMindset:
        'Trong tiếng Việt, chữ "th" (như trong "thỏ, tha, thương") là âm bật hơi từ chân răng. Nhưng trong tiếng Anh, chữ "TH" hoàn toàn khác biệt: ĐÂY LÀ ÂM NGOÀI RĂNG (Interdental)! Đầu lưỡi của bạn BẮT BUỘC phải thò ra ngoài một chút, kẹp nhẹ giữa hai hàm răng cửa trên và dưới để luồng khí thoát qua.',
      physicalFeeling:
        'Cảm nhận mặt trên của đầu lưỡi chạm nhẹ vào mép răng cửa trên, luồng hơi mát xì nhẹ qua kẽ răng.',
      whyVietnameseStruggle:
        'Người Việt thường phát âm "TH" thành âm "Xì" (/s/) hoặc âm "Th" tiếng Việt hoặc âm "Đ" tiếng Việt:\n- "Think" đọc thành "Sink" (Chìm tàu) hoặc "Thinh"!\n- "This" đọc thành "Đít" (Dis)!\nNgười bản xứ sẽ cảm thấy phát âm của bạn rất nặng giọng địa phương.',
    },

    rules: [
      {
        ruleTitle: '2 biến thể của âm TH',
        description:
          '- **Âm TH không rung (/θ/ - Voiceless):** Chỉ có luồng hơi xì qua đầu lưỡi, dây thanh đới không rung: *Think, Thank, Three, Birthday, Month, Tooth*.\n- **Âm TH có rung (/ð/ - Voiced):** Đầu lưỡi kẹp giữa răng nhưng cổ họng rung mạnh lên: *This, That, These, Those, Mother, Together, With*.',
        simpleFormula: 'Đầu lưỡi thò ra giữa 2 răng + Xì hơi nhẹ ➔ /θ/ (không rung) hoặc Rung họng ➔ /ð/',
        mouthShapeTip: 'Chỉ cần thò ra khoảng 2-3 mm đầu lưỡi chạm mép răng trên là đủ, không cần thò quá dài.',
      },
    ],

    comparisonPairs: [
      {
        label: 'Suy nghĩ vs Bồn rửa / Chìm tàu',
        slowText: 'Think vs Sink',
        fastConnectedText: 'Think /θɪŋk/ vs Sink /sɪŋk/',
        phoneticSpelling: 'TH-ink (Lưỡi thò ra) vs S-ink (Lưỡi giấu trong)',
        vi: 'Suy nghĩ (Think) vs Chìm / Bồn rửa (Sink)',
        explanation: 'Khác nhau duy nhất: "Think" đầu lưỡi thò ra ngoài răng; "Sink" đầu lưỡi giấu kín sau răng.',
      },
      {
        label: 'Cái này vs Tiếng lóng thô',
        slowText: 'This vs Dis',
        fastConnectedText: 'This /ðɪs/ vs Dis /dɪs/',
        phoneticSpelling: 'TH-is (Rung đầu lưỡi) vs D-is',
        vi: 'Cái này (This) vs Chỉ trích / Gièm pha (Dis)',
        explanation: '"This" đòi hỏi đầu lưỡi kẹp giữa 2 răng và rung cổ họng.',
      },
      {
        label: 'Số ba vs Cái cây',
        slowText: 'Three vs Tree',
        fastConnectedText: 'Three /θriː/ vs Tree /triː/',
        phoneticSpelling: 'TH-ree vs T-ree',
        vi: 'Số 3 (Three) vs Cái cây (Tree)',
        explanation: 'Người Việt hay phát âm số 3 thành "Tri" (cái cây) thay vì "Three".',
      },
    ],

    dailyDialogue: [
      {
        speaker: 'Customer',
        en: 'Thank you for this thoughtful gift.',
        connectedPhonetic: 'THANK you for TH-IS THOUGHT-ful gift.',
        vi: 'Cảm ơn bạn vì món quà rất chu đáo này nhé.',
      },
      {
        speaker: 'Friend',
        en: 'I think that these are three of your favorites.',
        connectedPhonetic: 'I THINK TH-AT TH-ESE are THREE of your favorites.',
        vi: 'Tôi nghĩ rằng đây là ba món bạn yêu thích nhất.',
      },
    ],

    listeningHacks: {
      hackTitle: 'Phân biệt TH rung và TH không rung',
      hackContent:
        'Hầu hết các từ chỉ định (this, that, these, those), đại từ (they, them, their) và từ nối (though, then, than) đều là TH CÓ RUNG (/ð/). Các danh từ, tính từ mang nghĩa cụ thể (think, thought, theory, health, wealth) đa số là TH KHÔNG RUNG (/θ/).',
      howToCatchIt: 'Đặt ngón tay lên cổ họng: Nếu thấy rung thì đó là âm /ð/.',
      toeicApplication: 'Part 2 TOEIC: "Is this the correct gate?" &rarr; nghe âm rung /ð/ ở "this".',
    },

    quiz: [
      {
        audioPrompt: 'I think that this is the best solution.',
        question: 'Để phát âm chuẩn xác từ "Think", vị trí của đầu lưỡi bạn phải ở đâu?',
        options: [
          'Kẹp nhẹ giữa hai hàm răng cửa trên và dưới',
          'Giấu kín hoàn toàn sau hàm răng dưới',
          'Chạm vào vòm họng mềm phía trong cùng',
          'Uốn cong ngược vào sâu trong cổ họng',
        ],
        correctAnswer: 0,
        explanation: 'Âm /θ/ trong "think" đòi hỏi đầu lưỡi đặt kẹp nhẹ giữa hai hàm răng để luồng hơi thoát ra.',
        listeningTip: 'Đặt lưỡi giữa 2 răng là phản xạ tự nhiên của người bản xứ khi gặp ký tự TH.',
      },
    ],
  },
];
