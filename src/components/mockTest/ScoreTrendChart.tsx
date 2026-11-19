'use client';

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { MockTestResult } from '@/types/mockTest';

interface ScoreTrendChartProps {
  history: MockTestResult[];
}

export function ScoreTrendChart({ history }: ScoreTrendChartProps) {
  if (history.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center text-slate-400 text-sm">
        Chưa có dữ liệu bài thi. Hãy hoàn thành ít nhất 1 đề thi thử để theo dõi xu hướng điểm số!
      </div>
    );
  }

  // Reverse so earliest is first
  const data = [...history]
    .reverse()
    .slice(-10)
    .map((item, idx) => ({
      index: idx + 1,
      date: new Date(item.completedAt).toLocaleDateString('vi-VN', {
        month: 'numeric',
        day: 'numeric',
      }),
      score: item.totalScore,
      title: item.title,
      type: item.type,
    }));

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-100">Xu Hướng Điểm Mock Test</h3>
          <p className="text-xs text-slate-400 mt-0.5">Tiến trình điểm số Reading qua các lần thi thử gần nhất</p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="date"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
            />
            <YAxis
              domain={[100, 495]}
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl shadow-2xl text-xs">
                      <p className="font-bold text-slate-200">{d.title}</p>
                      <p className="text-slate-400 text-[11px] mb-1">Ngày {d.date}</p>
                      <p className="font-extrabold text-indigo-400 text-sm">
                        Điểm: {d.score} / 495
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ fill: '#818cf8', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, fill: '#ec4899' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
