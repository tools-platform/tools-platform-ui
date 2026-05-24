import { ArrowLeftRight, CheckCircle2, ChevronDown, Info, Loader2, Ruler } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";
import { convertUnits, type UnitCategory, type UnitConverterResponse } from "../../services/utilityApi";
import { unitConverterCopy as copy } from "../../locales/calculatorCopy";

type UnitConverterData = UnitConverterResponse["data"];
type UnitOption = { value: string; label: string; symbol: string };

const catalog = {
  es: {
    categories: {
      length: "Longitud",
      mass: "Peso / masa",
      temperature: "Temperatura"
    },
    units: {
      kilometer: "Kilómetro",
      meter: "Metro",
      centimeter: "Centímetro",
      millimeter: "Milímetro",
      mile: "Milla",
      yard: "Yarda",
      foot: "Pie",
      inch: "Pulgada",
      kilogram: "Kilogramo",
      gram: "Gramo",
      milligram: "Miligramo",
      pound: "Libra",
      ounce: "Onza",
      celsius: "Celsius",
      fahrenheit: "Fahrenheit",
      kelvin: "Kelvin"
    }
  },
  en: {
    categories: {
      length: "Length",
      mass: "Weight / mass",
      temperature: "Temperature"
    },
    units: {
      kilometer: "Kilometer",
      meter: "Meter",
      centimeter: "Centimeter",
      millimeter: "Millimeter",
      mile: "Mile",
      yard: "Yard",
      foot: "Foot",
      inch: "Inch",
      kilogram: "Kilogram",
      gram: "Gram",
      milligram: "Milligram",
      pound: "Pound",
      ounce: "Ounce",
      celsius: "Celsius",
      fahrenheit: "Fahrenheit",
      kelvin: "Kelvin"
    }
  },
  hi: {
    categories: {
      length: "लंबाई",
      mass: "वजन / द्रव्यमान",
      temperature: "तापमान"
    },
    units: {
      kilometer: "किलोमीटर",
      meter: "मीटर",
      centimeter: "सेंटीमीटर",
      millimeter: "मिलीमीटर",
      mile: "मील",
      yard: "यार्ड",
      foot: "फुट",
      inch: "इंच",
      kilogram: "किलोग्राम",
      gram: "ग्राम",
      milligram: "मिलीग्राम",
      pound: "पाउंड",
      ounce: "औंस",
      celsius: "सेल्सियस",
      fahrenheit: "फारेनहाइट",
      kelvin: "केल्विन"
    }
  }
} as const;

const symbols: Record<string, string> = {
  kilometer: "km",
  meter: "m",
  centimeter: "cm",
  millimeter: "mm",
  mile: "mi",
  yard: "yd",
  foot: "ft",
  inch: "in",
  kilogram: "kg",
  gram: "g",
  milligram: "mg",
  pound: "lb",
  ounce: "oz",
  celsius: "°C",
  fahrenheit: "°F",
  kelvin: "K"
};

const unitsByCategoryValues: Record<UnitCategory, string[]> = {
  length: ["kilometer", "meter", "centimeter", "millimeter", "mile", "yard", "foot", "inch"],
  mass: ["kilogram", "gram", "milligram", "pound", "ounce"],
  temperature: ["celsius", "fahrenheit", "kelvin"]
};

const defaultUnits: Record<UnitCategory, { fromUnit: string; toUnit: string }> = {
  length: { fromUnit: "kilometer", toUnit: "mile" },
  mass: { fromUnit: "kilogram", toUnit: "pound" },
  temperature: { fromUnit: "celsius", toUnit: "fahrenheit" }
};

function parseNumber(value: string) {
  const normalized = value.replace(",", ".").replace(/[^\d.-]/g, "");
  return normalized.length > 0 ? Number(normalized) : 0;
}

export function UnitConverter() {
  const { locale } = useLocale();
  const text = copy[locale];
  const localeCatalog = catalog[locale];
  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(locale === "es" ? "es-CO" : "en-US", { maximumFractionDigits: 6 }),
    [locale]
  );
  const categories = useMemo(
    () =>
      (Object.keys(localeCatalog.categories) as UnitCategory[]).map((value) => ({
        value,
        label: localeCatalog.categories[value]
      })),
    [localeCatalog]
  );
  const unitsByCategory = useMemo(() => {
    const mapped = {} as Record<UnitCategory, UnitOption[]>;
    (Object.keys(unitsByCategoryValues) as UnitCategory[]).forEach((category) => {
      mapped[category] = unitsByCategoryValues[category].map((value) => ({
        value,
        label: localeCatalog.units[value as keyof typeof localeCatalog.units],
        symbol: symbols[value]
      }));
    });
    return mapped;
  }, [localeCatalog]);

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
  const fromUnitOption = currentUnits.find((option) => option.value === fromUnit) ?? currentUnits[0];

  function formatNumber(valueToFormat: number) {
    return numberFormatter.format(valueToFormat);
  }

  function getUnitLabel(categoryValue: UnitCategory, unit: string) {
    return unitsByCategory[categoryValue].find((option) => option.value === unit)?.label ?? unit;
  }

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
      setError(text.valueError);
      return;
    }
    if (!Number.isInteger(precisionValue) || precisionValue < 0 || precisionValue > 10) {
      setError(text.decimalsError);
      return;
    }

    setIsLoading(true);
    try {
      const data = await convertUnits({ category, fromUnit, toUnit, value: numericValue, precision: precisionValue });
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
            <p className="section__kicker">{text.kicker}</p>
            <h2>{text.title}</h2>
          </div>
          <span>
            <Ruler size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span>{text.category} <span className="required-mark">*</span></span>
          <span className="select-control">
            <select className="plain-select" onChange={(event) => handleCategoryChange(event.target.value as UnitCategory)} value={category}>
              {categories.map((categoryOption) => (
                <option key={categoryOption.value} value={categoryOption.value}>{categoryOption.label}</option>
              ))}
            </select>
            <ChevronDown size={18} strokeWidth={2.1} />
          </span>
        </label>

        <label className="field field--spaced">
          <span>{text.value} <span className="required-mark">*</span></span>
          <div className="rate-input">
            <input inputMode="decimal" onChange={(event) => setValue(event.target.value)} placeholder="10" required type="text" value={value} />
            <strong>{fromUnitOption.symbol}</strong>
          </div>
        </label>

        <div className="form-grid">
          <label className="field">
            <span>{text.fromUnit} <span className="required-mark">*</span></span>
            <span className="select-control">
              <select className="plain-select" onChange={(event) => setFromUnit(event.target.value)} value={fromUnit}>
                {currentUnits.map((unit) => (
                  <option key={unit.value} value={unit.value}>{unit.label}</option>
                ))}
              </select>
              <ChevronDown size={18} strokeWidth={2.1} />
            </span>
          </label>

          <label className="field">
            <span>{text.toUnit} <span className="required-mark">*</span></span>
            <span className="select-control">
              <select className="plain-select" onChange={(event) => setToUnit(event.target.value)} value={toUnit}>
                {currentUnits.map((unit) => (
                  <option key={unit.value} value={unit.value}>{unit.label}</option>
                ))}
              </select>
              <ChevronDown size={18} strokeWidth={2.1} />
            </span>
          </label>
        </div>

        <button className="secondary-action secondary-action--compact" onClick={swapUnits} type="button">
          <ArrowLeftRight size={17} strokeWidth={2.1} />
          {text.swap}
        </button>

        <label className="field field--spaced">
          <span className="field-label">
            {text.decimals}
            <span className="info-tooltip">
              <Info size={15} strokeWidth={2.1} />
              <span role="tooltip">{text.decimalsHelp}</span>
            </span>
          </span>
          <input inputMode="numeric" max={10} min={0} onChange={(event) => setPrecision(event.target.value)} type="number" value={precision} />
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>{text.hint}</span>
        </div>

        <button className="primary-action" disabled={isLoading} type="submit">
          {isLoading ? <Loader2 className="spin" size={18} /> : <ArrowLeftRight size={18} />}
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
            <strong>{result.result.formatted}</strong>
            <span>{formatNumber(result.result.from.value)} {result.result.from.symbol} {locale === "es" ? "en" : "to"} {getUnitLabel(result.rules.category, result.result.to.unit)}</span>
          </div>

          <div className="result-breakdown">
            <div className="result-item">
              <span>{text.originalValue}</span>
              <strong>{formatNumber(result.result.from.value)} {result.result.from.symbol}</strong>
            </div>
            <div className="result-item">
              <span>{text.convertedValue}</span>
              <strong>{formatNumber(result.result.to.value)} {result.result.to.symbol}</strong>
            </div>
            <div className="result-item">
              <span>{text.baseUnit}</span>
              <strong>{getUnitLabel(result.rules.category, result.rules.baseUnit)}</strong>
            </div>
            <div className="result-item result-item--strong">
              <span>{text.decimalsUsed}</span>
              <strong>{result.rules.precision}</strong>
            </div>
          </div>

          <div className="rules-note">
            <CheckCircle2 size={18} strokeWidth={2.1} />
            <p>{text.rulesNote(getUnitLabel(result.rules.category, result.result.from.unit), getUnitLabel(result.rules.category, result.result.to.unit))}</p>
          </div>

          <p className="disclaimer">{text.disclaimer}</p>
        </aside>
      ) : (
        <aside className="result-panel result-panel--empty" ref={resultRef}>
          <div className="result-empty">
            <Ruler size={34} strokeWidth={2.1} />
            <h2>{text.emptyTitle}</h2>
            <p>{text.emptyDescription}</p>
          </div>
        </aside>
      )}
    </div>
  );
}
