import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import {
  detectBrowserLocale,
  getLocaleFromPathname,
  getStoredLocalePreference,
  localizePath,
  normalizeCanonicalPathname,
  setStoredLocalePreference
} from "./i18n";
import { defaultLocale, isSupportedLocale } from "./locales/config";
import "./styles.css";

const normalizedPathname = normalizeCanonicalPathname(window.location.pathname);
const currentPath = `${normalizedPathname}${window.location.search}${window.location.hash}`;
const currentLocale = getLocaleFromPathname(window.location.pathname);
const firstPathSegment = window.location.pathname.split("/").filter(Boolean)[0] ?? "";
const hasExplicitLocalePrefix = isSupportedLocale(firstPathSegment) && firstPathSegment !== defaultLocale;
const preferredLocale = hasExplicitLocalePrefix ? currentLocale : getStoredLocalePreference() ?? detectBrowserLocale();
const localizedPath = localizePath(currentPath, preferredLocale);

if (normalizedPathname !== window.location.pathname) {
  window.history.replaceState(null, "", currentPath);
}

if (hasExplicitLocalePrefix) {
  setStoredLocalePreference(currentLocale);
}

if (preferredLocale !== currentLocale && localizedPath !== currentPath) {
  window.location.replace(localizedPath);
} else {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
