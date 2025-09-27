'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Locale = 'en' | 'fa';

export default function HomeSearch({
  locale,
  placeholder,
  searchLabel,
  mockLabel,
  dir,
}: {
  locale: Locale;
  placeholder: string;
  searchLabel: string;
  mockLabel: string;
  dir: 'rtl' | 'ltr';
}) {
  const router = useRouter();
  const [q, setQ] = useState('');

  const go = () => {
    const s = q.trim();
    router.push(
      s ? `/${locale}/instructors?q=${encodeURIComponent(s)}` : `/${locale}/instructors`
    );
  };

  const startMock = () => {
    router.push(`/${locale}/tests`);
  };

  return (
    <div dir={dir} className="mt-6 flex items-stretch gap-3 max-w-4xl">
      <input
        className="flex-1 rounded-xl border border-white/10 bg-white/5 dark:bg-black/20
                   px-4 py-3 outline-none placeholder:text-foreground/40"
        placeholder={placeholder}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && go()}
      />
      <button
        onClick={go}
        className="rounded-xl px-4 py-3 bg-brand-500 text-white hover:bg-brand-600 focus:ring-2 ring-white/20"
      >
        {searchLabel}
      </button>
      <button
        onClick={startMock}
        className="rounded-xl px-4 py-3 bg-white/10 hover:bg-white/20"
      >
        {mockLabel}
      </button>
    </div>
  );
}
