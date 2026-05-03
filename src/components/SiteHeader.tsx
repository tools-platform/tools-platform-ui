import { ChevronDown, LayoutGrid, Search } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { categories, tools } from "../data/catalog";
import { BrandLogo } from "./BrandLogo";

export function SiteHeader() {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  const groupedTools = categories.map((category) => ({
    ...category,
    tools: tools.filter((tool) => tool.categoryId === category.id)
  }));

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openCategories = () => {
    clearCloseTimer();
    setIsCategoriesOpen(true);
  };

  const closeCategoriesSoon = () => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => {
      setIsCategoriesOpen(false);
      closeTimer.current = null;
    }, 125);
  };

  const toggleCategories = () => {
    clearCloseTimer();
    setIsCategoriesOpen((current) => !current);
  };

  const handlePrincipalClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => clearCloseTimer, []);

  const renderCategoriesPanel = () => (
    <div className="nav-dropdown__panel">
      <div className="nav-dropdown__header">
        <span>Herramientas por categoría</span>
        <small>Elige una disponible o revisa lo que viene.</small>
      </div>

      <div className="nav-dropdown__grid">
        {groupedTools.map((category) => (
          <section className="nav-category" key={category.id}>
            <a className="nav-category__title" href="/#categories">
              <span>
                <category.Icon size={16} strokeWidth={2.15} />
              </span>
              {category.name}
            </a>

            <div className="nav-category__tools">
              {category.tools.slice(0, 5).map((tool) => (
                <a
                  className={tool.status === "draft" ? "nav-tool is-draft" : "nav-tool"}
                  href={tool.status === "published" ? `/tools/${tool.slug}` : "/#tools"}
                  key={tool.id}
                >
                  <tool.Icon size={14} strokeWidth={2.05} />
                  <span>{tool.name}</span>
                  {tool.status === "draft" ? <small>Próx.</small> : null}
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="/" aria-label="Tools Platforms">
          <BrandLogo />
          <span className="brand__name">Tools Platforms</span>
        </a>

        <nav className="site-nav" aria-label="Principal">
          <a className="site-nav__link" href="/" onClick={handlePrincipalClick}>
            Principal
          </a>

          <a className="site-nav__link" href="/#catalog">
            Explorar
          </a>

          <div
            className={isCategoriesOpen ? "nav-dropdown is-open" : "nav-dropdown"}
            onMouseEnter={openCategories}
            onMouseLeave={closeCategoriesSoon}
          >
            <button className="nav-dropdown__trigger" onFocus={openCategories} type="button">
              Categorías
              <ChevronDown size={15} strokeWidth={2.2} />
            </button>

            {renderCategoriesPanel()}
          </div>

          <a className="site-nav__link" href="/#about">
            Acerca
          </a>
        </nav>

        <a className="quick-search" href="/#catalog">
          <Search size={15} strokeWidth={2.25} />
          <span>Buscar</span>
          <kbd>Ctrl K</kbd>
        </a>

        <div className="mobile-category-menu">
          <div
            className={isCategoriesOpen ? "nav-dropdown is-open" : "nav-dropdown"}
            onMouseEnter={openCategories}
            onMouseLeave={closeCategoriesSoon}
          >
            <button
              className="mobile-category-menu__trigger"
              onClick={toggleCategories}
              type="button"
              aria-label="Abrir categorías"
            >
              <LayoutGrid size={20} strokeWidth={2.15} />
            </button>

            {renderCategoriesPanel()}
          </div>
        </div>
      </div>
    </header>
  );
}
