import { NextRequest, NextResponse } from 'next/server';
import { sendNotification, setVapidDetails } from 'web-push';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import {
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY,
  VAPID_SUBJECT,
} from '@/lib/notifications/vapidKeys';
import { DEFAULT_CHARACTERS, PRESET_SCENARIOS } from '@/lib/roleplay/scenarios';
import {
  CharacterRole,
  RoleplayConversation,
  RoleplayMessage,
} from '@/types/roleplay';
import { UserProgressData } from '@/types/progress';
import {
  AutoChatSettings,
  normalizeIntervalMinutes,
} from '@/types/auto-chat';
import { routeHybridRoleplayChat } from '@/lib/roleplay/router';
import { buildAutoChatTurnPrompt } from '@/lib/roleplay/ai-prompt';
import {
  buildDailyAutoConversation,
  findTodayAutoChatConversation,
} from '@/lib/auto-chat/conversation-manager';
import { MAX_CHAT_ROOM_CONVERSATIONS } from '@/lib/roleplay/history';
import { DEFAULT_PROGRESS } from '@/lib/storage';
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
  const explicitScenario =
    scenarioId !== 'random'
      ? PRESET_SCENARIOS.find((s) => s.id === scenarioId)
      : undefined;

  const roles = Object.keys(DEFAULT_CHARACTERS) as CharacterRole[];
  const role: CharacterRole =
    characterRole !== 'random' && DEFAULT_CHARACTERS[characterRole as CharacterRole]
      ? (characterRole as CharacterRole)
      : explicitScenario
      ? explicitScenario.role
      : roles[Math.floor(Math.random() * roles.length)];

  const character = DEFAULT_CHARACTERS[role];

  const matching = PRESET_SCENARIOS.filter((s) => s.role === role);
  const scenario =
    explicitScenario && (characterRole === 'random' || explicitScenario.role === role)
      ? explicitScenario
      : matching.length > 0
      ? matching[Math.floor(Math.random() * matching.length)]
      : PRESET_SCENARIOS[Math.floor(Math.random() * PRESET_SCENARIOS.length)];

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

    const force = req.nextUrl.searchParams.get('force') === '1';

    let sentCount = 0;
    let failedCount = 0;
    const diagnostics = {
      matchedUsers: settingsList.length,
      skippedWindow: 0,
      skippedInterval: 0,
      skippedNoSub: 0,
      skippedQuota: 0,
      skippedAIError: 0,
      lastPushError: null as string | null,
    };

    for (const row of settingsList) {
      const tz = row.timezone || 'Asia/Ho_Chi_Minh';
      const currentMinutes = getMinutesInTimezone(now, tz);
      if (!isWithinWindow(currentMinutes, row.start_time || '08:00', row.end_time || '22:00')) {
        diagnostics.skippedWindow++;
        continue;
      }

      const intervalMs = normalizeIntervalMinutes(row.interval_minutes) * 60 * 1000;
      if (!force && row.last_sent_at) {
        const elapsed = now.getTime() - new Date(row.last_sent_at).getTime();
        if (elapsed < intervalMs) {
          diagnostics.skippedInterval++;
          continue;
        }
      }

      const { data: subs } = await dbClient
        .from('push_subscriptions')
        .select('*')
        .eq('user_id', row.user_id);

      if (!subs || subs.length === 0) {
        diagnostics.skippedNoSub++;
        continue;
      }

      const quotaCheck = await checkUserAIQuota({ userId: row.user_id });
      if (!quotaCheck.allowed) {
        diagnostics.skippedQuota++;
        continue;
      }

      const { data: progressRow, error: progressFetchError } = await dbClient
        .from('user_progress')
        .select('data')
        .eq('user_id', row.user_id)
        .maybeSingle();

      const progressData = (progressRow?.data || {}) as Partial<UserProgressData>;
      const existingHistory: RoleplayConversation[] = Array.isArray(
        progressData.roleplay?.chatHistory
      )
        ? progressData.roleplay.chatHistory
        : [];

      const userChatSettings: Pick<AutoChatSettings, 'characterRole' | 'scenarioId'> = {
        characterRole: (row.character_role || 'random') as AutoChatSettings['characterRole'],
        scenarioId: row.scenario_id || 'random',
      };

      const existingTodayConv = findTodayAutoChatConversation(
        existingHistory,
        userChatSettings,
        now,
        tz
      );

      const nowMs = now.getTime();
      const targetConv: RoleplayConversation = existingTodayConv
        ? existingTodayConv
        : (() => {
            const picked = pickCharacterAndScenario(
              userChatSettings.characterRole,
              userChatSettings.scenarioId
            );
            return buildDailyAutoConversation(
              picked.character,
              picked.scenario,
              progressData.roleplay?.userAvatar || 'shiba-intern',
              progressData.roleplay?.userName || 'Bạn',
              now,
              tz
            );
          })();

      const { character, scenario } = targetConv;

      let messageContent = '';
      let aiProvider: 'gemini' | 'cloudflare' = 'gemini';
      try {
        for await (const event of routeHybridRoleplayChat({
          messages: [
            {
              role: 'user',
              content: buildAutoChatTurnPrompt(
                character,
                scenario,
                targetConv.messages || [],
                targetConv.userName || progressData.roleplay?.userName
              ),
            },
          ],
          character,
          scenario,
          userContext: {
            targetScore: progressData.onboarding?.targetScore || 650,
            totalWordsLearned: Object.keys(progressData.cards || {}).length,
          },
          providerPreference: 'auto',
          isAutoProactive: true,
          userId: row.user_id,
        })) {
          if (event.type === 'content') {
            messageContent += event.text;
          } else if (event.type === 'meta' && event.provider) {
            aiProvider = event.provider;
          }
        }
      } catch (aiErr) {
        console.warn('Auto-chat cron AI generation error:', aiErr);
        diagnostics.skippedAIError++;
        continue;
      }

      const trimmedContent = messageContent.trim();
      if (!trimmedContent) {
        diagnostics.skippedAIError++;
        continue;
      }

      const payloadString = JSON.stringify({
        title: `💬 ${character.name}`,
        body: trimmedContent.slice(0, 180),
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
          const pushErr = err as { statusCode?: number; body?: string; message?: string };
          const statusCode = pushErr?.statusCode;
          diagnostics.lastPushError = `${statusCode ?? 'ERR'}: ${pushErr?.body || pushErr?.message || String(err)}`;
          console.error('Auto-chat web-push error:', diagnostics.lastPushError);
          // Remove expired (404, 410) or VAPID-mismatched (403) subscriptions
          if (statusCode === 403 || statusCode === 404 || statusCode === 410) {
            await dbClient
              .from('push_subscriptions')
              .delete()
              .eq('endpoint', sub.endpoint);
          }
        }
      }

      if (deliveredToAny) {
        const newMsg: RoleplayMessage = {
          id: `auto-${nowMs}`,
          role: 'assistant',
          content: trimmedContent,
          timestamp: nowMs,
          provider: aiProvider,
        };
        const nextMessages = [...(targetConv.messages || []), newMsg];
        const updatedConv: RoleplayConversation = {
          ...targetConv,
          messages: nextMessages,
          updatedAt: nowMs,
          messageCount: nextMessages.length,
          lastMessageSnippet: trimmedContent.slice(0, 120),
        };
        const updatedHistory = [
          updatedConv,
          ...existingHistory.filter((c) => c?.id !== updatedConv.id),
        ]
          .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
          .slice(0, MAX_CHAT_ROOM_CONVERSATIONS);

        if (!progressFetchError) {
          const baseProgress = progressRow?.data ? progressData : DEFAULT_PROGRESS;
          const updatedProgressData: Partial<UserProgressData> = {
            ...baseProgress,
            roleplay: {
              ...(progressData.roleplay || {}),
              chatHistory: updatedHistory,
              updatedAt: now.toISOString(),
            },
          };
          await dbClient
            .from('user_progress')
            .upsert({
              user_id: row.user_id,
              data: updatedProgressData,
              updated_at: now.toISOString(),
            });
        }

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
      diagnostics,
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
