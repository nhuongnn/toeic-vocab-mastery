import { Idiom } from '@/types/patterns';

export const idioms: Idiom[] = [
  {
    id: 'idiom-on-the-same-page',
    idiom: 'on the same page',
    idiomVi: 'cùng chung quan điểm / hiểu ý thống nhất với nhau',
    literalMeaning: 'Cùng mở đến một trang sách để đọc.',
    figurativeMeaning:
      'Mọi người đều có chung một cách hiểu, một nhận thức và không có sự mâu thuẫn hay hiểu lầm về mục tiêu hoặc quy trình.',
    originMentalImage:
      'Tưởng tượng một ban nhạc hoặc dàn hợp xướng cùng nhìn vào đúng một trang nốt nhạc. Nếu có ai lật nhầm trang, bản hòa tấu sẽ lập tức bị lạc điệu.',
    formality: 'workplace-friendly',
    category: 'workplace',
    categoryVi: 'Công sở & Hợp tác',
    dialogue: {
      speakerA: 'Before we present our roadmap to the client, I want to make sure everyone on our team is on the same page.',
      speakerB: 'Agreed. Let’s do a quick dry run to align on our key talking points and pricing model.',
      context: 'Họp chuẩn bị trước buổi gặp gỡ khách hàng quan trọng.',
    },
    examples: [
      {
        en: 'The project manager scheduled a daily 10-minute standup so the whole engineering team stays on the same page.',
        vi: 'Người quản lý dự án đã lên lịch họp nhanh 10 phút mỗi ngày để toàn bộ đội ngũ kỹ thuật luôn thống nhất nắm rõ tình hình.',
        context: 'workplace',
      },
      {
        en: 'Are we on the same page regarding who will handle the keynote speaker’s logistics?',
        vi: 'Chúng ta đã thống nhất với nhau về việc ai sẽ phụ trách phần hậu cần cho diễn giả chính chưa?',
        context: 'toeic',
      },
    ],
    toeicContext: {
      parts: ['Part 3', 'Part 7'],
      tip: 'Trong TOEIC Part 3, khi người nói hỏi "Are we on the same page?", người kia trả lời "Definitely" hoặc "I see what you mean", câu hỏi thường xoay quanh "What does the woman imply?" -> "She agrees with the plan".',
    },
  },
  {
    id: 'idiom-touch-base',
    idiom: 'touch base',
    idiomVi: 'liên lạc nhanh / trao đổi ngắn để cập nhật tình hình',
    literalMeaning: 'Cầu thủ bóng chày chạm chân vào các mấu gôn (base) để không bị loại.',
    figurativeMeaning:
      'Gặp gỡ hoặc gọi điện thoại, nhắn tin nhanh với ai đó để kiểm tra tiến độ, trao đổi thông tin ngắn gọn mà không cần họp hành trịnh trọng.',
    originMentalImage:
      'Bóng chày Mỹ: Cầu thủ chỉ cần chạm nhẹ vào gôn rồi chạy tiếp. Tương tự, bạn chỉ cần liên lạc ngắn 2 phút để cập nhật rồi tiếp tục làm việc.',
    formality: 'workplace-friendly',
    category: 'workplace',
    categoryVi: 'Công sở & Hợp tác',
    dialogue: {
      speakerA: 'I know you are super busy with the product launch, but could we touch base for five minutes tomorrow?',
      speakerB: 'Sure thing! Let’s chat right after the morning sprint review.',
      context: 'Hẹn một cuộc trao đổi ngắn giữa hai đồng nghiệp.',
    },
    examples: [
      {
        en: 'I will touch base with the logistics vendor this afternoon to verify the estimated arrival time.',
        vi: 'Tôi sẽ liên lạc nhanh với bên vận chuyển vào chiều nay để xác nhận lại thời gian hàng đến dự kiến.',
        context: 'toeic',
      },
      {
        en: 'Let’s touch base next Monday after everyone has looked through the revised blueprint.',
        vi: 'Thứ Hai tuần tới chúng ta hãy trao đổi nhanh lại sau khi mọi người đã xem qua bản thiết kế sửa đổi nhé.',
        context: 'workplace',
      },
    ],
    toeicContext: {
      parts: ['Part 3', 'Part 4', 'Part 7'],
      tip: 'Cụm "touch base with someone" là từ khóa vàng trong email công sở Part 7, mang ý nghĩa "to contact or check in with someone briefly".',
    },
  },
  {
    id: 'idiom-cut-corners',
    idiom: 'cut corners',
    idiomVi: 'làm ẩu / bớt xén quy trình để tiết kiệm thời gian hoặc tiền bạc',
    literalMeaning: 'Đi tắt cắt góc đường thay vì đi theo đường cua vuông góc.',
    figurativeMeaning:
      'Thực hiện một công việc theo cách nhanh nhất hoặc rẻ nhất bằng cách bỏ qua các tiêu chuẩn an toàn, chất lượng hoặc quy định pháp lý.',
    originMentalImage:
      'Người lái xe cắt cua gấp qua lề đường để về đích nhanh hơn nhưng có nguy cơ gây tai nạn. Trong sản xuất, đó là dùng nguyên liệu kém phẩm chất để hạ giá thành.',
    formality: 'neutral',
    category: 'strategy',
    categoryVi: 'Chiến lược & Chất lượng',
    dialogue: {
      speakerA: 'We are three days behind schedule. Can we skip the second round of stress testing?',
      speakerB: 'Absolutely not. We cannot cut corners when it comes to customer data security.',
      context: 'Tranh luận về việc duy trì tiêu chuẩn kiểm thử phần mềm.',
    },
    examples: [
      {
        en: 'The airline company faced severe penalties after auditors discovered they had cut corners on aircraft maintenance.',
        vi: 'Hãng hàng không đã phải đối mặt với các mức phạt nặng nề sau khi các thanh tra viên phát hiện họ đã bớt xén quy trình bảo dưỡng máy bay.',
        context: 'toeic',
      },
      {
        en: 'Never cut corners when preparing tax documents, or you might end up paying hefty fines.',
        vi: 'Đừng bao giờ làm ẩu khi lập chứng từ thuế, nếu không bạn có thể sẽ phải nộp những khoản tiền phạt khổng lồ.',
        context: 'daily',
      },
    ],
    toeicContext: {
      parts: ['Part 4', 'Part 7'],
      tip: 'Trong các bài báo hoặc phóng sự doanh nghiệp ở Part 7, "cut corners" thường dẫn đến hậu quả "led to quality defects" hoặc "product recalls".',
    },
  },
  {
    id: 'idiom-get-the-ball-rolling',
    idiom: 'get the ball rolling',
    idiomVi: 'bắt đầu khởi động / phát súng lệnh triển khai công việc',
    literalMeaning: 'Đẩy cho quả bóng lăn đi.',
    figurativeMeaning:
      'Tạo lực đẩy ban đầu để một dự án, cuộc họp hoặc một chiến dịch bắt đầu chuyển động và vận hành trơn tru.',
    originMentalImage:
      'Tưởng tượng một quả bóng đá trên sân cỏ: Cần một cú đá khai mạc để quả bóng bắt đầu lăn và trận đấu chính thức bùng nổ.',
    formality: 'workplace-friendly',
    category: 'strategy',
    categoryVi: 'Chiến lược & Chất lượng',
    dialogue: {
      speakerA: 'Now that everyone is here and settled, who would like to get the ball rolling?',
      speakerB: 'I can start by summarizing the key milestones achieved during the previous sprint.',
      context: 'Mở màn một cuộc họp dự án.',
    },
    examples: [
      {
        en: 'To get the ball rolling on the holiday campaign, the marketing team drafted five creative concepts.',
        vi: 'Để khởi động chiến dịch mùa lễ hội, đội ngũ tiếp thị đã phác thảo 5 ý tưởng sáng tạo ban đầu.',
        context: 'workplace',
      },
      {
        en: 'Making the initial deposit today will get the ball rolling on manufacturing your custom furniture.',
        vi: 'Việc đặt cọc trước khoản tiền hôm nay sẽ giúp bắt đầu ngay việc sản xuất đồ nội thất theo yêu cầu của bạn.',
        context: 'toeic',
      },
    ],
    toeicContext: {
      parts: ['Part 3', 'Part 4'],
      tip: '"To get the ball rolling" = "to initiate an activity or kick off a project". Rất hay xuất hiện trong lời phát biểu khai mạc hội thảo.',
    },
  },
  {
    id: 'idiom-hit-the-ground-running',
    idiom: 'hit the ground running',
    idiomVi: 'bắt tay vào việc ngay với năng suất tối đa / bắt nhịp thần tốc',
    literalMeaning: 'Lính nhảy dù tiếp đất là chạy ngay lập tức mà không dừng lại định thần.',
    figurativeMeaning:
      'Khởi đầu một công việc mới hoặc dự án mới với đầy đủ sự sẵn sàng, nhiệt huyết và tạo ra kết quả ấn tượng ngay từ ngày đầu tiên.',
    originMentalImage:
      'Một người lính vừa chạm chân xuống mặt đất là đã lao thẳng về phía trước với vận tốc tối đa, không lúng túng hay mất thời gian làm quen.',
    formality: 'workplace-friendly',
    category: 'workplace',
    categoryVi: 'Công sở & Hợp tác',
    dialogue: {
      speakerA: 'How is the new marketing director doing?',
      speakerB: 'She really hit the ground running! She has already restructured our digital ad spend and boosted conversions.',
      context: 'Nhận xét về một nhân sự cấp cao mới gia nhập công ty.',
    },
    examples: [
      {
        en: 'Thanks to our comprehensive onboarding program, new recruits are able to hit the ground running.',
        vi: 'Nhờ vào chương trình đào tạo hội nhập toàn diện, các nhân viên mới có thể bắt nhịp công việc và làm việc hiệu quả ngay lập tức.',
        context: 'toeic',
      },
      {
        en: 'We need an experienced software architect who can hit the ground running from day one.',
        vi: 'Chúng tôi cần một kiến trúc sư phần mềm giàu kinh nghiệm, người có thể nhập cuộc và tạo ra giá trị ngay từ ngày đầu.',
        context: 'workplace',
      },
    ],
    toeicContext: {
      parts: ['Part 7'],
      tip: 'Xuất hiện trong các mẩu tin tuyển dụng (Job Postings) trong TOEIC Part 7 để miêu tả ứng viên lý tưởng.',
    },
  },
  {
    id: 'idiom-call-it-a-day',
    idiom: 'call it a day',
    idiomVi: 'nghỉ tay kết thúc ngày làm việc / dừng công việc hôm nay lại',
    literalMeaning: 'Tuyên bố ngày làm việc đã hoàn tất.',
    figurativeMeaning:
      'Quyết định dừng một hoạt động, cuộc họp hoặc công việc lại sau khi đã làm việc chăm chỉ hoặc vì đã đạt được tiến độ hợp lý.',
    originMentalImage:
      'Người công nhân đặt dụng cụ xuống bàn, phủi tay và mỉm cười bảo đồng nghiệp: "Hôm nay làm tới đây thôi, về nhà nghỉ ngơi!".',
    formality: 'workplace-friendly',
    category: 'daily',
    categoryVi: 'Đời sống & Giao tiếp',
    dialogue: {
      speakerA: 'We’ve been debugging this payment gateway issue for over six hours straight.',
      speakerB: 'Let’s call it a day. Our minds are fried; we’ll tackle it with fresh eyes tomorrow morning.',
      context: 'Quyết định nghỉ ngơi sau nhiều giờ giải quyết sự cố kỹ thuật.',
    },
    examples: [
      {
        en: 'After finalizing thirty client invoices, the accounting team decided to call it a day and celebrate.',
        vi: 'Sau khi hoàn tất 30 hóa đơn của khách hàng, phòng kế toán đã quyết định nghỉ tay và đi ăn mừng.',
        context: 'workplace',
      },
      {
        en: 'It’s already past 7 PM. Let’s pack up our laptops and call it a day.',
        vi: 'Đã hơn 7 giờ tối rồi. Chúng ta hãy gập máy tính lại và kết thúc ngày làm việc thôi.',
        context: 'daily',
      },
    ],
    toeicContext: {
      parts: ['Part 3'],
      tip: 'Trong TOEIC Part 3, khi nghe câu "Why don’t we call it a day?", câu hỏi thường hỏi "What does the man suggest doing?" -> "Stopping work for the day".',
    },
  },
  {
    id: 'idiom-bite-the-bullet',
    idiom: 'bite the bullet',
    idiomVi: 'cắn răng chịu đựng / dũng cảm đưa ra quyết định khó khăn',
    literalMeaning: 'Cắn vào viên đạn chì khi phẫu thuật thời chiến không có thuốc gây mê.',
    figurativeMeaning:
      'Chấp nhận đối mặt và thực hiện một việc khó khăn, tốn kém hoặc không dễ chịu mà bạn biết là không thể né tránh mãi được.',
    originMentalImage:
      'Binh lính thời chiến ngậm chặt viên đạn giữa hai hàm răng để kìm nén cơn đau khi bác sĩ khâu vết thương.',
    formality: 'neutral',
    category: 'strategy',
    categoryVi: 'Chiến lược & Chất lượng',
    dialogue: {
      speakerA: 'Our office server keeps crashing, but a brand-new cloud migration will cost $50,000.',
      speakerB: 'We just have to bite the bullet and invest in it now before we lose critical enterprise clients.',
      context: 'Quyết định đầu tư nâng cấp hạ tầng tốn kém.',
    },
    examples: [
      {
        en: 'The company finally bit the bullet and laid off underperforming divisions to avoid bankruptcy.',
        vi: 'Công ty cuối cùng đã phải cắn răng chấp nhận sa thải các bộ phận hoạt động kém hiệu quả để tránh phá sản.',
        context: 'toeic',
      },
      {
        en: 'I hate dental visits, but my toothache was unbearable, so I bit the bullet and made an appointment.',
        vi: 'Tôi rất sợ đi nha sĩ, nhưng cơn đau răng không thể chịu nổi nữa nên tôi đành cắn răng đặt lịch hẹn.',
        context: 'daily',
      },
    ],
    toeicContext: {
      parts: ['Part 3', 'Part 7'],
      tip: 'Đặc trưng trong các tình huống thảo luận chi phí đắt đỏ hoặc tái cơ cấu tổ chức khó khăn.',
    },
  },
  {
    id: 'idiom-think-outside-the-box',
    idiom: 'think outside the box',
    idiomVi: 'tư duy đột phá / suy nghĩ vượt ra khỏi khuôn khổ truyền thống',
    literalMeaning: 'Suy nghĩ nằm bên ngoài chiếc hộp kín.',
    figurativeMeaning:
      'Tìm kiếm những giải pháp sáng tạo, độc đáo và phi truyền thống thay vì đi theo lối mòn tư duy thông thường.',
    originMentalImage:
      'Bài toán 9 dấu chấm kinh điển: Chỉ có thể nối tất cả các chấm bằng 4 nét vẽ khi bạn dám vẽ đường thẳng vượt ra khỏi chiếc khung hình hộp vô hình.',
    formality: 'workplace-friendly',
    category: 'strategy',
    categoryVi: 'Chiến lược & Chất lượng',
    dialogue: {
      speakerA: 'Standard social media ads aren’t getting us any qualified enterprise leads.',
      speakerB: 'We need to think outside the box. What if we host an exclusive invite-only tech podcast instead?',
      context: 'Thảo luận giải pháp tiếp thị sáng tạo.',
    },
    examples: [
      {
        en: 'To differentiate ourselves from multinational competitors, our design agency must think outside the box.',
        vi: 'Để tạo sự khác biệt trước các đối thủ đa quốc gia, công ty thiết kế của chúng ta phải tư duy đột phá vượt giới hạn.',
        context: 'toeic',
      },
      {
        en: 'Her ability to think outside the box has earned her multiple innovation awards inside the firm.',
        vi: 'Khả năng tư duy sáng tạo ngoài khuôn khổ đã đem lại cho cô nhiều giải thưởng đổi mới sáng tạo trong công ty.',
        context: 'workplace',
      },
    ],
    toeicContext: {
      parts: ['Part 4', 'Part 7'],
      tip: '"Think outside the box" = "to be creative and innovative". Thường gặp trong các bài nói truyền cảm hứng (Keynote speech) Part 4.',
    },
  },
  {
    id: 'idiom-ahead-of-the-curve',
    idiom: 'ahead of the curve',
    idiomVi: 'đi trước thời đại / dẫn đầu xu thế công nghệ và thị trường',
    literalMeaning: 'Nằm ở phần dốc phía trước của đường cong tăng trưởng.',
    figurativeMeaning:
      'Nắm bắt và triển khai các ý tưởng, công nghệ hoặc phong cách trước khi chúng trở nên phổ biến đại trà với đối thủ.',
    originMentalImage:
      'Đường cong chu kỳ chấp nhận công nghệ (Technology Adoption Curve): Bạn đứng ở nhóm Tiên phong (Innovators) trên đỉnh dốc trước khi toàn xã hội bắt kịp.',
    formality: 'workplace-friendly',
    category: 'strategy',
    categoryVi: 'Chiến lược & Chất lượng',
    dialogue: {
      speakerA: 'Why is our R&D department investing so heavily in artificial intelligence ethics?',
      speakerB: 'Because new government regulations are looming, and staying ahead of the curve gives us a massive market advantage.',
      context: 'Chiến lược nghiên cứu và đón đầu quy định pháp luật mới.',
    },
    examples: [
      {
        en: 'By adopting clean energy solutions early, the automotive startup stayed well ahead of the curve.',
        vi: 'Bằng việc ứng dụng sớm các giải pháp năng lượng sạch, công ty khởi nghiệp ô tô đã luôn dẫn đầu xu thế.',
        context: 'toeic',
      },
      {
        en: 'Tech professionals continuously study new programming frameworks to stay ahead of the curve.',
        vi: 'Các chuyên gia công nghệ liên tục nghiên cứu các nền tảng lập trình mới để không bị tụt lại phía sau xu thế.',
        context: 'daily',
      },
    ],
    toeicContext: {
      parts: ['Part 7'],
      tip: 'Trong các bài đọc về công nghệ hoặc đầu tư tài chính: "stay ahead of the curve" = "maintain a competitive advantage over rivals".',
    },
  },
  {
    id: 'idiom-burn-the-midnight-oil',
    idiom: 'burn the midnight oil',
    idiomVi: 'thức khuya làm việc cật lực / cày đêm',
    literalMeaning: 'Đốt đèn dầu lúc nửa đêm để làm việc.',
    figurativeMeaning:
      'Làm việc hoặc ôn thi miệt mài đến tận đêm khuya hoặc sáng sớm.',
    originMentalImage:
      'Thời xưa chưa có điện, học giả phải thắp từng giọt dầu đèn leo lét lúc nửa đêm để đọc sách nghiên cứu.',
    formality: 'neutral',
    category: 'daily',
    categoryVi: 'Đời sống & Giao tiếp',
    dialogue: {
      speakerA: 'You look exhausted today! Did you get any sleep at all?',
      speakerB: 'Not much. I was burning the midnight oil to submit the tender document before the 8 AM deadline.',
      context: 'Hỏi thăm đồng nghiệp vừa thức trắng đêm làm hồ sơ thầu.',
    },
    examples: [
      {
        en: 'The legal counsel burned the midnight oil reviewing dozens of cross-border acquisition documents.',
        vi: 'Cố vấn pháp lý đã phải thức trắng đêm rà soát hàng chục tài liệu mua bán sáp nhập xuyên biên giới.',
        context: 'toeic',
      },
      {
        en: 'Students often burn the midnight oil during finals week to cram for examinations.',
        vi: 'Sinh viên thường hay thức khuya cày cuốc trong tuần thi cuối kỳ để ôn tập cho các bài thi.',
        context: 'daily',
      },
    ],
    toeicContext: {
      parts: ['Part 3'],
      tip: 'Part 3 nghe hội thoại: "I had to burn the midnight oil" -> Người nói đã làm việc muộn vào tối qua ("worked late last night").',
    },
  },
  {
    id: 'idiom-play-it-by-ear',
    idiom: 'play it by ear',
    idiomVi: 'tùy cơ ứng biến / để đến lúc đó xem sao rồi tính',
    literalMeaning: 'Chơi một bản nhạc bằng cách lắng nghe cảm nhận tai thay vì đọc nốt nhạc.',
    figurativeMeaning:
      'Quyết định cách xử lý tình huống linh hoạt theo thực tế phát sinh chứ không lập sẵn kế hoạch cứng nhắc từ trước.',
    originMentalImage:
      'Nghệ sĩ dương cầm ngẫu hứng đánh theo giai điệu tai nghe được mà không cần nhìn bất kỳ bản phổ nhạc nào trên giá.',
    formality: 'casual',
    category: 'daily',
    categoryVi: 'Đời sống & Giao tiếp',
    dialogue: {
      speakerA: 'What time should we meet for dinner tonight? Do you want to reserve a table right now?',
      speakerB: 'My flight might be delayed, so let’s just play it by ear and text each other when I land.',
      context: 'Hẹn ăn tối linh hoạt khi chưa chắc chắn giờ bay.',
    },
    examples: [
      {
        en: 'We don’t know yet how many delegates will attend the post-conference reception, so we’ll play it by ear regarding food orders.',
        vi: 'Chúng ta chưa biết có bao nhiêu đại biểu sẽ dự tiệc sau hội nghị, nên về việc gọi thêm đồ ăn cứ tùy cơ ứng biến nhé.',
        context: 'workplace',
      },
      {
        en: 'If the weather stays rainy tomorrow, we won’t go hiking; let’s just play it by ear.',
        vi: 'Nếu mai trời vẫn tiếp tục mưa thì mình khỏi đi leo núi; cứ để mai xem tình hình thế nào rồi tính.',
        context: 'daily',
      },
    ],
    toeicContext: {
      parts: ['Part 2', 'Part 3'],
      tip: 'Câu hỏi Part 2: "Where should we have lunch today?" -> Đáp án: "Let’s play it by ear" (đến trưa hẵng tính).',
    },
  },
  {
    id: 'idiom-break-the-ice',
    idiom: 'break the ice',
    idiomVi: 'phá tan bầu không khí ngượng ngùng ban đầu',
    literalMeaning: 'Con tàu phá băng đập vỡ lớp băng đóng trên mặt biển để mở đường cho các tàu khác đi qua.',
    figurativeMeaning:
      'Làm một việc gì đó (kể một câu chuyện vui, đặt câu hỏi nhẹ nhàng) để mọi người cảm thấy thoải mái, cởi mở hơn khi mới gặp nhau lần đầu.',
    originMentalImage:
      'Con tàu phá băng rẽ sóng qua lớp băng dày đặc mùa đông để dòng nước ấm áp lưu thông trở lại.',
    formality: 'workplace-friendly',
    category: 'relationships',
    categoryVi: 'Mối quan hệ & Xã giao',
    dialogue: {
      speakerA: 'The attendees at our orientation seminar looked so tense and quiet.',
      speakerB: 'I know! Playing that quick trivia game helped break the ice and got everyone laughing and networking.',
      context: 'Nhận xét về hoạt động khởi động trong buổi tập huấn.',
    },
    examples: [
      {
        en: 'The workshop facilitator started with a humorous anecdote to break the ice among international participants.',
        vi: 'Người điều phối hội thảo đã mở đầu bằng một câu chuyện vui để phá tan sự ngượng ngùng giữa các thành viên quốc tế.',
        context: 'toeic',
      },
      {
        en: 'Asking about someone’s hometown is always a dependable way to break the ice at social networking mixers.',
        vi: 'Hỏi thăm về quê quán của một người luôn là cách đáng tin cậy để bắt chuyện làm quen tại các buổi giao lưu kết nối.',
        context: 'daily',
      },
    ],
    toeicContext: {
      parts: ['Part 4'],
      tip: 'Xuất hiện trong các bài nói chào đón nhân viên mới (Welcome Orientations) hoặc hướng dẫn kỹ năng giao tiếp.',
    },
  },
  {
    id: 'idiom-in-a-nutshell',
    idiom: 'in a nutshell',
    idiomVi: 'tóm lại một cách ngắn gọn nhất / tựu trung lại',
    literalMeaning: 'Vừa vặn gói gọn bên trong một mảnh vỏ hạt dẻ bé nhỏ.',
    figurativeMeaning:
      'Tóm tắt một vấn đề phức tạp, dài dòng thành một kết luận cực kỳ ngắn gọn, súc tích chỉ trong một vài câu.',
    originMentalImage:
      'Chiếc vỏ hạt dẻ rất nhỏ. Nếu một ý tưởng có thể nhét vừa vào trong vỏ hạt dẻ, chứng tỏ nó đã được cô đọng đến mức tinh túy nhất.',
    formality: 'workplace-friendly',
    category: 'workplace',
    categoryVi: 'Công sở & Hợp tác',
    dialogue: {
      speakerA: 'I only have two minutes before my next investor meeting. Can you give me the executive summary?',
      speakerB: 'In a nutshell, customer acquisition is up 40%, but churn rate needs immediate attention.',
      context: 'Báo cáo nhanh cho giám đốc bận rộn.',
    },
    examples: [
      {
        en: 'In a nutshell, the proposed tax incentive will save our manufacturing division approximately $1.2 million annually.',
        vi: 'Tóm lại một cách ngắn gọn, ưu đãi thuế được đề xuất sẽ giúp bộ phận sản xuất của chúng ta tiết kiệm khoảng 1,2 triệu đô la mỗi năm.',
        context: 'toeic',
      },
      {
        en: 'To put it in a nutshell, we simply don’t have enough budget to hire three more senior engineers right now.',
        vi: 'Nói tóm gọn lại, chúng ta đơn giản là chưa có đủ ngân sách để thuê thêm ba kỹ sư cao cấp vào lúc này.',
        context: 'workplace',
      },
    ],
    toeicContext: {
      parts: ['Part 3', 'Part 4', 'Part 7'],
      tip: '"In a nutshell" = "in summary / briefly put". Thường là câu kết luận mở ra đáp án chính của bài nói Part 4.',
    },
  },
  {
    id: 'idiom-keep-in-the-loop',
    idiom: 'keep someone in the loop / posted',
    idiomVi: 'liên tục cập nhật tin tức / để ai nắm rõ tình hình',
    literalMeaning: 'Giữ ai đó nằm trong vòng tròn luân chuyển thông tin.',
    figurativeMeaning:
      'Thường xuyên gửi thông báo, cc email hoặc thông tin cập nhật cho ai đó để họ luôn nắm được các diễn biến mới nhất của dự án.',
    originMentalImage:
      'Vòng lặp thông tin khép kín (the loop): Người ở trong vòng tròn luôn nhận được mọi tín hiệu và trao đổi.',
    formality: 'workplace-friendly',
    category: 'workplace',
    categoryVi: 'Công sở & Hợp tác',
    dialogue: {
      speakerA: 'I am stepping out of the office for client visits until Thursday.',
      speakerB: 'No worries at all! I will keep you in the loop regarding the vendor negotiations.',
      context: 'Cam kết cập nhật thông tin cho đồng nghiệp khi họ vắng mặt.',
    },
    examples: [
      {
        en: 'Please keep the vice president in the loop by copying her on all email correspondence regarding the audit.',
        vi: 'Vui lòng cập nhật tình hình cho phó chủ tịch bằng cách cc email cho bà ấy trong mọi thư từ liên quan đến cuộc kiểm toán.',
        context: 'toeic',
      },
      {
        en: 'Keep me posted on your job interview results—I’m crossing my fingers for you!',
        vi: 'Nhớ cập nhật cho mình biết kết quả phỏng vấn xin việc của bạn nhé—mình đang cầu chúc cho bạn may mắn đây!',
        context: 'daily',
      },
    ],
    toeicContext: {
      parts: ['Part 7'],
      tip: 'Câu kết email Part 7: "Please keep me in the loop" = "Please update me on any new developments".',
    },
  },
  {
    id: 'idiom-elephant-in-the-room',
    idiom: 'the elephant in the room',
    idiomVi: 'vấn đề nhức nhối hiển nhiên ai cũng thấy nhưng đều né tránh nói ra',
    literalMeaning: 'Một con voi khổng lồ đứng sừng sững giữa phòng.',
    figurativeMeaning:
      'Một rắc rối hoặc vấn đề nghiêm trọng hiển hiện trước mắt tất cả mọi người, nhưng vì nhạy cảm, ngại ngùng hoặc sợ mất lòng nên không ai dám chủ động đề cập.',
    originMentalImage:
      'Một con voi to lớn đứng ngay giữa phòng khách nhưng tất cả quan khách đều giả vờ như không thấy nó và chỉ bàn về thời tiết.',
    formality: 'workplace-friendly',
    category: 'relationships',
    categoryVi: 'Mối quan hệ & Xã giao',
    dialogue: {
      speakerA: 'Nobody mentioned our slumping Q3 profit margins during the quarterly review meeting.',
      speakerB: 'Yeah, it was clearly the elephant in the room, but everyone was terrified of upsetting the CEO.',
      context: 'Nhận xét về một cuộc họp nơi mọi người né tránh tin xấu.',
    },
    examples: [
      {
        en: 'Before we discuss new project initiatives, we need to address the elephant in the room: our ongoing budget deficit.',
        vi: 'Trước khi chúng ta thảo luận về các sáng kiến dự án mới, chúng ta cần giải quyết vấn đề nhức nhối hiển nhiên: khoản thâm hụt ngân sách hiện tại.',
        context: 'workplace',
      },
      {
        en: 'The declining employee morale is the elephant in the room that upper management continues to ignore.',
        vi: 'Tinh thần làm việc sa sút của nhân viên chính là con voi trong phòng mà ban lãnh đạo cấp cao vẫn tiếp tục phớt lờ.',
        context: 'toeic',
      },
    ],
    toeicContext: {
      parts: ['Part 3', 'Part 7'],
      tip: '"The elephant in the room" = "an obvious problem that people avoid discussing because it is sensitive".',
    },
  },
  {
    id: 'idiom-bring-to-the-table',
    idiom: 'bring to the table',
    idiomVi: 'mang lại giá trị / đóng góp lợi thế và kỹ năng hữu ích',
    literalMeaning: 'Mang một món ăn đặt lên bàn ăn chung.',
    figurativeMeaning:
      'Cung cấp các kỹ năng, nguồn lực, tài chính, mối quan hệ hoặc lợi thế cạnh tranh mà bạn có thể đóng góp vào một tập thể hoặc thương vụ hợp tác.',
    originMentalImage:
      'Một bữa tiệc potluck: Mỗi người mang một món ăn ngon đến góp vào bàn ăn. Tương tự, mỗi thành viên mang một thế mạnh chuyên môn đến để xây dựng dự án.',
    formality: 'workplace-friendly',
    category: 'workplace',
    categoryVi: 'Công sở & Hợp tác',
    dialogue: {
      speakerA: 'Why should the selection committee choose our software consultancy over established agencies?',
      speakerB: 'Because what we bring to the table is unmatched cybersecurity expertise and round-the-clock localized support.',
      context: 'Chuẩn bị luận điểm dự thầu.',
    },
    examples: [
      {
        en: 'During the job interview, candidates should clearly articulate what unique strengths they bring to the table.',
        vi: 'Trong buổi phỏng vấn xin việc, các ứng viên cần làm rõ những thế mạnh độc đáo mà họ có thể đóng góp cho công ty.',
        context: 'toeic',
      },
      {
        en: 'The strategic partnership succeeded because both firms brought complementary assets to the table.',
        vi: 'Mối quan hệ đối tác chiến lược đã thành công vì cả hai doanh nghiệp đều mang lại những tài sản bổ trợ quý giá cho nhau.',
        context: 'workplace',
      },
    ],
    toeicContext: {
      parts: ['Part 3', 'Part 7'],
      tip: '"Bring to the table" = "to provide useful skills, resources, or benefits". Thường gặp trong phỏng vấn tuyển dụng hoặc đàm phán hợp đồng.',
    },
  },
];
