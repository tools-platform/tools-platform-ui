import { ArrowRight, Banknote, CheckCircle2, CircleDollarSign, Info, Loader2, Pencil, RotateCcw } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";
import { calculateAnnualSalaryColombia, type AnnualSalaryColombiaResponse } from "../../services/financeApi";

type AnnualSalaryData = AnnualSalaryColombiaResponse["data"];

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
    title: "Salario anual",
    monthlySalary: "Salario mensual bruto",
    monthlySalaryHelp: "Es el salario antes de descuentos.",
    monthlySalaryTooltip: "Usa el salario mensual bruto, antes de salud, pensión u otros descuentos. Con eso estimamos el ingreso anual en Colombia.",
    salaryHelper: "¿Solo sabes tu quincena?",
    salaryHelperAction: "Calcular salario",
    payrollYear: "Año",
    payrollYearHelp: "Lo usamos para aplicar salario mínimo, auxilio de transporte y límites legales vigentes.",
    editYearAria: "Editar año de reglas",
    editYearTitle: "Editar año",
    transportationAllowance: "Auxilio de transporte",
    transportationAllowanceHelp: "Se suma solo si el salario cumple el límite legal.",
    serviceBonus: "Incluir prima de servicios",
    serviceBonusHelp: "Agrega una prima anual estimada equivalente a dos pagos semestrales.",
    payrollDeductions: "Restar salud y pensión",
    payrollDeductionsHelp: "Estima deducciones obligatorias del empleado durante 12 meses.",
    salaryRequired: "Ingresa un salario mensual bruto mayor a cero.",
    yearRange: (currentYear: number) => `Ingresa un año entre 2024 y ${currentYear}.`,
    requestError: "No se pudo calcular el salario anual.",
    hint: "Estimación anual para Colombia. No incluye retención en la fuente, cesantías, vacaciones ni pagos variables.",
    submit: "Calcular salario anual",
    reset: "Restablecer",
    heroTitle: "Ingreso anual estimado",
    grossAnnual: "Ingreso bruto anual",
    netAnnual: "Ingreso neto anual",
    annualBaseSalary: "Salario base anual",
    annualTransport: "Auxilio anual",
    serviceBonusResult: "Prima estimada",
    deductions: "Deducciones",
    monthlyAverage: "Promedio mensual",
    biweeklyAverage: "Promedio quincenal",
    minimumWage: "Salario mínimo",
    allowanceLimit: "Límite auxilio",
    qualifiesForAllowance: "Cumple límite para auxilio",
    yes: "Sí",
    no: "No",
    rulesNote: (year: number) => `Calculamos con reglas Colombia ${year}, 12 meses y prima anual si la activas.`,
    disclaimer:
      "Estimación anual para un empleado dependiente en Colombia. No incluye retención en la fuente, cesantías, intereses de cesantías, vacaciones, salario variable, pagos no salariales ni acuerdos especiales.",
    emptyTitle: "Tu salario anual aparecerá aquí",
    emptyDescription: "Ingresa salario mensual, año de reglas y opciones para estimar tu ingreso anual."
  },
  en: {
    kicker: "Calculator",
    title: "Annual salary",
    monthlySalary: "Gross monthly salary",
    monthlySalaryHelp: "This is the salary before deductions.",
    monthlySalaryTooltip: "Use the gross monthly salary before health, pension, or other deductions. We use it to estimate annual income in Colombia.",
    salaryHelper: "Only know biweekly pay?",
    salaryHelperAction: "Calculate salary",
    payrollYear: "Year",
    payrollYearHelp: "We use it to apply minimum wage, transportation allowance, and legal thresholds in force.",
    editYearAria: "Edit rule year",
    editYearTitle: "Edit year",
    transportationAllowance: "Transportation allowance",
    transportationAllowanceHelp: "Added only when the salary meets the legal threshold.",
    serviceBonus: "Include service bonus",
    serviceBonusHelp: "Adds an estimated annual service bonus equal to two half-year payments.",
    payrollDeductions: "Subtract health and pension",
    payrollDeductionsHelp: "Estimates mandatory employee deductions for 12 months.",
    salaryRequired: "Enter a gross monthly salary greater than zero.",
    yearRange: (currentYear: number) => `Enter a year between 2024 and ${currentYear}.`,
    requestError: "We couldn't calculate the annual salary.",
    hint: "Annual estimate for Colombia. It does not include withholding tax, severance, vacation, or variable payments.",
    submit: "Calculate annual salary",
    reset: "Reset",
    heroTitle: "Estimated annual income",
    grossAnnual: "Annual gross income",
    netAnnual: "Annual net income",
    annualBaseSalary: "Annual base salary",
    annualTransport: "Annual allowance",
    serviceBonusResult: "Estimated bonus",
    deductions: "Deductions",
    monthlyAverage: "Monthly average",
    biweeklyAverage: "Biweekly average",
    minimumWage: "Minimum wage",
    allowanceLimit: "Allowance threshold",
    qualifiesForAllowance: "Meets allowance threshold",
    yes: "Yes",
    no: "No",
    rulesNote: (year: number) => `Calculated with Colombia ${year} rules, 12 months, and annual service bonus if enabled.`,
    disclaimer:
      "Annual estimate for a dependent employee in Colombia. It does not include withholding tax, severance, severance interest, vacation, variable salary, non-salary payments, or special agreements.",
    emptyTitle: "Your annual salary will appear here",
    emptyDescription: "Enter monthly salary, rule year, and options to estimate annual income."
  }
} as const;

export function AnnualSalaryColombiaCalculator() {
  const { locale, localizePath } = useLocale();
  const text = copy[locale];
  const localeCode = locale === "es" ? "es-CO" : "en-US";
  const currentPayrollYear = new Date().getFullYear();
  const payrollYears = useMemo(() => buildPayrollYears(currentPayrollYear), [currentPayrollYear]);
  const moneyFormatter = useMemo(
    () => new Intl.NumberFormat(localeCode, { style: "currency", currency: "COP", maximumFractionDigits: 0 }),
    [localeCode]
  );
  const numberFormatter = useMemo(() => new Intl.NumberFormat(localeCode), [localeCode]);
  const [monthlySalary, setMonthlySalary] = useState("2.500.000");
  const [year, setYear] = useState(currentPayrollYear.toString());
  const [isYearEditable, setIsYearEditable] = useState(false);
  const [includeTransportationAllowance, setIncludeTransportationAllowance] = useState(false);
  const [includeServiceBonus, setIncludeServiceBonus] = useState(false);
  const [includePayrollDeductions, setIncludePayrollDeductions] = useState(true);
  const [result, setResult] = useState<AnnualSalaryData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  function formatMoneyInput(value: string) {
    const normalized = value.replace(/[^\d]/g, "");
    return normalized.length > 0 ? numberFormatter.format(Number(normalized)) : "";
  }

  function formatMoney(value: number) {
    return moneyFormatter.format(value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const salaryValue = parseMoney(monthlySalary);
    const yearValue = Number(year);

    if (salaryValue <= 0) {
      setError(text.salaryRequired);
      setResult(null);
      return;
    }

    if (!Number.isInteger(yearValue) || yearValue < 2024 || yearValue > currentPayrollYear) {
      setError(text.yearRange(currentPayrollYear));
      setResult(null);
      return;
    }

    setIsLoading(true);

    try {
      const data = await calculateAnnualSalaryColombia({
        monthlySalary: salaryValue,
        year: yearValue,
        includeTransportationAllowance,
        includeServiceBonus,
        includePayrollDeductions
      });
      setResult(data);
      scrollToResultOnMobile();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : text.requestError);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setMonthlySalary("2.500.000");
    setYear(currentPayrollYear.toString());
    setIsYearEditable(false);
    setIncludeTransportationAllowance(false);
    setIncludeServiceBonus(false);
    setIncludePayrollDeductions(true);
    setResult(null);
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
            <Banknote size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span className="field-label">
            {text.monthlySalary}<span className="required-mark">*</span>
            <span className="info-tooltip">
              <Info size={15} strokeWidth={2.1} />
              <span role="tooltip">{text.monthlySalaryTooltip}</span>
            </span>
          </span>
          <div className="money-input">
            <span>$</span>
            <input inputMode="numeric" onChange={(event) => setMonthlySalary(formatMoneyInput(event.target.value))} required type="text" value={monthlySalary} />
            <strong>COP</strong>
          </div>
          <small>{text.monthlySalaryHelp}</small>
        </label>

        <div className="field-action-row">
          <span>{text.salaryHelper}</span>
          <a className="secondary-action secondary-action--compact" href={localizePath("/tools/colombia-gross-salary-calculator")}>
            {text.salaryHelperAction}
            <ArrowRight size={16} strokeWidth={2.1} />
          </a>
        </div>

        <label className="field field--spaced">
          <span className="field-label">
            {text.payrollYear}<span className="required-mark">*</span>
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

        <div className="duplicate-options">
          <label className="toggle-field toggle-field--compact">
            <input checked={includePayrollDeductions} onChange={(event) => setIncludePayrollDeductions(event.target.checked)} type="checkbox" />
            <span><strong>{text.payrollDeductions}</strong><small>{text.payrollDeductionsHelp}</small></span>
          </label>
          <label className="toggle-field toggle-field--compact">
            <input checked={includeTransportationAllowance} onChange={(event) => setIncludeTransportationAllowance(event.target.checked)} type="checkbox" />
            <span><strong>{text.transportationAllowance}</strong><small>{text.transportationAllowanceHelp}</small></span>
          </label>
          <label className="toggle-field toggle-field--compact">
            <input checked={includeServiceBonus} onChange={(event) => setIncludeServiceBonus(event.target.checked)} type="checkbox" />
            <span><strong>{text.serviceBonus}</strong><small>{text.serviceBonusHelp}</small></span>
          </label>
        </div>

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>{text.hint}</span>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-action" disabled={isLoading} type="submit">
          {isLoading ? <Loader2 className="spin" size={18} /> : <CircleDollarSign size={18} />}
          {text.submit}
        </button>

        <button className="secondary-action" onClick={handleReset} type="button">
          <RotateCcw size={18} />
          {text.reset}
        </button>
      </form>

      <section className={result ? "result-panel" : "result-panel result-panel--empty"} ref={resultRef}>
        {result ? (
          <>
            <div className="result-panel__hero">
              <p>{text.heroTitle}</p>
              <strong>{formatMoney(result.result.annualNetIncome)}</strong>
              <span>{text.grossAnnual}: {formatMoney(result.result.annualGrossIncome)}</span>
            </div>

            <div className="result-breakdown">
              <ResultItem label={text.annualBaseSalary} value={result.result.annualBaseSalary} formatMoney={formatMoney} />
              <ResultItem label={text.annualTransport} value={result.result.annualTransportationAllowance} formatMoney={formatMoney} />
              {result.input.includeServiceBonus ? (
                <ResultItem label={text.serviceBonusResult} value={result.result.serviceBonus} formatMoney={formatMoney} />
              ) : null}
              <ResultItem label={text.deductions} value={result.deductions.totalMandatoryDeductions} formatMoney={formatMoney} />
              <ResultItem label={text.netAnnual} value={result.result.annualNetIncome} strong formatMoney={formatMoney} />
              <ResultItem label={text.monthlyAverage} value={result.result.estimatedMonthlyAverage} formatMoney={formatMoney} />
              <ResultItem label={text.biweeklyAverage} value={result.result.estimatedBiweeklyAverage} formatMoney={formatMoney} />
            </div>

            <div className="rules-note">
              <CheckCircle2 size={18} strokeWidth={2.1} />
              <p>{text.rulesNote(result.year)}</p>
            </div>

            <div className="rules-grid">
              <span>{text.minimumWage}: {formatMoney(result.rules.minimumMonthlyWage)}</span>
              <span>{text.allowanceLimit}: {formatMoney(result.rules.transportationAllowanceSalaryLimit)}</span>
              <span>{text.qualifiesForAllowance}: {result.rules.qualifiesForTransportationAllowance ? text.yes : text.no}</span>
            </div>

            <p className="disclaimer">{text.disclaimer}</p>
          </>
        ) : (
          <div className="result-empty">
            <Banknote size={34} strokeWidth={2.1} />
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
