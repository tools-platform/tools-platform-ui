import { CalendarDays, CheckCircle2, Clock3, Info, Loader2 } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { DateField } from "../DateField";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";
import { calculateExactAge, type ExactAgeResponse } from "../../services/timeApi";
import { exactAgeCalculatorCopy as copy } from "../../locales/calculatorCopy";

type ExactAgeData = ExactAgeResponse["data"];

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function todayDate() {
  return toDateKey(new Date());
}

function oneYearAgoDate() {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  return toDateKey(date);
}

export function ExactAgeCalculator() {
  const { locale } = useLocale();
  const text = copy[locale];
  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(locale === "es" ? "es-CO" : "en-US", { maximumFractionDigits: 0 }),
    [locale]
  );

  const [birthDate, setBirthDate] = useState(oneYearAgoDate());
  const [referenceDate, setReferenceDate] = useState(todayDate());
  const [result, setResult] = useState<ExactAgeData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  function formatNumber(value: number) {
    return numberFormatter.format(value);
  }

  function formatDate(value: string) {
    const [year, month, day] = value.split("-").map(Number);

    if (!year || !month || !day) {
      return value;
    }

    return new Intl.DateTimeFormat(locale === "es" ? "es-CO" : "en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(new Date(year, month - 1, day));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!birthDate || !referenceDate) {
      setError(text.selectDates);
      return;
    }

    if (birthDate > referenceDate) {
      setError(text.birthDateAfterReference);
      return;
    }

    setIsLoading(true);

    try {
      const data = await calculateExactAge({ birthDate, referenceDate });
      setResult(data);
      scrollToResultOnMobile();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : text.selectDates);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setBirthDate(oneYearAgoDate());
    setReferenceDate(todayDate());
    setResult(null);
    setError("");
  }

  const rulesNote = result
    ? text.rulesNote
        .replace("{birthDate}", formatDate(result.input.birthDate))
        .replace("{referenceDate}", formatDate(result.input.referenceDate))
        .replace("{birthdayToday}", result.result.isBirthdayToday ? text.birthdayToday : "")
    : "";

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

        <div className="form-grid">
          <label className="field">
            <span>
              {text.birthDate} <span className="required-mark">*</span>
            </span>
            <DateField ariaLabel={text.birthDateAria} onChange={setBirthDate} value={birthDate} />
          </label>

          <label className="field">
            <span className="field-label">
              {text.referenceDate} <span className="required-mark">*</span>
              <span className="info-tooltip">
                <Info size={15} strokeWidth={2.1} />
                <span role="tooltip">{text.referenceDateHelp}</span>
              </span>
            </span>
            <DateField ariaLabel={text.referenceDateAria} onChange={setReferenceDate} value={referenceDate} />
          </label>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="calculator-hint">
          <Info size={16} strokeWidth={2.1} />
          <span>{text.hint}</span>
        </div>

        <button className="primary-action" disabled={isLoading} type="submit">
          {isLoading ? <Loader2 className="spin" size={18} /> : <CalendarDays size={18} />}
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
            <strong>
              {result.result.years} {text.years}, {result.result.months} {text.months} {text.and} {result.result.days} {text.days}
            </strong>
            <span>{formatNumber(result.result.totalDays)} {text.livedDays}</span>
          </div>

          <div className="result-breakdown">
            <div className="result-item">
              <span>{text.years}</span>
              <strong>{result.result.years}</strong>
            </div>
            <div className="result-item">
              <span>{text.additionalMonths}</span>
              <strong>{result.result.months}</strong>
            </div>
            <div className="result-item">
              <span>{text.additionalDays}</span>
              <strong>{result.result.days}</strong>
            </div>
            <div className="result-item">
              <span>{text.totalMonths}</span>
              <strong>{formatNumber(result.result.totalMonths)}</strong>
            </div>
            <div className="result-item result-item--strong">
              <span>{text.nextBirthday}</span>
              <strong>{formatDate(result.result.nextBirthdayDate)}</strong>
            </div>
            <div className="result-item result-item--strong">
              <span>{text.daysUntilBirthday}</span>
              <strong>{result.result.daysUntilNextBirthday}</strong>
            </div>
          </div>

          <div className="rules-note">
            <CheckCircle2 size={18} strokeWidth={2.1} />
            <p>{rulesNote}</p>
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
