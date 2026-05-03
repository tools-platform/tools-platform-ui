export type LegalPageType = "privacy" | "terms";

const updatedAt = "3 de mayo de 2026";
const contactEmail = "contacto@toolsplatforms.com";

const privacySections = [
  {
    title: "Información que tratamos",
    body: [
      "Tools Platforms funciona principalmente como un sitio de herramientas de cálculo y conversión. Las herramientas pueden procesar los datos que escribes en formularios, como salarios, fechas, montos, tasas o textos, únicamente para generar el resultado solicitado.",
      "No pedimos crear cuenta para usar las herramientas del MVP. Si en el futuro habilitamos formularios de contacto, soporte o suscripción, podremos tratar los datos que nos entregues voluntariamente, como nombre, correo electrónico y contenido del mensaje."
    ]
  },
  {
    title: "Datos técnicos, cookies y anuncios",
    body: [
      "Podemos usar cookies, almacenamiento local, registros técnicos, direcciones IP, identificadores del dispositivo, información del navegador, páginas visitadas y eventos de uso para seguridad, medición, analítica, mejora del servicio y monetización.",
      "Cuando integremos Google AdSense u otros productos publicitarios de Google, Google y sus socios podrán usar cookies, identificadores, balizas web u otras tecnologías para mostrar anuncios, medir rendimiento, prevenir fraude y, cuando aplique, personalizar anuncios según sus propias políticas."
    ]
  },
  {
    title: "Finalidades",
    body: [
      "Usamos la información para operar las herramientas, calcular resultados, mantener seguridad, prevenir abuso, corregir errores, entender qué herramientas son útiles, mejorar la experiencia, responder solicitudes y cumplir obligaciones legales.",
      "También podremos usar datos agregados o estadísticos para decidir qué herramientas construir, sin intentar identificar a una persona específica."
    ]
  },
  {
    title: "Datos sensibles y datos financieros",
    body: [
      "No solicitamos datos sensibles. Evita escribir información privada que no sea necesaria para usar una herramienta.",
      "Los valores ingresados en calculadoras financieras o laborales se usan para estimar resultados. No constituyen asesoría financiera, contable, laboral ni legal, y pueden enviarse a nuestro backend para procesar el cálculo."
    ]
  },
  {
    title: "Terceros",
    body: [
      "Podemos apoyarnos en proveedores de infraestructura, hosting, analítica, seguridad, correo, APIs y publicidad. Estos terceros pueden tratar datos según sus propias políticas y bajo las finalidades necesarias para prestar sus servicios.",
      "El frontend podrá estar alojado en Vercel y el backend en proveedores como Render u otros equivalentes. También podremos usar Cloudflare para DNS, seguridad, rendimiento y SSL."
    ]
  },
  {
    title: "Transferencias y conservación",
    body: [
      "Al usar servicios en la nube, la información puede ser tratada o almacenada fuera de Colombia. Procuramos usar proveedores reconocidos y medidas razonables de seguridad.",
      "Conservamos datos personales solo por el tiempo necesario para las finalidades descritas, cumplimiento legal, seguridad, solución de disputas o mejora del servicio. Los datos técnicos pueden mantenerse en registros por periodos razonables."
    ]
  },
  {
    title: "Derechos del titular",
    body: [
      "De acuerdo con la normativa colombiana de protección de datos personales, puedes solicitar acceso, actualización, corrección, supresión, prueba de autorización cuando aplique, o revocatoria de autorización cuando proceda.",
      `Para ejercer estos derechos, escríbenos a ${contactEmail}. Podemos pedir información mínima para verificar la solicitud y responderla conforme a la ley aplicable.`
    ]
  },
  {
    title: "Menores de edad",
    body: [
      "El sitio no está dirigido específicamente a niñas, niños o adolescentes. Si un menor usa el sitio, debe hacerlo con acompañamiento de su madre, padre, tutor o representante legal.",
      "No buscamos recolectar deliberadamente información personal de menores."
    ]
  },
  {
    title: "Cambios",
    body: [
      "Podemos actualizar esta política cuando cambien las herramientas, proveedores, obligaciones legales o prácticas del sitio. La versión vigente será la publicada en esta página."
    ]
  }
];

const termsSections = [
  {
    title: "Aceptación",
    body: [
      "Al usar Tools Platforms aceptas estos términos. Si no estás de acuerdo, no uses el sitio ni sus herramientas.",
      "Podemos modificar estos términos cuando cambie el servicio, la ley aplicable o nuestras operaciones. La versión vigente será la publicada en esta página."
    ]
  },
  {
    title: "Naturaleza del servicio",
    body: [
      "Tools Platforms ofrece herramientas online para cálculos, conversiones y tareas prácticas. Los resultados son estimaciones automáticas generadas con los datos que ingresas y las reglas implementadas en cada herramienta.",
      "Aunque buscamos precisión, los resultados pueden contener errores, quedar desactualizados o no reflejar condiciones particulares de tu caso."
    ]
  },
  {
    title: "No asesoría profesional",
    body: [
      "El sitio no presta asesoría legal, laboral, financiera, contable, tributaria, médica ni profesional. Las calculadoras laborales y financieras son orientativas.",
      "Antes de tomar decisiones importantes, endeudarte, terminar una relación laboral, reclamar pagos o presentar documentos oficiales, consulta con un profesional o entidad competente."
    ]
  },
  {
    title: "Uso permitido",
    body: [
      "Puedes usar el sitio para fines personales, educativos o laborales lícitos. No puedes intentar afectar la disponibilidad del servicio, extraer datos de forma abusiva, alterar resultados, vulnerar seguridad o usar las herramientas para actividades ilegales.",
      "Tampoco puedes copiar masivamente el sitio, su diseño, textos o estructura para crear un servicio competidor sin autorización."
    ]
  },
  {
    title: "Responsabilidad del usuario",
    body: [
      "Eres responsable de la exactitud de los datos que ingresas y de interpretar correctamente los resultados.",
      "También eres responsable de validar si una herramienta aplica a tu país, ciudad, contrato, entidad, fecha, régimen o situación específica."
    ]
  },
  {
    title: "Disponibilidad y cambios",
    body: [
      "Podemos agregar, modificar, pausar o retirar herramientas, endpoints, diseños, proveedores o funcionalidades sin previo aviso.",
      "No garantizamos disponibilidad continua, ausencia de errores, compatibilidad permanente ni que los resultados sean suficientes para una finalidad específica."
    ]
  },
  {
    title: "Propiedad intelectual",
    body: [
      "El contenido, diseño, código, marca, estructura y experiencia del sitio pertenecen a Tools Platforms o a sus respectivos titulares, salvo librerías, íconos, dependencias o recursos de terceros usados conforme a sus licencias.",
      "Puedes enlazar nuestras páginas, pero no presentar el sitio como propio ni retirar avisos de autoría o marca."
    ]
  },
  {
    title: "Anuncios y terceros",
    body: [
      "El sitio puede mostrar anuncios, enlaces o servicios de terceros. No somos responsables por sitios externos, productos, ofertas, decisiones de anunciantes ni políticas de terceros.",
      "La presencia de un anuncio no significa recomendación, garantía ni aprobación por parte de Tools Platforms."
    ]
  },
  {
    title: "Limitación de responsabilidad",
    body: [
      "En la máxima medida permitida por la ley, Tools Platforms no será responsable por pérdidas, daños, decisiones, sanciones, reclamaciones o consecuencias derivadas del uso o imposibilidad de uso del sitio, o de la confianza depositada en resultados estimados.",
      "Nada en estos términos limita derechos irrenunciables reconocidos por la ley aplicable."
    ]
  },
  {
    title: "Contacto",
    body: [`Para preguntas sobre estos términos, escríbenos a ${contactEmail}.`]
  }
];

const pageContent = {
  privacy: {
    eyebrow: "Privacidad",
    title: "Política de privacidad",
    intro:
      "Esta política explica cómo Tools Platforms trata información al operar herramientas online, medir uso, mantener seguridad y monetizar el sitio con anuncios.",
    sections: privacySections
  },
  terms: {
    eyebrow: "Términos",
    title: "Términos y condiciones",
    intro:
      "Estos términos regulan el uso de Tools Platforms y sus herramientas. Léelos antes de usar los cálculos como apoyo para decisiones personales o laborales.",
    sections: termsSections
  }
};

export function LegalPage({ page }: { page: LegalPageType }) {
  const content = pageContent[page];

  return (
    <article className="legal-page">
      <header className="legal-hero">
        <p className="section__kicker">{content.eyebrow}</p>
        <h1>{content.title}</h1>
        <p>{content.intro}</p>
        <span>Última actualización: {updatedAt}</span>
      </header>

      <div className="legal-content">
        {content.sections.map((section) => (
          <section className="legal-section" key={section.title}>
            <h2>{section.title}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
