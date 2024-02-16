import { i18n } from "@/i18n-config";

export const checkIfPathNameHasLocale = (pathname: string) => {
  const localeKeys = Object.keys(i18n.locales);

  const pathnameHasLocale = localeKeys.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  return pathnameHasLocale;
};

export const getLocaleFromPath = (pathname: string) => {
  const localeKeys = Object.keys(i18n.locales);

  const locale = localeKeys.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  return locale ?? i18n.defaultLocale;
};
