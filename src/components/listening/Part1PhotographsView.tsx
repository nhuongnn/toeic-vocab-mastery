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
  Headphones,
} from 'lucide-react';
import { Part1Question, ListeningAccent } from '@/types/listening';
import { useSpeech } from '@/hooks/useSpeech';
import { AudioPlayerBar } from './AudioPlayerBar';

interface Part1PhotographsViewProps {
  questions: Part1Question[];
  onComplete?: (score: number, total: number) => void;
}

export function Part1PhotographsView({ questions, onComplete }: Part1PhotographsViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D' | null>>({});
  const [revealedExplanations, setRevealedExplanations] = useState<Record<string, boolean>>({});
  const [activeAudioChoice, setActiveAudioChoice] = useState<'A' | 'B' | 'C' | 'D' | 'all' | null>(null);

  const { speak, stop, isPlaying } = useSpeech();

  const currentQ = questions[currentIndex];
  const currentAnswer = selectedAnswers[currentQ?.id] || null;
  const isAnswered = currentAnswer !== null;
  const isCorrect = currentAnswer === currentQ?.correctAnswer;

  // Cleanup speech on question change or unmount
  useEffect(() => {
    stop();
    setActiveAudioChoice(null);
  }, [currentIndex, stop]);

  if (!currentQ) return null;

  const playFullSequence = (accent: ListeningAccent = currentQ.accent, rate: number = 0.88) => {
    stop();
    setActiveAudioChoice('all');
    const fullScript = currentQ.options
      .map((opt) => `Number ${opt.label}. ${opt.text}`)
      .join('. ... ');
    speak(fullScript, accent, rate);
  };

  const playSingleOption = (optLabel: 'A' | 'B' | 'C' | 'D', text: string) => {
    stop();
    setActiveAudioChoice(optLabel);
    speak(`${optLabel}. ${text}`, currentQ.accent, 0.88);
  };

  const handleSelectOption = (label: 'A' | 'B' | 'C' | 'D') => {
    if (selectedAnswers[currentQ.id]) return; // lock once answered
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: label }));
    setRevealedExplanations((prev) => ({ ...prev, [currentQ.id]: true }));
  };

  const handleNext = () => {
    stop();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Calculate total score
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
    <div className="space-y-6">
      {/* Top Header & Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-400 font-bold uppercase tracking-wider">
            Part 1: Photographs
          </span>
          <span className="text-slate-400">
            Câu {currentIndex + 1} / {questions.length} • {currentQ.title}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {questions.map((q, idx) => {
            const ans = selectedAnswers[q.id];
            const isQCorrect = ans === q.correctAnswer;
            let dotBg = 'bg-slate-800 text-slate-400';
            if (idx === currentIndex) dotBg = 'ring-2 ring-sky-500 bg-sky-500/30 text-white font-bold';
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

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Image Container (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 aspect-[4/3] shadow-xl group">
            <img
              src={currentQ.imageUrl}
              alt={currentQ.imageAlt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            
            {/* Image Overlay Label */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-200 pointer-events-none">
              <span className="bg-slate-900/80 backdrop-blur px-3 py-1 rounded-full border border-slate-700/60 font-medium">
                🎯 {currentQ.category}
              </span>
              <span className="text-[11px] text-slate-400 bg-slate-900/80 backdrop-blur px-2.5 py-1 rounded-full">
                Chuẩn hình ảnh ETS TOEIC
              </span>
            </div>
          </div>

          {/* Audio Control Bar */}
          <AudioPlayerBar
            isPlaying={isPlaying && activeAudioChoice === 'all'}
            onPlay={(accent, rate) => playFullSequence(accent, rate)}
            onPause={() => stop()}
            onReplay={() => playFullSequence()}
            defaultAccent={currentQ.accent}
            label="Nghe toàn bộ 4 đáp án (A - B - C - D)"
          />

          {/* Scene Description Vi hint */}
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
            <Eye className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-sky-400">Quan sát bức tranh: </span>
              <span>{currentQ.sceneDescriptionVi}</span>
            </div>
          </div>
        </div>

        {/* Right: Answer Choices & Trap Analysis (5 Cols) */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                <Headphones className="w-4 h-4 text-sky-400" />
                <span>Chọn đáp án miêu tả đúng nhất:</span>
              </h3>
              <span className="text-[11px] text-slate-400">
                {isAnswered ? 'Đã trả lời' : 'Bấm nghe & chọn'}
              </span>
            </div>

            {/* 4 Choices */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt) => {
                const isSelected = currentAnswer === opt.label;
                const isThisCorrect = opt.label === currentQ.correctAnswer;

                let stateClasses = 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300';
                if (isAnswered) {
                  if (isThisCorrect) {
                    stateClasses = 'bg-emerald-950/40 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/50';
                  } else if (isSelected && !isThisCorrect) {
                    stateClasses = 'bg-rose-950/40 border-rose-500 text-rose-300 ring-1 ring-rose-500/50';
                  } else {
                    stateClasses = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                  }
                }

                return (
                  <div
                    key={opt.label}
                    className={`rounded-2xl border-2 transition-all p-3 sm:p-3.5 flex flex-col gap-2 ${stateClasses}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <button
                        onClick={() => handleSelectOption(opt.label)}
                        disabled={isAnswered}
                        className="flex items-center gap-3 text-left flex-1 font-medium text-sm"
                      >
                        <span
                          className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-sky-500 text-white'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {opt.label}
                        </span>

                        <span className="leading-snug">
                          {isAnswered ? opt.text : `Statement (${opt.label})`}
                        </span>
                      </button>

                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {/* Audio speaker button for this option */}
                        <button
                          onClick={() => playSingleOption(opt.label, opt.text)}
                          className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 flex items-center justify-center transition-colors"
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

                    {/* Revealed IPA & Vietnamese translation after answering */}
                    {isAnswered && (
                      <div className="pl-10 text-xs border-t border-slate-800/80 pt-2 space-y-1">
                        {opt.ipa && (
                          <p className="font-mono text-[11px] text-slate-400">{opt.ipa}</p>
                        )}
                        <p className="text-slate-300 italic">{opt.translationVi}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Explanation & Trap Breakdown Card */}
          {isAnswered && (
            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-indigo-500/30 p-4 space-y-3 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-400">
                <AlertTriangle className="w-4 h-4" />
                <span>Phân tích Bẫy Đề Thi Mới Nhất:</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {currentQ.trapExplanationVi}
              </p>

              {/* Key Vocab */}
              <div className="pt-2 border-t border-slate-800 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Từ vựng chìa khóa trong câu:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentQ.keyVocabulary.map((kv) => (
                    <button
                      key={kv.word}
                      onClick={() => speak(kv.word, currentQ.accent)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700/60 transition-colors"
                      title="Bấm để nghe phát âm từ"
                    >
                      <span className="font-bold">{kv.word}</span>
                      <span className="text-[10px] text-sky-400 font-mono">{kv.phonetic}</span>
                      <span className="text-slate-400">• {kv.meaning}</span>
                      <Volume2 className="w-3 h-3 text-sky-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Bottom Navigation Buttons */}
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
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-md shadow-sky-600/30 transition-all hover:scale-105"
            >
              <span>{currentIndex + 1 < questions.length ? 'Câu tiếp theo' : 'Xem Kết Quả'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
