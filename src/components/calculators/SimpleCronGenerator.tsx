import { CalendarClock, CheckCircle2, ChevronDown, Clipboard, Info, RotateCcw } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";

type CronMode = "minutes" | "hourly" | "daily" | "weekly" | "monthly" | "custom";
type CronOperation = "generate" | "read";
type CronResult = {
  expression: string;
  explanation: string;
  mode: CronMode;
};

const weekdays = {
  es: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
} as const;

const copy = {
  es: {
    kicker: "Desarrollo",
    title: "Cron simple",
    operation: "Operación",
    generate: "Generar",
    read: "Leer cron",
    mode: "Tipo",
    modes: {
      minutes: "Cada X minutos",
      hourly: "Cada hora",
      daily: "Diario",
      weekly: "Semanal",
      monthly: "Mensual",
      custom: "Cron existente"
    },
    everyMinutes: "Cada cuántos minutos",
    minute: "Minuto",
    hour: "Hora",
    hourHelp: "Usa formato de 24 horas: 9 para 9 a. m., 18 para 6 p. m., 20 para 8 p. m.",
    day: "Día del mes",
    weekday: "Día",
    expression: "Expresión cron",
    customPlaceholder: "Ej: 0 9 * * 1",
    emptyError: "Completa los campos para generar o explicar el cron.",
    cronError: "Escribe una expresión cron de 5 partes.",
    hint: "Usa formato cron clásico de 5 partes: minuto hora día mes día-semana.",
    submit: "Generar cron",
    explainSubmit: "Leer cron",
    reset: "Restablecer",
    resultTitle: "Frecuencia configurada",
    cronExpression: "Expresión cron",
    copy: "Copiar cron",
    copied: "Cron copiado.",
    copyFailed: "No se pudo copiar automáticamente.",
    minuteUnit: "min",
    at: "a las",
    everyHour: "cada hora",
    everyDay: "todos los días",
    everyMonth: "cada mes",
    month: "Mes",
    details: "Detalles",
    format: "Formato",
    fiveFields: "5 campos",
    rulesNote: "Este generador usa cron estándar de 5 campos. Algunos servidores usan zona horaria del sistema.",
    disclaimer: "Revisa la zona horaria y el formato exacto que pide tu proveedor antes de usarlo en producción.",
    emptyTitle: "Tu cron aparecerá aquí",
    emptyDescription: "Elige una frecuencia sencilla o pega una expresión para explicarla."
  },
  en: {
    kicker: "Development",
    title: "Simple cron",
    operation: "Operation",
    generate: "Generate",
    read: "Read cron",
    mode: "Type",
    modes: {
      minutes: "Every X minutes",
      hourly: "Every hour",
      daily: "Daily",
      weekly: "Weekly",
      monthly: "Monthly",
      custom: "Existing cron"
    },
    everyMinutes: "Every how many minutes",
    minute: "Minute",
    hour: "Hour",
    hourHelp: "Use 24-hour time: 9 for 9 AM, 18 for 6 PM, 20 for 8 PM.",
    day: "Day of month",
    weekday: "Day",
    expression: "Cron expression",
    customPlaceholder: "Ex: 0 9 * * 1",
    emptyError: "Complete the fields to generate or explain the cron.",
    cronError: "Enter a 5-part cron expression.",
    hint: "Uses classic 5-part cron format: minute hour day month weekday.",
    submit: "Generate cron",
    explainSubmit: "Read cron",
    reset: "Reset",
    resultTitle: "Schedule ready",
    cronExpression: "Cron expression",
    copy: "Copy cron",
    copied: "Cron copied.",
    copyFailed: "We couldn't copy it automatically.",
    minuteUnit: "min",
    at: "at",
    everyHour: "every hour",
    everyDay: "every day",
    everyMonth: "every month",
    month: "Month",
    details: "Details",
    format: "Format",
    fiveFields: "5 fields",
    rulesNote: "This generator uses standard 5-field cron. Some servers use the system timezone.",
    disclaimer: "Review the timezone and exact format required by your provider before using it in production.",
    emptyTitle: "Your cron will appear here",
    emptyDescription: "Choose a simple frequency or paste an expression to explain it."
  }
} as const;

function pad(value: string) {
  return String(Math.max(0, Math.min(59, Number(value) || 0)));
}

function buildCron(mode: CronMode, options: { everyMinutes: string; minute: string; hour: string; day: string; weekday: string }, locale: "es" | "en"): CronResult {
  const hour = String(Math.max(0, Math.min(23, Number(options.hour) || 0)));
  const minute = pad(options.minute);
  const day = String(Math.max(1, Math.min(31, Number(options.day) || 1)));
  const weekday = String(Math.max(0, Math.min(6, Number(options.weekday) || 0)));
  const everyMinutes = String(Math.max(1, Math.min(59, Number(options.everyMinutes) || 5)));
  const text = copy[locale];

  if (mode === "minutes") {
    return {
      mode,
      expression: `*/${everyMinutes} * * * *`,
      explanation: locale === "es" ? `Se ejecuta cada ${everyMinutes} minutos.` : `Runs every ${everyMinutes} minutes.`
    };
  }

  if (mode === "hourly") {
    return {
      mode,
      expression: `${minute} * * * *`,
      explanation: locale === "es" ? `Se ejecuta en el minuto ${minute} de cada hora.` : `Runs at minute ${minute} of every hour.`
    };
  }

  if (mode === "daily") {
    return {
      mode,
      expression: `${minute} ${hour} * * *`,
      explanation: locale === "es" ? `Se ejecuta todos los días a las ${hour}:${minute.padStart(2, "0")}.` : `Runs every day at ${hour}:${minute.padStart(2, "0")}.`
    };
  }

  if (mode === "weekly") {
    return {
      mode,
      expression: `${minute} ${hour} * * ${weekday}`,
      explanation: locale === "es" ? `Se ejecuta cada ${weekdays.es[Number(weekday)]} a las ${hour}:${minute.padStart(2, "0")}.` : `Runs every ${weekdays.en[Number(weekday)]} at ${hour}:${minute.padStart(2, "0")}.`
    };
  }

  return {
    mode,
    expression: `${minute} ${hour} ${day} * *`,
    explanation: locale === "es" ? `Se ejecuta el día ${day} de cada mes a las ${hour}:${minute.padStart(2, "0")}.` : `Runs on day ${day} of every month at ${hour}:${minute.padStart(2, "0")}.`
  };
}

function explainCron(expression: string, locale: "es" | "en"): CronResult | null {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) return null;
  const [minute, hour, day, month, weekday] = parts;
  const normalizedExpression = parts.join(" ");
  const isNumber = (value: string) => /^\d+$/.test(value);
  const time = isNumber(hour) && isNumber(minute) ? formatTime(hour, minute) : "";

  if (/^\*\/\d+$/.test(minute) && hour === "*" && day === "*" && month === "*" && weekday === "*") {
    const everyMinutes = minute.slice(2);
    return {
      mode: "minutes",
      expression: normalizedExpression,
      explanation: locale === "es" ? `Se ejecuta cada ${everyMinutes} minutos.` : `Runs every ${everyMinutes} minutes.`
    };
  }

  if (isNumber(minute) && hour === "*" && day === "*" && month === "*" && weekday === "*") {
    return {
      mode: "hourly",
      expression: normalizedExpression,
      explanation: locale === "es" ? `Se ejecuta en el minuto ${minute} de cada hora.` : `Runs at minute ${minute} of every hour.`
    };
  }

  if (isNumber(minute) && isNumber(hour) && day === "*" && month === "*" && weekday === "*") {
    return {
      mode: "daily",
      expression: normalizedExpression,
      explanation: locale === "es" ? `Se ejecuta todos los días a las ${time}.` : `Runs every day at ${time}.`
    };
  }

  if (isNumber(minute) && isNumber(hour) && day === "*" && month === "*" && isNumber(weekday)) {
    return {
      mode: "weekly",
      expression: normalizedExpression,
      explanation:
        locale === "es"
          ? `Se ejecuta cada ${weekdays.es[Number(weekday)] ?? `día ${weekday}`} a las ${time}.`
          : `Runs every ${weekdays.en[Number(weekday)] ?? `weekday ${weekday}`} at ${time}.`
    };
  }

  if (isNumber(minute) && isNumber(hour) && isNumber(day) && month === "*" && weekday === "*") {
    return {
      mode: "monthly",
      expression: normalizedExpression,
      explanation: locale === "es" ? `Se ejecuta el día ${day} de cada mes a las ${time}.` : `Runs on day ${day} of every month at ${time}.`
    };
  }

  return {
    mode: "custom",
    expression: normalizedExpression,
    explanation: locale === "es" ? "Cron personalizado de 5 campos. Revisa los detalles antes de usarlo." : "Custom 5-field cron. Review the details before using it."
  };
}

function formatTime(hour: string, minute: string) {
  return `${hour}:${minute.padStart(2, "0")}`;
}

function capitalizeDetail(value: string, locale: "es" | "en") {
  return value.charAt(0).toLocaleUpperCase(locale === "es" ? "es-CO" : "en-US") + value.slice(1);
}

function getCronDetails(result: CronResult, text: typeof copy.es | typeof copy.en, locale: "es" | "en") {
  const [minute, hour, day, month, weekday] = result.expression.split(/\s+/);
  const details: Array<{ label: string; value: string }> = [
    { label: text.mode, value: text.modes[result.mode] },
    { label: text.format, value: text.fiveFields }
  ];

  if (result.mode === "minutes") {
    details.push({ label: text.everyMinutes, value: `${minute.replace("*/", "")} ${text.minuteUnit}` });
  } else if (result.mode === "hourly") {
    details.push({ label: text.minute, value: minute });
    details.push({ label: text.hour, value: capitalizeDetail(text.everyHour, locale) });
  } else if (result.mode === "daily") {
    details.push({ label: text.hour, value: formatTime(hour, minute) });
    details.push({ label: text.weekday, value: capitalizeDetail(text.everyDay, locale) });
  } else if (result.mode === "weekly") {
    details.push({ label: text.weekday, value: weekdays[locale][Number(weekday)] ?? weekday });
    details.push({ label: text.hour, value: formatTime(hour, minute) });
  } else if (result.mode === "monthly") {
    details.push({ label: text.day, value: day });
    details.push({ label: text.hour, value: formatTime(hour, minute) });
  } else if (result.mode === "custom") {
    details.push({ label: text.minute, value: minute });
    details.push({ label: text.hour, value: hour });
    details.push({ label: text.day, value: day });
    details.push({ label: text.month, value: month });
    details.push({ label: text.weekday, value: weekday });
  }

  return details;
}

export function SimpleCronGenerator() {
  const { locale } = useLocale();
  const text = copy[locale];
  const [operation, setOperation] = useState<CronOperation>("generate");
  const [mode, setMode] = useState<CronMode>("daily");
  const [everyMinutes, setEveryMinutes] = useState("15");
  const [minute, setMinute] = useState("0");
  const [hour, setHour] = useState("9");
  const [day, setDay] = useState("1");
  const [weekday, setWeekday] = useState("1");
  const [customExpression, setCustomExpression] = useState("");
  const [result, setResult] = useState<CronResult | null>(null);
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();
  const weekdayOptions = useMemo(() => weekdays[locale].map((label, index) => ({ label, value: String(index) })), [locale]);
  const resultDetails = result ? getCronDetails(result, text, locale) : [];

  useEffect(() => {
    if (!copyStatus) return;
    const timer = window.setTimeout(() => setCopyStatus(""), 2400);
    return () => window.clearTimeout(timer);
  }, [copyStatus]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setCopyStatus("");

    if (operation === "read") {
      const explained = explainCron(customExpression, locale);
      if (!explained) {
        setResult(null);
        setError(text.cronError);
        return;
      }
      setResult(explained);
      scrollToResultOnMobile();
      return;
    }

    setResult(buildCron(mode, { everyMinutes, minute, hour, day, weekday }, locale));
    scrollToResultOnMobile();
  }

  function handleReset() {
    setOperation("generate");
    setMode("daily");
    setEveryMinutes("15");
    setMinute("0");
    setHour("9");
    setDay("1");
    setWeekday("1");
    setCustomExpression("");
    setResult(null);
    setError("");
    setCopyStatus("");
  }

  async function handleCopy() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.expression);
      setCopyStatus(text.copied);
    } catch {
      setCopyStatus(text.copyFailed);
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
            <CalendarClock size={20} strokeWidth={2.1} />
          </span>
        </div>

        <fieldset className="segmented-field">
          <legend>{text.operation}</legend>
          <div className="segmented-control">
            <button className={operation === "generate" ? "is-active" : ""} onClick={() => setOperation("generate")} type="button">
              {text.generate}
            </button>
            <button className={operation === "read" ? "is-active" : ""} onClick={() => setOperation("read")} type="button">
              {text.read}
            </button>
          </div>
        </fieldset>

        {operation === "read" ? (
          <label className="field field--spaced">
            <span>{text.expression} <span className="required-mark">*</span></span>
            <input onChange={(event) => setCustomExpression(event.target.value)} placeholder={text.customPlaceholder} type="text" value={customExpression} />
          </label>
        ) : (
          <>
            <label className="field field--spaced">
              <span>{text.mode}</span>
              <span className="select-control">
                <select className="plain-select" onChange={(event) => setMode(event.target.value as CronMode)} value={mode}>
                  <option value="minutes">{text.modes.minutes}</option>
                  <option value="hourly">{text.modes.hourly}</option>
                  <option value="daily">{text.modes.daily}</option>
                  <option value="weekly">{text.modes.weekly}</option>
                  <option value="monthly">{text.modes.monthly}</option>
                </select>
                <ChevronDown size={18} strokeWidth={2.1} />
              </span>
            </label>

            {mode === "minutes" ? (
              <label className="field field--spaced">
                <span>{text.everyMinutes}</span>
                <input max="59" min="1" onChange={(event) => setEveryMinutes(event.target.value)} type="number" value={everyMinutes} />
              </label>
            ) : null}

            {mode !== "minutes" ? (
              <div className="form-grid">
                <label className="field">
                  <span className="field-label">
                    {text.hour}
                    <span className="info-tooltip">
                      <Info size={15} strokeWidth={2.1} />
                      <span role="tooltip">{text.hourHelp}</span>
                    </span>
                  </span>
                  <input max="23" min="0" onChange={(event) => setHour(event.target.value)} type="number" value={hour} />
                </label>
                <label className="field">
                  <span>{text.minute}</span>
                  <input max="59" min="0" onChange={(event) => setMinute(event.target.value)} type="number" value={minute} />
                </label>
              </div>
            ) : null}

            {mode === "weekly" ? (
              <label className="field field--spaced">
                <span>{text.weekday}</span>
                <span className="select-control">
                  <select className="plain-select" onChange={(event) => setWeekday(event.target.value)} value={weekday}>
                    {weekdayOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={18} strokeWidth={2.1} />
                </span>
              </label>
            ) : null}

            {mode === "monthly" ? (
              <label className="field field--spaced">
                <span>{text.day}</span>
                <input max="31" min="1" onChange={(event) => setDay(event.target.value)} type="number" value={day} />
              </label>
            ) : null}
          </>
        )}

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>{text.hint}</span>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-action" type="submit">
          <CalendarClock size={18} />
          {operation === "read" ? text.explainSubmit : text.submit}
        </button>
        <button className="secondary-action" onClick={handleReset} type="button">
          <RotateCcw size={18} />
          {text.reset}
        </button>
      </form>

      <section className={result ? "result-panel" : "result-panel result-panel--empty"} ref={resultRef}>
        {result ? (
          <>
            {copyStatus ? (
              <div className={`duplicate-copy-toast${copyStatus === text.copyFailed ? " duplicate-copy-toast--error" : ""}`} role="status">
                <CheckCircle2 size={16} strokeWidth={2.1} />
                <span>{copyStatus}</span>
              </div>
            ) : null}

            <div className="result-panel__hero result-panel__hero--compact">
              <p>{text.resultTitle}</p>
              <strong>{text.modes[result.mode]}</strong>
              <span>{result.explanation}</span>
            </div>

            <div className="case-result-list">
              <div className="case-result-item">
                <div>
                  <span>{text.cronExpression}</span>
                  <small>{text.fiveFields}</small>
                  <strong>{result.expression}</strong>
                </div>
                <button onClick={handleCopy} type="button">
                  <Clipboard size={16} strokeWidth={2.1} />
                  {text.copy}
                </button>
              </div>
            </div>

            <div className="result-breakdown">
              {resultDetails.map((item, index) => (
                <ResultStat key={`${item.label}-${index}`} label={item.label} value={item.value} strong={index === 0} />
              ))}
            </div>

            <div className="rules-note">
              <CheckCircle2 size={18} strokeWidth={2.1} />
              <p>{text.rulesNote}</p>
            </div>

            <p className="disclaimer">{text.disclaimer}</p>
          </>
        ) : (
          <div className="result-empty">
            <CalendarClock size={34} strokeWidth={2.1} />
            <h2>{text.emptyTitle}</h2>
            <p>{text.emptyDescription}</p>
          </div>
        )}
      </section>
    </div>
  );
}

function ResultStat({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={strong ? "result-item result-item--strong" : "result-item"}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
