'use client';

import React, { useState, useEffect } from 'react';
import { getMockTestHistory } from '@/lib/mockTest/storage';
import { MockTestResult } from '@/types/mockTest';
import { TestHistoryTable } from '@/components/mockTest/TestHistoryTable';
import { ScoreTrendChart } from '@/components/mockTest/ScoreTrendChart';
import { ArrowLeft, FileText, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function MockTestHistoryPage() {
  const [history, setHistory] = useState<MockTestResult[]>([]);

  useEffect(() => {
    setHistory(getMockTestHistory());
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <Link
          href="/mock-test"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại trung tâm thi thử</span>
        </Link>
      </div>

      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
          Lịch Sử Bài Thi Thử
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Theo dõi sự tiến bộ về điểm số và độ chính xác qua từng lần làm đề
        </p>
      </div>

      <ScoreTrendChart history={history} />

      <TestHistoryTable history={history} />
    </div>
  );
}
