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

export type CreditInterestType = "simple" | "compound";
export type CompoundingFrequency = "monthly" | "annually";
export type CreditInterestCurrency = "COP" | "USD";

export type CreditInterestRequest = {
  loanAmount: number;
  annualInterestRate: number;
  termMonths: number;
  interestType?: CreditInterestType;
  compoundingFrequency?: CompoundingFrequency;
  currency?: CreditInterestCurrency;
};

export type CreditInterestResponse = {
  success: true;
  data: {
    currency: CreditInterestCurrency;
    input: {
      loanAmount: number;
      annualInterestRate: number;
      termMonths: number;
      interestType: CreditInterestType;
      compoundingFrequency: CompoundingFrequency;
    };
    result: {
      monthlyRate: number;
      effectiveAnnualRate: number;
      totalInterest: number;
      totalToPay: number;
      estimatedMonthlyAverage: number;
    };
    calculation: {
      formula: "simple_interest" | "compound_interest";
      periods: number;
    };
    disclaimer: string;
  };
};

export type LoanPaymentRateType = "effective_annual" | "monthly";

export type LoanPaymentRequest = {
  loanAmount: number;
  interestRate: number;
  rateType?: LoanPaymentRateType;
  termMonths: number;
  currency?: CreditInterestCurrency;
};

export type LoanPaymentResponse = {
  success: true;
  data: {
    currency: CreditInterestCurrency;
    input: {
      loanAmount: number;
      interestRate: number;
      rateType: LoanPaymentRateType;
      termMonths: number;
    };
    result: {
      monthlyRate: number;
      effectiveAnnualRate: number;
      monthlyPayment: number;
      totalInterest: number;
      totalToPay: number;
    };
    calculation: {
      formula: "fixed_payment_amortization";
      periods: number;
    };
    disclaimer: string;
  };
};

export type CopUsdDirection = "COP_TO_USD" | "USD_TO_COP";

export type CopUsdConverterRequest = {
  amount: number;
  direction?: CopUsdDirection;
};

export type CopUsdConverterResponse = {
  success: true;
  data: {
    input: {
      amount: number;
      direction: CopUsdDirection;
    };
    result: {
      sourceAmount: number;
      targetAmount: number;
      sourceCurrency: "COP" | "USD";
      targetCurrency: "COP" | "USD";
      exchangeRate: number;
    };
    rate: {
      name: "TRM";
      pair: "USD_COP";
      value: number;
      unit: "COP";
      validFrom: string;
      validTo: string;
      fetchedAt: string;
      source: string;
      sourceUrl: string;
      isStale: boolean;
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
  includeServiceBonus?: boolean;
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
      includeServiceBonus: boolean;
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

export async function calculateCreditInterest(
  request: CreditInterestRequest
): Promise<CreditInterestResponse["data"]> {
  const response = await fetch(`${API_BASE_URL}/finance/credit-interest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  });

  const payload = (await response.json()) as CreditInterestResponse | ApiErrorResponse;

  if (!response.ok || !payload.success) {
    const message = !payload.success ? payload.error.message : "No se pudo calcular el interés.";
    throw new Error(message);
  }

  return payload.data;
}

export async function calculateLoanPayment(
  request: LoanPaymentRequest
): Promise<LoanPaymentResponse["data"]> {
  const response = await fetch(`${API_BASE_URL}/finance/loan-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  });

  const payload = (await response.json()) as LoanPaymentResponse | ApiErrorResponse;

  if (!response.ok || !payload.success) {
    const message = !payload.success ? payload.error.message : "No se pudo calcular la cuota.";
    throw new Error(message);
  }

  return payload.data;
}

export async function convertCopUsd(
  request: CopUsdConverterRequest
): Promise<CopUsdConverterResponse["data"]> {
  const response = await fetch(`${API_BASE_URL}/finance/cop-usd-converter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  });

  const payload = (await response.json()) as CopUsdConverterResponse | ApiErrorResponse;

  if (!response.ok || !payload.success) {
    const message = !payload.success ? payload.error.message : "No se pudo convertir la moneda.";
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
