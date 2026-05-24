import { getJson, postJson } from "./apiClient";

export type TopSearchConsolePage = {
  url: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

export type TopSearchConsolePagesResponse = {
  source: "search-console" | "unconfigured";
  siteUrl: string;
  startDate: string;
  endDate: string;
  pages: TopSearchConsolePage[];
};

export function getTopSearchConsolePages({
  limit = 6,
  days = 90
}: {
  limit?: number;
  days?: number;
} = {}): Promise<TopSearchConsolePagesResponse> {
  return getJson(`/analytics/search-console/top-pages?limit=${limit}&days=${days}`, {
    es: "No se pudieron cargar las herramientas más buscadas.",
    en: "We couldn't load the most searched tools.",
    hi: "हम सबसे अधिक खोजे गए टूल लोड नहीं कर सके."
  });
}

export type ToolFeedbackRequest = {
  feedbackId?: string;
  toolSlug: string;
  locale: "es" | "en" | "hi";
  helpful: boolean;
  comment?: string;
  pageUrl?: string;
};

export type ToolFeedbackResponse = {
  id: string;
  createdAt: string;
};

export function sendToolFeedback(request: ToolFeedbackRequest): Promise<ToolFeedbackResponse> {
  return postJson("/analytics/feedback/tool", request, {
    es: "No pudimos guardar tu opinión. Intenta de nuevo en unos segundos.",
    en: "We couldn't save your feedback. Please try again in a few seconds.",
    hi: "हम आपकी राय सहेज नहीं सके. कृपया कुछ सेकंड में फिर कोशिश करें."
  });
}
