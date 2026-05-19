import { Calculator, CheckCircle2, CircleDollarSign, Info, Loader2, Pencil } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";
import { calculateNetSalaryColombia, type NetSalaryColombiaResponse } from "../../services/financeApi";

type NetSalaryData = NetSalaryColombiaResponse["data"];
type CalculationViewOptions = { showSolidarityFund: boolean };

function parseMoney(value: string) {
  const normalized = value.replace(/[^\d]/g, "");
  return normalized.length > 0 ? Number(normalized) : 0;
}

function buildPayrollYears(currentYear: number) {
  const years: number[] = [];
  for (let year = currentYear; year >= 2024; year -= 1) years.push(year);
  return years;
}

const copy = {
  es: {
    kicker: "Calculadora",
    title: "Datos del salario",
    monthlySalary: "Salario mensual bruto",
    monthlySalaryHelp: "Es el salario antes de descuentos de salud, pensión y otros.",
    payrollYear: "Año de reglas",
    payrollYearHelp: "Lo usamos para aplicar el salario mínimo, auxilio de transporte y límites legales vigentes de ese año.",
    editYearAria: "Editar año de reglas",
    editYearTitle: "Editar año",
    payrollDeductions: "Deducciones de nómina",
    payrollDeductionsHelp:
      "Valores extra que te descuentan al mes en nómina, como libranzas, préstamos, anticipos, embargos o aportes voluntarios. Si no tienes, déjalo en 0.",
    transportationAllowance: "Incluir auxilio de transporte si aplica",
    transportationAllowanceHelp: "Validaremos si tu salario cumple el límite legal para recibirlo.",
    showSolidarityFund: "Ver Fondo de Solidaridad",
    showSolidarityFundHelp: "Esto solo muestra u oculta el detalle. Ocultarlo no elimina el aporte si aplica por ley.",
    solidarityExplanation:
      "Es un aporte adicional que aplica cuando el salario es de 4 salarios mínimos o más. Si tu salario no llega a ese rango, este valor queda en cero.",
    salaryRequired: "Ingresa un salario mensual mayor a cero.",
    yearRange: (currentYear: number) => `Ingresa un año entre 2024 y ${currentYear}.`,
    requestError: "No se pudo calcular el salario.",
    preview: (salary: string) => `Vas a calcular sobre ${salary} mensuales.`,
    submit: "Calcular salario neto",
    reset: "Restablecer",
    heroTitle: "Salario neto mensual",
    biweeklyNet: "Quincenal",
    grossSalary: "Salario bruto",
    transportationAllowanceResult: "Auxilio transporte",
    health: "Salud 4%",
    pension: "Pensión 4%",
    healthRate: "Salud",
    pensionRate: "Pensión",
    solidarityFund: "Fondo de solidaridad",
    totalDeductions: "Total descuentos",
    rulesNoteWithAllowance: (minWage: string, allowance: string, limit: string, year: number) =>
      `Usa salario mínimo ${minWage}, auxilio de transporte ${allowance} y límite ${limit} para ${year}.`,
    rulesNoteWithoutAllowance: (minWage: string, year: number) => `Usa salario mínimo ${minWage} para ${year}.`,
    qualifiesForAllowance: "Cumple límite legal para auxilio",
    yes: "Sí",
    no: "No",
    disclaimer:
      "Este resultado es una estimación para un empleado dependiente en Colombia. No incluye retención en la fuente, pagos no salariales, prestaciones, costos del empleador ni acuerdos especiales de nómina.",
    emptyTitle: "Tu resultado aparecerá aquí",
    emptyDescription: "Completa los datos del salario y calcula para ver el neto mensual, quincenal y el detalle de descuentos."
  },
  en: {
    kicker: "Calculator",
    title: "Salary details",
    monthlySalary: "Gross monthly salary",
    monthlySalaryHelp: "This is the salary before health, pension, and other deductions.",
    payrollYear: "Rule year",
    payrollYearHelp: "We use it to apply the minimum wage, transportation allowance, and legal thresholds in force for that year.",
    editYearAria: "Edit rule year",
    editYearTitle: "Edit year",
    payrollDeductions: "Payroll deductions",
    payrollDeductionsHelp:
      "Extra monthly amounts deducted from payroll, such as salary loans, advances, garnishments, or voluntary contributions. Leave it at 0 if you do not have any.",
    transportationAllowance: "Include transportation allowance if applicable",
    transportationAllowanceHelp: "We will validate whether the salary meets the legal threshold to receive it.",
    showSolidarityFund: "Show solidarity fund",
    showSolidarityFundHelp: "This only shows or hides the detail. Hiding it does not remove the contribution if it applies by law.",
    solidarityExplanation:
      "It is an additional contribution that applies when the salary is 4 minimum wages or more. If your salary does not reach that threshold, this value stays at zero.",
    salaryRequired: "Enter a monthly salary greater than zero.",
    yearRange: (currentYear: number) => `Enter a year between 2024 and ${currentYear}.`,
    requestError: "We couldn't calculate the salary.",
    preview: (salary: string) => `You are calculating from ${salary} per month.`,
    submit: "Calculate net salary",
    reset: "Reset",
    heroTitle: "Monthly net salary",
    biweeklyNet: "Biweekly",
    grossSalary: "Gross salary",
    transportationAllowanceResult: "Transportation allowance",
    health: "Health 4%",
    pension: "Pension 4%",
    healthRate: "Health",
    pensionRate: "Pension",
    solidarityFund: "Solidarity fund",
    totalDeductions: "Total deductions",
    rulesNoteWithAllowance: (minWage: string, allowance: string, limit: string, year: number) =>
      `Uses minimum wage ${minWage}, transportation allowance ${allowance}, and threshold ${limit} for ${year}.`,
    rulesNoteWithoutAllowance: (minWage: string, year: number) => `Uses minimum wage ${minWage} for ${year}.`,
    qualifiesForAllowance: "Meets legal allowance threshold",
    yes: "Yes",
    no: "No",
    disclaimer:
      "This result is an estimate for a dependent employee in Colombia. It does not include withholding tax, non-salary payments, benefits, employer costs, or special payroll agreements.",
    emptyTitle: "Your result will appear here",
    emptyDescription: "Complete the salary details and calculate to see the monthly net, biweekly net, and deduction breakdown."
  }
} as const;

export function NetSalaryColombiaCalculator() {
  const { locale } = useLocale();
  const text = copy[locale];
  const localeCode = locale === "es" ? "es-CO" : "en-US";
  const currencyFormatter = useMemo(
    () => new Intl.NumberFormat(localeCode, { style: "currency", currency: "COP", maximumFractionDigits: 0 }),
    [localeCode]
  );
  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(localeCode, { maximumFractionDigits: 0 }),
    [localeCode]
  );
  const currentPayrollYear = new Date().getFullYear();
  const payrollYears = useMemo(() => buildPayrollYears(currentPayrollYear), [currentPayrollYear]);
  const [monthlySalary, setMonthlySalary] = useState("2.500.000");
  const [year, setYear] = useState(currentPayrollYear.toString());
  const [isYearEditable, setIsYearEditable] = useState(false);
  const [includeTransportationAllowance, setIncludeTransportationAllowance] = useState(false);
  const [showSolidarityFund, setShowSolidarityFund] = useState(false);
  const [otherDeductions, setOtherDeductions] = useState("0");
  const [result, setResult] = useState<NetSalaryData | null>(null);
  const [resultViewOptions, setResultViewOptions] = useState<CalculationViewOptions | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  const previewSalary = useMemo(() => parseMoney(monthlySalary), [monthlySalary]);

  function formatMoneyInput(value: string) {
    const normalized = value.replace(/[^\d]/g, "");
    return normalized.length > 0 ? numberFormatter.format(Number(normalized)) : "";
  }

  function formatMoney(value: number) {
    return currencyFormatter.format(value);
  }

  function formatRate(value: number) {
    return `${numberFormatter.format(value * 100)}%`;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const salaryValue = parseMoney(monthlySalary);
    const deductionsValue = parseMoney(otherDeductions);
    const yearValue = Number(year);

    if (salaryValue <= 0) {
      setError(text.salaryRequired);
      return;
    }
    if (!Number.isInteger(yearValue) || yearValue < 2024 || yearValue > currentPayrollYear) {
      setError(text.yearRange(currentPayrollYear));
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
      setResultViewOptions({ showSolidarityFund });
      scrollToResultOnMobile();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : text.requestError);
      setResult(null);
      setResultViewOptions(null);
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setMonthlySalary("2.500.000");
    setYear(currentPayrollYear.toString());
    setIsYearEditable(false);
    setIncludeTransportationAllowance(false);
    setShowSolidarityFund(false);
    setOtherDeductions("0");
    setResult(null);
    setResultViewOptions(null);
    setError("");
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
            <Calculator size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span>{text.monthlySalary} <span className="required-mark">*</span></span>
          <div className="money-input">
            <span>$</span>
            <input inputMode="numeric" onChange={(event) => setMonthlySalary(formatMoneyInput(event.target.value))} placeholder="2.500.000" required type="text" value={monthlySalary} />
            <strong>COP</strong>
          </div>
          <small>{text.monthlySalaryHelp}</small>
        </label>

        <div className="form-grid">
          <label className="field">
            <span className="field-label">
              {text.payrollYear}
              <span className="required-mark">*</span>
              <span className="info-tooltip">
                <Info size={15} strokeWidth={2.1} />
                <span role="tooltip">{text.payrollYearHelp}</span>
              </span>
            </span>
            <div className="year-input">
              <select disabled={!isYearEditable} onChange={(event) => setYear(event.target.value)} required value={year}>
                {payrollYears.map((payrollYear) => (
                  <option key={payrollYear} value={payrollYear}>{payrollYear}</option>
                ))}
              </select>
              <button aria-label={text.editYearAria} onClick={() => setIsYearEditable((isEditable) => !isEditable)} title={text.editYearTitle} type="button">
                <Pencil size={15} strokeWidth={2.1} />
              </button>
            </div>
          </label>

          <label className="field">
            <span className="field-label">
              {text.payrollDeductions}
              <span className="info-tooltip">
                <Info size={15} strokeWidth={2.1} />
                <span role="tooltip">{text.payrollDeductionsHelp}</span>
              </span>
            </span>
            <div className="money-input money-input--compact">
              <span>$</span>
              <input inputMode="numeric" onChange={(event) => setOtherDeductions(formatMoneyInput(event.target.value))} placeholder="0" type="text" value={otherDeductions} />
            </div>
          </label>
        </div>

        <label className="toggle-field">
          <input checked={includeTransportationAllowance} onChange={(event) => setIncludeTransportationAllowance(event.target.checked)} type="checkbox" />
          <span><strong>{text.transportationAllowance}</strong><small>{text.transportationAllowanceHelp}</small></span>
        </label>

        <label className="toggle-field toggle-field--compact">
          <input checked={showSolidarityFund} onChange={(event) => setShowSolidarityFund(event.target.checked)} type="checkbox" />
          <span>
            <span className="toggle-field__label">
              <strong>{text.showSolidarityFund}</strong>
              <span className="info-tooltip">
                <Info size={15} strokeWidth={2.1} />
                <span role="tooltip">{text.solidarityExplanation}</span>
              </span>
            </span>
            <small>{text.showSolidarityFundHelp}</small>
          </span>
        </label>

        {previewSalary > 0 ? (
          <div className="calculator-hint">
            <Info size={16} strokeWidth={2.1} />
            <span>{text.preview(formatMoney(previewSalary))}</span>
          </div>
        ) : null}

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-action" disabled={isLoading} type="submit">
          {isLoading ? <Loader2 className="spin" size={18} /> : <CircleDollarSign size={18} />}
          {text.submit}
        </button>
        <button className="secondary-action" onClick={handleReset} type="button">
          {text.reset}
        </button>
      </form>

      <section className={result ? "result-panel" : "result-panel result-panel--empty"} ref={resultRef}>
        {result ? (
          <>
            <div className="result-panel__hero">
              <p>{text.heroTitle}</p>
              <strong>{formatMoney(result.result.netSalary)}</strong>
              <span>{text.biweeklyNet}: {formatMoney(result.result.biweeklyNetSalary)}</span>
            </div>

            <div className="result-breakdown">
              <ResultItem label={text.grossSalary} value={result.result.grossSalary} formatMoney={formatMoney} />
              {result.input.includeTransportationAllowance ? <ResultItem label={text.transportationAllowanceResult} value={result.result.transportationAllowance} formatMoney={formatMoney} /> : null}
              <ResultItem label={text.health} value={result.result.healthContribution} formatMoney={formatMoney} />
              <ResultItem label={text.pension} value={result.result.pensionContribution} formatMoney={formatMoney} />
              {resultViewOptions?.showSolidarityFund ? <ResultItem label={text.solidarityFund} value={result.result.solidarityPensionFundContribution} formatMoney={formatMoney} /> : null}
              <ResultItem label={text.totalDeductions} value={result.result.totalDeductions} strong formatMoney={formatMoney} />
            </div>

            <div className="rules-note">
              <CheckCircle2 size={18} strokeWidth={2.1} />
              {result.input.includeTransportationAllowance ? (
                <p>{text.rulesNoteWithAllowance(formatMoney(result.rules.minimumMonthlyWage), formatMoney(result.rules.transportationAllowanceValue), formatMoney(result.rules.transportationAllowanceSalaryLimit), result.year)}</p>
              ) : (
                <p>{text.rulesNoteWithoutAllowance(formatMoney(result.rules.minimumMonthlyWage), result.year)}</p>
              )}
            </div>

            <div className="rules-grid">
              {result.input.includeTransportationAllowance ? (
                <span>{text.qualifiesForAllowance}: {result.rules.qualifiesForTransportationAllowance ? text.yes : text.no}</span>
              ) : null}
              <span>{text.healthRate}: {formatRate(result.rules.employeeHealthRate)}</span>
              <span>{text.pensionRate}: {formatRate(result.rules.employeePensionRate)}</span>
              {resultViewOptions?.showSolidarityFund ? <span>{text.solidarityFund}: {formatRate(result.rules.solidarityPensionFundRate)}</span> : null}
            </div>

            <p className="disclaimer">{text.disclaimer}</p>
          </>
        ) : (
          <div className="result-empty">
            <CircleDollarSign size={30} strokeWidth={2.05} />
            <h2>{text.emptyTitle}</h2>
            <p>{text.emptyDescription}</p>
          </div>
        )}
      </section>
    </div>
  );
}

function ResultItem({ label, value, strong = false, formatMoney }: { label: string; value: number; strong?: boolean; formatMoney: (value: number) => string }) {
  return (
    <div className={strong ? "result-item result-item--strong" : "result-item"}>
      <span>{label}</span>
      <strong>{formatMoney(value)}</strong>
    </div>
  );
}


