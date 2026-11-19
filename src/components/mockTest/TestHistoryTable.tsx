'use client';

import React from 'react';
import Link from 'next/link';
import { MockTestResult } from '@/types/mockTest';
import { ArrowRight, Trophy, Clock, Calendar } from 'lucide-react';

interface TestHistoryTableProps {
  history: MockTestResult[];
}

export function TestHistoryTable({ history }: TestHistoryTableProps) {
  if (history.length === 0) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 text-center">
        <p className="text-slate-400 text-sm">Bạn chưa làm bài thi thử nào.</p>
        <p className="text-xs text-slate-500 mt-1">
          Hãy chọn một đề thi phía trên để bắt đầu kiểm tra trình độ ngay!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
      <div className="p-5 sm:p-6 border-b border-slate-800">
        <h3 className="text-base font-bold text-slate-100">Lịch Sử Thi Thử</h3>
        <p className="text-xs text-slate-400 mt-0.5">Các bài thi đã hoàn thành và lưu trữ</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
            <tr>
              <th className="py-3.5 px-4 sm:px-6">Ngày thi</th>
              <th className="py-3.5 px-4">Loại đề thi</th>
              <th className="py-3.5 px-4 text-center">Điểm TOEIC</th>
              <th className="py-3.5 px-4 text-center">Độ chính xác</th>
              <th className="py-3.5 px-4 text-center">Thời gian</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Chi tiết</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-slate-200 font-medium">
            {history.map((item) => {
              const minutes = Math.floor(item.timeTaken / 60);
              const dateStr = new Date(item.completedAt).toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              });

              return (
                <tr key={item.sessionId} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      {dateStr}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="font-semibold text-slate-100 block">{item.title}</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wide">
                      {item.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center whitespace-nowrap">
                    <span className="text-base font-extrabold text-indigo-400 font-mono">
                      {item.totalScore}
                    </span>
                    <span className="text-xs text-slate-500 font-normal"> / 495</span>
                  </td>
                  <td className="py-4 px-4 text-center whitespace-nowrap">
                    <span className="font-semibold text-emerald-400">{item.accuracy}%</span>
                    <span className="text-xs text-slate-500 block">
                      ({item.totalCorrect}/{item.totalQuestions})
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center whitespace-nowrap text-slate-400 text-xs">
                    {minutes} phút
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                    <Link
                      href={`/mock-test/${item.testId}/result?sessionId=${item.sessionId}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <span>Xem lại</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
