import { CheckCircle2, Clipboard, Info, LetterText, RotateCcw, Wand2 } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";

type CaseMode = "uppercase" | "lowercase" | "capitalized" | "sentence";

function countWords(value: string) {
  const words = value.trim().match(/\S+/g);
  return words?.length ?? 0;
}

const copy = {
  es: {
    modes: [
      { value: "uppercase", label: "Mayúsculas", description: "Convierte todo el texto a letras grandes.", example: "HOLA MUNDO" },
      { value: "lowercase", label: "Minúsculas", description: "Convierte todo el texto a letras pequeñas.", example: "hola mundo" },
      { value: "capitalized", label: "Capitalizar", description: "Pone en mayúscula la primera letra de cada palabra.", example: "Hola Mundo" },
      { value: "sentence", label: "Tipo oración", description: "Pone en mayúscula el inicio de cada frase.", example: "Hola mundo." }
    ] as const,
    kicker: "Convertidor",
    title: "Formato de texto",
    originalText: "Texto original",
    originalPlaceholder: "Pega aquí el texto que quieres convertir...",
    format: "Formato",
    emptyError: "Escribe o pega un texto para transformarlo.",
    hint: "El texto se transforma en tu navegador. No se envía a ningún servidor.",
    submit: "Transformar texto",
    reset: "Restablecer",
    copied: "Texto copiado.",
    copyFailed: "No se pudo copiar automáticamente.",
    transformedText: "Texto transformado",
    words: "Palabras",
    characters: "Caracteres",
    result: "Resultado",
    copy: "Copiar",
    appliedFormat: "Formato aplicado",
    privacy: "Privacidad",
    local: "Local",
    rulesNote: "Conversión aplicada directamente en el navegador para tareas rápidas de texto.",
    disclaimer:
      "Resultado automático de formato. Revisa nombres propios, siglas o estilos editoriales si el texto se usará de forma profesional.",
    emptyTitle: "Resultado de texto",
    emptyDescription: "Elige un formato y transforma tu texto en segundos."
  },
  en: {
    modes: [
      { value: "uppercase", label: "Uppercase", description: "Turns the whole text into uppercase letters.", example: "HELLO WORLD" },
      { value: "lowercase", label: "Lowercase", description: "Turns the whole text into lowercase letters.", example: "hello world" },
      { value: "capitalized", label: "Title case", description: "Uppercases the first letter of each word.", example: "Hello World" },
      { value: "sentence", label: "Sentence case", description: "Uppercases the beginning of each sentence.", example: "Hello world." }
    ] as const,
    kicker: "Converter",
    title: "Text formatting",
    originalText: "Original text",
    originalPlaceholder: "Paste the text you want to transform here...",
    format: "Format",
    emptyError: "Type or paste text to transform it.",
    hint: "The text is transformed in your browser. It is not sent to any server.",
    submit: "Transform text",
    reset: "Reset",
    copied: "Text copied.",
    copyFailed: "We couldn't copy it automatically.",
    transformedText: "Transformed text",
    words: "Words",
    characters: "Characters",
    result: "Result",
    copy: "Copy",
    appliedFormat: "Applied format",
    privacy: "Privacy",
    local: "Local",
    rulesNote: "Conversion is applied directly in the browser for quick text tasks.",
    disclaimer:
      "Automatic formatting result. Review proper nouns, acronyms, or editorial styles if the text will be used professionally.",
    emptyTitle: "Text result",
    emptyDescription: "Choose a format and transform your text in seconds."
  }
} as const;

function capitalizeWords(value: string, localeCode: string) {
  const lowerText = value.toLocaleLowerCase(localeCode);
  return lowerText.replace(/(^|[\s¿¡([{'"-])(\p{L})/gu, (_, prefix: string, letter: string) => {
    return `${prefix}${letter.toLocaleUpperCase(localeCode)}`;
  });
}

function sentenceCase(value: string, localeCode: string) {
  const lowerText = value.toLocaleLowerCase(localeCode);
  const formattedText = lowerText.replace(/(^|[.!?]\s+)(\p{L})/gu, (_, prefix: string, letter: string) => {
    return `${prefix}${letter.toLocaleUpperCase(localeCode)}`;
  });

  return formattedText
    .split(/(\r?\n+)/)
    .map((part) => {
      if (/^\r?\n+$/.test(part) || part.trim().length === 0) {
        return part;
      }

      const trailingSpace = part.match(/\s+$/)?.[0] ?? "";
      const content = trailingSpace ? part.slice(0, -trailingSpace.length) : part;

      if (!/[\p{L}\p{N}]$/u.test(content)) {
        return part;
      }

      return `${content}.${trailingSpace}`;
    })
    .join("");
}

function transformText(value: string, mode: CaseMode, localeCode: string) {
  if (mode === "uppercase") return value.toLocaleUpperCase(localeCode);
  if (mode === "lowercase") return value.toLocaleLowerCase(localeCode);
  if (mode === "capitalized") return capitalizeWords(value, localeCode);
  return sentenceCase(value, localeCode);
}

export function TextCaseConverter() {
  const { locale } = useLocale();
  const localeCode = locale === "es" ? "es-CO" : "en-US";
  const text = copy[locale];
  const caseModes = text.modes;
  const [inputText, setInputText] = useState("");
  const [mode, setMode] = useState<CaseMode>("uppercase");
  const [appliedMode, setAppliedMode] = useState<CaseMode>("uppercase");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  const resultMode = useMemo(() => caseModes.find((caseMode) => caseMode.value === appliedMode) ?? caseModes[0], [appliedMode, caseModes]);
  const characterCount = result.length;
  const wordCount = countWords(result);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setCopyStatus("");

    if (!inputText.trim()) {
      setError(text.emptyError);
      setResult("");
      return;
    }

    setResult(transformText(inputText, mode, localeCode));
    setAppliedMode(mode);
    scrollToResultOnMobile();
  }

  function handleReset() {
    setInputText("");
    setMode("uppercase");
    setAppliedMode("uppercase");
    setResult("");
    setError("");
    setCopyStatus("");
  }

  async function handleCopy() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
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
            <LetterText size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span>{text.originalText} <span className="required-mark">*</span></span>
          <textarea
            className="text-tool-textarea"
            onChange={(event) => {
              setInputText(event.target.value);
              setCopyStatus("");
            }}
            placeholder={text.originalPlaceholder}
            rows={8}
            value={inputText}
          />
        </label>

        <div className="field field--spaced">
          <span>{text.format}</span>
          <div className="case-mode-grid">
            {caseModes.map((caseMode) => (
              <button
                className={mode === caseMode.value ? "case-mode is-active" : "case-mode"}
                key={caseMode.value}
                onClick={() => {
                  setMode(caseMode.value);
                  setCopyStatus("");
                }}
                type="button"
              >
                <strong>{caseMode.label}</strong>
                <span>{caseMode.description}</span>
                <small>{caseMode.example}</small>
              </button>
            ))}
          </div>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>{text.hint}</span>
        </div>

        <button className="primary-action" type="submit">
          <Wand2 size={18} />
          {text.submit}
        </button>

        <button className="secondary-action" onClick={handleReset} type="button">
          <RotateCcw size={18} />
          {text.reset}
        </button>
      </form>

      {result ? (
        <aside className="result-panel" ref={resultRef}>
          <div className="result-panel__hero result-panel__hero--compact">
            <p>{text.transformedText}</p>
            <strong>{resultMode.label}</strong>
            <span>{wordCount} {text.words} · {characterCount} {text.characters}</span>
          </div>

          <div className="text-result">
            <div className="text-result__header">
              <span>{text.result}</span>
              <button onClick={handleCopy} type="button">
                <Clipboard size={16} strokeWidth={2.1} />
                {text.copy}
              </button>
            </div>
            <textarea readOnly rows={10} value={result} />
            {copyStatus ? <p>{copyStatus}</p> : null}
          </div>

          <div className="result-breakdown">
            <div className="result-item">
              <span>{text.appliedFormat}</span>
              <strong>{resultMode.label}</strong>
            </div>
            <div className="result-item">
              <span>{text.words}</span>
              <strong>{wordCount}</strong>
            </div>
            <div className="result-item">
              <span>{text.characters}</span>
              <strong>{characterCount}</strong>
            </div>
            <div className="result-item result-item--strong">
              <span>{text.privacy}</span>
              <strong>{text.local}</strong>
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
            <LetterText size={34} strokeWidth={2.1} />
            <h2>{text.emptyTitle}</h2>
            <p>{text.emptyDescription}</p>
          </div>
        </aside>
      )}
    </div>
  );
}
