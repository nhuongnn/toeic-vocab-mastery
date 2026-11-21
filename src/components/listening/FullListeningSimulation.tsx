'use client';

import React, { useState, useEffect } from 'react';
import {
  Trophy,
  RotateCcw,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Headphones,
  Award,
  Sparkles,
  Zap,
  BarChart3,
} from 'lucide-react';
import { Part1PhotographsView } from './Part1PhotographsView';
import { Part2QuestionResponseView } from './Part2QuestionResponseView';
import { Part3ConversationsView } from './Part3ConversationsView';
import { Part4ShortTalksView } from './Part4ShortTalksView';
import {
  part1Questions,
  part2Questions,
  part3Conversations,
  part4ShortTalks,
} from '@/data/listening';
import { useProgress } from '@/contexts/ProgressContext';
import { ListeningPart } from '@/types/listening';

interface FullListeningSimulationProps {
  onExit?: () => void;
}

export function FullListeningSimulation({ onExit }: FullListeningSimulationProps) {
  const { recordExerciseSession } = useProgress();

  const [activePart, setActivePart] = useState<ListeningPart>(1);
  const [partScores, setPartScores] = useState<Record<ListeningPart, { correct: number; total: number }>>({
    1: { correct: 0, total: part1Questions.length },
    2: { correct: 0, total: part2Questions.length },
    3: { correct: 0, total: part3Conversations.reduce((s, c) => s + c.questions.length, 0) },
    4: { correct: 0, total: part4ShortTalks.reduce((s, t) => s + t.questions.length, 0) },
  });
  const [completedParts, setCompletedParts] = useState<ListeningPart[]>([]);
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  // Timer
  useEffect(() => {
    if (isTestFinished) return;
    const interval = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isTestFinished]);

  const handlePartComplete = (part: ListeningPart, correct: number, total: number) => {
    setPartScores((prev) => ({
      ...prev,
      [part]: { correct, total },
    }));

    if (!completedParts.includes(part)) {
      setCompletedParts((prev) => [...prev, part]);
    }

    // Auto advance to next part or finish
    if (part < 4) {
      setActivePart((part + 1) as ListeningPart);
    } else {
      finishTest({ ...partScores, [part]: { correct, total } });
    }
  };

  const finishTest = (finalScores = partScores) => {
    setIsTestFinished(true);
    const totalCorrect = Object.values(finalScores).reduce((s, p) => s + p.correct, 0);
    const totalQuestions = Object.values(finalScores).reduce((s, p) => s + p.total, 0);
    const percentage = Math.round((totalCorrect / totalQuestions) * 100);

    recordExerciseSession({
      date: new Date().toISOString(),
      type: 'listening',
      totalQuestions,
      correctAnswers: totalCorrect,
      scorePercentage: percentage,
      wordsPracticed: ['part1-mastery', 'part2-mastery', 'part3-mastery', 'part4-mastery'],
    });
  };

  const totalCorrect = Object.values(partScores).reduce((s, p) => s + p.correct, 0);
  const totalQuestions = Object.values(partScores).reduce((s, p) => s + p.total, 0);
  const totalAccuracy = Math.round((totalCorrect / totalQuestions) * 100) || 0;

  // Approximate TOEIC Listening Scaled Score (5 - 495)
  const estimatedToeicScore = Math.min(495, Math.max(5, Math.round((totalCorrect / totalQuestions) * 490 + 5)));

  if (isTestFinished) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4 space-y-8">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-sky-500/30">
            <Trophy className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">
            Hoàn Thành Bài Thi Thử Listening!
          </h2>
          <p className="text-sm text-slate-400">
            Kết quả của bạn đã được tự động lưu vào tiến trình cá nhân hóa SRS.
          </p>
        </div>

        {/* Score Card */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-2xl grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">
              Ước tính TOEIC Listening
            </span>
            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
              {estimatedToeicScore}
            </div>
            <span className="text-[11px] text-slate-400">Thang điểm 495 chuẩn ETS</span>
          </div>

          <div className="space-y-1 border-t sm:border-t-0 sm:border-x border-slate-800 pt-4 sm:pt-0">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">
              Độ chính xác chung
            </span>
            <div className="text-5xl font-black text-emerald-400">
              {totalAccuracy}%
            </div>
            <span className="text-[11px] text-slate-400">
              {totalCorrect} / {totalQuestions} câu đúng
            </span>
          </div>

          <div className="space-y-1 pt-4 sm:pt-0">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">
              Thời gian làm bài
            </span>
            <div className="text-5xl font-black text-purple-400 font-mono">
              {Math.floor(timeSpent / 60)}m {timeSpent % 60}s
            </div>
            <span className="text-[11px] text-slate-400">Tốc độ phản xạ tốt</span>
          </div>
        </div>

        {/* Breakdown by Part */}
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-sky-400" />
            <span>Phân Tích Chi Tiết Từng Phần (Part 1 - 4):</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((pNum) => {
              const partData = partScores[pNum as ListeningPart];
              const pct = Math.round((partData.correct / partData.total) * 100) || 0;
              const partNames = [
                'Part 1: Photographs',
                'Part 2: Question - Response',
                'Part 3: Short Conversations',
                'Part 4: Short Talks',
              ];

              return (
                <div
                  key={pNum}
                  className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-200">{partNames[pNum - 1]}</span>
                    <span className="font-bold text-sky-400">{pct}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-slate-400 text-right">
                    {partData.correct} / {partData.total} câu
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => {
              setIsTestFinished(false);
              setActivePart(1);
              setTimeSpent(0);
              setCompletedParts([]);
            }}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Làm Lại Đề Thi</span>
          </button>

          {onExit && (
            <button
              onClick={onExit}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors"
            >
              <span>Trở về Trang Luyện Nghe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Simulation Top Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        {/* Parts switcher */}
        <div className="flex items-center gap-2">
          {([1, 2, 3, 4] as ListeningPart[]).map((pNum) => {
            const isActive = activePart === pNum;
            const isDone = completedParts.includes(pNum);

            return (
              <button
                key={pNum}
                onClick={() => setActivePart(pNum)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-sm'
                    : isDone
                    ? 'bg-emerald-950/40 border border-emerald-500/50 text-emerald-300'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>Part {pNum}</span>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            );
          })}
        </div>

        {/* Timer & Finish Button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>
              {String(Math.floor(timeSpent / 60)).padStart(2, '0')}:
              {String(timeSpent % 60).padStart(2, '0')}
            </span>
          </div>

          <button
            onClick={() => finishTest()}
            className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors"
          >
            Nộp bài thi
          </button>
        </div>
      </div>

      {/* Render Active Part View */}
      {activePart === 1 && (
        <Part1PhotographsView
          questions={part1Questions}
          onComplete={(corr, tot) => handlePartComplete(1, corr, tot)}
        />
      )}

      {activePart === 2 && (
        <Part2QuestionResponseView
          questions={part2Questions}
          onComplete={(corr, tot) => handlePartComplete(2, corr, tot)}
        />
      )}

      {activePart === 3 && (
        <Part3ConversationsView
          conversations={part3Conversations}
          onComplete={(corr, tot) => handlePartComplete(3, corr, tot)}
        />
      )}

      {activePart === 4 && (
        <Part4ShortTalksView
          talks={part4ShortTalks}
          onComplete={(corr, tot) => handlePartComplete(4, corr, tot)}
        />
      )}
    </div>
  );
}
