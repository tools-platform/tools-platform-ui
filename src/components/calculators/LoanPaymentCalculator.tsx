import { Calculator, CheckCircle2, ChevronDown, CircleDollarSign, Info, Loader2 } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";
import {
  calculateLoanPayment,
  type LoanPaymentRateType,
  type LoanPaymentResponse
} from "../../services/financeApi";

type LoanPaymentData = LoanPaymentResponse["data"];

const copy = {
  es: {
    kicker: "Calculadora",
    title: "Datos del préstamo",
    loanAmount: "Monto del préstamo",
    loanAmountHelp: "Es el dinero que piensas solicitar antes de intereses y cargos.",
    annualRate: "Tasa anual",
    monthlyRateTitle: "Tasa mensual",
    rateHelp:
      "Escribe el porcentaje según el tipo de tasa elegido. Si seleccionas efectiva anual, usa la tasa del año completo. Si seleccionas mensual, usa la tasa que se aplica cada mes.",
    rateType: "Tipo de tasa",
    rateTypeHelp:
      "Efectiva anual: tasa para todo el año. Mensual: tasa que se aplica cada mes.",
    effectiveAnnual: "Efectiva anual",
    monthly: "Mensual",
    termMonths: "Plazo en meses",
    termMonthsHelp: "Si tienes el plazo en años, multiplícalo por 12. Por ejemplo, 3 años son 36 meses.",
    hint: "Esta cuota es una estimación fija. No incluye seguros, comisiones ni cargos de la entidad.",
    submit: "Calcular cuota",
    reset: "Restablecer",
    amountError: "Ingresa un monto de préstamo mayor a cero.",
    rateError: "Ingresa una tasa entre 0% y 1000%.",
    termError: "Ingresa un plazo entre 1 y 600 meses.",
    requestError: "No se pudo calcular la cuota.",
    heroTitle: "Cuota mensual estimada",
    totalToPay: "Total a pagar",
    monthlyPayment: "Cuota mensual",
    totalInterest: "Intereses totales",
    monthlyRateUsed: "Tasa mensual usada",
    rulesNote: (periods: number, effectiveAnnualRate: string) =>
      `Se calcularon ${periods} cuotas fijas con tasa efectiva anual de ${effectiveAnnualRate}.`,
    disclaimer:
      "Resultado estimado. No incluye seguros, comisiones, impuestos, cargos administrativos, mora, tasas variables ni condiciones específicas de una entidad financiera.",
    emptyTitle: "Resultado de la cuota",
    emptyDescription: "Ingresa monto, tasa y plazo para estimar cuánto pagarías cada mes.",
    sixMonths: "6 meses",
    oneYear: "1 año",
    twoYears: "2 años",
    threeYears: "3 años",
    fiveYears: "5 años"
  },
  en: {
    kicker: "Calculator",
    title: "Loan details",
    loanAmount: "Loan amount",
    loanAmountHelp: "This is the money you plan to borrow before interest and fees.",
    annualRate: "Annual rate",
    monthlyRateTitle: "Monthly rate",
    rateHelp:
      "Enter the percentage based on the selected rate type. If you choose effective annual, use the full-year rate. If you choose monthly, use the rate applied each month.",
    rateType: "Rate type",
    rateTypeHelp: "Effective annual: rate for the full year. Monthly: rate applied every month.",
    effectiveAnnual: "Effective annual",
    monthly: "Monthly",
    termMonths: "Term in months",
    termMonthsHelp: "If you have the term in years, multiply it by 12. For example, 3 years are 36 months.",
    hint: "This payment is a fixed estimate. It does not include insurance, fees, or lender charges.",
    submit: "Calculate payment",
    reset: "Reset",
    amountError: "Enter a loan amount greater than zero.",
    rateError: "Enter a rate between 0% and 1000%.",
    termError: "Enter a term between 1 and 600 months.",
    requestError: "We couldn't calculate the payment.",
    heroTitle: "Estimated monthly payment",
    totalToPay: "Total to pay",
    monthlyPayment: "Monthly payment",
    totalInterest: "Total interest",
    monthlyRateUsed: "Monthly rate used",
    rulesNote: (periods: number, effectiveAnnualRate: string) =>
      `Calculated ${periods} fixed payments with an effective annual rate of ${effectiveAnnualRate}.`,
    disclaimer:
      "Estimated result. It does not include insurance, fees, taxes, administrative charges, late interest, variable rates, or institution-specific conditions.",
    emptyTitle: "Payment result",
    emptyDescription: "Enter amount, rate, and term to estimate how much you would pay each month.",
    sixMonths: "6 months",
    oneYear: "1 year",
    twoYears: "2 years",
    threeYears: "3 years",
    fiveYears: "5 years"
  }
} as const;

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

function getRateTypeLabel(rateType: LoanPaymentRateType, locale: "es" | "en") {
  return rateType === "effective_annual" ? copy[locale].effectiveAnnual : copy[locale].monthly;
}

export function LoanPaymentCalculator() {
  const { locale } = useLocale();
  const text = copy[locale];
  const localeCode = locale === "es" ? "es-CO" : "en-US";
  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(localeCode, { maximumFractionDigits: 0 }),
    [localeCode]
  );
  const currencyFormatter = useMemo(
    () => new Intl.NumberFormat(localeCode, { style: "currency", currency: "COP", maximumFractionDigits: 0 }),
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

  function formatMoney(value: number) {
    return currencyFormatter.format(value);
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
        currency: "COP"
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
    setLoanAmount("5.000.000");
    setInterestRate("24");
    setRateType("effective_annual");
    setTermMonths("12");
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
            <strong>COP</strong>
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
