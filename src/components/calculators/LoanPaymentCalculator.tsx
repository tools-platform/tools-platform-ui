import { Calculator, CheckCircle2, ChevronDown, CircleDollarSign, Info, Loader2 } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import {
  calculateLoanPayment,
  type LoanPaymentRateType,
  type LoanPaymentResponse
} from "../../services/financeApi";

type LoanPaymentData = LoanPaymentResponse["data"];

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

function getRateTypeLabel(rateType: LoanPaymentRateType) {
  return rateType === "effective_annual" ? "Efectiva anual" : "Mensual";
}

export function LoanPaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState("5.000.000");
  const [interestRate, setInterestRate] = useState("24");
  const [rateType, setRateType] = useState<LoanPaymentRateType>("effective_annual");
  const [termMonths, setTermMonths] = useState("12");
  const [result, setResult] = useState<LoanPaymentData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const loanAmountValue = parseMoney(loanAmount);
    const interestRateValue = parseRate(interestRate);
    const termMonthsValue = Number(termMonths);

    if (loanAmountValue <= 0) {
      setError("Ingresa un monto de préstamo mayor a cero.");
      return;
    }

    if (interestRateValue < 0 || interestRateValue > 1000) {
      setError("Ingresa una tasa entre 0% y 1000%.");
      return;
    }

    if (!Number.isInteger(termMonthsValue) || termMonthsValue <= 0 || termMonthsValue > 600) {
      setError("Ingresa un plazo entre 1 y 600 meses.");
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
      setError(requestError instanceof Error ? requestError.message : "No se pudo calcular la cuota.");
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
            <p className="section__kicker">Calculadora</p>
            <h2>Datos del préstamo</h2>
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
          <small>Es el dinero que piensas solicitar antes de intereses y cargos.</small>
        </label>

        <div className="form-grid">
          <label className="field">
            <span className="field-label">
              {rateType === "effective_annual" ? "Tasa anual" : "Tasa mensual"}{" "}
              <span className="required-mark">*</span>
              <span className="info-tooltip">
                <Info size={15} strokeWidth={2.1} />
                <span role="tooltip">
                  Escribe el porcentaje según el tipo de tasa elegido. Si seleccionas efectiva anual,
                  usa la tasa del año completo. Si seleccionas mensual, usa la tasa que se aplica cada mes.
                </span>
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
              Tipo de tasa <span className="required-mark">*</span>
              <span className="info-tooltip">
                <Info size={15} strokeWidth={2.1} />
                <span role="tooltip">
                  Efectiva anual: tasa para todo el año, por ejemplo 24% EA. Mensual: tasa que se aplica
                  cada mes, por ejemplo 2% mensual.
                </span>
              </span>
            </span>
            <span className="select-control">
              <select
                className="plain-select"
                onChange={(event) => setRateType(event.target.value as LoanPaymentRateType)}
                value={rateType}
              >
                <option value="effective_annual">Efectiva anual</option>
                <option value="monthly">Mensual</option>
              </select>
              <ChevronDown size={18} strokeWidth={2.1} />
            </span>
          </label>
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
            Esta cuota es una estimación fija. No incluye seguros, comisiones ni cargos de la entidad.
          </span>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-action" disabled={isLoading} type="submit">
          {isLoading ? <Loader2 className="spin" size={18} /> : <CircleDollarSign size={18} />}
          Calcular cuota
        </button>

        <button className="secondary-action" onClick={handleReset} type="button">
          Restablecer
        </button>
      </form>

      {result ? (
        <aside className="result-panel" ref={resultRef}>
          <div className="result-panel__hero">
            <p>Cuota mensual estimada</p>
            <strong>{formatMoney(result.result.monthlyPayment)}</strong>
            <span>
              Total a pagar: {formatMoney(result.result.totalToPay)}
            </span>
          </div>

          <div className="result-breakdown">
            <div className="result-item">
              <span>Cuota mensual</span>
              <strong>{formatMoney(result.result.monthlyPayment)}</strong>
            </div>
            <div className="result-item">
              <span>Intereses totales</span>
              <strong>{formatMoney(result.result.totalInterest)}</strong>
            </div>
            <div className="result-item">
              <span>Total a pagar</span>
              <strong>{formatMoney(result.result.totalToPay)}</strong>
            </div>
            <div className="result-item">
              <span>Tasa mensual usada</span>
              <strong>{formatRate(result.result.monthlyRate)}</strong>
            </div>
            <div className="result-item">
              <span>Tipo de tasa</span>
              <strong>{getRateTypeLabel(result.input.rateType)}</strong>
            </div>
            <div className="result-item result-item--strong">
              <span>Plazo</span>
              <strong>{result.input.termMonths} meses</strong>
            </div>
          </div>

          <div className="rules-note">
            <CheckCircle2 size={18} strokeWidth={2.1} />
            <p>
              Se calcularon {result.calculation.periods} cuotas fijas con tasa efectiva anual de {formatRate(result.result.effectiveAnnualRate)}.
            </p>
          </div>

          <p className="disclaimer">
            Resultado estimado. No incluye seguros, comisiones, impuestos, cargos administrativos,
            mora, tasas variables ni condiciones específicas de una entidad financiera.
          </p>
        </aside>
      ) : (
        <aside className="result-panel result-panel--empty" ref={resultRef}>
          <div className="result-empty">
            <CircleDollarSign size={34} strokeWidth={2.1} />
            <h2>Resultado de la cuota</h2>
            <p>
              Ingresa monto, tasa y plazo para estimar cuánto pagarías cada mes.
            </p>
          </div>
        </aside>
      )}
    </div>
  );
}
