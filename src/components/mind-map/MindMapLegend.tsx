'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { NODE_COLORS, SRS_RING_COLORS } from '@/lib/mind-map/types';

export function MindMapLegend() {
  const [collapsed, setCollapsed] = useState(false);

  const nodeItems = [
    { label: 'Trung tâm', color: NODE_COLORS.center },
    { label: 'Đồng nghĩa', color: NODE_COLORS.synonym },
    { label: 'Trái nghĩa (nét đứt)', color: NODE_COLORS.antonym },
    { label: 'Họ từ (Family)', color: NODE_COLORS.family },
    { label: 'Collocation', color: NODE_COLORS.collocation },
    { label: 'Liên quan', color: NODE_COLORS.related },
  ];

  const srsItems = [
    { label: 'Mastered', color: SRS_RING_COLORS.mastered },
    { label: 'Learning', color: SRS_RING_COLORS.learning },
    { label: 'New', color: SRS_RING_COLORS.new },
  ];

  return (
    <div className="rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-800 shadow-xl text-xs max-w-[230px]">
      <button
        type="button"
        onClick={() => setCollapsed((prev) => !prev)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 text-slate-200 font-semibold hover:text-white transition-colors"
      >
        <span className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-indigo-400" />
          <span>Chú thích</span>
        </span>
        {collapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>

      {!collapsed && (
        <div className="px-3 pb-3 pt-1 space-y-2.5 border-t border-slate-800/80">
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Loại liên kết
            </div>
            <div className="grid grid-cols-1 gap-1">
              {nodeItems.map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-slate-300">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="truncate">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1 pt-1.5 border-t border-slate-800/70">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Viền SRS
            </div>
            <div className="flex items-center gap-2.5 flex-wrap">
              {srsItems.map((item) => (
                <div key={item.label} className="flex items-center gap-1 text-slate-300">
                  <span
                    className="w-2.5 h-2.5 rounded-full border-2 bg-slate-950 shrink-0"
                    style={{ borderColor: item.color }}
                  />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
