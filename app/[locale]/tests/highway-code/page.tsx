// path: app/[locale]/tests/highway-code/page.tsx
import Link from "next/link";
import HoverCard from "@/components/HoverCard";
import GreenBadge from "@/components/GreenBadge";

type Locale = "en" | "fa";
export const revalidate = 0;

const SECTIONS = [
  { key: "rules-for-pedestrians", en: "Rules for pedestrians", fa: "قوانین عابران پیاده" },
  { key: "rules-for-drivers", en: "Rules for drivers", fa: "قوانین رانندگان" },
  { key: "signals", en: "Signals and markings", fa: "علائم و خط‌کشی‌ها" },
];

export default function HighwayCodePage({
  params: { locale },
}: { params: { locale: Locale } }) {
  const dir = locale === "fa" ? "rtl" : "ltr";

  const t = {
    badge: { en: "Highway Code", fa: "های‌وی کُد" },
    title: { en: "Highway Code (Summaries)", fa: "های‌وی کُد (خلاصه‌ها)" },
    lead: {
      en: "Bite-sized summaries and flashcards. Expandable sections coming soon.",
      fa: "خلاصه‌های کوتاه و فلش‌کارت‌ها. بخش‌های قابل‌گسترش به‌زودی.",
    },
    open: { en: "Open →", fa: "باز کردن →" },
    back: { en: "Back to Practice", fa: "بازگشت به تمرین‌ها" },
  };

  return (
    <div className="container my-6" dir={dir}>
      <HoverCard className="p-6 sm:p-8">
        <GreenBadge text={t.badge[locale]} />
        <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight
                       bg-gradient-to-r from-brand-400 via-fuchsia-400 to-cyan-300
                       bg-clip-text text-transparent">
          {t.title[locale]}
        </h1>

        <p className="mt-2 text-foreground/80">{t.lead[locale]}</p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {SECTIONS.map((s) => (
            <div key={s.key}
                 className="rounded-xl border border-white/10 bg-white/5 dark:bg-black/20 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="font-medium">{locale === "fa" ? s.fa : s.en}</div>
                <button className="text-sm cursor-not-allowed opacity-60"
                        title={locale === "fa" ? "به‌زودی" : "Coming soon"}>
                  {t.open[locale]}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <Link href={`/${locale}/tests`} className="text-sm hover:underline">
            {t.back[locale]}
          </Link>
        </div>
      </HoverCard>
    </div>
  );
}
