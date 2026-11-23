/**
 * Utilities for persistent guest identifier across sessions in browser localStorage
 */
export function getGuestId(): string {
  if (typeof window === 'undefined') {
    return 'guest_server';
  }

  try {
    const STORAGE_KEY = 'toeic_guest_ai_id';
    let guestId = localStorage.getItem(STORAGE_KEY);
    if (!guestId || !guestId.startsWith('guest_')) {
      guestId = `guest_${Math.random().toString(36).substring(2, 9)}_${Date.now().toString(36)}`;
      localStorage.setItem(STORAGE_KEY, guestId);
    }
    return guestId;
  } catch {
    return 'guest_fallback';
  }
}
