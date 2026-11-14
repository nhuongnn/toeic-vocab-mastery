'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  RotateCcw,
  Sparkles,
  Trophy,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Undo2,
} from 'lucide-react';
import { VocabularyWord } from '@/types/vocabulary';
import { useProgress } from '@/contexts/ProgressContext';
import { getRandomWords } from '@/data/vocabulary';

interface SentenceQuestion {
  word: VocabularyWord;
  fullSentence: string;
  tokens: { id: string; text: string }[];
}

function tokenizeSentence(sentence: string): { id: string; text: string }[] {
  // Split by whitespace while preserving punctuation attached to words
  const rawWords = sentence.trim().split(/\s+/);
  return rawWords.map((text, idx) => ({
    id: `${idx}-${text}`,
    text,
  }));
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function ContextBuilder() {
  const { recordReview, recordExerciseSession } = useProgress();

  const [questions, setQuestions] = useState<SentenceQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [availableTokens, setAvailableTokens] = useState<{ id: string; text: string }[]>([]);
  const [selectedTokens, setSelectedTokens] = useState<{ id: string; text: string }[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    initSession();
  }, []);

  const initSession = () => {
    const randomWords = getRandomWords(5);
    const preparedQuestions: SentenceQuestion[] = randomWords.map((word) => {
      // Pick the best business or daily sentence
      const candidates = [
        ...(word.examples.business || []),
        ...(word.examples.daily || []),
      ].filter((s) => s.split(' ').length >= 5 && s.split(' ').length <= 14);

      const sentence = candidates.length > 0 ? candidates[0] : word.examples.daily[0] || `${word.word} is crucial in the workplace.`;
      const tokens = tokenizeSentence(sentence);

      return {
        word,
        fullSentence: sentence,
        tokens,
      };
    });

    setQuestions(preparedQuestions);
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setSubmitted(false);
    setIsCorrect(false);
    setShowHint(false);

    if (preparedQuestions.length > 0) {
      setAvailableTokens(shuffleArray(preparedQuestions[0].tokens));
      setSelectedTokens([]);
    }
  };

  const handlePickToken = (token: { id: string; text: string }) => {
    if (submitted) return;
    setAvailableTokens((prev) => prev.filter((t) => t.id !== token.id));
    setSelectedTokens((prev) => [...prev, token]);
  };

  const handleReturnToken = (token: { id: string; text: string }) => {
    if (submitted) return;
    setSelectedTokens((prev) => prev.filter((t) => t.id !== token.id));
    setAvailableTokens((prev) => [...prev, token]);
  };

  const handleResetTokens = () => {
    if (submitted || !questions[currentIndex]) return;
    setAvailableTokens(shuffleArray(questions[currentIndex].tokens));
    setSelectedTokens([]);
  };

  const handleVerify = () => {
    if (submitted || selectedTokens.length === 0) return;

    const currentQ = questions[currentIndex];
    const builtSentence = selectedTokens.map((t) => t.text).join(' ');
    const correct = builtSentence.trim() === currentQ.fullSentence.trim();

    setIsCorrect(correct);
    setSubmitted(true);

    if (correct) {
      setScore((s) => s + 1);
      recordReview(currentQ.word.id, 5);
    } else {
      recordReview(currentQ.word.id, 2);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setAvailableTokens(shuffleArray(questions[nextIdx].tokens));
      setSelectedTokens([]);
      setSubmitted(false);
      setIsCorrect(false);
      setShowHint(false);
    } else {
      const finalCorrect = score + (isCorrect ? 1 : 0);
      setIsFinished(true);
      recordExerciseSession({
        date: new Date().toISOString(),
        type: 'context-builder',
        totalQuestions: questions.length,
        correctAnswers: finalCorrect,
        scorePercentage: Math.round((finalCorrect / questions.length) * 100),
        wordsPracticed: questions.map((q) => q.word.id),
      });
    }
  };

  if (questions.length === 0) {
    return <div className="text-center py-12 text-slate-500 text-sm">Loading syntax workspace...</div>;
  }

  const currentQ = questions[currentIndex];

  if (isFinished) {
    const finalScore = score;
    const percentage = Math.round((finalScore / questions.length) * 100);

    return (
      <div className="max-w-xl mx-auto rounded-3xl bg-slate-900 border border-slate-800 p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-500 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-indigo-500/20">
          <Trophy className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-white">Syntax Assembly Complete!</h2>
          <p className="text-xs text-slate-400">
            You successfully reconstructed native workplace sentences and ingrained collocations.
          </p>
        </div>

        <div className="py-4 border-y border-slate-800 flex items-center justify-around">
          <div>
            <div className="text-3xl font-black text-indigo-400">{finalScore}/{questions.length}</div>
            <div className="text-xs text-slate-400">Score</div>
          </div>
          <div>
            <div className="text-3xl font-black text-emerald-400">{percentage}%</div>
            <div className="text-xs text-slate-400">Accuracy</div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={initSession}
            className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Build Another Deck</span>
          </button>
          <Link
            href="/categories"
            className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <span>Explore Words</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Progress & Target Word Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Sentence {currentIndex + 1} of {questions.length}
          </span>
          <div className="text-sm text-slate-300 font-medium">
            Assemble the natural native context for{' '}
            <span className="text-white font-bold uppercase underline decoration-indigo-500 underline-offset-4">
              {currentQ.word.word}
            </span>
          </div>
        </div>
        <div className="text-xs font-bold text-slate-400 font-mono">
          Score: {score}
        </div>
      </div>

      {/* Assembly Canvas */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Target Meaning Anchor:</span>
          </span>
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-slate-400 hover:text-indigo-400 flex items-center gap-1 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHint ? 'Hide Hint' : 'Show Clue'}</span>
          </button>
        </div>

        <p className="text-sm text-slate-300 italic bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
          "{currentQ.word.deepMeaning.coreConcept}"
        </p>

        {showHint && (
          <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-indigo-200 space-y-1">
            <strong className="block text-indigo-300">Collocation Pattern:</strong>
            <p>{currentQ.word.examples.collocations?.slice(0, 3).join(' • ') || 'Observe subject-verb-object arrangement.'}</p>
          </div>
        )}

        {/* Selected Tokens (Workspace) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Assembled Sentence:
            </span>
            {selectedTokens.length > 0 && !submitted && (
              <button
                onClick={handleResetTokens}
                className="text-xs text-slate-500 hover:text-rose-400 flex items-center gap-1 transition-colors"
              >
                <Undo2 className="w-3.5 h-3.5" />
                <span>Clear workspace</span>
              </button>
            )}
          </div>

          <div className="min-h-[90px] p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap gap-2 items-center">
            {selectedTokens.length === 0 ? (
              <span className="text-xs text-slate-600 italic">
                Tap the words below in logical grammatical order to construct the sentence...
              </span>
            ) : (
              selectedTokens.map((token) => {
                const isTargetWord = token.text.toLowerCase().includes(currentQ.word.word.toLowerCase());
                return (
                  <button
                    key={token.id}
                    onClick={() => handleReturnToken(token)}
                    disabled={submitted}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                      isTargetWord
                        ? 'bg-indigo-600 text-white border border-indigo-400 shadow-sm'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    }`}
                  >
                    {token.text}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Available Tokens to Pick */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Available Words:
          </span>
          <div className="flex flex-wrap gap-2 min-h-[50px] p-3 rounded-xl bg-slate-950/40 border border-dashed border-slate-800">
            {availableTokens.length === 0 ? (
              <span className="text-xs text-slate-600 italic flex items-center gap-1">
                All words placed in sentence! Tap "Verify Sentence" when ready.
              </span>
            ) : (
              availableTokens.map((token) => (
                <button
                  key={token.id}
                  onClick={() => handlePickToken(token)}
                  disabled={submitted}
                  className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-sm font-medium border border-slate-700 hover:border-slate-600 transition-all active:scale-95"
                >
                  {token.text}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Verification / Result Feedback */}
        {submitted ? (
          <div className="space-y-4 pt-2">
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 ${
                isCorrect
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
              }`}
            >
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
              )}
              <div className="space-y-1 text-xs">
                <div className="font-bold text-sm">
                  {isCorrect ? 'Accurate Native Sentence Structure!' : 'Sentence Order Needs Revision'}
                </div>
                {!isCorrect && (
                  <div className="text-slate-300 pt-1">
                    <strong className="text-white block mb-0.5">Correct syntax:</strong>
                    <span className="font-semibold text-indigo-300">{currentQ.fullSentence}</span>
                  </div>
                )}
                <div className="text-slate-400 pt-1">
                  <strong>Native perception: </strong>
                  {currentQ.word.nativeMindset.howNativesThink}
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-600/30"
            >
              <span>{currentIndex + 1 < questions.length ? 'Next Sentence' : 'View Results'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleVerify}
            disabled={selectedTokens.length === 0}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-indigo-600/25"
          >
            Verify Sentence Syntax
          </button>
        )}
      </div>
    </div>
  );
}
