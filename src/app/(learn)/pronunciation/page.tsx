'use client';

import React, { useState, useMemo } from 'react';
import {
  pronunciationCategories,
  allPronunciationTopics,
  getTopicsByCategory,
} from '@/data/pronunciation';
import { PronunciationTopicCard } from '@/components/pronunciation/PronunciationTopicCard';
import { PronunciationCategoryId } from '@/types/pronunciation';
import {
  Headphones,
  Sparkles,
  Search,
  BookOpen,
  Link2,
  Activity,
  Zap,
  AlertTriangle,
  Volume2,
  Brain,
  HelpCircle,
} from 'lucide-react';

const categoryIcons: Record<PronunciationCategoryId, React.ElementType> = {
  'linking-sounds': Link2,
  'rhythm-stress': Activity,
  reductions: Zap,
  'vietnamese-pitfalls': AlertTriangle,
  intonation: Volume2,
};

export default function PronunciationPage() {
  const [selectedCategory, setSelectedCategory] = useState<PronunciationCategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTopics = useMemo(() => {
    return allPronunciationTopics.filter((topic) => {
      const matchCategory =
        selectedCategory === 'all' || topic.categoryId === selectedCategory;
      if (!matchCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        topic.title.toLowerCase().includes(q) ||
        topic.titleVi.toLowerCase().includes(q) ||
        topic.subtitle.toLowerCase().includes(q) ||
        topic.tag.toLowerCase().includes(q) ||
        topic.rules.some(
          (r) =>
            r.ruleTitle.toLowerCase().includes(q) ||
            r.description.toLowerCase().includes(q) ||
            r.mouthShapeTip.toLowerCase().includes(q)
        ) ||
        topic.comparisonPairs.some(
          (p) =>
            p.slowText.toLowerCase().includes(q) ||
            p.fastConnectedText.toLowerCase().includes(q) ||
            p.phoneticSpelling.toLowerCase().includes(q) ||
            p.vi.toLowerCase().includes(q)
        )
      );
    });
  }, [selectedCategory, searchQuery]);

  const totalQuizzes = allPronunciationTopics.reduce((acc, curr) => acc + curr.quiz.length, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* 1. Hero Header */}
      <section className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950/70 to-indigo-950/60 border border-slate-800 p-8 sm:p-12 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Phát âm & Luyện nghe Bản xứ • Không Lý thuyết Ngữ âm Phức tạp</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Học Nghe & Phát Âm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-teal-300">
              Theo Tư Duy Người Bản Xứ
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Chỉ cô đọng vào <strong>những quy luật quan trọng nhất</strong>: Nối âm tự nhiên, nuốt âm, âm T kiểu Mỹ, nhịp điệu từ khóa và sửa dứt điểm các lỗi phát âm chí mạng của người Việt trong giao tiếp hàng ngày.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-400 border-t border-slate-800/80">
            <div>
              <strong className="text-white text-lg font-black">{allPronunciationTopics.length}</strong>
              <span className="ml-1.5 font-medium">Chuyên đề cốt lõi</span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div>
              <strong className="text-amber-400 text-lg font-black">{totalQuizzes}</strong>
              <span className="ml-1.5 font-medium">Bài luyện tai nghe</span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div>
              <strong className="text-sky-400 text-lg font-black">100%</strong>
              <span className="ml-1.5 font-medium">Âm thanh đối chiếu Chậm & Chuẩn</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Selector Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Headphones className="w-4 h-4 text-sky-400" />
            <span>Chọn Chủ đề Luyện Nghe & Phát Âm</span>
          </h2>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs text-sky-400 hover:text-sky-300 font-semibold transition-colors"
            >
              Xem tất cả ({allPronunciationTopics.length}) &rarr;
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {pronunciationCategories.map((cat) => {
            const Icon = categoryIcons[cat.id];
            const isSelected = selectedCategory === cat.id;
            const count = getTopicsByCategory(cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(isSelected ? 'all' : cat.id)}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-slate-900 border-sky-500 shadow-lg shadow-sky-500/20 ring-1 ring-sky-500'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                        isSelected
                          ? 'bg-sky-600 text-white shadow-md'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/60">
                      {count} bài
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-1">
                    {cat.titleVi}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                  <span className="text-sky-400 font-semibold">{cat.badge}</span>
                  <span className="text-slate-500 group-hover:text-slate-300">
                    {isSelected ? 'Đang chọn' : 'Luyện ngay &rarr;'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Search & Filter Bar */}
      <section className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm quy luật, âm (ví dụ: flap t, water, gonna, tell him, sheet shit, schwa)..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Tất cả ({allPronunciationTopics.length})
          </button>
          {pronunciationCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === c.id
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {c.badge}
            </button>
          ))}
        </div>
      </section>

      {/* 4. Topic Cards List */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Hiển thị <strong className="text-white">{filteredTopics.length}</strong> chuyên đề luyện nghe & phát âm
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-rose-400 hover:text-rose-300 transition-colors"
            >
              Xóa tìm kiếm
            </button>
          )}
        </div>

        {filteredTopics.length > 0 ? (
          <div className="space-y-6">
            {filteredTopics.map((topic) => (
              <PronunciationTopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-sm font-bold text-white">Không tìm thấy chuyên đề phù hợp</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Thử tìm kiếm với từ khóa khác như "nối âm", "flap t", "wanna", "gonna", "âm đuôi", hoặc chọn "Tất cả".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-semibold hover:bg-sky-500 transition-colors inline-block"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        )}
      </section>

      {/* 5. Native Ear Mindset Summary */}
      <section className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-sky-400">
          <Brain className="w-5 h-5" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100">
            3 Nguyên tắc vàng giúp tai nghe như người bản xứ
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="font-bold text-sky-400 block uppercase">1. Tiết kiệm năng lượng (Lazy Tongue)</span>
            <p className="text-slate-300 leading-relaxed">
              Người bản xứ không cố tình nói nhanh. Cơ miệng của họ tự động nối phụ âm sang nguyên âm (*Pick-it-up* &rarr; *pi-ki-tup*) và biến T thành D (*Water* &rarr; *wah-der*) để luồng hơi đi mượt mà nhất.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="font-bold text-amber-400 block uppercase">2. Nhạc tính (Stress-timed)</span>
            <p className="text-slate-300 leading-relaxed">
              Đừng cố nghe 100% từng từ a, an, the, to, for. Người bản xứ chỉ nghe và nói to các <strong>Content Words</strong> (từ khóa mang nghĩa), các từ phụ bị đè bẹp thành âm Schwa /ə/ cực ngắn.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="font-bold text-emerald-400 block uppercase">3. Âm đuôi là sự sống còn</span>
            <p className="text-slate-300 leading-relaxed">
              Bỏ âm đuôi khiến từ ngữ bị mất hoàn toàn phân biệt (*Life, Like, Light, Line* biến thành *Lai*). Bật dứt khoát /s/, /z/, /t/, /d/ ở cuối từ giúp bạn ngay lập tức nói chuẩn như người bản xứ.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
