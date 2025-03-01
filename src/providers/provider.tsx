"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { ReactQueryProvider } from "./react-query-provider";
import { AppProvider } from "@/contexts/app-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ReactQueryProvider>
        <AppProvider>{children}</AppProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}
