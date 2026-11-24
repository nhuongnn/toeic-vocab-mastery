import { RoleplayConversation } from '@/types/roleplay';

export const CHAT_ROOM_HISTORY_KEY = 'toeic_chat_room_history_v1';
export const MAX_CHAT_ROOM_CONVERSATIONS = 10;

/**
 * Generate a unique ID for a chat room conversation session.
 */
export function generateConversationId(): string {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 9);
  return `conv_${timestamp}_${randomStr}`;
}

/**
 * Retrieve saved chat room conversation history (up to 10 most recent).
 */
export function getChatRoomHistory(): RoleplayConversation[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CHAT_ROOM_HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Ensure sorted by updatedAt descending, capped at MAX_CHAT_ROOM_CONVERSATIONS
    return parsed
      .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
      .slice(0, MAX_CHAT_ROOM_CONVERSATIONS);
  } catch (err) {
    console.error('Failed to load chat room history from localStorage:', err);
    return [];
  }
}

/**
 * Get a specific conversation by ID.
 */
export function getChatRoomConversationById(id: string): RoleplayConversation | null {
  const history = getChatRoomHistory();
  return history.find((conv) => conv.id === id) || null;
}

/**
 * Save or update a conversation in history.
 * Automatically keeps only the 10 most recent conversations.
 */
export function saveChatRoomConversation(conversation: RoleplayConversation): RoleplayConversation[] {
  if (typeof window === 'undefined') return [];
  try {
    const existing = getChatRoomHistory();
    // Remove if already exists to update its position and content
    const filtered = existing.filter((item) => item.id !== conversation.id);

    // Prepend the new/updated conversation
    const updated = [conversation, ...filtered]
      .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
      .slice(0, MAX_CHAT_ROOM_CONVERSATIONS);

    localStorage.setItem(CHAT_ROOM_HISTORY_KEY, JSON.stringify(updated));

    // Dispatch custom event for cross-component sync
    window.dispatchEvent(
      new CustomEvent('chat-room-history-updated', { detail: updated })
    );

    return updated;
  } catch (err) {
    console.error('Failed to save chat room conversation to localStorage:', err);
    return [];
  }
}

/**
 * Delete a specific conversation by ID.
 */
export function deleteChatRoomConversation(id: string): RoleplayConversation[] {
  if (typeof window === 'undefined') return [];
  try {
    const existing = getChatRoomHistory();
    const updated = existing.filter((item) => item.id !== id);

    localStorage.setItem(CHAT_ROOM_HISTORY_KEY, JSON.stringify(updated));

    window.dispatchEvent(
      new CustomEvent('chat-room-history-updated', { detail: updated })
    );

    return updated;
  } catch (err) {
    console.error('Failed to delete chat room conversation from localStorage:', err);
    return [];
  }
}

/**
 * Rename a specific chat room conversation by ID.
 */
export function renameChatRoomConversation(
  id: string,
  newTitle: string
): RoleplayConversation[] {
  if (typeof window === 'undefined') return [];
  try {
    const trimmed = newTitle.trim();
    if (!trimmed) return getChatRoomHistory();

    const existing = getChatRoomHistory();
    const updated = existing.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          title: trimmed,
        };
      }
      return item;
    });

    localStorage.setItem(CHAT_ROOM_HISTORY_KEY, JSON.stringify(updated));

    window.dispatchEvent(
      new CustomEvent('chat-room-history-updated', { detail: updated })
    );

    return updated;
  } catch (err) {
    console.error('Failed to rename chat room conversation in localStorage:', err);
    return [];
  }
}

/**
 * Clear all chat room conversations.
 */
export function clearAllChatRoomHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(CHAT_ROOM_HISTORY_KEY);
    window.dispatchEvent(
      new CustomEvent('chat-room-history-updated', { detail: [] })
    );
  } catch (err) {
    console.error('Failed to clear chat room history:', err);
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
