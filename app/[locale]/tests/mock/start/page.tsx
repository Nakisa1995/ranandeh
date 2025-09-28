// path: app/[locale]/tests/mock/start/page.tsx
import Link from "next/link";
import HoverCard from "@/components/HoverCard";
import GreenBadge from "@/components/GreenBadge";

type Locale = "en" | "fa";

export const revalidate = 0;

export default function MockStartPage({
  params: { locale },
}: { params: { locale: Locale } }) {
  const dir = locale === "fa" ? "rtl" : "ltr";

  const t = {
    badge: { en: "Mock Tests", fa: "آزمون آزمایشی" },
    title: { en: "Start a Mock Test", fa: "شروع آزمون آزمایشی" },
    lead: {
      en: "Timed, scored, instant review. Choose number of questions and language.",
      fa: "زمان‌دار، نمره‌دهی، بازبینی فوری. تعداد سوال و زبان را انتخاب کنید.",
    },
    cta: { en: "Start (default 50 Q)", fa: "شروع (پیش‌فرض ۵۰ سوال)" },
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

        {/* بعداً این دکمه را به صفحهٔ واقعی آزمون وصل می‌کنیم */}
        <div className="mt-5 flex items-center gap-3">
          <button
            disabled
            className="rounded-xl px-4 py-3 bg-brand-500/60 text-white cursor-not-allowed"
            title={locale === "fa" ? "به‌زودی" : "Coming soon"}
          >
            {t.cta[locale]}
          </button>
          <Link
            href={`/${locale}/tests`}
            className="text-sm hover:underline"
          >
            {t.back[locale]}
          </Link>
        </div>
      </HoverCard>
    </div>
  );
}
