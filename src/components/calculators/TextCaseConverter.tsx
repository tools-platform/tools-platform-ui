import { CheckCircle2, Clipboard, Info, LetterText, RotateCcw, Wand2 } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";

type CaseMode = "uppercase" | "lowercase" | "capitalized" | "sentence";

const caseModes: Array<{ value: CaseMode; label: string; description: string; example: string }> = [
  {
    value: "uppercase",
    label: "Mayúsculas",
    description: "Convierte todo el texto a letras grandes.",
    example: "HOLA MUNDO"
  },
  {
    value: "lowercase",
    label: "Minúsculas",
    description: "Convierte todo el texto a letras pequeñas.",
    example: "hola mundo"
  },
  {
    value: "capitalized",
    label: "Capitalizado",
    description: "Pone en mayúscula la primera letra de cada palabra.",
    example: "Hola Mundo"
  },
  {
    value: "sentence",
    label: "Tipo oración",
    description: "Pone en mayúscula el inicio de cada frase.",
    example: "Hola mundo."
  }
];

function capitalizeWords(value: string) {
  const lowerText = value.toLocaleLowerCase("es-CO");

  return lowerText.replace(/(^|[\s¿¡([{'"“‘-])(\p{L})/gu, (_, prefix: string, letter: string) => {
    return `${prefix}${letter.toLocaleUpperCase("es-CO")}`;
  });
}

function sentenceCase(value: string) {
  const lowerText = value.toLocaleLowerCase("es-CO");

  const formattedText = lowerText.replace(/(^|[.!?]\s+)(\p{L})/gu, (_, prefix: string, letter: string) => {
    return `${prefix}${letter.toLocaleUpperCase("es-CO")}`;
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

function transformText(value: string, mode: CaseMode) {
  if (mode === "uppercase") {
    return value.toLocaleUpperCase("es-CO");
  }

  if (mode === "lowercase") {
    return value.toLocaleLowerCase("es-CO");
  }

  if (mode === "capitalized") {
    return capitalizeWords(value);
  }

  return sentenceCase(value);
}

function countWords(value: string) {
  const words = value.trim().match(/\S+/g);
  return words?.length ?? 0;
}

export function TextCaseConverter() {
  const [inputText, setInputText] = useState("");
  const [mode, setMode] = useState<CaseMode>("uppercase");
  const [appliedMode, setAppliedMode] = useState<CaseMode>("uppercase");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  const resultMode = useMemo(() => {
    return caseModes.find((caseMode) => caseMode.value === appliedMode) ?? caseModes[0];
  }, [appliedMode]);

  const characterCount = result.length;
  const wordCount = countWords(result);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setCopyStatus("");

    if (!inputText.trim()) {
      setError("Escribe o pega un texto para transformarlo.");
      setResult("");
      return;
    }

    setResult(transformText(inputText, mode));
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
    if (!result) {
      return;
    }

    try {
      await navigator.clipboard.writeText(result);
      setCopyStatus("Texto copiado.");
    } catch {
      setCopyStatus("No se pudo copiar automáticamente.");
    }
  }

  return (
    <div className="calculator-layout">
      <form className="calculator-card" onSubmit={handleSubmit}>
        <div className="calculator-card__header">
          <div>
            <p className="section__kicker">Convertidor</p>
            <h2>Formato de texto</h2>
          </div>
          <span>
            <LetterText size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span>
            Texto original <span className="required-mark">*</span>
          </span>
          <textarea
            className="text-tool-textarea"
            onChange={(event) => {
              setInputText(event.target.value);
              setCopyStatus("");
            }}
            placeholder="Pega aquí el texto que quieres convertir..."
            rows={8}
            value={inputText}
          />
        </label>

        <div className="field field--spaced">
          <span>Formato</span>
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
          <span>El texto se transforma en tu navegador. No se envía a ningún servidor.</span>
        </div>

        <button className="primary-action" type="submit">
          <Wand2 size={18} />
          Transformar texto
        </button>

        <button className="secondary-action" onClick={handleReset} type="button">
          <RotateCcw size={18} />
          Restablecer
        </button>
      </form>

      {result ? (
        <aside className="result-panel" ref={resultRef}>
          <div className="result-panel__hero result-panel__hero--compact">
            <p>Texto transformado</p>
            <strong>{resultMode.label}</strong>
            <span>{wordCount} palabras · {characterCount} caracteres</span>
          </div>

          <div className="text-result">
            <div className="text-result__header">
              <span>Resultado</span>
              <button onClick={handleCopy} type="button">
                <Clipboard size={16} strokeWidth={2.1} />
                Copiar
              </button>
            </div>
            <textarea readOnly rows={10} value={result} />
            {copyStatus ? <p>{copyStatus}</p> : null}
          </div>

          <div className="result-breakdown">
            <div className="result-item">
              <span>Formato aplicado</span>
              <strong>{resultMode.label}</strong>
            </div>
            <div className="result-item">
              <span>Palabras</span>
              <strong>{wordCount}</strong>
            </div>
            <div className="result-item">
              <span>Caracteres</span>
              <strong>{characterCount}</strong>
            </div>
            <div className="result-item result-item--strong">
              <span>Privacidad</span>
              <strong>Local</strong>
            </div>
          </div>

          <div className="rules-note">
            <CheckCircle2 size={18} strokeWidth={2.1} />
            <p>Conversión aplicada directamente en el navegador para tareas rápidas de texto.</p>
          </div>

          <p className="disclaimer">
            Resultado automático de formato. Revisa nombres propios, siglas o estilos editoriales si el texto se usará
            de forma profesional.
          </p>
        </aside>
      ) : (
        <aside className="result-panel result-panel--empty" ref={resultRef}>
          <div className="result-empty">
            <LetterText size={34} strokeWidth={2.1} />
            <h2>Resultado de texto</h2>
            <p>Elige un formato y transforma tu texto en segundos.</p>
          </div>
        </aside>
      )}
    </div>
  );
}
