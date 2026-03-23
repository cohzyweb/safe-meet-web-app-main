import { PageFrame } from "@/components/page-frame";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function CreateGoalPage() {
  return (
    <PageFrame activeHref="/create">
      <section className="section-wrap grid gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          <header className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Commitment flow</p>
            <h1 className="font-headline text-4xl font-bold text-white">Create Goal Pact</h1>
            <p className="text-on-surface-variant">
              Lock a stake, define a deadline, and assign a referee.
            </p>
          </header>

          <Card className="bg-surface text-white">
            <CardContent className="space-y-5 pt-6">
            <label className="block space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-on-surface-variant">
                Goal description
              </span>
              <Textarea
                className="min-h-32 border-outline-variant/40 bg-surface-high text-white placeholder:text-on-surface-variant"
                placeholder="Run 50 miles this week"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-on-surface-variant">
                  Asset
                </span>
                <Select defaultValue="ETH">
                  <SelectTrigger className="h-11 w-full border-outline-variant/40 bg-surface-high text-white">
                    <SelectValue placeholder="Select asset" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ETH">ETH</SelectItem>
                    <SelectItem value="USDC">USDC</SelectItem>
                    <SelectItem value="DAI">DAI</SelectItem>
                  </SelectContent>
                </Select>
              </label>
              <label className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-on-surface-variant">
                  Stake amount
                </span>
                <Input
                  className="h-11 border-outline-variant/40 bg-surface-high text-white placeholder:text-on-surface-variant"
                  placeholder="0.00"
                  type="number"
                />
              </label>
            </div>

            <label className="block space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-on-surface-variant">
                Referee wallet
              </span>
              <Input
                className="h-11 border-outline-variant/40 bg-surface-high text-white placeholder:text-on-surface-variant"
                placeholder="0x... or name.eth"
                type="text"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-on-surface-variant">
                Deadline
              </span>
              <Input
                className="h-11 border-outline-variant/40 bg-surface-high text-white"
                type="datetime-local"
              />
            </label>

            <Button className="h-12 w-full rounded-lg bg-error-container font-headline text-lg font-bold text-white hover:bg-error-container/90">
              Stake My Pride and Crypto
            </Button>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-4 lg:col-span-5">
          <Card className="bg-surface text-white">
            <CardHeader>
              <CardTitle className="font-headline text-2xl font-bold">Strict Enforcement</CardTitle>
              <CardDescription className="text-sm leading-relaxed text-on-surface-variant">
                If the referee rejects your proof, funds are redirected by immutable contract
                logic.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-surface text-white">
            <CardHeader>
              <CardDescription className="text-xs uppercase tracking-[0.14em] text-on-surface-variant">
                Trust score
              </CardDescription>
              <CardTitle className="font-headline text-4xl font-bold">842 / 1000</CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-surface text-white">
            <CardHeader>
              <CardDescription className="text-xs uppercase tracking-[0.14em] text-on-surface-variant">
                Escrow limit
              </CardDescription>
              <CardTitle className="font-headline text-4xl font-bold">500 ETH</CardTitle>
            </CardHeader>
          </Card>
        </aside>
      </section>
    </PageFrame>
  );
}
