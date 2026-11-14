'use client';

import React, { useState } from 'react';
import { PronunciationTopic } from '@/types/pronunciation';
import {
  Brain,
  Zap,
  Headphones,
  MessageSquare,
  Sparkles,
  HelpCircle,
  Volume2,
  Volume1,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Play,
  RotateCcw,
} from 'lucide-react';
import { useSpeech } from '@/hooks/useSpeech';

interface PronunciationTopicCardProps {
  topic: PronunciationTopic;
}

type TabType = 'intuition' | 'rules' | 'comparison' | 'dialogue' | 'hacks' | 'quiz';

export function PronunciationTopicCard({ topic }: PronunciationTopicCardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('intuition');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<number, boolean>>({});
  const [playingItem, setPlayingItem] = useState<string | null>(null);

  const { speak } = useSpeech();

  const handlePlay = (text: string, rate: number = 0.9, itemId?: string) => {
    if (itemId) setPlayingItem(itemId);
    speak(text, 'en-US', rate);
    setTimeout(() => {
      setPlayingItem(null);
    }, 2000);
  };

  const handleSelectOption = (quizIndex: number, optionIndex: number) => {
    if (selectedAnswers[quizIndex] !== undefined) return;
    setSelectedAnswers((prev) => ({ ...prev, [quizIndex]: optionIndex }));
    setShowExplanations((prev) => ({ ...prev, [quizIndex]: true }));
  };

  const tabs: { key: TabType; label: string; icon: React.ElementType }[] = [
    { key: 'intuition', label: 'Tư duy bản xứ', icon: Brain },
    { key: 'rules', label: 'Quy tắc thực chiến', icon: Zap },
    { key: 'comparison', label: `Đối chiếu âm (${topic.comparisonPairs.length})`, icon: Headphones },
    { key: 'dialogue', label: 'Hội thoại đời thực', icon: MessageSquare },
    { key: 'hacks', label: 'Mẹo bắt từ nhanh', icon: Sparkles },
    { key: 'quiz', label: `Luyện tai (${topic.quiz.length})`, icon: HelpCircle },
  ];

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden transition-all hover:border-slate-700/80">
      {/* Header */}
      <div className="p-6 pb-4 border-b border-slate-800/80 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-500/10 border border-sky-500/20 text-sky-400">
              {topic.tag}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-300">
              {topic.difficulty}
            </span>
          </div>
          <span className="text-amber-400 text-xs font-semibold tracking-wider">
            Tần suất: {topic.frequency}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
          {topic.titleVi}
        </h3>
        <p className="text-xs text-sky-300/90 font-medium mt-0.5">{topic.title}</p>
        <p className="text-xs text-slate-400 mt-2 leading-relaxed">{topic.subtitle}</p>

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
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
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
        {/* TAB 1: INTUITION */}
        {activeTab === 'intuition' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-sky-950/20 border border-sky-500/20 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
                <Brain className="w-4 h-4" />
                <span>Cơ chế sinh học & Thói quen cử động miệng (Native Mindset)</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                {topic.nativeIntuition.coreMindset}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Cảm giác vật lý ở cơ miệng / họng:</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                  {topic.nativeIntuition.physicalFeeling}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-1.5">
                <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Tại sao người Việt thấy khó nghe/khó nói:</span>
                </div>
                <p className="text-xs text-rose-200/90 leading-relaxed whitespace-pre-line">
                  {topic.nativeIntuition.whyVietnameseStruggle}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RULES */}
        {activeTab === 'rules' && (
          <div className="space-y-4">
            {topic.rules.map((rule, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <h4 className="text-sm font-bold text-white">{rule.ruleTitle}</h4>
                </div>

                {rule.simpleFormula && (
                  <div className="p-3 rounded-lg bg-sky-950/30 border border-sky-500/30 font-mono text-xs text-sky-300 font-semibold overflow-x-auto whitespace-pre-line">
                    {rule.simpleFormula}
                  </div>
                )}

                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                  {rule.description}
                </p>

                <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-emerald-400 font-semibold">
                      Mẹo đặt lưỡi & Khẩu hình cực dễ:
                    </strong>
                    <span className="text-slate-300 mt-0.5 block">{rule.mouthShapeTip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: COMPARISON PAIRS */}
        {activeTab === 'comparison' && (
          <div className="space-y-3.5">
            <p className="text-xs text-slate-400">
              Nhấn nút loa để nghe đối chiếu giữa <strong>Đọc rời rạc</strong> vs <strong>Nói nối tự nhiên kiểu bản xứ</strong>:
            </p>

            <div className="space-y-3">
              {topic.comparisonPairs.map((pair, pIdx) => (
                <div
                  key={pIdx}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700/80 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                      <Headphones className="w-3.5 h-3.5" />
                      <span>{pair.label}</span>
                    </span>
                    <span className="text-xs text-slate-400">{pair.vi}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {/* Slow / Separate */}
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">
                          Đọc từng từ rời rạc
                        </span>
                        <span className="text-sm font-semibold text-slate-300">
                          {pair.slowText}
                        </span>
                      </div>
                      <button
                        onClick={() => handlePlay(pair.slowText, 0.75, `slow-${pIdx}`)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 transition-colors flex-shrink-0"
                        title="Nghe chậm từng từ"
                      >
                        <Volume1 className="w-3.5 h-3.5" />
                        <span>0.75x</span>
                      </button>
                    </div>

                    {/* Fast / Connected */}
                    <div className="p-3 rounded-xl bg-sky-950/30 border border-sky-500/30 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-sky-400 block">
                          Bản xứ nói nối âm
                        </span>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          <span>{pair.fastConnectedText}</span>
                          <span className="text-xs font-mono text-amber-300 px-1.5 py-0.2 rounded bg-amber-500/10 border border-amber-500/20">
                            {pair.phoneticSpelling}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handlePlay(pair.slowText, 1.0, `fast-${pIdx}`)}
                        className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1 shadow-sm transition-colors flex-shrink-0"
                        title="Nghe tốc độ chuẩn bản xứ"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Chuẩn</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 pl-1 border-t border-slate-800/60 pt-2">
                    💡 <strong>Cơ chế:</strong> {pair.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: DAILY DIALOGUE */}
        {activeTab === 'dialogue' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-400">
              Luyện nghe các câu thoại đàm thoại thực tế hàng ngày:
            </p>

            <div className="space-y-2.5">
              {topic.dailyDialogue.map((line, dIdx) => (
                <div
                  key={dIdx}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start justify-between gap-3 hover:border-slate-700/80 transition-all"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.2 rounded-md bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase">
                        {line.speaker}
                      </span>
                      <span className="text-xs font-mono text-amber-300/90">
                        "{line.connectedPhonetic}"
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-white">{line.en}</p>
                    <p className="text-xs text-slate-400">{line.vi}</p>
                  </div>

                  <button
                    onClick={() => handlePlay(line.en, 0.9, `diag-${dIdx}`)}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-sky-600 text-slate-300 hover:text-white transition-colors flex-shrink-0"
                    title="Nghe câu này"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: HACKS */}
        {activeTab === 'hacks' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-gradient-to-r from-sky-950/30 via-slate-950 to-indigo-950/30 border border-sky-500/30 space-y-3">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span>{topic.listeningHacks.hackTitle}</span>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="block text-amber-400 font-semibold">
                    Tai nghe thế nào để bắt đúng từ (Listening Hack):
                  </strong>
                  <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                    {topic.listeningHacks.hackContent}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="block text-emerald-400 font-semibold">
                    Dấu hiệu âm thanh cần tóm:
                  </strong>
                  <p className="text-slate-300">{topic.listeningHacks.howToCatchIt}</p>
                </div>

                <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/20 space-y-1">
                  <strong className="block text-indigo-300 font-semibold">
                    Ứng dụng trong bài thi TOEIC Listening:
                  </strong>
                  <p className="text-slate-300">{topic.listeningHacks.toeicApplication}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: QUIZ */}
        {activeTab === 'quiz' && (
          <div className="space-y-5">
            {topic.quiz.map((q, qIdx) => {
              const selected = selectedAnswers[qIdx];
              const isAnswered = selected !== undefined;
              const isCorrect = selected === q.correctAnswer;

              return (
                <div
                  key={qIdx}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {qIdx + 1}
                      </span>
                      <p className="text-sm font-medium text-slate-100 leading-relaxed">
                        {q.question}
                      </p>
                    </div>

                    <button
                      onClick={() => handlePlay(q.audioPrompt, 0.9, `quiz-${qIdx}`)}
                      className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors flex-shrink-0"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe mẫu</span>
                    </button>
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
                            <span>Chính xác! Tai nghe rất tốt!</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-400" />
                            <span>Chưa chính xác! Đáp án đúng là ({String.fromCharCode(65 + q.correctAnswer)}).</span>
                          </>
                        )}
                      </div>
                      <p className="text-slate-300 mt-1">{q.explanation}</p>
                      {q.listeningTip && (
                        <p className="text-amber-300/90 font-medium pt-1 border-t border-slate-800/60">
                          🎯 {q.listeningTip}
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
