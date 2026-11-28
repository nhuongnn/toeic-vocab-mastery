import rawExceptions from './lemmatizer-data.json';

const LEMMA_EXCEPTIONS: Record<string, string> = rawExceptions as Record<string, string>;

/**
 * Common English base words that naturally end in suffixes like -s, -es, -ed, -ing, -er, -or
 * but are ALREADY in their base/uninflected form and should NEVER be stripped or modified.
 */
const PRESERVE_BASE_WORDS = new Set<string>([
  // Words ending in s / es
  'business', 'address', 'process', 'access', 'success', 'express', 'progress',
  'press', 'stress', 'boss', 'class', 'glass', 'grass', 'pass', 'cross', 'mass',
  'loss', 'miss', 'kiss', 'less', 'bless', 'guess', 'witness', 'fitness', 'illness',
  'wellness', 'awareness', 'darkness', 'kindness', 'weakness', 'harass', 'embarrass',
  'assess', 'possess', 'compass', 'canvas', 'abyss',
  'status', 'focus', 'bonus', 'campus', 'census', 'virus', 'consensus', 'apparatus',
  'stimulus', 'syllabus', 'circus', 'chorus', 'minus', 'plus', 'nexus',
  'basis', 'crisis', 'analysis', 'thesis', 'hypothesis', 'oasis', 'diagnosis',
  'parenthesis', 'synthesis', 'emphasis', 'neurosis', 'axis',
  'gas', 'chaos', 'cosmos', 'ethos', 'pathos', 'bias',
  'news', 'lens', 'series', 'species', 'corps', 'means', 'headquarters',

  // Words ending in -eed / -ed
  'feed', 'need', 'seed', 'speed', 'bleed', 'breed', 'proceed', 'succeed', 'exceed',
  'bed', 'red', 'shed', 'shred',

  // Words ending in -ing
  'ring', 'bring', 'sing', 'king', 'wing', 'spring', 'string', 'thing', 'fling',
  'sling', 'sting', 'swing', 'cling', 'wring', 'morning', 'evening', 'ceiling',
  'during', 'sibling', 'building', 'training',

  // Words ending in -er / -or (already base nouns)
  'water', 'paper', 'computer', 'manager', 'offer', 'order', 'weather', 'letter',
  'matter', 'number', 'member', 'river', 'silver', 'danger', 'power', 'flower',
  'shower', 'leather', 'corner', 'partner', 'dinner', 'winter', 'summer', 'banner',
  'hammer', 'officer', 'customer', 'worker', 'teacher', 'writer', 'driver', 'user',
  'player', 'leader', 'owner', 'buyer', 'seller', 'provider', 'enter', 'center',
  'cover', 'discover', 'recover', 'consider', 'deliver', 'remember', 'differ',
  'prefer', 'refer', 'confer', 'transfer', 'suffer', 'gather', 'bother', 'together',
  'whether', 'either', 'neither', 'master', 'monster', 'cluster', 'disaster',
  'shelter', 'filter', 'chamber', 'timber', 'amber', 'cucumber', 'fiber', 'meter',
  'doctor', 'factor', 'sector', 'vector', 'actor', 'author', 'sensor', 'mentor',
  'vendor', 'tailor', 'sailor', 'mayor', 'prior', 'major', 'minor', 'senior',
  'junior', 'superior', 'inferior', 'interior', 'exterior', 'error', 'horror',
  'terror', 'honor', 'color', 'flavor', 'favor', 'labor', 'humor', 'rumor', 'harbor'
]);

/**
 * Cleans punctuation, quotes, brackets, and extra spaces around a word or token.
 */
function cleanToken(token: string): string {
  return token
    .trim()
    .replace(/^["'“”‘’([{<]+/, '')
    .replace(/["'“”‘’)\]}>.,;:!?]+$/, '');
}

/**
 * Strips English possessives like 's, ’s, or ending apostrophe.
 * e.g. "company's" -> "company", "employees'" -> "employees"
 */
function stripPossessive(token: string): string {
  return token.replace(/['’]s$/i, '').replace(/['’]$/, '');
}

/**
 * Checks whether a word ends in a doubled consonant that was added during inflection.
 * Suffixes like -ll, -ss, -ff, -zz should not be undoubled because base words end in them (e.g. call, pass, staff, buzz).
 */
function hasInflectedDoubleConsonant(stem: string): boolean {
  if (stem.length < 3) return false;
  const lastChar = stem[stem.length - 1];
  const secondLastChar = stem[stem.length - 2];
  if (lastChar !== secondLastChar) return false;
  if ('aeiou'.includes(lastChar)) return false;
  // Keep base double consonants intact
  if (['l', 's', 'f', 'z'].includes(lastChar)) return false;
  return true;
}

/**
 * Converts a single inflected word to its base/lemma form (nguyên mẫu).
 * If the word is already uninflected/base form, it is returned unchanged.
 */
export function lemmatizeWord(rawWord: string): string {
  if (!rawWord) return '';

  const cleaned = stripPossessive(cleanToken(rawWord)).toLowerCase();
  if (!cleaned) return '';

  // 1. Direct dictionary lookup for irregular verbs, nouns, adjectives
  if (Object.prototype.hasOwnProperty.call(LEMMA_EXCEPTIONS, cleaned)) {
    return LEMMA_EXCEPTIONS[cleaned];
  }

  // 2. Base words preservation check
  if (PRESERVE_BASE_WORDS.has(cleaned)) {
    return cleaned;
  }

  // Suffixes that are inherently base forms in English
  if (
    cleaned.endsWith('ss') ||
    cleaned.endsWith('us') ||
    cleaned.endsWith('is') ||
    cleaned.endsWith('os') ||
    cleaned.endsWith('as')
  ) {
    return cleaned;
  }

  // 3. Regular morphological detachment rules

  // --- Suffix -ing (present participle / gerund) ---
  if (cleaned.endsWith('ing') && cleaned.length > 4) {
    const stem = cleaned.slice(0, -3);

    // Base ending in -ee: agreeing -> agree, guaranteeing -> guarantee, seeing -> see, freeing -> free
    if (cleaned.endsWith('eeing')) {
      return stem;
    }

    // Doubled consonant: e.g. running -> run, stopping -> stop, planning -> plan
    if (hasInflectedDoubleConsonant(stem)) {
      return stem.slice(0, -1);
    }

    // -ying after consonant: e.g. studying -> study, carrying -> carry, applying -> apply
    if (cleaned.endsWith('ying')) {
      if (['dy', 'ly', 'ty', 'vy'].includes(stem)) {
        return stem.slice(0, -1) + 'ie'; // dying -> die, lying -> lie, tying -> tie
      }
      return stem.slice(0, -1) + 'y';
    }

    // Base ending in -ue: issuing -> issue, continuing -> continue, pursuing -> pursue, arguing -> argue, rescuing -> rescue, valuing -> value
    if (stem.endsWith('u')) {
      return stem + 'e';
    }

    // Base ending in syllabic -le: handling -> handle, settling -> settle, enabling -> enable, assembling -> assemble, struggling -> struggle
    if (/[^aeiou]l$/.test(stem)) {
      return stem + 'e';
    }

    // Suffixes that invariably restore silent -e (e.g. creating, negotiating, contributing, inviting, deciding, living, closing)
    if (/(?:ating|uting|[^aeiou]iting|[^aeiou]iding|uding|oding|ving|cing|ging|zing|[aeiou]sing)$/.test(cleaned)) {
      return stem + 'e';
    }

    // Stem ends with double vowel + consonant (e.g. look, cook, wait, clean, meet, read, speak, suit, avoid): no silent -e
    if (/[aeiou]{2}[a-z]$/.test(stem)) {
      return stem;
    }

    // Base ending in consonant cluster or standard suffixes: e.g. working, delivering, happening
    if (/(?:ering|ening|owing|[aeiou]ying|cking|lking|lping|rking|sking|rting|nting|pting|mping|nding|lding|lting|mting)$/.test(cleaned)) {
      return stem;
    }

    // Single vowel + consonant (e.g. make, take, hope, write, drive)
    if (/[^aeiou][aeiou][bdfgklmnprstvz]$/.test(stem)) {
      return stem + 'e';
    }

    return stem;
  }

  // --- Suffix -ed (past tense & past participle) ---
  if (cleaned.endsWith('ed') && cleaned.length > 3) {
    // -ied after consonant: studied -> study, applied -> apply, carried -> carry
    if (cleaned.endsWith('ied') && cleaned.length > 4) {
      if (cleaned === 'died' || cleaned === 'lied' || cleaned === 'tied') {
        return cleaned.slice(0, -1); // die, lie, tie
      }
      return cleaned.slice(0, -3) + 'y';
    }

    const stemWithoutEd = cleaned.slice(0, -2);
    const stemWithE = cleaned.slice(0, -1);

    // Base ending in -ee: agreed -> agree, guaranteed -> guarantee, freed -> free, decreed -> decree
    if (stemWithE.endsWith('ee')) {
      return stemWithE;
    }

    // Base ending in -ue: issued -> issue, continued -> continue, pursued -> pursue, argued -> argue, rescued -> rescue, valued -> value
    if (stemWithE.endsWith('ue')) {
      return stemWithE;
    }

    // Base ending in syllabic -le: handled -> handle, settled -> settle, enabled -> enable, assembled -> assemble, struggled -> struggle
    if (/[^aeiou]le$/.test(stemWithE)) {
      return stemWithE;
    }

    // Doubled consonant: stopped -> stop, planned -> plan, referred -> refer
    if (hasInflectedDoubleConsonant(stemWithoutEd)) {
      return stemWithoutEd.slice(0, -1);
    }

    // Base ending in consonant cluster or standard suffixes: e.g. worked, delivered, happened, played
    if (/(?:ered|ened|owed|[aeiou]yed|cked|lked|lped|rked|sked|rted|nted|pted|mped|nded|lded|lted|mted)$/.test(cleaned)) {
      return stemWithoutEd;
    }

    // Base verb ending in -e with -d added: negotiated -> negotiate, decided -> decide, created -> create
    if (/(?:(?:[aeiou][bdfgklmnprstvz]|(?:rv|lv|rg|ng|nc|rc|tc|sc|lc|qu|ch|sh))[e]|[vcgz]e|[aeiou]se)$/.test(stemWithE)) {
      return stemWithE;
    }

    return stemWithoutEd;
  }

  // --- Suffix -ies (plural nouns & 3rd person singular verbs) ---
  if (cleaned.endsWith('ies') && cleaned.length > 4) {
    if (cleaned === 'pies' || cleaned === 'ties' || cleaned === 'lies' || cleaned === 'dies') {
      return cleaned.slice(0, -1); // pie, tie, lie, die
    }
    return cleaned.slice(0, -3) + 'y'; // companies -> company, categories -> category
  }

  // --- Suffix -ves (irregular plural nouns) ---
  if (cleaned.endsWith('ves') && cleaned.length > 4) {
    const stem = cleaned.slice(0, -3);
    if (['kni', 'wi', 'li'].includes(stem)) {
      return stem + 'fe'; // knives -> knife, wives -> wife, lives -> life
    }
    return stem + 'f'; // leaves -> leaf, shelves -> shelf, halves -> half, wolves -> wolf
  }

  // --- Suffix -es (after sibilants: ss, sh, ch, x, z, o) ---
  if (cleaned.endsWith('es') && cleaned.length > 3) {
    if (cleaned.endsWith('sses')) return cleaned.slice(0, -2); // processes -> process, businesses -> business
    if (cleaned.endsWith('shes') || cleaned.endsWith('ches') || cleaned.endsWith('xes') || cleaned.endsWith('zzes')) {
      return cleaned.slice(0, -2); // wishes -> wish, watches -> watch, boxes -> box, buzzes -> buzz
    }
    if (cleaned.endsWith('oes')) return cleaned.slice(0, -2); // tomatoes -> tomato, heroes -> hero, goes -> go
    if (cleaned.endsWith('ses')) return cleaned.slice(0, -2); // focuses -> focus, buses -> bus, bonuses -> bonus
  }

  // --- Suffix -s (standard plural noun / 3rd person singular verb) ---
  if (cleaned.endsWith('s') && cleaned.length > 3 && !cleaned.endsWith('ss')) {
    return cleaned.slice(0, -1); // employees -> employee, products -> product, works -> work
  }

  // --- Suffix -ier / -iest (comparative / superlative) ---
  if (cleaned.endsWith('iest') && cleaned.length > 5) return cleaned.slice(0, -4) + 'y'; // easiest -> easy
  if (cleaned.endsWith('ier') && cleaned.length > 4) return cleaned.slice(0, -3) + 'y'; // easier -> easy

  // --- Suffix -est / -er (comparative / superlative) ---
  if (cleaned.endsWith('est') && cleaned.length > 4) {
    const stem = cleaned.slice(0, -3);
    if (hasInflectedDoubleConsonant(stem)) return stem.slice(0, -1); // biggest -> big
    if (/(?:larg|wid|saf|clos|simpl|lat|fin)est$/.test(cleaned)) return cleaned.slice(0, -2); // largest -> large
    return stem; // fastest -> fast
  }

  if (cleaned.endsWith('er') && cleaned.length > 4) {
    const stem = cleaned.slice(0, -2);
    if (hasInflectedDoubleConsonant(stem)) return stem.slice(0, -1); // bigger -> big
    if (/(?:larg|wid|saf|clos|simpl|lat|fin)er$/.test(cleaned)) return cleaned.slice(0, -1); // larger -> large
    // Note: PRESERVE_BASE_WORDS already guards common base nouns like water, paper, computer, manager, etc.
    return stem; // faster -> fast
  }

  return cleaned;
}

/**
 * Checks whether an input contains only a single word (no internal whitespace or line breaks).
 */
export function isSingleWord(input: string): boolean {
  if (!input) return false;
  const trimmed = input.trim();
  if (!trimmed) return false;
  return !/\s+/.test(trimmed);
}

/**
 * Converts a word or multi-word phrase into its base/lemma form.
 * If multi-word (e.g. "looking after", "carried out", "setting up"),
 * the head verb is lemmatized while preserving prepositions/particles.
 */
export function lemmatizePhrase(phrase: string): string {
  if (!phrase) return '';

  const tokens = phrase.trim().split(/\s+/);
  if (tokens.length === 0) return '';
  if (tokens.length === 1) return lemmatizeWord(tokens[0]);

  // For multi-word phrase, lemmatize the first word (usually the head verb)
  const firstLemmatized = lemmatizeWord(tokens[0]);
  const rest = tokens.slice(1).map(cleanToken);
  return [firstLemmatized, ...rest].join(' ');
}

/**
 * Converts an input to base/uninflected form ONLY if it is a single word.
 * If the user selected an entire passage, sentence, or multiple words,
 * it strictly returns the original text without converting to base form.
 */
export function toBaseForm(input: string): string {
  if (!input) return '';
  const trimmed = input.trim();
  // Only convert when user selected a single word
  if (!isSingleWord(trimmed)) {
    return trimmed;
  }
  return lemmatizeWord(trimmed);
}

/**
 * Checks whether an input string is already in its base form.
 * If multiple words or a passage are selected, returns true (no conversion applied).
 */
export function isBaseForm(input: string): boolean {
  if (!input) return true;
  const trimmed = input.trim();
  if (!isSingleWord(trimmed)) return true;
  const cleaned = cleanToken(trimmed).toLowerCase();
  return lemmatizeWord(cleaned) === cleaned;
}

/**
 * Cleans and normalizes an input word specifically for Oxford lookup.
 * Automatically converts inflected word forms to their base lemma ONLY when a single word is selected.
 */
export function cleanWordForOxford(word: string): string {
  if (!word) return '';
  const trimmed = word.trim();
  if (!isSingleWord(trimmed)) {
    return trimmed.toLowerCase().replace(/['’]/g, '');
  }
  return lemmatizeWord(trimmed)
    .trim()
    .toLowerCase()
    .replace(/['’]/g, '');
}

/**
 * Returns detailed base form information for UI tooltips or status displays.
 * If input is multiple words (passage/sentence), isConverted is false and baseForm is original text.
 */
export function getBaseFormInfo(input: string): {
  original: string;
  baseForm: string;
  isConverted: boolean;
  isSingleWord: boolean;
} {
  const original = (input || '').trim();
  const single = isSingleWord(original);

  if (!single) {
    return {
      original,
      baseForm: original,
      isConverted: false,
      isSingleWord: false,
    };
  }

  const baseForm = lemmatizeWord(original);
  const isConverted = baseForm.toLowerCase() !== cleanToken(original).toLowerCase();

  return {
    original,
    baseForm,
    isConverted,
    isSingleWord: true,
  };
}
