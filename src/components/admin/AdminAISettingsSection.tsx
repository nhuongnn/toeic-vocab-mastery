'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Cpu,
  Power,
  RefreshCw,
  Sparkles,
  Zap,
  AlertTriangle,
  Sliders,
  ShieldCheck,
  RotateCcw,
  Activity,
  Layers,
  Users,
  UserCheck,
  UserPlus,
  UserCog,
  Trash2,
  Edit3,
  Search,
  Check,
  X,
  Lock,
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  Terminal,
} from 'lucide-react';
import { SystemAISettings, UserQuotaOverride } from '@/lib/ai/system-ai-settings';
import {
  ModelTestResult,
  POPULAR_GEMINI_MODELS,
  POPULAR_CLOUDFLARE_MODELS,
} from '@/lib/ai/test-model';

const ADMIN_EMAIL = 'nhuong2n@gmail.com';

interface RegisteredUser {
  id: string;
  email: string;
  createdAt?: string;
}

interface AdminAISettingsSectionProps {
  userEmail: string;
  onShowToast: (msg: string) => void;
}

export function AdminAISettingsSection({ userEmail, onShowToast }: AdminAISettingsSectionProps) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const [settings, setSettings] = useState<SystemAISettings | null>(null);
  const [remainingToday, setRemainingToday] = useState<number>(0);
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);
  const [userUsageToday, setUserUsageToday] = useState<Record<string, { usedToday: number; email?: string; isGuest: boolean }>>({});
  const [providers, setProviders] = useState<{
    gemini: { configured: boolean; model: string; enabled: boolean };
    cloudflare: { configured: boolean; model: string; enabled: boolean };
  } | null>(null);

  // Form Inputs
  const [dailyLimitInput, setDailyLimitInput] = useState<number>(1500);
  const [guestDailyLimitInput, setGuestDailyLimitInput] = useState<number>(5);
  const [userDailyLimitInput, setUserDailyLimitInput] = useState<number>(50);

  // Override Management State
  const [overrideTargetEmail, setOverrideTargetEmail] = useState('');
  const [overrideLimitInput, setOverrideLimitInput] = useState<number>(100);
  const [overrideNoteInput, setOverrideNoteInput] = useState('');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [overrideFilterText, setOverrideFilterText] = useState('');
  const [deletingOverrideId, setDeletingOverrideId] = useState<string | null>(null);
  const [resettingUserQuotaId, setResettingUserQuotaId] = useState<string | null>(null);

  // Model Testing State (Max 5 Retries)
  const [testProvider, setTestProvider] = useState<'gemini' | 'cloudflare'>('gemini');
  const [testModel, setTestModel] = useState<string>('gemini-flash-lite-latest');
  const [isCustomModel, setIsCustomModel] = useState(false);
  const [customModelInput, setCustomModelInput] = useState('');
  const [testPrompt, setTestPrompt] = useState('Xin chào! Hãy phản hồi "AI OK" và xác nhận hệ thống đang hoạt động trong dưới 15 từ.');
  const [testingModel, setTestingModel] = useState(false);
  const [testResult, setTestResult] = useState<ModelTestResult | null>(null);
  const [popularModels, setPopularModels] = useState<{
    gemini: Array<{ id: string; name: string; note: string }>;
    cloudflare: Array<{ id: string; name: string; note: string }>;
  }>({
    gemini: POPULAR_GEMINI_MODELS,
    cloudflare: POPULAR_CLOUDFLARE_MODELS,
  });

  // Handle Model Test with up to 5 Retries
  const handleTestModel = async (overrideProvider?: 'gemini' | 'cloudflare', overrideModel?: string) => {
    setTestingModel(true);
    setTestResult(null);

    const providerToUse = overrideProvider || testProvider;
    let modelToUse = overrideModel;
    if (!modelToUse) {
      modelToUse = isCustomModel ? customModelInput.trim() : testModel;
    }

    try {
      const res = await fetch('/api/admin/ai-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          action: 'test_model',
          provider: providerToUse,
          model: modelToUse || undefined,
          prompt: testPrompt?.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (data.success && data.testResult) {
        setTestResult(data.testResult);
        if (data.testResult.success) {
          onShowToast(
            `✓ Test thành công: Model ${data.testResult.model} hoạt động tốt (lần thử ${data.testResult.succeededAtAttempt}/5)!`
          );
        } else {
          onShowToast(
            `✕ Test thất bại: Đã thử 5 lần nhưng không thể gọi model ${data.testResult.model}.`
          );
        }
      } else {
        onShowToast(data.error || 'Lỗi khi kiểm tra model AI.');
      }
    } catch {
      onShowToast('Lỗi kết nối khi gửi yêu cầu test model AI.');
    } finally {
      setTestingModel(false);
    }
  };

  // Fetch current system AI settings & registered users
  const fetchSettings = useCallback(async (isManual = false) => {
    if (isManual) setLoading(true);
    try {
      const res = await fetch(`/api/admin/ai-settings?email=${encodeURIComponent(userEmail)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setSettings(data.settings);
          setRemainingToday(data.remainingToday);
          setProviders(data.providers);
          if (data.popularModels) setPopularModels(data.popularModels);
          setRegisteredUsers(data.registeredUsers || []);
          setUserUsageToday(data.userUsageToday || {});
          setDailyLimitInput(data.settings.dailyLimit);
          setGuestDailyLimitInput(data.settings.guestDailyLimit ?? 5);
          setUserDailyLimitInput(data.settings.userDailyLimit ?? 50);
        } else {
          onShowToast(data.error || 'Lỗi khi tải thông tin AI hệ thống.');
        }
      } else {
        const errData = await res.json().catch(() => ({}));
        onShowToast(errData.error || 'Không có quyền truy cập cấu hình AI.');
      }
    } catch {
      onShowToast('Lỗi kết nối khi tải cài đặt AI hệ thống.');
    } finally {
      setLoading(false);
    }
  }, [userEmail, onShowToast]);

  useEffect(() => {
    let ignore = false;
    fetch(`/api/admin/ai-settings?email=${encodeURIComponent(userEmail)}`)
      .then((res) => res.json())
      .then((data) => {
        if (ignore) return;
        if (data && data.success) {
          setSettings(data.settings);
          setRemainingToday(data.remainingToday);
          setProviders(data.providers);
          if (data.popularModels) setPopularModels(data.popularModels);
          setRegisteredUsers(data.registeredUsers || []);
          setUserUsageToday(data.userUsageToday || {});
          setDailyLimitInput(data.settings.dailyLimit);
          setGuestDailyLimitInput(data.settings.guestDailyLimit ?? 5);
          setUserDailyLimitInput(data.settings.userDailyLimit ?? 50);
        }
        setLoading(false);
      })
      .catch(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [userEmail]);

  // Update settings handler
  const handleUpdate = async (partial: Partial<SystemAISettings>, successMessage: string) => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/ai-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          action: 'update_settings',
          settings: partial,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setSettings(data.settings);
          setRemainingToday(data.remainingToday);
          onShowToast(successMessage);
        } else {
          onShowToast(data.error || 'Không thể lưu cài đặt.');
        }
      } else {
        const err = await res.json().catch(() => ({}));
        onShowToast(err.error || 'Lỗi khi cập nhật cài đặt.');
      }
    } catch {
      onShowToast('Lỗi mạng khi lưu cài đặt.');
    } finally {
      setSaving(false);
    }
  };

  // Reset global quota handler
  const handleResetQuota = async () => {
    setResetting(true);
    try {
      const res = await fetch('/api/admin/ai-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          action: 'reset_quota',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setSettings(data.settings);
          setRemainingToday(data.remainingToday);
          setShowResetConfirm(false);
          onShowToast('Đã đặt lại hạn ngạch (quota) hôm nay về 0!');
        } else {
          onShowToast(data.error || 'Không thể đặt lại quota.');
        }
      }
    } catch {
      onShowToast('Lỗi mạng khi đặt lại quota.');
    } finally {
      setResetting(false);
    }
  };

  // Add or update individual user override
  const handleSaveUserOverride = async () => {
    const target = overrideTargetEmail.trim();
    if (!target) {
      onShowToast('Vui lòng chọn hoặc nhập Email / User ID của người dùng.');
      return;
    }
    if (overrideLimitInput < 1) {
      onShowToast('Hạn mức riêng phải từ 1 lượt trở lên.');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/ai-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          action: 'set_user_override',
          override: {
            identifier: target,
            email: target,
            dailyLimit: overrideLimitInput,
            note: overrideNoteInput,
          },
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSettings(data.settings);
        onShowToast(data.message || `Đã thiết lập hạn mức riêng cho ${target}!`);
        setOverrideTargetEmail('');
        setOverrideNoteInput('');
        setOverrideLimitInput(100);
      } else {
        onShowToast(data.error || 'Không thể thiết lập hạn mức riêng.');
      }
    } catch {
      onShowToast('Lỗi kết nối khi lưu hạn mức riêng.');
    } finally {
      setSaving(false);
    }
  };

  // Delete user override
  const handleRemoveOverride = async (identifier: string) => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/ai-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          action: 'remove_user_override',
          identifier,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSettings(data.settings);
        setDeletingOverrideId(null);
        onShowToast(data.message || `Đã xóa hạn mức riêng của ${identifier}!`);
      } else {
        onShowToast(data.error || 'Không thể xóa hạn mức riêng.');
      }
    } catch {
      onShowToast('Lỗi kết nối khi xóa hạn mức riêng.');
    } finally {
      setSaving(false);
    }
  };

  // Reset a specific user's quota today
  const handleResetUserQuota = async (identifier: string) => {
    try {
      const res = await fetch('/api/admin/ai-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          action: 'reset_user_quota',
          identifier,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setUserUsageToday(data.userUsageToday || {});
        setResettingUserQuotaId(null);
        onShowToast(`Đã đặt lại số lượt dùng hôm nay của ${identifier} về 0!`);
      } else {
        onShowToast(data.error || 'Không thể đặt lại lượt dùng.');
      }
    } catch {
      onShowToast('Lỗi kết nối khi đặt lại lượt dùng.');
    }
  };

  if (loading) {
    return (
      <div className="p-12 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center gap-3 text-slate-400">
        <RefreshCw className="w-6 h-6 animate-spin text-purple-400" />
        <span className="text-sm font-semibold">Đang tải trạng thái và quota AI hệ thống...</span>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="p-8 rounded-3xl bg-rose-950/20 border border-rose-500/30 text-rose-300 space-y-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-400" />
          <h3 className="text-sm font-bold">Không thể tải thông tin Quản trị AI</h3>
        </div>
        <p className="text-xs text-rose-200/80">
          Chỉ tài khoản quản trị viên <strong>nhuong2n@gmail.com</strong> mới có quyền xem và điều chỉnh tính năng này.
        </p>
      </div>
    );
  }

  const usedPercentage = Math.min(100, Math.round((settings.usedToday / Math.max(1, settings.dailyLimit)) * 100));
  const isNearLimit = usedPercentage >= 80;
  const isOverLimit = settings.usedToday >= settings.dailyLimit;

  // Filter overrides list
  const activeOverrides: UserQuotaOverride[] = settings.userOverrides || [];
  const filteredOverrides = activeOverrides.filter((o) => {
    if (!overrideFilterText.trim()) return true;
    const q = overrideFilterText.toLowerCase();
    return (
      (o.identifier && o.identifier.toLowerCase().includes(q)) ||
      (o.email && o.email.toLowerCase().includes(q)) ||
      (o.note && o.note.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header Banner */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/30 border border-purple-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-inner">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black text-white">Quản Trị AI Toàn Hệ Thống</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Admin Only
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Hạn Mức Theo User & Toàn Hệ Thống
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Quản lý số lượng quota toàn hệ thống, hạn mức khách vãng lai, hạn mức thành viên và thiết lập hạn mức riêng cho từng user.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fetchSettings(true)}
              disabled={loading || saving}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors disabled:opacity-50"
              title="Tải lại số liệu mới nhất"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Làm mới</span>
            </button>
          </div>
        </div>

        {/* Global Alert if master switch is OFF */}
        {!settings.globalEnabled && (
          <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-xs text-rose-200 flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>
              <strong>CẢNH BÁO:</strong> Toàn bộ tính năng AI (AI Tutor, Phòng chat thực chiến, Gợi ý, Mở đầu) đang bị TẮT trên toàn hệ thống. Mọi người dùng sẽ nhận thông báo tạm dừng khi kích hoạt AI.
            </span>
          </div>
        )}
      </div>

      {/* 2. Quota Statistics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Used Quota Today */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Quota Hệ Thống Đã Dùng Hôm Nay</span>
            <Activity className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{settings.usedToday.toLocaleString()}</span>
            <span className="text-xs text-slate-400 font-semibold">/ {settings.dailyLimit.toLocaleString()} lượt</span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  isOverLimit
                    ? 'bg-rose-500'
                    : isNearLimit
                    ? 'bg-amber-500'
                    : 'bg-gradient-to-r from-indigo-500 to-emerald-400'
                }`}
                style={{ width: `${usedPercentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Đã dùng {usedPercentage}%</span>
              <span>{isOverLimit ? 'Đã chạm trần' : 'Trong định mức'}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Gemini: <strong className="text-emerald-400">{settings.geminiUsedToday}</strong></span>
            <span>Cloudflare: <strong className="text-amber-400">{settings.cloudflareUsedToday}</strong></span>
          </div>
        </div>

        {/* Card 2: Remaining Quota Today */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Quota Hệ Thống Còn Lại Hôm Nay</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span
              className={`text-3xl font-black ${
                remainingToday <= 0 ? 'text-rose-400' : remainingToday < 200 ? 'text-amber-400' : 'text-emerald-400'
              }`}
            >
              {remainingToday.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400 font-semibold">lượt gọi khả dụng</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                remainingToday <= 0
                  ? 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                  : remainingToday < 200
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                  : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
              }`}
            >
              {remainingToday <= 0 ? 'Đã hết Quota' : remainingToday < 200 ? 'Sắp hết' : 'Dồi dào & Sẵn sàng'}
            </span>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              disabled={resetting || saving}
              className="text-[11px] text-indigo-400 hover:text-indigo-300 font-bold inline-flex items-center gap-1 disabled:opacity-50"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Đặt lại Quota hệ thống</span>
            </button>
          </div>
        </div>

        {/* Card 3: User Quotas Summary */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Định Mức Người Dùng</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Khách chưa đăng nhập:</span>
              <strong className="text-amber-400">{settings.guestDailyLimit ?? 5} lượt/ngày</strong>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">User đã đăng nhập:</span>
              <strong className="text-emerald-400">{settings.userDailyLimit ?? 50} lượt/ngày</strong>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Hạn mức riêng cấu hình:</span>
              <strong className="text-indigo-400">{activeOverrides.length} người dùng</strong>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-snug pt-1">
            Bộ đếm tự động làm mới sau 00:00 (chu kỳ ngày: <strong className="text-slate-300">{settings.lastResetDate}</strong>).
          </p>

          <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-500">
            Tổng lượt gọi toàn thời gian: <strong>{settings.totalUsed.toLocaleString()}</strong> lượt
          </div>
        </div>
      </div>

      {/* 3. Bật / Tắt Các Mô Hình AI Hệ Thống */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Power className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Bật / Tắt Sử Dụng Mô Hình AI Hệ Thống</h3>
            <p className="text-xs text-slate-400">
              Kiểm soát quyền truy cập mô hình AI trên toàn hệ thống. Mọi người dùng sẽ tuân thủ cấu hình này.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Item 1: Master Global Switch */}
          <div
            className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              settings.globalEnabled
                ? 'bg-slate-950 border-slate-800 hover:border-slate-700'
                : 'bg-rose-950/20 border-rose-500/40 text-rose-200'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">Toàn Bộ Hệ Thống AI (Master Switch)</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    settings.globalEnabled
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                  }`}
                >
                  {settings.globalEnabled ? 'ĐANG BẬT' : 'ĐANG TẮT TOÀN DIỆN'}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                Công tắc tổng. Khi tắt, toàn bộ các tính năng AI (AI Tutor, Phòng chat thực chiến, Gợi ý câu trả lời, Đổi câu mở đầu) sẽ tạm ngưng phục vụ tất cả người dùng.
              </p>
            </div>

            <button
              type="button"
              disabled={saving}
              onClick={() =>
                handleUpdate(
                  { globalEnabled: !settings.globalEnabled },
                  settings.globalEnabled ? 'Đã tắt toàn bộ hệ thống AI.' : 'Đã bật lại toàn bộ hệ thống AI.'
                )
              }
              className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-50 self-end sm:self-center ${
                settings.globalEnabled ? 'bg-indigo-600' : 'bg-slate-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  settings.globalEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Item 2: Google Gemini Flash Switch */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-sm font-bold text-white">Google Gemini Flash</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    settings.geminiEnabled
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  {settings.geminiEnabled ? 'Đang bật (Primary)' : 'Đã tắt'}
                </span>
                {providers?.gemini && (
                  <span className="text-[10px] text-slate-400 hidden md:inline">
                    ({providers.gemini.model})
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                Mô hình chính chất lượng cao. Nếu tắt, hệ thống sẽ tự động chuyển hướng toàn bộ người dùng sang Cloudflare Workers AI (Llama 3.1).
              </p>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center">
              <button
                type="button"
                disabled={testingModel}
                onClick={() => {
                  setTestProvider('gemini');
                  const targetModel = providers?.gemini?.model || 'gemini-flash-lite-latest';
                  setTestModel(targetModel);
                  setIsCustomModel(false);
                  handleTestModel('gemini', targetModel);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-50"
                title="Kiểm tra khả năng gọi của model Gemini này (retry tối đa 5 lần)"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{testingModel && testProvider === 'gemini' ? 'Đang test...' : 'Test gọi (5x)'}</span>
              </button>

              <button
                type="button"
                disabled={saving}
                onClick={() =>
                  handleUpdate(
                    { geminiEnabled: !settings.geminiEnabled },
                    settings.geminiEnabled ? 'Đã tắt mô hình Google Gemini.' : 'Đã bật mô hình Google Gemini.'
                  )
                }
                className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-50 ${
                  settings.geminiEnabled ? 'bg-emerald-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    settings.geminiEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Item 3: Cloudflare Workers AI Switch */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-sm font-bold text-white">Cloudflare Workers AI (Llama 3.1)</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    settings.cloudflareEnabled
                      ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  {settings.cloudflareEnabled ? 'Đang bật (Fallback)' : 'Đã tắt'}
                </span>
                {providers?.cloudflare && (
                  <span className="text-[10px] text-slate-400 hidden md:inline">
                    ({providers.cloudflare.model})
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                Mô hình dự phòng siêu tốc trên hạ tầng Edge toàn cầu. Nếu tắt, cơ chế fallback sang Cloudflare sẽ không được kích hoạt khi Gemini gặp sự cố.
              </p>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center">
              <button
                type="button"
                disabled={testingModel}
                onClick={() => {
                  setTestProvider('cloudflare');
                  const targetModel = providers?.cloudflare?.model || '@cf/meta/llama-3.1-8b-instruct';
                  setTestModel(targetModel);
                  setIsCustomModel(false);
                  handleTestModel('cloudflare', targetModel);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-amber-400 text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-50"
                title="Kiểm tra khả năng gọi của model Cloudflare này (retry tối đa 5 lần)"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{testingModel && testProvider === 'cloudflare' ? 'Đang test...' : 'Test gọi (5x)'}</span>
              </button>

              <button
                type="button"
                disabled={saving}
                onClick={() =>
                  handleUpdate(
                    { cloudflareEnabled: !settings.cloudflareEnabled },
                    settings.cloudflareEnabled
                      ? 'Đã tắt mô hình Cloudflare Workers AI.'
                      : 'Đã bật mô hình Cloudflare Workers AI.'
                  )
                }
                className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-50 ${
                  settings.cloudflareEnabled ? 'bg-amber-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    settings.cloudflareEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Khối Test Khả Năng Gọi Model AI (Diagnostics & Retry Test up to 5x) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Kiểm Tra Khả Năng Gọi Của Model AI</h3>
              <p className="text-xs text-slate-400">
                Thử nghiệm gửi prompt kiểm tra tới từng model AI. Hệ thống tự động <strong>thử lại (retry) tối đa 5 lần</strong> nếu gặp sự cố.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => {
                setTestProvider('gemini');
                setTestModel('gemini-flash-lite-latest');
                setIsCustomModel(false);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                testProvider === 'gemini'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Google Gemini</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setTestProvider('cloudflare');
                setTestModel('@cf/meta/llama-3.1-8b-instruct');
                setIsCustomModel(false);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                testProvider === 'cloudflare'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Cloudflare Workers AI</span>
            </button>
          </div>
        </div>

        {/* Model Selector & Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Model selection */}
          <div className="md:col-span-5 space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-300 block">
              Chọn Model AI Muốn Test:
            </label>
            <select
              value={isCustomModel ? 'custom' : testModel}
              onChange={(e) => {
                if (e.target.value === 'custom') {
                  setIsCustomModel(true);
                  setCustomModelInput('');
                } else {
                  setIsCustomModel(false);
                  setTestModel(e.target.value);
                }
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <optgroup label={testProvider === 'gemini' ? 'Mô hình Google Gemini phổ biến' : 'Mô hình Cloudflare Workers AI phổ biến'}>
                {(testProvider === 'gemini' ? popularModels.gemini : popularModels.cloudflare).map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.id})
                  </option>
                ))}
              </optgroup>
              <option value="custom">-- Nhập tên model tùy chỉnh khác... --</option>
            </select>

            {isCustomModel && (
              <div className="pt-1.5 animate-in fade-in duration-150">
                <input
                  type="text"
                  value={customModelInput}
                  onChange={(e) => setCustomModelInput(e.target.value)}
                  placeholder={testProvider === 'gemini' ? 'Ví dụ: gemini-2.5-flash' : 'Ví dụ: @cf/meta/llama-3-8b-instruct'}
                  className="w-full bg-slate-950 border border-cyan-500/50 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>
            )}
          </div>

          {/* Test Prompt */}
          <div className="md:col-span-7 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-semibold text-slate-300 block">
                Nội Dung Prompt Kiểm Tra:
              </label>
              <button
                type="button"
                onClick={() => setTestPrompt('Xin chào! Hãy phản hồi "AI OK" và xác nhận hệ thống đang hoạt động trong dưới 15 từ.')}
                className="text-[10px] text-cyan-400 hover:underline"
              >
                Khôi phục prompt mặc định
              </button>
            </div>
            <input
              type="text"
              value={testPrompt}
              onChange={(e) => setTestPrompt(e.target.value)}
              placeholder="Nhập prompt thử nghiệm..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between flex-wrap gap-3 pt-1 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>
              Mục tiêu test:{' '}
              <strong className="text-white font-mono">
                {isCustomModel ? customModelInput || 'Chưa nhập tên' : testModel}
              </strong>{' '}
              (Provider:{' '}
              <span className="capitalize text-slate-300 font-semibold">{testProvider}</span>)
            </span>
          </div>

          <button
            type="button"
            disabled={testingModel || (isCustomModel && !customModelInput.trim())}
            onClick={() => handleTestModel()}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-600/20 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {testingModel ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Đang Kiểm Tra & Retry (Tối Đa 5 Lần)...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Bắt Đầu Kiểm Tra Model (Tối Đa 5 Lần Thử)</span>
              </>
            )}
          </button>
        </div>

        {/* Test Result Display */}
        {testResult && (
          <div className="mt-4 p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 animate-in fade-in duration-200">
            {/* Status Banner */}
            <div
              className={`p-4 rounded-xl border flex items-start sm:items-center justify-between flex-wrap gap-3 ${
                testResult.success
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              }`}
            >
              <div className="flex items-center gap-3">
                {testResult.success ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-6 h-6 text-rose-400 shrink-0" />
                )}
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    {testResult.success ? 'MÔ HÌNH HOẠT ĐỘNG TỐT (HEALTHY)' : 'KHÔNG THỂ GỌI MÔ HÌNH (UNHEALTHY)'}
                    <span className="text-xs font-mono font-normal opacity-80">
                      [{testResult.provider.toUpperCase()} - {testResult.model}]
                    </span>
                  </h4>
                  <p className="text-xs mt-0.5 opacity-90">
                    {testResult.success ? (
                      <>
                        Gọi thành công ở <strong>lần thử {testResult.succeededAtAttempt}/{testResult.maxRetries}</strong>. Tổng thời gian phản hồi: <strong>{testResult.totalDurationMs.toLocaleString()}ms</strong>.
                      </>
                    ) : (
                      <>
                        Đã thử <strong>tất cả {testResult.maxRetries} lần (retry 5x)</strong> nhưng mô hình không phản hồi thành công.
                      </>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 font-mono">
                  {testResult.attemptsCount} / {testResult.maxRetries} lần thử
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 font-mono">
                  {testResult.totalDurationMs}ms
                </span>
              </div>
            </div>

            {/* Response Preview Box */}
            {testResult.success && testResult.responseSnippet && (
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    Nội Dung Phản Hồi Từ Model:
                  </span>
                  <span className="text-emerald-400 font-mono">Status: 200 OK</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-200 font-mono leading-relaxed whitespace-pre-wrap break-words">
                  {testResult.responseSnippet}
                </div>
              </div>
            )}

            {/* Error Message */}
            {!testResult.success && testResult.error && (
              <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-800/50 space-y-1">
                <span className="text-[11px] font-semibold text-rose-300 block">Lỗi chi tiết lần thử cuối:</span>
                <p className="text-xs text-rose-400 font-mono break-all">{testResult.error}</p>
              </div>
            )}

            {/* Attempts History Log */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Nhật Ký Từng Lần Thử Nghiệm ({testResult.attempts.length} lần):
              </span>

              <div className="space-y-1.5">
                {testResult.attempts.map((att) => (
                  <div
                    key={att.attemptNumber}
                    className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                      att.success
                        ? 'bg-emerald-950/20 border-emerald-500/20 text-slate-200'
                        : 'bg-rose-950/20 border-rose-500/20 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
                      <span
                        className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] shrink-0 ${
                          att.success
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        #{att.attemptNumber}
                      </span>
                      <span className="font-semibold text-white shrink-0">
                        Lần {att.attemptNumber}:
                      </span>
                      <span className="truncate text-slate-400 text-[11px]">
                        {att.success ? (
                          <span className="text-emerald-400 font-medium">✓ Phản hồi thành công</span>
                        ) : (
                          <span className="text-rose-400 font-mono truncate">{att.error || 'Thất bại không rõ nguyên nhân'}</span>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 text-[11px] text-slate-400 font-mono">
                      <span>{att.durationMs}ms</span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          att.success
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-rose-500/20 text-rose-300'
                        }`}
                      >
                        {att.success ? 'SUCCESS' : 'FAILED'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Cấu Hình Hạn Ngạch Quota Khách & Thành Viên (Guest vs Logged-In Limits) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Thiết Lập Hạn Mức AI Theo Nhóm Người Dùng</h3>
            <p className="text-xs text-slate-400">
              Phân định hạn ngạch sử dụng AI giữa khách vãng lai chưa đăng nhập và người dùng đã đăng nhập tài khoản.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Box A: Khách chưa đăng nhập (Guest Limit) */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Khách Vãng Lai Chưa Đăng Nhập</h4>
                    <span className="text-[10px] text-amber-400 font-medium">Hiện tại: {settings.guestDailyLimit ?? 5} lượt / ngày</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Số lượt gọi AI tối đa mỗi ngày cho người dùng chưa đăng nhập. Khi đạt tới hạn mức này, hệ thống sẽ <strong>hiển thị thông báo yêu cầu đăng nhập tài khoản</strong> để tiếp tục sử dụng và nâng hạn mức.
              </p>

              {/* Quick Presets */}
              <div className="space-y-1.5 pt-1">
                <label className="text-[11px] font-semibold text-slate-400">Chọn nhanh:</label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[2, 3, 5, 10, 15].map((preset) => {
                    const isSelected = guestDailyLimitInput === preset;
                    return (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setGuestDailyLimitInput(preset)}
                        className={`py-1.5 px-2 rounded-xl border text-xs font-bold transition-all text-center ${
                          isSelected
                            ? 'bg-amber-600 text-white border-amber-500 shadow-md shadow-amber-600/20'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {preset} lượt
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2.5">
              <div className="relative flex-1">
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={guestDailyLimitInput}
                  onChange={(e) => setGuestDailyLimitInput(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-500">lượt/ngày</span>
              </div>
              <button
                type="button"
                disabled={saving || guestDailyLimitInput === (settings.guestDailyLimit ?? 5)}
                onClick={() =>
                  handleUpdate(
                    { guestDailyLimit: guestDailyLimitInput },
                    `Đã cập nhật hạn mức khách vãng lai thành ${guestDailyLimitInput} lượt/ngày!`
                  )
                }
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all shadow-md shadow-amber-600/20 disabled:opacity-40"
              >
                {saving ? 'Lưu...' : 'Lưu Hạn Mức'}
              </button>
            </div>
          </div>

          {/* Box B: Người dùng đã đăng nhập (Logged-in Limit) */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                    <UserCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Thành Viên Đã Đăng Nhập (Mặc Định)</h4>
                    <span className="text-[10px] text-emerald-400 font-medium">Hiện tại: {settings.userDailyLimit ?? 50} lượt / ngày</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Hạn mức tiêu chuẩn áp dụng cho tất cả tài khoản học viên đã đăng nhập vào hệ thống. Được làm mới tự động sau 00:00 hàng ngày (trừ tài khoản có thiết lập riêng bên dưới).
              </p>

              {/* Quick Presets */}
              <div className="space-y-1.5 pt-1">
                <label className="text-[11px] font-semibold text-slate-400">Chọn nhanh:</label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[20, 30, 50, 100, 200].map((preset) => {
                    const isSelected = userDailyLimitInput === preset;
                    return (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setUserDailyLimitInput(preset)}
                        className={`py-1.5 px-2 rounded-xl border text-xs font-bold transition-all text-center ${
                          isSelected
                            ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/20'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {preset} lượt
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2.5">
              <div className="relative flex-1">
                <input
                  type="number"
                  min={1}
                  max={1000}
                  value={userDailyLimitInput}
                  onChange={(e) => setUserDailyLimitInput(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-500">lượt/ngày</span>
              </div>
              <button
                type="button"
                disabled={saving || userDailyLimitInput === (settings.userDailyLimit ?? 50)}
                onClick={() =>
                  handleUpdate(
                    { userDailyLimit: userDailyLimitInput },
                    `Đã cập nhật hạn mức user đã đăng nhập thành ${userDailyLimitInput} lượt/ngày!`
                  )
                }
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 disabled:opacity-40"
              >
                {saving ? 'Lưu...' : 'Lưu Hạn Mức'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Cấu Hình Hạn Mức Riêng Cho 1 User Cụ Thể (Individual User Overrides) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <UserCog className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Thiết Lập Hạn Mức Riêng Cho 1 User Cụ Thể</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {activeOverrides.length} user tùy chỉnh
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Gán hạn mức quota đặc biệt cho học viên VIP, tài khoản kiểm thử hoặc giới hạn riêng cho 1 cá nhân cụ thể.
              </p>
            </div>
          </div>
        </div>

        {/* Add / Edit Override Form */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <UserPlus className="w-3.5 h-3.5 text-indigo-400" />
            <span>Thêm hoặc Cập Nhật Hạn Mức Riêng Cho User</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            {/* Input 1: User Email or Selection */}
            <div className="sm:col-span-5 space-y-1.5 relative">
              <label className="text-[11px] font-semibold text-slate-300 block">
                Email / User ID:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={overrideTargetEmail}
                  onChange={(e) => {
                    setOverrideTargetEmail(e.target.value);
                    setUserDropdownOpen(true);
                  }}
                  onFocus={() => setUserDropdownOpen(true)}
                  placeholder="Nhập email hoặc chọn học viên..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                />
                {registeredUsers.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-indigo-400 hover:text-indigo-300 px-1.5 py-0.5 rounded bg-indigo-500/10"
                  >
                    Gợi ý ({registeredUsers.length})
                  </button>
                )}
              </div>

              {/* Dropdown of Registered Users */}
              {userDropdownOpen && registeredUsers.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-1.5 z-40 max-h-48 overflow-y-auto">
                  <div className="flex items-center justify-between px-2 py-1 text-[10px] text-slate-400 border-b border-slate-800">
                    <span>Chọn từ danh sách đã đăng ký ({registeredUsers.length}):</span>
                    <button
                      type="button"
                      onClick={() => setUserDropdownOpen(false)}
                      className="text-slate-500 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  {registeredUsers
                    .filter((u) => !overrideTargetEmail || u.email.toLowerCase().includes(overrideTargetEmail.toLowerCase()))
                    .map((u) => (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => {
                          setOverrideTargetEmail(u.email);
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-800 text-slate-200 flex items-center justify-between transition-colors"
                      >
                        <span className="font-medium truncate">{u.email}</span>
                        <span className="text-[10px] text-slate-500 font-mono ml-2 shrink-0">
                          {u.email.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? 'Admin' : 'Học viên'}
                        </span>
                      </button>
                    ))}
                </div>
              )}
            </div>

            {/* Input 2: Quota Daily Limit */}
            <div className="sm:col-span-3 space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-300 block">
                Hạn Mức Riêng / Ngày:
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={1}
                  max={50000}
                  value={overrideLimitInput}
                  onChange={(e) => setOverrideLimitInput(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-500">lượt/ngày</span>
              </div>
            </div>

            {/* Input 3: Note / Label */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-300 block">
                Ghi Chú / Nhãn:
              </label>
              <input
                type="text"
                value={overrideNoteInput}
                onChange={(e) => setOverrideNoteInput(e.target.value)}
                placeholder="VD: VIP, Tester..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Button: Submit */}
            <div className="sm:col-span-2">
              <button
                type="button"
                disabled={saving || !overrideTargetEmail.trim()}
                onClick={handleSaveUserOverride}
                className="w-full py-2 px-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/25 disabled:opacity-40"
              >
                {saving ? 'Đang lưu...' : 'Lưu Hạn Mức'}
              </button>
            </div>
          </div>
        </div>

        {/* Overrides Table / Cards List */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Danh Sách Hạn Mức Riêng Đang Áp Dụng ({activeOverrides.length})
            </h4>

            {activeOverrides.length > 3 && (
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={overrideFilterText}
                  onChange={(e) => setOverrideFilterText(e.target.value)}
                  placeholder="Tìm email, ghi chú..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            )}
          </div>

          {activeOverrides.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-center space-y-2 text-slate-400">
              <UserCog className="w-8 h-8 mx-auto text-slate-600" />
              <p className="text-xs">
                Chưa có người dùng nào được thiết lập hạn mức riêng. Tất cả thành viên đã đăng nhập đang áp dụng hạn mức mặc định: <strong>{settings.userDailyLimit ?? 50} lượt/ngày</strong>.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredOverrides.map((ov) => {
                const identifierKey = (ov.email || ov.identifier).toLowerCase();
                const usage = userUsageToday[identifierKey]?.usedToday ?? userUsageToday[ov.identifier]?.usedToday ?? 0;
                const pct = Math.min(100, Math.round((usage / Math.max(1, ov.dailyLimit)) * 100));
                const isOver = usage >= ov.dailyLimit;

                return (
                  <div
                    key={ov.identifier}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-white truncate max-w-xs sm:max-w-md">
                          {ov.email || ov.identifier}
                        </span>
                        {ov.note && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            {ov.note}
                          </span>
                        )}
                        {ov.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Quản trị viên
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-[11px] text-slate-400">
                        <span>
                          Hạn mức riêng: <strong className="text-indigo-400">{ov.dailyLimit.toLocaleString()} lượt/ngày</strong>
                        </span>
                        <span>
                          Đã dùng hôm nay: <strong className={isOver ? 'text-rose-400' : 'text-emerald-400'}>{usage} lượt</strong> ({pct}%)
                        </span>
                      </div>

                      {/* Mini Progress bar */}
                      <div className="w-full max-w-sm h-1.5 rounded-full bg-slate-800 overflow-hidden mt-1">
                        <div
                          className={`h-full transition-all ${isOver ? 'bg-rose-500' : 'bg-gradient-to-r from-indigo-500 to-emerald-400'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => {
                          setOverrideTargetEmail(ov.email || ov.identifier);
                          setOverrideLimitInput(ov.dailyLimit);
                          setOverrideNoteInput(ov.note || '');
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                        title="Tải vào biểu mẫu để sửa"
                      >
                        <Edit3 className="w-3 h-3 text-slate-400" />
                        <span>Sửa</span>
                      </button>

                      {resettingUserQuotaId === ov.identifier ? (
                        <div className="inline-flex items-center gap-1 bg-amber-500/15 border border-amber-500/30 rounded-xl px-2 py-1 text-xs">
                          <span className="text-[10px] text-amber-300">Đặt về 0?</span>
                          <button
                            type="button"
                            onClick={() => handleResetUserQuota(ov.identifier)}
                            className="px-1.5 py-0.5 rounded bg-amber-600 hover:bg-amber-500 text-white font-bold text-[10px]"
                          >
                            Có
                          </button>
                          <button
                            type="button"
                            onClick={() => setResettingUserQuotaId(null)}
                            className="px-1 py-0.5 text-slate-400 hover:text-white text-[10px]"
                          >
                            Hủy
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setResettingUserQuotaId(ov.identifier)}
                          className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                          title="Đặt lại lượt dùng hôm nay của user này về 0"
                        >
                          <RotateCcw className="w-3 h-3 text-slate-400" />
                          <span>Reset</span>
                        </button>
                      )}

                      {deletingOverrideId === ov.identifier ? (
                        <div className="inline-flex items-center gap-1 bg-rose-500/15 border border-rose-500/30 rounded-xl px-2 py-1 text-xs">
                          <span className="text-[10px] text-rose-300">Xóa override?</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveOverride(ov.identifier)}
                            className="px-1.5 py-0.5 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px]"
                          >
                            Xóa
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingOverrideId(null)}
                            className="px-1 py-0.5 text-slate-400 hover:text-white text-[10px]"
                          >
                            Hủy
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setDeletingOverrideId(ov.identifier)}
                          className="p-1.5 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Xóa hạn mức riêng (chuyển về hạn mức mặc định)"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 6. Cấu Hình Hạn Ngạch Quota Toàn Hệ Thống Mỗi Ngày (System Daily Limit Config) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Thiết Lập Hạn Ngạch Quota Tổng Cả Hệ Thống</h3>
            <p className="text-xs text-slate-400">
              Tổng số lượt gọi AI tối đa cho phép trên toàn bộ hệ thống mỗi ngày tính chung tất cả người dùng (đặt lại vào lúc 00:00).
            </p>
          </div>
        </div>

        {/* Quick presets */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 block">Chọn nhanh hạn ngạch:</label>
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5">
            {[500, 1000, 1500, 2500, 5000, 10000].map((preset) => {
              const isSelected = dailyLimitInput === preset;
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setDailyLimitInput(preset)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                    isSelected
                      ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/20'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {preset.toLocaleString()} lượt
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Input */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
          <div className="flex-1 relative">
            <input
              type="number"
              min={1}
              max={100000}
              value={dailyLimitInput}
              onChange={(e) => setDailyLimitInput(Math.max(1, parseInt(e.target.value) || 0))}
              placeholder="Nhập số lượt quota tối đa mỗi ngày..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500 transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500">lượt / ngày</span>
          </div>

          <button
            type="button"
            disabled={saving || dailyLimitInput === settings.dailyLimit}
            onClick={() =>
              handleUpdate(
                { dailyLimit: dailyLimitInput },
                `Đã cập nhật hạn ngạch hàng ngày thành ${dailyLimitInput.toLocaleString()} lượt!`
              )
            }
            className="px-5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-purple-600/20 disabled:opacity-40 disabled:hover:bg-purple-600"
          >
            {saving ? 'Đang lưu...' : 'Lưu Hạn Ngạch'}
          </button>
        </div>
      </div>

      {/* Confirmation Modal for Global Quota Reset */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <RotateCcw className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-black text-white">Xác nhận đặt lại Quota hệ thống hôm nay?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Số lượng quota toàn hệ thống đã dùng hôm nay ({settings.usedToday} lượt) sẽ được đặt về 0. Toàn bộ người dùng sẽ được tiếp tục sử dụng AI với đầy đủ hạn ngạch ({settings.dailyLimit} lượt).
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleResetQuota}
                disabled={resetting}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-amber-600/30 disabled:opacity-50"
              >
                {resetting ? 'Đang đặt lại...' : 'Xác nhận đặt lại'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
