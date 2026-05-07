import { ChevronDown, Languages, LayoutGrid } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { categories, tools } from "../data/catalog";
import { getLocalizedText, setStoredLocalePreference, stripLocalePrefix, useLocale, type Locale } from "../i18n";
import { BrandLogo } from "./BrandLogo";

type LanguageOption = {
  value: Locale;
  label: string;
  nativeLabel: string;
};

export function SiteHeader() {
  const { locale, localizePath, switchLocalePath } = useLocale();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [hoverEnabled, setHoverEnabled] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const languageCloseTimer = useRef<number | null>(null);
  const copy =
    locale === "en"
      ? {
          home: "Home",
          browse: "Browse",
          categories: "Categories",
          about: "About",
          search: "Search",
          categoriesTitle: "Tools by category",
          categoriesHint: "Pick a live tool or see what is coming next.",
          comingSoonShort: "Soon",
          mobileCategories: "Open categories",
          languageLabel: "Language",
          mobileLanguage: "Open language menu"
        }
      : {
          home: "Principal",
          browse: "Explorar",
          categories: "Categorías",
          about: "Acerca",
          search: "Buscar",
          categoriesTitle: "Herramientas por categoría",
          categoriesHint: "Elige una disponible o revisa lo que viene.",
          comingSoonShort: "Próx.",
          mobileCategories: "Abrir categorías",
          languageLabel: "Idioma",
          mobileLanguage: "Abrir menú de idioma"
        };

  const languageOptions: LanguageOption[] = [
    { value: "es", label: locale === "en" ? "Spanish" : "Español", nativeLabel: "Español" },
    { value: "en", label: locale === "en" ? "English" : "Inglés", nativeLabel: "English" }
  ];

  const currentLanguage = languageOptions.find((option) => option.value === locale) ?? languageOptions[0];

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

  const clearLanguageCloseTimer = () => {
    if (languageCloseTimer.current) {
      window.clearTimeout(languageCloseTimer.current);
      languageCloseTimer.current = null;
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

  const openLanguageMenu = () => {
    clearLanguageCloseTimer();
    setIsLanguageOpen(true);
  };

  const closeLanguageMenuSoon = () => {
    clearLanguageCloseTimer();
    languageCloseTimer.current = window.setTimeout(() => {
      setIsLanguageOpen(false);
      languageCloseTimer.current = null;
    }, 125);
  };

  const toggleCategories = () => {
    clearCloseTimer();
    setIsCategoriesOpen((current) => !current);
  };

  const toggleLanguageMenu = () => {
    clearLanguageCloseTimer();
    setIsLanguageOpen((current) => !current);
  };

  const handleLocaleSelection = (targetLocale: Locale) => {
    setStoredLocalePreference(targetLocale);
  };

  const handleHomeClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (stripLocalePrefix(window.location.pathname) === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const syncHoverCapability = () => {
      setHoverEnabled(mediaQuery.matches);
    };

    syncHoverCapability();
    mediaQuery.addEventListener("change", syncHoverCapability);

    return () => {
      mediaQuery.removeEventListener("change", syncHoverCapability);
      clearCloseTimer();
      clearLanguageCloseTimer();
    };
  }, []);

  const renderCategoriesPanel = () => (
    <div className="nav-dropdown__panel">
      <div className="nav-dropdown__header">
        <span>{copy.categoriesTitle}</span>
        <small>{copy.categoriesHint}</small>
      </div>

      <div className="nav-dropdown__grid">
        {groupedTools.map((category) => (
          <section className="nav-category" key={category.id}>
            <a className="nav-category__title" href={localizePath("/#categories")}>
              <span>
                <category.Icon size={16} strokeWidth={2.15} />
              </span>
              {getLocalizedText(category.name, locale)}
            </a>

            <div className="nav-category__tools">
              {category.tools.slice(0, 5).map((tool) => (
                <a
                  aria-disabled={tool.status === "draft" ? true : undefined}
                  className={tool.status === "draft" ? "nav-tool is-draft" : "nav-tool"}
                  href={tool.status === "published" ? localizePath(`/tools/${tool.slug}`) : localizePath("/#tools")}
                  key={tool.id}
                  onClick={(event) => {
                    if (tool.status === "draft") {
                      event.preventDefault();
                    }
                  }}
                  tabIndex={tool.status === "draft" ? -1 : undefined}
                >
                  <tool.Icon size={14} strokeWidth={2.05} />
                  <span>{getLocalizedText(tool.name, locale)}</span>
                  {tool.status === "draft" ? <small>{copy.comingSoonShort}</small> : null}
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );

  const renderLanguagePanel = () => (
    <div className="language-menu__panel">
      {languageOptions.map((option) => (
        <a
          aria-current={option.value === locale ? "true" : undefined}
          className={option.value === locale ? "language-menu__option is-active" : "language-menu__option"}
          href={switchLocalePath(option.value)}
          key={option.value}
          onClick={() => handleLocaleSelection(option.value)}
        >
          <span>
            <strong>{option.nativeLabel}</strong>
            <small>{option.label}</small>
          </span>
          {option.value === locale ? <em>{copy.languageLabel}</em> : null}
        </a>
      ))}
    </div>
  );

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href={localizePath("/")} aria-label="Tools Platforms">
          <BrandLogo />
          <span className="brand__name">Tools Platforms</span>
        </a>

        <nav className="site-nav" aria-label={copy.home}>
          <a className="site-nav__link" href={localizePath("/")} onClick={handleHomeClick}>
            {copy.home}
          </a>

          <a className="site-nav__link" href={localizePath("/#catalog")}>
            {copy.browse}
          </a>

          <div
            className={isCategoriesOpen ? "nav-dropdown is-open" : "nav-dropdown"}
            onMouseEnter={hoverEnabled ? openCategories : undefined}
            onMouseLeave={hoverEnabled ? closeCategoriesSoon : undefined}
          >
            <button className="nav-dropdown__trigger" onBlur={closeCategoriesSoon} onClick={toggleCategories} onFocus={openCategories} type="button">
              {copy.categories}
              <ChevronDown size={15} strokeWidth={2.2} />
            </button>

            {renderCategoriesPanel()}
          </div>

          <a className="site-nav__link" href={localizePath("/#about")}>
            {copy.about}
          </a>
        </nav>

        <div
          className={isLanguageOpen ? "language-menu desktop-language-menu is-open" : "language-menu desktop-language-menu"}
          onMouseEnter={hoverEnabled ? openLanguageMenu : undefined}
          onMouseLeave={hoverEnabled ? closeLanguageMenuSoon : undefined}
        >
          <button
            aria-label={copy.languageLabel}
            className="language-menu__trigger"
            onBlur={closeLanguageMenuSoon}
            onClick={toggleLanguageMenu}
            onFocus={openLanguageMenu}
            type="button"
          >
            <span className="language-menu__trigger-icon" aria-hidden="true">
              <Languages size={16} strokeWidth={2.1} />
            </span>
            <span className="language-menu__trigger-text">
              <small>{copy.languageLabel}</small>
              <strong>{currentLanguage.nativeLabel}</strong>
            </span>
            <ChevronDown size={15} strokeWidth={2.2} />
          </button>

          {renderLanguagePanel()}
        </div>

        <div className="mobile-header-actions">
          <div
            className={isLanguageOpen ? "language-menu mobile-language-menu is-open" : "language-menu mobile-language-menu"}
            onMouseEnter={hoverEnabled ? openLanguageMenu : undefined}
            onMouseLeave={hoverEnabled ? closeLanguageMenuSoon : undefined}
          >
            <button
              aria-label={copy.mobileLanguage}
              className="mobile-language-switch"
              onBlur={closeLanguageMenuSoon}
              onClick={toggleLanguageMenu}
              type="button"
            >
              <Languages size={18} strokeWidth={2.1} />
            </button>

            {renderLanguagePanel()}
          </div>

          <div
            className={isCategoriesOpen ? "nav-dropdown is-open" : "nav-dropdown"}
            onMouseEnter={hoverEnabled ? openCategories : undefined}
            onMouseLeave={hoverEnabled ? closeCategoriesSoon : undefined}
          >
            <button
              aria-label={copy.mobileCategories}
              className="mobile-category-menu__trigger"
              onClick={toggleCategories}
              type="button"
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
