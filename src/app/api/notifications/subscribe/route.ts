import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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
    if (supabase && userId && userId !== 'anonymous') {
      await supabase.from('push_subscriptions').upsert(
        {
          user_id: userId,
          endpoint: subscription.endpoint,
          keys: subscription.keys,
          user_agent: userAgent,
          last_used_at: new Date().toISOString(),
        },
        { onConflict: 'user_id, endpoint' }
      );
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
