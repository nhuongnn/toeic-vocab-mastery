'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useProgress } from './ProgressContext';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const THEME_STORAGE_KEY = 'toeic_theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { progress, updatePreferences } = useProgress();
  const [theme, setThemeState] = useState<ThemeMode>('dark');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  // Apply theme to DOM
  const applyTheme = useCallback((targetTheme: ThemeMode) => {
    if (typeof window === 'undefined') return;

    let isDark = true;
    if (targetTheme === 'light') {
      isDark = false;
    } else if (targetTheme === 'dark') {
      isDark = true;
    } else {
      // system
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    const root = document.documentElement;
    const body = document.body;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
      if (body) {
        body.classList.add('dark');
        body.classList.remove('light');
      }
      setResolvedTheme('dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
      if (body) {
        body.classList.remove('dark');
        body.classList.add('light');
      }
      setResolvedTheme('light');
    }
  }, []);

  // Initialize on mount
  useEffect(() => {
    setMounted(true);
    let initialTheme: ThemeMode = 'dark';

    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        initialTheme = stored;
      } else {
        const raw = localStorage.getItem('toeic_vocab_mastery_v1');
        if (raw) {
          const p = JSON.parse(raw);
          if (p?.preferences?.theme === 'light') {
            initialTheme = 'light';
          } else if (p?.preferences?.theme === 'dark') {
            initialTheme = 'dark';
          }
        }
      }
    } catch {
      initialTheme = 'dark';
    }

    setThemeState(initialTheme);

    const isTargetDark =
      initialTheme === 'light'
        ? false
        : initialTheme === 'system'
        ? window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        : true;

    setResolvedTheme(isTargetDark ? 'dark' : 'light');

    // Only mutate DOM if not already in the target state
    const root = document.documentElement;
    const isAlreadyDark = root.classList.contains('dark') && !root.classList.contains('light');
    const isAlreadyLight = root.classList.contains('light') && !root.classList.contains('dark');

    if (isTargetDark && !isAlreadyDark) {
      applyTheme(initialTheme);
    } else if (!isTargetDark && !isAlreadyLight) {
      applyTheme(initialTheme);
    } else {
      // DOM is already in target state, ensure body and data-theme match
      const body = document.body;
      if (isTargetDark) {
        root.setAttribute('data-theme', 'dark');
        root.style.colorScheme = 'dark';
        if (body) {
          body.classList.add('dark');
          body.classList.remove('light');
        }
      } else {
        root.setAttribute('data-theme', 'light');
        root.style.colorScheme = 'light';
        if (body) {
          body.classList.remove('dark');
          body.classList.add('light');
        }
      }
    }

    // Listen to OS system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = () => {
      const currentStored = localStorage.getItem(THEME_STORAGE_KEY);
      if (currentStored === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [applyTheme]);

  const setTheme = useCallback(
    (newTheme: ThemeMode) => {
      setThemeState(newTheme);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      } catch (e) {
        console.error('Failed to save theme preference:', e);
      }

      // Add smooth transition only during active user switch
      if (typeof document !== 'undefined') {
        document.documentElement.classList.add('theme-transition');
        setTimeout(() => {
          document.documentElement.classList.remove('theme-transition');
        }, 300);
      }

      applyTheme(newTheme);
      updatePreferences({ theme: newTheme });
    },
    [applyTheme, updatePreferences]
  );

  const toggleTheme = useCallback(() => {
    const next: ThemeMode = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  }, [resolvedTheme, setTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme: mounted ? resolvedTheme : 'dark',
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
