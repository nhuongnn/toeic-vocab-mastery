'use client';

import React from 'react';
import { Compass, BookCheck, Award, ArrowRight, ArrowLeft } from 'lucide-react';

interface ExperienceSelectorProps {
  selectedExp: 'beginner' | 'intermediate' | 'experienced' | null;
  onSelect: (exp: 'beginner' | 'intermediate' | 'experienced') => void;
  onStartPlacement: () => void;
  onSkipToLevel: () => void;
  onBack: () => void;
}

const EXPERIENCES = [
  {
    key: 'beginner' as const,
    title: 'Mới bắt đầu học TOEIC',
    subtitle: 'Chưa từng thi hoặc mất gốc từ vựng',
    description: 'Bắt đầu từ bộ từ vựng cơ bản nhất (Essential), không cần làm bài kiểm tra đầu vào.',
    icon: Compass,
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    key: 'intermediate' as const,
    title: 'Đã có nền tảng (450 - 650)',
    subtitle: 'Đã học hoặc từng thi thử',
    description: 'Làm bài kiểm tra thích ứng 5-10 phút để xác định chính xác các chủ đề cần củng cố.',
    icon: BookCheck,
    color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  },
  {
    key: 'experienced' as const,
    title: 'Đã có điểm tốt (650 - 800+)',
    subtitle: 'Muốn bứt phá lên 850 - 990',
    description: 'Kiểm tra nhanh để nhảy qua các từ cơ bản, tập trung ngay vào từ vựng cao cấp.',
    icon: Award,
    color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  },
];

export function ExperienceSelector({
  selectedExp,
  onSelect,
  onStartPlacement,
  onSkipToLevel,
  onBack,
}: ExperienceSelectorProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
          Kinh nghiệm TOEIC hiện tại của bạn?
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Chọn tình trạng phù hợp nhất để chúng tôi điều chỉnh điểm khởi đầu.
        </p>
      </div>

      <div className="space-y-4">
        {EXPERIENCES.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedExp === item.key;

          return (
            <div
              key={item.key}
              onClick={() => onSelect(item.key)}
              className={`cursor-pointer rounded-2xl p-5 transition-all border flex items-start gap-4 ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/20 shadow-lg'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${item.color}`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-slate-100">{item.title}</h3>
                <p className="text-xs font-semibold text-slate-300 mt-0.5">{item.subtitle}</p>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại</span>
        </button>

        {selectedExp === 'beginner' ? (
          <button
            onClick={onSkipToLevel}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-all shadow-lg shadow-emerald-600/20"
          >
            <span>Bắt đầu từ cơ bản</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onStartPlacement}
            disabled={!selectedExp}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/20"
          >
            <span>Làm bài Placement Test (5 phút)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
