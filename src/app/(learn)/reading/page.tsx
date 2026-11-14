'use client';

import React, { useState, useMemo } from 'react';
import {
  readingCategories,
  allReadingLessons,
  getLessonsByReadingCategory,
} from '@/data/reading';
import { ReadingLessonCard } from '@/components/reading/ReadingLessonCard';
import { ReadingCategoryId } from '@/types/reading';
import {
  BookOpenCheck,
  Sparkles,
  BookOpen,
  Search,
  Mail,
  FileText,
  CheckSquare,
  Newspaper,
  Layers,
  Brain,
  Zap,
  HelpCircle,
  Clock,
} from 'lucide-react';

const categoryIcons: Record<ReadingCategoryId, React.ElementType> = {
  'emails-memos': Mail,
  'notices-policies': FileText,
  'invoices-orders': CheckSquare,
  'press-articles': Newspaper,
  'multi-passages': Layers,
};

export default function ReadingPage() {
  const [selectedCategory, setSelectedCategory] = useState<ReadingCategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLessons = useMemo(() => {
    return allReadingLessons.filter((lesson) => {
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
        lesson.goldenParaphrases.some(
          (p) =>
            p.original.toLowerCase().includes(q) ||
            p.paraphrased.toLowerCase().includes(q) ||
            p.contextVi.toLowerCase().includes(q)
        ) ||
        lesson.primaryPassage.content.toLowerCase().includes(q) ||
        lesson.commonTraps.some(
          (t) =>
            t.trapName.toLowerCase().includes(q) ||
            t.trapDescription.toLowerCase().includes(q)
        )
      );
    });
  }, [selectedCategory, searchQuery]);

  const totalQuizzes = allReadingLessons.reduce((acc, curr) => acc + curr.quiz.length, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* 1. Hero Header */}
      <section className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/70 to-blue-950/60 border border-slate-800 p-8 sm:p-12 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Tư duy Đọc hiểu Bản xứ • Không Dịch Chay • 100% Thực chiến Part 7</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Chiến Thuật Đọc Hiểu & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-cyan-300">
              Bắt Bài TOEIC Part 6 & 7
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Chỉ cô đọng vào <strong>5 thể loại bài đọc then chốt</strong>: Email thương mại, Thông báo quy chế, Hóa đơn quét bảng số liệu, Thông cáo báo chí M&A và Nối dữ liệu bài đọc kép. Loại bỏ hoàn toàn tật dịch thầm từng từ để kịp giờ làm bài.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-400 border-t border-slate-800/80">
            <div>
              <strong className="text-white text-lg font-black">{allReadingLessons.length}</strong>
              <span className="ml-1.5 font-medium">Chuyên đề cốt lõi</span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div>
              <strong className="text-amber-400 text-lg font-black">{totalQuizzes}</strong>
              <span className="ml-1.5 font-medium">Câu hỏi phản xạ</span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div>
              <strong className="text-indigo-400 text-lg font-black">100%</strong>
              <span className="ml-1.5 font-medium">Có Paraphrase vàng & Mẹo 30s</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Selector Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <BookOpenCheck className="w-4 h-4 text-indigo-400" />
            <span>Chọn Thể Loại Bài Đọc Cần Chinh Phục</span>
          </h2>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
            >
              Xem tất cả ({allReadingLessons.length}) →
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {readingCategories.map((cat) => {
            const Icon = categoryIcons[cat.id];
            const isSelected = selectedCategory === cat.id;
            const count = getLessonsByReadingCategory(cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(isSelected ? 'all' : cat.id)}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-500'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/60">
                      {count} bài
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                    {cat.titleVi}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                  <span className="text-indigo-400 font-semibold">{cat.badge}</span>
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
            placeholder="Tìm theo chủ đề, từ khóa (ví dụ: email, invoice, postpone, reschedule, warranty, memo)..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Tất cả ({allReadingLessons.length})
          </button>
          {readingCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === c.id
                  ? 'bg-indigo-600 text-white shadow-sm'
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
            Hiển thị <strong className="text-white">{filteredLessons.length}</strong> bài học đọc hiểu thực chiến
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
              <ReadingLessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-sm font-bold text-white">Không tìm thấy bài học phù hợp</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Thử tìm kiếm với từ khóa khác như "reschedule", "invoice", "subsidy", "multi", hoặc chọn "Tất cả".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-colors inline-block"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        )}
      </section>

      {/* 5. Native Reader Mindset Summary */}
      <section className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-indigo-400">
          <Brain className="w-5 h-5" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100">
            3 Nguyên tắc vàng giúp đọc nhanh và chính xác như người bản xứ
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="font-bold text-indigo-400 block uppercase">1. Đọc theo khối nghĩa (Thought Groups)</span>
            <p className="text-slate-300 leading-relaxed">
              Tuyệt đối không đọc thầm từng từ rồi ghép vào tiếng Việt. Mắt quét theo cụm 3-4 từ có liên kết ngữ pháp. Tập trung vào Động từ hành động và Danh từ chính, lướt qua các giới từ phụ.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="font-bold text-sky-400 block uppercase">2. Bắt bài BLUF (Bottom Line Up Front)</span>
            <p className="text-slate-300 leading-relaxed">
              Mọi văn bản thương mại đều đặt <strong>mục đích chính ở câu đầu tiên</strong> và <strong>yêu cầu hành động/deadline ở câu cuối cùng</strong>. Đọc ngay 2 vị trí này trước khi đi vào chi tiết thân bài.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="font-bold text-emerald-400 block uppercase">3. Săn từ Paraphrase thay vì tìm từ gốc</span>
            <p className="text-slate-300 leading-relaxed">
              Đề thi TOEIC Part 7 luôn bẫy bằng cách đổi chữ: <em>complimentary &rarr; free</em>, <em>postpone &rarr; reschedule</em>, <em>faulty &rarr; defective</em>. Nắm chắc bảng Paraphrase vàng giúp bạn bẻ khóa câu hỏi chỉ trong 5 giây.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
