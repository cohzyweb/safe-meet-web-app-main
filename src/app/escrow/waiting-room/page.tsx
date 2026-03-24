import { PageFrame } from "@/components/page-frame";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function WaitingRoomPage() {
  return (
    <PageFrame activeHref="/create">
      <section className="section-wrap max-w-3xl">
        <Card className="overflow-hidden bg-surface text-white">
          <CardHeader className="border-b border-outline-variant/20 bg-surface-high">
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
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-on-surface-variant">Item</p>
                <p className="mt-2 text-lg font-semibold text-white">MacBook Pro M2</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-on-surface-variant">Amount</p>
                <p className="mt-2 text-lg font-semibold text-white">1.45 ETH</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-on-surface-variant">Counterparty</p>
                <p className="mt-2 text-lg font-semibold text-white">0x71C7...f390</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-on-surface-variant">Status</p>
                <Badge className="mt-2 w-fit rounded-full bg-tertiary/20 px-3 py-1 text-xs uppercase tracking-[0.14em] text-tertiary">
                  Awaiting Meetup
                </Badge>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button className="h-11 rounded-lg bg-primary-container text-sm font-bold text-white hover:bg-primary-container/90">
                Go to Meetup (Generate QR)
              </Button>
              <Button
                variant="outline"
                className="h-11 rounded-lg border-error/40 bg-transparent text-sm font-bold text-error hover:bg-error/10 hover:text-error"
              >
                Cancel and Refund
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </PageFrame>
  );
}
