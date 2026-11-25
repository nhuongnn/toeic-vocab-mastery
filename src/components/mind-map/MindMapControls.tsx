'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Search,
  Eye,
  FolderTree,
  GitBranch,
  BarChart3,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  X,
} from 'lucide-react';
import { CategoryId, VocabularyWord } from '@/types/vocabulary';
import { categories } from '@/data/categories';
import { RootFamily } from '@/data/mind-map/rootFamilies';
import { MindMapMode } from '@/lib/mind-map/types';

interface MindMapControlsProps {
  mode: MindMapMode;
  onModeChange: (mode: MindMapMode) => void;
  selectedWord: VocabularyWord;
  onSelectWord: (word: VocabularyWord) => void;
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  selectedRoot: string;
  onSelectRoot: (root: string) => void;
  rootFamilies: RootFamily[];
  allWords: VocabularyWord[];
  searchQuery: string;
  onSearchQueryChange: (q: string) => void;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  onFitView: () => void;
}

const MODES: Array<{ id: MindMapMode; label: string; shortLabel: string; icon: React.ElementType }> = [
  { id: 'word-explorer', label: 'Word Explorer', shortLabel: 'Explorer', icon: Eye },
  { id: 'category-map', label: 'Category Map', shortLabel: 'Category', icon: FolderTree },
  { id: 'root-family', label: 'Root Family', shortLabel: 'Root', icon: GitBranch },
  { id: 'progress-map', label: 'My Progress', shortLabel: 'Progress', icon: BarChart3 },
];

export function MindMapControls({
  mode,
  onModeChange,
  selectedWord,
  onSelectWord,
  selectedCategory,
  onSelectCategory,
  selectedRoot,
  onSelectRoot,
  rootFamilies,
  allWords,
  searchQuery,
  onSearchQueryChange,
  zoom,
  onZoomIn,
  onZoomOut,
  onResetView,
  onFitView,
}: MindMapControlsProps) {
  const [wordPickerQuery, setWordPickerQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const wordMatches = useMemo(() => {
    const q = wordPickerQuery.trim().toLowerCase();
    if (!q) return allWords.slice(0, 8);
    return allWords
      .filter((w) => w.word.toLowerCase().includes(q))
      .slice(0, 10);
  }, [wordPickerQuery, allWords]);

  return (
    <div className="rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-800 p-3 space-y-2.5 shadow-xl">
      {/* Row 1: Mode Tabs & Context Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
        {/* Mode Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
          {MODES.map((m) => {
            const Icon = m.icon;
            const active = mode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => onModeChange(m.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  active
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                    : 'bg-slate-950/80 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{m.label}</span>
                <span className="sm:hidden">{m.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Context Selector based on active mode */}
        <div className="flex flex-wrap items-center gap-2">
          {mode === 'word-explorer' && (
            <div ref={pickerRef} className="relative min-w-[220px] flex-1 sm:flex-initial">
              <Search className="w-3.5 h-3.5 text-indigo-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={dropdownOpen ? wordPickerQuery : selectedWord.word}
                onFocus={() => {
                  setWordPickerQuery('');
                  setDropdownOpen(true);
                }}
                onChange={(e) => {
                  setWordPickerQuery(e.target.value);
                  setDropdownOpen(true);
                }}
                placeholder="Chọn từ trung tâm..."
                className="w-full bg-slate-950/90 border border-slate-700/80 rounded-xl pl-8 pr-3 py-1.5 text-xs font-semibold text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
              {dropdownOpen && (
                <div className="absolute left-0 right-0 top-full mt-1.5 z-40 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl max-h-60 overflow-y-auto p-1">
                  {wordMatches.length === 0 ? (
                    <div className="px-3 py-2 text-xs text-slate-400">Không tìm thấy từ</div>
                  ) : (
                    wordMatches.map((w) => (
                      <button
                        key={w.id}
                        type="button"
                        onClick={() => {
                          onSelectWord(w);
                          setDropdownOpen(false);
                          setWordPickerQuery('');
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                          w.id === selectedWord.id
                            ? 'bg-indigo-600/30 text-indigo-200 font-bold'
                            : 'text-slate-200 hover:bg-slate-800'
                        }`}
                      >
                        <span>{w.word}</span>
                        <span className="text-[10px] text-slate-400">{w.level}</span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {mode === 'category-map' && (
            <select
              value={selectedCategory}
              onChange={(e) => onSelectCategory(e.target.value as CategoryId)}
              aria-label="Chọn chủ đề TOEIC"
              className="bg-slate-950/90 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}

          {mode === 'root-family' && (
            <select
              value={selectedRoot}
              onChange={(e) => onSelectRoot(e.target.value)}
              aria-label="Chọn gốc từ"
              className="bg-slate-950/90 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500 max-w-[260px]"
            >
              {rootFamilies.map((rf) => (
                <option key={rf.root} value={rf.root}>
                  {rf.root}- ({rf.words.length} từ) — {rf.rootMeaning}
                </option>
              ))}
            </select>
          )}

          {/* In-graph highlight search */}
          <div className="relative flex-1 sm:flex-initial min-w-[160px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              placeholder="Lọc node trên map..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-8 pr-7 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchQueryChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                aria-label="Xóa lọc"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Zoom & View controls */}
          <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800 rounded-xl p-1">
            <button
              type="button"
              onClick={onZoomOut}
              className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
              title="Thu nhỏ"
              aria-label="Thu nhỏ"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono font-bold text-slate-300 px-1.5 min-w-[42px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={onZoomIn}
              className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
              title="Phóng to"
              aria-label="Phóng to"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <div className="w-px h-4 bg-slate-800 mx-0.5" />
            <button
              type="button"
              onClick={onResetView}
              className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
              title="Đặt lại góc nhìn"
              aria-label="Đặt lại góc nhìn"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onFitView}
              className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
              title="Vừa khung hình"
              aria-label="Vừa khung hình"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
