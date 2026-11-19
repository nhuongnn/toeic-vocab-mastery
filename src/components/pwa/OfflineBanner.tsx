'use client';

import React from 'react';
import { useNetworkStatus } from '@/lib/pwa/offlineDetector';
import { WifiOff } from 'lucide-react';

export function OfflineBanner() {
  const { isOffline } = useNetworkStatus();

  if (!isOffline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-slate-950 font-medium text-xs sm:text-sm py-1.5 px-4 text-center shadow-md flex items-center justify-center gap-2 animate-in slide-in-from-top duration-300">
      <WifiOff className="w-4 h-4 shrink-0" />
      <span>Bạn đang ngoại tuyến. Dữ liệu học tập được lưu cục bộ trên thiết bị.</span>
    </div>
  );
}
