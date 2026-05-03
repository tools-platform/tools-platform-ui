const DEFAULT_API_BASE_URL = import.meta.env.DEV ? "http://localhost:4000/api/v1" : "/api/v1";
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL).replace(/\/$/, "");

export type UnitCategory = "length" | "mass" | "temperature";

export type UnitConverterRequest = {
  category: UnitCategory;
  fromUnit: string;
  toUnit: string;
  value: number;
  precision?: number;
};

export type UnitConverterResponse = {
  success: true;
  data: {
    input: {
      category: UnitCategory;
      fromUnit: string;
      toUnit: string;
      value: number;
      precision: number;
    };
    result: {
      convertedValue: number;
      rawConvertedValue: number;
      formatted: string;
      from: {
        value: number;
        unit: string;
        label: string;
        symbol: string;
      };
      to: {
        value: number;
        unit: string;
        label: string;
        symbol: string;
      };
    };
    rules: {
      category: UnitCategory;
      baseUnit: string;
      baseValue: number;
      precision: number;
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

export async function convertUnits(request: UnitConverterRequest): Promise<UnitConverterResponse["data"]> {
  const response = await fetch(`${API_BASE_URL}/utility/unit-converter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  });

  const payload = (await response.json()) as UnitConverterResponse | ApiErrorResponse;

  if (!response.ok || !payload.success) {
    const message = !payload.success ? payload.error.message : "No se pudo convertir la unidad.";
    throw new Error(message);
  }

  return payload.data;
}
