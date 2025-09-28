'use client';

import { useState } from "react";
import HoverCard from "@/components/HoverCard";
import GreenBadge from "@/components/GreenBadge";

type Locale = "en" | "fa";

export default function ContactPage({
  params: { locale },
}: { params: { locale: Locale } }) {
  const dir: "rtl" | "ltr" = locale === "fa" ? "rtl" : "ltr";

  const t = {
    badge: { en: "Contact", fa: "ارتباط" },
    title: { en: "Contact us", fa: "تماس با ما" },
    lead: {
      en: "Questions, ideas, or bug reports? Send us a message.",
      fa: "سؤال، پیشنهاد یا گزارش باگ داری؟ برامون پیام بفرست.",
    },
    name: { en: "Name", fa: "نام" },
    email: { en: "Email", fa: "ایمیل" },
    message: { en: "Message", fa: "پیام" },
    submit: { en: "Send", fa: "ارسال" },
    sending: { en: "Sending…", fa: "در حال ارسال…" },
    ok: {
      en: "Thanks! Your message was received.",
      fa: "مرسی! پیام شما دریافت شد.",
    },
    err: {
      en: "Something went wrong. Please try again.",
      fa: "مشکلی پیش آمد. دوباره تلاش کنید.",
    },
  };

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"ok" | "err" | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    // ولیدیشن خیلی ساده
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("err");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          locale,
          ua: typeof navigator !== "undefined" ? navigator.userAgent : "",
        }),
      });
      if (!res.ok) throw new Error("bad");
      setStatus("ok");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("err");
    } finally {
      setLoading(false);
    }
  }

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

        <form onSubmit={onSubmit} className="mt-5 grid gap-3 max-w-xl">
          <div>
            <label className="text-sm opacity-80">{t.name[locale]}</label>
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 dark:bg-black/20
                         px-3 py-2 outline-none placeholder:text-foreground/40"
              placeholder={t.name[locale]}
              autoComplete="name"
            />
          </div>

          <div>
            <label className="text-sm opacity-80">{t.email[locale]}</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 dark:bg-black/20
                         px-3 py-2 outline-none placeholder:text-foreground/40"
              placeholder={t.email[locale]}
              autoComplete="email"
            />
          </div>

          <div>
            <label className="text-sm opacity-80">{t.message[locale]}</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 dark:bg-black/20
                         px-3 py-2 outline-none placeholder:text-foreground/40 min-h-[120px]"
              placeholder={t.message[locale]}
            />
          </div>

          <div className="mt-2">
            <button
              disabled={loading}
              className="group relative inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold text-white
                         ring-1 ring-white/10 backdrop-blur-md overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40
                         disabled:opacity-60"
              type="submit"
            >
              <span
                className="pointer-events-none absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity
                           bg-[radial-gradient(80%_120%_at_20%_0%,#4f46e5,transparent_40%),radial-gradient(80%_120%_at_80%_100%,#06b6d4,transparent_40%),linear-gradient(90deg,#7c3aed_0%,#2563eb_100%)]"
                aria-hidden="true"
              />
              <span className="relative">
                {loading ? t.sending[locale] : t.submit[locale]}
              </span>
            </button>
          </div>

          {status === "ok" && (
            <div className="text-green-400 text-sm mt-1">{t.ok[locale]}</div>
          )}
          {status === "err" && (
            <div className="text-red-400 text-sm mt-1">{t.err[locale]}</div>
          )}
        </form>
      </HoverCard>
    </div>
  );
}
