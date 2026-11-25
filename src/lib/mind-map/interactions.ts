import { MindMapGraph, MindMapNode } from './types';

export interface WorldPoint {
  x: number;
  y: number;
}

export function screenToWorld(
  screenX: number,
  screenY: number,
  panX: number,
  panY: number,
  zoom: number
): WorldPoint {
  return {
    x: (screenX - panX) / zoom,
    y: (screenY - panY) / zoom,
  };
}

export function worldToScreen(
  worldX: number,
  worldY: number,
  panX: number,
  panY: number,
  zoom: number
): WorldPoint {
  return {
    x: worldX * zoom + panX,
    y: worldY * zoom + panY,
  };
}

/**
 * Returns the topmost node under the given world coordinates, or null.
 */
export function hitTestNode(
  graph: MindMapGraph | null,
  worldX: number,
  worldY: number
): MindMapNode | null {
  if (!graph) return null;
  // Iterate in reverse render order so topmost node wins
  for (let i = graph.nodes.length - 1; i >= 0; i--) {
    const node = graph.nodes[i];
    const dx = worldX - node.x;
    const dy = worldY - node.y;
    const hitRadius = node.radius + 6;
    if (dx * dx + dy * dy <= hitRadius * hitRadius) {
      return node;
    }
  }
  return null;
}

/**
 * Computes pan & zoom to fit the entire graph nicely inside the viewport.
 */
export function computeFitView(
  graph: MindMapGraph | null,
  viewportWidth: number,
  viewportHeight: number,
  padding: number = 70
): { zoom: number; panX: number; panY: number } {
  if (!graph || graph.nodes.length === 0 || viewportWidth <= 0 || viewportHeight <= 0) {
    return { zoom: 1, panX: 0, panY: 0 };
  }

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const n of graph.nodes) {
    minX = Math.min(minX, n.x - n.radius - 20);
    maxX = Math.max(maxX, n.x + n.radius + 20);
    minY = Math.min(minY, n.y - n.radius - 26);
    maxY = Math.max(maxY, n.y + n.radius + 26);
  }

  const graphW = Math.max(maxX - minX, 100);
  const graphH = Math.max(maxY - minY, 100);
  const availW = Math.max(viewportWidth - padding * 2, 100);
  const availH = Math.max(viewportHeight - padding * 2, 100);

  const zoom = Math.min(Math.max(Math.min(availW / graphW, availH / graphH), 0.35), 1.4);
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;

  return {
    zoom,
    panX: viewportWidth / 2 - centerX * zoom,
    panY: viewportHeight / 2 - centerY * zoom,
  };
}
