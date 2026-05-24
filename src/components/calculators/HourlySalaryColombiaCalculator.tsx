import { ArrowRight, Calculator, CheckCircle2, ChevronDown, CircleDollarSign, Info, Loader2, Pencil } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";
import { hourlySalaryColombiaCalculatorCopy as copy } from "../../locales/calculatorCopy";
import {
  calculateHourlySalaryColombia,
  type HourlySalaryColombiaResponse,
  type HourlySalaryType
} from "../../services/financeApi";

type HourlySalaryData = HourlySalaryColombiaResponse["data"];

function parseMoney(value: string) {
  const normalized = value.replace(/[^\d]/g, "");
  return normalized.length > 0 ? Number(normalized) : 0;
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
  if (currentDate >= "2026-07-15") return 42;
  if (currentDate >= "2025-07-15") return 44;
  if (currentDate >= "2024-07-15") return 46;
  if (currentDate >= "2023-07-15") return 47;
  return 48;
}

function buildPayrollYears(currentYear: number) {
  const years: number[] = [];
  for (let year = currentYear; year >= 2024; year -= 1) years.push(year);
  return years;
}

export function HourlySalaryColombiaCalculator() {
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
      setError(text.salaryRequired);
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
      const data = await calculateHourlySalaryColombia({
        monthlySalary: salaryValue,
        salaryType,
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

  function handleWeeklyHoursEditToggle() {
    setIsWeeklyHoursEditable((isEditable) => {
      const nextValue = !isEditable;
      if (!nextValue) setWeeklyHours(defaultLegalWeeklyHours.toString());
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

  const salaryTypeLabel = salaryType === "gross" ? text.gross : text.net;

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
            {text.salaryType} <span className="required-mark">*</span>
            <span className="info-tooltip">
              <Info size={15} strokeWidth={2.1} />
              <span role="tooltip">{text.salaryTypeHelp}</span>
            </span>
          </span>
          <span className="select-control">
            <select onChange={(event) => setSalaryType(event.target.value as HourlySalaryType)} value={salaryType}>
              <option value="gross">{text.gross}</option>
              <option value="net">{text.net}</option>
            </select>
            <ChevronDown size={18} strokeWidth={2.1} />
          </span>
        </label>

        <label className="field field--spaced">
          <span className="field-label">
            {text.monthlySalary} <span className="required-mark">*</span>
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
          <span>{salaryType === "net" ? text.salaryHelperNet : text.salaryHelperGross}</span>
          <a className="secondary-action secondary-action--compact" href={localizePath(salaryType === "net" ? "/tools/colombia-net-salary-calculator" : "/tools/colombia-gross-salary-calculator")}>
            {salaryType === "net" ? text.salaryHelperNetAction : text.salaryHelperGrossAction}
            <ArrowRight size={16} strokeWidth={2.1} />
          </a>
        </div>

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
              <div className="year-input year-input--manual">
                <input disabled={!isWeeklyHoursEditable} inputMode="numeric" min={1} onChange={(event) => setWeeklyHours(event.target.value)} required type="number" value={weeklyHours} />
                <button aria-label={text.editWeeklyHoursAria} onClick={handleWeeklyHoursEditToggle} title={text.editWeeklyHoursTitle} type="button">
                  <Pencil size={15} strokeWidth={2.1} />
                </button>
              </div>
            </label>
          </div>
        </div>

        {previewSalary > 0 ? (
          <div className="calculator-hint">
            <Info size={16} strokeWidth={2.1} />
            <span>{text.preview(formatMoney(previewSalary), weeklyHours, year, salaryType)}</span>
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
              <p>{result.input.salaryType === "gross" ? text.heroGross : text.heroNet}</p>
              <strong>{formatMoney(result.result.hourlySalary)}</strong>
              <span>{text.dailyValue}: {formatMoney(result.result.dailySalary)}</span>
            </div>

            <div className="result-breakdown">
              <ResultItem label={text.baseMonthlySalary} value={result.result.baseMonthlySalary} formatMoney={formatMoney} />
              <ResultItem label={text.usedMonthlySalary} value={result.result.monthlySalaryUsed} formatMoney={formatMoney} />
              <ResultTextItem label={text.weeklyHoursResult} value={`${result.result.weeklyHours}`} />
              <ResultTextItem label={text.monthlyHoursResult} value={`${result.result.monthlyHours}`} />
              {result.deductions.applies ? <ResultItem label={text.health} value={result.deductions.healthContribution} formatMoney={formatMoney} /> : null}
              {result.deductions.applies ? <ResultItem label={text.pension} value={result.deductions.pensionContribution} formatMoney={formatMoney} /> : null}
              {result.deductions.applies && result.deductions.solidarityPensionFundContribution > 0 ? (
                <ResultItem label={text.solidarityFund} value={result.deductions.solidarityPensionFundContribution} formatMoney={formatMoney} />
              ) : null}
              <ResultItem
                label={result.deductions.applies ? text.totalDeductions : text.dailyValueLabel}
                value={result.deductions.applies ? result.deductions.totalDeductions : result.result.dailySalary}
                strong
                formatMoney={formatMoney}
              />
            </div>

            <div className="rules-note">
              <CheckCircle2 size={18} strokeWidth={2.1} />
              <p>
                {result.rules.usedCustomWeeklyHours
                  ? text.customRulesNote(result.result.weeklyHours, result.year, result.rules.legalWeeklyHours)
                  : text.legalRulesNote(result.year, result.rules.legalWeeklyHours)}
              </p>
            </div>

            <div className="rules-grid">
              <span>{text.salaryTypeResult}: {salaryTypeLabel}</span>
              <span>{text.healthRate}: {formatRate(result.rules.employeeHealthRate)}</span>
              <span>{text.pensionRate}: {formatRate(result.rules.employeePensionRate)}</span>
              {result.deductions.applies ? <span>{text.solidarityRate}: {formatRate(result.rules.solidarityPensionFundRate)}</span> : null}
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

function ResultTextItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="result-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}


