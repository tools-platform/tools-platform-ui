import { CheckCircle2, ChevronDown, Clipboard, Dice5, Info, RotateCcw } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";

type TextSource = "natural" | "lorem";
type TextMode = "words" | "sentences" | "paragraphs" | "list";

type GeneratedTextResult = {
  output: string;
  source: TextSource;
  mode: TextMode;
};

const loremWords = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor",
  "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis",
  "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat", "duis",
  "aute", "irure", "reprehenderit", "voluptate", "velit", "esse", "cillum", "fugiat", "nulla", "pariatur",
  "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "phasellus", "integer", "facilisis", "mauris",
  "viverra", "tincidunt", "pellentesque", "habitant", "morbi", "tristique", "senectus", "netus", "malesuada"
];

const naturalBank = {
  es: {
    subjects: [
      "el proyecto", "la plataforma", "el equipo", "la herramienta", "el reporte", "la interfaz", "el usuario", "el proceso",
      "la seccion", "el contenido", "la pagina", "el formulario", "la lista", "el resultado", "la estrategia", "el sistema",
      "la revision", "el archivo", "la busqueda", "el panel", "la experiencia", "el flujo", "la tarea", "el tablero",
      "la validacion", "el documento", "la prueba", "el modulo", "la vista", "el dato", "la columna", "el registro",
      "la muestra", "el analisis", "la respuesta", "el bloque", "la plantilla", "el cliente", "la propuesta", "el resumen"
    ],
    verbs: [
      "organiza", "mejora", "valida", "resume", "prepara", "compara", "limpia", "agrupa", "muestra", "calcula",
      "convierte", "ordena", "revisa", "filtra", "genera", "presenta", "simplifica", "ajusta", "conserva", "detecta",
      "actualiza", "separa", "describe", "estructura", "destaca", "interpreta", "acompaña", "resuelve", "optimiza", "documenta",
      "clasifica", "sincroniza", "transforma", "protege", "explica", "prioriza", "reduce", "amplia", "coordina", "confirma"
    ],
    objects: [
      "los datos principales", "el contenido pendiente", "la informacion visible", "los valores repetidos", "las lineas del texto",
      "los cambios recientes", "las opciones disponibles", "la salida final", "el contexto del usuario", "las tareas del dia",
      "la estructura del documento", "los campos del formulario", "el orden de la lista", "las reglas de negocio", "la lectura del resultado",
      "los detalles importantes", "la version limpia", "el texto de prueba", "los elementos activos", "la informacion de soporte",
      "los mensajes del sistema", "las columnas copiadas", "la tabla de resultados", "el contenido temporal", "las notas del equipo",
      "la descripcion corta", "los bloques repetidos", "el ejemplo generado", "las rutas del sitio", "la vista de trabajo"
    ],
    endings: [
      "para avanzar con claridad", "sin pasos innecesarios", "de forma rapida", "con una salida facil de copiar",
      "antes de continuar", "en pocos segundos", "con una estructura limpia", "para reducir errores", "durante la revision",
      "cuando el contenido cambia", "con un formato mas ordenado", "sin depender de procesos externos", "para probar un escenario",
      "mientras se prepara la entrega", "con informacion suficiente", "para completar la tarea", "en el mismo navegador",
      "con un resultado practico", "sin perder el contexto", "para dejar una referencia clara"
    ],
    listItems: [
      "reporte mensual", "cliente activo", "validacion pendiente", "archivo temporal", "texto de prueba", "lista limpia",
      "dato principal", "resultado generado", "revision rapida", "campo obligatorio", "contenido visible", "nota interna",
      "tarea completada", "proceso simple", "bloque editable", "valor de ejemplo", "columna copiada", "formulario corto",
      "plantilla base", "mensaje claro", "prueba local", "salida final", "elemento seleccionado", "opcion marcada",
      "resumen ejecutivo", "registro duplicado", "linea revisada", "codigo temporal", "ruta publicada", "consulta frecuente"
    ]
  },
  en: {
    subjects: [
      "the project", "the platform", "the team", "the tool", "the report", "the interface", "the user", "the workflow",
      "the section", "the content", "the page", "the form", "the list", "the result", "the strategy", "the system",
      "the review", "the file", "the search", "the panel", "the experience", "the flow", "the task", "the dashboard",
      "the validation", "the document", "the test", "the module", "the view", "the data point", "the column", "the record",
      "the sample", "the analysis", "the response", "the block", "the template", "the customer", "the proposal", "the summary"
    ],
    verbs: [
      "organizes", "improves", "validates", "summarizes", "prepares", "compares", "cleans", "groups", "shows", "calculates",
      "converts", "sorts", "reviews", "filters", "generates", "presents", "simplifies", "adjusts", "keeps", "detects",
      "updates", "separates", "describes", "structures", "highlights", "interprets", "supports", "solves", "optimizes", "documents",
      "classifies", "syncs", "transforms", "protects", "explains", "prioritizes", "reduces", "expands", "coordinates", "confirms"
    ],
    objects: [
      "the main data", "the pending content", "the visible information", "the repeated values", "the text lines",
      "the recent changes", "the available options", "the final output", "the user context", "the daily tasks",
      "the document structure", "the form fields", "the list order", "the business rules", "the result reading",
      "the important details", "the clean version", "the sample text", "the active elements", "the support information",
      "the system messages", "the copied columns", "the results table", "the temporary content", "the team notes",
      "the short description", "the repeated blocks", "the generated example", "the site routes", "the work view"
    ],
    endings: [
      "with clear direction", "without unnecessary steps", "quickly", "with output that is easy to copy",
      "before moving forward", "in a few seconds", "with a clean structure", "to reduce mistakes", "during review",
      "when the content changes", "with a more organized format", "without relying on external processes", "to test a scenario",
      "while preparing the delivery", "with enough information", "to complete the task", "inside the same browser",
      "with a practical result", "without losing context", "to leave a clear reference"
    ],
    listItems: [
      "monthly report", "active customer", "pending validation", "temporary file", "sample text", "clean list",
      "main data point", "generated result", "quick review", "required field", "visible content", "internal note",
      "completed task", "simple process", "editable block", "example value", "copied column", "short form",
      "base template", "clear message", "local test", "final output", "selected item", "checked option",
      "executive summary", "duplicate record", "reviewed line", "temporary code", "published route", "frequent query"
    ]
  }
} as const;

const copy = {
  es: {
    kicker: "Utilidad",
    title: "Generar texto",
    source: "Fuente del texto",
    natural: "Texto natural",
    lorem: "Lorem ipsum",
    mode: "Tipo de salida",
    modes: {
      words: "Palabras",
      sentences: "Frases",
      paragraphs: "Párrafos",
      list: "Lista"
    },
    quantity: "Cantidad",
    punctuation: "Incluir puntuación",
    punctuationHelp: "Agrega puntos y comas cuando aplica.",
    capitalization: "Capitalizar frases",
    capitalizationHelp: "Inicia cada frase con mayúscula.",
    onePerLine: "Una línea por resultado",
    onePerLineHelp: "Útil para pegar en hojas de cálculo o listas.",
    hint: "El texto se genera en tu navegador desde bancos locales de palabras. No usa IA ni envía datos.",
    submit: "Generar texto",
    reset: "Restablecer",
    resultTitle: "Texto generado",
    result: "Resultado",
    copy: "Copiar",
    copied: "Texto copiado.",
    copyFailed: "No se pudo copiar automáticamente.",
    words: "Palabras",
    characters: "Caracteres",
    emptyTitle: "Texto aleatorio",
    emptyDescription: "Elige la fuente, el tipo de salida y genera texto de prueba en segundos.",
    rulesNote: "El resultado queda fijo hasta que vuelves a generar texto, así puedes cambiar opciones sin alterar la salida actual.",
    disclaimer: "Texto automático para pruebas, diseño, formularios o contenido temporal. Revísalo si lo usarás de forma pública."
  },
  en: {
    kicker: "Utility",
    title: "Generate text",
    source: "Text source",
    natural: "Natural text",
    lorem: "Lorem ipsum",
    mode: "Output type",
    modes: {
      words: "Words",
      sentences: "Sentences",
      paragraphs: "Paragraphs",
      list: "List"
    },
    quantity: "Quantity",
    punctuation: "Include punctuation",
    punctuationHelp: "Adds periods and commas when useful.",
    capitalization: "Capitalize sentences",
    capitalizationHelp: "Starts each sentence with uppercase.",
    onePerLine: "One result per line",
    onePerLineHelp: "Useful for spreadsheets or lists.",
    hint: "Text is generated in your browser from local word banks. It does not use AI or send data.",
    submit: "Generate text",
    reset: "Reset",
    resultTitle: "Generated text",
    result: "Result",
    copy: "Copy",
    copied: "Text copied.",
    copyFailed: "We couldn't copy it automatically.",
    words: "Words",
    characters: "Characters",
    emptyTitle: "Random text",
    emptyDescription: "Choose the source, output type, and generate sample text in seconds.",
    rulesNote: "The result stays fixed until you generate again, so changing options does not alter the current output.",
    disclaimer: "Automatic text for tests, design, forms, or temporary content. Review it before using it publicly."
  }
} as const;

function randomItem<T>(items: readonly T[]) {
  const values = new Uint32Array(1);
  crypto.getRandomValues(values);
  return items[values[0] % items.length];
}

function countWords(value: string) {
  return value.trim().match(/\S+/g)?.length ?? 0;
}

function capitalize(value: string, localeCode: string) {
  return value.charAt(0).toLocaleUpperCase(localeCode) + value.slice(1);
}

function buildNaturalSentence(locale: "es" | "en", includePunctuation: boolean, capitalizeSentence: boolean, localeCode: string) {
  const bank = naturalBank[locale];
  const sentence = `${randomItem(bank.subjects)} ${randomItem(bank.verbs)} ${randomItem(bank.objects)} ${randomItem(bank.endings)}`;
  const withCapital = capitalizeSentence ? capitalize(sentence, localeCode) : sentence;
  return includePunctuation ? `${withCapital}.` : withCapital;
}

function buildLoremWords(count: number) {
  return Array.from({ length: count }, () => randomItem(loremWords));
}

function buildNaturalWords(locale: "es" | "en", count: number) {
  const bank = naturalBank[locale];
  const pool = [...bank.subjects, ...bank.verbs, ...bank.objects, ...bank.endings, ...bank.listItems].flatMap((item) =>
    item.split(/\s+/).map((word) => word.replace(/[^\p{L}\p{N}-]/gu, "").toLocaleLowerCase(locale === "es" ? "es-CO" : "en-US"))
  );

  return Array.from({ length: count }, () => randomItem(pool.filter(Boolean)));
}

function buildText({
  locale,
  localeCode,
  source,
  mode,
  quantity,
  includePunctuation,
  capitalizeSentences,
  onePerLine
}: {
  locale: "es" | "en";
  localeCode: string;
  source: TextSource;
  mode: TextMode;
  quantity: number;
  includePunctuation: boolean;
  capitalizeSentences: boolean;
  onePerLine: boolean;
}) {
  if (mode === "words") {
    const words = source === "lorem" ? buildLoremWords(quantity) : buildNaturalWords(locale, quantity);
    const text = words.join(" ");
    return capitalizeSentences ? capitalize(text, localeCode) : text;
  }

  if (mode === "list") {
    const bank = naturalBank[locale];
    const lines = source === "lorem"
      ? Array.from({ length: quantity }, () => buildLoremWords(3 + Math.floor(Math.random() * 3)).join(" "))
      : Array.from({ length: quantity }, () => randomItem(bank.listItems));

    return lines.map((line) => (capitalizeSentences ? capitalize(line, localeCode) : line)).join("\n");
  }

  if (mode === "paragraphs") {
    return Array.from({ length: quantity }, () => {
      const sentenceCount = 3 + Math.floor(Math.random() * 3);
      const sentences = Array.from({ length: sentenceCount }, () =>
        source === "lorem"
          ? `${capitalize(buildLoremWords(10 + Math.floor(Math.random() * 8)).join(" "), localeCode)}.`
          : buildNaturalSentence(locale, includePunctuation, capitalizeSentences, localeCode)
      );
      return sentences.join(" ");
    }).join("\n\n");
  }

  const sentences = Array.from({ length: quantity }, () =>
    source === "lorem"
      ? `${capitalize(buildLoremWords(9 + Math.floor(Math.random() * 8)).join(" "), localeCode)}.`
      : buildNaturalSentence(locale, includePunctuation, capitalizeSentences, localeCode)
  );

  return sentences.join(onePerLine ? "\n" : " ");
}

export function RandomTextGenerator() {
  const { locale } = useLocale();
  const text = copy[locale];
  const localeCode = locale === "es" ? "es-CO" : "en-US";
  const numberFormatter = useMemo(() => new Intl.NumberFormat(localeCode), [localeCode]);
  const [source, setSource] = useState<TextSource>("natural");
  const [mode, setMode] = useState<TextMode>("sentences");
  const [quantity, setQuantity] = useState(5);
  const [includePunctuation, setIncludePunctuation] = useState(true);
  const [capitalizeSentences, setCapitalizeSentences] = useState(true);
  const [onePerLine, setOnePerLine] = useState(false);
  const [result, setResult] = useState<GeneratedTextResult | null>(null);
  const [copyStatus, setCopyStatus] = useState("");
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  const characterCount = result?.output.length ?? 0;
  const sourceLabel = result?.source === "lorem" ? text.lorem : text.natural;
  const modeLabel = result ? text.modes[result.mode] : text.modes[mode];

  useEffect(() => {
    if (!copyStatus) return;
    const timer = window.setTimeout(() => setCopyStatus(""), 2400);
    return () => window.clearTimeout(timer);
  }, [copyStatus]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCopyStatus("");

    const normalizedQuantity = Math.min(Math.max(quantity || 1, 1), mode === "paragraphs" ? 12 : 200);
    const output = buildText({
      locale,
      localeCode,
      source,
      mode,
      quantity: normalizedQuantity,
      includePunctuation,
      capitalizeSentences,
      onePerLine
    });

    setQuantity(normalizedQuantity);
    setResult({ output, source, mode });
    scrollToResultOnMobile();
  }

  function handleReset() {
    setSource("natural");
    setMode("sentences");
    setQuantity(5);
    setIncludePunctuation(true);
    setCapitalizeSentences(true);
    setOnePerLine(false);
    setResult(null);
    setCopyStatus("");
  }

  async function handleCopy() {
    if (!result?.output) return;

    try {
      await navigator.clipboard.writeText(result.output);
      setCopyStatus(text.copied);
    } catch {
      setCopyStatus(text.copyFailed);
    }
  }

  return (
    <div className="calculator-layout">
      <form className="calculator-card" onSubmit={handleSubmit}>
        <div className="calculator-card__header">
          <div>
            <p className="section__kicker">{text.kicker}</p>
            <h2>{text.title}</h2>
          </div>
          <span>
            <Dice5 size={20} strokeWidth={2.1} />
          </span>
        </div>

        <fieldset className="segmented-field">
          <legend>{text.source}</legend>
          <div className="segmented-control">
            <button className={source === "natural" ? "is-active" : ""} onClick={() => setSource("natural")} type="button">
              {text.natural}
            </button>
            <button className={source === "lorem" ? "is-active" : ""} onClick={() => setSource("lorem")} type="button">
              {text.lorem}
            </button>
          </div>
        </fieldset>

        <label className="field field--spaced">
          <span>{text.mode}</span>
          <span className="select-control">
            <select className="plain-select" onChange={(event) => setMode(event.target.value as TextMode)} value={mode}>
              {(Object.keys(text.modes) as TextMode[]).map((modeOption) => (
                <option key={modeOption} value={modeOption}>
                  {text.modes[modeOption]}
                </option>
              ))}
            </select>
            <ChevronDown size={18} strokeWidth={2.1} />
          </span>
        </label>

        <label className="field field--spaced">
          <span>{text.quantity}</span>
          <input
            max={mode === "paragraphs" ? 12 : 200}
            min={1}
            onChange={(event) => setQuantity(Number(event.target.value))}
            type="number"
            value={quantity}
          />
        </label>

        <div className="duplicate-options">
          <label className="toggle-field toggle-field--compact">
            <input checked={includePunctuation} onChange={(event) => setIncludePunctuation(event.target.checked)} type="checkbox" />
            <span>
              <strong>{text.punctuation}</strong>
              <small>{text.punctuationHelp}</small>
            </span>
          </label>

          <label className="toggle-field toggle-field--compact">
            <input checked={capitalizeSentences} onChange={(event) => setCapitalizeSentences(event.target.checked)} type="checkbox" />
            <span>
              <strong>{text.capitalization}</strong>
              <small>{text.capitalizationHelp}</small>
            </span>
          </label>

          <label className="toggle-field toggle-field--compact">
            <input checked={onePerLine} onChange={(event) => setOnePerLine(event.target.checked)} type="checkbox" />
            <span>
              <strong>{text.onePerLine}</strong>
              <small>{text.onePerLineHelp}</small>
            </span>
          </label>
        </div>

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>{text.hint}</span>
        </div>

        <button className="primary-action" type="submit">
          <Dice5 size={18} />
          {text.submit}
        </button>

        <button className="secondary-action" onClick={handleReset} type="button">
          <RotateCcw size={18} />
          {text.reset}
        </button>
      </form>

      {result ? (
        <aside className="result-panel" ref={resultRef}>
          {copyStatus ? (
            <div className={`duplicate-copy-toast${copyStatus === text.copyFailed ? " duplicate-copy-toast--error" : ""}`} role="status">
              <CheckCircle2 size={16} strokeWidth={2.1} />
              <span>{copyStatus}</span>
            </div>
          ) : null}

          <div className="result-panel__hero result-panel__hero--compact">
            <p>{text.resultTitle}</p>
            <strong>{modeLabel}</strong>
            <span>{sourceLabel}</span>
          </div>

          <div className="text-result">
            <div className="text-result__header">
              <span>{text.result}</span>
              <div className="text-result__actions">
                <button onClick={handleCopy} type="button">
                  <Clipboard size={16} strokeWidth={2.1} />
                  {text.copy}
                </button>
              </div>
            </div>
            <textarea readOnly rows={12} value={result.output} />
          </div>

          <div className="result-breakdown">
            <div className="result-item result-item--strong">
              <span>{text.mode}</span>
              <strong>{modeLabel}</strong>
            </div>
            <ResultStat formatter={numberFormatter} label={text.characters} value={characterCount} />
          </div>

          <div className="rules-note">
            <CheckCircle2 size={18} strokeWidth={2.1} />
            <p>{text.rulesNote}</p>
          </div>

          <p className="disclaimer">{text.disclaimer}</p>
        </aside>
      ) : (
        <aside className="result-panel result-panel--empty" ref={resultRef}>
          <div className="result-empty">
            <Dice5 size={34} strokeWidth={2.1} />
            <h2>{text.emptyTitle}</h2>
            <p>{text.emptyDescription}</p>
          </div>
        </aside>
      )}
    </div>
  );
}

function ResultStat({ label, value, formatter }: { label: string; value: number; formatter: Intl.NumberFormat }) {
  return (
    <div className="result-item">
      <span>{label}</span>
      <strong>{formatter.format(value)}</strong>
    </div>
  );
}
