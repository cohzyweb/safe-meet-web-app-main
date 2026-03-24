"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PageFrame } from "@/components/page-frame";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePact, useUpdatePactStatus } from "@/hooks/usePacts";
import type { PactStatus } from "@/lib/types";


function statusLabel(status: PactStatus): string {
  const labels: Record<PactStatus, string> = {
    PENDING: "Awaiting Counterparty",
    ACTIVE: "Awaiting Meetup",
    PROOF_SUBMITTED: "Proof Submitted",
    COMPLETE: "Complete",
    DISPUTED: "Disputed",
    CANCELLED: "Cancelled",
    EXPIRED: "Expired",
  };
  return labels[status] ?? status;
}


function FieldSkeleton() {
  return <div className="mt-2 h-6 w-32 animate-pulse rounded bg-surface-highest" />;
}


export default function WaitingRoomPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pactId = searchParams.get("pactId") ?? undefined;

  const { data: pact, isLoading, isError, refetch } = usePact(pactId);
  const updateStatus = useUpdatePactStatus();

  const handleGoToMeetup = () => {
    if (!pactId) return;
    router.push(`/escrow/handshake?pactId=${pactId}`);
  };

  const handleCancelRefund = async () => {
    if (!pactId) return;
    await updateStatus.mutateAsync({ id: pactId, status: "CANCELLED" });
    router.push("/dashboard");
  };

  return (
    <PageFrame activeHref="/create">
      <section className="section-wrap max-w-3xl">
        <Card className="overflow-hidden bg-surface text-white">
          <CardHeader className="border-b border-outline-variant/20 bg-surface-high">
            {/* Progress steps */}
            <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.16em] text-on-surface-variant">
              <span>Created</span>
              <span className="text-tertiary">Funds Locked</span>
              <span>Ready to meet</span>
            </div>
            <CardTitle className="mt-5 font-headline text-3xl font-bold text-white">
              Escrow is Securely Funded
            </CardTitle>
            <CardDescription className="mt-2 text-on-surface-variant">
              Assets are held in contract. Proceed to in-person meetup and verify transfer.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 p-7">
            {/* Error state */}
            {isError && (
              <div className="rounded-lg border border-error/30 bg-error/10 p-3 text-sm text-error">
                Failed to load pact details.{" "}
                <button onClick={() => refetch()} className="underline">Retry</button>
              </div>
            )}

            {/* No pactId state */}
            {!pactId && (
              <p className="text-sm text-on-surface-variant">
                No pact ID found. Navigate here from a pact detail page.
              </p>
            )}

            {/* Pact details */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-on-surface-variant">Item</p>
                {isLoading ? <FieldSkeleton /> : (
                  <p className="mt-2 text-lg font-semibold text-white">
                    {pact?.itemName ?? pact?.goalDescription ?? "—"}
                  </p>
                )}
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-on-surface-variant">Amount</p>
                {isLoading ? <FieldSkeleton /> : (
                  <p className="mt-2 text-lg font-semibold text-white">
                    {pact?.asset.amountFormatted ?? "—"}
                  </p>
                )}
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-on-surface-variant">Counterparty</p>
                {isLoading ? <FieldSkeleton /> : (
                  <p className="mt-2 font-mono text-lg font-semibold text-white">
                    {pact?.counterpartyWallet ?? "—"}
                  </p>
                )}
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-on-surface-variant">Status</p>
                {isLoading ? <FieldSkeleton /> : (
                  <Badge className="mt-2 w-fit rounded-full bg-tertiary/20 px-3 py-1 text-xs uppercase tracking-[0.14em] text-tertiary">
                    {pact ? statusLabel(pact.status) : "—"}
                  </Badge>
                )}
              </div>

              {/* Location if present */}
              {pact?.location && (
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-on-surface-variant">Location</p>
                  <p className="mt-2 text-lg font-semibold text-white">{pact.location}</p>
                </div>
              )}

              {/* Scheduled time if present */}
              {pact?.scheduledAt && (
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-on-surface-variant">Scheduled</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {new Date(pact.scheduledAt).toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                onClick={handleGoToMeetup}
                disabled={!pactId || isLoading || pact?.status === "CANCELLED"}
                className="h-11 rounded-lg bg-primary-container text-sm font-bold text-white hover:bg-primary-container/90"
              >
                Go to Meetup (Generate QR)
              </Button>
              <Button
                variant="outline"
                onClick={handleCancelRefund}
                disabled={updateStatus.isPending || !pactId || pact?.status === "CANCELLED"}
                className="h-11 rounded-lg border-error/40 bg-transparent text-sm font-bold text-error hover:bg-error/10 hover:text-error"
              >
                {updateStatus.isPending ? "Cancelling..." : "Cancel and Refund"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </PageFrame>
  );
}
