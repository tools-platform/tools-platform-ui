import { CheckCircle2, Clipboard, Info, Replace, RotateCcw, Search } from "lucide-react";
import type { FormEvent, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";

type ResultMode = "find" | "replace";

type ReplaceResult = {
  input: string;
  output: string;
  search: string;
  replacement: string;
  matchCase: boolean;
  wholeWord: boolean;
  matches: number;
  mode: ResultMode;
};

const copy = {
  es: {
    kicker: "Utilidad",
    title: "Buscar y reemplazar",
    inputLabel: "Texto original",
    placeholder: "Pega el texto donde quieres buscar o reemplazar palabras y fragmentos...",
    searchLabel: "Buscar",
    replacementLabel: "Reemplazar por",
    matchCase: "Distinguir mayúsculas",
    matchCaseHelp: "Diferencia Hola de hola.",
    wholeWord: "Solo palabra completa",
    wholeWordHelp: "Evita coincidencias dentro de otras palabras.",
    emptyError: "Pega un texto y escribe qué quieres buscar.",
    hint: "Si dejas reemplazar vacío, solo resaltamos las coincidencias encontradas.",
    submitFind: "Buscar texto",
    submitReplace: "Reemplazar texto",
    reset: "Restablecer",
    resultTitleFind: "Texto encontrado",
    resultTitleReplace: "Texto reemplazado",
    resultFind: "Coincidencias",
    resultReplace: "Resultado",
    copy: "Copiar",
    copied: "Resultado copiado.",
    copyFailed: "No se pudo copiar automáticamente.",
    matches: "Coincidencias",
    replacements: "Reemplazos",
    characters: "Caracteres",
    rulesNoteFind: "Marcamos las coincidencias en el texto original. El resultado no modifica tu contenido.",
    rulesNoteReplace: "El resultado queda fijo hasta que vuelvas a presionar reemplazar.",
    disclaimer: "Resultado automático para edición de texto. Revisa nombres propios, códigos o datos sensibles antes de usarlo.",
    emptyTitle: "El resultado aparecerá aquí",
    emptyDescription: "Pega texto, define qué buscar y elige si quieres solo encontrar o reemplazar."
  },
  en: {
    kicker: "Utility",
    title: "Find and replace",
    inputLabel: "Original text",
    placeholder: "Paste the text where you want to find or replace words and fragments...",
    searchLabel: "Find",
    replacementLabel: "Replace with",
    matchCase: "Match case",
    matchCaseHelp: "Treats Hello and hello as different.",
    wholeWord: "Whole word only",
    wholeWordHelp: "Avoids matches inside other words.",
    emptyError: "Paste text and enter what you want to find.",
    hint: "If replace is empty, we only highlight the matches found.",
    submitFind: "Find text",
    submitReplace: "Replace text",
    reset: "Reset",
    resultTitleFind: "Found text",
    resultTitleReplace: "Replaced text",
    resultFind: "Matches",
    resultReplace: "Result",
    copy: "Copy",
    copied: "Result copied.",
    copyFailed: "We couldn't copy it automatically.",
    matches: "Matches",
    replacements: "Replacements",
    characters: "Characters",
    rulesNoteFind: "We mark matches in the original text. The result does not modify your content.",
    rulesNoteReplace: "The result stays fixed until you press replace again.",
    disclaimer: "Automatic text editing result. Review names, code, or sensitive data before using it.",
    emptyTitle: "The result will appear here",
    emptyDescription: "Paste text, define what to find, and choose whether to only find or replace."
  }
} as const;

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function createSearchRegex(search: string, matchCase: boolean, wholeWord: boolean) {
  const escapedSearch = escapeRegExp(search);
  const pattern = wholeWord ? `\\b${escapedSearch}\\b` : escapedSearch;
  const flags = matchCase ? "gu" : "giu";
  return new RegExp(pattern, flags);
}

function processText(input: string, search: string, replacement: string, matchCase: boolean, wholeWord: boolean): ReplaceResult {
  const mode: ResultMode = replacement.trim().length > 0 ? "replace" : "find";
  const regex = createSearchRegex(search, matchCase, wholeWord);
  let matches = 0;

  if (mode === "find") {
    for (const _match of input.matchAll(regex)) {
      matches += 1;
    }

    return { input, output: input, search, replacement, matchCase, wholeWord, matches, mode };
  }

  const output = input.replace(regex, () => {
    matches += 1;
    return replacement;
  });

  return { input, output, search, replacement, matchCase, wholeWord, matches, mode };
}

function buildHighlightedParts(result: ReplaceResult): ReactNode[] {
  const regex = createSearchRegex(result.search, result.matchCase, result.wholeWord);
  const parts: ReactNode[] = [];
  let cursor = 0;

  for (const match of result.input.matchAll(regex)) {
    const index = match.index ?? 0;
    const value = match[0];

    if (index > cursor) {
      parts.push(result.input.slice(cursor, index));
    }

    parts.push(<mark key={`${index}-${value}`}>{value}</mark>);
    cursor = index + value.length;
  }

  if (cursor < result.input.length) {
    parts.push(result.input.slice(cursor));
  }

  return parts.length ? parts : [result.input];
}

export function FindReplaceText() {
  const { locale } = useLocale();
  const text = copy[locale];
  const localeCode = locale === "es" ? "es-CO" : "en-US";
  const numberFormatter = useMemo(() => new Intl.NumberFormat(localeCode), [localeCode]);
  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [replacementText, setReplacementText] = useState("");
  const [matchCase, setMatchCase] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [result, setResult] = useState<ReplaceResult | null>(null);
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();
  const currentMode: ResultMode = replacementText.trim().length > 0 ? "replace" : "find";

  useEffect(() => {
    if (!copyStatus) return;
    const timer = window.setTimeout(() => setCopyStatus(""), 2400);
    return () => window.clearTimeout(timer);
  }, [copyStatus]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setCopyStatus("");

    if (!inputText.trim() || !searchText) {
      setResult(null);
      setError(text.emptyError);
      return;
    }

    setResult(processText(inputText, searchText, replacementText, matchCase, wholeWord));
    scrollToResultOnMobile();
  }

  function handleReset() {
    setInputText("");
    setSearchText("");
    setReplacementText("");
    setMatchCase(false);
    setWholeWord(false);
    setResult(null);
    setError("");
    setCopyStatus("");
  }

  async function handleCopy() {
    if (!result) return;
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
            <Replace size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span>{text.inputLabel} <span className="required-mark">*</span></span>
          <textarea className="text-tool-textarea" onChange={(event) => setInputText(event.target.value)} placeholder={text.placeholder} rows={9} value={inputText} />
        </label>

        <div className="form-grid">
          <label className="field">
            <span>{text.searchLabel} <span className="required-mark">*</span></span>
            <input onChange={(event) => setSearchText(event.target.value)} type="text" value={searchText} />
          </label>
          <label className="field">
            <span>{text.replacementLabel}</span>
            <input onChange={(event) => setReplacementText(event.target.value)} type="text" value={replacementText} />
          </label>
        </div>

        <div className="duplicate-options">
          <label className="toggle-field toggle-field--compact">
            <input checked={matchCase} onChange={(event) => setMatchCase(event.target.checked)} type="checkbox" />
            <span><strong>{text.matchCase}</strong><small>{text.matchCaseHelp}</small></span>
          </label>
          <label className="toggle-field toggle-field--compact">
            <input checked={wholeWord} onChange={(event) => setWholeWord(event.target.checked)} type="checkbox" />
            <span><strong>{text.wholeWord}</strong><small>{text.wholeWordHelp}</small></span>
          </label>
        </div>

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>{text.hint}</span>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-action" type="submit">
          {currentMode === "find" ? <Search size={18} /> : <Replace size={18} />}
          {currentMode === "find" ? text.submitFind : text.submitReplace}
        </button>
        <button className="secondary-action" onClick={handleReset} type="button">
          <RotateCcw size={18} />
          {text.reset}
        </button>
      </form>

      <section className={result ? "result-panel" : "result-panel result-panel--empty"} ref={resultRef}>
        {result ? (
          <>
            {copyStatus ? (
              <div className={`duplicate-copy-toast${copyStatus === text.copyFailed ? " duplicate-copy-toast--error" : ""}`} role="status">
                <CheckCircle2 size={16} strokeWidth={2.1} />
                <span>{copyStatus}</span>
              </div>
            ) : null}

            <div className="result-panel__hero result-panel__hero--compact">
              <p>{result.mode === "find" ? text.resultTitleFind : text.resultTitleReplace}</p>
              <strong>{numberFormatter.format(result.matches)}</strong>
              <span>{(result.mode === "find" ? text.matches : text.replacements).toLowerCase()}</span>
            </div>

            <div className="text-result">
              <div className="text-result__header">
                <span>{result.mode === "find" ? text.resultFind : text.resultReplace}</span>
                <div className="text-result__actions">
                  <button onClick={handleCopy} type="button">
                    <Clipboard size={16} strokeWidth={2.1} />
                    {text.copy}
                  </button>
                </div>
              </div>
              {result.mode === "find" ? (
                <div className="highlight-result">{buildHighlightedParts(result)}</div>
              ) : (
                <textarea readOnly rows={10} value={result.output} />
              )}
            </div>

            <div className="result-breakdown">
              <ResultStat label={result.mode === "find" ? text.matches : text.replacements} value={result.matches} formatter={numberFormatter} strong />
              <ResultStat label={text.characters} value={[...result.output].length} formatter={numberFormatter} />
            </div>

            <div className="rules-note">
              <CheckCircle2 size={18} strokeWidth={2.1} />
              <p>{result.mode === "find" ? text.rulesNoteFind : text.rulesNoteReplace}</p>
            </div>

            <p className="disclaimer">{text.disclaimer}</p>
          </>
        ) : (
          <div className="result-empty">
            <Replace size={34} strokeWidth={2.1} />
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
