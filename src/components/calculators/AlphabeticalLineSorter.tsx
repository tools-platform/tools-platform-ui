import { ArrowDownAZ, CheckCircle2, ChevronDown, Clipboard, Info, RotateCcw } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";

type SortDirection = "asc" | "desc";

type SortResult = {
  input: string;
  output: string;
  direction: SortDirection;
  totalLines: number;
};

const copy = {
  es: {
    kicker: "Utilidad",
    title: "Ordenar líneas",
    inputLabel: "Líneas para ordenar",
    placeholder: "Pega una lista, nombres, códigos, correos o valores de Excel...\nbanana\nManzana\npera\naguacate",
    sortBy: "Orden",
    directions: {
      asc: "A-Z",
      desc: "Z-A"
    },
    removeEmptyLines: "Eliminar líneas vacías",
    removeEmptyLinesHelp: "Omite filas vacías del resultado.",
    removeDuplicates: "Eliminar duplicados",
    removeDuplicatesHelp: "Deja cada línea una sola vez en el resultado.",
    hint: "El ordenamiento se hace en tu navegador. Útil para listas, columnas copiadas, correos, códigos o nombres.",
    emptyError: "Pega líneas para ordenarlas.",
    submit: "Ordenar líneas",
    reset: "Restablecer",
    resultTitle: "Lista ordenada",
    result: "Resultado",
    copy: "Copiar",
    copied: "Resultado copiado.",
    copyFailed: "No se pudo copiar automáticamente.",
    totalLines: "Líneas",
    characters: "Caracteres",
    rulesNote: "El resultado no cambia mientras ajustas opciones. Vuelve a ordenar para generar una nueva salida.",
    disclaimer: "Resultado automático para ordenar texto. Revisa listas sensibles antes de usarlas en procesos definitivos.",
    emptyTitle: "La lista ordenada aparecerá aquí",
    emptyDescription: "Pega líneas, elige el orden y genera una versión ordenada en segundos."
  },
  en: {
    kicker: "Utility",
    title: "Sort lines",
    inputLabel: "Lines to sort",
    placeholder: "Paste a list, names, codes, emails, or Excel values...\nbanana\nApple\npear\navocado",
    sortBy: "Order",
    directions: {
      asc: "A-Z",
      desc: "Z-A"
    },
    removeEmptyLines: "Remove empty lines",
    removeEmptyLinesHelp: "Skips blank rows in the result.",
    removeDuplicates: "Remove duplicates",
    removeDuplicatesHelp: "Keeps each line once in the result.",
    hint: "Sorting happens in your browser. Useful for lists, copied columns, emails, codes, or names.",
    emptyError: "Paste lines to sort them.",
    submit: "Sort lines",
    reset: "Reset",
    resultTitle: "Sorted list",
    result: "Result",
    copy: "Copy",
    copied: "Result copied.",
    copyFailed: "We couldn't copy it automatically.",
    totalLines: "Lines",
    characters: "Characters",
    rulesNote: "The result does not change while you adjust options. Sort again to generate a new output.",
    disclaimer: "Automatic text sorting result. Review sensitive lists before using them in final workflows.",
    emptyTitle: "The sorted list will appear here",
    emptyDescription: "Paste lines, choose the order, and generate a sorted version in seconds."
  }
} as const;

function sortLines(
  value: string,
  options: {
    direction: SortDirection;
    removeEmptyLines: boolean;
    removeDuplicates: boolean;
    localeCode: string;
  }
) {
  const collator = new Intl.Collator(options.localeCode, {
    sensitivity: "variant",
    numeric: true
  });
  const seen = new Set<string>();
  const lines: string[] = [];

  value.split(/\r?\n/).forEach((line) => {
    const nextLine = line;

    if (options.removeEmptyLines && nextLine.length === 0) {
      return;
    }

    const key = nextLine;

    if (options.removeDuplicates && seen.has(key)) {
      return;
    }

    seen.add(key);
    lines.push(nextLine);
  });

  const sortedLines = [...lines].sort((left, right) => collator.compare(left, right));

  if (options.direction === "desc") {
    sortedLines.reverse();
  }

  return sortedLines;
}

export function AlphabeticalLineSorter() {
  const { locale } = useLocale();
  const text = copy[locale];
  const localeCode = locale === "es" ? "es-CO" : "en-US";
  const numberFormatter = useMemo(() => new Intl.NumberFormat(localeCode), [localeCode]);
  const [inputText, setInputText] = useState("");
  const [direction, setDirection] = useState<SortDirection>("asc");
  const [removeEmptyLines, setRemoveEmptyLines] = useState(false);
  const [removeDuplicates, setRemoveDuplicates] = useState(false);
  const [result, setResult] = useState<SortResult | null>(null);
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  const resultDirection = result?.direction ?? direction;
  useEffect(() => {
    if (!copyStatus) return;
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

    const sortedLines = sortLines(inputText, {
      direction,
      removeEmptyLines,
      removeDuplicates,
      localeCode
    });
    const output = sortedLines.join("\n");

    setResult({
      input: inputText,
      output,
      direction,
      totalLines: sortedLines.length
    });
    scrollToResultOnMobile();
  }

  function handleReset() {
    setInputText("");
    setDirection("asc");
    setRemoveEmptyLines(false);
    setRemoveDuplicates(false);
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
            <ArrowDownAZ size={20} strokeWidth={2.1} />
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
            placeholder={text.placeholder}
            rows={9}
            value={inputText}
          />
        </label>

        <label className="field field--spaced">
          <span>{text.sortBy}</span>
          <span className="select-control">
            <select className="plain-select" onChange={(event) => setDirection(event.target.value as SortDirection)} value={direction}>
              <option value="asc">{text.directions.asc}</option>
              <option value="desc">{text.directions.desc}</option>
            </select>
            <ChevronDown size={18} strokeWidth={2.1} />
          </span>
        </label>

        <div className="duplicate-options">
          <label className="toggle-field toggle-field--compact">
            <input checked={removeEmptyLines} onChange={(event) => setRemoveEmptyLines(event.target.checked)} type="checkbox" />
            <span>
              <strong>{text.removeEmptyLines}</strong>
              <small>{text.removeEmptyLinesHelp}</small>
            </span>
          </label>

          <label className="toggle-field toggle-field--compact">
            <input checked={removeDuplicates} onChange={(event) => setRemoveDuplicates(event.target.checked)} type="checkbox" />
            <span>
              <strong>{text.removeDuplicates}</strong>
              <small>{text.removeDuplicatesHelp}</small>
            </span>
          </label>
        </div>

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>{text.hint}</span>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-action" type="submit">
          <ArrowDownAZ size={18} />
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
            <strong>{text.directions[resultDirection]}</strong>
            <span>{numberFormatter.format(result.totalLines)} {text.totalLines.toLowerCase()}</span>
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
              <span>{text.sortBy}</span>
              <strong>{text.directions[resultDirection]}</strong>
            </div>
            <ResultStat formatter={numberFormatter} label={text.totalLines} value={result.totalLines} />
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
            <ArrowDownAZ size={34} strokeWidth={2.1} />
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
