import { Search } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="/" aria-label="Tools Platforms">
          <span className="brand__mark" aria-hidden="true" />
          <span className="brand__name">Tools Platforms</span>
        </a>

        <nav className="site-nav" aria-label="Principal">
          <a href="#categories">Categorias</a>
          <a href="#catalog">Herramientas</a>
          <a href="#status">Estado</a>
        </nav>

        <a className="quick-search" href="#catalog">
          <Search size={15} strokeWidth={2.25} />
          <span>Buscar</span>
        </a>
      </div>
    </header>
  );
}
