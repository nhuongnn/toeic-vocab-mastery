'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { Target, Trophy, TrendingUp, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { getMockTestHistory } from '@/lib/mockTest/storage';
import { MockTestResult } from '@/types/mockTest';

interface ScoreTrendSectionProps {
  currentEstimatedScore: number;
  totalWordsLearned: number;
  targetScore?: number;
}

export function ScoreTrendSection({
  currentEstimatedScore,
  totalWordsLearned,
  targetScore = 650,
}: ScoreTrendSectionProps) {
  const [testHistory, setTestHistory] = useState<MockTestResult[]>([]);

  useEffect(() => {
    setTestHistory(getMockTestHistory());
  }, []);

  // Construct trajectory data points
  const trendData = useMemo(() => {
    const data: {
      label: string;
      score: number;
      type: 'baseline' | 'progress' | 'current' | 'projected' | 'test';
    }[] = [];

    // Baseline
    data.push({ label: 'Khởi đầu', score: 400, type: 'baseline' });

    // Actual Mock Tests if any
    if (testHistory.length > 0) {
      const recentTests = [...testHistory].reverse().slice(-5);
      recentTests.forEach((t, i) => {
        // Full test score is out of 495 (reading only) or converted to 990
        // If mini/full reading, extrapolate reading score to 990 scale (score * 2) or totalScore
        const scaledScore = t.type === 'mini-reading' ? t.totalScore * 2 : t.totalScore * 2;
        data.push({
          label: `Thi #${i + 1}`,
          score: Math.min(990, Math.max(400, scaledScore)),
          type: 'test',
        });
      });
    } else {
      // Intermediate step
      if (currentEstimatedScore > 450) {
        data.push({
          label: 'Giai đoạn 1',
          score: Math.round(400 + (currentEstimatedScore - 400) * 0.5),
          type: 'progress',
        });
      }
    }

    // Current estimated score
    data.push({
      label: 'Hiện tại',
      score: currentEstimatedScore,
      type: 'current',
    });

    // Future Projections towards targetScore
    if (currentEstimatedScore < targetScore) {
      data.push({
        label: `Mục tiêu`,
        score: targetScore,
        type: 'projected',
      });
      if (targetScore < 850) {
        data.push({
          label: 'Kỳ vọng',
          score: Math.min(990, targetScore + 100),
          type: 'projected',
        });
      }
    } else if (currentEstimatedScore < 900) {
      data.push({
        label: 'Mục tiêu tiếp theo',
        score: Math.min(990, targetScore + 100),
        type: 'projected',
      });
    }

    return data;
  }, [currentEstimatedScore, testHistory, targetScore]);

  // Target estimation in weeks
  const remainingPoints = Math.max(0, targetScore - currentEstimatedScore);
  const estimatedWeeksToGoal = Math.max(1, Math.ceil(remainingPoints / 25));

  const milestones = [
    { range: '400 - 550', title: 'Sơ cấp (Elementary)', desc: 'Giao tiếp tình huống công sở cơ bản' },
    { range: '550 - 700', title: 'Trung cấp (Working)', desc: 'Đọc email, văn bản và xử lý công việc độc lập' },
    { range: '700 - 850', title: 'Cao cấp (Target 700+)', desc: 'Đàm phán thương mại & họp quốc tế thành thạo' },
    { range: '850 - 990', title: 'Xuất sắc (Native-level)', desc: 'Phản xạ bản ngữ chuẩn chỉnh mọi phân khúc Part 5-7' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Target className="w-4 h-4" />
            <span>Mô Hình Ước Tính Điểm Số Chuẩn ETS (Score Trend)</span>
          </div>
          <h3 className="text-lg font-black text-white">Quỹ Đạo & Dự Đoán Điểm TOEIC</h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Ước tính hiện tại</span>
            <span className="text-xl font-black text-white">{currentEstimatedScore} <span className="text-xs text-slate-400 font-normal">/ 990</span></span>
          </div>
        </div>
      </div>

      {/* Projection Insight Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-950 border border-indigo-500/30 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
          <p className="text-slate-300">
            {currentEstimatedScore >= targetScore ? (
              <span>
                🎉 Chúc mừng! Bạn đã chạm mốc năng lực <strong className="text-emerald-400">{targetScore}+ TOEIC</strong>. Tiếp tục hoàn thiện 3,675 từ để bứt phá lên đỉnh cao!
              </span>
            ) : (
              <span>
                Với tốc độ học hiện tại, bạn dự kiến chạm mốc <strong className="text-indigo-300">{targetScore}+ TOEIC</strong> sau khoảng <strong className="text-white font-bold">{estimatedWeeksToGoal} tuần</strong> nữa!
              </span>
            )}
          </p>
        </div>
        <Link
          href="/mock-test"
          className="shrink-0 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] uppercase tracking-wider transition-colors"
        >
          Thi thử ngay
        </Link>
      </div>

      {/* Recharts Score Trend Line */}
      <div className="h-56 sm:h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="label"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
            />
            <YAxis
              domain={[350, 990]}
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl shadow-2xl text-xs">
                      <p className="font-bold text-slate-200">{d.label}</p>
                      <p className="font-black text-indigo-400 text-sm mt-0.5">
                        {d.score} / 990 điểm
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            {/* Target line */}
            <ReferenceLine
              y={targetScore}
              stroke="#ec4899"
              strokeDasharray="4 4"
              label={{
                value: `Mục tiêu ${targetScore}+`,
                fill: '#ec4899',
                fontSize: 10,
                position: 'right',
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              name="Điểm TOEIC"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ fill: '#6366f1', r: 5, strokeWidth: 2, stroke: '#ffffff' }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 4 Milestones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
        {milestones.map((m, idx) => {
          const isPassed =
            (idx === 0 && currentEstimatedScore >= 550) ||
            (idx === 1 && currentEstimatedScore >= 700) ||
            (idx === 2 && currentEstimatedScore >= 850);
          const isCurrent =
            (idx === 0 && currentEstimatedScore < 550) ||
            (idx === 1 && currentEstimatedScore >= 550 && currentEstimatedScore < 700) ||
            (idx === 2 && currentEstimatedScore >= 700 && currentEstimatedScore < 850) ||
            (idx === 3 && currentEstimatedScore >= 850);

          return (
            <div
              key={m.range}
              className={`p-3.5 rounded-2xl border transition-all ${
                isCurrent
                  ? 'bg-indigo-600/10 border-indigo-500 shadow-md ring-1 ring-indigo-500/20'
                  : isPassed
                  ? 'bg-slate-950 border-emerald-500/30'
                  : 'bg-slate-950 border-slate-800/80 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold text-slate-400">{m.range}</span>
                {isPassed && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
                {isCurrent && (
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-500 text-white">
                    Hiện tại
                  </span>
                )}
              </div>
              <div className="text-xs font-bold text-white mb-0.5">{m.title}</div>
              <div className="text-[10px] text-slate-400 line-clamp-2">{m.desc}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
