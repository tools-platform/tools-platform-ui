import { ArrowRight, LockKeyhole } from "lucide-react";
import type { Category, ToolSummary } from "../data/catalog";

type ToolCardProps = {
  category?: Category;
  tool: ToolSummary;
};

export function ToolCard({ category, tool }: ToolCardProps) {
  return (
    <article className="tool-card">
      <div className="tool-card__topline">
        <span>{category?.name}</span>
        {tool.status === "draft" ? <LockKeyhole size={15} strokeWidth={2.1} /> : null}
      </div>

      <div className="tool-card__icon">
        <tool.Icon size={22} strokeWidth={2.1} />
      </div>

      <h3>{tool.name}</h3>
      <p>{tool.description}</p>

      <a aria-disabled={tool.status === "draft"} href={`/tools/${tool.slug}`}>
        {tool.status === "published" ? "Abrir herramienta" : "Preparar pagina"}
        <ArrowRight size={16} strokeWidth={2.25} />
      </a>
    </article>
  );
}
