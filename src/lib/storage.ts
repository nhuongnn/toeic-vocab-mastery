import { UserProgressData } from '@/types/progress';

const STORAGE_KEY = 'toeic_vocab_mastery_v1';

export const DEFAULT_PROGRESS: UserProgressData = {
  version: 1,
  cards: {},
  stats: {
    totalWordsLearned: 0,
    totalReviews: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastStudyDate: '',
    dailyGoal: 10,
    estimatedToeicScore: 450,
  },
  history: [],
  preferences: {
    dailyGoal: 10,
    immersiveOnly: true,
    autoPlayPronunciation: true,
    speechRate: 0.9,
    speechAccent: 'en-US',
    theme: 'dark',
    preferredDictionary: 'cambridge',
  },
  bookmarkedWordIds: [],
  customItems: [],
  deletedCustomItemIds: [],
};

export function loadUserProgress(): UserProgressData {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    const loaded: UserProgressData = {
      ...DEFAULT_PROGRESS,
      ...parsed,
      stats: { ...DEFAULT_PROGRESS.stats, ...(parsed.stats || {}) },
      preferences: { ...DEFAULT_PROGRESS.preferences, ...(parsed.preferences || {}) },
    };

    // Normalize theme: if legacy had 'system' and no explicit toeic_theme was set, migrate to 'dark'
    const explicitTheme = localStorage.getItem('toeic_theme');
    if (explicitTheme && ['light', 'dark', 'system'].includes(explicitTheme)) {
      loaded.preferences.theme = explicitTheme as 'light' | 'dark' | 'system';
    } else {
      // Default theme is strictly 'dark'
      if (loaded.preferences.theme === 'system' || !loaded.preferences.theme) {
        loaded.preferences.theme = 'dark';
        try {
          localStorage.setItem('toeic_theme', 'dark');
          localStorage.setItem(STORAGE_KEY, JSON.stringify(loaded));
        } catch {}
      }
    }

    // Merge onboarding from separate localStorage key if present
    try {
      const rawOnboarding = localStorage.getItem('onboarding_state_v1');
      if (rawOnboarding) {
        const parsedOnboarding = JSON.parse(rawOnboarding);
        if (!loaded.onboarding) {
          loaded.onboarding = parsedOnboarding;
        } else {
          // Merge to preserve whichever has learningPath
          loaded.onboarding = {
            ...loaded.onboarding,
            ...parsedOnboarding,
            learningPath: parsedOnboarding.learningPath || loaded.onboarding.learningPath,
            targetScore: parsedOnboarding.targetScore || loaded.onboarding.targetScore || 650,
            isCompleted: Boolean(
              parsedOnboarding.isCompleted ||
              loaded.onboarding.isCompleted ||
              parsedOnboarding.learningPath ||
              loaded.onboarding.learningPath
            ),
          };
        }
      }
    } catch {}

    // Merge roleplay character settings from separate key if present
    try {
      const rawRoleplay = localStorage.getItem('roleplay_settings_v1');
      if (rawRoleplay) {
        const parsedRoleplay = JSON.parse(rawRoleplay);
        if (!loaded.roleplay) {
          loaded.roleplay = parsedRoleplay;
        } else {
          const timeStored = loaded.roleplay.updatedAt ? new Date(loaded.roleplay.updatedAt).getTime() : 0;
          const timeParsed = parsedRoleplay.updatedAt ? new Date(parsedRoleplay.updatedAt).getTime() : 0;
          if (timeParsed >= timeStored) {
            loaded.roleplay = { ...loaded.roleplay, ...parsedRoleplay };
          }
        }
      }
    } catch {}

    // Merge chat room history from separate key if present
    try {
      const rawChatHistory = localStorage.getItem('toeic_chat_room_history_v1');
      if (rawChatHistory) {
        const parsedHistory = JSON.parse(rawChatHistory);
        if (Array.isArray(parsedHistory) && parsedHistory.length > 0) {
          if (!loaded.roleplay) {
            loaded.roleplay = {};
          }
          if (!loaded.roleplay.chatHistory || loaded.roleplay.chatHistory.length === 0) {
            loaded.roleplay.chatHistory = parsedHistory.slice(0, 10);
          } else {
            const map = new Map<string, any>();
            for (const c of [...(loaded.roleplay.chatHistory || []), ...parsedHistory]) {
              if (!c?.id) continue;
              const ex = map.get(c.id);
              if (!ex || (c.updatedAt || 0) > (ex.updatedAt || 0)) {
                map.set(c.id, c);
              }
            }
            loaded.roleplay.chatHistory = Array.from(map.values())
              .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
              .slice(0, 10);
          }
        }
      }
    } catch {}

    // Merge custom vocabulary / sentence patterns from separate key if needed
    try {
      const rawCustom = localStorage.getItem('toeic_custom_vocab_v1');
      if (rawCustom) {
        const parsedCustom = JSON.parse(rawCustom);
        if (Array.isArray(parsedCustom) && parsedCustom.length > 0) {
          if (!loaded.customItems || loaded.customItems.length === 0) {
            loaded.customItems = parsedCustom;
          } else {
            const map = new Map<string, any>();
            for (const item of [...(loaded.customItems || []), ...parsedCustom]) {
              if (!item?.id) continue;
              const ex = map.get(item.id);
              const curTime = item.updatedAt ? new Date(item.updatedAt).getTime() : 0;
              const exTime = ex?.updatedAt ? new Date(ex.updatedAt).getTime() : 0;
              if (!ex || curTime >= exTime) {
                map.set(item.id, item);
              }
            }
            loaded.customItems = Array.from(map.values());
          }
        }
      }
    } catch {}

    loaded.customItems = loaded.customItems || [];
    loaded.deletedCustomItemIds = loaded.deletedCustomItemIds || [];

    return loaded;
  } catch (err) {
    console.error('Error loading progress from localStorage:', err);
    return DEFAULT_PROGRESS;
  }
}

export function saveUserProgress(data: UserProgressData): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    if (data.onboarding) {
      try {
        localStorage.setItem('onboarding_state_v1', JSON.stringify(data.onboarding));
        window.dispatchEvent(new Event('onboarding-synced'));
      } catch {}
    }

    if (data.roleplay) {
      try {
        localStorage.setItem('roleplay_settings_v1', JSON.stringify(data.roleplay));
        window.dispatchEvent(new Event('roleplay-synced'));
      } catch {}

      if (Array.isArray(data.roleplay.chatHistory)) {
        try {
          localStorage.setItem('toeic_chat_room_history_v1', JSON.stringify(data.roleplay.chatHistory));
          window.dispatchEvent(
            new CustomEvent('chat-room-history-updated', { detail: data.roleplay.chatHistory })
          );
        } catch {}
      }
    }

    if (data.customItems) {
      try {
        localStorage.setItem('toeic_custom_vocab_v1', JSON.stringify(data.customItems));
        window.dispatchEvent(
          new CustomEvent('custom-vocab-synced', { detail: data.customItems })
        );
      } catch {}
    }
  } catch (err) {
    console.error('Error saving progress to localStorage:', err);
  }
}

export function updateStreak(currentStreak: number, longestStreak: number, lastStudyDate: string): {
  newStreak: number;
  newLongest: number;
  todayStr: string;
} {
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  if (!lastStudyDate) {
    return {
      newStreak: 1,
      newLongest: Math.max(longestStreak, 1),
      todayStr,
    };
  }

  if (lastStudyDate === todayStr) {
    // Already studied today
    return {
      newStreak: currentStreak,
      newLongest: longestStreak,
      todayStr,
    };
  }

  const lastDate = new Date(lastStudyDate);
  const diffDays = Math.floor((now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    // Consecutive day
    const updatedStreak = currentStreak + 1;
    return {
      newStreak: updatedStreak,
      newLongest: Math.max(longestStreak, updatedStreak),
      todayStr,
    };
  } else {
    // Streak broken
    return {
      newStreak: 1,
      newLongest: longestStreak,
      todayStr,
    };
  }
}
