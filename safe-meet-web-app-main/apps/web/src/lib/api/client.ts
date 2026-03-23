// ============================================================
// apps/web/src/lib/api/client.ts
// Base fetch wrapper + error normalization
// All API calls go through this — never call fetch() directly
// ============================================================

import { ApiError } from "@/lib/types";

// ------------------------------------------------------------
// Config
// ------------------------------------------------------------

/**
 * Switch between mock and real API via .env:
 *   NEXT_PUBLIC_API_URL=http://localhost:4000   ← real backend
 *   NEXT_PUBLIC_API_URL=                        ← mock mode (empty = mock)
 */
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export const isMockMode = BASE_URL === "";

// ------------------------------------------------------------
// Custom error class
// ------------------------------------------------------------

export class ApiRequestError extends Error {
  statusCode: number;
  code: string;

  constructor(error: ApiError) {
    super(error.message);
    this.name = "ApiRequestError";
    this.statusCode = error.statusCode;
    this.code = error.code;
  }
}

// ------------------------------------------------------------
// Request options
// ------------------------------------------------------------

interface RequestOptions extends Omit<RequestInit, "body"> {
  params?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
}

// ------------------------------------------------------------
// Core fetch wrapper
// ------------------------------------------------------------

async function request<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, body, headers, ...rest } = options;

  // Build URL with query params
  const url = new URL(`${BASE_URL}${path}`, typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  // Build request
  const init: RequestInit = {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body !== undefined) {
    init.body = JSON.stringify(body);
  }

  // Execute
  let response: Response;
  try {
    response = await fetch(url.toString(), init);
  } catch {
    throw new ApiRequestError({
      code: "NETWORK_ERROR",
      message: "Network request failed. Check your connection.",
      statusCode: 0,
    });
  }

  // Parse response
  let data: unknown;
  const contentType = response.headers.get("content-type") ?? "";

  try {
    data = contentType.includes("application/json")
      ? await response.json()
      : await response.text();
  } catch {
    throw new ApiRequestError({
      code: "PARSE_ERROR",
      message: "Failed to parse server response.",
      statusCode: response.status,
    });
  }

  // Handle HTTP errors
  if (!response.ok) {
    const err = data as Partial<ApiError>;
    throw new ApiRequestError({
      code: err.code ?? "UNKNOWN_ERROR",
      message: err.message ?? `Request failed with status ${response.status}`,
      statusCode: response.status,
    });
  }

  return data as T;
}

// ------------------------------------------------------------
// HTTP method helpers
// ------------------------------------------------------------

export const apiClient = {
  get: <T>(path: string, params?: RequestOptions["params"]) =>
    request<T>(path, { method: "GET", params }),

  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body }),

  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PATCH", body }),

  delete: <T>(path: string) =>
    request<T>(path, { method: "DELETE" }),
};
