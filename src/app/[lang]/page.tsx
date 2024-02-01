import Image from "next/image";
import Pagination from "@/components/layout/pagination";
import { Headlines } from "@/types/headlines";
import { DEFAULT_CATEGORY, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/defaults";
import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import Categories from "@/components/layout/categories";

export default async function Home({
  params,
  searchParams,
}: {
  params: { lang: Locale };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const currPage = Number(searchParams.page ?? DEFAULT_PAGE);
  const category = searchParams.category ?? DEFAULT_CATEGORY;
  const lang = params.lang ?? i18n.defaultLocale;
  const dictionary = await getDictionary(lang);
  const newsFeedRes = await fetch(
    `https://newsapi.org/v2/top-headlines?pageSize=${DEFAULT_PAGE_SIZE}&page=${currPage}&category=${category}&language=${lang}`,
    {
      headers: {
        Authorization: process.env.API_KEY ?? "",
      },
    },
  );

  const newsFeed: Headlines = await newsFeedRes.json();
  if (newsFeed.status === "error") {
    throw Error("something went wrong");
  }
  return (
    <>
      {newsFeed.totalResults > 0 ? (
        <>
          <h1 className="mb-4 text-2xl">{dictionary.heading}</h1>
          <Categories dictionary={dictionary.categories} />
          <section className="grid gap-4 lg:grid-cols-3 lg:p-10">
            {newsFeed.articles.map((article) => (
              <a
                className="group rounded bg-white"
                href={article.url}
                key={article.url}
                rel="noopener"
                target="_blank"
              >
                <Image
                  alt={article.title}
                  className="aspect-video w-full rounded object-cover"
                  height={250}
                  src={article.urlToImage ?? "https://placehold.co/450x250/jpg"}
                  width={450}
                />
                <div className="p-4">
                  <h2>{article.source.name}</h2>
                  <h3 className="text-lg group-hover:underline">
                    {article.title}
                  </h3>
                </div>
              </a>
            ))}
          </section>
          <Pagination
            currPage={currPage}
            totalResults={newsFeed.totalResults}
          />
        </>
      ) : (
        <p>No search results found for given category and language</p>
      )}
    </>
  );
}
