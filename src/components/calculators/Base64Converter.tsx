import { Binary, CheckCircle2, Clipboard, Download, Info, Repeat2, RotateCcw } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";

type Base64Mode = "decode" | "encode";

type Base64Result = {
  input: string;
  output: string;
  mode: Base64Mode;
  eachLine: boolean;
  urlSafe: boolean;
};

const copy = {
  es: {
    kicker: "Desarrollo",
    title: "Base64",
    inputLabel: "Texto de entrada",
    inputPlaceholder: "Pega texto normal o Base64...",
    operation: "Operación",
    decode: "Decodificar",
    encode: "Codificar",
    urlSafe: "Formato URL-safe",
    urlSafeHelp: "Usa - y _ para URLs, tokens o JWT. Al codificar, omite el relleno =.",
    eachLine: "Procesar cada línea por separado",
    eachLineHelp: "Útil cuando pegaste varias entradas independientes.",
    hint: "La conversión se ejecuta en tu navegador. No enviamos el texto a ningún servidor.",
    emptyError: "Pega un texto para codificar o decodificar.",
    decodeError: "El texto no parece ser Base64 válido para decodificar.",
    submitDecode: "Decodificar Base64",
    submitEncode: "Codificar a Base64",
    reset: "Restablecer",
    result: "Resultado",
    resultTitleDecode: "Texto decodificado",
    resultTitleEncode: "Texto codificado",
    copy: "Copiar resultado",
    download: "Descargar TXT",
    swap: "Intercambiar",
    copied: "Resultado copiado.",
    copyFailed: "No se pudo copiar automáticamente.",
    inputChars: "Caracteres entrada",
    outputChars: "Caracteres salida",
    mode: "Modo",
    privacy: "Privacidad",
    local: "Local",
    format: "Formato",
    standardFormat: "Normal",
    urlSafeFormat: "URL-safe",
    lineMode: "Líneas",
    lineModeOn: "Separadas",
    lineModeOff: "Todo el texto",
    rulesNoteDecode: "Decodificamos Base64 usando UTF-8 y mostramos el resultado como texto.",
    rulesNoteEncode: "Codificamos el texto con UTF-8 para producir Base64 compatible con APIs y herramientas web.",
    disclaimer:
      "Resultado automático para texto. Si necesitas decodificar archivos binarios grandes, usa una herramienta especializada de archivos.",
    emptyTitle: "El resultado Base64 aparecerá aquí",
    emptyDescription: "Elige codificar o decodificar, pega el texto y ejecuta la conversión."
  },
  en: {
    kicker: "Development",
    title: "Base64",
    inputLabel: "Input text",
    inputPlaceholder: "Paste plain text or Base64...",
    operation: "Operation",
    decode: "Decode",
    encode: "Encode",
    urlSafe: "URL-safe format",
    urlSafeHelp: "Uses - and _ for URLs, tokens, or JWTs. When encoding, it removes = padding.",
    eachLine: "Process each line separately",
    eachLineHelp: "Useful when you pasted multiple independent entries.",
    hint: "The conversion runs in your browser. We do not send the text to any server.",
    emptyError: "Paste text to encode or decode.",
    decodeError: "The text does not look like valid Base64 to decode.",
    submitDecode: "Decode Base64",
    submitEncode: "Encode to Base64",
    reset: "Reset",
    result: "Result",
    resultTitleDecode: "Decoded text",
    resultTitleEncode: "Encoded text",
    copy: "Copy result",
    download: "Download TXT",
    swap: "Swap",
    copied: "Result copied.",
    copyFailed: "We couldn't copy it automatically.",
    inputChars: "Input characters",
    outputChars: "Output characters",
    mode: "Mode",
    privacy: "Privacy",
    local: "Local",
    format: "Format",
    standardFormat: "Standard",
    urlSafeFormat: "URL-safe",
    lineMode: "Lines",
    lineModeOn: "Separate",
    lineModeOff: "Whole text",
    rulesNoteDecode: "We decode Base64 using UTF-8 and show the result as text.",
    rulesNoteEncode: "We encode text with UTF-8 to produce Base64 compatible with APIs and web tools.",
    disclaimer:
      "Automatic result for text. If you need to decode large binary files, use a dedicated file tool.",
    emptyTitle: "Your Base64 result will appear here",
    emptyDescription: "Choose encode or decode, paste the text, and run the conversion."
  }
} as const;

function bytesToBase64(bytes: Uint8Array) {
  let binary = "";
  const chunkSize = 0x8000;

  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.slice(index, index + chunkSize));
  }

  return btoa(binary);
}

function base64ToBytes(value: string) {
  const normalized = value
    .trim()
    .replace(/\s+/g, "")
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  const binary = atob(`${normalized}${padding}`);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function encodeBase64(value: string, urlSafe: boolean) {
  const encoded = bytesToBase64(new TextEncoder().encode(value));

  if (!urlSafe) {
    return encoded;
  }

  return encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeBase64(value: string) {
  return new TextDecoder("utf-8", { fatal: true }).decode(base64ToBytes(value));
}

function processBase64(value: string, mode: Base64Mode, eachLine: boolean, urlSafe: boolean) {
  const transform = mode === "encode" ? (line: string) => encodeBase64(line, urlSafe) : decodeBase64;

  if (eachLine) {
    return value.split(/\r?\n/).map((line) => (line.length > 0 ? transform(line) : "")).join("\n");
  }

  return transform(value);
}

function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function Base64Converter() {
  const { locale } = useLocale();
  const text = copy[locale];
  const [inputText, setInputText] = useState("");
  const [mode, setMode] = useState<Base64Mode>("decode");
  const [eachLine, setEachLine] = useState(false);
  const [urlSafe, setUrlSafe] = useState(false);
  const [result, setResult] = useState<Base64Result | null>(null);
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  const resultTitle = result?.mode === "encode" ? text.resultTitleEncode : text.resultTitleDecode;
  const resultModeLabel = result?.mode === "encode" ? text.encode : text.decode;
  const rulesNote = result?.mode === "encode" ? text.rulesNoteEncode : text.rulesNoteDecode;
  const filename = result?.mode === "encode" ? "base64-encoded.txt" : "base64-decoded.txt";
  const inputLength = useMemo(() => result?.input.length ?? 0, [result]);
  const outputLength = useMemo(() => result?.output.length ?? 0, [result]);

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

    try {
      const output = processBase64(inputText, mode, eachLine, urlSafe);
      setResult({
        input: inputText,
        output,
        mode,
        eachLine,
        urlSafe
      });
      scrollToResultOnMobile();
    } catch {
      setResult(null);
      setError(text.decodeError);
    }
  }

  function handleReset() {
    setInputText("");
    setMode("decode");
    setEachLine(false);
    setUrlSafe(false);
    setResult(null);
    setError("");
    setCopyStatus("");
  }

  function handleSwap() {
    if (!result) return;
    setInputText(result.output);
    setMode(result.mode === "encode" ? "decode" : "encode");
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
            <Binary size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span>{text.inputLabel} <span className="required-mark">*</span></span>
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

        <fieldset className="segmented-field">
          <legend>{text.operation}</legend>
          <div className="segmented-control">
            <button className={mode === "decode" ? "is-active" : ""} onClick={() => setMode("decode")} type="button">
              {text.decode}
            </button>
            <button className={mode === "encode" ? "is-active" : ""} onClick={() => setMode("encode")} type="button">
              {text.encode}
            </button>
          </div>
        </fieldset>

        <div className="duplicate-options">
          <label className="toggle-field toggle-field--compact">
            <input checked={eachLine} onChange={(event) => setEachLine(event.target.checked)} type="checkbox" />
            <span>
              <strong>{text.eachLine}</strong>
              <small>{text.eachLineHelp}</small>
            </span>
          </label>

          <label className="toggle-field toggle-field--compact">
            <input checked={urlSafe} onChange={(event) => setUrlSafe(event.target.checked)} type="checkbox" />
            <span>
              <strong>{text.urlSafe}</strong>
              <small>{text.urlSafeHelp}</small>
            </span>
          </label>
        </div>

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>{text.hint}</span>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        {result ? (
          <button className="swap-action" onClick={handleSwap} type="button">
            <Repeat2 size={18} />
            {text.swap}
          </button>
        ) : null}

        <button className="primary-action" type="submit">
          <Binary size={18} />
          {mode === "decode" ? text.submitDecode : text.submitEncode}
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
            <span>{outputLength} {text.outputChars.toLowerCase()}</span>
          </div>

          <div className="text-result">
            <div className="text-result__header">
              <span>{text.result}</span>
              <div className="text-result__actions">
                <button onClick={handleCopy} type="button">
                  <Clipboard size={16} strokeWidth={2.1} />
                  {text.copy}
                </button>
                <button onClick={() => downloadTextFile(filename, result.output)} type="button">
                  <Download size={16} strokeWidth={2.1} />
                  {text.download}
                </button>
              </div>
            </div>
            <textarea readOnly rows={10} value={result.output} />
          </div>

          <div className="result-breakdown">
            <div className="result-item result-item--strong">
              <span>{text.mode}</span>
              <strong>{resultModeLabel}</strong>
            </div>
            <div className="result-item">
              <span>{text.inputChars}</span>
              <strong>{inputLength}</strong>
            </div>
            <div className="result-item">
              <span>{text.outputChars}</span>
              <strong>{outputLength}</strong>
            </div>
            <div className="result-item">
              <span>{text.lineMode}</span>
              <strong>{result.eachLine ? text.lineModeOn : text.lineModeOff}</strong>
            </div>
            <div className="result-item result-item--wide">
              <span>{text.format}</span>
              <strong>{result.urlSafe ? text.urlSafeFormat : text.standardFormat}</strong>
            </div>
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
            <Binary size={34} strokeWidth={2.1} />
            <h2>{text.emptyTitle}</h2>
            <p>{text.emptyDescription}</p>
          </div>
        </aside>
      )}
    </div>
  );
}
