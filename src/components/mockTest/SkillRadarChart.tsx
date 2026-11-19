'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import { SkillBreakdown } from '@/types/mockTest';

interface SkillRadarChartProps {
  skills: SkillBreakdown[];
}

export function SkillRadarChart({ skills }: SkillRadarChartProps) {
  if (!skills || skills.length === 0) return null;

  const data = skills.map((s) => ({
    name: s.skill,
    accuracy: s.percentage,
    correct: s.correct,
    total: s.total,
  }));

  const getColor = (accuracy: number) => {
    if (accuracy >= 80) return '#10b981';
    if (accuracy >= 60) return '#6366f1';
    return '#f43f5e';
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl">
      <div className="mb-6">
        <h3 className="text-base font-bold text-slate-100">Phân Tích Kỹ Năng (Skill Accuracy)</h3>
        <p className="text-xs text-slate-400 mt-0.5">Tỷ lệ chính xác theo từng dạng bài và kỹ năng ngôn ngữ</p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
            <XAxis type="number" domain={[0, 100]} stroke="#64748b" fontSize={11} unit="%" />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              width={90}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-xs shadow-xl">
                      <p className="font-bold text-slate-200">{d.name}</p>
                      <p className="text-indigo-400 font-bold mt-0.5">
                        {d.accuracy}% ({d.correct}/{d.total} câu)
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="accuracy" radius={[0, 8, 8, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.accuracy)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
