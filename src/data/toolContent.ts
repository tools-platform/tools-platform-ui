import type { LocalizedText } from "../i18n";

export type ToolContent = {
  intro: LocalizedText;
  sections: Array<{
    title: LocalizedText;
    body: LocalizedText[];
  }>;
  faqs: Array<{
    question: LocalizedText;
    answer: LocalizedText;
  }>;
};

export { toolContentById } from "../locales/toolContentCopy";
