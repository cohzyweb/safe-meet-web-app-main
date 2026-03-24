import { PageFrame } from "@/components/page-frame";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function JudgmentRoomPage() {
  return (
    <PageFrame activeHref="/create">
      <section className="section-wrap grid gap-8 lg:grid-cols-2">
        <Card className="bg-surface text-white">
          <CardHeader>
            <Badge className="w-fit rounded-full bg-surface-high px-3 py-1 text-xs uppercase tracking-[0.14em] text-primary">
              Evidence submission
            </Badge>
            <CardTitle className="mt-3 font-headline text-4xl font-bold">User Proof</CardTitle>
            <CardDescription className="mt-3 text-on-surface-variant">
              Verify the note, repository link, and visual evidence before final judgment.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-lg border border-outline-variant/30 bg-surface-high p-4 text-sm text-secondary-container">
              github.com/dev_alpha/pact-milestone-04
            </div>
            <div className="aspect-video rounded-lg border border-outline-variant/30 bg-surface-high" />
            <div className="rounded-lg border border-outline-variant/30 bg-surface-high p-4 text-sm italic text-on-surface-variant">
              Completed full-stack integration for contract listeners. Tests are passing on
              testnet.
            </div>
          </CardContent>
        </Card>

        <Card className="bg-surface text-white">
          <CardHeader>
            <Badge className="w-fit rounded-full bg-surface-high px-3 py-1 text-xs uppercase tracking-[0.14em] text-tertiary">
              Execution panel
            </Badge>
            <CardTitle className="mt-3 font-headline text-4xl font-bold">Contract Decision</CardTitle>
          </CardHeader>

          <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-outline-variant/30 bg-surface-high p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-on-surface-variant">
                Locked stake
              </p>
              <p className="mt-2 font-headline text-3xl font-bold text-white">2.450 ETH</p>
            </div>
            <div className="rounded-lg border border-outline-variant/30 bg-surface-high p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-on-surface-variant">
                Deadline
              </p>
              <p className="mt-2 font-headline text-3xl font-bold text-error">Expired</p>
            </div>
          </div>

          <Separator className="my-7 bg-outline-variant/20" />

          <div className="space-y-3">
            <Button className="h-12 w-full rounded-lg bg-emerald-600 font-headline text-lg font-bold text-white hover:bg-emerald-500">
              Approve and Refund
            </Button>
            <Button
              variant="outline"
              className="h-12 w-full rounded-lg border-error/40 bg-transparent font-headline text-lg font-bold text-error hover:bg-error/10 hover:text-error"
            >
              Reject and Claim
            </Button>
          </div>
          </CardContent>
        </Card>
      </section>
    </PageFrame>
  );
}
