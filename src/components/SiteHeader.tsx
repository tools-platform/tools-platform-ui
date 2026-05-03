import { Search } from "lucide-react";
import { BrandLogo } from "./BrandLogo";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="/" aria-label="Tools Platforms">
          <BrandLogo />
          <span className="brand__name">Tools Platforms</span>
        </a>

        <nav className="site-nav" aria-label="Principal">
          <a href="/#categories">Categorías</a>
          <a href="/#tools">Herramientas</a>
          <a href="/#about">Acerca</a>
        </nav>

        <a className="quick-search" href="/#catalog">
          <Search size={15} strokeWidth={2.25} />
          <span>Buscar</span>
          <kbd>Ctrl K</kbd>
        </a>
      </div>
    </header>
  );
}
