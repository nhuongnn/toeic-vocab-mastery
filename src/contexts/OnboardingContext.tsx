'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  OnboardingState,
  OnboardingStep,
  PlacementResult,
  LearningPath,
} from '@/types/onboarding';
import { generateLearningPath } from '@/lib/placement/learningPath';
import { WordLevel } from '@/types/vocabulary';
import { useAuth } from './AuthContext';
import { supabase } from '@/lib/supabase';

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
  const { user } = useAuth();
  const [state, setState] = useState<OnboardingState>(DEFAULT_STATE);
  const [loaded, setLoaded] = useState(false);
  const syncTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load from localStorage on mount & listen for sync events
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

    const handleSync = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          setState((prev) => {
            const merged: OnboardingState = {
              ...prev,
              ...parsed,
              learningPath: parsed.learningPath || prev.learningPath,
              targetScore: parsed.targetScore || prev.targetScore || 650,
              placementResult: parsed.placementResult || prev.placementResult,
              dailyMinutes: parsed.dailyMinutes || prev.dailyMinutes || 20,
              isCompleted: Boolean(
                parsed.isCompleted ||
                prev.isCompleted ||
                parsed.learningPath ||
                prev.learningPath
              ),
            };

            if (!merged.learningPath && merged.targetScore) {
              merged.learningPath = generateLearningPath(
                merged.targetScore,
                merged.placementResult?.level || 'essential',
                merged.dailyMinutes || 20
              );
              merged.isCompleted = true;
            }

            return merged;
          });
        }
      } catch {}
    };

    window.addEventListener('onboarding-synced', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('onboarding-synced', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  // Fetch remote onboarding state from Supabase when user logs in
  useEffect(() => {
    if (!user || !supabase) return;

    let isMounted = true;
    async function syncRemoteOnboarding() {
      try {
        const { data, error } = await supabase!
          .from('user_progress')
          .select('data')
          .eq('user_id', user!.id)
          .maybeSingle();

        if (error || !data?.data?.onboarding) return;

        const remoteOnboarding = data.data.onboarding as OnboardingState;
        if (!isMounted) return;

        setState((prev) => {
          const merged: OnboardingState = {
            ...DEFAULT_STATE,
            ...prev,
            ...remoteOnboarding,
            learningPath: remoteOnboarding.learningPath || prev.learningPath,
            targetScore: remoteOnboarding.targetScore || prev.targetScore || 650,
            placementResult: remoteOnboarding.placementResult || prev.placementResult,
            dailyMinutes: remoteOnboarding.dailyMinutes || prev.dailyMinutes || 20,
            isCompleted: Boolean(
              remoteOnboarding.isCompleted ||
              prev.isCompleted ||
              remoteOnboarding.learningPath ||
              prev.learningPath
            ),
            tourCompleted: Boolean(remoteOnboarding.tourCompleted || prev.tourCompleted),
          };

          if (!merged.learningPath && merged.targetScore) {
            merged.learningPath = generateLearningPath(
              merged.targetScore,
              merged.placementResult?.level || 'essential',
              merged.dailyMinutes || 20
            );
            merged.isCompleted = true;
          }

          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            const rawMain = localStorage.getItem('toeic_vocab_mastery_v1');
            if (rawMain) {
              const parsedMain = JSON.parse(rawMain);
              parsedMain.onboarding = merged;
              localStorage.setItem('toeic_vocab_mastery_v1', JSON.stringify(parsedMain));
            }
          } catch {}

          return merged;
        });
      } catch (e) {
        console.error('Error fetching remote onboarding:', e);
      }
    }

    syncRemoteOnboarding();
    return () => {
      isMounted = false;
    };
  }, [user]);

  // Debounced cloud sync to Supabase
  const scheduleOnboardingCloudSync = useCallback(
    (nextState: OnboardingState) => {
      if (!user || !supabase) return;
      if (syncTimerRef.current) clearTimeout(syncTimerRef.current);

      syncTimerRef.current = setTimeout(async () => {
        try {
          const { data: remoteData } = await supabase!
            .from('user_progress')
            .select('data')
            .eq('user_id', user.id)
            .maybeSingle();

          const currentProgressData = remoteData?.data || {};
          const updatedProgressData = {
            ...currentProgressData,
            onboarding: nextState,
          };

          await supabase!
            .from('user_progress')
            .upsert({
              user_id: user.id,
              data: updatedProgressData,
              updated_at: new Date().toISOString(),
            });
        } catch (err) {
          console.error('Failed to sync onboarding to cloud:', err);
        }
      }, 1000);
    },
    [user]
  );

  const updateState = useCallback(
    (updater: (prev: OnboardingState) => OnboardingState) => {
      setState((prev) => {
        const nextWithoutTimestamp = updater(prev);
        const next: OnboardingState = {
          ...nextWithoutTimestamp,
          updatedAt: new Date().toISOString(),
        };

        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
          const rawMain = localStorage.getItem('toeic_vocab_mastery_v1');
          if (rawMain) {
            const parsedMain = JSON.parse(rawMain);
            parsedMain.onboarding = next;
            localStorage.setItem('toeic_vocab_mastery_v1', JSON.stringify(parsedMain));
          }
        } catch (e) {
          console.error('Failed to save onboarding state:', e);
        }

        scheduleOnboardingCloudSync(next);

        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('onboarding-synced'));
        }

        return next;
      });
    },
    [scheduleOnboardingCloudSync]
  );

  const setStep = useCallback((step: OnboardingStep) => {
    updateState((prev) => ({ ...prev, currentStep: step }));
  }, [updateState]);

  const setTargetScore = useCallback((score: number) => {
    updateState((prev) => {
      const level = prev.placementResult?.level || prev.learningPath?.currentLevel || 'essential';
      const minutes = prev.dailyMinutes || prev.learningPath?.dailyGoal || 20;
      const updatedLearningPath = generateLearningPath(score, level, minutes);

      return {
        ...prev,
        targetScore: score,
        learningPath: updatedLearningPath,
        isCompleted: true,
      };
    });
  }, [updateState]);

  const setDailyMinutes = useCallback((minutes: number) => {
    updateState((prev) => {
      const score = prev.targetScore || prev.learningPath?.targetScore || 650;
      const level = prev.placementResult?.level || prev.learningPath?.currentLevel || 'essential';
      const updatedLearningPath = generateLearningPath(score, level, minutes);

      return {
        ...prev,
        dailyMinutes: minutes,
        learningPath: updatedLearningPath,
        isCompleted: true,
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
