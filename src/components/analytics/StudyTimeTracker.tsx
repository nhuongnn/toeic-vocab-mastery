'use client';

import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
} from 'recharts';
import { Clock, Timer, CheckCircle, Target, Award } from 'lucide-react';
import { SRSCard, ExerciseSessionResult } from '@/types/progress';

interface StudyTimeTrackerProps {
  cards: Record<string, SRSCard>;
  history: ExerciseSessionResult[];
  dailyGoal: number;
}

export function StudyTimeTracker({
  cards,
  history,
  dailyGoal,
}: StudyTimeTrackerProps) {
  const [trackerData, setTrackerData] = useState<{
    totalMinutes: number;
    todayMinutes: number;
    thisWeekMinutes: number;
    weekDaysData: { day: string; minutes: number }[];
    avgDailyMinutes: number;
  }>({
    totalMinutes: 0,
    todayMinutes: 0,
    thisWeekMinutes: 0,
    weekDaysData: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d) => ({ day: d, minutes: 0 })),
    avgDailyMinutes: 0,
  });

  useEffect(() => {
    let totalSeconds = 0;
    const todayStr = new Date().toISOString().split('T')[0];
    const now = new Date();

    // Start of current week (Monday)
    const day = now.getDay();
    const diffToMon = day === 0 ? -6 : 1 - day;
    const monday = new Date(now);
    monday.setDate(now.getDate() + diffToMon);
    monday.setHours(0, 0, 0, 0);

    const dayMinutesMap: Record<number, number> = {
      0: 0, // Mon
      1: 0, // Tue
      2: 0, // Wed
      3: 0, // Thu
      4: 0, // Fri
      5: 0, // Sat
      6: 0, // Sun
    };

    let todaySec = 0;
    let weekSec = 0;
    const activeDaysSet = new Set<string>();

    // 1. Calculate from card reviews (approx 20s per review)
    Object.values(cards).forEach((card) => {
      if (card.history && card.history.length > 0) {
        card.history.forEach((h) => {
          totalSeconds += 20;
          const d = new Date(h.date);
          const dStr = h.date.split('T')[0];
          activeDaysSet.add(dStr);

          if (dStr === todayStr) todaySec += 20;
          if (d >= monday) {
            weekSec += 20;
            const dow = (d.getDay() + 6) % 7; // 0=Mon..6=Sun
            dayMinutesMap[dow] = (dayMinutesMap[dow] || 0) + 20 / 60;
          }
        });
      } else if (card.lastReview) {
        totalSeconds += 20;
        const d = new Date(card.lastReview);
        const dStr = card.lastReview.split('T')[0];
        activeDaysSet.add(dStr);

        if (dStr === todayStr) todaySec += 20;
        if (d >= monday) {
          weekSec += 20;
          const dow = (d.getDay() + 6) % 7;
          dayMinutesMap[dow] = (dayMinutesMap[dow] || 0) + 20 / 60;
        }
      }
    });

    // 2. Calculate from exercise sessions (approx 35s per question)
    history.forEach((sess) => {
      const duration = sess.totalQuestions * 35;
      totalSeconds += duration;
      const d = new Date(sess.date);
      const dStr = sess.date.split('T')[0];
      activeDaysSet.add(dStr);

      if (dStr === todayStr) todaySec += duration;
      if (d >= monday) {
        weekSec += duration;
        const dow = (d.getDay() + 6) % 7;
        dayMinutesMap[dow] = (dayMinutesMap[dow] || 0) + duration / 60;
      }
    });

    const dayNames = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    const weekDays = dayNames.map((name, idx) => ({
      day: name,
      minutes: Math.round(dayMinutesMap[idx] || 0),
    }));

    const activeDays = Math.max(1, activeDaysSet.size);
    const totalMin = Math.round(totalSeconds / 60);

    setTrackerData({
      totalMinutes: totalMin,
      todayMinutes: Math.round(todaySec / 60),
      thisWeekMinutes: Math.round(weekSec / 60),
      weekDaysData: weekDays,
      avgDailyMinutes: Math.round(totalMin / activeDays),
    });
  }, [cards, history]);

  const { totalMinutes, todayMinutes, thisWeekMinutes, weekDaysData, avgDailyMinutes } = trackerData;

  const targetMinutes = Math.max(15, Math.round(dailyGoal * 1.5)); // approx 1.5 min per word goal

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Clock className="w-4 h-4" />
            <span>Theo Dõi Thời Gian & Tần Suất Học</span>
          </div>
          <h3 className="text-lg font-black text-white">Thời Gian Rèn Luyện Thực Tế</h3>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
          <Target className="w-4 h-4 text-indigo-400" />
          <span>
            Mục tiêu: <strong className="text-white">{targetMinutes} phút/ngày</strong>
          </span>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1">
          <span className="text-[11px] text-slate-400 font-medium block">Hôm Nay</span>
          <div className="text-2xl font-black text-white flex items-baseline gap-1">
            <span>{todayMinutes}</span>
            <span className="text-xs text-slate-400 font-normal">phút</span>
          </div>
          <span className="text-[10px] text-indigo-400">
            {todayMinutes >= targetMinutes ? '✓ Đạt mục tiêu ngày' : `Còn ${Math.max(0, targetMinutes - todayMinutes)} phút nữa`}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1">
          <span className="text-[11px] text-slate-400 font-medium block">Tuần Này</span>
          <div className="text-2xl font-black text-emerald-400 flex items-baseline gap-1">
            <span>{thisWeekMinutes}</span>
            <span className="text-xs text-slate-400 font-normal">phút</span>
          </div>
          <span className="text-[10px] text-slate-500">
            ~{(thisWeekMinutes / 60).toFixed(1)} giờ tích lũy
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1">
          <span className="text-[11px] text-slate-400 font-medium block">Tổng Thời Gian Học</span>
          <div className="text-2xl font-black text-indigo-400 flex items-baseline gap-1">
            <span>{(totalMinutes / 60).toFixed(1)}</span>
            <span className="text-xs text-slate-400 font-normal">giờ</span>
          </div>
          <span className="text-[10px] text-slate-500">
            Trung bình: {avgDailyMinutes} phút/ngày hoạt động
          </span>
        </div>
      </div>

      {/* Bar Chart of This Week's Study Distribution */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-300 block">
          Phân bổ thời gian tuần này (Thứ 2 - Chủ Nhật)
        </span>
        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weekDaysData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis
                dataKey="day"
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
                unit="m"
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    return (
                      <div className="bg-slate-950 border border-slate-800 p-2.5 rounded-xl shadow-xl text-xs">
                        <p className="font-bold text-slate-200">Thứ {d.day}</p>
                        <p className="text-indigo-400 font-extrabold mt-0.5">
                          {d.minutes} phút học tập
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="minutes" radius={[6, 6, 0, 0]}>
                {weekDaysData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.minutes >= targetMinutes ? '#10b981' : entry.minutes > 0 ? '#6366f1' : '#334155'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
