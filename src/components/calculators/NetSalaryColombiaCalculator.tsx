import { Calculator, CheckCircle2, CircleDollarSign, Info, Loader2, Pencil } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";
import { calculateNetSalaryColombia, type NetSalaryColombiaResponse } from "../../services/financeApi";
import { netSalaryColombiaCalculatorCopy as copy } from "../../locales/calculatorCopy";

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


