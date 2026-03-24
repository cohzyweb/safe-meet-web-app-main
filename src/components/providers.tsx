"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 15_000,       
        retry: 2,                
        refetchOnWindowFocus: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    
    return makeQueryClient();
  }
  
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}


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


function WalletProvider({ children }: { children: ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  
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
