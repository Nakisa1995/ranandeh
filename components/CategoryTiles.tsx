// path: components/CategoryTiles.tsx
import Link from 'next/link';
import HoverCard from '@/components/HoverCard';

type Locale = 'en' | 'fa';

type Tile = {
  href: (locale: Locale) => string;
  badge: { en: string; fa: string };
  title: { en: string; fa: string };
  desc: { en: string; fa: string };
};

const TILES: Tile[] = [
  {
    href: (locale) => `/${locale}/tests/mock/start`,
    badge: { en: 'Practice', fa: 'تمرین' },
    title: { en: 'Mock Tests', fa: 'آزمون‌های آزمایشی' },
    desc: {
      en: 'Timed, scored, instant review. EN/FA.',
      fa: 'زمان‌دار، نمره‌دهی، بازبینی فوری. EN/FA.',
    },
  },
  {
    href: (locale) => `/${locale}/tests/hazard`,
    badge: { en: 'Clips', fa: 'کلیپ‌ها' },
    title: { en: 'Hazard Perception', fa: 'هازارد پرسپشن' },
    desc: {
      en: 'Click detection & scoring windows.',
      fa: 'تشخیص کلیک و بازه امتیازدهی.',
    },
  },
  {
    href: (locale) => `/${locale}/instructors`,
    badge: { en: 'Directory', fa: 'فهرست' },
    title: { en: 'Instructors', fa: 'مربیان' },
    desc: {
      en: 'Search ADIs by city/postcode.',
      fa: 'جستجوی مربی بر اساس شهر/کدپستی.',
    },
  },
  {
    href: (locale) => `/${locale}/tests/signs`,
    badge: { en: 'Signs', fa: 'علائم' },
    title: { en: 'Road Signs', fa: 'علائم رانندگی' },
    desc: {
      en: 'Learn and practise UK signs.',
      fa: 'یادگیری و تمرین علائم بریتانیا.',
    },
  },
  {
    href: (locale) => `/${locale}/tests/highway-code`,
    badge: { en: 'Code', fa: 'کُد' },
    title: { en: 'Highway Code', fa: 'های‌وی کُد' },
    desc: {
      en: 'Summaries & flashcards.',
      fa: 'خلاصه‌ها و فلش‌کارت‌ها.',
    },
  },
  {
    href: (locale) => `/${locale}/leaderboard`,
    badge: { en: 'Social', fa: 'اجتماعی' },
    title: { en: 'Leaderboard', fa: 'جدول رتبه‌بندی' },
    desc: {
      en: 'Compete with friends.',
      fa: 'رقابت با دوستان.',
    },
  },
];

// Badge سبز چشمک‌زن (همان استایل هدر)
function GreenBadge({ text }: { text: string }) {
  return (
    <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10
                    bg-white/5 dark:bg-black/20 px-2.5 py-0.5 text-[11px] text-foreground/80
                    shadow-sm backdrop-blur">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
      </span>
      <span className="select-none">{text}</span>
    </div>
  );
}

export default function CategoryTiles({ locale }: { locale: Locale }) {
  const dir = locale === 'fa' ? 'rtl' : 'ltr';

  return (
    <div dir={dir} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {TILES.map((tile) => (
        <HoverCard key={tile.title.en} className="p-5">
          {/* Badge */}
          <GreenBadge text={tile.badge[locale]} />

          {/* تیتر با گرادیانِ متحرک (بدون <style>) */}
          <h3
            className="text-xl font-semibold bg-gradient-to-r from-brand-300 via-fuchsia-300 to-cyan-300
                       bg-clip-text text-transparent [background-size:200%_100%]
                       animate-[gradientPan_12s_linear_infinite]"
          >
            {tile.title[locale]}
          </h3>

          <p className="mt-1 text-sm text-foreground/80">{tile.desc[locale]}</p>

          <Link
            href={tile.href(locale)}
            className="mt-4 inline-flex items-center gap-1 text-sm text-foreground/90 hover:underline"
          >
            {locale === 'fa' ? 'باز کردن →' : 'Open →'}
          </Link>
        </HoverCard>
      ))}
    </div>
  );
}
