import { useMemo } from "react";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { HomePage } from "./pages/HomePage";
import { LegalPage, type LegalPageType } from "./pages/LegalPage";
import { ToolPage } from "./pages/ToolPage";

export function App() {
  const route = useMemo(() => {
    const toolMatch = window.location.pathname.match(/^\/tools\/([^/]+)$/);

    if (toolMatch?.[1]) {
      return { type: "tool" as const, slug: toolMatch[1] };
    }

    if (window.location.pathname === "/privacy") {
      return { type: "legal" as const, page: "privacy" as LegalPageType };
    }

    if (window.location.pathname === "/terms") {
      return { type: "legal" as const, page: "terms" as LegalPageType };
    }

    return { type: "home" as const };
  }, []);

  return (
    <div className="app-shell">
      <SiteHeader />
      <main>
        {route.type === "tool" ? <ToolPage slug={route.slug} /> : null}
        {route.type === "legal" ? <LegalPage page={route.page} /> : null}
        {route.type === "home" ? <HomePage /> : null}
      </main>
      <SiteFooter />
    </div>
  );
}
