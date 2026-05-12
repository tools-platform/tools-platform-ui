import { tools } from "./catalog";
import { toolContentById } from "./toolContent";
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
      es: "Calculadora salarial Colombia 2026 | Salario neto",
      en: "Net Salary Calculator (Colombia) 2026 | Take-Home Pay"
    },
    description: {
      es: "Calcula tu salario neto en Colombia para 2026 y años disponibles con salud, pensión, auxilio de transporte, Fondo de Solidaridad y deducciones.",
      en: "Calculate your 2026 take-home pay in Colombia with health, pension, transport allowance, solidarity fund, and payroll deductions."
    }
  },
  "gross-salary-colombia": {
    title: {
      es: "Calculadora de salario bruto Colombia | Desde neto",
      en: "Gross Salary Calculator (Colombia) | From Net Pay"
    },
    description: {
      es: "Calcula el salario bruto mensual aproximado desde el neto que recibes mensual o quincenal en Colombia, con salud, pensión y descuentos de nómina.",
      en: "Estimate gross monthly salary from the net amount you receive monthly or biweekly in Colombia, including health, pension, and payroll deductions."
    }
  },
  "hourly-salary": {
    title: {
      es: "Calculadora salario por hora Colombia | Valor hora",
      en: "Hourly Salary Calculator (Colombia) | Hourly Pay"
    },
    description: {
      es: "Calcula cuánto ganas por hora en Colombia desde tu salario mensual, jornada legal vigente, horas semanales reales o referencia de dividir entre 240.",
      en: "Calculate how much you earn per hour in Colombia from a monthly salary, legal workweek, or custom weekly hours."
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
      es: "Calculadora de liquidación laboral Colombia 2026 | Liquidación",
      en: "Colombia Employment Settlement Calculator 2026 | Final Pay"
    },
    description: {
      es: "Calcula cuánto equivale tu liquidación laboral en Colombia con cesantías, prima, vacaciones, salario pendiente e indemnización si aplica.",
      en: "Estimate a Colombia employment settlement with severance, service bonus, vacation, pending salary, and dismissal compensation when applicable."
    }
  },
  "credit-interest": {
    title: {
      es: "Calculadora de intereses de crédito online | Tools Platforms",
      en: "Online Credit Interest Calculator | Tools Platforms"
    },
    description: {
      es: "Calcula intereses de un crédito por monto, tasa anual, plazo en meses y tipo de interés para estimar cuánto pagarías en total.",
      en: "Calculate credit interest by amount, annual rate, term in months, and interest type to estimate how much you would pay in total."
    }
  },
  "loan-payment": {
    title: {
      es: "Calculadora de cuota de préstamo online | Tools Platforms",
      en: "Online Loan Payment Calculator | Tools Platforms"
    },
    description: {
      es: "Calcula la cuota mensual de un préstamo con monto, tasa anual o mensual y plazo en meses, más intereses y total estimado.",
      en: "Calculate a loan's monthly payment using amount, annual or monthly rate, and term in months, plus estimated interest and total paid."
    }
  },
  "salary-increase": {
    title: {
      es: "Calculadora de aumento salarial | Neto y bruto",
      en: "Salary Increase Calculator | Net and Gross Raise"
    },
    description: {
      es: "Calcula cómo queda tu salario después de un aumento porcentual. Estima el nuevo sueldo bruto, neto con descuentos Colombia, valor del aumento y diferencia anual.",
      en: "Calculate your salary after a percentage raise. Estimate the new gross salary, Colombia net salary with deductions, increase amount, and annual difference."
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
      es: "Calculadora de horas trabajadas | Horas laborales",
      en: "Worked Hours Calculator | Add Work Hours Online"
    },
    description: {
      es: "Calcula y suma horas trabajadas por día, jornada o semana. Útil para calcular horas de trabajo, horas laborales y tiempo total.",
      en: "Calculate and add worked hours by day, shift, or week. Useful for work hours, labor time, and total time tracking."
    }
  },
  "freelance-rate": {
    title: {
      es: "Calculadora de cuánto cobrar freelance | Tarifa por hora",
      en: "Freelance Rate Calculator | Hourly Rate"
    },
    description: {
      es: "Calcula cuánto cobrar como freelance por hora, día, semana o mes según tu ingreso deseado, días y horas de trabajo.",
      en: "Calculate how much to charge as a freelancer per hour, day, week, or month based on income target, work days, and hours."
    }
  },
  "days-between-dates": {
    title: {
      es: "Contador de días entre fechas | Calculador de días calendario",
      en: "Days Between Dates Calculator Online | Date Counter"
    },
    description: {
      es: "Cuenta días calendario entre dos fechas para trámites, viajes, entregas o planeación. Incluye semanas completas y días restantes.",
      en: "Count calendar days between two dates for paperwork, trips, deliveries, or planning. Includes full weeks and remaining days."
    }
  },
  "days-until-date": {
    title: {
      es: "Cuántos días faltan para una fecha | Contador de días",
      en: "Days Until a Date Calculator | Days Left Counter"
    },
    description: {
      es: "Cuenta cuántos días faltan para una fecha, evento, entrega o plazo. Calcula días calendario, semanas completas y días restantes.",
      en: "Count how many days are left until a date, event, delivery, or deadline. See calendar days, full weeks, and remaining days."
    }
  },
  "exact-age": {
    title: {
      es: "Calculadora de edad exacta online | Años, meses y días",
      en: "Exact Age Calculator Online | Years, Months, Days"
    },
    description: {
      es: "Calcula edad exacta desde una fecha de nacimiento en años, meses y días, con meses totales, días totales y próximo cumpleaños.",
      en: "Calculate exact age from a birth date in years, months, and days, with total months, total days, and next birthday."
    }
  },
  "unit-converter": {
    title: {
      es: "Conversor de unidades online | kg, libras, km y millas",
      en: "Online Unit Converter | kg to lb, km to Miles"
    },
    description: {
      es: "Convierte unidades de longitud, peso, masa y temperatura: kilogramos, libras, kilómetros, millas, metros, centímetros y grados.",
      en: "Convert length, mass, weight, and temperature units: kilograms, pounds, kilometers, miles, meters, centimeters, and degrees."
    }
  },
  "text-case-converter": {
    title: {
      es: "Convertidor de mayúsculas y minúsculas online | Texto",
      en: "Uppercase and Lowercase Converter | Text Case"
    },
    description: {
      es: "Convierte texto a mayúsculas, minúsculas, capitalizado o tipo oración. Pasa mayúscula a minúscula y limpia textos rápido.",
      en: "Convert text to uppercase, lowercase, title case, or sentence case. Format and clean text quickly in your browser."
    }
  },
  "secure-password-generator": {
    title: {
      es: "Generador de contraseñas seguras online | Password generator",
      en: "Secure Password Generator Online | Random Passwords"
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

function removeStructuredData() {
  document.head.querySelectorAll('script[data-tools-platforms-jsonld="true"]').forEach((element) => {
    element.remove();
  });
}

function appendStructuredData(id: string, data: object) {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.dataset.toolsPlatformsJsonld = "true";
  script.id = id;
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

export function applyToolStructuredData(slug: string, locale: Locale) {
  removeStructuredData();

  const tool = tools.find((item) => item.slug === slug);

  if (!tool) {
    return;
  }

  const metadata = getToolSeo(slug, locale);
  const title = getLocalizedText(metadata.title, locale);
  const description = getLocalizedText(metadata.description, locale);
  const url = `${siteUrl}${localizePath(metadata.canonicalPath, locale)}`;
  const content = toolContentById[tool.id];
  const faqItems =
    content?.faqs.map((faq) => ({
      "@type": "Question",
      name: getLocalizedText(faq.question, locale),
      acceptedAnswer: {
        "@type": "Answer",
        text: getLocalizedText(faq.answer, locale)
      }
    })) ?? [];

  const graph: object[] = [
    {
      "@type": "SoftwareApplication",
      "@id": `${url}#tool`,
      name: title,
      description,
      url,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      isAccessibleForFree: true,
      inLanguage: locale,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD"
      }
    }
  ];

  if (faqItems.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faqItems,
      inLanguage: locale
    });
  }

  appendStructuredData("tools-platforms-tool-schema", {
    "@context": "https://schema.org",
    "@graph": graph
  });
}

export function clearStructuredData() {
  removeStructuredData();
}
