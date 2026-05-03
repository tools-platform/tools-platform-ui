import { ArrowLeftRight, CheckCircle2, ChevronDown, CircleDollarSign, Info, Loader2 } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import {
  convertCopUsd,
  type CopUsdConverterResponse,
  type CopUsdDirection
} from "../../services/financeApi";

type CopUsdData = CopUsdConverterResponse["data"];

const copInputFormatter = new Intl.NumberFormat("es-CO", {
  maximumFractionDigits: 0
});

const usdInputFormatter = new Intl.NumberFormat("es-CO", {
  maximumFractionDigits: 2
});

const copFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0
});

const trmFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2
});

const dateFormatter = new Intl.DateTimeFormat("es-CO", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
});

function parseMoney(value: string) {
  const normalized = value.replace(/\./g, "").replace(",", ".").replace(/[^\d.]/g, "");
  return normalized.length > 0 ? Number(normalized) : 0;
}

function formatAmountInput(value: string, direction: CopUsdDirection) {
  const normalized = value.replace(/\./g, "").replace(",", ".").replace(/[^\d.]/g, "");

  if (normalized.length === 0) {
    return "";
  }

  const amount = Number(normalized);

  return direction === "COP_TO_USD" ? copInputFormatter.format(amount) : usdInputFormatter.format(amount);
}

function formatCurrency(value: number, currency: "COP" | "USD") {
  return currency === "COP" ? copFormatter.format(value) : usdFormatter.format(value);
}

function formatDate(value: string) {
  return dateFormatter.format(new Date(`${value}T00:00:00-05:00`));
}

function getDirectionLabel(direction: CopUsdDirection) {
  return direction === "COP_TO_USD" ? "COP a USD" : "USD a COP";
}

export function CopUsdConverter() {
  const [amount, setAmount] = useState("1.000.000");
  const [direction, setDirection] = useState<CopUsdDirection>("COP_TO_USD");
  const [result, setResult] = useState<CopUsdData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const amountValue = parseMoney(amount);

    if (amountValue <= 0) {
      setError("Ingresa un monto mayor a cero.");
      return;
    }

    setIsLoading(true);

    try {
      const data = await convertCopUsd({
        amount: amountValue,
        direction
      });
      setResult(data);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "No se pudo convertir la moneda.");
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }

  function handleDirectionChange(nextDirection: CopUsdDirection) {
    setDirection(nextDirection);
    setAmount(nextDirection === "COP_TO_USD" ? "1.000.000" : "250");
    setResult(null);
    setError("");
  }

  function handleReset() {
    setAmount("1.000.000");
    setDirection("COP_TO_USD");
    setResult(null);
    setError("");
  }

  return (
    <div className="calculator-layout">
      <form className="calculator-card" onSubmit={handleSubmit}>
        <div className="calculator-card__header">
          <div>
            <p className="section__kicker">Conversor</p>
            <h2>Datos de conversión</h2>
          </div>
          <span>
            <ArrowLeftRight size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span className="field-label">
            Dirección <span className="required-mark">*</span>
            <span className="info-tooltip">
              <Info size={15} strokeWidth={2.1} />
              <span role="tooltip">
                Elige si quieres convertir pesos colombianos a dólares o dólares a pesos colombianos.
              </span>
            </span>
          </span>
          <span className="select-control">
            <select
              className="plain-select"
              onChange={(event) => handleDirectionChange(event.target.value as CopUsdDirection)}
              value={direction}
            >
              <option value="COP_TO_USD">COP a USD</option>
              <option value="USD_TO_COP">USD a COP</option>
            </select>
            <ChevronDown size={18} strokeWidth={2.1} />
          </span>
        </label>

        <label className="field field--spaced">
          <span>
            Monto <span className="required-mark">*</span>
          </span>
          <div className="money-input">
            <span>{direction === "COP_TO_USD" ? "$" : "US$"}</span>
            <input
              inputMode="decimal"
              onChange={(event) => setAmount(formatAmountInput(event.target.value, direction))}
              placeholder={direction === "COP_TO_USD" ? "1.000.000" : "250"}
              required
              type="text"
              value={amount}
            />
            <strong>{direction === "COP_TO_USD" ? "COP" : "USD"}</strong>
          </div>
        </label>

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>
            Usamos la TRM oficial vigente como referencia. Tu banco, tarjeta o casa de cambio puede aplicar otra tasa.
          </span>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-action" disabled={isLoading} type="submit">
          {isLoading ? <Loader2 className="spin" size={18} /> : <CircleDollarSign size={18} />}
          Convertir
        </button>

        <button className="secondary-action" onClick={handleReset} type="button">
          Restablecer
        </button>
      </form>

      {result ? (
        <aside className="result-panel">
          <div className="result-panel__hero">
            <p>Resultado estimado</p>
            <strong>{formatCurrency(result.result.targetAmount, result.result.targetCurrency)}</strong>
            <span>
              {formatCurrency(result.result.sourceAmount, result.result.sourceCurrency)} en{" "}
              {result.result.targetCurrency}
            </span>
          </div>

          <div className="result-breakdown">
            <div className="result-item">
              <span>Monto origen</span>
              <strong>{formatCurrency(result.result.sourceAmount, result.result.sourceCurrency)}</strong>
            </div>
            <div className="result-item">
              <span>Monto convertido</span>
              <strong>{formatCurrency(result.result.targetAmount, result.result.targetCurrency)}</strong>
            </div>
            <div className="result-item">
              <span>TRM usada</span>
              <strong>{trmFormatter.format(result.rate.value)}</strong>
            </div>
            <div className="result-item">
              <span>Dirección</span>
              <strong>{getDirectionLabel(result.input.direction)}</strong>
            </div>
            <div className="result-item">
              <span>Vigente desde</span>
              <strong>{formatDate(result.rate.validFrom)}</strong>
            </div>
            <div className="result-item result-item--strong">
              <span>Vigente hasta</span>
              <strong>{formatDate(result.rate.validTo)}</strong>
            </div>
          </div>

          <div className={result.rate.isStale ? "rules-note rules-note--muted" : "rules-note"}>
            <CheckCircle2 size={18} strokeWidth={2.1} />
            <p>
              {result.rate.isStale
                ? "La fuente oficial no respondió; usamos la última TRM guardada."
                : "La TRM fue consultada o validada contra la fuente oficial configurada."}
            </p>
          </div>

          <p className="disclaimer">
            Resultado estimado. No incluye comisiones, spreads, tasas de tarjetas, impuestos,
            cargos de bancos ni condiciones específicas de una plataforma financiera.
          </p>
        </aside>
      ) : (
        <aside className="result-panel result-panel--empty">
          <div className="result-empty">
            <CircleDollarSign size={34} strokeWidth={2.1} />
            <h2>Resultado del conversor</h2>
            <p>Ingresa un monto y elige la dirección para convertir usando la TRM oficial.</p>
          </div>
        </aside>
      )}
    </div>
  );
}
