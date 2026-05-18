import { ArrowRight } from "lucide-react";
import { categories, tools, type ToolSummary } from "../data/catalog";
import { getLocalizedText, useLocale } from "../i18n";

const relatedToolIds: Record<string, string[]> = {
  "net-salary-colombia": ["gross-salary-colombia", "salary-increase", "hourly-salary"],
  "gross-salary-colombia": ["net-salary-colombia", "salary-increase", "employee-salary-equivalent"],
  "employment-settlement-colombia": ["net-salary-colombia", "gross-salary-colombia", "hourly-salary"],
  "credit-interest": ["loan-payment", "cop-usd", "salary-increase"],
  "loan-payment": ["credit-interest", "cop-usd", "salary-increase"],
  "cop-usd": ["credit-interest", "loan-payment", "unit-converter"],
  "salary-increase": ["net-salary-colombia", "gross-salary-colombia", "hourly-salary"],
  "worked-hours": ["hourly-salary", "freelance-rate", "days-between-dates"],
  "hourly-salary": ["worked-hours", "net-salary-colombia", "employee-salary-equivalent"],
  "employee-salary-equivalent": ["freelance-rate", "hourly-salary", "net-salary-colombia"],
  "freelance-rate": ["employee-salary-equivalent", "worked-hours", "hourly-salary"],
  "days-between-dates": ["days-until-date", "exact-age", "worked-hours"],
  "exact-age": ["days-between-dates", "days-until-date", "unit-converter"],
  "days-until-date": ["days-between-dates", "exact-age", "worked-hours"],
  "unit-converter": ["text-case-converter", "cop-usd", "case-style-converter"],
  "text-case-converter": ["remove-accents", "remove-extra-spaces", "duplicate-counter"],
  "duplicate-counter": ["remove-extra-spaces", "text-case-converter", "remove-accents"],
  "remove-extra-spaces": ["duplicate-counter", "remove-accents", "text-case-converter"],
  "remove-accents": ["remove-extra-spaces", "text-case-converter", "case-style-converter"],
  "secure-password-generator": ["base64-converter", "case-style-converter", "text-case-converter"],
  "case-style-converter": ["remove-accents", "base64-converter", "text-case-converter"],
  "base64-converter": ["case-style-converter", "secure-password-generator", "duplicate-counter"]
};

type RelatedToolsProps = {
  currentTool: ToolSummary;
};

export function RelatedTools({ currentTool }: RelatedToolsProps) {
  const { locale, localizePath } = useLocale();
  const copy =
    locale === "en"
      ? {
          kicker: "Keep going",
          title: "Related tools",
          description: "Useful calculators and utilities that connect with this task.",
          action: "Open tool"
        }
      : {
          kicker: "Sigue calculando",
          title: "Herramientas relacionadas",
          description: "Calculadoras y utilidades que suelen usarse junto con esta tarea.",
          action: "Abrir herramienta"
        };

  const publishedTools = tools.filter((tool) => tool.status === "published" && tool.id !== currentTool.id);
  const explicitTools = (relatedToolIds[currentTool.id] ?? [])
    .map((id) => publishedTools.find((tool) => tool.id === id))
    .filter((tool): tool is ToolSummary => Boolean(tool));
  const categoryFallback = publishedTools.filter(
    (tool) => tool.categoryId === currentTool.categoryId && !explicitTools.some((related) => related.id === tool.id)
  );
  const relatedTools = [...explicitTools, ...categoryFallback].slice(0, 3);

  if (relatedTools.length === 0) {
    return null;
  }

  return (
    <section className="related-tools" aria-labelledby="related-tools-title">
      <div className="related-tools__header">
        <div>
          <p className="section__kicker">{copy.kicker}</p>
          <h2 id="related-tools-title">{copy.title}</h2>
        </div>
        <p>{copy.description}</p>
      </div>

      <div className="related-tools__grid">
        {relatedTools.map((tool) => {
          const category = categories.find((item) => item.id === tool.categoryId);
          return (
            <a className="related-tool-card" href={localizePath(`/tools/${tool.slug}`)} key={tool.id}>
              <span className="related-tool-card__icon">
                <tool.Icon size={19} strokeWidth={2.1} />
              </span>
              <span className="related-tool-card__content">
                <strong>{getLocalizedText(tool.name, locale)}</strong>
                <span>{getLocalizedText(tool.description, locale)}</span>
                {category ? <small>{getLocalizedText(category.name, locale)}</small> : null}
              </span>
              <span className="related-tool-card__action">
                {copy.action}
                <ArrowRight size={16} strokeWidth={2.1} />
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
