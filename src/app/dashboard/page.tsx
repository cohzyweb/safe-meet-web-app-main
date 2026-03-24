"use client";

import { Clock3, Handshake, ShieldCheck, Wallet } from "lucide-react";
import { PageFrame } from "@/components/page-frame";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDashboard } from "@/hooks/useDashboard";
import { useHistory } from "@/hooks/useHistory";
import { useWallet } from "@/components/providers";
import type { Pact, PactStatus } from "@/lib/types";


function StatusBadge({ status }: { status: PactStatus }) {
  const styles: Record<PactStatus, string> = {
    COMPLETE: "bg-emerald-500/20 text-emerald-300",
    PENDING: "bg-tertiary/20 text-tertiary",
    ACTIVE: "bg-primary/20 text-primary",
    PROOF_SUBMITTED: "bg-secondary-container/20 text-secondary-container",
    DISPUTED: "bg-error/20 text-error",
    CANCELLED: "bg-error/20 text-error",
    EXPIRED: "bg-outline-variant/20 text-on-surface-variant",
  };

  const labels: Record<PactStatus, string> = {
    COMPLETE: "Complete",
    PENDING: "Pending",
    ACTIVE: "Active",
    PROOF_SUBMITTED: "Proof Submitted",
    DISPUTED: "Disputed",
    CANCELLED: "Cancelled",
    EXPIRED: "Expired",
  };

  return (
    <Badge className={`rounded-full px-3 py-1 text-xs ${styles[status]}`}>
      {labels[status]}
    </Badge>
  );
}


function getPactAction(status: PactStatus): string {
  switch (status) {
    case "ACTIVE": return "Meet Now";
    case "PENDING": return "Awaiting Counterparty";
    case "PROOF_SUBMITTED": return "Review Proof";
    default: return "View";
  }
}


function StatCardSkeleton() {
  return (
    <Card className="bg-surface text-white">
      <CardHeader>
        <div className="h-3 w-24 animate-pulse rounded bg-surface-high" />
        <div className="mt-2 h-9 w-32 animate-pulse rounded bg-surface-high" />
        <div className="mt-2 h-3 w-20 animate-pulse rounded bg-surface-high" />
      </CardHeader>
    </Card>
  );
}

function PactCardSkeleton() {
  return (
    <Card className="bg-surface-high text-white">
      <CardHeader className="space-y-3">
        <div className="h-5 w-40 animate-pulse rounded bg-surface-highest" />
        <div className="h-3 w-24 animate-pulse rounded bg-surface-highest" />
        <div className="h-3 w-32 animate-pulse rounded bg-surface-highest" />
      </CardHeader>
      <CardContent>
        <div className="h-11 w-full animate-pulse rounded-lg bg-surface-highest" />
      </CardContent>
    </Card>
  );
}


function EmptyPacts() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <ShieldCheck className="mb-4 h-10 w-10 text-on-surface-variant" />
      <p className="font-headline text-lg font-bold text-white">No active escrows</p>
      <p className="mt-1 text-sm text-on-surface-variant">
        Create a new pact to get started.
      </p>
    </div>
  );
}


export default function DashboardPage() {
  const { walletAddress } = useWallet();

  const { stats, pending, isLoading, isError, refetch } = useDashboard(walletAddress ?? undefined);

  const { data: historyData, isLoading: historyLoading } = useHistory({
    wallet: walletAddress ?? "",
    page: 1,
    limit: 10,
  });

  const historyRows = historyData?.data ?? [];

  return (
    <PageFrame activeHref="/dashboard" showSidebar>
      <section className="section-wrap space-y-8">
        <header className="space-y-2">
          <h1 className="font-headline text-4xl font-bold text-white">Unified Dashboard</h1>
          <p className="text-on-surface-variant">
            Manage your ongoing physical exchanges and protocol releases.
          </p>
        </header>

        {/* Disconnected state */}
        {!walletAddress && (
          <Card className="bg-surface text-white">
            <CardHeader>
              <CardTitle className="font-headline text-2xl font-bold">Wallet not connected</CardTitle>
              <CardDescription className="text-on-surface-variant">
                Connect your wallet to view your dashboard.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {/* Stat cards */}
        {walletAddress && (
          <>
            <div className="grid gap-5 md:grid-cols-3">
              {isLoading ? (
                <>
                  <StatCardSkeleton />
                  <StatCardSkeleton />
                  <StatCardSkeleton />
                </>
              ) : isError ? (
                <Card className="bg-surface text-white md:col-span-3">
                  <CardHeader>
                    <CardDescription className="text-error">
                      Failed to load stats.
                    </CardDescription>
                    <Button
                      onClick={refetch}
                      className="mt-2 w-fit rounded-lg bg-primary-container text-sm font-bold text-white"
                    >
                      Retry
                    </Button>
                  </CardHeader>
                </Card>
              ) : (
                <>
                  <Card className="bg-surface text-white">
                    <CardHeader>
                      <CardDescription className="text-xs uppercase tracking-[0.16em] text-on-surface-variant">
                        Total Value Locked
                      </CardDescription>
                      <CardTitle className="font-headline text-4xl font-bold">
                        {stats?.totalValueLockedFormatted ?? "—"}
                      </CardTitle>
                      <div className="inline-flex items-center gap-2 text-xs text-primary">
                        <Wallet className="h-3.5 w-3.5" />
                        {stats ? `+${stats.tvlChangePercent}% this month` : "—"}
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="bg-surface text-white">
                    <CardHeader>
                      <CardDescription className="text-xs uppercase tracking-[0.16em] text-on-surface-variant">
                        Completed Trades
                      </CardDescription>
                      <CardTitle className="font-headline text-4xl font-bold">
                        {stats?.completedTrades.toLocaleString() ?? "—"}
                      </CardTitle>
                      <div className="inline-flex items-center gap-2 text-xs text-secondary-container">
                        <Handshake className="h-3.5 w-3.5" /> 100% immutable trust
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="bg-surface text-white">
                    <CardHeader>
                      <CardDescription className="text-xs uppercase tracking-[0.16em] text-on-surface-variant">
                        Active Escrows
                      </CardDescription>
                      <CardTitle className="font-headline text-4xl font-bold">
                        {stats?.activeEscrows ?? "—"}
                      </CardTitle>
                      <div className="inline-flex items-center gap-2 text-xs text-tertiary">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        {stats ? `${stats.awaitingVerification} awaiting verification` : "—"}
                      </div>
                    </CardHeader>
                  </Card>
                </>
              )}
            </div>

            {/* Tabs */}
            <Card className="bg-surface p-2 text-white">
              <Tabs defaultValue="pending" className="w-full">
                <CardHeader className="pb-2">
                  <TabsList className="bg-surface-high">
                    <TabsTrigger value="pending">Pending Meetups</TabsTrigger>
                    <TabsTrigger value="history">Trade History</TabsTrigger>
                  </TabsList>
                </CardHeader>

                <CardContent>
                  {/* Pending tab */}
                  <TabsContent value="pending" className="mt-1">
                    <div className="mb-6">
                      <h2 className="font-headline text-2xl font-bold text-white">Active Ledger</h2>
                      <p className="text-sm text-on-surface-variant">
                        In-person exchanges currently protected by escrow.
                      </p>
                    </div>

                    {isLoading ? (
                      <div className="grid gap-5 lg:grid-cols-2">
                        <PactCardSkeleton />
                        <PactCardSkeleton />
                      </div>
                    ) : pending.length === 0 ? (
                      <EmptyPacts />
                    ) : (
                      <div className="grid gap-5 lg:grid-cols-2">
                        {pending.map((pact: Pact) => (
                          <Card key={pact.id} className="bg-surface-high text-white">
                            <CardHeader className="space-y-3">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <CardTitle className="font-headline text-xl font-bold">
                                    {pact.itemName ?? "Unnamed Item"}
                                  </CardTitle>
                                  <CardDescription className="mt-1 text-xs font-mono text-on-surface-variant">
                                    {pact.counterpartyWallet}
                                  </CardDescription>
                                </div>
                                <Badge className="rounded-full bg-surface-highest px-3 py-1 text-xs text-white">
                                  {pact.asset.amountFormatted}
                                </Badge>
                              </div>
                              <div className="space-y-1.5 text-sm text-on-surface-variant">
                                {pact.location && <p>Location: {pact.location}</p>}
                                {pact.scheduledAt && (
                                  <p className="inline-flex items-center gap-2">
                                    <Clock3 className="h-3.5 w-3.5" />
                                    {new Date(pact.scheduledAt).toLocaleString()}
                                  </p>
                                )}
                              </div>
                            </CardHeader>
                            <CardContent>
                              <Button className="h-11 w-full rounded-lg bg-primary-container font-bold text-white hover:bg-primary-container/90">
                                {getPactAction(pact.status)}
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  {/* History tab */}
                  <TabsContent value="history" className="mt-1">
                    {historyLoading ? (
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="h-12 w-full animate-pulse rounded bg-surface-high" />
                        ))}
                      </div>
                    ) : historyRows.length === 0 ? (
                      <div className="py-12 text-center text-sm text-on-surface-variant">
                        No transaction history yet.
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow className="border-outline-variant/20">
                            <TableHead>Date</TableHead>
                            <TableHead>Asset</TableHead>
                            <TableHead>Counterparty</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {historyRows.map((pact: Pact) => (
                            <TableRow key={pact.id} className="border-outline-variant/20">
                              <TableCell>
                                {new Date(pact.createdAt).toLocaleDateString()}
                              </TableCell>
                              <TableCell className="font-semibold text-white">
                                {pact.itemName ?? pact.asset.symbol}
                              </TableCell>
                              <TableCell className="text-on-surface-variant">
                                {pact.counterpartyWallet}
                              </TableCell>
                              <TableCell>
                                <StatusBadge status={pact.status} />
                              </TableCell>
                              <TableCell className="text-right font-semibold">
                                {pact.asset.amountFormatted}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </>
        )}
      </section>
    </PageFrame>
  );
}
