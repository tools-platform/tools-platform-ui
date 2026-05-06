import { postJson } from "./apiClient";

export type NetSalaryColombiaRequest = {
  monthlySalary: number;
  year?: number;
  includeTransportationAllowance?: boolean;
  otherDeductions?: number;
};

export type HourlySalaryType = "gross" | "net";

export type HourlySalaryColombiaRequest = {
  monthlySalary: number;
  salaryType?: HourlySalaryType;
  weeklyHours?: number;
  year?: number;
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

export type HourlySalaryColombiaResponse = {
  success: true;
  data: {
    currency: "COP";
    year: number;
    input: {
      monthlySalary: number;
      salaryType: HourlySalaryType;
      weeklyHours: number;
      year: number;
    };
    result: {
      baseMonthlySalary: number;
      monthlySalaryUsed: number;
      hourlySalary: number;
      dailySalary: number;
      weeklyHours: number;
      monthlyHours: number;
    };
    deductions: {
      applies: boolean;
      healthContribution: number;
      pensionContribution: number;
      solidarityPensionFundContribution: number;
      totalDeductions: number;
    };
    rules: {
      currentDate: string;
      legalWeeklyHours: number;
      usedCustomWeeklyHours: boolean;
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

export function calculateNetSalaryColombia(
  request: NetSalaryColombiaRequest
): Promise<NetSalaryColombiaResponse["data"]> {
  return postJson("/finance/net-salary-colombia", request, {
    es: "No se pudo calcular el salario.",
    en: "We couldn't calculate the net salary."
  });
}

export function calculateHourlySalaryColombia(
  request: HourlySalaryColombiaRequest
): Promise<HourlySalaryColombiaResponse["data"]> {
  return postJson("/work/hourly-salary", request, {
    es: "No se pudo calcular el salario por hora.",
    en: "We couldn't calculate the hourly salary."
  });
}

export function calculateCreditInterest(request: CreditInterestRequest): Promise<CreditInterestResponse["data"]> {
  return postJson("/finance/credit-interest", request, {
    es: "No se pudo calcular el interés.",
    en: "We couldn't calculate the credit interest."
  });
}

export function calculateLoanPayment(request: LoanPaymentRequest): Promise<LoanPaymentResponse["data"]> {
  return postJson("/finance/loan-payment", request, {
    es: "No se pudo calcular la cuota.",
    en: "We couldn't calculate the monthly payment."
  });
}

export function convertCopUsd(request: CopUsdConverterRequest): Promise<CopUsdConverterResponse["data"]> {
  return postJson("/finance/cop-usd-converter", request, {
    es: "No se pudo convertir la moneda.",
    en: "We couldn't convert the currency."
  });
}

export function calculateEmploymentSettlementColombia(
  request: EmploymentSettlementColombiaRequest
): Promise<EmploymentSettlementColombiaResponse["data"]> {
  return postJson("/finance/employment-settlement-colombia", request, {
    es: "No se pudo calcular la liquidación.",
    en: "We couldn't calculate the employment settlement."
  });
}
