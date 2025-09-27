import Link from 'next/link';
import Image from 'next/image';
import HoverCard from '@/components/HoverCard';
import GreenBadge from '@/components/GreenBadge';

type Locale = 'en' | 'fa';

type Instructor = {
  id?: string;
  slug?: string | null;

  // نمایش
  displayName?: string | null;
  name?: string | null;
  user?: { name?: string | null };

  // آواتار
  avatarUrl?: string | null;
  photo?: string | null;

  // محل/تماس
  city?: string | null;
  postcode?: string | null;
  phone?: string | null;

  // نرخ/امتیاز/تجربه
  ratePerHour?: number | string | null;
  hourlyRate?: number | string | null;
  rating?: number | string | null;
  yearsExperience?: number | null;

  // گیربکس
  transmission?: string | null;
  manual?: boolean | null;
  automatic?: boolean | null;

  // زبان‌ها
  languages?: string[] | null;
  languagesCsv?: string | null;

  // بیو
  bio?: string | null;

  // اگر ساختار تو در تو داری
  instructorProfile?: {
    id?: string;                  // ← برای لینک با id
    slug?: string | null;
    avatarUrl?: string | null;
    city?: string | null; postcode?: string | null; phone?: string | null;
    ratePerHour?: number | string | null; hourlyRate?: number | string | null;
    rating?: number | string | null;
    yearsExperience?: number | null;
    transmission?: string | null; manual?: boolean | null; automatic?: boolean | null;
    languages?: string[] | null; languagesCsv?: string | null;
    bio?: string | null;
  };
};

export default function InstructorCard({
  locale,
  instructor,
}: {
  locale: Locale;
  instructor: Instructor;
}) {
  const dir = locale === 'fa' ? 'rtl' : 'ltr';

  // نام
  const name =
    instructor.displayName ??
    instructor.name ??
    instructor.user?.name ??
    (locale === 'fa' ? 'مربی' : 'Instructor');

  // آواتار
  const avatar =
    instructor.instructorProfile?.avatarUrl ??
    instructor.avatarUrl ??
    instructor.photo ??
    '/icon.png';

  // محل/تماس
  const city = instructor.instructorProfile?.city ?? instructor.city ?? '';
  const postcode = instructor.instructorProfile?.postcode ?? instructor.postcode ?? '';
  const phone = instructor.instructorProfile?.phone ?? instructor.phone ?? '';

  // نرخ/امتیاز/تجربه
  const rateRaw =
    instructor.instructorProfile?.ratePerHour ??
    instructor.instructorProfile?.hourlyRate ??
    instructor.ratePerHour ??
    instructor.hourlyRate;
  const rate =
    typeof rateRaw === 'number' ? `£${rateRaw}/hr` : (rateRaw ?? '');

  const rating =
    instructor.instructorProfile?.rating ?? instructor.rating ?? '';

  const years =
    instructor.instructorProfile?.yearsExperience ??
    instructor.yearsExperience ??
    null;

  // گیربکس
  const manual =
    instructor.instructorProfile?.manual ?? instructor.manual ??
    (/manual/i.test(instructor.instructorProfile?.transmission || instructor.transmission || ''));

  const automatic =
    instructor.instructorProfile?.automatic ?? instructor.automatic ??
    (/auto/i.test(instructor.instructorProfile?.transmission || instructor.transmission || ''));

  // زبان‌ها
  const langsArr =
    instructor.instructorProfile?.languages ??
    instructor.languages ??
    (instructor.instructorProfile?.languagesCsv || instructor.languagesCsv || '')
      .toString()
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

  // بیو
  const bio = instructor.instructorProfile?.bio ?? instructor.bio ?? '';

  // ----- لینک پروفایل: همیشه با id -----
  const idForLink =
    instructor.instructorProfile?.id || instructor.id || undefined;

  // اگر هیچ id نداریم، اضطراراً از slug استفاده کن؛ ولی اولویت همیشه با id است
  const fallbackSlug =
    instructor.instructorProfile?.slug || instructor.slug || undefined;

  const profileHref = idForLink
    ? `/${locale}/instructors/${encodeURIComponent(idForLink)}`
    : `/${locale}/instructors/${encodeURIComponent(fallbackSlug || '')}`;

  const t = {
    directory: { en: 'Directory', fa: 'فهرست' },
    city: { en: 'City', fa: 'شهر' },
    phone: { en: 'Phone', fa: 'تلفن' },
    open: { en: 'Open →', fa: 'باز کردن →' },
  };

  return (
    <Link
      href={profileHref}
      className="block group focus:outline-none"
      aria-label={name || ''}
      title={name || undefined}
    >
      <HoverCard className="p-5 transition hover:bg-white/10 dark:hover:bg-white/10">
        <GreenBadge text={t.directory[locale]} />

        {/* ردیف بالا: آواتار + نام و بج‌ها */}
        <div className="mt-2 flex items-start gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/15 bg-white/10 dark:bg-black/20">
            <Image
              src={avatar}
              alt={name || 'avatar'}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3
              dir={dir}
              className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-brand-300 via-fuchsia-300 to-cyan-300
                         bg-clip-text text-transparent transition-[filter] duration-300 group-hover:brightness-110"
              style={{ backgroundSize: '200% 100%', animation: 'gradientPan 12s linear infinite' }}
            >
              {name}
            </h3>

            {/* بج‌ها */}
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
              {manual && (
                <span className="px-2 py-1 rounded-lg ring-1 ring-white/15 bg-white/10 dark:bg-black/20">
                  Manual
                </span>
              )}
              {automatic && (
                <span className="px-2 py-1 rounded-lg ring-1 ring-white/15 bg-white/10 dark:bg-black/20">
                  Automatic
                </span>
              )}
              {rate && (
                <span className="px-2 py-1 rounded-lg ring-1 ring-white/15 bg-white/10 dark:bg-black/20">
                  {rate}
                </span>
              )}
              {rating !== '' && rating !== null && (
                <span className="px-2 py-1 rounded-lg ring-1 ring-white/15 bg-white/10 dark:bg-black/20">
                  ★ {typeof rating === 'number' ? Number(rating).toFixed(1) : rating}
                </span>
              )}
              {typeof years === 'number' && (
                <span className="px-2 py-1 rounded-lg ring-1 ring-white/15 bg-white/10 dark:bg-black/20">
                  {years}y
                </span>
              )}
            </div>
          </div>
        </div>

        {/* بیو کوتاه */}
        {bio ? (
          <p dir={dir} className="mt-2 text-sm text-foreground/80 line-clamp-2">
            {bio}
          </p>
        ) : null}

        {/* جزئیات */}
        <div dir={dir} className="mt-3 grid grid-cols-2 gap-3 text-sm">
          {(city || postcode) && (
            <div className="rounded-lg border border-white/10 bg-white/5 dark:bg-black/20 px-3 py-2">
              <div className="opacity-70">{t.city[locale]}</div>
              <div className="font-medium">{[city, postcode].filter(Boolean).join(' • ')}</div>
            </div>
          )}
          {phone && (
            <div className="rounded-lg border border-white/10 bg-white/5 dark:bg-black/20 px-3 py-2">
              <div className="opacity-70">{t.phone[locale]}</div>
              <div className="font-medium">{phone}</div>
            </div>
          )}
          {langsArr && langsArr.length > 0 && (
            <div className="col-span-2">
              <div className="flex flex-wrap gap-1.5">
                {langsArr.slice(0, 6).map((l) => (
                  <span key={l} className="px-1.5 py-0.5 rounded bg-white/5 ring-1 ring-white/10 text-xs text-foreground/80">
                    {l}
                  </span>
                ))}
                {langsArr.length > 6 && (
                  <span className="text-xs text-foreground/60">+{langsArr.length - 6}</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* CTA متنی (کل کارت لینک است) */}
        <div dir={dir} className="mt-4">
          <span className="inline-flex items-center gap-1 text-sm text-foreground/90 group-hover:underline">
            {locale === 'fa' ? 'باز کردن →' : 'Open →'}
          </span>
        </div>

        <style>{`
          @keyframes gradientPan {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
          }
        `}</style>
      </HoverCard>
    </Link>
  );
}
