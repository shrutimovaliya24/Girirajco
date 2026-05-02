import { headers } from "next/headers";
import enTranslations from "./locales/en.json";
import guTranslations from "./locales/gu.json";

export type Locale = "en" | "gu";

const resources: Record<Locale, typeof enTranslations> = {
  en: enTranslations,
  gu: guTranslations,
};

function getByDotPath(obj: unknown, dotPath: string): unknown {
  const parts = dotPath.split(".");
  let cur: any = obj;
  for (const part of parts) {
    if (cur == null || typeof cur !== "object" || !(part in cur)) return undefined;
    cur = cur[part];
  }
  return cur;
}

function detectLocaleFromAcceptLanguage(acceptLanguage: string | null): Locale {
  const al = (acceptLanguage || "").toLowerCase();
  // Simple detection; defaults to English.
  // Examples: "gu-IN, en-US;q=0.9" or "gu;q=0.7"
  if (al.includes("gu")) return "gu";
  return "en";
}

export async function detectLocale(): Promise<Locale> {
  // In Next 16, `headers()` can be typed as a Promise in some contexts.
  const headerStore = await headers();
  const acceptLanguage = headerStore.get("accept-language");
  return detectLocaleFromAcceptLanguage(acceptLanguage);
}

/**
 * Server-side translation using the same keys as the client `common` namespace
 * in `i18n.js` (entire locale JSON: `blog.title`, `products.title`, etc.).
 */
export async function tCommon(key: string, locale?: Locale): Promise<string> {
  const selectedLocale = locale ?? (await detectLocale());
  const selected = getByDotPath(resources[selectedLocale], key);

  if (typeof selected === "string") return selected;

  const fallback = getByDotPath(resources.en, key);
  if (typeof fallback === "string") return fallback;

  return key;
}

