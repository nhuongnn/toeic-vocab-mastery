'use client';

import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { TrendingUp, Layers, CheckCircle2, Zap } from 'lucide-react';
import { SRSCard } from '@/types/progress';

interface ProgressVelocityChartProps {
  cards: Record<string, SRSCard>;
  totalLearned: number;
}

interface ChartItem {
  weekLabel: string;
  newWords: number;
  cumulativeWords: number;
  reviewsCount: number;
}

export function ProgressVelocityChart({
  cards,
  totalLearned,
}: ProgressVelocityChartProps) {
  const [metricMode, setMetricMode] = useState<'combined' | 'cumulative' | 'weekly'>('combined');
  const [chartData, setChartData] = useState<ChartItem[]>([]);

  useEffect(() => {
    const weeksCount = 10;
    const now = new Date();
    const result: ChartItem[] = [];

    const cardList = Object.values(cards);
    const weekBuckets: { [w: number]: { newWords: number; reviews: number } } = {};
    for (let i = 0; i < weeksCount; i++) {
      weekBuckets[i] = { newWords: 0, reviews: 0 };
    }

    cardList.forEach((card) => {
      let earliestTime = card.lastReview ? new Date(card.lastReview).getTime() : now.getTime();
      if (card.history && card.history.length > 0) {
        card.history.forEach((h) => {
          const t = new Date(h.date).getTime();
          if (t < earliestTime) earliestTime = t;

          const diffWeeks = Math.floor((now.getTime() - t) / (7 * 24 * 60 * 60 * 1000));
          const bucketIndex = weeksCount - 1 - Math.min(weeksCount - 1, Math.max(0, diffWeeks));
          if (weekBuckets[bucketIndex]) {
            weekBuckets[bucketIndex].reviews++;
          }
        });
      } else {
        weekBuckets[weeksCount - 1].reviews++;
      }

      const diffWeeks = Math.floor((now.getTime() - earliestTime) / (7 * 24 * 60 * 60 * 1000));
      const bucketIndex = weeksCount - 1 - Math.min(weeksCount - 1, Math.max(0, diffWeeks));
      if (weekBuckets[bucketIndex]) {
        weekBuckets[bucketIndex].newWords++;
      }
    });

    let cumulative = 0;
    for (let i = 0; i < weeksCount; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() - (weeksCount - 1 - i) * 7);
      const label = `${d.getDate()}/${d.getMonth() + 1}`;

      const newW = weekBuckets[i].newWords;
      cumulative += newW;

      result.push({
        weekLabel: label,
        newWords: newW,
        cumulativeWords: cumulative,
        reviewsCount: weekBuckets[i].reviews,
      });
    }

    if (result.length > 0 && cumulative < totalLearned) {
      result[result.length - 1].cumulativeWords = totalLearned;
    }

    setChartData(result);
  }, [cards, totalLearned]);

  const cardsList = Object.values(cards);
  const masteredCount = cardsList.filter((c) => c.interval >= 14).length;
  const recentWeekReviews =
    chartData.length > 0 ? chartData[chartData.length - 1].reviewsCount : 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>Biểu Đồ Tiến Trình Học Tập (Velocity Chart)</span>
          </div>
          <h3 className="text-lg font-black text-white">Tốc Độ Tích Lũy Từ & Lượt Ôn Tập</h3>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setMetricMode('combined')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              metricMode === 'combined'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tổng hợp
          </button>
          <button
            type="button"
            onClick={() => setMetricMode('cumulative')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              metricMode === 'cumulative'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tích lũy từ
          </button>
          <button
            type="button"
            onClick={() => setMetricMode('weekly')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              metricMode === 'weekly'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Lượt ôn tuần
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Từ Đã Thu Nạp</span>
            <span className="text-xl font-black text-white">{totalLearned} từ</span>
          </div>
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Thẻ Nhớ Dài Hạn (≥14d)</span>
            <span className="text-xl font-black text-emerald-400">{masteredCount} thẻ</span>
          </div>
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Lượt Ôn Tuần Này</span>
            <span className="text-xl font-black text-pink-400">{recentWeekReviews} lượt</span>
          </div>
          <div className="w-8 h-8 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-64 sm:h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="weekLabel"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl shadow-2xl text-xs space-y-1">
                      <p className="font-bold text-slate-200">Tuần ngày {label}</p>
                      {payload.map((entry, idx) => (
                        <p key={idx} style={{ color: entry.color }} className="font-semibold">
                          {entry.name}: {entry.value}
                        </p>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
              iconType="circle"
            />

            {(metricMode === 'combined' || metricMode === 'weekly') && (
              <Bar
                dataKey="reviewsCount"
                name="Lượt ôn tập"
                fill="#ec4899"
                radius={[6, 6, 0, 0]}
                barSize={18}
              />
            )}

            {(metricMode === 'combined' || metricMode === 'cumulative') && (
              <Area
                type="monotone"
                dataKey="cumulativeWords"
                name="Tổng từ tích lũy"
                stroke="#6366f1"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorCumulative)"
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
