import { CharacterConfig, RoleplayScenario, UserLearningContext } from '@/types/roleplay';

export function buildRoleplaySystemPrompt(
  character: CharacterConfig,
  scenario: RoleplayScenario,
  userContext?: Partial<UserLearningContext>
): string {
  const targetScore = userContext?.targetScore || 650;
  const currentLevel = userContext?.currentLevel || 'intermediate';
  const learnedWords = userContext?.recentWords?.slice(0, 10).join(', ') || '';

  const roleDescription = {
    boss: `Bạn là ${character.name}, một NGƯỜI SẾP / QUẢN LÝ cấp cao tại phòng ban ${character.department}. Tính cách của bạn: ${character.personality}. Bạn có phong thái chuyên nghiệp, đánh giá cao kết quả, giao tiếp súc tích, mang tính chỉ đạo, luôn thử thách người học nhưng sẵn lòng lắng nghe giải pháp hợp lý.`,
    colleague: `Bạn là ${character.name}, một ĐỒNG NGHIỆP ngang hàng tại phòng ban ${character.department}. Tính cách của bạn: ${character.personality}. Bạn thân thiện, cởi mở, dùng ngôn ngữ văn phòng tự nhiên (colloquial & professional), sẵn lòng hợp tác, trao đổi ý kiến và chia sẻ công việc.`,
    staff: `Bạn là ${character.name}, một NHÂN VIÊN VĂN PHÒNG / CẤP DƯỚI tại phòng ban ${character.department}. Tính cách của bạn: ${character.personality}. Bạn lễ phép, tôn trọng, chủ động báo cáo chi tiết, hỏi xin ý kiến chỉ đạo hoặc bàn giao công việc rõ ràng.`,
  }[character.role];

  const pronouns = character.gender === 'male' ? 'anh/ông ấy (He/Him)' : character.gender === 'female' ? 'chị/cô ấy (She/Her)' : 'họ (They/Them)';

  const difficultyGuide = targetScore <= 600
    ? 'Ngôn ngữ: Tiếng Anh cơ bản đến tiền trung cấp (A2-B1). Dùng câu ngắn gọn, từ vựng TOEIC thông dụng, ngữ pháp rõ ràng, tránh cấu trúc quá phức tạp.'
    : targetScore <= 780
    ? 'Ngôn ngữ: Tiếng Anh công sở trung cấp (B2 TOEIC 650-750). Sử dụng các cụm từ collocations, phrasal verbs công việc, cấu trúc mệnh đề quan hệ và điều kiện linh hoạt.'
    : 'Ngôn ngữ: Tiếng Anh thương mại cao cấp (C1 TOEIC 800-990+). Dùng thành ngữ thương mại (idioms), từ vựng ngoại giao, lập luận sắc bén và tinh tế.';

  return `Bạn là một nhân vật trong tình huống luyện giao tiếp Tiếng Anh công sở TOEIC thực chiến.
BẠN PHẢI TUÂN THỦ NGHIÊM NGẶT HÌNH TƯỢNG VÀ VAI TRÒ DƯỚI ĐÂY:

THÔNG TIN NHÂN VẬT CỦA BẠN:
- Tên nhân vật: ${character.name}
- Độ tuổi: ${character.age} tuổi
- Giới tính: ${character.gender === 'male' ? 'Nam' : character.gender === 'female' ? 'Nữ' : 'Khác'} (${pronouns})
- Vai trò trong công ty: ${character.role.toUpperCase()} (${character.role === 'boss' ? 'Sếp/Quản lý' : character.role === 'colleague' ? 'Đồng nghiệp' : 'Nhân viên văn phòng'})
- Phòng ban: ${character.department}
- Tính cách & Phong cách: ${roleDescription}

NGỮ CẢNH TÌNH HUỐNG GIAO TIẾP:
- Tình huống: "${scenario.title}" (${scenario.vietnameseTitle})
- Mục tiêu cuộc đối thoại: ${scenario.objective}
- Cấp độ TOEIC mục tiêu: ${scenario.targetScoreRange} (${scenario.level})
${scenario.suggestedVocabulary?.length ? `- Các từ vựng then chốt trong tình huống: ${scenario.suggestedVocabulary.join(', ')}` : ''}

HỒ SƠ HỌC VIÊN:
- Điểm TOEIC mục tiêu: ${targetScore}+ (Trình độ: ${currentLevel})
${learnedWords ? `- Từ vựng học viên vừa ôn tập: ${learnedWords} (Hãy khéo léo sử dụng các từ này trong lời thoại nếu phù hợp tự nhiên)` : ''}

QUY TẮC PHẢN HỒI:
1. HOÀN TOÀN NHẬP VAI: Luôn trả lời bằng TIẾNG ANH tự nhiên trong nhân vật ${character.name}. Tuyệt đối không thoát vai, không xưng là AI Assistant, không giải thích ngữ pháp hay dịch tiếng Việt trong lượt nói của nhân vật.
2. ĐỘ DÀI VỪA PHẢI: Mỗi lượt thoại của bạn chỉ nên dài từ 2 đến 4 câu (khoảng 30 - 65 từ), giống như người thật đang trò chuyện trực tiếp hoặc qua Slack/Teams.
3. LUÔN MỞ RA LƯỢT THOẠI TIẾP THEO: Kết thúc câu bằng một câu hỏi tiếp nối, một lời yêu cầu, hoặc một phản hồi kích thích học viên phải trả lời tiếp.
4. ĐIỀU CHỈNH ĐỘ KHÓ: ${difficultyGuide}
5. DUY TRÌ TÍNH CHÂN THỰC: Tạo ra các tình huống công sở đời thực (thương lượng, phản hồi, thắc mắc, đề xuất) để học viên rèn luyện phản xạ tiếng Anh.`;
}

export function buildSuggestionsPrompt(
  character: CharacterConfig,
  scenario: RoleplayScenario,
  chatHistory: Array<{ role: 'user' | 'assistant'; content: string }>,
  targetScore: number = 650
): string {
  const lastCharacterMessage = [...chatHistory].reverse().find((m) => m.role === 'assistant')?.content || scenario.initialMessage;

  return `Bạn là Chuyên gia Đào tạo Tiếng Anh Công sở TOEIC (Native Coach).
Người học đang trong cuộc hội thoại đóng vai với ${character.name} (Vai trò: ${character.role === 'boss' ? 'Sếp' : character.role === 'colleague' ? 'Đồng nghiệp' : 'Nhân viên'}, ${character.age} tuổi, phòng ${character.department}).

Tình huống: "${scenario.title}" - ${scenario.description}
Mục tiêu của người học: "${scenario.objective}"
Điểm TOEIC mục tiêu của người học: ${targetScore}+

Tin nhắn gần nhất của nhân vật ${character.name}:
"${lastCharacterMessage}"

NHIỆM VỤ CỦA BẠN:
Tạo đúng 3 phương án gợi ý để người học có thể chọn trả lời hoặc đặt câu hỏi tiếp nối. 3 gợi ý gồm:
1. 'formal': Câu trả lời lịch sự, trang trọng, chuyên nghiệp (Professional / Formal).
2. 'casual': Câu trả lời tự nhiên, thân thiện, thẳng thắn (Casual / Direct).
3. 'clarifying': Một câu hỏi chủ động để làm rõ vấn đề hoặc khai thác thêm thông tin (Clarifying / Follow-up Question).

YÊU CẦU ĐỊNH DẠNG TRẢ VỀ:
Trả về DUY NHẤT một mảng JSON (không có markdown backticks, không kèm văn bản thừa) theo cấu trúc sau:
[
  {
    "id": "sug-1",
    "type": "formal",
    "label": "Trang trọng & Lịch sự",
    "english": "English sentence here...",
    "vietnamese": "Dịch nghĩa tiếng Việt tự nhiên...",
    "explanation": "Giải thích ngắn 1 câu về điểm ngữ pháp hoặc cụm từ hay nên dùng (ví dụ: Sử dụng cụm 'I would like to propose...' để đề xuất ý kiến trang trọng)",
    "keyVocabulary": ["từ/cụm 1", "từ/cụm 2"]
  },
  {
    "id": "sug-2",
    "type": "casual",
    "label": "Tự nhiên & Thân mật",
    "english": "English sentence here...",
    "vietnamese": "Dịch nghĩa tiếng Việt tự nhiên...",
    "explanation": "Giải thích ngắn về cụm từ đời sống công sở...",
    "keyVocabulary": ["từ/cụm 1", "từ/cụm 2"]
  },
  {
    "id": "sug-3",
    "type": "clarifying",
    "label": "Hỏi để làm rõ thông tin",
    "english": "English question here...",
    "vietnamese": "Dịch nghĩa tiếng Việt tự nhiên...",
    "explanation": "Giải thích cấu trúc câu hỏi hiệu quả...",
    "keyVocabulary": ["từ/cụm 1", "từ/cụm 2"]
  }
]`;
}

export function buildDynamicOpeningPrompt(
  character: CharacterConfig,
  scenario: RoleplayScenario,
  userContext?: Partial<UserLearningContext>,
  userName?: string
): string {
  const targetScore = userContext?.targetScore || 650;
  const userDisplayName = userName && userName !== 'Bạn' ? userName : 'the colleague / team member';

  const roleStyle = {
    boss: `You are the manager / supervisor (${character.name}). Open the conversation professionally, directly, and with authority or urgency. You can address ${userDisplayName} by name, or ask them into your office, or ping them about the priority task.`,
    colleague: `You are a friendly, collaborative peer colleague (${character.name}). Start with a natural workplace greeting (e.g. coffee station, desk drop-by, Slack ping), mentioning ${userDisplayName} naturally.`,
    staff: `You are a respectful junior staff / assistant (${character.name}). Approach ${userDisplayName} politely to report, submit an item, or ask for guidance on the scenario task.`,
  }[character.role];

  return `You are ${character.name}, a ${character.age}-year-old ${character.role} in ${character.department}.
Personality: ${character.personality}
Role Style: ${roleStyle}

Workplace Scenario: "${scenario.title}" (${scenario.vietnameseTitle})
Scenario Context & Objective: ${scenario.objective}
Target TOEIC Level: ${scenario.targetScoreRange} (${scenario.level}, target score: ${targetScore}+)
Partner Name: ${userDisplayName}

YOUR TASK:
Generate a spontaneous, fresh, unique OPENING MESSAGE in character (2 to 3 sentences, around 25 to 50 words) to kickstart this conversation naturally.
- DO NOT just repeat the static initial phrase: "${scenario.initialMessage}".
- Create a distinct angle (e.g., dropping by the desk, a quick morning check-in, an urgent update, or catching up over coffee).
- Tone must align with ${character.role.toUpperCase()} and ${character.personality}.
- End with a direct question or prompt that encourages ${userDisplayName} to respond.
${scenario.suggestedVocabulary?.length ? `- If natural, include 1-2 keywords: ${scenario.suggestedVocabulary.slice(0, 4).join(', ')}` : ''}

RETURN FORMAT:
Return ONLY a valid JSON object (no markdown backticks, no other text):
{
  "english": "Opening lines in English here...",
  "vietnamese": "Natural Vietnamese translation here..."
}`;
}
