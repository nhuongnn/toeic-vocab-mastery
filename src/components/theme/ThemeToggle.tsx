'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Laptop, Check } from 'lucide-react';
import { useTheme, ThemeMode } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  variant?: 'compact' | 'dropdown' | 'segmented';
  className?: string;
}

export function ThemeToggle({ variant = 'compact', className = '' }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open]);

  if (!mounted) {
    return (
      <div className={`w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 ${className}`} />
    );
  }

  if (variant === 'segmented') {
    const options: { mode: ThemeMode; label: string; icon: typeof Sun }[] = [
      { mode: 'light', label: 'Sáng', icon: Sun },
      { mode: 'dark', label: 'Tối', icon: Moon },
      { mode: 'system', label: 'Hệ thống', icon: Laptop },
    ];

    return (
      <div className={`grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 ${className}`}>
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = theme === opt.mode;
          return (
            <button
              key={opt.mode}
              type="button"
              onClick={() => setTheme(opt.mode)}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`} ref={ref}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Chọn giao diện"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-xs text-slate-300 font-medium transition-colors"
        >
          {resolvedTheme === 'dark' ? (
            <Moon className="w-4 h-4 text-indigo-400" />
          ) : (
            <Sun className="w-4 h-4 text-amber-400" />
          )}
          <span className="capitalize">
            {theme === 'system' ? 'Hệ thống' : theme === 'dark' ? 'Giao diện Tối' : 'Giao diện Sáng'}
          </span>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-44 rounded-xl bg-slate-900 border border-slate-800 p-1.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => {
                setTheme('light');
                setOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                theme === 'light'
                  ? 'bg-indigo-500/10 text-indigo-400'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span className="flex items-center gap-2">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Giao diện Sáng</span>
              </span>
              {theme === 'light' && <Check className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={() => {
                setTheme('dark');
                setOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                theme === 'dark'
                  ? 'bg-indigo-500/10 text-indigo-400'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span className="flex items-center gap-2">
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
                <span>Giao diện Tối</span>
              </span>
              {theme === 'dark' && <Check className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={() => {
                setTheme('system');
                setOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                theme === 'system'
                  ? 'bg-indigo-500/10 text-indigo-400'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span className="flex items-center gap-2">
                <Laptop className="w-3.5 h-3.5 text-slate-400" />
                <span>Theo Hệ thống</span>
              </span>
              {theme === 'system' && <Check className="w-3.5 h-3.5" />}
            </button>
          </div>
        )}
      </div>
    );
  }

  // Default compact 1-click switcher
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Chuyển chế độ giao diện sáng/tối"
      title={`Chuyển sang chế độ ${resolvedTheme === 'dark' ? 'Sáng' : 'Tối'}`}
      className={`p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all ${className}`}
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-500 transition-transform hover:-rotate-12" />
      )}
    </button>
  );
}
