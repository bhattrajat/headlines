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
  console.log(Object.fromEntries(headersList.entries()));
  const alternateLinksMetaData = getAlternateLinksMetaData({
    host: headersList.get("host")!,
    lang,
    path: "/about",
  });
  return {
    title: "About Us",
    description:
      "Learn about the headlines company, Our core values and about us",
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
