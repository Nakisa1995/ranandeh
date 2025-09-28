// path: app/not-found.tsx
import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <div className="container my-10">
      <div className="rounded-2xl p-6 sm:p-8 border border-white/10
                      bg-white/5 dark:bg-black/30 backdrop-blur-xl
                      shadow-[0_20px_50px_rgba(0,0,0,.35)]">
        <div
          className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r
                     from-brand-400 via-fuchsia-400 to-cyan-300
                     bg-clip-text text-transparent"
        >
          Not found
        </div>
        <p className="mt-3 text-foreground/80">
          We couldn’t find this page. Try the English home instead.
        </p>
        <div className="mt-5">
          <Link
            href="/en"
            prefetch
            className="group relative inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold text-white
                       ring-1 ring-white/10 backdrop-blur-md overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <span
              className="pointer-events-none absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity
                         bg-[radial-gradient(80%_120%_at_20%_0%,#4f46e5,transparent_40%),radial-gradient(80%_120%_at_80%_100%,#06b6d4,transparent_40%),linear-gradient(90deg,#7c3aed_0%,#2563eb_100%)]"
              aria-hidden="true"
            />
            <span className="relative">Go to /en</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
