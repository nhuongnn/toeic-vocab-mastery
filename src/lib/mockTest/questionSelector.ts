import {
  MockTestConfig,
  FlattenedQuestion,
  Part5Question,
  Part6Question,
  Part7Question,
} from '@/types/mockTest';

// Helper shuffle
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export async function loadMockTestData(configId: string): Promise<{
  config: MockTestConfig;
  part5Pool: Part5Question[];
  part6Pool: Part6Question[];
  part7Pool: Part7Question[];
}> {
  // Fetch config
  const configRes = await fetch(`/data/mock-tests/configs/${configId}.json`);
  const config: MockTestConfig = await configRes.json();

  // Fetch Part 5 pools
  const [vRes, gRes, cRes] = await Promise.all([
    fetch('/data/mock-tests/part5/vocabulary-questions.json'),
    fetch('/data/mock-tests/part5/grammar-questions.json'),
    fetch('/data/mock-tests/part5/collocation-questions.json'),
  ]);
  const [vocab, grammar, colloc] = await Promise.all([vRes.json(), gRes.json(), cRes.json()]);
  const part5Pool: Part5Question[] = [...vocab, ...grammar, ...colloc];

  // Fetch Part 6 pools
  const [emRes, ltRes, arRes] = await Promise.all([
    fetch('/data/mock-tests/part6/emails.json'),
    fetch('/data/mock-tests/part6/letters.json'),
    fetch('/data/mock-tests/part6/articles.json'),
  ]);
  const [emails, letters, articles] = await Promise.all([emRes.json(), ltRes.json(), arRes.json()]);
  const part6Pool: Part6Question[] = [...emails, ...letters, ...articles];

  // Fetch Part 7 pools
  const [sRes, dRes, tRes] = await Promise.all([
    fetch('/data/mock-tests/part7/single-passages.json'),
    fetch('/data/mock-tests/part7/double-passages.json'),
    fetch('/data/mock-tests/part7/triple-passages.json'),
  ]);
  const [singles, doubles, triples] = await Promise.all([sRes.json(), dRes.json(), tRes.json()]);
  const part7Pool: Part7Question[] = [...singles, ...doubles, ...triples];

  return { config, part5Pool, part6Pool, part7Pool };
}

export function assembleTestQuestions(
  config: MockTestConfig,
  part5Pool: Part5Question[],
  part6Pool: Part6Question[],
  part7Pool: Part7Question[]
): FlattenedQuestion[] {
  const flattened: FlattenedQuestion[] = [];
  let globalQNum = 1;

  // 1. Assemble Part 5
  const p5Config = config.parts.find((p) => p.part === 5);
  const p5TargetCount = p5Config ? p5Config.questionCount : 30;
  const pickedP5 = shuffle(part5Pool).slice(0, p5TargetCount);

  for (const q of pickedP5) {
    flattened.push({
      id: q.id,
      part: 5,
      questionNumber: globalQNum++,
      parentQuestion: q,
      prompt: q.passage,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      skillTested: q.skillTested,
      relatedWordIds: q.relatedWordIds,
    });
  }

  // 2. Assemble Part 6
  const p6Config = config.parts.find((p) => p.part === 6);
  const p6TargetCount = p6Config ? p6Config.questionCount : 8;
  const neededP6Texts = Math.ceil(p6TargetCount / 4);
  const pickedP6Texts = shuffle(part6Pool).slice(0, neededP6Texts);

  let p6Added = 0;
  for (const text of pickedP6Texts) {
    for (let i = 0; i < text.questions.length; i++) {
      if (p6Added >= p6TargetCount) break;
      const sub = text.questions[i];
      flattened.push({
        id: sub.id,
        part: 6,
        questionNumber: globalQNum++,
        subIndex: i,
        parentQuestion: text,
        prompt: `Question ${globalQNum - 1} refers to blank [${sub.blankNumber}] in the text below:`,
        options: sub.options,
        correctAnswer: sub.correctAnswer,
        explanation: sub.explanation,
        skillTested: sub.type,
        relatedWordIds: sub.relatedWordIds,
      });
      p6Added++;
    }
  }

  // 3. Assemble Part 7
  const p7Config = config.parts.find((p) => p.part === 7);
  const p7TargetCount = p7Config ? p7Config.questionCount : 12;
  const pickedP7Sets = shuffle(part7Pool);

  let p7Added = 0;
  for (const set of pickedP7Sets) {
    if (p7Added >= p7TargetCount) break;
    for (let i = 0; i < set.questions.length; i++) {
      if (p7Added >= p7TargetCount) break;
      const sub = set.questions[i];
      flattened.push({
        id: sub.id,
        part: 7,
        questionNumber: globalQNum++,
        subIndex: i,
        parentQuestion: set,
        prompt: sub.question,
        options: sub.options,
        correctAnswer: sub.correctAnswer,
        explanation: sub.explanation,
        skillTested: sub.questionType,
        relatedWordIds: sub.relatedWordIds,
      });
      p7Added++;
    }
  }

  return flattened;
}
