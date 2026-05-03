import { BrandLogo } from "./BrandLogo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="footer-brand">
          <BrandLogo compact />
          <span>Tools Platforms</span>
        </div>
        <div className="footer-links">
          <a href="/privacidad">Privacidad</a>
          <a href="/terminos">Términos</a>
          <a href="mailto:contacto@toolsplatforms.com">Contacto</a>
        </div>
      </div>
    </footer>
  );
}
