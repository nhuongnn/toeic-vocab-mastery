// VAPID keys configuration for Web Push
// Replace with production keys via environment variables when deploying
export const VAPID_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ||
  'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U';

export const VAPID_PRIVATE_KEY =
  process.env.VAPID_PRIVATE_KEY || 'UUxI42JzM-1sR5cWnZ8XoG0H0s3N9eU_P0Jk2m9aN3I';

export const VAPID_SUBJECT =
  process.env.VAPID_SUBJECT || 'mailto:nhuong2n@gmail.com';

export function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
