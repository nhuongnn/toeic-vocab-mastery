import { VocabularyWord } from '@/types/vocabulary';

export interface RootFamily {
  root: string;
  rootMeaning: string;
  origin: string;
  words: string[]; // VocabularyWord.id[]
}

interface RootStemDef {
  stem: string;
  pattern: RegExp;
  meaning: string;
  origin: string;
}

// Common classical Latin/Greek root stems to group related words even when rootWord is conjugated
const CLASSICAL_STEMS: RootStemDef[] = [
  { stem: 'port', pattern: /\bport(are|er)?\b|carry/i, meaning: 'to carry, bring', origin: 'Latin' },
  { stem: 'duc / duct', pattern: /\bduc(ere|t|tus)?\b|lead/i, meaning: 'to lead, guide', origin: 'Latin' },
  { stem: 'mit / miss', pattern: /\bmit(tere)?\b|\bmiss(us|ion)?\b|send/i, meaning: 'to send, let go', origin: 'Latin' },
  { stem: 'ced / cess', pattern: /\bced(ere)?\b|\bcess(us)?\b|go|yield/i, meaning: 'to go, yield', origin: 'Latin' },
  { stem: 'spect / spic', pattern: /\bspect(are)?\b|\bspic(ere)?\b|look|watch/i, meaning: 'to look, see', origin: 'Latin' },
  { stem: 'vid / vis', pattern: /\bvid(ere)?\b|\bvis(us)?\b|see/i, meaning: 'to see, observe', origin: 'Latin' },
  { stem: 'scrib / script', pattern: /\bscrib(ere)?\b|\bscript(us)?\b|write/i, meaning: 'to write', origin: 'Latin' },
  { stem: 'fac / fact / fect', pattern: /\bfac(ere|t)?\b|\bfect\b|make|do/i, meaning: 'to make, do', origin: 'Latin' },
  { stem: 'cap / cept / ceiv', pattern: /\bcap(ere)?\b|\bcept\b|take|seize|hold/i, meaning: 'to take, hold', origin: 'Latin' },
  { stem: 'ten / tain / tin', pattern: /\bten(ere)?\b|\btain\b|hold|keep/i, meaning: 'to hold, keep', origin: 'Latin' },
  { stem: 'plic / ply', pattern: /\bplic(are)?\b|fold/i, meaning: 'to fold, weave', origin: 'Latin' },
  { stem: 'fer', pattern: /\bfer(re)?\b|bear|carry/i, meaning: 'to bear, carry', origin: 'Latin' },
  { stem: 'sta / sist / stit', pattern: /\bsta(re)?\b|\bsist(ere)?\b|stand/i, meaning: 'to stand, establish', origin: 'Latin' },
  { stem: 'ven / vent', pattern: /\bven(ire)?\b|\bvent\b|come/i, meaning: 'to come', origin: 'Latin' },
  { stem: 'grad / gress', pattern: /\bgrad(us|i)?\b|\bgress\b|step|walk/i, meaning: 'to step, go', origin: 'Latin' },
  { stem: 'form', pattern: /\bform(a|are)?\b|shape/i, meaning: 'shape, form', origin: 'Latin' },
  { stem: 'labor', pattern: /\blabor(are)?\b|work/i, meaning: 'work, toil', origin: 'Latin' },
  { stem: 'pos / pon', pattern: /\bpon(ere)?\b|\bpos(itus)?\b|place|put/i, meaning: 'to place, put', origin: 'Latin' },
  { stem: 'tract', pattern: /\btract(are|us)?\b|\btrahere\b|pull|draw/i, meaning: 'to pull, draw', origin: 'Latin' },
  { stem: 'cred', pattern: /\bcred(ere)?\b|believe|trust/i, meaning: 'to believe, trust', origin: 'Latin' },
  { stem: 'vers / vert', pattern: /\bvert(ere)?\b|\bvers(us)?\b|turn/i, meaning: 'to turn', origin: 'Latin' },
  { stem: 'struct', pattern: /\bstruct(us)?\b|\bstruere\b|build/i, meaning: 'to build, arrange', origin: 'Latin' },
  { stem: 'serv', pattern: /\bserv(are|ire)?\b|keep|save|serve/i, meaning: 'to keep, serve', origin: 'Latin' },
  { stem: 'sign', pattern: /\bsign(um|are)?\b|mark|seal/i, meaning: 'mark, sign', origin: 'Latin' },
  { stem: 'solv / solut', pattern: /\bsolv(ere)?\b|\bsolut\b|loosen|free/i, meaning: 'to loosen, release', origin: 'Latin' },
  { stem: 'cur / curs', pattern: /\bcur(rere|a)?\b|run|care/i, meaning: 'to run, care', origin: 'Latin' },
  { stem: 'fin', pattern: /\bfin(is|ire)?\b|end|limit/i, meaning: 'end, boundary', origin: 'Latin' },
  { stem: 'val', pattern: /\bval(ere)?\b|worth|strong/i, meaning: 'strength, worth', origin: 'Latin' },
  { stem: 'voc / vok', pattern: /\bvoc(are)?\b|call|voice/i, meaning: 'to call, voice', origin: 'Latin' },
  { stem: 'aud', pattern: /\baud(ire)?\b|hear/i, meaning: 'to hear, listen', origin: 'Latin' },
  { stem: 'dict', pattern: /\bdict(us)?\b|\bdicere\b|say|speak/i, meaning: 'to say, declare', origin: 'Latin' },
  { stem: 'man / manu', pattern: /\bman(us)?\b|hand/i, meaning: 'hand', origin: 'Latin' },
  { stem: 'mod', pattern: /\bmod(us)?\b|measure|manner/i, meaning: 'measure, manner', origin: 'Latin' },
  { stem: 'part', pattern: /\bpart(ire)?\b|\bpars\b|part|share/i, meaning: 'part, share', origin: 'Latin' },
  { stem: 'sent / sens', pattern: /\bsent(ire)?\b|\bsens(us)?\b|feel|think/i, meaning: 'to feel, perceive', origin: 'Latin' },
  { stem: 'act / ag', pattern: /\bag(ere)?\b|\bact(us)?\b|do|drive/i, meaning: 'to do, drive', origin: 'Latin' },
  { stem: 'log', pattern: /\blog(os|ia)?\b|word|reason|study/i, meaning: 'word, reason, study', origin: 'Greek' },
  { stem: 'graph / gram', pattern: /\bgraph(ein)?\b|\bgram(ma)?\b|write|draw/i, meaning: 'to write, record', origin: 'Greek' },
];

let cachedFamilies: RootFamily[] | null = null;

/**
 * Extracts and groups vocabulary words by classical root stems and exact rootWord matches.
 * Results are memoized for instant subsequent lookups.
 */
export function getRootFamilies(allWords: VocabularyWord[]): RootFamily[] {
  if (cachedFamilies) return cachedFamilies;

  const groups = new Map<string, RootFamily>();

  // 1. Group by classical stems
  for (const stemDef of CLASSICAL_STEMS) {
    const matchingIds: string[] = [];
    for (const w of allWords) {
      const rootText = `${w.etymology?.rootWord || ''} ${w.etymology?.rootMeaning || ''}`;
      if (stemDef.pattern.test(rootText)) {
        matchingIds.push(w.id);
      }
    }
    if (matchingIds.length >= 2) {
      groups.set(stemDef.stem.toLowerCase(), {
        root: stemDef.stem,
        rootMeaning: stemDef.meaning,
        origin: stemDef.origin,
        words: matchingIds,
      });
    }
  }

  // 2. Also group by exact normalized rootWord where >= 2 words share it
  const exactMap = new Map<string, { meaning: string; origin: string; ids: string[] }>();
  for (const w of allWords) {
    const rawRoot = w.etymology?.rootWord?.trim().toLowerCase();
    if (!rawRoot || rawRoot.length < 3) continue;
    const existing = exactMap.get(rawRoot);
    if (existing) {
      existing.ids.push(w.id);
    } else {
      exactMap.set(rawRoot, {
        meaning: w.etymology?.rootMeaning || rawRoot,
        origin: w.etymology?.origin || 'Latin/Greek',
        ids: [w.id],
      });
    }
  }

  for (const [root, data] of exactMap.entries()) {
    if (data.ids.length >= 2 && !groups.has(root)) {
      groups.set(root, {
        root,
        rootMeaning: data.meaning,
        origin: data.origin,
        words: data.ids,
      });
    }
  }

  cachedFamilies = Array.from(groups.values()).sort((a, b) => b.words.length - a.words.length);
  return cachedFamilies;
}

export function findRootFamily(rootKey: string, allWords: VocabularyWord[]): RootFamily | undefined {
  const families = getRootFamilies(allWords);
  const normalized = rootKey.trim().toLowerCase();
  return (
    families.find((f) => f.root.toLowerCase() === normalized) ||
    families.find((f) => f.root.toLowerCase().includes(normalized)) ||
    families[0]
  );
}
