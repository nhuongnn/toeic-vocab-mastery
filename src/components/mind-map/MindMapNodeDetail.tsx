'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  X,
  Volume2,
  Compass,
  ArrowRight,
  GitFork,
  CheckCircle2,
  Sparkles,
  Tag,
  Layers,
  Lightbulb,
  BookOpen,
} from 'lucide-react';
import { VocabularyWord } from '@/types/vocabulary';
import { SRSCard } from '@/types/progress';
import { MindMapGraph, MindMapNode, NODE_TYPE_LABELS } from '@/lib/mind-map/types';
import { extractMindMapLookupTerms } from '@/lib/mind-map/lookup';
import { categories } from '@/data/categories';
import { useSpeech } from '@/hooks/useSpeech';
import { useProgress } from '@/contexts/ProgressContext';
import { DictionaryLinks } from '@/components/word/DictionaryLinks';

interface MindMapNodeDetailProps {
  node: MindMapNode | null;
  word: VocabularyWord | undefined;
  graph: MindMapGraph | null;
  srsCard: SRSCard | undefined;
  canExpand: boolean;
  onClose: () => void;
  onExploreWord: (word: VocabularyWord) => void;
  onExpandNode: (nodeId: string) => void;
}

export function MindMapNodeDetail({
  node,
  word,
  graph,
  srsCard,
  canExpand,
  onClose,
  onExploreWord,
  onExpandNode,
}: MindMapNodeDetailProps) {
  const { speak } = useSpeech();
  const { recordReview } = useProgress();
  const [justReviewed, setJustReviewed] = useState(false);

  if (!node) return null;

  const categoryInfo = word
    ? categories.find((c) => c.id === word.category)
    : node.meta?.category
      ? categories.find((c) => c.id === node.meta?.category)
      : undefined;

  const connectedEdges = graph
    ? graph.edges.filter((e) => e.source === node.id || e.target === node.id)
    : [];

  const lookupTerms = !word
    ? extractMindMapLookupTerms(node.label, node.type)
    : [];

  const synCount = word?.synonyms?.length ?? 0;
  const antCount = word?.antonyms?.length ?? 0;
  const collCount = word?.examples?.collocations?.length ?? 0;

  const srsLabel =
    node.srsStatus === 'mastered'
      ? 'Mastered'
      : node.srsStatus === 'learning'
        ? `Learning (Rep ${srsCard?.repetitions ?? 1})`
        : 'New Word';

  const srsPercent =
    node.srsStatus === 'mastered'
      ? 100
      : node.srsStatus === 'learning'
        ? Math.min(90, 20 + (srsCard?.repetitions ?? 1) * 15)
        : 0;

  const handleMarkReviewed = (quality: number) => {
    if (!word) return;
    recordReview(word.id, quality);
    setJustReviewed(true);
    setTimeout(() => setJustReviewed(false), 2500);
  };

  return (
    <aside className="w-full lg:w-88 shrink-0 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-800 shadow-2xl p-4 sm:p-5 space-y-4 overflow-y-auto max-h-[55vh] lg:max-h-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: node.color }}
            />
            <span>{NODE_TYPE_LABELS[node.type]}</span>
          </div>
          <h2 className="text-xl font-black text-white break-words">{node.label}</h2>
          {word?.pronunciation?.ipa ? (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-mono text-indigo-300">
                {word.pronunciation.ipa}
              </span>
              <button
                type="button"
                onClick={() => speak(word.word)}
                className="p-1 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/30 text-indigo-300 transition-colors"
                title="Nghe phát âm"
                aria-label="Nghe phát âm"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : !word && (node.meta?.ipa || lookupTerms.length > 0 || node.type === 'center') ? (
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {node.meta?.ipa && (
                <span className="text-xs font-mono text-indigo-300">{node.meta.ipa}</span>
              )}
              {node.meta?.posLabel && (
                <span className="text-[11px] font-mono text-violet-300 bg-violet-500/15 px-2 py-0.5 rounded-md border border-violet-500/25">
                  {node.meta.posLabel}
                </span>
              )}
              {!node.meta?.posLabel && node.meta?.partOfSpeech && node.meta.partOfSpeech.length > 0 && (
                <span className="text-[11px] text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded-md border border-amber-500/25">
                  {node.meta.partOfSpeech.join(', ')}
                </span>
              )}
              {(lookupTerms.length > 0 || node.type === 'center') && (
                <button
                  type="button"
                  onClick={() => speak(lookupTerms[0] || node.label)}
                  className="p-1 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/30 text-indigo-300 transition-colors"
                  title="Nghe phát âm"
                  aria-label="Nghe phát âm"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ) : null}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors shrink-0"
          aria-label="Đóng chi tiết"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Word metadata */}
      {word && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/90 text-slate-200 font-semibold">
            <Tag className="w-3 h-3 text-indigo-400" />
            {word.partOfSpeech.join(', ')} • {word.level}
          </span>
          {categoryInfo && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/90 text-slate-300">
              <Layers className="w-3 h-3 text-purple-400" />
              {categoryInfo.name}
            </span>
          )}
        </div>
      )}

      {/* Root meaning if root-family center or root node */}
      {node.meta?.rootMeaning && (
        <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs text-orange-200 space-y-1">
          <div className="font-bold uppercase tracking-wider text-[10px] text-orange-400">
            Gốc từ ({node.meta.origin || 'Classical'})
          </div>
          <p>{node.meta.rootMeaning}</p>
        </div>
      )}

      {/* Core Concept */}
      {(word?.deepMeaning?.coreConcept || node.meta?.coreConcept) && (
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-400">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>{word ? 'Core Concept' : 'Ý nghĩa & Khái niệm'}</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            {word?.deepMeaning?.coreConcept || node.meta?.coreConcept}
          </p>
        </div>
      )}

      {/* External Dictionary Links for nodes not in the system's current vocabulary list */}
      {!word && (lookupTerms.length > 0 || node.id.startsWith('custom:')) && (
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2.5">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-400">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Tra cứu từ điển</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            {node.id.startsWith('custom:')
              ? 'Tra nhanh từ vựng trong Sổ tay trên Cambridge hoặc Oxford:'
              : 'Từ/cụm từ này chưa thuộc danh sách từ vựng hiện tại của hệ thống. Tra nhanh trên Cambridge hoặc Oxford:'}
          </p>
          {(lookupTerms.length > 0 ? lookupTerms : [node.label]).length === 1 ? (
            <DictionaryLinks
              word={(lookupTerms.length > 0 ? lookupTerms : [node.label])[0]}
              variant="buttons"
            />
          ) : (
            <div className="space-y-1.5">
              {lookupTerms.map((term) => (
                <div
                  key={term}
                  className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800/80"
                >
                  <span className="text-xs font-semibold text-slate-200 truncate">
                    {term}
                  </span>
                  <DictionaryLinks
                    word={term}
                    variant="inline"
                    showLabel={false}
                    className="shrink-0"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Connections summary */}
      <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5 text-xs">
        <div className="font-bold text-slate-200">
          Liên kết trên bản đồ: {connectedEdges.length}
        </div>
        {word && (
          <div className="grid grid-cols-3 gap-2 pt-1 text-[11px] text-slate-400">
            <div>
              <span className="text-emerald-400 font-bold">{synCount}</span> đồng nghĩa
            </div>
            <div>
              <span className="text-red-400 font-bold">{antCount}</span> trái nghĩa
            </div>
            <div>
              <span className="text-sky-400 font-bold">{collCount}</span> collocations
            </div>
          </div>
        )}
      </div>

      {/* SRS Status */}
      {word && (
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-300">SRS: {srsLabel}</span>
            <span className="font-mono text-indigo-400">{srsPercent}%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
              style={{ width: `${srsPercent}%` }}
            />
          </div>
          <div className="pt-1 flex items-center gap-2">
            {node.srsStatus === 'new' ? (
              <button
                type="button"
                onClick={() => handleMarkReviewed(3)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{justReviewed ? 'Đã thêm vào SRS!' : 'Start Learning'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleMarkReviewed(4)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-bold transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{justReviewed ? 'Đã ghi nhận!' : 'Mark as Reviewed'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {word && (
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onExploreWord(word)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shadow-lg shadow-indigo-600/20"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Explore This Word</span>
            </button>

            {canExpand && (
              <button
                type="button"
                onClick={() => onExpandNode(node.id)}
                className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
                title="Mở rộng liên kết bậc 2"
              >
                <GitFork className="w-3.5 h-3.5 text-amber-400" />
                <span>Mở rộng</span>
              </button>
            )}
          </div>

          <Link
            href={`/word/${word.id}`}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white text-xs font-bold transition-colors"
          >
            <span>Xem chi tiết đầy đủ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </aside>
  );
}
