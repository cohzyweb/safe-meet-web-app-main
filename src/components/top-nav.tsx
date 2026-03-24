import Link from "next/link";
import { LogoIcon } from "@/components/logo-icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/history", label: "History" },
  { href: "/create", label: "Escrow" },
  { href: "/settings", label: "Settings" },
];

type TopNavProps = {
  activeHref?: string;
};

export function TopNav({ activeHref }: TopNavProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-background/85 backdrop-blur-xl">
      <div className="section-wrap flex h-[4.5rem] items-center justify-between gap-6 py-3">
        <Link
          href="/"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-surface-high text-primary-container shadow-[0_0_35px_-18px_#7d56fe]"
          aria-label="SafeMeet home"
        >
          <LogoIcon className="h-6 w-6" />
          <span className="sr-only">SafeMeet</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-semibold tracking-wide transition-colors",
                activeHref === item.href
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button className="h-9 rounded-lg bg-primary-container px-5 text-sm font-bold text-white hover:bg-primary-container/90">
          Connect Wallet
        </Button>
      </div>
    </header>
  );
}
