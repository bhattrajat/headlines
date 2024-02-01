import { i18n } from "@/i18n-config";
import { checkIfPathNameHasLocale } from "@/utils";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

const localeKeys = Object.keys(i18n.locales);

function getLocale(request: Request) {
  const headers = new Headers(request.headers);
  const headersObject = Object.fromEntries(headers.entries());
  const languages = new Negotiator({ headers: headersObject }).languages();

  return match(languages, localeKeys, i18n.defaultLocale);
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
    "/((?!api|_next/static|_next/image|favicon.ico|apple-icon|sitemap.xml|opengraph-image|robots.txt).*)",
  ],
};
