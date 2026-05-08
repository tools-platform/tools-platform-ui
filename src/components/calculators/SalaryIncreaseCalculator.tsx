import { Calculator, CheckCircle2, CircleDollarSign, Info, TrendingUp } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";

function parseMoney(value: string) {
  const normalized = value.replace(/[^\d]/g, "");
  return normalized.length > 0 ? Number(normalized) : 0;
}

function parsePercent(value: string) {
  const normalized = value.replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

const copy = {
  es: {
    kicker: "Calculadora",
    title: "Aumento salarial",
    currentSalary: "Salario actual",
    increasePercent: "Porcentaje de aumento",
    salaryRequired: "Ingresa un salario actual mayor a cero.",
    percentRequired: "Ingresa un porcentaje de aumento mayor a cero.",
    hint: "Calcula el nuevo salario después de un aumento porcentual. Es una referencia simple, no una liquidación de nómina.",
    submit: "Calcular aumento",
    reset: "Restablecer",
    hero: "Nuevo salario estimado",
    increaseAmount: "Valor del aumento",
    currentSalaryResult: "Salario actual",
    increasePercentResult: "Aumento aplicado",
    annualDifference: "Diferencia anual",
    rulesNote: "Se calculó multiplicando el salario actual por el porcentaje de aumento.",
    disclaimer:
      "Estimación informativa. No incluye descuentos de nómina, impuestos, auxilios, bonificaciones ni reglas internas de la empresa.",
    emptyTitle: "Tu nuevo salario aparecerá aquí",
    emptyDescription: "Ingresa el salario actual y el porcentaje de aumento para ver el resultado."
  },
  en: {
    kicker: "Calculator",
    title: "Salary increase",
    currentSalary: "Current salary",
    increasePercent: "Increase percentage",
    salaryRequired: "Enter a current salary greater than zero.",
    percentRequired: "Enter an increase percentage greater than zero.",
    hint: "Calculate the new salary after a percentage increase. This is a simple reference, not a payroll settlement.",
    submit: "Calculate increase",
    reset: "Reset",
    hero: "Estimated new salary",
    increaseAmount: "Increase amount",
    currentSalaryResult: "Current salary",
    increasePercentResult: "Applied increase",
    annualDifference: "Annual difference",
    rulesNote: "Calculated by multiplying the current salary by the increase percentage.",
    disclaimer:
      "Informational estimate. It does not include payroll deductions, taxes, allowances, bonuses, or company-specific rules.",
    emptyTitle: "Your new salary will appear here",
    emptyDescription: "Enter the current salary and increase percentage to see the result."
  }
} as const;

export function SalaryIncreaseCalculator() {
  const { locale } = useLocale();
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
  const [result, setResult] = useState<{
    currentSalary: number;
    increasePercent: number;
    increaseAmount: number;
    newSalary: number;
    annualDifference: number;
  } | null>(null);
  const [error, setError] = useState("");
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  function formatMoneyInput(value: string) {
    const normalized = value.replace(/[^\d]/g, "");
    return normalized.length > 0 ? new Intl.NumberFormat(localeCode).format(Number(normalized)) : "";
  }

  function formatMoney(value: number) {
    return moneyFormatter.format(value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
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

    const increaseAmount = salaryValue * (percentValue / 100);
    setResult({
      currentSalary: salaryValue,
      increasePercent: percentValue,
      increaseAmount,
      newSalary: salaryValue + increaseAmount,
      annualDifference: increaseAmount * 12
    });
    scrollToResultOnMobile();
  }

  function handleReset() {
    setCurrentSalary("2.500.000");
    setIncreasePercent("10");
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

        <label className="field">
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

        {error ? <p className="form-error">{error}</p> : null}

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>{text.hint}</span>
        </div>

        <button className="primary-action" type="submit">
          <CircleDollarSign size={18} />
          {text.submit}
        </button>

        <button className="secondary-action" onClick={handleReset} type="button">
          {text.reset}
        </button>
      </form>

      {result ? (
        <aside className="result-panel" ref={resultRef}>
          <div className="result-panel__hero">
            <p>{text.hero}</p>
            <strong>{formatMoney(result.newSalary)}</strong>
            <span>{text.increaseAmount}: {formatMoney(result.increaseAmount)}</span>
          </div>

          <div className="result-breakdown">
            <div className="result-item">
              <span>{text.currentSalaryResult}</span>
              <strong>{formatMoney(result.currentSalary)}</strong>
            </div>
            <div className="result-item">
              <span>{text.increasePercentResult}</span>
              <strong>{numberFormatter.format(result.increasePercent)}%</strong>
            </div>
            <div className="result-item result-item--strong">
              <span>{text.annualDifference}</span>
              <strong>{formatMoney(result.annualDifference)}</strong>
            </div>
          </div>

          <div className="rules-note">
            <CheckCircle2 size={18} strokeWidth={2.1} />
            <p>{text.rulesNote}</p>
          </div>

          <p className="disclaimer">{text.disclaimer}</p>
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
