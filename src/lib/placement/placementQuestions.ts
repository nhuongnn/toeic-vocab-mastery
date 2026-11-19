import { allVocabularyWords } from '@/data/vocabulary';
import { PlacementQuestion } from '@/types/onboarding';
import { WordLevel } from '@/types/vocabulary';

// Helper to shuffle an array
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Generates an adaptive question bank from the vocabulary database
 */
export function generatePlacementQuestionPool(): PlacementQuestion[] {
  const pool: PlacementQuestion[] = [];

  const essentialWords = allVocabularyWords.filter((w) => w.level === 'essential');
  const intermediateWords = allVocabularyWords.filter((w) => w.level === 'intermediate');
  const advancedWords = allVocabularyWords.filter((w) => w.level === 'advanced');

  function buildQuestion(
    word: (typeof allVocabularyWords)[0],
    level: WordLevel,
    diffBase: number
  ): PlacementQuestion | null {
    const concept = word.deepMeaning?.coreConcept;
    if (!concept) return null;

    // Try creating sentence fill-in question first if examples exist
    const exSentence =
      (word.examples?.business && word.examples.business[0]) ||
      (word.examples?.daily && word.examples.daily[0]);

    if (exSentence) {
      const regex = new RegExp(`\\b${word.word}\\b`, 'i');
      if (regex.test(exSentence)) {
        const blankSentence = exSentence.replace(regex, '______');

        // Pick 3 distractors from same level
        const distractorsPool = (
          level === 'essential'
            ? essentialWords
            : level === 'intermediate'
            ? intermediateWords
            : advancedWords
        )
          .filter(
            (w) =>
              w.id !== word.id &&
              w.partOfSpeech[0] === word.partOfSpeech[0]
          )
          .slice(0, 15);

        if (distractorsPool.length >= 3) {
          const pickedDistractors = shuffle(distractorsPool).slice(0, 3);
          const rawOptions = [word.word, ...pickedDistractors.map((d) => d.word)];
          const shuffledOptions = shuffle(rawOptions);
          const correctIdx = shuffledOptions.indexOf(word.word);

          return {
            id: `place-fill-${word.id}`,
            word: word.word,
            wordId: word.id,
            level,
            difficulty: Math.min(10, Math.max(1, diffBase + Math.floor(Math.random() * 2))),
            type: 'fill-blank',
            question: blankSentence,
            options: shuffledOptions,
            correctAnswer: correctIdx,
            explanation: `"${word.word}" có nghĩa là: ${concept}. Ví dụ: ${exSentence}`,
          };
        }
      }
    }

    // Fallback: Meaning question
    const distractors = (
      level === 'essential'
        ? essentialWords
        : level === 'intermediate'
        ? intermediateWords
        : advancedWords
    )
      .filter(
        (w) =>
          w.id !== word.id &&
          w.deepMeaning?.coreConcept &&
          w.deepMeaning.coreConcept !== concept
      )
      .slice(0, 20);

    if (distractors.length < 3) return null;

    const picked = shuffle(distractors).slice(0, 3);
    const rawOptions = [concept, ...picked.map((p) => p.deepMeaning.coreConcept)];
    const shuffledOptions = shuffle(rawOptions);
    const correctIdx = shuffledOptions.indexOf(concept);

    return {
      id: `place-mean-${word.id}`,
      word: word.word,
      wordId: word.id,
      level,
      difficulty: diffBase,
      type: 'meaning',
      question: `Ý nghĩa chính của từ "${word.word}" (${word.partOfSpeech.join(', ')}) trong môi trường TOEIC là gì?`,
      options: shuffledOptions,
      correctAnswer: correctIdx,
      explanation: `"${word.word}" mang nghĩa cốt lõi: ${concept}. ${
        word.deepMeaning?.spatialContext ? `Ngữ cảnh hình ảnh: ${word.deepMeaning.spatialContext}` : ''
      }`,
    };
  }

  // Essential questions (Difficulty 1 - 4)
  const sampledEssential = shuffle(essentialWords).slice(0, 30);
  for (const w of sampledEssential) {
    const q = buildQuestion(w, 'essential', 3);
    if (q) pool.push(q);
  }

  // Intermediate questions (Difficulty 5 - 7)
  const sampledInter = shuffle(intermediateWords).slice(0, 35);
  for (const w of sampledInter) {
    const q = buildQuestion(w, 'intermediate', 6);
    if (q) pool.push(q);
  }

  // Advanced questions (Difficulty 8 - 10)
  const sampledAdv = shuffle(advancedWords).slice(0, 30);
  for (const w of sampledAdv) {
    const q = buildQuestion(w, 'advanced', 9);
    if (q) pool.push(q);
  }

  return pool;
}
