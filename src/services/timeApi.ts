import { postJson } from "./apiClient";

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

export function calculateDaysBetweenDates(
  request: DaysBetweenDatesRequest
): Promise<DaysBetweenDatesResponse["data"]> {
  return postJson("/time/days-between-dates", request, {
    es: "No se pudieron contar los días.",
    en: "We couldn't count the days."
  });
}

export function calculateExactAge(request: ExactAgeRequest): Promise<ExactAgeResponse["data"]> {
  return postJson("/time/exact-age", request, {
    es: "No se pudo calcular la edad.",
    en: "We couldn't calculate the exact age."
  });
}
