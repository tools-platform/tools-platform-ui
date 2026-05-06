import { ArrowLeftRight, CheckCircle2, ChevronDown, CircleDollarSign, Info, Loader2 } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";
import {
  convertCopUsd,
  type CopUsdConverterResponse,
  type CopUsdDirection
} from "../../services/financeApi";

type CopUsdData = CopUsdConverterResponse["data"];

const copy = {
  es: {
    kicker: "Conversor",
    title: "Datos de conversión",
    direction: "Dirección",
    directionHelp: "Elige si quieres convertir pesos colombianos a dólares o dólares a pesos colombianos.",
    copToUsd: "COP a USD",
    usdToCop: "USD a COP",
    amount: "Monto",
    hint: "Usamos la TRM oficial vigente como referencia. Tu banco, tarjeta o casa de cambio puede aplicar otra tasa.",
    amountError: "Ingresa un monto mayor a cero.",
    requestError: "No se pudo convertir la moneda.",
    submit: "Convertir",
    reset: "Restablecer",
    heroTitle: "Resultado estimado",
    sourceAmount: "Monto origen",
    targetAmount: "Monto convertido",
    usedRate: "TRM usada",
    activeFrom: "Vigente desde",
    activeTo: "Vigente hasta",
    staleNote: "La fuente oficial no respondió; usamos la última TRM guardada.",
    freshNote: "La TRM fue consultada o validada contra la fuente oficial configurada.",
    disclaimer:
      "Resultado estimado. No incluye comisiones, spreads, tasas de tarjetas, impuestos, cargos de bancos ni condiciones específicas de una plataforma financiera.",
    emptyTitle: "Resultado del conversor",
    emptyDescription: "Ingresa un monto y elige la dirección para convertir usando la TRM oficial."
  },
  en: {
    kicker: "Converter",
    title: "Conversion details",
    direction: "Direction",
    directionHelp: "Choose whether you want to convert Colombian pesos to US dollars or US dollars to Colombian pesos.",
    copToUsd: "COP to USD",
    usdToCop: "USD to COP",
    amount: "Amount",
    hint: "We use the current official TRM as a reference. Your bank, card, or exchange house may apply a different rate.",
    amountError: "Enter an amount greater than zero.",
    requestError: "We couldn't convert the currency.",
    submit: "Convert",
    reset: "Reset",
    heroTitle: "Estimated result",
    sourceAmount: "Source amount",
    targetAmount: "Converted amount",
    usedRate: "TRM used",
    activeFrom: "Valid from",
    activeTo: "Valid until",
    staleNote: "The official source did not respond; we used the last saved TRM.",
    freshNote: "The TRM was queried or validated against the configured official source.",
    disclaimer:
      "Estimated result. It does not include fees, spreads, card rates, taxes, bank charges, or platform-specific conditions.",
    emptyTitle: "Converter result",
    emptyDescription: "Enter an amount and choose the direction to convert using the official TRM."
  }
} as const;

function parseMoney(value: string) {
  const normalized = value.replace(/\./g, "").replace(",", ".").replace(/[^\d.]/g, "");
  return normalized.length > 0 ? Number(normalized) : 0;
}

function getDirectionLabel(direction: CopUsdDirection, locale: "es" | "en") {
  return direction === "COP_TO_USD" ? copy[locale].copToUsd : copy[locale].usdToCop;
}

export function CopUsdConverter() {
  const { locale } = useLocale();
  const text = copy[locale];
  const copInputFormatter = useMemo(() => new Intl.NumberFormat(locale === "es" ? "es-CO" : "en-US", {
    maximumFractionDigits: 0
  }), [locale]);
  const usdInputFormatter = useMemo(() => new Intl.NumberFormat(locale === "es" ? "es-CO" : "en-US", {
    maximumFractionDigits: 2
  }), [locale]);
  const copFormatter = useMemo(() => new Intl.NumberFormat(locale === "es" ? "es-CO" : "en-US", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }), [locale]);
  const trmFormatter = useMemo(() => new Intl.NumberFormat(locale === "es" ? "es-CO" : "en-US", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }), [locale]);
  const usdFormatter = useMemo(() => new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }), []);
  const dateFormatter = useMemo(() => new Intl.DateTimeFormat(locale === "es" ? "es-CO" : "en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }), [locale]);

  const [amount, setAmount] = useState("1.000.000");
  const [direction, setDirection] = useState<CopUsdDirection>("COP_TO_USD");
  const [result, setResult] = useState<CopUsdData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  function formatAmountInput(value: string, currentDirection: CopUsdDirection) {
    const normalized = value.replace(/\./g, "").replace(",", ".").replace(/[^\d.]/g, "");
    if (normalized.length === 0) return "";
    const amountValue = Number(normalized);
    return currentDirection === "COP_TO_USD"
      ? copInputFormatter.format(amountValue)
      : usdInputFormatter.format(amountValue);
  }

  function formatCurrency(value: number, currency: "COP" | "USD") {
    return currency === "COP" ? copFormatter.format(value) : usdFormatter.format(value);
  }

  function formatDate(value: string) {
    return dateFormatter.format(new Date(`${value}T00:00:00-05:00`));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const amountValue = parseMoney(amount);
    if (amountValue <= 0) {
      setError(text.amountError);
      return;
    }

    setIsLoading(true);
    try {
      const data = await convertCopUsd({ amount: amountValue, direction });
      setResult(data);
      scrollToResultOnMobile();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : text.requestError);
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
            <p className="section__kicker">{text.kicker}</p>
            <h2>{text.title}</h2>
          </div>
          <span>
            <ArrowLeftRight size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span className="field-label">
            {text.direction} <span className="required-mark">*</span>
            <span className="info-tooltip">
              <Info size={15} strokeWidth={2.1} />
              <span role="tooltip">{text.directionHelp}</span>
            </span>
          </span>
          <span className="select-control">
            <select
              className="plain-select"
              onChange={(event) => handleDirectionChange(event.target.value as CopUsdDirection)}
              value={direction}
            >
              <option value="COP_TO_USD">{text.copToUsd}</option>
              <option value="USD_TO_COP">{text.usdToCop}</option>
            </select>
            <ChevronDown size={18} strokeWidth={2.1} />
          </span>
        </label>

        <label className="field field--spaced">
          <span>
            {text.amount} <span className="required-mark">*</span>
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
            <strong>{formatCurrency(result.result.targetAmount, result.result.targetCurrency)}</strong>
            <span>
              {formatCurrency(result.result.sourceAmount, result.result.sourceCurrency)} {locale === "es" ? "en" : "in"} {result.result.targetCurrency}
            </span>
          </div>

          <div className="result-breakdown">
            <div className="result-item">
              <span>{text.sourceAmount}</span>
              <strong>{formatCurrency(result.result.sourceAmount, result.result.sourceCurrency)}</strong>
            </div>
            <div className="result-item">
              <span>{text.targetAmount}</span>
              <strong>{formatCurrency(result.result.targetAmount, result.result.targetCurrency)}</strong>
            </div>
            <div className="result-item">
              <span>{text.usedRate}</span>
              <strong>{trmFormatter.format(result.rate.value)}</strong>
            </div>
            <div className="result-item">
              <span>{text.direction}</span>
              <strong>{getDirectionLabel(result.input.direction, locale)}</strong>
            </div>
            <div className="result-item">
              <span>{text.activeFrom}</span>
              <strong>{formatDate(result.rate.validFrom)}</strong>
            </div>
            <div className="result-item result-item--strong">
              <span>{text.activeTo}</span>
              <strong>{formatDate(result.rate.validTo)}</strong>
            </div>
          </div>

          <div className={result.rate.isStale ? "rules-note rules-note--muted" : "rules-note"}>
            <CheckCircle2 size={18} strokeWidth={2.1} />
            <p>{result.rate.isStale ? text.staleNote : text.freshNote}</p>
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
