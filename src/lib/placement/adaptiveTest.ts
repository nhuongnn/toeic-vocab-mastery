import { PlacementQuestion, PlacementAnswer, PlacementResult } from '@/types/onboarding';
import { WordLevel } from '@/types/vocabulary';

export interface AdaptiveTestEngine {
  currentQuestion: PlacementQuestion | null;
  questionIndex: number;
  totalQuestions: number;
  currentDifficulty: number;
  recordAnswer: (selectedIndex: number) => { isCorrect: boolean; isComplete: boolean };
  getResult: () => PlacementResult;
}

export class AdaptiveTestSession {
  private pool: PlacementQuestion[];
  private usedIds: Set<string> = new Set();
  private answers: PlacementAnswer[] = [];
  public currentDifficulty = 5.0; // Start at medium difficulty
  public maxQuestions = 15;
  private currentQ: PlacementQuestion | null = null;
  private startTime = 0;

  constructor(pool: PlacementQuestion[], maxQuestions = 15) {
    this.pool = pool;
    this.maxQuestions = maxQuestions;
    this.selectNextQuestion();
  }

  public getCurrentQuestion(): PlacementQuestion | null {
    return this.currentQ;
  }

  public getAnswersCount(): number {
    return this.answers.length;
  }

  public recordAnswer(selectedIndex: number): { isCorrect: boolean; isComplete: boolean } {
    if (!this.currentQ) {
      return { isCorrect: false, isComplete: true };
    }

    const isCorrect = selectedIndex === this.currentQ.correctAnswer;
    const timeTaken = Math.round((Date.now() - this.startTime) / 1000);

    this.answers.push({
      questionId: this.currentQ.id,
      difficulty: this.currentQ.difficulty,
      level: this.currentQ.level,
      selectedAnswer: selectedIndex,
      isCorrect,
      timeTaken,
    });

    // Adaptive difficulty adjustment
    if (isCorrect) {
      this.currentDifficulty = Math.min(10, this.currentDifficulty + 1.5);
    } else {
      this.currentDifficulty = Math.max(1, this.currentDifficulty - 1.2);
    }

    const isComplete = this.answers.length >= this.maxQuestions;

    if (!isComplete) {
      this.selectNextQuestion();
    } else {
      this.currentQ = null;
    }

    return { isCorrect, isComplete };
  }

  private selectNextQuestion(): void {
    const available = this.pool.filter((q) => !this.usedIds.has(q.id));
    if (available.length === 0) {
      this.currentQ = null;
      return;
    }

    // Sort by difference to current difficulty
    available.sort((a, b) => {
      const diffA = Math.abs(a.difficulty - this.currentDifficulty);
      const diffB = Math.abs(b.difficulty - this.currentDifficulty);
      return diffA - diffB;
    });

    // Pick among the top 3 best matching questions to avoid deterministic repeats
    const candidateSlice = available.slice(0, Math.min(3, available.length));
    const chosen = candidateSlice[Math.floor(Math.random() * candidateSlice.length)];

    this.usedIds.add(chosen.id);
    this.currentQ = chosen;
    this.startTime = Date.now();
  }

  public getResult(): PlacementResult {
    const total = this.answers.length;
    const correct = this.answers.filter((a) => a.isCorrect).length;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

    // Weighted average of correct difficulties
    const correctAnswers = this.answers.filter((a) => a.isCorrect);
    const avgCorrectDiff =
      correctAnswers.length > 0
        ? correctAnswers.reduce((sum, a) => sum + a.difficulty, 0) / correctAnswers.length
        : 2;

    // Estimate TOEIC scaled score and level
    let estimatedScore = 400;
    let level: WordLevel = 'essential';

    if (avgCorrectDiff >= 7.5 && accuracy >= 70) {
      level = 'advanced';
      estimatedScore = Math.min(950, 750 + Math.round(accuracy * 2));
    } else if (avgCorrectDiff >= 4.5 && accuracy >= 50) {
      level = 'intermediate';
      estimatedScore = Math.min(740, 550 + Math.round(accuracy * 1.8));
    } else {
      level = 'essential';
      estimatedScore = Math.min(540, 350 + Math.round(accuracy * 1.5));
    }

    return {
      level,
      score: estimatedScore,
      questionsAnswered: total,
      correctAnswers: correct,
      accuracy,
      testedQuestions: this.answers,
    };
  }
}
