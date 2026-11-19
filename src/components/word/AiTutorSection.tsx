'use client';

import React from 'react';
import {
  Bot,
  MessageSquare,
  Zap,
  HelpCircle,
  FileText,
  Mail,
  ArrowRight,
} from 'lucide-react';
import { VocabularyWord } from '@/types/vocabulary';
import { useChat } from '@/contexts/ChatContext';
import { WordContext } from '@/lib/ai/types';

interface AiTutorSectionProps {
  word: VocabularyWord;
}

export function AiTutorSection({ word }: AiTutorSectionProps) {
  const { openChat } = useChat();

  const wordContext: WordContext = {
    word: word.word,
    category: word.category,
    level: word.level,
    meaning: word.deepMeaning?.coreConcept,
    ipa: word.pronunciation?.ipa,
    partOfSpeech: word.partOfSpeech,
    examples: [
      ...(word.examples?.business || []).slice(0, 2).map((e) => ({ english: e, vietnamese: '' })),
      ...(word.examples?.daily || []).slice(0, 1).map((e) => ({ english: e, vietnamese: '' })),
    ],
    etymology: {
      origin: word.etymology?.origin,
      evolution: word.etymology?.evolution,
    },
    toeicTips: {
      part5Traps: word.toeicContext?.tips ? [word.toeicContext.tips] : [],
      collocations: word.examples?.collocations || [],
      frequencyScore: word.toeicFrequency,
    },
    synonyms: word.synonyms,
    antonyms: word.antonyms,
  };

  const prompts = [
    {
      id: 'traps',
      icon: Zap,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30 hover:border-amber-500/60',
      label: 'Bẫy Part 5 & Lưu ý đề thi',
      question: `Chỉ ra các bẫy ngữ pháp và từ loại phổ biến nhất liên quan đến từ "${word.word}" trong bài thi TOEIC Part 5?`,
    },
    {
      id: 'email',
      icon: Mail,
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/30 hover:border-sky-500/60',
      label: '3 Ví dụ Email công sở',
      question: `Cho 3 câu ví dụ tình huống công việc thực tế (viết email, báo cáo, họp) sử dụng từ "${word.word}" kèm phân tích ngữ cảnh.`,
    },
    {
      id: 'synonyms',
      icon: HelpCircle,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500/60',
      label: 'Phân biệt từ đồng nghĩa',
      question: `So sánh sự khác nhau về sắc thái ("Nuance") giữa "${word.word}" và các từ gần nghĩa: ${(word.synonyms || []).slice(0, 3).join(', ') || 'các từ tương đương'}. Khi nào nên dùng từ nào?`,
    },
    {
      id: 'quiz',
      icon: FileText,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30 hover:border-purple-500/60',
      label: 'Tạo đề kiểm tra phản xạ',
      question: `Hãy ra 1 câu hỏi trắc nghiệm TOEIC Part 5 4 đáp án (A, B, C, D) kiểm tra cách dùng từ "${word.word}". Đưa ra giải thích chi tiết đáp án đúng và vì sao các đáp án còn lại sai.`,
    },
  ];

  const handleAsk = (question: string) => {
    openChat(question, wordContext);
  };

  return (
    <section className="rounded-3xl bg-gradient-to-br from-indigo-950/30 via-slate-900 to-violet-950/20 border border-indigo-500/30 p-6 sm:p-7 relative overflow-hidden shadow-lg shadow-indigo-950/20">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white tracking-tight">
                TOEIC AI Tutor • Trợ giảng AI cho &quot;{word.word}&quot;
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Hybrid AI
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Hỏi đáp ngữ pháp, bẫy Part 5 và câu ví dụ công sở tức thì
            </p>
          </div>
        </div>

        <button
          onClick={() => openChat(undefined, wordContext)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all self-start sm:self-auto"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Mở khung Chatbot</span>
          <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
        </button>
      </div>

      {/* Quick Interactive Prompt Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
        {prompts.map((p) => {
          const Icon = p.icon;
          return (
            <button
              key={p.id}
              onClick={() => handleAsk(p.question)}
              className={`flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all ${p.color} bg-slate-950/60 backdrop-blur-sm group`}
            >
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 shrink-0 group-hover:scale-110 transition-transform">
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                  {p.label}
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                  {p.question}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
