import { tools } from "./catalog";
import { getLocalizedText, localizePath, type Locale, type LocalizedText } from "../i18n";

const siteName = "Tools Platforms";
const siteUrl = "https://toolsplatforms.com";

export type SeoMetadata = {
  title: LocalizedText;
  description: LocalizedText;
  canonicalPath: string;
  type?: "website" | "article";
};

const toolSeoById: Record<string, Omit<SeoMetadata, "canonicalPath">> = {
  "net-salary-colombia": {
    title: {
      es: "Calculadora de salario neto Colombia 2026 | Tools Platforms",
      en: "Net Salary Calculator (Colombia) 2026 | Tools Platforms"
    },
    description: {
      es: "Calcula tu salario neto en Colombia después de salud, pensión, auxilio de transporte, Fondo de Solidaridad y deducciones de nómina.",
      en: "Calculate your take-home salary in Colombia after health, pension, transport allowance, solidarity fund, and payroll deductions."
    }
  },
  "hourly-salary": {
    title: {
      es: "Calculadora de salario por horas (Colombia) | Tools Platforms",
      en: "Hourly Salary Calculator (Colombia) | Tools Platforms"
    },
    description: {
      es: "Convierte un salario mensual en valor por hora en Colombia usando la jornada legal vigente o una jornada semanal personalizada.",
      en: "Convert a monthly salary into an hourly value in Colombia using the current legal workweek or a custom weekly schedule."
    }
  },
  "employee-salary-equivalent": {
    title: {
      es: "Calculadora de sueldo de empleado para independientes (Colombia) | Tools Platforms",
      en: "Employee Salary Calculator for Independent Workers (Colombia) | Tools Platforms"
    },
    description: {
      es: "Convierte lo que cobras por hora como independiente en sueldo semanal, quincenal y mensual como empleado, con neto estimado en Colombia.",
      en: "Convert what you charge per hour as an independent worker into an equivalent employee salary in Colombia, including estimated net income."
    }
  },
  "employment-settlement-colombia": {
    title: {
      es: "Calculadora de liquidación Colombia 2026 | Tools Platforms",
      en: "Employment Settlement Calculator (Colombia) 2026 | Tools Platforms"
    },
    description: {
      es: "Calcula una estimación de liquidación laboral en Colombia con cesantías, intereses, prima, vacaciones, salario pendiente e indemnización si aplica.",
      en: "Estimate an employment settlement in Colombia including severance, severance interest, service bonus, vacation, pending salary, and dismissal compensation when applicable."
    }
  },
  "credit-interest": {
    title: {
      es: "Calculadora de intereses de crédito | Tools Platforms",
      en: "Credit Interest Calculator | Tools Platforms"
    },
    description: {
      es: "Calcula cuánto pagarías en intereses por un préstamo según el monto, la tasa anual, el plazo en meses y el tipo de interés.",
      en: "Estimate the interest you would pay on a loan based on amount, annual rate, term in months, and interest type."
    }
  },
  "loan-payment": {
    title: {
      es: "Calculadora de cuota de préstamo | Tools Platforms",
      en: "Loan Payment Calculator | Tools Platforms"
    },
    description: {
      es: "Calcula la cuota mensual estimada de un préstamo con monto, tasa anual o mensual y plazo en meses.",
      en: "Estimate a loan's fixed monthly payment using amount, annual or monthly rate, and term in months."
    }
  },
  "cop-usd": {
    title: {
      es: "Conversor COP a USD con TRM | Tools Platforms",
      en: "COP to USD Converter with Reference Rate | Tools Platforms"
    },
    description: {
      es: "Convierte pesos colombianos a dólares y dólares a pesos usando una TRM de referencia para estimar el valor de cambio.",
      en: "Convert Colombian pesos to US dollars and back using a reference exchange rate."
    }
  },
  "worked-hours": {
    title: {
      es: "Calculadora de horas trabajadas | Tools Platforms",
      en: "Worked Hours Calculator | Tools Platforms"
    },
    description: {
      es: "Suma horas trabajadas por jornadas con fecha, hora de inicio y hora de finalización para empleados, freelancers y turnos.",
      en: "Add up worked hours by shift using date, start time, and end time for employees or freelancers."
    }
  },
  "freelance-rate": {
    title: {
      es: "Calculadora de cuánto cobrar freelance | Tools Platforms",
      en: "Freelance Rate Calculator | Tools Platforms"
    },
    description: {
      es: "Calcula cuánto cobrar por hora, día, semana o mes como freelance según tu ingreso deseado y horas de trabajo.",
      en: "Calculate how much to charge per hour, day, week, or month as a freelancer based on your income target and work hours."
    }
  },
  "days-between-dates": {
    title: {
      es: "Contador de días entre fechas | Tools Platforms",
      en: "Days Between Dates Calculator | Tools Platforms"
    },
    description: {
      es: "Cuenta cuántos días hay entre dos fechas y convierte el resultado a semanas completas y días restantes.",
      en: "Count how many days lie between two dates and break the result into full weeks and remaining days."
    }
  },
  "exact-age": {
    title: {
      es: "Calculadora de edad exacta | Tools Platforms",
      en: "Exact Age Calculator | Tools Platforms"
    },
    description: {
      es: "Calcula tu edad exacta en años, meses y días, además de los días que faltan para tu próximo cumpleaños.",
      en: "Calculate your exact age in years, months, and days, plus the days until your next birthday."
    }
  },
  "unit-converter": {
    title: {
      es: "Conversor de unidades online | Tools Platforms",
      en: "Online Unit Converter | Tools Platforms"
    },
    description: {
      es: "Convierte unidades comunes de longitud, peso, masa y temperatura con resultados rápidos y decimales ajustables.",
      en: "Convert common length, mass, and temperature units with fast results and adjustable decimals."
    }
  },
  "text-case-converter": {
    title: {
      es: "Convertidor de mayúsculas y minúsculas | Tools Platforms",
      en: "Text Case Converter | Tools Platforms"
    },
    description: {
      es: "Transforma texto a mayúsculas, minúsculas, capitalizado o tipo oración directamente desde tu navegador.",
      en: "Transform text to uppercase, lowercase, title case, or sentence case directly in your browser."
    }
  },
  "secure-password-generator": {
    title: {
      es: "Generador de contraseñas seguras | Tools Platforms",
      en: "Secure Password Generator | Tools Platforms"
    },
    description: {
      es: "Genera contraseñas aleatorias y seguras con longitud personalizada, símbolos, números, mayúsculas y minúsculas.",
      en: "Generate secure random passwords with custom length, symbols, numbers, uppercase, and lowercase letters."
    }
  },
  "case-style-converter": {
    title: {
      es: "Convertidor camelCase, PascalCase y snake_case | Tools Platforms",
      en: "camelCase, PascalCase, and snake_case Converter | Tools Platforms"
    },
    description: {
      es: "Convierte frases a camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE y otros estilos usados en código.",
      en: "Convert phrases to camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, and other code naming styles."
    }
  }
};

export const homeSeo: SeoMetadata = {
  title: {
    es: "Tools Platforms | Calculadoras y herramientas online",
    en: "Tools Platforms | Online calculators and utilities"
  },
  description: {
    es: "Herramientas online para resolver cálculos de salario, liquidación, créditos, trabajo, fechas, conversiones, texto y tareas prácticas.",
    en: "Online tools for salaries, settlements, loans, work hours, dates, conversions, text utilities, and practical tasks."
  },
  canonicalPath: "/"
};

export const legalSeo: Record<"privacy" | "terms", SeoMetadata> = {
  privacy: {
    title: {
      es: "Política de privacidad | Tools Platforms",
      en: "Privacy Policy | Tools Platforms"
    },
    description: {
      es: "Consulta cómo Tools Platforms trata información, cookies, datos técnicos, herramientas online, analítica y anuncios.",
      en: "Learn how Tools Platforms handles information, cookies, technical data, analytics, online tools, and ads."
    },
    canonicalPath: "/privacy"
  },
  terms: {
    title: {
      es: "Términos y condiciones | Tools Platforms",
      en: "Terms and Conditions | Tools Platforms"
    },
    description: {
      es: "Lee las condiciones de uso de Tools Platforms, el alcance de las herramientas, limitaciones y responsabilidades.",
      en: "Read the terms that govern your use of Tools Platforms, its tools, limitations, and responsibilities."
    },
    canonicalPath: "/terms"
  }
};

export function getToolSeo(slug: string, locale: Locale): SeoMetadata {
  const tool = tools.find((item) => item.slug === slug);

  if (!tool) {
    return {
      title: {
        es: "Herramienta no encontrada | Tools Platforms",
        en: "Tool Not Found | Tools Platforms"
      },
      description: {
        es: "Esta herramienta todavía no está disponible en Tools Platforms.",
        en: "This tool is not available yet on Tools Platforms."
      },
      canonicalPath: `/tools/${slug}`
    };
  }

  const toolSeo = toolSeoById[tool.id] ?? {
    title: {
      es: `${getLocalizedText(tool.name, locale)} | Tools Platforms`,
      en: `${getLocalizedText(tool.name, locale)} | Tools Platforms`
    },
    description: tool.description
  };

  return {
    ...toolSeo,
    canonicalPath: `/tools/${tool.slug}`
  };
}

function setMetaAttribute(selector: string, attribute: "content" | "href", value: string) {
  const element = document.head.querySelector(selector);

  if (element) {
    element.setAttribute(attribute, value);
    return;
  }

  const newElement =
    selector.startsWith("link") ? document.createElement("link") : document.createElement("meta");

  if (selector.includes("rel=\"canonical\"")) {
    newElement.setAttribute("rel", "canonical");
  }

  const relMatch = selector.match(/rel="([^"]+)"/);
  const hrefLangMatch = selector.match(/hreflang="([^"]+)"/);
  const nameMatch = selector.match(/name="([^"]+)"/);
  const propertyMatch = selector.match(/property="([^"]+)"/);

  if (relMatch?.[1]) newElement.setAttribute("rel", relMatch[1]);
  if (hrefLangMatch?.[1]) newElement.setAttribute("hreflang", hrefLangMatch[1]);
  if (nameMatch?.[1]) newElement.setAttribute("name", nameMatch[1]);
  if (propertyMatch?.[1]) newElement.setAttribute("property", propertyMatch[1]);

  newElement.setAttribute(attribute, value);
  document.head.appendChild(newElement);
}

export function applySeo(metadata: SeoMetadata, locale: Locale) {
  const title = getLocalizedText(metadata.title, locale);
  const description = getLocalizedText(metadata.description, locale);
  const canonicalPath = localizePath(metadata.canonicalPath, locale);
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const spanishUrl = `${siteUrl}${localizePath(metadata.canonicalPath, "es")}`;
  const englishUrl = `${siteUrl}${localizePath(metadata.canonicalPath, "en")}`;

  document.documentElement.lang = locale;
  document.title = title;
  setMetaAttribute('meta[name="description"]', "content", description);
  setMetaAttribute('link[rel="canonical"]', "href", canonicalUrl);
  setMetaAttribute('meta[property="og:title"]', "content", title);
  setMetaAttribute('meta[property="og:description"]', "content", description);
  setMetaAttribute('meta[property="og:type"]', "content", metadata.type ?? "website");
  setMetaAttribute('meta[property="og:url"]', "content", canonicalUrl);
  setMetaAttribute('meta[property="og:site_name"]', "content", siteName);
  setMetaAttribute('link[rel="alternate"][hreflang="es"]', "href", spanishUrl);
  setMetaAttribute('link[rel="alternate"][hreflang="en"]', "href", englishUrl);
  setMetaAttribute('link[rel="alternate"][hreflang="x-default"]', "href", spanishUrl);
}
