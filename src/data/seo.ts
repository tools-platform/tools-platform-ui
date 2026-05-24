import { tools } from "./catalog";
import { toolContentById } from "./toolContent";
import { homeSeo, legalSeo, toolSeoById } from "../locales/seoCopy";
import { getLocalizedText, localizePath, type Locale, type LocalizedText } from "../i18n";

const siteName = "Tools Platforms";
const siteUrl = "https://toolsplatforms.com";

export { homeSeo, legalSeo };

export type SeoMetadata = {
  title: LocalizedText;
  description: LocalizedText;
  canonicalPath: string;
  type?: "website" | "article";
  robots?: string;
};

export function getToolSeo(slug: string, locale: Locale): SeoMetadata {
  const tool = tools.find((item) => item.slug === slug);

  if (!tool) {
    return {
      title: {
        es: "Herramienta no encontrada | Tools Platforms",
        en: "Tool Not Found | Tools Platforms",
        hi: "टूल नहीं मिला | Tools Platforms"
      },
      description: {
        es: "Esta herramienta todavía no está disponible en Tools Platforms.",
        en: "This tool is not available yet on Tools Platforms.",
        hi: "यह टूल अभी Tools Platforms पर उपलब्ध नहीं है."
      },
      canonicalPath: "/",
      robots: "noindex, follow"
    };
  }

  const toolSeo = toolSeoById[tool.id] ?? {
    title: {
      es: `${getLocalizedText(tool.name, locale)} | Tools Platforms`,
      en: `${getLocalizedText(tool.name, locale)} | Tools Platforms`,
      hi: `${getLocalizedText(tool.name, locale)} | Tools Platforms`
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
  setMetaAttribute('meta[name="robots"]', "content", metadata.robots ?? "index, follow");
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
