'use client';

import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Copy,
  Download,
  X,
  Check,
  Trophy,
  Target,
  Flame,
  Award,
  Calendar,
  Layers,
  Sparkles,
  Share2,
} from 'lucide-react';
import { UserProgressData } from '@/types/progress';
import { useAuth } from '@/contexts/AuthContext';
import { wordsById } from '@/data/vocabulary';
import { categories } from '@/data/categories';

interface ExportReportModalProps {
  progress: UserProgressData;
  isOpen: boolean;
  onClose: () => void;
}

export function ExportReportModal({ progress, isOpen, onClose }: ExportReportModalProps) {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [todayStr, setTodayStr] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      setTodayStr(
        new Date().toLocaleDateString('vi-VN', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        })
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const cardsList = Object.values(progress.cards);
  const masteredCount = cardsList.filter((c) => c.interval >= 14).length;
  const reviewingCount = cardsList.filter((c) => c.interval > 1 && c.interval < 14).length;
  const learningCount = cardsList.filter((c) => c.interval <= 1).length;
  const masteryRate = cardsList.length > 0 ? Math.round((masteredCount / cardsList.length) * 100) : 0;

  // Calculate weak & strong category
  const catMap: Record<string, { total: number; mastered: number }> = {};
  cardsList.forEach((c) => {
    const w = wordsById[c.wordId];
    if (!w) return;
    if (!catMap[w.category]) catMap[w.category] = { total: 0, mastered: 0 };
    catMap[w.category].total++;
    if (c.interval >= 14) catMap[w.category].mastered++;
  });

  const rankedCats = Object.entries(catMap)
    .map(([catId, data]) => {
      const catObj = categories.find((cat) => cat.id === catId);
      const rate = data.total > 0 ? Math.round((data.mastered / data.total) * 100) : 0;
      return {
        id: catId,
        name: catObj?.name || catId,
        rate,
        total: data.total,
        mastered: data.mastered,
      };
    })
    .sort((a, b) => b.rate - a.rate);

  const topStrong = rankedCats.slice(0, 2);
  const topWeak = [...rankedCats].reverse().slice(0, 2);

  // Generate shareable text
  const reportSummaryText = `🎯 BÁO CÁO TIẾN ĐỘ TOEIC VOCABULARY MASTERY
Ngày lập: ${todayStr}
----------------------------------------
📊 Điểm TOEIC dự đoán: ${progress.stats.estimatedToeicScore} / 990 (Mục tiêu: 700+)
📚 Tổng từ vựng đã học: ${progress.stats.totalWordsLearned} từ (Thành thục: ${masteredCount} từ - ${masteryRate}%)
🔥 Chuỗi học liên tục: ${progress.stats.currentStreak} ngày (Kỷ lục: ${progress.stats.longestStreak} ngày)
🌟 Điểm mạnh: ${topStrong.map((c) => `${c.name} (${c.rate}%)`).join(', ') || 'Chưa ghi nhận'}
⚠️ Cần củng cố: ${topWeak.map((c) => `${c.name} (${c.rate}%)`).join(', ') || 'Chưa ghi nhận'}
----------------------------------------
Học từ vựng TOEIC đa giác quan & tư duy bản ngữ cùng TOEIC Deep Mastery!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(reportSummaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    const reportData = {
      reportDate: new Date().toISOString(),
      studentEmail: user?.email || 'Guest User',
      estimatedToeicScore: progress.stats.estimatedToeicScore,
      targetScore: 700,
      stats: progress.stats,
      masteryBreakdown: {
        totalWords: progress.stats.totalWordsLearned,
        mastered: masteredCount,
        reviewing: reviewingCount,
        learning: learningCount,
        masteryRate: `${masteryRate}%`,
      },
      rankedCategories: rankedCats,
      recentHistory: progress.history.slice(0, 10),
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `toeic-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8">
        {/* Header Actions */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 print-hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Báo Cáo Tiến Độ & Năng Lực TOEIC</h3>
              <p className="text-xs text-slate-400">Xuất file PDF, sao chép chia sẻ hoặc lưu trữ dữ liệu</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Certificate / Report Card */}
        <div
          id="printable-report"
          className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6 text-slate-100 print:bg-white print:text-black print:border-slate-300 print:shadow-none"
        >
          {/* Certificate Header */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-indigo-400 print:text-indigo-600" />
                <span className="font-extrabold text-lg tracking-tight uppercase">
                  TOEIC Deep Mastery • Official Learning Report
                </span>
              </div>
              <p className="text-xs text-slate-400 print:text-slate-600">
                Báo cáo định lượng khả năng ghi nhớ dài hạn & dự phóng điểm số theo thuật toán SM-2
              </p>
            </div>
            <div className="text-right text-xs text-slate-400 print:text-slate-600">
              <div>Ngày cấp: <strong className="text-white print:text-black">{todayStr}</strong></div>
              <div>Học viên: <strong className="text-indigo-400 print:text-indigo-600">{user?.email || 'Học viên vãng lai'}</strong></div>
            </div>
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 print:bg-slate-50 print:border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 print:text-slate-500 block">
                Điểm Dự Đoán
              </span>
              <span className="text-2xl font-black text-indigo-400 print:text-indigo-600 font-mono">
                {progress.stats.estimatedToeicScore}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Mục tiêu: 700+</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 print:bg-slate-50 print:border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 print:text-slate-500 block">
                Từ Đã Khám Phá
              </span>
              <span className="text-2xl font-black text-white print:text-black font-mono">
                {progress.stats.totalWordsLearned}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">/ 3,675 từ</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 print:bg-slate-50 print:border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 print:text-slate-500 block">
                Tỷ Lệ Bền Vững
              </span>
              <span className="text-2xl font-black text-emerald-400 print:text-emerald-600 font-mono">
                {masteryRate}%
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">{masteredCount} từ dài hạn</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 print:bg-slate-50 print:border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 print:text-slate-500 block">
                Chuỗi Bền Bỉ
              </span>
              <span className="text-2xl font-black text-amber-400 print:text-amber-600 font-mono">
                {progress.stats.currentStreak}d
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Kỷ lục: {progress.stats.longestStreak}d</span>
            </div>
          </div>

          {/* Detailed Strengths & Weaknesses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 print:bg-slate-50">
              <span className="font-bold text-emerald-400 print:text-emerald-700 block mb-2 flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>Chủ Đề Nắm Chắc Nhất (Top Strengths)</span>
              </span>
              {topStrong.length > 0 ? (
                <div className="space-y-1.5">
                  {topStrong.map((c) => (
                    <div key={c.id} className="flex items-center justify-between">
                      <span className="text-slate-300 print:text-slate-700">{c.name}</span>
                      <strong className="text-emerald-400 print:text-emerald-700">{c.rate}% vững</strong>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-slate-500">Đang cập nhật thêm dữ liệu...</span>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 print:bg-slate-50">
              <span className="font-bold text-rose-400 print:text-rose-700 block mb-2 flex items-center gap-1.5">
                <Target className="w-4 h-4" />
                <span>Chủ Đề Cần Ưu Tiên Ôn Luyện (Focus Areas)</span>
              </span>
              {topWeak.length > 0 ? (
                <div className="space-y-1.5">
                  {topWeak.map((c) => (
                    <div key={c.id} className="flex items-center justify-between">
                      <span className="text-slate-300 print:text-slate-700">{c.name}</span>
                      <strong className="text-rose-400 print:text-rose-700">{c.rate}% vững</strong>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-slate-500">Đang cập nhật thêm dữ liệu...</span>
              )}
            </div>
          </div>

          {/* Actionable Advice Footer */}
          <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-slate-300 print:text-slate-700 print:bg-indigo-50 print:border-indigo-200 space-y-1">
            <span className="font-bold text-indigo-400 print:text-indigo-700 block">Khuyến nghị lộ trình học tập:</span>
            <p>
              Duy trì tối thiểu {progress.stats.dailyGoal} từ mới mỗi ngày và giải quyết dứt điểm các thẻ ôn đến hạn (Due Review) để giữ khoảng cách lặp lại tối ưu trong trí nhớ dài hạn.
            </p>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 print-hidden">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-indigo-400" />
            <span>Chia sẻ tiến độ để tự tạo động lực học tập mỗi ngày</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Đã sao chép!' : 'Sao chép tóm tắt'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadJson}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải tệp JSON</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-indigo-600/25"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In / Lưu PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
