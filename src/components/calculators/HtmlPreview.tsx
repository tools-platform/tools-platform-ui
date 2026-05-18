import { CheckCircle2, Clipboard, Code2, Info, Maximize2, RotateCcw, X } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";

type HtmlPreviewResult = {
  input: string;
  sanitizedHtml: string;
  isFullDocument: boolean;
  removedScripts: number;
  removedEventHandlers: number;
  removedJavascriptUrls: number;
};

const copy = {
  es: {
    kicker: "DESARROLLO",
    title: "HTML para revisar",
    inputLabel: "Código HTML",
    inputPlaceholder: "<section>\n  <h1>Hola mundo</h1>\n  <p>Vista previa segura.</p>\n</section>",
    hint:
      "La vista previa se genera en un iframe aislado. Eliminamos scripts, eventos inline y enlaces JavaScript antes de mostrar el resultado.",
    emptyError: "Pega código HTML para generar la vista previa.",
    submit: "Ver vista previa",
    reset: "Restablecer",
    previewTitle: "Vista previa",
    heroTitle: "Vista previa generada",
    heroValue: "HTML",
    copy: "Copiar",
    copied: "HTML copiado.",
    copyFailed: "No se pudo copiar automáticamente.",
    sample: "Usar HTML de ejemplo",
    expand: "Expandir",
    close: "Cerrar",
    editorTitle: "Editor HTML",
    updatePreview: "Actualizar vista previa",
    autoUpdate: "Actualización automática",
    updated: "Vista previa actualizada.",
    characters: "Caracteres",
    lines: "Líneas",
    rulesNote: "El HTML se renderiza sin permiso para ejecutar JavaScript.",
    disclaimer:
      "Vista previa local para revisar marcado HTML y CSS básico. No reemplaza pruebas completas en un navegador con JavaScript real.",
    emptyTitle: "La vista previa aparecerá aquí",
    emptyDescription: "Pega HTML y genera una vista segura en segundos."
  },
  en: {
    kicker: "DEVELOPMENT",
    title: "HTML to preview",
    inputLabel: "HTML code",
    inputPlaceholder: "<section>\n  <h1>Hello world</h1>\n  <p>Safe preview.</p>\n</section>",
    hint:
      "The preview runs in an isolated iframe. We remove scripts, inline events, and javascript: links before showing the result.",
    emptyError: "Paste HTML code to generate the preview.",
    submit: "Preview HTML",
    reset: "Reset",
    previewTitle: "Preview",
    heroTitle: "Preview generated",
    heroValue: "HTML",
    copy: "Copy",
    copied: "HTML copied.",
    copyFailed: "We couldn't copy it automatically.",
    sample: "Use sample HTML",
    expand: "Expand",
    close: "Close",
    editorTitle: "HTML editor",
    updatePreview: "Update preview",
    autoUpdate: "Auto update",
    updated: "Preview updated.",
    characters: "Characters",
    lines: "Lines",
    rulesNote: "The HTML renders without permission to execute JavaScript.",
    disclaimer:
      "Local preview for reviewing HTML markup and basic CSS. It does not replace full browser testing with real JavaScript.",
    emptyTitle: "Your preview will appear here",
    emptyDescription: "Paste HTML and generate a safe preview in seconds."
  }
} as const;

const sampleHtml = {
  es: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vista previa HTML</title>
</head>
<body style="margin: 0; font-family: Arial, sans-serif; background: linear-gradient(135deg, #eef2ff, #f8fafc); color: #1f2937;">

  <div style="padding: 40px;">
    <div style="max-width: 800px; margin: auto; background: white; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.12);">

      <div style="background: linear-gradient(135deg, #4f46e5, #06b6d4); padding: 40px; color: white; text-align: center;">
        <h1 style="margin: 0; font-size: 36px;">Vista previa HTML</h1>
        <p style="margin: 12px 0 0; font-size: 18px;">
          Ejemplo moderno con estilos inline
        </p>
      </div>

      <div style="padding: 36px;">
        <h2 style="margin-top: 0; font-size: 28px; color: #111827;">
          Bienvenido a tu plantilla
        </h2>

        <p style="font-size: 16px; line-height: 1.7; color: #4b5563;">
          Este es un ejemplo completo de HTML listo para pegar en una vista previa online.
          Todo el diseño usa estilos inline, sin archivos CSS externos.
        </p>

        <div style="display: flex; gap: 16px; margin: 28px 0; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 180px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 18px; padding: 22px;">
            <div style="font-size: 32px;">🚀</div>
            <h3 style="margin: 12px 0 8px;">Rápido</h3>
            <p style="margin: 0; color: #6b7280; line-height: 1.5;">
              Ideal para demos y pruebas visuales.
            </p>
          </div>

          <div style="flex: 1; min-width: 180px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 18px; padding: 22px;">
            <div style="font-size: 32px;">🎨</div>
            <h3 style="margin: 12px 0 8px;">Bonito</h3>
            <p style="margin: 0; color: #6b7280; line-height: 1.5;">
              Diseño limpio, moderno y agradable.
            </p>
          </div>

          <div style="flex: 1; min-width: 180px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 18px; padding: 22px;">
            <div style="font-size: 32px;">⚡</div>
            <h3 style="margin: 12px 0 8px;">Simple</h3>
            <p style="margin: 0; color: #6b7280; line-height: 1.5;">
              Solo HTML con estilos inline.
            </p>
          </div>
        </div>

        <div style="background: #eef2ff; border-left: 5px solid #4f46e5; padding: 20px; border-radius: 14px;">
          <strong style="color: #3730a3;">Nota:</strong>
          <span style="color: #4338ca;">
            Puedes pegar este archivo completo en cualquier visor HTML online.
          </span>
        </div>

        <div style="text-align: center; margin-top: 36px;">
          <a href="#" style="display: inline-block; background: linear-gradient(135deg, #4f46e5, #06b6d4); color: white; text-decoration: none; padding: 14px 28px; border-radius: 999px; font-weight: bold;">
            Ver más
          </a>
        </div>
      </div>

      <div style="padding: 20px; text-align: center; background: #f9fafb; color: #6b7280; font-size: 14px;">
        © 2026 Ejemplo HTML
      </div>

    </div>
  </div>

</body>
</html>`,
  en: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML preview</title>
</head>
<body style="margin: 0; font-family: Arial, sans-serif; background: linear-gradient(135deg, #eef2ff, #f8fafc); color: #1f2937;">

  <div style="padding: 40px;">
    <div style="max-width: 800px; margin: auto; background: white; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.12);">

      <div style="background: linear-gradient(135deg, #4f46e5, #06b6d4); padding: 40px; color: white; text-align: center;">
        <h1 style="margin: 0; font-size: 36px;">HTML preview</h1>
        <p style="margin: 12px 0 0; font-size: 18px;">
          Modern example with inline styles
        </p>
      </div>

      <div style="padding: 36px;">
        <h2 style="margin-top: 0; font-size: 28px; color: #111827;">
          Welcome to your template
        </h2>

        <p style="font-size: 16px; line-height: 1.7; color: #4b5563;">
          This is a complete HTML example ready to paste into an online preview.
          The whole design uses inline styles, without external CSS files.
        </p>

        <div style="display: flex; gap: 16px; margin: 28px 0; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 180px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 18px; padding: 22px;">
            <div style="font-size: 32px;">🚀</div>
            <h3 style="margin: 12px 0 8px;">Fast</h3>
            <p style="margin: 0; color: #6b7280; line-height: 1.5;">
              Ideal for demos and visual checks.
            </p>
          </div>

          <div style="flex: 1; min-width: 180px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 18px; padding: 22px;">
            <div style="font-size: 32px;">🎨</div>
            <h3 style="margin: 12px 0 8px;">Clean</h3>
            <p style="margin: 0; color: #6b7280; line-height: 1.5;">
              A modern, pleasant visual layout.
            </p>
          </div>

          <div style="flex: 1; min-width: 180px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 18px; padding: 22px;">
            <div style="font-size: 32px;">⚡</div>
            <h3 style="margin: 12px 0 8px;">Simple</h3>
            <p style="margin: 0; color: #6b7280; line-height: 1.5;">
              Just HTML with inline styles.
            </p>
          </div>
        </div>

        <div style="background: #eef2ff; border-left: 5px solid #4f46e5; padding: 20px; border-radius: 14px;">
          <strong style="color: #3730a3;">Note:</strong>
          <span style="color: #4338ca;">
            You can paste this complete file into any online HTML viewer.
          </span>
        </div>

        <div style="text-align: center; margin-top: 36px;">
          <a href="#" style="display: inline-block; background: linear-gradient(135deg, #4f46e5, #06b6d4); color: white; text-decoration: none; padding: 14px 28px; border-radius: 999px; font-weight: bold;">
            See more
          </a>
        </div>
      </div>

      <div style="padding: 20px; text-align: center; background: #f9fafb; color: #6b7280; font-size: 14px;">
        © 2026 HTML example
      </div>

    </div>
  </div>

</body>
</html>`
} as const;

function countLines(value: string) {
  if (!value) return 0;
  return value.split(/\r\n|\r|\n/).length;
}

function sanitizeHtml(value: string): HtmlPreviewResult {
  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(value, "text/html");
  let removedScripts = 0;
  let removedEventHandlers = 0;
  let removedJavascriptUrls = 0;

  parsedDocument.querySelectorAll("script").forEach((element) => {
    removedScripts += 1;
    element.remove();
  });

  parsedDocument.querySelectorAll("*").forEach((element) => {
    Array.from(element.attributes).forEach((attribute) => {
      const attributeName = attribute.name.toLowerCase();
      const attributeValue = attribute.value.trim().toLowerCase();

      if (attributeName.startsWith("on")) {
        element.removeAttribute(attribute.name);
        removedEventHandlers += 1;
        return;
      }

      if (
        ["href", "src", "xlink:href", "action", "formaction"].includes(attributeName) &&
        attributeValue.startsWith("javascript:")
      ) {
        element.removeAttribute(attribute.name);
        removedJavascriptUrls += 1;
      }
    });
  });

  const isFullDocument = /<!doctype|<html[\s>]|<head[\s>]|<body[\s>]/i.test(value);

  return {
    input: value,
    sanitizedHtml: isFullDocument ? `<!doctype html>\n${parsedDocument.documentElement.outerHTML}` : parsedDocument.body.innerHTML,
    isFullDocument,
    removedScripts,
    removedEventHandlers,
    removedJavascriptUrls
  };
}

function buildPreviewDocument(result: HtmlPreviewResult) {
  const safetyMeta = `<meta http-equiv="Content-Security-Policy" content="script-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'">`;

  if (result.isFullDocument) {
    return result.sanitizedHtml.replace(/<\/head>/i, `${safetyMeta}\n</head>`);
  }

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  ${safetyMeta}
  <base target="_blank">
  <style>
    html { color-scheme: light; }
    body {
      margin: 16px;
      color: #0f172a;
      background: #ffffff;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      line-height: 1.5;
    }
    * { box-sizing: border-box; }
    img, video, canvas, svg, iframe { max-width: 100%; height: auto; }
    table { border-collapse: collapse; max-width: 100%; }
  </style>
</head>
<body>
${result.sanitizedHtml}
</body>
</html>`;
}

export function HtmlPreview() {
  const { locale } = useLocale();
  const text = copy[locale];
  const localeCode = locale === "es" ? "es-CO" : "en-US";
  const numberFormatter = useMemo(() => new Intl.NumberFormat(localeCode), [localeCode]);
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<HtmlPreviewResult | null>(null);
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [autoUpdatePreview, setAutoUpdatePreview] = useState(false);
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  const previewDocument = useMemo(() => (result ? buildPreviewDocument(result) : ""), [result]);
  const hasResult = Boolean(result);
  const inputCharacters = result?.input.length ?? 0;
  const inputLines = result ? countLines(result.input) : 0;

  useEffect(() => {
    if (!copyStatus) return;

    const timer = window.setTimeout(() => setCopyStatus(""), 2400);
    return () => window.clearTimeout(timer);
  }, [copyStatus]);

  useEffect(() => {
    if (!isExpanded) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsExpanded(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExpanded]);

  useEffect(() => {
    if (!isExpanded || !autoUpdatePreview || !hasResult) return;
    setResult(sanitizeHtml(inputText));
  }, [autoUpdatePreview, hasResult, inputText, isExpanded]);

  function generatePreview(shouldScroll: boolean) {
    setError("");
    setCopyStatus("");

    if (!inputText.trim()) {
      setResult(null);
      setIsExpanded(false);
      setError(text.emptyError);
      return false;
    }

    setResult(sanitizeHtml(inputText));
    if (shouldScroll) {
      scrollToResultOnMobile();
    }
    return true;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    generatePreview(true);
  }

  function handleReset() {
    setInputText("");
    setResult(null);
    setError("");
    setCopyStatus("");
    setIsExpanded(false);
  }

  function handleSample() {
    const nextInput = sampleHtml[locale];
    setInputText(nextInput);
    setError("");
    setCopyStatus("");
    setIsExpanded(false);
    setResult(sanitizeHtml(nextInput));
    scrollToResultOnMobile();
  }

  function handleExpandedUpdate() {
    if (generatePreview(false)) {
      setCopyStatus(text.updated);
    }
  }

  async function handleCopy() {
    if (!result?.sanitizedHtml) return;

    try {
      await navigator.clipboard.writeText(result.sanitizedHtml);
      setCopyStatus(text.copied);
    } catch {
      setCopyStatus(text.copyFailed);
    }
  }

  return (
    <>
      <div className="calculator-layout">
      <form className="calculator-card" onSubmit={handleSubmit}>
        <div className="calculator-card__header">
          <div>
            <p className="section__kicker">{text.kicker}</p>
            <h2>{text.title}</h2>
          </div>
          <span>
            <Code2 size={20} strokeWidth={2.1} />
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
            placeholder={text.inputPlaceholder}
            rows={14}
            value={inputText}
          />
        </label>

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>{text.hint}</span>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-action" type="submit">
          <Code2 size={18} />
          {text.submit}
        </button>

        <button className="secondary-action" onClick={handleSample} type="button">
          <Code2 size={18} />
          {text.sample}
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
            <p>{text.heroTitle}</p>
            <strong>{text.heroValue}</strong>
            <span>
              {numberFormatter.format(inputLines)} {text.lines.toLowerCase()} · {numberFormatter.format(inputCharacters)}{" "}
              {text.characters.toLowerCase()}
            </span>
          </div>

          <div className="text-result">
            <div className="text-result__header">
              <span>{text.previewTitle}</span>
              <div className="text-result__actions">
                <button onClick={() => setIsExpanded(true)} type="button">
                  <Maximize2 size={16} strokeWidth={2.1} />
                  {text.expand}
                </button>
                <button onClick={handleCopy} type="button">
                  <Clipboard size={16} strokeWidth={2.1} />
                  {text.copy}
                </button>
              </div>
            </div>
            <div className="html-preview-frame-wrap">
              <iframe
                className="html-preview-frame"
                referrerPolicy="no-referrer"
                sandbox=""
                srcDoc={previewDocument}
                title={text.previewTitle}
              />
            </div>
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
            <Code2 size={34} strokeWidth={2.1} />
            <h2>{text.emptyTitle}</h2>
            <p>{text.emptyDescription}</p>
          </div>
        </aside>
      )}
      </div>

      {isExpanded && result ? (
        <div className="html-preview-wide" role="dialog" aria-modal="true" aria-label={text.previewTitle}>
          <div className="html-preview-wide__bar">
            <div>
              <span>{text.editorTitle}</span>
              <strong>{text.previewTitle}</strong>
            </div>
            <div className="html-preview-wide__actions">
              <button
                aria-checked={autoUpdatePreview}
                className={`html-preview-live-toggle${autoUpdatePreview ? " is-active" : ""}`}
                onClick={() => setAutoUpdatePreview((current) => !current)}
                role="switch"
                type="button"
              >
                <span aria-hidden="true" />
                {text.autoUpdate}
              </button>
              <button className="secondary-action" onClick={handleExpandedUpdate} type="button">
                <Code2 size={18} />
                {text.updatePreview}
              </button>
              <button className="secondary-action" onClick={handleCopy} type="button">
                <Clipboard size={18} />
                {text.copy}
              </button>
              <button className="html-preview-wide__close" onClick={() => setIsExpanded(false)} type="button" aria-label={text.close}>
                <X size={20} />
              </button>
            </div>
          </div>

          {copyStatus ? (
            <div className={`duplicate-copy-toast${copyStatus === text.copyFailed ? " duplicate-copy-toast--error" : ""}`} role="status">
              <CheckCircle2 size={16} strokeWidth={2.1} />
              <span>{copyStatus}</span>
            </div>
          ) : null}

          <div className="html-preview-wide__grid">
            <section className="html-preview-wide__pane">
              <div className="html-preview-wide__pane-header">
                <span>{text.editorTitle}</span>
              </div>
              <textarea
                className="html-preview-wide__editor"
                onChange={(event) => {
                  setInputText(event.target.value);
                  setCopyStatus("");
                }}
                spellCheck={false}
                value={inputText}
              />
            </section>

            <section className="html-preview-wide__pane">
              <div className="html-preview-wide__pane-header">
                <span>{text.previewTitle}</span>
              </div>
              <div className="html-preview-wide__frame-wrap">
                <iframe
                  className="html-preview-frame"
                  referrerPolicy="no-referrer"
                  sandbox=""
                  srcDoc={previewDocument}
                  title={text.previewTitle}
                />
              </div>
            </section>
          </div>
        </div>
      ) : null}
    </>
  );
}
