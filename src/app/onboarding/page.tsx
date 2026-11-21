'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { WelcomeHero } from '@/components/onboarding/WelcomeHero';
import { GoalSelector } from '@/components/onboarding/GoalSelector';
import { ScheduleSelector } from '@/components/onboarding/ScheduleSelector';
import { ExperienceSelector } from '@/components/onboarding/ExperienceSelector';
import { PlacementQuestion } from '@/components/onboarding/PlacementQuestion';
import { PlacementProgress } from '@/components/onboarding/PlacementProgress';
import { LearningPathPreview } from '@/components/onboarding/LearningPathPreview';
import { generatePlacementQuestionPool } from '@/lib/placement/placementQuestions';
import { AdaptiveTestSession } from '@/lib/placement/adaptiveTest';
import { useProgress } from '@/contexts/ProgressContext';
import { ArrowLeft } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const {
    state,
    setStep,
    setTargetScore,
    setDailyMinutes,
    setExperienceLevel,
    savePlacementResult,
    skipPlacementTest,
    finishOnboarding,
  } = useOnboarding();

  const { updateDailyGoal } = useProgress();

  // Placement Test session state
  const [testSession, setTestSession] = useState<AdaptiveTestSession | null>(null);
  const [currentQ, setCurrentQ] = useState(testSession?.getCurrentQuestion() || null);
  const [currentDiff, setCurrentDiff] = useState(5.0);
  const [qCount, setQCount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('step') === 'goal') {
        setStep('goal');
      }
    }
  }, [setStep]);

  // Initialize test session when entering placement step
  const handleStartPlacement = () => {
    const pool = generatePlacementQuestionPool();
    const session = new AdaptiveTestSession(pool, 15);
    setTestSession(session);
    setCurrentQ(session.getCurrentQuestion());
    setCurrentDiff(session.currentDifficulty);
    setQCount(1);
    setStep('placement');
  };

  const handleSelectOption = (idx: number) => {
    if (!testSession) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const { isComplete } = testSession.recordAnswer(idx);

      if (isComplete) {
        const result = testSession.getResult();
        savePlacementResult(result);
      } else {
        setCurrentQ(testSession.getCurrentQuestion());
        setCurrentDiff(testSession.currentDifficulty);
        setQCount(testSession.getAnswersCount() + 1);
        setIsSubmitting(false);
      }
    }, 400);
  };

  const handleFinish = () => {
    if (state.dailyMinutes) {
      updateDailyGoal(Math.max(5, Math.round((state.dailyMinutes / 20) * 15)));
    }
    finishOnboarding();
    router.push('/');
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center py-8">
      {state.currentStep === 'welcome' && (
        <WelcomeHero
          onStart={() => setStep('goal')}
          onSkip={() => {
            skipPlacementTest('essential');
            handleFinish();
          }}
        />
      )}

      {state.currentStep === 'goal' && (
        <GoalSelector
          selectedScore={state.targetScore || 650}
          onSelect={(s) => setTargetScore(s)}
          onNext={() => setStep('schedule')}
        />
      )}

      {state.currentStep === 'schedule' && (
        <ScheduleSelector
          selectedMinutes={state.dailyMinutes || 20}
          onSelect={(m) => setDailyMinutes(m)}
          onNext={() => setStep('experience')}
          onBack={() => setStep('goal')}
        />
      )}

      {state.currentStep === 'experience' && (
        <ExperienceSelector
          selectedExp={state.experienceLevel}
          onSelect={(exp) => setExperienceLevel(exp)}
          onStartPlacement={handleStartPlacement}
          onSkipToLevel={() => skipPlacementTest('essential')}
          onBack={() => setStep('schedule')}
        />
      )}

      {state.currentStep === 'placement' && currentQ && (
        <div className="max-w-2xl mx-auto px-4 w-full">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => skipPlacementTest('essential')}
              className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              Bỏ qua bài kiểm tra
            </button>
            <span className="text-xs text-slate-400">Placement Test</span>
          </div>

          <PlacementProgress
            currentQuestion={qCount}
            totalQuestions={15}
            currentDifficulty={currentDiff}
          />

          <PlacementQuestion
            question={currentQ}
            onSelectOption={handleSelectOption}
            isSubmitting={isSubmitting}
          />
        </div>
      )}

      {state.currentStep === 'result' && state.learningPath && (
        <LearningPathPreview
          learningPath={state.learningPath}
          placementResult={state.placementResult}
          onFinish={handleFinish}
          onEditGoal={() => setStep('goal')}
        />
      )}
    </div>
  );
}
