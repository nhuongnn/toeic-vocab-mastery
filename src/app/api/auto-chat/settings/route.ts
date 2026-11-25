import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';

const dbClient = supabaseAdmin || supabase;

export async function GET(req: NextRequest) {
  const userId = req.headers.get('x-user-id');
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!dbClient) {
    return NextResponse.json({});
  }

  const { data, error } = await dbClient
    .from('auto_chat_settings')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({});
  }

  return NextResponse.json({
    enabled: data.enabled,
    pushEnabled: data.push_enabled ?? true,
    startTime: data.start_time,
    endTime: data.end_time,
    intervalMinutes: data.interval_minutes,
    characterRole: data.character_role,
    scenarioId: data.scenario_id,
    timezone: data.timezone,
  });
}

export async function PUT(req: NextRequest) {
  const userId = req.headers.get('x-user-id');
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!dbClient) {
    return NextResponse.json({ success: false });
  }

  const body = await req.json();
  const rawInterval = Number(body.intervalMinutes ?? 30);
  const intervalMinutes = Number.isFinite(rawInterval) && rawInterval >= 10 ? rawInterval : 30;

  const { error } = await dbClient
    .from('auto_chat_settings')
    .upsert(
      {
        user_id: userId,
        enabled: Boolean(body.enabled ?? false),
        push_enabled: body.pushEnabled !== false,
        start_time: body.startTime ?? '08:00',
        end_time: body.endTime ?? '22:00',
        interval_minutes: intervalMinutes,
        character_role: body.characterRole ?? 'random',
        scenario_id: body.scenarioId ?? 'random',
        timezone: body.timezone ?? 'Asia/Ho_Chi_Minh',
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
