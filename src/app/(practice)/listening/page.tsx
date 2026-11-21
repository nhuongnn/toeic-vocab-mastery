'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Volume2,
  ArrowLeft,
  Headphones,
  Sparkles,
  ArrowRight,
  Film,
  Zap,
  CheckCircle2,
  BookOpen,
  Award,
  Radio,
  FileQuestion,
  Layers,
} from 'lucide-react';
import { ListeningExercise } from '@/components/practice/ListeningExercise';
import { Part1PhotographsView } from '@/components/listening/Part1PhotographsView';
import { Part2QuestionResponseView } from '@/components/listening/Part2QuestionResponseView';
import { Part3ConversationsView } from '@/components/listening/Part3ConversationsView';
import { Part4ShortTalksView } from '@/components/listening/Part4ShortTalksView';
import { VideoListeningLabView } from '@/components/listening/VideoListeningLabView';
import { FullListeningSimulation } from '@/components/listening/FullListeningSimulation';
import {
  part1Questions,
  part2Questions,
  part3Conversations,
  part4ShortTalks,
  videoExercises,
  getListeningStats,
} from '@/data/listening';

type MainTab = 'audio' | 'video' | 'reflex';
type AudioSubTab = 'full' | 'part1' | 'part2' | 'part3' | 'part4';

export default function ListeningPage() {
  const [activeTab, setActiveTab] = useState<MainTab>('audio');
  const [audioSubTab, setAudioSubTab] = useState<AudioSubTab>('full');

  const stats = getListeningStats();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Status Badge */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Dashboard</span>
        </Link>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-semibold">
          <Volume2 className="w-3.5 h-3.5 text-sky-400" />
          <span>TOEIC Listening Master Hub • Audio & Video 2024-2025</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950/40 to-indigo-950/60 border border-slate-800 p-6 sm:p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Nội Dung Thực Chiến • Đề Thi Mới Nhất & Tình Huống Đời Thực</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Phòng Luyện Nghe Toàn Diện <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400">
              Audio & Video Full TOEIC Parts 1-4
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Hệ thống bài tập luyện nghe chuẩn hóa: mô phỏng 100% bẫy đề thi ETS mới nhất, hội thoại 3 người, câu hỏi biểu đồ, và video thực chiến từ giao tiếp công sở, sân bay, đàm phán hợp đồng đến đời sống thường ngày.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800/80 max-w-2xl">
            <div>
              <span className="text-xl sm:text-2xl font-black text-sky-400">
                {stats.totalAudioQuestions}
              </span>
              <span className="text-[11px] text-slate-400 block font-medium">Câu hỏi Audio chuẩn ETS</span>
            </div>

            <div>
              <span className="text-xl sm:text-2xl font-black text-rose-400">
                {stats.totalVideoExercises}
              </span>
              <span className="text-[11px] text-slate-400 block font-medium">Video tình huống thực tế</span>
            </div>

            <div>
              <span className="text-xl sm:text-2xl font-black text-emerald-400">
                100%
              </span>
              <span className="text-[11px] text-slate-400 block font-medium">Phân tích bẫy chi tiết</span>
            </div>

            <div>
              <span className="text-xl sm:text-2xl font-black text-purple-400">
                3 Giọng
              </span>
              <span className="text-[11px] text-slate-400 block font-medium">Mỹ 🇺🇸 • Anh 🇬🇧 • Úc 🇦🇺</span>
            </div>
          </div>
        </div>
      </div>

      {/* Link to Native Pronunciation & Listening Theory */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-950/40 via-slate-900 to-indigo-950/40 border border-sky-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Bí quyết nghe hiểu người bản xứ nói nhanh</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300">
                Đề thi mới
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Khám phá cơ chế nối âm (Pick it up), nuốt âm H (Tell-im), âm T vỗ (Water) và nhịp điệu Schwa /ə/ giúp bứt phá điểm số Listening.
            </p>
          </div>
        </div>
        <Link
          href="/pronunciation"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-sm transition-colors flex-shrink-0"
        >
          <span>Học Tư duy Phát âm</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Mode Navigation Tabs */}
      <div className="flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
        <button
          onClick={() => setActiveTab('audio')}
          className={`w-full sm:flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'audio'
              ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Headphones className="w-4 h-4" />
          <span>Full TOEIC Audio (Parts 1-4)</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950/60 text-sky-300">
            {stats.totalAudioQuestions} câu
          </span>
        </button>

        <button
          onClick={() => setActiveTab('video')}
          className={`w-full sm:flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'video'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Film className="w-4 h-4" />
          <span>Video Thực Chiến & Đời Thực</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950/60 text-rose-300">
            {stats.totalVideoExercises} Video
          </span>
        </button>

        <button
          onClick={() => setActiveTab('reflex')}
          className={`w-full sm:flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'reflex'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Phản Xạ Từ Vựng Tai Nghe</span>
        </button>
      </div>

      {/* CONTENT TAB 1: AUDIO FULL TOEIC (PARTS 1-4) */}
      {activeTab === 'audio' && (
        <div className="space-y-6">
          {/* Audio Sub-Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
            <button
              onClick={() => setAudioSubTab('full')}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                audioSubTab === 'full'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Thi Thử Toàn Diện (Part 1 - 4)</span>
            </button>

            <button
              onClick={() => setAudioSubTab('part1')}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                audioSubTab === 'part1'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Part 1: Photographs ({stats.totalPart1} câu)</span>
            </button>

            <button
              onClick={() => setAudioSubTab('part2')}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                audioSubTab === 'part2'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Part 2: Question & Response ({stats.totalPart2} câu)</span>
            </button>

            <button
              onClick={() => setAudioSubTab('part3')}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                audioSubTab === 'part3'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Part 3: Conversations ({stats.totalPart3Questions} câu)</span>
            </button>

            <button
              onClick={() => setAudioSubTab('part4')}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                audioSubTab === 'part4'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Part 4: Short Talks ({stats.totalPart4Questions} câu)</span>
            </button>
          </div>

          {/* Sub Tab Views */}
          {audioSubTab === 'full' && (
            <FullListeningSimulation onExit={() => setAudioSubTab('part1')} />
          )}

          {audioSubTab === 'part1' && (
            <Part1PhotographsView questions={part1Questions} />
          )}

          {audioSubTab === 'part2' && (
            <Part2QuestionResponseView questions={part2Questions} />
          )}

          {audioSubTab === 'part3' && (
            <Part3ConversationsView conversations={part3Conversations} />
          )}

          {audioSubTab === 'part4' && (
            <Part4ShortTalksView talks={part4ShortTalks} />
          )}
        </div>
      )}

      {/* CONTENT TAB 2: VIDEO THỰC CHIẾN */}
      {activeTab === 'video' && (
        <VideoListeningLabView exercises={videoExercises} />
      )}

      {/* CONTENT TAB 3: PHẢN XẠ TỪ VỰNG NHANH */}
      {activeTab === 'reflex' && (
        <div className="space-y-6">
          <div className="text-center max-w-lg mx-auto space-y-2">
            <h2 className="text-2xl font-black text-white tracking-tight">
              Luyện Tai Nghe Từ Vựng Nhanh
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Nghe âm thanh thực tế với các tốc độ khác nhau và nhận diện từ vựng tương ứng. Tăng tốc độ phản xạ nhận diện âm tiết.
            </p>
          </div>
          <ListeningExercise />
        </div>
      )}
    </div>
  );
}
