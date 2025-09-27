import HoverCard from '@/components/HoverCard';
import GreenBadge from '@/components/GreenBadge';

type Locale = 'en' | 'fa';

export default function LeaderboardPage({
  params,
}: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dir = locale === 'fa' ? 'rtl' : 'ltr';

  const t = {
    title: { en: 'Leaderboard', fa: 'جدول رتبه‌بندی' },
    lead: {
      en: 'Compete with friends. Highest scores and fastest passes.',
      fa: 'با دوستان رقابت کن؛ بیشترین امتیازها و سریع‌ترین قبولی‌ها.',
    },
    rank: { en: 'Rank', fa: 'رتبه' },
    name: { en: 'Name', fa: 'نام' },
    score: { en: 'Score', fa: 'امتیاز' },
    time: { en: 'Best Time', fa: 'بهترین زمان' },
  };

  // داده‌ی نمونه (بعداً از API خودت جایگزین کن)
  const rows = [
    { name: 'Ali Rahimi', score: 982, time: '07:42' },
    { name: 'Sara Moradi', score: 951, time: '08:01' },
    { name: 'Reza K.', score: 910, time: '08:17' },
    { name: 'M. Ahmadi', score: 890, time: '08:39' },
  ];

  return (
    <div dir={dir} className="container mx-auto px-4 py-6">
      <HoverCard className="p-5 mb-6">
        <GreenBadge text={locale === 'fa' ? 'اجتماعی' : 'Social'} />
        <h1
          className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-brand-300 via-fuchsia-300 to-cyan-300
                     bg-clip-text text-transparent"
          style={{ backgroundSize: '200% 100%', animation: 'gradientPan 12s linear infinite' }}>
          {t.title[locale]}
        </h1>
        <p className="mt-2 text-foreground/80">{t.lead[locale]}</p>
      </HoverCard>

      <HoverCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left bg-white/5 dark:bg-black/20">
                <th className="px-4 py-3 border-b border-white/10 w-20">{t.rank[locale]}</th>
                <th className="px-4 py-3 border-b border-white/10">{t.name[locale]}</th>
                <th className="px-4 py-3 border-b border-white/10 w-40">{t.score[locale]}</th>
                <th className="px-4 py-3 border-b border-white/10 w-40">{t.time[locale]}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="hover:bg-white/5 dark:hover:bg-black/20 transition">
                  <td className="px-4 py-3 border-b border-white/10">{i + 1}</td>
                  <td className="px-4 py-3 border-b border-white/10">{r.name}</td>
                  <td className="px-4 py-3 border-b border-white/10">{r.score}</td>
                  <td className="px-4 py-3 border-b border-white/10">{r.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
