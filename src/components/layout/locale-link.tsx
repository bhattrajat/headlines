import { Locale, i18n } from "@/i18n-config";
import Link from "next/link";
import { ReactNode } from "react";

type LocaleLinkProps = {
  children: ReactNode;
  className: string;
  href: string;
  locale: Locale;
};

export default function LocaleLink({
  href,
  className,
  locale,
  children,
}: LocaleLinkProps) {
  const hrefWithLocale =
    locale === i18n.defaultLocale ? href : `/${locale}${href}`;
  return (
    <Link className={className} href={hrefWithLocale}>
      {children}
    </Link>
  );
}
