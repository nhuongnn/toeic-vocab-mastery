'use client';

import React from 'react';
import {
  X,
  Volume2,
  Copy,
  Check,
  Edit3,
  Trash2,
  BookOpen,
  MessageSquare,
  FileText,
  StickyNote,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import { CustomVocabItem } from '@/types/custom-vocab';
import { useSpeech } from '@/hooks/useSpeech';
import { getCambridgeUrl, getOxfordUrl, getBaseFormInfo } from '@/lib/dictionary';

interface CustomVocabDetailModalProps {
  item: CustomVocabItem | null;
  onClose: () => void;
  onEdit: (item: CustomVocabItem) => void;
  onDelete: (id: string) => void;
}

export function CustomVocabDetailModal({
  item,
  onClose,
  onEdit,
  onDelete,
}: CustomVocabDetailModalProps) {
  const { speak } = useSpeech();
  const [copied, setCopied] = React.useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);

  // Close modal when pressing Escape key
  React.useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const cambridgeUrl = getCambridgeUrl(item.text);
  const oxfordUrl = getOxfordUrl(item.text);
  const oxfordInfo = getBaseFormInfo(item.text);

  const formattedCreated = item.createdAt
    ? new Date(item.createdAt).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${
                item.type === 'pattern'
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                  : 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300'
              }`}
            >
              {item.type === 'pattern' ? (
                <>
                  <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                  <span>Mẫu câu (Sentence Pattern)</span>
                </>
              ) : (
                <>
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Từ vựng (Vocabulary)</span>
                </>
              )}
            </span>
            {formattedCreated && (
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{formattedCreated}</span>
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Main Keyword Display */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                1. Từ vựng / Mẫu câu
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight break-words">
                {item.text}
              </h3>
              {(item.ipa || item.partOfSpeech) && (
                <div className="flex items-center gap-2 flex-wrap pt-1">
                  {item.ipa && (
                    <span className="font-mono text-xs sm:text-sm text-indigo-300 bg-indigo-500/15 px-2 py-0.5 rounded-md border border-indigo-500/30">
                      {item.ipa}
                    </span>
                  )}
                  {item.partOfSpeech && (
                    <span className="text-xs font-semibold text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded-md border border-amber-500/30">
                      {item.partOfSpeech}
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center gap-1.5 shrink-0 pt-1">
              <button
                type="button"
                onClick={() => speak(item.text)}
                className="p-2 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/30 text-indigo-300 hover:text-white transition-all"
                title="Nghe phát âm bản xứ"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700/60 text-slate-300 hover:text-white transition-all"
                title="Sao chép"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick Dictionary Links */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400 font-medium">Tra từ điển nhanh:</span>
            <a
              href={cambridgeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/25 transition-all"
            >
              <BookOpen className="w-3 h-3 text-amber-400" />
              <span>Cambridge</span>
              <ExternalLink className="w-2.5 h-2.5 text-amber-400/60" />
            </a>
            <a
              href={oxfordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/25 transition-all"
              title={
                oxfordInfo.isConverted
                  ? `Mở trên Oxford Learner's Dictionaries (Tự động chuyển về nguyên mẫu: "${oxfordInfo.baseForm}")`
                  : "Mở trên Oxford Learner's Dictionaries"
              }
            >
              <BookOpen className="w-3 h-3 text-sky-400" />
              <span>Oxford</span>
              {oxfordInfo.isConverted && (
                <span className="text-[10px] text-sky-400/80 font-normal">
                  ({oxfordInfo.baseForm})
                </span>
              )}
              <ExternalLink className="w-2.5 h-2.5 text-sky-400/60" />
            </a>
          </div>

          {/* 2. Phần giải thích */}
          <div className="space-y-1.5 p-4 rounded-xl bg-indigo-950/15 border border-indigo-500/20">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>2. Giải thích ý nghĩa & sắc thái</span>
            </h4>
            <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-medium">
              {item.explanation}
            </div>
          </div>

          {/* 4. Context hoặc ví dụ sử dụng thực tế */}
          <div className="space-y-1.5 p-4 rounded-xl bg-purple-950/15 border border-purple-500/20">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>4. Ngữ cảnh & Ví dụ thực tế</span>
            </h4>
            <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap italic bg-slate-950/40 p-3 rounded-lg border border-purple-500/10">
              {item.context}
            </div>
          </div>

          {/* 3. Ghi chú cá nhân (nếu có) */}
          {item.notes && item.notes.trim() && (
            <div className="space-y-1.5 p-4 rounded-xl bg-amber-950/15 border border-amber-500/25">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <StickyNote className="w-3.5 h-3.5" />
                <span>3. Ghi chú cá nhân</span>
              </h4>
              <div className="text-xs text-amber-200/90 leading-relaxed whitespace-pre-wrap">
                {item.notes}
              </div>
            </div>
          )}

          {/* Delete Confirmation prompt inside modal */}
          {showConfirmDelete && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between gap-3 animate-in fade-in">
              <span className="text-xs text-rose-300 font-medium">
                Bạn có chắc chắn muốn xoá mục này khỏi sổ tay?
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowConfirmDelete(false)}
                  className="px-2.5 py-1 text-xs text-slate-400 hover:text-slate-200"
                >
                  Không
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onDelete(item.id);
                    onClose();
                  }}
                  className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all"
                >
                  Xoá ngay
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-800 bg-slate-950/60">
          <button
            type="button"
            onClick={() => setShowConfirmDelete(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 text-xs font-semibold transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Xoá</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              Đóng
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onEdit(item);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Chỉnh sửa</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
