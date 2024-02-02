import Categories from "@/components/layout/categories";
import Pagination from "@/components/layout/pagination";
import { Category, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/constants";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Headlines } from "@/types/headlines";
import Image from "next/image";

export default async function NewsHeadlines({
  category,
  lang,
  searchParams,
}: {
  category: Category;
  lang: Locale;
  searchParams: Record<string, string | string[] | undefined>;
}) {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const currPage = Number(searchParams.page ?? DEFAULT_PAGE);
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
          <Categories locale={lang} dictionary={dictionary.categories} />
          <section className="grid gap-4 lg:grid-cols-3 lg:p-10">
            {newsFeed.articles.map((article, idx) => (
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
                  priority={idx < 3}
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
            dictionary={dictionary.pagination}
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
