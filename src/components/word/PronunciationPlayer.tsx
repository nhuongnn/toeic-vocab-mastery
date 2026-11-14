'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX, Globe } from 'lucide-react';
import { useSpeech } from '@/hooks/useSpeech';

interface PronunciationPlayerProps {
  word: string;
  ipa: string;
  syllables: string;
  stressPattern: string;
  commonMistakes?: string;
  audioUrl?: string;
}

export function PronunciationPlayer({
  word,
  ipa,
  syllables,
  stressPattern,
  commonMistakes,
  audioUrl,
}: PronunciationPlayerProps) {
  const { speak, isPlaying } = useSpeech();
  const [accent, setAccent] = useState<'en-US' | 'en-GB'>('en-US');

  const handlePlay = () => {
    if (accent === 'en-GB') {
      speak(word, 'en-GB', 0.85);
    } else if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play().catch(() => speak(word, 'en-US', 0.85));
    } else {
      speak(word, 'en-US', 0.85);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        {/* Play Button */}
        <button
          onClick={handlePlay}
          className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-lg ${
            isPlaying
              ? 'bg-indigo-500 text-white shadow-indigo-500/40 scale-95'
              : 'bg-gradient-to-tr from-indigo-600 to-violet-500 text-white hover:shadow-indigo-500/30 hover:scale-105'
          }`}
          title="Listen to native pronunciation"
        >
          {isPlaying ? <Volume2 className="w-7 h-7 animate-pulse" /> : <Volume2 className="w-7 h-7" />}
        </button>

        {/* Phonetics & Syllables */}
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xl sm:text-2xl font-bold text-slate-100">{ipa}</span>
            <button
              onClick={() => setAccent(accent === 'en-US' ? 'en-GB' : 'en-US')}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 hover:border-indigo-500 transition-colors"
              title="Click to toggle accent"
            >
              <Globe className="w-3 h-3 text-indigo-400" />
              <span>{accent === 'en-US' ? 'US Accent' : 'UK Accent'}</span>
            </button>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
            <span>Syllables: <strong className="text-slate-200">{syllables}</strong></span>
            <span>•</span>
            <span>Stress: <strong className="text-indigo-400">{stressPattern}</strong></span>
          </div>
        </div>
      </div>

      {/* Warning/Common Mistakes */}
      {commonMistakes && (
        <div className="text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/20 px-3 py-2 rounded-xl sm:max-w-xs">
          <span className="font-semibold block mb-0.5">⚠️ Common Mistake:</span>
          {commonMistakes}
        </div>
      )}
    </div>
  );
}
