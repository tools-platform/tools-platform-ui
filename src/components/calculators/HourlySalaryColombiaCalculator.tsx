import { Calculator, CheckCircle2, ChevronDown, CircleDollarSign, Info, Loader2, Pencil } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";
import {
  calculateHourlySalaryColombia,
  type HourlySalaryColombiaResponse,
  type HourlySalaryType
} from "../../services/financeApi";

type HourlySalaryData = HourlySalaryColombiaResponse["data"];

function parseMoney(value: string) {
  const normalized = value.replace(/[^\d]/g, "");
  return normalized.length > 0 ? Number(normalized) : 0;
}

function getCurrentColombiaDate() {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  const parts = formatter.formatToParts(new Date());
  const year = parts.find((part) => part.type === "year")?.value ?? "2026";
  const month = parts.find((part) => part.type === "month")?.value ?? "01";
  const day = parts.find((part) => part.type === "day")?.value ?? "01";
  return `${year}-${month}-${day}`;
}

function getLegalWeeklyHours(currentDate: string) {
  if (currentDate >= "2026-07-15") return 42;
  if (currentDate >= "2025-07-15") return 44;
  if (currentDate >= "2024-07-15") return 46;
  if (currentDate >= "2023-07-15") return 47;
  return 48;
}

function buildPayrollYears(currentYear: number) {
  const years: number[] = [];
  for (let year = currentYear; year >= 2024; year -= 1) years.push(year);
  return years;
}

const copy = {
  es: {
    kicker: "Calculadora",
    title: "Salario por hora",
    monthlySalary: "Salario mensual",
    monthlySalaryHelp: "Es el salario mensual que quieres convertir a valor por hora.",
    payrollYear: "Año de reglas",
    payrollYearHelp: "Lo usamos para aplicar la jornada legal y los límites laborales vigentes de ese año en Colombia.",
    editYearAria: "Editar año de reglas",
    editYearTitle: "Editar año",
    weeklyHours: "Horas semanales",
    weeklyHoursHelp: "Por defecto usamos la jornada legal vigente hoy en Colombia. Puedes editarla si tu horario real es distinto.",
    editWeeklyHoursAria: "Editar horas semanales",
    editWeeklyHoursTitle: "Editar horas",
    salaryType: "Tipo de cálculo",
    salaryTypeHelp: "Bruto divide el salario sin descuentos. Neto descuenta salud, pensión y Fondo de Solidaridad Pensional cuando aplica.",
    gross: "Bruto",
    net: "Neto",
    salaryRequired: "Ingresa un salario mensual mayor a cero.",
    yearRange: (currentYear: number) => `Ingresa un año entre 2024 y ${currentYear}.`,
    weeklyHoursRange: "Ingresa horas semanales entre 1 y 168.",
    requestError: "No se pudo calcular el salario por hora.",
    preview: (salary: string, weeklyHours: string, year: string, salaryType: HourlySalaryType) =>
      `Vas a calcular sobre ${salary} al mes con ${weeklyHours} horas semanales y reglas de ${year}. ${
        salaryType === "net" ? "El neto estima descuentos legales." : "El bruto no descuenta nómina."
      }`,
    submit: "Calcular salario por hora",
    reset: "Restablecer",
    heroGross: "Valor bruto por hora",
    heroNet: "Valor neto por hora",
    dailyValue: "Por día laboral",
    baseMonthlySalary: "Salario mensual base",
    usedMonthlySalary: "Salario mensual usado",
    weeklyHoursResult: "Horas semanales",
    monthlyHoursResult: "Horas mensuales",
    health: "Salud 4%",
    pension: "Pensión 4%",
    solidarityFund: "Fondo de solidaridad",
    totalDeductions: "Total descuentos",
    dailyValueLabel: "Valor por día laboral",
    customRulesNote: (weeklyHours: number, year: number, legalWeeklyHours: number) =>
      `Usa ${weeklyHours} horas semanales personalizadas. La referencia legal para ${year} es ${legalWeeklyHours} horas.`,
    legalRulesNote: (year: number, legalWeeklyHours: number) =>
      `Usa la jornada legal de referencia para ${year}: ${legalWeeklyHours} horas semanales.`,
    salaryTypeResult: "Tipo de cálculo",
    solidarityRate: "Solidaridad",
    disclaimer:
      "Estimación del valor por hora para un empleado dependiente en Colombia. El cálculo neto descuenta salud, pensión y Fondo de Solidaridad Pensional cuando aplica. No incluye horas extra, recargos, impuestos ni acuerdos especiales.",
    emptyTitle: "Tu valor por hora aparecerá aquí",
    emptyDescription: "Ingresa el salario mensual, elige si quieres ver bruto o neto y calcula para obtener la conversión por hora."
  },
  en: {
    kicker: "Calculator",
    title: "Hourly salary",
    monthlySalary: "Monthly salary",
    monthlySalaryHelp: "This is the monthly salary you want to convert into an hourly value.",
    payrollYear: "Rule year",
    payrollYearHelp: "We use it to apply the legal workweek and labor limits in force for that year in Colombia.",
    editYearAria: "Edit rule year",
    editYearTitle: "Edit year",
    weeklyHours: "Weekly hours",
    weeklyHoursHelp: "By default we use the legal workweek currently in force in Colombia. You can edit it if your real schedule is different.",
    editWeeklyHoursAria: "Edit weekly hours",
    editWeeklyHoursTitle: "Edit hours",
    salaryType: "Calculation type",
    salaryTypeHelp: "Gross divides the salary without deductions. Net subtracts health, pension, and the solidarity pension fund when applicable.",
    gross: "Gross",
    net: "Net",
    salaryRequired: "Enter a monthly salary greater than zero.",
    yearRange: (currentYear: number) => `Enter a year between 2024 and ${currentYear}.`,
    weeklyHoursRange: "Enter weekly hours between 1 and 168.",
    requestError: "We couldn't calculate the hourly salary.",
    preview: (salary: string, weeklyHours: string, year: string, salaryType: HourlySalaryType) =>
      `You are calculating from ${salary} per month, using ${weeklyHours} weekly hours and ${year} rules. ${
        salaryType === "net" ? "Net estimates legal deductions." : "Gross does not subtract payroll deductions."
      }`,
    submit: "Calculate hourly salary",
    reset: "Reset",
    heroGross: "Gross hourly value",
    heroNet: "Net hourly value",
    dailyValue: "Per workday",
    baseMonthlySalary: "Base monthly salary",
    usedMonthlySalary: "Monthly salary used",
    weeklyHoursResult: "Weekly hours",
    monthlyHoursResult: "Monthly hours",
    health: "Health 4%",
    pension: "Pension 4%",
    solidarityFund: "Solidarity fund",
    totalDeductions: "Total deductions",
    dailyValueLabel: "Per workday value",
    customRulesNote: (weeklyHours: number, year: number, legalWeeklyHours: number) =>
      `Uses ${weeklyHours} custom weekly hours. The legal reference for ${year} is ${legalWeeklyHours} hours.`,
    legalRulesNote: (year: number, legalWeeklyHours: number) =>
      `Uses the legal reference workweek for ${year}: ${legalWeeklyHours} weekly hours.`,
    salaryTypeResult: "Calculation type",
    solidarityRate: "Solidarity",
    disclaimer:
      "Estimated hourly value for a dependent employee in Colombia. The net calculation subtracts health, pension, and the solidarity pension fund when applicable. It does not include overtime, surcharges, taxes, or special agreements.",
    emptyTitle: "Your hourly value will appear here",
    emptyDescription: "Enter the monthly salary, choose whether you want gross or net, and calculate to get the hourly conversion."
  }
} as const;

export function HourlySalaryColombiaCalculator() {
  const { locale } = useLocale();
  const text = copy[locale];
  const localeCode = locale === "es" ? "es-CO" : "en-US";
  const currencyFormatter = useMemo(
    () => new Intl.NumberFormat(localeCode, { style: "currency", currency: "COP", maximumFractionDigits: 0 }),
    [localeCode]
  );
  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(localeCode, { maximumFractionDigits: 0 }),
    [localeCode]
  );

  function formatMoneyInput(value: string) {
    const normalized = value.replace(/[^\d]/g, "");
    return normalized.length > 0 ? numberFormatter.format(Number(normalized)) : "";
  }

  function formatMoney(value: number) {
    return currencyFormatter.format(value);
  }

  function formatRate(value: number) {
    return `${numberFormatter.format(value * 100)}%`;
  }

  const currentColombiaDate = useMemo(() => getCurrentColombiaDate(), []);
  const currentPayrollYear = Number(currentColombiaDate.slice(0, 4));
  const payrollYears = useMemo(() => buildPayrollYears(currentPayrollYear), [currentPayrollYear]);
  const defaultLegalWeeklyHours = useMemo(() => getLegalWeeklyHours(currentColombiaDate), [currentColombiaDate]);
  const [monthlySalary, setMonthlySalary] = useState("2.500.000");
  const [year, setYear] = useState(currentPayrollYear.toString());
  const [isYearEditable, setIsYearEditable] = useState(false);
  const [salaryType, setSalaryType] = useState<HourlySalaryType>("gross");
  const [weeklyHours, setWeeklyHours] = useState(defaultLegalWeeklyHours.toString());
  const [isWeeklyHoursEditable, setIsWeeklyHoursEditable] = useState(false);
  const [result, setResult] = useState<HourlySalaryData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  const previewSalary = useMemo(() => parseMoney(monthlySalary), [monthlySalary]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const salaryValue = parseMoney(monthlySalary);
    const yearValue = Number(year);
    const weeklyHoursValue = Number(weeklyHours);

    if (salaryValue <= 0) {
      setError(text.salaryRequired);
      return;
    }
    if (!Number.isInteger(yearValue) || yearValue < 2024 || yearValue > currentPayrollYear) {
      setError(text.yearRange(currentPayrollYear));
      return;
    }
    if (!Number.isFinite(weeklyHoursValue) || weeklyHoursValue <= 0 || weeklyHoursValue > 168) {
      setError(text.weeklyHoursRange);
      return;
    }

    setIsLoading(true);
    try {
      const data = await calculateHourlySalaryColombia({
        monthlySalary: salaryValue,
        salaryType,
        weeklyHours: weeklyHoursValue,
        year: yearValue
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

  function handleWeeklyHoursEditToggle() {
    setIsWeeklyHoursEditable((isEditable) => {
      const nextValue = !isEditable;
      if (!nextValue) setWeeklyHours(defaultLegalWeeklyHours.toString());
      return nextValue;
    });
  }

  function handleReset() {
    setMonthlySalary("2.500.000");
    setYear(currentPayrollYear.toString());
    setIsYearEditable(false);
    setSalaryType("gross");
    setWeeklyHours(defaultLegalWeeklyHours.toString());
    setIsWeeklyHoursEditable(false);
    setResult(null);
    setError("");
  }

  const salaryTypeLabel = salaryType === "gross" ? text.gross : text.net;

  return (
    <div className="calculator-layout">
      <form className="calculator-card" onSubmit={handleSubmit}>
        <div className="calculator-card__header">
          <div>
            <p className="section__kicker">{text.kicker}</p>
            <h2>{text.title}</h2>
          </div>
          <span>
            <Calculator size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span>{text.monthlySalary} <span className="required-mark">*</span></span>
          <div className="money-input">
            <span>$</span>
            <input inputMode="numeric" onChange={(event) => setMonthlySalary(formatMoneyInput(event.target.value))} placeholder="2.500.000" required type="text" value={monthlySalary} />
            <strong>COP</strong>
          </div>
          <small>{text.monthlySalaryHelp}</small>
        </label>

        <div className="form-grid form-grid--single">
          <div className="form-grid form-grid--compact">
            <label className="field">
              <span className="field-label">
                {text.payrollYear} <span className="required-mark">*</span>
                <span className="info-tooltip">
                  <Info size={15} strokeWidth={2.1} />
                  <span role="tooltip">{text.payrollYearHelp}</span>
                </span>
              </span>
              <div className="year-input">
                <select disabled={!isYearEditable} onChange={(event) => setYear(event.target.value)} required value={year}>
                  {payrollYears.map((payrollYear) => (
                    <option key={payrollYear} value={payrollYear}>{payrollYear}</option>
                  ))}
                </select>
                <button aria-label={text.editYearAria} onClick={() => setIsYearEditable((isEditable) => !isEditable)} title={text.editYearTitle} type="button">
                  <Pencil size={15} strokeWidth={2.1} />
                </button>
              </div>
            </label>

            <label className="field">
              <span className="field-label">
                {text.weeklyHours} <span className="required-mark">*</span>
                <span className="info-tooltip">
                  <Info size={15} strokeWidth={2.1} />
                  <span role="tooltip">{text.weeklyHoursHelp}</span>
                </span>
              </span>
              <div className="year-input year-input--manual">
                <input disabled={!isWeeklyHoursEditable} inputMode="numeric" min={1} onChange={(event) => setWeeklyHours(event.target.value)} required type="number" value={weeklyHours} />
                <button aria-label={text.editWeeklyHoursAria} onClick={handleWeeklyHoursEditToggle} title={text.editWeeklyHoursTitle} type="button">
                  <Pencil size={15} strokeWidth={2.1} />
                </button>
              </div>
            </label>
          </div>

          <label className="field field--spaced">
            <span className="field-label">
              {text.salaryType} <span className="required-mark">*</span>
              <span className="info-tooltip">
                <Info size={15} strokeWidth={2.1} />
                <span role="tooltip">{text.salaryTypeHelp}</span>
              </span>
            </span>
            <span className="select-control">
              <select onChange={(event) => setSalaryType(event.target.value as HourlySalaryType)} value={salaryType}>
                <option value="gross">{text.gross}</option>
                <option value="net">{text.net}</option>
              </select>
              <ChevronDown size={18} strokeWidth={2.1} />
            </span>
          </label>
        </div>

        {previewSalary > 0 ? (
          <div className="calculator-hint">
            <Info size={16} strokeWidth={2.1} />
            <span>{text.preview(formatMoney(previewSalary), weeklyHours, year, salaryType)}</span>
          </div>
        ) : null}

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-action" disabled={isLoading} type="submit">
          {isLoading ? <Loader2 className="spin" size={18} /> : <CircleDollarSign size={18} />}
          {text.submit}
        </button>
        <button className="secondary-action" onClick={handleReset} type="button">
          {text.reset}
        </button>
      </form>

      <section className={result ? "result-panel" : "result-panel result-panel--empty"} ref={resultRef}>
        {result ? (
          <>
            <div className="result-panel__hero">
              <p>{result.input.salaryType === "gross" ? text.heroGross : text.heroNet}</p>
              <strong>{formatMoney(result.result.hourlySalary)}</strong>
              <span>{text.dailyValue}: {formatMoney(result.result.dailySalary)}</span>
            </div>

            <div className="result-breakdown">
              <ResultItem label={text.baseMonthlySalary} value={result.result.baseMonthlySalary} formatMoney={formatMoney} />
              <ResultItem label={text.usedMonthlySalary} value={result.result.monthlySalaryUsed} formatMoney={formatMoney} />
              <ResultTextItem label={text.weeklyHoursResult} value={`${result.result.weeklyHours}`} />
              <ResultTextItem label={text.monthlyHoursResult} value={`${result.result.monthlyHours}`} />
              {result.deductions.applies ? <ResultItem label={text.health} value={result.deductions.healthContribution} formatMoney={formatMoney} /> : null}
              {result.deductions.applies ? <ResultItem label={text.pension} value={result.deductions.pensionContribution} formatMoney={formatMoney} /> : null}
              {result.deductions.applies && result.deductions.solidarityPensionFundContribution > 0 ? (
                <ResultItem label={text.solidarityFund} value={result.deductions.solidarityPensionFundContribution} formatMoney={formatMoney} />
              ) : null}
              <ResultItem
                label={result.deductions.applies ? text.totalDeductions : text.dailyValueLabel}
                value={result.deductions.applies ? result.deductions.totalDeductions : result.result.dailySalary}
                strong
                formatMoney={formatMoney}
              />
            </div>

            <div className="rules-note">
              <CheckCircle2 size={18} strokeWidth={2.1} />
              <p>
                {result.rules.usedCustomWeeklyHours
                  ? text.customRulesNote(result.result.weeklyHours, result.year, result.rules.legalWeeklyHours)
                  : text.legalRulesNote(result.year, result.rules.legalWeeklyHours)}
              </p>
            </div>

            <div className="rules-grid">
              <span>{text.salaryTypeResult}: {salaryTypeLabel}</span>
              <span>{text.health}: {formatRate(result.rules.employeeHealthRate)}</span>
              <span>{text.pension}: {formatRate(result.rules.employeePensionRate)}</span>
              {result.deductions.applies ? <span>{text.solidarityRate}: {formatRate(result.rules.solidarityPensionFundRate)}</span> : null}
            </div>

            <p className="disclaimer">{text.disclaimer}</p>
          </>
        ) : (
          <div className="result-empty">
            <CircleDollarSign size={30} strokeWidth={2.05} />
            <h2>{text.emptyTitle}</h2>
            <p>{text.emptyDescription}</p>
          </div>
        )}
      </section>
    </div>
  );
}

function ResultItem({ label, value, strong = false, formatMoney }: { label: string; value: number; strong?: boolean; formatMoney: (value: number) => string }) {
  return (
    <div className={strong ? "result-item result-item--strong" : "result-item"}>
      <span>{label}</span>
      <strong>{formatMoney(value)}</strong>
    </div>
  );
}

function ResultTextItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="result-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
