import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "../i18n";

type DateFieldProps = {
  ariaLabel: string;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
};

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function fromDateKey(value: string) {
  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function buildCalendarDays(monthDate: Date) {
  const firstDay = startOfMonth(monthDate);
  const firstWeekday = (firstDay.getDay() + 6) % 7;
  const calendarStart = new Date(firstDay);
  calendarStart.setDate(firstDay.getDate() - firstWeekday);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(calendarStart);
    date.setDate(calendarStart.getDate() + index);
    return date;
  });
}

export function DateField({ ariaLabel, onChange, placeholder, value }: DateFieldProps) {
  const { locale } = useLocale();
  const monthFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale === "en" ? "en-US" : "es-CO", {
        month: "long"
      }),
    [locale]
  );
  const displayFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale === "en" ? "en-CA" : "es-CO", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      }),
    [locale]
  );
  const weekDays = locale === "en" ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  const months = useMemo(
    () =>
      Array.from({ length: 12 }, (_, monthIndex) => ({
        label: monthFormatter.format(new Date(2026, monthIndex, 1)),
        value: monthIndex
      })),
    [monthFormatter]
  );
  const years = Array.from(
    { length: new Date().getFullYear() - 1948 },
    (_, index) => new Date().getFullYear() + 1 - index
  );
  const copy =
    locale === "en"
      ? {
          placeholder: placeholder ?? "mm/dd/yyyy",
          previousMonth: "Previous month",
          selectMonth: "Select month",
          selectYear: "Select year",
          nextMonth: "Next month",
          today: "Today"
        }
      : {
          placeholder: placeholder ?? "dd/mm/aaaa",
          previousMonth: "Mes anterior",
          selectMonth: "Seleccionar mes",
          selectYear: "Seleccionar año",
          nextMonth: "Mes siguiente",
          today: "Hoy"
        };
  const selectedDate = useMemo(() => fromDateKey(value), [value]);
  const [isOpen, setIsOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(selectedDate ?? new Date()));
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const todayKey = toDateKey(new Date());
  const selectedKey = selectedDate ? toDateKey(selectedDate) : "";
  const days = useMemo(() => buildCalendarDays(visibleMonth), [visibleMonth]);

  useEffect(() => {
    if (selectedDate) {
      setVisibleMonth(startOfMonth(selectedDate));
    }
  }, [selectedDate]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!fieldRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function moveMonth(offset: number) {
    setVisibleMonth((currentMonth) => new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1));
  }

  function selectVisibleMonth(month: number) {
    setVisibleMonth((currentMonth) => new Date(currentMonth.getFullYear(), month, 1));
  }

  function selectVisibleYear(year: number) {
    setVisibleMonth((currentMonth) => new Date(year, currentMonth.getMonth(), 1));
  }

  function selectDate(date: Date) {
    onChange(toDateKey(date));
    setIsOpen(false);
  }

  function selectToday() {
    const today = new Date();
    onChange(toDateKey(today));
    setVisibleMonth(startOfMonth(today));
    setIsOpen(false);
  }

  return (
    <div className="date-field" ref={fieldRef}>
      <button
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        className="date-field__trigger"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <CalendarDays size={17} strokeWidth={2.1} />
        <span className={selectedDate ? "" : "date-field__placeholder"}>
          {selectedDate ? displayFormatter.format(selectedDate) : copy.placeholder}
        </span>
      </button>

      {isOpen ? (
        <div className="date-picker" role="dialog">
          <div className="date-picker__header">
            <button aria-label={copy.previousMonth} onClick={() => moveMonth(-1)} type="button">
              <ChevronLeft size={17} strokeWidth={2.1} />
            </button>
            <div className="date-picker__jump">
              <select
                aria-label={copy.selectMonth}
                onChange={(event) => selectVisibleMonth(Number(event.target.value))}
                value={visibleMonth.getMonth()}
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
              <select
                aria-label={copy.selectYear}
                onChange={(event) => selectVisibleYear(Number(event.target.value))}
                value={visibleMonth.getFullYear()}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <button aria-label={copy.nextMonth} onClick={() => moveMonth(1)} type="button">
              <ChevronRight size={17} strokeWidth={2.1} />
            </button>
          </div>

          <div className="date-picker__weekdays">
            {weekDays.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="date-picker__days">
            {days.map((date) => {
              const dateKey = toDateKey(date);
              const isOutsideMonth = date.getMonth() !== visibleMonth.getMonth();
              const isSelected = dateKey === selectedKey;
              const isToday = dateKey === todayKey;

              return (
                <button
                  className={[
                    isOutsideMonth ? "is-outside" : "",
                    isSelected ? "is-selected" : "",
                    isToday ? "is-today" : ""
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  key={dateKey}
                  onClick={() => selectDate(date)}
                  type="button"
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          <div className="date-picker__footer">
            <button onClick={selectToday} type="button">
              {copy.today}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
