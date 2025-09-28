// path: app/[locale]/tests/hazard/page.tsx
import Link from "next/link";
import HoverCard from "@/components/HoverCard";
import GreenBadge from "@/components/GreenBadge";

type Locale = "en" | "fa";

export const revalidate = 0;

const SAMPLE_CLIPS = [
  { id: "clip-101", en: "Urban – parked cars", fa: "شهری – خودروهای پارک‌شده" },
  { id: "clip-102", en: "Rural – blind bends", fa: "بین‌شهری – پیچ‌های کور" },
  { id: "clip-103", en: "Night – limited visibility", fa: "شب – دید محدود" },
];

export default function HazardIndex({
  params: { locale },
}: { params: { locale: Locale } }) {
  const dir = locale === "fa" ? "rtl" : "ltr";

  const t = {
    badge: { en: "Hazard Perception", fa: "هازارد پرسپشن" },
    title: { en: "Hazard Clips", fa: "کلیپ‌های هازارد" },
    lead: {
      en: "Click when you spot developing hazards. Each clip has scoring windows.",
      fa: "هر زمان خطر درحال‌توسعه دیدید کلیک کنید. هر کلیپ بازه‌های امتیازدهی دارد.",
    },
    start: { en: "Open →", fa: "باز کردن →" },
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
          {SAMPLE_CLIPS.map((c) => (
            <div key={c.id}
                 className="rounded-xl border border-white/10 bg-white/5 dark:bg-black/20 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="font-medium">
                  {locale === "fa" ? c.fa : c.en}
                </div>
                <Link
                  href={`/${locale}/tests/hazard/clip/${encodeURIComponent(c.id)}`}
                  className="text-sm hover:underline"
                >
                  {t.start[locale]}
                </Link>
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
