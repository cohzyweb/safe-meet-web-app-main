import { PageFrame } from "@/components/page-frame";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ProfilePageProps = {
  params: Promise<{ wallet: string }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { wallet } = await params;

  return (
    <PageFrame>
      <section className="section-wrap space-y-8">
        <Card className="bg-surface text-white">
          <CardHeader>
            <div className="flex flex-wrap items-center gap-4">
              <Avatar className="h-16 w-16 rounded-xl">
                <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjnPXzzdE9AvL2ADX9N_OQDYnk0P4LKjQqIEhzTCde6x9HrGGhxsgWo3P9tnuu-fRKevS4AizK2rYapkGlTTb2Trv4JPWgkcgoTSc6kXY5_i-9l4Ob6oqb6cMKMf8WCs-K38GyNrbbwH7ZC7MjN8otMRDliQoH5mWEshJ7F0JhGKaKklU-fHidr0dO5At_dGS3tLg3Z5ba6pmukj18GjZz-uDv5PpE1Ll3dKkc92Sn25KveDNd_IIsl2phPYjZjwmWremte7ATs6g" />
                <AvatarFallback>{wallet.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <Badge className="mb-2 rounded-full bg-surface-high text-xs uppercase tracking-[0.14em] text-primary">
                  Public profile
                </Badge>
                <CardTitle className="font-headline text-4xl font-bold">{wallet}</CardTitle>
                <CardDescription className="mt-2 font-mono text-sm text-on-surface-variant">
                  0x7d56...fe82c941a
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Trade success", "100%"],
            ["Completed goals", "12"],
            ["Trust score", "982"],
          ].map(([label, value]) => (
            <Card key={label} className="bg-surface text-white">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs uppercase tracking-[0.14em] text-on-surface-variant">
                  {label}
                </CardDescription>
                <CardTitle className="font-headline text-4xl font-bold">{value}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card className="bg-surface text-white">
          <CardHeader>
            <CardTitle className="font-headline text-2xl font-bold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Q3 Liquidity Provision Pact",
              "Audit Goal",
              "Vault Set",
              "Token Release",
              "DEX Launch",
              "Cross-chain Relay",
            ].map((item) => (
              <div key={item} className="rounded-lg border border-outline-variant/25 bg-surface-high p-4">
                <p className="font-semibold text-white">{item}</p>
              </div>
            ))}
          </div>
          </CardContent>
        </Card>
      </section>
    </PageFrame>
  );
}
