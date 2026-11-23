import { NextResponse } from 'next/server';
import { routeHybridChat } from '@/lib/ai/hybrid-router';
import { isGeminiConfigured, getGeminiModel } from '@/lib/ai/gemini-provider';
import {
  isCloudflareChatConfigured,
  getCloudflareChatModel,
} from '@/lib/ai/cloudflare-provider';
import { ChatRequestPayload } from '@/lib/ai/types';
import { getSystemAISettingsAsync, checkUserAIQuota } from '@/lib/ai/system-ai-settings';

/**
 * GET /api/chat - Returns AI status, available providers, and caller's quota info
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const guestId = searchParams.get('guestId');
  const userId = searchParams.get('userId');
  const userEmail = searchParams.get('email');

  const settings = await getSystemAISettingsAsync();
  const quotaReached = settings.usedToday >= settings.dailyLimit;

  const geminiReady = settings.globalEnabled && settings.geminiEnabled && !quotaReached && isGeminiConfigured();
  const cfReady = settings.globalEnabled && settings.cloudflareEnabled && !quotaReached && isCloudflareChatConfigured();

  // Check quota for the specific requester
  const userQuota = await checkUserAIQuota({ userId, userEmail, guestId });

  return NextResponse.json({
    hybridEnabled: settings.globalEnabled && (geminiReady || cfReady),
    globalEnabled: settings.globalEnabled,
    quotaReached,
    userQuota: {
      limit: userQuota.limit,
      usedToday: userQuota.usedToday,
      remaining: userQuota.remaining,
      isGuest: userQuota.isGuest,
      guestLimit: settings.guestDailyLimit,
      userLimit: settings.userDailyLimit,
    },
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
 * POST /api/chat - SSE Stream Chat with Hybrid Failover and Per-User Quota Enforcement
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

    // Extract user/guest identity from payload or request headers
    const userId = payload.userId || request.headers.get('x-user-id') || undefined;
    const userEmail = payload.userEmail || request.headers.get('x-user-email') || undefined;
    const guestId = payload.guestId || request.headers.get('x-guest-id') || undefined;

    const mergedPayload: ChatRequestPayload = {
      ...payload,
      userId,
      userEmail,
      guestId,
    };

    // Pre-check quota before establishing SSE stream
    const quotaCheck = await checkUserAIQuota({ userId, userEmail, guestId });
    if (!quotaCheck.allowed) {
      return NextResponse.json(
        {
          error: quotaCheck.reason,
          code: quotaCheck.code,
          limit: quotaCheck.limit,
          usedToday: quotaCheck.usedToday,
          remaining: 0,
          isGuest: quotaCheck.isGuest,
        },
        { status: 429 }
      );
    }

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const event of routeHybridChat(mergedPayload)) {
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
