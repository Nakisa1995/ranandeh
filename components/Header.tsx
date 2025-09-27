'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';
import Logo from '@/components/Logo';
import { useSession, signOut } from 'next-auth/react';

type Locale = 'en' | 'fa';

/* ---------- i18n ---------- */
const t = {
  nav: {
    tests:       { en: 'Tests',       fa: 'تمرین‌ها' },
    instructors: { en: 'Instructors', fa: 'مربیان' },
    leaderboard: { en: 'Leaderboard', fa: 'جدول رتبه‌بندی' },
    about:       { en: 'About',       fa: 'درباره' },
  },
  auth: {
    login:    { en: 'Login',    fa: 'ورود' },
    register: { en: 'Register', fa: 'ثبت‌نام' },
    profile:  { en: 'Profile',  fa: 'پروفایل' },
    logout:   { en: 'Logout',   fa: 'خروج' },
  },
};

/* ---------- locale helpers ---------- */
function useLocalePaths() {
  const pathname = usePathname() || '/en';
  const parts = pathname.split('/');
  const current = (parts[1] as Locale) || 'en';
  const to = (next: Locale) => {
    const p = [...parts];
    p[1] = next;
    const out = p.join('/') || `/${next}`;
    return out.startsWith('/') ? out : `/${out}`;
  };
  return { current: current as Locale, to };
}

/* ---------- flags ---------- */
function FlagIR(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 3 2" width="20" height="14" {...props}>
      <rect width="3" height="2" fill="#fff" />
      <rect width="3" height="0.66" y="0" fill="#239f40" />
      <rect width="3" height="0.66" y="1.34" fill="#da0000" />
    </svg>
  );
}
function FlagUK(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 60 30" width="20" height="14" {...props}>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 60,30 M60,0 0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 60,30 M60,0 0,30" stroke="#C8102E" strokeWidth="3" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

/* ---------- nav link (active state + a11y) ---------- */
function NavLink({
  href, children, locale, onClick,
}: { href: string; children: React.ReactNode; locale: Locale; onClick?: () => void }) {
  const pathname = usePathname();
  const full = `/${locale}${href}`;
  const active = pathname === full || pathname?.startsWith(full + '/');

  return (
    <Link
      href={full}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`nav-link relative px-3 py-2 rounded-xl transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40
                  ${active ? 'text-white' : 'text-foreground/80 hover:text-white'}`}
    >
      <span
        className={`pointer-events-none absolute inset-0 rounded-xl -z-10
                    ${active ? 'opacity-100' : 'opacity-0'}
                    transition-opacity duration-200
                    bg-black/5 dark:bg-white/5 backdrop-blur-sm`}
      />
      {children}
    </Link>
  );
}

/* ---------- buttons (گرادیانی + شیشه‌ای) ---------- */
function GradientLink({
  href, children, onClick,
}: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group relative inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold text-white
                 ring-1 ring-white/10 backdrop-blur-md overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
    >
      <span className="pointer-events-none absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity
                       bg-[radial-gradient(80%_120%_at_20%_0%,#4f46e5,transparent_40%),radial-gradient(80%_120%_at_80%_100%,#06b6d4,transparent_40%),linear-gradient(90deg,#7c3aed_0%,#2563eb_100%)]" />
      <span className="relative">{children}</span>
    </Link>
  );
}
function GlassButton({
  children, onClick, ariaLabel,
}: { children: React.ReactNode; onClick?: () => void; ariaLabel?: string }) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className="nav-pill rounded-xl px-3 py-2 text-sm text-foreground/90 hover:text-white
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
    >
      {children}
    </button>
  );
}

/* ---------- flag toggle ---------- */
function FlagToggle({ onPick }: { onPick?: () => void }) {
  const { current, to } = useLocalePaths();
  return (
    <div className="nav-pill rounded-xl px-1 py-1 flex items-center gap-1">
      <Link
        href={to('fa')}
        onClick={onPick}
        title="فارسی"
        className={`rounded-lg p-1 ring-1 ring-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40
                    ${current === 'fa' ? 'bg-white/15' : 'hover:bg-white/10'}`}
        aria-label="فارسی"
      >
        <FlagIR />
      </Link>
      <Link
        href={to('en')}
        onClick={onPick}
        title="English"
        className={`rounded-lg p-1 ring-1 ring-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40
                    ${current === 'en' ? 'bg-white/15' : 'hover:bg-white/10'}`}
        aria-label="English"
      >
        <FlagUK />
      </Link>
    </div>
  );
}

/* ---------- auth section (به سشن وصل است) ---------- */
function AuthSection({ locale, onAnyClick }:{ locale: Locale; onAnyClick?: () => void }) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="h-8 w-28 animate-pulse rounded-xl bg-white/10" />;
  }

  if (!session?.user) {
    return (
      <>
        <GradientLink href={`/${locale}/auth/login`}    onClick={onAnyClick}>{t.auth.login[locale]}</GradientLink>
        <GradientLink href={`/${locale}/auth/register`} onClick={onAnyClick}>{t.auth.register[locale]}</GradientLink>
      </>
    );
  }

  // ✅ لاگین‌شده: «Profile» گرادیانی + «Logout» شیشه‌ای
  return (
    <>
      <GradientLink href={`/${locale}/profile`} onClick={onAnyClick}>
        {t.auth.profile[locale]}
      </GradientLink>
      <GlassButton
        ariaLabel={t.auth.logout[locale]}
        onClick={() => { onAnyClick?.(); signOut({ callbackUrl: `/${locale}` }); }}
      >
        {t.auth.logout[locale]}
      </GlassButton>
    </>
  );
}

/* ---------- burger ---------- */
function Burger({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
      {open
        ? <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        : <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />}
    </svg>
  );
}

/* ---------- Header ---------- */
export default function Header({ locale }: { locale: Locale }) {
  const dir = locale === 'fa' ? 'rtl' : 'ltr';
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // بستن منو روی ناوبری یا کلید Esc
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className="sticky top-3 z-40">
      <div dir={dir} className="mx-auto max-w-6xl px-3">
        <nav className="glass-nav rounded-2xl px-3 sm:px-4">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* لوگو */}
            <Link href={`/${locale}`} className="nav-pill rounded-xl p-2" aria-label="Home">
              <Logo size={22} withText />
            </Link>

            {/* لینک‌های دسکتاپ */}
            <div className="ml-1 flex-1">
              <div className="hidden md:flex items-center gap-1">
                <NavLink locale={locale} href="/tests">{t.nav.tests[locale]}</NavLink>
                <NavLink locale={locale} href="/instructors">{t.nav.instructors[locale]}</NavLink>
                <NavLink locale={locale} href="/leaderboard">{t.nav.leaderboard[locale]}</NavLink>
                <NavLink locale={locale} href="/about">{t.nav.about[locale]}</NavLink>
              </div>
            </div>

            {/* راست هدر (دسکتاپ) */}
            <div className="hidden md:flex items-center gap-2">
              <span className="rounded-xl"><ThemeToggle /></span>
              <FlagToggle />
              <AuthSection locale={locale} />
            </div>

            {/* دکمه منوی موبایل */}
            <button
              type="button"
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen(s => !s)}
              className="md:hidden nav-pill rounded-xl p-2 text-foreground/90 hover:text-white"
            >
              <Burger open={open} />
            </button>
          </div>

          {/* منوی موبایل */}
          {open && (
            <div
              className="md:hidden mt-2 rounded-2xl p-3 ring-1 ring-white/10
                         bg-white/50 dark:bg-black/30 backdrop-blur-xl
                         shadow-[0_18px_50px_rgba(0,0,0,.35)]"
            >
              <div className="flex flex-col gap-1">
                <NavLink onClick={() => setOpen(false)} locale={locale} href="/tests">{t.nav.tests[locale]}</NavLink>
                <NavLink onClick={() => setOpen(false)} locale={locale} href="/instructors">{t.nav.instructors[locale]}</NavLink>
                <NavLink onClick={() => setOpen(false)} locale={locale} href="/leaderboard">{t.nav.leaderboard[locale]}</NavLink>
                <NavLink onClick={() => setOpen(false)} locale={locale} href="/about">{t.nav.about[locale]}</NavLink>

                <div className="my-2 h-px bg-white/10" />

                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-xl"><ThemeToggle /></span>
                  <FlagToggle onPick={() => setOpen(false)} />
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <AuthSection locale={locale} onAnyClick={() => setOpen(false)} />
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
