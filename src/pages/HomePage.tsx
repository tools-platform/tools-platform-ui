import { Boxes, BrainCircuit, CheckCircle2, MousePointerClick } from "lucide-react";
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
            Más de 50 herramientas próximamente
          </div>

          <h1>
            Herramientas que <em>simplemente funcionan</em>.
          </h1>

          <p className="hero__copy">
            Calculadoras, conversores y utilidades rápidas para resolver tareas
            prácticas sin vueltas.
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
            <p>Cambia la búsqueda o selecciona otra categoría.</p>
          </div>
        )}
      </section>

      <section className="about-section" id="about">
        <div className="about-section__panel">
          <div className="about-section__content">
            <p className="section__kicker">Acerca de</p>
            <h2>Herramientas simples para personas que necesitan respuestas claras.</h2>
            <p>
              Nuestro propósito es ayudar a la gente que llega buscando una solución
              concreta: calcular un salario, entender una liquidación, convertir una
              medida o resolver una duda práctica sin tener que aprender prompts,
              modelos de IA o procesos complicados.
            </p>
            <p>
              Queremos que cada herramienta explique lo necesario, pida pocos datos y
              entregue un resultado fácil de entender. La tecnología queda detrás; la
              utilidad queda al frente.
            </p>
          </div>

          <div className="about-feature-grid" aria-label="Principios de Tools Platforms">
            <article className="about-feature">
              <span>
                <MousePointerClick size={20} strokeWidth={2.1} />
              </span>
              <h3>Usar en segundos</h3>
              <p>Entrar, llenar lo justo y ver el resultado sin pasos innecesarios.</p>
            </article>

            <article className="about-feature">
              <span>
                <CheckCircle2 size={20} strokeWidth={2.1} />
              </span>
              <h3>Resultados claros</h3>
              <p>Cada cálculo debe mostrar qué se usó y qué significa el resultado.</p>
            </article>

            <article className="about-feature about-feature--wide">
              <span>
                <BrainCircuit size={20} strokeWidth={2.1} />
              </span>
              <h3>Sin saber usar IA</h3>
              <p>
                Convertimos preguntas comunes en herramientas directas para quien solo
                necesita resolver algo práctico.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
