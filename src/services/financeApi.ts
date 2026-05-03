const DEFAULT_API_BASE_URL = import.meta.env.DEV ? "http://localhost:4000/api/v1" : "/api/v1";
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL).replace(/\/$/, "");

export type NetSalaryColombiaRequest = {
  monthlySalary: number;
  year?: number;
  includeTransportationAllowance?: boolean;
  otherDeductions?: number;
};

export type NetSalaryColombiaResponse = {
  success: true;
  data: {
    currency: "COP";
    year: number;
    input: {
      monthlySalary: number;
      includeTransportationAllowance: boolean;
      otherDeductions: number;
    };
    result: {
      grossSalary: number;
      transportationAllowance: number;
      contributionBase: number;
      healthContribution: number;
      pensionContribution: number;
      solidarityPensionFundContribution: number;
      totalMandatoryDeductions: number;
      otherDeductions: number;
      totalDeductions: number;
      netSalary: number;
      biweeklyNetSalary: number;
    };
    rules: {
      minimumMonthlyWage: number;
      transportationAllowanceValue: number;
      transportationAllowanceSalaryLimit: number;
      qualifiesForTransportationAllowance: boolean;
      employeeHealthRate: number;
      employeePensionRate: number;
      solidarityPensionFundRate: number;
      sources: string[];
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

export async function calculateNetSalaryColombia(
  request: NetSalaryColombiaRequest
): Promise<NetSalaryColombiaResponse["data"]> {
  const response = await fetch(`${API_BASE_URL}/finance/net-salary-colombia`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  });

  const payload = (await response.json()) as NetSalaryColombiaResponse | ApiErrorResponse;

  if (!response.ok || !payload.success) {
    const message = !payload.success ? payload.error.message : "No se pudo calcular el salario.";
    throw new Error(message);
  }

  return payload.data;
}
