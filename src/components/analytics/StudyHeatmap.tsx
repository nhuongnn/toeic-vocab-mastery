'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Flame, Trophy, Activity, Info } from 'lucide-react';
import { SRSCard, ExerciseSessionResult } from '@/types/progress';

interface StudyHeatmapProps {
  cards: Record<string, SRSCard>;
  history: ExerciseSessionResult[];
  currentStreak: number;
  longestStreak: number;
}

interface DayData {
  dateStr: string; // YYYY-MM-DD
  dayOfWeek: number; // 0 = Mon, 6 = Sun
  reviews: number;
  exercises: number;
  total: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export function StudyHeatmap({
  cards,
  history,
  currentStreak,
  longestStreak,
}: StudyHeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<DayData | null>(null);
  const [heatmapData, setHeatmapData] = useState<{
    weeks: DayData[][];
    activeDaysCount: number;
    totalActivities: number;
  }>({
    weeks: [],
    activeDaysCount: 0,
    totalActivities: 0,
  });

  useEffect(() => {
    const activityMap: Record<string, { reviews: number; exercises: number }> = {};

    // 1. Count card reviews
    Object.values(cards).forEach((card) => {
      if (card.history && card.history.length > 0) {
        card.history.forEach((h) => {
          const datePart = h.date.split('T')[0];
          if (!activityMap[datePart]) {
            activityMap[datePart] = { reviews: 0, exercises: 0 };
          }
          activityMap[datePart].reviews += 1;
        });
      } else if (card.lastReview) {
        const datePart = card.lastReview.split('T')[0];
        if (!activityMap[datePart]) {
          activityMap[datePart] = { reviews: 0, exercises: 0 };
        }
        activityMap[datePart].reviews += 1;
      }
    });

    // 2. Count exercise sessions
    history.forEach((session) => {
      const datePart = session.date.split('T')[0];
      if (!activityMap[datePart]) {
        activityMap[datePart] = { reviews: 0, exercises: 0 };
      }
      activityMap[datePart].exercises += 1;
    });

    // Generate past 26 weeks (starting on Monday)
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const totalDays = 26 * 7;
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - totalDays + 1);

    const dayOfWeek = startDate.getDay();
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startDate.setDate(startDate.getDate() + diffToMonday);

    const generatedWeeks: DayData[][] = [];
    let currentWeek: DayData[] = [];
    let activeDays = 0;
    let activities = 0;

    const cursor = new Date(startDate);
    while (cursor <= today || currentWeek.length > 0) {
      const dateStr = cursor.toISOString().split('T')[0];
      const stats = activityMap[dateStr] || { reviews: 0, exercises: 0 };
      const total = stats.reviews + stats.exercises;

      let level: 0 | 1 | 2 | 3 | 4 = 0;
      if (total >= 15) level = 4;
      else if (total >= 8) level = 3;
      else if (total >= 4) level = 2;
      else if (total >= 1) level = 1;

      if (total > 0 && cursor <= today) {
        activeDays++;
        activities += total;
      }

      const dOfWeek = (cursor.getDay() + 6) % 7;

      currentWeek.push({
        dateStr,
        dayOfWeek: dOfWeek,
        reviews: stats.reviews,
        exercises: stats.exercises,
        total: cursor <= today ? total : 0,
        level: cursor <= today ? level : 0,
      });

      if (currentWeek.length === 7) {
        generatedWeeks.push(currentWeek);
        currentWeek = [];
        if (cursor > today) break;
      }

      cursor.setDate(cursor.getDate() + 1);
    }

    setHeatmapData({
      weeks: generatedWeeks,
      activeDaysCount: activeDays,
      totalActivities: activities,
    });
  }, [cards, history]);

  const { weeks, activeDaysCount, totalActivities } = heatmapData;

  const levelColorClass = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-indigo-500/30 hover:bg-indigo-500/50 border-indigo-500/30';
      case 2:
        return 'bg-indigo-500/60 hover:bg-indigo-500/80 border-indigo-400/50';
      case 3:
        return 'bg-indigo-500 hover:bg-indigo-400 border-indigo-400 shadow-sm shadow-indigo-500/30';
      case 4:
        return 'bg-emerald-400 hover:bg-emerald-300 border-emerald-300 shadow-md shadow-emerald-400/40';
      default:
        return 'bg-slate-950 hover:bg-slate-800/80 border-slate-800/60';
    }
  };

  const dayLabels = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
      {/* Title & Streak Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4" />
            <span>Heatmap Hoạt Động Luyện Tập (26 Tuần)</span>
          </div>
          <h3 className="text-lg font-black text-white">Lịch Học & Sự Bền Bỉ Hằng Ngày</h3>
        </div>

        {/* Quick Stats Pill */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
            <Flame className="w-4 h-4 fill-amber-400" />
            <span>Chuỗi: {currentStreak} ngày</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold">
            <Trophy className="w-4 h-4 text-indigo-400" />
            <span>Kỷ lục: {longestStreak} ngày</span>
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[650px] space-y-2">
          {/* Day of week rows + week columns */}
          <div className="flex gap-1.5">
            {/* Day Labels Column */}
            <div className="flex flex-col gap-1.5 pr-2 pt-0.5 select-none">
              {dayLabels.map((label, idx) => (
                <div
                  key={idx}
                  className="h-3.5 text-[9px] font-semibold text-slate-500 flex items-center justify-end"
                >
                  {idx % 2 === 0 ? label : ''}
                </div>
              ))}
            </div>

            {/* Weeks Columns */}
            <div className="flex gap-1.5 flex-1">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1.5">
                  {week.map((day, dIdx) => (
                    <div
                      key={`${wIdx}-${dIdx}`}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      className={`w-3.5 h-3.5 rounded-sm border transition-all cursor-pointer ${levelColorClass(
                        day.level
                      )}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Tooltip & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
        {/* Active hover info or general metric */}
        <div className="min-h-5 flex items-center gap-2">
          {hoveredDay ? (
            <div className="font-semibold text-slate-200 flex items-center gap-2">
              <span className="text-indigo-400">
                {new Date(hoveredDay.dateStr).toLocaleDateString('vi-VN', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric',
                })}:
              </span>
              <span>
                {hoveredDay.total === 0
                  ? 'Không có hoạt động'
                  : `${hoveredDay.total} hoạt động (${hoveredDay.reviews} thẻ ôn, ${hoveredDay.exercises} bài tập)`}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-4 text-[11px] text-slate-400">
              <span>Tổng số ngày học: <strong className="text-white font-bold">{activeDaysCount} ngày</strong></span>
              <span>•</span>
              <span>Tổng lượt tương tác: <strong className="text-white font-bold">{totalActivities} lượt</strong></span>
            </div>
          )}
        </div>

        {/* Heatmap Legend */}
        <div className="flex items-center gap-1.5 text-[11px] select-none self-end sm:self-auto">
          <span>Ít</span>
          <div className="w-3 h-3 rounded-sm border bg-slate-950 border-slate-800" />
          <div className="w-3 h-3 rounded-sm border bg-indigo-500/30 border-indigo-500/30" />
          <div className="w-3 h-3 rounded-sm border bg-indigo-500/60 border-indigo-400/50" />
          <div className="w-3 h-3 rounded-sm border bg-indigo-500 border-indigo-400" />
          <div className="w-3 h-3 rounded-sm border bg-emerald-400 border-emerald-300" />
          <span>Nhiều</span>
        </div>
      </div>
    </div>
  );
}
