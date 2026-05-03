import type { Category } from "../data/catalog";

type CategoryPillsProps = {
  activeCategory: string;
  categories: Category[];
  onChange: (categoryId: string) => void;
};

export function CategoryPills({ activeCategory, categories, onChange }: CategoryPillsProps) {
  return (
    <div className="category-filter" aria-label="Filtrar categorías">
      <button
        className={activeCategory === "all" ? "is-active" : ""}
        onClick={() => onChange("all")}
        type="button"
      >
        Todas
      </button>
      {categories.map((category) => (
        <button
          className={activeCategory === category.id ? "is-active" : ""}
          key={category.id}
          onClick={() => onChange(category.id)}
          type="button"
        >
          <category.Icon size={15} strokeWidth={2.1} />
          {category.name}
        </button>
      ))}
    </div>
  );
}
