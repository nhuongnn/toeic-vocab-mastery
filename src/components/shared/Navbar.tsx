'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useProgress } from '@/contexts/ProgressContext';
import { AuthButton } from './AuthButton';
import {
  Sparkles,
  Layers,
  FileText,
  Trophy,
  Flame,
  Search,
  Menu,
  X,
  ChevronDown,
  BookOpen,
  Headphones,
  BookOpenCheck,
  PenTool,
  Dumbbell,
  Zap,
  Puzzle,
  Compass,
  Settings,
  Bot,
} from 'lucide-react';
import { allVocabularyWords } from '@/data/vocabulary';

export function Navbar() {
  const pathname = usePathname();
  const { progress, dueCount } = useProgress();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof allVocabularyWords>([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'skills' | 'practice' | null>(null);

  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdowns on page route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    setSearchFocused(false);
    setSearchQuery('');
  }, [pathname]);

  const streak = mounted ? progress.stats.currentStreak : 0;
  const safeDueCount = mounted ? dueCount : 0;

  const handleMouseEnter = (menu: 'skills' | 'practice') => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (!q.trim()) {
      setSearchResults([]);
      return;
    }
    const filtered = allVocabularyWords
      .filter((w) => w.word.toLowerCase().includes(q.toLowerCase()))
      .slice(0, 5);
    setSearchResults(filtered);
  };

  const isSkillsActive =
    pathname.startsWith('/grammar') ||
    pathname.startsWith('/pronunciation') ||
    pathname.startsWith('/reading') ||
    pathname.startsWith('/writing');

  const isPracticeActive =
    pathname.startsWith('/flashcards') ||
    pathname.startsWith('/quiz') ||
    pathname.startsWith('/matching') ||
    pathname.startsWith('/fill-blank') ||
    pathname.startsWith('/context-builder') ||
    pathname.startsWith('/listening') ||
    pathname.startsWith('/chat-room') ||
    pathname.startsWith('/ai-chat');

  const skillItems = [
    {
      href: '/grammar',
      label: 'Ngữ pháp thực tế',
      desc: 'Cốt lõi thời gian, câu điều kiện & email công sở',
      icon: BookOpen,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    },
    {
      href: '/pronunciation',
      label: 'Phát âm & Ngữ điệu',
      desc: 'Nối âm, biến âm & phản xạ nghe hiểu bản xứ',
      icon: Headphones,
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    },
    {
      href: '/reading',
      label: 'Kỹ năng Đọc hiểu',
      desc: 'Quét số liệu, bẫy NOT/TRUE & tốc độ Part 7',
      icon: BookOpenCheck,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      href: '/writing',
      label: 'Soạn thảo Công vụ',
      desc: 'Email đối tác, xử lý khủng hoảng & công văn',
      icon: PenTool,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
  ];

  const practiceItems = [
    {
      href: '/chat-room',
      label: 'Phòng chat AI công sở',
      desc: 'Nhập vai giao tiếp với Sếp, Đồng nghiệp & Nhân viên',
      icon: Bot,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      badge: 'Mới • AI',
    },
    {
      href: '/flashcards',
      label: 'Flashcard SRS',
      desc: 'Luyện trí nhớ dài hạn theo thuật toán SM-2',
      icon: Sparkles,
      color: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
      badge: safeDueCount > 0 ? `${safeDueCount} cần ôn` : undefined,
    },
    {
      href: '/quiz',
      label: 'Trắc nghiệm phản xạ',
      desc: 'Kiểm tra tốc độ nhận diện từ trong ngữ cảnh',
      icon: Dumbbell,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      href: '/matching',
      label: 'Game Ghép từ vựng',
      desc: 'Thử thách nối từ với định nghĩa bản xứ',
      icon: Puzzle,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    },
    {
      href: '/fill-blank',
      label: 'Điền từ chỗ trống',
      desc: 'Gõ từ từ trí nhớ theo ngữ cảnh câu thực tế',
      icon: BookOpen,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      href: '/listening',
      label: 'Luyện nghe phản xạ',
      desc: 'Nghe phát âm chuẩn bản xứ & nhận diện từ',
      icon: Headphones,
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    },
    {
      href: '/context-builder',
      label: 'Ghép câu ngữ cảnh',
      desc: 'Tái tạo trật tự từ & cấu trúc câu thương mại',
      icon: Compass,
      color: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 lg:gap-4 xl:gap-6 flex-nowrap">
          {/* 1. Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-all">
              <Sparkles className="w-4 h-4 fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-white leading-none">
                TOEIC<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Deep</span>
              </span>
              <span className="text-[9px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">
                Native Immersion
              </span>
            </div>
          </Link>

          {/* 2. Desktop Navigation (Compact, Organized & Elegant) */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 shrink-0 whitespace-nowrap">
            {/* Từ vựng (Vocab) */}
            <Link
              href="/categories"
              data-tour="vocabulary-link"
              className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all ${
                pathname.startsWith('/categories') || pathname.startsWith('/word')
                  ? 'text-indigo-400 bg-indigo-500/10 shadow-sm shadow-indigo-500/5'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
              }`}
            >
              <Layers className="w-4 h-4 shrink-0" />
              <span>Từ vựng</span>
            </Link>

            {/* Kỹ năng Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('skills')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all ${
                  isSkillsActive || activeDropdown === 'skills'
                    ? 'text-indigo-400 bg-indigo-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                }`}
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>Kỹ năng</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'skills' ? 'rotate-180 text-indigo-400' : 'text-slate-400'
                  }`}
                />
              </button>

              {activeDropdown === 'skills' && (
                <div className="absolute top-full left-0 mt-1 w-80 sm:w-88 rounded-2xl bg-slate-900/98 border border-slate-800 shadow-2xl p-2.5 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 max-h-[calc(100vh-5rem)] overflow-y-auto">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2.5 py-1 mb-1 border-b border-slate-800/60 pb-1.5">
                    4 Kỹ Năng Bổ Trợ
                  </div>
                  <div className="space-y-1">
                    {skillItems.map((item) => {
                      const Icon = item.icon;
                      const active = pathname.startsWith(item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-start gap-3 p-2 rounded-xl transition-all ${
                            active
                              ? 'bg-indigo-500/10 text-indigo-300'
                              : 'hover:bg-slate-800/70 text-slate-200'
                          }`}
                        >
                          <div className={`p-2 rounded-lg border shrink-0 mt-0.5 ${item.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="space-y-0.5 min-w-0 flex-1">
                            <div className="text-xs font-semibold">{item.label}</div>
                            <div className="text-[11px] text-slate-400 leading-snug">
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Luyện tập Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('practice')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all relative ${
                  isPracticeActive || activeDropdown === 'practice'
                    ? 'text-indigo-400 bg-indigo-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                }`}
              >
                <Zap className="w-4 h-4 shrink-0 text-amber-400" />
                <span>Luyện tập</span>
                {safeDueCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                )}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'practice' ? 'rotate-180 text-indigo-400' : 'text-slate-400'
                  }`}
                />
              </button>

              {activeDropdown === 'practice' && (
                <div className="absolute top-full left-0 mt-1 w-80 sm:w-88 rounded-2xl bg-slate-900/98 border border-slate-800 shadow-2xl p-2.5 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 max-h-[calc(100vh-5rem)] overflow-y-auto">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2.5 py-1 mb-1 border-b border-slate-800/60 pb-1.5">
                    Chế Độ Rèn Luyện
                  </div>
                  <div className="space-y-1">
                    {practiceItems.map((item) => {
                      const Icon = item.icon;
                      const active = pathname.startsWith(item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-start justify-between gap-2.5 p-2 rounded-xl transition-all ${
                            active
                              ? 'bg-indigo-500/10 text-indigo-300'
                              : 'hover:bg-slate-800/70 text-slate-200'
                          }`}
                        >
                          <div className="flex items-start gap-3 min-w-0 flex-1">
                            <div className={`p-2 rounded-lg border shrink-0 mt-0.5 ${item.color}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="space-y-0.5 min-w-0 flex-1">
                              <div className="text-xs font-semibold">{item.label}</div>
                              <div className="text-[11px] text-slate-400 leading-snug">
                                {item.desc}
                              </div>
                            </div>
                          </div>
                          {item.badge && (
                            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/20 border border-pink-500/40 text-pink-400 shrink-0 mt-0.5">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Thi thử (Mock Test) - Highlighted */}
            <Link
              href="/mock-test"
              data-tour="mock-test-link"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all ${
                pathname.startsWith('/mock-test')
                  ? 'text-indigo-400 bg-indigo-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
              }`}
            >
              <FileText className="w-4 h-4 shrink-0 text-indigo-400" />
              <span>Thi thử</span>
              <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                ETS
              </span>
            </Link>

            {/* Tiến độ (Stats) */}
            <Link
              href="/dashboard"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all ${
                pathname === '/dashboard'
                  ? 'text-indigo-400 bg-indigo-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
              }`}
            >
              <Trophy className="w-4 h-4 shrink-0" />
              <span>Tiến độ</span>
            </Link>
          </nav>

          {/* 3. Search & User Profile Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 xl:gap-3 ml-auto lg:ml-0 shrink-0 whitespace-nowrap">
            {/* Compact Search Bar */}
            <div className="relative hidden md:block w-32 lg:w-36 xl:w-48 shrink-0">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Tìm từ vựng..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                  className="w-full bg-slate-900/90 border border-slate-800 rounded-lg pl-8 pr-2.5 py-1 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>

              {/* Search Dropdown */}
              {searchFocused && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1.5 z-50 overflow-hidden">
                  {searchResults.map((word) => (
                    <Link
                      key={word.id}
                      href={`/word/${word.id}`}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/80 transition-colors group"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-semibold text-xs text-slate-100 group-hover:text-indigo-400 transition-colors truncate">
                          {word.word}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {word.deepMeaning.coreConcept}
                        </div>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 shrink-0">
                        {word.pronunciation.ipa}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Streak Pill */}
            <div
              data-tour="streak-display"
              className="flex items-center gap-1 px-2 xl:px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/25 text-amber-400 text-xs font-semibold shadow-sm shadow-amber-500/5 hover:border-amber-500/40 transition-colors shrink-0 whitespace-nowrap"
              title="Chuỗi ngày học liên tục"
            >
              <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-pulse shrink-0" />
              <span suppressHydrationWarning>{streak} ngày</span>
            </div>

            {/* Settings Link */}
            <Link
              href="/settings"
              aria-label="Cài đặt hệ thống"
              title="Cài đặt & Tùy biến"
              className={`p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all ${
                pathname === '/settings' ? 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' : ''
              }`}
            >
              <Settings className="w-4 h-4" />
            </Link>

            {/* Auth Button */}
            <AuthButton />

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800/90 bg-slate-950/95 backdrop-blur-xl px-4 py-4 space-y-4 max-h-[85vh] overflow-y-auto">
          {/* Mobile Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm từ vựng..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
            {searchResults.length > 0 && searchQuery && (
              <div className="mt-2 bg-slate-900 border border-slate-800 rounded-xl p-1.5 space-y-1">
                {searchResults.map((word) => (
                  <Link
                    key={word.id}
                    href={`/word/${word.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800"
                  >
                    <span className="text-xs font-semibold text-white">{word.word}</span>
                    <span className="text-[10px] text-slate-400">{word.pronunciation.ipa}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Section: Cốt lõi */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2">
              Trọng tâm
            </div>
            <Link
              href="/categories"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-900"
            >
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Kho từ vựng bản xứ</span>
            </Link>
            <Link
              href="/mock-test"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-900"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Thi thử Mock Test</span>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                ETS 100%
              </span>
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-900"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Bảng phân tích tiến độ</span>
            </Link>
          </div>

          {/* Section: 4 Kỹ năng */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2">
              4 Kỹ năng Bổ trợ
            </div>
            {skillItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-start gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-900 transition-colors"
                >
                  <div className={`p-1.5 rounded-lg border shrink-0 mt-0.5 ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-200">{item.label}</div>
                    <div className="text-[11px] text-slate-400 leading-snug">{item.desc}</div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Section: Luyện tập */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2">
              Chế độ Rèn luyện
            </div>
            {practiceItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-start justify-between gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-900 transition-colors"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`p-1.5 rounded-lg border shrink-0 mt-0.5 ${item.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-200">{item.label}</div>
                      <div className="text-[11px] text-slate-400 leading-snug">{item.desc}</div>
                    </div>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/20 text-pink-400 shrink-0 mt-0.5">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Section: Cài đặt & Giao diện */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2">
              Hệ thống & Tùy biến
            </div>
            <Link
              href="/settings"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-900"
            >
              <Settings className="w-4 h-4 text-indigo-400" />
              <span>Cài đặt & Tùy biến</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
