"use client";
import { useParams } from "next/navigation";
import { getDictionary } from "@/get-dictionary";
import { CATEGORIES, DEFAULT_CATEGORY } from "@/constants";
import LocaleLink from "@/components/layout/locale-link";
import { Locale } from "@/i18n-config";

export default function Categories({
  locale,
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["categories"];
  locale: Locale;
}) {
  const params = useParams();

  const selectedCategory = params["category"]?.[0] ?? DEFAULT_CATEGORY;
  return (
    <nav className="flex gap-2">
      {CATEGORIES.map((category) => (
        <LocaleLink
          locale={locale}
          key={category}
          href={category === DEFAULT_CATEGORY ? "/" : `/${category}`}
          className={`cursor-pointer rounded px-4 py-2 font-semibold capitalize 
          ${selectedCategory === category ? "bg-blue-600 text-white" : "bg-white text-gray-800 hover:text-black"} 
          `}
        >
          {dictionary[category]}
        </LocaleLink>
      ))}
    </nav>
  );
}
