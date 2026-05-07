import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { detectBrowserLocale, getLocaleFromPathname, getStoredLocalePreference, localizePath } from "./i18n";
import "./styles.css";

const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
const currentLocale = getLocaleFromPathname(window.location.pathname);
const preferredLocale = getStoredLocalePreference() ?? detectBrowserLocale();
const localizedPath = localizePath(currentPath, preferredLocale);

if (preferredLocale !== currentLocale && localizedPath !== currentPath) {
  window.location.replace(localizedPath);
} else {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
