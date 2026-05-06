import type { Category } from "../data/catalog";
import { getLocalizedText, useLocale } from "../i18n";

type CategoryPillsProps = {
  activeCategory: string;
  categories: Category[];
  onChange: (categoryId: string) => void;
};

export function CategoryPills({ activeCategory, categories, onChange }: CategoryPillsProps) {
  const { locale } = useLocale();
  const copy =
    locale === "en"
      ? {
          all: "All",
          ariaLabel: "Filter categories"
        }
      : {
          all: "Todas",
          ariaLabel: "Filtrar categorías"
        };

  return (
    <div className="category-filter" aria-label={copy.ariaLabel}>
      <button
        className={activeCategory === "all" ? "is-active" : ""}
        onClick={() => onChange("all")}
        type="button"
      >
        {copy.all}
      </button>
      {categories.map((category) => (
        <button
          className={activeCategory === category.id ? "is-active" : ""}
          key={category.id}
          onClick={() => onChange(category.id)}
          type="button"
        >
          <category.Icon size={15} strokeWidth={2.1} />
          {getLocalizedText(category.name, locale)}
        </button>
      ))}
    </div>
  );
}
