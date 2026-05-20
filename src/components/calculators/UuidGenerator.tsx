import { CheckCircle2, ChevronDown, Clipboard, Info, KeyRound, RefreshCw, RotateCcw } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";

type UuidMode = "random" | "seed";
type UuidFormat = "hyphenated" | "compact";
type UuidCase = "lowercase" | "uppercase" | "mixed";

type UuidResult = {
  values: string[];
  mode: UuidMode;
  format: UuidFormat;
  letterCase: UuidCase;
  seedText: string;
};

const copy = {
  es: {
    kicker: "Desarrollo",
    title: "Generador UUID",
    method: "Método",
    random: "Aleatorio",
    seed: "Desde texto",
    seedLabel: "Texto base",
    seedPlaceholder: "mi-proyecto-cliente-123",
    seedHelp: "El texto base se mezcla con aleatoriedad local para crear UUID nuevos en cada intento. Evita datos sensibles como contraseñas, cédulas, tokens o correos privados.",
    quantity: "Cantidad de UUID",
    quantityHelp: "Entre 1 y 100 UUID. Usa cantidades altas solo cuando necesites una lista para pruebas o carga de datos.",
    format: "Formato",
    hyphenated: "Con guiones",
    compact: "Sin guiones",
    compactHelp: "Quita los guiones y deja cada UUID en 32 caracteres.",
    letterCase: "Letras",
    lowercase: "Minúsculas",
    uppercase: "Mayúsculas",
    mixed: "Ambas",
    hint: "Los UUID se generan localmente en tu navegador. No se publican ni se envían a ningún servidor.",
    seedHint: "El texto base se procesa localmente con SHA-256 junto con aleatoriedad del navegador.",
    emptySeedError: "Escribe un texto base para generar UUID desde texto.",
    submitRandom: "Generar UUID",
    submitSeed: "Generar desde texto",
    reset: "Restablecer",
    resultTitle: "UUID generado",
    resultListTitle: "UUID generados",
    copied: "UUID copiado.",
    copiedAll: "Lista copiada.",
    copyFailed: "No se pudo copiar automáticamente.",
    copy: "Copiar",
    copyAll: "Copiar lista",
    main: "Principal",
    alternative: "Alternativo",
    mode: "Método",
    length: "Longitud",
    privacy: "Privacidad",
    local: "Local",
    rulesNoteRandom: "El modo aleatorio usa aleatoriedad criptográfica del navegador para crear UUID v4.",
    rulesNoteSeed: "El modo desde texto usa tu texto base como parte del cálculo, pero cada clic mezcla nueva aleatoriedad local.",
    disclaimer:
      "Un UUID no es una contraseña ni un token secreto. Úsalo como identificador, no como mecanismo de seguridad.",
    emptyTitle: "Tus UUID aparecerán aquí",
    emptyDescription: "Elige si quieres UUID aleatorios o UUID mezclados con un texto base."
  },
  en: {
    kicker: "Development",
    title: "UUID generator",
    method: "Method",
    random: "Random",
    seed: "From text",
    seedLabel: "Base text",
    seedPlaceholder: "my-project-client-123",
    seedHelp: "Base text is mixed with local randomness to create new UUIDs on each attempt. Avoid sensitive data such as passwords, IDs, tokens, or private emails.",
    quantity: "Number of UUIDs",
    quantityHelp: "Between 1 and 100 UUIDs. Use higher quantities only when you need a list for tests or data seeding.",
    format: "Format",
    hyphenated: "With hyphens",
    compact: "Without hyphens",
    compactHelp: "Removes hyphens and leaves each UUID as 32 characters.",
    letterCase: "Letters",
    lowercase: "Lowercase",
    uppercase: "Uppercase",
    mixed: "Mixed",
    hint: "UUIDs are generated locally in your browser. They are not published or sent to any server.",
    seedHint: "Base text is processed locally with SHA-256 together with browser randomness.",
    emptySeedError: "Enter base text to generate UUIDs from text.",
    submitRandom: "Generate UUID",
    submitSeed: "Generate from text",
    reset: "Reset",
    resultTitle: "Generated UUID",
    resultListTitle: "Generated UUIDs",
    copied: "UUID copied.",
    copiedAll: "List copied.",
    copyFailed: "We couldn't copy it automatically.",
    copy: "Copy",
    copyAll: "Copy list",
    main: "Main",
    alternative: "Alternative",
    mode: "Method",
    length: "Length",
    privacy: "Privacy",
    local: "Local",
    rulesNoteRandom: "Random mode uses the browser's cryptographic randomness to create UUID v4 values.",
    rulesNoteSeed: "From text mode uses your base text as part of the calculation, but each click mixes fresh local randomness.",
    disclaimer: "A UUID is not a password or a secret token. Use it as an identifier, not as a security mechanism.",
    emptyTitle: "Your UUIDs will appear here",
    emptyDescription: "Choose random UUIDs or UUIDs mixed with base text."
  }
} as const;

function bytesToUuid(bytes: Uint8Array) {
  const uuidBytes = bytes.slice(0, 16);
  uuidBytes[6] = (uuidBytes[6] & 0x0f) | 0x40;
  uuidBytes[8] = (uuidBytes[8] & 0x3f) | 0x80;

  const hex = Array.from(uuidBytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function createRandomUuid() {
  if (typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return bytesToUuid(bytes);
}

async function createSeedUuid(seedText: string, index: number) {
  const randomBytes = new Uint8Array(16);
  crypto.getRandomValues(randomBytes);
  const randomHex = Array.from(randomBytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  const payload = new TextEncoder().encode(`${seedText}|${index + 1}|${randomHex}`);
  const digest = await crypto.subtle.digest("SHA-256", payload);
  return bytesToUuid(new Uint8Array(digest));
}

function mixUuidCase(value: string) {
  const randomValues = new Uint8Array(value.length);
  crypto.getRandomValues(randomValues);

  return Array.from(value, (character, index) => {
    if (!/[a-f]/i.test(character)) return character;
    return randomValues[index] % 2 === 0 ? character.toLowerCase() : character.toUpperCase();
  }).join("");
}

function applyUuidOptions(value: string, format: UuidFormat, letterCase: UuidCase) {
  const formatted = format === "compact" ? value.replaceAll("-", "") : value;
  if (letterCase === "uppercase") return formatted.toUpperCase();
  if (letterCase === "mixed") return mixUuidCase(formatted);
  return formatted.toLowerCase();
}

async function generateUuids(mode: UuidMode, quantity: number, seedText: string, format: UuidFormat, letterCase: UuidCase) {
  const baseValues =
    mode === "seed"
      ? await Promise.all(Array.from({ length: quantity }, (_, index) => createSeedUuid(seedText, index)))
      : Array.from({ length: quantity }, () => createRandomUuid());

  return baseValues.map((value) => applyUuidOptions(value, format, letterCase));
}

export function UuidGenerator() {
  const { locale } = useLocale();
  const text = copy[locale];
  const [mode, setMode] = useState<UuidMode>("random");
  const [seedText, setSeedText] = useState("");
  const [quantity, setQuantity] = useState(5);
  const [format, setFormat] = useState<UuidFormat>("hyphenated");
  const [letterCase, setLetterCase] = useState<UuidCase>("lowercase");
  const [result, setResult] = useState<UuidResult | null>(null);
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  const numberFormatter = useMemo(() => new Intl.NumberFormat(locale === "es" ? "es-CO" : "en-US"), [locale]);
  const mainUuid = result?.values[0] ?? "";
  const resultTitle = result && result.values.length > 1 ? text.resultListTitle : text.resultTitle;
  const resultModeLabel = result?.mode === "seed" ? text.seed : text.random;
  const resultFormatLabel = result?.format === "compact" ? text.compact : text.hyphenated;
  const resultCaseLabel =
    result?.letterCase === "uppercase" ? text.uppercase : result?.letterCase === "mixed" ? text.mixed : text.lowercase;
  const rulesNote = result?.mode === "seed" ? text.rulesNoteSeed : text.rulesNoteRandom;

  useEffect(() => {
    if (!copyStatus) return;

    const timeout = window.setTimeout(() => setCopyStatus(""), 2200);
    return () => window.clearTimeout(timeout);
  }, [copyStatus]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setCopyStatus("");

    const trimmedSeed = seedText.trim();
    if (mode === "seed" && !trimmedSeed) {
      setResult(null);
      setError(text.emptySeedError);
      return;
    }

    const values = await generateUuids(mode, quantity, trimmedSeed, format, letterCase);
    setResult({ values, mode, format, letterCase, seedText: trimmedSeed });
    scrollToResultOnMobile();
  }

  function handleReset() {
    setMode("random");
    setSeedText("");
    setQuantity(5);
    setFormat("hyphenated");
    setLetterCase("lowercase");
    setResult(null);
    setError("");
    setCopyStatus("");
  }

  async function copyValue(value: string, copiedLabel: string = text.copied) {
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
            <KeyRound size={20} strokeWidth={2.1} />
          </span>
        </div>

        <fieldset className="segmented-field">
          <legend>{text.method}</legend>
          <div className="segmented-control">
            <button className={mode === "random" ? "is-active" : ""} onClick={() => setMode("random")} type="button">
              {text.random}
            </button>
            <button className={mode === "seed" ? "is-active" : ""} onClick={() => setMode("seed")} type="button">
              {text.seed}
            </button>
          </div>
        </fieldset>

        {mode === "seed" ? (
          <label className="field field--spaced">
            <span>
              {text.seedLabel} <span className="required-mark">*</span>
            </span>
            <input
              onChange={(event) => {
                setSeedText(event.target.value);
                setCopyStatus("");
              }}
              placeholder={text.seedPlaceholder}
              value={seedText}
            />
            <small>{text.seedHelp}</small>
          </label>
        ) : null}

        <label className="field field--spaced">
          <span>{text.quantity}: {quantity}</span>
          <input className="range-input" max={100} min={1} onChange={(event) => setQuantity(Number(event.target.value))} type="range" value={quantity} />
          <small>{text.quantityHelp}</small>
        </label>

        <label className="field field--spaced">
          <span>{text.letterCase}</span>
          <div className="select-control">
            <select className="plain-select" onChange={(event) => setLetterCase(event.target.value as UuidCase)} value={letterCase}>
              <option value="lowercase">{text.lowercase}</option>
              <option value="uppercase">{text.uppercase}</option>
              <option value="mixed">{text.mixed}</option>
            </select>
            <ChevronDown size={18} strokeWidth={2.1} />
          </div>
        </label>

        <div className="duplicate-options field--spaced">
          <label className="toggle-field toggle-field--compact">
            <input checked={format === "compact"} onChange={(event) => setFormat(event.target.checked ? "compact" : "hyphenated")} type="checkbox" />
            <span>
              <strong>{text.compact}</strong>
              <small>{text.compactHelp}</small>
            </span>
          </label>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>{text.hint}</span>
        </div>

        <button className="primary-action" type="submit">
          <RefreshCw size={18} />
          {mode === "seed" ? text.submitSeed : text.submitRandom}
        </button>

        <button className="secondary-action" onClick={handleReset} type="button">
          <RotateCcw size={18} />
          {text.reset}
        </button>
      </form>

      {result ? (
        <aside className="result-panel" ref={resultRef}>
          <div className="result-panel__hero result-panel__hero--compact">
            <p>{resultTitle}</p>
            <strong className="password-display">{mainUuid}</strong>
            <span>
              {numberFormatter.format(result.values.length)} UUID · {resultModeLabel}
            </span>
          </div>

          <div className="case-result-list uuid-result-list">
            {copyStatus ? (
              <div className={`duplicate-copy-toast${copyStatus === text.copyFailed ? " duplicate-copy-toast--error" : ""}`} role="status">
                <CheckCircle2 size={18} strokeWidth={2.1} />
                <span>{copyStatus}</span>
              </div>
            ) : null}

            <div className="text-result uuid-text-result">
              <div className="text-result__header">
                <span>{text.resultListTitle}</span>
                <div className="text-result__actions">
                  <button onClick={() => copyValue(result.values.join("\n"), text.copiedAll)} type="button">
                    <Clipboard size={16} strokeWidth={2.1} />
                    {text.copyAll}
                  </button>
                </div>
              </div>
              <textarea readOnly rows={Math.min(Math.max(result.values.length, 5), 12)} value={result.values.join("\n")} />
            </div>

            {result.values.slice(0, 5).map((value, index) => (
              <div className="case-result-item" key={`${value}-${index}`}>
                <div>
                  <span>{index === 0 ? text.main : `${text.alternative} ${index + 1}`}</span>
                  <small>{resultFormatLabel}</small>
                  <strong>{value}</strong>
                </div>
                <button onClick={() => copyValue(value)} type="button">
                  <Clipboard size={16} strokeWidth={2.1} />
                  {text.copy}
                </button>
              </div>
            ))}
          </div>

          <div className="result-breakdown">
            <div className="result-item result-item--strong">
              <span>{text.mode}</span>
              <strong>{resultModeLabel}</strong>
            </div>
            <div className="result-item">
              <span>{text.quantity}</span>
              <strong>{numberFormatter.format(result.values.length)}</strong>
            </div>
            <div className="result-item">
              <span>{text.format}</span>
              <strong>{resultFormatLabel}</strong>
            </div>
            <div className="result-item">
              <span>{text.letterCase}</span>
              <strong>{resultCaseLabel}</strong>
            </div>
            <div className="result-item">
              <span>{text.length}</span>
              <strong>{mainUuid.length}</strong>
            </div>
            <div className="result-item result-item--strong">
              <span>{text.privacy}</span>
              <strong>{text.local}</strong>
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
            <KeyRound size={34} strokeWidth={2.1} />
            <h2>{text.emptyTitle}</h2>
            <p>{text.emptyDescription}</p>
          </div>
        </aside>
      )}
    </div>
  );
}
