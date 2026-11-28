'use client';

import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Sparkles,
  Cloud,
  CloudCheck,
  CloudOff,
  RefreshCw,
  FileText,
  MessageSquare,
  Bookmark,
  MousePointerClick,
  LogIn,
  SlidersHorizontal,
  X,
  Trash2,
} from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { useAuth } from '@/contexts/AuthContext';
import { CustomItemType, CustomVocabItem } from '@/types/custom-vocab';
import { CustomVocabCard } from '@/components/custom-vocab/CustomVocabCard';
import { CustomVocabDetailModal } from '@/components/custom-vocab/CustomVocabDetailModal';
import { CustomVocabMindMapModal } from '@/components/custom-vocab/CustomVocabMindMapModal';

export default function NotebookPage() {
  const { customItems, deleteCustomItem, syncStatus, lastSyncedAt, forceSync } = useProgress();
  const { user, openAuthModal } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | CustomItemType>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'az'>('newest');

  // Modal states
  const [detailItem, setDetailItem] = useState<CustomVocabItem | null>(null);
  const [mindMapItemId, setMindMapItemId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isManualSyncing, setIsManualSyncing] = useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const mindMapItem = useMemo(
    () =>
      mindMapItemId
        ? customItems.find((it) => it.id === mindMapItemId && it.type === 'vocabulary') || null
        : null,
    [customItems, mindMapItemId]
  );

  const handleOpenMindMap = (item: CustomVocabItem) => {
    if (item.type !== 'vocabulary') return;
    setMindMapItemId(item.id);
  };

  // Keyboard shortcut '/' focuses the notebook search input when not typing in an input
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isEditing =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        Boolean(target?.isContentEditable);

      if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey && !isEditing) {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Open the add modal via custom event
  const handleOpenAddModal = (initialData?: { text?: string; type?: CustomItemType }) => {
    window.dispatchEvent(
      new CustomEvent('open-custom-vocab-modal', {
        detail: initialData || {},
      })
    );
  };

  const handleOpenEditModal = (item: CustomVocabItem) => {
    window.dispatchEvent(
      new CustomEvent('open-custom-vocab-modal', {
        detail: { editItem: item },
      })
    );
  };

  const handleManualSync = async () => {
    setIsManualSyncing(true);
    try {
      await forceSync();
    } finally {
      setTimeout(() => setIsManualSyncing(false), 800);
    }
  };

  // Filter & Search Logic
  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return customItems.filter((item) => {
      // 1. Type filter
      if (filterType !== 'all' && item.type !== filterType) {
        return false;
      }

      // 2. Search query matching across 4 text fields
      if (query) {
        const matchText = item.text.toLowerCase().includes(query);
        const matchExpl = item.explanation.toLowerCase().includes(query);
        const matchNotes = (item.notes || '').toLowerCase().includes(query);
        const matchContext = item.context.toLowerCase().includes(query);
        const matchPos = (item.partOfSpeech || '').toLowerCase().includes(query);
        const matchIpa = (item.ipa || '').toLowerCase().includes(query);
        return matchText || matchExpl || matchNotes || matchContext || matchPos || matchIpa;
      }

      return true;
    });
  }, [customItems, filterType, searchQuery]);

  // Sort Logic
  const sortedItems = useMemo(() => {
    const list = [...filteredItems];
    if (sortBy === 'newest') {
      return list.sort(
        (a, b) =>
          new Date(b.createdAt || b.updatedAt).getTime() -
          new Date(a.createdAt || a.updatedAt).getTime()
      );
    }
    if (sortBy === 'oldest') {
      return list.sort(
        (a, b) =>
          new Date(a.createdAt || a.updatedAt).getTime() -
          new Date(b.createdAt || b.updatedAt).getTime()
      );
    }
    if (sortBy === 'az') {
      return list.sort((a, b) => a.text.localeCompare(b.text));
    }
    return list;
  }, [filteredItems, sortBy]);

  // Counts
  const totalCount = customItems.length;
  const vocabCount = customItems.filter((i) => i.type === 'vocabulary').length;
  const patternCount = customItems.filter((i) => i.type === 'pattern').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20 pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* 1. Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                <Bookmark className="w-3.5 h-3.5 text-indigo-400" />
                <span>Sổ tay cá nhân độc lập</span>
              </span>

              {/* Cloud Sync Status Badge */}
              {user ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium bg-emerald-500/10 border border-emerald-500/25 text-emerald-300">
                  <Cloud className="w-3.5 h-3.5 text-emerald-400" />
                  <span>
                    {syncStatus === 'syncing' || isManualSyncing
                      ? 'Đang đồng bộ Cloud...'
                      : 'Đồng bộ Cloud theo user'}
                  </span>
                  <button
                    type="button"
                    onClick={handleManualSync}
                    disabled={isManualSyncing}
                    className="ml-1 p-0.5 hover:text-white transition-colors"
                    title="Đồng bộ ngay"
                  >
                    <RefreshCw
                      className={`w-3 h-3 ${isManualSyncing ? 'animate-spin' : ''}`}
                    />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={openAuthModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 transition-colors"
                >
                  <CloudOff className="w-3.5 h-3.5 text-amber-400" />
                  <span>Lưu máy cục bộ • Đăng nhập để đồng bộ Cloud</span>
                  <LogIn className="w-3 h-3 ml-0.5" />
                </button>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Sổ tay Từ vựng & Mẫu câu của bạn
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Tự do lưu trữ từ vựng, collocation và mẫu câu tâm đắc. Hỗ trợ trí tuệ nhân tạo (AI)
              tự động phân tích ý nghĩa, tạo ví dụ ngữ cảnh doanh nghiệp và vẽ{' '}
              <span className="text-purple-300 font-medium">Vocab Mind Map</span> cho các từ vựng.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleOpenAddModal()}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold shadow-xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm mới</span>
            </button>
          </div>
        </div>

        {/* Quick highlight feature tip */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
          <MousePointerClick className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>
            <strong className="text-slate-300">Mẹo nhanh:</strong> Bạn có thể dùng chuột bôi đen
            bất kỳ từ hoặc câu nào trên web/trang học để bấm <em>&ldquo;Lưu vào Sổ tay&rdquo;</em>{' '}
            ngay lập tức.
          </span>
        </div>
      </div>

      {/* 2. Stats Counters */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <button
          type="button"
          onClick={() => setFilterType('all')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            filterType === 'all'
              ? 'bg-indigo-950/20 border-indigo-500/50 shadow-md shadow-indigo-500/10'
              : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900'
          }`}
        >
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Tất cả mục đã lưu
          </div>
          <div className="text-xl sm:text-2xl font-black text-white mt-1">{totalCount}</div>
        </button>

        <button
          type="button"
          onClick={() => setFilterType('vocabulary')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            filterType === 'vocabulary'
              ? 'bg-indigo-950/30 border-indigo-500 text-indigo-300 shadow-md shadow-indigo-500/10'
              : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900'
          }`}
        >
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-indigo-300 uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Từ vựng</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-white mt-1">{vocabCount}</div>
        </button>

        <button
          type="button"
          onClick={() => setFilterType('pattern')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            filterType === 'pattern'
              ? 'bg-amber-950/30 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10'
              : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900'
          }`}
        >
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-300 uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Mẫu câu</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-white mt-1">{patternCount}</div>
        </button>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800/90 shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Tìm kiếm theo từ, giải thích, ngữ cảnh hoặc ghi chú..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                e.preventDefault();
                if (searchQuery) {
                  setSearchQuery('');
                } else {
                  searchInputRef.current?.blur();
                }
              }
            }}
            title="Tìm kiếm từ vựng ghi chú (Nhấn / để tìm nhanh, Esc để xóa)"
            className="w-full pl-9 pr-10 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-200"
              title="Xóa tìm kiếm (Esc)"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd
              className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-700/80 rounded select-none pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
              title="Nhấn / để tìm kiếm"
            >
              /
            </kbd>
          )}
        </div>

        {/* Filter Chips & Sort Select */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {/* Filter Type Pills */}
          <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800 shrink-0">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterType === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tất cả ({totalCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('vocabulary')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterType === 'vocabulary'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Từ vựng ({vocabCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('pattern')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterType === 'pattern'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Mẫu câu ({patternCount})
            </button>
          </div>

          {/* Sort Select */}
          <div className="flex items-center gap-1.5 bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-medium text-slate-300 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent border-none text-slate-200 focus:outline-none cursor-pointer pr-2"
            >
              <option value="newest" className="bg-slate-900 text-slate-100">
                Mới nhất
              </option>
              <option value="oldest" className="bg-slate-900 text-slate-100">
                Cũ nhất
              </option>
              <option value="az" className="bg-slate-900 text-slate-100">
                A - Z (Chữ cái)
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. Content Grid */}
      {sortedItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedItems.map((item) => (
            <CustomVocabCard
              key={item.id}
              item={item}
              onView={(it) => setDetailItem(it)}
              onEdit={(it) => handleOpenEditModal(it)}
              onDelete={(id) => setDeletingId(id)}
              onOpenMindMap={handleOpenMindMap}
            />
          ))}
        </div>
      ) : customItems.length === 0 ? (
        /* Empty State: No items added yet */
        <div className="p-10 rounded-3xl bg-slate-900/60 border border-dashed border-slate-800 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
            <Bookmark className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-white">
              Sổ tay của bạn hiện đang trống
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Hãy thêm những từ vựng hoặc mẫu câu giao tiếp quan trọng mà bạn muốn làm chủ.
              Dữ liệu được lưu trữ độc lập và có sự hỗ trợ của AI.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => handleOpenAddModal()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/25 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm mục đầu tiên</span>
            </button>
          </div>
        </div>
      ) : (
        /* Empty State: Search / filter has 0 results */
        <div className="p-10 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
          <Search className="w-8 h-8 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">Không tìm thấy kết quả phù hợp</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Không tìm thấy từ vựng hoặc mẫu câu nào khớp với từ khóa &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setFilterType('all');
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      )}

      {/* 5. Detail Modal ("Xem lại") */}
      <CustomVocabDetailModal
        item={detailItem}
        onClose={() => setDetailItem(null)}
        onEdit={(item) => handleOpenEditModal(item)}
        onDelete={(id) => deleteCustomItem(id)}
        onOpenMindMap={handleOpenMindMap}
      />

      {/* 5b. AI Vocab Mind Map Modal (Vocabulary items only) */}
      <CustomVocabMindMapModal
        item={mindMapItem}
        onClose={() => setMindMapItemId(null)}
      />

      {/* 6. Quick Delete Confirmation Dialog */}
      {deletingId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in"
          onClick={() => setDeletingId(null)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Xác nhận xoá</h4>
                <p className="text-xs text-slate-400">
                  Bạn có chắc chắn muốn xoá mục này khỏi Sổ tay cá nhân?
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (deletingId) {
                    await deleteCustomItem(deletingId);
                    setDeletingId(null);
                  }
                }}
                className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md shadow-rose-600/20"
              >
                Xác nhận xoá
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
