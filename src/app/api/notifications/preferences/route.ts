import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { DEFAULT_NOTIFICATION_PREFERENCES } from '@/lib/notifications/notificationScheduler';

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

    return NextResponse.json({
      dailyReminderEnabled: data.daily_reminder_enabled,
      dailyReminderTime: data.daily_reminder_time,
      streakWarningEnabled: data.streak_warning_enabled,
      streakWarningTime: data.streak_warning_time,
      weeklySummaryEnabled: data.weekly_summary_enabled,
      srsDueReminderEnabled: data.srs_due_reminder_enabled,
      milestoneEnabled: data.milestone_enabled,
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
      await supabase.from('notification_preferences').upsert(
        {
          user_id: userId,
          daily_reminder_enabled: preferences.dailyReminderEnabled,
          daily_reminder_time: preferences.dailyReminderTime,
          streak_warning_enabled: preferences.streakWarningEnabled,
          streak_warning_time: preferences.streakWarningTime,
          weekly_summary_enabled: preferences.weeklySummaryEnabled,
          srs_due_reminder_enabled: preferences.srsDueReminderEnabled,
          milestone_enabled: preferences.milestoneEnabled,
          timezone: preferences.timezone,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
      );
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
