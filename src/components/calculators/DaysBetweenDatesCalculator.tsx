import { CalendarDays, CheckCircle2, Info, Loader2 } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { DateField } from "../DateField";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";
import { calculateDaysBetweenDates, type DaysBetweenDatesResponse } from "../../services/timeApi";

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

const copy = {
  es: {
    kicker: "Contador",
    title: "Días entre fechas",
    startDate: "Fecha inicial",
    endDate: "Fecha final",
    startDateAria: "Seleccionar fecha inicial",
    endDateAria: "Seleccionar fecha final",
    includeEndDate: "Incluir fecha final",
    includeEndDateHelp: "Actívalo si quieres contar también el último día del periodo.",
    selectBothDates: "Selecciona la fecha inicial y la fecha final.",
    endAfterStart: "La fecha final debe ser igual o posterior a la fecha inicial.",
    hint: "Cuenta días calendario entre dos fechas. No descuenta fines de semana ni festivos.",
    submit: "Contar días",
    reset: "Restablecer",
    totalBetweenDates: "Total entre fechas",
    days: "días",
    approximateWeeks: "semanas aproximadas",
    fullWeeks: "Semanas completas",
    remainingDays: "Días restantes",
    calendarDifference: "Diferencia calendario",
    includesEndDate: "Incluye fecha final",
    yes: "Sí",
    no: "No",
    rulesNote: "Se contó desde {start} hasta {end}{suffix}",
    withEndSuffix: ", incluyendo la fecha final.",
    withoutEndSuffix: ", sin incluir la fecha final.",
    emptyTitle: "Resultado del conteo",
    emptyDescription: "Selecciona dos fechas para ver cuántos días hay entre ellas."
  },
  en: {
    kicker: "Counter",
    title: "Days between dates",
    startDate: "Start date",
    endDate: "End date",
    startDateAria: "Select start date",
    endDateAria: "Select end date",
    includeEndDate: "Include end date",
    includeEndDateHelp: "Turn it on if you also want to count the last day of the period.",
    selectBothDates: "Select the start date and the end date.",
    endAfterStart: "The end date must be the same as or later than the start date.",
    hint: "Counts calendar days between two dates. It does not exclude weekends or holidays.",
    submit: "Count days",
    reset: "Reset",
    totalBetweenDates: "Total between dates",
    days: "days",
    approximateWeeks: "approximate weeks",
    fullWeeks: "Full weeks",
    remainingDays: "Remaining days",
    calendarDifference: "Calendar difference",
    includesEndDate: "Includes end date",
    yes: "Yes",
    no: "No",
    rulesNote: "Counted from {start} to {end}{suffix}",
    withEndSuffix: ", including the end date.",
    withoutEndSuffix: ", excluding the end date.",
    emptyTitle: "Count result",
    emptyDescription: "Select two dates to see how many days are between them."
  }
} as const;

export function DaysBetweenDatesCalculator() {
  const { locale } = useLocale();
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
