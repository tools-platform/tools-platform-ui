import { BriefcaseBusiness, CheckCircle2, ChevronDown, Clock3, Info, Loader2, Plus, Trash2 } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { DateField } from "../DateField";
import {
  calculateWorkedHours,
  type WorkedHoursResponse,
  type WorkedHoursRounding
} from "../../services/workApi";

type WorkedHoursData = WorkedHoursResponse["data"];

type WorkEntryForm = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
};

const numberFormatter = new Intl.NumberFormat("es-CO", {
  maximumFractionDigits: 2
});

function todayDate() {
  return new Date().toISOString().slice(0, 10);
}

const initialEntries: WorkEntryForm[] = [
  {
    id: "entry-1",
    date: todayDate(),
    startTime: "08:00",
    endTime: "12:00"
  }
];

function getRoundingLabel(rounding: WorkedHoursRounding) {
  const labels: Record<WorkedHoursRounding, string> = {
    none: "Sin redondeo",
    nearest_15_minutes: "Al cuarto de hora",
    nearest_30_minutes: "A media hora"
  };

  return labels[rounding];
}

function formatHours(value: number) {
  return numberFormatter.format(value);
}

function getEntrySummary(entry: WorkEntryForm) {
  if (!entry.date || !entry.startTime || !entry.endTime) {
    return "Pendiente por completar";
  }

  return `${entry.date} · ${entry.startTime} - ${entry.endTime}`;
}

export function WorkedHoursCalculator() {
  const [entries, setEntries] = useState<WorkEntryForm[]>(initialEntries);
  const [expandedEntryIds, setExpandedEntryIds] = useState<string[]>([initialEntries[0].id]);
  const [rounding, setRounding] = useState<WorkedHoursRounding>("none");
  const [result, setResult] = useState<WorkedHoursData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function updateEntry<Field extends keyof Omit<WorkEntryForm, "id">>(
    id: string,
    field: Field,
    value: WorkEntryForm[Field]
  ) {
    setEntries((currentEntries) =>
      currentEntries.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry))
    );
  }

  function addEntry() {
    const newEntryId = `entry-${Date.now()}`;

    setEntries((currentEntries) => [
      ...currentEntries,
      {
        id: newEntryId,
        date: todayDate(),
        startTime: "08:00",
        endTime: "17:00"
      }
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
      setError("Agrega al menos un rango de trabajo.");
      return;
    }

    const payloadEntries = entries.map((entry) => ({
      date: entry.date,
      startTime: entry.startTime,
      endTime: entry.endTime
    }));

    if (payloadEntries.some((entry) => !entry.date || !entry.startTime || !entry.endTime)) {
      setError("Completa la fecha y las horas de cada rango.");
      return;
    }

    if (payloadEntries.some((entry) => entry.endTime <= entry.startTime)) {
      setError("La hora de finalización debe ser mayor que la hora de inicio en cada rango.");
      return;
    }

    setIsLoading(true);

    try {
      const data = await calculateWorkedHours({
        entries: payloadEntries,
        rounding
      });
      setResult(data);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "No se pudieron calcular las horas.");
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
            <p className="section__kicker">Calculadora</p>
            <h2>Rangos trabajados</h2>
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
                    <strong>Rango {index + 1}</strong>
                    <small>{getEntrySummary(entry)}</small>
                  </span>
                  <ChevronDown size={18} strokeWidth={2.1} />
                </button>
                <div className="work-entry__actions">
                  {entries.length > 1 ? (
                    <button
                      aria-label={`Eliminar rango ${index + 1}`}
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
                  <span>
                    Día trabajado <span className="required-mark">*</span>
                  </span>
                  <DateField
                    ariaLabel={`Seleccionar día trabajado del rango ${index + 1}`}
                    onChange={(value) => updateEntry(entry.id, "date", value)}
                    value={entry.date}
                  />
                </label>

                <div className="form-grid">
                  <label className="field">
                    <span>
                      Hora de inicio <span className="required-mark">*</span>
                    </span>
                    <div className="time-field">
                      <Clock3 size={17} strokeWidth={2.1} />
                      <input
                        onChange={(event) => updateEntry(entry.id, "startTime", event.target.value)}
                        type="time"
                        value={entry.startTime}
                      />
                    </div>
                  </label>

                  <label className="field">
                    <span>
                      Hora de finalización <span className="required-mark">*</span>
                    </span>
                    <div className="time-field">
                      <Clock3 size={17} strokeWidth={2.1} />
                      <input
                        onChange={(event) => updateEntry(entry.id, "endTime", event.target.value)}
                        type="time"
                        value={entry.endTime}
                      />
                    </div>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="secondary-action secondary-action--compact" onClick={addEntry} type="button">
          <Plus size={17} strokeWidth={2.1} />
          Agregar rango
        </button>

        <label className="field field--spaced">
          <span className="field-label">
            Redondeo
            <span className="info-tooltip">
              <Info size={15} strokeWidth={2.1} />
              <span role="tooltip">
                Sirve si cobras o reportas tiempo por bloques. Si no necesitas ajustar los minutos, deja
                sin redondeo.
              </span>
            </span>
          </span>
          <span className="select-control">
            <select
              className="plain-select"
              onChange={(event) => setRounding(event.target.value as WorkedHoursRounding)}
              value={rounding}
            >
              <option value="none">Sin redondeo</option>
              <option value="nearest_15_minutes">Al cuarto de hora</option>
              <option value="nearest_30_minutes">A media hora</option>
            </select>
            <ChevronDown size={18} strokeWidth={2.1} />
          </span>
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>Puedes agregar una o varias jornadas para sumar el tiempo trabajado por día y rango de horas.</span>
        </div>

        <button className="primary-action" disabled={isLoading} type="submit">
          {isLoading ? <Loader2 className="spin" size={18} /> : <BriefcaseBusiness size={18} />}
          Calcular horas
        </button>

        <button className="secondary-action" onClick={handleReset} type="button">
          Restablecer
        </button>
      </form>

      {result ? (
        <aside className="result-panel">
          <div className="result-panel__hero">
            <p>Total trabajado</p>
            <strong>{result.result.formattedTotal}</strong>
            <span>{formatHours(result.result.totalHours)} horas en decimal</span>
          </div>

          <div className="result-breakdown">
            <div className="result-item">
              <span>Horas totales</span>
              <strong>{formatHours(result.result.totalHours)}</strong>
            </div>
            <div className="result-item">
              <span>Minutos totales</span>
              <strong>{result.result.totalMinutes}</strong>
            </div>
            <div className="result-item">
              <span>Rangos calculados</span>
              <strong>{result.result.entryCount}</strong>
            </div>
            <div className="result-item">
              <span>Días incluidos</span>
              <strong>{result.result.dayCount}</strong>
            </div>
            <div className="result-item result-item--strong">
              <span>Redondeo usado</span>
              <strong>{getRoundingLabel(result.input.rounding)}</strong>
            </div>
          </div>

          <div className="rules-note">
            <CheckCircle2 size={18} strokeWidth={2.1} />
            <p>
              Se calcularon {result.result.entryCount} rangos. El total en decimal te sirve para cobrar
              o registrar tiempo en plataformas de trabajo.
            </p>
          </div>

          <div className="entry-summary">
            {result.result.entries.map((entry, index) => (
              <div className="entry-summary__item" key={`${entry.date}-${entry.startTime}-${entry.endTime}`}>
                <span>Rango {index + 1}</span>
                <strong>{entry.formattedWorkedTime}</strong>
                <small>{entry.rawMinutes} min calculados</small>
              </div>
            ))}
          </div>

          <p className="disclaimer">
            Resultado estimado. No calcula horas extra, recargos nocturnos, festivos, políticas de
            nómina ni reglas laborales específicas.
          </p>
        </aside>
      ) : (
        <aside className="result-panel result-panel--empty">
          <div className="result-empty">
            <Clock3 size={34} strokeWidth={2.1} />
            <h2>Resultado de horas</h2>
            <p>Agrega uno o varios rangos para ver el total trabajado.</p>
          </div>
        </aside>
      )}
    </div>
  );
}
