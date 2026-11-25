'use client';

import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { X, Settings, Clock, Users, BookOpen, Check, Loader2, Bell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { subscribeToPush } from '@/lib/notifications/pushManager';
import {
  AutoChatSettings,
  INTERVAL_OPTIONS,
  CHARACTER_ROLE_OPTIONS,
} from '@/types/auto-chat';
import { PRESET_SCENARIOS } from '@/lib/roleplay/scenarios';

interface ChatBubbleSettingsModalProps {
  isOpen: boolean;
  settings: AutoChatSettings;
  onClose: () => void;
  onSave: (updated: AutoChatSettings) => Promise<void> | void;
}

export function ChatBubbleSettingsModal({
  isOpen,
  settings,
  onClose,
  onSave,
}: ChatBubbleSettingsModalProps) {
  const { user } = useAuth();
  const [draft, setDraft] = useState<AutoChatSettings>(settings);
  const [isSaving, setIsSaving] = useState(false);

  const filteredScenarios = useMemo(() => {
    if (draft.characterRole === 'random') {
      return PRESET_SCENARIOS;
    }
    return PRESET_SCENARIOS.filter((s) => s.role === draft.characterRole);
  }, [draft.characterRole]);

  // Reset scenarioId to 'random' if selected scenario doesn't match the new role
  const handleRoleChange = (role: AutoChatSettings['characterRole']) => {
    setDraft((prev) => {
      const stillValid =
        prev.scenarioId === 'random' ||
        role === 'random' ||
        PRESET_SCENARIOS.some(
          (s) => s.id === prev.scenarioId && s.role === role
        );
      return {
        ...prev,
        characterRole: role,
        scenarioId: stillValid ? prev.scenarioId : 'random',
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (draft.enabled && draft.pushEnabled && user?.id) {
        await subscribeToPush(user.id);
      }
      await onSave(draft);
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-6 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Cài Đặt Chat Bubble Tự Động
              </h3>
              <p className="text-xs text-slate-400">
                AI chủ động nhắn tin luyện tiếng Anh theo lịch của bạn
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Enable Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div>
              <span className="text-sm font-bold text-white block">
                Bật tự động gửi tin nhắn
              </span>
              <span className="text-xs text-slate-400">
                Nhân vật AI sẽ chủ động nhắn tin theo chu kỳ bạn chọn
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={draft.enabled}
              onClick={() =>
                setDraft((prev) => ({ ...prev, enabled: !prev.enabled }))
              }
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                draft.enabled ? 'bg-indigo-600' : 'bg-slate-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow transition duration-200 ${
                  draft.enabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Web Push Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="pr-3">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-indigo-400" />
                <span>Thông báo đẩy ngoài màn hình (Web Push)</span>
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                Nhận tin nhắn AI trên điện thoại ngay cả khi không mở trình duyệt
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={draft.pushEnabled}
              onClick={() =>
                setDraft((prev) => ({ ...prev, pushEnabled: !prev.pushEnabled }))
              }
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                draft.pushEnabled ? 'bg-emerald-600' : 'bg-slate-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow transition duration-200 ${
                  draft.pushEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Time Window */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Khung giờ cho phép gửi tin</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-1">
                  Từ lúc
                </span>
                <input
                  type="time"
                  value={draft.startTime}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, startTime: e.target.value }))
                  }
                  className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none"
                />
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-1">
                  Đến lúc
                </span>
                <input
                  type="time"
                  value={draft.endTime}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, endTime: e.target.value }))
                  }
                  className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Interval Options */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-300 block">
              Tần suất gửi tin (tối thiểu 10 phút)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {INTERVAL_OPTIONS.map((opt) => {
                const active = draft.intervalMinutes === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() =>
                      setDraft((prev) => ({
                        ...prev,
                        intervalMinutes: opt.value,
                      }))
                    }
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      active
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/25'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Character Role */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              <span>Nhân vật đồng hành</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {CHARACTER_ROLE_OPTIONS.map((role) => {
                const active = draft.characterRole === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => handleRoleChange(role.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      active
                        ? 'bg-indigo-600/20 border-indigo-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-bold block truncate">
                      {role.label}
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {role.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scenario */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span>Chủ đề hội thoại</span>
            </label>
            <select
              value={draft.scenarioId}
              onChange={(e) =>
                setDraft((prev) => ({ ...prev, scenarioId: e.target.value }))
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="random">🎲 Ngẫu nhiên theo nhân vật</option>
              {filteredScenarios.map((sc) => (
                <option key={sc.id} value={sc.id}>
                  {sc.vietnameseTitle || sc.title} ({sc.targetScoreRange})
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition-colors disabled:opacity-60"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              <span>Lưu Cài Đặt</span>
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
