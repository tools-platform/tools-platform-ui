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
    description: "Calculadoras para salario, creditos, prestaciones y conversiones.",
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
    name: "Calculadora salario neto Colombia",
    description: "Calcula cuanto recibes despues de salud, pension y descuentos basicos.",
    categoryId: "finance",
    status: "draft",
    Icon: Banknote
  },
  {
    id: "employment-settlement-colombia",
    slug: "calculadora-liquidacion-colombia",
    name: "Calculadora liquidacion Colombia",
    description: "Estima cesantias, intereses, prima, vacaciones e indemnizacion si aplica.",
    categoryId: "finance",
    status: "draft",
    Icon: HandCoins
  },
  {
    id: "credit-interest",
    slug: "calculadora-intereses-credito",
    name: "Calculadora intereses credito",
    description: "Revisa cuanto pagarias en total segun monto, tasa y plazo.",
    categoryId: "finance",
    status: "draft",
    Icon: Landmark
  },
  {
    id: "loan-payment",
    slug: "calculadora-cuota-prestamo",
    name: "Calculadora cuota prestamo",
    description: "Calcula el valor aproximado de una cuota mensual antes de endeudarte.",
    categoryId: "finance",
    status: "draft",
    Icon: BadgeDollarSign
  },
  {
    id: "cop-usd",
    slug: "conversor-cop-usd",
    name: "Conversor COP a USD",
    description: "Convierte pesos colombianos a dolares de forma rapida.",
    categoryId: "finance",
    status: "draft",
    Icon: Coins
  },
  {
    id: "worked-hours",
    slug: "calculadora-horas-trabajadas",
    name: "Calculadora horas trabajadas",
    description: "Calcula horas entre fechas o rangos para trabajo y freelancing.",
    categoryId: "work",
    status: "draft",
    Icon: Timer
  },
  {
    id: "freelance-rate",
    slug: "calculadora-cuanto-cobrar-freelance",
    name: "Calculadora cuanto cobrar freelance",
    description: "Sugiere una tarifa a partir de ingresos deseados, gastos y tiempo.",
    categoryId: "work",
    status: "draft",
    Icon: BriefcaseBusiness
  },
  {
    id: "days-between-dates",
    slug: "contador-dias-entre-fechas",
    name: "Contador dias entre fechas",
    description: "Cuenta cuantos dias hay entre dos fechas para tramites o planeacion.",
    categoryId: "time",
    status: "draft",
    Icon: CalendarDays
  },
  {
    id: "exact-age",
    slug: "calculadora-edad-exacta",
    name: "Calculadora edad exacta",
    description: "Calcula edad en anos, meses y dias.",
    categoryId: "time",
    status: "draft",
    Icon: Clock3
  },
  {
    id: "unit-converter",
    slug: "conversor-de-unidades",
    name: "Conversor de unidades",
    description: "Convierte kilometros, millas, kilos, libras y mas unidades comunes.",
    categoryId: "utilities",
    status: "draft",
    Icon: Ruler
  },
  {
    id: "text-case-converter",
    slug: "convertidor-mayusculas-minusculas",
    name: "Convertidor mayusculas minusculas",
    description: "Transforma texto a mayusculas, minusculas o capitalizado.",
    categoryId: "utilities",
    status: "draft",
    Icon: LetterText
  },
  {
    id: "json-formatter",
    slug: "formateador-json",
    name: "Formateador JSON",
    description: "Organiza JSON para hacerlo legible y facil de revisar.",
    categoryId: "development",
    status: "draft",
    Icon: FileJson
  },
  {
    id: "uuid-generator",
    slug: "generador-uuid",
    name: "Generador UUID",
    description: "Crea identificadores unicos para sistemas y pruebas.",
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
    name: "Calculadora aumento salarial",
    description: "Calcula como queda un salario despues de un aumento porcentual.",
    categoryId: "finance",
    status: "draft",
    Icon: Repeat2
  }
];
