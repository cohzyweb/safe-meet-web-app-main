"use client";

import { useSearchParams } from "next/navigation";
import { PageFrame } from "@/components/page-frame";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePact, useGenerateQr, useVerifyQr } from "@/hooks/usePacts";


export default function HandshakePage() {
  const searchParams = useSearchParams();
  const pactId = searchParams.get("pactId") ?? undefined;

  const { data: pact, isLoading } = usePact(pactId);
  const generateQr = useGenerateQr();
  const verifyQr = useVerifyQr();

  const qrData = generateQr.data;

  const handleGenerateQr = () => {
    if (pactId) generateQr.mutate(pactId);
  };

  const handleConfirmPickup = () => {
    if (!qrData || !pactId) return;
    verifyQr.mutate({ nonce: qrData.nonce, pactId });
  };

  return (
    <PageFrame activeHref="/create">
      <section className="section-wrap grid gap-8 lg:grid-cols-2">

        {/* Seller — QR code */}
        <Card className="bg-surface text-center text-white">
          <CardHeader>
            <Badge className="mx-auto w-fit rounded-full bg-surface-high text-xs uppercase tracking-[0.14em] text-primary">
              Seller perspective
            </Badge>
            <CardTitle className="mt-3 font-headline text-4xl font-bold">The Handshake</CardTitle>
            <CardDescription className="mx-auto max-w-md text-on-surface-variant">
              Show this code to buyer when the item is physically transferred.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* QR display */}
            <div className="mx-auto w-[270px] rounded-2xl bg-white p-4">
              {qrData?.qrDataUrl ? (
                <img
                  src={qrData.qrDataUrl}
                  alt="Escrow QR Code"
                  className="h-[240px] w-full rounded object-contain"
                />
              ) : (
                <div className="grid h-[240px] grid-cols-8 gap-1 rounded bg-white p-2">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <span
                      key={i}
                      className={i % 2 === 0 || i % 5 === 0 ? "rounded-sm bg-black" : "rounded-sm bg-white"}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* TX hash */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-outline-variant/30 bg-surface-high px-4 py-2 text-xs text-on-surface-variant">
              {isLoading
                ? "Loading..."
                : pact?.txHash
                  ? `TX: ${pact.txHash.slice(0, 6)}...${pact.txHash.slice(-4)}`
                  : "TX: Not yet submitted"}
            </div>

            {/* Generate QR button */}
            {pactId && !qrData && (
              <div className="mt-4">
                <Button
                  onClick={handleGenerateQr}
                  disabled={generateQr.isPending}
                  className="rounded-lg bg-primary-container text-sm font-bold text-white hover:bg-primary-container/90"
                >
                  {generateQr.isPending ? "Generating..." : "Generate QR Code"}
                </Button>
              </div>
            )}

            {/* QR expiry */}
            {qrData?.expiresAt && (
              <p className="mt-3 text-xs text-on-surface-variant">
                Expires at {new Date(qrData.expiresAt).toLocaleTimeString()}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Buyer — scan */}
        <Card className="bg-surface text-white">
          <CardHeader>
            <Badge className="w-fit rounded-full bg-surface-high text-xs uppercase tracking-[0.14em] text-secondary-container">
              Buyer perspective
            </Badge>
            <CardTitle className="mt-3 font-headline text-3xl font-bold">Scan and Release</CardTitle>
            <CardDescription className="text-on-surface-variant">
              Scan seller QR to confirm pickup and release escrow directly from contract.
            </CardDescription>

            {/* Pact details */}
            {pact && (
              <div className="mt-3 space-y-1 rounded-lg border border-outline-variant/25 bg-surface-high p-3 text-sm text-on-surface-variant">
                <p><span className="text-white font-medium">Item:</span> {pact.itemName ?? "—"}</p>
                <p><span className="text-white font-medium">Amount:</span> {pact.asset.amountFormatted}</p>
                <p><span className="text-white font-medium">Counterparty:</span> {pact.counterpartyWallet}</p>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-outline-variant/30 bg-black/60 p-5">
              <div className="relative aspect-square rounded-lg border-2 border-primary-container/60">
                <span className="absolute left-0 right-0 top-1/2 h-px bg-primary-container/90" />
              </div>
              <p className="mt-4 text-center text-sm text-on-surface-variant">
                {verifyQr.isPending ? "Verifying..." : "Searching for QR code..."}
              </p>
            </div>

            {/* Error */}
            {verifyQr.isError && (
              <p className="mt-3 text-sm text-error">
                Verification failed. Please try again.
              </p>
            )}

            {/* Success */}
            {verifyQr.isSuccess && (
              <p className="mt-3 text-sm text-emerald-400">
                ✓ Pickup confirmed! Escrow released.
              </p>
            )}

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-11 rounded-lg border-outline-variant/40 bg-surface-high text-sm font-bold text-white hover:bg-surface-highest"
              >
                Flash
              </Button>
              <Button
                onClick={handleConfirmPickup}
                disabled={verifyQr.isPending || !qrData || verifyQr.isSuccess}
                className="h-11 rounded-lg bg-primary-container text-sm font-bold text-white hover:bg-primary-container/90"
              >
                {verifyQr.isPending ? "Confirming..." : "Confirm Pickup"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </PageFrame>
  );
}
