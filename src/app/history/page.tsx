import { Download, Search } from "lucide-react";
import { PageFrame } from "@/components/page-frame";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const rows = [
  {
    date: "Oct 24, 2023",
    time: "14:22 UTC",
    asset: "BTC",
    counterparty: "ox_Aether.eth",
    status: "Complete",
    amount: "1.42 BTC",
  },
  {
    date: "Oct 23, 2023",
    time: "09:15 UTC",
    asset: "USDC",
    counterparty: "0x82...f9a1",
    status: "Pending",
    amount: "12,500 USDC",
  },
  {
    date: "Oct 21, 2023",
    time: "18:05 UTC",
    asset: "LINK",
    counterparty: "NovaLabs.dao",
    status: "Cancelled",
    amount: "500 LINK",
  },
];

export default function HistoryPage() {
  return (
    <PageFrame activeHref="/history" showSidebar>
      <section className="section-wrap space-y-7">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-headline text-4xl font-bold text-white">Transaction History</h1>
            <p className="mt-2 max-w-2xl text-on-surface-variant">
              Every interaction on the ledger is recorded with cryptographic finality.
            </p>
          </div>
          <div className="grid min-w-[280px] gap-3 sm:grid-cols-2">
            <Card className="bg-surface text-white">
              <CardHeader className="pb-1">
                <CardDescription className="text-xs uppercase tracking-[0.14em] text-on-surface-variant">
                  Total Volume
                </CardDescription>
                <CardTitle className="font-headline text-2xl font-bold">$142,850</CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-surface text-white">
              <CardHeader className="pb-1">
                <CardDescription className="text-xs uppercase tracking-[0.14em] text-on-surface-variant">
                  Success Rate
                </CardDescription>
                <CardTitle className="font-headline text-2xl font-bold text-secondary-container">
                  99.4%
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        </header>

        <Card className="bg-surface text-white">
          <CardHeader>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-70 flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
                <Input
                  placeholder="Search by asset, hash, or counterparty..."
                  className="h-10 border-outline-variant/40 bg-surface-high pl-10 text-white placeholder:text-on-surface-variant"
                />
              </div>
              <Button variant="outline" className="h-10 rounded-lg border-outline-variant/40 bg-surface-high text-white">
                All Types
              </Button>
              <Button variant="outline" className="h-10 rounded-lg border-outline-variant/40 bg-surface-high text-white">
                Past 30 Days
              </Button>
              <Button className="h-10 rounded-lg bg-primary-container text-sm font-bold text-white hover:bg-primary-container/90">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </CardHeader>

          <CardContent>
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
                {rows.map((row) => (
                  <TableRow key={`${row.date}-${row.asset}`} className="border-outline-variant/20">
                    <TableCell>
                      <p className="font-medium text-white">{row.date}</p>
                      <p className="text-xs text-on-surface-variant">{row.time}</p>
                    </TableCell>
                    <TableCell className="font-semibold text-white">{row.asset}</TableCell>
                    <TableCell className="text-on-surface-variant">{row.counterparty}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          row.status === "Complete"
                            ? "rounded-full bg-emerald-500/20 text-emerald-300"
                            : row.status === "Pending"
                              ? "rounded-full bg-tertiary/20 text-tertiary"
                              : "rounded-full bg-error/20 text-error"
                        }
                      >
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-white">{row.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </PageFrame>
  );
}
