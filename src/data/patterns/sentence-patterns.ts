import { SentencePattern } from '@/types/patterns';

export const sentencePatterns: SentencePattern[] = [
  {
    id: 'pat-polite-inquiries',
    title: 'Polite Inquiries & Information Seeking',
    titleVi: 'Mẫu câu hỏi thông tin & Thăm dò lịch sự',
    category: 'email-diplomacy',
    categoryVi: 'Email & Thư từ công vụ',
    frequency: '★★★★★',
    patternFormula: 'Could you please let me know if [Clause]... / I was wondering whether you might...',
    nativeMindset:
      'Người bản xứ tránh hỏi thẳng kiểu "Tell me if..." hoặc "Do you have time?". Họ dùng "I was wondering..." (lùi thì quá khứ tiếp diễn) để tạo khoảng cách tâm lý tôn trọng, giúp người nghe không có cảm giác bị ép buộc phải trả lời ngay.',
    whenToUse:
      'Dùng khi mở đầu email hỏi ý kiến cấp trên, đối tác mới, hoặc nhờ đồng nghiệp kiểm tra thông tin.',
    examples: [
      {
        en: 'Could you please let me know if the revised financial statement is ready for review?',
        vi: 'Anh/chị vui lòng cho tôi biết báo cáo tài chính sửa đổi đã sẵn sàng để xem xét chưa ạ?',
        context: 'workplace',
      },
      {
        en: 'I was wondering whether you might have a few minutes this afternoon to discuss the marketing budget.',
        vi: 'Tôi tự hỏi liệu chiều nay bạn có rảnh vài phút để cùng thảo luận về ngân sách marketing không.',
        context: 'toeic',
      },
      {
        en: 'Could you let me know if there are any vegetarian options available at tomorrow’s lunch?',
        vi: 'Bạn có thể cho mình biết bữa trưa mai có lựa chọn món chay nào không?',
        context: 'daily',
      },
    ],
    commonMistakes: [
      {
        wrong: 'Can you tell me is the report ready?',
        correct: 'Could you tell me if the report is ready?',
        explanation:
          'Trong câu hỏi gián tiếp (embedded question), không đảo trợ động từ hay to-be lên trước chủ ngữ. Phải dùng "if/whether" + S + V.',
      },
    ],
    toeicContext: {
      parts: ['Part 2', 'Part 3', 'Part 7'],
      tip: 'Trong TOEIC Part 2, câu bắt đầu bằng "I was wondering if..." thường là câu đề nghị hoặc xin phép, câu trả lời hợp lý thường là "Sure, let me check" hoặc "I\'d be happy to help".',
    },
  },
  {
    id: 'pat-making-suggestions',
    title: 'Making Collaborative Suggestions',
    titleVi: 'Mẫu câu đề xuất giải pháp & Đưa ra gợi ý',
    category: 'meetings',
    categoryVi: 'Họp hành & Đàm phán',
    frequency: '★★★★★',
    patternFormula: 'Why don’t we [V-bare]... / How about [V-ing]... / I would suggest that we [V-bare]...',
    nativeMindset:
      'Khi làm việc nhóm đa quốc gia, không nên dùng "We must" hay "You should" vì mang tính áp đặt. Dùng "Why don’t we..." hoặc thể giả định "I would suggest that we..." tạo cảm giác cùng chung chiến hào và tôn trọng sáng kiến của tập thể.',
    whenToUse: 'Dùng trong các buổi brainstorming, họp giải quyết sự cố hoặc phản hồi ý tưởng của đối tác.',
    examples: [
      {
        en: 'Why don’t we postpone the software deployment until all critical bugs are resolved?',
        vi: 'Tại sao chúng ta không hoãn việc triển khai phần mềm cho đến khi toàn bộ lỗi nghiêm trọng được khắc phục?',
        context: 'workplace',
      },
      {
        en: 'How about reaching out to our regional distributors to gauge market demand first?',
        vi: 'Hay là chúng ta thử liên hệ trước với các nhà phân phối khu vực để đo lường nhu cầu thị trường xem sao?',
        context: 'toeic',
      },
      {
        en: 'I would recommend that we keep our options open before signing a multi-year lease.',
        vi: 'Tôi kiến nghị chúng ta nên để ngỏ các phương án trước khi ký hợp đồng thuê nhiều năm.',
        context: 'workplace',
      },
    ],
    commonMistakes: [
      {
        wrong: 'How about to call the vendor right now?',
        correct: 'How about calling the vendor right now?',
        explanation: 'Sau "How about" luôn là V-ing hoặc cụm danh từ, không dùng to-V.',
      },
      {
        wrong: 'I suggest that he sends the email.',
        correct: 'I suggest that he send the email.',
        explanation:
          'Cấu trúc Subjunctive (giả định cách): Sau suggest/recommend that + S + V-bare (nguyên mẫu không chia "s/es").',
      },
    ],
    toeicContext: {
      parts: ['Part 3', 'Part 5'],
      tip: 'TOEIC Part 5 thường xuyên bẫy cấu trúc giả định thức: recommend/suggest/request that + S + (should) + V-nguyên thể.',
    },
  },
  {
    id: 'pat-diplomatic-disagreement',
    title: 'Diplomatic Disagreement & Counter-proposals',
    titleVi: 'Mẫu câu bất đồng quan điểm khéo léo & Đề xuất phương án phụ',
    category: 'meetings',
    categoryVi: 'Họp hành & Đàm phán',
    frequency: '★★★★★',
    patternFormula: 'I see your point, but [Clause]... / While I agree that [A], I have some reservations about [B]...',
    nativeMindset:
      'Người bản xứ không bao giờ nói "I disagree" hay "You are wrong" trong cuộc họp chuyên nghiệp. Kỹ thuật "Agree to Disagree" (ghi nhận quan điểm trước rồi mới nêu vướng mắc) giúp giữ hòa khí và chứng tỏ bạn đã lắng nghe kỹ đối phương.',
    whenToUse: 'Khi phản biện đề xuất của đồng nghiệp, từ chối mức giá của nhà cung cấp hoặc giải thích khó khăn.',
    examples: [
      {
        en: 'I see your point, but expanding into two new markets simultaneously might stretch our budget too thin.',
        vi: 'Tôi hiểu góc nhìn của anh, nhưng mở rộng sang cùng lúc hai thị trường mới có thể khiến ngân sách của chúng ta bị dàn quá mỏng.',
        context: 'workplace',
      },
      {
        en: 'While I agree that the design is visually striking, I am concerned about its loading speed on mobile devices.',
        vi: 'Mặc dù tôi đồng ý giao diện trông rất ấn tượng, tôi vẫn băn khoăn về tốc độ tải của nó trên các thiết bị di động.',
        context: 'toeic',
      },
      {
        en: 'That sounds like a great idea; however, we might need to double-check our inventory first.',
        vi: 'Ý tưởng đó nghe rất tuyệt; tuy nhiên, có lẽ chúng ta cần kiểm tra lại kho hàng trước đã.',
        context: 'daily',
      },
    ],
    commonMistakes: [
      {
        wrong: 'I disagree with you because your idea is impossible.',
        correct: 'I’m not entirely sure that would be feasible given our current constraints.',
        explanation:
          'Nói "impossible" rất gay gắt và thiếu tính xây dựng. Thay vào đó dùng "not entirely sure that would be feasible" (chưa chắc đã khả thi).',
      },
    ],
    toeicContext: {
      parts: ['Part 3', 'Part 7'],
      tip: 'Trong TOEIC Part 3, khi một người nói "I see what you mean, but...", câu hỏi sau đó thường hỏi về lý do người nói lo ngại ("What is the man concerned about?"). Hãy lắng nghe ngay vế sau chữ "but".',
    },
  },
  {
    id: 'pat-following-up',
    title: 'Professional Follow-ups & Status Checks',
    titleVi: 'Mẫu câu theo dõi tiến độ & Nhắc việc tinh tế',
    category: 'email-diplomacy',
    categoryVi: 'Email & Thư từ công vụ',
    frequency: '★★★★★',
    patternFormula: 'I am just following up on [Noun/V-ing]... / Just checking in to see if [Clause]...',
    nativeMindset:
      'Để không bị coi là hối thúc (pushy), người bản xứ dùng "just following up" hoặc "just checking in". Từ "just" làm nhẹ sắc thái của câu, mang nghĩa "tôi chỉ tiện hỏi thăm tiến độ một chút chứ không gây áp lực".',
    whenToUse: 'Gửi email hoặc nhắn Slack/Teams nhắc việc sau 2-3 ngày chưa nhận được hồi âm.',
    examples: [
      {
        en: 'I am just following up on the proposal we sent over last Wednesday.',
        vi: 'Tôi gửi email này chỉ để theo dõi tiến độ bản đề xuất chúng tôi đã gửi vào thứ Tư tuần trước.',
        context: 'workplace',
      },
      {
        en: 'Just checking in to see if you had a chance to review the contract draft.',
        vi: 'Tôi chỉ muốn hỏi thăm xem bạn đã có dịp xem qua bản thảo hợp đồng chưa.',
        context: 'workplace',
      },
      {
        en: 'I wanted to circle back regarding the feedback from the executive committee.',
        vi: 'Tôi muốn quay lại trao đổi tiếp về những phản hồi từ ban điều hành.',
        context: 'toeic',
      },
    ],
    commonMistakes: [
      {
        wrong: 'Why haven’t you replied to my email yet?',
        correct: 'I wanted to follow up in case my previous email got buried in your inbox.',
        explanation:
          'Không bao giờ chất vấn trực tiếp người khác tại sao chưa trả lời. Hãy tạo cho họ lối thoát tâm lý: "in case my previous email got buried" (phòng trường hợp email trước bị trôi).',
      },
    ],
    toeicContext: {
      parts: ['Part 7'],
      tip: 'Trong TOEIC Part 7, các email follow-up luôn có mục đích chính là "To inquire about the status of a document/order".',
    },
  },
  {
    id: 'pat-declining-diplomatically',
    title: 'Diplomatic Declines & Setting Boundaries',
    titleVi: 'Mẫu câu từ chối khéo léo & Thiết lập giới hạn',
    category: 'daily',
    categoryVi: 'Giao tiếp hàng ngày',
    frequency: '★★★★★',
    patternFormula: 'I would love to, but unfortunately [Reason]... / As much as I’d like to help, [Constraint]...',
    nativeMindset:
      'Từ chối mà vẫn giữ được sự quý mến: Khen ngợi/bày tỏ sự hào hứng trước ("I would love to"), sau đó đưa ra lý do khách quan về quỹ thời gian ("bandwidth constraints" hoặc "prior commitment") thay vì nói "I don’t want to".',
    whenToUse: 'Từ chối lời mời ăn tối, từ chối nhận thêm đầu việc khi đã quá tải, hoặc từ chối đàm phán vượt thẩm quyền.',
    examples: [
      {
        en: 'I would love to attend the dinner, but unfortunately I have a prior family commitment.',
        vi: 'Tôi rất muốn tham dự bữa tối, nhưng tiếc là tôi đã có hẹn từ trước với gia đình rồi.',
        context: 'daily',
      },
      {
        en: 'Due to current bandwidth constraints, I won’t be able to take on this additional assignment.',
        vi: 'Do hiện tại quỹ thời gian và khối lượng công việc đã kín, tôi sẽ không thể nhận thêm đầu việc này.',
        context: 'workplace',
      },
      {
        en: 'As much as we would like to accommodate your request, our company policy does not allow exceptions.',
        vi: 'Dẫu rất muốn đáp ứng yêu cầu của quý khách, chính sách công ty chúng tôi không cho phép các ngoại lệ.',
        context: 'toeic',
      },
    ],
    commonMistakes: [
      {
        wrong: 'No, I am too busy and cannot do this.',
        correct: 'I wish I could, but my plate is completely full at the moment.',
        explanation:
          'Cách nói "my plate is full" (tôi đang quá nhiều việc ngập đầu) là thành ngữ rất tự nhiên, lịch sự và không gây mất lòng.',
      },
    ],
    toeicContext: {
      parts: ['Part 3', 'Part 4', 'Part 7'],
      tip: 'TOEIC Part 7 thường có các bức thư khách hàng đòi bồi thường nhưng công ty từ chối: Tìm từ khóa "regret to inform", "unable to accommodate".',
    },
  },
  {
    id: 'pat-clarification-understanding',
    title: 'Clarification & Checking Alignment',
    titleVi: 'Mẫu câu xác nhận thông tin & Đảm bảo hiểu đúng ý',
    category: 'meetings',
    categoryVi: 'Họp hành & Đàm phán',
    frequency: '★★★★★',
    patternFormula: 'Just to make sure we’re on the same page, [Clause]... / Could you clarify what you mean by [Noun]...?',
    nativeMindset:
      'Trong môi trường chuyên nghiệp quốc tế, hiểu sai gây hậu quả nghiêm trọng hơn việc hỏi lại. Người bản xứ coi việc nói "Just to clarify..." là biểu hiện của sự cẩn trọng, tỉ mỉ và chuyên nghiệp cao độ.',
    whenToUse: 'Dùng cuối cuộc họp để chốt lại đầu việc, hoặc khi đối tác giải thích chưa rõ yêu cầu kỹ thuật.',
    examples: [
      {
        en: 'Just to make sure we are on the same page, the final deliverable is due next Friday at noon, right?',
        vi: 'Để đảm bảo đôi bên cùng hiểu thống nhất, sản phẩm bàn giao cuối cùng sẽ chốt vào trưa thứ Sáu tuần tới đúng không?',
        context: 'workplace',
      },
      {
        en: 'Could you clarify what you mean by "customized reporting features"?',
        vi: 'Anh có thể giải thích rõ hơn ý anh về "các tính năng báo cáo tùy biến" được không?',
        context: 'workplace',
      },
      {
        en: 'If I understand correctly, we are holding off on phase two until Q4?',
        vi: 'Nếu tôi hiểu không nhầm, chúng ta sẽ tạm hoãn giai đoạn hai cho đến quý 4 phải không?',
        context: 'toeic',
      },
    ],
    commonMistakes: [
      {
        wrong: 'What do you say? I don’t understand.',
        correct: 'Could you please elaborate on that point? I want to make sure I caught all the details.',
        explanation:
          'Dùng "Could you elaborate on..." (Bạn có thể nói rõ hơn về...) thay vì thừa nhận mình không hiểu một cách cộc lốc.',
      },
    ],
    toeicContext: {
      parts: ['Part 3'],
      tip: 'Part 3 thường có câu hỏi: "What does the woman ask the man to clarify?" -> Chú ý các từ như "elaborate", "specify", "clarify".',
    },
  },
  {
    id: 'pat-offering-proactive-help',
    title: 'Proactive Assistance & Client Support',
    titleVi: 'Mẫu câu đề nghị hỗ trợ chủ động & Chăm sóc khách hàng',
    category: 'email-diplomacy',
    categoryVi: 'Email & Thư từ công vụ',
    frequency: '★★★★★',
    patternFormula: 'Please feel free to reach out if [Clause]... / Should you require any assistance, please don’t hesitate to...',
    nativeMindset:
      'Mở rộng sự chào đón tối đa: Cụm từ "feel free" (hãy thoải mái) và cấu trúc đảo ngữ "Should you have any questions..." thể hiện sự nhiệt tình, đáng tin cậy của dịch vụ khách hàng 5 sao.',
    whenToUse: 'Đặt ở cuối email bàn giao dự án, báo giá, hoặc thư xác nhận đặt phòng/vé máy bay.',
    examples: [
      {
        en: 'Please feel free to reach out if you have any questions regarding the invoice.',
        vi: 'Xin hãy thoải mái liên hệ với tôi nếu quý khách có bất kỳ câu hỏi nào liên quan đến hóa đơn.',
        context: 'workplace',
      },
      {
        en: 'Should you require any further assistance, please do not hesitate to contact our support desk.',
        vi: 'Nếu quý vị cần thêm bất kỳ sự trợ giúp nào, xin đừng ngần ngại liên hệ với bộ phận hỗ trợ của chúng tôi.',
        context: 'toeic',
      },
      {
        en: 'Let me know if there is anything else I can do to help with the transition.',
        vi: 'Hãy nhắn cho tôi biết nếu có điều gì khác tôi có thể hỗ trợ trong quá trình bàn giao nhé.',
        context: 'daily',
      },
    ],
    commonMistakes: [
      {
        wrong: 'If you have questions, call me.',
        correct: 'Please feel free to give me a call if any questions arise.',
        explanation: 'Thêm "Please feel free to" để biến mệnh lệnh khô khan thành lời mời chân thành, ấm áp.',
      },
    ],
    toeicContext: {
      parts: ['Part 5', 'Part 7'],
      tip: 'Đảo ngữ câu điều kiện loại 1 trong TOEIC: "Should you need..." thay cho "If you should need...". Đây là câu hỏi điểm 900+ cực kỳ quen thuộc.',
    },
  },
  {
    id: 'pat-apologies-remedies',
    title: 'Professional Apologies & Remedy Proposals',
    titleVi: 'Mẫu câu xin lỗi chân thành & Đề xuất hướng đền bù',
    category: 'email-diplomacy',
    categoryVi: 'Email & Thư từ công vụ',
    frequency: '★★★★★',
    patternFormula: 'We sincerely apologize for [Noun/V-ing]... / To make up for this, we would like to offer...',
    nativeMindset:
      'Trong văn hóa doanh nghiệp phương Tây, lời xin lỗi chuyên nghiệp gồm 3 phần: (1) Nhận lỗi và đồng cảm với sự bất tiện của đối phương, (2) Nêu nguyên nhân ngắn gọn khách quan, (3) Lập tức đưa ra giải pháp khắc phục (Actionable remedy) thay vì bao biện.',
    whenToUse: 'Xử lý thư khiếu nại của khách hàng, giải quyết đơn hàng giao trễ hoặc lịch bay bị đổi.',
    examples: [
      {
        en: 'We sincerely apologize for the inconvenience caused by the delay in shipment.',
        vi: 'Chúng tôi thành thật xin lỗi vì sự bất tiện gây ra do việc vận chuyển bị chậm trễ.',
        context: 'toeic',
      },
      {
        en: 'Please accept our apologies for the clerical error on your monthly statement.',
        vi: 'Xin vui lòng chấp nhận lời xin lỗi của chúng tôi về sự sai sót sổ sách trên sao kê hàng tháng của quý khách.',
        context: 'toeic',
      },
      {
        en: 'To make up for the oversight, we would like to waive your subscription fee for the next two months.',
        vi: 'Để đền bù cho sơ suất này, chúng tôi xin phép miễn phí thuê bao của quý khách trong hai tháng tới.',
        context: 'workplace',
      },
    ],
    commonMistakes: [
      {
        wrong: 'Sorry about the problem, it wasn’t our fault.',
        correct: 'We apologize for any frustration this situation has caused and are taking steps to resolve it.',
        explanation: 'Không bao giờ chối bỏ trách nhiệm trong thư xin lỗi khách hàng. Tập trung vào cam kết khắc phục.',
      },
    ],
    toeicContext: {
      parts: ['Part 7'],
      tip: 'Khi đọc email giải quyết khiếu nại (Letter of apology), câu hỏi thường hỏi: "What does the company offer to the customer?" -> Hãy tìm các từ như "voucher", "refund", "complimentary", "waive".',
    },
  },
  {
    id: 'pat-scheduling-rescheduling',
    title: 'Scheduling & Rescheduling Appointments',
    titleVi: 'Mẫu câu hẹn lịch & Dời lịch họp tế nhị',
    category: 'daily',
    categoryVi: 'Giao tiếp hàng ngày',
    frequency: '★★★★☆',
    patternFormula: 'Does [Time/Day] work for you? / Would it be possible to reschedule our meeting to...?',
    nativeMindset:
      'Dùng động từ "work for you" thay vì hỏi "Are you free?". "Works for you" bao hàm cả sự thuận tiện, thoải mái về mặt tâm lý chứ không chỉ đơn thuần là có thời gian trống.',
    whenToUse: 'Sắp xếp cuộc hẹn cà phê, phỏng vấn ứng viên hoặc dời cuộc họp khẩn cấp.',
    examples: [
      {
        en: 'Does 3:00 PM on Thursday work for you, or would Friday morning be better?',
        vi: '3 giờ chiều thứ Năm có tiện cho bạn không, hay là sáng thứ Sáu sẽ thuận lợi hơn?',
        context: 'workplace',
      },
      {
        en: 'Something urgent came up; would it be possible to push our session back by thirty minutes?',
        vi: 'Tôi vừa có việc khẩn phát sinh; liệu có thể lùi buổi làm việc của chúng ta lại 30 phút được không?',
        context: 'workplace',
      },
      {
        en: 'Let’s pencil in next Tuesday for our catch-up, and I’ll confirm the venue beforehand.',
        vi: 'Cứ tạm ghi lịch hẹn thứ Ba tuần tới để cà phê nhé, mình sẽ xác nhận địa điểm trước khi đến.',
        context: 'daily',
      },
    ],
    commonMistakes: [
      {
        wrong: 'Can we change the meeting time? I am busy.',
        correct: 'Due to an unexpected scheduling conflict, could we possibly move our meeting to next week?',
        explanation:
          'Dùng thuật ngữ "scheduling conflict" (trùng lịch) lịch sự và chuyên nghiệp hơn rất nhiều so với "I am busy".',
      },
    ],
    toeicContext: {
      parts: ['Part 2', 'Part 3'],
      tip: 'Câu hỏi Part 2: "Does tomorrow afternoon work for you?" -> Câu trả lời đồng ý: "Yes, that sounds perfect" hoặc "Anytime after two is fine".',
    },
  },
  {
    id: 'pat-expressing-conditions',
    title: 'Stating Conditions & Deadlines Firmly',
    titleVi: 'Mẫu câu nêu điều kiện & Chốt kỳ hạn dứt khoát',
    category: 'toeic-workplace',
    categoryVi: 'TOEIC & Công sở thực chiến',
    frequency: '★★★★★',
    patternFormula: 'Provided that [Clause]... / As long as [Clause]... / Under no circumstances should [Inversion]...',
    nativeMindset:
      'Trong soạn thảo điều khoản thương mại hoặc thỏa thuận tiến độ, "Provided that" (với điều kiện là) và "As long as" tạo lập ranh giới cam kết pháp lý rõ ràng, súc tích hơn từ "If" thông thường.',
    whenToUse: 'Dùng trong hợp đồng dịch vụ, cam kết chất lượng (SLA) hoặc văn bản chính sách nội bộ.',
    examples: [
      {
        en: 'Provided that the shipment arrives by Friday, we will process the payment in full.',
        vi: 'Với điều kiện là lô hàng đến trước thứ Sáu, chúng tôi sẽ thanh toán toàn bộ số tiền.',
        context: 'toeic',
      },
      {
        en: 'As long as everyone completes their assigned sections on time, we should easily beat the deadline.',
        vi: 'Chỉ cần mọi người hoàn thành phần việc được giao đúng hạn, chúng ta sẽ vượt tiến độ một cách dễ dàng.',
        context: 'workplace',
      },
      {
        en: 'Under no circumstances should confidential customer data be shared with external parties.',
        vi: 'Trong bất kỳ hoàn cảnh nào cũng không được phép chia sẻ dữ liệu mật của khách hàng với bên thứ ba.',
        context: 'toeic',
      },
    ],
    commonMistakes: [
      {
        wrong: 'Under no circumstances employees can leave early.',
        correct: 'Under no circumstances can employees leave early.',
        explanation:
          'Sau các cụm phủ định đứng đầu câu như "Under no circumstances", "Seldom", "Rarely", bắt buộc phải đảo trợ động từ lên trước chủ ngữ.',
      },
    ],
    toeicContext: {
      parts: ['Part 5', 'Part 6'],
      tip: 'Bẫy đảo ngữ TOEIC Part 5: "Under no circumstances should you..." -> Sau chỗ trống là động từ nguyên thể.',
    },
  },
  {
    id: 'pat-presenting-data-trends',
    title: 'Presenting Data, Trends & Findings',
    titleVi: 'Mẫu câu báo cáo số liệu & Thuyết trình xu hướng',
    category: 'toeic-workplace',
    categoryVi: 'TOEIC & Công sở thực chiến',
    frequency: '★★★★★',
    patternFormula: 'As illustrated in [Chart/Report], [Clause]... / The figures clearly indicate a [Adj] [Noun] in...',
    nativeMindset:
      'Khi thuyết trình số liệu cho ban giám đốc hoặc khách hàng, không chỉ đọc con số ("Sales was 20%"). Người bản xứ luôn kết nối dữ liệu với kết luận có ý nghĩa: "As illustrated by...", "This trend highlights that...".',
    whenToUse: 'Báo cáo doanh thu quý, tổng kết chiến dịch quảng cáo, thuyết trình trước ban quản trị.',
    examples: [
      {
        en: 'As illustrated in the quarterly report, our overseas revenue has surged by nearly 25%.',
        vi: 'Như được minh họa trong báo cáo quý, doanh thu ở thị trường nước ngoài của chúng ta đã tăng vọt gần 25%.',
        context: 'toeic',
      },
      {
        en: 'The recent survey results clearly indicate a growing consumer preference for eco-friendly packaging.',
        vi: 'Kết quả khảo sát gần đây chỉ ra rõ ràng thị hiếu ngày càng tăng của người tiêu dùng đối với bao bì thân thiện môi trường.',
        context: 'toeic',
      },
      {
        en: 'This upward trend suggests that our promotional campaign is successfully reaching younger demographics.',
        vi: 'Xu hướng tăng này cho thấy chiến dịch khuyến mãi của chúng ta đang tiếp cận rất thành công nhóm khách hàng trẻ tuổi.',
        context: 'workplace',
      },
    ],
    commonMistakes: [
      {
        wrong: 'According to me, the chart shows that revenue increases.',
        correct: 'In my view, the chart shows that revenue is steadily increasing.',
        explanation:
          'Không bao giờ dùng "According to me". Chỉ dùng "According to [someone else / source]". Khi nêu ý kiến cá nhân, dùng "In my view" hoặc "From my perspective".',
      },
    ],
    toeicContext: {
      parts: ['Part 4', 'Part 7'],
      tip: 'Trong TOEIC Part 4 (Short Talks) kèm biểu đồ hình ảnh, người nói thường dùng "If you look at the chart on the screen..." để dẫn đến đáp án.',
    },
  },
  {
    id: 'pat-small-talk-icebreakers',
    title: 'Daily Small Talk & Warm Icebreakers',
    titleVi: 'Mẫu câu xã giao hàng ngày & Phá vỡ sự ngại ngùng',
    category: 'socializing',
    categoryVi: 'Giao lưu & Mối quan hệ',
    frequency: '★★★★☆',
    patternFormula: 'How has your week been treating you? / Did you catch the [Event] over the weekend?',
    nativeMindset:
      'Trong văn hóa phương Tây, bắt đầu cuộc họp ngay bằng công việc bị xem là quá lạnh lùng. Dành 1-2 phút "small talk" về thời tiết, kỳ nghỉ cuối tuần hoặc chuyến bay giúp tạo thiện cảm và giảm căng thẳng đối thoại.',
    whenToUse: 'Bắt đầu cuộc gọi Zoom, nói chuyện trong thang máy, lúc chờ đồ uống tại hội nghị.',
    examples: [
      {
        en: 'How has your week been treating you so far? Staying busy?',
        vi: 'Tuần này của bạn thế nào rồi? Vẫn bận rộn chứ?',
        context: 'daily',
      },
      {
        en: 'How was your flight in? I hope you didn’t run into any turbulence.',
        vi: 'Chuyến bay đến đây của anh ổn chứ? Hy vọng là anh không gặp phải vùng nhiễu động nào.',
        context: 'workplace',
      },
      {
        en: 'Did you catch the game yesterday? That final minute was absolutely incredible!',
        vi: 'Hôm qua bạn có xem trận đấu không? Phút cuối cùng thật sự quá đỗi nghẹt thở!',
        context: 'daily',
      },
    ],
    commonMistakes: [
      {
        wrong: 'How are you? — I am fine, thank you, and you?',
        correct: 'I’m doing great, thanks! How about yourself?',
        explanation:
          'Công thức "I’m fine thank you and you" là sách giáo khoa cũ kỹ. Người bản xứ thường đáp "Doing well, thanks!" hoặc "Can’t complain, how about you?".',
      },
    ],
    toeicContext: {
      parts: ['Part 3'],
      tip: 'Đoạn hội thoại Part 3 đôi khi mở đầu bằng câu hỏi thăm xã giao trước khi đi vào vấn đề công việc chính ("How was your vacation in Hawaii?").',
    },
  },
  {
    id: 'pat-gratitude-appreciation',
    title: 'Warm Gratitude & Professional Appreciation',
    titleVi: 'Mẫu câu cảm ơn sâu sắc & Đánh giá cao cống hiến',
    category: 'email-diplomacy',
    categoryVi: 'Email & Thư từ công vụ',
    frequency: '★★★★★',
    patternFormula: 'Thank you in advance for your assistance with [Noun]... / We are immensely grateful for...',
    nativeMindset:
      'Lời cảm ơn chân thành và cụ thể ("Thank you for your prompt response regarding...") có sức mạnh xây dựng quan hệ đồng nghiệp vững chắc hơn một câu "Thanks" ngắn ngủn.',
    whenToUse: 'Kết thúc email nhờ vả, vinh danh thành tích nhân viên, gửi thư cảm ơn đối tác sau sự kiện.',
    examples: [
      {
        en: 'Thank you in advance for your prompt attention to this urgent matter.',
        vi: 'Xin chân thành cảm ơn trước sự quan tâm xử lý nhanh chóng của quý vị đối với vấn đề khẩn cấp này.',
        context: 'toeic',
      },
      {
        en: 'I truly appreciate your insightful feedback on our design prototype.',
        vi: 'Tôi thực sự rất trân trọng những góp ý sâu sắc của bạn đối với bản mẫu thiết kế của chúng tôi.',
        context: 'workplace',
      },
      {
        en: 'Thanks a million for helping me out yesterday, I owe you one!',
        vi: 'Cảm ơn bạn triệu lần vì đã giúp đỡ mình hôm qua nhé, mình nợ bạn một lần đấy!',
        context: 'daily',
      },
    ],
    commonMistakes: [
      {
        wrong: 'Thanks to help me with the task.',
        correct: 'Thank you for helping me with the task.',
        explanation: 'Cấu trúc chuẩn: "Thank you for + V-ing/Noun". "Thanks to" lại có nghĩa là "Nhờ có cái gì".',
      },
    ],
    toeicContext: {
      parts: ['Part 7'],
      tip: 'Các email cảm ơn trong TOEIC Part 7 thường là câu hỏi mục đích: "Why did Ms. Patel write this letter?" -> "To express appreciation to a colleague/speaker".',
    },
  },
  {
    id: 'pat-wrapping-up-meetings',
    title: 'Meeting Conclusions & Action Item Alignment',
    titleVi: 'Mẫu câu kết luận cuộc họp & Phân công hành động',
    category: 'meetings',
    categoryVi: 'Họp hành & Đàm phán',
    frequency: '★★★★★',
    patternFormula: 'Let’s wrap up by summarizing our action items... / To recap what we agreed on today...',
    nativeMindset:
      'Một cuộc họp chuyên nghiệp chỉ thành công khi có "Action Items" rõ ràng (Ai làm việc gì, hạn chót là khi nào). Người chủ trì dùng "To recap..." để mọi người rời phòng họp với cùng một danh sách nhiệm vụ nhất quán.',
    whenToUse: 'Dùng trong 5 phút cuối cùng của mọi cuộc họp trực tiếp hoặc trực tuyến.',
    examples: [
      {
        en: 'Let’s wrap up by assigning clear owners to each action item discussed today.',
        vi: 'Chúng ta hãy kết thúc cuộc họp bằng việc chỉ định rõ người chịu trách nhiệm cho từng đầu việc đã thảo luận hôm nay.',
        context: 'workplace',
      },
      {
        en: 'To recap, Sarah will finalize the slide deck by Wednesday, and David will coordinate with the caterer.',
        vi: 'Để tóm tắt lại, Sarah sẽ hoàn thiện bộ slide trước thứ Tư, còn David sẽ điều phối với bên cung cấp tiệc.',
        context: 'toeic',
      },
      {
        en: 'I think that covers everything on today’s agenda. Thank you all for your time and input!',
        vi: 'Tôi nghĩ chúng ta đã đi qua hết tất cả các mục trong nghị trình hôm nay. Cảm ơn tất cả mọi người vì thời gian và ý kiến đóng góp!',
        context: 'workplace',
      },
    ],
    commonMistakes: [
      {
        wrong: 'The meeting is finished, goodbye.',
        correct: 'Thank you everyone, let’s reconvene next Monday at the same time.',
        explanation: 'Kết thúc lịch thiệp: nhắc lại thời điểm gặp lại tiếp theo ("reconvene next Monday").',
      },
    ],
    toeicContext: {
      parts: ['Part 3', 'Part 4'],
      tip: 'Trong TOEIC Part 3 & 4, đoạn cuối bài nói luôn xuất hiện câu: "What will the listeners probably do next?" -> Lắng nghe các động từ sau "Let\'s wrap up", "Before we adjourn", "Please make sure to".',
    },
  },
];
