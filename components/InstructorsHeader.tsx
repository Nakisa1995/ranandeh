// components/InstructorsHeader.tsx
'use client';

import HoverCard from '@/components/HoverCard';
import Badge from '@/components/Badge';

type Props = {
  locale: 'en' | 'fa';
  searchParams?: { q?: string };
};

export default function InstructorsHeader({ locale, searchParams }: Props) {
  const dir = locale === 'fa' ? 'rtl' : 'ltr';

  return (
    <HoverCard className="px-5 py-6 sm:px-8 sm:py-8">
      <div dir={dir} className="space-y-4">
        <Badge>{locale === 'fa' ? 'دایرکتوری' : 'Directory'}</Badge>

        <h1
          className="text-3xl sm:text-4xl font-extrabold tracking-tight
                     bg-gradient-to-r from-brand-400 via-fuchsia-400 to-cyan-300
                     bg-clip-text text-transparent"
        >
          {locale === 'fa' ? 'مربیان' : 'Instructors'}
        </h1>

        {/* Search bar */}
        <form
          action={`/${locale}/instructors`}
          method="get"
          className="flex items-stretch gap-3"
        >
          <input
            name="q"
            defaultValue={
              typeof searchParams?.q === 'string' ? searchParams.q : ''
            }
            placeholder={
              locale === 'fa'
                ? 'جستجو بر اساس شهر، کدپستی یا نام'
                : 'Search by city, postcode, or name'
            }
            className="flex-1 rounded-xl border border-white/10 bg-white/5 dark:bg-black/20
                       px-4 py-3 outline-none placeholder:text-foreground/50"
          />
          <button
            type="submit"
            className="rounded-xl px-4 py-3 bg-brand-500 text-white hover:bg-brand-600"
          >
            {locale === 'fa' ? 'جستجو' : 'Search'}
          </button>
        </form>
      </div>
    </HoverCard>
  );
}
