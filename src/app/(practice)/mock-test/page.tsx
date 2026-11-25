'use client';

import React, { useState, useEffect } from 'react';
import { TestCard } from '@/components/mockTest/TestCard';
import { ScoreTrendChart } from '@/components/mockTest/ScoreTrendChart';
import { TestHistoryTable } from '@/components/mockTest/TestHistoryTable';
import { getMockTestHistory } from '@/lib/mockTest/storage';
import { MockTestResult } from '@/types/mockTest';
import { Trophy, Zap, FileText, TrendingUp, Sparkles, BookOpen, Headphones, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function MockTestHubPage() {
  const [history, setHistory] = useState<MockTestResult[]>([]);

  useEffect(() => {
    setHistory(getMockTestHistory());
  }, []);

  const highestScore = history.length > 0 ? Math.max(...history.map((h) => h.totalScore)) : 0;
  const avgAccuracy =
    history.length > 0
      ? Math.round(history.reduce((sum, h) => sum + h.accuracy, 0) / history.length)
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Hero Header */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/70 to-purple-950/50 border border-slate-800 p-8 sm:p-10 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Trung Tâm Thi Thử TOEIC • Chuẩn Format ETS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Đo Lường Thực Lực Với <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
              Mock Test Toàn Diện
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Mô phỏng 100% áp lực thời gian, dạng câu hỏi Part 5, 6, 7 và thang điểm quy đổi chuẩn. Hệ thống tự động đồng bộ kết quả làm bài vào tiến trình SRS của bạn.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 max-w-lg">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                {history.length}
              </span>
              <span className="text-xs text-slate-400 block font-medium">Đề đã hoàn thành</span>
            </div>

            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-indigo-400">
                {highestScore > 0 ? highestScore : '—'}
              </span>
              <span className="text-xs text-slate-400 block font-medium">Điểm cao nhất</span>
            </div>

            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                {avgAccuracy > 0 ? `${avgAccuracy}%` : '—'}
              </span>
              <span className="text-xs text-slate-400 block font-medium">Độ chính xác TB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Available Tests Grid */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-400" />
          <span>Chọn Chế Độ Thi Thử</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TestCard
            id="mini-reading"
            type="mini-reading"
            title="Mini Reading Test"
            partsLabel="Part 5 (30 câu) + Part 6 (8 câu) + Part 7 (12 câu)"
            description="Đề thi rút gọn 50 câu trong 30 phút. Hoàn hảo để rèn luyện tốc độ làm bài mỗi tuần và kiểm tra phản xạ từ vựng tức thì."
            timeMinutes={30}
            questionCount={50}
            badge="Khuyên dùng cho tuần này"
            isPopular={true}
          />

          <TestCard
            id="full-reading"
            type="full-reading"
            title="Full Reading Test"
            partsLabel="Part 5 (30 câu) + Part 6 (16 câu) + Part 7 (54 câu)"
            description="Đề thi hoàn chỉnh 100 câu trong 75 phút chuẩn format ETS. Thử thách độ tập trung và sức bền đọc hiểu các bài đọc đôi/ba phức tạp."
            timeMinutes={75}
            questionCount={100}
            badge="Mô phỏng thi thật 100%"
            isPopular={false}
          />
        </div>

        {/* Listening Mock Lab Callout */}
        <div className="p-5 rounded-3xl bg-gradient-to-r from-sky-950/40 via-slate-900 to-indigo-950/40 border border-sky-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Luyện thi Listening Full Parts 1 - 4 & Video Thực Chiến</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300">
                  Mới Cập Nhật
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Thử sức với 42 câu Audio chuẩn format ETS (Mô tả tranh, Hỏi-Đáp, Hội thoại 3 người, Thư thoại) và 9 video tình huống công sở đời thực.
              </p>
            </div>
          </div>
          <Link
            href="/listening"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-md shadow-sky-600/30 transition-all flex-shrink-0"
          >
            <span>Vào Phòng Luyện Nghe</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Score Trend Line Chart */}
      <ScoreTrendChart history={history} />

      {/* Test History Table */}
      <TestHistoryTable history={history} />
    </div>
  );
}
