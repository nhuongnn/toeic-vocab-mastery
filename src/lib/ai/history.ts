import { AiTutorConversation } from './types';

export const MAX_AI_TUTOR_CONVERSATIONS = 5;

/**
 * Returns the localStorage key scoped to the specific user.
 */
export function getAiTutorHistoryKey(userId: string): string {
  return `toeic_ai_tutor_history_${userId}`;
}

/**
 * Generate a unique ID for an AI tutor conversation session.
 */
export function generateTutorConversationId(): string {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 9);
  return `tutor_conv_${timestamp}_${randomStr}`;
}

/**
 * Retrieve saved AI tutor history for a specific user (up to 5 most recent).
 * Strictly returns an empty array if user is not logged in (!userId).
 */
export function getAiTutorHistory(userId?: string | null): AiTutorConversation[] {
  if (typeof window === 'undefined' || !userId) return [];
  try {
    const raw = localStorage.getItem(getAiTutorHistoryKey(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
      .slice(0, MAX_AI_TUTOR_CONVERSATIONS);
  } catch (err) {
    console.error('Failed to load AI tutor history from localStorage:', err);
    return [];
  }
}

/**
 * Get a specific conversation by ID for a user.
 */
export function getAiTutorConversationById(
  userId: string | null | undefined,
  id: string
): AiTutorConversation | null {
  if (!userId) return null;
  const history = getAiTutorHistory(userId);
  return history.find((conv) => conv.id === id) || null;
}

/**
 * Save or update a conversation in history for a specific user.
 * STRICT: Does NOT save if user is not logged in (!userId).
 * Automatically caps history at MAX_AI_TUTOR_CONVERSATIONS (5) most recent.
 */
export function saveAiTutorConversation(
  userId: string | null | undefined,
  conversation: AiTutorConversation
): AiTutorConversation[] {
  if (typeof window === 'undefined' || !userId) return [];
  try {
    const existing = getAiTutorHistory(userId);
    // Remove existing if present to update its position and content
    const filtered = existing.filter((item) => item.id !== conversation.id);

    // Prepend the new/updated conversation and sort by updatedAt desc
    const updated = [conversation, ...filtered]
      .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
      .slice(0, MAX_AI_TUTOR_CONVERSATIONS);

    localStorage.setItem(getAiTutorHistoryKey(userId), JSON.stringify(updated));

    // Dispatch custom event for cross-component sync
    window.dispatchEvent(
      new CustomEvent('ai-tutor-history-updated', {
        detail: { userId, history: updated },
      })
    );

    return updated;
  } catch (err) {
    console.error('Failed to save AI tutor conversation to localStorage:', err);
    return [];
  }
}

/**
 * Delete a specific conversation by ID for a user.
 */
export function deleteAiTutorConversation(
  userId: string | null | undefined,
  id: string
): AiTutorConversation[] {
  if (typeof window === 'undefined' || !userId) return [];
  try {
    const existing = getAiTutorHistory(userId);
    const updated = existing.filter((item) => item.id !== id);

    localStorage.setItem(getAiTutorHistoryKey(userId), JSON.stringify(updated));

    window.dispatchEvent(
      new CustomEvent('ai-tutor-history-updated', {
        detail: { userId, history: updated },
      })
    );

    return updated;
  } catch (err) {
    console.error('Failed to delete AI tutor conversation from localStorage:', err);
    return [];
  }
}

/**
 * Clear all AI tutor conversations for a user.
 */
export function clearAllAiTutorHistory(userId?: string | null): void {
  if (typeof window === 'undefined' || !userId) return;
  try {
    localStorage.removeItem(getAiTutorHistoryKey(userId));
    window.dispatchEvent(
      new CustomEvent('ai-tutor-history-updated', {
        detail: { userId, history: [] },
      })
    );
  } catch (err) {
    console.error('Failed to clear AI tutor history:', err);
  }
}

/**
 * Format a timestamp into human-readable Vietnamese time.
 */
export function formatConversationTime(timestamp: number): string {
  if (!timestamp) return '';
  const now = Date.now();
  const diffSec = Math.floor((now - timestamp) / 1000);

  if (diffSec < 60) return 'Vừa xong';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} phút trước`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours} giờ trước`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays} ngày trước`;

  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${hours}:${minutes} ${day}/${month}/${year}`;
}
