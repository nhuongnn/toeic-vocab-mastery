'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export function useTestTimer(
  initialTimeLimit: number,
  onTimeUp?: () => void
) {
  const [timeRemaining, setTimeRemaining] = useState<number>(initialTimeLimit);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  useEffect(() => {
    if (!isRunning || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsRunning(false);
          if (onTimeUp) onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, isPaused, onTimeUp]);

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const percentRemaining =
    initialTimeLimit > 0
      ? Math.max(0, Math.min(100, Math.round((timeRemaining / initialTimeLimit) * 100)))
      : 0;

  const isWarning = timeRemaining > 0 && timeRemaining <= 300; // < 5 mins
  const isCritical = timeRemaining > 0 && timeRemaining <= 60; // < 1 min

  return {
    timeRemaining,
    isRunning,
    isPaused,
    pause,
    resume,
    formatTime,
    percentRemaining,
    isWarning,
    isCritical,
  };
}
