'use client';

import React from 'react';
import { getAvatarPreset, AvatarPreset } from '@/lib/roleplay/avatars';

interface CharacterAvatarProps {
  avatarId?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  className?: string;
  preset?: AvatarPreset;
}

export function CharacterAvatar({
  avatarId,
  size = 'md',
  showBadge = true,
  className = '',
  preset: customPreset,
}: CharacterAvatarProps) {
  const preset = customPreset || getAvatarPreset(avatarId);

  const sizeClasses = {
    xs: 'w-6 h-6 text-sm rounded-lg',
    sm: 'w-8 h-8 text-lg rounded-xl',
    md: 'w-10 h-10 text-xl rounded-2xl',
    lg: 'w-14 h-14 text-3xl rounded-2xl',
    xl: 'w-20 h-20 text-4xl rounded-3xl',
  }[size];

  const badgeSizeClasses = {
    xs: 'text-[8px] -bottom-1 -right-1',
    sm: 'text-[10px] -bottom-1 -right-1',
    md: 'text-xs -bottom-1 -right-1',
    lg: 'text-sm -bottom-1.5 -right-1.5',
    xl: 'text-lg -bottom-2 -right-2',
  }[size];

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      {/* Avatar Container */}
      <div
        className={`${sizeClasses} bg-gradient-to-tr ${preset.bgGradient} border ${preset.borderColor} flex items-center justify-center shadow-md select-none transition-transform hover:scale-105`}
        title={`${preset.name}: ${preset.vibe}`}
      >
        <span className="leading-none">{preset.emoji}</span>
      </div>

      {/* Mini Sticker Badge */}
      {showBadge && preset.badgeEmoji && (
        <span
          className={`absolute ${badgeSizeClasses} leading-none drop-shadow-md select-none pointer-events-none`}
        >
          {preset.badgeEmoji}
        </span>
      )}
    </div>
  );
}
