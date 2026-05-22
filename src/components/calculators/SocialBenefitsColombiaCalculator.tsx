import { ArrowRight, Calculator, CheckCircle2, CircleDollarSign, Info, Loader2, Pencil } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { DateField } from "../DateField";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";
import { calculateSocialBenefitsColombia, type SocialBenefitsColombiaResponse } from "../../services/financeApi";

type SocialBenefitsData = SocialBenefitsColombiaResponse["data"];

function parseMoney(value: string) {
  const normalized = value.replace(/[^\d]/g, "");
  return normalized.length > 0 ? Number(normalized) : 0;
}

function todayDate() {
  return new Date().toISOString().slice(0, 10);
}

function yearStartDate() {
  return `${new Date().getFullYear()}-01-01`;
}

function buildPayrollYears(currentYear: number) {
  const years: number[] = [];
  for (let year = currentYear; year >= 2024; year -= 1) years.push(year);
  return years;
}

const copy = {
  es: {
    kicker: "Calculadora",
    title: "Datos de prestaciones",
    monthlySalary: "Salario mensual bruto",
    monthlySalaryHelp: "Es el salario antes de descuentos.",
    monthlySalaryTooltip: "Es el salario mensual bruto, antes de salud, pensión u otros descuentos. Se usa como base para estimar prestaciones sociales.",
    salaryHelper: "¿Solo sabes tu quincena?",
    salaryHelperAction: "Calcular salario",
    startDate: "Desde",
    startDateHelp: "Usa la fecha desde la que quieres estimar prestaciones acumuladas. No tiene que ser inicio de contrato si solo quieres calcular un periodo.",
    endDate: "Hasta",
    endDateHelp: "Usa la fecha final del periodo a estimar. La herramienta cuenta los días entre ambas fechas para calcular valores proporcionales.",
    payrollYear: "Año",
    payrollYearHelp: "Lo usamos para aplicar salario mínimo, auxilio de transporte y límites legales vigentes.",
    editYearAria: "Editar año de reglas",
    editYearTitle: "Editar año",
    transportationAllowance: "Auxilio de transporte",
    transportationAllowanceHelp: "Se aplica solo si el salario cumple el límite legal.",
    assumption: "Vacaciones causadas completas en el periodo. No se restan días ya disfrutados o pagados.",
    salaryRequired: "Ingresa un salario mensual bruto mayor a cero.",
    dateRequired: "Ingresa la fecha inicial y la fecha final.",
    dateOrder: "La fecha final no puede ser anterior a la fecha inicial.",
    yearRange: (currentYear: number) => `Ingresa un año entre 2024 y ${currentYear}.`,
    requestError: "No se pudieron calcular las prestaciones.",
    submit: "Calcular prestaciones",
    reset: "Restablecer",
    heroTitle: "Total estimado de prestaciones",
    severancePay: "Cesantías",
    severanceInterest: "Intereses de cesantías",
    serviceBonus: "Prima de servicios",
    vacationPay: "Vacaciones causadas",
    totalBenefits: "Total prestaciones",
    baseSalary: "Salario base",
    benefitsBase: "Base prestaciones",
    transportationAllowanceResult: "Auxilio transporte",
    workedDays: "Días calculados",
    rulesNoteWithAllowance: (minWage: string, allowance: string, limit: string, year: number) =>
      `Usa salario mínimo ${minWage}, auxilio de transporte ${allowance} y límite ${limit} para ${year}.`,
    rulesNoteWithoutAllowance: (minWage: string, year: number) => `Usa salario mínimo ${minWage} para ${year}.`,
    qualifiesForAllowance: "Cumple límite legal para auxilio",
    yes: "Sí",
    no: "No",
    disclaimer:
      "Este resultado es una estimación para un empleado dependiente en Colombia. No incluye retención en la fuente, salario variable, pagos no salariales, acuerdos especiales ni ajustes internos del empleador.",
    emptyTitle: "Tus prestaciones aparecerán aquí",
    emptyDescription: "Completa salario, fechas y año de reglas para ver cesantías, intereses, prima, vacaciones y total estimado."
  },
  en: {
    kicker: "Calculator",
    title: "Social benefits details",
    monthlySalary: "Gross monthly salary",
    monthlySalaryHelp: "This is the salary before deductions.",
    monthlySalaryTooltip: "This is the gross monthly salary before health, pension, or other deductions. It is used as the base to estimate social benefits.",
    salaryHelper: "Only know biweekly pay?",
    salaryHelperAction: "Calculate salary",
    startDate: "From",
    startDateHelp: "Use the date from which you want to estimate accrued benefits. It does not have to be the employment start date if you only need a period.",
    endDate: "To",
    endDateHelp: "Use the final date of the period. The tool counts days between both dates to calculate proportional values.",
    payrollYear: "Year",
    payrollYearHelp: "We use it to apply the minimum wage, transportation allowance, and legal thresholds in force.",
    editYearAria: "Edit rule year",
    editYearTitle: "Edit year",
    transportationAllowance: "Transportation allowance",
    transportationAllowanceHelp: "Applied only when the salary meets the legal threshold.",
    assumption: "Vacation is fully accrued for the period. Used or paid days are not subtracted.",
    salaryRequired: "Enter a gross monthly salary greater than zero.",
    dateRequired: "Enter the start date and the end date.",
    dateOrder: "The end date cannot be earlier than the start date.",
    yearRange: (currentYear: number) => `Enter a year between 2024 and ${currentYear}.`,
    requestError: "We couldn't calculate the social benefits.",
    submit: "Calculate benefits",
    reset: "Reset",
    heroTitle: "Estimated social benefits total",
    severancePay: "Severance pay",
    severanceInterest: "Severance interest",
    serviceBonus: "Service bonus",
    vacationPay: "Accrued vacation",
    totalBenefits: "Total benefits",
    baseSalary: "Base salary",
    benefitsBase: "Benefits base",
    transportationAllowanceResult: "Transportation allowance",
    workedDays: "Calculated days",
    rulesNoteWithAllowance: (minWage: string, allowance: string, limit: string, year: number) =>
      `Uses minimum wage ${minWage}, transportation allowance ${allowance}, and threshold ${limit} for ${year}.`,
    rulesNoteWithoutAllowance: (minWage: string, year: number) => `Uses minimum wage ${minWage} for ${year}.`,
    qualifiesForAllowance: "Meets legal allowance threshold",
    yes: "Yes",
    no: "No",
    disclaimer:
      "This result is an estimate for a dependent employee in Colombia. It does not include withholding tax, variable salary, non-salary payments, special agreements, or employer-specific adjustments.",
    emptyTitle: "Your benefits will appear here",
    emptyDescription: "Complete salary, dates, and rule year to see severance, interest, service bonus, vacation, and estimated total."
  }
} as const;

export function SocialBenefitsColombiaCalculator() {
  const { locale, localizePath } = useLocale();
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
  const [startDate, setStartDate] = useState(yearStartDate());
  const [endDate, setEndDate] = useState(todayDate());
  const [year, setYear] = useState(currentPayrollYear.toString());
  const [isYearEditable, setIsYearEditable] = useState(false);
  const [includeTransportationAllowance, setIncludeTransportationAllowance] = useState(true);
  const [result, setResult] = useState<SocialBenefitsData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  function formatMoneyInput(value: string) {
    const normalized = value.replace(/[^\d]/g, "");
    return normalized.length > 0 ? numberFormatter.format(Number(normalized)) : "";
  }

  function formatMoney(value: number) {
    return currencyFormatter.format(value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const salaryValue = parseMoney(monthlySalary);
    const yearValue = Number(year);

    if (salaryValue <= 0) {
      setError(text.salaryRequired);
      return;
    }
    if (!startDate || !endDate) {
      setError(text.dateRequired);
      return;
    }
    if (new Date(endDate) < new Date(startDate)) {
      setError(text.dateOrder);
      return;
    }
    if (!Number.isInteger(yearValue) || yearValue < 2024 || yearValue > currentPayrollYear) {
      setError(text.yearRange(currentPayrollYear));
      return;
    }

    setIsLoading(true);
    try {
      const data = await calculateSocialBenefitsColombia({
        monthlySalary: salaryValue,
        startDate,
        endDate,
        year: yearValue,
        includeTransportationAllowance
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
    setStartDate(yearStartDate());
    setEndDate(todayDate());
    setYear(currentPayrollYear.toString());
    setIsYearEditable(false);
    setIncludeTransportationAllowance(true);
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
          <span className="field-label">
            {text.monthlySalary}<span className="required-mark">*</span>
            <span className="info-tooltip">
              <Info size={15} strokeWidth={2.1} />
              <span role="tooltip">{text.monthlySalaryTooltip}</span>
            </span>
          </span>
          <div className="money-input">
            <span>$</span>
            <input inputMode="numeric" onChange={(event) => setMonthlySalary(formatMoneyInput(event.target.value))} placeholder="2.500.000" required type="text" value={monthlySalary} />
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

        <div className="form-grid">
          <label className="field">
            <span className="field-label">
              {text.startDate}<span className="required-mark">*</span>
              <span className="info-tooltip">
                <Info size={15} strokeWidth={2.1} />
                <span role="tooltip">{text.startDateHelp}</span>
              </span>
            </span>
            <DateField ariaLabel={text.startDate} onChange={setStartDate} value={startDate} />
          </label>

          <label className="field">
            <span className="field-label">
              {text.endDate}<span className="required-mark">*</span>
              <span className="info-tooltip">
                <Info size={15} strokeWidth={2.1} />
                <span role="tooltip">{text.endDateHelp}</span>
              </span>
            </span>
            <DateField ariaLabel={text.endDate} onChange={setEndDate} value={endDate} />
          </label>
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

        <label className="toggle-field">
          <input checked={includeTransportationAllowance} onChange={(event) => setIncludeTransportationAllowance(event.target.checked)} type="checkbox" />
          <span><strong>{text.transportationAllowance}</strong><small>{text.transportationAllowanceHelp}</small></span>
        </label>

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>{text.assumption}</span>
        </div>

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
              <strong>{formatMoney(result.result.totalBenefits)}</strong>
              <span>{numberFormatter.format(result.period.workedDays)} {text.workedDays.toLowerCase()}</span>
            </div>

            <div className="result-breakdown">
              <ResultItem label={text.severancePay} value={result.result.severancePay} formatMoney={formatMoney} />
              <ResultItem label={text.severanceInterest} value={result.result.severanceInterest} formatMoney={formatMoney} />
              <ResultItem label={text.serviceBonus} value={result.result.serviceBonus} formatMoney={formatMoney} />
              <ResultItem label={text.vacationPay} value={result.result.vacationPay} formatMoney={formatMoney} />
              <ResultItem label={text.totalBenefits} value={result.result.totalBenefits} strong formatMoney={formatMoney} />
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
              <span>{text.baseSalary}: {formatMoney(result.result.baseSalary)}</span>
              <span>{text.benefitsBase}: {formatMoney(result.result.benefitsBase)}</span>
              {result.input.includeTransportationAllowance ? (
                <>
                  <span>{text.transportationAllowanceResult}: {formatMoney(result.result.transportationAllowance)}</span>
                  <span>{text.qualifiesForAllowance}: {result.rules.qualifiesForTransportationAllowance ? text.yes : text.no}</span>
                </>
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
