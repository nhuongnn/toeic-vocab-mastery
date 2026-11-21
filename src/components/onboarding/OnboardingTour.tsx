'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { TOUR_STEPS } from '@/lib/onboarding/tourSteps';
import { TourStep } from './TourStep';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useMounted } from '@/hooks/useMounted';

const TOOLTIP_WIDTH = 320;
const TOOLTIP_HEIGHT = 180;
const SCREEN_PADDING = 16;
const ELEMENT_GAP = 12;

function findVisibleTarget(selector: string): HTMLElement | null {
  if (typeof document === 'undefined') return null;
  const elements = document.querySelectorAll<HTMLElement>(selector);
  for (const el of elements) {
    const rect = el.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      return el;
    }
  }
  return elements[0] || null;
}

export function OnboardingTour() {
  const { state, completeTour } = useOnboarding();
  const mounted = useMounted();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 100, left: 100 });
  const [actualPlacement, setActualPlacement] = useState<'top' | 'bottom' | 'right'>('bottom');
  const [arrowOffset, setArrowOffset] = useState<number>(32);

  const currentStep = TOUR_STEPS[currentStepIndex];

  const updatePosition = useCallback(() => {
    if (!currentStep) return;
    const el = findVisibleTarget(currentStep.target);
    if (el) {
      const rect = el.getBoundingClientRect();
      setTargetRect(rect);

      const targetCenterX = rect.left + rect.width / 2;

      // Calculate horizontal position (centered to target, clamped to screen)
      let left = targetCenterX - TOOLTIP_WIDTH / 2;
      left = Math.max(SCREEN_PADDING, Math.min(window.innerWidth - TOOLTIP_WIDTH - SCREEN_PADDING, left));

      // Calculate arrow offset relative to tooltip left edge
      const arrowLeft = Math.max(16, Math.min(TOOLTIP_WIDTH - 24, targetCenterX - left - 6));
      setArrowOffset(arrowLeft);

      // Calculate vertical position
      let top: number;
      let placement: 'top' | 'bottom' | 'right' = (currentStep.position as 'top' | 'bottom' | 'right') || 'bottom';

      if (currentStep.position === 'top') {
        top = rect.top - TOOLTIP_HEIGHT - ELEMENT_GAP;
        // If not enough room at the top, flip to bottom
        if (top < SCREEN_PADDING && rect.bottom + TOOLTIP_HEIGHT + ELEMENT_GAP <= window.innerHeight - SCREEN_PADDING) {
          top = rect.bottom + ELEMENT_GAP;
          placement = 'bottom';
        }
      } else if (currentStep.position === 'right') {
        left = rect.right + ELEMENT_GAP;
        top = rect.top;
        if (left + TOOLTIP_WIDTH > window.innerWidth - SCREEN_PADDING) {
          left = Math.max(SCREEN_PADDING, window.innerWidth - TOOLTIP_WIDTH - SCREEN_PADDING);
          top = rect.bottom + ELEMENT_GAP;
          placement = 'bottom';
        }
      } else {
        // Default: bottom
        top = rect.bottom + ELEMENT_GAP;
        // If bottom overflows the viewport and there is space above, flip to top
        if (top + TOOLTIP_HEIGHT > window.innerHeight - SCREEN_PADDING && rect.top - TOOLTIP_HEIGHT - ELEMENT_GAP >= SCREEN_PADDING) {
          top = rect.top - TOOLTIP_HEIGHT - ELEMENT_GAP;
          placement = 'top';
        }
      }

      // Final boundary clamp
      top = Math.max(SCREEN_PADDING, Math.min(window.innerHeight - TOOLTIP_HEIGHT - SCREEN_PADDING, top));

      setTooltipPos({ top, left });
      setActualPlacement(placement);
    } else {
      setTargetRect(null);
    }
  }, [currentStep]);

  useEffect(() => {
    if (state.tourCompleted || !currentStep) return;

    // Check if target element needs to be scrolled into view
    const el = findVisibleTarget(currentStep.target);
    if (el) {
      const rect = el.getBoundingClientRect();
      const isInViewport =
        rect.top >= 70 &&
        rect.bottom <= window.innerHeight - 150;

      if (!isInViewport) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    const rafId = requestAnimationFrame(updatePosition);
    // Re-check position after smooth scroll and layout settle
    const timer1 = setTimeout(updatePosition, 100);
    const timer2 = setTimeout(updatePosition, 300);

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [state.tourCompleted, currentStepIndex, currentStep, updatePosition]);

  if (!mounted || state.tourCompleted || !currentStep || !targetRect) return null;

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      completeTour();
    }
  };

  const handleSkip = () => {
    completeTour();
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Target highlight cutout with glow border */}
      {targetRect && (
        <div
          style={{
            top: `${Math.max(0, targetRect.top - 6)}px`,
            left: `${Math.max(0, targetRect.left - 6)}px`,
            width: `${targetRect.width + 12}px`,
            height: `${targetRect.height + 12}px`,
          }}
          className="fixed border-2 border-indigo-400 rounded-2xl shadow-[0_0_0_9999px_rgba(2,6,23,0.75)] transition-all duration-300 pointer-events-auto"
        />
      )}

      {/* Tooltip */}
      <div className="pointer-events-auto">
        <TourStep
          step={currentStep}
          stepIndex={currentStepIndex}
          totalSteps={TOUR_STEPS.length}
          position={tooltipPos}
          placement={actualPlacement}
          arrowOffset={arrowOffset}
          onNext={handleNext}
          onSkip={handleSkip}
        />
      </div>
    </div>
  );
}
