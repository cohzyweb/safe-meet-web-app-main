// ============================================================
// apps/web/src/lib/types.ts
// Shared domain types — single source of truth for all pages
// ============================================================

// ------------------------------------------------------------
// Enums / Strict Unions
// ------------------------------------------------------------

/** What kind of pact this is */
export type PactType = "TRADE" | "GOAL";

/**
 * Full lifecycle of a pact.
 * Keep these in sync with your backend/contract naming.
 */
export type PactStatus =
  | "PENDING"           // Created, waiting for counterparty
  | "ACTIVE"            // Both parties confirmed, escrow locked
  | "PROOF_SUBMITTED"   // One party submitted proof of meetup
  | "COMPLETE"          // Both parties confirmed — escrow released
  | "DISPUTED"          // One party raised a dispute
  | "CANCELLED"         // Cancelled before activation
  | "EXPIRED";          // Timed out without resolution

// ------------------------------------------------------------
// Asset
// ------------------------------------------------------------

/** A token/coin involved in the pact */
export interface Asset {
  symbol: string;        // e.g. "ETH", "SOL", "USDC"
  amount: number;        // raw numeric value
  amountFormatted: string; // e.g. "1.45 ETH" — for display
  usdValue?: number;     // optional USD equivalent
}

// ------------------------------------------------------------
// Pact
// ------------------------------------------------------------

/** Core pact/agreement object — maps to GET /api/pacts/:id */
export interface Pact {
  id: string;
  type: PactType;
  status: PactStatus;

  // Parties
  creatorWallet: string;       // e.g. "0x71C...8e42"
  counterpartyWallet: string;

  // What's being exchanged (TRADE)
  itemName?: string;           // e.g. "MacBook Pro M2 - 14\""
  itemDescription?: string;

  // Meetup details (TRADE)
  location?: string;           // e.g. "Starbucks Downtown"
  scheduledAt?: string;        // ISO 8601 datetime string

  // Value
  asset: Asset;

  // Goal-specific fields
  goalDescription?: string;
  goalDeadline?: string;       // ISO 8601

  // Proof
  proofUrl?: string;           // IPFS or URL of submitted proof
  proofSubmittedAt?: string;

  // Blockchain
  txHash?: string;
  contractAddress?: string;

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

// ------------------------------------------------------------
// Profile
// ------------------------------------------------------------

/** Wallet-based user profile — maps to GET /api/profile/:wallet */
export interface Profile {
  wallet: string;              // primary identifier
  displayName?: string;
  avatarUrl?: string;

  // Stats
  totalPacts: number;
  completedPacts: number;
  disputedPacts: number;
  successRate: number;         // 0–100 percentage

  // Reputation
  trustScore?: number;
  joinedAt: string;
}

// ------------------------------------------------------------
// Dashboard Stats
// ------------------------------------------------------------

/** Aggregated stats shown on the dashboard — maps to GET /api/dashboard/stats */
export interface DashboardStats {
  totalValueLocked: number;        // raw number
  totalValueLockedFormatted: string; // e.g. "$1,284,500"
  tvlChangePercent: number;        // e.g. 12.5

  completedTrades: number;         // e.g. 4821
  activeEscrows: number;           // e.g. 24
  awaitingVerification: number;    // e.g. 8
}

// ------------------------------------------------------------
// Session
// ------------------------------------------------------------

/** Active wallet session — maps to GET /api/sessions */
export interface Session {
  id: string;
  wallet: string;
  connectedAt: string;         // ISO 8601
  expiresAt?: string;
  chainId: number;             // e.g. 1 for Ethereum mainnet
  chainName: string;           // e.g. "Ethereum", "Solana"
}

// ------------------------------------------------------------
// Transaction
// ------------------------------------------------------------

/** Blockchain transaction tied to a pact */
export interface Transaction {
  id: string;
  pactId: string;
  txHash: string;
  type:
    | "ESCROW_CREATED"
    | "ESCROW_RELEASED"
    | "PROOF_SUBMITTED"
    | "DISPUTE_RAISED"
    | "REFUND_ISSUED";
  from: string;
  to: string;
  asset: Asset;
  timestamp: string;           // ISO 8601
  blockNumber?: number;
  explorerUrl?: string;        // link to etherscan/solscan etc.
}

// ------------------------------------------------------------
// API Response Wrappers
// ------------------------------------------------------------

/** Standard paginated list response */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

/** Standard API error shape */
export interface ApiError {
  code: string;
  message: string;
  statusCode: number;
}

// ------------------------------------------------------------
// Filter / Query Params
// ------------------------------------------------------------

/** Query params for GET /api/pacts */
export interface PactFilters {
  wallet?: string;
  type?: PactType;
  status?: PactStatus;
  page?: number;
  limit?: number;
}

/** Query params for GET /api/pacts/history */
export interface HistoryFilters {
  wallet: string;
  page?: number;
  limit?: number;
  type?: PactType;
  status?: PactStatus;
  from?: string;   // ISO date
  to?: string;     // ISO date
}
