'use client';

import React from 'react';
import {
  Volume2,
  Edit3,
  Trash2,
  Eye,
  StickyNote,
  MessageSquare,
  FileText,
} from 'lucide-react';
import { CustomVocabItem } from '@/types/custom-vocab';
import { useSpeech } from '@/hooks/useSpeech';

interface CustomVocabCardProps {
  item: CustomVocabItem;
  onView: (item: CustomVocabItem) => void;
  onEdit: (item: CustomVocabItem) => void;
  onDelete: (id: string) => void;
}

export function CustomVocabCard({
  item,
  onView,
  onEdit,
  onDelete,
}: CustomVocabCardProps) {
  const { speak } = useSpeech();

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    speak(item.text);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(item);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(item.id);
  };

  return (
    <div
      onClick={() => onView(item)}
      className="group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800/90 hover:border-indigo-500/40 shadow-lg hover:shadow-xl hover:shadow-indigo-500/5 transition-all cursor-pointer"
    >
      <div className="space-y-3">
        {/* Top Badges & Actions */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-bold border ${
                item.type === 'pattern'
                  ? 'bg-amber-500/10 border-amber-500/25 text-amber-300'
                  : 'bg-indigo-500/10 border-indigo-500/25 text-indigo-300'
              }`}
            >
              {item.type === 'pattern' ? (
                <>
                  <MessageSquare className="w-3 h-3 text-amber-400" />
                  <span>Mẫu câu</span>
                </>
              ) : (
                <>
                  <FileText className="w-3 h-3 text-indigo-400" />
                  <span>Từ vựng</span>
                </>
              )}
            </span>

            {item.partOfSpeech && (
              <span className="text-[10px] font-medium text-slate-300 bg-slate-800/80 px-1.5 py-0.5 rounded-md border border-slate-700/60">
                {item.partOfSpeech}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={handleSpeak}
              className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors"
              title="Phát âm"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleEdit}
              className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors"
              title="Chỉnh sửa"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
              title="Xoá mục này"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 1. Word / Pattern Text with IPA */}
        <div>
          <div className="flex items-baseline gap-2 flex-wrap">
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors break-words leading-snug">
              {item.text}
            </h3>
            {item.ipa && (
              <span className="font-mono text-xs text-indigo-400/90 font-medium">
                {item.ipa}
              </span>
            )}
          </div>
        </div>

        {/* 2. Giải thích */}
        <div className="text-xs text-slate-300 leading-relaxed line-clamp-2 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/60">
          <span className="font-semibold text-indigo-300 mr-1">Giải thích:</span>
          {item.explanation}
        </div>

        {/* 4. Context */}
        <div className="text-xs text-slate-400 italic leading-relaxed line-clamp-2">
          &ldquo;{item.context}&rdquo;
        </div>

        {/* 3. Ghi chú cá nhân (nếu có) */}
        {item.notes && item.notes.trim() && (
          <div className="flex items-start gap-1.5 pt-1 text-[11px] text-amber-300/90 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1.5 rounded-lg">
            <StickyNote className="w-3.5 h-3.5 shrink-0 text-amber-400 mt-0.5" />
            <span className="line-clamp-1">{item.notes}</span>
          </div>
        )}
      </div>

      {/* Card Bottom: Click to view details prompt */}
      <div className="pt-3 mt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
        <span>Nhấn để xem chi tiết</span>
        <Eye className="w-3.5 h-3.5 group-hover:text-indigo-400 transition-colors" />
      </div>
    </div>
  );
}
