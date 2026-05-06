import { getLocalizedText, useLocale, type LocalizedText } from "../i18n";

export type LegalPageType = "privacy" | "terms";

type LegalSection = {
  title: LocalizedText;
  body: LocalizedText[];
};

const updatedAt: LocalizedText = {
  es: "3 de mayo de 2026",
  en: "May 3, 2026"
};

const contactEmail = "contacto@toolsplatforms.com";

const privacySections: LegalSection[] = [
  {
    title: { es: "Información que tratamos", en: "Information we handle" },
    body: [
      {
        es: "Tools Platforms funciona principalmente como un sitio de herramientas de cálculo y conversión. Las herramientas pueden procesar los datos que escribes en formularios, como salarios, fechas, montos, tasas o textos, únicamente para generar el resultado solicitado.",
        en: "Tools Platforms mainly operates as a site of calculators and conversion tools. The tools may process the data you type into forms, such as salaries, dates, amounts, rates, or text, only to generate the requested result."
      },
      {
        es: "No pedimos crear cuenta para usar las herramientas del MVP. Si en el futuro habilitamos formularios de contacto, soporte o suscripción, podremos tratar los datos que nos entregues voluntariamente, como nombre, correo electrónico y contenido del mensaje.",
        en: "We do not require an account to use the MVP tools. If we later enable contact, support, or subscription forms, we may process the data you voluntarily provide, such as your name, email address, and message content."
      }
    ]
  },
  {
    title: { es: "Datos técnicos, cookies y anuncios", en: "Technical data, cookies, and ads" },
    body: [
      {
        es: "Podemos usar cookies, almacenamiento local, registros técnicos, direcciones IP, identificadores del dispositivo, información del navegador, páginas visitadas y eventos de uso para seguridad, medición, analítica, mejora del servicio y monetización.",
        en: "We may use cookies, local storage, technical logs, IP addresses, device identifiers, browser information, visited pages, and usage events for security, measurement, analytics, service improvement, and monetization."
      },
      {
        es: "Cuando integremos Google AdSense u otros productos publicitarios de Google, Google y sus socios podrán usar cookies, identificadores, balizas web u otras tecnologías para mostrar anuncios, medir rendimiento, prevenir fraude y, cuando aplique, personalizar anuncios según sus propias políticas.",
        en: "When we integrate Google AdSense or other Google advertising products, Google and its partners may use cookies, identifiers, web beacons, or similar technologies to show ads, measure performance, prevent fraud, and, when applicable, personalize ads under their own policies."
      }
    ]
  },
  {
    title: { es: "Finalidades", en: "Purposes" },
    body: [
      {
        es: "Usamos la información para operar las herramientas, calcular resultados, mantener seguridad, prevenir abuso, corregir errores, entender qué herramientas son útiles, mejorar la experiencia, responder solicitudes y cumplir obligaciones legales.",
        en: "We use information to run the tools, calculate results, maintain security, prevent abuse, fix errors, understand which tools are useful, improve the experience, respond to requests, and comply with legal obligations."
      },
      {
        es: "También podremos usar datos agregados o estadísticos para decidir qué herramientas construir, sin intentar identificar a una persona específica.",
        en: "We may also use aggregated or statistical data to decide which tools to build, without trying to identify any specific person."
      }
    ]
  },
  {
    title: { es: "Datos sensibles y datos financieros", en: "Sensitive and financial data" },
    body: [
      {
        es: "No solicitamos datos sensibles. Evita escribir información privada que no sea necesaria para usar una herramienta.",
        en: "We do not request sensitive data. Avoid entering private information that is not necessary to use a tool."
      },
      {
        es: "Los valores ingresados en calculadoras financieras o laborales se usan para estimar resultados. No constituyen asesoría financiera, contable, laboral ni legal, y pueden enviarse a nuestro backend para procesar el cálculo.",
        en: "Values entered in financial or labor calculators are used to estimate results. They do not constitute financial, accounting, labor, or legal advice, and they may be sent to our backend to process the calculation."
      }
    ]
  },
  {
    title: { es: "Terceros", en: "Third parties" },
    body: [
      {
        es: "Podemos apoyarnos en proveedores de infraestructura, hosting, analítica, seguridad, correo, APIs y publicidad. Estos terceros pueden tratar datos según sus propias políticas y bajo las finalidades necesarias para prestar sus servicios.",
        en: "We may rely on infrastructure, hosting, analytics, security, email, API, and advertising providers. These third parties may process data under their own policies and for the purposes necessary to provide their services."
      },
      {
        es: "El frontend podrá estar alojado en Vercel y el backend en proveedores como Render u otros equivalentes. También podremos usar Cloudflare para DNS, seguridad, rendimiento y SSL.",
        en: "The frontend may be hosted on Vercel and the backend on providers such as Render or similar services. We may also use Cloudflare for DNS, security, performance, and SSL."
      }
    ]
  },
  {
    title: { es: "Transferencias y conservación", en: "Transfers and retention" },
    body: [
      {
        es: "Al usar servicios en la nube, la información puede ser tratada o almacenada fuera de Colombia. Procuramos usar proveedores reconocidos y medidas razonables de seguridad.",
        en: "By using cloud services, information may be processed or stored outside Colombia. We aim to use recognized providers and reasonable security measures."
      },
      {
        es: "Conservamos datos personales solo por el tiempo necesario para las finalidades descritas, cumplimiento legal, seguridad, solución de disputas o mejora del servicio. Los datos técnicos pueden mantenerse en registros por periodos razonables.",
        en: "We keep personal data only for the time needed for the purposes described, legal compliance, security, dispute resolution, or service improvement. Technical data may remain in logs for reasonable periods."
      }
    ]
  },
  {
    title: { es: "Derechos del titular", en: "Data subject rights" },
    body: [
      {
        es: "De acuerdo con la normativa colombiana de protección de datos personales, puedes solicitar acceso, actualización, corrección, supresión, prueba de autorización cuando aplique, o revocatoria de autorización cuando proceda.",
        en: "Under Colombian personal data regulations, you may request access, updates, corrections, deletion, proof of authorization when applicable, or withdrawal of authorization when appropriate."
      },
      {
        es: `Para ejercer estos derechos, escríbenos a ${contactEmail}. Podemos pedir información mínima para verificar la solicitud y responderla conforme a la ley aplicable.`,
        en: `To exercise these rights, write to us at ${contactEmail}. We may request minimal information to verify the request and respond in accordance with applicable law.`
      }
    ]
  },
  {
    title: { es: "Menores de edad", en: "Minors" },
    body: [
      {
        es: "El sitio no está dirigido específicamente a niñas, niños o adolescentes. Si un menor usa el sitio, debe hacerlo con acompañamiento de su madre, padre, tutor o representante legal.",
        en: "The site is not specifically directed to children or teenagers. If a minor uses the site, they should do so with the support of a parent, guardian, or legal representative."
      },
      {
        es: "No buscamos recolectar deliberadamente información personal de menores.",
        en: "We do not seek to deliberately collect personal information from minors."
      }
    ]
  },
  {
    title: { es: "Cambios", en: "Changes" },
    body: [
      {
        es: "Podemos actualizar esta política cuando cambien las herramientas, proveedores, obligaciones legales o prácticas del sitio. La versión vigente será la publicada en esta página.",
        en: "We may update this policy when tools, providers, legal obligations, or site practices change. The current version will be the one published on this page."
      }
    ]
  }
];

const termsSections: LegalSection[] = [
  {
    title: { es: "Aceptación", en: "Acceptance" },
    body: [
      {
        es: "Al usar Tools Platforms aceptas estos términos. Si no estás de acuerdo, no uses el sitio ni sus herramientas.",
        en: "By using Tools Platforms, you accept these terms. If you do not agree, do not use the site or its tools."
      },
      {
        es: "Podemos modificar estos términos cuando cambie el servicio, la ley aplicable o nuestras operaciones. La versión vigente será la publicada en esta página.",
        en: "We may modify these terms when the service, applicable law, or our operations change. The current version will be the one published on this page."
      }
    ]
  },
  {
    title: { es: "Naturaleza del servicio", en: "Nature of the service" },
    body: [
      {
        es: "Tools Platforms ofrece herramientas online para cálculos, conversiones y tareas prácticas. Los resultados son estimaciones automáticas generadas con los datos que ingresas y las reglas implementadas en cada herramienta.",
        en: "Tools Platforms offers online tools for calculations, conversions, and practical tasks. The results are automatic estimates generated from the data you enter and the rules implemented in each tool."
      },
      {
        es: "Aunque buscamos precisión, los resultados pueden contener errores, quedar desactualizados o no reflejar condiciones particulares de tu caso.",
        en: "Although we aim for accuracy, results may contain errors, become outdated, or fail to reflect the specific conditions of your case."
      }
    ]
  },
  {
    title: { es: "No asesoría profesional", en: "No professional advice" },
    body: [
      {
        es: "El sitio no presta asesoría legal, laboral, financiera, contable, tributaria, médica ni profesional. Las calculadoras laborales y financieras son orientativas.",
        en: "The site does not provide legal, labor, financial, accounting, tax, medical, or professional advice. Labor and financial calculators are for guidance only."
      },
      {
        es: "Antes de tomar decisiones importantes, endeudarte, terminar una relación laboral, reclamar pagos o presentar documentos oficiales, consulta con un profesional o entidad competente.",
        en: "Before making important decisions, taking on debt, ending an employment relationship, claiming payments, or filing official documents, consult a qualified professional or competent authority."
      }
    ]
  },
  {
    title: { es: "Uso permitido", en: "Permitted use" },
    body: [
      {
        es: "Puedes usar el sitio para fines personales, educativos o laborales lícitos. No puedes intentar afectar la disponibilidad del servicio, extraer datos de forma abusiva, alterar resultados, vulnerar seguridad o usar las herramientas para actividades ilegales.",
        en: "You may use the site for lawful personal, educational, or work purposes. You may not try to affect service availability, extract data abusively, alter results, breach security, or use the tools for illegal activities."
      },
      {
        es: "Tampoco puedes copiar masivamente el sitio, su diseño, textos o estructura para crear un servicio competidor sin autorización.",
        en: "You may not massively copy the site, its design, text, or structure to create a competing service without authorization."
      }
    ]
  },
  {
    title: { es: "Responsabilidad del usuario", en: "User responsibility" },
    body: [
      {
        es: "Eres responsable de la exactitud de los datos que ingresas y de interpretar correctamente los resultados.",
        en: "You are responsible for the accuracy of the data you enter and for interpreting the results correctly."
      },
      {
        es: "También eres responsable de validar si una herramienta aplica a tu país, ciudad, contrato, entidad, fecha, régimen o situación específica.",
        en: "You are also responsible for verifying whether a tool applies to your country, city, contract, entity, date, legal regime, or specific situation."
      }
    ]
  },
  {
    title: { es: "Disponibilidad y cambios", en: "Availability and changes" },
    body: [
      {
        es: "Podemos agregar, modificar, pausar o retirar herramientas, endpoints, diseños, proveedores o funcionalidades sin previo aviso.",
        en: "We may add, modify, pause, or remove tools, endpoints, designs, providers, or features without prior notice."
      },
      {
        es: "No garantizamos disponibilidad continua, ausencia de errores, compatibilidad permanente ni que los resultados sean suficientes para una finalidad específica.",
        en: "We do not guarantee continuous availability, absence of errors, permanent compatibility, or that results will be sufficient for a specific purpose."
      }
    ]
  },
  {
    title: { es: "Propiedad intelectual", en: "Intellectual property" },
    body: [
      {
        es: "El contenido, diseño, código, marca, estructura y experiencia del sitio pertenecen a Tools Platforms o a sus respectivos titulares, salvo librerías, íconos, dependencias o recursos de terceros usados conforme a sus licencias.",
        en: "The content, design, code, brand, structure, and experience of the site belong to Tools Platforms or their respective owners, except for third-party libraries, icons, dependencies, or resources used under their licenses."
      },
      {
        es: "Puedes enlazar nuestras páginas, pero no presentar el sitio como propio ni retirar avisos de autoría o marca.",
        en: "You may link to our pages, but you may not present the site as your own or remove authorship or trademark notices."
      }
    ]
  },
  {
    title: { es: "Anuncios y terceros", en: "Ads and third parties" },
    body: [
      {
        es: "El sitio puede mostrar anuncios, enlaces o servicios de terceros. No somos responsables por sitios externos, productos, ofertas, decisiones de anunciantes ni políticas de terceros.",
        en: "The site may display ads, links, or third-party services. We are not responsible for external sites, products, offers, advertiser decisions, or third-party policies."
      },
      {
        es: "La presencia de un anuncio no significa recomendación, garantía ni aprobación por parte de Tools Platforms.",
        en: "The presence of an ad does not mean endorsement, guarantee, or approval by Tools Platforms."
      }
    ]
  },
  {
    title: { es: "Limitación de responsabilidad", en: "Limitation of liability" },
    body: [
      {
        es: "En la máxima medida permitida por la ley, Tools Platforms no será responsable por pérdidas, daños, decisiones, sanciones, reclamaciones o consecuencias derivadas del uso o imposibilidad de uso del sitio, o de la confianza depositada en resultados estimados.",
        en: "To the fullest extent permitted by law, Tools Platforms will not be liable for losses, damages, decisions, sanctions, claims, or consequences arising from the use or inability to use the site, or from reliance on estimated results."
      },
      {
        es: "Nada en estos términos limita derechos irrenunciables reconocidos por la ley aplicable.",
        en: "Nothing in these terms limits non-waivable rights recognized by applicable law."
      }
    ]
  },
  {
    title: { es: "Contacto", en: "Contact" },
    body: [
      {
        es: `Para preguntas sobre estos términos, escríbenos a ${contactEmail}.`,
        en: `For questions about these terms, write to us at ${contactEmail}.`
      }
    ]
  }
];

const pageContent = {
  privacy: {
    eyebrow: { es: "Privacidad", en: "Privacy" },
    title: { es: "Política de privacidad", en: "Privacy Policy" },
    intro: {
      es: "Esta política explica cómo Tools Platforms trata información al operar herramientas online, medir uso, mantener seguridad y monetizar el sitio con anuncios.",
      en: "This policy explains how Tools Platforms handles information while running online tools, measuring usage, maintaining security, and monetizing the site through advertising."
    },
    sections: privacySections
  },
  terms: {
    eyebrow: { es: "Términos", en: "Terms" },
    title: { es: "Términos y condiciones", en: "Terms and Conditions" },
    intro: {
      es: "Estos términos regulan el uso de Tools Platforms y sus herramientas. Léelos antes de usar los cálculos como apoyo para decisiones personales o laborales.",
      en: "These terms govern the use of Tools Platforms and its tools. Read them before relying on calculations for personal or work decisions."
    },
    sections: termsSections
  }
};

export function LegalPage({ page }: { page: LegalPageType }) {
  const { locale } = useLocale();
  const content = pageContent[page];
  const lastUpdatedLabel = locale === "en" ? "Last updated" : "Última actualización";

  return (
    <article className="legal-page">
      <header className="legal-hero">
        <p className="section__kicker">{getLocalizedText(content.eyebrow, locale)}</p>
        <h1>{getLocalizedText(content.title, locale)}</h1>
        <p>{getLocalizedText(content.intro, locale)}</p>
        <span>
          {lastUpdatedLabel}: {getLocalizedText(updatedAt, locale)}
        </span>
      </header>

      <div className="legal-content">
        {content.sections.map((section) => (
          <section className="legal-section" key={getLocalizedText(section.title, locale)}>
            <h2>{getLocalizedText(section.title, locale)}</h2>
            {section.body.map((paragraph) => (
              <p key={getLocalizedText(paragraph, locale)}>{getLocalizedText(paragraph, locale)}</p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
