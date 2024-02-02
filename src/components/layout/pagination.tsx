"use client";
import { DEFAULT_PAGE_SIZE } from "@/constants";
import { Dictionary } from "@/get-dictionary";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type Props = {
  currPage: number;
  dictionary: Dictionary["pagination"];
  totalResults: number;
};

export default function Pagination({
  totalResults,
  currPage,
  dictionary,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const from = (currPage - 1) * DEFAULT_PAGE_SIZE + 1;
  const to = from + DEFAULT_PAGE_SIZE - 1;
  const lastPage = Math.ceil(totalResults / 9);
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <div className="my-2 flex items-center justify-between gap-2">
      <div>
        Showing {from} to {to} of {totalResults} results
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={currPage === 1}
          onClick={() => {
            router.push(
              pathname + "?" + createQueryString("page", String(currPage - 1)),
            );
          }}
          className="rounded bg-white px-4 py-2 disabled:cursor-not-allowed"
        >
          {dictionary.previous}
        </button>
        <button
          type="button"
          onClick={() => {
            router.push(
              pathname + "?" + createQueryString("page", String(currPage + 1)),
            );
          }}
          disabled={currPage === lastPage}
          className="rounded bg-white px-4 py-2"
        >
          {dictionary.next}
        </button>
      </div>
    </div>
  );
}
