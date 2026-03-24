"use client";

// ============================================================
// apps/web/src/components/providers.tsx
// App-wide providers — wrap this around your layout
// Includes: TanStack Query + Wallet context
// ============================================================

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ------------------------------------------------------------
// Query Client
// ------------------------------------------------------------

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 15_000,        // 15s default stale time
        retry: 2,                 // retry failed requests twice
        refetchOnWindowFocus: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: reuse the same query client
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

// ------------------------------------------------------------
// Wallet Context
// ------------------------------------------------------------

interface WalletContextValue {
  walletAddress: string | null;
  isConnected: boolean;
  connect: (address: string) => void;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextValue>({
  walletAddress: null,
  isConnected: false,
  connect: () => {},
  disconnect: () => {},
});

export function useWallet() {
  return useContext(WalletContext);
}

// ------------------------------------------------------------
// Wallet Provider
// ------------------------------------------------------------

function WalletProvider({ children }: { children: ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Persist wallet address in localStorage
  useEffect(() => {
    const saved = localStorage.getItem("walletAddress");
    if (saved) setWalletAddress(saved);
  }, []);

  const connect = (address: string) => {
    setWalletAddress(address);
    localStorage.setItem("walletAddress", address);
  };

  const disconnect = () => {
    setWalletAddress(null);
    localStorage.removeItem("walletAddress");
  };

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        isConnected: !!walletAddress,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

// ------------------------------------------------------------
// Root Providers — combine all providers here
// ------------------------------------------------------------

export function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        {children}
      </WalletProvider>
    </QueryClientProvider>
  );
}
