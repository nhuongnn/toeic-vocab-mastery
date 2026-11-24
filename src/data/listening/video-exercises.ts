import { VideoListeningExercise } from '@/types/listening';

export const videoExercises: VideoListeningExercise[] = [
  {
    id: 'vid-001',
    title: 'Leading an Effective Business Meeting: Agendas, Deadlines & Action Items',
    titleVi: 'Điều Phối Cuộc Họp Kinh Doanh: Phân Bổ Tiến Độ & Nhiệm Vụ Trọng Tâm',
    category: 'Office & Administration',
    categoryId: 'office-admin',
    level: 'Upper-Intermediate',
    youtubeId: 'cumgPO3Frs0',
    startTimestamp: 5,
    endTimestamp: 145,
    durationSeconds: 140,
    scenarioDescriptionVi:
      'Hội thoại thực tế tại cuộc họp điều hành dự án: Trưởng nhóm Sarah khai mạc cuộc họp, giới thiệu chương trình nghị sự (agenda) gồm tiến độ marketing từ David, xử lý điểm nghẽn kỹ thuật từ Elena và chốt danh sách nhiệm vụ trọng tâm.',
    realWorldContext:
      'Chủ đề điều phối cuộc họp công sở (meeting agendas, timelines, deliverables, action items) xuất hiện liên tục trong TOEIC Listening Part 3 & 4. Người học cần nắm vững các mẫu câu mở đầu cuộc họp ("Let’s get started", "The main purpose of today’s meeting is..."), cách phân công và chốt thời hạn giao việc.',
    nativeSpeechHacks: [
      {
        hackTitle: 'Âm T vỗ (Flap T) trong từ nối âm',
        pattern: 'get started -> [ɡɛd-ˈstɑːrtɪd] / meeting -> [ˈmiːdɪŋ]',
        realWorldUsage:
          'Trong phát âm Anh - Mỹ tự nhiên, âm /t/ giữa hai nguyên âm biến thành âm /d/ lướt nhẹ, giúp câu nói mượt mà và tăng tốc độ nói.',
        listeningSecret: 'Khi nghe thấy âm "ged started", nhận diện ngay đó là "get started".',
      },
      {
        hackTitle: 'Cách nối âm trong cụm từ quản lý công việc',
        pattern: 'lock down -> [lɑːk-daʊn] / action items -> [ˈækʃən-ˌaɪtəmz]',
        realWorldUsage:
          'Các cụm từ mang ý nghĩa chốt quyết định (lock down, sign off, wrap up) được nói liền mạch với ngữ điệu dứt khoát.',
        listeningSecret: 'Chú ý các từ khóa mang tính cam kết: lock down, sign-off, deliverables.',
      },
    ],
    comprehensionQuestions: [
      {
        id: 'vid-q001',
        questionEn: 'What is the main purpose of today’s project status meeting?',
        questionVi: 'Mục đích chính của cuộc họp rà soát tiến độ dự án hôm nay là gì?',
        options: [
          'To interview prospective software developers for the firm.',
          'To review the product launch timeline and assign remaining tasks before development locks.',
          'To celebrate the annual company milestone anniversary.',
          'To relocate the regional corporate headquarters.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Sarah nêu rõ mục đích cuộc họp: "The main purpose of today’s meeting is to review our product launch timeline and assign the remaining tasks before development locks next week."',
      },
      {
        id: 'vid-q002',
        questionEn: 'What is holding up the marketing update from David?',
        questionVi: 'Yếu tố nào đang làm chậm cập nhật tài liệu marketing từ phía David?',
        options: [
          'The social media marketing budget was cancelled.',
          'Waiting on final approval for the promotional video from the branding department.',
          'The graphic designer resigned unexpectedly.',
          'The landing page layouts were corrupted.',
        ],
        correctAnswer: 1,
        explanationVi:
          'David giải thích: "However, we’re still waiting on final approval for the promotional video from the branding department."',
      },
      {
        id: 'vid-q003',
        questionEn: 'When does David expect to receive the branding sign-off?',
        questionVi: 'David dự kiến nhận được phê duyệt từ phòng thương hiệu vào thời điểm nào?',
        options: [
          'By Thursday morning at the latest.',
          'Late on Friday evening.',
          'Next month after the trade expo.',
          'Within the next three hours.',
        ],
        correctAnswer: 0,
        explanationVi:
          'David khẳng định thời hạn chót: "I’m aiming for Thursday morning at the latest."',
      },
    ],
    dictationTasks: [
      {
        id: 'vid-dict-001',
        segmentTitle: 'Khai mạc cuộc họp đúng giờ',
        audioTimestamp: 10,
        contextLeadIn: 'If we are all here,',
        blankText: 'let us get started',
        contextFollowUp: 'Thank you for making the time.',
        hint: 'l__ u_ g__ s______ (chúng ta hãy bắt đầu nhé)',
        ipa: '/lɛt ʌs ɡɛt ˈstɑːrtɪd/',
        speechTipVi: 'Cụm từ mở đầu cuộc họp công sở cực kỳ phổ biến trong giao tiếp quốc tế.',
      },
      {
        id: 'vid-dict-002',
        segmentTitle: 'Chốt các nhiệm vụ và thời hạn',
        audioTimestamp: 55,
        contextLeadIn: 'And finally, we will',
        blankText: 'lock down action items and deadlines',
        contextFollowUp: 'Does anyone have anything to add?',
        hint: 'l___ d___ a_____ i____ a__ d________ (chốt các đầu việc và thời hạn)',
        ipa: '/lɑːk daʊn ˈækʃən ˈaɪtəmz ænd ˈdɛdlaɪnz/',
        speechTipVi: '"Lock down" có nghĩa là chốt lại, xác định dứt khoát không thay đổi.',
      },
    ],
    fullTranscript: [
      {
        time: '0:05',
        speaker: 'Sarah (PM)',
        en: 'Good morning, everyone. If we’re all here, let’s get started. Thank you for making the time. I know everyone is busy.',
        vi: 'Chào buổi sáng mọi người. Nếu chúng ta đã đông đủ, hãy bắt đầu nhé. Cảm ơn mọi người đã thu xếp thời gian, tôi biết ai cũng đang bận rộn.',
      },
      {
        time: '0:20',
        speaker: 'David (Marketing)',
        en: 'Morning, Sarah.',
        vi: 'Chào buổi sáng, Sarah.',
      },
      {
        time: '0:23',
        speaker: 'Elena (Tech Lead)',
        en: 'Hi, good morning.',
        vi: 'Xin chào, chào buổi sáng.',
      },
      {
        time: '0:28',
        speaker: 'Sarah (PM)',
        en: 'The main purpose of today’s meeting is to review our product launch timeline and assign the remaining tasks before development locks next week.',
        vi: 'Mục đích chính của cuộc họp hôm nay là rà soát tiến độ ra mắt sản phẩm và phân công các nhiệm vụ còn lại trước khi khóa đợt phát triển vào tuần tới.',
      },
      {
        time: '0:48',
        speaker: 'Sarah (PM)',
        en: 'Let’s look briefly at the agenda. First, David will give us an update on marketing assets. Second, Elena will walk us through tech blockers. And finally, we’ll lock down action items and deadlines.',
        vi: 'Chúng ta cùng điểm qua chương trình nghị sự nhé. Đầu tiên, David sẽ cập nhật tài liệu marketing. Thứ hai, Elena sẽ điểm qua các vướng mắc kỹ thuật. Và cuối cùng, chúng ta sẽ chốt các đầu việc cùng hạn chót.',
      },
      {
        time: '1:12',
        speaker: 'David (Marketing)',
        en: 'We’ve finalized the social media copy and landing page layouts, but we’re waiting on final approval for the promotional video from branding.',
        vi: 'Chúng tôi đã hoàn thiện nội dung mạng xã hội và giao diện trang đích, nhưng hiện vẫn đang chờ phê duyệt cuối cùng cho video quảng bá từ phòng thương hiệu.',
      },
      {
        time: '1:32',
        speaker: 'Sarah (PM)',
        en: 'Understood. When do you expect that sign-off?',
        vi: 'Tôi hiểu rồi. Anh dự kiến khi nào sẽ nhận được phê duyệt đó?',
      },
      {
        time: '1:40',
        speaker: 'David (Marketing)',
        en: 'I’m aiming for Thursday morning at the latest.',
        vi: 'Tôi đang hướng tới muộn nhất là sáng thứ Năm.',
      },
    ],
  },
  {
    id: 'vid-002',
    title: 'Airport Check-In & Boarding: Travel Documents & Baggage Handling',
    titleVi: 'Thủ Tục Quầy Check-in Sân Bay: Giấy Tờ Bay & Ký Gửi Hành Lý',
    category: 'Travel & Transport',
    categoryId: 'travel',
    level: 'Intermediate',
    youtubeId: 'eRCc007jMFc',
    startTimestamp: 12,
    endTimestamp: 155,
    durationSeconds: 143,
    scenarioDescriptionVi:
      'Hội thoại chuẩn mực tại quầy thủ tục hàng không sân bay quốc tế: Nhân viên hỏi điểm đến của hành khách, kiểm tra hộ chiếu, hướng dẫn cân va li ký gửi và cấp thẻ lên máy bay (boarding pass) cùng thông tin cửa khởi hành.',
    realWorldContext:
      'Chủ đề Sân bay & Du lịch (Airports, flights, boarding passes, luggage allowance, gates) là một trong những phần thi thường gặp nhất ở TOEIC Listening Part 1, 2, 3 và 4. Người học cần luyện phản xạ nghe các câu hỏi quầy vé và chỉ dẫn giờ bay.',
    nativeSpeechHacks: [
      {
        hackTitle: 'Nuốt phụ âm cuối khi đứng trước phụ âm (Elision)',
        pattern: 'boarding pass -> [ˈbɔːrdɪŋ-pæs] / check in -> [ˈtʃɛk-ɪn]',
        realWorldUsage:
          'Nhân viên mặt đất nói nhanh và nối động từ sang giới từ ("check in" -> [tʃɛ-kɪn]), đồng thời nuốt âm chặn cuối từ.',
        listeningSecret: 'Khi nghe "boarding pass", bắt âm đầu /bɔːr/ và âm đuôi /pæs/.',
      },
      {
        hackTitle: 'Cách đọc nhanh số hiệu cửa và thời gian bay',
        pattern: 'Gate B4 at 3:30 PM',
        realWorldUsage:
          'Thông tin số cửa (Gate) và giờ khởi hành luôn được nhấn trọng âm để hành khách ghi nhớ chính xác.',
        listeningSecret: 'Lắng nghe từ khóa sau chữ "Gate" và "boards at".',
      },
    ],
    comprehensionQuestions: [
      {
        id: 'vid-q004',
        questionEn: 'Where is the traveler flying to in the conversation?',
        questionVi: 'Hành khách trong đoạn hội thoại đang bay tới đâu?',
        options: [
          'To London.',
          'To Madrid.',
          'To New York.',
          'To Tokyo.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Hành khách trả lời rõ ràng câu hỏi của nhân viên: "Hello, I’m flying to Madrid."',
      },
      {
        id: 'vid-q005',
        questionEn: 'What luggage does the traveler have for the flight?',
        questionVi: 'Hành khách mang theo những loại hành lý nào cho chuyến bay?',
        options: [
          'Three heavy packing crates.',
          'One suitcase to check and one carry-on backpack.',
          'Only a small laptop sleeve with no checked baggage.',
          'Two musical instrument cases.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Hành khách xác nhận: "Yes, I have one suitcase to check, and this carry-on backpack."',
      },
      {
        id: 'vid-q006',
        questionEn: 'What departure gate and boarding time are printed on the boarding pass?',
        questionVi: 'Cổng khởi hành và giờ lên máy bay nào được in trên thẻ lên tàu?',
        options: [
          'Gate A1 at 1:15 PM.',
          'Gate B4 at 3:30 PM.',
          'Gate C12 at 5:45 PM.',
          'Gate D9 at 8:00 AM.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Nhân viên hướng dẫn: "Your flight boards at Gate B4 at 3:30 PM."',
      },
    ],
    dictationTasks: [
      {
        id: 'vid-dict-004',
        segmentTitle: 'Đặt va li lên bàn cân hành lý',
        audioTimestamp: 65,
        contextLeadIn: 'Please',
        blankText: 'put your suitcase on the scales',
        contextFollowUp: 'Perfect, that is 18 kilos.',
        hint: 'p__ y___ s_______ o_ t__ s_____ (hãy đặt va li của bạn lên cân)',
        ipa: '/pʊt jɔːr ˈsuːtkeɪs ɒn ðə skeɪlz/',
        speechTipVi: '"Scales" trong sân bay là bàn cân hành lý, luôn dùng ở dạng số nhiều.',
      },
      {
        id: 'vid-dict-005',
        segmentTitle: 'Thẻ lên máy bay và cửa khởi hành',
        audioTimestamp: 85,
        contextLeadIn: 'Here is your',
        blankText: 'boarding pass',
        contextFollowUp: 'Your flight boards at Gate B4.',
        hint: 'b_______ p___ (thẻ lên máy bay)',
        ipa: '/ˈbɔːrdɪŋ pæs/',
        speechTipVi: 'Từ vựng quan trọng bậc nhất của TOEIC chủ đề hàng không.',
      },
    ],
    fullTranscript: [
      {
        time: '0:15',
        speaker: 'Airline Staff',
        en: 'Hello. Where are you flying to today?',
        vi: 'Xin chào. Hôm nay bạn bay tới đâu ạ?',
      },
      {
        time: '0:22',
        speaker: 'Traveller',
        en: 'Hello, I’m flying to Madrid.',
        vi: 'Xin chào, tôi bay tới Madrid.',
      },
      {
        time: '0:28',
        speaker: 'Airline Staff',
        en: 'Can I see your passport, please?',
        vi: 'Tôi có thể xem hộ chiếu của bạn được không?',
      },
      {
        time: '0:35',
        speaker: 'Traveller',
        en: 'Yes, of course. Here you are.',
        vi: 'Vâng, tất nhiên rồi. Gửi bạn hộ chiếu của tôi.',
      },
      {
        time: '0:44',
        speaker: 'Airline Staff',
        en: 'Thank you. Do you have any bags to check in?',
        vi: 'Cảm ơn bạn. Bạn có kiện hành lý nào cần ký gửi không?',
      },
      {
        time: '0:52',
        speaker: 'Traveller',
        en: 'Yes, I have one suitcase to check, and this carry-on backpack.',
        vi: 'Có, tôi có một chiếc va li ký gửi và một chiếc ba lô xách tay này.',
      },
      {
        time: '1:05',
        speaker: 'Airline Staff',
        en: 'Please put your suitcase on the scales... Perfect, that is 18 kilos, well within the limit.',
        vi: 'Phiền bạn đặt va li lên cân nhé... Tuyệt vời, đúng 18 cân, hoàn toàn trong hạn mức quy định.',
      },
      {
        time: '1:25',
        speaker: 'Airline Staff',
        en: 'Here is your boarding pass. Your flight boards at Gate B4 at 3:30 PM. Have a good flight!',
        vi: 'Đây là thẻ lên máy bay của bạn. Chuyến bay bắt đầu mở cửa tại Cổng B4 lúc 3:30 chiều. Chúc bạn có chuyến bay tốt lành!',
      },
      {
        time: '1:42',
        speaker: 'Traveller',
        en: 'Thank you very much. Have a great day!',
        vi: 'Cảm ơn bạn rất nhiều. Chúc bạn một ngày tốt lành!',
      },
    ],
  },
  {
    id: 'vid-003',
    title: 'Professional Job Interview: Core Strengths & The STAR Method',
    titleVi: 'Phỏng Vấn Tuyển Dụng Chuyên Nghiệp: Thế Mạnh, Xử Lý Sự Cố & Mô Hình STAR',
    category: 'Personnel & HR',
    categoryId: 'hr-personnel',
    level: 'Upper-Intermediate',
    youtubeId: 'aAYfQZQeeIQ',
    startTimestamp: 10,
    endTimestamp: 155,
    durationSeconds: 145,
    scenarioDescriptionVi:
      'Hội thoại phỏng vấn tuyển dụng thực tế: Nhà tuyển dụng đặt câu hỏi về kinh nghiệm làm việc, thế mạnh nghề nghiệp (phân tích số liệu) và điểm yếu cần cải thiện (kỹ năng ủy thác công việc cho cấp dưới).',
    realWorldContext:
      'Chủ đề Tuyển dụng & Nhân sự (Personnel & HR) là nội dung cốt lõi của đề thi TOEIC. Bạn sẽ luyện phản xạ nghe các câu hỏi phỏng vấn kinh điển ("Tell me a little about yourself", "biggest professional strength", "area to improve") và cách ứng viên diễn đạt thành tích chuyên nghiệp.',
    nativeSpeechHacks: [
      {
        hackTitle: 'Cách nối âm mượt mà khi trả lời phỏng vấn',
        pattern: 'pleased to be here -> [pliːzd-tə-bi-hɪr] / analyse data -> [ˈænəlaɪz-ˈdeɪtə]',
        realWorldUsage:
          'Ứng viên chuyên nghiệp phát âm lướt nhẹ các giới từ "to be", nhấn rõ động từ chỉ năng lực (analyse, increase, lead).',
        listeningSecret: 'Tập trung vào động từ hành động và số liệu phần trăm thành tích.',
      },
      {
        hackTitle: 'Ngữ điệu khi thừa nhận điểm yếu một cách khéo léo',
        pattern: 'Honestly, I sometimes find it difficult to delegate tasks...',
        realWorldUsage:
          'Mở đầu bằng "Honestly" hoặc "To be fair" với ngữ điệu hạ giọng nhẹ để thể hiện sự trung thực và cầu thị.',
        listeningSecret: 'Sau từ "difficult", chú ý động từ nguyên mẫu theo sau (delegate, balance, prioritize).',
      },
    ],
    comprehensionQuestions: [
      {
        id: 'vid-q007',
        questionEn: 'How many years of experience does the candidate have in digital marketing?',
        questionVi: 'Ứng viên có bao nhiêu năm kinh nghiệm trong lĩnh vực digital marketing?',
        options: [
          'One year.',
          'Three years.',
          'Seven years.',
          'Ten years.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Ứng viên giới thiệu: "I have three years of experience in digital marketing, mainly working with social media campaigns and content creation."',
      },
      {
        id: 'vid-q008',
        questionEn: 'What quantifiable professional strength does the candidate highlight?',
        questionVi: 'Thế mạnh chuyên môn kèm số liệu định lượng nào được ứng viên nêu bật?',
        options: [
          'Writing award-winning novels.',
          'Analysing data and increasing engagement by forty percent in six months.',
          'Designing computer motherboards.',
          'Handling international diplomatic negotiations.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Ứng viên nêu rõ: "I’d say my ability to analyse data and turn it into clear action plans. In my last role, I increased our engagement by forty percent in six months."',
      },
      {
        id: 'vid-q009',
        questionEn: 'What weakness does the candidate acknowledge working to improve?',
        questionVi: 'Điểm yếu nào được ứng viên thừa nhận và đang nỗ lực cải thiện?',
        options: [
          'Arriving late to morning meetings.',
          'Difficulty in delegating tasks due to perfectionism.',
          'Refusal to use electronic email.',
          'Reluctance to travel overseas.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Ứng viên chia sẻ: "Honestly, I sometimes find it difficult to delegate tasks because I like to ensure everything is done perfectly."',
      },
    ],
    dictationTasks: [
      {
        id: 'vid-dict-006',
        segmentTitle: 'Thế mạnh chuyên môn nổi bật',
        audioTimestamp: 62,
        contextLeadIn: 'What would you say is your',
        blankText: 'biggest professional strength',
        contextFollowUp: 'in your previous career?',
        hint: 'b______ p___________ s_______ (thế mạnh chuyên môn lớn nhất)',
        ipa: '/ˈbɪɡɪst prəˈfɛʃənl strɛŋkθ/',
        speechTipVi: 'Câu hỏi kinh điển trong phỏng vấn tuyển dụng tiếng Anh.',
      },
      {
        id: 'vid-dict-007',
        segmentTitle: 'Khó khăn trong việc ủy thác nhiệm vụ',
        audioTimestamp: 108,
        contextLeadIn: 'Honestly, I sometimes find it',
        blankText: 'difficult to delegate tasks',
        contextFollowUp: 'because I like to ensure everything is done perfectly.',
        hint: 'd________ t_ d_______ t____ (khó khăn trong việc giao việc cho người khác)',
        ipa: '/ˈdɪfɪkəlt tuː ˈdɛlɪɡeɪt tæsks/',
        speechTipVi: '"Delegate" có nghĩa là ủy thác, phân công công việc cho cấp dưới.',
      },
    ],
    fullTranscript: [
      {
        time: '0:10',
        speaker: 'Hiring Manager',
        en: 'Welcome, and thank you for coming in today. Please, have a seat.',
        vi: 'Chào mừng bạn, cảm ơn bạn đã đến tham gia phỏng vấn hôm nay. Mời bạn ngồi.',
      },
      {
        time: '0:18',
        speaker: 'Candidate',
        en: 'Thank you. I’m really pleased to be here.',
        vi: 'Cảm ơn anh. Tôi rất vui khi có mặt ở đây.',
      },
      {
        time: '0:25',
        speaker: 'Hiring Manager',
        en: 'Let’s start with something simple. Can you tell me a little about yourself?',
        vi: 'Chúng ta hãy bắt đầu với một câu hỏi đơn giản nhé. Bạn có thể chia sẻ đôi nét về bản thân mình không?',
      },
      {
        time: '0:38',
        speaker: 'Candidate',
        en: 'Of course. I have three years of experience in digital marketing, mainly working with social media campaigns and content creation. Before that, I studied communication at university.',
        vi: 'Tất nhiên rồi ạ. Tôi có ba năm kinh nghiệm trong lĩnh vực marketing số, chủ yếu phụ trách các chiến dịch mạng xã hội và sáng tạo nội dung. Trước đó, tôi theo học chuyên ngành truyền thông tại trường đại học.',
      },
      {
        time: '1:02',
        speaker: 'Hiring Manager',
        en: 'That sounds great. What would you say is your biggest professional strength?',
        vi: 'Nghe rất tuyệt. Vậy theo bạn, thế mạnh chuyên môn lớn nhất của bạn là gì?',
      },
      {
        time: '1:15',
        speaker: 'Candidate',
        en: 'I’d say my ability to analyse data and turn it into clear action plans. In my last role, I increased our engagement by forty percent in six months.',
        vi: 'Tôi cho rằng đó là khả năng phân tích dữ liệu và biến chúng thành kế hoạch hành động cụ thể. Ở vị trí trước đây, tôi đã tăng tương tác lên bốn mươi phần trăm trong vòng sáu tháng.',
      },
      {
        time: '1:35',
        speaker: 'Hiring Manager',
        en: 'Impressive! And what about a weakness? What is one area you are working to improve?',
        vi: 'Thật ấn tượng! Còn về điểm yếu thì sao? Đâu là điểm mà bạn đang nỗ lực cải thiện?',
      },
      {
        time: '1:48',
        speaker: 'Candidate',
        en: 'Honestly, I sometimes find it difficult to delegate tasks because I like to ensure everything is done perfectly, but I’ve been working on trusting my team more.',
        vi: 'Thành thật mà nói, đôi khi tôi thấy khó ủy thác công việc vì tôi luôn muốn mọi thứ phải được hoàn hảo, nhưng tôi đang học cách tin tưởng đồng đội của mình nhiều hơn.',
      },
    ],
  },
  {
    id: 'vid-004',
    title: 'Business Dining & Hospitality: Ordering Food & Hospitality Etiquette',
    titleVi: 'Tiệc Chiêu Đãi & Ẩm Thực: Đặt Món Nhà Hàng & Văn Hóa Chiêu Đãi Đối Tác',
    category: 'Dining & Hospitality',
    categoryId: 'dining',
    level: 'Intermediate',
    youtubeId: 'ki2m6Sr3UAU',
    startTimestamp: 5,
    endTimestamp: 135,
    durationSeconds: 130,
    scenarioDescriptionVi:
      'Hội thoại chuẩn mực tại nhà hàng từ bài học nổi tiếng của Ellii: Bồi bàn tiếp cận nhận order, khách xin thêm vài phút xem thực đơn, sau đó gọi món bít tết kèm khoai tây chiên kiểu Pháp và salad đặc trưng của quán.',
    realWorldContext:
      'Chủ đề Ẩm thực & Nhà hàng (Dining & Hospitality) thường xuyên xuất hiện ở TOEIC Part 2, 3 và 7 (menus, restaurant receipts, orders). Nắm được mẫu câu gọi món lịch sự ("Could you give me a few more minutes?", "I’d like...", "how would you like your steak done?") giúp bạn tự tin ghi điểm.',
    nativeSpeechHacks: [
      {
        hackTitle: 'Cách xin thêm thời gian xem menu lịch sự',
        pattern: 'Could you give me a few more minutes? -> [kʊdʒuː ɡɪv miː ə fjuː mɔːr ˈmɪnɪts]',
        realWorldUsage:
          'Khi chưa sẵn sàng gọi món, người bản xứ luôn dùng cấu trúc mềm mỏng "Could you give me a few more minutes" thay vì từ chối thô thiển.',
        listeningSecret: 'Nhận diện cụm "a few more minutes" đi cùng "take your time".',
      },
      {
        hackTitle: 'Cách trả lời độ chín của món bít tết',
        pattern: 'Medium-rare, please -> [ˌmiːdiəm-ˈrɛər pliːz]',
        realWorldUsage:
          'Các mức độ chín của bít tết (rare, medium-rare, medium, well-done) là từ vựng quen thuộc trong các đề thi giao tiếp thương mại.',
        listeningSecret: 'Phân biệt "medium" và "medium-rare".',
      },
    ],
    comprehensionQuestions: [
      {
        id: 'vid-q010',
        questionEn: 'What does the customer initially ask the waiter when approached?',
        questionVi: 'Vị khách ban đầu yêu cầu người phục vụ điều gì khi người phục vụ đến bàn?',
        options: [
          'To cancel the reservation.',
          'For a few more minutes to look over the menu.',
          'To speak with the head restaurant manager immediately.',
          'To bring the bill directly.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Khách hàng lịch sự đề nghị: "Could you give me a few more minutes, please?"',
      },
      {
        id: 'vid-q011',
        questionEn: 'What main dish does the customer order after taking time to decide?',
        questionVi: 'Vị khách gọi món chính nào sau khi đã xem kỹ thực đơn?',
        options: [
          'A bowl of seafood clam chowder.',
          'An eight-ounce steak with French fries.',
          'A vegetarian pasta dish.',
          'A grilled chicken burger.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Khách gọi món: "Yes. I’d like an eight-ounce steak, please." và chọn ăn kèm "French fries".',
      },
      {
        id: 'vid-q012',
        questionEn: 'How does the customer request the steak to be cooked?',
        questionVi: 'Vị khách yêu cầu món bít tết được nấu theo độ chín nào?',
        options: [
          'Rare.',
          'Medium-rare.',
          'Well-done.',
          'Extra crispy.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Khi bồi bàn hỏi "And how would you like your steak done?", khách đáp: "Medium-rare, please."',
      },
    ],
    dictationTasks: [
      {
        id: 'vid-dict-008',
        segmentTitle: 'Xin thêm vài phút xem thực đơn',
        audioTimestamp: 16,
        contextLeadIn: 'Excuse me, could you',
        blankText: 'give me a few more minutes',
        contextFollowUp: 'to look over the dinner menu?',
        hint: 'g___ m_ a f__ m___ m______ (cho tôi thêm vài phút nữa nhé)',
        ipa: '/ɡɪv miː ə fjuː mɔːr ˈmɪnɪts/',
        speechTipVi: 'Cụm từ cửa miệng cực kỳ hữu ích khi đi nhà hàng nước ngoài.',
      },
      {
        id: 'vid-dict-009',
        segmentTitle: 'Các lựa chọn khoai tây ăn kèm',
        audioTimestamp: 72,
        contextLeadIn: 'As side dishes, we have',
        blankText: 'baked, mashed, or French fries',
        contextFollowUp: 'Which one would you prefer?',
        hint: 'b____, m_____, o_ F_____ f____ (khoai tây nướng, nghiền hoặc chiên)',
        ipa: '/beɪkt mæʃt ɔːr frɛntʃ fraɪz/',
        speechTipVi: 'Các cách chế biến khoai tây thông dụng nhất trong nhà hàng Âu - Mỹ.',
      },
    ],
    fullTranscript: [
      {
        time: '0:08',
        speaker: 'Waiter',
        en: 'Good evening. Can I take your order?',
        vi: 'Chào buổi tối quý khách. Tôi có thể nhận gọi món cho quý khách được chưa ạ?',
      },
      {
        time: '0:18',
        speaker: 'Customer',
        en: 'Could you give me a few more minutes, please?',
        vi: 'Phiền bạn cho tôi thêm vài phút nữa được không?',
      },
      {
        time: '0:25',
        speaker: 'Waiter',
        en: 'Certainly. Take your time.',
        vi: 'Chắc chắn rồi ạ. Quý khách cứ thong thả xem nhé.',
      },
      {
        time: '0:38',
        speaker: 'Waiter',
        en: 'Are you ready to order now?',
        vi: 'Quý khách đã sẵn sàng gọi món chưa ạ?',
      },
      {
        time: '0:46',
        speaker: 'Customer',
        en: 'Yes. I’d like an eight-ounce steak, please.',
        vi: 'Vâng. Cho tôi một phần bít tết tám ao-xơ (khoảng 225g) nhé.',
      },
      {
        time: '0:58',
        speaker: 'Waiter',
        en: 'Would you like potatoes or rice with your steak?',
        vi: 'Quý khách muốn dùng kèm khoai tây hay cơm với bít tết ạ?',
      },
      {
        time: '1:08',
        speaker: 'Customer',
        en: 'What kind of potatoes do you have?',
        vi: 'Nhà hàng mình có những loại khoai tây nào?',
      },
      {
        time: '1:15',
        speaker: 'Waiter',
        en: 'We have baked, mashed, or French fries.',
        vi: 'Dạ chúng tôi có khoai tây nướng, khoai tây nghiền hoặc khoai tây chiên kiểu Pháp ạ.',
      },
      {
        time: '1:26',
        speaker: 'Customer',
        en: 'I’ll have French fries, please, and a house salad with oil and vinegar dressing.',
        vi: 'Cho tôi khoai tây chiên nhé, và một đĩa salad đặc trưng của quán với sốt giấm dầu.',
      },
      {
        time: '1:42',
        speaker: 'Waiter',
        en: 'And how would you like your steak done?',
        vi: 'Và quý khách muốn bít tết làm chín ở mức độ nào ạ?',
      },
      {
        time: '1:48',
        speaker: 'Customer',
        en: 'Medium-rare, please. Thank you!',
        vi: 'Chín vừa tái (medium-rare) nhé bạn. Cảm ơn bạn!',
      },
    ],
  },
  {
    id: 'vid-005',
    title: 'Customer Service & Conflict Resolution: Handling Complaints Politely',
    titleVi: 'Xử Lý Khiếu Nại Khách Hàng: Lắng Nghe Đồng Cảm & Khắc Phục Sự Cố Dịch Vụ',
    category: 'Communications & Media',
    categoryId: 'communications',
    level: 'Advanced',
    youtubeId: 'ELC04_FyYNU',
    startTimestamp: 10,
    endTimestamp: 145,
    durationSeconds: 135,
    scenarioDescriptionVi:
      'Mô phỏng cuộc gọi thực tế tại tổng đài chăm sóc khách hàng: Khách hàng phản ánh bị trừ tiền thuê bao hai lần trong tháng, nhân viên thể hiện sự đồng cảm sâu sắc, tra cứu tài khoản, hoàn tiền lập tức và tặng tín dụng cước một tháng.',
    realWorldContext:
      'Giao tiếp qua điện thoại và xử lý khiếu nại (call centers, customer complaints, billing errors, refunds) là chủ điểm kinh điển trong TOEIC Listening Part 3 & 4. Học viên cần quen với ngữ điệu nhã nhặn, cách xoa dịu khách hàng và các mốc thời gian hoàn tiền.',
    nativeSpeechHacks: [
      {
        hackTitle: 'Ngữ điệu hạ giọng thể hiện sự xin lỗi chân thành',
        pattern: 'I truly apologize for the inconvenience -> [Hạ giọng ở cuối câu]',
        realWorldUsage:
          'Khi nói lời xin lỗi khách hàng, nhân viên tổng đài hạ thấp âm lượng và ngân dài nguyên âm để bộc lộ sự đồng cảm.',
        listeningSecret: 'Nhận diện cụm từ: "truly apologize", "understand the frustration".',
      },
      {
        hackTitle: 'Cách phát âm số ngày làm việc hành chính',
        pattern: 'within three to five business days',
        realWorldUsage:
          'Cụm "business days" (ngày làm việc trong tuần, không tính thứ 7 và chủ nhật) luôn được nhấn rõ.',
        listeningSecret: 'Phân biệt "calendar days" (ngày theo lịch) và "business days" (ngày làm việc).',
      },
    ],
    comprehensionQuestions: [
      {
        id: 'vid-q013',
        questionEn: 'What problem does the customer report upon calling customer service?',
        questionVi: 'Vị khách báo cáo sự cố gì khi gọi đến bộ phận chăm sóc khách hàng?',
        options: [
          'Their online password was stolen by hackers.',
          'They were charged twice for their monthly subscription fee.',
          'The package was delivered to the wrong street address.',
          'The mobile app crashed during checkout.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Khách hàng thông báo: "I just checked my bank statement and noticed I was charged twice for my subscription this month!"',
      },
      {
        id: 'vid-q014',
        questionEn: 'What immediate financial resolution does the representative provide?',
        questionVi: 'Giải pháp tài chính trực tiếp nào được nhân viên đưa ra ngay trong cuộc gọi?',
        options: [
          'Told the customer to dispute the charge with their credit card company.',
          'Processed an immediate refund of $49.99 for the duplicate transaction.',
          'Refused to process any refunds until next year.',
          'Offered a discount voucher usable only in physical stores.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Nhân viên xử lý: "I have processed an immediate refund of $49.99."',
      },
      {
        id: 'vid-q015',
        questionEn: 'What additional goodwill compensation is offered to the customer?',
        questionVi: 'Khoản đền bù thiện chí bổ sung nào được nhân viên gửi tặng khách hàng?',
        options: [
          'A free branded thermal coffee mug.',
          'A one-month complimentary service credit.',
          'An invitation to a corporate shareholder banquet.',
          'A fifty percent fee reduction on future international flights.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Nhân viên đền bù thêm: "May I also offer you a one-month service credit?"',
      },
    ],
    dictationTasks: [
      {
        id: 'vid-dict-010',
        segmentTitle: 'Bị trừ phí thuê bao hai lần',
        audioTimestamp: 25,
        contextLeadIn: 'I checked my statement and noticed I was',
        blankText: 'charged twice for my subscription',
        contextFollowUp: 'on my monthly bank account.',
        hint: 'c______ t____ f__ m_ s___________ (bị tính tiền hai lần cho gói đăng ký)',
        ipa: '/tʃɑːrdʒd twaɪs fɔːr maɪ səbˈskrɪpʃən/',
        speechTipVi: '"Subscription" là gói đăng ký định kỳ, từ vựng rất phổ biến trong đề thi TOEIC.',
      },
      {
        id: 'vid-dict-011',
        segmentTitle: 'Thời gian tiền hoàn về tài khoản',
        audioTimestamp: 105,
        contextLeadIn: 'The refund will typically reflect in your account',
        blankText: 'within 3 to 5 business days',
        contextFollowUp: 'depending on your banking provider.',
        hint: 'w_____ 3 t_ 5 b_______ d___ (trong vòng 3 đến 5 ngày làm việc)',
        ipa: '/wɪˈðɪn θriː tuː faɪv ˈbɪznəs deɪz/',
        speechTipVi: '"Business days" là cụm từ quy định thời gian làm việc ngân hàng.',
      },
    ],
    fullTranscript: [
      {
        time: '0:12',
        speaker: 'Agent (Alex)',
        en: 'Thank you for calling customer service. My name is Alex. How may I assist you today?',
        vi: 'Cảm ơn bạn đã gọi tới bộ phận chăm sóc khách hàng. Tôi là Alex. Tôi có thể hỗ trợ gì cho bạn hôm nay ạ?',
      },
      {
        time: '0:24',
        speaker: 'Customer',
        en: 'Hi, I just checked my bank statement and noticed I was charged twice for my subscription this month!',
        vi: 'Chào anh, tôi vừa kiểm tra sao kê ngân hàng và thấy mình bị trừ tiền hai lần cho gói thuê bao tháng này!',
      },
      {
        time: '0:38',
        speaker: 'Agent (Alex)',
        en: 'I truly apologize for the inconvenience and the confusion this caused. Let me check your account and see what happened.',
        vi: 'Tôi thực sự xin lỗi vì sự bất tiện và phiền toái này. Để tôi kiểm tra tài khoản của bạn xem có vấn đề gì xảy ra nhé.',
      },
      {
        time: '0:55',
        speaker: 'Agent (Alex)',
        en: 'Could you please confirm your account number and the billing email address?',
        vi: 'Bạn có thể vui lòng xác nhận số tài khoản và địa chỉ email nhận hóa đơn không?',
      },
      {
        time: '1:08',
        speaker: 'Customer',
        en: 'Sure, my account number is 884-219, and the email is mark.taylor@email.com.',
        vi: 'Được chứ, số tài khoản của tôi là 884-219, và email là mark.taylor@email.com.',
      },
      {
        time: '1:22',
        speaker: 'Agent (Alex)',
        en: 'Thank you. I see the duplicate transaction caused by a gateway glitch. I have processed an immediate refund of $49.99.',
        vi: 'Cảm ơn bạn. Tôi đã thấy giao dịch bị trùng lặp do lỗi cổng thanh toán. Tôi đã xử lý lệnh hoàn tiền ngay lập tức trị giá 49,99 đô la.',
      },
      {
        time: '1:40',
        speaker: 'Agent (Alex)',
        en: 'The refund will typically reflect in your account within 3 to 5 business days. May I also offer you a one-month service credit?',
        vi: 'Tiền hoàn thường sẽ hiển thị trong tài khoản của bạn trong vòng 3 đến 5 ngày làm việc. Tôi xin phép tặng bạn thêm một tháng cước dịch vụ miễn phí nhé?',
      },
      {
        time: '1:55',
        speaker: 'Customer',
        en: 'That would be very helpful. Thank you for resolving this so quickly!',
        vi: 'Thế thì tốt quá. Cảm ơn anh đã giải quyết vấn đề nhanh chóng như vậy!',
      },
    ],
  },
  {
    id: 'vid-006',
    title: 'Product Launch Presentation: Value Proposition & Product Features',
    titleVi: 'Thuyết Trình Ra Mắt Sản Phẩm: Định Vị Giá Trị & Tính Năng Đột Phá',
    category: 'Marketing & Sales',
    categoryId: 'marketing',
    level: 'Upper-Intermediate',
    youtubeId: 'KwiYxyy95kU',
    startTimestamp: 8,
    endTimestamp: 140,
    durationSeconds: 132,
    scenarioDescriptionVi:
      'Thuyết trình chào hàng từ chuỗi bài học nổi tiếng của BBC Learning English: Diễn giả Anna giới thiệu dòng sản phẩm mới, nêu bật thế mạnh vượt trội (ergonomic grip, 100% recyclable) và chia sẻ tỷ suất lợi nhuận kỳ vọng với đối tác.',
    realWorldContext:
      'Thuyết trình sản phẩm và tiếp thị bán hàng (product pitches, market opportunities, key strengths, profit margins) là nội dung thường xuyên của TOEIC Part 4 (Short Talks) và Part 7. Bạn sẽ học cách diễn giả dẫn dắt bài thuyết trình từ tổng quan đến chi tiết.',
    nativeSpeechHacks: [
      {
        hackTitle: 'Cách dẫn dắt bài thuyết trình theo cấu trúc bài bản',
        pattern: 'Today I am going to present... I will start by... and then move on to...',
        realWorldUsage:
          'Người bản xứ luôn dùng mẫu câu báo hiệu (signposting language) để người nghe dễ theo dõi bố cục bài nói.',
        listeningSecret: 'Bắt các cụm: "I’ll start by", "move on to discuss", "let me share".',
      },
      {
        hackTitle: 'Cách nhấn mạnh uy tín và lợi thế của công ty',
        pattern: 'a strong track record of -> [ə strɔːŋ træk ˈrɛkərd ʌv]',
        realWorldUsage:
          '"Track record" có nghĩa là bề dày thành tích, lịch sử uy tín đã được khẳng định trong quá khứ.',
        listeningSecret: '"Track record" là từ vựng rất thường gặp trong đề thi TOEIC Part 7.',
      },
    ],
    comprehensionQuestions: [
      {
        id: 'vid-q016',
        questionEn: 'What is the name of the new product line presented by Anna in the session?',
        questionVi: 'Dòng sản phẩm mới nào được Anna giới thiệu trong buổi thuyết trình?',
        options: [
          'The Golden Orange.',
          'The Imperial Lemon.',
          'The Silver Grapefruit.',
          'The Tropical Mango.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Anna mở đầu: "Today, I am going to present our brand-new product line, the Imperial Lemon."',
      },
      {
        id: 'vid-q017',
        questionEn: 'What key product strengths are highlighted in the presentation?',
        questionVi: 'Những thế mạnh then chốt nào của sản phẩm được nhấn mạnh trong bài nói?',
        options: [
          'High sugar content and artificial flavors.',
          'Ergonomic grip, 100% recyclable materials, and eye-catching packaging.',
          'Expensive luxury gold plating.',
          'Heavyweight glass construction.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Anna nhấn mạnh: "The product\'s key strengths are its ergonomic grip, 100% recyclable materials, and eye-catching packaging."',
      },
      {
        id: 'vid-q018',
        questionEn: 'What question does the prospective distributor ask at the end of the pitch?',
        questionVi: 'Nhà phân phối tiềm năng đặt câu hỏi gì ở phần kết thúc buổi chào hàng?',
        options: [
          'How many vacation days the factory workers receive.',
          'More details regarding the production lead time.',
          'Whether the company is for sale.',
          'Where the CEO went to college.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Đối tác đặt câu hỏi: "Those figures look very promising, Anna. Could you tell us more about your production lead time?"',
      },
    ],
    dictationTasks: [
      {
        id: 'vid-dict-012',
        segmentTitle: 'Cơ hội thị trường tiềm năng',
        audioTimestamp: 25,
        contextLeadIn: 'I will start by outlining the',
        blankText: 'market opportunity',
        contextFollowUp: 'and then move on to key strengths.',
        hint: 'm_____ o__________ (cơ hội thị trường)',
        ipa: '/ˈmɑːrkɪt ˌɒpərˈtuːnəti/',
        speechTipVi: 'Thuật ngữ quen thuộc trong lập kế hoạch kinh doanh và marketing.',
      },
      {
        id: 'vid-dict-013',
        segmentTitle: 'Bề dày uy tín và thành tích',
        audioTimestamp: 50,
        contextLeadIn: 'Our company has a',
        blankText: 'strong track record',
        contextFollowUp: 'of delivering premium quality.',
        hint: 's_____ t____ r_____ (bề dày thành tích vững chắc)',
        ipa: '/strɔːŋ træk ˈrɛkərd/',
        speechTipVi: '"Track record" là cụm từ ghi điểm cao trong phỏng vấn và chào hàng.',
      },
    ],
    fullTranscript: [
      {
        time: '0:10',
        speaker: 'Anna (Presenter)',
        en: 'Good morning, everyone. Today, I am going to present our brand-new product line, the Imperial Lemon.',
        vi: 'Chào buổi sáng mọi người. Hôm nay, tôi sẽ giới thiệu dòng sản phẩm hoàn toàn mới của chúng tôi, Imperial Lemon.',
      },
      {
        time: '0:26',
        speaker: 'Anna (Presenter)',
        en: 'I’ll start by outlining the market opportunity, and then move on to discuss the product\'s key strengths.',
        vi: 'Tôi sẽ bắt đầu bằng việc phác thảo cơ hội thị trường, và sau đó chuyển sang thảo luận về các thế mạnh trọng tâm của sản phẩm.',
      },
      {
        time: '0:45',
        speaker: 'Anna (Presenter)',
        en: 'Our company has a strong track record of delivering premium quality and innovative citrus designs to retail partners.',
        vi: 'Công ty chúng tôi có bề dày thành tích vững chắc trong việc cung cấp chất lượng cao cấp và thiết kế sáng tạo cho các đối tác bán lẻ.',
      },
      {
        time: '1:05',
        speaker: 'Anna (Presenter)',
        en: 'The product\'s key strengths are its ergonomic grip, 100% recyclable materials, and eye-catching packaging.',
        vi: 'Các thế mạnh cốt lõi của sản phẩm là tay cầm công thái học tiện lợi, 100% vật liệu có thể tái chế và bao bì bắt mắt.',
      },
      {
        time: '1:28',
        speaker: 'Anna (Presenter)',
        en: 'Let me share with you our projected profit margins and the promotional launch package available for early distributors.',
        vi: 'Tôi xin phép chia sẻ biên lợi nhuận dự kiến và gói ưu đãi ra mắt dành cho các nhà phân phối đăng ký sớm.',
      },
      {
        time: '1:48',
        speaker: 'Mr Lime (Distributor)',
        en: 'Those figures look very promising, Anna. Could you tell us more about your production lead time?',
        vi: 'Những số liệu đó trông rất nhiều triển vọng đấy Anna. Cô có thể cho chúng tôi biết thêm về thời gian sản xuất và giao hàng không?',
      },
    ],
  },
  {
    id: 'vid-007',
    title: 'Supplier Contract Negotiation: Volume Discounts & Delivery Schedules',
    titleVi: 'Đàm Phán Hợp Đồng Cung Ứng: Chiết Khấu Số Lượng & Tiến Độ Giao Hàng',
    category: 'Purchasing & Contracts',
    categoryId: 'purchasing',
    level: 'Advanced',
    youtubeId: '5bCNKLaSmww',
    startTimestamp: 8,
    endTimestamp: 135,
    durationSeconds: 127,
    scenarioDescriptionVi:
      'Bài học đàm phán thương mại kinh điển từ BBC Office English: Bên mua đề xuất mức giá 5 đô la/đơn vị, nhà cung ứng từ chối khéo léo nhưng sẵn sàng thỏa hiệp giảm xuống 5,50 đô la nếu bên mua cam kết đặt số lượng lớn 10.000 sản phẩm.',
    realWorldContext:
      'Chủ đề Đàm phán Hợp đồng (Purchasing, negotiating, volume discounts, compromise, lead times) là kiến thức quan trọng trong TOEIC. Bạn sẽ học cách thương lượng đôi bên cùng có lợi (win-win), kỹ thuật từ chối ngoại giao ("I’m afraid we can’t go quite that low") và nhượng bộ có điều kiện.',
    nativeSpeechHacks: [
      {
        hackTitle: 'Cách từ chối giá mềm mỏng trong đàm phán',
        pattern: 'I’m afraid we can’t go quite that low... -> [aɪm əˈfreɪd wiː kænt ɡoʊ kwaɪt ðæt loʊ]',
        realWorldUsage:
          'Người bản xứ tránh nói "No" cộc lốc mà dùng "I’m afraid we can’t..." để giữ thái độ hợp tác thiện chí.',
        listeningSecret: 'Nhận diện cụm từ: "I’m afraid we can’t go quite that low".',
      },
      {
        hackTitle: 'Cụm từ thỏa hiệp nhượng bộ đôi bên',
        pattern: 'meet halfway -> [miːt ˌhæfˈweɪ]',
        realWorldUsage:
          '"Meet halfway" có nghĩa là mỗi bên nhượng bộ một nửa để đạt được tiếng nói chung.',
        listeningSecret: 'Khi nghe thấy "meet halfway", chú ý con số ở giữa được đề xuất.',
      },
    ],
    comprehensionQuestions: [
      {
        id: 'vid-q019',
        questionEn: 'Why does the supplier initially push back against the buyer five-dollar target price?',
        questionVi: 'Tại sao nhà cung ứng ban đầu từ chối mức giá mục tiêu 5 đô la của bên mua?',
        options: [
          'Because the factory is relocating to another country.',
          'Because manufacturing and raw material expenses have increased.',
          'Because the buyer company has poor credit rating.',
          'Because the government banned plastic shipments.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Nhà cung ứng giải thích: "I’m afraid we can\'t go quite that low because our manufacturing and raw material costs have risen."',
      },
      {
        id: 'vid-q020',
        questionEn: 'Under what condition does the supplier offer to reduce the unit price?',
        questionVi: 'Nhà cung cấp sẵn sàng giảm đơn giá với điều kiện nào?',
        options: [
          'If the buyer pays ten years in advance.',
          'If the buyer commits to a larger volume order of 10,000 units.',
          'If the buyer picks up goods with their own trucks.',
          'If the buyer cancels other supplier contracts.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Nhà cung cấp nêu điều kiện: "If you can commit to 10,000 units, we could meet halfway and offer five dollars and fifty cents per unit."',
      },
      {
        id: 'vid-q021',
        questionEn: 'What compromise unit price is agreed upon by both parties?',
        questionVi: 'Mức đơn giá thỏa hiệp nào được cả hai bên thống nhất?',
        options: [
          '$4.50 per unit.',
          '$5.50 per unit.',
          '$6.75 per unit.',
          '$8.00 per unit.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Mức giá gặp nhau ở giữa là $5.50/sản phẩm: "meet halfway and offer five dollars and fifty cents per unit."',
      },
    ],
    dictationTasks: [
      {
        id: 'vid-dict-014',
        segmentTitle: 'Mức giá kỳ vọng từ phía bên mua',
        audioTimestamp: 35,
        contextLeadIn: 'From our perspective, we are looking for a price closer to',
        blankText: 'five dollars per unit',
        contextFollowUp: 'for our retail stores.',
        hint: 'f___ d______ p__ u___ (năm đô la mỗi đơn vị)',
        ipa: '/faɪv ˈdɒlərz pɜːr ˈjuːnɪt/',
        speechTipVi: '"Per unit" nghĩa là trên một đơn vị sản phẩm.',
      },
      {
        id: 'vid-dict-015',
        segmentTitle: 'Thỏa hiệp gặp nhau ở giữa',
        audioTimestamp: 95,
        contextLeadIn: 'If you can order ten thousand units, we could',
        blankText: 'meet halfway',
        contextFollowUp: 'and offer five dollars and fifty cents.',
        hint: 'm___ h______ (gặp nhau ở giữa, mỗi bên nhượng bộ một nửa)',
        ipa: '/miːt ˌhæfˈweɪ/',
        speechTipVi: 'Thành ngữ kinh điển trong đàm phán thương mại quốc tế.',
      },
    ],
    fullTranscript: [
      {
        time: '0:12',
        speaker: 'Phil (Host)',
        en: 'Welcome to Office English. Today we are looking at how to negotiate and make concessions in business.',
        vi: 'Chào mừng các bạn đến với Office English. Hôm nay chúng ta sẽ tìm hiểu cách đàm phán và đưa ra nhượng bộ trong kinh doanh.',
      },
      {
        time: '0:28',
        speaker: 'Buyer',
        en: 'We really like your proposal, but from our perspective, we’re looking for a price closer to five dollars per unit.',
        vi: 'Chúng tôi rất thích bản đề xuất của bạn, nhưng theo góc độ của chúng tôi, chúng tôi đang hướng tới mức giá gần với 5 đô la một sản phẩm.',
      },
      {
        time: '0:46',
        speaker: 'Supplier',
        en: 'I’m afraid we can\'t go quite that low because our manufacturing and raw material costs have risen.',
        vi: 'Tôi e rằng chúng tôi không thể hạ giá thấp đến mức đó vì chi phí sản xuất và nguyên vật liệu thô của chúng tôi đã tăng.',
      },
      {
        time: '1:04',
        speaker: 'Buyer',
        en: 'If you’re able to commit to a larger volume order of 10,000 units, could you offer a volume discount?',
        vi: 'Nếu chúng tôi có thể cam kết đặt đơn hàng số lượng lớn hơn là 10.000 sản phẩm, bên bạn có thể chiết khấu số lượng được không?',
      },
      {
        time: '1:22',
        speaker: 'Supplier',
        en: 'If you can commit to 10,000 units, we could meet halfway and offer five dollars and fifty cents per unit.',
        vi: 'Nếu bạn có thể cam kết 10.000 sản phẩm, chúng ta có thể gặp nhau ở giữa và đưa ra mức 5 đô la 50 xu mỗi sản phẩm.',
      },
      {
        time: '1:45',
        speaker: 'Buyer',
        en: 'That sounds like a fair compromise. If we agree on that price, can you guarantee delivery within 30 days?',
        vi: 'Đó có vẻ là một giải pháp thỏa hiệp công bằng. Nếu chúng ta chốt mức giá đó, bạn có thể cam kết giao hàng trong 30 ngày không?',
      },
    ],
  },
  {
    id: 'vid-008',
    title: 'Corporate Finance & Pricing: Budget Allocation & Payment Terms',
    titleVi: 'Tài Chính & Định Giá Doanh Nghiệp: Phân Bổ Ngân Sách & Kỳ Hạn Thanh Toán',
    category: 'Finance & Budgeting',
    categoryId: 'finance',
    level: 'Upper-Intermediate',
    youtubeId: 'RbnnkdE6OXE',
    startTimestamp: 10,
    endTimestamp: 145,
    durationSeconds: 135,
    scenarioDescriptionVi:
      'Hội thoại đàm phán chi phí chuẩn mực từ bài học English with ML: Bên mua nhận thấy báo giá 24.000 đô la vượt ngân sách (dưới 20.000 đô la). Hai bên đàm phán hợp đồng 2 năm để giảm giá xuống 21.000 đô la kèm thanh toán đợt đầu 40% và trả góp hai đợt.',
    realWorldContext:
      'Chủ đề Ngân sách & Tài chính (Corporate budgets, quotes, discounts, installments, down payments) là nội dung thường gặp trong đề thi TOEIC Part 3 & 4. Người học sẽ luyện nghe các con số tiền tệ, tỷ lệ chiết khấu (%) và điều khoản thanh toán trả góp.',
    nativeSpeechHacks: [
      {
        hackTitle: 'Cách phát âm nhanh các số liệu ngân sách và phần trăm',
        pattern: 'below $20,000 -> [bɪˈloʊ ˈtwɛnti ˈθaʊzənd] / 10% discount -> [tɛn pərˈsɛnt ˈdɪskaʊnt]',
        realWorldUsage:
          'Trong đàm phán tài chính, số tiền và tỷ lệ phần trăm được phát âm rất dứt khoát và gắn liền với từ chỉ đơn vị.',
        listeningSecret: 'Bắt cặp thông tin: ngân sách trần (below $20,000) và báo giá gốc ($24,000).',
      },
      {
        hackTitle: 'Cụm từ thanh toán nhiều đợt',
        pattern: 'in two installments -> [ɪn tuː ɪnˈstɔːlmənts]',
        realWorldUsage:
          '"Installments" là các kỳ thanh toán chia nhỏ, rất thường gặp trong hợp đồng thương mại.',
        listeningSecret: '"Installment" = đợt thanh toán từng phần.',
      },
    ],
    comprehensionQuestions: [
      {
        id: 'vid-q022',
        questionEn: 'What was the vendor original price quote compared to the client budget goal?',
        questionVi: 'Báo giá ban đầu của bên cung cấp là bao nhiêu so với ngân sách kỳ vọng của khách hàng?',
        options: [
          'Original was $5,000 and budget was $4,000.',
          'Original was $24,000 while the client hoped to keep it below $20,000.',
          'Original was $100,000 and budget was $80,000.',
          'Original was free of charge for the first month.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Bên mua nêu rõ: "We were hoping to keep the total cost below $20,000. Our original quote is $24,000."',
      },
      {
        id: 'vid-q023',
        questionEn: 'What agreement brings the total price down to $21,000 with priority support?',
        questionVi: 'Thỏa thuận nào giúp đưa mức giá tổng xuống 21.000 đô la kèm hỗ trợ kỹ thuật ưu tiên?',
        options: [
          'Signing a 2-year contract with 40% advance payment within 10 business days.',
          'Paying 100% upfront in cash immediately.',
          'Cutting all employee training sessions completely.',
          'Outsourcing customer service to an offshore third party.',
        ],
        correctAnswer: 0,
        explanationVi:
          'Sarah đồng ý: "I can do that if the first payment of 40% is made within 10 business days, and the remainder in two installments."',
      },
      {
        id: 'vid-q024',
        questionEn: 'How will the remaining balance be settled following the initial payment?',
        questionVi: 'Số dư còn lại sẽ được thanh toán theo phương thức nào sau đợt trả trước?',
        options: [
          'In a single balloon payment five years later.',
          'Divided into two equal payments after implementation.',
          'Waived entirely by the vendor.',
          'Paid via company stocks.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Hai bên thống nhất: "Yes, we could divide it into two equal payments. The first would be due after implementation, and the second 30 days later."',
      },
    ],
    dictationTasks: [
      {
        id: 'vid-dict-016',
        segmentTitle: 'Chi phí cao hơn ngân sách dự kiến',
        audioTimestamp: 25,
        contextLeadIn: 'The overall proposal looks good, but the price is',
        blankText: 'slightly higher than our budget',
        contextFollowUp: 'for this quarterly period.',
        hint: 's_______ h_____ t___ o__ b_____ (hơi cao hơn một chút so với ngân sách của chúng tôi)',
        ipa: '/ˈslaɪtli ˈhaɪər ðæn ˈaʊər ˈbʌdʒɪt/',
        speechTipVi: 'Mẫu câu lịch sự thường dùng để bắt đầu thương lượng giảm giá.',
      },
      {
        id: 'vid-dict-017',
        segmentTitle: 'Chia thành hai đợt thanh toán bằng nhau',
        audioTimestamp: 105,
        contextLeadIn: 'Could we pay the remaining balance in',
        blankText: 'two equal payments',
        contextFollowUp: 'after the service is implemented?',
        hint: 't__ e____ p_______ (hai đợt thanh toán bằng nhau)',
        ipa: '/tuː ˈiːkwəl ˈpeɪmənts/',
        speechTipVi: '"Equal payments" có nghĩa là các đợt thanh toán có giá trị tương đương nhau.',
      },
    ],
    fullTranscript: [
      {
        time: '0:15',
        speaker: 'Sarah (Vendor)',
        en: 'Good morning, Michael. Thank you for meeting with me today to discuss the proposal we sent last week.',
        vi: 'Chào buổi sáng, Michael. Cảm ơn anh đã gặp tôi hôm nay để thảo luận về bản đề xuất chúng tôi gửi tuần trước.',
      },
      {
        time: '0:28',
        speaker: 'Michael (Client)',
        en: 'Good morning, Sarah. We reviewed your proposal and we’re impressed, but the price is slightly higher than our budget.',
        vi: 'Chào buổi sáng, Sarah. Chúng tôi đã xem kỹ bản đề xuất và rất ấn tượng, nhưng mức giá hơi cao hơn một chút so với ngân sách của chúng tôi.',
      },
      {
        time: '0:42',
        speaker: 'Sarah (Vendor)',
        en: 'I understand. May I ask what budget you are working with?',
        vi: 'Tôi hiểu ạ. Tôi có thể hỏi ngân sách của bên anh đang là bao nhiêu không?',
      },
      {
        time: '0:48',
        speaker: 'Michael (Client)',
        en: 'We were hoping to keep the total cost below $20,000. Your original quote is $24,000.',
        vi: 'Chúng tôi đã kỳ vọng giữ tổng chi phí dưới 20.000 đô la. Báo giá ban đầu của bên chị là 24.000 đô la.',
      },
      {
        time: '1:02',
        speaker: 'Sarah (Vendor)',
        en: 'Would your company be able to sign a 2-year contract? With a 2-year agreement, I could offer a 10% discount to $21,600.',
        vi: 'Công ty anh có thể ký hợp đồng thời hạn 2 năm không? Với thỏa thuận 2 năm, tôi có thể giảm giá 10% xuống còn 21.600 đô la.',
      },
      {
        time: '1:22',
        speaker: 'Michael (Client)',
        en: 'Could you bring the total price down to $21,000 with priority technical support included?',
        vi: 'Chị có thể hạ tổng giá xuống 21.000 đô la kèm dịch vụ hỗ trợ kỹ thuật ưu tiên không?',
      },
      {
        time: '1:38',
        speaker: 'Sarah (Vendor)',
        en: 'I can do that if the first payment of 40% is made within 10 business days, and the remainder in two installments.',
        vi: 'Tôi có thể làm được điều đó nếu đợt thanh toán đầu 40% được thực hiện trong 10 ngày làm việc, và phần còn lại trả trong hai đợt.',
      },
      {
        time: '1:54',
        speaker: 'Michael (Client)',
        en: 'That arrangement works for us. I\'ll review it with our finance director and confirm by Friday.',
        vi: 'Sắp xếp như vậy rất hợp lý với chúng tôi. Tôi sẽ trao đổi lại với giám đốc tài chính và xác nhận trước thứ Sáu.',
      },
    ],
  },
  {
    id: 'vid-009',
    title: 'IT Help Desk Support: Resolving System Errors & Network Access',
    titleVi: 'Hỗ Trợ Kỹ Thuật IT Helpdesk: Xử Lý Lỗi Hệ Thống & Kết Nối Mạng Nội Bộ',
    category: 'Technology & IT',
    categoryId: 'technology',
    level: 'Intermediate',
    youtubeId: 'hb_pNd4RoP8',
    startTimestamp: 5,
    endTimestamp: 135,
    durationSeconds: 130,
    scenarioDescriptionVi:
      'Hội thoại hỗ trợ kỹ thuật văn phòng thực tế từ English Dialogues: Nhân viên Sarah bị khóa tài khoản máy tính do gõ sai mật khẩu nhiều lần, gọi điện nhờ IT Help Desk xác minh danh tính và cấp mật khẩu tạm thời để đổi mật khẩu mới.',
    realWorldContext:
      'Chủ đề Hỗ trợ Kỹ thuật & Công nghệ (IT help desks, locked accounts, passwords, troubleshooting, temporary access) xuất hiện thường xuyên trong đề thi TOEIC mới. Bạn sẽ luyện nghe các quy trình xử lý sự cố từng bước và thông tin xác thực tài khoản.',
    nativeSpeechHacks: [
      {
        hackTitle: 'Cách đọc nhanh cụm từ hỗ trợ kỹ thuật',
        pattern: 'trouble logging into my computer -> [ˈtrʌbəl ˈlɔːɡɪŋ ˈɪntə maɪ kəmˈpjuːtər]',
        realWorldUsage:
          'Người nói nối âm "logging into" và giảm âm "to" thành âm schwa /tə/.',
        listeningSecret: 'Bắt cụm từ khóa: "trouble logging in", "account is locked".',
      },
      {
        hackTitle: 'Cụm từ hướng dẫn thao tác phần mềm',
        pattern: 'prompt you to create -> [prɑːmpt juː tuː kriˈeɪt]',
        realWorldUsage:
          '"Prompt" trong tin học có nghĩa là hệ thống nhắc nhở hoặc hiển thị bảng yêu cầu người dùng thực hiện thao tác.',
        listeningSecret: '"Prompt you to..." = yêu cầu bạn làm điều gì đó trên màn hình.',
      },
    ],
    comprehensionQuestions: [
      {
        id: 'vid-q025',
        questionEn: 'Why is the employee unable to log into her computer this morning?',
        questionVi: 'Tại sao nhân viên không thể đăng nhập vào máy tính của mình sáng nay?',
        options: [
          'The computer power supply cable was unplugged.',
          'She typed her password incorrectly too many times, causing the account to be locked.',
          'The office internet router was destroyed by lightning.',
          'The company closed her department permanently.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Sarah giải thích nguyên nhân: "I think I typed my password wrong too many times, and now it says my account is locked."',
      },
      {
        id: 'vid-q026',
        questionEn: 'What verification details does the IT technician ask the employee to confirm?',
        questionVi: 'Kỹ thuật viên IT yêu cầu nhân viên xác nhận những thông tin định danh nào?',
        options: [
          'Her passport number and home address.',
          'Her full name and employee ID number.',
          'Her bank account routing code.',
          'Her personal social media handle.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Mark yêu cầu: "For security purposes, could you please confirm your full name and employee ID number?"',
      },
      {
        id: 'vid-q027',
        questionEn: 'How does the technician help the employee restore access to her account?',
        questionVi: 'Kỹ thuật viên giúp nhân viên khôi phục quyền truy cập bằng cách nào?',
        options: [
          'Sends a temporary password to her backup email address.',
          'Tells her to buy a brand new computer.',
          'Instructs her to wait for twenty-four hours without touching the screen.',
          'Reinstalls the entire operating system from scratch.',
        ],
        correctAnswer: 0,
        explanationVi:
          'Mark hướng dẫn: "I’m going to send a temporary password to your backup email address. Please check your inbox."',
      },
    ],
    dictationTasks: [
      {
        id: 'vid-dict-018',
        segmentTitle: 'Tài khoản bị khóa do gõ sai mật khẩu',
        audioTimestamp: 18,
        contextLeadIn: 'I typed my password wrong too many times, and now my',
        blankText: 'account is locked',
        contextFollowUp: 'on my office desktop computer.',
        hint: 'a______ i_ l_____ (tài khoản đã bị khóa)',
        ipa: '/əˈkaʊnt ɪz lɑːkt/',
        speechTipVi: '"Locked account" là sự cố phổ biến nhất tại các phòng IT Help Desk công sở.',
      },
      {
        id: 'vid-dict-019',
        segmentTitle: 'Mật khẩu tạm thời để đặt lại mật khẩu mới',
        audioTimestamp: 60,
        contextLeadIn: 'I am sending a',
        blankText: 'temporary password',
        contextFollowUp: 'to your backup corporate email address.',
        hint: 't________ p_______ (mật khẩu tạm thời)',
        ipa: '/ˈtɛmpərɛri ˈpæswɜːrd/',
        speechTipVi: '"Temporary" /ˈtɛmpərɛri/ có nghĩa là tạm thời, dùng trong thời gian ngắn.',
      },
    ],
    fullTranscript: [
      {
        time: '0:10',
        speaker: 'Mark (IT Support)',
        en: 'IT Help Desk, this is Mark speaking. How can I help you today?',
        vi: 'Phòng IT Help Desk xin nghe, tôi là Mark. Tôi có thể hỗ trợ gì cho bạn hôm nay ạ?',
      },
      {
        time: '0:22',
        speaker: 'Sarah (User)',
        en: 'Hi Mark, I’m having trouble logging into my computer this morning. It says my account is locked.',
        vi: 'Chào Mark, sáng nay tôi gặp trục trặc khi đăng nhập vào máy tính. Màn hình báo tài khoản của tôi đã bị khóa.',
      },
      {
        time: '0:35',
        speaker: 'Mark (IT Support)',
        en: 'I can certainly help you with that. For security purposes, could you please confirm your full name and employee ID?',
        vi: 'Tôi chắc chắn sẽ giúp bạn xử lý việc này. Vì lý do bảo mật, bạn có thể vui lòng xác nhận họ tên đầy đủ và mã số nhân viên không?',
      },
      {
        time: '0:46',
        speaker: 'Sarah (User)',
        en: 'Sure, my name is Sarah Jenkins, and my employee ID is 48921.',
        vi: 'Được chứ, tên tôi là Sarah Jenkins, và mã số nhân viên của tôi là 48921.',
      },
      {
        time: '0:58',
        speaker: 'Mark (IT Support)',
        en: 'Thanks, Sarah. I see your account is locked out. I’m sending a temporary password to your backup email right now.',
        vi: 'Cảm ơn Sarah. Tôi đã thấy tài khoản của bạn bị khóa. Tôi đang gửi một mật khẩu tạm thời đến email dự phòng của bạn ngay bây giờ.',
      },
      {
        time: '1:15',
        speaker: 'Sarah (User)',
        en: 'Got it! I see the email in my inbox.',
        vi: 'Tôi nhận được rồi! Tôi đã thấy email trong hộp thư đến.',
      },
      {
        time: '1:24',
        speaker: 'Mark (IT Support)',
        en: 'Great. Log in with that temporary password, and it will prompt you to create a brand-new permanent password.',
        vi: 'Tuyệt vời. Bạn hãy đăng nhập bằng mật khẩu tạm thời đó, và hệ thống sẽ nhắc bạn tạo một mật khẩu vĩnh viễn hoàn toàn mới.',
      },
      {
        time: '1:42',
        speaker: 'Sarah (User)',
        en: 'Entering the new password now... Perfect! I\'m logged back in. Thank you so much, Mark!',
        vi: 'Tôi đang nhập mật khẩu mới... Hoàn hảo rồi! Tôi đã vào lại được máy tính. Cảm ơn bạn rất nhiều, Mark!',
      },
      {
        time: '1:50',
        speaker: 'Mark (IT Support)',
        en: 'You\'re very welcome, Sarah. Have a great day!',
        vi: 'Không có chi, Sarah. Chúc bạn một ngày làm việc tốt lành!',
      },
    ],
  },
];
