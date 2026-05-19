import { Calculator, CheckCircle2, ChevronDown, Info, Percent, RotateCcw } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";

type PercentageMode = "percentOf" | "whatPercent" | "increaseDecrease" | "percentChange";
type ChangeOperation = "increase" | "decrease";

type PercentageResult = {
  mode: PercentageMode;
  operation: ChangeOperation;
  value: number;
  unit: "number" | "percent";
};

const copy = {
  es: {
    kicker: "Utilidad",
    title: "Calcular porcentaje",
    mode: "Tipo de cálculo",
    modes: {
      percentOf: "X% de un número",
      whatPercent: "Qué porcentaje es",
      increaseDecrease: "Aumento / descuento",
      percentChange: "Diferencia porcentual"
    },
    percentage: "Porcentaje",
    number: "Número",
    part: "Valor parcial",
    total: "Valor total",
    initialValue: "Valor inicial",
    finalValue: "Valor final",
    operation: "Operación",
    operations: {
      increase: "Aumento",
      decrease: "Descuento"
    },
    emptyError: "Completa los campos con valores válidos.",
    divisionError: "El valor total o inicial no puede ser cero.",
    hint: "Calcula porcentajes en tu navegador para descuentos, aumentos, comparaciones, notas o valores rápidos.",
    submit: "Calcular porcentaje",
    reset: "Restablecer",
    resultTitle: "Resultado",
    result: "Resultado",
    appliedMode: "Tipo",
    rulesNote: "El resultado queda fijo hasta que vuelves a calcular, así puedes cambiar datos sin alterar la salida actual.",
    disclaimer: "Resultado automático para cálculos de porcentaje. Revisa redondeos si usarás el valor en documentos finales.",
    emptyTitle: "El resultado aparecerá aquí",
    emptyDescription: "Elige el tipo de cálculo, completa los valores y calcula el porcentaje."
  },
  en: {
    kicker: "Utility",
    title: "Calculate percentage",
    mode: "Calculation type",
    modes: {
      percentOf: "X% of a number",
      whatPercent: "What percentage is",
      increaseDecrease: "Increase / discount",
      percentChange: "Percentage change"
    },
    percentage: "Percentage",
    number: "Number",
    part: "Partial value",
    total: "Total value",
    initialValue: "Initial value",
    finalValue: "Final value",
    operation: "Operation",
    operations: {
      increase: "Increase",
      decrease: "Discount"
    },
    emptyError: "Complete the fields with valid values.",
    divisionError: "The total or initial value cannot be zero.",
    hint: "Calculate percentages in your browser for discounts, increases, comparisons, grades, or quick values.",
    submit: "Calculate percentage",
    reset: "Reset",
    resultTitle: "Result",
    result: "Result",
    appliedMode: "Type",
    rulesNote: "The result stays fixed until you calculate again, so changing inputs does not alter the current output.",
    disclaimer: "Automatic percentage result. Review rounding if you will use the value in final documents.",
    emptyTitle: "The result will appear here",
    emptyDescription: "Choose the calculation type, complete the values, and calculate the percentage."
  }
} as const;

function parseNumber(value: string) {
  const normalized = value.replace(/\s/g, "").replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

export function PercentageCalculator() {
  const { locale } = useLocale();
  const text = copy[locale];
  const localeCode = locale === "es" ? "es-CO" : "en-US";
  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(localeCode, { maximumFractionDigits: 4 }),
    [localeCode]
  );
  const [mode, setMode] = useState<PercentageMode>("percentOf");
  const [operation, setOperation] = useState<ChangeOperation>("increase");
  const [percentage, setPercentage] = useState("10");
  const [number, setNumber] = useState("100");
  const [part, setPart] = useState("25");
  const [total, setTotal] = useState("200");
  const [initialValue, setInitialValue] = useState("100");
  const [finalValue, setFinalValue] = useState("120");
  const [result, setResult] = useState<PercentageResult | null>(null);
  const [error, setError] = useState("");
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  function formatResult(value: number, unit: PercentageResult["unit"]) {
    const formatted = numberFormatter.format(value);
    return unit === "percent" ? `${formatted}%` : formatted;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const percentageValue = parseNumber(percentage);
    const numberValue = parseNumber(number);
    const partValue = parseNumber(part);
    const totalValue = parseNumber(total);
    const initial = parseNumber(initialValue);
    const final = parseNumber(finalValue);
    let nextResult: PercentageResult | null = null;

    if (mode === "percentOf" && Number.isFinite(percentageValue) && Number.isFinite(numberValue)) {
      nextResult = {
        mode,
        operation,
        value: (percentageValue / 100) * numberValue,
        unit: "number"
      };
    }

    if (mode === "whatPercent" && Number.isFinite(partValue) && Number.isFinite(totalValue)) {
      if (totalValue === 0) {
        setError(text.divisionError);
        setResult(null);
        return;
      }

      nextResult = {
        mode,
        operation,
        value: (partValue / totalValue) * 100,
        unit: "percent"
      };
    }

    if (mode === "increaseDecrease" && Number.isFinite(percentageValue) && Number.isFinite(numberValue)) {
      const multiplier = operation === "increase" ? 1 + percentageValue / 100 : 1 - percentageValue / 100;
      nextResult = {
        mode,
        operation,
        value: numberValue * multiplier,
        unit: "number"
      };
    }

    if (mode === "percentChange" && Number.isFinite(initial) && Number.isFinite(final)) {
      if (initial === 0) {
        setError(text.divisionError);
        setResult(null);
        return;
      }

      nextResult = {
        mode,
        operation,
        value: ((final - initial) / initial) * 100,
        unit: "percent"
      };
    }

    if (!nextResult) {
      setError(text.emptyError);
      setResult(null);
      return;
    }

    setResult(nextResult);
    scrollToResultOnMobile();
  }

  function handleReset() {
    setMode("percentOf");
    setOperation("increase");
    setPercentage("10");
    setNumber("100");
    setPart("25");
    setTotal("200");
    setInitialValue("100");
    setFinalValue("120");
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
            <Percent size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span>{text.mode}</span>
          <span className="select-control">
            <select className="plain-select" onChange={(event) => setMode(event.target.value as PercentageMode)} value={mode}>
              {(Object.keys(text.modes) as PercentageMode[]).map((modeOption) => (
                <option key={modeOption} value={modeOption}>
                  {text.modes[modeOption]}
                </option>
              ))}
            </select>
            <ChevronDown size={18} strokeWidth={2.1} />
          </span>
        </label>

        {mode === "increaseDecrease" ? (
          <label className="field field--spaced">
            <span>{text.operation}</span>
            <span className="select-control">
              <select className="plain-select" onChange={(event) => setOperation(event.target.value as ChangeOperation)} value={operation}>
                <option value="increase">{text.operations.increase}</option>
                <option value="decrease">{text.operations.decrease}</option>
              </select>
              <ChevronDown size={18} strokeWidth={2.1} />
            </span>
          </label>
        ) : null}

        {mode === "percentOf" || mode === "increaseDecrease" ? (
          <div className="form-grid">
            <label className="field">
              <span>{text.percentage} <span className="required-mark">*</span></span>
              <div className="rate-input">
                <input inputMode="decimal" onChange={(event) => setPercentage(event.target.value)} required type="text" value={percentage} />
                <strong>%</strong>
              </div>
            </label>

            <label className="field">
              <span>{text.number} <span className="required-mark">*</span></span>
              <input inputMode="decimal" onChange={(event) => setNumber(event.target.value)} required type="text" value={number} />
            </label>
          </div>
        ) : null}

        {mode === "whatPercent" ? (
          <div className="form-grid">
            <label className="field">
              <span>{text.part} <span className="required-mark">*</span></span>
              <input inputMode="decimal" onChange={(event) => setPart(event.target.value)} required type="text" value={part} />
            </label>

            <label className="field">
              <span>{text.total} <span className="required-mark">*</span></span>
              <input inputMode="decimal" onChange={(event) => setTotal(event.target.value)} required type="text" value={total} />
            </label>
          </div>
        ) : null}

        {mode === "percentChange" ? (
          <div className="form-grid">
            <label className="field">
              <span>{text.initialValue} <span className="required-mark">*</span></span>
              <input inputMode="decimal" onChange={(event) => setInitialValue(event.target.value)} required type="text" value={initialValue} />
            </label>

            <label className="field">
              <span>{text.finalValue} <span className="required-mark">*</span></span>
              <input inputMode="decimal" onChange={(event) => setFinalValue(event.target.value)} required type="text" value={finalValue} />
            </label>
          </div>
        ) : null}

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>{text.hint}</span>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-action" type="submit">
          <Percent size={18} />
          {text.submit}
        </button>

        <button className="secondary-action" onClick={handleReset} type="button">
          <RotateCcw size={18} />
          {text.reset}
        </button>
      </form>

      {result ? (
        <aside className="result-panel" ref={resultRef}>
          <div className="result-panel__hero result-panel__hero--compact">
            <p>{text.resultTitle}</p>
            <strong>{formatResult(result.value, result.unit)}</strong>
            <span>{text.modes[result.mode]}</span>
          </div>

          <div className="result-breakdown">
            <div className="result-item result-item--strong">
              <span>{text.appliedMode}</span>
              <strong>{text.modes[result.mode]}</strong>
            </div>
            <div className="result-item">
              <span>{text.result}</span>
              <strong>{formatResult(result.value, result.unit)}</strong>
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
