import { getDictionary } from "@/get-dictionary";
import { Locale, i18n } from "@/i18n-config";
import { getAlternateLinksMetaData } from "@/utils/seo";
import { Metadata } from "next";
import { headers } from "next/headers";

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale | undefined };
}): Promise<Metadata> {
  const lang = params.lang ?? i18n.defaultLocale;

  const headersList = headers();
  const alternateLinksMetaData = getAlternateLinksMetaData({
    host: headersList.get("host")!,
    lang,
    path: "/about",
  });
  const dictionary = await getDictionary(lang);
  return {
    title: dictionary.about.meta.title,
    description: dictionary.about.meta.description,
    ...alternateLinksMetaData,
  };
}

export default async function AboutPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);
  return <div>{dictionary.about.content}</div>;
}
