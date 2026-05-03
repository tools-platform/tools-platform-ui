import type { Category } from "../data/catalog";

type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <article className="category-card">
      <div className="category-card__icon">
        <category.Icon size={22} strokeWidth={2.1} />
      </div>
      <h3>{category.name}</h3>
      <p>{category.description}</p>
    </article>
  );
}
