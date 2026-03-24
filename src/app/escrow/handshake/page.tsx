import { PageFrame } from "@/components/page-frame";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HandshakePage() {
  return (
    <PageFrame activeHref="/create">
      <section className="section-wrap grid gap-8 lg:grid-cols-2">
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
            <div className="mx-auto w-[270px] rounded-2xl bg-white p-4">
              <div className="grid h-[240px] grid-cols-8 gap-1 rounded bg-white p-2">
                {Array.from({ length: 64 }).map((_, i) => (
                  <span
                    key={i}
                    className={i % 2 === 0 || i % 5 === 0 ? "rounded-sm bg-black" : "rounded-sm bg-white"}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-outline-variant/30 bg-surface-high px-4 py-2 text-xs text-on-surface-variant">
              TX: 0x7d56...f9e2
            </div>
          </CardContent>
        </Card>

        <Card className="bg-surface text-white">
          <CardHeader>
            <Badge className="w-fit rounded-full bg-surface-high text-xs uppercase tracking-[0.14em] text-secondary-container">
              Buyer perspective
            </Badge>
            <CardTitle className="mt-3 font-headline text-3xl font-bold">Scan and Release</CardTitle>
            <CardDescription className="text-on-surface-variant">
              Scan seller QR to confirm pickup and release escrow directly from contract.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-outline-variant/30 bg-black/60 p-5">
              <div className="relative aspect-square rounded-lg border-2 border-primary-container/60">
                <span className="absolute left-0 right-0 top-1/2 h-px bg-primary-container/90" />
              </div>
              <p className="mt-4 text-center text-sm text-on-surface-variant">
                Searching for QR code...
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-11 rounded-lg border-outline-variant/40 bg-surface-high text-sm font-bold text-white hover:bg-surface-highest"
              >
                Flash
              </Button>
              <Button className="h-11 rounded-lg bg-primary-container text-sm font-bold text-white hover:bg-primary-container/90">
                Confirm Pickup
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </PageFrame>
  );
}
