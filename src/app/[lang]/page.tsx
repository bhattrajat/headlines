import { Locale } from "@/i18n-config";
import NewsHeadlines from "@/components/home/news-headlines";
import { Suspense } from "react";
import NewsHeadlinesSkeleton from "@/components/skeletons/news-headlines";

export default async function Home({
  params,
  searchParams,
}: {
  params: { lang: Locale };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return (
    <Suspense fallback={<NewsHeadlinesSkeleton />}>
      <NewsHeadlines params={params} searchParams={searchParams} />
    </Suspense>
  );
}
