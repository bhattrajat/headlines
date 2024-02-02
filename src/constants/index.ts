export const DEFAULT_PAGE = 1;

export const DEFAULT_PAGE_SIZE = 9;

export const DEFAULT_CATEGORY = "general";

export const CATEGORIES = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
] as const;

export type Category = (typeof CATEGORIES)[number];
