import { CalendarDays, CheckCircle2, Info, Loader2 } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { DateField } from "../DateField";
import { calculateDaysBetweenDates, type DaysBetweenDatesResponse } from "../../services/timeApi";

type DaysBetweenDatesData = DaysBetweenDatesResponse["data"];

const numberFormatter = new Intl.NumberFormat("es-CO", {
  maximumFractionDigits: 2
});

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

function formatNumber(value: number) {
  return numberFormatter.format(value);
}

function formatDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) {
    return value;
  }

  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(new Date(year, month - 1, day));
}

export function DaysBetweenDatesCalculator() {
  const [startDate, setStartDate] = useState(todayDate());
  const [endDate, setEndDate] = useState(toDateKey(addDays(new Date(), 17)));
  const [includeEndDate, setIncludeEndDate] = useState(false);
  const [result, setResult] = useState<DaysBetweenDatesData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!startDate || !endDate) {
      setError("Selecciona la fecha inicial y la fecha final.");
      return;
    }

    if (endDate < startDate) {
      setError("La fecha final debe ser igual o posterior a la fecha inicial.");
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
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "No se pudieron contar los días.");
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

  return (
    <div className="calculator-layout">
      <form className="calculator-card" onSubmit={handleSubmit}>
        <div className="calculator-card__header">
          <div>
            <p className="section__kicker">Contador</p>
            <h2>Días entre fechas</h2>
          </div>
          <span>
            <CalendarDays size={20} strokeWidth={2.1} />
          </span>
        </div>

        <div className="form-grid">
          <label className="field">
            <span>
              Fecha inicial <span className="required-mark">*</span>
            </span>
            <DateField ariaLabel="Seleccionar fecha inicial" onChange={setStartDate} value={startDate} />
          </label>

          <label className="field">
            <span>
              Fecha final <span className="required-mark">*</span>
            </span>
            <DateField ariaLabel="Seleccionar fecha final" onChange={setEndDate} value={endDate} />
          </label>
        </div>

        <label className="toggle-field">
          <input
            checked={includeEndDate}
            onChange={(event) => setIncludeEndDate(event.target.checked)}
            type="checkbox"
          />
          <span>
            <strong>Incluir fecha final</strong>
            <small>Actívalo si quieres contar también el último día del periodo.</small>
          </span>
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>Cuenta días calendario entre dos fechas. No descuenta fines de semana ni festivos.</span>
        </div>

        <button className="primary-action" disabled={isLoading} type="submit">
          {isLoading ? <Loader2 className="spin" size={18} /> : <CalendarDays size={18} />}
          Contar días
        </button>

        <button className="secondary-action" onClick={handleReset} type="button">
          Restablecer
        </button>
      </form>

      {result ? (
        <aside className="result-panel">
          <div className="result-panel__hero">
            <p>Total entre fechas</p>
            <strong>{formatNumber(result.result.days)} días</strong>
            <span>{formatNumber(result.result.weeks)} semanas aproximadas</span>
          </div>

          <div className="result-breakdown">
            <div className="result-item">
              <span>Semanas completas</span>
              <strong>{result.result.fullWeeks}</strong>
            </div>
            <div className="result-item">
              <span>Días restantes</span>
              <strong>{result.result.remainingDays}</strong>
            </div>
            <div className="result-item">
              <span>Diferencia calendario</span>
              <strong>{result.result.calendarDaysDifference}</strong>
            </div>
            <div className="result-item result-item--strong">
              <span>Incluye fecha final</span>
              <strong>{result.input.includeEndDate ? "Sí" : "No"}</strong>
            </div>
          </div>

          <div className="rules-note">
            <CheckCircle2 size={18} strokeWidth={2.1} />
            <p>
              Se contó desde {formatDate(result.input.startDate)} hasta {formatDate(result.input.endDate)}
              {result.input.includeEndDate ? ", incluyendo la fecha final." : ", sin incluir la fecha final."}
            </p>
          </div>

          <p className="disclaimer">{result.disclaimer}</p>
        </aside>
      ) : (
        <aside className="result-panel result-panel--empty">
          <div className="result-empty">
            <CalendarDays size={34} strokeWidth={2.1} />
            <h2>Resultado del conteo</h2>
            <p>Selecciona dos fechas para ver cuántos días hay entre ellas.</p>
          </div>
        </aside>
      )}
    </div>
  );
}
