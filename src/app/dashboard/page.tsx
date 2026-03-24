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

const pendingMeetups = [
  {
    item: "MacBook Pro M2 - 14\"",
    wallet: "0x71C...8e42",
    amount: "1.45 ETH",
    location: "Starbucks Downtown",
    schedule: "Today, 14:30",
    action: "Meet Now",
  },
  {
    item: "Rolex Submariner 124060",
    wallet: "0x4a2...9d11",
    amount: "4.82 ETH",
    location: "Central Bank Plaza",
    schedule: "Tomorrow, 10:00",
    action: "Reschedule",
  },
];

export default function DashboardPage() {
  return (
    <PageFrame activeHref="/dashboard" showSidebar>
      <section className="section-wrap space-y-8">
        <header className="space-y-2">
          <h1 className="font-headline text-4xl font-bold text-white">Unified Dashboard</h1>
          <p className="text-on-surface-variant">
            Manage your ongoing physical exchanges and protocol releases.
          </p>
        </header>

        <div className="grid gap-5 md:grid-cols-3">
          <Card className="bg-surface text-white">
            <CardHeader>
              <CardDescription className="text-xs uppercase tracking-[0.16em] text-on-surface-variant">
                Total Value Locked
              </CardDescription>
              <CardTitle className="font-headline text-4xl font-bold">$1,284,500</CardTitle>
              <div className="inline-flex items-center gap-2 text-xs text-primary">
                <Wallet className="h-3.5 w-3.5" /> +12.5% this month
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-surface text-white">
            <CardHeader>
              <CardDescription className="text-xs uppercase tracking-[0.16em] text-on-surface-variant">
                Completed Trades
              </CardDescription>
              <CardTitle className="font-headline text-4xl font-bold">4,821</CardTitle>
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
              <CardTitle className="font-headline text-4xl font-bold">24</CardTitle>
              <div className="inline-flex items-center gap-2 text-xs text-tertiary">
                <ShieldCheck className="h-3.5 w-3.5" /> 8 awaiting verification
              </div>
            </CardHeader>
          </Card>
        </div>

        <Card className="bg-surface p-2 text-white">
          <Tabs defaultValue="pending" className="w-full">
            <CardHeader className="pb-2">
              <TabsList className="bg-surface-high">
                <TabsTrigger value="pending">Pending Meetups</TabsTrigger>
                <TabsTrigger value="history">Trade History</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent>
              <TabsContent value="pending" className="mt-1">
                <div className="mb-6">
                  <h2 className="font-headline text-2xl font-bold text-white">Active Ledger</h2>
                  <p className="text-sm text-on-surface-variant">
                    In-person exchanges currently protected by escrow.
                  </p>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  {pendingMeetups.map((item) => (
                    <Card key={item.item} className="bg-surface-high text-white">
                      <CardHeader className="space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <CardTitle className="font-headline text-xl font-bold">{item.item}</CardTitle>
                            <CardDescription className="mt-1 text-xs font-mono text-on-surface-variant">
                              {item.wallet}
                            </CardDescription>
                          </div>
                          <Badge className="rounded-full bg-surface-highest px-3 py-1 text-xs text-white">
                            {item.amount}
                          </Badge>
                        </div>
                        <div className="space-y-1.5 text-sm text-on-surface-variant">
                          <p>Location: {item.location}</p>
                          <p className="inline-flex items-center gap-2">
                            <Clock3 className="h-3.5 w-3.5" /> {item.schedule}
                          </p>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button className="h-11 w-full rounded-lg bg-primary-container font-bold text-white hover:bg-primary-container/90">
                          {item.action}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="history" className="mt-1">
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
                    <TableRow className="border-outline-variant/20">
                      <TableCell>Oct 24, 2023</TableCell>
                      <TableCell>Diamond Ring 1.5ct</TableCell>
                      <TableCell>0x921...f2e1</TableCell>
                      <TableCell>Complete</TableCell>
                      <TableCell className="text-right font-semibold">0.85 ETH</TableCell>
                    </TableRow>
                    <TableRow className="border-outline-variant/20">
                      <TableCell>Oct 22, 2023</TableCell>
                      <TableCell>Vintage Porsche Parts</TableCell>
                      <TableCell>0xbc2...33a2</TableCell>
                      <TableCell>Pending</TableCell>
                      <TableCell className="text-right font-semibold">2.10 ETH</TableCell>
                    </TableRow>
                    <TableRow className="border-outline-variant/20">
                      <TableCell>Oct 18, 2023</TableCell>
                      <TableCell>Leica M11 Body</TableCell>
                      <TableCell>0x112...cc98</TableCell>
                      <TableCell>Cancelled</TableCell>
                      <TableCell className="text-right font-semibold">3.40 ETH</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </section>
    </PageFrame>
  );
}
