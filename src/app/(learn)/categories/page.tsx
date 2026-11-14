'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Layers, Search, Filter, BookOpen } from 'lucide-react';
import { categories } from '@/data/categories';
import { allVocabularyWords } from '@/data/vocabulary';
import { WordCard } from '@/components/word/WordCard';
import { CategoryId } from '@/types/vocabulary';

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [search, setSearch] = useState('');

  const filteredWords = allVocabularyWords.filter((w) => {
    const matchesCat = selectedCategory === 'all' || w.category === selectedCategory;
    const matchesSearch =
      !search.trim() ||
      w.word.toLowerCase().includes(search.toLowerCase()) ||
      w.deepMeaning.coreConcept.toLowerCase().includes(search.toLowerCase()) ||
      w.etymology.rootWord.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

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
        <p className="text-slate-400 text-sm max-w-2xl">
          Deep-dive into words grouped by workplace contexts. Click any word to explore its etymology, native thought patterns, and pronunciation.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Category Pills Slider */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none max-w-full">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            All Categories ({allVocabularyWords.length})
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
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-75">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter words..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Words Grid */}
      {filteredWords.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredWords.map((word) => (
            <WordCard key={word.id} word={word} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-300">No words found</h3>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your category filter or search query.</p>
        </div>
      )}
    </div>
  );
}
