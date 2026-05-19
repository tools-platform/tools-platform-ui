import { Calculator, CheckCircle2, CircleDollarSign, Info, Loader2, Pencil } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";
import {
  calculateGrossSalaryColombia,
  type GrossSalaryColombiaResponse,
  type GrossSalaryPaymentFrequency
} from "../../services/financeApi";

type GrossSalaryData = GrossSalaryColombiaResponse["data"];

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
    title: "Datos del neto recibido",
    receivedNetSalary: "Salario neto recibido",
    receivedNetSalaryHelp: "Es lo que te llega después de descuentos de nómina.",
    paymentFrequency: "Frecuencia del valor recibido",
    monthly: "Mensual",
    biweekly: "Quincenal",
    payrollYear: "Año de reglas",
    payrollYearHelp: "Lo usamos para aplicar salario mínimo, auxilio de transporte y límites legales vigentes.",
    editYearAria: "Editar año de reglas",
    editYearTitle: "Editar año",
    payrollDeductions: "Otros descuentos",
    payrollDeductionsHelp:
      "Valores extra descontados al mes en nómina, como libranzas, préstamos, anticipos, embargos o aportes voluntarios.",
    transportationAllowance: "Incluir auxilio de transporte si aplica",
    transportationAllowanceHelp: "Actívalo si ese neto incluye auxilio de transporte cuando el salario cumpla el límite legal.",
    salaryRequired: "Ingresa un salario neto recibido mayor a cero.",
    yearRange: (currentYear: number) => `Ingresa un año entre 2024 y ${currentYear}.`,
    requestError: "No se pudo calcular el salario bruto.",
    preview: (salary: string, frequency: string) => `Vas a estimar el bruto desde un neto ${frequency} de ${salary}.`,
    submit: "Calcular salario bruto",
    reset: "Restablecer",
    heroTitle: "Salario bruto mensual estimado",
    grossBiweekly: "Bruto quincenal",
    netMonthly: "Neto mensual usado",
    netBiweekly: "Neto quincenal",
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
      "Este resultado es una estimación inversa para un empleado dependiente en Colombia. Puede variar por redondeos de nómina, retención en la fuente, pagos no salariales, beneficios o acuerdos especiales.",
    emptyTitle: "Tu salario bruto aparecerá aquí",
    emptyDescription: "Ingresa el neto que recibes mensual o quincenal para estimar el salario bruto mensual."
  },
  en: {
    kicker: "Calculator",
    title: "Net payment details",
    receivedNetSalary: "Received net salary",
    receivedNetSalaryHelp: "This is what you receive after payroll deductions.",
    paymentFrequency: "Received value frequency",
    monthly: "Monthly",
    biweekly: "Biweekly",
    payrollYear: "Rule year",
    payrollYearHelp: "We use it to apply the minimum wage, transportation allowance, and legal thresholds.",
    editYearAria: "Edit rule year",
    editYearTitle: "Edit year",
    payrollDeductions: "Other deductions",
    payrollDeductionsHelp:
      "Extra monthly payroll deductions, such as salary loans, advances, garnishments, or voluntary contributions.",
    transportationAllowance: "Include transportation allowance if applicable",
    transportationAllowanceHelp: "Turn it on if that net value includes transportation allowance when the salary qualifies.",
    salaryRequired: "Enter a received net salary greater than zero.",
    yearRange: (currentYear: number) => `Enter a year between 2024 and ${currentYear}.`,
    requestError: "We couldn't calculate the gross salary.",
    preview: (salary: string, frequency: string) => `You are estimating gross salary from a ${frequency} net value of ${salary}.`,
    submit: "Calculate gross salary",
    reset: "Reset",
    heroTitle: "Estimated gross monthly salary",
    grossBiweekly: "Gross biweekly",
    netMonthly: "Monthly net used",
    netBiweekly: "Biweekly net",
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
      "This result is an inverse estimate for a dependent employee in Colombia. It may vary due to payroll rounding, withholding tax, non-salary payments, benefits, or special agreements.",
    emptyTitle: "Your gross salary will appear here",
    emptyDescription: "Enter the net amount you receive monthly or biweekly to estimate the gross monthly salary."
  }
} as const;

export function GrossSalaryColombiaCalculator() {
  const { locale } = useLocale();
  const text = copy[locale];
  const localeCode = locale === "es" ? "es-CO" : "en-US";
  const currencyFormatter = useMemo(
    () => new Intl.NumberFormat(localeCode, { style: "currency", currency: "COP", maximumFractionDigits: 0 }),
    [localeCode]
  );
  const numberFormatter = useMemo(() => new Intl.NumberFormat(localeCode, { maximumFractionDigits: 0 }), [localeCode]);
  const currentPayrollYear = new Date().getFullYear();
  const payrollYears = useMemo(() => buildPayrollYears(currentPayrollYear), [currentPayrollYear]);
  const [receivedNetSalary, setReceivedNetSalary] = useState("1.150.000");
  const [paymentFrequency, setPaymentFrequency] = useState<GrossSalaryPaymentFrequency>("biweekly");
  const [year, setYear] = useState(currentPayrollYear.toString());
  const [isYearEditable, setIsYearEditable] = useState(false);
  const [includeTransportationAllowance, setIncludeTransportationAllowance] = useState(false);
  const [otherDeductions, setOtherDeductions] = useState("0");
  const [result, setResult] = useState<GrossSalaryData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  const previewSalary = useMemo(() => parseMoney(receivedNetSalary), [receivedNetSalary]);

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

    const netSalaryValue = parseMoney(receivedNetSalary);
    const deductionsValue = parseMoney(otherDeductions);
    const yearValue = Number(year);

    if (netSalaryValue <= 0) {
      setError(text.salaryRequired);
      return;
    }

    if (!Number.isInteger(yearValue) || yearValue < 2024 || yearValue > currentPayrollYear) {
      setError(text.yearRange(currentPayrollYear));
      return;
    }

    setIsLoading(true);
    try {
      const data = await calculateGrossSalaryColombia({
        receivedNetSalary: netSalaryValue,
        paymentFrequency,
        year: yearValue,
        includeTransportationAllowance,
        otherDeductions: deductionsValue
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
    setReceivedNetSalary("1.150.000");
    setPaymentFrequency("biweekly");
    setYear(currentPayrollYear.toString());
    setIsYearEditable(false);
    setIncludeTransportationAllowance(false);
    setOtherDeductions("0");
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
            <Calculator size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span>{text.receivedNetSalary} <span className="required-mark">*</span></span>
          <div className="money-input">
            <span>$</span>
            <input inputMode="numeric" onChange={(event) => setReceivedNetSalary(formatMoneyInput(event.target.value))} required type="text" value={receivedNetSalary} />
            <strong>COP</strong>
          </div>
          <small>{text.receivedNetSalaryHelp}</small>
        </label>

        <fieldset className="segmented-field">
          <legend>{text.paymentFrequency}</legend>
          <div className="segmented-control">
            <button className={paymentFrequency === "monthly" ? "is-active" : ""} onClick={() => setPaymentFrequency("monthly")} type="button">
              {text.monthly}
            </button>
            <button className={paymentFrequency === "biweekly" ? "is-active" : ""} onClick={() => setPaymentFrequency("biweekly")} type="button">
              {text.biweekly}
            </button>
          </div>
        </fieldset>

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
              <input inputMode="numeric" onChange={(event) => setOtherDeductions(formatMoneyInput(event.target.value))} type="text" value={otherDeductions} />
            </div>
          </label>
        </div>

        <label className="toggle-field">
          <input checked={includeTransportationAllowance} onChange={(event) => setIncludeTransportationAllowance(event.target.checked)} type="checkbox" />
          <span><strong>{text.transportationAllowance}</strong><small>{text.transportationAllowanceHelp}</small></span>
        </label>

        {previewSalary > 0 ? (
          <div className="calculator-hint">
            <Info size={16} strokeWidth={2.1} />
            <span>{text.preview(formatMoney(previewSalary), paymentFrequency === "monthly" ? text.monthly.toLowerCase() : text.biweekly.toLowerCase())}</span>
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
              <strong>{formatMoney(result.result.estimatedGrossSalary)}</strong>
              <span>{text.grossBiweekly}: {formatMoney(result.result.estimatedGrossBiweeklySalary)}</span>
            </div>

            <div className="result-breakdown">
              <ResultItem label={text.netMonthly} value={result.result.estimatedNetSalary} formatMoney={formatMoney} />
              <ResultItem label={text.netBiweekly} value={result.result.estimatedNetBiweeklySalary} formatMoney={formatMoney} />
              {result.input.includeTransportationAllowance ? <ResultItem label={text.transportationAllowanceResult} value={result.result.transportationAllowance} formatMoney={formatMoney} /> : null}
              <ResultItem label={text.health} value={result.result.healthContribution} formatMoney={formatMoney} />
              <ResultItem label={text.pension} value={result.result.pensionContribution} formatMoney={formatMoney} />
              {result.result.solidarityPensionFundContribution > 0 ? <ResultItem label={text.solidarityFund} value={result.result.solidarityPensionFundContribution} formatMoney={formatMoney} /> : null}
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
              {result.rules.solidarityPensionFundRate > 0 ? (
                <span>{text.solidarityFund}: {formatRate(result.rules.solidarityPensionFundRate)}</span>
              ) : null}
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
