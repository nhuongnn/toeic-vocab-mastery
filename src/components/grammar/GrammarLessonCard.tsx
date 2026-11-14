'use client';

import React, { useState } from 'react';
import { GrammarLesson } from '@/types/grammar';
import {
  Brain,
  BookOpen,
  Volume2,
  AlertTriangle,
  Zap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronRight,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';
import { useSpeech } from '@/hooks/useSpeech';

interface GrammarLessonCardProps {
  lesson: GrammarLesson;
}

type TabType = 'mindset' | 'rules' | 'examples' | 'traps' | 'toeic' | 'quiz';

export function GrammarLessonCard({ lesson }: GrammarLessonCardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('mindset');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<number, boolean>>({});
  const [showAllTranslations, setShowAllTranslations] = useState(true);

  const { speak } = useSpeech();

  const handleSelectOption = (quizIndex: number, optionIndex: number) => {
    if (selectedAnswers[quizIndex] !== undefined) return; // already answered
    setSelectedAnswers((prev) => ({ ...prev, [quizIndex]: optionIndex }));
    setShowExplanations((prev) => ({ ...prev, [quizIndex]: true }));
  };

  const tabs: { key: TabType; label: string; icon: React.ElementType }[] = [
    { key: 'mindset', label: 'Tư duy bản xứ', icon: Brain },
    { key: 'rules', label: 'Quy tắc rút gọn', icon: BookOpen },
    { key: 'examples', label: 'Ví dụ thực tế', icon: Volume2 },
    { key: 'traps', label: 'Bẫy hay gặp', icon: AlertTriangle },
    { key: 'toeic', label: 'Mẹo đề TOEIC', icon: Zap },
    { key: 'quiz', label: `Luyện tập (${lesson.quiz.length})`, icon: HelpCircle },
  ];

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden transition-all hover:border-slate-700/80">
      {/* Lesson Header */}
      <div className="p-6 pb-4 border-b border-slate-800/80 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              {lesson.tag}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-300">
              {lesson.difficulty}
            </span>
          </div>
          <span className="text-amber-400 text-xs font-semibold tracking-wider">
            Tần suất: {lesson.frequency}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
          {lesson.titleVi}
        </h3>
        <p className="text-xs text-indigo-300/90 font-medium mt-0.5">{lesson.title}</p>
        <p className="text-xs text-slate-400 mt-2 leading-relaxed">{lesson.subtitle}</p>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-4 mt-2 border-t border-slate-800/60 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Contents */}
      <div className="p-6">
        {/* TAB 1: NATIVE MINDSET */}
        {activeTab === 'mindset' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
                <Brain className="w-4 h-4" />
                <span>Bản chất trực giác của người bản xứ (Core Intuition)</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {lesson.nativeMindset.coreIntuition}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Hình ảnh trực quan trong tâm trí:</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lesson.nativeMindset.mentalImage}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                <div className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span>Tại sao người bản xứ nói như vậy:</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                  {lesson.nativeMindset.whyNativesSayThis}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-1.5">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>Cảnh báo thói quen dịch từ-sang-từ của người Việt:</span>
              </div>
              <p className="text-xs text-rose-200/90 leading-relaxed pl-6">
                {lesson.nativeMindset.vietnameseMistakeWarning}
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: RULES */}
        {activeTab === 'rules' && (
          <div className="space-y-4">
            {lesson.rules.map((rule, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <h4 className="text-sm font-bold text-white">{rule.ruleTitle}</h4>
                </div>

                {rule.formula && (
                  <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/30 font-mono text-xs text-indigo-300 font-semibold overflow-x-auto whitespace-pre-line">
                    {rule.formula}
                  </div>
                )}

                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                  {rule.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                  <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-emerald-300">
                    <strong className="block text-emerald-400 font-semibold mb-0.5">
                      ✓ Khi nào nên dùng:
                    </strong>
                    <span className="whitespace-pre-line">{rule.whenToUse}</span>
                  </div>

                  {rule.whenToAvoid && (
                    <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/20 text-amber-300">
                      <strong className="block text-amber-400 font-semibold mb-0.5">
                        ✕ Khi nào nên tránh:
                      </strong>
                      <span className="whitespace-pre-line">{rule.whenToAvoid}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: EXAMPLES */}
        {activeTab === 'examples' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs text-slate-400">
                Nhấn vào biểu tượng loa để nghe phát âm tự nhiên:
              </span>
              <button
                onClick={() => setShowAllTranslations((prev) => !prev)}
                className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
              >
                {showAllTranslations ? (
                  <>
                    <EyeOff className="w-3 h-3" />
                    <span>Ẩn dịch tiếng Việt</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3 h-3" />
                    <span>Hiện dịch tiếng Việt</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-2.5">
              {lesson.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700/80 transition-all space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 space-y-1">
                      <div className="text-sm font-semibold text-slate-100 flex items-center gap-2 flex-wrap">
                        <span>{ex.en}</span>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.2 rounded bg-slate-800 text-slate-400">
                          {ex.context}
                        </span>
                      </div>
                      {showAllTranslations && (
                        <div className="text-xs text-slate-400">{ex.vi}</div>
                      )}
                    </div>

                    <button
                      onClick={() => speak(ex.en)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-colors flex-shrink-0"
                      title="Nghe phát âm câu này"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {ex.note && (
                    <div className="text-[11px] text-indigo-300/90 pt-1 border-t border-slate-800/60">
                      💡 {ex.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TRAPS */}
        {activeTab === 'traps' && (
          <div className="space-y-3">
            {lesson.commonTraps.map((trap, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/30 text-rose-300 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-rose-400">
                      <XCircle className="w-4 h-4" />
                      <span>Câu sai thường gặp:</span>
                    </div>
                    <p className="line-through text-slate-300">{trap.wrong}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Người bản xứ sửa đúng:</span>
                    </div>
                    <p className="font-semibold text-white">{trap.correct}</p>
                  </div>
                </div>

                <div className="text-xs text-slate-300 space-y-1 pt-1">
                  <div>
                    <strong className="text-amber-400">Tại sao lại sai: </strong>
                    <span>{trap.nativeReason}</span>
                  </div>
                  <div>
                    <strong className="text-rose-400">Bẫy người Việt: </strong>
                    <span>{trap.vietnameseTrap}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: TOEIC HACKS */}
        {activeTab === 'toeic' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/30 via-slate-950 to-indigo-950/30 border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-xs">
                  {lesson.toeicHacks.targetParts}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  Phản xạ 3 giây
                </span>
              </div>

              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>{lesson.toeicHacks.hackTitle}</span>
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                {lesson.toeicHacks.hackContent}
              </p>

              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                  Từ khóa nhận diện nhanh trong đề:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {lesson.toeicHacks.quickSignalWords.map((word, wIdx) => (
                    <span
                      key={wIdx}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-indigo-300"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-amber-200/90 font-medium">
                📌 <strong>Quy tắc bỏ túi:</strong> {lesson.toeicHacks.ruleOfThumb}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: QUIZ */}
        {activeTab === 'quiz' && (
          <div className="space-y-5">
            {lesson.quiz.map((q, qIdx) => {
              const selected = selectedAnswers[qIdx];
              const isAnswered = selected !== undefined;
              const isCorrect = selected === q.correctAnswer;

              return (
                <div
                  key={qIdx}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3"
                >
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {qIdx + 1}
                    </span>
                    <p className="text-sm font-medium text-slate-100 leading-relaxed">
                      {q.question}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-7">
                    {q.options.map((opt, optIdx) => {
                      let btnStyle =
                        'bg-slate-900 hover:bg-slate-800/80 text-slate-300 border-slate-800';

                      if (isAnswered) {
                        if (optIdx === q.correctAnswer) {
                          btnStyle =
                            'bg-emerald-950/50 border-emerald-500 text-emerald-300 font-bold';
                        } else if (optIdx === selected) {
                          btnStyle =
                            'bg-rose-950/50 border-rose-500 text-rose-300 line-through';
                        } else {
                          btnStyle = 'opacity-50 border-slate-800';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(qIdx, optIdx)}
                          disabled={isAnswered}
                          className={`p-2.5 rounded-xl border text-xs text-left transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && optIdx === q.correctAnswer && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          )}
                          {isAnswered && optIdx === selected && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation feedback */}
                  {isAnswered && (
                    <div
                      className={`p-3 rounded-lg border text-xs ml-7 space-y-1 ${
                        isCorrect
                          ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                          : 'bg-rose-950/20 border-rose-500/30 text-rose-200'
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1.5">
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Chính xác!</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-400" />
                            <span>Chưa đúng! Đáp án đúng là ({String.fromCharCode(65 + q.correctAnswer)}).</span>
                          </>
                        )}
                      </div>
                      <p className="text-slate-300 mt-1">{q.explanation}</p>
                      {q.toeicTip && (
                        <p className="text-amber-300/90 font-medium pt-1 border-t border-slate-800/60">
                          🎯 {q.toeicTip}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
