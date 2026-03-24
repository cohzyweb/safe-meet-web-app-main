"use client";

import { useRouter } from "next/navigation";
import { PageFrame } from "@/components/page-frame";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCreatePact } from "@/hooks/usePacts";
import { useWallet } from "@/components/providers";

export default function CreatePage() {
  const router = useRouter();
  const { walletAddress } = useWallet();
  const createPact = useCreatePact();

  const handleStartTrade = async () => {
    if (!walletAddress) return;
    const pact = await createPact.mutateAsync({
      type: "TRADE",
      assetSymbol: "ETH",
      assetAmount: 0,
    });
    router.push(`/escrow/waiting-room?pactId=${pact.id}`);
  };

  const handleStartGoal = () => {
    router.push("/create/goal");
  };

  return (
    <PageFrame activeHref="/create">
      <section className="section-wrap space-y-10">
        <header className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
            Protocol initiation
          </p>
          <h1 className="mt-3 font-headline text-5xl font-bold text-white sm:text-6xl">
            Create SafeMeet
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-on-surface-variant">
            Pick a path and initialize your pact on-chain.
          </p>
        </header>

        {/* Disconnected state */}
        {!walletAddress && (
          <p className="text-center text-sm text-on-surface-variant">
            Connect your wallet to create a pact.
          </p>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="relative overflow-hidden bg-surface text-white">
            <div className="sm-glow -top-28 -right-24 h-56 w-56 bg-primary-container/25" />
            <CardHeader>
              <CardDescription className="text-xs uppercase tracking-[0.16em] text-on-surface-variant">
                Module 01 - Path A
              </CardDescription>
              <CardTitle className="font-headline text-4xl font-bold">Trade Escrow</CardTitle>
              <CardDescription className="text-on-surface-variant">
                Lock funds, meet in person, and release with a QR-based handshake.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleStartTrade}
                disabled={!walletAddress || createPact.isPending}
                className="h-11 rounded-lg bg-primary-container px-6 text-sm font-bold text-white hover:bg-primary-container/90"
              >
                {createPact.isPending ? "Creating..." : "Start Trade Pact"}
              </Button>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-surface text-white">
            <div className="sm-glow -top-28 -right-24 h-56 w-56 bg-secondary-container/25" />
            <CardHeader>
              <CardDescription className="text-xs uppercase tracking-[0.16em] text-on-surface-variant">
                Module 02 - Path B
              </CardDescription>
              <CardTitle className="font-headline text-4xl font-bold">Goal Pact</CardTitle>
              <CardDescription className="text-on-surface-variant">
                Stake collateral against your own commitment and let a referee judge proof.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleStartGoal}
                disabled={!walletAddress}
                className="h-11 rounded-lg bg-secondary-container px-6 text-sm font-bold text-white hover:bg-secondary-container/90"
              >
                Start Goal Pact
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageFrame>
  );
}
