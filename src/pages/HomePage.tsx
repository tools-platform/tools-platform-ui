import { Boxes } from "lucide-react";
import { useMemo, useState } from "react";
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
            Mas de 50 herramientas proximamente
          </div>

          <h1>
            Herramientas que <em>simplemente funcionan</em>.
          </h1>

          <p className="hero__copy">
            Calculadoras, conversores y utilidades rapidas para resolver tareas
            practicas sin vueltas.
          </p>

          <SearchBox value={query} onChange={setQuery} />
        </div>
      </section>

      <section className="catalog-section" id="categories">
        <CategoryPills
          activeCategory={activeCategory}
          categories={categories}
          onChange={setActiveCategory}
        />

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
            <h2>No encontramos esa herramienta</h2>
            <p>Cambia la busqueda o selecciona otra categoria.</p>
          </div>
        )}
      </section>

      <section className="about-section" id="about">
        <div className="about-section__content">
          <p className="section__kicker">Acerca de Tools Platforms</p>
          <h2>Herramientas simples para personas que necesitan respuestas claras.</h2>
          <p>
            Nuestro proposito es ayudar a la gente que llega buscando una solucion
            concreta: calcular un salario, entender una liquidacion, convertir una
            medida o resolver una duda practica sin tener que aprender prompts,
            modelos de IA o procesos complicados.
          </p>
          <p>
            Queremos que cada herramienta explique lo necesario, pida pocos datos y
            entregue un resultado facil de entender. La tecnologia queda detras; la
            utilidad queda al frente.
          </p>
        </div>
      </section>
    </>
  );
}
