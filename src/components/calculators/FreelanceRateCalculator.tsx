import { BriefcaseBusiness, CheckCircle2, ChevronDown, CircleDollarSign, Info, Loader2 } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";
import {
  calculateFreelanceRate,
  type FreelanceRateResponse,
  type WorkCurrency
} from "../../services/workApi";

type FreelanceRateData = FreelanceRateResponse["data"];

const copy = {
  es: {
    kicker: "Calculadora",
    title: "Cuanto cobrar por hora",
    currency: "Moneda",
    currencyHelp: "Elige si quieres hacer la proyeccion en pesos colombianos o en dolares.",
    desiredMonthlyIncome: "Cuanto quieres ganar al mes",
    desiredMonthlyIncomeHelp: "Es la meta mensual que quieres lograr con tu trabajo independiente.",
    workDaysPerWeek: "Dias por semana",
    hoursPerDay: "Horas por dia",
    safetyMargin: "Margen de seguridad",
    safetyMarginHelp:
      "Es un extra sobre tu meta mensual para cubrir imprevistos, semanas flojas, ajustes o negociacion con clientes.",
    hint: "La tarifa por hora se calcula con las horas que realmente quieres trabajar y cobrar.",
    submit: "Calcular cuanto cobrar",
    reset: "Restablecer",
    monthlyGoalError: "Ingresa cuanto quieres ganar al mes.",
    workDaysError: "Elige entre 1 y 7 dias de trabajo por semana.",
    hoursError: "Ingresa horas por dia entre 1 y 24.",
    marginError: "El margen debe estar entre 0% y 300%.",
    requestError: "No se pudo calcular la tarifa freelance.",
    heroTitle: "Tarifa sugerida por hora",
    targetWithMargin: "Meta mensual con margen",
    minimumHourlyRate: "Tarifa minima por hora",
    suggestedDailyRate: "Tarifa diaria sugerida",
    suggestedWeeklyRate: "Tarifa semanal sugerida",
    monthlyHours: "Horas al mes",
    weeklyHours: "Horas por semana",
    addedMargin: "Margen agregado",
    currencyResult: "Moneda usada",
    cop: "Peso colombiano (COP)",
    usd: "Dolar estadounidense (USD)",
    rulesNote: (days: number, hours: string, weeksPerMonth: number) =>
      `Se usaron ${days} dias por semana, ${hours} horas por dia y ${weeksPerMonth} semanas promedio por mes.`,
    disclaimer:
      "Resultado estimado. No incluye impuestos, comisiones de plataformas, riesgo del cliente, cambios de alcance ni asesoria contable o legal.",
    emptyTitle: "Resultado freelance",
    emptyDescription: "Ingresa tu meta mensual y tu ritmo de trabajo para ver cuanto cobrar por hora."
  },
  en: {
    kicker: "Calculator",
    title: "How much to charge per hour",
    currency: "Currency",
    currencyHelp: "Choose whether you want the estimate in Colombian pesos or US dollars.",
    desiredMonthlyIncome: "How much you want to earn per month",
    desiredMonthlyIncomeHelp: "This is the monthly goal you want to reach with your independent work.",
    workDaysPerWeek: "Days per week",
    hoursPerDay: "Hours per day",
    safetyMargin: "Safety margin",
    safetyMarginHelp:
      "This is an extra amount on top of your monthly goal to cover surprises, slow weeks, scope changes, or negotiation.",
    hint: "The hourly rate is calculated with the hours you actually want to work and bill.",
    submit: "Calculate how much to charge",
    reset: "Reset",
    monthlyGoalError: "Enter how much you want to earn per month.",
    workDaysError: "Choose between 1 and 7 workdays per week.",
    hoursError: "Enter hours per day between 1 and 24.",
    marginError: "The margin must be between 0% and 300%.",
    requestError: "We couldn't calculate the freelance rate.",
    heroTitle: "Suggested hourly rate",
    targetWithMargin: "Monthly target with margin",
    minimumHourlyRate: "Minimum hourly rate",
    suggestedDailyRate: "Suggested daily rate",
    suggestedWeeklyRate: "Suggested weekly rate",
    monthlyHours: "Monthly hours",
    weeklyHours: "Weekly hours",
    addedMargin: "Added margin",
    currencyResult: "Currency used",
    cop: "Colombian peso (COP)",
    usd: "US dollar (USD)",
    rulesNote: (days: number, hours: string, weeksPerMonth: number) =>
      `Used ${days} days per week, ${hours} hours per day, and ${weeksPerMonth} average weeks per month.`,
    disclaimer:
      "Estimated result. It does not include taxes, platform fees, client risk, scope changes, or accounting or legal advice.",
    emptyTitle: "Freelance result",
    emptyDescription: "Enter your monthly goal and work pace to see how much to charge per hour."
  }
} as const;

function parseMoney(value: string) {
  const normalized = value.replace(/[^\d]/g, "");
  return normalized.length > 0 ? Number(normalized) : 0;
}

function parseNumber(value: string) {
  const normalized = value.replace(",", ".").replace(/[^\d.]/g, "");
  return normalized.length > 0 ? Number(normalized) : 0;
}

function formatCurrencyDisplay(value: number, currency: WorkCurrency, localeCode: string) {
  const formatter = new Intl.NumberFormat(localeCode, {
    minimumFractionDigits: currency === "USD" ? 2 : 0,
    maximumFractionDigits: currency === "USD" ? 2 : 0
  });

  const amount = formatter.format(value);
  return currency === "USD" ? `$ ${amount}` : `COP ${amount}`;
}

export function FreelanceRateCalculator() {
  const { locale } = useLocale();
  const text = copy[locale];
  const localeCode = locale === "es" ? "es-CO" : "en-US";
  const [currency, setCurrency] = useState<WorkCurrency>("COP");
  const numberFormatter = useMemo(() => new Intl.NumberFormat(localeCode, { maximumFractionDigits: 0 }), [localeCode]);
  const decimalFormatter = useMemo(() => new Intl.NumberFormat(localeCode, { maximumFractionDigits: 2 }), [localeCode]);
  const [desiredMonthlyIncome, setDesiredMonthlyIncome] = useState("5.000.000");
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState("5");
  const [hoursPerDay, setHoursPerDay] = useState("6");
  const [safetyMarginPercentage, setSafetyMarginPercentage] = useState("20");
  const [result, setResult] = useState<FreelanceRateData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  function getDefaultDesiredMonthlyIncome(nextCurrency: WorkCurrency) {
    return nextCurrency === "USD" ? numberFormatter.format(5000) : numberFormatter.format(5000000);
  }

  function formatMoneyInput(value: string) {
    const normalized = value.replace(/[^\d]/g, "");
    return normalized.length > 0 ? numberFormatter.format(Number(normalized)) : "";
  }

  function formatMoney(value: number) {
    return formatCurrencyDisplay(value, result?.currency ?? currency, localeCode);
  }

  function formatDecimal(value: number) {
    return decimalFormatter.format(value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const desiredMonthlyIncomeValue = parseMoney(desiredMonthlyIncome);
    const workDaysPerWeekValue = Number(workDaysPerWeek);
    const hoursPerDayValue = parseNumber(hoursPerDay);
    const safetyMarginPercentageValue = parseNumber(safetyMarginPercentage);

    if (desiredMonthlyIncomeValue <= 0) {
      setError(text.monthlyGoalError);
      return;
    }
    if (!Number.isInteger(workDaysPerWeekValue) || workDaysPerWeekValue < 1 || workDaysPerWeekValue > 7) {
      setError(text.workDaysError);
      return;
    }
    if (hoursPerDayValue <= 0 || hoursPerDayValue > 24) {
      setError(text.hoursError);
      return;
    }
    if (safetyMarginPercentageValue < 0 || safetyMarginPercentageValue > 300) {
      setError(text.marginError);
      return;
    }

    setIsLoading(true);
    try {
      const data = await calculateFreelanceRate({
        desiredMonthlyIncome: desiredMonthlyIncomeValue,
        workDaysPerWeek: workDaysPerWeekValue,
        hoursPerDay: hoursPerDayValue,
        safetyMarginPercentage: safetyMarginPercentageValue,
        currency
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

  function handleCurrencyChange(nextCurrency: WorkCurrency) {
    setCurrency(nextCurrency);
    setDesiredMonthlyIncome(getDefaultDesiredMonthlyIncome(nextCurrency));
    setResult(null);
    setError("");
  }

  function handleReset() {
    setDesiredMonthlyIncome(getDefaultDesiredMonthlyIncome("COP"));
    setWorkDaysPerWeek("5");
    setHoursPerDay("6");
    setSafetyMarginPercentage("20");
    setCurrency("COP");
    setResult(null);
    setError("");
  }

  const activeCurrency = result?.currency ?? currency;

  return (
    <div className="calculator-layout">
      <form className="calculator-card" onSubmit={handleSubmit}>
        <div className="calculator-card__header">
          <div>
            <p className="section__kicker">{text.kicker}</p>
            <h2>{text.title}</h2>
          </div>
          <span>
            <BriefcaseBusiness size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span className="field-label">
            {text.currency}
            <span className="info-tooltip">
              <Info size={15} strokeWidth={2.1} />
              <span role="tooltip">{text.currencyHelp}</span>
            </span>
          </span>
          <span className="select-control">
            <select
              className="plain-select"
              onChange={(event) => handleCurrencyChange(event.target.value as WorkCurrency)}
              value={currency}
            >
              <option value="COP">{text.cop}</option>
              <option value="USD">{text.usd}</option>
            </select>
            <ChevronDown size={18} strokeWidth={2.1} />
          </span>
        </label>

        <label className="field field--spaced">
          <span>{text.desiredMonthlyIncome} <span className="required-mark">*</span></span>
          <div className="money-input">
            <span>$</span>
            <input
              inputMode="numeric"
              onChange={(event) => setDesiredMonthlyIncome(formatMoneyInput(event.target.value))}
              placeholder={currency === "USD" ? "5,000" : "5.000.000"}
              required
              type="text"
              value={desiredMonthlyIncome}
            />
            <strong>{currency}</strong>
          </div>
          <small>{text.desiredMonthlyIncomeHelp}</small>
        </label>

        <div className="form-grid">
          <label className="field">
            <span>{text.workDaysPerWeek} <span className="required-mark">*</span></span>
            <input inputMode="numeric" max={7} min={1} onChange={(event) => setWorkDaysPerWeek(event.target.value)} required type="number" value={workDaysPerWeek} />
          </label>
          <label className="field">
            <span>{text.hoursPerDay} <span className="required-mark">*</span></span>
            <input inputMode="decimal" max={24} min={1} onChange={(event) => setHoursPerDay(event.target.value)} required type="number" value={hoursPerDay} />
          </label>
        </div>

        <label className="field field--spaced">
          <span className="field-label">
            {text.safetyMargin}
            <span className="info-tooltip">
              <Info size={15} strokeWidth={2.1} />
              <span role="tooltip">{text.safetyMarginHelp}</span>
            </span>
          </span>
          <div className="rate-input">
            <input inputMode="decimal" onChange={(event) => setSafetyMarginPercentage(event.target.value)} placeholder="20" type="text" value={safetyMarginPercentage} />
            <strong>%</strong>
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
            <strong>{formatMoney(result.result.suggestedHourlyRate)}</strong>
            <span>{text.targetWithMargin}: {formatMoney(result.result.targetMonthlyRevenue)}</span>
          </div>

          <div className="result-breakdown">
            <div className="result-item">
              <span>{text.minimumHourlyRate}</span>
              <strong>{formatMoney(result.result.minimumHourlyRate)}</strong>
            </div>
            <div className="result-item">
              <span>{text.suggestedDailyRate}</span>
              <strong>{formatMoney(result.result.suggestedDailyRate)}</strong>
            </div>
            <div className="result-item">
              <span>{text.suggestedWeeklyRate}</span>
              <strong>{formatMoney(result.result.suggestedWeeklyRate)}</strong>
            </div>
            <div className="result-item">
              <span>{text.monthlyHours}</span>
              <strong>{formatDecimal(result.result.monthlyWorkingHours)}</strong>
            </div>
            <div className="result-item">
              <span>{text.weeklyHours}</span>
              <strong>{formatDecimal(result.result.weeklyWorkingHours)}</strong>
            </div>
            <div className="result-item">
              <span>{text.currencyResult}</span>
              <strong>{activeCurrency === "USD" ? "$" : "COP"}</strong>
            </div>
            <div className="result-item result-item--strong">
              <span>{text.addedMargin}</span>
              <strong>{formatMoney(result.result.safetyMarginAmount)}</strong>
            </div>
          </div>

          <div className="rules-note">
            <CheckCircle2 size={18} strokeWidth={2.1} />
            <p>{text.rulesNote(result.input.workDaysPerWeek, formatDecimal(result.input.hoursPerDay), result.rules.weeksPerMonth)}</p>
          </div>

          <p className="disclaimer">{text.disclaimer}</p>
        </aside>
      ) : (
        <aside className="result-panel result-panel--empty" ref={resultRef}>
          <div className="result-empty">
            <BriefcaseBusiness size={34} strokeWidth={2.1} />
            <h2>{text.emptyTitle}</h2>
            <p>{text.emptyDescription}</p>
          </div>
        </aside>
      )}
    </div>
  );
}
