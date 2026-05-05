import { ArrowLeft, Clock3 } from "lucide-react";
import { CaseStyleConverter } from "../components/calculators/CaseStyleConverter";
import { CopUsdConverter } from "../components/calculators/CopUsdConverter";
import { CreditInterestCalculator } from "../components/calculators/CreditInterestCalculator";
import { DaysBetweenDatesCalculator } from "../components/calculators/DaysBetweenDatesCalculator";
import { EmploymentSettlementColombiaCalculator } from "../components/calculators/EmploymentSettlementColombiaCalculator";
import { ExactAgeCalculator } from "../components/calculators/ExactAgeCalculator";
import { FreelanceRateCalculator } from "../components/calculators/FreelanceRateCalculator";
import { HourlySalaryColombiaCalculator } from "../components/calculators/HourlySalaryColombiaCalculator";
import { LoanPaymentCalculator } from "../components/calculators/LoanPaymentCalculator";
import { NetSalaryColombiaCalculator } from "../components/calculators/NetSalaryColombiaCalculator";
import { SecurePasswordGenerator } from "../components/calculators/SecurePasswordGenerator";
import { TextCaseConverter } from "../components/calculators/TextCaseConverter";
import { UnitConverter } from "../components/calculators/UnitConverter";
import { WorkedHoursCalculator } from "../components/calculators/WorkedHoursCalculator";
import { ToolSeoContent } from "../components/ToolSeoContent";
import { categories, tools } from "../data/catalog";
import { toolContentById } from "../data/toolContent";

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

  const seoContent = toolContentById[tool.id];

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
      ) : tool.id === "hourly-salary" ? (
        <HourlySalaryColombiaCalculator />
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
      ) : tool.id === "unit-converter" ? (
        <UnitConverter />
      ) : tool.id === "text-case-converter" ? (
        <TextCaseConverter />
      ) : tool.id === "secure-password-generator" ? (
        <SecurePasswordGenerator />
      ) : tool.id === "case-style-converter" ? (
        <CaseStyleConverter />
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

      {seoContent ? <ToolSeoContent content={seoContent} /> : null}
    </section>
  );
}
