'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Settings as SettingsIcon,
  Target,
  Sun,
  Moon,
  Laptop,
  Volume2,
  Bell,
  Database,
  User,
  Check,
  AlertTriangle,
  Download,
  Upload,
  RefreshCw,
  Globe,
  Headphones,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Play,
  RotateCcw,
  BookOpen,
  Compass,
  Cpu,
  MessageCircle,
  Languages,
} from 'lucide-react';
import { WordLevel } from '@/types/vocabulary';
import { TranslationProvider } from '@/types/progress';
import { LEVEL_CONFIG } from '@/lib/vocabulary-helpers';
import { useProgress } from '@/contexts/ProgressContext';
import { useTheme, ThemeMode } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useSpeech } from '@/hooks/useSpeech';
import { NotificationSettings } from '@/components/notifications/NotificationSettings';
import { AdminAISettingsSection } from '@/components/admin/AdminAISettingsSection';
import { AutoChatSettingsSection } from '@/components/chat-bubble/AutoChatSettingsSection';

export default function SettingsPage() {
  const {
    progress,
    updatePreferences,
    resetProgress,
    importProgress,
    syncStatus,
    lastSyncedAt,
    forceSync,
  } = useProgress();

  const { theme, setTheme, resolvedTheme } = useTheme();
  const { user, signOut } = useAuth();
  const { speak, isPlaying } = useSpeech();

  const isAdmin = user?.email?.toLowerCase() === 'nhuong2n@gmail.com';

  const [activeTab, setActiveTab] = useState<
    'general' | 'theme' | 'speech' | 'notifications' | 'auto-chat' | 'data' | 'account' | 'ai'
  >('general');

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const { state: onboardingState, setTargetScore, setCurrentLevel } = useOnboarding();
  const currentTargetScore = onboardingState.learningPath?.targetScore || onboardingState.targetScore || 650;
  const currentLearningLevel =
    onboardingState.learningPath?.currentLevel ||
    onboardingState.placementResult?.level ||
    'essential';

  const handleLearningLevelChange = (lvl: WordLevel) => {
    setCurrentLevel(lvl);
    try {
      localStorage.setItem('toeic_study_navigation_level', lvl);
    } catch {}
    showToast(`Đã cập nhật cấp độ học mục tiêu: ${LEVEL_CONFIG[lvl]?.label || lvl}!`);
    if (user) {
      setTimeout(() => {
        forceSync();
      }, 150);
    }
  };

  // 1. Goal & Learning updates
  const handleDailyGoalChange = (goal: number) => {
    updatePreferences({ dailyGoal: goal });
    showToast(`Đã cập nhật mục tiêu học: ${goal} từ mỗi ngày!`);
  };

  const handleTargetScoreChange = (score: number, title: string) => {
    setTargetScore(score);
    showToast(`Đã cập nhật mục tiêu TOEIC: ${title}!`);
    if (user) {
      setTimeout(() => {
        forceSync();
      }, 150);
    }
  };

  const handleToggleImmersive = () => {
    const nextVal = !progress.preferences.immersiveOnly;
    updatePreferences({ immersiveOnly: nextVal });
    showToast(
      nextVal
        ? 'Đã bật chế độ 100% Native Immersion (Không dịch ngữ)'
        : 'Đã bật chế độ Song ngữ hỗ trợ tiếng Việt'
    );
  };

  const handleToggleAutoPlay = () => {
    const nextVal = !progress.preferences.autoPlayPronunciation;
    updatePreferences({ autoPlayPronunciation: nextVal });
    showToast(
      nextVal ? 'Đã bật tự động phát âm thanh khi mở từ' : 'Đã tắt tự động phát âm thanh'
    );
  };

  const handlePreferredDictChange = (dict: 'cambridge' | 'oxford') => {
    updatePreferences({ preferredDictionary: dict });
    showToast(
      dict === 'cambridge'
        ? 'Đã chọn từ điển mặc định: Cambridge Advanced Learner\'s'
        : 'Đã chọn từ điển mặc định: Oxford Advanced Learner\'s (OALD)'
    );
  };

  const handleTranslationProviderChange = (provider: TranslationProvider) => {
    updatePreferences({ translationProvider: provider });
    const labels: Record<TranslationProvider, string> = {
      mymemory: 'MyMemory (Miễn phí, nhanh)',
      gemini: 'Google Gemini AI (Theo ngữ cảnh TOEIC)',
      cloudflare: 'Cloudflare Workers AI (Llama 3.1)',
      auto: 'Tự động (AI ưu tiên → MyMemory dự phòng)',
    };
    showToast(`Đã chọn nhà cung cấp dịch Tiếng Việt: ${labels[provider]}`);
  };

  // 2. Speech settings
  const handleAccentChange = (accent: 'en-US' | 'en-GB' | 'en-AU') => {
    updatePreferences({ speechAccent: accent });
    showToast(`Đã chọn giọng đọc: ${accent === 'en-US' ? 'Mỹ (US)' : accent === 'en-GB' ? 'Anh (UK)' : 'Úc (AU)'}`);
  };

  const handleRateChange = (rate: number) => {
    updatePreferences({ speechRate: rate });
  };

  const testSpeech = () => {
    const sampleSentences = {
      'en-US':
        'The marketing committee has unanimously approved the quarterly financial expenditure.',
      'en-GB':
        'Our human resources department will promptly arrange the itinerary for the delegation.',
      'en-AU':
        'All regional supervisors must submit their operational reports before Tuesday afternoon.',
    };
    const accent = progress.preferences.speechAccent || 'en-US';
    const rate = progress.preferences.speechRate || 0.9;
    speak(sampleSentences[accent] || sampleSentences['en-US'], accent, rate);
  };

  // 3. Data Export & Import
  const handleExportData = () => {
    try {
      setIsExporting(true);
      const dataStr = JSON.stringify(progress, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const now = new Date().toISOString().split('T')[0];
      const link = document.createElement('a');
      link.href = url;
      link.download = `toeic-mastery-backup-${now}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast('Đã tải xuống tệp sao lưu dữ liệu JSON thành công!');
    } catch {
      showToast('Lỗi khi xuất tệp dữ liệu.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        if (!parsed || typeof parsed !== 'object' || !parsed.cards) {
          setImportError('Tệp sao lưu không hợp lệ hoặc thiếu dữ liệu thẻ từ.');
          return;
        }

        const success = importProgress(parsed);
        if (success) {
          setImportError(null);
          showToast('Đã khôi phục toàn bộ tiến độ học tập thành công!');
        } else {
          setImportError('Không thể nạp dữ liệu. Vui lòng kiểm tra lại định dạng tệp.');
        }
      } catch {
        setImportError('Tệp không đúng định dạng JSON hợp lệ.');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleConfirmReset = () => {
    resetProgress();
    setShowResetModal(false);
    showToast('Đã xoá toàn bộ dữ liệu học và đặt lại ban đầu.');
  };

  const tabs: {
    id: typeof activeTab;
    label: string;
    icon: typeof Target;
    badge?: string;
  }[] = [
    { id: 'general', label: 'Mục tiêu & Thói quen', icon: Target },
    { id: 'theme', label: 'Giao diện & Hiển thị', icon: Sun },
    { id: 'speech', label: 'Giọng đọc & Phát âm', icon: Volume2 },
    { id: 'notifications', label: 'Thông báo & Nhắc nhở', icon: Bell },
    { id: 'auto-chat', label: 'Chat Bubble & Tự động', icon: MessageCircle },
    { id: 'data', label: 'Dữ liệu & Sao lưu', icon: Database },
    { id: 'account', label: 'Tài khoản & Cloud', icon: User },
    ...(isAdmin
      ? [
          {
            id: 'ai' as const,
            label: 'Quản trị AI Hệ thống',
            icon: Cpu,
            badge: 'Admin',
          },
        ]
      : []),
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 right-6 z-50 bg-indigo-600 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-semibold animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Check className="w-4 h-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <SettingsIcon className="w-3.5 h-3.5 text-indigo-400" />
          <span>Trung tâm Tùy biến Hệ thống</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Cài đặt & Tùy biến Trải nghiệm
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Tùy chỉnh mục tiêu học tập, giao diện sáng/tối, giọng đọc bản xứ và quản lý sao lưu dữ liệu cá nhân.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? tab.id === 'ai'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/40">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab 1: General & Daily Goals */}
      {activeTab === 'general' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Target TOEIC Score Section */}
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Mục Tiêu Điểm Số TOEIC</h3>
                <p className="text-xs text-slate-400">
                  Lộ trình và ngân hàng từ vựng trọng tâm sẽ được cá nhân hóa theo ngưỡng điểm bạn hướng tới.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {[
                { score: 550, title: '500 - 550+', badge: 'Khởi đầu' },
                { score: 650, title: '600 - 650+', badge: 'Phổ biến' },
                { score: 750, title: '700 - 750+', badge: 'Khuyên dùng' },
                { score: 850, title: '800 - 850+', badge: 'Chuyên sâu' },
                { score: 950, title: '900 - 990', badge: 'Bản xứ' },
              ].map((goal) => {
                const isSelected = currentTargetScore === goal.score;
                return (
                  <button
                    key={goal.score}
                    type="button"
                    onClick={() => handleTargetScoreChange(goal.score, goal.title)}
                    className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30 font-bold scale-[1.02]'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-sm font-black">{goal.title}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        isSelected
                          ? 'bg-indigo-700/60 text-indigo-100 border border-indigo-400/40'
                          : 'bg-slate-900 border border-slate-800 text-slate-400'
                      }`}
                    >
                      {goal.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>Mục tiêu hiện tại: <strong className="text-indigo-400">{currentTargetScore}+ TOEIC</strong></span>
              <Link
                href="/onboarding?step=goal"
                className="text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1"
              >
                <span>Tùy chỉnh lộ trình đầy đủ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Learning Level Target Section */}
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Cấp Độ Từ Vựng Thiết Lập (Learning Level)</h3>
                <p className="text-xs text-slate-400">
                  Cấp độ từ vựng trọng tâm trong lộ trình học. Khi học từ, nút &ldquo;Next Word&rdquo; sẽ tự động chuyển tiếp các từ trong cùng cấp độ này.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'essential' as WordLevel,
                  label: 'Essential (Căn bản)',
                  desc: '450 - 600 TOEIC • Từ vựng cốt lõi thường gặp nhất',
                },
                {
                  id: 'intermediate' as WordLevel,
                  label: 'Intermediate (Trung cấp)',
                  desc: '600 - 750 TOEIC • Họp hành, email & thương thảo',
                },
                {
                  id: 'advanced' as WordLevel,
                  label: 'Advanced (Nâng cao)',
                  desc: '750 - 990 TOEIC • Báo cáo điều hành & chuyên sâu',
                },
              ].map((lvl) => {
                const isSelected = currentLearningLevel === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => handleLearningLevelChange(lvl.id)}
                    className={`p-4 rounded-2xl border text-left transition-all space-y-1.5 ${
                      isSelected
                        ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10 scale-[1.01]'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">{lvl.label}</span>
                      {isSelected && (
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{lvl.desc}</p>
                  </button>
                );
              })}
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>
                Cấp độ hiện tại:{' '}
                <strong className="text-indigo-400">
                  {LEVEL_CONFIG[currentLearningLevel]?.label || currentLearningLevel}
                </strong>
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold">
                ✓ Áp dụng tự động cho nút Next Word
              </span>
            </div>
          </div>

          {/* Daily Goal Section */}
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Mục Tiêu Từ Vựng Mỗi Ngày</h3>
                <p className="text-xs text-slate-400">
                  Số lượng từ mới được gợi ý nạp vào bộ nhớ mỗi ngày để duy trì nhịp độ chạm mốc 700+ TOEIC.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {[5, 10, 15, 20, 30, 50].map((goal) => {
                const isSelected = progress.stats.dailyGoal === goal;
                return (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => handleDailyGoalChange(goal)}
                    className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30 font-bold scale-[1.02]'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-lg font-black">{goal}</span>
                    <span className="text-[10px] uppercase tracking-wider opacity-80">Từ/ngày</span>
                  </button>
                );
              })}
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>Mục tiêu hiện tại: <strong className="text-indigo-400">{progress.stats.dailyGoal} từ/ngày</strong></span>
              <span>Ước tính hoàn thành 3,675 từ trong: <strong className="text-white">{Math.ceil(3675 / progress.stats.dailyGoal)} ngày</strong></span>
            </div>
          </div>

          {/* Learning Methodology Mode */}
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Chế Độ Học Bản Xứ (Immersive Mode)</h3>
                <p className="text-xs text-slate-400 max-w-xl mt-0.5">
                  Khi bật, ứng dụng ưu tiên giải nghĩa bằng tư duy bản xứ, bản đồ từ vựng và ví dụ ngữ cảnh, hạn chế việc dịch từng chữ sang tiếng Việt để tạo phản xạ ngôn ngữ tự nhiên.
                </p>
              </div>
              <button
                type="button"
                onClick={handleToggleImmersive}
                aria-label="Toggle Immersive Mode"
                className={`w-12 h-6 rounded-full transition-colors relative shrink-0 p-0.5 ${
                  progress.preferences.immersiveOnly ? 'bg-indigo-600' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    progress.preferences.immersiveOnly ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Tự Động Phát Âm Thanh (Auto-play Audio)</h3>
                <p className="text-xs text-slate-400 max-w-xl mt-0.5">
                  Tự động phát âm thanh chuẩn của từ vựng ngay khi bạn mở xem chi tiết từ hoặc lật Flashcard.
                </p>
              </div>
              <button
                type="button"
                onClick={handleToggleAutoPlay}
                aria-label="Toggle Auto-play Audio"
                className={`w-12 h-6 rounded-full transition-colors relative shrink-0 p-0.5 ${
                  progress.preferences.autoPlayPronunciation ? 'bg-indigo-600' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    progress.preferences.autoPlayPronunciation ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Preferred Online Dictionary Section */}
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Từ Điển Tra Cứu Trực Tuyến Ưa Thích</h3>
                <p className="text-xs text-slate-400">
                  Lựa chọn từ điển chuẩn quốc tế mặc định khi bấm tra cứu nhanh từ vựng tại trang chi tiết, danh sách từ và thẻ flashcard.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Cambridge Card */}
              <div
                onClick={() => handlePreferredDictChange('cambridge')}
                className={`cursor-pointer rounded-2xl p-5 border transition-all space-y-3 ${
                  (progress.preferences.preferredDictionary || 'cambridge') === 'cambridge'
                    ? 'border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/30'
                    : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="font-bold text-sm text-white">Cambridge Dictionary</span>
                  </div>
                  {(progress.preferences.preferredDictionary || 'cambridge') === 'cambridge' && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
                      <Check className="w-3 h-3" />
                      <span>Mặc định</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Cambridge Advanced Learner’s Dictionary: Giải nghĩa trực quan, định nghĩa Anh - Anh súc tích, câu ví dụ gần gũi và ngữ pháp rõ ràng.
                </p>
                <div className="text-[11px] font-mono text-amber-400/80">
                  dictionary.cambridge.org
                </div>
              </div>

              {/* Oxford Card */}
              <div
                onClick={() => handlePreferredDictChange('oxford')}
                className={`cursor-pointer rounded-2xl p-5 border transition-all space-y-3 ${
                  progress.preferences.preferredDictionary === 'oxford'
                    ? 'border-sky-500 bg-sky-500/10 ring-2 ring-sky-500/30'
                    : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                    <span className="font-bold text-sm text-white">Oxford Learner&apos;s (OALD)</span>
                  </div>
                  {progress.preferences.preferredDictionary === 'oxford' && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-sky-400 bg-sky-500/20 px-2 py-0.5 rounded-full border border-sky-500/30">
                      <Check className="w-3 h-3" />
                      <span>Mặc định</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Oxford Advanced Learner’s Dictionary: Chuẩn học thuật CEFR (A1-C2), collocations toàn diện, họ từ và phát âm chi tiết chuẩn Oxford.
                </p>
                <div className="text-[11px] font-mono text-sky-400/80">
                  oxfordlearnersdictionaries.com
                </div>
              </div>
            </div>
          </div>

          {/* Translation Provider Preference Section */}
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Languages className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Nhà Cung Cấp Dịch Tiếng Việt (Translation Provider)</h3>
                <p className="text-xs text-slate-400">
                  Chọn công cụ dịch mặc định cho tài khoản của bạn khi bôi đen dịch nhanh, dịch câu ví dụ, tư duy bản xứ và hội thoại Roleplay.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {(
                [
                  {
                    id: 'mymemory' as TranslationProvider,
                    title: 'MyMemory (Mặc định)',
                    badge: 'Không tốn quota AI',
                    desc: 'Dịch nhanh các cụm từ và câu ngắn qua API công cộng miễn phí, không tiêu tốn hạn mức AI hàng ngày.',
                    accentBorder: 'border-slate-500 bg-slate-800/40 ring-2 ring-slate-500/30',
                    dot: 'bg-slate-400',
                    badgeClass: 'text-slate-200 bg-slate-700/60 border-slate-600/60',
                  },
                  {
                    id: 'gemini' as TranslationProvider,
                    title: 'Google Gemini AI',
                    badge: 'Ngữ cảnh chuẩn nhất',
                    desc: 'Hiểu sắc thái tiếng Anh thương mại/TOEIC và dịch tự nhiên. Tự động chuyển dự phòng nếu hết hạn mức AI.',
                    accentBorder: 'border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/30',
                    dot: 'bg-emerald-400',
                    badgeClass: 'text-emerald-300 bg-emerald-500/20 border-emerald-500/30',
                  },
                  {
                    id: 'cloudflare' as TranslationProvider,
                    title: 'Cloudflare Workers AI',
                    badge: 'Edge Llama 3.1',
                    desc: 'Mô hình LLM chạy trên hạ tầng Edge của Cloudflare. Tự động chuyển dự phòng nếu gặp sự cố hoặc hết quota.',
                    accentBorder: 'border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/30',
                    dot: 'bg-amber-400',
                    badgeClass: 'text-amber-300 bg-amber-500/20 border-amber-500/30',
                  },
                  {
                    id: 'auto' as TranslationProvider,
                    title: 'Tự Động (Auto Hybrid)',
                    badge: 'Thông minh + Dự phòng',
                    desc: 'Ưu tiên Gemini → Cloudflare AI khi còn hạn mức; tự động chuyển về MyMemory khi hết quota hoặc AI tạm tắt.',
                    accentBorder: 'border-indigo-500 bg-indigo-500/10 ring-2 ring-indigo-500/30',
                    dot: 'bg-indigo-400',
                    badgeClass: 'text-indigo-300 bg-indigo-500/20 border-indigo-500/30',
                  },
                ] as const
              ).map((item) => {
                const currentProvider = progress.preferences.translationProvider || 'mymemory';
                const isSelected = currentProvider === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleTranslationProviderChange(item.id)}
                    className={`text-left rounded-2xl p-5 border transition-all space-y-2.5 ${
                      isSelected
                        ? item.accentBorder
                        : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${item.dot}`} />
                        <span className="font-bold text-sm text-white">{item.title}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeClass}`}>
                        {isSelected ? '✓ Đang chọn' : item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Theme Selection */}
      {activeTab === 'theme' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white">Chọn Chế Độ Giao Diện (Theme Mode)</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Chuyển đổi linh hoạt giữa giao diện tối giúp giảm mỏi mắt khi học đêm và giao diện sáng thanh lịch khi học ban ngày.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Light Option */}
              <div
                onClick={() => {
                  setTheme('light');
                  showToast('Đã kích hoạt Giao diện Sáng (Light Mode)');
                }}
                className={`cursor-pointer rounded-2xl p-5 border transition-all space-y-4 ${
                  theme === 'light'
                    ? 'border-indigo-500 bg-indigo-500/10 ring-2 ring-indigo-500/30'
                    : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">Giao diện Sáng</span>
                    {theme === 'light' && <Check className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Nền trắng sáng, tương phản cao, tối ưu học tập trong môi trường nhiều ánh sáng.
                  </p>
                </div>
              </div>

              {/* Dark Option */}
              <div
                onClick={() => {
                  setTheme('dark');
                  showToast('Đã kích hoạt Giao diện Tối (Dark Mode)');
                }}
                className={`cursor-pointer rounded-2xl p-5 border transition-all space-y-4 ${
                  theme === 'dark'
                    ? 'border-indigo-500 bg-indigo-500/10 ring-2 ring-indigo-500/30'
                    : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">Giao diện Tối</span>
                    {theme === 'dark' && <Check className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Tông màu Slate Deep hiện đại, êm dịu cho mắt khi ôn bài thời gian dài.
                  </p>
                </div>
              </div>

              {/* System Option */}
              <div
                onClick={() => {
                  setTheme('system');
                  showToast('Đã đặt giao diện tự động theo Hệ thống');
                }}
                className={`cursor-pointer rounded-2xl p-5 border transition-all space-y-4 ${
                  theme === 'system'
                    ? 'border-indigo-500 bg-indigo-500/10 ring-2 ring-indigo-500/30'
                    : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">Theo Hệ Thống</span>
                    {theme === 'system' && <Check className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Tự động đồng bộ với cài đặt sáng/tối của hệ điều hành hoặc trình duyệt của bạn.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>
                Trạng thái hiển thị hiện tại: <strong className="text-indigo-300 capitalize">{resolvedTheme === 'dark' ? 'Chế độ Tối (Dark)' : 'Chế độ Sáng (Light)'}</strong>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Speech & Audio Settings */}
      {activeTab === 'speech' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Giọng Đọc & Tốc Độ Phát Âm Chuẩn TOEIC</h3>
                <p className="text-xs text-slate-400">
                  Bài thi TOEIC thực tế sử dụng kết hợp các giọng Anh - Mỹ, Anh - Anh và Anh - Úc.
                </p>
              </div>
            </div>

            {/* Accent Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Giọng Đọc Ưu Tiên
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    code: 'en-US' as const,
                    flag: '🇺🇸',
                    title: 'Anh - Mỹ (US English)',
                    desc: 'Giọng chuẩn phổ biến nhất trong đề thi TOEIC ETS.',
                  },
                  {
                    code: 'en-GB' as const,
                    flag: '🇬🇧',
                    title: 'Anh - Anh (UK English)',
                    desc: 'Ngữ điệu tinh tế, thường xuất hiện trong đối thoại Part 3.',
                  },
                  {
                    code: 'en-AU' as const,
                    flag: '🇦🇺',
                    title: 'Anh - Úc (AU English)',
                    desc: 'Giọng đọc đặc trưng, mang tính phân loại cao trong Part 4.',
                  },
                ].map((acc) => {
                  const isSelected = (progress.preferences.speechAccent || 'en-US') === acc.code;
                  return (
                    <button
                      key={acc.code}
                      type="button"
                      onClick={() => handleAccentChange(acc.code)}
                      className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                        isSelected
                          ? 'bg-indigo-600/15 border-indigo-500 text-white shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{acc.flag}</span>
                        {isSelected && <Check className="w-4 h-4 text-indigo-400" />}
                      </div>
                      <div className="font-bold text-sm text-white">{acc.title}</div>
                      <div className="text-[11px] text-slate-400">{acc.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Speech Rate Slider */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Tốc Độ Phát Âm
                  </span>
                  <span className="text-xs text-slate-400">
                    Mức khuyến nghị: 0.9x cho học từ mới, 1.0x - 1.1x khi luyện phản xạ thi
                  </span>
                </div>
                <span className="text-sm font-black text-indigo-400 font-mono px-3 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                  {progress.preferences.speechRate || 0.9}x
                </span>
              </div>

              <input
                type="range"
                min="0.75"
                max="1.25"
                step="0.05"
                value={progress.preferences.speechRate || 0.9}
                onChange={(e) => handleRateChange(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />

              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>0.75x (Chậm & Chi tiết)</span>
                <span>0.9x (Khuyên dùng)</span>
                <span>1.0x (Tự nhiên)</span>
                <span>1.25x (Thử thách áp lực)</span>
              </div>
            </div>

            {/* Test Voice Button */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-slate-300">
                <span className="font-semibold block text-white mb-0.5">Kiểm tra âm thanh ngay:</span>
                <span>Phát câu mẫu thương mại TOEIC với giọng đọc và tốc độ đã chọn.</span>
              </div>
              <button
                type="button"
                onClick={testSpeech}
                disabled={isPlaying}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-all shrink-0 shadow-lg shadow-indigo-600/25 disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{isPlaying ? 'Đang phát...' : 'Nghe thử câu mẫu'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Notifications & Reminders */}
      {activeTab === 'notifications' && (
        <div className="space-y-6 animate-fadeIn">
          <NotificationSettings />
        </div>
      )}

      {/* Tab 5: Data Backup, Restore & Reset */}
      {activeTab === 'data' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Sao Lưu & Quản Lý Dữ Liệu Học Tập</h3>
                <p className="text-xs text-slate-400">
                  Dữ liệu ghi nhớ SRS, lịch sử bài luyện và danh sách từ bookmark được lưu trữ an toàn. Bạn có thể xuất file để chuyển sang thiết bị khác bất cứ lúc nào.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Export Card */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                    <Download className="w-4 h-4" />
                    <span>Xuất Tệp Sao Lưu (Export JSON)</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Tải về tệp JSON chứa toàn bộ thẻ nhớ SRS ({Object.keys(progress.cards).length} từ), chuỗi ngày học ({progress.stats.currentStreak} ngày) và lịch sử luyện tập.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleExportData}
                  disabled={isExporting}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isExporting ? 'Đang đóng gói...' : 'Tải xuống tệp sao lưu (.json)'}</span>
                </button>
              </div>

              {/* Import Card */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <Upload className="w-4 h-4" />
                    <span>Khôi Phục Tiến Độ (Import JSON)</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Nạp tệp sao lưu đã lưu từ trước hoặc từ thiết bị khác để tiếp tục lộ trình học mà không bị gián đoạn.
                  </p>
                </div>

                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".json"
                    onChange={handleFileImport}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-indigo-600/20"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Chọn tệp sao lưu để khôi phục</span>
                  </button>
                </div>
              </div>
            </div>

            {importError && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{importError}</span>
              </div>
            )}

            {/* Danger Zone */}
            <div className="pt-6 border-t border-slate-800/80 space-y-4">
              <div className="flex items-center gap-2 text-rose-400">
                <ShieldAlert className="w-4 h-4" />
                <h4 className="text-sm font-bold uppercase tracking-wider">Vùng Nguy Hiểm (Danger Zone)</h4>
              </div>

              <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-sm text-white">Xoá toàn bộ dữ liệu & Đặt lại từ đầu</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Hành động này sẽ xoá sạch tất cả thẻ nhớ SRS, chuỗi ngày học, điểm ước tính và đưa ứng dụng về trạng thái mới cài đặt.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowResetModal(true)}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-colors shadow-lg shadow-rose-600/25"
                >
                  Đặt lại dữ liệu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Account & Cloud Sync */}
      {activeTab === 'account' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Tài Khoản & Đồng Bộ Đám Mây (Supabase)</h3>
                <p className="text-xs text-slate-400">
                  Đăng nhập để đồng bộ tiến độ học tức thời giữa điện thoại, máy tính bảng và máy tính.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Trạng Thái Đăng Nhập
                  </span>
                  <div className="text-base font-bold text-white flex items-center gap-2">
                    {user ? (
                      <>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        <span>{user.email}</span>
                      </>
                    ) : (
                      <>
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <span>Chế độ Khách (Offline / Local Storage)</span>
                      </>
                    )}
                  </div>
                </div>

                {user && (
                  <button
                    type="button"
                    onClick={() => signOut()}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors self-start sm:self-auto"
                  >
                    Đăng xuất
                  </button>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">Trạng thái đồng bộ Cloud:</span>
                  <div className="text-xs font-bold mt-0.5">
                    {syncStatus === 'synced' && <span className="text-emerald-400">Đã đồng bộ lên Cloud an toàn</span>}
                    {syncStatus === 'syncing' && <span className="text-indigo-400 animate-pulse">Đang đồng bộ dữ liệu...</span>}
                    {syncStatus === 'error' && <span className="text-rose-400">Lỗi đồng bộ (sẽ thử lại tự động)</span>}
                    {syncStatus === 'idle' && <span className="text-slate-400">Chờ lệnh đồng bộ</span>}
                  </div>
                  {lastSyncedAt && (
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      Lần đồng bộ gần nhất: {lastSyncedAt.toLocaleTimeString('vi-VN')} {lastSyncedAt.toLocaleDateString('vi-VN')}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={async () => {
                    await forceSync();
                    showToast('Đã thực hiện đồng bộ Cloud!');
                  }}
                  disabled={syncStatus === 'syncing' || !user}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors disabled:opacity-50 shadow-md shadow-indigo-600/20"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
                  <span>Đồng bộ ngay bây giờ</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 7: Admin AI System Management (nhuong2n@gmail.com only) */}
      {activeTab === 'ai' && isAdmin && user?.email && (
        <AdminAISettingsSection userEmail={user.email} onShowToast={showToast} />
      )}

      {/* Tab 8: Chat Bubble & Auto-Chat */}
      {activeTab === 'auto-chat' && (
        <AutoChatSettingsSection onShowToast={showToast} />
      )}

      {/* Confirmation Reset Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-black text-white">Xác nhận đặt lại toàn bộ dữ liệu?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tất cả {Object.keys(progress.cards).length} thẻ từ đã học, chuỗi {progress.stats.currentStreak} ngày học và lịch sử điểm số sẽ bị xóa vĩnh viễn. Bạn không thể hoàn tác hành động này nếu chưa tải tệp sao lưu.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-rose-600/30"
              >
                Xác nhận xóa hết
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
