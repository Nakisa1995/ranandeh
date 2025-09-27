'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LanguageSwitcher({ locale }: { locale: 'en' | 'fa' }) {
  const pathname = usePathname() || '/';
  const rest = pathname.replace(/^\/(en|fa)/, '');
  const other = locale === 'fa' ? 'en' : 'fa';
  const target = `/${other}${rest || ''}`;
  return (
    <Link
      href={target}
      className="h-9 px-3 rounded-md bg-black/5 hover:bg-black/10
                 dark:bg-white/10 dark:hover:bg-white/20 transition"
    >
      {other.toUpperCase()}
    </Link>
  );
}
