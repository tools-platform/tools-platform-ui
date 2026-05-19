import { Boxes, BrainCircuit, CheckCircle2, MousePointerClick, TrendingUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CategoryPills } from "../components/CategoryPills";
import { SearchBox } from "../components/SearchBox";
import { ToolCard } from "../components/ToolCard";
import { categories, tools } from "../data/catalog";
import { getLocalizedText, useLocale } from "../i18n";
import { getTopSearchConsolePages, type TopSearchConsolePage } from "../services/analyticsApi";

export function HomePage() {
  const { locale } = useLocale();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [topPages, setTopPages] = useState<TopSearchConsolePage[]>([]);

  const copy =
    locale === "en"
      ? {
          eyebrow: "50+ more tools coming soon",
          titleLead: "Tools that",
          titleEmphasis: "simply work",
          heroCopy: "Fast calculators, converters, and utilities for practical tasks without the extra noise.",
          emptyTitle: "We couldn't find that tool",
          emptyCopy: "Try a different search or switch categories.",
          popularKicker: "Real usage",
          popularTitle: "Most searched tools",
          popularCopy: "Tools that people are finding and opening most often in the latest available data.",
          impressions: "impressions",
          topLabel: "Top",
          aboutKicker: "About",
          aboutTitle: "Simple tools for people who need clear answers.",
          aboutParagraphOne:
            "Our purpose is to help people who arrive looking for one concrete solution: calculate a salary, understand a settlement, convert a unit, or solve a practical question without learning prompts, AI models, or complicated workflows.",
          aboutParagraphTwo:
            "We want each tool to explain only what is needed, ask for as little data as possible, and return a result that is easy to understand. The technology stays behind the scenes; usefulness stays in front.",
          principlesLabel: "Tools Platforms principles",
          featureOneTitle: "Use in seconds",
          featureOneCopy: "Open it, fill only what matters, and get the result without unnecessary steps.",
          featureTwoTitle: "Clear results",
          featureTwoCopy: "Each calculation should show what was used and what the result means.",
          featureThreeTitle: "No AI knowledge required",
          featureThreeCopy:
            "We turn common questions into direct tools for people who simply need to solve something practical.",
          availableTools: "tools available"
        }
      : {
          eyebrow: "Más de 50 herramientas próximamente",
          titleLead: "Herramientas que",
          titleEmphasis: "simplemente funcionan",
          heroCopy: "Calculadoras, conversores y utilidades rápidas para resolver tareas prácticas sin vueltas.",
          emptyTitle: "No encontramos esa herramienta",
          emptyCopy: "Cambia la búsqueda o selecciona otra categoría.",
          popularKicker: "Uso real",
          popularTitle: "Herramientas más buscadas",
          popularCopy: "Herramientas que más personas están encontrando y abriendo según los datos recientes.",
          impressions: "impresiones",
          topLabel: "Top",
          aboutKicker: "Acerca de",
          aboutTitle: "Herramientas simples para personas que necesitan respuestas claras.",
          aboutParagraphOne:
            "Nuestro propósito es ayudar a la gente que llega buscando una solución concreta: calcular un salario, entender una liquidación, convertir una medida o resolver una duda práctica sin tener que aprender prompts, modelos de IA o procesos complicados.",
          aboutParagraphTwo:
            "Queremos que cada herramienta explique lo necesario, pida pocos datos y entregue un resultado fácil de entender. La tecnología queda detrás; la utilidad queda al frente.",
          principlesLabel: "Principios de Tools Platforms",
          featureOneTitle: "Usar en segundos",
          featureOneCopy: "Entrar, llenar lo justo y ver el resultado sin pasos innecesarios.",
          featureTwoTitle: "Resultados claros",
          featureTwoCopy: "Cada cálculo debe mostrar qué se usó y qué significa el resultado.",
          featureThreeTitle: "Sin saber usar IA",
          featureThreeCopy:
            "Convertimos preguntas comunes en herramientas directas para quien solo necesita resolver algo práctico.",
          availableTools: "herramientas disponibles"
        };

  const publishedToolsCount = useMemo(
    () => tools.filter((tool) => tool.status === "published").length,
    []
  );

  useEffect(() => {
    let isMounted = true;

    getTopSearchConsolePages({ limit: 3, days: 90 })
      .then((data) => {
        if (isMounted) setTopPages(data.pages);
      })
      .catch(() => {
        if (isMounted) setTopPages([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const popularTools = useMemo(() => {
    const toolBySlug = new Map(tools.map((tool) => [tool.slug, tool]));
    const pageEntries = topPages
      .map((page) => {
        let slug = "";

        try {
          slug = new URL(page.url).pathname.split("/tools/")[1]?.split("/")[0] ?? "";
        } catch {
          slug = "";
        }

        const tool = slug ? toolBySlug.get(slug) : undefined;
        return tool && tool.status === "published" ? { tool, page } : null;
      })
      .filter((item): item is { tool: (typeof tools)[number]; page: TopSearchConsolePage } => Boolean(item));
    const seen = new Set<string>();
    const uniquePageEntries = pageEntries.filter((item) => {
      if (seen.has(item.tool.id)) return false;
      seen.add(item.tool.id);
      return true;
    });

    return uniquePageEntries.slice(0, 3);
  }, [topPages]);

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return tools.filter((tool) => {
      const category = categories.find((item) => item.id === tool.categoryId);
      const searchableText = `${getLocalizedText(tool.name, locale)} ${getLocalizedText(
        tool.description,
        locale
      )} ${category ? getLocalizedText(category.name, locale) : ""}`.toLowerCase();
      const matchesCategory = activeCategory === "all" || tool.categoryId === activeCategory;
      const matchesQuery = normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, locale, query]);

  return (
    <>
      <section className={`hero hero--${locale}`}>
        <div className="hero__inner">
          <div className="eyebrow">
            <span className="eyebrow__dot" />
            {copy.eyebrow}
          </div>

          <h1>
            {copy.titleLead} <em>{copy.titleEmphasis}</em>.
          </h1>

          <p className="hero__copy">{copy.heroCopy}</p>

          <SearchBox value={query} onChange={setQuery} />
        </div>
      </section>

      {popularTools.length > 0 ? (
        <section className="popular-section" id="popular">
          <div className="section__header">
            <div>
              <p className="section__kicker">{copy.popularKicker}</p>
              <h2>{copy.popularTitle}</h2>
            </div>
            <p>{copy.popularCopy}</p>
          </div>

          <div className="popular-tool-grid">
            {popularTools.map(({ tool, page }, index) => (
              <div className="popular-tool-card" key={tool.id}>
                <ToolCard
                  category={categories.find((category) => category.id === tool.categoryId)}
                  featureBadge={
                    <span className="popular-tool-card__badge">
                      <span className="popular-tool-card__badge-rank">
                        <TrendingUp size={15} strokeWidth={2.15} />
                        {copy.topLabel} #{index + 1}
                      </span>
                      <span className="popular-tool-card__badge-metric">
                        {new Intl.NumberFormat(locale === "es" ? "es-CO" : "en-US").format(page.impressions)}{" "}
                        {copy.impressions}
                      </span>
                    </span>
                  }
                  tool={tool}
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="catalog-section" id="categories">
        <div className="catalog-toolbar">
          <CategoryPills
            activeCategory={activeCategory}
            categories={categories}
            onChange={setActiveCategory}
          />

          <p className="catalog-count">
            <strong>{publishedToolsCount}</strong> {copy.availableTools}
          </p>
        </div>

        {filteredTools.length > 0 ? (
          <div className="tool-grid" id="tools">
            {filteredTools.map((tool) => (
              <ToolCard
                category={categories.find((category) => category.id === tool.categoryId)}
                key={tool.id}
                tool={tool}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state__icon">
              <Boxes size={28} strokeWidth={2.05} />
            </div>
            <h2>{copy.emptyTitle}</h2>
            <p>{copy.emptyCopy}</p>
          </div>
        )}
      </section>

      <section className="about-section" id="about">
        <div className="about-section__panel">
          <div className="about-section__content">
            <p className="section__kicker">{copy.aboutKicker}</p>
            <h2>{copy.aboutTitle}</h2>
            <p>{copy.aboutParagraphOne}</p>
            <p>{copy.aboutParagraphTwo}</p>
          </div>

          <div className="about-feature-grid" aria-label={copy.principlesLabel}>
            <article className="about-feature">
              <span>
                <MousePointerClick size={20} strokeWidth={2.1} />
              </span>
              <h3>{copy.featureOneTitle}</h3>
              <p>{copy.featureOneCopy}</p>
            </article>

            <article className="about-feature">
              <span>
                <CheckCircle2 size={20} strokeWidth={2.1} />
              </span>
              <h3>{copy.featureTwoTitle}</h3>
              <p>{copy.featureTwoCopy}</p>
            </article>

            <article className="about-feature about-feature--wide">
              <span>
                <BrainCircuit size={20} strokeWidth={2.1} />
              </span>
              <h3>{copy.featureThreeTitle}</h3>
              <p>{copy.featureThreeCopy}</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
