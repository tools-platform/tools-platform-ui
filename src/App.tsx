import { ArrowRight, Boxes, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { categories, tools } from "./data/catalog";

export function App() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return tools.filter((tool) => {
      const matchesCategory = activeCategory === "all" || tool.categoryId === activeCategory;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        `${tool.name} ${tool.description}`.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <div className="app-shell">
      <SiteHeader />

      <main>
        <section className="hero">
          <div className="hero__inner">
            <div className="eyebrow">
              <span className="eyebrow__dot" />
              Plataforma SEO de herramientas practicas
            </div>

            <h1>
              Herramientas utiles para resolver calculos en segundos.
            </h1>

            <p className="hero__copy">
              Una base limpia para publicar calculadoras, conversores y utilidades con
              paginas rapidas, claras y preparadas para crecer por categorias.
            </p>

            <div className="search-panel" id="catalog">
              <Search className="search-panel__icon" size={22} strokeWidth={2.25} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar herramienta..."
                aria-label="Buscar herramienta"
              />
            </div>
          </div>
        </section>

        <section className="section" id="categories">
          <div className="section__header">
            <div>
              <p className="section__kicker">Categorias</p>
              <h2>Base lista para el catalogo</h2>
            </div>
            <p>
              Sin herramientas publicadas todavia. Primero dejamos la interfaz limpia
              y despues conectamos cada experiencia al gateway.
            </p>
          </div>

          <div className="category-filter" aria-label="Filtrar categorias">
            <button
              className={activeCategory === "all" ? "is-active" : ""}
              onClick={() => setActiveCategory("all")}
              type="button"
            >
              Todas
            </button>
            {categories.map((category) => (
              <button
                className={activeCategory === category.id ? "is-active" : ""}
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                type="button"
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="category-grid">
            {categories.map(({ Icon, ...category }) => (
              <article className="category-card" key={category.id}>
                <div className="category-card__icon">
                  <Icon size={22} strokeWidth={2.1} />
                </div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="status">
          {filteredTools.length > 0 ? (
            <div className="tool-grid">
              {filteredTools.map((tool) => (
                <article className="tool-card" key={tool.id}>
                  <span>{categories.find((category) => category.id === tool.categoryId)?.name}</span>
                  <h3>{tool.name}</h3>
                  <p>{tool.description}</p>
                  <a href="/">
                    Abrir herramienta
                    <ArrowRight size={16} strokeWidth={2.25} />
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state__icon">
                <Boxes size={28} strokeWidth={2.05} />
              </div>
              <h2>Aun no hay herramientas publicadas</h2>
              <p>
                Este proyecto queda listo para agregar las paginas de Finanzas,
                Trabajo, Tiempo, Utilidades y Desarrollo sin arrastrar codigo basura.
              </p>
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
