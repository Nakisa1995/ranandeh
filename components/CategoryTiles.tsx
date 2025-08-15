import Link from 'next/link';

export default function CategoryTiles({locale}:{locale:'en'|'fa'}){
  const tiles = [
    { title: 'Mock Tests', href: '/tests', desc: 'Timed, scored, review answers.'},
    { title: 'Hazard Perception', href: '/tests', desc: 'Click detection & scoring windows.'},
    { title: 'Road Signs', href: '/tests', desc: 'Learn and practice UK signs.'},
    { title: 'Highway Code', href: '/tests', desc: 'Summaries & flashcards.'},
    { title: 'Instructors', href: '/instructors', desc: 'Search ADIs by city/postcode.'},
    { title: 'Leaderboard', href: '/leaderboard', desc: 'Compete with friends.'},
  ];
  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tiles.map(t => (
        <Link key={t.title} href={`/${locale}${t.href}`} className="card hover:shadow-lg transition-shadow">
          <div className="text-lg font-semibold">{t.title}</div>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{t.desc}</p>
        </Link>
      ))}
    </section>
  );
}
