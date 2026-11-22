import { NextResponse } from 'next/server';
import { routeHybridRoleplayChat, RoleplayChatPayload } from '@/lib/roleplay/router';

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as RoleplayChatPayload;

    if (!payload || !Array.isArray(payload.messages) || !payload.character || !payload.scenario) {
      return NextResponse.json(
        { error: 'messages, character, and scenario are required fields' },
        { status: 400 }
      );
    }

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const event of routeHybridRoleplayChat(payload)) {
            const sseData = `data: ${JSON.stringify(event)}\n\n`;
            controller.enqueue(encoder.encode(sseData));
          }
        } catch (err: unknown) {
          const errMsg = err instanceof Error ? err.message : String(err);
          const errorEvent = { type: 'error', message: errMsg };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(errorEvent)}\n\n`));
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
    console.error('API /api/roleplay/chat error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}
