// path: app/[locale]/tests/hazard/clip/[id]/page.tsx
import Link from "next/link";
import HoverCard from "@/components/HoverCard";
import GreenBadge from "@/components/GreenBadge";

type Locale = "en" | "fa";

export const revalidate = 0;

export default function HazardClipPage({
  params: { locale, id },
}: { params: { locale: Locale; id: string } }) {
  const dir = locale === "fa" ? "rtl" : "ltr";

  const t = {
    badge: { en: "Hazard Perception", fa: "هازارد پرسپشن" },
    title: { en: "Clip", fa: "کلیپ" },
    lead: {
      en: "Demo screen. Video player and click detection will be added here.",
      fa: "نسخهٔ نمایشی. ویدیوپلیر و تشخیص کلیک اینجا اضافه می‌شود.",
    },
    back: { en: "Back to clips", fa: "بازگشت به کلیپ‌ها" },
  };

  return (
    <div className="container my-6" dir={dir}>
      <HoverCard className="p-6 sm:p-8">
        <GreenBadge text={t.badge[locale]} />
        <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight
                       bg-gradient-to-r from-brand-400 via-fuchsia-400 to-cyan-300
                       bg-clip-text text-transparent">
          {t.title[locale]}: {id}
        </h1>

        <p className="mt-2 text-foreground/80">{t.lead[locale]}</p>

        {/* Placeholder ویدیو */}
        <div className="mt-4 aspect-video w-full rounded-xl border border-white/10
                        bg-white/5 dark:bg-black/20 flex items-center justify-center text-foreground/60">
          (video placeholder)
        </div>

        <div className="mt-4">
          <Link href={`/${locale}/tests/hazard`} className="text-sm hover:underline">
            {t.back[locale]}
          </Link>
        </div>
      </HoverCard>
    </div>
  );
}
