import { NextRequest, NextResponse } from 'next/server';
import { routeHybridRoleplayChat, RoleplayChatPayload } from '@/lib/roleplay/router';
import { buildAutoChatTurnPrompt } from '@/lib/roleplay/ai-prompt';
import { checkUserAIQuota } from '@/lib/ai/system-ai-settings';
import { supabase, supabaseAdmin } from '@/lib/supabase';

const dbClient = supabaseAdmin || supabase;

const MAX_DAILY_AUTO_MESSAGES = 100;
const dailyAutoMessageCounts = new Map<string, number>();

function getDailyRateKey(userId: string): string {
  const today = new Date().toISOString().slice(0, 10);
  return `${userId}:${today}`;
}

function checkAndIncrementDailyLimit(userId: string): boolean {
  const key = getDailyRateKey(userId);
  const current = dailyAutoMessageCounts.get(key) ?? 0;
  if (current >= MAX_DAILY_AUTO_MESSAGES) {
    return false;
  }
  dailyAutoMessageCounts.set(key, current + 1);
  return true;
}

/**
 * API để hệ thống tự động gửi tin nhắn từ nhân vật AI.
 * Khác với /api/roleplay/chat thông thường:
 * - Không cần user message mới
 * - AI tự chủ động gửi tin nhắn tiếp theo (proactive message)
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const headerUserId = req.headers.get('x-user-id');
    const userId = headerUserId || body.userId;
    const userEmail = req.headers.get('x-user-email') || body.userEmail;
    const { character, scenario, chatHistory = [], userContext, userName } = body;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!character || !scenario) {
      return NextResponse.json(
        { error: 'character and scenario are required' },
        { status: 400 }
      );
    }

    // Rate limit: tối đa 100 auto-messages/ngày/user
    if (!checkAndIncrementDailyLimit(userId)) {
      return NextResponse.json(
        {
          error: 'Đã đạt giới hạn 100 tin nhắn tự động hôm nay.',
          code: 'DAILY_AUTO_CHAT_LIMIT',
        },
        { status: 429 }
      );
    }

    // Kiểm tra quota AI
    const quotaCheck = await checkUserAIQuota({ userId, userEmail });
    if (!quotaCheck.allowed) {
      return NextResponse.json(
        { error: quotaCheck.reason, code: quotaCheck.code },
        { status: 429 }
      );
    }

    // Xây dựng directive message duy nhất với transcript được gắn nhãn rõ ràng
    // để AI không bị nhầm lẫn tự trả lời câu hỏi trước đó của chính mình
    const turnPrompt = buildAutoChatTurnPrompt(
      character,
      scenario,
      Array.isArray(chatHistory) ? chatHistory : [],
      typeof userName === 'string' ? userName : undefined
    );

    const payload: RoleplayChatPayload = {
      messages: [{ role: 'user', content: turnPrompt }],
      character,
      scenario,
      userContext,
      providerPreference: 'auto',
      isAutoProactive: true,
      userId,
      userEmail,
    };

    let fullContent = '';
    let provider: string = 'gemini';
    let streamError: { message: string; code?: string } | null = null;

    for await (const event of routeHybridRoleplayChat(payload)) {
      if (event.type === 'content') {
        fullContent += event.text;
      } else if (event.type === 'meta' && event.provider) {
        provider = event.provider;
      } else if (event.type === 'error') {
        streamError = { message: event.message, code: event.code };
      }
    }

    if (!fullContent && streamError) {
      const status = streamError.code ? 429 : 500;
      return NextResponse.json(
        { error: streamError.message, code: streamError.code },
        { status }
      );
    }

    if (fullContent.trim() && dbClient) {
      const nowIso = new Date().toISOString();
      await dbClient
        .from('auto_chat_settings')
        .update({ last_sent_at: nowIso, updated_at: nowIso })
        .eq('user_id', userId);
    }

    return NextResponse.json({
      content: fullContent,
      provider,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Auto-chat send error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}
