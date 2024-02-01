"use client";
import { useCallback } from "react";
import { RadioGroup } from "@headlessui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getDictionary } from "@/get-dictionary";

export default function Categories({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>["categories"];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const selectedCategory = searchParams.get("category") ?? "general";

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const updateCategoryParam = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("category", value);
      params.delete("page");
      return params.toString();
    },
    [searchParams],
  );

  const setCategory = (val: string | null) => {
    if (val) {
      router.push(pathname + "?" + updateCategoryParam(val));
    }
  };

  const categories = [
    "general",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ] as const;
  return (
    <RadioGroup
      className="flex flex-wrap justify-center gap-4 p-4"
      value={selectedCategory}
      onChange={setCategory}
    >
      <RadioGroup.Label className="sr-only">
        Filter by Category
      </RadioGroup.Label>
      {categories.map((category) => (
        <RadioGroup.Option
          key={category}
          className="cursor-pointer"
          value={category}
        >
          {({ checked }) => (
            <span
              className={`rounded px-4 py-2 font-semibold capitalize ${
                checked
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800 hover:text-black"
              } `}
            >
              {dictionary[category]}
            </span>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}
