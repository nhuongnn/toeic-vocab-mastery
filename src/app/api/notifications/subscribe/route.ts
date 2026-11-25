import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';

const dbClient = supabaseAdmin || supabase;

export async function POST(req: NextRequest) {
  try {
    const { userId, subscription } = await req.json();

    if (!subscription || !subscription.endpoint || !subscription.keys) {
      return NextResponse.json(
        { error: 'Invalid subscription object' },
        { status: 400 }
      );
    }

    const userAgent = req.headers.get('user-agent') || '';

    // If Supabase is connected and userId is a valid UUID, persist to DB
    if (dbClient && userId && userId !== 'anonymous') {
      const { error } = await dbClient.from('push_subscriptions').upsert(
        {
          user_id: userId,
          endpoint: subscription.endpoint,
          keys: subscription.keys,
          user_agent: userAgent,
          last_used_at: new Date().toISOString(),
        },
        { onConflict: 'user_id, endpoint' }
      );

      if (error) {
        console.error('Failed to save push subscription:', error);
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
}
