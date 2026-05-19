import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import type { Category, ToolSummary } from "../data/catalog";
import { getLocalizedText, useLocale } from "../i18n";

type ToolCardProps = {
  category?: Category;
  featureBadge?: ReactNode;
  tool: ToolSummary;
};

export function ToolCard({ category, featureBadge, tool }: ToolCardProps) {
  const { locale, localizePath } = useLocale();
  const copy =
    locale === "en"
      ? {
          open: "Open tool",
          comingSoon: "Coming soon"
        }
      : {
          open: "Abrir herramienta",
          comingSoon: "Próximamente"
        };

  return (
    <article
      className={[
        "tool-card",
        tool.status === "draft" ? "is-muted" : "",
        featureBadge ? "has-feature-badge" : ""
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="tool-card__topline">
        <span>{category ? getLocalizedText(category.name, locale) : ""}</span>
      </div>

      <div className="tool-card__identity">
        <div className="tool-card__icon">
          <tool.Icon size={22} strokeWidth={2.1} />
        </div>
        {featureBadge}
      </div>

      <h3>{getLocalizedText(tool.name, locale)}</h3>
      <p>{getLocalizedText(tool.description, locale)}</p>

      <a aria-disabled={tool.status === "draft"} href={localizePath(`/tools/${tool.slug}`)}>
        {tool.status === "published" ? copy.open : copy.comingSoon}
        {tool.status === "published" ? <ArrowRight size={16} strokeWidth={2.25} /> : null}
      </a>
    </article>
  );
}
