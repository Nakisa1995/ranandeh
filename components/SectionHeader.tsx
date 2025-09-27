'use client';

type Locale = 'en' | 'fa';

export default function SectionHeader({
  locale,
  badge,
  title,
  lead,
}: {
  locale: Locale;
  badge: string;
  title: string;
  lead?: string;
}) {
  const dir = locale === 'fa' ? 'rtl' : 'ltr';

  return (
    <div
      dir={dir}
      className="rounded-2xl p-5 sm:p-6 lg:p-8 border border-white/10
                 bg-white/50 dark:bg-black/30 backdrop-blur-xl
                 shadow-[0_20px_50px_rgba(0,0,0,.35)] ring-1 ring-white/10 relative"
    >
      {/* گرادیان نرم داخل هدر */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-70 -z-10 animate-bgShift
                       bg-[radial-gradient(80%_120%_at_20%_0%,#4f46e544,transparent_40%),radial-gradient(80%_120%_at_80%_100%,#06b6d444,transparent_40%),linear-gradient(90deg,#7c3aed33_0%,#2563eb33_100%)]" />

      {/* بج سبز + پالس */}
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium
                       border border-white/10 bg-white/10 dark:bg-black/20 backdrop-blur">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
        </span>
        {badge}
      </span>

      <h1
        className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight
                   bg-gradient-to-r from-brand-400 via-fuchsia-400 to-cyan-300
                   bg-clip-text text-transparent animate-bgShift"
      >
        {title}
      </h1>

      {lead ? <p className="mt-2 text-foreground/80">{lead}</p> : null}
    </div>
  );
}
