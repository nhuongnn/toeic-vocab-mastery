'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, MessageSquare, Bot } from 'lucide-react';
import { RoleplayChatRoom } from '@/components/roleplay/RoleplayChatRoom';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useProgress } from '@/contexts/ProgressContext';
import { UserLearningContext } from '@/types/roleplay';

export default function ChatRoomPage() {
  const { state: onboardingState } = useOnboarding();
  const { progress } = useProgress();

  const userContext: Partial<UserLearningContext> = {
    targetScore:
      onboardingState.learningPath?.targetScore ||
      onboardingState.targetScore ||
      650,
    currentLevel:
      onboardingState.placementResult?.level ||
      onboardingState.learningPath?.currentLevel ||
      'intermediate',
    dailyMinutes:
      onboardingState.dailyMinutes ||
      onboardingState.learningPath?.dailyGoal ||
      20,
    totalWordsLearned: progress.stats.totalWordsLearned || 0,
    estimatedToeicScore: progress.stats.estimatedToeicScore || 650,
    recentWords: Object.keys(progress.cards || {}).slice(0, 15),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Breadcrumb & Badge */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Trang chủ</span>
        </Link>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span>Phòng Giao Tiếp AI Công Sở • Tùy Biến Nhân Vật</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center justify-center gap-2.5">
          <Bot className="w-8 h-8 text-indigo-400" />
          <span>Phòng Chat AI Thực Chiến</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Nhập vai giao tiếp với Sếp, Đồng nghiệp hoặc Nhân viên văn phòng. Kịch bản được tự động đề xuất dựa trên lộ trình mục tiêu TOEIC ({userContext.targetScore}+) và từ vựng bạn đang học.
        </p>
      </div>

      {/* Main Chat Room */}
      <RoleplayChatRoom userContext={userContext} />
    </div>
  );
}
