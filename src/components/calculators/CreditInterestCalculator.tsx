import { Calculator, CheckCircle2, ChevronDown, CircleDollarSign, Info, Loader2 } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale, type Locale } from "../../i18n";
import { creditInterestCalculatorCopy as copy } from "../../locales/calculatorCopy";
import {
  calculateCreditInterest,
  type CompoundingFrequency,
  type CreditInterestCurrency,
  type CreditInterestResponse,
  type CreditInterestType
} from "../../services/financeApi";

type CreditInterestData = CreditInterestResponse["data"];

function parseMoney(value: string) {
  const normalized = value.replace(/[^\d]/g, "");
  return normalized.length > 0 ? Number(normalized) : 0;
}

function formatMoneyInput(value: string, formatter: Intl.NumberFormat) {
  const normalized = value.replace(/[^\d]/g, "");
  return normalized.length > 0 ? formatter.format(Number(normalized)) : "";
}

function parseRate(value: string) {
  const normalized = value.replace(",", ".").replace(/[^\d.]/g, "");
  return normalized.length > 0 ? Number(normalized) : 0;
}

function getInterestTypeLabel(type: CreditInterestType, locale: Locale) {
  return type === "simple" ? copy[locale].simple : copy[locale].compound;
}

function getFrequencyLabel(frequency: CompoundingFrequency, locale: Locale) {
  return frequency === "monthly" ? copy[locale].monthly : copy[locale].annually;
}

function formatCurrencyDisplay(value: number, currency: CreditInterestCurrency, localeCode: string) {
  const formatter = new Intl.NumberFormat(localeCode, {
    minimumFractionDigits: currency === "USD" ? 2 : 0,
    maximumFractionDigits: currency === "USD" ? 2 : 0
  });

  const amount = formatter.format(value);
  return currency === "USD" ? `$ ${amount}` : `COP ${amount}`;
}

export function CreditInterestCalculator() {
  const { locale } = useLocale();
  const text = copy[locale];
  const localeCode = locale === "es" ? "es-CO" : "en-US";
  const [currency, setCurrency] = useState<CreditInterestCurrency>("COP");
  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(localeCode, { maximumFractionDigits: 0 }),
    [localeCode]
  );

  const [loanAmount, setLoanAmount] = useState("5.000.000");
  const [annualInterestRate, setAnnualInterestRate] = useState("24");
  const [termMonths, setTermMonths] = useState("12");
  const [interestType, setInterestType] = useState<CreditInterestType>("compound");
  const [compoundingFrequency, setCompoundingFrequency] = useState<CompoundingFrequency>("monthly");
  const [result, setResult] = useState<CreditInterestData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  function getDefaultLoanAmount(nextCurrency: CreditInterestCurrency) {
    return nextCurrency === "USD" ? numberFormatter.format(5000) : numberFormatter.format(5000000);
  }

  function formatRate(value: number) {
    return `${(value * 100).toLocaleString(localeCode, { maximumFractionDigits: 4 })}%`;
  }

  const termShortcuts = useMemo(
    () => [
      { label: text.sixMonths, value: "6" },
      { label: text.oneYear, value: "12" },
      { label: text.twoYears, value: "24" },
      { label: text.threeYears, value: "36" },
      { label: text.fiveYears, value: "60" }
    ],
    [text]
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const loanAmountValue = parseMoney(loanAmount);
    const annualInterestRateValue = parseRate(annualInterestRate);
    const termMonthsValue = Number(termMonths);

    if (loanAmountValue <= 0) {
      setError(text.amountError);
      return;
    }

    if (annualInterestRateValue < 0 || annualInterestRateValue > 1000) {
      setError(text.rateError);
      return;
    }

    if (!Number.isInteger(termMonthsValue) || termMonthsValue <= 0 || termMonthsValue > 600) {
      setError(text.termError);
      return;
    }

    setIsLoading(true);

    try {
      const data = await calculateCreditInterest({
        loanAmount: loanAmountValue,
        annualInterestRate: annualInterestRateValue,
        termMonths: termMonthsValue,
        interestType,
        compoundingFrequency,
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

  function handleReset() {
    setLoanAmount(getDefaultLoanAmount("COP"));
    setAnnualInterestRate("24");
    setTermMonths("12");
    setInterestType("compound");
    setCompoundingFrequency("monthly");
    setCurrency("COP");
    setResult(null);
    setError("");
  }

  function handleCurrencyChange(nextCurrency: CreditInterestCurrency) {
    setCurrency(nextCurrency);
    setLoanAmount(getDefaultLoanAmount(nextCurrency));
    setResult(null);
    setError("");
  }

  const activeCurrency = result?.currency ?? currency;

  function formatResultMoney(value: number) {
    return formatCurrencyDisplay(value, activeCurrency, localeCode);
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
            {text.currency}
            <span className="info-tooltip">
              <Info size={15} strokeWidth={2.1} />
              <span role="tooltip">{text.currencyHelp}</span>
            </span>
          </span>
          <span className="select-control">
            <select
              className="plain-select"
              onChange={(event) => handleCurrencyChange(event.target.value as CreditInterestCurrency)}
              value={currency}
            >
              <option value="COP">{text.cop}</option>
              <option value="USD">{text.usd}</option>
            </select>
            <ChevronDown size={18} strokeWidth={2.1} />
          </span>
        </label>

        <label className="field field--spaced">
          <span>
            {text.loanAmount} <span className="required-mark">*</span>
          </span>
          <div className="money-input">
            <span>$</span>
            <input
              inputMode="numeric"
              onChange={(event) => setLoanAmount(formatMoneyInput(event.target.value, numberFormatter))}
              placeholder="5.000.000"
              required
              type="text"
              value={loanAmount}
            />
            <strong>{currency}</strong>
          </div>
          <small>{text.loanAmountHelp}</small>
        </label>

        <div className="form-grid form-grid--single">
          <label className="field">
            <span className="field-label">
              {text.annualRate} <span className="required-mark">*</span>
              <span className="info-tooltip">
                <Info size={15} strokeWidth={2.1} />
                <span role="tooltip">{text.annualRateHelp}</span>
              </span>
            </span>
            <div className="rate-input">
              <input
                inputMode="decimal"
                onChange={(event) => setAnnualInterestRate(event.target.value)}
                placeholder="24"
                required
                type="text"
                value={annualInterestRate}
              />
              <strong>%</strong>
            </div>
          </label>
        </div>

        <div className={interestType === "compound" ? "form-grid" : "form-grid form-grid--single"}>
          <label className="field">
            <span className="field-label">
              {text.interestType} <span className="required-mark">*</span>
              <span className="info-tooltip">
                <Info size={15} strokeWidth={2.1} />
                <span role="tooltip">{text.interestTypeHelp}</span>
              </span>
            </span>
            <span className="select-control">
              <select
                className="plain-select"
                onChange={(event) => setInterestType(event.target.value as CreditInterestType)}
                value={interestType}
              >
                <option value="compound">{text.compound}</option>
                <option value="simple">{text.simple}</option>
              </select>
              <ChevronDown size={18} strokeWidth={2.1} />
            </span>
          </label>

          {interestType === "compound" ? (
            <label className="field">
              <span className="field-label">
                {text.compounding}
                <span className="info-tooltip">
                  <Info size={15} strokeWidth={2.1} />
                  <span role="tooltip">{text.compoundingHelp}</span>
                </span>
              </span>
              <span className="select-control">
                <select
                  className="plain-select"
                  onChange={(event) => setCompoundingFrequency(event.target.value as CompoundingFrequency)}
                  value={compoundingFrequency}
                >
                  <option value="monthly">{text.monthly}</option>
                  <option value="annually">{text.annually}</option>
                </select>
                <ChevronDown size={18} strokeWidth={2.1} />
              </span>
            </label>
          ) : null}
        </div>

        <label className="field field--spaced">
          <span className="field-label">
            {text.termMonths} <span className="required-mark">*</span>
            <span className="info-tooltip">
              <Info size={15} strokeWidth={2.1} />
              <span role="tooltip">{text.termMonthsHelp}</span>
            </span>
          </span>
          <input
            inputMode="numeric"
            min={1}
            onChange={(event) => setTermMonths(event.target.value)}
            placeholder="12"
            required
            type="number"
            value={termMonths}
          />
          <div className="quick-options" aria-label={text.termMonths}>
            {termShortcuts.map((shortcut) => (
              <button
                key={shortcut.value}
                className={termMonths === shortcut.value ? "is-active" : ""}
                onClick={() => setTermMonths(shortcut.value)}
                type="button"
              >
                {shortcut.label}
              </button>
            ))}
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
            <p>{text.totalToPay}</p>
            <strong>{formatResultMoney(result.result.totalToPay)}</strong>
            <span>{text.estimatedInterest}: {formatResultMoney(result.result.totalInterest)}</span>
          </div>

          <div className="result-breakdown">
            <div className="result-item">
              <span>{text.totalInterest}</span>
              <strong>{formatResultMoney(result.result.totalInterest)}</strong>
            </div>
            <div className="result-item">
              <span>{text.monthlyAverage}</span>
              <strong>{formatResultMoney(result.result.estimatedMonthlyAverage)}</strong>
            </div>
            <div className="result-item">
              <span>{text.monthlyRate}</span>
              <strong>{formatRate(result.result.monthlyRate)}</strong>
            </div>
            <div className="result-item">
              <span>{text.effectiveAnnualRate}</span>
              <strong>{formatRate(result.result.effectiveAnnualRate)}</strong>
            </div>
            <div className="result-item">
              <span>{text.interestType}</span>
              <strong>{getInterestTypeLabel(result.input.interestType, locale)}</strong>
            </div>
            <div className="result-item">
              <span>{text.formulaUsed}</span>
              <strong>{result.calculation.formula === "simple_interest" ? text.simple : text.compound}</strong>
            </div>
            <div className="result-item result-item--strong">
              <span>{text.currencyResult}</span>
              <strong>{activeCurrency === "USD" ? "$" : "COP"}</strong>
            </div>
          </div>

          <div className="rules-note">
            <CheckCircle2 size={18} strokeWidth={2.1} />
            <p>{text.rulesNote(result.calculation.periods, getFrequencyLabel(result.input.compoundingFrequency, locale))}</p>
          </div>

          <p className="disclaimer">{text.disclaimer}</p>
        </aside>
      ) : (
        <aside className="result-panel result-panel--empty" ref={resultRef}>
          <div className="result-empty">
            <CircleDollarSign size={34} strokeWidth={2.1} />
            <h2>{text.emptyTitle}</h2>
            <p>{text.emptyDescription}</p>
          </div>
        </aside>
      )}
    </div>
  );
}
