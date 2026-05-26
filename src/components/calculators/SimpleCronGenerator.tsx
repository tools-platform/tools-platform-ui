import { CalendarClock, CheckCircle2, ChevronDown, Clipboard, Info, RotateCcw } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale, type Locale } from "../../i18n";
import { simpleCronGeneratorCopy as copy } from "../../locales/calculatorCopy";

type CronMode = "minutes" | "hourly" | "daily" | "weekly" | "monthly" | "custom";
type CronOperation = "generate" | "read";
type CronResult = {
  expression: string;
  explanation: string;
  fields?: CronFieldDetail[];
  formatLabel?: string;
  mode: CronMode;
};

type CronFieldDetail = {
  label: string;
  meaning: string;
  value: string;
};

type ParsedCron = {
  expression: string;
  fields: CronFieldDetail[];
  formatLabel: string;
  parts: {
    second?: string;
    minute?: string;
    hour?: string;
    day?: string;
    month?: string;
    weekday?: string;
    year?: string;
  };
};

const weekdays = {
  es: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  hi: ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"]
} as const;

function pad(value: string) {
  return String(Math.max(0, Math.min(59, Number(value) || 0)));
}

function buildCron(mode: CronMode, options: { everyMinutes: string; minute: string; hour: string; day: string; weekday: string }, locale: Locale): CronResult {
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
      explanation: locale === "es" ? `Se ejecuta cada ${everyMinutes} minutos.` : locale === "hi" ? `हर ${everyMinutes} मिनट में चलता है.` : `Runs every ${everyMinutes} minutes.`
    };
  }

  if (mode === "hourly") {
    return {
      mode,
      expression: `${minute} * * * *`,
      explanation: locale === "es" ? `Se ejecuta en el minuto ${minute} de cada hora.` : locale === "hi" ? `हर घंटे के ${minute}वें मिनट पर चलता है.` : `Runs at minute ${minute} of every hour.`
    };
  }

  if (mode === "daily") {
    return {
      mode,
      expression: `${minute} ${hour} * * *`,
      explanation: locale === "es" ? `Se ejecuta todos los días a las ${hour}:${minute.padStart(2, "0")}.` : locale === "hi" ? `हर दिन ${hour}:${minute.padStart(2, "0")} पर चलता है.` : `Runs every day at ${hour}:${minute.padStart(2, "0")}.`
    };
  }

  if (mode === "weekly") {
    return {
      mode,
      expression: `${minute} ${hour} * * ${weekday}`,
      explanation: locale === "es" ? `Se ejecuta cada ${weekdays.es[Number(weekday)]} a las ${hour}:${minute.padStart(2, "0")}.` : locale === "hi" ? `हर ${weekdays.hi[Number(weekday)]} को ${hour}:${minute.padStart(2, "0")} पर चलता है.` : `Runs every ${weekdays.en[Number(weekday)]} at ${hour}:${minute.padStart(2, "0")}.`
    };
  }

  return {
    mode,
    expression: `${minute} ${hour} ${day} * *`,
    explanation: locale === "es" ? `Se ejecuta el día ${day} de cada mes a las ${hour}:${minute.padStart(2, "0")}.` : locale === "hi" ? `हर महीने के दिन ${day} को ${hour}:${minute.padStart(2, "0")} पर चलता है.` : `Runs on day ${day} of every month at ${hour}:${minute.padStart(2, "0")}.`
  };
}

function getFormatLabel(partsCount: number, locale: Locale) {
  if (partsCount === 5) return copy[locale].fiveFields;
  if (partsCount === 6) return copy[locale].sixFields;
  if (partsCount === 7) return copy[locale].sevenFields;
  return copy[locale].macroFormat;
}

function isBroadValue(value?: string) {
  return !value || value === "*" || value === "?" || value === "1/1" || value === "*/1" || value === "0/1";
}

function isNumber(value?: string) {
  return typeof value === "string" && /^\d+$/.test(value);
}

function getStepValue(value?: string) {
  return value?.match(/^(?:\*|0)\/(\d+)$/)?.[1] ?? "";
}

function isCronFieldToken(value: string) {
  return /^[a-z0-9*?,/#LW.-]+$/i.test(value);
}

function parseCronExpression(expression: string, locale: Locale): ParsedCron | null {
  const normalizedExpression = expression.trim().replace(/\s+/g, " ");
  if (!normalizedExpression) return null;

  if (/^@[a-z]+$/i.test(normalizedExpression)) {
    return {
      expression: normalizedExpression,
      fields: [{ label: copy[locale].mode, value: normalizedExpression, meaning: describeCronMacro(normalizedExpression, locale) }],
      formatLabel: getFormatLabel(1, locale),
      parts: {}
    };
  }

  const parts = normalizedExpression.split(" ");
  if (![5, 6, 7].includes(parts.length) || parts.some((part) => !isCronFieldToken(part))) return null;

  const labels = copy[locale];
  const keys =
    parts.length === 5
      ? ["minute", "hour", "day", "month", "weekday"]
      : parts.length === 6
        ? ["second", "minute", "hour", "day", "month", "weekday"]
        : ["second", "minute", "hour", "day", "month", "weekday", "year"];
  const partsByKey = Object.fromEntries(keys.map((key, index) => [key, parts[index]])) as ParsedCron["parts"];
  const fieldLabels: Record<string, string> = {
    second: labels.second,
    minute: labels.minute,
    hour: labels.hour,
    day: labels.day,
    month: labels.month,
    weekday: labels.weekday,
    year: labels.year
  };

  return {
    expression: normalizedExpression,
    fields: keys.map((key) => ({
      label: fieldLabels[key],
      value: partsByKey[key as keyof ParsedCron["parts"]] ?? "",
      meaning: describeCronField(key, partsByKey[key as keyof ParsedCron["parts"]] ?? "", locale)
    })),
    formatLabel: getFormatLabel(parts.length, locale),
    parts: partsByKey
  };
}

function describeCronMacro(value: string, locale: Locale) {
  const lower = value.toLowerCase();
  if (locale === "es") {
    const macros: Record<string, string> = {
      "@yearly": "Una vez al año",
      "@annually": "Una vez al año",
      "@monthly": "Una vez al mes",
      "@weekly": "Una vez por semana",
      "@daily": "Una vez al día",
      "@midnight": "Una vez al día",
      "@hourly": "Una vez por hora",
      "@reboot": "Al iniciar el sistema"
    };
    return macros[lower] ?? "Macro cron";
  }

  if (locale === "hi") {
    const macros: Record<string, string> = {
      "@yearly": "साल में एक बार",
      "@annually": "साल में एक बार",
      "@monthly": "महीने में एक बार",
      "@weekly": "सप्ताह में एक बार",
      "@daily": "दिन में एक बार",
      "@midnight": "दिन में एक बार",
      "@hourly": "हर घंटे एक बार",
      "@reboot": "सिस्टम शुरू होने पर"
    };
    return macros[lower] ?? "क्रॉन मैक्रो";
  }

  const macros: Record<string, string> = {
    "@yearly": "Once a year",
    "@annually": "Once a year",
    "@monthly": "Once a month",
    "@weekly": "Once a week",
    "@daily": "Once a day",
    "@midnight": "Once a day",
    "@hourly": "Once an hour",
    "@reboot": "When the system starts"
  };
  return macros[lower] ?? "Cron macro";
}

function describeCronField(key: string, value: string, locale: Locale) {
  const every = locale === "es" ? "cualquier valor" : locale === "hi" ? "कोई भी मान" : "any value";
  const noSpecific = locale === "es" ? "sin valor específico" : locale === "hi" ? "कोई विशेष मान नहीं" : "no specific value";
  if (value === "*") return every;
  if (value === "?") return noSpecific;

  const step = value.match(/^(.*)\/(\d+)$/);
  if (step) {
    const amount = step[2];
    const unit =
      key === "second"
        ? locale === "es" ? "segundos" : locale === "hi" ? "सेकंड" : "seconds"
        : key === "minute"
          ? locale === "es" ? "minutos" : locale === "hi" ? "मिनट" : "minutes"
          : key === "hour"
            ? locale === "es" ? "horas" : locale === "hi" ? "घंटे" : "hours"
            : key === "day"
              ? locale === "es" ? "días" : locale === "hi" ? "दिन" : "days"
              : key === "month"
                ? locale === "es" ? "meses" : locale === "hi" ? "महीने" : "months"
                : locale === "es" ? "valores" : locale === "hi" ? "मान" : "values";
    return locale === "es" ? `cada ${amount} ${unit}` : locale === "hi" ? `हर ${amount} ${unit}` : `every ${amount} ${unit}`;
  }

  if (value.includes(",")) return locale === "es" ? `valores ${value}` : locale === "hi" ? `${value} मान` : `values ${value}`;
  if (value.includes("-")) return locale === "es" ? `rango ${value}` : locale === "hi" ? `${value} रेंज` : `range ${value}`;
  return value;
}

function explainCron(expression: string, locale: Locale): CronResult | null {
  const parsed = parseCronExpression(expression, locale);
  if (!parsed) return null;
  const { day, hour, minute, month, weekday, year } = parsed.parts;
  const time = isNumber(hour) && isNumber(minute) ? formatTime(hour ?? "", minute ?? "") : "";
  const minuteStep = getStepValue(minute);
  const broadSchedule = isBroadValue(hour) && isBroadValue(day) && isBroadValue(month) && isBroadValue(weekday) && isBroadValue(year);

  if (minuteStep && broadSchedule) {
    return {
      mode: "minutes",
      expression: parsed.expression,
      explanation: locale === "es" ? `Se ejecuta cada ${minuteStep} minutos.` : locale === "hi" ? `हर ${minuteStep} मिनट में चलता है.` : `Runs every ${minuteStep} minutes.`,
      fields: parsed.fields,
      formatLabel: parsed.formatLabel
    };
  }

  if (isNumber(minute) && isBroadValue(hour) && isBroadValue(day) && isBroadValue(month) && isBroadValue(weekday) && isBroadValue(year)) {
    return {
      mode: "hourly",
      expression: parsed.expression,
      explanation: locale === "es" ? `Se ejecuta en el minuto ${minute} de cada hora.` : locale === "hi" ? `हर घंटे के ${minute}वें मिनट पर चलता है.` : `Runs at minute ${minute} of every hour.`,
      fields: parsed.fields,
      formatLabel: parsed.formatLabel
    };
  }

  if (isNumber(minute) && isNumber(hour) && isBroadValue(day) && isBroadValue(month) && isBroadValue(weekday) && isBroadValue(year)) {
    return {
      mode: "daily",
      expression: parsed.expression,
      explanation: locale === "es" ? `Se ejecuta todos los días a las ${time}.` : locale === "hi" ? `हर दिन ${time} पर चलता है.` : `Runs every day at ${time}.`,
      fields: parsed.fields,
      formatLabel: parsed.formatLabel
    };
  }

  if (isNumber(minute) && isNumber(hour) && isBroadValue(day) && isBroadValue(month) && isNumber(weekday) && isBroadValue(year)) {
    return {
      mode: "weekly",
      expression: parsed.expression,
      explanation:
        locale === "es"
          ? `Se ejecuta cada ${weekdays.es[Number(weekday)] ?? `día ${weekday}`} a las ${time}.`
          : locale === "hi"
            ? `हर ${weekdays.hi[Number(weekday)] ?? `दिन ${weekday}`} को ${time} पर चलता है.`
          : `Runs every ${weekdays.en[Number(weekday)] ?? `weekday ${weekday}`} at ${time}.`,
      fields: parsed.fields,
      formatLabel: parsed.formatLabel
    };
  }

  if (isNumber(minute) && isNumber(hour) && isNumber(day) && isBroadValue(month) && isBroadValue(weekday) && isBroadValue(year)) {
    return {
      mode: "monthly",
      expression: parsed.expression,
      explanation: locale === "es" ? `Se ejecuta el día ${day} de cada mes a las ${time}.` : locale === "hi" ? `हर महीने के दिन ${day} को ${time} पर चलता है.` : `Runs on day ${day} of every month at ${time}.`,
      fields: parsed.fields,
      formatLabel: parsed.formatLabel
    };
  }

  return {
    mode: "custom",
    expression: parsed.expression,
    explanation: locale === "es" ? "Cron aceptado. Revisa los campos antes de usarlo en producción." : locale === "hi" ? "क्रॉन स्वीकार किया गया. उपयोग से पहले फ़ील्ड जांचें." : "Cron accepted. Review the fields before using it in production.",
    fields: parsed.fields,
    formatLabel: parsed.formatLabel
  };
}

function formatTime(hour: string, minute: string) {
  return `${hour}:${minute.padStart(2, "0")}`;
}

function capitalizeDetail(value: string, locale: Locale) {
  const localeCode = locale === "es" ? "es-CO" : locale === "hi" ? "hi-IN" : "en-US";
  return value.charAt(0).toLocaleUpperCase(localeCode) + value.slice(1);
}

function getCronDetails(result: CronResult, text: (typeof copy)[Locale], locale: Locale) {
  const parts = result.expression.split(/\s+/);
  const [minute, hour, day, month, weekday] = parts;
  const details: Array<{ label: string; value: string }> = [
    { label: text.mode, value: text.modes[result.mode] },
    { label: text.format, value: result.formatLabel ?? text.fiveFields }
  ];

  if (result.fields && (parts.length !== 5 || result.expression.startsWith("@"))) {
    result.fields.forEach((field) => {
      details.push({ label: field.label, value: field.value });
    });
  } else if (result.mode === "minutes") {
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
                  <small>{result.formatLabel ?? text.fiveFields}</small>
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
