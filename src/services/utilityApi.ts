import { postJson } from "./apiClient";

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

export function convertUnits(request: UnitConverterRequest): Promise<UnitConverterResponse["data"]> {
  return postJson("/utility/unit-converter", request, "No se pudo convertir la unidad.");
}
