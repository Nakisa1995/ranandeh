import HoverCard from '@/components/HoverCard';
import GreenBadge from '@/components/GreenBadge';

type Locale = 'en' | 'fa';

export default function AboutPage({
  params,
}: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dir = locale === 'fa' ? 'rtl' : 'ltr';

  const t = {
    title: { en: 'About Ranandeh', fa: 'درباره راننده' },
    lead: {
      en: 'A fast, bilingual UK theory practice platform. Built with Next.js, Tailwind & Prisma.',
      fa: 'پلتفرم سریع تمرین آزمون تئوری بریتانیا، دوزبانه. ساخته‌شده با Next.js ،Tailwind و Prisma.',
    },
    p1: {
      en: 'Practice with 1,000+ questions, hazard clips, and instructor directory.',
      fa: 'با بیش از ۱۰۰۰ سؤال، کلیپ‌های هازارد و فهرست مربیان تمرین کن.',
    },
    p2: {
      en: 'Designed for speed, clarity and a calm learning experience.',
      fa: 'طراحی‌شده برای سرعت، وضوح و تجربه یادگیری آرام.',
    },
  };

  return (
    <div dir={dir} className="container mx-auto px-4 py-6">
      <HoverCard className="p-5">
        <GreenBadge text={locale === 'fa' ? 'اطلاعات' : 'Info'} />
        <h1
          className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-brand-300 via-fuchsia-300 to-cyan-300
                     bg-clip-text text-transparent"
          style={{ backgroundSize: '200% 100%', animation: 'gradientPan 12s linear infinite' }}>
          {t.title[locale]}
        </h1>
        <p className="mt-2 text-foreground/80">{t.lead[locale]}</p>

        <div className="mt-4 space-y-3 text-foreground/80 leading-relaxed">
          <p>{t.p1[locale]}</p>
          <p>{t.p2[locale]}</p>
        </div>
      </HoverCard>

      <style>{`
        @keyframes gradientPan {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  );
}
