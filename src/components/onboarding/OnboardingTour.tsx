'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { TOUR_STEPS } from '@/lib/onboarding/tourSteps';
import { TourStep } from './TourStep';
import { useOnboarding } from '@/contexts/OnboardingContext';

export function OnboardingTour() {
  const { state, completeTour } = useOnboarding();
  const [mounted, setMounted] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 100, left: 100 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentStep = TOUR_STEPS[currentStepIndex];

  const updatePosition = useCallback(() => {
    if (!currentStep) return;
    const el = document.querySelector(currentStep.target);
    if (el) {
      const rect = el.getBoundingClientRect();
      setTargetRect(rect);

      // Position tooltip based on step config
      let top = rect.bottom + 12;
      let left = Math.max(16, rect.left);

      if (currentStep.position === 'top') {
        top = Math.max(20, rect.top - 180);
      } else if (currentStep.position === 'right') {
        left = rect.right + 16;
        top = rect.top;
      }

      setTooltipPos({ top, left });
    } else {
      setTargetRect(null);
    }
  }, [currentStep]);

  useEffect(() => {
    if (state.tourCompleted) return;
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [state.tourCompleted, currentStepIndex, updatePosition]);

  if (!mounted || state.tourCompleted || !currentStep) return null;

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
      {/* Target highlight cutout or border if element found */}
      {targetRect && (
        <div
          style={{
            top: `${targetRect.top - 4}px`,
            left: `${targetRect.left - 4}px`,
            width: `${targetRect.width + 8}px`,
            height: `${targetRect.height + 8}px`,
          }}
          className="fixed border-2 border-indigo-400 rounded-2xl shadow-[0_0_0_9999px_rgba(2,6,23,0.7)] transition-all duration-300 pointer-events-auto"
        />
      )}

      {/* Tooltip */}
      <div className="pointer-events-auto">
        <TourStep
          step={currentStep}
          stepIndex={currentStepIndex}
          totalSteps={TOUR_STEPS.length}
          position={tooltipPos}
          onNext={handleNext}
          onSkip={handleSkip}
        />
      </div>
    </div>
  );
}
