import { ReadingLesson } from '@/types/reading';

export const invoiceOrderLesson: ReadingLesson = {
  id: 'reading-invoices-orders',
  categoryId: 'invoices-orders',
  title: 'Invoices, Receipts & Order Inquiries',
  titleVi: 'Bắt Bệnh Hóa Đơn, Đơn Hàng & Thắc Mắc Chi Phí',
  subtitle: 'Kỹ năng quét bảng dữ liệu, tính toán số học siêu tốc và phát hiện chênh lệch chiết khấu.',
  difficulty: 'Core TOEIC',
  frequency: '★★★★★',
  tag: 'TOEIC Part 7 Dữ Liệu Bảng',
  estimatedTime: '3 phút đọc hiểu',

  nativeMindset: {
    coreIntuition:
      'Hóa đơn (Invoice), biên lai (Receipt) hoặc biểu mẫu đơn hàng (Order Form) chứa lượng lớn số liệu và ký hiệu mã hàng. ĐỪNG BAO GIỜ đọc từng dòng từ trái sang phải. Hãy định vị cấu trúc bảng: [Mô tả hàng hóa - Description], [Số lượng - Qty], [Đơn giá - Unit Price], [Phí vận chuyển - Shipping], và [Ghi chú điều khoản - Terms & Conditions] ở chân trang.',
    readingSpeedSecret:
      'Quan sát xem có giảm giá (Discount / Promotion code) hay không. Trong các bài TOEIC Part 7 có hóa đơn, 80% câu hỏi đòi hỏi tính nhẩm phép trừ đơn giản: Subtotal - Coupon + Shipping fee = Balance Due.',
    vietnameseMistakeWarning:
      'Nhiều bạn đọc toàn bộ bảng giá trước khi đọc câu hỏi. Đây là lỗi lãng phí thời gian số 1! Hãy đọc lướt tiêu đề bảng 5 giây, sau đó đọc thẳng CÂU HỎI để biết mình cần tìm tên sản phẩm nào hoặc mã đơn hàng nào.',
  },

  attackStrategy: {
    step1: 'Đọc câu hỏi trước: Xác định từ khóa (Tên mặt hàng, Mã số Invoice #, Ngày xuất đơn, hoặc tên khách hàng).',
    step2: 'Dò thẳng vào cột tương ứng trong bảng: Dừng mắt tại dòng chứa mặt hàng được hỏi để lấy số lượng và đơn giá.',
    step3: 'Kiểm tra phần ghi chú chân bảng (Footer Notes): Nơi chứa chính sách đổi trả (Return policy within 30 days), bảo hành (Warranty), hoặc điều kiện giao hàng hỏa tốc (Expedited freight).',
    proTip: 'Từ "Waived" có nghĩa là được bãi bỏ / miễn phí (ví dụ: "Shipping fee waived for orders over $100"). Đây là từ vựng ăn điểm cực cao!',
  },

  goldenParaphrases: [
    {
      original: 'balance due / amount payable',
      paraphrased: 'total amount owed / outstanding charge',
      contextVi: 'Số tiền cuối cùng khách hàng còn phải thanh toán',
    },
    {
      original: 'expedited delivery / express freight',
      paraphrased: 'rush delivery / faster shipping option',
      contextVi: 'Dịch vụ giao hàng hỏa tốc có tính phụ phí',
    },
    {
      original: 'reimburse / issue a refund',
      paraphrased: 'credit the account / return money',
      contextVi: 'Hoàn lại tiền cho khách hàng khi có lỗi thanh toán hoặc trả hàng',
    },
    {
      original: 'defective / damaged item',
      paraphrased: 'faulty / imperfect merchandise',
      contextVi: 'Sản phẩm bị lỗi kỹ thuật hoặc trầy xước lúc vận chuyển',
    },
    {
      original: 'deduct / markdown',
      paraphrased: 'subtract / discount / reduce the price',
      contextVi: 'Khấu trừ hoặc chiết khấu giảm giá trực tiếp vào hóa đơn',
    },
  ],

  primaryPassage: {
    type: 'Invoice',
    title: 'Hóa đơn thiết bị văn phòng - PrimeTech Solutions',
    header: {
      from: 'PrimeTech Office Solutions Inc., Seattle, WA',
      to: 'Vanguard Marketing Agency (Attn: Clara Bennett)',
      date: 'Order Date: August 19 | Invoice Date: August 21',
      refNumber: 'INV-2024-8841',
    },
    content: `INVOICE # INV-2024-8841
Customer Account: VMA-77401
Payment Status: PAID VIA CORPORATE CARD (Ending in 4092)

ITEM SUMMARY:
-------------------------------------------------------------------------------------
Item Code | Description                         | Qty | Unit Price | Total Price
-------------------------------------------------------------------------------------
PT-410    | Ergonomic Mesh Office Chair (Black) | 4   | $180.00    | $720.00
PT-802    | Dual-Arm Monitor Desk Mount         | 4   | $65.00     | $260.00
PT-115    | Wireless Mechanical Keyboard Set    | 4   | $85.00     | $340.00
PT-990    | Heavy-Duty Shredder (Cross-Cut)     | 1   | $220.00    | $220.00
-------------------------------------------------------------------------------------
SUBTOTAL:                                                           $1,540.00
PROMO DISCOUNT (Code: SUMMERVANGUARD - 10% on items):             -$154.00
DELIVERY METHOD: Two-Day Expedited Courier (Flat Rate):              +$45.00
STATE SALES TAX (8% applied to discounted subtotal):               +$110.88
-------------------------------------------------------------------------------------
TOTAL AMOUNT CHARGED:                                               $1,541.88

NOTES & RETURN TERMS:
• All hardware items include a complimentary 12-month manufacturer replacement warranty.
• Items may be returned within 30 days of receipt provided they remain in original packaging. A 15% restocking fee applies to opened electronics unless determined defective upon arrival.
• For billing inquiries or damaged shipments, contact client-care@primetech.com.`,
    vietnameseTranslation: `HÓA ĐƠN # INV-2024-8841
Tài khoản khách hàng: VMA-77401
Trạng thái thanh toán: ĐÃ THANH TOÁN QUA THẺ DOANH NGHIỆP (Đuôi 4092)

BẢNG TỔNG HỢP MẶT HÀNG:
-------------------------------------------------------------------------------------
Mã hàng   | Mô tả                               | SL  | Đơn giá    | Thành tiền
-------------------------------------------------------------------------------------
PT-410    | Ghế văn phòng công thái học (Đen)   | 4   | $180.00    | $720.00
PT-802    | Tay đỡ màn hình đôi gắn bàn         | 4   | $65.00     | $260.00
PT-115    | Bộ bàn phím cơ không dây            | 4   | $85.00     | $340.00
PT-990    | Máy hủy tài liệu công suất lớn      | 1   | $220.00    | $220.00
-------------------------------------------------------------------------------------
TỔNG PHỤ (SUBTOTAL):                                                $1,540.00
MÃ KHUYẾN MÃI (SUMMERVANGUARD - Giảm 10%):                         -$154.00
PHƯƠNG THỨC GIAO HÀNG: Chuyển phát hỏa tốc 2 ngày (Đồng giá):         +$45.00
THUẾ BÁN HÀNG TIỂU BANG (8% áp dụng trên tổng phụ sau giảm):        +$110.88
-------------------------------------------------------------------------------------
TỔNG SỐ TIỀN ĐÃ THANH TOÁN:                                         $1,541.88

GHI CHÚ & ĐIỀU KHOẢN ĐỔI TRẢ:
• Mọi thiết bị phần cứng đều bao gồm bảo hành đổi mới của nhà sản xuất miễn phí trong 12 tháng.
• Hàng hóa có thể được trả lại trong vòng 30 ngày kể từ ngày nhận hàng với điều kiện còn nguyên bao bì gốc. Phí lưu kho 15% áp dụng cho đồ điện tử đã mở hộp trừ khi sản phẩm được xác định bị lỗi khi nhận hàng.
• Mọi thắc mắc về hóa đơn hoặc hàng bị hư hỏng, vui lòng liên hệ client-care@primetech.com.`,
    keyHighlights: [
      {
        text: 'PROMO DISCOUNT (Code: SUMMERVANGUARD - 10% on items): -$154.00',
        type: 'signal',
        note: 'Được giảm giá 10% trực tiếp trên tổng giá trị hàng hóa.',
      },
      {
        text: 'Two-Day Expedited Courier (Flat Rate): +$45.00',
        type: 'paraphrase',
        note: 'Dịch vụ giao hàng hỏa tốc 2 ngày (= expedited / rush delivery).',
      },
      {
        text: 'complimentary 12-month manufacturer replacement warranty',
        type: 'purpose',
        note: 'Bảo hành 1 năm miễn phí từ nhà sản xuất.',
      },
      {
        text: '15% restocking fee applies to opened electronics unless determined defective',
        type: 'action',
        note: 'Bẫy điều kiện: Nếu mở hộp mà không phải hàng lỗi thì bị trừ 15% phí hoàn kho.',
      },
    ],
  },

  commonTraps: [
    {
      trapName: 'Bẫy Tính nhẩm Chiết khấu (Discount Trap)',
      trapDescription: 'Đề hỏi: "How much did Vanguard Marketing Agency save using a promotional discount?". Nhiều thí sinh nhìn nhầm vào dòng thuế ($110.88) hoặc tiền cước giao hàng ($45.00).',
      howToAvoid: 'Tìm trực tiếp dòng có dấu trừ (-$) hoặc chữ "Discount / Savings". Số tiền tiết kiệm được là $154.00.',
      examplePassageSnippet: 'PROMO DISCOUNT ... -$154.00',
      distractorOption: '$45.00',
      correctOption: '$154.00',
    },
    {
      trapName: 'Bẫy Phí hoàn kho (Restocking Fee Exception)',
      trapDescription: 'Đề hỏi: "When is the 15% restocking fee waived for returned opened electronics?". Phương án bẫy: khi trả trong vòng 30 ngày, khi có hóa đơn gốc.',
      howToAvoid: 'Đọc kỹ mệnh đề sau chữ "unless": "unless determined defective upon arrival". Tức là chỉ được miễn phí hoàn kho nếu hàng bị lỗi lúc nhận.',
      examplePassageSnippet: 'unless determined defective upon arrival',
      distractorOption: 'If returned within 14 business days',
      correctOption: 'If the equipment is found to be faulty upon delivery',
    },
  ],

  quiz: [
    {
      question: 'Which item did Vanguard Marketing Agency purchase only ONE unit of?',
      questionType: 'detail',
      options: [
        'PT-410 Ergonomic Mesh Office Chair',
        'PT-802 Dual-Arm Monitor Mount',
        'PT-990 Heavy-Duty Shredder',
        'PT-115 Wireless Mechanical Keyboard',
      ],
      correctAnswer: 2,
      explanation: 'Dò cột "Qty": Mã PT-990 (Heavy-Duty Shredder) có số lượng là 1 (Unit price: $220.00), trong khi 3 mặt hàng còn lại đều mua số lượng 4.',
      clueSnippet: 'PT-990 | Heavy-Duty Shredder (Cross-Cut) | Qty: 1',
      paraphraseUsed: 'Qty: 1 = purchase only ONE unit',
    },
    {
      question: 'What is indicated about the shipping method chosen for this order?',
      questionType: 'detail',
      options: [
        'It was provided free of charge due to high order volume',
        'It is an accelerated service costing a flat fee of $45',
        'It requires Clara Bennett to pick up items at a local warehouse',
        'It was delayed due to severe weather in Seattle',
      ],
      correctAnswer: 1,
      explanation: 'Dòng vận chuyển ghi: "Two-Day Expedited Courier (Flat Rate): +$45.00". "Expedited" tương đương với "accelerated / faster", và có mức phí cố định là $45.',
      clueSnippet: 'Two-Day Expedited Courier (Flat Rate): +$45.00',
      paraphraseUsed: 'Two-Day Expedited = accelerated service',
    },
    {
      question: 'Under what condition will a buyer avoid the 15% restocking fee on opened items?',
      questionType: 'inference',
      options: [
        'If the item arrives damaged or malfunctioning',
        'If the buyer contacts Clara Bennett before August 25',
        'If payment was made with a personal credit card',
        'If the buyer exchanges the item for monitor mounts',
      ],
      correctAnswer: 0,
      explanation: 'Ghi chú nêu: "A 15% restocking fee applies to opened electronics unless determined defective upon arrival". Từ "defective" được paraphrase thành "damaged or malfunctioning".',
      clueSnippet: 'unless determined defective upon arrival',
      paraphraseUsed: 'defective = damaged or malfunctioning',
    },
  ],
};
