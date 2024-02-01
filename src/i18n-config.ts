export const i18n = {
  defaultLocale: "en",
  locales: { en: "English", fr: "French", it: "Italian" },
} as const;

export type Locale = keyof (typeof i18n)["locales"];
