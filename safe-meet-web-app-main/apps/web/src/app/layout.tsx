import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const headline = Space_Grotesk({
  variable: "--font-headline",
  subsets: ["latin"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SafeMeet",
  description: "SafeMeet escrow and pact dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full dark", headline.variable, body.variable, "font-sans")}
    >
      <body className="min-h-full bg-background text-on-surface font-body antialiased">
        {children}
      </body>
    </html>
  );
}
