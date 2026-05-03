import { ArrowLeft, Clock3 } from "lucide-react";
import { CopUsdConverter } from "../components/calculators/CopUsdConverter";
import { CreditInterestCalculator } from "../components/calculators/CreditInterestCalculator";
import { DaysBetweenDatesCalculator } from "../components/calculators/DaysBetweenDatesCalculator";
import { EmploymentSettlementColombiaCalculator } from "../components/calculators/EmploymentSettlementColombiaCalculator";
import { ExactAgeCalculator } from "../components/calculators/ExactAgeCalculator";
import { FreelanceRateCalculator } from "../components/calculators/FreelanceRateCalculator";
import { LoanPaymentCalculator } from "../components/calculators/LoanPaymentCalculator";
import { NetSalaryColombiaCalculator } from "../components/calculators/NetSalaryColombiaCalculator";
import { WorkedHoursCalculator } from "../components/calculators/WorkedHoursCalculator";
import { categories, tools } from "../data/catalog";

type ToolPageProps = {
  slug: string;
};

export function ToolPage({ slug }: ToolPageProps) {
  const tool = tools.find((item) => item.slug === slug);
  const category = categories.find((item) => item.id === tool?.categoryId);

  if (!tool) {
    return (
      <section className="tool-page">
        <a className="back-link" href="/">
          <ArrowLeft size={17} />
          Todas las herramientas
        </a>

        <div className="empty-state">
          <h1>Herramienta no encontrada</h1>
          <p>Esta URL todavía no existe en el catálogo.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="tool-page">
      <div className="tool-page__topbar">
        <a className="back-link" href="/">
          <ArrowLeft size={17} />
          Todas las herramientas
        </a>

        {category ? (
          <div className="tool-page__category-pill">
            <category.Icon size={16} strokeWidth={2.1} />
            {category.name}
          </div>
        ) : null}
      </div>

      <header className="tool-page__header">
        <h1>{tool.name}</h1>
        <span>{tool.description}</span>
      </header>

      {tool.id === "net-salary-colombia" ? (
        <NetSalaryColombiaCalculator />
      ) : tool.id === "employment-settlement-colombia" ? (
        <EmploymentSettlementColombiaCalculator />
      ) : tool.id === "credit-interest" ? (
        <CreditInterestCalculator />
      ) : tool.id === "loan-payment" ? (
        <LoanPaymentCalculator />
      ) : tool.id === "cop-usd" ? (
        <CopUsdConverter />
      ) : tool.id === "worked-hours" ? (
        <WorkedHoursCalculator />
      ) : tool.id === "freelance-rate" ? (
        <FreelanceRateCalculator />
      ) : tool.id === "days-between-dates" ? (
        <DaysBetweenDatesCalculator />
      ) : tool.id === "exact-age" ? (
        <ExactAgeCalculator />
      ) : (
        <div className="tool-placeholder">
          <Clock3 size={28} strokeWidth={2.05} />
          <h2>Pagina preparada</h2>
          <p>
            Aquí montaremos el formulario, botón de cálculo, resultados y texto SEO
            cuando activemos esta herramienta.
          </p>
        </div>
      )}
    </section>
  );
}
