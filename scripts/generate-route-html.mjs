import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const distRoot = path.join(projectRoot, "dist");
const siteUrl = "https://toolsplatforms.com";
const siteName = "Tools Platforms";
const sitemapLastModified = "2026-06-14";

async function loadTsModule(relativePath) {
  const source = await readFile(path.join(projectRoot, relativePath), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true
    }
  });
  const module = { exports: {} };
  const localRequire = (id) => {
    throw new Error(`Unexpected runtime import "${id}" while loading ${relativePath}. Keep locale modules data-only.`);
  };

  new Function("exports", "module", "require", outputText)(module.exports, module, localRequire);
  return module.exports;
}

function readToolRoutes(catalogSource) {
  const toolRoutes = [];
  const toolsStart = catalogSource.indexOf("export const tools");
  const toolsSource = toolsStart >= 0 ? catalogSource.slice(toolsStart) : catalogSource;
  const toolPattern = /\{[\s\S]*?id:\s*"([^"]+)"[\s\S]*?slug:\s*"([^"]+)"[\s\S]*?\n\s*\}/g;
  let match;

  while ((match = toolPattern.exec(toolsSource)) !== null) {
    toolRoutes.push({ id: match[1], slug: match[2] });
  }

  return toolRoutes;
}

function readCategoryRoutes(catalogSource) {
  const categoryRoutes = [];
  const categoriesStart = catalogSource.indexOf("export const categories");
  const toolsStart = catalogSource.indexOf("export const tools");
  const categoriesSource =
    categoriesStart >= 0 && toolsStart > categoriesStart
      ? catalogSource.slice(categoriesStart, toolsStart)
      : catalogSource;
  const categoryPattern = /\{[\s\S]*?id:\s*"([^"]+)"[\s\S]*?\n\s*\}/g;
  let match;

  while ((match = categoryPattern.exec(categoriesSource)) !== null) {
    categoryRoutes.push({ id: match[1] });
  }

  return categoryRoutes;
}

const { defaultLocale, supportedLocales } = await loadTsModule("src/locales/config.ts");
const { homeSeo, legalSeo, toolSeoById } = await loadTsModule("src/locales/seoCopy.ts");
const { toolContentById } = await loadTsModule("src/locales/toolContentCopy.ts");
const { categoryCopy } = await loadTsModule("src/locales/catalogCopy.ts");
const catalogSource = await readFile(path.join(projectRoot, "src/data/catalog.ts"), "utf8");
const categoryRoutes = readCategoryRoutes(catalogSource);
const toolRoutes = readToolRoutes(catalogSource);

const localizedPages = [
  { path: homeSeo.canonicalPath, title: homeSeo.title, description: homeSeo.description },
  ...Object.values(legalSeo).map((page) => ({
    path: page.canonicalPath,
    title: page.title,
    description: page.description
  })),
  ...categoryRoutes.map((category) => {
    const copy = categoryCopy[category.id];

    if (!copy) {
      throw new Error(`Missing category copy for category id "${category.id}".`);
    }

    return {
      path: `/categories/${category.id}`,
      title: {
        es: `Herramientas de ${copy.name.es} | Tools Platforms`,
        en: `${copy.name.en} Tools | Tools Platforms`,
        hi: `${copy.name.hi} \u0909\u092A\u0915\u0930\u0923 | Tools Platforms`
      },
      description: copy.description
    };
  }),
  ...toolRoutes.map((tool) => {
    const seo = toolSeoById[tool.id];

    if (!seo) {
      throw new Error(`Missing SEO copy for tool id "${tool.id}".`);
    }

    return {
      path: `/tools/${tool.slug}`,
      title: seo.title,
      description: seo.description
    };
  })
];

const toolFaqsByPath = Object.fromEntries(
  toolRoutes.map((tool) => [
    `/tools/${tool.slug}`,
    toolContentById[tool.id]?.faqs ?? []
  ])
);

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
  if (locale === defaultLocale) {
    return pathname;
  }

  return pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
}

function getAbsoluteUrl(pathname, locale) {
  return `${siteUrl}${getLocalizedPath(pathname, locale)}`;
}

function renderAlternateLinks(pathname) {
  const alternateLinks = supportedLocales.map(
    (locale) => `<link rel="alternate" hreflang="${escapeHtml(locale)}" href="${escapeHtml(getAbsoluteUrl(pathname, locale))}" />`
  );

  alternateLinks.push(
    `<link rel="alternate" hreflang="x-default" href="${escapeHtml(getAbsoluteUrl(pathname, defaultLocale))}" />`
  );

  return alternateLinks.join("\n    ");
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

  return injectStaticContent(injectStructuredData(setAlternateLinks(html, page.path), page, locale, canonicalUrl), page, locale);
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

function renderStaticContent(page, locale) {
  const faqs = toolFaqsByPath[page.path] ?? [];
  const faqHtml = faqs
    .map(
      (faq) => `
        <section>
          <h2>${escapeHtml(faq.question[locale])}</h2>
          <p>${escapeHtml(faq.answer[locale])}</p>
        </section>`
    )
    .join("");

  return `
      <main>
        <h1>${escapeHtml(page.title[locale])}</h1>
        <p>${escapeHtml(page.description[locale])}</p>${faqHtml}
      </main>
    `;
}

function injectStaticContent(html, page, locale) {
  return html.replace('<div id="root"></div>', `<div id="root">${renderStaticContent(page, locale)}</div>`);
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
  const priority =
    page.path === "/"
      ? "1.0"
      : page.path.startsWith("/tools/")
        ? "0.8"
        : page.path.startsWith("/categories/")
          ? "0.6"
          : "0.3";

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
