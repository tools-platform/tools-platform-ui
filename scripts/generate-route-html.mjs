import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const distRoot = path.join(projectRoot, "dist");
const siteUrl = "https://toolsplatforms.com";
const siteName = "Tools Platforms";
const supportedLocales = ["es", "en"];
const sitemapLastModified = "2026-05-06";

const localizedPages = [
  {
    path: "/",
    title: {
      es: "Tools Platforms | Calculadoras y herramientas online",
      en: "Tools Platforms | Online calculators and utilities"
    },
    description: {
      es: "Herramientas online para resolver cálculos de salario, liquidación, créditos, trabajo, fechas, conversiones, texto y tareas prácticas.",
      en: "Online tools for salaries, settlements, loans, work hours, dates, conversions, text utilities, and practical tasks."
    }
  },
  {
    path: "/privacy",
    title: {
      es: "Política de privacidad | Tools Platforms",
      en: "Privacy Policy | Tools Platforms"
    },
    description: {
      es: "Consulta cómo Tools Platforms trata información, cookies, datos técnicos, herramientas online, analítica y anuncios.",
      en: "Learn how Tools Platforms handles information, cookies, technical data, analytics, online tools, and ads."
    }
  },
  {
    path: "/terms",
    title: {
      es: "Términos y condiciones | Tools Platforms",
      en: "Terms and Conditions | Tools Platforms"
    },
    description: {
      es: "Lee las condiciones de uso de Tools Platforms, el alcance de las herramientas, limitaciones y responsabilidades.",
      en: "Read the terms that govern your use of Tools Platforms, its tools, limitations, and responsibilities."
    }
  },
  {
    path: "/tools/colombia-net-salary-calculator",
    title: {
      es: "Calculadora de salario neto Colombia 2026 | Sueldo neto",
      en: "Colombia Net Salary Calculator 2026 | Take-Home Pay"
    },
    description: {
      es: "Calcula tu sueldo o salario neto en Colombia para 2026 con salud, pensión, auxilio de transporte, Fondo de Solidaridad y deducciones.",
      en: "Calculate your 2026 take-home pay in Colombia with health, pension, transport allowance, solidarity fund, and payroll deductions."
    }
  },
  {
    path: "/tools/colombia-employment-settlement-calculator",
    title: {
      es: "Calculadora de liquidación laboral Colombia 2026 | Liquidación",
      en: "Colombia Employment Settlement Calculator 2026 | Final Pay"
    },
    description: {
      es: "Calcula cuánto equivale tu liquidación laboral en Colombia con cesantías, prima, vacaciones, salario pendiente e indemnización si aplica.",
      en: "Estimate a Colombia employment settlement with severance, service bonus, vacation, pending salary, and dismissal compensation when applicable."
    }
  },
  {
    path: "/tools/credit-interest-calculator",
    title: {
      es: "Calculadora de intereses de crédito online | Tools Platforms",
      en: "Online Credit Interest Calculator | Tools Platforms"
    },
    description: {
      es: "Calcula intereses de un crédito por monto, tasa anual, plazo en meses y tipo de interés para estimar cuánto pagarías en total.",
      en: "Calculate credit interest by amount, annual rate, term in months, and interest type to estimate how much you would pay in total."
    }
  },
  {
    path: "/tools/loan-payment-calculator",
    title: {
      es: "Calculadora de cuota de préstamo online | Tools Platforms",
      en: "Online Loan Payment Calculator | Tools Platforms"
    },
    description: {
      es: "Calcula la cuota mensual de un préstamo con monto, tasa anual o mensual y plazo en meses, más intereses y total estimado.",
      en: "Calculate a loan's monthly payment using amount, annual or monthly rate, and term in months, plus estimated interest and total paid."
    }
  },
  {
    path: "/tools/salary-increase-calculator",
    title: {
      es: "Calculadora de aumento salarial | Porcentaje de aumento",
      en: "Salary Increase Calculator | Percentage Raise"
    },
    description: {
      es: "Calcula cómo queda tu salario después de un aumento porcentual. Estima el nuevo sueldo, valor del aumento y diferencia anual.",
      en: "Calculate your salary after a percentage raise. Estimate the new salary, increase amount, and annual difference."
    }
  },
  {
    path: "/tools/cop-to-usd-converter",
    title: {
      es: "Conversor COP a USD con TRM | Tools Platforms",
      en: "COP to USD Converter with Reference Rate | Tools Platforms"
    },
    description: {
      es: "Convierte pesos colombianos a dólares y dólares a pesos usando una TRM de referencia para estimar el valor de cambio.",
      en: "Convert Colombian pesos to US dollars and back using a reference exchange rate."
    }
  },
  {
    path: "/tools/worked-hours-calculator",
    title: {
      es: "Calculadora de horas trabajadas | Sumar horas de trabajo",
      en: "Worked Hours Calculator | Add Work Hours Online"
    },
    description: {
      es: "Calcula y suma horas trabajadas por día, jornada o semana. Útil para calcular mis horas de trabajo, horas laborales y tiempo total.",
      en: "Calculate and add worked hours by day, shift, or week. Useful for work hours, labor time, and total time tracking."
    }
  },
  {
    path: "/tools/hourly-salary-calculator",
    title: {
      es: "Calculadora de salario por hora Colombia | Cuánto gano por hora",
      en: "Hourly Salary Calculator (Colombia) | Hourly Pay"
    },
    description: {
      es: "Calcula cuánto ganas por hora en Colombia a partir de tu salario mensual, jornada legal vigente o tus horas semanales reales.",
      en: "Calculate how much you earn per hour in Colombia from a monthly salary, legal workweek, or custom weekly hours."
    }
  },
  {
    path: "/tools/employee-salary-for-independents-calculator",
    title: {
      es: "Calculadora de sueldo de empleado para independientes (Colombia) | Tools Platforms",
      en: "Employee Salary Equivalent for Independents (Colombia) | Tools Platforms"
    },
    description: {
      es: "Convierte lo que cobras por hora como independiente en sueldo semanal, quincenal y mensual como empleado, con neto estimado en Colombia.",
      en: "Convert what you charge per hour as an independent worker into an equivalent employee salary in Colombia, including estimated net income."
    }
  },
  {
    path: "/tools/freelance-rate-calculator",
    title: {
      es: "Calculadora de cuánto cobrar freelance | Tarifa por hora",
      en: "Freelance Rate Calculator | Hourly Rate"
    },
    description: {
      es: "Calcula cuánto cobrar como freelance por hora, día, semana o mes según tu ingreso deseado, días y horas de trabajo.",
      en: "Calculate how much to charge as a freelancer per hour, day, week, or month based on income target, work days, and hours."
    }
  },
  {
    path: "/tools/days-between-dates-calculator",
    title: {
      es: "Contador de días entre fechas | Calculador de días calendario",
      en: "Days Between Dates Calculator Online | Date Counter"
    },
    description: {
      es: "Cuenta días calendario entre dos fechas para trámites, viajes, entregas o planeación. Incluye semanas completas y días restantes.",
      en: "Count calendar days between two dates for paperwork, trips, deliveries, or planning. Includes full weeks and remaining days."
    }
  },
  {
    path: "/tools/days-until-date-calculator",
    title: {
      es: "Cuántos días faltan para una fecha | Contador de días",
      en: "Days Until a Date Calculator | Days Left Counter"
    },
    description: {
      es: "Cuenta cuántos días faltan para una fecha, evento, entrega o plazo. Calcula días calendario, semanas completas y días restantes.",
      en: "Count how many days are left until a date, event, delivery, or deadline. See calendar days, full weeks, and remaining days."
    }
  },
  {
    path: "/tools/exact-age-calculator",
    title: {
      es: "Calculadora de edad exacta online | Años, meses y días",
      en: "Exact Age Calculator Online | Years, Months, Days"
    },
    description: {
      es: "Calcula edad exacta desde una fecha de nacimiento en años, meses y días, con meses totales, días totales y próximo cumpleaños.",
      en: "Calculate exact age from a birth date in years, months, and days, with total months, total days, and next birthday."
    }
  },
  {
    path: "/tools/unit-converter",
    title: {
      es: "Conversor de unidades online | Kilos, libras, km y millas",
      en: "Online Unit Converter | kg, lb, km, Miles"
    },
    description: {
      es: "Convierte unidades de longitud, peso, masa y temperatura: kilogramos, libras, kilómetros, millas, metros, centímetros y grados.",
      en: "Convert length, mass, weight, and temperature units: kilograms, pounds, kilometers, miles, meters, centimeters, and degrees."
    }
  },
  {
    path: "/tools/text-case-converter",
    title: {
      es: "Convertidor de mayúsculas y minúsculas | Texto online",
      en: "Uppercase and Lowercase Text Converter | Online Text"
    },
    description: {
      es: "Convierte texto a mayúsculas, minúsculas, capitalizado o tipo oración. Pasa mayúscula a minúscula y limpia textos rápido.",
      en: "Convert text to uppercase, lowercase, title case, or sentence case. Format and clean text quickly in your browser."
    }
  },
  {
    path: "/tools/secure-password-generator",
    title: {
      es: "Generador de contraseñas seguras online | Password generator",
      en: "Secure Password Generator Online | Random Passwords"
    },
    description: {
      es: "Genera contraseñas aleatorias y seguras con longitud personalizada, símbolos, números, mayúsculas y minúsculas.",
      en: "Generate secure random passwords with custom length, symbols, numbers, uppercase, and lowercase letters."
    }
  },
  {
    path: "/tools/case-style-converter",
    title: {
      es: "Convertidor camelCase, PascalCase y snake_case | Tools Platforms",
      en: "camelCase, PascalCase, and snake_case Converter | Tools Platforms"
    },
    description: {
      es: "Convierte frases a camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE y otros estilos usados en código.",
      en: "Convert phrases to camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, and other code naming styles."
    }
  }
];

const toolFaqsByPath = {
  "/tools/colombia-net-salary-calculator": [
    {
      question: {
        es: "¿Cómo calcular mi salario neto en Colombia?",
        en: "How do I calculate my net salary in Colombia?"
      },
      answer: {
        es: "Escribe tu salario mensual bruto y el año de reglas. La calculadora descuenta salud, pensión y otros conceptos aplicables para estimar el valor neto mensual y quincenal.",
        en: "Enter your gross monthly salary and rule year. The calculator subtracts health, pension, and applicable items to estimate monthly and biweekly take-home pay."
      }
    },
    {
      question: {
        es: "¿El auxilio de transporte siempre aplica?",
        en: "Does the transport allowance always apply?"
      },
      answer: {
        es: "No. Depende del salario y de los límites legales del año seleccionado. La herramienta valida si el salario cumple el límite.",
        en: "No. It depends on the salary and the legal limits of the selected year. The tool checks whether the salary meets that threshold."
      }
    }
  ],
  "/tools/hourly-salary-calculator": [
    {
      question: {
        es: "¿Se puede calcular el valor hora dividiendo el salario mensual entre 240?",
        en: "Can I calculate hourly pay by dividing monthly salary by 240?"
      },
      answer: {
        es: "Sí, es una referencia común cuando se usa una jornada mensual de 240 horas. La herramienta también permite ajustar las horas semanales para reflejar la jornada legal vigente o tu horario real.",
        en: "Yes, it is a common reference when using a 240-hour monthly schedule. The tool also lets you adjust weekly hours to match the current legal workweek or your real schedule."
      }
    },
    {
      question: {
        es: "¿Cómo saber cuánto gano por hora?",
        en: "How do I know how much I earn per hour?"
      },
      answer: {
        es: "Ingresa tu salario mensual y las horas semanales de trabajo. La herramienta divide el salario entre las horas estimadas del mes para mostrar el valor por hora.",
        en: "Enter your monthly salary and weekly work hours. The tool divides salary by estimated monthly hours to show hourly pay."
      }
    }
  ],
  "/tools/colombia-employment-settlement-calculator": [
    {
      question: {
        es: "¿A cuánto equivale la liquidación laboral?",
        en: "What does an employment settlement include?"
      },
      answer: {
        es: "Depende de salario, fechas, prestaciones pendientes, vacaciones, motivo de terminación y si aplica indemnización. La calculadora separa esos conceptos para darte una estimación.",
        en: "It depends on salary, dates, pending benefits, vacation, termination reason, and whether dismissal compensation applies. The calculator separates those items to estimate the payout."
      }
    },
    {
      question: {
        es: "¿Puedo calcular una liquidación de 2025?",
        en: "Can I calculate a 2025 employment settlement?"
      },
      answer: {
        es: "Sí, puedes elegir el año de reglas disponible. La herramienta usa ese año para valores legales como salario mínimo y auxilio de transporte cuando aplican.",
        en: "Yes, you can choose an available rule year. The tool uses that year for legal values such as minimum wage and transport allowance when they apply."
      }
    }
  ],
  "/tools/salary-increase-calculator": [
    {
      question: {
        es: "¿Cómo calcular un aumento salarial?",
        en: "How do I calculate a salary increase?"
      },
      answer: {
        es: "Ingresa el salario actual y el porcentaje de aumento. La calculadora multiplica el salario por ese porcentaje y suma el resultado al salario actual.",
        en: "Enter the current salary and increase percentage. The calculator multiplies the salary by that percentage and adds the result to the current salary."
      }
    },
    {
      question: {
        es: "¿El resultado es salario neto?",
        en: "Is the result net salary?"
      },
      answer: {
        es: "No. Es una estimación simple del salario antes de descuentos. Nómina, impuestos o acuerdos internos pueden cambiar el valor final.",
        en: "No. It is a simple salary estimate before deductions. Payroll, taxes, or internal agreements may change the final amount."
      }
    }
  ],
  "/tools/worked-hours-calculator": [
    {
      question: {
        es: "¿Cómo sumar horas trabajadas?",
        en: "How do I add worked hours?"
      },
      answer: {
        es: "Crea una jornada por cada día o turno con hora de inicio y finalización. La calculadora suma todos los rangos y muestra el total acumulado.",
        en: "Create one entry for each day or shift with start and end time. The calculator adds all ranges and shows the accumulated total."
      }
    },
    {
      question: {
        es: "¿Calcula horas extra?",
        en: "Does it calculate overtime?"
      },
      answer: {
        es: "No. Solo suma tiempo trabajado; los recargos dependen de reglas laborales y acuerdos específicos.",
        en: "No. It only adds worked time; overtime surcharges depend on labor rules and specific agreements."
      }
    }
  ],
  "/tools/days-between-dates-calculator": [
    {
      question: {
        es: "¿Cómo calcular días entre dos fechas?",
        en: "How do I calculate days between two dates?"
      },
      answer: {
        es: "Selecciona la fecha inicial y la fecha final. La herramienta calcula los días calendario entre ambas y puede incluir la fecha final si necesitas contar ambos extremos.",
        en: "Select the start date and end date. The tool calculates calendar days between them and can include the end date when both endpoints should count."
      }
    },
    {
      question: {
        es: "¿Cuenta días hábiles?",
        en: "Does it count business days?"
      },
      answer: {
        es: "No. Cuenta días calendario.",
        en: "No. It counts calendar days."
      }
    }
  ],
  "/tools/days-until-date-calculator": [
    {
      question: {
        es: "¿Cómo saber cuántos días faltan para una fecha?",
        en: "How do I know how many days are left until a date?"
      },
      answer: {
        es: "Selecciona la fecha objetivo y la herramienta cuenta los días calendario desde hoy hasta esa fecha.",
        en: "Select the target date and the tool counts calendar days from today until that date."
      }
    },
    {
      question: {
        es: "¿Cuenta días hábiles?",
        en: "Does it count business days?"
      },
      answer: {
        es: "No. Cuenta días calendario. Si necesitas días hábiles, festivos o reglas legales, revisa la norma correspondiente.",
        en: "No. It counts calendar days. If you need business days, holidays, or legal rules, check the relevant rule."
      }
    }
  ],
  "/tools/text-case-converter": [
    {
      question: {
        es: "¿Cómo convertir texto a mayúsculas?",
        en: "How do I convert text to uppercase?"
      },
      answer: {
        es: "Pega tu texto, elige la opción de mayúsculas y pulsa convertir. La herramienta transforma todo el contenido en el navegador.",
        en: "Paste your text, choose uppercase, and press convert. The tool transforms the content in your browser."
      }
    },
    {
      question: {
        es: "¿Puedo convertir mayúsculas a minúsculas?",
        en: "Can I convert uppercase to lowercase?"
      },
      answer: {
        es: "Sí. Elige minúsculas, pega tu texto y pulsa convertir para transformar todo el contenido.",
        en: "Yes. Choose lowercase, paste your text, and press convert to transform all content."
      }
    }
  ]
};

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function setTagAttribute(html, selector, attribute, value) {
  const escapedValue = escapeHtml(value);

  if (selector === "title") {
    return html.replace(/<title>.*?<\/title>/s, `<title>${escapedValue}</title>`);
  }

  if (selector === "meta-description") {
    return html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/s, `<meta name="description" content="${escapedValue}" />`);
  }

  if (selector.startsWith("og:")) {
    const property = selector;
    const pattern = new RegExp(`<meta\\s+property="${property}"\\s+content="[^"]*"\\s*\\/?>`, "s");
    return html.replace(pattern, `<meta property="${property}" content="${escapedValue}" />`);
  }

  if (selector === "canonical") {
    return html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/s, `<link rel="canonical" href="${escapedValue}" />`);
  }

  if (selector === "lang") {
    return html.replace(/<html([^>]*?)lang="[^"]*"([^>]*?)>/s, `<html$1lang="${escapedValue}"$2>`);
  }

  return html.replace(attribute, escapedValue);
}

function getLocalizedPath(pathname, locale) {
  if (locale === "en") {
    return pathname === "/" ? "/en" : `/en${pathname}`;
  }

  return pathname;
}

function getAbsoluteUrl(pathname, locale) {
  return `${siteUrl}${getLocalizedPath(pathname, locale)}`;
}

function renderAlternateLinks(pathname) {
  const spanishUrl = getAbsoluteUrl(pathname, "es");
  const englishUrl = getAbsoluteUrl(pathname, "en");

  return [
    `<link rel="alternate" hreflang="es" href="${escapeHtml(spanishUrl)}" />`,
    `<link rel="alternate" hreflang="en" href="${escapeHtml(englishUrl)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${escapeHtml(spanishUrl)}" />`
  ].join("\n    ");
}

function setAlternateLinks(html, pathname) {
  const alternateLinks = renderAlternateLinks(pathname);
  const cleanedHtml = html.replace(/\n\s*<link\s+rel="alternate"\s+hreflang="[^"]+"\s+href="[^"]*"\s*\/?>/g, "");

  return cleanedHtml.replace(/(\n\s*<link\s+rel="icon")/, `\n    ${alternateLinks}$1`);
}

function renderPageHtml(baseHtml, page, locale) {
  const localizedPath = getLocalizedPath(page.path, locale);
  const canonicalUrl = `${siteUrl}${localizedPath}`;

  const html = [
    ["lang", "content", locale],
    ["title", "content", page.title[locale]],
    ["meta-description", "content", page.description[locale]],
    ["canonical", "href", canonicalUrl],
    ["og:title", "content", page.title[locale]],
    ["og:description", "content", page.description[locale]],
    ["og:type", "content", "website"],
    ["og:url", "content", canonicalUrl],
    ["og:site_name", "content", siteName]
  ].reduce((html, [selector, attribute, value]) => setTagAttribute(html, selector, attribute, value), baseHtml);

  return injectStructuredData(setAlternateLinks(html, page.path), page, locale, canonicalUrl);
}

function serializeJsonLd(data) {
  return JSON.stringify(data).replaceAll("<", "\\u003c");
}

function renderToolStructuredData(page, locale, canonicalUrl) {
  if (!page.path.startsWith("/tools/")) {
    return "";
  }

  const graph = [
    {
      "@type": "SoftwareApplication",
      "@id": `${canonicalUrl}#tool`,
      name: page.title[locale],
      description: page.description[locale],
      url: canonicalUrl,
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

  const faqs = toolFaqsByPath[page.path];

  if (faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question[locale],
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer[locale]
        }
      })),
      inLanguage: locale
    });
  }

  return `    <script type="application/ld+json" data-tools-platforms-jsonld="true">${serializeJsonLd({
    "@context": "https://schema.org",
    "@graph": graph
  })}</script>\n`;
}

function injectStructuredData(html, page, locale, canonicalUrl) {
  const structuredData = renderToolStructuredData(page, locale, canonicalUrl);

  if (!structuredData) {
    return html;
  }

  return html.replace("</head>", `${structuredData}  </head>`);
}

async function writeRouteHtml(baseHtml, page, locale) {
  const localizedPath = getLocalizedPath(page.path, locale);
  const html = renderPageHtml(baseHtml, page, locale);

  if (localizedPath === "/") {
    await writeFile(path.join(distRoot, "index.html"), html, "utf8");
    return;
  }

  const routeDirectory = path.join(distRoot, ...localizedPath.split("/").filter(Boolean));
  await mkdir(routeDirectory, { recursive: true });
  await writeFile(path.join(routeDirectory, "index.html"), html, "utf8");
}

const baseHtml = await readFile(path.join(distRoot, "index.html"), "utf8");

await Promise.all(
  localizedPages.flatMap((page) => supportedLocales.map((locale) => writeRouteHtml(baseHtml, page, locale)))
);

function renderSitemapUrl(page, locale) {
  const loc = getAbsoluteUrl(page.path, locale);
  const changeFrequency =
    page.path === "/tools/cop-to-usd-converter"
      ? "daily"
      : page.path === "/"
        ? "weekly"
        : page.path === "/privacy" || page.path === "/terms"
          ? "yearly"
          : "monthly";
  const priority = page.path === "/" ? "1.0" : page.path.startsWith("/tools/") ? "0.8" : "0.3";

  return [
    "  <url>",
    `    <loc>${escapeHtml(loc)}</loc>`,
    `    <lastmod>${sitemapLastModified}</lastmod>`,
    `    <changefreq>${changeFrequency}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>"
  ].join("\n");
}

function renderSitemap() {
  const urls = localizedPages.flatMap((page) => supportedLocales.map((locale) => renderSitemapUrl(page, locale)));

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls.join("\n"),
    "</urlset>",
    ""
  ].join("\n");
}

await writeFile(path.join(distRoot, "sitemap.xml"), renderSitemap(), "utf8");

console.log(`Generated static SEO HTML for ${localizedPages.length * supportedLocales.length} routes.`);
console.log(`Generated localized sitemap for ${localizedPages.length * supportedLocales.length} URLs.`);
