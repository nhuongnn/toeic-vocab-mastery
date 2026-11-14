'use client';

import React, { useState, useMemo } from 'react';
import {
  writingCategories,
  allWritingLessons,
  getLessonsByWritingCategory,
} from '@/data/writing';
import { WritingLessonCard } from '@/components/writing/WritingLessonCard';
import { WritingCategoryId } from '@/types/writing';
import {
  PenTool,
  Sparkles,
  Search,
  Mail,
  Send,
  Edit3,
  FileSignature,
  Brain,
  Zap,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';

const categoryIcons: Record<WritingCategoryId, React.ElementType> = {
  'email-architecture': Mail,
  'diplomacy-softening': PenTool,
  'inquiries-followups': Send,
  'complaints-apologies': Edit3,
  'reports-proposals': FileSignature,
};

export default function WritingPage() {
  const [selectedCategory, setSelectedCategory] = useState<WritingCategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLessons = useMemo(() => {
    return allWritingLessons.filter((lesson) => {
      const matchCategory =
        selectedCategory === 'all' || lesson.categoryId === selectedCategory;
      if (!matchCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        lesson.title.toLowerCase().includes(q) ||
        lesson.titleVi.toLowerCase().includes(q) ||
        lesson.subtitle.toLowerCase().includes(q) ||
        lesson.tag.toLowerCase().includes(q) ||
        lesson.formulas.some(
          (f) =>
            f.purpose.toLowerCase().includes(q) ||
            f.pattern.toLowerCase().includes(q) ||
            f.examples.some((ex) => ex.toLowerCase().includes(q))
        ) ||
        lesson.beforeAfter.some(
          (ba) =>
            ba.scenarioVi.toLowerCase().includes(q) ||
            ba.awkwardVersion.toLowerCase().includes(q) ||
            ba.nativeVersion.toLowerCase().includes(q)
        ) ||
        lesson.powerPhrases.some((group) =>
          group.phrases.some(
            (p) => p.en.toLowerCase().includes(q) || p.vi.toLowerCase().includes(q)
          )
        )
      );
    });
  }, [selectedCategory, searchQuery]);

  const totalExercises = allWritingLessons.reduce(
    (acc, curr) => acc + curr.exercises.length,
    0
  );
  const totalFormulas = allWritingLessons.reduce(
    (acc, curr) => acc + curr.formulas.length,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* 1. Hero Header */}
      <section className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950/70 to-pink-950/60 border border-slate-800 p-8 sm:p-12 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Tư duy Viết Bản xứ • BLUF (Bottom Line Up Front) • Chuẩn Công Sở Quốc Tế</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Kỹ Năng Viết Email & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-amber-300">
              Soạn Thảo Chuẩn Bản Xứ
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Học cách viết thư tín kinh doanh súc tích, gãy gọn: Cấu trúc email 4 bước, kỹ thuật từ chối khéo léo, nhắc hạn chót tinh tế, xử lý khiếu nại khách hàng và lập đề xuất báo cáo thuyết phục bằng số liệu.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-400 border-t border-slate-800/80">
            <div>
              <strong className="text-white text-lg font-black">{allWritingLessons.length}</strong>
              <span className="ml-1.5 font-medium">Chuyên đề cốt lõi</span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div>
              <strong className="text-amber-400 text-lg font-black">{totalFormulas}</strong>
              <span className="ml-1.5 font-medium">Khung câu mẫu ăn điểm</span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div>
              <strong className="text-purple-400 text-lg font-black">{totalExercises}</strong>
              <span className="ml-1.5 font-medium">Bài tập thực hành phản xạ</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Selector Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <PenTool className="w-4 h-4 text-purple-400" />
            <span>Chọn Chủ Đề Viết Cần Cải Thiện</span>
          </h2>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs text-purple-400 hover:text-purple-300 font-semibold transition-colors"
            >
              Xem tất cả ({allWritingLessons.length}) →
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {writingCategories.map((cat) => {
            const Icon = categoryIcons[cat.id];
            const isSelected = selectedCategory === cat.id;
            const count = getLessonsByWritingCategory(cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(isSelected ? 'all' : cat.id)}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-slate-900 border-purple-500 shadow-lg shadow-purple-500/20 ring-1 ring-purple-500'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                        isSelected
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/60">
                      {count} bài
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                    {cat.titleVi}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                  <span className="text-purple-400 font-semibold">{cat.badge}</span>
                  <span className="text-slate-500 group-hover:text-slate-300">
                    {isSelected ? 'Đang chọn' : 'Luyện ngay →'}
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
            placeholder="Tìm theo cấu trúc, mẫu câu (ví dụ: follow up, apology, attachment, proposal, quotation)..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Tất cả ({allWritingLessons.length})
          </button>
          {writingCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === c.id
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {c.badge}
            </button>
          ))}
        </div>
      </section>

      {/* 4. Lesson Cards List */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Hiển thị <strong className="text-white">{filteredLessons.length}</strong> chuyên đề viết thực chiến
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

        {filteredLessons.length > 0 ? (
          <div className="space-y-6">
            {filteredLessons.map((lesson) => (
              <WritingLessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-sm font-bold text-white">Không tìm thấy bài học phù hợp</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Thử tìm kiếm với từ khóa khác như "follow up", "apology", "complaint", "attached", hoặc chọn "Tất cả".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500 transition-colors inline-block"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        )}
      </section>

      {/* 5. Native Writer Mindset Summary */}
      <section className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-purple-400">
          <Brain className="w-5 h-5" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100">
            3 Nguyên tắc vàng giúp viết email & soạn thảo chuyên nghiệp như người bản xứ
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="font-bold text-purple-400 block uppercase">1. BLUF: Đi thẳng vào mục đích</span>
            <p className="text-slate-300 leading-relaxed">
              Mục đích chính phải xuất hiện ngay ở câu mở đầu: <em>"I am writing to inquire about..."</em>. Không hỏi han thời tiết, sức khỏe hay tâm sự lan man trong email đối tác kinh doanh.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="font-bold text-amber-400 block uppercase">2. Ngoại giao mềm mỏng (Diplomacy)</span>
            <p className="text-slate-300 leading-relaxed">
              Tránh chỉ trích trực tiếp cá nhân (<em>"You forgot the file"</em>). Dùng thể bị động khách quan (<em>"It appears the attachment was omitted"</em>) để giữ gìn quan hệ đối tác bền vững.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="font-bold text-emerald-400 block uppercase">3. Lượng hóa bằng con số (Data-Driven)</span>
            <p className="text-slate-300 leading-relaxed">
              Trong đề xuất và báo cáo, hạn chế dùng từ cảm tính (<em>"very good", "very fast"</em>). Thay vào đó, hãy chứng minh bằng số liệu cụ thể: <em>"increased efficiency by 35%, generating $24,000 in savings"</em>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
