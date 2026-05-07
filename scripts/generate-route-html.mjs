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
      es: "Calculadora de salario neto Colombia 2026 | Tools Platforms",
      en: "Colombia Net Salary Calculator 2026 | Tools Platforms"
    },
    description: {
      es: "Calcula tu salario neto en Colombia después de salud, pensión, auxilio de transporte, Fondo de Solidaridad y deducciones de nómina.",
      en: "Calculate your take-home salary in Colombia after health, pension, transport allowance, solidarity fund, and payroll deductions."
    }
  },
  {
    path: "/tools/colombia-employment-settlement-calculator",
    title: {
      es: "Calculadora de liquidación laboral Colombia 2026 | Tools Platforms",
      en: "Colombia Employment Settlement Calculator 2026 | Tools Platforms"
    },
    description: {
      es: "Calcula una liquidación laboral en Colombia con cesantías, prima, vacaciones, salario pendiente e indemnización si aplica.",
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
      es: "Calculadora de horas trabajadas online | Sumar horas de trabajo",
      en: "Worked Hours Calculator Online | Add Work Hours"
    },
    description: {
      es: "Suma horas trabajadas por día o jornada. Calcula horas de trabajo, horas laborales y tiempo total entre hora de inicio y finalización.",
      en: "Add worked hours by day or shift. Calculate work hours, total labor time, and time between start and end times."
    }
  },
  {
    path: "/tools/hourly-salary-calculator",
    title: {
      es: "Calculadora de salario por horas (Colombia) | Tools Platforms",
      en: "Hourly Salary Calculator (Colombia) | Tools Platforms"
    },
    description: {
      es: "Convierte un salario mensual en valor por hora en Colombia usando la jornada legal vigente o una jornada semanal personalizada.",
      en: "Convert a monthly salary into an hourly value in Colombia using the current legal workweek or a custom weekly schedule."
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
      es: "Contador de días entre fechas online | Calculador de días",
      en: "Days Between Dates Calculator Online | Date Counter"
    },
    description: {
      es: "Cuenta días calendario entre dos fechas para trámites, viajes o planeación. Incluye semanas completas y días restantes.",
      en: "Count calendar days between two dates for paperwork, trips, or planning. Includes full weeks and remaining days."
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
      en: "Online Unit Converter | Kilograms, Pounds, km, Miles"
    },
    description: {
      es: "Convierte unidades de longitud, peso, masa y temperatura como kilogramos, libras, kilómetros, millas, metros y grados.",
      en: "Convert length, mass, weight, and temperature units such as kilograms, pounds, kilometers, miles, meters, and degrees."
    }
  },
  {
    path: "/tools/text-case-converter",
    title: {
      es: "Convertidor de mayúsculas a minúsculas online | Tools Platforms",
      en: "Uppercase and Lowercase Text Converter Online | Tools Platforms"
    },
    description: {
      es: "Convierte texto a mayúsculas, minúsculas, capitalizado o tipo oración. Útil para pasar mayúscula a minúscula y ordenar textos.",
      en: "Convert text to uppercase, lowercase, title case, or sentence case. Useful for formatting and cleaning written text."
    }
  },
  {
    path: "/tools/secure-password-generator",
    title: {
      es: "Generador de contraseñas seguras | Tools Platforms",
      en: "Secure Password Generator | Tools Platforms"
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

  return setAlternateLinks(html, page.path);
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
