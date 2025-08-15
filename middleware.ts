import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

const LOCALES = ['en','fa'];

export function middleware(req: NextRequest){
  const {pathname} = req.nextUrl;
  const hasLocale = LOCALES.some(l => pathname.startsWith('/' + l + '/') || pathname === '/' + l);
  if (!hasLocale) {
    const url = req.nextUrl.clone();
    url.pathname = '/en' + pathname;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ['/((?!_next|.*\..*).*)'] };
