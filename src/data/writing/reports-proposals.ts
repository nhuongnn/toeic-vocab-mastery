import { WritingLesson } from '@/types/writing';

export const reportsProposalsLesson: WritingLesson = {
  id: 'writing-reports-proposals',
  categoryId: 'reports-proposals',
  title: 'Business Reports & Executive Proposals',
  titleVi: 'Báo Cáo Tiến Độ & Đề Xuất Dự Án Súc Tích',
  subtitle: 'Kỹ năng lượng hóa kết quả (Data-driven), trình bày gạch đầu dòng và thuyết phục lãnh đạo thông qua số liệu.',
  difficulty: 'Advanced Mastery',
  frequency: '★★★★☆',
  tag: 'Kỹ Năng Soạn Thảo Cấp Cao',

  nativeMindset: {
    coreIntuition:
      'Giám đốc và ban quản trị không có thời gian đọc những bài luận văn dài 10 trang. Báo cáo kinh doanh (Business Report) và đề xuất dự án (Executive Proposal) chuẩn quốc tế luôn phải: [1. Có tóm tắt điều hành - Executive Summary] [2. Lượng hóa bằng con số cụ thể - Quantified Data] [3. Đề xuất hành động theo gạch đầu dòng - Actionable Recommendations].',
    brevitySecret:
      'Thay vì mô tả cảm tính ("Doanh số tăng rất nhiều và nhân viên làm việc chăm chỉ"), hãy dùng số liệu: "Sales revenue increased by 28% year-over-year, driven by our regional distribution expansion." Số liệu tự nó tạo ra sức thuyết phục tuyệt đối.',
    vietnameseMistakeWarning:
      'Người Việt khi viết đề xuất hay dùng câu văn cảm thán, kêu gọi chung chung: "We should do this because it is good for the company". Hãy chứng minh bằng ROI (Return on Investment), thời gian thu hồi vốn và rủi ro nếu không triển khai.',
  },

  formulas: [
    {
      purpose: 'Tuyên bố mục tiêu của báo cáo / đề xuất (Objective Statement)',
      pattern: 'This [report/proposal] evaluates [Subject] and outlines actionable recommendations to [Goal].',
      examples: [
        'This proposal evaluates our current legacy CRM infrastructure and outlines actionable recommendations to migrate to Salesforce.',
        'This quarterly report summarizes customer satisfaction metrics and identifies key areas for retention improvement.',
      ],
      tone: 'Formal',
    },
    {
      purpose: 'Diễn giải nguyên nhân - kết quả bằng số liệu (Quantified Impact)',
      pattern: 'As a direct result of [Action/Event], [Metric] experienced a [Number]% [increase/decrease].',
      examples: [
        'As a direct result of our automated email workflow, lead conversion rates experienced a 34% increase in Q3.',
        'Following the implementation of lean inventory methods, warehouse holding costs decreased by $45,000.',
      ],
      tone: 'Professional',
    },
    {
      purpose: 'Đề xuất các bước hành động tiếp theo (Actionable Next Steps)',
      pattern: 'We strongly recommend [Action] in order to [Desirable Outcome].',
      examples: [
        'We strongly recommend allocating $25,000 to staff cybersecurity training in order to comply with ISO standards.',
        'The proposed implementation timeline comprises three phases across a six-month duration.',
      ],
      tone: 'Formal',
    },
  ],

  beforeAfter: [
    {
      scenarioVi: 'Đề xuất ban giám đốc nâng cấp phần mềm kế toán cũ kỹ',
      awkwardVersion:
        'Our accounting software is very old and very slow. All the accountants are tired because it crashes every day. We should buy software X because it is new, fast, and not too expensive. If we buy it, everyone will be very happy and work better.',
      awkwardFlaw:
        'Cách viết đậm tính cảm tính ("very tired", "everyone will be very happy"), thiếu hoàn toàn số liệu về năng suất, chi phí và thời gian thu hồi vốn.',
      nativeVersion:
        'EXECUTIVE PROPOSAL: Accounting System Modernization\n\n1. Objective:\nThis proposal recommends transitioning from our legacy ledger system to QuickBooks Cloud Enterprise to eliminate daily operational bottlenecks.\n\n2. Key Business Impacts:\n• Reduces invoice reconciliation time by an estimated 45%.\n• Automates multi-currency payroll, saving approximately 12 labor hours weekly.\n• Eliminates recurring server crash incidents that caused 18 hours of downtime in Q2.\n\n3. Financial Overview:\n• Implementation Cost: $14,500 (one-time license & setup).\n• Projected Annual Productivity Gain: $32,000.\n• Estimated Payback Period: 5.5 months.\n\nNext Steps: We recommend approving pilot deployment for the finance department commencing next month.',
      nativeWhy:
        'Cấu trúc rõ ràng 3 phần (Objective -> Key Business Impacts -> Financial Overview), lượng hóa chính xác 45%, 12 giờ, 5.5 tháng hoàn vốn.',
    },
  ],

  powerPhrases: [
    {
      category: 'Lượng hóa tác động và kết quả (Impact Words)',
      phrases: [
        { en: 'Yielded an estimated cost reduction of...', vi: 'Mang lại mức cắt giảm chi phí ước tính là...' },
        { en: 'Streamlined our operational workflow by...', vi: 'Tối ưu hóa quy trình vận hành thêm...' },
        { en: 'Outperformed our initial baseline projections', vi: 'Vượt xa các dự báo ban đầu của chúng tôi' },
      ],
    },
    {
      category: 'Khuyến nghị chiến lược (Strategic Recommendations)',
      phrases: [
        { en: 'The findings indicate a strong necessity to...', vi: 'Các kết quả phát hiện cho thấy sự cần thiết phải...' },
        { en: 'To capitalize on this emerging market opportunity...', vi: 'Để tận dụng cơ hội thị trường mới nổi này...' },
        { en: 'We propose the following course of action:', vi: 'Chúng tôi đề xuất lộ trình hành động như sau:' },
      ],
    },
  ],

  commonTraps: [
    {
      trapTitle: 'Bẫy viết đoạn văn dài không ngắt dòng (Wall of Text)',
      wrongSnippet: 'We had a good quarter because sales went up by 10 percent and also customer complaints went down by 5 percent and the team worked hard on Saturday so we should give bonuses to everyone.',
      rightSnippet: 'Key Q3 Achievements:\n• Sales revenue: +10% year-over-year\n• Customer complaints: -5%\n• Recommendation: Distribute merit-based quarterly performance bonuses.',
      explanation: 'Ban lãnh đạo đọc lướt theo cấu trúc gạch đầu dòng (bullet points). Hãy luôn chia nhỏ thông tin thành các ý chính ngắn gọn.',
    },
    {
      trapTitle: 'Bẫy đưa ra kết luận thiếu dữ liệu chứng minh',
      wrongSnippet: 'Customers definitely love our new mobile application.',
      rightSnippet: 'App store user ratings increased from 3.2 to 4.7 stars based on over 1,200 verified customer reviews.',
      explanation: 'Tránh các từ cảm tính như "definitely love". Hãy chứng minh bằng số sao đánh giá (4.7 stars) và lượng mẫu khảo sát (1,200 reviews).',
    },
  ],

  exercises: [
    {
      instruction: 'Chọn câu tóm tắt tác động kinh doanh lượng hóa số liệu chuyên nghiệp nhất:',
      scenarioVi: 'Báo cáo hiệu quả của chiến dịch marketing tự động hóa gửi email.',
      type: 'multiple-choice',
      options: [
        'Marketing was super good and brought lots of new rich buyers to our web shop.',
        'The automated email marketing initiative generated a 27% increase in qualified leads and $85,000 in incremental revenue during Q3.',
        'Our emails are very pretty so customers clicked them many times.',
        'We sent 10,000 emails and everyone loved reading them on their phones.',
      ],
      correctAnswer: 1,
      explanation: '"The automated email marketing initiative generated a 27% increase in qualified leads and $85,000 in incremental revenue..." có đầy đủ tỷ lệ phần trăm và con số doanh thu thực tế.',
      nativeWritingTip: 'Dùng cụm từ "incremental revenue" (doanh thu tăng thêm) và "qualified leads" (khách hàng tiềm năng đạt chuẩn) thể hiện tư duy kinh doanh sắc bén.',
    },
    {
      instruction: 'Chọn câu mở đầu đề xuất dự án chuẩn xác nhất:',
      scenarioVi: 'Đề xuất thành lập nhóm phản ứng nhanh chăm sóc khách hàng VIP.',
      type: 'multiple-choice',
      options: [
        'I have a fun idea to make a club for VIP customers who spend a lot of money.',
        'This proposal outlines the strategy and resource requirements for establishing a dedicated VIP Client Response Unit.',
        'Let\'s build a team for rich clients because they complain if we are slow.',
        'We need a VIP desk right now otherwise our big clients will leave.',
      ],
      correctAnswer: 1,
      explanation: '"This proposal outlines the strategy and resource requirements for establishing a dedicated VIP Client Response Unit" có tính trang trọng và cấu trúc chuẩn của một bản đề xuất cấp quản lý.',
      nativeWritingTip: 'Mẫu "This proposal outlines the strategy and resource requirements for [Goal]" là cấu trúc kinh điển trong soạn thảo đề án.',
    },
    {
      instruction: 'Chọn cách viết đề xuất các bước hành động tiếp theo rõ ràng nhất:',
      scenarioVi: 'Đề xuất 3 bước triển khai kế hoạch bảo mật dữ liệu.',
      type: 'multiple-choice',
      options: [
        'We should do step 1 then step 2 then step 3 whenever the IT team wakes up.',
        'Actionable Next Steps:\n1. Conduct internal vulnerability audit by Nov 30.\n2. Select certified cloud encryption vendor by Dec 15.\n3. Roll out mandatory security training by Jan 10.',
        'Everyone should try to be careful with passwords and don\'t click strange links.',
        'Security is important so please talk to the IT guys when you have time.',
      ],
      correctAnswer: 1,
      explanation: 'Sử dụng danh sách đánh số với động từ hành động (Conduct, Select, Roll out) và mốc ngày hạn chót cụ thể giúp ban lãnh đạo dễ dàng phê duyệt và phân công trách nhiệm.',
      nativeWritingTip: 'Mỗi gạch đầu dòng của phần "Next Steps" phải bắt đầu bằng một ĐỘNG TỪ NGUYÊN MẪU (Action Verb) kèm DEADLINE.',
    },
  ],
};
