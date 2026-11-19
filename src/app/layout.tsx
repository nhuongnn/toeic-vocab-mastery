import type { Metadata, Viewport } from 'next';
import React, { Suspense } from 'react';
import './globals.css';
import { Mail } from 'lucide-react';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProgressProvider } from '@/contexts/ProgressContext';
import { OnboardingProvider } from '@/contexts/OnboardingContext';
import { ChatProvider } from '@/contexts/ChatContext';
import { Navbar } from '@/components/shared/Navbar';
import { SelectionTranslator } from '@/components/shared/SelectionTranslator';
import { PwaProvider } from '@/components/pwa/PwaProvider';
import { OnboardingTour } from '@/components/onboarding/OnboardingTour';
import { ChatBotWidget } from '@/components/chat/ChatBotWidget';

export const metadata: Metadata = {
  title: 'TOEIC Deep Mastery • Immersive Native Vocabulary (700+ Score Target)',
  description:
    'Master high-yield TOEIC English vocabulary through etymology, spatial perception, native mindset, and spaced repetition without word-by-word Vietnamese translation.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'TOEIC Mastery',
  },
};

export const viewport: Viewport = {
  themeColor: '#020617',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full dark antialiased"
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white pb-16 md:pb-0">
        <AuthProvider>
          <ProgressProvider>
            <OnboardingProvider>
              <PwaProvider>
                <ChatProvider>
                  <Suspense fallback={<header className="h-16 w-full border-b border-slate-800/80 bg-slate-950/80" />}>
                    <Navbar />
                  </Suspense>
                  <SelectionTranslator />
                  <OnboardingTour />
                  <main className="flex-1">{children}</main>
                  <ChatBotWidget />
                  <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500">
                    <div className="max-w-7xl mx-auto px-4 space-y-3">
                      <p>
                        TOEIC Deep Learning Platform • Native Immersion Methodology • Designed for daily workplace fluency & 700+ score.
                      </p>
                      <div className="flex items-center justify-center gap-2 text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Email liên hệ:</span>
                        </span>
                        <a
                          href="mailto:nhuong2n@gmail.com"
                          className="text-indigo-400 hover:text-indigo-300 hover:underline font-medium transition-colors"
                        >
                          nhuong2n@gmail.com
                        </a>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Audio synthesized via Web Speech API & Dictionary API • Images powered by Unsplash
                      </p>
                    </div>
                  </footer>
                </ChatProvider>
              </PwaProvider>
            </OnboardingProvider>
          </ProgressProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
