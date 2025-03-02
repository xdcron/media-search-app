"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { ReactQueryProvider } from "./react-query-provider";
import { AppProvider } from "@/contexts/app-context";
import { AuthProvider } from "@/contexts/auth-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ReactQueryProvider>
        <AuthProvider>
          <AppProvider>{children}</AppProvider>
        </AuthProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}
