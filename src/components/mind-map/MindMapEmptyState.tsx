'use client';

import React from 'react';
import { Brain, Search, Sparkles } from 'lucide-react';

interface MindMapEmptyStateProps {
  title?: string;
  description?: string;
  isLoading?: boolean;
  onSelectSample?: () => void;
}

export function MindMapEmptyState({
  title = 'Chưa có dữ liệu Mind Map',
  description = 'Chọn một từ vựng, chủ đề TOEIC hoặc gốc từ để bắt đầu khám phá mạng lưới ngữ nghĩa.',
  isLoading = false,
  onSelectSample,
}: MindMapEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[360px] p-8 text-center">
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center mb-4">
        {isLoading ? (
          <Sparkles className="w-8 h-8 text-indigo-400 animate-pulse" />
        ) : (
          <Brain className="w-8 h-8 text-indigo-400" />
        )}
      </div>
      <h3 className="text-lg font-bold text-white mb-2">
        {isLoading ? 'Đang xây dựng mạng lưới từ vựng...' : title}
      </h3>
      <p className="text-sm text-slate-400 max-w-md mb-6">{description}</p>
      {onSelectSample && !isLoading && (
        <button
          type="button"
          onClick={onSelectSample}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shadow-lg shadow-indigo-600/25"
        >
          <Search className="w-4 h-4" />
          <span>Khám phá từ mẫu &ldquo;collaborate&rdquo;</span>
        </button>
      )}
    </div>
  );
}
