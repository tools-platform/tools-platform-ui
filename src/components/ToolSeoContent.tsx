import type { ToolContent } from "../data/toolContent";
import { getLocalizedText, useLocale } from "../i18n";

type ToolSeoContentProps = {
  content: ToolContent;
  toolId: string;
};

const searchIntentsByToolId: Record<string, { es: string[]; en: string[] }> = {
  "net-salary-colombia": {
    es: ["calculadora salarial Colombia", "salario neto Colombia 2026", "sueldo neto quincenal"],
    en: ["Colombia net salary calculator", "take-home pay Colombia", "Colombia payroll deductions"]
  },
  "gross-salary-colombia": {
    es: ["calcular salario bruto desde neto", "salario bruto Colombia", "neto quincenal a salario bruto"],
    en: ["gross salary from net pay", "Colombia gross salary calculator", "biweekly net to gross salary"]
  },
  "employment-settlement-colombia": {
    es: ["calculadora de liquidación laboral", "a cuánto equivale la liquidación", "calcular liquidación Colombia"],
    en: ["Colombia employment settlement calculator", "final pay calculator Colombia", "severance and vacation payout"]
  },
  "credit-interest": {
    es: ["calculadora de intereses de crédito", "intereses de préstamo", "cuánto pago de intereses"],
    en: ["credit interest calculator", "loan interest calculator", "total interest paid"]
  },
  "loan-payment": {
    es: ["calculadora de cuota de préstamo", "cuota mensual de crédito", "simulador de préstamo"],
    en: ["loan payment calculator", "monthly loan payment", "loan installment calculator"]
  },
  "cop-usd": {
    es: ["conversor COP a USD", "pesos colombianos a dólares", "convertir dólares a pesos"],
    en: ["COP to USD converter", "Colombian pesos to dollars", "USD to COP converter"]
  },
  "salary-increase": {
    es: ["calculadora de aumento salarial", "calcular aumento de sueldo", "salario después de aumento"],
    en: ["salary increase calculator", "pay raise calculator", "salary after percentage increase"]
  },
  "worked-hours": {
    es: ["calculadora de horas trabajadas", "sumar horas trabajadas", "calcular horas de trabajo"],
    en: ["worked hours calculator", "add work hours", "calculate work time"]
  },
  "hourly-salary": {
    es: ["calculadora de salario por hora", "valor hora salario mensual", "salario mensual dividido en horas"],
    en: ["hourly salary calculator", "monthly salary to hourly pay", "hourly wage from salary"]
  },
  "employee-salary-equivalent": {
    es: ["sueldo equivalente como empleado", "tarifa por hora a salario mensual", "independiente a empleado"],
    en: ["employee salary equivalent", "hourly rate to salary", "independent contractor to employee salary"]
  },
  "freelance-rate": {
    es: ["cuánto cobrar freelance", "tarifa freelance por hora", "calcular precio freelance"],
    en: ["freelance rate calculator", "hourly freelance rate", "how much to charge freelance"]
  },
  "days-between-dates": {
    es: ["contador de días entre fechas", "calculador de días calendario", "cuántos días hay entre dos fechas"],
    en: ["days between dates calculator", "date counter", "calendar days between dates"]
  },
  "exact-age": {
    es: ["calculadora de edad exacta", "edad en años meses y días", "calcular edad por fecha de nacimiento"],
    en: ["exact age calculator", "age in years months days", "calculate age from birth date"]
  },
  "days-until-date": {
    es: ["cuántos días faltan para una fecha", "contador de días restantes", "días hasta un evento"],
    en: ["days until date calculator", "days left counter", "days until an event"]
  },
  "unit-converter": {
    es: ["conversor de unidades", "convertir kilos a libras", "convertir kilómetros a millas"],
    en: ["unit converter", "kg to lb converter", "kilometers to miles converter"]
  },
  "text-case-converter": {
    es: ["convertidor de mayúsculas", "convertir a minúsculas", "mayúsculas y minúsculas online"],
    en: ["uppercase converter", "lowercase converter", "text case converter"]
  },
  "secure-password-generator": {
    es: ["generador de contraseñas seguras", "crear contraseña aleatoria", "password generator online"],
    en: ["secure password generator", "random password generator", "strong password generator"]
  },
  "case-style-converter": {
    es: ["convertidor camelCase", "snake_case converter", "PascalCase y kebab-case"],
    en: ["camelCase converter", "snake_case converter", "PascalCase and kebab-case converter"]
  }
};

export function ToolSeoContent({ content, toolId }: ToolSeoContentProps) {
  const { locale } = useLocale();
  const searchIntents = searchIntentsByToolId[toolId]?.[locale] ?? [];
  const copy =
    locale === "en"
      ? {
          ariaLabel: "Tool information",
          kicker: "Quick guide",
          title: "Before using this tool",
          intentTitle: "Common searches this tool helps with",
          faqKicker: "Frequently asked questions",
          faqTitle: "Common questions"
        }
      : {
          ariaLabel: "Información de la herramienta",
          kicker: "Guía rápida",
          title: "Antes de usar esta herramienta",
          intentTitle: "Búsquedas comunes que resuelve",
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

      {searchIntents.length > 0 ? (
        <div className="tool-search-intents">
          <h3>{copy.intentTitle}</h3>
          <div>
            {searchIntents.map((intent) => (
              <span key={intent}>{intent}</span>
            ))}
          </div>
        </div>
      ) : null}

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
