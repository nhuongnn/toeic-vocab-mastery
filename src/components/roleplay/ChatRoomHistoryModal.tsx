'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useMounted } from '@/hooks/useMounted';
import {
  X,
  History,
  Trash2,
  Plus,
  MessageSquare,
  Clock,
  ArrowRight,
  Shield,
  Users,
  Briefcase,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Trophy,
  Check,
  Bot,
  User,
} from 'lucide-react';
import { RoleplayConversation } from '@/types/roleplay';
import { CharacterAvatar } from './CharacterAvatar';
import { formatConversationTime, MAX_CHAT_ROOM_CONVERSATIONS } from '@/lib/roleplay/history';

interface ChatRoomHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: RoleplayConversation[];
  activeConversationId: string | null;
  onSelectConversation: (conversation: RoleplayConversation) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
  onClearAll: () => void;
}

export function ChatRoomHistoryModal({
  isOpen,
  onClose,
  history,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  onClearAll,
}: ChatRoomHistoryModalProps) {
  const mounted = useMounted();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (confirmDeleteId) {
          setConfirmDeleteId(null);
        } else if (showClearConfirm) {
          setShowClearConfirm(false);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, confirmDeleteId, showClearConfirm]);

  if (!isOpen || !mounted) return null;

  const handleToggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleConfirmDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteConversation(id);
    setConfirmDeleteId(null);
    if (expandedId === id) setExpandedId(null);
  };

  const handleConfirmClearAll = () => {
    onClearAll();
    setShowClearConfirm(false);
    setExpandedId(null);
  };

  return createPortal(
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150"
    >
      <div className="relative w-full max-w-2xl max-h-[88vh] rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-800 bg-slate-950/70 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
              <History className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">Lịch Sử Cuộc Hội Thoại</h3>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
                  {history.length}/{MAX_CHAT_ROOM_CONVERSATIONS} gần nhất
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Tự động lưu tối đa 10 cuộc trò chuyện gần nhất. Nhấp để xem lại hoặc xóa.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => {
                onNewConversation();
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-500/20"
              title="Bắt đầu cuộc trò chuyện mới"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tạo mới</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Clear All Confirmation Bar */}
        {showClearConfirm && (
          <div className="px-5 sm:px-6 py-3 bg-rose-500/10 border-b border-rose-500/25 flex items-center justify-between gap-3 text-xs shrink-0 animate-in fade-in duration-150">
            <div className="flex items-center gap-2 text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Bạn có chắc muốn xóa tất cả lịch sử cuộc trò chuyện không?</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleConfirmClearAll}
                className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold transition-colors"
              >
                Xóa hết
              </button>
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        )}

        {/* Conversation List Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {history.length === 0 ? (
            <div className="py-12 px-4 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-3xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400">
                <MessageSquare className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-200">Chưa có cuộc trò chuyện nào được lưu</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Khi bạn gửi tin nhắn trò chuyện với nhân vật AI, lịch sử hội thoại sẽ tự động được lưu lại tại đây (tối đa 10 cuộc hội thoại gần nhất).
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onNewConversation();
                  onClose();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Bắt đầu trò chuyện ngay</span>
              </button>
            </div>
          ) : (
            history.map((conv) => {
              const isActive = conv.id === activeConversationId;
              const isExpanded = expandedId === conv.id;
              const isConfirmingThisDelete = confirmDeleteId === conv.id;

              const roleBadge =
                conv.character.role === 'boss'
                  ? 'bg-purple-500/15 border-purple-500/30 text-purple-300'
                  : conv.character.role === 'colleague'
                  ? 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300'
                  : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300';

              const roleIcon =
                conv.character.role === 'boss' ? (
                  <Shield className="w-3 h-3 text-purple-400" />
                ) : conv.character.role === 'colleague' ? (
                  <Users className="w-3 h-3 text-indigo-400" />
                ) : (
                  <Briefcase className="w-3 h-3 text-emerald-400" />
                );

              const roleLabel =
                conv.character.role === 'boss'
                  ? 'Sếp'
                  : conv.character.role === 'colleague'
                  ? 'Đồng nghiệp'
                  : 'Nhân viên';

              return (
                <div
                  key={conv.id}
                  className={`rounded-2xl border transition-all ${
                    isActive
                      ? 'bg-slate-800/90 border-indigo-500/60 shadow-lg shadow-indigo-500/10'
                      : 'bg-slate-900/80 hover:bg-slate-800/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="p-4 sm:p-4.5 space-y-3">
                    {/* Top Row: Character Info + Timestamp + Active Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <CharacterAvatar avatarId={conv.character.avatar} size="md" />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-white truncate">
                              {conv.character.name}
                            </span>
                            <span
                              className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.2 rounded-full border ${roleBadge}`}
                            >
                              {roleIcon}
                              <span>{roleLabel}</span>
                            </span>
                            {isActive && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 animate-pulse">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                <span>Đang mở</span>
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 truncate mt-0.5">
                            {conv.scenario.title}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 shrink-0">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{formatConversationTime(conv.updatedAt)}</span>
                      </div>
                    </div>

                    {/* Snippet */}
                    {conv.lastMessageSnippet && (
                      <p className="text-xs text-slate-300 bg-slate-950/50 rounded-xl p-2.5 border border-slate-800/80 line-clamp-2 italic leading-relaxed">
                        "{conv.lastMessageSnippet}"
                      </p>
                    )}

                    {/* Bottom Metadata & Actions */}
                    <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/60">
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="inline-flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                          <span>{conv.messageCount} tin nhắn</span>
                        </span>

                        {conv.summary && (
                          <span className="inline-flex items-center gap-1 text-amber-400 font-semibold">
                            <Trophy className="w-3.5 h-3.5" />
                            <span>{conv.summary.scoreEstimate} điểm</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Preview transcript toggle */}
                        <button
                          type="button"
                          onClick={() => handleToggleExpand(conv.id)}
                          className="text-xs text-slate-400 hover:text-slate-200 inline-flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-slate-800 transition-colors"
                          title="Xem nhanh tin nhắn"
                        >
                          <span>{isExpanded ? 'Ẩn' : 'Xem nội dung'}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* Delete or Confirm Delete */}
                        {isConfirmingThisDelete ? (
                          <div className="inline-flex items-center gap-1 bg-rose-500/20 border border-rose-500/40 rounded-xl px-2 py-1 text-xs">
                            <span className="text-rose-300 text-[11px]">Xác nhận xóa?</span>
                            <button
                              type="button"
                              onClick={(e) => handleConfirmDelete(conv.id, e)}
                              className="px-2 py-0.5 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px] transition-colors"
                            >
                              Xóa
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setConfirmDeleteId(null);
                              }}
                              className="px-1.5 py-0.5 rounded text-slate-400 hover:text-white text-[10px]"
                            >
                              Hủy
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setConfirmDeleteId(conv.id);
                            }}
                            className="p-1.5 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Xóa cuộc hội thoại này"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Open / Review Button */}
                        <button
                          type="button"
                          onClick={() => {
                            onSelectConversation(conv);
                            onClose();
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs font-semibold transition-all shadow-sm"
                        >
                          <span>{isActive ? 'Đang mở' : 'Xem lại'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Expandable Message Thread Preview */}
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-slate-800 space-y-2 max-h-56 overflow-y-auto px-1 animate-in fade-in duration-150">
                        <div className="text-[11px] font-semibold text-slate-400 mb-1">
                          Nội dung cuộc hội thoại:
                        </div>
                        {conv.messages.map((m, idx) => {
                          const isUser = m.role === 'user';
                          return (
                            <div
                              key={m.id || idx}
                              className={`flex items-start gap-2 text-xs ${
                                isUser ? 'justify-end' : 'justify-start'
                              }`}
                            >
                              <div
                                className={`rounded-xl px-3 py-1.5 max-w-[85%] leading-relaxed ${
                                  isUser
                                    ? 'bg-indigo-600/80 text-white rounded-tr-sm'
                                    : 'bg-slate-950/70 border border-slate-800 text-slate-200 rounded-tl-sm'
                                }`}
                              >
                                <span className="font-semibold text-[10px] text-slate-400 block mb-0.5">
                                  {isUser ? conv.userName || 'Bạn' : conv.character.name}
                                </span>
                                <p className="whitespace-pre-wrap">{m.content}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="flex items-center justify-between px-5 sm:px-6 py-3 border-t border-slate-800 bg-slate-950/70 text-xs shrink-0">
            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              disabled={showClearConfirm}
              className="text-slate-400 hover:text-rose-400 transition-colors inline-flex items-center gap-1.5 disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa toàn bộ lịch sử</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors"
            >
              Đóng
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
