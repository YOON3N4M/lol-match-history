import { ApiError } from "./ApiError";

type RequestOptions = Omit<RequestInit, "body"> & {
  params?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  timeoutMs?: number;
  next?: {
    revalidate?: false | 0 | number;
    tags?: string[];
  };
};

type HttpClientOptions = {
  baseUrl?: string;
  headers?: HeadersInit;
  getHeaders?: () => HeadersInit;
  timeoutMs?: number;
};

export function fetchClient({ baseUrl, headers, getHeaders, timeoutMs = 10000 }: HttpClientOptions) {
  async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { params, body, timeoutMs: requestTimeoutMs, headers: requestHeaders, ...restOptions } = options;

    const url = createUrl(path, baseUrl);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), requestTimeoutMs ?? timeoutMs);

    try {
      const response = await fetch(url.toString(), {
        ...restOptions,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...headers,
          ...getHeaders?.(),
          ...requestHeaders,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      const contentType = response.headers.get("content-type");
      const isJson = contentType?.includes("application/json");

      const data = isJson ? await response.json() : await response.text();

      if (!response.ok) {
        throw new ApiError({
          status: response.status,
          message: getErrorMessage(data, response.status),
          data,
          url: url.toString(),
        });
      }

      return data as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof Error && error.name === "AbortError") {
        throw new ApiError({
          status: 408,
          message: "요청 시간이 초과되었습니다.",
          url: url.toString(),
        });
      }

      throw new ApiError({
        status: 500,
        message: "네트워크 요청 중 오류가 발생했습니다.",
        data: error,
        url: url.toString(),
      });
    } finally {
      clearTimeout(timeoutId);
    }
  }

  return {
    get: <T>(path: string, options?: RequestOptions) => request<T>(path, { ...options, method: "GET" }),

    post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
      request<T>(path, { ...options, method: "POST", body }),

    put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
      request<T>(path, { ...options, method: "PUT", body }),

    patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
      request<T>(path, { ...options, method: "PATCH", body }),

    delete: <T>(path: string, options?: RequestOptions) => request<T>(path, { ...options, method: "DELETE" }),
  };
}

function createUrl(path: string, baseUrl?: string) {
  const normalizedBaseUrl = baseUrl?.trim();

  if (isAbsoluteUrl(path)) {
    return new URL(path);
  }

  if (normalizedBaseUrl && isAbsoluteUrl(normalizedBaseUrl)) {
    return new URL(path, normalizedBaseUrl);
  }

  const runtimeBaseUrl = getRuntimeBaseUrl();

  if (normalizedBaseUrl) {
    return new URL(path, new URL(normalizedBaseUrl, runtimeBaseUrl));
  }

  return new URL(path, runtimeBaseUrl);
}

function getRuntimeBaseUrl() {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  const serverBaseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

  if (serverBaseUrl) {
    return serverBaseUrl;
  }

  throw new TypeError("Relative request paths require an absolute base URL outside the browser.");
}

function isAbsoluteUrl(value: string) {
  return /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(value);
}

function getErrorMessage(data: unknown, status: number) {
  if (typeof data === "object" && data !== null && "message" in data && typeof data.message === "string") {
    return data.message;
  }

  switch (status) {
    case 400:
      return "잘못된 요청입니다.";
    case 401:
      return "인증이 필요합니다.";
    case 403:
      return "접근 권한이 없습니다.";
    case 404:
      return "요청한 데이터를 찾을 수 없습니다.";
    case 429:
      return "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.";
    default:
      return "요청 처리 중 오류가 발생했습니다.";
  }
}
