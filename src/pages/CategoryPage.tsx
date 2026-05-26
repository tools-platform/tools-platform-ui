import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { SearchBox } from "../components/SearchBox";
import { ToolCard } from "../components/ToolCard";
import { categories, tools } from "../data/catalog";
import { getLocalizedText, useLocale } from "../i18n";
import { categoryPageCopy } from "../locales/uiCopy";

type CategoryPageProps = {
  categoryId: string;
};

export function CategoryPage({ categoryId }: CategoryPageProps) {
  const { locale, localizePath } = useLocale();
  const [query, setQuery] = useState("");
  const copy = categoryPageCopy[locale];
  const category = categories.find((item) => item.id === categoryId);

  if (!category) {
    return (
      <section className="category-page category-page--empty">
        <a className="back-link" href={localizePath("/#categories")}>
          <ArrowLeft size={16} strokeWidth={2.1} />
          {copy.back}
        </a>
        <div className="empty-state">
          <h1>{copy.notFoundTitle}</h1>
          <p>{copy.notFoundCopy}</p>
        </div>
      </section>
    );
  }

  const categoryTools = tools.filter((tool) => tool.categoryId === category.id);
  const categoryName = getLocalizedText(category.name, locale);
  const countLabel = categoryTools.length === 1 ? copy.countSingular : copy.countPlural;
  const normalizedQuery = query.trim().toLowerCase();
  const filteredTools = normalizedQuery
    ? categoryTools.filter((tool) => {
        const searchableText = `${getLocalizedText(tool.name, locale)} ${getLocalizedText(
          tool.description,
          locale
        )}`.toLowerCase();

        return searchableText.includes(normalizedQuery);
      })
    : categoryTools;

  return (
    <section className="category-page">
      <div className="category-page__topbar">
        <a className="back-link" href={localizePath("/#categories")}>
          <ArrowLeft size={16} strokeWidth={2.1} />
          {copy.back}
        </a>
        <div className="category-page__count-pill">
          {categoryTools.length} {countLabel}
        </div>
      </div>

      <header className="category-page__header">
        <p>{copy.kicker}</p>
        <h1>{categoryName}</h1>
        <span>{getLocalizedText(category.description, locale)}</span>
        <div className="category-page__search">
          <SearchBox value={query} onChange={setQuery} />
        </div>
      </header>

      {filteredTools.length > 0 ? (
        <div className="tool-grid category-page__grid">
          {filteredTools.map((tool) => (
            <ToolCard category={category} key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="empty-state category-page__empty-state">
          <div className="empty-state__icon">
            <category.Icon size={28} strokeWidth={2.05} />
          </div>
          <h2>{copy.emptySearchTitle}</h2>
          <p>{copy.emptySearchCopy.replace("{category}", categoryName)}</p>
        </div>
      )}
    </section>
  );
}
