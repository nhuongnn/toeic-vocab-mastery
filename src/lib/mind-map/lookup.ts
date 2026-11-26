import { NodeType } from './types';

const LEXICAL_NODE_TYPES = new Set<NodeType>([
  'synonym',
  'antonym',
  'family',
  'collocation',
  'related',
  'root-group',
]);

const PLACEHOLDER_TERMS = new Set(['n/a', 'na', 'none', '-']);

/**
 * Returns true when a Mind Map node type represents a vocabulary word/phrase
 * rather than a structural category/root/progress group node.
 */
export function isLexicalNodeType(nodeType: NodeType): boolean {
  return LEXICAL_NODE_TYPES.has(nodeType);
}

/**
 * Extracts clean dictionary lookup terms from a Mind Map node label.
 * Strips parenthetical usage notes (e.g. "(past: ...)") and splits
 * comma/slash-separated word-family forms so Cambridge & Oxford URLs resolve cleanly.
 */
export function extractMindMapLookupTerms(
  label: string,
  nodeType: NodeType
): string[] {
  if (!isLexicalNodeType(nodeType)) return [];
  const trimmed = label.trim();
  if (!trimmed || PLACEHOLDER_TERMS.has(trimmed.toLowerCase())) return [];

  // Strip parenthetical annotations such as "(past: broadcast or broadcasted)"
  const withoutParens = trimmed.replace(/\([^)]*\)/g, ' ');
  const separator = nodeType === 'family' ? /[,/]/ : /\//;

  const seen = new Set<string>();
  const terms: string[] = [];

  for (const rawPart of withoutParens.split(separator)) {
    const clean = rawPart.replace(/\s+/g, ' ').trim();
    const lower = clean.toLowerCase();
    if (!clean || PLACEHOLDER_TERMS.has(lower) || seen.has(lower)) continue;
    seen.add(lower);
    terms.push(clean);
  }

  return terms;
}
