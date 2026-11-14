import { ReadingLesson } from '@/types/reading';

export const emailMemoLesson: ReadingLesson = {
  id: 'reading-emails-memos',
  categoryId: 'emails-memos',
  title: 'Email & Business Memo Navigation',
  titleVi: 'Bẻ Khóa Thư Điện Tử & Thông Báo Nội Bộ',
  subtitle: 'Kỹ thuật bắt trọn Mục đích (Purpose), Hạn chót (Deadline) và Hành động tiếp theo (Next Action) trong 20 giây.',
  difficulty: 'Core TOEIC',
  frequency: '★★★★★',
  tag: 'TOEIC Part 7 Cốt Lõi',
  estimatedTime: '3 phút đọc hiểu',

  nativeMindset: {
    coreIntuition:
      'Người bản xứ khi mở một email công việc KHÔNG BAO GIỜ đọc từ đầu đến cuối như đọc truyện. Họ áp dụng nguyên tắc BLUF (Bottom Line Up Front): Liếc ngay Tiêu đề (Subject line) + 1-2 câu đầu để biết "Tôi phải làm gì?", sau đó nhảy thẳng xuống đoạn cuối để xem "Hạn chót là khi nào?".',
    readingSpeedSecret:
      'Đừng dịch thầm trong đầu từng từ tiếng Việt. Hãy nhóm các từ thành khối nghĩa (thought groups): [Regarding the meeting] [has been rescheduled] [to next Friday]. Nắm danh từ và động từ chính, bỏ qua giới từ phụ.',
    vietnameseMistakeWarning:
      'Người học Việt thường đọc kỹ từ dòng chào hỏi ("I hope this email finds you well..."), mất 30 giây quý báu vào những câu xã giao vô nghĩa trong khi đáp án TOEIC luôn nằm ở câu chứa động từ chỉ hành động (request, inform, remind, confirm).',
  },

  attackStrategy: {
    step1: 'Quét Tiêu đề (Subject) & 1 câu đầu tiên: 90% câu hỏi "What is the purpose of the email?" có đáp án trực tiếp tại đây.',
    step2: 'Quét người gửi (From) & người nhận (To / CC): Xác định mối quan hệ công việc (Sếp gửi nhân viên, Nhà cung cấp gửi khách hàng, hay Nhân sự gửi toàn công ty).',
    step3: 'Nhảy xuống câu cuối cùng (Call to Action): Tìm các động từ mệnh lệnh hoặc yêu cầu: "Please reply by...", "Make sure to submit...", "Feel free to contact...".',
    proTip: 'Nếu thấy từ "However", "Unfortunately", hoặc "Please note that" ở giữa đoạn, hãy dừng lại đọc kỹ: đây là vị trí chứa thông tin mấu chốt tạo ra bẫy đề thi!',
  },

  goldenParaphrases: [
    {
      original: 'postpone / push back',
      paraphrased: 'reschedule / delay / defer',
      contextVi: 'Dời lịch họp hoặc hoãn sự kiện sang thời điểm khác',
    },
    {
      original: 'complimentary',
      paraphrased: 'free of charge / at no additional cost',
      contextVi: 'Được phục vụ miễn phí (bữa sáng, xe đưa đón, tài liệu)',
    },
    {
      original: 'inquire about',
      paraphrased: 'ask for information / request details',
      contextVi: 'Hỏi thông tin hoặc gửi yêu cầu giải đáp thắc mắc',
    },
    {
      original: 'put into effect / roll out',
      paraphrased: 'implement / execute / introduce',
      contextVi: 'Bắt đầu áp dụng chính sách hoặc quy trình mới',
    },
    {
      original: 'mandatory',
      paraphrased: 'required / compulsory / obligatory',
      contextVi: 'Bắt buộc phải tham dự (buổi tập huấn, kiểm tra sức khỏe)',
    },
  ],

  primaryPassage: {
    type: 'Email',
    title: 'Nội bộ công ty Apex Global Corp',
    header: {
      from: 'Marcus Vance <m.vance@apexglobal.com> (Director of Corporate Events)',
      to: 'All Regional Staff <staff@apexglobal.com>',
      date: 'Monday, October 14, 09:15 AM',
      subject: 'IMPORTANT: Rescheduling of Annual Leadership Summit',
    },
    content: `Dear Team,

I am writing to inform you that our Annual Leadership Summit, originally slated for November 5 at the Grand Horizon Hotel, has been pushed back to November 19. 

The management of Grand Horizon notified us this morning that urgent structural renovations in their main auditorium will not be completed until mid-November. Rather than moving to a smaller secondary venue that cannot comfortably accommodate all 250 attendees, the executive board agreed that shifting the date two weeks forward is the best course of action.

Please note that your reserved hotel rooms have automatically been transferred to the new dates at no additional charge. However, if you had booked independent flight tickets, you must submit your receipt along with an expense claim form to the finance department by Friday, October 25 to receive a full reimbursement for cancellation or change fees.

We apologize for any inconvenience caused and appreciate your flexibility. Please confirm your attendance for the revised dates by replying to Brenda Nichols in HR no later than next Wednesday.

Best regards,
Marcus Vance`,
    vietnameseTranslation: `Kính gửi toàn thể đội ngũ,

Tôi viết thư này để thông báo rằng Hội nghị Thượng đỉnh Lãnh đạo Thường niên của chúng ta, ban đầu dự kiến diễn ra vào ngày 5 tháng 11 tại Khách sạn Grand Horizon, đã được dời lại sang ngày 19 tháng 11.

Ban quản lý Khách sạn Grand Horizon đã thông báo cho chúng tôi sáng nay rằng việc cải tạo cấu trúc khẩn cấp tại khán phòng chính của họ sẽ không hoàn tất cho đến giữa tháng 11. Thay vì chuyển sang một địa điểm phụ nhỏ hơn không thể chứa thoải mái toàn bộ 250 người tham dự, ban điều hành đã đồng ý rằng việc lùi ngày lại hai tuần là giải pháp tối ưu nhất.

Xin lưu ý rằng phòng khách sạn đã đặt của các bạn đã được tự động chuyển sang ngày mới mà không phát sinh thêm chi phí. Tuy nhiên, nếu bạn đã tự đặt vé máy bay riêng, bạn phải nộp hóa đơn kèm theo mẫu yêu cầu thanh toán chi phí cho phòng tài chính trước Thứ Sáu, ngày 25 tháng 10 để được hoàn tiền đầy đủ cho các khoản phí hủy hoặc đổi vé.

Chúng tôi xin lỗi vì sự bất tiện này và rất cảm ơn sự linh hoạt của các bạn. Vui lòng xác nhận sự có mặt của bạn cho ngày mới bằng cách phản hồi cho Brenda Nichols thuộc phòng Nhân sự chậm nhất là Thứ Tư tuần sau.

Trân trọng,
Marcus Vance`,
    keyHighlights: [
      {
        text: 'pushed back to November 19',
        type: 'signal',
        note: 'Từ khóa chỉ sự dời lịch (= rescheduled). Ngày mới là 19/11 (ngày cũ là 5/11).',
      },
      {
        text: 'urgent structural renovations',
        type: 'purpose',
        note: 'Lý do hoãn: sửa chữa hội trường, không phải do nội bộ công ty hủy.',
      },
      {
        text: 'at no additional charge',
        type: 'paraphrase',
        note: 'Paraphrase quen thuộc của "complimentary / free". Khách sạn tự chuyển phòng không thu thêm phí.',
      },
      {
        text: 'by Friday, October 25',
        type: 'action',
        note: 'Hạn chót nộp hóa đơn vé máy bay để được hoàn phí.',
      },
    ],
  },

  commonTraps: [
    {
      trapName: 'Bẫy Ngày cũ vs Ngày mới (Date Confusion)',
      trapDescription: 'Đề thi thường hỏi ngày sự kiện diễn ra. Các phương án sai sẽ đưa ra ngày gửi email (Oct 14), ngày cũ (Nov 5) hoặc hạn nộp chi phí (Oct 25).',
      howToAvoid: 'Luôn khoanh tròn các mốc thời gian và gán nhãn cho nó: "Old date = Nov 5", "New date = Nov 19".',
      examplePassageSnippet: 'originally slated for November 5 ... has been pushed back to November 19',
      distractorOption: 'On November 5',
      correctOption: 'On November 19',
    },
    {
      trapName: 'Bẫy Người chịu trách nhiệm (Contact Person Trap)',
      trapDescription: 'Người gửi email là Marcus Vance (Events), nhưng câu cuối yêu cầu xác nhận tham dự với Brenda Nichols (HR). Đề hỏi: "Who should staff contact to confirm attendance?".',
      howToAvoid: 'Đọc kỹ đại từ và tên riêng ở câu cuối cùng trước lời chào kết thúc thư.',
      examplePassageSnippet: 'replying to Brenda Nichols in HR no later than next Wednesday',
      distractorOption: 'Marcus Vance',
      correctOption: 'Brenda Nichols',
    },
  ],

  quiz: [
    {
      question: 'What is the main purpose of the email?',
      questionType: 'main-idea',
      options: [
        'To announce the cancellation of the leadership summit',
        'To notify staff of a change in an event schedule',
        'To reprimand the hotel management for slow construction',
        'To solicit suggestions for a new summit location',
      ],
      correctAnswer: 1,
      explanation: 'Câu đầu tiên của email nêu rõ: "I am writing to inform you that our Annual Leadership Summit ... has been pushed back to November 19". Từ "pushed back" được paraphrase thành "change in an event schedule". Sự kiện không bị hủy (cancellation) mà chỉ dời ngày.',
      clueSnippet: 'Annual Leadership Summit ... has been pushed back to November 19',
      paraphraseUsed: 'pushed back = change in schedule / reschedule',
    },
    {
      question: 'Why did the executive board decide against moving to another room at Grand Horizon?',
      questionType: 'detail',
      options: [
        'The secondary venue was too expensive',
        'The available space was insufficient for the expected crowd',
        'The audio system in the smaller venue was broken',
        'The hotel refused to provide catering services',
      ],
      correctAnswer: 1,
      explanation: 'Bài viết nêu: "Rather than moving to a smaller secondary venue that cannot comfortably accommodate all 250 attendees...". Cụm "cannot comfortably accommodate" đồng nghĩa với "insufficient space for the crowd".',
      clueSnippet: 'cannot comfortably accommodate all 250 attendees',
      paraphraseUsed: 'cannot comfortably accommodate = space was insufficient',
    },
    {
      question: 'What must employees do by October 25 to get reimbursed for airline tickets?',
      questionType: 'detail',
      options: [
        'Call the airline company directly to dispute the charges',
        'Submit their receipt with an expense form to the finance department',
        'Obtain written authorization from Marcus Vance',
        'Switch their reservations to Grand Horizon partner airlines',
      ],
      correctAnswer: 1,
      explanation: 'Đoạn 3 chỉ rõ: "you must submit your receipt along with an expense claim form to the finance department by Friday, October 25 to receive a full reimbursement".',
      clueSnippet: 'submit your receipt along with an expense claim form to the finance department by Friday, October 25',
      paraphraseUsed: 'submit receipt with expense form = provide documentation to finance',
    },
  ],
};
