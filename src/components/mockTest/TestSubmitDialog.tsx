'use client';

import React from 'react';
import { AlertCircle, CheckCircle2, Flag, X } from 'lucide-react';

interface TestSubmitDialogProps {
  isOpen: boolean;
  totalQuestions: number;
  answeredCount: number;
  unansweredCount: number;
  flaggedCount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export function TestSubmitDialog({
  isOpen,
  totalQuestions,
  answeredCount,
  unansweredCount,
  flaggedCount,
  onConfirm,
  onCancel,
}: TestSubmitDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
          <AlertCircle className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-bold text-slate-100 mb-2">
          Xác nhận nộp bài thi?
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
          Sau khi nộp, hệ thống sẽ tính điểm TOEIC chuẩn hóa và phân tích chi tiết kết quả từng phần.
        </p>

        {/* Status Breakdown */}
        <div className="grid grid-cols-3 gap-2.5 mb-6 text-center">
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
            <span className="text-[11px] text-slate-400 block">Đã trả lời</span>
            <span className="text-lg font-bold text-emerald-400 mt-0.5 block">
              {answeredCount}/{totalQuestions}
            </span>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
            <span className="text-[11px] text-slate-400 block">Chưa làm</span>
            <span className={`text-lg font-bold mt-0.5 block ${unansweredCount > 0 ? 'text-amber-400' : 'text-slate-400'}`}>
              {unansweredCount}
            </span>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
            <span className="text-[11px] text-slate-400 block">Đánh dấu</span>
            <span className="text-lg font-bold text-yellow-400 mt-0.5 block">
              {flaggedCount}
            </span>
          </div>
        </div>

        {unansweredCount > 0 && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-300 mb-6">
            ⚠️ Bạn còn {unansweredCount} câu chưa chọn đáp án. Các câu chưa làm sẽ được tính là sai.
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30"
          >
            Nộp bài thi ngay
          </button>
          <button
            onClick={onCancel}
            className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm border border-slate-700 transition-colors"
          >
            Làm tiếp
          </button>
        </div>
      </div>
    </div>
  );
}
