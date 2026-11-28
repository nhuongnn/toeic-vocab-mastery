'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  History,
  Play,
  ArrowRight,
  Cloud,
  CloudCheck,
  CloudAlert,
  RefreshCw,
  Volume2,
  Bookmark,
  Compass,
  Target,
  Clock,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Trash2,
  Layers,
} from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useAuth } from '@/contexts/AuthContext';
import { useSpeech } from '@/hooks/useSpeech';
import { useMounted } from '@/hooks/useMounted';
import { allVocabularyWords, wordsById } from '@/data/vocabulary';
import { categories } from '@/data/categories';
import { VocabStudyLevelMode } from '@/types/progress';
import { CategoryId, WordLevel } from '@/types/vocabulary';
import { LEVEL_CONFIG } from '@/lib/vocabulary-helpers';
import {
  RecentVocabFilterScope,
  buildWordStudyUrl,
  filterRecentVocabEntries,
  formatRelativeTimeVi,
  getPhaseProgress,
  getResumeRecommendation,
} from '@/lib/vocab-study';

interface RecentVocabAndResumeSectionProps {
  activeCategory?: CategoryId | 'all';
  activeLevel?: WordLevel | 'all';
  activePhaseId?: string | null;
  onSelectPhase?: (phaseId: string | null) => void;
  onSelectStudyLevel?: (level: VocabStudyLevelMode) => void;
}

const DEFAULT_VISIBLE_COUNT = 4;

export function RecentVocabAndResumeSection({
  activeCategory = 'all',
  activeLevel = 'all',
  activePhaseId = null,
  onSelectPhase,
  onSelectStudyLevel,
}: RecentVocabAndResumeSectionProps) {
  const {
    progress,
    recentVocabHistory,
    vocabStudyState,
    syncStatus,
    lastSyncedAt,
    forceSync,
    updateVocabStudyState,
    clearRecentVocabHistory,
    toggleBookmark,
    isBookmarked,
    getCard,
  } = useProgress();
  const { state: onboardingState } = useOnboarding();
  const { user, openAuthModal } = useAuth();
  const { speak } = useSpeech();
  const mounted = useMounted();

  const [scope, setScope] = useState<RecentVocabFilterScope>('all');
  const [selectedPathPhaseFilter, setSelectedPathPhaseFilter] = useState<string>('all');
  const [showAllRecent, setShowAllRecent] = useState(false);
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(true);
  const [confirmClear, setConfirmClear] = useState(false);

  const learningPath = onboardingState.learningPath;
  const effectiveStudyLevel: VocabStudyLevelMode =
    vocabStudyState?.studyModeLevel ||
    (activeLevel !== 'all' ? activeLevel : learningPath?.currentLevel || 'essential');

  // Determine whether resume recommendation should prefer learning path or current study mode
  const effectivePreferredPhaseId =
    activePhaseId ??
    (scope === 'learning-path' && selectedPathPhaseFilter !== 'all'
      ? selectedPathPhaseFilter
      : vocabStudyState?.activePhaseId ?? null);

  const resume = useMemo(() => {
    if (!mounted) return null;
    return getResumeRecommendation({
      words: allVocabularyWords,
      wordsById,
      cards: progress.cards,
      recentHistory: recentVocabHistory,
      studyState: vocabStudyState,
      learningPath,
      preferredPhaseId: effectivePreferredPhaseId,
      preferLearningPath:
        Boolean(activePhaseId) ||
        scope === 'learning-path' ||
        Boolean(learningPath && !vocabStudyState?.studyModeLevel),
    });
  }, [
    mounted,
    progress.cards,
    recentVocabHistory,
    vocabStudyState,
    learningPath,
    effectivePreferredPhaseId,
    activePhaseId,
    scope,
  ]);

  const allRecentEntries = useMemo(() => {
    if (!mounted) return [];
    return filterRecentVocabEntries(recentVocabHistory, wordsById, 'all');
  }, [mounted, recentVocabHistory]);

  const studyModeRecentEntries = useMemo(() => {
    if (!mounted) return [];
    return filterRecentVocabEntries(recentVocabHistory, wordsById, 'study-mode', {
      studyModeLevel: effectiveStudyLevel,
      categoryLocked: vocabStudyState?.categoryLocked,
      lockedCategoryId:
        vocabStudyState?.lockedCategoryId ||
        (activeCategory !== 'all' ? activeCategory : undefined),
    });
  }, [mounted, recentVocabHistory, effectiveStudyLevel, vocabStudyState, activeCategory]);

  const learningPathRecentEntries = useMemo(() => {
    if (!mounted) return [];
    return filterRecentVocabEntries(recentVocabHistory, wordsById, 'learning-path', {
      learningPath,
      phaseId: selectedPathPhaseFilter,
    });
  }, [mounted, recentVocabHistory, learningPath, selectedPathPhaseFilter]);

  const displayedEntries = useMemo(() => {
    if (scope === 'study-mode') return studyModeRecentEntries;
    if (scope === 'learning-path') return learningPathRecentEntries;
    return allRecentEntries;
  }, [scope, allRecentEntries, studyModeRecentEntries, learningPathRecentEntries]);

  const visibleEntries = showAllRecent
    ? displayedEntries
    : displayedEntries.slice(0, DEFAULT_VISIBLE_COUNT);

  const handleChangeStudyModeLevel = (lvl: VocabStudyLevelMode) => {
    updateVocabStudyState({ studyModeLevel: lvl });
    onSelectStudyLevel?.(lvl);
  };

  const handleSelectPhaseShortcut = (phaseId: string) => {
    setSelectedPathPhaseFilter(phaseId);
    if (phaseId !== 'all') {
      updateVocabStudyState({ activePhaseId: phaseId });
      onSelectPhase?.(phaseId);
    } else {
      updateVocabStudyState({ activePhaseId: undefined });
      onSelectPhase?.(null);
    }
  };

  if (!mounted || !resume) {
    return (
      <section className="rounded-3xl bg-slate-900/70 border border-slate-800 p-5 animate-pulse h-36" />
    );
  }

  const getLevelLabel = (lvl: VocabStudyLevelMode) => {
    if (lvl === 'all') return 'Tất cả cấp độ';
    return LEVEL_CONFIG[lvl]?.shortLabel || lvl;
  };

  return (
    <section
      aria-label="Học tiếp và Từ vựng học gần nhất"
      className="rounded-3xl bg-slate-900/85 border border-slate-800 p-5 sm:p-6 space-y-5 shadow-xl"
    >
      {/* Top Bar: Title + Cross-Device Sync Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
            <History className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                Học Tiếp &amp; Từ Vựng Học Gần Nhất
              </h2>
              {allRecentEntries.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  {allRecentEntries.length} từ gần đây
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Xem lại từ đã học theo chế độ học từ hoặc lộ trình mục tiêu và tiếp tục ngay từ vị trí gần nhất.
            </p>
          </div>
        </div>

        {/* Cross-Device Sync Status Pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 flex-wrap">
          {user ? (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs">
              {syncStatus === 'syncing' ? (
                <span className="inline-flex items-center gap-1.5 text-indigo-300 font-semibold">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                  <span>Đang đồng bộ...</span>
                </span>
              ) : syncStatus === 'error' ? (
                <span className="inline-flex items-center gap-1.5 text-rose-300 font-semibold">
                  <CloudAlert className="w-3.5 h-3.5 text-rose-400" />
                  <span>Lỗi đồng bộ</span>
                </span>
              ) : (
                <span
                  className="inline-flex items-center gap-1.5 text-emerald-300 font-semibold"
                  title={
                    lastSyncedAt
                      ? `Đồng bộ lúc ${lastSyncedAt.toLocaleTimeString('vi-VN')}`
                      : 'Tự động đồng bộ giữa các thiết bị'
                  }
                >
                  <CloudCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Đã đồng bộ đa thiết bị</span>
                </span>
              )}
              <button
                type="button"
                onClick={() => forceSync()}
                disabled={syncStatus === 'syncing'}
                className="ml-1 px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-indigo-600/30 text-slate-300 hover:text-white text-[11px] font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                title="Đồng bộ tiến độ học từ giữa các thiết bị ngay lập tức"
              >
                Đồng bộ
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={openAuthModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/15 hover:bg-indigo-600/25 border border-indigo-500/35 text-indigo-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
              title="Đăng nhập để đồng bộ từ học gần nhất và vị trí lộ trình giữa điện thoại và máy tính"
            >
              <Cloud className="w-3.5 h-3.5 text-indigo-400" />
              <span>Đồng bộ giữa các thiết bị</span>
            </button>
          )}
        </div>
      </div>

      {/* Resume / Continue Learning Highlight Strip */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* Card 1: Most Recent Word */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-950/80 border border-slate-800 p-4 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Từ học gần nhất</span>
            </span>
            {resume.lastEntry && (
              <span className="text-[11px] text-slate-400 font-medium">
                {formatRelativeTimeVi(resume.lastEntry.viewedAt)}
              </span>
            )}
          </div>

          {resume.lastWord && resume.lastWordUrl ? (
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Link
                    href={resume.lastWordUrl}
                    className="text-lg font-black text-white hover:text-indigo-400 uppercase tracking-tight transition-colors truncate"
                  >
                    {resume.lastWord.word}
                  </Link>
                  <button
                    type="button"
                    onClick={() => speak(resume.lastWord!.word)}
                    className="p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer"
                    title="Phát âm"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      LEVEL_CONFIG[resume.lastWord.level]?.badgeClass
                    }`}
                  >
                    {LEVEL_CONFIG[resume.lastWord.level]?.shortLabel}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-1">
                  {resume.lastWord.deepMeaning.coreConcept}
                </p>
              </div>

              <Link
                href={resume.lastWordUrl}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold whitespace-nowrap transition-colors shrink-0"
              >
                Xem lại
              </Link>
            </div>
          ) : (
            <div className="text-xs text-slate-400 py-1">
              Bạn chưa mở từ vựng nào gần đây. Chọn từ bên dưới hoặc bắt đầu học tiếp theo lộ trình!
            </div>
          )}
        </div>

        {/* Card 2: Continue Next Word in Mode / Learning Path */}
        <div className="lg:col-span-7 rounded-2xl bg-gradient-to-r from-indigo-950/70 via-slate-950/90 to-purple-950/50 border border-indigo-500/35 p-4 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400" />
                <span>
                  {resume.isLearningPathContext
                    ? 'Học tiếp theo lộ trình'
                    : 'Học tiếp theo chế độ từ vựng'}
                </span>
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-500/30">
                {resume.activePhase
                  ? resume.activePhase.title.split(':')[0]
                  : `Chế độ: ${getLevelLabel(resume.effectiveModeLevel)}`}
              </span>
            </div>

            <span className="text-[11px] text-slate-300 font-mono">
              Đã học {resume.learnedInContext}/{resume.contextWordsCount} từ
              {resume.currentPosition ? ` • Vị trí #${resume.currentPosition}` : ''}
            </span>
          </div>

          {resume.nextWord && resume.nextWordUrl ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0 space-y-1 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-lg font-black text-white uppercase tracking-tight">
                    {resume.nextWord.word}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {resume.nextWord.pronunciation.ipa}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-slate-300">
                    {categories.find((c) => c.id === resume.nextWord!.category)?.name ||
                      resume.nextWord.category}
                  </span>
                </div>
                <p className="text-xs text-slate-300 line-clamp-1">
                  {resume.nextWord.deepMeaning.coreConcept}
                </p>
                {/* Mini Progress Bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden mt-1.5">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                    style={{
                      width: `${
                        resume.contextWordsCount > 0
                          ? Math.min(
                              100,
                              Math.round((resume.learnedInContext / resume.contextWordsCount) * 100)
                            )
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <Link
                href={resume.nextWordUrl}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition-all whitespace-nowrap shrink-0"
              >
                <span>Học tiếp: {resume.nextWord.word}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="text-xs text-slate-300">
              Không tìm thấy từ tiếp theo phù hợp trong chế độ hiện tại.
            </div>
          )}
        </div>
      </div>

      {/* Filter Tabs + Recent Words List */}
      <div className="space-y-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Scope Filter Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => setScope('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                scope === 'all'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'bg-slate-950/80 border border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Tất cả gần đây</span>
              <span className="text-[10px] opacity-80 font-mono">({allRecentEntries.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setScope('study-mode')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                scope === 'study-mode'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/25'
                  : 'bg-slate-950/80 border border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Theo chế độ học ({getLevelLabel(effectiveStudyLevel)})</span>
              <span className="text-[10px] opacity-80 font-mono">
                ({studyModeRecentEntries.length})
              </span>
            </button>

            <button
              type="button"
              onClick={() => setScope('learning-path')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                scope === 'learning-path'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
                  : 'bg-slate-950/80 border border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Theo lộ trình học</span>
              <span className="text-[10px] opacity-80 font-mono">
                ({learningPathRecentEntries.length})
              </span>
            </button>
          </div>

          {/* Right Utilities */}
          <div className="flex items-center gap-2 flex-wrap">
            {allRecentEntries.length > 0 && (
              <Link
                href="/flashcards?mode=recent"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-pink-300 hover:text-pink-200 text-xs font-semibold transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>Ôn Flashcard từ gần đây</span>
              </Link>
            )}

            {allRecentEntries.length > 0 && (
              <button
                type="button"
                onClick={() => setIsHistoryExpanded((v) => !v)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                {isHistoryExpanded ? (
                  <>
                    <ChevronUp className="w-3.5 h-3.5" />
                    <span>Thu gọn</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3.5 h-3.5" />
                    <span>Mở danh sách</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Sub-controls when "Theo chế độ học" is active */}
        {scope === 'study-mode' && isHistoryExpanded && (
          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-semibold text-slate-400">
              Chế độ học từ (đồng bộ đa thiết bị):
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {(['essential', 'intermediate', 'advanced', 'all'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => handleChangeStudyModeLevel(lvl)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all border cursor-pointer ${
                    effectiveStudyLevel === lvl
                      ? 'bg-sky-600 text-white border-sky-500'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {lvl === 'essential'
                    ? 'Căn bản (Essential)'
                    : lvl === 'intermediate'
                    ? 'Trung cấp (Intermediate)'
                    : lvl === 'advanced'
                    ? 'Nâng cao (Advanced)'
                    : 'Tất cả'}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sub-controls when "Theo lộ trình học" is active */}
        {scope === 'learning-path' && isHistoryExpanded && (
          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2.5">
            {learningPath ? (
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-[11px] text-slate-300 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-purple-400" />
                  <span>
                    Lộ trình <strong className="text-white">{learningPath.targetScore}+ TOEIC</strong>:
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => handleSelectPhaseShortcut('all')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                      selectedPathPhaseFilter === 'all'
                        ? 'bg-purple-600 text-white border-purple-500'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    Toàn lộ trình
                  </button>
                  {learningPath.phases.map((phase, idx) => {
                    const stats = getPhaseProgress(allVocabularyWords, phase, progress.cards);
                    return (
                      <button
                        key={phase.id}
                        type="button"
                        onClick={() => handleSelectPhaseShortcut(phase.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                          selectedPathPhaseFilter === phase.id
                            ? 'bg-purple-600 text-white border-purple-500'
                            : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
                        }`}
                      >
                        <span>Giai đoạn {idx + 1}</span>
                        <span className="text-[10px] opacity-80 font-mono">
                          ({stats.learnedCount}/{stats.totalWords})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-300">
                <span>Bạn chưa thiết lập lộ trình học cá nhân hóa.</span>
                <Link
                  href="/onboarding"
                  className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                  <span>Thiết lập lộ trình ngay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Recent Words Grid */}
        {isHistoryExpanded && (
          <>
            {visibleEntries.length > 0 ? (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {visibleEntries.map((entry) => {
                    const word = wordsById[entry.wordId];
                    if (!word) return null;
                    const card = getCard(word.id);
                    const isMastered = Boolean(card && card.interval >= 14);
                    const isLearning = Boolean(card && card.interval < 14);
                    const bookmarked = isBookmarked(word.id);
                    const wordHref = buildWordStudyUrl(word.id, {
                      level: entry.studyModeLevel || effectiveStudyLevel,
                      category:
                        entry.categoryLocked && entry.categoryId && entry.categoryId !== 'all'
                          ? entry.categoryId
                          : undefined,
                      phaseId: entry.phaseId || (activePhaseId ?? undefined),
                    });

                    return (
                      <div
                        key={entry.wordId}
                        className="rounded-2xl bg-slate-950/75 border border-slate-800/90 hover:border-indigo-500/45 p-3.5 flex flex-col justify-between gap-2.5 transition-all"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-1.5">
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                                LEVEL_CONFIG[word.level]?.badgeClass
                              }`}
                            >
                              {LEVEL_CONFIG[word.level]?.shortLabel}
                            </span>

                            <div className="flex items-center gap-1">
                              {isMastered ? (
                                <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-400">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>Đã thuộc</span>
                                </span>
                              ) : isLearning ? (
                                <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-amber-400">
                                  <Clock className="w-3 h-3" />
                                  <span>Đang học</span>
                                </span>
                              ) : (
                                <span className="text-[10px] text-slate-400">Đã xem</span>
                              )}
                              <button
                                type="button"
                                onClick={() => toggleBookmark(word.id)}
                                className="p-1 text-slate-500 hover:text-amber-400 transition-colors cursor-pointer"
                                title={bookmarked ? 'Bỏ lưu từ' : 'Lưu từ'}
                              >
                                <Bookmark
                                  className={`w-3.5 h-3.5 ${
                                    bookmarked ? 'fill-amber-400 text-amber-400' : ''
                                  }`}
                                />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-2">
                            <Link
                              href={wordHref}
                              className="text-base font-extrabold text-white hover:text-indigo-400 uppercase tracking-tight truncate transition-colors"
                            >
                              {word.word}
                            </Link>
                            <button
                              type="button"
                              onClick={() => speak(word.word)}
                              className="p-1 rounded-md text-slate-400 hover:text-indigo-400 hover:bg-slate-900 transition-colors cursor-pointer shrink-0"
                              title="Phát âm"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-[11px] font-mono text-slate-500">
                            {word.pronunciation.ipa}
                          </div>

                          <p className="text-xs text-slate-300 line-clamp-1">
                            {word.deepMeaning.coreConcept}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-800/70 flex items-center justify-between gap-2 text-[10px] text-slate-400">
                          <span className="truncate">
                            {formatRelativeTimeVi(entry.viewedAt)} •{' '}
                            {entry.source === 'flashcard' ? 'Flashcard' : 'Từ vựng'}
                          </span>
                          <Link
                            href={wordHref}
                            className="text-indigo-400 hover:text-indigo-300 font-semibold whitespace-nowrap shrink-0"
                          >
                            Mở →
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Expand / Collapse & Clear Controls */}
                <div className="flex items-center justify-between gap-2 flex-wrap pt-1">
                  <div className="flex items-center gap-2">
                    {displayedEntries.length > DEFAULT_VISIBLE_COUNT && (
                      <button
                        type="button"
                        onClick={() => setShowAllRecent((v) => !v)}
                        className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/40 text-xs font-semibold text-indigo-300 hover:text-white transition-colors cursor-pointer"
                      >
                        {showAllRecent
                          ? 'Thu gọn bớt'
                          : `Xem tất cả ${displayedEntries.length} từ gần đây`}
                      </button>
                    )}
                  </div>

                  {allRecentEntries.length > 0 && (
                    <div>
                      {confirmClear ? (
                        <div className="flex items-center gap-1.5 text-[11px]">
                          <span className="text-slate-400">Xóa lịch sử gần đây?</span>
                          <button
                            type="button"
                            onClick={() => {
                              clearRecentVocabHistory();
                              setConfirmClear(false);
                            }}
                            className="px-2 py-1 rounded-lg bg-rose-600/20 border border-rose-500/40 text-rose-300 hover:bg-rose-600/30 font-semibold cursor-pointer"
                          >
                            Xác nhận
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmClear(false)}
                            className="px-2 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                          >
                            Hủy
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmClear(true)}
                          className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Xóa lịch sử gần đây</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-slate-950/60 border border-slate-800/80 p-4 flex items-center justify-between gap-3 flex-wrap text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>
                    {scope === 'all'
                      ? 'Chưa có từ vựng nào trong lịch sử học gần đây. Hãy mở bất kỳ từ nào bên dưới để bắt đầu ghi nhận!'
                      : scope === 'study-mode'
                      ? `Chưa có từ vựng nào học gần đây thuộc chế độ "${getLevelLabel(effectiveStudyLevel)}".`
                      : 'Chưa có từ vựng nào học gần đây thuộc phạm vi lộ trình đang chọn.'}
                  </span>
                </div>
                {resume.nextWordUrl && resume.nextWord && (
                  <Link
                    href={resume.nextWordUrl}
                    className="text-indigo-400 hover:text-indigo-300 font-semibold whitespace-nowrap"
                  >
                    Bắt đầu học &ldquo;{resume.nextWord.word}&rdquo; →
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
