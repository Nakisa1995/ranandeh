'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginForm({ locale }: { locale: 'en' | 'fa' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const router = useRouter();
  const sp = useSearchParams();
  const callbackUrl = sp.get('callbackUrl') || `/${locale}`;

  const t = {
    email: { en: 'Email', fa: 'ایمیل' },
    pass: { en: 'Password', fa: 'رمز عبور' },
    cta: { en: 'Log in', fa: 'ورود' },
    signing: { en: 'Signing in…', fa: 'در حال ورود…' },
    invalid: { en: 'Invalid credentials', fa: 'ایمیل یا رمز اشتباه است' },
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const resp = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (resp?.ok) {
        router.push(callbackUrl);
      } else {
        setErr(t.invalid[locale]);
      }
    } catch {
      setErr(t.invalid[locale]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {err ? (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {err}
        </div>
      ) : null}

      <div>
        <label className="block mb-2 text-sm opacity-80">{t.email[locale]}</label>
        <input
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 dark:bg-black/20 px-4 h-11 outline-none placeholder:text-foreground/40"
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label className="block mb-2 text-sm opacity-80">{t.pass[locale]}</label>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 dark:bg-black/20 px-4 h-11 outline-none placeholder:text-foreground/40"
          placeholder="••••••••"
          required
        />
      </div>

      {/* دکمه گرادیانی هم‌رنگ Register */}
      <button
        type="submit"
        disabled={loading}
        className="relative w-full h-11 rounded-xl text-white font-medium ring-1 ring-white/10 overflow-hidden backdrop-blur-md
                   shadow-[0_0_18px_rgba(56,189,248,.35)] transition
                   hover:brightness-110 active:brightness-95 disabled:opacity-60"
      >
        <span className="pointer-events-none absolute inset-0 opacity-90
                         bg-[radial-gradient(80%_120%_at_20%_0%,#4f46e5,transparent_40%),radial-gradient(80%_120%_at_80%_100%,#06b6d4,transparent_40%),linear-gradient(90deg,#7c3aed_0%,#2563eb_100%)]" />
        <span className="relative">
          {loading ? t.signing[locale] : t.cta[locale]}
        </span>
      </button>
    </form>
  );
}
