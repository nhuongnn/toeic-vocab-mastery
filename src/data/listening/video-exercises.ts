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
    startTimestamp: 10,
    endTimestamp: 165,
    durationSeconds: 155,
    scenarioDescriptionVi:
      'Tình huống thực chiến điều phối cuộc họp phòng ban: Trưởng nhóm khai mạc cuộc họp, rà soát các hạng mục theo chương trình nghị sự (agenda), thảo luận về tiến độ dự án và phân công trách nhiệm cho các thành viên trước hạn chót.',
    realWorldContext:
      'Chủ đề họp công sở và điều phối dự án (meeting agendas, timelines, action items, updates) là nội dung cốt lõi của TOEIC Listening Part 3 & 4. Bạn sẽ rèn luyện phản xạ nghe các mẫu câu mở đầu cuộc họp ("Let’s get down to business", "cover the agenda"), xử lý thời hạn và tổng kết đầu việc ("wrap up", "assign action items").',
    nativeSpeechHacks: [
      {
        hackTitle: 'Âm T vỗ (Flap T) trong từ ghép nối âm',
        pattern: 'get it done -> [ged-it-dʌn] / meeting -> [miː-dɪŋ]',
        realWorldUsage:
          'Người bản xứ Mỹ biến âm /t/ giữa hai nguyên âm thành âm /d/ lướt nhẹ, làm câu nói mượt mà và tăng tốc độ nói gấp 2 lần.',
        listeningSecret: 'Khi nghe thấy âm "geddit", hãy nhận diện ngay đó là cụm từ "get it".',
      },
      {
        hackTitle: 'Hiện tượng nuốt âm H (H-Dropping)',
        pattern: 'tell him -> [tɛl-ɪm] / give her -> [ɡɪv-ər]',
        realWorldUsage:
          'Trong giao tiếp công sở tự nhiên, đại từ him, her, his thường mất phụ âm /h/ mở đầu, nối thẳng nguyên âm vào từ đứng trước.',
        listeningSecret: 'Đừng chờ đợi nghe rõ "him" hay "her", hãy bắt ngữ cảnh từ động từ đi kèm.',
      },
    ],
    comprehensionQuestions: [
      {
        id: 'vid-q001',
        questionEn: 'What is the main objective of the meeting being conducted?',
        questionVi: 'Mục tiêu chính của cuộc họp đang diễn ra là gì?',
        options: [
          'To interview prospective software developers for the firm.',
          'To review agenda priorities, address roadblocks, and finalize project deadlines.',
          'To celebrate the annual company milestone anniversary.',
          'To relocate the regional corporate headquarters.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Trưởng nhóm mở đầu cuộc họp với mục tiêu rà soát các mục ưu tiên trong chương trình nghị sự, tháo gỡ điểm nghẽn và thống nhất hạn chót của dự án.',
      },
      {
        id: 'vid-q002',
        questionEn: 'What action does the team leader recommend when facing timeline bottlenecks?',
        questionVi: 'Trưởng nhóm khuyến nghị phương án xử lý nào khi gặp điểm nghẽn về tiến độ?',
        options: [
          'Postpone the entire customer release indefinitely.',
          'Deploy core deliverables on schedule and roll out secondary patches in the next phase.',
          'Cancel upcoming team leaves without prior notice.',
          'Transfer project accountability to an offshore subcontractor.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Giải pháp thỏa hiệp chuyên nghiệp là triển khai phần cốt lõi đúng hẹn và cập nhật các tính năng phụ ở giai đoạn kế tiếp.',
      },
      {
        id: 'vid-q003',
        questionEn: 'What will the team follow up on immediately following the session?',
        questionVi: 'Các thành viên sẽ triển khai việc gì ngay sau buổi họp?',
        options: [
          'Re-check action items and sync up on the staging progress.',
          'Submit requests for office equipment refurbishment.',
          'Book reservations for the evening department dinner.',
          'Draft a brand new commercial marketing proposal.',
        ],
        correctAnswer: 0,
        explanationVi:
          'Sau phiên họp, các thành viên cam kết kiểm tra danh sách hành động (action items) và đồng bộ kết quả thử nghiệm trên môi trường kiểm thử.',
      },
    ],
    dictationTasks: [
      {
        id: 'vid-dict-001',
        segmentTitle: 'Khai mạc cuộc họp theo chương trình',
        audioTimestamp: 25,
        contextLeadIn: 'Let us officially',
        blankText: 'get down to business',
        contextFollowUp: 'and review the key agenda topics.',
        hint: 'g__ d___ t_ b_______ (bắt đầu vào việc chính)',
        ipa: '/ɡɛt daʊn tuː ˈbɪznəs/',
        speechTipVi: 'Cụm thành ngữ công sở kinh điển "get down to business" xuất hiện dày đặc trong TOEIC Part 3.',
      },
      {
        id: 'vid-dict-002',
        segmentTitle: 'Tháo gỡ điểm nghẽn tiến độ',
        audioTimestamp: 65,
        contextLeadIn: 'Our primary goal is to address',
        blankText: 'unexpected project roadblocks',
        contextFollowUp: 'before the Friday release.',
        hint: 'u_________ p______ r________ (những trở ngại dự án bất ngờ)',
        ipa: '/ˌʌnɪkˈspɛktɪd ˈprɒdʒɛkt ˈroʊdˌblæks/',
        speechTipVi: '"Roadblock" là từ vựng chỉ điểm nghẽn, chướng ngại vật cản trở tiến độ công việc.',
      },
      {
        id: 'vid-dict-003',
        segmentTitle: 'Hẹn thảo luận cập nhật tình hình',
        audioTimestamp: 110,
        contextLeadIn: 'Let us',
        blankText: 'touch base',
        contextFollowUp: 'right after the lunch break to review the metrics.',
        hint: 't____ b___ (liên lạc, trao đổi nhanh cập nhật tiến độ)',
        ipa: '/tʌtʃ beɪs/',
        speechTipVi: '"Touch base" nối âm tự nhiên và là thành ngữ công sở cực kỳ phổ biến trong giao tiếp Anh - Mỹ.',
      },
    ],
    fullTranscript: [
      {
        time: '0:15',
        speaker: 'Meeting Chair',
        en: 'Good morning everyone. Let’s get down to business and go over the key items on today’s agenda.',
        vi: 'Chào buổi sáng mọi người. Chúng ta cùng bắt tay vào việc chính và rà soát các mục trọng tâm trong chương trình họp hôm nay.',
      },
      {
        time: '0:38',
        speaker: 'Project Lead',
        en: 'Our engineering squad ran into a slight bottleneck with the database sync latency last night.',
        vi: 'Đội ngũ kỹ thuật của chúng tôi tối qua gặp phải một điểm nghẽn nhỏ liên quan đến độ trễ đồng bộ cơ sở dữ liệu.',
      },
      {
        time: '0:58',
        speaker: 'Meeting Chair',
        en: 'Does that require us to push back the delivery deadline for Friday’s product launch?',
        vi: 'Điều đó có đòi hỏi chúng ta phải lùi thời hạn bàn giao cho đợt ra mắt sản phẩm vào thứ Sáu không?',
      },
      {
        time: '1:22',
        speaker: 'Project Lead',
        en: 'Not necessarily. We can deploy core modules first and roll out secondary patches early next week.',
        vi: 'Không nhất thiết ạ. Chúng ta có thể triển khai các mô-đun cốt lõi trước rồi cập nhật các bản vá phụ vào đầu tuần tới.',
      },
      {
        time: '1:45',
        speaker: 'Meeting Chair',
        en: 'Excellent compromise. Let’s touch base at two o’clock after the dry run to confirm the status.',
        vi: 'Giải pháp thỏa hiệp rất tốt. Chúng ta hãy gặp lại lúc hai giờ sau đợt chạy thử nghiệm để xác nhận tình hình nhé.',
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
    startTimestamp: 15,
    endTimestamp: 165,
    durationSeconds: 150,
    scenarioDescriptionVi:
      'Tình huống thực tế tại quầy thủ tục hàng không quốc tế: Hành khách xuất trình hộ chiếu, kiểm tra hạn mức cân nặng kiện hành lý ký gửi, nhận thẻ lên máy bay và xác nhận cửa khởi hành cũng như thời gian mở cửa lên tàu bay.',
    realWorldContext:
      'Giao tiếp hàng không (check-in desks, boarding passes, carry-on luggage, departure gates, flight delays) là chủ đề kinh điển xuất hiện liên tục trong đề thi TOEIC Part 1, 3 và 4. Người học cần nắm vững phản xạ nhận diện các câu hỏi thông dụng của tiếp viên mặt đất.',
    nativeSpeechHacks: [
      {
        hackTitle: 'Nuốt phụ âm cuối khi đứng trước phụ âm (Elision)',
        pattern: 'next flight -> [nɛks-flaɪt] / boarding pass -> [bɔːr-dɪŋ-pæs]',
        realWorldUsage:
          'Phụ âm /t/ hoặc /d/ ở cuối từ thường bị lướt bỏ khi từ kế tiếp bắt đầu bằng phụ âm, giúp tốc độ nói trôi chảy tự nhiên.',
        listeningSecret: 'Nếu bạn nghe thấy âm "neks flight", đó chính là cụm từ "next flight".',
      },
      {
        hackTitle: 'Nối âm phụ âm sang nguyên âm (Consonant-to-Vowel Linking)',
        pattern: 'check in -> [tʃɛ-kɪn] / put it on -> [pʊ-dɪ-tɑːn]',
        realWorldUsage:
          'Tiếp viên sân bay luôn nối phụ âm kết thúc của động từ sang giới từ đi kèm thành một khối âm liền mạch.',
        listeningSecret: 'Nghe "puditon" nghĩa là "put it on" (đặt vật thể lên bàn/cân).',
      },
    ],
    comprehensionQuestions: [
      {
        id: 'vid-q004',
        questionEn: 'What travel document does the airline agent ask the passenger to present first?',
        questionVi: 'Nhân viên hãng hàng không yêu cầu hành khách xuất trình giấy tờ nào đầu tiên?',
        options: [
          'A certified vaccination passport copy.',
          'The passenger passport and booking reference code.',
          'An international driver license.',
          'A corporate sponsorship recommendation letter.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Tại quầy check-in, nhân viên yêu cầu xuất trình hộ chiếu (passport) và mã đặt chỗ chuyến bay (booking reference) để xác minh vé.',
      },
      {
        id: 'vid-q005',
        questionEn: 'What instruction is given regarding the passenger checked suitcase?',
        questionVi: 'Chỉ dẫn nào được đưa ra liên quan đến va li ký gửi của hành khách?',
        options: [
          'It must be carried directly onto the aircraft cabin overhead bin.',
          'Place it onto the luggage scale to verify it does not exceed weight allowance.',
          'Take it to the customs inspection office on the lower ground floor.',
          'Leave it unattended near the departures terminal entrance.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Nhân viên hướng dẫn hành khách đặt kiện va li lên bàn cân hành lý (luggage scale) để kiểm tra trọng lượng hợp lệ.',
      },
      {
        id: 'vid-q006',
        questionEn: 'Where should the passenger proceed after completing the check-in procedure?',
        questionVi: 'Hành khách cần di chuyển tới đâu sau khi hoàn tất thủ tục check-in?',
        options: [
          'To the baggage claim carousel at the arrivals level.',
          'Through security screening toward departure gate 14.',
          'To the airport taxi stand outside the terminal.',
          'To the ticketing office to request a seat downgrade.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Nhân viên hướng dẫn hành khách di chuyển qua cửa kiểm tra an ninh (security screening) để đi về phía cổng khởi hành được chỉ định.',
      },
    ],
    dictationTasks: [
      {
        id: 'vid-dict-004',
        segmentTitle: 'Yêu cầu xuất trình thẻ lên máy bay',
        audioTimestamp: 35,
        contextLeadIn: 'Please present your passport and your',
        blankText: 'boarding pass',
        contextFollowUp: 'before approaching the departure gate.',
        hint: 'b_______ p___ (thẻ lên máy bay)',
        ipa: '/ˈbɔːrdɪŋ pæs/',
        speechTipVi: 'Cụm từ "boarding pass" là từ khóa trọng điểm trong mọi đề thi TOEIC chủ đề Hàng không.',
      },
      {
        id: 'vid-dict-005',
        segmentTitle: 'Kiểm tra hạn mức trọng lượng hành lý',
        audioTimestamp: 85,
        contextLeadIn: 'Could you please place your suitcase on the',
        blankText: 'baggage scale',
        contextFollowUp: 'to confirm it meets the weight allowance?',
        hint: 'b______ s____ (cân hành lý)',
        ipa: '/ˈbæɡɪdʒ skeɪl/',
        speechTipVi: 'Chú ý cách phát âm của "baggage" /ˈbæɡɪdʒ/, đuôi -age đọc là /ɪdʒ/.',
      },
    ],
    fullTranscript: [
      {
        time: '0:18',
        speaker: 'Check-in Agent',
        en: 'Good morning, welcome to SkyWings Airlines! May I see your passport and flight booking confirmation?',
        vi: 'Chào buổi sáng, chào mừng quý khách đến với SkyWings Airlines! Tôi có thể xem hộ chiếu và xác nhận đặt vé của quý khách không?',
      },
      {
        time: '0:38',
        speaker: 'Passenger',
        en: 'Good morning! Here is my passport and e-ticket reference for the flight to Chicago.',
        vi: 'Chào cô! Đây là hộ chiếu và mã vé điện tử của tôi cho chuyến bay đi Chicago.',
      },
      {
        time: '0:58',
        speaker: 'Check-in Agent',
        en: 'Thank you. Are you checking any bags today, or do you only have carry-on luggage?',
        vi: 'Cảm ơn quý khách. Hôm nay quý khách có gửi hành lý không, hay chỉ mang theo hành lý xách tay ạ?',
      },
      {
        time: '1:18',
        speaker: 'Passenger',
        en: 'I have one suitcase to check in, and this small backpack that I will take into the cabin.',
        vi: 'Tôi có một va li gửi và một chiếc ba lô nhỏ này sẽ mang lên khoang máy bay.',
      },
      {
        time: '1:42',
        speaker: 'Check-in Agent',
        en: 'Perfect. Your suitcase is twenty kilograms, well within the limit. Here is your boarding pass for Gate 14.',
        vi: 'Tuyệt vời. Va li của quý khách nặng hai mươi cân, hoàn toàn đúng hạn mức. Đây là thẻ lên máy bay tại Cổng 14.',
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
    endTimestamp: 160,
    durationSeconds: 150,
    scenarioDescriptionVi:
      'Mô phỏng buổi phỏng vấn tuyển dụng thực tế: Nhà tuyển dụng đặt câu hỏi tình huống về cách vượt qua thách thức công việc và ứng viên vận dụng mô hình STAR (Situation, Task, Action, Result) để nêu bật năng lực giải quyết vấn đề.',
    realWorldContext:
      'Chủ đề Nhân sự & Tuyển dụng (Personnel & HR) là một trong những phần thi chiếm điểm số lớn trong TOEIC. Bạn sẽ học cách bắt ý chính trong các câu hỏi năng lực (competency questions) và các từ vựng diễn đạt thành tích chuyên nghiệp.',
    nativeSpeechHacks: [
      {
        hackTitle: 'Rút gọn mệnh đề quan hệ dạng phân từ (Reduced Relative Clauses)',
        pattern: 'The challenge faced by the team -> The challenge that was faced...',
        realWorldUsage:
          'Trong phỏng vấn công sở, người nói thường lược bỏ đại từ quan hệ và to be để câu văn gãy gọn, súc tích.',
        listeningSecret: 'Nhận diện động từ dạng quá khứ phân từ đi liền sau danh từ (faced, assigned, tasked).',
      },
      {
        hackTitle: 'Nhấn mạnh từ mang thông tin chính (Content Word Stress)',
        pattern: 'I led the migration project successfully within two months.',
        realWorldUsage:
          'Ứng viên nhấn mạnh các động từ hành động (led, resolved, increased) và số liệu thời gian để gây ấn tượng mạnh.',
        listeningSecret: 'Tập trung lắng nghe các từ được nhấn âm lượng lớn hơn trong câu trả lời.',
      },
    ],
    comprehensionQuestions: [
      {
        id: 'vid-q007',
        questionEn: 'What behavioral interview technique does the candidate use to structure the answer?',
        questionVi: 'Ứng viên sử dụng phương pháp trả lời phỏng vấn hành vi nào để trình bày câu trả lời?',
        options: [
          'The chronological life history narrative.',
          'The STAR method: Situation, Task, Action, and Result.',
          'The memorized scripted pitch without real-world context.',
          'The informal conversational approach without specific metrics.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Ứng viên chuyên nghiệp cấu trúc câu trả lời theo mô hình STAR chuẩn mực: Tình huống (Situation) - Nhiệm vụ (Task) - Hành động (Action) - Kết quả (Result).',
      },
      {
        id: 'vid-q008',
        questionEn: 'How did the candidate resolve the critical logistics delay mentioned in the scenario?',
        questionVi: 'Ứng viên đã xử lý sự cố chậm trễ kho vận được nhắc đến như thế nào?',
        options: [
          'Waited for the overseas supplier to resume normal production.',
          'Onboarded a regional backup vendor and negotiated expedited freight within 48 hours.',
          'Advised the executive board to shut down the manufacturing plant.',
          'Cancelled all pending client purchase orders immediately.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Ứng viên giải thích đã kích hoạt nhà cung ứng dự phòng trong khu vực và đàm phán vận chuyển hỏa tốc trong 48 giờ.',
      },
      {
        id: 'vid-q009',
        questionEn: 'What positive impression does the interviewer express at the conclusion?',
        questionVi: 'Nhà tuyển dụng thể hiện ấn tượng tích cực nào ở phần kết thúc?',
        options: [
          'Skepticism regarding the candidate technical background.',
          'Commendation for the candidate leadership agility and calm problem-solving ability.',
          'Reluctance to proceed to the next interview round.',
          'Surprise that the candidate did not bring physical references.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Nhà tuyển dụng đánh giá cao sự linh hoạt trong khả năng lãnh đạo (leadership agility) và phong thái giải quyết vấn đề điềm tĩnh dưới áp lực.',
      },
    ],
    dictationTasks: [
      {
        id: 'vid-dict-006',
        segmentTitle: 'Giải quyết thách thức dưới áp lực',
        audioTimestamp: 40,
        contextLeadIn: 'When confronted with sudden supply disruptions, I demonstrated',
        blankText: 'leadership agility under pressure',
        contextFollowUp: 'to protect project deliverables.',
        hint: 'l_________ a______ u____ p_______ (khả năng lãnh đạo linh hoạt dưới áp lực)',
        ipa: '/ˈliːdərʃɪp əˈdʒɪləti ˈʌndər ˈprɛʃər/',
        speechTipVi: '"Agility" /əˈdʒɪləti/ có nghĩa là sự nhanh nhạy, linh hoạt, từ vựng đắt giá trong TOEIC HR.',
      },
      {
        id: 'vid-dict-007',
        segmentTitle: 'Kích hoạt phương án dự phòng',
        audioTimestamp: 95,
        contextLeadIn: 'Our department immediately implemented a',
        blankText: 'contingency plan',
        contextFollowUp: 'to ensure uninterrupted client operations.',
        hint: 'c__________ p___ (kế hoạch dự phòng)',
        ipa: '/kənˈtɪndʒənsi plæn/',
        speechTipVi: '"Contingency plan" là thuật ngữ quản trị rủi ro xuất hiện thường xuyên trong TOEIC Part 4 & 7.',
      },
    ],
    fullTranscript: [
      {
        time: '0:16',
        speaker: 'Interviewer',
        en: 'Could you describe a challenging workplace situation where you had to adapt quickly under tight deadlines?',
        vi: 'Bạn có thể mô tả một tình huống công việc nhiều thách thức khi bạn phải thích ứng nhanh chóng dưới hạn chót gấp rút không?',
      },
      {
        time: '0:42',
        speaker: 'Candidate',
        en: 'Certainly. At my previous firm, our main components supplier faced a strike two weeks before delivery.',
        vi: 'Chắc chắn rồi ạ. Tại công ty trước đây của tôi, nhà cung ứng linh kiện chính gặp đình công hai tuần trước ngày giao hàng.',
      },
      {
        time: '1:05',
        speaker: 'Candidate',
        en: 'I mobilized our procurement team, vetted three backup vendors, and secured emergency shipping within 48 hours.',
        vi: 'Tôi đã huy động đội thu mua, thẩm định ba nhà cung ứng dự phòng và hoàn tất vận chuyển khẩn cấp trong vòng 48 giờ.',
      },
      {
        time: '1:28',
        speaker: 'Candidate',
        en: 'As a result, we delivered the order on time with zero penalty fees and retained our client’s trust.',
        vi: 'Kết quả là chúng tôi đã giao hàng đúng hẹn mà không phải chịu bất kỳ khoản phạt nào và giữ vững niềm tin của khách hàng.',
      },
      {
        time: '1:48',
        speaker: 'Interviewer',
        en: 'That demonstrates outstanding crisis management and resilience. Exactly what we need in this role.',
        vi: 'Điều đó thể hiện khả năng quản trị khủng hoảng và sự kiên cường xuất sắc. Đúng là những gì chúng tôi tìm kiếm ở vị trí này.',
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
    startTimestamp: 8,
    endTimestamp: 155,
    durationSeconds: 147,
    scenarioDescriptionVi:
      'Tình huống bữa trưa làm việc chiêu đãi đối tác tại nhà hàng: Đặt bàn, hỏi thăm gợi ý món ăn đặc trưng của quán, đưa ra yêu cầu về chế độ dinh dưỡng và hoàn tất thanh toán hóa đơn bữa tiệc.',
    realWorldContext:
      'Ẩm thực và chiêu đãi đối tác (Dining & Hospitality) thường xuyên xuất hiện ở TOEIC Part 2 (câu hỏi mời mọc, gợi ý), Part 3 và Part 7 (hóa đơn nhà hàng, đặt bàn tiệc). Kỹ năng nhận diện từ vựng đồ ăn, cách gọi món và đề nghị thanh toán là điểm mấu chốt.',
    nativeSpeechHacks: [
      {
        hackTitle: 'Cách nối âm khi gọi món lịch sự',
        pattern: 'Could we get -> [kʊd-wi-ɡɛt] / I would like -> [aɪd-laɪk]',
        realWorldUsage:
          'Trong giao tiếp nhà hàng, người bản xứ luôn dùng cấu trúc rút gọn "I’d like" hoặc câu hỏi khéo léo "Could we get..." để giữ phép lịch sự tối đa.',
        listeningSecret: 'Nhận diện cụm từ "I’d like" = "I want" một cách nhã nhặn.',
      },
      {
        hackTitle: 'Cụm từ thanh toán hóa đơn công vụ',
        pattern: 'pick up the tab -> [pɪk-ʌp-ðə-tæb] / split the bill -> [splɪt-ðə-bɪl]',
        realWorldUsage:
          '"Pick up the tab" là thành ngữ thân mật để nói bên mời sẽ thanh toán chiêu đãi toàn bộ bữa ăn.',
        listeningSecret: 'Khi nghe thấy "tab" trong ngữ cảnh nhà hàng, đó là "bill/hóa đơn".',
      },
    ],
    comprehensionQuestions: [
      {
        id: 'vid-q010',
        questionEn: 'What dietary preference or inquiry does the customer raise with the restaurant server?',
        questionVi: 'Vị khách nêu câu hỏi hoặc yêu cầu gì về chế độ ăn uống với nhân viên phục vụ?',
        options: [
          'Whether the chef can prepare meals completely free of gluten and dairy.',
          'Whether the restaurant offers a special corporate discount package.',
          'Whether the establishment provides outdoor seating on the patio.',
          'Whether the dining room has live acoustic musical performances.',
        ],
        correctAnswer: 0,
        explanationVi:
          'Khách hàng hỏi nhân viên phục vụ xem thực đơn có món nào được chế biến không chứa gluten và sữa (dairy-free) hay không.',
      },
      {
        id: 'vid-q011',
        questionEn: 'What entree recommendation does the server suggest to the guests?',
        questionVi: 'Nhân viên phục vụ đề xuất món chính đặc biệt nào cho thực khách?',
        options: [
          'The house specialty grilled salmon with roasted seasonal vegetables.',
          'The deep-fried seafood combo platter with spicy sauce.',
          'The cold delicatessen sandwich with potato chips.',
          'The spicy chicken curry with white basmati rice.',
        ],
        correctAnswer: 0,
        explanationVi:
          'Nhân viên phục vụ nhiệt tình giới thiệu món cá hồi nướng đặc trưng của nhà hàng kèm rau củ theo mùa nướng.',
      },
      {
        id: 'vid-q012',
        questionEn: 'How does the host conclude the dining experience regarding the check?',
        questionVi: 'Người chủ tiệc xử lý hóa đơn bữa ăn như thế nào ở phần kết?',
        options: [
          'Asks each participant to contribute equal cash shares.',
          'Informs the guest that their company will cover the entire tab on corporate expense.',
          'Requests the server to hold the bill until next week.',
          'Applies for a restaurant refund voucher due to slow service.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Người chủ trì bữa tiệc thông báo rằng công ty họ sẽ chiêu đãi và thanh toán toàn bộ hóa đơn ("pick up the tab").',
      },
    ],
    dictationTasks: [
      {
        id: 'vid-dict-008',
        segmentTitle: 'Chiêu đãi hóa đơn bữa tiệc',
        audioTimestamp: 125,
        contextLeadIn: 'Please do not worry about the expenses; our firm will',
        blankText: 'pick up the tab',
        contextFollowUp: 'for today business lunch.',
        hint: 'p___ u_ t__ t__ (thanh toán toàn bộ hóa đơn bữa tiệc)',
        ipa: '/pɪk ʌp ðə tæb/',
        speechTipVi: '"Pick up the tab" là thành ngữ cực kỳ thông dụng trong môi trường giao tế thương mại.',
      },
      {
        id: 'vid-dict-009',
        segmentTitle: 'Hỏi về món đặc sản của nhà hàng',
        audioTimestamp: 45,
        contextLeadIn: 'Could you tell us what the chef recommends as the',
        blankText: 'house specialty',
        contextFollowUp: 'for our business guests this afternoon?',
        hint: 'h____ s________ (món đặc sản, món tủ của quán)',
        ipa: '/haʊs ˈspɛʃəlti/',
        speechTipVi: '"House specialty" nghĩa là món ăn làm nên thương hiệu của nhà hàng.',
      },
    ],
    fullTranscript: [
      {
        time: '0:14',
        speaker: 'Server',
        en: 'Good afternoon, welcome to The Bistro! Here are your menus. Can I start you off with something to drink?',
        vi: 'Xin chào quý khách, chào mừng đến với The Bistro! Đây là thực đơn ạ. Tôi có thể lấy đồ uống khai vị cho quý khách trước không?',
      },
      {
        time: '0:36',
        speaker: 'Host',
        en: 'Sparkling mineral water for both of us, please. Could you also tell us about your house specialties today?',
        vi: 'Cho hai chúng tôi nước khoáng có ga nhé. Cô có thể giới thiệu về các món đặc sản hôm nay của nhà hàng không?',
      },
      {
        time: '0:58',
        speaker: 'Server',
        en: 'Our pan-seared Atlantic salmon with asparagus is outstanding, and we can prepare it dairy-free upon request.',
        vi: 'Món cá hồi Đại Tây Dương áp chảo kèm măng tây hôm nay rất tuyệt ạ, và chúng tôi có thể chế biến không dùng sữa theo yêu cầu.',
      },
      {
        time: '1:24',
        speaker: 'Guest',
        en: 'That sounds delightful! I will have the salmon, and a fresh garden salad on the side.',
        vi: 'Nghe hấp dẫn quá! Cho tôi một phần cá hồi đó, và một đĩa salad tươi dùng kèm nhé.',
      },
      {
        time: '1:45',
        speaker: 'Host',
        en: 'Excellent choice. And please bring the check directly to me when we finish; I am picking up the tab.',
        vi: 'Lựa chọn tuyệt vời. Và phiền cô mang hóa đơn thanh toán trực tiếp cho tôi khi dùng xong nhé; tôi sẽ chiêu đãi bữa này.',
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
    startTimestamp: 12,
    endTimestamp: 165,
    durationSeconds: 153,
    scenarioDescriptionVi:
      'Tình huống tổng đài chăm sóc khách hàng: Đại diện dịch vụ tiếp nhận cuộc gọi khiếu nại về sai sót đơn hàng, vận dụng kỹ năng lắng nghe tích cực (active listening), xoa dịu bức xúc và đề xuất bồi thường thỏa đáng.',
    realWorldContext:
      'Các đoạn hội thoại Part 3 và bài nói Part 4 về giải quyết khiếu nại (complaints, refunds, compensation, service recovery) đòi hỏi bạn nhận diện các mẫu câu ngoại giao nhã nhặn và phân biệt cảm xúc của người nói.',
    nativeSpeechHacks: [
      {
        hackTitle: 'Ngữ điệu hạ giọng thể hiện sự cảm thông (Empathetic Intonation)',
        pattern: 'I sincerely apologize for the inconvenience -> [Hạ giọng ở cuối câu]',
        realWorldUsage:
          'Khi xin lỗi khách hàng, nhân viên tổng đài hạ tông giọng và kéo dài các nguyên âm để truyền tải sự chân thành và thấu hiểu.',
        listeningSecret: 'Nhận diện các cụm từ thể hiện sự thấu hiểu như "I understand your frustration".',
      },
      {
        hackTitle: 'Cách nói giảm nhẹ trách nhiệm và khẳng định giải pháp',
        pattern: 'rectify the situation -> [ˈrɛktɪfaɪ ðə ˌsɪtʃuˈeɪʃən]',
        realWorldUsage:
          'Thay vì đổ lỗi, nhân viên dịch vụ tập trung vào động từ hành động "rectify" (khắc phục) và "resolve" (giải quyết).',
        listeningSecret: '"Rectify" là từ vựng rất phổ biến trong đề thi TOEIC Part 3 & 7.',
      },
    ],
    comprehensionQuestions: [
      {
        id: 'vid-q013',
        questionEn: 'What is the primary cause of the customer dissatisfaction in the call?',
        questionVi: 'Nguyên nhân chính dẫn đến sự không hài lòng của khách hàng trong cuộc gọi là gì?',
        options: [
          'A double billing error on their recent subscription invoice.',
          'An urgent order was delivered with missing components right before a major event.',
          'The customer requested a cancellation of their annual membership.',
          'The website payment portal rejected foreign credit cards.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Khách hàng bức xúc vì đơn hàng giao gấp bị thiếu các linh kiện quan trọng ngay trước thềm sự kiện lớn của họ.',
      },
      {
        id: 'vid-q014',
        questionEn: 'How does the customer service representative first respond to the upset client?',
        questionVi: 'Đại diện chăm sóc khách hàng phản hồi vị khách đang bức xúc bằng cách nào đầu tiên?',
        options: [
          'By placing the caller on hold for an extended period.',
          'By validating their frustration, apologizing sincerely, and taking immediate ownership.',
          'By stating that delivery logistics are handled by a third-party contractor.',
          'By demanding the customer send an official written complaint letter.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Nhân viên lập tức thể hiện sự đồng cảm, xin lỗi chân thành và nhận trách nhiệm xử lý dứt điểm cho khách hàng.',
      },
      {
        id: 'vid-q015',
        questionEn: 'What compensatory resolution is arranged to make amends for the error?',
        questionVi: 'Phương án bồi thường nào được đưa ra để khắc phục sai sót cho khách hàng?',
        options: [
          'A five percent coupon usable only on the client next birthday.',
          'Same-day courier dispatch of missing parts plus a complete refund of express shipping fees.',
          'A replacement unit delivered in standard transit time next month.',
          'An invitation to attend a promotional product webinar.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Đại diện dịch vụ cho chuyển phát hỏa tốc các linh kiện còn thiếu trong ngày và hoàn lại 100% phí vận chuyển cho khách.',
      },
    ],
    dictationTasks: [
      {
        id: 'vid-dict-010',
        segmentTitle: 'Cam kết khắc phục sai sót',
        audioTimestamp: 50,
        contextLeadIn: 'I completely understand your frustration and I will personally',
        blankText: 'rectify the situation',
        contextFollowUp: 'without further delay.',
        hint: 'r_______ t__ s________ (khắc phục, xử lý triệt để tình hình)',
        ipa: '/ˈrɛktɪfaɪ ðə ˌsɪtʃuˈeɪʃən/',
        speechTipVi: '"Rectify" nghĩa là sửa chữa sai sót, từ vựng chuẩn mực trong xử lý sự cố dịch vụ.',
      },
      {
        id: 'vid-dict-011',
        segmentTitle: 'Vận chuyển hỏa tốc trong ngày',
        audioTimestamp: 105,
        contextLeadIn: 'We have dispatched the missing items via',
        blankText: 'same-day express courier',
        contextFollowUp: 'at no additional cost to you.',
        hint: 's___-d__ e______ c______ (dịch vụ chuyển phát hỏa tốc trong ngày)',
        ipa: '/seɪm deɪ ɪkˈsprɛs ˈkʊriər/',
        speechTipVi: '"Courier" /ˈkʊriər/ là từ vựng quen thuộc trong TOEIC Logistics và E-commerce.',
      },
    ],
    fullTranscript: [
      {
        time: '0:15',
        speaker: 'Customer',
        en: 'I am calling about order 4082. Half the promotional brochures were missing, and our expo starts tomorrow morning!',
        vi: 'Tôi gọi về đơn hàng số 4082. Một nửa số tờ rơi quảng bá bị thiếu, trong khi hội chợ triển lãm của chúng tôi bắt đầu sáng mai!',
      },
      {
        time: '0:40',
        speaker: 'Agent',
        en: 'I completely understand your frustration, sir. That is unacceptable before a major event, and I will rectify this right away.',
        vi: 'Tôi hoàn toàn thấu hiểu sự bức xúc của quý khách. Sai sót trước sự kiện lớn như vậy là không thể chấp nhận được, và tôi sẽ xử lý ngay.',
      },
      {
        time: '1:05',
        speaker: 'Agent',
        en: 'I have arranged an immediate reprint and dispatched a same-day courier. They will arrive at your venue by 5:00 PM.',
        vi: 'Tôi đã yêu cầu xưởng in khẩn cấp và điều động chuyển phát hỏa tốc trong ngày. Hàng sẽ đến địa điểm của quý khách trước 5 giờ chiều.',
      },
      {
        time: '1:28',
        speaker: 'Agent',
        en: 'Additionally, we are refunding your full delivery fee and crediting twenty percent toward your next invoice.',
        vi: 'Ngoài ra, chúng tôi hoàn lại toàn bộ phí vận chuyển và giảm hai mươi phần trăm cho hóa đơn tiếp theo của quý khách.',
      },
      {
        time: '1:48',
        speaker: 'Customer',
        en: 'Thank you for taking this seriously and resolving it so quickly. I truly appreciate your dedication.',
        vi: 'Cảm ơn cô đã coi trọng vấn đề này và xử lý nhanh chóng như vậy. Tôi thực sự đánh giá cao sự tận tâm của cô.',
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
    startTimestamp: 10,
    endTimestamp: 160,
    durationSeconds: 150,
    scenarioDescriptionVi:
      'Thuyết trình giới thiệu sản phẩm mới trước khách hàng và đối tác: Giới thiệu giải pháp công nghệ, làm nổi bật tính năng vượt trội so với đối thủ và công bố chính sách ưu đãi ngày ra mắt.',
    realWorldContext:
      'Thuyết trình kinh doanh và tiếp thị sản phẩm (product demonstrations, promotional campaigns, value propositions) là trọng tâm của TOEIC Part 4 (Short Talks) và Part 7 (Press Releases, Product Reviews).',
    nativeSpeechHacks: [
      {
        hackTitle: 'Cách biến âm nối /t/ sang /j/ trong bài thuyết trình',
        pattern: 'what you need -> [wʌ-tʃu-niːd] / introduce you to -> [ˌɪntrə-ˈdjuːs-ju]',
        realWorldUsage:
          'Khi thuyết trình, diễn giả nói với tốc độ tự nhiên làm âm kết thúc /t/ của "what" lướt sang "you" tạo thành âm bật /tʃ/.',
        listeningSecret: 'Khi nghe thấy "whatchu", đừng nhầm lẫn, đó chính là "what you".',
      },
      {
        hackTitle: 'Trọng âm nhịp điệu khi nhấn mạnh ưu thế cạnh tranh',
        pattern: 'faster, smarter, and significantly more cost-effective',
        realWorldUsage:
          'Người nói kéo dài các tính từ so sánh hơn và nhấn giọng ở các trạng từ định lượng (significantly, substantially).',
        listeningSecret: 'Bắt các từ nhấn mạnh so sánh để nắm bắt điểm cốt lõi của bài chào hàng.',
      },
    ],
    comprehensionQuestions: [
      {
        id: 'vid-q016',
        questionEn: 'What core competitive advantage does the presenter highlight about the new product?',
        questionVi: 'Diễn giả làm nổi bật lợi thế cạnh tranh cốt lõi nào của sản phẩm mới?',
        options: [
          'It is exclusively manufactured with antique vintage materials.',
          'It delivers automated task efficiency while cutting operating costs by thirty percent.',
          'It requires no electricity or battery recharging whatsoever.',
          'It is strictly designed for offline non-networked office environments.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Diễn giả nhấn mạnh khả năng tự động hóa tối ưu quy trình làm việc giúp giảm 30% chi phí vận hành cho doanh nghiệp.',
      },
      {
        id: 'vid-q017',
        questionEn: 'How does the presenter address potential client concerns about onboarding complexity?',
        questionVi: 'Diễn giả giải tỏa mối bận tâm của khách hàng về độ phức tạp khi triển khai như thế nào?',
        options: [
          'By admitting that staff will need six months of intensive retraining.',
          'By demonstrating the seamless plug-and-play cloud integration that sets up in under one hour.',
          'By advising clients to hire specialized computer consultants.',
          'By deferring all implementation questions until the annual shareholder meeting.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Diễn giả trình diễn quy trình cài đặt cắm-và-chạy (plug-and-play) trên nền tảng đám mây vô cùng mượt mà trong vòng chưa đầy một giờ.',
      },
      {
        id: 'vid-q018',
        questionEn: 'What special incentive is announced for early adopters who sign up this month?',
        questionVi: 'Chính sách ưu đãi đặc biệt nào được công bố cho các khách hàng đăng ký sớm trong tháng này?',
        options: [
          'Free lifetime company branded promotional merchandise.',
          'A three-month complimentary trial period including dedicated onboarding support.',
          'An automatic entry into an overseas raffle sweepstakes.',
          'A waived registration fee for the company next five product releases.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Khách hàng đăng ký sớm được nhận gói dùng thử miễn phí 3 tháng kèm chuyên gia hỗ trợ triển khai tận tình.',
      },
    ],
    dictationTasks: [
      {
        id: 'vid-dict-012',
        segmentTitle: 'Định vị giá trị cốt lõi của sản phẩm',
        audioTimestamp: 35,
        contextLeadIn: 'Our latest innovation offers a compelling',
        blankText: 'unique value proposition',
        contextFollowUp: 'tailored specifically for modern enterprise teams.',
        hint: 'u_____ v____ p__________ (định vị giá trị độc đáo)',
        ipa: '/juːˈniːk ˈvæljuː ˌprɒpəˈzɪʃən/',
        speechTipVi: '"Value proposition" là thuật ngữ cốt lõi trong Marketing và đề thi TOEIC Part 4.',
      },
      {
        id: 'vid-dict-013',
        segmentTitle: 'Khả năng tích hợp mượt mà',
        audioTimestamp: 90,
        contextLeadIn: 'The platform provides',
        blankText: 'seamless cloud integration',
        contextFollowUp: 'with existing company software infrastructure.',
        hint: 's_______ c____ i__________ (sự tích hợp đám mây liền mạch)',
        ipa: '/ˈsiːmləs klaʊd ˌɪntɪˈɡreɪʃən/',
        speechTipVi: '"Seamless" có nghĩa là liền mạch, mượt mà, không gặp bất kỳ trở ngại nào.',
      },
    ],
    fullTranscript: [
      {
        time: '0:15',
        speaker: 'Presenter',
        en: 'Good morning ladies and gentlemen! Today, we are proud to introduce our next-generation enterprise productivity suite.',
        vi: 'Chào buổi sáng quý vị! Hôm nay, chúng tôi rất tự hào giới thiệu bộ giải pháp nâng cao hiệu suất doanh nghiệp thế hệ mới.',
      },
      {
        time: '0:42',
        speaker: 'Presenter',
        en: 'Our platform delivers a unique value proposition: it streamlines team collaboration and cuts administrative overhead by 30%.',
        vi: 'Nền tảng của chúng tôi mang lại giá trị độc đáo: tinh gọn phối hợp đội nhóm và cắt giảm 30% chi phí hành chính.',
      },
      {
        time: '1:06',
        speaker: 'Presenter',
        en: 'Unlike legacy systems, it offers seamless cloud integration, allowing your team to migrate data in under sixty minutes.',
        vi: 'Khác với các hệ thống cũ, giải pháp này tích hợp đám mây liền mạch, cho phép đội ngũ của bạn đồng bộ dữ liệu chỉ trong dưới 60 phút.',
      },
      {
        time: '1:30',
        speaker: 'Presenter',
        en: 'For partners joining us this quarter, we are providing a 90-day complimentary pilot with full technical onboarding.',
        vi: 'Dành cho các đối tác đồng hành trong quý này, chúng tôi dành tặng gói chạy thử 90 ngày miễn phí kèm hỗ trợ kỹ thuật toàn diện.',
      },
      {
        time: '1:50',
        speaker: 'Presenter',
        en: 'Thank you for your attention. I would now like to open the floor to any questions from our audience.',
        vi: 'Cảm ơn quý vị đã chú ý lắng nghe. Giờ đây tôi xin mời quý vị đặt câu hỏi giao lưu cùng ban tổ chức.',
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
    startTimestamp: 10,
    endTimestamp: 158,
    durationSeconds: 148,
    scenarioDescriptionVi:
      'Đối thoại đàm phán hợp đồng cung ứng giữa Giám đốc Thu mua và đại diện nhà sản xuất: Thương lượng về mức chiết khấu cho đơn hàng số lượng lớn, điều khoản giao hàng đúng hạn và phạt vi phạm hợp đồng.',
    realWorldContext:
      'Chủ đề Thu mua & Hợp đồng (Purchasing & Contracts) là nền tảng của đề thi TOEIC. Nắm vững phản xạ nghe các thuật ngữ "bulk order", "unit price", "lead time", "concession" giúp bạn tự tin xử lý bài thi.',
    nativeSpeechHacks: [
      {
        hackTitle: 'Kỹ thuật thể hiện sự bất đồng nhã nhặn (Diplomatic Softening)',
        pattern: 'That might be a bit tricky -> [Diễn đạt từ chối khéo]',
        realWorldUsage:
          'Trong đàm phán hợp đồng, thay vì nói "No, we cannot do that", người bản xứ nói "That might prove challenging for our margins".',
        listeningSecret: 'Nhận diện các từ giảm nhẹ như "slightly", "a bit tricky", "were hoping for".',
      },
      {
        hackTitle: 'Trọng âm so sánh đối chiếu (Contrastive Stress)',
        pattern: 'We can agree to a TEN percent discount if payment is within THIRTY days.',
        realWorldUsage:
          'Các con số điều kiện ràng buộc được người đàm phán nhấn trọng âm rất rõ ràng để tránh tranh chấp.',
        listeningSecret: 'Bắt cặp điều kiện: "X percent" đi kèm với "Y days".',
      },
    ],
    comprehensionQuestions: [
      {
        id: 'vid-q019',
        questionEn: 'What initial concession does the procurement director request from the supplier?',
        questionVi: 'Giám đốc thu mua yêu cầu nhà cung ứng đưa ra nhượng bộ nào lúc đầu?',
        options: [
          'A twelve-month free warehousing agreement.',
          'A twelve percent volume discount for increasing the annual purchase order quota.',
          'An unconditional cancellation clause without financial penalties.',
          'Free international air shipping for all replacement spare parts.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Giám đốc thu mua đề xuất mức chiết khấu số lượng lớn 12% khi cam kết nâng định ngạch đặt hàng cả năm.',
      },
      {
        id: 'vid-q020',
        questionEn: 'What counter-offer does the supplier representative propose?',
        questionVi: 'Đại diện nhà cung cấp đưa ra lời đề nghị phản hồi (counter-offer) nào?',
        options: [
          'Ten percent discount provided the buyer settles invoices within thirty calendar days.',
          'Zero discount but promises to deliver within 24 hours of receipt of order.',
          'A price increase due to raw material inflationary pressures.',
          'Payment must be made strictly in cash before manufacturing begins.',
        ],
        correctAnswer: 0,
        explanationVi:
          'Nhà cung cấp đề xuất mức chiết khấu 10% với điều kiện bên mua hoàn tất thanh toán hóa đơn trong vòng 30 ngày.',
      },
      {
        id: 'vid-q021',
        questionEn: 'What stipulation is included regarding delivery lead times?',
        questionVi: 'Điều khoản nào được bổ sung liên quan đến thời hạn giao hàng (lead times)?',
        options: [
          'Deliveries can be made at any point within the fiscal quarter.',
          'A penalty clause of two percent per day of delay beyond the agreed fourteen-day lead time.',
          'The supplier assumes no liability for factory production interruptions.',
          'The buyer must pick up goods directly at the foreign factory gate.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Hợp đồng bổ sung điều khoản phạt nếu thời gian giao hàng vượt quá mốc 14 ngày đã thỏa thuận.',
      },
    ],
    dictationTasks: [
      {
        id: 'vid-dict-014',
        segmentTitle: 'Chiết khấu cho đơn hàng số lượng lớn',
        audioTimestamp: 30,
        contextLeadIn: 'If we commit to ordering five thousand units quarterly, can you offer a',
        blankText: 'bulk order volume discount',
        contextFollowUp: 'on the overall contract?',
        hint: 'b___ o____ v_____ d_______ (chiết khấu số lượng cho đơn hàng lớn)',
        ipa: '/bʌlk ˈɔːrdər ˈvɒljuːm ˈdɪskaʊnt/',
        speechTipVi: '"Bulk order" nghĩa là đơn hàng số lượng lớn, từ vựng xuất hiện liên tục trong TOEIC Purchasing.',
      },
      {
        id: 'vid-dict-015',
        segmentTitle: 'Thời hạn hoàn thành đơn hàng',
        audioTimestamp: 90,
        contextLeadIn: 'We need a strict guarantee that the standard',
        blankText: 'production lead time',
        contextFollowUp: 'will not exceed fourteen working days.',
        hint: 'p_________ l___ t___ (thời gian từ lúc đặt hàng đến khi xuất xưởng)',
        ipa: '/prəˈdʌkʃən liːd taɪm/',
        speechTipVi: '"Lead time" là thời gian thực hiện đơn hàng, thuật ngữ không thể thiếu trong chuỗi cung ứng.',
      },
    ],
    fullTranscript: [
      {
        time: '0:16',
        speaker: 'Procurement Director',
        en: 'Thank you for coming in today. We are reviewing our annual parts agreement and hope to discuss volume pricing.',
        vi: 'Cảm ơn ông đã đến làm việc hôm nay. Chúng tôi đang rà soát hợp đồng linh kiện năm và muốn thảo luận về chính sách giá số lượng lớn.',
      },
      {
        time: '0:42',
        speaker: 'Supplier Rep',
        en: 'We value our partnership greatly. What specific adjustments did your board have in mind regarding contract volume?',
        vi: 'Chúng tôi rất trân trọng mối quan hệ đối tác này. Hội đồng công ty ông đang cân nhắc những điều chỉnh cụ thể nào về sản lượng ạ?',
      },
      {
        time: '1:06',
        speaker: 'Procurement Director',
        en: 'If we increase our order by 25%, we would expect a 10% discount on the unit price and a 14-day guaranteed lead time.',
        vi: 'Nếu chúng tôi tăng lượng đặt hàng thêm 25%, chúng tôi kỳ vọng mức chiết khấu 10% trên đơn giá và cam kết thời gian giao hàng 14 ngày.',
      },
      {
        time: '1:32',
        speaker: 'Supplier Rep',
        en: 'That is reasonable. We can commit to the 10% discount provided that payment terms are net 30 days without delay.',
        vi: 'Đề xuất đó hoàn toàn hợp lý. Chúng tôi có thể cam kết mức giảm 10% với điều kiện thời hạn thanh toán là 30 ngày đúng hạn.',
      },
      {
        time: '1:52',
        speaker: 'Procurement Director',
        en: 'We have a deal. I will have our legal department draft the revised contract amendments this afternoon.',
        vi: 'Thống nhất như vậy nhé. Tôi sẽ chỉ đạo phòng pháp chế soạn thảo phụ lục hợp đồng sửa đổi ngay chiều nay.',
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
    startTimestamp: 15,
    endTimestamp: 160,
    durationSeconds: 145,
    scenarioDescriptionVi:
      'Thảo luận kế hoạch tài chính và chi phí triển khai: Giám đốc Tài chính và Trưởng bộ phận rà soát phân bổ ngân sách, thương lượng giãn tiến độ thanh toán theo từng mốc nghiệm thu quý.',
    realWorldContext:
      'Các đoạn hội thoại về tài chính, báo cáo chi phí, ngân sách và phương thức thanh toán (quarterly budgets, payment installments, invoice terms) là nội dung thường thấy trong Part 3 & 4.',
    nativeSpeechHacks: [
      {
        hackTitle: 'Phân biệt đuôi -teen và -ty trong phát âm số liệu tài chính',
        pattern: 'fifteen [fɪf-ˈtiːn] (nhấn đuôi) vs fifty [ˈfɪf-ti] (nhấn đầu)',
        realWorldUsage:
          'Trong giao dịch tài chính, việc nghe nhầm 15% và 50% là bẫy phổ biến nhất trong đề thi TOEIC.',
        listeningSecret: 'Nếu âm cuối kéo dài và có trọng âm rõ rệt, đó là đuôi -teen (15, 16, 17...).',
      },
      {
        hackTitle: 'Cụm từ nối về hiệu quả tài chính doanh nghiệp',
        pattern: 'bottom line -> [ˈbɑː.t̬əm laɪn] / cash flow -> [kæʃ floʊ]',
        realWorldUsage:
          '"Bottom line" vừa mang nghĩa là lợi nhuận ròng cuối cùng, vừa có nghĩa là điểm mấu chốt quan trọng nhất.',
        listeningSecret: 'Khi giám đốc nói "the bottom line is...", hãy chuẩn bị nghe kết luận quan trọng.',
      },
    ],
    comprehensionQuestions: [
      {
        id: 'vid-q022',
        questionEn: 'What is the primary constraint discussed regarding the quarterly capital expenditure?',
        questionVi: 'Ràng buộc chính được thảo luận liên quan đến chi tiêu vốn trong quý là gì?',
        options: [
          'The firm cannot recruit any more permanent finance accountants.',
          'Capital expenditure must remain strictly within the allocated quarterly budget limit.',
          'The corporate bank account has been temporarily frozen for an audit.',
          'The currency exchange fluctuation has caused an export loss.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Yêu cầu then chốt là chi tiêu vốn đầu tư (capital expenditure) phải nằm gọn trong giới hạn ngân sách quý đã phê duyệt.',
      },
      {
        id: 'vid-q023',
        questionEn: 'How do the parties agree to structure the implementation payment schedule?',
        questionVi: 'Các bên thống nhất cấu trúc lịch thanh toán chi phí triển khai như thế nào?',
        options: [
          'Full 100 percent upfront payment before commencement of work.',
          'Four milestone installments linked directly to project completion sign-offs.',
          'Deferred payment until the end of the next fiscal year.',
          'Payment exclusively through company equity shares.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Hai bên thống nhất chia thành bốn đợt thanh toán (milestone installments) gắn liền với từng giai đoạn nghiệm thu công việc.',
      },
      {
        id: 'vid-q024',
        questionEn: 'What financial metric does the CFO emphasize as the top priority?',
        questionVi: 'Chỉ số tài chính nào được Giám đốc Tài chính (CFO) nhấn mạnh là ưu tiên hàng đầu?',
        options: [
          'Total employee headcount growth.',
          'Maintaining a healthy cash flow balance while lowering operational overhead.',
          'Opening regional branches in three additional countries.',
          'Purchasing commercial office real estate immediately.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Giám đốc tài chính nhấn mạnh việc bảo toàn dòng tiền hoạt động khỏe mạnh (healthy cash flow) và cắt giảm chi phí vận hành.',
      },
    ],
    dictationTasks: [
      {
        id: 'vid-dict-016',
        segmentTitle: 'Dòng tiền và lợi nhuận ròng',
        audioTimestamp: 40,
        contextLeadIn: 'Our chief financial priority is safeguarding healthy',
        blankText: 'operating cash flow',
        contextFollowUp: 'across all regional subsidiaries.',
        hint: 'o________ c___ f___ (dòng tiền từ hoạt động kinh doanh)',
        ipa: '/ˈɒpəreɪtɪŋ kæʃ floʊ/',
        speechTipVi: '"Cash flow" là dòng tiền, chỉ số sống còn của mọi doanh nghiệp trong TOEIC Finance.',
      },
      {
        id: 'vid-dict-017',
        segmentTitle: 'Thanh toán theo giai đoạn nghiệm thu',
        audioTimestamp: 95,
        contextLeadIn: 'We propose disbursing fees via',
        blankText: 'quarterly milestone installments',
        contextFollowUp: 'upon formal sign-off of deliverables.',
        hint: 'q________ m________ i___________ (các đợt thanh toán theo từng mốc quý)',
        ipa: '/ˈkwɔːrtərli ˈmaɪlstoʊn ɪnˈstɔːlmənts/',
        speechTipVi: '"Installment" có nghĩa là đợt trả góp, kỳ thanh toán từng phần.',
      },
    ],
    fullTranscript: [
      {
        time: '0:18',
        speaker: 'CFO',
        en: 'Good morning. We need to finalize the capital budget allocation for the upcoming IT infrastructure upgrade.',
        vi: 'Chào buổi sáng. Chúng ta cần chốt phân bổ ngân sách chi tiêu vốn cho đợt nâng cấp hạ tầng công nghệ thông tin sắp tới.',
      },
      {
        time: '0:44',
        speaker: 'Department Head',
        en: 'The vendor proposed a lump-sum payment of $120,000, but that would strain our cash flow this quarter.',
        vi: 'Bên cung cấp đề xuất thanh toán trọn gói 120.000 đô la, nhưng điều đó sẽ gây áp lực lên dòng tiền của chúng ta trong quý này.',
      },
      {
        time: '1:08',
        speaker: 'CFO',
        en: 'Can we negotiate four milestone installments tied directly to testing phases and deliverables acceptance?',
        vi: 'Chúng ta có thể đàm phán chia làm bốn đợt thanh toán gắn liền với các giai đoạn kiểm thử và nghiệm thu bàn giao không?',
      },
      {
        time: '1:32',
        speaker: 'Department Head',
        en: 'Yes, they agreed to a 25% down payment, with subsequent installments released upon milestone verification.',
        vi: 'Được ạ, họ đã đồng ý nhận cọc 25%, và các đợt tiếp theo sẽ được thanh toán sau khi xác thực nghiệm thu từng mốc.',
      },
      {
        time: '1:52',
        speaker: 'CFO',
        en: 'That aligns perfectly with our quarterly fiscal projections and protects our working capital reserves.',
        vi: 'Rất chuẩn xác. Điều đó hoàn toàn ăn khớp với dự phóng tài chính quý và bảo toàn dự trữ vốn lưu động của chúng ta.',
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
    startTimestamp: 10,
    endTimestamp: 155,
    durationSeconds: 145,
    scenarioDescriptionVi:
      'Hội thoại hỗ trợ kỹ thuật văn phòng: Nhân viên liên hệ bộ phận IT Help Desk khi gặp lỗi không truy cập được cơ sở dữ liệu nội bộ và được hướng dẫn từng bước khôi phục kết nối an toàn.',
    realWorldContext:
      'Chủ đề Công nghệ & Hỗ trợ Kỹ thuật (Technology & IT) ngày càng phổ biến trong các đề thi TOEIC mới. Luyện nghe các chỉ dẫn kỹ thuật từng bước (troubleshooting steps, restarting, credentials) giúp bạn bắt kịp tốc độ nói tự nhiên.',
    nativeSpeechHacks: [
      {
        hackTitle: 'Giảm âm các từ chức năng trong câu mệnh lệnh kỹ thuật',
        pattern: 'log into the server -> [lɔːɡ-ɪn-tə-ðə-ˈsɜːrvər]',
        realWorldUsage:
          'Chuyên viên IT nói nhanh các giới từ "to the", "into the" thành âm schwa /tə/, tập trung độ rõ nét vào động từ thao tác.',
        listeningSecret: 'Bắt động từ chính (restart, verify, enter, update) để hiểu ngay thao tác cần làm.',
      },
      {
        hackTitle: 'Cách phát âm các từ viết tắt công nghệ phổ biến',
        pattern: 'VPN -> [ˌviː-piː-ˈɛn] / IT -> [ˌaɪ-ˈtiː]',
        realWorldUsage:
          'Các từ viết tắt công nghệ luôn được nhấn trọng âm vào chữ cái cuối cùng với âm sắc dứt khoát.',
        listeningSecret: 'Nhận diện ngay VPN = Virtual Private Network (mạng riêng ảo bảo mật).',
      },
    ],
    comprehensionQuestions: [
      {
        id: 'vid-q025',
        questionEn: 'What technical issue is the office employee calling the IT Help Desk to report?',
        questionVi: 'Nhân viên văn phòng gọi đến bộ phận IT Help Desk để báo cáo sự cố kỹ thuật nào?',
        options: [
          'The computer monitor display is flickering intermittently.',
          'Inability to log into the internal enterprise database due to authentication timeout errors.',
          'A spill of coffee over the wireless keyboard.',
          'A lost corporate smartphone at the subway station.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Nhân viên không thể đăng nhập vào cơ sở dữ liệu nội bộ của công ty do bị lỗi hết thời gian xác thực tài khoản (authentication timeout).',
      },
      {
        id: 'vid-q026',
        questionEn: 'What initial troubleshooting step does the IT specialist guide the employee to perform?',
        questionVi: 'Chuyên viên IT hướng dẫn nhân viên thực hiện bước khắc phục sự cố đầu tiên nào?',
        options: [
          'Purchase a brand new laptop from the electronics store.',
          'Clear the browser cache and verify the secure VPN credentials connection.',
          'Leave the computer running overnight without closing apps.',
          'Disable the antivirus protection firewall permanently.',
        ],
        correctAnswer: 1,
        explanationVi:
          'Chuyên viên IT hướng dẫn xóa bộ nhớ đệm trình duyệt (cache) và kiểm tra lại kết nối mạng riêng ảo bảo mật (VPN).',
      },
      {
        id: 'vid-q027',
        questionEn: 'What resolution confirms that the system access has been restored?',
        questionVi: 'Kết quả nào xác nhận rằng quyền truy cập hệ thống đã được khôi phục thành công?',
        options: [
          'The employee receives a temporary password reset code and logs in successfully.',
          'The technician schedules an in-person physical hardware audit next month.',
          'The employee account is permanently deactivated.',
          'The office printer prints a test configuration page.',
        ],
        correctAnswer: 0,
        explanationVi:
          'Nhân viên nhận mã khôi phục mật khẩu tạm thời và đăng nhập thành công vào cơ sở dữ liệu.',
      },
    ],
    dictationTasks: [
      {
        id: 'vid-dict-018',
        segmentTitle: 'Xác thực thông tin tài khoản đăng nhập',
        audioTimestamp: 35,
        contextLeadIn: 'Please verify that you have entered your correct corporate',
        blankText: 'login credentials',
        contextFollowUp: 'before reconnecting to the secure network.',
        hint: 'l____ c__________ (thông tin đăng nhập gồm tài khoản và mật khẩu)',
        ipa: '/ˈlɒɡɪn krɪˈdɛnʃəlz/',
        speechTipVi: '"Credentials" /krɪˈdɛnʃəlz/ chỉ thông tin xác thực, từ vựng công sở cực kỳ thịnh hành.',
      },
      {
        id: 'vid-dict-019',
        segmentTitle: 'Khắc phục sự cố kết nối',
        audioTimestamp: 85,
        contextLeadIn: 'Our IT team will guide you through the standard',
        blankText: 'troubleshooting procedure',
        contextFollowUp: 'to restore database synchronization.',
        hint: 't_______________ p________ (quy trình xử lý và khắc phục sự cố)',
        ipa: '/ˈtrʌbəlˌʃuːtɪŋ prəˈsiːdʒər/',
        speechTipVi: '"Troubleshoot" là động từ chuyên môn chỉ việc tìm và sửa lỗi kỹ thuật.',
      },
    ],
    fullTranscript: [
      {
        time: '0:15',
        speaker: 'Employee',
        en: 'Hi, IT Help Desk? I am having trouble accessing the customer records database this morning.',
        vi: 'Xin chào, phòng IT Help Desk phải không ạ? Sáng nay tôi gặp trục trặc khi truy cập vào cơ sở dữ liệu hồ sơ khách hàng.',
      },
      {
        time: '0:38',
        speaker: 'IT Specialist',
        en: 'Hello! I can certainly assist with that. Are you getting an error code, or is the page timing out?',
        vi: 'Chào bạn! Tôi chắc chắn sẽ hỗ trợ bạn việc này. Bạn đang nhận thông báo mã lỗi hay trang bị hết thời gian chờ?',
      },
      {
        time: '1:02',
        speaker: 'Employee',
        en: 'It says "Authentication Timeout 403". I tried re-entering my credentials, but no luck.',
        vi: 'Nó hiện "Authentication Timeout 403". Tôi đã thử nhập lại thông tin đăng nhập nhưng vẫn không được.',
      },
      {
        time: '1:24',
        speaker: 'IT Specialist',
        en: 'Got it. Your VPN token expired overnight. I just refreshed your access token from our console. Please try logging in now.',
        vi: 'Tôi hiểu rồi. Mã bảo mật VPN của bạn bị hết hạn qua đêm. Tôi vừa làm mới mã truy cập từ hệ thống. Bạn thử đăng nhập lại xem.',
      },
      {
        time: '1:44',
        speaker: 'Employee',
        en: 'It worked! I am back into the dashboard. Thank you so much for the speedy help!',
        vi: 'Được rồi! Tôi đã vào lại được bảng điều khiển. Cảm ơn bạn rất nhiều vì đã hỗ trợ nhanh chóng!',
      },
    ],
  },
];
