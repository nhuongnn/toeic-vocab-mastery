'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Film,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Sparkles,
  HelpCircle,
  Clock,
  ExternalLink,
  ChevronRight,
  Headphones,
  FileText,
  Volume2,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { VideoListeningExercise, VideoDictationTask } from '@/types/listening';
import { useSpeech } from '@/hooks/useSpeech';

interface VideoListeningLabViewProps {
  exercises: VideoListeningExercise[];
}

export function VideoListeningLabView({ exercises }: VideoListeningLabViewProps) {
  const [selectedId, setSelectedId] = useState<string>(exercises[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'quiz' | 'dictation' | 'transcript'>('quiz');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({});
  const [dictationInputs, setDictationInputs] = useState<Record<string, string>>({});
  const [dictationResults, setDictationResults] = useState<Record<string, boolean | null>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [currentTimestamp, setCurrentTimestamp] = useState<number | null>(null);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const { speak, stop } = useSpeech();

  const currentExercise = exercises.find((e) => e.id === selectedId) || exercises[0];

  // Stop video iframe safely
  const stopIframeVideo = useCallback(() => {
    if (iframeRef.current) {
      try {
        iframeRef.current.contentWindow?.postMessage(
          JSON.stringify({ event: 'command', func: 'stopVideo', args: [] }),
          '*'
        );
        iframeRef.current.contentWindow?.postMessage(
          JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
          '*'
        );
      } catch {
        // Ignore cross origin
      }
    }
  }, []);

  // Jump video to specific second
  const jumpToTime = (seconds: number) => {
    setCurrentTimestamp(seconds);
    setIsPlayingVideo(true);
    if (iframeRef.current) {
      iframeRef.current.src = `https://www.youtube.com/embed/${currentExercise.youtubeId}?autoplay=1&start=${seconds}&rel=0&enablejsapi=1`;
    }
  };

  useEffect(() => {
    stopIframeVideo();
    stop();
    setIsPlayingVideo(false);
    setCurrentTimestamp(null);
  }, [selectedId, stopIframeVideo, stop]);

  if (!currentExercise) return null;

  // Quiz Handling
  const handleSelectQuiz = (questionId: string, optIdx: number) => {
    if (quizAnswers[questionId] !== undefined && quizAnswers[questionId] !== null) return;
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optIdx }));
  };

  // Dictation Check
  const checkDictationAnswer = (task: VideoDictationTask) => {
    const userInput = (dictationInputs[task.id] || '').trim().toLowerCase().replace(/[.,!?;:'"]/g, '');
    const targetClean = task.blankText.trim().toLowerCase().replace(/[.,!?;:'"]/g, '');

    const isMatch = userInput === targetClean;
    setDictationResults((prev) => ({ ...prev, [task.id]: isMatch }));
  };

  return (
    <div className="space-y-8">
      {/* Scenario Navigation Tabs / Horizontal Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Film className="w-4 h-4 text-rose-500" />
            <span>Chọn Tình Huống Video Thực Chiến:</span>
          </h2>
          <span className="text-xs text-slate-400">
            {exercises.length} kịch bản chuẩn giao tiếp & đề thi ETS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {exercises.map((ex, idx) => {
            const isSelected = ex.id === selectedId;
            return (
              <button
                key={ex.id}
                onClick={() => setSelectedId(ex.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2.5 ${
                  isSelected
                    ? 'bg-rose-950/30 border-rose-500/80 shadow-lg shadow-rose-950/40 ring-1 ring-rose-500/50'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-rose-400">
                      Scenario {idx + 1}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {ex.level}
                    </span>
                  </div>
                  <h3
                    className={`text-xs font-bold line-clamp-1 ${
                      isSelected ? 'text-white' : 'text-slate-200'
                    }`}
                  >
                    {ex.titleVi}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                    {ex.category}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{Math.floor(ex.durationSeconds / 60)}m {ex.durationSeconds % 60}s</span>
                  </span>
                  <span
                    className={`font-semibold flex items-center gap-0.5 ${
                      isSelected ? 'text-rose-400' : 'text-slate-400'
                    }`}
                  >
                    <span>Luyện ngay</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Video & Interactive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (6 Cols): Embedded Video & Real-world context */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl aspect-video group">
            <iframe
              ref={iframeRef}
              src={`https://www.youtube.com/embed/${currentExercise.youtubeId}?start=${
                currentTimestamp ?? currentExercise.startTimestamp
              }&end=${currentExercise.endTimestamp}&rel=0&enablejsapi=1`}
              title={currentExercise.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Quick Jump Buttons to Specific Timestamps */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Tua nhanh phân cảnh:</span>
            {currentExercise.fullTranscript.map((t, idx) => {
              const [min, sec] = t.time.split(':').map(Number);
              const totalSec = (min || 0) * 60 + (sec || 0);
              return (
                <button
                  key={idx}
                  onClick={() => jumpToTime(totalSec)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-rose-500/60 transition-colors flex items-center gap-1"
                >
                  <Play className="w-2.5 h-2.5 fill-rose-500 text-rose-500" />
                  <span>{t.time}</span>
                  <span className="text-[10px] text-slate-400">({t.speaker.split(' ')[0]})</span>
                </button>
              );
            })}
          </div>

          {/* Real-World Context Card */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-rose-400 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Ngữ Cảnh Thực Tế & Ứng Dụng TOEIC:</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {currentExercise.realWorldContext}
            </p>
          </div>

          {/* Native Speech Hacks Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 border border-indigo-500/30 space-y-3 text-xs">
            <div className="flex items-center gap-2 text-indigo-400 font-bold">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Bí Quyết Bắt Âm Người Bản Xứ Nói Nhanh (Native Speech Hacks):</span>
            </div>

            <div className="space-y-2.5">
              {currentExercise.nativeSpeechHacks.map((hack, hIdx) => (
                <div key={hIdx} className="space-y-1 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                  <div className="font-bold text-slate-200 flex items-center justify-between">
                    <span>{hack.hackTitle}</span>
                    <span className="font-mono text-[10px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded">
                      {hack.pattern}
                    </span>
                  </div>
                  <p className="text-slate-300">{hack.realWorldUsage}</p>
                  <p className="text-sky-300 text-[11px] italic">💡 {hack.listeningSecret}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (6 Cols): Interactive Tabs (Quiz / Dictation / Transcript) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Tab Navigation */}
          <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex-1 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'quiz'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>1. Trắc Nghiệm Nghe Hiểu</span>
            </button>

            <button
              onClick={() => setActiveTab('dictation')}
              className={`flex-1 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'dictation'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>2. Nghe Chép Chính Tả</span>
            </button>

            <button
              onClick={() => setActiveTab('transcript')}
              className={`flex-1 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'transcript'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>3. Lời Thoại Song Ngữ</span>
            </button>
          </div>

          {/* TAB 1: COMPREHENSION QUIZ */}
          {activeTab === 'quiz' && (
            <div className="space-y-4">
              {currentExercise.comprehensionQuestions.map((q, qIndex) => {
                const selectedOpt = quizAnswers[q.id];
                const isAnswered = selectedOpt !== undefined && selectedOpt !== null;
                const isCorrect = selectedOpt === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-rose-400">
                            Câu {qIndex + 1}:
                          </span>
                          <span className="text-xs font-semibold text-white">
                            {q.questionEn}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 italic pl-5 mt-0.5">
                          {q.questionVi}
                        </p>
                      </div>

                      {isAnswered && (
                        <span>
                          {isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <XCircle className="w-5 h-5 text-rose-400" />
                          )}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 pt-1">
                      {q.options.map((opt, optIdx) => {
                        const optLabel = String.fromCharCode(65 + optIdx);
                        const isThisSelected = selectedOpt === optIdx;
                        const isThisCorrect = optIdx === q.correctAnswer;

                        let style = 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300';
                        if (isAnswered) {
                          if (isThisCorrect) {
                            style = 'bg-emerald-950/40 border-emerald-500 text-emerald-300';
                          } else if (isThisSelected && !isThisCorrect) {
                            style = 'bg-rose-950/40 border-rose-500 text-rose-300';
                          } else {
                            style = 'bg-slate-950/30 border-slate-900 text-slate-500 opacity-50';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isAnswered}
                            onClick={() => handleSelectQuiz(q.id, optIdx)}
                            className={`w-full p-2.5 rounded-2xl border text-left text-xs transition-all flex items-center gap-3 ${style}`}
                          >
                            <span
                              className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                                isThisSelected ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300'
                              }`}
                            >
                              {optLabel}
                            </span>
                            <span className="leading-snug">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 space-y-1">
                        <span className="font-bold text-rose-400 flex items-center gap-1">
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
          )}

          {/* TAB 2: INTERACTIVE DICTATION */}
          {activeTab === 'dictation' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-rose-500/30 text-xs text-slate-300 space-y-1">
                <span className="font-bold text-rose-400">Hướng dẫn Nghe Chép Chính Tả (Dictation):</span>
                <p className="text-slate-400">
                  Lắng nghe đoạn video tại giây tương ứng, sau đó gõ chính xác cụm từ bản xứ còn thiếu vào ô trống. Nhấn "Kiểm tra" để đối chiếu kết quả.
                </p>
              </div>

              {currentExercise.dictationTasks.map((task, tIndex) => {
                const userVal = dictationInputs[task.id] || '';
                const result = dictationResults[task.id];
                const isHintOpen = showHints[task.id];

                return (
                  <div
                    key={task.id}
                    className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3.5 shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-rose-500/20 text-rose-300">
                          Đoạn {tIndex + 1}
                        </span>
                        <span className="text-xs font-bold text-white">{task.segmentTitle}</span>
                      </div>

                      <button
                        onClick={() => jumpToTime(task.audioTimestamp)}
                        className="inline-flex items-center gap-1 text-[11px] text-rose-400 hover:text-rose-300 bg-rose-500/10 px-2.5 py-1 rounded-lg transition-colors font-medium"
                      >
                        <Play className="w-3 h-3 fill-rose-400" />
                        <span>Nghe tại {task.audioTimestamp}s</span>
                      </button>
                    </div>

                    {/* Sentence with blank */}
                    <div className="text-xs text-slate-200 leading-relaxed bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                      <p>
                        <span>"{task.contextLeadIn} "</span>
                        <span className="font-bold text-rose-400 underline decoration-dashed">
                          [ . . . {task.blankText.split(' ').length} từ . . . ]
                        </span>
                        <span>" {task.contextFollowUp}"</span>
                      </p>

                      {/* Input field */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          value={userVal}
                          onChange={(e) =>
                            setDictationInputs((prev) => ({ ...prev, [task.id]: e.target.value }))
                          }
                          placeholder="Gõ cụm từ nghe được vào đây..."
                          className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-rose-500 font-medium"
                        />

                        <button
                          onClick={() => checkDictationAnswer(task)}
                          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors"
                        >
                          Kiểm tra
                        </button>
                      </div>
                    </div>

                    {/* Feedback if checked */}
                    {result !== undefined && result !== null && (
                      <div
                        className={`p-3 rounded-2xl text-xs space-y-1.5 ${
                          result
                            ? 'bg-emerald-950/50 border border-emerald-500 text-emerald-300'
                            : 'bg-rose-950/50 border border-rose-500 text-rose-300'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold">
                          <span>{result ? '🎉 Hoàn toàn chính xác!' : '❌ Chưa chính xác!'}</span>
                          <span className="font-mono text-[11px] text-slate-300">
                            Đáp án: "{task.blankText}"
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 font-mono">Phiên âm IPA: {task.ipa}</p>
                        <p className="text-[11px] text-slate-400">💡 {task.speechTipVi}</p>
                      </div>
                    )}

                    {/* Hint toggle */}
                    <div className="flex items-center justify-between text-[11px]">
                      <button
                        onClick={() =>
                          setShowHints((prev) => ({ ...prev, [task.id]: !prev[task.id] }))
                        }
                        className="text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1"
                      >
                        <HelpCircle className="w-3 h-3 text-amber-400" />
                        <span>{isHintOpen ? 'Ẩn gợi ý' : 'Xem gợi ý từ'}</span>
                      </button>

                      {isHintOpen && (
                        <span className="text-amber-300 font-mono font-medium">
                          {task.hint}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 3: BILINGUAL TRANSCRIPT */}
          {activeTab === 'transcript' && (
            <div className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-md max-h-[550px] overflow-y-auto">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Bấm vào mốc thời gian để xem video tương ứng:
              </span>

              <div className="space-y-3">
                {currentExercise.fullTranscript.map((line, lIdx) => {
                  const [min, sec] = line.time.split(':').map(Number);
                  const totalSec = (min || 0) * 60 + (sec || 0);

                  return (
                    <div
                      key={lIdx}
                      className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1 text-xs hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-rose-400">{line.speaker}</span>
                        <button
                          onClick={() => jumpToTime(totalSec)}
                          className="inline-flex items-center gap-1 text-[11px] text-sky-400 hover:text-sky-300 bg-sky-500/10 px-2 py-0.5 rounded font-mono"
                        >
                          <Play className="w-2.5 h-2.5 fill-sky-400" />
                          <span>{line.time}</span>
                        </button>
                      </div>
                      <p className="text-slate-200 leading-relaxed">{line.en}</p>
                      <p className="text-slate-400 italic text-[11px]">{line.vi}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
