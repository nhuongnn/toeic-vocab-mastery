import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProgressProvider } from '@/contexts/ProgressContext';
import { Navbar } from '@/components/shared/Navbar';
import { SelectionTranslator } from '@/components/shared/SelectionTranslator';

export const metadata: Metadata = {
  title: 'TOEIC Deep Mastery • Immersive Native Vocabulary (700+ Score Target)',
  description:
    'Master high-yield TOEIC English vocabulary through etymology, spatial perception, native mindset, and spaced repetition without word-by-word Vietnamese translation.',
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
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
        <AuthProvider>
          <ProgressProvider>
            <Navbar />
            <SelectionTranslator />
            <main className="flex-1">{children}</main>
            <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500">
              <div className="max-w-7xl mx-auto px-4 space-y-2">
                <p>
                  TOEIC Deep Learning Platform • Native Immersion Methodology • Designed for daily workplace fluency & 700+ score.
                </p>
                <p className="text-[11px] text-slate-600">
                  Audio synthesized via Web Speech API & Dictionary API • Images powered by Unsplash
                </p>
              </div>
            </footer>
          </ProgressProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
