import { part1Questions } from './part1-photos';
import { part2Questions } from './part2-questions';
import { part3Conversations } from './part3-conversations';
import { part4ShortTalks } from './part4-talks';
import { videoExercises } from './video-exercises';

export * from './part1-photos';
export * from './part2-questions';
export * from './part3-conversations';
export * from './part4-talks';
export * from './video-exercises';

export function getPart1Questions() {
  return part1Questions;
}

export function getPart2Questions() {
  return part2Questions;
}

export function getPart3Conversations() {
  return part3Conversations;
}

export function getPart4ShortTalks() {
  return part4ShortTalks;
}

export function getVideoListeningExercises() {
  return videoExercises;
}

export function getVideoExerciseById(id: string) {
  return videoExercises.find((v) => v.id === id) || null;
}

export interface ListeningOverviewStats {
  totalPart1: number;
  totalPart2: number;
  totalPart3Dialogues: number;
  totalPart3Questions: number;
  totalPart4Talks: number;
  totalPart4Questions: number;
  totalVideoExercises: number;
  totalAudioQuestions: number;
}

export function getListeningStats(): ListeningOverviewStats {
  const p3QuestionsCount = part3Conversations.reduce((sum, c) => sum + c.questions.length, 0);
  const p4QuestionsCount = part4ShortTalks.reduce((sum, t) => sum + t.questions.length, 0);

  return {
    totalPart1: part1Questions.length,
    totalPart2: part2Questions.length,
    totalPart3Dialogues: part3Conversations.length,
    totalPart3Questions: p3QuestionsCount,
    totalPart4Talks: part4ShortTalks.length,
    totalPart4Questions: p4QuestionsCount,
    totalVideoExercises: videoExercises.length,
    totalAudioQuestions: part1Questions.length + part2Questions.length + p3QuestionsCount + p4QuestionsCount,
  };
}
