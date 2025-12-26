'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

import { DarkModeProvider } from './dark-mode';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  },
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster toastOptions={{ duration: 3000 }} />

        <DarkModeProvider>{children}</DarkModeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export * from './montage';
