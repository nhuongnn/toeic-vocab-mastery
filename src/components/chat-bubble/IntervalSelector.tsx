'use client';

import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import {
  INTERVAL_OPTIONS,
  MAX_INTERVAL_MINUTES,
  MIN_INTERVAL_MINUTES,
  formatIntervalDuration,
  parseCustomIntervalMinutes,
} from '@/types/auto-chat';

interface IntervalSelectorProps {
  value: number;
  onChange: (minutes: number) => void;
  onValidityChange?: (isValid: boolean) => void;
  label?: string;
  compact?: boolean;
}

/**
 * Allows picking a preset interval or manually entering a custom minute value.
 */
export function IntervalSelector({
  value,
  onChange,
  onValidityChange,
  label = `Khoảng thời gian giữa các tin nhắn (tối thiểu ${MIN_INTERVAL_MINUTES} phút)`,
  compact = false,
}: IntervalSelectorProps) {
  const [draftText, setDraftText] = useState<string | null>(null);

  const displayText = draftText !== null ? draftText : String(value);
  const validation =
    draftText !== null
      ? parseCustomIntervalMinutes(draftText)
      : { valid: true, value };
  const isPreset = INTERVAL_OPTIONS.some((opt) => opt.value === value);
  const isCustomActive = !isPreset || draftText !== null;

  const handlePresetSelect = (minutes: number) => {
    setDraftText(null);
    onChange(minutes);
    onValidityChange?.(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setDraftText(raw);
    const parsed = parseCustomIntervalMinutes(raw);
    if (parsed.valid && parsed.value !== undefined) {
      onChange(parsed.value);
      onValidityChange?.(true);
    } else {
      onValidityChange?.(false);
    }
  };

  const handleInputBlur = () => {
    if (draftText === null) return;
    const parsed = parseCustomIntervalMinutes(draftText);
    if (parsed.valid) {
      setDraftText(null);
    }
  };

  return (
    <div className={compact ? 'space-y-2.5' : 'space-y-3'}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="text-xs font-bold text-slate-300 block">
          {label}
        </label>
        {!isPreset && validation.valid && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-[10px] font-bold text-indigo-300">
            Tùy chỉnh: {formatIntervalDuration(value)}
          </span>
        )}
      </div>

      {/* Preset Options */}
      <div
        className={
          compact
            ? 'grid grid-cols-3 sm:grid-cols-4 gap-2'
            : 'grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5'
        }
      >
        {INTERVAL_OPTIONS.map((opt) => {
          const active = value === opt.value && validation.valid;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => handlePresetSelect(opt.value)}
              className={
                compact
                  ? `px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      active
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/25'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`
                  : `p-3 rounded-2xl border text-center text-xs font-bold transition-all ${
                      active
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/25'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`
              }
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Custom Interval Input */}
      <div
        className={`rounded-2xl bg-slate-950 border transition-colors ${
          !validation.valid
            ? 'border-rose-500/70'
            : isCustomActive && !isPreset
            ? 'border-indigo-500/70'
            : 'border-slate-800'
        } ${compact ? 'p-3' : 'p-3.5'}`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>Hoặc tự nhập:</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-xl bg-slate-900 border border-slate-700 focus-within:border-indigo-500 px-3 py-1.5">
              <input
                type="number"
                inputMode="numeric"
                min={MIN_INTERVAL_MINUTES}
                max={MAX_INTERVAL_MINUTES}
                step={1}
                value={displayText}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                placeholder="VD: 25"
                aria-label="Tự nhập khoảng thời gian giữa các tin nhắn (phút)"
                className="w-16 bg-transparent text-xs font-bold text-white text-right focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="ml-1.5 text-[11px] font-semibold text-slate-400">
                phút
              </span>
            </div>

            <span className="text-[11px] text-slate-400 whitespace-nowrap">
              {validation.valid && value >= 60
                ? `(${formatIntervalDuration(value)})`
                : `(${MIN_INTERVAL_MINUTES}–${MAX_INTERVAL_MINUTES})`}
            </span>
          </div>
        </div>

        {!validation.valid && validation.error && (
          <p className="mt-2 text-[11px] font-medium text-rose-400">
            {validation.error}
          </p>
        )}
      </div>
    </div>
  );
}
