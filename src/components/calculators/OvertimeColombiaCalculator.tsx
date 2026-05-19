import { Calculator, CheckCircle2, ChevronDown, CircleDollarSign, Info, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";
import {
  calculateOvertimeColombia,
  type OvertimeColombiaEntryType,
  type OvertimeColombiaResponse
} from "../../services/workApi";

type OvertimeData = OvertimeColombiaResponse["data"];

type DraftEntry = {
  id: number;
  type: OvertimeColombiaEntryType;
  hours: string;
};

function parseMoney(value: string) {
  const normalized = value.replace(/[^\d]/g, "");
  return normalized.length > 0 ? Number(normalized) : 0;
}

function parseDecimal(value: string) {
  const normalized = value.replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
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

const entryTypes: OvertimeColombiaEntryType[] = [
  "daytime_overtime",
  "night_overtime",
  "night_surcharge",
  "sunday_holiday_daytime",
  "sunday_holiday_night",
  "sunday_holiday_daytime_overtime",
  "sunday_holiday_night_overtime"
];

const copy = {
  es: {
    kicker: "Calculadora",
    title: "Horas extras",
    monthlySalary: "Salario mensual bruto",
    monthlySalaryHelp: "Usa el salario antes de descuentos de salud, pensión, Fondo de Solidaridad u otros conceptos. Con ese valor se calcula la hora ordinaria.",
    payrollYear: "Año de reglas",
    payrollYearHelp: "Lo usamos para aplicar la jornada legal vigente de Colombia en ese año.",
    editYearAria: "Editar año de reglas",
    editYearTitle: "Editar año",
    weeklyHours: "Horas semanales",
    weeklyHoursHelp: "Por defecto usamos la jornada legal vigente. Edita este valor si tu contrato maneja otra jornada.",
    editWeeklyHoursAria: "Editar horas semanales",
    editWeeklyHoursTitle: "Editar horas",
    entryType: "Tipo de hora",
    entryHours: "Cantidad de horas",
    addEntry: "Agregar",
    removeEntry: "Eliminar registro",
    salaryRequired: "Ingresa un salario mensual mayor a cero.",
    yearRange: (currentYear: number) => `Ingresa un año entre 2024 y ${currentYear}.`,
    weeklyHoursRange: "Ingresa horas semanales entre 1 y 84.",
    entriesRequired: "Agrega al menos un tipo de hora con cantidad mayor a cero.",
    requestError: "No se pudieron calcular las horas extras.",
    hint: "Calcula horas extra, recargos nocturnos, dominicales y festivos con referencia laboral de Colombia.",
    submit: "Calcular horas extras",
    reset: "Restablecer",
    heroTitle: "Total estimado a pagar",
    ordinaryHourlyRate: "Valor hora ordinaria",
    totalHours: "Total horas",
    weeklyHoursResult: "Horas semanales",
    rulesYearResult: "Año de reglas",
    monthlyHoursResult: "Horas mensuales",
    detailTitle: "Detalle por tipo de hora",
    typeColumn: "Tipo",
    hoursColumn: "Horas",
    rateColumn: "Recargo",
    valueColumn: "Valor",
    rulesNoteCustom: (weeklyHours: number, year: number, legalWeeklyHours: number) =>
      `Usa ${weeklyHours} horas semanales personalizadas. La referencia legal para ${year} es ${legalWeeklyHours} horas.`,
    rulesNoteLegal: (year: number, legalWeeklyHours: number) =>
      `Usa la jornada legal de referencia para ${year}: ${legalWeeklyHours} horas semanales.`,
    emptyTitle: "Tu cálculo de horas extras aparecerá aquí",
    emptyDescription: "Ingresa tu salario, agrega las horas trabajadas por tipo y calcula el valor estimado.",
    entryLabels: {
      daytime_overtime: "Hora extra diurna",
      night_overtime: "Hora extra nocturna",
      night_surcharge: "Recargo nocturno",
      sunday_holiday_daytime: "Dominical/festivo diurno",
      sunday_holiday_night: "Dominical/festivo nocturno",
      sunday_holiday_daytime_overtime: "Extra dominical/festiva diurna",
      sunday_holiday_night_overtime: "Extra dominical/festiva nocturna"
    }
  },
  en: {
    kicker: "Calculator",
    title: "Overtime pay",
    monthlySalary: "Gross monthly salary",
    monthlySalaryHelp: "Use the salary before health, pension, solidarity fund, or other deductions. This value is used to calculate the regular hourly rate.",
    payrollYear: "Rule year",
    payrollYearHelp: "We use it to apply Colombia's legal workweek for that year.",
    editYearAria: "Edit rule year",
    editYearTitle: "Edit year",
    weeklyHours: "Weekly hours",
    weeklyHoursHelp: "By default we use the legal workweek. Edit this value if your contract uses a different schedule.",
    editWeeklyHoursAria: "Edit weekly hours",
    editWeeklyHoursTitle: "Edit hours",
    entryType: "Hour type",
    entryHours: "Hours",
    addEntry: "Add",
    removeEntry: "Remove entry",
    salaryRequired: "Enter a monthly salary greater than zero.",
    yearRange: (currentYear: number) => `Enter a year between 2024 and ${currentYear}.`,
    weeklyHoursRange: "Enter weekly hours between 1 and 84.",
    entriesRequired: "Add at least one hour type with hours greater than zero.",
    requestError: "We couldn't calculate the overtime pay.",
    hint: "Calculate overtime, night surcharges, Sunday, and holiday pay with Colombia labor references.",
    submit: "Calculate overtime",
    reset: "Reset",
    heroTitle: "Estimated total pay",
    ordinaryHourlyRate: "Regular hourly value",
    totalHours: "Total hours",
    weeklyHoursResult: "Weekly hours",
    rulesYearResult: "Rule year",
    monthlyHoursResult: "Monthly hours",
    detailTitle: "Breakdown by hour type",
    typeColumn: "Type",
    hoursColumn: "Hours",
    rateColumn: "Surcharge",
    valueColumn: "Value",
    rulesNoteCustom: (weeklyHours: number, year: number, legalWeeklyHours: number) =>
      `Uses ${weeklyHours} custom weekly hours. The legal reference for ${year} is ${legalWeeklyHours} hours.`,
    rulesNoteLegal: (year: number, legalWeeklyHours: number) =>
      `Uses the legal reference workweek for ${year}: ${legalWeeklyHours} weekly hours.`,
    emptyTitle: "Your overtime calculation will appear here",
    emptyDescription: "Enter your salary, add the worked hours by type, and calculate the estimated amount.",
    entryLabels: {
      daytime_overtime: "Daytime overtime",
      night_overtime: "Night overtime",
      night_surcharge: "Night surcharge",
      sunday_holiday_daytime: "Sunday/holiday daytime",
      sunday_holiday_night: "Sunday/holiday night",
      sunday_holiday_daytime_overtime: "Sunday/holiday daytime overtime",
      sunday_holiday_night_overtime: "Sunday/holiday night overtime"
    }
  }
} as const;

export function OvertimeColombiaCalculator() {
  const { locale } = useLocale();
  const text = copy[locale];
  const localeCode = locale === "es" ? "es-CO" : "en-US";
  const currencyFormatter = useMemo(
    () => new Intl.NumberFormat(localeCode, { style: "currency", currency: "COP", maximumFractionDigits: 0 }),
    [localeCode]
  );
  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(localeCode, { maximumFractionDigits: 2 }),
    [localeCode]
  );
  const integerFormatter = useMemo(
    () => new Intl.NumberFormat(localeCode, { maximumFractionDigits: 0 }),
    [localeCode]
  );

  function formatMoneyInput(value: string) {
    const normalized = value.replace(/[^\d]/g, "");
    return normalized.length > 0 ? integerFormatter.format(Number(normalized)) : "";
  }

  function formatMoney(value: number) {
    return currencyFormatter.format(value);
  }

  function formatRate(value: number) {
    return `${integerFormatter.format(value * 100)}%`;
  }

  const currentColombiaDate = useMemo(() => getCurrentColombiaDate(), []);
  const currentPayrollYear = Number(currentColombiaDate.slice(0, 4));
  const payrollYears = useMemo(() => buildPayrollYears(currentPayrollYear), [currentPayrollYear]);
  const defaultLegalWeeklyHours = useMemo(() => getLegalWeeklyHours(currentColombiaDate), [currentColombiaDate]);
  const [monthlySalary, setMonthlySalary] = useState("2.500.000");
  const [year, setYear] = useState(currentPayrollYear.toString());
  const [isYearEditable, setIsYearEditable] = useState(false);
  const [weeklyHours, setWeeklyHours] = useState(defaultLegalWeeklyHours.toString());
  const [isWeeklyHoursEditable, setIsWeeklyHoursEditable] = useState(false);
  const [entryType, setEntryType] = useState<OvertimeColombiaEntryType>("daytime_overtime");
  const [entryHours, setEntryHours] = useState("2");
  const [entries, setEntries] = useState<DraftEntry[]>([
    { id: 1, type: "daytime_overtime", hours: "2" }
  ]);
  const [nextEntryId, setNextEntryId] = useState(2);
  const [result, setResult] = useState<OvertimeData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  function handleWeeklyHoursEditToggle() {
    setIsWeeklyHoursEditable((isEditable) => {
      const nextValue = !isEditable;
      if (!nextValue) setWeeklyHours(defaultLegalWeeklyHours.toString());
      return nextValue;
    });
  }

  function handleAddEntry() {
    const hoursValue = parseDecimal(entryHours);

    if (hoursValue <= 0) {
      setError(text.entriesRequired);
      return;
    }

    setError("");
    setEntries((currentEntries) => [
      ...currentEntries,
      { id: nextEntryId, type: entryType, hours: entryHours.replace(".", ",") }
    ]);
    setNextEntryId((currentId) => currentId + 1);
    setEntryHours("1");
  }

  function handleRemoveEntry(entryId: number) {
    setEntries((currentEntries) => currentEntries.filter((entry) => entry.id !== entryId));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const salaryValue = parseMoney(monthlySalary);
    const yearValue = Number(year);
    const weeklyHoursValue = Number(weeklyHours);
    const parsedEntries = entries
      .map((entry) => ({
        type: entry.type,
        hours: parseDecimal(entry.hours)
      }))
      .filter((entry) => entry.hours > 0);

    if (salaryValue <= 0) {
      setError(text.salaryRequired);
      return;
    }
    if (!Number.isInteger(yearValue) || yearValue < 2024 || yearValue > currentPayrollYear) {
      setError(text.yearRange(currentPayrollYear));
      return;
    }
    if (!Number.isFinite(weeklyHoursValue) || weeklyHoursValue <= 0 || weeklyHoursValue > 84) {
      setError(text.weeklyHoursRange);
      return;
    }
    if (parsedEntries.length === 0) {
      setError(text.entriesRequired);
      return;
    }

    setIsLoading(true);
    try {
      const data = await calculateOvertimeColombia({
        monthlySalary: salaryValue,
        weeklyHours: weeklyHoursValue,
        year: yearValue,
        entries: parsedEntries
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

  function handleReset() {
    setMonthlySalary("2.500.000");
    setYear(currentPayrollYear.toString());
    setIsYearEditable(false);
    setWeeklyHours(defaultLegalWeeklyHours.toString());
    setIsWeeklyHoursEditable(false);
    setEntryType("daytime_overtime");
    setEntryHours("2");
    setEntries([{ id: 1, type: "daytime_overtime", hours: "2" }]);
    setNextEntryId(2);
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
            <Calculator size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span className="field-label">
            {text.monthlySalary} <span className="required-mark">*</span>
            <span className="info-tooltip">
              <Info size={15} strokeWidth={2.1} />
              <span role="tooltip">{text.monthlySalaryHelp}</span>
            </span>
          </span>
          <div className="money-input">
            <span>$</span>
            <input inputMode="numeric" onChange={(event) => setMonthlySalary(formatMoneyInput(event.target.value))} placeholder="2.500.000" required type="text" value={monthlySalary} />
            <strong>COP</strong>
          </div>
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
                <input disabled={!isWeeklyHoursEditable} inputMode="decimal" min={1} onChange={(event) => setWeeklyHours(event.target.value)} required type="number" value={weeklyHours} />
                <button aria-label={text.editWeeklyHoursAria} onClick={handleWeeklyHoursEditToggle} title={text.editWeeklyHoursTitle} type="button">
                  <Pencil size={15} strokeWidth={2.1} />
                </button>
              </div>
            </label>
          </div>

          <div className="form-grid form-grid--compact field--spaced">
            <label className="field">
              <span>{text.entryType}</span>
              <span className="select-control">
                <select className="plain-select" onChange={(event) => setEntryType(event.target.value as OvertimeColombiaEntryType)} value={entryType}>
                  {entryTypes.map((type) => (
                    <option key={type} value={type}>{text.entryLabels[type]}</option>
                  ))}
                </select>
                <ChevronDown size={18} strokeWidth={2.1} />
              </span>
            </label>

            <label className="field">
              <span>{text.entryHours}</span>
              <input inputMode="decimal" min={0.1} onChange={(event) => setEntryHours(event.target.value)} step="0.1" type="number" value={entryHours} />
            </label>
          </div>

          <button className="secondary-action" onClick={handleAddEntry} type="button">
            <Plus size={18} />
            {text.addEntry}
          </button>

          {entries.length > 0 ? (
            <div className="work-entry-list">
              {entries.map((entry) => (
                <div className="work-entry" key={entry.id}>
                  <div className="work-entry__header">
                    <div className="work-entry__toggle" role="presentation">
                      <span>
                        <strong>{text.entryLabels[entry.type]}</strong>
                        <small>{numberFormatter.format(parseDecimal(entry.hours))} {text.totalHours.toLowerCase()}</small>
                      </span>
                    </div>
                    <div className="work-entry__actions">
                      <button aria-label={text.removeEntry} className="icon-action" onClick={() => handleRemoveEntry(entry.id)} type="button">
                        <Trash2 size={16} strokeWidth={2.1} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>

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

      <section className={result ? "result-panel" : "result-panel result-panel--empty"} ref={resultRef}>
        {result ? (
          <>
            <div className="result-panel__hero">
              <p>{text.heroTitle}</p>
              <strong>{formatMoney(result.result.totalOvertimePay)}</strong>
              <span>{numberFormatter.format(result.result.totalHours)} {text.totalHours.toLowerCase()}</span>
            </div>

            <div className="result-breakdown">
              <ResultItem label={text.ordinaryHourlyRate} value={formatMoney(result.result.ordinaryHourlyRate)} strong />
              <ResultItem label={text.totalHours} value={numberFormatter.format(result.result.totalHours)} />
              <ResultItem label={text.weeklyHoursResult} value={numberFormatter.format(result.result.weeklyHours)} />
              <ResultItem label={text.rulesYearResult} value={String(result.year)} />
            </div>

            <div className="text-result text-result--tight-bottom">
              <div className="text-result__header">
                <span>{text.detailTitle}</span>
              </div>
              <div className="duplicate-table-wrap overtime-table-wrap">
                <table className="duplicate-table overtime-table">
                  <thead>
                    <tr>
                      <th>{text.typeColumn}</th>
                      <th>{text.hoursColumn}</th>
                      <th>{text.rateColumn}</th>
                      <th>{text.valueColumn}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.result.entries.map((entry) => (
                      <tr key={`${entry.type}-${entry.hours}-${entry.subtotal}`}>
                        <td>{text.entryLabels[entry.type]}</td>
                        <td>{numberFormatter.format(entry.hours)}</td>
                        <td>{formatRate(entry.surchargeRate)}</td>
                        <td><strong>{formatMoney(entry.subtotal)}</strong></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rules-note">
              <CheckCircle2 size={18} strokeWidth={2.1} />
              <p>
                {result.rules.usedCustomWeeklyHours
                  ? text.rulesNoteCustom(result.result.weeklyHours, result.year, result.rules.legalWeeklyHours)
                  : text.rulesNoteLegal(result.year, result.rules.legalWeeklyHours)}
              </p>
            </div>

            <p className="disclaimer">{result.disclaimer}</p>
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

function ResultItem({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={strong ? "result-item result-item--strong" : "result-item"}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
