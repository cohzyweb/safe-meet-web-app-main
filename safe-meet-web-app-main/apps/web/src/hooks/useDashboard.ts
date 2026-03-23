// ============================================================
// apps/web/src/hooks/useDashboard.ts
// Dashboard data — stats + pending pacts
// ============================================================

import { useQuery } from "@tanstack/react-query";
import { dashboardApi, pactsApi } from "@/lib/api/endpoints";
import type { DashboardStats, Pact } from "@/lib/types";

// ------------------------------------------------------------
// Query keys
// ------------------------------------------------------------

export const dashboardKeys = {
  all: (wallet: string) => ["dashboard", wallet] as const,
  stats: (wallet: string) => ["dashboard", wallet, "stats"] as const,
  pending: (wallet: string) => ["dashboard", wallet, "pending"] as const,
};

// ------------------------------------------------------------
// Stats hook
// ------------------------------------------------------------

export function useDashboardStats(wallet: string | undefined) {
  return useQuery<DashboardStats, Error>({
    queryKey: dashboardKeys.stats(wallet ?? ""),
    queryFn: () => dashboardApi.getStats(wallet!),
    enabled: !!wallet,                  // don't fetch if wallet disconnected
    staleTime: 30_000,                  // 30s before refetch
    retry: 2,
  });
}

// ------------------------------------------------------------
// Pending pacts hook (Active Ledger cards on dashboard)
// ------------------------------------------------------------

export function usePendingPacts(wallet: string | undefined) {
  return useQuery<Pact[], Error>({
    queryKey: dashboardKeys.pending(wallet ?? ""),
    queryFn: () =>
      pactsApi.list({
        wallet: wallet!,
        status: "ACTIVE",
      }),
    enabled: !!wallet,
    staleTime: 15_000,                  // 15s — more frequently updated
    retry: 2,
  });
}

// ------------------------------------------------------------
// Combined hook (convenience — loads both at once)
// ------------------------------------------------------------

export function useDashboard(wallet: string | undefined) {
  const stats = useDashboardStats(wallet);
  const pending = usePendingPacts(wallet);

  return {
    stats: stats.data,
    pending: pending.data ?? [],
    isLoading: stats.isLoading || pending.isLoading,
    isError: stats.isError || pending.isError,
    error: stats.error ?? pending.error,
    refetch: () => {
      stats.refetch();
      pending.refetch();
    },
  };
}
