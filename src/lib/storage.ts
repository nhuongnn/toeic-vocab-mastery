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
};

export function loadUserProgress(): UserProgressData {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    const loaded = {
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
