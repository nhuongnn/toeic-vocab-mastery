'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  CheckCircle,
  TrendingDown,
  ArrowRight,
  BookOpen,
  Dumbbell,
  Target,
  Flame,
  Award,
} from 'lucide-react';
import { SRSCard, ExerciseSessionResult } from '@/types/progress';
import { wordsById } from '@/data/vocabulary';
import { categories } from '@/data/categories';

interface WeakAreasAnalysisProps {
  cards: Record<string, SRSCard>;
  history: ExerciseSessionResult[];
}

export function WeakAreasAnalysis({ cards, history }: WeakAreasAnalysisProps) {
  // 1. Analyze Category Mastery & Weaknesses
  const categoryStats = useMemo(() => {
    const stats: Record<
      string,
      {
        totalLearned: number;
        mastered: number;
        struggling: number;
        masteryRate: number;
      }
    > = {};

    categories.forEach((cat) => {
      stats[cat.id] = { totalLearned: 0, mastered: 0, struggling: 0, masteryRate: 0 };
    });

    Object.values(cards).forEach((card) => {
      const word = wordsById[card.wordId];
      if (!word) return;
      const catId = word.category;
      if (!stats[catId]) {
        stats[catId] = { totalLearned: 0, mastered: 0, struggling: 0, masteryRate: 0 };
      }

      stats[catId].totalLearned += 1;
      if (card.interval >= 14) {
        stats[catId].mastered += 1;
      }
      // If low EF or repeated resets
      if (card.easinessFactor < 2.1 || (card.interval <= 1 && card.repetitions >= 2)) {
        stats[catId].struggling += 1;
      }
    });

    return categories
      .map((cat) => {
        const s = stats[cat.id] || { totalLearned: 0, mastered: 0, struggling: 0, masteryRate: 0 };
        const rate = s.totalLearned > 0 ? Math.round((s.mastered / s.totalLearned) * 100) : 0;
        return {
          id: cat.id,
          name: cat.name,
          color: cat.color,
          totalWords: cat.wordCount,
          totalLearned: s.totalLearned,
          mastered: s.mastered,
          struggling: s.struggling,
          masteryRate: rate,
        };
      })
      .filter((cat) => cat.totalLearned > 0)
      .sort((a, b) => a.masteryRate - b.masteryRate); // Lowest mastery rate first
  }, [cards]);

  // 2. Analyze Exercise Modalities
  const exerciseStats = useMemo(() => {
    const modalityNames: Record<string, string> = {
      quiz: 'Trắc nghiệm phản xạ',
      'fill-blank': 'Điền từ ngữ cảnh',
      listening: 'Nghe hiểu bản xứ',
      matching: 'Ghép từ & Định nghĩa',
      'context-builder': 'Xây dựng câu thương mại',
    };

    const modMap: Record<string, { total: number; correct: number; sessions: number }> = {};

    history.forEach((sess) => {
      if (!modMap[sess.type]) {
        modMap[sess.type] = { total: 0, correct: 0, sessions: 0 };
      }
      modMap[sess.type].total += sess.totalQuestions;
      modMap[sess.type].correct += sess.correctAnswers;
      modMap[sess.type].sessions += 1;
    });

    return Object.entries(modMap)
      .map(([type, data]) => {
        const accuracy = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
        return {
          type,
          name: modalityNames[type] || type,
          total: data.total,
          correct: data.correct,
          sessions: data.sessions,
          accuracy,
        };
      })
      .sort((a, b) => a.accuracy - b.accuracy); // Lowest accuracy first (weakest modality first)
  }, [history]);

  // 3. Find Struggling Words
  const strugglingWords = useMemo(() => {
    return Object.values(cards)
      .filter(
        (card) =>
          card.easinessFactor < 2.1 || (card.interval <= 1 && (card.history?.length || 0) >= 2)
      )
      .map((card) => {
        const word = wordsById[card.wordId];
        return {
          card,
          word,
        };
      })
      .filter((item) => Boolean(item.word))
      .slice(0, 6);
  }, [cards]);

  const weakestCategories = categoryStats.slice(0, 3);
  const strongestCategories = [...categoryStats].reverse().slice(0, 3);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
          <AlertTriangle className="w-4 h-4" />
          <span>Chẩn Đoán Lỗ Hổng & Điểm Cần Cải Thiện</span>
        </div>
        <h3 className="text-lg font-black text-white">Phân Tích Điểm Yếu & Chủ Đề Trọng Tâm</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Hệ thống phát hiện các chủ đề có tỷ lệ quên cao và dạng bài tập bạn thường mắc lỗi để tối ưu điểm số nhanh nhất.
        </p>
      </div>

      {/* Grid: Weak Categories vs Strong Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Weak Categories Card */}
        <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <TrendingDown className="w-4 h-4" />
              <span>Chủ đề cần củng cố nhất ({weakestCategories.length})</span>
            </span>
            <span className="text-[10px] text-rose-300 font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20">
              Ưu tiên ôn tập
            </span>
          </div>

          {weakestCategories.length > 0 ? (
            <div className="space-y-2.5">
              {weakestCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-xs text-white block">{cat.name}</span>
                    <span className="text-[10px] text-slate-400">
                      Đã học {cat.totalLearned} từ • {cat.struggling} từ hay quên
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-rose-400 font-mono">
                      {cat.masteryRate}%
                    </span>
                    <span className="text-[9px] text-slate-500 block">Tỷ lệ vững</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-slate-400 py-3 text-center">
              Chưa đủ dữ liệu phân tích. Hãy học thêm từ vựng để hệ thống đo lường độ bền trí nhớ!
            </div>
          )}

          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-semibold transition-colors pt-1"
          >
            <span>Mở kho từ vựng củng cố</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Strong Categories Card */}
        <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>Thế mạnh vượt trội ({strongestCategories.length})</span>
            </span>
            <span className="text-[10px] text-emerald-300 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              Phản xạ vững vàng
            </span>
          </div>

          {strongestCategories.length > 0 ? (
            <div className="space-y-2.5">
              {strongestCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-xs text-white block">{cat.name}</span>
                    <span className="text-[10px] text-slate-400">
                      Mastered {cat.mastered} / {cat.totalLearned} từ
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-emerald-400 font-mono">
                      {cat.masteryRate}%
                    </span>
                    <span className="text-[9px] text-slate-500 block">Đã ghi nhớ sâu</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-slate-400 py-3 text-center">
              Tiếp tục duy trì ôn tập hàng ngày để gia tăng các chủ đề thành thục!
            </div>
          )}

          <Link
            href="/flashcards"
            className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold transition-colors pt-1"
          >
            <span>Luyện Flashcard duy trì phản xạ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Exercise Modalities Accuracy Breakdown */}
      {exerciseStats.length > 0 && (
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-white">Độ Chính Xác Theo Dạng Bài Luyện Tập</h4>
              <p className="text-[11px] text-slate-400">
                Hiệu suất qua các phiên kiểm tra và trò chơi phản xạ
              </p>
            </div>
            <Dumbbell className="w-4 h-4 text-indigo-400" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {exerciseStats.map((item) => {
              const isWeak = item.accuracy < 70;
              return (
                <div
                  key={item.type}
                  className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2 ${
                    isWeak
                      ? 'bg-rose-950/20 border-rose-500/30'
                      : 'bg-slate-900 border-slate-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{item.name}</span>
                    <span
                      className={`text-xs font-black font-mono ${
                        isWeak ? 'text-rose-400' : 'text-indigo-400'
                      }`}
                    >
                      {item.accuracy}%
                    </span>
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full ${
                        isWeak
                          ? 'bg-rose-500'
                          : item.accuracy >= 85
                          ? 'bg-emerald-500'
                          : 'bg-indigo-500'
                      }`}
                      style={{ width: `${item.accuracy}%` }}
                    />
                  </div>

                  <div className="text-[10px] text-slate-400 flex items-center justify-between">
                    <span>
                      Đúng {item.correct}/{item.total} câu
                    </span>
                    <span>{item.sessions} lượt</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Struggling Vocabulary Focus List */}
      {strugglingWords.length > 0 && (
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <h4 className="text-sm font-bold text-white">Từ Vựng Cần Chú Ý (Hay Quên / EF Thấp)</h4>
            </div>
            <Link
              href="/review"
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              Ôn ngay
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {strugglingWords.map(({ card, word }) => (
              <Link
                key={card.wordId}
                href={`/word/${card.wordId}`}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-xs text-white group-hover:text-indigo-300 uppercase">
                    {word?.word}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {word?.pronunciation.ipa}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-rose-400 px-1.5 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
                    Khoảng cách: {card.interval} ngày
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
