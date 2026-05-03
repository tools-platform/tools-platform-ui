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

export type EmploymentContractType = "fixed_term" | "indefinite" | "work_or_labor";
export type TerminationReason =
  | "mutual_agreement"
  | "without_just_cause"
  | "with_just_cause"
  | "voluntary_resignation";

export type EmploymentSettlementColombiaRequest = {
  monthlySalary: number;
  employmentStartDate: string;
  endDate: string;
  contractType: EmploymentContractType;
  terminationReason: TerminationReason;
  fixedTermEndDate?: string;
  remainingWorkDays?: number;
  year?: number;
  includeTransportationAllowance?: boolean;
  pendingSalaryDays?: number;
  pendingVacationDays?: number;
  otherEarnings?: number;
  otherDeductions?: number;
};

export type EmploymentSettlementColombiaResponse = {
  success: true;
  data: {
    currency: "COP";
    year: number;
    input: EmploymentSettlementColombiaRequest & {
      includeTransportationAllowance: boolean;
      pendingSalaryDays: number;
      pendingVacationDays: number;
      otherEarnings: number;
      otherDeductions: number;
    };
    period: {
      employmentStartDate: string;
      endDate: string;
      totalEmploymentDays: number;
      severanceStartDate: string;
      severanceDays: number;
      serviceBonusStartDate: string;
      serviceBonusDays: number;
      pendingVacationDays: number;
    };
    result: {
      baseSalary: number;
      transportationAllowance: number;
      benefitsBase: number;
      dailySalary: number;
      severancePay: number;
      severanceInterest: number;
      serviceBonus: number;
      vacationPay: number;
      pendingSalary: number;
      otherEarnings: number;
      otherDeductions: number;
      ordinarySettlement: number;
      dismissalCompensation: number;
      totalSettlement: number;
    };
    compensation: {
      applies: boolean;
      contractType: EmploymentContractType;
      contractTypeLabel: string;
      terminationReason: TerminationReason;
      terminationReasonLabel: string;
      compensationDays: number;
      amount: number;
      note: string;
    };
    rules: {
      minimumMonthlyWage: number;
      transportationAllowanceValue: number;
      transportationAllowanceSalaryLimit: number;
      qualifiesForTransportationAllowance: boolean;
      severanceInterestRate: number;
      daysInLaborYear: number;
      daysInLaborMonth: number;
      vacationDaysPerYear: number;
      highSalaryMinimumWageThreshold: number;
      contractTypes: Record<EmploymentContractType, string>;
      terminationReasons: Record<TerminationReason, string>;
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

export async function calculateEmploymentSettlementColombia(
  request: EmploymentSettlementColombiaRequest
): Promise<EmploymentSettlementColombiaResponse["data"]> {
  const response = await fetch(`${API_BASE_URL}/finance/employment-settlement-colombia`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  });

  const payload = (await response.json()) as EmploymentSettlementColombiaResponse | ApiErrorResponse;

  if (!response.ok || !payload.success) {
    const message = !payload.success ? payload.error.message : "No se pudo calcular la liquidación.";
    throw new Error(message);
  }

  return payload.data;
}
