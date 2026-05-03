import { Calculator, CheckCircle2, ChevronDown, CircleDollarSign, Info, Loader2 } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import {
  calculateCreditInterest,
  type CompoundingFrequency,
  type CreditInterestResponse,
  type CreditInterestType
} from "../../services/financeApi";

type CreditInterestData = CreditInterestResponse["data"];

const numberFormatter = new Intl.NumberFormat("es-CO", {
  maximumFractionDigits: 0
});

const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0
});

const termShortcuts = [
  { label: "6 meses", value: "6" },
  { label: "1 año", value: "12" },
  { label: "2 años", value: "24" },
  { label: "3 años", value: "36" },
  { label: "5 años", value: "60" }
];

function parseMoney(value: string) {
  const normalized = value.replace(/[^\d]/g, "");
  return normalized.length > 0 ? Number(normalized) : 0;
}

function formatMoneyInput(value: string) {
  const normalized = value.replace(/[^\d]/g, "");
  return normalized.length > 0 ? numberFormatter.format(Number(normalized)) : "";
}

function parseRate(value: string) {
  const normalized = value.replace(",", ".").replace(/[^\d.]/g, "");
  return normalized.length > 0 ? Number(normalized) : 0;
}

function formatMoney(value: number) {
  return currencyFormatter.format(value);
}

function formatRate(value: number) {
  return `${(value * 100).toLocaleString("es-CO", {
    maximumFractionDigits: 4
  })}%`;
}

function getInterestTypeLabel(type: CreditInterestType) {
  return type === "simple" ? "Interés simple" : "Interés compuesto";
}

function getFrequencyLabel(frequency: CompoundingFrequency) {
  return frequency === "monthly" ? "Capitalización mensual" : "Capitalización anual";
}

export function CreditInterestCalculator() {
  const [loanAmount, setLoanAmount] = useState("5.000.000");
  const [annualInterestRate, setAnnualInterestRate] = useState("24");
  const [termMonths, setTermMonths] = useState("12");
  const [interestType, setInterestType] = useState<CreditInterestType>("compound");
  const [compoundingFrequency, setCompoundingFrequency] = useState<CompoundingFrequency>("monthly");
  const [result, setResult] = useState<CreditInterestData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const loanAmountValue = parseMoney(loanAmount);
    const annualInterestRateValue = parseRate(annualInterestRate);
    const termMonthsValue = Number(termMonths);

    if (loanAmountValue <= 0) {
      setError("Ingresa un monto de préstamo mayor a cero.");
      return;
    }

    if (annualInterestRateValue < 0 || annualInterestRateValue > 1000) {
      setError("Ingresa una tasa anual entre 0% y 1000%.");
      return;
    }

    if (!Number.isInteger(termMonthsValue) || termMonthsValue <= 0 || termMonthsValue > 600) {
      setError("Ingresa un plazo entre 1 y 600 meses.");
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
      setError(requestError instanceof Error ? requestError.message : "No se pudo calcular el interés.");
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
            <p className="section__kicker">Calculadora</p>
            <h2>Datos del crédito</h2>
          </div>
          <span>
            <Calculator size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span>
            Monto del préstamo <span className="required-mark">*</span>
          </span>
          <div className="money-input">
            <span>$</span>
            <input
              inputMode="numeric"
              onChange={(event) => setLoanAmount(formatMoneyInput(event.target.value))}
              placeholder="5.000.000"
              required
              type="text"
              value={loanAmount}
            />
            <strong>COP</strong>
          </div>
          <small>Es el dinero que recibes o piensas solicitar antes de intereses y cargos.</small>
        </label>

        <div className="form-grid form-grid--single">
          <label className="field">
            <span className="field-label">
              Tasa anual <span className="required-mark">*</span>
              <span className="info-tooltip">
                <Info size={15} strokeWidth={2.1} />
                <span role="tooltip">
                  Usa la tasa anual del crédito. Si tu entidad te dio una tasa mensual, conviértela antes
                  de usar esta calculadora para que el resultado no quede inflado o incompleto.
                </span>
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
              Tipo de interés <span className="required-mark">*</span>
              <span className="info-tooltip">
                <Info size={15} strokeWidth={2.1} />
                <span role="tooltip">
                  Simple: calcula el interés sobre el dinero inicial usando la tasa anual. Compuesto:
                  acumula intereses según la capitalización elegida, también usando la tasa anual.
                </span>
              </span>
            </span>
            <span className="select-control">
              <select
                className="plain-select"
                onChange={(event) => setInterestType(event.target.value as CreditInterestType)}
                value={interestType}
              >
                <option value="compound">Interés compuesto</option>
                <option value="simple">Interés simple</option>
              </select>
              <ChevronDown size={18} strokeWidth={2.1} />
            </span>
          </label>

          {interestType === "compound" ? (
            <label className="field">
              <span className="field-label">
                Capitalización
                <span className="info-tooltip">
                  <Info size={15} strokeWidth={2.1} />
                  <span role="tooltip">
                    Indica cada cuánto se acumula el interés compuesto.
                  </span>
                </span>
              </span>
              <span className="select-control">
                <select
                  className="plain-select"
                  onChange={(event) => setCompoundingFrequency(event.target.value as CompoundingFrequency)}
                  value={compoundingFrequency}
                >
                  <option value="monthly">Mensual</option>
                  <option value="annually">Anual</option>
                </select>
                <ChevronDown size={18} strokeWidth={2.1} />
              </span>
            </label>
          ) : null}
        </div>

        <label className="field field--spaced">
          <span className="field-label">
            Plazo en meses <span className="required-mark">*</span>
            <span className="info-tooltip">
              <Info size={15} strokeWidth={2.1} />
              <span role="tooltip">
                Si tienes el plazo en años, multiplícalo por 12. Por ejemplo, 3 años son 36 meses.
              </span>
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
          <div className="quick-options" aria-label="Atajos de plazo">
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
          <span>
            Este cálculo estima intereses totales. No calcula una cuota fija amortizada.
          </span>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-action" disabled={isLoading} type="submit">
          {isLoading ? <Loader2 className="spin" size={18} /> : <CircleDollarSign size={18} />}
          Calcular intereses
        </button>

        <button className="secondary-action" onClick={handleReset} type="button">
          Restablecer
        </button>
      </form>

      {result ? (
        <aside className="result-panel" ref={resultRef}>
          <div className="result-panel__hero">
            <p>Total estimado a pagar</p>
            <strong>{formatMoney(result.result.totalToPay)}</strong>
            <span>
              Intereses estimados: {formatMoney(result.result.totalInterest)}
            </span>
          </div>

          <div className="result-breakdown">
            <div className="result-item">
              <span>Intereses totales</span>
              <strong>{formatMoney(result.result.totalInterest)}</strong>
            </div>
            <div className="result-item">
              <span>Promedio mensual</span>
              <strong>{formatMoney(result.result.estimatedMonthlyAverage)}</strong>
            </div>
            <div className="result-item">
              <span>Tasa mensual estimada</span>
              <strong>{formatRate(result.result.monthlyRate)}</strong>
            </div>
            <div className="result-item">
              <span>Tasa anual efectiva</span>
              <strong>{formatRate(result.result.effectiveAnnualRate)}</strong>
            </div>
            <div className="result-item">
              <span>Tipo de interés</span>
              <strong>{getInterestTypeLabel(result.input.interestType)}</strong>
            </div>
            <div className="result-item result-item--strong">
              <span>Fórmula usada</span>
              <strong>
                {result.calculation.formula === "simple_interest" ? "Interés simple" : "Interés compuesto"}
              </strong>
            </div>
          </div>

          <div className="rules-note">
            <CheckCircle2 size={18} strokeWidth={2.1} />
            <p>
              Se calcularon {result.calculation.periods} periodos con {getFrequencyLabel(result.input.compoundingFrequency).toLowerCase()}.
            </p>
          </div>

          <p className="disclaimer">
            Resultado estimado. No incluye seguros, comisiones, impuestos, cargos administrativos,
            mora ni condiciones específicas de una entidad financiera.
          </p>
        </aside>
      ) : (
        <aside className="result-panel result-panel--empty" ref={resultRef}>
          <div className="result-empty">
            <CircleDollarSign size={34} strokeWidth={2.1} />
            <h2>Resultado del crédito</h2>
            <p>
              Ingresa el monto, tasa y plazo para ver cuánto pagarías en intereses y el total estimado.
            </p>
          </div>
        </aside>
      )}
    </div>
  );
}
