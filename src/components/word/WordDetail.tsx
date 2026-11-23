'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CheckCircle,
  Zap,
  TrendingUp,
  MessageCircle,
  Bot,
  Compass,
  Target,
  Sparkles,
} from 'lucide-react';
import { VocabularyWord, WordLevel } from '@/types/vocabulary';
import { useProgress } from '@/contexts/ProgressContext';
import { useChat } from '@/contexts/ChatContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import {
  LEVEL_CONFIG,
  getWordPopularityScore,
  getDailyCommunicationScore,
} from '@/lib/vocabulary-helpers';
import { allVocabularyWords } from '@/data/vocabulary';
import { PronunciationPlayer } from './PronunciationPlayer';
import { EtymologySection } from './EtymologySection';
import { NativeMindset } from './NativeMindset';
import { SentenceExamples } from './SentenceExamples';
import { VisualAssociation } from './VisualAssociation';
import { WordFamilySection } from './WordFamilySection';
import { ToeicTipsSection } from './ToeicTipsSection';
import { VideoSection } from './VideoSection';
import { AiTutorSection } from './AiTutorSection';
import { DictionaryLinks } from './DictionaryLinks';

interface WordDetailProps {
  word: VocabularyWord;
  previousWordId?: string;
  nextWordId?: string;
  initialLevel?: string;
  initialCategory?: string;
}

export function WordDetail({
  word,
  previousWordId,
  nextWordId,
  initialLevel,
  initialCategory,
}: WordDetailProps) {
  const router = useRouter();
  const { recordReview, toggleBookmark, isBookmarked, getCard } = useProgress();
  const { state: onboardingState, setCurrentLevel } = useOnboarding();
  const { openChat } = useChat();
  const [ratedQuality, setRatedQuality] = useState<number | null>(null);

  const establishedLevel: WordLevel =
    onboardingState.learningPath?.currentLevel ||
    onboardingState.placementResult?.level ||
    'essential';

  // Active level for learning navigation
  const [selectedLevel, setSelectedLevel] = useState<WordLevel | 'all'>(() => {
    if (
      initialLevel === 'essential' ||
      initialLevel === 'intermediate' ||
      initialLevel === 'advanced' ||
      initialLevel === 'all'
    ) {
      return initialLevel;
    }
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('toeic_study_navigation_level');
        if (
          saved === 'essential' ||
          saved === 'intermediate' ||
          saved === 'advanced' ||
          saved === 'all'
        ) {
          return saved;
        }
      } catch {
        // ignore
      }
    }
    return word.level;
  });

  const [categoryLock, setCategoryLock] = useState<boolean>(Boolean(initialCategory));

  const handleLevelChange = (lvl: WordLevel | 'all') => {
    setSelectedLevel(lvl);
    try {
      localStorage.setItem('toeic_study_navigation_level', lvl);
    } catch {
      // ignore
    }
  };

  const handleSyncToLearningPath = (lvl: WordLevel) => {
    setCurrentLevel(lvl);
    setSelectedLevel(lvl);
    try {
      localStorage.setItem('toeic_study_navigation_level', lvl);
    } catch {
      // ignore
    }
  };

  // Filter word bank according to chosen level & category lock
  const filteredWords = useMemo(() => {
    return allVocabularyWords.filter((w) => {
      if (selectedLevel !== 'all' && w.level !== selectedLevel) return false;
      if (categoryLock && w.category !== word.category) return false;
      return true;
    });
  }, [selectedLevel, categoryLock, word.category]);

  const currentIndex = useMemo(() => {
    return filteredWords.findIndex((w) => w.id === word.id);
  }, [filteredWords, word.id]);

  const prevWord = useMemo(() => {
    if (currentIndex > 0) return filteredWords[currentIndex - 1];
    if (currentIndex === -1 && filteredWords.length > 0) return undefined;
    return previousWordId ? allVocabularyWords.find((w) => w.id === previousWordId) : undefined;
  }, [filteredWords, currentIndex, previousWordId]);

  const nextWord = useMemo(() => {
    if (currentIndex >= 0 && currentIndex < filteredWords.length - 1) {
      return filteredWords[currentIndex + 1];
    }
    if (currentIndex === -1 && filteredWords.length > 0) {
      return filteredWords[0];
    }
    return nextWordId ? allVocabularyWords.find((w) => w.id === nextWordId) : undefined;
  }, [filteredWords, currentIndex, nextWordId]);

  const currentRank = currentIndex >= 0 ? currentIndex + 1 : null;
  const totalInLevel = filteredWords.length;

  const buildWordUrl = React.useCallback(
    (targetWordId: string) => {
      const params = new URLSearchParams();
      if (selectedLevel !== 'all') {
        params.set('level', selectedLevel);
      }
      if (categoryLock) {
        params.set('category', word.category);
      }
      const qs = params.toString();
      return `/word/${targetWordId}${qs ? `?${qs}` : ''}`;
    },
    [selectedLevel, categoryLock, word.category]
  );

  // Keyboard navigation shortcuts: ArrowRight -> Next, ArrowLeft -> Prev
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }
      if (e.key === 'ArrowRight' && nextWord) {
        router.push(buildWordUrl(nextWord.id));
      } else if (e.key === 'ArrowLeft' && prevWord) {
        router.push(buildWordUrl(prevWord.id));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextWord, prevWord, buildWordUrl, router]);

  const bookmarked = isBookmarked(word.id);
  const currentCard = getCard(word.id);

  const handleRate = (quality: number) => {
    recordReview(word.id, quality);
    setRatedQuality(quality);
    setTimeout(() => setRatedQuality(null), 3000);
  };

  const handleOpenAi = () => {
    openChat(
      undefined,
      {
        id: `word-${word.id}`,
        type: 'word',
        word: word.word,
        category: word.category,
        level: word.level,
        meaning: word.deepMeaning?.coreConcept,
        ipa: word.pronunciation?.ipa,
        partOfSpeech: word.partOfSpeech,
        synonyms: word.synonyms,
        antonyms: word.antonyms,
      },
      { append: true }
    );
  };

  return (
    <article className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href={`/categories${selectedLevel !== 'all' ? `?level=${selectedLevel}` : ''}`}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>
            Kho từ vựng {selectedLevel !== 'all' ? `(${LEVEL_CONFIG[selectedLevel as WordLevel]?.shortLabel})` : ''}
          </span>
        </Link>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <DictionaryLinks word={word.word} variant="dropdown" />

          <button
            onClick={handleOpenAi}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-xs font-semibold transition-all shadow-sm"
          >
            <Bot className="w-3.5 h-3.5 text-indigo-400" />
            <span>Hỏi AI Tutor</span>
          </button>

          <button
            onClick={() => toggleBookmark(word.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              bookmarked
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-amber-400' : ''}`} />
            <span>{bookmarked ? 'Đã lưu' : 'Lưu từ'}</span>
          </button>
        </div>
      </div>

      {/* Learning Level Navigation & Path Banner */}
      <section className="rounded-3xl bg-slate-900/90 border border-slate-800 p-4 sm:p-5 shadow-xl space-y-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Chế độ học từ:
                </span>
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                    selectedLevel === 'all'
                      ? 'bg-slate-800 text-slate-200 border-slate-700'
                      : LEVEL_CONFIG[selectedLevel as WordLevel]?.badgeClass
                  }`}
                >
                  {selectedLevel === 'all'
                    ? 'Tất cả cấp độ'
                    : LEVEL_CONFIG[selectedLevel as WordLevel]?.label}
                </span>

                {onboardingState.learningPath && (
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                      selectedLevel === establishedLevel
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    <Target className="w-3 h-3 text-emerald-400" />
                    <span>Lộ trình mục tiêu: {LEVEL_CONFIG[establishedLevel]?.shortLabel}</span>
                  </span>
                )}
              </div>

              <div className="text-xs text-slate-400 mt-1 flex items-center gap-2 flex-wrap">
                {currentRank ? (
                  <span>
                    Từ số <strong className="text-white">{currentRank}</strong> /{' '}
                    <strong className="text-white">{totalInLevel.toLocaleString()}</strong> trong cấp độ{' '}
                    <span className="text-indigo-300 font-semibold">
                      {selectedLevel === 'all' ? 'kho từ' : LEVEL_CONFIG[selectedLevel as WordLevel]?.shortLabel}
                    </span>
                  </span>
                ) : (
                  <span className="text-amber-400">
                    Từ hiện tại là {word.level}. Bạn đang chọn xem trước danh sách {selectedLevel}.
                  </span>
                )}
                {categoryLock && (
                  <span className="text-indigo-400 text-[11px]">
                    • Khóa theo chủ đề: <strong>{word.category}</strong>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Level Switcher Pills */}
          <div className="flex items-center gap-1.5 flex-wrap self-start md:self-auto">
            {(['essential', 'intermediate', 'advanced', 'all'] as const).map((lvl) => {
              const isActive = selectedLevel === lvl;
              const label =
                lvl === 'essential'
                  ? 'Căn bản'
                  : lvl === 'intermediate'
                  ? 'Trung cấp'
                  : lvl === 'advanced'
                  ? 'Nâng cao'
                  : 'Tất cả';

              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => handleLevelChange(lvl)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    isActive
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30 scale-[1.02]'
                      : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Lock & Set as Default Level Options */}
        <div className="pt-2.5 border-t border-slate-800/70 flex items-center justify-between gap-3 flex-wrap text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300">
            <input
              type="checkbox"
              checked={categoryLock}
              onChange={(e) => setCategoryLock(e.target.checked)}
              className="rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5 cursor-pointer"
            />
            <span>
              Chỉ học trong chủ đề &ldquo;{word.category}&rdquo; ({filteredWords.length} từ)
            </span>
          </label>

          {selectedLevel !== 'all' && selectedLevel !== establishedLevel && (
            <button
              type="button"
              onClick={() => handleSyncToLearningPath(selectedLevel as WordLevel)}
              className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Đặt &ldquo;{LEVEL_CONFIG[selectedLevel as WordLevel]?.shortLabel}&rdquo; làm Cấp độ Lộ trình mặc định</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </section>

      {/* Hero Header */}
      <header className="rounded-3xl bg-gradient-to-br from-indigo-950/60 via-slate-900/90 to-purple-950/40 border border-slate-800 p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {word.category.replace('-', ' ')}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                  LEVEL_CONFIG[word.level]?.badgeClass || 'bg-slate-800 text-slate-400'
                }`}
                title={LEVEL_CONFIG[word.level]?.description}
              >
                {LEVEL_CONFIG[word.level]?.label || word.level}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
                <TrendingUp className="w-3 h-3 text-indigo-400" />
                <span>TOEIC: {getWordPopularityScore(word)}/10</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                <MessageCircle className="w-3 h-3 text-emerald-400" />
                <span>Daily: {getDailyCommunicationScore(word)}/10</span>
              </span>
              {currentCard && currentCard.repetitions > 0 && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>SRS Streak: {currentCard.repetitions}</span>
                </span>
              )}
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
              {word.word}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              {word.deepMeaning.coreConcept}
            </p>

            {/* Quick Dictionary lookup buttons */}
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <span className="text-xs text-slate-400 font-medium">Tra từ điển:</span>
              <DictionaryLinks word={word.word} variant="buttons" />
            </div>
          </div>

          {/* Quick parts of speech tag */}
          <div className="flex flex-wrap gap-1.5 self-start md:self-end">
            {word.partOfSpeech.map((pos) => (
              <span
                key={pos}
                className="px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-700/80 text-xs font-mono font-bold text-indigo-300"
              >
                {pos}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* 1. Pronunciation Player */}
      <PronunciationPlayer
        word={word.word}
        ipa={word.pronunciation.ipa}
        syllables={word.pronunciation.syllableBreakdown}
        stressPattern={word.pronunciation.stressPattern}
        commonMistakes={word.pronunciation.commonMistakes}
        audioUrl={word.pronunciation.audioUrl}
      />

      {/* 2. Etymology & Origins */}
      <EtymologySection etymology={word.etymology} />

      {/* 3. Native Speaker Mindset & Perception */}
      <NativeMindset nativeMindset={word.nativeMindset} deepMeaning={word.deepMeaning} />

      {/* 4. Visual Anchor */}
      <VisualAssociation visual={word.visual} word={word.word} wordId={word.id} />

      {/* 5. Real-World Sentences */}
      <SentenceExamples examples={word.examples} word={word.word} />

      {/* 6. Word Family & Forms (Part 5) */}
      <WordFamilySection
        wordFamily={word.wordFamily}
        synonyms={word.synonyms}
        antonyms={word.antonyms}
        currentWord={word.word}
      />

      {/* 7. TOEIC Intelligence Tips */}
      <ToeicTipsSection
        toeicContext={word.toeicContext}
        frequency={word.toeicFrequency}
        dailyFrequencyScore={getDailyCommunicationScore(word)}
      />

      {/* 8. AI Tutor Interactive Assistant (Hybrid Gemini + Cloudflare) */}
      <AiTutorSection word={word} />

      {/* 9. Video & Multimedia Immersion */}
      <VideoSection key={word.id} video={word.video} word={word.word} category={word.category} />

      {/* SRS Recall Self-Check Bar */}
      <section className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400">
            <Zap className="w-5 h-5" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100">
              Spaced Repetition Memory Rating
            </h3>
          </div>
          {ratedQuality !== null && (
            <span className="text-xs text-emerald-400 font-semibold animate-pulse">
              ✓ Review logged in SRS engine!
            </span>
          )}
        </div>
        <p className="text-xs text-slate-400">
          How confident are you using this word naturally? Rate your active recall to schedule the next optimal review interval:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => handleRate(1)}
            className="p-3 rounded-xl bg-slate-950 border border-rose-500/30 hover:border-rose-500 hover:bg-rose-950/20 text-rose-300 text-xs font-semibold transition-all text-center"
          >
            <div className="text-sm font-bold block mb-0.5">Again</div>
            <div className="text-[10px] text-slate-400">1 day review</div>
          </button>
          <button
            onClick={() => handleRate(3)}
            className="p-3 rounded-xl bg-slate-950 border border-amber-500/30 hover:border-amber-500 hover:bg-amber-950/20 text-amber-300 text-xs font-semibold transition-all text-center"
          >
            <div className="text-sm font-bold block mb-0.5">Hard</div>
            <div className="text-[10px] text-slate-400">Recalled with effort</div>
          </button>
          <button
            onClick={() => handleRate(4)}
            className="p-3 rounded-xl bg-slate-950 border border-indigo-500/30 hover:border-indigo-500 hover:bg-indigo-950/20 text-indigo-300 text-xs font-semibold transition-all text-center"
          >
            <div className="text-sm font-bold block mb-0.5">Good</div>
            <div className="text-[10px] text-slate-400">Hesitated slightly</div>
          </button>
          <button
            onClick={() => handleRate(5)}
            className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-950/20 text-emerald-300 text-xs font-semibold transition-all text-center"
          >
            <div className="text-sm font-bold block mb-0.5">Easy</div>
            <div className="text-[10px] text-slate-400">Instant recall</div>
          </button>
        </div>
      </section>

      {/* Prev / Next Footer Controls */}
      <footer className="pt-6 border-t border-slate-800 space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-400" />
            <span>
              Cấp độ đang học:{' '}
              <strong className="text-white">
                {selectedLevel === 'all'
                  ? 'Tất cả các từ'
                  : LEVEL_CONFIG[selectedLevel as WordLevel]?.label}
              </strong>
            </span>
          </div>
          {currentRank && (
            <span className="font-mono text-xs text-slate-400">
              {currentRank} / {totalInLevel} ({Math.round((currentRank / totalInLevel) * 100)}%)
            </span>
          )}
        </div>

        {/* Progress Bar in Level */}
        {currentRank && (
          <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
              style={{ width: `${Math.round((currentRank / totalInLevel) * 100)}%` }}
            />
          </div>
        )}

        <div className="flex items-center justify-between gap-4 pt-1">
          {prevWord ? (
            <Link
              href={buildWordUrl(prevWord.id)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 transition-all group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform text-indigo-400" />
              <div className="text-left">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                  Từ trước
                </div>
                <div className="font-bold text-white truncate max-w-[120px] sm:max-w-[200px]">
                  {prevWord.word}
                </div>
              </div>
            </Link>
          ) : (
            <div className="text-xs text-slate-500 italic px-2">Đầu danh sách cấp độ</div>
          )}

          {nextWord ? (
            <Link
              href={buildWordUrl(nextWord.id)}
              className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30 group"
            >
              <div className="text-right">
                <div className="text-[10px] text-indigo-200 uppercase tracking-wider font-bold">
                  Từ tiếp theo ({selectedLevel !== 'all' ? LEVEL_CONFIG[selectedLevel as WordLevel]?.shortLabel : 'Tiếp theo'})
                </div>
                <div className="font-bold truncate max-w-[120px] sm:max-w-[200px]">
                  {nextWord.word}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ) : (
            <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 px-2">
              <CheckCircle className="w-4 h-4" />
              <span>Đã hoàn thành toàn bộ từ cấp độ {selectedLevel}!</span>
            </div>
          )}
        </div>
      </footer>
    </article>
  );
}
