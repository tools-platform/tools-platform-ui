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
    slug: "calculadora-salario-neto-colombia",
    name: "Calculadora de salario neto (Colombia)",
    description: "Cuánto recibes después de salud y pensión.",
    categoryId: "finance",
    status: "published",
    Icon: Banknote
  },
  {
    id: "employment-settlement-colombia",
    slug: "calculadora-liquidacion-colombia",
    name: "Calculadora de liquidación (Colombia)",
    description: "Cesantías, prima y vacaciones al salir del trabajo.",
    categoryId: "finance",
    status: "draft",
    Icon: HandCoins
  },
  {
    id: "credit-interest",
    slug: "calculadora-intereses-credito",
    name: "Intereses de crédito",
    description: "Cuánto pagas en total por un préstamo.",
    categoryId: "finance",
    status: "draft",
    Icon: Landmark
  },
  {
    id: "loan-payment",
    slug: "calculadora-cuota-prestamo",
    name: "Cuota de préstamo",
    description: "Valor de la cuota mensual de un crédito.",
    categoryId: "finance",
    status: "draft",
    Icon: BadgeDollarSign
  },
  {
    id: "cop-usd",
    slug: "conversor-cop-usd",
    name: "Conversor COP a USD",
    description: "Convierte pesos colombianos a dólares de forma rápida.",
    categoryId: "finance",
    status: "draft",
    Icon: Coins
  },
  {
    id: "worked-hours",
    slug: "calculadora-horas-trabajadas",
    name: "Calculadora de horas trabajadas",
    description: "Calcula horas entre fechas o rangos para trabajo y freelancing.",
    categoryId: "work",
    status: "draft",
    Icon: Timer
  },
  {
    id: "freelance-rate",
    slug: "calculadora-cuanto-cobrar-freelance",
    name: "Calculadora de cuánto cobrar freelance",
    description: "Sugiere una tarifa a partir de ingresos deseados, gastos y tiempo.",
    categoryId: "work",
    status: "draft",
    Icon: BriefcaseBusiness
  },
  {
    id: "days-between-dates",
    slug: "contador-dias-entre-fechas",
    name: "Contador de días entre fechas",
    description: "Cuenta cuántos días hay entre dos fechas para trámites o planeación.",
    categoryId: "time",
    status: "draft",
    Icon: CalendarDays
  },
  {
    id: "exact-age",
    slug: "calculadora-edad-exacta",
    name: "Calculadora de edad exacta",
    description: "Calcula edad en años, meses y días.",
    categoryId: "time",
    status: "draft",
    Icon: Clock3
  },
  {
    id: "unit-converter",
    slug: "conversor-de-unidades",
    name: "Conversor de unidades",
    description: "Convierte kilómetros, millas, kilos, libras y más unidades comunes.",
    categoryId: "utilities",
    status: "draft",
    Icon: Ruler
  },
  {
    id: "text-case-converter",
    slug: "convertidor-mayusculas-minusculas",
    name: "Convertidor de mayúsculas y minúsculas",
    description: "Transforma texto a mayúsculas, minúsculas o capitalizado.",
    categoryId: "utilities",
    status: "draft",
    Icon: LetterText
  },
  {
    id: "json-formatter",
    slug: "formateador-json",
    name: "Formateador JSON",
    description: "Organiza JSON para hacerlo legible y fácil de revisar.",
    categoryId: "development",
    status: "draft",
    Icon: FileJson
  },
  {
    id: "uuid-generator",
    slug: "generador-uuid",
    name: "Generador UUID",
    description: "Crea identificadores únicos para sistemas y pruebas.",
    categoryId: "development",
    status: "draft",
    Icon: Binary
  },
  {
    id: "hash-generator",
    slug: "generador-hash",
    name: "Generador hash",
    description: "Genera hashes como MD5 o SHA para desarrollo y seguridad.",
    categoryId: "development",
    status: "draft",
    Icon: Hash
  },
  {
    id: "salary-increase",
    slug: "calculadora-aumento-salarial",
    name: "Calculadora de aumento salarial",
    description: "Calcula cómo queda un salario después de un aumento porcentual.",
    categoryId: "finance",
    status: "draft",
    Icon: Repeat2
  }
];
