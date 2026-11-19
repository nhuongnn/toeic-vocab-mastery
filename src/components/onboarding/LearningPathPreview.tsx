'use client';

import React from 'react';
import { LearningPath, PlacementResult } from '@/types/onboarding';
import { getLevelDescription } from '@/lib/placement/levelEstimator';
import { Trophy, Calendar, CheckCircle2, ArrowRight, Flame, Layers } from 'lucide-react';
import Link from 'next/link';

interface LearningPathPreviewProps {
  learningPath: LearningPath;
  placementResult: PlacementResult | null;
  onFinish: () => void;
}

export function LearningPathPreview({
  learningPath,
  placementResult,
  onFinish,
}: LearningPathPreviewProps) {
  const levelInfo = getLevelDescription(learningPath.currentLevel);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Result Hero Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white mx-auto mb-4 shadow-xl shadow-indigo-500/25">
          <Trophy className="w-8 h-8" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
          Lộ Trình Học Cá Nhân Hóa Của Bạn
        </h2>

        {placementResult && placementResult.questionsAnswered > 0 ? (
          <div className="inline-flex items-center gap-3 mt-3 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400">
              Điểm ước tính ban đầu: <strong className="text-indigo-400 text-sm">{placementResult.score}</strong>
            </span>
            <span className="w-1 h-1 bg-slate-700 rounded-full" />
            <span className="text-xs text-slate-400">
              Độ chính xác: <strong className="text-emerald-400 text-sm">{placementResult.accuracy}%</strong>
            </span>
          </div>
        ) : null}

        <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-lg mx-auto">
          {levelInfo.description}
        </p>
      </div>

      {/* Target & Schedule Summary Card */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 text-center">
          <span className="text-[11px] text-slate-400 block">Mục tiêu</span>
          <span className="text-base sm:text-lg font-bold text-indigo-400 mt-0.5 block">
            {learningPath.targetScore}+ TOEIC
          </span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 text-center">
          <span className="text-[11px] text-slate-400 block">Thời gian / ngày</span>
          <span className="text-base sm:text-lg font-bold text-amber-400 mt-0.5 block">
            {learningPath.dailyGoal} phút
          </span>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 text-center">
          <span className="text-[11px] text-slate-400 block">Dự kiến hoàn thành</span>
          <span className="text-xs sm:text-sm font-semibold text-emerald-400 mt-1 block">
            {learningPath.estimatedCompletionDate}
          </span>
        </div>
      </div>

      {/* Phases Timeline */}
      <div className="space-y-4 mb-8">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          Các giai đoạn chinh phục
        </h3>

        {learningPath.phases.map((phase, idx) => (
          <div
            key={phase.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <h4 className="text-base font-bold text-slate-100">{phase.title}</h4>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                ~{phase.estimatedDays} ngày
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {phase.description}
            </p>

            {/* Milestones list */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              {phase.milestones.map((m, mIdx) => (
                <div key={mIdx} className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                    {m.description}
                  </span>
                  <span className="font-medium text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                    {m.reward}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onFinish}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30"
        >
          <span>Bắt đầu bài học đầu tiên</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <Link
          href="/categories"
          onClick={onFinish}
          className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm border border-slate-700 transition-colors"
        >
          <Layers className="w-4 h-4" />
          <span>Xem tất cả chủ đề</span>
        </Link>
      </div>
    </div>
  );
}
