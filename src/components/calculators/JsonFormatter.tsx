import { CheckCircle2, Clipboard, Code2, FileJson, Info, Maximize2, RotateCcw } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { ExpandedTextTransform } from "../ExpandedTextTransform";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";
import { jsonFormatterCopy as copy } from "../../locales/calculatorCopy";

type JsonMode = "format" | "minify";

type JsonTransformResult = {
  input: string;
  output: string;
  mode: JsonMode;
  keys: number;
  items: number;
};

function countJsonStats(value: unknown): { keys: number; items: number } {
  if (Array.isArray(value)) {
    return value.reduce(
      (total, item) => {
        const nested = countJsonStats(item);
        return {
          keys: total.keys + nested.keys,
          items: total.items + 1 + nested.items
        };
      },
      { keys: 0, items: 0 }
    );
  }

  if (value && typeof value === "object") {
    return Object.entries(value).reduce(
      (total, [, item]) => {
        const nested = countJsonStats(item);
        return {
          keys: total.keys + 1 + nested.keys,
          items: total.items + nested.items
        };
      },
      { keys: 0, items: 0 }
    );
  }

  return { keys: 0, items: 0 };
}

function transformJson(value: string, mode: JsonMode): JsonTransformResult {
  const parsed = JSON.parse(value) as unknown;
  const stats = countJsonStats(parsed);

  return {
    input: value,
    output: mode === "format" ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed),
    mode,
    keys: stats.keys,
    items: stats.items
  };
}

function getJsonErrorMessage(error: unknown, fallback: string) {
  if (error instanceof SyntaxError && error.message) {
    return `${fallback} ${error.message}`;
  }

  return fallback;
}

export function JsonFormatter() {
  const { locale } = useLocale();
  const text = copy[locale];
  const localeCode = locale === "es" ? "es-CO" : "en-US";
  const numberFormatter = useMemo(() => new Intl.NumberFormat(localeCode), [localeCode]);
  const [inputText, setInputText] = useState("");
  const [mode, setMode] = useState<JsonMode>("format");
  const [result, setResult] = useState<JsonTransformResult | null>(null);
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [autoUpdateExpanded, setAutoUpdateExpanded] = useState(false);
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  const resultTitle = result?.mode === "minify" ? text.resultTitleMinify : text.resultTitleFormat;
  const resultModeLabel = result?.mode === "minify" ? text.minify : text.format;
  const rulesNote = result?.mode === "minify" ? text.rulesNoteMinify : text.rulesNoteFormat;
  const outputLength = result?.output.length ?? 0;

  useEffect(() => {
    if (!copyStatus) return;

    const timer = window.setTimeout(() => setCopyStatus(""), 2400);
    return () => window.clearTimeout(timer);
  }, [copyStatus]);

  useEffect(() => {
    if (!isExpanded || !autoUpdateExpanded || result?.mode !== "format") return;

    try {
      setError("");
      setResult(transformJson(inputText, "format"));
    } catch {
      setError(text.invalidError);
    }
  }, [autoUpdateExpanded, inputText, isExpanded, result?.mode, text.invalidError]);

  function runTransform(nextMode: JsonMode, shouldScroll: boolean) {
    setError("");
    setCopyStatus("");

    if (!inputText.trim()) {
      setResult(null);
      setIsExpanded(false);
      setError(text.emptyError);
      return false;
    }

    try {
      setResult(transformJson(inputText, nextMode));
      if (shouldScroll) {
        scrollToResultOnMobile();
      }
      return true;
    } catch (transformError) {
      setResult(null);
      setIsExpanded(false);
      setError(getJsonErrorMessage(transformError, text.invalidError));
      return false;
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runTransform(mode, true);
  }

  function handleReset() {
    setInputText("");
    setMode("format");
    setResult(null);
    setError("");
    setCopyStatus("");
    setIsExpanded(false);
    setAutoUpdateExpanded(false);
  }

  function handleExpandedUpdate() {
    if (runTransform("format", false)) {
      setCopyStatus(text.updated);
    }
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
    <>
      <div className="calculator-layout">
        <form className="calculator-card" onSubmit={handleSubmit}>
          <div className="calculator-card__header">
            <div>
              <p className="section__kicker">{text.kicker}</p>
              <h2>{text.title}</h2>
            </div>
            <span>
              <FileJson size={20} strokeWidth={2.1} />
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
              placeholder={text.placeholder}
              rows={12}
              spellCheck={false}
              value={inputText}
            />
          </label>

          <fieldset className="segmented-field">
            <legend>{text.operation}</legend>
            <div className="segmented-control">
              <button className={mode === "format" ? "is-active" : ""} onClick={() => setMode("format")} type="button">
                {text.format}
              </button>
              <button className={mode === "minify" ? "is-active" : ""} onClick={() => setMode("minify")} type="button">
                {text.minify}
              </button>
            </div>
          </fieldset>

          <div className="calculator-hint">
            <Info size={16} strokeWidth={2.1} />
            <span>{text.hint}</span>
          </div>

          {error ? <p className="form-error">{error}</p> : null}

          <button className="primary-action" type="submit">
            <Code2 size={18} />
            {mode === "minify" ? text.submitMinify : text.submitFormat}
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
            </div>

            <div className="text-result">
              <div className="text-result__header">
                <span>{text.result}</span>
                <div className="text-result__actions">
                  {result.mode === "format" ? (
                    <button onClick={() => setIsExpanded(true)} type="button">
                      <Maximize2 size={16} strokeWidth={2.1} />
                      {text.expand}
                    </button>
                  ) : null}
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
                <span>{text.mode}</span>
                <strong>{resultModeLabel}</strong>
              </div>
              <ResultStat formatter={numberFormatter} label={text.totalChars} value={outputLength} />
              <ResultStat formatter={numberFormatter} label={text.keys} value={result.keys} />
              <ResultStat formatter={numberFormatter} label={text.items} value={result.items} />
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
              <FileJson size={34} strokeWidth={2.1} />
              <h2>{text.emptyTitle}</h2>
              <p>{text.emptyDescription}</p>
            </div>
          </aside>
        )}
      </div>

      {isExpanded && result?.mode === "format" ? (
        <ExpandedTextTransform
          autoUpdate={autoUpdateExpanded}
          autoUpdateLabel={text.autoUpdate}
          closeLabel={text.close}
          copyFailedLabel={text.copyFailed}
          copyLabel={text.copy}
          copyStatus={copyStatus}
          editorTitle={text.editorTitle}
          inputLabel={text.inputLabel}
          inputValue={inputText}
          onAutoUpdateChange={setAutoUpdateExpanded}
          onClose={() => setIsExpanded(false)}
          onCopy={handleCopy}
          onInputChange={(value) => {
            setInputText(value);
            setCopyStatus("");
          }}
          onUpdate={handleExpandedUpdate}
          outputLabel={resultTitle}
          outputValue={result.output}
          title={resultTitle}
          updateLabel={text.updateResult}
        />
      ) : null}
    </>
  );
}

function ResultStat({
  label,
  value,
  formatter
}: {
  label: string;
  value: number;
  formatter: Intl.NumberFormat;
}) {
  return (
    <div className="result-item">
      <span>{label}</span>
      <strong>{formatter.format(value)}</strong>
    </div>
  );
}
