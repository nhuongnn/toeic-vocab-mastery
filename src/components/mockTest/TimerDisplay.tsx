'use client';

import React from 'react';
import { Clock, Pause, Play, AlertCircle } from 'lucide-react';

interface TimerDisplayProps {
  timeRemaining: number;
  formatTime: (sec: number) => string;
  isPaused: boolean;
  isWarning: boolean;
  isCritical: boolean;
  percentRemaining: number;
  onPause: () => void;
  onResume: () => void;
}

export function TimerDisplay({
  timeRemaining,
  formatTime,
  isPaused,
  isWarning,
  isCritical,
  percentRemaining,
  onPause,
  onResume,
}: TimerDisplayProps) {
  const getTimerColor = () => {
    if (isCritical) return 'text-red-400 border-red-500/30 bg-red-500/10 animate-pulse';
    if (isWarning) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono text-sm sm:text-base font-bold transition-colors ${getTimerColor()}`}
      >
        <Clock className="w-4 h-4 shrink-0" />
        <span>{formatTime(timeRemaining)}</span>
      </div>

      <button
        onClick={isPaused ? onResume : onPause}
        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
        title={isPaused ? 'Tiếp tục làm bài' : 'Tạm dừng bài thi'}
        aria-label={isPaused ? 'Tiếp tục' : 'Tạm dừng'}
      >
        {isPaused ? <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" /> : <Pause className="w-4 h-4" />}
      </button>
    </div>
  );
}
