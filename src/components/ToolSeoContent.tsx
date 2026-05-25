import type { ToolContent } from "../data/toolContent";
import { getLocalizedText, useLocale, type Locale } from "../i18n";
import { toolSeoContentCopy } from "../locales/uiCopy";

type ToolSeoContentProps = {
  content: ToolContent;
  toolId: string;
};

const searchIntentsByToolId: Record<string, Partial<Record<Locale, string[]>>> = {
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
    es: ["calculadora de aumento salarial", "calcular aumento de sueldo", "salario después de aumento"],
    en: ["pay increase calculator", "salary increase calculator", "pay raise calculator"],
    hi: ["वेतन वृद्धि कैलकुलेटर", "पे इंक्रीज कैलकुलेटर", "प्रतिशत वेतन वृद्धि"]
  },
  "worked-hours": {
    es: ["calculadora de horas trabajadas", "sumar horas trabajadas", "cómo calcular horas de trabajo"],
    en: ["worked hours calculator", "add work hours", "calculate work time"],
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
    en: ["days until calculator", "days till calculator", "days left counter"],
    hi: ["कितने दिन बाकी हैं", "दिन बाकी कैलकुलेटर", "घटना तक दिन"]
  },
  "unit-converter": {
    es: ["conversor de unidades", "convertir kilos a libras", "convertir kilómetros a millas"],
    en: ["unit converter", "kg to lb converter", "kilometers to miles converter"]
  },
  "text-case-converter": {
    es: ["convertidor de mayúsculas", "minúsculas a mayúsculas", "capitalizar letras"],
    en: ["lower case to upper case", "capital letter converter", "text case converter"],
    hi: ["लोअरकेस से अपरकेस", "कैपिटल लेटर कनवर्टर", "टेक्स्ट केस कनवर्टर"]
  },
  "duplicate-counter": {
    es: ["contador de duplicados", "buscar valores repetidos", "contar repetidos en lista"],
    en: ["count duplicates online", "duplicate counter", "find repeated values"],
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
    es: ["generador de texto aleatorio", "texto de prueba online", "generar lorem ipsum"],
    en: ["random text generator", "sample text generator", "lorem ipsum generator"]
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
    es: ["calculadora de semanas entre fechas", "cuantas semanas hay entre fechas", "convertir fechas a semanas"],
    en: ["weeks between dates calculator", "how many weeks between dates", "convert dates to weeks"]
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
