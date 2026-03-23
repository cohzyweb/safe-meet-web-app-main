import Link from "next/link";
import { PageFrame } from "@/components/page-frame";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreatePage() {
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
              <Link
                href="/escrow/handshake"
                className="inline-flex h-11 items-center rounded-lg bg-primary-container px-6 text-sm font-bold text-white transition hover:bg-primary-container/90"
              >
                Start Trade Pact
              </Link>
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
              <Link
                href="/create/goal"
                className="inline-flex h-11 items-center rounded-lg bg-secondary-container px-6 text-sm font-bold text-white transition hover:bg-secondary-container/90"
              >
                Start Goal Pact
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageFrame>
  );
}
