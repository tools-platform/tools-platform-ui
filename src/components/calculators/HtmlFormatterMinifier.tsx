import { CheckCircle2, Clipboard, Code2, FileCode2, Info, RotateCcw } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";

type HtmlMode = "format" | "minify";

type HtmlTransformResult = {
  input: string;
  output: string;
  mode: HtmlMode;
  removeComments: boolean;
  removedComments: number;
};

const copy = {
  es: {
    kicker: "Desarrollo",
    title: "HTML para transformar",
    inputLabel: "Código HTML",
    placeholder: "<section>\n  <h1>Hola mundo</h1>\n  <p>Texto para revisar.</p>\n</section>",
    operation: "Operación",
    format: "Formatear",
    minify: "Minificar",
    removeComments: "Eliminar comentarios HTML",
    removeCommentsHelp: "Quita bloques <!-- comentario --> antes de generar el resultado.",
    hint: "Transforma HTML como texto en tu navegador. No ejecuta ni renderiza el contenido.",
    emptyError: "Pega código HTML para formatear o minificar.",
    submitFormat: "Formatear HTML",
    submitMinify: "Minificar HTML",
    reset: "Restablecer",
    result: "Resultado",
    resultTitleFormat: "HTML formateado",
    resultTitleMinify: "HTML minificado",
    copy: "Copiar",
    copied: "HTML copiado.",
    copyFailed: "No se pudo copiar automáticamente.",
    totalChars: "Total de caracteres",
    mode: "Modo",
    rulesNoteFormat: "Organizamos etiquetas en líneas e indentación para facilitar la lectura.",
    rulesNoteMinify: "Reducimos espacios entre etiquetas para obtener una versión más compacta.",
    disclaimer:
      "Resultado automático para limpieza de HTML. Revisa plantillas complejas antes de usarlo en producción.",
    emptyTitle: "El HTML transformado aparecerá aquí",
    emptyDescription: "Pega código HTML, elige formatear o minificar y genera el resultado."
  },
  en: {
    kicker: "Development",
    title: "HTML to transform",
    inputLabel: "HTML code",
    placeholder: "<section>\n  <h1>Hello world</h1>\n  <p>Text to review.</p>\n</section>",
    operation: "Operation",
    format: "Format",
    minify: "Minify",
    removeComments: "Remove HTML comments",
    removeCommentsHelp: "Removes <!-- comment --> blocks before generating the result.",
    hint: "Transform HTML as text in your browser. It does not execute or render the content.",
    emptyError: "Paste HTML code to format or minify.",
    submitFormat: "Format HTML",
    submitMinify: "Minify HTML",
    reset: "Reset",
    result: "Result",
    resultTitleFormat: "Formatted HTML",
    resultTitleMinify: "Minified HTML",
    copy: "Copy",
    copied: "HTML copied.",
    copyFailed: "We couldn't copy it automatically.",
    totalChars: "Total characters",
    mode: "Mode",
    rulesNoteFormat: "We organize tags into lines and indentation so the HTML is easier to read.",
    rulesNoteMinify: "We reduce whitespace between tags to produce a more compact version.",
    disclaimer:
      "Automatic HTML cleanup result. Review complex templates before using them in production.",
    emptyTitle: "Transformed HTML will appear here",
    emptyDescription: "Paste HTML code, choose format or minify, and generate the result."
  }
} as const;

const voidTags = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);

function countLines(value: string) {
  if (!value) return 0;
  return value.split(/\r\n|\r|\n/).length;
}

function removeHtmlComments(value: string) {
  let removedComments = 0;
  const output = value.replace(/<!--[\s\S]*?-->/g, () => {
    removedComments += 1;
    return "";
  });

  return { output, removedComments };
}

function getTagName(token: string) {
  const match = token.match(/^<\/?\s*([a-zA-Z0-9:-]+)/);
  return match?.[1]?.toLowerCase() ?? "";
}

function shouldIncreaseIndent(token: string) {
  if (!token.startsWith("<") || token.startsWith("</") || token.startsWith("<!") || token.startsWith("<?")) {
    return false;
  }

  const tagName = getTagName(token);
  return Boolean(tagName) && !voidTags.has(tagName) && !/\/\s*>$/.test(token);
}

function formatHtml(value: string) {
  const source = value.replace(/\r\n?/g, "\n").replace(/>\s+</g, ">\n<");
  const tokens = source.match(/<!--[\s\S]*?-->|<!doctype[^>]*>|<\/?[^>]+>|[^<]+/gi) ?? [];
  const lines: string[] = [];
  let indent = 0;

  tokens.forEach((token) => {
    const trimmed = token.trim();
    if (!trimmed) return;

    if (trimmed.startsWith("</")) {
      indent = Math.max(indent - 1, 0);
    }

    lines.push(`${"  ".repeat(indent)}${trimmed}`);

    if (shouldIncreaseIndent(trimmed)) {
      indent += 1;
    }
  });

  return lines.join("\n");
}

function minifyHtml(value: string) {
  return value
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ")
    .replace(/>\s+</g, "><")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function transformHtml(value: string, mode: HtmlMode, removeComments: boolean): HtmlTransformResult {
  const commentResult = removeComments ? removeHtmlComments(value) : { output: value, removedComments: 0 };
  const output = mode === "format" ? formatHtml(commentResult.output) : minifyHtml(commentResult.output);

  return {
    input: value,
    output,
    mode,
    removeComments,
    removedComments: commentResult.removedComments
  };
}

export function HtmlFormatterMinifier() {
  const { locale } = useLocale();
  const text = copy[locale];
  const localeCode = locale === "es" ? "es-CO" : "en-US";
  const numberFormatter = useMemo(() => new Intl.NumberFormat(localeCode), [localeCode]);
  const [inputText, setInputText] = useState("");
  const [mode, setMode] = useState<HtmlMode>("format");
  const [removeComments, setRemoveComments] = useState(false);
  const [result, setResult] = useState<HtmlTransformResult | null>(null);
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  const resultTitle = result?.mode === "minify" ? text.resultTitleMinify : text.resultTitleFormat;
  const resultModeLabel = result?.mode === "minify" ? text.minify : text.format;
  const rulesNote = result?.mode === "minify" ? text.rulesNoteMinify : text.rulesNoteFormat;
  const outputLength = result?.output.length ?? 0;

  useEffect(() => {
    if (!copyStatus) {
      return;
    }

    const timer = window.setTimeout(() => setCopyStatus(""), 2400);
    return () => window.clearTimeout(timer);
  }, [copyStatus]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setCopyStatus("");

    if (!inputText.trim()) {
      setResult(null);
      setError(text.emptyError);
      return;
    }

    setResult(transformHtml(inputText, mode, removeComments));
    scrollToResultOnMobile();
  }

  function handleReset() {
    setInputText("");
    setMode("format");
    setRemoveComments(false);
    setResult(null);
    setError("");
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
            <FileCode2 size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span>
            {text.inputLabel} <span className="required-mark">*</span>
          </span>
          <textarea
            className="text-tool-textarea"
            onChange={(event) => {
              setInputText(event.target.value);
              setCopyStatus("");
            }}
            placeholder={text.placeholder}
            rows={12}
            spellCheck={false}
            value={inputText}
          />
        </label>

        <fieldset className="segmented-field">
          <legend>{text.operation}</legend>
          <div className="segmented-control">
            <button className={mode === "format" ? "is-active" : ""} onClick={() => setMode("format")} type="button">
              {text.format}
            </button>
            <button className={mode === "minify" ? "is-active" : ""} onClick={() => setMode("minify")} type="button">
              {text.minify}
            </button>
          </div>
        </fieldset>

        <div className="duplicate-options">
          <label className="toggle-field toggle-field--compact">
            <input checked={removeComments} onChange={(event) => setRemoveComments(event.target.checked)} type="checkbox" />
            <span>
              <strong>{text.removeComments}</strong>
              <small>{text.removeCommentsHelp}</small>
            </span>
          </label>
        </div>

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>{text.hint}</span>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-action" type="submit">
          <Code2 size={18} />
          {mode === "minify" ? text.submitMinify : text.submitFormat}
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
            <p>{resultTitle}</p>
            <strong>{resultModeLabel}</strong>
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
              <strong>{resultModeLabel}</strong>
            </div>
            <ResultStat formatter={numberFormatter} label={text.totalChars} value={outputLength} />
          </div>

          <div className="rules-note">
            <CheckCircle2 size={18} strokeWidth={2.1} />
            <p>{rulesNote}</p>
          </div>

          <p className="disclaimer">{text.disclaimer}</p>
        </aside>
      ) : (
        <aside className="result-panel result-panel--empty" ref={resultRef}>
          <div className="result-empty">
            <FileCode2 size={34} strokeWidth={2.1} />
            <h2>{text.emptyTitle}</h2>
            <p>{text.emptyDescription}</p>
          </div>
        </aside>
      )}
    </div>
  );
}

function ResultStat({
  label,
  value,
  formatter,
  signed = false
}: {
  label: string;
  value: number;
  formatter: Intl.NumberFormat;
  signed?: boolean;
}) {
  const formattedValue = signed && value > 0 ? `+${formatter.format(value)}` : formatter.format(value);

  return (
    <div className="result-item">
      <span>{label}</span>
      <strong>{formattedValue}</strong>
    </div>
  );
}
