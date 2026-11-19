'use client';

import React from 'react';
import { Target, CheckCircle2, ArrowRight } from 'lucide-react';

interface GoalSelectorProps {
  selectedScore: number;
  onSelect: (score: number) => void;
  onNext: () => void;
}

const GOALS = [
  {
    score: 550,
    title: '500 - 550+',
    badge: 'Khởi đầu vững chắc',
    description: 'Đủ điều kiện tốt nghiệp đại học, tự tin giao tiếp các tình huống văn phòng thông thường.',
    color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300',
  },
  {
    score: 650,
    title: '600 - 650+',
    badge: 'Phổ biến nhất',
    description: 'Yêu cầu của phần lớn công ty đa quốc gia, làm việc độc lập qua email và báo cáo.',
    color: 'from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-300',
  },
  {
    score: 750,
    title: '700 - 750+',
    badge: 'Khuyên dùng',
    description: 'Làm chủ các hợp đồng kinh tế, họp báo quốc tế và đàm phán thương mại linh hoạt.',
    color: 'from-indigo-500/20 to-purple-500/20 border-indigo-500/30 text-indigo-300',
  },
  {
    score: 850,
    title: '800 - 850+',
    badge: 'Chuyên gia nghiệp vụ',
    description: 'Đọc hiểu tài liệu chuyên ngành phức tạp, thuyết trình lưu loát và phản xạ tự nhiên.',
    color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300',
  },
  {
    score: 950,
    title: '900 - 990',
    badge: 'Đỉnh cao bản xứ',
    description: 'Làm chủ toàn bộ 3,675 từ vựng, điểm số tuyệt đối, phản xạ như người bản ngữ.',
    color: 'from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-300',
  },
];

export function GoalSelector({ selectedScore, onSelect, onNext }: GoalSelectorProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto mb-3">
          <Target className="w-6 h-6" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
          Mục tiêu điểm TOEIC của bạn là bao nhiêu?
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Chúng tôi sẽ phân bổ ngân hàng từ vựng phù hợp nhất với ngưỡng điểm bạn cần.
        </p>
      </div>

      <div className="space-y-3">
        {GOALS.map((goal) => {
          const isSelected = selectedScore === goal.score;

          return (
            <div
              key={goal.score}
              onClick={() => onSelect(goal.score)}
              className={`cursor-pointer rounded-2xl p-4 transition-all border ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/20 shadow-lg'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-slate-100">{goal.title}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold bg-slate-800 border border-slate-700 text-slate-300">
                      {goal.badge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                    {goal.description}
                  </p>
                </div>
                <div className="pt-1">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'border border-slate-700 text-transparent'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 fill-current text-indigo-600" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-end">
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
