import { useMemo } from "react";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { HomePage } from "./pages/HomePage";
import { ToolPage } from "./pages/ToolPage";

export function App() {
  const slug = useMemo(() => {
    const match = window.location.pathname.match(/^\/tools\/([^/]+)$/);
    return match?.[1] ?? null;
  }, []);

  return (
    <div className="app-shell">
      <SiteHeader />
      <main>{slug ? <ToolPage slug={slug} /> : <HomePage />}</main>
      <SiteFooter />
    </div>
  );
}
