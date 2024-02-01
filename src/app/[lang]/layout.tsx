import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Locale, i18n } from "@/i18n-config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Headlines",
    template: "%s | Headlines",
  },
  description:
    "Latest news headlines aggregated from sources all over the world by News API",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale | undefined };
}>) {
  const selectedLang = params.lang ?? i18n.defaultLocale;
  return (
    <html lang={selectedLang}>
      <body className={`${inter.className}`}>
        <Header lang={selectedLang} />
        <main className="flex min-h-screen flex-col items-center justify-center bg-slate-300 p-4 pt-20 lg:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
