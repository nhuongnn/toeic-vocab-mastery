'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  Sparkles,
  Volume2,
  BookOpen,
  MessageSquare,
  FileText,
  StickyNote,
  Loader2,
  Check,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { CustomItemType, CustomVocabItem } from '@/types/custom-vocab';
import { useProgress } from '@/contexts/ProgressContext';
import { useSpeech } from '@/hooks/useSpeech';

export interface OpenCustomVocabModalDetail {
  editItem?: CustomVocabItem;
  text?: string;
  explanation?: string;
  context?: string;
  notes?: string;
  type?: CustomItemType;
}

export function CustomVocabModal() {
  const { addCustomItem, updateCustomItem } = useProgress();
  const { speak } = useSpeech();

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // The 5 core fields
  const [text, setText] = useState('');
  const [type, setType] = useState<CustomItemType>('vocabulary');
  const [explanation, setExplanation] = useState('');
  const [notes, setNotes] = useState('');
  const [context, setContext] = useState('');

  // AI loading and error states
  const [aiLoading, setAiLoading] = useState(false);
  const [aiTarget, setAiTarget] = useState<'all' | 'explanation' | 'context' | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Listen for global open event (e.g. from mouse text selection or from page button)
  useEffect(() => {
    const handleOpenEvent = (e: Event) => {
      const customEvent = e as CustomEvent<OpenCustomVocabModalDetail>;
      const detail = customEvent.detail || {};

      if (detail.editItem) {
        setEditingId(detail.editItem.id);
        setText(detail.editItem.text || '');
        setType(detail.editItem.type || 'vocabulary');
        setExplanation(detail.editItem.explanation || '');
        setNotes(detail.editItem.notes || '');
        setContext(detail.editItem.context || '');
      } else {
        setEditingId(null);
        const initialText = (detail.text || '').trim();
        setText(initialText);

        // Infer type if word count is large
        if (detail.type) {
          setType(detail.type);
        } else if (initialText) {
          const words = initialText.split(/\s+/).length;
          setType(words > 3 ? 'pattern' : 'vocabulary');
        } else {
          setType('vocabulary');
        }

        setExplanation(detail.explanation || '');
        setNotes(detail.notes || '');
        setContext(detail.context || '');
      }

      setErrorMsg(null);
      setSuccessMsg(null);
      setIsOpen(true);
    };

    window.addEventListener('open-custom-vocab-modal', handleOpenEvent);
    return () => {
      window.removeEventListener('open-custom-vocab-modal', handleOpenEvent);
    };
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setEditingId(null);
    setText('');
    setExplanation('');
    setNotes('');
    setContext('');
    setErrorMsg(null);
    setSuccessMsg(null);
    setAiLoading(false);
    setAiTarget(null);
  }, []);

  // Request AI Assistance
  const handleAiAssist = async (field: 'all' | 'explanation' | 'context') => {
    const trimmedText = text.trim();
    if (!trimmedText) {
      setErrorMsg('Vui lòng nhập từ vựng hoặc mẫu câu trước khi yêu cầu AI hỗ trợ.');
      return;
    }

    setAiLoading(true);
    setAiTarget(field);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/custom-vocab/ai-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: trimmedText,
          type,
          field,
        }),
      });

      if (!res.ok) {
        throw new Error('Không thể kết nối dịch vụ AI.');
      }

      const data = await res.json();
      if (data.type && field === 'all') {
        setType(data.type);
      }
      if (data.explanation && (field === 'all' || field === 'explanation')) {
        setExplanation(data.explanation);
      }
      if (data.context && (field === 'all' || field === 'context')) {
        setContext(data.context);
      }

      setSuccessMsg(
        field === 'all'
          ? 'AI đã hoàn tất tạo giải thích và ngữ cảnh mẫu!'
          : field === 'explanation'
          ? 'AI đã hoàn tất tạo giải thích!'
          : 'AI đã hoàn tất tạo ví dụ ngữ cảnh!'
      );
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      console.error('AI assist error:', err);
      setErrorMsg('Gặp lỗi khi tạo nội dung với AI. Bạn có thể tự nhập trực tiếp.');
    } finally {
      setAiLoading(false);
      setAiTarget(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText) {
      setErrorMsg('Vui lòng nhập từ vựng hoặc mẫu câu.');
      return;
    }
    if (!explanation.trim()) {
      setErrorMsg('Vui lòng nhập hoặc sử dụng AI để tạo phần giải thích.');
      return;
    }
    if (!context.trim()) {
      setErrorMsg('Vui lòng nhập hoặc sử dụng AI để tạo ví dụ ngữ cảnh thực tế.');
      return;
    }

    try {
      if (editingId) {
        await updateCustomItem(editingId, {
          text: trimmedText,
          type,
          explanation: explanation.trim(),
          notes: notes.trim(),
          context: context.trim(),
        });
      } else {
        await addCustomItem({
          text: trimmedText,
          type,
          explanation: explanation.trim(),
          notes: notes.trim(),
          context: context.trim(),
        });
      }

      handleClose();
    } catch (err) {
      console.error('Save error:', err);
      setErrorMsg('Không thể lưu mục này. Vui lòng thử lại.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {editingId ? 'Chỉnh sửa Từ vựng / Mẫu câu' : 'Thêm vào Sổ tay cá nhân'}
              </h2>
              <p className="text-xs text-slate-400">
                Lưu trữ độc lập và tự động đồng bộ đám mây theo tài khoản
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Status Notifications */}
          {errorMsg && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
          {successMsg && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs">
              <Check className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Quick AI Autocomplete Action */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900 border border-indigo-500/20">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <div className="text-xs">
                <span className="font-semibold text-slate-200">Trợ lý AI TOEIC:</span>
                <span className="text-slate-400 ml-1">
                  Tự động điền giải thích, phân loại và ví dụ ngữ cảnh chuẩn
                </span>
              </div>
            </div>
            <button
              type="button"
              disabled={aiLoading || !text.trim()}
              onClick={() => handleAiAssist('all')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold shadow transition-all shrink-0"
            >
              {aiLoading && aiTarget === 'all' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Đang tạo...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI điền tự động</span>
                </>
              )}
            </button>
          </div>

          {/* Field 1: Từ vựng, mẫu câu */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <span>1. Từ vựng hoặc mẫu câu</span>
                <span className="text-rose-400">*</span>
              </label>
              {text.trim() && (
                <button
                  type="button"
                  onClick={() => speak(text.trim())}
                  className="flex items-center gap-1 text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                  title="Nghe phát âm chuẩn"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe đọc</span>
                </button>
              )}
            </div>
            <input
              type="text"
              required
              placeholder="Ví dụ: feasibility, in accordance with, I would appreciate it if..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-700/80 text-white placeholder:text-slate-500 text-sm font-semibold focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Field 5: Phân loại là từ vựng hoặc mẫu câu */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <span>5. Phân loại nội dung</span>
              <span className="text-rose-400">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setType('vocabulary')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  type === 'vocabulary'
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-sm shadow-indigo-500/10'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Từ vựng (Vocabulary / Idiom)</span>
              </button>
              <button
                type="button"
                onClick={() => setType('pattern')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  type === 'pattern'
                    ? 'bg-amber-600/20 border-amber-500 text-amber-300 shadow-sm shadow-amber-500/10'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Mẫu câu (Sentence Pattern)</span>
              </button>
            </div>
          </div>

          {/* Field 2: Phần giải thích do user tự nhập hoặc có hỗ trợ AI */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <span>2. Phần giải thích</span>
                <span className="text-rose-400">*</span>
                <span className="text-[10px] font-normal text-slate-400">
                  (tự nhập hoặc hỗ trợ AI)
                </span>
              </label>
              <button
                type="button"
                disabled={aiLoading || !text.trim()}
                onClick={() => handleAiAssist('explanation')}
                className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 hover:text-indigo-200 text-[11px] font-semibold transition-all disabled:opacity-50"
              >
                {aiLoading && aiTarget === 'explanation' ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Sparkles className="w-3 h-3 text-amber-400" />
                )}
                <span>AI tạo giải thích</span>
              </button>
            </div>
            <textarea
              rows={3}
              required
              placeholder="Nhập nghĩa tiếng Việt, loại từ, sắc thái sử dụng trong đề thi TOEIC và công việc..."
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-700/80 text-slate-200 placeholder:text-slate-500 text-xs leading-relaxed focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-y"
            />
          </div>

          {/* Field 4: Context hoặc ví dụ sử dụng trong thực tế */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <span>4. Context hoặc ví dụ sử dụng thực tế</span>
                <span className="text-rose-400">*</span>
                <span className="text-[10px] font-normal text-slate-400">
                  (tự nhập hoặc hỗ trợ AI)
                </span>
              </label>
              <button
                type="button"
                disabled={aiLoading || !text.trim()}
                onClick={() => handleAiAssist('context')}
                className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 hover:text-indigo-200 text-[11px] font-semibold transition-all disabled:opacity-50"
              >
                {aiLoading && aiTarget === 'context' ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Sparkles className="w-3 h-3 text-amber-400" />
                )}
                <span>AI tạo ví dụ</span>
              </button>
            </div>
            <textarea
              rows={3}
              required
              placeholder="Ví dụ câu tiếng Anh trong email, hợp đồng, báo cáo kèm dịch nghĩa tiếng Việt..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-700/80 text-slate-200 placeholder:text-slate-500 text-xs leading-relaxed focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-y"
            />
          </div>

          {/* Field 3: Ghi chú do người dùng tự nhập */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <StickyNote className="w-3.5 h-3.5 text-amber-400" />
              <span>3. Ghi chú cá nhân</span>
              <span className="text-[10px] font-normal text-slate-400">
                (mẹo nhớ cá nhân, bẫy từ vựng Part 5, lưu ý phát âm - không bắt buộc)
              </span>
            </label>
            <textarea
              rows={2}
              placeholder="Nhập ghi chú riêng của bạn (ví dụ: thường đi với giới từ 'with', dễ nhầm với từ khác...)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950/60 border border-slate-700/80 text-slate-200 placeholder:text-slate-500 text-xs leading-relaxed focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-y"
            />
          </div>
        </form>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-800 bg-slate-950/60">
          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Nội dung được lưu an toàn và đồng bộ Cloud</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{editingId ? 'Cập nhật' : 'Lưu vào Sổ tay'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
