'use client';

import React, { useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Gauge,
  Sparkles,
  Globe,
} from 'lucide-react';
import { ListeningAccent } from '@/types/listening';

interface AudioPlayerBarProps {
  isPlaying: boolean;
  onPlay: (accent: ListeningAccent, rate: number) => void;
  onPause: () => void;
  onReplay?: () => void;
  defaultAccent?: ListeningAccent;
  label?: string;
  allowAccentChange?: boolean;
}

export function AudioPlayerBar({
  isPlaying,
  onPlay,
  onPause,
  onReplay,
  defaultAccent = 'en-US',
  label = 'TOEIC Audio Stream',
  allowAccentChange = true,
}: AudioPlayerBarProps) {
  const [accent, setAccent] = useState<ListeningAccent>(defaultAccent);
  const [rate, setRate] = useState<number>(0.9);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const togglePlay = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay(accent, rate);
    }
  };

  const handleRateChange = (newRate: number) => {
    setRate(newRate);
    if (isPlaying) {
      onPause();
      setTimeout(() => onPlay(accent, newRate), 100);
    }
  };

  const handleAccentChange = (newAccent: ListeningAccent) => {
    setAccent(newAccent);
    if (isPlaying) {
      onPause();
      setTimeout(() => onPlay(newAccent, rate), 100);
    }
  };

  return (
    <div className="w-full rounded-2xl bg-slate-900/90 border border-slate-800 p-3 sm:p-4 shadow-lg backdrop-blur flex flex-wrap items-center justify-between gap-3">
      {/* Left: Play / Pause + Rewind */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={togglePlay}
          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all shadow-md ${
            isPlaying
              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
              : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30 hover:scale-105'
          }`}
          title={isPlaying ? 'Tạm dừng audio' : 'Phát audio'}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current translate-x-0.5" />
          )}
        </button>

        {onReplay && (
          <button
            onClick={onReplay}
            className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors border border-slate-700/60"
            title="Tua lại từ đầu"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}

        <div className="hidden sm:block">
          <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <span>{label}</span>
            {isPlaying && (
              <span className="flex items-center gap-0.5 text-sky-400">
                <span className="w-1 h-3 bg-sky-400 animate-pulse rounded-full" />
                <span className="w-1 h-4 bg-sky-400 animate-pulse delay-75 rounded-full" />
                <span className="w-1 h-2 bg-sky-400 animate-pulse delay-150 rounded-full" />
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-400">
            Giọng đọc chuẩn ETS • Tự động streaming độ nét cao
          </p>
        </div>
      </div>

      {/* Right Controls: Speed & Accent */}
      <div className="flex items-center gap-2 sm:gap-3 ml-auto">
        {/* Accent Selector */}
        {allowAccentChange && (
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950/80 border border-slate-800">
            <button
              onClick={() => handleAccentChange('en-US')}
              className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all ${
                accent === 'en-US'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Giọng Mỹ (American English)"
            >
              🇺🇸 US
            </button>
            <button
              onClick={() => handleAccentChange('en-GB')}
              className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all ${
                accent === 'en-GB'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Giọng Anh (British English)"
            >
              🇬🇧 UK
            </button>
            <button
              onClick={() => handleAccentChange('en-AU')}
              className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all ${
                accent === 'en-AU'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Giọng Úc (Australian English)"
            >
              🇦🇺 AU
            </button>
          </div>
        )}

        {/* Speed Controls */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
          {[0.75, 0.9, 1.0, 1.25].map((spd) => (
            <button
              key={spd}
              onClick={() => handleRateChange(spd)}
              className={`px-2 py-1 rounded-lg font-mono font-medium transition-colors ${
                rate === spd
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {spd === 0.9 ? '1x (ETS)' : `${spd}x`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
