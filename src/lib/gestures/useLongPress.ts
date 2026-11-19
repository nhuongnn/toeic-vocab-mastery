'use client';

import { useRef, useCallback } from 'react';

export function useLongPress(
  onLongPress: (e: React.MouseEvent | React.TouchEvent) => void,
  onClick?: (e: React.MouseEvent | React.TouchEvent) => void,
  delay = 500
) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef(false);

  const start = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      isLongPress.current = false;
      timerRef.current = setTimeout(() => {
        isLongPress.current = true;
        onLongPress(e);
      }, delay);
    },
    [onLongPress, delay]
  );

  const clear = useCallback(
    (e: React.MouseEvent | React.TouchEvent, shouldTriggerClick = true) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (shouldTriggerClick && !isLongPress.current && onClick) {
        onClick(e);
      }
    },
    [onClick]
  );

  return {
    onMouseDown: (e: React.MouseEvent) => start(e),
    onTouchStart: (e: React.TouchEvent) => start(e),
    onMouseUp: (e: React.MouseEvent) => clear(e),
    onMouseLeave: (e: React.MouseEvent) => clear(e, false),
    onTouchEnd: (e: React.TouchEvent) => clear(e),
  };
}
