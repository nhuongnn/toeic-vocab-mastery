'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Map as MapIcon, EyeOff } from 'lucide-react';
import { MindMapGraph } from '@/lib/mind-map/types';

interface MindMapMinimapProps {
  graph: MindMapGraph | null;
  zoom: number;
  panX: number;
  panY: number;
  viewportWidth: number;
  viewportHeight: number;
  onPanTo: (panX: number, panY: number) => void;
}

const MINIMAP_W = 156;
const MINIMAP_H = 108;

export function MindMapMinimap({
  graph,
  zoom,
  panX,
  panY,
  viewportWidth,
  viewportHeight,
  onPanTo,
}: MindMapMinimapProps) {
  const [visible, setVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDraggingRef = useRef(false);

  // Compute graph bounds
  const bounds = React.useMemo(() => {
    if (!graph || graph.nodes.length === 0) {
      return { minX: 0, maxX: 800, minY: 0, maxY: 600 };
    }
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    for (const n of graph.nodes) {
      minX = Math.min(minX, n.x - 60);
      maxX = Math.max(maxX, n.x + 60);
      minY = Math.min(minY, n.y - 60);
      maxY = Math.max(maxY, n.y + 60);
    }
    return { minX, maxX, minY, maxY };
  }, [graph]);

  const scale = React.useMemo(() => {
    const gw = Math.max(bounds.maxX - bounds.minX, 100);
    const gh = Math.max(bounds.maxY - bounds.minY, 100);
    return Math.min((MINIMAP_W - 12) / gw, (MINIMAP_H - 12) / gh);
  }, [bounds]);

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas || !graph) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = MINIMAP_W * dpr;
    canvas.height = MINIMAP_H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, MINIMAP_W, MINIMAP_H);

    const offsetX = (MINIMAP_W - (bounds.maxX - bounds.minX) * scale) / 2 - bounds.minX * scale;
    const offsetY = (MINIMAP_H - (bounds.maxY - bounds.minY) * scale) / 2 - bounds.minY * scale;

    const nodeMap = new Map(graph.nodes.map((n) => [n.id, n]));

    // Edges
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
    ctx.lineWidth = 0.8;
    for (const e of graph.edges) {
      const s = nodeMap.get(e.source);
      const t = nodeMap.get(e.target);
      if (!s || !t) continue;
      ctx.beginPath();
      ctx.moveTo(s.x * scale + offsetX, s.y * scale + offsetY);
      ctx.lineTo(t.x * scale + offsetX, t.y * scale + offsetY);
      ctx.stroke();
    }

    // Nodes
    for (const n of graph.nodes) {
      ctx.beginPath();
      ctx.arc(
        n.x * scale + offsetX,
        n.y * scale + offsetY,
        Math.max(2, n.radius * scale),
        0,
        Math.PI * 2
      );
      ctx.fillStyle = n.color;
      ctx.fill();
    }

    // Viewport rectangle
    if (viewportWidth > 0 && viewportHeight > 0) {
      const worldLeft = -panX / zoom;
      const worldTop = -panY / zoom;
      const worldW = viewportWidth / zoom;
      const worldH = viewportHeight / zoom;

      const rx = worldLeft * scale + offsetX;
      const ry = worldTop * scale + offsetY;
      const rw = worldW * scale;
      const rh = worldH * scale;

      ctx.strokeStyle = '#818cf8';
      ctx.lineWidth = 1.5;
      ctx.fillStyle = 'rgba(129, 140, 248, 0.12)';
      ctx.fillRect(rx, ry, rw, rh);
      ctx.strokeRect(rx, ry, rw, rh);
    }
  }, [visible, graph, bounds, scale, zoom, panX, panY, viewportWidth, viewportHeight]);

  const handlePointer = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = clientX - rect.left;
    const my = clientY - rect.top;

    const offsetX = (MINIMAP_W - (bounds.maxX - bounds.minX) * scale) / 2 - bounds.minX * scale;
    const offsetY = (MINIMAP_H - (bounds.maxY - bounds.minY) * scale) / 2 - bounds.minY * scale;

    const worldX = (mx - offsetX) / scale;
    const worldY = (my - offsetY) / scale;

    onPanTo(viewportWidth / 2 - worldX * zoom, viewportHeight / 2 - worldY * zoom);
  };

  if (!visible) {
    return (
      <button
        type="button"
        onClick={() => setVisible(true)}
        className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white shadow-lg"
        title="Hiện Minimap"
      >
        <MapIcon className="w-4 h-4" />
      </button>
    );
  }

  return (
    <div className="rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-800 shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between px-2.5 py-1 border-b border-slate-800/80 text-[10px] font-semibold text-slate-400">
        <span>Minimap</span>
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="hover:text-slate-200 p-0.5"
          title="Ẩn Minimap"
        >
          <EyeOff className="w-3 h-3" />
        </button>
      </div>
      <canvas
        ref={canvasRef}
        style={{ width: MINIMAP_W, height: MINIMAP_H }}
        className="block cursor-crosshair"
        onMouseDown={(e) => {
          isDraggingRef.current = true;
          handlePointer(e.clientX, e.clientY);
        }}
        onMouseMove={(e) => {
          if (isDraggingRef.current) handlePointer(e.clientX, e.clientY);
        }}
        onMouseUp={() => {
          isDraggingRef.current = false;
        }}
        onMouseLeave={() => {
          isDraggingRef.current = false;
        }}
      />
    </div>
  );
}
