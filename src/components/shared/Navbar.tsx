'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useProgress } from '@/contexts/ProgressContext';
import { AuthButton } from './AuthButton';
import {
  Compass,
  Layers,
  Sparkles,
  Trophy,
  Dumbbell,
  BookOpen,
  Headphones,
  BookOpenCheck,
  PenTool,
  Search,
  Flame,
  Menu,
  X,
} from 'lucide-react';
import { allVocabularyWords } from '@/data/vocabulary';

export function Navbar() {
  const pathname = usePathname();
  const { progress, dueCount } = useProgress();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof allVocabularyWords>([]);
  const [searchFocused, setSearchFocused] = useState(false);

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

  const navItems = [
    { href: '/', label: 'Home', icon: Compass },
    { href: '/categories', label: 'Vocab', icon: Layers },
    { href: '/grammar', label: 'Grammar', icon: BookOpen },
    { href: '/pronunciation', label: 'Pronounce', icon: Headphones },
    { href: '/reading', label: 'Reading', icon: BookOpenCheck },
    { href: '/writing', label: 'Writing', icon: PenTool },
    { href: '/flashcards', label: 'Cards', icon: Sparkles, badge: dueCount > 0 ? dueCount : undefined },
    { href: '/quiz', label: 'Practice', icon: Dumbbell },
    { href: '/dashboard', label: 'Stats', icon: Trophy },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-lg tracking-wider">700</span>
            </div>
            <div>
              <span className="font-bold text-lg text-slate-100 tracking-tight block leading-tight">
                TOEIC<span className="text-indigo-400">Deep</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide block uppercase">
                Native Immersion
              </span>
            </div>
          </Link>

          {/* Quick Search */}
          <div className="relative flex-1 max-w-44 lg:max-w-56 xl:max-w-xs hidden sm:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search words..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs lg:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>

            {/* Search Dropdown */}
            {searchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 overflow-hidden">
                {searchResults.map((word) => (
                  <Link
                    key={word.id}
                    href={`/word/${word.id}`}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/80 transition-colors group"
                  >
                    <div>
                      <div className="font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors">
                        {word.word}
                      </div>
                      <div className="text-xs text-slate-400 line-clamp-1">
                        {word.deepMeaning.coreConcept}
                      </div>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {word.pronunciation.ipa}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1 px-2 xl:px-2.5 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors relative ${
                    isActive
                      ? 'text-indigo-400 bg-indigo-500/10'
                      : 'text-slate-300 hover:text-slate-100 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 xl:w-4 xl:h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] xl:text-[11px] font-bold bg-pink-500 text-white animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Streak, Target & Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              <span>{progress.stats.currentStreak}d</span>
            </div>

            <div className="hidden xl:flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
              <span>Target:</span>
              <span className="text-indigo-400 font-bold">700+</span>
            </div>

            <AuthButton />

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-900 lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'text-indigo-400 bg-indigo-500/10'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-pink-500 text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
