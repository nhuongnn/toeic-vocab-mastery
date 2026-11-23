import { buildRoleplaySystemPrompt, buildSuggestionsPrompt, buildDynamicOpeningPrompt } from './ai-prompt';
import {
  isGeminiConfigured,
  getGeminiModel,
  streamGemini,
  generateContentGemini,
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
import { getRandomOpeningVariation } from './scenarios';
import { canUseProvider, checkUserAIQuota, recordUserAIUsage } from '@/lib/ai/system-ai-settings';

export interface RoleplayChatPayload {
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  character: CharacterConfig;
  scenario: RoleplayScenario;
  userContext?: Partial<UserLearningContext>;
  providerPreference?: AIModelPreference;
  userId?: string;
  userEmail?: string;
  guestId?: string;
}

/**
 * Route streaming roleplay conversation with Hybrid Failover (Gemini -> Cloudflare)
 */
export async function* routeHybridRoleplayChat(
  payload: RoleplayChatPayload
): AsyncGenerator<StreamEvent, void, unknown> {
  const { messages, character, scenario, userContext, providerPreference = 'auto', userId, userEmail, guestId } = payload;
  const systemPrompt = buildRoleplaySystemPrompt(character, scenario, userContext);

  // 1. Check user and system-wide AI availability and quota
  const quotaCheck = await checkUserAIQuota({ userId, userEmail, guestId });
  if (!quotaCheck.allowed) {
    yield {
      type: 'error',
      message: quotaCheck.reason || 'Hạn mức AI hôm nay đã đạt giới hạn.',
      code: quotaCheck.code,
      limit: quotaCheck.limit,
      usedToday: quotaCheck.usedToday,
      isGuest: quotaCheck.isGuest,
    };
    yield { type: 'done' };
    return;
  }

  const canUseGemini = canUseProvider('gemini') && isGeminiConfigured();
  const canUseCloudflare = canUseProvider('cloudflare') && isCloudflareChatConfigured();

  // Cloudflare forced
  if (providerPreference === 'cloudflare') {
    if (!canUseCloudflare) {
      yield {
        type: 'error',
        message: !canUseProvider('cloudflare')
          ? 'Mô hình Cloudflare Workers AI hiện đang bị tạm tắt trong cấu hình hệ thống.'
          : 'Cloudflare Workers AI credentials missing in environment.',
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
      let recorded = false;
      for await (const chunk of streamCloudflare(messages, systemPrompt)) {
        if (!recorded) {
          recordUserAIUsage({ userId, userEmail, guestId, provider: 'cloudflare' });
          recorded = true;
        }
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
        message: !canUseProvider('gemini')
          ? 'Mô hình Google Gemini hiện đang bị tạm tắt trong cấu hình hệ thống.'
          : 'Google Gemini API key (GEMINI_API_KEY) is not configured.',
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
      let recorded = false;
      for await (const chunk of streamGemini(messages, systemPrompt)) {
        if (!recorded) {
          recordUserAIUsage({ userId, userEmail, guestId, provider: 'gemini' });
          recorded = true;
        }
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
        recordUserAIUsage({ userId, userEmail, guestId, provider: 'gemini' });

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
    } catch {
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
    const reason = canUseGemini
      ? 'Mô hình Gemini tạm thời không khả dụng, hệ thống đã tự động chuyển sang Cloudflare Llama dự phòng.'
      : !canUseProvider('gemini')
      ? 'Mô hình Gemini tạm tắt trong hệ thống, tự động sử dụng Cloudflare Llama.'
      : 'Chưa cấu hình GEMINI_API_KEY, tự động chuyển sang Cloudflare Llama dự phòng.';

    yield {
      type: 'meta',
      provider: 'cloudflare',
      model: getCloudflareChatModel(),
      fallback: true,
      reason,
    };

    try {
      let recorded = false;
      for await (const chunk of streamCloudflare(messages, systemPrompt)) {
        if (!recorded) {
          recordUserAIUsage({ userId, userEmail, guestId, provider: 'cloudflare' });
          recorded = true;
        }
        yield { type: 'content', text: chunk };
      }
    } catch (cfErr: unknown) {
      const msg = cfErr instanceof Error ? cfErr.message : String(cfErr);
      yield { type: 'error', message: `Cloudflare AI error: ${msg}`, provider: 'cloudflare' };
    }
  } else {
    yield {
      type: 'error',
      message: 'Không có mô hình AI nào khả dụng theo cấu hình hệ thống hiện tại.',
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
  targetScore: number = 650,
  providerPreference: AIModelPreference = 'auto',
  userInfo?: { userId?: string; userEmail?: string; guestId?: string }
): Promise<RoleplaySuggestion[]> {
  const quotaCheck = await checkUserAIQuota({
    userId: userInfo?.userId,
    userEmail: userInfo?.userEmail,
    guestId: userInfo?.guestId,
  });
  if (!quotaCheck.allowed) {
    return generateFallbackSuggestions(character, scenario, chatHistory);
  }

  const prompt = buildSuggestionsPrompt(character, scenario, chatHistory, targetScore);

  // Helper: call Gemini
  const callGemini = async (): Promise<RoleplaySuggestion[] | null> => {
    if (!canUseProvider('gemini') || !isGeminiConfigured()) return null;
    try {
      const text = await generateContentGemini({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          temperature: 0.5,
          responseMimeType: 'application/json',
        },
      });

      if (text) {
        const parsed = JSON.parse(cleanJsonString(text));
        if (Array.isArray(parsed) && parsed.length >= 2) {
          recordUserAIUsage({
            userId: userInfo?.userId,
            userEmail: userInfo?.userEmail,
            guestId: userInfo?.guestId,
            provider: 'gemini',
          });
          return parsed as RoleplaySuggestion[];
        }
      }
    } catch (e) {
      console.warn('[Roleplay Suggestions] Gemini generation failed:', e);
    }
    return null;
  };

  // Helper: call Cloudflare
  const callCloudflare = async (): Promise<RoleplaySuggestion[] | null> => {
    if (!canUseProvider('cloudflare') || !isCloudflareChatConfigured()) return null;
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
        recordUserAIUsage({
          userId: userInfo?.userId,
          userEmail: userInfo?.userEmail,
          guestId: userInfo?.guestId,
          provider: 'cloudflare',
        });
        return parsed as RoleplaySuggestion[];
      }
    } catch (e) {
      console.warn('[Roleplay Suggestions] Cloudflare generation failed:', e);
    }
    return null;
  };

  // 1. Force Cloudflare
  if (providerPreference === 'cloudflare') {
    const cfResult = await callCloudflare();
    if (cfResult) return cfResult;
    return generateFallbackSuggestions(character, scenario, chatHistory);
  }

  // 2. Force Gemini
  if (providerPreference === 'gemini') {
    const geminiResult = await callGemini();
    if (geminiResult) return geminiResult;
    return generateFallbackSuggestions(character, scenario, chatHistory);
  }

  // 3. Auto / Hybrid (Gemini -> Cloudflare -> Fallback)
  const geminiRes = await callGemini();
  if (geminiRes) return geminiRes;

  const cfRes = await callCloudflare();
  if (cfRes) return cfRes;

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
  const userTurnCount = chatHistory.filter((m) => m.role === 'user').length;
  const keyPhrases = scenario.keyPhrases || [];

  const kp1 = keyPhrases[userTurnCount % Math.max(keyPhrases.length, 1)];
  const kp2 = keyPhrases[(userTurnCount + 1) % Math.max(keyPhrases.length, 1)];
  const kp3 = keyPhrases[(userTurnCount + 2) % Math.max(keyPhrases.length, 1)];

  // Giai đoạn 0: Mở đầu cuộc trò chuyện (Lượt 1)
  if (userTurnCount === 0) {
    if (character.role === 'boss') {
      return [
        {
          id: `fallback-stage0-1`,
          type: 'formal',
          label: 'Trang trọng & Lịch sự',
          english: kp1?.phrase || 'Thank you for following up. We are actively working on this task and will share a detailed progress update shortly.',
          vietnamese: kp1?.meaning || 'Cảm ơn sếp đã theo sát. Chúng tôi đang tích cực xử lý nhiệm vụ này và sẽ gửi cập nhật tiến độ chi tiết sớm.',
          explanation: kp1?.usageTip || 'Mở đầu cuộc trao đổi chuyên nghiệp, thể hiện sự chủ động tiếp nhận công việc.',
          keyVocabulary: ['follow up', 'progress update'],
        },
        {
          id: `fallback-stage0-2`,
          type: 'casual',
          label: 'Tự nhiên & Trực diện',
          english: 'Good morning! Everything is currently moving forward as planned, and I am reviewing the preliminary numbers now.',
          vietnamese: 'Chào sếp buổi sáng! Mọi việc hiện vẫn đang tiến triển đúng kế hoạch, tôi đang rà soát lại các con số sơ bộ.',
          explanation: 'Báo cáo nhanh, tự nhiên và mang tính tích cực.',
          keyVocabulary: ['moving forward', 'preliminary'],
        },
        {
          id: `fallback-stage0-3`,
          type: 'clarifying',
          label: 'Hỏi để làm rõ kỳ vọng',
          english: kp2?.phrase || 'Could you please clarify if there are any specific criteria or priority areas you would like us to highlight?',
          vietnamese: kp2?.meaning || 'Sếp có thể làm rõ thêm tiêu chí cụ thể hoặc phần trọng tâm nào cần nhấn mạnh trước không ạ?',
          explanation: kp2?.usageTip || 'Hỏi rõ định hướng ngay từ đầu giúp tránh việc phải chỉnh sửa nhiều lần.',
          keyVocabulary: ['criteria', 'highlight'],
        },
      ];
    }

    if (character.role === 'colleague') {
      return [
        {
          id: `fallback-stage0-1`,
          type: 'formal',
          label: 'Chuyên nghiệp & Hợp tác',
          english: kp1?.phrase || 'I appreciate you bringing this up. Let us take a look at the current status together.',
          vietnamese: kp1?.meaning || 'Cảm ơn bạn đã trao đổi vấn đề này. Chúng ta cùng rà soát tình hình hiện tại nhé.',
          explanation: kp1?.usageTip || 'Lời đáp nhã nhặn, sẵn sàng phối hợp làm việc nhóm.',
          keyVocabulary: ['appreciate', 'status'],
        },
        {
          id: `fallback-stage0-2`,
          type: 'casual',
          label: 'Thân mật & Nhanh gọn',
          english: 'Hey! Thanks for pinging me. I was actually just about to message you regarding this matter.',
          vietnamese: 'Chào bạn! Cảm ơn bạn đã nhắn. Mình cũng đang tính nhắn tin cho bạn về việc này đây.',
          explanation: 'Tạo cảm giác gắn kết và thân mật nơi công sở.',
          keyVocabulary: ['ping', 'regarding'],
        },
        {
          id: `fallback-stage0-3`,
          type: 'clarifying',
          label: 'Hỏi để làm rõ chi tiết',
          english: kp2?.phrase || 'Could you send over the latest draft so we can ensure we are on the exact same page?',
          vietnamese: kp2?.meaning || 'Bạn có thể gửi bản thảo mới nhất để chúng ta đảm bảo đang hiểu cùng một ý không?',
          explanation: kp2?.usageTip || 'Thành ngữ "on the same page" rất phổ biến trong môi trường làm việc.',
          keyVocabulary: ['on the same page', 'draft'],
        },
      ];
    }

    // Staff role
    return [
      {
        id: `fallback-stage0-1`,
        type: 'formal',
        label: 'Lịch sự & Tận tình',
        english: kp1?.phrase || 'Certainly! Let me walk you through the key guidelines so you can proceed smoothly.',
        vietnamese: kp1?.meaning || 'Tất nhiên rồi! Để tôi hướng dẫn bạn các bước chính để bạn triển khai thuận lợi.',
        explanation: kp1?.usageTip || 'Phong thái hỗ trợ nhiệt tình và chuẩn mực.',
        keyVocabulary: ['guidelines', 'proceed'],
      },
      {
        id: `fallback-stage0-2`,
        type: 'casual',
        label: 'Tự nhiên & Khích lệ',
        english: 'No problem at all! Feel free to ask anytime if you run into any questions.',
        vietnamese: 'Không có vấn đề gì cả! Cứ thoải mái hỏi tôi bất kỳ lúc nào nếu bạn có thắc mắc nhé.',
        explanation: 'Khích lệ đối phương giao tiếp cởi mở.',
        keyVocabulary: ['feel free', 'run into'],
      },
      {
        id: `fallback-stage0-3`,
        type: 'clarifying',
        label: 'Hỏi để làm rõ nhu cầu',
        english: kp2?.phrase || 'Do you have the necessary documentation, or would you like me to share the link first?',
        vietnamese: kp2?.meaning || 'Bạn đã có tài liệu cần thiết chưa, hay để tôi gửi đường dẫn trước?',
        explanation: kp2?.usageTip || 'Chủ động kiểm tra điều kiện cần thiết.',
        keyVocabulary: ['documentation', 'share'],
      },
    ];
  }

  // Giai đoạn 1: Giữa cuộc hội thoại (Đàm phán / Đưa giải pháp / Thảo luận chi tiết)
  if (userTurnCount === 1) {
    if (character.role === 'boss') {
      return [
        {
          id: `fallback-stage1-1`,
          type: 'formal',
          label: 'Đề xuất giải pháp trang trọng',
          english: kp2?.phrase || 'Based on our current findings, I would like to propose a slight adjustment to the timeline to maintain high quality.',
          vietnamese: kp2?.meaning || 'Dựa trên tình hình thực tế, tôi xin đề xuất điều chỉnh nhẹ mốc thời gian để đảm bảo chất lượng cao nhất.',
          explanation: kp2?.usageTip || 'Cách đề xuất điều chỉnh kế hoạch có tính thuyết phục cao.',
          keyVocabulary: ['propose', 'adjustment', 'timeline'],
        },
        {
          id: `fallback-stage1-2`,
          type: 'casual',
          label: 'Thẳng thắn & Trực diện',
          english: 'We have resolved the main roadblock. If we focus on the core deliverables first, we will definitely meet the standard.',
          vietnamese: 'Chúng tôi đã giải quyết xong vướng mắc chính. Nếu ưu tiên hoàn thành phần cốt lõi trước, chắc chắn sẽ đạt chuẩn.',
          explanation: 'Nhấn mạnh vào hành động cụ thể để tạo sự tin tưởng.',
          keyVocabulary: ['roadblock', 'deliverables'],
        },
        {
          id: `fallback-stage1-3`,
          type: 'clarifying',
          label: 'Hỏi ý kiến chỉ đạo tiếp theo',
          english: kp3?.phrase || 'Would you prefer that we submit an interim summary by tomorrow afternoon for your review?',
          vietnamese: kp3?.meaning || 'Sếp có muốn chúng tôi nộp một bản tóm tắt giữa kỳ vào chiều mai để sếp xem qua trước không ạ?',
          explanation: kp3?.usageTip || 'Đề xuất nộp bản tóm tắt trung gian để sếp an tâm.',
          keyVocabulary: ['interim summary', 'review'],
        },
      ];
    }

    if (character.role === 'colleague') {
      return [
        {
          id: `fallback-stage1-1`,
          type: 'formal',
          label: 'Phân chia nhiệm vụ chuyên nghiệp',
          english: kp2?.phrase || 'I can take charge of the initial draft if you could assist with verifying the data points.',
          vietnamese: kp2?.meaning || 'Mình có thể phụ trách phần bản thảo ban đầu nếu bạn có thể hỗ trợ xác thực số liệu.',
          explanation: kp2?.usageTip || 'Cụm "take charge of" thể hiện tinh thần chủ động gánh vác.',
          keyVocabulary: ['take charge of', 'verify'],
        },
        {
          id: `fallback-stage1-2`,
          type: 'casual',
          label: 'Đồng thuận & Thúc đẩy',
          english: 'That sounds like a solid plan. Let us split the tasks so we can wrap this up before the end of the day.',
          vietnamese: 'Kế hoạch đó nghe rất ổn. Chúng mình chia nhau làm để kịp hoàn tất trước khi hết ngày nhé.',
          explanation: 'Kêu gọi hành động nhanh gọn, ăn ý.',
          keyVocabulary: ['solid plan', 'wrap up'],
        },
        {
          id: `fallback-stage1-3`,
          type: 'clarifying',
          label: 'Hỏi để thống nhất phương án',
          english: kp3?.phrase || 'Which section do you think requires the most attention before we present it to the team?',
          vietnamese: kp3?.meaning || 'Theo bạn thì phần nào cần được chú trọng nhất trước khi chúng mình thuyết trình trước cả nhóm?',
          explanation: kp3?.usageTip || 'Hỏi ý kiến đối tác để tối ưu hóa kết quả làm việc nhóm.',
          keyVocabulary: ['requires attention'],
        },
      ];
    }

    // Staff role
    return [
      {
        id: `fallback-stage1-1`,
        type: 'formal',
        label: 'Báo cáo & Hướng dẫn cụ thể',
        english: kp2?.phrase || 'I have compiled all the relevant records and attached the reference notes for your convenience.',
        vietnamese: kp2?.meaning || 'Tôi đã tổng hợp mọi hồ sơ liên quan và đính kèm ghi chú tham khảo để bạn tiện theo dõi.',
        explanation: kp2?.usageTip || 'Sử dụng cụm "for your convenience" trong giao tiếp chuyên nghiệp.',
        keyVocabulary: ['compiled', 'convenience'],
      },
      {
        id: `fallback-stage1-2`,
        type: 'casual',
        label: 'Hỗ trợ thân thiện',
        english: 'Everything is set up on the system now. You can test it out, and I will be right here if anything pops up.',
        vietnamese: 'Mọi thứ đã được thiết lập trên hệ thống rồi. Bạn cứ thử nghiệm xem, có vấn đề gì tôi sẽ hỗ trợ ngay.',
        explanation: 'Cam kết hỗ trợ tức thì tạo sự an tâm.',
        keyVocabulary: ['set up', 'pops up'],
      },
      {
        id: `fallback-stage1-3`,
        type: 'clarifying',
        label: 'Hỏi để kiểm tra tiến trình',
        english: kp3?.phrase || 'Does this arrangement meet your expectations, or should we modify any specific step?',
        vietnamese: kp3?.meaning || 'Cách sắp xếp này đã đúng kỳ vọng của bạn chưa, hay chúng ta cần chỉnh sửa bước nào không?',
        explanation: kp3?.usageTip || 'Lắng nghe phản hồi để hoàn thiện nhiệm vụ.',
        keyVocabulary: ['expectations', 'modify'],
      },
    ];
  }

  // Giai đoạn 2 trở đi: Hướng tới kết thúc cuộc hội thoại (Chốt thỏa thuận & Hành động tiếp theo)
  if (character.role === 'boss') {
    return [
      {
        id: `fallback-stage2-1`,
        type: 'formal',
        label: 'Cam kết hoàn thành & Chốt kế hoạch',
        english: kp3?.phrase || 'Thank you for your guidance. I will incorporate your feedback and deliver the finalized version on schedule.',
        vietnamese: kp3?.meaning || 'Cảm ơn sự chỉ đạo của sếp. Tôi sẽ tiếp thu ý kiến đóng góp và bàn giao bản hoàn thiện đúng hạn.',
        explanation: kp3?.usageTip || 'Cụm từ đắt giá để kết thúc trao đổi với cấp trên một cách trọn vẹn.',
        keyVocabulary: ['incorporate feedback', 'finalized'],
      },
      {
        id: `fallback-stage2-2`,
        type: 'casual',
        label: 'Xác nhận tự tin',
        english: 'Understood! I will get on this right away and keep you posted on our progress.',
        vietnamese: 'Tôi đã rõ! Tôi sẽ bắt tay vào việc ngay và liên tục cập nhật tiến độ cho sếp.',
        explanation: '"Keep someone posted" là cách diễn đạt phổ biến để hứa sẽ cập nhật thông tin.',
        keyVocabulary: ['get on this', 'keep you posted'],
      },
      {
        id: `fallback-stage2-3`,
        type: 'clarifying',
        label: 'Xác nhận bước kiểm tra cuối cùng',
        english: 'Should I notify the department head directly once the document is uploaded to the shared drive?',
        vietnamese: 'Tôi có cần thông báo trực tiếp cho trưởng bộ phận ngay khi tài liệu được tải lên thư mục chung không ạ?',
        explanation: 'Xác nhận quy trình thông báo nội bộ trước khi hoàn tất.',
        keyVocabulary: ['notify', 'shared drive'],
      },
    ];
  }

  if (character.role === 'colleague') {
    return [
      {
        id: `fallback-stage2-1`,
        type: 'formal',
        label: 'Chốt thỏa thuận & Cảm ơn',
        english: kp3?.phrase || 'Perfect, we have reached a clear agreement. I will send out a brief summary email to document our next steps.',
        vietnamese: kp3?.meaning || 'Tuyệt vời, chúng ta đã thống nhất rõ ràng. Mình sẽ gửi một email tóm tắt ngắn để lưu lại các bước tiếp theo.',
        explanation: kp3?.usageTip || 'Thói quen chuyên nghiệp: gửi email xác nhận sau khi thỏa thuận miệng.',
        keyVocabulary: ['agreement', 'document'],
      },
      {
        id: `fallback-stage2-2`,
        type: 'casual',
        label: 'Thân mật & Động viên',
        english: 'Awesome teamwork! I really appreciate your help in getting this sorted out so quickly.',
        vietnamese: 'Phối hợp quá tuyệt vời! Rất cảm ơn sự hỗ trợ của bạn để xử lý việc này nhanh gọn như vậy.',
        explanation: 'Ghi nhận đóng góp của đồng nghiệp, duy trì mối quan hệ tốt.',
        keyVocabulary: ['teamwork', 'sorted out'],
      },
      {
        id: `fallback-stage2-3`,
        type: 'clarifying',
        label: 'Hỏi về thời điểm kiểm tra lại',
        english: 'Shall we touch base again tomorrow morning just to make sure everything went through properly?',
        vietnamese: 'Sáng mai chúng mình trao đổi nhanh lại một chút để đảm bảo mọi thứ đã được gửi đi ổn thỏa chứ?',
        explanation: '"Touch base" là cụm từ kinh điển nơi công sở mang nghĩa liên lạc/nói chuyện ngắn.',
        keyVocabulary: ['touch base', 'properly'],
      },
    ];
  }

  // Staff role - Stage 2+
  return [
    {
      id: `fallback-stage2-1`,
      type: 'formal',
      label: 'Xác nhận hoàn tất chu đáo',
      english: kp3?.phrase || 'Everything is now in order. Please let me know if you require any additional assistance going forward.',
      vietnamese: kp3?.meaning || 'Mọi thứ hiện đã hoàn tất ổn thỏa. Xin vui lòng cho tôi biết nếu bạn cần thêm bất kỳ sự trợ giúp nào tiếp theo.',
      explanation: kp3?.usageTip || 'Kết thúc cuộc đối thoại với thái độ phục vụ tận tụy.',
      keyVocabulary: ['in order', 'additional assistance'],
    },
    {
      id: `fallback-stage2-2`,
      type: 'casual',
      label: 'Tự nhiên & Thân thiện',
      english: 'Glad I could help! Good luck with the task, and just give me a shout if you need anything else.',
      vietnamese: 'Rất vui vì đã hỗ trợ được bạn! Chúc bạn hoàn thành tốt nhiệm vụ, cần gì cứ gọi tôi nhé.',
      explanation: '"Give someone a shout" là cách nói tự nhiên thể hiện sẵn sàng hỗ trợ.',
      keyVocabulary: ['give a shout', 'glad I could help'],
    },
    {
      id: `fallback-stage2-3`,
      type: 'clarifying',
      label: 'Hỏi xác nhận hài lòng',
      english: 'Is there any other pending matter we can help you take care of today?',
      vietnamese: 'Còn vấn đề nào còn tồn đọng mà chúng tôi có thể giúp bạn giải quyết hôm nay nữa không?',
      explanation: 'Hỏi thêm trước khi kết thúc để đảm bảo không bỏ sót việc.',
      keyVocabulary: ['pending matter', 'take care of'],
    },
  ];
}

/**
 * Generate a dynamic, spontaneous opening sentence for the character and scenario.
 * Tries Gemini Flash -> Cloudflare Llama -> Heuristic Fallback Variations.
 */
export async function generateDynamicOpening(
  character: CharacterConfig,
  scenario: RoleplayScenario,
  userContext?: Partial<UserLearningContext>,
  userName?: string,
  providerPreference: AIModelPreference = 'auto',
  userInfo?: { userId?: string; userEmail?: string; guestId?: string }
): Promise<{ english: string; vietnamese: string; source: 'gemini' | 'cloudflare' | 'fallback' }> {
  const quotaCheck = await checkUserAIQuota({
    userId: userInfo?.userId,
    userEmail: userInfo?.userEmail,
    guestId: userInfo?.guestId,
  });
  if (!quotaCheck.allowed) {
    return generateFallbackOpening(character, scenario, userName);
  }

  const prompt = buildDynamicOpeningPrompt(character, scenario, userContext, userName);

  // Helper: call Gemini
  const callGemini = async (): Promise<{ english: string; vietnamese: string; source: 'gemini' } | null> => {
    if (!canUseProvider('gemini') || !isGeminiConfigured()) return null;
    try {
      const text = await generateContentGemini({
        contents: prompt,
        config: {
          temperature: 0.85,
          responseMimeType: 'application/json',
        },
      });

      if (text) {
        const parsed = JSON.parse(cleanJsonString(text));
        if (parsed.english && parsed.vietnamese) {
          recordUserAIUsage({
            userId: userInfo?.userId,
            userEmail: userInfo?.userEmail,
            guestId: userInfo?.guestId,
            provider: 'gemini',
          });
          return {
            english: parsed.english.trim(),
            vietnamese: parsed.vietnamese.trim(),
            source: 'gemini',
          };
        }
      }
    } catch (e) {
      console.warn('[Roleplay Dynamic Opening] Gemini generation failed:', e);
    }
    return null;
  };

  // Helper: call Cloudflare
  const callCloudflare = async (): Promise<{ english: string; vietnamese: string; source: 'cloudflare' } | null> => {
    if (!canUseProvider('cloudflare') || !isCloudflareChatConfigured()) return null;
    try {
      let accumulated = '';
      for await (const chunk of streamCloudflare(
        [{ role: 'user', content: prompt }],
        'You are an expert TOEIC roleplay tutor. Output valid raw JSON object only without markdown backticks.'
      )) {
        accumulated += chunk;
      }
      const parsed = JSON.parse(cleanJsonString(accumulated));
      if (parsed.english && parsed.vietnamese) {
        recordUserAIUsage({
          userId: userInfo?.userId,
          userEmail: userInfo?.userEmail,
          guestId: userInfo?.guestId,
          provider: 'cloudflare',
        });
        return {
          english: parsed.english.trim(),
          vietnamese: parsed.vietnamese.trim(),
          source: 'cloudflare',
        };
      }
    } catch (e) {
      console.warn('[Roleplay Dynamic Opening] Cloudflare generation failed:', e);
    }
    return null;
  };

  // 1. Force Cloudflare
  if (providerPreference === 'cloudflare') {
    const cfRes = await callCloudflare();
    if (cfRes) return cfRes;
    return generateFallbackOpening(character, scenario, userName);
  }

  // 2. Force Gemini
  if (providerPreference === 'gemini') {
    const geminiRes = await callGemini();
    if (geminiRes) return geminiRes;
    return generateFallbackOpening(character, scenario, userName);
  }

  // 3. Auto / Hybrid
  const geminiResult = await callGemini();
  if (geminiResult) return geminiResult;

  const cfResult = await callCloudflare();
  if (cfResult) return cfResult;

  // Fallback
  return generateFallbackOpening(character, scenario, userName);
}

export function generateFallbackOpening(
  character: CharacterConfig,
  scenario: RoleplayScenario,
  userName?: string
): { english: string; vietnamese: string; source: 'fallback' } {
  const variation = getRandomOpeningVariation(character, scenario, userName);
  return {
    english: variation.english,
    vietnamese: variation.vietnamese,
    source: 'fallback',
  };
}
