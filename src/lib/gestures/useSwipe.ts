'use client';

import { useEffect, useRef, RefObject } from 'react';

export interface SwipeConfig {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number; // Minimum distance (default: 50px)
  preventScroll?: boolean;
}

export function useSwipe<T extends HTMLElement>(
  targetRef: RefObject<T | null>,
  config: SwipeConfig
) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const touchEnd = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const threshold = config.threshold || 50;

    const handleTouchStart = (e: TouchEvent) => {
      touchEnd.current = null;
      touchStart.current = {
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEnd.current = {
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY,
      };

      if (config.preventScroll && touchStart.current) {
        const diffX = Math.abs(touchEnd.current.x - touchStart.current.x);
        const diffY = Math.abs(touchEnd.current.y - touchStart.current.y);
        if (diffX > diffY) {
          e.preventDefault();
        }
      }
    };

    const handleTouchEnd = () => {
      if (!touchStart.current || !touchEnd.current) return;

      const deltaX = touchEnd.current.x - touchStart.current.x;
      const deltaY = touchEnd.current.y - touchStart.current.y;
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      if (Math.max(absDeltaX, absDeltaY) > threshold) {
        if (absDeltaX > absDeltaY) {
          // Horizontal swipe
          if (deltaX > 0 && config.onSwipeRight) {
            config.onSwipeRight();
          } else if (deltaX < 0 && config.onSwipeLeft) {
            config.onSwipeLeft();
          }
        } else {
          // Vertical swipe
          if (deltaY > 0 && config.onSwipeDown) {
            config.onSwipeDown();
          } else if (deltaY < 0 && config.onSwipeUp) {
            config.onSwipeUp();
          }
        }
      }

      touchStart.current = null;
      touchEnd.current = null;
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: !config.preventScroll });
    element.addEventListener('touchmove', handleTouchMove, { passive: !config.preventScroll });
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [targetRef, config]);
}
