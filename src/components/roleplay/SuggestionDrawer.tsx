'use client';

import React from 'react';
import {
  Lightbulb,
  X,
  RefreshCw,
  Send,
  CornerDownLeft,
  BookOpen,
  Sparkles,
  HelpCircle,
  MessageSquare,
} from 'lucide-react';
import { RoleplaySuggestion } from '@/types/roleplay';

interface SuggestionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  suggestions: RoleplaySuggestion[];
  isLoading: boolean;
  provider?: 'gemini' | 'cloudflare' | 'fallback';
  model?: string;
  isFallback?: boolean;
  fallbackReason?: string;
  onRefresh: () => void;
  onSelectSuggestion: (text: string, autoSend?: boolean) => void;
}

export function SuggestionDrawer({
  isOpen,
  onClose,
  suggestions,
  isLoading,
  provider,
  model,
  isFallback,
  fallbackReason,
  onRefresh,
  onSelectSuggestion,
}: SuggestionDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-200 space-y-3 mb-2">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Lightbulb className="w-4 h-4 fill-amber-400/20" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-1.5">
              <h4 className="text-xs font-bold text-white">
                Gợi Ý Câu Giao Tiếp Theo Ngữ Cảnh
              </h4>
              <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300">
                Chủ động chọn
              </span>
              {provider && (
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.2 rounded-full border ${
                    provider === 'gemini'
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      : provider === 'cloudflare'
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                  title={model ? `Mô hình: ${model}` : undefined}
                >
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>
                    {provider === 'gemini'
                      ? 'Gemini Flash'
                      : provider === 'cloudflare'
                      ? 'Cloudflare Llama'
                      : 'Gợi ý Tình huống'}
                  </span>
                  {isFallback && (
                    <span className="text-amber-400 font-bold ml-0.5">• Dự phòng</span>
                  )}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-[11px] text-slate-400">
                Chọn một câu phù hợp để điền vào khung chat hoặc tham khảo cách diễn đạt
              </p>
              {isFallback && fallbackReason && (
                <span className="text-[10px] text-amber-300/90 italic hidden sm:inline">
                  • {fallbackReason}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors disabled:opacity-40"
            title="Tạo gợi ý khác"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-indigo-400' : ''}`} />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Đóng bảng gợi ý"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="py-8 flex flex-col items-center justify-center space-y-3 text-slate-400">
          <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
          <p className="text-xs">Đang phân tích cuộc hội thoại & gợi ý câu trả lời phù hợp...</p>
        </div>
      ) : suggestions.length === 0 ? (
        <div className="py-6 text-center text-xs text-slate-400">
          Chưa có gợi ý sẵn sàng. Bấm nút làm mới để tạo gợi ý!
        </div>
      ) : (
        /* Suggestion cards */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {suggestions.map((sug) => {
            const isFormal = sug.type === 'formal';
            const isCasual = sug.type === 'casual';

            const badgeBg = isFormal
              ? 'bg-blue-500/10 text-blue-300 border-blue-500/30'
              : isCasual
              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
              : 'bg-purple-500/10 text-purple-300 border-purple-500/30';

            const Icon = isFormal ? Sparkles : isCasual ? MessageSquare : HelpCircle;

            return (
              <div
                key={sug.id}
                className="group relative flex flex-col justify-between rounded-xl border border-slate-800/90 bg-slate-950/60 p-3.5 hover:border-indigo-500/40 hover:bg-slate-800/40 transition-all shadow-sm"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeBg}`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{sug.label}</span>
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-100 group-hover:text-white leading-relaxed">
                    "{sug.english}"
                  </p>

                  <p className="text-[11px] text-slate-400 italic leading-snug">
                    {sug.vietnamese}
                  </p>

                  {sug.explanation && (
                    <div className="flex items-start gap-1.5 pt-1 text-[10px] text-indigo-300/80 border-t border-slate-800/60">
                      <BookOpen className="w-3 h-3 shrink-0 mt-0.5 text-indigo-400" />
                      <span className="leading-tight">{sug.explanation}</span>
                    </div>
                  )}

                  {sug.keyVocabulary && sug.keyVocabulary.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {sug.keyVocabulary.map((kw, i) => (
                        <span
                          key={i}
                          className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => onSelectSuggestion(sug.english, false)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium transition-colors"
                    title="Chèn câu này vào ô nhập"
                  >
                    <CornerDownLeft className="w-3 h-3 text-indigo-400" />
                    <span>Dùng câu này</span>
                  </button>
                  <button
                    onClick={() => onSelectSuggestion(sug.english, true)}
                    className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold transition-colors shadow-sm"
                    title="Gửi ngay câu này"
                  >
                    <Send className="w-3 h-3" />
                    <span>Gửi luôn</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
