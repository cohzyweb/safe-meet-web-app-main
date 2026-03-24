import type { ReactNode } from "react";
import { SideNav } from "@/components/side-nav";
import { TopNav } from "@/components/top-nav";
import { cn } from "@/lib/utils";

type PageFrameProps = {
  children: ReactNode;
  activeHref?: string;
  showSidebar?: boolean;
};

export function PageFrame({ children, activeHref, showSidebar = false }: PageFrameProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <TopNav activeHref={activeHref} />
      {showSidebar ? <SideNav activeHref={activeHref} /> : null}
      <div className="sm-glow -left-24 top-20 h-72 w-72 bg-primary-container/20" />
      <div className="sm-glow -right-24 bottom-6 h-80 w-80 bg-secondary-container/15" />
      <main className={cn("relative z-10 py-10", showSidebar ? "xl:pl-64" : "")}>{children}</main>
    </div>
  );
}
