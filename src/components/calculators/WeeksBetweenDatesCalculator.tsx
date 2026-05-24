import { ArrowRight, CalendarDays, CheckCircle2, Info, Loader2 } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { DateField } from "../DateField";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";
import { weeksBetweenDatesCalculatorCopy as copy } from "../../locales/calculatorCopy";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function todayDate() {
  return toDateKey(new Date());
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

function parseDateKey(value: string) {
  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) return null;

  return Date.UTC(year, month - 1, day);
}

export function WeeksBetweenDatesCalculator() {
  const { locale, localizePath } = useLocale();
  const text = copy[locale];
  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(locale === "es" ? "es-CO" : "en-US", { maximumFractionDigits: 2 }),
    [locale]
  );

  const [startDate, setStartDate] = useState(todayDate());
  const [endDate, setEndDate] = useState(toDateKey(addDays(new Date(), 45)));
  const [includeEndDate, setIncludeEndDate] = useState(false);
  const [result, setResult] = useState<{
    startDate: string;
    endDate: string;
    includeEndDate: boolean;
    days: number;
    weeks: number;
    fullWeeks: number;
    remainingDays: number;
  } | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  function formatNumber(value: number) {
    return numberFormatter.format(value);
  }

  function formatDate(value: string) {
    const [year, month, day] = value.split("-").map(Number);

    if (!year || !month || !day) return value;

    return new Intl.DateTimeFormat(locale === "es" ? "es-CO" : "en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(new Date(year, month - 1, day));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const startTime = parseDateKey(startDate);
    const endTime = parseDateKey(endDate);

    if (startTime === null || endTime === null) {
      setError(text.selectBothDates);
      return;
    }

    if (endTime < startTime) {
      setError(text.endAfterStart);
      return;
    }

    setIsLoading(true);

    const baseDays = Math.round((endTime - startTime) / DAY_IN_MS);
    const days = includeEndDate ? baseDays + 1 : baseDays;
    const fullWeeks = Math.floor(days / 7);

    setResult({
      startDate,
      endDate,
      includeEndDate,
      days,
      weeks: days / 7,
      fullWeeks,
      remainingDays: days % 7
    });
    setIsLoading(false);
    scrollToResultOnMobile();
  }

  function handleReset() {
    setStartDate(todayDate());
    setEndDate(toDateKey(addDays(new Date(), 45)));
    setIncludeEndDate(false);
    setResult(null);
    setError("");
  }

  const rulesNote = result
    ? text.rulesNote
        .replace("{start}", formatDate(result.startDate))
        .replace("{end}", formatDate(result.endDate))
        .replace("{suffix}", result.includeEndDate ? text.withEndSuffix : text.withoutEndSuffix)
    : "";

  return (
    <div className="calculator-layout">
      <form className="calculator-card" onSubmit={handleSubmit}>
        <div className="calculator-card__header">
          <div>
            <p className="section__kicker">{text.kicker}</p>
            <h2>{text.title}</h2>
          </div>
          <span>
            <CalendarDays size={20} strokeWidth={2.1} />
          </span>
        </div>

        <div className="form-grid">
          <label className="field">
            <span>
              {text.startDate} <span className="required-mark">*</span>
            </span>
            <DateField ariaLabel={text.startDateAria} onChange={setStartDate} value={startDate} />
          </label>

          <label className="field">
            <span>
              {text.endDate} <span className="required-mark">*</span>
            </span>
            <DateField ariaLabel={text.endDateAria} onChange={setEndDate} value={endDate} />
          </label>
        </div>

        <label className="toggle-field">
          <input checked={includeEndDate} onChange={(event) => setIncludeEndDate(event.target.checked)} type="checkbox" />
          <span>
            <strong>{text.includeEndDate}</strong>
            <small>{text.includeEndDateHelp}</small>
          </span>
        </label>

        <div className="field-action-row">
          <span>{text.helperText}</span>
          <a className="secondary-action secondary-action--compact" href={localizePath("/tools/days-between-dates-calculator")}>
            {text.helperAction}
            <ArrowRight size={16} strokeWidth={2.1} />
          </a>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>{text.hint}</span>
        </div>

        <button className="primary-action" disabled={isLoading} type="submit">
          {isLoading ? <Loader2 className="spin" size={18} /> : <CalendarDays size={18} />}
          {text.submit}
        </button>

        <button className="secondary-action" onClick={handleReset} type="button">
          {text.reset}
        </button>
      </form>

      {result ? (
        <aside className="result-panel" ref={resultRef}>
          <div className="result-panel__hero">
            <p>{text.totalBetweenDates}</p>
            <strong>{formatNumber(result.weeks)} {text.approximateWeeks}</strong>
            <span>{result.fullWeeks} {text.fullWeeks.toLowerCase()} + {result.remainingDays} {text.remainingDays.toLowerCase()}</span>
          </div>

          <div className="result-breakdown">
            <div className="result-item">
              <span>{text.fullWeeks}</span>
              <strong>{result.fullWeeks}</strong>
            </div>
            <div className="result-item">
              <span>{text.remainingDays}</span>
              <strong>{result.remainingDays}</strong>
            </div>
            <div className="result-item">
              <span>{text.totalDays}</span>
              <strong>{result.days}</strong>
            </div>
            <div className="result-item result-item--strong">
              <span>{text.includesEndDate}</span>
              <strong>{result.includeEndDate ? text.yes : text.no}</strong>
            </div>
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
            <CalendarDays size={34} strokeWidth={2.1} />
            <h2>{text.emptyTitle}</h2>
            <p>{text.emptyDescription}</p>
          </div>
        </aside>
      )}
    </div>
  );
}
