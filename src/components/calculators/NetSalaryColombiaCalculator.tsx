import { Calculator, CheckCircle2, CircleDollarSign, Info, Loader2, Pencil } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import {
  calculateNetSalaryColombia,
  type NetSalaryColombiaResponse
} from "../../services/financeApi";

type NetSalaryData = NetSalaryColombiaResponse["data"];

const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0
});

const numberFormatter = new Intl.NumberFormat("es-CO", {
  maximumFractionDigits: 0
});

function parseMoney(value: string) {
  const normalized = value.replace(/[^\d]/g, "");
  return normalized.length > 0 ? Number(normalized) : 0;
}

function formatMoney(value: number) {
  return currencyFormatter.format(value);
}

function formatRate(value: number) {
  return `${numberFormatter.format(value * 100)}%`;
}

export function NetSalaryColombiaCalculator() {
  const currentPayrollYear = Math.max(new Date().getFullYear(), 2026).toString();
  const [monthlySalary, setMonthlySalary] = useState("2500000");
  const [year, setYear] = useState(currentPayrollYear);
  const [isYearEditable, setIsYearEditable] = useState(false);
  const [includeTransportationAllowance, setIncludeTransportationAllowance] = useState(true);
  const [otherDeductions, setOtherDeductions] = useState("0");
  const [result, setResult] = useState<NetSalaryData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const previewSalary = useMemo(() => parseMoney(monthlySalary), [monthlySalary]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const salaryValue = parseMoney(monthlySalary);
    const deductionsValue = parseMoney(otherDeductions);
    const yearValue = Number(year);

    if (salaryValue <= 0) {
      setError("Ingresa un salario mensual mayor a cero.");
      return;
    }

    if (!Number.isInteger(yearValue) || yearValue < 2026) {
      setError("Ingresa un año válido desde 2026.");
      return;
    }

    setIsLoading(true);

    try {
      const data = await calculateNetSalaryColombia({
        monthlySalary: salaryValue,
        year: yearValue,
        includeTransportationAllowance,
        otherDeductions: deductionsValue
      });
      setResult(data);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "No se pudo calcular el salario.");
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="calculator-layout">
      <form className="calculator-card" onSubmit={handleSubmit}>
        <div className="calculator-card__header">
          <div>
            <p className="section__kicker">Calculadora</p>
            <h2>Datos del salario</h2>
          </div>
          <span>
            <Calculator size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span>Salario mensual bruto</span>
          <div className="money-input">
            <span>$</span>
            <input
              inputMode="numeric"
              onChange={(event) => setMonthlySalary(event.target.value)}
              placeholder="2.500.000"
              required
              type="text"
              value={monthlySalary}
            />
            <strong>COP</strong>
          </div>
          <small>Es el salario antes de descuentos de salud, pensión y otros.</small>
        </label>

        <div className="form-grid">
          <label className="field">
            <span>Año de reglas</span>
            <div className="year-input">
              <input
                disabled={!isYearEditable}
                min="2026"
                onChange={(event) => setYear(event.target.value)}
                required
                type="number"
                value={year}
              />
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
            <span>Deducciones de nómina</span>
            <div className="money-input money-input--compact">
              <span>$</span>
              <input
                inputMode="numeric"
                onChange={(event) => setOtherDeductions(event.target.value)}
                placeholder="0"
                type="text"
                value={otherDeductions}
              />
            </div>
          </label>
        </div>

        <label className="toggle-field">
          <input
            checked={includeTransportationAllowance}
            onChange={(event) => setIncludeTransportationAllowance(event.target.checked)}
            type="checkbox"
          />
          <span>
            <strong>Incluir auxilio de transporte si aplica</strong>
            <small>Validaremos si tu salario cumple el límite legal para recibirlo.</small>
          </span>
        </label>

        {previewSalary > 0 ? (
          <div className="calculator-hint">
            <Info size={16} strokeWidth={2.1} />
            <span>Vas a calcular sobre {formatMoney(previewSalary)} mensuales.</span>
          </div>
        ) : null}

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-action" disabled={isLoading} type="submit">
          {isLoading ? <Loader2 className="spin" size={18} /> : <CircleDollarSign size={18} />}
          Calcular salario neto
        </button>
      </form>

      <section className={result ? "result-panel" : "result-panel result-panel--empty"}>
        {result ? (
          <>
            <div className="result-panel__hero">
              <p>Salario neto mensual</p>
              <strong>{formatMoney(result.result.netSalary)}</strong>
              <span>Quincenal: {formatMoney(result.result.biweeklyNetSalary)}</span>
            </div>

            <div className="result-breakdown">
              <ResultItem label="Salario bruto" value={result.result.grossSalary} />
              <ResultItem label="Auxilio transporte" value={result.result.transportationAllowance} />
              <ResultItem label="Salud 4%" value={result.result.healthContribution} />
              <ResultItem label="Pensión 4%" value={result.result.pensionContribution} />
              <ResultItem label="Fondo de solidaridad" value={result.result.solidarityPensionFundContribution} />
              <ResultItem label="Total descuentos" value={result.result.totalDeductions} strong />
            </div>

            <div className="rules-note">
              <CheckCircle2 size={18} strokeWidth={2.1} />
              <p>
                Usa salario mínimo {formatMoney(result.rules.minimumMonthlyWage)}, auxilio de transporte{" "}
                {formatMoney(result.rules.transportationAllowanceValue)} y límite{" "}
                {formatMoney(result.rules.transportationAllowanceSalaryLimit)} para {result.year}.
              </p>
            </div>

            <div className="rules-grid">
              <span>Aplica auxilio: {result.rules.qualifiesForTransportationAllowance ? "Sí" : "No"}</span>
              <span>Salud: {formatRate(result.rules.employeeHealthRate)}</span>
              <span>Pensión: {formatRate(result.rules.employeePensionRate)}</span>
              <span>Fondo de solidaridad: {formatRate(result.rules.solidarityPensionFundRate)}</span>
            </div>

            <p className="disclaimer">{result.disclaimer}</p>
          </>
        ) : (
          <div className="result-empty">
            <CircleDollarSign size={30} strokeWidth={2.05} />
            <h2>Tu resultado aparecerá aquí</h2>
            <p>
              Completa los datos del salario y calcula para ver el neto mensual,
              quincenal y el detalle de descuentos.
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
