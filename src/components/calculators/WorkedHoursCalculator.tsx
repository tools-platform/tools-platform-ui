import { BriefcaseBusiness, CheckCircle2, ChevronDown, Clock3, Info, Loader2, Plus, Trash2 } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { DateField } from "../DateField";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";
import {
  calculateWorkedHours,
  type WorkedHoursResponse,
  type WorkedHoursRounding
} from "../../services/workApi";

type WorkedHoursData = WorkedHoursResponse["data"];
type WorkEntryForm = { id: string; date: string; startTime: string; endTime: string };

function todayDate() {
  return new Date().toISOString().slice(0, 10);
}

const copy = {
  es: {
    kicker: "Calculadora",
    title: "Rangos trabajados",
    range: "Rango",
    pendingEntry: "Pendiente por completar",
    workedDay: "Día trabajado",
    startTime: "Hora de inicio",
    endTime: "Hora de finalización",
    addRange: "Agregar rango",
    rounding: "Redondeo",
    roundingHelp:
      "Sirve si cobras o reportas tiempo por bloques. Si no necesitas ajustar los minutos, déjalo sin redondeo.",
    noRounding: "Sin redondeo",
    quarterHour: "Al cuarto de hora",
    halfHour: "A media hora",
    hint: "Puedes agregar una o varias jornadas para sumar el tiempo trabajado por día y rango de horas.",
    submit: "Calcular horas",
    reset: "Restablecer",
    noEntriesError: "Agrega al menos un rango de trabajo.",
    incompleteError: "Completa la fecha y las horas de cada rango.",
    endTimeError: "La hora de finalización debe ser mayor que la hora de inicio en cada rango.",
    requestError: "No se pudieron calcular las horas.",
    heroTitle: "Total trabajado",
    decimalHours: "horas en decimal",
    totalHours: "Horas totales",
    totalMinutes: "Minutos totales",
    calculatedRanges: "Rangos calculados",
    includedDays: "Días incluidos",
    usedRounding: "Redondeo usado",
    rulesNote: (entryCount: number) =>
      `Se calcularon ${entryCount} rangos. El total en decimal te sirve para cobrar o registrar tiempo en plataformas de trabajo.`,
    minutesCalculated: "min calculados",
    disclaimer:
      "Resultado estimado. No calcula horas extra, recargos nocturnos, festivos, políticas de nómina ni reglas laborales específicas.",
    emptyTitle: "Resultado de horas",
    emptyDescription: "Agrega uno o varios rangos para ver el total trabajado."
  },
  en: {
    kicker: "Calculator",
    title: "Worked ranges",
    range: "Range",
    pendingEntry: "Pending to complete",
    workedDay: "Worked day",
    startTime: "Start time",
    endTime: "End time",
    addRange: "Add range",
    rounding: "Rounding",
    roundingHelp:
      "Useful if you bill or report time in blocks. If you do not need to adjust minutes, leave it with no rounding.",
    noRounding: "No rounding",
    quarterHour: "Nearest quarter hour",
    halfHour: "Nearest half hour",
    hint: "You can add one or several work sessions to total time by day and time range.",
    submit: "Calculate hours",
    reset: "Reset",
    noEntriesError: "Add at least one work range.",
    incompleteError: "Complete the date and times for every range.",
    endTimeError: "The end time must be greater than the start time in each range.",
    requestError: "We couldn't calculate the hours.",
    heroTitle: "Total worked",
    decimalHours: "decimal hours",
    totalHours: "Total hours",
    totalMinutes: "Total minutes",
    calculatedRanges: "Calculated ranges",
    includedDays: "Included days",
    usedRounding: "Rounding used",
    rulesNote: (entryCount: number) =>
      `Calculated ${entryCount} ranges. The decimal total helps you bill or log time on work platforms.`,
    minutesCalculated: "calculated min",
    disclaimer:
      "Estimated result. It does not calculate overtime, night surcharges, holidays, payroll policies, or specific labor rules.",
    emptyTitle: "Hours result",
    emptyDescription: "Add one or more ranges to see the total time worked."
  }
} as const;

const initialEntries: WorkEntryForm[] = [{ id: "entry-1", date: todayDate(), startTime: "08:00", endTime: "12:00" }];

function getRoundingLabel(rounding: WorkedHoursRounding, locale: "es" | "en") {
  const text = copy[locale];
  return {
    none: text.noRounding,
    nearest_15_minutes: text.quarterHour,
    nearest_30_minutes: text.halfHour
  }[rounding];
}

export function WorkedHoursCalculator() {
  const { locale } = useLocale();
  const text = copy[locale];
  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(locale === "es" ? "es-CO" : "en-US", { maximumFractionDigits: 2 }),
    [locale]
  );
  const [entries, setEntries] = useState<WorkEntryForm[]>(initialEntries);
  const [expandedEntryIds, setExpandedEntryIds] = useState<string[]>([initialEntries[0].id]);
  const [rounding, setRounding] = useState<WorkedHoursRounding>("none");
  const [result, setResult] = useState<WorkedHoursData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  function formatHours(value: number) {
    return numberFormatter.format(value);
  }

  function getEntrySummary(entry: WorkEntryForm) {
    if (!entry.date || !entry.startTime || !entry.endTime) {
      return text.pendingEntry;
    }
    return `${entry.date} · ${entry.startTime} - ${entry.endTime}`;
  }

  function updateEntry<Field extends keyof Omit<WorkEntryForm, "id">>(id: string, field: Field, value: WorkEntryForm[Field]) {
    setEntries((currentEntries) => currentEntries.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry)));
  }

  function addEntry() {
    const newEntryId = `entry-${Date.now()}`;
    setEntries((currentEntries) => [
      ...currentEntries,
      { id: newEntryId, date: todayDate(), startTime: "08:00", endTime: "17:00" }
    ]);
    setExpandedEntryIds((currentIds) => [...currentIds, newEntryId]);
  }

  function removeEntry(id: string) {
    setEntries((currentEntries) => currentEntries.filter((entry) => entry.id !== id));
    setExpandedEntryIds((currentIds) => currentIds.filter((entryId) => entryId !== id));
  }

  function toggleEntry(id: string) {
    setExpandedEntryIds((currentIds) =>
      currentIds.includes(id) ? currentIds.filter((entryId) => entryId !== id) : [...currentIds, id]
    );
  }

  function handleReset() {
    setEntries(initialEntries);
    setExpandedEntryIds([initialEntries[0].id]);
    setRounding("none");
    setResult(null);
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (entries.length === 0) {
      setError(text.noEntriesError);
      return;
    }

    const payloadEntries = entries.map((entry) => ({ date: entry.date, startTime: entry.startTime, endTime: entry.endTime }));

    if (payloadEntries.some((entry) => !entry.date || !entry.startTime || !entry.endTime)) {
      setError(text.incompleteError);
      return;
    }

    if (payloadEntries.some((entry) => entry.endTime <= entry.startTime)) {
      setError(text.endTimeError);
      return;
    }

    setIsLoading(true);
    try {
      const data = await calculateWorkedHours({ entries: payloadEntries, rounding });
      setResult(data);
      scrollToResultOnMobile();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : text.requestError);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
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
            <Clock3 size={20} strokeWidth={2.1} />
          </span>
        </div>

        <div className="work-entry-list">
          {entries.map((entry, index) => (
            <div className={expandedEntryIds.includes(entry.id) ? "work-entry is-open" : "work-entry"} key={entry.id}>
              <div className="work-entry__header">
                <button
                  aria-expanded={expandedEntryIds.includes(entry.id)}
                  className="work-entry__toggle"
                  onClick={() => toggleEntry(entry.id)}
                  type="button"
                >
                  <span>
                    <strong>{text.range} {index + 1}</strong>
                    <small>{getEntrySummary(entry)}</small>
                  </span>
                  <ChevronDown size={18} strokeWidth={2.1} />
                </button>
                <div className="work-entry__actions">
                  {entries.length > 1 ? (
                    <button
                      aria-label={`${text.range} ${index + 1}`}
                      className="icon-action"
                      onClick={() => removeEntry(entry.id)}
                      type="button"
                    >
                      <Trash2 size={16} strokeWidth={2.1} />
                    </button>
                  ) : null}
                </div>
              </div>

              <div className="work-entry__body" hidden={!expandedEntryIds.includes(entry.id)}>
                <label className="field">
                  <span>{text.workedDay} <span className="required-mark">*</span></span>
                  <DateField
                    ariaLabel={`${text.workedDay} ${index + 1}`}
                    onChange={(value) => updateEntry(entry.id, "date", value)}
                    value={entry.date}
                  />
                </label>

                <div className="form-grid">
                  <label className="field">
                    <span>{text.startTime} <span className="required-mark">*</span></span>
                    <div className="time-field">
                      <Clock3 size={17} strokeWidth={2.1} />
                      <input onChange={(event) => updateEntry(entry.id, "startTime", event.target.value)} type="time" value={entry.startTime} />
                    </div>
                  </label>

                  <label className="field">
                    <span>{text.endTime} <span className="required-mark">*</span></span>
                    <div className="time-field">
                      <Clock3 size={17} strokeWidth={2.1} />
                      <input onChange={(event) => updateEntry(entry.id, "endTime", event.target.value)} type="time" value={entry.endTime} />
                    </div>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="secondary-action secondary-action--compact" onClick={addEntry} type="button">
          <Plus size={17} strokeWidth={2.1} />
          {text.addRange}
        </button>

        <label className="field field--spaced">
          <span className="field-label">
            {text.rounding}
            <span className="info-tooltip">
              <Info size={15} strokeWidth={2.1} />
              <span role="tooltip">{text.roundingHelp}</span>
            </span>
          </span>
          <span className="select-control">
            <select className="plain-select" onChange={(event) => setRounding(event.target.value as WorkedHoursRounding)} value={rounding}>
              <option value="none">{text.noRounding}</option>
              <option value="nearest_15_minutes">{text.quarterHour}</option>
              <option value="nearest_30_minutes">{text.halfHour}</option>
            </select>
            <ChevronDown size={18} strokeWidth={2.1} />
          </span>
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>{text.hint}</span>
        </div>

        <button className="primary-action" disabled={isLoading} type="submit">
          {isLoading ? <Loader2 className="spin" size={18} /> : <BriefcaseBusiness size={18} />}
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
            <strong>{result.result.formattedTotal}</strong>
            <span>{formatHours(result.result.totalHours)} {text.decimalHours}</span>
          </div>

          <div className="result-breakdown">
            <div className="result-item">
              <span>{text.totalHours}</span>
              <strong>{formatHours(result.result.totalHours)}</strong>
            </div>
            <div className="result-item">
              <span>{text.totalMinutes}</span>
              <strong>{result.result.totalMinutes}</strong>
            </div>
            <div className="result-item">
              <span>{text.calculatedRanges}</span>
              <strong>{result.result.entryCount}</strong>
            </div>
            <div className="result-item">
              <span>{text.includedDays}</span>
              <strong>{result.result.dayCount}</strong>
            </div>
            <div className="result-item result-item--strong">
              <span>{text.usedRounding}</span>
              <strong>{getRoundingLabel(result.input.rounding, locale)}</strong>
            </div>
          </div>

          <div className="rules-note">
            <CheckCircle2 size={18} strokeWidth={2.1} />
            <p>{text.rulesNote(result.result.entryCount)}</p>
          </div>

          <div className="entry-summary">
            {result.result.entries.map((entry, index) => (
              <div className="entry-summary__item" key={`${entry.date}-${entry.startTime}-${entry.endTime}`}>
                <span>{text.range} {index + 1}</span>
                <strong>{entry.formattedWorkedTime}</strong>
                <small>{entry.rawMinutes} {text.minutesCalculated}</small>
              </div>
            ))}
          </div>

          <p className="disclaimer">{text.disclaimer}</p>
        </aside>
      ) : (
        <aside className="result-panel result-panel--empty" ref={resultRef}>
          <div className="result-empty">
            <Clock3 size={34} strokeWidth={2.1} />
            <h2>{text.emptyTitle}</h2>
            <p>{text.emptyDescription}</p>
          </div>
        </aside>
      )}
    </div>
  );
}
