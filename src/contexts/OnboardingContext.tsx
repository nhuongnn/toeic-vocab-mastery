'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  OnboardingState,
  OnboardingStep,
  PlacementResult,
  LearningPath,
} from '@/types/onboarding';
import { generateLearningPath } from '@/lib/placement/learningPath';
import { WordLevel } from '@/types/vocabulary';

interface OnboardingContextType {
  state: OnboardingState;
  setStep: (step: OnboardingStep) => void;
  setTargetScore: (score: number) => void;
  setDailyMinutes: (minutes: number) => void;
  setExperienceLevel: (exp: 'beginner' | 'intermediate' | 'experienced') => void;
  savePlacementResult: (result: PlacementResult) => void;
  skipPlacementTest: (level?: WordLevel) => void;
  finishOnboarding: () => void;
  resetOnboarding: () => void;
  startTour: () => void;
  completeTour: () => void;
}

const STORAGE_KEY = 'onboarding_state_v1';

const DEFAULT_STATE: OnboardingState = {
  isCompleted: false,
  currentStep: 'welcome',
  targetScore: 650,
  dailyMinutes: 20,
  experienceLevel: null,
  placementResult: null,
  learningPath: null,
  tourCompleted: false,
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<OnboardingState>(DEFAULT_STATE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setState({ ...DEFAULT_STATE, ...parsed });
      }
    } catch (e) {
      console.warn('Failed to parse onboarding state:', e);
    } finally {
      setLoaded(true);
    }
  }, []);

  const updateState = useCallback((updater: (prev: OnboardingState) => OnboardingState) => {
    setState((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error('Failed to save onboarding state:', e);
      }
      return next;
    });
  }, []);

  const setStep = useCallback((step: OnboardingStep) => {
    updateState((prev) => ({ ...prev, currentStep: step }));
  }, [updateState]);

  const setTargetScore = useCallback((score: number) => {
    updateState((prev) => {
      let updatedLearningPath = prev.learningPath;
      if (updatedLearningPath) {
        const level = prev.placementResult?.level || updatedLearningPath.currentLevel || 'essential';
        const minutes = prev.dailyMinutes || updatedLearningPath.dailyGoal || 20;
        updatedLearningPath = generateLearningPath(score, level, minutes);
      }
      return {
        ...prev,
        targetScore: score,
        learningPath: updatedLearningPath,
      };
    });
  }, [updateState]);

  const setDailyMinutes = useCallback((minutes: number) => {
    updateState((prev) => {
      let updatedLearningPath = prev.learningPath;
      if (updatedLearningPath) {
        const score = prev.targetScore || updatedLearningPath.targetScore || 650;
        const level = prev.placementResult?.level || updatedLearningPath.currentLevel || 'essential';
        updatedLearningPath = generateLearningPath(score, level, minutes);
      }
      return {
        ...prev,
        dailyMinutes: minutes,
        learningPath: updatedLearningPath,
      };
    });
  }, [updateState]);

  const setExperienceLevel = useCallback((exp: 'beginner' | 'intermediate' | 'experienced') => {
    updateState((prev) => ({ ...prev, experienceLevel: exp }));
  }, [updateState]);

  const savePlacementResult = useCallback((result: PlacementResult) => {
    updateState((prev) => {
      const learningPath = generateLearningPath(
        prev.targetScore || 650,
        result.level,
        prev.dailyMinutes || 20
      );

      return {
        ...prev,
        placementResult: result,
        learningPath,
        currentStep: 'result',
      };
    });
  }, [updateState]);

  const skipPlacementTest = useCallback((level: WordLevel = 'essential') => {
    updateState((prev) => {
      const dummyResult: PlacementResult = {
        level,
        score: level === 'essential' ? 450 : level === 'intermediate' ? 650 : 800,
        questionsAnswered: 0,
        correctAnswers: 0,
        accuracy: 0,
        testedQuestions: [],
      };

      const learningPath = generateLearningPath(
        prev.targetScore || 650,
        level,
        prev.dailyMinutes || 20
      );

      return {
        ...prev,
        placementResult: dummyResult,
        learningPath,
        currentStep: 'result',
      };
    });
  }, [updateState]);

  const finishOnboarding = useCallback(() => {
    updateState((prev) => ({
      ...prev,
      isCompleted: true,
      completedAt: new Date().toISOString(),
    }));
  }, [updateState]);

  const resetOnboarding = useCallback(() => {
    updateState(() => ({
      ...DEFAULT_STATE,
      isCompleted: false,
      currentStep: 'welcome' as OnboardingStep,
    }));
  }, [updateState]);

  const startTour = useCallback(() => {
    updateState((prev) => ({ ...prev, tourCompleted: false }));
  }, [updateState]);

  const completeTour = useCallback(() => {
    updateState((prev) => ({ ...prev, tourCompleted: true }));
  }, [updateState]);

  return (
    <OnboardingContext.Provider
      value={{
        state,
        setStep,
        setTargetScore,
        setDailyMinutes,
        setExperienceLevel,
        savePlacementResult,
        skipPlacementTest,
        finishOnboarding,
        resetOnboarding,
        startTour,
        completeTour,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
