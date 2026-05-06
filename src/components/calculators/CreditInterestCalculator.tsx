import { Calculator, CheckCircle2, ChevronDown, CircleDollarSign, Info, Loader2 } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";
import {
  calculateCreditInterest,
  type CompoundingFrequency,
  type CreditInterestResponse,
  type CreditInterestType
} from "../../services/financeApi";

type CreditInterestData = CreditInterestResponse["data"];

const copy = {
  es: {
    kicker: "Calculadora",
    title: "Datos del crédito",
    loanAmount: "Monto del préstamo",
    loanAmountHelp: "Es el dinero que recibes o piensas solicitar antes de intereses y cargos.",
    annualRate: "Tasa anual",
    annualRateHelp:
      "Usa la tasa anual del crédito. Si tu entidad te dio una tasa mensual, conviértela antes de usar esta calculadora.",
    interestType: "Tipo de interés",
    interestTypeHelp:
      "Simple calcula interés sobre el capital inicial. Compuesto acumula intereses según la capitalización elegida.",
    compound: "Interés compuesto",
    simple: "Interés simple",
    compounding: "Capitalización",
    compoundingHelp: "Indica cada cuánto se acumula el interés compuesto.",
    monthly: "Mensual",
    annually: "Anual",
    termMonths: "Plazo en meses",
    termMonthsHelp: "Si tienes el plazo en años, multiplícalo por 12. Por ejemplo, 3 años son 36 meses.",
    hint: "Este cálculo estima intereses totales. No calcula una cuota fija amortizada.",
    submit: "Calcular intereses",
    reset: "Restablecer",
    amountError: "Ingresa un monto de préstamo mayor a cero.",
    rateError: "Ingresa una tasa anual entre 0% y 1000%.",
    termError: "Ingresa un plazo entre 1 y 600 meses.",
    requestError: "No se pudo calcular el interés.",
    totalToPay: "Total estimado a pagar",
    estimatedInterest: "Intereses estimados",
    totalInterest: "Intereses totales",
    monthlyAverage: "Promedio mensual",
    monthlyRate: "Tasa mensual estimada",
    effectiveAnnualRate: "Tasa anual efectiva",
    formulaUsed: "Fórmula usada",
    rulesNote: (periods: number, frequency: string) =>
      `Se calcularon ${periods} periodos con ${frequency.toLowerCase()}.`,
    disclaimer:
      "Resultado estimado. No incluye seguros, comisiones, impuestos, cargos administrativos, mora ni condiciones específicas de una entidad financiera.",
    emptyTitle: "Resultado del crédito",
    emptyDescription: "Ingresa el monto, tasa y plazo para ver cuánto pagarías en intereses y el total estimado.",
    sixMonths: "6 meses",
    oneYear: "1 año",
    twoYears: "2 años",
    threeYears: "3 años",
    fiveYears: "5 años"
  },
  en: {
    kicker: "Calculator",
    title: "Credit details",
    loanAmount: "Loan amount",
    loanAmountHelp: "This is the money you receive or plan to borrow before interest and fees.",
    annualRate: "Annual rate",
    annualRateHelp:
      "Use the annual credit rate. If your lender gave you a monthly rate, convert it before using this calculator.",
    interestType: "Interest type",
    interestTypeHelp:
      "Simple calculates interest on the initial principal. Compound accumulates interest based on the selected compounding.",
    compound: "Compound interest",
    simple: "Simple interest",
    compounding: "Compounding",
    compoundingHelp: "Choose how often compound interest is added.",
    monthly: "Monthly",
    annually: "Annual",
    termMonths: "Term in months",
    termMonthsHelp: "If you have the term in years, multiply it by 12. For example, 3 years are 36 months.",
    hint: "This calculation estimates total interest. It does not calculate a fixed amortized payment.",
    submit: "Calculate interest",
    reset: "Reset",
    amountError: "Enter a loan amount greater than zero.",
    rateError: "Enter an annual rate between 0% and 1000%.",
    termError: "Enter a term between 1 and 600 months.",
    requestError: "We couldn't calculate the interest.",
    totalToPay: "Estimated total to pay",
    estimatedInterest: "Estimated interest",
    totalInterest: "Total interest",
    monthlyAverage: "Monthly average",
    monthlyRate: "Estimated monthly rate",
    effectiveAnnualRate: "Effective annual rate",
    formulaUsed: "Formula used",
    rulesNote: (periods: number, frequency: string) =>
      `Calculated across ${periods} periods with ${frequency.toLowerCase()}.`,
    disclaimer:
      "Estimated result. It does not include insurance, fees, taxes, administrative charges, late interest, or institution-specific conditions.",
    emptyTitle: "Credit result",
    emptyDescription: "Enter the amount, rate, and term to see estimated interest and total repayment.",
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

function getInterestTypeLabel(type: CreditInterestType, locale: "es" | "en") {
  return type === "simple" ? copy[locale].simple : copy[locale].compound;
}

function getFrequencyLabel(frequency: CompoundingFrequency, locale: "es" | "en") {
  return frequency === "monthly" ? copy[locale].monthly : copy[locale].annually;
}

export function CreditInterestCalculator() {
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
  const [annualInterestRate, setAnnualInterestRate] = useState("24");
  const [termMonths, setTermMonths] = useState("12");
  const [interestType, setInterestType] = useState<CreditInterestType>("compound");
  const [compoundingFrequency, setCompoundingFrequency] = useState<CompoundingFrequency>("monthly");
  const [result, setResult] = useState<CreditInterestData | null>(null);
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
    setAnnualInterestRate("24");
    setTermMonths("12");
    setInterestType("compound");
    setCompoundingFrequency("monthly");
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
            <strong>{formatMoney(result.result.totalToPay)}</strong>
            <span>{text.estimatedInterest}: {formatMoney(result.result.totalInterest)}</span>
          </div>

          <div className="result-breakdown">
            <div className="result-item">
              <span>{text.totalInterest}</span>
              <strong>{formatMoney(result.result.totalInterest)}</strong>
            </div>
            <div className="result-item">
              <span>{text.monthlyAverage}</span>
              <strong>{formatMoney(result.result.estimatedMonthlyAverage)}</strong>
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
            <div className="result-item result-item--strong">
              <span>{text.formulaUsed}</span>
              <strong>{result.calculation.formula === "simple_interest" ? text.simple : text.compound}</strong>
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
