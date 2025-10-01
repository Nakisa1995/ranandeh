// components/Hero.tsx
import Link from 'next/link';
import HoverCard from '@/components/HoverCard';

export default function Hero({ locale }: { locale: 'en' | 'fa' }) {
  const t = {
    title: {
      en: 'Pass your theory test faster',
      fa: 'آزمون تئوری رانندگی را سریع‌تر قبول شو',
    },
    subtitle: {
      en: 'Bilingual EN/FA questions, mock tests, hazard perception & instructor search—designed for speed.',
      fa: 'سؤالات دوزبانه انگلیسی/فارسی، آزمون‌های آزمایشی، هازارد پرسپشن و جستجوی مربی—طراحی‌شده برای سرعت.',
    },
    placeholder: { en: 'Search city / postcode', fa: 'نام شهر / کد پستی' },
    search: { en: 'Search', fa: 'جستجو' },
    mock: { en: 'Start mock test', fa: 'شروع آزمون آزمایشی' },
    badge: {
      en: 'New • Dual-language UK theory practice',
      fa: 'جدید • تمرین آزمون تئوری انگلیسی/فارسی',
    },
  };

  const dir = locale === 'fa' ? 'rtl' : 'ltr';

  return (
    <HoverCard
      /* پهنای پویا: موبایل جمع، لپ‌تاپ گسترده */
      className="
        mx-auto w-full
        max-w-[560px] md:max-w-[800px] lg:max-w-[960px] xl:max-w-[1100px]
        px-4 py-5 sm:px-8 sm:py-8 lg:px-10 lg:py-10
      "
    >
      {/* Badge */}
      <div
        dir={dir}
        className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10
                   bg-white/5 dark:bg-black/20 px-3 py-1 text-xs text-foreground/80
                   shadow-sm backdrop-blur truncate"
        aria-label="new feature"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <span className="select-none">{t.badge[locale]}</span>
      </div>

      {/* Title: در اسکرین‌های بزرگ واقعاً بزرگ */}
      <h1
        dir={dir}
        className="
          mt-1 sm:mt-2 font-extrabold tracking-tight
          bg-gradient-to-r from-brand-400 via-fuchsia-400 to-cyan-300
          bg-clip-text text-transparent leading-snug lg:leading-[1.12]
          text-[clamp(24px,6vw,34px)]
          md:text-[clamp(28px,4.5vw,44px)]
          lg:text-[56px]
        "
        style={{ backgroundSize: '200% 100%', animation: 'gradientPan 12s linear infinite' }}
      >
        {t.title[locale]}
      </h1>

      {/* Subtitle: دو خط در موبایل، عریض‌تر در دسکتاپ */}
      <p
        dir={dir}
        className="
          mt-3 text-foreground/80
          text-[clamp(14px,3.8vw,16px)] md:text-[17px]
          line-clamp-2 md:line-clamp-none
          max-w-none md:max-w-[80ch]
        "
      >
        {t.subtitle[locale]}
      </p>

      {/* فرم: عمودی در موبایل، افقی از sm به بالا */}
      <form
        dir={dir}
        action={`/${locale}/instructors`}
        method="GET"
        className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-stretch"
      >
        <input
          name="q"
          aria-label={t.placeholder[locale]}
          inputMode="search"
          className="h-12 w-full rounded-xl border border-white/10 bg-white/5 dark:bg-black/20
                     px-4 outline-none placeholder:text-foreground/40 focus:ring-2 focus:ring-brand-500
                     min-h-[44px]"
          placeholder={t.placeholder[locale]}
        />
        <button
          type="submit"
          className="h-12 rounded-xl px-4 bg-brand-500 text-white hover:bg-brand-600
                     active:scale-[.99] min-h-[44px]"
        >
          {t.search[locale]}
        </button>
        <Link
          href={`/${locale}/tests`}
          className="h-12 rounded-xl px-4 bg-white/10 hover:bg-white/20
                     flex items-center justify-center min-h-[44px]"
        >
          {t.mock[locale]}
        </Link>
      </form>

      {/* Stats: تک‌ستونه در موبایل، 2 ستونه از sm، 4 ستونه از lg */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {[
          { labelEn: '+1,000', subEn: 'Questions', labelFa: '+۱,۰۰۰', subFa: 'سؤال' },
          { labelEn: '38', subEn: 'Hazard Clips', labelFa: '۳۸', subFa: 'کلیپ هازارد' },
          { labelEn: 'EN/FA', subEn: 'Languages', labelFa: 'EN/FA', subFa: 'زبان‌ها' },
          { labelEn: 'UK-wide', subEn: 'Instructors', labelFa: 'سراسری', subFa: 'مربیان' },
        ].map((x, i) => (
          <div
            key={i}
            className="rounded-xl border border-white/10 bg-white/5 dark:bg-black/20 px-4 py-3"
          >
            <div className="text-base sm:text-lg lg:text-xl font-semibold">
              {locale === 'fa' ? x.labelFa : x.labelEn}
            </div>
            <div className="text-xs lg:text-sm opacity-70">
              {locale === 'fa' ? x.subFa : x.subEn}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes gradientPan {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </HoverCard>
  );
}
