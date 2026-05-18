import {
  BadgeDollarSign,
  Banknote,
  Binary,
  BriefcaseBusiness,
  Calculator,
  CalendarDays,
  Clock3,
  Code2,
  Coins,
  Eraser,
  FileJson,
  HandCoins,
  Hash,
  KeyRound,
  Landmark,
  Languages,
  LetterText,
  ListChecks,
  Repeat2,
  Ruler,
  Timer,
  Wrench
} from "lucide-react";
import type { ComponentType } from "react";
import type { LocalizedText } from "../i18n";

export type CatalogIcon = ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;

export type Category = {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  Icon: CatalogIcon;
};

export type ToolSummary = {
  id: string;
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  categoryId: string;
  status: "draft" | "published";
  Icon: CatalogIcon;
};

export const categories: Category[] = [
  {
    id: "finance",
    name: { es: "Finanzas", en: "Finance" },
    description: {
      es: "Calculadoras para salario, créditos, prestaciones y conversiones.",
      en: "Calculators for salary, loans, benefits, and currency conversion."
    },
    Icon: Calculator
  },
  {
    id: "work",
    name: { es: "Trabajo", en: "Work" },
    description: {
      es: "Herramientas para horas, tarifas freelance y productividad.",
      en: "Tools for hours worked, freelance rates, and productivity."
    },
    Icon: BriefcaseBusiness
  },
  {
    id: "time",
    name: { es: "Tiempo", en: "Time" },
    description: {
      es: "Fechas, edades exactas, semanas y cuentas regresivas.",
      en: "Dates, exact ages, weeks, and countdowns."
    },
    Icon: Clock3
  },
  {
    id: "utilities",
    name: { es: "Utilidades", en: "Utilities" },
    description: {
      es: "Conversiones, texto, unidades y tareas repetitivas.",
      en: "Conversions, text tools, units, and repetitive tasks."
    },
    Icon: Wrench
  },
  {
    id: "development",
    name: { es: "Desarrollo", en: "Development" },
    description: {
      es: "JSON, UUID, hashes y utilidades para programadores.",
      en: "JSON, UUIDs, hashes, and developer utilities."
    },
    Icon: Code2
  }
];

export const tools: ToolSummary[] = [
  {
    id: "net-salary-colombia",
    slug: "colombia-net-salary-calculator",
    name: {
      es: "Calculadora de salario neto (Colombia)",
      en: "Net Salary Calculator (Colombia)"
    },
    description: {
      es: "Cuánto recibes después de salud y pensión.",
      en: "See what remains after health and pension deductions."
    },
    categoryId: "finance",
    status: "published",
    Icon: Banknote
  },
  {
    id: "gross-salary-colombia",
    slug: "colombia-gross-salary-calculator",
    name: {
      es: "Calculadora de salario bruto (Colombia)",
      en: "Gross Salary Calculator (Colombia)"
    },
    description: {
      es: "Estima tu salario bruto desde lo que recibes neto mensual o quincenal.",
      en: "Estimate gross salary from the net amount you receive monthly or biweekly."
    },
    categoryId: "finance",
    status: "published",
    Icon: Banknote
  },
  {
    id: "employment-settlement-colombia",
    slug: "colombia-employment-settlement-calculator",
    name: {
      es: "Calculadora de liquidación (Colombia)",
      en: "Employment Settlement Calculator (Colombia)"
    },
    description: {
      es: "Cesantías, prima y vacaciones al salir del trabajo.",
      en: "Estimate severance, service bonus, and unused vacation at the end of employment."
    },
    categoryId: "finance",
    status: "published",
    Icon: HandCoins
  },
  {
    id: "credit-interest",
    slug: "credit-interest-calculator",
    name: {
      es: "Calculadora de intereses de crédito",
      en: "Credit Interest Calculator"
    },
    description: {
      es: "Cuánto pagas en total por un préstamo.",
      en: "Estimate total interest paid on a loan."
    },
    categoryId: "finance",
    status: "published",
    Icon: Landmark
  },
  {
    id: "loan-payment",
    slug: "loan-payment-calculator",
    name: {
      es: "Cuota de préstamo",
      en: "Loan Payment Calculator"
    },
    description: {
      es: "Valor de la cuota mensual de un crédito.",
      en: "Estimate the monthly payment of a loan."
    },
    categoryId: "finance",
    status: "published",
    Icon: BadgeDollarSign
  },
  {
    id: "cop-usd",
    slug: "cop-to-usd-converter",
    name: {
      es: "Conversor COP a USD",
      en: "COP to USD Converter"
    },
    description: {
      es: "Convierte pesos colombianos a dólares de forma rápida.",
      en: "Convert Colombian pesos to US dollars quickly."
    },
    categoryId: "finance",
    status: "published",
    Icon: Coins
  },
  {
    id: "salary-increase",
    slug: "salary-increase-calculator",
    name: { es: "Calculadora de aumento salarial", en: "Salary Increase Calculator" },
    description: {
      es: "Calcula cómo queda un salario después de un aumento porcentual.",
      en: "Calculate what a salary looks like after a percentage increase."
    },
    categoryId: "finance",
    status: "published",
    Icon: Repeat2
  },
  {
    id: "worked-hours",
    slug: "worked-hours-calculator",
    name: {
      es: "Calculadora de horas trabajadas",
      en: "Worked Hours Calculator"
    },
    description: {
      es: "Calcula horas entre fechas o rangos para trabajo y freelancing.",
      en: "Add up worked hours across dates and shifts."
    },
    categoryId: "work",
    status: "published",
    Icon: Timer
  },
  {
    id: "hourly-salary",
    slug: "hourly-salary-calculator",
    name: {
      es: "Calculadora de salario por horas (Colombia)",
      en: "Hourly Salary Calculator (Colombia)"
    },
    description: {
      es: "Convierte un salario mensual en valor por hora para comparar ingresos.",
      en: "Convert a monthly salary into an hourly value to compare income."
    },
    categoryId: "work",
    status: "published",
    Icon: Clock3
  },
  {
    id: "employee-salary-equivalent",
    slug: "employee-salary-for-independents-calculator",
    name: {
      es: "Calculadora de sueldo de empleado para independientes (Colombia)",
      en: "Employee Salary Calculator for Independent Workers (Colombia)"
    },
    description: {
      es: "Convierte lo que cobras por hora en sueldo quincenal y mensual como empleado.",
      en: "Convert what you charge per hour into an equivalent biweekly and monthly employee salary."
    },
    categoryId: "work",
    status: "published",
    Icon: BriefcaseBusiness
  },
  {
    id: "freelance-rate",
    slug: "freelance-rate-calculator",
    name: {
      es: "Calculadora de cuánto cobrar freelance",
      en: "Freelance Rate Calculator"
    },
    description: {
      es: "Sugiere una tarifa según tu meta mensual y horas de trabajo.",
      en: "Suggest a freelance rate based on your monthly income goal."
    },
    categoryId: "work",
    status: "published",
    Icon: BriefcaseBusiness
  },
  {
    id: "days-between-dates",
    slug: "days-between-dates-calculator",
    name: {
      es: "Contador de días entre fechas",
      en: "Days Between Dates Calculator"
    },
    description: {
      es: "Cuenta cuántos días hay entre dos fechas para trámites o planeación.",
      en: "Count how many days are between two dates."
    },
    categoryId: "time",
    status: "published",
    Icon: CalendarDays
  },
  {
    id: "exact-age",
    slug: "exact-age-calculator",
    name: {
      es: "Calculadora de edad exacta",
      en: "Exact Age Calculator"
    },
    description: {
      es: "Calcula edad en años, meses y días.",
      en: "Calculate age in years, months, and days."
    },
    categoryId: "time",
    status: "published",
    Icon: Clock3
  },
  {
    id: "days-until-date",
    slug: "days-until-date-calculator",
    name: { es: "Cuántos días faltan para una fecha", en: "Days Until a Date Calculator" },
    description: {
      es: "Cuenta los días restantes para eventos importantes o entregas.",
      en: "Count the days left until an event or deadline."
    },
    categoryId: "time",
    status: "published",
    Icon: CalendarDays
  },
  {
    id: "unit-converter",
    slug: "unit-converter",
    name: {
      es: "Conversor de unidades online",
      en: "Online Unit Converter"
    },
    description: {
      es: "Convierte kilómetros, millas, kilos, libras y más unidades comunes.",
      en: "Convert kilometers, miles, kilos, pounds, and other common units."
    },
    categoryId: "utilities",
    status: "published",
    Icon: Ruler
  },
  {
    id: "text-case-converter",
    slug: "text-case-converter",
    name: {
      es: "Convertidor de mayúsculas y minúsculas online",
      en: "Uppercase and Lowercase Converter"
    },
    description: {
      es: "Transforma texto a mayúsculas, minúsculas o capitalizado.",
      en: "Transform text to uppercase, lowercase, or title case."
    },
    categoryId: "utilities",
    status: "published",
    Icon: LetterText
  },
  {
    id: "duplicate-counter",
    slug: "duplicate-counter",
    name: {
      es: "Contador de duplicados",
      en: "Duplicate Counter"
    },
    description: {
      es: "Cuenta valores repetidos, únicos y resultados limpios en una lista.",
      en: "Count repeated values, unique values, and distinct lines in a list."
    },
    categoryId: "utilities",
    status: "published",
    Icon: ListChecks
  },
  {
    id: "remove-extra-spaces",
    slug: "remove-extra-spaces",
    name: {
      es: "Eliminar espacios extra",
      en: "Remove Extra Spaces"
    },
    description: {
      es: "Limpia espacios dobles, tabs y líneas vacías en textos o listas.",
      en: "Clean double spaces, tabs, and blank lines from text or lists."
    },
    categoryId: "utilities",
    status: "published",
    Icon: Eraser
  },
  {
    id: "remove-accents",
    slug: "remove-accents",
    name: {
      es: "Eliminar acentos (Español)",
      en: "Remove Accents (Spanish)"
    },
    description: {
      es: "Convierte texto con tildes a una versión sin acentos, conservando la ñ si quieres.",
      en: "Convert accented text into a version without accents, preserving ñ if needed."
    },
    categoryId: "utilities",
    status: "published",
    Icon: Languages
  },
  {
    id: "secure-password-generator",
    slug: "secure-password-generator",
    name: {
      es: "Generador de contraseñas seguras",
      en: "Secure Password Generator"
    },
    description: {
      es: "Crea contraseñas aleatorias y seguras en tu navegador.",
      en: "Create random, secure passwords in your browser."
    },
    categoryId: "utilities",
    status: "published",
    Icon: KeyRound
  },
  {
    id: "case-style-converter",
    slug: "case-style-converter",
    name: {
      es: "Convertidor de estilos de texto para código",
      en: "Code Case Style Converter"
    },
    description: {
      es: "Convierte frases a camelCase, PascalCase, snake_case, kebab-case y más formatos.",
      en: "Convert phrases to camelCase, PascalCase, snake_case, kebab-case, and more."
    },
    categoryId: "development",
    status: "published",
    Icon: Code2
  },
  {
    id: "base64-converter",
    slug: "base64-encoder-decoder",
    name: {
      es: "Codificador y decodificador Base64",
      en: "Base64 Encoder and Decoder"
    },
    description: {
      es: "Codifica texto a Base64 o decodifica Base64 a texto en tu navegador.",
      en: "Encode text to Base64 or decode Base64 to text in your browser."
    },
    categoryId: "development",
    status: "published",
    Icon: Binary
  },
  {
    id: "html-preview",
    slug: "html-preview-online",
    name: {
      es: "Vista previa de HTML online",
      en: "Online HTML Preview"
    },
    description: {
      es: "Pega código HTML y revisa cómo se renderiza en una vista previa segura.",
      en: "Paste HTML code and see how it renders in a safe preview."
    },
    categoryId: "development",
    status: "published",
    Icon: Code2
  },
  {
    id: "html-formatter-minifier",
    slug: "html-formatter-minifier",
    name: {
      es: "Formateador y minificador HTML",
      en: "HTML Formatter and Minifier"
    },
    description: {
      es: "Formatea HTML para leerlo mejor o minifícalo para obtener una versión compacta.",
      en: "Format HTML for readability or minify it into a compact version."
    },
    categoryId: "development",
    status: "published",
    Icon: Code2
  },
  {
    id: "json-formatter",
    slug: "json-formatter",
    name: { es: "Formateador JSON", en: "JSON Formatter" },
    description: {
      es: "Organiza JSON para hacerlo legible y fácil de revisar.",
      en: "Format JSON to make it readable and easier to inspect."
    },
    categoryId: "development",
    status: "draft",
    Icon: FileJson
  },
  {
    id: "uuid-generator",
    slug: "uuid-generator",
    name: { es: "Generador UUID", en: "UUID Generator" },
    description: {
      es: "Crea identificadores únicos para sistemas y pruebas.",
      en: "Generate unique identifiers for systems and tests."
    },
    categoryId: "development",
    status: "draft",
    Icon: Binary
  },
  {
    id: "hash-generator",
    slug: "hash-generator",
    name: { es: "Generador hash", en: "Hash Generator" },
    description: {
      es: "Genera hashes como MD5 o SHA para desarrollo y seguridad.",
      en: "Generate MD5, SHA, and similar hashes for development and security."
    },
    categoryId: "development",
    status: "draft",
    Icon: Hash
  },
  {
    id: "annual-salary",
    slug: "annual-salary-calculator",
    name: { es: "Calculadora de salario anual", en: "Annual Salary Calculator" },
    description: {
      es: "Calcula cuánto ganas en un año completo según tu salario mensual.",
      en: "Calculate your annual income from a monthly salary."
    },
    categoryId: "finance",
    status: "draft",
    Icon: Banknote
  },
  {
    id: "social-benefits-colombia",
    slug: "colombia-social-benefits-calculator",
    name: {
      es: "Calculadora de prestaciones sociales",
      en: "Social Benefits Calculator (Colombia)"
    },
    description: {
      es: "Desglosa beneficios como cesantías, prima y vacaciones.",
      en: "Break down benefits such as severance, service bonus, and vacation."
    },
    categoryId: "finance",
    status: "draft",
    Icon: HandCoins
  },
  {
    id: "productivity",
    slug: "productivity-calculator",
    name: { es: "Calculadora de productividad", en: "Productivity Calculator" },
    description: {
      es: "Mide cuánto produces en cierto tiempo para análisis laboral.",
      en: "Measure output over time for work analysis."
    },
    categoryId: "work",
    status: "draft",
    Icon: Timer
  },
  {
    id: "hourly-cost",
    slug: "hourly-cost-calculator",
    name: { es: "Calculadora de costo por hora", en: "Hourly Cost Calculator" },
    description: {
      es: "Calcula cuánto cuesta realmente una hora de trabajo incluyendo gastos.",
      en: "Calculate the real cost of one hour of work, including expenses."
    },
    categoryId: "work",
    status: "draft",
    Icon: BriefcaseBusiness
  },
  {
    id: "weeks-between-dates",
    slug: "weeks-between-dates-calculator",
    name: { es: "Calculadora de semanas entre fechas", en: "Weeks Between Dates Calculator" },
    description: {
      es: "Convierte el tiempo entre dos fechas a semanas y días.",
      en: "Convert the time between two dates into weeks and days."
    },
    categoryId: "time",
    status: "draft",
    Icon: Clock3
  }
];
