import { CheckCircle2, ChevronDown, Clipboard, Download, Info, ListChecks, MoreHorizontal, RotateCcw, SearchCheck } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";
import { duplicateCounterCopy as copy } from "../../locales/calculatorCopy";

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
  wordCount: number;
  displayMode: DisplayMode;
  sortMode: SortMode;
  entries: DuplicateEntry[];
};

function escapeCsv(value: string) {
  if (!/[",\n\r]/.test(value)) return value;
  return `"${value.replaceAll('"', '""')}"`;
}

function countDuplicates(input: string, ignoreCase: boolean, trimSpaces: boolean, omitEmpty: boolean, localeCode: string): DuplicateResult {
  const rawLines = input.split(/\r?\n/);
  const entries = new Map<string, DuplicateEntry>();
  let emptyLines = 0;
  let countedLines = 0;
  let wordCount = 0;

  rawLines.forEach((line, index) => {
    const value = trimSpaces ? line.trim() : line;

    if (value.length === 0) {
      emptyLines += 1;
      if (omitEmpty) return;
    }

    const key = ignoreCase ? value.toLocaleLowerCase(localeCode) : value;
    const current = entries.get(key);
    countedLines += 1;
    wordCount += countWords(value);

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
    wordCount,
    displayMode: "all",
    sortMode: "count",
    entries: entryList
  };
}

function countWords(value: string) {
  const normalized = value.trim();

  if (!normalized) {
    return 0;
  }

  return normalized.split(/\s+/).length;
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

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>{text.hint}</span>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

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
              <div className="result-item result-item--strong">
                <div className="result-item__meta">
                  <span>{text.mostRepeated}</span>
                  <small>{numberFormatter.format(mostRepeated.count)} {text.countColumn.toLowerCase()}</small>
                </div>
                <strong>{mostRepeated.value || " "}</strong>
              </div>
            ) : null}
            <ResultStat label={text.wordCount} value={result.wordCount} formatter={numberFormatter} />
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
