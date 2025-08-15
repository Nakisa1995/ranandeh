'use client';
import {useEffect, useState} from 'react';

function getInitial(): 'light'|'dark' {
  if (typeof window === 'undefined') return 'light'; // SSR
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function ThemeToggle(){
  const [theme, setTheme] = useState<'light'|'dark'>(getInitial);
  const [mounted, setMounted] = useState(false);

  // بعد از مونت شدن، اجازه بده محتوا تغییر کنه تا mismatch نشه
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  if (!mounted) {
    // Placeholder ثابت برای جلوگیری از mismatch هنگام Hydration
    return <button className="btn-ghost" aria-label="Toggle theme">◐</button>;
  }

  return (
    <button
      onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
      className="btn-ghost"
      aria-label={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
    >
      <span suppressHydrationWarning>{theme === 'dark' ? '☀️' : '🌙'}</span>
    </button>
  );
}
