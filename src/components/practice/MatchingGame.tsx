'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Trophy, RotateCcw, ArrowRight, CheckCircle2 } from 'lucide-react';
import { VocabularyWord } from '@/types/vocabulary';
import { useProgress } from '@/contexts/ProgressContext';
import { getRandomWords } from '@/data/vocabulary';

interface MatchItem {
  id: string;
  wordId: string;
  text: string;
  type: 'word' | 'meaning';
}

export function MatchingGame() {
  const { recordReview, recordExerciseSession } = useProgress();

  const generateItems = () => {
    const selected = getRandomWords(4);
    const wordCards: MatchItem[] = selected.map((w) => ({
      id: `w-${w.id}`,
      wordId: w.id,
      text: w.word.toUpperCase(),
      type: 'word',
    }));
    const meaningCards: MatchItem[] = selected.map((w) => ({
      id: `m-${w.id}`,
      wordId: w.id,
      text: w.deepMeaning.coreConcept,
      type: 'meaning',
    }));

    return {
      words: selected,
      cards: [...wordCards, ...meaningCards].sort(() => Math.random() - 0.5),
    };
  };

  const [gameState, setGameState] = useState<{ words: VocabularyWord[]; cards: MatchItem[] }>({
    words: [],
    cards: [],
  });
  const [selectedFirst, setSelectedFirst] = useState<MatchItem | null>(null);
  const [matchedWordIds, setMatchedWordIds] = useState<string[]>([]);
  const [wrongPair, setWrongPair] = useState<[string, string] | null>(null);
  const [moves, setMoves] = useState(0);

  React.useEffect(() => {
    setGameState(generateItems());
  }, []);

  if (gameState.cards.length === 0) {
    return <div className="text-center py-12 text-slate-500 text-sm">Loading memory matching board...</div>;
  }

  const handleCardClick = (card: MatchItem) => {
    if (matchedWordIds.includes(card.wordId) || wrongPair !== null) return;
    if (selectedFirst && selectedFirst.id === card.id) return; // clicked same card

    if (!selectedFirst) {
      setSelectedFirst(card);
    } else {
      setMoves((m) => m + 1);

      // Check if one is word and one is meaning of the same wordId
      if (
        selectedFirst.wordId === card.wordId &&
        selectedFirst.type !== card.type
      ) {
        // Matched!
        const newMatched = [...matchedWordIds, card.wordId];
        setMatchedWordIds(newMatched);
        setSelectedFirst(null);
        recordReview(card.wordId, 5);

        if (newMatched.length === gameState.words.length) {
          recordExerciseSession({
            date: new Date().toISOString(),
            type: 'matching',
            totalQuestions: gameState.words.length,
            correctAnswers: gameState.words.length,
            scorePercentage: 100,
            wordsPracticed: gameState.words.map((w) => w.id),
          });
        }
      } else {
        // Mismatched
        setWrongPair([selectedFirst.id, card.id]);
        setTimeout(() => {
          setWrongPair(null);
          setSelectedFirst(null);
        }, 1000);
      }
    }
  };

  const isComplete = matchedWordIds.length === gameState.words.length;

  const restart = () => {
    setGameState(generateItems());
    setSelectedFirst(null);
    setMatchedWordIds([]);
    setWrongPair(null);
    setMoves(0);
  };

  if (isComplete) {
    return (
      <div className="text-center py-16 px-4 max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-6">
          <Trophy className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black text-white mb-2">All Pairs Matched!</h2>
        <p className="text-sm text-slate-300 mb-6">
          You cleared the board in <strong className="text-purple-400">{moves}</strong> moves.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={restart}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-sm font-bold hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Another Board</span>
          </button>
          <Link
            href="/categories"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-colors"
          >
            <span>Explore Words</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
        <span>Matches: {matchedWordIds.length} / {gameState.words.length}</span>
        <span>Moves: <strong className="text-purple-400">{moves}</strong></span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {gameState.cards.map((card) => {
          const isMatched = matchedWordIds.includes(card.wordId);
          const isSelected = selectedFirst?.id === card.id;
          const isWrong = wrongPair && (wrongPair[0] === card.id || wrongPair[1] === card.id);

          let style = 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700';

          if (isMatched) {
            style = 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300 opacity-40 pointer-events-none';
          } else if (isWrong) {
            style = 'bg-rose-950/40 border-rose-500 text-rose-300 animate-shake';
          } else if (isSelected) {
            style = 'bg-indigo-950/60 border-indigo-500 text-white scale-[0.98] shadow-lg shadow-indigo-500/20';
          }

          return (
            <button
              key={card.id}
              disabled={isMatched}
              onClick={() => handleCardClick(card)}
              className={`min-h-[120px] p-4 rounded-2xl border-2 transition-all flex flex-col justify-center text-center select-none ${style}`}
            >
              <span className={`text-xs ${card.type === 'word' ? 'font-black tracking-wide uppercase text-sm' : 'line-clamp-4 leading-relaxed'}`}>
                {card.text}
              </span>
              {isMatched && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto mt-2" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
