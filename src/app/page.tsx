'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  Sparkles,
  Flame,
  Trophy,
  ArrowRight,
  BookOpen,
  Volume2,
  Dumbbell,
  Clock,
  CheckCircle2,
  Zap,
  Brain,
  ShieldCheck,
  Scissors,
  Headphones,
  AlertTriangle,
  BookOpenCheck,
  PenTool,
  Mail,
  FileSignature,
  Send,
  Bot,
  MessageSquare,
  Bookmark,
} from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { useSpeech } from '@/hooks/useSpeech';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { categories } from '@/data/categories';
import { getWordOfTheDay, allVocabularyWords } from '@/data/vocabulary';
import { getWordMindMapUrl } from '@/lib/vocabulary-helpers';
import { Target } from 'lucide-react';

export default function HomePage() {
  const { progress, dueCount, dueWordIds } = useProgress();
  const { state: onboardingState } = useOnboarding();
  const { speak } = useSpeech();
  const [wordOfTheDay, setWordOfTheDay] = React.useState(allVocabularyWords[0]);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    setWordOfTheDay(getWordOfTheDay());
  }, []);

  const safeDueCount = mounted ? dueCount : 0;
  const effectiveTargetScore = onboardingState.learningPath?.targetScore || onboardingState.targetScore || 650;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* 1. Hero Welcome & Goal Progress */}
      <section className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-purple-950/60 border border-slate-800 p-8 sm:p-12 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Immersive Native English • TOEIC {effectiveTargetScore}+ Master Plan</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Think, Feel & Speak Like a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
              Native Professional.
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            No word-by-word Vietnamese translation. Master vocabulary, practical grammar, native pronunciation, speed reading, and corporate business writing.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
            <div>
              <div suppressHydrationWarning className="text-2xl sm:text-3xl font-black text-white">
                {mounted ? progress.stats.totalWordsLearned : 0}
              </div>
              <div className="text-xs text-slate-400 font-medium">Words Learned</div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 flex items-center gap-1">
                <Flame className="w-6 h-6 fill-amber-400" />
                <span suppressHydrationWarning>{mounted ? progress.stats.currentStreak : 0}d</span>
              </div>
              <div className="text-xs text-slate-400 font-medium">Daily Streak</div>
            </div>

            <div data-tour="dashboard-score" className="p-1 -m-1 rounded-xl">
              <div suppressHydrationWarning className="text-2xl sm:text-3xl font-black text-indigo-400">
                {mounted ? progress.stats.estimatedToeicScore : 450}
              </div>
              <div className="text-xs text-slate-400 font-medium">Est. TOEIC Score</div>
            </div>

            <div>
              <div suppressHydrationWarning className="text-2xl sm:text-3xl font-black text-pink-400">
                {safeDueCount}
              </div>
              <div className="text-xs text-slate-400 font-medium">Cards Due Today</div>
            </div>
          </div>
        </div>
      </section>

      {/* 1.5. Onboarding / Learning Path Status */}
      {mounted && (
        onboardingState.learningPath ? (
          <section className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">Lộ trình mục tiêu: {effectiveTargetScore}+ TOEIC</h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {onboardingState.learningPath.phases[0]?.title}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Mục tiêu: {onboardingState.learningPath.dailyGoal} phút/ngày • Dự kiến hoàn thành: {onboardingState.learningPath.estimatedCompletionDate}
                </p>
              </div>
            </div>
            <Link
              href="/onboarding?step=goal"
              className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-medium"
            >
              <span>Điều chỉnh lộ trình</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </section>
        ) : !onboardingState.isCompleted ? (
          <section className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Chưa thiết lập Lộ trình học cá nhân?</h3>
                <p className="text-xs text-slate-300">
                  Làm bài kiểm tra đầu vào 5 phút để xác định trình độ và tối ưu lộ trình {effectiveTargetScore}+ TOEIC.
                </p>
              </div>
            </div>
            <Link
              href="/onboarding"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-indigo-600/25 shrink-0"
            >
              <span>Thiết lập lộ trình</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        ) : null
      )}

      {/* 2. Review Queue Callout (If cards are due) */}
      {mounted && safeDueCount > 0 && (
        <section className="p-6 rounded-2xl bg-gradient-to-r from-pink-950/40 via-purple-950/30 to-indigo-950/20 border border-pink-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Spaced Repetition Review Due
              </h3>
              <p className="text-xs text-slate-300">
                You have {safeDueCount} cards scheduled for memory reinforcement today.
              </p>
            </div>
          </div>
          <Link
            href="/flashcards"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-pink-500/25 flex-shrink-0"
          >
            <span>Start Review Session</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      )}

      {/* 3. Word of the Day Spotlight */}
      <section data-tour="daily-words" className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Word of the Day</span>
          </span>
          <span className="text-xs text-slate-500 font-mono">
            {wordOfTheDay.pronunciation.ipa}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-black text-white uppercase tracking-tight">
                {wordOfTheDay.word}
              </h2>
              <button
                onClick={() => speak(wordOfTheDay.word)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-indigo-400 transition-colors"
                title="Pronounce"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              {wordOfTheDay.deepMeaning.coreConcept}
            </p>
            <div className="text-xs text-slate-400">
              <strong className="text-slate-300">Origin: </strong>
              {wordOfTheDay.etymology.origin} "{wordOfTheDay.etymology.rootWord}" ({wordOfTheDay.etymology.rootMeaning})
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
            <Link
              href={getWordMindMapUrl(wordOfTheDay.id, '/')}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-200 hover:text-white text-xs font-bold transition-all"
            >
              <Brain className="w-4 h-4 text-purple-400" />
              <span>Mind Map</span>
            </Link>
            <Link
              href={`/word/${wordOfTheDay.id}?level=${wordOfTheDay.level}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold transition-all"
            >
              <span>Deep Dive Into Word</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3.5. AI Roleplay Chat Room Spotlight */}
      <section className="relative rounded-3xl bg-gradient-to-r from-indigo-950/90 via-slate-900 to-purple-950/80 border border-indigo-500/30 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>Tính Năng Mới • Phòng Chat AI Nhập Vai Công Sở</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Luyện Giao Tiếp Với Sếp, Đồng Nghiệp & Nhân Viên
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Tùy biến tên, tuổi, giới tính nhân vật. Đặt ra các tình huống công sở thực tế dựa trên lộ trình mục tiêu TOEIC ({effectiveTargetScore}+). Hệ thống hỗ trợ gợi ý câu trả lời & câu hỏi khi bạn chủ động yêu cầu!
            </p>
          </div>

          <Link
            href="/chat-room"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-indigo-600/30 flex-shrink-0"
          >
            <Bot className="w-4 h-4" />
            <span>Vào Phòng Chat AI Ngay</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. Quick Practice Drill Launchers */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">
            Practice Drills & Retention Exercises
          </h2>
          <Link
            href="/mind-map"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 text-xs font-bold transition-all self-start sm:self-auto"
          >
            <Brain className="w-4 h-4 text-purple-400" />
            <span>Mind Map Vocabulary →</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Link
            href="/quiz"
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
                <Dumbbell className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white group-hover:text-indigo-400 transition-colors">
                Contextual Quiz
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Test business sentence fits with real-world TOEIC Part 5 style distractors.
              </p>
            </div>
            <span className="text-xs text-indigo-400 font-semibold mt-4 flex items-center gap-1">
              Start Quiz →
            </span>
          </Link>

          <Link
            href="/fill-blank"
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors">
                Fill In The Blank
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Active recall spelling drill guided by etymology clues and syllable patterns.
              </p>
            </div>
            <span className="text-xs text-emerald-400 font-semibold mt-4 flex items-center gap-1">
              Start Drill →
            </span>
          </Link>

          <Link
            href="/listening"
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/50 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3">
                <Volume2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white group-hover:text-sky-400 transition-colors">
                Full Listening Lab
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Full TOEIC Audio Parts 1-4, real-world videos, dictation drills & ETS 2024-2025 exam traps.
              </p>
            </div>
            <span className="text-xs text-sky-400 font-semibold mt-4 flex items-center gap-1">
              Luyện Nghe Thực Chiến →
            </span>
          </Link>

          <Link
            href="/matching"
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors">
                Matching Memory
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Connect core concepts with root words to strengthen neurological pathways.
              </p>
            </div>
            <span className="text-xs text-purple-400 font-semibold mt-4 flex items-center gap-1">
              Play Board →
            </span>
          </Link>

          <Link
            href="/context-builder"
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white group-hover:text-amber-400 transition-colors">
                Context Builder
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Reconstruct authentic sentence syntax and collocations word-by-word.
              </p>
            </div>
            <span className="text-xs text-amber-400 font-semibold mt-4 flex items-center gap-1">
              Build Syntax →
            </span>
          </Link>
        </div>
      </section>

      {/* 5. Featured Native Grammar & Sentence Patterns Hub */}
      <section className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-400">
              <Brain className="w-4 h-4" />
              <span>Chuyên đề Ngữ pháp & Mẫu câu Thực chiến</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Tư duy Ngữ pháp Bản xứ • 100% Ứng dụng Hàng ngày & TOEIC
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Không học vẹt 12 thì hay lý thuyết đơn thuần. Tập trung vào các thì cốt lõi, câu bị động ngoại giao công sở, mệnh đề quan hệ rút gọn V-ing/V-ed và mẫu câu giao tiếp ăn điểm TOEIC 700+.
            </p>
          </div>

          <Link
            href="/grammar"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-indigo-600/30 flex-shrink-0"
          >
            <span>Học Ngữ pháp Ngay</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <Link
            href="/grammar"
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all space-y-2 group"
          >
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
              <Clock className="w-4 h-4" />
              <span>4 Thì Thực chiến</span>
            </div>
            <p className="text-xs text-slate-300 group-hover:text-white transition-colors">
              Past Simple vs Present Perfect, Hiện tại tiếp diễn cho lịch hẹn, Mỏ neo Past Perfect.
            </p>
            <span className="text-[11px] text-amber-400 font-semibold block pt-1">
              Phản xạ mốc thời gian →
            </span>
          </Link>

          <Link
            href="/grammar"
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-blue-500/40 transition-all space-y-2 group"
          >
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Bị động Ngoại giao</span>
            </div>
            <p className="text-xs text-slate-300 group-hover:text-white transition-colors">
              Né chỉ tay đổ lỗi, tập trung vào kết quả công việc và thể nhờ vả Have/Get something done.
            </p>
            <span className="text-[11px] text-blue-400 font-semibold block pt-1">
              Giao tiếp tinh tế →
            </span>
          </Link>

          <Link
            href="/grammar"
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-rose-500/40 transition-all space-y-2 group"
          >
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
              <Scissors className="w-4 h-4" />
              <span>Mệnh đề Rút gọn</span>
            </div>
            <p className="text-xs text-slate-300 group-hover:text-white transition-colors">
              Bản năng nói ngắn gọn V-ing (chủ động) và V-ed (bị động). Mẹo nhìn 3 giây bắt bài Part 5.
            </p>
            <span className="text-[11px] text-rose-400 font-semibold block pt-1">
              Ăn trọn điểm Part 5 →
            </span>
          </Link>

          <Link
            href="/grammar"
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-2 group"
          >
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Mẫu câu & Liên từ</span>
            </div>
            <p className="text-xs text-slate-300 group-hover:text-white transition-colors">
              Would you mind..., Look forward to + V-ing, Đảo ngữ Should và bẻ khóa Due to vs Because.
            </p>
            <span className="text-[11px] text-emerald-400 font-semibold block pt-1">
              Email chuẩn bản xứ →
            </span>
          </Link>
        </div>
      </section>

      {/* Featured Sentence Patterns, Collocations & Idioms Hub */}
      <section className="rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/30 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
              <MessageSquare className="w-4 h-4" />
              <span>Kho Tinh Hoa Ngôn Ngữ Thực Chiến</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Mẫu câu Giao tiếp, Collocations & Idioms Bản xứ
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Xóa tan lối dịch từ-sang-từ vụng về. Làm chủ các cặp từ cố định (meet the deadline, inclement weather), mẫu câu đàm phán tế nhị và thành ngữ kinh điển trong công sở và đề thi TOEIC.
            </p>
          </div>

          <Link
            href="/patterns"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-600/30 flex-shrink-0"
          >
            <span>Khám Phá Ngay</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <Link
            href="/patterns"
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all space-y-2 group"
          >
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
              <MessageSquare className="w-4 h-4" />
              <span>Mẫu câu Đàm phán & Nhờ vả</span>
            </div>
            <p className="text-xs text-slate-300 group-hover:text-white transition-colors">
              I was wondering if you might..., Would you mind..., I see your point, but...
            </p>
            <span className="text-[11px] text-amber-400 font-semibold block pt-1">
              Khéo léo & Lịch thiệp →
            </span>
          </Link>

          <Link
            href="/patterns"
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-2 group"
          >
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <Bookmark className="w-4 h-4" />
              <span>Collocations Vàng TOEIC</span>
            </div>
            <p className="text-xs text-slate-300 group-hover:text-white transition-colors">
              Meet the deadline, conduct a survey, in accordance with, readily available.
            </p>
            <span className="text-[11px] text-emerald-400 font-semibold block pt-1">
              Tránh bẫy Part 5 & 6 →
            </span>
          </Link>

          <Link
            href="/patterns"
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-pink-500/40 transition-all space-y-2 group"
          >
            <div className="flex items-center gap-2 text-pink-400 text-xs font-bold">
              <Brain className="w-4 h-4" />
              <span>Idioms Bản xứ Công sở</span>
            </div>
            <p className="text-xs text-slate-300 group-hover:text-white transition-colors">
              On the same page, touch base, cut corners, bite the bullet, call it a day.
            </p>
            <span className="text-[11px] text-pink-400 font-semibold block pt-1">
              Phản xạ như người bản xứ →
            </span>
          </Link>

          <Link
            href="/patterns"
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-2 group"
          >
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
              <Zap className="w-4 h-4" />
              <span>Trắc nghiệm Phản xạ</span>
            </div>
            <p className="text-xs text-slate-300 group-hover:text-white transition-colors">
              Kiểm tra khả năng nhận diện cụm từ cố định và giải mã thành ngữ trong ngữ cảnh đề thi.
            </p>
            <span className="text-[11px] text-cyan-400 font-semibold block pt-1">
              Luyện phản xạ 3 giây →
            </span>
          </Link>
        </div>
      </section>

      {/* 6. Featured Native Listening & Pronunciation Hub */}
      <section className="rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/30 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-400">
              <Headphones className="w-4 h-4" />
              <span>Phát âm & Luyện nghe Tư duy Bản xứ</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Giải Mã Nối Âm, Nuốt Âm & Trọng Âm Giao Tiếp Đời Thực
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Không học lý thuyết ngữ âm phức tạp. Nắm bắt cơ chế miệng tự nhiên: Nối âm trượt mượt (Pick-it-up), Flap T kiểu Mỹ (Water), nuốt âm H (Tell-im) và sửa dứt điểm lỗi bỏ âm đuôi của người Việt.
            </p>
          </div>

          <Link
            href="/pronunciation"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-sky-600/30 flex-shrink-0"
          >
            <span>Luyện Nghe & Phát Âm</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <Link
            href="/pronunciation"
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-sky-500/40 transition-all space-y-2 group"
          >
            <div className="flex items-center gap-2 text-sky-400 text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Nối âm Tự nhiên</span>
            </div>
            <p className="text-xs text-slate-300 group-hover:text-white transition-colors">
              Phụ âm nối nguyên âm (Pick it up), Flap T (Water ➔ Wah-der), và nuốt âm H (Tell-im).
            </p>
            <span className="text-[11px] text-sky-400 font-semibold block pt-1">
              Nghe trượt mượt mà &rarr;
            </span>
          </Link>

          <Link
            href="/pronunciation"
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all space-y-2 group"
          >
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
              <Zap className="w-4 h-4" />
              <span>Rút gọn Cửa miệng</span>
            </div>
            <p className="text-xs text-slate-300 group-hover:text-white transition-colors">
              Gonna, Wanna, Gotta, Lemme, Kinda, Outta và dạng quá khứ Coulda, Shoulda, Woulda.
            </p>
            <span className="text-[11px] text-amber-400 font-semibold block pt-1">
              Nói nhanh tự nhiên &rarr;
            </span>
          </Link>

          <Link
            href="/pronunciation"
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-rose-500/40 transition-all space-y-2 group"
          >
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
              <AlertTriangle className="w-4 h-4" />
              <span>Tránh Bẫy Chí Mạng</span>
            </div>
            <p className="text-xs text-slate-300 group-hover:text-white transition-colors">
              Chữa dứt điểm tật nuốt âm đuôi (/s/, /z/, /t/, /d/), phân biệt /i:/ vs /ɪ/ (Leave vs Live, Sheet vs Shit).
            </p>
            <span className="text-[11px] text-rose-400 font-semibold block pt-1">
              Phát âm chuẩn xác &rarr;
            </span>
          </Link>

          <Link
            href="/pronunciation"
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/40 transition-all space-y-2 group"
          >
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold">
              <Volume2 className="w-4 h-4" />
              <span>Ngữ điệu Giao tiếp</span>
            </div>
            <p className="text-xs text-slate-300 group-hover:text-white transition-colors">
              Quy luật lên giọng (Yes/No ↗) vs xuống giọng (Wh-questions ↘) thể hiện thái độ tinh tế.
            </p>
            <span className="text-[11px] text-indigo-400 font-semibold block pt-1">
              Biểu cảm tự tin &rarr;
            </span>
          </Link>
        </div>
      </section>

      {/* 7. Featured Native Reading Mastery Hub (TOEIC Part 6 & 7) */}
      <section className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-400">
              <BookOpenCheck className="w-4 h-4" />
              <span>Chiến Thuật Đọc Hiểu & Bắt Bài TOEIC Part 7</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Tư Duy Đọc Lướt Bản Xứ • Bẻ Khóa Email, Hóa Đơn & Đọc Kép
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Xóa bỏ hoàn toàn tật dịch thầm từng từ sang tiếng Việt. Rèn luyện phản xạ khối nghĩa (Thought Groups), nắm bắt cấu trúc BLUF (Mục đích câu 1, Hành động câu cuối) và săn trọn điểm bẫy đề thi Part 7.
            </p>
          </div>

          <Link
            href="/reading"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-indigo-600/30 flex-shrink-0"
          >
            <span>Luyện Đọc Ngay</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <Link
            href="/reading"
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/40 transition-all space-y-2 group"
          >
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold">
              <Mail className="w-4 h-4" />
              <span>Email & Memo BLUF</span>
            </div>
            <p className="text-xs text-slate-300 group-hover:text-white transition-colors">
              Bắt trọn mục đích trong 10 giây, định vị người nhận CC vs To và tóm gọn hạn chót.
            </p>
            <span className="text-[11px] text-indigo-400 font-semibold block pt-1">
              Đọc siêu tốc 20s →
            </span>
          </Link>

          <Link
            href="/reading"
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all space-y-2 group"
          >
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
              <Zap className="w-4 h-4" />
              <span>Quy Chế & Ngoại Lệ</span>
            </div>
            <p className="text-xs text-slate-300 group-hover:text-white transition-colors">
              Săn từ khóa điều kiện (unless, except, provided that) bẻ khóa bẫy câu hỏi NOT/TRUE.
            </p>
            <span className="text-[11px] text-amber-400 font-semibold block pt-1">
              Bắt bài ngoại lệ →
            </span>
          </Link>

          <Link
            href="/reading"
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-2 group"
          >
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Quét Hóa Đơn & Bảng</span>
            </div>
            <p className="text-xs text-slate-300 group-hover:text-white transition-colors">
              Định vị cột số liệu, mã giảm giá và phí giao hàng hỏa tốc mà không cần đọc hết chữ.
            </p>
            <span className="text-[11px] text-emerald-400 font-semibold block pt-1">
              Tính nhẩm 5 giây →
            </span>
          </Link>

          <Link
            href="/reading"
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-rose-500/40 transition-all space-y-2 group"
          >
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Nối Dữ Liệu Đọc Kép</span>
            </div>
            <p className="text-xs text-slate-300 group-hover:text-white transition-colors">
              Tuyệt chiêu xử lý 2 câu hỏi suy luận chéo giữa Lịch trình sự kiện và Email phản hồi.
            </p>
            <span className="text-[11px] text-rose-400 font-semibold block pt-1">
              Chinh phục 700-900 →
            </span>
          </Link>
        </div>
      </section>

      {/* 8. Featured Native Workplace Writing Hub (Email & Proposals) */}
      <section className="rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/30 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-400">
              <PenTool className="w-4 h-4" />
              <span>Kỹ Năng Viết Email & Soạn Thảo Công Sở Chuẩn Bản Xứ</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Viết Gãy Gọn, Tinh Tế & Ngoại Giao Chuẩn Doanh Nghiệp Quốc Tế
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Áp dụng nguyên tắc K.I.S.S (Keep It Short & Simple): Khung email 4 bước, từ chối khéo léo, nhắc hạn chót tinh tế (Gentle Nudge) và lượng hóa báo cáo thuyết phục bằng số liệu.
            </p>
          </div>

          <Link
            href="/writing"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-purple-600/30 flex-shrink-0"
          >
            <span>Luyện Viết Ngay</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <Link
            href="/writing"
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-purple-500/40 transition-all space-y-2 group"
          >
            <div className="flex items-center gap-2 text-purple-400 text-xs font-bold">
              <Mail className="w-4 h-4" />
              <span>Khung Email 4 Bước</span>
            </div>
            <p className="text-xs text-slate-300 group-hover:text-white transition-colors">
              Mở đầu nêu mục đích, dẫn dắt tệp đính kèm, gắn hạn chót và câu chào chuẩn quốc tế.
            </p>
            <span className="text-[11px] text-purple-400 font-semibold block pt-1">
              Xem mẫu email →
            </span>
          </Link>

          <Link
            href="/writing"
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all space-y-2 group"
          >
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Từ Chối Khéo Léo</span>
            </div>
            <p className="text-xs text-slate-300 group-hover:text-white transition-colors">
              Cách nói "Không" và báo sai sót ngân sách mà không chỉ trích, giữ trọn quan hệ đối tác.
            </p>
            <span className="text-[11px] text-amber-400 font-semibold block pt-1">
              Ngoại giao tinh tế →
            </span>
          </Link>

          <Link
            href="/writing"
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-sky-500/40 transition-all space-y-2 group"
          >
            <div className="flex items-center gap-2 text-sky-400 text-xs font-bold">
              <Send className="w-4 h-4" />
              <span>Nhắc Việc Gentle Nudge</span>
            </div>
            <p className="text-xs text-slate-300 group-hover:text-white transition-colors">
              Thúc giục deadline hợp đồng khéo léo, không gây khó chịu hay mang giọng điệu ra lệnh.
            </p>
            <span className="text-[11px] text-sky-400 font-semibold block pt-1">
              Cú hích nhẹ nhàng →
            </span>
          </Link>

          <Link
            href="/writing"
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-2 group"
          >
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <FileSignature className="w-4 h-4" />
              <span>Báo Cáo Lượng Hóa</span>
            </div>
            <p className="text-xs text-slate-300 group-hover:text-white transition-colors">
              Trình bày gạch đầu dòng, tỷ lệ ROI và thời gian thu hồi vốn thuyết phục lãnh đạo.
            </p>
            <span className="text-[11px] text-emerald-400 font-semibold block pt-1">
              Soạn thảo cấp cao →
            </span>
          </Link>
        </div>
      </section>

      {/* 9. 13 TOEIC Categories Showcase */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">
              13 Core TOEIC Workplace Categories
            </h2>
            <p className="text-xs text-slate-400">
              Explore high-yield vocabulary grouped by real corporate domains.
            </p>
          </div>
          <Link
            href="/categories"
            className="text-xs font-semibold text-indigo-400 hover:underline"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const catWords = allVocabularyWords.filter((w) => w.category === cat.id);
            return (
              <Link
                key={cat.id}
                href={`/categories#${cat.id}`}
                className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-indigo-500/40 transition-all group space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${cat.color} flex items-center justify-center text-white font-bold text-xs shadow-md`}
                  >
                    {cat.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    {catWords.length} curated words
                  </span>
                </div>

                <h3 className="font-bold text-white group-hover:text-indigo-400 transition-colors text-base">
                  {cat.name}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>

                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800/60 flex items-center justify-between">
                  <span>Explore words</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
