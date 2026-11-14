'use client';

import React, { useState } from 'react';
import { ReadingLesson, ReadingPassage } from '@/types/reading';
import {
  Brain,
  BookOpen,
  Volume2,
  AlertTriangle,
  Zap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  Clock,
  Layers,
  FileText,
} from 'lucide-react';
import { useSpeech } from '@/hooks/useSpeech';

interface ReadingLessonCardProps {
  lesson: ReadingLesson;
}

type TabType = 'mindset' | 'strategy' | 'paraphrases' | 'passage' | 'traps' | 'quiz';

export function ReadingLessonCard({ lesson }: ReadingLessonCardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('mindset');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<number, boolean>>({});
  const [showTranslation, setShowTranslation] = useState(false);
  const [activePassageIndex, setActivePassageIndex] = useState<1 | 2>(1);

  const { speak } = useSpeech();

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (selectedAnswers[questionIndex] !== undefined) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
    setShowExplanations((prev) => ({ ...prev, [questionIndex]: true }));
  };

  const tabs: { key: TabType; label: string; icon: React.ElementType }[] = [
    { key: 'mindset', label: 'Tư duy đọc', icon: Brain },
    { key: 'strategy', label: 'Chiến thuật 30s', icon: Zap },
    { key: 'paraphrases', label: `Paraphrase vàng (${lesson.goldenParaphrases.length})`, icon: Sparkles },
    { key: 'passage', label: 'Bài đọc thực chiến', icon: BookOpen },
    { key: 'traps', label: `Bẫy đề (${lesson.commonTraps.length})`, icon: AlertTriangle },
    { key: 'quiz', label: `Luyện tập (${lesson.quiz.length})`, icon: HelpCircle },
  ];

  const currentPassage =
    activePassageIndex === 2 && lesson.secondaryPassage
      ? lesson.secondaryPassage
      : lesson.primaryPassage;

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden transition-all hover:border-slate-700/80">
      {/* Header */}
      <div className="p-6 pb-4 border-b border-slate-800/80 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-950">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              {lesson.tag}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-300">
              {lesson.difficulty}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-medium">
              <Clock className="w-3 h-3 text-indigo-400" />
              {lesson.estimatedTime}
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
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Brain className="w-4 h-4" />
                <span>Bản chất tư duy đọc bản xứ</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {lesson.nativeMindset.coreIntuition}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                  <Zap className="w-4 h-4" />
                  <span>Bí quyết tăng tốc độ đọc (Thought Groups)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lesson.nativeMindset.readingSpeedSecret}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-1.5">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Cảnh báo thói quen đọc sai lầm</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lesson.nativeMindset.vietnameseMistakeWarning}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ATTACK STRATEGY */}
        {activeTab === 'strategy' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Zap className="w-4 h-4" />
                <span>Quy trình xử lý nhanh 3 bước (30s Attack Framework)</span>
              </span>

              <div className="space-y-2.5">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    1
                  </span>
                  <div>
                    <strong className="text-xs text-white block">Bước 1: Quét mở bài & tiêu đề</strong>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      {lesson.attackStrategy.step1}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    2
                  </span>
                  <div>
                    <strong className="text-xs text-white block">Bước 2: Định vị chủ thể & mốc thời gian</strong>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      {lesson.attackStrategy.step2}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    3
                  </span>
                  <div>
                    <strong className="text-xs text-white block">Bước 3: Bắt trọn hành động kế tiếp</strong>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      {lesson.attackStrategy.step3}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/30 flex items-center gap-2 text-xs text-indigo-300">
                <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span><strong>Mẹo bỏ túi: </strong>{lesson.attackStrategy.proTip}</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: GOLDEN PARAPHRASES */}
        {activeTab === 'paraphrases' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-400">
              Người ra đề TOEIC Part 7 <strong>không bao giờ giữ nguyên từ gốc</strong> mà luôn dùng từ đồng nghĩa trong đáp án. Nắm vững các cặp từ này giúp bạn chọn đáp án chỉ trong 5 giây:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lesson.goldenParaphrases.map((pair, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-slate-200">
                      {pair.original}
                    </span>
                    <button
                      onClick={() => speak(pair.paraphrased)}
                      className="p-1 rounded bg-slate-800 text-slate-400 hover:text-indigo-400 transition-colors"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                    <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{pair.paraphrased}</span>
                  </div>

                  <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/60 leading-relaxed">
                    {pair.contextVi}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SAMPLE PASSAGE */}
        {activeTab === 'passage' && (
          <div className="space-y-4">
            {/* Passage Selector (if multi-passages) */}
            {lesson.secondaryPassage && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActivePassageIndex(1)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activePassageIndex === 1
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  Văn bản 1: {lesson.primaryPassage.type}
                </button>
                <button
                  onClick={() => setActivePassageIndex(2)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activePassageIndex === 2
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  Văn bản 2: {lesson.secondaryPassage.type}
                </button>
              </div>
            )}

            {/* Passage Container */}
            <div className="rounded-xl bg-slate-950 border border-slate-800 p-5 space-y-4 font-sans">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-500/20 text-indigo-400 uppercase">
                    {currentPassage.type}
                  </span>
                  {currentPassage.title && (
                    <span className="text-xs font-medium text-slate-300">
                      {currentPassage.title}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => speak(currentPassage.content, 'en-US', 0.95)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Đọc Audio</span>
                  </button>

                  {currentPassage.vietnameseTranslation && (
                    <button
                      onClick={() => setShowTranslation(!showTranslation)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
                    >
                      {showTranslation ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showTranslation ? 'Ẩn bản dịch' : 'Xem bản dịch'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Header Info (if Email / Memo / Invoice) */}
              {currentPassage.header && (
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs space-y-1 font-mono text-slate-300">
                  {currentPassage.header.from && (
                    <div>
                      <strong className="text-slate-400">From: </strong>
                      {currentPassage.header.from}
                    </div>
                  )}
                  {currentPassage.header.to && (
                    <div>
                      <strong className="text-slate-400">To: </strong>
                      {currentPassage.header.to}
                    </div>
                  )}
                  {currentPassage.header.date && (
                    <div>
                      <strong className="text-slate-400">Date: </strong>
                      {currentPassage.header.date}
                    </div>
                  )}
                  {currentPassage.header.subject && (
                    <div>
                      <strong className="text-indigo-400">Subject: </strong>
                      <span className="text-white font-bold">{currentPassage.header.subject}</span>
                    </div>
                  )}
                  {currentPassage.header.refNumber && (
                    <div>
                      <strong className="text-amber-400">Ref #: </strong>
                      {currentPassage.header.refNumber}
                    </div>
                  )}
                </div>
              )}

              {/* English Body */}
              <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                {currentPassage.content}
              </div>

              {/* Key Highlights breakdown */}
              {currentPassage.keyHighlights && currentPassage.keyHighlights.length > 0 && (
                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Điểm chốt mấu chốt được bắt bài (Key Clues)</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentPassage.keyHighlights.map((hl, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1"
                      >
                        <span className="font-mono font-bold text-amber-400 block">
                          "{hl.text}"
                        </span>
                        <p className="text-slate-300 text-[11px] leading-relaxed">
                          {hl.note}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vietnamese Translation Toggle */}
              {showTranslation && currentPassage.vietnameseTranslation && (
                <div className="pt-3 border-t border-slate-800/80 space-y-2 bg-indigo-950/10 p-3 rounded-lg">
                  <span className="text-xs font-bold text-indigo-400 block uppercase">
                    Bản dịch tiếng Việt tham khảo:
                  </span>
                  <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-line font-sans">
                    {currentPassage.vietnameseTranslation}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: TRAPS */}
        {activeTab === 'traps' && (
          <div className="space-y-4">
            {lesson.commonTraps.map((trap, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3"
              >
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{trap.trapName}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {trap.trapDescription}
                </p>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono uppercase block">Đoạn văn trích dẫn:</span>
                  <p className="font-mono text-slate-300 italic">"{trap.examplePassageSnippet}"</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-500/20 text-rose-300">
                    <span className="font-bold block text-[11px] mb-0.5">✕ Đáp án bẫy (Distractor):</span>
                    {trap.distractorOption}
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-emerald-300">
                    <span className="font-bold block text-[11px] mb-0.5">✓ Đáp án đúng chuẩn xác:</span>
                    {trap.correctOption}
                  </div>
                </div>

                <div className="text-[11px] text-indigo-300 bg-indigo-950/20 p-2.5 rounded-lg border border-indigo-500/20">
                  <strong>Cách khắc phục: </strong>{trap.howToAvoid}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 6: QUIZ */}
        {activeTab === 'quiz' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Kiểm tra phản xạ đọc hiểu với đề thi thực chiến</span>
              <span>{lesson.quiz.length} câu hỏi trắc nghiệm</span>
            </div>

            {lesson.quiz.map((q, qIdx) => {
              const selectedOpt = selectedAnswers[qIdx];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.correctAnswer;

              return (
                <div
                  key={qIdx}
                  className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-white leading-relaxed">
                      Câu {qIdx + 1}: {q.question}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 flex-shrink-0 uppercase">
                      {q.questionType}
                    </span>
                  </div>

                  {/* Options */}
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      let btnStyle =
                        'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850';

                      if (isAnswered) {
                        if (optIdx === q.correctAnswer) {
                          btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200';
                        } else if (optIdx === selectedOpt) {
                          btnStyle = 'bg-rose-950/40 border-rose-500 text-rose-200';
                        } else {
                          btnStyle = 'bg-slate-900/50 border-slate-800/50 text-slate-500';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(qIdx, optIdx)}
                          disabled={isAnswered}
                          className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between gap-2 ${btnStyle}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-slate-400">
                              {String.fromCharCode(65 + optIdx)}.
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isAnswered && optIdx === q.correctAnswer && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          )}
                          {isAnswered && optIdx === selectedOpt && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation & Clue */}
                  {showExplanations[qIdx] && (
                    <div className="mt-3 p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-xs">
                        {isCorrect ? (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Chính xác!
                          </span>
                        ) : (
                          <span className="text-rose-400 flex items-center gap-1">
                            <XCircle className="w-4 h-4" /> Chưa chính xác!
                          </span>
                        )}
                      </div>

                      <div className="p-2 rounded bg-slate-950 border border-slate-800/80 font-mono text-slate-300 text-[11px]">
                        <strong className="text-indigo-400">Dẫn chứng (Clue): </strong>
                        "{q.clueSnippet}"
                      </div>

                      {q.paraphraseUsed && (
                        <div className="text-[11px] text-emerald-400">
                          <strong>Cặp Paraphrase: </strong>
                          {q.paraphraseUsed}
                        </div>
                      )}

                      <p className="text-slate-300 leading-relaxed text-xs">
                        {q.explanation}
                      </p>
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
