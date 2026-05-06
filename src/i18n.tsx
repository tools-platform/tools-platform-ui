/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, type ReactNode } from "react";

export type Locale = "es" | "en";

export type LocalizedText = {
  es: string;
  en: string;
};

type LocaleContextValue = {
  locale: Locale;
  localizePath: (path: string) => string;
  switchLocalePath: (targetLocale: Locale, path?: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function getLocaleFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

export function stripLocalePrefix(pathname: string) {
  if (pathname === "/en") {
    return "/";
  }

  if (pathname.startsWith("/en/")) {
    return pathname.replace(/^\/en/, "") || "/";
  }

  return pathname || "/";
}

export function getLocalizedText(value: LocalizedText | string, locale: Locale) {
  return typeof value === "string" ? value : value[locale];
}

export function localizePath(path: string, locale: Locale) {
  const [pathWithQuery = "/", hashPart = ""] = path.split("#");
  const [pathname = "/", queryPart = ""] = pathWithQuery.split("?");
  const normalizedPath = pathname || "/";

  const localizedPathname =
    locale === "en"
      ? normalizedPath === "/"
        ? "/en"
        : `/en${normalizedPath}`
      : stripLocalePrefix(normalizedPath);

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
