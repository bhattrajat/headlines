"use client";
import { Menu } from "@headlessui/react";
import { useParams, usePathname } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Locale, i18n } from "@/i18n-config";
import { checkIfPathNameHasLocale } from "@/utils";

export default function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();

  const selectedLocale = (params["lang"] ?? i18n.defaultLocale) as Locale;
  const redirectedPathName = (locale: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    const pathnameHasLocale = checkIfPathNameHasLocale(pathname);

    if (!pathnameHasLocale) {
      if (locale === i18n.defaultLocale) return pathname;
      segments.splice(1, 0, locale);
      return segments.join("/");
    }

    if (locale === i18n.defaultLocale) {
      segments.splice(1, 1);
      return segments.join("/");
    }

    segments[1] = locale;
    return segments.join("/");
  };

  const localeMenuItems = Object.entries(i18n.locales).filter(
    (item) => item[0] !== selectedLocale,
  );
  return (
    <Menu as="div" className="relative z-20 rounded shadow">
      <Menu.Button className="flex items-center justify-between px-5 py-2">
        <span className="block truncate">{i18n.locales[selectedLocale]}</span>{" "}
        <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </Menu.Button>
      <Menu.Items className="absolute right-0 mt-2 origin-top-right bg-white p-1 shadow">
        {localeMenuItems.map(([langKey, language]) => (
          <Menu.Item key={langKey}>
            {({ active }) => (
              <Link
                href={redirectedPathName(langKey)}
                className={`block w-full cursor-default select-none rounded px-5 py-2 hover:underline
                   ${
                     active ? "bg-blue-600 text-white" : "bg-white text-black"
                   }`}
              >
                {language}
              </Link>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
