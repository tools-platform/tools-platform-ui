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
  FileJson,
  HandCoins,
  Hash,
  KeyRound,
  Landmark,
  LetterText,
  Repeat2,
  Ruler,
  Timer,
  Wrench
} from "lucide-react";
import type { ComponentType } from "react";

export type CatalogIcon = ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;

export type Category = {
  id: string;
  name: string;
  description: string;
  Icon: CatalogIcon;
};

export type ToolSummary = {
  id: string;
  slug: string;
  name: string;
  description: string;
  categoryId: string;
  status: "draft" | "published";
  Icon: CatalogIcon;
};

export const categories: Category[] = [
  {
    id: "finance",
    name: "Finanzas",
    description: "Calculadoras para salario, créditos, prestaciones y conversiones.",
    Icon: Calculator
  },
  {
    id: "work",
    name: "Trabajo",
    description: "Herramientas para horas, tarifas freelance y productividad.",
    Icon: BriefcaseBusiness
  },
  {
    id: "time",
    name: "Tiempo",
    description: "Fechas, edades exactas, semanas y cuentas regresivas.",
    Icon: Clock3
  },
  {
    id: "utilities",
    name: "Utilidades",
    description: "Conversiones, texto, unidades y tareas repetitivas.",
    Icon: Wrench
  },
  {
    id: "development",
    name: "Desarrollo",
    description: "JSON, UUID, hashes y utilidades para programadores.",
    Icon: Code2
  }
];

export const tools: ToolSummary[] = [
  {
    id: "net-salary-colombia",
    slug: "colombia-net-salary-calculator",
    name: "Calculadora de salario neto (Colombia)",
    description: "Cuánto recibes después de salud y pensión.",
    categoryId: "finance",
    status: "published",
    Icon: Banknote
  },
  {
    id: "employment-settlement-colombia",
    slug: "colombia-employment-settlement-calculator",
    name: "Calculadora de liquidación (Colombia)",
    description: "Cesantías, prima y vacaciones al salir del trabajo.",
    categoryId: "finance",
    status: "published",
    Icon: HandCoins
  },
  {
    id: "credit-interest",
    slug: "credit-interest-calculator",
    name: "Calculadora de intereses de crédito",
    description: "Cuánto pagas en total por un préstamo.",
    categoryId: "finance",
    status: "published",
    Icon: Landmark
  },
  {
    id: "loan-payment",
    slug: "loan-payment-calculator",
    name: "Cuota de préstamo",
    description: "Valor de la cuota mensual de un crédito.",
    categoryId: "finance",
    status: "published",
    Icon: BadgeDollarSign
  },
  {
    id: "cop-usd",
    slug: "cop-to-usd-converter",
    name: "Conversor COP a USD",
    description: "Convierte pesos colombianos a dólares de forma rápida.",
    categoryId: "finance",
    status: "published",
    Icon: Coins
  },
  {
    id: "worked-hours",
    slug: "worked-hours-calculator",
    name: "Calculadora de horas trabajadas",
    description: "Calcula horas entre fechas o rangos para trabajo y freelancing.",
    categoryId: "work",
    status: "published",
    Icon: Timer
  },
  {
    id: "freelance-rate",
    slug: "freelance-rate-calculator",
    name: "Calculadora de cuánto cobrar freelance",
    description: "Sugiere una tarifa según tu meta mensual y horas de trabajo.",
    categoryId: "work",
    status: "published",
    Icon: BriefcaseBusiness
  },
  {
    id: "days-between-dates",
    slug: "days-between-dates-calculator",
    name: "Contador de días entre fechas",
    description: "Cuenta cuántos días hay entre dos fechas para trámites o planeación.",
    categoryId: "time",
    status: "published",
    Icon: CalendarDays
  },
  {
    id: "exact-age",
    slug: "exact-age-calculator",
    name: "Calculadora de edad exacta",
    description: "Calcula edad en años, meses y días.",
    categoryId: "time",
    status: "published",
    Icon: Clock3
  },
  {
    id: "unit-converter",
    slug: "unit-converter",
    name: "Conversor de unidades",
    description: "Convierte kilómetros, millas, kilos, libras y más unidades comunes.",
    categoryId: "utilities",
    status: "published",
    Icon: Ruler
  },
  {
    id: "text-case-converter",
    slug: "text-case-converter",
    name: "Convertidor de mayúsculas y minúsculas",
    description: "Transforma texto a mayúsculas, minúsculas o capitalizado.",
    categoryId: "utilities",
    status: "published",
    Icon: LetterText
  },
  {
    id: "secure-password-generator",
    slug: "secure-password-generator",
    name: "Generador de contraseñas seguras",
    description: "Crea contraseñas aleatorias y seguras en tu navegador.",
    categoryId: "utilities",
    status: "published",
    Icon: KeyRound
  },
  {
    id: "json-formatter",
    slug: "json-formatter",
    name: "Formateador JSON",
    description: "Organiza JSON para hacerlo legible y fácil de revisar.",
    categoryId: "development",
    status: "draft",
    Icon: FileJson
  },
  {
    id: "case-style-converter",
    slug: "case-style-converter",
    name: "Convertidor de estilos de texto para código",
    description: "Convierte frases a camelCase, PascalCase, snake_case, kebab-case y más formatos.",
    categoryId: "development",
    status: "published",
    Icon: Code2
  },
  {
    id: "uuid-generator",
    slug: "uuid-generator",
    name: "Generador UUID",
    description: "Crea identificadores únicos para sistemas y pruebas.",
    categoryId: "development",
    status: "draft",
    Icon: Binary
  },
  {
    id: "hash-generator",
    slug: "hash-generator",
    name: "Generador hash",
    description: "Genera hashes como MD5 o SHA para desarrollo y seguridad.",
    categoryId: "development",
    status: "draft",
    Icon: Hash
  },
  {
    id: "salary-increase",
    slug: "salary-increase-calculator",
    name: "Calculadora de aumento salarial",
    description: "Calcula cómo queda un salario después de un aumento porcentual.",
    categoryId: "finance",
    status: "draft",
    Icon: Repeat2
  },
  {
    id: "hourly-salary",
    slug: "hourly-salary-calculator",
    name: "Calculadora de salario por horas",
    description: "Convierte un salario mensual en valor por hora para comparar ingresos.",
    categoryId: "finance",
    status: "draft",
    Icon: Clock3
  },
  {
    id: "annual-salary",
    slug: "annual-salary-calculator",
    name: "Calculadora de salario anual",
    description: "Calcula cuánto ganas en un año completo según tu salario mensual.",
    categoryId: "finance",
    status: "draft",
    Icon: Banknote
  },
  {
    id: "social-benefits-colombia",
    slug: "colombia-social-benefits-calculator",
    name: "Calculadora de prestaciones sociales",
    description: "Desglosa beneficios como cesantías, prima y vacaciones.",
    categoryId: "finance",
    status: "draft",
    Icon: HandCoins
  },
  {
    id: "productivity",
    slug: "productivity-calculator",
    name: "Calculadora de productividad",
    description: "Mide cuánto produces en cierto tiempo para análisis laboral.",
    categoryId: "work",
    status: "draft",
    Icon: Timer
  },
  {
    id: "hourly-cost",
    slug: "hourly-cost-calculator",
    name: "Calculadora de costo por hora",
    description: "Calcula cuánto cuesta realmente una hora de trabajo incluyendo gastos.",
    categoryId: "work",
    status: "draft",
    Icon: BriefcaseBusiness
  },
  {
    id: "days-until-date",
    slug: "days-until-date-calculator",
    name: "Cuántos días faltan para una fecha",
    description: "Cuenta los días restantes para eventos importantes o entregas.",
    categoryId: "time",
    status: "draft",
    Icon: CalendarDays
  },
  {
    id: "weeks-between-dates",
    slug: "weeks-between-dates-calculator",
    name: "Calculadora de semanas entre fechas",
    description: "Convierte el tiempo entre dos fechas a semanas y días.",
    categoryId: "time",
    status: "draft",
    Icon: Clock3
  }
];
