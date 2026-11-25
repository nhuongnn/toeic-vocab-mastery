'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Flame,
  CheckCircle2,
  Bookmark,
  Zap,
  Target,
  ArrowRight,
  TrendingUp,
  FileText,
  Share2,
  Settings,
  Sparkles,
  Brain,
} from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { allVocabularyWords, wordsById } from '@/data/vocabulary';
import { StudyHeatmap } from '@/components/analytics/StudyHeatmap';
import { ProgressVelocityChart } from '@/components/analytics/ProgressVelocityChart';
import { WeakAreasAnalysis } from '@/components/analytics/WeakAreasAnalysis';
import { StudyTimeTracker } from '@/components/analytics/StudyTimeTracker';
import { ScoreTrendSection } from '@/components/analytics/ScoreTrendSection';
import { ExportReportModal } from '@/components/analytics/ExportReportModal';

export default function ProgressDashboardPage() {
  const { progress, dueCount } = useProgress();
  const { state: onboardingState } = useOnboarding();
  const [mounted, setMounted] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const targetScore = onboardingState.learningPath?.targetScore || onboardingState.targetScore || 650;
  const cardsList = Object.values(progress.cards);
  const masteredCards = cardsList.filter((c) => c.interval >= 14);

  const bookmarkedWords = progress.bookmarkedWordIds
    .map((id) => wordsById[id])
    .filter(Boolean);

  const totalWordsCount = allVocabularyWords.length;
  const learnedCount = mounted ? progress.stats.totalWordsLearned : 0;
  const currentStreak = mounted ? progress.stats.currentStreak : 0;
  const longestStreak = mounted ? progress.stats.longestStreak : 0;
  const safeDueCount = mounted ? dueCount : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Export Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Trophy className="w-3.5 h-3.5 text-indigo-400" />
            <span>Quantitative Analytics & SRS Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Trung Tâm Phân Tích & Tiến Trình Học
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl">
            Theo dõi chuyên sâu tốc độ ghi nhớ dài hạn, chẩn đoán lỗ hổng kiến thức và dự phóng điểm số mục tiêu {targetScore}+ TOEIC.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <Link
            href="/mind-map?mode=progress"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-200 font-bold text-xs uppercase tracking-wider transition-all"
          >
            <Brain className="w-4 h-4 text-purple-400" />
            <span>Knowledge Graph</span>
          </Link>

          <button
            type="button"
            onClick={() => setExportModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-indigo-600/25"
          >
            <Share2 className="w-4 h-4" />
            <span>Xuất báo cáo</span>
          </button>

          <Link
            href="/settings"
            aria-label="Cài đặt hệ thống"
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
            title="Cài đặt & Tùy biến"
          >
            <Settings className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Target Meter Card */}
      <section className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/70 to-purple-950/50 border border-slate-800 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div data-tour="dashboard-score" className="p-1 -m-1 rounded-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-1">
              Estimated TOEIC English Proficiency
            </span>
            <div className="text-4xl sm:text-5xl font-black text-white flex items-baseline gap-2">
              <span>{progress.stats.estimatedToeicScore}</span>
              <span className="text-lg font-bold text-slate-400 font-normal">/ 990</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-2 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span>Mục tiêu: {targetScore}+ TOEIC</span>
            </span>
          </div>
        </div>

        {/* Progress Bar towards targetScore */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Khởi điểm (400)</span>
            <span className="text-indigo-400 font-bold">Mục tiêu ({targetScore})</span>
            <span>Tối đa (990)</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-950 border border-slate-800 overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500"
              style={{
                width: `${Math.min(
                  100,
                  Math.max(0, ((progress.stats.estimatedToeicScore - 400) / (targetScore - 400)) * 100)
                )}%`,
              }}
            />
          </div>
        </div>
      </section>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Tổng Từ Đã Học</span>
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
          </div>
          <div suppressHydrationWarning className="text-3xl font-black text-white">
            {learnedCount}
          </div>
          <div className="text-[11px] text-slate-500">
            Trên tổng số {totalWordsCount} từ vựng bản xứ
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Chuỗi Bền Bỉ</span>
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <div suppressHydrationWarning className="text-3xl font-black text-amber-400">
            {currentStreak} Ngày
          </div>
          <div suppressHydrationWarning className="text-[11px] text-slate-500">
            Kỷ lục ghi nhận: {longestStreak} ngày
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Đã Nhớ Sâu (≥14d)</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div suppressHydrationWarning className="text-3xl font-black text-emerald-400">
            {mounted ? masteredCards.length : 0}
          </div>
          <div className="text-[11px] text-slate-500">
            Lưu trữ trong bộ nhớ vĩnh viễn
          </div>
        </div>

        <Link
          href="/review"
          className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-pink-500/50 space-y-2 transition-all block group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Cần Ôn Tập Ngay</span>
            <Zap className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
          </div>
          <div suppressHydrationWarning className="text-3xl font-black text-pink-400">
            {safeDueCount}
          </div>
          <div className="text-[11px] text-pink-400 font-semibold flex items-center gap-1">
            <span>Mở hàng đợi ôn tập</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </Link>
      </div>

      {/* Recommendation 7: 1. Heatmap Lịch Học */}
      <StudyHeatmap
        cards={progress.cards}
        history={progress.history}
        currentStreak={currentStreak}
        longestStreak={longestStreak}
      />

      {/* Recommendation 7: 2. Biểu Đồ Tiến Trình Học Tập (Velocity Chart) */}
      <ProgressVelocityChart
        cards={progress.cards}
        totalLearned={progress.stats.totalWordsLearned}
      />

      {/* Recommendation 7: 3. Phân Tích Điểm Yếu (Weak Areas Analysis) */}
      <WeakAreasAnalysis
        cards={progress.cards}
        history={progress.history}
      />

      {/* Recommendation 7: 4. Theo Dõi Thời Gian Học (Study Time Tracking) */}
      <StudyTimeTracker
        cards={progress.cards}
        history={progress.history}
        dailyGoal={progress.stats.dailyGoal}
      />

      {/* Recommendation 7: 5. Quỹ Đạo & Dự Đoán Điểm TOEIC (Score Trend) */}
      <ScoreTrendSection
        currentEstimatedScore={progress.stats.estimatedToeicScore}
        totalWordsLearned={progress.stats.totalWordsLearned}
        targetScore={targetScore}
      />

      {/* Bookmarked Words Table */}
      {bookmarkedWords.length > 0 && (
        <section className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center gap-2 text-amber-400">
            <Bookmark className="w-5 h-5 fill-amber-400" />
            <h2 className="text-base font-bold uppercase tracking-wider text-white">
              Danh Sách Từ Vựng Đánh Dấu Cần Lưu Ý ({bookmarkedWords.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {bookmarkedWords.map((word) => (
              <Link
                key={word.id}
                href={`/word/${word.id}`}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-white uppercase text-sm">{word.word}</div>
                  <div className="text-xs text-slate-400 font-mono">{word.pronunciation.ipa}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Recent Exercise History */}
      {progress.history.length > 0 && (
        <section className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <h2 className="text-base font-bold uppercase tracking-wider text-white">
            Nhật Ký Các Phiên Luyện Tập Gần Đây
          </h2>
          <div className="space-y-2">
            {progress.history.slice(0, 5).map((session, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-indigo-300">
                    {session.type}
                  </span>
                  <span className="text-slate-400">
                    {new Date(session.date).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <div className="font-semibold text-slate-200">
                  {session.correctAnswers} / {session.totalQuestions} ({session.scorePercentage}%)
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Mock Test Callout */}
      <section className="rounded-3xl bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900 border border-indigo-500/30 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Kiểm tra thực lực với Mock Test</h3>
            <p className="text-xs text-slate-300">
              Làm bài thi thử 50 câu (Mini Reading) hoặc 100 câu (Full Reading) để kiểm tra điểm TOEIC chuẩn.
            </p>
          </div>
        </div>
        <Link
          href="/mock-test"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-indigo-600/25 shrink-0"
        >
          <span>Vào thi thử</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Recommendation 7: 6. Modal Xuất Báo Cáo */}
      <ExportReportModal
        progress={progress}
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        targetScore={targetScore}
      />
    </div>
  );
}
