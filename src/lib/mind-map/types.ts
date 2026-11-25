import { CategoryId, WordLevel } from '@/types/vocabulary';

export type MindMapMode = 'word-explorer' | 'category-map' | 'root-family' | 'progress-map';

export type NodeType =
  | 'center'
  | 'synonym'
  | 'antonym'
  | 'family'
  | 'collocation'
  | 'related'
  | 'category-group'
  | 'root-group'
  | 'progress-group';

export type EdgeType =
  | 'synonym'
  | 'antonym'
  | 'family'
  | 'collocation'
  | 'related'
  | 'category'
  | 'root'
  | 'progress';

export type SRSNodeStatus = 'new' | 'learning' | 'mastered';

export interface MindMapNodeMeta {
  ipa?: string;
  partOfSpeech?: string[];
  coreConcept?: string;
  category?: CategoryId;
  toeicFrequency?: number;
  rootMeaning?: string;
  origin?: string;
  isDue?: boolean;
  groupCount?: number;
  isExpanded?: boolean;
  posLabel?: string;
}

export interface MindMapNode {
  id: string;
  label: string;
  type: NodeType;
  wordId?: string;
  level?: WordLevel;

  // Visual properties
  x: number;
  y: number;
  radius: number;
  color: string;
  opacity: number;

  // SRS integration
  srsStatus?: SRSNodeStatus;
  easinessFactor?: number;

  // Interaction state
  isHovered: boolean;
  isSelected: boolean;
  isDragging: boolean;

  // Force layout
  vx: number;
  vy: number;
  fx?: number;
  fy?: number;

  // Metadata for detail panel & tooltips
  meta?: MindMapNodeMeta;
}

export interface MindMapEdge {
  id: string;
  source: string;
  target: string;
  type: EdgeType;
  label?: string;
  weight: number;
  color: string;
  opacity: number;
  dashArray?: number[];
}

export interface MindMapGraph {
  nodes: MindMapNode[];
  edges: MindMapEdge[];
  centerNodeId: string;
}

export interface MindMapState {
  mode: MindMapMode;
  graph: MindMapGraph | null;
  selectedNodeId: string | null;
  hoveredNodeId: string | null;
  zoom: number;
  panX: number;
  panY: number;
  isAnimating: boolean;
  searchQuery: string;
  highlightedPath: string[];
}

export const NODE_COLORS: Record<NodeType, string> = {
  center: '#818cf8', // indigo-400
  synonym: '#34d399', // emerald-400
  antonym: '#f87171', // red-400
  family: '#a78bfa', // violet-400
  collocation: '#38bdf8', // sky-400
  related: '#fbbf24', // amber-400
  'category-group': '#c084fc', // purple-400
  'root-group': '#fb923c', // orange-400
  'progress-group': '#2dd4bf', // teal-400
};

export const EDGE_COLORS: Record<EdgeType, string> = {
  synonym: '#34d39980',
  antonym: '#f8717180',
  family: '#a78bfa80',
  collocation: '#38bdf880',
  related: '#fbbf2480',
  category: '#c084fc80',
  root: '#fb923c80',
  progress: '#2dd4bf80',
};

export const SRS_RING_COLORS: Record<SRSNodeStatus, string> = {
  mastered: '#34d399', // emerald-400
  learning: '#fbbf24', // amber-400
  new: '#64748b', // slate-500
};

export const LEVEL_NODE_SIZES: Record<WordLevel, number> = {
  essential: 30,
  intermediate: 25,
  advanced: 21,
};

export const NODE_TYPE_LABELS: Record<NodeType, string> = {
  center: 'Trung tâm',
  synonym: 'Đồng nghĩa',
  antonym: 'Trái nghĩa',
  family: 'Họ từ (Word Family)',
  collocation: 'Cụm từ (Collocation)',
  related: 'Từ liên quan',
  'category-group': 'Nhóm cấp độ',
  'root-group': 'Gốc từ',
  'progress-group': 'Trạng thái học',
};
