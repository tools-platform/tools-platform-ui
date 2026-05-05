import { BriefcaseBusiness, CheckCircle2, CircleDollarSign, Info, Loader2, Pencil } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import {
  calculateEmployeeSalaryEquivalent,
  type EmployeeSalaryEquivalentResponse
} from "../../services/workApi";

type EmployeeSalaryEquivalentData = EmployeeSalaryEquivalentResponse["data"];

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

function formatMoney(value: number) {
  return currencyFormatter.format(value);
}

function formatDecimal(value: number) {
  return decimalFormatter.format(value);
}

function formatRate(value: number) {
  return `${numberFormatter.format(value * 100)}%`;
}

function buildPayrollYears(currentYear: number) {
  const years: number[] = [];

  for (let year = currentYear; year >= 2024; year -= 1) {
    years.push(year);
  }

  return years;
}

export function EmployeeSalaryEquivalentCalculator() {
  const currentPayrollYear = new Date().getFullYear();
  const payrollYears = useMemo(() => buildPayrollYears(currentPayrollYear), [currentPayrollYear]);
  const [hourlyRate, setHourlyRate] = useState("40.000");
  const [year, setYear] = useState(currentPayrollYear.toString());
  const [isYearEditable, setIsYearEditable] = useState(false);
  const [weeklyHours, setWeeklyHours] = useState("30");
  const [result, setResult] = useState<EmployeeSalaryEquivalentData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  const previewHourlyRate = useMemo(() => parseMoney(hourlyRate), [hourlyRate]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const hourlyRateValue = parseMoney(hourlyRate);
    const yearValue = Number(year);
    const weeklyHoursValue = Number(weeklyHours);

    if (hourlyRateValue <= 0) {
      setError("Ingresa cuánto cobras por hora.");
      return;
    }

    if (!Number.isInteger(yearValue) || yearValue < 2024 || yearValue > currentPayrollYear) {
      setError(`Ingresa un año entre 2024 y ${currentPayrollYear}.`);
      return;
    }

    if (!Number.isFinite(weeklyHoursValue) || weeklyHoursValue <= 0 || weeklyHoursValue > 168) {
      setError("Ingresa horas por semana entre 1 y 168.");
      return;
    }

    setIsLoading(true);

    try {
      const data = await calculateEmployeeSalaryEquivalent({
        hourlyRate: hourlyRateValue,
        weeklyHours: weeklyHoursValue,
        year: yearValue
      });

      setResult(data);
      scrollToResultOnMobile();
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "No se pudo calcular el sueldo equivalente."
      );
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setHourlyRate("40.000");
    setYear(currentPayrollYear.toString());
    setIsYearEditable(false);
    setWeeklyHours("30");
    setResult(null);
    setError("");
  }

  return (
    <div className="calculator-layout">
      <form className="calculator-card" onSubmit={handleSubmit}>
        <div className="calculator-card__header">
          <div>
            <p className="section__kicker">Calculadora</p>
            <h2>Sueldo equivalente</h2>
          </div>
          <span>
            <BriefcaseBusiness size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span>
            Cuánto cobras por hora <span className="required-mark">*</span>
          </span>
          <div className="money-input">
            <span>$</span>
            <input
              inputMode="numeric"
              onChange={(event) => setHourlyRate(formatMoneyInput(event.target.value))}
              placeholder="40.000"
              required
              type="text"
              value={hourlyRate}
            />
            <strong>COP</strong>
          </div>
          <small>Es el valor que facturas o cobras por cada hora de trabajo independiente.</small>
        </label>

        <div className="form-grid form-grid--single">
          <div className="form-grid form-grid--compact">
            <label className="field">
              <span className="field-label">
                Año de reglas <span className="required-mark">*</span>
                <span className="info-tooltip">
                  <Info size={15} strokeWidth={2.1} />
                  <span role="tooltip">
                    Lo usamos para aplicar los descuentos y umbrales legales vigentes de ese año en Colombia.
                  </span>
                </span>
              </span>
              <div className="year-input">
                <select
                  disabled={!isYearEditable}
                  onChange={(event) => setYear(event.target.value)}
                  required
                  value={year}
                >
                  {payrollYears.map((payrollYear) => (
                    <option key={payrollYear} value={payrollYear}>
                      {payrollYear}
                    </option>
                  ))}
                </select>
                <button
                  aria-label="Editar año de reglas"
                  onClick={() => setIsYearEditable((isEditable) => !isEditable)}
                  title="Editar año"
                  type="button"
                >
                  <Pencil size={15} strokeWidth={2.1} />
                </button>
              </div>
            </label>

            <label className="field">
              <span className="field-label">
                Horas por semana <span className="required-mark">*</span>
                <span className="info-tooltip">
                  <Info size={15} strokeWidth={2.1} />
                  <span role="tooltip">
                    Usa las horas reales que sí trabajas y cobras cada semana. Con eso proyectamos el equivalente como sueldo de empleado.
                  </span>
                </span>
              </span>
              <input
                className="input--compact"
                inputMode="decimal"
                max={168}
                min={1}
                onChange={(event) => setWeeklyHours(event.target.value)}
                required
                type="number"
                value={weeklyHours}
              />
            </label>
          </div>
        </div>

        {previewHourlyRate > 0 ? (
          <div className="calculator-hint">
            <Info size={16} strokeWidth={2.1} />
            <span>
              Tomamos {formatMoney(previewHourlyRate)} por hora y {weeklyHours} horas semanales para
              proyectarlo como sueldo de empleado en Colombia con reglas de {year}.
            </span>
          </div>
        ) : null}

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-action" disabled={isLoading} type="submit">
          {isLoading ? <Loader2 className="spin" size={18} /> : <CircleDollarSign size={18} />}
          Calcular sueldo equivalente
        </button>

        <button className="secondary-action" onClick={handleReset} type="button">
          Restablecer
        </button>
      </form>

      {result ? (
        <aside className="result-panel" ref={resultRef}>
          <div className="result-panel__hero">
            <p>Neto mensual estimado como empleado</p>
            <strong>{formatMoney(result.result.netMonthlyEquivalentSalary)}</strong>
            <span>Bruto mensual equivalente: {formatMoney(result.result.grossMonthlyEquivalentSalary)}</span>
          </div>

          <div className="result-breakdown">
            <div className="result-item">
              <span>Ingreso semanal actual</span>
              <strong>{formatMoney(result.result.weeklyIndependentIncome)}</strong>
            </div>
            <div className="result-item">
              <span>Sueldo quincenal bruto</span>
              <strong>{formatMoney(result.result.grossBiweeklyEquivalentSalary)}</strong>
            </div>
            <div className="result-item">
              <span>Sueldo quincenal neto</span>
              <strong>{formatMoney(result.result.netBiweeklyEquivalentSalary)}</strong>
            </div>
            <div className="result-item">
              <span>Sueldo mensual bruto</span>
              <strong>{formatMoney(result.result.grossMonthlyEquivalentSalary)}</strong>
            </div>
            <div className="result-item">
              <span>Sueldo anual bruto</span>
              <strong>{formatMoney(result.result.grossAnnualEquivalentSalary)}</strong>
            </div>
            <div className="result-item result-item--strong">
              <span>Total descuentos de empleado</span>
              <strong>{formatMoney(result.deductions.totalDeductions)}</strong>
            </div>
          </div>

          <div className="rules-note">
            <CheckCircle2 size={18} strokeWidth={2.1} />
            <p>
              Se usaron {formatDecimal(result.input.weeklyHours)} horas por semana,{" "}
              {formatDecimal(result.result.monthlyWorkingHours)} horas promedio al mes y reglas de {result.year}.
            </p>
          </div>

          <div className="rules-grid">
            <span>Salud: {formatRate(result.rules.employeeHealthRate)}</span>
            <span>Pensión: {formatRate(result.rules.employeePensionRate)}</span>
            <span>Solidaridad: {formatRate(result.rules.solidarityPensionFundRate)}</span>
          </div>

          <p className="disclaimer">{result.disclaimer}</p>
        </aside>
      ) : (
        <aside className="result-panel result-panel--empty" ref={resultRef}>
          <div className="result-empty">
            <BriefcaseBusiness size={34} strokeWidth={2.1} />
            <h2>Tu equivalencia aparecerá aquí</h2>
            <p>
              Ingresa tu tarifa por hora y tus horas semanales para ver cuánto equivaldría como
              sueldo de empleado.
            </p>
          </div>
        </aside>
      )}
    </div>
  );
}

