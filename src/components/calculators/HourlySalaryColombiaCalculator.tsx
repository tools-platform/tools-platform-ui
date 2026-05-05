import { Calculator, CheckCircle2, ChevronDown, CircleDollarSign, Info, Loader2, Pencil } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import {
  calculateHourlySalaryColombia,
  type HourlySalaryColombiaResponse,
  type HourlySalaryType
} from "../../services/financeApi";

type HourlySalaryData = HourlySalaryColombiaResponse["data"];

const numberFormatter = new Intl.NumberFormat("es-CO", {
  maximumFractionDigits: 0
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

function getCurrentColombiaDate() {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  const parts = formatter.formatToParts(new Date());
  const year = parts.find((part) => part.type === "year")?.value ?? "2026";
  const month = parts.find((part) => part.type === "month")?.value ?? "01";
  const day = parts.find((part) => part.type === "day")?.value ?? "01";

  return `${year}-${month}-${day}`;
}

function getLegalWeeklyHours(currentDate: string) {
  if (currentDate >= "2026-07-15") {
    return 42;
  }

  if (currentDate >= "2025-07-15") {
    return 44;
  }

  if (currentDate >= "2024-07-15") {
    return 46;
  }

  if (currentDate >= "2023-07-15") {
    return 47;
  }

  return 48;
}

function formatMoney(value: number) {
  return currencyFormatter.format(value);
}

function formatRate(value: number) {
  return `${numberFormatter.format(value * 100)}%`;
}

function getSalaryTypeLabel(salaryType: HourlySalaryType) {
  return salaryType === "gross" ? "Bruto" : "Neto";
}

function buildPayrollYears(currentYear: number) {
  const years: number[] = [];

  for (let year = currentYear; year >= 2024; year -= 1) {
    years.push(year);
  }

  return years;
}

export function HourlySalaryColombiaCalculator() {
  const currentColombiaDate = useMemo(() => getCurrentColombiaDate(), []);
  const currentPayrollYear = Number(currentColombiaDate.slice(0, 4));
  const payrollYears = useMemo(() => buildPayrollYears(currentPayrollYear), [currentPayrollYear]);
  const defaultLegalWeeklyHours = useMemo(() => getLegalWeeklyHours(currentColombiaDate), [currentColombiaDate]);
  const [monthlySalary, setMonthlySalary] = useState("2.500.000");
  const [year, setYear] = useState(currentPayrollYear.toString());
  const [isYearEditable, setIsYearEditable] = useState(false);
  const [salaryType, setSalaryType] = useState<HourlySalaryType>("gross");
  const [weeklyHours, setWeeklyHours] = useState(defaultLegalWeeklyHours.toString());
  const [isWeeklyHoursEditable, setIsWeeklyHoursEditable] = useState(false);
  const [result, setResult] = useState<HourlySalaryData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  const previewSalary = useMemo(() => parseMoney(monthlySalary), [monthlySalary]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const salaryValue = parseMoney(monthlySalary);
    const yearValue = Number(year);
    const weeklyHoursValue = Number(weeklyHours);

    if (salaryValue <= 0) {
      setError("Ingresa un salario mensual mayor a cero.");
      return;
    }

    if (!Number.isInteger(yearValue) || yearValue < 2024 || yearValue > currentPayrollYear) {
      setError(`Ingresa un año entre 2024 y ${currentPayrollYear}.`);
      return;
    }

    if (!Number.isFinite(weeklyHoursValue) || weeklyHoursValue <= 0 || weeklyHoursValue > 84) {
      setError("Ingresa horas semanales entre 1 y 84.");
      return;
    }

    setIsLoading(true);

    try {
      const data = await calculateHourlySalaryColombia({
        monthlySalary: salaryValue,
        salaryType,
        weeklyHours: weeklyHoursValue,
        year: yearValue
      });

      setResult(data);
      scrollToResultOnMobile();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "No se pudo calcular el salario por hora.");
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }

  function handleWeeklyHoursEditToggle() {
    setIsWeeklyHoursEditable((isEditable) => {
      const nextValue = !isEditable;

      if (!nextValue) {
        setWeeklyHours(defaultLegalWeeklyHours.toString());
      }

      return nextValue;
    });
  }

  function handleReset() {
    setMonthlySalary("2.500.000");
    setYear(currentPayrollYear.toString());
    setIsYearEditable(false);
    setSalaryType("gross");
    setWeeklyHours(defaultLegalWeeklyHours.toString());
    setIsWeeklyHoursEditable(false);
    setResult(null);
    setError("");
  }

  return (
    <div className="calculator-layout">
      <form className="calculator-card" onSubmit={handleSubmit}>
        <div className="calculator-card__header">
          <div>
            <p className="section__kicker">Calculadora</p>
            <h2>Salario por hora</h2>
          </div>
          <span>
            <Calculator size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span>
            Salario mensual <span className="required-mark">*</span>
          </span>
          <div className="money-input">
            <span>$</span>
            <input
              inputMode="numeric"
              onChange={(event) => setMonthlySalary(formatMoneyInput(event.target.value))}
              placeholder="2.500.000"
              required
              type="text"
              value={monthlySalary}
            />
            <strong>COP</strong>
          </div>
          <small>Es el salario mensual que quieres convertir a valor por hora.</small>
        </label>

        <div className="form-grid form-grid--single">
          <div className="form-grid form-grid--compact">
            <label className="field">
              <span className="field-label">
                Año de reglas <span className="required-mark">*</span>
                <span className="info-tooltip">
                  <Info size={15} strokeWidth={2.1} />
                  <span role="tooltip">
                    Lo usamos para aplicar la jornada legal y los límites laborales vigentes de ese año en Colombia.
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
                Horas semanales <span className="required-mark">*</span>
                <span className="info-tooltip">
                  <Info size={15} strokeWidth={2.1} />
                  <span role="tooltip">
                    Por defecto usamos la jornada legal vigente hoy en Colombia. Puedes editarla si tu horario real es
                    distinto.
                  </span>
                </span>
              </span>
              <div className="year-input year-input--manual">
                <input
                  disabled={!isWeeklyHoursEditable}
                  inputMode="numeric"
                  min={1}
                  onChange={(event) => setWeeklyHours(event.target.value)}
                  required
                  type="number"
                  value={weeklyHours}
                />
                <button
                  aria-label="Editar horas semanales"
                  onClick={handleWeeklyHoursEditToggle}
                  title="Editar horas"
                  type="button"
                >
                  <Pencil size={15} strokeWidth={2.1} />
                </button>
              </div>
            </label>
          </div>

          <label className="field">
            <span className="field-label">
              Tipo de cálculo <span className="required-mark">*</span>
              <span className="info-tooltip">
                <Info size={15} strokeWidth={2.1} />
                <span role="tooltip">
                  Bruto divide el salario sin descuentos. Neto descuenta salud, pensión y Fondo de Solidaridad
                  Pensional cuando aplica.
                </span>
              </span>
            </span>
            <span className="select-control">
              <select
                onChange={(event) => setSalaryType(event.target.value as HourlySalaryType)}
                value={salaryType}
              >
                <option value="gross">Bruto</option>
                <option value="net">Neto</option>
              </select>
              <ChevronDown size={18} strokeWidth={2.1} />
            </span>
          </label>
        </div>

        {previewSalary > 0 ? (
          <div className="calculator-hint">
            <Info size={16} strokeWidth={2.1} />
            <span>
              Vas a calcular sobre {formatMoney(previewSalary)} al mes con {weeklyHours} horas semanales y reglas de {year}.{" "}
              {salaryType === "net"
                ? "El neto estima descuentos legales."
                : "El bruto no descuenta nómina."}
            </span>
          </div>
        ) : null}

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-action" disabled={isLoading} type="submit">
          {isLoading ? <Loader2 className="spin" size={18} /> : <CircleDollarSign size={18} />}
          Calcular salario por hora
        </button>
        <button className="secondary-action" onClick={handleReset} type="button">
          Restablecer
        </button>
      </form>

      <section className={result ? "result-panel" : "result-panel result-panel--empty"} ref={resultRef}>
        {result ? (
          <>
            <div className="result-panel__hero">
              <p>{result.input.salaryType === "gross" ? "Valor bruto por hora" : "Valor neto por hora"}</p>
              <strong>{formatMoney(result.result.hourlySalary)}</strong>
              <span>Por día laboral: {formatMoney(result.result.dailySalary)}</span>
            </div>

            <div className="result-breakdown">
              <ResultItem label="Salario mensual base" value={result.result.baseMonthlySalary} />
              <ResultItem label="Salario mensual usado" value={result.result.monthlySalaryUsed} />
              <ResultTextItem label="Horas semanales" value={`${result.result.weeklyHours}`} />
              <ResultTextItem label="Horas mensuales" value={`${result.result.monthlyHours}`} />
              {result.deductions.applies ? (
                <ResultItem label="Salud 4%" value={result.deductions.healthContribution} />
              ) : null}
              {result.deductions.applies ? (
                <ResultItem label="Pensión 4%" value={result.deductions.pensionContribution} />
              ) : null}
              {result.deductions.applies && result.deductions.solidarityPensionFundContribution > 0 ? (
                <ResultItem
                  label="Fondo de solidaridad"
                  value={result.deductions.solidarityPensionFundContribution}
                />
              ) : null}
              <ResultItem
                label={result.deductions.applies ? "Total descuentos" : "Valor por día laboral"}
                value={result.deductions.applies ? result.deductions.totalDeductions : result.result.dailySalary}
                strong
              />
            </div>

            <div className="rules-note">
              <CheckCircle2 size={18} strokeWidth={2.1} />
              <p>
                {result.rules.usedCustomWeeklyHours
                  ? `Usa ${result.result.weeklyHours} horas semanales personalizadas. La referencia legal para ${result.year} es ${result.rules.legalWeeklyHours} horas.`
                  : `Usa la jornada legal de referencia para ${result.year}: ${result.rules.legalWeeklyHours} horas semanales.`}
              </p>
            </div>

            <div className="rules-grid">
              <span>Tipo de cálculo: {getSalaryTypeLabel(result.input.salaryType)}</span>
              <span>Salud: {formatRate(result.rules.employeeHealthRate)}</span>
              <span>Pensión: {formatRate(result.rules.employeePensionRate)}</span>
              {result.deductions.applies ? (
                <span>Solidaridad: {formatRate(result.rules.solidarityPensionFundRate)}</span>
              ) : null}
            </div>

            <p className="disclaimer">{result.disclaimer}</p>
          </>
        ) : (
          <div className="result-empty">
            <CircleDollarSign size={30} strokeWidth={2.05} />
            <h2>Tu valor por hora aparecerá aquí</h2>
            <p>
              Ingresa el salario mensual, elige si quieres ver bruto o neto y calcula para obtener
              la conversión por hora.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

function ResultItem({ label, value, strong = false }: { label: string; value: number; strong?: boolean }) {
  return (
    <div className={strong ? "result-item result-item--strong" : "result-item"}>
      <span>{label}</span>
      <strong>{formatMoney(value)}</strong>
    </div>
  );
}

function ResultTextItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="result-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

