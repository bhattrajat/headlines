import { Locale, i18n } from "@/i18n-config";
import NewsHeadlines from "@/components/home/news-headlines";
import { Suspense } from "react";
import NewsHeadlinesSkeleton from "@/components/skeletons/news-headlines";
import { CATEGORIES, Category, DEFAULT_CATEGORY } from "@/constants";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { Metadata } from "next";
import { getAlternateLinksMetaData } from "@/utils/seo";
import { getDictionary } from "@/get-dictionary";

export async function generateMetadata({
  params,
}: {
  params: { category?: string[]; lang: Locale };
}): Promise<Metadata> {
  if (!checkIfPathIsValid(params.category) || !getCategory(params.category))
    return {
      title: {
        absolute: "404 - Not Found",
      },
    };

  const dictionary = await getDictionary(params.lang);
  const category = params.category ? params.category[0] : DEFAULT_CATEGORY;
  const lang = params.lang ?? i18n.defaultLocale;

  const headersList = headers();
  const alternateLinksMetaData = getAlternateLinksMetaData({
    host: headersList.get("host")!,
    lang,
    path: "/",
  });
  return {
    title: `${dictionary.categories[category as Category]} News`,
    description: `Every ${category} category related news happening in the world `,
    ...alternateLinksMetaData,
  };
}

const checkIfPathIsValid = (category?: string[]) => {
  return (category && category.length === 1) || !category;
};

const getCategory = (category?: string[]): Category | undefined => {
  if (!category) return DEFAULT_CATEGORY;
  if (CATEGORIES.includes(category[0] as Category))
    return category[0] as Category;
  return undefined;
};

export default async function Home({
  params,
  searchParams,
}: {
  params: { category?: string[]; lang: Locale };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  if (!checkIfPathIsValid(params.category)) return notFound();
  const category = getCategory(params.category);
  if (!category) return notFound();
  return (
    <Suspense fallback={<NewsHeadlinesSkeleton />}>
      <NewsHeadlines
        category={category}
        lang={params.lang}
        searchParams={searchParams}
      />
    </Suspense>
  );
}
