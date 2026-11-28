'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  X,
  Brain,
  Sparkles,
  RefreshCw,
  Search,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Expand,
  Volume2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { CustomVocabItem, CustomVocabMindMapData } from '@/types/custom-vocab';
import { VocabularyWord } from '@/types/vocabulary';
import { allVocabularyWords, getWordById } from '@/data/vocabulary';
import { useProgress } from '@/contexts/ProgressContext';
import { useAuth } from '@/contexts/AuthContext';
import { useSpeech } from '@/hooks/useSpeech';
import { getGuestId } from '@/lib/ai/guest-id';
import { getWordMindMapUrl } from '@/lib/vocabulary-helpers';
import { isEligibleForVocabMindMap } from '@/lib/mind-map/customVocabMindMap';
import {
  buildCustomVocabGraph,
  expandWordNodeInGraph,
  findShortestPath,
} from '@/lib/mind-map/graphBuilder';
import {
  forceDirectedLayout,
  getCachedLayout,
  saveCachedLayout,
} from '@/lib/mind-map/layoutEngine';
import { computeFitView } from '@/lib/mind-map/interactions';
import { MindMapGraph, MindMapState } from '@/lib/mind-map/types';
import { MindMapCanvas } from '@/components/mind-map/MindMapCanvas';
import { MindMapLegend } from '@/components/mind-map/MindMapLegend';
import { MindMapMinimap } from '@/components/mind-map/MindMapMinimap';
import { MindMapNodeDetail } from '@/components/mind-map/MindMapNodeDetail';

interface CustomVocabMindMapModalProps {
  item: CustomVocabItem | null;
  onClose: () => void;
}

export function CustomVocabMindMapModal({ item, onClose }: CustomVocabMindMapModalProps) {
  if (!item) return null;
  return <CustomVocabMindMapModalContent key={item.id} item={item} onClose={onClose} />;
}

function CustomVocabMindMapModalContent({
  item,
  onClose,
}: {
  item: CustomVocabItem;
  onClose: () => void;
}) {
  const router = useRouter();
  const { progress, updateCustomItem } = useProgress();
  const { user } = useAuth();
  const { speak } = useSpeech();

  const isEligible = isEligibleForVocabMindMap(item);
  const [isGenerating, setIsGenerating] = useState(() => isEligible && !item.mindMap);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fallbackNotice, setFallbackNotice] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Canvas & interaction state
  const [viewport, setViewport] = useState({ width: 820, height: 520 });
  const [graphOverride, setGraphOverride] = useState<{
    key: string;
    graph: MindMapGraph;
  } | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null | undefined>(undefined);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [camera, setCamera] = useState<{ zoom: number; panX: number; panY: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const autoTriggeredRef = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const resetViewState = useCallback(() => {
    setGraphOverride(null);
    setCamera(null);
    setSelectedNodeId(undefined);
    setHoveredNodeId(null);
    setSearchQuery('');
  }, []);

  const runMindMapGeneration = useCallback(
    async (targetItem: CustomVocabItem, fromInitialEffect = false) => {
      if (!isEligibleForVocabMindMap(targetItem)) {
        if (!fromInitialEffect) {
          setErrorMsg(
            'Tính năng tạo Vocab Mind Map bằng AI chỉ áp dụng cho Từ vựng, không áp dụng cho Mẫu câu.'
          );
        }
        return;
      }

      if (!fromInitialEffect) {
        setIsGenerating(true);
        setErrorMsg(null);
        setFallbackNotice(null);
      }

      try {
        const guestId = !user ? getGuestId() : undefined;
        const res = await fetch('/api/custom-vocab/mind-map', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(user?.id ? { 'x-user-id': user.id } : {}),
            ...(user?.email ? { 'x-user-email': user.email } : {}),
            ...(guestId ? { 'x-guest-id': guestId } : {}),
          },
          body: JSON.stringify({
            text: targetItem.text,
            type: targetItem.type,
            explanation: targetItem.explanation,
            context: targetItem.context,
            ipa: targetItem.ipa,
            partOfSpeech: targetItem.partOfSpeech,
            userId: user?.id,
            userEmail: user?.email,
            guestId,
          }),
        });

        const data = await res.json();
        if (!res.ok || !data.mindMap) {
          throw new Error(data.error || 'Không thể tạo Vocab Mind Map bằng AI.');
        }

        const mindMap = data.mindMap as CustomVocabMindMapData;
        await updateCustomItem(targetItem.id, {
          mindMap,
          ...(!targetItem.ipa && mindMap.ipa ? { ipa: mindMap.ipa } : {}),
          ...(!targetItem.partOfSpeech && mindMap.partOfSpeech
            ? { partOfSpeech: mindMap.partOfSpeech }
            : {}),
        });

        if (!mountedRef.current) return;
        resetViewState();

        if (data.isFallback && data.fallbackReason) {
          setFallbackNotice(data.fallbackReason);
        }
      } catch (err) {
        if (!mountedRef.current) return;
        const msg =
          err instanceof Error ? err.message : 'Gặp lỗi khi tạo Vocab Mind Map bằng AI.';
        setErrorMsg(msg);
      } finally {
        if (mountedRef.current) {
          setIsGenerating(false);
        }
      }
    },
    [user, updateCustomItem, resetViewState]
  );

  // Auto-generate once on mount if the vocabulary item has no saved Mind Map yet
  useEffect(() => {
    if (isEligible && !item.mindMap && !autoTriggeredRef.current) {
      autoTriggeredRef.current = true;
      void runMindMapGeneration(item, true);
    }
  }, [isEligible, item, runMindMapGeneration]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const graphKey = useMemo(() => {
    if (!item.mindMap) return '';
    return `custom_${item.id}_${item.mindMap.generatedAt}`;
  }, [item.id, item.mindMap]);

  const baseGraph = useMemo<MindMapGraph | null>(() => {
    if (item.type !== 'vocabulary' || !item.mindMap) return null;

    const rawGraph = buildCustomVocabGraph(item, allVocabularyWords, progress.cards);
    const cached = graphKey ? getCachedLayout(graphKey, rawGraph) : null;
    if (cached) return cached;

    const positioned = forceDirectedLayout(rawGraph, {
      width: 900,
      height: 600,
      iterations: 180,
    });
    if (graphKey) {
      saveCachedLayout(graphKey, positioned);
    }
    return positioned;
  }, [item, progress.cards, graphKey]);

  const graph = graphOverride?.key === graphKey ? graphOverride.graph : baseGraph;

  const activeCamera = useMemo(() => {
    if (camera) return camera;
    return computeFitView(graph, viewport.width, viewport.height);
  }, [camera, graph, viewport.width, viewport.height]);

  const activeSelectedNodeId =
    selectedNodeId === undefined ? (graph?.centerNodeId ?? null) : selectedNodeId;

  const highlightedPath = useMemo(() => {
    if (!graph || !searchQuery.trim()) return [];
    const q = searchQuery.trim().toLowerCase();
    const match = graph.nodes.find(
      (n) => n.id !== graph.centerNodeId && n.label.toLowerCase().includes(q)
    );
    if (!match) return [];
    return findShortestPath(graph, graph.centerNodeId, match.id);
  }, [graph, searchQuery]);

  const mindMapState: MindMapState = useMemo(
    () => ({
      mode: 'word-explorer',
      graph,
      selectedNodeId: activeSelectedNodeId,
      hoveredNodeId,
      zoom: activeCamera.zoom,
      panX: activeCamera.panX,
      panY: activeCamera.panY,
      isAnimating: false,
      searchQuery,
      highlightedPath,
    }),
    [
      graph,
      activeSelectedNodeId,
      hoveredNodeId,
      activeCamera,
      searchQuery,
      highlightedPath,
    ]
  );

  const selectedNode = useMemo(
    () => graph?.nodes.find((n) => n.id === activeSelectedNodeId) ?? null,
    [graph, activeSelectedNodeId]
  );

  const selectedNodeWord = useMemo(
    () => (selectedNode?.wordId ? getWordById(selectedNode.wordId) : undefined),
    [selectedNode]
  );

  const canExpandSelected = Boolean(
    selectedNode &&
      selectedNode.wordId &&
      selectedNode.id !== graph?.centerNodeId &&
      !selectedNode.meta?.isExpanded
  );

  const handleViewportResize = useCallback((width: number, height: number) => {
    setViewport((prev) =>
      prev.width === width && prev.height === height ? prev : { width, height }
    );
  }, []);

  const handleFitView = useCallback(() => {
    if (!graph) return;
    setCamera(computeFitView(graph, viewport.width, viewport.height));
  }, [graph, viewport]);

  const handleResetView = useCallback(() => {
    handleFitView();
    setSearchQuery('');
  }, [handleFitView]);

  const handleExploreWord = useCallback(
    (word: VocabularyWord) => {
      onClose();
      router.push(getWordMindMapUrl(word.id, '/notebook'));
    },
    [onClose, router]
  );

  const handleExpandNode = useCallback(
    (nodeId: string) => {
      if (!graph || !graphKey) return;
      const expanded = expandWordNodeInGraph(graph, nodeId, allVocabularyWords, progress.cards);
      const laidOut = forceDirectedLayout(expanded, {
        width: viewport.width,
        height: viewport.height,
        iterations: 80,
      });
      setGraphOverride({ key: graphKey, graph: laidOut });
    },
    [graph, graphKey, progress.cards, viewport]
  );

  const handleNodeMove = useCallback(
    (nodeId: string, x: number, y: number) => {
      if (!graph || !graphKey) return;
      const updated: MindMapGraph = {
        ...graph,
        nodes: graph.nodes.map((n) =>
          n.id === nodeId ? { ...n, x, y, fx: x, fy: y } : n
        ),
      };
      setGraphOverride({ key: graphKey, graph: updated });
    },
    [graph, graphKey]
  );

  const providerLabel =
    item.mindMap?.provider === 'gemini'
      ? 'Gemini AI'
      : item.mindMap?.provider === 'cloudflare'
        ? 'Cloudflare AI'
        : item.mindMap?.provider === 'fallback'
          ? 'Từ điển dự phòng'
          : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className={`relative bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all ${
          isFullscreen
            ? 'w-[98vw] h-[94vh]'
            : 'w-full max-w-6xl h-[88vh] max-h-[820px]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-5 py-3.5 border-b border-slate-800 bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 flex items-center justify-center shrink-0">
              <Brain className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-sm sm:text-base font-extrabold text-white truncate">
                  Vocab Mind Map: &ldquo;{item.text}&rdquo;
                </h2>
                {(item.mindMap?.ipa || item.ipa) && (
                  <span className="text-xs font-mono text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/25">
                    {item.mindMap?.ipa || item.ipa}
                  </span>
                )}
                {providerLabel && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                    <Sparkles className="w-2.5 h-2.5" />
                    {providerLabel}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 truncate">
                Mạng lưới đồng nghĩa, trái nghĩa, họ từ, collocation &amp; từ liên quan cho sổ tay
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => speak(item.text)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-white transition-colors"
              title="Nghe phát âm"
            >
              <Volume2 className="w-4 h-4" />
            </button>

            {isEligible && (
              <button
                type="button"
                disabled={isGenerating}
                onClick={() => void runMindMapGeneration(item, false)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-purple-600/25 transition-all"
                title="Tạo mới lại sơ đồ từ vựng bằng AI"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Đang tạo...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{item.mindMap ? 'Tạo lại AI' : 'Tạo Mind Map AI'}</span>
                  </>
                )}
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsFullscreen((prev) => !prev)}
              className="hidden sm:inline-flex p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title={isFullscreen ? 'Thu gọn cửa sổ' : 'Toàn màn hình'}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Expand className="w-4 h-4" />
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Đóng (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Toolbar (Search & Zoom) when graph is ready */}
        {isEligible && graph && (
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 border-b border-slate-800/80 bg-slate-900/90 shrink-0">
            <div className="relative flex-1 min-w-[180px] max-w-xs">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Lọc node trên Mind Map..."
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-8 pr-7 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  aria-label="Xóa lọc"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800 rounded-xl p-1">
              <button
                type="button"
                onClick={() =>
                  setCamera({
                    ...activeCamera,
                    zoom: Math.max(activeCamera.zoom / 1.2, 0.3),
                  })
                }
                className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
                title="Thu nhỏ"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono font-bold text-slate-300 px-1.5 min-w-[42px] text-center">
                {Math.round(activeCamera.zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={() =>
                  setCamera({
                    ...activeCamera,
                    zoom: Math.min(activeCamera.zoom * 1.2, 3.0),
                  })
                }
                className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
                title="Phóng to"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <div className="w-px h-4 bg-slate-800 mx-0.5" />
              <button
                type="button"
                onClick={handleResetView}
                className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
                title="Đặt lại góc nhìn"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleFitView}
                className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
                title="Vừa khung hình"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Notifications */}
        {(errorMsg || fallbackNotice) && (
          <div className="px-4 pt-2.5 shrink-0 space-y-2">
            {errorMsg && (
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
                {isEligible && (
                  <button
                    type="button"
                    onClick={() => void runMindMapGeneration(item, false)}
                    className="px-2.5 py-1 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-white font-semibold shrink-0"
                  >
                    Thử lại
                  </button>
                )}
              </div>
            )}
            {fallbackNotice && (
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{fallbackNotice}</span>
              </div>
            )}
          </div>
        )}

        {/* Body */}
        <div className="flex-1 min-h-0 p-3 sm:p-4 flex flex-col lg:flex-row gap-3">
          {!isEligible ? (
            <div className="flex-1 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col items-center justify-center p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-400 flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">
                Không áp dụng cho loại Mẫu câu
              </h3>
              <p className="text-xs text-slate-400 max-w-md leading-relaxed">
                Tính năng tạo Vocab Mind Map bằng AI chỉ hỗ trợ các mục phân loại{' '}
                <strong className="text-indigo-300">Từ vựng (Vocabulary)</strong> trong Sổ tay.
              </p>
            </div>
          ) : !graph && isGenerating ? (
            <div className="flex-1 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="relative w-16 h-16 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300">
                <Brain className="w-8 h-8 animate-pulse" />
                <Sparkles className="w-4 h-4 text-amber-400 absolute -top-1.5 -right-1.5 animate-bounce" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-white">
                  AI đang xây dựng Vocab Mind Map...
                </h3>
                <p className="text-xs text-slate-400 max-w-md leading-relaxed">
                  Đang phân tích từ đồng nghĩa, trái nghĩa, họ từ (word family), collocations và
                  từ liên quan trong ngữ cảnh TOEIC cho{' '}
                  <strong className="text-purple-300">&ldquo;{item.text}&rdquo;</strong>.
                </p>
              </div>
            </div>
          ) : !graph ? (
            <div className="flex-1 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400">
                <Brain className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">
                  Chưa có Mind Map cho từ &ldquo;{item.text}&rdquo;
                </h3>
                <p className="text-xs text-slate-400 max-w-md">
                  Nhấn nút bên dưới để AI tự động vẽ sơ đồ tư duy từ vựng và lưu vào sổ tay của bạn.
                </p>
              </div>
              <button
                type="button"
                disabled={isGenerating}
                onClick={() => void runMindMapGeneration(item, false)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/25 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Tạo Mind Map bằng AI</span>
              </button>
            </div>
          ) : (
            <>
              <div className="relative flex-1 min-h-[300px] rounded-2xl bg-slate-950/90 border border-slate-800/90 shadow-inner overflow-hidden">
                <MindMapCanvas
                  graph={graph}
                  state={mindMapState}
                  onSelectNode={setSelectedNodeId}
                  onHoverNode={setHoveredNodeId}
                  onPanZoomChange={(panX, panY, zoom) => setCamera({ panX, panY, zoom })}
                  onDrillIn={(node) => {
                    if (node.wordId) {
                      const w = getWordById(node.wordId);
                      if (w) handleExploreWord(w);
                    }
                  }}
                  onFitView={handleFitView}
                  onViewportResize={handleViewportResize}
                  onNodeMove={handleNodeMove}
                />

                <div className="absolute bottom-3 left-3 z-10 hidden sm:block">
                  <MindMapLegend />
                </div>

                <div className="absolute bottom-3 right-3 z-10 hidden md:block">
                  <MindMapMinimap
                    graph={graph}
                    zoom={activeCamera.zoom}
                    panX={activeCamera.panX}
                    panY={activeCamera.panY}
                    viewportWidth={viewport.width}
                    viewportHeight={viewport.height}
                    onPanTo={(panX, panY) => setCamera({ ...activeCamera, panX, panY })}
                  />
                </div>
              </div>

              {selectedNode && (
                <MindMapNodeDetail
                  node={selectedNode}
                  word={selectedNodeWord}
                  graph={graph}
                  srsCard={selectedNodeWord ? progress.cards[selectedNodeWord.id] : undefined}
                  canExpand={canExpandSelected}
                  onClose={() => setSelectedNodeId(null)}
                  onExploreWord={handleExploreWord}
                  onExpandNode={handleExpandNode}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
