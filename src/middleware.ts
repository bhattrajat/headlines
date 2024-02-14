import { i18n } from "@/i18n-config";
import { checkIfPathNameHasLocale } from "@/utils/locale";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

function getLocale(request: NextRequest) {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = Object.keys(i18n.locales);

  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales,
  );

  const locale = match(languages, locales, i18n.defaultLocale);

  return locale;
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = checkIfPathNameHasLocale(pathname);
  if (pathnameHasLocale) return;

  const locale = getLocale(request);

  request.nextUrl.pathname = `/${locale}${pathname}`;
  // Rewrite if there is no local & it it default
  // This way we can reuse the path without prepending the locale
  if (locale === i18n.defaultLocale) {
    return NextResponse.rewrite(request.nextUrl);
  }
  // e.g. incoming request is /about
  // Redirect if there is no locale & it is not default
  // The new URL is now /fr/about or /it/about
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) & Favicons
    "/((?!api|_next/static|_next/image|favicon.ico|apple-icon|sitemap.xml|opengraph-image|robots.txt|googlebf2d26e09501374d.html).*)",
  ],
};
