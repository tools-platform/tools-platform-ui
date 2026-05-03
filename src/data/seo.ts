import { tools } from "./catalog";

const siteName = "Tools Platforms";
const siteUrl = "https://toolsplatforms.com";

export type SeoMetadata = {
  title: string;
  description: string;
  canonicalPath: string;
  type?: "website" | "article";
};

const toolSeoById: Record<string, Omit<SeoMetadata, "canonicalPath">> = {
  "net-salary-colombia": {
    title: "Calculadora de salario neto Colombia 2026 | Tools Platforms",
    description:
      "Calcula tu salario neto en Colombia después de salud, pensión, auxilio de transporte, Fondo de Solidaridad y deducciones de nómina."
  },
  "employment-settlement-colombia": {
    title: "Calculadora de liquidación Colombia 2026 | Tools Platforms",
    description:
      "Calcula una estimación de liquidación laboral en Colombia con cesantías, intereses, prima, vacaciones, salario pendiente e indemnización si aplica."
  },
  "credit-interest": {
    title: "Calculadora de intereses de crédito | Tools Platforms",
    description:
      "Calcula cuánto pagarías en intereses por un préstamo según el monto, la tasa anual, el plazo en meses y el tipo de interés."
  },
  "loan-payment": {
    title: "Calculadora de cuota de préstamo | Tools Platforms",
    description:
      "Calcula la cuota mensual estimada de un préstamo con monto, tasa anual o mensual y plazo en meses."
  },
  "cop-usd": {
    title: "Conversor COP a USD con TRM | Tools Platforms",
    description:
      "Convierte pesos colombianos a dólares y dólares a pesos usando una TRM de referencia para estimar el valor de cambio."
  },
  "worked-hours": {
    title: "Calculadora de horas trabajadas | Tools Platforms",
    description:
      "Suma horas trabajadas por jornadas con fecha, hora de inicio y hora de finalización para empleados, freelancers y turnos."
  },
  "freelance-rate": {
    title: "Calculadora de cuánto cobrar freelance | Tools Platforms",
    description:
      "Calcula cuánto cobrar por hora, día, semana o mes como freelance según tu ingreso deseado y horas de trabajo."
  },
  "days-between-dates": {
    title: "Contador de días entre fechas | Tools Platforms",
    description:
      "Cuenta cuántos días hay entre dos fechas y convierte el resultado a semanas completas y días restantes."
  },
  "exact-age": {
    title: "Calculadora de edad exacta | Tools Platforms",
    description:
      "Calcula tu edad exacta en años, meses y días, además de los días que faltan para tu próximo cumpleaños."
  },
  "unit-converter": {
    title: "Conversor de unidades online | Tools Platforms",
    description:
      "Convierte unidades comunes de longitud, peso, masa y temperatura con resultados rápidos y decimales ajustables."
  },
  "text-case-converter": {
    title: "Convertidor de mayúsculas y minúsculas | Tools Platforms",
    description:
      "Transforma texto a mayúsculas, minúsculas, capitalizado o tipo oración directamente desde tu navegador."
  },
  "secure-password-generator": {
    title: "Generador de contraseñas seguras | Tools Platforms",
    description:
      "Genera contraseñas aleatorias y seguras con longitud personalizada, símbolos, números, mayúsculas y minúsculas."
  },
  "case-style-converter": {
    title: "Convertidor camelCase, PascalCase y snake_case | Tools Platforms",
    description:
      "Convierte frases a camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE y otros estilos usados en código."
  }
};

export const homeSeo: SeoMetadata = {
  title: "Tools Platforms | Calculadoras y herramientas online",
  description:
    "Herramientas online para resolver cálculos de salario, liquidación, créditos, trabajo, fechas, conversiones, texto y tareas prácticas.",
  canonicalPath: "/"
};

export const legalSeo: Record<"privacy" | "terms", SeoMetadata> = {
  privacy: {
    title: "Política de privacidad | Tools Platforms",
    description:
      "Consulta cómo Tools Platforms trata información, cookies, datos técnicos, herramientas online, analítica y anuncios.",
    canonicalPath: "/privacy"
  },
  terms: {
    title: "Términos y condiciones | Tools Platforms",
    description:
      "Lee las condiciones de uso de Tools Platforms, el alcance de las herramientas, limitaciones y responsabilidades.",
    canonicalPath: "/terms"
  }
};

export function getToolSeo(slug: string): SeoMetadata {
  const tool = tools.find((item) => item.slug === slug);

  if (!tool) {
    return {
      title: "Herramienta no encontrada | Tools Platforms",
      description: "Esta herramienta todavía no está disponible en Tools Platforms.",
      canonicalPath: `/tools/${slug}`
    };
  }

  const toolSeo = toolSeoById[tool.id] ?? {
    title: `${tool.name} | Tools Platforms`,
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

  const newElement = selector.startsWith("link") ? document.createElement("link") : document.createElement("meta");

  if (selector.includes("rel=\"canonical\"")) {
    newElement.setAttribute("rel", "canonical");
  }

  const nameMatch = selector.match(/name="([^"]+)"/);
  const propertyMatch = selector.match(/property="([^"]+)"/);

  if (nameMatch?.[1]) {
    newElement.setAttribute("name", nameMatch[1]);
  }

  if (propertyMatch?.[1]) {
    newElement.setAttribute("property", propertyMatch[1]);
  }

  newElement.setAttribute(attribute, value);
  document.head.appendChild(newElement);
}

export function applySeo(metadata: SeoMetadata) {
  const canonicalUrl = `${siteUrl}${metadata.canonicalPath}`;

  document.title = metadata.title;
  setMetaAttribute('meta[name="description"]', "content", metadata.description);
  setMetaAttribute('link[rel="canonical"]', "href", canonicalUrl);
  setMetaAttribute('meta[property="og:title"]', "content", metadata.title);
  setMetaAttribute('meta[property="og:description"]', "content", metadata.description);
  setMetaAttribute('meta[property="og:type"]', "content", metadata.type ?? "website");
  setMetaAttribute('meta[property="og:url"]', "content", canonicalUrl);
  setMetaAttribute('meta[property="og:site_name"]', "content", siteName);
}
