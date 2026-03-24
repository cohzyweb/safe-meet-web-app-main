"use client";

import { useState, useEffect } from "react";
import { Laptop, Shield, Smartphone } from "lucide-react";
import { PageFrame } from "@/components/page-frame";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useSettings, useUpdateProfile } from "@/hooks/useSettings";
import { useWallet } from "@/components/providers";
import type { Session } from "@/lib/types";

// ------------------------------------------------------------
// Session device icon helper
// ------------------------------------------------------------

function SessionIcon({ deviceName }: { deviceName?: string }) {
  const name = deviceName?.toLowerCase() ?? "";

  if (
    name.includes("iphone") ||
    name.includes("android") ||
    name.includes("mobile")
  ) {
    return <Smartphone className="h-4 w-4" />;
  }

  return <Laptop className="h-4 w-4" />;
}

// ------------------------------------------------------------
// Loading skeleton
// ------------------------------------------------------------

function FieldSkeleton() {
  return (
    <div className="h-11 w-full animate-pulse rounded-lg bg-surface-high" />
  );
}

// ------------------------------------------------------------
// Settings Page
// ------------------------------------------------------------

export default function SettingsPage() {
  const { walletAddress } = useWallet();

  const {
    profile,
    sessions = [],
    isLoading,
    isError,
    refetch,
  } = useSettings(walletAddress ?? undefined);

  const updateProfile = useUpdateProfile();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  // Populate fields when profile loads
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName ?? "");
      setEmail("");
    }
  }, [profile]);

  const handleSave = async () => {
    if (!walletAddress) return;

    try {
      await updateProfile.mutateAsync({
        wallet: walletAddress,
        displayName,
        email,
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  return (
    <PageFrame activeHref="/settings" showSidebar>
      <section className="section-wrap space-y-7">
        <header>
          <h1 className="font-headline text-4xl font-bold text-white">
            Settings
          </h1>
          <p className="mt-2 text-on-surface-variant">
            Manage cryptographic identity, wallet sessions, and security
            protocols.
          </p>
        </header>

        {/* Disconnected state */}
        {!walletAddress && (
          <Card className="bg-surface text-white">
            <CardHeader>
              <CardTitle className="font-headline text-2xl font-bold">
                Wallet not connected
              </CardTitle>
              <CardDescription className="text-on-surface-variant">
                Connect your wallet to manage settings.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {walletAddress && (
          <>
            <div className="grid gap-6 lg:grid-cols-12">
              {/* Identity card */}
              <Card className="bg-surface text-white lg:col-span-8">
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-4">
                    <Avatar className="h-16 w-16 rounded-xl">
                      <AvatarImage src={profile?.avatarUrl ?? ""} />
                      <AvatarFallback>
                        {walletAddress.slice(2, 4).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <CardTitle className="font-headline text-2xl font-bold">
                        Identity Details
                      </CardTitle>
                      <CardDescription className="text-on-surface-variant">
                        Update profile metadata synced across SafeMeet.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-5">
                  {isError && (
                    <div className="rounded-lg border border-error/30 bg-error/10 p-3 text-sm text-error">
                      Failed to load profile.{" "}
                      <button onClick={refetch} className="underline">
                        Retry
                      </button>
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-xs uppercase tracking-[0.14em] text-on-surface-variant">
                        Display Name
                      </span>

                      {isLoading ? (
                        <FieldSkeleton />
                      ) : (
                        <Input
                          className="h-11 border-outline-variant/40 bg-surface-high text-white"
                          value={displayName}
                          onChange={(e) =>
                            setDisplayName(e.target.value)
                          }
                          placeholder="Your display name"
                        />
                      )}
                    </label>

                    <label className="space-y-2">
                      <span className="text-xs uppercase tracking-[0.14em] text-on-surface-variant">
                        Wallet
                      </span>

                      <Input
                        className="h-11 border-outline-variant/40 bg-surface-high font-mono text-white"
                        value={walletAddress}
                        readOnly
                      />
                    </label>
                  </div>

                  {/* Save button */}
                  <Button
                    onClick={handleSave}
                    disabled={updateProfile.isPending || isLoading}
                    className="h-11 rounded-lg bg-primary-container text-sm font-bold text-white hover:bg-primary-container/90"
                  >
                    {updateProfile.isPending
                      ? "Saving..."
                      : saved
                      ? "Saved ✓"
                      : "Save Changes"}
                  </Button>

                  {/* 2FA block */}
                  <div className="rounded-lg border border-outline-variant/30 bg-surface-high p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-on-surface-variant">
                          Two-factor authentication
                        </p>
                        <p className="mt-1 text-lg font-semibold text-white">
                          Enabled
                        </p>
                      </div>

                      <Badge className="rounded-full bg-primary-container/20 text-primary">
                        Active
                      </Badge>
                    </div>
                  </div>

                  {/* Sessions */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-on-surface-variant">
                      Active Sessions
                    </p>

                    {isLoading ? (
                      <>
                        <div className="h-14 w-full animate-pulse rounded-lg bg-surface-high" />
                        <div className="h-14 w-full animate-pulse rounded-lg bg-surface-high" />
                      </>
                    ) : sessions.length === 0 ? (
                      <p className="text-sm text-on-surface-variant">
                        No active sessions.
                      </p>
                    ) : (
                      sessions.map((session: Session) => (
                        <div
                          key={session.id}
                          className="rounded-lg border border-outline-variant/25 bg-surface-high p-3"
                        >
                          <p className="inline-flex items-center gap-2 text-sm text-white">
                            <SessionIcon deviceName={session.deviceName} />
                            {session.deviceName ?? "Unknown Device"}

                            {session.isCurrent && (
                              <Badge className="ml-1 rounded-full bg-primary-container/20 px-2 py-0 text-xs text-primary">
                                Current
                              </Badge>
                            )}
                          </p>

                          <p className="mt-1 text-xs text-on-surface-variant">
                            {session.location ??
                              session.chainName ??
                              "Unknown location"}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Vault status */}
              <Card className="bg-surface text-white lg:col-span-4">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl font-bold">
                    Vault Status
                  </CardTitle>
                  <CardDescription className="text-on-surface-variant">
                    {sessions?.[0]?.chainName ?? "—"} connected
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                  <div className="rounded-lg border border-outline-variant/30 bg-surface-high p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-on-surface-variant">
                      Trust Score
                    </p>
                    <p className="mt-1 font-headline text-3xl font-bold text-white">
                      {isLoading ? "—" : profile?.trustScore ?? "—"}
                    </p>
                  </div>

                  <div className="rounded-lg border border-outline-variant/30 bg-surface-high p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-on-surface-variant">
                      Completed Pacts
                    </p>
                    <p className="mt-1 font-headline text-2xl font-bold text-white">
                      {isLoading ? "—" : profile?.completedPacts ?? "—"}
                    </p>
                  </div>

                  <Button className="h-11 w-full rounded-lg bg-secondary-container text-sm font-bold text-white hover:bg-secondary-container/90">
                    Switch Network
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Danger zone */}
            <Card className="bg-surface text-white">
              <CardHeader>
                <CardTitle className="inline-flex items-center gap-2 font-headline text-2xl font-bold text-error">
                  <Shield className="h-5 w-5" /> Danger Zone
                </CardTitle>
                <CardDescription className="text-on-surface-variant">
                  Deactivating removes active session history and trusted
                  partner links.
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
          </>
        )}
      </section>
    </PageFrame>
  );
}