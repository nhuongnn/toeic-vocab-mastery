import { CategoryId, VocabularyWord, WordLevel } from '@/types/vocabulary';
import { SRSCard } from '@/types/progress';
import { isCardDue } from '@/lib/srs';
import { RootFamily } from '@/data/mind-map/rootFamilies';
import {
  EDGE_COLORS,
  EdgeType,
  LEVEL_NODE_SIZES,
  MindMapEdge,
  MindMapGraph,
  MindMapNode,
  NODE_COLORS,
  NodeType,
  SRSNodeStatus,
} from './types';

function getSRSStatus(
  wordId: string | undefined,
  srsCards: Record<string, SRSCard>
): { status: SRSNodeStatus; easinessFactor?: number; isDue?: boolean } {
  if (!wordId) return { status: 'new' };
  const card = srsCards[wordId];
  if (!card) return { status: 'new' };
  const isMastered = card.repetitions >= 5 && card.easinessFactor >= 2.0;
  return {
    status: isMastered ? 'mastered' : 'learning',
    easinessFactor: card.easinessFactor,
    isDue: isCardDue(card),
  };
}

function buildWordLookup(allWords: VocabularyWord[]): Map<string, VocabularyWord> {
  const map = new Map<string, VocabularyWord>();
  for (const w of allWords) {
    map.set(w.word.toLowerCase(), w);
    map.set(w.id.toLowerCase(), w);
  }
  return map;
}

function createNode(params: {
  id: string;
  label: string;
  type: NodeType;
  word?: VocabularyWord;
  radius?: number;
  srsCards?: Record<string, SRSCard>;
  meta?: MindMapNode['meta'];
}): MindMapNode {
  const { id, label, type, word, radius, srsCards = {}, meta } = params;
  const srs = getSRSStatus(word?.id, srsCards);

  const defaultRadius =
    type === 'center'
      ? 40
      : word
        ? LEVEL_NODE_SIZES[word.level]
        : type === 'collocation'
          ? 18
          : 22;

  return {
    id,
    label,
    type,
    wordId: word?.id,
    level: word?.level,
    x: 0,
    y: 0,
    radius: radius ?? defaultRadius,
    color: NODE_COLORS[type],
    opacity: 1,
    srsStatus: word ? srs.status : undefined,
    easinessFactor: srs.easinessFactor,
    isHovered: false,
    isSelected: false,
    isDragging: false,
    vx: 0,
    vy: 0,
    meta: {
      ipa: word?.pronunciation?.ipa,
      partOfSpeech: word?.partOfSpeech,
      coreConcept: word?.deepMeaning?.coreConcept,
      category: word?.category,
      toeicFrequency: word?.toeicFrequency,
      isDue: srs.isDue,
      ...meta,
    },
  };
}

function createEdge(
  source: string,
  target: string,
  type: EdgeType,
  label?: string,
  weight: number = 1
): MindMapEdge {
  return {
    id: `${source}->${target}:${type}`,
    source,
    target,
    type,
    label,
    weight,
    color: EDGE_COLORS[type],
    opacity: 0.85,
    dashArray: type === 'antonym' ? [6, 4] : undefined,
  };
}

/**
 * Mode 1: Word Explorer — explores a single word's semantic network
 * (synonyms, antonyms, word family, collocations, related words).
 */
export function buildWordExplorerGraph(
  word: VocabularyWord,
  allWords: VocabularyWord[],
  srsCards: Record<string, SRSCard>
): MindMapGraph {
  const lookup = buildWordLookup(allWords);
  const nodes: MindMapNode[] = [];
  const edges: MindMapEdge[] = [];
  const seenLabels = new Set<string>([word.word.toLowerCase()]);

  const centerId = `word:${word.id}`;
  nodes.push(
    createNode({
      id: centerId,
      label: word.word,
      type: 'center',
      word,
      radius: 42,
      srsCards,
      meta: { isExpanded: true },
    })
  );

  const addBranch = (
    items: string[],
    nodeType: NodeType,
    edgeType: EdgeType,
    edgeLabel: string,
    maxCount: number,
    weight: number
  ) => {
    let added = 0;
    for (const raw of items) {
      if (added >= maxCount) break;
      const clean = raw.trim();
      if (!clean) continue;
      const key = `${nodeType}:${clean.toLowerCase()}`;
      if (seenLabels.has(clean.toLowerCase()) || seenLabels.has(key)) continue;
      seenLabels.add(clean.toLowerCase());
      seenLabels.add(key);

      const matched = lookup.get(clean.toLowerCase());
      const nodeId = matched ? `word:${matched.id}` : `${nodeType}:${clean.toLowerCase()}`;
      if (nodes.some((n) => n.id === nodeId)) continue;

      nodes.push(
        createNode({
          id: nodeId,
          label: clean,
          type: nodeType,
          word: matched,
          srsCards,
        })
      );
      edges.push(createEdge(centerId, nodeId, edgeType, edgeLabel, weight));
      added++;
    }
  };

  // Synonyms
  addBranch(word.synonyms || [], 'synonym', 'synonym', 'synonym', 6, 1.1);

  // Antonyms
  addBranch(word.antonyms || [], 'antonym', 'antonym', 'antonym', 5, 0.9);

  // Word Family (noun, verb, adjective, adverb)
  const familyEntries = Object.entries(word.wordFamily || {});
  for (const [pos, formStr] of familyEntries) {
    if (!formStr) continue;
    // Handle forms like "collaboration / collaborator"
    const forms = formStr.split('/').map((s) => s.trim()).filter(Boolean);
    for (const form of forms.slice(0, 2)) {
      const lower = form.toLowerCase();
      if (lower === word.word.toLowerCase() || seenLabels.has(lower)) continue;
      seenLabels.add(lower);
      const matched = lookup.get(lower);
      const nodeId = matched ? `word:${matched.id}` : `family:${lower}`;
      if (nodes.some((n) => n.id === nodeId)) continue;

      nodes.push(
        createNode({
          id: nodeId,
          label: form,
          type: 'family',
          word: matched,
          srsCards,
          meta: { posLabel: pos },
        })
      );
      edges.push(createEdge(centerId, nodeId, 'family', pos, 1.2));
    }
  }

  // Collocations
  addBranch(word.examples?.collocations || [], 'collocation', 'collocation', 'collocation', 5, 0.85);

  // Related words
  addBranch(word.relatedWords || [], 'related', 'related', 'related', 5, 1.0);

  return { nodes, edges, centerNodeId: centerId };
}

/**
 * Depth-2 lazy expansion: expands a linked word node in Word Explorer
 * by adding its own synonyms, antonyms, and related words that are not yet in the graph.
 */
export function expandWordNodeInGraph(
  graph: MindMapGraph,
  targetNodeId: string,
  allWords: VocabularyWord[],
  srsCards: Record<string, SRSCard>
): MindMapGraph {
  const targetNode = graph.nodes.find((n) => n.id === targetNodeId);
  if (!targetNode || !targetNode.wordId || targetNode.meta?.isExpanded) {
    return graph;
  }

  const word = allWords.find((w) => w.id === targetNode.wordId);
  if (!word) return graph;

  const lookup = buildWordLookup(allWords);
  const existingIds = new Set(graph.nodes.map((n) => n.id));
  const existingLabels = new Set(graph.nodes.map((n) => n.label.toLowerCase()));

  const newNodes: MindMapNode[] = graph.nodes.map((n) =>
    n.id === targetNodeId ? { ...n, meta: { ...n.meta, isExpanded: true } } : n
  );
  const newEdges: MindMapEdge[] = [...graph.edges];

  const candidates: Array<{ text: string; nodeType: NodeType; edgeType: EdgeType; label: string }> = [
    ...(word.synonyms || []).slice(0, 3).map((t) => ({
      text: t,
      nodeType: 'synonym' as NodeType,
      edgeType: 'synonym' as EdgeType,
      label: 'synonym',
    })),
    ...(word.antonyms || []).slice(0, 2).map((t) => ({
      text: t,
      nodeType: 'antonym' as NodeType,
      edgeType: 'antonym' as EdgeType,
      label: 'antonym',
    })),
    ...(word.relatedWords || []).slice(0, 2).map((t) => ({
      text: t,
      nodeType: 'related' as NodeType,
      edgeType: 'related' as EdgeType,
      label: 'related',
    })),
  ];

  candidates.forEach((cand, idx) => {
    const clean = cand.text.trim();
    if (!clean || existingLabels.has(clean.toLowerCase())) return;
    const matched = lookup.get(clean.toLowerCase());
    const nodeId = matched ? `word:${matched.id}` : `${cand.nodeType}:${clean.toLowerCase()}`;
    if (existingIds.has(nodeId)) {
      // Connect edge if not connected
      const edgeExists = newEdges.some(
        (e) =>
          (e.source === targetNodeId && e.target === nodeId) ||
          (e.source === nodeId && e.target === targetNodeId)
      );
      if (!edgeExists) {
        newEdges.push(createEdge(targetNodeId, nodeId, cand.edgeType, cand.label, 0.9));
      }
      return;
    }

    existingIds.add(nodeId);
    existingLabels.add(clean.toLowerCase());

    const angle = (idx / Math.max(candidates.length, 1)) * Math.PI * 2;
    const node = createNode({
      id: nodeId,
      label: clean,
      type: cand.nodeType,
      word: matched,
      srsCards,
    });
    node.x = targetNode.x + Math.cos(angle) * 90;
    node.y = targetNode.y + Math.sin(angle) * 90;

    newNodes.push(node);
    newEdges.push(createEdge(targetNodeId, nodeId, cand.edgeType, cand.label, 0.9));
  });

  return {
    ...graph,
    nodes: newNodes,
    edges: newEdges,
  };
}

/**
 * Mode 2: Category Map — groups words in a TOEIC category by level
 * (Essential / Intermediate / Advanced) with inter-word connections.
 */
export function buildCategoryGraph(
  categoryId: CategoryId,
  categoryName: string,
  allWords: VocabularyWord[],
  srsCards: Record<string, SRSCard>,
  limitPerLevel: number = 12
): MindMapGraph {
  const catWords = allWords.filter((w) => w.category === categoryId);
  const nodes: MindMapNode[] = [];
  const edges: MindMapEdge[] = [];

  const centerId = `category:${categoryId}`;
  nodes.push(
    createNode({
      id: centerId,
      label: categoryName,
      type: 'center',
      radius: 44,
      meta: { category: categoryId, groupCount: catWords.length },
    })
  );

  const levels: Array<{ key: WordLevel; label: string }> = [
    { key: 'essential', label: 'Essential' },
    { key: 'intermediate', label: 'Intermediate' },
    { key: 'advanced', label: 'Advanced' },
  ];

  const displayedWords: VocabularyWord[] = [];

  for (const lvl of levels) {
    const levelWords = catWords
      .filter((w) => w.level === lvl.key)
      .sort((a, b) => b.toeicFrequency - a.toeicFrequency);

    if (levelWords.length === 0) continue;

    const groupNodeId = `group:${categoryId}:${lvl.key}`;
    nodes.push(
      createNode({
        id: groupNodeId,
        label: `${lvl.label} (${levelWords.length})`,
        type: 'category-group',
        radius: 30,
        meta: { category: categoryId, groupCount: levelWords.length },
      })
    );
    edges.push(createEdge(centerId, groupNodeId, 'category', lvl.label, 1.3));

    const slice = levelWords.slice(0, limitPerLevel);
    for (const w of slice) {
      displayedWords.push(w);
      const wordNodeId = `word:${w.id}`;
      // Scale radius by toeicFrequency (18..30)
      const freqRadius = Math.round(17 + ((w.toeicFrequency || 50) / 100) * 13);
      nodes.push(
        createNode({
          id: wordNodeId,
          label: w.word,
          type: 'related',
          word: w,
          radius: freqRadius,
          srsCards,
        })
      );
      edges.push(createEdge(groupNodeId, wordNodeId, 'category', undefined, 1.0));
    }
  }

  // Add inter-word synonym/related edges within displayed words
  const displayedByWord = new Map<string, VocabularyWord>();
  for (const w of displayedWords) {
    displayedByWord.set(w.word.toLowerCase(), w);
  }

  for (const w of displayedWords) {
    const sourceId = `word:${w.id}`;
    for (const syn of w.synonyms || []) {
      const targetWord = displayedByWord.get(syn.toLowerCase());
      if (targetWord && targetWord.id !== w.id && w.id < targetWord.id) {
        edges.push(createEdge(sourceId, `word:${targetWord.id}`, 'synonym', 'synonym', 0.7));
      }
    }
  }

  return { nodes, edges, centerNodeId: centerId };
}

/**
 * Mode 3: Root Family — groups all vocabulary words sharing a Latin/Greek root.
 */
export function buildRootFamilyGraph(
  family: RootFamily,
  allWords: VocabularyWord[],
  srsCards: Record<string, SRSCard>
): MindMapGraph {
  const nodes: MindMapNode[] = [];
  const edges: MindMapEdge[] = [];

  const centerId = `root:${family.root.toLowerCase()}`;
  nodes.push(
    createNode({
      id: centerId,
      label: `${family.root}-`,
      type: 'center',
      radius: 44,
      meta: {
        rootMeaning: family.rootMeaning,
        origin: family.origin,
        groupCount: family.words.length,
      },
    })
  );

  const wordMap = new Map(allWords.map((w) => [w.id, w]));
  const familyWords = family.words
    .map((id) => wordMap.get(id))
    .filter((w): w is VocabularyWord => Boolean(w))
    .slice(0, 32);

  for (const w of familyWords) {
    const nodeId = `word:${w.id}`;
    nodes.push(
      createNode({
        id: nodeId,
        label: w.word,
        type: 'root-group',
        word: w,
        srsCards,
        meta: {
          rootMeaning: w.etymology?.rootMeaning,
          origin: w.etymology?.origin,
        },
      })
    );
    edges.push(createEdge(centerId, nodeId, 'root', family.origin, 1.1));
  }

  return { nodes, edges, centerNodeId: centerId };
}

/**
 * Mode 4: Progress Map — visualizes user's SRS mastery across Mastered / Learning / New.
 */
export function buildProgressGraph(
  allWords: VocabularyWord[],
  srsCards: Record<string, SRSCard>
): MindMapGraph {
  const nodes: MindMapNode[] = [];
  const edges: MindMapEdge[] = [];

  const mastered: VocabularyWord[] = [];
  const learning: VocabularyWord[] = [];
  const newWords: VocabularyWord[] = [];

  for (const w of allWords) {
    const card = srsCards[w.id];
    if (!card) {
      newWords.push(w);
    } else if (card.repetitions >= 5 && card.easinessFactor >= 2.0) {
      mastered.push(w);
    } else {
      learning.push(w);
    }
  }

  const centerId = 'progress:center';
  nodes.push(
    createNode({
      id: centerId,
      label: 'My Vocabulary',
      type: 'center',
      radius: 44,
      meta: { groupCount: allWords.length },
    })
  );

  const groups: Array<{
    id: string;
    label: string;
    words: VocabularyWord[];
    nodeType: NodeType;
    cap: number;
  }> = [
    {
      id: 'progress:mastered',
      label: `Mastered (${mastered.length})`,
      words: mastered,
      nodeType: 'synonym',
      cap: 18,
    },
    {
      id: 'progress:learning',
      label: `Learning (${learning.length})`,
      words: learning.sort((a, b) => {
        const aDue = srsCards[a.id] && isCardDue(srsCards[a.id]) ? 1 : 0;
        const bDue = srsCards[b.id] && isCardDue(srsCards[b.id]) ? 1 : 0;
        return bDue - aDue;
      }),
      nodeType: 'related',
      cap: 18,
    },
    {
      id: 'progress:new',
      label: `New (${newWords.length})`,
      words: newWords.sort((a, b) => b.toeicFrequency - a.toeicFrequency),
      nodeType: 'collocation',
      cap: 12,
    },
  ];

  const displayedLearned: VocabularyWord[] = [];

  for (const group of groups) {
    nodes.push(
      createNode({
        id: group.id,
        label: group.label,
        type: 'progress-group',
        radius: 32,
        meta: { groupCount: group.words.length },
      })
    );
    edges.push(createEdge(centerId, group.id, 'progress', undefined, 1.3));

    const slice = group.words.slice(0, group.cap);
    for (const w of slice) {
      if (group.id !== 'progress:new') displayedLearned.push(w);
      const card = srsCards[w.id];
      const ef = card?.easinessFactor ?? 2.0;
      const radius = Math.round(16 + Math.min(ef, 3.0) * 5);
      nodes.push(
        createNode({
          id: `word:${w.id}`,
          label: w.word,
          type: group.nodeType,
          word: w,
          radius,
          srsCards,
        })
      );
      edges.push(createEdge(group.id, `word:${w.id}`, 'progress', undefined, 1.0));
    }
  }

  // Show knowledge-web connections between mastered/learning words
  const learnedMap = new Map(displayedLearned.map((w) => [w.word.toLowerCase(), w]));
  for (const w of displayedLearned) {
    for (const syn of w.synonyms || []) {
      const target = learnedMap.get(syn.toLowerCase());
      if (target && target.id !== w.id && w.id < target.id) {
        edges.push(createEdge(`word:${w.id}`, `word:${target.id}`, 'synonym', undefined, 0.7));
      }
    }
  }

  return { nodes, edges, centerNodeId: centerId };
}

/**
 * BFS shortest path between two node IDs in the graph.
 */
export function findShortestPath(
  graph: MindMapGraph,
  startNodeId: string,
  endNodeId: string
): string[] {
  if (startNodeId === endNodeId) return [startNodeId];
  const adj = new Map<string, string[]>();
  for (const edge of graph.edges) {
    if (!adj.has(edge.source)) adj.set(edge.source, []);
    if (!adj.has(edge.target)) adj.set(edge.target, []);
    adj.get(edge.source)!.push(edge.target);
    adj.get(edge.target)!.push(edge.source);
  }

  const queue: string[][] = [[startNodeId]];
  const visited = new Set<string>([startNodeId]);

  while (queue.length > 0) {
    const path = queue.shift()!;
    const current = path[path.length - 1];
    for (const neighbor of adj.get(current) || []) {
      if (neighbor === endNodeId) {
        return [...path, neighbor];
      }
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([...path, neighbor]);
      }
    }
  }
  return [];
}
