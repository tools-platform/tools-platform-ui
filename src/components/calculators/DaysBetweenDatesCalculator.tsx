import { ArrowRight, CalendarDays, CheckCircle2, Info, Loader2 } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { DateField } from "../DateField";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";
import { calculateDaysBetweenDates, type DaysBetweenDatesResponse } from "../../services/timeApi";
import { daysBetweenDatesCalculatorCopy as copy } from "../../locales/calculatorCopy";

type DaysBetweenDatesData = DaysBetweenDatesResponse["data"];

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

export function DaysBetweenDatesCalculator() {
  const { locale, localizePath } = useLocale();
  const text = copy[locale];
  const numberFormatter = useMemo(() => new Intl.NumberFormat(locale === "es" ? "es-CO" : "en-US", {
    maximumFractionDigits: 2
  }), [locale]);

  const [startDate, setStartDate] = useState(todayDate());
  const [endDate, setEndDate] = useState(toDateKey(addDays(new Date(), 17)));
  const [includeEndDate, setIncludeEndDate] = useState(false);
  const [result, setResult] = useState<DaysBetweenDatesData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  function formatNumber(value: number) {
    return numberFormatter.format(value);
  }

  function formatDate(value: string) {
    const [year, month, day] = value.split("-").map(Number);

    if (!year || !month || !day) {
      return value;
    }

    return new Intl.DateTimeFormat(locale === "es" ? "es-CO" : "en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(new Date(year, month - 1, day));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!startDate || !endDate) {
      setError(text.selectBothDates);
      return;
    }

    if (endDate < startDate) {
      setError(text.endAfterStart);
      return;
    }

    setIsLoading(true);

    try {
      const data = await calculateDaysBetweenDates({
        startDate,
        endDate,
        includeEndDate
      });
      setResult(data);
      scrollToResultOnMobile();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : text.selectBothDates);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setStartDate(todayDate());
    setEndDate(toDateKey(addDays(new Date(), 17)));
    setIncludeEndDate(false);
    setResult(null);
    setError("");
  }

  const rulesNote = result
    ? text.rulesNote
        .replace("{start}", formatDate(result.input.startDate))
        .replace("{end}", formatDate(result.input.endDate))
        .replace("{suffix}", result.input.includeEndDate ? text.withEndSuffix : text.withoutEndSuffix)
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
          <a className="secondary-action secondary-action--compact" href={localizePath("/tools/weeks-between-dates-calculator")}>
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
            <strong>{formatNumber(result.result.days)} {text.days}</strong>
            <span>{formatNumber(result.result.weeks)} {text.approximateWeeks}</span>
          </div>

          <div className="result-breakdown">
            <div className="result-item">
              <span>{text.fullWeeks}</span>
              <strong>{result.result.fullWeeks}</strong>
            </div>
            <div className="result-item">
              <span>{text.remainingDays}</span>
              <strong>{result.result.remainingDays}</strong>
            </div>
            <div className="result-item">
              <span>{text.calendarDifference}</span>
              <strong>{result.result.calendarDaysDifference}</strong>
            </div>
            <div className="result-item result-item--strong">
              <span>{text.includesEndDate}</span>
              <strong>{result.input.includeEndDate ? text.yes : text.no}</strong>
            </div>
          </div>

          <div className="rules-note">
            <CheckCircle2 size={18} strokeWidth={2.1} />
            <p>{rulesNote}</p>
          </div>

          <p className="disclaimer">
            {locale === "es"
              ? "Conteo estimado de días calendario. No evalúa días hábiles, festivos, plazos ni reglas legales."
              : "Estimated calendar day count. It does not evaluate business days, holidays, deadlines, or legal rules."}
          </p>
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
