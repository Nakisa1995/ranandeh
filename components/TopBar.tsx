'use client';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import AuthButtons from './AuthButtons';

type Locale = 'en' | 'fa';

export default function TopBar({ locale }: { locale: Locale }) {
  return (
    <div
      className="sticky top-0 z-30 h-14 w-full border-b border-black/10
                 bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/40
                 dark:bg-zinc-900/60 dark:border-zinc-800 dark:supports-[backdrop-filter]:bg-zinc-900/40"
    >
      <div className="h-full container mx-auto px-4 flex items-center justify-end gap-2">
        {/* ترتیب: Theme | Lang | Auth */}
        <ThemeToggle />
        <LanguageSwitcher locale={locale} />
        <AuthButtons locale={locale} />
        {/* اگر onAnyClick هم خواستی:  <AuthButtons locale={locale} onAnyClick={() => {}} /> */}
      </div>
    </div>
  );
}
