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
    <HoverCard className="px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
      {/* Badge با چراغ سبز ملایم */}
      <div
        dir={dir}
        className="mb-3 inline-flex items-center gap-2 rounded-full
                   border border-white/10 bg-white/5 dark:bg-black/20
                   px-3 py-1 text-[12px] text-foreground/80 shadow-sm backdrop-blur"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
        </span>
        <span className="select-none">{t.badge[locale]}</span>
      </div>

      {/* تیتر گرادیانی */}
      <h1
        dir={dir}
        className="mt-1 sm:mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight
                   bg-gradient-to-r from-brand-400 via-fuchsia-400 to-cyan-300
                   bg-clip-text text-transparent leading-snug lg:leading-[1.15]"
        style={{ backgroundSize: '200% 100%', animation: 'gradientPan 12s linear infinite' }}
      >
        {t.title[locale]}
      </h1>

      <p dir={dir} className="mt-3 text-foreground/80">
        {t.subtitle[locale]}
      </p>

      {/* جستجو: فرم GET به /[locale]/instructors?q=... */}
      <form
        dir={dir}
        action={`/${locale}/instructors`}
        method="GET"
        className="mt-6 flex items-stretch gap-3 max-w-4xl"
      >
        <input
          name="q"
          className="flex-1 rounded-xl border border-white/10 bg-white/5 dark:bg-black/20
                     px-4 py-3 outline-none placeholder:text-foreground/40"
          placeholder={t.placeholder[locale]}
        />
        <button
          type="submit"
          className="rounded-xl px-4 py-3 bg-brand-500 text-white hover:bg-brand-600"
        >
          {t.search[locale]}
        </button>
        <Link
          href={`/${locale}/tests`}
          className="rounded-xl px-4 py-3 bg-white/10 hover:bg-white/20"
        >
          {t.mock[locale]}
        </Link>
      </form>

      {/* آمار */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { labelEn: '+1,000', subEn: 'Questions', labelFa: '+۱,۰۰۰', subFa: 'سؤال' },
          { labelEn: '38', subEn: 'Hazard Clips', labelFa: '۳۸', subFa: 'کلیپ هازارد' },
          { labelEn: 'EN/FA', subEn: 'Languages', labelFa: 'EN/FA', subFa: 'زبان‌ها' },
          { labelEn: 'UK-wide', subEn: 'Instructors', labelFa: 'سراسری', subFa: 'مربیان' },
        ].map((x, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-white/5 dark:bg-black/20 px-4 py-3">
            <div className="text-lg font-semibold">
              {locale === 'fa' ? x.labelFa : x.labelEn}
            </div>
            <div className="text-xs opacity-70">
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
