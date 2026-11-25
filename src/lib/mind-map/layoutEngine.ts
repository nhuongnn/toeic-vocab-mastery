import { MindMapGraph, MindMapNode } from './types';

export interface LayoutOptions {
  width: number;
  height: number;
  iterations?: number;
  repulsionStrength?: number;
  attractionStrength?: number;
  damping?: number;
  idealEdgeLength?: number;
}

/**
 * Initialize radial positions grouped by edge type so branches start untangled.
 */
export function initializeRadialPositions(
  graph: MindMapGraph,
  width: number,
  height: number
): MindMapNode[] {
  const cx = width / 2;
  const cy = height / 2;

  // Group non-center nodes by their primary edge type or group
  const nodes = graph.nodes.map((n) => ({ ...n }));
  const center = nodes.find((n) => n.id === graph.centerNodeId);
  if (center) {
    center.x = cx;
    center.y = cy;
    center.fx = cx;
    center.fy = cy;
  }

  // BFS depth from center
  const adj = new Map<string, string[]>();
  for (const e of graph.edges) {
    if (!adj.has(e.source)) adj.set(e.source, []);
    if (!adj.has(e.target)) adj.set(e.target, []);
    adj.get(e.source)!.push(e.target);
    adj.get(e.target)!.push(e.source);
  }

  const depthMap = new Map<string, number>();
  const queue: string[] = [graph.centerNodeId];
  depthMap.set(graph.centerNodeId, 0);

  while (queue.length > 0) {
    const curr = queue.shift()!;
    const d = depthMap.get(curr) ?? 0;
    for (const next of adj.get(curr) || []) {
      if (!depthMap.has(next)) {
        depthMap.set(next, d + 1);
        queue.push(next);
      }
    }
  }

  const byDepth = new Map<number, MindMapNode[]>();
  for (const n of nodes) {
    if (n.id === graph.centerNodeId) continue;
    const d = depthMap.get(n.id) ?? 1;
    if (!byDepth.has(d)) byDepth.set(d, []);
    byDepth.get(d)!.push(n);
  }

  for (const [depth, ringNodes] of byDepth.entries()) {
    // Sort by type so same-type nodes cluster naturally
    ringNodes.sort((a, b) => a.type.localeCompare(b.type));
    const ringRadius = depth === 1 ? Math.min(width, height) * 0.27 : Math.min(width, height) * 0.44;
    const total = ringNodes.length;
    ringNodes.forEach((node, i) => {
      // If node already has a non-zero position (e.g. from depth-2 expansion), keep it
      if (node.x !== 0 || node.y !== 0) return;
      const angle = (i / Math.max(total, 1)) * Math.PI * 2 - Math.PI / 2;
      node.x = cx + Math.cos(angle) * ringRadius;
      node.y = cy + Math.sin(angle) * ringRadius;
    });
  }

  return nodes;
}

/**
 * Single simulation step of Fruchterman-Reingold force-directed layout.
 */
export function stepForceLayout(
  nodes: MindMapNode[],
  graph: MindMapGraph,
  options: LayoutOptions,
  alpha: number = 1
): void {
  const {
    width,
    height,
    repulsionStrength = 4200,
    attractionStrength = 0.045,
    damping = 0.82,
    idealEdgeLength = 145,
  } = options;

  const cx = width / 2;
  const cy = height / 2;
  const nodeMap = new Map<string, MindMapNode>(nodes.map((n) => [n.id, n]));

  // 1. Repulsion between all node pairs + collision avoidance
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j];
      let dx = b.x - a.x;
      let dy = b.y - a.y;
      let distSq = dx * dx + dy * dy;
      if (distSq < 1) {
        dx = (Math.random() - 0.5) * 2;
        dy = (Math.random() - 0.5) * 2;
        distSq = dx * dx + dy * dy + 1;
      }
      const dist = Math.sqrt(distSq);
      const minDist = a.radius + b.radius + 36;

      let force = (repulsionStrength / distSq) * alpha;
      if (dist < minDist) {
        force += ((minDist - dist) * 0.35) * alpha;
      }

      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;

      if (a.fx === undefined) a.vx -= fx;
      if (a.fy === undefined) a.vy -= fy;
      if (b.fx === undefined) b.vx += fx;
      if (b.fy === undefined) b.vy += fy;
    }
  }

  // 2. Attraction along edges (Hooke's law around idealEdgeLength)
  for (const edge of graph.edges) {
    const src = nodeMap.get(edge.source);
    const tgt = nodeMap.get(edge.target);
    if (!src || !tgt) continue;

    const dx = tgt.x - src.x;
    const dy = tgt.y - src.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const targetLen = idealEdgeLength / Math.max(edge.weight, 0.5);
    const displacement = dist - targetLen;
    const force = displacement * attractionStrength * alpha;

    const fx = (dx / dist) * force;
    const fy = (dy / dist) * force;

    if (src.fx === undefined) src.vx += fx;
    if (src.fy === undefined) src.vy += fy;
    if (tgt.fx === undefined) tgt.vx -= fx;
    if (tgt.fy === undefined) tgt.vy -= fy;
  }

  // 3. Gentle center gravity + velocity integration
  for (const n of nodes) {
    if (n.fx !== undefined && n.fy !== undefined) {
      n.x = n.fx;
      n.y = n.fy;
      n.vx = 0;
      n.vy = 0;
      continue;
    }

    n.vx += (cx - n.x) * 0.004 * alpha;
    n.vy += (cy - n.y) * 0.004 * alpha;

    n.vx *= damping;
    n.vy *= damping;

    // Clamp max step to prevent explosions
    const maxStep = 24;
    const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
    if (speed > maxStep) {
      n.vx = (n.vx / speed) * maxStep;
      n.vy = (n.vy / speed) * maxStep;
    }

    n.x += n.vx;
    n.y += n.vy;
  }
}

/**
 * Computes a complete force-directed layout synchronously.
 */
export function forceDirectedLayout(
  graph: MindMapGraph,
  options: LayoutOptions
): MindMapGraph {
  const iterations = options.iterations ?? 180;
  const nodes = initializeRadialPositions(graph, options.width, options.height);

  for (let i = 0; i < iterations; i++) {
    const alpha = Math.max(0.1, 1 - i / iterations);
    stepForceLayout(nodes, graph, options, alpha);
  }

  return {
    ...graph,
    nodes,
  };
}

/**
 * Optional sessionStorage cache for computed node positions.
 */
export function getCachedLayout(
  cacheKey: string,
  graph: MindMapGraph
): MindMapGraph | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(`mindmap_layout_${cacheKey}`);
    if (!raw) return null;
    const coords: Record<string, { x: number; y: number }> = JSON.parse(raw);
    const allPresent = graph.nodes.every((n) => coords[n.id] !== undefined);
    if (!allPresent) return null;

    return {
      ...graph,
      nodes: graph.nodes.map((n) => ({
        ...n,
        x: coords[n.id].x,
        y: coords[n.id].y,
        fx: n.id === graph.centerNodeId ? coords[n.id].x : undefined,
        fy: n.id === graph.centerNodeId ? coords[n.id].y : undefined,
      })),
    };
  } catch {
    return null;
  }
}

export function saveCachedLayout(cacheKey: string, graph: MindMapGraph): void {
  if (typeof window === 'undefined') return;
  try {
    const coords: Record<string, { x: number; y: number }> = {};
    for (const n of graph.nodes) {
      coords[n.id] = { x: Math.round(n.x * 10) / 10, y: Math.round(n.y * 10) / 10 };
    }
    sessionStorage.setItem(`mindmap_layout_${cacheKey}`, JSON.stringify(coords));
  } catch {
    // Ignore quota errors
  }
}
