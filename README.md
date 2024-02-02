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

- "/": It displays all news headlines by default and also provides a filter to search news for specific categories. It uses search parameters to filter by category. (Filters UI inspired from Google news / Youtube)
- "/about": It is a simple route with just one text but it is important to test language switcher to make sure it prepends the language/locale in the route for all the non default (english) locales

### SEO Checklist

- [x] Appropriate title and description meta tags for all routes ("/" & "about")
- [x] Appropriate lang attribute for html tag based on selected locale
- [x] Customized Not found page for dynamic routes (this one was tricky 😀)
- [x] No prepending locale in the routes for default locale (prefer "/about" compared to "/en/about")
- [x] Indicating alternate pages for all the supported locale via html link tags `<link rel="alternate" hreflang="lang_code"... >` & sitemap.xml. (Reference from [google](https://developers.google.com/search/docs/specialty/international/localized-versions))
- [x] Added robots.txt

### Language features

- Add 3 languages (English, French, Italian)

### Code Quality Checklist

- [x] Use Eslint, Typescript & Prettier
