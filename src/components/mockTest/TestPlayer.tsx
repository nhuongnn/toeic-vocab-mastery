'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  MockTestConfig,
  FlattenedQuestion,
  PartNumber,
  MockTestSession,
} from '@/types/mockTest';
import { loadMockTestData, assembleTestQuestions } from '@/lib/mockTest/questionSelector';
import { useTestTimer } from '@/lib/mockTest/timer';
import { evaluateTestSubmission } from '@/lib/mockTest/scoring';
import { syncMockTestWithSRS } from '@/lib/mockTest/srsIntegration';
import {
  saveActiveSession,
  getActiveSession,
  clearActiveSession,
  saveMockTestResult,
} from '@/lib/mockTest/storage';
import { TimerDisplay } from './TimerDisplay';
import { PartNavigation } from './PartNavigation';
import { QuestionNavigator } from './QuestionNavigator';
import { QuestionDisplay } from './QuestionDisplay';
import { TestSubmitDialog } from './TestSubmitDialog';
import {
  Flag,
  ArrowLeft,
  ArrowRight,
  Send,
  Grid,
  Play,
  RotateCcw,
} from 'lucide-react';

interface TestPlayerProps {
  testId: string;
}

export function TestPlayer({ testId }: TestPlayerProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<MockTestConfig | null>(null);
  const [questions, setQuestions] = useState<FlattenedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showNavSheet, setShowNavSheet] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [startTime, setStartTime] = useState<number>(0);

  // Load questions and restore session
  useEffect(() => {
    async function init() {
      try {
        const { config, part5Pool, part6Pool, part7Pool } = await loadMockTestData(testId);
        setConfig(config);

        const assembled = assembleTestQuestions(config, part5Pool, part6Pool, part7Pool);
        setQuestions(assembled);

        // Check if existing session
        const existingSession = getActiveSession(testId);
        if (existingSession && !existingSession.isCompleted) {
          setAnswers(existingSession.answers || {});
          setFlaggedQuestions(existingSession.flaggedQuestions || []);
          setCurrentIndex(existingSession.currentQuestionIndex || 0);
          setSessionId(existingSession.testId + '_' + existingSession.startedAt);
          setStartTime(new Date(existingSession.startedAt).getTime() || Date.now());
        } else {
          const now = Date.now();
          setStartTime(now);
          const newSessionId = `test_${now}_${Math.random().toString(36).substring(2, 7)}`;
          setSessionId(newSessionId);
        }
      } catch (err) {
        console.error('Failed to load test:', err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [testId]);

  // Timer setup
  const timeLimit = config?.timeLimit || 1800;

  const handleSubmit = useCallback(() => {
    if (!config || questions.length === 0) return;

    const timeTaken = Math.max(1, Math.round((Date.now() - startTime) / 1000));

    // Evaluate
    const result = evaluateTestSubmission({
      testId,
      sessionId,
      title: config.title,
      type: config.type,
      timeTaken,
      questions,
      answers,
    });

    // Sync with SRS
    syncMockTestWithSRS(questions, answers);

    // Save result & clear session
    saveMockTestResult(result);
    clearActiveSession(testId);

    // Redirect to result page
    router.push(`/mock-test/${testId}/result?sessionId=${result.sessionId}`);
  }, [config, questions, testId, sessionId, startTime, answers, router]);

  const {
    timeRemaining,
    isPaused,
    isWarning,
    isCritical,
    pause,
    resume,
    formatTime,
    percentRemaining,
  } = useTestTimer(timeLimit, handleSubmit);

  // Auto-save active session
  useEffect(() => {
    if (!config || questions.length === 0 || loading) return;

    const session: MockTestSession = {
      testId,
      config,
      startedAt: new Date(startTime).toISOString(),
      answers,
      currentPart: questions[currentIndex]?.part || 5,
      currentQuestionIndex: currentIndex,
      timeRemaining,
      isCompleted: false,
      isPaused,
      flaggedQuestions,
    };
    saveActiveSession(session);
  }, [testId, config, questions, answers, currentIndex, timeRemaining, isPaused, flaggedQuestions, startTime, loading]);

  const currentQ = questions[currentIndex];

  // Navigation handlers
  const handleSelectOption = (idx: number) => {
    if (!currentQ) return;
    setAnswers((prev) => ({ ...prev, [currentQ.id]: idx }));
  };

  const handleToggleFlag = () => {
    if (!currentQ) return;
    setFlaggedQuestions((prev) =>
      prev.includes(currentQ.id)
        ? prev.filter((id) => id !== currentQ.id)
        : [...prev, currentQ.id]
    );
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSelectPart = (part: PartNumber) => {
    const firstQIndex = questions.findIndex((q) => q.part === part);
    if (firstQIndex !== -1) {
      setCurrentIndex(firstQIndex);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, questions.length]);

  // Answered stats
  const answeredCount = Object.values(answers).filter((a) => a !== null && a !== undefined).length;
  const unansweredCount = questions.length - answeredCount;
  const flaggedCount = flaggedQuestions.length;

  const answeredByPart = useMemo(() => {
    const map: Record<PartNumber, { answered: number; total: number }> = {
      1: { answered: 0, total: 0 },
      2: { answered: 0, total: 0 },
      3: { answered: 0, total: 0 },
      4: { answered: 0, total: 0 },
      5: { answered: 0, total: 0 },
      6: { answered: 0, total: 0 },
      7: { answered: 0, total: 0 },
    };

    for (const q of questions) {
      if (!map[q.part]) map[q.part] = { answered: 0, total: 0 };
      map[q.part].total++;
      if (answers[q.id] !== null && answers[q.id] !== undefined) {
        map[q.part].answered++;
      }
    }
    return map;
  }, [questions, answers]);

  if (loading) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        <p className="text-sm text-slate-400 font-medium">Đang chuẩn bị đề thi...</p>
      </div>
    );
  }

  if (!config || questions.length === 0 || !currentQ) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4">
        <h3 className="text-xl font-bold text-slate-200 mb-2">Không tìm thấy bài thi</h3>
        <p className="text-slate-400 text-sm mb-6">Đề thi không tồn tại hoặc dữ liệu chưa sẵn sàng.</p>
        <button
          onClick={() => router.push('/mock-test')}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium"
        >
          Quay lại danh sách đề
        </button>
      </div>
    );
  }

  const partsList: PartNumber[] = Array.from(new Set(questions.map((q) => q.part))).sort();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5">
      {/* Test Player Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-xl sticky top-20 z-30 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div>
            <span className="text-xs font-semibold text-slate-400 block uppercase">
              {config.title}
            </span>
            <span className="text-base sm:text-lg font-extrabold text-slate-100">
              Câu {currentIndex + 1} / {questions.length}
            </span>
          </div>

          <div className="hidden sm:block h-6 w-px bg-slate-800 mx-2" />

          {/* Part Navigation */}
          <div className="hidden sm:block">
            <PartNavigation
              parts={partsList}
              currentPart={currentQ.part}
              onSelectPart={handleSelectPart}
              answeredByPart={answeredByPart}
            />
          </div>
        </div>

        {/* Right tools: Timer + Nav Toggle + Submit */}
        <div className="flex items-center gap-2 sm:gap-3">
          <TimerDisplay
            timeRemaining={timeRemaining}
            formatTime={formatTime}
            isPaused={isPaused}
            isWarning={isWarning}
            isCritical={isCritical}
            percentRemaining={percentRemaining}
            onPause={pause}
            onResume={resume}
          />

          <button
            onClick={() => setShowNavSheet(!showNavSheet)}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors"
            title="Mở bảng câu hỏi"
          >
            <Grid className="w-4 h-4" />
            <span className="hidden sm:inline">Bảng câu</span>
          </button>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Nộp bài</span>
          </button>
        </div>
      </div>

      {/* Mobile Part Nav row */}
      <div className="sm:hidden">
        <PartNavigation
          parts={partsList}
          currentPart={currentQ.part}
          onSelectPart={handleSelectPart}
          answeredByPart={answeredByPart}
        />
      </div>

      {/* Question Navigator Drawer / Sheet */}
      {showNavSheet && (
        <div className="animate-in fade-in duration-200">
          <QuestionNavigator
            questions={questions}
            currentIndex={currentIndex}
            answers={answers}
            flaggedQuestions={flaggedQuestions}
            onSelectIndex={(idx) => {
              setCurrentIndex(idx);
              setShowNavSheet(false);
            }}
          />
        </div>
      )}

      {/* Main Question Display */}
      <div className="min-h-[50vh]">
        <QuestionDisplay
          question={currentQ}
          selectedAnswer={answers[currentQ.id] ?? null}
          onSelectOption={handleSelectOption}
        />
      </div>

      {/* Bottom Footer Controls */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleFlag}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
              flaggedQuestions.includes(currentQ.id)
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 ring-1 ring-amber-500/30'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            <Flag className={`w-3.5 h-3.5 ${flaggedQuestions.includes(currentQ.id) ? 'fill-current' : ''}`} />
            <span>{flaggedQuestions.includes(currentQ.id) ? 'Đã đánh dấu' : 'Đánh dấu'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Câu trước</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20"
          >
            <span>Câu tiếp</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Pause Modal Overlay */}
      {isPaused && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto mb-4">
              <Play className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-2">Bài thi đang tạm dừng</h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Thời gian đã ngừng đếm. Hãy sẵn sàng trước khi tiếp tục.
            </p>
            <button
              onClick={resume}
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30"
            >
              Tiếp tục làm bài
            </button>
          </div>
        </div>
      )}

      {/* Submit Confirmation Dialog */}
      <TestSubmitDialog
        isOpen={showSubmitModal}
        totalQuestions={questions.length}
        answeredCount={answeredCount}
        unansweredCount={unansweredCount}
        flaggedCount={flaggedCount}
        onConfirm={handleSubmit}
        onCancel={() => setShowSubmitModal(false)}
      />
    </div>
  );
}
