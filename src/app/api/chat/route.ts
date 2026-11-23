import { NextResponse } from 'next/server';
import { routeHybridChat } from '@/lib/ai/hybrid-router';
import { isGeminiConfigured, getGeminiModel } from '@/lib/ai/gemini-provider';
import {
  isCloudflareChatConfigured,
  getCloudflareChatModel,
} from '@/lib/ai/cloudflare-provider';
import { ChatRequestPayload } from '@/lib/ai/types';
import { getSystemAISettings } from '@/lib/ai/system-ai-settings';

/**
 * GET /api/chat - Returns AI status and available providers
 */
export async function GET() {
  const { globalEnabled, geminiEnabled, cloudflareEnabled, usedToday, dailyLimit } = getSystemAISettings();
  const quotaReached = usedToday >= dailyLimit;

  const geminiReady = globalEnabled && geminiEnabled && !quotaReached && isGeminiConfigured();
  const cfReady = globalEnabled && cloudflareEnabled && !quotaReached && isCloudflareChatConfigured();

  return NextResponse.json({
    hybridEnabled: globalEnabled && (geminiReady || cfReady),
    globalEnabled,
    quotaReached,
    providers: {
      gemini: {
        available: geminiReady,
        model: getGeminiModel(),
        role: geminiReady ? 'primary' : 'disabled',
      },
      cloudflare: {
        available: cfReady,
        model: getCloudflareChatModel(),
        role: geminiReady ? 'fallback' : cfReady ? 'primary' : 'disabled',
      },
    },
    defaultStrategy: geminiReady
      ? 'gemini_primary_with_cf_fallback'
      : cfReady
      ? 'cloudflare_fallback_only'
      : 'unconfigured',
  });
}

/**
 * POST /api/chat - SSE Stream Chat with Hybrid Failover
 */
export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ChatRequestPayload;

    if (
      !payload ||
      !Array.isArray(payload.messages) ||
      payload.messages.length === 0
    ) {
      return NextResponse.json(
        { error: 'Messages array is required and must not be empty' },
        { status: 400 }
      );
    }

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const event of routeHybridChat(payload)) {
            const sseData = `data: ${JSON.stringify(event)}\n\n`;
            controller.enqueue(encoder.encode(sseData));
          }
        } catch (err: unknown) {
          const errMsg = err instanceof Error ? err.message : String(err);
          const errorEvent = { type: 'error', message: errMsg };
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(errorEvent)}\n\n`)
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (error: unknown) {
    console.error('API /api/chat error:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}
