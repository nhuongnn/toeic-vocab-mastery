import {
  MindMapEdge,
  MindMapGraph,
  MindMapNode,
  MindMapState,
  SRS_RING_COLORS,
} from './types';

export interface RenderOptions {
  width: number;
  height: number;
  timeMs: number;
  entranceProgress: number; // 0..1
  reducedMotion?: boolean;
}

function isRectVisible(
  x: number,
  y: number,
  radius: number,
  state: MindMapState,
  width: number,
  height: number
): boolean {
  const sx = x * state.zoom + state.panX;
  const sy = y * state.zoom + state.panY;
  const sr = radius * state.zoom + 60;
  return sx + sr >= 0 && sx - sr <= width && sy + sr >= 0 && sy - sr <= height;
}

export function renderMindMap(
  ctx: CanvasRenderingContext2D,
  graph: MindMapGraph,
  state: MindMapState,
  options: RenderOptions
): void {
  const { width, height, timeMs, entranceProgress, reducedMotion } = options;

  ctx.clearRect(0, 0, width, height);

  // Subtle dot grid background in screen space
  drawBackgroundGrid(ctx, width, height, state);

  ctx.save();
  ctx.translate(state.panX, state.panY);
  ctx.scale(state.zoom, state.zoom);

  const nodeMap = new Map<string, MindMapNode>(graph.nodes.map((n) => [n.id, n]));
  const query = state.searchQuery.trim().toLowerCase();
  const hasSearch = query.length > 0;
  const highlightedSet = new Set(state.highlightedPath);

  // 1. Draw edges
  for (const edge of graph.edges) {
    const src = nodeMap.get(edge.source);
    const tgt = nodeMap.get(edge.target);
    if (!src || !tgt) continue;

    // Virtual culling
    if (
      !isRectVisible(src.x, src.y, src.radius, state, width, height) &&
      !isRectVisible(tgt.x, tgt.y, tgt.radius, state, width, height)
    ) {
      continue;
    }

    const isHighlighted =
      (highlightedSet.has(edge.source) && highlightedSet.has(edge.target)) ||
      state.selectedNodeId === edge.source ||
      state.selectedNodeId === edge.target ||
      state.hoveredNodeId === edge.source ||
      state.hoveredNodeId === edge.target;

    drawEdge(ctx, edge, src, tgt, {
      isHighlighted,
      dimmed: hasSearch && !isHighlighted,
      timeMs,
      entranceProgress,
      reducedMotion,
    });
  }

  // 2. Draw nodes
  for (const node of graph.nodes) {
    if (!isRectVisible(node.x, node.y, node.radius, state, width, height)) {
      continue;
    }

    const matchesSearch =
      hasSearch &&
      (node.label.toLowerCase().includes(query) ||
        (node.meta?.coreConcept?.toLowerCase().includes(query) ?? false));

    const isConnectedToSelected =
      state.selectedNodeId !== null &&
      graph.edges.some(
        (e) =>
          (e.source === state.selectedNodeId && e.target === node.id) ||
          (e.target === state.selectedNodeId && e.source === node.id)
      );

    const isPathNode = highlightedSet.has(node.id);
    const dimmed =
      hasSearch && !matchesSearch && !isPathNode && node.id !== state.selectedNodeId;

    drawNode(ctx, node, {
      isSelected: state.selectedNodeId === node.id,
      isHovered: state.hoveredNodeId === node.id,
      isSearchMatch: matchesSearch,
      isPathNode,
      isConnectedToSelected,
      dimmed,
      timeMs,
      entranceProgress,
      reducedMotion,
      zoom: state.zoom,
    });
  }

  ctx.restore();
}

function drawBackgroundGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: MindMapState
): void {
  const spacing = 36 * state.zoom;
  if (spacing < 12) return;

  const offsetX = ((state.panX % spacing) + spacing) % spacing;
  const offsetY = ((state.panY % spacing) + spacing) % spacing;

  ctx.fillStyle = 'rgba(148, 163, 184, 0.08)';
  for (let x = offsetX; x < width; x += spacing) {
    for (let y = offsetY; y < height; y += spacing) {
      ctx.beginPath();
      ctx.arc(x, y, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawEdge(
  ctx: CanvasRenderingContext2D,
  edge: MindMapEdge,
  src: MindMapNode,
  tgt: MindMapNode,
  opts: {
    isHighlighted: boolean;
    dimmed: boolean;
    timeMs: number;
    entranceProgress: number;
    reducedMotion?: boolean;
  }
): void {
  const { isHighlighted, dimmed, timeMs, entranceProgress, reducedMotion } = opts;

  ctx.save();
  ctx.globalAlpha = (dimmed ? 0.15 : isHighlighted ? 0.95 : 0.6) * entranceProgress;

  // Quadratic curve control point slightly offset for organic feel
  const mx = (src.x + tgt.x) / 2;
  const my = (src.y + tgt.y) / 2;
  const dx = tgt.x - src.x;
  const dy = tgt.y - src.y;
  const curveOffset = edge.type === 'antonym' ? 18 : 10;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const cx = mx - (dy / len) * curveOffset;
  const cy = my + (dx / len) * curveOffset;

  ctx.beginPath();
  ctx.moveTo(src.x, src.y);
  ctx.quadraticCurveTo(cx, cy, tgt.x, tgt.y);

  ctx.strokeStyle = isHighlighted ? edge.color.slice(0, 7) : edge.color;
  ctx.lineWidth = isHighlighted ? 2.5 : 1.6;

  if (edge.dashArray) {
    ctx.setLineDash(edge.dashArray);
    if (!reducedMotion) {
      ctx.lineDashOffset = -(timeMs / 45) % 20;
    }
  } else {
    ctx.setLineDash([]);
  }

  ctx.stroke();

  // Edge label at midpoint when highlighted
  if (isHighlighted && edge.label) {
    ctx.setLineDash([]);
    ctx.font = '600 10px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const lx = 0.25 * src.x + 0.5 * cx + 0.25 * tgt.x;
    const ly = 0.25 * src.y + 0.5 * cy + 0.25 * tgt.y;
    const textW = ctx.measureText(edge.label).width + 10;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.beginPath();
    ctx.roundRect(lx - textW / 2, ly - 8, textW, 16, 6);
    ctx.fill();

    ctx.fillStyle = '#cbd5e1';
    ctx.fillText(edge.label, lx, ly + 0.5);
  }

  ctx.restore();
}

function drawNode(
  ctx: CanvasRenderingContext2D,
  node: MindMapNode,
  opts: {
    isSelected: boolean;
    isHovered: boolean;
    isSearchMatch: boolean;
    isPathNode: boolean;
    isConnectedToSelected: boolean;
    dimmed: boolean;
    timeMs: number;
    entranceProgress: number;
    reducedMotion?: boolean;
    zoom: number;
  }
): void {
  const {
    isSelected,
    isHovered,
    isSearchMatch,
    isPathNode,
    isConnectedToSelected,
    dimmed,
    timeMs,
    entranceProgress,
    reducedMotion,
    zoom,
  } = opts;

  const scale = 0.5 + 0.5 * entranceProgress;
  const r = node.radius * scale * (isHovered ? 1.08 : 1);

  ctx.save();
  ctx.globalAlpha = dimmed ? 0.2 : entranceProgress;

  // Due-review pulse ring
  if (node.meta?.isDue && !reducedMotion && !dimmed) {
    const pulse = (Math.sin(timeMs / 400) + 1) / 2;
    ctx.beginPath();
    ctx.arc(node.x, node.y, r + 4 + pulse * 6, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(244, 114, 182, 0.45)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Glow for selected / hovered / search match / path
  if (isSelected || isHovered || isSearchMatch || isPathNode) {
    ctx.shadowColor = isSearchMatch ? '#facc15' : node.color;
    ctx.shadowBlur = isSelected ? 22 : 15;
  }

  // Circle gradient fill
  const grad = ctx.createRadialGradient(
    node.x - r * 0.3,
    node.y - r * 0.3,
    r * 0.1,
    node.x,
    node.y,
    r
  );
  grad.addColorStop(0, `${node.color}ee`);
  grad.addColorStop(1, `${node.color}66`);

  ctx.beginPath();
  ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
  ctx.fillStyle = '#0f172a';
  ctx.fill();
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.shadowBlur = 0;

  // Outer border / SRS status ring
  ctx.beginPath();
  ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
  if (isSelected || isSearchMatch || isPathNode) {
    ctx.strokeStyle = isSearchMatch ? '#facc15' : '#ffffff';
    ctx.lineWidth = 3;
  } else if (node.srsStatus) {
    ctx.strokeStyle = SRS_RING_COLORS[node.srsStatus];
    ctx.lineWidth = isConnectedToSelected ? 2.6 : 2.2;
  } else {
    ctx.strokeStyle = node.color;
    ctx.lineWidth = 1.8;
  }
  ctx.stroke();

  // Inner label or center text
  if (node.type === 'center') {
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 12px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const shortLabel = node.label.length > 14 ? `${node.label.slice(0, 12)}…` : node.label;
    ctx.fillText(shortLabel, node.x, node.y);
  } else if (zoom > 0.42) {
    // Draw label pill below node
    ctx.font = `${isSelected || isHovered ? '700' : '600'} 11.5px Inter, system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    const labelY = node.y + r + 6;
    const displayLabel = node.label.length > 22 ? `${node.label.slice(0, 20)}…` : node.label;
    const textWidth = ctx.measureText(displayLabel).width;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.beginPath();
    ctx.roundRect(node.x - textWidth / 2 - 6, labelY - 2, textWidth + 12, 18, 6);
    ctx.fill();

    ctx.fillStyle = isSelected || isHovered || isSearchMatch ? '#ffffff' : '#e2e8f0';
    ctx.fillText(displayLabel, node.x, labelY + 1);
  }

  ctx.restore();
}
