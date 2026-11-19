'use client';

import { useEffect, useRef, useState, RefObject } from 'react';

export function usePullToRefresh<T extends HTMLElement>(
  targetRef: RefObject<T | null>,
  onRefresh: () => Promise<void> | void,
  pullThreshold = 80
) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef(0);
  const isPulling = useRef(false);

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        startY.current = e.touches[0].clientY;
        isPulling.current = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling.current || isRefreshing) return;
      const currentY = e.touches[0].clientY;
      const distance = Math.max(0, currentY - startY.current);
      if (distance > 0 && window.scrollY === 0) {
        setPullDistance(Math.min(distance * 0.45, pullThreshold * 1.5));
      }
    };

    const handleTouchEnd = async () => {
      if (!isPulling.current) return;
      isPulling.current = false;

      if (pullDistance >= pullThreshold && !isRefreshing) {
        setIsRefreshing(true);
        try {
          await onRefresh();
        } finally {
          setIsRefreshing(false);
          setPullDistance(0);
        }
      } else {
        setPullDistance(0);
      }
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [targetRef, onRefresh, pullThreshold, pullDistance, isRefreshing]);

  return { pullDistance, isRefreshing };
}
