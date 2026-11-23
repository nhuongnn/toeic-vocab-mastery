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
} from 'lucide-react';
import { SystemAISettings } from '@/lib/ai/system-ai-settings';

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
  const [providers, setProviders] = useState<{
    gemini: { configured: boolean; model: string; enabled: boolean };
    cloudflare: { configured: boolean; model: string; enabled: boolean };
  } | null>(null);

  const [dailyLimitInput, setDailyLimitInput] = useState<number>(1500);

  // Fetch current system AI settings
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
          setDailyLimitInput(data.settings.dailyLimit);
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
          setDailyLimitInput(data.settings.dailyLimit);
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

  // Reset quota handler
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
                  Áp dụng toàn bộ người dùng
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Quản lý số lượng quota đã dùng, quota còn lại và bật/tắt các mô hình AI áp dụng cho toàn hệ thống.
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
            <span className="text-xs font-bold text-slate-400">Quota Đã Dùng Hôm Nay</span>
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
            <span className="text-xs font-bold text-slate-400">Quota Còn Lại Hôm Nay</span>
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
              <span>Đặt lại Quota hôm nay</span>
            </button>
          </div>
        </div>

        {/* Card 3: Lifetime Total Calls */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Tổng Lượt Gọi Toàn Thời Gian</span>
            <Layers className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{settings.totalUsed.toLocaleString()}</span>
            <span className="text-xs text-slate-400 font-semibold">lượt từ trước tới nay</span>
          </div>

          <p className="text-[11px] text-slate-400 leading-snug">
            Bộ đếm theo ngày tự động chuyển mới sau 00:00 (chu kỳ ngày: <strong className="text-slate-300">{settings.lastResetDate}</strong>).
          </p>

          <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-500">
            Cập nhật lần cuối: {new Date(settings.updatedAt).toLocaleTimeString('vi-VN')} {new Date(settings.updatedAt).toLocaleDateString('vi-VN')}
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

            <button
              type="button"
              disabled={saving}
              onClick={() =>
                handleUpdate(
                  { geminiEnabled: !settings.geminiEnabled },
                  settings.geminiEnabled ? 'Đã tắt mô hình Google Gemini.' : 'Đã bật mô hình Google Gemini.'
                )
              }
              className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-50 self-end sm:self-center ${
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
              className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-50 self-end sm:self-center ${
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

      {/* 4. Cấu Hình Hạn Ngạch Quota Mỗi Ngày (Daily Limit Config) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Thiết Lập Hạn Ngạch Quota Tối Đa Mỗi Ngày</h3>
            <p className="text-xs text-slate-400">
              Tổng số lượt gọi AI tối đa cho phép trên toàn bộ hệ thống mỗi ngày (đặt lại vào lúc 00:00).
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

      {/* Confirmation Modal for Quota Reset */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <RotateCcw className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-black text-white">Xác nhận đặt lại Quota hôm nay?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Số lượng quota đã dùng hôm nay ({settings.usedToday} lượt) sẽ được đặt về 0. Toàn bộ người dùng sẽ được tiếp tục sử dụng AI với đầy đủ hạn ngạch ({settings.dailyLimit} lượt).
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
