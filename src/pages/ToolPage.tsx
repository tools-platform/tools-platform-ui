import { ArrowLeft, Clock3 } from "lucide-react";
import { AlphabeticalLineSorter } from "../components/calculators/AlphabeticalLineSorter";
import { Base64Converter } from "../components/calculators/Base64Converter";
import { CaseStyleConverter } from "../components/calculators/CaseStyleConverter";
import { CopUsdConverter } from "../components/calculators/CopUsdConverter";
import { CreditInterestCalculator } from "../components/calculators/CreditInterestCalculator";
import { DaysBetweenDatesCalculator } from "../components/calculators/DaysBetweenDatesCalculator";
import { DaysUntilDateCalculator } from "../components/calculators/DaysUntilDateCalculator";
import { DuplicateCounter } from "../components/calculators/DuplicateCounter";
import { EmployeeSalaryEquivalentCalculator } from "../components/calculators/EmployeeSalaryEquivalentCalculator";
import { EmploymentSettlementColombiaCalculator } from "../components/calculators/EmploymentSettlementColombiaCalculator";
import { ExactAgeCalculator } from "../components/calculators/ExactAgeCalculator";
import { FreelanceRateCalculator } from "../components/calculators/FreelanceRateCalculator";
import { GrossSalaryColombiaCalculator } from "../components/calculators/GrossSalaryColombiaCalculator";
import { HtmlFormatterMinifier } from "../components/calculators/HtmlFormatterMinifier";
import { HtmlPreview } from "../components/calculators/HtmlPreview";
import { HourlySalaryColombiaCalculator } from "../components/calculators/HourlySalaryColombiaCalculator";
import { LoanPaymentCalculator } from "../components/calculators/LoanPaymentCalculator";
import { NetSalaryColombiaCalculator } from "../components/calculators/NetSalaryColombiaCalculator";
import { OvertimeColombiaCalculator } from "../components/calculators/OvertimeColombiaCalculator";
import { PercentageCalculator } from "../components/calculators/PercentageCalculator";
import { RemoveAccents } from "../components/calculators/RemoveAccents";
import { RemoveExtraSpaces } from "../components/calculators/RemoveExtraSpaces";
import { RandomTextGenerator } from "../components/calculators/RandomTextGenerator";
import { SecurePasswordGenerator } from "../components/calculators/SecurePasswordGenerator";
import { SalaryIncreaseCalculator } from "../components/calculators/SalaryIncreaseCalculator";
import { TextCaseConverter } from "../components/calculators/TextCaseConverter";
import { UnitConverter } from "../components/calculators/UnitConverter";
import { WorkedHoursCalculator } from "../components/calculators/WorkedHoursCalculator";
import { RelatedTools } from "../components/RelatedTools";
import { ToolSeoContent } from "../components/ToolSeoContent";
import { categories, tools } from "../data/catalog";
import { toolContentById } from "../data/toolContent";
import { getLocalizedText, useLocale } from "../i18n";

type ToolPageProps = {
  slug: string;
};

export function ToolPage({ slug }: ToolPageProps) {
  const { locale, localizePath } = useLocale();
  const tool = tools.find((item) => item.slug === slug);
  const category = categories.find((item) => item.id === tool?.categoryId);
  const copy =
    locale === "en"
      ? {
          back: "All tools",
          notFoundTitle: "Tool not found",
          notFoundCopy: "This URL does not exist in the catalog yet.",
          preparedTitle: "Page ready",
          preparedCopy:
            "We will place the form, action button, results, and SEO content here when this tool goes live."
        }
      : {
          back: "Todas las herramientas",
          notFoundTitle: "Herramienta no encontrada",
          notFoundCopy: "Esta URL todavía no existe en el catálogo.",
          preparedTitle: "Página preparada",
          preparedCopy:
            "Aquí montaremos el formulario, botón de cálculo, resultados y texto SEO cuando activemos esta herramienta."
        };

  if (!tool) {
    return (
      <section className="tool-page">
        <a className="back-link" href={localizePath("/")}>
          <ArrowLeft size={17} />
          {copy.back}
        </a>

        <div className="empty-state">
          <h1>{copy.notFoundTitle}</h1>
          <p>{copy.notFoundCopy}</p>
        </div>
      </section>
    );
  }

  const seoContent = toolContentById[tool.id];

  return (
    <section className="tool-page">
      <div className="tool-page__topbar">
        <a className="back-link" href={localizePath("/")}>
          <ArrowLeft size={17} />
          {copy.back}
        </a>

        {category ? (
          <div className="tool-page__category-pill">
            <category.Icon size={16} strokeWidth={2.1} />
            {getLocalizedText(category.name, locale)}
          </div>
        ) : null}
      </div>

      <header className="tool-page__header">
        <h1>{getLocalizedText(tool.name, locale)}</h1>
        <span>{getLocalizedText(tool.description, locale)}</span>
      </header>

      {tool.id === "net-salary-colombia" ? (
        <NetSalaryColombiaCalculator />
      ) : tool.id === "gross-salary-colombia" ? (
        <GrossSalaryColombiaCalculator />
      ) : tool.id === "hourly-salary" ? (
        <HourlySalaryColombiaCalculator />
      ) : tool.id === "overtime-colombia" ? (
        <OvertimeColombiaCalculator />
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
      ) : tool.id === "employee-salary-equivalent" ? (
        <EmployeeSalaryEquivalentCalculator />
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
      ) : tool.id === "duplicate-counter" ? (
        <DuplicateCounter />
      ) : tool.id === "remove-extra-spaces" ? (
        <RemoveExtraSpaces />
      ) : tool.id === "remove-accents" ? (
        <RemoveAccents />
      ) : tool.id === "random-text-generator" ? (
        <RandomTextGenerator />
      ) : tool.id === "alphabetical-line-sorter" ? (
        <AlphabeticalLineSorter />
      ) : tool.id === "percentage-calculator" ? (
        <PercentageCalculator />
      ) : tool.id === "secure-password-generator" ? (
        <SecurePasswordGenerator />
      ) : tool.id === "case-style-converter" ? (
        <CaseStyleConverter />
      ) : tool.id === "base64-converter" ? (
        <Base64Converter />
      ) : tool.id === "html-preview" ? (
        <HtmlPreview />
      ) : tool.id === "html-formatter-minifier" ? (
        <HtmlFormatterMinifier />
      ) : tool.id === "salary-increase" ? (
        <SalaryIncreaseCalculator />
      ) : tool.id === "days-until-date" ? (
        <DaysUntilDateCalculator />
      ) : (
        <div className="tool-placeholder">
          <Clock3 size={28} strokeWidth={2.05} />
          <h2>{copy.preparedTitle}</h2>
          <p>{copy.preparedCopy}</p>
        </div>
      )}

      {seoContent ? <ToolSeoContent content={seoContent} toolId={tool.id} /> : null}
      <RelatedTools currentTool={tool} />
    </section>
  );
}
