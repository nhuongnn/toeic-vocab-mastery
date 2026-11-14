import { PronunciationTopic } from '@/types/pronunciation';

export const intonationTopics: PronunciationTopic[] = [
  {
    id: 'intonation-falling-vs-rising',
    categoryId: 'intonation',
    title: 'Falling vs. Rising Tone: The Melody of Attitude & Intention',
    titleVi: 'Lên giọng vs. Xuống giọng: Ngữ điệu bộc lộ thái độ và sự tinh tế',
    subtitle: 'Nói cùng một câu từ nhưng người bản xứ có thể hiểu là bạn đang thân thiện, quả quyết hay giễu cợt!',
    tag: 'Ngữ điệu giao tiếp',
    frequency: '★★★★★',
    difficulty: 'Phổ biến',

    nativeIntuition: {
      coreMindset:
        'Tiếng Anh không có thanh điệu trên từng từ như tiếng Việt (sắc, huyền, hỏi, ngã, nặng), mà nó có **NGỮ ĐIỆU CỦA TOÀN BỘ CÂU (Sentence Intonation)**. \nNgữ điệu là chiếc nhiệt kế đo cảm xúc:\n- **Xuống giọng (Falling ↘):** Thể hiện sự CHẮC CHẮN, dứt khoát, kết thúc vấn đề, sự thật hiển nhiên. Dùng cho câu trần thuật và câu hỏi Wh- (What, Where, When, Why, How).\n- **Lên giọng (Rising ↗):** Thể hiện sự TÒ MÒ, chưa chắc chắn, mời gọi đối phương xác nhận, sự ngạc nhiên. Dùng cho câu hỏi Yes/No.',
      physicalFeeling:
        'Tưởng tượng giọng bạn như một chiếc xe lượn siêu tốc: Cuối câu trần thuật xe hạ cánh xuống mặt đất êm ái (↘); cuối câu hỏi Yes/No xe vút bay lên bầu trời (↗).',
      whyVietnameseStruggle:
        'Người Việt thường có thói quen: Cứ là CÂU HỎI thì câu nào cũng lên giọng ở cuối! Ví dụ: "Where do you live? ↗" (nghe rất kỳ quặc, như đang tra khảo). Với câu hỏi Wh-, người bản xứ luôn XUỐNG GIỌNG ở cuối câu!',
    },

    rules: [
      {
        ruleTitle: 'Quy tắc Xuống giọng (Falling Intonation ↘)',
        description:
          '- Câu trần thuật bình thường: I am a software engineer ↘.\n- Câu hỏi lấy thông tin (Wh- questions): What time is the meeting ↘? Where are you going ↘?',
        simpleFormula: 'Khẳng định / Phủ định / Câu hỏi Wh- ➔ Xuống giọng ở cuối câu ↘',
        mouthShapeTip: 'Hạ nhẹ cao độ của âm tiết cuối cùng trong câu như lúc thở phào nhẹ nhõm.',
      },
      {
        ruleTitle: 'Quy tắc Lên giọng (Rising Intonation ↗)',
        description:
          '- Câu hỏi Yes/No: Are you ready ↗? Do you have a pen ↗?\n- Thể hiện sự ngạc nhiên hoặc xác nhận lại: Really ↗? You got promoted ↗?',
        simpleFormula: 'Câu hỏi Yes/No / Câu hỏi đuôi cần xác nhận ➔ Lên bổng giọng ở cuối câu ↗',
        mouthShapeTip: 'Nhấc cao độ của từ cuối cùng lên cao hơn 1 quãng âm như một nốt nhạc cao.',
      },
      {
        ruleTitle: 'Quy tắc Liệt kê (List Intonation: Lên... Lên... và Xuống)',
        description:
          'Khi liệt kê một chuỗi các món đồ hoặc hành động, lên giọng ở từng món và chỉ hạ giọng ở món cuối cùng để báo hiệu danh sách đã kết thúc.',
        simpleFormula: 'Món 1 ↗, Món 2 ↗, Món 3 ↗, and Món cuối ↘',
        mouthShapeTip: 'Tạo cảm giác "vẫn còn tiếp tục... cho đến món cuối cùng thì hết".',
      },
    ],

    comparisonPairs: [
      {
        label: 'Câu hỏi Wh- (Bắt buộc xuống giọng ↘)',
        slowText: 'Where is the nearest bank?',
        fastConnectedText: 'Where is the nearest bank? ↘',
        phoneticSpelling: 'Where is th-nearest BANK? ↘ (Hạ giọng)',
        vi: 'Ngân hàng gần nhất ở đâu vậy?',
        explanation: 'Câu hỏi Wh- luôn hạ giọng ở từ cuối cùng để thể hiện sự lịch sự và dứt khoát.',
      },
      {
        label: 'Câu hỏi Yes/No (Bắt buộc lên giọng ↗)',
        slowText: 'Is the bank open today?',
        fastConnectedText: 'Is the bank open today? ↗',
        phoneticSpelling: 'Is th-bank open to-DAY? ↗ (Nhấc bổng giọng)',
        vi: 'Hôm nay ngân hàng có mở cửa không?',
        explanation: 'Câu hỏi Yes/No nhấc cao giọng ở từ "today" để chờ đối phương trả lời Yes hoặc No.',
      },
      {
        label: 'Liệt kê danh mục',
        slowText: 'We need pens, notebooks, and a laptop',
        fastConnectedText: 'We need pens ↗, notebooks ↗, and a laptop ↘',
        phoneticSpelling: 'pens ↗, notebooks ↗, and a LAP-top ↘',
        vi: 'Chúng tôi cần bút, vở ghi, và một chiếc máy tính xách tay',
        explanation: 'Lên giọng ở pens và notebooks, hạ giọng dứt khoát ở laptop báo hiệu đã xong danh sách.',
      },
    ],

    dailyDialogue: [
      {
        speaker: 'Colleague',
        en: 'Did you finish reviewing the proposal ↗?',
        connectedPhonetic: 'Did you finish reviewing the pro-PO-sal ↗?',
        vi: 'Bạn đã xem xong bản đề xuất chưa? (Lên giọng chờ Yes/No)',
      },
      {
        speaker: 'You',
        en: 'Yes, and I sent it to the client this morning ↘.',
        connectedPhonetic: 'Yes, and I sent-it to the client this MOR-ning ↘.',
        vi: 'Xong rồi, và tôi đã gửi nó cho khách hàng sáng nay rồi. (Xuống giọng dứt khoát)',
      },
    ],

    listeningHacks: {
      hackTitle: 'Cách bắt mạch câu hỏi trong TOEIC Listening Part 2',
      hackContent:
        'Trong Part 2: Nếu câu hỏi bắt đầu bằng Wh- (Who, When, Where, Why, How), người nói luôn XUỐNG GIỌNG ở cuối câu và CẤM trả lời bằng Yes/No. Nếu câu hỏi LÊN GIỌNG ở cuối câu (Do you, Is it, Have you), đó là câu hỏi Yes/No!',
      howToCatchIt: 'Tai nghe thấy cao độ vút lên ở cuối ➔ câu hỏi Yes/No; nghe thấy cao độ trầm hạ xuống ➔ câu hỏi Wh- hoặc câu trần thuật.',
      toeicApplication: 'Loại ngay các đáp án bắt đầu bằng "Yes/No" khi câu hỏi có ngữ điệu xuống giọng ↘ của Wh-question.',
    },

    quiz: [
      {
        audioPrompt: 'Could you give me a hand with this printer?',
        question: 'Câu hỏi trên là câu hỏi Yes/No lịch sự, ngữ điệu chuẩn ở từ cuối cùng "printer" sẽ như thế nào?',
        options: [
          'Lên bổng giọng ở cuối câu (Rising ↗)',
          'Xuống trầm giọng ở cuối câu (Falling ↘)',
          'Giữ ngang bằng không thay đổi cao độ',
          'Ngắt quãng hụt hơi',
        ],
        correctAnswer: 0,
        explanation: 'Câu hỏi Yes/No / Nhờ vả lịch sự luôn lên giọng ở cuối câu (Rising intonation) để mời gọi sự phản hồi.',
        listeningTip: 'Lên giọng ở câu hỏi Yes/No tạo cảm giác thân thiện và cởi mở.',
      },
    ],
  },
];
