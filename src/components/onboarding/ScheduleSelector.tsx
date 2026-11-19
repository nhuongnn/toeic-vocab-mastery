'use client';

import React from 'react';
import { Clock, ArrowRight, ArrowLeft } from 'lucide-react';

interface ScheduleSelectorProps {
  selectedMinutes: number;
  onSelect: (minutes: number) => void;
  onNext: () => void;
  onBack: () => void;
}

const SCHEDULES = [
  {
    minutes: 10,
    title: '10 phút / ngày',
    subtitle: 'Thảnh thơi & Kiên trì',
    wordsPerDay: '~8 từ mới / ngày',
    description: 'Thích hợp cho người bận rộn, chỉ cần mở app trong giờ nghỉ giải lao hoặc đi xe buýt.',
  },
  {
    minutes: 15,
    title: '15 phút / ngày',
    subtitle: 'Cân bằng & Hiệu quả',
    wordsPerDay: '~12 từ mới / ngày',
    description: 'Tốc độ vừa phải, đảm bảo cả học từ mới và hoàn thành chu trình ôn tập SRS hàng ngày.',
  },
  {
    minutes: 20,
    title: '20 phút / ngày',
    subtitle: 'Khuyên dùng (Tối ưu)',
    wordsPerDay: '~16 từ mới / ngày',
    description: 'Thời lượng lý tưởng để xây dựng phản xạ sâu, làm flashcard và 1 bài kiểm tra nhỏ.',
  },
  {
    minutes: 30,
    title: '30 phút / ngày',
    subtitle: 'Tăng tốc cấp tốc',
    wordsPerDay: '~25 từ mới / ngày',
    description: 'Dành cho các bạn đang chuẩn bị thi trong 1 - 2 tháng tới, cần bứt phá điểm số nhanh.',
  },
];

export function ScheduleSelector({
  selectedMinutes,
  onSelect,
  onNext,
  onBack,
}: ScheduleSelectorProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto mb-3">
          <Clock className="w-6 h-6" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
          Mỗi ngày bạn muốn dành bao nhiêu thời gian học?
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Học đều đặn mỗi ngày quan trọng hơn việc học dồn nhiều giờ trong một ngày.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SCHEDULES.map((item) => {
          const isSelected = selectedMinutes === item.minutes;

          return (
            <div
              key={item.minutes}
              onClick={() => onSelect(item.minutes)}
              className={`cursor-pointer rounded-2xl p-5 transition-all border ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/20 shadow-lg'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-slate-100">{item.title}</span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  {item.wordsPerDay}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-300 mb-2">{item.subtitle}</p>
              <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
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

        <button
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/20"
        >
          <span>Tiếp tục</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
