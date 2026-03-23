// ============================================================
// apps/web/src/hooks/usePacts.ts
// Pact list + single pact detail + mutations
// ============================================================

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { pactsApi, type CreatePactPayload } from "@/lib/api/endpoints";
import type { Pact, PactFilters } from "@/lib/types";

// ------------------------------------------------------------
// Query keys
// ------------------------------------------------------------

export const pactKeys = {
  all: ["pacts"] as const,
  lists: () => [...pactKeys.all, "list"] as const,
  list: (filters: PactFilters) => [...pactKeys.lists(), filters] as const,
  details: () => [...pactKeys.all, "detail"] as const,
  detail: (id: string) => [...pactKeys.details(), id] as const,
};

// ------------------------------------------------------------
// Pact list hook
// ------------------------------------------------------------

export function usePacts(filters: PactFilters) {
  return useQuery<Pact[], Error>({
    queryKey: pactKeys.list(filters),
    queryFn: () => pactsApi.list(filters),
    enabled: !!filters.wallet,
    staleTime: 15_000,
    retry: 2,
  });
}

// ------------------------------------------------------------
// Single pact hook (escrow/waiting-room, judgment-room etc.)
// ------------------------------------------------------------

export function usePact(id: string | undefined) {
  return useQuery<Pact, Error>({
    queryKey: pactKeys.detail(id ?? ""),
    queryFn: () => pactsApi.getById(id!),
    enabled: !!id,
    staleTime: 10_000,
    retry: 2,
  });
}

// ------------------------------------------------------------
// Create pact mutation
// ------------------------------------------------------------

export function useCreatePact() {
  const queryClient = useQueryClient();

  return useMutation<Pact, Error, CreatePactPayload>({
    mutationFn: (payload) => pactsApi.create(payload),
    onSuccess: () => {
      // Invalidate all pact lists so dashboard/history refresh
      queryClient.invalidateQueries({ queryKey: pactKeys.lists() });
    },
  });
}

// ------------------------------------------------------------
// Submit proof mutation
// ------------------------------------------------------------

export function useSubmitProof() {
  const queryClient = useQueryClient();

  return useMutation<Pact, Error, { id: string; proofUrl: string }>({
    mutationFn: ({ id, proofUrl }) => pactsApi.submitProof(id, proofUrl),
    onSuccess: (data) => {
      // Update cached pact immediately
      queryClient.setQueryData(pactKeys.detail(data.id), data);
      queryClient.invalidateQueries({ queryKey: pactKeys.lists() });
    },
  });
}

// ------------------------------------------------------------
// Update status mutation
// ------------------------------------------------------------

export function useUpdatePactStatus() {
  const queryClient = useQueryClient();

  return useMutation<Pact, Error, { id: string; status: string }>({
    mutationFn: ({ id, status }) => pactsApi.updateStatus(id, status),
    onSuccess: (data) => {
      queryClient.setQueryData(pactKeys.detail(data.id), data);
      queryClient.invalidateQueries({ queryKey: pactKeys.lists() });
    },
  });
}

// ------------------------------------------------------------
// QR hooks
// ------------------------------------------------------------

export function useGenerateQr() {
  return useMutation({
    mutationFn: (pactId: string) => pactsApi.generateQr(pactId),
  });
}

export function useVerifyQr() {
  const queryClient = useQueryClient();

  return useMutation<Pact, Error, { nonce: string; pactId: string }>({
    mutationFn: ({ nonce, pactId }) => pactsApi.verifyQr(nonce, pactId),
    onSuccess: (data) => {
      queryClient.setQueryData(pactKeys.detail(data.id), data);
      queryClient.invalidateQueries({ queryKey: pactKeys.lists() });
    },
  });
}
