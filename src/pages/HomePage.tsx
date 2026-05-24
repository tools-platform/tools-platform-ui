import { Boxes, BrainCircuit, CheckCircle2, MousePointerClick, TrendingUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CategoryPills } from "../components/CategoryPills";
import { SearchBox } from "../components/SearchBox";
import { ToolCard } from "../components/ToolCard";
import { categories, tools } from "../data/catalog";
import { getLocalizedText, useLocale } from "../i18n";
import { getTopSearchConsolePages, type TopSearchConsolePage } from "../services/analyticsApi";
import { homePageCopy } from "../locales/uiCopy";

export function HomePage() {
  const { locale } = useLocale();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [topPages, setTopPages] = useState<TopSearchConsolePage[]>([]);

  const copy =
    homePageCopy[locale];

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
    return topPages
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
      .filter((item): item is { tool: (typeof tools)[number]; page: TopSearchConsolePage } => Boolean(item))
      .sort((first, second) => second.page.impressions - first.page.impressions)
      .slice(0, 3);
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
