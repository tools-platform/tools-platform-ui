import { CheckCircle2, ChevronDown, Clipboard, Hash, Info, RotateCcw } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";

type HashAlgorithm = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";
type HashCase = "lowercase" | "uppercase" | "mixed";

type HashResult = {
  input: string;
  output: string;
  entries: string[];
  algorithm: HashAlgorithm;
  letterCase: HashCase;
  eachLine: boolean;
  processedLines: number;
};

const copy = {
  es: {
    kicker: "Desarrollo",
    title: "Generador hash",
    inputLabel: "Texto de entrada",
    inputPlaceholder: "Pega texto para generar un hash...",
    algorithm: "Algoritmo",
    letterCase: "Letras",
    lowercase: "Minúsculas",
    uppercase: "Mayúsculas",
    mixed: "Ambas",
    eachLine: "Procesar cada línea por separado",
    eachLineHelp: "Genera un hash independiente para cada línea no vacía.",
    hint: "El hash se genera localmente en tu navegador. No enviamos el texto a ningún servidor.",
    emptyError: "Pega un texto para generar el hash.",
    submit: "Generar hash",
    reset: "Restablecer",
    result: "Resultado",
    resultTitle: "Hash generado",
    copy: "Copiar",
    copied: "Hash copiado.",
    copyFailed: "No se pudo copiar automáticamente.",
    lineResult: "Línea",
    algorithmLabel: "Algoritmo",
    inputChars: "Caracteres entrada",
    outputChars: "Caracteres salida",
    lineMode: "Líneas",
    lineModeOn: "Separadas",
    lineModeOff: "Todo el texto",
    rulesNote: "Un hash es una huella del texto. Sirve para comparar contenido, no para ocultarlo.",
    disclaimer:
      "Un hash no es cifrado y no se debe usar como contraseña visible. Para contraseñas reales usa sistemas con sal y derivación de claves.",
    emptyTitle: "Tu hash aparecerá aquí",
    emptyDescription: "Pega texto, elige el algoritmo y genera una huella SHA localmente."
  },
  en: {
    kicker: "Development",
    title: "Hash generator",
    inputLabel: "Input text",
    inputPlaceholder: "Paste text to generate a hash...",
    algorithm: "Algorithm",
    letterCase: "Letters",
    lowercase: "Lowercase",
    uppercase: "Uppercase",
    mixed: "Mixed",
    eachLine: "Process each line separately",
    eachLineHelp: "Generates an independent hash for each non-empty line.",
    hint: "The hash is generated locally in your browser. We do not send the text to any server.",
    emptyError: "Paste text to generate the hash.",
    submit: "Generate hash",
    reset: "Reset",
    result: "Result",
    resultTitle: "Generated hash",
    copy: "Copy",
    copied: "Hash copied.",
    copyFailed: "We couldn't copy it automatically.",
    lineResult: "Line",
    algorithmLabel: "Algorithm",
    inputChars: "Input characters",
    outputChars: "Output characters",
    lineMode: "Lines",
    lineModeOn: "Separate",
    lineModeOff: "Whole text",
    rulesNote: "A hash is a fingerprint of the text. It helps compare content, not hide it.",
    disclaimer:
      "A hash is not encryption and should not be used as a visible password. For real passwords, use salted key-derivation systems.",
    emptyTitle: "Your hash will appear here",
    emptyDescription: "Paste text, choose the algorithm, and generate a local SHA fingerprint."
  }
} as const;

const algorithms: HashAlgorithm[] = ["SHA-256", "SHA-1", "SHA-384", "SHA-512"];

function bytesToHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function mixHexCase(value: string) {
  const randomValues = new Uint8Array(value.length);
  crypto.getRandomValues(randomValues);

  return Array.from(value, (character, index) => {
    if (!/[a-f]/i.test(character)) return character;
    return randomValues[index] % 2 === 0 ? character.toLowerCase() : character.toUpperCase();
  }).join("");
}

function applyHashCase(value: string, letterCase: HashCase) {
  if (letterCase === "uppercase") return value.toUpperCase();
  if (letterCase === "mixed") return mixHexCase(value);
  return value.toLowerCase();
}

async function hashText(value: string, algorithm: HashAlgorithm, letterCase: HashCase) {
  const digest = await crypto.subtle.digest(algorithm, new TextEncoder().encode(value));
  return applyHashCase(bytesToHex(digest), letterCase);
}

async function generateHash(value: string, algorithm: HashAlgorithm, letterCase: HashCase, eachLine: boolean) {
  if (!eachLine) {
    const hash = await hashText(value, algorithm, letterCase);
    return {
      output: hash,
      entries: [hash],
      processedLines: value.length > 0 ? 1 : 0
    };
  }

  const lines = value.split(/\r\n|\r|\n/).filter((line) => line.length > 0);
  const hashes = await Promise.all(lines.map((line) => hashText(line, algorithm, letterCase)));

  return {
    output: hashes.join("\n"),
    entries: hashes,
    processedLines: lines.length
  };
}

export function HashGenerator() {
  const { locale } = useLocale();
  const text = copy[locale];
  const [inputText, setInputText] = useState("");
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>("SHA-256");
  const [letterCase, setLetterCase] = useState<HashCase>("lowercase");
  const [eachLine, setEachLine] = useState(false);
  const [result, setResult] = useState<HashResult | null>(null);
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  const numberFormatter = useMemo(() => new Intl.NumberFormat(locale === "es" ? "es-CO" : "en-US"), [locale]);
  const inputLength = result?.input.length ?? 0;
  const outputLength = result?.output.length ?? 0;
  const lineModeLabel = result?.eachLine ? text.lineModeOn : text.lineModeOff;

  useEffect(() => {
    if (!copyStatus) return;

    const timer = window.setTimeout(() => setCopyStatus(""), 2400);
    return () => window.clearTimeout(timer);
  }, [copyStatus]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setCopyStatus("");

    if (!inputText.trim()) {
      setResult(null);
      setError(text.emptyError);
      return;
    }

    const nextResult = await generateHash(inputText, algorithm, letterCase, eachLine);
    setResult({
      input: inputText,
      output: nextResult.output,
      entries: nextResult.entries,
      algorithm,
      letterCase,
      eachLine,
      processedLines: nextResult.processedLines
    });
    scrollToResultOnMobile();
  }

  function handleReset() {
    setInputText("");
    setAlgorithm("SHA-256");
    setLetterCase("lowercase");
    setEachLine(false);
    setResult(null);
    setError("");
    setCopyStatus("");
  }

  async function copyValue(value: string, copiedLabel: string = text.copied) {
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus(copiedLabel);
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
            <Hash size={20} strokeWidth={2.1} />
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
            rows={9}
            value={inputText}
          />
        </label>

        <label className="field field--spaced">
          <span>{text.algorithm}</span>
          <div className="select-control">
            <select className="plain-select" onChange={(event) => setAlgorithm(event.target.value as HashAlgorithm)} value={algorithm}>
              {algorithms.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <ChevronDown size={18} strokeWidth={2.1} />
          </div>
        </label>

        <label className="field field--spaced">
          <span>{text.letterCase}</span>
          <div className="select-control">
            <select className="plain-select" onChange={(event) => setLetterCase(event.target.value as HashCase)} value={letterCase}>
              <option value="lowercase">{text.lowercase}</option>
              <option value="uppercase">{text.uppercase}</option>
              <option value="mixed">{text.mixed}</option>
            </select>
            <ChevronDown size={18} strokeWidth={2.1} />
          </div>
        </label>

        <div className="duplicate-options field--spaced">
          <label className="toggle-field toggle-field--compact">
            <input checked={eachLine} onChange={(event) => setEachLine(event.target.checked)} type="checkbox" />
            <span>
              <strong>{text.eachLine}</strong>
              <small>{text.eachLineHelp}</small>
            </span>
          </label>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>{text.hint}</span>
        </div>

        <button className="primary-action" type="submit">
          <Hash size={18} />
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
            <strong>{result.algorithm}</strong>
            <span>{numberFormatter.format(outputLength)} {text.outputChars.toLowerCase()}</span>
          </div>

          {result.eachLine ? (
            <div className="case-result-list">
              {result.entries.map((hashValue, index) => (
                <div className="case-result-item" key={`${hashValue}-${index}`}>
                  <div>
                    <span>{text.lineResult} {index + 1}</span>
                    <small>{result.algorithm}</small>
                    <strong>{hashValue}</strong>
                  </div>
                  <button onClick={() => copyValue(hashValue)} type="button">
                    <Clipboard size={16} strokeWidth={2.1} />
                    {text.copy}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-result">
              <div className="text-result__header">
                <span>{text.result}</span>
                <div className="text-result__actions">
                  <button onClick={() => copyValue(result.output)} type="button">
                    <Clipboard size={16} strokeWidth={2.1} />
                    {text.copy}
                  </button>
                </div>
              </div>
              <textarea readOnly rows={7} value={result.output} />
            </div>
          )}

          <div className="result-breakdown">
            <div className="result-item result-item--strong">
              <span>{text.algorithmLabel}</span>
              <strong>{result.algorithm}</strong>
            </div>
            <div className="result-item">
              <span>{text.inputChars}</span>
              <strong>{numberFormatter.format(inputLength)}</strong>
            </div>
            <div className="result-item">
              <span>{text.outputChars}</span>
              <strong>{numberFormatter.format(outputLength)}</strong>
            </div>
            <div className="result-item">
              <span>{text.lineMode}</span>
              <strong>{lineModeLabel}</strong>
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
            <Hash size={34} strokeWidth={2.1} />
            <h2>{text.emptyTitle}</h2>
            <p>{text.emptyDescription}</p>
          </div>
        </aside>
      )}
    </div>
  );
}
