import { Calculator, CheckCircle2, ChevronDown, CircleDollarSign, Info, Loader2 } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale, type Locale } from "../../i18n";
import { loanPaymentCalculatorCopy as copy } from "../../locales/calculatorCopy";
import {
  calculateLoanPayment,
  type CreditInterestCurrency,
  type LoanPaymentRateType,
  type LoanPaymentResponse
} from "../../services/financeApi";

type LoanPaymentData = LoanPaymentResponse["data"];

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

function getRateTypeLabel(rateType: LoanPaymentRateType, locale: Locale) {
  return rateType === "effective_annual" ? copy[locale].effectiveAnnual : copy[locale].monthly;
}

function formatCurrencyDisplay(value: number, currency: CreditInterestCurrency, localeCode: string) {
  const formatter = new Intl.NumberFormat(localeCode, {
    minimumFractionDigits: currency === "USD" ? 2 : 0,
    maximumFractionDigits: currency === "USD" ? 2 : 0
  });

  const amount = formatter.format(value);
  return currency === "USD" ? `$ ${amount}` : `COP ${amount}`;
}

export function LoanPaymentCalculator() {
  const { locale } = useLocale();
  const text = copy[locale];
  const localeCode = locale === "es" ? "es-CO" : "en-US";
  const [currency, setCurrency] = useState<CreditInterestCurrency>("COP");
  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(localeCode, { maximumFractionDigits: 0 }),
    [localeCode]
  );

  const [loanAmount, setLoanAmount] = useState("5.000.000");
  const [interestRate, setInterestRate] = useState("24");
  const [rateType, setRateType] = useState<LoanPaymentRateType>("effective_annual");
  const [termMonths, setTermMonths] = useState("12");
  const [result, setResult] = useState<LoanPaymentData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  function getDefaultLoanAmount(nextCurrency: CreditInterestCurrency) {
    return nextCurrency === "USD" ? numberFormatter.format(5000) : numberFormatter.format(5000000);
  }

  function formatMoney(value: number) {
    return formatCurrencyDisplay(value, result?.currency ?? currency, localeCode);
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
    const interestRateValue = parseRate(interestRate);
    const termMonthsValue = Number(termMonths);

    if (loanAmountValue <= 0) {
      setError(text.amountError);
      return;
    }

    if (interestRateValue < 0 || interestRateValue > 1000) {
      setError(text.rateError);
      return;
    }

    if (!Number.isInteger(termMonthsValue) || termMonthsValue <= 0 || termMonthsValue > 600) {
      setError(text.termError);
      return;
    }

    setIsLoading(true);

    try {
      const data = await calculateLoanPayment({
        loanAmount: loanAmountValue,
        interestRate: interestRateValue,
        rateType,
        termMonths: termMonthsValue,
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

  function handleCurrencyChange(nextCurrency: CreditInterestCurrency) {
    setCurrency(nextCurrency);
    setLoanAmount(getDefaultLoanAmount(nextCurrency));
    setResult(null);
    setError("");
  }

  function handleReset() {
    setLoanAmount(getDefaultLoanAmount("COP"));
    setInterestRate("24");
    setRateType("effective_annual");
    setTermMonths("12");
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
              placeholder={currency === "USD" ? "5,000" : "5.000.000"}
              required
              type="text"
              value={loanAmount}
            />
            <strong>{currency}</strong>
          </div>
          <small>{text.loanAmountHelp}</small>
        </label>

        <div className="form-grid">
          <label className="field">
            <span className="field-label">
              {rateType === "effective_annual" ? text.annualRate : text.monthlyRateTitle}{" "}
              <span className="required-mark">*</span>
              <span className="info-tooltip">
                <Info size={15} strokeWidth={2.1} />
                <span role="tooltip">{text.rateHelp}</span>
              </span>
            </span>
            <div className="rate-input">
              <input
                inputMode="decimal"
                onChange={(event) => setInterestRate(event.target.value)}
                placeholder="24"
                required
                type="text"
                value={interestRate}
              />
              <strong>%</strong>
            </div>
          </label>

          <label className="field">
            <span className="field-label">
              {text.rateType} <span className="required-mark">*</span>
              <span className="info-tooltip">
                <Info size={15} strokeWidth={2.1} />
                <span role="tooltip">{text.rateTypeHelp}</span>
              </span>
            </span>
            <span className="select-control">
              <select
                className="plain-select"
                onChange={(event) => setRateType(event.target.value as LoanPaymentRateType)}
                value={rateType}
              >
                <option value="effective_annual">{text.effectiveAnnual}</option>
                <option value="monthly">{text.monthly}</option>
              </select>
              <ChevronDown size={18} strokeWidth={2.1} />
            </span>
          </label>
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
            <p>{text.heroTitle}</p>
            <strong>{formatMoney(result.result.monthlyPayment)}</strong>
            <span>{text.totalToPay}: {formatMoney(result.result.totalToPay)}</span>
          </div>

          <div className="result-breakdown">
            <div className="result-item">
              <span>{text.monthlyPayment}</span>
              <strong>{formatMoney(result.result.monthlyPayment)}</strong>
            </div>
            <div className="result-item">
              <span>{text.totalInterest}</span>
              <strong>{formatMoney(result.result.totalInterest)}</strong>
            </div>
            <div className="result-item">
              <span>{text.totalToPay}</span>
              <strong>{formatMoney(result.result.totalToPay)}</strong>
            </div>
            <div className="result-item">
              <span>{text.monthlyRateUsed}</span>
              <strong>{formatRate(result.result.monthlyRate)}</strong>
            </div>
            <div className="result-item">
              <span>{text.rateType}</span>
              <strong>{getRateTypeLabel(result.input.rateType, locale)}</strong>
            </div>
            <div className="result-item">
              <span>{text.currencyResult}</span>
              <strong>{activeCurrency === "USD" ? "$" : "COP"}</strong>
            </div>
            <div className="result-item result-item--strong">
              <span>{text.termMonths}</span>
              <strong>{result.input.termMonths} {locale === "es" ? "meses" : "months"}</strong>
            </div>
          </div>

          <div className="rules-note">
            <CheckCircle2 size={18} strokeWidth={2.1} />
            <p>{text.rulesNote(result.calculation.periods, formatRate(result.result.effectiveAnnualRate))}</p>
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
