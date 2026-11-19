'use client';

import React from 'react';
import Link from 'next/link';
import { WifiOff, RefreshCw, Home, Layers } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-8 text-center shadow-2xl backdrop-blur-md">
        <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5 text-red-400">
          <WifiOff className="w-8 h-8" />
        </div>
        
        <h1 className="text-2xl font-bold text-slate-100 mb-2">Bạn đang ngoại tuyến</h1>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          Không thể kết nối tới máy chủ. Thẻ từ vựng và tiến độ học offline của bạn vẫn được lưu trữ an toàn trên thiết bị.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/20"
          >
            <RefreshCw className="w-4 h-4" />
            Thử tải lại
          </button>
          
          <Link
            href="/flashcards"
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm border border-slate-700 transition-all"
          >
            <Layers className="w-4 h-4" />
            Ôn Flashcard
          </Link>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-400 transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
