import { BriefcaseBusiness, CheckCircle2, CircleDollarSign, Info, Loader2 } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { calculateFreelanceRate, type FreelanceRateResponse } from "../../services/workApi";

type FreelanceRateData = FreelanceRateResponse["data"];

const numberFormatter = new Intl.NumberFormat("es-CO", {
  maximumFractionDigits: 0
});

const decimalFormatter = new Intl.NumberFormat("es-CO", {
  maximumFractionDigits: 2
});

const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0
});

function parseMoney(value: string) {
  const normalized = value.replace(/[^\d]/g, "");
  return normalized.length > 0 ? Number(normalized) : 0;
}

function formatMoneyInput(value: string) {
  const normalized = value.replace(/[^\d]/g, "");
  return normalized.length > 0 ? numberFormatter.format(Number(normalized)) : "";
}

function parseNumber(value: string) {
  const normalized = value.replace(",", ".").replace(/[^\d.]/g, "");
  return normalized.length > 0 ? Number(normalized) : 0;
}

function formatMoney(value: number) {
  return currencyFormatter.format(value);
}

function formatDecimal(value: number) {
  return decimalFormatter.format(value);
}

export function FreelanceRateCalculator() {
  const [desiredMonthlyIncome, setDesiredMonthlyIncome] = useState("5.000.000");
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState("5");
  const [hoursPerDay, setHoursPerDay] = useState("6");
  const [safetyMarginPercentage, setSafetyMarginPercentage] = useState("20");
  const [result, setResult] = useState<FreelanceRateData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const desiredMonthlyIncomeValue = parseMoney(desiredMonthlyIncome);
    const workDaysPerWeekValue = Number(workDaysPerWeek);
    const hoursPerDayValue = parseNumber(hoursPerDay);
    const safetyMarginPercentageValue = parseNumber(safetyMarginPercentage);

    if (desiredMonthlyIncomeValue <= 0) {
      setError("Ingresa cuánto quieres ganar al mes.");
      return;
    }

    if (!Number.isInteger(workDaysPerWeekValue) || workDaysPerWeekValue < 1 || workDaysPerWeekValue > 7) {
      setError("Elige entre 1 y 7 días de trabajo por semana.");
      return;
    }

    if (hoursPerDayValue <= 0 || hoursPerDayValue > 24) {
      setError("Ingresa horas por día entre 1 y 24.");
      return;
    }

    if (safetyMarginPercentageValue < 0 || safetyMarginPercentageValue > 300) {
      setError("El margen debe estar entre 0% y 300%.");
      return;
    }

    setIsLoading(true);

    try {
      const data = await calculateFreelanceRate({
        desiredMonthlyIncome: desiredMonthlyIncomeValue,
        workDaysPerWeek: workDaysPerWeekValue,
        hoursPerDay: hoursPerDayValue,
        safetyMarginPercentage: safetyMarginPercentageValue,
        currency: "COP"
      });
      setResult(data);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "No se pudo calcular la tarifa freelance.");
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setDesiredMonthlyIncome("5.000.000");
    setWorkDaysPerWeek("5");
    setHoursPerDay("6");
    setSafetyMarginPercentage("20");
    setResult(null);
    setError("");
  }

  return (
    <div className="calculator-layout">
      <form className="calculator-card" onSubmit={handleSubmit}>
        <div className="calculator-card__header">
          <div>
            <p className="section__kicker">Calculadora</p>
            <h2>Cuánto cobrar por hora</h2>
          </div>
          <span>
            <BriefcaseBusiness size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span>
            Cuánto quieres ganar al mes <span className="required-mark">*</span>
          </span>
          <div className="money-input">
            <span>$</span>
            <input
              inputMode="numeric"
              onChange={(event) => setDesiredMonthlyIncome(formatMoneyInput(event.target.value))}
              placeholder="5.000.000"
              required
              type="text"
              value={desiredMonthlyIncome}
            />
            <strong>COP</strong>
          </div>
          <small>Es la meta mensual que quieres lograr con tu trabajo independiente.</small>
        </label>

        <div className="form-grid">
          <label className="field">
            <span>
              Días por semana <span className="required-mark">*</span>
            </span>
            <input
              inputMode="numeric"
              max={7}
              min={1}
              onChange={(event) => setWorkDaysPerWeek(event.target.value)}
              required
              type="number"
              value={workDaysPerWeek}
            />
          </label>

          <label className="field">
            <span>
              Horas por día <span className="required-mark">*</span>
            </span>
            <input
              inputMode="decimal"
              max={24}
              min={1}
              onChange={(event) => setHoursPerDay(event.target.value)}
              required
              type="number"
              value={hoursPerDay}
            />
          </label>
        </div>

        <label className="field field--spaced">
          <span className="field-label">
            Margen de seguridad
            <span className="info-tooltip">
              <Info size={15} strokeWidth={2.1} />
              <span role="tooltip">
                Es un extra sobre tu meta mensual para cubrir imprevistos, semanas flojas, ajustes o
                negociación con clientes. Puedes dejarlo en 0 si quieres ver la tarifa mínima.
              </span>
            </span>
          </span>
          <div className="rate-input">
            <input
              inputMode="decimal"
              onChange={(event) => setSafetyMarginPercentage(event.target.value)}
              placeholder="20"
              type="text"
              value={safetyMarginPercentage}
            />
            <strong>%</strong>
          </div>
        </label>

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>La tarifa por hora se calcula con las horas que realmente quieres trabajar y cobrar.</span>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-action" disabled={isLoading} type="submit">
          {isLoading ? <Loader2 className="spin" size={18} /> : <CircleDollarSign size={18} />}
          Calcular cuánto cobrar
        </button>

        <button className="secondary-action" onClick={handleReset} type="button">
          Restablecer
        </button>
      </form>

      {result ? (
        <aside className="result-panel">
          <div className="result-panel__hero">
            <p>Tarifa sugerida por hora</p>
            <strong>{formatMoney(result.result.suggestedHourlyRate)}</strong>
            <span>Meta mensual con margen: {formatMoney(result.result.targetMonthlyRevenue)}</span>
          </div>

          <div className="result-breakdown">
            <div className="result-item">
              <span>Tarifa mínima por hora</span>
              <strong>{formatMoney(result.result.minimumHourlyRate)}</strong>
            </div>
            <div className="result-item">
              <span>Tarifa diaria sugerida</span>
              <strong>{formatMoney(result.result.suggestedDailyRate)}</strong>
            </div>
            <div className="result-item">
              <span>Tarifa semanal sugerida</span>
              <strong>{formatMoney(result.result.suggestedWeeklyRate)}</strong>
            </div>
            <div className="result-item">
              <span>Horas al mes</span>
              <strong>{formatDecimal(result.result.monthlyWorkingHours)}</strong>
            </div>
            <div className="result-item">
              <span>Horas por semana</span>
              <strong>{formatDecimal(result.result.weeklyWorkingHours)}</strong>
            </div>
            <div className="result-item result-item--strong">
              <span>Margen agregado</span>
              <strong>{formatMoney(result.result.safetyMarginAmount)}</strong>
            </div>
          </div>

          <div className="rules-note">
            <CheckCircle2 size={18} strokeWidth={2.1} />
            <p>
              Se usaron {result.input.workDaysPerWeek} días por semana, {formatDecimal(result.input.hoursPerDay)} horas
              al día y {result.rules.weeksPerMonth} semanas promedio por mes.
            </p>
          </div>

          <p className="disclaimer">
            Resultado estimado. No incluye impuestos, comisiones de plataformas, riesgo del cliente,
            cambios de alcance ni asesoría contable o legal.
          </p>
        </aside>
      ) : (
        <aside className="result-panel result-panel--empty">
          <div className="result-empty">
            <BriefcaseBusiness size={34} strokeWidth={2.1} />
            <h2>Resultado freelance</h2>
            <p>Ingresa tu meta mensual y tu ritmo de trabajo para ver cuánto cobrar por hora.</p>
          </div>
        </aside>
      )}
    </div>
  );
}
