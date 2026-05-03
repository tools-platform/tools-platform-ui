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

const GENERIC_CONNECTION_ERROR =
  "No pudimos conectar con la API. Revisa tu conexión e intenta de nuevo en unos segundos.";

const GENERIC_API_ERROR = "No pudimos completar el cálculo. Intenta de nuevo en unos segundos.";

function getFriendlyStatusMessage(status: number, fallbackMessage: string) {
  if (status === 400 || status === 422) {
    return fallbackMessage;
  }

  if (status === 401 || status === 403) {
    return "No tienes permiso para consultar esta herramienta desde este origen.";
  }

  if (status === 404) {
    return "No encontramos el servicio de esta herramienta. Intenta de nuevo más tarde.";
  }

  if (status >= 500) {
    return "La API tuvo un problema temporal. Intenta de nuevo en unos segundos.";
  }

  return fallbackMessage;
}

export async function postJson<TData, TRequest>(
  path: string,
  request: TRequest,
  fallbackMessage = GENERIC_API_ERROR
): Promise<TData> {
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
    throw new Error(GENERIC_CONNECTION_ERROR);
  }

  let payload: ApiSuccessResponse<TData> | ApiErrorResponse | null = null;

  try {
    payload = (await response.json()) as ApiSuccessResponse<TData> | ApiErrorResponse;
  } catch {
    if (!response.ok) {
      throw new Error(getFriendlyStatusMessage(response.status, fallbackMessage));
    }

    throw new Error(GENERIC_API_ERROR);
  }

  if (!response.ok || !payload.success) {
    const backendMessage = !payload.success ? payload.error.message : undefined;
    const message = backendMessage || fallbackMessage;
    throw new Error(getFriendlyStatusMessage(response.status, message));
  }

  return payload.data;
}
