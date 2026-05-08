import { CalendarDays, CheckCircle2, Info } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { DateField } from "../DateField";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

function parseDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

const copy = {
  es: {
    kicker: "Contador",
    title: "Días hasta una fecha",
    targetDate: "Fecha objetivo",
    targetDateAria: "Seleccionar fecha objetivo",
    includeToday: "Incluir el día de hoy",
    includeTodayHelp: "Actívalo si quieres contar hoy como parte del periodo.",
    missingDate: "Selecciona una fecha objetivo.",
    pastDate: "La fecha objetivo debe ser hoy o una fecha futura.",
    hint: "Cuenta cuántos días faltan para una fecha, evento, entrega o plazo personal.",
    submit: "Contar días restantes",
    reset: "Restablecer",
    hero: "Días restantes",
    weeks: "Semanas aproximadas",
    fullWeeks: "Semanas completas",
    remainingDays: "Días restantes",
    target: "Fecha objetivo",
    includesToday: "Incluye hoy",
    yes: "Sí",
    no: "No",
    rulesNote: "Conteo de días calendario hasta {date}.",
    disclaimer: "Conteo informativo de días calendario. No evalúa días hábiles, festivos ni vencimientos legales.",
    emptyTitle: "El conteo aparecerá aquí",
    emptyDescription: "Selecciona una fecha futura para ver cuántos días faltan."
  },
  en: {
    kicker: "Counter",
    title: "Days until a date",
    targetDate: "Target date",
    targetDateAria: "Select target date",
    includeToday: "Include today",
    includeTodayHelp: "Turn it on if today should count as part of the period.",
    missingDate: "Select a target date.",
    pastDate: "The target date must be today or a future date.",
    hint: "Count how many days are left until a date, event, delivery, or personal deadline.",
    submit: "Count days left",
    reset: "Reset",
    hero: "Days left",
    weeks: "Approximate weeks",
    fullWeeks: "Full weeks",
    remainingDays: "Remaining days",
    target: "Target date",
    includesToday: "Includes today",
    yes: "Yes",
    no: "No",
    rulesNote: "Calendar day count until {date}.",
    disclaimer: "Informational calendar day count. It does not evaluate business days, holidays, or legal deadlines.",
    emptyTitle: "The count will appear here",
    emptyDescription: "Select a future date to see how many days are left."
  }
} as const;

export function DaysUntilDateCalculator() {
  const { locale } = useLocale();
  const text = copy[locale];
  const today = toDateKey(new Date());
  const defaultTargetDate = toDateKey(addDays(new Date(), 30));
  const [targetDate, setTargetDate] = useState(defaultTargetDate);
  const [includeToday, setIncludeToday] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    targetDate: string;
    days: number;
    fullWeeks: number;
    remainingDays: number;
    weeks: number;
    includeToday: boolean;
  } | null>(null);
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();
  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(locale === "es" ? "es-CO" : "en-US", { maximumFractionDigits: 2 }),
    [locale]
  );

  function formatDate(value: string) {
    const [year, month, day] = value.split("-").map(Number);
    return new Intl.DateTimeFormat(locale === "es" ? "es-CO" : "en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(new Date(year, month - 1, day));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!targetDate) {
      setError(text.missingDate);
      return;
    }

    if (targetDate < today) {
      setError(text.pastDate);
      return;
    }

    const start = parseDate(today);
    const end = parseDate(targetDate);
    const diff = Math.round((end.getTime() - start.getTime()) / 86_400_000);
    const days = diff + (includeToday ? 1 : 0);

    setResult({
      targetDate,
      days,
      fullWeeks: Math.floor(days / 7),
      remainingDays: days % 7,
      weeks: days / 7,
      includeToday
    });
    scrollToResultOnMobile();
  }

  function handleReset() {
    setTargetDate(defaultTargetDate);
    setIncludeToday(false);
    setError("");
    setResult(null);
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
            <CalendarDays size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span>
            {text.targetDate} <span className="required-mark">*</span>
          </span>
          <DateField ariaLabel={text.targetDateAria} onChange={setTargetDate} value={targetDate} />
        </label>

        <label className="toggle-field">
          <input checked={includeToday} onChange={(event) => setIncludeToday(event.target.checked)} type="checkbox" />
          <span>
            <strong>{text.includeToday}</strong>
            <small>{text.includeTodayHelp}</small>
          </span>
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>{text.hint}</span>
        </div>

        <button className="primary-action" type="submit">
          <CalendarDays size={18} />
          {text.submit}
        </button>

        <button className="secondary-action" onClick={handleReset} type="button">
          {text.reset}
        </button>
      </form>

      {result ? (
        <aside className="result-panel" ref={resultRef}>
          <div className="result-panel__hero">
            <p>{text.hero}</p>
            <strong>{numberFormatter.format(result.days)}</strong>
            <span>{numberFormatter.format(result.weeks)} {text.weeks}</span>
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
              <span>{text.target}</span>
              <strong>{formatDate(result.targetDate)}</strong>
            </div>
            <div className="result-item result-item--strong">
              <span>{text.includesToday}</span>
              <strong>{result.includeToday ? text.yes : text.no}</strong>
            </div>
          </div>

          <div className="rules-note">
            <CheckCircle2 size={18} strokeWidth={2.1} />
            <p>{text.rulesNote.replace("{date}", formatDate(result.targetDate))}</p>
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
