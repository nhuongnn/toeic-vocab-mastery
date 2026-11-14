import { GrammarLesson } from '@/types/grammar';

export const conditionalsLessons: GrammarLesson[] = [
  {
    id: 'conditional-real-business-unless',
    categoryId: 'conditionals',
    title: 'Actionable Business Conditionals & The "Unless" Exception Mindset',
    titleVi: 'Điều kiện kinh doanh thực tế & Tư duy Ngoại trừ với "Unless"',
    subtitle: 'Cách người bản xứ đưa ra cam kết, điều khoản hợp đồng và chính sách dịch vụ.',
    difficulty: 'Core TOEIC',
    frequency: '★★★★★',
    tag: 'Điều khoản hợp đồng & Chính sách',

    nativeMindset: {
      coreIntuition:
        'Trong sách vở có 4 loại câu điều kiện (0, 1, 2, 3), nhưng trong công việc hàng ngày và TOEIC, 80% thời lượng người bản xứ dùng ĐIỀU KIỆN LOẠI 1 (Có thật và có thể thực hiện được - Actionable). Họ dùng nó để đưa ra lời hứa, cam kết bán hàng, điều kiện giảm giá hoặc hạn ngạch.',
      mentalImage:
        'Tưởng tượng một công tắc điện (If): Bạn bật công tắc lên (If condition is met), bóng đèn sáng (Result will happen). Rất thực tế, sòng phẳng và rõ ràng.',
      whyNativesSayThis:
        'Từ "UNLESS" mang tư duy "TRỪ KHI / NGOẠI TRỪ TRƯỜNG HỢP". Người bản xứ thích dùng "Unless" hơn "If not" trong hợp đồng vì nó đặt ra một NGOẠI LỆ DUY NHẤT một cách dứt khoát: "The warranty is void unless installed by an authorized technician."',
      vietnameseMistakeWarning:
        'Sau vế "If" hoặc "Unless", người Việt hay có thói quen cho từ "will" vào (ví dụ: "If it will rain tomorrow..."). Người bản xứ KHÔNG BAO GIỜ dùng "will" trong vế điều kiện, họ luôn dùng thì HIỆN TẠI ĐƠN để chỉ điều kiện tương lai!',
    },

    rules: [
      {
        ruleTitle: 'Câu điều kiện loại 1 trong công sở (Commitment & Policy)',
        formula: 'If + S + V(hiện tại đơn), S + will / can / may + V(nguyên thể)',
        description: 'Đưa ra cam kết hoặc hệ quả khả thi trong tương lai.',
        whenToUse:
          'If you register before Friday, you will receive a 20% early-bird discount.\nIf the shipment arrives late, the supplier will compensate the client.',
        whenToAvoid: 'Tuyệt đối KHÔNG dùng "will" ngay sau If (không nói "If you will order...").',
      },
      {
        ruleTitle: 'Cấu trúc ngoại lệ "Unless" (= If ... not)',
        formula: 'Unless + S + V(khẳng định), S + will / may / must ...',
        description: 'Mang nghĩa "Trừ phi / Nếu không". Bản thân Unless đã mang nghĩa phủ định.',
        whenToUse:
          'Unless otherwise stated, all employees must attend the quarterly meeting.\nOrders will be processed immediately unless cancellation is requested within 2 hours.',
        whenToAvoid: 'Không dùng dạng phủ định sau Unless (không nói "Unless you do not agree").',
      },
    ],

    examples: [
      {
        en: 'If our budget proposal is approved, we will hire three additional software engineers.',
        vi: 'Nếu đề xuất ngân sách được duyệt, chúng tôi sẽ tuyển thêm ba kỹ sư phần mềm.',
        context: 'workplace',
        note: 'Vế If chia thì hiện tại đơn bị động (is approved), vế chính dùng "will hire".',
        highlightWords: ['If', 'is approved', 'we will hire'],
      },
      {
        en: 'Unless authorized by the project manager, visitors are not permitted on the construction site.',
        vi: 'Trừ khi được sự cho phép của quản lý dự án, khách tham quan không được phép vào công trường.',
        context: 'toeic',
        note: 'Cụm "Unless authorized by..." là dạng rút gọn thường gặp trong các thông báo an toàn TOEIC.',
        highlightWords: ['Unless authorized by', 'are not permitted'],
      },
      {
        en: 'The meeting will take place as scheduled unless you hear otherwise from my assistant.',
        vi: 'Cuộc họp vẫn sẽ diễn ra như lịch hẹn trừ phi bạn nhận được thông báo khác từ trợ lý của tôi.',
        context: 'daily',
        note: 'Mẫu câu công sở quen thuộc khi xác nhận lịch trình: "unless you hear otherwise".',
        highlightWords: ['unless you hear otherwise'],
      },
    ],

    commonTraps: [
      {
        wrong: 'If the supplier will deliver the parts on time, we will finish assembly.',
        correct: 'If the supplier delivers the parts on time, we will finish assembly.',
        nativeReason:
          'Quy tắc bất di bất dịch của tiếng Anh: Không dùng "will" trong mệnh đề trạng ngữ chỉ thời gian và điều kiện (If, When, As soon as, Before, After).',
        vietnameseTrap: 'Dịch "Nếu nhà cung cấp SẼ giao hàng..." thành "If the supplier WILL deliver...".',
      },
      {
        wrong: 'Unless you do not submit the receipt, we cannot process your refund.',
        correct: 'Unless you submit the receipt, we cannot process your refund.',
        nativeReason:
          'Bản thân "Unless" đã có nghĩa là "If not". Dùng thêm "do not" tạo thành phủ định kép sai ngữ pháp.',
        vietnameseTrap: 'Dịch từng chữ "Trừ khi bạn KHÔNG nộp hóa đơn...".',
      },
    ],

    toeicHacks: {
      targetParts: 'TOEIC Part 5 & Part 6',
      hackTitle: 'Mẹo "Unless otherwise + V3" ăn trọn điểm Part 5',
      hackContent:
        'Trong đề thi TOEIC, có một cụm thành ngữ cố định xuất hiện với tần suất cực cao: "Unless otherwise [noted / stated / specified / requested]".\nNếu thấy "Unless otherwise _____", 99% đáp án là một Phân từ hai (V3/P.P) mang nghĩa "Trừ khi có ghi chú / nêu rõ khác đi".',
      quickSignalWords: [
        'Unless otherwise noted',
        'Unless otherwise stated',
        'Unless otherwise specified',
        'If applicable',
        'If necessary',
      ],
      ruleOfThumb: 'Unless otherwise + V3 (noted, stated, specified).',
    },

    quiz: [
      {
        question:
          'All team members are expected to attend the weekly status review _____ granted prior approval by their direct supervisor.',
        options: ['if', 'unless', 'without', 'except'],
        correctAnswer: 1,
        explanation:
          'Ý nghĩa: Mọi thành viên phải tham dự TRỪ PHI được cấp phép trước bởi quản lý trực tiếp. Cấu trúc rút gọn "unless granted prior approval" (= unless they are granted).',
        toeicTip: 'Phân biệt "unless" (liên từ) với "without / except" (giới từ, theo sau là danh từ).',
      },
      {
        question:
          'Unless otherwise _____, the product demonstration will begin promptly at 2:00 PM in Conference Room B.',
        options: ['indicate', 'indicating', 'indicated', 'indicates'],
        correctAnswer: 2,
        explanation:
          'Cụm từ cố định trong văn bản hành chính & TOEIC: "Unless otherwise indicated" (Trừ khi có chỉ dẫn khác).',
        toeicTip: 'Học thuộc lòng: Unless otherwise + V-ed.',
      },
    ],
  },
  {
    id: 'conditional-inversion-should-subjunctive',
    categoryId: 'conditionals',
    title: 'Business Inversions with "Should" & Formal Subjunctives',
    titleVi: 'Đảo ngữ công sở với "Should" & Thể Giả định trang trọng',
    subtitle: 'Cách viết email chuyên nghiệp đẳng cấp cao và "tủ đè" trong đề thi TOEIC 700+.',
    difficulty: 'Advanced Mastery',
    frequency: '★★★★★',
    tag: 'Email chuyên nghiệp & Đảo ngữ',

    nativeMindset: {
      coreIntuition:
        'Tại sao ở cuối hầu hết các email chăm sóc khách hàng của các tập đoàn quốc tế, bạn luôn thấy câu: "Should you have any questions, please feel free to contact us"?\nTại sao họ không viết "If you have any questions"?\nBởi vì: Đảo ngữ với "Should" vừa loại bỏ chữ "If", vừa tạo ra một sắc thái cực kỳ LỊCH SỰ, TRANG TRỌNG VÀ CHUYÊN NGHIỆP (Highly polite and respectful).',
      mentalImage:
        'Nó giống như cử chỉ người phục vụ trong nhà hàng 5 sao hơi cúi đầu và nói "Nếu quý khách cần thêm điều gì, tôi luôn sẵn sàng phục vụ".',
      whyNativesSayThis:
        'Trong thể giả định thức (Subjunctive): Sau các tính từ hoặc động từ chỉ sự cấp bách hoặc kiến nghị (essential, vital, recommend, insist), người bản xứ luôn để động từ ở dạng NGUYÊN THỂ KHÔNG CHIA (bare infinitive) vì họ đang nói về một HÀNH ĐỘNG CẦN ĐƯỢC THỰC HIỆN, chứ không phải một sự thật đang diễn ra.',
      vietnameseMistakeWarning:
        'Thấy chủ ngữ là ngôi thứ ba số ít (he, she, Mr. Smith) là theo quán tính thêm "s/es" vào động từ trong câu giả định. Nhưng với Subjunctive: "It is essential that he BE on time" (dùng "be", không dùng "is"!).',
    },

    rules: [
      {
        ruleTitle: 'Công thức Đảo ngữ điều kiện loại 1 với "Should"',
        formula: 'SHOULD + S + V(nguyên thể), (S + will V / Câu mệnh lệnh Please...)',
        description: 'Thay thế hoàn toàn cho "If + S + V". Dùng ở đầu câu.',
        whenToUse:
          'Should you require further assistance, please contact customer support.\nShould the shipment arrive damaged, please take photographs immediately.',
      },
      {
        ruleTitle: 'Cấu trúc Giả định thức công sở (Subjunctive Mood)',
        formula: 'S + recommend / suggest / request / insist + THAT + S + (SHOULD) + V(nguyên thể)',
        description:
          'Sau các động từ hoặc tính từ (essential, mandatory, crucial, imperative), động từ ở mệnh đề that luôn ở dạng NGUYÊN THỂ (người Anh/Mỹ đã lược bỏ "should").',
        whenToUse: 'The auditor recommended that the accounting team RETAIN (không thêm s) all receipts for five years.',
      },
    ],

    examples: [
      {
        en: 'Should you have any questions regarding your reservation, do not hesitate to reach out.',
        vi: 'Nếu quý khách có bất kỳ câu hỏi nào liên quan đến việc đặt chỗ, đừng ngần ngại liên hệ với chúng tôi.',
        context: 'workplace',
        note: 'Bản chất câu là: "If you have any questions...". Đảo "Should" lên đầu làm câu văn trang trọng hơn rất nhiều.',
        highlightWords: ['Should you have any questions', 'reach out'],
      },
      {
        en: 'It is imperative that every participant submit their feedback before the end of the day.',
        vi: 'Việc mỗi người tham gia nộp lại ý kiến phản hồi trước cuối ngày là điều tối quan trọng.',
        context: 'toeic',
        note: 'Sau tính từ "imperative", chủ ngữ là "every participant" nhưng động từ vẫn giữ nguyên mẫu là "submit" (không chia s).',
        highlightWords: ['imperative that', 'submit their feedback'],
      },
    ],

    commonTraps: [
      {
        wrong: 'Should you will need extra tickets, call me.',
        correct: 'Should you need extra tickets, call me.',
        nativeReason:
          'Trong cấu trúc đảo ngữ "Should + S + V", động từ theo sau luôn là động từ nguyên mẫu (bare infinitive), không có "will".',
        vietnameseTrap: 'Cho thêm "will" vào sau "Should you".',
      },
      {
        wrong: 'The doctor advised that he takes the medication twice daily.',
        correct: 'The doctor advised that he take the medication twice daily.',
        nativeReason:
          'Sau động từ khuyên bảo / yêu cầu (advise that), mệnh đề giả định bắt buộc dùng động từ nguyên thể "take", không chia "takes".',
        vietnameseTrap: 'Chia "takes" vì thấy chủ ngữ là "he".',
      },
    ],

    toeicHacks: {
      targetParts: 'TOEIC Part 5',
      hackTitle: 'Mẹo phát hiện Đảo ngữ "Should" và Giả định thức',
      hackContent:
        '1. Nếu chỗ trống ĐỨNG ĐẦU CÂU, theo sau là [Chủ ngữ] + [Động từ nguyên thể], và vế sau là câu mệnh lệnh "Please..." -> 99% chọn "SHOULD".\n2. Nếu thấy các từ: recommend, suggest, insist, demand, ask, require HOẶC essential, crucial, vital, imperative, mandatory + THAT + S + [Chỗ trống] -> 100% khoanh ĐỘNG TỪ NGUYÊN MẪU (bare infinitive, không s/es, không ed).',
      quickSignalWords: [
        'Should you need / require / have',
        'It is essential that S + V(bare)',
        'It is mandatory that S + V(bare)',
        'recommended that S + V(bare)',
      ],
      ruleOfThumb: 'Đầu câu + S + V nguyên thể = SHOULD; That sau từ chỉ kiến nghị/cấp bách = V NGUYÊN MẪU.',
    },

    quiz: [
      {
        question:
          '_____ you encounter any technical difficulties during the online payment process, please call our 24/7 hotline.',
        options: ['If', 'Should', 'Unless', 'Provided'],
        correctAnswer: 1,
        explanation:
          'Vế sau là câu mệnh lệnh "please call...". Đảo ngữ câu điều kiện loại 1 đứng đầu câu: "Should you encounter..." (= If you encounter).',
        toeicTip: 'Cấu trúc xuất hiện liên tục trong TOEIC Part 5 & Part 7.',
      },
      {
        question:
          'The safety inspector insisted that the factory manager _____ all emergency exits immediately.',
        options: ['inspects', 'inspected', 'inspect', 'inspecting'],
        correctAnswer: 2,
        explanation:
          'Theo cấu trúc giả định thức sau động từ "insisted that", động từ phải ở dạng nguyên mẫu không chia: "inspect".',
        toeicTip: 'Gặp "insist that S + V" -> chọn ngay V nguyên mẫu.',
      },
    ],
  },
];
