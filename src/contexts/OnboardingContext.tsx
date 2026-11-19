'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
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
  targetScore: 700,
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

  const saveState = (newState: OnboardingState) => {
    setState(newState);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch (e) {
      console.error('Failed to save onboarding state:', e);
    }
  };

  const setStep = (step: OnboardingStep) => {
    saveState({ ...state, currentStep: step });
  };

  const setTargetScore = (score: number) => {
    saveState({ ...state, targetScore: score });
  };

  const setDailyMinutes = (minutes: number) => {
    saveState({ ...state, dailyMinutes: minutes });
  };

  const setExperienceLevel = (exp: 'beginner' | 'intermediate' | 'experienced') => {
    saveState({ ...state, experienceLevel: exp });
  };

  const savePlacementResult = (result: PlacementResult) => {
    const learningPath = generateLearningPath(
      state.targetScore || 700,
      result.level,
      state.dailyMinutes || 20
    );

    saveState({
      ...state,
      placementResult: result,
      learningPath,
      currentStep: 'result',
    });
  };

  const skipPlacementTest = (level: WordLevel = 'essential') => {
    const dummyResult: PlacementResult = {
      level,
      score: level === 'essential' ? 450 : level === 'intermediate' ? 650 : 800,
      questionsAnswered: 0,
      correctAnswers: 0,
      accuracy: 0,
      testedQuestions: [],
    };

    const learningPath = generateLearningPath(
      state.targetScore || 700,
      level,
      state.dailyMinutes || 20
    );

    saveState({
      ...state,
      placementResult: dummyResult,
      learningPath,
      currentStep: 'result',
    });
  };

  const finishOnboarding = () => {
    saveState({
      ...state,
      isCompleted: true,
      completedAt: new Date().toISOString(),
    });
  };

  const resetOnboarding = () => {
    const reset = { ...DEFAULT_STATE, isCompleted: false, currentStep: 'welcome' as OnboardingStep };
    saveState(reset);
  };

  const startTour = () => {
    saveState({ ...state, tourCompleted: false });
  };

  const completeTour = () => {
    saveState({ ...state, tourCompleted: true });
  };

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
