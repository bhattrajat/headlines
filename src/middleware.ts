import { i18n } from "@/i18n-config";
import { getLocaleFromPath } from "@/utils/locale";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const locale = getLocaleFromPath(pathname);

  if (locale !== i18n.defaultLocale) return;
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // Rewrite if there is no local & it it default
  // This way we can reuse the path without prepending the locale
  return NextResponse.rewrite(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) & Favicons
    "/((?!api|_next/static|_next/image|favicon.ico|apple-icon|sitemap.xml|opengraph-image|robots.txt|googlebf2d26e09501374d.html).*)",
  ],
};
