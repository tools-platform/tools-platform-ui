import { useLocale } from "../i18n";
import { BrandLogo } from "./BrandLogo";
import { siteFooterCopy } from "../locales/uiCopy";

export function SiteFooter() {
  const { locale, localizePath } = useLocale();
  const copy =
    siteFooterCopy[locale];

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="footer-brand">
          <BrandLogo compact />
          <span>Tools Platforms</span>
        </div>
        <div className="footer-links">
          <a href={localizePath("/privacy")}>{copy.privacy}</a>
          <a href={localizePath("/terms")}>{copy.terms}</a>
          <a href="mailto:contacto@toolsplatforms.com">{copy.contact}</a>
        </div>
      </div>
    </footer>
  );
}
