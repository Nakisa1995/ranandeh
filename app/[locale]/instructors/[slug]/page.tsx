// path: app/[locale]/instructors/[slug]/page.tsx
import HoverCard from "@/components/HoverCard";
import GreenBadge from "@/components/GreenBadge";
import { prisma } from "@/lib/prisma";

type Locale = "en" | "fa";

export const revalidate = 0;

function displayRate(x: any) {
  const r =
    x?.hourlyRate ??
    x?.ratePerHour ??
    x?.hourlyRatePerHr ??
    x?.instructorProfile?.hourlyRate ??
    x?.instructorProfile?.ratePerHour ??
    x?.user?.hourlyRate ??
    x?.user?.ratePerHour ??
    null;
  if (typeof r === "number" && Number.isFinite(r)) return `£${r}/hr`;
  if (typeof r === "string" && r.trim()) return r.trim();
  return "";
}

export default async function InstructorPublicPage({
  params: { locale, slug },
}: {
  params: { locale: Locale; slug: string };
}) {
  const dir: "rtl" | "ltr" = locale === "fa" ? "rtl" : "ltr";

  const ins = await prisma.instructorProfile.findFirst({
    where: { OR: [{ slug }, { id: slug }] },
    include: { user: true },
  });

  if (!ins) {
    return (
      <div dir={dir} className="container my-6">
        <HoverCard className="p-6">
          <GreenBadge text={locale === "fa" ? "پروفایل" : "Profile"} />
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-brand-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
            {locale === "fa" ? "مربی یافت نشد" : "Instructor not found"}
          </h1>
          <p className="mt-3 text-foreground/80">
            {locale === "fa"
              ? "لینک معتبر نیست یا پروفایل هنوز ساخته نشده است."
              : "Link is invalid or the profile has not been created yet."}
          </p>
        </HoverCard>
      </div>
    );
  }

  const anyIns = ins as any;
  const name =
    anyIns.displayName ??
    anyIns.user?.name ??
    (locale === "fa" ? "مربی" : "Instructor");

  const rate = displayRate(anyIns);
  const city = (anyIns.city as string | undefined) || "";
  const postcode = (anyIns.postcode as string | undefined) || "";
  const phone = (anyIns.phone as string | undefined) || "";
  const ratingVal = anyIns.rating as number | string | undefined;
  const transmission = (anyIns.transmission as string | undefined) || "";
  const bio = (anyIns.bio as string | undefined) || "";

  const ratingText =
    ratingVal !== undefined && ratingVal !== null && `${"★"} ${
      typeof ratingVal === "number" ? ratingVal.toFixed(1) : String(ratingVal)
    }`;

  return (
    <div dir={dir} className="container my-6">
      <HoverCard className="p-6 sm:p-8">
        <GreenBadge text={locale === "fa" ? "پروفایل" : "Profile"} />
        <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-brand-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
          {name}
        </h1>

        <div className="mt-4 grid gap-3 sm:grid-cols-2" dir={dir}>
          {(city || postcode) && (
            <div className="rounded-xl border border-white/10 bg-white/5 dark:bg-black/20 px-4 py-3">
              <div className="opacity-70 text-sm">
                {locale === "fa" ? "شهر" : "City"}
              </div>
              <div className="font-medium">
                {[city, postcode].filter(Boolean).join(" • ")}
              </div>
            </div>
          )}

          {phone && (
            <div className="rounded-xl border border-white/10 bg-white/5 dark:bg-black/20 px-4 py-3">
              <div className="opacity-70 text-sm">
                {locale === "fa" ? "تلفن" : "Phone"}
              </div>
              <div className="font-medium">
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:underline">
                  {phone}
                </a>
              </div>
            </div>
          )}

          {(rate || ratingText) && (
            <div className="rounded-xl border border-white/10 bg-white/5 dark:bg-black/20 px-4 py-3">
              <div className="opacity-70 text-sm">
                {locale === "fa" ? "نرخ / امتیاز" : "Rate / Rating"}
              </div>
              <div className="font-medium">
                {[rate, ratingText].filter(Boolean).join(" • ")}
              </div>
            </div>
          )}

          {transmission && (
            <div className="rounded-xl border border-white/10 bg-white/5 dark:bg-black/20 px-4 py-3">
              <div className="opacity-70 text-sm">
                {locale === "fa" ? "گیربکس" : "Transmission"}
              </div>
              <div className="font-medium">{transmission}</div>
            </div>
          )}
        </div>

        {bio && (
          <p className="mt-4 text-foreground/80 leading-relaxed" dir={dir}>
            {bio}
          </p>
        )}
      </HoverCard>
    </div>
  );
}
