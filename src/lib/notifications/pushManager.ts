import { VAPID_PUBLIC_KEY, urlBase64ToUint8Array } from './vapidKeys';

export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window && 'serviceWorker' in navigator;
}

export function getNotificationPermission(): NotificationPermission {
  if (!isNotificationSupported()) return 'denied';
  return Notification.permission;
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!isNotificationSupported()) return 'denied';
  return await Notification.requestPermission();
}

export async function getCurrentPushSubscription(): Promise<PushSubscription | null> {
  if (!isNotificationSupported()) return null;
  try {
    const registration = await navigator.serviceWorker.ready;
    return await registration.pushManager.getSubscription();
  } catch (error) {
    console.warn('Error fetching push subscription:', error);
    return null;
  }
}

export async function subscribeToPush(userId?: string): Promise<PushSubscription | null> {
  if (!isNotificationSupported()) return null;

  try {
    const permission = await requestNotificationPermission();
    if (permission !== 'granted') return null;

    const registration = await navigator.serviceWorker.ready;
    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      const convertedKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedKey as unknown as BufferSource,
      });
    }

    // Persist to backend /api/notifications/subscribe
    await fetch('/api/notifications/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userId || 'anonymous',
        subscription: subscription.toJSON(),
      }),
    });

    return subscription;
  } catch (err) {
    console.error('Failed to subscribe to push notifications:', err);
    return null;
  }
}

export async function unsubscribeFromPush(): Promise<boolean> {
  if (!isNotificationSupported()) return false;

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      await fetch('/api/notifications/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: subscription.endpoint }),
      });
      await subscription.unsubscribe();
    }
    return true;
  } catch (err) {
    console.error('Failed to unsubscribe from push notifications:', err);
    return false;
  }
}
