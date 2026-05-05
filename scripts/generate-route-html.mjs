import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const distRoot = path.join(projectRoot, "dist");
const siteUrl = "https://toolsplatforms.com";
const siteName = "Tools Platforms";

const pages = [
  {
    path: "/",
    title: "Tools Platforms | Calculadoras y herramientas online",
    description:
      "Herramientas online para resolver cálculos de salario, liquidación, créditos, trabajo, fechas, conversiones, texto y tareas prácticas."
  },
  {
    path: "/privacy",
    title: "Política de privacidad | Tools Platforms",
    description:
      "Consulta cómo Tools Platforms trata información, cookies, datos técnicos, herramientas online, analítica y anuncios."
  },
  {
    path: "/terms",
    title: "Términos y condiciones | Tools Platforms",
    description:
      "Lee las condiciones de uso de Tools Platforms, el alcance de las herramientas, limitaciones y responsabilidades."
  },
  {
    path: "/tools/colombia-net-salary-calculator",
    title: "Calculadora de salario neto Colombia 2026 | Tools Platforms",
    description:
      "Calcula tu salario neto en Colombia después de salud, pensión, auxilio de transporte, Fondo de Solidaridad y deducciones de nómina."
  },
  {
    path: "/tools/colombia-employment-settlement-calculator",
    title: "Calculadora de liquidación Colombia 2026 | Tools Platforms",
    description:
      "Calcula una estimación de liquidación laboral en Colombia con cesantías, intereses, prima, vacaciones, salario pendiente e indemnización si aplica."
  },
  {
    path: "/tools/credit-interest-calculator",
    title: "Calculadora de intereses de crédito | Tools Platforms",
    description:
      "Calcula cuánto pagarías en intereses por un préstamo según el monto, la tasa anual, el plazo en meses y el tipo de interés."
  },
  {
    path: "/tools/loan-payment-calculator",
    title: "Calculadora de cuota de préstamo | Tools Platforms",
    description:
      "Calcula la cuota mensual estimada de un préstamo con monto, tasa anual o mensual y plazo en meses."
  },
  {
    path: "/tools/cop-to-usd-converter",
    title: "Conversor COP a USD con TRM | Tools Platforms",
    description:
      "Convierte pesos colombianos a dólares y dólares a pesos usando una TRM de referencia para estimar el valor de cambio."
  },
  {
    path: "/tools/worked-hours-calculator",
    title: "Calculadora de horas trabajadas | Tools Platforms",
    description:
      "Suma horas trabajadas por jornadas con fecha, hora de inicio y hora de finalización para empleados, freelancers y turnos."
  },
  {
    path: "/tools/hourly-salary-calculator",
    title: "Calculadora de salario por horas (Colombia) | Tools Platforms",
    description:
      "Convierte un salario mensual en valor por hora en Colombia usando la jornada legal vigente o una jornada semanal personalizada."
  },
  {
    path: "/tools/employee-salary-for-independents-calculator",
    title: "Calculadora de sueldo de empleado para independientes (Colombia) | Tools Platforms",
    description:
      "Convierte lo que cobras por hora como independiente en sueldo semanal, quincenal y mensual como empleado, con neto estimado en Colombia."
  },
  {
    path: "/tools/freelance-rate-calculator",
    title: "Calculadora de cuánto cobrar freelance | Tools Platforms",
    description:
      "Calcula cuánto cobrar por hora, día, semana o mes como freelance según tu ingreso deseado y horas de trabajo."
  },
  {
    path: "/tools/days-between-dates-calculator",
    title: "Contador de días entre fechas | Tools Platforms",
    description:
      "Cuenta cuántos días hay entre dos fechas y convierte el resultado a semanas completas y días restantes."
  },
  {
    path: "/tools/exact-age-calculator",
    title: "Calculadora de edad exacta | Tools Platforms",
    description:
      "Calcula tu edad exacta en años, meses y días, además de los días que faltan para tu próximo cumpleaños."
  },
  {
    path: "/tools/unit-converter",
    title: "Conversor de unidades online | Tools Platforms",
    description:
      "Convierte unidades comunes de longitud, peso, masa y temperatura con resultados rápidos y decimales ajustables."
  },
  {
    path: "/tools/text-case-converter",
    title: "Convertidor de mayúsculas y minúsculas | Tools Platforms",
    description:
      "Transforma texto a mayúsculas, minúsculas, capitalizado o tipo oración directamente desde tu navegador."
  },
  {
    path: "/tools/secure-password-generator",
    title: "Generador de contraseñas seguras | Tools Platforms",
    description:
      "Genera contraseñas aleatorias y seguras con longitud personalizada, símbolos, números, mayúsculas y minúsculas."
  },
  {
    path: "/tools/case-style-converter",
    title: "Convertidor camelCase, PascalCase y snake_case | Tools Platforms",
    description:
      "Convierte frases a camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE y otros estilos usados en código."
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

  return html.replace(attribute, escapedValue);
}

function renderPageHtml(baseHtml, page) {
  const canonicalUrl = `${siteUrl}${page.path}`;

  return [
    ["title", "content", page.title],
    ["meta-description", "content", page.description],
    ["canonical", "href", canonicalUrl],
    ["og:title", "content", page.title],
    ["og:description", "content", page.description],
    ["og:type", "content", "website"],
    ["og:url", "content", canonicalUrl],
    ["og:site_name", "content", siteName]
  ].reduce((html, [selector, attribute, value]) => setTagAttribute(html, selector, attribute, value), baseHtml);
}

async function writeRouteHtml(baseHtml, page) {
  const html = renderPageHtml(baseHtml, page);

  if (page.path === "/") {
    await writeFile(path.join(distRoot, "index.html"), html, "utf8");
    return;
  }

  const routeDirectory = path.join(distRoot, ...page.path.split("/").filter(Boolean));
  await mkdir(routeDirectory, { recursive: true });
  await writeFile(path.join(routeDirectory, "index.html"), html, "utf8");
}

const baseHtml = await readFile(path.join(distRoot, "index.html"), "utf8");

await Promise.all(pages.map((page) => writeRouteHtml(baseHtml, page)));

console.log(`Generated static SEO HTML for ${pages.length} routes.`);
