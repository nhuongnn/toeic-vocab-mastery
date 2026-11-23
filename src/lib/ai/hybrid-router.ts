import { buildSystemPrompt } from './system-prompt';
import {
  isGeminiConfigured,
  getGeminiModel,
  streamGemini,
} from './gemini-provider';
import {
  isCloudflareChatConfigured,
  getCloudflareChatModel,
  streamCloudflare,
} from './cloudflare-provider';
import {
  ChatRequestPayload,
  StreamEvent,
} from './types';
import { canUseProvider, checkUserAIQuota, recordUserAIUsage } from './system-ai-settings';

/**
 * Hybrid Router: Coordinates Gemini Flash (primary) and Cloudflare Workers AI (fallback).
 * Emits StreamEvents (meta, content, error, done) as SSE chunks.
 */
export async function* routeHybridChat(
  payload: ChatRequestPayload
): AsyncGenerator<StreamEvent, void, unknown> {
  const { messages, wordContext, providerPreference = 'auto', userId, userEmail, guestId } = payload;
  const systemPrompt = buildSystemPrompt(wordContext);

  // 1. Check user and system-wide AI quota limits
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

  // Explicit Cloudflare preference
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
    } catch (err: unknown) {
      console.warn('[Hybrid Router] Cloudflare preferred failed:', err);
      if (cfStartedYielding) {
        const msg = err instanceof Error ? err.message : String(err);
        yield { type: 'error', message: msg, provider: 'cloudflare' };
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
          reason: 'Cloudflare Workers AI gặp lỗi, tự động chuyển sang Google Gemini dự phòng.',
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
          yield { type: 'error', message: `Cả hai nhà cung cấp đều không phản hồi: ${msg}`, provider: 'gemini' };
          yield { type: 'done' };
          return;
        }
      }
      const msg = err instanceof Error ? err.message : String(err);
      yield { type: 'error', message: msg, provider: 'cloudflare' };
      yield { type: 'done' };
      return;
    }
  }

  // Explicit Gemini preference
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
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          yield { type: 'error', message: msg, provider: 'cloudflare' };
        }
        yield { type: 'done' };
        return;
      }
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
    } catch (err: unknown) {
      console.warn('[Hybrid Router] Gemini preferred failed:', err);
      if (geminiStartedYielding) {
        const msg = err instanceof Error ? err.message : String(err);
        yield { type: 'error', message: msg, provider: 'gemini' };
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
          reason: 'Gemini API gặp sự cố hoặc quá tải quota (503/429), tự động chuyển sang Cloudflare Workers AI.',
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
          yield { type: 'error', message: `Cả hai nhà cung cấp đều không phản hồi: ${msg}`, provider: 'cloudflare' };
          yield { type: 'done' };
          return;
        }
      }
      const msg = err instanceof Error ? err.message : String(err);
      yield { type: 'error', message: msg, provider: 'gemini' };
      yield { type: 'done' };
      return;
    }
  }

  // AUTO / HYBRID MODE (Primary: Gemini -> Fallback: Cloudflare)
  if (canUseGemini) {
    let geminiStartedYielding = false;
    try {
      const geminiGenerator = streamGemini(messages, systemPrompt);

      // Check first chunk to confirm Gemini successfully responded
      const firstResult = await geminiGenerator.next();

      if (!firstResult.done && firstResult.value) {
        geminiStartedYielding = true;
        recordUserAIUsage({ userId, userEmail, guestId, provider: 'gemini' });

        yield {
          type: 'meta',
          provider: 'gemini',
          model: getGeminiModel(),
          fallback: false,
        };
        yield { type: 'content', text: firstResult.value };

        for await (const chunk of geminiGenerator) {
          yield { type: 'content', text: chunk };
        }

        yield { type: 'done' };
        return;
      }
    } catch (geminiError: unknown) {
      const geminiErrMsg =
        geminiError instanceof Error ? geminiError.message : String(geminiError);
      console.warn(
        `[Hybrid Router] Gemini primary failed: ${geminiErrMsg}. Initiating fallback to Cloudflare Workers AI...`
      );

      // If Gemini failed AFTER already sending partial content to the user,
      // we report the error rather than restarting with a confusing duplicate stream.
      if (geminiStartedYielding) {
        yield {
          type: 'error',
          message: `Connection interrupted during Gemini streaming: ${geminiErrMsg}`,
          provider: 'gemini',
        };
        yield { type: 'done' };
        return;
      }
    }
  }

  // Fallback to Cloudflare Workers AI
  if (canUseCloudflare) {
    const reason = canUseGemini
      ? 'Gemini API gặp sự cố hoặc quá tải quota, tự động chuyển sang Cloudflare Workers AI (Llama 3.1).'
      : !canUseProvider('gemini')
      ? 'Mô hình Gemini tạm tắt trong hệ thống, tự động sử dụng Cloudflare Workers AI (Llama 3.1).'
      : 'Chưa cấu hình GEMINI_API_KEY, tự động sử dụng Cloudflare Workers AI (Llama 3.1).';

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
    } catch (cfError: unknown) {
      const cfErrMsg =
        cfError instanceof Error ? cfError.message : String(cfError);
      console.error('[Hybrid Router] Cloudflare fallback also failed:', cfErrMsg);
      yield {
        type: 'error',
        message: `Cả hai nhà cung cấp AI đều không phản hồi: ${cfErrMsg}`,
        provider: 'cloudflare',
      };
    }
  } else {
    yield {
      type: 'error',
      message:
        'Không có mô hình AI nào khả dụng. Vui lòng kiểm tra lại cấu hình hoặc liên hệ quản trị viên.',
    };
  }

  yield { type: 'done' };
}
