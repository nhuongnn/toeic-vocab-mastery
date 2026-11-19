'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Layers, Sparkles, FileText, Trophy } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';

export function MobileBottomNav() {
  const pathname = usePathname();
  const { dueCount } = useProgress();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const safeDueCount = mounted ? dueCount : 0;

  // Hide on mock test taking screen to prevent distraction
  if (pathname.startsWith('/mock-test/') && !pathname.endsWith('/result')) {
    return null;
  }

  const items = [
    { href: '/', label: 'Trang chủ', icon: Home, exact: true },
    { href: '/categories', label: 'Từ vựng', icon: Layers },
    { href: '/mock-test', label: 'Thi thử', icon: FileText, highlight: true },
    {
      href: '/flashcards',
      label: 'Flashcard',
      icon: Sparkles,
      badge: safeDueCount > 0 ? safeDueCount : undefined,
    },
    { href: '/dashboard', label: 'Tiến độ', icon: Trophy },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-lg border-t border-slate-800/80 px-2 py-1.5 safe-area-pb">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-indigo-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110' : ''
                  }`}
                />
                {item.badge !== undefined && (
                  <span className="absolute -top-1 -right-2.5 bg-pink-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-4 text-center">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
                {item.highlight && !isActive && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
