/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, type ReactNode } from "react";
import { defaultLocale, isSupportedLocale, type Locale } from "./locales/config";

export type { Locale };

export type LocalizedText = Record<Locale, string>;

export const LOCALE_PREFERENCE_KEY = "tools-platforms-locale";

type LocaleContextValue = {
  locale: Locale;
  localizePath: (path: string) => string;
  switchLocalePath: (targetLocale: Locale, path?: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function getLocaleFromPathname(pathname: string): Locale {
  const firstSegment = pathname.split("/").filter(Boolean)[0] ?? "";
  return isSupportedLocale(firstSegment) ? firstSegment : defaultLocale;
}

export function stripLocalePrefix(pathname: string) {
  const firstSegment = pathname.split("/").filter(Boolean)[0] ?? "";

  if (isSupportedLocale(firstSegment) && firstSegment !== defaultLocale && pathname === `/${firstSegment}`) {
    return "/";
  }

  if (isSupportedLocale(firstSegment) && firstSegment !== defaultLocale && pathname.startsWith(`/${firstSegment}/`)) {
    return pathname.replace(new RegExp(`^/${firstSegment}`), "") || "/";
  }

  return pathname || "/";
}

export function getLocalizedText(value: LocalizedText | string, locale: Locale) {
  return typeof value === "string" ? value : value[locale];
}

export function getStoredLocalePreference(): Locale | null {
  try {
    const storedLocale = window.localStorage.getItem(LOCALE_PREFERENCE_KEY);
    return storedLocale && isSupportedLocale(storedLocale) ? storedLocale : null;
  } catch {
    return null;
  }
}

export function setStoredLocalePreference(locale: Locale) {
  try {
    window.localStorage.setItem(LOCALE_PREFERENCE_KEY, locale);
  } catch {
    // Ignore storage issues and fall back to URL-based locale.
  }
}

export function detectBrowserLocale(): Locale {
  const preferredLocales =
    typeof navigator === "undefined"
      ? []
      : navigator.languages?.length
        ? navigator.languages
        : [navigator.language];

  const matchedLocale = preferredLocales
    .map((entry) => entry.toLowerCase().split("-")[0])
    .find((entry): entry is Locale => isSupportedLocale(entry));

  return matchedLocale ?? defaultLocale;
}

export function localizePath(path: string, locale: Locale) {
  const [pathWithQuery = "/", hashPart = ""] = path.split("#");
  const [pathname = "/", queryPart = ""] = pathWithQuery.split("?");
  const normalizedPath = pathname || "/";

  const basePath = stripLocalePrefix(normalizedPath);
  const localizedPathname =
    locale === defaultLocale ? basePath : basePath === "/" ? `/${locale}` : `/${locale}${basePath}`;

  return `${localizedPathname}${queryPart ? `?${queryPart}` : ""}${hashPart ? `#${hashPart}` : ""}`;
}

export function LocaleProvider({
  children,
  locale
}: {
  children: ReactNode;
  locale: Locale;
}) {
  const value: LocaleContextValue = {
    locale,
    localizePath: (path) => localizePath(path, locale),
    switchLocalePath: (targetLocale, path) =>
      localizePath(path ?? `${window.location.pathname}${window.location.search}${window.location.hash}`, targetLocale)
  };

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used inside LocaleProvider.");
  }

  return context;
}
