'use client';

import React, { useState } from 'react';
import { WritingLesson, WritingFormula } from '@/types/writing';
import {
  Brain,
  PenTool,
  Volume2,
  AlertTriangle,
  Zap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Send,
  FileSignature,
  Layers,
  Copy,
  Check,
} from 'lucide-react';
import { useSpeech } from '@/hooks/useSpeech';

interface WritingLessonCardProps {
  lesson: WritingLesson;
}

type TabType = 'mindset' | 'formulas' | 'beforeAfter' | 'phrases' | 'traps' | 'exercises';

export function WritingLessonCard({ lesson }: WritingLessonCardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('mindset');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<number, boolean>>({});
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const { speak } = useSpeech();

  const handleSelectOption = (exerciseIndex: number, optionIndex: number) => {
    if (selectedAnswers[exerciseIndex] !== undefined) return;
    setSelectedAnswers((prev) => ({ ...prev, [exerciseIndex]: optionIndex }));
    setShowExplanations((prev) => ({ ...prev, [exerciseIndex]: true }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const tabs: { key: TabType; label: string; icon: React.ElementType }[] = [
    { key: 'mindset', label: 'Tư duy viết (BLUF)', icon: Brain },
    { key: 'formulas', label: `Khung câu (${lesson.formulas.length})`, icon: PenTool },
    { key: 'beforeAfter', label: `So sánh Trước/Sau (${lesson.beforeAfter.length})`, icon: ArrowRight },
    { key: 'phrases', label: 'Cụm từ quyền lực', icon: Sparkles },
    { key: 'traps', label: `Bẫy lỗi (${lesson.commonTraps.length})`, icon: AlertTriangle },
    { key: 'exercises', label: `Thực hành (${lesson.exercises.length})`, icon: HelpCircle },
  ];

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden transition-all hover:border-slate-700/80">
      {/* Header */}
      <div className="p-6 pb-4 border-b border-slate-800/80 bg-gradient-to-r from-slate-900 via-purple-950/30 to-slate-950">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/10 border border-purple-500/20 text-purple-400">
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
        <p className="text-xs text-purple-300/90 font-medium mt-0.5">{lesson.title}</p>
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
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
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
              <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
                <Brain className="w-4 h-4" />
                <span>Tư duy viết bản xứ: BLUF (Bottom Line Up Front)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {lesson.nativeMindset.coreIntuition}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                  <Zap className="w-4 h-4" />
                  <span>Bí quyết viết súc tích, gãy gọn (K.I.S.S)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lesson.nativeMindset.brevitySecret}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-1.5">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Cảnh báo thói quen viết lan man kiểu dịch chay</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lesson.nativeMindset.vietnameseMistakeWarning}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FORMULAS */}
        {activeTab === 'formulas' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-400">
              Các bộ khung câu kinh điển đã được chuẩn hóa trong thư từ kinh doanh quốc tế. Bạn chỉ cần điền thông tin cụ thể vào phần trong ngoặc vuông:
            </p>

            <div className="space-y-4">
              {lesson.formulas.map((f, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-[11px] font-bold">
                        {idx + 1}
                      </span>
                      <span>{f.purpose}</span>
                    </span>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        f.tone === 'Formal'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          : f.tone === 'Professional'
                          ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }`}
                    >
                      Tone: {f.tone}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800/80 font-mono text-xs text-amber-300 flex items-center justify-between gap-2">
                    <span>{f.pattern}</span>
                    <button
                      onClick={() => copyToClipboard(f.pattern)}
                      className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                      title="Copy khung câu"
                    >
                      {copiedText === f.pattern ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] text-slate-400 font-semibold block">
                      Các ví dụ ứng dụng thực tế:
                    </span>
                    {f.examples.map((ex, exIdx) => (
                      <div
                        key={exIdx}
                        className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800/60 text-xs text-slate-300"
                      >
                        <span className="leading-relaxed">"{ex}"</span>
                        <button
                          onClick={() => speak(ex)}
                          className="p-1 rounded bg-slate-800 text-slate-400 hover:text-purple-400 transition-colors flex-shrink-0"
                          title="Nghe phát âm"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: BEFORE & AFTER */}
        {activeTab === 'beforeAfter' && (
          <div className="space-y-6">
            <p className="text-xs text-slate-400">
              Đối chiếu trực quan giữa cách viết dịch từ tiếng Việt thô kệch và cách viết gãy gọn chuẩn bản xứ:
            </p>

            {lesson.beforeAfter.map((ba, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4"
              >
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
                  <span>Tình huống: </span>
                  <span className="text-white">{ba.scenarioVi}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Before (Awkward) */}
                  <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-400 uppercase flex items-center gap-1.5">
                        <XCircle className="w-4 h-4" />
                        <span>Cách viết dịch thô / Viet-English</span>
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-950/90 font-mono text-xs text-rose-200 leading-relaxed whitespace-pre-line border border-rose-500/20">
                      {ba.awkwardVersion}
                    </div>

                    <p className="text-[11px] text-rose-300/90 leading-relaxed">
                      <strong>✕ Điểm trừ: </strong>{ba.awkwardFlaw}
                    </p>
                  </div>

                  {/* After (Native Pro) */}
                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Cách viết chuẩn Bản xứ Quốc tế</span>
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => speak(ba.nativeVersion)}
                          className="p-1 rounded bg-slate-800 text-slate-300 hover:text-emerald-400 transition-colors"
                          title="Nghe audio"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => copyToClipboard(ba.nativeVersion)}
                          className="p-1 rounded bg-slate-800 text-slate-300 hover:text-emerald-400 transition-colors"
                          title="Copy mẫu"
                        >
                          {copiedText === ba.nativeVersion ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-950/90 font-mono text-xs text-emerald-200 leading-relaxed whitespace-pre-line border border-emerald-500/20">
                      {ba.nativeVersion}
                    </div>

                    <p className="text-[11px] text-emerald-300/90 leading-relaxed">
                      <strong>✓ Tại sao bản xứ dùng cách này: </strong>{ba.nativeWhy}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: POWER PHRASES */}
        {activeTab === 'phrases' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-400">
              Bộ từ vựng và cụm liên kết (Transitions & Power Phrases) giúp email của bạn nghe trơn tru, lịch thiệp và mang phong thái chuyên nghiệp:
            </p>

            <div className="space-y-4">
              {lesson.powerPhrases.map((group, gIdx) => (
                <div
                  key={gIdx}
                  className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5"
                >
                  <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{group.category}</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {group.phrases.map((phrase, pIdx) => (
                      <div
                        key={pIdx}
                        className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 hover:border-purple-500/40 transition-colors space-y-1"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-white font-mono">
                            {phrase.en}
                          </span>
                          <button
                            onClick={() => speak(phrase.en)}
                            className="p-1 rounded bg-slate-800 text-slate-400 hover:text-purple-400 transition-colors"
                            title="Nghe phát âm"
                          >
                            <Volume2 className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {phrase.vi}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
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
                  <span>{trap.trapTitle}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/20 text-rose-300 space-y-1">
                    <span className="font-bold block text-[11px]">✕ Lỗi hành văn cần tránh:</span>
                    <p className="font-mono text-xs">"{trap.wrongSnippet}"</p>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-emerald-300 space-y-1">
                    <span className="font-bold block text-[11px]">✓ Cách viết bản xứ khuyên dùng:</span>
                    <p className="font-mono text-xs">"{trap.rightSnippet}"</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <strong>Giải thích: </strong>{trap.explanation}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 6: EXERCISES */}
        {activeTab === 'exercises' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Thực hành phản xạ viết câu chuẩn công sở</span>
              <span>{lesson.exercises.length} bài tập</span>
            </div>

            {lesson.exercises.map((ex, exIdx) => {
              const selectedOpt = selectedAnswers[exIdx];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === ex.correctAnswer;

              return (
                <div
                  key={exIdx}
                  className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3"
                >
                  <div className="space-y-1">
                    <h4 className="text-xs sm:text-sm font-bold text-white leading-relaxed">
                      Bài {exIdx + 1}: {ex.instruction}
                    </h4>
                    <p className="text-xs text-indigo-300 font-medium">
                      Tình huống: {ex.scenarioVi}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="space-y-2">
                    {ex.options.map((opt, optIdx) => {
                      let btnStyle =
                        'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850';

                      if (isAnswered) {
                        if (optIdx === ex.correctAnswer) {
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
                          onClick={() => handleSelectOption(exIdx, optIdx)}
                          disabled={isAnswered}
                          className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between gap-2 ${btnStyle}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-slate-400">
                              {String.fromCharCode(65 + optIdx)}.
                            </span>
                            <span className="leading-relaxed">{opt}</span>
                          </div>
                          {isAnswered && optIdx === ex.correctAnswer && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          )}
                          {isAnswered && optIdx === selectedOpt && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation & Native Tip */}
                  {showExplanations[exIdx] && (
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

                      <p className="text-slate-300 leading-relaxed text-xs">
                        {ex.explanation}
                      </p>

                      <div className="p-2.5 rounded bg-purple-950/30 border border-purple-500/30 text-purple-300 text-[11px]">
                        <strong>Mẹo viết bản xứ: </strong>
                        {ex.nativeWritingTip}
                      </div>
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
