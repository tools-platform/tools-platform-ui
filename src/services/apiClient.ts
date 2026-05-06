import { getLocaleFromPathname, type Locale } from "../i18n";

const DEFAULT_API_BASE_URL = import.meta.env.DEV ? "http://localhost:4000/api/v1" : "/api/v1";

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL).replace(/\/$/, "");

type ApiErrorResponse = {
  success: false;
  error: {
    code?: string;
    message?: string;
    details?: unknown;
  };
};

type ApiSuccessResponse<T> = {
  success: true;
  data: T;
};

const fallbackMessages: Record<
  Locale,
  { connection: string; generic: string; notAllowed: string; notFound: string; temporary: string }
> = {
  es: {
    connection: "No pudimos conectar con la API. Revisa tu conexión e intenta de nuevo en unos segundos.",
    generic: "No pudimos completar el cálculo. Intenta de nuevo en unos segundos.",
    notAllowed: "No tienes permiso para consultar esta herramienta desde este origen.",
    notFound: "No encontramos el servicio de esta herramienta. Intenta de nuevo más tarde.",
    temporary: "La API tuvo un problema temporal. Intenta de nuevo en unos segundos."
  },
  en: {
    connection: "We couldn't connect to the API. Check your connection and try again in a few seconds.",
    generic: "We couldn't complete the calculation. Try again in a few seconds.",
    notAllowed: "You don't have permission to use this tool from this origin.",
    notFound: "We couldn't find the service for this tool. Please try again later.",
    temporary: "The API had a temporary problem. Try again in a few seconds."
  }
};

function getCurrentLocale() {
  return getLocaleFromPathname(window.location.pathname);
}

function getFriendlyStatusMessage(locale: Locale, status: number, fallbackMessage: string) {
  const messages = fallbackMessages[locale];

  if (status === 400 || status === 422) {
    return fallbackMessage;
  }

  if (status === 401 || status === 403) {
    return messages.notAllowed;
  }

  if (status === 404) {
    return messages.notFound;
  }

  if (status >= 500) {
    return messages.temporary;
  }

  return fallbackMessage;
}

export async function postJson<TData, TRequest>(
  path: string,
  request: TRequest,
  localizedFallbackMessage?: string | Partial<Record<Locale, string>>
): Promise<TData> {
  const locale = getCurrentLocale();
  const messages = fallbackMessages[locale];
  const fallbackMessage =
    typeof localizedFallbackMessage === "string"
      ? locale === "es"
        ? localizedFallbackMessage
        : messages.generic
      : localizedFallbackMessage?.[locale] ?? messages.generic;

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });
  } catch {
    throw new Error(messages.connection);
  }

  let payload: ApiSuccessResponse<TData> | ApiErrorResponse | null = null;

  try {
    payload = (await response.json()) as ApiSuccessResponse<TData> | ApiErrorResponse;
  } catch {
    if (!response.ok) {
      throw new Error(getFriendlyStatusMessage(locale, response.status, fallbackMessage));
    }

    throw new Error(messages.generic);
  }

  if (!response.ok || !payload.success) {
    throw new Error(getFriendlyStatusMessage(locale, response.status, fallbackMessage));
  }

  return payload.data;
}
