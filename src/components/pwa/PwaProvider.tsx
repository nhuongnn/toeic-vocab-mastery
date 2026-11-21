'use client';

import React, { useEffect, Suspense } from 'react';
import { registerServiceWorker } from '@/lib/pwa/serviceWorkerRegistration';
import { initClientNotificationScheduler } from '@/lib/notifications/notificationScheduler';
import { OfflineBanner } from './OfflineBanner';
import { InstallPrompt } from './InstallPrompt';
import { MobileBottomNav } from './MobileBottomNav';
import { NotificationPermission } from '@/components/notifications/NotificationPermission';

export function PwaProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerServiceWorker();
    const cleanupScheduler = initClientNotificationScheduler();
    return () => {
      cleanupScheduler();
    };
  }, []);

  return (
    <>
      <OfflineBanner />
      {children}
      <NotificationPermission />
      <InstallPrompt />
      <Suspense fallback={null}>
        <MobileBottomNav />
      </Suspense>
    </>
  );
}
