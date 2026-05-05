import { postJson } from "./apiClient";

export type WorkedHoursRounding = "none" | "nearest_15_minutes" | "nearest_30_minutes";
export type WorkCurrency = "COP" | "USD";

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

export type FreelanceRateRequest = {
  desiredMonthlyIncome: number;
  workDaysPerWeek: number;
  hoursPerDay: number;
  safetyMarginPercentage?: number;
  currency?: WorkCurrency;
};

export type FreelanceRateResponse = {
  success: true;
  data: {
    currency: WorkCurrency;
    input: {
      desiredMonthlyIncome: number;
      workDaysPerWeek: number;
      hoursPerDay: number;
      safetyMarginPercentage: number;
    };
    result: {
      weeklyWorkingHours: number;
      monthlyWorkingHours: number;
      minimumHourlyRate: number;
      safetyMarginAmount: number;
      targetMonthlyRevenue: number;
      suggestedHourlyRate: number;
      suggestedDailyRate: number;
      suggestedWeeklyRate: number;
    };
    rules: {
      weeksPerMonth: number;
      rateRounding: "up_to_nearest_100";
    };
    disclaimer: string;
  };
};

export type EmployeeSalaryEquivalentRequest = {
  hourlyRate: number;
  weeklyHours: number;
  year?: number;
};

export type EmployeeSalaryEquivalentResponse = {
  success: true;
  data: {
    currency: "COP";
    year: number;
    input: {
      hourlyRate: number;
      weeklyHours: number;
      year: number;
    };
    result: {
      weeklyIndependentIncome: number;
      grossBiweeklyEquivalentSalary: number;
      grossMonthlyEquivalentSalary: number;
      netBiweeklyEquivalentSalary: number;
      netMonthlyEquivalentSalary: number;
      grossAnnualEquivalentSalary: number;
      monthlyWorkingHours: number;
    };
    deductions: {
      healthContribution: number;
      pensionContribution: number;
      solidarityPensionFundContribution: number;
      totalDeductions: number;
    };
    rules: {
      weeksPerMonth: number;
      employeeHealthRate: number;
      employeePensionRate: number;
      solidarityPensionFundRate: number;
      sources: string[];
    };
    disclaimer: string;
  };
};

export function calculateWorkedHours(request: WorkedHoursRequest): Promise<WorkedHoursResponse["data"]> {
  return postJson("/work/worked-hours", request, "No se pudieron calcular las horas.");
}

export function calculateFreelanceRate(request: FreelanceRateRequest): Promise<FreelanceRateResponse["data"]> {
  return postJson("/work/freelance-rate", request, "No se pudo calcular la tarifa freelance.");
}

export function calculateEmployeeSalaryEquivalent(
  request: EmployeeSalaryEquivalentRequest
): Promise<EmployeeSalaryEquivalentResponse["data"]> {
  return postJson(
    "/work/employee-salary-equivalent",
    request,
    "No se pudo calcular el sueldo equivalente."
  );
}
