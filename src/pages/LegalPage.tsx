import { getLocalizedText, useLocale } from "../i18n";
import { pageContent, updatedAt } from "../locales/legalCopy";

export type LegalPageType = "privacy" | "terms";


export function LegalPage({ page }: { page: LegalPageType }) {
  const { locale } = useLocale();
  const content = pageContent[page];
  const lastUpdatedLabel = locale === "en" ? "Last updated" : "Última actualización";

  return (
    <article className="legal-page">
      <header className="legal-hero">
        <p className="section__kicker">{getLocalizedText(content.eyebrow, locale)}</p>
        <h1>{getLocalizedText(content.title, locale)}</h1>
        <p>{getLocalizedText(content.intro, locale)}</p>
        <span>
          {lastUpdatedLabel}: {getLocalizedText(updatedAt, locale)}
        </span>
      </header>

      <div className="legal-content">
        {content.sections.map((section) => (
          <section className="legal-section" key={getLocalizedText(section.title, locale)}>
            <h2>{getLocalizedText(section.title, locale)}</h2>
            {section.body.map((paragraph) => (
              <p key={getLocalizedText(paragraph, locale)}>{getLocalizedText(paragraph, locale)}</p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
