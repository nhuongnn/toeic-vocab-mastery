import { NextRequest, NextResponse } from 'next/server';
import { sendNotification, setVapidDetails } from 'web-push';
import { VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT } from '@/lib/notifications/vapidKeys';

setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

export async function POST(req: NextRequest) {
  try {
    const { subscription, payload } = await req.json();

    if (!subscription || !payload) {
      return NextResponse.json(
        { error: 'Subscription and payload are required' },
        { status: 400 }
      );
    }

    const payloadString = JSON.stringify(payload);

    await sendNotification(subscription, payloadString);

    return NextResponse.json({ success: true, message: 'Notification delivered' });
  } catch (error) {
    console.error('Error sending push notification:', error);
    return NextResponse.json(
      { error: 'Failed to deliver notification' },
      { status: 500 }
    );
  }
}
