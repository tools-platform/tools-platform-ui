import type { ToolContent } from "../data/toolContent";
import { getLocalizedText, useLocale, type Locale } from "../i18n";
import { toolSeoContentCopy } from "../locales/uiCopy";

type ToolSeoContentProps = {
  content: ToolContent;
  toolId: string;
};

const searchIntentsByToolId: Record<string, Partial<Record<Locale, string[]>>> = {
  "net-salary-colombia": {
    es: ["salario neto Colombia", "calculadora salario neto Colombia", "salario bruto a neto Colombia"],
    en: ["Colombia net salary calculator", "gross to net salary Colombia", "take-home pay Colombia"]
  },
  "gross-salary-colombia": {
    es: ["calcular salario bruto desde neto", "salario bruto Colombia", "neto quincenal a salario bruto"],
    en: ["gross salary from net pay", "Colombia gross salary calculator", "biweekly net to gross salary"]
  },
  "employment-settlement-colombia": {
    es: ["calculadora de liquidación laboral", "a cuánto equivale la liquidación", "calcular liquidación Colombia"],
    en: ["Colombia employment settlement calculator", "final pay calculator Colombia", "severance and vacation payout"]
  },
  "social-benefits-colombia": {
    es: ["calculadora prestaciones sociales Colombia", "calcular cesantías y prima", "vacaciones causadas Colombia"],
    en: ["Colombia social benefits calculator", "calculate severance and service bonus", "accrued vacation Colombia"]
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
    es: ["conversor COP a USD", "pesos colombianos a dólares", "dólares a pesos colombianos"],
    en: ["COP to USD converter", "Colombian pesos to dollars", "USD to COP converter"],
    hi: ["COP से USD कनवर्टर", "कोलंबियाई पेसो से डॉलर", "USD से COP कनवर्टर"]
  },
  "salary-increase": {
    es: ["calculadora de aumento salarial", "calcular aumento de sueldo", "nuevo salario con aumento"],
    en: ["pay increase calculator", "salary increase calculator", "pay raise calculator"],
    hi: ["वेतन वृद्धि कैलकुलेटर", "पे इंक्रीज कैलकुलेटर", "प्रतिशत वेतन वृद्धि"]
  },
  "worked-hours": {
    es: ["calculadora de horas trabajadas", "sumar horas de trabajo", "cómo calcular horas de trabajo"],
    en: ["worked hours calculator", "time worked calculator", "time card calculator"],
    hi: ["काम के घंटे कैलकुलेटर", "कार्य घंटे जोड़ें", "काम का समय गणना"]
  },
  "hourly-salary": {
    es: ["calculadora de salario por hora", "valor hora salario mensual", "salario mensual dividido en horas"],
    en: ["hourly salary calculator", "monthly salary to hourly pay", "hourly wage from salary"]
  },
  "overtime-colombia": {
    es: ["calculadora de horas extras Colombia", "recargos nocturnos Colombia", "hora extra diurna nocturna"],
    en: ["Colombia overtime calculator", "night surcharge Colombia", "Sunday holiday overtime pay"]
  },
  "employee-salary-equivalent": {
    es: ["sueldo equivalente como empleado", "tarifa por hora a salario mensual", "independiente a empleado"],
    en: ["employee salary equivalent", "hourly rate to salary", "independent contractor to employee salary"]
  },
  "freelance-rate": {
    es: ["cuánto cobrar freelance", "tarifa freelance por hora", "calcular precio freelance"],
    en: ["freelance rate calculator", "freelance hourly rate calculator", "how much to charge freelance"]
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
    es: ["cuántos días faltan para una fecha", "días hasta una fecha", "contador de días restantes"],
    en: ["days until date calculator", "days till calculator", "how many days until"],
    hi: ["कितने दिन बाकी हैं", "दिन बाकी कैलकुलेटर", "घटना तक दिन"]
  },
  "unit-converter": {
    es: ["conversor de unidades", "convertir kilos a libras", "convertir kilómetros a millas"],
    en: ["unit converter", "kg to lb converter", "kilometers to miles converter"]
  },
  "text-case-converter": {
    es: ["minúsculas a mayúsculas", "mayúsculas a minúsculas", "convertidor de mayúsculas"],
    en: ["lower case to upper case", "uppercase to lowercase", "capital letter converter"],
    hi: ["लोअरकेस से अपरकेस", "कैपिटल लेटर कनवर्टर", "टेक्स्ट केस कनवर्टर"]
  },
  "duplicate-counter": {
    es: ["contador de duplicados online", "buscar valores repetidos", "contar valores únicos"],
    en: ["count duplicates online", "duplicate counter", "count unique values online"],
    hi: ["डुप्लीकेट गिनें", "दोहराए मान खोजें", "सूची में डुप्लीकेट"]
  },
  "remove-extra-spaces": {
    es: ["quitar espacios extra", "limpiar espacios en texto", "eliminar espacios dobles"],
    en: ["remove extra spaces", "clean text spaces", "remove double spaces"]
  },
  "remove-accents": {
    es: ["quitar tildes online", "eliminar acentos de texto", "convertir texto sin tildes"],
    en: ["remove accents online", "remove diacritics from text", "convert text without accents"]
  },
  "secure-password-generator": {
    es: ["generador de contraseñas seguras", "crear contraseña aleatoria", "password generator online"],
    en: ["secure password generator", "random password generator", "strong password generator"]
  },
  "random-text-generator": {
    es: ["texto aleatorio", "generador de texto aleatorio", "texto de prueba online"],
    en: ["random text", "random text generator", "sample text generator"]
  },
  "alphabetical-line-sorter": {
    es: ["ordenar líneas alfabéticamente", "ordenar lista A-Z", "ordenar texto online"],
    en: ["alphabetical line sorter", "sort lines alphabetically", "sort list A to Z"]
  },
  "percentage-calculator": {
    es: ["calculadora de porcentaje", "calcular descuento porcentual", "diferencia porcentual"],
    en: ["percentage calculator", "discount percentage calculator", "percentage change calculator"]
  },
  "json-formatter": {
    es: ["formateador JSON online", "validar JSON", "minificar JSON"],
    en: ["JSON formatter online", "JSON validator", "minify JSON"]
  },
  "uuid-generator": {
    es: ["generador UUID online", "UUID v4", "generar UUID desde texto"],
    en: ["UUID generator online", "UUID v4 generator", "UUID from text"]
  },
  "hash-generator": {
    es: ["generador hash online", "generar SHA-256", "hash de texto"],
    en: ["hash generator online", "generate SHA-256", "text hash generator"]
  },
  "case-style-converter": {
    es: ["convertidor camelCase", "snake_case converter", "PascalCase y kebab-case"],
    en: ["camelCase converter", "snake_case converter", "PascalCase and kebab-case converter"]
  },
  "base64-converter": {
    es: ["convertidor Base64 online", "codificar Base64", "decodificar Base64"],
    en: ["Base64 converter online", "encode Base64", "decode Base64"]
  },
  "html-preview": {
    es: ["vista previa HTML online", "preview HTML seguro", "probar código HTML online"],
    en: ["online HTML preview", "safe HTML preview", "test HTML code online"]
  },
  "html-formatter-minifier": {
    es: ["formateador HTML online", "minificar HTML", "ordenar código HTML"],
    en: ["HTML formatter online", "minify HTML", "format HTML code"]
  },
  "weeks-between-dates": {
    es: ["calculadora de semanas", "cuántas semanas hay entre fechas", "convertir fechas a semanas"],
    en: ["week calculator", "calculate weeks", "count weeks"]
  },
  "annual-salary": {
    es: ["calculadora salario anual Colombia", "salario anual desde mensual", "ingreso anual Colombia"],
    en: ["annual salary calculator Colombia", "monthly salary to yearly income", "Colombia yearly salary"]
  },
  "word-character-counter": {
    es: ["contador de palabras", "contador de caracteres", "contar líneas y párrafos"],
    en: ["word counter", "character counter", "count lines and paragraphs"]
  },
  "find-replace-text": {
    es: ["buscar y reemplazar texto", "reemplazar palabras online", "cambiar texto rapido"],
    en: ["find and replace text", "replace words online", "change text quickly"]
  },
  "simple-cron-generator": {
    es: ["generador cron", "crear cron simple", "explicar expresion cron"],
    en: ["cron generator", "simple cron expression", "explain cron expression"]
  },
  "resignation-letter-generator": {
    es: ["carta de renuncia", "generador de carta de renuncia", "modelo de carta de renuncia"],
    en: ["resignation letter generator", "resignation letter template", "resignation letter sample"],
    hi: ["त्यागपत्र जनरेटर", "इस्तीफा पत्र टेम्पलेट", "औपचारिक त्यागपत्र"]
  },
  "email-template-generator": {
    es: ["plantillas de correo", "crear correo formal", "email HTML con vista previa"],
    en: ["email template generator", "formal email template", "HTML email preview"],
    hi: ["\u0908\u092E\u0947\u0932 \u091F\u0947\u092E\u094D\u092A\u0932\u0947\u091F", "\u0914\u092A\u091A\u093E\u0930\u093F\u0915 \u0908\u092E\u0947\u0932", "HTML \u0908\u092E\u0947\u0932 \u092A\u094D\u0930\u0940\u0935\u094D\u092F\u0942"]
  }
};

export function ToolSeoContent({ content, toolId }: ToolSeoContentProps) {
  const { locale } = useLocale();
  const searchIntents = searchIntentsByToolId[toolId]?.[locale] ?? [];
  const copy =
    toolSeoContentCopy[locale];

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
