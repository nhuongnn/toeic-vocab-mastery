'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  MessageCircle,
  Clock,
  Users,
  BookOpen,
  Lock,
  Check,
  Loader2,
  Sparkles,
  Bell,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { subscribeToPush } from '@/lib/notifications/pushManager';
import {
  AutoChatSettings,
  DEFAULT_AUTO_CHAT_SETTINGS,
  CHARACTER_ROLE_OPTIONS,
} from '@/types/auto-chat';
import {
  fetchAutoChatSettings,
  getLocalAutoChatSettings,
  updateAutoChatSettings,
} from '@/lib/auto-chat/settings';
import { PRESET_SCENARIOS } from '@/lib/roleplay/scenarios';
import { IntervalSelector } from './IntervalSelector';

interface AutoChatSettingsSectionProps {
  onShowToast: (msg: string) => void;
}

export function AutoChatSettingsSection({
  onShowToast,
}: AutoChatSettingsSectionProps) {
  const { user, openAuthModal } = useAuth();
  const [settings, setSettings] = useState<AutoChatSettings>(() =>
    getLocalAutoChatSettings()
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isIntervalValid, setIsIntervalValid] = useState(true);
  const [intervalResetKey, setIntervalResetKey] = useState(0);

  useEffect(() => {
    if (!user?.id) return;
    fetchAutoChatSettings(user.id, user.email ?? undefined).then((loaded) => {
      setSettings(loaded);
      setIsIntervalValid(true);
      setIntervalResetKey((k) => k + 1);
    });
  }, [user?.id, user?.email]);

  const filteredScenarios = useMemo(() => {
    if (settings.characterRole === 'random') {
      return PRESET_SCENARIOS;
    }
    return PRESET_SCENARIOS.filter((s) => s.role === settings.characterRole);
  }, [settings.characterRole]);

  const handleSave = async (next: AutoChatSettings) => {
    if (!user?.id) return;
    setIsSaving(true);
    try {
      if (next.enabled && next.pushEnabled) {
        const sub = await subscribeToPush(user.id);
        if (!sub) {
          onShowToast(
            'Đã lưu cài đặt, nhưng trình duyệt chưa cấp quyền Thông báo đẩy.'
          );
        }
      }
      const updated = await updateAutoChatSettings(
        user.id,
        user.email ?? undefined,
        next
      );
      setSettings(updated);
      onShowToast('Đã lưu cài đặt Chat Bubble & Tự động gửi tin!');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggle = () => {
    const next = { ...settings, enabled: !settings.enabled };
    setSettings(next);
    handleSave(next);
  };

  const handleRoleChange = (role: AutoChatSettings['characterRole']) => {
    const stillValid =
      settings.scenarioId === 'random' ||
      role === 'random' ||
      PRESET_SCENARIOS.some(
        (s) => s.id === settings.scenarioId && s.role === role
      );
    setSettings((prev) => ({
      ...prev,
      characterRole: role,
      scenarioId: stillValid ? prev.scenarioId : 'random',
    }));
  };

  if (!user) {
    return (
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4 animate-fadeIn">
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto">
          <Lock className="w-6 h-6" />
        </div>
        <div className="space-y-1.5 max-w-md mx-auto">
          <h3 className="text-base font-bold text-white">
            Tính năng dành riêng cho tài khoản đã liên kết
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Vui lòng đăng nhập hoặc liên kết tài khoản (Google / Email OTP) để sử dụng bong bóng chat AI và tính năng tự động gửi tin nhắn luyện tiếng Anh.
          </p>
        </div>
        <button
          type="button"
          onClick={openAuthModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          <span>Liên kết ngay</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        {/* Header & Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Chat Bubble & Tự Động Nhắn Tin AI
              </h3>
              <p className="text-xs text-slate-400">
                Bong bóng chat góc trái màn hình giúp AI chủ động nhắn tin luyện giao tiếp mỗi ngày.
              </p>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={settings.enabled}
            onClick={handleToggle}
            className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
              settings.enabled ? 'bg-indigo-600' : 'bg-slate-700'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow transition duration-200 ${
                settings.enabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Web Push Notification Toggle */}
        <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <div>
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-emerald-400" />
              <span>Thông báo đẩy ngoài màn hình (Web Push)</span>
            </span>
            <p className="text-[11px] text-slate-400 mt-1">
              Gửi tin nhắn AI thành thông báo đẩy trên điện thoại ngay cả khi bạn đóng app. Chạm vào thông báo để mở ngay cửa sổ chat.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={settings.pushEnabled}
            onClick={() => {
              const next = { ...settings, pushEnabled: !settings.pushEnabled };
              setSettings(next);
              handleSave(next);
            }}
            className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
              settings.pushEnabled ? 'bg-emerald-600' : 'bg-slate-700'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow transition duration-200 ${
                settings.pushEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Time Window */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-400" />
            <span>Khung giờ AI được phép gửi tin nhắn tự động</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">
                Thời gian bắt đầu
              </span>
              <input
                type="time"
                value={settings.startTime}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, startTime: e.target.value }))
                }
                className="w-full bg-transparent text-sm font-bold text-white focus:outline-none"
              />
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">
                Thời gian kết thúc
              </span>
              <input
                type="time"
                value={settings.endTime}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, endTime: e.target.value }))
                }
                className="w-full bg-transparent text-sm font-bold text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Interval Selector */}
        <IntervalSelector
          key={intervalResetKey}
          value={settings.intervalMinutes}
          onChange={(minutes) =>
            setSettings((prev) => ({
              ...prev,
              intervalMinutes: minutes,
            }))
          }
          onValidityChange={setIsIntervalValid}
        />

        {/* Character Role Selector */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-400" />
            <span>Nhân vật AI mặc định</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {CHARACTER_ROLE_OPTIONS.map((role) => {
              const active = settings.characterRole === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => handleRoleChange(role.id)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    active
                      ? 'bg-indigo-600/20 border-indigo-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xs font-bold block">{role.label}</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    {role.subtitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scenario Selector */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>Chủ đề hội thoại</span>
          </label>
          <select
            value={settings.scenarioId}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, scenarioId: e.target.value }))
            }
            className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="random">🎲 Ngẫu nhiên theo nhân vật</option>
            {filteredScenarios.map((sc) => (
              <option key={sc.id} value={sc.id}>
                {sc.vietnameseTitle || sc.title} ({sc.targetScoreRange})
              </option>
            ))}
          </select>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => {
              setSettings(DEFAULT_AUTO_CHAT_SETTINGS);
              setIsIntervalValid(true);
              setIntervalResetKey((k) => k + 1);
            }}
            className="text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
          >
            Khôi phục mặc định
          </button>
          <button
            type="button"
            disabled={isSaving || !isIntervalValid}
            onClick={() => handleSave(settings)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition-colors disabled:opacity-60"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Check className="w-4 h-4" />
            )}
            <span>Lưu Cài Đặt Chat Bubble</span>
          </button>
        </div>
      </div>
    </div>
  );
}
