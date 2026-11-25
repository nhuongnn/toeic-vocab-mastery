'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Film,
  Play,
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
  Zap,
  Filter,
  Tag,
} from 'lucide-react';
import { VideoListeningExercise, VideoDictationTask } from '@/types/listening';
import { useSpeech } from '@/hooks/useSpeech';

interface VideoListeningLabViewProps {
  exercises: VideoListeningExercise[];
}

const categoryLabels: Record<string, { labelVi: string; color: string }> = {
  all: { labelVi: 'Tất cả chủ đề', color: 'text-slate-300 border-slate-700 bg-slate-800/80' },
  'Office & Administration': {
    labelVi: 'Văn phòng & Quản lý',
    color: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
  },
  'Travel & Transport': {
    labelVi: 'Du lịch & Sân bay',
    color: 'text-sky-400 border-sky-500/30 bg-sky-500/10',
  },
  'Personnel & HR': {
    labelVi: 'Nhân sự & Phỏng vấn',
    color: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
  },
  'Dining & Hospitality': {
    labelVi: 'Ẩm thực & Nhà hàng',
    color: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  },
  'Communications & Media': {
    labelVi: 'Dịch vụ & Khiếu nại',
    color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
  },
  'Marketing & Sales': {
    labelVi: 'Marketing & Bán hàng',
    color: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
  },
  'Purchasing & Contracts': {
    labelVi: 'Mua sắm & Hợp đồng',
    color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  },
  'Finance & Budgeting': {
    labelVi: 'Tài chính & Ngân sách',
    color: 'text-teal-400 border-teal-500/30 bg-teal-500/10',
  },
  'Technology & IT': {
    labelVi: 'Công nghệ & IT Support',
    color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
  },
};

export function VideoListeningLabView({ exercises }: VideoListeningLabViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedId, setSelectedId] = useState<string>(exercises[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'quiz' | 'dictation' | 'transcript'>('quiz');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({});
  const [dictationInputs, setDictationInputs] = useState<Record<string, string>>({});
  const [dictationResults, setDictationResults] = useState<Record<string, boolean | null>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});
  const [, setIsPlayingVideo] = useState(false);
  const [currentTimestamp, setCurrentTimestamp] = useState<number | null>(null);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const { speak, stop } = useSpeech();

  // Extract unique categories from exercises
  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    exercises.forEach((e) => {
      if (e.category) set.add(e.category);
    });
    return ['all', ...Array.from(set)];
  }, [exercises]);

  // Filter exercises by category
  const filteredExercises = useMemo(() => {
    if (selectedCategory === 'all') return exercises;
    return exercises.filter(
      (e) => e.category === selectedCategory || e.categoryId === selectedCategory
    );
  }, [exercises, selectedCategory]);

  // Keep selectedId valid when filter changes
  useEffect(() => {
    if (filteredExercises.length > 0 && !filteredExercises.some((e) => e.id === selectedId)) {
      setSelectedId(filteredExercises[0].id);
    }
  }, [filteredExercises, selectedId]);

  const currentExercise =
    exercises.find((e) => e.id === selectedId) || filteredExercises[0] || exercises[0];

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

  // Jump video to specific second smoothly via YouTube IFrame Player API
  const jumpToTime = useCallback((seconds: number) => {
    setCurrentTimestamp(seconds);
    setIsPlayingVideo(true);
    const win = iframeRef.current?.contentWindow;
    if (win) {
      try {
        win.postMessage(
          JSON.stringify({ event: 'command', func: 'seekTo', args: [seconds, true] }),
          '*'
        );
        win.postMessage(
          JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
          '*'
        );
      } catch {
        // Ignore cross origin
      }
    }
  }, []);

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

  const currentCatMeta = categoryLabels[currentExercise.category] || {
    labelVi: currentExercise.category,
    color: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
  };

  return (
    <div className="space-y-8">
      {/* Category Filter Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Filter className="w-4 h-4 text-rose-500" />
            <span>Lọc Tình Huống Theo Chủ Đề:</span>
          </h2>
          <span className="text-xs text-slate-400">
            {filteredExercises.length} / {exercises.length} kịch bản chuẩn ETS
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {availableCategories.map((catKey) => {
            const isCatActive = selectedCategory === catKey;
            const meta = categoryLabels[catKey] || {
              labelVi: catKey,
              color: 'text-slate-300 border-slate-700 bg-slate-800',
            };
            const count =
              catKey === 'all'
                ? exercises.length
                : exercises.filter((e) => e.category === catKey).length;

            return (
              <button
                key={catKey}
                onClick={() => setSelectedCategory(catKey)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                  isCatActive
                    ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-600/30'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span>{meta.labelVi}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isCatActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scenario Navigation Tabs / Horizontal Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Film className="w-4 h-4 text-rose-500" />
            <span>Chọn Video Thực Chiến:</span>
          </h2>
          <span className="text-xs text-rose-400 font-medium">
            Đang học: {currentExercise.titleVi}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredExercises.map((ex, idx) => {
            const isSelected = ex.id === selectedId;
            const exCatMeta = categoryLabels[ex.category] || {
              labelVi: ex.category,
              color: 'text-slate-400 border-slate-700 bg-slate-800',
            };

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
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${exCatMeta.color}`}
                    >
                      {exCatMeta.labelVi}
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
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 font-medium">
                    {ex.title}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>
                      {Math.floor(ex.durationSeconds / 60)}m {ex.durationSeconds % 60}s
                    </span>
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
          {/* Active Scenario Header Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-rose-950/20 to-slate-900 border border-slate-800 flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${currentCatMeta.color}`}
                >
                  {currentCatMeta.labelVi}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                  {currentExercise.level}
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Chuẩn đề ETS</span>
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-black text-white leading-tight">
                {currentExercise.titleVi}
              </h1>
              <p className="text-xs text-slate-400">{currentExercise.title}</p>
            </div>

            <a
              href={`https://www.youtube.com/watch?v=${currentExercise.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1 flex-shrink-0"
              title="Mở video trực tiếp trên YouTube"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">YouTube</span>
            </a>
          </div>

          {/* Embedded YouTube Player */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl aspect-video group">
            <iframe
              key={currentExercise.id}
              ref={iframeRef}
              src={`https://www.youtube.com/embed/${currentExercise.youtubeId}?start=${currentExercise.startTimestamp}&end=${currentExercise.endTimestamp}&rel=0&enablejsapi=1`}
              title={currentExercise.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Quick Jump Buttons to Specific Timestamps */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Tua nhanh mốc hội thoại:</span>
            {currentExercise.fullTranscript.map((t, idx) => {
              const [min, sec] = t.time.split(':').map(Number);
              const totalSec = (min || 0) * 60 + (sec || 0);
              const isCurrent = currentTimestamp === totalSec;
              return (
                <button
                  key={idx}
                  onClick={() => jumpToTime(totalSec)}
                  className={`px-2.5 py-1 rounded-lg border transition-colors flex items-center gap-1 ${
                    isCurrent
                      ? 'bg-rose-600/20 border-rose-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-rose-500/60'
                  }`}
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
              <span>Bối Cảnh Thực Tế & Ứng Dụng Đề Thi TOEIC:</span>
            </div>
            <p className="text-slate-300 leading-relaxed">{currentExercise.realWorldContext}</p>
            <p className="text-slate-400 text-[11px] leading-relaxed italic border-t border-slate-800/80 pt-2 mt-2">
              📌 {currentExercise.scenarioDescriptionVi}
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
                <div
                  key={hIdx}
                  className="space-y-1 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80"
                >
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
                          <button
                            onClick={() => speak(q.questionEn, 'en-US', 0.9)}
                            className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                            title="Nghe phát âm câu hỏi"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
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

                        let style =
                          'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300';
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
                                isThisSelected
                                  ? 'bg-rose-600 text-white'
                                  : 'bg-slate-800 text-slate-300'
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
                <span className="font-bold text-rose-400">
                  Hướng dẫn Nghe Chép Chính Tả (Dictation):
                </span>
                <p className="text-slate-400">
                  Lắng nghe đoạn video tại giây tương ứng hoặc bấm "Nghe Audio mẫu", sau đó gõ
                  chính xác cụm từ bản xứ còn thiếu vào ô trống. Nhấn "Kiểm tra" để đối chiếu kết
                  quả.
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
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-rose-500/20 text-rose-300">
                          Đoạn {tIndex + 1}
                        </span>
                        <span className="text-xs font-bold text-white">
                          {task.segmentTitle}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => jumpToTime(task.audioTimestamp)}
                          className="inline-flex items-center gap-1 text-[11px] text-sky-400 hover:text-sky-300 bg-sky-500/10 px-2 py-1 rounded-lg transition-colors font-medium"
                          title="Xem mốc thời gian trên video"
                        >
                          <Play className="w-3 h-3 fill-sky-400" />
                          <span>Video {task.audioTimestamp}s</span>
                        </button>

                        <button
                          onClick={() =>
                            speak(
                              `${task.contextLeadIn} ${task.blankText} ${task.contextFollowUp}`,
                              'en-US',
                              0.9
                            )
                          }
                          className="inline-flex items-center gap-1 text-[11px] text-rose-400 hover:text-rose-300 bg-rose-500/10 px-2 py-1 rounded-lg transition-colors font-medium"
                          title="Phát âm câu hoàn chỉnh bằng giọng đọc chuẩn (TTS)"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>Nghe Audio mẫu</span>
                        </button>
                      </div>
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
                        <p className="text-[11px] text-slate-300 font-mono">
                          Phiên âm IPA: {task.ipa}
                        </p>
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
              <div className="flex items-center justify-between text-xs text-slate-400 pb-1 border-b border-slate-800">
                <span className="font-bold uppercase tracking-wider">
                  Kịch Bản Hội Thoại Song Ngữ:
                </span>
                <span className="text-[11px]">Bấm Play để nhảy video, hoặc biểu tượng Loa để nghe câu</span>
              </div>

              <div className="space-y-3">
                {currentExercise.fullTranscript.map((line, lIdx) => {
                  const [min, sec] = line.time.split(':').map(Number);
                  const totalSec = (min || 0) * 60 + (sec || 0);
                  const isCurrent = currentTimestamp === totalSec;

                  return (
                    <div
                      key={lIdx}
                      className={`p-3 rounded-2xl border space-y-1.5 text-xs transition-colors ${
                        isCurrent
                          ? 'bg-rose-950/30 border-rose-500/70'
                          : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-rose-400 flex items-center gap-1.5">
                          <Tag className="w-3 h-3 text-rose-500" />
                          <span>{line.speaker}</span>
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => jumpToTime(totalSec)}
                            className="inline-flex items-center gap-1 text-[11px] text-sky-400 hover:text-sky-300 bg-sky-500/10 px-2 py-0.5 rounded font-mono transition-colors"
                            title="Nhảy đến phân cảnh này trong video"
                          >
                            <Play className="w-2.5 h-2.5 fill-sky-400" />
                            <span>{line.time}</span>
                          </button>

                          <button
                            onClick={() => speak(line.en, 'en-US', 0.9)}
                            className="inline-flex items-center gap-1 text-[11px] text-rose-400 hover:text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded transition-colors"
                            title="Nghe phát âm chuẩn giọng bản xứ (TTS)"
                          >
                            <Volume2 className="w-3 h-3" />
                            <span>Audio</span>
                          </button>
                        </div>
                      </div>
                      <p className="text-slate-200 leading-relaxed font-medium">{line.en}</p>
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
