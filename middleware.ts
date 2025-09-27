import {NextResponse, NextRequest} from 'next/server';

const locales = ['en', 'fa'] as const;
const defaultLocale = 'en';

export function middleware(req: NextRequest) {
  const {pathname} = req.nextUrl;

  // فایل‌های استاتیک و API را رد کن
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    /\.[\w]+$/.test(pathname)
  ) return;

  const hasLocale = locales.some(l => pathname.startsWith(`/${l}`));
  if (!hasLocale) {
    const cookie = req.cookies.get('NEXT_LOCALE')?.value;
    const locale = locales.includes(cookie as any) ? (cookie as any) : defaultLocale;
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }
}

export const config = { matcher: ['/((?!_next|.*\\..*|api).*)'] };
