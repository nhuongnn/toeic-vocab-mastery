'use client';

import React, { useState, useMemo } from 'react';
import {
  Layers,
  Search,
  Filter,
  BookOpen,
  ArrowUpDown,
  TrendingUp,
  MessageCircle,
  X,
  RotateCcw,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Target,
  Sparkles,
} from 'lucide-react';
import { categories } from '@/data/categories';
import { allVocabularyWords } from '@/data/vocabulary';
import { WordCard } from '@/components/word/WordCard';
import { CategoryId, WordLevel, WordSortOption } from '@/types/vocabulary';
import { useOnboarding } from '@/contexts/OnboardingContext';
import {
  LEVEL_CONFIG,
  SORT_OPTIONS,
  sortVocabularyWords,
  filterVocabularyWords,
} from '@/lib/vocabulary-helpers';

const PAGE_SIZE = 32;

export default function CategoriesPage() {
  const { state: onboardingState } = useOnboarding();
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedLevel, setSelectedLevel] = useState<WordLevel | 'all'>('all');
  const [sortBy, setSortBy] = useState<WordSortOption>('default');
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Read URL query parameters on mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category');
      const lvlParam = params.get('level');
      if (catParam) {
        setSelectedCategory(catParam as CategoryId);
      }
      if (lvlParam && (lvlParam === 'essential' || lvlParam === 'intermediate' || lvlParam === 'advanced')) {
        setSelectedLevel(lvlParam as WordLevel);
      }
    }
  }, []);

  // Category horizontal scroll controls & expanded mode
  const categoryScrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isExpandedCategories, setIsExpandedCategories] = useState(false);

  const checkCategoryScroll = React.useCallback(() => {
    const el = categoryScrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  const scrollCategories = (direction: 'left' | 'right') => {
    const el = categoryScrollRef.current;
    if (!el) return;
    const scrollAmount = 260;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleCategoryWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = categoryScrollRef.current;
    if (!el || isExpandedCategories) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    }
  };

  React.useEffect(() => {
    checkCategoryScroll();
    const el = categoryScrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkCategoryScroll);
    window.addEventListener('resize', checkCategoryScroll);
    return () => {
      el.removeEventListener('scroll', checkCategoryScroll);
      window.removeEventListener('resize', checkCategoryScroll);
    };
  }, [checkCategoryScroll, isExpandedCategories]);

  // Compute dynamic counts per level based on current category and search query
  const levelCounts = useMemo(() => {
    const baseWords = allVocabularyWords.filter((w) => {
      const matchCat = selectedCategory === 'all' || w.category === selectedCategory;
      const cleanSearch = search.trim().toLowerCase();
      if (!cleanSearch) return matchCat;
      const matchWord = w.word.toLowerCase().includes(cleanSearch);
      const matchConcept = w.deepMeaning?.coreConcept?.toLowerCase().includes(cleanSearch);
      return matchCat && (matchWord || matchConcept);
    });

    return {
      all: baseWords.length,
      essential: baseWords.filter((w) => w.level === 'essential').length,
      intermediate: baseWords.filter((w) => w.level === 'intermediate').length,
      advanced: baseWords.filter((w) => w.level === 'advanced').length,
    };
  }, [selectedCategory, search]);

  // Filter and sort words
  const filteredAndSortedWords = useMemo(() => {
    const filtered = filterVocabularyWords(allVocabularyWords, {
      category: selectedCategory,
      level: selectedLevel,
      search,
    });
    return sortVocabularyWords(filtered, sortBy);
  }, [selectedCategory, selectedLevel, search, sortBy]);

  // Reset pagination when filters or sort change
  React.useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [selectedCategory, selectedLevel, search, sortBy]);

  const displayedWords = filteredAndSortedWords.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSortedWords.length;

  const isFiltered =
    selectedCategory !== 'all' ||
    selectedLevel !== 'all' ||
    sortBy !== 'default' ||
    search.trim() !== '';

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSortBy('default');
    setSearch('');
  };

  const selectedCategoryName =
    selectedCategory === 'all'
      ? 'Tất cả danh mục'
      : categories.find((c) => c.id === selectedCategory)?.name || selectedCategory;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          <span>TOEIC Topic Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Workplace Categories & Curated Lexicon
        </h1>
        <p className="text-slate-400 text-sm max-w-3xl leading-relaxed">
          Kho từ vựng chuyên sâu chuẩn cấu trúc đề thi TOEIC và ngữ cảnh công sở quốc tế. Lọc theo cấp độ độ khó, sắp xếp theo độ phổ biến hoặc tần suất giao tiếp hàng ngày để tối ưu lộ trình học.
        </p>
      </div>

      {/* Learning Path Quick Filter Banner */}
      {onboardingState.learningPath && (
        <section className="p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-purple-950/40 border border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">
                  Lộ trình mục tiêu: {onboardingState.learningPath.targetScore}+ TOEIC
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                  Đang kích hoạt
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Xem ngay các nhóm từ vựng tương ứng theo từng giai đoạn trong lộ trình cá nhân hóa của bạn:
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {onboardingState.learningPath.phases.map((phase, idx) => (
              <button
                key={phase.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(phase.categoryIds[0] || 'all');
                  setSelectedLevel(phase.wordLevel);
                }}
                className="px-3.5 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white border border-indigo-500/40 text-xs font-semibold transition-all hover:scale-[1.02] shadow-sm flex items-center gap-1.5"
              >
                <span>Giai đoạn {idx + 1}</span>
                <span className="text-[10px] text-indigo-300/80 font-normal">({phase.targetWords} từ • {phase.wordLevel})</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Control Panel: Search & Sorters */}
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        {/* Row 1: Search and Sort Dropdown */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm từ vựng, khái niệm cốt lõi, từ gốc..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-9 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-0.5"
                title="Xóa tìm kiếm"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <div className="relative flex items-center min-w-[240px] sm:min-w-[280px]">
              <ArrowUpDown className="w-4 h-4 text-indigo-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as WordSortOption)}
                className="w-full appearance-none bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="default">Mặc định (Thứ tự ban đầu)</option>
                <optgroup label="Độ phổ biến từ vựng (TOEIC)">
                  <option value="popularity-desc">Độ phổ biến: Cao nhất (Phổ biến nhất)</option>
                  <option value="popularity-asc">Độ phổ biến: Thấp nhất</option>
                </optgroup>
                <optgroup label="Tần suất giao tiếp hàng ngày">
                  <option value="daily-desc">Giao tiếp hàng ngày: Hay dùng nhất</option>
                  <option value="daily-asc">Giao tiếp hàng ngày: Ít gặp hơn</option>
                </optgroup>
                <optgroup label="Bảng chữ cái">
                  <option value="alpha-asc">Bảng chữ cái: A → Z</option>
                  <option value="alpha-desc">Bảng chữ cái: Z → A</option>
                </optgroup>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Reset button */}
            {isFiltered && (
              <button
                onClick={handleResetFilters}
                className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap"
                title="Đặt lại toàn bộ bộ lọc"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Đặt lại</span>
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Level Filter Pills */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Cấp độ từ vựng:
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none flex-wrap">
            {/* All Levels */}
            <button
              onClick={() => setSelectedLevel('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedLevel === 'all'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                  : 'bg-slate-950/80 border border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>Tất cả cấp độ</span>
              <span className="text-[10px] opacity-80 font-mono">({levelCounts.all})</span>
            </button>

            {/* Essential */}
            <button
              onClick={() => setSelectedLevel('essential')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedLevel === 'essential'
                  ? LEVEL_CONFIG.essential.activeBgClass
                  : `bg-slate-950/80 border ${LEVEL_CONFIG.essential.pillBorderClass} text-emerald-300 hover:bg-emerald-950/30`
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Essential</span>
              <span className="text-[10px] opacity-80 font-mono">({levelCounts.essential})</span>
            </button>

            {/* Intermediate */}
            <button
              onClick={() => setSelectedLevel('intermediate')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedLevel === 'intermediate'
                  ? LEVEL_CONFIG.intermediate.activeBgClass
                  : `bg-slate-950/80 border ${LEVEL_CONFIG.intermediate.pillBorderClass} text-sky-300 hover:bg-sky-950/30`
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>Intermediate</span>
              <span className="text-[10px] opacity-80 font-mono">({levelCounts.intermediate})</span>
            </button>

            {/* Advanced */}
            <button
              onClick={() => setSelectedLevel('advanced')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedLevel === 'advanced'
                  ? LEVEL_CONFIG.advanced.activeBgClass
                  : `bg-slate-950/80 border ${LEVEL_CONFIG.advanced.pillBorderClass} text-purple-300 hover:bg-purple-950/30`
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>Advanced</span>
              <span className="text-[10px] opacity-80 font-mono">({levelCounts.advanced})</span>
            </button>
          </div>
        </div>

        {/* Row 3: Quick Sorting Badges for Popular / Daily Spoken */}
        <div className="pt-2 border-t border-slate-800/60 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none flex-wrap">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mr-1">
            Phím tắt sắp xếp:
          </span>

          <button
            onClick={() => setSortBy(sortBy === 'popularity-desc' ? 'default' : 'popularity-desc')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              sortBy === 'popularity-desc'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                : 'bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <TrendingUp className="w-3 h-3 text-indigo-400" />
            <span>Phổ biến nhất (TOEIC)</span>
          </button>

          <button
            onClick={() => setSortBy(sortBy === 'daily-desc' ? 'default' : 'daily-desc')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              sortBy === 'daily-desc'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <MessageCircle className="w-3 h-3 text-emerald-400" />
            <span>Giao tiếp thường gặp nhất</span>
          </button>

          <button
            onClick={() => setSortBy(sortBy === 'alpha-asc' ? 'default' : 'alpha-asc')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
              sortBy === 'alpha-asc'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <span>A → Z</span>
          </button>
        </div>
      </div>

      {/* Category Pills Slider / Grid */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold uppercase tracking-wider text-[11px] text-slate-400">
              Chủ đề làm việc (Categories):
            </span>
            <span className="text-indigo-300 font-semibold">
              {selectedCategoryName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle: Slider vs Grid */}
            <button
              onClick={() => setIsExpandedCategories(!isExpandedCategories)}
              className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-indigo-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              title={isExpandedCategories ? 'Chuyển sang dạng thanh cuộn ngang' : 'Hiển thị tất cả 13 chủ đề dạng lưới'}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-indigo-400" />
              <span>{isExpandedCategories ? 'Dạng cuộn ngang' : 'Xem tất cả (Lưới)'}</span>
            </button>
          </div>
        </div>

        {isExpandedCategories ? (
          /* Grid / Wrap Mode */
          <div className="flex flex-wrap items-center gap-1.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              Tất cả danh mục ({allVocabularyWords.length})
            </button>
            {categories.map((cat) => {
              const count = allVocabularyWords.filter((w) => w.category === cat.id).length;
              if (count === 0) return null;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] opacity-75 font-mono">({count})</span>
                </button>
              );
            })}
          </div>
        ) : (
          /* Horizontal Slider with Arrows & Visible Scrollbar */
          <div className="relative group/slider">
            {/* Scroll Left Arrow */}
            {canScrollLeft && (
              <button
                onClick={() => scrollCategories('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-900/95 border border-slate-700 hover:border-indigo-500 text-slate-200 hover:text-white hover:bg-indigo-600 flex items-center justify-center shadow-xl shadow-black/50 transition-all hover:scale-105"
                title="Cuộn sang trái"
                aria-label="Cuộn sang trái"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            {/* Left fade gradient when scrollable */}
            {canScrollLeft && (
              <div className="absolute left-0 top-0 bottom-2 w-8 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10" />
            )}

            {/* Scrollable Container */}
            <div
              ref={categoryScrollRef}
              onWheel={handleCategoryWheel}
              className="flex items-center gap-1.5 overflow-x-auto pb-2.5 pt-0.5 px-1 scroll-smooth max-w-full"
            >
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex-shrink-0 ${
                  selectedCategory === 'all'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                Tất cả danh mục ({allVocabularyWords.length})
              </button>
              {categories.map((cat) => {
                const count = allVocabularyWords.filter((w) => w.category === cat.id).length;
                if (count === 0) return null;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 flex-shrink-0 ${
                      selectedCategory === cat.id
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] opacity-75 font-mono">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Right fade gradient when scrollable */}
            {canScrollRight && (
              <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10" />
            )}

            {/* Scroll Right Arrow */}
            {canScrollRight && (
              <button
                onClick={() => scrollCategories('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-900/95 border border-slate-700 hover:border-indigo-500 text-slate-200 hover:text-white hover:bg-indigo-600 flex items-center justify-center shadow-xl shadow-black/50 transition-all hover:scale-105"
                title="Cuộn sang phải"
                aria-label="Cuộn sang phải"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Filter Status & Active Badges */}
      <div className="flex items-center justify-between gap-4 flex-wrap text-xs text-slate-400">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-slate-300">
            Kết quả: <strong className="text-white font-mono text-sm">{filteredAndSortedWords.length}</strong> từ vựng
          </span>

          {selectedLevel !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-200">
              <span>Level: {LEVEL_CONFIG[selectedLevel].shortLabel}</span>
              <button
                onClick={() => setSelectedLevel('all')}
                className="hover:text-rose-400 ml-0.5"
                title="Bỏ lọc cấp độ"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {sortBy !== 'default' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-indigo-300">
              <span>Sắp xếp: {SORT_OPTIONS.find((s) => s.id === sortBy)?.shortLabel}</span>
              <button
                onClick={() => setSortBy('default')}
                className="hover:text-rose-400 ml-0.5"
                title="Hủy sắp xếp"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedCategory !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-200">
              <span>Danh mục: {selectedCategoryName}</span>
              <button
                onClick={() => setSelectedCategory('all')}
                className="hover:text-rose-400 ml-0.5"
                title="Bỏ lọc danh mục"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>

        {displayedWords.length > 0 && (
          <span className="text-[11px] text-slate-500 font-mono">
            Đang hiển thị {displayedWords.length} / {filteredAndSortedWords.length} từ
          </span>
        )}
      </div>

      {/* Words Grid */}
      {filteredAndSortedWords.length > 0 ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayedWords.map((word) => (
              <WordCard key={word.id} word={word} />
            ))}
          </div>

          {/* Load More Pagination */}
          {hasMore && (
            <div className="text-center pt-4">
              <button
                onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-indigo-600/25 hover:scale-105 active:scale-95"
              >
                Xem thêm 32 từ khác (Còn {filteredAndSortedWords.length - displayedWords.length} từ)
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-4">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-300">Không tìm thấy từ vựng phù hợp</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Không có từ vựng nào khớp với bộ lọc cấp độ, danh mục hoặc từ khóa tìm kiếm của bạn.
            </p>
          </div>
          {isFiltered && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Đặt lại bộ lọc</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
