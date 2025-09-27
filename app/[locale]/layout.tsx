// app/[locale]/layout.tsx
import '../globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { I18nProvider } from '@/lib/i18n';
import SessionProvider from '@/components/SessionProvider';

export const metadata = {
  icons: { icon: '/icon.png' },
};

type Locale = 'en' | 'fa';

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const dir = locale === 'fa' ? 'rtl' : 'ltr';

  // messages اختیاری
  let messages: any = {};
  try {
    // @ts-ignore
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch {}

  const TILE = 420;

  return (
    <I18nProvider key={locale} locale={locale} messages={messages}>
      <SessionProvider>
        <div
          dir={dir}
          data-locale={locale}
          className="min-h-dvh bg-background text-foreground relative antialiased"
          suppressHydrationWarning
        >
          {/* بک‌گراند الگو */}
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none fixed inset-0 -z-10 h-full w-full text-zinc-900/10 dark:text-white/5"
          >
            <defs>
              <pattern id="traffic" width={TILE} height={TILE} patternUnits="userSpaceOnUse">
                <g stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <rect x={TILE * 0.05} y={TILE * 0.08} width={TILE * 0.22} height={TILE * 0.45} rx={TILE * 0.04} />
                  <circle cx={TILE * 0.16} cy={TILE * 0.16} r={TILE * 0.03} />
                  <circle cx={TILE * 0.16} cy={TILE * 0.26} r={TILE * 0.03} />
                  <circle cx={TILE * 0.16} cy={TILE * 0.36} r={TILE * 0.03} />

                  <path d={`M ${TILE * 0.35} ${TILE * 0.35} l ${TILE * 0.12} ${-TILE * 0.2} l ${TILE * 0.12} ${TILE * 0.2} z`} />

                  <circle cx={TILE * 0.75} cy={TILE * 0.22} r={TILE * 0.08} />
                  <rect x={TILE * 0.70} y={TILE * 0.215} width={TILE * 0.10} height={TILE * 0.01} rx={TILE * 0.005} fill="currentColor" stroke="none" />

                  <rect x={TILE * 0.58} y={TILE * 0.55} width={TILE * 0.22} height={TILE * 0.08} rx={TILE * 0.02} />
                  <circle cx={TILE * 0.62} cy={TILE * 0.65} r={TILE * 0.03} />
                  <circle cx={TILE * 0.76} cy={TILE * 0.65} r={TILE * 0.03} />

                  <path d={`M ${TILE * 0.20} ${TILE * 0.70} h ${TILE * 0.10} l ${TILE * 0.03} ${-TILE * 0.04}`} />
                  <circle cx={TILE * 0.22} cy={TILE * 0.70} r={TILE * 0.03} />
                  <circle cx={TILE * 0.30} cy={TILE * 0.70} r={TILE * 0.03} />
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#traffic)" />
          </svg>

          <Header locale={locale} />
          <main className="container mx-auto px-4 py-8">{children}</main>
          <Footer />
        </div>
      </SessionProvider>
    </I18nProvider>
  );
}
