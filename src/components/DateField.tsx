import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type DateFieldProps = {
  ariaLabel: string;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
};

const monthFormatter = new Intl.DateTimeFormat("es-CO", {
  month: "long",
  year: "numeric"
});

const displayFormatter = new Intl.DateTimeFormat("es-CO", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric"
});

const weekDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

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

export function DateField({ ariaLabel, onChange, placeholder = "dd/mm/aaaa", value }: DateFieldProps) {
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
          {selectedDate ? displayFormatter.format(selectedDate) : placeholder}
        </span>
      </button>

      {isOpen ? (
        <div className="date-picker" role="dialog">
          <div className="date-picker__header">
            <button aria-label="Mes anterior" onClick={() => moveMonth(-1)} type="button">
              <ChevronLeft size={17} strokeWidth={2.1} />
            </button>
            <strong>{monthFormatter.format(visibleMonth)}</strong>
            <button aria-label="Mes siguiente" onClick={() => moveMonth(1)} type="button">
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
              Hoy
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
