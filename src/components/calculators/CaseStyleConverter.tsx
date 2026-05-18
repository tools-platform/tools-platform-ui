import { CheckCircle2, Clipboard, Code2, Info, RotateCcw, Wand2 } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";

type CaseResult = {
  id: string;
  label: string;
  description: string;
  value: string;
};

function normalizeWords(value: string, localeCode: string) {
  const cleanValue = value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[’']/g, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2");

  return cleanValue.match(/[\p{L}\p{N}]+/gu)?.map((word) => word.toLocaleLowerCase(localeCode)) ?? [];
}

function capitalizeWord(value: string, localeCode: string) {
  return value.charAt(0).toLocaleUpperCase(localeCode) + value.slice(1);
}

const descriptions = {
  es: {
    camel: "Común en variables y funciones de JavaScript.",
    pascal: "Común en clases, componentes y tipos.",
    snake: "Usado en Python, Ruby, SQL y APIs.",
    screamingSnake: "Usado normalmente para constantes.",
    kebab: "Útil para URLs, archivos, clases CSS y slugs.",
    train: "Variante con guiones y cada palabra capitalizada.",
    dot: "Útil para keys, rutas lógicas y configuraciones.",
    path: "Útil para rutas o segmentos de archivo.",
    flat: "Todo junto en minúsculas.",
    upperFlat: "Todo junto en mayúsculas."
  },
  en: {
    camel: "Common in JavaScript variables and functions.",
    pascal: "Common in classes, components, and types.",
    snake: "Used in Python, Ruby, SQL, and APIs.",
    screamingSnake: "Usually used for constants.",
    kebab: "Useful for URLs, files, CSS classes, and slugs.",
    train: "Hyphenated variant with each word capitalized.",
    dot: "Useful for keys, logical paths, and configs.",
    path: "Useful for routes or file path segments.",
    flat: "Everything together in lowercase.",
    upperFlat: "Everything together in uppercase."
  }
} as const;

function buildCaseResults(value: string, localeCode: string, locale: "es" | "en"): CaseResult[] {
  const words = normalizeWords(value, localeCode);
  const pascalWords = words.map((word) => capitalizeWord(word, localeCode));

  const camelCase = words.length > 0 ? `${words[0]}${pascalWords.slice(1).join("")}` : "";
  const pascalCase = pascalWords.join("");
  const snakeCase = words.join("_");
  const screamingSnakeCase = snakeCase.toLocaleUpperCase(localeCode);
  const kebabCase = words.join("-");
  const trainCase = pascalWords.join("-");
  const dotCase = words.join(".");
  const pathCase = words.join("/");
  const flatCase = words.join("");
  const upperFlatCase = flatCase.toLocaleUpperCase(localeCode);
  const text = descriptions[locale];

  return [
    { id: "camel", label: "camelCase", description: text.camel, value: camelCase },
    { id: "pascal", label: "PascalCase", description: text.pascal, value: pascalCase },
    { id: "snake", label: "snake_case", description: text.snake, value: snakeCase },
    { id: "screaming-snake", label: "SCREAMING_SNAKE_CASE", description: text.screamingSnake, value: screamingSnakeCase },
    { id: "kebab", label: "kebab-case", description: text.kebab, value: kebabCase },
    { id: "train", label: "Train-Case", description: text.train, value: trainCase },
    { id: "dot", label: "dot.case", description: text.dot, value: dotCase },
    { id: "path", label: "path/case", description: text.path, value: pathCase },
    { id: "flat", label: "flatcase", description: text.flat, value: flatCase },
    { id: "upper-flat", label: "UPPERFLATCASE", description: text.upperFlat, value: upperFlatCase }
  ];
}

function countWords(value: string, localeCode: string) {
  return normalizeWords(value, localeCode).length;
}

const copy = {
  es: {
    kicker: "Desarrollo",
    title: "Formatos para código",
    baseText: "Texto base",
    placeholder: "Pega una frase, nombre de variable o título...",
    emptyError: "Escribe una frase, nombre de variable o texto para convertir.",
    emptyValueError: "El texto debe incluir al menos una letra o número.",
    rulesNote:
      "Al convertir obtendrás todos los formatos del texto, incluyendo camelCase, snake_case, kebab-case y otros.",
    hint: "Quitamos tildes y símbolos para generar nombres más compatibles con código, rutas y archivos.",
    submit: "Convertir estilos",
    reset: "Restablecer",
    generatedFormats: "Formatos generados",
    styles: "Estilos",
    wordsDetected: "Palabras detectadas",
    copy: "Copiar",
    copied: "Copiado.",
    copyFailed: "No se pudo copiar automáticamente.",
    localRules: "Conversión local para nombres de variables, clases, archivos, rutas, slugs y constantes.",
    disclaimer:
      "Resultado automático para apoyo en desarrollo. Valida la convención exacta de tu lenguaje, framework o equipo antes de usarlo en producción.",
    emptyTitle: "Formatos de código",
    emptyDescription: "Convierte una frase a varios estilos usados en programación."
  },
  en: {
    kicker: "Development",
    title: "Code naming styles",
    baseText: "Base text",
    placeholder: "Paste a phrase, variable name, or title...",
    emptyError: "Type a phrase, variable name, or text to convert.",
    emptyValueError: "The text must include at least one letter or number.",
    rulesNote:
      "When you convert it, you'll get all text formats, including camelCase, snake_case, kebab-case, and more.",
    hint: "We remove accents and symbols to generate names that are more compatible with code, routes, and files.",
    submit: "Convert styles",
    reset: "Reset",
    generatedFormats: "Generated formats",
    styles: "Styles",
    wordsDetected: "Words detected",
    copy: "Copy",
    copied: "Copied.",
    copyFailed: "We couldn't copy it automatically.",
    localRules: "Local conversion for variable names, classes, files, routes, slugs, and constants.",
    disclaimer:
      "Automatic result for development support. Validate the exact convention of your language, framework, or team before using it in production.",
    emptyTitle: "Code formats",
    emptyDescription: "Convert a phrase into multiple styles used in programming."
  }
} as const;

export function CaseStyleConverter() {
  const { locale } = useLocale();
  const localeCode = locale === "es" ? "es-CO" : "en-US";
  const text = copy[locale];
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState<CaseResult[] | null>(null);
  const [appliedText, setAppliedText] = useState("");
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  const detectedWords = useMemo(() => countWords(appliedText, localeCode), [appliedText, localeCode]);

  useEffect(() => {
    if (!copyStatus) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setCopyStatus(""), 2200);
    return () => window.clearTimeout(timeout);
  }, [copyStatus]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setCopyStatus("");

    if (!inputText.trim()) {
      setError(text.emptyError);
      setResults(null);
      return;
    }

    const nextResults = buildCaseResults(inputText, localeCode, locale);

    if (nextResults.every((result) => result.value.length === 0)) {
      setError(text.emptyValueError);
      setResults(null);
      return;
    }

    setAppliedText(inputText);
    setResults(nextResults);
    scrollToResultOnMobile();
  }

  function handleReset() {
    setInputText("");
    setResults(null);
    setAppliedText("");
    setError("");
    setCopyStatus("");
  }

  async function handleCopy(result: CaseResult) {
    try {
      await navigator.clipboard.writeText(result.value);
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
            <Code2 size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span>{text.baseText} <span className="required-mark">*</span></span>
          <textarea
            onChange={(event) => {
              setInputText(event.target.value);
              setCopyStatus("");
            }}
            placeholder={text.placeholder}
            rows={8}
            value={inputText}
          />
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="rules-note rules-note--form">
          <CheckCircle2 size={18} strokeWidth={2.1} />
          <p>{text.rulesNote}</p>
        </div>

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

      {results ? (
        <aside className="result-panel" ref={resultRef}>
          <div className="result-panel__hero result-panel__hero--compact">
            <p>{text.generatedFormats}</p>
            <strong>{results.length} {text.styles}</strong>
            <span>{detectedWords} {text.wordsDetected}</span>
          </div>

          <div className="case-result-list">
            {copyStatus ? (
              <div className={`duplicate-copy-toast${copyStatus === text.copyFailed ? " duplicate-copy-toast--error" : ""}`} role="status">
                <CheckCircle2 size={18} strokeWidth={2.1} />
                <span>{copyStatus}</span>
              </div>
            ) : null}

            {results.map((result) => (
              <div className="case-result-item" key={result.id}>
                <div>
                  <span>{result.label}</span>
                  <small>{result.description}</small>
                  <strong>{result.value}</strong>
                </div>
                <button onClick={() => handleCopy(result)} type="button">
                  <Clipboard size={16} strokeWidth={2.1} />
                  {text.copy}
                </button>
              </div>
            ))}
          </div>

          <div className="rules-note">
            <CheckCircle2 size={18} strokeWidth={2.1} />
            <p>{text.localRules}</p>
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
  );
}
