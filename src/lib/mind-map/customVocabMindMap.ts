import { CustomItemType, CustomVocabMindMapData, CustomVocabMindMapRootInfo } from '@/types/custom-vocab';

const PLACEHOLDER_TERMS = new Set(['n/a', 'na', 'none', 'null', 'undefined', '-', '—']);

/**
 * Only vocabulary items (never sentence patterns) are eligible for AI Vocab Mind Map generation.
 */
export function isEligibleForVocabMindMap(item: {
  type?: CustomItemType | string;
  text?: string;
}): boolean {
  return item.type === 'vocabulary' && Boolean(item.text && item.text.trim().length > 0);
}

function cleanTerm(raw: unknown): string {
  if (typeof raw !== 'string') return '';
  const trimmed = raw.replace(/\s+/g, ' ').trim();
  if (!trimmed || PLACEHOLDER_TERMS.has(trimmed.toLowerCase())) return '';
  return trimmed;
}

function normalizeTermList(
  input: unknown,
  centerLower: string,
  maxItems: number
): string[] {
  if (!Array.isArray(input)) return [];
  const seen = new Set<string>([centerLower]);
  const result: string[] = [];

  for (const item of input) {
    const clean = cleanTerm(item);
    if (!clean) continue;
    const lower = clean.toLowerCase();
    if (seen.has(lower)) continue;
    seen.add(lower);
    result.push(clean);
    if (result.length >= maxItems) break;
  }

  return result;
}

function normalizeWordFamily(
  input: unknown,
  centerLower: string
): CustomVocabMindMapData['wordFamily'] {
  if (!input || typeof input !== 'object') return {};
  const record = input as Record<string, unknown>;
  const keys = ['noun', 'verb', 'adjective', 'adverb'] as const;
  const output: CustomVocabMindMapData['wordFamily'] = {};

  for (const key of keys) {
    const rawVal = cleanTerm(record[key]);
    if (!rawVal) continue;
    const sanitized = rawVal.replace(/\bn\s*\/\s*a\b/gi, '');
    const parts = sanitized
      .split(/[,/]/)
      .map((p) => cleanTerm(p))
      .filter((p) => p && p.toLowerCase() !== centerLower)
      .slice(0, 2);
    if (parts.length > 0) {
      output[key] = parts.join(' / ');
    }
  }

  return output;
}

function normalizeRootInfo(input: unknown): CustomVocabMindMapRootInfo | undefined {
  if (!input || typeof input !== 'object') return undefined;
  const record = input as Record<string, unknown>;
  const root = cleanTerm(record.root);
  const meaning = cleanTerm(record.meaning);
  if (!root || !meaning) return undefined;
  const origin = cleanTerm(record.origin);
  return {
    root,
    meaning,
    ...(origin ? { origin } : {}),
  };
}

function normalizeNodeNotes(input: unknown): Record<string, string> | undefined {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return undefined;
  const result: Record<string, string> = {};
  for (const [k, v] of Object.entries(input as Record<string, unknown>)) {
    const cleanKey = cleanTerm(k).toLowerCase();
    const cleanVal = cleanTerm(v);
    if (cleanKey && cleanVal) {
      result[cleanKey] = cleanVal;
    }
  }
  return Object.keys(result).length > 0 ? result : undefined;
}

export interface RawCustomMindMapPayload {
  coreConcept?: unknown;
  ipa?: unknown;
  partOfSpeech?: unknown;
  rootInfo?: unknown;
  synonyms?: unknown;
  antonyms?: unknown;
  wordFamily?: unknown;
  collocations?: unknown;
  relatedWords?: unknown;
  nodeNotes?: unknown;
}

/**
 * Sanitizes and normalizes an AI-generated or fallback Mind Map payload into a consistent structure.
 */
export function normalizeCustomMindMapData(
  raw: RawCustomMindMapPayload,
  options: {
    centerWord: string;
    fallbackCoreConcept?: string;
    fallbackIpa?: string;
    fallbackPartOfSpeech?: string;
    provider: 'gemini' | 'cloudflare' | 'fallback';
    model?: string;
  }
): CustomVocabMindMapData {
  const centerLower = options.centerWord.trim().toLowerCase();
  const coreConcept =
    cleanTerm(raw.coreConcept) ||
    cleanTerm(options.fallbackCoreConcept) ||
    `Mạng lưới ngữ nghĩa của từ "${options.centerWord.trim()}".`;

  const ipa = cleanTerm(raw.ipa) || cleanTerm(options.fallbackIpa) || undefined;
  const partOfSpeech =
    cleanTerm(raw.partOfSpeech) || cleanTerm(options.fallbackPartOfSpeech) || undefined;

  return {
    coreConcept,
    ...(ipa ? { ipa } : {}),
    ...(partOfSpeech ? { partOfSpeech } : {}),
    ...(normalizeRootInfo(raw.rootInfo) ? { rootInfo: normalizeRootInfo(raw.rootInfo) } : {}),
    synonyms: normalizeTermList(raw.synonyms, centerLower, 6),
    antonyms: normalizeTermList(raw.antonyms, centerLower, 5),
    wordFamily: normalizeWordFamily(raw.wordFamily, centerLower),
    collocations: normalizeTermList(raw.collocations, centerLower, 5),
    relatedWords: normalizeTermList(raw.relatedWords, centerLower, 5),
    ...(normalizeNodeNotes(raw.nodeNotes) ? { nodeNotes: normalizeNodeNotes(raw.nodeNotes) } : {}),
    generatedAt: new Date().toISOString(),
    provider: options.provider,
    ...(options.model ? { model: options.model } : {}),
  };
}
