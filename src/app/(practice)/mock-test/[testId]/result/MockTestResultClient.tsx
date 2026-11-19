'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MockTestResult, FlattenedQuestion } from '@/types/mockTest';
import { getMockTestResultById, getMockTestHistory } from '@/lib/mockTest/storage';
import { loadMockTestData, assembleTestQuestions } from '@/lib/mockTest/questionSelector';
import { ResultSummary } from '@/components/mockTest/ResultSummary';
import { ResultDetail } from '@/components/mockTest/ResultDetail';
import { SkillRadarChart } from '@/components/mockTest/SkillRadarChart';
import { analyzeWeakAreas, compareWithHistory, generateRecommendations } from '@/lib/mockTest/analytics';
import { AlertTriangle, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function MockTestResultClient({ testId }: { testId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId') || '';

  const [result, setResult] = useState<MockTestResult | null>(null);
  const [questions, setQuestions] = useState<FlattenedQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [scoreDiff, setScoreDiff] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      const res = getMockTestResultById(sessionId);
      if (res) {
        setResult(res);

        // Compare with previous results
        const history = getMockTestHistory();
        const comp = compareWithHistory(res, history);
        setScoreDiff(comp.scoreDiff);

        // Map wrong answers into answers record for ResultDetail
        const ansRecord: Record<string, number | null> = {};
        for (const wa of res.wrongAnswers) {
          ansRecord[wa.questionId] = wa.yourAnswer;
        }

        // Load questions to display full review
        try {
          const { config, part5Pool, part6Pool, part7Pool } = await loadMockTestData(testId);
          const assembled = assembleTestQuestions(config, part5Pool, part6Pool, part7Pool);

          // For questions that were answered correctly, match correct answers
          for (const q of assembled) {
            if (ansRecord[q.id] === undefined) {
              ansRecord[q.id] = q.correctAnswer;
            }
          }
          setQuestions(assembled);
          setAnswers(ansRecord);
        } catch (e) {
          console.warn('Could not load detailed question list:', e);
        }
      }
      setLoading(false);
    }

    loadData();
  }, [sessionId, testId]);

  if (loading) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4">
        <h3 className="text-xl font-bold text-slate-200 mb-2">Không tìm thấy kết quả</h3>
        <p className="text-slate-400 text-sm mb-6">
          Phiên thi không tồn tại hoặc đã hết hạn lưu trữ trên thiết bị.
        </p>
        <button
          onClick={() => router.push('/mock-test')}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium"
        >
          Quay lại danh sách đề thi
        </button>
      </div>
    );
  }

  const weakAreas = analyzeWeakAreas(result);
  const recommendations = generateRecommendations(result);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* 1. Score Summary */}
      <ResultSummary
        result={result}
        scoreDiff={scoreDiff}
        onRetake={() => router.push(`/mock-test/${testId}`)}
      />

      {/* 2. Weak Areas Analysis & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weak Areas Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">Điểm Cần Cải Thiện</h3>
              <p className="text-xs text-slate-400">Các phần và kỹ năng có độ chính xác dưới 65%</p>
            </div>
          </div>

          {weakAreas.length === 0 ? (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
              🎉 Xuất sắc! Tất cả các phần thi của bạn đều đạt độ chính xác trên 65%. Hãy duy trì phong độ này!
            </div>
          ) : (
            <div className="space-y-3">
              {weakAreas.map((w, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-200">{w.name}</span>
                      <span className="text-[11px] font-mono px-2 py-0.2 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
                        {w.accuracy}%
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-snug">{w.message}</p>
                  </div>
                  <Link
                    href={w.actionHref}
                    className="shrink-0 flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 transition-colors"
                  >
                    <span>{w.actionText}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Study Recommendations Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">Khuyến Nghị Học Tập</h3>
              <p className="text-xs text-slate-400">Được tối ưu theo kết quả bài thi vừa hoàn thành</p>
            </div>
          </div>

          <div className="space-y-3">
            {recommendations.map((rec) => (
              <Link
                key={rec.id}
                href={rec.href}
                className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-800/80 transition-all flex items-start justify-between gap-3 group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {rec.tag}
                    </span>
                    <h4 className="text-sm font-bold text-slate-200 group-hover:text-indigo-300 transition-colors">
                      {rec.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {rec.description}
                  </p>
                </div>
                <div className="pt-1 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Skill Breakdown Chart */}
      <SkillRadarChart skills={result.skillBreakdown} />

      {/* 4. Detailed Question Review */}
      {questions.length > 0 && (
        <ResultDetail
          questions={questions}
          answers={answers}
          wrongAnswers={result.wrongAnswers}
        />
      )}
    </div>
  );
}
