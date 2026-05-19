import { postJson } from "./apiClient";

export type WorkedHoursRounding = "none" | "nearest_15_minutes" | "nearest_30_minutes";
export type WorkCurrency = "COP" | "USD";
export type OvertimeColombiaEntryType =
  | "daytime_overtime"
  | "night_overtime"
  | "night_surcharge"
  | "sunday_holiday_daytime"
  | "sunday_holiday_night"
  | "sunday_holiday_daytime_overtime"
  | "sunday_holiday_night_overtime";

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

export type OvertimeColombiaRequest = {
  monthlySalary: number;
  weeklyHours?: number;
  year?: number;
  entries: Array<{
    type: OvertimeColombiaEntryType;
    hours: number;
  }>;
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

export type OvertimeColombiaResponse = {
  success: true;
  data: {
    currency: "COP";
    year: number;
    input: {
      monthlySalary: number;
      weeklyHours: number;
      year: number;
      entries: Array<{
        type: OvertimeColombiaEntryType;
        hours: number;
      }>;
    };
    result: {
      monthlySalary: number;
      ordinaryHourlyRate: number;
      totalHours: number;
      totalOvertimePay: number;
      weeklyHours: number;
      monthlyHours: number;
      entries: Array<{
        type: OvertimeColombiaEntryType;
        label: string;
        hours: number;
        surchargeRate: number;
        payFactor: number;
        hourlyRate: number;
        subtotal: number;
      }>;
    };
    rules: {
      currentDate: string;
      legalWeeklyHours: number;
      usedCustomWeeklyHours: boolean;
      monthlyHoursFormula: string;
      sources: string[];
    };
    disclaimer: string;
  };
};

export function calculateWorkedHours(request: WorkedHoursRequest): Promise<WorkedHoursResponse["data"]> {
  return postJson("/work/worked-hours", request, {
    es: "No se pudieron calcular las horas.",
    en: "We couldn't calculate the worked hours."
  });
}

export function calculateFreelanceRate(request: FreelanceRateRequest): Promise<FreelanceRateResponse["data"]> {
  return postJson("/work/freelance-rate", request, {
    es: "No se pudo calcular la tarifa freelance.",
    en: "We couldn't calculate the freelance rate."
  });
}

export function calculateEmployeeSalaryEquivalent(
  request: EmployeeSalaryEquivalentRequest
): Promise<EmployeeSalaryEquivalentResponse["data"]> {
  return postJson("/work/employee-salary-equivalent", request, {
    es: "No se pudo calcular el sueldo equivalente.",
    en: "We couldn't calculate the equivalent employee salary."
  });
}

export function calculateOvertimeColombia(
  request: OvertimeColombiaRequest
): Promise<OvertimeColombiaResponse["data"]> {
  return postJson("/work/overtime-colombia", request, {
    es: "No se pudieron calcular las horas extras.",
    en: "We couldn't calculate the overtime pay."
  });
}
