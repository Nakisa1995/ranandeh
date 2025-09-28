// path: app/[locale]/tests/page.tsx
import CategoryTiles from '@/components/CategoryTiles';

type Locale = 'en' | 'fa';

export default function TestsPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const dir = locale === 'fa' ? 'rtl' : 'ltr';

  const t = {
    badge: {
      en: 'New • Dual-language UK theory practice',
      fa: 'جدید • تمرین تئوری دوزبانه EN/FA',
    },
    title: { en: 'Practice & Tests', fa: 'تمرین و آزمون‌ها' },
    lead: {
      en: 'Mock tests, hazard perception, road signs and highway code—bilingual EN/FA.',
      fa: 'آزمون آزمایشی، هازارد پرسپشن، علائم و کُد جاده—دوزبانه EN/FA.',
    },
  };

  return (
    <>
      {/* هدر شیشه‌ای با افکت هاور و گرادیان ملایم */}
      <div className="container my-6" dir={dir}>
        <section
          aria-labelledby="tests-title"
          role="region"
          className="group relative rounded-2xl p-5 sm:p-6 lg:p-8
                     border border-white/10 bg-white/5 dark:bg-black/30
                     backdrop-blur-xl ring-1 ring-white/10
                     shadow-[0_20px_50px_rgba(0,0,0,.35)]
                     transition-all duration-300"
        >
          {/* لایه‌ی گرادیانی: همیشه روشن، روی هاور پررنگ‌تر می‌شود */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-80 group-hover:opacity-100
                       transition-opacity duration-300 [background-size:200%_100%]
                       animate-[gradientPan_18s_linear_infinite]"
            style={{
              // سه لایه گرادیان؛ خود انیمیشن با کلاس بالاست
              background:
                'radial-gradient(90% 120% at 20% 0%, rgba(79,70,229,.45), transparent 40%), radial-gradient(90% 120% at 80% 100%, rgba(6,182,212,.45), transparent 40%), linear-gradient(90deg, rgba(124,58,237,.35) 0%, rgba(37,99,235,.35) 100%)',
            }}
          />

          {/* بج سبز پالس‌دار */}
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium
                           border border-white/10 bg-white/10 dark:bg-black/20 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {t.badge[locale]}
          </span>

          {/* تیتر گرادیانی */}
          <h1
            id="tests-title"
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight
                       bg-gradient-to-r from-brand-400 via-fuchsia-400 to-cyan-300
                       bg-clip-text text-transparent
                       transition-[filter] duration-300 group-hover:brightness-110"
          >
            {t.title[locale]}
          </h1>

          <p className="mt-2 text-foreground/80">{t.lead[locale]}</p>
        </section>
      </div>

      {/* گرید کارت‌ها – همون کامپوننت خودت */}
      <section className="container my-8" dir={dir}>
        <CategoryTiles locale={locale} />
      </section>
    </>
  );
}
