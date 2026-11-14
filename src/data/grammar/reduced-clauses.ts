import { GrammarLesson } from '@/types/grammar';

export const reducedClausesLessons: GrammarLesson[] = [
  {
    id: 'reduced-relative-clauses-ving-ved',
    categoryId: 'reduced-clauses',
    title: 'Reduced Relative Clauses: V-ing vs. V-ed (The Native Efficiency Instinct)',
    titleVi: 'Mệnh đề quan hệ rút gọn: V-ing vs. V-ed (Bản năng nói ngắn gọn của người bản xứ)',
    subtitle: 'Chuyên đề "ăn điểm tuyệt đối" xuất hiện trong mọi đề thi TOEIC Part 5 & 6.',
    difficulty: 'Core TOEIC',
    frequency: '★★★★★',
    tag: 'Bí kíp TOEIC Part 5',

    nativeMindset: {
      coreIntuition:
        'Người bản xứ thích sự ngắn gọn, súc tích (economy of language). Khi nói hoặc viết văn bản công việc, việc lặp đi lặp lại những từ nối như "who is, which was, that are" khiến câu văn trở nên nặng nề, lê thê. Do đó, họ lập tức cắt bỏ đại từ quan hệ và to be, chỉ giữ lại DUY NHẤT một Phân từ làm nhiệm vụ bổ nghĩa như một tính từ.',
      mentalImage:
        'Tưởng tượng đại từ quan hệ (who/which/that) giống như chiếc giàn giáo khi xây nhà. Khi ngôi nhà đã thành hình (nghĩa của câu đã rõ), người bản xứ tháo dỡ toàn bộ giàn giáo vứt đi, chỉ để lại ngôi nhà vững chắc: Danh từ + V-ing (tự làm) hoặc V-ed (bị làm).',
      whyNativesSayThis:
        '- Thay vì viết: "Employees who work from home must submit weekly reports." (10 từ)\n- Họ viết: "Employees working from home must submit weekly reports." (8 từ - nhanh hơn, sang hơn, thanh thoát hơn).',
      vietnameseMistakeWarning:
        'Nhiều bạn học sinh lúng túng vì thấy trong một câu dường như có "hai động từ chính" đứng cạnh nhau mà không có từ nối (ví dụ: "The report submitted yesterday had several errors"). Các bạn không nhận ra "submitted" chỉ là phân từ rút gọn bổ nghĩa cho "The report", còn động từ chính là "had".',
    },

    rules: [
      {
        ruleTitle: '1. Rút gọn Chủ động (Active) -> Dùng V-ing',
        formula: 'Noun + who/which/that + V -> Noun + V-ING',
        description: 'Khi danh từ đứng trước TỰ THỰC HIỆN hành động đó.',
        whenToUse:
          'Passersby who were carrying umbrellas -> Passersby carrying umbrellas.\nPassengers arriving at Terminal 2 should proceed to customs.',
      },
      {
        ruleTitle: '2. Rút gọn Bị động (Passive) -> Dùng V3 / V-ed',
        formula: 'Noun + who/which/that + BE + V3 -> Noun + V3 / V-ED',
        description: 'Khi danh từ đứng trước NHẬN TÁC ĐỘNG của hành động đó.',
        whenToUse:
          'The items that were purchased yesterday -> The items purchased yesterday.\nAny equipment damaged during transit will be replaced.',
      },
    ],

    examples: [
      {
        en: 'Anyone wishing to register for the leadership seminar must fill out this form.',
        vi: 'Bất kỳ ai mong muốn đăng ký buổi hội thảo kỹ năng lãnh đạo đều phải điền vào biểu mẫu này.',
        context: 'toeic',
        note: 'Gốc là "Anyone who wishes to register" -> Người tự muốn (chủ động) rút gọn thành "wishing".',
        highlightWords: ['Anyone wishing to register'],
      },
      {
        en: 'The proposal submitted by the design department was unanimously approved.',
        vi: 'Bản đề xuất được nộp bởi phòng thiết kế đã được nhất trí phê duyệt.',
        context: 'workplace',
        note: 'Gốc là "The proposal which was submitted" -> Bản đề xuất được người khác nộp (bị động) rút gọn thành "submitted". Động từ chính của câu là "was approved".',
        highlightWords: ['proposal submitted by', 'was unanimously approved'],
      },
      {
        en: 'Candidates holding an advanced degree in finance will be given priority.',
        vi: 'Những ứng viên sở hữu bằng thạc sĩ chuyên ngành tài chính sẽ được ưu tiên xem xét.',
        context: 'toeic',
        note: 'Gốc là "Candidates who hold..." -> Ứng viên tự sở hữu bằng cấp (chủ động) -> "holding".',
        highlightWords: ['Candidates holding'],
      },
      {
        en: 'Please review the attached invoice detailing the project expenses.',
        vi: 'Vui lòng kiểm tra hóa đơn đính kèm liệt kê chi tiết các khoản chi phí của dự án.',
        context: 'workplace',
        note: 'Hóa đơn tự nó thể hiện các chi tiết -> "detailing".',
        highlightWords: ['invoice detailing'],
      },
    ],

    commonTraps: [
      {
        wrong: 'The technician repaired the server was very experienced.',
        correct: 'The technician repairing / who repaired the server was very experienced.',
        nativeReason:
          'Nếu dùng "repaired" ở đây, câu sẽ bị lỗi hai động từ chính (repaired và was). Kỹ thuật viên tự tay sửa máy chủ (chủ động) nên phải là "The technician repairing the server was..." hoặc giữ nguyên mệnh đề quan hệ đầy đủ.',
        vietnameseTrap: 'Nhầm lẫn giữa động từ thì Quá khứ đơn (V2) và Phân từ hai bị động (V3).',
      },
      {
        wrong: 'Products manufacturing in this plant comply with ISO standards.',
        correct: 'Products manufactured in this plant comply with ISO standards.',
        nativeReason:
          'Sản phẩm không tự sản xuất mà được nhà máy sản xuất (bị động) -> bắt buộc dùng V3 "manufactured".',
        vietnameseTrap: 'Dùng V-ing bừa bãi cho câu bị động.',
      },
    ],

    toeicHacks: {
      targetParts: 'TOEIC Part 5 & Part 6',
      hackTitle: 'Mẹo "Truy tìm Động từ chính" giải Part 5 trong 5 giây',
      hackContent:
        'Khi câu có cấu trúc: [Chủ ngữ] + [Chỗ trống] + [Tân ngữ/Cụm từ] + [Động từ chính chia thì] + ...\n1. Kiểm tra xem câu ĐÃ CÓ ĐỘNG TỪ CHÍNH chưa (ví dụ: is, are, was, will be, has been, approved).\n2. Nếu câu ĐÃ CÓ động từ chính -> Chỗ trống CHẮC CHẮN LÀ PHÂN TỪ RÚT GỌN (loại ngay các đáp án chia thì như V-s/es, will V, has V).\n3. Xét chủ động hay bị động: Danh từ tự làm -> Chọn V-ing; Danh từ bị làm (thường có "by/in" phía sau) -> Chọn V-ed/V3.',
      quickSignalWords: [
        'Anyone [wishing / wanting]',
        'Those [interested in]',
        'Items [purchased / ordered]',
        'The report [prepared / submitted] by',
      ],
      ruleOfThumb: 'Câu đã có động từ chính -> Chỗ trống là V-ing (chủ động) hoặc V-ed (bị động).',
    },

    quiz: [
      {
        question:
          'All participants _____ to attend the orientation session should assemble in the main conference hall by 8:30 AM.',
        options: ['require', 'requiring', 'required', 'requirement'],
        correctAnswer: 2,
        explanation:
          'Câu đã có động từ chính là "should assemble" (nên tập trung). Người tham dự "được yêu cầu" tham gia (bị động: who are required) -> rút gọn còn "required".',
        toeicTip: 'Cấu trúc kinh điển: All participants required to attend...',
      },
      {
        question:
          'The research team unveiled an innovative filter system _____ industrial wastewater by over 90 percent.',
        options: ['purifies', 'purified', 'purifying', 'purification'],
        correctAnswer: 2,
        explanation:
          'Động từ chính của câu là "unveiled" (đã công bố). Hệ thống lọc tự thực hiện hành động làm sạch nước thải (chủ động) -> rút gọn thành V-ing: "purifying".',
        toeicTip: 'Danh từ chỉ công cụ/hệ thống tự hoạt động -> dùng V-ing.',
      },
    ],
  },
  {
    id: 'reduced-participle-clauses-front',
    categoryId: 'reduced-clauses',
    title: 'Participle Clauses at Sentence Front: Cause, Time & Sequence',
    titleVi: 'Phân từ đứng đầu câu: Diễn đạt Nguyên nhân, Thời gian & Chuỗi hành động',
    subtitle: 'Vũ khí nâng tầm văn phong báo cáo chuyên nghiệp và xử lý Part 5 & 6 điểm 800+.',
    difficulty: 'Advanced Mastery',
    frequency: '★★★★☆',
    tag: 'Văn phong nâng cao',

    nativeMindset: {
      coreIntuition:
        'Thay vì viết 2 câu rời rạc bằng liên từ "Because he had completed the project, Mr. Lee took a vacation", người bản xứ gộp lại thành: "Having completed the project, Mr. Lee took a vacation." Cấu trúc này đặt hành động tiền đề lên đầu câu như một bước đệm nhịp nhàng, làm cho câu văn cô đọng và trang trọng.',
      mentalImage:
        'Giống như một đòn bẩy: Hành động ở vế đầu tạo đà phóng cho hành động ở vế chính.',
      whyNativesSayThis:
        'Cực kỳ phổ biến trong các email công vụ, thông cáo báo chí, hồ sơ lý lịch (CV) và các bài đọc Part 7 TOEIC.',
      vietnameseMistakeWarning:
        'Lỗi "Dangling Participle" (Phân từ treo lơ lửng): Chủ ngữ của phân từ đứng đầu câu BẮT BUỘC PHẢI LÀ CHỦ NGỮ CỦA VẾ CHÍNH. Nếu bạn viết "Walking in the rain, my phone got wet" -> người bản xứ hiểu là cái điện thoại đang đi bộ trong mưa!',
    },

    rules: [
      {
        ruleTitle: 'Cấu trúc V-ing / Having V3 đứng đầu câu',
        formula: 'V-ing / Having + V3, S + V...',
        description: 'Hành động ở vế phân từ do chính chủ ngữ S thực hiện.',
        whenToUse:
          '- V-ing: Khi hai hành động diễn ra gần như đồng thời.\n- Having + V3: Khi hành động đầu tiên đã hoàn tất xong xuôi rồi hành động thứ hai mới xảy ra.',
      },
      {
        ruleTitle: 'Cấu trúc V-ed / P.P đứng đầu câu (Bị động)',
        formula: 'V-ed / V3, S + V...',
        description: 'Chủ ngữ S chịu tác động của hành động.',
        whenToUse: 'Located in the heart of downtown, our hotel offers panoramic city views.',
      },
    ],

    examples: [
      {
        en: 'Having finalized the merger agreement, the executives held a joint press conference.',
        vi: 'Sau khi đã hoàn tất thỏa thuận sáp nhập, các giám đốc điều hành đã tổ chức một cuộc họp báo chung.',
        context: 'workplace',
        note: 'Hoàn tất thỏa thuận xong trước (Having finalized) rồi mới họp báo sau (held a conference).',
        highlightWords: ['Having finalized', 'the executives held'],
      },
      {
        en: 'Located near major transportation hubs, the logistics center provides seamless distribution.',
        vi: 'Được đặt vị trí gần các đầu mối giao thông trọng điểm, trung tâm logistics mang lại khả năng phân phối liền mạch.',
        context: 'toeic',
        note: 'Trung tâm logistics "được đặt vị trí" (bị động) -> dùng "Located...".',
        highlightWords: ['Located near', 'the logistics center provides'],
      },
    ],

    commonTraps: [
      {
        wrong: 'Having graduated from university, the company hired him immediately.',
        correct: 'Having graduated from university, he was hired by the company immediately.',
        nativeReason:
          'Chủ ngữ vế sau là "the company" (công ty), công ty không tốt nghiệp đại học! Người tốt nghiệp là "he", nên chủ ngữ vế chính phải là "he".',
        vietnameseTrap: 'Lỗi phân từ treo (Dangling participle) cực kỳ phổ biến trong viết luận và email.',
      },
    ],

    toeicHacks: {
      targetParts: 'TOEIC Part 5 & Part 6',
      hackTitle: 'Mẹo chọn đáp án phân từ đứng đầu câu',
      hackContent:
        'Khi thấy chỗ trống ĐỨNG NGAY ĐẦU CÂU có dấu phẩy ngăn cách: "_____, [Chủ ngữ] + [Động từ]..."\n-> Hãy nhìn ngay CHỦ NGỮ sau dấu phẩy. Nếu chủ ngữ đó TỰ LÀM hành động -> chọn V-ing / Having + V3. Nếu chủ ngữ đó BỊ LÀM / ĐƯỢC ĐẶT Ở ĐÂU (Located, Based, Founded, Faced with) -> chọn V-ed/V3.',
      quickSignalWords: [
        'Located in / situated in',
        'Based on',
        'Faced with [difficulties]',
        'Having completed / reviewed',
      ],
      ruleOfThumb: 'Nhìn chủ ngữ sau dấu phẩy để quyết định V-ing hay V-ed đứng đầu.',
    },

    quiz: [
      {
        question:
          '_____ in downtown Chicago, the luxury hotel offers complimentary shuttle service to O\'Hare International Airport.',
        options: ['Locates', 'Locating', 'Located', 'Location'],
        correctAnswer: 2,
        explanation:
          'Chủ ngữ sau dấu phẩy là "the luxury hotel" (khách sạn sang trọng). Khách sạn "được tọa lạc / được đặt vị trí" (bị động) -> chọn "Located".',
        toeicTip: 'Cụm từ "Located in..." đứng đầu câu là câu kinh điển trong TOEIC.',
      },
    ],
  },
];
