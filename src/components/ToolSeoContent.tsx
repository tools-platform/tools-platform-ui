import type { ToolContent } from "../data/toolContent";
import { getLocalizedText, useLocale } from "../i18n";

type ToolSeoContentProps = {
  content: ToolContent;
};

export function ToolSeoContent({ content }: ToolSeoContentProps) {
  const { locale } = useLocale();
  const copy =
    locale === "en"
      ? {
          ariaLabel: "Tool information",
          kicker: "Quick guide",
          title: "Before using this tool",
          faqKicker: "Frequently asked questions",
          faqTitle: "Common questions"
        }
      : {
          ariaLabel: "Información de la herramienta",
          kicker: "Guía rápida",
          title: "Antes de usar esta herramienta",
          faqKicker: "Preguntas frecuentes",
          faqTitle: "Dudas comunes"
        };

  return (
    <section className="tool-seo-content" aria-label={copy.ariaLabel}>
      <div className="tool-seo-content__intro">
        <p className="section__kicker">{copy.kicker}</p>
        <h2>{copy.title}</h2>
        <p>{getLocalizedText(content.intro, locale)}</p>
      </div>

      <div className="tool-seo-content__grid">
        {content.sections.map((section) => (
          <article className="tool-seo-card" key={getLocalizedText(section.title, locale)}>
            <h3>{getLocalizedText(section.title, locale)}</h3>
            {section.body.map((paragraph) => (
              <p key={getLocalizedText(paragraph, locale)}>{getLocalizedText(paragraph, locale)}</p>
            ))}
          </article>
        ))}
      </div>

      <div className="tool-faq">
        <div>
          <p className="section__kicker">{copy.faqKicker}</p>
          <h2>{copy.faqTitle}</h2>
        </div>

        <div className="tool-faq__list">
          {content.faqs.map((faq) => (
            <details key={getLocalizedText(faq.question, locale)}>
              <summary>{getLocalizedText(faq.question, locale)}</summary>
              <p>{getLocalizedText(faq.answer, locale)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
