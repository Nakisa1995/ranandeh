'use client';
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import {useI18n} from '@/lib/i18n';
import {useState} from 'react';

export default function Header(){
  const {t, locale} = useI18n();
  const [open, setOpen] = useState<string | null>(null);
  const items = [
    { key: 'tests', label: t('Nav.tests'), links: [
      {href:`/${locale}/tests`, label:'Mock Tests'},
      {href:`/${locale}/tests`, label:'Hazard Perception'},
      {href:`/${locale}/tests`, label:'Road Signs'},
      {href:`/${locale}/tests`, label:'Highway Code'},
    ]},
    { key: 'instructors', label: t('Nav.instructors'), links: [
      {href:`/${locale}/instructors`, label:t('Nav.instructors')},
    ]},
    { key: 'leaderboard', label: t('Nav.leaderboard'), links: [
      {href:`/${locale}/leaderboard`, label:t('Nav.leaderboard')},
    ]},
    { key: 'about', label: t('Nav.about'), links: [
      {href:`/${locale}/about`, label:t('Nav.about')},
      {href:`/${locale}/contact`, label:t('Nav.contact')}
    ]},
  ];
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b">
      <div className="container flex items-center gap-4 py-3">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Ranandeh" width={120} height={36}/>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {items.map(group => (
            <div key={group.key} className="relative"
              onMouseEnter={()=>setOpen(group.key)} onMouseLeave={()=>setOpen(s=>s===group.key?null:s)}>
              <button className="font-medium hover:text-brand">{group.label}</button>
              {open===group.key && (
                <div className="absolute left-0 mt-2 w-[560px] p-4 card grid grid-cols-2 gap-2">
                  {group.links.map(l => (
                    <Link key={l.label} href={l.href} className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher locale={locale} />
          <Link href={`/${locale}/auth/login`} className="btn-ghost hidden sm:inline-flex">{t('Nav.login')}</Link>
          <Link href={`/${locale}/auth/register`} className="btn-primary hidden sm:inline-flex">{t('Nav.register')}</Link>
        </div>
        <details className="md:hidden ml-auto">
          <summary className="px-3 py-2 border rounded-lg cursor-pointer">☰</summary>
          <div className="mt-2 card space-y-2">
            <Link href={`/${locale}`}>{t('Nav.home')}</Link>
            <Link href={`/${locale}/tests`}>{t('Nav.tests')}</Link>
            <Link href={`/${locale}/leaderboard`}>{t('Nav.leaderboard')}</Link>
            <Link href={`/${locale}/instructors`}>{t('Nav.instructors')}</Link>
            <Link href={`/${locale}/profile`}>{t('Nav.profile')}</Link>
            <Link href={`/${locale}/about`}>{t('Nav.about')}</Link>
            <Link href={`/${locale}/contact`}>{t('Nav.contact')}</Link>
          </div>
        </details>
      </div>
    </header>
  );
}
