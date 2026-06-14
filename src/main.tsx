import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import {
  detectBrowserLocale,
  getLocaleFromPathname,
  getStoredLocalePreference,
  localizePath,
  normalizeCanonicalPathname
} from "./i18n";
import "./styles.css";

const normalizedPathname = normalizeCanonicalPathname(window.location.pathname);
const currentPath = `${normalizedPathname}${window.location.search}${window.location.hash}`;
const currentLocale = getLocaleFromPathname(window.location.pathname);
const preferredLocale = getStoredLocalePreference() ?? detectBrowserLocale();
const localizedPath = localizePath(currentPath, preferredLocale);

if (normalizedPathname !== window.location.pathname) {
  window.location.replace(currentPath);
} else if (preferredLocale !== currentLocale && localizedPath !== currentPath) {
  window.location.replace(localizedPath);
} else {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
