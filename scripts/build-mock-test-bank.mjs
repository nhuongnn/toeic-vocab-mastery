import fs from 'fs';
import path from 'path';

const BASE_DIR = path.resolve('public/data/mock-tests');
const CONFIGS_DIR = path.join(BASE_DIR, 'configs');
const PART5_DIR = path.join(BASE_DIR, 'part5');
const PART6_DIR = path.join(BASE_DIR, 'part6');
const PART7_DIR = path.join(BASE_DIR, 'part7');

[CONFIGS_DIR, PART5_DIR, PART6_DIR, PART7_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Configs
const miniReadingConfig = {
  id: 'mini-reading',
  type: 'mini-reading',
  title: 'Mini Reading Test',
  description: '50 câu hỏi Part 5, 6, 7 trong 30 phút. Phù hợp luyện phản xạ nhanh và đánh giá tiến độ.',
  timeLimit: 1800,
  totalQuestions: 50,
  parts: [
    {
      part: 5,
      questionCount: 30,
      instructions: 'Directions: A word or phrase is missing in each of the sentences below. Four answer choices are given below each sentence. Select the best answer to complete the sentence.',
      timeRecommendation: 600,
    },
    {
      part: 6,
      questionCount: 8,
      instructions: 'Directions: Read the texts that follow. A word, phrase, or sentence is missing in parts of each text. Select the best answer.',
      timeRecommendation: 360,
    },
    {
      part: 7,
      questionCount: 12,
      instructions: 'Directions: In this part you will read a selection of texts. Select the best answer for each question.',
      timeRecommendation: 840,
    },
  ],
};

const fullReadingConfig = {
  id: 'full-reading',
  type: 'full-reading',
  title: 'Full Reading Test',
  description: '100 câu hỏi hoàn chỉnh Part 5, 6, 7 trong 75 phút. Mô phỏng 100% độ khó và áp lực thời gian của kỳ thi thật.',
  timeLimit: 4500,
  totalQuestions: 100,
  parts: [
    {
      part: 5,
      questionCount: 30,
      instructions: 'Directions: Incomplete sentences with four choices (A, B, C, D). Select the best choice.',
      timeRecommendation: 720,
    },
    {
      part: 6,
      questionCount: 16,
      instructions: 'Directions: Text completion with numbered blanks [1], [2], [3], [4].',
      timeRecommendation: 600,
    },
    {
      part: 7,
      questionCount: 54,
      instructions: 'Directions: Reading comprehension single and multi-passages.',
      timeRecommendation: 3180,
    },
  ],
};

fs.writeFileSync(path.join(CONFIGS_DIR, 'mini-reading.json'), JSON.stringify(miniReadingConfig, null, 2));
fs.writeFileSync(path.join(CONFIGS_DIR, 'full-reading.json'), JSON.stringify(fullReadingConfig, null, 2));

// ==========================================
// PART 5 QUESTION BANKS
// ==========================================

const part5VocabQuestions = [
  {
    id: 'p5-voc-001',
    part: 5,
    passage: 'The company\'s annual financial statement revealed a significant ______ in overseas revenue compared to the previous fiscal year.',
    options: ['increase', 'increasing', 'increased', 'increasingly'],
    correctAnswer: 0,
    explanation: 'Sau mạo từ "a" và tính từ "significant", ta cần một danh từ để làm tân ngữ của "revealed". "Increase" vừa là động từ vừa là danh từ mang nghĩa "sự gia tăng".',
    skillTested: 'vocabulary',
    relatedWordIds: ['finance-001'],
    difficulty: 'easy',
  },
  {
    id: 'p5-voc-002',
    part: 5,
    passage: 'All department managers are requested to ______ their quarterly budgets to the finance office before Friday afternoon.',
    options: ['transmit', 'submit', 'admit', 'permit'],
    correctAnswer: 1,
    explanation: '"Submit" (nộp/đệ trình) là từ vựng chính xác đi với "budget/proposal/report". Các từ khác không phù hợp ngữ cảnh công sở.',
    skillTested: 'vocabulary',
    relatedWordIds: ['office-admin-001', 'finance-002'],
    difficulty: 'easy',
  },
  {
    id: 'p5-voc-003',
    part: 5,
    passage: 'Customer satisfaction ratings have improved dramatically since the introduction of the new ______ service portal.',
    options: ['interactive', 'interaction', 'interactively', 'interact'],
    correctAnswer: 0,
    explanation: 'Trước cụm danh từ "service portal", ta cần tính từ "interactive" (mang tính tương tác) để bổ nghĩa.',
    skillTested: 'vocabulary',
    relatedWordIds: ['technology-001'],
    difficulty: 'medium',
  },
  {
    id: 'p5-voc-004',
    part: 5,
    passage: 'Due to severe weather conditions in the northern territory, delivery of the construction materials may be ______ delayed.',
    options: ['temporarily', 'temporary', 'temporal', 'temporariness'],
    correctAnswer: 0,
    explanation: 'Bổ nghĩa cho động từ/phân từ "delayed", ta cần trạng từ "temporarily" (tạm thời bị hoãn).',
    skillTested: 'vocabulary',
    relatedWordIds: ['manufacturing-001'],
    difficulty: 'easy',
  },
  {
    id: 'p5-voc-005',
    part: 5,
    passage: 'The board of directors commended Mr. Tanaka for his ______ leadership during the company\'s merger with Apex Technologies.',
    options: ['exemplary', 'hesitant', 'reluctant', 'superficial'],
    correctAnswer: 0,
    explanation: '"Exemplary leadership" (sự lãnh đạo gương mẫu, xuất sắc) là cụm từ khen ngợi phổ biến trong ngữ cảnh kinh doanh. Các từ khác mang nghĩa tiêu cực.',
    skillTested: 'vocabulary',
    relatedWordIds: ['hr-personnel-001'],
    difficulty: 'hard',
  },
  {
    id: 'p5-voc-006',
    part: 5,
    passage: 'Hotel guests are entitled to ______ access to the executive lounge, fitness center, and swimming pool.',
    options: ['complimentary', 'compliment', 'complimenting', 'complimentaryly'],
    correctAnswer: 0,
    explanation: '"Complimentary" mang nghĩa "miễn phí / tặng kèm" (bằng free of charge), bổ nghĩa cho danh từ "access".',
    skillTested: 'vocabulary',
    relatedWordIds: ['dining-001', 'travel-001'],
    difficulty: 'medium',
  },
  {
    id: 'p5-voc-007',
    part: 5,
    passage: 'The executive committee voted unanimously to ______ the existing warranty policy on all industrial machinery.',
    options: ['extend', 'expand', 'elongate', 'prolong'],
    correctAnswer: 0,
    explanation: 'Cụm từ cố định trong kinh doanh: "extend a warranty / contract / deadline" mang nghĩa gia hạn thời hạn bảo hành/hợp đồng.',
    skillTested: 'vocabulary',
    relatedWordIds: ['legal-001', 'manufacturing-002'],
    difficulty: 'medium',
  },
  {
    id: 'p5-voc-008',
    part: 5,
    passage: 'Please review the attached contract carefully and notify legal counsel if any terms appear ______ or contradictory.',
    options: ['ambiguous', 'ambiguity', 'ambiguously', 'ambiguousness'],
    correctAnswer: 0,
    explanation: 'Sau động từ nối "appear", ta cần tính từ song song với "contradictory". Do đó chọn "ambiguous" (mơ hồ, đa nghĩa).',
    skillTested: 'vocabulary',
    relatedWordIds: ['legal-002'],
    difficulty: 'hard',
  },
  {
    id: 'p5-voc-009',
    part: 5,
    passage: 'The marketing team\'s promotional campaign resulted in an unprecedented ______ in online pre-orders.',
    options: ['surge', 'surging', 'surged', 'surges'],
    correctAnswer: 0,
    explanation: 'Sau mạo từ "an" và tính từ "unprecedented", ta cần danh từ số ít "surge" (sự tăng vọt bất ngờ).',
    skillTested: 'vocabulary',
    relatedWordIds: ['marketing-001'],
    difficulty: 'medium',
  },
  {
    id: 'p5-voc-010',
    part: 5,
    passage: 'Ms. Henderson has proven herself to be an ______ negotiator during complex multinational trade discussions.',
    options: ['adept', 'awkward', 'absent', 'idle'],
    correctAnswer: 0,
    explanation: '"Adept" mang nghĩa khéo léo, tinh thông (adept negotiator = nhà đàm phán tài ba).',
    skillTested: 'vocabulary',
    relatedWordIds: ['hr-personnel-002'],
    difficulty: 'hard',
  },
  {
    id: 'p5-voc-011',
    part: 5,
    passage: 'To ensure data security, all remote employees must install the software update ______ upon receiving the notification.',
    options: ['promptly', 'prompt', 'promptness', 'prompting'],
    correctAnswer: 0,
    explanation: '"Promptly upon..." (ngay lập tức khi...). Trạng từ "promptly" bổ nghĩa cho cụm hành động cài đặt.',
    skillTested: 'vocabulary',
    relatedWordIds: ['technology-002'],
    difficulty: 'medium',
  },
  {
    id: 'p5-voc-012',
    part: 5,
    passage: 'The new employee handbook outlines all workplace guidelines and safety ______ in full detail.',
    options: ['protocols', 'prototypes', 'proposals', 'professions'],
    correctAnswer: 0,
    explanation: '"Safety protocols" (các quy trình/nguyên tắc an toàn) là danh từ thường gặp trong môi trường sản xuất và văn phòng.',
    skillTested: 'vocabulary',
    relatedWordIds: ['office-admin-002'],
    difficulty: 'medium',
  },
  {
    id: 'p5-voc-013',
    part: 5,
    passage: 'The CEO expressed great ______ for the research team\'s dedication throughout the three-year development cycle.',
    options: ['appreciation', 'appreciate', 'appreciative', 'appreciatively'],
    correctAnswer: 0,
    explanation: 'Sau tính từ "great", cần danh từ "appreciation" (express appreciation for: bày tỏ sự tri ân/đánh giá cao).',
    skillTested: 'vocabulary',
    relatedWordIds: ['office-admin-003'],
    difficulty: 'easy',
  },
  {
    id: 'p5-voc-014',
    part: 5,
    passage: 'Our logistics partners have guaranteed that the replacement parts will be delivered ______ 48 hours.',
    options: ['within', 'among', 'between', 'during'],
    correctAnswer: 0,
    explanation: '"Within + khoảng thời gian" biểu thị hành động diễn ra trong vòng bao lâu (within 48 hours).',
    skillTested: 'vocabulary',
    relatedWordIds: ['purchasing-001'],
    difficulty: 'easy',
  },
  {
    id: 'p5-voc-015',
    part: 5,
    passage: 'Only candidates who meet the ______ educational requirements will be contacted for an interview.',
    options: ['stipulated', 'stipulating', 'stipulation', 'stipulate'],
    correctAnswer: 0,
    explanation: 'Dùng quá khứ phân từ "stipulated" như tính từ mang nghĩa "đã được quy định/nêu rõ trong tiêu chuẩn tuyển dụng".',
    skillTested: 'vocabulary',
    relatedWordIds: ['hr-personnel-003'],
    difficulty: 'hard',
  },
  {
    id: 'p5-voc-016',
    part: 5,
    passage: 'The supplier offered an additional 5 percent discount on all items ordered in ______ quantities.',
    options: ['bulk', 'bulky', 'bulking', 'bulked'],
    correctAnswer: 0,
    explanation: '"In bulk quantities" hoặc "in bulk" là cụm từ chỉ mua bán với số lượng lớn (sỉ).',
    skillTested: 'vocabulary',
    relatedWordIds: ['purchasing-002'],
    difficulty: 'medium',
  },
  {
    id: 'p5-voc-017',
    part: 5,
    passage: 'A comprehensive feasibility study was conducted to determine the ______ of expanding into South American markets.',
    options: ['viability', 'viable', 'viably', 'viabilities'],
    correctAnswer: 0,
    explanation: 'Sau "the" và trước "of expanding", ta cần danh từ không đếm được "viability" (tính khả thi/khả năng thành công).',
    skillTested: 'vocabulary',
    relatedWordIds: ['finance-003'],
    difficulty: 'hard',
  },
  {
    id: 'p5-voc-018',
    part: 5,
    passage: 'The revised software makes it ______ easier for account managers to generate sales invoices.',
    options: ['considerably', 'considerable', 'considerate', 'consideration'],
    correctAnswer: 0,
    explanation: 'Trạng từ "considerably" đứng trước tính từ so sánh hơn "easier" để nhấn mạnh mức độ (dễ dàng hơn đáng kể).',
    skillTested: 'vocabulary',
    relatedWordIds: ['technology-003'],
    difficulty: 'medium',
  },
  {
    id: 'p5-voc-019',
    part: 5,
    passage: 'The building manager stated that maintenance work on the main elevator will commence ______ Monday morning.',
    options: ['effective', 'effects', 'effectively', 'effect'],
    correctAnswer: 0,
    explanation: '"Effective + thời gian" (có hiệu lực/bắt đầu từ...) là cách diễn đạt phổ biến trong thông báo TOEIC.',
    skillTested: 'vocabulary',
    relatedWordIds: ['real-estate-001'],
    difficulty: 'hard',
  },
  {
    id: 'p5-voc-020',
    part: 5,
    passage: 'Participants in the international conference will receive a comprehensive information ______ upon registration.',
    options: ['packet', 'package', 'pack', 'packaging'],
    correctAnswer: 0,
    explanation: '"Information packet" (tập tài liệu thông tin/tệp thông tin tổng hợp cho người tham dự hội thảo).',
    skillTested: 'vocabulary',
    relatedWordIds: ['travel-002'],
    difficulty: 'medium',
  },
  {
    id: 'p5-voc-021',
    part: 5,
    passage: 'The company\'s legal representatives negotiated ______ to ensure favorable contractual terms for both parties.',
    options: ['rigorously', 'rigorous', 'rigor', 'rigorousness'],
    correctAnswer: 0,
    explanation: 'Bổ nghĩa cho động từ "negotiated" cần một trạng từ chỉ thể cách "rigorously" (một cách chặt chẽ, khắt khe).',
    skillTested: 'vocabulary',
    relatedWordIds: ['legal-003'],
    difficulty: 'medium',
  },
  {
    id: 'p5-voc-022',
    part: 5,
    passage: 'The new hybrid vehicle has exceeded all sales forecasts ______ its innovative battery technology.',
    options: ['because of', 'although', 'in spite of', 'even though'],
    correctAnswer: 0,
    explanation: 'Sau chỗ trống là cụm danh từ "its innovative battery technology" nêu nguyên nhân thành công, do đó dùng giới từ "because of".',
    skillTested: 'vocabulary',
    relatedWordIds: ['manufacturing-003'],
    difficulty: 'easy',
  },
  {
    id: 'p5-voc-023',
    part: 5,
    passage: 'The human resources director emphasized that employee attendance at the seminar is entirely ______.',
    options: ['voluntary', 'volunteer', 'voluntarily', 'volunteering'],
    correctAnswer: 0,
    explanation: 'Sau động từ nối "is" và trạng từ "entirely", cần tính từ "voluntary" (hoàn toàn mang tính tự nguyện).',
    skillTested: 'vocabulary',
    relatedWordIds: ['hr-personnel-004'],
    difficulty: 'easy',
  },
  {
    id: 'p5-voc-024',
    part: 5,
    passage: 'Inspectors found that the manufacturing plant was in full ______ with state environmental regulations.',
    options: ['compliance', 'compliant', 'comply', 'compliantly'],
    correctAnswer: 0,
    explanation: 'Cụm từ cố định: "in full compliance with" mang nghĩa tuân thủ đầy đủ các quy định.',
    skillTested: 'vocabulary',
    relatedWordIds: ['manufacturing-004', 'legal-004'],
    difficulty: 'medium',
  },
  {
    id: 'p5-voc-025',
    part: 5,
    passage: 'The warranty does not cover damages caused by improper handling or unauthorized ______ of the device.',
    options: ['modification', 'modify', 'modifying', 'modified'],
    correctAnswer: 0,
    explanation: 'Sau tính từ "unauthorized" và giới từ "of", cần danh từ "modification" (sự sửa đổi/can thiệp trái phép).',
    skillTested: 'vocabulary',
    relatedWordIds: ['technology-004'],
    difficulty: 'easy',
  },
  {
    id: 'p5-voc-026',
    part: 5,
    passage: 'The corporate catering team prepared an ______ selection of gourmet appetizers for the anniversary banquet.',
    options: ['exquisite', 'exquisitely', 'exquisiteness', 'exquisite-like'],
    correctAnswer: 0,
    explanation: 'Đứng trước danh từ "selection" cần tính từ "exquisite" (tinh tế, tuyệt hảo).',
    skillTested: 'vocabulary',
    relatedWordIds: ['dining-002'],
    difficulty: 'medium',
  },
  {
    id: 'p5-voc-027',
    part: 5,
    passage: 'The airline representative assured passengers that their luggage would be delivered to the terminal ______.',
    options: ['shortly', 'short', 'shorten', 'shortness'],
    correctAnswer: 0,
    explanation: '"Shortly" là trạng từ chỉ thời gian mang nghĩa "chẳng bao lâu nữa / sớm thôi" (= soon).',
    skillTested: 'vocabulary',
    relatedWordIds: ['travel-003'],
    difficulty: 'easy',
  },
  {
    id: 'p5-voc-028',
    part: 5,
    passage: 'Mr. Delgado was selected for the promotion because of his ______ record of meeting project targets.',
    options: ['consistent', 'consistency', 'consistently', 'consist'],
    correctAnswer: 0,
    explanation: 'Trước danh từ "record" cần tính từ "consistent" (nhất quán, ổn định, đáng tin cậy).',
    skillTested: 'vocabulary',
    relatedWordIds: ['hr-personnel-005'],
    difficulty: 'medium',
  },
  {
    id: 'p5-voc-029',
    part: 5,
    passage: 'All attendees are advised to ______ their seats at least fifteen minutes prior to the opening keynote speech.',
    options: ['occupy', 'occupant', 'occupation', 'occupied'],
    correctAnswer: 0,
    explanation: 'Cấu trúc "advise someone to + verb infinitive": "occupy one\'s seat" (ngồi vào vị trí chỗ ngồi của mình).',
    skillTested: 'vocabulary',
    relatedWordIds: ['office-admin-004'],
    difficulty: 'easy',
  },
  {
    id: 'p5-voc-030',
    part: 5,
    passage: 'The newly appointed CFO proposed a series of measures aimed at ______ operating expenditures across all branches.',
    options: ['curtailing', 'curtailed', 'curtailment', 'curtails'],
    correctAnswer: 0,
    explanation: 'Sau giới từ "at" cần V-ing. Động từ "curtail" mang nghĩa cắt giảm/hạn chế chi tiêu trong kinh doanh.',
    skillTested: 'vocabulary',
    relatedWordIds: ['finance-004'],
    difficulty: 'hard',
  },
];

const part5GrammarQuestions = [
  {
    id: 'p5-grm-001',
    part: 5,
    passage: 'Neither the department manager nor the project coordinators ______ notified about the sudden change in schedule.',
    options: ['were', 'was', 'is', 'has been'],
    correctAnswer: 0,
    explanation: 'Quy tắc hòa hợp chủ ngữ - vị ngữ với "neither... nor...": Động từ chia theo chủ ngữ gần nó nhất. Ở đây "the project coordinators" là danh từ số nhiều, và sự việc đã xảy ra nên dùng "were".',
    skillTested: 'grammar',
    relatedWordIds: [],
    difficulty: 'medium',
  },
  {
    id: 'p5-grm-002',
    part: 5,
    passage: 'Had the marketing director ______ the client\'s feedback earlier, the product redesign would have succeeded.',
    options: ['received', 'receives', 'receiving', 'receive'],
    correctAnswer: 0,
    explanation: 'Đảo ngữ câu điều kiện loại 3: "Had + S + V3/ed... , S + would have + V3/ed". Chọn "received".',
    skillTested: 'grammar',
    relatedWordIds: [],
    difficulty: 'hard',
  },
  {
    id: 'p5-grm-003',
    part: 5,
    passage: 'The auditor insisted that each branch ______ accurate transaction records on a weekly basis.',
    options: ['maintain', 'maintains', 'maintained', 'maintaining'],
    correctAnswer: 0,
    explanation: 'Cấu trúc giả định thức (Subjunctive mood) với động từ "insist that + S + (should) + V-infinitive". Do đó dùng động từ nguyên thể "maintain".',
    skillTested: 'grammar',
    relatedWordIds: [],
    difficulty: 'hard',
  },
  {
    id: 'p5-grm-004',
    part: 5,
    passage: 'Mr. Evans is the candidate ______ qualifications and portfolio most closely match our current job vacancy.',
    options: ['whose', 'whom', 'who', 'which'],
    correctAnswer: 0,
    explanation: 'Đại từ quan hệ chỉ sở hữu "whose" đứng trước danh từ "qualifications" (người mà có bằng cấp và hồ sơ năng lực...).',
    skillTested: 'grammar',
    relatedWordIds: [],
    difficulty: 'medium',
  },
  {
    id: 'p5-grm-005',
    part: 5,
    passage: 'By the time the conference starts next Tuesday, the administrative staff ______ preparing all name tags and badges.',
    options: ['will have finished', 'have finished', 'had finished', 'finished'],
    correctAnswer: 0,
    explanation: 'Cụm từ "By the time + hiện tại đơn (starts)" chỉ thời điểm trong tương lai, mệnh đề chính dùng thì tương lai hoàn thành "will have finished".',
    skillTested: 'grammar',
    relatedWordIds: [],
    difficulty: 'medium',
  },
  {
    id: 'p5-grm-006',
    part: 5,
    passage: '______ entering the cleanroom facility, all laboratory personnel must put on protective shoe covers.',
    options: ['Before', 'Prior', 'Ahead', 'Previous'],
    correctAnswer: 0,
    explanation: '"Before" vừa là liên từ vừa là giới từ, có thể theo sau bởi V-ing ("Before entering..."). "Prior" cần đi với "to".',
    skillTested: 'grammar',
    relatedWordIds: [],
    difficulty: 'easy',
  },
  {
    id: 'p5-grm-007',
    part: 5,
    passage: 'The legal department warned that ______ who violate the non-disclosure agreement will face immediate termination.',
    options: ['those', 'these', 'anyone', 'them'],
    correctAnswer: 0,
    explanation: '"Those who + V(số nhiều)" mang nghĩa "những ai mà...". Động từ "violate" là số nhiều nên không dùng "anyone" (vốn đi với số ít "violates").',
    skillTested: 'grammar',
    relatedWordIds: [],
    difficulty: 'medium',
  },
  {
    id: 'p5-grm-008',
    part: 5,
    passage: 'The executive vice president rarely attends regional networking events, ______ she?',
    options: ['does', 'doesn\'t', 'is', 'isn\'t'],
    correctAnswer: 0,
    explanation: 'Câu hỏi đuôi (Tag question): Từ "rarely" mang nghĩa bán phủ định (hiếm khi), nên phần câu hỏi đuôi phải ở dạng khẳng định của trợ động từ thì hiện tại đơn -> "does she?".',
    skillTested: 'grammar',
    relatedWordIds: [],
    difficulty: 'medium',
  },
];

const part5CollocationQuestions = [
  {
    id: 'p5-col-001',
    part: 5,
    passage: 'The research institute will ______ a comprehensive survey to evaluate workplace wellness in major corporations.',
    options: ['conduct', 'make', 'produce', 'operate'],
    correctAnswer: 0,
    explanation: 'Collocation chuẩn: "conduct a survey / study / research" (tiến hành một cuộc khảo sát/nghiên cứu).',
    skillTested: 'collocation',
    relatedWordIds: ['office-admin-001'],
    difficulty: 'easy',
  },
  {
    id: 'p5-col-002',
    part: 5,
    passage: 'To ______ the tight production deadline, factory workers agreed to work overtime during the holiday season.',
    options: ['meet', 'catch', 'reach', 'gain'],
    correctAnswer: 0,
    explanation: 'Collocation kinh điển TOEIC: "meet the deadline" (kịp thời hạn chót).',
    skillTested: 'collocation',
    relatedWordIds: ['manufacturing-001'],
    difficulty: 'easy',
  },
  {
    id: 'p5-col-003',
    part: 5,
    passage: 'The purchasing department was able to ______ a favorable agreement with our European component suppliers.',
    options: ['reach', 'achieve', 'arrive', 'settle'],
    correctAnswer: 0,
    explanation: '"Reach an agreement" (đạt được thỏa thuận). "Arrive" cần đi với "at" (arrive at an agreement).',
    skillTested: 'collocation',
    relatedWordIds: ['purchasing-001'],
    difficulty: 'medium',
  },
  {
    id: 'p5-col-004',
    part: 5,
    passage: 'Senior executives will ______ into account the results of the market analysis before finalizing the budget.',
    options: ['take', 'hold', 'bring', 'make'],
    correctAnswer: 0,
    explanation: 'Thành ngữ kinh doanh: "take sth into account" hoặc "take sth into consideration" (tính đến / cân nhắc điều gì).',
    skillTested: 'collocation',
    relatedWordIds: ['finance-001'],
    difficulty: 'easy',
  },
  {
    id: 'p5-col-005',
    part: 5,
    passage: 'Environmental inspectors praised the processing facility for ______ strict adherence to federal emission guidelines.',
    options: ['demonstrating', 'indicating', 'illustrating', 'signaling'],
    correctAnswer: 0,
    explanation: '"Demonstrate adherence to..." (thể hiện sự tuân thủ nghiêm ngặt đối với quy định).',
    skillTested: 'collocation',
    relatedWordIds: ['manufacturing-002'],
    difficulty: 'hard',
  },
];

fs.writeFileSync(path.join(PART5_DIR, 'vocabulary-questions.json'), JSON.stringify(part5VocabQuestions, null, 2));
fs.writeFileSync(path.join(PART5_DIR, 'grammar-questions.json'), JSON.stringify(part5GrammarQuestions, null, 2));
fs.writeFileSync(path.join(PART5_DIR, 'collocation-questions.json'), JSON.stringify(part5CollocationQuestions, null, 2));

// ==========================================
// PART 6 TEXT COMPLETIONS
// ==========================================

const part6Emails = [
  {
    id: 'p6-email-001',
    part: 6,
    passageType: 'email',
    passage: `To: All Branch Staff <staff@solaris-retail.com>
From: Elena Rostova <e.rostova@solaris-retail.com>
Date: October 18
Subject: New Inventory Management System

Dear Colleagues,

We are pleased to announce that our company will soon transition to the OmniTrack inventory management software. This state-of-the-art platform will allow us to track warehouse shipments in real time and eliminate shipping discrepancies. [1] on Monday, November 4, all store locations will begin using the updated database.

To ensure a smooth transition, the IT department has scheduled mandatory training sessions. Each employee is required to complete a 45-minute online module before November 1. The instructions for logging in have been sent in a ______ [2] email. 

We understand that adopting new technology can present challenges. ______ [3], our internal helpdesk team will provide 24/7 technical support during the first two weeks of rollout. 

______ [4]. Please reach out to your department supervisor if you have questions regarding your training schedule.

Sincerely,
Elena Rostova
Director of Operations`,
    questions: [
      {
        id: 'p6-q-001-1',
        blankNumber: 1,
        options: ['Effective', 'Effectively', 'Effect', 'Effectual'],
        correctAnswer: 0,
        explanation: '"Effective + ngày tháng" là cấu trúc thông báo mang nghĩa "bắt đầu có hiệu lực từ ngày..."',
        type: 'grammar',
      },
      {
        id: 'p6-q-001-2',
        blankNumber: 2,
        options: ['separate', 'separated', 'separately', 'separation'],
        correctAnswer: 0,
        explanation: 'Trước danh từ "email" cần tính từ "separate" (trong một email riêng biệt).',
        type: 'vocabulary',
      },
      {
        id: 'p6-q-001-3',
        blankNumber: 3,
        options: ['Consequently', 'To that end', 'On the contrary', 'In fact'],
        correctAnswer: 1,
        explanation: '"To that end" (Nhằm mục đích đó / Để phục vụ cho điều này) nối kết mục đích giải quyết thách thức bằng đội hỗ trợ 24/7.',
        type: 'vocabulary',
      },
      {
        id: 'p6-q-001-4',
        blankNumber: 4,
        options: [
          'We appreciate your cooperation as we modernize our procedures.',
          'Warehouse space is currently unavailable for rent.',
          'Sales revenue has declined over the previous two quarters.',
          'The customer service hotline has been disconnected.',
        ],
        correctAnswer: 0,
        explanation: 'Câu kết nối tự nhiên và lịch sự trong email thông báo nội bộ: cảm ơn sự hợp tác của nhân viên khi hiện đại hóa quy trình.',
        type: 'sentence-insertion',
      },
    ],
  },
  {
    id: 'p6-email-002',
    part: 6,
    passageType: 'email',
    passage: `To: David Chen <dchen@summitlogistics.com>
From: Sarah Jenkins <sjenkins@pacifictrade.org>
Date: November 12
Subject: Confirmation of Keynote Address

Dear Mr. Chen,

On behalf of the Pacific Trade Association, I would like to confirm your participation as a keynote speaker at our upcoming Annual Global Logistics Expo. We were thrilled to receive your confirmation letter earlier this week.

Your presentation on "Artificial Intelligence in Modern Supply Chains" is scheduled for December 15 at 10:00 AM in Ballroom C. ______ [1] the session, our audiovisual technicians will be available to test your presentation slides and microphone setup. Please arrive at least 30 minutes ______ [2] to ensure everything functions properly.

The association will cover all travel and lodging expenses. Our travel coordinator, Robert Miller, will contact you shortly to finalize your flight itinerary and hotel ______ [3].

______ [4]. We look forward to welcoming you to the conference.

Warm regards,
Sarah Jenkins
Event Coordinator`,
    questions: [
      {
        id: 'p6-q-002-1',
        blankNumber: 1,
        options: ['Prior to', 'According to', 'In place of', 'Instead of'],
        correctAnswer: 0,
        explanation: '"Prior to + Noun" = Trước khi buổi thuyết trình diễn ra.',
        type: 'grammar',
      },
      {
        id: 'p6-q-002-2',
        blankNumber: 2,
        options: ['early', 'ahead', 'prior', 'beforehand'],
        correctAnswer: 0,
        explanation: '"Arrive 30 minutes early" (đến sớm 30 phút).',
        type: 'vocabulary',
      },
      {
        id: 'p6-q-002-3',
        blankNumber: 3,
        options: ['accommodations', 'accommodate', 'accommodating', 'accommodator'],
        correctAnswer: 0,
        explanation: 'Cụm từ "hotel accommodations" (chỗ ở khách sạn).',
        type: 'vocabulary',
      },
      {
        id: 'p6-q-002-4',
        blankNumber: 4,
        options: [
          'Enclosed is a formal program guide for your reference.',
          'The hotel banquet hall has been cancelled due to weather.',
          'We regret to inform you that the conference has been postponed.',
          'Refund requests cannot be accepted after the deadline.',
        ],
        correctAnswer: 0,
        explanation: 'Câu gửi kèm tài liệu hướng dẫn chương trình họp cho diễn giả.',
        type: 'sentence-insertion',
      },
    ],
  },
];

const part6Letters = [
  {
    id: 'p6-letter-001',
    part: 6,
    passageType: 'letter',
    passage: `Oakridge Community Bank
1450 Elmhurst Avenue
Seattle, WA 98101

November 20

Dear Valued Customer,

Thank you for choosing Oakridge Community Bank for your financial needs. We are writing to notify you of an important improvement to our personal banking services. Beginning January 1, our mobile banking application will feature enhanced biometric security and instant account notification services.

These upgrades are designed to provide you with greater convenience and ______ [1] protection against fraudulent transactions. ______ [2]. Therefore, you will not experience any interruption to your daily account access during the transition period.

To activate the new features, simply download the latest version of the Oakridge Mobile App when prompted on your smartphone. If you have any inquiries regarding your online credentials, our customer support desk is available ______ [3] phone or live chat.

We remain committed to ______ [4] you with the highest standard of banking security and service excellence.

Sincerely,
Martin Gallagher
Vice President of Client Relations`,
    questions: [
      {
        id: 'p6-let-001-1',
        blankNumber: 1,
        options: ['enhanced', 'enhance', 'enhancement', 'enhancing'],
        correctAnswer: 0,
        explanation: 'Trước danh từ "protection", ta cần tính từ phân từ "enhanced" (được tăng cường/nâng cấp).',
        type: 'vocabulary',
      },
      {
        id: 'p6-let-001-2',
        blankNumber: 2,
        options: [
          'The scheduled system maintenance will be conducted overnight on weekends.',
          'Branch locations will be closed permanently next month.',
          'Interest rates on all savings accounts will be reduced.',
          'Paper checks will no longer be accepted by our tellers.',
        ],
        correctAnswer: 0,
        explanation: 'Câu tiếp theo nói về việc không bị gián đoạn truy cập, nên câu này phải giải thích là việc bảo trì diễn ra vào ban đêm cuối tuần.',
        type: 'sentence-insertion',
      },
      {
        id: 'p6-let-001-3',
        blankNumber: 3,
        options: ['via', 'along', 'from', 'between'],
        correctAnswer: 0,
        explanation: '"Via phone or live chat" (thông qua điện thoại hoặc trò chuyện trực tuyến).',
        type: 'grammar',
      },
      {
        id: 'p6-let-001-4',
        blankNumber: 4,
        options: ['providing', 'provide', 'provided', 'provision'],
        correctAnswer: 0,
        explanation: 'Cấu trúc "committed to + V-ing" (cam kết mang đến cho quý khách...).',
        type: 'grammar',
      },
    ],
  },
];

const part6Articles = [
  {
    id: 'p6-art-001',
    part: 6,
    passageType: 'article',
    passage: `BUSINESS TODAY WEEKLY
December 5 — Global Commercial Outlook

Vanguard Automotive Group announced on Thursday that it will invest $450 million in a new manufacturing facility located in northern Texas. The state-of-the-art plant is expected to create over 1,800 engineering and assembly jobs over the next three years.

Company spokesperson Marcus Sterling noted that the Texas site was chosen because of its strategic proximity to rail networks and an ______ [1] supply of renewable electricity. Construction is scheduled to break ground this coming March, with commercial operations slated to commence by mid-2028.

Industry analysts view the investment as a decisive move toward expanding Vanguard\'s market share in clean transportation. ______ [2]. The facility will focus ______ [3] on producing high-efficiency commercial delivery vans for logistics firms.

Local civic leaders have enthusiastically welcomed the announcement. ______ [4]. Mayor Brenda Ortiz stated that the project will significantly revitalize the local economy and foster workforce development programs.`,
    questions: [
      {
        id: 'p6-art-001-1',
        blankNumber: 1,
        options: ['abundant', 'abundance', 'abundantly', 'abound'],
        correctAnswer: 0,
        explanation: 'Trước cụm danh từ "supply of renewable electricity", cần tính từ "abundant" (dồi dào, phong phú).',
        type: 'vocabulary',
      },
      {
        id: 'p6-art-001-2',
        blankNumber: 2,
        options: [
          'Consumer demand for sustainable commercial vehicles has surged in recent quarters.',
          'The company reported substantial losses in its aviation division.',
          'Railroad workers announced plans for an immediate nationwide strike.',
          'Fuel prices reached an all-time low across the United States.',
        ],
        correctAnswer: 0,
        explanation: 'Giải thích lý do mở rộng thị trường xe sạch: nhu cầu người tiêu dùng với xe thương mại bền vững đang tăng vọt.',
        type: 'sentence-insertion',
      },
      {
        id: 'p6-art-001-3',
        blankNumber: 3,
        options: ['primarily', 'primary', 'primal', 'primacy'],
        correctAnswer: 0,
        explanation: 'Bổ nghĩa cho động từ "focus on" cần trạng từ "primarily" (tập trung chủ yếu vào việc sản xuất...).',
        type: 'grammar',
      },
      {
        id: 'p6-art-001-4',
        blankNumber: 4,
        options: [
          'They anticipate substantial regional tax revenues and infrastructure improvements.',
          'The city council decided to reject the preliminary building permit.',
          'Electric power lines will be dismantled throughout the industrial zone.',
          'Automotive assembly workers voted against the employment agreement.',
        ],
        correctAnswer: 0,
        explanation: 'Phù hợp với việc lãnh đạo địa phương hồ hởi đón nhận: họ dự báo nguồn thu thuế dồi dào và cải thiện hạ tầng.',
        type: 'sentence-insertion',
      },
    ],
  },
];

fs.writeFileSync(path.join(PART6_DIR, 'emails.json'), JSON.stringify(part6Emails, null, 2));
fs.writeFileSync(path.join(PART6_DIR, 'letters.json'), JSON.stringify(part6Letters, null, 2));
fs.writeFileSync(path.join(PART6_DIR, 'articles.json'), JSON.stringify(part6Articles, null, 2));

// ==========================================
// PART 7 READING COMPREHENSION PASSAGES
// ==========================================

const part7SinglePassages = [
  {
    id: 'p7-single-001',
    part: 7,
    passageType: 'single',
    passages: [
      {
        type: 'Advertisement',
        content: `Crestview Executive Suites — Premium Co-working & Private Offices
100 Financial Way, Downtown Seattle

Are you looking for an inspiring, fully serviced workspace to elevate your business? Crestview Executive Suites offers private offices, shared workstations, and fully equipped conference rooms tailored for entrepreneurs, legal practitioners, and remote corporate teams.

Amenities Include:
• Ultra-fast fiber optic internet and secure Wi-Fi throughout the building
• Complimentary espresso bar, artisan teas, and catered breakfast on Mondays
• Executive boardrooms with 4K video conferencing and digital smartboards
• Professional administrative support, including mail handling and telephone reception
• 24/7 keycard access with covered parking options available

Flexible Membership Options:
- Dedicated Desk: $350 / month (Includes 5 hours of conference room credits)
- Private Executive Office: $850 / month (Includes 15 hours of conference room credits)
- Virtual Business Address: $89 / month (Mail sorting and scanning included)

Special Promotion: Sign an annual lease agreement before November 30 and receive your first month at 50% off, plus 10 additional conference room hours!

Schedule a private guided tour today by contacting leasing agent Claire Reynolds at claire@crestviewsuites.com or call (206) 555-0198.`,
      },
    ],
    questions: [
      {
        id: 'p7-q-001-1',
        question: 'What is the primary purpose of the advertisement?',
        options: [
          'To promote office space rentals and co-working memberships',
          'To announce the relocation of a financial corporation',
          'To recruit administrative assistants and receptionists',
          'To solicit investors for a commercial real estate project',
        ],
        correctAnswer: 0,
        explanation: 'Toàn bộ bài quảng cáo nhằm giới thiệu các gói thuê văn phòng và bàn làm việc tại Crestview Executive Suites.',
        questionType: 'main-idea',
      },
      {
        id: 'p7-q-001-2',
        question: 'What amenity is offered free of charge on Monday mornings?',
        options: ['Catered breakfast', 'Parking permits', 'Conference room usage', 'Printing supplies'],
        correctAnswer: 0,
        explanation: 'Đoạn amenities nêu: "Complimentary espresso bar, artisan teas, and catered breakfast on Mondays".',
        questionType: 'detail',
      },
      {
        id: 'p7-q-001-3',
        question: 'How can a prospective tenant qualify for the 50% discount?',
        options: [
          'By committing to a one-year lease before November 30',
          'By paying for six months of rent upfront in cash',
          'By referring two other corporate businesses',
          'By booking a tour through the website portal',
        ],
        correctAnswer: 0,
        explanation: 'Đoạn khuyến mãi ghi: "Sign an annual lease agreement before November 30 and receive your first month at 50% off".',
        questionType: 'detail',
      },
      {
        id: 'p7-q-001-4',
        question: 'The word "tailored" in paragraph 1 is closest in meaning to:',
        options: ['customized', 'manufactured', 'clothed', 'repaired'],
        correctAnswer: 0,
        explanation: '"Tailored for" ở đây mang nghĩa được thiết kế riêng/tùy biến (customized) theo nhu cầu khách hàng.',
        questionType: 'vocabulary',
      },
    ],
  },
  {
    id: 'p7-single-002',
    part: 7,
    passageType: 'single',
    passages: [
      {
        type: 'Memo',
        content: `MEMORANDUM
To: All Laboratory and Manufacturing Staff
From: Arthur Pendelton, Safety & Compliance Director
Date: October 14
Subject: Revision of Hazardous Materials Storage Procedures

In light of recent updates to OSHA regulatory standards, our company is instituting revised protocols for handling and storing chemical solvents in the east manufacturing wing. 

Effective Monday, October 21, all organic solvents must be transferred to certified flame-resistant storage lockers located in Room 104-B. Under no circumstances should containers be left unattended on workbenches after the end of a shift. Furthermore, all personnel entering Room 104-B are strictly required to log container IDs and volume amounts in the digital inventory tablet mounted beside the entrance.

Compliance inspections will be conducted unannounced by our safety audit team throughout the upcoming month. Failure to adhere to these safety standards may result in formal disciplinary action.

Should you have any questions or require updated safety goggles and chemical aprons, please speak with shift supervisor Brenda Walsh during morning roll call. Thank you for your continued commitment to maintaining a secure workplace.`,
      },
    ],
    questions: [
      {
        id: 'p7-q-002-1',
        question: 'Why was the memorandum issued?',
        options: [
          'To introduce updated chemical storage guidelines',
          'To report an industrial accident in the cleanroom',
          'To announce the appointment of a new compliance director',
          'To invite employees to a voluntary safety seminar',
        ],
        correctAnswer: 0,
        explanation: 'Memo thông báo sửa đổi quy trình bảo quản chất nguy hiểm ("Revision of Hazardous Materials Storage Procedures").',
        questionType: 'main-idea',
      },
      {
        id: 'p7-q-002-2',
        question: 'What is required of employees when entering Room 104-B?',
        options: [
          'Recording chemical information on an electronic tablet',
          'Presenting an authorization badge to security guards',
          'Disposing of all personal electronic devices',
          'Conducting an emergency ventilation drill',
        ],
        correctAnswer: 0,
        explanation: 'Văn bản nêu: "strictly required to log container IDs and volume amounts in the digital inventory tablet mounted beside the entrance".',
        questionType: 'detail',
      },
      {
        id: 'p7-q-002-3',
        question: 'When will the new storage rules take effect?',
        options: ['October 21', 'October 14', 'November 1', 'October 30'],
        correctAnswer: 0,
        explanation: '"Effective Monday, October 21, all organic solvents must be transferred...".',
        questionType: 'detail',
      },
      {
        id: 'p7-q-002-4',
        question: 'Who should workers contact if they need new protective equipment?',
        options: ['Brenda Walsh', 'Arthur Pendelton', 'OSHA representatives', 'Building security personnel'],
        correctAnswer: 0,
        explanation: 'Đoạn cuối nêu rõ: "please speak with shift supervisor Brenda Walsh during morning roll call".',
        questionType: 'detail',
      },
    ],
  },
];

const part7DoublePassages = [
  {
    id: 'p7-double-001',
    part: 7,
    passageType: 'double',
    passages: [
      {
        type: 'Order Confirmation',
        content: `APEX OFFICE DEPOT — ORDER CONFIRMATION
Order Number: AOD-88219
Customer: Sarah Kensington, Marketing Director
Company: Horizon Media Group, 450 Broadway, New York, NY
Order Date: November 3
Estimated Delivery Date: November 7

Items Ordered:
1. Ergonomic Mesh Swivel Chair (SKU: ERG-902)
   Qty: 4 | Unit Price: $220.00 | Total: $880.00
2. Dual-Monitor Desktop Stand (SKU: MON-410)
   Qty: 4 | Unit Price: $65.00 | Total: $260.00
3. Wireless Laser Presenter Pointer (SKU: PRS-104)
   Qty: 2 | Unit Price: $45.00 | Total: $90.00

Subtotal: $1,230.00
Shipping & Handling (Standard 4-Day): $45.00
Promotional Code Applied (SAVE10): -$123.00
Total Billed to Visa ending in 4102: $1,152.00

Tracking information will be emailed once packages depart our distribution center. Items may arrive in separate shipments.`,
      },
      {
        type: 'Email',
        content: `To: Customer Service <support@apexofficedepot.com>
From: Sarah Kensington <skensington@horizonmedia.com>
Date: November 8
Subject: Inquiry regarding Order #AOD-88219

Dear Customer Support,

I am writing regarding order #AOD-88219 placed on November 3 for delivery to our Broadway office. 

Yesterday afternoon, our receptionist received two large cartons containing the four dual-monitor stands and the wireless presenter remotes. However, the four ergonomic mesh swivel chairs were not included in the delivery, and the shipping manifest taped to the boxes listed only two packages.

According to our order confirmation, the entire order was estimated to arrive by yesterday, November 7. Could you please check your inventory records and provide an updated tracking number for the remaining items? We have four new graphic designers starting next Monday, November 11, so it is imperative that their workstations are fully assembled before their arrival.

Thank you for your prompt assistance.

Sincerely,
Sarah Kensington
Director of Marketing, Horizon Media Group`,
      },
    ],
    questions: [
      {
        id: 'p7-q-double-001-1',
        question: 'What discount was applied to Ms. Kensington\'s order?',
        options: ['10 percent off the subtotal', 'Free standard shipping', 'Buy-one-get-one on monitor stands', '$50 corporate rebate'],
        correctAnswer: 0,
        explanation: 'Trong đơn hàng: Subtotal là $1,230.00 và mã SAVE10 trừ -$123.00, tương đương giảm đúng 10%.',
        questionType: 'detail',
      },
      {
        id: 'p7-q-double-001-2',
        question: 'Which item(s) did Ms. Kensington NOT receive?',
        options: [
          'The ergonomic swivel chairs',
          'The dual-monitor desktop stands',
          'The wireless laser presenters',
          'The assembly hardware kits',
        ],
        correctAnswer: 0,
        explanation: 'Email nêu rõ: "the four ergonomic mesh swivel chairs were not included in the delivery".',
        questionType: 'detail',
      },
      {
        id: 'p7-q-double-001-3',
        question: 'Why is Ms. Kensington eager to receive the remaining items quickly?',
        options: [
          'New employees are joining her department next week',
          'Her company is relocating to a new building',
          'An executive board meeting is scheduled for Friday',
          'The return window for furniture expires shortly',
        ],
        correctAnswer: 0,
        explanation: '"We have four new graphic designers starting next Monday, November 11, so it is imperative that their workstations are fully assembled".',
        questionType: 'inference',
      },
      {
        id: 'p7-q-double-001-4',
        question: 'In the email, the word "imperative" in paragraph 3 is closest in meaning to:',
        options: ['crucial', 'optional', 'convenient', 'suggested'],
        correctAnswer: 0,
        explanation: '"Imperative" nghĩa là tối quan trọng, cấp bách (= crucial, essential).',
        questionType: 'vocabulary',
      },
      {
        id: 'p7-q-double-001-5',
        question: 'How much was charged for the items that Ms. Kensington actually received?',
        options: ['$350.00 before discount', '$880.00 before discount', '$260.00 before discount', '$90.00 before discount'],
        correctAnswer: 0,
        explanation: 'Các món đã nhận là: 4 monitor stands ($260) + 2 presenter pointers ($90) = $350 trước chiết khấu.',
        questionType: 'detail',
      },
    ],
  },
];

const part7TriplePassages = [
  {
    id: 'p7-triple-001',
    part: 7,
    passageType: 'triple',
    passages: [
      {
        type: 'Job Posting',
        content: `AeroLink International Freight
Position: Senior Logistics Account Manager
Location: Chicago, IL (Hybrid: 3 days in office, 2 days remote)

About the Role:
AeroLink is seeking an experienced logistics professional to manage commercial accounts across our Midwest freight corridor. The successful candidate will build strong client relationships, negotiate vendor contracts, and supervise shipment workflows.

Requirements:
• Bachelor\'s degree in supply chain management, business, or related field
• Minimum 5 years of commercial freight forwarding experience
• Proficiency with enterprise ERP platforms (SAP or FreightPro preferred)
• Demonstrated ability to lead cross-functional negotiation teams

Compensation:
$95,000 - $115,000 base salary plus performance bonuses, comprehensive medical/dental benefits, and 401(k) matching up to 6%.

To Apply: Submit cover letter, resume, and contact information for three references to careers@aerolinklogistics.com by September 15.`,
      },
      {
        type: 'Email (Cover Letter)',
        content: `To: AeroLink Hiring Committee <careers@aerolinklogistics.com>
From: Thomas Bradley <tbradley92@gmail.com>
Date: September 10
Subject: Application — Senior Logistics Account Manager (Thomas Bradley)

Dear Members of the Hiring Committee,

I am writing to express my enthusiastic interest in the Senior Logistics Account Manager opening at AeroLink International Freight. 

For the past six years, I have served as Freight Operations Supervisor at Continental Cargo Systems in Chicago. In this role, I have overseen cross-dock distribution for major Midwest manufacturers and led our regional transition to FreightPro ERP software. Last year, my department achieved a 98.4% on-time delivery rate while reducing freight carrier procurement expenses by 12%.

Having collaborated with AeroLink as a partner carrier throughout my career, I have long admired your reputation for client integrity and technological leadership. I am confident that my operational expertise and deep client relationships will make an immediate contribution to your account portfolio.

My resume and references are attached for your review. I look forward to discussing my qualifications in an interview.

Sincerely,
Thomas Bradley`,
      },
      {
        type: 'Interview Invitation Email',
        content: `To: Thomas Bradley <tbradley92@gmail.com>
From: Karen Vance <k.vance@aerolinklogistics.com>
Date: September 22
Subject: Interview Invitation — AeroLink Senior Logistics Account Manager

Dear Mr. Bradley,

Thank you for applying for the Senior Logistics Account Manager position. The selection panel was thoroughly impressed by your extensive freight management experience and proven track record with FreightPro ERP.

We would like to invite you for a 45-minute virtual panel interview on Thursday, September 28 at 2:00 PM CST via Zoom. The interview panel will include myself and our Vice President of Midwest Operations, Gary Sterling. During the session, you will be asked to discuss your carrier procurement strategies and present a brief case study on resolving logistics bottlenecks.

Please reply to this email by Monday, September 25 to confirm your availability. If the proposed time conflicts with your schedule, please indicate your availability for Friday morning, September 29.

Best regards,
Karen Vance
Talent Acquisition Specialist, AeroLink Freight`,
      },
    ],
    questions: [
      {
        id: 'p7-q-triple-001-1',
        question: 'What qualification listed in the job posting does Mr. Bradley specifically mention in his email?',
        options: [
          'Familiarity with FreightPro software',
          'Fluency in multiple foreign languages',
          'A master\'s degree in economics',
          'Experience in maritime shipping regulations',
        ],
        correctAnswer: 0,
        explanation: 'Email của Bradley nêu: "led our regional transition to FreightPro ERP software", đúng với phần mềm được ưu tiên trong thông báo tuyển dụng.',
        questionType: 'detail',
      },
      {
        id: 'p7-q-triple-001-2',
        question: 'How long has Mr. Bradley worked at Continental Cargo Systems?',
        options: ['6 years', '5 years', '3 years', '2 years'],
        correctAnswer: 0,
        explanation: 'Trong email Bradley viết: "For the past six years, I have served as Freight Operations Supervisor at Continental Cargo Systems".',
        questionType: 'detail',
      },
      {
        id: 'p7-q-triple-001-3',
        question: 'Who will participate in Mr. Bradley\'s interview along with Ms. Vance?',
        options: ['Gary Sterling', 'Arthur Pendelton', 'Marcus Vance', 'Sarah Kensington'],
        correctAnswer: 0,
        explanation: 'Thư mời phỏng vấn ghi: "The interview panel will include myself and our Vice President of Midwest Operations, Gary Sterling".',
        questionType: 'detail',
      },
      {
        id: 'p7-q-triple-001-4',
        question: 'What is Mr. Bradley expected to present during the interview?',
        options: [
          'A case study on resolving logistics bottlenecks',
          'His former company\'s financial statements',
          'A recommendation letter from his current CEO',
          'A complete business proposal for Chicago airport freight',
        ],
        correctAnswer: 0,
        explanation: 'Email mời phỏng vấn nêu: "present a brief case study on resolving logistics bottlenecks".',
        questionType: 'detail',
      },
      {
        id: 'p7-q-triple-001-5',
        question: 'By what date must Mr. Bradley confirm his interview slot?',
        options: ['September 25', 'September 15', 'September 28', 'September 29'],
        correctAnswer: 0,
        explanation: '"Please reply to this email by Monday, September 25 to confirm your availability."',
        questionType: 'detail',
      },
    ],
  },
];

fs.writeFileSync(path.join(PART7_DIR, 'single-passages.json'), JSON.stringify(part7SinglePassages, null, 2));
fs.writeFileSync(path.join(PART7_DIR, 'double-passages.json'), JSON.stringify(part7DoublePassages, null, 2));
fs.writeFileSync(path.join(PART7_DIR, 'triple-passages.json'), JSON.stringify(part7TriplePassages, null, 2));

console.log('Finished writing all question banks.');
