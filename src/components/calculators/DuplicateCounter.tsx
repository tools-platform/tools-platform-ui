import { CheckCircle2, ChevronDown, Clipboard, Download, Info, ListChecks, MoreHorizontal, RotateCcw, SearchCheck } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";

type SortMode = "count" | "value" | "original";
type DisplayMode = "all" | "duplicates" | "unique";

type DuplicateEntry = {
  value: string;
  count: number;
  firstIndex: number;
};

type DuplicateResult = {
  totalInputLines: number;
  countedLines: number;
  emptyLines: number;
  uniqueValues: number;
  duplicateValues: number;
  duplicateLines: number;
  displayMode: DisplayMode;
  sortMode: SortMode;
  entries: DuplicateEntry[];
};

const copy = {
  es: {
    kicker: "Utilidad",
    title: "Lista para revisar",
    inputLabel: "Valores de entrada",
    placeholder: "Pega una lista, correos, IDs, códigos, URLs o una columna copiada de Excel...",
    options: "Opciones",
    ignoreCase: "Ignorar mayúsculas/minúsculas",
    ignoreCaseHelp: "Cuenta Hola, hola y HOLA como el mismo valor.",
    trimSpaces: "Quitar espacios al inicio y final",
    trimSpacesHelp: "Limpia espacios accidentales al copiar datos.",
    omitEmpty: "Omitir líneas vacías",
    omitEmptyHelp: "No cuenta filas vacías como un valor.",
    displayMode: "Mostrar",
    displayModes: {
      all: "Todos",
      duplicates: "Solo duplicados",
      unique: "Solo únicos"
    },
    sortBy: "Ordenar por",
    sortModes: {
      count: "Más repetidos",
      value: "A-Z",
      original: "Orden original"
    },
    emptyError: "Pega al menos una línea o valor para contar duplicados.",
    noCountableLines: "No hay líneas válidas para contar con las opciones actuales.",
    hint: "El conteo se hace en tu navegador. Sirve para listas, columnas de Excel, correos, códigos o URLs.",
    submit: "Contar duplicados",
    reset: "Restablecer",
    resultTitle: "Resultado de duplicados",
    noDuplicates: "Sin duplicados",
    duplicateCount: "Valores duplicados",
    totalLines: "Líneas totales",
    countedLines: "Líneas contadas",
    uniqueValues: "Valores únicos",
    duplicateLines: "Repeticiones extra",
    emptyLines: "Líneas vacías",
    mostRepeated: "Más repetido",
    tableTitle: "Conteo por valor",
    valueColumn: "Valor",
    countColumn: "Conteo",
    firstSeenColumn: "Primera aparición",
    distinctTitle: "Lista distinct",
    filteredEmpty: "No hay valores para mostrar con este filtro.",
    copyTable: "Copiar tabla",
    copyDistinct: "Copiar distinct",
    copyDuplicates: "Copiar duplicados",
    downloadCsv: "Descargar CSV",
    moreOptions: "Más opciones",
    copied: "Copiado.",
    copyFailed: "No se pudo copiar automáticamente.",
    rulesNote: "Usamos cada línea como un valor. Puedes ignorar mayúsculas, limpiar espacios y filtrar solo duplicados o únicos.",
    disclaimer: "Resultado automático para limpieza de listas. Revisa el criterio de comparación antes de usarlo en procesos definitivos.",
    emptyTitle: "Los duplicados aparecerán aquí",
    emptyDescription: "Pega una lista y obtén conteos, valores únicos y duplicados en segundos."
  },
  en: {
    kicker: "Utility",
    title: "List to analyze",
    inputLabel: "Input values",
    placeholder: "Paste a list, emails, IDs, codes, URLs, or a column copied from Excel...",
    options: "Options",
    ignoreCase: "Ignore uppercase/lowercase",
    ignoreCaseHelp: "Counts Hello, hello, and HELLO as the same value.",
    trimSpaces: "Trim leading and trailing spaces",
    trimSpacesHelp: "Cleans accidental spaces from copied data.",
    omitEmpty: "Skip empty lines",
    omitEmptyHelp: "Does not count blank rows as a value.",
    displayMode: "Show",
    displayModes: {
      all: "All",
      duplicates: "Duplicates only",
      unique: "Unique only"
    },
    sortBy: "Sort by",
    sortModes: {
      count: "Most repeated",
      value: "A-Z",
      original: "Original order"
    },
    emptyError: "Paste at least one line or value to count duplicates.",
    noCountableLines: "There are no valid lines to count with the current options.",
    hint: "Counting happens in your browser. Use it for lists, Excel columns, emails, codes, or URLs.",
    submit: "Count duplicates",
    reset: "Reset",
    resultTitle: "Duplicate results",
    noDuplicates: "No duplicates",
    duplicateCount: "Duplicate values",
    totalLines: "Total lines",
    countedLines: "Counted lines",
    uniqueValues: "Unique values",
    duplicateLines: "Extra repetitions",
    emptyLines: "Empty lines",
    mostRepeated: "Most repeated",
    tableTitle: "Count by value",
    valueColumn: "Value",
    countColumn: "Count",
    firstSeenColumn: "First occurrence",
    distinctTitle: "Distinct list",
    filteredEmpty: "There are no values to show with this filter.",
    copyTable: "Copy table",
    copyDistinct: "Copy distinct",
    copyDuplicates: "Copy duplicates",
    downloadCsv: "Download CSV",
    moreOptions: "More options",
    copied: "Copied.",
    copyFailed: "We couldn't copy it automatically.",
    rulesNote: "We treat each line as one value. You can ignore case, trim spaces, and filter only duplicates or unique values.",
    disclaimer: "Automatic result for list cleanup. Review the comparison rules before using it in final workflows.",
    emptyTitle: "Duplicates will appear here",
    emptyDescription: "Paste a list and get counts, unique values, and duplicates in seconds."
  }
} as const;

function escapeCsv(value: string) {
  if (!/[",\n\r]/.test(value)) return value;
  return `"${value.replaceAll('"', '""')}"`;
}

function countDuplicates(input: string, ignoreCase: boolean, trimSpaces: boolean, omitEmpty: boolean, localeCode: string): DuplicateResult {
  const rawLines = input.split(/\r?\n/);
  const entries = new Map<string, DuplicateEntry>();
  let emptyLines = 0;
  let countedLines = 0;

  rawLines.forEach((line, index) => {
    const value = trimSpaces ? line.trim() : line;

    if (value.length === 0) {
      emptyLines += 1;
      if (omitEmpty) return;
    }

    const key = ignoreCase ? value.toLocaleLowerCase(localeCode) : value;
    const current = entries.get(key);
    countedLines += 1;

    if (current) {
      current.count += 1;
      return;
    }

    entries.set(key, {
      value,
      count: 1,
      firstIndex: index + 1
    });
  });

  const entryList = Array.from(entries.values());
  const duplicateValues = entryList.filter((entry) => entry.count > 1).length;

  return {
    totalInputLines: rawLines.length,
    countedLines,
    emptyLines,
    uniqueValues: entryList.length,
    duplicateValues,
    duplicateLines: entryList.reduce((total, entry) => total + Math.max(entry.count - 1, 0), 0),
    displayMode: "all",
    sortMode: "count",
    entries: entryList
  };
}

function sortEntries(entries: DuplicateEntry[], sortMode: SortMode, localeCode: string) {
  const nextEntries = [...entries];

  if (sortMode === "count") {
    return nextEntries.sort((a, b) => b.count - a.count || a.firstIndex - b.firstIndex);
  }

  if (sortMode === "value") {
    return nextEntries.sort((a, b) => a.value.localeCompare(b.value, localeCode));
  }

  return nextEntries.sort((a, b) => a.firstIndex - b.firstIndex);
}

function filterEntries(entries: DuplicateEntry[], displayMode: DisplayMode) {
  if (displayMode === "duplicates") return entries.filter((entry) => entry.count > 1);
  if (displayMode === "unique") return entries.filter((entry) => entry.count === 1);
  return entries;
}

function buildTableText(entries: DuplicateEntry[], labels: { countColumn: string; valueColumn: string; firstSeenColumn: string }) {
  return [
    `${labels.valueColumn}\t${labels.countColumn}\t${labels.firstSeenColumn}`,
    ...entries.map((entry) => `${entry.value}\t${entry.count}\t${entry.firstIndex}`)
  ].join("\n");
}

function buildCsv(entries: DuplicateEntry[], labels: { countColumn: string; valueColumn: string; firstSeenColumn: string }) {
  return `\uFEFF${[
    [labels.valueColumn, labels.countColumn, labels.firstSeenColumn].map(escapeCsv).join(","),
    ...entries.map((entry) => [entry.value, entry.count.toString(), entry.firstIndex.toString()].map(escapeCsv).join(","))
  ].join("\n")}`;
}

function downloadTextFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function DuplicateCounter() {
  const { locale } = useLocale();
  const text = copy[locale];
  const localeCode = locale === "es" ? "es-CO" : "en-US";
  const numberFormatter = useMemo(() => new Intl.NumberFormat(localeCode), [localeCode]);
  const [inputText, setInputText] = useState("");
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [trimSpaces, setTrimSpaces] = useState(true);
  const [omitEmpty, setOmitEmpty] = useState(true);
  const [displayMode, setDisplayMode] = useState<DisplayMode>("all");
  const [sortMode, setSortMode] = useState<SortMode>("count");
  const [result, setResult] = useState<DuplicateResult | null>(null);
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  const sortedEntries = useMemo(() => (result ? sortEntries(result.entries, result.sortMode, localeCode) : []), [localeCode, result]);
  const filteredEntries = useMemo(() => (result ? filterEntries(sortedEntries, result.displayMode) : []), [result, sortedEntries]);
  const distinctValues = useMemo(() => sortEntries(result?.entries ?? [], "original", localeCode).map((entry) => entry.value), [localeCode, result]);
  const duplicateValues = useMemo(() => sortedEntries.filter((entry) => entry.count > 1).map((entry) => entry.value), [sortedEntries]);
  const mostRepeated = sortedEntries[0];

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
      setError(text.emptyError);
      setResult(null);
      return;
    }

    const nextResult = countDuplicates(inputText, ignoreCase, trimSpaces, omitEmpty, localeCode);

    if (nextResult.countedLines === 0) {
      setError(text.noCountableLines);
      setResult(null);
      return;
    }

    setResult({
      ...nextResult,
      displayMode,
      sortMode
    });
    scrollToResultOnMobile();
  }

  function handleReset() {
    setInputText("");
    setIgnoreCase(false);
    setTrimSpaces(true);
    setOmitEmpty(true);
    setDisplayMode("all");
    setSortMode("count");
    setResult(null);
    setError("");
    setCopyStatus("");
  }

  async function copyToClipboard(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus(text.copied);
    } catch {
      setCopyStatus(text.copyFailed);
    }
  }

  const tableLabels = {
    countColumn: text.countColumn,
    valueColumn: text.valueColumn,
    firstSeenColumn: text.firstSeenColumn
  };

  return (
    <div className="calculator-layout">
      <form className="calculator-card" onSubmit={handleSubmit}>
        <div className="calculator-card__header">
          <div>
            <p className="section__kicker">{text.kicker}</p>
            <h2>{text.title}</h2>
          </div>
          <span>
            <ListChecks size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span>{text.inputLabel} <span className="required-mark">*</span></span>
          <textarea
            onChange={(event) => {
              setInputText(event.target.value);
              setCopyStatus("");
            }}
            placeholder={text.placeholder}
            rows={10}
            value={inputText}
          />
        </label>

        <div className="duplicate-options">
          <label className="toggle-field toggle-field--compact">
            <input checked={trimSpaces} onChange={(event) => setTrimSpaces(event.target.checked)} type="checkbox" />
            <span>
              <strong>{text.trimSpaces}</strong>
              <small>{text.trimSpacesHelp}</small>
            </span>
          </label>

          <label className="toggle-field toggle-field--compact">
            <input checked={omitEmpty} onChange={(event) => setOmitEmpty(event.target.checked)} type="checkbox" />
            <span>
              <strong>{text.omitEmpty}</strong>
              <small>{text.omitEmptyHelp}</small>
            </span>
          </label>

          <label className="toggle-field toggle-field--compact">
            <input checked={ignoreCase} onChange={(event) => setIgnoreCase(event.target.checked)} type="checkbox" />
            <span>
              <strong>{text.ignoreCase}</strong>
              <small>{text.ignoreCaseHelp}</small>
            </span>
          </label>
        </div>

        <div className="form-grid">
          <label className="field">
            <span>{text.displayMode}</span>
            <span className="select-control">
              <select className="plain-select" onChange={(event) => setDisplayMode(event.target.value as DisplayMode)} value={displayMode}>
                <option value="all">{text.displayModes.all}</option>
                <option value="duplicates">{text.displayModes.duplicates}</option>
                <option value="unique">{text.displayModes.unique}</option>
              </select>
              <ChevronDown size={18} />
            </span>
          </label>

          <label className="field">
            <span>{text.sortBy}</span>
            <span className="select-control">
              <select className="plain-select" onChange={(event) => setSortMode(event.target.value as SortMode)} value={sortMode}>
                <option value="count">{text.sortModes.count}</option>
                <option value="value">{text.sortModes.value}</option>
                <option value="original">{text.sortModes.original}</option>
              </select>
              <ChevronDown size={18} />
            </span>
          </label>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>{text.hint}</span>
        </div>

        <button className="primary-action" type="submit">
          <SearchCheck size={18} />
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
            <strong>{result.duplicateValues > 0 ? numberFormatter.format(result.duplicateValues) : text.noDuplicates}</strong>
            <span>{numberFormatter.format(result.uniqueValues)} {text.uniqueValues.toLowerCase()} · {numberFormatter.format(result.countedLines)} {text.countedLines.toLowerCase()}</span>
          </div>

          <div className="text-result">
            <div className="text-result__header">
              <span>{text.tableTitle}</span>
              <div className="text-result__actions">
                <button onClick={() => downloadTextFile("duplicate-counts.csv", buildCsv(filteredEntries, tableLabels), "text/csv;charset=utf-8")} type="button">
                  <Download size={16} strokeWidth={2.1} />
                  {text.downloadCsv}
                </button>
                <details className="result-action-menu">
                  <summary aria-label={text.moreOptions} title={text.moreOptions}>
                    <MoreHorizontal size={18} strokeWidth={2.1} />
                  </summary>
                  <div className="result-action-menu__content">
                    <button onClick={() => copyToClipboard(buildTableText(filteredEntries, tableLabels))} type="button">
                      <Clipboard size={16} strokeWidth={2.1} />
                      {text.copyTable}
                    </button>
                    <button onClick={() => copyToClipboard(distinctValues.join("\n"))} type="button">
                      <Clipboard size={16} strokeWidth={2.1} />
                      {text.copyDistinct}
                    </button>
                    <button onClick={() => copyToClipboard(duplicateValues.join("\n"))} type="button">
                      <Clipboard size={16} strokeWidth={2.1} />
                      {text.copyDuplicates}
                    </button>
                  </div>
                </details>
              </div>
            </div>
            {filteredEntries.length > 0 ? (
              <div className="duplicate-table-wrap">
                <table className="duplicate-table">
                  <thead>
                    <tr>
                      <th>{text.valueColumn}</th>
                      <th>{text.countColumn}</th>
                      <th>{text.firstSeenColumn}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEntries.map((entry) => (
                      <tr key={`${entry.firstIndex}-${entry.value}`}>
                        <td>{entry.value || " "}</td>
                        <td>{numberFormatter.format(entry.count)}</td>
                        <td>{numberFormatter.format(entry.firstIndex)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="duplicate-empty-filter">{text.filteredEmpty}</p>
            )}
          </div>

          <div className="text-result">
            <div className="text-result__header">
              <span>{text.distinctTitle}</span>
              <button onClick={() => copyToClipboard(distinctValues.join("\n"))} type="button">
                <Clipboard size={16} strokeWidth={2.1} />
                {text.copyDistinct}
              </button>
            </div>
            <textarea readOnly rows={8} value={distinctValues.join("\n")} />
          </div>

          <div className="result-breakdown">
            <ResultStat label={text.totalLines} value={result.totalInputLines} formatter={numberFormatter} />
            <ResultStat label={text.countedLines} value={result.countedLines} formatter={numberFormatter} />
            <ResultStat label={text.uniqueValues} value={result.uniqueValues} formatter={numberFormatter} />
            <ResultStat label={text.duplicateCount} value={result.duplicateValues} formatter={numberFormatter} strong />
            <ResultStat label={text.duplicateLines} value={result.duplicateLines} formatter={numberFormatter} />
            <ResultStat label={text.emptyLines} value={result.emptyLines} formatter={numberFormatter} />
            {mostRepeated ? (
              <div className="result-item result-item--strong result-item--wide">
                <div className="result-item__meta">
                  <span>{text.mostRepeated}</span>
                  <small>{numberFormatter.format(mostRepeated.count)} {text.countColumn.toLowerCase()}</small>
                </div>
                <strong>{mostRepeated.value || " "}</strong>
              </div>
            ) : null}
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
            <ListChecks size={34} strokeWidth={2.1} />
            <h2>{text.emptyTitle}</h2>
            <p>{text.emptyDescription}</p>
          </div>
        </aside>
      )}
    </div>
  );
}

function ResultStat({ label, value, formatter, strong = false }: { label: string; value: number; formatter: Intl.NumberFormat; strong?: boolean }) {
  return (
    <div className={strong ? "result-item result-item--strong" : "result-item"}>
      <span>{label}</span>
      <strong>{formatter.format(value)}</strong>
    </div>
  );
}
