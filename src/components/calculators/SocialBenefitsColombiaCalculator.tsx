import { ArrowRight, Calculator, CheckCircle2, CircleDollarSign, Info, Loader2, Pencil } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { DateField } from "../DateField";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";
import { calculateSocialBenefitsColombia, type SocialBenefitsColombiaResponse } from "../../services/financeApi";
import { socialBenefitsColombiaCalculatorCopy as copy } from "../../locales/calculatorCopy";

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
