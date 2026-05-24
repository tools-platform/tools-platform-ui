import { BriefcaseBusiness, CheckCircle2, CircleDollarSign, Info, Loader2, Pencil } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";
import { employeeSalaryEquivalentCalculatorCopy as copy } from "../../locales/calculatorCopy";
import {
  calculateEmployeeSalaryEquivalent,
  type EmployeeSalaryEquivalentResponse
} from "../../services/workApi";

type EmployeeSalaryEquivalentData = EmployeeSalaryEquivalentResponse["data"];

function parseMoney(value: string) {
  const normalized = value.replace(/[^\d]/g, "");
  return normalized.length > 0 ? Number(normalized) : 0;
}

function buildPayrollYears(currentYear: number) {
  const years: number[] = [];
  for (let year = currentYear; year >= 2024; year -= 1) years.push(year);
  return years;
}

export function EmployeeSalaryEquivalentCalculator() {
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
  const decimalFormatter = useMemo(
    () => new Intl.NumberFormat(localeCode, { maximumFractionDigits: 2 }),
    [localeCode]
  );

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
      setError(text.hourlyRateRequired);
      return;
    }
    if (!Number.isInteger(yearValue) || yearValue < 2024 || yearValue > currentPayrollYear) {
      setError(text.yearRange(currentPayrollYear));
      return;
    }
    if (!Number.isFinite(weeklyHoursValue) || weeklyHoursValue <= 0 || weeklyHoursValue > 168) {
      setError(text.weeklyHoursRange);
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
      setError(requestError instanceof Error ? requestError.message : text.requestError);
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
            <p className="section__kicker">{text.kicker}</p>
            <h2>{text.title}</h2>
          </div>
          <span>
            <BriefcaseBusiness size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span>{text.hourlyRate} <span className="required-mark">*</span></span>
          <div className="money-input">
            <span>$</span>
            <input inputMode="numeric" onChange={(event) => setHourlyRate(formatMoneyInput(event.target.value))} placeholder="40.000" required type="text" value={hourlyRate} />
            <strong>COP</strong>
          </div>
          <small>{text.hourlyRateHelp}</small>
        </label>

        <div className="form-grid form-grid--single">
          <div className="form-grid form-grid--compact">
            <label className="field">
              <span className="field-label">
                {text.payrollYear} <span className="required-mark">*</span>
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
                {text.weeklyHours} <span className="required-mark">*</span>
                <span className="info-tooltip">
                  <Info size={15} strokeWidth={2.1} />
                  <span role="tooltip">{text.weeklyHoursHelp}</span>
                </span>
              </span>
              <input className="input--compact" inputMode="decimal" max={168} min={1} onChange={(event) => setWeeklyHours(event.target.value)} required type="number" value={weeklyHours} />
            </label>
          </div>
        </div>

        {previewHourlyRate > 0 ? (
          <div className="calculator-hint">
            <Info size={16} strokeWidth={2.1} />
            <span>{text.preview(formatMoney(previewHourlyRate), weeklyHours, year)}</span>
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

      {result ? (
        <aside className="result-panel" ref={resultRef}>
          <div className="result-panel__hero">
            <p>{text.heroTitle}</p>
            <strong>{formatMoney(result.result.netMonthlyEquivalentSalary)}</strong>
            <span>{text.grossMonthlyEquivalent}: {formatMoney(result.result.grossMonthlyEquivalentSalary)}</span>
          </div>

          <div className="result-breakdown">
            <div className="result-item">
              <span>{text.weeklyIndependentIncome}</span>
              <strong>{formatMoney(result.result.weeklyIndependentIncome)}</strong>
            </div>
            <div className="result-item">
              <span>{text.grossBiweeklyEquivalentSalary}</span>
              <strong>{formatMoney(result.result.grossBiweeklyEquivalentSalary)}</strong>
            </div>
            <div className="result-item">
              <span>{text.netBiweeklyEquivalentSalary}</span>
              <strong>{formatMoney(result.result.netBiweeklyEquivalentSalary)}</strong>
            </div>
            <div className="result-item">
              <span>{text.grossAnnualEquivalentSalary}</span>
              <strong>{formatMoney(result.result.grossAnnualEquivalentSalary)}</strong>
            </div>
            <div className="result-item">
              <span>{text.monthlyWorkingHours}</span>
              <strong>{formatDecimal(result.result.monthlyWorkingHours)}</strong>
            </div>
            <div className="result-item result-item--strong">
              <span>{text.totalDeductions}</span>
              <strong>{formatMoney(result.deductions.totalDeductions)}</strong>
            </div>
          </div>

          <div className="rules-note">
            <CheckCircle2 size={18} strokeWidth={2.1} />
            <p>{text.rulesNote(formatDecimal(result.result.monthlyWorkingHours))}</p>
          </div>

          <div className="rules-grid">
            <span>{text.health}: {formatRate(result.rules.employeeHealthRate)}</span>
            <span>{text.pension}: {formatRate(result.rules.employeePensionRate)}</span>
            <span>{text.solidarity}: {formatRate(result.rules.solidarityPensionFundRate)}</span>
          </div>

          <p className="disclaimer">{text.disclaimer}</p>
        </aside>
      ) : (
        <aside className="result-panel result-panel--empty" ref={resultRef}>
          <div className="result-empty">
            <BriefcaseBusiness size={34} strokeWidth={2.1} />
            <h2>{text.emptyTitle}</h2>
            <p>{text.emptyDescription}</p>
          </div>
        </aside>
      )}
    </div>
  );
}
