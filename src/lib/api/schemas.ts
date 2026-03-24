// ============================================================
// apps/web/src/lib/api/schemas.ts
// Zod schemas for parsing + validating all API responses
// Install: npm install zod
// ============================================================

import { z } from "zod";

// ------------------------------------------------------------
// Primitives
// ------------------------------------------------------------

const AssetSchema = z.object({
  symbol: z.string(),
  amount: z.number(),
  amountFormatted: z.string(),
  usdValue: z.number().optional(),
});

// ------------------------------------------------------------
// Pact
// ------------------------------------------------------------

const PactTypeSchema = z.enum(["TRADE", "GOAL"]);

const PactStatusSchema = z.enum([
  "PENDING",
  "ACTIVE",
  "PROOF_SUBMITTED",
  "COMPLETE",
  "DISPUTED",
  "CANCELLED",
  "EXPIRED",
]);

export const PactSchema = z.object({
  id: z.string(),
  type: PactTypeSchema,
  status: PactStatusSchema,

  creatorWallet: z.string(),
  counterpartyWallet: z.string(),

  // Trade fields
  itemName: z.string().optional(),
  itemDescription: z.string().optional(),
  location: z.string().optional(),
  scheduledAt: z.string().optional(),

  // Value
  asset: AssetSchema,

  // Goal fields
  goalDescription: z.string().optional(),
  goalDeadline: z.string().optional(),

  // Proof
  proofUrl: z.string().optional(),
  proofSubmittedAt: z.string().optional(),

  // Blockchain
  txHash: z.string().optional(),
  contractAddress: z.string().optional(),

  // Timestamps
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const PactListSchema = z.array(PactSchema);

export const CreatePactResponseSchema = PactSchema;

// ------------------------------------------------------------
// Dashboard Stats
// ------------------------------------------------------------

export const DashboardStatsSchema = z.object({
  totalValueLocked: z.number(),
  totalValueLockedFormatted: z.string(),
  tvlChangePercent: z.number(),
  completedTrades: z.number(),
  activeEscrows: z.number(),
  awaitingVerification: z.number(),
});

// ------------------------------------------------------------
// Profile
// ------------------------------------------------------------

export const ProfileSchema = z.object({
  wallet: z.string(),
  displayName: z.string().optional(),
  avatarUrl: z.string().optional(),
  totalPacts: z.number(),
  completedPacts: z.number(),
  disputedPacts: z.number(),
  successRate: z.number(),
  trustScore: z.number().optional(),
  joinedAt: z.string(),
});

// ------------------------------------------------------------
// Session
// ------------------------------------------------------------

export const SessionSchema = z.object({
  id: z.string(),
  wallet: z.string(),
  connectedAt: z.string(),
  expiresAt: z.string().optional(),
  chainId: z.number(),
  chainName: z.string(),
  // UI extras (from settings page)
  deviceName: z.string().optional(),   // e.g. "Brave Browser (macOS)"
  location: z.string().optional(),     // e.g. "London, UK"
  isCurrent: z.boolean().optional(),
});

export const SessionListSchema = z.array(SessionSchema);

// ------------------------------------------------------------
// History (paginated)
// ------------------------------------------------------------

export const HistoryListSchema = z.object({
  data: z.array(PactSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  hasMore: z.boolean(),
});

// ------------------------------------------------------------
// QR
// ------------------------------------------------------------

export const QrResponseSchema = z.object({
  nonce: z.string(),
  qrDataUrl: z.string(),
  expiresAt: z.string(),
});

// ------------------------------------------------------------
// Inferred types (optional — use if you want schema-derived types)
// ------------------------------------------------------------

export type PactFromSchema = z.infer<typeof PactSchema>;
export type DashboardStatsFromSchema = z.infer<typeof DashboardStatsSchema>;
export type ProfileFromSchema = z.infer<typeof ProfileSchema>;
export type SessionFromSchema = z.infer<typeof SessionSchema>;
