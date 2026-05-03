import { Calculator, CheckCircle2, CircleDollarSign, Info, Loader2, Pencil } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import {
  calculateEmploymentSettlementColombia,
  type EmploymentContractType,
  type EmploymentSettlementColombiaResponse,
  type TerminationReason
} from "../../services/financeApi";

type SettlementData = EmploymentSettlementColombiaResponse["data"];

const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0
});

const numberFormatter = new Intl.NumberFormat("es-CO", {
  maximumFractionDigits: 2
});

const contractTypes: Array<{ label: string; value: EmploymentContractType }> = [
  { label: "Fijo", value: "fixed_term" },
  { label: "Indefinido", value: "indefinite" },
  { label: "Por obra o labor", value: "work_or_labor" }
];

const terminationReasons: Array<{ label: string; value: TerminationReason }> = [
  { label: "Mutuo acuerdo", value: "mutual_agreement" },
  { label: "Sin justa causa", value: "without_just_cause" },
  { label: "Con justa causa", value: "with_just_cause" },
  { label: "Renuncia voluntaria", value: "voluntary_resignation" }
];

function parseMoney(value: string) {
  const normalized = value.replace(/[^\d]/g, "");
  return normalized.length > 0 ? Number(normalized) : 0;
}

function formatMoneyInput(value: string) {
  const normalized = value.replace(/[^\d]/g, "");
  return normalized.length > 0 ? new Intl.NumberFormat("es-CO").format(Number(normalized)) : "";
}

function formatMoney(value: number) {
  return currencyFormatter.format(value);
}

function todayDate() {
  return new Date().toISOString().slice(0, 10);
}

function buildPayrollYears(currentYear: number) {
  const years: number[] = [];

  for (let year = currentYear; year >= 2024; year -= 1) {
    years.push(year);
  }

  return years;
}

export function EmploymentSettlementColombiaCalculator() {
  const currentPayrollYear = new Date().getFullYear();
  const payrollYears = useMemo(() => buildPayrollYears(currentPayrollYear), [currentPayrollYear]);
  const [monthlySalary, setMonthlySalary] = useState("2.500.000");
  const [employmentStartDate, setEmploymentStartDate] = useState("");
  const [endDate, setEndDate] = useState(todayDate());
  const [contractType, setContractType] = useState<EmploymentContractType>("indefinite");
  const [terminationReason, setTerminationReason] = useState<TerminationReason>("voluntary_resignation");
  const [fixedTermEndDate, setFixedTermEndDate] = useState("");
  const [remainingWorkDays, setRemainingWorkDays] = useState("");
  const [year, setYear] = useState(currentPayrollYear.toString());
  const [isYearEditable, setIsYearEditable] = useState(false);
  const [includeTransportationAllowance, setIncludeTransportationAllowance] = useState(false);
  const [pendingSalaryDays, setPendingSalaryDays] = useState("0");
  const [pendingVacationDays, setPendingVacationDays] = useState("0");
  const [otherEarnings, setOtherEarnings] = useState("0");
  const [otherDeductions, setOtherDeductions] = useState("0");
  const [result, setResult] = useState<SettlementData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const requiresFixedTermEndDate = contractType === "fixed_term" && terminationReason === "without_just_cause";
  const requiresRemainingWorkDays = contractType === "work_or_labor" && terminationReason === "without_just_cause";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const salaryValue = parseMoney(monthlySalary);
    const yearValue = Number(year);
    const pendingSalaryDaysValue = Number(pendingSalaryDays || "0");
    const pendingVacationDaysValue = Number(pendingVacationDays || "0");
    const remainingWorkDaysValue = Number(remainingWorkDays || "0");

    if (salaryValue <= 0) {
      setError("Ingresa un salario mensual mayor a cero.");
      return;
    }

    if (!employmentStartDate || !endDate) {
      setError("Ingresa la fecha de inicio y la fecha de finalización.");
      return;
    }

    if (new Date(endDate) < new Date(employmentStartDate)) {
      setError("La fecha de finalización no puede ser anterior a la fecha de inicio.");
      return;
    }

    if (!Number.isInteger(yearValue) || yearValue < 2024 || yearValue > currentPayrollYear) {
      setError(`Ingresa un año entre 2024 y ${currentPayrollYear}.`);
      return;
    }

    if (requiresFixedTermEndDate && !fixedTermEndDate) {
      setError("Ingresa la fecha pactada de terminación del contrato fijo.");
      return;
    }

    if (requiresRemainingWorkDays && remainingWorkDaysValue <= 0) {
      setError("Ingresa los días de obra o labor que faltaban por ejecutar.");
      return;
    }

    setIsLoading(true);

    try {
      const data = await calculateEmploymentSettlementColombia({
        monthlySalary: salaryValue,
        employmentStartDate,
        endDate,
        contractType,
        terminationReason,
        fixedTermEndDate: requiresFixedTermEndDate ? fixedTermEndDate : undefined,
        remainingWorkDays: requiresRemainingWorkDays ? remainingWorkDaysValue : undefined,
        year: yearValue,
        includeTransportationAllowance,
        pendingSalaryDays: pendingSalaryDaysValue,
        pendingVacationDays: pendingVacationDaysValue,
        otherEarnings: parseMoney(otherEarnings),
        otherDeductions: parseMoney(otherDeductions)
      });
      setResult(data);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "No se pudo calcular la liquidación.");
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="calculator-layout calculator-layout--wide">
      <form className="calculator-card settlement-card" onSubmit={handleSubmit}>
        <div className="calculator-card__header">
          <div>
            <p className="section__kicker">Calculadora</p>
            <h2>Datos de la liquidación</h2>
          </div>
          <span>
            <Calculator size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span>Salario mensual base</span>
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
        </label>

        <div className="form-grid">
          <label className="field">
            <span>Fecha de inicio</span>
            <input
              onChange={(event) => setEmploymentStartDate(event.target.value)}
              required
              type="date"
              value={employmentStartDate}
            />
          </label>

          <label className="field">
            <span>Fecha de finalización</span>
            <input onChange={(event) => setEndDate(event.target.value)} required type="date" value={endDate} />
          </label>
        </div>

        <div className="form-grid">
          <label className="field">
            <span>Tipo de contrato</span>
            <select
              className="plain-select"
              onChange={(event) => setContractType(event.target.value as EmploymentContractType)}
              value={contractType}
            >
              {contractTypes.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Motivo de terminación</span>
            <select
              className="plain-select"
              onChange={(event) => setTerminationReason(event.target.value as TerminationReason)}
              value={terminationReason}
            >
              {terminationReasons.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {requiresFixedTermEndDate ? (
          <label className="field">
            <span>Fecha pactada de terminación</span>
            <input onChange={(event) => setFixedTermEndDate(event.target.value)} required type="date" value={fixedTermEndDate} />
            <small>Solo se pide para contrato fijo terminado sin justa causa.</small>
          </label>
        ) : null}

        {requiresRemainingWorkDays ? (
          <label className="field">
            <span>Días pendientes de obra o labor</span>
            <input
              min="1"
              onChange={(event) => setRemainingWorkDays(event.target.value)}
              required
              type="number"
              value={remainingWorkDays}
            />
            <small>Solo se pide para obra o labor terminada sin justa causa.</small>
          </label>
        ) : null}

        <div className="form-grid">
          <label className="field">
            <span className="field-label">
              Año de reglas
              <span className="info-tooltip">
                <Info size={15} strokeWidth={2.1} />
                <span role="tooltip">
                  Lo usamos para aplicar salario mínimo, auxilio de transporte y límites legales vigentes.
                </span>
              </span>
            </span>
            <div className="year-input">
              <select disabled={!isYearEditable} onChange={(event) => setYear(event.target.value)} value={year}>
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
            <span>Días de salario pendientes</span>
            <input
              max="30"
              min="0"
              onChange={(event) => setPendingSalaryDays(event.target.value)}
              step="0.01"
              type="number"
              value={pendingSalaryDays}
            />
          </label>
        </div>

        <div className="form-grid">
          <label className="field">
            <span>Días de vacaciones pendientes</span>
            <input
              min="0"
              onChange={(event) => setPendingVacationDays(event.target.value)}
              step="0.01"
              type="number"
              value={pendingVacationDays}
            />
          </label>

          <label className="field">
            <span>Pagos adicionales</span>
            <div className="money-input money-input--compact">
              <span>$</span>
              <input
                inputMode="numeric"
                onChange={(event) => setOtherEarnings(formatMoneyInput(event.target.value))}
                placeholder="0"
                type="text"
                value={otherEarnings}
              />
            </div>
          </label>
        </div>

        <label className="field">
          <span>Deducciones de nómina</span>
          <div className="money-input money-input--compact">
            <span>$</span>
            <input
              inputMode="numeric"
              onChange={(event) => setOtherDeductions(formatMoneyInput(event.target.value))}
              placeholder="0"
              type="text"
              value={otherDeductions}
            />
          </div>
        </label>

        <label className="toggle-field">
          <input
            checked={includeTransportationAllowance}
            onChange={(event) => setIncludeTransportationAllowance(event.target.checked)}
            type="checkbox"
          />
          <span>
            <strong>Incluir auxilio de transporte si aplica</strong>
            <small>Validaremos si el salario cumple el límite legal para usarlo en prestaciones.</small>
          </span>
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-action" disabled={isLoading} type="submit">
          {isLoading ? <Loader2 className="spin" size={18} /> : <CircleDollarSign size={18} />}
          Calcular liquidación
        </button>
      </form>

      <section className={result ? "result-panel" : "result-panel result-panel--empty"}>
        {result ? (
          <>
            <div className="result-panel__hero">
              <p>Total estimado de liquidación</p>
              <strong>{formatMoney(result.result.totalSettlement)}</strong>
              <span>
                {result.compensation.applies
                  ? `Incluye indemnización de ${formatMoney(result.compensation.amount)}`
                  : "No incluye indemnización por despido sin justa causa"}
              </span>
            </div>

            <div className="result-breakdown">
              <ResultItem label="Cesantías" value={result.result.severancePay} />
              <ResultItem label="Intereses de cesantías" value={result.result.severanceInterest} />
              <ResultItem label="Prima de servicios" value={result.result.serviceBonus} />
              <ResultItem label="Vacaciones pendientes" value={result.result.vacationPay} />
              <ResultItem label="Salario pendiente" value={result.result.pendingSalary} />
              {result.input.includeTransportationAllowance ? (
                <ResultItem label="Auxilio transporte" value={result.result.transportationAllowance} />
              ) : null}
              {result.result.otherEarnings > 0 ? <ResultItem label="Pagos adicionales" value={result.result.otherEarnings} /> : null}
              {result.result.otherDeductions > 0 ? <ResultItem label="Deducciones" value={result.result.otherDeductions} /> : null}
              {result.compensation.applies ? (
                <ResultItem label="Indemnización" value={result.result.dismissalCompensation} />
              ) : null}
              <ResultItem label="Liquidación ordinaria" value={result.result.ordinarySettlement} strong />
            </div>

            <div className="rules-note">
              <CheckCircle2 size={18} strokeWidth={2.1} />
              <p>
                Se calcularon {result.period.severanceDays} días para cesantías,{" "}
                {result.period.serviceBonusDays} días para prima y {result.period.totalEmploymentDays} días
                totales de relación laboral.
              </p>
            </div>

            <div className="rules-grid">
              <span>Contrato: {result.compensation.contractTypeLabel}</span>
              <span>Motivo: {result.compensation.terminationReasonLabel}</span>
              <span>Base prestaciones: {formatMoney(result.result.benefitsBase)}</span>
              <span>Salario diario: {formatMoney(result.result.dailySalary)}</span>
              {result.compensation.applies ? (
                <span>Días de indemnización: {numberFormatter.format(result.compensation.compensationDays)}</span>
              ) : null}
            </div>

            <p className="disclaimer">
              Este resultado es una estimación para un empleado dependiente en Colombia.
              No incluye retención en la fuente, acuerdos especiales, salario variable,
              sanciones ni ajustes internos del empleador.
            </p>
          </>
        ) : (
          <div className="result-empty">
            <CircleDollarSign size={30} strokeWidth={2.05} />
            <h2>Tu liquidación aparecerá aquí</h2>
            <p>Completa los datos del contrato para ver cesantías, prima, vacaciones e indemnización si aplica.</p>
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
