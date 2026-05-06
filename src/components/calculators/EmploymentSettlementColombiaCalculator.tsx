import { Calculator, CheckCircle2, ChevronDown, CircleDollarSign, Info, Loader2, Pencil } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { DateField } from "../DateField";
import { useMobileResultScroll } from "../../hooks/useMobileResultScroll";
import { useLocale } from "../../i18n";
import {
  calculateEmploymentSettlementColombia,
  type EmploymentContractType,
  type EmploymentSettlementColombiaResponse,
  type TerminationReason
} from "../../services/financeApi";

type SettlementData = EmploymentSettlementColombiaResponse["data"];

const contractLabels = {
  es: {
    fixed_term: "Fijo",
    indefinite: "Indefinido",
    work_or_labor: "Por obra o labor"
  },
  en: {
    fixed_term: "Fixed-term",
    indefinite: "Indefinite",
    work_or_labor: "Work or labor"
  }
} as const;

const terminationLabels = {
  es: {
    mutual_agreement: "Mutuo acuerdo",
    without_just_cause: "Sin justa causa",
    with_just_cause: "Con justa causa",
    voluntary_resignation: "Renuncia voluntaria"
  },
  en: {
    mutual_agreement: "Mutual agreement",
    without_just_cause: "Without just cause",
    with_just_cause: "With just cause",
    voluntary_resignation: "Voluntary resignation"
  }
} as const;

function parseMoney(value: string) {
  const normalized = value.replace(/[^\d]/g, "");
  return normalized.length > 0 ? Number(normalized) : 0;
}

function todayDate() {
  return new Date().toISOString().slice(0, 10);
}

function buildPayrollYears(currentYear: number) {
  const years: number[] = [];
  for (let year = currentYear; year >= 2024; year -= 1) years.push(year);
  return years;
}

const copy = {
  es: {
    kicker: "Calculadora",
    title: "Datos de la liquidación",
    monthlySalary: "Salario mensual base",
    startDate: "Fecha de inicio",
    startDateHelp: "La usamos para calcular tu antigüedad si el contrato indefinido termina sin justa causa. Esa antigüedad define los días de indemnización.",
    endDate: "Fecha de finalización",
    contractType: "Tipo de contrato",
    terminationReason: "Motivo de terminación",
    fixedEndDate: "Fecha pactada de terminación",
    fixedEndDateHelp: "Solo se pide para contrato fijo terminado sin justa causa.",
    remainingWorkDays: "Días pendientes de obra o labor",
    remainingWorkDaysHelp: "Solo se pide para obra o labor terminada sin justa causa.",
    payrollYear: "Año de reglas",
    payrollYearHelp: "Lo usamos para aplicar salario mínimo, auxilio de transporte y límites legales vigentes.",
    editYearAria: "Editar año de reglas",
    editYearTitle: "Editar año",
    pendingSalaryDays: "Días de salario pendientes",
    pendingVacationDays: "Días de vacaciones pendientes",
    otherEarnings: "Pagos adicionales",
    otherEarningsHelp: "Úsalo si te deben sumar valores extra no calculados aquí, como bonificaciones pendientes, comisiones aprobadas, recargos, horas extra o ajustes acordados.",
    otherDeductions: "Deducciones de nómina",
    otherDeductionsHelp: "Valores extra que te descuentan en nómina, como libranzas, préstamos, anticipos, embargos o aportes voluntarios. Si no tienes, déjalo en 0.",
    includeServiceBonus: "Incluir prima de servicios",
    includeServiceBonusHelp: "Desmárcalo si esa prima ya fue pagada o no quieres incluirla en este cálculo.",
    includeTransportationAllowance: "Incluir auxilio de transporte si aplica",
    includeTransportationAllowanceHelp: "Validaremos si el salario cumple el límite legal para usarlo en prestaciones.",
    salaryError: "Ingresa un salario mensual mayor a cero.",
    dateError: "Ingresa la fecha de inicio y la fecha de finalización.",
    dateOrderError: "La fecha de finalización no puede ser anterior a la fecha de inicio.",
    yearError: (currentYear: number) => `Ingresa un año entre 2024 y ${currentYear}.`,
    fixedEndDateError: "Ingresa la fecha pactada de terminación del contrato fijo.",
    remainingWorkDaysError: "Ingresa los días de obra o labor que faltaban por ejecutar.",
    requestError: "No se pudo calcular la liquidación.",
    submit: "Calcular liquidación",
    reset: "Restablecer",
    heroTitle: "Total estimado de liquidación",
    includesCompensation: (amount: string) => `Incluye indemnización de ${amount}`,
    excludesCompensation: "No incluye indemnización por despido sin justa causa",
    severancePay: "Cesantías",
    severanceInterest: "Intereses de cesantías",
    serviceBonus: "Prima de servicios",
    vacationPay: "Vacaciones pendientes",
    pendingSalary: "Salario pendiente",
    transportationAllowanceResult: "Auxilio transporte",
    dismissalCompensation: "Indemnización",
    dismissalCompensationHelp:
      "Nace cuando el contrato termina sin justa causa. No es una prestación ordinaria: compensa la terminación anticipada y se calcula según el tipo de contrato, salario y tiempo faltante o antigüedad.",
    ordinarySettlement: "Liquidación ordinaria",
    additionalPayments: "Pagos adicionales",
    deductions: "Deducciones",
    rulesNote: (severanceDays: number, includeServiceBonus: boolean, serviceBonusDays: number, totalEmploymentDays: number) =>
      `Se calcularon ${severanceDays} días para cesantías${includeServiceBonus ? `, ${serviceBonusDays} días para prima` : ""} y ${totalEmploymentDays} días totales de relación laboral.`,
    contract: "Contrato",
    reason: "Motivo",
    benefitsBase: "Base prestaciones",
    dailySalary: "Salario diario",
    compensationDays: "Días de indemnización",
    disclaimer:
      "Este resultado es una estimación para un empleado dependiente en Colombia. No incluye retención en la fuente, acuerdos especiales, salario variable, sanciones ni ajustes internos del empleador.",
    emptyTitle: "Tu liquidación aparecerá aquí",
    emptyDescription: "Completa los datos del contrato para ver cesantías, prima, vacaciones e indemnización si aplica."
  },
  en: {
    kicker: "Calculator",
    title: "Settlement details",
    monthlySalary: "Base monthly salary",
    startDate: "Start date",
    startDateHelp: "We use it to calculate seniority if an indefinite contract ends without just cause. That seniority defines compensation days.",
    endDate: "End date",
    contractType: "Contract type",
    terminationReason: "Termination reason",
    fixedEndDate: "Agreed end date",
    fixedEndDateHelp: "Only required for a fixed-term contract ended without just cause.",
    remainingWorkDays: "Pending work or labor days",
    remainingWorkDaysHelp: "Only required for a work-or-labor contract ended without just cause.",
    payrollYear: "Rule year",
    payrollYearHelp: "We use it to apply the minimum wage, transportation allowance, and legal thresholds in force.",
    editYearAria: "Edit rule year",
    editYearTitle: "Edit year",
    pendingSalaryDays: "Pending salary days",
    pendingVacationDays: "Pending vacation days",
    otherEarnings: "Additional payments",
    otherEarningsHelp: "Use it if extra amounts must be added outside this calculation, such as pending bonuses, approved commissions, surcharges, overtime, or agreed adjustments.",
    otherDeductions: "Payroll deductions",
    otherDeductionsHelp: "Extra payroll deductions such as salary loans, advances, garnishments, or voluntary contributions. Leave it at 0 if you do not have any.",
    includeServiceBonus: "Include service bonus",
    includeServiceBonusHelp: "Turn it off if that bonus was already paid or you do not want to include it in this calculation.",
    includeTransportationAllowance: "Include transportation allowance if applicable",
    includeTransportationAllowanceHelp: "We will validate whether the salary meets the legal threshold to use it in benefits.",
    salaryError: "Enter a monthly salary greater than zero.",
    dateError: "Enter the start date and the end date.",
    dateOrderError: "The end date cannot be earlier than the start date.",
    yearError: (currentYear: number) => `Enter a year between 2024 and ${currentYear}.`,
    fixedEndDateError: "Enter the agreed fixed-term contract end date.",
    remainingWorkDaysError: "Enter the pending work or labor days that remained to be completed.",
    requestError: "We couldn't calculate the settlement.",
    submit: "Calculate settlement",
    reset: "Reset",
    heroTitle: "Estimated settlement total",
    includesCompensation: (amount: string) => `Includes compensation of ${amount}`,
    excludesCompensation: "Does not include dismissal compensation for termination without just cause",
    severancePay: "Severance pay",
    severanceInterest: "Severance interest",
    serviceBonus: "Service bonus",
    vacationPay: "Pending vacation",
    pendingSalary: "Pending salary",
    transportationAllowanceResult: "Transportation allowance",
    dismissalCompensation: "Dismissal compensation",
    dismissalCompensationHelp:
      "It applies when the contract ends without just cause. It is not a regular labor benefit: it compensates early termination and depends on contract type, salary, and remaining time or seniority.",
    ordinarySettlement: "Ordinary settlement",
    additionalPayments: "Additional payments",
    deductions: "Deductions",
    rulesNote: (severanceDays: number, includeServiceBonus: boolean, serviceBonusDays: number, totalEmploymentDays: number) =>
      `Calculated ${severanceDays} days for severance${includeServiceBonus ? `, ${serviceBonusDays} days for service bonus` : ""}, and ${totalEmploymentDays} total days of employment.`,
    contract: "Contract",
    reason: "Reason",
    benefitsBase: "Benefits base",
    dailySalary: "Daily salary",
    compensationDays: "Compensation days",
    disclaimer:
      "This result is an estimate for a dependent employee in Colombia. It does not include withholding tax, special agreements, variable salary, penalties, or the employer's internal adjustments.",
    emptyTitle: "Your settlement will appear here",
    emptyDescription: "Complete the contract details to see severance, service bonus, vacation pay, and compensation when applicable."
  }
} as const;

function ResultItem({
  label,
  tooltip,
  value,
  strong = false,
  formatMoney
}: {
  label: string;
  tooltip?: string;
  value: number;
  strong?: boolean;
  formatMoney: (value: number) => string;
}) {
  return (
    <div className={strong ? "result-item result-item--strong" : "result-item"}>
      <span className={tooltip ? "result-item__label" : ""}>
        {label}
        {tooltip ? (
          <span className="info-tooltip">
            <Info size={10} strokeWidth={2.1} />
            <span role="tooltip">{tooltip}</span>
          </span>
        ) : null}
      </span>
      <strong>{formatMoney(value)}</strong>
    </div>
  );
}

export function EmploymentSettlementColombiaCalculator() {
  const { locale } = useLocale();
  const text = copy[locale];
  const localeCode = locale === "es" ? "es-CO" : "en-US";
  const currencyFormatter = useMemo(
    () => new Intl.NumberFormat(localeCode, { style: "currency", currency: "COP", maximumFractionDigits: 0 }),
    [localeCode]
  );
  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(localeCode, { maximumFractionDigits: 2 }),
    [localeCode]
  );

  const contractTypes: Array<{ label: string; value: EmploymentContractType }> = useMemo(
    () => [
      { label: contractLabels[locale].fixed_term, value: "fixed_term" },
      { label: contractLabels[locale].indefinite, value: "indefinite" },
      { label: contractLabels[locale].work_or_labor, value: "work_or_labor" }
    ],
    [locale]
  );
  const terminationReasons: Array<{ label: string; value: TerminationReason }> = useMemo(
    () => [
      { label: terminationLabels[locale].mutual_agreement, value: "mutual_agreement" },
      { label: terminationLabels[locale].without_just_cause, value: "without_just_cause" },
      { label: terminationLabels[locale].with_just_cause, value: "with_just_cause" },
      { label: terminationLabels[locale].voluntary_resignation, value: "voluntary_resignation" }
    ],
    [locale]
  );

  function formatMoneyInput(value: string) {
    const normalized = value.replace(/[^\d]/g, "");
    return normalized.length > 0 ? new Intl.NumberFormat(localeCode).format(Number(normalized)) : "";
  }
  function formatMoney(value: number) {
    return currencyFormatter.format(value);
  }

  const currentPayrollYear = new Date().getFullYear();
  const payrollYears = useMemo(() => buildPayrollYears(currentPayrollYear), [currentPayrollYear]);
  const [monthlySalary, setMonthlySalary] = useState("2.500.000");
  const [employmentStartDate, setEmploymentStartDate] = useState(todayDate());
  const [endDate, setEndDate] = useState(todayDate());
  const [contractType, setContractType] = useState<EmploymentContractType>("indefinite");
  const [terminationReason, setTerminationReason] = useState<TerminationReason>("voluntary_resignation");
  const [fixedTermEndDate, setFixedTermEndDate] = useState("");
  const [remainingWorkDays, setRemainingWorkDays] = useState("");
  const [year, setYear] = useState(currentPayrollYear.toString());
  const [isYearEditable, setIsYearEditable] = useState(false);
  const [includeTransportationAllowance, setIncludeTransportationAllowance] = useState(false);
  const [includeServiceBonus, setIncludeServiceBonus] = useState(true);
  const [pendingSalaryDays, setPendingSalaryDays] = useState("0");
  const [pendingVacationDays, setPendingVacationDays] = useState("0");
  const [otherEarnings, setOtherEarnings] = useState("0");
  const [otherDeductions, setOtherDeductions] = useState("0");
  const [result, setResult] = useState<SettlementData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { resultRef, scrollToResultOnMobile } = useMobileResultScroll<HTMLElement>();

  const requiresFixedTermEndDate = contractType === "fixed_term" && terminationReason === "without_just_cause";
  const requiresRemainingWorkDays = contractType === "work_or_labor" && terminationReason === "without_just_cause";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const salaryValue = parseMoney(monthlySalary);
    const yearValue = Number(year);
    const pendingSalaryDaysValue = Number(pendingSalaryDays || "0");
    const pendingVacationDaysValue = Number(pendingVacationDays || "0");
    const remainingWorkDaysValue = Number(remainingWorkDays || "0");

    if (salaryValue <= 0) {
      setError(text.salaryError);
      return;
    }
    if (!employmentStartDate || !endDate) {
      setError(text.dateError);
      return;
    }
    if (new Date(endDate) < new Date(employmentStartDate)) {
      setError(text.dateOrderError);
      return;
    }
    if (!Number.isInteger(yearValue) || yearValue < 2024 || yearValue > currentPayrollYear) {
      setError(text.yearError(currentPayrollYear));
      return;
    }
    if (requiresFixedTermEndDate && !fixedTermEndDate) {
      setError(text.fixedEndDateError);
      return;
    }
    if (requiresRemainingWorkDays && remainingWorkDaysValue <= 0) {
      setError(text.remainingWorkDaysError);
      return;
    }

    setIsLoading(true);
    try {
      const data = await calculateEmploymentSettlementColombia({
        monthlySalary: salaryValue,
        employmentStartDate,
        endDate,
        contractType,
        terminationReason,
        fixedTermEndDate: requiresFixedTermEndDate ? fixedTermEndDate : undefined,
        remainingWorkDays: requiresRemainingWorkDays ? remainingWorkDaysValue : undefined,
        year: yearValue,
        includeTransportationAllowance,
        includeServiceBonus,
        pendingSalaryDays: pendingSalaryDaysValue,
        pendingVacationDays: pendingVacationDaysValue,
        otherEarnings: parseMoney(otherEarnings),
        otherDeductions: parseMoney(otherDeductions)
      });
      setResult(data);
      scrollToResultOnMobile();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : text.requestError);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setMonthlySalary("2.500.000");
    setEmploymentStartDate(todayDate());
    setEndDate(todayDate());
    setContractType("indefinite");
    setTerminationReason("voluntary_resignation");
    setFixedTermEndDate("");
    setRemainingWorkDays("");
    setYear(currentPayrollYear.toString());
    setIsYearEditable(false);
    setIncludeTransportationAllowance(false);
    setIncludeServiceBonus(true);
    setPendingSalaryDays("0");
    setPendingVacationDays("0");
    setOtherEarnings("0");
    setOtherDeductions("0");
    setResult(null);
    setError("");
  }

  return (
    <div className="calculator-layout calculator-layout--wide">
      <form className="calculator-card settlement-card" onSubmit={handleSubmit}>
        <div className="calculator-card__header">
          <div>
            <p className="section__kicker">{text.kicker}</p>
            <h2>{text.title}</h2>
          </div>
          <span>
            <Calculator size={20} strokeWidth={2.1} />
          </span>
        </div>

        <label className="field">
          <span>{text.monthlySalary} <span className="required-mark">*</span></span>
          <div className="money-input">
            <span>$</span>
            <input inputMode="numeric" onChange={(event) => setMonthlySalary(formatMoneyInput(event.target.value))} placeholder="2.500.000" required type="text" value={monthlySalary} />
            <strong>COP</strong>
          </div>
        </label>

        <div className="form-grid">
          <label className="field">
            <span className="field-label">
              {text.startDate}<span className="required-mark">*</span>
              <span className="info-tooltip"><Info size={15} strokeWidth={2.1} /><span role="tooltip">{text.startDateHelp}</span></span>
            </span>
            <DateField ariaLabel={text.startDate} onChange={setEmploymentStartDate} value={employmentStartDate} />
          </label>
          <label className="field">
            <span>{text.endDate} <span className="required-mark">*</span></span>
            <DateField ariaLabel={text.endDate} onChange={setEndDate} value={endDate} />
          </label>
        </div>

        <div className="form-grid">
          <label className="field">
            <span>{text.contractType} <span className="required-mark">*</span></span>
            <span className="select-control">
              <select className="plain-select" onChange={(event) => setContractType(event.target.value as EmploymentContractType)} value={contractType}>
                {contractTypes.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
              </select>
              <ChevronDown aria-hidden="true" size={19} strokeWidth={2.1} />
            </span>
          </label>

          <label className="field">
            <span>{text.terminationReason} <span className="required-mark">*</span></span>
            <span className="select-control">
              <select className="plain-select" onChange={(event) => setTerminationReason(event.target.value as TerminationReason)} value={terminationReason}>
                {terminationReasons.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
              </select>
              <ChevronDown aria-hidden="true" size={19} strokeWidth={2.1} />
            </span>
          </label>
        </div>

        {requiresFixedTermEndDate ? (
          <label className="field">
            <span>{text.fixedEndDate} <span className="required-mark">*</span></span>
            <DateField ariaLabel={text.fixedEndDate} onChange={setFixedTermEndDate} value={fixedTermEndDate} />
            <small>{text.fixedEndDateHelp}</small>
          </label>
        ) : null}

        {requiresRemainingWorkDays ? (
          <label className="field">
            <span>{text.remainingWorkDays} <span className="required-mark">*</span></span>
            <input min="1" onChange={(event) => setRemainingWorkDays(event.target.value)} required type="number" value={remainingWorkDays} />
            <small>{text.remainingWorkDaysHelp}</small>
          </label>
        ) : null}

        <div className="form-grid">
          <label className="field">
            <span className="field-label">
              {text.payrollYear}<span className="required-mark">*</span>
              <span className="info-tooltip"><Info size={15} strokeWidth={2.1} /><span role="tooltip">{text.payrollYearHelp}</span></span>
            </span>
            <div className="year-input">
              <select disabled={!isYearEditable} onChange={(event) => setYear(event.target.value)} value={year}>
                {payrollYears.map((payrollYear) => <option key={payrollYear} value={payrollYear}>{payrollYear}</option>)}
              </select>
              <button aria-label={text.editYearAria} onClick={() => setIsYearEditable((isEditable) => !isEditable)} title={text.editYearTitle} type="button">
                <Pencil size={15} strokeWidth={2.1} />
              </button>
            </div>
          </label>

          <label className="field">
            <span>{text.pendingSalaryDays}</span>
            <input max="30" min="0" onChange={(event) => setPendingSalaryDays(event.target.value)} step="0.01" type="number" value={pendingSalaryDays} />
          </label>
        </div>

        <label className="field">
          <span>{text.pendingVacationDays}</span>
          <input min="0" onChange={(event) => setPendingVacationDays(event.target.value)} step="0.01" type="number" value={pendingVacationDays} />
        </label>

        <div className="form-grid">
          <label className="field">
            <span className="field-label">
              {text.otherEarnings}
              <span className="info-tooltip"><Info size={15} strokeWidth={2.1} /><span role="tooltip">{text.otherEarningsHelp}</span></span>
            </span>
            <div className="money-input money-input--compact">
              <span>$</span>
              <input inputMode="numeric" onChange={(event) => setOtherEarnings(formatMoneyInput(event.target.value))} placeholder="0" type="text" value={otherEarnings} />
            </div>
          </label>

          <label className="field">
            <span className="field-label">
              {text.otherDeductions}
              <span className="info-tooltip"><Info size={15} strokeWidth={2.1} /><span role="tooltip">{text.otherDeductionsHelp}</span></span>
            </span>
            <div className="money-input money-input--compact">
              <span>$</span>
              <input inputMode="numeric" onChange={(event) => setOtherDeductions(formatMoneyInput(event.target.value))} placeholder="0" type="text" value={otherDeductions} />
            </div>
          </label>
        </div>

        <label className="toggle-field">
          <input checked={includeServiceBonus} onChange={(event) => setIncludeServiceBonus(event.target.checked)} type="checkbox" />
          <span><strong>{text.includeServiceBonus}</strong><small>{text.includeServiceBonusHelp}</small></span>
        </label>

        <label className="toggle-field toggle-field--compact">
          <input checked={includeTransportationAllowance} onChange={(event) => setIncludeTransportationAllowance(event.target.checked)} type="checkbox" />
          <span><strong>{text.includeTransportationAllowance}</strong><small>{text.includeTransportationAllowanceHelp}</small></span>
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-action" disabled={isLoading} type="submit">
          {isLoading ? <Loader2 className="spin" size={18} /> : <CircleDollarSign size={18} />}
          {text.submit}
        </button>
        <button className="secondary-action" onClick={handleReset} type="button">
          {text.reset}
        </button>
      </form>

      <section className={result ? "result-panel" : "result-panel result-panel--empty"} ref={resultRef}>
        {result ? (
          <>
            <div className="result-panel__hero">
              <p>{text.heroTitle}</p>
              <strong>{formatMoney(result.result.totalSettlement)}</strong>
              <span>{result.compensation.applies ? text.includesCompensation(formatMoney(result.compensation.amount)) : text.excludesCompensation}</span>
            </div>

            <div className="result-breakdown">
              <ResultItem label={text.severancePay} value={result.result.severancePay} formatMoney={formatMoney} />
              <ResultItem label={text.severanceInterest} value={result.result.severanceInterest} formatMoney={formatMoney} />
              {result.input.includeServiceBonus ? <ResultItem label={text.serviceBonus} value={result.result.serviceBonus} formatMoney={formatMoney} /> : null}
              <ResultItem label={text.vacationPay} value={result.result.vacationPay} formatMoney={formatMoney} />
              <ResultItem label={text.pendingSalary} value={result.result.pendingSalary} formatMoney={formatMoney} />
              {result.input.includeTransportationAllowance ? <ResultItem label={text.transportationAllowanceResult} value={result.result.transportationAllowance} formatMoney={formatMoney} /> : null}
              {result.result.otherEarnings > 0 ? <ResultItem label={text.additionalPayments} value={result.result.otherEarnings} formatMoney={formatMoney} /> : null}
              {result.result.otherDeductions > 0 ? <ResultItem label={text.deductions} value={result.result.otherDeductions} formatMoney={formatMoney} /> : null}
              {result.compensation.applies ? <ResultItem label={text.dismissalCompensation} tooltip={text.dismissalCompensationHelp} value={result.result.dismissalCompensation} formatMoney={formatMoney} /> : null}
              <ResultItem label={text.ordinarySettlement} value={result.result.ordinarySettlement} strong formatMoney={formatMoney} />
            </div>

            <div className="rules-note">
              <CheckCircle2 size={18} strokeWidth={2.1} />
              <p>{text.rulesNote(result.period.severanceDays, result.input.includeServiceBonus, result.period.serviceBonusDays, result.period.totalEmploymentDays)}</p>
            </div>

            <div className="rules-grid">
              <span>{text.contract}: {contractLabels[locale][result.compensation.contractType]}</span>
              <span>{text.reason}: {terminationLabels[locale][result.compensation.terminationReason]}</span>
              <span>{text.benefitsBase}: {formatMoney(result.result.benefitsBase)}</span>
              <span>{text.dailySalary}: {formatMoney(result.result.dailySalary)}</span>
              {result.compensation.applies ? <span>{text.compensationDays}: {numberFormatter.format(result.compensation.compensationDays)}</span> : null}
            </div>

            <p className="disclaimer">{text.disclaimer}</p>
          </>
        ) : (
          <div className="result-empty">
            <CircleDollarSign size={30} strokeWidth={2.05} />
            <h2>{text.emptyTitle}</h2>
            <p>{text.emptyDescription}</p>
          </div>
        )}
      </section>
    </div>
  );
}
