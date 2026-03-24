// ============================================================
// apps/web/src/lib/api/endpoints.ts
// Central route builders — one place for all API URLs
// ============================================================

import { PactFilters, HistoryFilters } from "@/lib/types";
import { apiClient } from "./client";
import {
  DashboardStatsSchema,
  PactSchema,
  PactListSchema,
  ProfileSchema,
  SessionListSchema,
  HistoryListSchema,
  CreatePactResponseSchema,
  QrResponseSchema,
} from "./schemas";
import type {
  DashboardStats,
  Pact,
  Profile,
  Session,
  PaginatedResponse,
} from "@/lib/types";

// ------------------------------------------------------------
// Dashboard
// ------------------------------------------------------------

export const dashboardApi = {
  /** GET /api/dashboard/stats?wallet=... */
  getStats: async (wallet: string): Promise<DashboardStats> => {
    const raw = await apiClient.get("/api/dashboard/stats", { wallet });
    return DashboardStatsSchema.parse(raw);
  },
};

// ------------------------------------------------------------
// Pacts
// ------------------------------------------------------------

export const pactsApi = {
  /** GET /api/pacts?wallet=...&type=...&status=... */
  list: async (filters: PactFilters): Promise<Pact[]> => {
    const raw = await apiClient.get("/api/pacts", filters as unknown as Record<string, string>);
    return PactListSchema.parse(raw);
  },

  /** GET /api/pacts/:id */
  getById: async (id: string): Promise<Pact> => {
    const raw = await apiClient.get(`/api/pacts/${id}`);
    return PactSchema.parse(raw);
  },

  /** POST /api/pacts */
  create: async (payload: CreatePactPayload): Promise<Pact> => {
    const raw = await apiClient.post("/api/pacts", payload);
    return CreatePactResponseSchema.parse(raw);
  },

  /** PATCH /api/pacts/:id/proof */
  submitProof: async (id: string, proofUrl: string): Promise<Pact> => {
    const raw = await apiClient.patch(`/api/pacts/${id}/proof`, { proofUrl });
    return PactSchema.parse(raw);
  },

  /** PATCH /api/pacts/:id/status */
  updateStatus: async (id: string, status: string): Promise<Pact> => {
    const raw = await apiClient.patch(`/api/pacts/${id}/status`, { status });
    return PactSchema.parse(raw);
  },

  /** POST /api/pacts/:id/qr — generate QR nonce */
  generateQr: async (id: string): Promise<QrPayload> => {
    const raw = await apiClient.post(`/api/pacts/${id}/qr`);
    return QrResponseSchema.parse(raw);
  },

  /** POST /api/pacts/verify-qr */
  verifyQr: async (nonce: string, pactId: string): Promise<Pact> => {
    const raw = await apiClient.post("/api/pacts/verify-qr", { nonce, pactId });
    return PactSchema.parse(raw);
  },
};

// ------------------------------------------------------------
// History
// ------------------------------------------------------------

export const historyApi = {
  /** GET /api/pacts/history?wallet=...&page=...&limit=... */
  list: async (filters: HistoryFilters): Promise<PaginatedResponse<Pact>> => {
    const raw = await apiClient.get("/api/pacts/history", filters as unknown as Record<string, string>);
    return HistoryListSchema.parse(raw);
  },
};

// ------------------------------------------------------------
// Profile
// ------------------------------------------------------------

export const profileApi = {
  /** GET /api/profile/:wallet */
  get: async (wallet: string): Promise<Profile> => {
    const raw = await apiClient.get(`/api/profile/${wallet}`);
    return ProfileSchema.parse(raw);
  },
};

// ------------------------------------------------------------
// Sessions
// ------------------------------------------------------------

export const sessionsApi = {
  /** GET /api/sessions */
  list: async (): Promise<Session[]> => {
    const raw = await apiClient.get("/api/sessions");
    return SessionListSchema.parse(raw);
  },
};

// ------------------------------------------------------------
// Payload types (inputs — not returned from API)
// ------------------------------------------------------------

export interface CreatePactPayload {
  type: "TRADE" | "GOAL";
  counterpartyWallet?: string;
  itemName?: string;
  itemDescription?: string;
  location?: string;
  scheduledAt?: string;
  assetSymbol: string;
  assetAmount: number;
  goalDescription?: string;
  goalDeadline?: string;
}

export interface QrPayload {
  nonce: string;
  qrDataUrl: string;   // base64 QR image
  expiresAt: string;
}
