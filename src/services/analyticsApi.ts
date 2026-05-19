import { getJson } from "./apiClient";

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
    en: "We couldn't load the most searched tools."
  });
}
