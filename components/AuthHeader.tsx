'use client';

import HoverCard from '@/components/HoverCard';
import { usePathname } from 'next/navigation';

type Locale = 'en' | 'fa';

export default function AuthHeader({
  locale,
}: {
  locale: Locale;
}) {
  // به‌طور خودکار تشخیص بده صفحه رجیستره یا لاگین
  const pathname = usePathname() || '';
  const mode: 'login' | 'register' = pathname.includes('/register')
    ? 'register'
    : 'login';

  const t = {
    badge: { en: 'Secure • Account', fa: 'امن • حساب کاربری' },
    title: {
      login: { en: 'Log in to your account', fa: 'ورود به حساب کاربری' },
      register: { en: 'Create your account', fa: 'ساخت حساب کاربری' },
    },
    lead: {
      login: {
        en: 'Access tests, progress, and instructors—EN/FA.',
        fa: 'دسترسی به آزمون‌ها، پیشرفت و مربیان — انگلیسی/فارسی.',
      },
      register: {
        en: 'One account for tests, clips and leaderboards—EN/FA.',
        fa: 'یک حساب برای آزمون‌ها، کلیپ‌ها و لیدربورد — انگلیسی/فارسی.',
      },
    },
  };

  const dir = locale === 'fa' ? 'rtl' : 'ltr';

  return (
    <>
      <HoverCard className="px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        {/* بج سبز با نقطه‌ی پالس‌دار */}
        <div
          dir={dir}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/40 px-3 py-1 mb-4"
        >
          <span className="dot-pulse" />
          <span className="text-xs font-medium text-emerald-200">
            {t.badge[locale]}
          </span>
        </div>

        {/* عنوان گرادینتی با فضای کافی تا دم y قطع نشود */}
        <h1
          dir={dir}
          className="grad-text animate-bgShift leading-[1.2] text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight pt-1 pb-1"
        >
          {t.title[mode][locale]}
        </h1>

        <p dir={dir} className="mt-3 text-foreground/80">
          {t.lead[mode][locale]}
        </p>
      </HoverCard>

      {/* CSS لازم */}
      <style jsx global>{`
        @keyframes dotPulse {
          0% { transform: scale(0.9); opacity: 0.6; }
          50% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(0.9); opacity: 0.6; }
        }
        .dot-pulse {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: #34d399;             /* emerald-400 */
          box-shadow: 0 0 0 6px rgba(52,211,153,.15);
          animation: dotPulse 1.8s ease-in-out infinite;
          display: inline-block;
        }

        @keyframes bgShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .grad-text{
          background-image: linear-gradient(90deg,#60a5fa,#e879f9,#22d3ee,#60a5fa);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .animate-bgShift{ animation: bgShift 12s linear infinite; }
      `}</style>
    </>
  );
}
