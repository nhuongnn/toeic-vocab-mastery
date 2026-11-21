'use client';

import React, { useState, useEffect } from 'react';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Headphones,
  Eye,
  EyeOff,
  Radio,
  Sparkles,
} from 'lucide-react';
import { Part4ShortTalk, ListeningAccent } from '@/types/listening';
import { useSpeech } from '@/hooks/useSpeech';
import { AudioPlayerBar } from './AudioPlayerBar';

interface Part4ShortTalksViewProps {
  talks: Part4ShortTalk[];
  onComplete?: (score: number, total: number) => void;
}

export function Part4ShortTalksView({ talks, onComplete }: Part4ShortTalksViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number | null>>({});
  const [showTranscript, setShowTranscript] = useState(false);

  const { speak, stop, isPlaying } = useSpeech();

  const currentTalk = talks[currentIndex];

  useEffect(() => {
    stop();
    setShowTranscript(false);
  }, [currentIndex, stop]);

  if (!currentTalk) return null;

  const playFullTalk = (accent: ListeningAccent = currentTalk.speaker.accent, rate: number = 0.9) => {
    stop();
    speak(currentTalk.script, accent, rate);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (userAnswers[questionId] !== undefined && userAnswers[questionId] !== null) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleNext = () => {
    stop();
    if (currentIndex + 1 < talks.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      let totalCorrect = 0;
      let totalQuestions = 0;
      talks.forEach((talk) => {
        talk.questions.forEach((q) => {
          totalQuestions++;
          if (userAnswers[q.id] === q.correctAnswer) totalCorrect++;
        });
      });
      if (onComplete) onComplete(totalCorrect, totalQuestions);
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
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-400 font-bold uppercase tracking-wider">
            Part 4: Short Talks
          </span>
          <span className="text-slate-400">
            Bài {currentIndex + 1} / {talks.length} • {currentTalk.topic}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {talks.map((t, idx) => {
            const isFinished = t.questions.every((q) => userAnswers[q.id] !== undefined && userAnswers[q.id] !== null);
            let dotBg = 'bg-slate-800 text-slate-400';
            if (idx === currentIndex) dotBg = 'ring-2 ring-purple-500 bg-purple-500/30 text-white font-bold';
            else if (isFinished) dotBg = 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50';

            return (
              <button
                key={t.id}
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

      {/* Main Grid: Left side audio & script; Right side questions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 shadow-xl">
            {/* Speaker & Talk Context */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold text-white capitalize">
                  {currentTalk.talkType.replace('-', ' ')}
                </span>
              </div>
              <span className="text-[11px] text-slate-400">Chuẩn ETS Talk</span>
            </div>

            {/* Speaker Badge */}
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-300">{currentTalk.speaker.name}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-sky-300">
                  {currentTalk.speaker.accent === 'en-US' ? '🇺🇸 Giọng Mỹ' : currentTalk.speaker.accent === 'en-GB' ? '🇬🇧 Giọng Anh' : '🇦🇺 Giọng Úc'}
                </span>
              </div>
              <p className="text-slate-400 text-[11px]">{currentTalk.speaker.title}</p>
              <p className="text-slate-400 text-[11px] italic pt-1">{currentTalk.contextVi}</p>
            </div>

            {/* Audio Player Bar */}
            <AudioPlayerBar
              isPlaying={isPlaying}
              onPlay={(accent, rate) => playFullTalk(accent, rate)}
              onPause={() => stop()}
              onReplay={() => playFullTalk()}
              defaultAccent={currentTalk.speaker.accent}
              label="Phát bài phát biểu / thông báo"
            />

            {/* Transcript Toggle */}
            <div className="pt-2 border-t border-slate-800 space-y-3">
              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800/80 text-xs font-semibold text-slate-300 border border-slate-800 transition-colors"
              >
                <span className="flex items-center gap-2">
                  {showTranscript ? <EyeOff className="w-4 h-4 text-purple-400" /> : <Eye className="w-4 h-4 text-purple-400" />}
                  <span>{showTranscript ? 'Ẩn lời bài nói (Script)' : 'Xem văn bản bài nói (Script)'}</span>
                </span>
                <span className="text-[11px] text-slate-400">
                  {showTranscript ? 'Đang hiển thị' : 'Luyện nghe trước'}
                </span>
              </button>

              {showTranscript && (
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-xs space-y-2 max-h-80 overflow-y-auto">
                  <p className="text-slate-200 leading-relaxed font-sans">{currentTalk.script}</p>
                  <p className="text-slate-400 italic text-[11px] pt-2 border-t border-slate-800">
                    {currentTalk.scriptVi}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): 3 Questions */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-4">
            {currentTalk.questions.map((q) => {
              const selectedOpt = userAnswers[q.id];
              const isQAnswered = selectedOpt !== undefined && selectedOpt !== null;
              const isQCorrect = selectedOpt === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 space-y-3 shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-purple-400">
                          Câu {q.questionNumber}:
                        </span>
                        <span className="text-xs font-semibold text-white">
                          {q.questionEn}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 italic pl-6">{q.questionVi}</p>
                    </div>

                    {isQAnswered && (
                      <span className="flex-shrink-0">
                        {isQCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-400" />
                        )}
                      </span>
                    )}
                  </div>

                  {/* 4 Choices */}
                  <div className="grid grid-cols-1 gap-2 pt-1">
                    {q.options.map((optText, optIdx) => {
                      const optLabel = String.fromCharCode(65 + optIdx);
                      const isSelected = selectedOpt === optIdx;
                      const isThisCorrect = optIdx === q.correctAnswer;

                      let btnStyle = 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300';
                      if (isQAnswered) {
                        if (isThisCorrect) {
                          btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-300';
                        } else if (isSelected && !isThisCorrect) {
                          btnStyle = 'bg-rose-950/40 border-rose-500 text-rose-300';
                        } else {
                          btnStyle = 'bg-slate-950/30 border-slate-900 text-slate-500 opacity-50';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isQAnswered}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`p-3 rounded-2xl border transition-all flex items-center gap-3 text-left text-xs ${btnStyle}`}
                        >
                          <span
                            className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                              isSelected ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {optLabel}
                          </span>
                          <span className="leading-snug">{optText}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  {isQAnswered && (
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 space-y-1">
                      <span className="font-bold text-purple-400 flex items-center gap-1">
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>Giải thích chi tiết:</span>
                      </span>
                      <p className="text-slate-300 leading-relaxed">{q.explanationVi}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Practical Tips & Key Vocab */}
          <div className="rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-950 border border-purple-500/20 p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Mẹo làm bài TOEIC Part 4:</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentTalk.practicalListeningTip}
            </p>

            <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Từ vựng then chốt trong bài:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentTalk.keyVocabulary.map((kv) => (
                  <button
                    key={kv.word}
                    onClick={() => speak(kv.word, currentTalk.speaker.accent)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700/60 transition-colors"
                  >
                    <span className="font-bold">{kv.word}</span>
                    <span className="text-[10px] text-sky-400 font-mono">{kv.phonetic}</span>
                    <span className="text-slate-400">• {kv.meaning}</span>
                    <Volume2 className="w-3 h-3 text-purple-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-800 disabled:opacity-40 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Bài trước</span>
            </button>

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-600/30 transition-all hover:scale-105"
            >
              <span>{currentIndex + 1 < talks.length ? 'Bài tiếp theo' : 'Xem Kết Quả'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
