import { Part2Question } from '@/types/listening';

export const part2Questions: Part2Question[] = [
  {
    id: 'p2-001',
    part: 2,
    promptQuestion: 'Where can I find the quarterly revenue report?',
    promptQuestionVi: 'Tôi có thể tìm thấy bản báo cáo doanh thu theo quý ở đâu?',
    promptType: 'Wh-Question (Indirect Response)',
    options: [
      {
        label: 'A',
        text: 'It was uploaded to the shared cloud drive an hour ago.',
        translationVi: 'Nó đã được tải lên ổ đĩa chung trên đám mây cách đây một giờ.',
      },
      {
        label: 'B',
        text: 'Yes, our quarterly earnings grew by twelve percent.',
        translationVi: 'Vâng, thu nhập hàng quý của chúng ta đã tăng 12%.',
      },
      {
        label: 'C',
        text: 'I reported it to the human resources department.',
        translationVi: 'Tôi đã báo cáo việc đó với phòng nhân sự.',
      },
    ],
    correctAnswer: 'A',
    explanationVi: 'Câu hỏi bắt đầu bằng "Where" (ở đâu). Đáp án A chỉ rõ vị trí lưu trữ ("shared cloud drive").',
    trapAnalysis: {
      trapName: 'Bẫy trả lời Yes/No cho câu hỏi Wh- & Bẫy lặp từ (Same-word trap)',
      distractors: [
        { label: 'B', reason: 'Câu hỏi Wh- tuyệt đối không bắt đầu bằng Yes/No; ngoài ra lặp lại từ "quarterly" gây nhiễu.' },
        { label: 'C', reason: 'Bẫy lặp từ: dùng động từ "reported" cùng gốc với danh từ "report" trong câu hỏi nhưng sai ngữ cảnh.' },
      ],
    },
    keyVocabulary: [
      { word: 'quarterly revenue', meaning: 'doanh thu hàng quý' },
      { word: 'shared cloud drive', meaning: 'ổ đĩa lưu trữ đám mây dùng chung' },
    ],
    accent: 'en-US',
    context: 'Finance & Administration',
  },
  {
    id: 'p2-002',
    part: 2,
    promptQuestion: 'Who is responsible for coordinating the upcoming client luncheon?',
    promptQuestionVi: 'Ai chịu trách nhiệm điều phối bữa tiệc trưa sắp tới với khách hàng?',
    promptType: 'Wh-Question (Indirect Response)',
    options: [
      {
        label: 'A',
        text: 'At the Italian bistro on Maple Avenue.',
        translationVi: 'Tại quán ăn Ý trên đại lộ Maple.',
      },
      {
        label: 'B',
        text: 'Didn’t Sandra volunteer for that yesterday?',
        translationVi: 'Hôm qua Sandra đã tình nguyện nhận việc đó rồi mà đúng không?',
      },
      {
        label: 'C',
        text: 'No, we haven’t ordered the desserts yet.',
        translationVi: 'Chưa, chúng tôi vẫn chưa gọi món tráng miệng.',
      },
    ],
    correctAnswer: 'B',
    explanationVi: 'Câu hỏi "Who" hỏi người phụ trách. Đáp án B là dạng câu phản hồi gián tiếp bằng câu hỏi ngược (Counter-question), ám chỉ Sandra là người phụ trách.',
    trapAnalysis: {
      trapName: 'Bẫy trả lời nơi chốn cho câu hỏi Who & Bẫy Yes/No',
      distractors: [
        { label: 'A', reason: 'Bẫy trả lời địa điểm (phù hợp cho câu Where, không phải Who).' },
        { label: 'C', reason: 'Bẫy Yes/No cho câu hỏi Wh- và bẫy liên tưởng chủ đề ăn uống (luncheon -> desserts).' },
      ],
    },
    keyVocabulary: [
      { word: 'coordinate', meaning: 'điều phối, tổ chức' },
      { word: 'client luncheon', meaning: 'tiệc ăn trưa với khách hàng' },
      { word: 'volunteer', meaning: 'tự nguyện xung phong nhận việc' },
    ],
    accent: 'en-GB',
    context: 'Office & Networking',
  },
  {
    id: 'p2-003',
    part: 2,
    promptQuestion: 'When is the new security badge policy scheduled to take effect?',
    promptQuestionVi: 'Khi nào chính sách thẻ an ninh mới dự kiến bắt đầu có hiệu lực?',
    promptType: 'Wh-Question (Direct Answer)',
    options: [
      {
        label: 'A',
        text: 'Starting on the first Monday of next month.',
        translationVi: 'Bắt đầu từ thứ Hai đầu tiên của tháng tới.',
      },
      {
        label: 'B',
        text: 'You can wear it around your neck.',
        translationVi: 'Bạn có thể đeo nó quanh cổ.',
      },
      {
        label: 'C',
        text: 'Because of recent unauthorized entries.',
        translationVi: 'Bởi vì những vụ xâm nhập trái phép gần đây.',
      },
    ],
    correctAnswer: 'A',
    explanationVi: 'Câu hỏi "When" hỏi về mốc thời gian. Đáp án A cung cấp thời điểm chính xác: "the first Monday of next month".',
    trapAnalysis: {
      trapName: 'Bẫy trả lời cách thức và lý do (How & Why traps)',
      distractors: [
        { label: 'B', reason: 'Trả lời cho câu hỏi How (hướng dẫn cách đeo thẻ an ninh).' },
        { label: 'C', reason: 'Trả lời cho câu hỏi Why (Because of...), giải thích lý do ban hành chính sách.' },
      ],
    },
    keyVocabulary: [
      { word: 'security badge', meaning: 'thẻ ra vào an ninh' },
      { word: 'take effect', meaning: 'có hiệu lực thi hành' },
    ],
    accent: 'en-US',
    context: 'Facility & Workplace Policy',
  },
  {
    id: 'p2-004',
    part: 2,
    promptQuestion: 'Has the shipment of replacement electronic components arrived yet?',
    promptQuestionVi: 'Lô hàng linh kiện điện tử thay thế đã về tới nơi chưa?',
    promptType: 'Yes/No Question',
    options: [
      {
        label: 'A',
        text: 'Let me check with the warehouse supervisor.',
        translationVi: 'Để tôi kiểm tra lại với giám sát kho nhé.',
      },
      {
        label: 'B',
        text: 'Yes, the electronics store is having a discount sale.',
        translationVi: 'Có, cửa hàng điện máy đang có đợt giảm giá.',
      },
      {
        label: 'C',
        text: 'About fifty dollars per unit.',
        translationVi: 'Khoảng 50 đô la mỗi chiếc.',
      },
    ],
    correctAnswer: 'A',
    explanationVi: 'Đáp án A là câu trả lời gián tiếp cực kỳ phổ biến trong đề thi TOEIC ETS: khi người nghe chưa chắc chắn về thông tin, họ sẽ kiểm tra với bộ phận liên quan ("Let me check with...").',
    trapAnalysis: {
      trapName: 'Bẫy Yes/No giả tạo & Bẫy lặp từ "electronics"',
      distractors: [
        { label: 'B', reason: 'Mặc dù có từ Yes nhưng nội dung sai lệch hoàn toàn, bẫy lặp từ "electronics".' },
        { label: 'C', reason: 'Bẫy giá tiền trả lời cho câu hỏi How much.' },
      ],
    },
    keyVocabulary: [
      { word: 'shipment', meaning: 'lô hàng vận chuyển' },
      { word: 'replacement components', meaning: 'linh kiện thay thế' },
    ],
    accent: 'en-AU',
    context: 'Supply Chain & Manufacturing',
  },
  {
    id: 'p2-005',
    part: 2,
    promptQuestion: 'You’ve already submitted the revised marketing budget, haven’t you?',
    promptQuestionVi: 'Bạn đã nộp ngân sách tiếp thị sửa đổi rồi, có phải không?',
    promptType: 'Tag Question (Câu hỏi đuôi)',
    options: [
      {
        label: 'A',
        text: 'The television commercial was very creative.',
        translationVi: 'Quảng cáo truyền hình rất sáng tạo.',
      },
      {
        label: 'B',
        text: 'Actually, the finance team gave me an extension until Friday.',
        translationVi: 'Thực ra thì đội tài chính đã gia hạn cho tôi tới thứ Sáu.',
      },
      {
        label: 'C',
        text: 'To recruit additional graphic designers.',
        translationVi: 'Để tuyển thêm chuyên viên thiết kế đồ họa.',
      },
    ],
    correctAnswer: 'B',
    explanationVi: 'Câu hỏi đuôi xác nhận việc nộp bài. Đáp án B đưa ra sự thật lịch sự bằng từ "Actually" để thông báo việc được gia hạn thời gian ("extension until Friday").',
    trapAnalysis: {
      trapName: 'Bẫy liên tưởng ngành Marketing & Bẫy mục đích To-infinitive',
      distractors: [
        { label: 'A', reason: 'Bẫy chủ đề: marketing -> television commercial.' },
        { label: 'C', reason: 'Cấu trúc "To + V" thường trả lời cho câu hỏi What for hoặc Why.' },
      ],
    },
    keyVocabulary: [
      { word: 'revised budget', meaning: 'ngân sách đã chỉnh sửa' },
      { word: 'extension', meaning: 'sự gia hạn thời gian' },
    ],
    accent: 'en-US',
    context: 'Marketing & Budgeting',
  },
  {
    id: 'p2-006',
    part: 2,
    promptQuestion: 'Why hasn’t the air conditioning on the fourth floor been repaired?',
    promptQuestionVi: 'Tại sao điều hòa ở tầng 4 vẫn chưa được sửa chữa?',
    promptType: 'Wh-Question (Indirect Response)',
    options: [
      {
        label: 'A',
        text: 'The maintenance contractor is still waiting on a custom part.',
        translationVi: 'Nhà thầu bảo trì vẫn đang phải chờ một linh kiện đặt riêng.',
      },
      {
        label: 'B',
        text: 'It’s set to twenty-two degrees Celsius.',
        translationVi: 'Nó đang được đặt ở 22 độ C.',
      },
      {
        label: 'C',
        text: 'Yes, the repair technician arrived at nine.',
        translationVi: 'Vâng, kỹ thuật viên sửa chữa đã đến lúc 9 giờ.',
      },
    ],
    correctAnswer: 'A',
    explanationVi: 'Câu hỏi Why phủ định ("Why hasn\'t..."). Đáp án A giải thích nguyên nhân chậm trễ: bên bảo trì đang đợi linh kiện đặt riêng ("waiting on a custom part").',
    trapAnalysis: {
      trapName: 'Bẫy số liệu nhiệt độ & Bẫy Yes/No cho câu hỏi Why',
      distractors: [
        { label: 'B', reason: 'Bẫy liên tưởng điều hòa với nhiệt độ cài đặt.' },
        { label: 'C', reason: 'Bẫy trả lời Yes cho câu hỏi bắt đầu bằng Why.' },
      ],
    },
    keyVocabulary: [
      { word: 'maintenance contractor', meaning: 'nhà thầu bảo dưỡng thiết bị' },
      { word: 'custom part', meaning: 'linh kiện đặt làm theo yêu cầu riêng' },
    ],
    accent: 'en-GB',
    context: 'Office Facilities',
  },
  {
    id: 'p2-007',
    part: 2,
    promptQuestion: 'Would you like me to proofread that partnership contract before you email it?',
    promptQuestionVi: 'Bạn có muốn tôi đọc soát lỗi bản hợp đồng đối tác trước khi bạn gửi email không?',
    promptType: 'Suggestion / Offer',
    options: [
      {
        label: 'A',
        text: 'That would be a huge help, thank you!',
        translationVi: 'Được vậy thì giúp ích cho tôi nhiều lắm, cảm ơn bạn nhé!',
      },
      {
        label: 'B',
        text: 'About twenty pages long.',
        translationVi: 'Dài khoảng hai mươi trang.',
      },
      {
        label: 'C',
        text: 'I sent the package by registered mail.',
        translationVi: 'Tôi đã gửi gói bưu phẩm bằng thư bảo đảm.',
      },
    ],
    correctAnswer: 'A',
    explanationVi: 'Đây là câu đề nghị giúp đỡ ("Would you like me to..."). Đáp án A tiếp nhận lời đề nghị một cách nhiệt tình và cảm ơn.',
    trapAnalysis: {
      trapName: 'Bẫy trả lời độ dài văn bản & Bẫy bưu điện gửi thư',
      distractors: [
        { label: 'B', reason: 'Trả lời cho câu hỏi How long is the document.' },
        { label: 'C', reason: 'Bẫy đồng âm / liên tưởng gửi thư (email -> registered mail).' },
      ],
    },
    keyVocabulary: [
      { word: 'proofread', meaning: 'đọc soát lỗi chính tả & ngữ pháp' },
      { word: 'partnership contract', meaning: 'hợp đồng đối tác' },
    ],
    accent: 'en-US',
    context: 'Legal & Administration',
  },
  {
    id: 'p2-008',
    part: 2,
    promptQuestion: 'Are you taking the express train to the conference, or driving your car?',
    promptQuestionVi: 'Bạn sẽ đi tàu cao tốc đến hội thảo, hay là tự lái xe?',
    promptType: 'Choice Question (A or B)',
    options: [
      {
        label: 'A',
        text: 'I decided to take the train to avoid traffic delays.',
        translationVi: 'Tôi đã quyết định đi tàu để tránh bị kẹt xe trễ giờ.',
      },
      {
        label: 'B',
        text: 'Yes, the conference venue was fantastic.',
        translationVi: 'Có, địa điểm tổ chức hội nghị thật tuyệt vời.',
      },
      {
        label: 'C',
        text: 'Training sessions start promptly at eight.',
        translationVi: 'Các buổi đào tạo bắt đầu đúng 8 giờ.',
      },
    ],
    correctAnswer: 'A',
    explanationVi: 'Câu hỏi lựa chọn (A or B). Đáp án A chọn phương án tàu ("take the train") kèm theo lý do thuyết phục.',
    trapAnalysis: {
      trapName: 'Bẫy Yes/No trong câu hỏi lựa chọn & Bẫy đồng âm Train / Training',
      distractors: [
        { label: 'B', reason: 'Câu hỏi lựa chọn Or không dùng Yes/No để trả lời.' },
        { label: 'C', reason: 'Bẫy từ phát âm tương tự: train (tàu hỏa) vs training (đào tạo).' },
      ],
    },
    keyVocabulary: [
      { word: 'express train', meaning: 'tàu hỏa tốc hành' },
      { word: 'traffic delays', meaning: 'sự chậm trễ do tắc đường' },
    ],
    accent: 'en-AU',
    context: 'Travel & Conventions',
  },
  {
    id: 'p2-009',
    part: 2,
    promptQuestion: 'The copier in the third-floor workspace has run out of paper again.',
    promptQuestionVi: 'Máy photocopy ở khu làm việc tầng 3 lại hết giấy rồi.',
    promptType: 'Statement (Phát biểu tình huống)',
    options: [
      {
        label: 'A',
        text: 'There are extra boxes of paper in the supply closet.',
        translationVi: 'Có những thùng giấy dự phòng trong tủ đồ dùng văn phòng đó.',
      },
      {
        label: 'B',
        text: 'I ordered twenty copies of the agenda.',
        translationVi: 'Tôi đã đặt in hai mươi bản chương trình họp.',
      },
      {
        label: 'C',
        text: 'The newspaper subscription is forty dollars a year.',
        translationVi: 'Phí đặt báo dài hạn là bốn mươi đô la một năm.',
      },
    ],
    correctAnswer: 'A',
    explanationVi: 'Câu trần thuật nêu lên một sự cố thiếu vật tư. Đáp án A đưa ra giải pháp khắc phục ngay lập tức bằng cách chỉ nơi cất giấy dự phòng.',
    trapAnalysis: {
      trapName: 'Bẫy lặp từ copies và newspaper',
      distractors: [
        { label: 'B', reason: 'Bẫy lặp từ "copies" liên quan đến "copier".' },
        { label: 'C', reason: 'Bẫy từ "paper" -> "newspaper" (báo chí).' },
      ],
    },
    keyVocabulary: [
      { word: 'copier', meaning: 'máy photocopy' },
      { word: 'supply closet', meaning: 'tủ chứa văn phòng phẩm' },
    ],
    accent: 'en-US',
    context: 'Daily Office Operation',
  },
  {
    id: 'p2-010',
    part: 2,
    promptQuestion: 'Why don’t we test the remote presentation software before tomorrow’s call?',
    promptQuestionVi: 'Tại sao chúng ta không chạy thử phần mềm thuyết trình trực tuyến trước cuộc gọi ngày mai nhỉ?',
    promptType: 'Suggestion / Offer',
    options: [
      {
        label: 'A',
        text: 'Good idea, let’s schedule a ten-minute dry run.',
        translationVi: 'Ý hay đấy, hãy xếp lịch chạy thử 10 phút nhé.',
      },
      {
        label: 'B',
        text: 'Because he called from the airport terminal.',
        translationVi: 'Bởi vì anh ấy đã gọi từ nhà ga sân bay.',
      },
      {
        label: 'C',
        text: 'Yes, the software developer is located in London.',
        translationVi: 'Vâng, công ty phát triển phần mềm đặt trụ sở tại London.',
      },
    ],
    correctAnswer: 'A',
    explanationVi: '"Why don\'t we..." là cấu trúc đưa ra lời đề nghị / rủ rê cùng làm gì. Đáp án A đồng ý nhiệt tình ("Good idea") và đề xuất chạy thử ("dry run").',
    trapAnalysis: {
      trapName: 'Bẫy nhầm lẫn câu đề nghị Why don\'t we với câu hỏi lý do Why',
      distractors: [
        { label: 'B', reason: 'Bẫy dùng "Because" để trả lời câu hỏi cấu trúc Why don\'t we (đây là lời mời, không phải hỏi nguyên nhân).' },
        { label: 'C', reason: 'Bẫy trả lời lệch thông tin về địa điểm công ty phần mềm.' },
      ],
    },
    keyVocabulary: [
      { word: 'dry run', meaning: 'buổi diễn tập, buổi chạy thử' },
      { word: 'remote presentation', meaning: 'thuyết trình từ xa qua màn hình' },
    ],
    accent: 'en-GB',
    context: 'Technology & Meetings',
  },
  {
    id: 'p2-011',
    part: 2,
    promptQuestion: 'How many software licenses do we need to purchase for the new design team?',
    promptQuestionVi: 'Chúng ta cần mua bao nhiêu bản quyền phần mềm cho nhóm thiết kế mới?',
    promptType: 'Wh-Question (Indirect Response)',
    options: [
      {
        label: 'A',
        text: 'Human Resources just hired five full-time illustrators.',
        translationVi: 'Phòng Nhân sự vừa tuyển năm họa sĩ minh họa toàn thời gian.',
      },
      {
        label: 'B',
        text: 'They renew automatically on an annual basis.',
        translationVi: 'Chúng tự động gia hạn theo định kỳ hàng năm.',
      },
      {
        label: 'C',
        text: 'The driver’s license expired yesterday.',
        translationVi: 'Bằng lái xe đã hết hạn ngày hôm qua.',
      },
    ],
    correctAnswer: 'A',
    explanationVi: 'Câu hỏi "How many" hỏi số lượng. Đáp án A là câu trả lời ngầm định (inference): vì phòng Nhân sự vừa tuyển 5 người, nên sẽ cần mua 5 bản quyền.',
    trapAnalysis: {
      trapName: 'Bẫy từ đồng âm đa nghĩa (Software license vs Driver\'s license)',
      distractors: [
        { label: 'B', reason: 'Trả lời về chu kỳ gia hạn, không cung cấp thông tin số lượng.' },
        { label: 'C', reason: 'Bẫy nghĩa từ "license" (bản quyền phần mềm bị đánh tráo thành bằng lái xe).' },
      ],
    },
    keyVocabulary: [
      { word: 'software license', meaning: 'giấy phép bản quyền phần mềm' },
      { word: 'illustrator', meaning: 'họa sĩ vẽ minh họa' },
    ],
    accent: 'en-US',
    context: 'HR & IT Procurement',
  },
  {
    id: 'p2-012',
    part: 2,
    promptQuestion: 'Didn’t Ms. Tanaka leave the signed purchase order on your desk?',
    promptQuestionVi: 'Không phải cô Tanaka đã để đơn đặt hàng có chữ ký trên bàn làm việc của bạn sao?',
    promptType: 'Tag Question (Câu hỏi đuôi)',
    options: [
      {
        label: 'A',
        text: 'No, she handed it directly to the accounting department.',
        translationVi: 'Không, cô ấy đã nộp trực tiếp cho phòng kế toán rồi.',
      },
      {
        label: 'B',
        text: 'I ordered the office stationery online.',
        translationVi: 'Tôi đã đặt mua văn phòng phẩm trên mạng.',
      },
      {
        label: 'C',
        text: 'She will leave the office around six o’clock.',
        translationVi: 'Cô ấy sẽ rời văn phòng lúc khoảng 6 giờ.',
      },
    ],
    correctAnswer: 'A',
    explanationVi: 'Câu hỏi phủ định ở quá khứ ("Didn\'t she leave...?"). Đáp án A trả lời chính xác: Không (không để ở bàn), cô ấy nộp trực tiếp cho phòng kế toán.',
    trapAnalysis: {
      trapName: 'Bẫy đa nghĩa của từ "Leave" & bẫy lặp từ "order"',
      distractors: [
        { label: 'B', reason: 'Bẫy lặp từ "order" (purchase order -> ordered stationery).' },
        { label: 'C', reason: 'Bẫy nghĩa từ "leave" (để lại đồ vật bị nhầm thành rời khỏi văn phòng).' },
      ],
    },
    keyVocabulary: [
      { word: 'purchase order', meaning: 'đơn đặt hàng' },
      { word: 'accounting department', meaning: 'phòng kế toán' },
    ],
    accent: 'en-GB',
    context: 'Purchasing & Contracts',
  },
];
