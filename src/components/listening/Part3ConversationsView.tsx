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
  Users,
  Table as TableIcon,
  Sparkles,
} from 'lucide-react';
import { Part3Conversation, ListeningAccent } from '@/types/listening';
import { useSpeech } from '@/hooks/useSpeech';
import { AudioPlayerBar } from './AudioPlayerBar';

interface Part3ConversationsViewProps {
  conversations: Part3Conversation[];
  onComplete?: (score: number, total: number) => void;
}

export function Part3ConversationsView({
  conversations,
  onComplete,
}: Part3ConversationsViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number | null>>({});
  const [showTranscript, setShowTranscript] = useState(false);
  const [activeTurnSpeaker, setActiveTurnSpeaker] = useState<string | null>(null);

  const { speak, stop, isPlaying } = useSpeech();

  const currentConv = conversations[currentIndex];

  useEffect(() => {
    stop();
    setShowTranscript(false);
    setActiveTurnSpeaker(null);
  }, [currentIndex, stop]);

  if (!currentConv) return null;

  const playFullDialogue = (accent: ListeningAccent = 'en-US', rate: number = 0.9) => {
    stop();
    setActiveTurnSpeaker('all');
    speak(currentConv.fullAudioText, accent, rate);
  };

  const playTurn = (speaker: string, text: string, accent: ListeningAccent = 'en-US') => {
    stop();
    setActiveTurnSpeaker(speaker);
    speak(`${speaker}: ${text}`, accent, 0.9);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (userAnswers[questionId] !== undefined && userAnswers[questionId] !== null) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  // Check if all 3 questions of current conversation are answered
  const areAllCurrentAnswered = currentConv.questions.every(
    (q) => userAnswers[q.id] !== undefined && userAnswers[q.id] !== null
  );

  const handleNext = () => {
    stop();
    if (currentIndex + 1 < conversations.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      let totalCorrect = 0;
      let totalQuestions = 0;
      conversations.forEach((conv) => {
        conv.questions.forEach((q) => {
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
          <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold uppercase tracking-wider">
            Part 3: Short Conversations
          </span>
          <span className="text-slate-400">
            Đoạn {currentIndex + 1} / {conversations.length} • {currentConv.topic}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {conversations.map((c, idx) => {
            const isFinished = c.questions.every((q) => userAnswers[q.id] !== undefined && userAnswers[q.id] !== null);
            let dotBg = 'bg-slate-800 text-slate-400';
            if (idx === currentIndex) dotBg = 'ring-2 ring-indigo-500 bg-indigo-500/30 text-white font-bold';
            else if (isFinished) dotBg = 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50';

            return (
              <button
                key={c.id}
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
        {/* Left Column (5 Cols): Speakers, Audio, Graphic, Script */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 shadow-xl">
            {/* Header with speaker tags */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold text-white">
                  {currentConv.isThreeWay ? 'Hội thoại 3 người (Three-way)' : 'Hội thoại 2 người'}
                </span>
              </div>
              <span className="text-[11px] text-slate-400">{currentConv.contextVi}</span>
            </div>

            {/* Speaker Badges */}
            <div className="flex flex-wrap gap-2">
              {currentConv.speakers.map((spk) => (
                <div
                  key={spk.name}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs"
                >
                  <span className="font-bold text-indigo-300">{spk.name}</span>
                  <span className="text-slate-400">({spk.role})</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-sky-300">
                    {spk.accent === 'en-US' ? '🇺🇸 US' : spk.accent === 'en-GB' ? '🇬🇧 UK' : '🇦🇺 AU'}
                  </span>
                </div>
              ))}
            </div>

            {/* Audio Player Bar */}
            <AudioPlayerBar
              isPlaying={isPlaying && activeTurnSpeaker === 'all'}
              onPlay={(accent, rate) => playFullDialogue(accent, rate)}
              onPause={() => stop()}
              onReplay={() => playFullDialogue()}
              label="Phát toàn bộ đoạn hội thoại"
            />

            {/* Optional Graphic / Table */}
            {currentConv.graphicInfo && (
              <div className="rounded-2xl bg-slate-950 border border-sky-500/30 p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
                  <TableIcon className="w-4 h-4" />
                  <span>{currentConv.graphicInfo.title}</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                        {currentConv.graphicInfo.headers.map((h, i) => (
                          <th key={i} className="py-1.5 px-2">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {currentConv.graphicInfo.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-900/50 transition-colors">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="py-1.5 px-2 text-slate-200">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {currentConv.graphicInfo.note && (
                  <p className="text-[11px] text-slate-400 italic">
                    {currentConv.graphicInfo.note}
                  </p>
                )}
              </div>
            )}

            {/* Transcript Toggle & Display */}
            <div className="pt-2 border-t border-slate-800 space-y-3">
              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800/80 text-xs font-semibold text-slate-300 border border-slate-800 transition-colors"
              >
                <span className="flex items-center gap-2">
                  {showTranscript ? <EyeOff className="w-4 h-4 text-indigo-400" /> : <Eye className="w-4 h-4 text-indigo-400" />}
                  <span>{showTranscript ? 'Ẩn lời thoại (Transcript)' : 'Xem lời thoại song ngữ (Transcript)'}</span>
                </span>
                <span className="text-[11px] text-slate-400">
                  {showTranscript ? 'Đang mở' : 'Tập trung nghe trước'}
                </span>
              </button>

              {showTranscript && (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {currentConv.dialogue.map((turn, tIdx) => (
                    <div
                      key={tIdx}
                      className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1.5 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-indigo-400 flex items-center gap-1.5">
                          <span>{turn.speaker}</span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            ({turn.speakerRole})
                          </span>
                        </span>
                        <button
                          onClick={() => playTurn(turn.speaker, turn.text, turn.accent)}
                          className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-sky-400 flex items-center justify-center transition-colors"
                          title="Nghe câu này"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-slate-200 leading-relaxed">{turn.text}</p>
                      <p className="text-slate-400 italic text-[11px]">{turn.textVi}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): 3 Questions */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-4">
            {currentConv.questions.map((q, qIndex) => {
              const selectedOpt = userAnswers[q.id];
              const isQAnswered = selectedOpt !== undefined && selectedOpt !== null;
              const isQCorrect = selectedOpt === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 space-y-3 shadow-md"
                >
                  {/* Question header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-indigo-400">
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
                      const optLabel = String.fromCharCode(65 + optIdx); // A, B, C, D
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
                              isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {optLabel}
                          </span>
                          <span className="leading-snug">{optText}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation when answered */}
                  {isQAnswered && (
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 space-y-1">
                      <span className="font-bold text-indigo-400 flex items-center gap-1">
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
          <div className="rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-950 border border-indigo-500/20 p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Mẹo nghe thực chiến TOEIC Part 3:</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentConv.practicalListeningTip}
            </p>

            {/* Key Vocab */}
            <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Từ vựng then chốt trong bài:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentConv.keyVocabulary.map((kv) => (
                  <button
                    key={kv.word}
                    onClick={() => speak(kv.word)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700/60 transition-colors"
                  >
                    <span className="font-bold">{kv.word}</span>
                    <span className="text-[10px] text-sky-400 font-mono">{kv.phonetic}</span>
                    <span className="text-slate-400">• {kv.meaning}</span>
                    <Volume2 className="w-3 h-3 text-indigo-400" />
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
              <span>Đoạn trước</span>
            </button>

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all hover:scale-105"
            >
              <span>{currentIndex + 1 < conversations.length ? 'Đoạn tiếp theo' : 'Xem Kết Quả'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
