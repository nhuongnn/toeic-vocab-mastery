import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { endpoint } = await req.json();

    if (!endpoint) {
      return NextResponse.json({ error: 'Missing endpoint' }, { status: 400 });
    }

    if (supabase) {
      await supabase.from('push_subscriptions').delete().eq('endpoint', endpoint);
    }

    return NextResponse.json({ success: true, message: 'Unsubscribed successfully' });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to process unsubscribe' },
      { status: 500 }
    );
  }
}
