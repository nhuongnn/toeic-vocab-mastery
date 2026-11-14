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
} from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { useSpeech } from '@/hooks/useSpeech';
import { categories } from '@/data/categories';
import { getWordOfTheDay, allVocabularyWords } from '@/data/vocabulary';

export default function HomePage() {
  const { progress, dueCount, dueWordIds } = useProgress();
  const { speak } = useSpeech();
  const [wordOfTheDay, setWordOfTheDay] = React.useState(allVocabularyWords[0]);

  React.useEffect(() => {
    setWordOfTheDay(getWordOfTheDay());
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* 1. Hero Welcome & Goal Progress */}
      <section className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-purple-950/60 border border-slate-800 p-8 sm:p-12 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Immersive Native English • TOEIC 700+ Master Plan</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Think, Feel & Speak Like a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
              Native Professional.
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            No word-by-word Vietnamese translation. Master vocabulary through root etymology, spatial perception, and corporate contexts to reach 700+ TOEIC naturally.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                {progress.stats.totalWordsLearned}
              </div>
              <div className="text-xs text-slate-400 font-medium">Words Learned</div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 flex items-center gap-1">
                <Flame className="w-6 h-6 fill-amber-400" />
                <span>{progress.stats.currentStreak}d</span>
              </div>
              <div className="text-xs text-slate-400 font-medium">Daily Streak</div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-black text-indigo-400">
                {progress.stats.estimatedToeicScore}
              </div>
              <div className="text-xs text-slate-400 font-medium">Est. TOEIC Score</div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-black text-pink-400">
                {dueCount}
              </div>
              <div className="text-xs text-slate-400 font-medium">Cards Due Today</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Review Queue Callout (If cards are due) */}
      {dueCount > 0 && (
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
                You have {dueCount} cards scheduled for memory reinforcement today.
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
      <section className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 space-y-4">
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

          <Link
            href={`/word/${wordOfTheDay.id}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold transition-all flex-shrink-0"
          >
            <span>Deep Dive Into Word</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. Quick Practice Drill Launchers */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white uppercase tracking-wider">
          Practice Drills & Retention Exercises
        </h2>
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
                Listening Lab
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Ear training for rapid audio recognition in native American & British cadences.
              </p>
            </div>
            <span className="text-xs text-sky-400 font-semibold mt-4 flex items-center gap-1">
              Train Ears →
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

      {/* 7. 13 TOEIC Categories Showcase */}
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
