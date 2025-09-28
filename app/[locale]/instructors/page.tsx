// path: app/[locale]/instructors/page.tsx
import InstructorCard from "@/components/InstructorCard";
// import GreenBadge from "@/components/GreenBadge"; // استفاده نشده بود، حذف شد
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

type Locale = "en" | "fa";

// نتایج سرچ cache نشه
export const revalidate = 0;

export default async function InstructorsPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: Locale };
  // سازگارتر با Next: ممکنه string[] هم بیاد
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const dir: "ltr" | "rtl" = locale === "fa" ? "rtl" : "ltr";

  // فقط q رشته باشه
  const rawQ = searchParams?.q;
  const q = (Array.isArray(rawQ) ? rawQ[0] : rawQ || "").trim();

  const t = {
    badge: { en: "Directory", fa: "دایرکتوری" },
    title: { en: "Instructors", fa: "مربیان" },
    placeholder: {
      en: "Search by city, postcode, or name",
      fa: "جستجو بر اساس شهر، کدپستی یا نام",
    },
    search: { en: "Search", fa: "جستجو" },
    empty: {
      en: "No instructors found.",
      fa: "مربی‌ای پیدا نشد.",
    },
  };

  // --- فیلتر سرچ (case-insensitive) ---
  const OR: Prisma.InstructorProfileWhereInput[] = [];
  if (q) {
    OR.push(
      { city: { contains: q, mode: "insensitive" } },
      { postcode: { contains: q, mode: "insensitive" } },
      { phone: { contains: q, mode: "insensitive" } },
      // relation 1-1
      { user: { is: { name: { contains: q, mode: "insensitive" } } } },
    );
  }
  const where: Prisma.InstructorProfileWhereInput | undefined =
    OR.length ? { OR } : undefined;

  // --- دریافت مربی‌ها از DB ---
  const rows = await prisma.instructorProfile.findMany({
    where,
    include: { user: true },
    orderBy: { updatedAt: "desc" },
    take: 60,
  });

  return (
    <>
      {/* هدر شیشه‌ای با سرچ */}
      <div className="container my-6" dir={dir}>
        <div
          className="rounded-2xl p-5 sm:p-6 lg:p-8 border border-white/10
                     bg-gradient-to-r from-indigo-500/20 via-fuchsia-500/20 to-cyan-400/20
                     backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,.35)]"
        >
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium
                       border border-white/10 bg-white/10 dark:bg-black/20 backdrop-blur"
            aria-label={t.badge[locale]}
          >
            {/* چراغ سبز پالس‌دار */}
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {t.badge[locale]}
          </span>

          <h1
            className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight
                       bg-gradient-to-r from-brand-400 via-fuchsia-400 to-cyan-300
                       bg-clip-text text-transparent"
          >
            {t.title[locale]}
          </h1>

          {/* سرچ: GET به همین صفحه با ?q= */}
          <form
            action={`/${locale}/instructors`}
            method="GET"
            className="mt-4 flex items-stretch gap-3"
            role="search"
          >
            <input
              name="q"
              defaultValue={q}
              className="flex-1 rounded-xl border border-white/10 bg-white/5 dark:bg-black/20
                         px-4 py-3 outline-none placeholder:text-foreground/40"
              placeholder={t.placeholder[locale]}
              aria-label={t.placeholder[locale]}
              autoComplete="off"
            />
            <button
              type="submit"
              className="rounded-xl px-4 py-3 bg-brand-500 text-white hover:bg-brand-600"
            >
              {t.search[locale]}
            </button>
          </form>
        </div>
      </div>

      {/* لیست مربی‌ها */}
      <section className="container my-8 grid gap-4 sm:grid-cols-2" dir={dir}>
        {rows.length === 0 ? (
          <div className="col-span-full text-foreground/70 text-sm">
            {t.empty[locale]}
          </div>
        ) : (
          rows.map((r) => (
            <InstructorCard
              key={r.id}
              locale={locale}
              instructor={{
                id: r.id,
                slug: r.slug || undefined,
                user: r.user ? { name: r.user.name || undefined } : undefined,
                city: r.city || undefined,
                postcode: r.postcode || undefined,
                phone: r.phone || undefined,
                ratePerHour: (r as any).rate ?? (r as any).hourlyRate,
                rating: r.rating ?? undefined,
                transmission: (r as any).transmission,
                bio: r.bio || undefined,

                // برای سازگاری با کارت فعلی‌ات، هم فلت هم تو در تو می‌فرستیم
                instructorProfile: {
                  slug: r.slug || undefined,
                  city: r.city || undefined,
                  postcode: r.postcode || undefined,
                  phone: r.phone || undefined,
                  ratePerHour: (r as any).rate ?? (r as any).hourlyRate,
                  rating: r.rating ?? undefined,
                  transmission: (r as any).transmission,
                  bio: r.bio || undefined,
                },
              }}
            />
          ))
        )}
      </section>
    </>
  );
}
