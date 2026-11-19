'use client';

import React, { useState } from 'react';
import { FlattenedQuestion, WrongAnswerItem } from '@/types/mockTest';
import { CheckCircle2, XCircle, BookOpen, ExternalLink, HelpCircle } from 'lucide-react';
import Link from 'next/link';

interface ResultDetailProps {
  questions: FlattenedQuestion[];
  answers: Record<string, number | null>;
  wrongAnswers: WrongAnswerItem[];
}

export function ResultDetail({
  questions,
  answers,
  wrongAnswers,
}: ResultDetailProps) {
  const [filter, setFilter] = useState<'all' | 'wrong'>('all');

  const optionLabels = ['A', 'B', 'C', 'D'];

  const displayedQuestions =
    filter === 'wrong'
      ? questions.filter((q) => {
          const userAns = answers[q.id];
          return userAns === null || userAns !== q.correctAnswer;
        })
      : questions;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-slate-100">
            Xem Lại Chi Tiết Từng Câu Hỏi
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Phân tích đáp án đúng, giải thích ngữ pháp và liên kết từ vựng tương ứng
          </p>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tất cả ({questions.length})
          </button>
          <button
            onClick={() => setFilter('wrong')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              filter === 'wrong'
                ? 'bg-rose-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Chỉ xem câu sai</span>
            <span className="px-1.5 py-0.2 rounded-full bg-rose-500/30 text-rose-200 font-mono text-[10px]">
              {wrongAnswers.length}
            </span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {displayedQuestions.map((q) => {
          const userAns = answers[q.id] ?? null;
          const isCorrect = userAns !== null && userAns === q.correctAnswer;

          return (
            <div
              key={q.id}
              className={`rounded-2xl p-5 sm:p-6 border transition-all ${
                isCorrect
                  ? 'bg-slate-900/90 border-emerald-500/20'
                  : 'bg-slate-900/90 border-rose-500/30'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                      isCorrect
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                  </span>
                  <span className="text-sm font-bold text-slate-200">
                    Câu {q.questionNumber} (Part {q.part})
                  </span>
                  {q.skillTested && (
                    <span className="text-[11px] font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full capitalize">
                      {q.skillTested}
                    </span>
                  )}
                </div>

                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    isCorrect
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-rose-500/10 text-rose-400'
                  }`}
                >
                  {isCorrect ? 'ĐÚNG' : userAns === null ? 'CHƯA TRẢ LỜI' : 'SAI'}
                </span>
              </div>

              {/* Question Prompt */}
              <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed mb-4">
                {q.prompt}
              </p>

              {/* Options list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                {q.options.map((opt, optIdx) => {
                  const isUserPick = userAns === optIdx;
                  const isCorrectChoice = q.correctAnswer === optIdx;

                  let optClass = 'bg-slate-800/40 border-slate-800 text-slate-300';
                  if (isCorrectChoice) {
                    optClass = 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200 font-semibold';
                  } else if (isUserPick) {
                    optClass = 'bg-rose-500/10 border-rose-500/40 text-rose-200 line-through';
                  }

                  return (
                    <div
                      key={optIdx}
                      className={`p-3 rounded-xl border flex items-center justify-between text-xs sm:text-sm ${optClass}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold opacity-70">
                          {optionLabels[optIdx]}.
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isCorrectChoice && (
                        <span className="text-[11px] text-emerald-400 font-bold ml-2 shrink-0">
                          ✓ Đáp án đúng
                        </span>
                      )}
                      {isUserPick && !isCorrectChoice && (
                        <span className="text-[11px] text-rose-400 font-bold ml-2 shrink-0">
                          ✗ Bạn đã chọn
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Explanation Box */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <span className="font-bold text-indigo-400 block mb-1">💡 Giải thích chi tiết:</span>
                <p>{q.explanation}</p>
              </div>

              {/* Vocabulary Link if relatedWordIds present */}
              {q.relatedWordIds && q.relatedWordIds.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                    Từ vựng liên quan:
                  </span>
                  {q.relatedWordIds.map((wordId) => (
                    <Link
                      key={wordId}
                      href={`/word/${wordId}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors font-medium"
                    >
                      <span>Xem thẻ từ #{wordId}</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
