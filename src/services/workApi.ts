const DEFAULT_API_BASE_URL = import.meta.env.DEV ? "http://localhost:4000/api/v1" : "/api/v1";
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL).replace(/\/$/, "");

export type WorkedHoursRounding = "none" | "nearest_15_minutes" | "nearest_30_minutes";

export type WorkedHoursEntryRequest = {
  date: string;
  startTime: string;
  endTime: string;
};

export type WorkedHoursRequest = {
  entries: WorkedHoursEntryRequest[];
  rounding?: WorkedHoursRounding;
};

export type WorkedHoursResponse = {
  success: true;
  data: {
    input: {
      entries: WorkedHoursEntryRequest[];
      rounding: WorkedHoursRounding;
    };
    result: {
      totalMinutes: number;
      totalHours: number;
      formattedTotal: string;
      entryCount: number;
      dayCount: number;
      entries: Array<{
        date: string;
        startTime: string;
        endTime: string;
        rawMinutes: number;
        workedMinutes: number;
        workedHours: number;
        formattedWorkedTime: string;
      }>;
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

export async function calculateWorkedHours(
  request: WorkedHoursRequest
): Promise<WorkedHoursResponse["data"]> {
  const response = await fetch(`${API_BASE_URL}/work/worked-hours`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  });

  const payload = (await response.json()) as WorkedHoursResponse | ApiErrorResponse;

  if (!response.ok || !payload.success) {
    const message = !payload.success ? payload.error.message : "No se pudieron calcular las horas.";
    throw new Error(message);
  }

  return payload.data;
}
