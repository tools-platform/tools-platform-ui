import { CheckCircle2, Clipboard, Eraser, Info, RotateCcw } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";
import { removeExtraSpacesCopy as copy } from "../../locales/calculatorCopy";

type SpaceCleanerResult = {
  input: string;
  output: string;
  trimLines: boolean;
  collapseSpaces: boolean;
  tabsToSpaces: boolean;
  removeEmptyLines: boolean;
  removedEmptyLines: number;
};

function cleanSpaces(
  value: string,
  options: Pick<SpaceCleanerResult, "trimLines" | "collapseSpaces" | "tabsToSpaces" | "removeEmptyLines">
) {
  const lines = value.split(/\r?\n/);
  const outputLines: string[] = [];
  let removedEmptyLines = 0;

  lines.forEach((line) => {
    let nextLine = line;

    if (options.tabsToSpaces) {
      nextLine = nextLine.replace(/\t/g, " ");
    }

    if (options.collapseSpaces) {
      nextLine = nextLine.replace(/[^\S\r\n]+/g, " ");
    }

    if (options.trimLines) {
      nextLine = nextLine.trim();
    }

    if (options.removeEmptyLines && nextLine.length === 0) {
      removedEmptyLines += 1;
      return;
    }

    outputLines.push(nextLine);
  });

  return {
    output: outputLines.join("\n"),
    removedEmptyLines
  };
}

export function RemoveExtraSpaces() {
  const { locale } = useLocale();
  const text = copy[locale];
  const localeCode = locale === "es" ? "es-CO" : "en-US";
  const numberFormatter = useMemo(() => new Intl.NumberFormat(localeCode), [localeCode]);
  const [inputText, setInputText] = useState("");
  const [trimLines, setTrimLines] = useState(true);
  const [collapseSpaces, setCollapseSpaces] = useState(true);
  const [tabsToSpaces, setTabsToSpaces] = useState(true);
  const [removeEmptyLines, setRemoveEmptyLines] = useState(false);
  const [result, setResult] = useState<SpaceCleanerResult | null>(null);
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  const removedCharacters = result ? Math.max(result.input.length - result.output.length, 0) : 0;

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

    const cleaned = cleanSpaces(inputText, {
      trimLines,
      collapseSpaces,
      tabsToSpaces,
      removeEmptyLines
    });

    setResult({
      input: inputText,
      output: cleaned.output,
      trimLines,
      collapseSpaces,
      tabsToSpaces,
      removeEmptyLines,
      removedEmptyLines: cleaned.removedEmptyLines
    });
    scrollToResultOnMobile();
  }

  function handleReset() {
    setInputText("");
    setTrimLines(true);
    setCollapseSpaces(true);
    setTabsToSpaces(true);
    setRemoveEmptyLines(false);
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
            <Eraser size={20} strokeWidth={2.1} />
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

        <div className="duplicate-options">
          <label className="toggle-field toggle-field--compact">
            <input checked={trimLines} onChange={(event) => setTrimLines(event.target.checked)} type="checkbox" />
            <span>
              <strong>{text.trimLines}</strong>
              <small>{text.trimLinesHelp}</small>
            </span>
          </label>

          <label className="toggle-field toggle-field--compact">
            <input checked={collapseSpaces} onChange={(event) => setCollapseSpaces(event.target.checked)} type="checkbox" />
            <span>
              <strong>{text.collapseSpaces}</strong>
              <small>{text.collapseSpacesHelp}</small>
            </span>
          </label>

          <label className="toggle-field toggle-field--compact">
            <input checked={tabsToSpaces} onChange={(event) => setTabsToSpaces(event.target.checked)} type="checkbox" />
            <span>
              <strong>{text.tabsToSpaces}</strong>
              <small>{text.tabsToSpacesHelp}</small>
            </span>
          </label>

          <label className="toggle-field toggle-field--compact">
            <input checked={removeEmptyLines} onChange={(event) => setRemoveEmptyLines(event.target.checked)} type="checkbox" />
            <span>
              <strong>{text.removeEmptyLines}</strong>
              <small>{text.removeEmptyLinesHelp}</small>
            </span>
          </label>
        </div>

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>{text.hint}</span>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-action" type="submit">
          <Eraser size={18} />
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
            <strong>{numberFormatter.format(removedCharacters)}</strong>
            <span>{text.removedChars.toLowerCase()}</span>
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
            <textarea readOnly rows={10} value={result.output} />
          </div>

          <div className="result-breakdown">
            <div className="result-item result-item--strong">
              <span>{text.removedChars}</span>
              <strong>{numberFormatter.format(removedCharacters)}</strong>
            </div>
            <ResultStat formatter={numberFormatter} label={text.removedEmptyLines} value={result.removedEmptyLines} />
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
            <Eraser size={34} strokeWidth={2.1} />
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
