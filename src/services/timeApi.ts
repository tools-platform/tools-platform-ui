const DEFAULT_API_BASE_URL = import.meta.env.DEV ? "http://localhost:4000/api/v1" : "/api/v1";
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL).replace(/\/$/, "");

export type DaysBetweenDatesRequest = {
  startDate: string;
  endDate: string;
  includeEndDate?: boolean;
};

export type DaysBetweenDatesResponse = {
  success: true;
  data: {
    input: {
      startDate: string;
      endDate: string;
      includeEndDate: boolean;
    };
    result: {
      days: number;
      weeks: number;
      fullWeeks: number;
      remainingDays: number;
      calendarDaysDifference: number;
      isSameDate: boolean;
    };
    disclaimer: string;
  };
};

export type ExactAgeRequest = {
  birthDate: string;
  referenceDate?: string;
};

export type ExactAgeResponse = {
  success: true;
  data: {
    input: {
      birthDate: string;
      referenceDate: string;
    };
    result: {
      years: number;
      months: number;
      days: number;
      totalMonths: number;
      totalDays: number;
      nextBirthdayDate: string;
      daysUntilNextBirthday: number;
      isBirthdayToday: boolean;
    };
    disclaimer: string;
  };
};

type ApiErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export async function calculateDaysBetweenDates(
  request: DaysBetweenDatesRequest
): Promise<DaysBetweenDatesResponse["data"]> {
  const response = await fetch(`${API_BASE_URL}/time/days-between-dates`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  });

  const payload = (await response.json()) as DaysBetweenDatesResponse | ApiErrorResponse;

  if (!response.ok || !payload.success) {
    const message = !payload.success ? payload.error.message : "No se pudieron contar los días.";
    throw new Error(message);
  }

  return payload.data;
}

export async function calculateExactAge(request: ExactAgeRequest): Promise<ExactAgeResponse["data"]> {
  const response = await fetch(`${API_BASE_URL}/time/exact-age`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  });

  const payload = (await response.json()) as ExactAgeResponse | ApiErrorResponse;

  if (!response.ok || !payload.success) {
    const message = !payload.success ? payload.error.message : "No se pudo calcular la edad.";
    throw new Error(message);
  }

  return payload.data;
}
