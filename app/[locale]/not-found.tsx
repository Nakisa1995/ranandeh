'use client';

import Link from "next/link";
import HoverCard from "@/components/HoverCard";
import GreenBadge from "@/components/GreenBadge";
import { usePathname } from "next/navigation";

type Locale = "en" | "fa";

export default function NotFound() {
  const pathname = usePathname() || "/en";
  const first = pathname.split("/")[1];
  const locale: Locale = (first === "fa" ? "fa" : "en");
  const dir: "rtl" | "ltr" = locale === "fa" ? "rtl" : "ltr";

  const t = {
    badge: { en: "Oops", fa: "اوه!" },
    title: { en: "Page not found", fa: "صفحه پیدا نشد" },
    lead: {
      en: "The page you’re looking for doesn’t exist or has moved.",
      fa: "صفحه‌ای که به دنبالش هستید وجود ندارد یا جابجا شده است.",
    },
    home:  { en: "Go to Home",   fa: "رفتن به صفحه اصلی" },
    tests: { en: "Open Tests →", fa: "باز کردن تمرین‌ها →" },
  };

  return (
    <div dir={dir} className="container my-10">
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

        <p className="mt-3 text-foreground/80">{t.lead[locale]}</p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link
            href={`/${locale}`}
            prefetch
            className="group relative inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold text-white
                       ring-1 ring-white/10 backdrop-blur-md overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <span
              className="pointer-events-none absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity
                         bg-[radial-gradient(80%_120%_at_20%_0%,#4f46e5,transparent_40%),radial-gradient(80%_120%_at_80%_100%,#06b6d4,transparent_40%),linear-gradient(90deg,#7c3aed_0%,#2563eb_100%)]"
              aria-hidden="true"
            />
            <span className="relative">{t.home[locale]}</span>
          </Link>

          <Link
            href={`/${locale}/tests`}
            prefetch
            className="nav-pill rounded-xl px-3 py-2 text-sm text-foreground/90 hover:text-white focus-ring"
          >
            {t.tests[locale]}
          </Link>
        </div>
      </HoverCard>
    </div>
  );
}
