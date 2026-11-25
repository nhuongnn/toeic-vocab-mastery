import { NextRequest, NextResponse } from 'next/server';
import { sendNotification, setVapidDetails } from 'web-push';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import {
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY,
  VAPID_SUBJECT,
} from '@/lib/notifications/vapidKeys';
import { DEFAULT_CHARACTERS, PRESET_SCENARIOS } from '@/lib/roleplay/scenarios';
import { CharacterRole } from '@/types/roleplay';
import { routeHybridRoleplayChat } from '@/lib/roleplay/router';
import { checkUserAIQuota } from '@/lib/ai/system-ai-settings';

try {
  setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
} catch (err) {
  console.warn('VAPID setup notice:', err);
}

const dbClient = supabaseAdmin || supabase;

function getMinutesInTimezone(date: Date, timezone: string): number {
  try {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const parts = formatter.formatToParts(date);
    const hour = parseInt(parts.find((p) => p.type === 'hour')?.value || '0', 10);
    const minute = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
    return hour * 60 + minute;
  } catch {
    return date.getHours() * 60 + date.getMinutes();
  }
}

function isWithinWindow(
  currentMinutes: number,
  startTime: string,
  endTime: string
): boolean {
  const [sh, sm] = startTime.split(':').map(Number);
  const [eh, em] = endTime.split(':').map(Number);
  if ([sh, sm, eh, em].some((v) => Number.isNaN(v))) return false;
  const startMinutes = sh * 60 + sm;
  const endMinutes = eh * 60 + em;
  if (startMinutes <= endMinutes) {
    return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
  }
  return currentMinutes >= startMinutes || currentMinutes <= endMinutes;
}

function pickCharacterAndScenario(characterRole: string, scenarioId: string) {
  const roles = Object.keys(DEFAULT_CHARACTERS) as CharacterRole[];
  const role: CharacterRole =
    characterRole !== 'random' && DEFAULT_CHARACTERS[characterRole as CharacterRole]
      ? (characterRole as CharacterRole)
      : roles[Math.floor(Math.random() * roles.length)];

  const character = DEFAULT_CHARACTERS[role];
  const explicitScenario =
    scenarioId !== 'random'
      ? PRESET_SCENARIOS.find((s) => s.id === scenarioId)
      : undefined;

  const matching = PRESET_SCENARIOS.filter((s) => s.role === role);
  const scenario =
    explicitScenario ||
    (matching.length > 0
      ? matching[Math.floor(Math.random() * matching.length)]
      : PRESET_SCENARIOS[Math.floor(Math.random() * PRESET_SCENARIOS.length)]);

  return { character, scenario };
}

export async function GET(req: NextRequest) {
  return handleAutoChatCron(req);
}

export async function POST(req: NextRequest) {
  return handleAutoChatCron(req);
}

async function handleAutoChatCron(req: NextRequest) {
  try {
    const cronSecret = process.env.CRON_SECRET;
    if (cronSecret) {
      const authHeader = req.headers.get('authorization');
      const paramSecret = req.nextUrl.searchParams.get('secret');
      const provided = authHeader ? authHeader.replace(/^Bearer\s+/i, '') : paramSecret;
      if (provided !== cronSecret) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    if (!dbClient) {
      return NextResponse.json({
        success: false,
        message: 'Supabase client is not configured',
      });
    }

    const now = new Date();
    const { data: settingsList, error } = await dbClient
      .from('auto_chat_settings')
      .select('*')
      .eq('enabled', true)
      .eq('push_enabled', true);

    if (error || !settingsList) {
      return NextResponse.json(
        { error: 'Failed to fetch auto_chat_settings', details: error?.message },
        { status: 500 }
      );
    }

    let sentCount = 0;
    let failedCount = 0;

    for (const row of settingsList) {
      const tz = row.timezone || 'Asia/Ho_Chi_Minh';
      const currentMinutes = getMinutesInTimezone(now, tz);
      if (!isWithinWindow(currentMinutes, row.start_time || '08:00', row.end_time || '22:00')) {
        continue;
      }

      const intervalMs = Math.max(10, Number(row.interval_minutes || 30)) * 60 * 1000;
      if (row.last_sent_at) {
        const elapsed = now.getTime() - new Date(row.last_sent_at).getTime();
        if (elapsed < intervalMs) {
          continue;
        }
      }

      const { data: subs } = await dbClient
        .from('push_subscriptions')
        .select('*')
        .eq('user_id', row.user_id);

      if (!subs || subs.length === 0) {
        continue;
      }

      const quotaCheck = await checkUserAIQuota({ userId: row.user_id });
      if (!quotaCheck.allowed) {
        continue;
      }

      const { character, scenario } = pickCharacterAndScenario(
        row.character_role || 'random',
        row.scenario_id || 'random'
      );

      let messageContent = '';
      try {
        for await (const event of routeHybridRoleplayChat({
          messages: [
            {
              role: 'user',
              content:
                '[System: Hãy gửi một tin nhắn ngắn gọn, tự nhiên bằng tiếng Anh (1-2 câu) để hỏi thăm hoặc gợi mở cuộc trò chuyện với người dùng.]',
            },
          ],
          character,
          scenario,
          providerPreference: 'auto',
          userId: row.user_id,
        })) {
          if (event.type === 'content') {
            messageContent += event.text;
          }
        }
      } catch (aiErr) {
        console.warn('Auto-chat cron AI generation error:', aiErr);
        continue;
      }

      if (!messageContent.trim()) {
        continue;
      }

      const payloadString = JSON.stringify({
        title: `💬 ${character.name}`,
        body: messageContent.trim().slice(0, 180),
        tag: 'auto-chat-bubble',
        url: '/?openChatBubble=1',
        actions: [
          { action: 'reply', title: '💬 Trả lời ngay' },
          { action: 'dismiss', title: 'Đóng' },
        ],
      });

      let deliveredToAny = false;
      for (const sub of subs) {
        try {
          await sendNotification(
            { endpoint: sub.endpoint, keys: sub.keys },
            payloadString
          );
          sentCount++;
          deliveredToAny = true;
        } catch (err: unknown) {
          failedCount++;
          const statusCode = (err as { statusCode?: number })?.statusCode;
          if (statusCode === 404 || statusCode === 410) {
            await dbClient
              .from('push_subscriptions')
              .delete()
              .eq('endpoint', sub.endpoint);
          }
        }
      }

      if (deliveredToAny) {
        await dbClient
          .from('auto_chat_settings')
          .update({ last_sent_at: now.toISOString(), updated_at: now.toISOString() })
          .eq('user_id', row.user_id);
      }
    }

    return NextResponse.json({
      success: true,
      sentCount,
      failedCount,
      serverTime: now.toISOString(),
    });
  } catch (error) {
    console.error('Auto-chat cron error:', error);
    return NextResponse.json(
      { error: 'Internal auto-chat cron failure' },
      { status: 500 }
    );
  }
}
