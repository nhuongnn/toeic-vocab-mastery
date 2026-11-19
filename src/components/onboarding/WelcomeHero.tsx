'use client';

import React from 'react';
import { Sparkles, ArrowRight, BookOpen, Brain, Zap } from 'lucide-react';

interface WelcomeHeroProps {
  onStart: () => void;
  onSkip: () => void;
}

export function WelcomeHero({ onStart, onSkip }: WelcomeHeroProps) {
  return (
    <div className="max-w-2xl mx-auto text-center px-4 py-8">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6">
        <Sparkles className="w-3.5 h-3.5" />
        Chào mừng bạn đến với TOEIC Deep Mastery
      </div>

      <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
        Chinh phục <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">3,675 từ vựng</span> theo tư duy bản xứ
      </h1>

      <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
        Không học vẹt, không dịch từng từ. Cá nhân hóa lộ trình dựa trên mục tiêu điểm số và trình độ thực tế của bạn ngay bây giờ.
      </p>

      {/* Feature highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8 text-left">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
          <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-2.5">
            <Brain className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-semibold text-slate-200">Thuật toán SRS</h4>
          <p className="text-xs text-slate-400 mt-1">Ôn tập đúng điểm rơi của trí nhớ, nhớ từ vĩnh viễn.</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-2.5">
            <BookOpen className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-semibold text-slate-200">Bản đồ tư duy</h4>
          <p className="text-xs text-slate-400 mt-1">Cảm thụ từ qua không gian, hình ảnh và nguồn gốc từ.</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
          <div className="w-8 h-8 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400 mb-2.5">
            <Zap className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-semibold text-slate-200">Thi thử Mock Test</h4>
          <p className="text-xs text-slate-400 mt-1">Đề chuẩn format ETS Part 5-7 với giải thích chi tiết.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={onStart}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base transition-all shadow-lg shadow-indigo-600/30 hover:scale-[1.02]"
        >
          <span>Thiết lập lộ trình ngay</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={onSkip}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-slate-400 hover:text-slate-200 text-sm font-medium transition-colors"
        >
          Bỏ qua &amp; Khám phá tự do
        </button>
      </div>
    </div>
  );
}
