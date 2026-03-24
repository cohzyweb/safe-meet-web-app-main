import { Laptop, Shield, Smartphone } from "lucide-react";
import { PageFrame } from "@/components/page-frame";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <PageFrame activeHref="/settings" showSidebar>
      <section className="section-wrap space-y-7">
        <header>
          <h1 className="font-headline text-4xl font-bold text-white">Settings</h1>
          <p className="mt-2 text-on-surface-variant">
            Manage cryptographic identity, wallet sessions, and security protocols.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-12">
          <Card className="bg-surface text-white lg:col-span-8">
            <CardHeader>
              <div className="flex flex-wrap items-center gap-4">
                <Avatar className="h-16 w-16 rounded-xl">
                  <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-_c3xhIK587iK0wiPEQ0BLygUGjzsPowBk_8NrMi6tt2Nb2jq3Kn_rZx-zjMbdSmKJ--am2GNTYpBe0f-o6vqm6-hrxxk0BWgyW4cRUF4olA_jiAkuOvobSPBwuqPBG1fcnhdwS-JnLdBgrjz4jzup6SX0HqWyEeqAhY5SsLSUdaSbF6O9vNCuWJS-aCNSFH02Gh79G40hFu6iE49d-HaJ1FQQUqDptJ5C1aHt9BdyfgSAaNMNp30j9S46acX7NKR2bufcyDFc_w" />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="font-headline text-2xl font-bold">Identity Details</CardTitle>
                  <CardDescription className="text-on-surface-variant">
                    Update profile metadata synced across SafeMeet.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.14em] text-on-surface-variant">
                    Display Name
                  </span>
                  <Input
                    className="h-11 border-outline-variant/40 bg-surface-high text-white"
                    defaultValue="Alexander Sterling"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.14em] text-on-surface-variant">
                    Email
                  </span>
                  <Input
                    className="h-11 border-outline-variant/40 bg-surface-high text-white"
                    defaultValue="alex@sterling.vault"
                  />
                </label>
              </div>

              <div className="rounded-lg border border-outline-variant/30 bg-surface-high p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-on-surface-variant">Two-factor authentication</p>
                    <p className="mt-1 text-lg font-semibold text-white">Enabled</p>
                  </div>
                  <Badge className="rounded-full bg-primary-container/20 text-primary">Active</Badge>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-on-surface-variant">
                  Active Sessions
                </p>
                <div className="rounded-lg border border-outline-variant/25 bg-surface-high p-3">
                  <p className="inline-flex items-center gap-2 text-sm text-white">
                    <Laptop className="h-4 w-4" /> Brave Browser (macOS)
                  </p>
                  <p className="mt-1 text-xs text-on-surface-variant">London, UK - Current Session</p>
                </div>
                <div className="rounded-lg border border-outline-variant/25 bg-surface-high p-3">
                  <p className="inline-flex items-center gap-2 text-sm text-white">
                    <Smartphone className="h-4 w-4" /> iPhone 15 Pro
                  </p>
                  <p className="mt-1 text-xs text-on-surface-variant">New York, USA</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface text-white lg:col-span-4">
            <CardHeader>
              <CardTitle className="font-headline text-2xl font-bold">Vault Status</CardTitle>
              <CardDescription className="text-on-surface-variant">
                Ethereum Mainnet connected
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="rounded-lg border border-outline-variant/30 bg-surface-high p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-on-surface-variant">Balance</p>
                <p className="mt-1 font-headline text-3xl font-bold text-white">14.82 ETH</p>
              </div>
              <div className="rounded-lg border border-outline-variant/30 bg-surface-high p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-on-surface-variant">
                  Escrow Limit
                </p>
                <p className="mt-1 font-headline text-2xl font-bold text-white">500 ETH</p>
              </div>
              <Button className="h-11 w-full rounded-lg bg-secondary-container text-sm font-bold text-white hover:bg-secondary-container/90">
                Switch Network
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-surface text-white">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 font-headline text-2xl font-bold text-error">
              <Shield className="h-5 w-5" /> Danger Zone
            </CardTitle>
            <CardDescription className="text-on-surface-variant">
              Deactivating removes active session history and trusted partner links.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Separator className="bg-outline-variant/20" />
            <Button
              variant="destructive"
              className="h-11 rounded-lg bg-error-container font-bold text-white hover:bg-error-container/90"
            >
              Deactivate Ledger Profile
            </Button>
          </CardContent>
        </Card>
      </section>
    </PageFrame>
  );
}
