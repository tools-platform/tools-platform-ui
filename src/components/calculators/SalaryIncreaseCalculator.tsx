import { ArrowRight, Calculator, CheckCircle2, CircleDollarSign, Info, Loader2, TrendingUp } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";
import { calculateSalaryIncrease, type SalaryIncreaseResponse } from "../../services/financeApi";
import { salaryIncreaseCalculatorCopy as copy } from "../../locales/calculatorCopy";

type SalaryIncreaseData = SalaryIncreaseResponse["data"];

function parseMoney(value: string) {
  const normalized = value.replace(/[^\d]/g, "");
  return normalized.length > 0 ? Number(normalized) : 0;
}

function parsePercent(value: string) {
  const normalized = value.replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function SalaryIncreaseCalculator() {
  const { locale, localizePath } = useLocale();
  const text = copy[locale];
  const localeCode = locale === "es" ? "es-CO" : "en-US";
  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(localeCode, { maximumFractionDigits: 2 }),
    [localeCode]
  );
  const moneyFormatter = useMemo(
    () => new Intl.NumberFormat(localeCode, { style: "currency", currency: "COP", maximumFractionDigits: 0 }),
    [localeCode]
  );

  const [currentSalary, setCurrentSalary] = useState("2.500.000");
  const [increasePercent, setIncreasePercent] = useState("10");
  const [includeColombiaPayrollDeductions, setIncludeColombiaPayrollDeductions] = useState(false);
  const [result, setResult] = useState<SalaryIncreaseData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  function formatMoneyInput(value: string) {
    const normalized = value.replace(/[^\d]/g, "");
    return normalized.length > 0 ? new Intl.NumberFormat(localeCode).format(Number(normalized)) : "";
  }

  function formatMoney(value: number) {
    return moneyFormatter.format(value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const salaryValue = parseMoney(currentSalary);
    const percentValue = parsePercent(increasePercent);

    if (salaryValue <= 0) {
      setError(text.salaryRequired);
      return;
    }

    if (percentValue <= 0) {
      setError(text.percentRequired);
      return;
    }

    setIsLoading(true);

    try {
      const data = await calculateSalaryIncrease({
        currentSalary: salaryValue,
        increasePercent: percentValue,
        includeColombiaPayrollDeductions
      });
      setResult(data);
      scrollToResultOnMobile();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : text.salaryRequired);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setCurrentSalary("2.500.000");
    setIncreasePercent("10");
    setIncludeColombiaPayrollDeductions(false);
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
            <TrendingUp size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span>
            {text.currentSalary} <span className="required-mark">*</span>
          </span>
          <div className="money-input">
            <span>$</span>
            <input
              inputMode="numeric"
              onChange={(event) => setCurrentSalary(formatMoneyInput(event.target.value))}
              required
              type="text"
              value={currentSalary}
            />
            <strong>COP</strong>
          </div>
        </label>
        <div className="field-action-row">
          <span>{text.salaryHelper}</span>
          <a className="secondary-action secondary-action--compact" href={localizePath("/tools/colombia-gross-salary-calculator")}>
            {text.salaryHelperAction}
            <ArrowRight size={16} strokeWidth={2.1} />
          </a>
        </div>

        <label className="field field--spaced">
          <span>
            {text.increasePercent} <span className="required-mark">*</span>
          </span>
          <div className="rate-input">
            <input
              inputMode="decimal"
              min="0"
              onChange={(event) => setIncreasePercent(event.target.value)}
              required
              step="0.01"
              type="number"
              value={increasePercent}
            />
            <strong>%</strong>
          </div>
        </label>

        <label className="toggle-field">
          <input
            checked={includeColombiaPayrollDeductions}
            onChange={(event) => setIncludeColombiaPayrollDeductions(event.target.checked)}
            type="checkbox"
          />
          <span>
            <strong>{text.includeDeductions}</strong>
            <small>{text.includeDeductionsHelp}</small>
          </span>
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>{text.hint}</span>
        </div>

        <button className="primary-action" disabled={isLoading} type="submit">
          {isLoading ? <Loader2 className="spin" size={18} /> : <CircleDollarSign size={18} />}
          {isLoading ? text.loading : text.submit}
        </button>

        <button className="secondary-action" onClick={handleReset} type="button">
          {text.reset}
        </button>
      </form>

      {result ? (
        <aside className="result-panel" ref={resultRef}>
          <div className="result-panel__hero">
            <p>{result.deductions.applies ? text.netHero : text.grossHero}</p>
            <strong>{formatMoney(result.deductions.applies ? result.result.netNewSalary : result.result.grossNewSalary)}</strong>
            <span>{text.increaseAmount}: {formatMoney(result.result.increaseAmount)}</span>
          </div>

          <div className="result-breakdown">
            <div className="result-item">
              <span>{text.currentSalaryResult}</span>
              <strong>{formatMoney(result.result.currentSalary)}</strong>
            </div>
            <div className="result-item">
              <span>{text.increasePercentResult}</span>
              <strong>{numberFormatter.format(result.input.increasePercent)}%</strong>
            </div>
            <div className="result-item">
              <span>{text.grossNewSalary}</span>
              <strong>{formatMoney(result.result.grossNewSalary)}</strong>
            </div>
            <div className="result-item result-item--strong">
              <span>{text.netNewSalary}</span>
              <strong>{formatMoney(result.result.netNewSalary)}</strong>
            </div>
            {result.deductions.applies ? (
              <>
                <div className="result-item">
                  <span>{text.healthContribution}</span>
                  <strong>{formatMoney(result.deductions.healthContribution)}</strong>
                </div>
                <div className="result-item">
                  <span>{text.pensionContribution}</span>
                  <strong>{formatMoney(result.deductions.pensionContribution)}</strong>
                </div>
                <div className="result-item">
                  <span>{text.solidarityContribution}</span>
                  <strong>{formatMoney(result.deductions.solidarityPensionFundContribution)}</strong>
                </div>
                <div className="result-item result-item--strong">
                  <span>{text.totalDeductions}</span>
                  <strong>{formatMoney(result.deductions.totalMandatoryDeductions)}</strong>
                </div>
              </>
            ) : null}
            <div className="result-item result-item--strong">
              <span>{text.annualGrossIncrease}</span>
              <strong>{formatMoney(result.result.annualGrossIncrease)}</strong>
            </div>
          </div>

          <div className="rules-note">
            <CheckCircle2 size={18} strokeWidth={2.1} />
            <p>{result.deductions.applies ? text.rulesNoteNet : text.rulesNoteGross}</p>
          </div>

          <p className="disclaimer">{result.disclaimer}</p>
        </aside>
      ) : (
        <aside className="result-panel result-panel--empty" ref={resultRef}>
          <div className="result-empty">
            <Calculator size={30} strokeWidth={2.05} />
            <h2>{text.emptyTitle}</h2>
            <p>{text.emptyDescription}</p>
          </div>
        </aside>
      )}
    </div>
  );
}
