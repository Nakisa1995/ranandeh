'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

type Props = { locale: 'en' | 'fa' };

// --- آیکن‌های ساده (SVG داخلی؛ نیاز به پکیج ندارد) ---
function IconMenu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}
function IconHome(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-10.5z" />
    </svg>
  );
}
function IconClipboard(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 4h6a2 2 0 0 1 2 2v0h2a1 1 0 0 1 1 1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1h2v0a2 2 0 0 1 2-2z" />
    </svg>
  );
}
function IconUsers(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0M21 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconTrophy(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 21h8M12 17a6 6 0 0 0 6-6V5H6v6a6 6 0 0 0 6 6zM18 5h2a2 2 0 0 1 2 2v1a4 4 0 0 1-4 4M6 5H4a2 2 0 0 0-2 2v1a4 4 0 0 0 4 4" />
    </svg>
  );
}
function IconInfo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      <path strokeWidth="2" strokeLinecap="round" d="M12 8h.01M11 12h2v6h-2z" />
    </svg>
  );
}

export default function Sidebar({ locale }: Props) {
  const pathname = usePathname();

  // وضعیت باز/بسته (در localStorage ذخیره می‌شود)
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    const v = localStorage.getItem('sidebar-collapsed');
    if (v === '1') setCollapsed(true);
  }, []);
  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', collapsed ? '1' : '0');
  }, [collapsed]);

  const base = `/${locale}`;
  const nav = useMemo(
    () => [
      { href: `${base}`, label: locale === 'fa' ? 'خانه' : 'Home', icon: IconHome },
      { href: `${base}/tests`, label: locale === 'fa' ? 'آزمون‌ها' : 'Tests', icon: IconClipboard },
      { href: `${base}/instructors`, label: locale === 'fa' ? 'مربیان' : 'Instructors', icon: IconUsers },
      { href: `${base}/leaderboard`, label: locale === 'fa' ? 'جدول امتیاز' : 'Leaderboard', icon: IconTrophy },
      { href: `${base}/about`, label: locale === 'fa' ? 'درباره' : 'About', icon: IconInfo },
    ],
    [base, locale]
  );

  const Side = (
    <aside
      className={[
        'h-full bg-zinc-900/80 text-zinc-100 backdrop-blur-md border-r border-zinc-800',
        'transition-[width] duration-300 ease-in-out',
        collapsed ? 'w-20' : 'w-64',
        'md:static md:translate-x-0 fixed top-0 left-0 z-40 md:z-auto',
        mobileOpen ? 'translate-x-0' : 'translate-x-[-100%] md:translate-x-0',
      ].join(' ')}
      aria-label="Sidebar"
    >
      {/* سرآیند */}
      <div className="flex items-center justify-between gap-2 px-3 h-14">
        <button
          onClick={() => (window.innerWidth < 768 ? setMobileOpen(false) : setCollapsed((v) => !v))}
          className="p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Toggle sidebar"
        >
          <IconMenu className="size-5" />
        </button>

        {!collapsed && (
          <span className="text-sm font-semibold truncate pe-2">
            Ranandeh
          </span>
        )}
      </div>

      {/* آیتم‌ها */}
      <nav className="mt-2 px-2">
        <ul className="space-y-1">
          {nav.map((item) => {
            const active =
              pathname === item.href ||
              (pathname?.startsWith(item.href) && item.href !== `/${locale}`);

            return (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={[
                    'flex items-center rounded-md px-2 py-2 text-sm',
                    active ? 'bg-white/10 text-white' : 'text-zinc-300 hover:bg-white/5 hover:text-white',
                  ].join(' ')}
                >
                  <item.icon className="size-5 shrink-0" />
                  {/* برچسب: در حالت فشرده مخفی می‌شود */}
                  <span className={['ms-3 transition-opacity', collapsed ? 'opacity-0 pointer-events-none select-none w-0 overflow-hidden' : 'opacity-100'].join(' ')}>
                    {item.label}
                  </span>

                  {/* تول‌تیپ وقتی فشرده است */}
                  {collapsed && (
                    <span
                      className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ms-2
                                 rounded bg-black/80 px-2 py-1 text-xs text-white opacity-0 shadow
                                 transition-opacity group-hover:opacity-100"
                    >
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );

  return (
    <>
      {/* فقط موبایل: دکمه باز کردن */}
      <button
        type="button"
        className="md:hidden fixed top-3 left-3 z-50 p-2 rounded-md bg-black/60 text-white backdrop-blur
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Open sidebar"
        onClick={() => setMobileOpen(true)}
      >
        <IconMenu className="size-5" />
      </button>

      {/* اورلی موبایل */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="md:hidden fixed inset-0 z-30 bg-black/40"
        />
      )}

      {Side}
    </>
  );
}
