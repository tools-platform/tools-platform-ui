import { ArrowLeftRight, CheckCircle2, ChevronDown, Info, Loader2, Ruler } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { convertUnits, type UnitCategory, type UnitConverterResponse } from "../../services/utilityApi";

type UnitConverterData = UnitConverterResponse["data"];

type UnitOption = {
  value: string;
  label: string;
  symbol: string;
};

const categories: Array<{ value: UnitCategory; label: string }> = [
  { value: "length", label: "Longitud" },
  { value: "mass", label: "Peso / masa" },
  { value: "temperature", label: "Temperatura" }
];

const unitsByCategory: Record<UnitCategory, UnitOption[]> = {
  length: [
    { value: "kilometer", label: "Kilómetro", symbol: "km" },
    { value: "meter", label: "Metro", symbol: "m" },
    { value: "centimeter", label: "Centímetro", symbol: "cm" },
    { value: "millimeter", label: "Milímetro", symbol: "mm" },
    { value: "mile", label: "Milla", symbol: "mi" },
    { value: "yard", label: "Yarda", symbol: "yd" },
    { value: "foot", label: "Pie", symbol: "ft" },
    { value: "inch", label: "Pulgada", symbol: "in" }
  ],
  mass: [
    { value: "kilogram", label: "Kilogramo", symbol: "kg" },
    { value: "gram", label: "Gramo", symbol: "g" },
    { value: "milligram", label: "Miligramo", symbol: "mg" },
    { value: "pound", label: "Libra", symbol: "lb" },
    { value: "ounce", label: "Onza", symbol: "oz" }
  ],
  temperature: [
    { value: "celsius", label: "Celsius", symbol: "°C" },
    { value: "fahrenheit", label: "Fahrenheit", symbol: "°F" },
    { value: "kelvin", label: "Kelvin", symbol: "K" }
  ]
};

const defaultUnits: Record<UnitCategory, { fromUnit: string; toUnit: string }> = {
  length: { fromUnit: "kilometer", toUnit: "mile" },
  mass: { fromUnit: "kilogram", toUnit: "pound" },
  temperature: { fromUnit: "celsius", toUnit: "fahrenheit" }
};

const numberFormatter = new Intl.NumberFormat("es-CO", {
  maximumFractionDigits: 6
});

function parseNumber(value: string) {
  const normalized = value.replace(",", ".").replace(/[^\d.-]/g, "");
  return normalized.length > 0 ? Number(normalized) : 0;
}

function formatNumber(value: number) {
  return numberFormatter.format(value);
}

function getUnitOption(category: UnitCategory, unit: string) {
  return unitsByCategory[category].find((option) => option.value === unit) ?? unitsByCategory[category][0];
}

function getUnitLabel(category: UnitCategory, unit: string) {
  return unitsByCategory[category].find((option) => option.value === unit)?.label ?? unit;
}

export function UnitConverter() {
  const [category, setCategory] = useState<UnitCategory>("length");
  const [fromUnit, setFromUnit] = useState(defaultUnits.length.fromUnit);
  const [toUnit, setToUnit] = useState(defaultUnits.length.toUnit);
  const [value, setValue] = useState("10");
  const [precision, setPrecision] = useState("4");
  const [result, setResult] = useState<UnitConverterData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  const currentUnits = unitsByCategory[category];
  const fromUnitOption = useMemo(() => getUnitOption(category, fromUnit), [category, fromUnit]);

  function handleCategoryChange(nextCategory: UnitCategory) {
    setCategory(nextCategory);
    setFromUnit(defaultUnits[nextCategory].fromUnit);
    setToUnit(defaultUnits[nextCategory].toUnit);
    setResult(null);
    setError("");
  }

  function swapUnits() {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setResult(null);
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const numericValue = parseNumber(value);
    const precisionValue = Number(precision);

    if (!Number.isFinite(numericValue)) {
      setError("Ingresa un valor válido para convertir.");
      return;
    }

    if (!Number.isInteger(precisionValue) || precisionValue < 0 || precisionValue > 10) {
      setError("Los decimales deben estar entre 0 y 10.");
      return;
    }

    setIsLoading(true);

    try {
      const data = await convertUnits({
        category,
        fromUnit,
        toUnit,
        value: numericValue,
        precision: precisionValue
      });
      setResult(data);
      scrollToResultOnMobile();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "No se pudo convertir la unidad.");
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setCategory("length");
    setFromUnit(defaultUnits.length.fromUnit);
    setToUnit(defaultUnits.length.toUnit);
    setValue("10");
    setPrecision("4");
    setResult(null);
    setError("");
  }

  return (
    <div className="calculator-layout">
      <form className="calculator-card" onSubmit={handleSubmit}>
        <div className="calculator-card__header">
          <div>
            <p className="section__kicker">Conversor</p>
            <h2>Unidades comunes</h2>
          </div>
          <span>
            <Ruler size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span>
            Tipo de conversión <span className="required-mark">*</span>
          </span>
          <span className="select-control">
            <select
              className="plain-select"
              onChange={(event) => handleCategoryChange(event.target.value as UnitCategory)}
              value={category}
            >
              {categories.map((categoryOption) => (
                <option key={categoryOption.value} value={categoryOption.value}>
                  {categoryOption.label}
                </option>
              ))}
            </select>
            <ChevronDown size={18} strokeWidth={2.1} />
          </span>
        </label>

        <label className="field field--spaced">
          <span>
            Valor <span className="required-mark">*</span>
          </span>
          <div className="rate-input">
            <input
              inputMode="decimal"
              onChange={(event) => setValue(event.target.value)}
              placeholder="10"
              required
              type="text"
              value={value}
            />
            <strong>{fromUnitOption.symbol}</strong>
          </div>
        </label>

        <div className="form-grid">
          <label className="field">
            <span>
              Unidad origen <span className="required-mark">*</span>
            </span>
            <span className="select-control">
              <select className="plain-select" onChange={(event) => setFromUnit(event.target.value)} value={fromUnit}>
                {currentUnits.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={18} strokeWidth={2.1} />
            </span>
          </label>

          <label className="field">
            <span>
              Unidad destino <span className="required-mark">*</span>
            </span>
            <span className="select-control">
              <select className="plain-select" onChange={(event) => setToUnit(event.target.value)} value={toUnit}>
                {currentUnits.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={18} strokeWidth={2.1} />
            </span>
          </label>
        </div>

        <button className="secondary-action secondary-action--compact" onClick={swapUnits} type="button">
          <ArrowLeftRight size={17} strokeWidth={2.1} />
          Intercambiar unidades
        </button>

        <label className="field field--spaced">
          <span className="field-label">
            Decimales
            <span className="info-tooltip">
              <Info size={15} strokeWidth={2.1} />
              <span role="tooltip">
                Controla cuántos decimales tendrá el resultado redondeado. El cálculo interno conserva más precisión.
              </span>
            </span>
          </span>
          <input
            inputMode="numeric"
            max={10}
            min={0}
            onChange={(event) => setPrecision(event.target.value)}
            type="number"
            value={precision}
          />
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>Convierte unidades de la misma categoría: longitud, peso/masa o temperatura.</span>
        </div>

        <button className="primary-action" disabled={isLoading} type="submit">
          {isLoading ? <Loader2 className="spin" size={18} /> : <ArrowLeftRight size={18} />}
          Convertir
        </button>

        <button className="secondary-action" onClick={handleReset} type="button">
          Restablecer
        </button>
      </form>

      {result ? (
        <aside className="result-panel" ref={resultRef}>
          <div className="result-panel__hero">
            <p>Resultado convertido</p>
            <strong>{result.result.formatted}</strong>
            <span>
              {formatNumber(result.result.from.value)} {result.result.from.symbol} en {result.result.to.label}
            </span>
          </div>

          <div className="result-breakdown">
            <div className="result-item">
              <span>Valor original</span>
              <strong>
                {formatNumber(result.result.from.value)} {result.result.from.symbol}
              </strong>
            </div>
            <div className="result-item">
              <span>Valor convertido</span>
              <strong>
                {formatNumber(result.result.to.value)} {result.result.to.symbol}
              </strong>
            </div>
            <div className="result-item">
              <span>Unidad base</span>
              <strong>{getUnitLabel(result.rules.category, result.rules.baseUnit)}</strong>
            </div>
            <div className="result-item result-item--strong">
              <span>Decimales usados</span>
              <strong>{result.rules.precision}</strong>
            </div>
          </div>

          <div className="rules-note">
            <CheckCircle2 size={18} strokeWidth={2.1} />
            <p>
              Conversión de {result.result.from.label} a {result.result.to.label} usando factores estándar.
            </p>
          </div>

          <p className="disclaimer">{result.disclaimer}</p>
        </aside>
      ) : (
        <aside className="result-panel result-panel--empty" ref={resultRef}>
          <div className="result-empty">
            <Ruler size={34} strokeWidth={2.1} />
            <h2>Resultado de conversión</h2>
            <p>Elige las unidades y convierte el valor en segundos.</p>
          </div>
        </aside>
      )}
    </div>
  );
}
