// components/AuthButtons.tsx
'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

type Locale = 'en' | 'fa';

const T = {
  login:   { en: 'Login',   fa: 'ورود' },
  register:{ en: 'Register',fa: 'ثبت‌نام' },
  profile: { en: 'Profile', fa: 'پروفایل' },
  logout:  { en: 'Logout',  fa: 'خروج' },
};

function GradientButton({
  href, children, onClick,
}: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group relative inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold text-white
                 ring-1 ring-white/10 backdrop-blur-md overflow-hidden"
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
      className="nav-pill rounded-xl px-3 py-2 text-sm text-foreground/90 hover:text-white"
    >
      {children}
    </button>
  );
}

export default function AuthButtons({
  locale,
  onAnyClick,
}: { locale: Locale; onAnyClick?: () => void }) {
  const { data: session, status } = useSession();

  // اسکلِتون کوتاه وقتی سشن در حال لود است
  if (status === 'loading') {
    return (
      <div className="flex items-center gap-2">
        <div className="h-8 w-20 rounded-xl bg-white/10 animate-pulse" />
        <div className="h-8 w-20 rounded-xl bg-white/10 animate-pulse" />
      </div>
    );
  }

  // لاگین‌نشده → دکمه‌های Login/Register گرادیانی
  if (!session?.user) {
    return (
      <>
        <GradientButton href={`/${locale}/auth/login`}    onClick={onAnyClick}>{T.login[locale]}</GradientButton>
        <GradientButton href={`/${locale}/auth/register`} onClick={onAnyClick}>{T.register[locale]}</GradientButton>
      </>
    );
  }

  // لاگین‌شده → «Profile» گرادیانی + «Logout» شیشه‌ای (بدون نمایش نام)
  return (
    <>
      <GradientButton href={`/${locale}/profile`} onClick={onAnyClick}>
        {T.profile[locale]}
      </GradientButton>

      <GlassButton
        ariaLabel={T.logout[locale]}
        onClick={() => { onAnyClick?.(); signOut({ callbackUrl: `/${locale}` }); }}
      >
        {T.logout[locale]}
      </GlassButton>
    </>
  );
}
