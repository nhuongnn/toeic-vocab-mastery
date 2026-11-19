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

/**
 * Hybrid Router: Coordinates Gemini Flash (primary) and Cloudflare Workers AI (fallback).
 * Emits StreamEvents (meta, content, error, done) as SSE chunks.
 */
export async function* routeHybridChat(
  payload: ChatRequestPayload
): AsyncGenerator<StreamEvent, void, unknown> {
  const { messages, wordContext, providerPreference = 'auto' } = payload;
  const systemPrompt = buildSystemPrompt(wordContext);

  const canUseGemini = isGeminiConfigured();
  const canUseCloudflare = isCloudflareChatConfigured();

  // Explicit Cloudflare preference
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

  // Explicit Gemini preference
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

  // AUTO / HYBRID MODE (Primary: Gemini -> Fallback: Cloudflare)
  if (canUseGemini) {
    let geminiStartedYielding = false;
    try {
      const geminiGenerator = streamGemini(messages, systemPrompt);

      // Check first chunk to confirm Gemini successfully responded
      const firstResult = await geminiGenerator.next();

      if (!firstResult.done && firstResult.value) {
        geminiStartedYielding = true;
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
      : 'Chưa cấu hình GEMINI_API_KEY, tự động sử dụng Cloudflare Workers AI (Llama 3.1).';

    yield {
      type: 'meta',
      provider: 'cloudflare',
      model: getCloudflareChatModel(),
      fallback: true,
      reason,
    };

    try {
      for await (const chunk of streamCloudflare(messages, systemPrompt)) {
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
        'Hệ thống AI chưa được cấu hình. Vui lòng thêm GEMINI_API_KEY hoặc Cloudflare credentials vào .env.local.',
    };
  }

  yield { type: 'done' };
}
