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
    es: ["calcular salario bruto desde neto", "neto a bruto Colombia", "neto quincenal a salario bruto"],
    en: ["Colombia gross salary calculator", "net salary to gross pay", "biweekly net to gross salary"]
  },
  "employment-settlement-colombia": {
    es: ["calculadora de liquidación laboral Colombia", "calcular liquidación Colombia 2026", "cuánto me toca de liquidación"],
    en: ["Colombia severance pay calculator", "final pay calculator Colombia", "employment settlement Colombia"]
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
    es: ["conversor COP a USD", "pesos colombianos a dólares", "USD a pesos colombianos"],
    en: ["COP to USD converter", "Colombian peso to USD", "USD to Colombian peso"],
    hi: ["COP से USD कनवर्टर", "कोलंबियाई पेसो से डॉलर", "USD से COP कनवर्टर"]
  },
  "salary-increase": {
    es: ["calculadora de aumento salarial", "calcular aumento de sueldo", "nuevo salario con aumento"],
    en: ["pay increase calculator", "salary increase calculator", "pay raise calculator"],
    hi: ["वेतन वृद्धि कैलकुलेटर", "पे इंक्रीज कैलकुलेटर", "प्रतिशत वेतन वृद्धि"]
  },
  "worked-hours": {
    es: ["calculadora de horas trabajadas", "calculadora de horas de trabajo", "sumar horas de trabajo"],
    en: ["worked hours calculator", "time card calculator", "work hours calculator"],
    hi: ["काम के घंटे कैलकुलेटर", "काम के घंटे जोड़ें", "टाइम कार्ड कैलकुलेटर"]
  },
  "hourly-salary": {
    es: ["calculadora de salario por hora", "valor hora salario mensual", "salario mensual a hora"],
    en: ["hourly salary calculator", "monthly salary to hourly pay", "hourly wage from salary"],
    hi: ["प्रति घंटा वेतन कैलकुलेटर", "मासिक वेतन से प्रति घंटा", "प्रति घंटा मजदूरी"]
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
    es: ["calculadora de días entre fechas", "cuántos días hay entre dos fechas", "contador de días calendario"],
    en: ["days between dates calculator", "how many days between two dates", "date duration calculator"],
    hi: ["तिथियों के बीच दिन कैलकुलेटर", "दो तारीखों के बीच कितने दिन", "तिथि अवधि कैलकुलेटर"]
  },
  "exact-age": {
    es: ["calculadora de edad exacta", "calcular edad por fecha de nacimiento", "edad en años meses y días"],
    en: ["exact age calculator", "calculate age from birth date", "age in years months days"],
    hi: ["सटीक आयु कैलकुलेटर", "जन्मतिथि से आयु निकालें", "साल महीने दिन में उम्र"]
  },
  "days-until-date": {
    es: ["cuántos días faltan", "días restantes", "contador de días hasta una fecha"],
    en: ["days until calculator", "days till calculator", "days left calculator"],
    hi: ["कितने दिन बाकी हैं", "तारीख तक दिन कैलकुलेटर", "इवेंट तक दिन"]
  },
  "unit-converter": {
    es: ["conversor de unidades online", "convertir kg a lb", "convertir kilómetros a millas"],
    en: ["online unit converter", "kg to lb converter", "km to miles converter"],
    hi: ["ऑनलाइन यूनिट कन्वर्टर", "kg से lb कन्वर्टर", "km से मील कन्वर्टर"]
  },
  "text-case-converter": {
    es: ["minúsculas a mayúsculas", "texto a mayúsculas", "mayúsculas a minúsculas"],
    en: ["lower case to upper case", "lowercase to all caps", "capital letter converter"],
    hi: ["लोअरकेस से अपरकेस", "अपरकेस कनवर्टर", "टेक्स्ट केस कनवर्टर"]
  },
  "duplicate-counter": {
    es: ["contar duplicados online", "buscar valores repetidos", "contar valores únicos"],
    en: ["count duplicates online", "duplicate counter", "check duplicate online"],
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
    es: ["generador de texto aleatorio", "texto aleatorio online", "texto de prueba online"],
    en: ["random text generator", "random text online", "sample text generator"]
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
