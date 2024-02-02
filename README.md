# News Headlines APP

It is a news headlines app created using Next.js 14, App router & Tailwind CSS

Live URL: [https://rajat-headlines.vercel.app/](https://rajat-headlines.vercel.app/ "Vercel")

## Getting Started locally

Clone the repo and, run the development server:

```bash
pnpm dev
```

## Features

### Performance & UX

- Used Suspense with Next.js streaming to implement loading skeleton for news headlines grid.
- Created Pagination to display a grid of 9 headlines per page with and option to go previous & Next page for better performance

### Routes

- "/:lang/:category: It displays news headlines filtered by that category. Also provides all categories link to change categories. For default language (English) and default category (general), we don't need to provide any parameters For example "/" route provides English translation with general/all categories news.
- "/about": It is a simple route with just one text with translation based on language.

### SEO Checklist

- [x] Appropriate title and description meta tags for all routes
- [x] Appropriate lang attribute for html tag based on selected locale
- [x] Customized Not found page for dynamic routes.
- [x] No prepending locale in the routes for default locale (prefer "/about" compared to "/en/about")
- [x] Indicating alternate pages for all the supported locale via html link tags `<link rel="alternate" hreflang="lang_code"... >` & sitemap.xml. (Reference from [google](https://developers.google.com/search/docs/specialty/international/localized-versions))
- [x] Added robots.txt
- [x] Added favicon & open graph images.

### Language features

- Add 3 languages (English, French, Italian)

### Code Quality Checklist

- [x] Used Eslint, Typescript & Prettier
