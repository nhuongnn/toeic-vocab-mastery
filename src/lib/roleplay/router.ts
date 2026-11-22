import { buildRoleplaySystemPrompt, buildSuggestionsPrompt } from './ai-prompt';
import {
  isGeminiConfigured,
  getGeminiModel,
  streamGemini,
} from '@/lib/ai/gemini-provider';
import {
  isCloudflareChatConfigured,
  getCloudflareChatModel,
  streamCloudflare,
} from '@/lib/ai/cloudflare-provider';
import { StreamEvent, AIModelPreference } from '@/lib/ai/types';
import {
  CharacterConfig,
  RoleplayScenario,
  UserLearningContext,
  RoleplaySuggestion,
} from '@/types/roleplay';
import { GoogleGenAI } from '@google/genai';

export interface RoleplayChatPayload {
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  character: CharacterConfig;
  scenario: RoleplayScenario;
  userContext?: Partial<UserLearningContext>;
  providerPreference?: AIModelPreference;
}

/**
 * Route streaming roleplay conversation with Hybrid Failover (Gemini -> Cloudflare)
 */
export async function* routeHybridRoleplayChat(
  payload: RoleplayChatPayload
): AsyncGenerator<StreamEvent, void, unknown> {
  const { messages, character, scenario, userContext, providerPreference = 'auto' } = payload;
  const systemPrompt = buildRoleplaySystemPrompt(character, scenario, userContext);

  const canUseGemini = isGeminiConfigured();
  const canUseCloudflare = isCloudflareChatConfigured();

  // Cloudflare forced
  if (providerPreference === 'cloudflare') {
    if (!canUseCloudflare) {
      yield {
        type: 'error',
        message: 'Cloudflare Workers AI credentials missing in environment.',
        provider: 'cloudflare',
      };
      yield { type: 'done' };
      return;
    }

    yield {
      type: 'meta',
      provider: 'cloudflare',
      model: getCloudflareChatModel(),
      fallback: false,
    };

    try {
      for await (const chunk of streamCloudflare(messages, systemPrompt)) {
        yield { type: 'content', text: chunk };
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      yield { type: 'error', message: msg, provider: 'cloudflare' };
    }
    yield { type: 'done' };
    return;
  }

  // Gemini forced
  if (providerPreference === 'gemini') {
    if (!canUseGemini) {
      yield {
        type: 'error',
        message: 'Google Gemini API key (GEMINI_API_KEY) is not configured.',
        provider: 'gemini',
      };
      yield { type: 'done' };
      return;
    }

    yield {
      type: 'meta',
      provider: 'gemini',
      model: getGeminiModel(),
      fallback: false,
    };

    try {
      for await (const chunk of streamGemini(messages, systemPrompt)) {
        yield { type: 'content', text: chunk };
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      yield { type: 'error', message: msg, provider: 'gemini' };
    }
    yield { type: 'done' };
    return;
  }

  // AUTO / HYBRID: Gemini primary -> Cloudflare fallback
  if (canUseGemini) {
    let geminiStartedYielding = false;
    try {
      const geminiGen = streamGemini(messages, systemPrompt);
      const first = await geminiGen.next();

      if (!first.done && first.value) {
        geminiStartedYielding = true;
        yield {
          type: 'meta',
          provider: 'gemini',
          model: getGeminiModel(),
          fallback: false,
        };
        yield { type: 'content', text: first.value };

        for await (const chunk of geminiGen) {
          yield { type: 'content', text: chunk };
        }
        yield { type: 'done' };
        return;
      }
    } catch (geminiError) {
      console.warn('[Roleplay Router] Gemini primary failed, falling back to Cloudflare...');
      if (geminiStartedYielding) {
        yield {
          type: 'error',
          message: 'Connection interrupted during Gemini streaming',
          provider: 'gemini',
        };
        yield { type: 'done' };
        return;
      }
    }
  }

  // Fallback to Cloudflare
  if (canUseCloudflare) {
    yield {
      type: 'meta',
      provider: 'cloudflare',
      model: getCloudflareChatModel(),
      fallback: true,
      reason: 'Gemini unavailable, switching to Cloudflare Llama',
    };

    try {
      for await (const chunk of streamCloudflare(messages, systemPrompt)) {
        yield { type: 'content', text: chunk };
      }
    } catch (cfErr: unknown) {
      const msg = cfErr instanceof Error ? cfErr.message : String(cfErr);
      yield { type: 'error', message: `Cloudflare AI error: ${msg}`, provider: 'cloudflare' };
    }
  } else {
    yield {
      type: 'error',
      message: 'Hệ thống AI chưa được cấu hình GEMINI_API_KEY hoặc Cloudflare credentials.',
    };
  }

  yield { type: 'done' };
}

/**
 * Generate 3 contextual communication suggestions (strictly on demand)
 */
export async function generateRoleplaySuggestions(
  character: CharacterConfig,
  scenario: RoleplayScenario,
  chatHistory: Array<{ role: 'user' | 'assistant'; content: string }>,
  targetScore: number = 650
): Promise<RoleplaySuggestion[]> {
  const prompt = buildSuggestionsPrompt(character, scenario, chatHistory, targetScore);

  // 1. Try Gemini first
  if (isGeminiConfigured()) {
    try {
      const apiKey =
        process.env.GEMINI_API_KEY?.trim() ||
        process.env.GOOGLE_API_KEY?.trim() ||
        process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim() ||
        '';

      const ai = new GoogleGenAI({ apiKey });
      const model = getGeminiModel();

      const response = await ai.models.generateContent({
        model,
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          temperature: 0.5,
          responseMimeType: 'application/json',
        },
      });

      const text = response.text?.trim();
      if (text) {
        const parsed = JSON.parse(cleanJsonString(text));
        if (Array.isArray(parsed) && parsed.length >= 2) {
          return parsed as RoleplaySuggestion[];
        }
      }
    } catch (e) {
      console.warn('[Roleplay Suggestions] Gemini generation failed, trying Cloudflare...', e);
    }
  }

  // 2. Try Cloudflare Workers AI if Gemini fails
  if (isCloudflareChatConfigured()) {
    try {
      let accumulated = '';
      for await (const chunk of streamCloudflare(
        [{ role: 'user', content: prompt }],
        'You are an expert TOEIC tutor. Output valid raw JSON array only without markdown backticks.'
      )) {
        accumulated += chunk;
      }
      const parsed = JSON.parse(cleanJsonString(accumulated));
      if (Array.isArray(parsed) && parsed.length >= 2) {
        return parsed as RoleplaySuggestion[];
      }
    } catch (e) {
      console.warn('[Roleplay Suggestions] Cloudflare generation also failed:', e);
    }
  }

  // 3. Fallback: Generate smart heuristic suggestions from scenario keyPhrases
  return generateFallbackSuggestions(character, scenario, chatHistory);
}

function cleanJsonString(str: string): string {
  let cleaned = str.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3);
  }
  return cleaned.trim();
}

function generateFallbackSuggestions(
  character: CharacterConfig,
  scenario: RoleplayScenario,
  chatHistory: Array<{ role: 'user' | 'assistant'; content: string }>
): RoleplaySuggestion[] {
  const kp1 = scenario.keyPhrases[0];
  const kp2 = scenario.keyPhrases[1];
  const kp3 = scenario.keyPhrases[2];

  if (character.role === 'boss') {
    return [
      {
        id: 'fallback-1',
        type: 'formal',
        label: 'Trang trọng & Lịch sự',
        english: kp1?.phrase || 'Thank you for following up. We are currently finalizing the key details and will deliver the complete report shortly.',
        vietnamese: kp1?.meaning || 'Cảm ơn sếp đã nhắc nhở. Chúng tôi hiện đang hoàn tất các chi tiết then chốt và sẽ nộp bản báo cáo đầy đủ sớm.',
        explanation: kp1?.usageTip || 'Cách phản hồi chuyên nghiệp, thể hiện sự chủ động và trách nhiệm trong công việc.',
        keyVocabulary: ['finalize', 'deliverable'],
      },
      {
        id: 'fallback-2',
        type: 'casual',
        label: 'Tự nhiên & Trực diện',
        english: 'Everything is progressing well according to schedule. Could I check if you have any specific focus points for this version?',
        vietnamese: 'Mọi việc đang tiến triển rất tốt theo đúng kế hoạch. Sếp có lưu ý cụ thể nào cho phiên bản lần này không ạ?',
        explanation: 'Khéo léo cập nhật tiến độ đồng thời hỏi thăm yêu cầu của cấp trên.',
        keyVocabulary: ['schedule', 'focus points'],
      },
      {
        id: 'fallback-3',
        type: 'clarifying',
        label: 'Hỏi để làm rõ thông tin',
        english: kp2?.phrase || 'Could you please confirm whether we should prioritize the financial metrics or the qualitative analysis first?',
        vietnamese: kp2?.meaning || 'Sếp có thể xác nhận lại giúp tôi nên ưu tiên phần số liệu tài chính hay phần phân tích định tính trước không ạ?',
        explanation: kp2?.usageTip || 'Hỏi rõ ràng giúp bạn tiết kiệm thời gian và đảm bảo sản phẩm đúng kỳ vọng của sếp.',
        keyVocabulary: ['prioritize', 'confirm'],
      },
    ];
  }

  if (character.role === 'colleague') {
    return [
      {
        id: 'fallback-1',
        type: 'formal',
        label: 'Chuyên nghiệp & Hợp tác',
        english: kp1?.phrase || 'I agree with your suggestion. Let us schedule a quick 15-minute sync this afternoon to finalize the details.',
        vietnamese: kp1?.meaning || 'Mình hoàn toàn đồng ý với gợi ý của bạn. Chiều nay chúng ta cùng hẹn nhanh 15 phút để chốt chi tiết nhé.',
        explanation: kp1?.usageTip || 'Đề xuất giải pháp hành động cụ thể và thể hiện tinh thần làm việc nhóm.',
        keyVocabulary: ['schedule', 'sync', 'finalize'],
      },
      {
        id: 'fallback-2',
        type: 'casual',
        label: 'Thân mật & Nhanh gọn',
        english: 'Sounds great! I can take care of this part right away. Just ping me if you need any extra support.',
        vietnamese: 'Tuyệt vời luôn! Mình có thể xử lý phần này ngay bây giờ. Cần hỗ trợ gì cứ nhắn tin cho mình nhé.',
        explanation: 'Cách diễn đạt tự nhiên và thân thiện giữa các đồng nghiệp thân thiết.',
        keyVocabulary: ['take care of', 'ping me'],
      },
      {
        id: 'fallback-3',
        type: 'clarifying',
        label: 'Hỏi để làm rõ chi tiết',
        english: kp2?.phrase || 'Could you send over the latest spreadsheet so I can make sure we are looking at the exact same figures?',
        vietnamese: kp2?.meaning || 'Bạn có thể gửi file dữ liệu mới nhất để mình kiểm tra xem hai đứa có đang nhìn cùng số liệu không nhé?',
        explanation: kp2?.usageTip || 'Xác nhận tài liệu giúp giảm thiểu sai sót khi phối hợp công việc.',
        keyVocabulary: ['spreadsheet', 'figures'],
      },
    ];
  }

  // Staff / Junior role
  return [
    {
      id: 'fallback-1',
      type: 'formal',
      label: 'Lịch sự & Tận tình',
      english: kp1?.phrase || 'Certainly! Let me walk you through the standard operating procedure so you can handle it smoothly.',
      vietnamese: kp1?.meaning || 'Tất nhiên rồi! Để tôi hướng dẫn bạn qua quy trình chuẩn để bạn có thể thực hiện một cách trôi chảy.',
      explanation: kp1?.usageTip || 'Thái độ hỗ trợ tích cực, ân cần của tiền bối hoặc cấp trên.',
      keyVocabulary: ['standard operating procedure', 'smoothly'],
    },
    {
      id: 'fallback-2',
      type: 'casual',
      label: 'Tự nhiên & Khích lệ',
      english: 'Don’t worry about making mistakes at first. Feel free to reach out to me anytime you encounter any roadblocks.',
      vietnamese: 'Mới đầu đừng lo lắng về việc mắc lỗi nhé. Cứ thoải mái liên hệ với tôi bất cứ khi nào bạn gặp khó khăn.',
      explanation: 'Tạo tâm lý thoải mái và gắn kết cho nhân viên mới.',
      keyVocabulary: ['feel free', 'roadblocks'],
    },
    {
      id: 'fallback-3',
      type: 'clarifying',
      label: 'Hỏi để làm rõ nhu cầu',
      english: kp2?.phrase || 'Do you have the necessary system credentials, or do we need to contact IT to set up your access first?',
      vietnamese: kp2?.meaning || 'Bạn đã có tài khoản hệ thống chưa, hay chúng ta cần liên hệ IT để cấp quyền truy cập trước?',
      explanation: kp2?.usageTip || 'Kiểm tra tiền đề giúp giải quyết vấn đề từ gốc rễ.',
      keyVocabulary: ['credentials', 'access'],
    },
  ];
}
