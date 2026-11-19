import { PartScore, SkillBreakdown, WrongAnswerItem, MockTestResult, FlattenedQuestion } from '@/types/mockTest';

/**
 * Standard ETS TOEIC Reading Raw to Scaled Score conversion table
 * Normalized to 100 questions
 */
const READING_SCORE_TABLE: [number, number][] = [
  [100, 495], [99, 495], [98, 490], [97, 490], [96, 485], [95, 480],
  [94, 475], [93, 470], [92, 465], [91, 460], [90, 455],
  [89, 450], [88, 445], [87, 440], [86, 435], [85, 430], [84, 420], [83, 415], [82, 410], [81, 405], [80, 400],
  [79, 395], [78, 390], [77, 380], [76, 375], [75, 370], [74, 365], [73, 360], [72, 355], [71, 350], [70, 345],
  [69, 335], [68, 330], [67, 325], [66, 320], [65, 315], [64, 310], [63, 300], [62, 295], [61, 290], [60, 285],
  [59, 280], [58, 275], [57, 270], [56, 265], [55, 260], [54, 255], [53, 245], [52, 240], [51, 235], [50, 230],
  [49, 220], [48, 215], [47, 210], [46, 205], [45, 200], [44, 195], [43, 185], [42, 180], [41, 175], [40, 170],
  [39, 160], [38, 155], [37, 150], [36, 145], [35, 140], [34, 135], [33, 125], [32, 120], [31, 115], [30, 110],
  [25, 85], [20, 60], [15, 40], [10, 25], [5, 15], [0, 5],
];

export function calculateToeicScore(correct: number, total: number): number {
  if (total <= 0) return 5;

  // Normalize to 100 questions
  const normalizedRaw = Math.min(100, Math.max(0, Math.round((correct / total) * 100)));

  for (const [raw, scaled] of READING_SCORE_TABLE) {
    if (normalizedRaw >= raw) {
      return scaled;
    }
  }

  return 5;
}

export function getScoreLevel(
  score: number
): { level: 'beginner' | 'elementary' | 'intermediate' | 'advanced' | 'proficient'; label: string; badge: string } {
  if (score >= 450) {
    return { level: 'proficient', label: 'Xuất sắc / Cận bản xứ (900+ TOEIC)', badge: '🏆 Proficient' };
  }
  if (score >= 385) {
    return { level: 'advanced', label: 'Nâng cao / Thành thạo (785-900 TOEIC)', badge: '🌟 Advanced' };
  }
  if (score >= 300) {
    return { level: 'intermediate', label: 'Trung cấp / Độc lập (600-780 TOEIC)', badge: '💼 Intermediate' };
  }
  if (score >= 200) {
    return { level: 'elementary', label: 'Sơ cấp / Nền tảng (400-595 TOEIC)', badge: '📘 Elementary' };
  }
  return { level: 'beginner', label: 'Mới bắt đầu (<400 TOEIC)', badge: '🌱 Beginner' };
}

export function evaluateTestSubmission(params: {
  testId: string;
  sessionId: string;
  title: string;
  type: MockTestResult['type'];
  timeTaken: number;
  questions: FlattenedQuestion[];
  answers: Record<string, number | null>;
}): MockTestResult {
  const { testId, sessionId, title, type, timeTaken, questions, answers } = params;

  let totalCorrect = 0;
  const partMap: Record<number, { correct: number; total: number }> = {};
  const skillMap: Record<string, { correct: number; total: number }> = {};
  const wrongAnswers: WrongAnswerItem[] = [];

  for (const q of questions) {
    const userAns = answers[q.id] ?? null;
    const isCorrect = userAns !== null && userAns === q.correctAnswer;

    if (isCorrect) totalCorrect++;

    // Part Stats
    if (!partMap[q.part]) {
      partMap[q.part] = { correct: 0, total: 0 };
    }
    partMap[q.part].total++;
    if (isCorrect) partMap[q.part].correct++;

    // Skill Stats
    const skill = q.skillTested || (q.part === 5 ? 'Vocabulary & Grammar' : q.part === 6 ? 'Text Completion' : 'Reading Comprehension');
    if (!skillMap[skill]) {
      skillMap[skill] = { correct: 0, total: 0 };
    }
    skillMap[skill].total++;
    if (isCorrect) skillMap[skill].correct++;

    // Record wrong/unanswered questions
    if (!isCorrect) {
      wrongAnswers.push({
        questionId: q.id,
        part: q.part,
        questionText: q.prompt,
        options: q.options,
        yourAnswer: userAns,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        relatedWordIds: q.relatedWordIds,
      });
    }
  }

  const totalQuestions = questions.length;
  const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const totalScore = calculateToeicScore(totalCorrect, totalQuestions);

  const partScores: PartScore[] = Object.entries(partMap).map(([partStr, data]) => ({
    part: parseInt(partStr, 10) as PartScore['part'],
    correct: data.correct,
    total: data.total,
    percentage: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
  }));

  const skillBreakdown: SkillBreakdown[] = Object.entries(skillMap).map(([skill, data]) => ({
    skill,
    correct: data.correct,
    total: data.total,
    percentage: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
  }));

  return {
    testId,
    sessionId,
    title,
    type,
    completedAt: new Date().toISOString(),
    timeTaken,
    totalScore,
    totalCorrect,
    totalQuestions,
    accuracy,
    partScores,
    skillBreakdown,
    wrongAnswers,
  };
}
