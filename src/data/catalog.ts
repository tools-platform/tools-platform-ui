import {
  BadgeDollarSign,
  Banknote,
  Binary,
  BriefcaseBusiness,
  Calculator,
  CalendarClock,
  CalendarDays,
  Clock3,
  Code2,
  Coins,
  Eraser,
  FileJson,
  FileText,
  HandCoins,
  Hash,
  KeyRound,
  Landmark,
  Languages,
  LetterText,
  ListChecks,
  ArrowDownAZ,
  Percent,
  Repeat2,
  Replace,
  Ruler,
  Shuffle,
  Timer,
  Wrench
} from "lucide-react";
import type { ComponentType } from "react";
import type { LocalizedText } from "../i18n";
import { categoryCopy, toolCopy } from "../locales/catalogCopy";

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
    ...categoryCopy["finance"],
    Icon: Calculator
  },
  {
    id: "work",
    ...categoryCopy["work"],
    Icon: BriefcaseBusiness
  },
  {
    id: "time",
    ...categoryCopy["time"],
    Icon: Clock3
  },
  {
    id: "utilities",
    ...categoryCopy["utilities"],
    Icon: Wrench
  },
  {
    id: "development",
    ...categoryCopy["development"],
    Icon: Code2
  }
];

export const tools: ToolSummary[] = [

  {
    id: "net-salary-colombia",
    slug: "colombia-net-salary-calculator",
    ...toolCopy["net-salary-colombia"],
    categoryId: "finance",
    status: "published",
    Icon: Banknote
  },
  {
    id: "gross-salary-colombia",
    slug: "colombia-gross-salary-calculator",
    ...toolCopy["gross-salary-colombia"],
    categoryId: "finance",
    status: "published",
    Icon: Banknote
  },
  {
    id: "employment-settlement-colombia",
    slug: "colombia-employment-settlement-calculator",
    ...toolCopy["employment-settlement-colombia"],
    categoryId: "finance",
    status: "published",
    Icon: HandCoins
  },
  {
    id: "social-benefits-colombia",
    slug: "social-benefits-colombia",
    ...toolCopy["social-benefits-colombia"],
    categoryId: "finance",
    status: "published",
    Icon: HandCoins
  },
  {
    id: "credit-interest",
    slug: "credit-interest-calculator",
    ...toolCopy["credit-interest"],
    categoryId: "finance",
    status: "published",
    Icon: Landmark
  },
  {
    id: "loan-payment",
    slug: "loan-payment-calculator",
    ...toolCopy["loan-payment"],
    categoryId: "finance",
    status: "published",
    Icon: BadgeDollarSign
  },
  {
    id: "cop-usd",
    slug: "cop-to-usd-converter",
    ...toolCopy["cop-usd"],
    categoryId: "finance",
    status: "published",
    Icon: Coins
  },
  {
    id: "salary-increase",
    slug: "salary-increase-calculator",
    ...toolCopy["salary-increase"],
    categoryId: "finance",
    status: "published",
    Icon: Repeat2
  },
  {
    id: "annual-salary",
    slug: "annual-salary-calculator",
    ...toolCopy["annual-salary"],
    categoryId: "finance",
    status: "published",
    Icon: Banknote
  },
  {
    id: "worked-hours",
    slug: "worked-hours-calculator",
    ...toolCopy["worked-hours"],
    categoryId: "work",
    status: "published",
    Icon: Timer
  },
  {
    id: "hourly-salary",
    slug: "hourly-salary-calculator",
    ...toolCopy["hourly-salary"],
    categoryId: "work",
    status: "published",
    Icon: Clock3
  },
  {
    id: "employee-salary-equivalent",
    slug: "employee-salary-for-independents-calculator",
    ...toolCopy["employee-salary-equivalent"],
    categoryId: "work",
    status: "published",
    Icon: BriefcaseBusiness
  },
  {
    id: "freelance-rate",
    slug: "freelance-rate-calculator",
    ...toolCopy["freelance-rate"],
    categoryId: "work",
    status: "published",
    Icon: BriefcaseBusiness
  },
  {
    id: "overtime-colombia",
    slug: "colombia-overtime-calculator",
    ...toolCopy["overtime-colombia"],
    categoryId: "work",
    status: "published",
    Icon: Timer
  },
  {
    id: "days-between-dates",
    slug: "days-between-dates-calculator",
    ...toolCopy["days-between-dates"],
    categoryId: "time",
    status: "published",
    Icon: CalendarDays
  },
  {
    id: "weeks-between-dates",
    slug: "weeks-between-dates-calculator",
    ...toolCopy["weeks-between-dates"],
    categoryId: "time",
    status: "published",
    Icon: Clock3
  },
  {
    id: "exact-age",
    slug: "exact-age-calculator",
    ...toolCopy["exact-age"],
    categoryId: "time",
    status: "published",
    Icon: Clock3
  },
  {
    id: "days-until-date",
    slug: "days-until-date-calculator",
    ...toolCopy["days-until-date"],
    categoryId: "time",
    status: "published",
    Icon: CalendarDays
  },
  {
    id: "unit-converter",
    slug: "unit-converter",
    ...toolCopy["unit-converter"],
    categoryId: "utilities",
    status: "published",
    Icon: Ruler
  },
  {
    id: "text-case-converter",
    slug: "text-case-converter",
    ...toolCopy["text-case-converter"],
    categoryId: "utilities",
    status: "published",
    Icon: LetterText
  },
  {
    id: "duplicate-counter",
    slug: "duplicate-counter",
    ...toolCopy["duplicate-counter"],
    categoryId: "utilities",
    status: "published",
    Icon: ListChecks
  },
  {
    id: "word-character-counter",
    slug: "word-character-counter",
    ...toolCopy["word-character-counter"],
    categoryId: "utilities",
    status: "published",
    Icon: FileText
  },
  {
    id: "find-replace-text",
    slug: "find-replace-text",
    ...toolCopy["find-replace-text"],
    categoryId: "utilities",
    status: "published",
    Icon: Replace
  },
  {
    id: "remove-extra-spaces",
    slug: "remove-extra-spaces",
    ...toolCopy["remove-extra-spaces"],
    categoryId: "utilities",
    status: "published",
    Icon: Eraser
  },
  {
    id: "remove-accents",
    slug: "remove-accents",
    ...toolCopy["remove-accents"],
    categoryId: "utilities",
    status: "published",
    Icon: Languages
  },
  {
    id: "secure-password-generator",
    slug: "secure-password-generator",
    ...toolCopy["secure-password-generator"],
    categoryId: "utilities",
    status: "published",
    Icon: KeyRound
  },
  {
    id: "random-text-generator",
    slug: "random-text-generator",
    ...toolCopy["random-text-generator"],
    categoryId: "utilities",
    status: "published",
    Icon: Shuffle
  },
  {
    id: "alphabetical-line-sorter",
    slug: "alphabetical-line-sorter",
    ...toolCopy["alphabetical-line-sorter"],
    categoryId: "utilities",
    status: "published",
    Icon: ArrowDownAZ
  },
  {
    id: "percentage-calculator",
    slug: "percentage-calculator",
    ...toolCopy["percentage-calculator"],
    categoryId: "utilities",
    status: "published",
    Icon: Percent
  },
  {
    id: "case-style-converter",
    slug: "case-style-converter",
    ...toolCopy["case-style-converter"],
    categoryId: "development",
    status: "published",
    Icon: Code2
  },
  {
    id: "base64-converter",
    slug: "base64-encoder-decoder",
    ...toolCopy["base64-converter"],
    categoryId: "development",
    status: "published",
    Icon: Binary
  },
  {
    id: "html-preview",
    slug: "html-preview-online",
    ...toolCopy["html-preview"],
    categoryId: "development",
    status: "published",
    Icon: Code2
  },
  {
    id: "html-formatter-minifier",
    slug: "html-formatter-minifier",
    ...toolCopy["html-formatter-minifier"],
    categoryId: "development",
    status: "published",
    Icon: Code2
  },
  {
    id: "json-formatter",
    slug: "json-formatter",
    ...toolCopy["json-formatter"],
    categoryId: "development",
    status: "published",
    Icon: FileJson
  },
  {
    id: "uuid-generator",
    slug: "uuid-generator",
    ...toolCopy["uuid-generator"],
    categoryId: "development",
    status: "published",
    Icon: Binary
  },
  {
    id: "hash-generator",
    slug: "hash-generator",
    ...toolCopy["hash-generator"],
    categoryId: "development",
    status: "published",
    Icon: Hash
  },
  {
    id: "simple-cron-generator",
    slug: "simple-cron-generator",
    ...toolCopy["simple-cron-generator"],
    categoryId: "development",
    status: "published",
    Icon: CalendarClock
  }
];
