import { ArrowRight, CheckCircle2, FileText, Info, RotateCcw } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";
import { wordCharacterCounterCopy as copy } from "../../locales/calculatorCopy";

type TextCountResult = {
  text: string;
  words: number;
  characters: number;
  charactersNoSpaces: number;
  letters: number;
  numbers: number;
  lines: number;
  emptyLines: number;
  paragraphs: number;
  sentences: number;
  readingMinutes: number;
};

function countText(text: string): TextCountResult {
  const trimmed = text.trim();
  const words = trimmed.match(/[\p{L}\p{N}]+(?:[-'’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
  const lines = text.length === 0 ? 0 : text.split(/\r?\n/).length;
  const emptyLines = text.split(/\r?\n/).filter((line) => line.trim().length === 0).length;
  const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter((paragraph) => paragraph.trim().length > 0).length : 0;
  const sentences = trimmed.match(/[^.!?¿¡]+[.!?]+|[^.!?¿¡]+$/gu)?.filter((sentence) => sentence.trim().length > 0).length ?? 0;
  const letters = text.match(/\p{L}/gu)?.length ?? 0;
  const numbers = text.match(/\p{N}/gu)?.length ?? 0;

  return {
    text,
    words,
    characters: [...text].length,
    charactersNoSpaces: [...text.replace(/\s/g, "")].length,
    letters,
    numbers,
    lines,
    emptyLines,
    paragraphs,
    sentences,
    readingMinutes: Math.max(1, Math.ceil(words / 200))
  };
}

export function WordCharacterCounter() {
  const { locale, localizePath } = useLocale();
  const text = copy[locale];
  const localeCode = locale === "es" ? "es-CO" : "en-US";
  const numberFormatter = useMemo(() => new Intl.NumberFormat(localeCode), [localeCode]);
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<TextCountResult | null>(null);
  const [error, setError] = useState("");
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!inputText.trim()) {
      setResult(null);
      setError(text.emptyError);
      return;
    }

    setResult(countText(inputText));
    scrollToResultOnMobile();
  }

  function handleReset() {
    setInputText("");
    setResult(null);
    setError("");
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
            <FileText size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span>{text.inputLabel} <span className="required-mark">*</span></span>
          <textarea className="text-tool-textarea" onChange={(event) => setInputText(event.target.value)} placeholder={text.placeholder} rows={12} value={inputText} />
        </label>

        <div className="field-action-row">
          <span>{text.helperText}</span>
          <a className="secondary-action secondary-action--compact" href={localizePath("/tools/random-text-generator")}>
            {text.helperAction}
            <ArrowRight size={16} strokeWidth={2.1} />
          </a>
        </div>

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>{text.hint}</span>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-action" type="submit">
          <FileText size={18} />
          {text.submit}
        </button>

        <button className="secondary-action" onClick={handleReset} type="button">
          <RotateCcw size={18} />
          {text.reset}
        </button>
      </form>

      <section className={result ? "result-panel" : "result-panel result-panel--empty"} ref={resultRef}>
        {result ? (
          <>
            <div className="result-panel__hero result-panel__hero--compact">
              <p>{text.resultTitle}</p>
              <strong>{numberFormatter.format(result.words)}</strong>
              <span>{text.words.toLowerCase()}</span>
            </div>

            <div className="result-breakdown">
              <ResultStat label={text.words} value={result.words} formatter={numberFormatter} strong />
              <ResultStat label={text.characters} value={result.characters} formatter={numberFormatter} />
              <ResultStat label={text.charactersNoSpaces} value={result.charactersNoSpaces} formatter={numberFormatter} />
              <ResultStat label={text.letters} value={result.letters} formatter={numberFormatter} />
              <ResultStat label={text.numbers} value={result.numbers} formatter={numberFormatter} />
              <ResultStat label={text.lines} value={result.lines} formatter={numberFormatter} />
              <ResultStat label={text.emptyLines} value={result.emptyLines} formatter={numberFormatter} />
              <ResultStat label={text.paragraphs} value={result.paragraphs} formatter={numberFormatter} />
              <ResultStat label={text.sentences} value={result.sentences} formatter={numberFormatter} />
              <div className="result-item">
                <span>{text.readingTime}</span>
                <strong>{numberFormatter.format(result.readingMinutes)} {text.minutes}</strong>
              </div>
            </div>

            <div className="rules-note">
              <CheckCircle2 size={18} strokeWidth={2.1} />
              <p>{text.rulesNote}</p>
            </div>

            <p className="disclaimer">{text.disclaimer}</p>
          </>
        ) : (
          <div className="result-empty">
            <FileText size={34} strokeWidth={2.1} />
            <h2>{text.emptyTitle}</h2>
            <p>{text.emptyDescription}</p>
          </div>
        )}
      </section>
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
