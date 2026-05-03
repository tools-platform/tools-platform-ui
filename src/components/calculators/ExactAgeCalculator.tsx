import { CalendarDays, CheckCircle2, Clock3, Info, Loader2 } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { DateField } from "../DateField";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { calculateExactAge, type ExactAgeResponse } from "../../services/timeApi";

type ExactAgeData = ExactAgeResponse["data"];

const numberFormatter = new Intl.NumberFormat("es-CO", {
  maximumFractionDigits: 0
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

function oneYearAgoDate() {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);

  return toDateKey(date);
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

export function ExactAgeCalculator() {
  const [birthDate, setBirthDate] = useState(oneYearAgoDate());
  const [referenceDate, setReferenceDate] = useState(todayDate());
  const [result, setResult] = useState<ExactAgeData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!birthDate || !referenceDate) {
      setError("Selecciona la fecha de nacimiento y la fecha de cálculo.");
      return;
    }

    if (birthDate > referenceDate) {
      setError("La fecha de nacimiento no puede ser posterior a la fecha de cálculo.");
      return;
    }

    setIsLoading(true);

    try {
      const data = await calculateExactAge({
        birthDate,
        referenceDate
      });
      setResult(data);
      scrollToResultOnMobile();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "No se pudo calcular la edad.");
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setBirthDate(oneYearAgoDate());
    setReferenceDate(todayDate());
    setResult(null);
    setError("");
  }

  return (
    <div className="calculator-layout">
      <form className="calculator-card" onSubmit={handleSubmit}>
        <div className="calculator-card__header">
          <div>
            <p className="section__kicker">Calculadora</p>
            <h2>Edad exacta</h2>
          </div>
          <span>
            <Clock3 size={20} strokeWidth={2.1} />
          </span>
        </div>

        <div className="form-grid">
          <label className="field">
            <span>
              Fecha de nacimiento <span className="required-mark">*</span>
            </span>
            <DateField ariaLabel="Seleccionar fecha de nacimiento" onChange={setBirthDate} value={birthDate} />
          </label>

          <label className="field">
            <span className="field-label">
              Fecha de cálculo <span className="required-mark">*</span>
              <span className="info-tooltip">
                <Info size={15} strokeWidth={2.1} />
                <span role="tooltip">
                  Usamos esta fecha para calcular la edad exacta. Por defecto es hoy, pero puedes cambiarla si
                  necesitas saber la edad en otra fecha.
                </span>
              </span>
            </span>
            <DateField ariaLabel="Seleccionar fecha de cálculo" onChange={setReferenceDate} value={referenceDate} />
          </label>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>Calcula años, meses y días cumplidos entre la fecha de nacimiento y la fecha elegida.</span>
        </div>

        <button className="primary-action" disabled={isLoading} type="submit">
          {isLoading ? <Loader2 className="spin" size={18} /> : <CalendarDays size={18} />}
          Calcular edad
        </button>

        <button className="secondary-action" onClick={handleReset} type="button">
          Restablecer
        </button>
      </form>

      {result ? (
        <aside className="result-panel" ref={resultRef}>
          <div className="result-panel__hero">
            <p>Edad exacta</p>
            <strong>
              {result.result.years} años, {result.result.months} meses y {result.result.days} días
            </strong>
            <span>{formatNumber(result.result.totalDays)} días vividos</span>
          </div>

          <div className="result-breakdown">
            <div className="result-item">
              <span>Años</span>
              <strong>{result.result.years}</strong>
            </div>
            <div className="result-item">
              <span>Meses adicionales</span>
              <strong>{result.result.months}</strong>
            </div>
            <div className="result-item">
              <span>Días adicionales</span>
              <strong>{result.result.days}</strong>
            </div>
            <div className="result-item">
              <span>Meses totales</span>
              <strong>{formatNumber(result.result.totalMonths)}</strong>
            </div>
            <div className="result-item result-item--strong">
              <span>Próximo cumpleaños</span>
              <strong>{formatDate(result.result.nextBirthdayDate)}</strong>
            </div>
            <div className="result-item result-item--strong">
              <span>Días para cumpleaños</span>
              <strong>{result.result.daysUntilNextBirthday}</strong>
            </div>
          </div>

          <div className="rules-note">
            <CheckCircle2 size={18} strokeWidth={2.1} />
            <p>
              Se calculó desde {formatDate(result.input.birthDate)} hasta {formatDate(result.input.referenceDate)}.
              {result.result.isBirthdayToday ? " La fecha de cálculo coincide con el cumpleaños." : ""}
            </p>
          </div>

          <p className="disclaimer">{result.disclaimer}</p>
        </aside>
      ) : (
        <aside className="result-panel result-panel--empty" ref={resultRef}>
          <div className="result-empty">
            <Clock3 size={34} strokeWidth={2.1} />
            <h2>Resultado de edad</h2>
            <p>Selecciona la fecha de nacimiento para ver la edad exacta.</p>
          </div>
        </aside>
      )}
    </div>
  );
}
