'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Search,
  Volume2,
  Bookmark,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Brain,
  MessageSquare,
  BookOpen,
  Zap,
  ArrowRight,
  Copy,
  Check,
  AlertTriangle,
  Lightbulb,
  Layers,
  Flame,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { useSpeech } from '@/hooks/useSpeech';
import {
  sentencePatterns,
  collocations,
  idioms,
  practiceQuizzes,
  patternsStats,
} from '@/data/patterns';
import {
  SentencePattern,
  Collocation,
  Idiom,
  PatternCategory,
  CollocationType,
  IdiomCategory,
} from '@/types/patterns';

type MainTab = 'patterns' | 'collocations' | 'idioms' | 'quiz';

export default function PatternsPage() {
  const [activeTab, setActiveTab] = useState<MainTab>('patterns');
  const [searchQuery, setSearchQuery] = useState('');
  const [patternFilter, setPatternFilter] = useState<PatternCategory | 'all'>('all');
  const [collocationFilter, setCollocationFilter] = useState<CollocationType | 'all'>('all');
  const [idiomFilter, setIdiomFilter] = useState<IdiomCategory | 'all'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});

  const { speak } = useSpeech();

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleQuizAnswer = (quizId: string, optionIdx: number) => {
    if (selectedAnswers[quizId] !== undefined) return;
    setSelectedAnswers((prev) => ({ ...prev, [quizId]: optionIdx }));
    setShowExplanations((prev) => ({ ...prev, [quizId]: true }));
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowExplanations({});
  };

  // Filtered Sentence Patterns
  const filteredPatterns = useMemo(() => {
    return sentencePatterns.filter((item) => {
      const matchCat = patternFilter === 'all' || item.category === patternFilter;
      if (!matchCat) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.titleVi.toLowerCase().includes(q) ||
        item.patternFormula.toLowerCase().includes(q) ||
        item.nativeMindset.toLowerCase().includes(q) ||
        item.examples.some((ex) => ex.en.toLowerCase().includes(q) || ex.vi.toLowerCase().includes(q))
      );
    });
  }, [patternFilter, searchQuery]);

  // Filtered Collocations
  const filteredCollocations = useMemo(() => {
    return collocations.filter((item) => {
      const matchType = collocationFilter === 'all' || item.type === collocationFilter;
      if (!matchType) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.phrase.toLowerCase().includes(q) ||
        item.phraseVi.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        item.examples.some((ex) => ex.en.toLowerCase().includes(q) || ex.vi.toLowerCase().includes(q))
      );
    });
  }, [collocationFilter, searchQuery]);

  // Filtered Idioms
  const filteredIdioms = useMemo(() => {
    return idioms.filter((item) => {
      const matchCat = idiomFilter === 'all' || item.category === idiomFilter;
      if (!matchCat) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.idiom.toLowerCase().includes(q) ||
        item.idiomVi.toLowerCase().includes(q) ||
        item.figurativeMeaning.toLowerCase().includes(q) ||
        item.examples.some((ex) => ex.en.toLowerCase().includes(q) || ex.vi.toLowerCase().includes(q))
      );
    });
  }, [idiomFilter, searchQuery]);

  // Quiz Score
  const quizScore = useMemo(() => {
    let correct = 0;
    practiceQuizzes.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  }, [selectedAnswers]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Hero Header */}
      <section className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/70 to-purple-950/60 border border-slate-800 p-8 sm:p-12 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Tinh hoa Ngôn ngữ Thực chiến • Chuẩn Bản Xứ • Ăn Điểm TOEIC 700+</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Mẫu câu Giao tiếp, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
              Collocations & Idioms
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Học cách kết hợp từ tự nhiên của người bản xứ. Không dịch từ-sang-từ vụng về, xóa tan các lỗi sai kinh điển và làm chủ phản xạ giao tiếp công sở, đàm phán và bài thi TOEIC.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-3 text-xs text-slate-400 border-t border-slate-800/80">
            <div>
              <strong className="text-white text-lg font-black">{patternsStats.totalSentencePatterns}</strong>
              <span className="ml-1.5 font-medium">Mẫu câu cốt lõi</span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div>
              <strong className="text-emerald-400 text-lg font-black">{patternsStats.totalCollocations}</strong>
              <span className="ml-1.5 font-medium">Collocations vàng</span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div>
              <strong className="text-pink-400 text-lg font-black">{patternsStats.totalIdioms}</strong>
              <span className="ml-1.5 font-medium">Thành ngữ bản xứ</span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div>
              <strong className="text-amber-400 text-lg font-black">{patternsStats.totalQuizzes}</strong>
              <span className="ml-1.5 font-medium">Câu hỏi phản xạ</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Tabs Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar pb-1 sm:pb-0">
          <button
            onClick={() => setActiveTab('patterns')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === 'patterns'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Mẫu câu Giao tiếp & TOEIC ({sentencePatterns.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('collocations')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === 'collocations'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Collocations Thực chiến ({collocations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('idioms')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === 'idioms'
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>Idioms & Thành ngữ ({idioms.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Luyện tập Phản xạ ({practiceQuizzes.length})</span>
          </button>
        </div>

        {/* Search Input */}
        {activeTab !== 'quiz' && (
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm mẫu câu, cụm từ..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
        )}
      </div>

      {/* 3. Sub-Category Filter Chips */}
      {activeTab === 'patterns' && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-[11px] font-semibold text-slate-400 mr-1 uppercase tracking-wider">Chủ đề:</span>
          {(
            [
              { key: 'all', label: 'Tất cả' },
              { key: 'email-diplomacy', label: 'Email & Thư từ' },
              { key: 'meetings', label: 'Họp hành & Đàm phán' },
              { key: 'toeic-workplace', label: 'TOEIC & Công sở' },
              { key: 'daily', label: 'Giao tiếp hàng ngày' },
              { key: 'socializing', label: 'Giao lưu & Xã giao' },
            ] as const
          ).map((filter) => (
            <button
              key={filter.key}
              onClick={() => setPatternFilter(filter.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                patternFilter === filter.key
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}

      {activeTab === 'collocations' && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-[11px] font-semibold text-slate-400 mr-1 uppercase tracking-wider">Cấu trúc:</span>
          {(
            [
              { key: 'all', label: 'Tất cả' },
              { key: 'verb-noun', label: 'Động từ + Danh từ' },
              { key: 'adjective-noun', label: 'Tính từ + Danh từ' },
              { key: 'verb-preposition', label: 'Giới từ & Cụm liên kết' },
              { key: 'adverb-adjective', label: 'Phó từ + Tính từ/Động từ' },
            ] as const
          ).map((filter) => (
            <button
              key={filter.key}
              onClick={() => setCollocationFilter(filter.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                collocationFilter === filter.key
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}

      {activeTab === 'idioms' && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-[11px] font-semibold text-slate-400 mr-1 uppercase tracking-wider">Phân loại:</span>
          {(
            [
              { key: 'all', label: 'Tất cả' },
              { key: 'workplace', label: 'Công sở & Hợp tác' },
              { key: 'strategy', label: 'Chiến lược & Chất lượng' },
              { key: 'daily', label: 'Đời sống & Giao tiếp' },
              { key: 'relationships', label: 'Mối quan hệ & Xã giao' },
            ] as const
          ).map((filter) => (
            <button
              key={filter.key}
              onClick={() => setIdiomFilter(filter.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                idiomFilter === filter.key
                  ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}

      {/* 4. TAB 1: SENTENCE PATTERNS */}
      {activeTab === 'patterns' && (
        <div className="grid grid-cols-1 gap-6">
          {filteredPatterns.length === 0 ? (
            <div className="text-center py-12 rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-400">
              Không tìm thấy mẫu câu nào phù hợp với từ khóa & bộ lọc.
            </div>
          ) : (
            filteredPatterns.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden hover:border-indigo-500/40 transition-all space-y-5 p-6"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                        {item.categoryVi}
                      </span>
                      <span className="text-amber-400 text-xs font-semibold">Tần suất: {item.frequency}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">{item.titleVi}</h3>
                    <p className="text-xs text-indigo-300 font-medium mt-0.5">{item.title}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(item.patternFormula, item.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-all"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Đã chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Sao chép công thức</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Formula Highlight Box */}
                <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 flex items-start gap-3">
                  <Zap className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] uppercase tracking-wider font-bold text-indigo-400">
                      Cấu trúc / Công thức mẫu
                    </div>
                    <code className="text-sm font-semibold text-indigo-200 mt-1 block">
                      {item.patternFormula}
                    </code>
                  </div>
                </div>

                {/* Native Mindset & When to use */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                      <Brain className="w-4 h-4" />
                      <span>Tư duy Bản xứ (Tại sao họ nói như vậy?)</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{item.nativeMindset}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-sky-400">
                      <Lightbulb className="w-4 h-4" />
                      <span>Thời điểm nên sử dụng</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{item.whenToUse}</p>
                  </div>
                </div>

                {/* Real-World Examples */}
                <div className="space-y-2.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-indigo-400" />
                    <span>Ví dụ thực tế hàng ngày & công sở</span>
                  </div>
                  <div className="space-y-2">
                    {item.examples.map((ex, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/70 hover:border-slate-700 transition-all flex items-start justify-between gap-3 group"
                      >
                        <div className="space-y-1 flex-1">
                          <p className="text-sm font-semibold text-white group-hover:text-indigo-200 transition-colors">
                            {ex.en}
                          </p>
                          <p className="text-xs text-slate-400 leading-relaxed">{ex.vi}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-slate-400">
                            {ex.context}
                          </span>
                          <button
                            onClick={() => speak(ex.en)}
                            aria-label="Phát âm"
                            className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition-all"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Common Mistakes & TOEIC Context */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {/* Mistake */}
                  {item.commonMistakes.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/25 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Bẫy người Việt hay sai</span>
                      </div>
                      <div className="space-y-1.5 text-xs">
                        <div className="text-rose-300">
                          <span className="font-bold">❌ Sai: </span>
                          <span className="line-through">{item.commonMistakes[0].wrong}</span>
                        </div>
                        <div className="text-emerald-300">
                          <span className="font-bold">✅ Chuẩn: </span>
                          <span>{item.commonMistakes[0].correct}</span>
                        </div>
                        <p className="text-slate-400 text-[11px] leading-relaxed pt-1">
                          {item.commonMistakes[0].explanation}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* TOEIC Context */}
                  <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/25 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-400">
                        <Bookmark className="w-4 h-4" />
                        <span>Ứng dụng trong đề thi TOEIC</span>
                      </div>
                      <div className="flex gap-1">
                        {item.toeicContext.parts.map((p, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{item.toeicContext.tip}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 5. TAB 2: COLLOCATIONS */}
      {activeTab === 'collocations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredCollocations.length === 0 ? (
            <div className="col-span-2 text-center py-12 rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-400">
              Không tìm thấy collocation nào phù hợp với bộ lọc.
            </div>
          ) : (
            filteredCollocations.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden hover:border-emerald-500/40 transition-all p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Top row */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        {item.typeVi}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-800 text-slate-400">
                        {item.categoryVi}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopy(item.phrase, item.id)}
                        aria-label="Sao chép"
                        className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        onClick={() => speak(item.phrase)}
                        aria-label="Phát âm"
                        className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Phrase & Meaning */}
                  <div>
                    <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                      <span>{item.phrase}</span>
                    </h3>
                    <p className="text-xs font-semibold text-emerald-300 mt-0.5">{item.phraseVi}</p>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.definition}</p>
                  </div>

                  {/* Common Mistake Box */}
                  <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/20 text-xs space-y-1">
                    <div className="flex items-center gap-1 font-bold text-rose-400 text-[11px]">
                      <AlertTriangle className="w-3 h-3" />
                      <span>Bẫy dùng sai hay gặp</span>
                    </div>
                    <div className="text-rose-300 text-[11px]">
                      <span className="line-through">❌ {item.commonMistake.wrong}</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-snug">{item.commonMistake.tip}</p>
                  </div>

                  {/* Examples */}
                  <div className="space-y-2 pt-1">
                    {item.examples.map((ex, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/70 flex items-start justify-between gap-2"
                      >
                        <div className="space-y-0.5 text-xs flex-1">
                          <p className="font-semibold text-white">{ex.en}</p>
                          <p className="text-slate-400 text-[11px]">{ex.vi}</p>
                        </div>
                        <button
                          onClick={() => speak(ex.en)}
                          className="p-1 rounded text-slate-400 hover:text-emerald-400 transition-colors"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Tip */}
                <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-emerald-400">Mẹo TOEIC:</strong> {item.toeicTip}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 6. TAB 3: IDIOMS */}
      {activeTab === 'idioms' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredIdioms.length === 0 ? (
            <div className="col-span-2 text-center py-12 rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-400">
              Không tìm thấy thành ngữ nào phù hợp với bộ lọc.
            </div>
          ) : (
            filteredIdioms.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden hover:border-pink-500/40 transition-all p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-pink-500/10 border border-pink-500/20 text-pink-400">
                        {item.categoryVi}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-800 text-slate-400">
                        {item.formality}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopy(item.idiom, item.id)}
                        className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-3.5 h-3.5 text-pink-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        onClick={() => speak(item.idiom)}
                        className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 transition-all"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Idiom & Figurative Meaning */}
                  <div>
                    <h3 className="text-xl font-black text-white tracking-tight">{item.idiom}</h3>
                    <p className="text-xs font-semibold text-pink-300 mt-0.5">{item.idiomVi}</p>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">{item.figurativeMeaning}</p>
                  </div>

                  {/* Origin & Mental Image */}
                  <div className="p-3 rounded-xl bg-purple-950/25 border border-purple-500/20 text-xs space-y-1">
                    <div className="flex items-center gap-1 font-bold text-purple-300 text-[11px]">
                      <Brain className="w-3.5 h-3.5 text-purple-400" />
                      <span>Hình ảnh trực quan & Nguồn gốc</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{item.originMentalImage}</p>
                    <p className="text-[10px] text-slate-400 italic pt-0.5">Nghĩa đen: {item.literalMeaning}</p>
                  </div>

                  {/* Dialogue Example */}
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Hội thoại thực tế ({item.dialogue.context})
                    </div>
                    <div className="space-y-1 text-xs">
                      <p className="text-slate-200">
                        <strong className="text-indigo-400">A:</strong> {item.dialogue.speakerA}
                      </p>
                      <p className="text-slate-200">
                        <strong className="text-pink-400">B:</strong> {item.dialogue.speakerB}
                      </p>
                    </div>
                  </div>
                </div>

                {/* TOEIC Context */}
                <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-pink-400">TOEIC ({item.toeicContext.parts.join(', ')}):</strong>{' '}
                    {item.toeicContext.tip}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 7. TAB 4: INTERACTIVE QUIZ */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          {/* Quiz Score Header */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-white">Kiểm tra Phản xạ Mẫu câu & Collocations</h2>
              <p className="text-xs text-slate-300">
                Thử thách nhận diện cụm từ cố định, cấu trúc đảo ngữ và giải mã thành ngữ trong ngữ cảnh bài thi TOEIC.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-slate-400">Kết quả của bạn</div>
                <div className="text-2xl font-black text-amber-400">
                  {quizScore} / {practiceQuizzes.length}
                </div>
              </div>
              <button
                onClick={resetQuiz}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Làm lại</span>
              </button>
            </div>
          </div>

          {/* Quiz Question Cards */}
          <div className="space-y-4">
            {practiceQuizzes.map((quiz, qIdx) => {
              const isAnswered = selectedAnswers[quiz.id] !== undefined;
              const userAnswer = selectedAnswers[quiz.id];
              const isCorrect = userAnswer === quiz.correctAnswer;

              return (
                <div
                  key={quiz.id}
                  className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 border border-amber-500/20 text-amber-400">
                      Câu {qIdx + 1}: {quiz.tag}
                    </span>
                    {isAnswered && (
                      <span
                        className={`text-xs font-bold inline-flex items-center gap-1 ${
                          isCorrect ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Chính xác!</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4" />
                            <span>Chưa đúng</span>
                          </>
                        )}
                      </span>
                    )}
                  </div>

                  <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                    {quiz.question}
                  </p>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {quiz.options.map((opt, optIdx) => {
                      let btnStyle =
                        'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60';

                      if (isAnswered) {
                        if (optIdx === quiz.correctAnswer) {
                          btnStyle = 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 font-bold';
                        } else if (optIdx === userAnswer) {
                          btnStyle = 'bg-rose-950/40 border-rose-500/50 text-rose-300';
                        } else {
                          btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isAnswered}
                          onClick={() => handleQuizAnswer(quiz.id, optIdx)}
                          className={`p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-2 ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && optIdx === quiz.correctAnswer && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                          {isAnswered && optIdx === userAnswer && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  {showExplanations[quiz.id] && (
                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 leading-relaxed space-y-1 animate-in fade-in">
                      <div className="font-bold text-indigo-400 flex items-center gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>Giải thích chi tiết</span>
                      </div>
                      <p>{quiz.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
