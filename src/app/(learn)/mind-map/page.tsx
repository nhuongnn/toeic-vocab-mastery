'use client';

import React, { Suspense, useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, Brain, PlusCircle } from 'lucide-react';
import { CategoryId, VocabularyWord } from '@/types/vocabulary';
import { allVocabularyWords, getWordById } from '@/data/vocabulary';
import { categories } from '@/data/categories';
import { findRootFamily, getRootFamilies } from '@/data/mind-map/rootFamilies';
import { useProgress } from '@/contexts/ProgressContext';
import {
  buildCategoryGraph,
  buildProgressGraph,
  buildRootFamilyGraph,
  buildWordExplorerGraph,
  expandWordNodeInGraph,
  findShortestPath,
} from '@/lib/mind-map/graphBuilder';
import {
  forceDirectedLayout,
  getCachedLayout,
  saveCachedLayout,
} from '@/lib/mind-map/layoutEngine';
import { computeFitView } from '@/lib/mind-map/interactions';
import { MindMapGraph, MindMapMode, MindMapNode, MindMapState } from '@/lib/mind-map/types';
import { MindMapCanvas } from '@/components/mind-map/MindMapCanvas';
import { MindMapControls } from '@/components/mind-map/MindMapControls';
import { MindMapNodeDetail } from '@/components/mind-map/MindMapNodeDetail';
import { MindMapLegend } from '@/components/mind-map/MindMapLegend';
import { MindMapMinimap } from '@/components/mind-map/MindMapMinimap';
import { MindMapEmptyState } from '@/components/mind-map/MindMapEmptyState';

function MindMapWorkspace() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { progress, isLoaded } = useProgress();

  const rootFamilies = useMemo(() => getRootFamilies(allVocabularyWords), []);

  // Resolve initial state from URL query params
  const initialWord = useMemo(() => {
    const param = searchParams.get('word');
    if (param) {
      const byId = getWordById(param);
      if (byId) return byId;
      const byWord = allVocabularyWords.find(
        (w) => w.word.toLowerCase() === param.toLowerCase()
      );
      if (byWord) return byWord;
    }
    return allVocabularyWords[0];
  }, [searchParams]);

  const initialMode: MindMapMode = useMemo(() => {
    const modeParam = searchParams.get('mode');
    if (searchParams.get('word')) return 'word-explorer';
    if (modeParam === 'category') return 'category-map';
    if (modeParam === 'root') return 'root-family';
    if (modeParam === 'progress') return 'progress-map';
    if (modeParam === 'explorer' || modeParam === 'word-explorer') return 'word-explorer';
    return 'word-explorer';
  }, [searchParams]);

  const initialCategory: CategoryId = useMemo(() => {
    const cat = searchParams.get('category') as CategoryId | null;
    if (cat && categories.some((c) => c.id === cat)) return cat;
    return 'office-admin';
  }, [searchParams]);

  const initialRoot: string = useMemo(() => {
    const r = searchParams.get('root');
    if (r) {
      const found = findRootFamily(r, allVocabularyWords);
      if (found) return found.root;
    }
    return rootFamilies[0]?.root || 'port';
  }, [searchParams, rootFamilies]);

  const [mode, setMode] = useState<MindMapMode>(initialMode);
  const [selectedWord, setSelectedWord] = useState<VocabularyWord>(initialWord);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>(initialCategory);
  const [selectedRoot, setSelectedRoot] = useState<string>(initialRoot);
  const [categoryLimit, setCategoryLimit] = useState<number>(12);

  const [viewport, setViewport] = useState({ width: 900, height: 600 });
  const [graphOverride, setGraphOverride] = useState<{
    key: string;
    graph: MindMapGraph;
  } | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null | undefined>(undefined);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [camera, setCamera] = useState<{ zoom: number; panX: number; panY: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const graphKey = useMemo(() => {
    if (mode === 'word-explorer') return `word_${selectedWord.id}`;
    if (mode === 'category-map') return `cat_${selectedCategory}_${categoryLimit}`;
    if (mode === 'root-family') return `root_${selectedRoot}`;
    return `progress_${Object.keys(progress.cards).length}`;
  }, [mode, selectedWord.id, selectedCategory, categoryLimit, selectedRoot, progress.cards]);

  // Build & layout graph declaratively
  const baseGraph = useMemo<MindMapGraph | null>(() => {
    if (!isLoaded) return null;

    let rawGraph: MindMapGraph;
    if (mode === 'word-explorer') {
      rawGraph = buildWordExplorerGraph(selectedWord, allVocabularyWords, progress.cards);
    } else if (mode === 'category-map') {
      const cat = categories.find((c) => c.id === selectedCategory);
      rawGraph = buildCategoryGraph(
        selectedCategory,
        cat?.name || selectedCategory,
        allVocabularyWords,
        progress.cards,
        categoryLimit
      );
    } else if (mode === 'root-family') {
      const family = findRootFamily(selectedRoot, allVocabularyWords) || rootFamilies[0];
      rawGraph = buildRootFamilyGraph(family, allVocabularyWords, progress.cards);
    } else {
      rawGraph = buildProgressGraph(allVocabularyWords, progress.cards);
    }

    const cached = getCachedLayout(graphKey, rawGraph);
    if (cached) return cached;

    const positioned = forceDirectedLayout(rawGraph, {
      width: 900,
      height: 600,
      iterations: 180,
    });
    saveCachedLayout(graphKey, positioned);
    return positioned;
  }, [
    isLoaded,
    mode,
    selectedWord,
    selectedCategory,
    categoryLimit,
    selectedRoot,
    rootFamilies,
    progress.cards,
    graphKey,
  ]);

  const graph = graphOverride?.key === graphKey ? graphOverride.graph : baseGraph;

  const activeCamera = useMemo(() => {
    if (camera) return camera;
    return computeFitView(graph, viewport.width, viewport.height);
  }, [camera, graph, viewport.width, viewport.height]);

  const activeSelectedNodeId =
    selectedNodeId === undefined ? (graph?.centerNodeId ?? null) : selectedNodeId;

  const resetInteractionState = useCallback(() => {
    setGraphOverride(null);
    setCamera(null);
    setSelectedNodeId(undefined);
    setSearchQuery('');
  }, []);

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
      setSelectedWord(word);
      setMode('word-explorer');
      resetInteractionState();
      router.replace(`/mind-map?word=${encodeURIComponent(word.id)}`, { scroll: false });
    },
    [router, resetInteractionState]
  );

  const handleDrillIn = useCallback(
    (node: MindMapNode) => {
      if (!node.wordId) return;
      const word = getWordById(node.wordId);
      if (word) {
        handleExploreWord(word);
      }
    },
    [handleExploreWord]
  );

  const handleExpandNode = useCallback(
    (nodeId: string) => {
      if (!graph) return;
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
      if (!graph) return;
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

  // Compute highlighted shortest path when searching
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
      mode,
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
      mode,
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
    mode === 'word-explorer' &&
      selectedNode &&
      selectedNode.wordId &&
      selectedNode.id !== graph?.centerNodeId &&
      !selectedNode.meta?.isExpanded
  );

  return (
    <div className="max-w-[1600px] mx-auto px-3 sm:px-6 py-4 space-y-3 h-[calc(100vh-5rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/categories"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Quay lại"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <Brain className="w-5 h-5 text-indigo-400" />
              <span>Vocabulary Mind Map</span>
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">
              Khám phá mạng lưới ngữ nghĩa, họ từ, gốc từ Latin/Greek &amp; tiến độ ghi nhớ SRS
            </p>
          </div>
        </div>

        {mode === 'category-map' && categoryLimit < 24 && (
          <button
            type="button"
            onClick={() => {
              setCategoryLimit(24);
              resetInteractionState();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-bold transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Hiện thêm từ</span>
          </button>
        )}
      </div>

      {/* Controls Bar */}
      <div className="shrink-0">
        <MindMapControls
          mode={mode}
          onModeChange={(nextMode) => {
            setMode(nextMode);
            resetInteractionState();
          }}
          selectedWord={selectedWord}
          onSelectWord={handleExploreWord}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setCategoryLimit(12);
            setSelectedCategory(cat);
            resetInteractionState();
          }}
          selectedRoot={selectedRoot}
          onSelectRoot={(r) => {
            setSelectedRoot(r);
            resetInteractionState();
          }}
          rootFamilies={rootFamilies}
          allWords={allVocabularyWords}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          zoom={activeCamera.zoom}
          onZoomIn={() =>
            setCamera({
              ...activeCamera,
              zoom: Math.min(activeCamera.zoom * 1.2, 3.0),
            })
          }
          onZoomOut={() =>
            setCamera({
              ...activeCamera,
              zoom: Math.max(activeCamera.zoom / 1.2, 0.3),
            })
          }
          onResetView={handleResetView}
          onFitView={handleFitView}
        />
      </div>

      {/* Main Workspace: Canvas + Node Detail Panel */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-3">
        {/* Canvas Container */}
        <div className="relative flex-1 min-h-[340px] rounded-2xl bg-slate-950/90 border border-slate-800/90 shadow-2xl overflow-hidden">
          {!isLoaded || !graph ? (
            <MindMapEmptyState
              isLoading={!isLoaded}
              onSelectSample={() => handleExploreWord(allVocabularyWords[0])}
            />
          ) : (
            <MindMapCanvas
              graph={graph}
              state={mindMapState}
              onSelectNode={setSelectedNodeId}
              onHoverNode={setHoveredNodeId}
              onPanZoomChange={(panX, panY, zoom) => setCamera({ panX, panY, zoom })}
              onDrillIn={handleDrillIn}
              onFitView={handleFitView}
              onViewportResize={handleViewportResize}
              onNodeMove={handleNodeMove}
            />
          )}

          {/* Legend Overlay (Bottom Left) */}
          <div className="absolute bottom-3 left-3 z-10 hidden sm:block">
            <MindMapLegend />
          </div>

          {/* Minimap Overlay (Bottom Right) */}
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

        {/* Slide-in Side Panel (Desktop) / Bottom Sheet (Mobile) */}
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
      </div>
    </div>
  );
}

function MindMapWithKey() {
  const searchParams = useSearchParams();
  return <MindMapWorkspace key={searchParams.toString()} />;
}

export default function MindMapPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-12">
          <MindMapEmptyState isLoading />
        </div>
      }
    >
      <MindMapWithKey />
    </Suspense>
  );
}
