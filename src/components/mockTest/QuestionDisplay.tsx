'use client';

import React from 'react';
import { FlattenedQuestion } from '@/types/mockTest';
import { Part5Question } from './Part5Question';
import { Part6Question } from './Part6Question';
import { Part7Question } from './Part7Question';

interface QuestionDisplayProps {
  question: FlattenedQuestion;
  selectedAnswer: number | null;
  onSelectOption: (optionIndex: number) => void;
}

export function QuestionDisplay({
  question,
  selectedAnswer,
  onSelectOption,
}: QuestionDisplayProps) {
  if (question.part === 5) {
    return (
      <Part5Question
        question={question}
        selectedAnswer={selectedAnswer}
        onSelectOption={onSelectOption}
      />
    );
  }

  if (question.part === 6) {
    return (
      <Part6Question
        question={question}
        selectedAnswer={selectedAnswer}
        onSelectOption={onSelectOption}
      />
    );
  }

  return (
    <Part7Question
      question={question}
      selectedAnswer={selectedAnswer}
      onSelectOption={onSelectOption}
    />
  );
}
