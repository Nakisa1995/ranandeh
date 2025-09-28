// path: app/[locale]/about/page.tsx
import Link from "next/link";
import HoverCard from "@/components/HoverCard";
import GreenBadge from "@/components/GreenBadge";

type Locale = "en" | "fa";

/** متادیتای سئو بر اساس زبان */
export async function generateMetadata({
  params: { locale },
}: { params: { locale: Locale } }) {
  const title =
    locale === "fa"
      ? "دربارهٔ راننده | تمرین تئوری دوزبانه EN/FA"
      : "About Ranandeh | UK theory practice in EN/FA";
  const description =
    locale === "fa"
      ? "راننده یک وب‌اپ دوزبانه (انگلیسی/فارسی) برای تمرین آزمون تئوری رانندگی بریتانیاست؛ شامل آزمون‌های آزمایشی، هازارد پرسپشن، علائم و خلاصه‌های Highway Code."
      : "Ranandeh is a bilingual (English/Persian) web app for UK DVSA theory practice: mock tests, hazard perception, road signs, and Highway Code summaries.";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://ranandeh.uk/${locale}/about`,
      type: "website",
    },
    alternates: {
      canonical: `https://ranandeh.uk/${locale}/about`,
      languages: {
        en: "https://ranandeh.uk/en/about",
        fa: "https://ranandeh.uk/fa/about",
      },
    },
  };
}

export default function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const dir: "rtl" | "ltr" = locale === "fa" ? "rtl" : "ltr";

  const t = {
    badge: { en: "About", fa: "درباره" },
    title: { en: "About Ranandeh", fa: "دربارهٔ راننده" },
    lead: {
      en: "A bilingual (EN/FA) practice app for the UK theory test—built with accessibility, speed, and clarity in mind.",
      fa: "یک اپ تمرین دوزبانه (EN/FA) برای آزمون تئوری رانندگی بریتانیا—با تمرکز بر دسترس‌پذیری، سرعت و شفافیت.",
    },
    sections: {
      what: { en: "What is this?", fa: "راننده چیست؟" },
      features: { en: "Features", fa: "امکانات" },
      roadmap: { en: "Roadmap", fa: "نقشه‌راه" },
      contact: { en: "Contact", fa: "ارتباط" },
      disclaimer: { en: "Disclaimer", fa: "یادآوری مهم" },
    },
    featuresList: {
      mock: {
        en: "Mock tests with timing, scoring, and instant review (EN/FA).",
        fa: "آزمون‌های آزمایشی با زمان‌سنج، نمره‌دهی و بازبینی فوری (EN/FA).",
      },
      hazard: {
        en: "Hazard perception clips with click detection and scoring windows.",
        fa: "کلیپ‌های هازارد با تشخیص کلیک و بازه‌های امتیازدهی.",
      },
      signs: {
        en: "Road signs catalogue with bite-size explanations.",
        fa: "مجموعهٔ علائم با توضیح‌های کوتاه و کاربردی.",
      },
      code: {
        en: "Highway Code summaries and (soon) flashcards.",
        fa: "خلاصه‌های Highway Code و (به‌زودی) فلش‌کارت‌ها.",
      },
      ui: {
        en: "Clean UI with dark/light theme and full RTL support.",
        fa: "رابط تمیز با تم روشن/تاریک و پشتیبانی کامل RTL.",
      },
      i18n: {
        en: "Instant language switch between English and Persian.",
        fa: "سوییچ لحظه‌ای بین انگلیسی و فارسی.",
      },
    },
    roadmapList: {
      accounts: {
        en: "Profiles, stats, and friend leaderboards.",
        fa: "پروفایل، آمار پیشرفت و لیدربورد دوستان.",
      },
      moreClips: {
        en: "More hazard clips and refined scoring.",
        fa: "کلیپ‌های هازارد بیشتر و امتیازدهی دقیق‌تر.",
      },
      explanations: {
        en: "Richer question explanations and study modes.",
        fa: "توضیحات تکمیلی برای پرسش‌ها و حالت‌های مطالعه.",
      },
      offline: {
        en: "Basic offline mode.",
        fa: "حالت آفلاین پایه.",
      },
    },
    contactText: {
      en: "Found a bug or have a suggestion?",
      fa: "ایده‌ای داری یا باگی پیدا کردی؟",
    },
    contactCta: {
      en: "Contact",
      fa: "تماس",
    },
    disclaimerText: {
      en: "This project is for practice and study purposes. It is not affiliated with the DVSA. Always check the official resources before your test.",
      fa: "این پروژه برای تمرین و مطالعه است و وابسته به DVSA نیست. برای آزمون، منابع رسمی را نیز حتماً بررسی کنید.",
    },
  };

  return (
    <div className="container my-6" dir={dir}>
      <HoverCard className="p-6 sm:p-8">
        <GreenBadge text={t.badge[locale]} />
        <h1
          className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight
                     bg-gradient-to-r from-brand-400 via-fuchsia-400 to-cyan-300
                     bg-clip-text text-transparent [background-size:200%_100%]
                     animate-[gradientPan_12s_linear_infinite]"
        >
          {t.title[locale]}
        </h1>
        <p className="mt-2 text-foreground/80">{t.lead[locale]}</p>
      </HoverCard>

      {/* What */}
      <section className="mt-6 grid gap-4">
        <HoverCard className="p-5">
          <h2 className="text-xl font-semibold">{t.sections.what[locale]}</h2>
          <p className="mt-2 text-sm text-foreground/80">
            {locale === "fa"
              ? "«راننده» یک وب‌اپ دوزبانه برای تمرین آزمون تئوری بریتانیاست که تجربه‌ای ساده، سریع و دقیق ارائه می‌کند."
              : "“Ranandeh” is a bilingual web app for UK theory practice that aims to be simple, fast and accurate."}
          </p>
        </HoverCard>

        {/* Features */}
        <HoverCard className="p-5">
          <h2 className="text-xl font-semibold">{t.sections.features[locale]}</h2>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            <li className="rounded-lg border border-white/10 bg-white/5 dark:bg-black/20 px-3 py-2 text-sm">
              {t.featuresList.mock[locale]}
            </li>
            <li className="rounded-lg border border-white/10 bg-white/5 dark:bg-black/20 px-3 py-2 text-sm">
              {t.featuresList.hazard[locale]}
            </li>
            <li className="rounded-lg border border-white/10 bg-white/5 dark:bg-black/20 px-3 py-2 text-sm">
              {t.featuresList.signs[locale]}
            </li>
            <li className="rounded-lg border border-white/10 bg-white/5 dark:bg-black/20 px-3 py-2 text-sm">
              {t.featuresList.code[locale]}
            </li>
            <li className="rounded-lg border border-white/10 bg-white/5 dark:bg-black/20 px-3 py-2 text-sm">
              {t.featuresList.ui[locale]}
            </li>
            <li className="rounded-lg border border-white/10 bg-white/5 dark:bg-black/20 px-3 py-2 text-sm">
              {t.featuresList.i18n[locale]}
            </li>
          </ul>
        </HoverCard>

        {/* Roadmap */}
        <HoverCard className="p-5">
          <h2 className="text-xl font-semibold">{t.sections.roadmap[locale]}</h2>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            <li className="rounded-lg border border-white/10 bg-white/5 dark:bg-black/20 px-3 py-2 text-sm">
              {t.roadmapList.accounts[locale]}
            </li>
            <li className="rounded-lg border border-white/10 bg-white/5 dark:bg-black/20 px-3 py-2 text-sm">
              {t.roadmapList.moreClips[locale]}
            </li>
            <li className="rounded-lg border border-white/10 bg-white/5 dark:bg-black/20 px-3 py-2 text-sm">
              {t.roadmapList.explanations[locale]}
            </li>
            <li className="rounded-lg border border-white/10 bg-white/5 dark:bg-black/20 px-3 py-2 text-sm">
              {t.roadmapList.offline[locale]}
            </li>
          </ul>
        </HoverCard>

        {/* Contact */}
        <HoverCard className="p-5">
          <h2 className="text-xl font-semibold">{t.sections.contact[locale]}</h2>
          <p className="mt-2 text-sm text-foreground/80">{t.contactText[locale]}</p>
          <div className="mt-3">
            <Link
              href={`/${locale}/contact`}
              prefetch
              className="group relative inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold text-white
                         ring-1 ring-white/10 backdrop-blur-md overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <span
                className="pointer-events-none absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity
                           bg-[radial-gradient(80%_120%_at_20%_0%,#4f46e5,transparent_40%),radial-gradient(80%_120%_at_80%_100%,#06b6d4,transparent_40%),linear-gradient(90deg,#7c3aed_0%,#2563eb_100%)]"
                aria-hidden="true"
              />
              <span className="relative">{t.contactCta[locale]}</span>
            </Link>
          </div>
        </HoverCard>

        {/* Disclaimer */}
        <HoverCard className="p-5">
          <h2 className="text-xl font-semibold">{t.sections.disclaimer[locale]}</h2>
          <p className="mt-2 text-sm text-foreground/80">
            {t.disclaimerText[locale]}
          </p>
        </HoverCard>
      </section>
    </div>
  );
}
