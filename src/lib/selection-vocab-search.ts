import type { VocabularyWord, WordLevel } from '@/types/vocabulary';
import { lemmatizeWord } from './lemmatizer';

export type VocabMatchType =
  | 'headword'
  | 'word-family'
  | 'synonym'
  | 'antonym'
  | 'related'
  | 'collocation';

export interface SelectionVocabMatch {
  word: VocabularyWord;
  matchType: VocabMatchType;
  /** The exact entry in the system word / mind map that matched */
  matchedTerm: string;
  /** The normalized query token/phrase that matched (e.g. "collaborate" for "collaborated") */
  matchedQuery: string;
  /** Whether inflection/lemmatization or phrase normalization was applied */
  isSmartMatch: boolean;
  /** Optional POS label when matched via wordFamily (e.g. "noun", "adjective") */
  familyPos?: string;
  score: number;
}

export interface SelectionVocabSearchResult {
  cleanedSelection: string;
  normalizedBase: string;
  matches: SelectionVocabMatch[];
  totalMatches: number;
}

interface IndexedEntry {
  word: VocabularyWord;
  matchType: VocabMatchType;
  displayTerm: string;
  exactPhrase: string;
  lemmaPhrase: string;
  corePhrase: string;
  wordCount: number;
  familyPos?: string;
}

export interface SelectionVocabIndex {
  /** All single lowercase tokens known in the system vocabulary & mind map */
  knownTokens: Set<string>;
  /** Exact normalized phrase -> entries */
  byExactPhrase: Map<string, IndexedEntry[]>;
  /** Lemmatized normalized phrase -> entries */
  byLemmaPhrase: Map<string, IndexedEntry[]>;
  /** Article-stripped lemmatized phrase (min 2 tokens) -> entries */
  byCorePhrase: Map<string, IndexedEntry[]>;
}

const PLACEHOLDER_TERMS = new Set(['n/a', 'na', 'none', 'null', 'undefined', '-', '—']);
const ARTICLES = new Set(['a', 'an', 'the']);
const MAX_SELECTION_CHARS = 100;
const MAX_SELECTION_WORDS = 10;
const DEFAULT_MAX_RESULTS = 12;

const MATCH_TYPE_PRIORITY: Record<VocabMatchType, number> = {
  headword: 600,
  'word-family': 500,
  synonym: 400,
  antonym: 300,
  related: 200,
  collocation: 100,
};

export const MATCH_TYPE_LABELS: Record<VocabMatchType, string> = {
  headword: 'Từ chính',
  'word-family': 'Họ từ',
  synonym: 'Đồng nghĩa',
  antonym: 'Trái nghĩa',
  related: 'Liên quan',
  collocation: 'Collocation',
};

/**
 * Cleans punctuation, smart quotes, brackets, and extra whitespace from a token or phrase.
 */
function sanitizeToken(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/^["'“”‘’([{<«—–-]+/, '')
    .replace(/["'“”‘’)\]}>».,;:!?—–-]+$/, '')
    .replace(/['’]s$/i, '')
    .replace(/['’]$/, '');
}

function tokenize(text: string): string[] {
  return text
    .trim()
    .split(/\s+/)
    .map(sanitizeToken)
    .filter((t) => t.length > 0 && /[a-z]/i.test(t));
}

function addCandidate(list: string[], seen: Set<string>, candidate: unknown): void {
  if (typeof candidate !== 'string') return;
  const clean = candidate.trim().toLowerCase();
  if (!clean || seen.has(clean)) return;
  seen.add(clean);
  list.push(clean);
}

/**
 * Generates ordered morphological candidate lemmas for a single English token.
 * Tier 0: exact cleaned token
 * Tier 1: primary lemma from lemmatizeWord()
 * Tier 2: dictionary-validated fallback stems (handles -ed/-ing/-s/-er/-est/-ly edge cases
 *         like "cancelled" -> "cancel", "audited" -> "audit", "effectively" -> "effective")
 */
export function getTokenLemmaCandidates(rawToken: string): string[] {
  const cleaned = sanitizeToken(rawToken);
  if (!cleaned) return [];

  const candidates: string[] = [];
  const seen = new Set<string>();

  addCandidate(candidates, seen, cleaned);

  const primaryLemma = lemmatizeWord(cleaned);
  if (primaryLemma && primaryLemma !== cleaned) {
    addCandidate(candidates, seen, primaryLemma);
  }

  // Handle hyphenated inflected forms e.g. "follow-ups" -> "follow-up"
  if (cleaned.includes('-')) {
    const parts = cleaned.split('-');
    const last = parts[parts.length - 1];
    if (last && parts.length > 1) {
      const lastLemma = lemmatizeWord(last);
      if (lastLemma && lastLemma !== last) {
        addCandidate(candidates, seen, [...parts.slice(0, -1), lastLemma].join('-'));
      }
      if (last.endsWith('s') && last.length > 2 && !last.endsWith('ss')) {
        addCandidate(candidates, seen, [...parts.slice(0, -1), last.slice(0, -1)].join('-'));
      }
    }
  }

  // Fallback suffix candidates (validated against the dictionary index at lookup time)
  if (cleaned.endsWith('ied') && cleaned.length > 4) {
    addCandidate(candidates, seen, cleaned.slice(0, -3) + 'y');
    addCandidate(candidates, seen, cleaned.slice(0, -1));
  }

  if (cleaned.endsWith('ed') && cleaned.length > 3) {
    const stem = cleaned.slice(0, -2);
    const stemWithE = cleaned.slice(0, -1);
    addCandidate(candidates, seen, stem);
    addCandidate(candidates, seen, stemWithE);
    // Doubled consonant undoubling including -ll (e.g. cancelled -> cancel, travelled -> travel)
    if (
      stem.length >= 3 &&
      stem[stem.length - 1] === stem[stem.length - 2] &&
      !'aeiou'.includes(stem[stem.length - 1])
    ) {
      addCandidate(candidates, seen, stem.slice(0, -1));
    }
  }

  if (cleaned.endsWith('ing') && cleaned.length > 4) {
    const stem = cleaned.slice(0, -3);
    addCandidate(candidates, seen, stem);
    addCandidate(candidates, seen, stem + 'e');
    if (cleaned.endsWith('ying') && stem.length >= 2) {
      addCandidate(candidates, seen, stem.slice(0, -1) + 'y');
      addCandidate(candidates, seen, stem.slice(0, -1) + 'ie');
    }
    if (
      stem.length >= 3 &&
      stem[stem.length - 1] === stem[stem.length - 2] &&
      !'aeiou'.includes(stem[stem.length - 1])
    ) {
      addCandidate(candidates, seen, stem.slice(0, -1));
    }
  }

  if (cleaned.endsWith('ies') && cleaned.length > 4) {
    addCandidate(candidates, seen, cleaned.slice(0, -3) + 'y');
    addCandidate(candidates, seen, cleaned.slice(0, -1));
  }

  if (cleaned.endsWith('ves') && cleaned.length > 4) {
    addCandidate(candidates, seen, cleaned.slice(0, -3) + 'f');
    addCandidate(candidates, seen, cleaned.slice(0, -3) + 'fe');
  }

  // Compound irregular -men / -women plurals (e.g. businessmen -> businessman, newswomen -> newswoman)
  if (cleaned.endsWith('men') && cleaned.length > 3) {
    addCandidate(candidates, seen, cleaned.slice(0, -3) + 'man');
  }

  if (cleaned.endsWith('es') && cleaned.length > 3) {
    addCandidate(candidates, seen, cleaned.slice(0, -2));
    addCandidate(candidates, seen, cleaned.slice(0, -1));
  }

  if (cleaned.endsWith('s') && cleaned.length > 2 && !cleaned.endsWith('ss')) {
    addCandidate(candidates, seen, cleaned.slice(0, -1));
  }

  if (cleaned.endsWith('iest') && cleaned.length > 5) {
    addCandidate(candidates, seen, cleaned.slice(0, -4) + 'y');
  }

  if (cleaned.endsWith('est') && cleaned.length > 4) {
    const stem = cleaned.slice(0, -3);
    addCandidate(candidates, seen, stem);
    addCandidate(candidates, seen, cleaned.slice(0, -2));
    if (
      stem.length >= 3 &&
      stem[stem.length - 1] === stem[stem.length - 2] &&
      !'aeiou'.includes(stem[stem.length - 1])
    ) {
      addCandidate(candidates, seen, stem.slice(0, -1));
    }
  }

  if (cleaned.endsWith('ier') && cleaned.length > 4) {
    addCandidate(candidates, seen, cleaned.slice(0, -3) + 'y');
  }

  if (cleaned.endsWith('er') && cleaned.length > 4) {
    const stem = cleaned.slice(0, -2);
    addCandidate(candidates, seen, stem);
    addCandidate(candidates, seen, cleaned.slice(0, -1));
    if (
      stem.length >= 3 &&
      stem[stem.length - 1] === stem[stem.length - 2] &&
      !'aeiou'.includes(stem[stem.length - 1])
    ) {
      addCandidate(candidates, seen, stem.slice(0, -1));
    }
  }

  // Adverbs ending in -ly (e.g. collaboratively -> collaborative, financially -> financial, happily -> happy)
  if (cleaned.endsWith('ily') && cleaned.length > 4) {
    addCandidate(candidates, seen, cleaned.slice(0, -3) + 'y');
  } else if (cleaned.endsWith('ically') && cleaned.length > 7) {
    addCandidate(candidates, seen, cleaned.slice(0, -4));
  } else if (cleaned.endsWith('ally') && cleaned.length > 5) {
    addCandidate(candidates, seen, cleaned.slice(0, -2));
  } else if (cleaned.endsWith('ly') && cleaned.length > 4) {
    addCandidate(candidates, seen, cleaned.slice(0, -2));
    addCandidate(candidates, seen, cleaned.slice(0, -1) + 'e');
  }

  return candidates;
}

/**
 * Resolves the best canonical token using known dictionary tokens when available.
 */
function resolveSmartToken(rawToken: string, knownTokens: Set<string>): string {
  const candidates = getTokenLemmaCandidates(rawToken);
  if (candidates.length === 0) return '';

  // Prefer the first candidate present in the known vocabulary tokens
  for (const cand of candidates) {
    if (knownTokens.has(cand)) {
      return cand;
    }
  }

  return candidates[1] || candidates[0];
}

/**
 * Expands mind-map terms that use parenthetical annotations, commas (for wordFamily),
 * or slash alternations such as:
 * - "soft launch / hard launch" -> ["soft launch", "hard launch"]
 * - "allocate funds / budget" -> ["allocate funds", "allocate budget"]
 * - "send/issue a memo" -> ["send a memo", "issue a memo"]
 * - "slim / narrow margin" -> ["slim margin", "narrow margin"]
 * - "electronic funds transfer (EFT)" -> ["electronic funds transfer", "EFT"]
 */
export function expandMindMapFieldTerms(
  rawValue: string,
  matchType: VocabMatchType
): string[] {
  if (!rawValue) return [];
  const trimmed = rawValue.trim();
  if (!trimmed || PLACEHOLDER_TERMS.has(trimmed.toLowerCase())) return [];

  // Extract uppercase acronym tags like (EFT), (API), (UI) before stripping parens
  const acronymMatches: string[] = [];
  const parenRegex = /\(([^)]+)\)/g;
  let parenMatch: RegExpExecArray | null;
  while ((parenMatch = parenRegex.exec(trimmed)) !== null) {
    const inner = parenMatch[1].trim();
    if (/^[A-Z0-9&]{2,8}$/.test(inner)) {
      acronymMatches.push(inner);
    }
  }

  const withoutParens = trimmed.replace(/\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim();
  if (!withoutParens || PLACEHOLDER_TERMS.has(withoutParens.toLowerCase())) {
    return acronymMatches;
  }

  const results: string[] = [];
  const seen = new Set<string>();
  const pushTerm = (term: string) => {
    const clean = term.replace(/\s+/g, ' ').trim();
    const lower = clean.toLowerCase();
    if (!clean || PLACEHOLDER_TERMS.has(lower) || seen.has(lower)) return;
    seen.add(lower);
    results.push(clean);
  };

  if (matchType === 'word-family') {
    for (const part of withoutParens.split(/[,/]/)) {
      pushTerm(part);
    }
    return results;
  }

  const slashParts = withoutParens
    .split('/')
    .map((p) => p.replace(/\s+/g, ' ').trim())
    .filter(Boolean);

  if (slashParts.length === 2) {
    const [left, right] = slashParts;
    const leftTokens = left.split(/\s+/);
    const rightTokens = right.split(/\s+/);

    if (leftTokens.length > 1 && rightTokens.length === 1) {
      // e.g. "allocate funds / budget" -> "allocate funds", "allocate budget"
      pushTerm(left);
      pushTerm([...leftTokens.slice(0, -1), rightTokens[0]].join(' '));
    } else if (leftTokens.length === 1 && rightTokens.length > 1) {
      // e.g. "send/issue a memo" -> "send a memo", "issue a memo"
      pushTerm([leftTokens[0], ...rightTokens.slice(1)].join(' '));
      pushTerm(right);
    } else {
      pushTerm(left);
      pushTerm(right);
    }
  } else {
    for (const part of slashParts) {
      pushTerm(part);
    }
  }

  for (const acr of acronymMatches) {
    pushTerm(acr);
  }

  return results;
}

function addToBucket(
  map: Map<string, IndexedEntry[]>,
  key: string,
  entry: IndexedEntry
): void {
  if (!key) return;
  const list = map.get(key);
  if (list) {
    list.push(entry);
  } else {
    map.set(key, [entry]);
  }
}

/**
 * Builds an in-memory search index across all system vocabulary words
 * and their Vocab Mind Map networks (wordFamily, synonyms, antonyms, relatedWords, collocations).
 */
export function buildSelectionVocabIndex(words: VocabularyWord[]): SelectionVocabIndex {
  const knownTokens = new Set<string>();
  const rawRecords: Array<{
    word: VocabularyWord;
    matchType: VocabMatchType;
    displayTerm: string;
    tokens: string[];
    familyPos?: string;
  }> = [];

  const collectTerms = (
    word: VocabularyWord,
    matchType: VocabMatchType,
    rawValues: Array<string | undefined>,
    familyPos?: string
  ) => {
    for (const raw of rawValues) {
      if (!raw) continue;
      const expanded =
        matchType === 'headword' ? [raw.trim()] : expandMindMapFieldTerms(raw, matchType);
      for (const term of expanded) {
        const tokens = tokenize(term);
        if (tokens.length === 0) continue;
        for (const t of tokens) {
          knownTokens.add(t);
        }
        rawRecords.push({
          word,
          matchType,
          displayTerm: term,
          tokens,
          familyPos,
        });
      }
    }
  };

  // Pass 1: collect all raw terms and populate knownTokens
  for (const word of words) {
    collectTerms(word, 'headword', [word.word]);

    if (word.wordFamily) {
      for (const [pos, val] of Object.entries(word.wordFamily)) {
        if (val) collectTerms(word, 'word-family', [val], pos);
      }
    }

    collectTerms(word, 'synonym', word.synonyms || []);
    collectTerms(word, 'antonym', word.antonyms || []);
    collectTerms(word, 'related', word.relatedWords || []);
    collectTerms(word, 'collocation', word.examples?.collocations || []);
  }

  // Pass 2: compute normalized exact, lemma, and core (article-stripped) keys
  const byExactPhrase = new Map<string, IndexedEntry[]>();
  const byLemmaPhrase = new Map<string, IndexedEntry[]>();
  const byCorePhrase = new Map<string, IndexedEntry[]>();

  for (const rec of rawRecords) {
    const exactPhrase = rec.tokens.join(' ');
    const lemmaTokens = rec.tokens.map((t) => resolveSmartToken(t, knownTokens));
    const lemmaPhrase = lemmaTokens.join(' ');
    const coreTokens = lemmaTokens.filter((t) => !ARTICLES.has(t));
    const corePhrase = coreTokens.length >= 2 ? coreTokens.join(' ') : '';

    const entry: IndexedEntry = {
      word: rec.word,
      matchType: rec.matchType,
      displayTerm: rec.displayTerm,
      exactPhrase,
      lemmaPhrase,
      corePhrase,
      wordCount: rec.tokens.length,
      familyPos: rec.familyPos,
    };

    addToBucket(byExactPhrase, exactPhrase, entry);
    if (lemmaPhrase && lemmaPhrase !== exactPhrase) {
      addToBucket(byLemmaPhrase, lemmaPhrase, entry);
    }
    if (corePhrase && corePhrase !== lemmaPhrase && corePhrase !== exactPhrase) {
      addToBucket(byCorePhrase, corePhrase, entry);
    }
  }

  return {
    knownTokens,
    byExactPhrase,
    byLemmaPhrase,
    byCorePhrase,
  };
}

function getFrequencyBoost(word: VocabularyWord): number {
  const freq = typeof word.toeicFrequency === 'number' && !Number.isNaN(word.toeicFrequency)
    ? word.toeicFrequency <= 10
      ? word.toeicFrequency * 10
      : word.toeicFrequency
    : 50;
  return Math.min(100, Math.max(0, freq)) * 0.1;
}

/**
 * Searches the system vocabulary & Vocab Mind Map index for a user-selected word or phrase.
 */
export function searchSelectionInVocabIndex(
  rawSelection: string,
  index: SelectionVocabIndex,
  options?: { maxResults?: number }
): SelectionVocabSearchResult {
  const trimmed = (rawSelection || '').replace(/\s+/g, ' ').trim();
  const maxResults = options?.maxResults ?? DEFAULT_MAX_RESULTS;

  if (!trimmed || trimmed.length < 2 || trimmed.length > MAX_SELECTION_CHARS) {
    return {
      cleanedSelection: trimmed,
      normalizedBase: trimmed,
      matches: [],
      totalMatches: 0,
    };
  }

  const rawTokens = tokenize(trimmed);
  if (rawTokens.length === 0 || rawTokens.length > MAX_SELECTION_WORDS) {
    return {
      cleanedSelection: trimmed,
      normalizedBase: trimmed,
      matches: [],
      totalMatches: 0,
    };
  }

  const bestByWordId = new Map<string, SelectionVocabMatch>();

  const recordMatch = (
    entry: IndexedEntry,
    matchedQuery: string,
    tierBonus: number,
    isSmartMatch: boolean,
    allowSingleTokenCollocation: boolean
  ) => {
    // Avoid noisy single-word matches inside multi-word collocations unless user selected a phrase
    if (entry.matchType === 'collocation' && !allowSingleTokenCollocation && entry.wordCount > 1) {
      return;
    }

    const score =
      MATCH_TYPE_PRIORITY[entry.matchType] +
      tierBonus +
      getFrequencyBoost(entry.word);

    const existing = bestByWordId.get(entry.word.id);
    if (!existing || score > existing.score) {
      bestByWordId.set(entry.word.id, {
        word: entry.word,
        matchType: entry.matchType,
        matchedTerm: entry.displayTerm,
        matchedQuery,
        isSmartMatch,
        familyPos: entry.familyPos,
        score,
      });
    }
  };

  const exactPhrase = rawTokens.join(' ');
  const hadPossessive = /['’]s\b|['’]\s*$/i.test(trimmed);
  const resolvedTokens = rawTokens.map((t) => resolveSmartToken(t, index.knownTokens));
  const lemmaPhrase = resolvedTokens.join(' ');

  if (rawTokens.length === 1) {
    const token = rawTokens[0];
    const candidates = getTokenLemmaCandidates(token);

    // 1. Exact token match (tierBonus: 50)
    for (const entry of index.byExactPhrase.get(token) || []) {
      recordMatch(entry, token, 50, hadPossessive, true);
    }

    // 2. Smart lemma / morphological candidates (tierBonus: 40 down to 20)
    for (let i = 1; i < candidates.length; i++) {
      const cand = candidates[i];
      const tierBonus = Math.max(20, 42 - i * 4);
      for (const entry of index.byExactPhrase.get(cand) || []) {
        recordMatch(entry, cand, tierBonus, true, true);
      }
      for (const entry of index.byLemmaPhrase.get(cand) || []) {
        recordMatch(entry, cand, tierBonus - 2, true, true);
      }
    }

    // 3. Also check if exact token matches a lemmatized indexed single-word term
    for (const entry of index.byLemmaPhrase.get(token) || []) {
      recordMatch(entry, token, 38, true, true);
    }
  } else {
    // Multi-word selection (phrases & collocations)
    // 1. Exact phrase match
    for (const entry of index.byExactPhrase.get(exactPhrase) || []) {
      recordMatch(entry, exactPhrase, 50, false, true);
    }

    // 2. Token-wise lemmatized phrase match (e.g. "collaborated closely" -> "collaborate closely")
    for (const entry of index.byExactPhrase.get(lemmaPhrase) || []) {
      recordMatch(entry, lemmaPhrase, 42, lemmaPhrase !== exactPhrase, true);
    }
    for (const entry of index.byLemmaPhrase.get(lemmaPhrase) || []) {
      recordMatch(entry, lemmaPhrase, 40, true, true);
    }

    // 3. Article-insensitive core phrase match (e.g. "negotiated the contracts" -> "negotiate contract")
    const coreTokens = resolvedTokens.filter((t) => !ARTICLES.has(t));
    if (coreTokens.length >= 2) {
      const corePhrase = coreTokens.join(' ');
      for (const entry of index.byExactPhrase.get(corePhrase) || []) {
        recordMatch(entry, corePhrase, 34, true, true);
      }
      for (const entry of index.byLemmaPhrase.get(corePhrase) || []) {
        recordMatch(entry, corePhrase, 32, true, true);
      }
      for (const entry of index.byCorePhrase.get(corePhrase) || []) {
        recordMatch(entry, corePhrase, 30, true, true);
      }
    }

    // 4. Contiguous multi-word sub-phrase matching (length >= 2)
    //    e.g. "will collaborate closely with" contains "collaborate closely"
    if (rawTokens.length >= 3) {
      for (let len = rawTokens.length - 1; len >= 2; len--) {
        for (let start = 0; start <= rawTokens.length - len; start++) {
          const subExact = rawTokens.slice(start, start + len).join(' ');
          const subResolved = resolvedTokens.slice(start, start + len);
          const subLemma = subResolved.join(' ');
          const subCoreTokens = subResolved.filter((t) => !ARTICLES.has(t));
          const subCore = subCoreTokens.length >= 2 ? subCoreTokens.join(' ') : '';

          for (const entry of index.byExactPhrase.get(subExact) || []) {
            recordMatch(entry, subExact, 24, true, true);
          }
          for (const entry of index.byExactPhrase.get(subLemma) || []) {
            recordMatch(entry, subLemma, 22, true, true);
          }
          for (const entry of index.byLemmaPhrase.get(subLemma) || []) {
            recordMatch(entry, subLemma, 20, true, true);
          }
          if (subCore) {
            for (const entry of index.byCorePhrase.get(subCore) || []) {
              recordMatch(entry, subCore, 18, true, true);
            }
          }
        }
      }
    }
  }

  const sorted = Array.from(bestByWordId.values()).sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.word.word.localeCompare(b.word.word);
  });

  return {
    cleanedSelection: exactPhrase,
    normalizedBase: lemmaPhrase || exactPhrase,
    matches: sorted.slice(0, maxResults),
    totalMatches: sorted.length,
  };
}

let cachedDefaultWordsRef: VocabularyWord[] | null = null;
let cachedDefaultIndex: SelectionVocabIndex | null = null;

/**
 * Convenience helper that lazily builds and caches the index for the system vocabulary list.
 */
export function findSystemVocabMatchesForSelection(
  rawSelection: string,
  words: VocabularyWord[],
  options?: { maxResults?: number }
): SelectionVocabSearchResult {
  if (cachedDefaultWordsRef !== words || !cachedDefaultIndex) {
    cachedDefaultWordsRef = words;
    cachedDefaultIndex = buildSelectionVocabIndex(words);
  }
  return searchSelectionInVocabIndex(rawSelection, cachedDefaultIndex, options);
}

/**
 * Builds the detail URL for a matched system vocabulary word.
 */
export function getSystemWordDetailUrl(wordId: string): string {
  return `/word/${encodeURIComponent(wordId)}`;
}

export function getLevelBadgeColor(level: WordLevel): string {
  switch (level) {
    case 'essential':
      return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    case 'intermediate':
      return 'bg-sky-500/15 text-sky-300 border-sky-500/30';
    case 'advanced':
      return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
    default:
      return 'bg-slate-800 text-slate-300 border-slate-700';
  }
}
