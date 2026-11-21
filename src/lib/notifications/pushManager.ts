import { VAPID_PUBLIC_KEY, urlBase64ToUint8Array } from './vapidKeys';
import { registerServiceWorker } from '@/lib/pwa/serviceWorkerRegistration';

export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export function getNotificationPermission(): NotificationPermission {
  if (!isNotificationSupported()) return 'denied';
  return Notification.permission;
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!isNotificationSupported()) return 'denied';
  try {
    const result = await Notification.requestPermission();
    return result;
  } catch (err) {
    console.warn('Error requesting notification permission:', err);
    return 'denied';
  }
}

/**
 * Gets the active ServiceWorkerRegistration safely with a timeout
 * to avoid hanging indefinitely if the Service Worker has not completed activating.
 */
export async function getServiceWorkerRegistration(timeoutMs = 3000): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return null;
  }

  try {
    // Check existing or trigger registration if missing
    let reg = await navigator.serviceWorker.getRegistration();
    if (!reg) {
      reg = (await registerServiceWorker()) || (await navigator.serviceWorker.getRegistration());
    }

    const readyPromise = navigator.serviceWorker.ready;
    const timeoutPromise = new Promise<null>((resolve) =>
      setTimeout(() => resolve(null), timeoutMs)
    );

    const activeReg = await Promise.race([readyPromise, timeoutPromise]);
    return activeReg || reg || null;
  } catch (error) {
    console.warn('Error getting service worker registration:', error);
    return null;
  }
}

export async function getCurrentPushSubscription(): Promise<PushSubscription | null> {
  if (!isNotificationSupported() || !('serviceWorker' in navigator)) return null;
  try {
    const registration = await getServiceWorkerRegistration(2500);
    if (!registration || !('pushManager' in registration)) return null;
    return await registration.pushManager.getSubscription();
  } catch (error) {
    console.warn('Error fetching push subscription:', error);
    return null;
  }
}

export async function subscribeToPush(userId?: string): Promise<PushSubscription | null> {
  if (!isNotificationSupported()) return null;

  try {
    let permission = getNotificationPermission();
    if (permission === 'default') {
      permission = await requestNotificationPermission();
    }
    if (permission !== 'granted') return null;

    const registration = await getServiceWorkerRegistration(3500);
    if (!registration || !('pushManager' in registration)) {
      console.warn('Service Worker PushManager not ready for subscription');
      return null;
    }

    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      const convertedKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedKey as unknown as BufferSource,
      });
    }

    // Persist to backend /api/notifications/subscribe
    if (subscription) {
      await fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId || 'anonymous',
          subscription: subscription.toJSON(),
        }),
      }).catch((err) => console.warn('Could not save subscription to server:', err));
    }

    return subscription;
  } catch (err) {
    console.error('Failed to subscribe to push notifications:', err);
    return null;
  }
}

export async function unsubscribeFromPush(): Promise<boolean> {
  if (!isNotificationSupported() || !('serviceWorker' in navigator)) return false;

  try {
    const registration = await getServiceWorkerRegistration(2000);
    if (!registration || !('pushManager' in registration)) return false;

    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      await fetch('/api/notifications/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: subscription.endpoint }),
      }).catch(() => {});
      await subscription.unsubscribe();
    }
    return true;
  } catch (err) {
    console.error('Failed to unsubscribe from push notifications:', err);
    return false;
  }
}

/**
 * Gentle notification chime using Web Audio API
 */
export function playNotificationTone(): void {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now); // D5
    osc1.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5

    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.18, now + 0.04);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.36);
  } catch {
    // Audio context may require user gesture on some browsers
  }
}

/**
 * Robust local notification display:
 * 1. Checks and requests permission if needed
 * 2. Attempts Service Worker showNotification
 * 3. Falls back to window.Notification constructor
 * 4. Plays a gentle chime for instant user feedback
 */
export async function showLocalNotification(payload: {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  url?: string;
}): Promise<boolean> {
  if (!isNotificationSupported()) return false;

  let permission = getNotificationPermission();
  if (permission === 'default') {
    permission = await requestNotificationPermission();
  }

  if (permission !== 'granted') {
    return false;
  }

  // Play audio chime
  playNotificationTone();

  // Try via Service Worker first
  try {
    const registration = await getServiceWorkerRegistration(2000);
    if (registration && 'showNotification' in registration) {
      await registration.showNotification(payload.title, {
        body: payload.body,
        icon: payload.icon || '/notification-icon-192.png',
        badge: payload.badge || '/notification-badge-72.png',
        tag: payload.tag || 'toeic-reminder',
        data: { url: payload.url || '/' },
      });
      return true;
    }
  } catch (swErr) {
    console.warn('SW showNotification failed, trying standard Notification:', swErr);
  }

  // Fallback to window Notification constructor
  try {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notif = new Notification(payload.title, {
        body: payload.body,
        icon: payload.icon || '/notification-icon-192.png',
        tag: payload.tag || 'toeic-reminder',
      });
      notif.onclick = () => {
        window.focus();
        if (payload.url) {
          window.location.href = payload.url;
        }
      };
      return true;
    }
  } catch (notifErr) {
    console.warn('Standard Notification constructor failed:', notifErr);
  }

  return false;
}
