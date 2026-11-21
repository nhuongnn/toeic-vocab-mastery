import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import {
  DEFAULT_NOTIFICATION_PREFERENCES,
  sortReminderTimes,
} from '@/lib/notifications/notificationScheduler';

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId');

    if (!userId || !supabase) {
      return NextResponse.json(DEFAULT_NOTIFICATION_PREFERENCES);
    }

    const { data, error } = await supabase
      .from('notification_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error || !data) {
      return NextResponse.json(DEFAULT_NOTIFICATION_PREFERENCES);
    }

    const rawTimes = Array.isArray(data.daily_reminder_times) && data.daily_reminder_times.length > 0
      ? data.daily_reminder_times
      : (data.daily_reminder_time ? [data.daily_reminder_time] : DEFAULT_NOTIFICATION_PREFERENCES.dailyReminderTimes);

    const sortedTimes = sortReminderTimes(rawTimes);

    return NextResponse.json({
      dailyReminderEnabled: data.daily_reminder_enabled ?? true,
      dailyReminderTime: sortedTimes[0] || data.daily_reminder_time || '08:00',
      dailyReminderTimes: sortedTimes,
      streakWarningEnabled: data.streak_warning_enabled ?? true,
      streakWarningTime: data.streak_warning_time || '20:00',
      weeklySummaryEnabled: data.weekly_summary_enabled ?? true,
      srsDueReminderEnabled: data.srs_due_reminder_enabled ?? true,
      milestoneEnabled: data.milestone_enabled ?? true,
      timezone: data.timezone || 'Asia/Ho_Chi_Minh',
    });
  } catch (error) {
    console.error('Error fetching preferences:', error);
    return NextResponse.json(DEFAULT_NOTIFICATION_PREFERENCES);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId, preferences } = await req.json();

    if (!userId || !preferences) {
      return NextResponse.json({ error: 'Missing required data' }, { status: 400 });
    }

    if (supabase) {
      const rawTimes = Array.isArray(preferences.dailyReminderTimes) && preferences.dailyReminderTimes.length > 0
        ? preferences.dailyReminderTimes
        : (preferences.dailyReminderTime ? [preferences.dailyReminderTime] : ['08:00']);

      const sortedTimes = sortReminderTimes(rawTimes);

      const upsertData: Record<string, unknown> = {
        user_id: userId,
        daily_reminder_enabled: preferences.dailyReminderEnabled,
        daily_reminder_time: sortedTimes[0] || '08:00',
        daily_reminder_times: sortedTimes,
        streak_warning_enabled: preferences.streakWarningEnabled,
        streak_warning_time: preferences.streakWarningTime,
        weekly_summary_enabled: preferences.weeklySummaryEnabled,
        srs_due_reminder_enabled: preferences.srsDueReminderEnabled,
        milestone_enabled: preferences.milestoneEnabled,
        timezone: preferences.timezone || 'Asia/Ho_Chi_Minh',
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('notification_preferences')
        .upsert(upsertData, { onConflict: 'user_id' });

      // If the table doesn't have daily_reminder_times column yet, retry without it
      if (error && error.message && error.message.includes('daily_reminder_times')) {
        delete upsertData.daily_reminder_times;
        await supabase
          .from('notification_preferences')
          .upsert(upsertData, { onConflict: 'user_id' });
      }
    }

    return NextResponse.json({ success: true, message: 'Preferences updated' });
  } catch (error) {
    console.error('Error saving preferences:', error);
    return NextResponse.json(
      { error: 'Failed to update preferences' },
      { status: 500 }
    );
  }
}
