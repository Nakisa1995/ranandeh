'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Locale = 'en' | 'fa';

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || '/';
  const rest = pathname.replace(/^\/(en|fa)/, '');
  const other: Locale = locale === 'fa' ? 'en' : 'fa';
  const target = `/${other}${rest || ''}`;

  return (
    <Link
      href={target}
      prefetch
      className="nav-pill h-9 px-3 flex items-center justify-center text-sm font-medium focus-ring transition"
      aria-label={locale === 'fa' ? 'تغییر زبان به انگلیسی' : 'Switch language to Persian'}
      title="EN/FA"
    >
      {other.toUpperCase()}
    </Link>
  );
}
