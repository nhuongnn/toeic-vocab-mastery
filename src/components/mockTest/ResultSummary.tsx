'use client';

import React from 'react';
import { MockTestResult } from '@/types/mockTest';
import { getScoreLevel } from '@/lib/mockTest/scoring';
import { Trophy, Clock, CheckCircle2, TrendingUp, RotateCcw, Home, Layers } from 'lucide-react';
import Link from 'next/link';

interface ResultSummaryProps {
  result: MockTestResult;
  scoreDiff?: number;
  onRetake: () => void;
}

export function ResultSummary({ result, scoreDiff = 0, onRetake }: ResultSummaryProps) {
  const levelInfo = getScoreLevel(result.totalScore);
  const minutesTaken = Math.floor(result.timeTaken / 60);
  const secondsTaken = result.timeTaken % 60;

  return (
    <div className="space-y-8">
      {/* Top Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-indigo-950 via-purple-950/80 to-slate-900 border border-indigo-500/30 p-6 sm:p-10 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3">
              {levelInfo.badge}
            </span>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Kết Quả {result.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Đánh giá theo thang điểm chuẩn hóa ETS TOEIC Reading (5 - 495)
            </p>
          </div>

          {/* Scaled Score Card */}
          <div className="bg-slate-900/90 border border-indigo-500/40 rounded-2xl p-5 sm:p-6 text-center shadow-xl shrink-0 min-w-[200px]">
            <span className="text-xs text-slate-400 font-medium block">Điểm Reading ước tính</span>
            <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 my-1">
              {result.totalScore}
              <span className="text-lg text-slate-500 font-normal">/495</span>
            </div>

            {scoreDiff !== 0 && (
              <span
                className={`inline-flex items-center gap-1 text-xs font-bold ${
                  scoreDiff > 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                {scoreDiff > 0 ? `+${scoreDiff}` : scoreDiff} vs lần trước
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
          <span className="text-xs text-slate-400 block">Số câu đúng</span>
          <span className="text-2xl font-bold text-emerald-400 mt-1 block">
            {result.totalCorrect} / {result.totalQuestions}
          </span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
          <span className="text-xs text-slate-400 block">Độ chính xác</span>
          <span className="text-2xl font-bold text-indigo-400 mt-1 block">
            {result.accuracy}%
          </span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
          <span className="text-xs text-slate-400 block">Thời gian làm bài</span>
          <span className="text-2xl font-bold text-amber-400 mt-1 block">
            {minutesTaken}m {secondsTaken}s
          </span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
          <span className="text-xs text-slate-400 block">Đánh giá trình độ</span>
          <span className="text-sm font-bold text-purple-300 mt-2 block truncate">
            {levelInfo.label.split('/')[0]}
          </span>
        </div>
      </div>

      {/* Part Breakdown Bars */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl">
        <h3 className="text-base font-bold text-slate-100 mb-5">
          Phân Tích Từng Phần Thi (Part Breakdown)
        </h3>

        <div className="space-y-4">
          {result.partScores.map((p) => {
            const partLabels: Record<number, string> = {
              5: 'Part 5 — Incomplete Sentences (Điền câu đơn)',
              6: 'Part 6 — Text Completion (Hoàn thành đoạn văn)',
              7: 'Part 7 — Reading Comprehension (Đọc hiểu văn bản)',
            };

            return (
              <div key={p.part} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-slate-200">
                    {partLabels[p.part] || `Part ${p.part}`}
                  </span>
                  <span className="font-mono text-slate-300 font-medium">
                    {p.correct}/{p.total} ({p.percentage}%)
                  </span>
                </div>

                <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      p.percentage >= 80
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                        : p.percentage >= 60
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
                        : 'bg-gradient-to-r from-amber-500 to-rose-500'
                    }`}
                    style={{ width: `${p.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <button
          onClick={onRetake}
          className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/25"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Làm Lại Đề Này</span>
        </button>

        <Link
          href="/mock-test"
          className="w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm border border-slate-700 transition-colors"
        >
          <Layers className="w-4 h-4" />
          <span>Danh Sách Đề Thi</span>
        </Link>

        <Link
          href="/"
          className="w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm border border-slate-700 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Về Trang Chủ</span>
        </Link>
      </div>
    </div>
  );
}
