import { Part3Conversation } from '@/types/listening';

export const part3Conversations: Part3Conversation[] = [
  {
    id: 'p3-001',
    part: 3,
    topic: 'Khắc phục Lỗi Phần Mềm Khẩn cấp trước Buổi Trình Diễn với Khách Hàng',
    contextVi: 'Hội thoại ba người (Three-way Conversation) giữa Giám đốc Sản phẩm Elena (Anh), Kỹ sư trưởng Mark (Mỹ) và Chuyên viên QA Ken (Úc) về lỗi thanh toán vừa phát hiện trước buổi demo cho khách hàng VIP.',
    isThreeWay: true,
    speakers: [
      { name: 'Elena', role: 'Product Manager', accent: 'en-GB' },
      { name: 'Mark', role: 'Lead Developer', accent: 'en-US' },
      { name: 'Ken', role: 'QA Lead', accent: 'en-AU' },
    ],
    dialogue: [
      {
        speaker: 'Elena',
        speakerRole: 'Product Manager',
        text: 'Mark, Ken, thank you for joining on such short notice. We have a serious dilemma: our VIP client demo is scheduled for two o’clock, but the automated checkout portal just failed the staging stress test.',
        textVi: 'Mark, Ken, cảm ơn hai bạn đã tham gia cuộc họp gấp này. Chúng ta đang gặp tình huống rất nan giải: buổi demo cho khách hàng VIP đã lên lịch vào lúc 2 giờ chiều, nhưng cổng thanh toán tự động vừa trượt bài kiểm tra tải thử nghiệm.',
        accent: 'en-GB',
      },
      {
        speaker: 'Ken',
        speakerRole: 'QA Lead',
        text: 'Right, Elena. During our final regression test thirty minutes ago, transactions timed out whenever more than twenty simulated users submitted payments simultaneously. It seems linked to the new currency conversion API.',
        textVi: 'Đúng vậy Elena. Trong bài kiểm tra hồi quy cuối cùng 30 phút trước, các giao dịch đều bị quá thời gian chờ (timeout) bất cứ khi nào có hơn 20 người dùng ảo gửi thanh toán cùng lúc. Có vẻ như lỗi liên quan đến API quy đổi tiền tệ mới.',
        accent: 'en-AU',
      },
      {
        speaker: 'Mark',
        speakerRole: 'Lead Developer',
        text: 'I investigated the log files right after Ken flagged it. The third-party currency server is throttling our requests. However, if we temporarily roll back to our cached exchange rate database for the demo, transactions will process in less than half a second.',
        textVi: 'Tôi đã kiểm tra nhật ký hệ thống ngay sau khi Ken cảnh báo. Máy chủ quy đổi tiền tệ của bên thứ ba đang bóp băng thông yêu cầu của chúng ta. Tuy nhiên, nếu chúng ta tạm thời quay lại cơ sở dữ liệu tỷ giá lưu đệm cho buổi demo, các giao dịch sẽ xử lý dưới nửa giây.',
        accent: 'en-US',
      },
      {
        speaker: 'Elena',
        speakerRole: 'Product Manager',
        text: 'That sounds like a viable workaround, Mark, but we can’t afford another slip-up. Ken, how long would it take your team to validate that rollback in the staging environment?',
        textVi: 'Đó có vẻ là giải pháp tình thế khả thi đấy Mark, nhưng chúng ta không thể chịu thêm bất kỳ sai sót nào nữa đâu. Ken, đội của bạn mất bao lâu để thẩm định bản rollback đó trên môi trường chạy thử?',
        accent: 'en-GB',
      },
      {
        speaker: 'Ken',
        speakerRole: 'QA Lead',
        text: 'If Mark deploys the patch right now, we can run a complete dry run by one-fifteen. That gives us forty-five minutes of breathing room before the client logs on.',
        textVi: 'Nếu Mark triển khai bản vá ngay bây giờ, chúng tôi có thể hoàn thành buổi chạy thử vào lúc 1 giờ 15. Như vậy chúng ta có 45 phút dự phòng trước khi khách hàng đăng nhập vào.',
        accent: 'en-AU',
      },
    ],
    fullAudioText:
      'Elena: Mark, Ken, thank you for joining on such short notice. We have a serious dilemma: our VIP client demo is scheduled for two o’clock, but the automated checkout portal just failed the staging stress test. ' +
      'Ken: Right, Elena. During our final regression test thirty minutes ago, transactions timed out whenever more than twenty simulated users submitted payments simultaneously. It seems linked to the new currency conversion API. ' +
      'Mark: I investigated the log files right after Ken flagged it. The third-party currency server is throttling our requests. However, if we temporarily roll back to our cached exchange rate database for the demo, transactions will process in less than half a second. ' +
      'Elena: That sounds like a viable workaround, Mark, but we can’t afford another slip-up. Ken, how long would it take your team to validate that rollback in the staging environment? ' +
      'Ken: If Mark deploys the patch right now, we can run a complete dry run by one-fifteen. That gives us forty-five minutes of breathing room before the client logs on.',
    questions: [
      {
        id: 'p3-q001',
        questionNumber: 32,
        questionEn: 'What problem are the speakers addressing?',
        questionVi: 'Các diễn giả đang giải quyết vấn đề gì?',
        options: [
          'A contract negotiation was cancelled by a client.',
          'An online payment system failed a technical performance test.',
          'A staff training session was double-booked.',
          'The office internet connection is completely down.',
        ],
        correctAnswer: 1,
        explanationVi: 'Elena và Ken nêu rõ: "the automated checkout portal just failed the staging stress test" và "transactions timed out" (cổng thanh toán tự động trượt bài kiểm tra tải). Do đó đáp án B là chính xác.',
        questionType: 'main-idea',
      },
      {
        id: 'p3-q002',
        questionNumber: 33,
        questionEn: 'What does the woman imply when she says, "we can’t afford another slip-up"?',
        questionVi: 'Người phụ nữ ngụ ý điều gì khi nói "chúng ta không thể chịu thêm bất kỳ sai sót nào nữa đâu"?',
        options: [
          'She wants the solution tested thoroughly before presentation.',
          'She believes Mark should be removed from the project.',
          'The client has already terminated the partnership.',
          'The budget for software development has run out.',
        ],
        correctAnswer: 0,
        explanationVi: 'Câu hỏi ngụ ý (Speaker intent). Khi Elena nói câu này và ngay sau đó yêu cầu Ken ước tính thời gian để "validate that rollback", cô ấy muốn nhấn mạnh giải pháp phải được kiểm thử cẩn trọng, không được xảy ra lỗi lầm trước mặt khách hàng VIP.',
        questionType: 'inference-intent',
      },
      {
        id: 'p3-q003',
        questionNumber: 34,
        questionEn: 'What will Mark most likely do immediately?',
        questionVi: 'Mark nhiều khả năng sẽ làm gì ngay lập tức?',
        options: [
          'Draft an apology email to the client.',
          'Deploy the software patch to the staging server.',
          'Cancel the 2:00 PM video conference.',
          'Contact the third-party currency vendor.',
        ],
        correctAnswer: 1,
        explanationVi: 'Ken nói: "If Mark deploys the patch right now, we can run a complete dry run by one-fifteen". Để kịp mốc 1:15, Mark cần triển khai bản vá ngay bây giờ.',
        questionType: 'next-action',
      },
    ],
    keyVocabulary: [
      { word: 'dilemma', phonetic: '/dɪˈlɛmə/', meaning: 'tình thế khó xử, tiến thoái lưỡng nan' },
      { word: 'workaround', phonetic: '/ˈwɜːrkəraʊnd/', meaning: 'giải pháp tình thế, biện pháp khắc phục tạm thời' },
      { word: 'throttle', phonetic: '/ˈθrɒtl/', meaning: 'bóp băng thông, giới hạn lưu lượng' },
      { word: 'dry run', phonetic: '/draɪ rʌn/', meaning: 'buổi chạy thử nghiệm thực tế' },
    ],
    practicalListeningTip: 'Trong dạng bài hội thoại 3 người (Three-way conversation) của TOEIC mới, hãy chú ý cách các nhân vật gọi tên nhau ở đầu lượt nói ("Mark, Ken", "Right, Elena") để xác định ngay ai đang phát biểu.',
  },
  {
    id: 'p3-002',
    part: 3,
    topic: 'Khiếu nại Lô Hàng Hư Hỏng & Yêu Cầu Vận Chuyển Hỏa Tốc Bù Hàng',
    contextVi: 'Hội thoại giữa ông David (Giám đốc Chuỗi cung ứng tại nhà máy - Mỹ) và bà Rachel (Đại diện đối tác cung ứng linh kiện - Anh) về việc kiện hàng bị nứt vỡ trong quá trình bốc dỡ.',
    speakers: [
      { name: 'David', role: 'Logistics Director', accent: 'en-US' },
      { name: 'Rachel', role: 'Supplier Account Manager', accent: 'en-GB' },
    ],
    dialogue: [
      {
        speaker: 'David',
        speakerRole: 'Logistics Director',
        text: 'Rachel, I’m calling from the Detroit assembly plant. We just unloaded pallet number forty-two from this morning’s delivery, and twelve of the precision ceramic sensors arrived completely fractured.',
        textVi: 'Rachel, tôi đang gọi từ nhà máy lắp ráp Detroit. Chúng tôi vừa bốc dỡ kiện pallet số 42 từ chuyến giao hàng sáng nay, và 12 chiếc cảm biến gốm chính xác đã bị nứt vỡ hoàn toàn.',
        accent: 'en-US',
      },
      {
        speaker: 'Rachel',
        speakerRole: 'Supplier Account Manager',
        text: 'Oh no, David! I apologize sincerely for that. Our warehouse team is supposed to use double-walled bubble cushioning for all fragile ceramic shipments. Did the external cardboard container show visible impact marks?',
        textVi: 'Ôi không, David! Tôi chân thành xin lỗi vì sự cố đó. Đội kho của chúng tôi đáng lẽ phải dùng lớp bọc đệm khí hai lớp cho tất cả các lô hàng gốm dễ vỡ. Thùng các-tông bên ngoài có dấu hiệu va đập rõ rệt không?',
        accent: 'en-GB',
      },
      {
        speaker: 'David',
        speakerRole: 'Logistics Director',
        text: 'Yes, the corner was badly crushed, likely during courier transit. The problem is our assembly line cannot afford to halt. We need twelve undamaged replacements here by tomorrow noon at the latest.',
        textVi: 'Có, góc thùng bị móp méo nặng, rất có thể do va đập trong quá trình vận chuyển bưu chính. Vấn đề là dây chuyền lắp ráp của chúng tôi không thể dừng lại. Chúng tôi cần 12 chiếc thay thế không bị hư hại đến đây muộn nhất là trưa mai.',
        accent: 'en-US',
      },
      {
        speaker: 'Rachel',
        speakerRole: 'Supplier Account Manager',
        text: 'I understand the urgency. I will personally pull twelve inspected units from our reserve stock and book an expedited air freight courier at our company’s expense. You’ll have a tracking number in your inbox within twenty minutes.',
        textVi: 'Tôi hiểu sự cấp bách này. Đích thân tôi sẽ lấy 12 đơn vị đã qua kiểm định từ kho dự trữ và đặt chuyển phát nhanh đường hàng không hỏa tốc bằng toàn bộ chi phí của công ty chúng tôi. Bạn sẽ có mã theo dõi trong hộp thư đến trong vòng 20 phút.',
        accent: 'en-GB',
      },
    ],
    fullAudioText:
      'David: Rachel, I’m calling from the Detroit assembly plant. We just unloaded pallet number forty-two from this morning’s delivery, and twelve of the precision ceramic sensors arrived completely fractured. ' +
      'Rachel: Oh no, David! I apologize sincerely for that. Our warehouse team is supposed to use double-walled bubble cushioning for all fragile ceramic shipments. Did the external cardboard container show visible impact marks? ' +
      'David: Yes, the corner was badly crushed, likely during courier transit. The problem is our assembly line cannot afford to halt. We need twelve undamaged replacements here by tomorrow noon at the latest. ' +
      'Rachel: I understand the urgency. I will personally pull twelve inspected units from our reserve stock and book an expedited air freight courier at our company’s expense. You’ll have a tracking number in your inbox within twenty minutes.',
    questions: [
      {
        id: 'p3-q004',
        questionNumber: 41,
        questionEn: 'Why is the man calling the supplier?',
        questionVi: 'Tại sao người đàn ông lại gọi điện cho bên cung ứng?',
        options: [
          'To negotiate an annual price discount.',
          'To report damaged items from a morning shipment.',
          'To request a tour of the ceramic factory.',
          'To change the billing address on an invoice.',
        ],
        correctAnswer: 1,
        explanationVi: 'David nói ngay ở đầu cuộc gọi: "twelve of the precision ceramic sensors arrived completely fractured" (12 cảm biến bị nứt vỡ khi giao hàng sáng nay). Do đó B là đáp án chính xác.',
        questionType: 'main-idea',
      },
      {
        id: 'p3-q005',
        questionNumber: 42,
        questionEn: 'When does the man need the replacement components?',
        questionVi: 'Khi nào người đàn ông cần các linh kiện thay thế?',
        options: [
          'Within twenty minutes.',
          'By this evening at five o’clock.',
          'By tomorrow noon at the latest.',
          'Next Monday morning.',
        ],
        correctAnswer: 2,
        explanationVi: 'David nhấn mạnh thời hạn chót: "We need twelve undamaged replacements here by tomorrow noon at the latest". Đáp án đúng là C.',
        questionType: 'detail',
      },
      {
        id: 'p3-q006',
        questionNumber: 43,
        questionEn: 'What does the woman offer to do at her company’s expense?',
        questionVi: 'Người phụ nữ đề nghị làm điều gì bằng chi phí của công ty cô ấy?',
        options: [
          'Dispatch a technician to inspect the machinery.',
          'Arrange expedited air freight delivery.',
          'Refund fifty percent of the order value.',
          'Install security cameras at the warehouse.',
        ],
        correctAnswer: 1,
        explanationVi: 'Rachel cam kết: "book an expedited air freight courier at our company’s expense" (đặt chuyển phát nhanh hàng không hỏa tốc công ty chịu phí). Đáp án B là chính xác.',
        questionType: 'next-action',
      },
    ],
    keyVocabulary: [
      { word: 'pallet', phonetic: '/ˈpælət/', meaning: 'kệ kê hàng, tấm nâng hàng pallet' },
      { word: 'fractured', phonetic: '/ˈfræktʃərd/', meaning: 'bị nứt vỡ, rạn nứt' },
      { word: 'expedited air freight', phonetic: '/ˈɛkspədaɪtɪd eər freɪt/', meaning: 'vận tải hàng không hỏa tốc' },
      { word: 'reserve stock', phonetic: '/rɪˈzɜːrv stɒk/', meaning: 'lượng hàng dự trữ' },
    ],
    practicalListeningTip: 'Từ vựng chuỗi cung ứng (pallet, freight, fragile, courier transit) rất hay xuất hiện trong Part 3. Chú ý các cụm từ thể hiện cam kết dịch vụ như "at our company\'s expense" (công ty chúng tôi chịu chi phí).',
  },
  {
    id: 'p3-003',
    part: 3,
    topic: 'Xử lý Đặt Phòng Khách sạn & Nâng cấp Hạng Phòng (Kèm Bảng Biểu)',
    contextVi: 'Hội thoại kèm bảng thông tin phòng (Graphic Question) giữa ông Alex (khách đi công tác - Mỹ) và Chloe (lễ tân khách sạn Grand Horizon - Úc).',
    speakers: [
      { name: 'Alex', role: 'Business Guest', accent: 'en-US' },
      { name: 'Chloe', role: 'Front Desk Agent', accent: 'en-AU' },
    ],
    graphicInfo: {
      title: 'Grand Horizon Hotel - Room Categories & Upgrades',
      headers: ['Room Category', 'Nightly Rate', 'Key Amenities', 'Availability Status'],
      rows: [
        ['Standard Queen', '$140', 'Courtyard View, Free Wi-Fi', 'Sold Out'],
        ['Deluxe King', '$190', 'Skyline View, Work Desk, Coffee Bar', '2 Available'],
        ['Executive Suite', '$280', 'Lounge Access, Complimentary Breakfast, Meeting Room', 'Available'],
        ['Penthouse Loft', '$450', 'Panoramic Terrace, Private Concierge', '1 Available'],
      ],
      note: '* All corporate accounts receive complimentary high-speed fiber internet.',
    },
    dialogue: [
      {
        speaker: 'Chloe',
        speakerRole: 'Front Desk Agent',
        text: 'Good evening and welcome to the Grand Horizon. How may I assist you with check-in tonight, sir?',
        textVi: 'Chào buổi tối và chào mừng quý khách đến với khách sạn Grand Horizon. Tôi có thể hỗ trợ quý khách làm thủ tục nhận phòng tối nay như thế nào ạ?',
        accent: 'en-AU',
      },
      {
        speaker: 'Alex',
        speakerRole: 'Business Guest',
        text: 'Hello. My name is Alex Vance. I reserved a Standard Queen room two weeks ago through my corporate travel portal, confirmation number GH-7749.',
        textVi: 'Xin chào. Tên tôi là Alex Vance. Tôi đã đặt một phòng Standard Queen cách đây 2 tuần qua cổng du lịch công ty, mã xác nhận GH-7749.',
        accent: 'en-US',
      },
      {
        speaker: 'Chloe',
        speakerRole: 'Front Desk Agent',
        text: 'Thank you, Mr. Vance. Let me retrieve your profile... Ah, I see here that due to unexpected plumbing repairs on the fifth floor, our Standard Queen category is completely unavailable tonight. To make up for the inconvenience, management has authorized a complimentary upgrade to our next tier room category with a skyline view and an ergonomic work desk.',
        textVi: 'Cảm ơn ông Vance. Để tôi tra cứu hồ sơ của ông... À, tôi thấy ở đây là do sự cố sửa ống nước đột xuất ở tầng 5, toàn bộ hạng phòng Standard Queen tối nay không thể sử dụng được. Để bù đắp cho sự bất tiện này, ban quản lý đã phê duyệt nâng cấp miễn phí lên hạng phòng kế tiếp có hướng nhìn toàn cảnh đường chân trời thành phố và bàn làm việc công thái học.',
        accent: 'en-AU',
      },
      {
        speaker: 'Alex',
        speakerRole: 'Business Guest',
        text: 'That is wonderful news, thank you! I have back-to-back virtual client meetings tomorrow morning, so the work desk and skyline view will be perfect. Also, where is breakfast served?',
        textVi: 'Đó quả là tin tuyệt vời, cảm ơn cô! Sáng mai tôi có các cuộc họp khách hàng trực tuyến liên tiếp, nên chiếc bàn làm việc và tầm nhìn đẹp sẽ vô cùng hoàn hảo. À ngoài ra, bữa sáng được phục vụ ở đâu vậy?',
        accent: 'en-US',
      },
      {
        speaker: 'Chloe',
        speakerRole: 'Front Desk Agent',
        text: 'Breakfast is available from six-thirty to ten in the Terrace Bistro on the second floor. Here is your keycard for room 814. Enjoy your stay!',
        textVi: 'Bữa sáng phục vụ từ 6:30 đến 10:00 tại nhà hàng Terrace Bistro ở tầng 2. Đây là thẻ từ vào phòng 814 của ông. Chúc ông có kỳ nghỉ thoải mái!',
        accent: 'en-AU',
      },
    ],
    fullAudioText:
      'Chloe: Good evening and welcome to the Grand Horizon. How may I assist you with check-in tonight, sir? ' +
      'Alex: Hello. My name is Alex Vance. I reserved a Standard Queen room two weeks ago through my corporate travel portal, confirmation number GH-7749. ' +
      'Chloe: Thank you, Mr. Vance. Let me retrieve your profile... Ah, I see here that due to unexpected plumbing repairs on the fifth floor, our Standard Queen category is completely unavailable tonight. To make up for the inconvenience, management has authorized a complimentary upgrade to our next tier room category with a skyline view and an ergonomic work desk. ' +
      'Alex: That is wonderful news, thank you! I have back-to-back virtual client meetings tomorrow morning, so the work desk and skyline view will be perfect. Also, where is breakfast served? ' +
      'Chloe: Breakfast is available from six-thirty to ten in the Terrace Bistro on the second floor. Here is your keycard for room 814. Enjoy your stay!',
    questions: [
      {
        id: 'p3-q007',
        questionNumber: 53,
        questionEn: 'Why was the speaker’s original room unavailable?',
        questionVi: 'Tại sao căn phòng ban đầu của khách lại không thể sử dụng?',
        options: [
          'The customer arrived after the 6:00 PM cancellation window.',
          'Plumbing maintenance is taking place on the fifth floor.',
          'The hotel had no record of the corporate reservation.',
          'The room was mistakenly assigned to a conference speaker.',
        ],
        correctAnswer: 1,
        explanationVi: 'Chloe giải thích: "due to unexpected plumbing repairs on the fifth floor, our Standard Queen category is completely unavailable tonight". Đáp án B là chính xác.',
        questionType: 'detail',
      },
      {
        id: 'p3-q008',
        questionNumber: 54,
        questionEn: 'Look at the graphic. Which room category will Mr. Vance receive?',
        questionVi: 'Nhìn vào bảng biểu. Ông Vance sẽ nhận được hạng phòng nào?',
        options: ['Standard Queen', 'Deluxe King', 'Executive Suite', 'Penthouse Loft'],
        correctAnswer: 1,
        explanationVi: 'Câu hỏi nhìn bảng biểu (Graphic Question): Khách đặt Standard Queen ($140). Chloe nói khách được nâng cấp miễn phí lên "our next tier room category with a skyline view and an ergonomic work desk". Đối chiếu trên bảng biểu, hạng phòng liền kề tiếp theo có tiện nghi này chính là Deluxe King ($190).',
        questionType: 'graphic',
      },
      {
        id: 'p3-q009',
        questionNumber: 55,
        questionEn: 'What does the man mention he will do tomorrow morning?',
        questionVi: 'Người đàn ông cho biết ông ấy sẽ làm gì vào sáng mai?',
        options: [
          'Attend an on-site building inspection.',
          'Conduct consecutive virtual meetings with clients.',
          'Catch an early morning return flight.',
          'Deliver a presentation at the conference hall.',
        ],
        correctAnswer: 1,
        explanationVi: 'Alex nói: "I have back-to-back virtual client meetings tomorrow morning". Cụm "back-to-back" đồng nghĩa với "consecutive" (liên tiếp). Đáp án B là chính xác.',
        questionType: 'detail',
      },
    ],
    keyVocabulary: [
      { word: 'complimentary upgrade', phonetic: '/ˌkɒmplɪˈmɛntəri ˈʌpɡreɪd/', meaning: 'sự nâng cấp miễn phí (dịch vụ khách sạn/vé máy bay)' },
      { word: 'plumbing repairs', phonetic: '/ˈplʌmɪŋ rɪˈpeərz/', meaning: 'sửa chữa hệ thống đường ống nước' },
      { word: 'back-to-back', phonetic: '/ˌbæk tə ˈbæk/', meaning: 'liên tiếp nhau không ngừng nghỉ' },
      { word: 'skyline view', phonetic: '/ˈskaɪlaɪn vjuː/', meaning: 'tầm nhìn ngắm đường chân trời đô thị' },
    ],
    practicalListeningTip: 'Với câu hỏi kèm biểu đồ (Graphic Question), luôn đọc lướt các cột của bảng trước khi nghe audio. Khi người nói nhắc đến đặc điểm miêu tả ("skyline view and work desk"), hãy gióng mắt ngay vào dòng tương ứng trong bảng.',
  },
  {
    id: 'p3-004',
    part: 3,
    topic: 'Cải tạo Văn phòng & Chính sách Làm việc Từ xa Linh hoạt',
    contextVi: 'Hội thoại giữa ông Brian (Giám đốc Vận hành tòa nhà - Mỹ) và bà Lisa (Trưởng nhóm Dự án - Anh) về việc bố trí lại chỗ ngồi và kế hoạch làm việc kết hợp (Hybrid work) trong thời gian sửa chữa văn phòng.',
    speakers: [
      { name: 'Brian', role: 'Operations Director', accent: 'en-US' },
      { name: 'Lisa', role: 'Project Team Lead', accent: 'en-GB' },
    ],
    dialogue: [
      {
        speaker: 'Lisa',
        speakerRole: 'Project Team Lead',
        text: 'Brian, I received the facilities email about the upcoming floor renovation. My team is worried that the construction noise will disrupt our client conference calls over the next three weeks.',
        textVi: 'Brian, tôi đã nhận được email của ban quản lý tòa nhà về đợt cải tạo sàn sắp tới. Đội của tôi đang lo lắng tiếng ồn thi công sẽ làm gián đoạn các cuộc gọi hội nghị với khách hàng trong suốt ba tuần tới.',
        accent: 'en-GB',
      },
      {
        speaker: 'Brian',
        speakerRole: 'Operations Director',
        text: 'I completely understand your concern, Lisa. We deliberately scheduled the heavy drilling and wall removals during evening hours between seven PM and midnight to avoid daytime interference.',
        textVi: 'Tôi hoàn toàn thấu hiểu mối bận tâm của bạn, Lisa. Chúng tôi đã cố tình xếp lịch khoan tường nặng và đập tường vào các khung giờ buổi tối từ 7 giờ tối đến nửa đêm để tránh ảnh hưởng vào ban ngày.',
        accent: 'en-US',
      },
      {
        speaker: 'Lisa',
        speakerRole: 'Project Team Lead',
        text: 'That is a relief, but what about the dust and seating arrangements? Our designated cubicles are right next to the east wing corridor.',
        textVi: 'Được thế thì nhẹ nhõm rồi, nhưng còn bụi bặm và việc bố trí chỗ ngồi thì sao? Các vách ngăn làm việc của đội tôi nằm ngay cạnh hành lang cánh phía Đông.',
        accent: 'en-GB',
      },
      {
        speaker: 'Brian',
        speakerRole: 'Operations Director',
        text: 'Executive management approved a flexible hybrid arrangement. Your staff are permitted to work remotely three days a week. For days they come into the office, we have reserved temporary quiet pods in the west annex.',
        textVi: 'Ban giám đốc điều hành đã phê duyệt thỏa thuận làm việc kết hợp (hybrid) linh hoạt. Nhân viên của bạn được phép làm việc từ xa ba ngày một tuần. Vào những ngày lên văn phòng, chúng tôi đã đặt trước các cabin làm việc yên tĩnh tạm thời ở khu phụ phía Tây.',
        accent: 'en-US',
      },
    ],
    fullAudioText:
      'Lisa: Brian, I received the facilities email about the upcoming floor renovation. My team is worried that the construction noise will disrupt our client conference calls over the next three weeks. ' +
      'Brian: I completely understand your concern, Lisa. We deliberately scheduled the heavy drilling and wall removals during evening hours between seven PM and midnight to avoid daytime interference. ' +
      'Lisa: That is a relief, but what about the dust and seating arrangements? Our designated cubicles are right next to the east wing corridor. ' +
      'Brian: Executive management approved a flexible hybrid arrangement. Your staff are permitted to work remotely three days a week. For days they come into the office, we have reserved temporary quiet pods in the west annex.',
    questions: [
      {
        id: 'p3-q010',
        questionNumber: 62,
        questionEn: 'What is the woman concerned about?',
        questionVi: 'Người phụ nữ lo lắng về điều gì?',
        options: [
          'Budget reductions for travel expenses.',
          'Potential noise disruptions from building renovation.',
          'A delay in manufacturing equipment delivery.',
          'New cybersecurity password requirements.',
        ],
        correctAnswer: 1,
        explanationVi: 'Lisa mở đầu: "My team is worried that the construction noise will disrupt our client conference calls". Do đó đáp án B là chính xác.',
        questionType: 'main-idea',
      },
      {
        id: 'p3-q011',
        questionNumber: 63,
        questionEn: 'When will loud construction work take place?',
        questionVi: 'Khi nào các công việc thi công ồn ào sẽ diễn ra?',
        options: [
          'Early in the morning before 8:00 AM.',
          'During the weekend only.',
          'In the evening between 7:00 PM and midnight.',
          'Throughout regular business hours.',
        ],
        correctAnswer: 2,
        explanationVi: 'Brian khẳng định: "We deliberately scheduled the heavy drilling and wall removals during evening hours between seven PM and midnight". Đáp án C đúng.',
        questionType: 'detail',
      },
      {
        id: 'p3-q012',
        questionNumber: 64,
        questionEn: 'What solution has executive management approved for staff?',
        questionVi: 'Ban giám đốc điều hành đã phê duyệt giải pháp gì cho nhân viên?',
        options: [
          'A relocation to a permanent branch office.',
          'A flexible hybrid schedule with three remote workdays.',
          'Mandatory overtime on weekends.',
          'Paid leave until the renovation is finished.',
        ],
        correctAnswer: 1,
        explanationVi: 'Brian thông báo: "Executive management approved a flexible hybrid arrangement. Your staff are permitted to work remotely three days a week". Đáp án B là chính xác.',
        questionType: 'next-action',
      },
    ],
    keyVocabulary: [
      { word: 'renovation', phonetic: '/ˌrɛnəˈveɪʃən/', meaning: 'sự cải tạo, tu bổ trụ sở' },
      { word: 'deliberately', phonetic: '/dɪˈlɪbərətli/', meaning: 'có chủ đích, được tính toán cẩn thận' },
      { word: 'hybrid arrangement', phonetic: '/ˈhaɪbrɪd əˈreɪndʒmənt/', meaning: 'chế độ làm việc kết hợp (online & tại văn phòng)' },
      { word: 'quiet pod', phonetic: '/ˈkwaɪət pɒd/', meaning: 'buồng/cabin cách âm riêng tư' },
    ],
    practicalListeningTip: 'Các chủ đề đời sống văn phòng mới nhất (Modern Workplace) trong TOEIC thường xuyên đề cập tới "hybrid work", "quiet pods", "hot-desking", "conference video calls". Nắm vững các cụm này giúp bạn nghe hiểu tức thì.',
  },
];
