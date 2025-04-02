"use client";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { theme } from "@/styles/theme";

import { ErrorModalProvider } from "./error-modal";
import { ModeSwitch } from "./mode-switch";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <Toaster />

      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <ErrorModalProvider>
            <ModeSwitch />
            {children}
          </ErrorModalProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </SessionProvider>
  );
};
