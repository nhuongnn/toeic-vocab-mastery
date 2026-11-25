'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MindMapGraph, MindMapNode, MindMapState } from '@/lib/mind-map/types';
import { renderMindMap } from '@/lib/mind-map/canvasRenderer';
import { hitTestNode, screenToWorld } from '@/lib/mind-map/interactions';

interface MindMapCanvasProps {
  graph: MindMapGraph | null;
  state: MindMapState;
  onSelectNode: (nodeId: string | null) => void;
  onHoverNode: (nodeId: string | null) => void;
  onPanZoomChange: (panX: number, panY: number, zoom: number) => void;
  onDrillIn: (node: MindMapNode) => void;
  onFitView: () => void;
  onViewportResize?: (width: number, height: number) => void;
  onNodeMove?: (nodeId: string, x: number, y: number) => void;
}

export function MindMapCanvas({
  graph,
  state,
  onSelectNode,
  onHoverNode,
  onPanZoomChange,
  onDrillIn,
  onFitView,
  onViewportResize,
  onNodeMove,
}: MindMapCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    node: MindMapNode;
  } | null>(null);

  const stateRef = useRef(state);
  const graphRef = useRef(graph);
  const sizeRef = useRef(size);

  useEffect(() => {
    stateRef.current = state;
    graphRef.current = graph;
    sizeRef.current = size;
  });

  const entranceStartRef = useRef<number>(0);
  const prevCenterRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (graph?.centerNodeId !== prevCenterRef.current) {
      prevCenterRef.current = graph?.centerNodeId;
      entranceStartRef.current = performance.now();
    }
  }, [graph?.centerNodeId]);

  // Drag / Pan / Pinch refs
  const dragModeRef = useRef<'none' | 'pan' | 'node'>('none');
  const draggedNodeIdRef = useRef<string | null>(null);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const pointerDownPosRef = useRef({ x: 0, y: 0 });
  const pinchDistRef = useRef<number | null>(null);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);

  // ResizeObserver for responsive HiDPI canvas
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(Math.floor(rect.width), 300);
      const h = Math.max(Math.floor(rect.height), 320);
      setSize({ width: w, height: h });
      onViewportResize?.(w, h);
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(container);
    return () => observer.disconnect();
  }, [onViewportResize]);

  // Animation render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    let rafId = 0;

    const renderFrame = (now: number) => {
      const { width, height } = sizeRef.current;
      const dpr = window.devicePixelRatio || 1;
      if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const currentGraph = graphRef.current;
      if (currentGraph) {
        const elapsed = now - entranceStartRef.current;
        const entranceProgress = reducedMotion ? 1 : Math.min(elapsed / 420, 1);

        renderMindMap(ctx, currentGraph, stateRef.current, {
          width,
          height,
          timeMs: now,
          entranceProgress,
          reducedMotion,
        });
      } else {
        ctx.clearRect(0, 0, width, height);
      }

      rafId = requestAnimationFrame(renderFrame);
    };

    rafId = requestAnimationFrame(renderFrame);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const getLocalCoords = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }, []);

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getLocalCoords(e.clientX, e.clientY);
    pointerDownPosRef.current = { x, y };
    lastPointerRef.current = { x, y };

    const world = screenToWorld(x, y, state.panX, state.panY, state.zoom);
    const hit = hitTestNode(graph, world.x, world.y);

    if (hit) {
      dragModeRef.current = 'node';
      draggedNodeIdRef.current = hit.id;
    } else {
      dragModeRef.current = 'pan';
      draggedNodeIdRef.current = null;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getLocalCoords(e.clientX, e.clientY);
    const dx = x - lastPointerRef.current.x;
    const dy = y - lastPointerRef.current.y;
    lastPointerRef.current = { x, y };

    if (dragModeRef.current === 'pan') {
      onPanZoomChange(state.panX + dx, state.panY + dy, state.zoom);
      setTooltip(null);
      return;
    }

    if (dragModeRef.current === 'node' && draggedNodeIdRef.current && graph) {
      const world = screenToWorld(x, y, state.panX, state.panY, state.zoom);
      onNodeMove?.(draggedNodeIdRef.current, world.x, world.y);
      setTooltip(null);
      return;
    }

    // Hover detection
    const world = screenToWorld(x, y, state.panX, state.panY, state.zoom);
    const hit = hitTestNode(graph, world.x, world.y);
    onHoverNode(hit ? hit.id : null);
    if (hit) {
      setTooltip({ x, y, node: hit });
    } else {
      setTooltip(null);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getLocalCoords(e.clientX, e.clientY);
    const dist = Math.hypot(x - pointerDownPosRef.current.x, y - pointerDownPosRef.current.y);

    if (dist < 5) {
      const world = screenToWorld(x, y, state.panX, state.panY, state.zoom);
      const hit = hitTestNode(graph, world.x, world.y);
      onSelectNode(hit ? hit.id : null);
    }

    dragModeRef.current = 'none';
    draggedNodeIdRef.current = null;
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getLocalCoords(e.clientX, e.clientY);
    const world = screenToWorld(x, y, state.panX, state.panY, state.zoom);
    const hit = hitTestNode(graph, world.x, world.y);
    if (hit) {
      onDrillIn(hit);
    } else {
      onFitView();
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const { x, y } = getLocalCoords(e.clientX, e.clientY);
    const factor = e.deltaY < 0 ? 1.1 : 0.9;
    const nextZoom = Math.min(Math.max(state.zoom * factor, 0.3), 3.0);
    const scaleRatio = nextZoom / state.zoom;

    // Zoom centered on cursor
    const nextPanX = x - (x - state.panX) * scaleRatio;
    const nextPanY = y - (y - state.panY) * scaleRatio;
    onPanZoomChange(nextPanX, nextPanY, nextZoom);
  };

  // Touch handlers (1-finger pan/tap/long-press, 2-finger pinch zoom)
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      pinchDistRef.current = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      dragModeRef.current = 'none';
      return;
    }

    if (e.touches.length === 1) {
      const t = e.touches[0];
      const { x, y } = getLocalCoords(t.clientX, t.clientY);
      pointerDownPosRef.current = { x, y };
      lastPointerRef.current = { x, y };

      const world = screenToWorld(x, y, state.panX, state.panY, state.zoom);
      const hit = hitTestNode(graph, world.x, world.y);

      if (hit) {
        dragModeRef.current = 'node';
        draggedNodeIdRef.current = hit.id;
        longPressTimerRef.current = setTimeout(() => {
          onDrillIn(hit);
          dragModeRef.current = 'none';
        }, 550);
      } else {
        dragModeRef.current = 'pan';
        draggedNodeIdRef.current = null;
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    if (e.touches.length === 2 && pinchDistRef.current !== null) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const mid = getLocalCoords((t1.clientX + t2.clientX) / 2, (t1.clientY + t2.clientY) / 2);
      const factor = dist / pinchDistRef.current;
      pinchDistRef.current = dist;

      const nextZoom = Math.min(Math.max(state.zoom * factor, 0.3), 3.0);
      const ratio = nextZoom / state.zoom;
      onPanZoomChange(
        mid.x - (mid.x - state.panX) * ratio,
        mid.y - (mid.y - state.panY) * ratio,
        nextZoom
      );
      return;
    }

    if (e.touches.length === 1) {
      const t = e.touches[0];
      const { x, y } = getLocalCoords(t.clientX, t.clientY);
      const dx = x - lastPointerRef.current.x;
      const dy = y - lastPointerRef.current.y;
      lastPointerRef.current = { x, y };

      if (dragModeRef.current === 'pan') {
        onPanZoomChange(state.panX + dx, state.panY + dy, state.zoom);
      } else if (dragModeRef.current === 'node' && draggedNodeIdRef.current) {
        const world = screenToWorld(x, y, state.panX, state.panY, state.zoom);
        onNodeMove?.(draggedNodeIdRef.current, world.x, world.y);
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    pinchDistRef.current = null;

    if (e.changedTouches.length === 1 && dragModeRef.current !== 'none') {
      const t = e.changedTouches[0];
      const { x, y } = getLocalCoords(t.clientX, t.clientY);
      const dist = Math.hypot(x - pointerDownPosRef.current.x, y - pointerDownPosRef.current.y);
      if (dist < 8) {
        const world = screenToWorld(x, y, state.panX, state.panY, state.zoom);
        const hit = hitTestNode(graph, world.x, world.y);
        onSelectNode(hit ? hit.id : null);
      }
    }

    dragModeRef.current = 'none';
    draggedNodeIdRef.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLCanvasElement>) => {
    if (!graph || graph.nodes.length === 0) return;

    if (e.key === 'Escape') {
      onSelectNode(null);
      return;
    }

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'Tab') {
      e.preventDefault();
      const idx = graph.nodes.findIndex((n) => n.id === state.selectedNodeId);
      const nextIdx = (idx + 1) % graph.nodes.length;
      onSelectNode(graph.nodes[nextIdx].id);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = graph.nodes.findIndex((n) => n.id === state.selectedNodeId);
      const prevIdx = idx <= 0 ? graph.nodes.length - 1 : idx - 1;
      onSelectNode(graph.nodes[prevIdx].id);
    } else if (e.key === 'Enter' && state.selectedNodeId) {
      const selected = graph.nodes.find((n) => n.id === state.selectedNodeId);
      if (selected) onDrillIn(selected);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        tabIndex={0}
        role="application"
        aria-label="Interactive Vocabulary Mind Map Canvas. Use arrow keys or Tab to navigate nodes, Enter to explore, Escape to deselect."
        style={{ width: size.width, height: size.height, touchAction: 'none' }}
        className={`block outline-none ${
          state.hoveredNodeId ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          dragModeRef.current = 'none';
          onHoverNode(null);
          setTooltip(null);
        }}
        onDoubleClick={handleDoubleClick}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
      />

      {/* Hover Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-20 px-3 py-2 rounded-xl bg-slate-900/95 border border-slate-700/80 shadow-xl text-xs max-w-[220px]"
          style={{
            left: Math.min(tooltip.x + 14, size.width - 230),
            top: Math.max(tooltip.y - 54, 12),
          }}
        >
          <div className="font-bold text-white flex items-center gap-1.5">
            <span>{tooltip.node.label}</span>
            {tooltip.node.meta?.ipa && (
              <span className="text-[10px] font-normal text-slate-400">
                {tooltip.node.meta.ipa}
              </span>
            )}
          </div>
          {tooltip.node.meta?.coreConcept && (
            <p className="text-[11px] text-slate-300 line-clamp-2 mt-0.5">
              {tooltip.node.meta.coreConcept}
            </p>
          )}
          {tooltip.node.wordId && (
            <div className="text-[10px] text-indigo-400 mt-1 font-medium">
              Click để xem • Double-click để mở map
            </div>
          )}
        </div>
      )}
    </div>
  );
}
