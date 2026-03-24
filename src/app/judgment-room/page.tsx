"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PageFrame } from "@/components/page-frame";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { usePact, useUpdatePactStatus } from "@/hooks/usePacts";


function ValueSkeleton() {
  return <div className="mt-2 h-9 w-28 animate-pulse rounded bg-surface-highest" />;
}


function DeadlineDisplay({ deadline }: { deadline?: string }) {
  if (!deadline) return <p className="mt-2 font-headline text-3xl font-bold text-on-surface-variant">—</p>;

  const date = new Date(deadline);
  const isExpired = date < new Date();

  return (
    <p className={`mt-2 font-headline text-3xl font-bold ${isExpired ? "text-error" : "text-white"}`}>
      {isExpired ? "Expired" : date.toLocaleDateString()}
    </p>
  );
}


export default function JudgmentRoomPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pactId = searchParams.get("pactId") ?? undefined;

  const { data: pact, isLoading, isError, refetch } = usePact(pactId);
  const updateStatus = useUpdatePactStatus();

  const handleApprove = async () => {
    if (!pactId) return;
    await updateStatus.mutateAsync({ id: pactId, status: "COMPLETE" });
    router.push("/dashboard");
  };

  const handleReject = async () => {
    if (!pactId) return;
    await updateStatus.mutateAsync({ id: pactId, status: "DISPUTED" });
    router.push("/dashboard");
  };

  return (
    <PageFrame activeHref="/create">
      <section className="section-wrap grid gap-8 lg:grid-cols-2">

        {/* Evidence panel */}
        <Card className="bg-surface text-white">
          <CardHeader>
            <Badge className="w-fit rounded-full bg-surface-high px-3 py-1 text-xs uppercase tracking-[0.14em] text-primary">
              Evidence submission
            </Badge>
            <CardTitle className="mt-3 font-headline text-4xl font-bold">User Proof</CardTitle>
            <CardDescription className="mt-3 text-on-surface-variant">
              Verify the note, repository link, and visual evidence before final judgment.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {isError && (
              <div className="rounded-lg border border-error/30 bg-error/10 p-3 text-sm text-error">
                Failed to load proof.{" "}
                <button onClick={() => refetch()} className="underline">Retry</button>
              </div>
            )}

            {/* Proof URL */}
            <div className="rounded-lg border border-outline-variant/30 bg-surface-high p-4 text-sm text-secondary-container">
              {isLoading ? (
                <div className="h-4 w-48 animate-pulse rounded bg-surface-highest" />
              ) : pact?.proofUrl ? (
                <a
                  href={pact.proofUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  {pact.proofUrl}
                </a>
              ) : (
                <span className="text-on-surface-variant">No proof URL submitted</span>
              )}
            </div>

            {/* Proof image placeholder */}
            <div className="aspect-video rounded-lg border border-outline-variant/30 bg-surface-high">
              {pact?.proofUrl && pact.proofUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) && (
                <img
                  src={pact.proofUrl}
                  alt="Proof"
                  className="h-full w-full rounded-lg object-cover"
                />
              )}
            </div>

            {/* Goal description as proof note */}
            <div className="rounded-lg border border-outline-variant/30 bg-surface-high p-4 text-sm italic text-on-surface-variant">
              {isLoading ? (
                <div className="h-4 w-full animate-pulse rounded bg-surface-highest" />
              ) : (
                pact?.goalDescription ?? pact?.itemName ?? "No description provided."
              )}
            </div>

            {/* Proof submitted timestamp */}
            {pact?.proofSubmittedAt && (
              <p className="text-xs text-on-surface-variant">
                Submitted: {new Date(pact.proofSubmittedAt).toLocaleString()}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Decision panel */}
        <Card className="bg-surface text-white">
          <CardHeader>
            <Badge className="w-fit rounded-full bg-surface-high px-3 py-1 text-xs uppercase tracking-[0.14em] text-tertiary">
              Execution panel
            </Badge>
            <CardTitle className="mt-3 font-headline text-4xl font-bold">Contract Decision</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-outline-variant/30 bg-surface-high p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-on-surface-variant">
                  Locked stake
                </p>
                {isLoading ? <ValueSkeleton /> : (
                  <p className="mt-2 font-headline text-3xl font-bold text-white">
                    {pact?.asset.amountFormatted ?? "—"}
                  </p>
                )}
              </div>
              <div className="rounded-lg border border-outline-variant/30 bg-surface-high p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-on-surface-variant">
                  Deadline
                </p>
                {isLoading ? <ValueSkeleton /> : (
                  <DeadlineDisplay deadline={pact?.goalDeadline} />
                )}
              </div>
            </div>

            {/* Counterparty info */}
            {pact && (
              <div className="mt-4 rounded-lg border border-outline-variant/20 bg-surface-high p-3 text-sm text-on-surface-variant">
                <p><span className="text-white font-medium">Creator:</span> {pact.creatorWallet}</p>
                <p className="mt-1"><span className="text-white font-medium">Status:</span> {pact.status}</p>
              </div>
            )}

            <Separator className="my-7 bg-outline-variant/20" />

            <div className="space-y-3">
              <Button
                onClick={handleApprove}
                disabled={updateStatus.isPending || !pactId || pact?.status === "COMPLETE"}
                className="h-12 w-full rounded-lg bg-emerald-600 font-headline text-lg font-bold text-white hover:bg-emerald-500"
              >
                {updateStatus.isPending ? "Processing..." : "Approve and Refund"}
              </Button>
              <Button
                variant="outline"
                onClick={handleReject}
                disabled={updateStatus.isPending || !pactId || pact?.status === "DISPUTED"}
                className="h-12 w-full rounded-lg border-error/40 bg-transparent font-headline text-lg font-bold text-error hover:bg-error/10 hover:text-error"
              >
                {updateStatus.isPending ? "Processing..." : "Reject and Claim"}
              </Button>
            </div>

            {/* Success feedback */}
            {updateStatus.isSuccess && (
              <p className="mt-3 text-center text-sm text-emerald-400">
                ✓ Decision submitted. Redirecting...
              </p>
            )}

            {/* Error feedback */}
            {updateStatus.isError && (
              <p className="mt-3 text-center text-sm text-error">
                Failed to submit decision. Please try again.
              </p>
            )}
          </CardContent>
        </Card>
      </section>
    </PageFrame>
  );
}
