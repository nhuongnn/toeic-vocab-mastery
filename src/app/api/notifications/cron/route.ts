import { NextRequest, NextResponse } from 'next/server';
import { sendNotification, setVapidDetails } from 'web-push';
import { supabase } from '@/lib/supabase';
import { VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT } from '@/lib/notifications/vapidKeys';
import { getDailyReminderContent, getNotificationContent } from '@/lib/notifications/notificationTemplates';

try {
  setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
} catch (err) {
  console.warn('VAPID setup notice:', err);
}

function getFormattedTimeInTimezone(date: Date, timezone: string): { timeStr: string; totalMinutes: number } {
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
    const timeStr = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    return { timeStr, totalMinutes: hour * 60 + minute };
  } catch {
    const hour = date.getHours();
    const minute = date.getMinutes();
    return {
      timeStr: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      totalMinutes: hour * 60 + minute,
    };
  }
}

export async function GET(req: NextRequest) {
  return handleCron(req);
}

export async function POST(req: NextRequest) {
  return handleCron(req);
}

async function handleCron(req: NextRequest) {
  try {
    // Optional CRON security token check if CRON_SECRET is configured in env
    const cronSecret = process.env.CRON_SECRET;
    if (cronSecret) {
      const authHeader = req.headers.get('authorization');
      const paramSecret = req.nextUrl.searchParams.get('secret');
      const provided = authHeader ? authHeader.replace(/^Bearer\s+/i, '') : paramSecret;
      if (provided !== cronSecret) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    if (!supabase) {
      return NextResponse.json({
        success: false,
        message: 'Supabase client is not configured',
      });
    }

    const now = new Date();

    // Query active preferences
    const { data: prefsList, error: prefsError } = await supabase
      .from('notification_preferences')
      .select('*')
      .or('daily_reminder_enabled.eq.true,streak_warning_enabled.eq.true');

    if (prefsError || !prefsList) {
      return NextResponse.json({
        error: 'Failed to fetch preferences',
        details: prefsError?.message,
      }, { status: 500 });
    }

    let sentCount = 0;
    let failedCount = 0;
    const actionsTaken: Array<{ userId: string; type: string; time: string; success: boolean }> = [];

    for (const pref of prefsList) {
      const tz = pref.timezone || 'Asia/Ho_Chi_Minh';
      const { timeStr: userTimeStr, totalMinutes: userTotalMinutes } = getFormattedTimeInTimezone(now, tz);

      // Check daily reminder times
      let matchedDailySlot: string | null = null;
      if (pref.daily_reminder_enabled) {
        const slots: string[] = Array.isArray(pref.daily_reminder_times) && pref.daily_reminder_times.length > 0
          ? pref.daily_reminder_times
          : (pref.daily_reminder_time ? [pref.daily_reminder_time] : ['08:00']);

        for (const slot of slots) {
          const [sh, sm] = slot.split(':').map((v: string) => parseInt(v, 10));
          if (!isNaN(sh) && !isNaN(sm)) {
            const slotTotalMinutes = sh * 60 + sm;
            // Within 5 minutes window
            if (Math.abs(userTotalMinutes - slotTotalMinutes) <= 5) {
              matchedDailySlot = slot;
              break;
            }
          }
        }
      }

      // Check streak warning
      let matchedStreak = false;
      if (pref.streak_warning_enabled && pref.streak_warning_time) {
        const [swh, swm] = (pref.streak_warning_time as string).split(':').map((v: string) => parseInt(v, 10));
        if (!isNaN(swh) && !isNaN(swm)) {
          const streakTotalMinutes = swh * 60 + swm;
          if (Math.abs(userTotalMinutes - streakTotalMinutes) <= 5) {
            matchedStreak = true;
          }
        }
      }

      if (!matchedDailySlot && !matchedStreak) {
        continue;
      }

      // Get subscriptions for this user
      const { data: subs, error: subsError } = await supabase
        .from('push_subscriptions')
        .select('*')
        .eq('user_id', pref.user_id);

      if (subsError || !subs || subs.length === 0) {
        continue;
      }

      // Determine payload
      const payload = matchedDailySlot
        ? getDailyReminderContent(matchedDailySlot)
        : getNotificationContent('streak_warning');

      const payloadString = JSON.stringify(payload);

      for (const sub of subs) {
        try {
          const pushSubscription = {
            endpoint: sub.endpoint,
            keys: sub.keys,
          };
          await sendNotification(pushSubscription, payloadString);
          sentCount++;
          actionsTaken.push({
            userId: pref.user_id,
            type: matchedDailySlot ? 'daily_reminder' : 'streak_warning',
            time: matchedDailySlot || pref.streak_warning_time,
            success: true,
          });
        } catch (err: unknown) {
          failedCount++;
          const errorStatus = (err as { statusCode?: number })?.statusCode;
          // Unsubscribe expired endpoints (404, 410)
          if (errorStatus === 404 || errorStatus === 410) {
            await supabase
              .from('push_subscriptions')
              .delete()
              .eq('endpoint', sub.endpoint);
          }
          actionsTaken.push({
            userId: pref.user_id,
            type: matchedDailySlot ? 'daily_reminder' : 'streak_warning',
            time: matchedDailySlot || pref.streak_warning_time,
            success: false,
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      sentCount,
      failedCount,
      actionsTaken,
      serverTime: now.toISOString(),
    });
  } catch (error) {
    console.error('Notification cron error:', error);
    return NextResponse.json(
      { error: 'Internal cron execution failure' },
      { status: 500 }
    );
  }
}
