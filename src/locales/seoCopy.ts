import type { LocalizedText } from "../i18n";
type SeoCopy = {
    title: LocalizedText;
    description: LocalizedText;
    canonicalPath?: string;
    type?: "website" | "article";
    robots?: string;
};
export const toolSeoById: Record<string, Omit<SeoCopy, "canonicalPath">> = {
    "net-salary-colombia": {
        title: {
            es: "Calculadora salarial Colombia 2026 | Salario neto",
            en: "Net Salary Calculator (Colombia) 2026 | Take-Home Pay",
            hi: "\u0928\u0947\u091F \u0935\u0947\u0924\u0928 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 (\u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E) 2026 | \u0918\u0930 \u0932\u0947 \u091C\u093E\u0913 \u092D\u0941\u0917\u0924\u093E\u0928"
        },
        description: {
            es: "Calcula tu salario neto en Colombia para 2026 y años disponibles con salud, pensión, auxilio de transporte, Fondo de Solidaridad y deducciones.",
            en: "Calculate your 2026 take-home pay in Colombia with health, pension, transport allowance, solidarity fund, and payroll deductions.",
            hi: "\u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F, \u092A\u0947\u0902\u0936\u0928, \u092A\u0930\u093F\u0935\u0939\u0928 \u092D\u0924\u094D\u0924\u093E, \u090F\u0915\u091C\u0941\u091F\u0924\u093E \u0928\u093F\u0927\u093F \u0914\u0930 \u092A\u0947\u0930\u094B\u0932 \u0915\u091F\u094C\u0924\u0940 \u0915\u0947 \u0938\u093E\u0925 \u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E \u092E\u0947\u0902 \u0905\u092A\u0928\u0947 2026 \u091F\u0947\u0915-\u0939\u094B\u092E \u0935\u0947\u0924\u0928 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "gross-salary-colombia": {
        title: {
            es: "Calculadora de salario bruto Colombia | Desde neto",
            en: "Gross Salary Calculator (Colombia) | From Net Pay",
            hi: "\u0938\u0915\u0932 \u0935\u0947\u0924\u0928 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 (\u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E) | \u0928\u0947\u091F \u092A\u0947 \u0938\u0947"
        },
        description: {
            es: "Calcula el salario bruto mensual aproximado desde el neto que recibes mensual o quincenal en Colombia, con salud, pensión y descuentos de nómina.",
            en: "Estimate gross monthly salary from the net amount you receive monthly or biweekly in Colombia, including health, pension, and payroll deductions.",
            hi: "\u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E \u092E\u0947\u0902 \u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F, \u092A\u0947\u0902\u0936\u0928 \u0914\u0930 \u092A\u0947\u0930\u094B\u0932 \u0915\u091F\u094C\u0924\u0940 \u0938\u0939\u093F\u0924 \u0906\u092A\u0915\u094B \u092E\u093E\u0938\u093F\u0915 \u092F\u093E \u0926\u094D\u0935\u093F\u0938\u093E\u092A\u094D\u0924\u093E\u0939\u093F\u0915 \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0939\u094B\u0928\u0947 \u0935\u093E\u0932\u0940 \u0936\u0941\u0926\u094D\u0927 \u0930\u093E\u0936\u093F \u0938\u0947 \u0938\u0915\u0932 \u092E\u093E\u0938\u093F\u0915 \u0935\u0947\u0924\u0928 \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u090F\u0902\u0964"
        }
    },
    "hourly-salary": {
        title: {
            es: "Calculadora salario por hora Colombia | Valor hora",
            en: "Hourly Salary Calculator (Colombia) | Hourly Pay",
            hi: "\u092A\u094D\u0930\u0924\u093F \u0918\u0902\u091F\u093E \u0935\u0947\u0924\u0928 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 (\u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E) | \u092A\u094D\u0930\u0924\u093F \u0918\u0902\u091F\u093E \u0935\u0947\u0924\u0928"
        },
        description: {
            es: "Calcula cuánto ganas por hora en Colombia desde tu salario mensual, jornada legal vigente, horas semanales reales o referencia de dividir entre 240.",
            en: "Calculate how much you earn per hour in Colombia from a monthly salary, legal workweek, or custom weekly hours.",
            hi: "\u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902 \u0915\u093F \u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E \u092E\u0947\u0902 \u0906\u092A \u092E\u093E\u0938\u093F\u0915 \u0935\u0947\u0924\u0928, \u0915\u093E\u0928\u0942\u0928\u0940 \u0915\u093E\u0930\u094D\u092F\u0938\u092A\u094D\u0924\u093E\u0939, \u092F\u093E \u0915\u0938\u094D\u091F\u092E \u0938\u093E\u092A\u094D\u0924\u093E\u0939\u093F\u0915 \u0918\u0902\u091F\u094B\u0902 \u0938\u0947 \u092A\u094D\u0930\u0924\u093F \u0918\u0902\u091F\u0947 \u0915\u093F\u0924\u0928\u093E \u0915\u092E\u093E\u0924\u0947 \u0939\u0948\u0902\u0964"
        }
    },
    "overtime-colombia": {
        title: {
            es: "Calculadora de horas extras Colombia | Recargos",
            en: "Overtime Calculator (Colombia) | Night and Holiday Pay",
            hi: "\u0913\u0935\u0930\u091F\u093E\u0907\u092E \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 (\u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E) | \u0930\u093E\u0924 \u0914\u0930 \u091B\u0941\u091F\u094D\u091F\u0940 \u0915\u093E \u0935\u0947\u0924\u0928"
        },
        description: {
            es: "Calcula horas extras en Colombia con salario mensual, jornada semanal, recargos nocturnos, dominicales, festivos y reglas laborales vigentes.",
            en: "Calculate overtime pay in Colombia from monthly salary, weekly hours, night surcharges, Sunday, holiday, and labor rule references.",
            hi: "\u0915\u094B\u0932\u092E\u094D\u092C\u093F\u092F\u093E \u092E\u0947\u0902 \u092E\u093E\u0938\u093F\u0915 \u0935\u0947\u0924\u0928, \u0938\u093E\u092A\u094D\u0924\u093E\u0939\u093F\u0915 \u0918\u0902\u091F\u0947, \u0930\u093E\u0924\u094D\u0930\u093F \u0905\u0927\u093F\u092D\u093E\u0930, \u0930\u0935\u093F\u0935\u093E\u0930, \u091B\u0941\u091F\u094D\u091F\u0940 \u0914\u0930 \u0936\u094D\u0930\u092E \u0928\u093F\u092F\u092E \u0938\u0902\u0926\u0930\u094D\u092D\u094B\u0902 \u0938\u0947 \u0913\u0935\u0930\u091F\u093E\u0907\u092E \u0935\u0947\u0924\u0928 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "employee-salary-equivalent": {
        title: {
            es: "Calculadora de sueldo de empleado para independientes (Colombia) | Tools Platforms",
            en: "Employee Salary Calculator for Independent Workers (Colombia) | Tools Platforms",
            hi: "\u0938\u094D\u0935\u0924\u0902\u0924\u094D\u0930 \u0936\u094D\u0930\u092E\u093F\u0915\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0915\u0930\u094D\u092E\u091A\u093E\u0930\u0940 \u0935\u0947\u0924\u0928 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 (\u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E) | \u0909\u092A\u0915\u0930\u0923 \u092A\u094D\u0932\u0947\u091F\u092B\u093E\u0930\u094D\u092E"
        },
        description: {
            es: "Convierte lo que cobras por hora como independiente en sueldo semanal, quincenal y mensual como empleado, con neto estimado en Colombia.",
            en: "Convert what you charge per hour as an independent worker into an equivalent employee salary in Colombia, including estimated net income.",
            hi: "\u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E \u092E\u0947\u0902 \u090F\u0915 \u0938\u094D\u0935\u0924\u0902\u0924\u094D\u0930 \u0915\u0930\u094D\u092E\u091A\u093E\u0930\u0940 \u0915\u0947 \u0930\u0942\u092A \u092E\u0947\u0902 \u0906\u092A \u092A\u094D\u0930\u0924\u093F \u0918\u0902\u091F\u0947 \u091C\u094B \u0936\u0941\u0932\u094D\u0915 \u0932\u0947\u0924\u0947 \u0939\u0948\u0902, \u0909\u0938\u0947 \u0905\u0928\u0941\u092E\u093E\u0928\u093F\u0924 \u0936\u0941\u0926\u094D\u0927 \u0906\u092F \u0938\u0939\u093F\u0924, \u0938\u092E\u0915\u0915\u094D\u0937 \u0915\u0930\u094D\u092E\u091A\u093E\u0930\u0940 \u0935\u0947\u0924\u0928 \u092E\u0947\u0902 \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u093F\u0924 \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "employment-settlement-colombia": {
        title: {
            es: "Calculadora de liquidación laboral Colombia 2026 | Liquidación",
            en: "Colombia Employment Settlement Calculator 2026 | Final Pay",
            hi: "\u0915\u094B\u0932\u092E\u094D\u092C\u093F\u092F\u093E \u0930\u094B\u091C\u0917\u093E\u0930 \u0928\u093F\u092A\u091F\u093E\u0928 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 2026 | \u0905\u0902\u0924\u093F\u092E \u0935\u0947\u0924\u0928"
        },
        description: {
            es: "Calcula cuánto equivale tu liquidación laboral en Colombia con cesantías, prima, vacaciones, salario pendiente e indemnización si aplica.",
            en: "Estimate a Colombia employment settlement with severance, service bonus, vacation, pending salary, and dismissal compensation when applicable.",
            hi: "\u091C\u092C \u092D\u0940 \u0932\u093E\u0917\u0942 \u0939\u094B, \u0935\u093F\u091A\u094D\u091B\u0947\u0926, \u0938\u0947\u0935\u093E \u092C\u094B\u0928\u0938, \u0905\u0935\u0915\u093E\u0936, \u0932\u0902\u092C\u093F\u0924 \u0935\u0947\u0924\u0928 \u0914\u0930 \u092C\u0930\u094D\u0916\u093E\u0938\u094D\u0924\u0917\u0940 \u092E\u0941\u0906\u0935\u091C\u0947 \u0915\u0947 \u0938\u093E\u0925 \u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E \u0930\u094B\u091C\u0917\u093E\u0930 \u0938\u092E\u091D\u094C\u0924\u0947 \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u090F\u0902\u0964"
        }
    },
    "social-benefits-colombia": {
        title: {
            es: "Calculadora de prestaciones sociales Colombia 2026 | Cesantías y prima",
            en: "Colombia Social Benefits Calculator 2026 | Severance and Bonus",
            hi: "\u0915\u094B\u0932\u092E\u094D\u092C\u093F\u092F\u093E \u0938\u093E\u092E\u093E\u091C\u093F\u0915 \u0932\u093E\u092D \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 2026 | \u0935\u093F\u091A\u094D\u091B\u0947\u0926 \u0914\u0930 \u092C\u094B\u0928\u0938"
        },
        description: {
            es: "Calcula prestaciones sociales en Colombia con salario mensual bruto, fechas, cesantías, intereses, prima de servicios y vacaciones causadas.",
            en: "Calculate Colombia social benefits from gross monthly salary and dates, including severance, interest, service bonus, and accrued vacation.",
            hi: "\u0938\u0915\u0932 \u092E\u093E\u0938\u093F\u0915 \u0935\u0947\u0924\u0928 \u0914\u0930 \u0924\u093F\u0925\u093F\u092F\u094B\u0902 \u0938\u0947 \u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E \u0915\u0947 \u0938\u093E\u092E\u093E\u091C\u093F\u0915 \u0932\u093E\u092D\u094B\u0902 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902, \u091C\u093F\u0938\u092E\u0947\u0902 \u0935\u093F\u091A\u094D\u091B\u0947\u0926, \u092C\u094D\u092F\u093E\u091C, \u0938\u0947\u0935\u093E \u092C\u094B\u0928\u0938 \u0914\u0930 \u0905\u0930\u094D\u091C\u093F\u0924 \u0905\u0935\u0915\u093E\u0936 \u0936\u093E\u092E\u093F\u0932 \u0939\u0948\u0902\u0964"
        }
    },
    "credit-interest": {
        title: {
            es: "Calculadora de intereses de crédito online | Tools Platforms",
            en: "Online Credit Interest Calculator | Tools Platforms",
            hi: "\u0911\u0928\u0932\u093E\u0907\u0928 \u0915\u094D\u0930\u0947\u0921\u093F\u091F \u092C\u094D\u092F\u093E\u091C \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 | \u0909\u092A\u0915\u0930\u0923 \u092A\u094D\u0932\u0947\u091F\u092B\u093E\u0930\u094D\u092E"
        },
        description: {
            es: "Calcula intereses de un crédito por monto, tasa anual, plazo en meses y tipo de interés para estimar cuánto pagarías en total.",
            en: "Calculate credit interest by amount, annual rate, term in months, and interest type to estimate how much you would pay in total.",
            hi: "\u092F\u0939 \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0915\u093F \u0906\u092A \u0915\u0941\u0932 \u0915\u093F\u0924\u0928\u093E \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u0930\u0947\u0902\u0917\u0947, \u0930\u093E\u0936\u093F, \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0926\u0930, \u092E\u0939\u0940\u0928\u094B\u0902 \u092E\u0947\u0902 \u0905\u0935\u0927\u093F \u0914\u0930 \u092C\u094D\u092F\u093E\u091C \u092A\u094D\u0930\u0915\u093E\u0930 \u0915\u0947 \u0906\u0927\u093E\u0930 \u092A\u0930 \u0915\u094D\u0930\u0947\u0921\u093F\u091F \u092C\u094D\u092F\u093E\u091C \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "loan-payment": {
        title: {
            es: "Calculadora de cuota de préstamo online | Tools Platforms",
            en: "Online Loan Payment Calculator | Tools Platforms",
            hi: "\u0911\u0928\u0932\u093E\u0907\u0928 \u090B\u0923 \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 | \u0909\u092A\u0915\u0930\u0923 \u092A\u094D\u0932\u0947\u091F\u092B\u093E\u0930\u094D\u092E"
        },
        description: {
            es: "Calcula la cuota mensual de un préstamo con monto, tasa anual o mensual y plazo en meses, más intereses y total estimado.",
            en: "Calculate a loan's monthly payment using amount, annual or monthly rate, and term in months, plus estimated interest and total paid.",
            hi: "\u0930\u093E\u0936\u093F, \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u092F\u093E \u092E\u093E\u0938\u093F\u0915 \u0926\u0930 \u0914\u0930 \u092E\u0939\u0940\u0928\u094B\u0902 \u092E\u0947\u0902 \u0905\u0935\u0927\u093F, \u0938\u093E\u0925 \u0939\u0940 \u0905\u0928\u0941\u092E\u093E\u0928\u093F\u0924 \u092C\u094D\u092F\u093E\u091C \u0914\u0930 \u0915\u0941\u0932 \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0915\u0947 \u090B\u0923 \u0915\u0947 \u092E\u093E\u0938\u093F\u0915 \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "salary-increase": {
        title: {
            es: "Calculadora de aumento salarial | Bruto y neto",
            en: "Pay Increase Calculator | Net and Gross Raise",
            hi: "\u0935\u0947\u0924\u0928 \u0935\u0943\u0926\u094D\u0927\u093F \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 | \u0936\u0941\u0926\u094D\u0927 \u0914\u0930 \u0938\u0915\u0932 \u0935\u0943\u0926\u094D\u0927\u093F"
        },
        description: {
            es: "Calcula cómo queda tu salario después de un aumento porcentual. Estima el nuevo sueldo bruto, neto con descuentos Colombia, valor del aumento y diferencia anual.",
            en: "Use this pay increase calculator to estimate salary after a raise: new gross pay, Colombia net salary with deductions, increase amount, and annual difference.",
            hi: "\u092A\u094D\u0930\u0924\u093F\u0936\u0924 \u0935\u0943\u0926\u094D\u0927\u093F \u0915\u0947 \u092C\u093E\u0926 \u0905\u092A\u0928\u0947 \u0935\u0947\u0924\u0928 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902\u0964 \u0928\u090F \u0938\u0915\u0932 \u0935\u0947\u0924\u0928, \u0915\u091F\u094C\u0924\u093F\u092F\u094B\u0902, \u0935\u0943\u0926\u094D\u0927\u093F \u0930\u093E\u0936\u093F \u0914\u0930 \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0905\u0902\u0924\u0930 \u0915\u0947 \u0938\u093E\u0925 \u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E \u0936\u0941\u0926\u094D\u0927 \u0935\u0947\u0924\u0928 \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u090F\u0902\u0964"
        }
    },
    "cop-usd": {
        title: {
            es: "Conversor COP a USD | Pesos colombianos a dólares",
            en: "COP to USD Converter with Reference Rate | Tools Platforms",
            hi: "\u0938\u0902\u0926\u0930\u094D\u092D \u0926\u0930 \u0915\u0947 \u0938\u093E\u0925 \u0938\u0940\u0913\u092A\u0940 \u0938\u0947 \u092F\u0942\u090F\u0938\u0921\u0940 \u0915\u0928\u0935\u0930\u094D\u091F\u0930 | \u0909\u092A\u0915\u0930\u0923 \u092A\u094D\u0932\u0947\u091F\u092B\u093E\u0930\u094D\u092E"
        },
        description: {
            es: "Convierte pesos colombianos a dólares y dólares a pesos con tasa de referencia. Calcula COP a USD, USD a COP y el valor aproximado de cambio.",
            en: "Convert Colombian pesos to US dollars and back with a reference rate. Calculate COP to USD, USD to COP, and estimated exchange value.",
            hi: "\u0938\u0902\u0926\u0930\u094D\u092D \u0935\u093F\u0928\u093F\u092E\u092F \u0926\u0930 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0915\u0947 \u0915\u094B\u0932\u092E\u094D\u092C\u093F\u092F\u093E\u0908 \u092A\u0947\u0938\u094B\u0938 \u0915\u094B \u0905\u092E\u0947\u0930\u093F\u0915\u0940 \u0921\u0949\u0932\u0930 \u0914\u0930 \u0935\u093E\u092A\u0938 \u092E\u0947\u0902 \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u093F\u0924 \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "worked-hours": {
        title: {
            es: "Calculadora de horas trabajadas | Sumar horas de trabajo",
            en: "Worked Hours Calculator | Add Work Hours Online",
            hi: "\u0915\u093E\u092E \u0915\u0947 \u0918\u0902\u091F\u0947 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 | \u0915\u093E\u0930\u094D\u092F \u0915\u0947 \u0918\u0902\u091F\u0947 \u0911\u0928\u0932\u093E\u0907\u0928 \u091C\u094B\u0921\u093C\u0947\u0902"
        },
        description: {
            es: "Calcula y suma horas trabajadas por día, turno o semana. Sirve para sumar horas de trabajo, calcular jornadas laborales y ver el tiempo total.",
            en: "Calculate and add worked hours by day, shift, or week. Useful as a worked hours calculator, time worked calculator, and time card helper.",
            hi: "\u0926\u093F\u0928, \u092A\u093E\u0932\u0940 \u092F\u093E \u0938\u092A\u094D\u0924\u093E\u0939 \u0915\u0947 \u0905\u0928\u0941\u0938\u093E\u0930 \u0915\u093E\u092E \u0915\u0947 \u0918\u0902\u091F\u094B\u0902 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902 \u0914\u0930 \u091C\u094B\u0921\u093C\u0947\u0902\u0964 \u0915\u093E\u092E \u0915\u0947 \u0918\u0902\u091F\u0947, \u0936\u094D\u0930\u092E \u0938\u092E\u092F \u0914\u0930 \u0915\u0941\u0932 \u0938\u092E\u092F \u091F\u094D\u0930\u0948\u0915\u093F\u0902\u0917 \u0915\u0947 \u0932\u093F\u090F \u0909\u092A\u092F\u094B\u0917\u0940\u0964"
        }
    },
    "freelance-rate": {
        title: {
            es: "Calculadora de cuánto cobrar freelance | Tarifa por hora",
            en: "Freelance Rate Calculator | Hourly Rate",
            hi: "\u092B\u094D\u0930\u0940\u0932\u093E\u0902\u0938 \u0930\u0947\u091F \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 | \u092A\u094D\u0930\u0924\u093F \u0918\u0902\u091F\u093E \u0926\u0930"
        },
        description: {
            es: "Calcula cuánto cobrar como freelance por hora, día, semana o mes según tu ingreso deseado, días y horas de trabajo.",
            en: "Calculate how much to charge as a freelancer per hour, day, week, or month based on income target, work days, and hours.",
            hi: "\u0906\u092F \u0932\u0915\u094D\u0937\u094D\u092F, \u0915\u093E\u0930\u094D\u092F \u0926\u093F\u0935\u0938 \u0914\u0930 \u0918\u0902\u091F\u094B\u0902 \u0915\u0947 \u0906\u0927\u093E\u0930 \u092A\u0930 \u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902 \u0915\u093F \u090F\u0915 \u092B\u094D\u0930\u0940\u0932\u093E\u0902\u0938\u0930 \u0915\u0947 \u0930\u0942\u092A \u092E\u0947\u0902 \u092A\u094D\u0930\u0924\u093F \u0918\u0902\u091F\u0947, \u0926\u093F\u0928, \u0938\u092A\u094D\u0924\u093E\u0939 \u092F\u093E \u092E\u0939\u0940\u0928\u0947 \u092E\u0947\u0902 \u0915\u093F\u0924\u0928\u093E \u0936\u0941\u0932\u094D\u0915 \u0932\u093F\u092F\u093E \u091C\u093E\u090F\u0917\u093E\u0964"
        }
    },
    "days-between-dates": {
        title: {
            es: "Contador de días entre fechas | Calculador de días calendario",
            en: "Days Between Dates Calculator Online | Date Counter",
            hi: "\u0924\u093F\u0925\u093F\u092F\u094B\u0902 \u0915\u0947 \u092C\u0940\u091A \u0915\u0947 \u0926\u093F\u0928 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 \u0911\u0928\u0932\u093E\u0907\u0928 | \u0926\u093F\u0928\u093E\u0902\u0915 \u0915\u093E\u0909\u0902\u091F\u0930"
        },
        description: {
            es: "Cuenta días calendario entre dos fechas para trámites, viajes, entregas o planeación. Incluye semanas completas y días restantes.",
            en: "Count calendar days between two dates for paperwork, trips, deliveries, or planning. Includes full weeks and remaining days.",
            hi: "\u0915\u093E\u0917\u091C\u0940 \u0915\u093E\u0930\u094D\u0930\u0935\u093E\u0908, \u092F\u093E\u0924\u094D\u0930\u093E\u0913\u0902, \u0921\u093F\u0932\u0940\u0935\u0930\u0940 \u092F\u093E \u092F\u094B\u091C\u0928\u093E \u0915\u0947 \u0932\u093F\u090F \u0926\u094B \u0924\u093F\u0925\u093F\u092F\u094B\u0902 \u0915\u0947 \u092C\u0940\u091A \u0915\u0948\u0932\u0947\u0902\u0921\u0930 \u0926\u093F\u0928\u094B\u0902 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902\u0964 \u0907\u0938\u092E\u0947\u0902 \u092A\u0942\u0930\u0947 \u0938\u092A\u094D\u0924\u093E\u0939 \u0914\u0930 \u0936\u0947\u0937 \u0926\u093F\u0928 \u0936\u093E\u092E\u093F\u0932 \u0939\u0948\u0902\u0964"
        }
    },
    "weeks-between-dates": {
        title: {
            es: "Calculadora de semanas entre fechas | Semanas y dias",
            en: "Weeks Between Dates Calculator Online | Weeks and Days",
            hi: "\u0924\u093F\u0925\u093F\u092F\u094B\u0902 \u0915\u0947 \u092C\u0940\u091A \u0938\u092A\u094D\u0924\u093E\u0939 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 \u0911\u0928\u0932\u093E\u0907\u0928 | \u0938\u092A\u094D\u0924\u093E\u0939 \u0914\u0930 \u0926\u093F\u0928"
        },
        description: {
            es: "Calcula cuantas semanas hay entre dos fechas. Muestra semanas aproximadas, semanas completas, dias restantes y dias calendario.",
            en: "Calculate how many weeks are between two dates. See approximate weeks, full weeks, remaining days, and calendar days.",
            hi: "\u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902 \u0915\u093F \u0926\u094B \u0924\u093F\u0925\u093F\u092F\u094B\u0902 \u0915\u0947 \u092C\u0940\u091A \u0915\u093F\u0924\u0928\u0947 \u0938\u092A\u094D\u0924\u093E\u0939 \u0939\u0948\u0902\u0964 \u0905\u0928\u0941\u092E\u093E\u0928\u093F\u0924 \u0938\u092A\u094D\u0924\u093E\u0939, \u092A\u0942\u0930\u094D\u0923 \u0938\u092A\u094D\u0924\u093E\u0939, \u0936\u0947\u0937 \u0926\u093F\u0928 \u0914\u0930 \u0915\u0948\u0932\u0947\u0902\u0921\u0930 \u0926\u093F\u0928 \u0926\u0947\u0916\u0947\u0902\u0964"
        }
    },
    "days-until-date": {
        title: {
            es: "Cuántos días faltan para una fecha | Calculadora de días",
            en: "Days Until Date Calculator | Days Till Calculator",
            hi: "\u0926\u093F\u0928\u093E\u0902\u0915 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 \u0924\u0915 \u0915\u0947 \u0926\u093F\u0928 | \u0926\u093F\u0928 \u092C\u091A\u0947 \u0939\u0948\u0902 \u0915\u093E\u0909\u0902\u091F\u0930"
        },
        description: {
            es: "Calcula cuántos días faltan para una fecha, evento, entrega o plazo. Muestra días calendario, semanas completas y días restantes.",
            en: "Calculate how many days are left until a date, event, delivery, or deadline with this days until date calculator, including full weeks and remaining days.",
            hi: "\u0917\u093F\u0928\u0947\u0902 \u0915\u093F \u0915\u093F\u0938\u0940 \u0924\u093E\u0930\u0940\u0916, \u0918\u091F\u0928\u093E, \u0921\u093F\u0932\u0940\u0935\u0930\u0940 \u092F\u093E \u0938\u092E\u092F \u0938\u0940\u092E\u093E \u0924\u0915 \u0915\u093F\u0924\u0928\u0947 \u0926\u093F\u0928 \u092C\u091A\u0947 \u0939\u0948\u0902\u0964 \u0915\u0948\u0932\u0947\u0902\u0921\u0930 \u0915\u0947 \u0926\u093F\u0928, \u092A\u0942\u0930\u0947 \u0938\u092A\u094D\u0924\u093E\u0939 \u0914\u0930 \u0936\u0947\u0937 \u0926\u093F\u0928 \u0926\u0947\u0916\u0947\u0902\u0964"
        }
    },
    "exact-age": {
        title: {
            es: "Calculadora de edad exacta online | Años, meses y días",
            en: "Exact Age Calculator Online | Years, Months, Days",
            hi: "\u0938\u091F\u0940\u0915 \u0906\u092F\u0941 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 \u0911\u0928\u0932\u093E\u0907\u0928 | \u0938\u093E\u0932, \u092E\u0939\u0940\u0928\u0947, \u0926\u093F\u0928"
        },
        description: {
            es: "Calcula edad exacta desde una fecha de nacimiento en años, meses y días, con meses totales, días totales y próximo cumpleaños.",
            en: "Calculate exact age from a birth date in years, months, and days, with total months, total days, and next birthday.",
            hi: "\u091C\u0928\u094D\u092E\u0924\u093F\u0925\u093F \u0938\u0947 \u0935\u0930\u094D\u0937\u094B\u0902, \u092E\u0939\u0940\u0928\u094B\u0902 \u0914\u0930 \u0926\u093F\u0928\u094B\u0902 \u092E\u0947\u0902, \u0915\u0941\u0932 \u092E\u0939\u0940\u0928\u094B\u0902, \u0915\u0941\u0932 \u0926\u093F\u0928\u094B\u0902 \u0914\u0930 \u0905\u0917\u0932\u0947 \u091C\u0928\u094D\u092E\u0926\u093F\u0928 \u0915\u0947 \u0938\u093E\u0925 \u0938\u091F\u0940\u0915 \u0906\u092F\u0941 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "unit-converter": {
        title: {
            es: "Conversor de unidades online | kg, libras, km y millas",
            en: "Online Unit Converter | kg to lb, km to Miles",
            hi: "\u0911\u0928\u0932\u093E\u0907\u0928 \u092F\u0942\u0928\u093F\u091F \u0915\u0928\u094D\u0935\u0930\u094D\u091F\u0930 | \u0915\u093F\u0932\u094B\u0917\u094D\u0930\u093E\u092E \u0938\u0947 \u092A\u094C\u0902\u0921, \u0915\u093F\u092E\u0940 \u0938\u0947 \u092E\u0940\u0932"
        },
        description: {
            es: "Convierte unidades de longitud, peso, masa y temperatura: kilogramos, libras, kilómetros, millas, metros, centímetros y grados.",
            en: "Convert length, mass, weight, and temperature units: kilograms, pounds, kilometers, miles, meters, centimeters, and degrees.",
            hi: "\u0932\u0902\u092C\u093E\u0908, \u0926\u094D\u0930\u0935\u094D\u092F\u092E\u093E\u0928, \u0935\u091C\u0928 \u0914\u0930 \u0924\u093E\u092A\u092E\u093E\u0928 \u0907\u0915\u093E\u0907\u092F\u094B\u0902 \u0915\u094B \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u093F\u0924 \u0915\u0930\u0947\u0902: \u0915\u093F\u0932\u094B\u0917\u094D\u0930\u093E\u092E, \u092A\u093E\u0909\u0902\u0921, \u0915\u093F\u0932\u094B\u092E\u0940\u091F\u0930, \u092E\u0940\u0932, \u092E\u0940\u091F\u0930, \u0938\u0947\u0902\u091F\u0940\u092E\u0940\u091F\u0930 \u0914\u0930 \u0921\u093F\u0917\u094D\u0930\u0940\u0964"
        }
    },
    "text-case-converter": {
        title: {
            es: "Convertidor de mayúsculas y minúsculas | Texto online",
            en: "Lower Case to Upper Case Converter | Capital Letters",
            hi: "\u0905\u092A\u0930\u0915\u0947\u0938 \u0914\u0930 \u0932\u094B\u0905\u0930\u0915\u0947\u0938 \u0915\u0928\u0935\u0930\u094D\u091F\u0930 | \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u0947\u0938"
        },
        description: {
            es: "Convierte texto a mayúsculas, minúsculas, capitalizado o tipo oración. Pasa de minúsculas a mayúsculas y de mayúsculas a minúsculas rápido.",
            en: "Convert lower case to upper case, uppercase to lowercase, title case, or sentence case. Use it as a capital letter converter for clean text.",
            hi: "\u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u094B \u0905\u092A\u0930\u0915\u0947\u0938, \u0932\u094B\u0905\u0930\u0915\u0947\u0938, \u091F\u093E\u0907\u091F\u0932 \u0915\u0947\u0938 \u092F\u093E \u0935\u093E\u0915\u094D\u092F \u0915\u0947\u0938 \u092E\u0947\u0902 \u092C\u0926\u0932\u0947\u0902\u0964 \u0905\u092A\u0928\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u094B \u0936\u0940\u0918\u094D\u0930\u0924\u093E \u0938\u0947 \u092B\u093C\u0949\u0930\u094D\u092E\u0947\u091F \u0915\u0930\u0947\u0902 \u0914\u0930 \u0938\u093E\u092B\u093C \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "duplicate-counter": {
        title: {
            es: "Contador de duplicados online | Valores repetidos",
            en: "Count Duplicates Online | Duplicate & Unique Counter",
            hi: "\u0921\u0941\u092A\u094D\u0932\u0940\u0915\u0947\u091F \u0915\u093E\u0909\u0902\u091F\u0930 \u0911\u0928\u0932\u093E\u0907\u0928 | \u0926\u094B\u0939\u0930\u093E\u090F \u0917\u090F \u092E\u093E\u0928\u094B\u0902 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902"
        },
        description: {
            es: "Cuenta duplicados online en listas, columnas o textos. Encuentra valores repetidos, únicos, total de líneas y ocurrencias por cada valor.",
            en: "Count duplicates online from any list, column, or text. Find repeated values, count unique values online, total lines, and occurrences for each item.",
            hi: "\u0915\u093F\u0938\u0940 \u0938\u0942\u091A\u0940 \u092E\u0947\u0902 \u0921\u0941\u092A\u094D\u0932\u093F\u0915\u0947\u091F \u092E\u093E\u0928\u094B\u0902 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902, \u092A\u094D\u0930\u0924\u094D\u092F\u0947\u0915 \u092E\u093E\u0928 \u0915\u0947 \u0932\u093F\u090F \u0905\u0926\u094D\u0935\u093F\u0924\u0940\u092F \u092E\u093E\u0928, \u090F\u0915 \u0935\u093F\u0936\u093F\u0937\u094D\u091F \u0938\u0942\u091A\u0940, \u0915\u0941\u0932 \u092A\u0902\u0915\u094D\u0924\u093F\u092F\u093E\u0901 \u0914\u0930 \u0918\u091F\u0928\u093E\u090F\u0901 \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "remove-extra-spaces": {
        title: {
            es: "Eliminar espacios extra online | Limpiar texto",
            en: "Remove Extra Spaces Online | Clean Text",
            hi: "\u0905\u0924\u093F\u0930\u093F\u0915\u094D\u0924 \u0930\u093F\u0915\u094D\u0924 \u0938\u094D\u0925\u093E\u0928 \u0911\u0928\u0932\u093E\u0907\u0928 \u0939\u091F\u093E\u090F\u0901 | \u0938\u093E\u092B\u093C \u092A\u093E\u0920"
        },
        description: {
            es: "Limpia espacios dobles, tabs, espacios al inicio y final o líneas vacías en textos, listas y columnas copiadas.",
            en: "Clean double spaces, tabs, leading and trailing spaces, or blank lines from text, lists, and copied columns.",
            hi: "\u092A\u093E\u0920, \u0938\u0942\u091A\u093F\u092F\u094B\u0902 \u0914\u0930 \u0915\u0949\u092A\u0940 \u0915\u093F\u090F \u0917\u090F \u0938\u094D\u0924\u0902\u092D\u094B\u0902 \u0938\u0947 \u0926\u094B\u0939\u0930\u0947 \u0938\u094D\u0925\u093E\u0928, \u091F\u0948\u092C, \u0905\u0917\u094D\u0930\u0923\u0940 \u0914\u0930 \u0905\u0928\u0941\u0917\u093E\u092E\u0940 \u0938\u094D\u0925\u093E\u0928, \u092F\u093E \u0930\u093F\u0915\u094D\u0924 \u092A\u0902\u0915\u094D\u0924\u093F\u092F\u093E\u0901 \u0938\u093E\u092B\u093C \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "remove-accents": {
        title: {
            es: "Eliminar acentos en español online | Texto sin tildes",
            en: "Remove Spanish Accents Online | Text Without Accents",
            hi: "\u0911\u0928\u0932\u093E\u0907\u0928 \u0938\u094D\u092A\u0948\u0928\u093F\u0936 \u090F\u0915\u094D\u0938\u0947\u0902\u091F \u0939\u091F\u093E\u090F\u0901 | \u092C\u093F\u0928\u093E \u0909\u091A\u094D\u091A\u093E\u0930\u0923 \u0915\u0947 \u092A\u093E\u0920"
        },
        description: {
            es: "Elimina tildes, diéresis y acentos de un texto en el navegador. Conserva la ñ o conviértela en n si lo necesitas.",
            en: "Remove accents, diacritics, and umlauts from text in your browser. Preserve ñ or convert it to n when needed.",
            hi: "\u0905\u092A\u0928\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0938\u0947 \u090F\u0915\u094D\u0938\u0947\u0902\u091F, \u0921\u093E\u092F\u0915\u094D\u0930\u093F\u091F\u093F\u0915\u094D\u0938 \u0914\u0930 \u0909\u092E\u094D\u0932\u0949\u091F \u0939\u091F\u093E\u090F\u0901\u0964 \u00F1 \u0915\u094B \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u0930\u0916\u0947\u0902 \u092F\u093E \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u092A\u0921\u093C\u0928\u0947 \u092A\u0930 \u0907\u0938\u0947 n \u092E\u0947\u0902 \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u093F\u0924 \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "secure-password-generator": {
        title: {
            es: "Generador de contraseñas seguras online | Password generator",
            en: "Secure Password Generator Online | Random Passwords",
            hi: "\u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u091C\u0928\u0930\u0947\u091F\u0930 \u0911\u0928\u0932\u093E\u0907\u0928 | \u092F\u093E\u0926\u0943\u091A\u094D\u091B\u093F\u0915 \u092A\u093E\u0938\u0935\u0930\u094D\u0921"
        },
        description: {
            es: "Genera contraseñas aleatorias y seguras con longitud personalizada, símbolos, números, mayúsculas y minúsculas.",
            en: "Generate secure random passwords with custom length, symbols, numbers, uppercase, and lowercase letters.",
            hi: "\u0915\u0938\u094D\u091F\u092E \u0932\u0902\u092C\u093E\u0908, \u092A\u094D\u0930\u0924\u0940\u0915\u094B\u0902, \u0938\u0902\u0916\u094D\u092F\u093E\u0913\u0902, \u0905\u092A\u0930\u0915\u0947\u0938 \u0914\u0930 \u0932\u094B\u0905\u0930\u0915\u0947\u0938 \u0905\u0915\u094D\u0937\u0930\u094B\u0902 \u0915\u0947 \u0938\u093E\u0925 \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u092F\u093E\u0926\u0943\u091A\u094D\u091B\u093F\u0915 \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u092C\u0928\u093E\u090F\u0902\u0964"
        }
    },
    "random-text-generator": {
        title: {
            es: "Generador de texto aleatorio online | Texto de prueba",
            en: "Random Text Generator Online | Sample Text",
            hi: "\u0930\u0948\u0902\u0921\u092E \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u091C\u0947\u0928\u0930\u0947\u091F\u0930 \u0911\u0928\u0932\u093E\u0907\u0928 | \u0928\u092E\u0942\u0928\u093E \u092A\u093E\u0920"
        },
        description: {
            es: "Genera texto aleatorio online con palabras, frases, párrafos o listas. Elige texto natural o Lorem ipsum en español e inglés.",
            en: "Generate random text online with words, sentences, paragraphs, or lists. Choose natural text or Lorem ipsum in English and Spanish.",
            hi: "\u0936\u092C\u094D\u0926\u094B\u0902, \u0935\u093E\u0915\u094D\u092F\u094B\u0902, \u0905\u0928\u0941\u091A\u094D\u091B\u0947\u0926\u094B\u0902 \u092F\u093E \u0938\u0942\u091A\u093F\u092F\u094B\u0902 \u0915\u0947 \u0938\u093E\u0925 \u0911\u0928\u0932\u093E\u0907\u0928 \u092F\u093E\u0926\u0943\u091A\u094D\u091B\u093F\u0915 \u092A\u093E\u0920 \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u0915\u0930\u0947\u0902\u0964 \u0905\u0902\u0917\u094D\u0930\u0947\u091C\u0940 \u0914\u0930 \u0938\u094D\u092A\u0947\u0928\u093F\u0936 \u092E\u0947\u0902 \u092A\u094D\u0930\u093E\u0915\u0943\u0924\u093F\u0915 \u092A\u093E\u0920 \u092F\u093E \u0932\u094B\u0930\u0947\u092E \u0907\u092A\u094D\u0938\u092E \u091A\u0941\u0928\u0947\u0902\u0964"
        }
    },
    "alphabetical-line-sorter": {
        title: {
            es: "Ordenador alfabético de líneas online | A-Z y Z-A",
            en: "Alphabetical Line Sorter Online | A-Z and Z-A",
            hi: "\u0935\u0930\u094D\u0923\u092E\u093E\u0932\u093E \u0915\u094D\u0930\u092E\u092C\u0926\u094D\u0927 \u0932\u093E\u0907\u0928 \u0938\u0949\u0930\u094D\u091F\u0930 \u0911\u0928\u0932\u093E\u0907\u0928 | \u090F-\u091C\u0947\u0921 \u0914\u0930 \u091C\u0947\u0921-\u090F"
        },
        description: {
            es: "Ordena líneas alfabéticamente online de A a Z o Z a A. Limpia espacios, elimina líneas vacías y quita duplicados si lo necesitas.",
            en: "Sort lines alphabetically online from A to Z or Z to A. Trim spaces, remove empty lines, and remove duplicates when needed.",
            hi: "A \u0938\u0947 Z \u092F\u093E Z \u0938\u0947 A \u0924\u0915 \u092A\u0902\u0915\u094D\u0924\u093F\u092F\u094B\u0902 \u0915\u094B \u0911\u0928\u0932\u093E\u0907\u0928 \u0935\u0930\u094D\u0923\u093E\u0928\u0941\u0915\u094D\u0930\u092E \u092E\u0947\u0902 \u0915\u094D\u0930\u092E\u092C\u0926\u094D\u0927 \u0915\u0930\u0947\u0902\u0964 \u0930\u093F\u0915\u094D\u0924 \u0938\u094D\u0925\u093E\u0928 \u091F\u094D\u0930\u093F\u092E \u0915\u0930\u0947\u0902, \u0916\u093E\u0932\u0940 \u092A\u0902\u0915\u094D\u0924\u093F\u092F\u093E\u0901 \u0939\u091F\u093E\u090F\u0901, \u0914\u0930 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u092A\u0921\u093C\u0928\u0947 \u092A\u0930 \u0921\u0941\u092A\u094D\u0932\u093F\u0915\u0947\u091F \u0939\u091F\u093E\u090F\u0901\u0964"
        }
    },
    "percentage-calculator": {
        title: {
            es: "Calculadora de porcentaje online | Descuentos y aumentos",
            en: "Percentage Calculator Online | Discounts and Increases",
            hi: "\u092A\u094D\u0930\u0924\u093F\u0936\u0924 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 \u0911\u0928\u0932\u093E\u0907\u0928 | \u091B\u0942\u091F \u0914\u0930 \u092C\u0922\u093C\u094B\u0924\u0930\u0940"
        },
        description: {
            es: "Calcula porcentajes online: cuánto es X% de un número, qué porcentaje representa un valor, aumentos, descuentos y diferencia porcentual.",
            en: "Calculate percentages online: X% of a number, what percentage a value represents, increases, discounts, and percentage change.",
            hi: "\u0911\u0928\u0932\u093E\u0907\u0928 \u092A\u094D\u0930\u0924\u093F\u0936\u0924 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902: \u0915\u093F\u0938\u0940 \u0938\u0902\u0916\u094D\u092F\u093E \u0915\u093E X%, \u0915\u094B\u0908 \u092E\u093E\u0928 \u0915\u093F\u0924\u0928\u0947 \u092A\u094D\u0930\u0924\u093F\u0936\u0924 \u0915\u094B \u0926\u0930\u094D\u0936\u093E\u0924\u093E \u0939\u0948, \u0935\u0943\u0926\u094D\u0927\u093F, \u091B\u0942\u091F \u0914\u0930 \u092A\u094D\u0930\u0924\u093F\u0936\u0924 \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u0928\u0964"
        }
    },
    "json-formatter": {
        title: {
            es: "Formateador JSON online | Validar y minificar JSON",
            en: "JSON Formatter Online | Validate and Minify JSON",
            hi: "JSON \u092B\u093C\u0949\u0930\u094D\u092E\u0947\u091F\u0930 \u0911\u0928\u0932\u093E\u0907\u0928 | JSON \u0915\u094B \u0938\u0924\u094D\u092F\u093E\u092A\u093F\u0924 \u0914\u0930 \u091B\u094B\u091F\u093E \u0915\u0930\u0947\u0902"
        },
        description: {
            es: "Formatea JSON online, valida su estructura y minifica código JSON en tu navegador sin enviarlo al servidor.",
            en: "Format JSON online, validate its structure, and minify JSON code in your browser without sending it to a server.",
            hi: "JSON \u0915\u094B \u0911\u0928\u0932\u093E\u0907\u0928 \u092A\u094D\u0930\u093E\u0930\u0942\u092A\u093F\u0924 \u0915\u0930\u0947\u0902, \u0907\u0938\u0915\u0940 \u0938\u0902\u0930\u091A\u0928\u093E \u0915\u094B \u092E\u093E\u0928\u094D\u092F \u0915\u0930\u0947\u0902, \u0914\u0930 JSON \u0915\u094B\u0921 \u0915\u094B \u0938\u0930\u094D\u0935\u0930 \u092A\u0930 \u092D\u0947\u091C\u0947 \u092C\u093F\u0928\u093E \u0905\u092A\u0928\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u091B\u094B\u091F\u093E \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "uuid-generator": {
        title: {
            es: "Generador UUID online | UUID v4 y desde texto",
            en: "UUID Generator Online | UUID v4 and From Text",
            hi: "\u092F\u0942\u092F\u0942\u0906\u0908\u0921\u0940 \u091C\u0947\u0928\u0930\u0947\u091F\u0930 \u0911\u0928\u0932\u093E\u0907\u0928 | UUID v4 \u0914\u0930 \u092A\u093E\u0920 \u0938\u0947"
        },
        description: {
            es: "Genera UUID v4 online en tu navegador o crea UUID mezclados con un texto base. Copia uno o varios identificadores al instante.",
            en: "Generate UUID v4 values online in your browser or create UUIDs mixed with base text. Copy one or many identifiers instantly.",
            hi: "\u0905\u092A\u0928\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 UUID v4 \u092E\u093E\u0928 \u0911\u0928\u0932\u093E\u0907\u0928 \u091C\u0947\u0928\u0930\u0947\u091F \u0915\u0930\u0947\u0902 \u092F\u093E \u092C\u0947\u0938 \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u0947 \u0938\u093E\u0925 \u092E\u093F\u0936\u094D\u0930\u093F\u0924 UUID \u092C\u0928\u093E\u090F\u0902\u0964 \u090F\u0915 \u092F\u093E \u0915\u0908 \u092A\u0939\u091A\u093E\u0928\u0915\u0930\u094D\u0924\u093E\u0913\u0902 \u0915\u094B \u0924\u0941\u0930\u0902\u0924 \u0915\u0949\u092A\u0940 \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "hash-generator": {
        title: {
            es: "Generador hash online | SHA-256, SHA-1 y SHA-512",
            en: "Hash Generator Online | SHA-256, SHA-1 and SHA-512",
            hi: "\u0939\u0948\u0936 \u091C\u0947\u0928\u0930\u0947\u091F\u0930 \u0911\u0928\u0932\u093E\u0907\u0928 | SHA-256, SHA-1 \u0914\u0930 SHA-512"
        },
        description: {
            es: "Genera hashes SHA-256, SHA-1, SHA-384 y SHA-512 online en tu navegador. Procesa texto completo o cada línea por separado.",
            en: "Generate SHA-256, SHA-1, SHA-384, and SHA-512 hashes online in your browser. Process full text or each line separately.",
            hi: "\u0905\u092A\u0928\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 SHA-256, SHA-1, SHA-384, \u0914\u0930 SHA-512 \u0939\u0948\u0936 \u0911\u0928\u0932\u093E\u0907\u0928 \u091C\u0947\u0928\u0930\u0947\u091F \u0915\u0930\u0947\u0902\u0964 \u092A\u0942\u0930\u094D\u0923 \u092A\u093E\u0920 \u092F\u093E \u092A\u094D\u0930\u0924\u094D\u092F\u0947\u0915 \u092A\u0902\u0915\u094D\u0924\u093F \u0915\u094B \u0905\u0932\u0917 \u0938\u0947 \u0938\u0902\u0938\u093E\u0927\u093F\u0924 \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "case-style-converter": {
        title: {
            es: "Convertidor camelCase, PascalCase y snake_case | Tools Platforms",
            en: "camelCase, PascalCase, and snake_case Converter | Tools Platforms",
            hi: "\u0915\u0948\u092E\u0932\u0915\u0947\u0938, \u092A\u093E\u0938\u094D\u0915\u0932\u0915\u0947\u0938, \u0914\u0930 \u0938\u094D\u0928\u0947\u0915_\u0915\u0947\u0938 \u0915\u0928\u0935\u0930\u094D\u091F\u0930 | \u0909\u092A\u0915\u0930\u0923 \u092A\u094D\u0932\u0947\u091F\u092B\u093E\u0930\u094D\u092E"
        },
        description: {
            es: "Convierte frases a camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE y otros estilos usados en código.",
            en: "Convert phrases to camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, and other code naming styles.",
            hi: "\u0935\u093E\u0915\u094D\u092F\u093E\u0902\u0936\u094B\u0902 \u0915\u094B \u0915\u0948\u092E\u0932\u0915\u0947\u0938, \u092A\u093E\u0938\u094D\u0915\u0932\u0915\u0947\u0938, \u0938\u094D\u0928\u0947\u0915_\u0915\u0947\u0938, \u0915\u092C\u093E\u092C-\u0915\u0947\u0938, CONSTANT_CASE \u0914\u0930 \u0905\u0928\u094D\u092F \u0915\u094B\u0921 \u0928\u093E\u092E\u0915\u0930\u0923 \u0936\u0948\u0932\u093F\u092F\u094B\u0902 \u092E\u0947\u0902 \u092C\u0926\u0932\u0947\u0902\u0964"
        }
    },
    "base64-converter": {
        title: {
            es: "Codificador y decodificador Base64 online | Tools Platforms",
            en: "Base64 Encoder and Decoder Online | Tools Platforms",
            hi: "\u092C\u0947\u093864 \u090F\u0928\u0915\u094B\u0921\u0930 \u0914\u0930 \u0921\u093F\u0915\u094B\u0921\u0930 \u0911\u0928\u0932\u093E\u0907\u0928 | \u0909\u092A\u0915\u0930\u0923 \u092A\u094D\u0932\u0947\u091F\u092B\u093E\u0930\u094D\u092E"
        },
        description: {
            es: "Codifica texto a Base64 o decodifica Base64 a texto online. Conversor Base64 con UTF-8, modo por líneas y formato URL-safe.",
            en: "Encode text to Base64 or decode Base64 to text online. Base64 converter with UTF-8, per-line mode, and URL-safe format.",
            hi: "\u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u094B \u092C\u0947\u093864 \u092A\u0930 \u090F\u0928\u0915\u094B\u0921 \u0915\u0930\u0947\u0902 \u092F\u093E \u092C\u0947\u093864 \u0915\u094B \u0911\u0928\u0932\u093E\u0907\u0928 \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u092E\u0947\u0902 \u0921\u0940\u0915\u094B\u0921 \u0915\u0930\u0947\u0902\u0964 \u092F\u0942\u091F\u0940\u090F\u092B-8, \u092A\u094D\u0930\u0924\u093F-\u092A\u0902\u0915\u094D\u0924\u093F \u092E\u094B\u0921 \u0914\u0930 \u092F\u0942\u0906\u0930\u090F\u0932-\u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u092A\u094D\u0930\u093E\u0930\u0942\u092A \u0915\u0947 \u0938\u093E\u0925 \u092C\u0947\u093864 \u0915\u0928\u0935\u0930\u094D\u091F\u0930\u0964"
        }
    },
    "html-preview": {
        title: {
            es: "Vista previa de HTML online | Vista segura",
            en: "Online HTML Preview | Safe Browser Preview",
            hi: "\u0911\u0928\u0932\u093E\u0907\u0928 HTML \u092A\u0942\u0930\u094D\u0935\u093E\u0935\u0932\u094B\u0915\u0928 | \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092A\u0942\u0930\u094D\u0935\u093E\u0935\u0932\u094B\u0915\u0928"
        },
        description: {
            es: "Pega código HTML y revisa cómo se renderiza en una vista previa segura. Elimina scripts, eventos inline y enlaces JavaScript en el navegador.",
            en: "Paste HTML code and see how it renders in a safe preview. Removes scripts, inline events, and javascript links in the browser.",
            hi: "HTML \u0915\u094B\u0921 \u091A\u093F\u092A\u0915\u093E\u090F\u0901 \u0914\u0930 \u0926\u0947\u0916\u0947\u0902 \u0915\u093F \u092F\u0939 \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u092A\u0942\u0930\u094D\u0935\u093E\u0935\u0932\u094B\u0915\u0928 \u092E\u0947\u0902 \u0915\u0948\u0938\u0947 \u092A\u094D\u0930\u0938\u094D\u0924\u0941\u0924 \u0939\u094B\u0924\u093E \u0939\u0948\u0964 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u0938\u094D\u0915\u094D\u0930\u093F\u092A\u094D\u091F, \u0907\u0928\u0932\u093E\u0907\u0928 \u0907\u0935\u0947\u0902\u091F \u0914\u0930 \u091C\u093E\u0935\u093E\u0938\u094D\u0915\u094D\u0930\u093F\u092A\u094D\u091F \u0932\u093F\u0902\u0915 \u0939\u091F\u093E \u0926\u0947\u0924\u093E \u0939\u0948\u0964"
        }
    },
    "html-formatter-minifier": {
        title: {
            es: "Formateador y minificador HTML online | Tools Platforms",
            en: "HTML Formatter and Minifier Online | Tools Platforms",
            hi: "HTML \u092B\u093C\u0949\u0930\u094D\u092E\u0947\u091F\u0930 \u0914\u0930 \u092E\u093F\u0928\u093F\u092B\u093C\u093E\u092F\u0930 \u0911\u0928\u0932\u093E\u0907\u0928 | \u0909\u092A\u0915\u0930\u0923 \u092A\u094D\u0932\u0947\u091F\u092B\u093E\u0930\u094D\u092E"
        },
        description: {
            es: "Formatea HTML online para leerlo mejor o minifica código HTML en el navegador. Herramienta local para limpiar comentarios y compactar marcado.",
            en: "Format HTML online for readability or minify HTML code in the browser. Local tool for cleaning comments and compacting markup.",
            hi: "\u092A\u0920\u0928\u0940\u092F\u0924\u093E \u0915\u0947 \u0932\u093F\u090F HTML \u0915\u094B \u0911\u0928\u0932\u093E\u0907\u0928 \u092B\u093C\u0949\u0930\u094D\u092E\u0947\u091F \u0915\u0930\u0947\u0902 \u092F\u093E \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 HTML \u0915\u094B\u0921 \u0915\u094B \u091B\u094B\u091F\u093E \u0915\u0930\u0947\u0902\u0964 \u091F\u093F\u092A\u094D\u092A\u0923\u093F\u092F\u094B\u0902 \u0915\u094B \u0938\u093E\u092B\u093C \u0915\u0930\u0928\u0947 \u0914\u0930 \u092E\u093E\u0930\u094D\u0915\u0905\u092A \u0915\u094B \u0938\u0902\u0915\u094D\u0937\u093F\u092A\u094D\u0924 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0938\u094D\u0925\u093E\u0928\u0940\u092F \u0909\u092A\u0915\u0930\u0923\u0964"
        }
    },
    "annual-salary": {
        title: {
            es: "Calculadora de salario anual Colombia | Ingreso anual",
            en: "Annual Salary Calculator (Colombia) | Yearly Income",
            hi: "\u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0935\u0947\u0924\u0928 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 (\u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E) | \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0906\u092F"
        },
        description: {
            es: "Calcula tu salario anual en Colombia con salario mensual bruto, auxilio de transporte, prima de servicios y descuentos estimados de salud y pensión.",
            en: "Calculate annual salary in Colombia with gross monthly salary, transportation allowance, service bonus, and estimated health and pension deductions.",
            hi: "\u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E \u092E\u0947\u0902 \u0938\u0915\u0932 \u092E\u093E\u0938\u093F\u0915 \u0935\u0947\u0924\u0928, \u092A\u0930\u093F\u0935\u0939\u0928 \u092D\u0924\u094D\u0924\u093E, \u0938\u0947\u0935\u093E \u092C\u094B\u0928\u0938 \u0914\u0930 \u0905\u0928\u0941\u092E\u093E\u0928\u093F\u0924 \u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F \u0914\u0930 \u092A\u0947\u0902\u0936\u0928 \u0915\u091F\u094C\u0924\u0940 \u0915\u0947 \u0938\u093E\u0925 \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0935\u0947\u0924\u0928 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "word-character-counter": {
        title: {
            es: "Contador de palabras, caracteres y líneas online",
            en: "Word, Character, and Line Counter Online",
            hi: "\u0936\u092C\u094D\u0926, \u091A\u0930\u093F\u0924\u094D\u0930 \u0914\u0930 \u0932\u093E\u0907\u0928 \u0915\u093E\u0909\u0902\u091F\u0930 \u0911\u0928\u0932\u093E\u0907\u0928"
        },
        description: {
            es: "Cuenta palabras, caracteres con y sin espacios, letras, números, líneas, párrafos, frases y tiempo de lectura de cualquier texto.",
            en: "Count words, characters with and without spaces, letters, numbers, lines, paragraphs, sentences, and reading time for any text.",
            hi: "\u0936\u092C\u094D\u0926\u094B\u0902, \u0930\u093F\u0915\u094D\u0924 \u0938\u094D\u0925\u093E\u0928 \u0935\u093E\u0932\u0947 \u0914\u0930 \u092C\u093F\u0928\u093E \u0930\u093F\u0915\u094D\u0924 \u0938\u094D\u0925\u093E\u0928 \u0935\u093E\u0932\u0947 \u0935\u0930\u094D\u0923\u094B\u0902, \u0905\u0915\u094D\u0937\u0930\u094B\u0902, \u0938\u0902\u0916\u094D\u092F\u093E\u0913\u0902, \u092A\u0902\u0915\u094D\u0924\u093F\u092F\u094B\u0902, \u092A\u0948\u0930\u093E\u0917\u094D\u0930\u093E\u092B\u094B\u0902, \u0935\u093E\u0915\u094D\u092F\u094B\u0902 \u0914\u0930 \u0915\u093F\u0938\u0940 \u092D\u0940 \u092A\u093E\u0920 \u0915\u0947 \u092A\u0922\u093C\u0928\u0947 \u0915\u0947 \u0938\u092E\u092F \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "find-replace-text": {
        title: {
            es: "Buscar y reemplazar texto online | Reemplazar palabras",
            en: "Find and Replace Text Online | Replace Words",
            hi: "\u0911\u0928\u0932\u093E\u0907\u0928 \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0922\u0942\u0902\u0922\u0947\u0902 \u0914\u0930 \u092C\u0926\u0932\u0947\u0902 | \u0936\u092C\u094D\u0926 \u092C\u0926\u0932\u0947\u0902"
        },
        description: {
            es: "Busca palabras o fragmentos en un texto y reemplázalos online. Opciones para distinguir mayúsculas y reemplazar solo palabras completas.",
            en: "Find words or fragments in text and replace them online. Options for case matching and whole-word replacement.",
            hi: "\u092A\u093E\u0920 \u092E\u0947\u0902 \u0936\u092C\u094D\u0926 \u092F\u093E \u0905\u0902\u0936 \u0922\u0942\u0902\u0922\u0947\u0902 \u0914\u0930 \u0909\u0928\u094D\u0939\u0947\u0902 \u0911\u0928\u0932\u093E\u0907\u0928 \u092C\u0926\u0932\u0947\u0902\u0964 \u0915\u0947\u0938 \u092E\u093F\u0932\u093E\u0928 \u0914\u0930 \u0938\u0902\u092A\u0942\u0930\u094D\u0923-\u0936\u092C\u094D\u0926 \u092A\u094D\u0930\u0924\u093F\u0938\u094D\u0925\u093E\u092A\u0928 \u0915\u0947 \u0932\u093F\u090F \u0935\u093F\u0915\u0932\u094D\u092A\u0964"
        }
    },
    "simple-cron-generator": {
        title: {
            es: "Generador de cron simple | Crear y explicar cron",
            en: "Simple Cron Generator | Create and Explain Cron",
            hi: "\u0938\u0930\u0932 \u0915\u094D\u0930\u0949\u0928 \u091C\u0947\u0928\u0930\u0947\u091F\u0930 | \u0915\u094D\u0930\u0949\u0928 \u092C\u0928\u093E\u090F\u0902 \u0914\u0930 \u0938\u092E\u091D\u093E\u090F\u0902"
        },
        description: {
            es: "Genera expresiones cron fáciles para tareas cada X minutos, por hora, diarias, semanales o mensuales, y explica cron de 5, 6 o 7 partes.",
            en: "Generate easy cron expressions for every X minutes, hourly, daily, weekly, or monthly tasks, and explain 5-, 6-, or 7-part cron syntax.",
            hi: "\u092A\u094D\u0930\u0924\u094D\u092F\u0947\u0915 \u090F\u0915\u094D\u0938 \u092E\u093F\u0928\u091F, \u092A\u094D\u0930\u0924\u093F \u0918\u0902\u091F\u093E, \u0926\u0948\u0928\u093F\u0915, \u0938\u093E\u092A\u094D\u0924\u093E\u0939\u093F\u0915 \u092F\u093E \u092E\u093E\u0938\u093F\u0915 \u0915\u093E\u0930\u094D\u092F\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0906\u0938\u093E\u0928 \u0915\u094D\u0930\u0949\u0928 \u0905\u092D\u093F\u0935\u094D\u092F\u0915\u094D\u0924\u093F \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u0915\u0930\u0947\u0902 \u0914\u0930 5, 6 \u092F\u093E 7-\u092D\u093E\u0917 \u0915\u094D\u0930\u0949\u0928 \u0938\u093F\u0902\u091F\u0948\u0915\u094D\u0938 \u0938\u092E\u091D\u093E\u090F\u0902\u0964"
        }
    },
    "resignation-letter-generator": {
        title: {
            es: "Generador de carta de renuncia online | Borrador editable",
            en: "Resignation Letter Generator Online | Editable Draft",
            hi: "\u0911\u0928\u0932\u093E\u0907\u0928 \u0924\u094D\u092F\u093E\u0917\u092A\u0924\u094D\u0930 \u091C\u0928\u0930\u0947\u091F\u0930 | \u0938\u0902\u092A\u093E\u0926\u0928 \u092F\u094B\u0917\u094D\u092F \u0921\u094D\u0930\u093E\u092B\u094D\u091F"
        },
        description: {
            es: "Genera una carta de renuncia formal, breve o agradecida con nombre, cargo, empresa, fechas y motivo opcional. Copia y edita el borrador.",
            en: "Generate a formal, brief, or grateful resignation letter with name, role, company, dates, and optional reason. Copy and edit the draft.",
            hi: "\u0928\u093E\u092E, \u092A\u0926, \u0915\u0902\u092A\u0928\u0940, \u0924\u093F\u0925\u093F\u092F\u094B\u0902 \u0914\u0930 \u0935\u0948\u0915\u0932\u094D\u092A\u093F\u0915 \u0915\u093E\u0930\u0923 \u0915\u0947 \u0938\u093E\u0925 \u0914\u092A\u091A\u093E\u0930\u093F\u0915, \u0938\u0902\u0915\u094D\u0937\u093F\u092A\u094D\u0924 \u092F\u093E \u0906\u092D\u093E\u0930\u0940 \u0924\u094D\u092F\u093E\u0917\u092A\u0924\u094D\u0930 \u092C\u0928\u093E\u090F\u0901\u0964 \u0921\u094D\u0930\u093E\u092B\u094D\u091F \u0915\u0949\u092A\u0940 \u0914\u0930 \u0938\u0902\u092A\u093E\u0926\u093F\u0924 \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "email-template-generator": {
        title: {
            es: "Creador de plantillas HTML de correo online",
            en: "HTML Email Template Generator Online",
            hi: "\u0911\u0928\u0932\u093E\u0907\u0928 HTML \u0908\u092E\u0947\u0932 \u091F\u0947\u092E\u094D\u092A\u0932\u0947\u091F \u091C\u0928\u0930\u0947\u091F\u0930"
        },
        description: {
            es: "Crea plantillas HTML de correo con dise\u00F1os, cabeceras, cuerpo, bot\u00F3n, footer, colores, marca, vista previa y copia r\u00E1pida.",
            en: "Create HTML email templates with layouts, headers, body styles, button, footer, colors, branding, preview, and quick copy.",
            hi: "\u0921\u093F\u091C\u093C\u093E\u0907\u0928, \u0939\u0947\u0921\u0930, \u092C\u0949\u0921\u0940, \u092C\u091F\u0928, \u092B\u0941\u091F\u0930, \u0930\u0902\u0917, \u092C\u094D\u0930\u093E\u0902\u0921, \u092A\u094D\u0930\u0940\u0935\u094D\u092F\u0942 \u0914\u0930 \u0915\u0949\u092A\u0940 \u0915\u0947 \u0938\u093E\u0925 HTML \u0908\u092E\u0947\u0932 \u091F\u0947\u092E\u094D\u092A\u0932\u0947\u091F \u092C\u0928\u093E\u090F\u0901\u0964"
        }
    }
};
export const homeSeo: SeoCopy & {
    canonicalPath: string;
} = {
    title: {
        es: "Tools Platforms | Calculadoras y herramientas online",
        en: "Tools Platforms | Online calculators and utilities",
        hi: "\u0909\u092A\u0915\u0930\u0923 \u092A\u094D\u0932\u0947\u091F\u092B\u093E\u0930\u094D\u092E | \u0911\u0928\u0932\u093E\u0907\u0928 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 \u0914\u0930 \u0909\u092A\u092F\u094B\u0917\u093F\u0924\u093E\u090F\u0901"
    },
    description: {
        es: "Herramientas online para resolver cálculos de salario, liquidación, créditos, trabajo, fechas, conversiones, texto y tareas prácticas.",
        en: "Online tools for salaries, settlements, loans, work hours, dates, conversions, text utilities, and practical tasks.",
        hi: "\u0935\u0947\u0924\u0928, \u0928\u093F\u092A\u091F\u093E\u0928, \u090B\u0923, \u0915\u093E\u092E \u0915\u0947 \u0918\u0902\u091F\u0947, \u0924\u093F\u0925\u093F\u092F\u093E\u0902, \u0930\u0942\u092A\u093E\u0902\u0924\u0930\u0923, \u092A\u093E\u0920 \u0909\u092A\u092F\u094B\u0917\u093F\u0924\u093E\u090F\u0902 \u0914\u0930 \u0935\u094D\u092F\u093E\u0935\u0939\u093E\u0930\u093F\u0915 \u0915\u093E\u0930\u094D\u092F\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0911\u0928\u0932\u093E\u0907\u0928 \u0909\u092A\u0915\u0930\u0923\u0964"
    },
    canonicalPath: "/"
};
export const legalSeo: Record<"privacy" | "terms", SeoCopy & {
    canonicalPath: string;
}> = {
    privacy: {
        title: {
            es: "Política de privacidad | Tools Platforms",
            en: "Privacy Policy | Tools Platforms",
            hi: "\u0917\u094B\u092A\u0928\u0940\u092F\u0924\u093E \u0928\u0940\u0924\u093F | \u0909\u092A\u0915\u0930\u0923 \u092A\u094D\u0932\u0947\u091F\u092B\u093E\u0930\u094D\u092E"
        },
        description: {
            es: "Consulta cómo Tools Platforms trata información, cookies, datos técnicos, herramientas online, analítica y anuncios.",
            en: "Learn how Tools Platforms handles information, cookies, technical data, analytics, online tools, and ads.",
            hi: "\u091C\u093E\u0928\u0947\u0902 \u0915\u093F \u091F\u0942\u0932 \u092A\u094D\u0932\u0947\u091F\u092B\u093C\u0949\u0930\u094D\u092E \u091C\u093E\u0928\u0915\u093E\u0930\u0940, \u0915\u0941\u0915\u0940\u091C\u093C, \u0924\u0915\u0928\u0940\u0915\u0940 \u0921\u0947\u091F\u093E, \u090F\u0928\u093E\u0932\u093F\u091F\u093F\u0915\u094D\u0938, \u0911\u0928\u0932\u093E\u0907\u0928 \u091F\u0942\u0932 \u0914\u0930 \u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928\u094B\u0902 \u0915\u094B \u0915\u0948\u0938\u0947 \u0938\u0902\u092D\u093E\u0932\u0924\u093E \u0939\u0948\u0964"
        },
        canonicalPath: "/privacy"
    },
    terms: {
        title: {
            es: "Términos y condiciones | Tools Platforms",
            en: "Terms and Conditions | Tools Platforms",
            hi: "\u0928\u093F\u092F\u092E \u090F\u0935\u0902 \u0936\u0930\u094D\u0924\u0947\u0902 | \u0909\u092A\u0915\u0930\u0923 \u092A\u094D\u0932\u0947\u091F\u092B\u093E\u0930\u094D\u092E"
        },
        description: {
            es: "Lee las condiciones de uso de Tools Platforms, el alcance de las herramientas, limitaciones y responsabilidades.",
            en: "Read the terms that govern your use of Tools Platforms, its tools, limitations, and responsibilities.",
            hi: "\u0935\u0947 \u0936\u0930\u094D\u0924\u0947\u0902 \u092A\u0922\u093C\u0947\u0902 \u091C\u094B \u0906\u092A\u0915\u0947 \u091F\u0942\u0932 \u092A\u094D\u0932\u0947\u091F\u092B\u093C\u0949\u0930\u094D\u092E \u0915\u0947 \u0909\u092A\u092F\u094B\u0917, \u0907\u0938\u0915\u0947 \u091F\u0942\u0932, \u0938\u0940\u092E\u093E\u0913\u0902 \u0914\u0930 \u091C\u093C\u093F\u092E\u094D\u092E\u0947\u0926\u093E\u0930\u093F\u092F\u094B\u0902 \u0915\u094B \u0928\u093F\u092F\u0902\u0924\u094D\u0930\u093F\u0924 \u0915\u0930\u0924\u0940 \u0939\u0948\u0902\u0964"
        },
        canonicalPath: "/terms"
    }
};
