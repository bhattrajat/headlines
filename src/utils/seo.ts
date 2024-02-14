import { Locale, i18n } from "@/i18n-config";

export function getAlternateLinksMetaData({
  host,
  path,
  lang,
}: {
  host: string;
  lang: Locale;
  path: string;
}) {
  const port = process.env.NODE_ENV === "development" ? "http" : "https";
  const isDefaultLang = lang === i18n.defaultLocale;
  const localeKeys = Object.keys(i18n.locales);

  return {
    metadataBase: new URL(`${port}://${host}`),
    alternates: {
      canonical: `${isDefaultLang ? `/${path}` : `/${lang}${path}`}`,
      languages: Object.fromEntries([
        ...localeKeys.map((key) =>
          key === i18n.defaultLocale
            ? [key, `/${path}`]
            : [key, `/${key}${path}`],
        ),
        ["x-default", `/${path}`],
      ]),
    },
  };
}
