'use client';
import {usePathname} from 'next/navigation';
import Link from 'next/link';

export default function LanguageSwitcher({locale}:{locale:'en'|'fa'}){
  const pathname = usePathname() || '/';
  const other = locale === 'fa' ? 'en' : 'fa';
  const parts = pathname.split('/');
  if (parts[1] === 'en' || parts[1] === 'fa') parts[1] = other; else parts.splice(1, 0, other);
  const href = parts.join('/') || '/';
  return <Link href={href} className="btn-ghost text-sm">{other.toUpperCase()}</Link>;
}
