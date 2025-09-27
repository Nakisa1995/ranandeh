'use client';

import Link from 'next/link';

const items = [
  {
    title: 'Mock Tests',
    desc: 'Timed, scored, instant review. EN/FA.',
    href: '/tests',
    tag: 'Practice',
    emoji: '📝',
  },
  {
    title: 'Hazard Perception',
    desc: 'Click detection & scoring windows.',
    href: '/tests?type=hazard',
    tag: 'Clips',
    emoji: '🚗',
  },
  {
    title: 'Instructors',
    desc: 'Search ADIs by city/postcode.',
    href: '/instructors',
    tag: 'Directory',
    emoji: '🧭',
  },
];

export default function FeaturesSection({ locale='en' }:{locale?:'en'|'fa'}) {
  return (
    <section className="container my-10 lg:my-14">
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((it) => (
          <Link key={it.title} href={`/${locale}${it.href}`} className="card group relative overflow-hidden p-5 hover:shadow-xl transition">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-500/10 blur-2xl group-hover:bg-brand-500/20 transition" />
            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
              <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5">{it.emoji} {it.tag}</span>
            </div>
            <div className="mt-3 text-lg font-semibold">{it.title}</div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{it.desc}</p>
            <div className="mt-4 text-sm text-brand-700 dark:text-brand-400">Open →</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
