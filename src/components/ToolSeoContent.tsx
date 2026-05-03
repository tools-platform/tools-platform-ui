import type { ToolContent } from "../data/toolContent";

type ToolSeoContentProps = {
  content: ToolContent;
};

export function ToolSeoContent({ content }: ToolSeoContentProps) {
  return (
    <section className="tool-seo-content" aria-label="Información de la herramienta">
      <div className="tool-seo-content__intro">
        <p className="section__kicker">Guía rápida</p>
        <h2>Antes de usar esta herramienta</h2>
        <p>{content.intro}</p>
      </div>

      <div className="tool-seo-content__grid">
        {content.sections.map((section) => (
          <article className="tool-seo-card" key={section.title}>
            <h3>{section.title}</h3>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        ))}
      </div>

      <div className="tool-faq">
        <div>
          <p className="section__kicker">Preguntas frecuentes</p>
          <h2>Dudas comunes</h2>
        </div>

        <div className="tool-faq__list">
          {content.faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
