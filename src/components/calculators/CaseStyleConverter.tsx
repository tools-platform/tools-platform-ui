import { CheckCircle2, Clipboard, Code2, Info, RotateCcw, Wand2 } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";

type CaseResult = {
  id: string;
  label: string;
  description: string;
  value: string;
};

const sampleText = "nombre del usuario";

function normalizeWords(value: string) {
  const cleanValue = value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/['’]/g, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2");

  return cleanValue.match(/[\p{L}\p{N}]+/gu)?.map((word) => word.toLocaleLowerCase("es-CO")) ?? [];
}

function capitalizeWord(value: string) {
  return value.charAt(0).toLocaleUpperCase("es-CO") + value.slice(1);
}

function buildCaseResults(value: string): CaseResult[] {
  const words = normalizeWords(value);
  const pascalWords = words.map(capitalizeWord);

  const camelCase = words.length > 0 ? `${words[0]}${pascalWords.slice(1).join("")}` : "";
  const pascalCase = pascalWords.join("");
  const snakeCase = words.join("_");
  const screamingSnakeCase = snakeCase.toLocaleUpperCase("es-CO");
  const kebabCase = words.join("-");
  const trainCase = pascalWords.join("-");
  const dotCase = words.join(".");
  const pathCase = words.join("/");
  const flatCase = words.join("");
  const upperFlatCase = flatCase.toLocaleUpperCase("es-CO");

  return [
    {
      id: "camel",
      label: "camelCase",
      description: "Común en variables y funciones de JavaScript.",
      value: camelCase
    },
    {
      id: "pascal",
      label: "PascalCase",
      description: "Común en clases, componentes y tipos.",
      value: pascalCase
    },
    {
      id: "snake",
      label: "snake_case",
      description: "Usado en Python, Ruby, SQL y APIs.",
      value: snakeCase
    },
    {
      id: "screaming-snake",
      label: "SCREAMING_SNAKE_CASE",
      description: "Usado normalmente para constantes.",
      value: screamingSnakeCase
    },
    {
      id: "kebab",
      label: "kebab-case",
      description: "Útil para URLs, archivos, clases CSS y slugs.",
      value: kebabCase
    },
    {
      id: "train",
      label: "Train-Case",
      description: "Variante con guiones y cada palabra capitalizada.",
      value: trainCase
    },
    {
      id: "dot",
      label: "dot.case",
      description: "Útil para keys, rutas lógicas y configuraciones.",
      value: dotCase
    },
    {
      id: "path",
      label: "path/case",
      description: "Útil para rutas o segmentos de archivo.",
      value: pathCase
    },
    {
      id: "flat",
      label: "flatcase",
      description: "Todo junto en minúsculas.",
      value: flatCase
    },
    {
      id: "upper-flat",
      label: "UPPERFLATCASE",
      description: "Todo junto en mayúsculas.",
      value: upperFlatCase
    }
  ];
}

function countWords(value: string) {
  return normalizeWords(value).length;
}

export function CaseStyleConverter() {
  const [inputText, setInputText] = useState(sampleText);
  const [results, setResults] = useState<CaseResult[] | null>(null);
  const [appliedText, setAppliedText] = useState("");
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState("");
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setCopiedId("");

    if (!inputText.trim()) {
      setError("Escribe una frase, nombre de variable o texto para convertir.");
      setResults(null);
      return;
    }

    const nextResults = buildCaseResults(inputText);

    if (nextResults.every((result) => result.value.length === 0)) {
      setError("El texto debe incluir al menos una letra o número.");
      setResults(null);
      return;
    }

    setAppliedText(inputText);
    setResults(nextResults);
    scrollToResultOnMobile();
  }

  function handleReset() {
    setInputText(sampleText);
    setResults(null);
    setAppliedText("");
    setError("");
    setCopiedId("");
  }

  async function handleCopy(result: CaseResult) {
    try {
      await navigator.clipboard.writeText(result.value);
      setCopiedId(result.id);
    } catch {
      setCopiedId("");
    }
  }

  return (
    <div className="calculator-layout">
      <form className="calculator-card" onSubmit={handleSubmit}>
        <div className="calculator-card__header">
          <div>
            <p className="section__kicker">Desarrollo</p>
            <h2>Formatos para código</h2>
          </div>
          <span>
            <Code2 size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span>
            Texto base <span className="required-mark">*</span>
          </span>
          <textarea
            onChange={(event) => {
              setInputText(event.target.value);
              setCopiedId("");
            }}
            placeholder="Pega una frase, nombre de variable o título..."
            rows={8}
            value={inputText}
          />
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="rules-note rules-note--form">
          <CheckCircle2 size={18} strokeWidth={2.1} />
          <p>
            Al convertir obtendrás todos los formatos del texto, incluyendo camelCase, snake_case, kebab-case y otros.
          </p>
        </div>

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>Quitamos tildes y símbolos para generar nombres más compatibles con código, rutas y archivos.</span>
        </div>

        <button className="primary-action" type="submit">
          <Wand2 size={18} />
          Convertir estilos
        </button>

        <button className="secondary-action" onClick={handleReset} type="button">
          <RotateCcw size={18} />
          Restablecer
        </button>
      </form>

      {results ? (
        <aside className="result-panel" ref={resultRef}>
          <div className="result-panel__hero result-panel__hero--compact">
            <p>Formatos generados</p>
            <strong>{results.length} estilos</strong>
            <span>{countWords(appliedText)} palabras detectadas</span>
          </div>

          <div className="case-result-list">
            {results.map((result) => (
              <div className="case-result-item" key={result.id}>
                <div>
                  <span>{result.label}</span>
                  <small>{result.description}</small>
                  <strong>{result.value}</strong>
                </div>
                <button onClick={() => handleCopy(result)} type="button">
                  <Clipboard size={16} strokeWidth={2.1} />
                  {copiedId === result.id ? "Copiado" : "Copiar"}
                </button>
              </div>
            ))}
          </div>

          <div className="rules-note">
            <CheckCircle2 size={18} strokeWidth={2.1} />
            <p>Conversión local para nombres de variables, clases, archivos, rutas, slugs y constantes.</p>
          </div>

          <p className="disclaimer">
            Resultado automático para apoyo en desarrollo. Valida la convención exacta de tu lenguaje, framework o
            equipo antes de usarlo en producción.
          </p>
        </aside>
      ) : (
        <aside className="result-panel result-panel--empty" ref={resultRef}>
          <div className="result-empty">
            <Code2 size={34} strokeWidth={2.1} />
            <h2>Formatos de código</h2>
            <p>Convierte una frase a varios estilos usados en programación.</p>
          </div>
        </aside>
      )}
    </div>
  );
}
