import { BriefcaseBusiness, CheckCircle2, ChevronDown, CircleDollarSign, Info, Loader2 } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";
import { freelanceRateCalculatorCopy as copy } from "../../locales/calculatorCopy";
import {
  calculateFreelanceRate,
  type FreelanceRateResponse,
  type WorkCurrency
} from "../../services/workApi";

type FreelanceRateData = FreelanceRateResponse["data"];

function parseMoney(value: string) {
  const normalized = value.replace(/[^\d]/g, "");
  return normalized.length > 0 ? Number(normalized) : 0;
}

function parseNumber(value: string) {
  const normalized = value.replace(",", ".").replace(/[^\d.]/g, "");
  return normalized.length > 0 ? Number(normalized) : 0;
}

function formatCurrencyDisplay(value: number, currency: WorkCurrency, localeCode: string) {
  const formatter = new Intl.NumberFormat(localeCode, {
    minimumFractionDigits: currency === "USD" ? 2 : 0,
    maximumFractionDigits: currency === "USD" ? 2 : 0
  });

  const amount = formatter.format(value);
  return currency === "USD" ? `$ ${amount}` : `COP ${amount}`;
}

export function FreelanceRateCalculator() {
  const { locale } = useLocale();
  const text = copy[locale];
  const localeCode = locale === "es" ? "es-CO" : "en-US";
  const [currency, setCurrency] = useState<WorkCurrency>("COP");
  const numberFormatter = useMemo(() => new Intl.NumberFormat(localeCode, { maximumFractionDigits: 0 }), [localeCode]);
  const decimalFormatter = useMemo(() => new Intl.NumberFormat(localeCode, { maximumFractionDigits: 2 }), [localeCode]);
  const [desiredMonthlyIncome, setDesiredMonthlyIncome] = useState("5.000.000");
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState("5");
  const [hoursPerDay, setHoursPerDay] = useState("6");
  const [safetyMarginPercentage, setSafetyMarginPercentage] = useState("20");
  const [result, setResult] = useState<FreelanceRateData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  function getDefaultDesiredMonthlyIncome(nextCurrency: WorkCurrency) {
    return nextCurrency === "USD" ? numberFormatter.format(5000) : numberFormatter.format(5000000);
  }

  function formatMoneyInput(value: string) {
    const normalized = value.replace(/[^\d]/g, "");
    return normalized.length > 0 ? numberFormatter.format(Number(normalized)) : "";
  }

  function formatMoney(value: number) {
    return formatCurrencyDisplay(value, result?.currency ?? currency, localeCode);
  }

  function formatDecimal(value: number) {
    return decimalFormatter.format(value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const desiredMonthlyIncomeValue = parseMoney(desiredMonthlyIncome);
    const workDaysPerWeekValue = Number(workDaysPerWeek);
    const hoursPerDayValue = parseNumber(hoursPerDay);
    const safetyMarginPercentageValue = parseNumber(safetyMarginPercentage);

    if (desiredMonthlyIncomeValue <= 0) {
      setError(text.monthlyGoalError);
      return;
    }
    if (!Number.isInteger(workDaysPerWeekValue) || workDaysPerWeekValue < 1 || workDaysPerWeekValue > 7) {
      setError(text.workDaysError);
      return;
    }
    if (hoursPerDayValue <= 0 || hoursPerDayValue > 24) {
      setError(text.hoursError);
      return;
    }
    if (safetyMarginPercentageValue < 0 || safetyMarginPercentageValue > 300) {
      setError(text.marginError);
      return;
    }

    setIsLoading(true);
    try {
      const data = await calculateFreelanceRate({
        desiredMonthlyIncome: desiredMonthlyIncomeValue,
        workDaysPerWeek: workDaysPerWeekValue,
        hoursPerDay: hoursPerDayValue,
        safetyMarginPercentage: safetyMarginPercentageValue,
        currency
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

  function handleCurrencyChange(nextCurrency: WorkCurrency) {
    setCurrency(nextCurrency);
    setDesiredMonthlyIncome(getDefaultDesiredMonthlyIncome(nextCurrency));
    setResult(null);
    setError("");
  }

  function handleReset() {
    setDesiredMonthlyIncome(getDefaultDesiredMonthlyIncome("COP"));
    setWorkDaysPerWeek("5");
    setHoursPerDay("6");
    setSafetyMarginPercentage("20");
    setCurrency("COP");
    setResult(null);
    setError("");
  }

  const activeCurrency = result?.currency ?? currency;

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
          <span className="field-label">
            {text.currency}
            <span className="info-tooltip">
              <Info size={15} strokeWidth={2.1} />
              <span role="tooltip">{text.currencyHelp}</span>
            </span>
          </span>
          <span className="select-control">
            <select
              className="plain-select"
              onChange={(event) => handleCurrencyChange(event.target.value as WorkCurrency)}
              value={currency}
            >
              <option value="COP">{text.cop}</option>
              <option value="USD">{text.usd}</option>
            </select>
            <ChevronDown size={18} strokeWidth={2.1} />
          </span>
        </label>

        <label className="field field--spaced">
          <span>{text.desiredMonthlyIncome} <span className="required-mark">*</span></span>
          <div className="money-input">
            <span>$</span>
            <input
              inputMode="numeric"
              onChange={(event) => setDesiredMonthlyIncome(formatMoneyInput(event.target.value))}
              placeholder={currency === "USD" ? "5,000" : "5.000.000"}
              required
              type="text"
              value={desiredMonthlyIncome}
            />
            <strong>{currency}</strong>
          </div>
          <small>{text.desiredMonthlyIncomeHelp}</small>
        </label>

        <div className="form-grid">
          <label className="field">
            <span>{text.workDaysPerWeek} <span className="required-mark">*</span></span>
            <input inputMode="numeric" max={7} min={1} onChange={(event) => setWorkDaysPerWeek(event.target.value)} required type="number" value={workDaysPerWeek} />
          </label>
          <label className="field">
            <span>{text.hoursPerDay} <span className="required-mark">*</span></span>
            <input inputMode="decimal" max={24} min={1} onChange={(event) => setHoursPerDay(event.target.value)} required type="number" value={hoursPerDay} />
          </label>
        </div>

        <label className="field field--spaced">
          <span className="field-label">
            {text.safetyMargin}
            <span className="info-tooltip">
              <Info size={15} strokeWidth={2.1} />
              <span role="tooltip">{text.safetyMarginHelp}</span>
            </span>
          </span>
          <div className="rate-input">
            <input inputMode="decimal" onChange={(event) => setSafetyMarginPercentage(event.target.value)} placeholder="20" type="text" value={safetyMarginPercentage} />
            <strong>%</strong>
          </div>
        </label>

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
          {text.reset}
        </button>
      </form>

      {result ? (
        <aside className="result-panel" ref={resultRef}>
          <div className="result-panel__hero">
            <p>{text.heroTitle}</p>
            <strong>{formatMoney(result.result.suggestedHourlyRate)}</strong>
            <span>{text.targetWithMargin}: {formatMoney(result.result.targetMonthlyRevenue)}</span>
          </div>

          <div className="result-breakdown">
            <div className="result-item">
              <span>{text.minimumHourlyRate}</span>
              <strong>{formatMoney(result.result.minimumHourlyRate)}</strong>
            </div>
            <div className="result-item">
              <span>{text.suggestedDailyRate}</span>
              <strong>{formatMoney(result.result.suggestedDailyRate)}</strong>
            </div>
            <div className="result-item">
              <span>{text.suggestedWeeklyRate}</span>
              <strong>{formatMoney(result.result.suggestedWeeklyRate)}</strong>
            </div>
            <div className="result-item">
              <span>{text.monthlyHours}</span>
              <strong>{formatDecimal(result.result.monthlyWorkingHours)}</strong>
            </div>
            <div className="result-item">
              <span>{text.weeklyHours}</span>
              <strong>{formatDecimal(result.result.weeklyWorkingHours)}</strong>
            </div>
            <div className="result-item">
              <span>{text.currencyResult}</span>
              <strong>{activeCurrency === "USD" ? "$" : "COP"}</strong>
            </div>
            <div className="result-item result-item--strong">
              <span>{text.addedMargin}</span>
              <strong>{formatMoney(result.result.safetyMarginAmount)}</strong>
            </div>
          </div>

          <div className="rules-note">
            <CheckCircle2 size={18} strokeWidth={2.1} />
            <p>{text.rulesNote(result.input.workDaysPerWeek, formatDecimal(result.input.hoursPerDay), result.rules.weeksPerMonth)}</p>
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
