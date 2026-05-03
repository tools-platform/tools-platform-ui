import {
  BriefcaseBusiness,
  Calculator,
  Clock3,
  Code2,
  Wrench
} from "lucide-react";
import type { ComponentType } from "react";

export type Category = {
  id: string;
  name: string;
  description: string;
  Icon: ComponentType<{ size?: number; strokeWidth?: number }>;
};

export type ToolSummary = {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  status: "draft" | "published";
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

export const tools: ToolSummary[] = [];
