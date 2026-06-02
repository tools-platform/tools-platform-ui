import type { LocalizedText } from "../i18n";
type CatalogText = {
    name: LocalizedText;
    description: LocalizedText;
};
export const categoryCopy: Record<string, CatalogText> = {
    "finance": {
        name: { es: "Finanzas", en: "Finance", hi: "\u0935\u093F\u0924\u094D\u0924" },
        description: {
            es: "Calculadoras para salario, créditos, prestaciones y conversiones.",
            en: "Calculators for salary, loans, benefits, and currency conversion.",
            hi: "\u0935\u0947\u0924\u0928, \u090B\u0923, \u0932\u093E\u092D \u0914\u0930 \u092E\u0941\u0926\u094D\u0930\u093E \u0930\u0942\u092A\u093E\u0902\u0924\u0930\u0923 \u0915\u0947 \u0932\u093F\u090F \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930\u0964"
        }
    },
    "work": {
        name: { es: "Trabajo", en: "Work", hi: "\u0915\u093E\u092E" },
        description: {
            es: "Herramientas para horas, tarifas freelance y productividad.",
            en: "Tools for hours worked, freelance rates, and productivity.",
            hi: "\u0915\u093E\u092E \u0915\u0947 \u0918\u0902\u091F\u0947, \u092B\u094D\u0930\u0940\u0932\u093E\u0902\u0938 \u0926\u0930\u0947\u0902 \u0914\u0930 \u0909\u0924\u094D\u092A\u093E\u0926\u0915\u0924\u093E \u0915\u0947 \u0932\u093F\u090F \u0909\u092A\u0915\u0930\u0923\u0964"
        }
    },
    "time": {
        name: { es: "Tiempo", en: "Time", hi: "\u0938\u092E\u092F" },
        description: {
            es: "Fechas, edades exactas, semanas y cuentas regresivas.",
            en: "Dates, exact ages, weeks, and countdowns.",
            hi: "\u0924\u093E\u0930\u0940\u0916\u0947\u0902, \u0938\u091F\u0940\u0915 \u0909\u092E\u094D\u0930, \u0938\u092A\u094D\u0924\u093E\u0939 \u0914\u0930 \u0909\u0932\u091F\u0940 \u0917\u093F\u0928\u0924\u0940\u0964"
        }
    },
    "utilities": {
        name: { es: "Utilidades", en: "Utilities", hi: "\u0909\u092A\u092F\u094B\u0917\u093F\u0924\u093E\u090F\u0901" },
        description: {
            es: "Conversiones, texto, unidades y tareas repetitivas.",
            en: "Conversions, text tools, units, and repetitive tasks.",
            hi: "\u0930\u0942\u092A\u093E\u0902\u0924\u0930\u0923, \u092A\u093E\u0920 \u0909\u092A\u0915\u0930\u0923, \u0907\u0915\u093E\u0907\u092F\u093E\u0901 \u0914\u0930 \u0926\u094B\u0939\u0930\u093E\u090F \u091C\u093E\u0928\u0947 \u0935\u093E\u0932\u0947 \u0915\u093E\u0930\u094D\u092F\u0964"
        }
    },
    "development": {
        name: { es: "Desarrollo", en: "Development", hi: "\u0935\u093F\u0915\u093E\u0938" },
        description: {
            es: "JSON, UUID, hashes y utilidades para programadores.",
            en: "JSON, UUIDs, hashes, and developer utilities.",
            hi: "JSON, UUIDs, \u0939\u0948\u0936 \u0914\u0930 \u0921\u0947\u0935\u0932\u092A\u0930 \u0909\u092A\u092F\u094B\u0917\u093F\u0924\u093E\u090F\u0901\u0964"
        }
    },
    "documents": {
        name: { es: "Documentos", en: "Documents", hi: "\u0926\u0938\u094D\u0924\u093E\u0935\u0947\u091C\u093C" },
        description: {
            es: "Borradores, cartas y plantillas editables para tareas cotidianas.",
            en: "Drafts, letters, and editable templates for everyday tasks.",
            hi: "\u0930\u094B\u091C\u093C\u092E\u0930\u094D\u0930\u093E \u0915\u0947 \u0915\u093E\u0930\u094D\u092F\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0921\u094D\u0930\u093E\u092B\u094D\u091F, \u092A\u0924\u094D\u0930 \u0914\u0930 \u0938\u0902\u092A\u093E\u0926\u0928 \u092F\u094B\u0917\u094D\u092F \u091F\u0947\u092E\u094D\u092A\u0932\u0947\u091F\u0964"
        }
    }
};
export const toolCopy: Record<string, CatalogText> = {
    "net-salary-colombia": {
        name: {
            es: "Calculadora de salario neto (Colombia)",
            en: "Net Salary Calculator (Colombia)",
            hi: "\u0936\u0941\u0926\u094D\u0927 \u0935\u0947\u0924\u0928 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 (\u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E)"
        },
        description: {
            es: "Calcula tu neto mensual y quincenal después de salud y pensión.",
            en: "Calculate monthly and biweekly take-home pay after health and pension.",
            hi: "\u0926\u0947\u0916\u0947\u0902 \u0915\u093F \u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F \u0914\u0930 \u092A\u0947\u0902\u0936\u0928 \u0915\u091F\u094C\u0924\u0940 \u0915\u0947 \u092C\u093E\u0926 \u0915\u094D\u092F\u093E \u092C\u091A\u0924\u093E \u0939\u0948\u0964"
        }
    },
    "gross-salary-colombia": {
        name: {
            es: "Calculadora de salario bruto (Colombia)",
            en: "Gross Salary Calculator (Colombia)",
            hi: "\u0938\u0915\u0932 \u0935\u0947\u0924\u0928 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 (\u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E)"
        },
        description: {
            es: "Estima tu salario bruto desde lo que recibes neto mensual o quincenal.",
            en: "Estimate gross salary from the net amount you receive monthly or biweekly.",
            hi: "\u0906\u092A\u0915\u094B \u092E\u093E\u0938\u093F\u0915 \u092F\u093E \u092A\u093E\u0915\u094D\u0937\u093F\u0915 \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0939\u094B\u0928\u0947 \u0935\u093E\u0932\u0940 \u0936\u0941\u0926\u094D\u0927 \u0930\u093E\u0936\u093F \u0938\u0947 \u0938\u0915\u0932 \u0935\u0947\u0924\u0928 \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u090F\u0902\u0964"
        }
    },
    "employment-settlement-colombia": {
        name: {
            es: "Calculadora de liquidación (Colombia)",
            en: "Employment Settlement Calculator (Colombia)",
            hi: "\u0930\u094B\u091C\u0917\u093E\u0930 \u0928\u093F\u092A\u091F\u093E\u0928 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 (\u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E)"
        },
        description: {
            es: "Cesantías, prima y vacaciones al salir del trabajo.",
            en: "Estimate severance, service bonus, and unused vacation at the end of employment.",
            hi: "\u0930\u094B\u091C\u0917\u093E\u0930 \u0915\u0947 \u0905\u0902\u0924 \u092E\u0947\u0902 \u0935\u093F\u091A\u094D\u091B\u0947\u0926, \u0938\u0947\u0935\u093E \u092C\u094B\u0928\u0938 \u0914\u0930 \u0905\u092A\u094D\u0930\u092F\u0941\u0915\u094D\u0924 \u091B\u0941\u091F\u094D\u091F\u0940 \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u090F\u0902\u0964"
        }
    },
    "social-benefits-colombia": {
        name: {
            es: "Calculadora de prestaciones sociales (Colombia)",
            en: "Social Benefits Calculator (Colombia)",
            hi: "\u0938\u093E\u092E\u093E\u091C\u093F\u0915 \u0932\u093E\u092D \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 (\u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E)"
        },
        description: {
            es: "Desglosa beneficios como cesantías, prima y vacaciones.",
            en: "Break down benefits such as severance, service bonus, and vacation.",
            hi: "\u0935\u093F\u091A\u094D\u091B\u0947\u0926, \u0938\u0947\u0935\u093E \u092C\u094B\u0928\u0938 \u0914\u0930 \u0905\u0935\u0915\u093E\u0936 \u091C\u0948\u0938\u0947 \u0932\u093E\u092D\u094B\u0902 \u0915\u094B \u0935\u093F\u092D\u093E\u091C\u093F\u0924 \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "credit-interest": {
        name: {
            es: "Calculadora de intereses de crédito",
            en: "Credit Interest Calculator",
            hi: "\u0915\u094D\u0930\u0947\u0921\u093F\u091F \u092C\u094D\u092F\u093E\u091C \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930"
        },
        description: {
            es: "Cuánto pagas en total por un préstamo.",
            en: "Estimate total interest paid on a loan.",
            hi: "\u0915\u093F\u0938\u0940 \u090B\u0923 \u092A\u0930 \u091A\u0941\u0915\u093E\u090F \u0917\u090F \u0915\u0941\u0932 \u092C\u094D\u092F\u093E\u091C \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u090F\u0902."
        }
    },
    "loan-payment": {
        name: {
            es: "Cuota de préstamo",
            en: "Loan Payment Calculator",
            hi: "\u090B\u0923 \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930"
        },
        description: {
            es: "Valor de la cuota mensual de un crédito.",
            en: "Estimate the monthly payment of a loan.",
            hi: "\u090B\u0923 \u0915\u0947 \u092E\u093E\u0938\u093F\u0915 \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u090F\u0902\u0964"
        }
    },
    "cop-usd": {
        name: {
            es: "Conversor COP a USD",
            en: "COP to USD Converter",
            hi: "\u0938\u0940\u0913\u092A\u0940 \u0938\u0947 \u092F\u0942\u090F\u0938\u0921\u0940 \u0915\u0928\u0935\u0930\u094D\u091F\u0930"
        },
        description: {
            es: "Convierte COP a USD y USD a COP con tasa de referencia.",
            en: "Convert COP to USD and USD to COP with a reference rate.",
            hi: "संदर्भ दर के साथ COP से USD और USD से COP में बदलें।"
        }
    },
    "salary-increase": {
        name: { es: "Calculadora de aumento salarial", en: "Salary Increase Calculator", hi: "\u0935\u0947\u0924\u0928 \u0935\u0943\u0926\u094D\u0927\u093F \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930" },
        description: {
            es: "Calcula tu nuevo sueldo después de un aumento.",
            en: "Calculate new pay after a salary increase.",
            hi: "\u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902 \u0915\u093F \u092A\u094D\u0930\u0924\u093F\u0936\u0924 \u0935\u0943\u0926\u094D\u0927\u093F \u0915\u0947 \u092C\u093E\u0926 \u0935\u0947\u0924\u0928 \u0915\u0948\u0938\u093E \u0926\u093F\u0916\u0947\u0917\u093E\u0964"
        }
    },
    "annual-salary": {
        name: { es: "Calculadora de salario anual (Colombia)", en: "Annual Salary Calculator (Colombia)", hi: "\u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0935\u0947\u0924\u0928 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 (\u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E)" },
        description: {
            es: "Estima tu ingreso anual con salario, auxilio, prima y descuentos.",
            en: "Estimate annual income with salary, allowance, bonus, and deductions.",
            hi: "\u0935\u0947\u0924\u0928, \u092D\u0924\u094D\u0924\u093E, \u092C\u094B\u0928\u0938 \u0914\u0930 \u0915\u091F\u094C\u0924\u093F\u092F\u094B\u0902 \u0915\u0947 \u0938\u093E\u0925 \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0906\u092F \u0915\u093E \u0905\u0928\u0941\u092E\u093E\u0928 \u0932\u0917\u093E\u090F\u0902\u0964"
        }
    },
    "worked-hours": {
        name: {
            es: "Calculadora de horas trabajadas",
            en: "Worked Hours Calculator",
            hi: "\u0915\u093E\u092E \u0915\u0947 \u0918\u0902\u091F\u0947 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930"
        },
        description: {
            es: "Suma horas trabajadas por turno, día o semana.",
            en: "Add worked hours by shift, day, or week.",
            hi: "\u0924\u093F\u0925\u093F\u092F\u094B\u0902 \u0914\u0930 \u0936\u093F\u092B\u094D\u091F\u094B\u0902 \u092E\u0947\u0902 \u0915\u093E\u092E \u0915\u0947 \u0918\u0902\u091F\u0947 \u091C\u094B\u0921\u093C\u0947\u0902\u0964"
        }
    },
    "hourly-salary": {
        name: {
            es: "Calculadora de salario por horas (Colombia)",
            en: "Hourly Salary Calculator (Colombia)",
            hi: "\u092A\u094D\u0930\u0924\u093F \u0918\u0902\u091F\u093E \u0935\u0947\u0924\u0928 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 (\u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E)"
        },
        description: {
            es: "Convierte un salario mensual en valor por hora para comparar ingresos.",
            en: "Convert a monthly salary into an hourly value to compare income.",
            hi: "\u0906\u092F \u0915\u0940 \u0924\u0941\u0932\u0928\u093E \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u092E\u093E\u0938\u093F\u0915 \u0935\u0947\u0924\u0928 \u0915\u094B \u092A\u094D\u0930\u0924\u093F \u0918\u0902\u091F\u0947 \u0915\u0947 \u092E\u093E\u0928 \u092E\u0947\u0902 \u092C\u0926\u0932\u0947\u0902\u0964"
        }
    },
    "employee-salary-equivalent": {
        name: {
            es: "Calculadora de sueldo de empleado para independientes (Colombia)",
            en: "Employee Salary Calculator for Independent Workers (Colombia)",
            hi: "\u0938\u094D\u0935\u0924\u0902\u0924\u094D\u0930 \u0936\u094D\u0930\u092E\u093F\u0915\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0915\u0930\u094D\u092E\u091A\u093E\u0930\u0940 \u0935\u0947\u0924\u0928 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 (\u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E)"
        },
        description: {
            es: "Convierte lo que cobras por hora en sueldo quincenal y mensual como empleado.",
            en: "Convert what you charge per hour into an equivalent biweekly and monthly employee salary.",
            hi: "\u0906\u092A \u092A\u094D\u0930\u0924\u093F \u0918\u0902\u091F\u0947 \u091C\u094B \u0936\u0941\u0932\u094D\u0915 \u0932\u0947\u0924\u0947 \u0939\u0948\u0902 \u0909\u0938\u0947 \u0938\u092E\u0924\u0941\u0932\u094D\u092F \u0926\u094D\u0935\u093F\u0938\u093E\u092A\u094D\u0924\u093E\u0939\u093F\u0915 \u0914\u0930 \u092E\u093E\u0938\u093F\u0915 \u0915\u0930\u094D\u092E\u091A\u093E\u0930\u0940 \u0935\u0947\u0924\u0928 \u092E\u0947\u0902 \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u093F\u0924 \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "freelance-rate": {
        name: {
            es: "Calculadora de cuánto cobrar freelance",
            en: "Freelance Rate Calculator",
            hi: "\u092B\u094D\u0930\u0940\u0932\u093E\u0902\u0938 \u0926\u0930 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930"
        },
        description: {
            es: "Calcula tarifa por hora, día y semana freelance.",
            en: "Calculate hourly, daily, and weekly freelance rates.",
            hi: "\u0905\u092A\u0928\u0947 \u092E\u093E\u0938\u093F\u0915 \u0906\u092F \u0932\u0915\u094D\u0937\u094D\u092F \u0915\u0947 \u0906\u0927\u093E\u0930 \u092A\u0930 \u092B\u094D\u0930\u0940\u0932\u093E\u0902\u0938 \u0926\u0930 \u0915\u093E \u0938\u0941\u091D\u093E\u0935 \u0926\u0947\u0902\u0964"
        }
    },
    "overtime-colombia": {
        name: {
            es: "Calculadora de horas extras (Colombia)",
            en: "Overtime Calculator (Colombia)",
            hi: "\u0913\u0935\u0930\u091F\u093E\u0907\u092E \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 (\u0915\u094B\u0932\u0902\u092C\u093F\u092F\u093E)"
        },
        description: {
            es: "Calcula horas extra, recargos nocturnos, dominicales y festivos.",
            en: "Calculate overtime, night, Sunday, and holiday pay.",
            hi: "\u0913\u0935\u0930\u091F\u093E\u0907\u092E, \u0930\u093E\u0924, \u0930\u0935\u093F\u0935\u093E\u0930 \u0914\u0930 \u091B\u0941\u091F\u094D\u091F\u0940 \u0915\u0947 \u0935\u0947\u0924\u0928 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "days-between-dates": {
        name: {
            es: "Calculadora de días entre fechas",
            en: "Days Between Dates Calculator",
            hi: "\u0924\u093F\u0925\u093F\u092F\u094B\u0902 \u0915\u0947 \u092C\u0940\u091A \u0915\u0947 \u0926\u093F\u0928 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930"
        },
        description: {
            es: "Calcula días calendario, semanas y duración entre dos fechas.",
            en: "Calculate calendar days, weeks, and duration between two dates.",
            hi: "दो तारीखों के बीच कैलेंडर दिन, सप्ताह और अवधि की गणना करें।"
        }
    },
    "weeks-between-dates": {
        name: { es: "Calculadora de semanas entre fechas", en: "Weeks Between Dates Calculator", hi: "\u0924\u093F\u0925\u093F\u092F\u094B\u0902 \u0915\u0947 \u092C\u0940\u091A \u0938\u092A\u094D\u0924\u093E\u0939 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930" },
        description: {
            es: "Calcula semanas completas y días entre fechas.",
            en: "Calculate weeks and days between dates.",
            hi: "\u0926\u094B \u0924\u093F\u0925\u093F\u092F\u094B\u0902 \u0915\u0947 \u092C\u0940\u091A \u0915\u0947 \u0938\u092E\u092F \u0915\u094B \u0938\u092A\u094D\u0924\u093E\u0939 \u0914\u0930 \u0926\u093F\u0928\u094B\u0902 \u092E\u0947\u0902 \u092C\u0926\u0932\u0947\u0902\u0964"
        }
    },
    "exact-age": {
        name: {
            es: "Calculadora de edad exacta",
            en: "Exact Age Calculator",
            hi: "\u0938\u091F\u0940\u0915 \u0906\u092F\u0941 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930"
        },
        description: {
            es: "Calcula edad en años, meses y días.",
            en: "Calculate age in years, months, and days.",
            hi: "\u0906\u092F\u0941 \u0915\u0940 \u0917\u0923\u0928\u093E \u0935\u0930\u094D\u0937\u094B\u0902, \u092E\u0939\u0940\u0928\u094B\u0902 \u0914\u0930 \u0926\u093F\u0928\u094B\u0902 \u092E\u0947\u0902 \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "days-until-date": {
        name: { es: "Cuántos días faltan para una fecha", en: "Days Until a Date Calculator", hi: "\u0926\u093F\u0928\u093E\u0902\u0915 \u0915\u0948\u0932\u0915\u0941\u0932\u0947\u091F\u0930 \u0924\u0915 \u0915\u0947 \u0926\u093F\u0928" },
        description: {
            es: "Calcula días restantes para eventos, entregas o fechas clave.",
            en: "Count days left until events, deadlines, or key dates.",
            hi: "\u0915\u093F\u0938\u0940 \u0918\u091F\u0928\u093E \u092F\u093E \u0938\u092E\u092F \u0938\u0940\u092E\u093E \u0924\u0915 \u092C\u091A\u0947 \u0926\u093F\u0928\u094B\u0902 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "unit-converter": {
        name: {
            es: "Conversor de unidades online",
            en: "Online Unit Converter",
            hi: "\u0911\u0928\u0932\u093E\u0907\u0928 \u092F\u0942\u0928\u093F\u091F \u0915\u0928\u0935\u0930\u094D\u091F\u0930"
        },
        description: {
            es: "Convierte kg a lb, km a millas, metros, centímetros y grados.",
            en: "Convert kg to lb, km to miles, meters, centimeters, and degrees.",
            hi: "kg से lb, km से मील, मीटर, सेंटीमीटर और डिग्री बदलें।"
        }
    },
    "text-case-converter": {
        name: {
            es: "Convertidor de mayúsculas y minúsculas online",
            en: "Uppercase and Lowercase Converter",
            hi: "\u0905\u092A\u0930\u0915\u0947\u0938 \u0914\u0930 \u0932\u094B\u0905\u0930\u0915\u0947\u0938 \u0915\u0928\u0935\u0930\u094D\u091F\u0930"
        },
        description: {
            es: "Convierte texto a mayúsculas, minúsculas o capitalizado.",
            en: "Convert text to uppercase, lowercase, or title case.",
            hi: "\u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u094B \u0905\u092A\u0930\u0915\u0947\u0938, \u0932\u094B\u0905\u0930\u0915\u0947\u0938 \u092F\u093E \u0936\u0940\u0930\u094D\u0937\u0915 \u0915\u0947\u0938 \u092E\u0947\u0902 \u0930\u0942\u092A\u093E\u0902\u0924\u0930\u093F\u0924 \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "duplicate-counter": {
        name: {
            es: "Contador de duplicados",
            en: "Duplicate Counter",
            hi: "\u0921\u0941\u092A\u094D\u0932\u0940\u0915\u0947\u091F \u0915\u093E\u0909\u0902\u091F\u0930"
        },
        description: {
            es: "Cuenta duplicados, únicos y repetidos en listas o columnas.",
            en: "Count duplicates, unique values, and repeated lines in lists.",
            hi: "\u0915\u093F\u0938\u0940 \u0938\u0942\u091A\u0940 \u092E\u0947\u0902 \u0926\u094B\u0939\u0930\u093E\u090F \u0917\u090F \u092E\u093E\u0928\u094B\u0902, \u0905\u0926\u094D\u0935\u093F\u0924\u0940\u092F \u092E\u093E\u0928\u094B\u0902 \u0914\u0930 \u0935\u093F\u0936\u093F\u0937\u094D\u091F \u092A\u0902\u0915\u094D\u0924\u093F\u092F\u094B\u0902 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "word-character-counter": {
        name: { es: "Contador de palabras, caracteres y líneas", en: "Word, Character, and Line Counter", hi: "\u0936\u092C\u094D\u0926, \u091A\u0930\u093F\u0924\u094D\u0930 \u0914\u0930 \u0930\u0947\u0916\u093E \u0915\u093E\u0909\u0902\u091F\u0930" },
        description: {
            es: "Cuenta palabras, caracteres, letras, líneas, párrafos y frases.",
            en: "Count words, characters, letters, lines, paragraphs, and sentences.",
            hi: "\u0936\u092C\u094D\u0926\u094B\u0902, \u0935\u0930\u094D\u0923\u094B\u0902, \u0905\u0915\u094D\u0937\u0930\u094B\u0902, \u092A\u0902\u0915\u094D\u0924\u093F\u092F\u094B\u0902, \u092A\u0948\u0930\u093E\u0917\u094D\u0930\u093E\u092B\u094B\u0902 \u0914\u0930 \u0935\u093E\u0915\u094D\u092F\u094B\u0902 \u0915\u094B \u0917\u093F\u0928\u0947\u0902\u0964"
        }
    },
    "find-replace-text": {
        name: { es: "Buscar y reemplazar texto", en: "Find and Replace Text", hi: "\u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0922\u0942\u0902\u0922\u0947\u0902 \u0914\u0930 \u092C\u0926\u0932\u0947\u0902" },
        description: {
            es: "Busca palabras o fragmentos y reemplázalos en un texto.",
            en: "Find words or fragments and replace them in text.",
            hi: "\u0936\u092C\u094D\u0926 \u092F\u093E \u0905\u0902\u0936 \u0922\u0942\u0902\u0922\u0947\u0902 \u0914\u0930 \u0909\u0928\u094D\u0939\u0947\u0902 \u092A\u093E\u0920 \u092E\u0947\u0902 \u092C\u0926\u0932\u0947\u0902\u0964"
        }
    },
    "remove-extra-spaces": {
        name: {
            es: "Eliminar espacios extra",
            en: "Remove Extra Spaces",
            hi: "\u0905\u0924\u093F\u0930\u093F\u0915\u094D\u0924 \u0930\u093F\u0915\u094D\u0924 \u0938\u094D\u0925\u093E\u0928 \u0939\u091F\u093E\u090F\u0901"
        },
        description: {
            es: "Limpia espacios dobles, tabs y líneas vacías en textos o listas.",
            en: "Clean double spaces, tabs, and blank lines from text or lists.",
            hi: "\u092A\u093E\u0920 \u092F\u093E \u0938\u0942\u091A\u093F\u092F\u094B\u0902 \u0938\u0947 \u0926\u094B\u0939\u0930\u0947 \u0938\u094D\u0925\u093E\u0928, \u091F\u0948\u092C \u0914\u0930 \u0930\u093F\u0915\u094D\u0924 \u092A\u0902\u0915\u094D\u0924\u093F\u092F\u093E\u0901 \u0938\u093E\u092B\u093C \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "remove-accents": {
        name: {
            es: "Eliminar acentos (Español)",
            en: "Remove Accents (Spanish)",
            hi: "\u090F\u0915\u094D\u0938\u0947\u0902\u091F \u0939\u091F\u093E\u090F\u0902 (\u0938\u094D\u092A\u0947\u0928\u093F\u0936)"
        },
        description: {
            es: "Convierte texto con tildes a una versión sin acentos, conservando la ñ si quieres.",
            en: "Convert accented text into a version without accents, preserving ñ if needed.",
            hi: "\u092F\u0926\u093F \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u094B \u0924\u094B \u00F1 \u0915\u094B \u0938\u0902\u0930\u0915\u094D\u0937\u093F\u0924 \u0915\u0930\u0924\u0947 \u0939\u0941\u090F, \u0909\u091A\u094D\u091A\u093E\u0930\u0923 \u0935\u093E\u0932\u0947 \u092A\u093E\u0920 \u0915\u094B \u092C\u093F\u0928\u093E \u0909\u091A\u094D\u091A\u093E\u0930\u0923 \u0935\u093E\u0932\u0947 \u0938\u0902\u0938\u094D\u0915\u0930\u0923 \u092E\u0947\u0902 \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u093F\u0924 \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "secure-password-generator": {
        name: {
            es: "Generador de contraseñas seguras",
            en: "Secure Password Generator",
            hi: "\u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u091C\u0947\u0928\u0930\u0947\u091F\u0930"
        },
        description: {
            es: "Crea contraseñas aleatorias y seguras en tu navegador.",
            en: "Create random, secure passwords in your browser.",
            hi: "\u0905\u092A\u0928\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u092F\u093E\u0926\u0943\u091A\u094D\u091B\u093F\u0915, \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u092C\u0928\u093E\u090F\u0902\u0964"
        }
    },
    "random-text-generator": {
        name: {
            es: "Generador de texto aleatorio",
            en: "Random Text Generator",
            hi: "\u0930\u0948\u0902\u0921\u092E \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u091C\u0947\u0928\u0930\u0947\u091F\u0930"
        },
        description: {
            es: "Genera texto aleatorio con palabras, frases, párrafos o listas.",
            en: "Generate random text with words, sentences, paragraphs, or lists.",
            hi: "\u092A\u094D\u0930\u093E\u0915\u0943\u0924\u093F\u0915 \u092A\u093E\u0920 \u092F\u093E \u0932\u094B\u0930\u0947\u092E \u0907\u092A\u094D\u0938\u092E \u0915\u0947 \u0938\u093E\u0925 \u0936\u092C\u094D\u0926, \u0935\u093E\u0915\u094D\u092F, \u092A\u0948\u0930\u093E\u0917\u094D\u0930\u093E\u092B \u092F\u093E \u0938\u0942\u091A\u093F\u092F\u093E\u0901 \u092C\u0928\u093E\u090F\u0901\u0964"
        }
    },
    "alphabetical-line-sorter": {
        name: {
            es: "Ordenador alfabético de líneas",
            en: "Alphabetical Line Sorter",
            hi: "\u0935\u0930\u094D\u0923\u093E\u0928\u0941\u0915\u094D\u0930\u092E\u093F\u0915 \u0930\u0947\u0916\u093E \u0938\u0949\u0930\u094D\u091F\u0930"
        },
        description: {
            es: "Ordena listas, nombres, correos o códigos de la A a la Z o de la Z a la A.",
            en: "Sort lists, names, emails, or codes from A to Z or Z to A.",
            hi: "\u0938\u0942\u091A\u093F\u092F\u093E\u0901, \u0928\u093E\u092E, \u0908\u092E\u0947\u0932 \u092F\u093E \u0915\u094B\u0921 \u0915\u094B A \u0938\u0947 Z \u092F\u093E Z \u0938\u0947 A \u0924\u0915 \u0915\u094D\u0930\u092E\u092C\u0926\u094D\u0927 \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "percentage-calculator": {
        name: {
            es: "Calculadora de porcentaje",
            en: "Percentage Calculator",
            hi: "\u092A\u094D\u0930\u0924\u093F\u0936\u0924 \u0915\u0948\u0932\u0915\u094D\u092F\u0942\u0932\u0947\u091F\u0930"
        },
        description: {
            es: "Calcula porcentajes, descuentos, aumentos y diferencias porcentuales.",
            en: "Calculate percentages, discounts, increases, and percentage changes.",
            hi: "\u092A\u094D\u0930\u0924\u093F\u0936\u0924, \u091B\u0942\u091F, \u0935\u0943\u0926\u094D\u0927\u093F \u0914\u0930 \u092A\u094D\u0930\u0924\u093F\u0936\u0924 \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u0928 \u0915\u0940 \u0917\u0923\u0928\u093E \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "case-style-converter": {
        name: {
            es: "Convertidor de estilos de texto para código",
            en: "Code Case Style Converter",
            hi: "\u0915\u094B\u0921 \u0915\u0947\u0938 \u0938\u094D\u091F\u093E\u0907\u0932 \u0915\u0928\u094D\u0935\u0930\u094D\u091F\u0930"
        },
        description: {
            es: "Convierte frases a camelCase, PascalCase, snake_case, kebab-case y más formatos.",
            en: "Convert phrases to camelCase, PascalCase, snake_case, kebab-case, and more.",
            hi: "\u0935\u093E\u0915\u094D\u092F\u093E\u0902\u0936\u094B\u0902 \u0915\u094B \u0915\u0948\u092E\u0932\u0915\u0947\u0938, \u092A\u093E\u0938\u094D\u0915\u0932\u0915\u0947\u0938, \u0938\u094D\u0928\u0947\u0915_\u0915\u0947\u0938, \u0915\u092C\u093E\u092C-\u0915\u0947\u0938 \u0914\u0930 \u0905\u0928\u094D\u092F \u092E\u0947\u0902 \u092C\u0926\u0932\u0947\u0902\u0964"
        }
    },
    "base64-converter": {
        name: {
            es: "Codificador y decodificador Base64",
            en: "Base64 Encoder and Decoder",
            hi: "\u092C\u0947\u093864 \u090F\u0928\u0915\u094B\u0921\u0930 \u0914\u0930 \u0921\u093F\u0915\u094B\u0921\u0930"
        },
        description: {
            es: "Codifica texto a Base64 o decodifica Base64 a texto en tu navegador.",
            en: "Encode text to Base64 or decode Base64 to text in your browser.",
            hi: "\u0905\u092A\u0928\u0947 \u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0915\u094B \u092C\u0947\u093864 \u092E\u0947\u0902 \u090F\u0928\u0915\u094B\u0921 \u0915\u0930\u0947\u0902 \u092F\u093E \u092C\u0947\u093864 \u0915\u094B \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u092E\u0947\u0902 \u0921\u093F\u0915\u094B\u0921 \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "html-preview": {
        name: {
            es: "Vista previa de HTML online",
            en: "Online HTML Preview",
            hi: "\u0911\u0928\u0932\u093E\u0907\u0928 HTML \u092A\u0942\u0930\u094D\u0935\u093E\u0935\u0932\u094B\u0915\u0928"
        },
        description: {
            es: "Pega código HTML y revisa cómo se renderiza en una vista previa segura.",
            en: "Paste HTML code and see how it renders in a safe preview.",
            hi: "HTML \u0915\u094B\u0921 \u091A\u093F\u092A\u0915\u093E\u090F\u0901 \u0914\u0930 \u0926\u0947\u0916\u0947\u0902 \u0915\u093F \u092F\u0939 \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u092A\u0942\u0930\u094D\u0935\u093E\u0935\u0932\u094B\u0915\u0928 \u092E\u0947\u0902 \u0915\u0948\u0938\u0947 \u092A\u094D\u0930\u0938\u094D\u0924\u0941\u0924 \u0939\u094B\u0924\u093E \u0939\u0948\u0964"
        }
    },
    "html-formatter-minifier": {
        name: {
            es: "Formateador y minificador HTML",
            en: "HTML Formatter and Minifier",
            hi: "HTML \u092B\u093C\u0949\u0930\u094D\u092E\u0947\u091F\u0930 \u0914\u0930 \u092E\u093F\u0928\u093F\u092B\u093C\u093E\u092F\u0930"
        },
        description: {
            es: "Formatea HTML para leerlo mejor o minifícalo para obtener una versión compacta.",
            en: "Format HTML for readability or minify it into a compact version.",
            hi: "\u092A\u0920\u0928\u0940\u092F\u0924\u093E \u0915\u0947 \u0932\u093F\u090F HTML \u0915\u094B \u092A\u094D\u0930\u093E\u0930\u0942\u092A\u093F\u0924 \u0915\u0930\u0947\u0902 \u092F\u093E \u0907\u0938\u0947 \u0938\u0902\u0915\u094D\u0937\u093F\u092A\u094D\u0924 \u0938\u0902\u0938\u094D\u0915\u0930\u0923 \u092E\u0947\u0902 \u091B\u094B\u091F\u093E \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "json-formatter": {
        name: { es: "Formateador JSON", en: "JSON Formatter", hi: "JSON \u092B\u093C\u0949\u0930\u094D\u092E\u0947\u091F\u0930" },
        description: {
            es: "Organiza JSON para hacerlo legible y fácil de revisar.",
            en: "Format JSON to make it readable and easier to inspect.",
            hi: "\u0907\u0938\u0947 \u092A\u0920\u0928\u0940\u092F \u0914\u0930 \u0928\u093F\u0930\u0940\u0915\u094D\u0937\u0923 \u092E\u0947\u0902 \u0906\u0938\u093E\u0928 \u092C\u0928\u093E\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F JSON \u0915\u094B \u092A\u094D\u0930\u093E\u0930\u0942\u092A\u093F\u0924 \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "uuid-generator": {
        name: { es: "Generador UUID", en: "UUID Generator", hi: "\u092F\u0942\u092F\u0942\u0906\u0908\u0921\u0940 \u091C\u0947\u0928\u0930\u0947\u091F\u0930" },
        description: {
            es: "Crea identificadores únicos para sistemas y pruebas.",
            en: "Generate unique identifiers for systems and tests.",
            hi: "\u0938\u093F\u0938\u094D\u091F\u092E \u0914\u0930 \u092A\u0930\u0940\u0915\u094D\u0937\u0923\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0935\u093F\u0936\u093F\u0937\u094D\u091F \u092A\u0939\u091A\u093E\u0928\u0915\u0930\u094D\u0924\u093E \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "hash-generator": {
        name: { es: "Generador hash", en: "Hash Generator", hi: "\u0939\u0948\u0936 \u091C\u0947\u0928\u0930\u0947\u091F\u0930" },
        description: {
            es: "Genera hashes como MD5 o SHA para desarrollo y seguridad.",
            en: "Generate MD5, SHA, and similar hashes for development and security.",
            hi: "\u0935\u093F\u0915\u093E\u0938 \u0914\u0930 \u0938\u0941\u0930\u0915\u094D\u0937\u093E \u0915\u0947 \u0932\u093F\u090F MD5, SHA \u0914\u0930 \u0938\u092E\u093E\u0928 \u0939\u0948\u0936 \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u0915\u0930\u0947\u0902\u0964"
        }
    },
    "simple-cron-generator": {
        name: { es: "Generador de cron simple", en: "Simple Cron Generator", hi: "\u0938\u0930\u0932 \u0915\u094D\u0930\u0949\u0928 \u091C\u0947\u0928\u0930\u0947\u091F\u0930" },
        description: {
            es: "Crea o explica expresiones cron sin complicarte con la sintaxis.",
            en: "Create or explain cron expressions without wrestling with syntax.",
            hi: "\u0938\u093F\u0902\u091F\u0948\u0915\u094D\u0938 \u0915\u0947 \u0938\u093E\u0925 \u0938\u0902\u0918\u0930\u094D\u0937 \u0915\u093F\u090F \u092C\u093F\u0928\u093E \u0915\u094D\u0930\u094B\u0928 \u0905\u092D\u093F\u0935\u094D\u092F\u0915\u094D\u0924\u093F \u092C\u0928\u093E\u090F\u0902 \u092F\u093E \u0938\u092E\u091D\u093E\u090F\u0902\u0964"
        }
    },
    "resignation-letter-generator": {
        name: {
            es: "Generador de carta de renuncia",
            en: "Resignation Letter Generator",
            hi: "\u0924\u094D\u092F\u093E\u0917\u092A\u0924\u094D\u0930 \u091C\u0928\u0930\u0947\u091F\u0930"
        },
        description: {
            es: "Crea una plantilla editable de renuncia para copiar o descargar.",
            en: "Create an editable resignation letter template to copy or download.",
            hi: "\u0914\u092A\u091A\u093E\u0930\u093F\u0915, \u0938\u0902\u0915\u094D\u0937\u093F\u092A\u094D\u0924 \u092F\u093E \u0906\u092D\u093E\u0930\u0940 \u0936\u0948\u0932\u0940 \u092E\u0947\u0902 \u0938\u0902\u092A\u093E\u0926\u0928 \u092F\u094B\u0917\u094D\u092F \u0924\u094D\u092F\u093E\u0917\u092A\u0924\u094D\u0930 \u0921\u094D\u0930\u093E\u092B\u094D\u091F \u092C\u0928\u093E\u090F\u0901\u0964"
        }
    },
    "email-template-generator": {
        name: {
            es: "Creador de plantillas de correo",
            en: "Email Template Generator",
            hi: "\u0908\u092E\u0947\u0932 \u091F\u0947\u092E\u094D\u092A\u0932\u0947\u091F \u091C\u0928\u0930\u0947\u091F\u0930"
        },
        description: {
            es: "Dise\u00F1a plantillas HTML de correo con cabecera, cuerpo, bot\u00F3n, footer y vista previa.",
            en: "Design HTML email templates with header, body, button, footer, and preview.",
            hi: "\u0939\u0947\u0921\u0930, \u092C\u0949\u0921\u0940, \u092C\u091F\u0928, \u092B\u0941\u091F\u0930 \u0914\u0930 \u092A\u094D\u0930\u0940\u0935\u094D\u092F\u0942 \u0915\u0947 \u0938\u093E\u0925 HTML \u0908\u092E\u0947\u0932 \u091F\u0947\u092E\u094D\u092A\u0932\u0947\u091F \u0921\u093F\u091C\u093C\u093E\u0907\u0928 \u0915\u0930\u0947\u0902\u0964"
        }
    }
};
