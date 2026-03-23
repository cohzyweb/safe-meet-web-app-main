import Link from "next/link";
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

const QUICK_LINKS = [
  { href: "/dashboard", label: "Unified Dashboard" },
  { href: "/create", label: "Creation Flow" },
  { href: "/escrow/handshake", label: "The Handshake" },
  { href: "/escrow/waiting-room", label: "Escrow Waiting Room" },
  { href: "/judgment-room", label: "The Judgment Room" },
  { href: "/history", label: "Transaction History" },
  { href: "/settings", label: "Settings" },
  { href: "/profile/vitalik.eth", label: "Public Profile" },
];

export default function Home() {
  return (
    <PageFrame>
      <section className="section-wrap space-y-10">
        <div className="space-y-5 text-center">
          <Badge className="mx-auto rounded-full bg-surface-high px-4 py-1 text-xs tracking-[0.2em] text-primary hover:bg-surface-high">
            SafeMeet Protocol
          </Badge>
          <h1 className="font-headline text-5xl font-bold tracking-tight text-white sm:text-7xl">
            Trustless P2P Escrow for Real-World Trades
          </h1>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-on-surface-variant sm:text-lg">
            One escrow primitive, two core flows: high-value in-person trade handoffs and
            self-enforced goal pacts with a referee.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Button className="h-10 rounded-lg bg-primary-container px-6 font-bold text-white hover:bg-primary-container/90">
              Connect Wallet
            </Button>
            <Button variant="outline" className="h-10 rounded-lg px-6 font-bold">
              Read Whitepaper
            </Button>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["TVL", "$1,284,500"],
            ["Active Escrows", "24"],
            ["Completed Trades", "4,821"],
            ["Trust Score", "98.4%"],
          ].map(([label, value]) => (
            <Card key={label} className="bg-surface text-white">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs uppercase tracking-[0.16em] text-on-surface-variant">
                  {label}
                </CardDescription>
                <CardTitle className="font-headline text-3xl font-bold">{value}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card className="bg-surface p-2">
          <CardHeader>
            <CardTitle className="font-headline text-2xl font-bold text-white">Screen Routes</CardTitle>
            <CardDescription className="text-sm text-on-surface-variant">
              Built from Stitch references with shared SafeMeet tokens and icon-only
              branding.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {QUICK_LINKS.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="inline-flex h-11 items-center justify-start rounded-lg border border-outline-variant/50 bg-surface-high px-3 text-sm font-semibold text-on-surface transition hover:border-primary-container/50 hover:bg-surface-highest"
                >
                  {route.label}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </PageFrame>
  );
}
