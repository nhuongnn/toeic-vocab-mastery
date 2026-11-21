'use client';

import React, { useState, useEffect } from 'react';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Eye,
  EyeOff,
  Headphones,
} from 'lucide-react';
import { Part2Question, ListeningAccent } from '@/types/listening';
import { useSpeech } from '@/hooks/useSpeech';
import { AudioPlayerBar } from './AudioPlayerBar';

interface Part2QuestionResponseViewProps {
  questions: Part2Question[];
  onComplete?: (score: number, total: number) => void;
}

export function Part2QuestionResponseView({
  questions,
  onComplete,
}: Part2QuestionResponseViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, 'A' | 'B' | 'C' | null>>({});
  const [showPromptScript, setShowPromptScript] = useState(false);
  const [activeAudioChoice, setActiveAudioChoice] = useState<'prompt' | 'A' | 'B' | 'C' | 'all' | null>(null);

  const { speak, stop, isPlaying } = useSpeech();

  const currentQ = questions[currentIndex];
  const currentAnswer = selectedAnswers[currentQ?.id] || null;
  const isAnswered = currentAnswer !== null;
  const isCorrect = currentAnswer === currentQ?.correctAnswer;

  useEffect(() => {
    stop();
    setActiveAudioChoice(null);
    setShowPromptScript(false);
  }, [currentIndex, stop]);

  if (!currentQ) return null;

  const playPromptAudio = (accent: ListeningAccent = currentQ.accent, rate: number = 0.9) => {
    stop();
    setActiveAudioChoice('prompt');
    speak(currentQ.promptQuestion, accent, rate);
  };

  const playFullSequence = (accent: ListeningAccent = currentQ.accent, rate: number = 0.9) => {
    stop();
    setActiveAudioChoice('all');
    const fullText = `${currentQ.promptQuestion} ... ... Number A. ${currentQ.options[0].text} ... Number B. ${currentQ.options[1].text} ... Number C. ${currentQ.options[2].text}`;
    speak(fullText, accent, rate);
  };

  const playSingleOption = (label: 'A' | 'B' | 'C', text: string) => {
    stop();
    setActiveAudioChoice(label);
    speak(`${label}. ${text}`, currentQ.accent, 0.9);
  };

  const handleSelectOption = (label: 'A' | 'B' | 'C') => {
    if (selectedAnswers[currentQ.id]) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: label }));
  };

  const handleNext = () => {
    stop();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      const totalCorrect = questions.filter(
        (q) => selectedAnswers[q.id] === q.correctAnswer
      ).length;
      if (onComplete) onComplete(totalCorrect, questions.length);
    }
  };

  const handlePrev = () => {
    stop();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold uppercase tracking-wider">
            Part 2: Question & Response
          </span>
          <span className="text-slate-400">
            Câu {currentIndex + 1} / {questions.length} • {currentQ.context}
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {questions.map((q, idx) => {
            const ans = selectedAnswers[q.id];
            const isQCorrect = ans === q.correctAnswer;
            let dotBg = 'bg-slate-800 text-slate-400';
            if (idx === currentIndex) dotBg = 'ring-2 ring-emerald-500 bg-emerald-500/30 text-white font-bold';
            else if (ans && isQCorrect) dotBg = 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50';
            else if (ans && !isQCorrect) dotBg = 'bg-rose-500/30 text-rose-300 border border-rose-500/50';

            return (
              <button
                key={q.id}
                onClick={() => {
                  stop();
                  setCurrentIndex(idx);
                }}
                className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${dotBg}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
        {/* Category & Prompt Type Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
              Dạng câu: {currentQ.promptType}
            </span>
          </div>

          <button
            onClick={() => setShowPromptScript(!showPromptScript)}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            {showPromptScript ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showPromptScript ? 'Ẩn câu hỏi đề bài' : 'Xem trước câu hỏi (Script)'}</span>
          </button>
        </div>

        {/* Prompt Audio Interactive Area */}
        <div className="text-center py-6 px-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
            <Volume2 className="w-3.5 h-3.5" />
            <span>Đề thi thật không in chữ • Bấm nghe phản xạ âm thanh</span>
          </div>

          {/* Big Prompt Audio Button */}
          <div>
            <button
              onClick={() => playPromptAudio()}
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all"
            >
              <Headphones className="w-5 h-5" />
              <span>Nghe Câu Hỏi / Phát Biểu</span>
            </button>
          </div>

          {/* Revealed or Toggled Prompt Script */}
          {(showPromptScript || isAnswered) && (
            <div className="pt-3 border-t border-slate-800/60 max-w-lg mx-auto space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                "{currentQ.promptQuestion}"
              </h3>
              <p className="text-xs text-slate-400 italic">{currentQ.promptQuestionVi}</p>
            </div>
          )}
        </div>

        {/* Full Sequence Audio Bar */}
        <AudioPlayerBar
          isPlaying={isPlaying && activeAudioChoice === 'all'}
          onPlay={(accent, rate) => playFullSequence(accent, rate)}
          onPause={() => stop()}
          onReplay={() => playFullSequence()}
          defaultAccent={currentQ.accent}
          label="Nghe toàn bộ (Câu hỏi + 3 phương án A - B - C)"
        />

        {/* 3 Answer Choices */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Chọn câu phản hồi phù hợp nhất:
          </span>

          <div className="grid grid-cols-1 gap-3">
            {currentQ.options.map((opt) => {
              const isSelected = currentAnswer === opt.label;
              const isThisCorrect = opt.label === currentQ.correctAnswer;

              let stateClasses = 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-200';
              if (isAnswered) {
                if (isThisCorrect) {
                  stateClasses = 'bg-emerald-950/50 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/50';
                } else if (isSelected && !isThisCorrect) {
                  stateClasses = 'bg-rose-950/50 border-rose-500 text-rose-300 ring-1 ring-rose-500/50';
                } else {
                  stateClasses = 'bg-slate-950/30 border-slate-900 text-slate-500 opacity-50';
                }
              }

              return (
                <div
                  key={opt.label}
                  className={`rounded-2xl border-2 transition-all p-4 flex flex-col gap-2 ${stateClasses}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleSelectOption(opt.label)}
                      disabled={isAnswered}
                      className="flex items-center gap-3.5 text-left flex-1"
                    >
                      <span
                        className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {opt.label}
                      </span>

                      <div className="text-sm font-medium leading-relaxed">
                        <span>{isAnswered || showPromptScript ? opt.text : `Phản hồi (${opt.label})`}</span>
                      </div>
                    </button>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => playSingleOption(opt.label, opt.text)}
                        className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 flex items-center justify-center transition-colors"
                        title={`Nghe câu (${opt.label})`}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      {isAnswered && isThisCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      )}
                      {isAnswered && isSelected && !isThisCorrect && (
                        <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                      )}
                    </div>
                  </div>

                  {/* Revealed Vietnamese translation after answering */}
                  {isAnswered && (
                    <div className="pl-11 text-xs border-t border-slate-800/80 pt-2 text-slate-300 italic">
                      {opt.translationVi}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Explanation & Trap Breakdown */}
        {isAnswered && (
          <div className="rounded-2xl bg-slate-950/80 border border-indigo-500/30 p-5 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400">
              <AlertTriangle className="w-4 h-4" />
              <span>Phân tích Bẫy Đề Thi: {currentQ.trapAnalysis.trapName}</span>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed">
              {currentQ.explanationVi}
            </p>

            {/* Distractor reasons */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Tại sao các đáp án sai lại đánh lừa thí sinh?
              </span>
              <div className="space-y-1 text-xs text-slate-400">
                {currentQ.trapAnalysis.distractors.map((d) => (
                  <div key={d.label} className="flex items-start gap-2">
                    <span className="font-bold text-rose-400">• Lựa chọn ({d.label}):</span>
                    <span>{d.reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Vocab */}
            <div className="pt-2 border-t border-slate-800 space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Từ vựng thực chiến:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentQ.keyVocabulary.map((kv) => (
                  <button
                    key={kv.word}
                    onClick={() => speak(kv.word, currentQ.accent)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700/60 transition-colors"
                  >
                    <span className="font-bold">{kv.word}</span>
                    <span className="text-slate-400">• {kv.meaning}</span>
                    <Volume2 className="w-3 h-3 text-emerald-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-800 disabled:opacity-40 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Câu trước</span>
          </button>

          <button
            onClick={handleNext}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition-all hover:scale-105"
          >
            <span>{currentIndex + 1 < questions.length ? 'Câu tiếp theo' : 'Xem Kết Quả'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
