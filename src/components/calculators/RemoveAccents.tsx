import { CheckCircle2, Clipboard, Info, Languages, RotateCcw } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";
import { removeAccentsCopy as copy } from "../../locales/calculatorCopy";

type AccentCleanerResult = {
  input: string;
  output: string;
  convertEnye: boolean;
};

function removeAccents(value: string, convertEnye: boolean) {
  const lowerEnyeToken = "\uE000";
  const upperEnyeToken = "\uE001";
  const source = convertEnye ? value : value.replace(/ñ/g, lowerEnyeToken).replace(/Ñ/g, upperEnyeToken);

  return source
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replaceAll(lowerEnyeToken, "ñ")
    .replaceAll(upperEnyeToken, "Ñ");
}

function countChangedCharacters(input: string, output: string) {
  const inputCharacters = Array.from(input);
  const outputCharacters = Array.from(output);
  const length = Math.max(inputCharacters.length, outputCharacters.length);
  let changed = 0;

  for (let index = 0; index < length; index += 1) {
    if (inputCharacters[index] !== outputCharacters[index]) {
      changed += 1;
    }
  }

  return changed;
}

export function RemoveAccents() {
  const { locale } = useLocale();
  const text = copy[locale];
  const localeCode = locale === "es" ? "es-CO" : "en-US";
  const numberFormatter = useMemo(() => new Intl.NumberFormat(localeCode), [localeCode]);
  const [inputText, setInputText] = useState("");
  const [convertEnye, setConvertEnye] = useState(false);
  const [result, setResult] = useState<AccentCleanerResult | null>(null);
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  const changedCharacters = result ? countChangedCharacters(result.input, result.output) : 0;

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

    setResult({
      input: inputText,
      output: removeAccents(inputText, convertEnye),
      convertEnye
    });
    scrollToResultOnMobile();
  }

  function handleReset() {
    setInputText("");
    setConvertEnye(false);
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
            <Languages size={20} strokeWidth={2.1} />
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
            <input checked={convertEnye} onChange={(event) => setConvertEnye(event.target.checked)} type="checkbox" />
            <span>
              <strong>{text.convertEnye}</strong>
              <small>{text.convertEnyeHelp}</small>
            </span>
          </label>
        </div>

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>{text.hint}</span>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-action" type="submit">
          <Languages size={18} />
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
            <strong>{numberFormatter.format(changedCharacters)}</strong>
            <span>{text.changedChars.toLowerCase()}</span>
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
              <span>{text.enye}</span>
              <strong>{result.convertEnye ? text.enyeConverted : text.enyeKept}</strong>
            </div>
            <ResultStat formatter={numberFormatter} label={text.changedChars} value={changedCharacters} />
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
            <Languages size={34} strokeWidth={2.1} />
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
