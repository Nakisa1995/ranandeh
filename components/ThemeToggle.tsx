'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={`inline-flex h-9 w-9 items-center justify-center transition-colors
        ${isDark ? 'text-white/90 hover:text-white' : 'text-zinc-700 hover:text-black'}`}
      style={{ background: 'transparent' }}
    >
      {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
    </button>
  );
}

/* --- آیکن‌های مینیمال --- */
function SunIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l-1.4-1.4M20.4 20.4L19 19M19 5l1.4-1.4M5 19l-1.4 1.4" />
    </svg>
  );
}

function MoonIcon({ className = '' }: { className?: string }) {
  // هلال ساده تا در لایت هم واضح دیده شود
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M21 13.2A9 9 0 1 1 10.8 3a7.2 7.2 0 1 0 10.2 10.2z" />
    </svg>
  );
}
