import LanguageSwitcher from "@/components/layout/language-switcher";
import { Locale } from "@/i18n-config";
import LocaleLink from "@/components/layout/locale-link";
import { getDictionary } from "@/get-dictionary";

export default async function Header({ lang }: { lang: Locale }) {
  const dictionary = await getDictionary(lang);
  return (
    <header className="fixed inset-x-0 top-0 w-full border-[1px] border-b-gray-700 bg-white p-4 lg:px-8 ">
      <div className="flex items-center justify-between">
        <LocaleLink locale={lang} className="text-2xl font-bold" href="/">
          Headlines
        </LocaleLink>
        <div className="flex items-center gap-8">
          <LocaleLink locale={lang} className="hover:underline" href="/about">
            {dictionary.about.link}
          </LocaleLink>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
