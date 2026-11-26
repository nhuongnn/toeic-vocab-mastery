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
  isAutoProactive?: boolean;
  userId?: string;
  userEmail?: string;
  guestId?: string;
}

export interface RoleplaySuggestionsResult {
  suggestions: RoleplaySuggestion[];
  provider: 'gemini' | 'cloudflare' | 'fallback';
  model?: string;
  isFallback: boolean;
  fallbackReason?: string;
}

/**
 * Route streaming roleplay conversation with Hybrid Failover (Gemini <-> Cloudflare)
 */
export async function* routeHybridRoleplayChat(
  payload: RoleplayChatPayload
): AsyncGenerator<StreamEvent, void, unknown> {
  const { messages, character, scenario, userContext, providerPreference = 'auto', isAutoProactive = false, userId, userEmail, guestId } = payload;
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

  // Cloudflare preferred
  if (providerPreference === 'cloudflare') {
    if (!canUseCloudflare) {
      if (canUseGemini) {
        yield {
          type: 'meta',
          provider: 'gemini',
          model: getGeminiModel(),
          fallback: true,
          reason: 'Cloudflare Workers AI chưa sẵn sàng, tự động chuyển sang Gemini dự phòng.',
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

    let cfStartedYielding = false;
    try {
      const cfGen = streamCloudflare(messages, systemPrompt);
      const first = await cfGen.next();
      if (!first.done && first.value) {
        cfStartedYielding = true;
        recordUserAIUsage({ userId, userEmail, guestId, provider: 'cloudflare' });
        yield {
          type: 'meta',
          provider: 'cloudflare',
          model: getCloudflareChatModel(),
          fallback: false,
        };
        yield { type: 'content', text: first.value };
        for await (const chunk of cfGen) {
          yield { type: 'content', text: chunk };
        }
        yield { type: 'done' };
        return;
      }
    } catch (cfErr: unknown) {
      console.warn('[Roleplay Router] Cloudflare preferred failed:', cfErr);
      if (cfStartedYielding) {
        yield {
          type: 'error',
          message: 'Connection interrupted during Cloudflare streaming',
          provider: 'cloudflare',
        };
        yield { type: 'done' };
        return;
      }
      // Fallback to Gemini if Cloudflare failed before streaming
      if (canUseGemini) {
        yield {
          type: 'meta',
          provider: 'gemini',
          model: getGeminiModel(),
          fallback: true,
          reason: 'Cloudflare Workers AI gặp lỗi, hệ thống tự động chuyển sang Google Gemini dự phòng.',
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
          yield { type: 'done' };
          return;
        } catch (geminiErr: unknown) {
          const msg = geminiErr instanceof Error ? geminiErr.message : String(geminiErr);
          console.warn('[Roleplay Router] Both Cloudflare and Gemini failed:', msg);
          const fallbackText = generateFallbackRoleplayReply(character, scenario, messages, isAutoProactive);
          yield {
            type: 'meta',
            provider: 'gemini',
            model: 'contingency-engine',
            fallback: true,
            reason: `Dịch vụ AI trực tuyến tạm gián đoạn (${msg}). Hệ thống tự động kích hoạt phản hồi tình huống dự phòng.`,
          };
          yield { type: 'content', text: fallbackText };
          yield { type: 'done' };
          return;
        }
      }
      const msg = cfErr instanceof Error ? cfErr.message : String(cfErr);
      console.warn('[Roleplay Router] Cloudflare failed and Gemini unavailable:', msg);
      const fallbackText = generateFallbackRoleplayReply(character, scenario, messages, isAutoProactive);
      yield {
        type: 'meta',
        provider: 'cloudflare',
        model: 'contingency-engine',
        fallback: true,
        reason: `Mô hình Cloudflare gặp sự cố (${msg}). Tự động phản hồi theo kịch bản tình huống.`,
      };
      yield { type: 'content', text: fallbackText };
      yield { type: 'done' };
      return;
    }
  }

  // Gemini preferred
  if (providerPreference === 'gemini') {
    if (!canUseGemini) {
      if (canUseCloudflare) {
        yield {
          type: 'meta',
          provider: 'cloudflare',
          model: getCloudflareChatModel(),
          fallback: true,
          reason: 'Google Gemini chưa sẵn sàng, tự động chuyển sang Cloudflare Workers AI dự phòng.',
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
          const fallbackText = generateFallbackRoleplayReply(character, scenario, messages, isAutoProactive);
          yield {
            type: 'meta',
            provider: 'cloudflare',
            model: 'contingency-engine',
            fallback: true,
            reason: `Cả Gemini và Cloudflare đều gặp sự cố (${msg}). Tự động phản hồi theo kịch bản tình huống.`,
          };
          yield { type: 'content', text: fallbackText };
        }
        yield { type: 'done' };
        return;
      }
      const fallbackText = generateFallbackRoleplayReply(character, scenario, messages, isAutoProactive);
      yield {
        type: 'meta',
        provider: 'gemini',
        model: 'contingency-engine',
        fallback: true,
        reason: 'Mô hình Google Gemini chưa sẵn sàng. Tự động phản hồi theo kịch bản tình huống.',
      };
      yield { type: 'content', text: fallbackText };
      yield { type: 'done' };
      return;
    }

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
    } catch (geminiErr: unknown) {
      console.warn('[Roleplay Router] Gemini preferred failed, falling back to Cloudflare...', geminiErr);
      if (geminiStartedYielding) {
        yield {
          type: 'error',
          message: 'Connection interrupted during Gemini streaming',
          provider: 'gemini',
        };
        yield { type: 'done' };
        return;
      }
      // Fallback to Cloudflare if Gemini failed before streaming (e.g. 503 high demand or 429 quota)
      if (canUseCloudflare) {
        yield {
          type: 'meta',
          provider: 'cloudflare',
          model: getCloudflareChatModel(),
          fallback: true,
          reason: 'Google Gemini đang tạm quá tải (503/429), hệ thống tự động chuyển sang Cloudflare Workers AI dự phòng.',
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
          yield { type: 'done' };
          return;
        } catch (cfErr: unknown) {
          const msg = cfErr instanceof Error ? cfErr.message : String(cfErr);
          console.warn('[Roleplay Router] Both Gemini and Cloudflare failed:', msg);
          const fallbackText = generateFallbackRoleplayReply(character, scenario, messages, isAutoProactive);
          yield {
            type: 'meta',
            provider: 'cloudflare',
            model: 'contingency-engine',
            fallback: true,
            reason: `Cả Gemini và Cloudflare đều gặp sự cố (${msg}). Tự động phản hồi theo kịch bản tình huống.`,
          };
          yield { type: 'content', text: fallbackText };
          yield { type: 'done' };
          return;
        }
      }
      const msg = geminiErr instanceof Error ? geminiErr.message : String(geminiErr);
      console.warn('[Roleplay Router] Gemini failed and Cloudflare unavailable:', msg);
      const fallbackText = generateFallbackRoleplayReply(character, scenario, messages, isAutoProactive);
      yield {
        type: 'meta',
        provider: 'gemini',
        model: 'contingency-engine',
        fallback: true,
        reason: `Mô hình Gemini gặp sự cố (${msg}). Tự động phản hồi theo kịch bản tình huống.`,
      };
      yield { type: 'content', text: fallbackText };
      yield { type: 'done' };
      return;
    }
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
      const fallbackText = generateFallbackRoleplayReply(character, scenario, messages, isAutoProactive);
      yield {
        type: 'meta',
        provider: 'cloudflare',
        model: 'contingency-engine',
        fallback: true,
        reason: `Mô hình AI gặp sự cố (${msg}). Tự động phản hồi theo kịch bản tình huống.`,
      };
      yield { type: 'content', text: fallbackText };
    }
  } else {
    const fallbackText = generateFallbackRoleplayReply(character, scenario, messages, isAutoProactive);
    yield {
      type: 'meta',
      provider: 'cloudflare',
      model: 'contingency-engine',
      fallback: true,
      reason: 'Không có mô hình AI trực tuyến. Tự động phản hồi theo kịch bản tình huống.',
    };
    yield { type: 'content', text: fallbackText };
  }

  yield { type: 'done' };
}

export function extractJsonArray(str: string): string {
  let cleaned = str.trim();
  const firstBracket = cleaned.indexOf('[');
  const lastBracket = cleaned.lastIndexOf(']');
  if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
    return cleaned.substring(firstBracket, lastBracket + 1);
  }
  return cleanJsonString(cleaned);
}

export function extractJsonObject(str: string): string {
  let cleaned = str.trim();
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    return cleaned.substring(firstBrace, lastBrace + 1);
  }
  return cleanJsonString(cleaned);
}

export function safeParseJsonArray<T = unknown>(str: string): T[] | null {
  const extracted = extractJsonArray(str);
  try {
    const parsed = JSON.parse(extracted);
    if (Array.isArray(parsed)) return parsed as T[];
  } catch {
    // If strict parse fails (e.g. unescaped inner quotes), attempt regex item extraction
    try {
      const items: T[] = [];
      const itemBlocks = extracted.match(/\{[\s\S]*?\}(?=\s*,|\s*\])/g);
      if (itemBlocks) {
        for (const block of itemBlocks) {
          try {
            items.push(JSON.parse(block) as T);
          } catch {
            // ignore malformed item
          }
        }
      }
      if (items.length >= 2) return items;
    } catch {
      // ignore
    }
  }
  return null;
}

export function safeParseJsonObject<T = unknown>(str: string): T | null {
  const extracted = extractJsonObject(str);
  try {
    const parsed = JSON.parse(extracted);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as T;
    }
  } catch {
    // ignore
  }
  return null;
}

export function cleanJsonString(str: string): string {
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

/**
 * Generate 3 contextual communication suggestions (strictly on demand).
 * Follows the user selected model preference with automatic failover (Gemini <-> Cloudflare -> Static Fallback).
 */
export async function generateRoleplaySuggestions(
  character: CharacterConfig,
  scenario: RoleplayScenario,
  chatHistory: Array<{ role: 'user' | 'assistant'; content: string }>,
  targetScore: number = 650,
  providerPreference: AIModelPreference = 'auto',
  userInfo?: { userId?: string; userEmail?: string; guestId?: string }
): Promise<RoleplaySuggestionsResult> {
  const quotaCheck = await checkUserAIQuota({
    userId: userInfo?.userId,
    userEmail: userInfo?.userEmail,
    guestId: userInfo?.guestId,
  });
  if (!quotaCheck.allowed) {
    return {
      suggestions: generateFallbackSuggestions(character, scenario, chatHistory),
      provider: 'fallback',
      isFallback: true,
      fallbackReason: quotaCheck.reason || 'Hạn mức AI hôm nay đã đạt giới hạn.',
    };
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
        const parsed = safeParseJsonArray<RoleplaySuggestion>(text);
        if (parsed && Array.isArray(parsed) && parsed.length >= 2) {
          recordUserAIUsage({
            userId: userInfo?.userId,
            userEmail: userInfo?.userEmail,
            guestId: userInfo?.guestId,
            provider: 'gemini',
          });
          return parsed;
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
        'You are an expert TOEIC tutor. Output strictly a valid raw JSON array containing exactly 3 suggestion objects without markdown backticks or python code or introductory text.'
      )) {
        accumulated += chunk;
      }
      const parsed = safeParseJsonArray<RoleplaySuggestion>(accumulated);
      if (parsed && Array.isArray(parsed) && parsed.length >= 2) {
        recordUserAIUsage({
          userId: userInfo?.userId,
          userEmail: userInfo?.userEmail,
          guestId: userInfo?.guestId,
          provider: 'cloudflare',
        });
        return parsed;
      }
    } catch (e) {
      console.warn('[Roleplay Suggestions] Cloudflare generation failed:', e);
    }
    return null;
  };

  // 1. User selected Cloudflare
  if (providerPreference === 'cloudflare') {
    const cfResult = await callCloudflare();
    if (cfResult) {
      return {
        suggestions: cfResult,
        provider: 'cloudflare',
        model: getCloudflareChatModel(),
        isFallback: false,
      };
    }
    // Fallback to Gemini if Cloudflare failed
    console.warn('[Roleplay Suggestions] Cloudflare failed, falling back to Gemini...');
    const geminiFallback = await callGemini();
    if (geminiFallback) {
      return {
        suggestions: geminiFallback,
        provider: 'gemini',
        model: getGeminiModel(),
        isFallback: true,
        fallbackReason: 'Mô hình Cloudflare tạm thời không khả dụng, đã tự động chuyển sang Google Gemini dự phòng.',
      };
    }
    return {
      suggestions: generateFallbackSuggestions(character, scenario, chatHistory),
      provider: 'fallback',
      isFallback: true,
      fallbackReason: 'Tất cả mô hình AI đang bận, hệ thống cung cấp gợi ý tình huống phù hợp.',
    };
  }

  // 2. User selected Gemini
  if (providerPreference === 'gemini') {
    const geminiResult = await callGemini();
    if (geminiResult) {
      return {
        suggestions: geminiResult,
        provider: 'gemini',
        model: getGeminiModel(),
        isFallback: false,
      };
    }
    // Fallback to Cloudflare if Gemini failed (e.g. 503 high demand or 429 quota)
    console.warn('[Roleplay Suggestions] Gemini failed, falling back to Cloudflare Workers AI...');
    const cfFallback = await callCloudflare();
    if (cfFallback) {
      return {
        suggestions: cfFallback,
        provider: 'cloudflare',
        model: getCloudflareChatModel(),
        isFallback: true,
        fallbackReason: 'Google Gemini đang tạm quá tải (503/429), đã tự động chuyển sang Cloudflare Workers AI dự phòng.',
      };
    }
    return {
      suggestions: generateFallbackSuggestions(character, scenario, chatHistory),
      provider: 'fallback',
      isFallback: true,
      fallbackReason: 'Tất cả mô hình AI đang bận, hệ thống cung cấp gợi ý tình huống phù hợp.',
    };
  }

  // 3. Auto / Hybrid mode (Gemini -> Cloudflare -> Static Fallback)
  const geminiRes = await callGemini();
  if (geminiRes) {
    return {
      suggestions: geminiRes,
      provider: 'gemini',
      model: getGeminiModel(),
      isFallback: false,
    };
  }

  console.warn('[Roleplay Suggestions] Auto hybrid: Gemini failed, trying Cloudflare...');
  const cfRes = await callCloudflare();
  if (cfRes) {
    return {
      suggestions: cfRes,
      provider: 'cloudflare',
      model: getCloudflareChatModel(),
      isFallback: true,
      fallbackReason: 'Gemini tạm thời không khả dụng, đã tự động chuyển sang Cloudflare Workers AI dự phòng.',
    };
  }

  return {
    suggestions: generateFallbackSuggestions(character, scenario, chatHistory),
    provider: 'fallback',
    isFallback: true,
    fallbackReason: 'Tất cả mô hình AI đang bận, hệ thống cung cấp gợi ý tình huống phù hợp.',
  };
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

    if (character.role === 'friend') {
      return [
        {
          id: `fallback-stage0-1`,
          type: 'formal',
          label: 'Lịch sự & Nhiệt tình',
          english: kp1?.phrase || 'That sounds like a wonderful plan! Let us coordinate the details and set a time.',
          vietnamese: kp1?.meaning || 'Kế hoạch đó nghe tuyệt quá! Chúng mình cùng thống nhất chi tiết và chốt giờ nhé.',
          explanation: kp1?.usageTip || 'Lời đáp nhiệt tình, sẵn sàng cùng bạn bè lên kế hoạch.',
          keyVocabulary: ['coordinate', 'details'],
        },
        {
          id: `fallback-stage0-2`,
          type: 'casual',
          label: 'Thân mật & Hào hứng',
          english: 'Hey! I was just thinking about that. I am totally down to hang out and do this together!',
          vietnamese: 'Chào bạn! Mình cũng đang tính rủ bạn đây. Mình sẵn sàng tụ tập và cùng làm việc này rồi!',
          explanation: '"Be down for something" là cách diễn đạt tự nhiên khi đồng ý rủ rê.',
          keyVocabulary: ['totally down', 'hang out'],
        },
        {
          id: `fallback-stage0-3`,
          type: 'clarifying',
          label: 'Hỏi để chốt thời gian & địa điểm',
          english: kp2?.phrase || 'What time works best for you, and where should we meet up first?',
          vietnamese: kp2?.meaning || 'Mấy giờ thì tiện nhất cho bạn, và chúng mình nên gặp nhau ở đâu trước?',
          explanation: kp2?.usageTip || 'Hỏi nhanh để thống nhất lịch trình.',
          keyVocabulary: ['works best', 'meet up'],
        },
      ];
    }

    if (character.role === 'family') {
      return [
        {
          id: `fallback-stage0-1`,
          type: 'formal',
          label: 'Lễ phép & Ấm áp',
          english: kp1?.phrase || 'Hello! It is so comforting to hear your voice. Everything is going well on my end.',
          vietnamese: kp1?.meaning || 'Alo ạ! Nghe giọng bố/mẹ con thấy ấm lòng quá. Mọi việc bên con đều đang ổn thỏa ạ.',
          explanation: kp1?.usageTip || 'Lời chào kính trọng và đầy ắp tình cảm gia đình.',
          keyVocabulary: ['comforting', 'on my end'],
        },
        {
          id: `fallback-stage0-2`,
          type: 'casual',
          label: 'Tự nhiên & Gần gũi',
          english: 'Hi! I miss home so much. I have been eating well and staying healthy, so please do not worry.',
          vietnamese: 'Con chào bố/mẹ! Con nhớ nhà lắm. Con vẫn ăn uống đầy đủ và khỏe mạnh, bố/mẹ đừng lo nhé.',
          explanation: 'Trấn an người thân một cách tự nhiên.',
          keyVocabulary: ['miss home', 'staying healthy'],
        },
        {
          id: `fallback-stage0-3`,
          type: 'clarifying',
          label: 'Hỏi thăm sức khỏe người thân',
          english: kp2?.phrase || 'How is everyone at home doing? How has your and Dad’s health been lately?',
          vietnamese: kp2?.meaning || 'Mọi người ở nhà dạo này thế nào ạ? Sức khỏe của bố mẹ dạo này ra sao rồi?',
          explanation: kp2?.usageTip || 'Hỏi thăm sức khỏe chu đáo.',
          keyVocabulary: ['health', 'lately'],
        },
      ];
    }

    if (character.role === 'lover') {
      return [
        {
          id: `fallback-stage0-1`,
          type: 'formal',
          label: 'Dịu dàng & Tinh tế',
          english: kp1?.phrase || 'Hello my love! I have been eagerly looking forward to our time together.',
          vietnamese: kp1?.meaning || 'Chào em/anh yêu! Cả ngày hôm nay em/anh cứ mong đến lúc hai đứa mình được gặp nhau.',
          explanation: kp1?.usageTip || 'Mở đầu ngọt ngào và chan chứa yêu thương.',
          keyVocabulary: ['eagerly', 'looking forward'],
        },
        {
          id: `fallback-stage0-2`,
          type: 'casual',
          label: 'Ngọt ngào & Thân mật',
          english: 'Hey sweetheart! Seeing your text completely made my day. I missed you so much!',
          vietnamese: 'Chào tình yêu của em/anh! Thấy tin nhắn của em/anh là cả ngày vui lên hẳn. Em/anh nhớ nhiều lắm!',
          explanation: 'Bày tỏ cảm xúc hạnh phúc tức thì.',
          keyVocabulary: ['made my day', 'missed you'],
        },
        {
          id: `fallback-stage0-3`,
          type: 'clarifying',
          label: 'Hỏi sở thích của người yêu',
          english: kp2?.phrase || 'What kind of mood are you in tonight—a quiet candlelit dinner or a relaxing walk?',
          vietnamese: kp2?.meaning || 'Tối nay em/anh thích không gian thế nào—một bữa tối ấm cúng hay đi dạo ngắm phố?',
          explanation: kp2?.usageTip || 'Lắng nghe và chiều theo sở thích của đối phương.',
          keyVocabulary: ['in the mood', 'candlelit'],
        },
      ];
    }

    if (character.role === 'interviewer') {
      return [
        {
          id: `fallback-stage0-1`,
          type: 'formal',
          label: 'Trang trọng & Chuyên nghiệp',
          english: kp1?.phrase || 'Good day! Thank you for the opportunity. I am excited to discuss my technical background and project experience.',
          vietnamese: kp1?.meaning || 'Xin chào quý công ty! Cảm ơn cơ hội này. Tôi rất hào hứng được trình bày về nền tảng kỹ thuật và kinh nghiệm dự án của mình.',
          explanation: kp1?.usageTip || 'Mở đầu phỏng vấn tự tin, chuẩn mực.',
          keyVocabulary: ['opportunity', 'technical background'],
        },
        {
          id: `fallback-stage0-2`,
          type: 'casual',
          label: 'Trực diện & Súc tích',
          english: 'Hello! I am glad to be here today. I am well prepared to discuss my architectural choices and software engineering work.',
          vietnamese: 'Xin chào! Rất vui được có mặt hôm nay. Tôi đã chuẩn bị sẵn sàng để chia sẻ về các quyết định kiến trúc và công việc lập trình của mình.',
          explanation: 'Phong thái kỹ sư phần mềm chủ động.',
          keyVocabulary: ['architectural choices', 'engineering work'],
        },
        {
          id: `fallback-stage0-3`,
          type: 'clarifying',
          label: 'Hỏi về định hướng kỹ thuật của team',
          english: kp2?.phrase || 'Could you briefly share which key tech stack or performance challenges your team is focusing on right now?',
          vietnamese: kp2?.meaning || 'Anh/chị có thể chia sẻ ngắn gọn về tech stack chính hoặc bài toán hiệu năng mà team đang tập trung hiện nay không ạ?',
          explanation: kp2?.usageTip || 'Hỏi ngược lại nhà tuyển dụng câu hỏi kỹ thuật thông minh.',
          keyVocabulary: ['tech stack', 'performance challenges'],
        },
      ];
    }

    if (character.role === 'stranger') {
      return [
        {
          id: `fallback-stage0-1`,
          type: 'formal',
          label: 'Lịch thiệp & Cầu thị',
          english: kp1?.phrase || 'Excuse me, good day! Could you please help me with some directions? I want to make sure I am on the right track.',
          vietnamese: kp1?.meaning || 'Xin lỗi làm phiền bạn! Bạn có thể chỉ giúp tôi đường đi được không? Tôi muốn chắc chắn mình đang đi đúng hướng.',
          explanation: kp1?.usageTip || 'Cách hỏi đường nhã nhặn với người lạ.',
          keyVocabulary: ['excuse me', 'right track'],
        },
        {
          id: `fallback-stage0-2`,
          type: 'casual',
          label: 'Thân thiện & Tự nhiên',
          english: 'Hi there! Pardon the interruption, but do you happen to know the best way to get there from here?',
          vietnamese: 'Chào bạn! Xin lỗi vì đã ngắt lời, bạn có biết cách nào nhanh nhất để đến đó từ đây không?',
          explanation: 'Diễn đạt tự nhiên đời thường khi giao tiếp nơi công cộng.',
          keyVocabulary: ['pardon the interruption', 'happen to know'],
        },
        {
          id: `fallback-stage0-3`,
          type: 'clarifying',
          label: 'Hỏi điểm mốc nhận diện',
          english: kp2?.phrase || 'Is there a prominent landmark nearby so I know when I have arrived?',
          vietnamese: kp2?.meaning || 'Gần đó có cột mốc nổi bật nào để tôi biết mình đã đến nơi không ạ?',
          explanation: kp2?.usageTip || 'Hỏi đặc điểm nhận dạng vị trí.',
          keyVocabulary: ['landmark', 'prominent'],
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

    if (character.role === 'friend') {
      return [
        {
          id: `fallback-stage1-1`,
          type: 'formal',
          label: 'Đề xuất lựa chọn hợp lý',
          english: kp2?.phrase || 'I believe that option gives us the best balance of time, cost, and enjoyment.',
          vietnamese: kp2?.meaning || 'Mình tin rằng phương án đó sẽ mang lại sự cân bằng tốt nhất giữa thời gian, chi phí và sự vui vẻ.',
          explanation: kp2?.usageTip || 'Đưa ra nhận định thuyết phục bạn bè.',
          keyVocabulary: ['balance', 'enjoyment'],
        },
        {
          id: `fallback-stage1-2`,
          type: 'casual',
          label: 'Hào hứng & Đồng tình',
          english: 'I love that idea! That will make our outing so much more fun and memorable.',
          vietnamese: 'Mình thích ý tưởng đó lắm! Chắc chắn sẽ làm chuyến đi chơi vui và đáng nhớ hơn nhiều.',
          explanation: 'Tạo không khí vui vẻ, ủng hộ ý tưởng của bạn.',
          keyVocabulary: ['love that idea', 'memorable'],
        },
        {
          id: `fallback-stage1-3`,
          type: 'clarifying',
          label: 'Hỏi kiểm tra chi tiết trước',
          english: kp3?.phrase || 'Have you checked the schedule or ticket availability, or should I book it right away?',
          vietnamese: kp3?.meaning || 'Bạn đã kiểm tra lịch hoặc tình trạng vé chưa, hay để mình đặt ngay bây giờ?',
          explanation: kp3?.usageTip || 'Chủ động hỏi để thực hiện việc đặt vé.',
          keyVocabulary: ['availability', 'book right away'],
        },
      ];
    }

    if (character.role === 'family') {
      return [
        {
          id: `fallback-stage1-1`,
          type: 'formal',
          label: 'Chia sẻ chân thành & Lắng nghe',
          english: kp2?.phrase || 'Things have been quite demanding at work lately, but your advice really keeps me grounded.',
          vietnamese: kp2?.meaning || 'Dạo này công việc cũng khá nhiều áp lực, nhưng lời khuyên của bố/mẹ luôn giúp con giữ vững tâm thế.',
          explanation: kp2?.usageTip || 'Bộc bạch lòng mình với người thân.',
          keyVocabulary: ['demanding', 'keeps me grounded'],
        },
        {
          id: `fallback-stage1-2`,
          type: 'casual',
          label: 'Tâm sự cởi mở',
          english: 'Hearing from you always lifts my spirits whenever I feel tired from the daily grind.',
          vietnamese: 'Nói chuyện với bố/mẹ luôn làm con thấy phấn chấn hơn mỗi khi mệt mỏi vì bộn bề cuộc sống.',
          explanation: 'Gắn kết tình cảm gia đình.',
          keyVocabulary: ['lifts my spirits', 'daily grind'],
        },
        {
          id: `fallback-stage1-3`,
          type: 'clarifying',
          label: 'Hỏi sắp xếp lịch về thăm nhà',
          english: kp3?.phrase || 'Would it be convenient if I come home for a visit towards the end of this month?',
          vietnamese: kp3?.meaning || 'Nếu con sắp xếp về thăm nhà vào cuối tháng này thì có tiện cho bố/mẹ không ạ?',
          explanation: kp3?.usageTip || 'Bàn chuyện về quê sum họp gia đình.',
          keyVocabulary: ['convenient', 'visit home'],
        },
      ];
    }

    if (character.role === 'lover') {
      return [
        {
          id: `fallback-stage1-1`,
          type: 'formal',
          label: 'Bày tỏ ngọt ngào & Tinh tế',
          english: kp2?.phrase || 'Being with you makes every simple moment feel extraordinarily meaningful.',
          vietnamese: kp2?.meaning || 'Ở bên cạnh em/anh làm cho từng khoảnh khắc giản đơn nhất cũng trở nên vô cùng ý nghĩa.',
          explanation: kp2?.usageTip || 'Lời bày tỏ tình cảm chân thành.',
          keyVocabulary: ['extraordinarily', 'meaningful'],
        },
        {
          id: `fallback-stage1-2`,
          type: 'casual',
          label: 'Ngọt ngào & Chiều chuộng',
          english: 'Whatever you prefer, I am completely happy with! Let us go to that cozy place you like.',
          vietnamese: 'Bất cứ điều gì em/anh thích thì anh/em đều thấy vui hết! Chúng mình đến quán ấm cúng mà em/anh thích nhé.',
          explanation: 'Thể hiện sự quan tâm, chiều chuộng người yêu.',
          keyVocabulary: ['completely happy', 'cozy place'],
        },
        {
          id: `fallback-stage1-3`,
          type: 'clarifying',
          label: 'Hỏi để đặt bàn trước',
          english: kp3?.phrase || 'Should I make a reservation by the window in advance so we have a great spot?',
          vietnamese: kp3?.meaning || 'Em/anh có muốn anh/em đặt bàn trước cạnh cửa sổ để có chỗ ngồi thật đẹp không?',
          explanation: kp3?.usageTip || 'Chu đáo chuẩn bị cho buổi hẹn.',
          keyVocabulary: ['reservation', 'great spot'],
        },
      ];
    }

    if (character.role === 'interviewer') {
      return [
        {
          id: `fallback-stage1-1`,
          type: 'formal',
          label: 'Trình bày giải pháp kỹ thuật',
          english: kp2?.phrase || 'In our production system, we resolved query bottlenecks by introducing distributed caching and database indexing.',
          vietnamese: kp2?.meaning || 'Trong hệ thống thực tế, chúng tôi giải quyết điểm nghẽn truy vấn bằng cách áp dụng bộ đệm phân tán và đánh chỉ mục cơ sở dữ liệu.',
          explanation: kp2?.usageTip || 'Trả lời kỹ thuật IT chuyên nghiệp và cụ thể.',
          keyVocabulary: ['bottlenecks', 'distributed caching', 'indexing'],
        },
        {
          id: `fallback-stage1-2`,
          type: 'casual',
          label: 'Chia sẻ kinh nghiệm thực chiến',
          english: 'When that high-severity incident struck, our team collaborated closely in a war-room setup to isolate the root cause rapidly.',
          vietnamese: 'Khi xảy ra sự cố nghiêm trọng, team chúng tôi đã phối hợp chặt chẽ để nhanh chóng khoanh vùng và tìm ra nguyên nhân gốc rễ.',
          explanation: 'Thể hiện kỹ năng xử lý khủng hoảng và làm việc nhóm.',
          keyVocabulary: ['incident', 'root cause', 'isolate'],
        },
        {
          id: `fallback-stage1-3`,
          type: 'clarifying',
          label: 'Hỏi về quy trình triển khai CI/CD',
          english: kp3?.phrase || 'How does your engineering team automate integration testing and deployment across environments?',
          vietnamese: kp3?.meaning || 'Đội ngũ kỹ thuật của công ty tự động hóa quy trình kiểm thử tích hợp và triển khai qua các môi trường như thế nào ạ?',
          explanation: kp3?.usageTip || 'Thể hiện sự quan tâm sâu sắc tới DevOps và chất lượng phần mềm.',
          keyVocabulary: ['automate', 'integration testing', 'deployment'],
        },
      ];
    }

    if (character.role === 'stranger') {
      return [
        {
          id: `fallback-stage1-1`,
          type: 'formal',
          label: 'Xác nhận lại chỉ dẫn rõ ràng',
          english: kp2?.phrase || 'So I should continue straight past the intersection, and then the entrance will be on my right?',
          vietnamese: kp2?.meaning || 'Vậy tôi cứ tiếp tục đi thẳng qua ngã tư, rồi lối vào sẽ nằm ở phía tay phải đúng không ạ?',
          explanation: kp2?.usageTip || 'Xác nhận lại chỉ dẫn để không bị đi nhầm.',
          keyVocabulary: ['continue straight', 'entrance'],
        },
        {
          id: `fallback-stage1-2`,
          type: 'casual',
          label: 'Tiếp thu nhanh & Thân thiện',
          english: 'Got it! That sounds very straightforward. Thanks for explaining the route so clearly.',
          vietnamese: 'Tôi hiểu rồi! Đường đi nghe rất dễ tìm. Cảm ơn bạn đã giải thích lộ trình rõ ràng như vậy nhé.',
          explanation: 'Phản hồi tích cực khi được hướng dẫn đường đi.',
          keyVocabulary: ['straightforward', 'clearly'],
        },
        {
          id: `fallback-stage1-3`,
          type: 'clarifying',
          label: 'Hỏi thời gian di chuyển ước tính',
          english: kp3?.phrase || 'Approximately how many minutes does it take to walk there from here?',
          vietnamese: kp3?.meaning || 'Ước tính mất khoảng bao nhiêu phút để đi bộ từ đây đến đó ạ?',
          explanation: kp3?.usageTip || 'Ước lượng thời gian di chuyển thực tế.',
          keyVocabulary: ['approximately', 'minutes to walk'],
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

  if (character.role === 'friend') {
    return [
      {
        id: `fallback-stage2-1`,
        type: 'formal',
        label: 'Chốt kế hoạch chu đáo',
        english: kp3?.phrase || 'Wonderful, our plan is set! I look forward to catching up and having a great time together.',
        vietnamese: kp3?.meaning || 'Tuyệt vời, kế hoạch của tụi mình đã chốt xong! Rất mong đến lúc gặp bạn và có khoảng thời gian vui vẻ.',
        explanation: kp3?.usageTip || 'Khẳng định sự háo hức trước cuộc hẹn.',
        keyVocabulary: ['plan is set', 'catching up'],
      },
      {
        id: `fallback-stage2-2`,
        type: 'casual',
        label: 'Hẹn gặp cuối tuần',
        english: 'It is a deal! Text me as soon as you are on your way, and see you very soon!',
        vietnamese: 'Chốt kèo nhé! Khi nào xuất phát thì nhắn mình liền, hẹn sớm gặp lại bạn nha!',
        explanation: '"It is a deal" là cách chốt hẹn sảng khoái giữa bạn bè.',
        keyVocabulary: ['it is a deal', 'see you soon'],
      },
      {
        id: `fallback-stage2-3`,
        type: 'clarifying',
        label: 'Hỏi phương tiện đưa đón',
        english: 'Would you like me to swing by and pick you up, or should we meet right at the entrance?',
        vietnamese: 'Bạn có muốn mình ghé qua đón luôn không, hay tụi mình gặp nhau ngay trước cổng vào?',
        explanation: '"Swing by" thể hiện sự chu đáo và tiện đường ghé đón.',
        keyVocabulary: ['swing by', 'pick you up'],
      },
    ];
  }

  if (character.role === 'family') {
    return [
      {
        id: `fallback-stage2-1`,
        type: 'formal',
        label: 'Bày tỏ lòng hiếu thảo & Yêu thương',
        english: kp3?.phrase || 'Thank you so much for your unconditional support. Please take good care of your health at home.',
        vietnamese: kp3?.meaning || 'Con cảm ơn sự ủng hộ vô điều kiện của bố/mẹ. Bố/mẹ ở quê nhớ giữ gìn sức khỏe thật tốt nhé.',
        explanation: kp3?.usageTip || 'Lời cảm ơn hiếu thảo và ấm áp.',
        keyVocabulary: ['unconditional support', 'take good care'],
      },
      {
        id: `fallback-stage2-2`,
        type: 'casual',
        label: 'Tình cảm ruột thịt',
        english: 'I love you so much! I will call again this Sunday, and I cannot wait to see everyone soon.',
        vietnamese: 'Con yêu bố/mẹ nhiều lắm! Chủ nhật này con sẽ gọi lại, con mong sớm được về gặp cả nhà.',
        explanation: 'Lời kết ngọt ngào giữa các thành viên gia đình.',
        keyVocabulary: ['love you so much', 'cannot wait'],
      },
      {
        id: `fallback-stage2-3`,
        type: 'clarifying',
        label: 'Hỏi quà mang về cho gia đình',
        english: 'Is there any special treat from the city that you would like me to bring back home?',
        vietnamese: 'Có món quà hay đặc sản nào trên thành phố mà bố/mẹ muốn con mua mang về nhà không ạ?',
        explanation: 'Hỏi han chu đáo trước khi về thăm nhà.',
        keyVocabulary: ['special treat', 'bring back home'],
      },
    ];
  }

  if (character.role === 'lover') {
    return [
      {
        id: `fallback-stage2-1`,
        type: 'formal',
        label: 'Cam kết đồng hành ngọt ngào',
        english: kp3?.phrase || 'Thank you for making my life so beautiful. I cherish our bond more and more each day.',
        vietnamese: kp3?.meaning || 'Cảm ơn em/anh đã làm cuộc sống của anh/em tươi đẹp đến thế. Mỗi ngày anh/em càng trân quý tình yêu này hơn.',
        explanation: kp3?.usageTip || 'Khẳng định tình yêu vững bền, lãng mạn.',
        keyVocabulary: ['cherish', 'bond'],
      },
      {
        id: `fallback-stage2-2`,
        type: 'casual',
        label: 'Hẹn hò hào hứng',
        english: 'I cannot wait to see your smile! I am heading over now, see you in just a little bit!',
        vietnamese: 'Anh/em mong được nhìn thấy nụ cười của em/anh quá! Anh/em đang qua đây, gặp lại em/anh một lát nữa nhé!',
        explanation: 'Háo hức trước khoảnh khắc gặp gỡ người yêu.',
        keyVocabulary: ['cannot wait', 'heading over'],
      },
      {
        id: `fallback-stage2-3`,
        type: 'clarifying',
        label: 'Hỏi xem đối phương đã chuẩn bị xong chưa',
        english: 'Are you almost ready, or do you need a few more minutes before I arrive?',
        vietnamese: 'Em/anh đã chuẩn bị xong chưa, hay em/anh cần thêm vài phút trước khi anh/em tới nơi?',
        explanation: 'Quan tâm khéo léo để đối phương không phải vội.',
        keyVocabulary: ['almost ready', 'arrive'],
      },
    ];
  }

  if (character.role === 'interviewer') {
    return [
      {
        id: `fallback-stage2-1`,
        type: 'formal',
        label: 'Cảm ơn & Thể hiện nguyện vọng cống hiến',
        english: kp3?.phrase || 'Thank you very much for your time and insights today. I am very enthusiastic about contributing to your team.',
        vietnamese: kp3?.meaning || 'Rất cảm ơn thời gian và những chia sẻ quý báu của anh/chị hôm nay. Tôi rất mong muốn được cống hiến cho đội ngũ của công ty.',
        explanation: kp3?.usageTip || 'Kết thúc buổi phỏng vấn chuẩn mực, để lại ấn tượng chuyên nghiệp.',
        keyVocabulary: ['insights', 'enthusiastic', 'contributing'],
      },
      {
        id: `fallback-stage2-2`,
        type: 'casual',
        label: 'Giao lưu chân thành & Tự tin',
        english: 'It was a pleasure discussing engineering challenges with you today. I really enjoyed learning about your architectural roadmap.',
        vietnamese: 'Thật tuyệt khi được trao đổi về các thách thức kỹ thuật hôm nay. Tôi rất thích lộ trình phát triển kiến trúc của quý công ty.',
        explanation: 'Tạo thiện cảm và thể hiện đam mê công nghệ.',
        keyVocabulary: ['pleasure', 'roadmap'],
      },
      {
        id: `fallback-stage2-3`,
        type: 'clarifying',
        label: 'Hỏi về các bước tiếp theo trong quy trình tuyển dụng',
        english: 'Could you share what the subsequent steps and expected timeline are for this hiring process?',
        vietnamese: 'Anh/chị có thể chia sẻ các bước tiếp theo và khung thời gian dự kiến của quy trình tuyển dụng này không ạ?',
        explanation: 'Câu hỏi chuyên nghiệp ứng viên nên hỏi ở cuối buổi phỏng vấn.',
        keyVocabulary: ['subsequent steps', 'expected timeline', 'hiring process'],
      },
    ];
  }

  if (character.role === 'stranger') {
    return [
      {
        id: `fallback-stage2-1`,
        type: 'formal',
        label: 'Cảm ơn sâu sắc sự giúp đỡ',
        english: kp3?.phrase || 'Thank you immensely for your directions. Your assistance made navigating this city effortless!',
        vietnamese: kp3?.meaning || 'Vô cùng cảm ơn sự chỉ dẫn của bạn. Sự giúp đỡ nhiệt tình của bạn khiến việc đi lại trong thành phố trở nên dễ dàng hơn nhiều!',
        explanation: kp3?.usageTip || 'Bày tỏ lòng biết ơn trang trọng tới người lạ/người bản địa.',
        keyVocabulary: ['immensely', 'effortless'],
      },
      {
        id: `fallback-stage2-2`,
        type: 'casual',
        label: 'Cảm ơn thân thiện',
        english: 'You have been super helpful, thank you so much! Wishing you a fantastic day ahead!',
        vietnamese: 'Bạn đã giúp tôi rất nhiều, cảm ơn bạn rất nhiều nhé! Chúc bạn một ngày thật tuyệt vời phía trước!',
        explanation: 'Lời chào tạm biệt tươi vui, lịch thiệp nơi công cộng.',
        keyVocabulary: ['super helpful', 'fantastic day'],
      },
      {
        id: `fallback-stage2-3`,
        type: 'clarifying',
        label: 'Hỏi gợi ý ẩm thực hoặc điểm tham quan lân cận',
        english: 'By the way, is there a good local eatery or specialty around here that you would personally recommend?',
        vietnamese: 'Nhân tiện, quanh đây có quán ăn ngon hoặc đặc sản địa phương nào mà bạn khuyên nên thử không ạ?',
        explanation: 'Hỏi xin mẹo ẩm thực địa phương từ người bản xứ.',
        keyVocabulary: ['local eatery', 'specialty', 'recommend'],
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
        const parsed = safeParseJsonObject<{ english: string; vietnamese: string }>(text);
        if (parsed?.english && parsed?.vietnamese) {
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
        'You are an expert TOEIC roleplay tutor. Output strictly a valid raw JSON object only without markdown backticks or commentary.'
      )) {
        accumulated += chunk;
      }
      const parsed = safeParseJsonObject<{ english: string; vietnamese: string }>(accumulated);
      if (parsed?.english && parsed?.vietnamese) {
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
    const geminiFallback = await callGemini();
    if (geminiFallback) return geminiFallback;
    return generateFallbackOpening(character, scenario, userName);
  }

  // 2. Force Gemini
  if (providerPreference === 'gemini') {
    const geminiRes = await callGemini();
    if (geminiRes) return geminiRes;
    const cfFallback = await callCloudflare();
    if (cfFallback) return cfFallback;
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

/**
 * Generate a contextual, in-character fallback response when all AI providers are unavailable.
 * Ensures the roleplay conversation is never broken into a raw dead-end error.
 */
export function generateFallbackProactiveReply(
  character: CharacterConfig,
  scenario: RoleplayScenario
): string {
  const topic = scenario.englishTitle || scenario.title;
  const phrase = scenario.keyPhrases?.[0]?.phrase;

  const byRole: Record<string, string> = {
    boss: `Hi there, just checking in on ${topic}. Whenever you have a moment, could you share a quick update on where things stand?`,
    colleague: `Hey! Just nudging you about ${topic}. Do you have a quick minute to share your thoughts so we can move forward?`,
    staff: `Hello! Checking in regarding ${topic}. Please let me know how you would like me to proceed when you're free.`,
    friend: `Hey! Still thinking about ${topic}${phrase ? ` — "${phrase}"` : ''}. What do you think about it?`,
    family: `Hi sweetheart, just checking in to see how you're doing today. Have you had a chance to relax a bit?`,
    lover: `Hey love, just thinking of you and ${topic}. How is your day going so far?`,
    interviewer: `Hello! Whenever you're ready, we can continue discussing ${topic}. What's your perspective on this?`,
    stranger: `Excuse me, just checking if you still need any help regarding ${topic}? Feel free to ask anytime!`,
  };

  return (
    byRole[character.role] ||
    `Hi! Just checking in about ${topic}. Let me know your thoughts whenever you're ready!`
  );
}

export function generateFallbackRoleplayReply(
  character: CharacterConfig,
  scenario: RoleplayScenario,
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  isAutoProactive = false
): string {
  if (isAutoProactive) {
    return generateFallbackProactiveReply(character, scenario);
  }

  const userTurnCount = messages.filter((m) => m.role === 'user').length;
  const keyPhrases = scenario.keyPhrases || [];
  const phrase = keyPhrases[userTurnCount % Math.max(keyPhrases.length, 1)]?.phrase;

  if (character.role === 'boss') {
    if (userTurnCount <= 1) {
      return `Thank you for following up on this matter. In order to achieve our objective ("${scenario.objective}"), let's make sure we address the highest-priority items first. ${
        phrase ? `Keep in mind: "${phrase}". ` : ''
      }Could you give me a brief outline of the immediate steps you are taking?`;
    }
    return `Understood. Your perspective makes sense given the current schedule. Please continue with the proposed plan, ensure the deliverables meet our quality standards, and provide an updated summary by tomorrow afternoon.`;
  }

  if (character.role === 'colleague') {
    if (userTurnCount <= 1) {
      return `Thanks for bringing this up! I completely agree with your general approach. To help us hit our target ("${scenario.objective}"), let's divide the tasks so we don't duplicate effort. ${
        phrase ? `As we discussed: "${phrase}". ` : ''
      }Which portion would you prefer to handle first?`;
    }
    return `That sounds like a great plan! I'm glad we are on the same page regarding this. I will take care of my assigned part right away, and let's touch base again once the initial draft is ready.`;
  }

  if (character.role === 'friend') {
    if (userTurnCount <= 1) {
      return `That sounds awesome! I'm really excited we're doing this together. ${
        phrase ? `Just like you said: "${phrase}". ` : ''
      }What time works best for you, and should we invite anyone else along?`;
    }
    return `I completely agree! Everything is set up nicely. Let's make sure we meet on time, and I can't wait to catch up and have a blast with you!`;
  }

  if (character.role === 'family') {
    if (userTurnCount <= 1) {
      return `It warms my heart so much to talk with you, my dear. ${
        phrase ? `Always remember: "${phrase}". ` : ''
      }Make sure you don't overwork yourself and always take good care of your meals and rest, okay?`;
    }
    return `Hearing your voice brings so much comfort to the whole family. We are always praying for your success and happiness. Call me whenever you have free time, sweetheart!`;
  }

  if (character.role === 'lover') {
    if (userTurnCount <= 1) {
      return `I love hearing your thoughts, sweetheart. Every moment we share feels so special. ${
        phrase ? `Just as you mentioned: "${phrase}". ` : ''
      }What else would make this time together unforgettable for you?`;
    }
    return `You mean the world to me, and I'm so grateful to have you by my side. Let's enjoy every single minute of this date together!`;
  }

  if (character.role === 'interviewer') {
    if (userTurnCount <= 1) {
      return `Thank you for sharing your experience and technical perspective. Regarding "${scenario.objective}", ${
        phrase ? `you highlighted: "${phrase}". ` : ''
      }Could you elaborate on how you evaluate trade-offs between delivery speed and system maintainability?`;
    }
    return `Your technical explanation is well reasoned and demonstrates solid engineering discipline. We have covered our main agenda today. Thank you for participating, and our recruitment team will reach out with next steps soon.`;
  }

  if (character.role === 'stranger') {
    if (userTurnCount <= 1) {
      return `Happy to help! Regarding "${scenario.objective}", ${
        phrase ? `keep this tip in mind: "${phrase}". ` : ''
      }Are you all set, or would you like me to clarify anything else about the route or schedule?`;
    }
    return `You're very welcome! You should have no problem finding it from here. Enjoy your journey, and have a wonderful time exploring!`;
  }

  // Staff role
  if (userTurnCount <= 1) {
    return `Thank you for your detailed instructions. I have noted down the core guidelines regarding "${scenario.objective}". ${
      phrase ? `I will follow the approach: "${phrase}". ` : ''
    }I will start compiling the necessary materials right now and inform you as soon as the first draft is ready.`;
  }
  return `Everything is progressing according to schedule on my side. I will finalize all details and send the complete files over for your review shortly. Please let me know if any other urgent matters need my attention.`;
}
