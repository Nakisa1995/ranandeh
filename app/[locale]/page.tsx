import Hero from '@/components/Hero';
import CategoryTiles from '@/components/CategoryTiles';
import HoverCard from '@/components/HoverCard';

export default function HomePage({
  params,
}: {
  params: { locale: 'en' | 'fa' };
}) {
  const { locale } = params;

  return (
    <>
      {/* هدر بزرگ داخل باکس شیشه‌ای (خود Hero با HoverCard رَپ شده) */}
      <section className="container my-6">
        <Hero locale={locale} />
      </section>

      {/* ردیف کارت‌ها – هر کارت خودش HoverCard دارد */}
      <section className="container my-10">
        <CategoryTiles locale={locale} />
      </section>

      {/* یک نمونه باکس شیشه‌ای آزاد (اختیاری) */}
      <section className="container my-12">
        <HoverCard className="p-6 sm:p-8">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-brand-400 to-fuchsia-400 bg-clip-text text-transparent">
            {locale === 'fa' ? 'آماده‌ای زودتر قبول شوی؟' : 'Ready to pass sooner?'}
          </h3>
          <p className="mt-2 opacity-80">
            {locale === 'fa'
              ? 'یک آزمون کامل آزمایشی را همین حالا شروع کن و پیشرفتت را دنبال کن.'
              : 'Start a full mock test now and track your progress.'}
          </p>
        </HoverCard>
      </section>
    </>
  );
}
