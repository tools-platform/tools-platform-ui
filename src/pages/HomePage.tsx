import { Boxes } from "lucide-react";
import { useMemo, useState } from "react";
import { CategoryCard } from "../components/CategoryCard";
import { CategoryPills } from "../components/CategoryPills";
import { SearchBox } from "../components/SearchBox";
import { ToolCard } from "../components/ToolCard";
import { categories, tools } from "../data/catalog";

export function HomePage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return tools.filter((tool) => {
      const category = categories.find((item) => item.id === tool.categoryId);
      const searchableText = `${tool.name} ${tool.description} ${category?.name ?? ""}`.toLowerCase();
      const matchesCategory = activeCategory === "all" || tool.categoryId === activeCategory;
      const matchesQuery = normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <>
      <section className="hero">
        <div className="hero__inner">
          <div className="eyebrow">
            <span className="eyebrow__dot" />
            Plataforma SEO de herramientas practicas
          </div>

          <h1>Herramientas utiles para resolver calculos en segundos.</h1>

          <p className="hero__copy">
            Calculadoras, conversores y utilidades simples para dinero, trabajo,
            tiempo y tareas del dia a dia.
          </p>

          <SearchBox value={query} onChange={setQuery} />
        </div>
      </section>

      <section className="section" id="categories">
        <div className="section__header">
          <div>
            <p className="section__kicker">Categorias</p>
            <h2>Encuentra una herramienta por necesidad</h2>
          </div>
          <p>
            El inicio queda listo para crecer por paginas SEO. Cada card apunta a
            una URL propia aunque la herramienta aun no este implementada.
          </p>
        </div>

        <CategoryPills
          activeCategory={activeCategory}
          categories={categories}
          onChange={setActiveCategory}
        />

        <div className="category-grid">
          {categories.map((category) => (
            <CategoryCard category={category} key={category.id} />
          ))}
        </div>
      </section>

      <section className="section" id="tools">
        <div className="section__header">
          <div>
            <p className="section__kicker">Herramientas</p>
            <h2>Catalogo inicial MVP</h2>
          </div>
          <p>
            Las primeras herramientas aparecen como fichas navegables. Iremos
            activando cada pagina cuando conectemos su calculadora real.
          </p>
        </div>

        {filteredTools.length > 0 ? (
          <div className="tool-grid">
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
            <h2>No encontramos esa herramienta</h2>
            <p>Cambia la busqueda o selecciona otra categoria.</p>
          </div>
        )}
      </section>
    </>
  );
}
