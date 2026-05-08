import { useEffect, useMemo } from "react";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { applySeo, applyToolStructuredData, clearStructuredData, getToolSeo, homeSeo, legalSeo } from "./data/seo";
import { getLocaleFromPathname, LocaleProvider, stripLocalePrefix, type Locale } from "./i18n";
import { HomePage } from "./pages/HomePage";
import { LegalPage, type LegalPageType } from "./pages/LegalPage";
import { ToolPage } from "./pages/ToolPage";

export function App() {
  const route = useMemo(() => {
    const locale = getLocaleFromPathname(window.location.pathname);
    const normalizedPath = stripLocalePrefix(window.location.pathname);
    const toolMatch = normalizedPath.match(/^\/tools\/([^/]+)$/);

    if (toolMatch?.[1]) {
      return { locale, type: "tool" as const, slug: toolMatch[1] };
    }

    if (normalizedPath === "/privacy") {
      return { locale, type: "legal" as const, page: "privacy" as LegalPageType };
    }

    if (normalizedPath === "/terms") {
      return { locale, type: "legal" as const, page: "terms" as LegalPageType };
    }

    return { locale, type: "home" as const };
  }, []);

  useEffect(() => {
    if (route.type === "tool") {
      applySeo(getToolSeo(route.slug, route.locale), route.locale);
      applyToolStructuredData(route.slug, route.locale);
      return;
    }

    if (route.type === "legal") {
      applySeo(legalSeo[route.page], route.locale);
      clearStructuredData();
      return;
    }

    applySeo(homeSeo, route.locale);
    clearStructuredData();
  }, [route]);

  return (
    <LocaleProvider locale={route.locale as Locale}>
      <div className="app-shell">
        <SiteHeader />
        <main>
          {route.type === "tool" ? <ToolPage slug={route.slug} /> : null}
          {route.type === "legal" ? <LegalPage page={route.page} /> : null}
          {route.type === "home" ? <HomePage /> : null}
        </main>
        <SiteFooter />
      </div>
    </LocaleProvider>
  );
}
